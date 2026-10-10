# Customer inbox: providers, costs and setup (ELE-2070)

One inbox per firm for texts, WhatsApp, email replies and portal messages,
threaded per client and linked to the job. Every firm starts in **test mode**
(provider `sandbox`): messages are stored, counted against the allowance and
shown in the thread, and **nothing leaves Elec-Mate**.

Status (10 Oct 2026): database live (additive), app screens built, edge
functions `customer-message-send` and `customer-message-inbound` written and
type-checked, **not deployed**. No provider account exists yet.

---

## 1. Provider research and recommendation

Prices checked 10 Oct 2026 on the providers' own pages. Twilio quotes in US dollars.

| | Two-way UK SMS | WhatsApp | Cost | Webhook signing |
| --- | --- | --- | --- | --- |
| **Twilio** | Yes, UK mobile numbers; alphanumeric sender for one-way | Yes (WhatsApp sender, Meta-approved templates as Content SIDs) | SMS out **$0.056** a segment, in **$0.0075**, UK mobile number **$2.50 a month**, alphanumeric sender free ([twilio.com/en-us/sms/pricing/gb](https://www.twilio.com/en-us/sms/pricing/gb)). WhatsApp: Meta's fee plus Twilio's per-message fee | `X-Twilio-Signature` HMAC-SHA1 over URL + params ([docs](https://www.twilio.com/docs/usage/webhooks/webhooks-security)) |
| **Meta WhatsApp Cloud API** (direct) | No (WhatsApp only) | Yes, no middleman fee | Per delivered **template** since 1 July 2025. Non-template messages inside the 24-hour customer service window are free; utility templates inside an open window are free. The UK has its own rate card ([developers.facebook.com/docs/whatsapp/pricing](https://developers.facebook.com/docs/whatsapp/pricing)) | `X-Hub-Signature-256` HMAC-SHA256 with the app secret |
| Bird (MessageBird), Vonage | Yes | Yes | Not priced here (not checked on a primary page). Accepted values in the database, no adapter yet | |

**Recommendation: Twilio for texts now; WhatsApp through Twilio first, moving
WhatsApp to Meta's Cloud API direct if volume makes Twilio's per-message fee matter.**

* Twilio gives real two-way UK mobile numbers (a customer can reply), the
  alphanumeric sender for one-way notices, delivery receipts, and one account
  and one signature scheme for both SMS and WhatsApp.
* The code is provider-agnostic (`supabase/functions/_shared/messaging/adapters.ts`):
  `sandbox`, `twilio` and `meta` adapters exist. Switching a firm is one row
  in `firm_messaging_settings`; the rules (scope, consent, STOP, allowance,
  WhatsApp window) live in the database, so they do not change with the provider.
* Cost per firm at the default allowance of 100 credits a month, all texts of
  one segment: 100 x $0.056 + $2.50 number = about **$8.10 a month** (about £6),
  plus $0.0075 per reply. Price the add-on above that.

### UK rules that shape the build

* **Alphanumeric sender IDs** are up to 11 characters, letters required, and
  one-way: customers cannot reply ([Twilio](https://www.twilio.com/docs/glossary/what-alphanumeric-sender-id)).
  In the UK, pre-registration is required only for protected sender IDs (the
  MEF and BT protected-brand registries) ([Twilio UK guidelines](https://www.twilio.com/en-us/guidelines/gb/sms)).
  So two-way messages use the firm's number; `sender_name` is only the fallback.
* **PECR, marketing texts and emails**: consent, or the soft opt-in for
  existing customers, and a simple way to opt out in every message
  ([ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)).
  Review requests are treated as marketing: they always carry "Reply STOP to
  opt out". Booking, on my way, running late and invoice messages are service
  messages. Every channel honours STOP.
* **WhatsApp**: outside the 24-hour window only an approved template may be
  sent. `queue_customer_message` refuses free text outside the window.

## 2. What is built

* Tables (RLS on): `firm_messaging_settings`, `firm_customer_messages`,
  `firm_message_templates`, `firm_message_opt_outs`; consent also written to
  the existing `client_comms_consent`.
* Inbox: Clients > Customer inbox (`?section=inbox`). Threads on the client
  sheet and the job sheet, merged with portal messages.
* Templates: booking confirmation, on my way, running late, invoice, review
  request, editable per firm in Settings > Customer messaging.
* Inbound: a reply rings the office bell (`customer_message`, opens the
  client's messages). STOP / STOPALL / UNSUBSCRIBE / CANCEL / END / QUIT
  opts out; START / UNSTOP / YES opts back in. Office can also record an opt-out.
* Allowance: credits a month per firm (text segments + WhatsApp messages;
  email free). At 80% the owner gets one bell a month (`messaging_allowance`);
  at 100% sending stops until next month. Usage shows in Settings.
* Crew: see a job's messages only if the firm switches it on and they are
  assigned to the job; they cannot send, and see the customer's number only
  when the job shares contact details.

Proved on the live database, rolled back (10 Oct): owner and admin send and
read; over-allowance refused; WhatsApp free text refused outside the window;
crew not on the job denied (0 rows); crew on the job denied while the setting
is off, then read 2 messages (cannot send) when on; outsider and anon denied;
inbound STOP opted the client out and the next text was refused; START opted
back in; a repeated provider id was dropped; an inbound reply rang the bell
for the owner and admin with the route to the client's messages.

## 3. Setup for Andrew

### Twilio (texts, and WhatsApp to start)
1. Create a Twilio account (business), upgrade from trial, buy one UK mobile
   number per firm that is switched on (start with a test number; never a
   real customer).
2. On each number: Messaging > "A message comes in" webhook (POST):
   `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/customer-message-inbound?provider=twilio`
3. WhatsApp: register a WhatsApp sender in Twilio (needs a Meta Business
   Manager), submit the five templates as Content templates, note each Content SID.
4. Secrets (Supabase > Edge Functions > Secrets):
   * `TWILIO_ACCOUNT_SID`
   * `TWILIO_AUTH_TOKEN` (also verifies inbound signatures)
   * `TWILIO_WHATSAPP_CONTENT_SIDS` JSON, e.g. `{"booking_confirmation":"HX...","on_my_way":"HX...","running_late":"HX...","invoice":"HX...","review_request":"HX..."}`

### Meta WhatsApp Cloud API (later, optional)
* Secrets: `META_WHATSAPP_TOKEN` (system user token), `META_APP_SECRET`,
  `META_WEBHOOK_VERIFY_TOKEN` (any long random string),
  `META_WHATSAPP_TEMPLATES` JSON map of template key to approved template name (language `en_GB`).
* Webhook URL: `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/customer-message-inbound?provider=meta`,
  verify token as above, subscribe to `messages`.

### Internal relay (sandbox tests and inbound email)
* Secret `MESSAGING_INBOUND_SECRET` (long random string). Requests to
  `?provider=internal` must carry `x-elecmate-signature: t=<unix>,v1=<hex HMAC-SHA256(secret, "<t>.<raw body>")>`, valid 5 minutes.
* Inbound email needs an inbound-parse route at the mail provider that POSTs
  JSON `{ channel: "email", from, to, body, firm_id }` here, signed as above.
  Not built: the provider's inbound parse is not set up.

### Deploy
```bash
npx supabase functions deploy customer-message-send --project-ref jtwygbeceundfgnkirof
npx supabase functions deploy customer-message-inbound --no-verify-jwt --project-ref jtwygbeceundfgnkirof
```
With no secrets set, every inbound request fails the signature check and is
refused, so deploying is safe before the accounts exist.

### Switch one firm live (service role, SQL editor)
```sql
insert into public.firm_messaging_settings (firm_id, provider, sms_number, whatsapp_number, monthly_allowance)
values ('<firm uuid>', 'twilio', '+447...', null, 100)
on conflict (firm_id) do update
  set provider = excluded.provider, sms_number = excluded.sms_number,
      whatsapp_number = excluded.whatsapp_number, monthly_allowance = excluded.monthly_allowance,
      updated_at = now();
```
Back to test mode: `update public.firm_messaging_settings set provider = 'sandbox' where firm_id = '<firm uuid>';`

### End-to-end proof still to do (needs the Twilio account)
Switch the demo firm to `twilio` with Andrew's own phone saved on a test
client; send "On my way"; reply from the phone; check the bell and thread;
reply STOP and check the next send is refused; switch back to `sandbox`.
