/**
 * Month-end pay run for approved expenses (ELE-1948).
 *
 * Every approved claim starts ticked, grouped by person so the office can
 * match it against what goes into payroll. One tap marks the ticked claims
 * paid on the chosen date; the same selection exports to CSV for payroll.
 */
import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Check, Download } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  SheetShell,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import type { ExpenseClaim } from '@/services/financeService';

const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function PayRunSheet({
  open,
  onOpenChange,
  approved,
  onConfirm,
  onExport,
  busy,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  approved: ExpenseClaim[];
  onConfirm: (ids: string[], paidDate: string) => Promise<unknown>;
  onExport: (claims: ExpenseClaim[]) => Promise<void>;
  busy: boolean;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [paidDate, setPaidDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    if (open) {
      setSelected(new Set(approved.map((e) => e.id)));
      setPaidDate(format(new Date(), 'yyyy-MM-dd'));
    }
    // Reset only when the sheet opens, not when the list refreshes behind it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const groups = useMemo(() => {
    const byPerson = new Map<string, { name: string; claims: ExpenseClaim[] }>();
    for (const e of approved) {
      const key = e.employee_id || 'unknown';
      const g = byPerson.get(key) ?? { name: e.employees?.name ?? 'Unknown', claims: [] };
      g.claims.push(e);
      byPerson.set(key, g);
    }
    return [...byPerson.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [approved]);

  const chosen = approved.filter((e) => selected.has(e.id));
  const total = chosen.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const people = new Set(chosen.map((e) => e.employee_id)).size;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleGroup = (claims: ExpenseClaim[]) =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = claims.every((c) => next.has(c.id));
      for (const c of claims) {
        if (allOn) next.delete(c.id);
        else next.add(c.id);
      }
      return next;
    });

  const confirm = async () => {
    await onConfirm(
      chosen.map((e) => e.id),
      paidDate
    );
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06]"
      >
        <SheetShell
          eyebrow="Expenses"
          title="Pay approved claims"
          description={
            chosen.length > 0
              ? `${gbp(total)} to ${people} ${people === 1 ? 'person' : 'people'} · ${chosen.length} claim${chosen.length === 1 ? '' : 's'}`
              : 'Nothing ticked'
          }
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onExport(chosen)}
                disabled={chosen.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </SecondaryButton>
              <PrimaryButton
                data-help="expenses.payrun-mark"
                fullWidth
                onClick={confirm}
                disabled={chosen.length === 0 || busy || !paidDate}
              >
                {busy ? 'Saving…' : `Mark ${chosen.length} paid`}
              </PrimaryButton>
            </>
          }
        >
          <Field label="Paid on" hint="The date the money left, for example payroll day.">
            <Input
              data-help="expenses.payrun-date"
              type="date"
              value={paidDate}
              max={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => setPaidDate(e.target.value)}
              className={inputClass}
            />
          </Field>

          {groups.map((g) => {
            const sub = g.claims.reduce((s, e) => s + (Number(e.amount) || 0), 0);
            const allOn = g.claims.every((c) => selected.has(c.id));
            return (
              <section
                key={g.name + g.claims[0].id}
                className="-mx-5 border-y border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x"
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(g.claims)}
                  className="w-full min-h-[52px] flex items-center justify-between gap-3 px-5 py-3 touch-manipulation"
                >
                  <span className="text-[15px] font-semibold text-white">{g.name}</span>
                  <span className="text-[13px] text-white tabular-nums">
                    {gbp(sub)} · {allOn ? 'untick all' : 'tick all'}
                  </span>
                </button>
                <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                  {g.claims.map((e) => {
                    const on = selected.has(e.id);
                    return (
                      <li key={e.id}>
                        <button
                          type="button"
                          onClick={() => toggle(e.id)}
                          aria-pressed={on}
                          className="w-full flex items-center gap-3 px-5 py-3 text-left touch-manipulation"
                        >
                          <span
                            className={cn(
                              'h-6 w-6 shrink-0 rounded-md border flex items-center justify-center',
                              on ? 'bg-elec-yellow border-elec-yellow' : 'border-white/40'
                            )}
                          >
                            {on && <Check className="h-4 w-4 text-black" />}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[14px] text-white truncate">
                              {e.description || e.category}
                            </span>
                            <span className="block text-[12px] text-white">
                              {e.category}
                              {e.submitted_date
                                ? ` · ${format(new Date(e.submitted_date), 'd MMM')}`
                                : ''}
                              {e.receipt_url ? ' · receipt' : ' · no receipt'}
                            </span>
                          </span>
                          <span className="text-[14px] font-semibold text-white tabular-nums">
                            {gbp(Number(e.amount) || 0)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
