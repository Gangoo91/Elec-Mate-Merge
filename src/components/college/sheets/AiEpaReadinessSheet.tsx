import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { RotateCw, Check, Square } from 'lucide-react';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from '@/components/college/primitives';
import { useAiEpaReadiness } from '@/hooks/useAiEpaReadiness';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';
import { VERDICT_LABEL, ageLabel } from '@/hooks/college/epaReadinessModels';

/* ==========================================================================
   AiEpaReadinessSheet — the AI's second opinion on EPA readiness.

   6 Oct 2026: opens on the EXISTING verdict, with an explicit "Re-run". It
   used to start a new paid run every time it opened, and that run replaced
   the current verdict — so a tutor couldn't look at what the AI had said to
   do without overwriting it. Stop/close abandons a run without saving.

   The AI sees evidence, not identity: no name, and no SEND/EAL/EHCP flags.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collegeStudentId: string | null;
  studentName: string;
  /** The current AI verdict, shown on open. */
  existing?: EpaJudgement | null;
  /** 'run' starts a new verdict straight away (the explicit Re-run). */
  startMode?: 'view' | 'run';
  /** Pass/Merit/Distinction only on a graded route. */
  showGrades?: boolean;
  /** When the AI returns a verdict, the parent refresh is invoked. */
  onSaved?: (judgement: EpaJudgement) => void;
}

const PHASE_LABELS: Record<string, string> = {
  loading_signals: 'Reading the evidence',
  retrieving_bs7671: 'Pulling the relevant BS 7671 regulations',
  reasoning: 'Weighing the evidence',
};

