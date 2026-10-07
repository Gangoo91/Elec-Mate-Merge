import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
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
  // ELE-1926: the draft is held here until the tutor says they checked it.
  const [checked, setChecked] = useState(false);
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
      setChecked(false);
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
        narrative_source: 'ai_draft_confirmed',
      });
      if (!newIlp) throw new Error('Could not create ILP');

      // 2. Add each goal sequentially (so position increments cleanly)
      for (const [i, g] of ai.draft.goals.entries()) {
        await hookActions.addGoal({
          ilp: { id: newIlp.id, college_id: newIlp.college_id ?? null },
          position: i,
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
    setChecked(false);
    ai.reset();
    autoStartedRef.current = true;
    void ai.generate(studentId);
  };

  const first = studentName.split(' ')[0];

  const footer =
    ai.status === 'done' && ai.draft ? (
      <div className="space-y-2.5">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[13px] leading-snug text-white touch-manipulation">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-5 w-5 shrink-0 accent-yellow-400"
          />
          I have read and checked this AI draft. {first} will see the plan marked as drafted with AI and
          confirmed by me.
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={handleRegenerate} disabled={saving} className={buttonSecondaryCn}>
            Re-draft
          </button>
          <button type="button" onClick={handleSave} disabled={saving || !checked} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Save as ILP'}
          </button>
        </div>
      </div>
    ) : ai.status === 'streaming' ? (
      <div className="grid grid-cols-1 gap-2.5">
        <button
          type="button"
          onClick={ai.stop}
          className={cn(buttonSecondaryCn, 'text-red-300 hover:text-red-200')}
        >
          Stop
        </button>
      </div>
    ) : ai.status === 'error' ? (
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
          Cancel
        </button>
        <button type="button" onClick={handleRegenerate} className={buttonPrimaryCn}>
          Retry
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-2.5">
        <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
          Cancel
        </button>
      </div>
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Individual learning plan"
      title={ai.meta?.has_prior ? `Refine ${first}'s ILP` : `Generate ${first}'s ILP`}
      description={
        ai.meta?.has_prior
          ? `Reading data from across the hub and your existing v${ai.meta.prior_version} plan. Review and save as v${(ai.meta.prior_version ?? 0) + 1}.`
          : 'Reading data from across the hub: AC gaps, observations, attendance, portfolio, off-the-job hours and inclusion flags. Review, then save.'
      }
      bodyClassName={
        ai.status === 'done' && ai.draft
          ? 'grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2'
          : 'space-y-5'
      }
      footer={footer}
    >
      {ai.status === 'streaming' && <StreamingState />}
      {ai.status === 'error' && <ErrorState message={ai.error} />}
      {ai.status === 'done' && ai.draft && <DraftView draft={ai.draft} />}
    </FormSheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function StreamingState() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[15px] font-semibold text-white">Drafting the ILP</h3>
        <p className="mt-1 text-[13px] leading-snug text-white">
          Reading curriculum gaps, observations, attendance, portfolio, off-the-job hours and inclusion flags…
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 animate-pulse lg:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
            <div className="h-2.5 w-1/4 rounded bg-white/[0.08]" />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/[0.06]" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="border-l-2 border-orange-300 pl-4">
      <h3 className="text-[15px] font-semibold text-orange-300">The draft failed</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-white">
        {message ?? 'Something went wrong. Try again.'}
      </p>
    </div>
  );
}

function DraftView({ draft }: { draft: AiIlpDraft }) {
  return (
    <>
      <section className="min-w-0 space-y-5">
        <div>
          <h3 className="text-[15px] font-semibold text-white">The plan</h3>
          <p className="mt-0.5 text-[13px] text-white">Draft ready. Review it and save when you're happy.</p>
        </div>
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          <NarrativeBlock label="Focus" text={draft.headline_focus} />
          <NarrativeBlock label="Strengths" text={draft.headline_strengths} />
          <NarrativeBlock label="Areas for development" text={draft.headline_areas} />
          <NarrativeBlock label="Support strategies" text={draft.support_strategies} />
          {draft.accessibility_adjustments && (
            <NarrativeBlock label="Accessibility" text={draft.accessibility_adjustments} />
          )}
          <dl className="grid grid-cols-2 gap-4 py-4 text-[13px] text-white">
            <div>
              <dt className="text-[12px] font-semibold">Target completion</dt>
              <dd className="mt-0.5 tabular-nums">{formatDate(draft.target_completion_date)}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold">Next review</dt>
              <dd className="mt-0.5 tabular-nums">{formatDate(draft.review_date)}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="min-w-0 space-y-3 border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <h3 className="text-[15px] font-semibold text-white">Goals ({draft.goals.length})</h3>
        <div className="space-y-2.5">
          {draft.goals.map((g, i) => (
            <GoalCard key={i} goal={g} />
          ))}
        </div>
      </section>
    </>
  );
}

function GoalCard({ goal }: { goal: AiIlpDraft['goals'][number] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
      <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-white">
        <span>{CATEGORY_LABEL[goal.category] ?? goal.category}</span>
        <span>·</span>
        <span className={cn('capitalize', goal.priority === 'high' && 'font-semibold text-orange-300')}>
          {goal.priority} priority
        </span>
        {goal.target_date && (
          <span className="ml-auto tabular-nums">Due {formatDate(goal.target_date)}</span>
        )}
      </div>
      <h4 className="text-[14.5px] font-semibold leading-tight text-white">{goal.title}</h4>
      {goal.description && (
        <p className="mt-1 text-[13px] leading-relaxed text-white">{goal.description}</p>
      )}
      {goal.acceptance_criteria && (
        <div className="mt-2 border-t border-white/[0.08] pt-2">
          <p className="text-[12px] font-semibold text-white">Done when</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">{goal.acceptance_criteria}</p>
        </div>
      )}
    </div>
  );
}

function NarrativeBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="py-4">
      <p className="text-[12px] font-semibold text-white">{label}</p>
      <p className="mt-1 whitespace-pre-line text-[13.5px] leading-relaxed text-white">{text}</p>
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
