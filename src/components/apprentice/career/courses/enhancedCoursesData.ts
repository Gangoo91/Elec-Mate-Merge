
// Enhanced course data with comprehensive UK electrical industry information

export interface EnhancedCareerCourse {
  id: number | string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  mode: string;
  location: string;
  level: string;
  price: string;
  format: string;
  nextDates: string[];
  rating: number;
  locations: string[];
  category: string;
  industryDemand: "High" | "Medium" | "Low";
  futureProofing: number; // 1-5 scale
  salaryImpact: string;
  careerOutcomes: string[];
  accreditation: string[];
  employerSupport: boolean;
  prerequisites: string[];
  courseOutline: string[];
  assessmentMethod: string;
  continuousAssessment: boolean;
  isLive?: boolean;
  external_url?: string;
  source?: string;
}

export interface EnhancedTrainingCenter {
  id: number;
  name: string;
  location: string;
  address: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  website: string;
  courses: string[];
  specializations: string[];
  facilities: string[];
  accreditations: string[];
  supportServices: string[];
  establishedYear: number;
  successRate: number;
  employmentRate: number;
  studentCapacity: number;
  rating: number;
}

export interface CourseAnalytics {
  totalCourses: number;
  totalProviders: number;
  averageRating: number;
  highDemandCourses: number;
  emergingTechCourses: number;
  averageSalaryImpact: string;
  topCategories: Array<{ name: string; count: number }>;
}

export const courseCategories = [
  "All Categories",
  "Essential Qualifications",
  "Emerging Technologies", 
  "Safety & Compliance",
  "Specialised Skills",
  "Business & Management"
];

