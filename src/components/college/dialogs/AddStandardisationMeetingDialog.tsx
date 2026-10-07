import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, selectTriggerCn, textareaCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useStandardisationMeetings } from '@/hooks/useStandardisationMeetings';

/* Standard four-item awarding-body agenda. Pre-filled by "Use template"
   so newly-logged meetings start with the right structure rather than a
   blank field. EQA verifiers look for these in the minutes. */
const STANDARD_AGENDA = [
  '1. Calibration sample review: anonymised cross-mark of recent samples; surface any verdict mismatches.',
  '2. Awarding-body updates: circulate guidance, qualification spec changes, EQA correspondence.',
  '3. Actions from last meeting: status on each open action; close or carry forward.',
  '4. New IQA findings and themes: common issues across assessors, areas needing further calibration.',
].join('\n');

const STANDARD_ACTIONS = [
  'Re-sample any verdicts flagged in section 1',
  'Circulate awarding-body updates to assessor team',
  'Schedule follow-up review of carry-forward actions',
].join('\n');

const STANDARD_TOPIC = 'Standardisation & calibration review';

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

  /** Pre-fill the form with the four-item awarding-body agenda + suggested
   *  actions. Only overrides fields the IQA hasn't touched yet so they
   *  can apply the template, edit, and never lose work. */
  const applyTemplate = () => {
    setForm((p) => ({
      ...p,
      topic: p.topic.trim() || STANDARD_TOPIC,
      decisions: p.decisions.trim() || STANDARD_AGENDA,
      action_items_text: p.action_items_text.trim() || STANDARD_ACTIONS,
    }));
    toast({
      title: 'Standard agenda applied',
      description: 'Edit any section before saving.',
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Standardisation"
      title="Record a meeting"
      description="Chair, attendees, decisions and actions, kept as evidence for EQA visits."
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
            disabled={submitting || !form.topic.trim()}
          >
            {submitting ? 'Saving…' : 'Save meeting'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Pre-fills topic, decisions and actions with the four-item awarding
              body agenda. Non-destructive: only fills fields that are empty. */}
          <button type="button" onClick={applyTemplate} className={cn(chipCn(false), 'h-10')}>
            Use the standard agenda
          </button>
          <section className="space-y-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">Meeting</h3>
            <div>
              <label className={labelCn} htmlFor="std-topic">
                Topic
              </label>
              <input
                id="std-topic"
                value={form.topic}
                onChange={(e) => update({ topic: e.target.value })}
                className={inputCn}
                placeholder="e.g. Q2 grading consistency review"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
              <div>
                <label className={labelCn} htmlFor="std-date">
                  Date
                </label>
                <input
                  id="std-date"
                  type="date"
                  value={form.date}
                  max={todayIso()}
                  onChange={(e) => update({ date: e.target.value })}
                  className={inputCn}
                />
              </div>
              <div>
                <p className={labelCn}>Chair</p>
                <MobileSelectPicker
                  triggerClassName={selectTriggerCn}
                  value={form.chair_id}
                  onValueChange={(v) => update({ chair_id: v })}
                  title="Chair"
                  placeholder="Not set"
                  options={[
                    { value: NONE, label: 'Not set' },
                    ...eligibleStaff.map((s) => ({ value: s.id, label: s.name })),
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-white/[0.08] pt-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">Attendees</h3>
              <span className="text-[13px] font-medium text-white tabular-nums">
                {form.attendee_ids.size} selected
              </span>
            </div>
            <p className="text-[12.5px] leading-snug text-white">
              Tap everyone who attended. Kept as a list you can search and export for EQA.
            </p>
            {eligibleStaff.length === 0 ? (
              <p className="text-[13px] text-white">No staff to pick from.</p>
            ) : (
              <div className="flex max-h-[220px] flex-wrap gap-2 overflow-y-auto">
                {eligibleStaff.map((s) => {
                  const active = form.attendee_ids.has(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleAttendee(s.id)}
                      className={cn(chipCn(active), 'h-10')}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="space-y-5 border-t border-white/[0.08] pt-5">
            <div>
              <label className={labelCn} htmlFor="std-outcome">
                Outcome in a line (optional)
              </label>
              <input
                id="std-outcome"
                value={form.outcome}
                onChange={(e) => update({ outcome: e.target.value })}
                className={inputCn}
                placeholder="e.g. Agreed how to grade the safe isolation task"
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="std-minutes">
                Link to minutes (optional)
              </label>
              <input
                id="std-minutes"
                type="url"
                inputMode="url"
                value={form.minutes_url}
                onChange={(e) => update({ minutes_url: e.target.value })}
                className={inputCn}
                placeholder="https://"
              />
            </div>
          </section>
        </div>

        <div className="space-y-5 border-t border-white/[0.08] pt-5 lg:border-t-0 lg:pt-0">
          <div>
            <label className={labelCn} htmlFor="std-decisions">
              Decisions reached
            </label>
            <textarea
              id="std-decisions"
              value={form.decisions}
              onChange={(e) => update({ decisions: e.target.value })}
              rows={6}
              className={cn(textareaCn, 'min-h-[150px]')}
              placeholder="What was agreed in the meeting?"
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="std-actions">
              Actions, one per line
            </label>
            <textarea
              id="std-actions"
              value={form.action_items_text}
              onChange={(e) => update({ action_items_text: e.target.value })}
              rows={5}
              className={cn(textareaCn, 'min-h-[130px]')}
              placeholder={'Update marking scheme by 15 May\nRe-sample 5 portfolios from Sarah\'s cohort\nNext review at end of term'}
            />
            <p className="mt-1.5 text-[12px] text-white">Each line becomes an action you can track.</p>
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
