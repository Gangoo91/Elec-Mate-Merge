/**
 * Am2ExposureSection — on the employer's no-login page (/employer-view/:token),
 * how often the apprentice has done the three things the AM2 tests hardest,
 * on site, and what to give them more of (ELE-2049).
 *
 * The AM2 exposure alert email sends the employer here, so the page must
 * answer it: per area, the count in the college's last N weeks, when it was
 * last done, and one plain suggestion where they need more. Data comes from
 * employer-portal-view → _am2x_summary_service (same rules as the tutor's
 * Am2ExposureCard). Written for someone who has never used the app: no task
 * codes, no app words.
 */

import { cn } from '@/lib/utils';

export interface Am2ExposureArea {
  area: 'safe_isolation' | 'inspection_testing' | 'fault_finding' | string;
  label: string;
  count: number;
  count_window: number;
  count_12w: number;
  last_done: string | null;
  days_since: number | null;
  overdue: boolean;
}

export interface Am2Exposure {
  applies: boolean;
  weeks: number;
  window_from: string;
  counted_from: string;
  areas: Am2ExposureArea[];
}

/** What helps, per area. Things an employer can hand over on a normal job. */
const MORE_OF: Record<string, string> = {
  safe_isolation:
    'On the next job, let them isolate the circuit themselves: switch off, lock off, prove the tester and prove it dead, with you checking each step.',
  inspection_testing:
    'When a job is finished, let them do the testing and write up the results, with you beside them to check the readings.',
  fault_finding:
    'When something trips or stops working, give them the first go at finding the fault before you step in.',
};

/** Fewer than this in the window, and the area gets a suggestion. */
const ENOUGH = 2;

const fmtDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const fmtFull = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export function Am2ExposureSection({
  data,
  firstName,
  className,
}: {
  data: Am2Exposure;
  firstName: string;
  className?: string;
}) {
  const areas = data.areas ?? [];
  if (areas.length === 0) return null;
  // The tracker started on 10 Oct 2026; until N weeks have passed the window
  // is shorter than it says, so say when counting began.
  const startedLate = data.counted_from > data.window_from;
  const needMore = areas.filter((a) => a.count_window < ENOUGH);

  return (
    <div
      className={cn('mt-4 border-t border-white/[0.1] pt-4', className)}
      data-testid="am2-exposure"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-medium text-white">Practice for the final practical test</p>
        {areas.some((a) => a.overdue) && (
          <span className="shrink-0 rounded-full border border-orange-300 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            Needs you
          </span>
        )}
      </div>
      <p className="mt-1 text-[14px] leading-relaxed text-white">
        {firstName}&apos;s apprenticeship ends with the AM2, a practical test. First-time fails are
        most often in fault finding and in inspection and testing, usually from too little practice
        at work. Here is how often {firstName} has done each on site in the last {data.weeks} weeks
        {startedLate ? ` (counting started on ${fmtFull(data.counted_from)})` : ''}.
      </p>

      <ul className="mt-3 divide-y divide-white/[0.1] rounded-xl border border-white/[0.12]">
        {areas.map((a) => {
          const low = a.count_window < ENOUGH;
          return (
            <li key={a.area} className="px-4 py-3" data-testid={`am2-area-${a.area}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-white">{a.label}</p>
                  <p
                    className={`mt-0.5 text-[13px] ${a.overdue ? 'text-orange-300' : 'text-white'}`}
                  >
                    {a.last_done
                      ? `Last done ${fmtDay(a.last_done)}${
                          a.days_since != null && a.days_since > 0
                            ? `, ${a.days_since} ${a.days_since === 1 ? 'day' : 'days'} ago`
                            : ', today'
                        }`
                      : a.overdue
                        ? `None in ${data.weeks} weeks`
                        : 'None recorded yet'}
                  </p>
                </div>
                <p className="shrink-0 text-right">
                  <span className="block text-[20px] font-semibold leading-none tabular-nums text-white">
                    {a.count_window}
                  </span>
                  <span className="mt-1 block text-[12px] text-white">
                    {a.count_window === 1 ? 'time' : 'times'}
                  </span>
                </p>
              </div>
              {low && MORE_OF[a.area] && (
                <p className="mt-2 border-l-2 border-elec-yellow pl-3 text-[13.5px] leading-relaxed text-white">
                  {MORE_OF[a.area]}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[13px] leading-relaxed text-white">
        {needMore.length === 0
          ? `${firstName} is getting regular practice in all three. Thank you. `
          : ''}
        Counted from the work {firstName} and the college record from site. If they have done it and
        not recorded it, ask them to add it.
      </p>
    </div>
  );
}
