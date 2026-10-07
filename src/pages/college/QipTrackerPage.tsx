import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import {
  useQipActions,
  type QipAction,
  type QipPriority,
  type QipStatus,
  type QipJudgement,
} from '@/hooks/useQipActions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { BarList, SegmentBar, StatusPill, TONE_BG, type Tone } from '@/components/college/quality/QualityKit';
import { LEGACY_JUDGEMENTS, TOOLKIT_AREAS, TOOLKIT_GUIDE_URL } from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   QipTrackerPage — /college/compliance/qip
   ELE-923 (G3). The quality improvement plan: every action with its owner
   area, priority, target date and state.

   ELE-2021: actions are filed against the seven evaluation areas of Ofsted's
   renewed framework (from November 2025; verified at
   https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers),
   from ComplianceToolkit, plus "Across areas". Old judgement keys stay valid
   on older rows and are labelled with the area they now sit under.
   ========================================================================== */

const STATUS_COLS: Array<{ key: QipStatus; label: string; tone: Tone }> = [
  { key: 'planned', label: 'Planned', tone: 'info' },
  { key: 'in_progress', label: 'In progress', tone: 'volt' },
  { key: 'blocked', label: 'Blocked', tone: 'bad' },
  { key: 'completed', label: 'Completed', tone: 'good' },
];

const PRIORITIES: Array<{ key: QipPriority; label: string; tone: Tone }> = [
  { key: 'urgent', label: 'Urgent', tone: 'bad' },
  { key: 'high', label: 'High', tone: 'warn' },
  { key: 'medium', label: 'Medium', tone: 'volt' },
  { key: 'low', label: 'Low', tone: 'info' },
];
const PRIORITY_TONE = Object.fromEntries(PRIORITIES.map((p) => [p.key, p.tone])) as Record<QipPriority, Tone>;
const PRIORITY_LABEL = Object.fromEntries(PRIORITIES.map((p) => [p.key, p.label])) as Record<QipPriority, string>;

/** The areas a new action can be filed under. */
const AREA_KEYS: QipJudgement[] = [...TOOLKIT_AREAS.map((a) => a.key), 'cross_cutting'];

const AREA_LABEL: Record<QipJudgement, string> = {
  ...(Object.fromEntries(TOOLKIT_AREAS.map((a) => [a.key, a.title])) as Record<(typeof TOOLKIT_AREAS)[number]['key'], string>),
  cross_cutting: 'Across areas',
  // Older rows only: labelled by where they now sit.
  ...(Object.fromEntries(Object.entries(LEGACY_JUDGEMENTS).map(([k, v]) => [k, v.nowUnder])) as Record<
    'quality_of_education' | 'behaviour_and_attitudes' | 'personal_development' | 'leadership_and_management' | 'apprenticeships',
    string
  >),
};

const HELP: PageHelpContent = {
  id: 'college-qip',
  title: 'Quality improvement plan',
  what: 'Every action the college has agreed to improve quality, from the self-assessment, inspections and IQA. Each has an area, a priority, a target date and a state.',
  steps: [
    { title: 'Add an action', body: 'Say what will change and why, pick the area it improves, set a priority and a target date.' },
    { title: 'Move it on', body: 'Tap Move on as work progresses: planned, in progress, completed. Completed is the end. Tap Blocked when something outside your control is stopping it, and Move on when it is unblocked.' },
    { title: 'Watch the overdue count', body: 'Anything past its target date and not completed shows in orange. That is what an inspector will ask about.' },
  ],
  notes: [
    { title: 'Areas', body: 'Areas follow Ofsted’s renewed framework from November 2025: safeguarding, inclusion, leadership and governance, contribution to meeting skills needs, curriculum, teaching and training, achievement, and participation and development. Use “Across areas” for an action that touches several.' },
  ],
  legend: [
    { swatch: TONE_BG.info, label: 'Planned' },
    { swatch: TONE_BG.volt, label: 'In progress' },
    { swatch: TONE_BG.bad, label: 'Blocked' },
    { swatch: TONE_BG.good, label: 'Completed' },
  ],
  source: (
    <>
      Areas from Ofsted’s further education and skills inspection toolkit:{' '}
      <a className="underline" href={TOOLKIT_GUIDE_URL} target="_blank" rel="noreferrer">
        gov.uk
      </a>
      .
    </>
  ),
};

const todayIso = () => new Date().toISOString().slice(0, 10);
const isOverdue = (a: QipAction) =>
  Boolean(a.target_date) && a.status !== 'completed' && a.status !== 'cancelled' && (a.target_date as string).slice(0, 10) < todayIso();

const BLANK = {
  title: '',
  description: '',
  judgement_key: 'curriculum_teaching_training' as QipJudgement,
  priority: 'medium' as QipPriority,
  target_date: '',
};

