/**
 * What Xero's own organisation says, rather than what we assume about it.
 * ────────────────────────────────────────────────────────────────────────
 * Two settings live here, resolved the same way and for the same reason:
 * which sales ACCOUNT an invoice posts to (ELE-1744) and which TAX TYPE a CIS
 * reverse-charge sale carries (ELE-1703). Both were hardcoded to a value that
 * is only right for a default UK chart, and neither can be recalled — they
 * differ per organisation, so they have to be read from it.
 *
 * 🔴 BOTH reads require the `accounting.settings.read` OAuth scope, which the
 * app did not request until 19 Sep 2026. A token keeps the scopes it was
 * granted, so every connection made before that date cannot read either
 * endpoint and never will until it is reconnected. Both resolvers fall back
 * silently by design, so the symptom is not an error — it is a default that
 * looks deliberate. See `accounting-oauth-init` for the endpoint/scope table.
 *
 * ── ELE-1744. Invoice sync hardcoded Xero's default UK sales code, '200'. That
 * is correct for a stock chart of accounts and rejected outright by any
 * organisation that customised theirs — Patrick at Elctric Ltd uses 001 and
 * every sync came back "Account code '200' is not a valid code for this
 * document", with no setting anywhere to change it.
 *
 * WHY THIS IS SHARED AND NOT JUST IN THE CALLBACK
 *
 * Detecting at connect time alone fixes nobody who has already connected, and
 * at the time of writing that is every single Xero user on the platform. The
 * 12 existing connections would have kept falling back to '200' forever,
 * because they will not pass through the OAuth callback again unless something
 * makes them reconnect.
 *
 * So the code is resolved at three points, and any one of them is enough:
 *
 *   1. On connect      — new connections arrive already configured.
 *   2. On first sync   — existing connections fix themselves, no action needed.
 *   3. After a refusal — if Xero rejects the stored code, re-detect and retry
 *                        once. Covers a chart that changed after we read it:
 *                        an account archived, renumbered, restructured.
 *
 * Nobody is asked anything, including the people who are already broken today.
 *
 * ⚠️ That last paragraph was wrong, and only became checkable on 19 Sep 2026.
 * Routes 2 and 3 cannot repair an existing connection, because the token they
 * use was never granted `accounting.settings.read` — so `/Accounts` refuses
 * them and the fallback to '200' is permanent. The twelve connections that
 * predate the scope fix DO have to be asked to reconnect. Route 1 is the only
 * one that has ever worked, and only from 19 Sep onward.
 */

export interface XeroRevenueAccount {
  code: string;
  name: string;
  /** Xero's own marker for the default sales account, where it sets one. */
  isSystemSales: boolean;
}

/**
 * Active revenue accounts in the organisation.
 *
 * ARCHIVED accounts are excluded deliberately: Xero rejects a posting to one
 * exactly as it rejects a code that does not exist, so including them would
 * reproduce the original bug through a friendlier route.
 */
