#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

async function main() {
  const input = JSON.parse(await readStdin());
  const { prompt, session_id, cwd } = input;

  if (!prompt || !cwd || !session_id) {
    process.exit(0);
  }

  // Use session-specific directory for isolation
  const stateDir = path.join(cwd, ".scope-guard", "sessions", session_id);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }

  // Capture git state (validate hash to prevent injection)
  let gitCommit = null;
  try {
    const raw = execSync("git rev-parse HEAD", {
      cwd,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    if (/^[0-9a-f]{40}$/.test(raw)) {
      gitCommit = raw;
    }
  } catch (_) {
    // Not a git repo - that's fine
  }

  // Save session
  const session = {
    session_id,
    original_prompt: prompt,
    timestamp: new Date().toISOString(),
    git_commit: gitCommit,
  };

  fs.writeFileSync(
    path.join(stateDir, "session.json"),
    JSON.stringify(session, null, 2)
  );

  // Clear previous changes
  const changesPath = path.join(stateDir, "changes.log");
  if (fs.existsSync(changesPath)) {
    fs.unlinkSync(changesPath);
  }

  process.exit(0);
}

main().catch(() => process.exit(0));
