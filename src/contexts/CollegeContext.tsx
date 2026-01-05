import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  mockStaff,
  mockStudents,
  mockCourses,
  mockCohorts,
  mockLessonPlans,
  mockAssessments,
  mockAttendance,
  mockILPs,
  mockEPARecords,
  mockStudentProgress,
  mockTeachingResources,
  mockPortfolios,
  mockPortfolioEvidence,
  mockComments,
  mockWorkAssignments,
  type CollegeStaff,
  type CollegeStudent,
  type CollegeCourse,
  type CollegeCohort,
  type CollegeLessonPlan,
  type CollegeAssessment,
  type CollegeAttendance,
  type CollegeILP,
  type CollegeEPARecord,
  type CollegeStudentProgress,
  type CollegeTeachingResource,
  type CollegePortfolio,
  type PortfolioEvidence,
  type CollegeComment,
  type WorkAssignment,
  type StaffRole,
  type StudentStatus,
  type AttendanceStatus,
  type AssessmentStatus,
  type LessonPlanStatus,
  type EvidenceStatus,
  type PortfolioStatus,
  type WorkAssignmentStatus,
  type WorkPriority,
} from '@/data/collegeMockData';

// Re-export types for use in components
export type {
  CollegeStaff,
  CollegeStudent,
  CollegeCourse,
  CollegeCohort,
  CollegeLessonPlan,
  CollegeAssessment,
  CollegeAttendance,
  CollegeILP,
  CollegeEPARecord,
  CollegeStudentProgress,
  CollegeTeachingResource,
  CollegePortfolio,
  PortfolioEvidence,
  CollegeComment,
  WorkAssignment,
  StaffRole,
  StudentStatus,
  AttendanceStatus,
  AssessmentStatus,
  LessonPlanStatus,
  EvidenceStatus,
  PortfolioStatus,
  WorkAssignmentStatus,
  WorkPriority,
};

interface CollegeContextType {
  // Data
  staff: CollegeStaff[];
  students: CollegeStudent[];
  courses: CollegeCourse[];
  cohorts: CollegeCohort[];
  lessonPlans: CollegeLessonPlan[];
  assessments: CollegeAssessment[];
  attendance: CollegeAttendance[];
  ilps: CollegeILP[];
  epaRecords: CollegeEPARecord[];
  studentProgress: CollegeStudentProgress[];
  teachingResources: CollegeTeachingResource[];
  portfolios: CollegePortfolio[];
  portfolioEvidence: PortfolioEvidence[];
  comments: CollegeComment[];
  workAssignments: WorkAssignment[];

  // Staff Actions
  addStaff: (staff: Omit<CollegeStaff, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<CollegeStaff>) => void;
  deleteStaff: (id: string) => void;

  // Student Actions
  addStudent: (student: Omit<CollegeStudent, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<CollegeStudent>) => void;
  withdrawStudent: (id: string) => void;
  assignStudentToCohort: (studentId: string, cohortId: string) => void;

  // Course Actions
  addCourse: (course: Omit<CollegeCourse, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<CollegeCourse>) => void;

  // Cohort Actions
  addCohort: (cohort: Omit<CollegeCohort, 'id' | 'currentStudents'>) => void;
  updateCohort: (id: string, updates: Partial<CollegeCohort>) => void;

  // Lesson Plan Actions
  addLessonPlan: (plan: Omit<CollegeLessonPlan, 'id'>) => void;
  updateLessonPlan: (id: string, updates: Partial<CollegeLessonPlan>) => void;
  approveLessonPlan: (id: string) => void;
  markLessonDelivered: (id: string) => void;

  // Assessment Actions
  addAssessment: (assessment: Omit<CollegeAssessment, 'id'>) => void;
  updateAssessment: (id: string, updates: Partial<CollegeAssessment>) => void;
  gradeAssessment: (id: string, grade: string, score: number, feedback: string, assessorId: string, assessorName: string) => void;
  verifyAssessment: (id: string) => void;

