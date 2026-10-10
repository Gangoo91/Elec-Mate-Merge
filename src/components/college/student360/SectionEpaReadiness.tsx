import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { BehaviourVerificationCard } from './BehaviourVerificationCard';
import { COLLEGE_BTN, CollegeHeading } from '@/components/college/ui/CollegeUi';
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
import { ActionsList } from '@/components/college/sheets/AiEpaReadinessSheet';
import {
  aiNeedsSignOff,
  effectiveVerdict,
  useLearnerEpaReadinessModel,
} from '@/hooks/college/epaReadinessModels';
import { EPA_STATUS_LABEL, type EpaReadinessModel } from '@/lib/epa/readiness';
import { verdictForMockScore } from '@/lib/epa/grading';
import { UsesAi } from '@/components/college/ui/UsesAi';
import { GatewayGateCard } from '@/components/epa/GatewayGateCard';
import type { GateLink } from '@/hooks/epa/useGatewayReadiness';
import { FormSheet } from '@/components/forms/FormSheet';
import EPAGatewayChecklist from '@/components/college/portfolio/EPAGatewayChecklist';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';
import { supabase } from '@/integrations/supabase/client';
import { Am2TaskReadiness } from '@/components/epa/Am2TaskReadiness';
import { ElectricalEpaPanel } from '@/components/epa/ElectricalEpaPanel';
import { routeForPlan, usePlanVersion } from '@/hooks/epa/useElectricalEpa';

/* ==========================================================================
   SectionEpaReadiness — EPA readiness for one learner.

   6 Oct 2026: leads with the SAME readiness model the learner sees
   (src/lib/epa/readiness.ts — their route, AM2 practice by section, portfolio
   on their own qualification's ACs, sign-off items), shown whether or not a
   gateway row exists. The three voices follow as opinions. The AI sheet
   opens on the existing verdict; its actions sit in the section. Co-sign /
   override appear whenever the AI verdict is newer than the tutor's.

   Then the three verdicts side by side, the AI's gap analysis and the
   mock-session record.

   Rebuilt on the hub design language (CARD_SURFACE cards, HubSectionHeading,
   everything text-white). The old header carried five actions in a row —
   one volt pill and four grey links — which on a phone wrapped into a
   three-line tangle above a 26px headline. The heading now carries the two
   actions a tutor reaches for (their own verdict, the AI's); the rest live
   as rows in a small action list at the foot of the section, where each one
   has a full-width 44px target and a line saying what it does.
   ========================================================================== */

