/**
 * CollegeSupabaseContext - Supabase-powered College data management
 *
 * This context provides the same API as the original CollegeContext
 * but uses Supabase for data persistence instead of mock data.
 *
 * Usage:
 * 1. Replace CollegeProvider with CollegeSupabaseProvider in your app
 * 2. All existing components using useCollege() will work unchanged
 * 3. Data is now persisted to Supabase database
 */

import React, { createContext, useContext, useCallback, ReactNode, useMemo } from 'react';
import {
  useCollegeStaff,
  useCreateCollegeStaff,
  useUpdateCollegeStaff,
  useArchiveCollegeStaff,
} from '@/hooks/college/useCollegeStaff';
import {
  useCollegeStudents,
  useCreateCollegeStudent,
  useUpdateCollegeStudent,
  useWithdrawCollegeStudent,
  useAssignStudentToCohort,
  useStudentsAtRisk,
} from '@/hooks/college/useCollegeStudents';
import {
  useCollegeCohorts,
  useCreateCollegeCohort,
  useUpdateCollegeCohort,
} from '@/hooks/college/useCollegeCohorts';
import {
  useCollegeCourses,
  useCreateCollegeCourse,
  useUpdateCollegeCourse,
} from '@/hooks/college/useCollegeCourses';
import {
  useCollegeAttendance,
  useRecordAttendance,
  useBulkRecordAttendance,
  useUpdateAttendance,
  useStudentAttendanceRate,
  useCohortAttendanceRate,
} from '@/hooks/college/useCollegeAttendance';
import {
  useCollegeGrades,
  usePendingGrades,
  useCreateGrade,
  useUpdateGrade,
  useGradeAssessment,
  useVerifyGrade,
} from '@/hooks/college/useCollegeGrades';
import {
  useCollegeILPs,
  useOverdueILPReviews,
  useCreateILP,
  useUpdateILP,
  useAddILPTarget,
  useUpdateILPTargetStatus,
} from '@/hooks/college/useCollegeILP';
import {
  useCollegeEPAs,
  useCreateEPA,
  useUpdateEPA,
} from '@/hooks/college/useCollegeEPA';
import {
  useCollegeLessonPlans,
  useUpcomingLessons,
  useCreateLessonPlan,
  useUpdateLessonPlan,
  useApproveLessonPlan,
  useMarkLessonDelivered,
} from '@/hooks/college/useCollegeLessonPlans';

// Import types from services
import type {
  CollegeStaff,
  StaffRole,
} from '@/services/college/collegeStaffService';
import type { CollegeStudent } from '@/services/college/collegeStudentService';
import type { CollegeCohort } from '@/services/college/collegeCohortService';
import type { CollegeCourse } from '@/services/college/collegeCourseService';
import type { CollegeAttendance, AttendanceStatus } from '@/services/college/collegeAttendanceService';
import type { CollegeGrade } from '@/services/college/collegeGradeService';
import type { CollegeILP, ILPTarget } from '@/services/college/collegeILPService';
import type { CollegeEPA } from '@/services/college/collegeEPAService';
import type { CollegeLessonPlan } from '@/services/college/collegeLessonPlanService';

// Re-export types for components
export type {
  CollegeStaff,
  CollegeStudent,
  CollegeCohort,
  CollegeCourse,
  CollegeAttendance,
  CollegeGrade,
  CollegeILP,
  CollegeEPA,
  CollegeLessonPlan,
  StaffRole,
  AttendanceStatus,
  ILPTarget,
};

interface CollegeSupabaseContextType {
  // Loading state
  isLoading: boolean;

  // Data arrays (compatible with original context API)
  staff: CollegeStaff[];
  students: CollegeStudent[];
  courses: CollegeCourse[];
  cohorts: CollegeCohort[];
  lessonPlans: CollegeLessonPlan[];
  attendance: CollegeAttendance[];
  grades: CollegeGrade[];
  ilps: CollegeILP[];
  epaRecords: CollegeEPA[];