  // Attendance Actions
  recordAttendance: (record: Omit<CollegeAttendance, 'id'>) => void;
  bulkRecordAttendance: (records: Array<Omit<CollegeAttendance, 'id'>>) => void;
  updateAttendance: (id: string, updates: Partial<CollegeAttendance>) => void;

  // ILP Actions
  addILP: (ilp: Omit<CollegeILP, 'id'>) => void;
  updateILP: (id: string, updates: Partial<CollegeILP>) => void;
  addILPTarget: (ilpId: string, target: CollegeILP['shortTermTargets'][0]) => void;
  updateILPTarget: (ilpId: string, targetIndex: number, status: 'Pending' | 'Achieved' | 'Overdue' | 'In Progress') => void;

  // EPA Actions
  addEPARecord: (record: Omit<CollegeEPARecord, 'id'>) => void;
  updateEPARecord: (id: string, updates: Partial<CollegeEPARecord>) => void;

  // Progress Actions
  updateStudentProgress: (id: string, updates: Partial<CollegeStudentProgress>) => void;

  // Resource Actions
  addTeachingResource: (resource: Omit<CollegeTeachingResource, 'id' | 'downloadCount' | 'createdAt'>) => void;
  updateTeachingResource: (id: string, updates: Partial<CollegeTeachingResource>) => void;
  deleteTeachingResource: (id: string) => void;
  incrementResourceDownload: (id: string) => void;

  // Portfolio Actions
  addPortfolio: (portfolio: Omit<CollegePortfolio, 'id'>) => void;
  updatePortfolio: (id: string, updates: Partial<CollegePortfolio>) => void;
  addEvidence: (evidence: Omit<PortfolioEvidence, 'id'>) => void;
  updateEvidence: (id: string, updates: Partial<PortfolioEvidence>) => void;
  reviewEvidence: (id: string, status: EvidenceStatus, feedback: string, reviewerId: string, reviewerName: string) => void;

  // Comment Actions
  addComment: (comment: Omit<CollegeComment, 'id'>) => void;
  updateComment: (id: string, updates: Partial<CollegeComment>) => void;
  resolveComment: (id: string, resolverId: string, resolverName: string) => void;

  // Work Assignment Actions
  addWorkAssignment: (assignment: Omit<WorkAssignment, 'id'>) => void;
  updateWorkAssignment: (id: string, updates: Partial<WorkAssignment>) => void;
  completeWorkAssignment: (id: string) => void;

  // Calculated Values
  getStudentsByCohort: (cohortId: string) => CollegeStudent[];
  getCohortAttendanceRate: (cohortId: string) => number;
  getStudentAttendanceRate: (studentId: string) => number;
  getStudentProgressPercentage: (studentId: string) => number;
  getOverdueILPReviews: () => CollegeILP[];
  getPendingAssessments: () => CollegeAssessment[];
  getStaffByRole: (role: StaffRole) => CollegeStaff[];
  getUpcomingLessons: (days?: number) => CollegeLessonPlan[];
  getStudentsAtRisk: () => CollegeStudent[];

