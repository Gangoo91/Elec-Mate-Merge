# Incident Response Plan — Elec-Mate

**Version:** 2.0
**Last updated:** 2026-03-03
**Owner:** Andrew Moore

---

## Severity Levels

| Level | Name | Definition | Max response time |
|---|---|---|---|
| **P0** | Critical | Data breach, complete platform down, active attack, agent sending wrong data to clients | **15 minutes** |
| **P1** | High | Cert generation broken, payments broken, partial outage affecting >20% of users | **1 hour** |
| **P2** | Medium | Feature broken for a subset of users, single integration down | **4 hours** |
| **P3** | Low | Minor bug, cosmetic issue, single user complaint | Next working day |

---

## What Counts as an Incident

**Automatic P0:**
- Any confirmed or suspected unauthorised access to user data
- Complete platform down (app returns error to all users)
- Elec-AI agent sending incorrect, private, or fabricated information to a client
- Stripe webhook double-billing users or wrongly revoking access
- SQL injection or RLS bypass confirmed or suspected

**Automatic P1:**
- PDF/certificate generation broken for all users
- All emails failing (certs, invoices, welcome)
- RevenueCat webhook broken — iOS/Android subscriptions not activating
- Supabase edge functions throwing 500s across the board
- Login broken for any subset of users

**P2/P3:**
- Individual feature broken (calculators, specific cert type, etc.)
- Single user reporting data issue
- Slow performance affecting user experience

---

## How You Know Something Is Wrong

Don't wait for users to tell you. Check these first:

