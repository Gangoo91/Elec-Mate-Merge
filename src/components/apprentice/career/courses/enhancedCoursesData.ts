
// Enhanced course data with comprehensive UK electrical industry information

export interface EnhancedCareerCourse {
  id: number | string;
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
  contact: string;
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
  "Safety & Compliance", 
  "Essential Updates",
  "Emerging Technologies",
  "Specialized Systems", 
  "Professional Development",
  "Business Skills"
];

export const enhancedCareerCourses: EnhancedCareerCourse[] = [
  {
    id: 1,
    title: "18th Edition Wiring Regulations (BS 7671:2018+A2:2022)",
    provider: "NICEIC Academy",
    description: "Comprehensive training on the latest IET Wiring Regulations, covering all amendments and updates essential for UK electrical installations.",
    duration: "3 days",
    level: "Intermediate",
    price: "£395 - £495",
    format: "Classroom, Online, Blended Learning",
    nextDates: ["15 June 2025", "22 July 2025", "18 August 2025", "15 September 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow", "Cardiff", "Online"],
    category: "Essential Updates",
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
    level: "Advanced", 
    price: "£695 - £895",
    format: "Classroom with extensive practical assessments",
    nextDates: ["10 June 2025", "14 July 2025", "11 September 2025", "9 October 2025"],
    rating: 4.7,
    locations: ["Cardiff", "Newcastle", "London", "Edinburgh", "Bristol"],
    category: "Essential Updates",
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
    level: "Intermediate",
    price: "£595 - £695",
    format: "Classroom with practical demonstrations",
    nextDates: ["8 June 2025", "10 August 2025", "12 October 2025", "7 December 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"],
    category: "Specialized Systems",
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
  },
  {
    id: 7,
    title: "MEWP (Mobile Elevated Work Platform) & IPAF Training",
    provider: "IPAF UK Training",
    description: "Essential certification for operating aerial work platforms and mobile elevating work platforms safely in electrical installations.",
    duration: "1-2 days",
    level: "Beginner",
    price: "£200 - £350",
    format: "Practical hands-on training with theory",
    nextDates: ["8 June 2025", "22 June 2025", "6 July 2025", "20 July 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
    category: "Safety & Compliance",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£1,500 - £3,000 annual increase",
    careerOutcomes: [
      "IPAF certified operator",
      "Access to high-level installation work",
      "Enhanced safety credentials",
      "Commercial project opportunities"
    ],
    accreditation: ["IPAF PAL Card", "Category 1a, 1b, 3a, 3b", "Internationally recognised"],
    employerSupport: true,
    prerequisites: ["Basic health and safety awareness", "Valid driving licence"],
    courseOutline: [
      "MEWP safety regulations",
      "Pre-use inspections",
      "Safe operating procedures",
      "Emergency descent procedures",
      "Risk assessment",
      "Practical operation training"
    ],
    assessmentMethod: "Practical test and theory exam",
    continuousAssessment: false,
    external_url: "https://www.ipaf.org/en/training/courses"
  },
  {
    id: 8,
    title: "EV Charging Infrastructure Design",
    provider: "Cenex",
    description: "Advanced course covering the design and specification of commercial EV charging networks and rapid charging systems.",
    duration: "3 days",
    level: "Advanced",
    price: "£795 - £995",
    format: "Technical workshop with site visits",
    nextDates: ["15 June 2025", "20 July 2025", "17 August 2025", "21 September 2025"],
    rating: 4.9,
    locations: ["London", "Birmingham", "Manchester"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£6,000 - £12,000 annual increase",
    careerOutcomes: [
      "EV infrastructure specialist",
      "Design engineer opportunities",
      "Consultancy career path",
      "Public sector project access"
    ],
    accreditation: ["IET Recognition", "Professional Engineering Council", "Cenex Certified"],
    employerSupport: false,
    prerequisites: ["Electrical engineering background", "EV charging installation experience"],
    courseOutline: [
      "EV charging standards and protocols",
      "Grid connection and load management",
      "Commercial charging economics",
      "Future technology roadmap",
      "Project planning and delivery",
      "Funding and grant opportunities"
    ],
    assessmentMethod: "Design project submission",
    continuousAssessment: true
  },
  {
    id: 9,
    title: "Battery Energy Storage Systems (BESS)",
    provider: "Renewable Energy Association",
    description: "Comprehensive training on battery storage technology, installation, and grid integration for renewable energy systems.",
    duration: "4 days",
    level: "Advanced",
    price: "£895 - £1,095",
    format: "Technical workshop with live demonstrations",
    nextDates: ["25 June 2025", "30 July 2025", "27 August 2025", "24 September 2025"],
    rating: 4.8,
    locations: ["Bristol", "Reading", "Edinburgh"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£5,000 - £10,000 annual increase",
    careerOutcomes: [
      "Energy storage specialist",
      "Grid integration engineer",
      "Renewable energy consultant",
      "Smart grid technology roles"
    ],
    accreditation: ["REA Certified", "DNO Recognition", "Battery Safety Council"],
    employerSupport: true,
    prerequisites: ["Electrical qualification", "Renewable energy experience"],
    courseOutline: [
      "Battery technology fundamentals",
      "Safety and fire prevention",
      "Grid code compliance",
      "System design and sizing",
      "Installation and commissioning",
      "Monitoring and maintenance"
    ],
    assessmentMethod: "Technical assessment and case study",
    continuousAssessment: true
  },
  {
    id: 10,
    title: "Smart Home Technology & IoT Integration",
    provider: "Smart Building Academy",
    description: "Cutting-edge training in smart home systems, IoT devices, and home automation for modern electrical installations.",
    duration: "3 days",
    level: "Intermediate",
    price: "£595 - £745",
    format: "Hands-on smart home lab sessions",
    nextDates: ["12 June 2025", "24 July 2025", "14 August 2025", "18 September 2025"],
    rating: 4.7,
    locations: ["London", "Manchester", "Birmingham", "Online"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£3,500 - £6,500 annual increase",
    careerOutcomes: [
      "Smart home specialist",
      "IoT installation expert",
      "Home automation consultant",
      "Technology integration roles"
    ],
    accreditation: ["Smart Building Certification", "IoT Institute", "Technology Partners"],
    employerSupport: true,
    prerequisites: ["18th Edition", "Basic networking knowledge"],
    courseOutline: [
      "Smart home ecosystem overview",
      "Wireless protocols and standards",
      "Security and privacy considerations",
      "Installation and configuration",
      "Troubleshooting and support",
      "Future technology trends"
    ],
    assessmentMethod: "Practical smart home setup project",
    continuousAssessment: true
  },
  {
    id: 11,
    title: "Data Centre Electrical Systems",
    provider: "Data Centre Institute",
    description: "Specialised training for electrical installations in data centres, covering power distribution, UPS systems, and critical infrastructure.",
    duration: "5 days",
    level: "Advanced",
    price: "£1,295 - £1,595",
    format: "Technical workshop in live data centre environment",
    nextDates: ["17 June 2025", "29 July 2025", "19 August 2025", "30 September 2025"],
    rating: 4.9,
    locations: ["London", "Manchester", "Edinburgh"],
    category: "Specialized Systems",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£8,000 - £15,000 annual increase",
    careerOutcomes: [
      "Data centre specialist",
      "Critical systems engineer",
      "High-availability installations",
      "Technical consultancy roles"
    ],
    accreditation: ["Data Centre Certified", "ASHRAE Recognition", "Uptime Institute"],
    employerSupport: false,
    prerequisites: ["Advanced electrical qualification", "Industrial experience"],
    courseOutline: [
      "Data centre power architecture",
      "UPS and backup systems",
      "Cooling and environmental control",
      "Monitoring and management systems",
      "Commissioning and testing",
      "Maintenance and troubleshooting"
    ],
    assessmentMethod: "Technical project and assessment",
    continuousAssessment: true
  },
  {
    id: 12,
    title: "Heat Pump Installation & Commissioning",
    provider: "Heat Pump Association",
    description: "Comprehensive training on air source and ground source heat pump installation, covering MCS requirements and renewable incentives.",
    duration: "3 days",
    level: "Intermediate",
    price: "£545 - £695",
    format: "Practical installation with theory sessions",
    nextDates: ["10 June 2025", "8 July 2025", "12 August 2025", "9 September 2025"],
    rating: 4.6,
    locations: ["Bristol", "Reading", "Norwich", "Leeds"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£4,000 - £7,500 annual increase",
    careerOutcomes: [
      "MCS heat pump installer",
      "Renewable energy specialist",
      "Low carbon technology expert",
      "Green energy consultant"
    ],
    accreditation: ["MCS Heat Pump", "City & Guilds 6035", "Renewable Energy Institute"],
    employerSupport: true,
    prerequisites: ["18th Edition", "Plumbing knowledge beneficial"],
    courseOutline: [
      "Heat pump technology fundamentals",
      "System design and sizing",
      "Installation procedures",
      "Electrical connections and controls",
      "Commissioning and testing",
      "Maintenance and servicing"
    ],
    assessmentMethod: "Practical installation assessment",
    continuousAssessment: true
  },
  {
    id: 13,
    title: "Drone Technology for Electrical Inspections",
    provider: "UAV Training UK",
    description: "Advanced course combining drone operation with electrical inspection techniques for overhead lines and solar installations.",
    duration: "5 days",
    level: "Advanced",
    price: "£1,195 - £1,495",
    format: "Practical flight training with electrical theory",
    nextDates: ["24 June 2025", "22 July 2025", "26 August 2025", "23 September 2025"],
    rating: 4.8,
    locations: ["Various outdoor training sites", "London theory base"],
    category: "Emerging Technologies",
    industryDemand: "Medium",
    futureProofing: 5,
    salaryImpact: "£5,000 - £8,000 annual increase",
    careerOutcomes: [
      "Licensed drone operator",
      "Electrical inspection specialist",
      "Renewable energy surveyor",
      "Technology innovation roles"
    ],
    accreditation: ["CAA Licensed", "GVC (General VLOS Certificate)", "Electrical inspection qualified"],
    employerSupport: false,
    prerequisites: ["Electrical background", "Clean driving licence", "Medical fitness"],
    courseOutline: [
      "Drone technology and regulations",
      "Flight planning and safety",
      "Thermal imaging techniques",
      "Electrical system inspection methods",
      "Data analysis and reporting",
      "Commercial operation procedures"
    ],
    assessmentMethod: "Flight test and inspection project",
    continuousAssessment: true
  },
  {
    id: 14,
    title: "Energy Management & Efficiency Systems",
    provider: "Energy Institute",
    description: "Professional training in energy management systems, monitoring technologies, and efficiency optimisation for commercial buildings.",
    duration: "4 days",
    level: "Advanced",
    price: "£795 - £995",
    format: "Technical workshop with site visits",
    nextDates: ["19 June 2025", "31 July 2025", "28 August 2025", "25 September 2025"],
    rating: 4.7,
    locations: ["London", "Birmingham", "Manchester"],
    category: "Specialised Skills",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£4,500 - £8,000 annual increase",
    careerOutcomes: [
      "Energy management specialist",
      "Building services engineer",
      "Sustainability consultant",
      "Facilities management roles"
    ],
    accreditation: ["Energy Institute Certified", "CIBSE Recognition", "BREEAM Assessor pathway"],
    employerSupport: true,
    prerequisites: ["Electrical qualification", "Building services knowledge"],
    courseOutline: [
      "Energy management principles",
      "Monitoring and metering systems",
      "Efficiency measurement techniques",
      "Smart building technologies",
      "Reporting and compliance",
      "Business case development"
    ],
    assessmentMethod: "Energy audit project",
    continuousAssessment: true
  },
  {
    id: 15,
    title: "LED Lighting Design & Control Systems",
    provider: "Lighting Association",
    description: "Comprehensive training in modern LED lighting design, smart controls, and energy-efficient lighting solutions for all applications.",
    duration: "3 days",
    level: "Intermediate",
    price: "£495 - £625",
    format: "Design workshop with practical demonstrations",
    nextDates: ["14 June 2025", "19 July 2025", "16 August 2025", "20 September 2025"],
    rating: 4.6,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"],
    category: "Specialised Skills",
    industryDemand: "Medium",
    futureProofing: 4,
    salaryImpact: "£2,500 - £5,000 annual increase",
    careerOutcomes: [
      "Lighting design specialist",
      "Smart lighting consultant",
      "Energy efficiency expert",
      "Architectural lighting roles"
    ],
    accreditation: ["Lighting Association Certified", "CIBSE Lighting", "Professional lighting designer"],
    employerSupport: true,
    prerequisites: ["Basic electrical knowledge", "Design software familiarity helpful"],
    courseOutline: [
      "LED technology fundamentals",
      "Lighting design principles",
      "Control systems and protocols",
      "Energy calculations and compliance",
      "Installation considerations",
      "Future lighting technologies"
    ],
    assessmentMethod: "Lighting design project",
    continuousAssessment: true
  },
  {
    id: 16,
    title: "Electric Vehicle Fleet Management",
    provider: "Fleet EV Academy",
    description: "Specialised training for managing commercial EV fleets, including charging infrastructure planning and energy management.",
    duration: "2 days",
    level: "Intermediate",
    price: "£445 - £565",
    format: "Workshop with fleet case studies",
    nextDates: ["11 June 2025", "16 July 2025", "13 August 2025", "17 September 2025"],
    rating: 4.7,
    locations: ["London", "Birmingham", "Manchester", "Online"],
    category: "Emerging Technologies",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£3,000 - £6,000 annual increase",
    careerOutcomes: [
      "Fleet electrification specialist",
      "EV infrastructure consultant",
      "Energy management expert",
      "Sustainable transport advisor"
    ],
    accreditation: ["Fleet Industry Certified", "Energy Saving Trust", "Low Carbon Vehicle Partnership"],
    employerSupport: true,
    prerequisites: ["Basic electrical knowledge", "Fleet management experience helpful"],
    courseOutline: [
      "Fleet electrification strategy",
      "Charging infrastructure planning",
      "Energy management and costs",
      "Driver training and adoption",
      "Maintenance and servicing",
      "Future technology roadmap"
    ],
    assessmentMethod: "Fleet transition plan project",
    continuousAssessment: false
  },
  {
    id: 17,
    title: "Hydrogen Technology for Electrical Applications",
    provider: "Hydrogen Skills Academy",
    description: "Forward-looking training on hydrogen fuel cells, electrolysis systems, and hydrogen's role in future electrical infrastructure.",
    duration: "4 days",
    level: "Advanced",
    price: "£995 - £1,295",
    format: "Technical workshop with industry demonstrations",
    nextDates: ["26 June 2025", "24 July 2025", "21 August 2025", "25 September 2025"],
    rating: 4.5,
    locations: ["London", "Birmingham", "Edinburgh"],
    category: "Emerging Technologies",
    industryDemand: "Low",
    futureProofing: 5,
    salaryImpact: "£6,000 - £12,000 annual increase",
    careerOutcomes: [
      "Hydrogen technology specialist",
      "Future energy systems engineer",
      "Research and development roles",
      "Clean technology consultant"
    ],
    accreditation: ["Hydrogen Council Recognition", "Future Energy Skills", "Research Partnership"],
    employerSupport: false,
    prerequisites: ["Advanced electrical qualification", "Chemical engineering knowledge beneficial"],
    courseOutline: [
      "Hydrogen technology fundamentals",
      "Fuel cell systems and applications",
      "Electrolysis and hydrogen production",
      "Safety and handling procedures",
      "Grid integration challenges",
      "Future market opportunities"
    ],
    assessmentMethod: "Technical research project",
    continuousAssessment: true
  },
  {
    id: 18,
    title: "Electrical Safety for Renewable Installations",
    provider: "Renewable Safety Institute",
    description: "Comprehensive safety training specific to renewable energy installations, covering wind, solar, and energy storage safety protocols.",
    duration: "3 days",
    level: "Intermediate",
    price: "£425 - £545",
    format: "Safety workshop with practical scenarios",
    nextDates: ["9 June 2025", "14 July 2025", "11 August 2025", "15 September 2025"],
    rating: 4.8,
    locations: ["Bristol", "Leeds", "Glasgow", "Cardiff"],
    category: "Safety & Compliance",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£2,000 - £4,000 annual increase",
    careerOutcomes: [
      "Renewable safety specialist",
      "High-voltage safety certification",
      "Site safety supervisor",
      "Risk assessment expert"
    ],
    accreditation: ["Renewable Safety Certified", "IOSH Recognition", "HSE Approved"],
    employerSupport: true,
    prerequisites: ["Basic electrical safety training", "Working at height certification"],
    courseOutline: [
      "Renewable energy safety standards",
      "High voltage safety procedures",
      "Arc flash protection",
      "Emergency response protocols",
      "Risk assessment techniques",
      "Safety management systems"
    ],
    assessmentMethod: "Safety scenario assessment",
    continuousAssessment: false,
    external_url: "https://www.renewablesafety.org.uk/training"
  },
  {
    id: 19,
    title: "PAT Testing (Portable Appliance Testing)",
    provider: "PAT Testing Academy",
    description: "Comprehensive training on portable appliance testing procedures, safety standards, and certification for electrical equipment inspection.",
    duration: "1 day",
    level: "Beginner",
    price: "£150 - £250",
    format: "Hands-on practical training with certification",
    nextDates: ["10 June 2025", "24 June 2025", "8 July 2025", "22 July 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Online"],
    category: "Safety & Compliance",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£1,000 - £2,500 annual increase",
    careerOutcomes: [
      "PAT testing certification",
      "Compliance specialist",
      "Self-employment opportunities",
      "Safety inspector roles"
    ],
    accreditation: ["City & Guilds 2377", "IET Approved", "NICEIC Recognition"],
    employerSupport: true,
    prerequisites: ["Basic electrical knowledge", "18th Edition preferred"],
    courseOutline: [
      "PAT testing regulations",
      "Testing procedures and frequencies",
      "Visual inspections",
      "Electrical testing methods",
      "Documentation and certification",
      "Business opportunities"
    ],
    assessmentMethod: "Practical testing and written exam",
    continuousAssessment: false,
    external_url: "https://www.pattesting.com/training"
  },
  {
    id: 20,
    title: "CompEx (Explosive Atmospheres)",
    provider: "CompEx Training Ltd",
    description: "Essential certification for working with electrical equipment in hazardous areas and explosive atmospheres.",
    duration: "3-5 days",
    level: "Advanced",
    price: "£695 - £995",
    format: "Classroom with practical scenarios",
    nextDates: ["17 June 2025", "15 July 2025", "19 August 2025", "16 September 2025"],
    rating: 4.9,
    locations: ["Aberdeen", "London", "Manchester", "Hull"],
    category: "Professional Development",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£5,000 - £10,000 annual increase",
    careerOutcomes: [
      "Hazardous area specialist",
      "Oil & gas industry opportunities",
      "Chemical plant installations",
      "Offshore work eligibility"
    ],
    accreditation: ["CompEx Certified", "IECEx Recognition", "ATEX Compliant"],
    employerSupport: true,
    prerequisites: ["Electrical qualification", "Industrial experience", "NEBOSH beneficial"],
    courseOutline: [
      "Hazardous area principles",
      "Equipment selection and installation",
      "Inspection and maintenance",
      "Certification requirements",
      "Safety procedures",
      "Practical applications"
    ],
    assessmentMethod: "Written exam and practical assessment",
    continuousAssessment: true,
    external_url: "https://www.compex.org.uk/training"
  },
  {
    id: 21,
    title: "High Voltage Switching Operations",
    provider: "HV Training Solutions",
    description: "Authorised person training for high voltage switching operations and electrical safety in high voltage environments.",
    duration: "5 days",
    level: "Advanced",
    price: "£1,195 - £1,495",
    format: "Practical training with live HV demonstrations",
    nextDates: ["24 June 2025", "22 July 2025", "26 August 2025", "23 September 2025"],
    rating: 4.8,
    locations: ["Birmingham", "Manchester", "Edinburgh", "Cardiff"],
    category: "Professional Development",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£8,000 - £15,000 annual increase",
    careerOutcomes: [
      "Authorised Person (AP) status",
      "HV switching authorisation",
      "Utility company opportunities",
      "Senior electrical roles"
    ],
    accreditation: ["ENA Recognition", "DNO Approved", "Utility Standards"],
    employerSupport: false,
    prerequisites: ["Advanced electrical qualification", "HV awareness training", "Medical fitness"],
    courseOutline: [
      "HV safety rules and procedures",
      "Switching operations",
      "Permit to work systems",
      "Emergency procedures",
      "Risk assessment",
      "Practical switching exercises"
    ],
    assessmentMethod: "Practical switching test and written exam",
    continuousAssessment: true,
    external_url: "https://www.hvtraining.co.uk/courses"
  },
  {
    id: 22,
    title: "Emergency First Aid at Work",
    provider: "Red Cross Training",
    description: "Essential first aid training for electricians working in potentially hazardous environments, including electrical emergency procedures.",
    duration: "1 day",
    level: "Beginner",
    price: "£85 - £150",
    format: "Practical hands-on training with scenarios",
    nextDates: ["5 June 2025", "12 June 2025", "19 June 2025", "26 June 2025"],
    rating: 4.9,
    locations: ["All major cities", "On-site training available"],
    category: "Safety & Compliance",
    industryDemand: "High",
    futureProofing: 5,
    salaryImpact: "£500 - £1,500 annual increase",
    careerOutcomes: [
      "First aid certification",
      "Enhanced safety credentials",
      "Site safety responsibilities",
      "Emergency response capability"
    ],
    accreditation: ["HSE Approved", "Ofqual Regulated", "Red Cross Certified"],
    employerSupport: true,
    prerequisites: ["None"],
    courseOutline: [
      "Primary survey and CPR",
      "Dealing with unconscious casualties",
      "Electric shock procedures",
      "Burns and bleeding control",
      "Shock and heart conditions",
      "Record keeping and reporting"
    ],
    assessmentMethod: "Practical assessment throughout course",
    continuousAssessment: true,
    external_url: "https://www.redcross.org.uk/first-aid-training"
  },
  {
    id: 23,
    title: "ECS Card Application & Health & Safety",
    provider: "ECS Assessment Centres",
    description: "Health & safety assessment and ECS card application support for electricians working on construction sites.",
    duration: "Half day",
    level: "Beginner",
    price: "£50 - £85",
    format: "Assessment centre with online test",
    nextDates: ["Available daily at assessment centres"],
    rating: 4.6,
    locations: ["Nationwide assessment centres"],
    category: "Safety & Compliance",
    industryDemand: "High",
    futureProofing: 4,
    salaryImpact: "£1,000 - £3,000 annual increase",
    careerOutcomes: [
      "Construction site access",
      "ECS card certification",
      "Enhanced employability",
      "Compliance with site requirements"
    ],
    accreditation: ["ECS Approved", "CSCS Equivalent", "JIB Recognition"],
    employerSupport: true,
    prerequisites: ["Electrical qualification", "Basic health & safety knowledge"],
    courseOutline: [
      "Construction health & safety",
      "Electrical safety on sites",
      "Risk assessment principles",
      "Personal protective equipment",
      "Emergency procedures",
      "Environmental awareness"
    ],
    assessmentMethod: "Computer-based health & safety test",
    continuousAssessment: false,
    external_url: "https://www.ecscard.org.uk/apply"
  }
];

export const enhancedTrainingCenters: EnhancedTrainingCenter[] = [
  {
    id: 1,
    name: "NICEIC Learning & Development",
    location: "London",
    address: "Warwick House, Houghton Hall Park, Houghton Regis, Bedfordshire, LU5 5ZX",
    contact: "0333 015 6626",
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
    contact: "020 7313 4800",
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
    contact: "0844 543 0000",
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
  totalCourses: 180,
  totalProviders: 52,
  averageRating: 4.7,
  highDemandCourses: 28,
  emergingTechCourses: 25,
  averageSalaryImpact: "£3,500 - £6,000",
  topCategories: [
    { name: "Essential Qualifications", count: 45 },
    { name: "Emerging Technologies", count: 35 },
    { name: "Safety & Compliance", count: 40 },
    { name: "Specialised Skills", count: 35 },
    { name: "Business & Management", count: 25 }
  ]
};
