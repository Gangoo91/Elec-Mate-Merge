// College Hub Mock Data

export type StaffRole = 'tutor' | 'assessor' | 'admin' | 'support' | 'head_of_department';
export type StaffStatus = 'Active' | 'On Leave' | 'Archived';
export type StudentStatus = 'Active' | 'Withdrawn' | 'Completed' | 'Suspended' | 'On Break';
export type CohortStatus = 'Planning' | 'Active' | 'Completed' | 'Cancelled';
export type CourseStatus = 'Active' | 'Archived' | 'Draft';
export type DeliveryMode = 'In-person' | 'Online' | 'Hybrid' | 'Block Release' | 'Day Release';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Authorised Absence' | 'Sick' | 'Left Early';
export type AssessmentStatus = 'Pending' | 'Submitted' | 'Graded' | 'Verified' | 'Resubmit Required' | 'Referred';
export type EPAStatus = 'Pre-Gateway' | 'Gateway Ready' | 'In EPA' | 'Awaiting Results' | 'Completed' | 'Failed';
export type ILPStatus = 'Active' | 'Completed' | 'On Hold' | 'Withdrawn';
export type ProgressStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Overdue' | 'Referred';
export type RAGStatus = 'Red' | 'Amber' | 'Green';
export type LessonPlanStatus = 'Draft' | 'Approved' | 'Delivered' | 'Archived';
export type EvidenceType = 'Document' | 'Image' | 'Video' | 'Link' | 'Observation' | 'Witness Statement';
export type EvidenceStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Resubmit Required';
export type PortfolioStatus = 'In Progress' | 'Ready for Review' | 'Under Review' | 'Approved' | 'Completed';
export type CommentContextType = 'evidence' | 'assessment' | 'ilp' | 'portfolio';
export type WorkAssignmentStatus = 'Pending' | 'In Progress' | 'Completed' | 'Returned';
export type WorkPriority = 'Urgent' | 'High' | 'Normal' | 'Low';

export interface CollegeStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: string;
  status: StaffStatus;
  specialisations: string[];
  qualifications: Array<{ name: string; issuer: string; date: string }>;
  photoUrl?: string;
  avatarInitials: string;
  employmentType: 'Full-time' | 'Part-time' | 'Agency' | 'Contractor';
  startDate: string;
  hourlyRate?: number;
  maxTeachingHours?: number;
  dbsNumber?: string;
  dbsExpiry?: string;
  teachingQual?: string;
  assessorQual?: string;
  iqaQual?: string;
}

export interface CollegeStudent {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  photoUrl?: string;
  avatarInitials: string;
  status: StudentStatus;
  enrollmentDate: string;
  expectedCompletionDate: string;
  employerName?: string;
  employerContact?: string;
  fundingType: 'Apprenticeship Levy' | 'ESFA' | 'Self-funded' | 'Employer Funded' | 'Other';
  uln?: string;
  additionalSupportNeeds?: string;
  emergencyContact?: { name: string; phone: string; relationship: string };
  cohortId?: string;
  courseId?: string;
}

export interface CollegeCourse {
  id: string;
  title: string;
  code: string;
  level: number;
  qualificationType: 'NVQ' | 'Diploma' | 'Certificate' | 'Apprenticeship Standard' | 'Award' | 'Technical Certificate';
  awardingBody: string;
  durationWeeks: number;
  guidedLearningHours: number;
  offTheJobHours?: number;
  description: string;
  learningOutcomes: string[];
  entryRequirements: string;
  status: CourseStatus;
  version: string;
  maxFunding?: number;
  epaRequired: boolean;
}

export interface CollegeCohort {
  id: string;
  name: string;
  code: string;
  courseId: string;
  courseName: string;
  leadTutorId: string;
  leadTutorName: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: CohortStatus;
  deliveryMode: DeliveryMode;
  meetingDay: string;
  meetingTime: string;
  room: string;
}

export interface CollegeLessonPlan {
  id: string;
  courseId: string;
  courseName: string;
  tutorId: string;
  tutorName: string;
  cohortId?: string;
  cohortName?: string;
  title: string;
  unitReference: string;
  weekNumber: number;
  sessionNumber: number;
  durationMinutes: number;
  learningObjectives: string[];
  resourcesNeeded: string[];
  starterActivity: string;
  mainActivity: string;
  plenaryActivity: string;
  status: LessonPlanStatus;
  scheduledDate: string;
}

export interface CollegeAssessment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  unitReference: string;
  assessmentType: 'Practical' | 'Written' | 'Portfolio' | 'Observation' | 'Professional Discussion' | 'Multiple Choice' | 'Assignment' | 'Project';
  title: string;
  grade?: string;
  score?: number;
  maxScore?: number;
  feedback?: string;
  assessmentDate?: string;
  submissionDate?: string;
  gradedDate?: string;
  status: AssessmentStatus;
  attemptNumber: number;
  assessorId?: string;
  assessorName?: string;
}

export interface CollegeAttendance {
  id: string;
  studentId: string;
  studentName: string;
  cohortId: string;
  sessionDate: string;
  sessionType: 'Lecture' | 'Workshop' | 'Tutorial' | 'EPA Prep' | 'Assessment' | 'Practical' | 'Online' | 'Self-Study';
  tutorId: string;
  status: AttendanceStatus;
  arrivalTime?: string;
  minutesLate?: number;
  absenceReason?: string;
  offTheJobHours?: number;
}

export interface CollegeILP {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  tutorId: string;
  tutorName: string;
  createdDate: string;
  nextReviewDate: string;
  longTermGoals: string[];
  shortTermTargets: Array<{
    target: string;
    deadline: string;
    status: 'Pending' | 'Achieved' | 'Overdue' | 'In Progress';
  }>;
  careerAspirations: string;
  supportArrangements: string;
  learningStylePreference: 'Visual' | 'Auditory' | 'Kinesthetic' | 'Reading/Writing' | 'Multimodal';
  attendanceTarget: number;
  status: ILPStatus;
}

