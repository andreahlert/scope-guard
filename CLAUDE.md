# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scope Guard is a Claude Code plugin that detects scope creep by comparing the user's original prompt against the actual changes made during a session. It uses Claude Code's native agent hooks system.

## Problem Being Solved

Scope creep/over-engineering is one of the most common complaints in the Claude Code community:

- User asks for a simple fix, Claude refactors 8 files and adds unsolicited abstractions
- Refactoring unrelated code
- Creating unnecessary abstractions (factories, builders, base classes) for trivial tasks
- Adding dependencies without asking
- "Gold-plating" - polishing beyond what was requested

This plugin exists because **zero competitors** were addressing this specific problem. The strategy follows claude-mem's model: do ONE thing well, zero config, zero dependencies.

## Design Principles

- **Minimal footprint**: No external dependencies, only Node.js built-ins
- **Zero config**: Works immediately after install, no API keys or setup
- **Non-blocking**: File tracking is async, only the Stop evaluation is synchronous
- **Lenient by default**: Only flags clear violations, not borderline cases

## Architecture

The plugin consists of three hooks defined in `hooks/hooks.json`:

1. **UserPromptSubmit** (command hook) - `scripts/capture-prompt.js`
   - Captures the original user prompt and current git commit
   - Writes session data to `.scope-guard/session.json`
   - Clears previous `changes.log`

2. **PostToolUse** (command hook, async) - `scripts/track-change.js`
   - Triggers on Edit, Write, NotebookEdit tool calls
   - Appends changed file paths to `.scope-guard/changes.log`
   - Only tracks files within the project directory

3. **Stop** (agent hook)
   - Spawns a subagent with tool access (Read, Bash, Grep)
   - Reads session.json and changes.log
   - Runs `git diff` on only the changed files from this turn
   - Returns `{ok: true}` or `{ok: false, reason: "..."}` to allow/block completion

## State Files

All runtime state is stored in `.scope-guard/sessions/<session_id>/` directory (isolated per session):
- `session.json` - Original prompt, session_id, timestamp, git_commit
- `changes.log` - One file path per line of files changed this turn
- `evaluations.jsonl` - Append-only log of all scope evaluations

This structure allows multiple Claude Code instances to run in parallel on the same project without conflicts.

## Plugin Metadata

- `hooks/hooks.json` - Hook definitions for Claude Code
- `.claude-plugin/plugin.json` - Plugin manifest (name, version, description)
- `.claude-plugin/marketplace.json` - Marketplace listing metadata

## Development Notes

- Zero external dependencies (uses only Node.js built-ins: fs, path, child_process)
- Scripts read JSON input from stdin (Claude Code hook interface)
- Scripts must exit cleanly even on errors to avoid blocking Claude Code
- The agent hook prompt in hooks.json contains the full evaluation logic
- Agent hook explicitly uses Haiku model for fast evaluation (~5-10s)

## Why JavaScript (not TypeScript/Bun)

- **Zero build step**: code runs directly without compilation
- **Universal runtime**: Node.js is available on 99% of systems
- **Zero dev dependencies**: no tsc, @types/node, tsconfig.json
- **Simplicity**: ~100 lines of code doesn't need type safety overhead

## Maintenance

- `scripts/cleanup-sessions.js`: removes session directories older than N days
- Version in 3 places: `package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`
