/**
 * Where invoices post in Xero.
 * ────────────────────────────────────────────────────────────────────────
 * ELE-1744. Invoice sync hardcoded Xero's default UK sales code, '200'. Right
 * for a stock chart of accounts, rejected outright by any org that customised
 * theirs: Patrick at Elctric Ltd uses 001 and every sync came back "Account
 * code '200' is not a valid code for this document", with no setting anywhere
 * to change it.
 *
 * WHAT THIS IS NOT
 * It is not a box to type an account code into. That was the first version and
 * it is still homework — it asks someone who wires houses for a living to go
 * and look up a ledger code in another product. The connection already lets us
 * read their chart of accounts, so this shows their actual accounts by name
 * and they tap one.
 *
 * Most people should never open it. `accounting-oauth-callback` detects the
 * sales account at connect time, so this usually just states where invoices go
 * — which is worth showing regardless. An electrician ought to be able to see
 * where their turnover lands in their own books without being made to decide
 * it.
 *
 * The typed fallback survives for the case that matters: Xero unreachable or
 * the token expired. Being unable to reach Xero must not also mean being
 * unable to fix the setting that is stopping Xero working.
 */

import { useCallback, useEffect, useState } from 'react';
import { Check, ChevronRight, Loader2, Pencil } from 'lucide-react';
import { FunctionsHttpError } from '@supabase/supabase-js';

import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/** Matches XERO_DEFAULT_SALES_ACCOUNT_CODE in accounting-sync-invoice. */
const XERO_DEFAULT_SALES_ACCOUNT_CODE = '200';

interface RevenueAccount {
  code: string;
  name: string;
  isSystemSales: boolean;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

export function XeroSalesAccountField() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<RevenueAccount[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  /** Set when the chart of accounts could not be read — see the typed fallback. */
  const [listError, setListError] = useState<string | null>(null);
  const [typedCode, setTypedCode] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('accounting-list-accounts');
      if (error) {
        /*
         * A non-2xx arrives as FunctionsHttpError, whose `message` is the
         * generic "Edge Function returned a non-2xx status code". The message
         * actually worth reading — "Your Xero connection has expired.
         * Disconnect and reconnect Xero" — is in the response BODY, so without
         * this the carefully written errors are thrown away and the user is
         * told nothing. Same pattern as designIntake.ts and EICRSummary.tsx.
         */
        if (error instanceof FunctionsHttpError) {
          const body = await error.context.json().catch(() => null);
          throw new Error(body?.error || body?.message || 'Could not read your Xero accounts.');
        }
        throw error;
      }
      setAccounts(data?.accounts ?? []);
      setSelected(data?.selected ?? null);
      setTypedCode(data?.selected ?? '');
      setListError(null);
    } catch (err) {
      console.error('[XeroSalesAccountField] could not list accounts', err);
      setListError(
        err instanceof Error ? err.message : 'Could not read your Xero chart of accounts.'
      );
      // Still show whatever is already configured, read straight from the row.
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: row } = await supabase
          .from('accounting_oauth_tokens')
          .select('account_settings')
          .eq('user_id', user.id)
          .eq('provider', 'xero')
          .maybeSingle();
        const code =
          (row?.account_settings as { sales_account_code?: string } | null)?.sales_account_code ??
          '';
        setSelected(code || null);
        setTypedCode(code);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const persist = useCallback(
    async (code: string) => {
      setSaving(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('You are signed out — sign in and try again.');

        const trimmed = code.trim();

        // Read-modify-write: the expense category map is going to live in the
        // same object, and replacing it wholesale would discard it silently.
        const { data: existing } = await supabase
          .from('accounting_oauth_tokens')
          .select('account_settings')
          .eq('user_id', user.id)
          .eq('provider', 'xero')
          .maybeSingle();

        // Typed as the column's own Json rather than Record<string, unknown>:
        // the generated Update type will not accept the looser shape.
        const next: Record<string, string> = {
          ...((existing?.account_settings as Record<string, string> | null) ?? {}),
        };
        // Empty means "use Xero's default", so the key is removed rather than
        // stored as '' — which would be sent to Xero verbatim and rejected.
        if (trimmed) next.sales_account_code = trimmed;
        else delete next.sales_account_code;

        const { error } = await supabase
          .from('accounting_oauth_tokens')
          .update({ account_settings: next })
          .eq('user_id', user.id)
          .eq('provider', 'xero');
        if (error) throw error;

        setSelected(trimmed || null);
        setPickerOpen(false);
        toast({
          title: 'Saved',
          description: trimmed
            ? `Invoices will post to ${trimmed} in Xero.`
            : `Invoices will post to Xero's default sales account (${XERO_DEFAULT_SALES_ACCOUNT_CODE}).`,
        });
      } catch (err) {
        console.error('[XeroSalesAccountField] save failed', err);
        toast({
          title: 'Could not save',
          description: err instanceof Error ? err.message : 'Please try again.',
          variant: 'destructive',
        });
      } finally {
        setSaving(false);
      }
    },
    [toast]
  );