export interface CollegeEPARecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  epao: string;
  epaoReference?: string;
  gatewayReadinessDate?: string;
  gatewayMeetingDate?: string;
  gatewayOutcome?: 'Ready' | 'Not Ready' | 'Deferred';
  epaStartDate?: string;
  knowledgeTestDate?: string;
  knowledgeTestOutcome?: string;
  practicalAssessmentDate?: string;
  practicalOutcome?: string;
  professionalDiscussionDate?: string;
  professionalDiscussionOutcome?: string;
  finalGrade?: 'Pass' | 'Merit' | 'Distinction' | 'Fail' | 'Not Yet Competent';
  completionDate?: string;
  certificateNumber?: string;
  status: EPAStatus;
}

export interface CollegeStudentProgress {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  unitReference: string;
  unitTitle: string;
  targetCompletionDate: string;
  actualCompletionDate?: string;
  status: ProgressStatus;
  ragStatus: RAGStatus;
  evidenceCount: number;
}

export interface CollegeTeachingResource {
  id: string;
  title: string;
  description: string;
  category: 'Presentation' | 'Worksheet' | 'Video' | 'Assessment' | 'Practical Guide' | 'Handout' | 'Quiz' | 'Template' | 'Other';
  courseId?: string;
  courseName?: string;
  unitReference?: string;
  fileUrl?: string;
  fileType: string;
  tags: string[];
  uploadedBy: string;
  uploadedByName: string;
  visibility: 'Institution' | 'Course' | 'Private' | 'Public';
  downloadCount: number;
  createdAt: string;
}

