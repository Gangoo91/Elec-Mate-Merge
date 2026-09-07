import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useStudentEpa } from '@/hooks/useStudentEpa';
import { useEpaReadiness, type EpaJudgement, type EpaSource } from '@/hooks/useEpaReadiness';
import { TutorEpaJudgementSheet } from '@/components/college/sheets/TutorEpaJudgementSheet';
import { AiEpaReadinessSheet } from '@/components/college/sheets/AiEpaReadinessSheet';
import { AiSignalsInspectorSheet } from '@/components/college/sheets/AiSignalsInspectorSheet';
import { RecordEpaOutcomeSheet } from '@/components/college/sheets/RecordEpaOutcomeSheet';
import { EpaBriefSheet } from '@/components/college/sheets/EpaBriefSheet';
import { MockGradingSheet } from '@/components/college/sheets/MockGradingSheet';
import { EpaReadinessGauge } from '@/components/college/student360/EpaReadinessGauge';
import { EpaVerdictHistory } from '@/components/college/student360/EpaVerdictHistory';
import { EpaCalibrationCard } from '@/components/college/student360/EpaCalibrationCard';
import { useEpaCohortContext } from '@/hooks/useEpaCohortContext';

/* ==========================================================================
   SectionEpaReadiness — tri-perspective EPA panel.

   Learner self-assessment / tutor judgement / AI verdict on one readiness
   gauge, then the three verdicts side by side, then the AI's gap analysis,
   the gateway checklist and the mock-session record.

   Rebuilt on the hub design language (CARD_SURFACE cards, HubSectionHeading,
   everything text-white). The old header carried five actions in a row —
   one volt pill and four grey links — which on a phone wrapped into a
   three-line tangle above a 26px headline. The heading now carries the two
   actions a tutor reaches for (their own verdict, the AI's); the rest live
   as rows in a small action list at the foot of the section, where each one
   has a full-width 44px target and a line saying what it does.
   ========================================================================== */

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const CARD_HEAD =
  'flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5';
const CARD_TITLE = 'text-[13px] font-semibold text-white';
const TEXT_BTN =
  'inline-flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold transition-colors touch-manipulation';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const GATEWAY_LABELS: {
  key: keyof NonNullable<ReturnType<typeof useStudentEpa>['checklist']>;
  label: string;
}[] = [
  { key: 'portfolio_complete', label: 'Portfolio complete' },
  { key: 'portfolio_signed_off', label: 'Portfolio signed off' },
  { key: 'ojt_hours_verified', label: 'OTJ hours verified' },
  { key: 'english_level2_achieved', label: 'English Level 2' },
  { key: 'maths_level2_achieved', label: 'Maths Level 2' },
  { key: 'employer_satisfied', label: 'Employer declaration' },
  { key: 'provider_satisfied', label: 'Provider declaration' },
];

