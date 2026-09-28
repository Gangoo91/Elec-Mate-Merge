/**
 * Supabase surface enough for the two Stripe prompts to MOUNT, pinned to the
 * state we care about: NOT CONNECTED. That is the only state where either
 * surface renders a call to action, so it is the only one worth measuring.
 */
/**
 * ⚠️ This stub does NOT honour `.order()` — rows come back in array order. The
 * phantom row is therefore FIRST on purpose: the card only renders a 3-row
 * preview, so a fixture placed last is invisible whether it is filtered or
 * not, and an assertion about it passes even when the filter is removed. That
 * exact mistake made the first version of this check worthless.
 *
 * Rows the awaitable builder resolves to, keyed by table. A chain that is
 * itself `await`ed (no .single()) must be a THENABLE or the hook receives the
 * proxy instead of `{ data, error }` and silently renders nothing.
 */
const CASE = new URLSearchParams(location.search).get('case') ?? '';

/** One quote only — checks the singular wording and the absent "Show all". */
const SINGLE = [
  { id: 's1', quote_number: '2026/050', client_data: { name: 'Sarah Okonkwo' },
    job_details: { title: 'Consumer unit upgrade' }, total: 845,
    accepted_at: new Date(Date.now() - 45 * 864e5).toISOString(),
    first_sent_at: new Date(Date.now() - 50 * 864e5).toISOString(), acceptance_method: null },
];

/**
 * Hostile content: a job title and client name far longer than the column, and
 * a six-figure value. Real quotes carry titles like "C2 remedials from EICR
 * carried out" with trailing spaces — length is not hypothetical.
 */
const LONG = [
  { id: 'l1', quote_number: '2026/060',
    client_data: { name: 'Kensington & Chelsea Property Management Services Limited' },
    job_details: { title: 'Full rewire of a six-storey Victorian conversion including consumer unit replacement, emergency lighting and fire alarm interlink across all communal areas' },
    total: 231859.4,
    accepted_at: new Date(Date.now() - 400 * 864e5).toISOString(),
    first_sent_at: new Date(Date.now() - 410 * 864e5).toISOString(), acceptance_method: 'in_app_signature' },
  { id: 'l2', quote_number: '2026/061', client_data: { name: 'A' },
    job_details: { title: 'B' }, total: 1,
    accepted_at: new Date(Date.now() - 31 * 864e5).toISOString(),
    first_sent_at: new Date(Date.now() - 35 * 864e5).toISOString(), acceptance_method: null },
];

const COMPANY = [
  { user_id: 'harness-user', hourly_rate: 45, worker_rates: { electrician: 45, apprentice: 22 } },
];

