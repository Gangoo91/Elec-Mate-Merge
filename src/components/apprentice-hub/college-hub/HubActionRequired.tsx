import { cn } from '@/lib/utils';
import type { ActionRequiredItem, ActionRequiredKind } from '@/hooks/useMyCollegeOverview';

/* ==========================================================================
   HubActionRequired — only renders when there's something to act on.
   Editorial list: small caps eyebrow per kind, white headline, soft detail
   line, chevron-suffix anchor link. No icon parade.
   ========================================================================== */

const KIND_LABEL: Record<ActionRequiredKind, string> = {
  otj_rejected: 'Returned hours',
  quiz_overdue: 'Overdue quiz',
  goal_blocked: 'Blocked goal',
  tutor_comment_unread: 'Tutor comment',
  portfolio_action: 'Portfolio',
  attendance_low: 'Attendance',
};

const KIND_TONE: Record<ActionRequiredKind, string> = {
  otj_rejected: 'text-white/85',
  quiz_overdue: 'text-white/85',
  goal_blocked: 'text-white/85',
  tutor_comment_unread: 'text-white/85',
  portfolio_action: 'text-white/85',
  attendance_low: 'text-amber-200/85',
};

interface Props {
  items: ActionRequiredItem[];
}

export function HubActionRequired({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/85">
            Action required
          </div>
          <span className="text-[10.5px] tabular-nums text-amber-200/85">
            {items.length} {items.length === 1 ? 'thing' : 'things'} to do
          </span>
        </div>
        <ul className="mt-3 -mx-1 divide-y divide-amber-400/10">
          {items.map((item, i) => (
            <li key={`${item.kind}-${i}`}>
              <a
                href={item.href}
                className="group flex items-baseline justify-between gap-3 px-1 py-2.5 hover:bg-white/[0.02] transition-colors touch-manipulation"
              >
                <div className="min-w-0">
                  <div
                    className={cn('text-[10.5px] font-medium uppercase tracking-[0.16em]',
                      KIND_TONE[item.kind]
                    )}
                  >
                    {KIND_LABEL[item.kind]}
                  </div>
                  <div className="mt-0.5 text-[13px] font-medium text-white leading-snug">
                    {item.title}
                  </div>
                  {item.detail && (
                    <div className="mt-1 text-[11.5px] text-white/85 leading-snug line-clamp-2">
                      {item.detail}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-[11.5px] font-medium text-white/85 group-hover:text-white transition-colors">
                  Open →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