const CARD = cn(
  'overflow-hidden -mx-4 border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x',
  CARD_SURFACE
);
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
  const readiness = useLearnerEpaReadinessModel(userId, collegeStudentId);
  // ELE-2054: the plan version by start date decides which NET task list applies.
  const { data: planVersion } = usePlanVersion(userId);
  const model = readiness.model;
  const showGrades = model ? model.route.graded : true;

  const [aiOpen, setAiOpen] = useState<null | 'view' | 'run'>(null);
  const [signalsOpen, setSignalsOpen] = useState(false);
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [mockOpen, setMockOpen] = useState(false);
  // English and maths are recorded on the gateway checklist (Level 2
  // achieved, or the employer's decision for a 19+ starter), which is what
  // the gate reads. It is keyed on the learner's qualification id.
  const [emOpen, setEmOpen] = useState(false);
  const [emQualId, setEmQualId] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    if (!emOpen || !userId || emQualId !== undefined) return;
    let live = true;
    void (
      supabase.rpc as unknown as (
        fn: string,
        params: Record<string, unknown>
      ) => Promise<{ data: { qualification_id?: string | null } | null }>
    )('resolve_learner_qualification', { p_user_id: userId, p_student_id: collegeStudentId }).then(
      ({ data }) => live && setEmQualId(data?.qualification_id ?? null),
      () => live && setEmQualId(null)
    );
    return () => {
      live = false;
    };
  }, [emOpen, userId, collegeStudentId, emQualId]);
  const [tutorSheet, setTutorSheet] = useState<
    null | { mode: 'create' | 'edit' } | { mode: 'cosign' | 'override'; aiTarget: EpaJudgement }
  >(null);

  // Mock-derived "learner self-assessment" — use latest mock if no formal submission yet.
  const inferredLearner = useMemo(() => {
    if (judge.learner) return judge.learner;
    const m = judge.mocks[0];
    if (!m) return null;
    if (m.overall_score == null) return null;
    // One mapping for mock → verdict, shared with the learner's own submit.
    // The score is a mock score, not a confidence — it isn't shown as one.
    return {
      __synthetic: true as const,
      verdict: verdictForMockScore(m.overall_score) as EpaJudgement['verdict'],
      predicted_grade: (m.predicted_grade as EpaJudgement['predicted_grade']) ?? null,
      confidence: null,
      score: m.overall_score,
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
        <CollegeHeading>EPA readiness</CollegeHeading>
        <div className={cn(CARD, 'px-4 py-6 sm:px-5')}>
          <p className="text-[13px] leading-relaxed text-white">
            No EPA record is linked to this learner yet.
          </p>
        </div>
      </section>
    );
  }

  const ai = judge.ai;
  const needsSignOff = aiNeedsSignOff(judge.tutor, judge.ai);
  const effective = effectiveVerdict(judge.tutor, judge.ai);
  const effectiveActions = effective?.judgement.recommended_actions ?? [];

  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      {/* Heading + the two actions a tutor actually reaches for. */}
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
        <CollegeHeading>EPA readiness</CollegeHeading>
        <div className="no-print flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAiOpen(ai ? 'view' : 'run')}
            className={COLLEGE_BTN}
          >
            {ai ? 'Readiness check' : 'Check readiness'} <UsesAi />
          </button>
          <button
            type="button"
            onClick={() => setTutorSheet({ mode: judge.tutor ? 'edit' : 'create' })}
            className={COLLEGE_BTN}
          >
            {judge.tutor ? 'Update verdict' : 'Tutor verdict'}
          </button>
        </div>
      </div>

      {(judge.error || readiness.error) && (
        <div className={cn(CARD, 'px-4 py-3 sm:px-5')}>
          <p className="text-[13px] text-white">
            Some EPA data didn't load ({judge.error ?? readiness.error}). What's shown may be
            incomplete.{' '}
            <button
              type="button"
              onClick={() => {
                void judge.refresh();
                void readiness.reload();
              }}
              className="inline-flex h-11 items-center font-semibold underline touch-manipulation"
            >
              Try again
            </button>
          </p>
        </div>
      )}

      {/* ELE-1872: the real gateway gate, the same lines the learner sees.
          Each line not met opens the place to fix it. */}
      {userId && (
        <GatewayGateCard
          className={cn(CARD, 'px-4 py-4 sm:px-5')}
          learnerId={userId}
          audience="tutor"
          firstName={firstName}
          onLink={(link: GateLink) => {
            const toHash = (h: string) => navigate({ search: window.location.search, hash: h });
            // The learner's evidence pack: ?open=facts opens Learner details
            // (start date); ?open=<item> opens that item to file it.
            const pack = (open: string) =>
              navigate(
                collegeStudentId
                  ? `/college/evidence-pack/${encodeURIComponent(collegeStudentId)}?open=${open}`
                  : '/college/evidence-pack'
              );
            if (link === 'coverage') toHash('coverage');
            else if (link === 'hours') toHash('otj');
            else if (link.startsWith('declaration_')) toHash('export-gateway');
            else if (link === 'start_date') pack('facts');
            // ELE-2050: NET's AM2S v1 form is filled and signed in the app; its page links to the upload for other forms.
            else if (link === 'net_checklist')
              navigate(`/college/net-checklist/${encodeURIComponent(collegeStudentId ?? '')}`);
            else if (link === 'english_maths') setEmOpen(true);
          }}
          linkLabel={{
            coverage: 'Assess criteria',
            hours: 'Open hours',
            declaration_learner: 'Gateway pack',
            declaration_employer: 'Gateway pack',
            declaration_provider: 'Sign it',
            start_date: 'Set start date',
            english_maths: 'Record it',
            net_checklist: 'Open it',
          }}
        />
      )}

      {/* AM2 practice and portfolio detail — an estimate, under the gate. */}
      <ReadinessModelCard model={model} loading={readiness.loading} hasAccount={!!userId} />

      {/* ELE-1907: AM2 practice against NET's task list, the same view the learner sees. */}
      {userId && model && (
        <Am2TaskReadiness
          userId={userId}
          routeKind={routeForPlan(model.route.kind, planVersion)}
          audience="tutor"
          name={firstName}
        />
      )}

      {/* ELE-2049/2050/2054/2055: on-site practice, NET checklist, plan version, Gold Card. */}
      {userId && (
        <ElectricalEpaPanel
          learnerId={userId}
          audience="tutor"
          collegeStudentId={collegeStudentId}
          name={firstName}
          plan={planVersion}
        />
      )}

      {/* What to do next: the effective verdict's actions (tutor, else AI). */}
      {effectiveActions.length > 0 && (
        <ActionsList
          actions={effectiveActions}
          title={
            effective?.isPrediction
              ? 'Next steps — AI prediction, not yet signed off'
              : 'Next steps — from the tutor verdict'
          }
        />
      )}

      {/* The three voices on one scale. The agreement line lives inside it. */}
      <EpaReadinessGauge
        showGrades={showGrades}
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
                ? `Inferred from latest mock score ${judge.mocks[0]?.overall_score ?? '—'}% (${mockWord})`
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
          showGrades={showGrades}
          subtitle={
            judge.learner
              ? 'Submitted as self-assessment'
              : inferredLearner
                ? `From latest mock score ${judge.mocks[0]?.overall_score ?? '—'}% (${mockWord})`
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
          showGrades={showGrades}
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
          showGrades={showGrades}
          subtitle={
            judge.ai
              ? `${judge.ai.source_name_snapshot ?? 'AI'} · ${formatDate(judge.ai.created_at)}`
              : 'Generated from cross-hub data'
          }
          empty={!judge.ai ? 'No AI verdict generated yet.' : null}
          action={
            judge.ai
              ? { label: 'Open', onClick: () => setAiOpen('view') }
              : { label: 'Generate', onClick: () => setAiOpen('run') }
          }
          extra={
            ai ? (
              <div className="-mb-2 mt-1 flex flex-wrap items-center gap-x-1">
                {judge.tutor && needsSignOff && (
                  <p className="w-full text-[12px] text-white">
                    Newer than your verdict — co-sign or override it.
                  </p>
                )}
                {needsSignOff && (
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
                  className={cn(TEXT_BTN, !needsSignOff && '-ml-2', 'text-white')}
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
            <div className={CARD_TITLE}>What is missing, and why</div>
            <div className="text-[12px] tabular-nums text-white">
              {ai.citations?.length ?? 0} citation
              {(ai.citations?.length ?? 0) === 1 ? '' : 's'}
            </div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {ai.blockers.map((b, i) => {
              // A citation belongs to a blocker when its applies_to text is
              // found in it (or vice versa). An empty applies_to matched every
              // blocker before; first-three-words matching was fragile.
              const bl = b.toLowerCase();
              const matched = (ai.citations ?? []).filter((c) => {
                const at = (c.applies_to ?? '').trim().toLowerCase();
                return at.length >= 4 && (bl.includes(at) || at.includes(bl.slice(0, 40)));
              });
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
                            className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[12px] font-semibold tabular-nums text-white"
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
            className={cn(TEXT_BTN, '-mr-2 text-white disabled:opacity-50')}
          >
            Record mock
          </button>
        </div>
        {mockCount === 0 ? (
          <div className="px-4 py-5 text-[12.5px] leading-snug text-white sm:px-5">
            No mock sessions yet. Record a tutor-led mock (a practical, a knowledge review or a
            timed AM2 section) to start tracking dry-run performance. AM2 simulator practice is in
            the readiness card above.
          </div>
        ) : (
          <>
            {mockTrend && (
              <div className="grid grid-cols-3 gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
                <MockStat
                  label="Best"
                  value={`${mockTrend.best}%`}
                  sub={showGrades ? mockTrend.bestGrade : null}
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
                      {showGrades && m.predicted_grade && (
                        <span className="ml-2 text-[12px] font-semibold capitalize text-white">
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
          <ActionRow
            title="Record EPA outcome"
            reason="The actual result — saved to the EPA record Reports read, and on every verdict"
            onClick={() => setOutcomeOpen(true)}
          />
          <ActionRow
            title="View cohort"
            reason="Where this learner sits against the rest of the group"
            onClick={() => navigate('/college/epa')}
          />
        </ul>
      </div>

      {/* ELE-2040: the employer's per-behaviour verification for gateway */}
      <BehaviourVerificationCard collegeStudentId={collegeStudentId} />

      {/* Sheets */}
      <FormSheet
        open={emOpen}
        onOpenChange={(o) => {
          setEmOpen(o);
          // The gate card re-reads on this event, so the line updates.
          if (!o) window.dispatchEvent(new Event(PORTFOLIO_CHANGED_EVENT));
        }}
        width="wide"
        eyebrow="Gateway checklist"
        title={studentName}
        description="Tick Level 2 English and maths when achieved, or English and maths not required when the employer has decided so for an apprentice who was 19 or over at the start."
      >
        {!userId ? (
          <p className="text-[13.5px] text-white">
            This learner has no app account yet, so there is no gateway checklist.
          </p>
        ) : emQualId === undefined ? (
          <p className="text-[13.5px] text-white">Loading the checklist…</p>
        ) : !emQualId ? (
          <p className="text-[13.5px] text-white">
            No qualification is set for this learner, so the gateway checklist cannot be found. Set
            their course first.
          </p>
        ) : (
          <EPAGatewayChecklist studentId={userId} qualificationId={emQualId} />
        )}
      </FormSheet>
      <AiEpaReadinessSheet
        open={aiOpen !== null}
        onOpenChange={(o) => !o && setAiOpen(null)}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
        existing={judge.ai}
        startMode={aiOpen ?? 'view'}
        showGrades={showGrades}
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
        qualificationCode={
          readiness.qualification?.code ?? epa.latestSnapshot?.qualification_code ?? null
        }
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
        showGrades={showGrades}
        onSaved={() => judge.refresh()}
      />
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   The shared readiness model
   ──────────────────────────────────────────────────────── */

function ReadinessModelCard({
  model,
  loading,
  hasAccount,
}: {
  model: EpaReadinessModel | null;
  loading: boolean;
  hasAccount: boolean;
}) {
  if (!hasAccount)
    return (
      <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
        <p className="text-[13px] leading-relaxed text-white">
          This learner hasn't linked an apprentice account, so there's no practice or portfolio to
          read yet.
        </p>
      </div>
    );
  if (loading && !model)
    return (
      <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
        <p className="text-[13px] text-white">Loading readiness…</p>
      </div>
    );
  if (!model) return null;
  const what = model.route.assessment || 'AM2';
  return (
    <div className={CARD}>
      <div className={CARD_HEAD}>
        <div className={CARD_TITLE}>{what} practice and portfolio</div>
        <div className="text-[12px] font-semibold text-white">{EPA_STATUS_LABEL[model.status]}</div>
      </div>
      <div className="space-y-4 px-4 py-4 sm:px-5">
        <p className="text-[13px] leading-snug text-white">{model.route.summary}</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="text-[12px] font-semibold text-white">
              {what} practice · {model.am2.ready}/{model.am2.of} at the bar
            </div>
            <ul className="mt-1.5 space-y-1">
              {model.am2.sections.map((s) => (
                <li key={s.key} className="flex justify-between gap-2 text-[12.5px] text-white">
                  <span className="truncate">
                    {s.key} · {s.title}
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {s.status === 'ready'
                      ? 'Ready'
                      : s.status === 'practising'
                        ? `${s.last ?? '—'}% / ${s.bar}%`
                        : 'Not tried'}
                  </span>
                </li>
              ))}
            </ul>
            {model.am2.lastMock && (
              <p className="mt-1.5 text-[12px] text-white">
                Last mock day: {model.am2.lastMock.atBar} of {model.am2.lastMock.of} at the bar
              </p>
            )}
          </div>

          <div>
            <div className="text-[12px] font-semibold text-white">
              Portfolio ·{' '}
              {model.portfolio.known
                ? `${model.portfolio.signedOff} of ${model.portfolio.totalACs} criteria passed`
                : 'criteria not known'}
            </div>
            {model.portfolio.known ? (
              <>
                {model.portfolio.evidenced > model.portfolio.signedOff && (
                  <p className="mt-1.5 text-[12.5px] text-white">
                    {model.portfolio.evidenced - model.portfolio.signedOff} more claimed or with the
                    assessor
                  </p>
                )}
                {model.portfolio.weakestUnits.length > 0 && (
                  <ul className="mt-1 space-y-1">
                    {model.portfolio.weakestUnits.map((u) => (
                      <li key={u.unitCode} className="text-[12.5px] text-white">
                        Unit {u.unitCode}: {u.covered}/{u.total}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="mt-1.5 text-[12.5px] text-white">
                No qualification resolved for this learner, so their ACs can't be counted.
              </p>
            )}
          </div>
        </div>

        {/* Sign-off items now live in the gate above (ELE-1872); only practice and evidence steps here. */}
        {model.next.some((n) => n.kind !== 'gateway') && (
          <div className="border-t border-white/[0.10] pt-3">
            <div className="text-[12px] font-semibold text-white">
              Practice and evidence next steps
            </div>
            <ol className="mt-1.5 list-decimal space-y-1 pl-4">
              {model.next
                .filter((n) => n.kind !== 'gateway')
                .map((n, i) => (
                  <li key={i} className="text-[13px] text-white">
                    {n.label}
                  </li>
                ))}
            </ol>
          </div>
        )}
        <p className="text-[12px] text-white">
          A practice estimate only. The gate above is what counts, and the employer makes the
          gateway decision.
        </p>
      </div>
    </div>
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
      <span className="text-[12px] font-medium text-white">{label}</span>
      <span
        className={cn(
          'text-[18px] font-semibold leading-none tabular-nums text-white',
          accent && 'underline decoration-elec-yellow underline-offset-4'
        )}
      >
        {value}
      </span>
      {sub && (
        <span
          className={cn(
            'text-[12px] font-medium capitalize tabular-nums',
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
          <span className="block line-clamp-2 text-[14px] font-semibold leading-snug text-white">
            {title}
          </span>
          <span className="mt-0.5 block line-clamp-2 text-[12px] leading-snug text-white">
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
  showGrades = true,
}: {
  source: EpaSource;
  judgement: EpaJudgement | Partial<EpaJudgement> | null;
  /** Inferred from a mock rather than submitted — say so, and don't dress it up. */
  draft?: boolean;
  subtitle?: string;
  empty?: string | null;
  action?: { label: string; onClick: () => void };
  extra?: React.ReactNode;
  showGrades?: boolean;
}) {
  const verdict = judgement?.verdict;
  const grade = judgement?.predicted_grade;
  const conf = judgement?.confidence ?? null;

  return (
    <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
      <div className="flex items-center justify-between gap-2">
        <div className={CARD_TITLE}>{SOURCE_LABEL[source]}</div>
        {draft && (
          <span className="inline-flex h-6 items-center rounded-md border border-white/[0.14] px-1.5 text-[12px] font-semibold text-white">
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
            {showGrades && grade && (
              <span className="text-[13px] font-semibold capitalize text-white">{grade}</span>
            )}
          </div>
          {conf != null && (
            <div className="mt-2 flex items-center gap-2 text-[12px] text-white">
              <div className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-white/[0.10]">
                <div className="h-full rounded-full bg-white" style={{ width: `${conf}%` }} />
              </div>
              <span className="tabular-nums">{conf}% sure</span>
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
          className={cn(
            TEXT_BTN,
            '-mb-2 -ml-2 mt-1 text-white underline decoration-elec-yellow underline-offset-4'
          )}
        >
          {action.label}
        </button>
      )}
      {extra}
    </div>
  );
}
