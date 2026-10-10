import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import {
  useInspectionRehearsal,
  type Grade,
  type Rehearsal,
  type RehearsalScenario,
} from '@/hooks/useInspectionRehearsal';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { textareaCn } from '@/components/forms/fieldStyles';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { ChoiceGrid } from '@/components/college/quality/QualityChoices';
import {
  QBTN as COLLEGE_BTN,
  QBTN_PRIMARY as COLLEGE_BTN_PRIMARY,
  QCARD as COLLEGE_CARD,
  QLIST as COLLEGE_LIST,
  QualityHeader,
} from '@/components/college/quality/QualityHubKit';
import { plural } from '@/components/college/quality/qualityText';
import {
  BarList,
  ChartEmpty,
  StatusPill,
  TONE_BG,
  type Tone,
} from '@/components/college/quality/QualityKit';
import {
  AREA_GRADE_LABEL,
  LEGACY_JUDGEMENTS,
  NOT_ENOUGH_EVIDENCE,
  SAFEGUARDING_OUTCOMES,
  TOOLKIT_AREA_TITLE,
  TOOLKIT_AREAS,
  TOOLKIT_GRADE_SCALE,
  TOOLKIT_GUIDE_URL,
  type AreaGradeKey,
} from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   InspectionRehearsalPage — /college/compliance/rehearsal
   ELE-921 (G1). Practise inspection questioning with Mate as the inspector.

   ELE-2021: focuses are the evaluation areas of Ofsted's renewed framework
   (verified 7 Oct 2026,
   https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers),
   from ComplianceToolkit. The ai-inspection-rehearsal edge function grades
   each area it probed on the five-point scale (safeguarding met / not met)
   into area_grades; there is no overall grade. Rehearsals from before
   7 Oct 2026 keep their old focus and four-point verdict.
   ========================================================================== */

const SCENARIOS: RehearsalScenario[] = ['general', ...TOOLKIT_AREAS.map((a) => a.key)];

function scenarioLabel(k: string): string {
  if (k === 'general') return 'General inspection';
  return (TOOLKIT_AREA_TITLE as Record<string, string>)[k] ?? LEGACY_JUDGEMENTS[k]?.label ?? k;
}

const AREA_GRADE_TONE: Record<AreaGradeKey, Tone> = {
  exceptional: 'good',
  strong_standard: 'good',
  expected_standard: 'info',
  needs_attention: 'warn',
  urgent_improvement: 'bad',
  met: 'good',
  not_met: 'bad',
  not_enough_evidence: 'neutral',
};

const GRADE_TONE: Record<Grade, Tone> = { strong: 'good', adequate: 'warn', insufficient: 'bad' };
const GRADE_LABEL: Record<Grade, string> = {
  strong: 'Strong',
  adequate: 'Adequate',
  insufficient: 'Insufficient',
};

/** Rehearsals before ELE-2021 stored a four-point verdict; read it as saved. */
const LEGACY_VERDICT_TONE: Record<string, Tone> = {
  outstanding: 'good',
  good: 'good',
  requires_improvement: 'warn',
  inadequate: 'bad',
};
const verdictTone = (v: string | null | undefined): Tone =>
  (v && ((AREA_GRADE_TONE as Record<string, Tone>)[v] ?? LEGACY_VERDICT_TONE[v])) || 'neutral';
const verdictLabel = (v: string | null | undefined) =>
  v
    ? ((AREA_GRADE_LABEL as Record<string, string>)[v] ??
      v.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()))
    : 'No verdict';

