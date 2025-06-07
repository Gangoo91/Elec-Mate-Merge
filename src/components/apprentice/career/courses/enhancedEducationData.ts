
// Enhanced further education data with comprehensive UK educational pathways

export interface EnhancedEducationOption {
  id: number;
  title: string;
  institution: string;
  description: string;
  level: string;
  duration: string;
  entryRequirements: string;
  progressionOptions: string;
  keyTopics: string[];
  locations: string[];
  category: string;
  deliveryMethods: string[];
  cost: string;
  fundingOptions: string[];
  careerOutcomes: string[];
  employmentRate: number;
  averageStartingSalary: string;
  professionalAccreditation: string[];
  nextIntakes: string[];
  applicationDeadline: string;
  rating: number;
  studyMode: "Full-time" | "Part-time" | "Distance Learning" | "Flexible";
  industryDemand: "High" | "Medium" | "Low";
  futureProofing: number; // 1-5 scale
}

export interface EducationProvider {
  id: number;
  name: string;
  type: "University" | "College" | "Training Provider";
  location: string;
  address: string;
  contact: string;
  website: string;
  establishedYear: number;
  studentSatisfaction: number;
  employmentRate: number;
  courses: string[];
  specializations: string[];
  facilities: string[];
  accreditations: string[];
  supportServices: string[];
  campusImages?: string[];
  virtualTourAvailable: boolean;
}

export interface FundingOption {
  id: number;
  name: string;
  type: "Loan" | "Grant" | "Scholarship" | "Employer Support";
  description: string;
  eligibility: string[];
  amount: string;
  repaymentTerms?: string;
  applicationProcess: string;
  deadline?: string;
  provider: string;
}

export interface CareerPathway {
  id: number;
  name: string;
  description: string;
  educationSteps: Array<{
    level: string;
    duration: string;
    requirements: string;
  }>;
  salaryProgression: Array<{
    stage: string;
    salary: string;
    experience: string;
  }>;
  jobRoles: string[];
  industryGrowth: string;
  futureOutlook: string;
}

export const educationCategories = [
  "All Categories",
  "Higher National Certificates (HNC)",
  "Higher National Diplomas (HND)",
  "Bachelor's Degrees",
  "Master's Degrees",
  "Professional Certifications",
  "Apprenticeship Progressions"
];

export const studyModes = [
  "All Study Modes",
  "Full-time",
  "Part-time", 
  "Distance Learning",
  "Flexible"
];

