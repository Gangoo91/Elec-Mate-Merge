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
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { ChoiceGrid, JoinedToggle, QuietTabs } from '@/components/college/quality/QualityChoices';
import {
  QBTN as COLLEGE_BTN,
  QBTN_PRIMARY as COLLEGE_BTN_PRIMARY,
  QCARD as COLLEGE_CARD,
  QLIST,
  QualityHeader,
} from '@/components/college/quality/QualityHubKit';
import { joinAnd, plural } from '@/components/college/quality/qualityText';
import { useSarDraft } from '@/hooks/useSarDraft';
import {
  BarList,
  SegmentBar,
  StatusPill,
  TONE_BG,
  type Tone,
} from '@/components/college/quality/QualityKit';
import {
  LEGACY_JUDGEMENTS,
  TOOLKIT_AREAS,
  TOOLKIT_GUIDE_URL,
} from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   QipTrackerPage — /college/compliance/qip
   ELE-923 (G3). The quality improvement plan: every action with its owner
   area, priority, target date and state.

   ELE-2021: actions are filed against the seven evaluation areas of Ofsted's
   renewed framework (from November 2025; verified at
   https://www.gov.uk/guidance/inspecting-further-education-and-skills-guide-for-providers),
   from ComplianceToolkit, plus "Across areas". Old judgement keys stay valid
   on older rows and are labelled with the area they now sit under.

   8 Oct 2026: "From the self-assessment" lists the current SAR draft's areas
   for improvement that are not yet actions, each one tap from a prefilled
   new action (linked back with sar_draft_id and the SAR wording kept as the
   rationale). The header sentence carries open / overdue / blocked.
   ========================================================================== */

const STATUS_COLS: Array<{ key: QipStatus; label: string; tone: Tone }> = [
  { key: 'planned', label: 'Planned', tone: 'neutral' },
  { key: 'in_progress', label: 'In progress', tone: 'warn' },
  { key: 'blocked', label: 'Blocked', tone: 'bad' },
  { key: 'completed', label: 'Completed', tone: 'good' },
];

const PRIORITIES: Array<{ key: QipPriority; label: string; tone: Tone }> = [
  { key: 'urgent', label: 'Urgent', tone: 'bad' },
  { key: 'high', label: 'High', tone: 'warn' },
  { key: 'medium', label: 'Medium', tone: 'neutral' },
  { key: 'low', label: 'Low', tone: 'neutral' },
];
const PRIORITY_TONE = Object.fromEntries(PRIORITIES.map((p) => [p.key, p.tone])) as Record<
  QipPriority,
  Tone
>;
const PRIORITY_LABEL = Object.fromEntries(PRIORITIES.map((p) => [p.key, p.label])) as Record<
  QipPriority,
  string
>;

/** The areas a new action can be filed under. */
const AREA_KEYS: QipJudgement[] = [...TOOLKIT_AREAS.map((a) => a.key), 'cross_cutting'];

const AREA_LABEL: Record<QipJudgement, string> = {
  ...(Object.fromEntries(TOOLKIT_AREAS.map((a) => [a.key, a.title])) as Record<
    (typeof TOOLKIT_AREAS)[number]['key'],
    string
  >),
  cross_cutting: 'Across areas',
  // Older rows only: labelled by where they now sit.
  ...(Object.fromEntries(
    Object.entries(LEGACY_JUDGEMENTS).map(([k, v]) => [k, v.nowUnder])
  ) as Record<
    | 'quality_of_education'
    | 'behaviour_and_attitudes'
    | 'personal_development'
    | 'leadership_and_management'
    | 'apprenticeships',
    string
  >),
};

const HELP: PageHelpContent = {
  id: 'college-qip',
  title: 'Quality improvement plan',
  what: 'Every action the college has agreed to improve quality, from the self-assessment, inspections and IQA. Each has an area, a priority, a target date and a state.',
  steps: [
    {
      title: 'Add an action',
      body: 'Say what will change and why, pick the area it improves, set a priority and a target date.',
    },
    {
      title: 'Move it on',
      body: 'Tap Move on as work progresses: planned, in progress, completed. Completed is the end. Tap Blocked when something outside your control is stopping it, and Move on when it is unblocked.',
    },
    {
      title: 'Watch the overdue count',
      body: 'Anything past its target date and not completed shows in orange. That is what an inspector will ask about.',
    },
  ],
  notes: [
    {
      title: 'Areas',
      body: 'Areas follow Ofsted’s renewed framework from November 2025: safeguarding, inclusion, leadership and governance, contribution to meeting skills needs, curriculum, teaching and training, achievement, and participation and development. Use “Across areas” for an action that touches several.',
    },
  ],
  legend: [
    { swatch: TONE_BG.neutral, label: 'Planned' },
    { swatch: TONE_BG.warn, label: 'In progress' },
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

/** A first guess at the area from the SAR wording; the tutor can change it. */
const AREA_WORDS: Array<[QipJudgement, RegExp]> = [
  ['safeguarding', /safeguard|prevent|\bdsl\b/i],
  ['inclusion', /inclusi|barrier|send\b|disadvantag/i],
  ['skills_needs', /employer|skills need|local skills/i],
  ['achievement', /achiev|\bepa\b|grades?\b|outcome/i],
  [
    'participation_development',
    /attendance|punctual|british values|careers|wellbeing|personal development/i,
  ],
  ['curriculum_teaching_training', /curriculum|teaching|off-the-job|assessment|review/i],
  ['leadership_governance', /leader|governance|quality assurance|\biqa\b|polic/i],
];
function guessArea(text: string): QipJudgement {
  const hits = AREA_WORDS.filter(([, re]) => re.test(text));
  return hits.length === 1 ? hits[0][0] : 'cross_cutting';
}

const todayIso = () => new Date().toISOString().slice(0, 10);
const isOverdue = (a: QipAction) =>
  Boolean(a.target_date) &&
  a.status !== 'completed' &&
  a.status !== 'cancelled' &&
  (a.target_date as string).slice(0, 10) < todayIso();

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
  const [fromSar, setFromSar] = useState<string | null>(null);
  const { draft: sar } = useSarDraft();

  /* The SAR's areas for improvement that are not yet an action. */
  const sarTodo = useMemo(() => {
    if (!sar) return [];
    const done = new Set(
      actions.filter((a) => a.sar_draft_id === sar.id).map((a) => (a.rationale ?? '').trim())
    );
    return sar.areas_for_improvement.filter((t) => !done.has(t.trim()));
  }, [sar, actions]);
  const startFromSar = (text: string) => {
    // A short title from the first clause; the full SAR wording stays as the rationale.
    const first = text.split(/[.;:](?:\s|$)|,\s(?:particularly|including|because)\s/)[0].trim();
    setDraft({
      ...BLANK,
      judgement_key: guessArea(text),
      title: first.length > 120 ? `${first.slice(0, 117)}…` : first,
      description: text,
    });
    setFromSar(text);
    setShowNew(true);
  };

  const visible = useMemo(
    () => actions.filter((a) => area === 'all' || a.judgement_key === area),
    [actions, area]
  );

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
        ...(fromSar && sar ? { sar_draft_id: sar.id, rationale: fromSar } : {}),
        priority: draft.priority,
        target_date: draft.target_date || null,
      });
      setShowNew(false);
      setDraft(BLANK);
      setFromSar(null);
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
  const NEXT: Partial<Record<QipStatus, QipStatus>> = {
    planned: 'in_progress',
    in_progress: 'completed',
    blocked: 'in_progress',
  };
  const setStatus = async (a: QipAction, next: QipStatus) => {
    try {
      await update(a.id, { status: next });
    } catch (e) {
      toast({
        title: 'Could not update the action',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
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
      toast({
        title: 'Could not delete the action',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Improvement plan" backTo="/college/compliance" />
      <HubBody pushContext="Get notified when improvement actions fall due">
        <QualityHeader
          eyebrow="Quality improvement plan"
          title="Improvement plan"
          summary={
            loading
              ? 'Loading the plan…'
              : actions.length === 0
                ? 'No actions yet. Every area for improvement in your self-assessment should become one, with an area, a priority and a target date.'
                : `${plural(open.length, 'open action')}${
                    overdue.length + byStatus('blocked') > 0
                      ? `: ${joinAnd([overdue.length > 0 ? `${overdue.length} past ${overdue.length === 1 ? 'its' : 'their'} target date` : '', byStatus('blocked') > 0 ? `${byStatus('blocked')} blocked` : ''].filter(Boolean))}`
                      : ', none overdue'
                  }. ${done.length} of ${plural(actions.length, 'action')} completed.`
          }
          sub={
            sarTodo.length > 0
              ? `${plural(sarTodo.length, 'area', 'areas')} for improvement in the self-assessment ${sarTodo.length === 1 ? 'is' : 'are'} not an action yet.`
              : undefined
          }
          help={HELP}
          actions={
            <button
              type="button"
              onClick={() => navigate('/college/compliance/sar')}
              className={COLLEGE_BTN}
            >
              Self-assessment
            </button>
          }
          primary={
            <button
              type="button"
              onClick={() => {
                setDraft(BLANK);
                setFromSar(null);
                setShowNew(true);
              }}
              className={COLLEGE_BTN_PRIMARY}
            >
              New action
            </button>
          }
        />

        {error && (
          <div className={cn(COLLEGE_CARD, '!border-orange-400/50 text-[13.5px] text-white')}>
            {error}
          </div>
        )}

        {!loading && sarTodo.length > 0 && (
          <section className="space-y-4">
            <CollegeSectionTitle
              title="From the self-assessment"
              sub={`Areas for improvement in the ${sar?.academic_year ?? 'current'} draft with no action yet. Add each one with an owner area and a date.`}
            />
            <ul className={QLIST}>
              {sarTodo.map((t) => (
                <li
                  key={t}
                  className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-5"
                >
                  <p className="min-w-0 flex-1 text-[13.5px] leading-snug text-white">{t}</p>
                  <button
                    type="button"
                    onClick={() => startFromSar(t)}
                    className={cn(COLLEGE_BTN, 'w-full shrink-0 sm:w-auto')}
                  >
                    Add as action
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {loading ? null : actions.length === 0 && sarTodo.length === 0 ? (
          <div
            className={cn(
              COLLEGE_CARD,
              'flex flex-col items-start gap-2 sm:items-center sm:py-10 sm:text-center'
            )}
          >
            <p className="text-[15px] font-semibold text-white">No improvement actions yet</p>
            <p className="max-w-xl text-[13.5px] leading-relaxed text-white">
              Draft the self-assessment first: its areas for improvement appear here, one tap from
              an action. Or add one with New action.
            </p>
          </div>
        ) : actions.length === 0 ? null : (
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={COLLEGE_CARD}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-[13px] font-semibold text-white">Actions by state</p>
                <SegmentBar
                  segments={STATUS_COLS.map((c) => ({
                    label: c.label,
                    n: byStatus(c.key),
                    tone: c.tone,
                  }))}
                />
              </div>
              <div>
                <p className="mb-3 text-[13px] font-semibold text-white">Open actions by area</p>
                <BarList
                  wideLabels
                  rows={AREA_KEYS.map((k) => ({
                    label: AREA_LABEL[k],
                    n: open.filter((a) => a.judgement_key === k).length,
                    tone: 'neutral' as Tone,
                    onClick: () => setArea(k),
                  })).filter((r) => r.n > 0)}
                />
                {open.length === 0 && <p className="text-[12.5px] text-white">Nothing open.</p>}
              </div>
            </div>
          </motion.section>
        )}

        {actions.length > 0 && (
          <section className="space-y-4">
            <CollegeSectionTitle
              title="The plan"
              sub="Planned, in progress, blocked and completed. Each card says its next step. Filter by area."
            />
            <QuietTabs<QipJudgement | 'all'>
              label="Filter by area"
              tabs={[
                { key: 'all', label: 'All areas', count: actions.length },
                ...AREA_KEYS.map((k) => ({
                  key: k,
                  label: AREA_LABEL[k],
                  count: actions.filter((x) => x.judgement_key === k).length,
                })),
              ]}
              value={area}
              onChange={setArea}
            />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {STATUS_COLS.map((col) => (
                <motion.section
                  key={col.key}
                  variants={itemVariants}
                  className={cn(COLLEGE_CARD, 'sm:p-5')}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-white">{col.label}</h3>
                    <span className="ml-auto text-[13px] font-semibold tabular-nums text-white">
                      {grouped[col.key].length}
                    </span>
                  </div>
                  {grouped[col.key].length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-white/[0.12] px-3 py-6 text-center text-[12.5px] text-white">
                      None here
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {grouped[col.key].map((a) => (
                        <ActionCard
                          key={a.id}
                          a={a}
                          onAdvance={NEXT[a.status] ? () => advance(a) : undefined}
                          advanceLabel={
                            a.status === 'planned'
                              ? 'Start'
                              : a.status === 'blocked'
                                ? 'Unblock'
                                : 'Mark complete'
                          }
                          onBlock={
                            a.status === 'planned' || a.status === 'in_progress'
                              ? () => void setStatus(a, 'blocked')
                              : undefined
                          }
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
          description={
            fromSar
              ? 'From the self-assessment. Tighten the title, pick the area and set a date; the SAR wording is kept with the action.'
              : 'What will change, which area it improves, and by when.'
          }
          width="wide"
          footer={
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowNew(false)} className={COLLEGE_BTN}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={saving}
                className={COLLEGE_BTN_PRIMARY}
              >
                {saving ? 'Adding…' : 'Add action'}
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className={labelCn} htmlFor="qip-title">
                  Title
                </label>
                <input
                  id="qip-title"
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="e.g. Sign off off-the-job hours within 5 days"
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="qip-desc">
                  What needs to happen and why
                </label>
                <textarea
                  id="qip-desc"
                  value={draft.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  rows={4}
                  className={textareaCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="qip-date">
                  Target date
                </label>
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
                <ChoiceGrid<QipJudgement>
                  className="mt-2 lg:grid-cols-2"
                  label="Area it improves"
                  options={AREA_KEYS.map((k) => ({ key: k, label: AREA_LABEL[k] }))}
                  selected={draft.judgement_key}
                  onToggle={(k) => setDraft((d) => ({ ...d, judgement_key: k }))}
                />
              </div>
              <div>
                <p className={labelCn}>Priority</p>
                <JoinedToggle<QipPriority>
                  className="mt-2"
                  label="Priority"
                  options={PRIORITIES.map((p) => ({ key: p.key, label: p.label }))}
                  value={draft.priority}
                  onChange={(k) => setDraft((d) => ({ ...d, priority: k }))}
                />
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
  advanceLabel,
  onBlock,
  onDelete,
}: {
  a: QipAction;
  onAdvance?: () => void;
  advanceLabel: string;
  onBlock?: () => void;
  onDelete?: () => void;
}) {
  const late = isOverdue(a);
  return (
    <li
      className={cn('rounded-2xl border border-white/[0.08] p-4', late && 'border-orange-400/60')}
    >
      <p className="text-[14px] font-semibold leading-snug text-white">{a.title}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <StatusPill tone={PRIORITY_TONE[a.priority]}>{PRIORITY_LABEL[a.priority]}</StatusPill>
        {a.target_date && (
          <StatusPill tone={late ? 'warn' : 'neutral'}>
            {late ? 'Overdue, ' : 'By '}
            {new Date(a.target_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </StatusPill>
        )}
      </div>
      <p className="mt-2 text-[12px] text-white">{AREA_LABEL[a.judgement_key]}</p>
      {a.description && (
        <p className="mt-2 text-[12.5px] leading-snug text-white">{a.description}</p>
      )}
      {a.progress_percent > 0 && a.status !== 'completed' && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-white/70"
            style={{ width: `${a.progress_percent}%` }}
          />
        </div>
      )}
      {(onAdvance || onBlock || onDelete) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {onAdvance && (
            <button type="button" onClick={onAdvance} className={cn(COLLEGE_BTN, 'flex-1')}>
              {advanceLabel}
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
              className="inline-flex h-11 items-center justify-center rounded-xl border border-red-400/50 px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-red-400"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </li>
  );
}
