# Elec-Mate firm API, webhooks, Zapier and Make (ELE-2077)

A read-only REST API over one firm's own data, signed webhooks for job,
invoice and certificate events, and Zapier/Make apps built on the same API.
The in-app version of this guide is `src/components/employer/settings/firmApiDocs.ts`
(Settings > Integrations and API > API guide). Keep the two in step.

Status (10 Oct 2026): database live (additive), edge functions written and
type-checked, **not deployed**. Zapier/Make apps are files in `integrations/`,
**not published**.

---

## 1. Keys

* Minted by the **firm owner only** (`auth.uid()` is the firm). Co-admins and
  office staff cannot mint, because a key reads the whole firm. A non-owner
  who calls `firm_api_key_mint` gets a key for **their own account**, never the firm.
* Format `emf_` + 48 hex characters. Shown once. Only `sha256(key)` and a
  12-character display prefix are stored (`firm_api_keys.key_hash`, `key_prefix`).
* Scopes per resource: `jobs`, `customers`, `quotes`, `invoices`,
  `timesheets`, `certificates`. Read only.
* Rate limit per key, 1 to 600 calls a minute (default 60), counted from
  `firm_api_access_log`. Over the limit: `429` with `Retry-After: 60`.
* Up to 10 live keys a firm. Revoke at any time (`firm_api_key_revoke`); a
  revoked key gets `401 revoked` on its next call. Keys are never deleted.

## 2. Reading data

Base URL (after deploy):
`https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-api/v1`

```
GET /v1                      what this key can read
GET /v1/<resource>           rows, oldest change first
    ?since=<ISO 8601>        only rows changed after this time
    ?limit=1..500            page size (default 100)
    ?offset=<n>              use next_offset from the previous page

Authorization: Bearer emf_...      (or X-Api-Key: emf_...)
```

```bash
curl -H "Authorization: Bearer emf_your_key" \
  "https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-api/v1/invoices?since=2026-10-01T00:00:00Z"
```

```json
{
  "resource": "invoices",
  "since": "2026-10-01T00:00:00.000Z",
  "limit": 100,
  "offset": 0,
  "count": 100,
  "next_offset": 100,
  "generated_at": "2026-10-10T12:00:00.000Z",
  "data": [{ "id": "...", "invoice_number": "INV-0042", "status": "paid", "total": 1440.0, "updated_at": "..." }]
}
```

### Fields

