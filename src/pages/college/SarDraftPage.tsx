import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { useSarDraft, type SarJudgement, type Rag, type SarDraft } from '@/hooks/useSarDraft';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  Pill,
  PrimaryButton,
  SecondaryButton,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   SarDraftPage — /college/compliance/sar
   ELE-922 (G2). The Ofsted SAR draft surface. Generate / view / approve.
   ========================================================================== */

const JUDGEMENTS: Array<{
  key: keyof Pick<
    SarDraft,
    | 'judgement_quality_of_education'
    | 'judgement_behaviour_attitudes'
    | 'judgement_personal_development'
    | 'judgement_leadership_management'
    | 'judgement_apprenticeships'
  >;
  label: string;
}> = [
  { key: 'judgement_quality_of_education', label: 'Quality of Education' },
  { key: 'judgement_behaviour_attitudes', label: 'Behaviour & Attitudes' },
  { key: 'judgement_personal_development', label: 'Personal Development' },
  { key: 'judgement_leadership_management', label: 'Leadership & Management' },
  { key: 'judgement_apprenticeships', label: 'Apprenticeships' },
];

const RAG_TONE: Record<Rag, Tone> = {
  red: 'red',
  amber: 'amber',
  green: 'emerald',
  grey: 'blue',
};

const RAG_LABEL: Record<Rag, string> = {
  red: 'Red',
  amber: 'Amber',
  green: 'Green',
  grey: 'Not tracked',
};

export default function SarDraftPage() {
  useSEO({
    title: 'Self-Assessment Report — College Hub',
    description: 'Ofsted-aligned SAR draft for your college.',
    noindex: true,
  });

  const { draft, drafts, loading, generating, error, generate, updateStatus } = useSarDraft();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Review queue — SARs awaiting HoD / admin sign-off across all years.
  // Skipped when the current draft is itself the only one in-review.
  const reviewQueue = drafts.filter(
    (d) => d.status === 'in_review' && d.id !== draft?.id
  );

  const handleGenerate = async (refresh = false) => {
    try {
      await generate({ refresh });
      toast({ title: 'SAR drafted', description: 'Review the judgements and edit before approval.' });
    } catch (e) {
      toast({
        title: 'SAR generation failed',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const handleApprove = async () => {
    if (!draft) return;
    try {
      await updateStatus(draft.id, 'approved');
      toast({ title: 'SAR approved', description: 'Locked as approved. Use Archive to retire.' });
    } catch (e) {
      toast({
        title: 'Could not approve',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Compliance"
        title="Self-Assessment Report"
        description={
          draft
            ? `Academic year ${draft.academic_year} • Status: ${draft.status}`
            : 'Draft a SAR from your live college signals — Ofsted EIF aligned.'
        }
        actions={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => navigate('/college/compliance')}>
              Back to Compliance Hub
            </SecondaryButton>
            {!draft || draft.status === 'archived' ? (
              <PrimaryButton onClick={() => handleGenerate(false)} disabled={generating}>
                {generating ? 'Drafting…' : 'Generate SAR'}
              </PrimaryButton>
            ) : (
              <>
                <SecondaryButton onClick={() => handleGenerate(true)} disabled={generating}>
                  {generating ? 'Regenerating…' : 'Regenerate'}
                </SecondaryButton>
                {draft.status === 'draft' && (
                  <PrimaryButton onClick={() => updateStatus(draft.id, 'in_review')}>
                    Send for review
                  </PrimaryButton>
                )}
                {draft.status === 'in_review' && (
                  <PrimaryButton onClick={handleApprove}>Approve</PrimaryButton>
                )}
              </>
            )}
          </div>
        }
      />

      {loading && (
        <div className="px-4 pb-12 text-sm text-white/60">Loading SAR…</div>
      )}

      {error && (
        <div className="mx-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && !draft && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mx-4 my-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-white/70"
        >
          No SAR draft for this academic year yet. Click <strong>Generate SAR</strong> to build one
          from your live signals — attendance, achievement, EPA outcomes, IQA findings and
          workforce qualifications. Drafts can be edited, regenerated, and approved.
        </motion.div>
      )}

      {/* HoD review queue — surfaces other SARs awaiting sign-off so an
          HoD can move between them without hunting through the URL bar. */}
      {!loading && reviewQueue.length > 0 && (
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mx-4 my-6 rounded-2xl border border-amber-400/30 bg-amber-500/[0.06] p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300">
                Pending review
              </div>
              <h2 className="mt-1 text-lg font-semibold text-white">
                {reviewQueue.length} SAR
                {reviewQueue.length === 1 ? '' : 's'} awaiting your sign-off
              </h2>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {reviewQueue.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <div className="min-w-0">
                  <div className="text-sm text-white truncate">
                    {d.title ?? `SAR ${d.academic_year}`}
                  </div>
                  <div className="text-[11px] text-white/50">
                    {d.academic_year} · sent for review{' '}
                    {new Date(d.updated_at).toLocaleDateString('en-GB')}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Pill tone="amber">In review</Pill>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await updateStatus(d.id, 'approved');
                        toast({ title: 'SAR approved' });
                      } catch (e) {
                        toast({
                          title: 'Could not approve',
                          description:
                            e instanceof Error ? e.message : String(e),
                          variant: 'destructive',
                        });
                      }
                    }}
                    className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-200 hover:bg-emerald-500/20 touch-manipulation"
                  >
                    Approve
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {!loading && draft && (
        <div className="px-4 pb-16 space-y-5">
          {/* Overall summary */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="text-lg font-semibold text-white">Overall summary</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/80">
              {draft.overall_summary || '—'}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-white/50">
                  Strengths
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-white/80">
                  {draft.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', toneDot.emerald)} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-white/50">
                  Areas for improvement
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-white/80">
                  {draft.areas_for_improvement.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', toneDot.amber)} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <SecondaryButton onClick={() => navigate('/college/compliance/qip')}>
                Open QIP tracker →
              </SecondaryButton>
            </div>
          </motion.section>

          {/* Per-judgement sections */}
          {JUDGEMENTS.map(({ key, label }) => {
            const j = draft[key] as SarJudgement | null;
            if (!j) return null;
            const isOpen = expanded === key;
            return (
              <motion.section
                key={key}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-white/10 bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : key)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left touch-manipulation"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Pill tone={RAG_TONE[j.rag]}>{RAG_LABEL[j.rag]}</Pill>
                      <h2 className="text-lg font-semibold text-white">{label}</h2>
                    </div>
                    <p className="mt-2 text-sm text-white/80">{j.summary}</p>
                  </div>
                  <span className="text-xs text-white/40">{isOpen ? 'Collapse' : 'Open'}</span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 p-5 space-y-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">
                      {j.narrative}
                    </p>

                    {j.evidence?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-white/50">
                          Evidence
                        </h4>
                        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                          {j.evidence.map((e, i) => (
                            <li
                              key={i}
                              className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm"
                            >
                              <div className="text-[11px] uppercase tracking-wide text-white/40">
                                {e.label}
                              </div>
                              <div className="text-white/90">{e.value}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {j.gaps?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-white/50">
                          Gaps to address
                        </h4>
                        <ul className="mt-2 space-y-1.5 text-sm text-white/80">
                          {j.gaps.map((g, i) => (
                            <li key={i} className="flex gap-2">
                              <span
                                className={cn(
                                  'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                                  toneDot.red
                                )}
                              />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>
      )}
    </PageFrame>
  );
}
