import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { useCohortMessaging } from '@/hooks/useCohortMessaging';
import { useCollegeCohortsLite } from '@/hooks/useCollegeReports';

/* ==========================================================================
   CohortMessageSheet — broadcast email to every active learner in a cohort.
   Sends via the send-cohort-message edge fn (Brevo). Logs to college_activity.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, locks the cohort selector. Otherwise tutor picks from the
   *  cohorts in their college via the lite hook. */
  defaultCohortId?: string | null;
  defaultCohortName?: string | null;
}

// Tiny markdown-ish text → safe HTML. We escape everything then expand
// paragraph breaks. The edge fn does not trust this — it just wraps it for
// email render — so XSS surface is the apprentice's email client only, but
// we still escape defensively.
function bodyToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .split(/\n{2,}/)
    .map((para) => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
    .join('');
}

export function CohortMessageSheet({
  open,
  onOpenChange,
  defaultCohortId,
  defaultCohortName,
}: Props) {
  const { send, sending } = useCohortMessaging();
  const { cohorts } = useCollegeCohortsLite();
  const { toast } = useToast();

  const [cohortId, setCohortId] = useState<string | null>(defaultCohortId ?? null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (open) {
      setCohortId(defaultCohortId ?? null);
      if (!defaultCohortId && cohorts.length === 1) setCohortId(cohorts[0].id);
    } else {
      setSubject('');
      setBody('');
    }
  }, [open, defaultCohortId, cohorts]);

  const cohortName =
    defaultCohortName ?? cohorts.find((c) => c.id === cohortId)?.name ?? null;

  const handleSend = async () => {
    if (!cohortId) {
      toast({ title: 'Pick a cohort', variant: 'destructive' });
      return;
    }
    if (!subject.trim() || !body.trim()) {
      toast({ title: 'Subject and message required', variant: 'destructive' });
      return;
    }
    try {
      const result = await send({
        cohortId,
        subject: subject.trim(),
        bodyHtml: bodyToHtml(body.trim()),
      });
      const failureLine = result.failed > 0 ? ` · ${result.failed} failed` : '';
      toast({
        title: `Sent to ${result.sent} apprentices${failureLine}`,
        description: cohortName
          ? `${cohortName} — ${result.recipients} recipients in scope`
          : undefined,
        variant: result.failed > 0 ? 'destructive' : undefined,
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not send',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const canSend = !sending && !!cohortId && !!subject.trim() && !!body.trim();

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={cohortName ? `Message · ${cohortName}` : 'Message a cohort'}
      title="Message the cohort"
      description={
        cohortName
          ? `Emails every active apprentice in ${cohortName}.`
          : 'Emails every active apprentice in the cohort you pick.'
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button type="button" onClick={handleSend} disabled={!canSend} className={buttonPrimaryCn}>
            {sending ? 'Sending…' : 'Send to cohort'}
          </button>
        </div>
      }
    >
      <div className="min-w-0 space-y-5">
        {!defaultCohortId && (
          <div>
            <p className={labelCn}>Cohort</p>
            {cohorts.length === 0 ? (
              <p className="text-[13px] text-white">No cohorts yet. Create one under Cohorts first.</p>
            ) : cohorts.length <= 6 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {cohorts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={cohortId === c.id}
                    className={cn(chipCn(cohortId === c.id), 'h-11')}
                    onClick={() => setCohortId(c.id)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            ) : (
              <MobileSelectPicker
                value={cohortId ?? ''}
                onValueChange={(v) => setCohortId(v || null)}
                title="Cohort"
                placeholder="Choose a cohort"
                options={cohorts.map((c) => ({ value: c.id, label: c.name }))}
              />
            )}
          </div>
        )}

        <div>
          <label className={labelCn} htmlFor="cm-subject">
            Subject
          </label>
          <input
            id="cm-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Tomorrow's class is rescheduled"
            className={inputCn}
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="cm-body">
            Message
          </label>
          <textarea
            id="cm-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder={
              'Hi all,\n\nThe class scheduled for Tuesday 14:00 has been moved to Thursday 09:00 in Workshop 2.\n\nBring your test leads and multimeter.\n\nSee you Thursday.'
            }
            className={cn(textareaCn, 'min-h-[220px]')}
          />
        </div>
      </div>

      <aside className="min-w-0 space-y-3 border-t border-white/[0.08] pt-5 text-[13px] leading-relaxed text-white lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <h3 className="text-[15px] font-semibold text-white">How it goes out</h3>
        <p>Every active apprentice gets a copy emailed to the address on their record. Replies go to your tutor inbox.</p>
        <p>A blank line starts a new paragraph. A single line break stays on the next line.</p>
        <p>Apprentices read this on their phone, so keep it short.</p>
      </aside>
    </FormSheet>
  );
}
