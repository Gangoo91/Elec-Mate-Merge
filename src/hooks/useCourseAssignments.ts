/**
 * Assigned learning (ELE-1834) — Study Centre courses the office assigns to a
 * team member, with a due date and a reason.
 *
 *   useTeamCourseAssignments()   office: every open (and recently done) course
 *                                across the firm the user acts for
 *   useMyCourseAssignments()     worker: courses their firm(s) asked them to do
 *   useAssignCourse()            office: assign (or move the due date of) a course
 *   useCancelCourseAssignment()  office: withdraw an open course
 *
 * All four are RPCs (the table has no client grants). Completion is server-side:
 * passing the course's final paper closes the assignment, adds a Study Centre
 * training record to the person's Elec-ID and rings the firm's bell.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AssignableCourse } from '@/data/assignableCourses';

export interface CourseAssignment {
  id: string;
  employer_id: string;
  employee_id: string;
  employee_name: string | null;
  linked: boolean;
  course_key: string;
  course_title: string;
  start_route: string;
  credential_key: string | null;
  reason: string | null;
  due_date: string;
  status: 'assigned' | 'completed';
  overdue: boolean;
  completed_at: string | null;
  completion_score: number | null;
  /** A Study Centre training record was written to their Elec-ID on completion
   *  (false when they had no Elec-ID profile at the time). */
  on_elec_id?: boolean;
  created_at: string;
  firm_name: string;
  assigned_by_name: string | null;
  sections_opened: number;
  last_studied: string | null;
}

export const TEAM_COURSES_KEY = ['team-course-assignments'] as const;
export const MY_COURSES_KEY = ['my-course-assignments'] as const;

const rpc = (name: string, args?: Record<string, unknown>) =>
  supabase.rpc(name as never, args as never);

export function useTeamCourseAssignments(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...TEAM_COURSES_KEY, user?.id],
    enabled: enabled && !!user?.id,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await rpc('get_team_course_assignments');
      if (error) throw error;
      return (data as unknown as CourseAssignment[]) ?? [];
    },
  });
}

export function useMyCourseAssignments(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    queryKey: [...MY_COURSES_KEY, user?.id],
    enabled: enabled && !!user?.id,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await rpc('get_my_course_assignments');
      if (error) throw error;
      return (data as unknown as CourseAssignment[]) ?? [];
    },
  });
}

export interface AssignCourseInput {
  employeeId: string;
  course: AssignableCourse;
  dueDate: string;
  reason?: string;
}

export function useAssignCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ employeeId, course, dueDate, reason }: AssignCourseInput) => {
      const { data, error } = await rpc('assign_team_course', {
        p_roster_id: employeeId,
        p_course: {
          course_key: course.key,
          course_title: course.title,
          start_route: course.route,
          progress_key: course.progressKey,
          credential_key: course.credentialKey,
        },
        p_due: dueDate,
        p_reason: reason?.trim() || null,
      });
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TEAM_COURSES_KEY });
      qc.invalidateQueries({ queryKey: MY_COURSES_KEY });
    },
  });
}

export function useCancelCourseAssignment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await rpc('cancel_team_course_assignment', { p_id: id });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TEAM_COURSES_KEY });
      qc.invalidateQueries({ queryKey: MY_COURSES_KEY });
    },
  });
}

/** The message from an RPC error (PostgrestError is a plain object, not an Error). */
export const rpcErrorMessage = (e: unknown, fallback = 'Try again in a moment.') => {
  const m = (e as { message?: unknown } | null)?.message;
  return typeof m === 'string' && m.trim() ? m : fallback;
};

/** "Thu 22 Oct" */
export const dueLabel = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

/** Whole days from today (London) to the date; negative when past. */
export const daysUntilDate = (iso: string) => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
};

/** "Due tomorrow" / "Due in 5 days" / "2 days overdue" / "Due today". */
export const dueSentence = (iso: string) => {
  const n = daysUntilDate(iso);
  if (n < 0) return `${-n} ${n === -1 ? 'day' : 'days'} overdue`;
  if (n === 0) return 'Due today';
  if (n === 1) return 'Due tomorrow';
  if (n <= 13) return `Due in ${n} days`;
  return `Due ${dueLabel(iso)}`;
};
