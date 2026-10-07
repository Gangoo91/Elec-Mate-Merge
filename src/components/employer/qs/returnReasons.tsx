import { cn } from '@/lib/utils';

/* ==========================================================================
   QS return reasons (ELE-1975)

   The coded reasons a QS ticks when sending a certificate back. The codes and
   labels match qs_return_reason_label() in the database, which rejects any
   code not in that list, so add a reason in both places.
   ========================================================================== */

export const RETURN_REASONS: { code: string; label: string }[] = [
  { code: 'missing_readings', label: 'Missing test readings' },
  { code: 'zs_over_limit', label: 'Zs over the limit' },
  { code: 'ir_low', label: 'Insulation resistance too low' },
  { code: 'rcd_untested', label: 'RCD not tested' },
  { code: 'observation_codes', label: 'Observation codes wrong' },
  { code: 'observations_unclear', label: 'Observations missing or unclear' },
  { code: 'supply_earthing', label: 'Supply or earthing details missing' },
  { code: 'inspection_schedule', label: 'Schedule of inspections incomplete' },
  { code: 'outcome_mismatch', label: 'Overall outcome does not match the findings' },
  { code: 'client_details', label: 'Client or address details wrong' },
  { code: 'signatures', label: 'Signatures or declarations missing' },
  { code: 'limitations', label: 'Limitations not recorded' },
  { code: 'other', label: 'Other' },
];

const LABELS = new Map(RETURN_REASONS.map((r) => [r.code, r.label]));
export const returnReasonLabel = (code: string) => LABELS.get(code) ?? code;

/** Tap-to-toggle chips for the return form. */
export function ReturnReasonPicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (code: string) =>
    onChange(value.includes(code) ? value.filter((c) => c !== code) : [...value, code]);
  return (
    <div className="flex flex-wrap gap-2" data-help="qsreviews.reasons">
      {RETURN_REASONS.map((r) => {
        const on = value.includes(r.code);
        return (
          <button
            key={r.code}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(r.code)}
            className={cn(
              'min-h-[44px] rounded-full border px-3.5 py-2 text-left text-[13px] touch-manipulation transition-colors active:scale-[0.98]',
              on
                ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                : 'bg-white/[0.06] border-white/[0.14] text-white font-medium hover:border-white/[0.3]'
            )}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}

/** Read-only list of the reasons a certificate came back for. */
export function ReturnReasonList({ codes, className }: { codes: string[] | null | undefined; className?: string }) {
  if (!codes || codes.length === 0) return null;
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {codes.map((c) => (
        <li
          key={c}
          className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-white/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-white"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-400" />
          {returnReasonLabel(c)}
        </li>
      ))}
    </ul>
  );
}

/** The white-text status badge used on both sides of the QS loop. */
const STATUS_DOT: Record<string, string> = {
  pending: 'bg-amber-400',
  approved: 'bg-emerald-400',
  returned: 'bg-red-400',
  cancelled: 'bg-white',
  none: 'bg-white',
};
const STATUS_BORDER: Record<string, string> = {
  pending: 'border-amber-400/50',
  approved: 'border-emerald-400/50',
  returned: 'border-red-400/50',
  cancelled: 'border-white/20',
  none: 'border-white/20',
};
export const QS_STATUS_LABEL: Record<string, string> = {
  pending: 'Waiting for QS',
  approved: 'Approved',
  returned: 'Returned',
  cancelled: 'Cancelled',
  none: 'Not sent to QS',
};

export function QsStatusBadge({ status, label }: { status: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border bg-white/[0.04] px-2.5 py-1 text-[11.5px] font-semibold text-white',
        STATUS_BORDER[status] ?? 'border-white/20'
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[status] ?? 'bg-white')} />
      {label ?? QS_STATUS_LABEL[status] ?? status}
    </span>
  );
}
