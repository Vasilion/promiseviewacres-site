import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { contactSchema } from "@/lib/contact-schema";

// SES SDK needs the Node runtime (not Edge). Always run dynamically.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REGION =
  process.env.CONTACT_SES_REGION || process.env.AWS_REGION || "us-east-1";
const FROM = process.env.CONTACT_FROM_EMAIL;
const TO = process.env.CONTACT_TO_EMAIL || "promiseviewacres@gmail.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const { name, email, phone, subject, message, company } = parsed.data;

  // Honeypot tripped — silently accept so bots don't learn anything.
  if (company) return NextResponse.json({ ok: true });

  if (!FROM) {
    console.error("[contact] CONTACT_FROM_EMAIL is not configured");
    return NextResponse.json(
      { error: "The contact form isn't fully set up yet. Please email us directly." },
      { status: 500 }
    );
  }

  const lines = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "—"}`,
    `Subject: ${subject || "—"}`,
    "",
    "Message:",
    message,
  ];
  const text = lines.join("\n");
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#2c2418;line-height:1.6">
      <h2 style="color:#246b03;margin:0 0 12px">New message from the Promise View Acres site</h2>
      <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:4px 0"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:4px 0"><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <p style="margin:4px 0"><strong>Subject:</strong> ${escapeHtml(subject || "—")}</p>
      <hr style="border:none;border-top:1px solid #eae3d7;margin:16px 0" />
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>`;

  try {
    const ses = new SESClient({ region: REGION });
    await ses.send(
      new SendEmailCommand({
        Source: FROM,
        Destination: { ToAddresses: [TO] },
        ReplyToAddresses: [email],
        Message: {
          Subject: {
            Data: subject
              ? `PVA Contact — ${subject}`
              : `New contact form message from ${name}`,
          },
          Body: {
            Text: { Data: text },
            Html: { Data: html },
          },
        },
      })
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] SES send failed:", err);
    return NextResponse.json(
      {
        error:
          "Something went wrong sending your message. Please try again or email us directly.",
      },
      { status: 502 }
    );
  }
}
