/**
 * AssignCourseSheet — the office assigns a Study Centre course to one person
 * (ELE-1834). Opened from the competence matrix, the person's sheet and the
 * Overview expiry row.
 *
 * Phone: one column (course list, due date, reason) with the Assign button in
 * the sticky footer. Desktop: the course grid fills the left, the due date,
 * reason and a plain summary sit in a right-hand column.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import FormSheet from '@/components/forms/FormSheet';
import { PrimaryButton } from '@/components/employer/editorial';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ASSIGNABLE_COURSES, courseByKey, type AssignableCourse } from '@/data/assignableCourses';
import {
  useAssignCourse,
  useTeamCourseAssignments,
  dueLabel,
  rpcErrorMessage,
} from '@/hooks/useCourseAssignments';

export interface AssignCoursePerson {
  id: string;
  name: string;
  /** false = invited but not joined: they'll see it once they join. */
  linked?: boolean;
}

interface AssignCourseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person: AssignCoursePerson | null;
  /** Preselect a course (e.g. the one that helps with an expiring credential). */
  initialCourseKey?: string | null;
  /** Prefill the reason, e.g. "Their 18th Edition expires 3 Nov". */
  initialReason?: string | null;
}

const isoInDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
};

const DUE_CHOICES = [
  { label: 'In 2 weeks', days: 14 },
  { label: 'In a month', days: 30 },
  { label: 'In 3 months', days: 90 },
];

const GROUPS: AssignableCourse['group'][] = ['Electrical', 'Site safety'];

const fieldLabel = 'text-[13px] font-semibold tracking-tight text-white';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