export const enhancedEducationOptions: EnhancedEducationOption[] = [
  {
    id: 1,
    title: "HNC Electrical Engineering",
    institution: "UK Colleges",
    description: "Higher National Certificate providing advanced electrical theory and practical skills for technical roles in the electrical industry.",
    level: "Level 4",
    duration: "1-2 years",
    entryRequirements: "Level 3 qualification or relevant work experience (minimum 3 years)",
    progressionOptions: "HND, Foundation degree, direct employment in technical roles",
    keyTopics: ["Electrical principles", "Engineering mathematics", "Digital electronics", "Project management", "Health & safety", "Quality systems"],
    locations: ["Birmingham", "Manchester", "London", "Glasgow", "Cardiff", "Leeds", "Bristol", "Newcastle"],
    category: "Higher National Certificates (HNC)",
    deliveryMethods: ["Classroom", "Blended Learning", "Evening Classes", "Block Release"],
    cost: "£2,500 - £4,500 per year",
    fundingOptions: ["Advanced Learner Loan", "Employer Sponsorship", "Self-funded"],
    careerOutcomes: [
      "Electrical Technician",
      "Maintenance Engineer", 
      "Design Technician",
      "Quality Control Specialist",
      "Technical Sales Engineer"
    ],
    employmentRate: 92,
    averageStartingSalary: "£24,000 - £28,000",
    professionalAccreditation: ["IET Associate Membership", "Engineering Council EngTech"],
    nextIntakes: ["September 2025", "January 2026"],
    applicationDeadline: "31st August 2025",
    rating: 4.6,
    studyMode: "Part-time",
    industryDemand: "High",
    futureProofing: 4
  },
  {
    id: 2,
    title: "HND Electrical & Electronic Engineering",
    institution: "FE Colleges & Universities",
    description: "Higher National Diploma offering comprehensive electrical and electronic engineering knowledge with strong industry links.",
    level: "Level 5",
    duration: "2 years full-time, 3-4 years part-time",
    entryRequirements: "Level 3 qualification, HNC, or equivalent experience",
    progressionOptions: "Final year bachelor's degree entry, technical management roles",
    keyTopics: ["Power systems", "Electronic design", "Control systems", "Industrial applications", "Project management", "Research methods"],
    locations: ["Liverpool", "Newcastle", "Nottingham", "Plymouth", "Belfast", "Edinburgh", "Southampton"],
    category: "Higher National Diplomas (HND)",
    deliveryMethods: ["Full-time", "Part-time", "Sandwich Year", "Distance Learning"],
    cost: "£3,000 - £6,000 per year",
    fundingOptions: ["Advanced Learner Loan", "Employer Sponsorship", "Student Finance", "Scholarships"],
    careerOutcomes: [
      "Senior Electrical Technician",
      "Engineering Technologist",
      "Project Engineer",
      "Technical Manager",
      "Systems Analyst"
    ],
    employmentRate: 94,
    averageStartingSalary: "£26,000 - £32,000",
    professionalAccreditation: ["IET Professional Registration", "Engineering Council EngTech"],
    nextIntakes: ["September 2025", "February 2026"],
    applicationDeadline: "30th June 2025",
    rating: 4.7,
    studyMode: "Full-time",
    industryDemand: "High",
    futureProofing: 5
  },
  {
    id: 3,
    title: "BEng (Hons) Electrical Engineering",
    institution: "Universities",
    description: "Honours degree in electrical engineering covering all aspects from power systems to electronics and renewable energy.",
    level: "Level 6",
    duration: "3-4 years full-time, 5-6 years part-time",
    entryRequirements: "A-Levels (BBB-AAB), BTEC Level 3 (DMM-D*D*D*), or HNC/HND with good grades",
    progressionOptions: "Master's degree, graduate schemes, chartered engineer pathway",
    keyTopics: ["Advanced electrical systems", "Power engineering", "Control systems", "Renewable energy", "Professional practice", "Final year project"],
    locations: ["London", "Manchester", "Edinburgh", "Bristol", "Sheffield", "Birmingham", "Cambridge", "Imperial College"],
    category: "Bachelor's Degrees", 
    deliveryMethods: ["Full-time", "Part-time", "Sandwich Year", "Distance Learning"],
    cost: "£9,250 per year (UK students), £20,000+ (International)",
    fundingOptions: ["Student Finance", "Maintenance Loan", "Scholarships", "Employer Sponsorship"],
    careerOutcomes: [
      "Graduate Engineer",
      "Design Engineer", 
      "Project Engineer",
      "Research & Development",
      "Technical Consultant"
    ],
    employmentRate: 96,
    averageStartingSalary: "£28,000 - £35,000",
    professionalAccreditation: ["IET Membership", "Engineering Council CEng pathway", "CIOB"],
    nextIntakes: ["September 2025"],
    applicationDeadline: "15th January 2025 (UCAS)",
    rating: 4.8,
    studyMode: "Full-time",
    industryDemand: "High",
    futureProofing: 5
  },
  {
    id: 4,
    title: "MSc Renewable Energy Systems",
    institution: "Universities",
    description: "Advanced master's degree specialising in renewable energy technologies and sustainable electrical systems.",
    level: "Level 7",
    duration: "1 year full-time, 2-3 years part-time",
    entryRequirements: "Bachelor's degree (2:1 or above) in electrical/electronic engineering or related field",
    progressionOptions: "PhD research, senior engineering roles, energy consultancy, R&D positions",
    keyTopics: ["Solar PV systems", "Wind energy", "Energy storage", "Grid integration", "Policy & economics", "Research dissertation"],
    locations: ["London", "Cambridge", "Manchester", "Leeds", "Southampton", "Strathclyde", "Cranfield"],
    category: "Master's Degrees",
    deliveryMethods: ["Full-time", "Part-time", "Distance Learning", "Executive Programme"],
    cost: "£12,000 - £25,000 per year",
    fundingOptions: ["Postgraduate Loan", "Research Councils", "Industry Sponsorship", "Scholarships"],
    careerOutcomes: [
      "Senior Energy Engineer",
      "Renewable Energy Consultant",
      "Research Scientist",
      "Energy Policy Advisor",
      "Project Development Manager"
    ],
    employmentRate: 98,
    averageStartingSalary: "£35,000 - £45,000",
    professionalAccreditation: ["IET Chartered Engineer", "Energy Institute", "CIBSE"],
    nextIntakes: ["September 2025", "January 2026"],
    applicationDeadline: "31st July 2025",
    rating: 4.9,
    studyMode: "Full-time",
    industryDemand: "High",
    futureProofing: 5
  },
  {
    id: 5,
    title: "Foundation Degree Electrical Installation",
    institution: "FE Colleges",
    description: "Work-based foundation degree combining practical electrical skills with academic study, ideal for working electricians.",
    level: "Level 5",
    duration: "2-3 years part-time",
    entryRequirements: "Level 3 electrical qualification and current employment in electrical industry",
    progressionOptions: "Top-up to full honours degree, senior technician roles, supervisory positions",
    keyTopics: ["Advanced installation techniques", "Business management", "Quality systems", "Health & safety law", "Sustainable technologies"],
    locations: ["Various FE Colleges nationwide", "Work-based delivery"],
    category: "Bachelor's Degrees",
    deliveryMethods: ["Work-based learning", "Block release", "Evening classes", "Online support"],
    cost: "£2,000 - £4,000 per year",
    fundingOptions: ["Advanced Learner Loan", "Employer Support", "Apprenticeship Levy"],
    careerOutcomes: [
      "Senior Electrician",
      "Electrical Supervisor",
      "Site Manager",
      "Electrical Inspector",
      "Business Owner"
    ],
    employmentRate: 95,
    averageStartingSalary: "£30,000 - £38,000",
    professionalAccreditation: ["JIB Grading", "NICEIC Approved Contractor", "ECA Membership"],
    nextIntakes: ["September 2025", "January 2026", "May 2026"],
    applicationDeadline: "Rolling admissions",
    rating: 4.5,
    studyMode: "Part-time",
    industryDemand: "High",
    futureProofing: 4
  },
  {
    id: 6,
    title: "MEng Electrical and Electronic Engineering",
    institution: "Russell Group Universities",
    description: "Integrated master's degree providing the most direct route to chartered engineer status with industry placement year.",
    level: "Level 7",
    duration: "4 years full-time (including placement year)",
    entryRequirements: "A-Levels AAB-A*A*A (including Maths and Physics)",
    progressionOptions: "Direct entry to graduate schemes, chartered engineer fast-track, PhD research",
    keyTopics: ["Advanced electrical theory", "Power systems design", "Digital signal processing", "Management skills", "Innovation & entrepreneurship"],
    locations: ["Cambridge", "Imperial College London", "Manchester", "Edinburgh", "Bristol", "Southampton"],
    category: "Master's Degrees",
    deliveryMethods: ["Full-time", "Sandwich with industry placement"],
    cost: "£9,250 per year (UK students)",
    fundingOptions: ["Student Finance", "University Scholarships", "Industry Bursaries"],
    careerOutcomes: [
      "Graduate Engineer (Fast-track)",
      "Research Engineer",
      "Technical Lead",
      "Innovation Manager",
      "Chartered Engineer pathway"
    ],
    employmentRate: 99,
    averageStartingSalary: "£32,000 - £42,000",
    professionalAccreditation: ["IET Chartered Engineer pathway", "Engineering Council CEng"],
    nextIntakes: ["September 2025"],
    applicationDeadline: "15th January 2025 (UCAS)",
    rating: 4.9,
    studyMode: "Full-time",
    industryDemand: "High",
    futureProofing: 5
  }
];

