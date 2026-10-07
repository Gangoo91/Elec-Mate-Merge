import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

/* ==========================================================================
   LogCollegeOtjSheet — record a college-led off-the-job training activity.
   Used to capture workshops, 1-2-1s, mentoring, simulations etc. that don't
   show up via the apprentice-side video / study-session telemetry.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** auth user id (== profiles.id) of the learner */
  studentUserId: string;
  studentName: string;
  qualificationId?: string | null;
  onSaved?: () => void;
}

const ACTIVITY_TYPES: { value: string; label: string }[] = [
  { value: 'workshop', label: 'Workshop' },
  { value: 'one_to_one', label: '1-2-1 / Tutorial' },
  { value: 'mentoring', label: 'Mentoring' },
  { value: 'simulation', label: 'Simulation' },
  { value: 'theory', label: 'Theory / classroom' },
  { value: 'practical', label: 'Practical' },
  { value: 'industry_visit', label: 'Industry visit' },
  { value: 'manufacturer_training', label: 'Manufacturer training' },
  { value: 'shadowing', label: 'Shadowing' },
  { value: 'conference', label: 'Conference / event' },
  { value: 'tutorial', label: 'Group tutorial' },
  { value: 'assessment', label: 'Assessment activity' },
  { value: 'employer_meeting', label: 'Employer meeting' },
  { value: 'other', label: 'Other' },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

const DURATION_PRESETS = [30, 60, 90, 120, 180, 240];

interface FormState {
  activity_date: string;
  activity_type: string;
  title: string;
  duration_minutes: string;
  description: string;
  unit_codes_text: string;
  evidence_url: string;
}

function emptyForm(): FormState {
  return {
    activity_date: todayIso(),
    activity_type: 'workshop',
    title: '',
    duration_minutes: '',
    description: '',
    unit_codes_text: '',
    evidence_url: '',
  };
}

export function LogCollegeOtjSheet({
  open,
  onOpenChange,
  studentUserId,
  studentName,
  qualificationId,
  onSaved,
}: Props) {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setForm(emptyForm());
      setSavedTick(false);
    }
  }, [open]);

  const minutes = Number(form.duration_minutes) || 0;
  const valid =
    form.title.trim().length > 0 &&
    minutes > 0 &&
    minutes <= 1440 &&
    form.activity_date.length === 10;

  const handleSave = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      let collegeId: string | null = null;
      let recordedByName: string | null = null;
      if (uid) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', uid)
          .maybeSingle();
        collegeId = await getMyCollegeId(uid);
        recordedByName = (profile?.full_name as string | null) ?? null;
      }

      const unitCodes = form.unit_codes_text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const { error: insErr } = await supabase.from('college_otj_entries').insert({
        college_id: collegeId,
        student_id: studentUserId,
        recorded_by: uid ?? null,
        recorded_by_name_snapshot: recordedByName,
        activity_date: form.activity_date,
        activity_type: form.activity_type,
        title: form.title.trim(),
        description: form.description.trim() || null,
        duration_minutes: minutes,
        unit_codes: unitCodes,
        evidence_url: form.evidence_url.trim() || null,
        qualification_id: qualificationId ?? null,
        source: 'college',
      });
      if (insErr) throw insErr;

      setSavedTick(true);
      toast({
        title: 'OTJ activity logged',
        description: `${minutes}m · ${form.title.trim()}`,
      });
      onSaved?.();
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 700);
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

  const first = studentName.split(' ')[0];
  const fmtDuration = (m: number) =>
    m <= 0
      ? 'Not set'
      : m < 60
        ? `${m} min`
        : m % 60 === 0
          ? `${m / 60} h`
          : `${Math.floor(m / 60)} h ${m % 60} min`;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Off-the-job training"
      title={`Log activity for ${first}`}
      description="College-led off-the-job time counts toward the fixed total of hours your learner's programme needs (minimum 6 hours a week). Log activities away from normal duties."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {savedTick ? 'Logged' : saving ? 'Saving…' : 'Log activity'}
          </button>
        </div>
      }
    >
      <div className="min-w-0 space-y-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className={labelCn} htmlFor="otj-date">
              Date
            </label>
            <input
              id="otj-date"
              type="date"
              value={form.activity_date}
              max={todayIso()}
              onChange={(e) => setForm((f) => ({ ...f, activity_date: e.target.value }))}
              className={inputCn}
            />
          </div>
          <div>
            <p className={labelCn}>Activity type</p>
            <MobileSelectPicker
              triggerClassName={selectTriggerCn}
              value={form.activity_type}
              onValueChange={(v) => setForm((f) => ({ ...f, activity_type: v }))}
              title="Activity type"
              placeholder="Choose a type"
              options={ACTIVITY_TYPES}
            />
          </div>
        </div>

        <div>
          <label className={labelCn} htmlFor="otj-title">
            Title
          </label>
          <input
            id="otj-title"
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Three-phase distribution workshop"
            className={inputCn}
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="otj-mins">
            Duration (minutes)
          </label>
          <input
            id="otj-mins"
            type="number"
            inputMode="numeric"
            min={1}
            max={1440}
            value={form.duration_minutes}
            onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))}
            placeholder="e.g. 60"
            className={inputCn}
          />
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {DURATION_PRESETS.map((p) => (
              <button
                type="button"
                key={p}
                aria-pressed={minutes === p}
                onClick={() => setForm((f) => ({ ...f, duration_minutes: String(p) }))}
                className={cn(chipCn(minutes === p), 'tabular-nums')}
              >
                {p < 60 ? `${p}m` : `${p / 60}h`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div>
            <label className={labelCn} htmlFor="otj-units">
              Unit codes covered
            </label>
            <input
              id="otj-units"
              type="text"
              value={form.unit_codes_text}
              onChange={(e) => setForm((f) => ({ ...f, unit_codes_text: e.target.value }))}
              placeholder="304, 305, 308"
              className={inputCn}
            />
            <p className="mt-1.5 text-[12px] text-white">Comma separated, e.g. 304, 305</p>
          </div>
          <div>
            <label className={labelCn} htmlFor="otj-evidence">
              Evidence link (optional)
            </label>
            <input
              id="otj-evidence"
              type="url"
              value={form.evidence_url}
              onChange={(e) => setForm((f) => ({ ...f, evidence_url: e.target.value }))}
              placeholder="https://…"
              className={inputCn}
            />
            <p className="mt-1.5 text-[12px] text-white">A handout, photo or recording</p>
          </div>
        </div>
      </div>

      <div className="min-w-0 space-y-5">
        <div>
          <label className={labelCn} htmlFor="otj-notes">
            Notes
          </label>
          <textarea
            id="otj-notes"
            value={form.description}
            rows={6}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What did the learner do? Key learning points, any reflections."
            className={cn(textareaCn, 'min-h-[160px]')}
          />
        </div>

        <aside className="space-y-2 border-t border-white/[0.08] pt-5 text-[13px] leading-relaxed text-white">
          <h3 className="text-[15px] font-semibold text-white">What gets logged</h3>
          <dl className="divide-y divide-white/[0.08]">
            <div className="flex items-baseline justify-between gap-4 py-2.5">
              <dt>Learner</dt>
              <dd className="truncate text-right font-medium">{studentName}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-2.5">
              <dt>Time</dt>
              <dd
                className={cn(
                  'text-right font-medium tabular-nums',
                  minutes > 1440 && 'text-orange-300'
                )}
              >
                {minutes > 1440 ? 'Over 24 hours' : fmtDuration(minutes)}
              </dd>
            </div>
          </dl>
          <p>
            Shows on the learner's off-the-job record as college-led time, alongside the hours their
            app learning adds.
          </p>
        </aside>
      </div>
    </FormSheet>
  );
}
