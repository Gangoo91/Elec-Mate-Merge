import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Wand2, ShieldCheck, AlertTriangle, Sparkles, User2, Bot } from 'lucide-react';
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
   Three columns: Learner self-assessment / Tutor judgement / AI verdict.
   Agreement banner above. Beneath: AI citation-grade gaps,
   tutor blockers, gateway checklist (from existing useStudentEpa).
   ========================================================================== */

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

  if (!collegeStudentId) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No EPA data linked to this learner yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-6">
      <Header
        onAi={() => setAiOpen(true)}
        onTutor={() => setTutorSheet({ mode: judge.tutor ? 'edit' : 'create' })}
        onOutcome={() => setOutcomeOpen(true)}
        onBrief={() => setBriefOpen(true)}
        onCohort={() => navigate('/college/epa')}
        canRecordOutcome={!!(judge.ai || judge.tutor || judge.learner)}
      />

      {/* Agreement banner */}
      <AgreementBanner
        headline={judge.agreement.headline}
        consensus={judge.agreement.full_consensus}
        outlier={judge.agreement.outlier_source}
      />

      {/* Unified readiness gauge */}
      <div className="mt-4">
        <EpaReadinessGauge
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
                  ? `Inferred from latest mock (${judge.mocks.length} session${judge.mocks.length === 1 ? '' : 's'})`
                  : `${studentName.split(' ')[0]} hasn't run the simulator yet`,
            },
            {
              source: 'tutor',
              judgement: judge.tutor,
              subtitle: judge.tutor
                ? `${judge.tutor.source_name_snapshot ?? 'Tutor'} · ${formatDate(judge.tutor.created_at)}${judge.tutor.cosign_kind === 'cosigned' ? ' · co-signed AI' : judge.tutor.cosign_kind === 'overridden' ? ' · overrode AI' : ''}`
                : 'Tap "Tutor verdict" above to record',
            },
            {
              source: 'ai',
              judgement: judge.ai,
              subtitle: judge.ai
                ? `${judge.ai.source_name_snapshot ?? 'AI'} · ${formatDate(judge.ai.created_at)}`
                : 'Tap "AI verdict" above to generate',
            },
          ]}
        />
      </div>

      {/* Tri-pane verdicts */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <VerdictColumn
          source="learner"
          studentName={studentName}
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
          subtitle={
            judge.learner
              ? 'Submitted as self-assessment'
              : inferredLearner
                ? `From latest mock (${judge.mocks.length} session${judge.mocks.length === 1 ? '' : 's'})`
                : 'No simulator runs yet'
          }
          empty={
            !judge.learner && !inferredLearner
              ? `${studentName.split(' ')[0]} hasn't run the EPA simulator yet.`
              : null
          }
        />
        <VerdictColumn
          source="tutor"
          studentName={studentName}
          judgement={judge.tutor}
          subtitle={
            judge.tutor
              ? `${judge.tutor.source_name_snapshot ?? 'Tutor'} · ${formatDate(judge.tutor.created_at)}${judge.tutor.cosign_kind === 'cosigned' ? ' · co-signed AI' : judge.tutor.cosign_kind === 'overridden' ? ' · overrode AI' : ''}`
              : 'Tap "Record verdict" to capture your judgement'
          }
          empty={!judge.tutor ? 'No tutor verdict recorded.' : null}
          action={
            judge.tutor
              ? { label: 'Update →', onClick: () => setTutorSheet({ mode: 'edit' }) }
              : { label: 'Record verdict →', onClick: () => setTutorSheet({ mode: 'create' }) }
          }
        />
        <VerdictColumn
          source="ai"
          studentName={studentName}
          judgement={judge.ai}
          subtitle={
            judge.ai
              ? `${judge.ai.source_name_snapshot ?? 'AI'} · ${formatDate(judge.ai.created_at)}`
              : 'No AI verdict yet — generate from cross-hub data'
          }
          empty={!judge.ai ? 'No AI verdict generated yet.' : null}
          action={
            judge.ai
              ? { label: 'Re-run →', onClick: () => setAiOpen(true) }
              : { label: 'Generate →', onClick: () => setAiOpen(true), accent: true }
          }
          extra={
            judge.ai ? (
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                {judge.tutor == null && (
                  <>
                    <button
                      type="button"
                      onClick={() => setTutorSheet({ mode: 'cosign', aiTarget: judge.ai! })}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-emerald-500/[0.12] border border-emerald-400/40 text-emerald-200 text-[11.5px] font-semibold hover:bg-emerald-500/[0.18] touch-manipulation"
                    >
                      <ShieldCheck className="h-3 w-3" /> Co-sign
                    </button>
                    <button
                      type="button"
                      onClick={() => setTutorSheet({ mode: 'override', aiTarget: judge.ai! })}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.12] text-white/85 text-[11.5px] font-semibold hover:bg-white/[0.08] touch-manipulation"
                    >
                      Override
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setSignalsOpen(true)}
                  className="text-[11.5px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
                >
                  What did the AI see? →
                </button>
              </div>
            ) : null
          }
        />
      </div>

      {/* AI citation-grade gaps */}
      {judge.ai && judge.ai.blockers && judge.ai.blockers.length > 0 && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              AI gap analysis
            </div>
            <div className="text-[10.5px] text-white/55 tabular-nums">
              {judge.ai.citations?.length ?? 0} citation
              {(judge.ai.citations?.length ?? 0) === 1 ? '' : 's'}
            </div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {judge.ai.blockers.map((b, i) => {
              const matched = (judge.ai!.citations ?? []).filter((c) =>
                b
                  .toLowerCase()
                  .includes((c.applies_to ?? '').toLowerCase().split(' ').slice(0, 3).join(' '))
              );
              return (
                <li key={i} className="px-5 py-3 flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400/85 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] text-white/85 leading-snug">{b}</p>
                    {matched.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {matched.map((c, j) => (
                          <span
                            key={j}
                            title={c.snippet}
                            className="inline-flex items-center h-5 px-1.5 rounded-md bg-blue-500/[0.12] border border-blue-500/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-blue-200"
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
          {/* Citations not matched to any blocker */}
          {judge.ai.citations && judge.ai.citations.length > 0 && (
            <div className="px-5 py-3 border-t border-white/[0.04]">
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 mb-1.5">
                All citations
              </div>
              <ul className="space-y-1.5">
                {judge.ai.citations.map((c, i) => (
                  <li key={i} className="text-[11.5px] text-white/75 leading-snug">
                    <span className="text-blue-200 font-semibold">{c.ref}</span>
                    {c.snippet && <span className="text-white/55"> — {c.snippet}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Gateway checklist */}
      {epa.checklist && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Gateway checklist
            </div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {GATEWAY_LABELS.map(({ key, label }) => {
              const complete = Boolean((epa.checklist as Record<string, unknown>)[key]);
              return (
                <li key={String(key)} className="px-5 py-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      'inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold flex-shrink-0',
                      complete
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/[0.04] text-white/35'
                    )}
                  >
                    {complete ? '✓' : '·'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={cn('text-[12.5px]', complete ? 'text-white' : 'text-white/65')}>
                      {label}
                    </div>
                  </div>
                  {key === 'ojt_hours_verified' && epa.checklist?.ojt_hours_required != null && (
                    <div className="text-[10.5px] text-white/55 tabular-nums">
                      {Math.round(epa.checklist.ojt_hours_completed ?? 0)}h /{' '}
                      {Math.round(epa.checklist.ojt_hours_required)}h
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Mock sessions strip — combined AI simulator runs + tutor-recorded mocks */}
      <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between gap-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Mock sessions
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[10.5px] text-white/55 tabular-nums">
              {judge.mocks.length} session{judge.mocks.length === 1 ? '' : 's'}
            </div>
            <button
              type="button"
              onClick={() => setMockOpen(true)}
              disabled={!userId}
              className="inline-flex items-center h-7 px-2.5 rounded-full bg-elec-yellow/[0.12] border border-elec-yellow/40 text-elec-yellow text-[11px] font-semibold hover:bg-elec-yellow/[0.18] disabled:opacity-40 touch-manipulation"
            >
              + Record mock
            </button>
          </div>
        </div>
        {judge.mocks.length === 0 ? (
          <div className="px-5 py-6 text-[11.5px] text-white/45 leading-snug">
            No mock sessions yet. Record a tutor-led mock (portfolio walkthrough, professional
            discussion, practical or knowledge review) to start tracking dry-run performance.
          </div>
        ) : (
          <>
            {mockTrend && (
              <div className="px-5 py-3 border-b border-white/[0.04] grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/45">Best</span>
                  <span className="text-[15px] font-semibold tabular-nums text-white leading-none">
                    {mockTrend.best}%
                  </span>
                  {mockTrend.bestGrade && (
                    <span className="text-[10px] font-medium text-elec-yellow/85 capitalize">
                      {mockTrend.bestGrade}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/45">
                    Latest
                  </span>
                  <span className="text-[15px] font-semibold tabular-nums text-white leading-none">
                    {mockTrend.latest}%
                  </span>
                  {mockTrend.delta !== null && (
                    <span
                      className={cn(
                        'text-[10px] font-medium tabular-nums',
                        mockTrend.delta > 0
                          ? 'text-elec-yellow'
                          : mockTrend.delta < 0
                            ? 'text-red-300'
                            : 'text-white/45'
                      )}
                    >
                      {mockTrend.delta > 0
                        ? `▲ +${mockTrend.delta}`
                        : mockTrend.delta < 0
                          ? `▼ ${mockTrend.delta}`
                          : 'no change'}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/45">Runs</span>
                  <span className="text-[15px] font-semibold tabular-nums text-white leading-none">
                    {mockTrend.count}
                  </span>
                  <span className="text-[10px] text-white/45">scored</span>
                </div>
              </div>
            )}
            <ul className="divide-y divide-white/[0.04]">
              {judge.mocks.slice(0, 5).map((m) => (
                <li key={m.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] text-white capitalize">
                      {m.session_type.replace(/_/g, ' ')}
                      {m.predicted_grade && (
                        <span className="ml-2 text-[11px] font-medium text-elec-yellow/85 capitalize">
                          {m.predicted_grade}
                        </span>
                      )}
                    </div>
                    <div className="text-[10.5px] text-white/55 tabular-nums">
                      {formatDate(m.completed_at)}
                    </div>
                  </div>
                  {m.overall_score != null && (
                    <div className="text-[14px] font-semibold text-white tabular-nums">
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
      <div className="mt-4">
        <EpaVerdictHistory
          current={{ learner: judge.learner, tutor: judge.tutor, ai: judge.ai }}
          past={judge.history}
        />
      </div>

      {/* Calibration card */}
      <div className="mt-4">
        <EpaCalibrationCard collegeId={null} />
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
   Header
   ──────────────────────────────────────────────────────── */

function Header({
  onAi,
  onTutor,
  onOutcome,
  onBrief,
  onCohort,
  canRecordOutcome,
}: {
  onAi?: () => void;
  onTutor?: () => void;
  onOutcome?: () => void;
  onBrief?: () => void;
  onCohort?: () => void;
  canRecordOutcome?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          End-Point Assessment
        </div>
        <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
          EPA readiness
        </h2>
      </div>
      <div className="flex items-center gap-2 no-print">
        {onAi && (
          <button
            onClick={onAi}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-elec-yellow/[0.08] border border-elec-yellow/30 text-elec-yellow text-[12px] font-semibold hover:bg-elec-yellow/[0.14] transition-colors touch-manipulation"
          >
            <Wand2 className="h-3 w-3" strokeWidth={2.5} />
            AI verdict
          </button>
        )}
        {onTutor && (
          <button
            onClick={onTutor}
            className="text-[12px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation"
          >
            Tutor verdict →
          </button>
        )}
        {onBrief && (
          <button
            onClick={onBrief}
            className="text-[12px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation"
          >
            Pre-EPA brief →
          </button>
        )}
        {canRecordOutcome && onOutcome && (
          <button
            onClick={onOutcome}
            className="text-[12px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
          >
            Record outcome →
          </button>
        )}
        {onCohort && (
          <button
            onClick={onCohort}
            className="text-[12px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
          >
            View cohort →
          </button>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Agreement banner
   ──────────────────────────────────────────────────────── */

function AgreementBanner({
  headline,
  consensus,
  outlier,
}: {
  headline: string;
  consensus: boolean;
  outlier: EpaSource | null;
}) {
  const tone = consensus
    ? 'border-emerald-500/[0.25] bg-emerald-500/[0.05]'
    : outlier
      ? 'border-amber-500/[0.25] bg-amber-500/[0.05]'
      : 'border-white/[0.06] bg-[hsl(0_0%_12%)]';
  return (
    <div className={cn('mt-5 rounded-2xl border px-5 py-3 flex items-center gap-3', tone)}>
      <Sparkles
        className={cn(
          'h-4 w-4 flex-shrink-0',
          consensus ? 'text-emerald-300' : outlier ? 'text-amber-300' : 'text-white/55'
        )}
      />
      <p className="text-[12.5px] text-white/90 leading-snug">{headline}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Verdict column
   ──────────────────────────────────────────────────────── */

const SOURCE_META: Record<
  EpaSource,
  { label: string; icon: React.ComponentType<{ className?: string }>; tint: string }
> = {
  learner: { label: 'Learner', icon: User2, tint: 'text-blue-200' },
  tutor: { label: 'Tutor', icon: ShieldCheck, tint: 'text-elec-yellow' },
  ai: { label: 'AI', icon: Bot, tint: 'text-purple-200' },
  employer: { label: 'Employer', icon: User2, tint: 'text-emerald-200' },
};

const VERDICT_PILL: Record<string, string> = {
  ready: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40',
  almost: 'bg-amber-500/15 text-amber-200 border-amber-400/40',
  not_yet: 'bg-orange-500/15 text-orange-200 border-orange-400/40',
  refer: 'bg-red-500/15 text-red-200 border-red-400/40',
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
  subtitle,
  empty,
  action,
  extra,
}: {
  source: EpaSource;
  studentName: string;
  judgement: EpaJudgement | Partial<EpaJudgement> | null;
  subtitle?: string;
  empty?: string | null;
  action?: { label: string; onClick: () => void; accent?: boolean };
  extra?: React.ReactNode;
}) {
  const meta = SOURCE_META[source];
  const Icon = meta.icon;
  const verdict = judgement?.verdict;
  const grade = judgement?.predicted_grade;
  const conf = judgement?.confidence ?? null;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div className="flex items-center gap-2">
        <Icon className={cn('h-3.5 w-3.5', meta.tint)} />
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {meta.label}
        </div>
      </div>
      {verdict ? (
        <>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center h-6 px-2 rounded-full border text-[11px] font-semibold tracking-[0.06em] uppercase',
                VERDICT_PILL[verdict] ?? 'bg-white/[0.04] border-white/[0.12] text-white/65'
              )}
            >
              {VERDICT_LABEL[verdict] ?? verdict}
            </span>
            {grade && (
              <span className="inline-flex items-center h-6 px-2 rounded-full bg-elec-yellow/[0.12] border border-elec-yellow/30 text-[11px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
                {grade}
              </span>
            )}
          </div>
          {conf != null && (
            <div className="mt-2 flex items-center gap-2 text-[11px] text-white/55">
              <div className="h-1.5 w-full max-w-[100px] rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full',
                    conf >= 70 ? 'bg-emerald-400' : conf >= 40 ? 'bg-elec-yellow' : 'bg-amber-400'
                  )}
                  style={{ width: `${conf}%` }}
                />
              </div>
              <span className="tabular-nums">{conf}%</span>
            </div>
          )}
        </>
      ) : (
        <p className="mt-3 text-[12px] text-white/55 leading-snug">{empty ?? 'No verdict.'}</p>
      )}
      {subtitle && <p className="mt-2 text-[10.5px] text-white/45">{subtitle}</p>}
      {judgement?.rationale && (
        <p className="mt-3 text-[12px] text-white/85 leading-relaxed line-clamp-4">
          {judgement.rationale}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'mt-3 text-[11.5px] font-semibold tracking-tight transition-colors touch-manipulation',
            action.accent
              ? 'text-elec-yellow hover:text-elec-yellow/85'
              : 'text-white/85 hover:text-white'
          )}
        >
          {action.label}
        </button>
      )}
      {extra}
    </div>
  );
}
