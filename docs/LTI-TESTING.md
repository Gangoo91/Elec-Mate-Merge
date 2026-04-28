# LTI 1.3 Testing Guide

End-to-end test plan for the Elec-Mate ↔ college LMS integration. Companion to:

- `scripts/test-lti.sh` — automated smoke runner (Layer 1)
- `scripts/test-lti.http` — manual exploratory requests
- `PORTFOLIO_LTI_IMPLEMENTATION_PLAN.md` — overall design + roadmap
- `docs/LTI-KEY-ROTATION.md` — RSA key rotation runbook

There is **no dev / skip-signature mode** in `lti-launch`. Every launch must verify a real RS256 JWT against a real platform's JWKS. Testing therefore means standing up real LMS instances and walking the OIDC + launch flow.

---

## Architecture recap

| Endpoint | Purpose | Auth |
| -------- | ------- | ---- |
| `/functions/v1/lti-jwks` | Publish our public RSA key set | Public |
| `/functions/v1/lti-oidc-init` | Step 1: third-party-initiated login | Public, deployed `--no-verify-jwt` |
| `/functions/v1/lti-launch` | Step 2: verify id_token, provision user, hand off | Public, deployed `--no-verify-jwt` |
| `/functions/v1/lti-dynamic-register` | LTI Dynamic Registration | Public, time-limited registration token |
| `/functions/v1/lti-health` | Probe keys + JWKS + DB | Public |
| `/functions/v1/lti-verify-platform` | Admin: live-check a registered platform | Supabase JWT, `profile.college_id` must match |

DB tables involved: `lti_platforms`, `lti_launch_sessions` (10-min TTL), `lti_launches` (audit), `lti_user_mappings`, `lti_context_mappings`, `colleges`, `profiles`.

---

## Layer 1 — Smoke (do this on every deploy)

```bash
./scripts/test-lti.sh
```

What it covers: JWKS shape, health checks, OIDC init negative paths, launch negative paths, CORS preflight.

What it does **not** cover: real launches, redirect targets, user provisioning, magic-link handoff.

Run this in CI on any PR that touches `supabase/functions/lti-*` or `_shared/lti-*`.

### Quick manual probes

```bash
# JWKS — should return at least one RSA key, kid matches LTI_KEY_ID secret
curl -s https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-jwks | jq

# Health — status=ok in normal operation
curl -s https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-health | jq
```

---

## Layer 2 — IMS LTI 1.3 Reference Implementation

The 1EdTech / IMS Global reference platform is the gold-standard conformance suite. It will drive a full OIDC + launch + Deep Linking + AGS + NRPS handshake against your endpoints and report which assertions pass.

**Why this matters more than a single LMS:** real LMSes are forgiving about spec edge-cases. The reference tool is not. Failing a Moodle test could mean Moodle is wrong; failing the reference tool means we are wrong.

**Process:**

1. Create a tenant on the IMS LTI 1.3 Reference Tool.
2. Register Elec-Mate as a tool with:
   - **Initiate login URL:** `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-oidc-init`
   - **Redirect / target link URI:** `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-launch`
   - **Public JWKS URL:** `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lti-jwks`
3. Take the `issuer`, `client_id`, `deployment_id`, `auth_login_url`, `auth_token_url`, `jwks_url` it gives you and insert a row into `lti_platforms` (or use Dynamic Registration).
4. Run the **Core Launch** suite. Fix any red.
5. Skip Deep Linking, AGS, NRPS suites for now — they are not yet wired (see "Known gaps" below).

After this passes, you have high confidence the implementation is spec-correct.

---

## Layer 3 — Real LMS sandboxes

Pick the platforms your target colleges use. UK FE colleges are heavily Moodle, with some Canvas, Bud, Aptem.

### Moodle sandbox

- **Cloud:** `moodlecloud.com` 45-day free trial.
- **Local:** `docker run -d -p 8080:80 bitnami/moodle:latest` (give it 5 min to bootstrap).
- Site administration → Plugins → Activity modules → External tool → Manage tools → "configure a tool manually" **or** paste your Dynamic Registration URL (`{base}/functions/v1/lti-dynamic-register?college_id=<uuid>`).
- Add tool to a course as an "External tool" activity.

### Canvas sandbox

- `canvas.instructure.com/register` — free for teachers.
- Admin → Developer Keys → "+ LTI Key" → paste JSON config (or use Dynamic Registration).
- In a course: Settings → Apps → "+ App" → External Tool.

### Test matrix (per platform)

Walk every row. Record outcomes in a spreadsheet so you can compare across platforms.

| # | Test | Expected behaviour | How to verify |
|---|------|--------------------|---------------|
| 1 | Student launch from a course | Lands on `/college` (or mapped cohort route), correct user identity | Check `profiles` row, JWT email matches `auth.users.email` |
| 2 | Tutor launch (different role) | Same flow, role claim respected, role-gated UI shown | Inspect `lti_launches.roles` |
| 3 | Same student, second launch | Re-uses existing `lti_user_mappings` row, no duplicate user | `select count(*) from lti_user_mappings where lti_sub = '...'` should stay at 1 |
| 4 | Email change on the LMS, then re-launch | `auth.users.email` updates to new value | Compare before/after |
| 5 | Replay attack — re-POST same id_token | Rejected, error logged | `lti_launches.success=false`, `error_reason` mentions nonce |
| 6 | Tampered JWT (flip a byte in payload) | Rejected at signature verify | `lti_launches.error_reason` mentions signature |
| 7 | Stale `lti_launch_sessions` row (wait > 10 min between init and launch) | Rejected | `error_reason` mentions expired/missing session |
| 8 | Wrong `client_id` / `deployment_id` | Rejected | `error_reason` mentions unknown platform/deployment |
| 9 | Dynamic Registration | Auto-creates `lti_platforms` row with `status='Connected'` | `select * from lti_platforms order by created_at desc limit 1` |
| 10 | `/lti-verify-platform` for that row | All 4 checks (host consistency, JWKS, login URL, token URL) green | Response body, plus `lti_platforms.status` flips to Connected |
| 11 | Iframe embed (most LMS launches are iframed) | `LtiHandoff.tsx` breaks out of frame, magic link consumed | Watch network tab, no `X-Frame-Options` errors |
| 12 | Mobile WebView launch (Moodle / Canvas mobile apps) | Handoff still works, magic link consumed | Test on real device |
| 13 | Two launches from two different colleges, same email | Two separate `lti_user_mappings` rows, but possibly one `auth.users` row | Verify isolation |
| 14 | Course context mapped to a cohort via `lti_context_mappings` | Student lands on that cohort's route | Insert mapping row, re-launch |
| 15 | Course context **not** mapped | Student lands on default `/college` | Default cohort or onboarding |

