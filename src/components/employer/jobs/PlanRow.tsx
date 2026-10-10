/**
 * One row of the job sheet's Planning panel: who can go, the customer, repeat
 * visits, training. Same shape everywhere so the panel reads as one thing:
 * an icon, what it is, where it stands, and at most two actions. On a phone
 * the actions sit under the text, full width; on desktop they sit on the right.
 */
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PlanTone = 'ok' | 'warn' | 'neutral';

const TONE: Record<PlanTone, string> = {
  ok: 'text-emerald-400',
  warn: 'text-orange-300',
  neutral: 'text-elec-yellow',
};

export function PlanRow({
  icon: Icon,
  tone = 'neutral',
  title,
  status,
  detail,
  actions,
  children,
  helpId,
}: {
  icon: LucideIcon;
  tone?: PlanTone;
  title: string;
  /** One line: where this stands. */
  status: ReactNode;
  /** Optional extra lines (problems, the last messages). */
  detail?: ReactNode;
  /** One or two buttons (use planBtn / planBtnPrimary). */
  actions?: ReactNode;
  children?: ReactNode;
  helpId?: string;
}) {
  return (
    <div data-help={helpId} className="px-4 py-3.5 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <Icon className={cn('mt-0.5 h-[18px] w-[18px] shrink-0', TONE[tone])} />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white">{title}</p>
            <div className="mt-0.5 text-[14.5px] font-medium leading-snug text-white">{status}</div>
            {detail && (
              <div className="mt-1 space-y-0.5 text-[12.5px] leading-snug text-white">{detail}</div>
            )}
          </div>
        </div>
        {actions && (
          <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:gap-2 [&>*:only-child]:col-span-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/** Secondary action in a Planning row: 44px, fits beside text on desktop. */
export const planBtn =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.05] px-3.5 text-[13.5px] font-semibold text-white touch-manipulation transition-colors hover:bg-white/[0.09] active:scale-[0.98] disabled:opacity-50 whitespace-nowrap';
/** The one thing to do next in a row. */
export const planBtnPrimary =
  'inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-elec-yellow px-3.5 text-[13.5px] font-semibold text-black touch-manipulation transition-colors hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50 whitespace-nowrap';

/** The panel the rows live in. */
export function PlanPanel({ children }: { children: ReactNode }) {
  return (
    <section
      data-help="jobs.planning"
      className="overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04]"
    >
      <div className="border-b border-white/[0.08] px-4 py-3 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Planning</h3>
        <p className="text-[12.5px] text-white">
          Who can go, the customer, repeat visits and training.
        </p>
      </div>
      <div className="divide-y divide-white/[0.07]">{children}</div>
    </section>
  );
}
