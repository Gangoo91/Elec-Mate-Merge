
// Enhanced course data with comprehensive UK information
export interface EnhancedCareerCourse {
  id: number;
  title: string;
  provider: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  format: string;
  nextDates: string[];
  rating: number;
  locations: string[];
  category: string;
  accreditation: string[];
  prerequisites: string[];
  careerOutcomes: string[];
  salaryImpact: string;
  industryDemand: "High" | "Medium" | "Low";
  futureProofing: number; // 1-5 scale
  practicalContent: number; // percentage
  jobPlacement: number; // percentage
  regionAvailability: {
    london: boolean;
    southeast: boolean;
    midlands: boolean;
    north: boolean;
    scotland: boolean;
    wales: boolean;
  };
  fundingOptions: string[];
  employerSupport: boolean;
}

export interface EnhancedTrainingCenter {
  id: number;
  name: string;
  location: string;
  address: string;
  contact: string;
  website: string;
  courses: string[];
  facilities: string[];
  accreditations: string[];
  rating: number;
  establishedYear: number;
  studentCapacity: number;
  successRate: number;
  employmentRate: number;
  specializations: string[];
  supportServices: string[];
}

// Course categories for better organization
export const courseCategories = [
  "All Categories",
  "Essential Qualifications", 
  "Safety & Compliance",
  "Specialized Skills",
  "Emerging Technologies",
  "Business & Management",
  "Testing & Inspection"
];

