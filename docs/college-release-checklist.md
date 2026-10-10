# College Hub release checklist

Things that must happen when the uncommitted College Hub work is pushed and deployed. Kept up to date as work lands (started 10 Oct 2026).

## Switch on after the client is live
- [ ] **AM2 exposure alerts cron** (`college-am2-exposure-alerts-weekly`, job 215, Mondays 07:45). Paused 10 Oct because learners cannot tag inspection & testing / fault finding / safe isolation until the client ships, so it would alert every employer. Re-enable: `select cron.alter_job(215, active := true);`
- [ ] **Employer weekly digest** (`employer-weekly-digest-sunday`, Employer Hub, ELE-1836): only after its unsubscribe page `/weekly-email.html` is deployed (employer session's work).

## Decisions for Andrew before or at release
- [ ] `public/for-colleges.html` (static, canonical since May for the edu_q2_2026 cold campaign) still overrides the new React `/for-colleges`. Remove it to serve the new page, or keep it.
- [x] Serving NET's AM2S v1 Candidate Checklist PDF from `public/forms/net/` (ELE-2050): Andrew decided 10 Oct it's fine; NET publishes it for people to use. Served unaltered.
- [ ] ELE-2037: does app-tracked study time count as off-the-job hours? (ILR HRS3 currently verified-only.)
- [ ] ELE-2045: pricing model vs funding rule para 220; fill every `[PRICING …]` placeholder (ForCollegesPage `COLLEGE_PRICING_COPY`, sales kit, billing).
- [ ] Apply the held DROP of retired schemas: `supabase/release-held/20261010169000_drop_retired_schemas_ele1918_DO_NOT_APPLY.sql` (pre-flight checklist inside).

## Dashboard / external steps
- [ ] Raise the Supabase project storage cap (Dashboard → Storage → Settings; currently 50MB).
- [ ] **Staff two-step sign-in (ELE-1915):** turn on TOTP in Supabase (Authentication → Multi-Factor), then run `update public.platform_security_settings set totp_enrolment_enabled = true, updated_at = now();` and flip `TOTP_ENROLMENT_ENABLED` in `src/components/settings/SecuritySection.tsx`. Safeguarding leads are then asked for two steps by default; a college can require it for all staff in Settings.
- [ ] **Microsoft sign-in (ELE-1971):** follow `docs/college-microsoft-sign-in-setup.md` (Entra app registration, enable Azure in Supabase Auth, redirect URLs). The button stays hidden until the provider is on.
- [ ] **CI (ELE-1968):** add GitHub secrets `SUPABASE_ACCESS_TOKEN`, `COLLEGE_E2E_IQA_EMAIL`/`_PASSWORD` (values in `e2e/.auth/college-demo-iqa.json`), `COLLEGE_E2E_ASSESSOR_EMAIL`/`_PASSWORD`; later `COLLEGE_E2E_ADMIN_*` and `COLLEGE_E2E_EMPLOYER_*` once those fixture accounts exist (they don't yet).
- [ ] **Postgres upgrade** from 15.8 (Settings → Infrastructure) (ELE-1915).
- [ ] **Sentry:** confirm `SENTRY_AUTH_TOKEN` is set in Vercel for source maps.
- [ ] **Native build (ELE-1969):** sync + build iOS (TestFlight) and Android (Play internal); test join-by-code and push deep links on real devices; insert current `app_versions` rows (only iOS 1.0.3 exists, no Android); then set the college floor, e.g. `update app_versions set feature_minimums='{"college":{"build":48}}' where is_current;`
- [ ] **Support view-as (ELE-1966) decision:** a global read-only PostgREST pre-request hook was blocked by the permission system. Without it, security-definer RPCs/edge functions that accept a platform admin can still write while viewing as. Decide whether to add that hook.

## Trust pack placeholders (ELE-1972, /college/trust)
- [ ] Company legal name, registration number, registered office, ICO number; hosting regions for Vercel/OpenAI/Gemini/PDFMonkey/Brevo/Stripe/RevenueCat; backups and PITR; breach-notice hours; retention after contract end; insurance and certifications; sub-processor notice period; switch-on dates for staff MFA and Microsoft sign-in; under-18 decisions (email suppression, minimum age, guardian contacts); manual accessibility audit date.
- [x] AI-use statement and data exit plan added to the pack (10 Oct).
- [ ] Still to add: a VPAT-style conformance report (needs the manual audit) and breach-notice terms (legal wording).

## After push
- [ ] Close the Linear tickets whose work shipped (see each ticket's comment).
- [ ] Run the full college suite + `29-nav-crawl` against the deployed site.
