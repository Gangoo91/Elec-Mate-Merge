/**
 * Courses the worker's firm asked them to do (ELE-1834).
 *
 * "Requested by <firm>, due <date>" with Start / Continue into the course.
 * Passing the course's final paper marks it done for the firm and adds it to
 * the worker's Elec-ID as a Study Centre course.
 *
 *  variant="study"  the Study Centre home: open courses only, hidden when none
 *  variant="full"   Worker Tools › Learning: open first, then recently done;
 *                   `highlightId` rings the one a notification opened
 */
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  useMyCourseAssignments,
  dueLabel,
  dueSentence,
  type CourseAssignment,
} from '@/hooks/useCourseAssignments';
import { courseByKey } from '@/data/assignableCourses';

interface AssignedCoursesCardProps {
  variant?: 'study' | 'full';
  highlightId?: string | null;
  className?: string;
}

const doneOn = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function CourseRow({ a, highlight }: { a: CourseAssignment; highlight: boolean }) {
  const navigate = useNavigate();
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (highlight) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlight]);
  const done = a.status === 'completed';
  const started = a.sections_opened > 0;
  const paperRoute = courseByKey(a.course_key)?.paperRoute;

  return (
    <li
      ref={ref}
      className={cn('p-4 sm:p-5', highlight && 'ring-2 ring-inset ring-elec-yellow sm:rounded-2xl')}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 space-y-1">
          <p className="text-[12px] font-medium text-white">
            Requested by {a.firm_name}
            {a.assigned_by_name ? ` · ${a.assigned_by_name}` : ''}
          </p>
          <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[17px]">
            {a.course_title}
          </h3>
          {a.reason && <p className="text-[13px] leading-snug text-white">{a.reason}</p>}
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5 text-[12.5px] text-white">
            {done ? (
              <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-300">
                Done {a.completed_at ? doneOn(a.completed_at) : ''}
                {a.completion_score != null ? ` · ${a.completion_score}%` : ''}
              </span>
            ) : (
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2 py-0.5 font-medium',
                  a.overdue
                    ? 'border-red-500/30 bg-red-500/10 text-red-300'
                    : 'border-white/[0.14] bg-white/[0.06] text-white'
                )}
              >
                {dueSentence(a.due_date)}
              </span>
            )}
            <span>
              {done
                ? a.on_elec_id === false
                  ? `${a.firm_name} can see it's done.`
                  : `${a.firm_name} can see it's done. It's on your Elec-ID.`
                : [
                    started
                      ? `${a.sections_opened} ${a.sections_opened === 1 ? 'section' : 'sections'} opened.`
                      : null,
                    a.overdue
                      ? `It was due ${dueLabel(a.due_date)}. Pass the final paper to finish it.`
                      : `Pass the final paper by ${dueLabel(a.due_date)}.`,
                  ]
                    .filter(Boolean)
                    .join(' ')}
            </span>
          </p>
        </div>
        {!done && (
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:items-end lg:flex-row lg:items-center">
            <button
              type="button"
              onClick={() => navigate(a.start_route)}
              className="h-11 w-full rounded-full bg-elec-yellow px-6 text-[14px] font-semibold text-black transition-colors touch-manipulation hover:brightness-95 sm:w-auto sm:min-w-[11rem]"
            >
              {started ? 'Continue course' : 'Start course'}
            </button>
            {paperRoute && (
              <button
                type="button"
                onClick={() => navigate(paperRoute)}
                className="h-11 w-full rounded-full border border-white/[0.14] bg-white/[0.06] px-6 text-[14px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.1] sm:w-auto sm:min-w-[11rem]"
              >
                Take the final paper
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export function AssignedCoursesCard({
  variant = 'full',
  highlightId,
  className,
}: AssignedCoursesCardProps) {
  const { data = [], isLoading } = useMyCourseAssignments();
  const rows = variant === 'study' ? data.filter((a) => a.status === 'assigned') : data;

  if (variant === 'study' && rows.length === 0) return null;

  if (isLoading) {
    return (
      <div
        className={cn(
          'h-28 animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.04]',
          className
        )}
      />
    );
  }

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          '-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x',
          className
        )}
      >
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {highlightId ? "That course isn't open any more" : 'Nothing assigned'}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white">
          When your firm asks you to do a Study Centre course, it shows here with the due date. Pass
          the course's final paper and they see it's done, without you sending anything.
        </p>
      </div>
    );
  }

  const open = rows.filter((a) => a.status === 'assigned');
  // A notification for a course that has since been withdrawn (or is older
  // than the 90 days of done courses shown) would otherwise ring nothing.
  const missing = !!highlightId && !rows.some((a) => a.id === highlightId);
  return (
    <section className={cn('space-y-3', className)}>
      {variant === 'full' && missing && (
        <p className="rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[13px] leading-relaxed text-white">
          That course isn't open any more. Your firm may have withdrawn it.
        </p>
      )}
      {variant === 'study' && (
        <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          {open.length === 1
            ? 'Your firm asked you to do this'
            : `Your firm asked you to do ${open.length} courses`}
        </h2>
      )}
      <ul
        className={cn(
          '-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x',
          open.some((a) => a.overdue) && 'border-red-500/30'
        )}
      >
        {rows.map((a) => (
          <CourseRow key={a.id} a={a} highlight={a.id === highlightId} />
        ))}
      </ul>
    </section>
  );
}

export default AssignedCoursesCard;