export async function fetchXeroRevenueAccounts(
  accessToken: string,
  tenantId: string
): Promise<XeroRevenueAccount[]> {
  const response = await fetch('https://api.xero.com/api.xro/2.0/Accounts', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Xero-tenant-id': tenantId,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Xero Accounts lookup failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  const raw: Array<Record<string, unknown>> = data?.Accounts ?? [];

  return raw
    .filter(
      (a) =>
        String(a.Type).toUpperCase() === 'REVENUE' &&
        String(a.Status ?? 'ACTIVE').toUpperCase() === 'ACTIVE' &&
        String(a.Code ?? '').trim() !== ''
    )
    .map((a) => ({
      code: String(a.Code).trim(),
      name: String(a.Name ?? '').trim() || String(a.Code).trim(),
      isSystemSales: String(a.SystemAccount ?? '').toUpperCase() === 'SALES',
    }))
    .sort((a, b) =>
      a.isSystemSales === b.isSystemSales
        ? a.code.localeCompare(b.code, 'en', { numeric: true })
        : a.isSystemSales
          ? -1
          : 1
    );
}

/**
 * The sales account, or null when there is no confident answer.
 *
 * Ordered strongest evidence first, and it gives up rather than guessing — a
 * wrong code puts an electrician's turnover in the wrong place in their own
 * books, which is worse than asking them once.
 *
 *   1. SystemAccount === 'SALES'. Xero's own designation, not our inference.
 *   2. A revenue account named exactly "Sales".
 *   3. The only revenue account there is — nothing to be ambiguous about.
 *
 * Note what is NOT matched: "income", "turnover", "revenue". Those catch
 * "Other Revenue" and "Interest Income", and a plausible-but-wrong match is
 * the failure mode with real consequences.
 */
export function pickSalesAccount(accounts: XeroRevenueAccount[]): string | null {
  if (accounts.length === 0) return null;

  const system = accounts.find((a) => a.isSystemSales);
  if (system) return system.code;

  const exact = accounts.find((a) => /^sales$/i.test(a.name));
  if (exact) return exact.code;

  if (accounts.length === 1) return accounts[0].code;

  return null;
}

/**
 * The code to post with, detecting and saving one if the connection has none.
 *
 * `forceRedetect` ignores what is stored — used after Xero has refused the
 * stored code, which means the chart changed underneath it.
 *
 * Returns null when nothing confident can be determined, and the caller keeps
 * its own fallback. Never throws: a detection failure must not turn into a
 * failed invoice sync, because the stored or default code may well work.
 */
export async function resolveXeroSalesAccountCode(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string,
  accessToken: string,
  tenantId: string,
  opts: { forceRedetect?: boolean } = {}
): Promise<string | null> {
  try {
    const { data: row } = await supabase
      .from('accounting_oauth_tokens')
      .select('account_settings')
      .eq('user_id', userId)
      .eq('provider', 'xero')
      .maybeSingle();

    const settings = (row?.account_settings ?? {}) as Record<string, unknown>;
    const stored =
      typeof settings.sales_account_code === 'string' ? settings.sales_account_code.trim() : '';

    // A choice already made wins and is not second-guessed — unless Xero has
    // just told us it is invalid.
    if (stored && !opts.forceRedetect) return stored;

    const accounts = await fetchXeroRevenueAccounts(accessToken, tenantId);
    const detected = pickSalesAccount(accounts);

    if (!detected) {
      console.log(
        '[ELE-1744] no unambiguous sales account:',
        accounts.map((a) => `${a.code} ${a.name}`).join(', ') || '(none)'
      );
      return null;
    }

    // Merged, not replaced: the expense category map is going to live in this
    // same object and must survive.
    await supabase
      .from('accounting_oauth_tokens')
      .update({ account_settings: { ...settings, sales_account_code: detected } })
      .eq('user_id', userId)
      .eq('provider', 'xero');

    console.log(`[ELE-1744] resolved Xero sales account ${detected} for ${userId}`);
    return detected;
  } catch (error) {
    // Best effort by design. The caller still has '200', which works for every
    // organisation on a default chart.
    console.warn('[ELE-1744] sales account resolution failed:', error);
    return null;
  }
}

/** True when Xero refused the posting because the account code is unusable. */
export function isInvalidAccountCodeError(messages: string[]): boolean {
  return messages.some((m) => /not a valid code|account code/i.test(m));
}

/* ── Domestic reverse charge (ELE-1703) ─────────────────────────────────── */

/**
 * A tax rate as Xero reports it, reduced to the fields we rely on.
 *
 * `TaxType` is the code an invoice line carries; `Name` is what the user sees
 * and names themselves. We match on the name because the DRC rates a UK org
 * holds are named for what they are, while the TaxType string is an internal
 * code that differs between orgs and regions.
 */
export interface XeroTaxRate {
  name: string;
  taxType: string;
  status: string;
  canApplyToRevenue: boolean;
  effectiveRate: number;
}

export async function fetchXeroTaxRates(
  accessToken: string,
  tenantId: string
): Promise<XeroTaxRate[]> {
  const response = await fetch('https://api.xero.com/api.xro/2.0/TaxRates', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Xero-tenant-id': tenantId,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    /*
     * 401/403 here is very likely the scope, not the token. /TaxRates needs
     * `accounting.settings[.read]`, which the app only started requesting on
     * 19 Sep 2026 — every connection made before that carries a token that
     * cannot read tax rates and never will, because a token keeps the scopes
     * it was granted. Those connections have to be re-made.
     *
     * Saying so in the message means the Sentry warning this ends up in reads
     * as "they need to reconnect" rather than as an unexplained failure.
     */
    const scopeHint =
      response.status === 401 || response.status === 403
        ? ' — probably a connection made before accounting.settings.read was requested; it must be reconnected'
        : '';
    throw new Error(
      `Xero TaxRates lookup failed (${response.status})${scopeHint}: ${body.slice(0, 200)}`
    );
  }

  const data = await response.json();
  const raw = Array.isArray(data?.TaxRates)
    ? (data.TaxRates as Array<Record<string, unknown>>)
    : [];

  return raw.map((r) => {
    // Xero sends EffectiveRate as a number, but it has been seen as a string
    // in older responses. A value we cannot parse must not read as 0 — that
    // is the one value that means "this is the DRC rate".
    const parsedRate = Number(r.EffectiveRate);
    return {
      name: typeof r.Name === 'string' ? r.Name : '',
      taxType: typeof r.TaxType === 'string' ? r.TaxType : '',
      status: typeof r.Status === 'string' ? r.Status : '',
      canApplyToRevenue: r.CanApplyToRevenue === true,
      effectiveRate: Number.isFinite(parsedRate) ? parsedRate : NaN,
    };
  });
}

/**
 * The org's tax type for a CIS domestic reverse charge SALE, or null.
 *
 * Why match on the name: a UK Xero org carries rates named "Domestic Reverse
 * Charge @ 20% (VAT on Income)" and an expense counterpart. The words
 * "reverse charge" are the stable part — the `TaxType` code behind them is
 * internal and not safe to hardcode, which is exactly why the DRC type has to
 * be read from the org rather than recalled.
 *
 * Three filters, none of them optional:
 *   - ACTIVE only. A deleted or archived rate cannot be posted against.
 *   - Revenue-applicable only. The expense variant is input tax; putting it on
 *     a sales invoice would claim VAT back rather than report it, which is a
 *     worse error than the one this fixes.
 *   - 0% only. Under DRC the supplier charges nothing and the invoice we are
 *     posting carries zero VAT, so a "reverse charge" rate with a rate on it
 *     would have Xero compute tax the customer was never charged and land on
 *     a total they were never shown. Better to return null and post exactly
 *     what we post today than to guess at an unfamiliar rate.
 */
export function pickReverseChargeSalesTaxType(rates: XeroTaxRate[]): string | null {
  const candidate = rates.find(
    (r) =>
      r.status.toUpperCase() === 'ACTIVE' &&
      r.canApplyToRevenue &&
      r.effectiveRate === 0 &&
      /reverse\s*charge/i.test(r.name) &&
      !!r.taxType
  );
  return candidate?.taxType ?? null;
}

/**
 * Why the failure reason is carried back rather than just logged.
 *
 * Both failures post the invoice the same way — the old way — but they want
 * opposite responses from us, and telling them apart is the whole value of
 * reporting either:
 *
 *   `not-offered`   The org has no DRC rate. Theirs to switch on in Xero.
 *   `lookup-failed` We could not read /TaxRates. Ours. Until a connection is
 *                   re-made it lacks `accounting.settings.read` and this is
 *                   what every pre-19-Sep-2026 connection will report.
 *
 * Reporting the first when it is really the second sends an electrician off
 * to hunt for a setting that is already switched on.
 */
export type ReverseChargeResolution =
  | { taxType: string; reason: 'stored' | 'detected' }
  | { taxType: null; reason: 'not-offered' | 'lookup-failed'; detail?: string };

/**
 * Resolve — and remember — the org's reverse-charge sales tax type.
 *
 * Mirrors `resolveXeroSalesAccountCode`: a value already stored wins, is
 * cached on the connection, and a lookup failure is never fatal. The caller
 * falls back to its existing behaviour, so a failed resolution leaves the
 * invoice exactly as it posts today rather than breaking a sync.
 */
export async function resolveXeroReverseChargeTaxType(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  userId: string,
  accessToken: string,
  tenantId: string
): Promise<ReverseChargeResolution> {
  let settings: Record<string, unknown> = {};

  try {
    const { data: row, error } = await supabase
      .from('accounting_oauth_tokens')
      .select('account_settings')
      .eq('user_id', userId)
      .eq('provider', 'xero')
      .maybeSingle();

    // Same reason as the write below: the client resolves with an error
    // rather than throwing it.
    if (error) console.error('[xero] could not read stored reverse-charge tax type:', error);

    settings = (row?.account_settings ?? {}) as Record<string, unknown>;
    const stored =
      typeof settings.reverse_charge_tax_type === 'string'
        ? settings.reverse_charge_tax_type.trim()
        : '';
    if (stored) return { taxType: stored, reason: 'stored' };
  } catch (err) {
    console.error('[xero] could not read stored reverse-charge tax type:', err);
    // Fall through and detect. A cache we cannot read is not a reason to give
    // up on the answer.
  }

  let rates: XeroTaxRate[];
  try {
    rates = await fetchXeroTaxRates(accessToken, tenantId);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error('[xero] reverse-charge tax rate lookup failed:', detail);
    return { taxType: null, reason: 'lookup-failed', detail };
  }

  const detected = pickReverseChargeSalesTaxType(rates);
  if (!detected) {
    const seen = rates.map((r) => r.name).join(' | ') || 'none';
    console.log(
      `[xero] no active revenue-applicable reverse-charge tax rate for user ${userId} — rates: ${seen}`
    );
    return { taxType: null, reason: 'not-offered', detail: seen.slice(0, 500) };
  }

  /*
   * Caching is an optimisation. Failing to write it costs one extra Xero call
   * next time and nothing else, so it must never lose the answer we already
   * have — hence both the error check and the catch.
   *
   * The `error` check is the one that matters: the Supabase client RESOLVES
   * with `{ data, error }` rather than throwing, so a bare try/catch would
   * never see a rejected write and the failure would be invisible.
   */
  try {
    const { error } = await supabase
      .from('accounting_oauth_tokens')
      .update({ account_settings: { ...settings, reverse_charge_tax_type: detected } })
      .eq('user_id', userId)
      .eq('provider', 'xero');
    if (error) console.error('[xero] could not cache reverse-charge tax type:', error);
  } catch (err) {
    console.error('[xero] could not cache reverse-charge tax type:', err);
  }

  console.log(`[xero] reverse-charge tax type resolved for user ${userId}: ${detected}`);
  return { taxType: detected, reason: 'detected' };
}
