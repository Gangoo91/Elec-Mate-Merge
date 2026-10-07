/**
 * Off-the-job training from a firm job (ELE-1833), on the job sheet. Only
 * shown when an apprentice is on the job.
 *
 * The funding rules (paras 77–78) are firm on this: the apprentice doing the
 * work is ON-the-job training and never counts. What counts is the teaching
 * that happened on the job: shadowing, mentoring, a one-to-one, a toolbox
 * talk, manufacturer training or an industry visit. The office offers it; the
 * apprentice gets a bell that opens their own log form filled in, adds what
 * they learned and submits it. The firm then attests it as usual.
 */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { GraduationCap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  textareaCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
  infoPanelCn,
} from '@/components/forms/fieldStyles';

const TYPES = [
  { value: 'shadowing', label: 'Shadowing', hint: 'Watching someone experienced do a task they explained' },
  { value: 'mentoring', label: 'Mentoring', hint: 'Coached through something new, or a one-to-one' },
  { value: 'employer_meeting', label: 'Toolbox talk', hint: 'A briefing or talk that taught something' },
  { value: 'manufacturer_training', label: 'Manufacturer training', hint: 'A rep or product demo' },
  { value: 'industry_visit', label: 'Industry visit', hint: 'A wholesaler, factory or show' },
] as const;
const LABEL: Record<string, string> = Object.fromEntries(TYPES.map((t) => [t.value, t.label]));
const HOURS = [0.5, 1, 1.5, 2, 3, 4];

interface Apprentice {
  employee_id: string;
  name: string;
  joined: boolean;
  offers: { date: string; minutes: number; type: string; logged: boolean }[];
}

const hrs = (m: number) => `${Math.round((m / 60) * 10) / 10}h`;

export function JobTrainingCard({ jobId }: { jobId: string }) {
  const { data: apprentices = [] } = useQuery({
    queryKey: ['job-training', jobId],
    queryFn: async (): Promise<Apprentice[]> => {
      const { data, error } = await supabase.rpc('get_job_training' as never, { p_job: jobId } as never);
      if (error) throw error;
      return (data as unknown as Apprentice[]) ?? [];
    },
  });
  const [offerFor, setOfferFor] = useState<Apprentice | null>(null);
  if (!apprentices.length) return null;

  return (
    <div data-help="jobs.training" className="rounded-2xl border border-white/[0.1] bg-white/[0.04]">
      <div className="px-4 pt-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">Training for apprentices</p>
        <p className="mt-1 text-[13px] text-white">
          Teaching on this job can count towards their off-the-job hours. The work itself can&rsquo;t.
        </p>
      </div>
      <ul className="divide-y divide-white/[0.07]">
        {apprentices.map((a) => (
          <li key={a.employee_id} className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-white">{a.name}</p>
              {a.offers.length === 0 ? (
                <p className="text-[12.5px] text-white">Nothing offered from this job yet</p>
              ) : (
                a.offers.slice(0, 3).map((o, i) => (
                  <p key={i} className="text-[12.5px] text-white">
                    {LABEL[o.type] ?? 'Training'} {hrs(o.minutes)}, {format(parseISO(o.date), 'd MMM')} ·{' '}
                    {o.logged ? 'logged by them' : 'waiting for them to log it'}
                  </p>
                ))
              )}
            </div>
            {a.joined ? (
              <button
                type="button"
                onClick={() => setOfferFor(a)}
                className={cn(buttonSecondaryCn, 'inline-flex w-auto shrink-0 items-center gap-1.5 px-3')}
              >
                <GraduationCap className="h-4 w-4 text-elec-yellow" />
                Counts as training
              </button>
            ) : (
              <span className="shrink-0 pt-1 text-[12.5px] text-white">Not joined the app yet</span>
            )}
          </li>
        ))}
      </ul>
      {offerFor && <OfferSheet jobId={jobId} apprentice={offerFor} onClose={() => setOfferFor(null)} />}
    </div>
  );
}

function OfferSheet({ jobId, apprentice, onClose }: { jobId: string; apprentice: Apprentice; onClose: () => void }) {
  const qc = useQueryClient();
  const today = format(new Date(), 'yyyy-MM-dd');
  const [type, setType] = useState<string>('shadowing');
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');
  const first = apprentice.name.replace(/\(.*?\)/g, '').trim().split(/\s+/)[0] || 'them';

  const offer = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('offer_training_from_job' as never, {
        p_job: jobId,
        p_employee: apprentice.employee_id,
        p_minutes: Math.round(hours * 60),
        p_activity_type: type,
        p_note: note.trim() || null,
        p_date: date,
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['job-training', jobId] });
      qc.invalidateQueries({ queryKey: ['job-comments', jobId] });
      toast.success(`Sent to ${first}`, { description: 'They add what they learned and submit it. You confirm it as usual.' });
      onClose();
    },
    onError: (e: Error) => toast.error(e.message || 'Not sent'),
  });

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Off-the-job training"
      title={`What did ${first} learn?`}
      description="Pick the teaching that happened. They get a message that opens their log with this filled in."
      width="wide"
      footer={
        <div className="grid grid-cols-2 gap-2 lg:ml-auto lg:max-w-md">
          <button type="button" className={buttonSecondaryCn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={buttonPrimaryCn} disabled={offer.isPending || !date} onClick={() => offer.mutate()}>
            {offer.isPending ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : `Send to ${first}`}
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          <div>
            <span className={labelCn}>What kind</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={cn(
                    'min-h-14 rounded-xl border px-3 py-2 text-left touch-manipulation',
                    type === t.value ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.12] bg-white/[0.04] text-white'
                  )}
                >
                  <span className="block text-[14px] font-semibold">{t.label}</span>
                  <span className="block text-[12px]">{t.hint}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCn}>How long</span>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {HOURS.map((h) => (
                <button key={h} type="button" onClick={() => setHours(h)} className={cn(chipBase, hours === h ? chipOn : chipOff)}>
                  {h}h
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="max-w-[14rem]">
            <label className={labelCn} htmlFor="tr-date">
              When
            </label>
            <input id="tr-date" type="date" max={today} className={inputCn} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className={labelCn} htmlFor="tr-note">
              A note for them (optional, shown in their message)
            </label>
            <textarea
              id="tr-note"
              rows={3}
              className={textareaCn}
              value={note}
              maxLength={300}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dan talked through RCD testing and what the readings mean"
            />
          </div>
          <div className={infoPanelCn}>
            <p className="text-[13px] leading-relaxed text-white">
              Doing the job itself is on-the-job training and doesn&rsquo;t count (funding rules, paragraph 77). Teaching
              time on the job does. {first} writes what they learned in their own words; nothing is submitted for
              them.
            </p>
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
