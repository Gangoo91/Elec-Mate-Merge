/**
 * "Suggest a slot" (ELE-2072): the best three people and days for a job.
 *
 * The database picks them (suggest_job_slots): never anyone on leave or who
 * has asked for it, never anyone missing a credential the job needs on that
 * day, never an apprentice on their own, and only as many as the job still
 * needs. This sheet checks each one again with the same crew check as the
 * job sheet and diary (ELE-1834), so the two can never disagree, and swaps
 * the straight-line estimate for a real drive time. Booking goes through
 * the diary's own dispatch path, so the person gets the usual push.
 */
import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import {
  panel,
  Rows,
  Row,
  Segments,
  rowBtnPrimary,
  rowBtnSecondary,
  PlainEmpty,
} from '@/components/employer/pageParts/PageParts';
import { dispatchErrorMessage } from '@/hooks/useDispatchBoard';
import { useCrewCompetence } from '@/hooks/useCrewCompetence';
import { checkCrew } from '@/utils/crewCompetence';
import {
  useSuggestSlots,
  useDriveMinutes,
  useDispatchAssignCrew,
  placeFor,
  legKey,
  halfWord,
  type SlotOption,
} from '@/hooks/useSmartScheduling';
import {
  addDaysYmd,
  mondayOf,
  todayYmd,
  fmtDay,
  rangeLabel,
  firstName,
} from '@/components/employer/diary/dispatchModel';

type Window = 'week' | 'next' | 'three';

const WINDOWS: { value: Window; label: string }[] = [
  { value: 'week', label: 'Next 7 days' },
  { value: 'next', label: 'Next week' },
  { value: 'three', label: '3 weeks' },
];

interface Props {
  job: {
    id: string;
    title: string;
    location?: string | null;
    lat?: number | null;
    lng?: number | null;
  };
  onClose: () => void;
  onBooked?: () => void;
}

