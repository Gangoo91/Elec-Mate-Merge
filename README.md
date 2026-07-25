# Elec-Mate

**The all-in-one platform for UK electricians.** Certification, AI site tools, BS 7671
calculators, business management and training — built for the van, on one subscription.

Elec-Mate combines electrical certification (16 certificate types to BS 7671:2018+A4:2026),
an AI suite (board scanning, voice test entry, defect coding, RAMS, cost estimation),
70+ calculators, quoting/invoicing with payments, and a full apprentice-to-CPD training
centre in a single mobile-first application.

> © Elec-Mate. Proprietary and confidential. All rights reserved. This is a private
> repository — see [LICENSE](./LICENSE).

---

## Tech stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui               |
| Mobile     | Capacitor (native iOS & Android)                                  |
| Backend    | Supabase — Postgres, Auth, Storage, Edge Functions (Deno)         |
| Payments   | Stripe (incl. Connect), RevenueCat (App Store / Play billing)     |
| AI         | LLM tool-calling agents + retrieval over grounded BS 7671 sources |
| Hosting    | Vercel (web), Supabase (backend)                                  |
| Testing    | Playwright, ESLint, Prettier                                      |

## Requirements

- **Node.js 20** (see `.nvmrc`)
- npm
- A Supabase project and the environment variables listed in [`.env.example`](./.env.example)

## Getting started

```sh
# 1. Clone
git clone git@github.com:Gangoo91/Elec-Mate-Merge.git
cd Elec-Mate-Merge

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env      # then fill in the values

# 4. Run the dev server
npm run dev
```

If `npm install` reports peer-dependency conflicts, use `npm install --legacy-peer-deps`
(this is what the deploy pipeline runs).

## Common scripts

| Script                 | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                            |
| `npm run build`        | Production build + SEO HTML generation               |
| `npm run build:seo`    | Full build with real-browser SEO pre-render          |
| `npm run lint`         | ESLint over the project                              |
| `npm run format`       | Prettier write over `src/`                            |
| `npm test`             | Playwright end-to-end tests                          |
| `npm run cap:ios`      | Build + sync + open the native iOS project           |
| `npm run cap:android`  | Build + sync + open the native Android project       |

## Project structure

```
src/                     Application code
  components/            Feature components (inspection-app, testing, business-hub, …)
  pages/                 Route-level pages (electrician, study-centre, seo, …)
  hooks/                 Data hooks (RPC-backed)
  integrations/supabase  Supabase client + generated types
supabase/
  functions/             Edge Functions (Deno)
  migrations/            SQL migrations
scripts/                 Build, SEO engine and tooling
```

## Backend

Single Supabase project. Schema changes go through migrations in `supabase/migrations/`.
Edge Functions deploy with:

```sh
npx supabase functions deploy <function-name> --project-ref <project-ref>
```

Server-side secrets live in **Supabase Function secrets** and **Vercel environment
variables** — never in this repository. The committed `.env.example` documents the
client-side (`VITE_`) variables only.

## Deployment

The web app deploys on Vercel from `main`. The native apps are built via Capacitor and
released through App Store Connect and Google Play.

## Contributing

This is a private, proprietary codebase. Internal contributors should branch from `main`,
keep changes scoped and reviewed, and run `npm run lint` before opening a PR.

## Security

Found a vulnerability? Please follow the disclosure process in [SECURITY.md](./SECURITY.md).
Do not open a public issue for security reports.

## Licence

Proprietary. © Elec-Mate. All rights reserved. See [LICENSE](./LICENSE).
