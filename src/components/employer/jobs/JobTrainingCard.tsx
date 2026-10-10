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
 *
 * The three authorities stay visibly apart (ELE-1833): the apprentice's own
 * log, the firm's workplace attestation, and the college's verification. When
 * the entry is waiting for this firm, Attest is one tap from here.
 */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { GraduationCap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { PlanRow, planBtn, planBtnPrimary } from '@/components/employer/jobs/PlanRow';
import { useDecideOtjAttestation } from '@/hooks/useEmployerOtjAttestations';
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
  {
    value: 'shadowing',
    label: 'Shadowing',
    hint: 'Watching someone experienced do a task they explained',
  },
  {
    value: 'mentoring',
    label: 'Mentoring',
    hint: 'Coached through something new, or a one-to-one',
  },
  {
    value: 'employer_meeting',
    label: 'Toolbox talk',
    hint: 'A briefing or talk that taught something',
  },
  { value: 'manufacturer_training', label: 'Manufacturer training', hint: 'A rep or product demo' },
  { value: 'industry_visit', label: 'Industry visit', hint: 'A wholesaler, factory or show' },
] as const;
const LABEL: Record<string, string> = Object.fromEntries(TYPES.map((t) => [t.value, t.label]));
const HOURS = [0.5, 1, 1.5, 2, 3, 4];

type Stage = 'offered' | 'logged' | 'attested' | 'verified' | 'sent_back';

interface Offer {
  date: string;
  minutes: number;
  type: string;
  logged: boolean;
  /** Added 9 Oct (ELE-1833); absent from an older server. */
  stage?: Stage;
  entry_id?: string | null;
  logged_minutes?: number | null;
  attested_by?: string | null;
  can_confirm?: boolean;
}

interface Apprentice {
  employee_id: string;
  name: string;
  joined: boolean;
  offers: Offer[];
}

/** The three authorities, one line each: apprentice, firm, college. */
function stageLines(o: Offer, first: string) {
  const stage: Stage = o.stage ?? (o.logged ? 'logged' : 'offered');
  const apprentice =
    stage === 'offered'
      ? 'Not logged yet'
      : stage === 'sent_back'
        ? 'Sent back to them to fix'
        : `Logged by ${first}${o.logged_minutes ? `, ${hrs(o.logged_minutes)}` : ''}`;
  const firm =
    stage === 'attested' || stage === 'verified'
      ? `Attested${o.attested_by ? ` by ${o.attested_by}` : ''}`
      : stage === 'logged'
        ? 'Waiting for the firm to attest'
        : 'Not yet';
  const college = stage === 'verified' ? 'Verified' : 'Not verified yet';
  return { stage, apprentice, firm, college };
}

const hrs = (m: number) => `${Math.round((m / 60) * 10) / 10}h`;