  // Portfolio Calculated Values
  getPortfolioByStudent: (studentId: string) => CollegePortfolio | undefined;
  getEvidenceByPortfolio: (portfolioId: string) => PortfolioEvidence[];
  getPendingEvidence: () => PortfolioEvidence[];
  getMyWorkQueue: (staffId: string) => WorkAssignment[];
  getCommentsForItem: (contextType: string, contextId: string) => CollegeComment[];
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

// Generate unique ID
const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export function CollegeProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<CollegeStaff[]>(mockStaff);
  const [students, setStudents] = useState<CollegeStudent[]>(mockStudents);
  const [courses, setCourses] = useState<CollegeCourse[]>(mockCourses);
  const [cohorts, setCohorts] = useState<CollegeCohort[]>(mockCohorts);
  const [lessonPlans, setLessonPlans] = useState<CollegeLessonPlan[]>(mockLessonPlans);
  const [assessments, setAssessments] = useState<CollegeAssessment[]>(mockAssessments);
  const [attendance, setAttendance] = useState<CollegeAttendance[]>(mockAttendance);
  const [ilps, setILPs] = useState<CollegeILP[]>(mockILPs);
  const [epaRecords, setEPARecords] = useState<CollegeEPARecord[]>(mockEPARecords);
  const [studentProgress, setStudentProgress] = useState<CollegeStudentProgress[]>(mockStudentProgress);
  const [teachingResources, setTeachingResources] = useState<CollegeTeachingResource[]>(mockTeachingResources);
  const [portfolios, setPortfolios] = useState<CollegePortfolio[]>(mockPortfolios);
  const [portfolioEvidence, setPortfolioEvidence] = useState<PortfolioEvidence[]>(mockPortfolioEvidence);
  const [comments, setComments] = useState<CollegeComment[]>(mockComments);
  const [workAssignments, setWorkAssignments] = useState<WorkAssignment[]>(mockWorkAssignments);

  // ============================================
  // Staff Actions
  // ============================================
  const addStaff = useCallback((newStaff: Omit<CollegeStaff, 'id'>) => {
    const staffMember: CollegeStaff = {
      ...newStaff,
      id: generateId('staff'),
    };
    setStaff(prev => [...prev, staffMember]);
  }, []);