export const enhancedCareerCourses: EnhancedCareerCourse[] = [
  {
    id: 1,
    title: "18th Edition Wiring Regulations (BS 7671:2018+A2:2022)",
    provider: "NICEIC Academy",
    description: "Comprehensive training on the latest IET Wiring Regulations, covering all amendments and updates essential for UK electrical installations.",
    duration: "3 days",
    mode: "Intensive",
    location: "London",
    level: "Intermediate",
    price: "£395 - £495",
    format: "Classroom, Online, Blended Learning",
    nextDates: ["15 June 2025", "22 July 2025", "18 August 2025", "15 September 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow", "Cardiff", "Online"],
    category: "Essential Qualifications",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£2,000 - £4,000 annual increase",
    careerOutcomes: [
      "Qualify for Level 3 electrical installations",
      "Meet legal requirements for electrical work",
      "Enhance professional credibility",
      "Access to higher-paid roles"
    ],
    accreditation: ["City & Guilds 2382-22", "EAL 600/4338/6", "NICEIC Approved"],
    employerSupport: true,
    prerequisites: ["Basic electrical knowledge", "Level 2 electrical qualification preferred"],
    courseOutline: [
      "Part 1: Scope and fundamental principles",
      "Part 2: Definitions and requirements",
      "Part 3: Assessment of general characteristics",
      "Part 4: Protection for safety",
      "Part 5: Selection and erection of equipment",
      "Part 6: Inspection and testing",
      "Part 7: Special installations"
    ],
    assessmentMethod: "Online examination (2 hours)",
    continuousAssessment: false
  },
  {
    id: 2,
    title: "Inspection & Testing (2391-52)",
    provider: "City & Guilds Centres",
    description: "Advanced practical training for electrical installation inspection, testing and verification to BS 7671 standards.",
    duration: "5 days",
    mode: "Full-time",
    location: "Cardiff",
    level: "Advanced", 
    price: "£695 - £895",
    format: "Classroom with extensive practical assessments",
    nextDates: ["10 June 2025", "14 July 2025", "11 September 2025", "9 October 2025"],
    rating: 4.7,
    locations: ["Cardiff", "Newcastle", "London", "Edinburgh", "Bristol"],
    category: "Essential Qualifications",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£3,000 - £6,000 annual increase",
    careerOutcomes: [
      "Become a qualified electrical inspector",
      "Conduct EICR reports",
      "Self-employment opportunities",
      "Supervisory roles"
    ],
    accreditation: ["City & Guilds 2391-52", "EAL equivalent", "JIB recognised"],
    employerSupport: true,
    prerequisites: ["18th Edition certificate", "AM2S or equivalent", "Practical electrical experience"],
    courseOutline: [
      "Legal requirements and responsibilities",
      "Testing procedures and sequences",
      "Use of test instruments",
      "Inspection techniques",
      "Certification and reporting",
      "Practical assessments"
    ],
    assessmentMethod: "Practical assessment and written exam",
    continuousAssessment: true
  },
  {
    id: 3,
    title: "Electric Vehicle Charging Installation",
    provider: "ECA Training",
    description: "Specialised certification for installing domestic and commercial EV charging points, covering Mode 3 charging systems.",
    duration: "2 days",
    mode: "Part-time",
    location: "Bristol",
    level: "Intermediate",
    price: "£425 - £525",
    format: "Blended learning with hands-on practical sessions",
    nextDates: ["5 June 2025", "3 August 2025", "7 October 2025", "21 November 2025"],
    rating: 4.9,
    locations: ["Bristol", "London", "Manchester", "Leeds", "Southampton"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£4,000 - £8,000 annual increase",
    careerOutcomes: [
      "EV charging specialist certification",
      "Access to growing EV market",
      "Increased earning potential",
      "Future-proof career specialization"
    ],
    accreditation: ["City & Guilds 2919-05", "ECA Approved", "OLEV Grant eligible"],
    employerSupport: true,
    prerequisites: ["18th Edition", "AM2 or equivalent practical qualification"],
    courseOutline: [
      "EV charging technology overview",
      "Installation requirements",
      "Safety considerations",
      "Load balancing and smart charging",
      "Testing and commissioning",
      "Grant schemes and regulations"
    ],
    assessmentMethod: "Practical installation assessment",
    continuousAssessment: true
  },
  {
    id: 4,
    title: "Smart Building Automation Systems",
    provider: "KNX UK Association",
    description: "Advanced training in intelligent building control systems, IoT integration, and smart home technologies.",
    duration: "5 days",
    mode: "Full-time",
    location: "London",
    level: "Advanced",
    price: "£1,295 - £1,595",
    format: "Intensive practical workshop with certification",
    nextDates: ["24 June 2025", "22 July 2025", "19 September 2025", "17 November 2025"],
    rating: 4.9,
    locations: ["London", "Manchester", "Bristol"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£6,000 - £12,000 annual increase",
    careerOutcomes: [
      "KNX Partner certification",
      "Smart building specialist",
      "High-value project opportunities",
      "Technology leadership roles"
    ],
    accreditation: ["KNX Association", "City & Guilds recognition", "BIM Level 2"],
    employerSupport: false,
    prerequisites: ["Advanced electrical qualification", "Basic programming knowledge helpful"],
    courseOutline: [
      "KNX fundamentals and topology",
      "ETS software programming",
      "Sensor and actuator configuration",
      "System integration and commissioning",
      "Troubleshooting and maintenance",
      "Project design and specification"
    ],
    assessmentMethod: "Practical programming project and exam",
    continuousAssessment: true
  },
  {
    id: 5,
    title: "Fire Alarm Systems (BS 5839)",
    provider: "FIA Training",
    description: "Comprehensive training on fire detection and alarm system design, installation, and maintenance to British Standards.",
    duration: "4 days",
    mode: "Full-time",
    location: "London",
    level: "Intermediate",
    price: "£595 - £695",
    format: "Classroom with practical demonstrations",
    nextDates: ["8 June 2025", "10 August 2025", "12 October 2025", "7 December 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"],
    category: "Specialised Skills",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£3,000 - £5,000 annual increase",
    careerOutcomes: [
      "Fire alarm specialist certification",
      "Commercial installation opportunities",
      "Maintenance contract work",
      "Emergency services liaison"
    ],
    accreditation: ["FIA Approved", "BAFE SP203-1", "City & Guilds pathway"],
    employerSupport: true,
    prerequisites: ["Basic electrical qualification", "Understanding of British Standards"],
    courseOutline: [
      "Fire alarm system principles",
      "BS 5839 compliance requirements",
      "System design and zoning",
      "Installation techniques",
      "Testing and commissioning",
      "Maintenance procedures"
    ],
    assessmentMethod: "Written exam and practical assessment",
    continuousAssessment: false
  },
  {
    id: 6,
    title: "Solar PV Installation & Maintenance",
    provider: "Solar Energy UK",
    description: "Complete training for solar photovoltaic system installation, covering MCS requirements and grid connection procedures.",
    duration: "3 days",
    mode: "Part-time",
    location: "Bristol",
    level: "Intermediate",
    price: "£495 - £595",
    format: "Practical rooftop training with classroom theory",
    nextDates: ["12 June 2025", "17 July 2025", "14 August 2025", "18 September 2025"],
    rating: 4.7,
    locations: ["Bristol", "Reading", "Norwich", "Exeter"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£4,000 - £7,000 annual increase",
    careerOutcomes: [
      "MCS certified installer",
      "Renewable energy specialist",
      "Green technology career path",
      "Self-employment opportunities"
    ],
    accreditation: ["MCS Installation", "City & Guilds 2919-02", "NICEIC PV"],
    employerSupport: true,
    prerequisites: ["18th Edition", "Working at height certification"],
    courseOutline: [
      "Solar PV technology fundamentals",
      "Site survey and system design",
      "Safe installation procedures",
      "Grid connection requirements",
      "Testing and commissioning",
      "MCS compliance and certification"
    ],
    assessmentMethod: "Practical installation and theory exam",
    continuousAssessment: true
  }
];

export const enhancedTrainingCenters: EnhancedTrainingCenter[] = [
  {
    id: 1,
    name: "NICEIC Learning & Development",
    location: "London",
    address: "Warwick House, Houghton Hall Park, Houghton Regis, Bedfordshire, LU5 5ZX",
    contact: {
      phone: "0333 015 6626",
      email: "training@niceic.com",
      website: "www.niceic.com/training"
    },
    website: "www.niceic.com/training",
    courses: ["18th Edition Wiring Regulations", "Inspection & Testing", "EV Charging Installation"],
    specializations: ["Electrical Safety", "Code Compliance", "Professional Development"],
    facilities: ["Modern classrooms", "Practical workshops", "Online learning portal", "Assessment centres"],
    accreditations: ["City & Guilds Approved", "EAL Centre", "NICEIC Approved Contractor"],
    supportServices: ["Career guidance", "Job placement assistance", "Employer partnerships", "Flexible payment plans"],
    establishedYear: 1956,
    successRate: 94,
    employmentRate: 87,
    studentCapacity: 2000,
    rating: 4.8
  },
  {
    id: 2,
    name: "ECA Training Services",
    location: "London",
    address: "ECA House, Palace Court, London, W2 4HY",
    contact: {
      phone: "020 7313 4800",
      email: "training@eca.co.uk",
      website: "www.eca.co.uk/training"
    },
    website: "www.eca.co.uk/training",
    courses: ["EV Charging Installation", "Smart Building Systems", "Energy Efficiency"],
    specializations: ["Emerging Technologies", "Renewable Energy", "Commercial Systems"],
    facilities: ["Technology labs", "VR training systems", "Industry partnerships", "Research facilities"],
    accreditations: ["ECA Approved", "CIBSE Partnership", "Low Carbon Skills"],
    supportServices: ["Technical support", "Industry networking", "CPD tracking", "Equipment financing"],
    establishedYear: 1901,
    successRate: 91,
    employmentRate: 89,
    studentCapacity: 1500,
    rating: 4.7
  },
  {
    id: 3,
    name: "City & Guilds Training Centre",
    location: "Manchester",
    address: "1 Giltspur Street, Manchester, M1 1AA",
    contact: {
      phone: "0844 543 0000",
      email: "enquiries@cityandguilds.com",
      website: "www.cityandguilds.com"
    },
    website: "www.cityandguilds.com",
    courses: ["Inspection & Testing", "Fire Alarm Systems", "Industrial Systems"],
    specializations: ["Qualifications", "Assessment", "Quality Assurance"],
    facilities: ["Assessment centres", "Digital learning", "Industry simulators", "Mobile training units"],
    accreditations: ["Ofqual Regulated", "SQA Approved", "International Recognition"],
    supportServices: ["Qualification support", "Employer services", "International programmes", "Skills analysis"],
    establishedYear: 1878,
    successRate: 93,
    employmentRate: 85,
    studentCapacity: 3000,
    rating: 4.6
  }
];

export const courseAnalytics: CourseAnalytics = {
  totalCourses: 150,
  totalProviders: 45,
  averageRating: 4.7,
  highDemandCourses: 23,
  emergingTechCourses: 18,
  averageSalaryImpact: "£3,500 - £6,000",
  topCategories: [
    { name: "Essential Qualifications", count: 45 },
    { name: "Emerging Technologies", count: 28 },
    { name: "Safety & Compliance", count: 35 },
    { name: "Specialised Skills", count: 25 },
    { name: "Business & Management", count: 17 }
  ]
};
