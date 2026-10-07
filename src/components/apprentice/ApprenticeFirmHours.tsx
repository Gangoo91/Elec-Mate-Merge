/**
 * ApprenticeFirmHours — "Your hours" for an apprentice on a firm's roster
 * (ELE-2011), shown under "Your firm" on the Apprentice Hub.
 *
 * Every figure comes from get_otj_summary (THE off-the-job figure, ELE-1877),
 * never re-derived here. The confirmed hours are kept apart by who signed
 * them: the firm (employer_attested_hours) or the college
 * (college_verified_hours). Waiting hours are shown but never counted.
 */
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useOtjSummary } from '@/hooks/useOtjSummary';
import { useMyEmployerLink } from '@/hooks/useMyEmployerLink';

const fmt = (n: number | null | undefined) => {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v) || v <= 0) return '0';
  return v >= 100 ? String(Math.round(v)) : v.toFixed(1).replace(/\.0$/, '');
};

export function ApprenticeFirmHours({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { data: link } = useMyEmployerLink();
  const { data: s, loading } = useOtjSummary();

  if (!link || loading || !s) return null;

  const mine = link.supervisors.find((x) => x.isMine) ?? link.supervisors[0];
  const waitingFor = mine?.name ? mine.name.trim().split(/\s+/)[0] : link.companyName;
  const required = s.required_hours ? Number(s.required_hours) : null;

  const cells: { label: string; value: string; note: string; tone?: 'volt' | 'muted' }[] = [
    {
      label: `Attested by ${link.companyName}`,
      value: fmt(s.employer_attested_hours),
      note: 'Your firm confirmed it',
      tone: 'volt',
    },
    {
      label: 'Verified by college',
      value: fmt(s.college_verified_hours),
      note: 'Your tutor signed it off',
      tone: 'volt',
    },
    {
      label: 'Learning in the app',
      value: fmt(s.app_learning_hours),
      note: 'Counts now, tutor approves',
    },
    {
      label: `Waiting for ${waitingFor}`,
      value: fmt(s.pending_hours),
      note: link.pendingAttestations
        ? `${link.pendingAttestations} ${link.pendingAttestations === 1 ? 'entry' : 'entries'} · not counted yet`
        : 'Not counted until signed',
      tone: 'muted',
    },
  ];

  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">Your hours</h2>
        <button
          type="button"
          onClick={() => navigate('/apprentice/ojt-hub')}
          className="-my-2 -mr-2 flex h-11 shrink-0 items-center gap-1 px-2 text-[12.5px] font-semibold text-white touch-manipulation"
        >
          Every entry
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate('/apprentice/ojt-hub')}
        className={cn(
          '-mx-4 block w-[calc(100%+2rem)] overflow-hidden border-y border-elec-yellow/35 text-left touch-manipulation sm:mx-0 sm:w-full sm:rounded-2xl sm:border-x',
          CARD_SURFACE
        )}
      >
        <div className="flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-5">
          <p className="text-[13px] font-semibold text-white">Off-the-job hours counted</p>
          <p className="shrink-0 text-[13px] text-white">
            {required ? `of ${fmt(required)}h needed` : 'Target not set yet'}
          </p>
        </div>
        <p className="px-4 pt-1 text-[38px] font-semibold leading-none tracking-tight tabular-nums text-white sm:px-5">
          {fmt(s.counted_hours)}
          <span className="ml-1 text-[16px] font-semibold text-white">h</span>
        </p>

        <div className="mt-4 grid grid-cols-2 border-t border-white/[0.10]">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className={cn(
                'min-w-0 px-4 py-3 sm:px-5',
                i % 2 === 1 && 'border-l border-white/[0.10]',
                i >= 2 && 'border-t border-white/[0.10]'
              )}
            >
              <p className="truncate text-[12px] font-semibold leading-tight text-white">{c.label}</p>
              <p
                className={cn(
                  'mt-1 text-[22px] font-semibold leading-none tabular-nums',
                  c.tone === 'volt' ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {c.value}
                <span className="ml-0.5 text-[12px] font-medium text-white">h</span>
              </p>
              <p className="mt-1 text-[11.5px] leading-snug text-white">{c.note}</p>
            </div>
          ))}
        </div>

        {s.rejected_entries > 0 && (
          <p className="border-t border-red-500/40 px-4 py-3 text-[13px] font-semibold text-white sm:px-5">
            {s.rejected_entries} {s.rejected_entries === 1 ? 'entry was' : 'entries were'} referred
            back — fix and resubmit in your hours
          </p>
        )}
      </button>
    </section>
  );
}
