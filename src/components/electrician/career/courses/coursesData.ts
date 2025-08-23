
export interface CareerCourse {
  id: string | number;
  title: string;
  provider: string;
  duration: string;
  mode: string;
  location: string;
  price: string;
  description: string;
  level: string;
  category: string;
  startDate?: string;
  isLive?: boolean;
  courseOutline?: string[];
  prerequisites?: string[];
  assessmentMethod?: string;
  continuousAssessment?: boolean;
  industryDemand?: {
    level: string;
    growth: string;
    description: string;
  };
  futureProofing?: string;
  salaryImpact?: string;
  careerOutcomes?: string[];
  accreditation?: string[];
  employerSupport?: boolean;
}

export interface EnhancedCareerCourse extends CareerCourse {
  // All properties are inherited from CareerCourse
}

export interface TrainingCenter {
  id: number;
  name: string;
  location: string;
  rating: number;
  courses: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  facilities: string[];
  accreditations: string[];
}

export const careerCourses: EnhancedCareerCourse[] = [
  {
    id: "elec-1",
    title: "Level 2 Diploma in Electrical Installation",
    provider: "National Electrical Training Centre",
    duration: "18 months",
    mode: "Full-time",
    location: "Multiple locations available",
    price: "£3,500",
    description: "Comprehensive electrical installation course covering all essential skills for qualified electrician status.",
    level: "Level 2",
    category: "Electrical Installation",
    startDate: "September 2024",
    isLive: true,
    courseOutline: [
      "Health and Safety in Electrical Installation (ELEC2/01)",
      "Electrical Installation Theory and Technology (ELEC2/04)", 
      "Installation Methods, Procedures and Requirements (ELEC2/05A)",
      "Electrical Installation Craft Skills (ELEC2/05B)",
      "Electrical Science and Principles (ELEC2/08)"
    ],
    prerequisites: [
      "GCSE Maths and English (Grade C/4 or above)",
      "Good colour vision",
      "Physical fitness for electrical work"
    ],
    assessmentMethod: "Continuous Assessment, Written Examinations, and AM2 Practical Assessment",
    continuousAssessment: true,
    industryDemand: {
      level: "Very High",
      growth: "14% projected growth over next 5 years",
      description: "Critical shortage of qualified electricians across all sectors with excellent job prospects"
    },
    futureProofing: "Excellent - renewable energy, smart homes, and EV charging increasing demand",
    salaryImpact: "£20,000-£28,000 newly qualified, progressing to £35,000-£50,000+ with experience",
    careerOutcomes: [
      "Qualified Electrician",
      "Electrical Installation Technician",
      "Maintenance Electrician",
      "Pathway to specialist roles (solar, EV charging, smart systems)"
    ],
    accreditation: ["EAL Level 2 Diploma", "City & Guilds equivalent", "NICEIC recognised"],
    employerSupport: true
  },
  {
    id: "elec-2", 
    title: "Level 3 Advanced Diploma in Electrical Installation",
    provider: "Advanced Electrical Academy",
    duration: "24 months part-time / 12 months full-time",
    mode: "Flexible",
    location: "Nationwide centres",
    price: "£4,800",
    description: "Advanced qualification for experienced electricians seeking supervisory roles and specialisation.",
    level: "Level 3",
    category: "Advanced Electrical",
    startDate: "Multiple intakes throughout year",
    isLive: true,
    courseOutline: [
      "Advanced Electrical Installation Theory",
      "Electrical System Design and Verification", 
      "Inspection, Testing and Commissioning",
      "Electrical Fault Diagnosis and Rectification",
      "Industrial and Commercial Systems",
      "Renewable Energy Systems Integration"
    ],
    prerequisites: [
      "Level 2 Electrical Installation qualification",
      "Minimum 3 years electrical industry experience",
      "Current 18th Edition Wiring Regulations certificate",
      "AM2 achievement preferred"
    ],
    assessmentMethod: "Portfolio-based assessment, technical assignments, and advanced practical projects",
    continuousAssessment: true,
    industryDemand: {
      level: "Extremely High",
      growth: "18% projected growth for senior electrical roles",
      description: "Severe shortage of qualified supervisors and advanced technicians"
    },
    futureProofing: "Outstanding - leads to management, design, and specialist consulting roles",
    salaryImpact: "£35,000-£55,000+ with potential for £70,000+ in specialist or management roles",
    careerOutcomes: [
      "Senior/Lead Electrician",
      "Electrical Supervisor/Foreman",
      "Electrical Systems Designer",
      "Electrical Inspector and Tester",
      "Renewable Energy Specialist",
      "Electrical Project Manager"
    ],
    accreditation: ["EAL Level 3 Advanced Diploma", "BTEC equivalent", "Professional body recognition"],
    employerSupport: true
  },
  {
    id: "elec-3",
    title: "18th Edition BS 7671 Wiring Regulations",
    provider: "Professional Electrical Training",
    duration: "4 days intensive / 8 weeks part-time",
    mode: "Multiple delivery options",
    location: "All major UK cities + Online",
    price: "£495",
    description: "Essential regulatory update course for all electrical professionals - mandatory for continued practice.",
    level: "Professional Update",
    category: "Regulatory Compliance",
    startDate: "Weekly starts available",
    isLive: true,
    courseOutline: [
      "Key changes in BS 7671:2018+A2:2022",
      "Special installations and locations",
      "Protection against electric shock",
      "Selection and erection of equipment",
      "Inspection and testing requirements",
      "Certification and documentation"
    ],
    prerequisites: [
      "Current electrical qualification",
      "Active electrical industry employment",
      "Basic understanding of electrical principles"
    ],
    assessmentMethod: "Multiple choice examination (80% pass required)",
    continuousAssessment: false,
    industryDemand: {
      level: "Mandatory",
      growth: "Required for all practising electricians",
      description: "Legal requirement for electrical work - essential for insurance and compliance"
    },
    futureProofing: "Critical - ensures continued ability to work legally in electrical industry",
    salaryImpact: "Maintains professional standing and eligibility for electrical contracts",
    careerOutcomes: [
      "Continued electrical practice",
      "Regulatory compliance",
      "Professional credibility",
      "Contract eligibility"
    ],
    accreditation: ["IET (Institution of Engineering and Technology)", "City & Guilds 2382-22", "EAL equivalent"],
    employerSupport: true
  }
];