export function AiEpaReadinessSheet({
  open,
  onOpenChange,
  collegeStudentId,
  studentName,
  existing = null,
  startMode = 'view',
  showGrades = true,
  onSaved,
}: Props) {
  const ai = useAiEpaReadiness();
  const startedRef = useRef(false);
  const [viewing, setViewing] = useState<EpaJudgement | null>(null);

  useEffect(() => {
    if (open && !startedRef.current) {
      startedRef.current = true;
      setViewing(existing);
      // Only generate on an explicit run, or when there's nothing to show.
      if (collegeStudentId && (startMode === 'run' || !existing))
        void ai.generate(collegeStudentId);
    }
    if (!open) {
      startedRef.current = false;
      ai.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, collegeStudentId]);

  useEffect(() => {
    if (ai.status === 'done' && ai.judgement) {
      setViewing(ai.judgement);
      onSaved?.(ai.judgement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai.status]);

  const rerun = () => {
    if (!collegeStudentId) return;
    ai.reset();
    void ai.generate(collegeStudentId);
  };

  const first = studentName.split(' ')[0];
  const showing = ai.status === 'streaming' ? null : viewing;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-[85vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="AI second opinion"
          title={`AI verdict for ${first}`}
          description="An evidence-based prediction for the tutor to co-sign or override — not a decision. The AI is sent the learner's evidence, not their name or any SEND, EAL or EHCP details."
          footer={
            ai.status === 'streaming' ? (
              <DestructiveButton onClick={ai.stop} fullWidth>
                <Square className="h-3 w-3 mr-1.5" fill="currentColor" />
                Stop — nothing is saved
              </DestructiveButton>
            ) : (
              <>
                <SecondaryButton onClick={rerun} fullWidth disabled={!collegeStudentId}>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  {ai.status === 'error' ? 'Try again' : showing ? 'Re-run' : 'Generate'}
                </SecondaryButton>
                <PrimaryButton onClick={() => onOpenChange(false)} fullWidth>
                  <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                  Done
                </PrimaryButton>
              </>
            )
          }
        >
          {ai.status === 'streaming' && (
            <StreamingState
              phaseLabel={PHASE_LABELS[ai.statusPhase ?? ''] ?? 'Working…'}
              facetsPulled={ai.facetsPulled}
            />
          )}
          {ai.status === 'error' && <ErrorState message={ai.error} />}
          {showing && <AiVerdictView judgement={showing} showGrades={showGrades} />}
          {!showing && ai.status === 'idle' && (
            <p className="text-[14px] text-white">No AI verdict yet for {first}.</p>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ────────────────────────────────────────────────────────
   States
   ──────────────────────────────────────────────────────── */

function StreamingState({
  phaseLabel,
  facetsPulled,
}: {
  phaseLabel: string;
  facetsPulled: number | null;
}) {
  return (
    <div className="space-y-3" aria-live="polite">
      <div className="rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="text-[14px] font-semibold text-white">{phaseLabel}…</div>
        <div className="mt-1 text-[13px] text-white">
          Practice, portfolio, sign-offs, observations and off-the-job hours
          {facetsPulled != null && ` · ${facetsPulled} BS 7671 regulations retrieved`}.
        </div>
      </div>
      <div className="space-y-3 animate-pulse" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-5 py-4"
          >
            <div className="h-2.5 w-1/4 rounded bg-white/[0.1]" />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/[0.08]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="rounded-2xl border border-red-500/60 bg-[hsl(0_0%_12%)] px-5 py-4">
      <div className="text-[14px] font-semibold text-white">The AI verdict didn't finish</div>
      <p className="mt-1 text-[13px] leading-relaxed text-white">
        {message ?? 'Something went wrong. Try again.'} Nothing was saved.
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Verdict view — also used inline in Student 360
   ──────────────────────────────────────────────────────── */

export function AiVerdictView({
  judgement,
  showGrades = true,
}: {
  judgement: EpaJudgement;
  showGrades?: boolean;
}) {
  const age = ageLabel(judgement.created_at);
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)] px-5 py-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[22px] font-semibold leading-none text-white">
            {VERDICT_LABEL[judgement.verdict] ?? judgement.verdict}
          </span>
          {showGrades && judgement.predicted_grade && (
            <span className="text-[14px] font-semibold capitalize text-white">
              {judgement.predicted_grade}
            </span>
          )}
          {judgement.confidence != null && (
            <span className="text-[13px] text-white">{judgement.confidence}% sure</span>
          )}
          {age && <span className="text-[13px] text-white">· {age}</span>}
        </div>
        {judgement.rationale && (
          <p className="mt-3 text-[14px] leading-relaxed text-white">{judgement.rationale}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ListBox label="Strengths" items={judgement.strengths ?? []} />
        <ListBox label="Blockers" items={judgement.blockers ?? []} />
      </div>

      <ActionsList actions={judgement.recommended_actions ?? []} />

      {judgement.what_if?.length ? (
        <div className="rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)] px-5 py-4">
          <div className="mb-2 text-[13px] font-semibold text-white">
            What would change the verdict
          </div>
          <ul className="space-y-2">
            {judgement.what_if.map((w, i) => (
              <li key={i} className="text-[13px] leading-snug text-white">
                {w.change}
                {showGrades && w.new_grade && <> → {w.new_grade}</>}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {judgement.citations?.length ? (
        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)]">
          <div className="border-b border-white/[0.1] px-5 py-3 text-[13px] font-semibold text-white">
            BS 7671 references
          </div>
          <ul className="divide-y divide-white/[0.08]">
            {judgement.citations.map((c, i) => (
              <li key={i} className="px-5 py-3">
                <div className="text-[13px] font-semibold tabular-nums text-white">{c.ref}</div>
                {c.applies_to && <div className="text-[12px] text-white">For: {c.applies_to}</div>}
                {c.snippet && (
                  <p className="mt-1 text-[13px] leading-snug text-white">{c.snippet}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function ActionsList({
  actions,
  title = 'Recommended actions',
}: {
  actions: EpaJudgement['recommended_actions'];
  title?: string;
}) {
  if (!actions?.length) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)]">
      <div className="border-b border-white/[0.1] px-5 py-3 text-[13px] font-semibold text-white">
        {title}
      </div>
      <ol className="divide-y divide-white/[0.08]">
        {actions.map((a, i) => (
          <li key={i} className="flex items-start gap-3 px-5 py-3">
            <span className="mt-0.5 w-5 text-[13px] tabular-nums text-white">{i + 1}.</span>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] text-white">{a.action}</div>
              {a.target_date && (
                <div className="mt-0.5 text-[12px] tabular-nums text-white">By {a.target_date}</div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ListBox({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div className="mb-2 text-[13px] font-semibold text-white">{label}</div>
      <ul className="list-disc space-y-1.5 pl-4">
        {items.map((it, i) => (
          <li key={i} className="text-[13px] leading-snug text-white">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