const HELP: PageHelpContent = {
  id: 'college-inspection-rehearsal',
  title: 'Practice inspection',
  what: 'A safe place to practise the questions an inspector asks. Mate plays the lead inspector, asks one probing question at a time using your college’s real figures, and grades each answer.',
  steps: [
    {
      title: 'Pick a focus',
      body: 'Choose a general inspection or one of Ofsted’s evaluation areas, such as safeguarding or achievement.',
    },
    {
      title: 'Answer as you would on the day',
      body: 'Use real examples and name the evidence. Each answer is graded strong, adequate or insufficient, with feedback.',
    },
    {
      title: 'Finish for a verdict',
      body: 'Each area you were asked about gets the grade your answers would most likely support, with a reason, plus strengths and weaknesses for your improvement plan.',
    },
  ],
  notes: [
    {
      title: 'How it grades',
      body: 'Ofsted’s renewed framework grades evaluation areas on five points: exceptional, strong standard, expected standard, needs attention, urgent improvement. Safeguarding is met or not met, and there is no overall grade. The rehearsal grades only the areas it asked about. It is practice, not a prediction.',
    },
    {
      title: 'Who sees it',
      body: 'You can see your own rehearsals. Admins and heads of department at your college can also read them; other tutors cannot.',
    },
  ],
  legend: [
    { swatch: TONE_BG.good, label: 'Strong answer' },
    { swatch: TONE_BG.warn, label: 'Adequate answer' },
    { swatch: TONE_BG.bad, label: 'Insufficient answer' },
  ],
  source: (
    <>
      Ofsted’s further education and skills inspection toolkit:{' '}
      <a className="underline" href={TOOLKIT_GUIDE_URL} target="_blank" rel="noreferrer">
        gov.uk
      </a>
      .
    </>
  ),
};

