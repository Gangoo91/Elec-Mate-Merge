// Mock data for Elec-Mate Employer Dashboard

export type TeamRole = "QS" | "Supervisor" | "Operative" | "Apprentice" | "Project Manager";

export const employees = [
  { 
    id: "1", 
    name: "James Wilson", 
    role: "Senior Electrician", 
    teamRole: "Supervisor" as TeamRole,
    status: "Active", 
    certifications: 8, 
    activeJobs: 2, 
    phone: "07700 900123", 
    email: "james.wilson@example.com", 
    joinDate: "2021-03-15",
    permissions: ["view_jobs", "edit_jobs", "view_team", "approve_rams", "sign_off"],
    completedDocuments: ["RAMS-001", "RAMS-002", "MS-001", "TBT-001", "TBT-002"],
    avatar: "JW",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: "2", 
    name: "Sarah Mitchell", 
    role: "Electrician", 
    teamRole: "Operative" as TeamRole,
    status: "Active", 
    certifications: 6, 
    activeJobs: 1, 
    phone: "07700 900124", 
    email: "sarah.mitchell@example.com", 
    joinDate: "2022-06-20",
    permissions: ["view_jobs", "view_team"],
    completedDocuments: ["RAMS-001", "TBT-001"],
    avatar: "SM",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: "3", 
    name: "David Brown", 
    role: "Apprentice", 
    teamRole: "Apprentice" as TeamRole,
    status: "Active", 
    certifications: 2, 
    activeJobs: 1, 
    phone: "07700 900125", 
    email: "david.brown@example.com", 
    joinDate: "2023-09-01",
    permissions: ["view_jobs"],
    completedDocuments: ["TBT-001"],
    avatar: "DB",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: "4", 
    name: "Emma Thompson", 
    role: "Senior Electrician", 
    teamRole: "Supervisor" as TeamRole,
    status: "On Leave", 
    certifications: 10, 
    activeJobs: 0, 
    phone: "07700 900126", 
    email: "emma.thompson@example.com", 
    joinDate: "2019-11-10",
    permissions: ["view_jobs", "edit_jobs", "view_team", "approve_rams", "sign_off"],
    completedDocuments: ["RAMS-001", "RAMS-002", "RAMS-003", "MS-001", "MS-002", "TBT-001", "TBT-002"],
    avatar: "ET",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: "5", 
    name: "Michael Chen", 
    role: "Electrician", 
    teamRole: "Operative" as TeamRole,
    status: "Active", 
    certifications: 5, 
    activeJobs: 3, 
    phone: "07700 900127", 
    email: "michael.chen@example.com", 
    joinDate: "2022-01-08",
    permissions: ["view_jobs", "view_team"],
    completedDocuments: ["RAMS-002", "TBT-001", "TBT-002"],
    avatar: "MC",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  { 
    id: "6", 
    name: "Lisa Parker", 
    role: "Project Manager", 
    teamRole: "QS" as TeamRole,
    status: "Active", 
    certifications: 4, 
    activeJobs: 5, 
    phone: "07700 900128", 
    email: "lisa.parker@example.com", 
    joinDate: "2020-07-22",
    permissions: ["view_jobs", "edit_jobs", "view_team", "edit_team", "approve_rams", "sign_off", "manage_finances"],
    completedDocuments: ["RAMS-001", "RAMS-002", "RAMS-003", "MS-001", "TBT-001"],
    avatar: "LP",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face"
  },
];

export const jobs = [
  { id: "1", title: "Commercial Rewiring", client: "Tesco Express", location: "Manchester, M1 4BD", status: "Active", progress: 65, startDate: "2024-01-15", endDate: "2024-02-28", assignedWorkers: 3, totalWorkers: 4, value: 45000 },
  { id: "2", title: "New Build Installation", client: "Barratt Homes", location: "Leeds, LS1 5QS", status: "Active", progress: 30, startDate: "2024-02-01", endDate: "2024-04-30", assignedWorkers: 5, totalWorkers: 5, value: 120000 },
  { id: "3", title: "Office Lighting Upgrade", client: "WeWork", location: "Birmingham, B1 1RS", status: "Pending", progress: 0, startDate: "2024-03-01", endDate: "2024-03-15", assignedWorkers: 0, totalWorkers: 2, value: 15000 },
  { id: "4", title: "EV Charging Points", client: "NCP Car Parks", location: "Liverpool, L1 8JQ", status: "Completed", progress: 100, startDate: "2024-01-01", endDate: "2024-01-20", assignedWorkers: 2, totalWorkers: 2, value: 28000 },
  { id: "5", title: "Factory Maintenance", client: "JCB Ltd", location: "Stoke-on-Trent, ST4 2RU", status: "Active", progress: 80, startDate: "2024-01-20", endDate: "2024-02-10", assignedWorkers: 4, totalWorkers: 4, value: 35000 },
];

export const certifications = [
  { id: "1", name: "18th Edition Wiring Regulations", employee: "James Wilson", employeeId: "1", expiryDate: "2025-06-15", status: "Active", daysRemaining: 500, issuer: "City & Guilds", certNumber: "CG-18ED-2021-001" },
  { id: "2", name: "ECS Gold Card", employee: "Sarah Mitchell", employeeId: "2", expiryDate: "2024-04-20", status: "Warning", daysRemaining: 45, issuer: "JIB", certNumber: "ECS-GC-2022-456" },
  { id: "3", name: "Part P Certification", employee: "David Brown", employeeId: "3", expiryDate: "2024-03-01", status: "Expired", daysRemaining: -15, issuer: "NICEIC", certNumber: "PP-2023-789" },
  { id: "4", name: "IPAF Licence", employee: "Emma Thompson", employeeId: "4", expiryDate: "2024-12-31", status: "Active", daysRemaining: 300, issuer: "IPAF", certNumber: "IPAF-2022-321" },
  { id: "5", name: "First Aid at Work", employee: "Michael Chen", employeeId: "5", expiryDate: "2024-08-10", status: "Active", daysRemaining: 180, issuer: "St John Ambulance", certNumber: "FA-2023-654" },
  { id: "6", name: "Asbestos Awareness", employee: "Lisa Parker", employeeId: "6", expiryDate: "2024-05-05", status: "Warning", daysRemaining: 60, issuer: "UKATA", certNumber: "AA-2023-987" },
  { id: "7", name: "18th Edition Wiring Regulations", employee: "Emma Thompson", employeeId: "4", expiryDate: "2026-01-15", status: "Active", daysRemaining: 700, issuer: "City & Guilds", certNumber: "CG-18ED-2020-002" },
  { id: "8", name: "ECS Gold Card", employee: "James Wilson", employeeId: "1", expiryDate: "2025-09-20", status: "Active", daysRemaining: 580, issuer: "JIB", certNumber: "ECS-GC-2021-123" },
];

export const training = [
  { id: "1", name: "EV Charging Installation", type: "Course", employees: 4, completedBy: 2, dueDate: "2024-03-15", status: "In Progress" },
  { id: "2", name: "Solar PV Systems", type: "Course", employees: 6, completedBy: 6, dueDate: "2024-01-30", status: "Completed" },
  { id: "3", name: "Fire Alarm Systems", type: "Workshop", employees: 3, completedBy: 0, dueDate: "2024-04-20", status: "Pending" },
  { id: "4", name: "Smart Home Integration", type: "Online", employees: 5, completedBy: 3, dueDate: "2024-02-28", status: "In Progress" },
];

export const safetyIncidents = [
  { id: "1", type: "Near Miss", description: "Loose cable near walkway", location: "Tesco Express, Manchester", date: "2024-02-10", reportedBy: "James Wilson", status: "Resolved" },
  { id: "2", type: "Minor Injury", description: "Small cut while stripping wire", location: "Barratt Homes, Leeds", date: "2024-02-08", reportedBy: "David Brown", status: "Resolved" },
  { id: "3", type: "Equipment Failure", description: "Drill overheating", location: "WeWork, Birmingham", date: "2024-02-05", reportedBy: "Sarah Mitchell", status: "Under Review" },
];

export const rams = [
  { id: "1", project: "Commercial Rewiring", version: "2.1", lastUpdated: "2024-02-01", status: "Approved", reviewDate: "2024-03-01" },
  { id: "2", project: "New Build Installation", version: "1.0", lastUpdated: "2024-01-28", status: "Pending Review", reviewDate: "2024-02-15" },
  { id: "3", project: "Office Lighting Upgrade", version: "1.2", lastUpdated: "2024-02-12", status: "Approved", reviewDate: "2024-04-01" },
];

export const quotes = [
  { id: "Q-2024-001", client: "Costa Coffee", description: "New store electrical fit-out", value: 32000, status: "Sent", sentDate: "2024-02-10", validUntil: "2024-03-10" },
  { id: "Q-2024-002", client: "Pure Gym", description: "Emergency lighting upgrade", value: 18500, status: "Approved", sentDate: "2024-02-05", validUntil: "2024-03-05" },
  { id: "Q-2024-003", client: "Holiday Inn", description: "Full rewire - 3 floors", value: 95000, status: "Draft", sentDate: null, validUntil: null },
  { id: "Q-2024-004", client: "Greggs", description: "Kitchen electrical installation", value: 8500, status: "Rejected", sentDate: "2024-01-20", validUntil: "2024-02-20" },
];

export const invoices = [
  { id: "INV-2024-001", client: "Tesco Express", project: "Commercial Rewiring", amount: 22500, status: "Paid", dueDate: "2024-02-15", paidDate: "2024-02-12" },
  { id: "INV-2024-002", client: "NCP Car Parks", project: "EV Charging Points", amount: 28000, status: "Paid", dueDate: "2024-01-25", paidDate: "2024-01-24" },
  { id: "INV-2024-003", client: "Barratt Homes", project: "New Build Installation", amount: 40000, status: "Pending", dueDate: "2024-02-28", paidDate: null },
  { id: "INV-2024-004", client: "JCB Ltd", project: "Factory Maintenance", amount: 17500, status: "Overdue", dueDate: "2024-02-01", paidDate: null },
];

export const tenders = [
  { id: "T-2024-001", title: "Manchester Airport Terminal Upgrade", client: "Manchester Airport Group", value: 450000, deadline: "2024-03-15", status: "Open", category: "Commercial" },
  { id: "T-2024-002", title: "NHS Hospital Wing Electrical", client: "NHS Trust", value: 280000, deadline: "2024-03-01", status: "Open", category: "Healthcare" },
  { id: "T-2024-003", title: "University Campus Lighting", client: "University of Manchester", value: 120000, deadline: "2024-02-20", status: "Submitted", category: "Education" },
  { id: "T-2024-004", title: "Shopping Centre Refurbishment", client: "Trafford Centre", value: 350000, deadline: "2024-02-10", status: "Won", category: "Retail" },
  { id: "T-2024-005", title: "Council Housing Electrical Upgrades", client: "Manchester City Council", value: 180000, deadline: "2024-01-30", status: "Lost", category: "Residential" },
];

export const hrDocuments = [
  { id: "1", name: "Employee Handbook 2024", category: "Policy", lastUpdated: "2024-01-15", size: "2.4 MB" },
  { id: "2", name: "Health & Safety Policy", category: "Policy", lastUpdated: "2024-02-01", size: "1.8 MB" },
  { id: "3", name: "Annual Leave Request Form", category: "Form", lastUpdated: "2023-12-01", size: "156 KB" },
  { id: "4", name: "Expense Claim Template", category: "Form", lastUpdated: "2024-01-10", size: "89 KB" },
  { id: "5", name: "Disciplinary Procedure", category: "Policy", lastUpdated: "2023-11-20", size: "980 KB" },
];

export const businessMetrics = {
  revenue: { current: 285000, previous: 245000, target: 300000 },
  profit: { current: 68000, previous: 52000, target: 75000 },
  activeJobs: 4,
  completedJobs: 12,
  employees: 6,
  certifications: 35,
  complianceRate: 92,
  safetyScore: 98,
};

// NEW: Job Packs
export const jobPacks = [
  { 
    id: "JP-001", 
    title: "Commercial Rewiring", 
    client: "Tesco Express", 
    location: "Manchester, M1 4BD",
    scope: "Full rewiring of retail unit including consumer unit upgrade",
    hazards: ["Working at height", "Live testing", "Asbestos risk"],
    ramsGenerated: true,
    methodStatementGenerated: true,
    briefingPackGenerated: true,
    assignedWorkers: ["1", "2", "5"],
    status: "In Progress",
    createdDate: "2024-01-10"
  },
  { 
    id: "JP-002", 
    title: "New Build Installation", 
    client: "Barratt Homes", 
    location: "Leeds, LS1 5QS",
    scope: "First fix and second fix electrical installation for 12 residential units",
    hazards: ["Working at height", "Heavy lifting", "Coordination with other trades"],
    ramsGenerated: true,
    methodStatementGenerated: true,
    briefingPackGenerated: false,
    assignedWorkers: ["1", "3", "4", "5", "6"],
    status: "In Progress",
    createdDate: "2024-01-25"
  },
  { 
    id: "JP-003", 
    title: "Office Lighting Upgrade", 
    client: "WeWork", 
    location: "Birmingham, B1 1RS",
    scope: "LED lighting upgrade across 3 floors with emergency lighting",
    hazards: ["Working at height", "Occupied building"],
    ramsGenerated: true,
    methodStatementGenerated: false,
    briefingPackGenerated: false,
    assignedWorkers: [],
    status: "Draft",
    createdDate: "2024-02-10"
  },
  { 
    id: "JP-004", 
    title: "EV Charging Points", 
    client: "NCP Car Parks", 
    location: "Liverpool, L1 8JQ",
    scope: "Installation of 20 EV charging points with new supply",
    hazards: ["Underground services", "Traffic management", "Weather exposure"],
    ramsGenerated: true,
    methodStatementGenerated: true,
    briefingPackGenerated: true,
    assignedWorkers: ["2", "5"],
    status: "Complete",
    createdDate: "2023-12-15"
  },
];

// NEW: Elec-ID Profiles with enhanced worker-owned data
export interface ElecIdSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsExperience?: number;
  verified?: boolean;
}

