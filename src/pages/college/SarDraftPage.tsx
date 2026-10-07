import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useSarDraft, type SarAreaSection, type SarJudgement, type Rag, type SarDraft, type SarStatus } from '@/hooks/useSarDraft';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LINK,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { Donut, StatusPill, TONE_BG, type Tone } from '@/components/college/quality/QualityKit';
import {
  AREA_GRADE_LABEL,
  LEGACY_JUDGEMENTS,
  RAG_TONE,
  TOOLKIT_AREAS,
  TOOLKIT_GUIDE_URL,
  type AreaGradeKey,
} from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   SarDraftPage — /college/compliance/sar
   ELE-922 (G2). The self-assessment report draft: generate, read, send for
   review, approve.

   ELE-2021: Ofsted's renewed framework (from November 2025; FE and skills
   toolkit v2.0 for inspections from 1 September 2026) replaced the five
   judgements with evaluation areas. Verified 7 Oct 2026 at
   https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025
   The ai-generate-sar edge function writes one section per evaluation area
   into college_sar_drafts.evaluation_areas, each with a self-assessed grade
   (five-point scale; safeguarding met / not met). Drafts written before
   7 Oct 2026 hold the old judgement_* columns; they still open, under their
   saved headings, with where each section now sits.
   ========================================================================== */

type LegacyKey = keyof Pick<
  SarDraft,
  | 'judgement_quality_of_education'
  | 'judgement_behaviour_attitudes'
  | 'judgement_personal_development'
  | 'judgement_leadership_management'
  | 'judgement_apprenticeships'
>;

/** Older drafts only: column → legacy judgement key (labels come from the toolkit). */
const LEGACY_COLUMNS: Array<{ key: LegacyKey; oldKey: string }> = [
  { key: 'judgement_quality_of_education', oldKey: 'quality_of_education' },
  { key: 'judgement_behaviour_attitudes', oldKey: 'behaviour_and_attitudes' },
  { key: 'judgement_personal_development', oldKey: 'personal_development' },
  { key: 'judgement_leadership_management', oldKey: 'leadership_and_management' },
  { key: 'judgement_apprenticeships', oldKey: 'apprenticeships' },
];

interface Section {
  key: string;
  label: string;
  /** Under the heading: the area's scale, or where an old heading now sits. */
  sub: string;
  grade: AreaGradeKey | null;
  body: SarJudgement;
}

function sectionsOf(draft: SarDraft): Section[] {
  if (draft.evaluation_areas) {
    return TOOLKIT_AREAS.flatMap((a) => {
      const body = draft.evaluation_areas?.[a.key] as SarAreaSection | undefined;
      return body ? [{ key: a.key, label: a.title, sub: a.scale, grade: body.grade ?? null, body }] : [];
    });
  }
  return LEGACY_COLUMNS.flatMap(({ key, oldKey }) => {
    const body = draft[key] as SarJudgement | null;
    const legacy = LEGACY_JUDGEMENTS[oldKey];
    return body ? [{ key, label: legacy.label, sub: `Now sits under: ${legacy.nowUnder}`, grade: null, body }] : [];
  });
}

const GRADE_TONE: Record<AreaGradeKey, Tone> = {
  exceptional: 'good',
  strong_standard: 'good',
  expected_standard: 'info',
  needs_attention: 'warn',
  urgent_improvement: 'bad',
  met: 'good',
  not_met: 'bad',
  not_enough_evidence: 'neutral',
};

const RAG_LABEL: Record<Rag, string> = {
  red: 'Gaps to close',
  amber: 'Some gaps',
  green: 'Evidence in place',
  grey: 'Not tracked',
};

const STATUS_LABEL: Record<SarStatus, string> = {
  draft: 'Draft',
  in_review: 'In review',
  approved: 'Approved',
  archived: 'Archived',
};
const STATUS_TONE: Record<SarStatus, Tone> = { draft: 'neutral', in_review: 'warn', approved: 'good', archived: 'neutral' };

const STEPS: SarStatus[] = ['draft', 'in_review', 'approved'];