export const educationProviders: EducationProvider[] = [
  {
    id: 1,
    name: "Birmingham City University",
    type: "University",
    location: "Birmingham",
    address: "University House, 15 Bartholomew Row, Birmingham B5 5JU",
    contact: "0121 331 5000",
    website: "www.bcu.ac.uk",
    establishedYear: 1843,
    studentSatisfaction: 85,
    employmentRate: 92,
    courses: ["BEng Electrical Engineering", "HNC Electrical Engineering", "MSc Renewable Energy"],
    specializations: ["Power Systems", "Renewable Energy", "Building Services"],
    facilities: ["Modern laboratories", "Industry partnerships", "Research centres", "CAD suites"],
    accreditations: ["IET Accredited", "Engineering Council", "QAA Approved"],
    supportServices: ["Career guidance", "Industry placements", "Academic support", "Financial advice"],
    virtualTourAvailable: true
  },
  {
    id: 2,
    name: "University of Manchester",
    type: "University", 
    location: "Manchester",
    address: "Oxford Road, Manchester M13 9PL",
    contact: "0161 275 2000",
    website: "www.manchester.ac.uk",
    establishedYear: 1824,
    studentSatisfaction: 88,
    employmentRate: 95,
    courses: ["MEng Electrical Engineering", "BEng Electronic Engineering", "MSc Power Systems"],
    specializations: ["Power Engineering", "Electronics", "Communications"],
    facilities: ["State-of-the-art labs", "Research facilities", "Industry links", "Innovation hub"],
    accreditations: ["Russell Group", "IET Accredited", "Engineering Council"],
    supportServices: ["Graduate employment service", "Research opportunities", "Industry mentoring"],
    virtualTourAvailable: true
  },
  {
    id: 3,
    name: "Blackpool and The Fylde College",
    type: "College",
    location: "Blackpool",
    address: "Ashfield Road, Bispham, Blackpool FY2 0HB",
    contact: "01253 504343",
    website: "www.blackpool.ac.uk",
    establishedYear: 1906,
    studentSatisfaction: 87,
    employmentRate: 89,
    courses: ["HNC Electrical Engineering", "HND Electrical Engineering", "Foundation Degree"],
    specializations: ["Electrical Installation", "Industrial Systems", "Renewable Energy"],
    facilities: ["Industry-standard workshops", "Employer partnerships", "Modern classrooms"],
    accreditations: ["City & Guilds", "Pearson Approved", "EAL Centre"],
    supportServices: ["Work placement support", "Employer links", "Flexible study options"],
    virtualTourAvailable: false
  }
];

