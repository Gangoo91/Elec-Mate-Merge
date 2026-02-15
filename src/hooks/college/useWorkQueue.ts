import { useMemo } from 'react';
import { useCollegeGrades, usePendingGrades } from './useCollegeGrades';
import { useCollegeILPs, useOverdueILPReviews } from './useCollegeILP';
import { useCollegeEPAs } from './useCollegeEPA';
import { useSubmissionQueue } from './usePortfolioSubmissions';
import { useCollegeStudents } from './useCollegeStudents';
import { useQueryClient } from '@tanstack/react-query';

export type WorkItemType = 'grade' | 'ilp' | 'gateway' | 'portfolio';
export type WorkItemPriority = 'Urgent' | 'High' | 'Normal';
export type WorkItemStatus = 'Pending' | 'In Progress' | 'Completed';

export interface WorkQueueItem {
  id: string;
  type: WorkItemType;
  title: string;
  studentName: string;
  studentId: string;
  priority: WorkItemPriority;
  status: WorkItemStatus;
  sourceId: string;
  createdAt: string;
  dueDate?: string;
}

export const useWorkQueue = () => {
  const { data: pendingGrades, isLoading: gradesLoading } = usePendingGrades();
  const { data: overdueILPs, isLoading: ilpsLoading } = useOverdueILPReviews();
  const { data: epas, isLoading: epasLoading } = useCollegeEPAs();
  const { data: students } = useCollegeStudents();
  const { submissions, isLoading: submissionsLoading } = useSubmissionQueue();
  const queryClient = useQueryClient();

  const getStudentName = (studentId: string | null): string => {
    if (!studentId || !students) return 'Unknown';
    return students.find((s) => s.id === studentId)?.name || 'Unknown';
  };

  const items = useMemo<WorkQueueItem[]>(() => {
    const queue: WorkQueueItem[] = [];

    // Pending grades → "Grade submission" items
    if (pendingGrades) {
      pendingGrades.forEach((grade) => {
        queue.push({
          id: `grade-${grade.id}`,
          type: 'grade',
          title: `Grade: ${grade.unit_name || 'Assessment'}`,
          studentName: getStudentName(grade.student_id),
          studentId: grade.student_id || '',
          priority: 'Normal',
          status: 'Pending',
          sourceId: grade.id,
          createdAt: grade.created_at || new Date().toISOString(),
        });
      });
    }

    // Overdue ILP reviews → "Review ILP" items (Urgent priority)
    if (overdueILPs) {
      overdueILPs.forEach((ilp) => {
        queue.push({
          id: `ilp-${ilp.id}`,
          type: 'ilp',
          title: 'Review ILP (overdue)',
          studentName: getStudentName(ilp.student_id),
          studentId: ilp.student_id || '',
          priority: 'Urgent',
          status: 'Pending',
          sourceId: ilp.id,
          createdAt: ilp.created_at || new Date().toISOString(),
          dueDate: ilp.review_date || undefined,
        });
      });
    }

    // Gateway-ready students → "Gateway review" items (High priority)
    if (epas) {
      epas
        .filter((epa) => epa.status === 'Gateway Ready')
        .forEach((epa) => {
          queue.push({
            id: `gateway-${epa.id}`,
            type: 'gateway',
            title: 'Gateway review',
            studentName: getStudentName(epa.student_id),
            studentId: epa.student_id || '',
            priority: 'High',
            status: 'Pending',
            sourceId: epa.id,
            createdAt: epa.created_at || new Date().toISOString(),
          });
        });
    }

    // Portfolio submissions awaiting review
    if (submissions) {
      submissions.forEach((sub) => {
        queue.push({
          id: `portfolio-${sub.id}`,
          type: 'portfolio',
          title: `Review portfolio: ${sub.categoryName}`,
          studentName: sub.studentName,
          studentId: sub.studentId,
          priority:
            sub.priority === 'high' ? 'Urgent' : sub.priority === 'medium' ? 'High' : 'Normal',
          status: 'Pending',
          sourceId: sub.id,
          createdAt: sub.submittedAt,
        });
      });
    }

    // Sort: Urgent first, then High, then Normal
    const priorityOrder: Record<WorkItemPriority, number> = { Urgent: 0, High: 1, Normal: 2 };
    return queue.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [pendingGrades, overdueILPs, epas, submissions, students]);

  const isLoading = gradesLoading || ilpsLoading || epasLoading || submissionsLoading;

  const stats = useMemo(() => {
    const pending = items.filter((i) => i.status === 'Pending').length;
    const urgent = items.filter((i) => i.priority === 'Urgent').length;
    const high = items.filter((i) => i.priority === 'High').length;
    return { total: items.length, pending, urgent, high };
  }, [items]);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['college-grades'] });
    queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    queryClient.invalidateQueries({ queryKey: ['college-epa'] });
    queryClient.invalidateQueries({ queryKey: ['portfolio-submissions'] });
  };

  return { items, isLoading, stats, refresh };
};
