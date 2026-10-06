import { useEffect, useState } from 'react';
import { Check, ChevronRight, Plus } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  STATUS_LABEL,
  STATUS_PILL,
  saveRequirement,
  useCollegeRequirements,
  type CollegeRequirement,
  type ItemGroup,
} from '@/hooks/useEvidencePack';

/* ==========================================================================
   RequirementsSheet — the college's own evidence requirements (ELE-1908).

   Anything a college wants on every learner's evidence pack on top of the
   funding rules. Starts from ready-made requirements colleges commonly keep
   (one tap to add, editable), or one written from scratch. Each shows how it
   will appear on a learner's pack before it is saved.
   ========================================================================== */

type Draft = Partial<CollegeRequirement> & { title?: string; stage?: ItemGroup };

const STAGE_LABEL: Record<ItemGroup, string> = {
  start: 'At the start',
  during: 'During',
  end: 'At the end',
};
const ROLE_LABEL: Record<string, string> = { apprentice: 'Apprentice', employer: 'Employer', provider: 'College' };

/** Requirements colleges commonly keep, beyond the funding rules. */
const TEMPLATES: Array<Draft & { title: string; stage: ItemGroup; why: string }> = [
  {
    title: 'Site safety induction',
    description: 'The employer’s signed induction record for the apprentice’s main site.',
    stage: 'start',
    due_within_days: 14,
    needs_signature_from: ['employer', 'apprentice'],
    why: 'Shows the workplace is safe before training on site',
  },
  {
    title: 'Workplace health and safety check',
    description: 'The college’s check that the employer’s workplace is safe for an apprentice, renewed each year.',
    stage: 'start',
    renew_months: 12,
    needs_signature_from: ['provider'],
    why: 'Inspectors ask how you know the workplace is safe',
  },
  {
    title: 'Safeguarding and Prevent briefing',
    description: 'The apprentice has had the safeguarding and Prevent briefing and knows who to contact.',
    stage: 'start',
    due_within_days: 28,
    needs_signature_from: ['apprentice'],
    why: 'Evidence for personal development and safeguarding',
  },
  {
    title: 'Learner agreement',
    description: 'The college’s learner agreement or code of conduct, signed by the apprentice.',
    stage: 'start',
    due_within_days: 14,
    needs_signature_from: ['apprentice'],
    why: 'Your own terms, signed once',
  },
  {
    title: 'PPE issued',
    description: 'Record of personal protective equipment issued to the apprentice for workshop practice.',
    stage: 'start',
    due_within_days: 7,
    needs_signature_from: ['apprentice'],
    why: 'Workshop safety record',
  },
  {
    title: 'Parent or guardian contact',
    description: 'Contact details and consent from a parent or guardian, for apprentices under 18.',
    stage: 'start',
    due_within_days: 14,
    why: 'For 16 and 17 year olds',
  },
  {
    title: 'Photo and media consent',
    description: 'Whether photos of the apprentice can be used in college materials.',
    stage: 'start',
    needs_signature_from: ['apprentice'],
    why: 'Before any photos are used',
  },
  {
    title: 'DBS check',
    description: 'A current DBS check, where the apprentice works in homes, schools or with vulnerable people.',
    stage: 'start',
    renew_months: 36,
    why: 'For apprentices working in sensitive settings',
  },
];

const BUILT_IN = [
  'Identity and residency',
  'ULN, NI number and date of birth',
  'Eligibility declaration',
  'Employed for the whole apprenticeship',
  'Apprenticeship agreement',
  'Training plan, signed by all three',
  'Initial assessment and prior learning',
  'Planned off-the-job hours',
  'English and maths decision',
  'Duration and working hours',
  'Paid a lawful wage',
  'Care leavers’ bursary information',
  'Contract for services with the employer',
  'Training every month',
  'Progress review every 3 months',
  'Learning support reviewed',
  'Breaks and changes recorded',
  'Gateway',
  'Employed until the assessment ends',
  'Agreement with the assessment organisation',
  'Assessment result',
  'Planned and actual hours at the end',
];

