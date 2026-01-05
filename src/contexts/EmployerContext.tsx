import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  employees as initialEmployees, 
  certifications as initialCertifications, 
  timesheets as initialTimesheets,
  jobVacancies as initialVacancies,
  vacancyApplications as initialApplications,
  labourBankRates as initialLabourBankRates,
  holidayAllowances as initialHolidayAllowances,
  leaveRequests as initialLeaveRequests,
  jobs,
  type TeamRole,
  type LeaveType,
  type LeaveStatus,
  type HolidayAllowance,
  type LeaveRequest
} from '@/data/employerMockData';

// Types
export type AvailabilityStatus = 'Available' | 'On Job' | 'On Leave' | 'Unavailable';

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface WorkerNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  type: 'General' | 'Performance' | 'Incident' | 'Positive';
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  teamRole: TeamRole;
  status: string;
  certifications: number;
  activeJobs: number;
  phone: string;
  email: string;
  joinDate: string;
  permissions: string[];
  completedDocuments: string[];
  avatar: string;
  photo?: string;
  // New fields for best-in-class team management
  availability: AvailabilityStatus;
  skills: string[];
  emergencyContact?: EmergencyContact;
  dayRate?: number;
  hourlyRate?: number;
  rating: number;
  notes: WorkerNote[];
}

export interface Certification {
  id: string;
  name: string;
  employee: string;
  employeeId: string;
  expiryDate: string;
  status: string;
  daysRemaining: number;
  issuer: string;
  certNumber: string;
}

export interface TimesheetEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakMins: number;
  totalHours: number;
  status: string;
}

export interface JobVacancy {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  salary: { min: number; max: number; period: string };
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  closingDate: string;
  views: number;
}

export interface VacancyApplication {
  id: string;
  vacancyId: string;
  electricianId?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  ecsCardType?: string;
  yearsExperience?: number;
  currentLocation?: string;
  noticePeriod?: string;
  expectedSalary?: number;
  appliedDate: string;
  status: string;
  notes?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewType?: 'In-person' | 'Phone' | 'Video';
  interviewLocation?: string;
  rating?: number;
}

export interface ClockInState {
  isClockedIn: boolean;
  clockInTime: Date | null;
  selectedJobId: string | null;
  selectedJobTitle: string | null;
}

export interface LabourBankMember {
  id: string;
  electricianId: string;
  electricianName: string;
  agreedDayRate: number;
  agreedHourlyRate: number;
  totalDaysWorked: number;
  available: boolean;
  notes?: string;
}

export type BookingDuration = '1 day' | '2-3 days' | '1 week' | '2 weeks' | 'Ongoing' | 'Custom';
export type ShiftPattern = 'Day (7am-4pm)' | 'Late (10am-7pm)' | 'Night (6pm-6am)' | 'Custom';
export type UrgencyPremium = 'none' | '10%' | '20%' | '25%' | '50%';

export interface TalentBooking {
  id: string;
  electricianId: string;
  electricianName: string;
  jobId?: string;
  jobTitle?: string;
  startDate: string;
  endDate?: string;
  duration: BookingDuration;
  shiftPattern: ShiftPattern;
  urgencyPremium: UrgencyPremium;
  baseRate: number;
  totalCost: number;
  estimatedDays: number;
  siteAddress?: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface JobAssignment {
  id: string;
  employeeId: string;
  jobId: string;
  jobTitle: string;
  jobLocation: string;
  startDate: string;
  notes?: string;
  status: 'Active' | 'Completed' | 'Removed';
}

export interface Message {
  id: string;
  toEmployeeId: string;
  toEmployeeName: string;
  messageType: string;
  subject?: string;
  message: string;
  relatedJobId?: string;
  sentAt: string;
  status: 'Sent' | 'Read';
}

export interface AssignedDocument {
  id: string;
  employeeId: string;
  documentType: string;
  documentName: string;
  dueDate: string;
  assignedAt: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  completedAt?: string;
}

interface EmployerContextType {
  // Data
  employees: Employee[];
  certifications: Certification[];
  timesheets: TimesheetEntry[];
  vacancies: JobVacancy[];
  applications: VacancyApplication[];
  clockInState: ClockInState;
  savedCandidates: string[];
  labourBank: LabourBankMember[];
  bookings: TalentBooking[];
  jobAssignments: JobAssignment[];
  messages: Message[];
  assignedDocuments: AssignedDocument[];
  selectedEmployeeIds: string[];
  holidayAllowances: HolidayAllowance[];
  leaveRequests: LeaveRequest[];
  
