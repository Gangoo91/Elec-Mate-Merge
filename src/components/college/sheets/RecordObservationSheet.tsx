import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  SuccessCheckmark,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCollegeObservations,
  type ObservationLocationType,
  type ObservationOutcome,
} from '@/hooks/useCollegeObservations';

/* ==========================================================================
   RecordObservationSheet — assessor records a practical/work observation.
   Mobile-first 90vh bottom sheet, same chrome as the rest of the college hub.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  onSaved?: () => void;
}

interface FormState {
  observed_at: string;
  observed_time: string;
  duration_minutes: string;
  location: string;
  location_type: ObservationLocationType | '';
  activity_title: string;
  activity_summary: string;
  qualification_code: string;
  unit_code: string;
  acs_text: string;
  ksbs_text: string;
  outcome: ObservationOutcome;
  grade: string;
  feedback_strengths: string;
  feedback_areas: string;
  action_points_text: string;
  follow_up_required: boolean;
  follow_up_date: string;
  pending_file: File | null;
  assessor_signed: boolean;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const LOCATION_TYPES: { value: ObservationLocationType; label: string }[] = [
  { value: 'classroom', label: 'Classroom' },
  { value: 'workshop', label: 'Workshop / lab' },
  { value: 'employer_site', label: 'Employer site' },
  { value: 'remote', label: 'Remote / online' },
  { value: 'other', label: 'Other' },
];

const OUTCOMES: {
  value: ObservationOutcome;
  label: string;
  tone: 'emerald' | 'amber' | 'red' | 'blue';
}[] = [
  { value: 'passed', label: 'Passed', tone: 'emerald' },
  { value: 'partial', label: 'Partial', tone: 'amber' },
  { value: 'referred', label: 'Referred', tone: 'red' },
  { value: 'not_yet', label: 'Not yet', tone: 'blue' },
];

const fileExt = (filename: string) => {
  const m = filename.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : 'bin';
};

const humanFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const splitTokens = (s: string): string[] =>
  s
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

const splitLines = (s: string): string[] =>
  s
    .split(/\n/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

const EMPTY: FormState = {
  observed_at: todayIso(),
  observed_time: '',
  duration_minutes: '',
  location: '',
  location_type: '',
  activity_title: '',
  activity_summary: '',
  qualification_code: '',
  unit_code: '',
  acs_text: '',
  ksbs_text: '',
  outcome: 'partial',
  grade: '',
  feedback_strengths: '',
  feedback_areas: '',
  action_points_text: '',
  follow_up_required: false,
  follow_up_date: '',
  pending_file: null,
  assessor_signed: true,
};

export function RecordObservationSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const { create } = useCollegeObservations(studentId);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setShowSuccess(false);
    }
  }, [open]);

  const update = (patch: Partial<FormState>) => setForm((p) => ({ ...p, ...patch }));

  const onPickFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Max 25MB.',
        variant: 'destructive',
      });
      return;
    }
    update({ pending_file: file });
  };

  const handleSave = async () => {
    if (!form.activity_title.trim()) {
      toast({ title: 'Activity title required', variant: 'destructive' });
      return;
    }
    if (form.observed_at > todayIso()) {
      toast({ title: "Date can't be in the future", variant: 'destructive' });
      return;
    }
    if (form.follow_up_required && !form.follow_up_date) {
      toast({
        title: 'Set a follow-up date',
        description: "You've marked this as needing follow-up — pick a date so it doesn't slip.",
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload evidence if any
      let evidencePath: string | null = null;
      if (form.pending_file) {
        const ext = fileExt(form.pending_file.name);
        const path = `${studentId}/observation-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('compliance-evidence')
          .upload(path, form.pending_file, { upsert: false });
        if (upErr) throw upErr;
        evidencePath = path;
      }

      await create({
        college_student_id: studentId,
        observed_at: form.observed_at,
        observed_time: form.observed_time || null,
        duration_minutes:
          form.duration_minutes && Number(form.duration_minutes) > 0
            ? parseInt(form.duration_minutes, 10)
            : null,
        location: form.location.trim() || null,
        location_type: form.location_type || null,
        activity_title: form.activity_title.trim(),
        activity_summary: form.activity_summary.trim() || null,
        qualification_code: form.qualification_code.trim() || null,
        unit_code: form.unit_code.trim() || null,
        acs_evidenced: splitTokens(form.acs_text),
        ksbs_observed: splitTokens(form.ksbs_text),
        outcome: form.outcome,
        grade: form.grade.trim() || null,
        feedback_strengths: form.feedback_strengths.trim() || null,
        feedback_areas: form.feedback_areas.trim() || null,
        action_points: splitLines(form.action_points_text),
        follow_up_required: form.follow_up_required,
        follow_up_date: form.follow_up_date || null,
        evidence_path: evidencePath,
        assessor_signed: form.assessor_signed,
      });

      setShowSuccess(true);
      toast({
        title: 'Observation recorded',
        description: `${form.activity_title.trim()} logged for ${studentName}.`,
      });
      onSaved?.();
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
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
        className="h-[92vh] sm:h-[90vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Record observation"
          title={`Observation · ${studentName}`}
          description="Captured against ACs / KSBs. Saved with your name + timestamp as audit-grade evidence."
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={submitting}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSave}
                disabled={submitting || !form.activity_title.trim()}
              >
                {submitting ? 'Saving…' : 'Save observation →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="When & where">
            <FormGrid cols={2}>
              <Field label="Date" required>
                <input
                  type="date"
                  value={form.observed_at}
                  max={todayIso()}
                  onChange={(e) => update({ observed_at: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Time">
                <input
                  type="time"
                  value={form.observed_time}
                  onChange={(e) => update({ observed_time: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Duration (minutes)">
                <input
                  type="number"
                  min="0"
                  step="15"
                  value={form.duration_minutes}
                  onChange={(e) => update({ duration_minutes: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. 45"
                />
              </Field>
              <Field label="Setting">
                <Select
                  value={form.location_type || '__none'}
                  onValueChange={(v) =>
                    update({
                      location_type: v === '__none' ? '' : (v as ObservationLocationType),
                    })
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Pick a setting…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="__none">Unspecified</SelectItem>
                    {LOCATION_TYPES.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => update({ location: e.target.value })}
                className={inputClass}
                placeholder="e.g. Workshop B, Acme Electrical Ltd, Cardiff"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Activity">
            <Field label="Activity title" required>
              <input
                value={form.activity_title}
                onChange={(e) => update({ activity_title: e.target.value })}
                className={inputClass}
                placeholder='e.g. "Wiring a domestic ring final circuit to BS 7671"'
                autoFocus
              />
            </Field>
            <Field
              label="Summary"
              hint="What the learner did, in their words and yours. Inspectors love specifics."
            >
              <textarea
                value={form.activity_summary}
                onChange={(e) => update({ activity_summary: e.target.value })}
                rows={4}
                className={cn(textareaClass, 'min-h-[100px]')}
                placeholder="Step-by-step what was observed, tools used, safety considerations…"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Qualification mapping">
            <FormGrid cols={2}>
              <Field label="Qualification code" hint="e.g. C&G 2365-03">
                <input
                  value={form.qualification_code}
                  onChange={(e) => update({ qualification_code: e.target.value })}
                  className={inputClass}
                  placeholder="—"
                />
              </Field>
              <Field label="Unit code" hint="e.g. ELEC-203">
                <input
                  value={form.unit_code}
                  onChange={(e) => update({ unit_code: e.target.value })}
                  className={inputClass}
                  placeholder="—"
                />
              </Field>
            </FormGrid>
            <Field
              label="ACs evidenced"
              hint="Comma- or space-separated AC codes — they'll be tagged on this observation"
            >
              <input
                value={form.acs_text}
                onChange={(e) => update({ acs_text: e.target.value })}
                className={inputClass}
                placeholder="1.1, 1.2, 2.4"
              />
            </Field>
            <Field label="KSBs observed" hint="Apprenticeship standard KSB codes (optional)">
              <input
                value={form.ksbs_text}
                onChange={(e) => update({ ksbs_text: e.target.value })}
                className={inputClass}
                placeholder="K3, S5, B2"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Outcome">
            <Field label="Result">
              <div className="flex flex-wrap gap-1.5">
                {OUTCOMES.map((o) => {
                  const active = form.outcome === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => update({ outcome: o.value })}
                      className={cn(
                        'h-9 px-3.5 rounded-full text-[12.5px] font-medium border transition-colors touch-manipulation',
                        active
                          ? o.tone === 'emerald'
                            ? 'bg-emerald-500/[0.12] border-emerald-500/40 text-emerald-200'
                            : o.tone === 'amber'
                              ? 'bg-amber-500/[0.12] border-amber-500/40 text-amber-200'
                              : o.tone === 'red'
                                ? 'bg-red-500/[0.12] border-red-500/40 text-red-200'
                                : 'bg-blue-500/[0.12] border-blue-500/40 text-blue-200'
                          : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.18]'
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="Grade (optional)" hint='e.g. "Pass", "Merit", "B"'>
              <input
                value={form.grade}
                onChange={(e) => update({ grade: e.target.value })}
                className={inputClass}
                placeholder="—"
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Feedback">
            <Field label="Strengths">
              <textarea
                value={form.feedback_strengths}
                onChange={(e) => update({ feedback_strengths: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[70px]')}
                placeholder="What the learner did well — be specific."
              />
            </Field>
            <Field label="Areas for development">
              <textarea
                value={form.feedback_areas}
                onChange={(e) => update({ feedback_areas: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[70px]')}
                placeholder="What needs to improve before the next observation."
              />
            </Field>
            <Field
              label="Action points"
              hint="One per line — these become trackable tasks for the learner"
            >
              <textarea
                value={form.action_points_text}
                onChange={(e) => update({ action_points_text: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[70px]', 'font-mono text-[12px]')}
                placeholder={
                  'Re-cap regulation 543.7\nPractice cable terminations\nSubmit photo evidence by Friday'
                }
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Follow-up">
            <label className="flex items-center gap-3 cursor-pointer touch-manipulation py-1.5">
              <input
                type="checkbox"
                checked={form.follow_up_required}
                onChange={(e) => update({ follow_up_required: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-elec-yellow"
              />
              <span className="text-[12.5px] text-white">
                Schedule a follow-up
                <span className="block text-[10.5px] text-white/55 mt-0.5">
                  Adds to your assessment queue and surfaces on the learner's profile until done.
                </span>
              </span>
            </label>
            {form.follow_up_required && (
              <Field label="Follow-up date" required>
                <input
                  type="date"
                  value={form.follow_up_date}
                  min={todayIso()}
                  onChange={(e) => update({ follow_up_date: e.target.value })}
                  className={inputClass}
                />
              </Field>
            )}
          </FormCard>

          <FormCard eyebrow="Evidence (optional)">
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                onPickFile(e.dataTransfer.files?.[0] ?? null);
              }}
              className={cn(
                'border border-dashed rounded-xl px-4 py-4 text-center transition-colors touch-manipulation',
                dragOver
                  ? 'border-elec-yellow/60 bg-elec-yellow/[0.04]'
                  : 'border-white/[0.12] bg-[hsl(0_0%_9%)]'
              )}
            >
              {form.pending_file ? (
                <div className="flex items-center gap-3 text-left">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <span aria-hidden className="text-[13px]">
                      📄
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-white truncate">
                      {form.pending_file.name}
                    </div>
                    <div className="text-[10.5px] text-white/55 tabular-nums">
                      {humanFileSize(form.pending_file.size)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => update({ pending_file: null })}
                    className="text-[11.5px] font-medium text-white/65 hover:text-red-300 transition-colors touch-manipulation"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-[12px] text-white">
                    Photo, witness statement, drawing —
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="ml-1 font-medium text-elec-yellow hover:text-elec-yellow/80 underline-offset-2 hover:underline touch-manipulation"
                    >
                      browse
                    </button>
                  </div>
                  <div className="mt-1 text-[10.5px] text-white/55">PDF, JPG, PNG · max 25MB</div>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf,image/*"
                onChange={(e) => {
                  onPickFile(e.target.files?.[0] ?? null);
                  e.target.value = '';
                }}
              />
            </div>
          </FormCard>

          <FormCard eyebrow="Sign-off">
            <label className="flex items-center gap-3 cursor-pointer touch-manipulation py-1.5">
              <input
                type="checkbox"
                checked={form.assessor_signed}
                onChange={(e) => update({ assessor_signed: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-elec-yellow"
              />
              <span className="text-[12.5px] text-white">
                I'm signing this off as the assessor
                <span className="block text-[10.5px] text-white/55 mt-0.5">
                  Records your name + timestamp. Untick if you want to draft and sign later.
                </span>
              </span>
            </label>
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
