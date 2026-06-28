export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

// Curated homestead gallery. Source photos converted from HEIC/PNG to
// web-optimized JPG (max 1600px long edge) in public/images/gallery/.
// Alt text is intentionally generic — refine per-photo as captions firm up.
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/img_0690.jpg", width: 1200, height: 1600, alt: "A moment from life on Promise View Acres" },
  { src: "/images/gallery/img_3541.jpg", width: 1600, height: 1200, alt: "The land at Promise View Acres" },
  { src: "/images/gallery/img_0773.jpg", width: 1200, height: 1600, alt: "Tending the homestead" },
  { src: "/images/gallery/img_4779.jpg", width: 1352, height: 1600, alt: "Working the land together" },
  { src: "/images/gallery/img_0774.jpg", width: 1200, height: 1600, alt: "A moment from life on Promise View Acres" },
  { src: "/images/gallery/img_1121.jpg", width: 1200, height: 1600, alt: "Growing season on the homestead" },
  { src: "/images/gallery/img_7824.jpg", width: 800, height: 600, alt: "A view across Promise View Acres" },
  { src: "/images/gallery/img_2697.jpg", width: 1200, height: 1600, alt: "Tending the homestead" },
  { src: "/images/gallery/img_2883.jpg", width: 1200, height: 1600, alt: "A moment from life on Promise View Acres" },
  { src: "/images/gallery/img_5024.jpg", width: 739, height: 1600, alt: "Homestead harvest" },
  { src: "/images/gallery/img_2945.jpg", width: 1200, height: 1600, alt: "Working the land together" },
  { src: "/images/gallery/img_3016.jpg", width: 1200, height: 1600, alt: "Growing season on the homestead" },
  { src: "/images/gallery/img_3212.jpg", width: 1200, height: 1600, alt: "A moment from life on Promise View Acres" },
  { src: "/images/gallery/img_4371.jpg", width: 1179, height: 1532, alt: "Homestead harvest" },
  { src: "/images/gallery/img_3810.jpg", width: 1200, height: 1600, alt: "Wildflowers across the property" },
  { src: "/images/gallery/img_5013.jpg", width: 1200, height: 1600, alt: "Wildflowers across the property" },
  { src: "/images/gallery/img_5449.jpg", width: 1179, height: 1564, alt: "A moment from life on Promise View Acres" },
  { src: "/images/gallery/img_5954.jpg", width: 1200, height: 1600, alt: "Tending the homestead" },
  { src: "/images/gallery/img_6011.jpg", width: 1200, height: 1600, alt: "Growing season on the homestead" },
  { src: "/images/gallery/img_6059.jpg", width: 1200, height: 1600, alt: "A moment from life on Promise View Acres" },
  { src: "/images/gallery/img_6449.jpg", width: 1200, height: 1600, alt: "Working the land together" },
  { src: "/images/gallery/img_6678.jpg", width: 1200, height: 1600, alt: "A moment from life on Promise View Acres" },
];
