import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, selectTriggerCn, textareaCn, infoPanelCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useIqaSamplingPlans } from '@/hooks/useIqaSamplingPlans';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   AddIqaSamplingPlanDialog — IQA creates a sampling plan against an
   assessor for a given period and qualification.

   Recent improvements (May 2026 screenshot review):
   - Qualification code is a picker fed by college_courses.code rather
     than free text — kills typo bugs from manually typing C&G codes.
   - Unit code is a picker filtered by the chosen qualification using
     qualification_requirements; falls back to free-text for legacy
     qualifications without a curriculum tree.
   - Default IQA = current user when they hold an IQA-capable role.
   - Target % presets (10 / 20 / 100) match the three real Ofsted /
     awarding-body cases (routine / standard / new assessor).
   - "Copy from last plan" pre-fills from the most recent plan.
   - On save we jump straight to the plan detail page so the IQA can
     start ticking items immediately.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormState {
  iqa_id: string;
  assessor_id: string;
  qualification_code: string;
  unit_code: string;
  period_start: string;
  period_end: string;
  target_sample_percent: string;
  notes: string;
}

const todayIso = () => new Date().toISOString().slice(0, 10);
const NONE = '__none';

const EMPTY: FormState = {
  iqa_id: NONE,
  assessor_id: NONE,
  qualification_code: '',
  unit_code: '',
  period_start: '',
  period_end: '',
  target_sample_percent: '20',
  notes: '',
};

const TARGET_PRESETS: Array<{ value: string; label: string; hint: string }> = [
  { value: '10', label: '10%', hint: 'Routine' },
  { value: '20', label: '20%', hint: 'Standard' },
  { value: '100', label: '100%', hint: 'New assessor' },
];

interface QualOption {
  code: string;
  label: string;
}

export function AddIqaSamplingPlanDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { staff } = useCollegeSupabase();
  const { plans, create } = useIqaSamplingPlans();
  const { user, profile } = useAuth();

  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [quals, setQuals] = useState<QualOption[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [qualsLoading, setQualsLoading] = useState(false);

  const me = user?.id ?? null;
  const myStaffRow = useMemo(
    () => staff.find((s) => s.user_id === me),
    [staff, me]
  );

  // Pull qualification codes from the canonical `qualifications` table —
  // the same source the College Hub Courses page reads from (21 seeded UK
  // quals: C&G 2357/2365/2366/5357/5393, EAL L3, 2346-03, 8202, etc.).
  // We deliberately do NOT read `college_courses` here because that table
  // only holds the small subset of qualifications the college has actively
  // enrolled cohorts on, which leaves the IQA picker blank for any
  // qualification they're planning to start sampling against.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setQualsLoading(true);
      try {
        const { data } = await supabase
          .from('qualifications')
          .select('code, title, level, awarding_body')
          .order('awarding_body', { ascending: true })
          .order('level', { ascending: true })
          .order('code', { ascending: true });
        if (cancelled) return;
        const seen = new Map<string, QualOption>();
        for (const q of (data ?? []) as Array<{
          code: string | null;
          title: string | null;
          level: string | null;
          awarding_body: string | null;
        }>) {
          if (!q.code) continue;
          if (!seen.has(q.code)) {
            const titlePart = q.title ? ` · ${q.title}` : '';
            const levelPart = q.level ? ` (L${q.level.replace(/[^0-9]/g, '') || q.level})` : '';
            seen.set(q.code, {
              code: q.code,
              label: `${q.code}${titlePart}${levelPart}`,
            });
          }
        }
        setQuals(Array.from(seen.values()));
      } finally {
        if (!cancelled) setQualsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Units depend on the chosen qualification. Pull from
  // qualification_requirements (the curriculum tree) and de-dupe by unit_code.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!form.qualification_code) {
        setUnits([]);
        return;
      }
      const { data } = await supabase
        .from('qualification_requirements')
        .select('unit_code')
        .eq('qualification_code', form.qualification_code)
        .not('unit_code', 'is', null);
      if (cancelled) return;
      const seen = new Set<string>();
      for (const r of (data ?? []) as Array<{ unit_code: string | null }>) {
        if (r.unit_code) seen.add(r.unit_code);
      }
      setUnits(Array.from(seen).sort());
    })();
    return () => {
      cancelled = true;
    };
  }, [form.qualification_code]);

  // Reset + apply current-user-as-IQA default whenever the sheet opens.
  useEffect(() => {
    if (!open) return;
    setForm({
      ...EMPTY,
      iqa_id: myStaffRow?.id ?? NONE,
    });
  }, [open, myStaffRow]);

  const update = (patch: Partial<FormState>) =>
    setForm((p) => ({ ...p, ...patch }));

  // Anyone tutor / HoD / admin can be designated IQA on a plan. The
  // assessor pool is whoever actually marks work (tutor / HoD).
  const iqaCandidates = useMemo(
    () =>
      staff.filter(
        (s) =>
          s.role === 'tutor' ||
          s.role === 'head_of_department' ||
          s.role === 'admin'
      ),
    [staff]
  );

  const assessorCandidates = useMemo(
    () => staff.filter((s) => s.role === 'tutor' || s.role === 'head_of_department'),
    [staff]
  );

  // Most-recent plan in this college — used to pre-fill "Copy from last".
  const lastPlan = plans[0] ?? null;
  const copyFromLastPlan = () => {
    if (!lastPlan) return;
    setForm((p) => ({
      ...p,
      iqa_id: lastPlan.iqa_id ?? p.iqa_id,
      assessor_id: lastPlan.assessor_id ?? NONE,
      qualification_code: lastPlan.qualification_code ?? '',
      unit_code: lastPlan.unit_code ?? '',
      target_sample_percent: String(lastPlan.target_sample_percent ?? 20),
      notes: lastPlan.notes ?? '',
    }));
    toast({
      title: 'Copied from last plan',
      description: lastPlan.qualification_code
        ? `Pre-filled with ${lastPlan.qualification_code}`
        : 'Pre-filled — set new dates',
    });
  };

  const targetPct = Number(form.target_sample_percent);
  const targetValid = Number.isFinite(targetPct) && targetPct >= 0 && targetPct <= 100;

  // Coverage preview — rough item count over the chosen period. We use
  // college_otj_entries as a proxy for "things the IQA might sample"
  // because OTJ + portfolio + grade signals all flow through there.
  // Cheap query, runs only when both qualification + dates are set.
  const [previewCount, setPreviewCount] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPreviewCount(null);
      if (!form.qualification_code || !form.period_start || !form.period_end) return;
      const collegeId = (profile as { college_id?: string | null } | null)?.college_id;
      if (!collegeId) return;
      // Count assessor-verified OTJ entries in the period for this college
      const { count } = await supabase
        .from('college_otj_entries')
        .select('id', { count: 'exact', head: true })
        .eq('college_id', collegeId)
        .gte('activity_date', form.period_start)
        .lte('activity_date', form.period_end);
      if (cancelled) return;
      setPreviewCount(count ?? 0);
    })();
    return () => {
      cancelled = true;
    };
  }, [form.qualification_code, form.period_start, form.period_end, profile]);

  const previewToSample =
    previewCount !== null && targetValid
      ? Math.max(1, Math.round((previewCount * targetPct) / 100))
      : null;

  const handleSave = async () => {
    if (!form.period_start || !form.period_end) {
      toast({ title: 'Pick a period', variant: 'destructive' });
      return;
    }
    if (form.period_end < form.period_start) {
      toast({
        title: 'Invalid period',
        description: 'End date must be after start date.',
        variant: 'destructive',
      });
      return;
    }
    if (!targetValid) {
      toast({ title: 'Target must be 0–100', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const created = await create({
        iqa_id: form.iqa_id !== NONE ? form.iqa_id : null,
        assessor_id: form.assessor_id !== NONE ? form.assessor_id : null,
        qualification_code: form.qualification_code.trim() || null,
        unit_code: form.unit_code.trim() || null,
        period_start: form.period_start,
        period_end: form.period_end,
        target_sample_percent: targetPct,
        notes: form.notes.trim() || null,
      });
      toast({
        title: 'Sampling plan created',
        description: 'Opening the plan so you can pick items to sample.',
      });
      onOpenChange(false);
      if (created?.id) {
        navigate(`/college/iqa/sampling/${created.id}`);
      }
    } catch (e) {
      toast({
        title: 'Save failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const iqaName = iqaCandidates.find((s) => s.id === form.iqa_id)?.name ?? 'Unassigned';
  const assessorName =
    assessorCandidates.find((s) => s.id === form.assessor_id)?.name ?? 'All assessors';
  const fmt = (d: string) =>
    d ? new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const summary = (
    <div className={cn(infoPanelCn, 'space-y-3')}>
      <p className="text-[13px] font-semibold text-white">This plan</p>
      <dl className="space-y-2 text-[13px] text-white">
        <div className="flex justify-between gap-3">
          <dt>IQA</dt>
          <dd className="text-right font-medium">{iqaName}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Assessor</dt>
          <dd className="text-right font-medium">{assessorName}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Scope</dt>
          <dd className="text-right font-medium">
            {form.qualification_code || 'All qualifications'}
            {form.unit_code ? ` · ${form.unit_code}` : ''}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Period</dt>
          <dd className="text-right font-medium">
            {form.period_start && form.period_end
              ? `${fmt(form.period_start)} to ${fmt(form.period_end)}`
              : 'Not set'}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Target</dt>
          <dd className="text-right font-medium">{targetValid ? `${targetPct}%` : 'Not valid'}</dd>
        </div>
      </dl>
      {/* Coverage preview — roughly how many items they'll need to sample, so
          the IQA can sanity-check the % before saving. */}
      {previewToSample !== null && previewCount !== null ? (
        <p className="border-t border-white/[0.08] pt-3 text-[13px] leading-snug text-white">
          About <span className="font-semibold">{previewToSample}</span> item
          {previewToSample === 1 ? '' : 's'} to sample ({targetPct}% of {previewCount} off-the-job
          entr{previewCount === 1 ? 'y' : 'ies'} in this window).
        </p>
      ) : (
        <p className="border-t border-white/[0.08] pt-3 text-[13px] leading-snug text-white">
          Pick a qualification and both dates to see roughly how many items you will sample.
        </p>
      )}
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="IQA sampling"
      title="New sampling plan"
      description="Set the sample size for an assessor's work over a period. Once saved, you pick which pieces of work to sample."
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(COLLEGE_BTN, 'flex-1 sm:flex-none')}
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(COLLEGE_BTN_PRIMARY, 'flex-1 sm:flex-none')}
            onClick={handleSave}
            disabled={submitting || !form.period_start || !form.period_end || !targetValid}
          >
            {submitting ? 'Saving…' : 'Create plan'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {lastPlan && (
            // Pre-fills from the most recent plan so termly re-sampling is one tap.
            <button type="button" onClick={copyFromLastPlan} className={cn(chipCn(false), 'h-11')}>
              Copy last plan{lastPlan.qualification_code ? ` (${lastPlan.qualification_code})` : ''}
            </button>
          )}
          <section className="space-y-4">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Who</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <p className={labelCn}>IQA</p>
                <MobileSelectPicker
                  triggerClassName={selectTriggerCn}
                  value={form.iqa_id}
                  onValueChange={(v) => update({ iqa_id: v })}
                  title="IQA"
                  placeholder="Assign"
                  options={[
                    { value: NONE, label: 'Unassigned' },
                    ...iqaCandidates.map((s) => ({
                      value: s.id,
                      label: s.id === myStaffRow?.id ? `${s.name} (you)` : s.name,
                    })),
                  ]}
                />
              </div>
              <div>
                <p className={labelCn}>Assessor being sampled</p>
                <MobileSelectPicker
                  triggerClassName={selectTriggerCn}
                  value={form.assessor_id}
                  onValueChange={(v) => update({ assessor_id: v })}
                  title="Assessor being sampled"
                  placeholder="Pick an assessor"
                  options={[
                    { value: NONE, label: 'All assessors' },
                    ...assessorCandidates.map((s) => ({ value: s.id, label: s.name })),
                  ]}
                />
                <p className="mt-1.5 text-[12px] text-white">
                  All assessors samples the department rather than one person.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-white/[0.08] pt-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Scope</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <p className={labelCn}>Qualification</p>
                {quals.length > 0 ? (
                  <MobileSelectPicker
                    triggerClassName={selectTriggerCn}
                    value={form.qualification_code || NONE}
                    onValueChange={(v) =>
                      update({
                        qualification_code: v === NONE ? '' : v,
                        unit_code: '', // reset unit when qualification changes
                      })
                    }
                    title="Qualification"
                    placeholder="Pick a qualification"
                    options={[
                      { value: NONE, label: 'All qualifications' },
                      ...quals.map((q) => ({ value: q.code, label: q.label })),
                    ]}
                  />
                ) : (
                  <input
                    value={form.qualification_code}
                    onChange={(e) => update({ qualification_code: e.target.value })}
                    className={inputCn}
                    placeholder={qualsLoading ? 'Loading…' : 'e.g. 2365'}
                  />
                )}
                <p className="mt-1.5 text-[12px] text-white">
                  {qualsLoading
                    ? 'Loading qualifications…'
                    : quals.length > 0
                      ? 'From your curriculum.'
                      : 'No qualifications set up. Type a code.'}
                </p>
              </div>
              <div>
                <p className={labelCn}>Unit</p>
                {units.length > 0 ? (
                  <MobileSelectPicker
                    triggerClassName={selectTriggerCn}
                    value={form.unit_code || NONE}
                    onValueChange={(v) => update({ unit_code: v === NONE ? '' : v })}
                    title="Unit"
                    placeholder="All units"
                    options={[
                      { value: NONE, label: 'All units' },
                      ...units.map((u) => ({ value: u, label: u })),
                    ]}
                  />
                ) : (
                  <input
                    value={form.unit_code}
                    onChange={(e) => update({ unit_code: e.target.value })}
                    className={inputCn}
                    placeholder="All units"
                  />
                )}
                <p className="mt-1.5 text-[12px] text-white">
                  {!form.qualification_code
                    ? 'Pick a qualification first, or type a unit code.'
                    : units.length > 0
                      ? 'Units of this qualification.'
                      : 'No units mapped. Type one to narrow it.'}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t border-white/[0.08] pt-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Period and target</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
              <div>
                <label className={labelCn} htmlFor="iqa-plan-start">
                  Period start
                </label>
                <input
                  id="iqa-plan-start"
                  type="date"
                  value={form.period_start}
                  max={todayIso()}
                  onChange={(e) => update({ period_start: e.target.value })}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="iqa-plan-end">
                  Period end
                </label>
                <input
                  id="iqa-plan-end"
                  type="date"
                  value={form.period_end}
                  min={form.period_start || undefined}
                  onChange={(e) => update({ period_end: e.target.value })}
                  className={inputCn}
                />
              </div>
            </div>
            <div>
              <p className={labelCn}>Sample size</p>
              {/* The three cases that cover nearly every real plan. */}
              <div className="mt-1 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                {TARGET_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    aria-pressed={form.target_sample_percent === p.value}
                    onClick={() => update({ target_sample_percent: p.value })}
                    className={cn(chipCn(form.target_sample_percent === p.value), 'h-11')}
                  >
                    {p.label} {p.hint.toLowerCase()}
                  </button>
                ))}
              </div>
              <div className="mt-3 max-w-[200px]">
                <label className={labelCn} htmlFor="iqa-plan-pct">
                  Or set a percentage
                </label>
                <input
                  id="iqa-plan-pct"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="100"
                  step="5"
                  value={form.target_sample_percent}
                  onChange={(e) => update({ target_sample_percent: e.target.value })}
                  className={inputCn}
                  placeholder="20"
                />
              </div>
              <p className="mt-1.5 text-[12px] text-white">
                Awarding bodies usually expect 10 to 20% for routine sampling and 100% for a new assessor.
              </p>
            </div>
          </section>

          <section className="space-y-2 border-t border-white/[0.08] pt-5">
            <label className={labelCn} htmlFor="iqa-plan-notes">
              Plan notes (optional)
            </label>
            <textarea
              id="iqa-plan-notes"
              value={form.notes}
              onChange={(e) => update({ notes: e.target.value })}
              rows={3}
              className={textareaCn}
              placeholder="Why this period, areas to focus on, EQA visit prep"
            />
          </section>
        </div>

        <aside className="lg:sticky lg:top-0 lg:self-start">{summary}</aside>
      </div>
    </FormSheet>
  );
}
