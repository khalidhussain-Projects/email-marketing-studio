// PreToolUse guard for the Resend MCP server.
// Reads the tool call as JSON on stdin. Exit 0 allows it; exit 2 blocks it
// and the message on stderr is shown to Claude as the reason.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ALLOWED_DOMAIN = "@resend.dev";

// MY_EMAIL comes from a real environment variable if set, otherwise from
// MY_EMAIL=... in the project's .env file. If neither is set, only
// @resend.dev addresses are allowed.
function myEmailFromDotEnv() {
  const envFile = join(dirname(fileURLToPath(import.meta.url)), "..", "..", ".env");
  try {
    for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
      const m = line.trim().match(/^MY_EMAIL\s*=\s*(.*)$/);
      if (m) return m[1].trim().replace(/^(["'])(.*)\1$/, "$2");
    }
  } catch {
    // No .env or unreadable: fall back to the stricter rule.
  }
  return "";
}
const MY_EMAIL = (process.env.MY_EMAIL || myEmailFromDotEnv()).trim().toLowerCase();

// Tools that can reach whole lists of people. Always blocked.
const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

// Tools we check address by address.
const CHECKED = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Blocked by send-guard: ${reason}\n`);
  process.exit(2);
}

// Pull plain addresses out of a string or list, e.g. "Ali <ali@x.com>".
function addressesFrom(value) {
  if (value == null) return [];
  const items = Array.isArray(value) ? value : [value];
  const out = [];
  for (const item of items) {
    if (typeof item !== "string") {
      out.push(String(item));
      continue;
    }
    for (const part of item.split(",")) {
      const s = part.trim();
      if (!s) continue;
      const m = s.match(/<([^>]+)>/);
      out.push((m ? m[1] : s).trim());
    }
  }
  return out;
}

function isAllowed(address) {
  const a = address.toLowerCase();
  if (a.endsWith(ALLOWED_DOMAIN)) return true;
  if (MY_EMAIL && a === MY_EMAIL) return true;
  return false;
}

function checkEmail(email, label) {
  const fields = ["to", "cc", "bcc"];
  const all = fields.flatMap((f) => addressesFrom(email?.[f]));
  if (addressesFrom(email?.to).length === 0) {
    block(`${label} has no "to" address, so it can't be checked.`);
  }
  for (const address of all) {
    if (!isAllowed(address)) {
      block(
        `${label} includes ${address}. Only @resend.dev addresses` +
          (MY_EMAIL ? ` and ${MY_EMAIL}` : "") +
          " are allowed.",
      );
    }
  }
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it was stopped to be safe.");
  }

  const toolName = String(call?.tool_name || "");
  const action = toolName.replace(/^mcp__resend__/, "");
  const input = call?.tool_input || {};

  if (ALWAYS_BLOCK.has(action)) {
    block(`${action} can reach whole lists of people, so it is never allowed.`);
  }

  if (action === "send-email") {
    checkEmail(input, "This email");
  } else if (action === "send-batch-emails") {
    const emails = input.emails;
    if (!Array.isArray(emails) || emails.length === 0) {
      block("the batch has no emails list, so it can't be checked.");
    }
    emails.forEach((email, i) => checkEmail(email, `Email ${i + 1} in the batch`));
  } else if (!CHECKED.has(action)) {
    process.exit(0);
  }

  process.exit(0);
});
