/**
 * The firm API guide (ELE-2077), shown in Settings › Developers. The same
 * content, with more detail, is in docs/firm-api.md. Keep the two in step.
 */
export interface DocBlock {
  title: string;
  body: string[];
  code?: string;
}

export const firmApiDocs = (base: string): DocBlock[] => [
  {
    title: 'What it is',
    body: [
      'A read-only REST API over your firm’s own data: jobs, customers, quotes, invoices, timesheets and certificates.',
      'Each key belongs to your firm only. It can never read another firm’s data, because the firm comes from the key itself, not from anything in the request.',
    ],
  },
  {
    title: 'Keys',
    body: [
      'Only the owner can create keys. Pick what each key can read, and how many calls a minute it may make (60 unless you change it).',
      'The key is shown once, when you create it. Elec-Mate keeps only a fingerprint of it, so a lost key cannot be shown again: revoke it and make a new one.',
      'Send the key in the Authorization header on every call.',
    ],
    code: `curl -H "Authorization: Bearer emf_your_key" \\\n  ${base}/jobs?since=2026-10-01T00:00:00Z`,
  },
  {
    title: 'Reading data',
    body: [
      'GET /v1 lists what the key can read. GET /v1/<resource> returns rows, oldest change first.',
      'Resources: jobs, customers, quotes, invoices, timesheets, certificates.',
      'Add ?since=<date and time> to get only rows changed after then, ?limit=1 to 500 (100 by default) and ?offset= to page. When next_offset is not null, ask again with it.',
    ],
    code: `{\n  "resource": "invoices",\n  "count": 100,\n  "next_offset": 100,\n  "data": [ { "id": "…", "invoice_number": "INV-0042", "status": "paid", "total": 1440.00, "updated_at": "…" } ]\n}`,
  },
  {
    title: 'Errors and limits',
    body: [
      '401: no key, an unknown key, or a revoked or expired one. 403: the key cannot read that resource. 429: too many calls this minute; wait 60 seconds (Retry-After). 400: a bad since date.',
      'Every call is logged against the key (never the key itself), and the calls in the last 24 hours show beside it here.',
    ],
  },
  {
    title: 'Webhooks',
    body: [
      'Add an https address and pick the events. Elec-Mate POSTs a JSON event there when it happens: job created, changed or completed; invoice raised, sent, paid or changed; a certificate added to a job.',
      'A 2xx reply within 10 seconds counts as delivered. Otherwise it is tried again after 1 minute, 5 minutes, 30 minutes, 2 hours, 12 hours and 24 hours, then dropped. An address that fails 100 times in a row is switched off.',
      'Each event carries an Elec-Mate-Delivery id that stays the same on every retry, so ignore one you have already handled.',
    ],
    code: `POST https://your.server/hook\nElec-Mate-Event: invoice.paid\nElec-Mate-Delivery: 6c1f…\nElec-Mate-Signature: t=1760100000,v1=5d2e…\n\n{ "id": "evt_…", "type": "invoice.paid", "created_at": "…", "data": { "invoice": { … } } }`,
  },
  {
    title: 'Checking the signature',
    body: [
      'Every webhook is signed with the secret shown when you added it. Work out HMAC-SHA256 of "<t>.<raw body>" with the secret and compare it with v1. Refuse anything older than 5 minutes.',
    ],
    code: `const [t, v1] = header.split(',').map((p) => p.split('=')[1]);\nconst mac = crypto.createHmac('sha256', secret).update(t + '.' + rawBody).digest('hex');\nconst ok = crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(v1))\n  && Math.abs(Date.now() / 1000 - Number(t)) < 300;`,
  },
];