export function SectionEpaReadiness({
  id,
  studentName,
  userId,
  collegeStudentId,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  collegeStudentId: string | null;
}) {
  const navigate = useNavigate();
  const epa = useStudentEpa(userId, collegeStudentId);
  const judge = useEpaReadiness({ collegeStudentId, userId });
  const cohortCtx = useEpaCohortContext({ collegeStudentId });

  const [aiOpen, setAiOpen] = useState(false);
  const [signalsOpen, setSignalsOpen] = useState(false);
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [mockOpen, setMockOpen] = useState(false);
  const [tutorSheet, setTutorSheet] = useState<
    null | { mode: 'create' | 'edit' } | { mode: 'cosign' | 'override'; aiTarget: EpaJudgement }
  >(null);

  // Mock-derived "learner self-assessment" — use latest mock if no formal submission yet.
  const inferredLearner = useMemo(() => {
    if (judge.learner) return judge.learner;
    const m = judge.mocks[0];
    if (!m) return null;
    return {
      __synthetic: true as const,
      verdict: (m.predicted_grade === 'fail'
        ? 'not_yet'
        : m.overall_score && m.overall_score >= 75
          ? 'ready'
          : 'almost') as EpaJudgement['verdict'],
      predicted_grade: (m.predicted_grade as EpaJudgement['predicted_grade']) ?? null,
      confidence: m.overall_score ?? null,
      created_at: m.completed_at ?? null,
    };
  }, [judge.learner, judge.mocks]);

  // Best / latest / move across the learner's scored mocks — gives the tutor
  // the trajectory at a glance, not just the latest-mock inference. mocks are
  // newest-first; null scores (e.g. unscored discussions) are excluded.
  const mockTrend = useMemo(() => {
    const scored = judge.mocks.filter((m) => m.overall_score != null);
    if (scored.length === 0) return null;
    const score = (m: (typeof scored)[number]) => m.overall_score as number;
    const latest = scored[0];
    const best = scored.reduce((b, x) => (score(x) > score(b) ? x : b), scored[0]);
    const delta = scored[1] ? score(latest) - score(scored[1]) : null;
    return {
      latest: score(latest),
      best: score(best),
      bestGrade: best.predicted_grade,
      delta,
      count: scored.length,
    };
  }, [judge.mocks]);

  const firstName = studentName.split(' ')[0];
  const mockCount = judge.mocks.length;
  const mockWord = `${mockCount} session${mockCount === 1 ? '' : 's'}`;

  if (!collegeStudentId) {
    return (
      <section id={id} className="scroll-mt-6 space-y-3">
        <HubSectionHeading>EPA readiness</HubSectionHeading>
        <div className={cn(CARD, 'px-4 py-6 sm:px-5')}>
          <p className="text-[13px] leading-relaxed text-white">
            No EPA record is linked to this learner yet.
          </p>
        </div>
      </section>
    );
  }

  const ai = judge.ai;
  const checklist = epa.checklist;
  const canRecordOutcome = !!(judge.ai || judge.tutor || judge.learner);

  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      {/* Heading + the two actions a tutor actually reaches for. */}
      <div className="flex items-end justify-between gap-3">
        <HubSectionHeading>EPA readiness</HubSectionHeading>
        <div className="no-print -my-2 -mr-2 flex items-center">
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className={cn(TEXT_BTN, 'text-white')}
          >
            {ai ? 'Re-run AI' : 'AI verdict'}
          </button>
          <button
            type="button"
            onClick={() => setTutorSheet({ mode: judge.tutor ? 'edit' : 'create' })}
            className={cn(TEXT_BTN, 'text-elec-yellow')}
          >
            {judge.tutor ? 'Update verdict' : 'Tutor verdict'}
          </button>
        </div>
      </div>

      {/* Unified readiness gauge. The agreement line lives inside it — the
          old banner was a separate tinted card restating what the gauge shows. */}
      <EpaReadinessGauge
        headline={judge.agreement.headline}
        outlier={judge.agreement.outlier_source}
        consensus={judge.agreement.full_consensus}
        cohort={{
          percentileLabel: cohortCtx.percentileLabel,
          cohortSize: cohortCtx.cohortSize,
          trajectory: cohortCtx.trajectory,
        }}
        voices={[
          {
            source: 'learner',
            judgement:
              judge.learner ??
              (inferredLearner
                ? {
                    verdict: inferredLearner.verdict,
                    predicted_grade: inferredLearner.predicted_grade,
                    confidence: inferredLearner.confidence,
                    source_name_snapshot: studentName,
                  }
                : null),
            synthetic: !judge.learner && !!inferredLearner,
            subtitle: judge.learner
              ? 'Submitted as self-assessment'
              : inferredLearner
                ? `Inferred from latest mock (${mockWord})`
                : `${firstName} hasn't run the simulator yet`,
          },
          {
            source: 'tutor',
            judgement: judge.tutor,
            subtitle: judge.tutor
              ? `${judge.tutor.source_name_snapshot ?? 'Tutor'} · ${formatDate(judge.tutor.created_at)}${judge.tutor.cosign_kind === 'cosigned' ? ' · co-signed AI' : judge.tutor.cosign_kind === 'overridden' ? ' · overrode AI' : ''}`
              : 'No tutor verdict yet',
          },
          {
            source: 'ai',
            judgement: judge.ai,
            subtitle: judge.ai
              ? `${judge.ai.source_name_snapshot ?? 'AI'} · ${formatDate(judge.ai.created_at)}`
              : 'No AI verdict yet',
          },
        ]}
      />

      {/* Tri-pane verdicts */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <VerdictColumn
          source="learner"
          judgement={
            judge.learner ??
            (inferredLearner
              ? ({
                  verdict: inferredLearner.verdict,
                  predicted_grade: inferredLearner.predicted_grade,
                  confidence: inferredLearner.confidence,
                  source_name_snapshot: studentName,
                  created_at: inferredLearner.created_at,
                } as Partial<EpaJudgement>)
              : null)
          }
          draft={!judge.learner && !!inferredLearner}
          subtitle={
            judge.learner
              ? 'Submitted as self-assessment'
              : inferredLearner
                ? `From latest mock (${mockWord})`
                : 'No simulator runs yet'
          }
          empty={
            !judge.learner && !inferredLearner
              ? `${firstName} hasn't run the EPA simulator yet.`
              : null
          }
        />
        <VerdictColumn
          source="tutor"
          judgement={judge.tutor}
          subtitle={
            judge.tutor
              ? `${judge.tutor.source_name_snapshot ?? 'Tutor'} · ${formatDate(judge.tutor.created_at)}${judge.tutor.cosign_kind === 'cosigned' ? ' · co-signed AI' : judge.tutor.cosign_kind === 'overridden' ? ' · overrode AI' : ''}`
              : 'Your own judgement of readiness'
          }
          empty={!judge.tutor ? 'No tutor verdict recorded.' : null}
          action={
            judge.tutor
              ? { label: 'Update', onClick: () => setTutorSheet({ mode: 'edit' }) }
              : { label: 'Record verdict', onClick: () => setTutorSheet({ mode: 'create' }) }
          }
        />
        <VerdictColumn
          source="ai"
          judgement={judge.ai}
          subtitle={
            judge.ai
              ? `${judge.ai.source_name_snapshot ?? 'AI'} · ${formatDate(judge.ai.created_at)}`
              : 'Generated from cross-hub data'
          }
          empty={!judge.ai ? 'No AI verdict generated yet.' : null}
          action={
            judge.ai
              ? { label: 'Re-run', onClick: () => setAiOpen(true) }
              : { label: 'Generate', onClick: () => setAiOpen(true) }
          }
          extra={
            ai ? (
              <div className="-mb-2 mt-1 flex flex-wrap items-center gap-x-1">
                {judge.tutor == null && (
                  <>
                    <button
                      type="button"
                      onClick={() => setTutorSheet({ mode: 'cosign', aiTarget: ai })}
                      className={cn(TEXT_BTN, '-ml-2 text-white')}
                    >
                      Co-sign
                    </button>
                    <button
                      type="button"
                      onClick={() => setTutorSheet({ mode: 'override', aiTarget: ai })}
                      className={cn(TEXT_BTN, 'text-white')}
                    >
                      Override
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setSignalsOpen(true)}
                  className={cn(TEXT_BTN, judge.tutor != null && '-ml-2', 'text-white')}
                >
                  What did the AI see?
                </button>
              </div>
            ) : null
          }
        />
      </div>

      {/* AI citation-grade gaps */}
      {ai && ai.blockers && ai.blockers.length > 0 && (
        <div className={CARD}>
          <div className={CARD_HEAD}>
            <div className={CARD_TITLE}>AI gap analysis</div>
            <div className="text-[12px] tabular-nums text-white">
              {ai.citations?.length ?? 0} citation
              {(ai.citations?.length ?? 0) === 1 ? '' : 's'}
            </div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {ai.blockers.map((b, i) => {
              const matched = (ai.citations ?? []).filter((c) =>
                b
                  .toLowerCase()
                  .includes((c.applies_to ?? '').toLowerCase().split(' ').slice(0, 3).join(' '))
              );
              return (
                <li key={i} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 h-8 w-[3px] shrink-0 rounded-full bg-elec-yellow"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] leading-snug text-white">{b}</p>
                    {matched.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {matched.map((c, j) => (
                          <span
                            key={j}
                            title={c.snippet}
                            className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[10.5px] font-semibold tabular-nums text-white"
                          >
                            BS 7671 {c.ref}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {ai.citations && ai.citations.length > 0 && (
            <div className="border-t border-white/[0.10] px-4 py-3 sm:px-5">
              <div className="mb-1.5 text-[12px] font-semibold text-white">All citations</div>
              <ul className="space-y-1.5">
                {ai.citations.map((c, i) => (
                  <li key={i} className="text-[12px] leading-snug text-white">
                    <span className="font-semibold tabular-nums">{c.ref}</span>
                    {c.snippet && <span> — {c.snippet}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Gateway checklist */}
      {checklist && (
        <div className={CARD}>
          <div className={CARD_HEAD}>
            <div className={CARD_TITLE}>Gateway checklist</div>
            <div className="text-[12px] tabular-nums text-white">
              {GATEWAY_LABELS.filter(({ key }) => Boolean(checklist[key])).length}/
              {GATEWAY_LABELS.length} done
            </div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {GATEWAY_LABELS.map(({ key, label }) => {
              const complete = Boolean(checklist[key]);
              const hours =
                key === 'ojt_hours_verified' && checklist.ojt_hours_required != null
                  ? `${Math.round(checklist.ojt_hours_completed ?? 0)}h / ${Math.round(checklist.ojt_hours_required)}h`
                  : null;
              return (
                <li key={String(key)} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      complete ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <div className="min-w-0 flex-1 text-[13px] text-white">{label}</div>
                  {hours && <div className="text-[12px] tabular-nums text-white">{hours}</div>}
                  <span
                    className={cn(
                      'w-14 shrink-0 text-right text-[12px] font-semibold',
                      complete ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {complete ? 'Done' : 'Not yet'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Mock sessions — combined AI simulator runs + tutor-recorded mocks */}
      <div className={CARD}>
        <div className={cn(CARD_HEAD, 'py-1.5')}>
          <div className={CARD_TITLE}>
            Mock sessions
            <span className="ml-2 font-normal tabular-nums">{mockWord}</span>
          </div>
          <button
            type="button"
            onClick={() => setMockOpen(true)}
            disabled={!userId}
            title={userId ? undefined : 'Needs a linked apprentice account'}
            className={cn(TEXT_BTN, '-mr-2', userId ? 'text-elec-yellow' : 'text-white opacity-50')}
          >
            Record mock
          </button>
        </div>
        {mockCount === 0 ? (
          <div className="px-4 py-5 text-[12.5px] leading-snug text-white sm:px-5">
            No mock sessions yet. Record a tutor-led mock (portfolio walkthrough, professional
            discussion, practical or knowledge review) to start tracking dry-run performance.
          </div>
        ) : (
          <>
            {mockTrend && (
              <div className="grid grid-cols-3 gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
                <MockStat
                  label="Best"
                  value={`${mockTrend.best}%`}
                  sub={mockTrend.bestGrade}
                  accent
                />
                <MockStat
                  label="Latest"
                  value={`${mockTrend.latest}%`}
                  sub={
                    mockTrend.delta === null
                      ? null
                      : mockTrend.delta > 0
                        ? `up ${mockTrend.delta}`
                        : mockTrend.delta < 0
                          ? `down ${Math.abs(mockTrend.delta)}`
                          : 'no change'
                  }
                  subTone={mockTrend.delta !== null && mockTrend.delta < 0 ? 'bad' : 'neutral'}
                />
                <MockStat label="Scored runs" value={String(mockTrend.count)} sub={null} />
              </div>
            )}
            <ul className="divide-y divide-white/[0.10]">
              {judge.mocks.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] capitalize leading-tight text-white">
                      {m.session_type.replace(/_/g, ' ')}
                      {m.predicted_grade && (
                        <span className="ml-2 text-[12px] font-semibold capitalize text-elec-yellow">
                          {m.predicted_grade}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[12px] tabular-nums leading-tight text-white">
                      {formatDate(m.completed_at)}
                    </div>
                  </div>
                  {m.overall_score != null && (
                    <div className="text-[14px] font-semibold tabular-nums text-white">
                      {m.overall_score}%
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Verdict history timeline */}
      <EpaVerdictHistory
        current={{ learner: judge.learner, tutor: judge.tutor, ai: judge.ai }}
        past={judge.history}
      />

      {/* Calibration card */}
      <EpaCalibrationCard collegeId={null} />

      {/* The remaining tutor actions, as rows — each a 44px target with a
          line saying what it does, rather than four grey links in a header. */}
      <div className={cn(CARD, 'no-print')}>
        <ul className="divide-y divide-white/[0.10]">
          <ActionRow
            title="Pre-EPA brief"
            reason={`A personalised briefing ${firstName} can read before the assessment`}
            onClick={() => setBriefOpen(true)}
          />
          {canRecordOutcome && (
            <ActionRow
              title="Record EPA outcome"
              reason="Seal the actual grade against every verdict on record"
              onClick={() => setOutcomeOpen(true)}
            />
          )}
          <ActionRow
            title="View cohort"
            reason="Where this learner sits against the rest of the group"
            onClick={() => navigate('/college/epa')}
          />
        </ul>
      </div>

      {/* Sheets */}
      <AiEpaReadinessSheet
        open={aiOpen}
        onOpenChange={setAiOpen}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
        onSaved={() => judge.refresh()}
      />
      <AiSignalsInspectorSheet
        open={signalsOpen}
        onOpenChange={setSignalsOpen}
        judgement={judge.ai}
      />
      <RecordEpaOutcomeSheet
        open={outcomeOpen}
        onOpenChange={setOutcomeOpen}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
        current={{ learner: judge.learner, tutor: judge.tutor, ai: judge.ai }}
        onSaved={() => judge.refresh()}
      />
      <EpaBriefSheet
        open={briefOpen}
        onOpenChange={setBriefOpen}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
      />
      <MockGradingSheet
        open={mockOpen}
        onOpenChange={setMockOpen}
        userId={userId}
        studentName={studentName}
        qualificationCode={epa.latestSnapshot?.qualification_code ?? null}
        onSaved={() => {
          void epa.refresh();
          void judge.refresh();
        }}
      />
      <TutorEpaJudgementSheet
        open={tutorSheet !== null}
        onOpenChange={(o) => {
          if (!o) setTutorSheet(null);
        }}
        studentName={studentName}
        hookActions={{
          saveTutorJudgement: judge.saveTutorJudgement,
          cosignAi: judge.cosignAi,
          overrideAi: judge.overrideAi,
        }}
        existing={tutorSheet?.mode === 'edit' ? judge.tutor : null}
        aiTarget={
          tutorSheet?.mode === 'cosign' || tutorSheet?.mode === 'override'
            ? tutorSheet.aiTarget
            : null
        }
        mode={tutorSheet?.mode ?? 'create'}
        onSaved={() => judge.refresh()}
      />
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   Small parts
   ──────────────────────────────────────────────────────── */

function MockStat({
  label,
  value,
  sub,
  subTone = 'neutral',
  accent = false,
}: {
  label: string;
  value: string;
  sub: string | null | undefined;
  subTone?: 'neutral' | 'bad';
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-medium text-white">{label}</span>
      <span
        className={cn(
          'text-[18px] font-semibold leading-none tabular-nums',
          accent ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </span>
      {sub && (
        <span
          className={cn(
            'text-[11px] font-medium capitalize tabular-nums',
            subTone === 'bad' ? 'text-red-300' : 'text-white'
          )}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

function ActionRow({
  title,
  reason,
  onClick,
}: {
  title: string;
  reason: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

/* ────────────────────────────────────────────────────────
   Verdict column
   ──────────────────────────────────────────────────────── */

const SOURCE_LABEL: Record<EpaSource, string> = {
  learner: 'Learner',
  tutor: 'Tutor',
  ai: 'AI',
  employer: 'Employer',
};

const VERDICT_LABEL: Record<string, string> = {
  ready: 'Ready',
  almost: 'Almost',
  not_yet: 'Not yet',
  refer: 'Refer',
};

function VerdictColumn({
  source,
  judgement,
  draft = false,
  subtitle,
  empty,
  action,
  extra,
}: {
  source: EpaSource;
  judgement: EpaJudgement | Partial<EpaJudgement> | null;
  /** Inferred from a mock rather than submitted — say so, and don't dress it up. */
  draft?: boolean;
  subtitle?: string;
  empty?: string | null;
  action?: { label: string; onClick: () => void };
  extra?: React.ReactNode;
}) {
  const verdict = judgement?.verdict;
  const grade = judgement?.predicted_grade;
  const conf = judgement?.confidence ?? null;

  return (
    <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
      <div className="flex items-center justify-between gap-2">
        <div className={CARD_TITLE}>{SOURCE_LABEL[source]}</div>
        {draft && (
          <span className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[10.5px] font-semibold text-white">
            Inferred
          </span>
        )}
      </div>
      {verdict ? (
        <>
          <div className="mt-2 flex items-baseline gap-2">
            {/* Refer is the one verdict that is a genuine problem; the rest
                are positions on a scale and read in white. */}
            <span
              className={cn(
                'text-[22px] font-semibold leading-none tracking-tight',
                verdict === 'refer' ? 'text-red-300' : 'text-white'
              )}
            >
              {VERDICT_LABEL[verdict] ?? verdict}
            </span>
            {grade && (
              <span className="text-[13px] font-semibold capitalize text-elec-yellow">{grade}</span>
            )}
          </div>
          {conf != null && (
            <div className="mt-2 flex items-center gap-2 text-[12px] text-white">
              <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-white/[0.10]">
                <div className="h-full rounded-full bg-white" style={{ width: `${conf}%` }} />
              </div>
              <span className="tabular-nums">{conf}% confident</span>
            </div>
          )}
        </>
      ) : (
        <p className="mt-2 text-[12.5px] leading-snug text-white">{empty ?? 'No verdict.'}</p>
      )}
      {subtitle && <p className="mt-2 text-[12px] leading-snug text-white">{subtitle}</p>}
      {judgement?.rationale && (
        <p className="mt-3 line-clamp-4 text-[12.5px] leading-relaxed text-white">
          {judgement.rationale}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(TEXT_BTN, '-mb-2 -ml-2 mt-1 text-elec-yellow')}
        >
          {action.label}
        </button>
      )}
      {extra}
    </div>
  );
}