const HELP: PageHelpContent = {
  id: 'college-sar-draft',
  title: 'Self-assessment report',
  what: 'A first draft of your annual self-assessment, written from what the college already records: attendance, achievement, end-point assessment, IQA and staff. You read and challenge it, send it for review, and an admin or head of department approves it.',
  steps: [
    { title: 'Generate the draft', body: 'Mate reads your live records and writes a summary, strengths, areas for improvement and a section for each Ofsted evaluation area, with a self-assessed grade and its evidence.' },
    { title: 'Read and challenge it', body: 'Open each section and check every figure against the evidence. The draft itself is not edited here: if something is wrong, correct the record it came from and regenerate the draft.' },
    { title: 'Send for review, then approve', body: 'Only an admin or head of department can approve. An approved draft is locked; if things change, start a new draft and the approved one stays in the history.' },
    { title: 'Look back at older drafts', body: 'Every draft stays under All drafts. Tap one to read it; older drafts open read-only.' },
    { title: 'Turn weaknesses into actions', body: 'Every area for improvement should become an action in the quality improvement plan, with an owner and a date.' },
  ],
  notes: [
    {
      title: 'The new Ofsted framework',
      body: 'Ofsted now inspects further education and skills on evaluation areas, not the old five judgements: safeguarding, inclusion, leadership and governance, contribution to meeting skills needs, and for each type of provision, curriculum, teaching and training, achievement, and participation and development. Safeguarding is met or not met; the rest use five grades from exceptional to urgent improvement. There is no overall grade. Drafts made before October 2026 keep their old headings and show where each now sits.',
    },
  ],
  legend: [
    { swatch: TONE_BG.good, label: 'Evidence in place' },
    { swatch: TONE_BG.warn, label: 'Some gaps' },
    { swatch: TONE_BG.bad, label: 'Gaps to close' },
    { swatch: TONE_BG.neutral, label: 'Not tracked' },
  ],
  source: (
    <>
      Ofsted, Further education and skills inspection toolkit and guide for providers:{' '}
      <a className="underline" href={TOOLKIT_GUIDE_URL} target="_blank" rel="noreferrer">
        gov.uk
      </a>
      .
    </>
  ),
};