  const selectedAccount = accounts.find((a) => a.code === selected);
  const describe = () => {
    if (selectedAccount) return `${selectedAccount.code} — ${selectedAccount.name}`;
    if (selected) return selected;
    return `${XERO_DEFAULT_SALES_ACCOUNT_CODE} — Xero default`;
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-white/[0.14] bg-white/[0.05] p-4 text-[13px] text-white">
        <Loader2 className="h-4 w-4 animate-spin" /> Checking your Xero accounts…
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Sales account</h3>
        <p className="mb-3 mt-1 text-[12px] text-white">
          Where your invoices post in Xero.
        </p>

        {/* ── the normal case: their accounts, by name ──────────────────── */}
        {!listError && (
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex min-h-[44px] w-full touch-manipulation items-center justify-between gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-left"
          >
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-white">
              {describe()}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow" />
          </button>
        )}

        {/*
          Xero unreachable or the token expired. Being unable to reach Xero must
          not also mean being unable to fix the setting that is stopping Xero
          working — so the code can still be typed.
        */}
        {listError && (
          <>
            <p className="mb-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-[12px] text-orange-300">
              {listError} You can still enter the code by hand — it&rsquo;s in Xero under Accounting
              &rarr; Chart of accounts.
            </p>
            <div className="flex items-center gap-2">
              <Pencil className="h-4 w-4 shrink-0 text-elec-yellow" />
              <input
                value={typedCode}
                onChange={(e) => setTypedCode(e.target.value)}
                placeholder={XERO_DEFAULT_SALES_ACCOUNT_CODE}
                className={inputCn}
                aria-label="Xero sales account code"
              />
            </div>
            <button
              type="button"
              onClick={() => persist(typedCode)}
              disabled={saving || typedCode.trim() === (selected ?? '')}
              className="mt-3 h-11 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black disabled:bg-white/[0.08] disabled:text-white"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </>
        )}
      </div>

      {/* ── the picker ──────────────────────────────────────────────────── */}
      <Sheet open={pickerOpen} onOpenChange={setPickerOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <SheetHeader className="border-b border-white/[0.1] px-4 py-3">
              <SheetTitle className="text-[15px] font-semibold text-white">
                Sales account
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <p className="mb-3 text-[12px] text-white">
                These are the revenue accounts in your Xero organisation. Invoices you sync will
                post to the one you choose.
              </p>

              {accounts.length === 0 && (
                <p className="py-8 text-center text-[14px] text-white">
                  No revenue accounts found in your Xero organisation.
                </p>
              )}

              <ul className="space-y-2">
                {accounts.map((a) => {
                  const isSelected = a.code === selected;
                  return (
                    <li key={a.code}>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => persist(a.code)}
                        className={cn(
                          'flex min-h-[44px] w-full touch-manipulation items-center gap-3 rounded-xl border px-4 py-3 text-left',
                          isSelected
                            ? 'border-elec-yellow bg-elec-yellow/[0.08]'
                            : 'border-white/[0.12] bg-white/[0.04]'
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-semibold text-white">
                            {a.code} — {a.name}
                          </span>
                          {a.isSystemSales && (
                            <span className="block text-[12px] text-white">
                              Your default sales account in Xero
                            </span>
                          )}
                        </span>
                        {isSelected && <Check className="h-4 w-4 shrink-0 text-elec-yellow" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default XeroSalesAccountField;
