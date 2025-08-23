
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
  // EnhancedCareerCourse can extend CareerCourse with additional properties if needed
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

export const careerCourses: CareerCourse[] = [
  {
    id: 1,
    title: "Level 2 Diploma in Electrical Installation",
    provider: "City College Manchester",
    duration: "18 months",
    mode: "Full-time",
    location: "Manchester",
    price: "£3,500",
    description: "Comprehensive electrical installation course covering all essential skills for starting your electrical career.",
    level: "Level 2",
    category: "Electrical",
    startDate: "September 2024",
    isLive: true,
    courseOutline: [
      "Health and Safety in Electrical Installation",
      "Electrical Installation Theory and Technology", 
      "Installation Methods and Procedures",
      "Electrical Science and Principles",
      "Practical Skills Development"
    ],
    prerequisites: [
      "GCSE Maths and English (Grade C/4 or above)",
      "Basic understanding of electrical principles helpful but not essential"
    ],
    assessmentMethod: "Continuous Assessment and Final Practical Exam",
    continuousAssessment: true,
    industryDemand: {
      level: "High",
      growth: "12% projected growth over next 5 years",
      description: "Strong demand for qualified electricians across all sectors"
    },
    futureProofing: "Excellent - electrical skills remain essential as technology advances",
    salaryImpact: "£18,000-£25,000 starting salary, progressing to £35,000+ with experience",
    careerOutcomes: [
      "Electrical Installation Technician",
      "Maintenance Electrician", 
      "Domestic Electrician",
      "Pathway to Level 3 qualifications"
    ],
    accreditation: ["EAL", "City & Guilds", "JTL approved"],
    employerSupport: true
  },
  {
    id: 2,
    title: "Level 3 Advanced Diploma in Electrical Installation",
    provider: "Birmingham Electrical Training",
    duration: "24 months",
    mode: "Part-time",
    location: "Birmingham",
    price: "£4,200",
    description: "Advanced electrical qualification for experienced electricians seeking career progression.",
    level: "Level 3",
    category: "Electrical",
    startDate: "October 2024",
    isLive: true,
    courseOutline: [
      "Advanced Electrical Installation Theory",
      "Electrical System Design",
      "Inspection, Testing and Commissioning",
      "Electrical Fault Diagnosis",
      "Commercial and Industrial Systems"
    ],
    prerequisites: [
      "Level 2 Electrical Installation qualification",
      "Minimum 2 years electrical experience",
      "Current 18th Edition Wiring Regulations certificate"
    ],
    assessmentMethod: "Portfolio Assessment and Practical Projects",
    continuousAssessment: true,
    industryDemand: {
      level: "Very High", 
      growth: "15% projected growth",
      description: "High demand for advanced electrical technicians"
    },
    futureProofing: "Excellent - leads to supervisory and design roles",
    salaryImpact: "£28,000-£45,000+ depending on specialisation",
    careerOutcomes: [
      "Senior Electrician",
      "Electrical Supervisor",
      "Electrical Designer", 
      "Electrical Inspector"
    ],
    accreditation: ["EAL Level 3", "NICEIC approved"],
    employerSupport: true
  },
  {
    id: 3,
    title: "18th Edition Wiring Regulations (BS 7671)",
    provider: "London Electrical Institute",
    duration: "3 days",
    mode: "Intensive",
    location: "London",
    price: "£450",
    description: "Essential update course on the latest wiring regulations for all electrical professionals.",
    level: "Professional",
    category: "Electrical",
    startDate: "Next available: 15th January 2024",
    isLive: true,
    courseOutline: [
      "Changes in 18th Edition BS 7671",
      "New requirements for electrical installations",
      "Updated inspection and testing procedures",
      "Practical application of new regulations"
    ],
    prerequisites: [
      "Existing electrical qualification",
      "Currently working in electrical industry"
    ],
    assessmentMethod: "Written examination",
    continuousAssessment: false,
    industryDemand: {
      level: "Essential",
      growth: "Required for all practicing electricians", 
      description: "Mandatory update for electrical professionals"
    },
    futureProofing: "Essential for continued practice",
    salaryImpact: "Maintains professional standing and employment eligibility",
    careerOutcomes: [
      "Continued electrical practice",
      "Compliance with current regulations",
      "Professional development"
    ],
    accreditation: ["IET approved", "NICEIC recognised"],
    employerSupport: true
  }
];

export const trainingCenters: TrainingCenter[] = [
  {
    id: 1,
    name: "City College Manchester",
    location: "Manchester, Greater Manchester",
    rating: 4.7,
    courses: ["Level 2 Electrical Installation", "Level 3 Advanced Electrical", "Apprenticeships"],
    contact: {
      phone: "0161 957 1600",
      email: "info@citycollegemanchester.ac.uk",
      website: "www.citycollegemanchester.ac.uk"
    },
    facilities: ["Modern workshops", "Industry-standard equipment", "Library and study areas"],
    accreditations: ["Ofsted Outstanding", "EAL Centre", "City & Guilds approved"]
  },
  {
    id: 2,
    name: "Birmingham Electrical Training",
    location: "Birmingham, West Midlands", 
    rating: 4.5,
    courses: ["Level 3 Electrical Installation", "Inspection & Testing", "18th Edition"],
    contact: {
      phone: "0121 454 7890",
      email: "courses@birminghamelectrical.co.uk",
      website: "www.birminghamelectrical.co.uk"
    },
    facilities: ["Specialist electrical labs", "Commercial installation simulators", "Testing equipment"],
    accreditations: ["NICEIC approved", "EAL registered", "JTL partner"]
  },
  {
    id: 3,
    name: "London Electrical Institute",
    location: "London",
    rating: 4.8,
    courses: ["18th Edition BS 7671", "PAT Testing", "Emergency Lighting"],
    contact: {
      phone: "020 7946 0958",
      email: "training@londonelectrical.org",
      website: "www.londonelectrical.org"
    },
    facilities: ["Central London location", "Evening and weekend courses", "Online resources"],
    accreditations: ["IET approved", "City & Guilds centre", "Professional recognition"]
  }
];
