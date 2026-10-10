/**
 * CourseAssignmentsList — the office's view of assigned learning (ELE-1834).
 *
 * Team mode (competence matrix): every open course across the firm, overdue
 * first, then the ones done in the last six months.
 * Person mode (`employeeId`, the person's sheet): that person's courses, with
 * an "Assign a course" button.
 */
import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Pill, SecondaryButton } from '@/components/employer/editorial';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  useTeamCourseAssignments,
  useCancelCourseAssignment,
  dueLabel,
  dueSentence,
  rpcErrorMessage,
  type CourseAssignment,
} from '@/hooks/useCourseAssignments';
import { AssignCourseSheet, type AssignCoursePerson } from './AssignCourseSheet';

const doneLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

function statusPill(a: CourseAssignment) {
  if (a.status === 'completed') {
    return (
      <Pill tone="emerald">
        Done {a.completed_at ? doneLabel(a.completed_at) : ''}
        {a.completion_score != null ? ` · ${a.completion_score}%` : ''}
      </Pill>
    );
  }
  if (a.overdue) return <Pill tone="red">{dueSentence(a.due_date)}</Pill>;
  return <Pill tone="amber">{dueSentence(a.due_date)}</Pill>;
}

function progressLine(a: CourseAssignment): string {
  if (a.status === 'completed')
    return a.on_elec_id === false
      ? 'Passed the final paper. They have no Elec-ID yet, so it is recorded here only.'
      : 'Passed the final paper. On their Elec-ID as a Study Centre course.';
  if (!a.linked) return 'Waiting for them to join the team on Elec-Mate.';
  if (a.sections_opened > 0)
    return `${a.sections_opened} ${a.sections_opened === 1 ? 'section' : 'sections'} opened${
      a.last_studied ? `, last on ${doneLabel(a.last_studied)}` : ''
    }. Done when they pass the final paper.`;
  return 'Not started yet. Done when they pass the final paper.';
}

interface CourseAssignmentsListProps {
  /** Person mode: only this roster member, with an Assign button. */
  person?: AssignCoursePerson;
  /** Team mode: hide the whole block when nothing has been assigned. */
  hideWhenEmpty?: boolean;
  className?: string;
}

export function CourseAssignmentsList({
  person,
  hideWhenEmpty,
  className,
}: CourseAssignmentsListProps) {
  const { data = [], isLoading } = useTeamCourseAssignments();
  const cancel = useCancelCourseAssignment();
  const [assignOpen, setAssignOpen] = useState(false);
  const [cancelling, setCancelling] = useState<string | null>(null);
  // Withdraw is two taps: the first asks, the second does it.
  const [confirming, setConfirming] = useState<string | null>(null);

  const rows = useMemo(
    () => (person ? data.filter((a) => a.employee_id === person.id) : data),
    [data, person]
  );
  const open = rows.filter((a) => a.status === 'assigned');
  const overdue = open.filter((a) => a.overdue).length;

  if (!person && hideWhenEmpty && !isLoading && rows.length === 0) return null;

  const withdraw = async (a: CourseAssignment) => {
    setConfirming(null);
    setCancelling(a.id);
    try {
      await cancel.mutateAsync(a.id);
      toast({
        title: 'Course withdrawn',
        description: `${a.course_title} is no longer asked of ${a.employee_name ?? 'them'}.`,
      });
    } catch (e) {
      toast({
        title: 'Could not withdraw it',
        description: rpcErrorMessage(e),
        variant: 'destructive',
      });
    } finally {
      setCancelling(null);
    }
  };

  return (
    <section className={cn('rounded-2xl border border-white/[0.08] bg-white/[0.03]', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            {person ? 'Assigned courses' : 'Assigned learning'}
          </h3>
          {open.length > 0 && (
            <Pill tone={overdue ? 'red' : 'amber'}>
              {overdue ? `${overdue} overdue` : `${open.length} open`}
            </Pill>
          )}
        </div>
        {person && (
          <SecondaryButton size="md" onClick={() => setAssignOpen(true)}>
            Assign a course
          </SecondaryButton>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-4 text-[13px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading courses
        </div>
      ) : rows.length === 0 ? (
        <p className="border-t border-white/[0.06] px-4 py-4 text-[13px] leading-relaxed text-white sm:px-5">
          {person
            ? `Nothing assigned. Give ${person.name.split(' ')[0]} a Study Centre course with a due date, and you'll see here when they pass it.`
            : 'Nothing assigned yet. Use Assign course on anyone in the matrix.'}
        </p>
      ) : (
        <ul
          className={cn(
            'divide-y divide-white/[0.06] border-t border-white/[0.06]',
            !person && 'lg:grid lg:grid-cols-2 lg:divide-y-0'
          )}
        >
          {rows.map((a) => (
            <li
              key={a.id}
              className={cn(
                'px-4 py-3.5 sm:px-5',
                !person && 'lg:border-b lg:border-white/[0.06] lg:odd:border-r'
              )}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-snug text-white">
                    {!person && a.employee_name ? `${a.employee_name} · ` : ''}
                    {a.course_title}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-white">{progressLine(a)}</p>
                  {a.reason && (
                    <p className="mt-1 text-[12.5px] leading-snug text-white">“{a.reason}”</p>
                  )}
                  <p className="mt-1 text-[11.5px] text-white">
                    {a.status === 'completed' ? 'Was due' : 'Due'} {dueLabel(a.due_date)}
                    {a.assigned_by_name ? ` · set by ${a.assigned_by_name}` : ''}
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-2 sm:flex-col sm:items-end sm:justify-start">
                  {statusPill(a)}
                  {a.status === 'assigned' &&
                    (confirming === a.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setConfirming(null)}
                          className="h-11 rounded-full px-3 text-[12.5px] font-medium text-white touch-manipulation hover:underline underline-offset-4"
                        >
                          Keep
                        </button>
                        <button
                          type="button"
                          onClick={() => withdraw(a)}
                          className="h-11 rounded-full border border-red-500/40 bg-red-500/15 px-3.5 text-[12.5px] font-semibold text-red-200 touch-manipulation hover:bg-red-500/25"
                        >
                          Yes, withdraw
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirming(a.id)}
                        disabled={cancelling === a.id}
                        className="h-11 rounded-full px-3 text-[12.5px] font-medium text-white underline-offset-4 hover:underline touch-manipulation disabled:opacity-50"
                      >
                        {cancelling === a.id ? 'Withdrawing…' : 'Withdraw'}
                      </button>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {person && (
        <AssignCourseSheet open={assignOpen} onOpenChange={setAssignOpen} person={person} />
      )}
    </section>
  );
}

export default CourseAssignmentsList;