const ROWS: Record<string, unknown[]> = {
  company_profiles: COMPANY,
  quotes: [
    // MUST NOT APPEAR: marked accepted but never sent and never signed — the
    // 25-of-33 draft case. If this one ever renders, the evidence filter has
    // regressed and the card is telling electricians something untrue.
    { id: 'q5', quote_number: '2026/099', client_data: { name: 'Never Sent Ltd' },
      job_details: { title: 'PHANTOM — should never be shown' },
      total: 9999, accepted_at: new Date(Date.now() - 200 * 864e5).toISOString(),
      first_sent_at: null, acceptance_method: null },
    { id: 'q1', quote_number: '2026/010', client_data: { name: 'Azhar Abbasi' },
      job_details: { title: 'New cooker circuit x2, remedials, new consumer unit' },
      total: 2331.79, accepted_at: new Date(Date.now() - 129 * 864e5).toISOString(),
      first_sent_at: new Date(Date.now() - 140 * 864e5).toISOString(), acceptance_method: 'in_app_signature' },
    { id: 'q2', quote_number: '2026/012', client_data: { name: 'Chris Washington' },
      job_details: { title: 'C2 remedials from EICR carried out' },
      total: 1111.37, accepted_at: new Date(Date.now() - 117 * 864e5).toISOString(),
      first_sent_at: new Date(Date.now() - 120 * 864e5).toISOString(), acceptance_method: null },
    { id: 'q3', quote_number: '2026/001', client_data: { name: 'Tom Jenkins' },
      job_details: {}, total: 3619.43,
      accepted_at: new Date(Date.now() - 115 * 864e5).toISOString(),
      first_sent_at: null, acceptance_method: 'in_app_signature' },
    { id: 'q4', quote_number: '2026/002', client_data: { name: 'Steve Ledoux' },
      job_details: { title: 'New cooker supply and consumer unit' },
      total: 1115.77, accepted_at: new Date(Date.now() - 115 * 864e5).toISOString(),
      first_sent_at: new Date(Date.now() - 118 * 864e5).toISOString(), acceptance_method: null },
  ],
  /*
   * ELE-1704 — two credit notes already raised, one of them VOID.
   *
   * The void row is the point: it must NOT count towards "already credited"
   * (voiding is how an issued credit note is undone, so it has given nothing
   * back) but it is still a real row the list has to survive.
   */
  credit_notes: [
    { id: 'cn1', credit_note_number: 'Credit/001', invoice_id: 'inv-1',
      invoice_number: 'Invoice/042', total: 120, cis_amount: 0, status: 'issued',
      reason: 'Second circuit not required', created_at: new Date(Date.now() - 2 * 864e5).toISOString() },
    { id: 'cn2', credit_note_number: 'Credit/002', invoice_id: 'inv-1',
      invoice_number: 'Invoice/042', total: 999, cis_amount: 0, status: 'void',
      reason: 'Raised in error', created_at: new Date(Date.now() - 1 * 864e5).toISOString() },
  ],
};

const makeChain = (table: string): any => {
  const rows =
    table === 'quotes' && CASE === 'single' ? SINGLE
    : table === 'quotes' && CASE === 'long' ? LONG
    : ROWS[table] ?? null;
  const result = { data: rows, error: null };
  const c: any = new Proxy(() => c, {
    get: (_t, k) =>
      k === 'then'
        ? (res: (v: unknown) => void) => Promise.resolve(result).then(res)
        : k === 'maybeSingle' || k === 'single'
          ? async () => ({ data: (ROWS[table] ?? [])[0] ?? null, error: null })
          : () => c,
    apply: () => c,
  });
  return c;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chain: any = new Proxy(() => chain, {
  get: (_t, k) =>
    k === 'then'
      ? undefined
      : k === 'maybeSingle' || k === 'single'
        ? async () => ({ data: { stripe_account_id: null, stripe_account_status: null }, error: null })
        : () => chain,
  apply: () => chain,
});

const session = {
  access_token: 'harness',
  user: { id: 'harness' },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = {
  from: (table: string) => makeChain(table),
  auth: {
    getUser: async () => ({ data: { user: session.user } }),
    getSession: async () => ({ data: { session }, error: null }),
    refreshSession: async () => ({ data: { session }, error: null }),
  },
  storage: { from: () => ({ createSignedUrl: async () => ({ data: null }), download: async () => ({ data: null }) }) },
  // `connected: false` drives both surfaces to the not-connected CTA.
  functions: { invoke: async () => ({ data: { status: 'not_connected', connected: false }, error: null }) },
  /*
   * `useCompanyProfile` reads through an RPC, not the table — a direct query
   * 406s, per the comment in the hook. Without this the harness renders the
   * "no hourly rate saved yet" state and the arithmetic the feature exists
   * for is never seen.
   */
  /* Realtime. `useQuoteBuilder` subscribes; without this the hook throws
     "supabase.channel is not a function" after the render has succeeded. */
  channel: () => {
    const ch = {
      on: () => ch,
      subscribe: () => ch,
      unsubscribe: async () => 'ok',
    };
    return ch;
  },
  removeChannel: async () => 'ok',
  rpc: async (fn: string) =>
    fn === 'get_my_company_profile'
      ? { data: COMPANY, error: null }
      : { data: null, error: null },
};
