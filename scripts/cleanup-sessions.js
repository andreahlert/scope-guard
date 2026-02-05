#!/usr/bin/env node
"use strict";

/**
 * Cleanup old session directories
 * Usage: node cleanup-sessions.js [days] [path]
 * - days: delete sessions older than this (default: 7)
 * - path: project path containing .scope-guard (default: cwd)
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const maxAgeDays = parseInt(args[0], 10) || 7;
const projectPath = args[1] || process.cwd();

const sessionsDir = path.join(projectPath, ".scope-guard", "sessions");

if (!fs.existsSync(sessionsDir)) {
  console.log("No sessions directory found.");
  process.exit(0);
}

const now = Date.now();
const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
let deleted = 0;
let kept = 0;

const sessions = fs.readdirSync(sessionsDir);

for (const sessionId of sessions) {
  const sessionPath = path.join(sessionsDir, sessionId);
  const stat = fs.statSync(sessionPath);

  if (!stat.isDirectory()) continue;

  const age = now - stat.mtimeMs;

  if (age > maxAgeMs) {
    fs.rmSync(sessionPath, { recursive: true, force: true });
    deleted++;
  } else {
    kept++;
  }
}

console.log(`Cleanup complete: ${deleted} deleted, ${kept} kept (max age: ${maxAgeDays} days)`);