export interface ElecIdWorkHistory {
  id: string;
  employer: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  projects: string[];
  referenceAvailable: boolean;
  verified: boolean;
  verifiedBy?: string;
  verifiedDate?: string;
}

export interface ElecIdTraining {
  id: string;
  name: string;
  provider: string;
  completedDate: string;
  certificateId: string;
  fundedBy?: string;
  ownedBy: 'worker';
  documentUrl?: string;
  verified: boolean;
}

export interface ElecIdCertification {
  name: string;
  issuer: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Warning' | 'Expired';
  documentUrl?: string;
  verified: boolean;
}

export interface ElecIdProfile {
  id: string;
  employeeId: string;
  elecIdNumber: string;
  name: string;
  role: string;
  photo: string | null;
  bio: string;
  yearsExperience: number;
  ecsCardType: string;
  ecsCardNumber: string;
  ecsExpiry: string;
  ecsStatus: string;
  skills: ElecIdSkill[];
  workHistory: ElecIdWorkHistory[];
  certifications: ElecIdCertification[];
  training: ElecIdTraining[];
  qualifications: { name: string; issuer: string; year: string }[];
  verified: boolean;
  lastVerified: string;
  profileViews: number;
  shareableLink?: string;
}

export const elecIdProfiles: ElecIdProfile[] = [
  {
    id: "1",
    employeeId: "1",
    elecIdNumber: "ELEC-2024-00001",
    name: "James Wilson",
    role: "Senior Electrician",
    photo: null,
    bio: "Experienced senior electrician with 10+ years in commercial and industrial installations. Specialist in EV charging infrastructure and solar PV systems.",
    yearsExperience: 12,
    ecsCardType: "Gold Card",
    ecsCardNumber: "ECS-123456",
    ecsExpiry: "2025-09-20",
    ecsStatus: "Valid",
    skills: [
      { name: "EV Charging", level: "Expert", yearsExperience: 4, verified: true },
      { name: "Solar PV", level: "Advanced", yearsExperience: 5, verified: true },
      { name: "Testing & Inspection", level: "Expert", yearsExperience: 10, verified: true },
      { name: "Commercial Installations", level: "Expert", yearsExperience: 12, verified: true },
      { name: "Fire Alarm Systems", level: "Intermediate", yearsExperience: 3, verified: false },
      { name: "Smart Home", level: "Intermediate", yearsExperience: 2, verified: false },
    ],
    workHistory: [
      {
        id: "WH-001",
        employer: "Elec-Mate Ltd",
        role: "Senior Electrician",
        location: "Manchester, UK",
        startDate: "2021-03",
        endDate: null,
        isCurrent: true,
        description: "Leading commercial electrical projects including EV charging networks and solar installations. Supervising team of 4 electricians.",
        projects: ["Tesco Express Rewiring", "NCP EV Charging Network", "Barratt Homes Development"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Elec-Mate HR",
        verifiedDate: "2024-02-01"
      },
      {
        id: "WH-002",
        employer: "Sparks & Co",
        role: "Electrician",
        location: "Liverpool, UK",
        startDate: "2016-06",
        endDate: "2021-02",
        isCurrent: false,
        description: "Commercial and industrial electrical installations. Progressed from electrician to team lead.",
        projects: ["Liverpool ONE Retail", "University Campus Upgrade"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Sparks & Co",
        verifiedDate: "2021-03-15"
      },
      {
        id: "WH-003",
        employer: "Quick Electric",
        role: "Apprentice / Electrician",
        location: "Manchester, UK",
        startDate: "2012-09",
        endDate: "2016-05",
        isCurrent: false,
        description: "Completed apprenticeship and worked on domestic and small commercial projects.",
        projects: [],
        referenceAvailable: false,
        verified: false
      }
    ],
    certifications: [
      { name: "18th Edition Wiring Regulations", issuer: "City & Guilds", certNumber: "CG-18ED-2021-001", issueDate: "2021-06-15", expiryDate: "2025-06-15", status: "Active", verified: true },
      { name: "ECS Gold Card", issuer: "JIB", certNumber: "ECS-GC-2021-123", issueDate: "2021-09-20", expiryDate: "2025-09-20", status: "Active", verified: true },
      { name: "Part P Domestic Installer", issuer: "NICEIC", certNumber: "PP-2021-456", issueDate: "2021-04-10", expiryDate: "2026-04-10", status: "Active", verified: true },
      { name: "IPAF 3a/3b", issuer: "IPAF", certNumber: "IPAF-2023-789", issueDate: "2023-03-01", expiryDate: "2025-03-01", status: "Active", verified: true },
    ],
    training: [
      { id: "TR-001", name: "EV Charging Installation", provider: "IMI", completedDate: "2023-11-15", certificateId: "EV-2023-001", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
      { id: "TR-002", name: "Solar PV Systems", provider: "MCS", completedDate: "2023-08-20", certificateId: "PV-2023-001", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
      { id: "TR-003", name: "Fire Alarm Systems", provider: "FIA", completedDate: "2022-05-10", certificateId: "FA-2022-001", fundedBy: "Sparks & Co", ownedBy: "worker", verified: true },
    ],
    qualifications: [
      { name: "NVQ Level 3 Electrical Installation", issuer: "City & Guilds", year: "2018" },
      { name: "AM2 Assessment", issuer: "JIB", year: "2018" },
      { name: "City & Guilds 2391 Inspection & Testing", issuer: "City & Guilds", year: "2019" },
    ],
    verified: true,
    lastVerified: "2024-02-01",
    profileViews: 47,
    shareableLink: "https://elec-id.app/profile/ELEC-2024-00001"
  },
  {
    id: "2",
    employeeId: "2",
    elecIdNumber: "ELEC-2024-00002",
    name: "Sarah Mitchell",
    role: "Electrician",
    photo: null,
    bio: "Qualified electrician specialising in domestic installations and solar PV systems.",
    yearsExperience: 5,
    ecsCardType: "Gold Card",
    ecsCardNumber: "ECS-234567",
    ecsExpiry: "2024-04-20",
    ecsStatus: "Expiring",
    skills: [
      { name: "Domestic Installations", level: "Advanced", yearsExperience: 5, verified: true },
      { name: "Solar PV", level: "Intermediate", yearsExperience: 2, verified: true },
      { name: "Testing & Inspection", level: "Intermediate", yearsExperience: 3, verified: false },
    ],
    workHistory: [
      {
        id: "WH-004",
        employer: "Elec-Mate Ltd",
        role: "Electrician",
        location: "Manchester, UK",
        startDate: "2022-06",
        endDate: null,
        isCurrent: true,
        description: "Domestic and commercial electrical installations.",
        projects: ["New Build Installation - Barratt Homes"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Elec-Mate HR",
        verifiedDate: "2024-01-15"
      }
    ],
    certifications: [
      { name: "18th Edition Wiring Regulations", issuer: "City & Guilds", certNumber: "CG-18ED-2022-002", issueDate: "2022-06-20", expiryDate: "2026-06-20", status: "Active", verified: true },
      { name: "ECS Gold Card", issuer: "JIB", certNumber: "ECS-GC-2022-456", issueDate: "2022-04-20", expiryDate: "2024-04-20", status: "Warning", verified: true },
    ],
    training: [
      { id: "TR-004", name: "Solar PV Systems", provider: "MCS", completedDate: "2023-08-20", certificateId: "PV-2023-002", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
    ],
    qualifications: [
      { name: "NVQ Level 3 Electrical Installation", issuer: "City & Guilds", year: "2020" },
      { name: "AM2 Assessment", issuer: "JIB", year: "2020" },
    ],
    verified: true,
    lastVerified: "2024-01-15",
    profileViews: 23,
  },
  {
    id: "3",
    employeeId: "3",
    elecIdNumber: "ELEC-2024-00003",
    name: "David Brown",
    role: "Apprentice",
    photo: null,
    bio: "Second-year apprentice electrician eager to learn and develop skills in all areas of electrical installation.",
    yearsExperience: 2,
    ecsCardType: "Apprentice Card",
    ecsCardNumber: "ECS-345678",
    ecsExpiry: "2025-09-01",
    ecsStatus: "Valid",
    skills: [
      { name: "Domestic Installations", level: "Beginner", yearsExperience: 2, verified: false },
      { name: "Cable Installation", level: "Intermediate", yearsExperience: 2, verified: false },
    ],
    workHistory: [
      {
        id: "WH-005",
        employer: "Elec-Mate Ltd",
        role: "Apprentice Electrician",
        location: "Manchester, UK",
        startDate: "2023-09",
        endDate: null,
        isCurrent: true,
        description: "Apprentice electrician working towards NVQ Level 3.",
        projects: [],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Elec-Mate HR",
        verifiedDate: "2024-02-05"
      }
    ],
    certifications: [
      { name: "ECS Apprentice Card", issuer: "JIB", certNumber: "ECS-AP-2023-789", issueDate: "2023-09-01", expiryDate: "2025-09-01", status: "Active", verified: true },
      { name: "Part P Certification", issuer: "NICEIC", certNumber: "PP-2023-789", issueDate: "2023-03-01", expiryDate: "2024-03-01", status: "Expired", verified: true },
    ],
    training: [],
    qualifications: [
      { name: "City & Guilds 2365 Level 2", issuer: "City & Guilds", year: "2023" },
    ],
    verified: true,
    lastVerified: "2024-02-05",
    profileViews: 8,
  },
  {
    id: "4",
    employeeId: "4",
    elecIdNumber: "ELEC-2024-00004",
    name: "Emma Thompson",
    role: "Senior Electrician",
    photo: null,
    bio: "Highly experienced senior electrician with expertise in commercial projects, smart home integration, and team supervision.",
    yearsExperience: 15,
    ecsCardType: "Gold Card",
    ecsCardNumber: "ECS-456789",
    ecsExpiry: "2026-11-10",
    ecsStatus: "Valid",
    skills: [
      { name: "Commercial Installations", level: "Expert", yearsExperience: 15, verified: true },
      { name: "Smart Home Integration", level: "Expert", yearsExperience: 6, verified: true },
      { name: "EV Charging", level: "Advanced", yearsExperience: 4, verified: true },
      { name: "Solar PV", level: "Advanced", yearsExperience: 5, verified: true },
      { name: "Testing & Inspection", level: "Expert", yearsExperience: 12, verified: true },
      { name: "Design & Verification", level: "Advanced", yearsExperience: 7, verified: true },
    ],
    workHistory: [
      {
        id: "WH-006",
        employer: "Elec-Mate Ltd",
        role: "Senior Electrician / Supervisor",
        location: "Manchester, UK",
        startDate: "2019-11",
        endDate: null,
        isCurrent: true,
        description: "Leading complex commercial projects and supervising installation teams.",
        projects: ["Factory Maintenance - JCB", "WeWork Lighting Upgrade", "Smart Building Integration"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Elec-Mate HR",
        verifiedDate: "2024-02-10"
      },
      {
        id: "WH-007",
        employer: "Northern Power Solutions",
        role: "Electrician / Team Lead",
        location: "Leeds, UK",
        startDate: "2014-03",
        endDate: "2019-10",
        isCurrent: false,
        description: "Commercial and industrial electrical installations with team lead responsibilities.",
        projects: ["Leeds General Infirmary", "University of Leeds Campus"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Northern Power Solutions",
        verifiedDate: "2019-11-01"
      }
    ],
    certifications: [
      { name: "18th Edition Wiring Regulations", issuer: "City & Guilds", certNumber: "CG-18ED-2020-002", issueDate: "2020-01-15", expiryDate: "2026-01-15", status: "Active", verified: true },
      { name: "ECS Gold Card", issuer: "JIB", certNumber: "ECS-GC-2020-101", issueDate: "2020-11-10", expiryDate: "2026-11-10", status: "Active", verified: true },
      { name: "IPAF Licence", issuer: "IPAF", certNumber: "IPAF-2022-321", issueDate: "2022-12-31", expiryDate: "2024-12-31", status: "Active", verified: true },
    ],
    training: [
      { id: "TR-005", name: "EV Charging Installation", provider: "IMI", completedDate: "2023-11-15", certificateId: "EV-2023-002", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
      { id: "TR-006", name: "Solar PV Systems", provider: "MCS", completedDate: "2023-08-20", certificateId: "PV-2023-003", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
      { id: "TR-007", name: "Smart Home Integration", provider: "KNX", completedDate: "2023-06-01", certificateId: "SH-2023-001", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
    ],
    qualifications: [
      { name: "NVQ Level 3 Electrical Installation", issuer: "City & Guilds", year: "2016" },
      { name: "AM2 Assessment", issuer: "JIB", year: "2016" },
      { name: "City & Guilds 2391 Inspection & Testing", issuer: "City & Guilds", year: "2017" },
      { name: "City & Guilds 2399 Design & Verification", issuer: "City & Guilds", year: "2018" },
    ],
    verified: true,
    lastVerified: "2024-02-10",
    profileViews: 62,
  },
  {
    id: "5",
    employeeId: "5",
    elecIdNumber: "ELEC-2024-00005",
    name: "Michael Chen",
    role: "Electrician",
    photo: null,
    bio: "Electrician with strong skills in smart home technology and first aid trained.",
    yearsExperience: 5,
    ecsCardType: "Gold Card",
    ecsCardNumber: "ECS-567890",
    ecsExpiry: "2025-01-08",
    ecsStatus: "Valid",
    skills: [
      { name: "Smart Home", level: "Advanced", yearsExperience: 3, verified: true },
      { name: "Domestic Installations", level: "Advanced", yearsExperience: 5, verified: true },
      { name: "First Aid", level: "Intermediate", yearsExperience: 2, verified: true },
    ],
    workHistory: [
      {
        id: "WH-008",
        employer: "Elec-Mate Ltd",
        role: "Electrician",
        location: "Manchester, UK",
        startDate: "2022-01",
        endDate: null,
        isCurrent: true,
        description: "Domestic and commercial electrical work with focus on smart home installations.",
        projects: ["Commercial Rewiring - Tesco", "Factory Maintenance - JCB"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Elec-Mate HR",
        verifiedDate: "2024-01-20"
      }
    ],
    certifications: [
      { name: "18th Edition Wiring Regulations", issuer: "City & Guilds", certNumber: "CG-18ED-2022-003", issueDate: "2022-01-08", expiryDate: "2026-01-08", status: "Active", verified: true },
      { name: "ECS Gold Card", issuer: "JIB", certNumber: "ECS-GC-2022-567", issueDate: "2022-01-08", expiryDate: "2025-01-08", status: "Active", verified: true },
      { name: "First Aid at Work", issuer: "St John Ambulance", certNumber: "FA-2023-654", issueDate: "2023-08-10", expiryDate: "2024-08-10", status: "Active", verified: true },
    ],
    training: [
      { id: "TR-008", name: "Smart Home Integration", provider: "KNX", completedDate: "2023-06-01", certificateId: "SH-2023-002", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
    ],
    qualifications: [
      { name: "NVQ Level 3 Electrical Installation", issuer: "City & Guilds", year: "2020" },
      { name: "AM2 Assessment", issuer: "JIB", year: "2020" },
    ],
    verified: true,
    lastVerified: "2024-01-20",
    profileViews: 31,
  },
  {
    id: "6",
    employeeId: "6",
    elecIdNumber: "ELEC-2024-00006",
    name: "Lisa Parker",
    role: "Project Manager",
    photo: null,
    bio: "Experienced project manager with electrical background. SMSTS qualified with expertise in commercial project delivery.",
    yearsExperience: 10,
    ecsCardType: "Supervisor Card",
    ecsCardNumber: "ECS-678901",
    ecsExpiry: "2025-07-22",
    ecsStatus: "Valid",
    skills: [
      { name: "Project Management", level: "Expert", yearsExperience: 8, verified: true },
      { name: "Commercial Installations", level: "Advanced", yearsExperience: 10, verified: true },
      { name: "Design", level: "Advanced", yearsExperience: 6, verified: true },
      { name: "Health & Safety", level: "Expert", yearsExperience: 8, verified: true },
    ],
    workHistory: [
      {
        id: "WH-009",
        employer: "Elec-Mate Ltd",
        role: "Project Manager",
        location: "Manchester, UK",
        startDate: "2020-07",
        endDate: null,
        isCurrent: true,
        description: "Managing multiple commercial electrical projects with teams of up to 15 electricians.",
        projects: ["Trafford Centre Refurbishment", "Manchester Airport Terminal", "NHS Hospital Wing"],
        referenceAvailable: true,
        verified: true,
        verifiedBy: "Elec-Mate HR",
        verifiedDate: "2024-02-08"
      }
    ],
    certifications: [
      { name: "18th Edition Wiring Regulations", issuer: "City & Guilds", certNumber: "CG-18ED-2020-004", issueDate: "2020-07-22", expiryDate: "2024-07-22", status: "Active", verified: true },
      { name: "ECS Supervisor Card", issuer: "JIB", certNumber: "ECS-SC-2020-678", issueDate: "2020-07-22", expiryDate: "2025-07-22", status: "Active", verified: true },
      { name: "Asbestos Awareness", issuer: "UKATA", certNumber: "AA-2023-987", issueDate: "2023-05-05", expiryDate: "2024-05-05", status: "Warning", verified: true },
      { name: "SMSTS", issuer: "CITB", certNumber: "SMSTS-2021-001", issueDate: "2021-03-15", expiryDate: "2026-03-15", status: "Active", verified: true },
    ],
    training: [
      { id: "TR-009", name: "Project Management", provider: "APM", completedDate: "2021-06-01", certificateId: "PM-2021-001", fundedBy: "Elec-Mate Ltd", ownedBy: "worker", verified: true },
    ],
    qualifications: [
      { name: "NVQ Level 3 Electrical Installation", issuer: "City & Guilds", year: "2015" },
      { name: "HNC Electrical Engineering", issuer: "BTEC", year: "2017" },
    ],
    verified: true,
    lastVerified: "2024-02-08",
    profileViews: 89,
  },
];

// NEW: Timesheets
export const timesheets = [
  { id: "TS-001", employeeId: "1", employeeName: "James Wilson", jobId: "1", jobTitle: "Commercial Rewiring", date: "2024-02-12", clockIn: "08:00", clockOut: "17:00", breakMins: 60, totalHours: 8, status: "Approved" },
  { id: "TS-002", employeeId: "1", employeeName: "James Wilson", jobId: "1", jobTitle: "Commercial Rewiring", date: "2024-02-13", clockIn: "07:30", clockOut: "16:30", breakMins: 60, totalHours: 8, status: "Approved" },
  { id: "TS-003", employeeId: "2", employeeName: "Sarah Mitchell", jobId: "2", jobTitle: "New Build Installation", date: "2024-02-12", clockIn: "08:00", clockOut: "18:00", breakMins: 60, totalHours: 9, status: "Approved" },
  { id: "TS-004", employeeId: "3", employeeName: "David Brown", jobId: "2", jobTitle: "New Build Installation", date: "2024-02-12", clockIn: "08:30", clockOut: "17:00", breakMins: 30, totalHours: 8, status: "Pending" },
  { id: "TS-005", employeeId: "5", employeeName: "Michael Chen", jobId: "1", jobTitle: "Commercial Rewiring", date: "2024-02-12", clockIn: "08:00", clockOut: "17:30", breakMins: 60, totalHours: 8.5, status: "Approved" },
  { id: "TS-006", employeeId: "5", employeeName: "Michael Chen", jobId: "5", jobTitle: "Factory Maintenance", date: "2024-02-13", clockIn: "07:00", clockOut: "15:30", breakMins: 30, totalHours: 8, status: "Pending" },
  { id: "TS-007", employeeId: "1", employeeName: "James Wilson", jobId: "1", jobTitle: "Commercial Rewiring", date: "2024-02-14", clockIn: "08:00", clockOut: "17:00", breakMins: 60, totalHours: 8, status: "Pending" },
  { id: "TS-008", employeeId: "2", employeeName: "Sarah Mitchell", jobId: "2", jobTitle: "New Build Installation", date: "2024-02-13", clockIn: "08:00", clockOut: "17:30", breakMins: 60, totalHours: 8.5, status: "Pending" },
];

// NEW: Toolbox Talks
export const toolboxTalks = [
  { id: "TBT-001", title: "Working at Height Safety", date: "2024-02-12", presenter: "James Wilson", attendees: ["1", "2", "3", "5"], job: "Commercial Rewiring", signed: true },
  { id: "TBT-002", title: "Electrical Isolation Procedures", date: "2024-02-10", presenter: "Emma Thompson", attendees: ["1", "4", "5", "6"], job: "Factory Maintenance", signed: true },
  { id: "TBT-003", title: "PPE Requirements", date: "2024-02-08", presenter: "Lisa Parker", attendees: ["1", "2", "3", "4", "5", "6"], job: "General", signed: true },
  { id: "TBT-004", title: "Cable Handling and Manual Handling", date: "2024-02-05", presenter: "James Wilson", attendees: ["2", "3", "5"], job: "New Build Installation", signed: true },
];

// NEW: Regulatory Alerts
export const regAlerts = [
  { id: "RA-001", title: "BS 7671 Amendment 2 Coming Soon", description: "Amendment 2 to BS 7671:2018+A2:2022 includes updates to Chapter 41 and Section 722.", date: "2024-02-15", priority: "High", status: "Unread" },
  { id: "RA-002", title: "Part P Competent Person Scheme Update", description: "New requirements for CPD hours from April 2024.", date: "2024-02-10", priority: "Medium", status: "Read" },
  { id: "RA-003", title: "EV Charging Regulations Update", description: "Changes to IET Code of Practice for EV Charging Equipment Installation.", date: "2024-02-01", priority: "Medium", status: "Read" },
];

// NEW: Communications
export const communications = [
  { id: "COMM-001", type: "Job Message", title: "Materials delivery update", message: "Cable delivery confirmed for tomorrow 8am at Tesco site.", sender: "Lisa Parker", recipients: ["1", "2", "5"], job: "Commercial Rewiring", date: "2024-02-13", time: "14:30", read: ["1", "2"], priority: "Normal" },
  { id: "COMM-002", type: "Safety Warning", title: "Weather Alert - High Winds", message: "Met Office amber warning for high winds. Review working at height activities.", sender: "System", recipients: ["1", "2", "3", "4", "5", "6"], job: null, date: "2024-02-13", time: "10:00", read: ["1", "4", "6"], priority: "High" },
  { id: "COMM-003", type: "Team Broadcast", title: "Monthly Safety Meeting", message: "Reminder: Monthly safety meeting this Friday at 08:00 in the office.", sender: "Lisa Parker", recipients: ["1", "2", "3", "4", "5", "6"], job: null, date: "2024-02-12", time: "16:00", read: ["1", "2", "3", "4", "5", "6"], priority: "Normal" },
  { id: "COMM-004", type: "Mandatory Reading", title: "Updated Risk Assessment Procedure", message: "Please review and sign off the updated risk assessment procedure by Friday.", sender: "Lisa Parker", recipients: ["1", "2", "3", "4", "5", "6"], job: null, date: "2024-02-11", time: "09:00", read: ["1", "4"], signedOff: ["1"], priority: "High" },
  { id: "COMM-005", type: "Job Message", title: "Client meeting confirmed", message: "Site meeting with Barratt Homes PM confirmed for Thursday 10am.", sender: "Lisa Parker", recipients: ["1", "4", "6"], job: "New Build Installation", date: "2024-02-13", time: "11:15", read: ["1", "6"], priority: "Normal" },
];

// NEW: Snag Lists / Quality
export const snagLists = [
  { 
    id: "SN-001", 
    jobId: "4", 
    jobTitle: "EV Charging Points", 
    createdBy: "James Wilson",
    createdDate: "2024-01-18",
    status: "Complete",
    items: [
      { id: "1", description: "Charging post 3 - cable tray not level", photo: null, status: "Resolved", resolvedBy: "Michael Chen", resolvedDate: "2024-01-19" },
      { id: "2", description: "Signage missing on bays 5-8", photo: null, status: "Resolved", resolvedBy: "Sarah Mitchell", resolvedDate: "2024-01-19" },
    ]
  },
  { 
    id: "SN-002", 
    jobId: "1", 
    jobTitle: "Commercial Rewiring", 
    createdBy: "Lisa Parker",
    createdDate: "2024-02-10",
    status: "In Progress",
    items: [
      { id: "1", description: "Socket faceplate in storeroom scratched", photo: null, status: "Open", resolvedBy: null, resolvedDate: null },
      { id: "2", description: "Light fitting in office 3 not aligned", photo: null, status: "Resolved", resolvedBy: "James Wilson", resolvedDate: "2024-02-11" },
      { id: "3", description: "Cable containment cover loose in corridor", photo: null, status: "Open", resolvedBy: null, resolvedDate: null },
    ]
  },
];

// NEW: Closeout Reports
export const closeoutReports = [
  {
    id: "CO-001",
    jobId: "4",
    jobTitle: "EV Charging Points",
    client: "NCP Car Parks",
    completedDate: "2024-01-20",
    documents: ["RAMS", "Method Statement", "Test Certificates", "As-Built Drawings", "O&M Manual"],
    signedOff: true,
    signedOffBy: "Lisa Parker",
    signedOffDate: "2024-01-20",
    elecIdLinked: ["2", "5"]
  }
];

// NEW: AI Estimates
export const aiEstimates = [
  {
    id: "EST-001",
    tenderId: "T-2024-001",
    tenderTitle: "Manchester Airport Terminal Upgrade",
    createdDate: "2024-02-14",
    labourHours: 2400,
    labourCost: 96000,
    materialsCost: 180000,
    equipmentCost: 25000,
    overheads: 45000,
    profit: 55000,
    totalEstimate: 401000,
    hazards: ["Working at height", "Restricted access", "Live environment", "Security clearance required"],
    programme: "16 weeks",
    ramsScoped: true,
    confidence: "Medium"
  },
  {
    id: "EST-002",
    tenderId: "T-2024-002",
    tenderTitle: "NHS Hospital Wing Electrical",
    createdDate: "2024-02-12",
    labourHours: 1600,
    labourCost: 64000,
    materialsCost: 120000,
    equipmentCost: 15000,
    overheads: 30000,
    profit: 35000,
    totalEstimate: 264000,
    hazards: ["Healthcare environment", "Infection control", "Critical systems", "Night working"],
    programme: "12 weeks",
    ramsScoped: true,
    confidence: "High"
  }
];

// Permissions reference
export const permissionsList = [
  { id: "view_jobs", name: "View Jobs", description: "Can view job details and status" },
  { id: "edit_jobs", name: "Edit Jobs", description: "Can create and edit job information" },
  { id: "view_team", name: "View Team", description: "Can view team member information" },
  { id: "edit_team", name: "Edit Team", description: "Can add, edit, and remove team members" },
  { id: "approve_rams", name: "Approve RAMS", description: "Can approve risk assessments" },
  { id: "sign_off", name: "Sign Off Work", description: "Can sign off completed work" },
  { id: "manage_finances", name: "Manage Finances", description: "Can view and manage quotes and invoices" },
];

// Role permissions defaults
export const rolePermissions = {
  "QS": ["view_jobs", "edit_jobs", "view_team", "edit_team", "approve_rams", "sign_off", "manage_finances"],
  "Supervisor": ["view_jobs", "edit_jobs", "view_team", "approve_rams", "sign_off"],
  "Operative": ["view_jobs", "view_team"],
  "Apprentice": ["view_jobs"],
  "Project Manager": ["view_jobs", "edit_jobs", "view_team", "edit_team", "approve_rams", "sign_off", "manage_finances"],
};

// NEW: Progress Logs (Daily job diary entries)
export const progressLogs = [
  { 
    id: "PL-001", 
    jobId: "1", 
    jobTitle: "Commercial Rewiring",
    employeeId: "1",
    employeeName: "James Wilson",
    date: "2024-02-13",
    summary: "Completed first fix in storeroom and office areas. All cable runs tested and passed.",
    workCompleted: ["First fix wiring - storeroom", "First fix wiring - office 1-3", "Cable testing"],
    materialsUsed: [
      { item: "6242Y 2.5mm Twin & Earth", quantity: "150m", cost: 85 },
      { item: "20mm Conduit", quantity: "50m", cost: 35 },
      { item: "Metal Back Boxes", quantity: "24", cost: 48 }
    ],
    photos: ["before-storeroom.jpg", "cable-runs-office.jpg", "testing-results.jpg"],
    photoIds: ["PHOTO-001", "PHOTO-002", "PHOTO-003"],
    hoursWorked: 8,
    issues: [],
    weather: "Clear",
    signedOff: true
  },
  { 
    id: "PL-002", 
    jobId: "1", 
    jobTitle: "Commercial Rewiring",
    employeeId: "5",
    employeeName: "Michael Chen",
    date: "2024-02-13",
    summary: "Installed consumer unit and main isolation switch. Awaiting UKPN for supply upgrade.",
    workCompleted: ["Consumer unit installation", "Main switch installation", "Earthing arrangements"],
    materialsUsed: [
      { item: "18th Edition Consumer Unit 12-way", quantity: "1", cost: 185 },
      { item: "100A Main Switch", quantity: "1", cost: 45 },
      { item: "Earth Rod Kit", quantity: "1", cost: 28 }
    ],
    photos: ["consumer-unit-installed.jpg"],
    photoIds: ["PHOTO-005", "PHOTO-019"],
    hoursWorked: 8.5,
    issues: ["PL-ISSUE-001"],
    weather: "Clear",
    signedOff: true
  },
  { 
    id: "PL-003", 
    jobId: "2", 
    jobTitle: "New Build Installation",
    employeeId: "2",
    employeeName: "Sarah Mitchell",
    date: "2024-02-13",
    summary: "First fix completed on plots 1-3. Moved to plots 4-6.",
    workCompleted: ["First fix - Plot 1", "First fix - Plot 2", "First fix - Plot 3"],
    materialsUsed: [
      { item: "6242Y 2.5mm Twin & Earth", quantity: "300m", cost: 170 },
      { item: "6242Y 1.5mm Twin & Earth", quantity: "200m", cost: 95 },
      { item: "Dry Lining Boxes", quantity: "75", cost: 56 }
    ],
    photos: ["plot1-firstfix.jpg", "plot2-firstfix.jpg", "plot3-firstfix.jpg"],
    photoIds: ["PHOTO-006", "PHOTO-007", "PHOTO-008"],
    hoursWorked: 9,
    issues: [],
    weather: "Overcast",
    signedOff: true
  },
  { 
    id: "PL-004", 
    jobId: "5", 
    jobTitle: "Factory Maintenance",
    employeeId: "5",
    employeeName: "Michael Chen",
    date: "2024-02-14",
    summary: "Annual inspection of distribution boards. 2 MCBs replaced, all RCDs tested.",
    workCompleted: ["DB inspection - Main building", "MCB replacements", "RCD testing", "Thermal imaging"],
    materialsUsed: [
      { item: "32A Type B MCB", quantity: "2", cost: 24 }
    ],
    photos: ["db-inspection.jpg", "thermal-image-db1.jpg"],
    photoIds: ["PHOTO-015", "PHOTO-016", "PHOTO-017", "PHOTO-018"],
    hoursWorked: 8,
    issues: ["PL-ISSUE-002"],
    weather: "Rain",
    signedOff: false
  }
];

// NEW: Job Issues (Live blocker/issue reporting)
export const jobIssues = [
  {
    id: "ISSUE-001",
    jobId: "1",
    jobTitle: "Commercial Rewiring",
    reportedBy: "5",
    reporterName: "Michael Chen",
    reportedDate: "2024-02-13",
    reportedTime: "14:30",
    category: "Materials",
    priority: "Medium",
    title: "Supply upgrade delay",
    description: "UKPN have pushed back supply upgrade by 1 week. Currently scheduled for 21st Feb.",
    status: "Open",
    resolution: null,
    resolvedBy: null,
    resolvedDate: null,
    affectsCompletion: true,
    photos: []
  },
  {
    id: "ISSUE-002",
    jobId: "5",
    jobTitle: "Factory Maintenance",
    reportedBy: "5",
    reporterName: "Michael Chen",
    reportedDate: "2024-02-14",
    reportedTime: "10:15",
    category: "Safety",
    priority: "High",
    title: "Hot spot detected on DB3",
    description: "Thermal imaging detected hot spot on main incomer terminals in DB3. Requires immediate investigation and potential rewire of incomer.",
    status: "In Progress",
    resolution: null,
    resolvedBy: null,
    resolvedDate: null,
    affectsCompletion: true,
    photos: ["thermal-db3-hotspot.jpg"]
  },
  {
    id: "ISSUE-003",
    jobId: "2",
    jobTitle: "New Build Installation",
    reportedBy: "3",
    reporterName: "David Brown",
    reportedDate: "2024-02-12",
    reportedTime: "11:45",
    category: "Access",
    priority: "Low",
    title: "Plot 7 not accessible",
    description: "Scaffolding team still working on Plot 7 external. Cannot access for first fix until they clear.",
    status: "Resolved",
    resolution: "Scaffolding team completed by 15:00 same day",
    resolvedBy: "2",
    resolvedDate: "2024-02-12",
    affectsCompletion: false,
    photos: []
  },
  {
    id: "ISSUE-004",
    jobId: "1",
    jobTitle: "Commercial Rewiring",
    reportedBy: "1",
    reporterName: "James Wilson",
    reportedDate: "2024-02-11",
    reportedTime: "09:30",
    category: "Design",
    priority: "Medium",
    title: "Additional sockets requested",
    description: "Client has requested 4 additional double sockets in the break room. Need variation order approval.",
    status: "Resolved",
    resolution: "Variation order approved by client - £320 additional",
    resolvedBy: "6",
    resolvedDate: "2024-02-12",
    affectsCompletion: false,
    photos: []
  }
];

// NEW: Job Financials (Budget vs Actual tracking)
export const jobFinancials = [
  {
    id: "FIN-001",
    jobId: "1",
    jobTitle: "Commercial Rewiring",
    client: "Tesco Express",
    budget: {
      labour: 18000,
      materials: 15000,
      equipment: 2000,
      overheads: 5000,
      total: 45000,
      profit: 5000
    },
    actual: {
      labour: 12500,
      materials: 10200,
      equipment: 1800,
      overheads: 3500,
      total: 28000
    },
    invoiced: 22500,
    paid: 22500,
    variationOrders: [
      { id: "VO-001", description: "Additional sockets - break room", value: 320, status: "Approved", date: "2024-02-12" }
    ],
    status: "On Budget",
    margin: 28.5
  },
  {
    id: "FIN-002",
    jobId: "2",
    jobTitle: "New Build Installation",
    client: "Barratt Homes",
    budget: {
      labour: 48000,
      materials: 42000,
      equipment: 5000,
      overheads: 12000,
      total: 120000,
      profit: 13000
    },
    actual: {
      labour: 16000,
      materials: 14500,
      equipment: 2000,
      overheads: 4000,
      total: 36500
    },
    invoiced: 40000,
    paid: 0,
    variationOrders: [],
    status: "On Budget",
    margin: 30.4
  },
  {
    id: "FIN-003",
    jobId: "4",
    jobTitle: "EV Charging Points",
    client: "NCP Car Parks",
    budget: {
      labour: 8000,
      materials: 14000,
      equipment: 1500,
      overheads: 2500,
      total: 28000,
      profit: 2000
    },
    actual: {
      labour: 8200,
      materials: 13800,
      equipment: 1400,
      overheads: 2600,
      total: 26000
    },
    invoiced: 28000,
    paid: 28000,
    variationOrders: [],
    status: "Complete",
    margin: 7.1
  },
  {
    id: "FIN-004",
    jobId: "5",
    jobTitle: "Factory Maintenance",
    client: "JCB Ltd",
    budget: {
      labour: 14000,
      materials: 12000,
      equipment: 2000,
      overheads: 4000,
      total: 35000,
      profit: 3000
    },
    actual: {
      labour: 12000,
      materials: 10500,
      equipment: 1800,
      overheads: 3200,
      total: 27500
    },
    invoiced: 17500,
    paid: 0,
    variationOrders: [
      { id: "VO-002", description: "MCB replacements - emergency", value: 120, status: "Approved", date: "2024-02-14" }
    ],
    status: "On Budget",
    margin: 21.4
  }
];

// NEW: Worker Check-Ins / Locations
export const workerCheckIns = [
  {
    id: "CHK-001",
    employeeId: "1",
    employeeName: "James Wilson",
    jobId: "1",
    jobTitle: "Commercial Rewiring",
    jobLocation: "Manchester, M1 4BD",
    date: "2024-02-14",
    checkInTime: "07:55",
    checkInLocation: { lat: 53.4808, lng: -2.2426, accuracy: 10 },
    checkOutTime: null,
    checkOutLocation: null,
    status: "On Site",
    travelTime: 25
  },
  {
    id: "CHK-002",
    employeeId: "5",
    employeeName: "Michael Chen",
    jobId: "1",
    jobTitle: "Commercial Rewiring",
    jobLocation: "Manchester, M1 4BD",
    date: "2024-02-14",
    checkInTime: "08:05",
    checkInLocation: { lat: 53.4810, lng: -2.2430, accuracy: 8 },
    checkOutTime: null,
    checkOutLocation: null,
    status: "On Site",
    travelTime: 35
  },
  {
    id: "CHK-003",
    employeeId: "2",
    employeeName: "Sarah Mitchell",
    jobId: "2",
    jobTitle: "New Build Installation",
    jobLocation: "Leeds, LS1 5QS",
    date: "2024-02-14",
    checkInTime: "08:00",
    checkInLocation: { lat: 53.7965, lng: -1.5478, accuracy: 12 },
    checkOutTime: null,
    checkOutLocation: null,
    status: "On Site",
    travelTime: 40
  },
  {
    id: "CHK-004",
    employeeId: "3",
    employeeName: "David Brown",
    jobId: "2",
    jobTitle: "New Build Installation",
    jobLocation: "Leeds, LS1 5QS",
    date: "2024-02-14",
    checkInTime: null,
    checkInLocation: null,
    checkOutTime: null,
    checkOutLocation: null,
    status: "En Route",
    travelTime: null
  },
  {
    id: "CHK-005",
    employeeId: "4",
    employeeName: "Emma Thompson",
    jobId: null,
    jobTitle: null,
    jobLocation: null,
    date: "2024-02-14",
    checkInTime: null,
    checkInLocation: null,
    checkOutTime: null,
    checkOutLocation: null,
    status: "On Leave",
    travelTime: null
  },
  {
    id: "CHK-006",
    employeeId: "6",
    employeeName: "Lisa Parker",
    jobId: null,
    jobTitle: "Office",
    jobLocation: "Head Office",
    date: "2024-02-14",
    checkInTime: "08:30",
    checkInLocation: { lat: 53.4750, lng: -2.2500, accuracy: 5 },
    checkOutTime: null,
    checkOutLocation: null,
    status: "Office",
    travelTime: 0
  }
];

// NEW: Testing Workflows (for EIC/EICR sign-off)
export const testingWorkflows = [
  {
    id: "TEST-001",
    jobId: "1",
    jobTitle: "Commercial Rewiring",
    type: "EIC",
    status: "In Progress",
    stages: [
      { name: "Visual Inspection", status: "Complete", completedBy: "1", completedDate: "2024-02-12", notes: "All visual checks passed" },
      { name: "Dead Testing", status: "Complete", completedBy: "1", completedDate: "2024-02-13", notes: "Continuity and insulation resistance satisfactory" },
      { name: "Live Testing", status: "In Progress", completedBy: null, completedDate: null, notes: null },
      { name: "Documentation", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Supervisor Sign-off", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Client Sign-off", status: "Pending", completedBy: null, completedDate: null, notes: null }
    ],
    testResults: {
      circuits: 24,
      circuitsTested: 18,
      faults: 0,
      zeValues: "Good",
      rcdTests: "Passed"
    },
    certNumber: null,
    issuedDate: null
  },
  {
    id: "TEST-002",
    jobId: "4",
    jobTitle: "EV Charging Points",
    type: "EIC",
    status: "Complete",
    stages: [
      { name: "Visual Inspection", status: "Complete", completedBy: "2", completedDate: "2024-01-18", notes: "All visual checks passed" },
      { name: "Dead Testing", status: "Complete", completedBy: "2", completedDate: "2024-01-18", notes: "All values within limits" },
      { name: "Live Testing", status: "Complete", completedBy: "5", completedDate: "2024-01-19", notes: "EV units tested and operational" },
      { name: "Documentation", status: "Complete", completedBy: "2", completedDate: "2024-01-19", notes: "All documentation complete" },
      { name: "Supervisor Sign-off", status: "Complete", completedBy: "1", completedDate: "2024-01-19", notes: "Approved" },
      { name: "Client Sign-off", status: "Complete", completedBy: "6", completedDate: "2024-01-20", notes: "Client accepted" }
    ],
    testResults: {
      circuits: 20,
      circuitsTested: 20,
      faults: 0,
      zeValues: "Good",
      rcdTests: "Passed"
    },
    certNumber: "EIC-2024-001",
    issuedDate: "2024-01-20"
  },
  {
    id: "TEST-003",
    jobId: "2",
    jobTitle: "New Build Installation",
    type: "EIC",
    status: "Not Started",
    stages: [
      { name: "Visual Inspection", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Dead Testing", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Live Testing", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Documentation", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Supervisor Sign-off", status: "Pending", completedBy: null, completedDate: null, notes: null },
      { name: "Client Sign-off", status: "Pending", completedBy: null, completedDate: null, notes: null }
    ],
    testResults: {
      circuits: 144,
      circuitsTested: 0,
      faults: 0,
      zeValues: null,
      rcdTests: null
    },
    certNumber: null,
    issuedDate: null
  }
];

// NEW: Enhanced Jobs with Kanban stages
export const jobsWithStages = [
  { id: "1", title: "Commercial Rewiring", client: "Tesco Express", location: "Manchester, M1 4BD", stage: "In Progress", status: "Active", progress: 65, startDate: "2024-01-15", endDate: "2024-02-28", assignedWorkers: 3, totalWorkers: 4, value: 45000 },
  { id: "2", title: "New Build Installation", client: "Barratt Homes", location: "Leeds, LS1 5QS", stage: "In Progress", status: "Active", progress: 30, startDate: "2024-02-01", endDate: "2024-04-30", assignedWorkers: 5, totalWorkers: 5, value: 120000 },
  { id: "3", title: "Office Lighting Upgrade", client: "WeWork", location: "Birmingham, B1 1RS", stage: "Scheduled", status: "Pending", progress: 0, startDate: "2024-03-01", endDate: "2024-03-15", assignedWorkers: 0, totalWorkers: 2, value: 15000 },
  { id: "4", title: "EV Charging Points", client: "NCP Car Parks", location: "Liverpool, L1 8JQ", stage: "Complete", status: "Completed", progress: 100, startDate: "2024-01-01", endDate: "2024-01-20", assignedWorkers: 2, totalWorkers: 2, value: 28000 },
  { id: "5", title: "Factory Maintenance", client: "JCB Ltd", location: "Stoke-on-Trent, ST4 2RU", stage: "Testing", status: "Active", progress: 80, startDate: "2024-01-20", endDate: "2024-02-10", assignedWorkers: 4, totalWorkers: 4, value: 35000 },
  { id: "6", title: "Retail Unit Fit-Out", client: "Costa Coffee", location: "Sheffield, S1 2AB", stage: "Quoted", status: "Pending", progress: 0, startDate: "2024-03-15", endDate: "2024-04-15", assignedWorkers: 0, totalWorkers: 3, value: 32000 },
  { id: "7", title: "Emergency Lighting", client: "Pure Gym", location: "Nottingham, NG1 5AW", stage: "Confirmed", status: "Pending", progress: 0, startDate: "2024-03-05", endDate: "2024-03-20", assignedWorkers: 2, totalWorkers: 2, value: 18500 },
];

// NEW: Available Electricians on Elec-Mate (Talent Pool)
export const availableElectricians = [
  {
    id: "AE-001",
    name: "Ryan Hughes",
    location: "Manchester, M4",
    distance: 3.2,
    ecsCardType: "Gold Card",
    ecsExpiry: "2025-08-15",
    specialisms: ["Commercial", "EV Charging", "Solar PV"],
    experience: 8,
    availability: "Immediate",
    dayRate: 220,
    hourlyRate: 28,
    rating: 4.8,
    completedJobs: 47,
    verified: true,
    bio: "Experienced commercial electrician with specialism in EV infrastructure.",
    qualifications: ["18th Edition", "2391 Inspection & Testing", "EV Installation"],
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "AE-002",
    name: "Chris Taylor",
    location: "Salford, M5",
    distance: 5.1,
    ecsCardType: "Gold Card",
    ecsExpiry: "2026-02-20",
    specialisms: ["Industrial", "Fire Alarm", "Data Cabling"],
    experience: 12,
    availability: "1 week notice",
    dayRate: 260,
    hourlyRate: 32,
    rating: 4.9,
    completedJobs: 89,
    verified: true,
    bio: "Industrial specialist with extensive fire alarm and containment experience.",
    qualifications: ["18th Edition", "2391", "Fire Alarm BS 5839"],
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "AE-003",
    name: "Tom Patterson",
    location: "Stockport, SK1",
    distance: 7.8,
    ecsCardType: "Gold Card",
    ecsExpiry: "2025-11-30",
    specialisms: ["Domestic", "Smart Home", "Rewires"],
    experience: 5,
    availability: "2 weeks notice",
    dayRate: 190,
    hourlyRate: 24,
    rating: 4.6,
    completedJobs: 32,
    verified: true,
    bio: "Domestic specialist with Part P and smart home integration skills.",
    qualifications: ["18th Edition", "Part P", "KNX"],
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "AE-004",
    name: "Alex Morrison",
    location: "Bolton, BL1",
    distance: 12.4,
    ecsCardType: "Gold Card",
    ecsExpiry: "2025-06-01",
    specialisms: ["Commercial", "Industrial", "Testing"],
    experience: 15,
    availability: "Immediate",
    dayRate: 280,
    hourlyRate: 35,
    rating: 5.0,
    completedJobs: 124,
    verified: true,
    bio: "Highly experienced testing specialist. Available for contract work.",
    qualifications: ["18th Edition", "2391", "2394/95", "IPAF"],
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "AE-005",
    name: "Jordan Smith",
    location: "Oldham, OL1",
    distance: 9.2,
    ecsCardType: "Apprentice Card",
    ecsExpiry: "2025-09-01",
    specialisms: ["Domestic", "Commercial"],
    experience: 2,
    availability: "Immediate",
    dayRate: 100,
    hourlyRate: 12.50,
    rating: 4.5,
    completedJobs: 8,
    verified: true,
    bio: "3rd year apprentice looking for employment. Eager to learn.",
    qualifications: ["2365 Level 2", "Working towards Level 3"],
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  }
];

// NEW: Job Vacancies
export const jobVacancies = [
  {
    id: "VAC-001",
    title: "Senior Electrician",
    type: "Permanent",
    location: "Manchester",
    salary: { min: 38000, max: 45000, period: "per annum" },
    description: "Experienced electrician needed for commercial projects.",
    requirements: ["Gold Card", "18th Edition", "2391", "Full UK driving licence"],
    benefits: ["Company van", "Pension", "23 days holiday"],
    postedDate: "2024-02-10",
    closingDate: "2024-03-10",
    status: "Open",
    applicants: 8,
    views: 124
  },
  {
    id: "VAC-002",
    title: "Electrician - Contract",
    type: "Contract",
    location: "Leeds",
    salary: { min: 220, max: 250, period: "per day" },
    description: "6 month contract for new build housing project.",
    requirements: ["Gold Card", "18th Edition", "Own transport"],
    benefits: ["Weekly pay", "Overtime available"],
    postedDate: "2024-02-12",
    closingDate: "2024-02-28",
    status: "Open",
    applicants: 12,
    views: 89
  },
  {
    id: "VAC-003",
    title: "Apprentice Electrician",
    type: "Apprenticeship",
    location: "Manchester",
    salary: { min: 14000, max: 18000, period: "per annum" },
    description: "Looking for a motivated apprentice to join our team.",
    requirements: ["GCSE Maths & English", "Keen to learn", "Good attitude"],
    benefits: ["Training provided", "College day release", "Career progression"],
    postedDate: "2024-02-05",
    closingDate: "2024-03-31",
    status: "Open",
    applicants: 23,
    views: 256
  }
];

// NEW: Applications to vacancies
export const vacancyApplications = [
  { 
    id: "APP-001", 
    vacancyId: "VAC-001", 
    electricianId: "AE-001", 
    name: "Ryan Hughes", 
    email: "ryan.hughes@email.com",
    phone: "07712 345678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    ecsCardType: "Gold Card",
    yearsExperience: 8,
    currentLocation: "Manchester",
    noticePeriod: "2 weeks",
    expectedSalary: 42000,
    appliedDate: "2024-02-11", 
    status: "Reviewing", 
    notes: "Strong candidate, good experience with commercial work",
    rating: 4
  },
  { 
    id: "APP-002", 
    vacancyId: "VAC-001", 
    electricianId: "AE-002", 
    name: "Chris Taylor", 
    email: "chris.taylor@email.com",
    phone: "07723 456789",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    ecsCardType: "Gold Card",
    yearsExperience: 12,
    currentLocation: "Leeds",
    noticePeriod: "1 month",
    expectedSalary: 45000,
    appliedDate: "2024-02-12", 
    status: "Interview Scheduled", 
    notes: "Excellent fire alarm experience",
    interviewDate: "2024-02-20",
    interviewTime: "10:00",
    interviewType: "In-person",
    interviewLocation: "Head Office, Manchester",
    rating: 5
  },
  { 
    id: "APP-003", 
    vacancyId: "VAC-001", 
    electricianId: "AE-004", 
    name: "Alex Morrison", 
    email: "alex.morrison@email.com",
    phone: "07734 567890",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    ecsCardType: "Gold Card",
    yearsExperience: 15,
    currentLocation: "Sheffield",
    noticePeriod: "Immediately",
    expectedSalary: 44000,
    appliedDate: "2024-02-13", 
    status: "New", 
    notes: null
  },
  { 
    id: "APP-004", 
    vacancyId: "VAC-002", 
    electricianId: "AE-001", 
    name: "Ryan Hughes", 
    email: "ryan.hughes@email.com",
    phone: "07712 345678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    ecsCardType: "Gold Card",
    yearsExperience: 8,
    currentLocation: "Manchester",
    noticePeriod: "2 weeks",
    expectedSalary: 240,
    appliedDate: "2024-02-13", 
    status: "New", 
    notes: null
  },
  { 
    id: "APP-005", 
    vacancyId: "VAC-002", 
    electricianId: "AE-003", 
    name: "Tom Patterson", 
    email: "tom.patterson@email.com",
    phone: "07745 678901",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    ecsCardType: "Blue Card",
    yearsExperience: 5,
    currentLocation: "Bradford",
    noticePeriod: "1 week",
    expectedSalary: 230,
    appliedDate: "2024-02-14", 
    status: "Reviewing", 
    notes: "Good day rates, flexible on location"
  },
  { 
    id: "APP-006", 
    vacancyId: "VAC-003", 
    electricianId: "AE-005", 
    name: "Jordan Smith", 
    email: "jordan.smith@email.com",
    phone: "07756 789012",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    ecsCardType: "Apprentice",
    yearsExperience: 1,
    currentLocation: "Salford",
    noticePeriod: "Immediately",
    expectedSalary: 16000,
    appliedDate: "2024-02-06", 
    status: "Interview Scheduled", 
    notes: "Promising young candidate, keen attitude",
    interviewDate: "2024-02-22",
    interviewTime: "14:00",
    interviewType: "Video",
    rating: 4
  }
];

// NEW: Suppliers
export const suppliers = [
  { id: "SUP-001", name: "Edmundson Electrical", category: "Wholesaler", accountNumber: "EDM-12345", creditLimit: 15000, balance: 3240, contactName: "Dave Roberts", phone: "0161 234 5678", email: "droberts@edmundson.co.uk", deliveryDays: 1, discount: 25 },
  { id: "SUP-002", name: "CEF", category: "Wholesaler", accountNumber: "CEF-67890", creditLimit: 10000, balance: 1850, contactName: "Karen Smith", phone: "0161 345 6789", email: "ksmith@cef.co.uk", deliveryDays: 1, discount: 22 },
  { id: "SUP-003", name: "Screwfix", category: "Retail", accountNumber: "SFX-11111", creditLimit: 5000, balance: 450, contactName: "Trade Desk", phone: "0800 123 456", email: "trade@screwfix.com", deliveryDays: 0, discount: 10 },
  { id: "SUP-004", name: "Schneider Electric", category: "Manufacturer", accountNumber: "SCH-22222", creditLimit: 20000, balance: 0, contactName: "Technical Sales", phone: "0845 678 901", email: "sales@se.com", deliveryDays: 3, discount: 30 },
  { id: "SUP-005", name: "Toolstation", category: "Retail", accountNumber: "TLS-33333", creditLimit: 2500, balance: 125, contactName: "Account Team", phone: "0808 100 7211", email: "accounts@toolstation.com", deliveryDays: 0, discount: 5 }
];

// NEW: Material Orders
export const materialOrders = [
  { id: "ORD-001", supplierId: "SUP-001", supplier: "Edmundson Electrical", jobId: "1", jobTitle: "Commercial Rewiring", items: [{ name: "Consumer Unit 18-way", qty: 2, price: 185 }, { name: "Twin & Earth 2.5mm 100m", qty: 10, price: 65 }], total: 1020, status: "Delivered", orderDate: "2024-02-10", deliveryDate: "2024-02-11", orderedBy: "Lisa Parker" },
  { id: "ORD-002", supplierId: "SUP-002", supplier: "CEF", jobId: "2", jobTitle: "New Build Installation", items: [{ name: "Back boxes", qty: 200, price: 0.85 }, { name: "White sockets", qty: 150, price: 2.50 }], total: 545, status: "In Transit", orderDate: "2024-02-13", deliveryDate: "2024-02-14", orderedBy: "James Wilson" },
  { id: "ORD-003", supplierId: "SUP-004", supplier: "Schneider Electric", jobId: "1", jobTitle: "Commercial Rewiring", items: [{ name: "Distribution Board 100A", qty: 1, price: 650 }], total: 650, status: "Processing", orderDate: "2024-02-14", deliveryDate: null, orderedBy: "Lisa Parker" },
  { id: "ORD-004", supplierId: "SUP-003", supplier: "Screwfix", jobId: null, jobTitle: "Stock", items: [{ name: "Cable clips mixed", qty: 5, price: 8.99 }, { name: "Drill bits HSS set", qty: 2, price: 24.99 }], total: 94.93, status: "Delivered", orderDate: "2024-02-09", deliveryDate: "2024-02-09", orderedBy: "Michael Chen" }
];

// NEW: Company Tools/Equipment (Asset Register)
export const companyTools = [
  { id: "TOOL-001", name: "Fluke 1664FC", category: "Testing", serialNumber: "FL-12345678", purchaseDate: "2022-06-15", purchasePrice: 1850, assignedTo: "James Wilson", assignedToId: "1", status: "In Use", lastCalibration: "2023-12-01", nextCalibration: "2024-12-01", patDate: "2024-01-15", patDue: "2025-01-15" },
  { id: "TOOL-002", name: "Megger MFT1741", category: "Testing", serialNumber: "MG-87654321", purchaseDate: "2021-03-10", purchasePrice: 1650, assignedTo: "Emma Thompson", assignedToId: "4", status: "On Leave", lastCalibration: "2023-11-15", nextCalibration: "2024-11-15", patDate: "2024-01-20", patDue: "2025-01-20" },
  { id: "TOOL-003", name: "DeWalt DCK266P2T", category: "Power Tools", serialNumber: "DW-11223344", purchaseDate: "2023-01-20", purchasePrice: 389, assignedTo: "Michael Chen", assignedToId: "5", status: "In Use", lastCalibration: null, nextCalibration: null, patDate: "2023-12-05", patDue: "2024-12-05" },
  { id: "TOOL-004", name: "Fluke T150", category: "Testing", serialNumber: "FL-99887766", purchaseDate: "2023-08-10", purchasePrice: 280, assignedTo: "Sarah Mitchell", assignedToId: "2", status: "In Use", lastCalibration: null, nextCalibration: null, patDate: "2024-02-01", patDue: "2025-02-01" },
  { id: "TOOL-005", name: "IPAF Scissor Lift", category: "Access Equipment", serialNumber: null, purchaseDate: null, purchasePrice: 0, assignedTo: "Hire - AFI", assignedToId: null, status: "On Hire", lastCalibration: null, nextCalibration: null, patDate: null, patDue: null },
  { id: "TOOL-006", name: "SDS Drill Makita", category: "Power Tools", serialNumber: "MK-55667788", purchaseDate: "2022-11-01", purchasePrice: 245, assignedTo: "Unassigned", assignedToId: null, status: "Available", lastCalibration: null, nextCalibration: null, patDate: "2023-11-01", patDue: "2024-11-01" }
];

// NEW: Expense Claims
export const expenseClaims = [
  { id: "EXP-001", employeeId: "1", employeeName: "James Wilson", jobId: "1", jobTitle: "Commercial Rewiring", category: "Materials", description: "Emergency cable purchase - B&Q", amount: 45.80, receiptImage: true, submittedDate: "2024-02-12", status: "Approved", approvedBy: "Lisa Parker", approvedDate: "2024-02-13", paidDate: "2024-02-14" },
  { id: "EXP-002", employeeId: "2", employeeName: "Sarah Mitchell", jobId: "2", jobTitle: "New Build Installation", category: "Parking", description: "Site parking - week", amount: 25.00, receiptImage: true, submittedDate: "2024-02-13", status: "Pending", approvedBy: null, approvedDate: null, paidDate: null },
  { id: "EXP-003", employeeId: "5", employeeName: "Michael Chen", jobId: "1", jobTitle: "Commercial Rewiring", category: "Tools", description: "Replacement drill bits", amount: 32.50, receiptImage: true, submittedDate: "2024-02-14", status: "Pending", approvedBy: null, approvedDate: null, paidDate: null },
  { id: "EXP-004", employeeId: "3", employeeName: "David Brown", jobId: "2", jobTitle: "New Build Installation", category: "Travel", description: "Fuel reimbursement", amount: 65.00, receiptImage: false, submittedDate: "2024-02-10", status: "Rejected", approvedBy: "Lisa Parker", approvedDate: "2024-02-11", paidDate: null },
  { id: "EXP-005", employeeId: "1", employeeName: "James Wilson", jobId: null, jobTitle: "General", category: "PPE", description: "Safety boots replacement", amount: 89.99, receiptImage: true, submittedDate: "2024-02-08", status: "Paid", approvedBy: "Lisa Parker", approvedDate: "2024-02-09", paidDate: "2024-02-14" }
];

// NEW: Recruitment Pipeline
export const recruitmentPipeline = [
  { id: "REC-001", electricianId: "AE-002", name: "Chris Taylor", stage: "Interview Scheduled", notes: "Strong industrial background", addedDate: "2024-02-12", lastContact: "2024-02-14" },
  { id: "REC-002", electricianId: "AE-004", name: "Alex Morrison", stage: "Shortlisted", notes: "Excellent testing experience", addedDate: "2024-02-13", lastContact: "2024-02-13" },
  { id: "REC-003", electricianId: "AE-005", name: "Jordan Smith", stage: "Offer Made", notes: "Apprentice - good attitude", addedDate: "2024-02-06", lastContact: "2024-02-14" }
];

// NEW: Customer Signatures
export const customerSignatures = [
  { id: "SIG-001", jobId: "4", jobTitle: "EV Charging Points", customerName: "John Williams", customerEmail: "j.williams@ncpparks.co.uk", signedDate: "2024-01-20", documentType: "Completion Certificate", status: "Signed", signatureImage: true, linkedInvoice: "INV-2024-002" },
  { id: "SIG-002", jobId: "1", jobTitle: "Commercial Rewiring", customerName: "Mike Stevens", customerEmail: "m.stevens@tesco.com", signedDate: null, documentType: "Completion Certificate", status: "Pending", signatureImage: false, linkedInvoice: "INV-2024-001" },
  { id: "SIG-003", jobId: "5", jobTitle: "Factory Maintenance", customerName: "Sarah Jones", customerEmail: "s.jones@jcb.com", signedDate: "2024-02-10", documentType: "Service Report", status: "Signed", signatureImage: true, linkedInvoice: "INV-2024-004" },
  { id: "SIG-004", jobId: "2", jobTitle: "New Build Installation", customerName: "Paul Roberts", customerEmail: "p.roberts@barratthomes.com", signedDate: null, documentType: "Stage Completion", status: "Awaiting", signatureImage: false, linkedInvoice: null },
  { id: "SIG-005", jobId: "4", jobTitle: "EV Charging Points", customerName: "John Williams", customerEmail: "j.williams@ncpparks.co.uk", signedDate: "2024-01-18", documentType: "Handover Document", status: "Signed", signatureImage: true, linkedInvoice: null }
];

// NEW: Price Book / Materials Library
export const priceBook = [
  { id: "MAT-001", name: "Twin & Earth 2.5mm 100m", category: "Cables", buyPrice: 45.00, sellPrice: 65.00, markup: 44, unit: "roll", supplier: "Edmundson", stockLevel: 12, reorderLevel: 5, lastUpdated: "2024-02-01" },
  { id: "MAT-002", name: "Twin & Earth 1.5mm 100m", category: "Cables", buyPrice: 32.00, sellPrice: 48.00, markup: 50, unit: "roll", supplier: "CEF", stockLevel: 8, reorderLevel: 5, lastUpdated: "2024-02-01" },
  { id: "MAT-003", name: "Consumer Unit 18-way", category: "Consumer Units", buyPrice: 145.00, sellPrice: 210.00, markup: 45, unit: "each", supplier: "Schneider", stockLevel: 3, reorderLevel: 2, lastUpdated: "2024-02-10" },
  { id: "MAT-004", name: "Consumer Unit 10-way", category: "Consumer Units", buyPrice: 85.00, sellPrice: 125.00, markup: 47, unit: "each", supplier: "Schneider", stockLevel: 5, reorderLevel: 2, lastUpdated: "2024-02-10" },
  { id: "MAT-005", name: "Double Socket White", category: "Accessories", buyPrice: 2.50, sellPrice: 6.00, markup: 140, unit: "each", supplier: "Screwfix", stockLevel: 200, reorderLevel: 50, lastUpdated: "2024-01-15" },
  { id: "MAT-006", name: "Single Socket White", category: "Accessories", buyPrice: 1.80, sellPrice: 4.50, markup: 150, unit: "each", supplier: "Screwfix", stockLevel: 150, reorderLevel: 30, lastUpdated: "2024-01-15" },
  { id: "MAT-007", name: "LED Downlight 6W", category: "Lighting", buyPrice: 4.50, sellPrice: 12.00, markup: 167, unit: "each", supplier: "CEF", stockLevel: 80, reorderLevel: 20, lastUpdated: "2024-02-05" },
  { id: "MAT-008", name: "LED Panel 600x600", category: "Lighting", buyPrice: 28.00, sellPrice: 55.00, markup: 96, unit: "each", supplier: "Edmundson", stockLevel: 15, reorderLevel: 5, lastUpdated: "2024-02-05" },
  { id: "MAT-009", name: "Metal Back Box 25mm", category: "Accessories", buyPrice: 0.85, sellPrice: 2.00, markup: 135, unit: "each", supplier: "Toolstation", stockLevel: 500, reorderLevel: 100, lastUpdated: "2024-01-20" },
  { id: "MAT-010", name: "Conduit 20mm 3m", category: "Containment", buyPrice: 1.20, sellPrice: 3.00, markup: 150, unit: "length", supplier: "Edmundson", stockLevel: 60, reorderLevel: 20, lastUpdated: "2024-01-25" },
  { id: "MAT-011", name: "EV Charger 7kW", category: "EV Charging", buyPrice: 380.00, sellPrice: 650.00, markup: 71, unit: "each", supplier: "Schneider", stockLevel: 2, reorderLevel: 1, lastUpdated: "2024-02-12" },
  { id: "MAT-012", name: "32A Type B MCB", category: "Protection", buyPrice: 8.50, sellPrice: 15.00, markup: 76, unit: "each", supplier: "Schneider", stockLevel: 25, reorderLevel: 10, lastUpdated: "2024-02-08" }
];

// NEW: Company Vehicles / Fleet
export const companyVehicles = [
  { id: "VAN-001", registration: "AB21 XYZ", make: "Ford", model: "Transit Custom", colour: "White", assignedTo: "James Wilson", assignedToId: "1", motExpiry: "2024-08-15", taxExpiry: "2024-09-01", insuranceExpiry: "2024-12-31", mileage: 45230, fuelType: "Diesel", status: "Active", lastService: "2024-01-10", nextService: "2024-07-10", trackerFitted: true },
  { id: "VAN-002", registration: "CD22 ABC", make: "Vauxhall", model: "Vivaro", colour: "White", assignedTo: "Sarah Mitchell", assignedToId: "2", motExpiry: "2024-04-20", taxExpiry: "2024-06-01", insuranceExpiry: "2024-12-31", mileage: 32150, fuelType: "Diesel", status: "Active", lastService: "2023-12-05", nextService: "2024-06-05", trackerFitted: true },
  { id: "VAN-003", registration: "EF20 DEF", make: "Ford", model: "Transit Connect", colour: "Silver", assignedTo: "Michael Chen", assignedToId: "5", motExpiry: "2024-11-30", taxExpiry: "2024-12-01", insuranceExpiry: "2024-12-31", mileage: 58420, fuelType: "Diesel", status: "Active", lastService: "2024-02-01", nextService: "2024-08-01", trackerFitted: true },
  { id: "VAN-004", registration: "GH19 GHI", make: "Mercedes", model: "Sprinter", colour: "White", assignedTo: "Emma Thompson", assignedToId: "4", motExpiry: "2024-06-10", taxExpiry: "2024-07-01", insuranceExpiry: "2024-12-31", mileage: 72350, fuelType: "Diesel", status: "On Leave", lastService: "2023-10-15", nextService: "2024-04-15", trackerFitted: true },
  { id: "VAN-005", registration: "JK23 JKL", make: "Ford", model: "Transit Custom", colour: "Blue", assignedTo: "Unassigned", assignedToId: null, motExpiry: "2025-02-28", taxExpiry: "2025-02-01", insuranceExpiry: "2024-12-31", mileage: 8420, fuelType: "Diesel", status: "Available", lastService: "2024-02-10", nextService: "2024-08-10", trackerFitted: true }
];

// NEW: Fuel Logs
export const fuelLogs = [
  { id: "FL-001", vehicleId: "VAN-001", registration: "AB21 XYZ", date: "2024-02-12", litres: 52, cost: 78.50, mileage: 45230, fullTank: true, location: "Shell Manchester", paidBy: "Company Card" },
  { id: "FL-002", vehicleId: "VAN-001", registration: "AB21 XYZ", date: "2024-02-05", litres: 48, cost: 72.00, mileage: 44850, fullTank: true, location: "BP Stockport", paidBy: "Company Card" },
  { id: "FL-003", vehicleId: "VAN-002", registration: "CD22 ABC", date: "2024-02-13", litres: 45, cost: 67.50, mileage: 32150, fullTank: true, location: "Tesco Leeds", paidBy: "Company Card" },
  { id: "FL-004", vehicleId: "VAN-003", registration: "EF20 DEF", date: "2024-02-14", litres: 55, cost: 82.50, mileage: 58420, fullTank: true, location: "Esso Birmingham", paidBy: "Company Card" },
  { id: "FL-005", vehicleId: "VAN-003", registration: "EF20 DEF", date: "2024-02-07", litres: 50, cost: 75.00, mileage: 58000, fullTank: true, location: "Shell Liverpool", paidBy: "Company Card" },
  { id: "FL-006", vehicleId: "VAN-004", registration: "GH19 GHI", date: "2024-02-01", litres: 65, cost: 97.50, mileage: 72350, fullTank: true, location: "BP Manchester", paidBy: "Company Card" }
];

// NEW: Electrician Endorsements (for Labour Bank / Talent Pool)
export const electricianEndorsements = [
  { id: "END-001", electricianId: "AE-001", endorsedBy: "Spark Solutions Ltd", endorserType: "Employer", rating: 5, skills: ["Commercial", "Testing"], comment: "Excellent work on our commercial project. Very thorough testing.", date: "2024-01-20", verified: true, jobRef: "Previous contract" },
  { id: "END-002", electricianId: "AE-001", endorsedBy: "BuildRight Construction", endorserType: "Employer", rating: 4, skills: ["Industrial"], comment: "Good worker, reliable and professional.", date: "2023-11-15", verified: true, jobRef: "Factory rewire" },
  { id: "END-003", electricianId: "AE-002", endorsedBy: "Office Fit Ltd", endorserType: "Employer", rating: 5, skills: ["Commercial", "LED Lighting"], comment: "Chris did a fantastic job on our office lighting upgrade.", date: "2024-02-01", verified: true, jobRef: "Lighting project" },
  { id: "END-004", electricianId: "AE-003", endorsedBy: "HomeServe", endorserType: "Employer", rating: 4, skills: ["Domestic", "Consumer Units"], comment: "Reliable domestic installer.", date: "2023-12-10", verified: true, jobRef: "Multiple domestic jobs" },
  { id: "END-005", electricianId: "AE-004", endorsedBy: "DataCentre Solutions", endorserType: "Employer", rating: 5, skills: ["Data Centres", "Testing"], comment: "Alex is our go-to for critical infrastructure work.", date: "2024-01-05", verified: true, jobRef: "DC maintenance" }
];

// NEW: Skill Match Scores (calculated based on job requirements)
export const skillMatchRequirements = [
  "18th Edition",
  "2391 Testing",
  "EV Charging",
  "Commercial",
  "Industrial",
  "Gold Card",
  "IPAF",
  "Asbestos Awareness"
];

// NEW: Labour Bank Rates (pre-negotiated)
export const labourBankRates = [
  { id: "LBR-001", electricianId: "AE-001", name: "Ryan Hughes", agreedDayRate: 240, agreedHourlyRate: 32, lastWorked: "2024-01-15", totalDaysWorked: 12, rating: 4.8, available: true, nextAvailable: "2024-02-20" },
  { id: "LBR-002", electricianId: "AE-002", name: "Chris Taylor", agreedDayRate: 260, agreedHourlyRate: 35, lastWorked: "2024-02-10", totalDaysWorked: 8, rating: 5.0, available: false, nextAvailable: "2024-03-01" },
  { id: "LBR-003", electricianId: "AE-004", name: "Alex Morrison", agreedDayRate: 280, agreedHourlyRate: 38, lastWorked: null, totalDaysWorked: 0, rating: null, available: true, nextAvailable: "Immediate" }
];

// NEW: Job Photos with categories
export type PhotoCategory = "Before" | "During" | "After" | "Completion" | "Issue";

export interface JobPhoto {
  id: string;
  jobId: string;
  jobTitle: string;
  uploadedBy: string;
  uploadedById: string;
  filename: string;
  category: PhotoCategory;
  timestamp: string;
  location?: { lat: number; lng: number; address: string };
  approved: boolean;
  sharedWithClient: boolean;
  notes: string;
  progressLogId?: string;
}

export const jobPhotos: JobPhoto[] = [
  // Commercial Rewiring - Job 1 - linked to PL-001
  { id: "PHOTO-001", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "James Wilson", uploadedById: "1", filename: "consumer-unit-before.jpg", category: "Before" as PhotoCategory, timestamp: "2024-02-12T08:30:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: true, notes: "Old consumer unit - 1970s wiring, needs complete replacement", progressLogId: "PL-001" },
  { id: "PHOTO-002", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "James Wilson", uploadedById: "1", filename: "old-wiring-mess.jpg", category: "Before" as PhotoCategory, timestamp: "2024-02-12T08:45:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: true, notes: "Existing wiring behind panels - fire risk identified", progressLogId: "PL-001" },
  { id: "PHOTO-003", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "James Wilson", uploadedById: "1", filename: "cable-runs-progress.jpg", category: "During" as PhotoCategory, timestamp: "2024-02-13T14:20:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: true, notes: "New cable runs installed in ceiling void", progressLogId: "PL-001" },
  { id: "PHOTO-004", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "Mike Thompson", uploadedById: "2", filename: "containment-install.jpg", category: "During" as PhotoCategory, timestamp: "2024-02-14T10:15:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: false, notes: "Cable tray and trunking installation" },
  { id: "PHOTO-005", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "James Wilson", uploadedById: "1", filename: "new-db-installed.jpg", category: "After" as PhotoCategory, timestamp: "2024-02-15T16:00:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: true, notes: "New 24-way distribution board installed and labelled", progressLogId: "PL-002" },
  
  // New Build Installation - Job 2 - linked to PL-003
  { id: "PHOTO-006", jobId: "2", jobTitle: "New Build Installation", uploadedBy: "Sarah Chen", uploadedById: "3", filename: "first-fix-cables.jpg", category: "During" as PhotoCategory, timestamp: "2024-02-10T09:00:00", location: { lat: 51.4816, lng: -0.0085, address: "Plot 14 Riverside" }, approved: true, sharedWithClient: true, notes: "First fix cabling in master bedroom", progressLogId: "PL-003" },
  { id: "PHOTO-007", jobId: "2", jobTitle: "New Build Installation", uploadedBy: "Sarah Chen", uploadedById: "3", filename: "back-boxes-installed.jpg", category: "During" as PhotoCategory, timestamp: "2024-02-10T11:30:00", location: { lat: 51.4816, lng: -0.0085, address: "Plot 14 Riverside" }, approved: true, sharedWithClient: false, notes: "Back boxes installed throughout ground floor", progressLogId: "PL-003" },
  { id: "PHOTO-008", jobId: "2", jobTitle: "New Build Installation", uploadedBy: "Mike Thompson", uploadedById: "2", filename: "kitchen-wiring.jpg", category: "During" as PhotoCategory, timestamp: "2024-02-11T14:00:00", location: { lat: 51.4816, lng: -0.0085, address: "Plot 14 Riverside" }, approved: true, sharedWithClient: true, notes: "Kitchen appliance circuits roughed in", progressLogId: "PL-003" },
  
  // Emergency Repair - Job 3
  { id: "PHOTO-009", jobId: "3", jobTitle: "Emergency Repair", uploadedBy: "James Wilson", uploadedById: "1", filename: "fault-location.jpg", category: "Before" as PhotoCategory, timestamp: "2024-02-08T19:30:00", location: { lat: 51.5155, lng: -0.1420, address: "8 Oxford Street" }, approved: true, sharedWithClient: true, notes: "Burnt out connection at main isolator" },
  { id: "PHOTO-010", jobId: "3", jobTitle: "Emergency Repair", uploadedBy: "James Wilson", uploadedById: "1", filename: "repair-complete.jpg", category: "Completion" as PhotoCategory, timestamp: "2024-02-08T22:15:00", location: { lat: 51.5155, lng: -0.1420, address: "8 Oxford Street" }, approved: true, sharedWithClient: true, notes: "Isolator replaced, power restored" },
  
  // EV Charging Points - Job 4
  { id: "PHOTO-011", jobId: "4", jobTitle: "EV Charging Points", uploadedBy: "Tom Brown", uploadedById: "5", filename: "ev-unit-position.jpg", category: "Before" as PhotoCategory, timestamp: "2024-01-15T08:00:00", location: { lat: 51.4545, lng: -0.9786, address: "Tech Park, Reading" }, approved: true, sharedWithClient: true, notes: "Marked position for EV chargers" },
  { id: "PHOTO-012", jobId: "4", jobTitle: "EV Charging Points", uploadedBy: "Tom Brown", uploadedById: "5", filename: "groundworks-trench.jpg", category: "During" as PhotoCategory, timestamp: "2024-01-16T10:30:00", location: { lat: 51.4545, lng: -0.9786, address: "Tech Park, Reading" }, approved: true, sharedWithClient: true, notes: "Cable trench to car park" },
  { id: "PHOTO-013", jobId: "4", jobTitle: "EV Charging Points", uploadedBy: "Mike Thompson", uploadedById: "2", filename: "ev-chargers-installed.jpg", category: "After" as PhotoCategory, timestamp: "2024-01-18T15:00:00", location: { lat: 51.4545, lng: -0.9786, address: "Tech Park, Reading" }, approved: true, sharedWithClient: true, notes: "All 20 EV charging points installed and tested" },
  { id: "PHOTO-014", jobId: "4", jobTitle: "EV Charging Points", uploadedBy: "Mike Thompson", uploadedById: "2", filename: "ev-chargers-night.jpg", category: "Completion" as PhotoCategory, timestamp: "2024-01-19T18:00:00", location: { lat: 51.4545, lng: -0.9786, address: "Tech Park, Reading" }, approved: true, sharedWithClient: true, notes: "Night shot of illuminated charging bays" },
  
  // Industrial Panel Upgrade - Job 5 - linked to PL-004
  { id: "PHOTO-015", jobId: "5", jobTitle: "Industrial Panel Upgrade", uploadedBy: "David Rodriguez", uploadedById: "4", filename: "old-panel-state.jpg", category: "Before" as PhotoCategory, timestamp: "2024-01-20T07:00:00", location: { lat: 51.5033, lng: -0.0193, address: "Warehouse 7, Docklands" }, approved: true, sharedWithClient: true, notes: "Existing panel - obsolete components", progressLogId: "PL-004" },
  { id: "PHOTO-016", jobId: "5", jobTitle: "Industrial Panel Upgrade", uploadedBy: "David Rodriguez", uploadedById: "4", filename: "panel-stripped.jpg", category: "During" as PhotoCategory, timestamp: "2024-01-22T12:00:00", location: { lat: 51.5033, lng: -0.0193, address: "Warehouse 7, Docklands" }, approved: true, sharedWithClient: false, notes: "Old components removed, backplate cleaned", progressLogId: "PL-004" },
  { id: "PHOTO-017", jobId: "5", jobTitle: "Industrial Panel Upgrade", uploadedBy: "David Rodriguez", uploadedById: "4", filename: "new-panel-wiring.jpg", category: "During" as PhotoCategory, timestamp: "2024-01-24T14:30:00", location: { lat: 51.5033, lng: -0.0193, address: "Warehouse 7, Docklands" }, approved: true, sharedWithClient: true, notes: "New components installed, wiring in progress", progressLogId: "PL-004" },
  { id: "PHOTO-018", jobId: "5", jobTitle: "Industrial Panel Upgrade", uploadedBy: "David Rodriguez", uploadedById: "4", filename: "panel-complete.jpg", category: "After" as PhotoCategory, timestamp: "2024-01-26T16:00:00", location: { lat: 51.5033, lng: -0.0193, address: "Warehouse 7, Docklands" }, approved: true, sharedWithClient: true, notes: "Completed panel with updated schematic", progressLogId: "PL-004" },
  
  // Issue photos
  { id: "PHOTO-019", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "James Wilson", uploadedById: "1", filename: "damaged-cable-found.jpg", category: "Issue" as PhotoCategory, timestamp: "2024-02-13T11:00:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: false, notes: "Rodent damage found on existing cables - reported to client", progressLogId: "PL-002" },
  { id: "PHOTO-020", jobId: "2", jobTitle: "New Build Installation", uploadedBy: "Sarah Chen", uploadedById: "3", filename: "plumber-damage.jpg", category: "Issue" as PhotoCategory, timestamp: "2024-02-11T09:30:00", location: { lat: 51.4816, lng: -0.0085, address: "Plot 14 Riverside" }, approved: true, sharedWithClient: true, notes: "Cable damaged by plumber - rerouting required" },
  { id: "PHOTO-021", jobId: "5", jobTitle: "Industrial Panel Upgrade", uploadedBy: "David Rodriguez", uploadedById: "4", filename: "asbestos-found.jpg", category: "Issue" as PhotoCategory, timestamp: "2024-01-21T08:45:00", location: { lat: 51.5033, lng: -0.0193, address: "Warehouse 7, Docklands" }, approved: true, sharedWithClient: true, notes: "Suspected asbestos behind panel - awaiting survey" },
  
  // More recent photos
  { id: "PHOTO-022", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "Mike Thompson", uploadedById: "2", filename: "testing-in-progress.jpg", category: "During" as PhotoCategory, timestamp: "2024-02-16T10:00:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: false, sharedWithClient: false, notes: "Live testing in progress" },
  { id: "PHOTO-023", jobId: "1", jobTitle: "Commercial Rewiring", uploadedBy: "James Wilson", uploadedById: "1", filename: "final-labels.jpg", category: "Completion" as PhotoCategory, timestamp: "2024-02-17T14:00:00", location: { lat: 51.5074, lng: -0.1278, address: "45 Victoria Street" }, approved: true, sharedWithClient: true, notes: "All circuits labelled and documented" },
  { id: "PHOTO-024", jobId: "6", jobTitle: "Solar Installation", uploadedBy: "Tom Brown", uploadedById: "5", filename: "roof-survey.jpg", category: "Before" as PhotoCategory, timestamp: "2024-02-18T09:00:00", location: { lat: 51.4025, lng: -0.3358, address: "12 Elm Road, Kingston" }, approved: true, sharedWithClient: true, notes: "Roof survey for solar panel placement" }
];

// Holiday Allowances
export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'compassionate' | 'training' | 'bank_holiday';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface HolidayAllowance {
  id: string;
  employeeId: string;
  yearStart: string;
  yearEnd: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  carriedOver: number;
  bankHolidays: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  halfDay?: 'am' | 'pm';
  totalDays: number;
  status: LeaveStatus;
  reason?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedReason?: string;
  createdAt: string;
}

export const holidayAllowances: HolidayAllowance[] = [
  { id: "HA-001", employeeId: "1", yearStart: "2024-01-01", yearEnd: "2024-12-31", totalDays: 28, usedDays: 5, pendingDays: 3, carriedOver: 2, bankHolidays: 8 },
  { id: "HA-002", employeeId: "2", yearStart: "2024-01-01", yearEnd: "2024-12-31", totalDays: 28, usedDays: 8, pendingDays: 0, carriedOver: 0, bankHolidays: 8 },
  { id: "HA-003", employeeId: "3", yearStart: "2024-01-01", yearEnd: "2024-12-31", totalDays: 28, usedDays: 2, pendingDays: 5, carriedOver: 0, bankHolidays: 8 },
  { id: "HA-004", employeeId: "4", yearStart: "2024-01-01", yearEnd: "2024-12-31", totalDays: 28, usedDays: 10, pendingDays: 0, carriedOver: 3, bankHolidays: 8 },
  { id: "HA-005", employeeId: "5", yearStart: "2024-01-01", yearEnd: "2024-12-31", totalDays: 28, usedDays: 4, pendingDays: 2, carriedOver: 0, bankHolidays: 8 },
  { id: "HA-006", employeeId: "6", yearStart: "2024-01-01", yearEnd: "2024-12-31", totalDays: 28, usedDays: 6, pendingDays: 0, carriedOver: 5, bankHolidays: 8 },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "LR-001", employeeId: "1", employeeName: "James Wilson", type: "annual", startDate: "2024-03-04", endDate: "2024-03-06", totalDays: 3, status: "pending", reason: "Family holiday", createdAt: "2024-02-15T10:00:00" },
  { id: "LR-002", employeeId: "3", employeeName: "David Brown", type: "annual", startDate: "2024-03-18", endDate: "2024-03-22", totalDays: 5, status: "pending", reason: "Visiting family", createdAt: "2024-02-14T14:30:00" },
  { id: "LR-003", employeeId: "5", employeeName: "Michael Chen", type: "training", startDate: "2024-02-26", endDate: "2024-02-27", totalDays: 2, status: "pending", reason: "EV Charging Course", createdAt: "2024-02-10T09:00:00" },
  { id: "LR-004", employeeId: "4", employeeName: "Emma Thompson", type: "annual", startDate: "2024-02-10", endDate: "2024-02-20", totalDays: 7, status: "approved", reason: "Annual leave", approvedBy: "Lisa Parker", approvedDate: "2024-02-01", createdAt: "2024-01-25T11:00:00" },
  { id: "LR-005", employeeId: "2", employeeName: "Sarah Mitchell", type: "sick", startDate: "2024-02-05", endDate: "2024-02-05", totalDays: 1, status: "approved", reason: "Unwell", approvedBy: "Lisa Parker", approvedDate: "2024-02-05", createdAt: "2024-02-05T08:00:00" },
  { id: "LR-006", employeeId: "1", employeeName: "James Wilson", type: "annual", startDate: "2024-01-02", endDate: "2024-01-05", totalDays: 4, status: "approved", reason: "New Year break", approvedBy: "Lisa Parker", approvedDate: "2023-12-15", createdAt: "2023-12-10T10:00:00" },
  { id: "LR-007", employeeId: "6", employeeName: "Lisa Parker", type: "compassionate", startDate: "2024-01-15", endDate: "2024-01-17", totalDays: 3, status: "approved", reason: "Family bereavement", approvedBy: "System", approvedDate: "2024-01-15", createdAt: "2024-01-15T07:00:00" },
  { id: "LR-008", employeeId: "2", employeeName: "Sarah Mitchell", type: "annual", startDate: "2024-04-15", endDate: "2024-04-19", totalDays: 5, status: "rejected", reason: "Holiday", rejectedReason: "Too many people already off", createdAt: "2024-02-01T10:00:00" },
];