export default function QipTrackerPage() {
  useSEO({
    title: 'Quality Improvement Plan — College Hub',
    description: 'Track quality improvement actions for your college.',
    noindex: true,
  });

  const { actions, loading, error, canDelete, create, update, remove } = useQipActions();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState(BLANK);
  const [area, setArea] = useState<QipJudgement | 'all'>('all');

  const visible = useMemo(() => actions.filter((a) => area === 'all' || a.judgement_key === area), [actions, area]);

  const grouped = useMemo(() => {
    const buckets: Record<QipStatus, QipAction[]> = {
      planned: [],
      in_progress: [],
      blocked: [],
      completed: [],
      cancelled: [],
    };
    for (const a of visible) buckets[a.status].push(a);
    return buckets;
  }, [visible]);

  const open = actions.filter((a) => a.status !== 'completed' && a.status !== 'cancelled');
  const overdue = actions.filter(isOverdue);
  const done = actions.filter((a) => a.status === 'completed');
  const byStatus = (s: QipStatus) => actions.filter((a) => a.status === s).length;

  const handleCreate = async () => {
    if (!draft.title.trim()) {
      toast({ title: 'Give the action a title', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await create({
        title: draft.title.trim(),
        description: draft.description.trim() || undefined,
        judgement_key: draft.judgement_key,
        priority: draft.priority,
        target_date: draft.target_date || null,
      });
      setShowNew(false);
      setDraft(BLANK);
      toast({ title: 'Action added' });
    } catch (e) {
      toast({
        title: 'Could not add action',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // Planned -> in progress -> completed, and stop there. A blocked action
  // moves back to in progress.
  const NEXT: Partial<Record<QipStatus, QipStatus>> = { planned: 'in_progress', in_progress: 'completed', blocked: 'in_progress' };
  const setStatus = async (a: QipAction, next: QipStatus) => {
    try {
      await update(a.id, { status: next });
    } catch (e) {
      toast({ title: 'Could not update the action', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
    }
  };
  const advance = (a: QipAction) => {
    const next = NEXT[a.status];
    if (next) void setStatus(a, next);
  };
  const handleDelete = async (a: QipAction) => {
    try {
      await remove(a.id);
      toast({ title: 'Action deleted' });
    } catch (e) {
      toast({ title: 'Could not delete the action', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Improvement plan" backTo="/college/compliance" />
      <HubBody pushContext="Get notified when improvement actions fall due">
        <CollegePageHeader
          eyebrow="Quality improvement plan"
          title={loading ? 'Improvement plan' : open.length ? `${open.length} open ${open.length === 1 ? 'action' : 'actions'}` : 'Improvement plan'}
          description="Actions from your self-assessment, inspections and IQA, each with an area, a priority and a target date."
          help={HELP}
          actions={
            <>
              <button type="button" onClick={() => navigate('/college/compliance/sar')} className={COLLEGE_BTN}>
                Self-assessment
              </button>
              <button type="button" onClick={() => setShowNew(true)} className={COLLEGE_BTN_PRIMARY}>
                New action
              </button>
            </>
          }
        />

        {error && <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13.5px] text-white')}>{error}</div>}

        {loading ? (
          <div className={cn(COLLEGE_CARD, 'text-[13.5px] text-white')}>Loading the plan…</div>
        ) : actions.length === 0 ? (
          <CollegeEmpty
            title="No improvement actions yet"
            body="Start with the areas for improvement in your self-assessment. Each one should become an action with an owner area, a priority and a target date."
            action={
              <button type="button" onClick={() => setShowNew(true)} className={COLLEGE_BTN_PRIMARY}>
                Add the first action
              </button>
            }
          />
        ) : (
          <AreaHero
            figures={[
              { label: 'Open actions', value: String(open.length) },
              { label: 'Overdue', value: String(overdue.length), warn: overdue.length > 0, sub: 'Past target, not completed' },
              { label: 'Blocked', value: String(byStatus('blocked')), warn: byStatus('blocked') > 0 },
              { label: 'Completed', value: `${done.length} of ${actions.length}`, good: done.length > 0 && done.length === actions.length },
            ]}
            chartTitle="Actions by state"
            chart={
              <SegmentBar
                segments={STATUS_COLS.map((c) => ({ label: c.label, n: byStatus(c.key), tone: c.tone }))}
              />
            }
            side={
              <div>
                <p className="mb-3 text-[13px] font-semibold text-white">Open actions by area</p>
                <BarList
                  rows={AREA_KEYS
                    .map((k) => ({ label: AREA_LABEL[k], n: open.filter((a) => a.judgement_key === k).length, tone: 'volt' as Tone, onClick: () => setArea(k) }))
                    .filter((r) => r.n > 0)}
                />
              </div>
            }
          />
        )}

        {actions.length > 0 && (
          <section className="space-y-4">
            <CollegeSectionTitle title="The plan" sub="Tap Move on to advance an action; completed is the end. Filter by area." />
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              <button type="button" onClick={() => setArea('all')} className={cn(chipCn(area === 'all'), 'h-11')}>
                All areas
              </button>
              {AREA_KEYS.map((k) => (
                <button key={k} type="button" onClick={() => setArea(k)} className={cn(chipCn(area === k), 'h-11')}>
                  {AREA_LABEL[k]}
                </button>
              ))}
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
              {STATUS_COLS.map((col) => (
                <motion.section key={col.key} variants={itemVariants} className={cn(COLLEGE_CARD, 'sm:p-5')}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className={cn('h-2.5 w-2.5 rounded-full', TONE_BG[col.tone])} aria-hidden />
                    <h3 className="text-[15px] font-semibold text-white">{col.label}</h3>
                    <span className="ml-auto text-[13px] font-semibold tabular-nums text-white">{grouped[col.key].length}</span>
                  </div>
                  {grouped[col.key].length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-white/[0.12] px-3 py-6 text-center text-[12.5px] text-white">None here</p>
                  ) : (
                    <ul className="space-y-3">
                      {grouped[col.key].map((a) => (
                        <ActionCard
                          key={a.id}
                          a={a}
                          onAdvance={NEXT[a.status] ? () => advance(a) : undefined}
                          onBlock={a.status === 'planned' || a.status === 'in_progress' ? () => void setStatus(a, 'blocked') : undefined}
                          onDelete={canDelete ? () => void handleDelete(a) : undefined}
                        />
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}
            </motion.div>
          </section>
        )}

        <FormSheet
          open={showNew}
          onOpenChange={setShowNew}
          eyebrow="Improvement plan"
          title="New action"
          description="What will change, which area it improves, and by when."
          width="wide"
          footer={
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowNew(false)} className={COLLEGE_BTN}>
                Cancel
              </button>
              <button type="button" onClick={handleCreate} disabled={saving} className={COLLEGE_BTN_PRIMARY}>
                {saving ? 'Adding…' : 'Add action'}
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className={labelCn} htmlFor="qip-title">Title</label>
                <input
                  id="qip-title"
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="e.g. Sign off off-the-job hours within 5 days"
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="qip-desc">What needs to happen and why</label>
                <textarea
                  id="qip-desc"
                  value={draft.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  rows={4}
                  className={textareaCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="qip-date">Target date</label>
                <input
                  id="qip-date"
                  type="date"
                  value={draft.target_date}
                  onChange={(e) => setDraft((d) => ({ ...d, target_date: e.target.value }))}
                  className={inputCn}
                />
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <p className={labelCn}>Area it improves</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {AREA_KEYS.map((k) => (
                    <button key={k} type="button" onClick={() => setDraft((d) => ({ ...d, judgement_key: k }))} className={cn(chipCn(draft.judgement_key === k), 'h-11')}>
                      {AREA_LABEL[k]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className={labelCn}>Priority</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {PRIORITIES.map((p) => (
                    <button key={p.key} type="button" onClick={() => setDraft((d) => ({ ...d, priority: p.key }))} className={cn(chipCn(draft.priority === p.key), 'h-11')}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FormSheet>
      </HubBody>
    </HubPage>
  );
}

function ActionCard({
  a,
  onAdvance,
  onBlock,
  onDelete,
}: {
  a: QipAction;
  onAdvance?: () => void;
  onBlock?: () => void;
  onDelete?: () => void;
}) {
  const late = isOverdue(a);
  return (
    <li className={cn('rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4', late && 'border-orange-400/50')}>
      <p className="text-[14px] font-semibold leading-snug text-white">{a.title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <StatusPill tone={PRIORITY_TONE[a.priority]}>{PRIORITY_LABEL[a.priority]}</StatusPill>
        {a.target_date && (
          <StatusPill tone={late ? 'warn' : 'neutral'}>
            {late ? 'Overdue, ' : 'By '}
            {new Date(a.target_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </StatusPill>
        )}
      </div>
      <p className="mt-2 text-[12px] text-white">{AREA_LABEL[a.judgement_key]}</p>
      {a.description && <p className="mt-2 text-[12.5px] leading-snug text-white">{a.description}</p>}
      {a.progress_percent > 0 && a.status !== 'completed' && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${a.progress_percent}%` }} />
        </div>
      )}
      {(onAdvance || onBlock || onDelete) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {onAdvance && (
            <button type="button" onClick={onAdvance} className={cn(COLLEGE_BTN, 'flex-1')}>
              Move on
            </button>
          )}
          {onBlock && (
            <button type="button" onClick={onBlock} className={COLLEGE_BTN}>
              Blocked
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => {
                if (confirm(`Delete "${a.title}"?`)) onDelete();
              }}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-red-400/40 px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:bg-red-500/10"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </li>
  );
}
