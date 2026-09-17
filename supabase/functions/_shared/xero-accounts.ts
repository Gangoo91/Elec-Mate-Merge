/**
 * Which Xero account an electrician's invoices post to.
 * ────────────────────────────────────────────────────────────────────────
 * ELE-1744. Invoice sync hardcoded Xero's default UK sales code, '200'. That
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
