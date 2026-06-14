import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  PrimaryButton,
  SecondaryButton,
  SheetShell,
} from '@/components/college/primitives';
import { useCohortMessaging } from '@/hooks/useCohortMessaging';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          title="Message the cohort"
          subtitle={
            cohortName
              ? `Email every active apprentice in ${cohortName}`
              : 'Email every active apprentice in a cohort'
          }
          onClose={() => onOpenChange(false)}
        >
          <div className="px-5 py-4 space-y-4 overflow-y-auto">
            {!defaultCohortId && (
              <div>
                <label className="text-xs uppercase tracking-wider text-white/50">
                  Cohort
                </label>
                <Select
                  value={cohortId ?? ''}
                  onValueChange={(v) => setCohortId(v || null)}
                >
                  <SelectTrigger className="mt-1 h-11 bg-elec-gray border-white/30 touch-manipulation">
                    <SelectValue placeholder="Pick a cohort" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/10 text-white">
                    {cohorts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Subject
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Tomorrow's class is rescheduled"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">
                Message
              </label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={9}
                placeholder={
                  'Hi all,\n\nThe class scheduled for Tuesday 14:00 has been moved to Thursday 09:00 in Workshop 2.\n\nBring your test leads + multimeter.\n\nSee you Thursday.'
                }
                className="touch-manipulation text-base border-white/30 focus:border-yellow-500"
              />
              <p className="mt-1 text-[11px] text-white/70">
                Double line breaks become paragraphs. Single line breaks stay on the
                next line. UK English only — apprentices read this on their phone.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/60 leading-relaxed">
              Every apprentice gets a copy emailed to the address on their record.
              Replies go to your tutor inbox.
            </div>
          </div>

          <div className="border-t border-white/10 p-4 flex justify-end gap-2">
            <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={handleSend}
              disabled={sending || !cohortId || !subject.trim() || !body.trim()}
            >
              {sending ? 'Sending…' : 'Send to cohort'}
            </PrimaryButton>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
