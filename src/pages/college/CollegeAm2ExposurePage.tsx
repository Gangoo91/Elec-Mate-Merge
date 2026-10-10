/**
 * /college/am2-exposure — every learner's on-site safe isolation, inspection
 * and testing and fault finding, with who has gone N weeks with none
 * (ELE-2049). The college admin sets N. Tap a learner for their Student 360.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  COLLEGE_LIST,
  COLLEGE_ROW,
  CollegePageHeader,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import {
  EXPOSURE_AREAS,
  setCollegeExposureWeeks,
  useCollegeAm2Exposure,
} from '@/hooks/epa/useElectricalEpa';
import { NET_SURVEY_URL } from '@/components/epa/Am2ExposureCard';

const HELP: PageHelpContent = {
  id: 'college-am2-exposure',
  title: 'AM2 practice on site',
  what: 'How often each apprentice does safe isolation, inspection and testing and fault finding at work, from what they tag in evidence and their site diary.',
  steps: [
    {
      title: 'Learners and tutors tag',
      body: 'Evidence and diary days are tagged with the three areas. The app suggests tags from what was written; nothing counts until someone taps it.',
    },
    {
      title: 'Spot the gaps',
      body: 'Orange means none of that area on site in the college’s number of weeks. Learners with most gaps are at the top.',
    },
    {
      title: 'Tutor and employer are told',
      body: 'Each Monday, the tutor gets a bell and the employer an email with their usual link, at most once per area per that many weeks.',
    },
  ],
  notes: [
    {
      title: 'Why these three',
      body: 'NET’s survey of first-time AM2 fails: 44% lacked confidence in fault finding, 36% in inspection and testing, and 25% had no regular inspection and testing on site.',
    },
    {
      title: 'When the clock starts',
      body: 'From the learner’s start date, but not before 10 October 2026, when tagging began. Only learners on an AM2-family course are alerted.',
    },
  ],
  source: 'NET survey, Electrical Times, 23 January 2026.',
};

const fmt = (iso: string | null) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : '';

type Filter = 'gaps' | 'all';

export default function CollegeAm2ExposurePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { collegeId } = useCollegeCan();
  const { data, loading, error, reload } = useCollegeAm2Exposure(collegeId);
  const [filter, setFilter] = useState<Filter>('gaps');
  const [weeks, setWeeks] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const rows = useMemo(
    () => (data?.learners ?? []).filter((l) => filter === 'all' || l.overdue_count > 0),
    [data, filter]
  );
  const withGaps = (data?.learners ?? []).filter((l) => l.overdue_count > 0).length;
  const total = data?.learners.length ?? 0;
  const currentWeeks = weeks ?? data?.weeks ?? 6;

  const saveWeeks = async () => {
    if (!collegeId || weeks == null) return;
    setSaving(true);
    try {
      await setCollegeExposureWeeks(collegeId, weeks);
      toast({ title: 'Saved', description: `Alerts after ${weeks} weeks with none.` });
      setWeeks(null);
      await reload();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="Assessment"
        title="AM2 practice on site"
        backTo="/college?section=assessment"
      />
      <HubBody pushContext="Get told when an apprentice goes weeks without fault finding or testing">
        <div className="space-y-6 sm:space-y-8">
          <CollegePageHeader
            eyebrow="AM2 readiness"
            title="AM2 practice on site"
            description={
              data
                ? `${withGaps} of ${total} learners have gone ${data.weeks} weeks without safe isolation, inspection and testing or fault finding on site.`
                : 'Safe isolation, inspection and testing and fault finding on site, per learner.'
            }
            help={HELP}
          />
          <HowItWorks help={HELP} />

          {loading && !data ? (
            <div className="flex min-h-[30vh] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : error || !data ? (
            <p className="text-[14px] text-white">Could not load. {error}</p>
          ) : (
            <>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex gap-2" role="tablist" aria-label="Show">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={filter === 'gaps'}
                    onClick={() => setFilter('gaps')}
                    className={chipCn(filter === 'gaps')}
                  >
                    With gaps ({withGaps})
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={filter === 'all'}
                    onClick={() => setFilter('all')}
                    className={chipCn(filter === 'all')}
                  >
                    Everyone ({total})
                  </button>
                </div>
                <div
                  className={cn(COLLEGE_CARD, 'lg:ml-auto lg:w-[420px]')}
                  data-testid="am2-exposure-weeks"
                >
                  <p className="text-[13px] font-semibold text-white">
                    Alert after weeks with none
                  </p>
                  <p className="mt-1 text-[12.5px] text-white">
                    The tutor and employer are told when an area has none on site for this long.
                  </p>
                  {data.can_set_weeks ? (
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Fewer weeks"
                        onClick={() => setWeeks(Math.max(2, currentWeeks - 1))}
                        className={cn(COLLEGE_BTN, 'w-11 px-0')}
                      >
                        −
                      </button>
                      <span
                        className="w-20 text-center font-mono text-[17px] font-bold tabular-nums text-white"
                        data-testid="am2-exposure-weeks-value"
                      >
                        {currentWeeks} wk
                      </span>
                      <button
                        type="button"
                        aria-label="More weeks"
                        onClick={() => setWeeks(Math.min(26, currentWeeks + 1))}
                        className={cn(COLLEGE_BTN, 'w-11 px-0')}
                      >
                        +
                      </button>
                      {weeks != null && weeks !== data.weeks && (
                        <button
                          type="button"
                          onClick={saveWeeks}
                          disabled={saving}
                          className={cn(COLLEGE_BTN, 'ml-auto border-elec-yellow')}
                        >
                          {saving ? 'Saving…' : 'Save'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 font-mono text-[17px] font-bold text-white">
                      {data.weeks} weeks
                    </p>
                  )}
                </div>
              </div>

              {rows.length === 0 ? (
                <div className={COLLEGE_CARD}>
                  <p className="text-[14px] text-white">
                    {filter === 'gaps'
                      ? 'No learner has a gap right now.'
                      : 'No learners with an Elec-Mate account yet.'}
                  </p>
                </div>
              ) : (
                <ul className={COLLEGE_LIST} data-testid="am2-exposure-list">
                  <li className="hidden px-6 py-2.5 lg:grid lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-4">
                    <span className="text-[13px] font-semibold text-white">Learner</span>
                    {EXPOSURE_AREAS.map((a) => (
                      <span key={a.key} className="text-[13px] font-semibold text-white">
                        {a.label} · NET {a.netTasks}
                      </span>
                    ))}
                  </li>
                  {rows.map((l) => (
                    <li key={l.student_id}>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/college?section=student360&studentId=${l.student_id}#epa`)
                        }
                        className={cn(
                          COLLEGE_ROW,
                          'grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-4'
                        )}
                        data-student={l.student_id}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-semibold text-white">
                            {l.name}
                          </span>
                          <span className="block truncate text-[12px] text-white">
                            {[l.cohort, l.employer].filter(Boolean).join(' · ') || 'No cohort'}
                          </span>
                        </span>
                        <span className="flex flex-wrap gap-1.5 lg:contents">
                          {EXPOSURE_AREAS.map((a) => {
                            const s = l.areas[a.key];
                            return (
                              <span
                                key={a.key}
                                className="flex items-center gap-1.5 lg:block"
                                data-area={a.key}
                              >
                                <span className="text-[12px] text-white lg:hidden">{a.short}</span>
                                <span
                                  className={lcChip(
                                    s.overdue ? 'action' : s.count > 0 ? 'done' : 'neutral'
                                  )}
                                >
                                  {s.count}{' '}
                                  {s.last_done
                                    ? `· ${fmt(s.last_done)}`
                                    : s.overdue
                                      ? '· none'
                                      : ''}
                                </span>
                              </span>
                            );
                          })}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[12px] text-white">
                Why these three:{' '}
                <a
                  href={NET_SURVEY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-elec-yellow underline underline-offset-2"
                >
                  NET&apos;s survey of first-time AM2 fails
                </a>
                .
              </p>
            </>
          )}
        </div>
      </HubBody>
    </HubPage>
  );
}
