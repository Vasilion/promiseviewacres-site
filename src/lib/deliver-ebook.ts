import { readFile } from "node:fs/promises";
import path from "node:path";
// SES v2 (not v1): v2 allows 40MB messages by default, v1 SendRawEmail caps at
// 10MB. The ebook PDF base64-encodes past 10MB, so it needs the v2 path.
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import MailComposer from "nodemailer/lib/mail-composer";
import { ebook } from "@/content/ebook";

// Reuse the same SES config the contact form uses.
const REGION =
  process.env.CONTACT_SES_REGION || process.env.AWS_REGION || "us-east-1";
const FROM = process.env.CONTACT_FROM_EMAIL;

/**
 * Email the ebook PDF as an attachment to a buyer. Throws if SES isn't
 * configured or the send fails — the caller decides how to react (the webhook
 * returns 500 so Stripe retries).
 */
export async function deliverEbook(to: string, buyerName?: string): Promise<void> {
  if (!FROM) {
    throw new Error("CONTACT_FROM_EMAIL is not configured — cannot send ebook.");
  }

  // Read the PDF from the traced-in file (see next.config outputFileTracingIncludes).
  const pdfAbsPath = path.join(process.cwd(), ebook.pdfPath);
  const pdf = await readFile(pdfAbsPath);

  const greeting = buyerName ? `Hi ${buyerName},` : "Hi there,";
  const text = [
    greeting,
    "",
    `Thank you for your purchase of "${ebook.title}". Your copy is attached to this email as a PDF.`,
    "",
    "If you have any trouble opening it, just reply to this email and we'll help.",
    "",
    "With gratitude,",
    "Promise View Acres",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#2c2418;line-height:1.6">
      <h2 style="color:#246b03;margin:0 0 12px">Thank you for your purchase</h2>
      <p style="margin:0 0 12px">${greeting}</p>
      <p style="margin:0 0 12px">
        Thank you for your purchase of <strong>${ebook.title}</strong>.
        Your copy is attached to this email as a PDF.
      </p>
      <p style="margin:0 0 12px">
        If you have any trouble opening it, just reply to this email and we'll help.
      </p>
      <p style="margin:16px 0 0">With gratitude,<br/>Promise View Acres</p>
    </div>`;

  // Build a raw MIME message with the attachment; SES SendRawEmail ships it.
  const raw = await new MailComposer({
    from: FROM,
    to,
    subject: `Your copy of ${ebook.title}`,
    text,
    html,
    attachments: [
      { filename: ebook.filename, content: pdf, contentType: "application/pdf" },
    ],
  })
    .compile()
    .build();

  const ses = new SESv2Client({ region: REGION });
  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: [to] },
      Content: { Raw: { Data: raw } },
    })
  );
}
