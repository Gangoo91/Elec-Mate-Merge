import { useEffect, useState } from 'react';
import { Mail, Phone, Share2, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   LogContactSheet (ELE-1909) — log how you got hold of a flagged learner.

   One tap picks the way: a call, a 1-2-1, an email or a referral. It is
   written to pastoral_notes like any other note, so it sits on the learner
   record and counts as "contacted" on the risk flags:
     1-2-1                → kind one_to_one
     call / email / referral → kind intervention
   with contact_method saying which. Older builds never send contact_method;
   their notes keep working.
   ========================================================================== */

export type ContactMethod = 'call' | 'one_to_one' | 'email' | 'referral';

export const CONTACT_METHOD_LABEL: Record<ContactMethod, string> = {
  call: 'Phone call',
  one_to_one: '1-2-1',
  email: 'Email',
  referral: 'Referral',
};

const METHODS: Array<{ key: ContactMethod; icon: typeof Phone; hint: string; placeholder: string }> = [
  { key: 'call', icon: Phone, hint: 'You spoke on the phone.', placeholder: 'What you talked about and what was agreed.' },
  { key: 'one_to_one', icon: Users, hint: 'You met face to face or on a video call.', placeholder: 'What you talked about, the barriers, and the plan you agreed.' },
  { key: 'email', icon: Mail, hint: 'You wrote to them, or to their employer.', placeholder: 'Who you wrote to and what you asked for.' },
  { key: 'referral', icon: Share2, hint: 'You passed them to support: learning support, wellbeing, careers.', placeholder: 'Who you referred them to and why.' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** college_students.id */
  studentId: string;
  studentName: string;
  onSaved?: () => void;
}

export function LogContactSheet({ open, onOpenChange, studentId, studentName, onSaved }: Props) {
  const { toast } = useToast();
  const [method, setMethod] = useState<ContactMethod>('call');
  const [body, setBody] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [nextBy, setNextBy] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMethod('call');
    setBody('');
    setNextStep('');
    setNextBy('');
  }, [open, studentId]);

  const meta = METHODS.find((m) => m.key === method)!;

  const save = async () => {
    if (!body.trim() || saving) return;
    setSaving(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes?.user?.id;
      if (!uid) throw new Error('You are signed out. Sign in and try again.');
      const { data: learner, error: lErr } = await supabase
        .from('college_students')
        .select('college_id')
        .eq('id', studentId)
        .maybeSingle();
      if (lErr) throw lErr;
      const collegeId = (learner as { college_id?: string } | null)?.college_id;
      if (!collegeId) throw new Error('Could not find this learner.');
      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', uid)
        .eq('college_id', collegeId)
        .is('archived_at', null)
        .maybeSingle();
      const { error } = await supabase.from('pastoral_notes').insert({
        student_id: studentId,
        college_id: collegeId,
        author_id: (staff as { id?: string } | null)?.id ?? null,
        kind: method === 'one_to_one' ? 'one_to_one' : 'intervention',
        contact_method: method,
        visibility: 'tutors',
        title: `${CONTACT_METHOD_LABEL[method]} about their risk flags`,
        body: body.trim(),
        action_required: nextStep.trim() || null,
        action_by_date: nextStep.trim() && nextBy ? nextBy : null,
      } as never);
      if (error) throw error;
      toast({ title: 'Contact logged', description: `${CONTACT_METHOD_LABEL[method]} saved on ${studentName}'s record.` });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Could not log the contact', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Risk flags"
      title={`Log contact with ${studentName}`}
      description="How you got hold of them and what was agreed. It goes on their record as a pastoral note."
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => onOpenChange(false)} className={COLLEGE_BTN}>
            Cancel
          </button>
          <button type="button" onClick={save} disabled={!body.trim() || saving} className={COLLEGE_BTN_PRIMARY}>
            {saving ? 'Saving…' : method === 'one_to_one' ? 'Log 1-2-1' : `Log ${CONTACT_METHOD_LABEL[method].toLowerCase()}`}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <p className={labelCn}>How did you get hold of them?</p>
          <div role="radiogroup" aria-label="Contact type" className="grid grid-cols-2 gap-2">
            {METHODS.map((m) => {
              const on = m.key === method;
              const Icon = m.icon;
              return (
                <button
                  key={m.key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setMethod(m.key)}
                  className={cn(
                    'flex min-h-[52px] items-center gap-2.5 rounded-xl border px-3.5 text-left text-[13.5px] font-semibold transition-colors touch-manipulation',
                    on
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.04] text-white hover:border-white/[0.3]'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {CONTACT_METHOD_LABEL[m.key]}
                </button>
              );
            })}
          </div>
          <p className="text-[12.5px] text-white">{meta.hint}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="contact-body" className={labelCn}>
              What happened
            </label>
            <textarea
              id="contact-body"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={meta.placeholder}
              className={textareaCn}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <div>
              <label htmlFor="contact-next" className={labelCn}>
                Next step (optional)
              </label>
              <input
                id="contact-next"
                type="text"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                placeholder="e.g. Check attendance again in two weeks"
                className={inputCn}
              />
            </div>
            <div>
              <label htmlFor="contact-by" className={labelCn}>
                By
              </label>
              <input
                id="contact-by"
                type="date"
                value={nextBy}
                onChange={(e) => setNextBy(e.target.value)}
                disabled={!nextStep.trim()}
                className={inputCn}
              />
            </div>
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
