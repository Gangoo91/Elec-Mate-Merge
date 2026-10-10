/**
 * /college/onboarding — every current learner and whether they are ready to
 * start (ELE-2088): eligibility and residency declarations, ID checked, the
 * employer's confirmation, the apprenticeship agreement, the contract for
 * services, the initial assessment, prior learning and the training plan.
 * Tap a learner for their checklist in Student 360.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  COLLEGE_LIST,
  COLLEGE_ROW,
  CollegePageHeader,
} from '@/components/college/ui/CollegeUi';
import { TEXT_TAB_RAIL, TabMark, textTabCn } from '@/components/college/people/peopleKit';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { useCollegeOnboardingList } from '@/hooks/useOnboarding';

const HELP: PageHelpContent = {
  id: 'college-onboarding',
  title: 'Ready to start',
  what: 'One checklist per learner of what the funding rules need before an apprenticeship starts, with who confirmed each item and the paragraph it meets.',
  steps: [
    {
      title: 'Start onboarding',
      body: 'Open a learner, start onboarding and send them and their employer their links. Nobody needs a new account.',
    },
    {
      title: 'They confirm and sign',
      body: 'The learner confirms eligibility and residency, uploads their ID and signs the apprenticeship agreement on their phone. The employer confirms the employment, signs the agreement and confirms the contract for services.',
    },
    {
      title: 'You check and finish',
      body: 'Check the ID against the originals, and complete the initial assessment, prior learning and training plan in Student 360. When every item is done the learner shows as ready to start.',
    },
  ],
  notes: [
    {
      title: 'Signatures that stand up',
      body: 'Each confirmation stores exactly what was confirmed, by whom and when, with a fingerprint chained to the one before. Nothing can be edited or deleted (funding rules 2026/27, paras 346 and 347).',
    },
    {
      title: 'ID copies',
      body: 'Uploads go to your college’s private evidence store, readable only by your staff. Only the document type is recorded, never its number.',
    },
    {
      title: 'Evidence pack',
      body: 'Every completed item appears in the learner’s evidence pack with its paragraph.',
    },
  ],
  source: 'Apprenticeship funding rules 2026/27, version 3.',
};

type Filter = 'not_ready' | 'ready' | 'not_started' | 'all';

const fmt = (iso: string | null) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'no start date';

export default function CollegeOnboardingPage() {
  const navigate = useNavigate();
  const { collegeId } = useCollegeCan();
  const { rows, error, loading } = useCollegeOnboardingList(collegeId);
  const [filter, setFilter] = useState<Filter>('not_ready');

  const all = rows ?? [];
  const ready = all.filter((r) => r.started && r.ready).length;
  const notReady = all.filter((r) => r.started && !r.ready).length;
  const notStarted = all.filter((r) => !r.started).length;
  const shown = useMemo(
    () =>
      all.filter((r) =>
        filter === 'all'
          ? true
          : filter === 'ready'
            ? r.started && r.ready
            : filter === 'not_ready'
              ? r.started && !r.ready
              : !r.started
      ),
    [all, filter]
  );

  return (
    <HubPage ground="landing">
      <HubMasthead section="People" title="Ready to start" backTo="/college?section=peoplehub" />
      <HubBody pushContext="Know which apprentices can start, and what each is waiting on">
        <div className="space-y-6 sm:space-y-8">
          <CollegePageHeader
            eyebrow="Enrolment and eligibility"
            title="Ready to start"
            description={
              rows
                ? `${ready} learner${ready === 1 ? '' : 's'} ready to start, ${notReady} waiting on something, ${notStarted} not started.`
                : 'Eligibility, ID, the apprenticeship agreement and the contract for services, per learner.'
            }
            help={HELP}
          />
          <HowItWorks help={HELP} />

          {loading ? (
            <div className="flex min-h-[30vh] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : error ? (
            <p className="text-[14px] text-white">Could not load. {error}</p>
          ) : (
            <>
              <div className={TEXT_TAB_RAIL} role="tablist" aria-label="Show">
                {(
                  [
                    ['not_ready', 'Waiting', notReady],
                    ['ready', 'Ready', ready],
                    ['not_started', 'Not started', notStarted],
                    ['all', 'Everyone', all.length],
                  ] as const
                ).map(([k, label, count]) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={filter === k}
                    onClick={() => setFilter(k)}
                    className={textTabCn(filter === k)}
                    data-testid={`onb-filter-${k}`}
                  >
                    {label}
                    <span className="ml-1.5 tabular-nums">{count}</span>
                    <TabMark on={filter === k} />
                  </button>
                ))}
              </div>

              {shown.length === 0 ? (
                <div className={cn(COLLEGE_CARD, 'space-y-3')}>
                  <p className="text-[14px] text-white">
                    {filter === 'ready'
                      ? 'Nobody is ready to start yet.'
                      : filter === 'not_ready'
                        ? 'Nobody is waiting on anything.'
                        : filter === 'not_started'
                          ? 'Every learner has onboarding started.'
                          : 'No current learners.'}
                  </p>
                  {/* Point at the next list that has people in it. */}
                  {filter !== 'not_started' && filter !== 'all' && notStarted > 0 && (
                    <button
                      type="button"
                      onClick={() => setFilter('not_started')}
                      className={COLLEGE_BTN}
                    >
                      Show the {notStarted} not started
                    </button>
                  )}
                </div>
              ) : (
                <ul className={COLLEGE_LIST} data-testid="onb-list">
                  <li className="hidden px-6 py-2.5 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,1.6fr)] lg:gap-4">
                    {['Learner', 'Progress', 'Waiting on'].map((h) => (
                      <span key={h} className="text-[12.5px] font-semibold text-white">
                        {h}
                      </span>
                    ))}
                  </li>
                  {shown.map((r) => (
                    <li key={r.student_id}>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/college?section=student360&studentId=${r.student_id}#onboarding`
                          )
                        }
                        className={cn(
                          COLLEGE_ROW,
                          'grid grid-cols-1 gap-1.5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,1.6fr)] lg:gap-4'
                        )}
                        data-student={r.student_id}
                        data-testid="onb-row"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-semibold text-white">
                            {r.name}
                          </span>
                          <span className="block truncate text-[12px] text-white">
                            {[r.cohort, r.employer, `starts ${fmt(r.start_date)}`]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              'rounded-full border px-2 py-0.5 text-[12px] font-semibold',
                              !r.started
                                ? 'border-white/[0.2] text-white'
                                : r.ready
                                  ? 'border-emerald-400/40 text-emerald-300'
                                  : 'border-orange-500/40 text-orange-300'
                            )}
                            data-testid="onb-row-status"
                          >
                            {!r.started
                              ? 'Not started'
                              : r.ready
                                ? 'Ready to start'
                                : `${r.done} of ${r.total}`}
                          </span>
                        </span>
                        <span className="min-w-0 text-[12.5px] leading-snug text-white">
                          {!r.started
                            ? 'Open the learner to start onboarding.'
                            : r.waiting.length === 0
                              ? 'Nothing outstanding.'
                              : r.waiting
                                  .slice(0, 3)
                                  .map((w) => `${w.title}: ${w.waiting_on ?? 'to do'}`)
                                  .join(' · ') +
                                (r.waiting.length > 3 ? ` · and ${r.waiting.length - 3} more` : '')}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </HubBody>
    </HubPage>
  );
}
