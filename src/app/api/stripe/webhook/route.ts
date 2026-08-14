import { NextResponse } from "next/server";
import Stripe from "stripe";
import { deliverEbook } from "@/lib/deliver-ebook";

// Stripe signature verification needs the raw body + Node crypto — run on Node,
// never Edge, and never cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// Best-effort in-memory idempotency. Stripe delivers at-least-once, so the same
// event can arrive twice; this stops a double-send within a warm instance. It
// does NOT survive cold starts — for a single low-volume product that's an
// acceptable trade. Upgrade to a persistent marker if duplicates ever matter.
const processed = new Set<string>();

export async function POST(request: Request) {
  if (!STRIPE_SECRET || !WEBHOOK_SECRET) {
    console.error("[stripe] STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const stripe = new Stripe(STRIPE_SECRET);

  // Raw body is required for signature verification — do not parse first.
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge anything we don't act on so Stripe stops retrying it.
    return NextResponse.json({ received: true });
  }

  if (processed.has(event.id)) {
    return NextResponse.json({ received: true, deduped: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Only fulfill actually-paid sessions.
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, skipped: "unpaid" });
  }

  const email = session.customer_details?.email;
  const name = session.customer_details?.name ?? undefined;
  if (!email) {
    console.error("[stripe] paid session had no customer email:", session.id);
    // Nothing to deliver to — ack so Stripe doesn't hammer us; surfaced in logs.
    return NextResponse.json({ received: true, skipped: "no-email" });
  }

  try {
    await deliverEbook(email, name);
    processed.add(event.id);
    console.log(`[stripe] delivered ebook to ${email} (session ${session.id})`);
    return NextResponse.json({ received: true, delivered: true });
  } catch (err) {
    console.error("[stripe] ebook delivery failed:", err);
    // 500 → Stripe retries with backoff, so a transient SES blip self-heals.
    return NextResponse.json({ error: "Delivery failed." }, { status: 500 });
  }
}
