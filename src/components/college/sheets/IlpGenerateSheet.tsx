import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Wand2, RotateCw, Check, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from '@/components/college/primitives';
import { useGenerateIlp, type AiIlpDraft } from '@/hooks/useGenerateIlp';
import type { StudentIlpHook } from '@/hooks/useStudentIlp';

/* ==========================================================================
   IlpGenerateSheet — AI drafts a complete ILP from cross-hub data; tutor
   reviews then saves as a new version with goals in one click.
   ========================================================================== */

const CATEGORY_LABEL: Record<string, string> = {
  academic: 'Academic',
  skills: 'Skills',
  employability: 'Employability',
  behavioural: 'Behaviour',
  attendance: 'Attendance',
  wellbeing: 'Wellbeing',
  other: 'Other',
};

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-elec-yellow',
  low: 'bg-white/40',
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  hookActions: Pick<StudentIlpHook, 'upsertIlp' | 'addGoal'>;
  onSaved?: () => void;
}

export function IlpGenerateSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  hookActions,
  onSaved,
}: Props) {
  const ai = useGenerateIlp();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const autoStartedRef = useRef(false);

  // Auto-start streaming when the sheet opens. Use a ref so we don't re-trigger
  // every time the hook returns a new object (which would loop forever).
  useEffect(() => {
    if (open && !autoStartedRef.current) {
      autoStartedRef.current = true;
      void ai.generate(studentId);
    }
    if (!open) {
      autoStartedRef.current = false;
      ai.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, studentId]);

  const handleSave = async () => {
    if (!ai.draft) return;
    setSaving(true);
    try {
      // 1. Create new ILP version with the AI-drafted narrative
      const newIlp = await hookActions.upsertIlp({
        headline_focus: ai.draft.headline_focus,
        headline_strengths: ai.draft.headline_strengths,
        headline_areas: ai.draft.headline_areas,
        support_strategies: ai.draft.support_strategies,
        accessibility_adjustments: ai.draft.accessibility_adjustments || null,
        target_completion_date: ai.draft.target_completion_date || null,
        review_date: ai.draft.review_date || null,
        status: 'active',
      });
      if (!newIlp) throw new Error('Could not create ILP');

      // 2. Add each goal sequentially (so position increments cleanly)
      for (const g of ai.draft.goals) {
        await hookActions.addGoal({
          title: g.title,
          description: g.description,
          acceptance_criteria: g.acceptance_criteria,
          target_date: g.target_date,
          category: g.category,
          priority: g.priority,
          source: 'ai_suggested',
        });
      }

      toast({
        title: 'ILP saved',
        description: `New v${newIlp.version} with ${ai.draft.goals.length} goals — visible in ${studentName.split(' ')[0]}'s app.`,
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = () => {
    ai.reset();
    autoStartedRef.current = true;
    void ai.generate(studentId);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[94vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="AI Individual Learning Plan"
          title={
            ai.meta?.has_prior
              ? `Refine ${studentName.split(' ')[0]}'s ILP`
              : `Generate ${studentName.split(' ')[0]}'s ILP`
          }
          description={
            ai.meta?.has_prior
              ? `Reading cross-hub data + your existing v${ai.meta.prior_version} plan. Review and save as v${(ai.meta.prior_version ?? 0) + 1}.`
              : 'Reading cross-hub data — AC gaps, observations, attendance, portfolio, OTJ, inclusion flags. Review and save.'
          }
          footer={
            ai.status === 'done' && ai.draft ? (
              <>
                <SecondaryButton onClick={handleRegenerate} disabled={saving} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Re-draft
                </SecondaryButton>
                <PrimaryButton onClick={handleSave} disabled={saving} fullWidth>
                  <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                  {saving ? 'Saving…' : 'Save as ILP'}
                </PrimaryButton>
              </>
            ) : ai.status === 'streaming' ? (
              <DestructiveButton onClick={ai.stop} fullWidth>
                <Square className="h-3 w-3 mr-1.5" fill="currentColor" />
                Stop
              </DestructiveButton>
            ) : ai.status === 'error' ? (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleRegenerate} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Retry
                </PrimaryButton>
              </>
            ) : (
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
            )
          }
        >
          {ai.status === 'streaming' && <StreamingState />}
          {ai.status === 'error' && <ErrorState message={ai.error} />}
          {ai.status === 'done' && ai.draft && <DraftView draft={ai.draft} />}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function StreamingState() {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent opacity-80"
          style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
        />
        <style>{`@keyframes shimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }`}</style>
        <div className="px-5 py-5 flex items-center gap-3">
          <Wand2 className="h-5 w-5 text-elec-yellow" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              Drafting your ILP
            </div>
            <div className="mt-0.5 text-[12px] text-white/85">
              Reading curriculum gaps, observations, attendance, portfolio, OTJ, inclusion flags…
            </div>
          </div>
        </div>
      </div>
      {/* Skeleton for narrative blocks */}
      <div className="space-y-3 animate-pulse">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/[0.04] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="h-2.5 w-1/4 rounded bg-white/[0.06]" />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/[0.04]" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="rounded-2xl border border-red-500/[0.2] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-red-500/15 flex-shrink-0">
        <X className="h-5 w-5 text-red-300" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
          AI generation failed
        </div>
        <p className="mt-1 text-[12.5px] text-white/85 leading-relaxed">
          {message ?? 'Something went wrong. Try again.'}
        </p>
      </div>
    </div>
  );
}

function DraftView({ draft }: { draft: AiIlpDraft }) {
  return (
    <div className="space-y-4">
      {/* Status banner */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-3 flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-elec-yellow" />
        <span className="text-[12.5px] text-white">
          AI draft ready — review and save when you're happy.
        </span>
      </div>

      {/* Narrative blocks */}
      <NarrativeBlock label="Focus" tone="yellow" text={draft.headline_focus} />
      <NarrativeBlock label="Strengths" tone="emerald" text={draft.headline_strengths} />
      <NarrativeBlock label="Areas for development" tone="amber" text={draft.headline_areas} />
      <NarrativeBlock label="Support strategies" tone="blue" text={draft.support_strategies} />
      {draft.accessibility_adjustments && (
        <NarrativeBlock label="Accessibility" tone="purple" text={draft.accessibility_adjustments} />
      )}

      {/* Dates */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4 grid grid-cols-2 gap-3 text-[11.5px]">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Target</div>
          <div className="mt-1 text-white tabular-nums">
            {formatDate(draft.target_completion_date)}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
            Next review
          </div>
          <div className="mt-1 text-white tabular-nums">{formatDate(draft.review_date)}</div>
        </div>
      </div>

      {/* Goals */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Goals ({draft.goals.length})
          </div>
        </div>
        <div className="space-y-2.5">
          {draft.goals.map((g, i) => (
            <GoalCard key={i} goal={g} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GoalCard({ goal }: { goal: AiIlpDraft['goals'][number] }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3.5">
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span
          aria-hidden
          className={cn('inline-block h-1.5 w-1.5 rounded-full', PRIORITY_DOT[goal.priority] ?? 'bg-white/40')}
        />
        <span className="text-[10px] uppercase tracking-[0.12em] text-white">
          {CATEGORY_LABEL[goal.category] ?? goal.category}
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/65">
          · {goal.priority}
        </span>
        {goal.target_date && (
          <span className="ml-auto text-[10.5px] text-white/85 tabular-nums">
            Due {formatDate(goal.target_date)}
          </span>
        )}
      </div>
      <h4 className="text-[14px] font-semibold text-white leading-tight">{goal.title}</h4>
      {goal.description && (
        <p className="mt-1 text-[12px] text-white/85 leading-relaxed">{goal.description}</p>
      )}
      {goal.acceptance_criteria && (
        <div className="mt-2 pt-2 border-t border-white/[0.06]">
          <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/85 mb-0.5">
            Done when
          </div>
          <p className="text-[11.5px] text-white/85 leading-snug">{goal.acceptance_criteria}</p>
        </div>
      )}
    </div>
  );
}

function NarrativeBlock({
  label,
  tone,
  text,
}: {
  label: string;
  tone: 'yellow' | 'emerald' | 'amber' | 'blue' | 'purple';
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div
        className={cn(
          'text-[10px] font-semibold uppercase tracking-[0.18em] mb-1.5',
          tone === 'emerald'
            ? 'text-emerald-300/85'
            : tone === 'amber'
              ? 'text-amber-300/85'
              : tone === 'blue'
                ? 'text-blue-300/85'
                : tone === 'purple'
                  ? 'text-purple-300/85'
                  : 'text-elec-yellow/85'
        )}
      >
        {label}
      </div>
      <p className="text-[12.5px] text-white/85 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
