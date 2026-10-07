import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { SheetShell, PrimaryButton, SecondaryButton, inputClass } from '@/components/employer/editorial';
import {
  useActingFirmId,
  useSetTeamCostRate,
  useTeamCostRates,
  type TeamCostRate,
} from '@/hooks/useJobProfit';
import { formatGBP } from '@/lib/financeDefinitions';

/**
 * ELE-1824 — what an hour of each person costs the firm, and a firm default.
 * Owner/admin only: the SQL behind it refuses anyone else, and the worker
 * never sees it. Job labour = approved hours × cost rate (else pay rate,
 * else firm default), overtime included.
 */

const SOURCE_LABEL: Record<TeamCostRate['rateSource'], string> = {
  cost_rate: 'Cost rate',
  pay_rate: 'Pay rate (no cost rate set)',
  firm_default: 'Firm default',
  none: 'No rate: hours count as £0',
};

function RateRow({ row, firmId }: { row: TeamCostRate; firmId: string }) {
  const save = useSetTeamCostRate();
  const [value, setValue] = useState(row.costRate != null ? String(row.costRate) : '');
  useEffect(() => setValue(row.costRate != null ? String(row.costRate) : ''), [row.costRate]);
  const dirty = value !== (row.costRate != null ? String(row.costRate) : '');

  const commit = async () => {
    const trimmed = value.trim();
    const rate = trimmed === '' ? null : parseFloat(trimmed);
    if (rate !== null && (!Number.isFinite(rate) || rate <= 0 || rate > 1000)) {
      toast.error('Enter an hourly cost between £0.01 and £1,000, or leave it blank');
      return;
    }
    try {
      await save.mutateAsync({ firmId, employeeId: row.employeeId, rate });
      toast.success(rate === null ? `${row.name}: cost rate cleared` : `${row.name}: ${formatGBP(rate)} an hour`);
    } catch (e) {
      toast.error((e as Error).message || 'Could not save the rate');
    }
  };

  const isDefault = row.employeeId === null;
  return (
    <div className="py-3 space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-white truncate">{row.name}</p>
          <p className="text-[12px] text-white leading-snug">
            {isDefault
              ? 'Used for anyone with no cost rate and no pay rate'
              : `${row.payRate != null ? `Pay ${formatGBP(row.payRate)}/hr · ` : 'No pay rate · '}Using: ${SOURCE_LABEL[row.rateSource]}`}
          </p>
        </div>
        {row.effectiveRate != null && !isDefault && (
          <p className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
            {formatGBP(row.effectiveRate)}/hr
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[14px] text-white">£</span>
        <Input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.5"
          placeholder={isDefault ? 'e.g. 30' : 'Blank = use pay rate'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
          aria-label={`${row.name} cost per hour`}
        />
        <span className="text-[13px] text-white shrink-0">/hr</span>
        <SecondaryButton
          onClick={commit}
          disabled={!dirty || save.isPending}
          className="h-11 shrink-0"
        >
          {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
        </SecondaryButton>
      </div>
    </div>
  );
}

export function TeamCostRatesSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { data: firmId } = useActingFirmId();
  const { data: rows = [], isLoading, error } = useTeamCostRates(firmId, open);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <SheetShell
          eyebrow="Job profit"
          title="Cost rates"
          description="What an hour of each person costs the firm: pay plus NI, pension, van and tools. Job labour is approved hours × this rate, overtime included. Never shown to the team."
          footer={
            <PrimaryButton onClick={() => onOpenChange(false)} fullWidth>
              Done
            </PrimaryButton>
          }
        >
          {isLoading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-white/[0.06] animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="text-[13px] text-red-300">{(error as Error).message}</p>
          ) : firmId ? (
            <div className="-mx-5 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-5 sm:mx-0 sm:rounded-2xl sm:border-x divide-y divide-white/[0.08]">
              {rows.map((r) => (
                <RateRow key={r.employeeId ?? 'default'} row={r} firmId={firmId} />
              ))}
            </div>
          ) : null}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