// Enhanced industry courses with comprehensive UK data
export const enhancedCareerCourses: EnhancedCareerCourse[] = [
  {
    id: 1,
    title: "18th Edition BS 7671 Wiring Regulations",
    provider: "NICEIC Training",
    description: "Essential course covering the latest IET Wiring Regulations BS 7671:2018 Amendment 2 for all UK electrical installations. Mandatory for scheme membership.",
    duration: "3 days",
    level: "Intermediate",
    price: "£350 - £450",
    format: "Classroom, Online, and Blended options",
    nextDates: ["15 June 2025", "22 July 2025", "18 August 2025", "12 September 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow", "Cardiff", "Belfast"],
    category: "Essential Qualifications",
    accreditation: ["City & Guilds 2382-22", "IET Approved"],
    prerequisites: ["Basic electrical knowledge", "NVQ Level 2 or equivalent"],
    careerOutcomes: ["Scheme provider membership", "Legal compliance", "Insurance requirements met"],
    salaryImpact: "+£3,000-£5,000 annually",
    industryDemand: "High",
    futureProofing: 5,
    practicalContent: 30,
    jobPlacement: 95,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: true,
      north: true,
      scotland: true,
      wales: true
    },
    fundingOptions: ["Apprenticeship Levy", "Skills Bank", "Company Training Budget"],
    employerSupport: true
  },
  {
    id: 2,
    title: "Inspection & Testing (2391-52)",
    provider: "City & Guilds Approved Centre",
    description: "Advanced qualification for initial verification and periodic inspection of electrical installations. Essential for independent electrical work.",
    duration: "5 days",
    level: "Advanced",
    price: "£600 - £750",
    format: "Practical assessment with theory components",
    nextDates: ["10 June 2025", "14 July 2025", "11 September 2025", "6 October 2025"],
    rating: 4.7,
    locations: ["Cardiff", "Newcastle", "London", "Edinburgh", "Bristol"],
    category: "Testing & Inspection",
    accreditation: ["City & Guilds 2391-52", "JIB Approved"],
    prerequisites: ["18th Edition certificate", "AM2 or equivalent", "2+ years experience"],
    careerOutcomes: ["Independent testing capability", "EICR certification", "Higher day rates"],
    salaryImpact: "+£8,000-£15,000 annually",
    industryDemand: "High",
    futureProofing: 5,
    practicalContent: 70,
    jobPlacement: 92,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: true,
      north: true,
      scotland: true,
      wales: true
    },
    fundingOptions: ["Advanced Learner Loan", "Company Investment", "Self-funding"],
    employerSupport: true
  },
  {
    id: 3,
    title: "Electric Vehicle Charging Installation",
    provider: "ECA Academy",
    description: "Specialized training for installing EV charging points including OLEV grant requirements, regulations, and advanced charging systems.",
    duration: "2-3 days",
    level: "Intermediate",
    price: "£375 - £550",
    format: "Blended learning with extensive practical sessions",
    nextDates: ["5 June 2025", "3 August 2025", "7 October 2025", "21 November 2025"],
    rating: 4.9,
    locations: ["Bristol", "London", "Manchester", "Leeds", "Glasgow"],
    category: "Emerging Technologies",
    accreditation: ["ECA EV Charging", "OZEV Approved"],
    prerequisites: ["18th Edition", "AM2", "Domestic installation experience"],
    careerOutcomes: ["EV charging specialist", "OZEV grant installer", "Green technology expert"],
    salaryImpact: "+£10,000-£20,000 annually",
    industryDemand: "High",
    futureProofing: 5,
    practicalContent: 65,
    jobPlacement: 88,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: true,
      north: true,
      scotland: true,
      wales: false
    },
    fundingOptions: ["Green Skills Funding", "Company Investment", "Skills Development Fund"],
    employerSupport: true
  },
  {
    id: 4,
    title: "MEWP Operator Training (IPAF 3a/3b)",
    provider: "IPAF Certified Training",
    description: "Mobile Elevating Work Platform operation certification essential for electricians working at height on construction and maintenance projects.",
    duration: "1-2 days",
    level: "All levels",
    price: "£200 - £350",
    format: "Practical training with theory assessment",
    nextDates: ["8 June 2025", "15 July 2025", "9 September 2025", "14 October 2025"],
    rating: 4.8,
    locations: ["Birmingham", "Manchester", "Bristol", "London", "Glasgow", "Nationwide"],
    category: "Safety & Compliance",
    accreditation: ["IPAF 3a/3b Certificate", "PAL Card"],
    prerequisites: ["Valid driving licence", "Basic health requirements"],
    careerOutcomes: ["Access to height work", "Construction site access", "Maintenance roles"],
    salaryImpact: "+£2,000-£4,000 annually",
    industryDemand: "High",
    futureProofing: 4,
    practicalContent: 80,
    jobPlacement: 96,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: true,
      north: true,
      scotland: true,
      wales: true
    },
    fundingOptions: ["Company Sponsorship", "CITB Grants", "Self-funding"],
    employerSupport: true
  },
  {
    id: 5,
    title: "Smart Building & Home Automation (KNX)",
    provider: "KNX Association UK",
    description: "Advanced training in intelligent building systems, smart home technology, and KNX/EIB programming for modern electrical installations.",
    duration: "5 days",
    level: "Advanced",
    price: "£850 - £1,200",
    format: "Classroom with hands-on programming exercises",
    nextDates: ["14 June 2025", "19 July 2025", "13 September 2025", "18 October 2025"],
    rating: 4.9,
    locations: ["London", "Manchester", "Bristol", "Birmingham"],
    category: "Emerging Technologies",
    accreditation: ["KNX Basic Certificate", "EIB Certification"],
    prerequisites: ["Electrical qualification", "Computer literacy", "Installation experience"],
    careerOutcomes: ["Smart building specialist", "High-end residential work", "Commercial automation"],
    salaryImpact: "+£15,000-£25,000 annually",
    industryDemand: "Medium",
    futureProofing: 5,
    practicalContent: 60,
    jobPlacement: 85,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: false,
      north: true,
      scotland: false,
      wales: false
    },
    fundingOptions: ["Advanced Learning Loan", "Employer Investment", "Self-funding"],
    employerSupport: false
  },
  {
    id: 6,
    title: "Fire Alarm Systems BS 5839",
    provider: "Fire Industry Association",
    description: "Comprehensive training on designing, installing, commissioning and maintaining fire detection and alarm systems to BS 5839 standards.",
    duration: "4 days",
    level: "Intermediate",
    price: "£500 - £650",
    format: "Classroom with practical installation exercises",
    nextDates: ["8 June 2025", "10 August 2025", "12 October 2025", "9 November 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow", "Cardiff"],
    category: "Specialized Skills",
    accreditation: ["FIA Certificate", "BAFE Approved"],
    prerequisites: ["Electrical qualification", "Installation experience"],
    careerOutcomes: ["Fire safety specialist", "Commercial installation work", "Maintenance contracts"],
    salaryImpact: "+£6,000-£12,000 annually",
    industryDemand: "High",
    futureProofing: 4,
    practicalContent: 55,
    jobPlacement: 90,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: true,
      north: true,
      scotland: true,
      wales: true
    },
    fundingOptions: ["Skills Development Fund", "Company Training", "Apprenticeship Levy"],
    employerSupport: true
  },
  {
    id: 7,
    title: "Hazardous Areas & ATEX (CompEx)",
    provider: "CompEx International",
    description: "Specialist certification for electricians working in potentially explosive atmospheres including oil & gas, chemical, and pharmaceutical industries.",
    duration: "5 days",
    level: "Advanced",
    price: "£900 - £1,200",
    format: "Intensive classroom with practical assessments",
    nextDates: ["13 June 2025", "18 July 2025", "22 September 2025", "27 October 2025"],
    rating: 4.9,
    locations: ["Aberdeen", "Manchester", "London", "Southampton", "Teesside"],
    category: "Specialized Skills",
    accreditation: ["CompEx 01-04 Certificates", "International Recognition"],
    prerequisites: ["Electrical qualification", "Industrial experience preferred"],
    careerOutcomes: ["Oil & gas industry access", "Chemical plant work", "International opportunities"],
    salaryImpact: "+£20,000-£40,000 annually",
    industryDemand: "Medium",
    futureProofing: 4,
    practicalContent: 45,
    jobPlacement: 95,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: false,
      north: true,
      scotland: true,
      wales: false
    },
    fundingOptions: ["Employer Sponsorship", "Oil & Gas Training Fund", "Self-investment"],
    employerSupport: true
  },
  {
    id: 8,
    title: "Business Skills for Electrical Contractors",
    provider: "ECA Business Academy",
    description: "Essential business management skills for electricians looking to start their own electrical contracting business or advance to management roles.",
    duration: "3 days",
    level: "All levels",
    price: "£450 - £600",
    format: "Interactive workshops and case studies",
    nextDates: ["20 June 2025", "25 July 2025", "15 September 2025", "20 October 2025"],
    rating: 4.6,
    locations: ["London", "Birmingham", "Manchester", "Bristol", "Online"],
    category: "Business & Management",
    accreditation: ["ECA Business Certificate", "CMI Recognition"],
    prerequisites: ["Electrical qualification", "Some industry experience"],
    careerOutcomes: ["Business ownership", "Management roles", "Higher earning potential"],
    salaryImpact: "+£10,000-£30,000+ annually",
    industryDemand: "Medium",
    futureProofing: 5,
    practicalContent: 20,
    jobPlacement: 70,
    regionAvailability: {
      london: true,
      southeast: true,
      midlands: true,
      north: true,
      scotland: true,
      wales: true
    },
    fundingOptions: ["Business Development Grants", "Self-investment", "Company Support"],
    employerSupport: false
  }
];

