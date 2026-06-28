import seed from "@/content/journey-seed.json";
import shortsSeed from "@/content/journey-shorts-seed.json";

export type JourneyVideo = {
  id: string;
  title: string;
  publishedAt: string; // ISO date (YYYY-MM-DD or full ISO); "" for undated shorts
  views?: string;
  thumbnail: string;
  url: string;
};

export type JourneyContent = {
  videos: JourneyVideo[]; // long-form, newest-first
  shorts: JourneyVideo[]; // Shorts, newest-first
};

// Promise View Acres uploads playlist = "UU" + channel-id-suffix.
// Channel: UCRyS9RTWo40rJgk0zYjvDAg
const UPLOADS_PLAYLIST = "UURyS9RTWo40rJgk0zYjvDAg";

// Uploads at or under this many seconds are treated as Shorts. YouTube's API
// has no explicit "isShort" flag; duration is the standard heuristic.
const SHORT_MAX_SECONDS = 60;

type PlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, { url?: string }>;
  };
  contentDetails?: { videoPublishedAt?: string };
};

function bestThumb(
  thumbs: Record<string, { url?: string }> | undefined,
  id: string
): string {
  return (
    thumbs?.maxres?.url ||
    thumbs?.standard?.url ||
    thumbs?.high?.url ||
    thumbs?.medium?.url ||
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  );
}

function parseISODuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + +(m[3] || 0);
}

/** Fetch every upload (snippet + publish date) via the Data API, paginated. */
async function fetchUploads(apiKey: string): Promise<JourneyVideo[]> {
  const out: JourneyVideo[] = [];
  let pageToken = "";
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", UPLOADS_PLAYLIST);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    // Revalidate daily — new uploads surface automatically without a redeploy.
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`playlistItems ${res.status}`);
    const json = (await res.json()) as {
      items?: PlaylistItem[];
      nextPageToken?: string;
    };
    for (const item of json.items ?? []) {
      const id = item.snippet?.resourceId?.videoId;
      if (!id || item.snippet?.title === "Private video") continue;
      out.push({
        id,
        title: item.snippet?.title ?? "",
        publishedAt:
          item.contentDetails?.videoPublishedAt ||
          item.snippet?.publishedAt ||
          "",
        thumbnail: bestThumb(item.snippet?.thumbnails, id),
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    }
    pageToken = json.nextPageToken ?? "";
  } while (pageToken);
  return out;
}

/** Fetch durations (seconds) for a list of video ids, batched 50/request. */
async function fetchDurations(
  apiKey: string,
  ids: string[]
): Promise<Map<string, number>> {
  const durations = new Map<string, number>();
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", batch.join(","));
    url.searchParams.set("key", apiKey);
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`videos ${res.status}`);
    const json = (await res.json()) as {
      items?: { id: string; contentDetails?: { duration?: string } }[];
    };
    for (const v of json.items ?? []) {
      durations.set(v.id, parseISODuration(v.contentDetails?.duration ?? ""));
    }
  }
  return durations;
}

async function fetchFromApi(apiKey: string): Promise<JourneyContent> {
  const uploads = await fetchUploads(apiKey);
  if (uploads.length === 0) throw new Error("no uploads returned");
  const durations = await fetchDurations(
    apiKey,
    uploads.map((v) => v.id)
  );

  const videos: JourneyVideo[] = [];
  const shorts: JourneyVideo[] = [];
  for (const v of uploads) {
    const secs = durations.get(v.id) ?? 999;
    if (secs > 0 && secs <= SHORT_MAX_SECONDS) {
      shorts.push({ ...v, url: `https://www.youtube.com/shorts/${v.id}` });
    } else {
      videos.push(v);
    }
  }
  const byDate = (a: JourneyVideo, b: JourneyVideo) =>
    a.publishedAt < b.publishedAt ? 1 : -1;
  videos.sort(byDate);
  shorts.sort(byDate);
  return { videos, shorts };
}

function seedContent(): JourneyContent {
  return {
    videos: (seed as JourneyVideo[])
      .slice()
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    shorts: shortsSeed as JourneyVideo[],
  };
}

export async function getJourneyContent(): Promise<JourneyContent> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (apiKey) {
    try {
      return await fetchFromApi(apiKey);
    } catch (err) {
      console.warn(
        "[journey] YouTube API fetch failed, using seed:",
        (err as Error).message
      );
    }
  }
  return seedContent();
}

export type JourneyYear = { year: string; videos: JourneyVideo[] };

export function groupByYear(videos: JourneyVideo[]): JourneyYear[] {
  const map = new Map<string, JourneyVideo[]>();
  for (const v of videos) {
    const year = (v.publishedAt || "").slice(0, 4) || "Undated";
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(v);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, vids]) => ({ year, videos: vids }));
}
