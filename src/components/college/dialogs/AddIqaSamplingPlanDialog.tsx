import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[88vh] sm:h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="New sampling plan"
          title="Plan IQA sampling"
          description="Sets the IQA target % for an assessor's work over a period. Once saved, you'll tick which observations to sample."
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSave}
                disabled={submitting || !form.period_start || !form.period_end || !targetValid}
              >
                {submitting ? 'Saving…' : 'Create plan & start sampling →'}
              </PrimaryButton>
            </>
          }
        >
          {/* Copy-from-last affordance — pre-fills the form with the most
              recent plan in the college so termly re-sampling is one tap. */}
          {lastPlan && (
            <button
              type="button"
              onClick={copyFromLastPlan}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[11.5px] font-semibold text-elec-yellow hover:bg-elec-yellow/[0.18] touch-manipulation"
            >
              <Copy className="h-3 w-3" />
              Copy from last plan
              {lastPlan.qualification_code && (
                <span className="text-elec-yellow/65 font-normal ml-1">
                  ({lastPlan.qualification_code})
                </span>
              )}
            </button>
          )}

          <FormCard eyebrow="Who">
            <FormGrid cols={2}>
              <Field label="IQA">
                <Select
                  value={form.iqa_id}
                  onValueChange={(v) => update({ iqa_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Assign…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value={NONE}>Unassigned</SelectItem>
                    {iqaCandidates.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                        {s.id === myStaffRow?.id && (
                          <span className="text-white/55 ml-1.5">· you</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field
                label="Assessor (subject of sampling)"
                hint='"All assessors" samples department-wide rather than focusing on one'
              >
                <Select
                  value={form.assessor_id}
                  onValueChange={(v) => update({ assessor_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Pick assessor…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value={NONE}>All assessors</SelectItem>
                    {assessorCandidates.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Scope">
            <FormGrid cols={2}>
              <Field
                label="Qualification code"
                hint={qualsLoading ? 'Loading…' : quals.length > 0 ? 'Pick from your curriculum' : 'No qualifications set — type a code'}
              >
                {quals.length > 0 ? (
                  <Select
                    value={form.qualification_code || NONE}
                    onValueChange={(v) =>
                      update({
                        qualification_code: v === NONE ? '' : v,
                        unit_code: '', // reset unit when qualification changes
                      })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Pick qualification…" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value={NONE}>All qualifications</SelectItem>
                      {quals.map((q) => (
                        <SelectItem key={q.code} value={q.code}>
                          {q.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <input
                    value={form.qualification_code}
                    onChange={(e) =>
                      update({ qualification_code: e.target.value })
                    }
                    className={inputClass}
                    placeholder="e.g. 2365"
                  />
                )}
              </Field>
              <Field
                label="Unit code"
                hint={
                  !form.qualification_code
                    ? 'Pick a qualification first'
                    : units.length > 0
                      ? 'Filtered to this qualification'
                      : 'No mapped units — type to override'
                }
              >
                {units.length > 0 ? (
                  <Select
                    value={form.unit_code || NONE}
                    onValueChange={(v) =>
                      update({ unit_code: v === NONE ? '' : v })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="All units" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value={NONE}>All units</SelectItem>
                      {units.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <input
                    value={form.unit_code}
                    onChange={(e) => update({ unit_code: e.target.value })}
                    className={inputClass}
                    placeholder="—"
                  />
                )}
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Period & target">
            <FormGrid cols={2}>
              <Field label="Period start" required>
                <input
                  type="date"
                  value={form.period_start}
                  max={todayIso()}
                  onChange={(e) => update({ period_start: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Period end" required>
                <input
                  type="date"
                  value={form.period_end}
                  min={form.period_start || undefined}
                  onChange={(e) => update({ period_end: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field
              label="Target sample %"
              hint="Awarding body usually expects 10–20% for routine sampling, 100% for new assessors"
            >
              <div className="space-y-2">
                {/* Preset chips — the three cases that cover 95% of real plans */}
                <div className="flex flex-wrap gap-1.5">
                  {TARGET_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => update({ target_sample_percent: p.value })}
                      className={cn(
                        'inline-flex items-center gap-1.5 h-8 px-3 rounded-full border text-[11.5px] font-semibold transition-colors touch-manipulation',
                        form.target_sample_percent === p.value
                          ? 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow'
                          : 'bg-white/[0.04] border-white/[0.10] text-white/75 hover:bg-white/[0.08]'
                      )}
                    >
                      {p.label}
                      <span className="text-white/45 font-normal">· {p.hint}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={form.target_sample_percent}
                  onChange={(e) =>
                    update({ target_sample_percent: e.target.value })
                  }
                  className={inputClass}
                  placeholder="20"
                />
              </div>
            </Field>

            {/* Coverage preview — shows roughly how many items they'll
                need to sample so the IQA can sanity-check the % before save. */}
            {previewToSample !== null && previewCount !== null && (
              <div className="mt-3 rounded-lg border border-elec-yellow/25 bg-elec-yellow/[0.06] px-3 py-2 text-[11.5px] text-elec-yellow/85 leading-snug">
                <span className="font-semibold">Coverage preview:</span>{' '}
                ~{previewToSample} item{previewToSample === 1 ? '' : 's'} to sample
                {' '}
                <span className="text-white/55">
                  (≈{targetPct}% of {previewCount} OTJ entr{previewCount === 1 ? 'y' : 'ies'} in this window)
                </span>
              </div>
            )}
          </FormCard>

          <FormCard eyebrow="Notes">
            <Field label="Plan notes (optional)">
              <textarea
                value={form.notes}
                onChange={(e) => update({ notes: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[80px]')}
                placeholder="Why this period, focus areas, EQA visit prep…"
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