export const trainingCenters: TrainingCenter[] = [
  {
    id: 1,
    name: "National Electrical Training Centre",
    location: "Birmingham, with satellite centres nationwide",
    rating: 4.9,
    courses: ["Level 2 Electrical Installation", "Level 3 Advanced Electrical", "18th Edition", "Specialist courses"],
    contact: {
      phone: "0800 123 4567",
      email: "enquiries@netc.co.uk", 
      website: "www.nationalelectricaltraining.co.uk"
    },
    facilities: [
      "State-of-the-art electrical workshops",
      "Industry-standard test equipment", 
      "Commercial and domestic installation rigs",
      "Renewable energy training systems",
      "Modern classrooms with interactive technology"
    ],
    accreditations: [
      "Ofsted Grade 1 Outstanding",
      "EAL Approved Centre", 
      "City & Guilds Premium Centre",
      "NICEIC Training Partner",
      "JTL Approved Provider"
    ]
  },
  {
    id: 2,
    name: "Advanced Electrical Academy",
    location: "Manchester, Leeds, London",
    rating: 4.7,
    courses: ["Level 3 Advanced Electrical", "Inspection & Testing", "Design & Verification"],
    contact: {
      phone: "0161 789 0123",
      email: "info@advancedelectrical.ac.uk",
      website: "www.advancedelectricalacademy.co.uk"
    },
    facilities: [
      "Advanced electrical laboratories",
      "Industrial control systems simulators",
      "PV and renewable energy training rigs", 
      "CAD design suites",
      "Professional development centre"
    ],
    accreditations: [
      "EAL Level 3 Approved",
      "BTEC Centre",
      "Professional Engineering Institution links",
      "Industry partnership network"
    ]
  },
  {
    id: 3,
    name: "Professional Electrical Training",
    location: "Online and 25+ UK training centres",
    rating: 4.6,
    courses: ["18th Edition BS 7671", "PAT Testing", "Emergency Lighting", "Fire Alarm Systems"],
    contact: {
      phone: "0330 124 5678",
      email: "bookings@professionalelectrical.co.uk",
      website: "www.professionalelectricaltraining.co.uk"
    },
    facilities: [
      "Flexible learning options",
      "Online and face-to-face delivery",
      "Evening and weekend courses",
      "Corporate training solutions",
      "Continuous professional development programmes"
    ],
    accreditations: [
      "IET Approved Training Provider",
      "City & Guilds Registered Centre", 
      "CPD Certification Service",
      "Professional body recognition"
    ]
  }
];