### Audit query — run after every launch attempt

```sql
select
  l.id,
  l.created_at,
  l.success,
  l.error_reason,
  p.name      as platform,
  l.lti_sub,
  l.email,
  l.roles,
  l.context_id,
  l.verify_ms,
  l.user_ms,
  l.magic_ms,
  l.total_ms
from lti_launches l
left join lti_platforms p on p.id = l.platform_id
order by l.created_at desc
limit 20;
```

Watch for: `success=false` rows, `total_ms` creeping over ~1500ms, `error_reason` patterns, missing `email` (some LMSes don't release email by default — needs LMS-side privacy config).

### Session table — should stay small

```sql
select count(*), min(created_at), max(created_at)
from lti_launch_sessions
where created_at > now() - interval '1 hour';
```

If this grows unbounded the cleanup job is broken. Sessions older than 10 minutes are no use.

---

## Layer 4 — Observability checks

After you've driven traffic through Layers 2–3, verify the operational story:

- Sentry — confirm errors from `lti-oidc-init` and `lti-launch` surface as warnings with `error_code` tag, not silent swallowing.
- Rate limit — hammer `lti-launch` from a single IP > 20 req/min, expect HTTP 429.
- Health probe — set `LTI_PRIVATE_KEY_PEM` to garbage in a staging project, expect `lti-health` to return 503 with `keys_configured.ok=false`.
- Key rotation — follow `docs/LTI-KEY-ROTATION.md` end-to-end on a non-prod project to confirm overlap window.

---

## Layer 5 — Known gaps (do not test, do not promise)

From `PORTFOLIO_LTI_IMPLEMENTATION_PLAN.md`:

- **Deep Linking** (LMS → "select content" picker) — stub only, not wired in `lti-launch`.
- **AGS** (Assignment & Grades Services — grade passback to LMS gradebook) — not implemented.
- **NRPS** (Names & Role Provisioning Services — roster sync) — not implemented.

If a college specifically asks for grade passback, scope that as new work, do not assume it works.

---

## Layer 6 — Pilot with a friendly college

Only after Layers 1–3 are green and Layer 4 is signed off.

1. Pick one college, one cohort, one tutor, one course.
2. Register Elec-Mate against their real LMS (prefer Dynamic Registration).
3. Run `/lti-verify-platform` immediately after registration — must be all green.
4. Tutor launches from inside their course and walks through the apprentice journey.
5. Five students launch over 24 hours. Audit `lti_launches` daily.
6. Watch Sentry for a week. Hold a 30-min retro before widening to a second cohort.

---

## Pre-go-live checklist

Before pointing a real college at production:

- [ ] `./scripts/test-lti.sh` passes against production
- [ ] IMS Reference Tool **Core Launch** suite passes
- [ ] At least one Moodle sandbox launch and one Canvas sandbox launch verified end-to-end
- [ ] Test matrix rows 1–10 walked and signed off (per platform)
- [ ] `lti-verify-platform` returns all-green for the target platform
- [ ] Sentry receiving warnings from staging launch failures (proves wiring)
- [ ] Key rotation rehearsed once on a non-prod project
- [ ] `LTI_KEY_ID`, `LTI_JWKS_JSON`, `LTI_PRIVATE_KEY_PEM` confirmed set in production secrets
- [ ] Iframe handoff verified in Chrome, Safari, Firefox, plus Moodle mobile app
- [ ] Audit query above shows no `success=false` rows from real users in last 24 hours

---

## Troubleshooting cheatsheet

| Symptom | Likely cause | First place to look |
|---------|--------------|---------------------|
| Launch returns 4xx with `unknown_platform` | `lti_platforms` row missing or `client_id`/`issuer` mismatch | `select * from lti_platforms where issuer = '...'` |
| Launch 4xx with signature error | LMS published key rotated, our cache stale | LMS admin: re-publish JWKS; check our JWKS-fetch path |
| Launch 4xx with nonce/session error | Session expired (>10 min) or replay | `lti_launch_sessions` for the state value |
| User lands but with wrong role | LMS not releasing role claim | LMS-side privacy / claim configuration |
| User lands but no email | LMS not releasing email claim | LMS privacy settings — most need explicit opt-in |
| Iframe blank, no error | `X-Frame-Options` or CSP blocking handoff | Inspect `LtiHandoff.tsx` redirect target, check browser console |
| `verify-platform` says JWKS unreachable | LMS firewall / wrong URL | Try `curl` from a Supabase edge function region |
| Health probe degraded with `database.ok=false` | RLS or service role missing on `lti_platforms` | Re-check Supabase secrets |