export interface CollegePortfolio {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  status: PortfolioStatus;
  completionPercentage: number;
  totalEvidence: number;
  approvedEvidence: number;
  pendingEvidence: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioEvidence {
  id: string;
  portfolioId: string;
  studentId: string;
  studentName: string;
  unitId: string;
  unitTitle: string;
  assessmentCriteria: string[];
  title: string;
  description: string;
  evidenceType: EvidenceType;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  linkUrl?: string;
  status: EvidenceStatus;
  submittedAt?: string;
  reviewedBy?: string;
  reviewedByName?: string;
  reviewedAt?: string;
  reviewFeedback?: string;
  resubmissionCount: number;
  createdAt: string;
}

export interface CollegeComment {
  id: string;
  contextType: CommentContextType;
  contextId: string;
  parentId?: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  content: string;
  mentions: string[];
  requiresAction: boolean;
  actionOwner?: string;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedByName?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface WorkAssignment {
  id: string;
  itemType: 'submission' | 'evidence' | 'portfolio';
  itemId: string;
  itemTitle: string;
  studentName: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  assignedByName: string;
  roleRequired: 'tutor' | 'assessor' | 'iqa';
  priority: WorkPriority;
  status: WorkAssignmentStatus;
  dueDate?: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

// ============================================
// Mock Data
// ============================================

export const mockStaff: CollegeStaff[] = [
  {
    id: "staff-1",
    name: "Dr. Sarah Johnson",
    email: "s.johnson@electricalcollege.ac.uk",
    phone: "07700 900001",
    role: "tutor",
    department: "Electrical Installation",
    status: "Active",
    specialisations: ["18th Edition", "Solar PV", "Testing & Inspection", "EV Charging"],
    qualifications: [
      { name: "PGCE", issuer: "University of Manchester", date: "2015-07-01" },
      { name: "City & Guilds 2391", issuer: "City & Guilds", date: "2018-03-15" },
      { name: "Level 4 TAQA", issuer: "City & Guilds", date: "2019-06-20" }
    ],
    avatarInitials: "SJ",
    employmentType: "Full-time",
    startDate: "2016-09-01",
    hourlyRate: 45,
    maxTeachingHours: 22,
    dbsNumber: "DBS123456789",
    dbsExpiry: "2026-03-15",
    teachingQual: "PGCE",
    assessorQual: "Level 3 CAVA",
    iqaQual: "Level 4 TAQA"
  },
  {
    id: "staff-2",
    name: "Mark Williams",
    email: "m.williams@electricalcollege.ac.uk",
    phone: "07700 900002",
    role: "tutor",
    department: "Electrical Installation",
    status: "Active",
    specialisations: ["Domestic Installation", "Commercial Wiring", "Fire Alarm Systems"],
    qualifications: [
      { name: "Cert Ed", issuer: "City University", date: "2017-07-01" },
      { name: "City & Guilds 2365", issuer: "City & Guilds", date: "2010-06-15" }
    ],
    avatarInitials: "MW",
    employmentType: "Full-time",
    startDate: "2018-01-15",
    hourlyRate: 42,
    maxTeachingHours: 22,
    dbsNumber: "DBS234567890",
    dbsExpiry: "2025-11-20",
    teachingQual: "Cert Ed",
    assessorQual: "Level 3 CAVA"
  },
  {
    id: "staff-3",
    name: "Emma Thompson",
    email: "e.thompson@electricalcollege.ac.uk",
    phone: "07700 900003",
    role: "assessor",
    department: "Electrical Installation",
    status: "Active",
    specialisations: ["Testing & Inspection", "Portable Appliance Testing"],
    qualifications: [
      { name: "Level 3 CAVA", issuer: "City & Guilds", date: "2019-09-01" },
      { name: "City & Guilds 2391", issuer: "City & Guilds", date: "2017-04-10" }
    ],
    avatarInitials: "ET",
    employmentType: "Part-time",
    startDate: "2020-03-01",
    hourlyRate: 38,
    maxTeachingHours: 15,
    dbsNumber: "DBS345678901",
    dbsExpiry: "2026-06-30"
  },
  {
    id: "staff-4",
    name: "David Chen",
    email: "d.chen@electricalcollege.ac.uk",
    phone: "07700 900004",
    role: "head_of_department",
    department: "Electrical Installation",
    status: "Active",
    specialisations: ["Curriculum Development", "Quality Assurance", "EPA"],
    qualifications: [
      { name: "MA Education", issuer: "Open University", date: "2014-07-01" },
      { name: "Level 4 TAQA", issuer: "City & Guilds", date: "2016-03-15" }
    ],
    avatarInitials: "DC",
    employmentType: "Full-time",
    startDate: "2012-09-01",
    hourlyRate: 55,
    maxTeachingHours: 10,
    dbsNumber: "DBS456789012",
    dbsExpiry: "2025-09-01",
    teachingQual: "MA Education",
    iqaQual: "Level 4 TAQA"
  },
  {
    id: "staff-5",
    name: "Lisa Martinez",
    email: "l.martinez@electricalcollege.ac.uk",
    phone: "07700 900005",
    role: "admin",
    department: "Administration",
    status: "Active",
    specialisations: ["Student Records", "Funding Claims", "ESFA"],
    qualifications: [
      { name: "AAT Level 3", issuer: "AAT", date: "2018-06-01" }
    ],
    avatarInitials: "LM",
    employmentType: "Full-time",
    startDate: "2019-04-01",
    dbsNumber: "DBS567890123",
    dbsExpiry: "2026-01-15"
  },
  {
    id: "staff-6",
    name: "James Wilson",
    email: "j.wilson@electricalcollege.ac.uk",
    phone: "07700 900006",
    role: "support",
    department: "Learning Support",
    status: "Active",
    specialisations: ["SEND Support", "Dyslexia", "Numeracy Support"],
    qualifications: [
      { name: "Level 3 Learning Support", issuer: "CACHE", date: "2020-03-01" }
    ],
    avatarInitials: "JW",
    employmentType: "Full-time",
    startDate: "2021-01-10",
    hourlyRate: 25,
    dbsNumber: "DBS678901234",
    dbsExpiry: "2026-08-20"
  }
];

export const mockStudents: CollegeStudent[] = [
  {
    id: "student-1",
    studentNumber: "STU-2024-001",
    name: "James Mitchell",
    email: "j.mitchell@student.ac.uk",
    phone: "07800 100001",
    dateOfBirth: "2004-03-15",
    avatarInitials: "JM",
    status: "Active",
    enrollmentDate: "2024-09-02",
    expectedCompletionDate: "2027-08-31",
    employerName: "Sparks Electrical Ltd",
    employerContact: "Mike Sparks",
    fundingType: "Apprenticeship Levy",
    uln: "1234567890",
    emergencyContact: { name: "Helen Mitchell", phone: "07800 200001", relationship: "Mother" },
    cohortId: "cohort-1",
    courseId: "course-1"
  },
  {
    id: "student-2",
    studentNumber: "STU-2024-002",
    name: "Sophie Brown",
    email: "s.brown@student.ac.uk",
    phone: "07800 100002",
    dateOfBirth: "2003-07-22",
    avatarInitials: "SB",
    status: "Active",
    enrollmentDate: "2024-09-02",
    expectedCompletionDate: "2027-08-31",
    employerName: "City Power Solutions",
    employerContact: "Sarah Power",
    fundingType: "Apprenticeship Levy",
    uln: "2345678901",
    emergencyContact: { name: "Tom Brown", phone: "07800 200002", relationship: "Father" },
    cohortId: "cohort-1",
    courseId: "course-1"
  },
  {
    id: "student-3",
    studentNumber: "STU-2024-003",
    name: "Ryan O'Connor",
    email: "r.oconnor@student.ac.uk",
    phone: "07800 100003",
    dateOfBirth: "2005-01-10",
    avatarInitials: "RO",
    status: "Active",
    enrollmentDate: "2024-09-02",
    expectedCompletionDate: "2027-08-31",
    employerName: "ABC Electricians",
    employerContact: "Alan Brown",
    fundingType: "ESFA",
    uln: "3456789012",
    additionalSupportNeeds: "Dyslexia - extra time in assessments",
    emergencyContact: { name: "Mary O'Connor", phone: "07800 200003", relationship: "Mother" },
    cohortId: "cohort-1",
    courseId: "course-1"
  },
  {
    id: "student-4",
    studentNumber: "STU-2024-004",
    name: "Emma Davies",
    email: "e.davies@student.ac.uk",
    phone: "07800 100004",
    dateOfBirth: "2004-11-05",
    avatarInitials: "ED",
    status: "Active",
    enrollmentDate: "2024-09-02",
    expectedCompletionDate: "2027-08-31",
    employerName: "Bright Futures Electrical",
    employerContact: "Dave Jones",
    fundingType: "Apprenticeship Levy",
    uln: "4567890123",
    emergencyContact: { name: "John Davies", phone: "07800 200004", relationship: "Father" },
    cohortId: "cohort-1",
    courseId: "course-1"
  },
  {
    id: "student-5",
    studentNumber: "STU-2024-005",
    name: "Oliver Taylor",
    email: "o.taylor@student.ac.uk",
    phone: "07800 100005",
    dateOfBirth: "2003-05-18",
    avatarInitials: "OT",
    status: "Active",
    enrollmentDate: "2024-09-02",
    expectedCompletionDate: "2027-08-31",
    employerName: "Taylor & Sons Electrical",
    employerContact: "Frank Taylor",
    fundingType: "Employer Funded",
    uln: "5678901234",
    emergencyContact: { name: "Susan Taylor", phone: "07800 200005", relationship: "Mother" },
    cohortId: "cohort-1",
    courseId: "course-1"
  },
  {
    id: "student-6",
    studentNumber: "STU-2023-015",
    name: "Lucas Anderson",
    email: "l.anderson@student.ac.uk",
    phone: "07800 100006",
    dateOfBirth: "2002-09-30",
    avatarInitials: "LA",
    status: "Active",
    enrollmentDate: "2023-09-04",
    expectedCompletionDate: "2026-08-31",
    employerName: "Anderson Electrical Services",
    employerContact: "Peter Anderson",
    fundingType: "Apprenticeship Levy",
    uln: "6789012345",
    cohortId: "cohort-2",
    courseId: "course-1"
  },
  {
    id: "student-7",
    studentNumber: "STU-2023-016",
    name: "Mia Roberts",
    email: "m.roberts@student.ac.uk",
    phone: "07800 100007",
    dateOfBirth: "2003-02-14",
    avatarInitials: "MR",
    status: "Active",
    enrollmentDate: "2023-09-04",
    expectedCompletionDate: "2026-08-31",
    employerName: "Roberts & Co Electrical",
    employerContact: "Claire Roberts",
    fundingType: "Apprenticeship Levy",
    uln: "7890123456",
    cohortId: "cohort-2",
    courseId: "course-1"
  },
  {
    id: "student-8",
    studentNumber: "STU-2022-008",
    name: "Nathan Hughes",
    email: "n.hughes@student.ac.uk",
    phone: "07800 100008",
    dateOfBirth: "2001-06-25",
    avatarInitials: "NH",
    status: "Active",
    enrollmentDate: "2022-09-05",
    expectedCompletionDate: "2025-08-31",
    employerName: "Hughes Electrical Contractors",
    employerContact: "Steve Hughes",
    fundingType: "Apprenticeship Levy",
    uln: "8901234567",
    cohortId: "cohort-3",
    courseId: "course-1"
  }
];

export const mockCourses: CollegeCourse[] = [
  {
    id: "course-1",
    title: "Level 3 Electrical Installation",
    code: "2365-03",
    level: 3,
    qualificationType: "Diploma",
    awardingBody: "City & Guilds",
    durationWeeks: 156,
    guidedLearningHours: 950,
    offTheJobHours: 480,
    description: "This comprehensive course covers all aspects of electrical installation for domestic, commercial and industrial environments.",
    learningOutcomes: [
      "Install wiring systems and enclosures",
      "Inspect, test and commission electrical installations",
      "Understand electrical science and principles",
      "Apply health and safety in electrical work"
    ],
    entryRequirements: "GCSE Maths and English Grade 4 or above, or equivalent",
    status: "Active",
    version: "2023.1",
    maxFunding: 21000,
    epaRequired: true
  },
  {
    id: "course-2",
    title: "Level 2 Electrical Installation",
    code: "2365-02",
    level: 2,
    qualificationType: "Diploma",
    awardingBody: "City & Guilds",
    durationWeeks: 52,
    guidedLearningHours: 420,
    offTheJobHours: 200,
    description: "Foundation course in electrical installation covering basic principles and practical skills.",
    learningOutcomes: [
      "Understand electrical principles",
      "Carry out basic wiring tasks",
      "Work safely with electricity",
      "Use appropriate tools and equipment"
    ],
    entryRequirements: "GCSE Maths and English Grade 3 or above",
    status: "Active",
    version: "2023.1",
    maxFunding: 9000,
    epaRequired: false
  },
  {
    id: "course-3",
    title: "18th Edition IET Wiring Regulations",
    code: "2382-22",
    level: 3,
    qualificationType: "Award",
    awardingBody: "City & Guilds",
    durationWeeks: 2,
    guidedLearningHours: 35,
    description: "Update course for the 18th Edition BS 7671 wiring regulations including Amendment 2.",
    learningOutcomes: [
      "Understand the latest BS 7671 requirements",
      "Apply regulations to electrical installations",
      "Identify changes from previous editions"
    ],
    entryRequirements: "Working knowledge of electrical installations",
    status: "Active",
    version: "2022.1",
    epaRequired: false
  },
  {
    id: "course-4",
    title: "Inspection & Testing (2391)",
    code: "2391-52",
    level: 3,
    qualificationType: "Award",
    awardingBody: "City & Guilds",
    durationWeeks: 4,
    guidedLearningHours: 70,
    description: "Comprehensive course on initial verification and periodic inspection of electrical installations.",
    learningOutcomes: [
      "Carry out initial verification",
      "Perform periodic inspection and testing",
      "Complete certification documentation",
      "Use appropriate test instruments"
    ],
    entryRequirements: "Level 3 Electrical Installation or equivalent experience",
    status: "Active",
    version: "2023.1",
    epaRequired: false
  }
];

export const mockCohorts: CollegeCohort[] = [
  {
    id: "cohort-1",
    name: "L3 Electrical - September 2024",
    code: "EL3-SEP24",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    leadTutorId: "staff-1",
    leadTutorName: "Dr. Sarah Johnson",
    startDate: "2024-09-02",
    endDate: "2027-07-31",
    maxStudents: 16,
    currentStudents: 5,
    status: "Active",
    deliveryMode: "Block Release",
    meetingDay: "Monday",
    meetingTime: "09:00",
    room: "Workshop A"
  },
  {
    id: "cohort-2",
    name: "L3 Electrical - September 2023",
    code: "EL3-SEP23",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    leadTutorId: "staff-2",
    leadTutorName: "Mark Williams",
    startDate: "2023-09-04",
    endDate: "2026-07-31",
    maxStudents: 16,
    currentStudents: 2,
    status: "Active",
    deliveryMode: "Block Release",
    meetingDay: "Tuesday",
    meetingTime: "09:00",
    room: "Workshop B"
  },
  {
    id: "cohort-3",
    name: "L3 Electrical - September 2022",
    code: "EL3-SEP22",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    leadTutorId: "staff-1",
    leadTutorName: "Dr. Sarah Johnson",
    startDate: "2022-09-05",
    endDate: "2025-07-31",
    maxStudents: 16,
    currentStudents: 1,
    status: "Active",
    deliveryMode: "Block Release",
    meetingDay: "Wednesday",
    meetingTime: "09:00",
    room: "Workshop A"
  },
  {
    id: "cohort-4",
    name: "18th Edition - January 2025",
    code: "18E-JAN25",
    courseId: "course-3",
    courseName: "18th Edition IET Wiring Regulations",
    leadTutorId: "staff-2",
    leadTutorName: "Mark Williams",
    startDate: "2025-01-13",
    endDate: "2025-01-24",
    maxStudents: 20,
    currentStudents: 12,
    status: "Planning",
    deliveryMode: "In-person",
    meetingDay: "Mon-Fri",
    meetingTime: "09:00",
    room: "Classroom 1"
  }
];

export const mockLessonPlans: CollegeLessonPlan[] = [
  {
    id: "lp-1",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    tutorId: "staff-1",
    tutorName: "Dr. Sarah Johnson",
    cohortId: "cohort-1",
    cohortName: "L3 Electrical - September 2024",
    title: "Introduction to BS 7671 Amendment 2",
    unitReference: "Unit 201",
    weekNumber: 12,
    sessionNumber: 1,
    durationMinutes: 180,
    learningObjectives: [
      "Explain the purpose of BS 7671",
      "Identify key changes in Amendment 2",
      "Apply regulations to practical scenarios"
    ],
    resourcesNeeded: ["BS 7671 Regulation book", "Presentation slides", "Handout worksheets"],
    starterActivity: "Quiz on previous session - electrical safety",
    mainActivity: "Presentation on Amendment 2 changes with group discussion",
    plenaryActivity: "Case study: Apply new regulations to a domestic installation",
    status: "Approved",
    scheduledDate: "2025-01-13"
  },
  {
    id: "lp-2",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    tutorId: "staff-1",
    tutorName: "Dr. Sarah Johnson",
    cohortId: "cohort-1",
    cohortName: "L3 Electrical - September 2024",
    title: "Consumer Unit Installation",
    unitReference: "Unit 202",
    weekNumber: 13,
    sessionNumber: 1,
    durationMinutes: 360,
    learningObjectives: [
      "Safely isolate an installation",
      "Select appropriate circuit protection",
      "Install a consumer unit to regulations"
    ],
    resourcesNeeded: ["Consumer unit", "MCBs", "RCDs", "Test equipment", "PPE"],
    starterActivity: "Health & safety briefing and PPE check",
    mainActivity: "Practical: Install and wire a consumer unit",
    plenaryActivity: "Peer review of installations",
    status: "Draft",
    scheduledDate: "2025-01-20"
  }
];

export const mockAssessments: CollegeAssessment[] = [
  {
    id: "assess-1",
    studentId: "student-1",
    studentName: "James Mitchell",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 201",
    assessmentType: "Written",
    title: "Electrical Science Theory Test",
    grade: "Merit",
    score: 78,
    maxScore: 100,
    feedback: "Good understanding of concepts. Focus on calculations for distinction.",
    assessmentDate: "2024-12-15",
    gradedDate: "2024-12-18",
    status: "Verified",
    attemptNumber: 1,
    assessorId: "staff-3",
    assessorName: "Emma Thompson"
  },
  {
    id: "assess-2",
    studentId: "student-2",
    studentName: "Sophie Brown",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 201",
    assessmentType: "Written",
    title: "Electrical Science Theory Test",
    grade: "Distinction",
    score: 92,
    maxScore: 100,
    feedback: "Excellent work. All criteria met to distinction standard.",
    assessmentDate: "2024-12-15",
    gradedDate: "2024-12-18",
    status: "Verified",
    attemptNumber: 1,
    assessorId: "staff-3",
    assessorName: "Emma Thompson"
  },
  {
    id: "assess-3",
    studentId: "student-3",
    studentName: "Ryan O'Connor",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 201",
    assessmentType: "Written",
    title: "Electrical Science Theory Test",
    status: "Pending",
    attemptNumber: 1,
    assessmentDate: "2025-01-15"
  },
  {
    id: "assess-4",
    studentId: "student-1",
    studentName: "James Mitchell",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 202",
    assessmentType: "Practical",
    title: "Consumer Unit Installation",
    status: "Pending",
    attemptNumber: 1,
    assessmentDate: "2025-01-22"
  },
  {
    id: "assess-5",
    studentId: "student-8",
    studentName: "Nathan Hughes",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 306",
    assessmentType: "Practical",
    title: "Final Installation Project",
    grade: "Pass",
    score: 65,
    maxScore: 100,
    feedback: "Meets all pass criteria. Consider more attention to cable management for merit.",
    assessmentDate: "2024-11-20",
    gradedDate: "2024-11-25",
    status: "Graded",
    attemptNumber: 1,
    assessorId: "staff-1",
    assessorName: "Dr. Sarah Johnson"
  }
];

export const mockAttendance: CollegeAttendance[] = [
  { id: "att-1", studentId: "student-1", studentName: "James Mitchell", cohortId: "cohort-1", sessionDate: "2025-01-06", sessionType: "Workshop", tutorId: "staff-1", status: "Present", offTheJobHours: 6 },
  { id: "att-2", studentId: "student-2", studentName: "Sophie Brown", cohortId: "cohort-1", sessionDate: "2025-01-06", sessionType: "Workshop", tutorId: "staff-1", status: "Present", offTheJobHours: 6 },
  { id: "att-3", studentId: "student-3", studentName: "Ryan O'Connor", cohortId: "cohort-1", sessionDate: "2025-01-06", sessionType: "Workshop", tutorId: "staff-1", status: "Late", minutesLate: 15, offTheJobHours: 5.75 },
  { id: "att-4", studentId: "student-4", studentName: "Emma Davies", cohortId: "cohort-1", sessionDate: "2025-01-06", sessionType: "Workshop", tutorId: "staff-1", status: "Present", offTheJobHours: 6 },
  { id: "att-5", studentId: "student-5", studentName: "Oliver Taylor", cohortId: "cohort-1", sessionDate: "2025-01-06", sessionType: "Workshop", tutorId: "staff-1", status: "Absent", absenceReason: "Sick - flu" },
  { id: "att-6", studentId: "student-1", studentName: "James Mitchell", cohortId: "cohort-1", sessionDate: "2024-12-16", sessionType: "Lecture", tutorId: "staff-1", status: "Present", offTheJobHours: 6 },
  { id: "att-7", studentId: "student-2", studentName: "Sophie Brown", cohortId: "cohort-1", sessionDate: "2024-12-16", sessionType: "Lecture", tutorId: "staff-1", status: "Present", offTheJobHours: 6 },
  { id: "att-8", studentId: "student-3", studentName: "Ryan O'Connor", cohortId: "cohort-1", sessionDate: "2024-12-16", sessionType: "Lecture", tutorId: "staff-1", status: "Present", offTheJobHours: 6 },
];

export const mockILPs: CollegeILP[] = [
  {
    id: "ilp-1",
    studentId: "student-1",
    studentName: "James Mitchell",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    tutorId: "staff-1",
    tutorName: "Dr. Sarah Johnson",
    createdDate: "2024-09-15",
    nextReviewDate: "2025-01-20",
    longTermGoals: ["Achieve Distinction grade in EPA", "Become a qualified electrician", "Eventually run own business"],
    shortTermTargets: [
      { target: "Complete Unit 201 assessment", deadline: "2025-01-31", status: "In Progress" },
      { target: "Achieve 95% attendance", deadline: "2025-03-31", status: "Pending" },
      { target: "Complete workplace evidence portfolio", deadline: "2025-02-28", status: "In Progress" }
    ],
    careerAspirations: "Become a fully qualified electrician with own contracting business",
    supportArrangements: "None required",
    learningStylePreference: "Kinesthetic",
    attendanceTarget: 95,
    status: "Active"
  },
  {
    id: "ilp-2",
    studentId: "student-3",
    studentName: "Ryan O'Connor",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    tutorId: "staff-1",
    tutorName: "Dr. Sarah Johnson",
    createdDate: "2024-09-15",
    nextReviewDate: "2025-01-20",
    longTermGoals: ["Pass all units", "Complete apprenticeship", "Specialise in renewable energy"],
    shortTermTargets: [
      { target: "Use reading support software for all written work", deadline: "2025-01-31", status: "Achieved" },
      { target: "Complete Unit 201 with extra time allowance", deadline: "2025-02-15", status: "In Progress" },
      { target: "Attend additional maths support sessions", deadline: "2025-03-31", status: "Pending" }
    ],
    careerAspirations: "Work in renewable energy sector, particularly solar PV installation",
    supportArrangements: "25% extra time in assessments due to dyslexia. Access to reading software.",
    learningStylePreference: "Visual",
    attendanceTarget: 90,
    status: "Active"
  }
];

export const mockEPARecords: CollegeEPARecord[] = [
  {
    id: "epa-1",
    studentId: "student-8",
    studentName: "Nathan Hughes",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    epao: "EPA Excellence Ltd",
    gatewayReadinessDate: "2025-03-01",
    status: "Pre-Gateway"
  },
  {
    id: "epa-2",
    studentId: "student-6",
    studentName: "Lucas Anderson",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    epao: "EPA Excellence Ltd",
    gatewayReadinessDate: "2025-09-01",
    status: "Pre-Gateway"
  }
];

export const mockStudentProgress: CollegeStudentProgress[] = [
  { id: "prog-1", studentId: "student-1", studentName: "James Mitchell", courseId: "course-1", unitReference: "Unit 201", unitTitle: "Electrical Science", targetCompletionDate: "2025-01-31", status: "In Progress", ragStatus: "Green", evidenceCount: 5 },
  { id: "prog-2", studentId: "student-1", studentName: "James Mitchell", courseId: "course-1", unitReference: "Unit 202", unitTitle: "Installation Methods", targetCompletionDate: "2025-03-31", status: "Not Started", ragStatus: "Green", evidenceCount: 0 },
  { id: "prog-3", studentId: "student-2", studentName: "Sophie Brown", courseId: "course-1", unitReference: "Unit 201", unitTitle: "Electrical Science", targetCompletionDate: "2025-01-31", actualCompletionDate: "2024-12-18", status: "Completed", ragStatus: "Green", evidenceCount: 8 },
  { id: "prog-4", studentId: "student-3", studentName: "Ryan O'Connor", courseId: "course-1", unitReference: "Unit 201", unitTitle: "Electrical Science", targetCompletionDate: "2025-01-31", status: "In Progress", ragStatus: "Amber", evidenceCount: 3 },
  { id: "prog-5", studentId: "student-8", studentName: "Nathan Hughes", courseId: "course-1", unitReference: "Unit 306", unitTitle: "Final Project", targetCompletionDate: "2025-02-28", status: "In Progress", ragStatus: "Amber", evidenceCount: 12 },
];

export const mockTeachingResources: CollegeTeachingResource[] = [
  {
    id: "res-1",
    title: "BS 7671 Amendment 2 Presentation",
    description: "Complete slide deck covering all major changes in Amendment 2",
    category: "Presentation",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 201",
    fileType: "pptx",
    tags: ["BS 7671", "Amendment 2", "Regulations"],
    uploadedBy: "staff-1",
    uploadedByName: "Dr. Sarah Johnson",
    visibility: "Institution",
    downloadCount: 45,
    createdAt: "2024-10-15"
  },
  {
    id: "res-2",
    title: "Consumer Unit Installation Guide",
    description: "Step-by-step practical guide for installing consumer units",
    category: "Practical Guide",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 202",
    fileType: "pdf",
    tags: ["Consumer Unit", "Practical", "Installation"],
    uploadedBy: "staff-2",
    uploadedByName: "Mark Williams",
    visibility: "Institution",
    downloadCount: 67,
    createdAt: "2024-09-20"
  },
  {
    id: "res-3",
    title: "Electrical Calculations Worksheet",
    description: "Practice problems for Ohm's law and power calculations",
    category: "Worksheet",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    unitReference: "Unit 201",
    fileType: "pdf",
    tags: ["Calculations", "Ohms Law", "Practice"],
    uploadedBy: "staff-1",
    uploadedByName: "Dr. Sarah Johnson",
    visibility: "Course",
    downloadCount: 89,
    createdAt: "2024-09-10"
  }
];

// Portfolio Mock Data
export const mockPortfolios: CollegePortfolio[] = [
  {
    id: "portfolio-1",
    studentId: "student-1",
    studentName: "James Mitchell",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    status: "In Progress",
    completionPercentage: 45,
    totalEvidence: 8,
    approvedEvidence: 4,
    pendingEvidence: 2,
    createdAt: "2024-09-15",
    updatedAt: "2025-01-05"
  },
  {
    id: "portfolio-2",
    studentId: "student-2",
    studentName: "Sophie Brown",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    status: "Ready for Review",
    completionPercentage: 78,
    totalEvidence: 12,
    approvedEvidence: 9,
    pendingEvidence: 3,
    createdAt: "2024-09-15",
    updatedAt: "2025-01-06"
  },
  {
    id: "portfolio-3",
    studentId: "student-3",
    studentName: "Ryan O'Connor",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    status: "In Progress",
    completionPercentage: 32,
    totalEvidence: 5,
    approvedEvidence: 2,
    pendingEvidence: 1,
    createdAt: "2024-09-15",
    updatedAt: "2025-01-04"
  },
  {
    id: "portfolio-4",
    studentId: "student-8",
    studentName: "Nathan Hughes",
    courseId: "course-1",
    courseName: "Level 3 Electrical Installation",
    status: "Under Review",
    completionPercentage: 92,
    totalEvidence: 24,
    approvedEvidence: 22,
    pendingEvidence: 2,
    createdAt: "2022-09-20",
    updatedAt: "2025-01-06"
  }
];

export const mockPortfolioEvidence: PortfolioEvidence[] = [
  {
    id: "evidence-1",
    portfolioId: "portfolio-1",
    studentId: "student-1",
    studentName: "James Mitchell",
    unitId: "Unit 201",
    unitTitle: "Electrical Science",
    assessmentCriteria: ["AC1.1", "AC1.2", "AC1.3"],
    title: "Ohm's Law Calculations Worksheet",
    description: "Completed worksheet showing understanding of Ohm's Law with worked examples from workplace installations.",
    evidenceType: "Document",
    fileName: "ohms-law-worksheet.pdf",
    fileSize: 245000,
    status: "Approved",
    submittedAt: "2024-10-15",
    reviewedBy: "staff-1",
    reviewedByName: "Dr. Sarah Johnson",
    reviewedAt: "2024-10-18",
    reviewFeedback: "Excellent work. All calculations correct with clear working shown.",
    resubmissionCount: 0,
    createdAt: "2024-10-15"
  },
  {
    id: "evidence-2",
    portfolioId: "portfolio-1",
    studentId: "student-1",
    studentName: "James Mitchell",
    unitId: "Unit 201",
    unitTitle: "Electrical Science",
    assessmentCriteria: ["AC2.1", "AC2.2"],
    title: "Consumer Unit Installation Photos",
    description: "Photo evidence of consumer unit installation completed at customer premises under supervision.",
    evidenceType: "Image",
    fileName: "cu-install-photos.zip",
    fileSize: 12500000,
    status: "Submitted",
    submittedAt: "2025-01-05",
    resubmissionCount: 0,
    createdAt: "2025-01-05"
  },
  {
    id: "evidence-3",
    portfolioId: "portfolio-1",
    studentId: "student-1",
    studentName: "James Mitchell",
    unitId: "Unit 202",
    unitTitle: "Installation Methods",
    assessmentCriteria: ["AC1.1", "AC1.2"],
    title: "Cable Selection Assignment",
    description: "Written assignment explaining cable selection for domestic installation project.",
    evidenceType: "Document",
    fileName: "cable-selection.docx",
    fileSize: 156000,
    status: "Under Review",
    submittedAt: "2025-01-03",
    reviewedBy: "staff-1",
    reviewedByName: "Dr. Sarah Johnson",
    resubmissionCount: 0,
    createdAt: "2025-01-03"
  },
  {
    id: "evidence-4",
    portfolioId: "portfolio-2",
    studentId: "student-2",
    studentName: "Sophie Brown",
    unitId: "Unit 201",
    unitTitle: "Electrical Science",
    assessmentCriteria: ["AC1.1", "AC1.2", "AC1.3", "AC2.1"],
    title: "Series and Parallel Circuit Analysis",
    description: "Comprehensive analysis of series and parallel circuits with practical measurements.",
    evidenceType: "Document",
    fileName: "circuit-analysis.pdf",
    fileSize: 890000,
    status: "Approved",
    submittedAt: "2024-11-20",
    reviewedBy: "staff-3",
    reviewedByName: "Emma Thompson",
    reviewedAt: "2024-11-23",
    reviewFeedback: "Distinction quality work. Excellent understanding demonstrated.",
    resubmissionCount: 0,
    createdAt: "2024-11-20"
  },
  {
    id: "evidence-5",
    portfolioId: "portfolio-2",
    studentId: "student-2",
    studentName: "Sophie Brown",
    unitId: "Unit 202",
    unitTitle: "Installation Methods",
    assessmentCriteria: ["AC3.1", "AC3.2"],
    title: "Workplace Observation - Ring Main Installation",
    description: "Tutor observation of ring main installation at workplace.",
    evidenceType: "Observation",
    status: "Submitted",
    submittedAt: "2025-01-04",
    resubmissionCount: 0,
    createdAt: "2025-01-04"
  },
  {
    id: "evidence-6",
    portfolioId: "portfolio-4",
    studentId: "student-8",
    studentName: "Nathan Hughes",
    unitId: "Unit 306",
    unitTitle: "Final Project",
    assessmentCriteria: ["AC1.1", "AC1.2", "AC2.1", "AC2.2", "AC3.1"],
    title: "Commercial Installation Project Report",
    description: "Complete project report documenting commercial installation from planning to completion.",
    evidenceType: "Document",
    fileName: "final-project-report.pdf",
    fileSize: 4500000,
    status: "Under Review",
    submittedAt: "2025-01-02",
    reviewedBy: "staff-1",
    reviewedByName: "Dr. Sarah Johnson",
    resubmissionCount: 0,
    createdAt: "2025-01-02"
  },
  {
    id: "evidence-7",
    portfolioId: "portfolio-3",
    studentId: "student-3",
    studentName: "Ryan O'Connor",
    unitId: "Unit 201",
    unitTitle: "Electrical Science",
    assessmentCriteria: ["AC1.1"],
    title: "Power Factor Calculation Video Walkthrough",
    description: "Video recording explaining power factor calculations with practical examples.",
    evidenceType: "Video",
    linkUrl: "https://college-storage.example.com/videos/pf-calc-ryan.mp4",
    status: "Rejected",
    submittedAt: "2024-12-10",
    reviewedBy: "staff-1",
    reviewedByName: "Dr. Sarah Johnson",
    reviewedAt: "2024-12-12",
    reviewFeedback: "Good attempt but some calculation errors at 3:45. Please re-record with corrections.",
    resubmissionCount: 1,
    createdAt: "2024-12-10"
  }
];

export const mockComments: CollegeComment[] = [
  {
    id: "comment-1",
    contextType: "evidence",
    contextId: "evidence-3",
    authorId: "staff-1",
    authorName: "Dr. Sarah Johnson",
    authorRole: "tutor",
    authorInitials: "SJ",
    content: "Good work overall. Please add more detail on the derating factors used in section 3.",
    mentions: [],
    requiresAction: true,
    actionOwner: "student-1",
    isResolved: false,
    createdAt: "2025-01-04T10:30:00Z"
  },
  {
    id: "comment-2",
    contextType: "evidence",
    contextId: "evidence-6",
    authorId: "staff-4",
    authorName: "David Chen",
    authorRole: "head_of_department",
    authorInitials: "DC",
    content: "@Emma Thompson - can you IQA sample this one? It's close to EPA gateway.",
    mentions: ["staff-3"],
    requiresAction: true,
    actionOwner: "staff-3",
    isResolved: false,
    createdAt: "2025-01-05T14:20:00Z"
  },
  {
    id: "comment-3",
    contextType: "portfolio",
    contextId: "portfolio-4",
    authorId: "staff-3",
    authorName: "Emma Thompson",
    authorRole: "assessor",
    authorInitials: "ET",
    content: "Portfolio nearly complete. Recommend for gateway review once Unit 306 evidence is approved.",
    mentions: [],
    requiresAction: false,
    isResolved: false,
    createdAt: "2025-01-06T09:15:00Z"
  },
  {
    id: "comment-4",
    contextType: "assessment",
    contextId: "assess-1",
    authorId: "staff-1",
    authorName: "Dr. Sarah Johnson",
    authorRole: "tutor",
    authorInitials: "SJ",
    content: "Assessment criteria PB1-PB3 well evidenced. Need to see more detail on cable calculations for WS2.",
    mentions: [],
    requiresAction: false,
    isResolved: false,
    createdAt: "2025-01-04T14:30:00Z"
  },
  {
    id: "comment-5",
    contextType: "evidence",
    contextId: "evidence-3",
    parentId: "comment-1",
    authorId: "student-1",
    authorName: "James Mitchell",
    authorRole: "student",
    authorInitials: "JM",
    content: "Thanks for the feedback. I've added the derating factor calculations to section 3. Can you please review?",
    mentions: ["staff-1"],
    requiresAction: true,
    actionOwner: "staff-1",
    isResolved: false,
    createdAt: "2025-01-05T09:00:00Z"
  },
  {
    id: "comment-6",
    contextType: "assessment",
    contextId: "assess-2",
    authorId: "staff-2",
    authorName: "Mark Williams",
    authorRole: "tutor",
    authorInitials: "MW",
    content: "@Emma Thompson - can you second mark this one? Strong candidate for distinction.",
    mentions: ["staff-3"],
    requiresAction: true,
    actionOwner: "staff-3",
    isResolved: false,
    createdAt: "2025-01-06T11:20:00Z"
  },
  {
    id: "comment-7",
    contextType: "ilp",
    contextId: "ilp-1",
    authorId: "staff-1",
    authorName: "Dr. Sarah Johnson",
    authorRole: "tutor",
    authorInitials: "SJ",
    content: "Review meeting scheduled for next week. Please prepare your evidence portfolio for discussion.",
    mentions: [],
    requiresAction: false,
    isResolved: false,
    createdAt: "2025-01-06T16:45:00Z"
  }
];

export const mockWorkAssignments: WorkAssignment[] = [
  {
    id: "work-1",
    itemType: "evidence",
    itemId: "evidence-3",
    itemTitle: "Cable Selection Assignment",
    studentName: "James Mitchell",
    assignedTo: "staff-1",
    assignedToName: "Dr. Sarah Johnson",
    assignedBy: "staff-1",
    assignedByName: "Dr. Sarah Johnson",
    roleRequired: "tutor",
    priority: "Normal",
    status: "In Progress",
    dueDate: "2025-01-10",
    createdAt: "2025-01-03"
  },
  {
    id: "work-2",
    itemType: "evidence",
    itemId: "evidence-6",
    itemTitle: "Commercial Installation Project Report",
    studentName: "Nathan Hughes",
    assignedTo: "staff-3",
    assignedToName: "Emma Thompson",
    assignedBy: "staff-4",
    assignedByName: "David Chen",
    roleRequired: "iqa",
    priority: "High",
    status: "Pending",
    dueDate: "2025-01-08",
    notes: "Priority IQA sampling required - student approaching EPA gateway",
    createdAt: "2025-01-05"
  },
  {
    id: "work-3",
    itemType: "portfolio",
    itemId: "portfolio-4",
    itemTitle: "Nathan Hughes - Level 3 Portfolio",
    studentName: "Nathan Hughes",
    assignedTo: "staff-4",
    assignedToName: "David Chen",
    assignedBy: "staff-1",
    assignedByName: "Dr. Sarah Johnson",
    roleRequired: "assessor",
    priority: "Urgent",
    status: "Pending",
    dueDate: "2025-01-07",
    notes: "Final portfolio sign-off required for EPA gateway",
    createdAt: "2025-01-06"
  },
  {
    id: "work-4",
    itemType: "evidence",
    itemId: "evidence-5",
    itemTitle: "Workplace Observation - Ring Main Installation",
    studentName: "Sophie Brown",
    assignedTo: "staff-1",
    assignedToName: "Dr. Sarah Johnson",
    assignedBy: "staff-1",
    assignedByName: "Dr. Sarah Johnson",
    roleRequired: "tutor",
    priority: "Normal",
    status: "Pending",
    createdAt: "2025-01-04"
  }
];

// Aggregate metrics for dashboard
export const collegeMetrics = {
  activeStudents: mockStudents.filter(s => s.status === 'Active').length,
  activeTutors: mockStaff.filter(s => s.role === 'tutor' && s.status === 'Active').length,
  totalStaff: mockStaff.filter(s => s.status === 'Active').length,
  activeCohorts: mockCohorts.filter(c => c.status === 'Active').length,
  coursesOffered: mockCourses.filter(c => c.status === 'Active').length,
  pendingAssessments: mockAssessments.filter(a => a.status === 'Pending').length,
  overdueILPReviews: mockILPs.filter(ilp => new Date(ilp.nextReviewDate) < new Date()).length,
  studentsAtGateway: mockEPARecords.filter(e => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready').length,
  overallAttendanceRate: 94,
  averageProgress: 72,
  teachingResourcesCount: mockTeachingResources.length,
  upcomingLessons: mockLessonPlans.filter(lp => new Date(lp.scheduledDate) >= new Date()).length
};