export const fundingOptions: FundingOption[] = [
  {
    id: 1,
    name: "Advanced Learner Loan",
    type: "Loan",
    description: "Government loan for Level 3, 4, 5 and 6 qualifications at approved colleges and training organisations.",
    eligibility: ["19+ years old", "UK resident for 3+ years", "Studying eligible qualification"],
    amount: "Up to £25,000+ depending on course",
    repaymentTerms: "Only repay when earning over £25,000/year, 9% on earnings above threshold",
    applicationProcess: "Apply through college or training provider, no credit checks required",
    deadline: "Apply when enrolling on course",
    provider: "Student Loans Company"
  },
  {
    id: 2,
    name: "Employer Sponsorship",
    type: "Employer Support",
    description: "Many employers will fund further education that benefits their business operations.",
    eligibility: ["Current employee", "Course relevant to role", "Employer agreement"],
    amount: "Varies by employer - often full course fees plus study time",
    applicationProcess: "Discuss with line manager and HR department, submit business case",
    provider: "Your employer"
  },
  {
    id: 3,
    name: "IET Scholarship Scheme",
    type: "Scholarship",
    description: "Financial support for electrical engineering students from the Institution of Engineering and Technology.",
    eligibility: ["Studying accredited engineering course", "Demonstrate financial need", "Academic merit"],
    amount: "£1,000 - £5,000 per year",
    applicationProcess: "Online application with supporting documents and references",
    deadline: "31st March annually",
    provider: "Institution of Engineering and Technology"
  }
];

export const careerPathways: CareerPathway[] = [
  {
    id: 1,
    name: "Technical Leadership Pathway",
    description: "Progress from technician to senior technical leadership roles in electrical engineering.",
    educationSteps: [
      { level: "HNC (Level 4)", duration: "1-2 years", requirements: "Level 3 + experience" },
      { level: "HND (Level 5)", duration: "1-2 years", requirements: "HNC or equivalent" },
      { level: "BEng (Level 6)", duration: "1-2 years top-up", requirements: "HND with good grades" }
    ],
    salaryProgression: [
      { stage: "Senior Technician", salary: "£28,000 - £35,000", experience: "HNC + 2 years" },
      { stage: "Technical Manager", salary: "£35,000 - £45,000", experience: "HND + 3 years" },
      { stage: "Engineering Manager", salary: "£45,000 - £60,000+", experience: "Degree + 5 years" }
    ],
    jobRoles: ["Senior Technician", "Technical Manager", "Engineering Manager", "Project Director"],
    industryGrowth: "8% year-on-year demand increase",
    futureOutlook: "Excellent - increasing complexity of electrical systems requires qualified technical leaders"
  },
  {
    id: 2,
    name: "Renewable Energy Specialist",
    description: "Specialise in the rapidly growing renewable energy sector with cutting-edge technology focus.",
    educationSteps: [
      { level: "Foundation in Renewables", duration: "6 months", requirements: "Electrical qualification" },
      { level: "BEng Electrical Engineering", duration: "3-4 years", requirements: "Level 3 or foundation" },
      { level: "MSc Renewable Energy", duration: "1 year", requirements: "Bachelor's degree 2:1+" }
    ],
    salaryProgression: [
      { stage: "Graduate Engineer", salary: "£28,000 - £35,000", experience: "Degree entry level" },
      { stage: "Senior Engineer", salary: "£35,000 - £50,000", experience: "3-5 years experience" },
      { stage: "Lead Consultant", salary: "£50,000 - £80,000+", experience: "Master's + 5+ years" }
    ],
    jobRoles: ["Solar PV Engineer", "Wind Technician", "Energy Consultant", "Grid Integration Specialist"],
    industryGrowth: "45% year-on-year in solar and wind sectors",
    futureOutlook: "Outstanding - government net-zero commitments driving massive investment"
  }
];
