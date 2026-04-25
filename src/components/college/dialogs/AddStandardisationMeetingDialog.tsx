import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
import { useStandardisationMeetings } from '@/hooks/useStandardisationMeetings';

/* ==========================================================================
   AddStandardisationMeetingDialog — log a standardisation meeting with
   structured attendees, decisions, action items.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NONE = '__none';

interface FormState {
  date: string;
  topic: string;
  chair_id: string;
  attendee_ids: Set<string>;
  outcome: string;
  decisions: string;
  action_items_text: string;
  minutes_url: string;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const splitLines = (s: string): string[] =>
  s
    .split(/\n/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

const EMPTY: FormState = {
  date: todayIso(),
  topic: '',
  chair_id: NONE,
  attendee_ids: new Set(),
  outcome: '',
  decisions: '',
  action_items_text: '',
  minutes_url: '',
};

export function AddStandardisationMeetingDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const { staff } = useCollegeSupabase();
  const { create } = useStandardisationMeetings();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setForm({ ...EMPTY, attendee_ids: new Set() });
  }, [open]);

  const update = (patch: Partial<FormState>) =>
    setForm((p) => ({ ...p, ...patch }));

  const eligibleStaff = useMemo(
    () =>
      staff
        .filter((s) => s.status !== 'Archived')
        .sort((a, b) => a.name.localeCompare(b.name)),
    [staff]
  );

  const toggleAttendee = (id: string) => {
    setForm((p) => {
      const next = new Set(p.attendee_ids);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...p, attendee_ids: next };
    });
  };

  const handleSave = async () => {
    if (!form.topic.trim()) {
      toast({ title: 'Topic required', variant: 'destructive' });
      return;
    }
    if (form.date > todayIso()) {
      toast({ title: 'Date can\'t be in the future', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      await create({
        date: form.date,
        topic: form.topic.trim(),
        chair_id: form.chair_id !== NONE ? form.chair_id : null,
        attendee_ids: Array.from(form.attendee_ids),
        outcome: form.outcome.trim() || null,
        decisions: form.decisions.trim() || null,
        action_items: splitLines(form.action_items_text),
        minutes_url: form.minutes_url.trim() || null,
      });
      toast({ title: 'Meeting logged' });
      onOpenChange(false);
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
          eyebrow="New meeting"
          title="Log standardisation meeting"
          description="EQA-grade evidence: chair, attendees, decisions, actions."
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
                disabled={submitting || !form.topic.trim()}
              >
                {submitting ? 'Saving…' : 'Save meeting →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Meeting">
            <FormGrid cols={2}>
              <Field label="Date" required>
                <input
                  type="date"
                  value={form.date}
                  max={todayIso()}
                  onChange={(e) => update({ date: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Chair">
                <Select
                  value={form.chair_id}
                  onValueChange={(v) => update({ chair_id: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value={NONE}>Unspecified</SelectItem>
                    {eligibleStaff.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <Field label="Topic" required>
              <input
                value={form.topic}
                onChange={(e) => update({ topic: e.target.value })}
                className={inputClass}
                placeholder='e.g. "Q2 grading consistency review"'
              />
            </Field>
          </FormCard>

          <FormCard eyebrow={`Attendees · ${form.attendee_ids.size}`}>
            <p className="text-[11.5px] text-white/55 leading-snug max-w-prose">
              Tap to toggle attendance. Stored as a structured list — searchable
              and exportable for awarding-body EQA visits.
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto">
              {eligibleStaff.length === 0 ? (
                <p className="text-[12px] text-white/55">No staff to pick from.</p>
              ) : (
                eligibleStaff.map((s) => {
                  const active = form.attendee_ids.has(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleAttendee(s.id)}
                      className={cn(
                        'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                        active
                          ? 'bg-elec-yellow/[0.1] border-elec-yellow/40 text-elec-yellow'
                          : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.18]'
                      )}
                    >
                      {s.name}
                    </button>
                  );
                })
              )}
            </div>
          </FormCard>

          <FormCard eyebrow="Outcome & decisions">
            <Field
              label="Outcome / summary"
              hint="One-line takeaway from the meeting"
            >
              <input
                value={form.outcome}
                onChange={(e) => update({ outcome: e.target.value })}
                className={inputClass}
                placeholder='e.g. "Alignment achieved on grading rubric"'
              />
            </Field>
            <Field label="Decisions reached">
              <textarea
                value={form.decisions}
                onChange={(e) => update({ decisions: e.target.value })}
                rows={3}
                className={cn(textareaClass, 'min-h-[80px]')}
                placeholder="What was agreed in the meeting?"
              />
            </Field>
            <Field
              label="Action items"
              hint="One per line — these become trackable follow-ups"
            >
              <textarea
                value={form.action_items_text}
                onChange={(e) => update({ action_items_text: e.target.value })}
                rows={4}
                className={cn(textareaClass, 'min-h-[100px] font-mono text-[12px]')}
                placeholder={'Update marking scheme by 15 May\nRe-sample 5 portfolios from Sarah\'s cohort\nNext review at end of term'}
              />
            </Field>
            <Field label="Minutes URL (optional)">
              <input
                type="url"
                value={form.minutes_url}
                onChange={(e) => update({ minutes_url: e.target.value })}
                className={inputClass}
                placeholder="https://…"
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