export default function SarDraftPage() {
  useSEO({
    title: 'Self-Assessment Report — College Hub',
    description: 'Ofsted-aligned SAR draft for your college.',
    noindex: true,
  });

  const { draft: current, drafts, loading, generating, error, generate, updateStatus } = useSarDraft();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState<string | null>(null);
  // An older draft picked from All drafts opens read-only in place of the current one.
  const [viewingId, setViewingId] = useState<string | null>(null);
  const viewing = viewingId ? (drafts.find((d) => d.id === viewingId) ?? null) : null;
  const draft = viewing ?? current;
  const readOnly = Boolean(viewing && viewing.id !== current?.id);

  // Only an admin or head of department may approve (enforced by RLS on
  // college_sar_drafts; this just hides a button that would fail).
  const collegeId = current?.college_id ?? null;
  const [isLeader, setIsLeader] = useState(false);
  useEffect(() => {
    let live = true;
    if (!collegeId) {
      setIsLeader(false);
      return;
    }
    void supabase.rpc('_college_leader' as never, { p_college: collegeId } as never).then(({ data }) => {
      if (live) setIsLeader(data === true);
    });
    return () => {
      live = false;
    };
  }, [collegeId]);

  // Review queue — SARs awaiting HoD / admin sign-off across all years.
  const reviewQueue = drafts.filter((d) => d.status === 'in_review' && d.id !== current?.id);

  const handleGenerate = async (refresh = false) => {
    try {
      await generate({ refresh });
      toast({ title: 'SAR drafted', description: 'Read each section and check the figures before you send it for review.' });
    } catch (e) {
      toast({
        title: 'SAR generation failed',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const approve = async (id: string) => {
    try {
      await updateStatus(id, 'approved');
      toast({ title: 'SAR approved', description: 'Locked as approved.' });
    } catch (e) {
      toast({
        title: 'Could not approve',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const sendForReview = async (id: string) => {
    try {
      await updateStatus(id, 'in_review');
      toast({ title: 'Sent for review' });
    } catch (e) {
      toast({ title: 'Could not send', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
    }
  };

  const sections = draft ? sectionsOf(draft) : [];
  const isLegacy = Boolean(draft && !draft.evaluation_areas);
  const ragCount = (r: Rag) => sections.filter((s) => s.body?.rag === r).length;

  const actions = readOnly ? (
    <button type="button" onClick={() => setViewingId(null)} className={COLLEGE_BTN_PRIMARY}>
      Back to the current draft
    </button>
  ) : !draft || draft.status === 'archived' ? (
    <button type="button" onClick={() => handleGenerate(false)} disabled={generating} className={COLLEGE_BTN_PRIMARY}>
      {generating ? 'Drafting…' : 'Generate SAR'}
    </button>
  ) : (
    <>
      {draft.status === 'approved' ? (
        // An approved draft is never replaced: a new one is added and the
        // approved one stays under All drafts.
        <button type="button" onClick={() => handleGenerate(true)} disabled={generating} className={COLLEGE_BTN}>
          {generating ? 'Drafting…' : 'Start a new draft'}
        </button>
      ) : (
        <button type="button" onClick={() => handleGenerate(true)} disabled={generating} className={COLLEGE_BTN}>
          {generating ? 'Regenerating…' : 'Regenerate'}
        </button>
      )}
      {draft.status === 'draft' && (
        <button type="button" onClick={() => sendForReview(draft.id)} className={COLLEGE_BTN_PRIMARY}>
          Send for review
        </button>
      )}
      {draft.status === 'in_review' && isLeader && (
        <button type="button" onClick={() => approve(draft.id)} className={COLLEGE_BTN_PRIMARY}>
          Approve
        </button>
      )}
    </>
  );

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Self-assessment" backTo="/college/compliance" />
      <HubBody pushContext="Get notified when a self-assessment is sent to you for review">
        <CollegePageHeader
          eyebrow="Self-assessment"
          title="Self-assessment report"
          description={
            draft
              ? `Academic year ${draft.academic_year}. ${STATUS_LABEL[draft.status]}${draft.approved_at ? `, approved ${new Date(draft.approved_at).toLocaleDateString('en-GB')}` : ''}.`
              : 'Draft your annual self-assessment from what the college already records, then review and approve it.'
          }
          help={HELP}
          actions={actions}
        />

        {error && <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13.5px] text-white')}>{error}</div>}

        {readOnly && draft && (
          <div className={cn(COLLEGE_CARD, 'border-sky-400/40')}>
            <p className="text-[14.5px] font-semibold text-white">Reading an older draft</p>
            <p className="mt-1 text-[13.5px] text-white">
              {draft.title ?? `SAR ${draft.academic_year}`}, {STATUS_LABEL[draft.status].toLowerCase()}. Older drafts open read-only.
            </p>
          </div>
        )}

        {!readOnly && draft?.status === 'in_review' && !isLeader && (
          <div className={COLLEGE_CARD}>
            <p className="text-[14.5px] font-semibold text-white">Waiting for approval</p>
            <p className="mt-1 text-[13.5px] text-white">Only an admin or head of department at your college can approve a self-assessment.</p>
          </div>
        )}

        {loading ? (
          <div className={cn(COLLEGE_CARD, 'text-[13.5px] text-white')}>Loading your self-assessment…</div>
        ) : !draft ? (
          <NoDraft generating={generating} onGenerate={() => handleGenerate(false)} />
        ) : (
          <>
            <AreaHero
              figures={[
                { label: 'Status', value: STATUS_LABEL[draft.status], good: draft.status === 'approved', warn: draft.status === 'in_review', sub: `Academic year ${draft.academic_year}` },
                { label: 'Evidence in place', value: `${ragCount('green')} of ${sections.length}`, good: sections.length > 0 && ragCount('green') === sections.length },
                { label: 'Strengths', value: String(draft.strengths.length) },
                { label: 'Areas for improvement', value: String(draft.areas_for_improvement.length), warn: draft.areas_for_improvement.length > 0, sub: 'Each one belongs in the QIP' },
              ]}
              chartTitle="Sections by evidence"
              chart={
                <Donut
                  centre={String(sections.length)}
                  centreSub="sections"
                  segments={[
                    { label: 'Evidence in place', n: ragCount('green'), tone: 'good' },
                    { label: 'Some gaps', n: ragCount('amber'), tone: 'warn' },
                    { label: 'Gaps to close', n: ragCount('red'), tone: 'bad' },
                    { label: 'Not tracked', n: ragCount('grey'), tone: 'neutral' },
                  ]}
                />
              }
              side={
                <div>
                  <p className="mb-3 text-[13px] font-semibold text-white">Sign-off</p>
                  <ol className="space-y-2">
                    {STEPS.map((s, i) => {
                      const reached = STEPS.indexOf(draft.status) >= i;
                      return (
                        <li key={s} className="flex items-center gap-2.5 text-[13px] text-white">
                          <span
                            className={cn(
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold',
                              reached ? 'border-emerald-400 bg-emerald-500/20' : 'border-white/[0.14]'
                            )}
                          >
                            {i + 1}
                          </span>
                          {STATUS_LABEL[s]}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              }
            />

            {isLegacy && <FrameworkNotice />}

            {!readOnly && reviewQueue.length > 0 && <ReviewQueue queue={reviewQueue} onApprove={approve} canApprove={isLeader} />}

            <section className="space-y-4">
              <CollegeSectionTitle
                title="Overall summary"
                action={
                  <button type="button" onClick={() => navigate('/college/compliance/qip')} className={COLLEGE_LINK}>
                    Open improvement plan
                  </button>
                }
              />
              <motion.div variants={itemVariants} initial="hidden" animate="visible" className={COLLEGE_CARD}>
                <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">{draft.overall_summary || 'No summary written yet.'}</p>
                <div className="mt-6 grid grid-cols-1 gap-6 border-t border-white/[0.06] pt-5 lg:grid-cols-2">
                  <BulletList title="Strengths" items={draft.strengths} dot="bg-emerald-400" />
                  <BulletList title="Areas for improvement" items={draft.areas_for_improvement} dot="bg-orange-400" />
                </div>
              </motion.div>
            </section>

            <section className="space-y-4">
              <CollegeSectionTitle title="Sections" sub="Tap a section to read the narrative, evidence and gaps." />
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
                {sections.map(({ key, label, sub, grade, body }) => {
                  const j = body;
                  const isOpen = expanded === key;
                  return (
                    <motion.section
                      key={key}
                      variants={itemVariants}
                      className={cn(
                        '-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x',
                        isOpen && 'lg:col-span-2'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-4 p-5 text-left touch-manipulation sm:p-6"
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[16px] font-semibold text-white">{label}</span>
                            {grade && <StatusPill tone={GRADE_TONE[grade] ?? 'neutral'}>{AREA_GRADE_LABEL[grade] ?? grade}</StatusPill>}
                            <StatusPill tone={RAG_TONE[j.rag]}>{RAG_LABEL[j.rag]}</StatusPill>
                          </span>
                          <span className="mt-1 block text-[12px] text-white">{sub}</span>
                          <span className="mt-2 block text-[13.5px] leading-snug text-white">{j.summary}</span>
                        </span>
                        <ChevronDown className={cn('mt-1 h-5 w-5 shrink-0 text-white transition-transform', isOpen && 'rotate-180')} aria-hidden />
                      </button>
                      {isOpen && (
                        <div className="space-y-5 border-t border-white/[0.06] p-5 sm:p-6">
                          <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">{j.narrative}</p>
                          {j.evidence?.length > 0 && (
                            <div>
                              <p className="text-[13px] font-semibold text-white">Evidence</p>
                              <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                                {j.evidence.map((e, i) => (
                                  <div key={i} className="rounded-2xl border border-white/[0.08] px-4 py-3">
                                    <dt className="text-[12px] text-white">{e.label}</dt>
                                    <dd className="mt-0.5 text-[14px] font-semibold text-white">{e.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          )}
                          {j.gaps?.length > 0 && <BulletList title="Gaps to address" items={j.gaps} dot="bg-red-400" />}
                        </div>
                      )}
                    </motion.section>
                  );
                })}
              </motion.div>
            </section>

            {drafts.length > 1 && (
              <section className="space-y-4">
                <CollegeSectionTitle title="All drafts" sub="Every self-assessment this college has drafted. Tap one to read it; older drafts open read-only." />
                <ul className={COLLEGE_LIST}>
                  {drafts.map((d) => {
                    const isShown = d.id === draft.id;
                    const isCurrent = d.id === current?.id;
                    return (
                      <li key={d.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setViewingId(isCurrent ? null : d.id);
                            setExpanded(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          aria-current={isShown ? 'true' : undefined}
                          className={cn(
                            'flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left touch-manipulation sm:px-6',
                            isShown && 'bg-white/[0.05]'
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-medium text-white">{d.title ?? `SAR ${d.academic_year}`}</span>
                            <span className="block text-[12px] text-white">
                              {d.academic_year} · updated {new Date(d.updated_at).toLocaleDateString('en-GB')}
                              {isCurrent ? ' · current' : isShown ? ' · reading now' : ''}
                            </span>
                          </span>
                          <StatusPill tone={STATUS_TONE[d.status]}>{STATUS_LABEL[d.status]}</StatusPill>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </>
        )}
      </HubBody>
    </HubPage>
  );
}

function BulletList({ title, items, dot }: { title: string; items: string[]; dot: string }) {
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

function FrameworkNotice({ hasDraft = true }: { hasDraft?: boolean }) {
  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible" className={cn(COLLEGE_CARD, hasDraft && 'border-orange-400/40')}>
      <p className="text-[14.5px] font-semibold text-white">{hasDraft ? 'Written under the old headings' : 'Written against Ofsted’s areas from November 2025'}</p>
      <p className="mt-1.5 max-w-4xl text-[13.5px] leading-relaxed text-white">
        {hasDraft
          ? 'This draft was made before October 2026, under judgements Ofsted no longer uses. Since November 2025 it grades evaluation areas instead, and there is no overall effectiveness grade. Each section shows where its evidence now sits. Generate a new draft to get one written against the new areas.'
          : 'Each draft has a section per evaluation area, with a self-assessed grade: met or not met for safeguarding, five grades from exceptional to urgent improvement for the rest. There is no overall effectiveness grade.'}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {TOOLKIT_AREAS.map((a) => (
          <span key={a.key} className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-[12px] text-white">
            {a.title}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ReviewQueue({ queue, onApprove, canApprove }: { queue: SarDraft[]; onApprove: (id: string) => void; canApprove: boolean }) {
  const n = `${queue.length} ${queue.length === 1 ? 'draft' : 'drafts'}`;
  return (
    <section className="space-y-4">
      <CollegeSectionTitle
        title={canApprove ? `${n} waiting for your sign-off` : `${n} waiting for sign-off`}
        sub={canApprove ? undefined : 'An admin or head of department approves these.'}
      />
      <ul className={COLLEGE_LIST}>
        {queue.map((d) => (
          <li key={d.id} className="flex min-h-[60px] flex-wrap items-center gap-3 px-5 py-3 sm:px-6">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium text-white">{d.title ?? `SAR ${d.academic_year}`}</span>
              <span className="block text-[12px] text-white">
                {d.academic_year} · sent for review {new Date(d.updated_at).toLocaleDateString('en-GB')}
              </span>
            </span>
            <StatusPill tone="warn">In review</StatusPill>
            {canApprove && (
              <button type="button" onClick={() => onApprove(d.id)} className={COLLEGE_BTN_PRIMARY}>
                Approve
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function NoDraft({ generating, onGenerate }: { generating: boolean; onGenerate: () => void }) {
  const sources = [
    { title: 'Attendance and punctuality', body: 'From your registers.' },
    { title: 'Achievement and end-point assessment', body: 'Predicted grades and results.' },
    { title: 'IQA findings', body: 'Sampling verdicts and actions.' },
    { title: 'Staff and policies', body: 'Qualifications, records and sign-offs.' },
  ];
  return (
    <>
      <CollegeEmpty
        title="No self-assessment for this academic year yet"
        body="Generate a first draft from your live records. You can read it, regenerate it and send it for review; an admin or head of department approves it."
        action={
          <button type="button" onClick={onGenerate} disabled={generating} className={COLLEGE_BTN_PRIMARY}>
            {generating ? 'Drafting…' : 'Generate SAR'}
          </button>
        }
      />
      <section className="space-y-4">
        <CollegeSectionTitle title="What the draft reads" />
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {sources.map((s) => (
            <div key={s.title} className={cn(COLLEGE_CARD, 'h-full')}>
              <p className="text-[14.5px] font-semibold text-white">{s.title}</p>
              <p className="mt-1 text-[13px] text-white">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <FrameworkNotice hasDraft={false} />
    </>
  );
}
