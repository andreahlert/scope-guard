# Scope Guard

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Version](https://img.shields.io/badge/version-0.0.1-green.svg)](https://github.com/andreahlert/scope-guard/releases)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-purple.svg)](https://claude.ai/code)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)
[![Zero Config](https://img.shields.io/badge/config-zero-brightgreen.svg)](package.json)

> **"Add email OTP login"** becomes a 12-file authentication framework.
> **"Fix this type error"** somehow requires restructuring half your app.
>
> Sound familiar?

**Scope Guard** is a Claude Code plugin that detects when your AI coding agent goes beyond what you asked for - and stops it before completion.

---

## The Problem

This is the #1 complaint in the Claude Code community:

```
You: "Fix the typo in README.md"

Claude: *fixes typo*
        *adds author to package.json*
        *creates src/utils/helpers.js*
        *updates CHANGELOG.md*
        *refactors imports "while I'm here"*

You: "I just wanted the typo fixed..."
```

Real issues from the community:
- [Claude makes destructive unauthorized changes](https://github.com/anthropics/claude-code/issues/7972) - "Asked to fix 1 service, broke 17 of 21"
- [Over-Engineering bug](https://github.com/anthropics/claude-code/issues/7663) - "Turning 3 products into 6+"
- [Violates refactoring principles](https://github.com/anthropics/claude-code/issues/1638) - "Changes behavior during refactoring"

---

## The Solution

```
┌─────────────────────────────────────────────────────────────────┐
│  YOU: "Fix the login validation bug"                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CLAUDE TRIES TO:                                               │
│  ├── Edit src/auth/login.ts           ← Related to request     │
│  ├── Edit src/auth/register.ts        ← NOT requested          │
│  ├── Create src/events/event-bus.ts   ← NOT requested          │
│  └── Edit package.json (new dep)      ← NOT requested          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  SCOPE GUARD:                                                   │
│                                                                 │
│  ❌ BLOCKED - Scope creep detected                              │
│                                                                 │
│  • register.ts: Changes to registration flow not requested      │
│  • event-bus.ts: New event system not part of bug fix           │
│  • package.json: Added dependency without approval              │
│                                                                 │
│  Original task: "Fix the login validation bug"                  │
│  Only login.ts changes are justified.                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Install

Inside Claude Code:

```bash
/plugins add https://github.com/andreahlert/scope-guard
```

That's it. **Zero config. Zero API keys. Zero dependencies.**

---

## How It Works

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    SUBMIT    │    │    TRACK     │    │   EVALUATE   │
│    PROMPT    │───▶│    CHANGES   │───▶│   AT STOP    │
└──────────────┘    └──────────────┘    └──────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  Captures your      Silently logs       Compares prompt
  original request   every file edit     vs actual changes
  + git commit       in background       using git diff
```

### Three hooks, two scripts, zero magic:

| Hook | Script | What it does |
|------|--------|--------------|
| `UserPromptSubmit` | `capture-prompt.js` | Saves your prompt to `session.json` |
| `PostToolUse` | `track-change.js` | Logs each Edit/Write to `changes.log` |
| `Stop` | Agent hook | Runs `git diff`, evaluates scope alignment |

### The Evaluation Rules

The Stop hook asks one question for **each changed file**:

```
"Is this file EXPLICITLY mentioned in the prompt?"
    │
    ├── YES → Check if changes match what was asked
    │
    └── NO  → Is it OBVIOUSLY required? (imports, types, tests)
                  │
                  ├── YES → Allow
                  └── NO  → SCOPE CREEP
```

**Critical rule:** Same folder ≠ related. "Change Header" does NOT permit Footer changes.

---

## Examples

### Acceptable Changes

| Prompt | Changes | Verdict |
|--------|---------|---------|
| "Add validateEmail to utils.js with tests" | `utils.js`, `utils.test.js` | ✅ OK - tests requested |
| "Add TypeScript types to processOrder" | `orders.ts`, `types/order.ts` | ✅ OK - types required |
| "Add dark mode support" | `App.jsx`, `useTheme.js`, `dark.css` | ✅ OK - all related to feature |

### Scope Creep (Blocked)

| Prompt | Changes | Verdict |
|--------|---------|---------|
| "Fix typo in README" | `README.md`, `package.json` | ❌ BLOCKED - package.json not requested |
| "Add error log to api.js" | `api.js`, `utils.js`, `config.js` | ❌ BLOCKED - utils/config not related |
| "Fix discount bug" | `checkout.js`, `package.json` (new dep) | ❌ BLOCKED - new dependency not requested |
| "Update Header title" | `Header.jsx`, `Footer.jsx` | ❌ BLOCKED - Footer not requested |

---

## What Happens When Blocked?

Claude is prevented from completing and shown the reason:

```
Scope Guard: Cannot complete - scope creep detected.

Files beyond original request:
• src/utils.js: Refactored to arrow functions (not requested)
• src/config.js: Added new config structure (not requested)

Original prompt: "Add error logging to api.js"

To proceed with these additional changes, please explicitly
request them or acknowledge the expanded scope.
```

You can then:
1. Tell Claude to undo the extra changes
2. Explicitly approve the expanded scope
3. Start fresh with a more specific prompt

---

## FAQ

**Does it slow down Claude?**
No. File tracking is async. The only pause is at completion (~5-10 seconds for git diff + evaluation).

**What if I WANT Claude to make extra changes?**
Just tell Claude to proceed. The block is informational - you're in control.

**Does it work without git?**
Partially. File tracking works, but evaluation will be based on file names only.

**Does it cost extra?**
No. Uses Claude Code's built-in LLM access (your existing subscription).

**Can I disable it temporarily?**
Run `/hooks` and toggle it off, or set `"stop_hook_active": true` in your prompt.

---

## State Files

Scope Guard creates `.scope-guard/` in your project:

```
.scope-guard/
└── sessions/
    └── <session_id>/
        ├── session.json      # Original prompt + git state
        ├── changes.log       # Files changed this session
        └── evaluations.jsonl # Scope check history
```

Add `.scope-guard/` to your `.gitignore`.

Clean up old sessions:
```bash
node scripts/cleanup-sessions.js [days] [project-path]
```

---

## Requirements

- Claude Code >= 1.0.0
- Node.js >= 16
- Git (recommended)

---

## Why This Exists

Scope creep is the most common complaint about AI coding assistants:

> "The model will try to be helpful and 'clean up' unrelated code, which is how bugs sneak in."
> - Boris Cherny, Claude Code creator

> "Asked to fix 1 service's migration issue. Made sweeping architectural changes without permission. Broke 17 out of 21 services."
> - [GitHub Issue #7972](https://github.com/anthropics/claude-code/issues/7972)

Existing solutions tell Claude what NOT to do. **Scope Guard verifies what Claude actually DID** - and blocks if it went too far.

---

## Contributing

Issues and PRs welcome. This plugin intentionally has:
- Zero external dependencies
- Zero build steps
- Zero config files

Let's keep it that way.

---

## License

AGPL-3.0
