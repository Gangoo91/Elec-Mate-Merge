/**
 * Overview To do rows for assigned learning (ELE-1834).
 *
 *  - Overdue courses: the office asked someone to do a Study Centre course and
 *    the due date has passed. Opens the competence matrix, where the list of
 *    assigned learning sits at the top.
 *  - The one-tap fix for an expiring ticket: when a ticket that's expired or
 *    expiring has a Study Centre course that helps (18th Edition, first aid,
 *    asbestos …) and nobody has assigned it yet, "Assign" opens the assign
 *    sheet right on Overview with the course and the reason filled in.
 */
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { CourseAssignment } from '@/hooks/useCourseAssignments';
import { dueLabel } from '@/hooks/useCourseAssignments';
import { courseForCredential } from '@/data/assignableCourses';
import { canonicalKeyFor } from '@/utils/competenceMatrix';

/** Section key the Overview intercepts to open the assign sheet in place. */
export const ASSIGN_COURSE_SECTION = '__assign_course';

type Todo = HomeTodo & { hero: string };

interface ExpiringItem {
  employee_id: string;
  name: string;
  qualification: string;
  expiry_date: string;
}

const short = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

export function buildCourseTodo(
  assignments: CourseAssignment[] | undefined,
  expiring: ExpiringItem[] | undefined,
  today: string
): Todo[] {
  const t: Todo[] = [];
  const list = assignments ?? [];

  const overdue = list.filter((a) => a.status === 'assigned' && a.overdue);
  if (overdue.length) {
    const first = overdue[0];
    const who = first.employee_name?.split(' ')[0] ?? 'Someone';
    t.push({
      key: 'courses-overdue',
      kind: 'People',
      badge: 'CO',
      urgent: true,
      rank: 31,
      title:
        overdue.length === 1
          ? `${who}'s ${first.course_title} course is overdue`
          : `${overdue.length} assigned courses overdue`,
      detail:
        overdue.length === 1
          ? first.sections_opened > 0
            ? `${first.sections_opened} ${first.sections_opened === 1 ? 'section' : 'sections'} opened, final paper not passed yet`
            : 'Not started yet'
          : overdue
              .slice(0, 3)
              .map((a) => `${a.employee_name?.split(' ')[0] ?? 'Someone'}: ${a.course_title}`)
              .join(', '),
      meta: `Was due ${dueLabel(first.due_date)}`,
      action: 'Open',
      hero: 'Chase overdue courses',
      section: 'elecid',
      params: { view: 'matrix' },
    });
  }

  // One row: the most pressing expiring ticket a course can help with.
  // Skip a course that's already open, or that they passed in the last six
  // months (the list carries those): passing a Study Centre course doesn't
  // renew the ticket, so without this the row would come straight back.
  const open = new Set(list.map((a) => `${a.employee_id}:${a.course_key}`));
  for (const item of expiring ?? []) {
    const key = canonicalKeyFor(item.qualification);
    const course = courseForCredential(key);
    if (!course || open.has(`${item.employee_id}:${course.key}`)) continue;
    const expired = item.expiry_date < today;
    const first = item.name?.split(' ')[0] ?? 'them';
    t.push({
      key: `course-fix-${item.employee_id}-${course.key}`,
      kind: 'Expiring',
      badge: 'SC',
      urgent: expired,
      rank: 32,
      title: `Assign ${first} the ${course.title} course`,
      detail: "They do it in the Study Centre. You see when it's done",
      meta: `${item.qualification} ${expired ? 'expired' : 'expires'} ${short(item.expiry_date)}`,
      action: 'Assign',
      hero: `Assign the ${course.title} course`,
      section: ASSIGN_COURSE_SECTION,
      params: {
        member: item.employee_id,
        name: item.name ?? '',
        course: course.key,
        reason: `Your ${item.qualification} ${expired ? 'has expired' : `expires ${short(item.expiry_date)}`}`,
      },
    });
    break;
  }
  return t;
}