| Resource | Fields |
| --- | --- |
| jobs | id, title, client, customer_id, location, status, stage, job_type, start_date, end_date, completed_at, archived_at, created_at, updated_at (templates excluded) |
| customers | id, name, company_name, email, phone, address, postcode, tags, status, created_at, updated_at |
| quotes | id, quote_number, customer_id, job_id, client_name, status, acceptance_status, accepted_at, expiry_date, subtotal, vat_amount, total, created_at, updated_at (not yet invoiced, not deleted) |
| invoices | id, invoice_number, quote_number, customer_id, job_id, client_name, status (draft, sent, overdue, paid), invoice_date, due_date, sent_at, paid_at, subtotal, vat_amount, total, total_paid, created_at, updated_at |
| timesheets | id, employee_id, employee_name, job_id, date, clock_in, clock_out, break_minutes, total_hours, status, approved_at, created_at, updated_at |
| certificates | id, job_id, report_id, type, certificate_number, status, client_name, installation_address, inspection_date, linked_at, updated_at (certificates linked to the firm's jobs) |

### Errors

`{ "error": { "code": "...", "message": "..." } }`

| Status | code | When |
| --- | --- | --- |
| 400 | bad_request | `since` is not a date |
| 401 | unauthorised / revoked / expired | no key, unknown key, revoked or expired |
| 403 | forbidden | the key has no scope for that resource |
| 404 | not_found / unknown_resource | wrong path |
| 405 | method_not_allowed | anything but GET |
| 429 | rate_limited | over the key's per-minute limit |

### Why a key can never read another firm

1. The function hashes the key it is sent and looks up `firm_api_keys` by hash.
   The firm comes from that row, never from the request.
2. Every read goes through `public._firm_api_read(p_firm, ...)`; each query has
   `user_id = p_firm` (or `employer_id = p_firm`). It is executable by the
   service role only (revoked from anon, authenticated, public).
3. `firm_api_keys`, `firm_api_access_log`, `firm_webhooks` and
   `firm_webhook_deliveries` have RLS on and no client policies.

Proved on the live database, rolled back (10 Oct): owner, outsider and admin
each minted a key; the outsider's key resolved to the outsider and read 0 of
the demo firm's rows; the demo firm's read returned only its own rows (0
foreign customers of 32); the outsider could not revoke the owner's key; an
authenticated user could not call `_firm_api_read`; the plain key was not
stored anywhere; revoke set `revoked_at`.

## 3. Webhooks

Owner adds an https address and picks events in Settings > Integrations and API.

Events: `job.created`, `job.updated`, `job.completed`, `invoice.created`,
`invoice.sent`, `invoice.paid`, `invoice.updated`, `certificate.linked`, and
`ping` (Send test).

```
POST https://your.server/hook
Content-Type: application/json
Elec-Mate-Event: invoice.paid
Elec-Mate-Delivery: <delivery id, the same on every retry>
Elec-Mate-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256(secret, "<t>.<raw body>")>

{ "id": "evt_...", "type": "invoice.paid", "created_at": "...", "firm_id": "...", "data": { "invoice": { ... } } }
```

* A 2xx within 10 seconds is delivered. Otherwise retried after 1 m, 5 m,
  30 m, 2 h, 12 h, 24 h, then marked dead. 100 failures in a row switch the
  endpoint off. Redirects are not followed; private or local addresses are refused.
* Verify (Node):

```js
const [t, v1] = header.split(',').map((p) => p.split('=')[1]);
const mac = crypto.createHmac('sha256', secret).update(t + '.' + rawBody).digest('hex');
const ok = crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(v1))
  && Math.abs(Date.now() / 1000 - Number(t)) < 300;
```

How events are made: AFTER triggers `zz_firm_webhook_job` (employer_jobs),
`zz_firm_webhook_invoice` (quotes) and `zz_firm_webhook_certificate`
(employer_job_certificates) write to the `firm_webhook_deliveries` outbox,
only for firms with a live webhook. Each trigger exits at once when the firm
has none, and swallows its own errors, so it can never block the write.
Proved with rolled-back inserts and updates as an authenticated user and as
the service role, with and without a webhook (9 events, all correct).

## 4. Setup for Andrew (nothing here is done yet)

1. Deploy the functions:
   ```bash
   npx supabase functions deploy firm-api --no-verify-jwt --project-ref jtwygbeceundfgnkirof
   npx supabase functions deploy firm-webhook-dispatch --project-ref jtwygbeceundfgnkirof
   ```
   `firm-api` needs `--no-verify-jwt` (callers send an Elec-Mate key, not a
   Supabase JWT). No new secrets: both use `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY`.
2. Schedule the dispatcher (SQL editor, after the deploy). It does nothing
   while no firm has a live webhook:
   ```sql
   select cron.schedule('firm-webhook-dispatch', '* * * * *', $cron$
     select net.http_post(
       url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-webhook-dispatch',
       headers := jsonb_build_object('Content-Type', 'application/json',
         'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)),
       body := '{}'::jsonb)
     where exists (select 1 from public.firm_webhook_deliveries
                    where status in ('pending', 'failed', 'delivering') and next_attempt_at <= now());
   $cron$);
   ```
3. Smoke test with your own account: mint a key, `curl /v1` and `/v1/jobs`,
   revoke it, `curl` again and expect `401 revoked`. Add a webhook to a
   https://webhook.site address, press Send test, and check the signature.

## 5. Zapier app (`integrations/zapier/`)

Zapier Platform CLI app. Auth: the API key. Triggers: **New Job**, **Invoice
Paid** (polling, deduped on id). Action: **Find Customer** (a search). The API
is read-only, so there is no create/update action yet; that needs write scopes
(a new migration widening the `firm_api_keys.scopes` check, plus POST routes).

Offline tests: `node --test integrations/zapier/test/app.test.js` (4 pass).

To publish privately (needs Andrew's Zapier account):
```bash
cd integrations/zapier
npm install
npx zapier-platform-cli login           # Andrew's Zapier login
npx zapier-platform-cli register "Elec-Mate"
npx zapier-platform-cli push
npx zapier-platform-cli users:add founder@elec-mate.com 1.0.0   # private invite
```
Then in Zapier: make a Zap "Elec-Mate New Job -> Gmail draft" and "Elec-Mate
Find Customer" with a real key from your own firm. Public listing is a
separate review by Zapier.

## 6. Make app (`integrations/make/`)

Custom app definition: `base.imljson`, `connection.imljson`,
`modules/watch-jobs.imljson` (trigger, `since` = last run) and
`modules/list-invoices.imljson` (search). To publish: Make > Custom apps >
Create app "elec-mate", paste each file into the matching tab (Base,
Connection, Modules), test with a key, then invite or request review.

## 7. Accounting packages

| | Contacts | Invoices out | Payments back (two-way) | Payroll export | Expense sync (sole trader) |
| --- | --- | --- | --- | --- | --- |
| Xero | yes | yes | yes | Xero file | yes |
| QuickBooks | yes | yes | yes | QuickBooks file | yes |
| Sage Business Cloud | yes | yes | **new** | Sage file | no |
| FreeAgent | **new** | **new** | **new** | CSV / hours file | no (the sync table only allows xero, quickbooks, sage) |

FreeAgent setup (Andrew):
1. Register an app at https://dev.freeagent.com (Developer Dashboard). Redirect
   URI: `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/accounting-oauth-callback`.
2. Secrets: `FREEAGENT_CLIENT_ID`, `FREEAGENT_CLIENT_SECRET`,
   `FREEAGENT_ENVIRONMENT` (`sandbox` until proven, then `production`).
3. Make a sandbox company at https://signup.sandbox.freeagent.com/signup and
   prove: connect, send an invoice, mark it paid in FreeAgent, pull status.
4. Deploy `accounting-oauth-init`, `accounting-oauth-callback`,
   `accounting-sync-invoice`, `accounting-pull-invoice-status`,
   `accounting-disconnect`.
5. Set `VITE_FREEAGENT_ENABLED=true` in Vercel to show the FreeAgent button.

Sage: existing `SAGE_CLIENT_ID` / `SAGE_CLIENT_SECRET`. The new part is the
payment pull (`_shared/sage-invoice-status.ts`). Prove it against a Sage
developer (trial) business before relying on it.

FreeAgent refuses reverse-charge (CIS DRC) and grant (OZEV) invoices with a
reason, rather than posting them with the wrong VAT.

## 8. Making Tax Digital for Income Tax

Elec-Mate does not file. From 6 April 2026 sole traders and landlords with
qualifying income over £50,000 (2024/25) must use MTD for Income Tax; over
£30,000 from 6 April 2027; over £20,000 from 6 April 2028
([gov.uk eligibility](https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax)).
HMRC removed its software table on 31 July 2025 and now uses a software
finder ([gov.uk](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)).
Vendor pages checked 10 Oct 2026: QuickBooks
([quickbooks.intuit.com/uk/making-tax-digital/income-tax](https://quickbooks.intuit.com/uk/making-tax-digital/income-tax/)),
Xero ([xero.com/uk/making-tax-digital](https://www.xero.com/uk/making-tax-digital/))
and FreeAgent ([freeagent.com/guides/making-tax-digital](https://www.freeagent.com/guides/making-tax-digital/))
say they submit quarterly updates. Sage's page refused the fetch: verify Sage
on the HMRC software finder before saying it in copy.
