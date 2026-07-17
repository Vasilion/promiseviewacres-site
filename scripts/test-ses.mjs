/**
 * Promise View Acres — SES smoke test.
 *
 * Verifies the *exact* env-var + credential path the contact form uses, but
 * from a standalone code path so you can confirm SES works before trusting
 * the deployed site. Reads the same vars as src/app/api/contact/route.ts.
 *
 * Usage (from project root, with .env.local populated OR vars exported):
 *   node --env-file=.env.local scripts/test-ses.mjs you@example.com
 *
 * The recipient arg is optional; defaults to CONTACT_TO_EMAIL. In the SES
 * sandbox the recipient MUST be a verified identity or the send will fail.
 */
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const REGION =
  process.env.CONTACT_SES_REGION || process.env.AWS_REGION || "us-east-1";
const FROM = process.env.CONTACT_FROM_EMAIL;
const TO =
  process.argv[2] || process.env.CONTACT_TO_EMAIL || "promiseviewacres@gmail.com";

console.log("SES config:");
console.log("  region:", REGION);
console.log("  from:  ", FROM || "(unset — CONTACT_FROM_EMAIL required)");
console.log("  to:    ", TO);
console.log(
  "  creds: ",
  process.env.AWS_ACCESS_KEY_ID
    ? "AWS_ACCESS_KEY_ID present"
    : "using default provider chain (IAM role / profile)"
);

if (!FROM) {
  console.error("\n✗ CONTACT_FROM_EMAIL is not set. Aborting.");
  process.exit(1);
}

const ses = new SESClient({ region: REGION });

try {
  const out = await ses.send(
    new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [TO] },
      Message: {
        Subject: { Data: "Promise View Acres — SES test ✅" },
        Body: {
          Text: {
            Data: "If you're reading this, SES is wired correctly. You can delete this message.",
          },
        },
      },
    })
  );
  console.log("\n✓ Sent. SES MessageId:", out.MessageId);
  console.log("  Check the", TO, "inbox (and spam).");
} catch (err) {
  console.error("\n✗ SES send failed:");
  console.error("  name:   ", err.name);
  console.error("  message:", err.message);
  // Friendly hints for the most common SES setup failures.
  const m = `${err.name} ${err.message}`.toLowerCase();
  if (m.includes("not verified") || m.includes("email address is not verified")) {
    console.error(
      "\n  → The FROM (and, in sandbox, the TO) address/domain must be a"
    );
    console.error(
      "    VERIFIED identity in SES, in this exact region. Verify it under"
    );
    console.error("    SES → Verified identities, region:", REGION);
  } else if (m.includes("sandbox") || m.includes("account is in the sandbox")) {
    console.error(
      "\n  → Your SES account is still in the SANDBOX. Request production"
    );
    console.error(
      "    access (SES → Account dashboard → Request production access)."
    );
  } else if (
    m.includes("could not load credentials") ||
    m.includes("security token") ||
    m.includes("accessdenied")
  ) {
    console.error(
      "\n  → Credential/permission problem. Ensure the IAM identity has"
    );
    console.error(
      "    ses:SendEmail, or set AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY."
    );
  }
  process.exit(1);
}