export function JobTrainingCard({ jobId }: { jobId: string }) {
  const { data: apprentices = [] } = useQuery({
    queryKey: ['job-training', jobId],
    queryFn: async (): Promise<Apprentice[]> => {
      const { data, error } = await supabase.rpc(
        'get_job_training' as never,
        { p_job: jobId } as never
      );
      if (error) throw error;
      return (data as unknown as Apprentice[]) ?? [];
    },
  });
  const [offerFor, setOfferFor] = useState<Apprentice | null>(null);
  const qc = useQueryClient();
  const decide = useDecideOtjAttestation();
  const [attesting, setAttesting] = useState<string | null>(null);
  if (!apprentices.length) return null;

  const attest = async (entryId: string, first: string) => {
    setAttesting(entryId);
    try {
      await decide.mutateAsync({ entryId, decision: 'attest' });
      qc.invalidateQueries({ queryKey: ['job-training', jobId] });
      toast.success(`Attested for ${first}`, {
        description: 'It now counts as workplace-attested. Their college still verifies it.',
      });
    } catch (e) {
      toast.error((e as Error).message || 'Not attested');
    } finally {
      setAttesting(null);
    }
  };

  return (
    <>
      {apprentices.map((a) => {
        const last = a.offers[0];
        const first =
          a.name
            .replace(/\(.*?\)/g, '')
            .trim()
            .split(/\s+/)[0] || 'them';
        const lines = last ? stageLines(last, first) : null;
        const canAttest = !!(last?.can_confirm && last.entry_id);
        return (
          <PlanRow
            key={a.employee_id}
            helpId="jobs.training"
            icon={GraduationCap}
            tone={
              !lines
                ? 'neutral'
                : lines.stage === 'offered' ||
                    lines.stage === 'sent_back' ||
                    lines.stage === 'logged'
                  ? 'warn'
                  : 'ok'
            }
            title={`Training · ${a.name}`}
            status={
              last
                ? `${LABEL[last.type] ?? 'Training'} ${hrs(last.minutes)}, ${format(parseISO(last.date), 'd MMM')}`
                : 'No training offered from this job yet'
            }
            detail={
              lines ? (
                <dl className="mt-0.5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-0.5">
                  <dt className="font-semibold">Apprentice</dt>
                  <dd>{lines.apprentice}</dd>
                  <dt className="font-semibold">Firm</dt>
                  <dd className={cn(lines.stage === 'logged' && 'font-semibold text-elec-yellow')}>
                    {lines.firm}
                  </dd>
                  <dt className="font-semibold">College</dt>
                  <dd>{lines.college}</dd>
                </dl>
              ) : (
                <p>
                  Teaching on the job counts towards their off-the-job hours. The work itself
                  doesn&rsquo;t.
                </p>
              )
            }
            actions={
              a.joined ? (
                <>
                  {canAttest && (
                    <button
                      type="button"
                      onClick={() => attest(last!.entry_id!, first)}
                      disabled={attesting === last!.entry_id}
                      className={planBtnPrimary}
                    >
                      {attesting === last!.entry_id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Attest'
                      )}
                    </button>
                  )}
                  <button type="button" onClick={() => setOfferFor(a)} className={planBtn}>
                    Counts as training
                  </button>
                </>
              ) : (
                <span className="flex h-11 items-center text-[12.5px] text-white">
                  Not joined the app yet
                </span>
              )
            }
          />
        );
      })}
      {offerFor && (
        <OfferSheet jobId={jobId} apprentice={offerFor} onClose={() => setOfferFor(null)} />
      )}
    </>
  );
}

function OfferSheet({
  jobId,
  apprentice,
  onClose,
}: {
  jobId: string;
  apprentice: Apprentice;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const today = format(new Date(), 'yyyy-MM-dd');
  const [type, setType] = useState<string>('shadowing');
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');
  const first =
    apprentice.name
      .replace(/\(.*?\)/g, '')
      .trim()
      .split(/\s+/)[0] || 'them';

  const offer = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc(
        'offer_training_from_job' as never,
        {
          p_job: jobId,
          p_employee: apprentice.employee_id,
          p_minutes: Math.round(hours * 60),
          p_activity_type: type,
          p_note: note.trim() || null,
          p_date: date,
        } as never
      );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['job-training', jobId] });
      qc.invalidateQueries({ queryKey: ['job-comments', jobId] });
      toast.success(`Sent to ${first}`, {
        description: 'They add what they learned and submit it. You confirm it as usual.',
      });
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
          <button
            type="button"
            className={buttonPrimaryCn}
            disabled={offer.isPending || !date}
            onClick={() => offer.mutate()}
          >
            {offer.isPending ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              `Send to ${first}`
            )}
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
                    type === t.value
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.04] text-white'
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
                <button
                  key={h}
                  type="button"
                  onClick={() => setHours(h)}
                  className={cn(chipBase, hours === h ? chipOn : chipOff)}
                >
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
            <input
              id="tr-date"
              type="date"
              max={today}
              className={inputCn}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
              Doing the job itself is on-the-job training and doesn&rsquo;t count (funding rules,
              paragraph 77). Teaching time on the job does. {first} writes what they learned in
              their own words; nothing is submitted for them.
            </p>
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
