import React, { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Check, Loader2, UserRound, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { supabase } from '@/integrations/supabase/client';

interface DeviceContactsImportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete?: () => void;
}

interface DeviceContact {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

type LoadState = 'idle' | 'loading' | 'denied' | 'error' | 'ready';

/**
 * Normalise for dedupe. Phones: digits only, UK international prefix folded
 * to national ('+44 7700 900123' and '07700 900123' must collide). Emails:
 * lowercased — matching useCustomers.saveCustomer, which stores lowercase.
 */
/**
 * Dedupe keys for every existing customer. Paginated — PostgREST caps a
 * single select at 1,000 rows, which would silently blind the dedupe for
 * heavy CRM users.
 */
async function fetchExistingKeys(userId: string): Promise<Set<string>> {
  const keys = new Set<string>();
  const PAGE = 1000;
  for (let page = 0; ; page++) {
    const { data: existing, error } = await supabase
      .from('customers')
      .select('email, phone')
      .eq('user_id', userId)
      .order('id', { ascending: true })
      .range(page * PAGE, (page + 1) * PAGE - 1);
    if (error) throw error;
    (existing ?? []).forEach((c) => {
      if (c.email) keys.add(`e:${emailKey(String(c.email))}`);
      if (c.phone) keys.add(`p:${phoneKey(String(c.phone))}`);
    });
    if (!existing || existing.length < PAGE) break;
  }
  return keys;
}

const phoneKey = (raw: string): string => {
  let digits = raw.replace(/\D+/g, '');
  // International prefixes: '0044…' → '44…'; then '+44 (0)7700…' style —
  // where the vanity '(0)' survives digit-stripping — must fold to the same
  // national key as '07700…', so drop a redundant '0' after the 44.
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('44') && digits.length >= 11) {
    let rest = digits.slice(2);
    if (rest.startsWith('0')) rest = rest.slice(1);
    digits = `0${rest}`;
  }
  return digits;
};
const emailKey = (raw: string): string => raw.trim().toLowerCase();

/**
 * ELE-1332 — native contacts import for the CRM (iOS + Android).
 *
 * Opens the device address book via @capacitor-community/contacts (dynamic
 * import so web bundles never load native code), lets the user multi-select,
 * dedupes against existing customers by email/phone, and bulk-creates the
 * rest. Web falls back to the CSV dialog in CustomersPage.
 */
