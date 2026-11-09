// Starts the Resend MCP server with settings from .env, on Windows and Mac.
//
// Order of precedence for each setting:
//   1. A real environment variable (if set and not empty)
//   2. The value in .env in the project folder
//   3. The practice default below
//
// Run with --check to print the settings in use (the key is masked) and exit.

import { readFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ENV_FILE = join(PROJECT_DIR, ".env");
const SERVER = "resend-mcp@2.27.1";

const PRACTICE = {
  RESEND_API_KEY: "re_practice",
  RESEND_BASE_URL: "http://localhost:4000",
  SENDER_EMAIL_ADDRESS: "onboarding@resend.dev",
};

// Read KEY=value lines. Ignores blank lines and # comments, trims quotes.
function readEnvFile(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const s = line.trim();
    if (!s || s.startsWith("#")) continue;
    const eq = s.indexOf("=");
    if (eq < 1) continue;
    const key = s.slice(0, eq).trim();
    let value = s.slice(eq + 1).trim();
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
    out[key] = value;
  }
  return out;
}

const fromFile = readEnvFile(ENV_FILE);
const settings = {};
const source = {};
for (const key of Object.keys(PRACTICE)) {
  if (process.env[key]) {
    settings[key] = process.env[key];
    source[key] = "environment variable";
  } else if (fromFile[key]) {
    settings[key] = fromFile[key];
    source[key] = ".env";
  } else {
    settings[key] = PRACTICE[key];
    source[key] = "practice default";
  }
}

if (process.argv.includes("--check")) {
  const k = settings.RESEND_API_KEY;
  const masked = k.length > 8 ? `${k.slice(0, 5)}…(${k.length} chars)` : k;
  const live = !settings.RESEND_BASE_URL.includes("localhost");
  console.log(`Mode: ${live ? "LIVE (real emails can be sent)" : "practice"}`);
  console.log(`.env file: ${existsSync(ENV_FILE) ? "found" : "not found"}`);
  console.log(`RESEND_API_KEY       = ${masked}  [${source.RESEND_API_KEY}]`);
  console.log(`RESEND_BASE_URL      = ${settings.RESEND_BASE_URL}  [${source.RESEND_BASE_URL}]`);
  console.log(`SENDER_EMAIL_ADDRESS = ${settings.SENDER_EMAIL_ADDRESS}  [${source.SENDER_EMAIL_ADDRESS}]`);
  process.exit(0);
}

// npx is npx.cmd on Windows, so use a shell there.
const child = spawn("npx", ["-y", SERVER], {
  stdio: "inherit",
  env: { ...process.env, ...settings },
  shell: process.platform === "win32",
});
child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => child.kill(sig));
