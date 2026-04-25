import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  SuccessCheckmark,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
          .select('college_id, full_name')
          .eq('id', uid)
          .maybeSingle();
        collegeId = (profile?.college_id as string | null) ?? null;
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Off-the-job training"
          title={`Log activity for ${studentName.split(' ')[0]}`}
          description="College-led OTJ counts toward the ESFA 20% / 6h-per-week minimum. Log activities away from normal duties."
          footer={
            <>
              <SecondaryButton
                onClick={() => onOpenChange(false)}
                disabled={saving}
                fullWidth
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={!valid || saving}
                fullWidth
                className="relative"
              >
                {saving ? 'Saving…' : 'Log activity'}
                <SuccessCheckmark show={savedTick} />
              </PrimaryButton>
            </>
          }
        >
          <div className="space-y-4">
            <FormCard>
              <FormGrid cols={2}>
                <Field label="Date" required>
                  <input
                    type="date"
                    value={form.activity_date}
                    max={todayIso()}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, activity_date: e.target.value }))
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Activity type" required>
                  <Select
                    value={form.activity_type}
                    onValueChange={(v) => setForm((f) => ({ ...f, activity_type: v }))}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {ACTIVITY_TYPES.map((a) => (
                        <SelectItem key={a.value} value={a.value}>
                          {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>

              <Field label="Title" required>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Three-phase distribution workshop"
                  className={inputClass}
                />
              </Field>

              <Field label="Duration (minutes)" required>
                <div className="space-y-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={1440}
                    value={form.duration_minutes}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, duration_minutes: e.target.value }))
                    }
                    placeholder="e.g. 60"
                    className={inputClass}
                  />
                  <div className="flex items-center flex-wrap gap-1.5">
                    {DURATION_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() =>
                          setForm((f) => ({ ...f, duration_minutes: String(p) }))
                        }
                        className="h-8 px-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-[11px] font-medium text-white/75 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation tabular-nums"
                      >
                        {p < 60 ? `${p}m` : `${p / 60}h`}
                      </button>
                    ))}
                  </div>
                </div>
              </Field>

              <Field label="Notes" hint="What did the learner do? What did they learn?">
                <textarea
                  value={form.description}
                  rows={4}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Brief description of the activity, key learning points, any reflections."
                  className={textareaClass}
                />
              </Field>

              <FormGrid cols={1}>
                <Field
                  label="Unit codes covered"
                  hint="Comma-separated, e.g. 304, 305"
                >
                  <input
                    type="text"
                    value={form.unit_codes_text}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, unit_codes_text: e.target.value }))
                    }
                    placeholder="304, 305, 308"
                    className={inputClass}
                  />
                </Field>
                <Field label="Evidence URL" hint="Optional — link to handout, photo, recording">
                  <input
                    type="url"
                    value={form.evidence_url}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, evidence_url: e.target.value }))
                    }
                    placeholder="https://…"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>
          </div>

        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