// Enhanced training centers with comprehensive data
export const enhancedTrainingCenters: EnhancedTrainingCenter[] = [
  {
    id: 1,
    name: "NICEIC Training Academy",
    location: "London",
    address: "Warwick House, Houghton Hall Park, Houghton Regis, Dunstable, LU5 5ZX",
    contact: "0333 015 6626",
    website: "www.niceiccertification.co.uk",
    courses: ["18th Edition BS 7671", "Inspection & Testing", "EV Charging", "Solar PV"],
    facilities: ["Modern workshops", "Assessment centers", "Online learning platform", "Free parking"],
    accreditations: ["City & Guilds", "EAL", "Pearson", "IET"],
    rating: 4.8,
    establishedYear: 1956,
    studentCapacity: 500,
    successRate: 94,
    employmentRate: 89,
    specializations: ["Domestic installation", "Testing & inspection", "Renewable energy"],
    supportServices: ["Career guidance", "Job placement", "Apprenticeship programs", "Employer engagement"]
  },
  {
    id: 2,
    name: "ECA Training Centre Manchester",
    location: "Manchester",
    address: "Units 1-3, Brookfield Business Park, Leigh Road, Wigan, WN7 1NJ",
    contact: "01942 261 111",
    website: "www.eca.co.uk/training",
    courses: ["Business Skills", "EV Charging", "Smart Building Systems", "Fire Alarms"],
    facilities: ["Purpose-built workshops", "Smart building lab", "Conference facilities", "Accommodation nearby"],
    accreditations: ["ECA", "NICEIC", "NAPIT", "KNX Association"],
    rating: 4.7,
    establishedYear: 1901,
    studentCapacity: 300,
    successRate: 92,
    employmentRate: 87,
    specializations: ["Commercial installation", "Smart systems", "Business development"],
    supportServices: ["Mentorship programs", "Business incubation", "Networking events", "Continuing education"]
  },
  {
    id: 3,
    name: "JTL Training Academy",
    location: "Birmingham",
    address: "Novus House, 4 Valley Court, Lower Road, Croydon, CR0 4BE",
    contact: "020 7650 0900",
    website: "www.jtltraining.com",
    courses: ["Apprenticeship programs", "18th Edition", "Testing qualification", "Safety training"],
    facilities: ["Multiple workshops", "Assessment centers", "Student accommodation", "Digital learning suites"],
    accreditations: ["JTL", "City & Guilds", "EAL", "CITB"],
    rating: 4.9,
    establishedYear: 1966,
    studentCapacity: 1200,
    successRate: 96,
    employmentRate: 93,
    specializations: ["Apprentice training", "Career progression", "Employer partnerships"],
    supportServices: ["Full apprenticeship management", "Employer liaison", "Career progression planning", "Wellbeing support"]
  },
  {
    id: 4,
    name: "CompEx International Scotland",
    location: "Glasgow",
    address: "Johnstone Training Centre, Glasgow Airport, Paisley, PA3 2ST",
    contact: "0141 812 4444",
    website: "www.compex.org.uk",
    courses: ["ATEX training", "Hazardous areas", "Offshore electrical", "Industrial systems"],
    facilities: ["Specialized ATEX lab", "Explosion testing area", "Industrial simulation", "Offshore training rigs"],
    accreditations: ["CompEx", "OPITO", "ECITB", "International"],
    rating: 4.9,
    establishedYear: 1972,
    studentCapacity: 150,
    successRate: 98,
    employmentRate: 96,
    specializations: ["Hazardous areas", "Oil & gas", "Chemical processing", "International standards"],
    supportServices: ["Industry placement", "International certification", "Ongoing assessment", "Safety consultancy"]
  }
];

// Course analytics data
export const courseAnalytics = {
  totalCourses: enhancedCareerCourses.length,
  totalProviders: [...new Set(enhancedCareerCourses.map(c => c.provider))].length,
  averageRating: (enhancedCareerCourses.reduce((sum, c) => sum + c.rating, 0) / enhancedCareerCourses.length).toFixed(1),
  highDemandCourses: enhancedCareerCourses.filter(c => c.industryDemand === "High").length,
  emergingTechCourses: enhancedCareerCourses.filter(c => c.category === "Emerging Technologies").length,
  averageSalaryImpact: "£8,000-£15,000",
  topCategories: [
    { name: "Essential Qualifications", count: 2 },
    { name: "Emerging Technologies", count: 2 },
    { name: "Safety & Compliance", count: 1 },
    { name: "Specialized Skills", count: 2 },
    { name: "Business & Management", count: 1 }
  ]
};