export function RequirementsSheet({
  open,
  onOpenChange,
  collegeId,
  onChanged,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  collegeId: string;
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const { rows, reload } = useCollegeRequirements(open ? collegeId : null);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [cohorts, setCohorts] = useState<Array<{ id: string; name: string }>>([]);
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([]);
  const [saving, setSaving] = useState(false);
  const [showBuiltIn, setShowBuiltIn] = useState(false);

  useEffect(() => {
    if (!open) return;
    setEditing(null);
    void supabase
      .from('college_cohorts')
      .select('id, name')
      .eq('college_id', collegeId)
      .order('name')
      .then(({ data }) => setCohorts((data ?? []) as never));
    void supabase
      .from('college_courses')
      .select('id, name')
      .eq('college_id', collegeId)
      .order('name')
      .then(({ data }) => setCourses((data ?? []) as never));
  }, [open, collegeId]);

  const have = new Set(rows.filter((r) => r.active).map((r) => r.title.toLowerCase()));
  const active = rows.filter((r) => r.active);
  const retired = rows.filter((r) => !r.active);
  const templates = TEMPLATES.filter((t) => !have.has(t.title.toLowerCase()));

  const save = async (r: Draft) => {
    if (!r.title || r.title.trim().length < 3 || saving) return;
    setSaving(true);
    try {
      await saveRequirement(collegeId, { ...r, title: r.title, stage: r.stage ?? 'start' });
      toast({ title: r.id ? 'Saved' : `${r.title} added to every matching learner’s pack` });
      setEditing(null);
      await reload();
      onChanged();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const scopeLabel = (r: Draft) =>
    r.cohort_id
      ? cohorts.find((c) => c.id === r.cohort_id)?.name ?? 'One cohort'
      : r.course_id
        ? courses.find((c) => c.id === r.course_id)?.name ?? 'One course'
        : 'Every learner';

  const facts = (r: Draft) =>
    [
      STAGE_LABEL[r.stage ?? 'start'],
      r.due_within_days != null ? `within ${r.due_within_days} days` : null,
      r.renew_months ? `renew every ${r.renew_months} months` : null,
      r.needs_signature_from?.length ? `signed by ${r.needs_signature_from.map((x) => ROLE_LABEL[x].toLowerCase()).join(' and ')}` : null,
    ].filter(Boolean) as string[];

  const e = editing;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Evidence pack"
      title={e ? (e.id ? 'Edit requirement' : 'New requirement') : 'Your college’s requirements'}
      description={
        e
          ? 'It appears on every matching learner’s pack and is checked like the funding items.'
          : 'Add anything else you want on every learner’s pack. The funding rules items are always there.'
      }
      footer={
        e ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => setEditing(null)} className={buttonSecondaryCn}>
              Back
            </button>
            <button
              type="button"
              disabled={!e.title || e.title.trim().length < 3 || saving}
              onClick={() => void save(e)}
              className={buttonPrimaryCn}
            >
              {saving ? 'Saving…' : e.id ? 'Save changes' : 'Add to every pack'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing({ stage: 'start', needs_signature_from: [], active: true })}
            className={cn(buttonPrimaryCn, 'w-full')}
          >
            Write your own requirement
          </button>
        )
      }
    >
      {!e ? (
        <div className="space-y-7">
          {/* Yours */}
          {active.length > 0 && (
            <section>
              <h3 className="mb-3 text-[15px] font-semibold text-white">Yours ({active.length})</h3>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {active.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setEditing(r)}
                      className="flex h-full w-full flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-4 text-left touch-manipulation hover:border-white/[0.2]"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-[15px] font-semibold leading-snug text-white">{r.title}</span>
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      </span>
                      {r.description && (
                        <span className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-white">{r.description}</span>
                      )}
                      <span className="mt-3 flex flex-wrap gap-1.5">
                        <Tag strong>{scopeLabel(r)}</Tag>
                        {facts(r).map((f) => (
                          <Tag key={f}>{f}</Tag>
                        ))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Ready-made */}
          {templates.length > 0 && (
            <section>
              <h3 className="text-[15px] font-semibold text-white">
                {active.length ? 'More you could add' : 'Start with one colleges commonly keep'}
              </h3>
              <p className="mt-1 text-[13px] text-white">One tap adds it to every learner’s pack. You can change it after.</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {templates.map((t) => (
                  <li
                    key={t.title}
                    className="flex flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-4"
                  >
                    <span className="text-[15px] font-semibold leading-snug text-white">{t.title}</span>
                    <span className="mt-1 text-[12.5px] leading-relaxed text-white">{t.why}</span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {facts(t).map((f) => (
                        <Tag key={f}>{f}</Tag>
                      ))}
                    </span>
                    <span className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setEditing({ ...t, active: true })}
                        className="h-11 rounded-xl border border-white/[0.14] text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                      >
                        Adjust first
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => void save({ ...t, active: true })}
                        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Add
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Always included */}
          <section className="rounded-2xl border border-white/[0.1] p-4">
            <button
              type="button"
              onClick={() => setShowBuiltIn((v) => !v)}
              className="flex min-h-11 w-full items-center justify-between gap-3 text-left touch-manipulation"
            >
              <span>
                <span className="block text-[15px] font-semibold text-white">Always included: the funding rules</span>
                <span className="block text-[12.5px] text-white">
                  {BUILT_IN.length} items, from eligibility to the assessment result, checked automatically
                </span>
              </span>
              <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">{showBuiltIn ? 'Hide' : 'Show'}</span>
            </button>
            {showBuiltIn && (
              <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {BUILT_IN.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13px] text-white">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {retired.length > 0 && (
            <section>
              <h3 className="mb-2 text-[13px] font-semibold text-white">Retired</h3>
              <ul className="space-y-1">
                {retired.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setEditing(r)}
                      className="flex min-h-11 w-full items-center justify-between text-left text-[13.5px] text-white touch-manipulation"
                    >
                      {r.title}
                      <span className="text-[12.5px] font-semibold text-elec-yellow">Bring back</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-14">
          <div className="space-y-6">
            <div>
              <label className={labelCn} htmlFor="rq-title">
                What is needed
              </label>
              <input
                id="rq-title"
                value={e.title ?? ''}
                onChange={(ev) => setEditing({ ...e, title: ev.target.value })}
                className={inputCn}
                placeholder="e.g. Site safety induction"
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="rq-desc">
                What counts as evidence
              </label>
              <textarea
                id="rq-desc"
                rows={2}
                value={e.description ?? ''}
                onChange={(ev) => setEditing({ ...e, description: ev.target.value })}
                className={textareaCn}
                placeholder="Shown to staff when they file it"
              />
            </div>

            <fieldset className="space-y-2">
              <legend className={labelCn}>When</legend>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(STAGE_LABEL) as ItemGroup[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={e.stage === s}
                    onClick={() => setEditing({ ...e, stage: s })}
                    className={cn(chipBase, 'px-2 text-[13px]', e.stage === s ? chipOn : chipOff)}
                  >
                    {STAGE_LABEL[s]}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6">
              <div>
                <label className={labelCn} htmlFor="rq-due">
                  Due within (days of starting)
                </label>
                <input
                  id="rq-due"
                  inputMode="numeric"
                  value={e.due_within_days ?? ''}
                  onChange={(ev) => setEditing({ ...e, due_within_days: ev.target.value ? Number(ev.target.value) : null })}
                  className={inputCn}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="rq-renew">
                  Renew every (months)
                </label>
                <input
                  id="rq-renew"
                  inputMode="numeric"
                  value={e.renew_months ?? ''}
                  onChange={(ev) => setEditing({ ...e, renew_months: ev.target.value ? Number(ev.target.value) : null })}
                  className={inputCn}
                  placeholder="Never"
                />
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className={labelCn}>Must be signed by</legend>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(ROLE_LABEL).map(([v, label]) => {
                  const on = (e.needs_signature_from ?? []).includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setEditing({
                          ...e,
                          needs_signature_from: on
                            ? (e.needs_signature_from ?? []).filter((x) => x !== v)
                            : [...(e.needs_signature_from ?? []), v],
                        })
                      }
                      className={cn(chipBase, 'px-2 text-[13px]', on ? chipOn : chipOff)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="space-y-2">
              <legend className={labelCn}>Applies to</legend>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={!e.cohort_id && !e.course_id}
                  onClick={() => setEditing({ ...e, cohort_id: null, course_id: null })}
                  className={cn(chipBase, 'px-3 text-[13px]', !e.cohort_id && !e.course_id ? chipOn : chipOff)}
                >
                  Every learner
                </button>
                {cohorts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={e.cohort_id === c.id}
                    onClick={() => setEditing({ ...e, cohort_id: c.id, course_id: null })}
                    className={cn(chipBase, 'px-3 text-[13px]', e.cohort_id === c.id ? chipOn : chipOff)}
                  >
                    {c.name}
                  </button>
                ))}
                {courses.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={e.course_id === c.id}
                    onClick={() => setEditing({ ...e, course_id: c.id, cohort_id: null })}
                    className={cn(chipBase, 'px-3 text-[13px]', e.course_id === c.id ? chipOn : chipOff)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </fieldset>

            {e.id && (
              <div className="border-t border-white/[0.1] pt-5">
                <button
                  type="button"
                  onClick={() => void save({ ...e, active: !e.active })}
                  className="h-11 w-full rounded-xl border border-white/[0.14] text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  {e.active ? 'Retire this requirement' : 'Bring it back'}
                </button>
                <p className="mt-2 text-[12px] text-white">
                  Retiring keeps everything filed against it; it just stops being asked for.
                </p>
              </div>
            )}
          </div>

          {/* Live preview */}
          <aside className="lg:sticky lg:top-0 lg:self-start">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">On a learner’s pack</p>
            <div className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px] font-semibold leading-snug text-white">{e.title?.trim() || 'Your requirement'}</p>
                <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold', STATUS_PILL[e.due_within_days != null ? 'due' : 'missing'])}>
                  {STATUS_LABEL[e.due_within_days != null ? 'due' : 'missing']}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-white">{e.description?.trim() || 'Required by the college.'}</p>
              <p className="mt-1 text-[11.5px] text-white">College requirement · {scopeLabel(e).toLowerCase()}</p>
              <span className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black">
                File
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <ul className="mt-3 space-y-1.5 text-[12.5px] leading-relaxed text-white">
              {facts(e).map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </li>
              ))}
              {e.renew_months ? (
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  Turns orange when it needs renewing
                </li>
              ) : null}
            </ul>
          </aside>
        </div>
      )}
    </FormSheet>
  );
}

function Tag({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[11.5px] font-medium',
        strong ? 'bg-white text-black' : 'border border-white/[0.16] text-white'
      )}
    >
      {children}
    </span>
  );
}
