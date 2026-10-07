/**
 * ConfirmedHoursSection — /college/otj, ELE-1876 "hours stamped once".
 *
 * What apprentices confirmed (or turned down) from the hours the app
 * proposed to them: register days, days they marked "College" in the site
 * diary, and site diary training that had not reached the hours record.
 * Every row says where the hours came from, so a tutor can see a register
 * day was not typed in by hand.
 *
 *  - A register day kept at or under the lesson length counts straight away
 *    (the tutor's own register is the proof; verified with the marker's name).
 *  - Anything else is a normal pending entry, signed off in the inbox.
 *  - Turned-down rows show the apprentice's reason.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  COLLEGE_LIST,
  COLLEGE_ROW,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import {
  fetchCollegeConfirmedHours,
  fmtProposalDate,
  fmtProposalMinutes,
  type ConfirmedHoursRow,
  type OtjProposalSource,
} from '@/hooks/useOtjProposals';

const SOURCE_WORDS: Record<OtjProposalSource, string> = {
  register: 'From the register',
  college_day: 'From their site diary (college day)',
  diary: 'From their site diary',
};

type View = 'all' | 'waiting' | 'counted' | 'turned_down';

function rowState(r: ConfirmedHoursRow): { label: string; tone: 'good' | 'wait' | 'bad'; view: View } {
  if (r.status === 'rejected') return { label: 'Turned down', tone: 'bad', view: 'turned_down' };
  if (r.entry_status === 'verified' || r.entry_status === 'verified_by_employer')
    return { label: 'Counted', tone: 'good', view: 'counted' };
  if (r.entry_status === 'rejected') return { label: 'Sent back', tone: 'bad', view: 'waiting' };
  if (!r.otj_entry_id) return { label: 'Withdrawn', tone: 'bad', view: 'turned_down' };
  return { label: 'To sign off', tone: 'wait', view: 'waiting' };
}

export function ConfirmedHoursSection({ cohortId }: { cohortId?: string | null }) {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ConfirmedHoursRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('all');

  const load = useCallback(async () => {
    try {
      setError(null);
      setRows(await fetchCollegeConfirmedHours(30));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const inCohort = useMemo(
    () => (cohortId && cohortId !== 'all' ? rows.filter((r) => r.cohort_id === cohortId) : rows),
    [rows, cohortId]
  );
  const counts = useMemo(() => {
    const c: Record<View, number> = { all: inCohort.length, waiting: 0, counted: 0, turned_down: 0 };
    for (const r of inCohort) c[rowState(r).view] += 1;
    return c;
  }, [inCohort]);
  const shown = view === 'all' ? inCohort : inCohort.filter((r) => rowState(r).view === view);

  // Nothing to show and nothing went wrong: keep the page short.
  if (!loading && !error && rows.length === 0) return null;

  return (
    <section className="space-y-3" aria-label="Confirmed by apprentices">
      <CollegeSectionTitle
        title="Confirmed by apprentices"
        sub="Hours from registers and site diaries that apprentices confirmed in the last 30 days, with where each came from."
      />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {(
          [
            ['all', 'All'],
            ['waiting', 'To sign off'],
            ['counted', 'Counted'],
            ['turned_down', 'Turned down'],
          ] as Array<[View, string]>
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={view === key}
            onClick={() => setView(key)}
            className={cn(chipCn(view === key), 'inline-flex items-center gap-2')}
          >
            {label}
            <span className="tabular-nums">{counts[key]}</span>
          </button>
        ))}
      </div>

      <div className={COLLEGE_LIST}>
        {loading ? (
          <div className="h-24 animate-pulse bg-white/[0.04]" />
        ) : error ? (
          <p className="px-5 py-6 text-[13px] text-white">Could not load confirmed hours. {error}</p>
        ) : shown.length === 0 ? (
          <p className="px-5 py-6 text-[13px] text-white">Nothing in this view.</p>
        ) : (
          <ul className="divide-y divide-white/[0.06] lg:grid lg:grid-cols-2 lg:divide-y-0">
            {shown.map((r) => {
              const s = rowState(r);
              const mins = r.status === 'confirmed' ? r.confirmed_minutes : r.proposed_minutes;
              const changed =
                r.status === 'confirmed' &&
                r.proposed_minutes != null &&
                r.confirmed_minutes != null &&
                r.confirmed_minutes !== r.proposed_minutes;
              return (
                <li key={r.proposal_id} className="lg:border-b lg:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() =>
                      s.view === 'waiting' && r.entry_status === 'pending'
                        ? navigate('/college/otj/inbox')
                        : navigate(
                            `/college?section=student360&studentId=${encodeURIComponent(r.college_student_id)}#otj`
                          )
                    }
                    className={cn(COLLEGE_ROW, 'h-full items-start')}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-white">
                        {r.learner_name ?? 'Learner'} · {r.title}
                      </span>
                      <span className="block text-[12.5px] leading-snug text-elec-yellow">
                        {SOURCE_WORDS[r.source]} on {fmtProposalDate(r.activity_date)}
                        {mins ? `, ${fmtProposalMinutes(mins)}` : ''}
                        {changed ? ` (lesson ${fmtProposalMinutes(r.proposed_minutes)})` : ''}
                      </span>
                      {r.status === 'rejected' && r.reject_reason && (
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                          Reason: {r.reject_reason}
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold',
                        s.tone === 'good' && 'border-emerald-400/40 text-emerald-300',
                        s.tone === 'wait' && 'border-elec-yellow/50 text-elec-yellow',
                        s.tone === 'bad' && 'border-orange-400/40 text-orange-300'
                      )}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
