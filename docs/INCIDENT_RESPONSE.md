# Incident Response Plan — Elec-Mate

**Version:** 1.0  
**Last updated:** 2026-03-03  
**Owner:** Engineering team

---

## What Is an Incident?

Any unplanned event that impacts the security, availability, or integrity of the Elec-Mate platform or its users' data. This includes:

- Data breach or suspected unauthorised access to user data
- Platform outage (>5 minutes affecting production)
- Security vulnerability discovered in production
- Stripe payment failure or billing system error affecting multiple users
- Supabase service degradation
- Elec-AI agent behaving unexpectedly or sending incorrect messages to clients
- GDPR-reportable personal data exposure

---

## Severity Levels

| Level | Name | Definition | Response Time |
|---|---|---|---|
| **P0** | Critical | Data breach, complete platform outage, active security attack | Immediate — within 15 minutes |
| **P1** | High | Partial outage, payment failures, cert generation broken for all users | Within 1 hour |
| **P2** | Medium | Feature broken for subset of users, non-critical data issue | Within 4 hours |
| **P3** | Low | Minor bug, cosmetic issue, isolated user complaint | Next business day |

---

## Response Steps

### P0 — Critical

1. **Identify** — Confirm the incident is real and scope it (how many users, what data, since when)
2. **Contain** — Immediately:
   - If data breach: rotate Supabase service role key and JWT secret
   - If active attack: enable Supabase network restrictions, block offending IPs
   - If Stripe: pause webhooks if causing incorrect billing
   - If Elec-AI: disable the agent via kill switch (ELE-206 when implemented — manual until then: revoke agent JWTs)
3. **Notify** — If personal data is exposed, ICO must be notified within **72 hours** under UK GDPR Article 33
4. **Communicate** — Notify affected users via email within 72 hours (Article 34 if high risk to individuals)
5. **Fix** — Deploy patch; verify fix in production
6. **Post-mortem** — Write up within 48 hours of resolution (see template below)

### P1 — High

1. Identify and scope
2. Contain — fix or roll back the offending change
3. Communicate — in-app banner or email to affected users if needed
4. Fix and deploy
5. Post-mortem within 1 week

### P2 / P3

1. Raise a Linear ticket with evidence
2. Fix in normal sprint cycle
3. Brief post-mortem note added to Linear ticket

---

## Key Contacts & Credentials

> **Note:** Never commit actual credentials here. Reference where they are stored.

| What | Where |
|---|---|
| Supabase dashboard | `https://supabase.com/dashboard/project/jtwygbeceundfgnkirof` |
| Stripe dashboard | `https://dashboard.stripe.com` |
| Resend (email) | `https://resend.com/dashboard` |
| Anthropic (AI usage) | `https://console.anthropic.com` |
| Environment secrets | Supabase Edge Function secrets (dashboard → Settings → Edge Functions) |
| Service role key | Supabase dashboard → Settings → API |

---

## Containment Playbooks

### Suspected Data Breach

```
1. Go to Supabase dashboard → Settings → API
2. Rotate the service_role key immediately
3. Update SUPABASE_SERVICE_ROLE_KEY in all edge function secrets
4. Check admin_audit_logs and security_audit_log for suspicious activity
5. Review Supabase Auth logs for unusual login patterns
6. Determine scope: which tables, which users, what time window
7. Preserve evidence before any cleanup
8. Engage ICO if personal data of UK users was accessed
```

### Platform Outage

```
1. Check Supabase status: https://status.supabase.com
2. Check Vercel status: https://vercel-status.com
3. Check recent deployments — roll back if outage correlates with a deploy
4. Check edge function logs in Supabase dashboard
5. Check Stripe webhook logs if payment-related
6. Post status update to any active user channels
```

### Elec-AI Agent Misbehaving

```
1. Go to Supabase → Edge Functions → revoke-agent-jwt
2. Invoke with the affected user's agent ID to immediately cut the agent's access
3. Review agent conversation logs in agent_conversations table
4. Determine if the issue is a prompt injection, a rail bug, or a tool failure
5. Do not re-enable until root cause is understood and fixed
```

### Stripe Billing Error

```
1. Go to Stripe dashboard → Developers → Webhooks → check failed events
2. If webhook is double-firing: disable the webhook endpoint temporarily
3. Check affected users' profiles.subscribed and subscription_tier in Supabase
4. Manually correct any users incorrectly marked as unsubscribed
5. Re-enable webhook once fix is deployed
```

---

## ICO Notification (Data Breach)

Under **UK GDPR Article 33**, a personal data breach must be reported to the ICO within **72 hours** of becoming aware of it, unless it is unlikely to result in a risk to individuals.

- ICO breach reporting: https://ico.org.uk/for-organisations/report-a-breach/
- Required information: nature of breach, categories of data, approximate number of individuals, likely consequences, measures taken

---

## Post-Mortem Template

```markdown
## Incident Post-Mortem — [Title]

**Date:** YYYY-MM-DD  
**Severity:** P0 / P1 / P2  
**Duration:** HH:MM  
**Author:** [Name]

### Summary
One paragraph description of what happened.

### Timeline
- HH:MM — First sign of issue
- HH:MM — Incident confirmed
- HH:MM — Containment action taken
- HH:MM — Fix deployed
- HH:MM — Incident resolved

### Root Cause
What actually caused the incident.

### Impact
- Users affected: [number / "all users"]
- Data affected: [yes/no — what data]
- Revenue impact: [estimate]

### What Went Well
- ...

### What Could Be Improved
- ...

### Action Items
| Action | Owner | Due |
|---|---|---|
| ... | ... | ... |
```

---

## Review Schedule

This document should be reviewed and tested:
- After every P0 or P1 incident
- Every 6 months minimum
- Before any major infrastructure change (new auth provider, new payment processor, etc.)
