# Scope Guard

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/andreahlert/scope-guard/releases)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-purple.svg)](https://claude.ai/code)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green.svg)](package.json)

**Stop AI scope creep.** A Claude Code plugin that detects when your AI coding agent goes beyond what you asked for.

You ask: *"Fix the typo in README"*
Claude does: fixes typo + refactors 8 files + adds new abstractions

Scope Guard catches this and blocks completion with a clear report.

## How It Works

1. **You submit a prompt** - Scope Guard captures your original request
2. **Claude works** - Every file edit is tracked silently in the background
3. **Claude tries to stop** - Scope Guard compares original intent vs actual changes using an LLM evaluation
4. **Scope creep detected?** - Claude is blocked from stopping and shown what went beyond scope

## Install

Inside Claude Code, run:

```
/plugin marketplace add andreahlert/scope-guard
/plugin install scope-guard
```

Done. No restart needed.

### Manual install (alternative)

```bash
git clone https://github.com/andreahlert/scope-guard.git
```

Then load it directly:

```bash
claude --plugin-dir /path/to/scope-guard
```

## What You Get

```
You: "Fix the login validation bug"

Claude: [edits src/auth/login.ts, src/auth/register.ts,
         creates src/events/event-bus.ts, edits package.json]

Scope Guard: Scope creep detected. Original task was to fix login
validation, but changes include a new event bus system, registration
flow refactor, and a new npm dependency. These go beyond the original
bug fix request.
```

## Zero Config

No API keys. No setup files. No dependencies.

Scope Guard uses Claude Code's native agent hooks, which means the LLM evaluation runs on YOUR existing Claude Code subscription. No extra costs.

## How It Works (Technical)

Three hooks, two scripts, zero dependencies:

| Hook | What it does |
|------|-------------|
| `UserPromptSubmit` (command) | `capture-prompt.js` saves your original prompt + git commit to `.scope-guard/sessions/<session_id>/session.json` |
| `PostToolUse` (command, async) | `track-change.js` appends each changed file to `.scope-guard/sessions/<session_id>/changes.log` |
| `Stop` (agent) | Spawns a subagent that reads session data, runs `git diff`, and evaluates scope alignment |

### State Files

Scope Guard creates a `.scope-guard/` directory in your project:
- `sessions/<session_id>/session.json` - Original prompt + git state
- `sessions/<session_id>/changes.log` - List of files changed this session
- `sessions/<session_id>/evaluations.jsonl` - Log of scope evaluations

Each Claude Code session gets its own directory, so multiple instances can run in parallel without conflicts.

Add `.scope-guard/` to your `.gitignore`.

To clean up old sessions (default: older than 7 days):
```bash
node /path/to/scope-guard/scripts/cleanup-sessions.js [days] [project-path]
```

### The Evaluation

The Stop hook uses an **agent hook** - a subagent with tool access (Read, Bash, Grep) that:
1. Reads `.scope-guard/sessions/<session_id>/session.json` to get the original user request
2. Reads `.scope-guard/sessions/<session_id>/changes.log` to see which files were touched
3. Runs `git diff --stat` to get a summary of actual changes
4. Evaluates whether the changes match the original intent
5. Returns `{ok: true}` or `{ok: false, reason: "..."}` to block/allow completion

The agent flags:
- **Scope creep**: New features, unrelated refactoring, unrelated bug fixes
- **Over-engineering**: Unnecessary abstractions for simple tasks

## FAQ

**Does it slow down Claude?**
No. File tracking is async. The only synchronous check happens when Claude tries to stop (the git diff + LLM eval, ~5-10 seconds).

**What if I WANT Claude to make extra changes?**
If Claude is blocked, it will tell you why. You can then instruct Claude to proceed with the additional changes. The stop hook only fires once per stop attempt.

**Does it work without git?**
Partially. File tracking works, but the git diff comparison won't be available. The LLM will evaluate based on file names only.

**Does it cost extra?**
No. The agent hook uses Claude Code's built-in LLM access (your existing subscription).

**Can I disable it temporarily?**
Type `/hooks` in Claude Code and toggle it off, or set `"disableAllHooks": true` in your settings.

## Requirements

- Claude Code >= 1.0.0
- Node.js >= 16
- Git (recommended, not required)

## License

AGPL-3.0
