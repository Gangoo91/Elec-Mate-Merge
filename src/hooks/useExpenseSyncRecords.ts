import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ExpenseSyncRecord {
  expenseId: string;
  provider: string;
  externalUrl: string | null;
  syncedAt: string | null;
  status: string;
  /** Provider's reason for refusing it, trimmed to something readable. */
  errorMessage: string | null;
}

export interface ExpenseSyncState {
  synced: Map<string, ExpenseSyncRecord>;
  failed: Map<string, ExpenseSyncRecord>;
}

/**
 * Provider errors arrive as a whole JSON payload. The first human sentence in
 * it is the part worth showing; the rest is a wall of API scaffolding.
 */
function readableError(raw: string | null): string | null {
  if (!raw) return null;
  const validation = raw.match(/"Message"\s*:\s*"((?:[^"\\]|\\.)*)"/g) ?? [];
  const messages = validation
    .map((m) => m.replace(/^"Message"\s*:\s*"/, '').replace(/"$/, ''))
    .filter((m) => m && !/^A validation exception occurred$/i.test(m));
  const best = messages.find((m) => /account|code|bank/i.test(m)) ?? messages[0];
  if (best) return best.replace(/\\r|\\n/g, ' ').trim();
  return raw.split('\n')[0].slice(0, 160);
}

/**
 * What happened the last time each expense was sent to an accounting package.
 *
 * Every sync attempt writes a row here, successful or not. On live data ALL
 * FOUR attempts ever made failed, and the user was never shown why:
 *
 *   Xero:       "The specified bank account details does not match a known
 *                bank account" (and, once, "Account code '300' is not a valid
 *                code for this document")
 *   QuickBooks: "Invalid account type used"
 *
 * The reasons are actionable — they are about account codes in the user's own
 * chart of accounts — but the failure surfaced only as a toast that vanished,
 * so an expense silently stayed unsent and the button simply offered again.
 * Reading the record lets the card say what went wrong and stop pretending the
 * next press will behave differently.
 *
 * Success is keyed on status 'synced', never on the mere existence of a row.
 */
export function useExpenseSyncRecords(enabled = true) {
  return useQuery({
    queryKey: ['expense-sync-records'],
    enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<ExpenseSyncState> => {
      const empty: ExpenseSyncState = { synced: new Map(), failed: new Map() };
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return empty;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('accounting_expense_syncs')
        .select('expense_id, provider, external_url, status, synced_at, error_message')
        .eq('user_id', user.id);

      if (error) throw error;

      const state: ExpenseSyncState = { synced: new Map(), failed: new Map() };
      for (const row of (data ?? []) as Array<Record<string, unknown>>) {
        const record: ExpenseSyncRecord = {
          expenseId: row.expense_id as string,
          provider: row.provider as string,
          externalUrl: (row.external_url as string | null) ?? null,
          syncedAt: (row.synced_at as string | null) ?? null,
          status: (row.status as string) ?? 'unknown',
          errorMessage: readableError((row.error_message as string | null) ?? null),
        };
        // A success anywhere wins: the expense IS in an accounting package,
        // whatever a failed attempt at the other provider says.
        if (record.status === 'synced') state.synced.set(record.expenseId, record);
        else if (!state.failed.has(record.expenseId)) state.failed.set(record.expenseId, record);
      }
      return state;
    },
  });
}
