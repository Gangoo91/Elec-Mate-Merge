import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { useRecomputeRisk } from '@/hooks/useStudentRisk';
import { cn } from '@/lib/utils';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { COLLEGE_BTN, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { PEOPLE_PANEL } from '@/components/college/people/peopleKit';

/* ==========================================================================
   RiskThresholdsCard (ELE-1909) — the college's own risk-flag thresholds.

   Stored in college_risk_settings and read by the nightly compute-student-risk
   job. No row means the defaults below, which are what the job has always
   used. Anyone at the college can read them; only someone who can change
   college settings can save (RLS: college_can('settings.manage')).

   Lives on Quality thresholds (/college/settings/operational) since 8 Oct
   2026, beside the other numbers the hub judges learners by.
   ========================================================================== */

export interface RiskThresholds {
  attendance_target_pct: number;
  evidence_quiet_days: number;
  portfolio_stale_days: number;
  observation_gap_days: number;
  otj_gap_days: number;
  review_grace_days: number;
  medium_from: number;
  high_from: number;
  critical_from: number;
}

export const RISK_DEFAULTS: RiskThresholds = {
  attendance_target_pct: 85,
  evidence_quiet_days: 14,
  portfolio_stale_days: 21,
  observation_gap_days: 60,
  otj_gap_days: 28,
  review_grace_days: 7,
  medium_from: 25,
  high_from: 50,
  critical_from: 70,
};

type Key = keyof RiskThresholds;

const FIELDS: Array<{
  key: Key;
  label: string;
  unit: string;
  min: number;
  max: number;
  help: string;
}> = [
  {
    key: 'attendance_target_pct',
    label: 'Attendance target',
    unit: '%',
    min: 50,
    max: 100,
    help: 'Attendance over the last 28 days below this adds to the score. The further below, the more it adds.',
  },
  {
    key: 'evidence_quiet_days',
    label: 'No new evidence for',
    unit: 'days',
    min: 7,
    max: 90,
    help: 'No criteria evidenced in this many days flags the learner as stalled.',
  },
  {
    key: 'portfolio_stale_days',
    label: 'Portfolio not updated for',
    unit: 'days',
    min: 7,
    max: 120,
    help: 'Nothing added to the portfolio in this many days counts against them.',
  },
  {
    key: 'observation_gap_days',
    label: 'Not observed for',
    unit: 'days',
    min: 14,
    max: 180,
    help: 'No workplace or lesson observation in this many days.',
  },
  {
    key: 'otj_gap_days',
    label: 'No off-the-job hours for',
    unit: 'days',
    min: 7,
    max: 120,
    help: 'No off-the-job hours or app learning logged in this many days.',
  },
  {
    key: 'review_grace_days',
    label: 'Review overdue after',
    unit: 'days',
    min: 0,
    max: 60,
    help: 'How long past the review date before an overdue ILP review counts.',
  },
];

const BANDS: Array<{ key: Key; label: string; min: number; max: number }> = [
  { key: 'medium_from', label: 'Medium from', min: 5, max: 95 },
  { key: 'high_from', label: 'High from', min: 10, max: 98 },
  { key: 'critical_from', label: 'Critical from', min: 15, max: 100 },
];

const ALL = [...FIELDS, ...BANDS];

export function RiskThresholdsCard({ collegeId }: { collegeId: string }) {
  const { toast } = useToast();
  const { can, loading: capsLoading } = useCollegeCan(collegeId);
  const canEdit = can('settings.manage');
  const { recompute, running } = useRecomputeRisk();
  const [values, setValues] = useState<RiskThresholds>(RISK_DEFAULTS);
  const [saved, setSaved] = useState<RiskThresholds>(RISK_DEFAULTS);
  const [custom, setCustom] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('college_risk_settings' as never)
        .select(ALL.map((f) => f.key).join(', '))
        .eq('college_id', collegeId)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        const row = { ...RISK_DEFAULTS, ...(data as unknown as Partial<RiskThresholds>) };
        setValues(row);
        setSaved(row);
        setCustom(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  const problem = (() => {
    for (const f of ALL) {
      const v = values[f.key];
      if (!Number.isFinite(v) || v < f.min || v > f.max)
        return `${f.label} must be between ${f.min} and ${f.max}.`;
    }
    if (!(values.medium_from < values.high_from && values.high_from < values.critical_from))
      return 'The score bands must go up: medium, then high, then critical.';
    return null;
  })();
  const dirty = ALL.some((f) => values[f.key] !== saved[f.key]);

  const save = async () => {
    if (problem || saving) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('college_risk_settings' as never)
        .upsert({ college_id: collegeId, ...values } as never, { onConflict: 'college_id' });
      if (error) throw error;
      setSaved(values);
      setCustom(true);
      toast({
        title: 'Risk thresholds saved',
        description: 'They apply from tonight, or now if you recheck risk.',
      });
    } catch (e) {
      toast({ title: 'Could not save', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const set = (k: Key, raw: string) =>
    setValues((s) => ({ ...s, [k]: raw === '' ? Number.NaN : Number(raw) }));

  return (
    <section className="space-y-3">
      <CollegeSectionTitle
        title="Risk flags"
        sub="When a learner is flagged at risk. The score is worked out every night from these numbers."
      />
      <div className={cn(PEOPLE_PANEL, 'space-y-6')}>
        <p className="text-[13px] leading-relaxed text-white">
          Each sign below adds to a learner's score out of 100. The score bands decide whether they
          show as medium, high or critical on the risk flags and in Student 360. The attendance
          target here feeds the score; the attendance numbers above only decide when a figure shows
          orange or green.{' '}
          {custom
            ? 'Your college has its own numbers.'
            : 'These are the standard numbers; change them to suit your college.'}
          {!capsLoading && !canEdit ? ' Only an admin or head of department can change them.' : ''}
        </p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {FIELDS.map((f) => (
            <NumberField
              key={f.key}
              id={`risk-${f.key}`}
              field={f}
              value={values[f.key]}
              disabled={!canEdit}
              onChange={(v) => set(f.key, v)}
            />
          ))}
        </div>

        <div className="border-t border-white/[0.1] pt-5">
          <h3 className="text-sm font-semibold text-white">Score bands</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white">
            A score at or above each number puts the learner in that band. Below the medium number
            they are low and not flagged.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-x-4 sm:max-w-md">
            {BANDS.map((b) => (
              <NumberField
                key={b.key}
                id={`risk-${b.key}`}
                field={{ ...b, unit: '', help: '' }}
                value={values[b.key]}
                disabled={!canEdit}
                onChange={(v) => set(b.key, v)}
              />
            ))}
          </div>
        </div>

        {problem && <p className="text-[13px] font-semibold text-orange-300">{problem}</p>}

        {canEdit && (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {/* Outline: the page's one solid button saves the thresholds above. */}
            <button
              type="button"
              onClick={save}
              disabled={!dirty || !!problem || saving}
              className={cn(COLLEGE_BTN, !dirty ? '' : 'border-elec-yellow')}
            >
              {saving ? 'Saving…' : dirty ? 'Save risk flags' : 'Risk flags saved'}
            </button>
            <button type="button" onClick={() => setValues(RISK_DEFAULTS)} className={COLLEGE_BTN}>
              Use the standard numbers
            </button>
            <button
              type="button"
              onClick={() => void recompute().catch(() => undefined)}
              disabled={running || dirty}
              className={COLLEGE_BTN}
              title={dirty ? 'Save first' : undefined}
            >
              {running ? 'Rechecking…' : 'Recheck risk now'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function NumberField({
  id,
  field,
  value,
  disabled,
  onChange,
}: {
  id: string;
  field: { label: string; unit: string; min: number; max: number; help: string };
  value: number;
  disabled: boolean;
  onChange: (raw: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCn}>
        {field.label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={field.min}
          max={field.max}
          value={Number.isFinite(value) ? value : ''}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputCn, 'w-24')}
        />
        {field.unit && <span className="text-[13px] text-white">{field.unit}</span>}
      </div>
      {field.help && <p className="mt-1.5 text-[12px] leading-snug text-white">{field.help}</p>}
    </div>
  );
}