  // Employee Actions
  addEmployee: (employee: Omit<Employee, 'id' | 'avatar' | 'certifications' | 'activeJobs' | 'completedDocuments' | 'availability' | 'skills' | 'rating' | 'notes'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  setEmployeeAvailability: (id: string, availability: AvailabilityStatus) => void;
  addWorkerNote: (employeeId: string, content: string, type: WorkerNote['type'], authorName: string) => void;
  setEmployeeRating: (id: string, rating: number) => void;
  updateEmergencyContact: (id: string, contact: EmergencyContact) => void;
  updatePayRates: (id: string, dayRate: number, hourlyRate: number) => void;
  
  // Multi-select Actions
  toggleEmployeeSelection: (id: string) => void;
  selectAllEmployees: () => void;
  clearEmployeeSelection: () => void;
  bulkAssignToJob: (jobId: string, jobTitle: string, jobLocation: string, startDate: string) => void;
  
  // Certification Actions
  addCertification: (certification: Omit<Certification, 'id' | 'daysRemaining'>) => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  
  // Timesheet Actions
  clockIn: (jobId: string, jobTitle: string) => void;
  clockOut: () => TimesheetEntry | null;
  addManualTimeEntry: (entry: Omit<TimesheetEntry, 'id'>) => void;
  approveTimesheet: (id: string) => void;
  rejectTimesheet: (id: string) => void;
  
  // Leave/Holiday Actions
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'createdAt'>) => void;
  approveLeaveRequest: (id: string, approvedBy: string) => void;
  rejectLeaveRequest: (id: string, reason?: string) => void;
  cancelLeaveRequest: (id: string) => void;
  getEmployeeAllowance: (employeeId: string) => HolidayAllowance | undefined;
  
  // Vacancy Actions
  addVacancy: (vacancy: Omit<JobVacancy, 'id' | 'views' | 'postedDate'>) => void;
  updateVacancy: (id: string, updates: Partial<JobVacancy>) => void;
  closeVacancy: (id: string) => void;
  
  // Application Actions
  updateApplicationStatus: (id: string, status: string) => void;
  
  // Job Assignment Actions
  assignEmployeeToJob: (employeeId: string, jobId: string, jobTitle: string, jobLocation: string, startDate: string, notes?: string) => void;
  removeEmployeeFromJob: (assignmentId: string) => void;
  getEmployeeAssignments: (employeeId: string) => JobAssignment[];
  
  // Message Actions
  sendMessage: (toEmployeeId: string, toEmployeeName: string, messageType: string, message: string, subject?: string, relatedJobId?: string) => void;
  
  // Document Actions
  assignDocument: (employeeId: string, documentType: string, documentName: string, dueDate: string) => void;
  completeDocument: (documentId: string) => void;
  
  // Talent Pool Actions
  toggleSaveCandidate: (electricianId: string) => void;
  addToLabourBank: (electricianId: string, electricianName: string, dayRate: number, hourlyRate: number) => void;
  removeFromLabourBank: (electricianId: string) => void;
  createBooking: (booking: Omit<TalentBooking, 'id' | 'status'>) => void;
  updateBookingStatus: (bookingId: string, status: TalentBooking['status']) => void;
  
  // Labour cost calculations
  calculateJobLabourCost: (jobId: string) => { approvedHours: number; approvedCost: number; pendingHours: number; pendingCost: number };
  