| Signal | Where to check |
|---|---|
| Frontend errors | Sentry → [sentry.io/organizations/elec-mate](https://sentry.io) |
| User behaviour anomalies | PostHog → funnels, session recordings |
| Edge function failures | Supabase dashboard → Edge Functions → Logs |
| Supabase platform issues | https://status.supabase.com |
| Vercel deployment issues | https://vercel.com/dashboard → Deployments |
| Stripe webhook failures | Stripe → Developers → Webhooks → Failed events |
| RevenueCat issues | https://app.revenuecat.com → Webhooks → Logs |
| PDFMonkey | https://dashboard.pdfmonkey.io → Documents (failed = red) |
| User reports | Support email / Telegram group |

**Threshold rule:** If 3 or more users report the same issue within 1 hour → treat as P1 minimum.

---

## First 5 Minutes (Any P0 or P1)

Do this immediately before anything else:

```
1. Screenshot or record EXACTLY what you're seeing (evidence)
2. Note the exact time you became aware (ICO clock starts here for breaches)
3. Check the Supabase edge function logs for the last 30 minutes
4. Check Sentry for a spike in errors
5. Check status.supabase.com — if it's a platform issue, you can't fix it
6. Determine: is this still happening right now, or did it already stop?
7. Estimate affected users (all? specific tier? specific cert type?)
8. Decide severity — escalate if unsure
```

---

## Kill Switches (Fastest Way to Stop the Damage)

### Stop all Elec-AI agents immediately

```bash
# Invoke revoke-agent-jwt edge function for a specific user
curl -X POST https://jtwygbeceundfgnkirof.supabase.co/functions/v1/revoke-agent-jwt \
  -H "Authorization: Bearer <SERVICE_ROLE_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"userId": "<USER_ID>"}'

# Or: go to Supabase → Table Editor → agent_jwt_tokens → delete all rows
```

### Stop Stripe webhook processing

```
Stripe dashboard → Developers → Webhooks → [your endpoint] → Disable
```

### Stop RevenueCat webhook processing

```
RevenueCat dashboard → Project → Webhooks → [your endpoint] → Disable
```

### Roll back a bad Vercel deployment

```bash
# Via CLI (fastest)
vercel rollback

# Via dashboard
Vercel → Project → Deployments → find last good deploy → ⋯ → Promote to Production
```

### Deploy an emergency edge function fix

```bash
cd /path/to/repo
supabase functions deploy <function-name> --project-ref jtwygbeceundfgnkirof
```

### Post an in-app maintenance banner to all users

```sql
-- Run in Supabase SQL editor
INSERT INTO admin_announcements (
  title,
  message,
  type,
  is_active,
  created_at
) VALUES (
  'Service disruption',
  'We are currently experiencing an issue with [X]. Our team is working on a fix. We apologise for the inconvenience.',
  'warning',
  true,
  now()
);

-- Remove when resolved:
UPDATE admin_announcements SET is_active = false WHERE title = 'Service disruption';
```

---

## Playbooks

### P0: Suspected Data Breach

```
IMMEDIATELY (first 15 minutes):
1. Screenshot everything — preserve evidence before touching anything
2. Note the exact time you discovered this — ICO 72-hour clock starts NOW
3. Identify: what data, which users, since when, via which vector

CONTAIN (next 30 minutes):
4. Supabase dashboard → Settings → API → Rotate service_role key
5. Go to Supabase → Settings → Edge Functions → update SUPABASE_SERVICE_ROLE_KEY
   on every affected edge function (check all of them)
6. If via a specific feature: disable that route/function immediately
7. If login credentials compromised: Supabase → Auth → force-sign-out all users
8. If RLS bypass: revert the migration that caused it (Supabase migrations are ordered)

SCOPE:
9. Run in Supabase SQL editor:
   SELECT id, email, created_at FROM auth.users
   WHERE id IN (
     SELECT DISTINCT user_id FROM <affected_table>
     WHERE created_at > '<breach_start_time>'
   );
10. Check security_audit_log and admin_audit_logs for anything unusual
11. Check Supabase Auth logs → suspicious logins or API key usage

NOTIFY:
12. If personal data of UK users accessed → report to ICO within 72 hours
    https://ico.org.uk/for-organisations/report-a-breach/
13. Notify affected users by email (see communication templates below)
14. Post in-app announcement (see kill switches above)

PERSONAL DATA ELEC-MATE HOLDS (for ICO notification purposes):
- Full names, email addresses, phone numbers (profiles table)
- Installation addresses (reports / customers tables)
- Client names and addresses (customers, reports tables)
- Certificate data including electrical test results (reports.data)
- Payment metadata via Stripe (not card numbers — Stripe holds those)
- WhatsApp numbers (for Elec-AI users)
- Apprentice portfolio and assessment data
- College and employer staff records
```

### P0/P1: Complete Platform Outage

```
1. Check https://status.supabase.com — if Supabase is down, wait and monitor
2. Check https://vercel.com/status — if Vercel is down, wait and monitor
3. If a recent deployment caused it:
   vercel rollback   (or via Vercel dashboard — see kill switches)
4. Check Supabase edge function logs for cascading failures
5. Check if the issue is DNS / CDN (try accessing via direct Vercel URL)
6. Post in-app banner (won't work if completely down — use email instead)
7. If >30 minutes: email users who are likely mid-session
```

### P1: Certificate Generation Broken

```
PDFMonkey issues:
1. Check https://dashboard.pdfmonkey.io → Documents — failed docs show in red
2. Check PDFMonkey status / API health
3. Check Supabase → Edge Functions → generate-eicr-pdf / generate-pdf-monkey → Logs
4. Check PDFMONKEY_API_KEY is still valid (not expired/rotated)
5. If PDFMonkey is down: inform users via in-app banner, no client-side fix possible
6. If the template broke: check pdfmonkey.io → Templates — revert to last working version

Edge function issues:
1. Check logs for specific error — usually a missing env var or API key rotation
2. Re-deploy the affected function:
   supabase functions deploy generate-eicr-pdf --project-ref jtwygbeceundfgnkirof
```

### P1: Payments / Subscriptions Broken

```
Stripe (web):
1. Stripe → Developers → Webhooks → check for failed events
2. Stripe → Developers → Logs → look for 4xx/5xx on subscription events
3. If double-billing: pause the Stripe webhook endpoint immediately
4. Manual fix for incorrectly unsubscribed user (Supabase SQL editor):
   UPDATE profiles
   SET subscribed = true, subscription_tier = '<tier>'
   WHERE id = '<user_id>';
5. Re-enable webhook only after deploying a verified fix

RevenueCat (iOS/Android):
1. RevenueCat → Project → Webhooks → check delivery logs
2. RevenueCat → Project → Customers → find affected user → check entitlements
3. If webhook broken: check REVENUECAT_WEBHOOK_SECRET in edge function secrets
4. Edge function: supabase/functions/revenuecat-webhook/index.ts
5. Check Supabase logs for revenuecat-webhook function errors
```

### P0/P1: Elec-AI Agent Misbehaving

```
Symptoms: agent sending wrong data to clients, impersonating wrong user,
ignoring instructions, making unauthorised actions

IMMEDIATE:
1. Revoke the agent's JWT (see kill switches above)
2. Check agent_conversations table for what was actually sent:
   SELECT * FROM agent_conversations
   WHERE user_id = '<user_id>'
   ORDER BY created_at DESC
   LIMIT 50;
3. Check agent_action_log for what tools it invoked
4. Determine if it's: (a) prompt injection by a client, (b) a rail bug,
   (c) a JWT/auth issue, (d) a tool returning wrong data

IF A CLIENT WAS AFFECTED:
5. The electrician needs to be contacted directly — their client received a bad message
6. Do not re-enable the agent until root cause is fixed and tested
7. Review RAILS.md for the specific rail that triggered

IF PROMPT INJECTION:
8. Log the injected message in security_audit_log manually
9. Review and strengthen the security section of RAILS.md
10. Consider adding that exact phrase pattern to the injection blocklist
```

### P1: All Emails Failing

```
1. Resend dashboard → Logs → check for bounces or API errors: https://resend.com/logs
2. Check RESEND_API_KEY is valid in Supabase edge function secrets
3. Check send-certificate-resend / send-invoice-resend edge function logs
4. If Resend is down: https://resend.statuspage.io
5. Check email_logs table for recent send failures:
   SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 20;
6. Resend has a 100 emails/day limit on free tier — check if limit hit
```

---

## ICO Notification (Data Breach)

> **72 hours from awareness. Not from the breach. From when YOU found out.**

**Report at:** https://ico.org.uk/for-organisations/report-a-breach/

**You need to provide:**
- Nature of the breach (unauthorised access / accidental exposure / ransomware / etc.)
- Categories of data involved (names, addresses, financial, health, etc.)
- Approximate number of individuals affected
- Likely consequences (financial harm, identity theft, reputational damage, etc.)
- Measures taken or proposed to address the breach

**If you cannot notify within 72 hours**, you must notify as soon as possible and explain the delay.

**ICO contact:** 0303 123 1113 (Mon–Fri, 9am–4:30pm)

**Article 34 — Notifying individuals:** If the breach is likely to result in a **high risk** to individuals (e.g., financial data, credentials exposed), you must also notify the affected users directly, in plain language, without undue delay.

---

## Communication Templates

### In-app banner (post via SQL — see kill switches)

> **Service disruption — [feature name]**
> We're currently experiencing an issue affecting [X]. Our team is actively working on a fix. We'll update this message as soon as it's resolved. Thank you for your patience.

### User email — general outage

> Subject: Service update from Elec-Mate
>
> Hi [name],
>
> We wanted to let you know that Elec-Mate is currently experiencing [brief description]. This means [specific impact — e.g., "you may be unable to generate certificates"].
>
> Our team is working on a fix and we expect to have it resolved by [estimated time].
>
> We're sorry for the inconvenience. If you need urgent support, reply to this email or contact support@elec-mate.com.
>
> The Elec-Mate Team

### User email — data breach notification (Article 34)

> Subject: Important security notice from Elec-Mate
>
> Hi [name],
>
> We're writing to let you know about a security incident that may have affected your account.
>
> **What happened:** [Plain description — e.g., "On [date], we discovered that an unauthorised party may have accessed [data type] stored on our platform."]
>
> **What data was involved:** [Specific data — names, email addresses, etc. Be precise.]
>
> **What we've done:** [Actions taken — e.g., "We have secured the affected systems, rotated all access credentials, and reported the incident to the ICO."]
>
> **What you should do:** [Specific advice — e.g., "We recommend changing your password. If you use the same password elsewhere, change it on those services too."]
>
> We take the security of your data extremely seriously and sincerely apologise for this incident.
>
> If you have any questions, please contact support@elec-mate.com.
>
> Andrew Moore
> Elec-Mate

---

## Service Dashboard & Credentials Location

> Never commit credentials here — this is a reference to where they live.

| Service | Dashboard | Credentials location |
|---|---|---|
| Supabase (DB + functions) | supabase.com/dashboard/project/jtwygbeceundfgnkirof | Supabase → Settings → API |
| Vercel (hosting) | vercel.com/dashboard | Vercel → Project → Settings → Environment Variables |
| Stripe (web payments) | dashboard.stripe.com | Supabase edge function secrets: `STRIPE_SECRET_KEY` |
| RevenueCat (iOS/Android IAP) | app.revenuecat.com | Supabase edge function secrets: `REVENUECAT_WEBHOOK_SECRET` |
| Resend (email) | resend.com/dashboard | Supabase edge function secrets: `RESEND_API_KEY` |
| PDFMonkey (cert PDFs) | dashboard.pdfmonkey.io | Supabase edge function secrets: `PDFMONKEY_API_KEY` |
| Anthropic (AI) | console.anthropic.com | Supabase edge function secrets: `ANTHROPIC_API_KEY` |
| Sentry (error monitoring) | sentry.io | In app — `src/lib/sentry.ts` |
| PostHog (analytics) | posthog.com | In app — `src/components/analytics` |

---

## Post-Mortem Template

```markdown
## Post-Mortem — [Short Title]

**Date:** YYYY-MM-DD
**Severity:** P0 / P1 / P2
**Duration:** HH:MM (from detection to resolution)
**Author:**

### What Happened
One clear paragraph. What broke, how, and what the impact was on users.

### Timeline
| Time | Event |
|---|---|
| HH:MM | First indication of issue (how detected) |
| HH:MM | Incident declared |
| HH:MM | Containment action taken |
| HH:MM | Root cause identified |
| HH:MM | Fix deployed |
| HH:MM | Confirmed resolved |

### Root Cause
Single clear sentence: "The root cause was X."
Then: why did X happen, and why didn't we catch it sooner?

### Impact
- Users affected: [number or "all"]
- Features affected: [list]
- Data involved: [yes/no — what specifically]
- Revenue impact: [estimate if possible]
- ICO notification required: [yes/no — if yes, was it filed?]

### What Went Well
- ...

### What Could Be Improved
- ...

### Action Items
| Action | Owner | Due date | Linear ticket |
|---|---|---|---|
| | | | |
```

---

## Review Schedule

- After every **P0 or P1 incident** — update the relevant playbook with what actually happened
- Every **6 months** — review all playbooks, check all dashboard URLs still work, verify credential locations
- Before any **major infrastructure change** — new auth, new payment provider, new AI provider
- When a new **team member joins** — walk through this document with them before they get production access