  const updateStaff = useCallback((id: string, updates: Partial<CollegeStaff>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteStaff = useCallback((id: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: 'Archived' as const } : s));
  }, []);

  // ============================================
  // Student Actions
  // ============================================
  const addStudent = useCallback((newStudent: Omit<CollegeStudent, 'id'>) => {
    const student: CollegeStudent = {
      ...newStudent,
      id: generateId('student'),
    };
    setStudents(prev => [...prev, student]);

    // Update cohort student count if assigned
    if (newStudent.cohortId) {
      setCohorts(prev => prev.map(c =>
        c.id === newStudent.cohortId ? { ...c, currentStudents: c.currentStudents + 1 } : c
      ));
    }
  }, []);

  const updateStudent = useCallback((id: string, updates: Partial<CollegeStudent>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const withdrawStudent = useCallback((id: string) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.map(s =>
      s.id === id ? { ...s, status: 'Withdrawn' as const } : s
    ));

    // Update cohort count
    if (student?.cohortId) {
      setCohorts(prev => prev.map(c =>
        c.id === student.cohortId ? { ...c, currentStudents: Math.max(0, c.currentStudents - 1) } : c
      ));
    }
  }, [students]);

  const assignStudentToCohort = useCallback((studentId: string, cohortId: string) => {
    const student = students.find(s => s.id === studentId);
    const oldCohortId = student?.cohortId;

    setStudents(prev => prev.map(s =>
      s.id === studentId ? { ...s, cohortId } : s
    ));

    // Update cohort counts
    setCohorts(prev => prev.map(c => {
      if (c.id === oldCohortId) {
        return { ...c, currentStudents: Math.max(0, c.currentStudents - 1) };
      }
      if (c.id === cohortId) {
        return { ...c, currentStudents: c.currentStudents + 1 };
      }
      return c;
    }));
  }, [students]);

  // ============================================
  // Course Actions
  // ============================================
  const addCourse = useCallback((newCourse: Omit<CollegeCourse, 'id'>) => {
    const course: CollegeCourse = {
      ...newCourse,
      id: generateId('course'),
    };
    setCourses(prev => [...prev, course]);
  }, []);

  const updateCourse = useCallback((id: string, updates: Partial<CollegeCourse>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  // ============================================
  // Cohort Actions
  // ============================================
  const addCohort = useCallback((newCohort: Omit<CollegeCohort, 'id' | 'currentStudents'>) => {
    const cohort: CollegeCohort = {
      ...newCohort,
      id: generateId('cohort'),
      currentStudents: 0,
    };
    setCohorts(prev => [...prev, cohort]);
  }, []);

  const updateCohort = useCallback((id: string, updates: Partial<CollegeCohort>) => {
    setCohorts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  // ============================================
  // Lesson Plan Actions
  // ============================================
  const addLessonPlan = useCallback((newPlan: Omit<CollegeLessonPlan, 'id'>) => {
    const plan: CollegeLessonPlan = {
      ...newPlan,
      id: generateId('lp'),
    };
    setLessonPlans(prev => [...prev, plan]);
  }, []);

  const updateLessonPlan = useCallback((id: string, updates: Partial<CollegeLessonPlan>) => {
    setLessonPlans(prev => prev.map(lp => lp.id === id ? { ...lp, ...updates } : lp));
  }, []);

  const approveLessonPlan = useCallback((id: string) => {
    setLessonPlans(prev => prev.map(lp =>
      lp.id === id ? { ...lp, status: 'Approved' as const } : lp
    ));
  }, []);

  const markLessonDelivered = useCallback((id: string) => {
    setLessonPlans(prev => prev.map(lp =>
      lp.id === id ? { ...lp, status: 'Delivered' as const } : lp
    ));
  }, []);

  // ============================================
  // Assessment Actions
  // ============================================
  const addAssessment = useCallback((newAssessment: Omit<CollegeAssessment, 'id'>) => {
    const assessment: CollegeAssessment = {
      ...newAssessment,
      id: generateId('assess'),
    };
    setAssessments(prev => [...prev, assessment]);
  }, []);

  const updateAssessment = useCallback((id: string, updates: Partial<CollegeAssessment>) => {
    setAssessments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const gradeAssessment = useCallback((
    id: string,
    grade: string,
    score: number,
    feedback: string,
    assessorId: string,
    assessorName: string
  ) => {
    setAssessments(prev => prev.map(a =>
      a.id === id ? {
        ...a,
        grade,
        score,
        feedback,
        assessorId,
        assessorName,
        gradedDate: new Date().toISOString().split('T')[0],
        status: 'Graded' as const
      } : a
    ));
  }, []);

  const verifyAssessment = useCallback((id: string) => {
    setAssessments(prev => prev.map(a =>
      a.id === id ? { ...a, status: 'Verified' as const } : a
    ));
  }, []);

  // ============================================
  // Attendance Actions
  // ============================================
  const recordAttendance = useCallback((record: Omit<CollegeAttendance, 'id'>) => {
    const newRecord: CollegeAttendance = {
      ...record,
      id: generateId('att'),
    };
    setAttendance(prev => [...prev, newRecord]);
  }, []);

  const bulkRecordAttendance = useCallback((records: Array<Omit<CollegeAttendance, 'id'>>) => {
    const newRecords = records.map(r => ({
      ...r,
      id: generateId('att'),
    }));
    setAttendance(prev => [...prev, ...newRecords]);
  }, []);

  const updateAttendance = useCallback((id: string, updates: Partial<CollegeAttendance>) => {
    setAttendance(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  // ============================================
  // ILP Actions
  // ============================================
  const addILP = useCallback((newILP: Omit<CollegeILP, 'id'>) => {
    const ilp: CollegeILP = {
      ...newILP,
      id: generateId('ilp'),
    };
    setILPs(prev => [...prev, ilp]);
  }, []);

  const updateILP = useCallback((id: string, updates: Partial<CollegeILP>) => {
    setILPs(prev => prev.map(ilp => ilp.id === id ? { ...ilp, ...updates } : ilp));
  }, []);

  const addILPTarget = useCallback((ilpId: string, target: CollegeILP['shortTermTargets'][0]) => {
    setILPs(prev => prev.map(ilp =>
      ilp.id === ilpId ? { ...ilp, shortTermTargets: [...ilp.shortTermTargets, target] } : ilp
    ));
  }, []);

  const updateILPTarget = useCallback((
    ilpId: string,
    targetIndex: number,
    status: 'Pending' | 'Achieved' | 'Overdue' | 'In Progress'
  ) => {
    setILPs(prev => prev.map(ilp => {
      if (ilp.id === ilpId) {
        const newTargets = [...ilp.shortTermTargets];
        if (newTargets[targetIndex]) {
          newTargets[targetIndex] = { ...newTargets[targetIndex], status };
        }
        return { ...ilp, shortTermTargets: newTargets };
      }
      return ilp;
    }));
  }, []);

  // ============================================
  // EPA Actions
  // ============================================
  const addEPARecord = useCallback((record: Omit<CollegeEPARecord, 'id'>) => {
    const epaRecord: CollegeEPARecord = {
      ...record,
      id: generateId('epa'),
    };
    setEPARecords(prev => [...prev, epaRecord]);
  }, []);

  const updateEPARecord = useCallback((id: string, updates: Partial<CollegeEPARecord>) => {
    setEPARecords(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  // ============================================
  // Progress Actions
  // ============================================
  const updateStudentProgress = useCallback((id: string, updates: Partial<CollegeStudentProgress>) => {
    setStudentProgress(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  // ============================================
  // Teaching Resource Actions
  // ============================================
  const addTeachingResource = useCallback((resource: Omit<CollegeTeachingResource, 'id' | 'downloadCount' | 'createdAt'>) => {
    const newResource: CollegeTeachingResource = {
      ...resource,
      id: generateId('res'),
      downloadCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTeachingResources(prev => [...prev, newResource]);
  }, []);

  const updateTeachingResource = useCallback((id: string, updates: Partial<CollegeTeachingResource>) => {
    setTeachingResources(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const deleteTeachingResource = useCallback((id: string) => {
    setTeachingResources(prev => prev.filter(r => r.id !== id));
  }, []);

  const incrementResourceDownload = useCallback((id: string) => {
    setTeachingResources(prev => prev.map(r =>
      r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r
    ));
  }, []);

  // ============================================
  // Portfolio Actions
  // ============================================
  const addPortfolio = useCallback((newPortfolio: Omit<CollegePortfolio, 'id'>) => {
    const portfolio: CollegePortfolio = {
      ...newPortfolio,
      id: generateId('portfolio'),
    };
    setPortfolios(prev => [...prev, portfolio]);
  }, []);

  const updatePortfolio = useCallback((id: string, updates: Partial<CollegePortfolio>) => {
    setPortfolios(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : p));
  }, []);

  const addEvidence = useCallback((newEvidence: Omit<PortfolioEvidence, 'id'>) => {
    const evidence: PortfolioEvidence = {
      ...newEvidence,
      id: generateId('evidence'),
    };
    setPortfolioEvidence(prev => [...prev, evidence]);

    // Update portfolio evidence counts
    setPortfolios(prev => prev.map(p => {
      if (p.id === newEvidence.portfolioId) {
        return {
          ...p,
          totalEvidence: p.totalEvidence + 1,
          pendingEvidence: p.pendingEvidence + 1,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    }));
  }, []);

  const updateEvidence = useCallback((id: string, updates: Partial<PortfolioEvidence>) => {
    setPortfolioEvidence(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const reviewEvidence = useCallback((
    id: string,
    status: EvidenceStatus,
    feedback: string,
    reviewerId: string,
    reviewerName: string
  ) => {
    const evidence = portfolioEvidence.find(e => e.id === id);
    if (!evidence) return;

    setPortfolioEvidence(prev => prev.map(e =>
      e.id === id ? {
        ...e,
        status,
        reviewFeedback: feedback,
        reviewedBy: reviewerId,
        reviewedByName: reviewerName,
        reviewedAt: new Date().toISOString().split('T')[0],
        resubmissionCount: status === 'Resubmit Required' ? e.resubmissionCount + 1 : e.resubmissionCount,
      } : e
    ));

    // Update portfolio counts
    setPortfolios(prev => prev.map(p => {
      if (p.id === evidence.portfolioId) {
        let approvedEvidence = p.approvedEvidence;
        let pendingEvidence = p.pendingEvidence;

        if (status === 'Approved') {
          approvedEvidence++;
          pendingEvidence = Math.max(0, pendingEvidence - 1);
        } else if (status === 'Rejected' || status === 'Resubmit Required') {
          pendingEvidence = Math.max(0, pendingEvidence - 1);
        }

        const completionPercentage = Math.round((approvedEvidence / p.totalEvidence) * 100);

        return {
          ...p,
          approvedEvidence,
          pendingEvidence,
          completionPercentage,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    }));
  }, [portfolioEvidence]);

  // ============================================
  // Comment Actions
  // ============================================
  const addComment = useCallback((newComment: Omit<CollegeComment, 'id'>) => {
    const comment: CollegeComment = {
      ...newComment,
      id: generateId('comment'),
    };
    setComments(prev => [...prev, comment]);
  }, []);

  const updateComment = useCallback((id: string, updates: Partial<CollegeComment>) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c));
  }, []);

  const resolveComment = useCallback((id: string, resolverId: string, resolverName: string) => {
    setComments(prev => prev.map(c =>
      c.id === id ? {
        ...c,
        isResolved: true,
        resolvedBy: resolverId,
        resolvedByName: resolverName,
        resolvedAt: new Date().toISOString(),
        requiresAction: false,
      } : c
    ));
  }, []);

  // ============================================
  // Work Assignment Actions
  // ============================================
  const addWorkAssignment = useCallback((newAssignment: Omit<WorkAssignment, 'id'>) => {
    const assignment: WorkAssignment = {
      ...newAssignment,
      id: generateId('work'),
    };
    setWorkAssignments(prev => [...prev, assignment]);
  }, []);

  const updateWorkAssignment = useCallback((id: string, updates: Partial<WorkAssignment>) => {
    setWorkAssignments(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  }, []);

  const completeWorkAssignment = useCallback((id: string) => {
    setWorkAssignments(prev => prev.map(w =>
      w.id === id ? {
        ...w,
        status: 'Completed' as const,
        completedAt: new Date().toISOString().split('T')[0],
      } : w
    ));
  }, []);

  // ============================================
  // Calculated Values
  // ============================================
  const getStudentsByCohort = useCallback((cohortId: string) => {
    return students.filter(s => s.cohortId === cohortId && s.status === 'Active');
  }, [students]);

  const getCohortAttendanceRate = useCallback((cohortId: string) => {
    const cohortAttendance = attendance.filter(a => a.cohortId === cohortId);
    if (cohortAttendance.length === 0) return 100;

    const present = cohortAttendance.filter(a =>
      a.status === 'Present' || a.status === 'Late'
    ).length;

    return Math.round((present / cohortAttendance.length) * 100);
  }, [attendance]);

  const getStudentAttendanceRate = useCallback((studentId: string) => {
    const studentAttendance = attendance.filter(a => a.studentId === studentId);
    if (studentAttendance.length === 0) return 100;

    const present = studentAttendance.filter(a =>
      a.status === 'Present' || a.status === 'Late'
    ).length;

    return Math.round((present / studentAttendance.length) * 100);
  }, [attendance]);

  const getStudentProgressPercentage = useCallback((studentId: string) => {
    const progress = studentProgress.filter(p => p.studentId === studentId);
    if (progress.length === 0) return 0;

    const completed = progress.filter(p => p.status === 'Completed').length;
    return Math.round((completed / progress.length) * 100);
  }, [studentProgress]);

  const getOverdueILPReviews = useCallback(() => {
    const today = new Date();
    return ilps.filter(ilp =>
      ilp.status === 'Active' && new Date(ilp.nextReviewDate) < today
    );
  }, [ilps]);

  const getPendingAssessments = useCallback(() => {
    return assessments.filter(a => a.status === 'Pending' || a.status === 'Submitted');
  }, [assessments]);

  const getStaffByRole = useCallback((role: StaffRole) => {
    return staff.filter(s => s.role === role && s.status === 'Active');
  }, [staff]);

  const getUpcomingLessons = useCallback((days: number = 7) => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return lessonPlans.filter(lp => {
      const lessonDate = new Date(lp.scheduledDate);
      return lessonDate >= today && lessonDate <= futureDate;
    }).sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
  }, [lessonPlans]);

  const getStudentsAtRisk = useCallback(() => {
    return students.filter(s => {
      if (s.status !== 'Active') return false;

      // Check attendance rate
      const attendanceRate = getStudentAttendanceRate(s.id);
      if (attendanceRate < 85) return true;

      // Check progress (if any units are red/overdue)
      const progress = studentProgress.filter(p => p.studentId === s.id);
      const hasRedStatus = progress.some(p => p.ragStatus === 'Red' || p.status === 'Overdue');
      if (hasRedStatus) return true;

      return false;
    });
  }, [students, studentProgress, getStudentAttendanceRate]);

  // ============================================
  // Portfolio Calculated Values
  // ============================================
  const getPortfolioByStudent = useCallback((studentId: string) => {
    return portfolios.find(p => p.studentId === studentId);
  }, [portfolios]);

  const getEvidenceByPortfolio = useCallback((portfolioId: string) => {
    return portfolioEvidence.filter(e => e.portfolioId === portfolioId);
  }, [portfolioEvidence]);

  const getPendingEvidence = useCallback(() => {
    return portfolioEvidence.filter(e =>
      e.status === 'Submitted' || e.status === 'Under Review'
    );
  }, [portfolioEvidence]);

  const getMyWorkQueue = useCallback((staffId: string) => {
    return workAssignments.filter(w =>
      w.assignedTo === staffId && w.status !== 'Completed'
    ).sort((a, b) => {
      const priorityOrder = { 'Urgent': 0, 'High': 1, 'Normal': 2, 'Low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [workAssignments]);

  const getCommentsForItem = useCallback((contextType: string, contextId: string) => {
    return comments.filter(c =>
      c.contextType === contextType && c.contextId === contextId
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [comments]);

  const value: CollegeContextType = {
    // Data
    staff,
    students,
    courses,
    cohorts,
    lessonPlans,
    assessments,
    attendance,
    ilps,
    epaRecords,
    studentProgress,
    teachingResources,
    portfolios,
    portfolioEvidence,
    comments,
    workAssignments,

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
    addAssessment,
    updateAssessment,
    gradeAssessment,
    verifyAssessment,
    recordAttendance,
    bulkRecordAttendance,
    updateAttendance,
    addILP,
    updateILP,
    addILPTarget,
    updateILPTarget,
    addEPARecord,
    updateEPARecord,
    updateStudentProgress,
    addTeachingResource,
    updateTeachingResource,
    deleteTeachingResource,
    incrementResourceDownload,

    // Portfolio Actions
    addPortfolio,
    updatePortfolio,
    addEvidence,
    updateEvidence,
    reviewEvidence,

    // Comment Actions
    addComment,
    updateComment,
    resolveComment,

    // Work Assignment Actions
    addWorkAssignment,
    updateWorkAssignment,
    completeWorkAssignment,

    // Calculated
    getStudentsByCohort,
    getCohortAttendanceRate,
    getStudentAttendanceRate,
    getStudentProgressPercentage,
    getOverdueILPReviews,
    getPendingAssessments,
    getStaffByRole,
    getUpcomingLessons,
    getStudentsAtRisk,

    // Portfolio Calculated Values
    getPortfolioByStudent,
    getEvidenceByPortfolio,
    getPendingEvidence,
    getMyWorkQueue,
    getCommentsForItem,
  };

  return (
    <CollegeContext.Provider value={value}>
      {children}
    </CollegeContext.Provider>
  );
}

export function useCollege() {
  const context = useContext(CollegeContext);
  if (context === undefined) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
}