const DeviceContactsImportSheet: React.FC<DeviceContactsImportSheetProps> = ({
  open,
  onOpenChange,
  onImportComplete,
}) => {
  const haptic = useHaptic();
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [contacts, setContacts] = useState<DeviceContact[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [existingKeys, setExistingKeys] = useState<Set<string>>(new Set());

  const [loadNonce, setLoadNonce] = useState(0);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    const load = async () => {
      setLoadState('loading');
      setSelected(new Set());
      setSearch('');
      try {
        const { Contacts } = await import('@capacitor-community/contacts');
        const permission = await Contacts.requestPermissions();
        // iOS 18 'limited' (user chose "Select Contacts") IS granted access —
        // the plugin reads the selected subset fine. Only a hard state blocks.
        if (permission.contacts !== 'granted' && permission.contacts !== 'limited') {
          if (!cancelled) setLoadState('denied');
          return;
        }

        const [{ contacts: deviceContacts }, { data: authData }] = await Promise.all([
          Contacts.getContacts({
            projection: { name: true, phones: true, emails: true, postalAddresses: true },
          }),
          supabase.auth.getUser(),
        ]);

        // Existing customers — used to badge "already in CRM" and skip on
        // import.
        const keys = authData.user ? await fetchExistingKeys(authData.user.id) : new Set<string>();

        const mapped: DeviceContact[] = (deviceContacts ?? [])
          .map((c) => {
            const name = c.name?.display?.trim() ?? '';
            const phone = c.phones?.[0]?.number?.trim() ?? null;
            const email = c.emails?.[0]?.address?.trim() ?? null;
            const addr = c.postalAddresses?.[0];
            const address = addr
              ? [addr.street, addr.city, addr.postcode].filter(Boolean).join(', ')
              : null;
            return { id: c.contactId, name, phone, email, address };
          })
          .filter((c) => c.name && (c.phone || c.email))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (!cancelled) {
          setExistingKeys(keys);
          setContacts(mapped);
          setLoadState('ready');
        }
      } catch (error) {
        console.error('[DeviceContactsImport] load failed:', error);
        if (!cancelled) setLoadState('error');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [open, loadNonce]);

  const isExisting = (c: DeviceContact): boolean =>
    Boolean(
      (c.email && existingKeys.has(`e:${emailKey(c.email)}`)) ||
      (c.phone && existingKeys.has(`p:${phoneKey(c.phone)}`))
    );

  const filtered = useMemo(() => {
    if (!search.trim()) return contacts;
    const q = search.trim().toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q)
    );
  }, [contacts, search]);

  // Render cap — trade address books run to thousands of contacts; mounting
  // them all janks the WebView. Search narrows past the cap.
  const RENDER_CAP = 200;
  const visible = filtered.length > RENDER_CAP ? filtered.slice(0, RENDER_CAP) : filtered;
  const hiddenCount = filtered.length - visible.length;

  const toggle = (id: string) => {
    haptic.light();
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleImport = async () => {
    const chosen = contacts.filter((c) => selected.has(c.id));
    if (chosen.length === 0) return;
    setIsImporting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      // Refetch the dedupe snapshot at import time. The load-time snapshot
      // goes stale if a previous attempt's chunk COMMITTED but its response
      // was lost (signal drop) — a fresh read sees those rows and prevents
      // the retry double-importing them. No DB unique constraint backs this
      // up (live customers table has none), so this check is the guard.
      const freshKeys = await fetchExistingKeys(user.id);
      freshKeys.forEach((k) => existingKeys.add(k));

      // Skip CRM matches AND within-selection duplicates (the same person
      // often exists twice in an address book — iCloud + Google cards).
      const seenInBatch = new Set<string>();
      const toInsert: DeviceContact[] = [];
      for (const c of chosen) {
        if (isExisting(c)) continue;
        const keys = [
          c.email ? `e:${emailKey(c.email)}` : null,
          c.phone ? `p:${phoneKey(c.phone)}` : null,
        ].filter(Boolean) as string[];
        if (keys.some((k) => seenInBatch.has(k))) continue;
        keys.forEach((k) => seenInBatch.add(k));
        toInsert.push(c);
      }
      const skipped = chosen.length - toInsert.length;

      const CHUNK = 50;
      let inserted = 0;
      let failedChunkError: unknown = null;
      for (let i = 0; i < toInsert.length; i += CHUNK) {
        const rows = toInsert.slice(i, i + CHUNK).map((c) => ({
          user_id: user.id,
          name: c.name,
          // Lowercase to match saveCustomer's normalisation, so the manual
          // add-customer duplicate check still catches these later.
          email: c.email ? emailKey(c.email) : null,
          phone: c.phone,
          address: c.address,
          notes: null,
        }));
        // Plain insert — same as the CSV import path. The live customers
        // table has NO unique constraint on (user_id, email); an upsert with
        // onConflict would 42P10-fail every chunk. Client-side dedupe above
        // (fresh snapshot + in-batch keys) is the duplicate guard.
        const { error } = await supabase.from('customers').insert(rows);
        if (error) {
          failedChunkError = error;
          break;
        }
        inserted += rows.length;
        // Mark as existing so a retry after a failed later chunk can't
        // re-insert what already landed.
        rows.forEach((r) => {
          if (r.email) existingKeys.add(`e:${r.email}`);
          if (r.phone) existingKeys.add(`p:${phoneKey(r.phone)}`);
        });
      }

      if (failedChunkError) {
        console.error('[DeviceContactsImport] chunk failed:', failedChunkError);
        haptic.warning();
        toast({
          title: inserted > 0 ? `${inserted} imported so far` : 'Import failed',
          description:
            inserted > 0
              ? 'Connection dropped part-way. Tap Import again — already-saved contacts are skipped.'
              : 'Could not save those contacts. Please try again.',
          variant: 'destructive',
        });
        if (inserted > 0) onImportComplete?.();
        return;
      }

      haptic.success();
      toast({
        title: `${inserted} customer${inserted === 1 ? '' : 's'} imported`,
        description: skipped > 0 ? `${skipped} skipped — already in your CRM.` : undefined,
      });
      onImportComplete?.();
      onOpenChange(false);
    } catch (error) {
      console.error('[DeviceContactsImport] import failed:', error);
      toast({
        title: 'Import failed',
        description: 'Could not save those contacts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        // Block dismissal mid-import: closing and reopening would rebuild the
        // dedupe snapshot while chunks are still landing, enabling doubles.
        if (!next && isImporting) return;
        onOpenChange(next);
      }}
    >
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden lg:left-64">
        <div className="flex h-full flex-col bg-background">
          <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-white/20" aria-hidden />
          <div className="flex items-center gap-3 p-4 pb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-elec-yellow/15">
              <Users className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-white">Import from contacts</p>
              <p className="text-[12px] text-white/60">
                {loadState === 'ready'
                  ? `${contacts.length} contacts with a phone or email`
                  : 'Pick customers straight from your phone'}
              </p>
            </div>
          </div>

          {loadState === 'ready' && (
            <div className="px-4 pb-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contacts…"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4">
            {loadState === 'loading' && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-white/60">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-[13px]">Loading your contacts…</p>
              </div>
            )}
            {loadState === 'denied' && (
              <div className="py-16 text-center">
                <p className="text-[15px] font-medium text-white">Contacts access needed</p>
                <p className="mx-auto mt-2 max-w-[280px] text-[13px] text-white/60">
                  Allow contacts access when prompted — or in your phone's Settings → Elec-Mate if
                  the prompt doesn't appear.
                </p>
                <button
                  type="button"
                  onClick={() => setLoadNonce((n) => n + 1)}
                  className="mt-4 h-10 rounded-xl border border-elec-yellow/30 bg-elec-yellow/10 px-5 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.98]"
                >
                  Try again
                </button>
              </div>
            )}
            {loadState === 'error' && (
              <div className="py-16 text-center">
                <p className="text-[15px] font-medium text-white">Couldn't read contacts</p>
                <p className="mt-2 text-[13px] text-white/60">Close this sheet and try again.</p>
              </div>
            )}
            {loadState === 'ready' &&
              visible.map((c) => {
                const active = selected.has(c.id);
                const already = isExisting(c);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => !already && toggle(c.id)}
                    disabled={already || isImporting}
                    className={cn(
                      'flex w-full items-center gap-3 border-b border-white/[0.06] py-3 text-left touch-manipulation transition-colors',
                      already ? 'opacity-45' : 'active:bg-white/[0.04]'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors',
                        active
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : 'border-white/25 bg-transparent'
                      )}
                    >
                      {active && <Check className="h-4 w-4" />}
                    </div>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                      <UserRound className="h-4 w-4 text-white/70" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-white">{c.name}</p>
                      <p className="truncate text-[12px] text-white/55">
                        {already ? 'Already in your CRM' : ((c.phone || c.email) ?? '')}
                      </p>
                    </div>
                  </button>
                );
              })}
            {loadState === 'ready' && hiddenCount > 0 && (
              <p className="py-3 text-center text-[12px] text-white/50">
                Showing {RENDER_CAP} of {filtered.length} — search to narrow
              </p>
            )}
            {loadState === 'ready' && visible.length === 0 && (
              <p className="py-12 text-center text-[13px] text-white/50">No matching contacts</p>
            )}
          </div>

          <div className="border-t border-white/[0.06] p-4 pb-8">
            <button
              type="button"
              onClick={handleImport}
              disabled={selected.size === 0 || isImporting || loadState !== 'ready'}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-sm font-semibold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Importing…
                </>
              ) : (
                `Import ${selected.size} contact${selected.size === 1 ? '' : 's'}`
              )}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DeviceContactsImportSheet;