export function AssignCourseSheet({
  open,
  onOpenChange,
  person,
  initialCourseKey,
  initialReason,
}: AssignCourseSheetProps) {
  const assign = useAssignCourse();
  const { data: assignments = [] } = useTeamCourseAssignments(open);
  const [courseKey, setCourseKey] = useState<string | null>(null);
  const [due, setDue] = useState<string>(isoInDays(30));
  const [reason, setReason] = useState('');

  // Reset each time the sheet opens for someone.
  useEffect(() => {
    if (!open) return;
    setCourseKey(initialCourseKey && courseByKey(initialCourseKey) ? initialCourseKey : null);
    setDue(isoInDays(30));
    setReason(initialReason ?? '');
  }, [open, initialCourseKey, initialReason, person?.id]);

  const openForPerson = useMemo(
    () =>
      new Map(
        assignments
          .filter((a) => a.employee_id === person?.id && a.status === 'assigned')
          .map((a) => [a.course_key, a])
      ),
    [assignments, person?.id]
  );

  const course = courseByKey(courseKey);
  const coursesRef = useRef<HTMLDivElement>(null);
  const existing = courseKey ? openForPerson.get(courseKey) : undefined;
  const firstName = person?.name.split(' ')[0] ?? 'They';
  const minDue = isoInDays(0);
  // The server takes today up to a year out (Europe/London).
  const maxDue = isoInDays(365);
  const dueValid = !!due && due >= minDue && due <= maxDue;

  const submit = async () => {
    if (!person || !course || !dueValid) return;
    try {
      await assign.mutateAsync({ employeeId: person.id, course, dueDate: due, reason });
      toast({
        title: existing ? 'Due date moved' : 'Course assigned',
        description:
          person.linked === false
            ? `${person.name} will see ${course.title} once they join the team.`
            : person.linked
              ? `${person.name} has been told. It shows in their Worker Tools and Study Centre.`
              : `It shows in ${person.name}'s Worker Tools and Study Centre.`,
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not assign the course',
        description: rpcErrorMessage(e),
        variant: 'destructive',
      });
    }
  };

  const summary = course ? (
    <p className="text-[13px] leading-relaxed text-white">
      {firstName} gets a notification and sees <span className="font-semibold">{course.title}</span>{' '}
      in Worker Tools and the Study Centre, due {dueValid ? dueLabel(due) : '…'}. When they pass the
      course's final paper it's marked done here and added to their Elec-ID as a Study Centre
      course. It doesn't replace the qualification itself.
    </p>
  ) : (
    <p className="text-[13px] leading-relaxed text-white">Pick a course to assign.</p>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Assign a course"
      title={person ? `A Study Centre course for ${person.name}` : 'Assign a course'}
      description="They do it in the Study Centre. You see when it's done."
      bodyClassName="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start"
      footer={
        <PrimaryButton
          fullWidth
          size="lg"
          onClick={submit}
          disabled={!person || !course || !dueValid || assign.isPending}
        >
          {assign.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {course
            ? existing
              ? `Move the due date to ${dueValid ? dueLabel(due) : '…'}`
              : `Assign ${course.title}`
            : 'Pick a course'}
        </PrimaryButton>
      }
    >
      {/* Courses */}
      <div ref={coursesRef} className="space-y-5 min-w-0 scroll-mt-4">
        {GROUPS.map((group) => (
          <section key={group} className="space-y-2">
            <h3 className={fieldLabel}>{group}</h3>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {ASSIGNABLE_COURSES.filter((c) => c.group === group).map((c) => {
                const selected = c.key === courseKey;
                const open = openForPerson.get(c.key);
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCourseKey(c.key)}
                    aria-pressed={selected}
                    className={cn(
                      'flex min-h-[64px] w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors touch-manipulation',
                      selected
                        ? 'border-elec-yellow bg-white/[0.08]'
                        : 'border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06]'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                        selected
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : 'border-white/30'
                      )}
                      aria-hidden
                    >
                      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold leading-snug text-white">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-snug text-white">
                        {open
                          ? open.overdue
                            ? `Already assigned, overdue since ${dueLabel(open.due_date)}`
                            : `Already assigned, due ${dueLabel(open.due_date)}`
                          : c.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Due date, reason, summary */}
      <div
        className={cn(
          'space-y-5 lg:sticky lg:top-0',
          initialCourseKey && 'order-first lg:order-none'
        )}
      >
        {initialCourseKey && course && (
          <section className="flex items-center justify-between gap-3 border-b border-white/[0.1] pb-4 lg:hidden">
            <div className="min-w-0">
              <h3 className={fieldLabel}>Course</h3>
              <p className="mt-0.5 text-[15px] font-medium text-white">{course.title}</p>
            </div>
            <button
              type="button"
              onClick={() =>
                coursesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="h-11 shrink-0 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation"
            >
              Change
            </button>
          </section>
        )}
        <section className="space-y-2">
          <h3 className={fieldLabel}>Due by</h3>
          <div className="grid grid-cols-3 gap-2">
            {DUE_CHOICES.map((d) => {
              const iso = isoInDays(d.days);
              const on = due === iso;
              return (
                <button
                  key={d.days}
                  type="button"
                  onClick={() => setDue(iso)}
                  aria-pressed={on}
                  className={cn(
                    'h-11 rounded-full border px-2 text-[12.5px] font-medium transition-colors touch-manipulation',
                    on
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  )}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
          <label className="block">
            <span className="sr-only">Due date</span>
            <input
              type="date"
              value={due}
              min={minDue}
              max={maxDue}
              onChange={(e) => setDue(e.target.value)}
              className={inputCn}
            />
          </label>
          {!dueValid && (
            <p className="text-[12px] text-red-300">Pick a date from today to a year from now.</p>
          )}
        </section>

        <section className="space-y-2">
          <h3 className={fieldLabel}>Why (optional)</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value.slice(0, 300))}
            rows={3}
            placeholder="For example: your 18th Edition expires next month"
            className={cn(inputCn, 'h-auto min-h-[72px] resize-none py-2 leading-snug')}
          />
          <p className="text-[11.5px] text-white">They see this with the course.</p>
        </section>

        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 space-y-2">
          <h3 className={fieldLabel}>What happens</h3>
          {summary}
          {person?.linked === false && (
            <p className="text-[12.5px] text-amber-300">
              {firstName} hasn't joined the team on Elec-Mate yet. It'll be waiting when they do.
            </p>
          )}
        </div>
      </div>
    </FormSheet>
  );
}

export default AssignCourseSheet;