  // Clock duration
  getClockDuration: () => string;
}

// Re-export types for use in components
export type { HolidayAllowance, LeaveRequest, LeaveType, LeaveStatus };

const EmployerContext = createContext<EmployerContextType | undefined>(undefined);

// Helper to enhance initial employees with new fields
const enhanceEmployees = (emps: typeof initialEmployees): Employee[] => {
  const skillsMap: Record<string, string[]> = {
    "1": ["18th Edition", "Testing & Inspection", "EV Charging", "Solar PV"],
    "2": ["18th Edition", "Solar PV", "Domestic"],
    "3": ["Basic Wiring"],
    "4": ["18th Edition", "Testing & Inspection", "EV Charging", "Solar PV", "Smart Home"],
    "5": ["18th Edition", "Smart Home", "First Aid"],
    "6": ["Project Management", "Commercial", "Design"],
  };

  const emergencyContacts: Record<string, EmergencyContact> = {
    "1": { name: "Helen Wilson", phone: "07700 111222", relationship: "Wife" },
    "2": { name: "John Mitchell", phone: "07700 222333", relationship: "Father" },
    "3": { name: "Mary Brown", phone: "07700 333444", relationship: "Mother" },
    "4": { name: "Robert Thompson", phone: "07700 444555", relationship: "Husband" },
    "5": { name: "Anna Chen", phone: "07700 555666", relationship: "Sister" },
    "6": { name: "David Parker", phone: "07700 666777", relationship: "Partner" },
  };

  const payRates: Record<string, { day: number; hourly: number }> = {
    "1": { day: 280, hourly: 35 },
    "2": { day: 220, hourly: 27.50 },
    "3": { day: 120, hourly: 15 },
    "4": { day: 300, hourly: 37.50 },
    "5": { day: 240, hourly: 30 },
    "6": { day: 350, hourly: 43.75 },
  };

  return emps.map(emp => ({
    ...emp,
    photo: (emp as typeof emp & { photo?: string }).photo,
    availability: (emp.status === 'On Leave' ? 'On Leave' : emp.activeJobs > 0 ? 'On Job' : 'Available') as AvailabilityStatus,
    skills: skillsMap[emp.id] || [],
    emergencyContact: emergencyContacts[emp.id],
    dayRate: payRates[emp.id]?.day,
    hourlyRate: payRates[emp.id]?.hourly,
    rating: emp.id === "1" ? 5 : emp.id === "4" ? 5 : emp.id === "3" ? 3 : 4,
    notes: [] as WorkerNote[],
  }));
};

export function EmployerProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(enhanceEmployees(initialEmployees));
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications as Certification[]);
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(initialTimesheets as TimesheetEntry[]);
  const [vacancies, setVacancies] = useState<JobVacancy[]>(initialVacancies as JobVacancy[]);
  const [applications, setApplications] = useState<VacancyApplication[]>(initialApplications as VacancyApplication[]);
  const [clockInState, setClockInState] = useState<ClockInState>({
    isClockedIn: false,
    clockInTime: null,
    selectedJobId: null,
    selectedJobTitle: null,
  });
  
  // Talent Pool State
  const [savedCandidates, setSavedCandidates] = useState<string[]>(["AE-002", "AE-004"]);
  const [labourBank, setLabourBank] = useState<LabourBankMember[]>(
    (initialLabourBankRates as any[]).map(r => ({
      id: r.id,
      electricianId: r.electricianId,
      electricianName: r.electricianName,
      agreedDayRate: r.agreedDayRate,
      agreedHourlyRate: r.agreedHourlyRate,
      totalDaysWorked: r.totalDaysWorked,
      available: r.available,
    }))
  );
  const [bookings, setBookings] = useState<TalentBooking[]>([]);
  
  // Holiday/Leave State
  const [holidayAllowances, setHolidayAllowances] = useState<HolidayAllowance[]>(initialHolidayAllowances);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  
  // New state for job assignments, messages, documents
  const [jobAssignments, setJobAssignments] = useState<JobAssignment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [assignedDocuments, setAssignedDocuments] = useState<AssignedDocument[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  // Generate unique IDs
  const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Employee Actions
  const addEmployee = useCallback((employee: Omit<Employee, 'id' | 'avatar' | 'certifications' | 'activeJobs' | 'completedDocuments' | 'availability' | 'skills' | 'rating' | 'notes'>) => {
    const initials = employee.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const newEmployee: Employee = {
      ...employee,
      id: generateId('EMP'),
      avatar: initials,
      certifications: 0,
      activeJobs: 0,
      completedDocuments: [],
      availability: 'Available',
      skills: [],
      rating: 0,
      notes: [],
    };
    setEmployees(prev => [...prev, newEmployee]);
  }, []);

  const updateEmployee = useCallback((id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, status: 'Archived' } : emp
    ));
  }, []);

  const setEmployeeAvailability = useCallback((id: string, availability: AvailabilityStatus) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, availability } : emp
    ));
  }, []);

  const addWorkerNote = useCallback((employeeId: string, content: string, type: WorkerNote['type'], authorName: string) => {
    const newNote: WorkerNote = {
      id: generateId('NOTE'),
      authorId: '1', // Current user
      authorName,
      content,
      createdAt: new Date().toISOString(),
      type,
    };
    setEmployees(prev => prev.map(emp =>
      emp.id === employeeId ? { ...emp, notes: [newNote, ...emp.notes] } : emp
    ));
  }, []);

  const setEmployeeRating = useCallback((id: string, rating: number) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, rating } : emp
    ));
  }, []);

  const updateEmergencyContact = useCallback((id: string, contact: EmergencyContact) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, emergencyContact: contact } : emp
    ));
  }, []);

  const updatePayRates = useCallback((id: string, dayRate: number, hourlyRate: number) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === id ? { ...emp, dayRate, hourlyRate } : emp
    ));
  }, []);

  // Multi-select Actions
  const toggleEmployeeSelection = useCallback((id: string) => {
    setSelectedEmployeeIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  }, []);

  const selectAllEmployees = useCallback(() => {
    setSelectedEmployeeIds(employees.filter(e => e.status !== 'Archived').map(e => e.id));
  }, [employees]);

  const clearEmployeeSelection = useCallback(() => {
    setSelectedEmployeeIds([]);
  }, []);

  const bulkAssignToJob = useCallback((jobId: string, jobTitle: string, jobLocation: string, startDate: string) => {
    selectedEmployeeIds.forEach(employeeId => {
      const newAssignment: JobAssignment = {
        id: generateId('JA'),
        employeeId,
        jobId,
        jobTitle,
        jobLocation,
        startDate,
        status: 'Active',
      };
      setJobAssignments(prev => [...prev, newAssignment]);
      setEmployees(prev => prev.map(emp =>
        emp.id === employeeId ? { ...emp, activeJobs: emp.activeJobs + 1, availability: 'On Job' } : emp
      ));
    });
    setSelectedEmployeeIds([]);
  }, []);

  // Certification Actions
  const addCertification = useCallback((certification: Omit<Certification, 'id' | 'daysRemaining'>) => {
    const expiryDate = new Date(certification.expiryDate);
    const today = new Date();
    const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const newCert: Certification = {
      ...certification,
      id: generateId('CERT'),
      daysRemaining,
      status: daysRemaining < 0 ? 'Expired' : daysRemaining < 60 ? 'Warning' : 'Active',
    };
    setCertifications(prev => [...prev, newCert]);
    
    // Update employee cert count
    setEmployees(prev => prev.map(emp =>
      emp.id === certification.employeeId ? { ...emp, certifications: emp.certifications + 1 } : emp
    ));
  }, []);

  const updateCertification = useCallback((id: string, updates: Partial<Certification>) => {
    setCertifications(prev => prev.map(cert => {
      if (cert.id === id) {
        const updated = { ...cert, ...updates };
        if (updates.expiryDate) {
          const expiryDate = new Date(updates.expiryDate);
          const today = new Date();
          updated.daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          updated.status = updated.daysRemaining < 0 ? 'Expired' : updated.daysRemaining < 60 ? 'Warning' : 'Active';
        }
        return updated;
      }
      return cert;
    }));
  }, []);

  // Timesheet Actions
  const clockIn = useCallback((jobId: string, jobTitle: string) => {
    setClockInState({
      isClockedIn: true,
      clockInTime: new Date(),
      selectedJobId: jobId,
      selectedJobTitle: jobTitle,
    });
  }, []);

  const clockOut = useCallback(() => {
    if (!clockInState.isClockedIn || !clockInState.clockInTime) return null;

    const clockOutTime = new Date();
    const clockInTime = clockInState.clockInTime;
    const totalMinutes = Math.floor((clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60));
    const breakMins = totalMinutes > 360 ? 60 : totalMinutes > 240 ? 30 : 0; // Auto-deduct breaks
    const totalHours = Math.round(((totalMinutes - breakMins) / 60) * 100) / 100;

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const newEntry: TimesheetEntry = {
      id: generateId('TS'),
      employeeId: '1', // Current user - would come from auth
      employeeName: 'Current User',
      jobId: clockInState.selectedJobId || '',
      jobTitle: clockInState.selectedJobTitle || '',
      date: clockInTime.toISOString().split('T')[0],
      clockIn: formatTime(clockInTime),
      clockOut: formatTime(clockOutTime),
      breakMins,
      totalHours,
      status: 'Pending',
    };

    setTimesheets(prev => [newEntry, ...prev]);
    setClockInState({
      isClockedIn: false,
      clockInTime: null,
      selectedJobId: null,
      selectedJobTitle: null,
    });

    return newEntry;
  }, [clockInState]);

  const addManualTimeEntry = useCallback((entry: Omit<TimesheetEntry, 'id'>) => {
    const newEntry: TimesheetEntry = {
      ...entry,
      id: generateId('TS'),
    };
    setTimesheets(prev => [newEntry, ...prev]);
  }, []);

  const approveTimesheet = useCallback((id: string) => {
    setTimesheets(prev => prev.map(ts =>
      ts.id === id ? { ...ts, status: 'Approved' } : ts
    ));
  }, []);

  const rejectTimesheet = useCallback((id: string) => {
    setTimesheets(prev => prev.map(ts =>
      ts.id === id ? { ...ts, status: 'Rejected' } : ts
    ));
  }, []);

  // Leave/Holiday Actions
  const addLeaveRequest = useCallback((request: Omit<LeaveRequest, 'id' | 'createdAt'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: generateId('LR'),
      createdAt: new Date().toISOString(),
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
    // Update pending days in allowance
    setHolidayAllowances(prev => prev.map(ha =>
      ha.employeeId === request.employeeId
        ? { ...ha, pendingDays: ha.pendingDays + request.totalDays }
        : ha
    ));
  }, []);

  const approveLeaveRequest = useCallback((id: string, approvedBy: string) => {
    setLeaveRequests(prev => prev.map(lr => {
      if (lr.id === id && lr.status === 'pending') {
        // Update allowance - move from pending to used
        setHolidayAllowances(ha => ha.map(a =>
          a.employeeId === lr.employeeId
            ? { ...a, usedDays: a.usedDays + lr.totalDays, pendingDays: Math.max(0, a.pendingDays - lr.totalDays) }
            : a
        ));
        return { ...lr, status: 'approved' as const, approvedBy, approvedDate: new Date().toISOString() };
      }
      return lr;
    }));
  }, []);

  const rejectLeaveRequest = useCallback((id: string, reason?: string) => {
    setLeaveRequests(prev => prev.map(lr => {
      if (lr.id === id && lr.status === 'pending') {
        // Remove pending days from allowance
        setHolidayAllowances(ha => ha.map(a =>
          a.employeeId === lr.employeeId
            ? { ...a, pendingDays: Math.max(0, a.pendingDays - lr.totalDays) }
            : a
        ));
        return { ...lr, status: 'rejected' as const, rejectedReason: reason };
      }
      return lr;
    }));
  }, []);

  const cancelLeaveRequest = useCallback((id: string) => {
    setLeaveRequests(prev => prev.map(lr => {
      if (lr.id === id) {
        // Restore days to allowance if was approved
        if (lr.status === 'approved') {
          setHolidayAllowances(ha => ha.map(a =>
            a.employeeId === lr.employeeId
              ? { ...a, usedDays: Math.max(0, a.usedDays - lr.totalDays) }
              : a
          ));
        } else if (lr.status === 'pending') {
          setHolidayAllowances(ha => ha.map(a =>
            a.employeeId === lr.employeeId
              ? { ...a, pendingDays: Math.max(0, a.pendingDays - lr.totalDays) }
              : a
          ));
        }
        return { ...lr, status: 'cancelled' as const };
      }
      return lr;
    }));
  }, []);

  const getEmployeeAllowance = useCallback((employeeId: string) => {
    return holidayAllowances.find(ha => ha.employeeId === employeeId);
  }, [holidayAllowances]);

  // Calculate job labour cost from timesheets
  const calculateJobLabourCost = useCallback((jobId: string) => {
    const jobTimesheets = timesheets.filter(ts => ts.jobId === jobId);
    const getHourlyRate = (empId: string) => employees.find(e => e.id === empId)?.hourlyRate || 25;

    const approved = jobTimesheets.filter(ts => ts.status === 'Approved');
    const pending = jobTimesheets.filter(ts => ts.status === 'Pending');

    return {
      approvedHours: approved.reduce((sum, ts) => sum + ts.totalHours, 0),
      approvedCost: approved.reduce((sum, ts) => sum + (ts.totalHours * getHourlyRate(ts.employeeId)), 0),
      pendingHours: pending.reduce((sum, ts) => sum + ts.totalHours, 0),
      pendingCost: pending.reduce((sum, ts) => sum + (ts.totalHours * getHourlyRate(ts.employeeId)), 0),
    };
  }, [timesheets, employees]);

  // Vacancy Actions
  const addVacancy = useCallback((vacancy: Omit<JobVacancy, 'id' | 'views' | 'postedDate'>) => {
    const newVacancy: JobVacancy = {
      ...vacancy,
      id: generateId('VAC'),
      views: 0,
      postedDate: new Date().toISOString().split('T')[0],
    };
    setVacancies(prev => [newVacancy, ...prev]);
  }, []);

  const updateVacancy = useCallback((id: string, updates: Partial<JobVacancy>) => {
    setVacancies(prev => prev.map(vac =>
      vac.id === id ? { ...vac, ...updates } : vac
    ));
  }, []);

  const closeVacancy = useCallback((id: string) => {
    setVacancies(prev => prev.map(vac =>
      vac.id === id ? { ...vac, status: 'Closed' } : vac
    ));
  }, []);

  // Application Actions
  const updateApplicationStatus = useCallback((id: string, status: string) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status } : app
    ));
  }, []);

  // Get clock duration
  const getClockDuration = useCallback(() => {
    if (!clockInState.isClockedIn || !clockInState.clockInTime) return '00:00:00';
    
    const now = new Date();
    const diff = now.getTime() - clockInState.clockInTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [clockInState]);

  // Talent Pool Actions
  const toggleSaveCandidate = useCallback((electricianId: string) => {
    setSavedCandidates(prev => 
      prev.includes(electricianId) 
        ? prev.filter(id => id !== electricianId)
        : [...prev, electricianId]
    );
  }, []);

  const addToLabourBank = useCallback((electricianId: string, electricianName: string, dayRate: number, hourlyRate: number) => {
    // Check if already in labour bank
    if (labourBank.some(m => m.electricianId === electricianId)) {
      return;
    }
    
    const newMember: LabourBankMember = {
      id: generateId('LB'),
      electricianId,
      electricianName,
      agreedDayRate: dayRate,
      agreedHourlyRate: hourlyRate,
      totalDaysWorked: 0,
      available: true,
    };
    setLabourBank(prev => [...prev, newMember]);
  }, [labourBank]);

  const removeFromLabourBank = useCallback((electricianId: string) => {
    setLabourBank(prev => prev.filter(m => m.electricianId !== electricianId));
  }, []);

  const createBooking = useCallback((booking: Omit<TalentBooking, 'id' | 'status'>) => {
    const newBooking: TalentBooking = {
      ...booking,
      id: generateId('BK'),
      status: 'Pending',
    };
    setBookings(prev => [...prev, newBooking]);
  }, []);

  const updateBookingStatus = useCallback((bookingId: string, status: TalentBooking['status']) => {
    setBookings(prev => prev.map(b =>
      b.id === bookingId ? { ...b, status } : b
    ));
  }, []);

  // Job Assignment Actions
  const assignEmployeeToJob = useCallback((
    employeeId: string, 
    jobId: string, 
    jobTitle: string, 
    jobLocation: string, 
    startDate: string, 
    notes?: string
  ) => {
    const newAssignment: JobAssignment = {
      id: generateId('JA'),
      employeeId,
      jobId,
      jobTitle,
      jobLocation,
      startDate,
      notes,
      status: 'Active',
    };
    setJobAssignments(prev => [...prev, newAssignment]);
    
    // Update employee's active jobs count
    setEmployees(prev => prev.map(emp =>
      emp.id === employeeId ? { ...emp, activeJobs: emp.activeJobs + 1 } : emp
    ));
  }, []);

  const removeEmployeeFromJob = useCallback((assignmentId: string) => {
    setJobAssignments(prev => {
      const assignment = prev.find(a => a.id === assignmentId);
      if (assignment) {
        // Update employee's active jobs count
        setEmployees(empPrev => empPrev.map(emp =>
          emp.id === assignment.employeeId 
            ? { ...emp, activeJobs: Math.max(0, emp.activeJobs - 1) } 
            : emp
        ));
      }
      return prev.map(a => 
        a.id === assignmentId ? { ...a, status: 'Removed' as const } : a
      );
    });
  }, []);

  const getEmployeeAssignments = useCallback((employeeId: string) => {
    return jobAssignments.filter(a => a.employeeId === employeeId && a.status === 'Active');
  }, [jobAssignments]);

  // Message Actions
  const sendMessage = useCallback((
    toEmployeeId: string,
    toEmployeeName: string,
    messageType: string,
    message: string,
    subject?: string,
    relatedJobId?: string
  ) => {
    const newMessage: Message = {
      id: generateId('MSG'),
      toEmployeeId,
      toEmployeeName,
      messageType,
      subject,
      message,
      relatedJobId,
      sentAt: new Date().toISOString(),
      status: 'Sent',
    };
    setMessages(prev => [newMessage, ...prev]);
  }, []);

  // Document Actions
  const assignDocument = useCallback((
    employeeId: string,
    documentType: string,
    documentName: string,
    dueDate: string
  ) => {
    const newDoc: AssignedDocument = {
      id: generateId('DOC'),
      employeeId,
      documentType,
      documentName,
      dueDate,
      assignedAt: new Date().toISOString(),
      status: 'Pending',
    };
    setAssignedDocuments(prev => [...prev, newDoc]);
  }, []);

  const completeDocument = useCallback((documentId: string) => {
    setAssignedDocuments(prev => prev.map(doc =>
      doc.id === documentId 
        ? { ...doc, status: 'Completed' as const, completedAt: new Date().toISOString() } 
        : doc
    ));
  }, []);

  const value: EmployerContextType = {
    employees,
    certifications,
    timesheets,
    vacancies,
    applications,
    clockInState,
    savedCandidates,
    labourBank,
    bookings,
    jobAssignments,
    messages,
    assignedDocuments,
    selectedEmployeeIds,
    holidayAllowances,
    leaveRequests,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setEmployeeAvailability,
    addWorkerNote,
    setEmployeeRating,
    updateEmergencyContact,
    updatePayRates,
    toggleEmployeeSelection,
    selectAllEmployees,
    clearEmployeeSelection,
    bulkAssignToJob,
    addCertification,
    updateCertification,
    clockIn,
    clockOut,
    addManualTimeEntry,
    approveTimesheet,
    rejectTimesheet,
    addLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    cancelLeaveRequest,
    getEmployeeAllowance,
    addVacancy,
    updateVacancy,
    closeVacancy,
    updateApplicationStatus,
    assignEmployeeToJob,
    removeEmployeeFromJob,
    getEmployeeAssignments,
    sendMessage,
    assignDocument,
    completeDocument,
    toggleSaveCandidate,
    addToLabourBank,
    removeFromLabourBank,
    createBooking,
    updateBookingStatus,
    calculateJobLabourCost,
    getClockDuration,
  };

  return (
    <EmployerContext.Provider value={value}>
      {children}
    </EmployerContext.Provider>
  );
}

export function useEmployer() {
  const context = useContext(EmployerContext);
  if (context === undefined) {
    throw new Error('useEmployer must be used within an EmployerProvider');
  }
  return context;
}
