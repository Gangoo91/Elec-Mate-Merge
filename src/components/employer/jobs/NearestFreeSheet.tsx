/**
 * "Who's nearest" for an urgent job (ELE-1827). The team, free ones first,
 * by drive time from where they last checked in (positions are only kept
 * while someone is clocked in, and for 30 days). Each row also says what they
 * lack for this job (ELE-1834) and what they're on today. One tap books them
 * on the job for today (only people the crew check allows); the booking push goes as for any diary booking.
 */
import { useEffect, useMemo, useState } from 'react';
import { confirmRtw } from '@/components/employer/people/RtwGuard';
import { format } from 'date-fns';
import { Loader2, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import {
  panel,
  Rows,
  rowBtnPrimary,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import { useDispatchAssign } from '@/hooks/useDispatchBoard';
import { useCrewCompetence } from '@/hooks/useCrewCompetence';
import { checkCrew } from '@/utils/crewCompetence';

interface Candidate {
  employee_id: string;
  name: string;
  role: string | null;
  phone: string | null;
  lat: number | null;
  lng: number | null;
  last_updated: string | null;
  at_job: string | null;
  km: number | null;
  on_this_job: boolean;
  /** On this job today: the crew an apprentice can go alongside. */
  on_this_job_today?: boolean;
  booked_on: string | null;
  on_leave: boolean;
  free: boolean;
}

interface Props {
  job: {
    id: string;
    title: string;
    location?: string | null;
    required_credentials?: string[] | null;
    start_date?: string | null;
  };
  onClose: () => void;
}

export function NearestFreeSheet({ job, onClose }: Props) {
  const assign = useDispatchAssign();
  const { matrix } = useCrewCompetence();
  const [drive, setDrive] = useState<Record<string, string>>({});
  const [booking, setBooking] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['nearest-candidates', job.id],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        'get_nearest_candidates' as never,
        { p_job: job.id } as never
      );
      if (error) throw error;
      return data as unknown as {
        job: { location: string | null; lat: number | null; lng: number | null };
        people: Candidate[];
      };
    },
  });
  const people = useMemo(() => (data?.people ?? []).filter((p) => !p.on_this_job), [data]);

  // Real drive time for the closest few with a recent position.
  useEffect(() => {
    const dest =
      data?.job?.location?.trim() ||
      (data?.job?.lat != null ? `${data.job.lat},${data.job.lng}` : '');
    if (!dest) return;
    const near = people.filter((p) => p.lat != null && p.km != null).slice(0, 6);
    near.forEach(async (p) => {
      try {
        const { data: t } = await supabase.functions.invoke('google-travel-time', {
          body: { origin: `${p.lat},${p.lng}`, destination: dest },
        });
        const r = t as { minutes?: number } | null;
        if (r?.minutes) setDrive((d) => ({ ...d, [p.employee_id]: `${r.minutes} min drive` }));
      } catch {
        /* straight-line distance stays */
      }
    });
  }, [data, people]);

  // The same crew check as the job sheet and Suggest a slot: what each person
  // lacks for this job, and an apprentice is never sent on their own (only
  // alongside someone qualified already on the job).
  const crewOnJob = useMemo(
    () =>
      (data?.people ?? [])
        .filter((p) => p.on_this_job_today)
        .map((p) => ({ employeeId: p.employee_id, name: p.name, role: p.role })),
    [data]
  );
  const gaps = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const p of people) {
      const me = { employeeId: p.employee_id, name: p.name, role: p.role };
      const g = [
        ...(checkCrew(matrix, job.required_credentials ?? [], [me], job.start_date).personGaps[
          p.employee_id
        ] ?? []),
      ];
      if (checkCrew(matrix, [], [...crewOnJob, me], job.start_date).apprenticesOnly) {
        g.unshift('Apprentice, needs someone qualified with them');
      }
      if (g.length) out[p.employee_id] = g;
    }
    return out;
  }, [people, crewOnJob, matrix, job.required_credentials, job.start_date]);
  const canBook = (p: Candidate) => !p.on_leave && !gaps[p.employee_id];
  // The top pick: the first free person who can go, as the list is nearest first.
  const topPick = people.find((p) => p.free && canBook(p))?.employee_id ?? null;

  const book = async (p: Candidate) => {
    // ELE-2061: warn or block on anyone without a right-to-work check.
    if (!(await confirmRtw([p.employee_id], 'dispatch'))) return;
    setBooking(p.employee_id);
    const today = format(new Date(), 'yyyy-MM-dd');
    try {
      await assign.mutateAsync({
        jobId: job.id,
        employeeId: p.employee_id,
        start: today,
        end: today,
        email: true,
        jobTitle: job.title,
        jobLocation: job.location ?? null,
      });
      toast.success(`${p.name.split(' ')[0]} booked on ${job.title} today`, {
        description: 'They get a push now.',
      });
      onClose();
    } catch (e) {
      toast.error((e as Error).message || 'Not booked');
    } finally {
      setBooking(null);
    }
  };

  const seen = (iso: string | null) => (iso ? format(new Date(iso), 'HH:mm') : null);

  const where = (p: Candidate) =>
    drive[p.employee_id] ?? (p.km != null ? `${p.km} km away` : 'not clocked in, so no position');
  const status = (p: Candidate) =>
    p.on_leave ? 'On leave today' : p.booked_on ? `Booked on ${p.booked_on}` : 'Free today';

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Who's nearest"
      title={job.title}
      description="Free people first, by drive time from where they last checked in today. Positions are only shared while someone is clocked in."
      width="wide"
      footer={
        <button type="button" className={cn(buttonSecondaryCn, 'w-full')} onClick={onClose}>
          Close
        </button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        </div>
      ) : people.length === 0 ? (
        <p className="text-[14px] text-white">Everyone on the team is already on this job.</p>
      ) : (
        <div className={panel}>
          <Rows>
            {people.map((p) => {
              const g = gaps[p.employee_id];
              const seenAt = p.last_updated
                ? ` · seen ${seen(p.last_updated)}${p.at_job ? ` at ${p.at_job}` : ''}`
                : '';
              return (
                <div
                  key={p.employee_id}
                  className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                  data-testid="nearest-row"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-snug text-white">
                      {p.name}
                      {p.role ? <span className="font-normal"> · {p.role}</span> : null}
                    </p>
                    <p className="text-[13px] leading-snug text-white">
                      {status(p)} · {where(p)}
                      {seenAt}
                    </p>
                    {g && (
                      <p className="mt-0.5 text-[13px] font-medium leading-snug text-orange-300">
                        {g.join(' · ')}
                      </p>
                    )}
                  </div>
                  {p.phone && (
                    <a
                      href={`tel:${p.phone.replace(/[^\d+]/g, '')}`}
                      aria-label={`Call ${p.name}`}
                      className={cn(rowBtnSecondary, 'w-11 px-0')}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {canBook(p) && (
                    <button
                      type="button"
                      disabled={!!booking}
                      onClick={() => book(p)}
                      className={cn(
                        p.employee_id === topPick ? rowBtnPrimary : rowBtnSecondary,
                        'min-w-[84px]'
                      )}
                    >
                      {booking === p.employee_id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : p.free ? (
                        'Book'
                      ) : (
                        'Book anyway'
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </Rows>
        </div>
      )}
    </FormSheet>
  );
}
