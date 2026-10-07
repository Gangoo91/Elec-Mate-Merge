/**
 * A new firm's first job, guided (ELE-1819).
 *
 * From the Overview setup checklist: the New Job sheet in guided mode (dates
 * pencilled in, a short note on each step), then "Book someone on it" (the
 * diary's dispatch_assign, so it lands in their Worker Tools with a push),
 * then the job sheet with what to do next (send the RAMS pack, raise a quote).
 *
 * Nothing here is a dead end: no team yet → add someone from inside the
 * booking step; not ready to book → skip and still land on the job.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { addDays, format, getDay } from 'date-fns';
import { Check, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { AddJobDialog } from '@/components/employer/dialogs/AddJobDialog';
import { AddEmployeeDialog } from '@/components/employer/dialogs/AddEmployeeDialog';
import {
  Eyebrow,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import { useEmployees } from '@/hooks/useEmployees';
import { useDispatchAssign } from '@/hooks/useDispatchBoard';
import { EMPLOYER_HOME_KEY } from '@/hooks/useEmployerHome';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Job } from '@/services/jobService';

/** Tomorrow, or Monday when tomorrow is the weekend. */
function nextWorkingDay(from = new Date()): string {
  let d = addDays(from, 1);
  while (getDay(d) === 0 || getDay(d) === 6) d = addDays(d, 1);
  return format(d, 'yyyy-MM-dd');
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase() || '?';

export type FirstJobStage = 'job' | 'book';

export function FirstJobGuide({
  stage: initialStage,
  existingJob,
  onClose,
}: {
  /** null = closed. 'book' skips straight to booking on existingJob. */
  stage: FirstJobStage | null;
  existingJob?: Job | null;
  onClose: () => void;
}) {
  const [, setSearchParams] = useSearchParams();
  const [stage, setStage] = useState<FirstJobStage | null>(initialStage);
  const [job, setJob] = useState<Job | null>(existingJob ?? null);
  const created = useRef(false);

  useEffect(() => {
    setStage(initialStage);
    setJob(existingJob ?? null);
    created.current = false;
  }, [initialStage, existingJob]);

  const defaults = useMemo(() => {
    const d = nextWorkingDay();
    return { startDate: d, endDate: d, status: 'Active' as const, workersCount: '1' };
  }, []);

  const land = (jobId: string) => {
    setStage(null);
    onClose();
    setSearchParams({ section: 'jobs', job: jobId, firstjob: jobId });
  };

  return (
    <>
      <AddJobDialog
        guided
        defaults={defaults}
        open={stage === 'job'}
        onOpenChange={(o) => {
          if (o) return;
          // onCreated fires in the same tick as the close; only a real
          // dismissal ends the guide.
          window.setTimeout(() => {
            if (!created.current) {
              setStage(null);
              onClose();
            }
          }, 0);
        }}
        onCreated={(j) => {
          created.current = true;
          setJob(j);
          setStage('book');
        }}
      />
      {job && (
        <BookFirstPerson
          open={stage === 'book'}
          job={job}
          onSkip={() => land(job.id)}
          onBooked={() => land(job.id)}
        />
      )}
    </>
  );
}

function BookFirstPerson({
  open,
  job,
  onSkip,
  onBooked,
}: {
  open: boolean;
  job: Job;
  onSkip: () => void;
  onBooked: () => void;
}) {
  const queryClient = useQueryClient();
  const { data: employees = [], isLoading } = useEmployees();
  const assign = useDispatchAssign();
  const roster = useMemo(
    () => employees.filter((e) => (e.status ?? 'active').toLowerCase() !== 'archived'),
    [employees]
  );
  const [picked, setPicked] = useState<string | null>(null);
  // Never book into the past: an older job starts from today.
  const today = format(new Date(), 'yyyy-MM-dd');
  const firstDay =
    job.start_date && job.start_date >= today
      ? job.start_date
      : job.start_date
        ? today
        : nextWorkingDay();
  const lastDay = job.end_date && job.end_date >= firstDay ? job.end_date : firstDay;
  const [start, setStart] = useState(firstDay);
  const [end, setEnd] = useState(lastDay);
  const [time, setTime] = useState('08:00');
  const [addOpen, setAddOpen] = useState(false);
  const seen = useRef<Set<string>>(new Set());

  // One person on the team: pick them. Someone just added: pick them.
  useEffect(() => {
    if (!open) return;
    const ids = roster.map((r) => r.id);
    const fresh = ids.filter((id) => !seen.current.has(id));
    if (seen.current.size > 0 && fresh.length === 1) setPicked(fresh[0]);
    else if (!picked && roster.length === 1) setPicked(roster[0].id);
    ids.forEach((id) => seen.current.add(id));
  }, [roster, open, picked]);

  const person = roster.find((r) => r.id === picked) ?? null;
  const first = person?.name.split(' ')[0] ?? '';
  const backwards = !!(start && end && end < start);

  const book = async () => {
    if (!person || !start || backwards) return;
    try {
      await assign.mutateAsync({
        jobId: job.id,
        employeeId: person.id,
        start,
        end: end || start,
        startTime: time || null,
        email: !!person.email,
        jobTitle: job.title,
        jobLocation: job.location,
      });
      queryClient.invalidateQueries({ queryKey: [...EMPLOYER_HOME_KEY] });
      toast({
        title: `${first} is booked`,
        description: person.user_id
          ? `${job.title} is in their Worker Tools now.`
          : `They will see ${job.title} as soon as they join.`,
      });
      onBooked();
    } catch (e) {
      toast({
        title: 'Could not book them',
        description: (e as Error)?.message ?? 'Check your connection and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onSkip()}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08] bg-[hsl(0_0%_8%)]"
      >
        <SheetTitle className="sr-only">Book someone on {job.title}</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="flex justify-center pt-2.5 pb-1 shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="shrink-0 border-b border-white/[0.06] px-4 sm:px-5 pb-3">
            <div className="mx-auto w-full max-w-5xl">
              <Eyebrow>Your first job · step 4 of 4</Eyebrow>
              <p className="mt-0.5 text-[19px] font-semibold text-white leading-tight">
                Book someone on it
              </p>
              <p className="mt-0.5 text-[13px] text-white truncate">
                {[job.title, job.client, job.location].filter(Boolean).join(' · ')}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4">
            <div className="mx-auto w-full max-w-5xl space-y-5">
              <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.12] border-l-[3px] border-l-elec-yellow sm:border-l-[3px] sm:border-l-elec-yellow bg-white/[0.03] px-4 py-3.5">
                <p className="text-[14px] font-semibold text-white">Who is going?</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white">
                  Whoever you book gets a notification and sees the job in their Worker Tools, with
                  the address, dates and your notes. You can add more people later from the diary.
                </p>
              </div>

              <div className="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8 lg:space-y-0">
                <section>
                  <h2 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
                    Your team
                  </h2>
                  {isLoading ? (
                    <p className="text-[14px] text-white">Loading your team…</p>
                  ) : roster.length === 0 ? (
                    <div className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 space-y-3">
                      <p className="text-[14px] text-white leading-relaxed">
                        Nobody is on your team yet. Add the first person here: they get an email
                        invite and link up when they sign in.
                      </p>
                      <PrimaryButton fullWidth onClick={() => setAddOpen(true)}>
                        Add someone
                      </PrimaryButton>
                    </div>
                  ) : (
                    <ul className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] divide-y divide-white/[0.07]">
                      {roster.map((r) => {
                        const on = r.id === picked;
                        return (
                          <li key={r.id}>
                            <button
                              type="button"
                              onClick={() => setPicked(r.id)}
                              aria-pressed={on}
                              className="w-full min-h-[60px] flex items-center gap-3 px-4 py-2.5 text-left touch-manipulation"
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  'h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-[12.5px] font-bold',
                                  on ? 'bg-elec-yellow text-black' : 'bg-white/[0.1] text-white'
                                )}
                              >
                                {on ? (
                                  <Check className="h-5 w-5" />
                                ) : (
                                  r.avatar_initials || initials(r.name)
                                )}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[15px] font-semibold text-white truncate">
                                  {r.name}
                                </span>
                                <span className="block text-[13px] text-white truncate">
                                  {[r.team_role || r.role, r.user_id ? null : 'Not joined yet']
                                    .filter(Boolean)
                                    .join(' · ')}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                      <li>
                        <button
                          type="button"
                          onClick={() => setAddOpen(true)}
                          className="w-full h-12 flex items-center gap-3 px-4 text-left text-[14px] font-semibold text-elec-yellow touch-manipulation"
                        >
                          <Plus className="h-4 w-4" aria-hidden />
                          Add someone new
                        </button>
                      </li>
                    </ul>
                  )}
                </section>

                {roster.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-[15px] font-semibold tracking-tight text-white">When</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="From">
                        <Input
                          type="date"
                          value={start}
                          onChange={(e) => setStart(e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="To">
                        <Input
                          type="date"
                          value={end}
                          min={start || undefined}
                          onChange={(e) => setEnd(e.target.value)}
                          className={cn(inputClass, backwards && 'border-red-400')}
                        />
                      </Field>
                    </div>
                    {backwards && (
                      <p className="text-[12px] text-red-300">
                        The end date is before the start date.
                      </p>
                    )}
                    <Field label="Start time">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </section>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-white/[0.06] px-4 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex w-full max-w-5xl gap-2">
              <SecondaryButton fullWidth onClick={onSkip}>
                Skip for now
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={() => void book()}
                disabled={!person || !start || backwards || assign.isPending}
              >
                {assign.isPending ? 'Booking…' : person ? `Book ${first}` : 'Pick someone'}
              </PrimaryButton>
            </div>
          </div>
        </div>
        <AddEmployeeDialog open={addOpen} onOpenChange={setAddOpen} />
      </SheetContent>
    </Sheet>
  );
}
