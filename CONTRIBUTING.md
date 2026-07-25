# Contributing to Elec-Mate

This is a private, proprietary codebase. These notes keep changes safe on a live
product used every day by working electricians.

## Ground rules

- **Branch from `main`.** Keep each change scoped to one concern.
- **Never commit secrets.** Only `VITE_`-prefixed (client-side, public) variables belong
  in `.env`, and `.env` itself is git-ignored — use `.env.example` as the template.
  Server-side secrets live in Supabase Function secrets and Vercel env vars.
- **Small, reversible steps.** Prefer a slice that can be verified and shipped over a large
  bundled change on the live app.

## Before you open a PR

```sh
npm run lint          # ESLint must pass
npm run format:check  # Prettier
npm test              # Playwright (for user-facing flows)
```

- After any import-touching or bulk edit, run ESLint's `no-undef` check — a green build can
  still hide an undefined-component runtime crash.
- Only stage files you fully own. This is a shared tree; do not sweep another change into
  your commit.

## Database & Edge Functions

- Schema changes go through migrations in `supabase/migrations/` — never edit the database
  out of band without a mirrored migration.
- Deploy Edge Functions with:
  ```sh
  npx supabase functions deploy <function-name> --project-ref <project-ref>
  ```
- Prefer a `SECURITY DEFINER` RPC over a new Edge Function unless the work genuinely needs
  external APIs, secrets or streaming.

## Content & compliance

- All BS 7671 content must be grounded in authoritative sources, never invented.
- UK English throughout (analyse, colour, centre, licence, programme, metre).

## Design

- Mobile-first, native-app feel: 44px touch targets, `touch-manipulation`, bottom sheets
  over modals. See the design system in `CLAUDE.md` and `.claude/rules/`.

## Security

Report vulnerabilities privately per [SECURITY.md](./SECURITY.md) — never in a public issue.