  // Staff Actions
  addStaff: (staff: Omit<CollegeStaff, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateStaff: (id: string, updates: Partial<CollegeStaff>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;

  // Student Actions
  addStudent: (student: Omit<CollegeStudent, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateStudent: (id: string, updates: Partial<CollegeStudent>) => Promise<void>;
  withdrawStudent: (id: string) => Promise<void>;
  assignStudentToCohort: (studentId: string, cohortId: string) => Promise<void>;

  // Course Actions
  addCourse: (course: Omit<CollegeCourse, 'id' | 'created_at'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<CollegeCourse>) => Promise<void>;

  // Cohort Actions
  addCohort: (cohort: Omit<CollegeCohort, 'id' | 'created_at'>) => Promise<void>;
  updateCohort: (id: string, updates: Partial<CollegeCohort>) => Promise<void>;

  // Lesson Plan Actions
  addLessonPlan: (plan: Omit<CollegeLessonPlan, 'id' | 'created_at'>) => Promise<void>;
  updateLessonPlan: (id: string, updates: Partial<CollegeLessonPlan>) => Promise<void>;
  approveLessonPlan: (id: string) => Promise<void>;
  markLessonDelivered: (id: string) => Promise<void>;

  // Grade/Assessment Actions
  addGrade: (grade: Omit<CollegeGrade, 'id' | 'created_at'>) => Promise<void>;
  updateGrade: (id: string, updates: Partial<CollegeGrade>) => Promise<void>;
  gradeAssessment: (id: string, grade: string, score: number, feedback: string, assessorId: string) => Promise<void>;
  verifyGrade: (id: string) => Promise<void>;

  // Attendance Actions
  recordAttendance: (record: Omit<CollegeAttendance, 'id' | 'created_at'>) => Promise<void>;
  bulkRecordAttendance: (records: Array<Omit<CollegeAttendance, 'id' | 'created_at'>>) => Promise<void>;
  updateAttendance: (id: string, updates: Partial<CollegeAttendance>) => Promise<void>;

  // ILP Actions
  addILP: (ilp: Omit<CollegeILP, 'id' | 'created_at'>) => Promise<void>;
  updateILP: (id: string, updates: Partial<CollegeILP>) => Promise<void>;
  addILPTarget: (ilpId: string, target: ILPTarget) => Promise<void>;
  updateILPTargetStatus: (ilpId: string, targetIndex: number, status: ILPTarget['status']) => Promise<void>;

  // EPA Actions
  addEPARecord: (record: Omit<CollegeEPA, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateEPARecord: (id: string, updates: Partial<CollegeEPA>) => Promise<void>;

  // Calculated Values (read-only helpers)
  getStudentsByCohort: (cohortId: string) => CollegeStudent[];
  getStaffByRole: (role: StaffRole) => CollegeStaff[];
  getUpcomingLessonsData: (days?: number) => CollegeLessonPlan[];
  getStudentsAtRiskData: () => CollegeStudent[];
  getOverdueILPReviewsData: () => CollegeILP[];
  getPendingGradesData: () => CollegeGrade[];
}

const CollegeSupabaseContext = createContext<CollegeSupabaseContextType | undefined>(undefined);

interface CollegeSupabaseProviderProps {
  children: ReactNode;
  collegeId?: string; // Optional college ID to filter data
}

export function CollegeSupabaseProvider({ children, collegeId }: CollegeSupabaseProviderProps) {
  // Data queries
  const { data: staffData, isLoading: staffLoading } = useCollegeStaff(collegeId);
  const { data: studentsData, isLoading: studentsLoading } = useCollegeStudents(collegeId);
  const { data: coursesData, isLoading: coursesLoading } = useCollegeCourses(collegeId);
  const { data: cohortsData, isLoading: cohortsLoading } = useCollegeCohorts(collegeId);
  const { data: lessonPlansData, isLoading: lessonPlansLoading } = useCollegeLessonPlans(collegeId);
  const { data: attendanceData, isLoading: attendanceLoading } = useCollegeAttendance();
  const { data: gradesData, isLoading: gradesLoading } = useCollegeGrades();
  const { data: ilpsData, isLoading: ilpsLoading } = useCollegeILPs();
  const { data: epaData, isLoading: epaLoading } = useCollegeEPAs();
  const { data: upcomingLessonsData } = useUpcomingLessons(7, collegeId);
  const { data: atRiskStudentsData } = useStudentsAtRisk(collegeId);
  const { data: overdueILPsData } = useOverdueILPReviews();
  const { data: pendingGradesData } = usePendingGrades();

  // Mutations
  const createStaffMutation = useCreateCollegeStaff();
  const updateStaffMutation = useUpdateCollegeStaff();
  const archiveStaffMutation = useArchiveCollegeStaff();

  const createStudentMutation = useCreateCollegeStudent();
  const updateStudentMutation = useUpdateCollegeStudent();
  const withdrawStudentMutation = useWithdrawCollegeStudent();
  const assignCohortMutation = useAssignStudentToCohort();

  const createCourseMutation = useCreateCollegeCourse();
  const updateCourseMutation = useUpdateCollegeCourse();

  const createCohortMutation = useCreateCollegeCohort();
  const updateCohortMutation = useUpdateCollegeCohort();

  const createLessonPlanMutation = useCreateLessonPlan();
  const updateLessonPlanMutation = useUpdateLessonPlan();
  const approveLessonPlanMutation = useApproveLessonPlan();
  const markDeliveredMutation = useMarkLessonDelivered();

  const createGradeMutation = useCreateGrade();
  const updateGradeMutation = useUpdateGrade();
  const gradeAssessmentMutation = useGradeAssessment();
  const verifyGradeMutation = useVerifyGrade();

  const recordAttendanceMutation = useRecordAttendance();
  const bulkRecordMutation = useBulkRecordAttendance();
  const updateAttendanceMutation = useUpdateAttendance();

  const createILPMutation = useCreateILP();
  const updateILPMutation = useUpdateILP();
  const addTargetMutation = useAddILPTarget();
  const updateTargetStatusMutation = useUpdateILPTargetStatus();

  const createEPAMutation = useCreateEPA();
  const updateEPAMutation = useUpdateEPA();

  // Aggregate loading state
  const isLoading = staffLoading || studentsLoading || coursesLoading ||
    cohortsLoading || lessonPlansLoading || attendanceLoading ||
    gradesLoading || ilpsLoading || epaLoading;

  // Staff Actions
  const addStaff = useCallback(async (staff: Omit<CollegeStaff, 'id' | 'created_at' | 'updated_at'>) => {
    await createStaffMutation.mutateAsync(staff);
  }, [createStaffMutation]);

  const updateStaff = useCallback(async (id: string, updates: Partial<CollegeStaff>) => {
    await updateStaffMutation.mutateAsync({ id, updates });
  }, [updateStaffMutation]);

  const deleteStaff = useCallback(async (id: string) => {
    await archiveStaffMutation.mutateAsync(id);
  }, [archiveStaffMutation]);

  // Student Actions
  const addStudent = useCallback(async (student: Omit<CollegeStudent, 'id' | 'created_at' | 'updated_at'>) => {
    await createStudentMutation.mutateAsync(student);
  }, [createStudentMutation]);

  const updateStudent = useCallback(async (id: string, updates: Partial<CollegeStudent>) => {
    await updateStudentMutation.mutateAsync({ id, updates });
  }, [updateStudentMutation]);

  const withdrawStudent = useCallback(async (id: string) => {
    await withdrawStudentMutation.mutateAsync(id);
  }, [withdrawStudentMutation]);

  const assignStudentToCohort = useCallback(async (studentId: string, cohortId: string) => {
    await assignCohortMutation.mutateAsync({ studentId, cohortId });
  }, [assignCohortMutation]);

  // Course Actions
  const addCourse = useCallback(async (course: Omit<CollegeCourse, 'id' | 'created_at'>) => {
    await createCourseMutation.mutateAsync(course);
  }, [createCourseMutation]);

  const updateCourse = useCallback(async (id: string, updates: Partial<CollegeCourse>) => {
    await updateCourseMutation.mutateAsync({ id, updates });
  }, [updateCourseMutation]);

  // Cohort Actions
  const addCohort = useCallback(async (cohort: Omit<CollegeCohort, 'id' | 'created_at'>) => {
    await createCohortMutation.mutateAsync(cohort);
  }, [createCohortMutation]);

  const updateCohort = useCallback(async (id: string, updates: Partial<CollegeCohort>) => {
    await updateCohortMutation.mutateAsync({ id, updates });
  }, [updateCohortMutation]);

  // Lesson Plan Actions
  const addLessonPlan = useCallback(async (plan: Omit<CollegeLessonPlan, 'id' | 'created_at'>) => {
    await createLessonPlanMutation.mutateAsync(plan);
  }, [createLessonPlanMutation]);

  const updateLessonPlan = useCallback(async (id: string, updates: Partial<CollegeLessonPlan>) => {
    await updateLessonPlanMutation.mutateAsync({ id, updates });
  }, [updateLessonPlanMutation]);

  const approveLessonPlan = useCallback(async (id: string) => {
    await approveLessonPlanMutation.mutateAsync(id);
  }, [approveLessonPlanMutation]);

  const markLessonDelivered = useCallback(async (id: string) => {
    await markDeliveredMutation.mutateAsync(id);
  }, [markDeliveredMutation]);

  // Grade Actions
  const addGrade = useCallback(async (grade: Omit<CollegeGrade, 'id' | 'created_at'>) => {
    await createGradeMutation.mutateAsync(grade);
  }, [createGradeMutation]);

  const updateGrade = useCallback(async (id: string, updates: Partial<CollegeGrade>) => {
    await updateGradeMutation.mutateAsync({ id, updates });
  }, [updateGradeMutation]);

  const gradeAssessment = useCallback(async (
    id: string, grade: string, score: number, feedback: string, assessorId: string
  ) => {
    await gradeAssessmentMutation.mutateAsync({ id, grade, score, feedback, assessorId });
  }, [gradeAssessmentMutation]);

  const verifyGrade = useCallback(async (id: string) => {
    await verifyGradeMutation.mutateAsync(id);
  }, [verifyGradeMutation]);

  // Attendance Actions
  const recordAttendance = useCallback(async (record: Omit<CollegeAttendance, 'id' | 'created_at'>) => {
    await recordAttendanceMutation.mutateAsync(record);
  }, [recordAttendanceMutation]);

  const bulkRecordAttendance = useCallback(async (records: Array<Omit<CollegeAttendance, 'id' | 'created_at'>>) => {
    await bulkRecordMutation.mutateAsync(records);
  }, [bulkRecordMutation]);

  const updateAttendance = useCallback(async (id: string, updates: Partial<CollegeAttendance>) => {
    await updateAttendanceMutation.mutateAsync({ id, updates });
  }, [updateAttendanceMutation]);

  // ILP Actions
  const addILP = useCallback(async (ilp: Omit<CollegeILP, 'id' | 'created_at'>) => {
    await createILPMutation.mutateAsync(ilp);
  }, [createILPMutation]);

  const updateILP = useCallback(async (id: string, updates: Partial<CollegeILP>) => {
    await updateILPMutation.mutateAsync({ id, updates });
  }, [updateILPMutation]);

  const addILPTarget = useCallback(async (ilpId: string, target: ILPTarget) => {
    await addTargetMutation.mutateAsync({ id: ilpId, target });
  }, [addTargetMutation]);

  const updateILPTargetStatus = useCallback(async (
    ilpId: string, targetIndex: number, status: ILPTarget['status']
  ) => {
    await updateTargetStatusMutation.mutateAsync({ id: ilpId, targetIndex, status });
  }, [updateTargetStatusMutation]);

  // EPA Actions
  const addEPARecord = useCallback(async (record: Omit<CollegeEPA, 'id' | 'created_at' | 'updated_at'>) => {
    await createEPAMutation.mutateAsync(record);
  }, [createEPAMutation]);

  const updateEPARecord = useCallback(async (id: string, updates: Partial<CollegeEPA>) => {
    await updateEPAMutation.mutateAsync({ id, updates });
  }, [updateEPAMutation]);

  // Calculated value getters
  const getStudentsByCohort = useCallback((cohortId: string) => {
    return (studentsData || []).filter(s => s.cohort_id === cohortId && s.status === 'Active');
  }, [studentsData]);

  const getStaffByRole = useCallback((role: StaffRole) => {
    return (staffData || []).filter(s => s.role === role && s.status === 'Active');
  }, [staffData]);

  const getUpcomingLessonsData = useCallback(() => {
    return upcomingLessonsData || [];
  }, [upcomingLessonsData]);

  const getStudentsAtRiskData = useCallback(() => {
    return atRiskStudentsData || [];
  }, [atRiskStudentsData]);

  const getOverdueILPReviewsData = useCallback(() => {
    return overdueILPsData || [];
  }, [overdueILPsData]);

  const getPendingGradesData = useCallback(() => {
    return pendingGradesData || [];
  }, [pendingGradesData]);

  const value: CollegeSupabaseContextType = useMemo(() => ({
    isLoading,

    // Data arrays
    staff: staffData || [],
    students: studentsData || [],
    courses: coursesData || [],
    cohorts: cohortsData || [],
    lessonPlans: lessonPlansData || [],
    attendance: attendanceData || [],
    grades: gradesData || [],
    ilps: ilpsData || [],
    epaRecords: epaData || [],

    // Actions
    addStaff,
    updateStaff,
    deleteStaff,
    addStudent,
    updateStudent,
    withdrawStudent,
    assignStudentToCohort,
    addCourse,
    updateCourse,
    addCohort,
    updateCohort,
    addLessonPlan,
    updateLessonPlan,
    approveLessonPlan,
    markLessonDelivered,
    addGrade,
    updateGrade,
    gradeAssessment,
    verifyGrade,
    recordAttendance,
    bulkRecordAttendance,
    updateAttendance,
    addILP,
    updateILP,
    addILPTarget,
    updateILPTargetStatus,
    addEPARecord,
    updateEPARecord,

    // Getters
    getStudentsByCohort,
    getStaffByRole,
    getUpcomingLessonsData,
    getStudentsAtRiskData,
    getOverdueILPReviewsData,
    getPendingGradesData,
  }), [
    isLoading,
    staffData, studentsData, coursesData, cohortsData,
    lessonPlansData, attendanceData, gradesData, ilpsData, epaData,
    addStaff, updateStaff, deleteStaff,
    addStudent, updateStudent, withdrawStudent, assignStudentToCohort,
    addCourse, updateCourse,
    addCohort, updateCohort,
    addLessonPlan, updateLessonPlan, approveLessonPlan, markLessonDelivered,
    addGrade, updateGrade, gradeAssessment, verifyGrade,
    recordAttendance, bulkRecordAttendance, updateAttendance,
    addILP, updateILP, addILPTarget, updateILPTargetStatus,
    addEPARecord, updateEPARecord,
    getStudentsByCohort, getStaffByRole, getUpcomingLessonsData,
    getStudentsAtRiskData, getOverdueILPReviewsData, getPendingGradesData,
  ]);

  return (
    <CollegeSupabaseContext.Provider value={value}>
      {children}
    </CollegeSupabaseContext.Provider>
  );
}

export function useCollegeSupabase() {
  const context = useContext(CollegeSupabaseContext);
  if (context === undefined) {
    throw new Error('useCollegeSupabase must be used within a CollegeSupabaseProvider');
  }
  return context;
}

// Export a hook that can switch between mock and Supabase based on env
export function useCollegeData() {
  // For now, use the Supabase context
  // To use mock data, components can still use the original useCollege() from CollegeContext
  return useCollegeSupabase();
}
