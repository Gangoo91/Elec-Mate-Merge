## What & why

<!-- What does this change do, and why? Link any ticket (e.g. ELE-1234). -->

## How it was verified

<!-- Tick what you ran. -->

- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] Tested the affected flow (device/browser noted below)
- [ ] For import-touching/bulk edits: ran ESLint `no-undef`
- [ ] For DB changes: migration added to `supabase/migrations/`
- [ ] For Edge Functions: deployed and smoke-tested

## Safety checklist

- [ ] No secrets committed (only `VITE_` public vars; `.env` stays ignored)
- [ ] Only files I own are staged (shared tree — no unrelated changes swept in)
- [ ] Change is scoped and reversible; rollback noted if it touches live behaviour
- [ ] UK English; BS 7671 content grounded in authoritative sources

## Screenshots / notes

<!-- Mobile-first: show the phone view for any UI change. -->