export default function InspectionRehearsalPage() {
  useSEO({
    title: 'Inspection Rehearsal — College Hub',
    description: 'Practise Ofsted questions with Mate as the inspector.',
    noindex: true,
  });

  const { rehearsal, history, busy, error, start, respond, finish } = useInspectionRehearsal();
  const [scenario, setScenario] = useState<RehearsalScenario>('general');
  const [draft, setDraft] = useState('');
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: 'smooth' });
  }, [rehearsal?.turns?.length]);

  const handleStart = async () => {
    try {
      await start(scenario);
    } catch {
      /* error captured in hook */
    }
  };

  const handleSend = async () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setDraft('');
    try {
      await respond(text);
    } catch {
      /* error captured in hook */
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Practice inspection" backTo="/college/compliance" />
      <HubBody pushContext="Get notified about compliance and inspection readiness">
        <QualityHeader
          eyebrow="Practice inspection"
          title="Inspection rehearsal"
          summary="Practise the questions an inspector asks. Mate plays the lead inspector, grades each answer and gives you strengths and weaknesses at the end."
          sub={`${history.length === 0 ? 'No rehearsals yet.' : `${plural(history.length, 'rehearsal')} so far.`} Practice only, private to you, and not a prediction of a grade.`}
          help={HELP}
        />

        {error && (
          <div className={cn(COLLEGE_CARD, '!border-orange-400/50 text-[13.5px] text-white')}>
            {error}
          </div>
        )}

        {!rehearsal ? (
          <StartPanel
            scenario={scenario}
            setScenario={setScenario}
            busy={busy}
            onStart={handleStart}
            history={history}
          />
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <motion.section
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="-mx-4 overflow-hidden max-sm:!rounded-none max-sm:!border-x-0 border-y border-white/[0.08] card-surface sm:mx-0 sm:rounded-2xl sm:border"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="text-[12px] text-white">Focus</p>
                  <p className="truncate text-[15px] font-semibold text-white">
                    {scenarioLabel(rehearsal.scenario)}
                  </p>
                </div>
                <StatusPill tone={rehearsal.status === 'complete' ? 'good' : 'volt'}>
                  {rehearsal.status === 'complete'
                    ? 'Complete'
                    : rehearsal.status === 'active'
                      ? 'In progress'
                      : 'Stopped'}
                </StatusPill>
              </div>

              <div
                ref={scrollerRef}
                className="max-h-[60vh] space-y-3 overflow-y-auto px-5 py-4 sm:px-6"
              >
                {rehearsal.turns.map((t, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-2xl border px-4 py-3',
                      t.role === 'inspector'
                        ? 'border-white/[0.1] bg-black/30'
                        : 'ml-6 border-white/[0.18] bg-white/[0.06] sm:ml-12'
                    )}
                  >
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                      {t.role === 'inspector' ? 'Inspector' : 'You'}
                      {t.grade && (
                        <StatusPill tone={GRADE_TONE[t.grade]}>{GRADE_LABEL[t.grade]}</StatusPill>
                      )}
                    </div>
                    <p className="mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-white">
                      {t.content}
                    </p>
                    {t.feedback && (
                      <p className="mt-2 rounded-xl bg-black/30 px-3 py-2 text-[12.5px] leading-snug text-white">
                        <span className="font-semibold">Feedback: </span>
                        {t.feedback}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {rehearsal.status === 'active' ? (
                <div className="border-t border-white/[0.06] p-5 sm:p-6">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type your answer as you would say it on the day"
                    rows={3}
                    className={textareaCn}
                  />
                  <div className="mt-3 flex flex-wrap justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => finish()}
                      disabled={busy}
                      className={COLLEGE_BTN}
                    >
                      Finish and get verdict
                    </button>
                    <button
                      type="button"
                      onClick={handleSend}
                      disabled={busy || !draft.trim()}
                      className={COLLEGE_BTN_PRIMARY}
                    >
                      {busy ? 'Sending…' : 'Send answer'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 border-t border-white/[0.06] p-5 sm:p-6">
                  {rehearsal.area_grades?.length ? (
                    <div className="space-y-3">
                      <p className="text-[13.5px] leading-relaxed text-white">
                        {rehearsal.verdict_summary}
                      </p>
                      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {rehearsal.area_grades.map((g) => (
                          <li
                            key={g.area}
                            className="rounded-2xl border border-white/[0.08] px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[13.5px] font-semibold text-white">
                                {scenarioLabel(g.area)}
                              </span>
                              <StatusPill tone={verdictTone(g.grade)}>
                                {verdictLabel(g.grade)}
                              </StatusPill>
                            </div>
                            {g.reason && (
                              <p className="mt-1 text-[12.5px] leading-snug text-white">
                                {g.reason}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusPill tone={verdictTone(rehearsal.overall_verdict)}>
                        {verdictLabel(rehearsal.overall_verdict)}
                      </StatusPill>
                      <span className="text-[13.5px] text-white">{rehearsal.verdict_summary}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Bullets
                      title="Strengths"
                      items={rehearsal.strengths ?? []}
                      dot="bg-emerald-400"
                    />
                    <Bullets
                      title="Weaknesses"
                      items={rehearsal.weaknesses ?? []}
                      dot="bg-orange-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className={COLLEGE_BTN_PRIMARY}
                  >
                    Start another rehearsal
                  </button>
                </div>
              )}
            </motion.section>

            <aside className="space-y-4">
              <AnswerChart rehearsal={rehearsal} />
              <FrameworkNote />
            </aside>
          </div>
        )}
      </HubBody>
    </HubPage>
  );
}

function StartPanel({
  scenario,
  setScenario,
  busy,
  onStart,
  history,
}: {
  scenario: RehearsalScenario;
  setScenario: (s: RehearsalScenario) => void;
  busy: boolean;
  onStart: () => void;
  history: Rehearsal[];
}) {
  // Every area grade across finished rehearsals (older ones have none).
  const areaGrades = history.flatMap((h) => h.area_grades ?? []);
  const gCount = (k: AreaGradeKey) => areaGrades.filter((g) => g.grade === k).length;
  const gradeRows = [
    ...TOOLKIT_GRADE_SCALE.map((g) => ({ key: g.key as AreaGradeKey, label: g.label })),
    ...SAFEGUARDING_OUTCOMES.map((o) => ({
      key: o.key as AreaGradeKey,
      label: `Safeguarding ${o.label.toLowerCase()}`,
    })),
    { key: NOT_ENOUGH_EVIDENCE.key as AreaGradeKey, label: NOT_ENOUGH_EVIDENCE.label },
  ]
    .map((r) => ({ label: r.label, n: gCount(r.key), tone: AREA_GRADE_TONE[r.key] }))
    .filter((r) => r.n > 0);
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className={cn(COLLEGE_CARD, 'h-full')}
      >
        <h2 className="text-[17px] font-semibold text-white">Start a rehearsal</h2>
        <p className="mt-1 text-[13.5px] text-white">
          Pick a focus. The inspector asks one evidence-led question at a time, using your college’s
          live figures.
        </p>
        <ChoiceGrid<RehearsalScenario>
          className="mt-4 lg:grid-cols-2"
          label="Rehearsal focus"
          options={SCENARIOS.map((k) => ({ key: k, label: scenarioLabel(k) }))}
          selected={scenario}
          onToggle={setScenario}
        />
        <button
          type="button"
          onClick={onStart}
          disabled={busy}
          className={cn(COLLEGE_BTN_PRIMARY, 'mt-5 w-full sm:w-auto')}
        >
          {busy ? 'Briefing the inspector…' : 'Start rehearsal'}
        </button>
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <FrameworkNote bare />
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className={cn(COLLEGE_CARD, 'h-full')}
      >
        <h2 className="text-[15px] font-semibold text-white">Your area grades</h2>
        <p className="mt-0.5 text-[12.5px] text-white">
          {history.length ? `${plural(history.length, 'rehearsal')} so far` : 'None yet'}
        </p>
        <div className="mt-4">
          {gradeRows.length === 0 ? (
            <ChartEmpty text="Finish a rehearsal to see the grades your answers earned, area by area." />
          ) : (
            <BarList rows={gradeRows} />
          )}
        </div>
      </motion.section>

      {history.length > 0 && (
        <section className="space-y-4 lg:col-span-2">
          <CollegeSectionTitle title="Recent rehearsals" />
          <ul className={COLLEGE_LIST}>
            {history.slice(0, 8).map((h) => (
              <li key={h.id} className="flex min-h-[60px] items-center gap-3 px-4 py-3 sm:px-5">
                <span className="min-w-0 flex-1">
                  <span className="block line-clamp-2 text-[14px] sm:truncate font-medium text-white">
                    {scenarioLabel(h.scenario)}
                  </span>
                  <span className="block text-[12px] text-white">
                    {new Date(h.created_at).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {plural(h.turns.filter((t) => t.role === 'tutor').length, 'answer')}
                  </span>
                </span>
                {h.overall_verdict ? (
                  <StatusPill tone={verdictTone(h.overall_verdict)}>
                    {verdictLabel(h.overall_verdict)}
                  </StatusPill>
                ) : h.area_grades?.length ? (
                  <StatusPill tone="info">{`${h.area_grades.length} ${h.area_grades.length === 1 ? 'area' : 'areas'} graded`}</StatusPill>
                ) : (
                  <StatusPill>{h.status === 'active' ? 'Not finished' : 'Stopped'}</StatusPill>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function AnswerChart({ rehearsal }: { rehearsal: Rehearsal }) {
  const graded = rehearsal.turns.filter((t) => t.grade);
  const n = (g: Grade) => graded.filter((t) => t.grade === g).length;
  return (
    <div className={COLLEGE_CARD}>
      <h2 className="text-[15px] font-semibold text-white">Your answers</h2>
      <p className="mt-0.5 text-[12.5px] text-white">
        {graded.length
          ? `${graded.length} graded so far`
          : 'Answer the first question to see your grades.'}
      </p>
      {graded.length > 0 && (
        <div className="mt-4">
          <BarList
            rows={[
              { label: 'Strong', n: n('strong'), tone: 'good' },
              { label: 'Adequate', n: n('adequate'), tone: 'warn' },
              { label: 'Insufficient', n: n('insufficient'), tone: 'bad' },
            ]}
          />
        </div>
      )}
    </div>
  );
}

function FrameworkNote({ bare = false }: { bare?: boolean }) {
  const body = (
    <>
      <p className="text-[13.5px] font-semibold text-white">Ofsted’s areas from November 2025</p>
      <p className="mt-1 text-[12.5px] leading-snug text-white">
        The inspector asks about these areas and grades each one it probes: met or not met for
        safeguarding, five grades from exceptional to urgent improvement for the rest. No overall
        grade. Practice only, not a prediction.
      </p>
      {/* The areas are the focus choices above; only list them when those are not shown. */}
      {!bare && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TOOLKIT_AREAS.map((a) => (
            <span
              key={a.key}
              className="rounded-full border border-white/[0.12] bg-white/[0.06] px-2.5 py-0.5 text-[12px] text-white"
            >
              {a.title}
            </span>
          ))}
        </div>
      )}
    </>
  );
  return bare ? body : <div className={COLLEGE_CARD}>{body}</div>;
}

function Bullets({ title, items, dot }: { title: string; items: string[]; dot: string }) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-white">{title}</p>
      {items.length === 0 ? (
        <p className="mt-2 text-[13px] text-white">None listed.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {items.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-snug text-white">
              <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', dot)} aria-hidden />
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