export function SuggestSlotSheet({ job, onClose, onBooked }: Props) {
  const [win, setWin] = useState<Window>('week');
  const [booking, setBooking] = useState<number | null>(null);
  const range = useMemo(() => {
    const today = todayYmd();
    if (win === 'next') return { from: addDaysYmd(mondayOf(today), 7), days: 5 };
    if (win === 'three') return { from: today, days: 21 };
    return { from: today, days: 7 };
  }, [win]);

  const { data, isLoading, isError, error } = useSuggestSlots(job.id, range.from, range.days);
  const { matrix, isLoading: matrixLoading } = useCrewCompetence();
  const assign = useDispatchAssignCrew();

  // The same crew check as the job sheet: anything it would flag is dropped.
  const options = useMemo(() => {
    const req = data?.required ?? [];
    return (data?.options ?? [])
      .filter((o) =>
        o.people.every((p) => {
          const gaps = checkCrew(
            matrix,
            req,
            [{ employeeId: p.employee_id, name: p.name, role: p.role }],
            o.day
          ).personGaps[p.employee_id];
          return !gaps?.length;
        })
      )
      .slice(0, 3);
  }, [data, matrix]);

  const dest = data?.job ? placeFor(data.job) : placeFor(job);
  const pairs = useMemo<Array<[string, string]>>(
    () =>
      dest
        ? options.flatMap((o) =>
            o.people
              .filter((p) => p.from_lat != null && p.from_lng != null)
              .map((p) => [`${p.from_lat},${p.from_lng}`, dest] as [string, string])
          )
        : [],
    [options, dest]
  );
  const drive = useDriveMinutes(pairs, !!dest);

  const book = async (o: SlotOption, i: number) => {
    setBooking(i);
    try {
      // One call for the whole crew: all booked, or nobody.
      await assign.mutateAsync({
        jobId: job.id,
        employeeIds: o.people.map((p) => p.employee_id),
        start: o.day,
        end: o.end_day ?? o.day,
        startTime: o.half === 'day' ? null : o.start_time,
        hours: o.half === 'day' ? null : o.hours,
        jobTitle: job.title,
        jobLocation: job.location ?? null,
      });
      const who = o.people.map((p) => firstName(p.name)).join(' and ');
      toast.success(`${who} booked on ${job.title}`, {
        description: `${o.days > 1 ? rangeLabel(o.day, o.end_day ?? o.day) : `${fmtDay(o.day, { weekday: 'long', day: 'numeric', month: 'short' })}, ${halfWord(o.half)}`}. The push goes as for any diary booking.`,
      });
      onBooked?.();
      onClose();
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    } finally {
      setBooking(null);
    }
  };

  const loading = isLoading || matrixLoading;
  const needs = data?.required_labels?.length ? data.required_labels.join(', ') : null;

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Suggest a slot"
      title={job.title}
      description={
        needs
          ? `The best people and days: free, not on leave, holding ${needs} on the day.`
          : 'The best people and days: free and not on leave. Set what the crew must hold under Who can go to narrow it.'
      }
      width="wide"
      subheader={
        <div className="py-3">
          <Segments items={WINDOWS} value={win} onChange={setWin} />
        </div>
      }
      footer={
        <button type="button" className={cn(buttonSecondaryCn, 'w-full')} onClick={onClose}>
          Close
        </button>
      }
    >
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        </div>
      ) : isError ? (
        <PlainEmpty text={dispatchErrorMessage(error)} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <section className="min-w-0">
            <h3 className="mb-3 text-[15px] font-semibold text-white">
              {options.length
                ? `Best ${options.length === 1 ? 'option' : `${options.length} options`}`
                : 'Nobody fits yet'}
            </h3>
            {options.length === 0 ? (
              <PlainEmpty
                text={
                  needs
                    ? `Nobody holding ${needs} is free in this window. Try a longer window, or check who is ruled out and why.`
                    : 'Nobody is free in this window. Try a longer one.'
                }
                action={win !== 'three' ? 'Look 3 weeks ahead' : undefined}
                onAction={() => setWin('three')}
              />
            ) : (
              <div className={panel}>
                <Rows>
                  {options.map((o, i) => {
                    const who = o.people.map((p) => p.name).join(' and ');
                    const when =
                      o.days > 1
                        ? rangeLabel(o.day, o.end_day ?? o.day)
                        : `${fmtDay(o.day, { weekday: 'long', day: 'numeric', month: 'short' })}, ${halfWord(o.half)}`;
                    const lead = o.people[0];
                    const real =
                      dest && lead?.from_lat != null
                        ? drive.get(legKey(`${lead.from_lat},${lead.from_lng}`, dest))
                        : undefined;
                    // One detail line: when, then the drive. The reason text
                    // repeats the day, so it is not shown here.
                    const driveText =
                      real != null
                        ? `${real} min drive`
                        : lead?.est_minutes != null
                          ? `about ${lead.est_minutes} min away`
                          : 'no drive time on record';
                    return (
                      <div
                        key={`${o.day}-${o.half}-${who}`}
                        className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                        data-testid="slot-option"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-semibold leading-snug text-white">{who}</p>
                          <p className="text-[13px] leading-snug text-white">
                            {when} · {driveText}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={booking !== null}
                          onClick={() => book(o, i)}
                          className={cn(
                            i === 0 ? rowBtnPrimary : rowBtnSecondary,
                            'min-w-[84px] shrink-0'
                          )}
                        >
                          {booking === i ? (
                            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                          ) : (
                            'Book'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </Rows>
              </div>
            )}
            {data?.job && !data.job.has_location && (
              <p className="mt-3 text-[13px] text-white">
                This job has no map pin, so distance doesn&rsquo;t count. Add the address on the job
                to rank by travel.
              </p>
            )}
          </section>

          <aside className="min-w-0 space-y-4">
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-white">What it looked at</h3>
              <p className="text-[13px] leading-relaxed text-white">
                {data?.days && data.days > 1
                  ? `${data.days} working days in a row`
                  : `${data?.hours ?? 8}h on the day (${(data?.hours ?? 8) <= 4.5 ? 'a morning or an afternoon' : 'a full day'})`}
                {data?.needed && data.needed > 1 ? `, ${data.needed} people together` : ''}. Leave,
                requests for leave, the diary and online bookings waiting to be accepted all count.
                Travel is from that day&rsquo;s other job, else where they checked in today, else
                the office.
              </p>
            </div>
            {(data?.excluded?.length ?? 0) > 0 && (
              <div>
                <h3 className="mb-2 text-[15px] font-semibold text-white">Ruled out</h3>
                <div className={panel}>
                  <Rows>
                    {data!.excluded.map((e) => (
                      <Row key={e.employee_id} title={e.name} detail={e.why} />
                    ))}
                  </Rows>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </FormSheet>
  );
}
