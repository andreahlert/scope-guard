#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

async function main() {
  const input = JSON.parse(await readStdin());
  const { tool_name, tool_input, session_id, cwd } = input;

  // Extract file path based on tool type
  let filePath = null;
  if (tool_input) {
    filePath = tool_input.file_path || tool_input.notebook_path || null;
  }

  if (!filePath || !cwd || !session_id) {
    process.exit(0);
  }

  // Make path relative to project for cleaner output
  // Skip files outside the project directory (e.g. different drive on Windows)
  const normalizedFile = path.resolve(filePath);
  const normalizedCwd = path.resolve(cwd);
  if (!normalizedFile.startsWith(normalizedCwd)) {
    process.exit(0);
  }
  const relativePath = path.relative(normalizedCwd, normalizedFile);

  // Use session-specific directory for isolation
  const stateDir = path.join(cwd, ".scope-guard", "sessions", session_id);
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }

  // Append to changes log (one file path per line)
  const changesPath = path.join(stateDir, "changes.log");
  fs.appendFileSync(changesPath, relativePath + "\n");

  process.exit(0);
}

main().catch(() => process.exit(0));
