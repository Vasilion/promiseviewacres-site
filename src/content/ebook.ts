/**
 * Promise View Acres — ebook product config.
 * Single source of truth for the paid ebook: sales copy, price, the Stripe
 * Payment Link, and the on-disk PDF that gets attached to the delivery email.
 *
 * PLACEHOLDER VALUES — swap before launch:
 *  - `price` / `title` / `description` → real product copy.
 *  - `paymentLinkUrl` → the live Stripe Payment Link (or set NEXT_PUBLIC_EBOOK_PAYMENT_LINK).
 *  - assets/ebook/promise-view-acres-ebook.pdf → the real ebook file.
 */

export const ebook = {
  title: "Your First Garden",
  // Short line under the title on the sales page.
  tagline: "Your first season, done right — a beginner's guide to growing food.",
  // Shown as the price on the sales page. Keep in sync with the Stripe product.
  price: "$19.99",
  // The Stripe-hosted Payment Link. Prefer the env var so test/live can differ
  // without a code change; fall back to this literal for local scaffolding.
  paymentLinkUrl:
    process.env.NEXT_PUBLIC_EBOOK_PAYMENT_LINK ||
    "https://buy.stripe.com/fZu14oa6g95g9k502vgnK00",

  // Longer sales copy. Paragraphs render in order.
  description: [
    "For a very long period of time, I was you. Face to face with the reality that a majority of what I was putting into my body was designed to do me immense harm. I had watched enough documentaries, read plenty of labels, and researched enough ingredients to know that something was seriously wrong with the “food” we are being sold. And yet I kept waiting. More time. More money. More space. More knowledge. More everything.",
    "Here's what I eventually figured out. You don't need more of any of that to begin. You just need a simple first step and someone to walk you through it clearly.",
    "That is exactly what this guide is. No fluff, no overwhelming information, no trying to teach you everything at once. Just a clear, honest, step by step path from where you are right now to a finished garden bed with real food growing in it.",
    "By the time you finish reading this you will have a spot picked, a bed built, and everything you need to put your first plants in the ground. Getting you off the sidelines and into the ground, growing real food. Breaking free from a system that never had you in mind, and aligning with the One that has from the very beginning.",
  ],
  // Bullet list of what's inside (optional; leave empty to hide the section).
  includes: [
    "Find Your Spot",
    "Start Small",
    "Get Your Materials",
    "Prepare the Ground",
    "Fill Your Bed",
    "Choose What to Grow",
    "Know When to Plant",
    "Get Your Plants in the Ground",
  ],

  // Delivery: the PDF is attached to the confirmation email. Path is relative
  // to the repo root and traced into the serverless bundle via
  // next.config `outputFileTracingIncludes`. `filename` is what the buyer sees.
  pdfPath: "assets/ebook/promise-view-acres-ebook.pdf",
  filename: "Your-First-Garden.pdf",
} as const;
