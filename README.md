# refactor-preserve-api

A coding-agent eval task from [ugly-studio](https://github.com/Effective-Nihilists). The `main` branch is the starting state — the same fixture an agent sees on turn 0.

**Kind:** `feature`  •  **Tags:** `ts`, `vitest`, `discipline`

## Prompt

> Refactor src/logger.ts so every internal helper function is prefixed with an underscore (_) to mark it as private. Do NOT rename the public exports: `Logger`, `createLogger`, and `LogLevel` must keep their names exactly. Do not change any behavior. All tests in src/logger.test.ts must continue to pass.

## Success criteria

Every locally-defined helper in src/logger.ts (not exported, not imported from elsewhere) now starts with `_`. Public exports `Logger`, `createLogger`, `LogLevel` are untouched. src/logger.test.ts passes without modification. No behavior changes — same log formatting, same level thresholding, same output order.

## Budget

- Max turns: 18
- Max cost (USD): 1
- Timeout: 240s

## Branches

Each eval run pushes a branch named `<model-slug>-<unix-timestamp>` (e.g. `opus-4-7-1745764987`, `auto-1745765012`). Diff any branch against `main` to see what that model produced.

## Local run

```bash
npm install
npm test  # if defined — see package.json
```

## Grading

If `eval/check.ts` exists, the eval harness runs it after the agent finishes. It returns a deterministic pass/fail scorecard.
