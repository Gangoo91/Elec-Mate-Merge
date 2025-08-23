
// Course data
export interface CareerCourse {
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
}

// Training center data
export interface TrainingCenter {
  id: number;
  name: string;
  location: string;
  address: string;
  contact: string;
  courses: string[];
  facilities: string[];
}

// Available UK locations for filtering
export const ukLocations = [
  "All Locations", "London", "Manchester", "Birmingham", "Glasgow", "Edinburgh",
  "Belfast", "Cardiff", "Newcastle", "Liverpool", "Leeds", "Bristol", "Sheffield", "Online",
  "Aberdeen", "Southampton", "Nationwide"
];

// Enhanced industry courses including MEWP, PASMA, etc.
export const careerCourses: CareerCourse[] = [
  {
    id: 1,
    title: "18th Edition Wiring Regulations",
    provider: "NICEIC",
    description: "Essential course covering the latest BS7671 electrical regulations for all UK installations.",
    duration: "3 days",
    level: "Intermediate",
    price: "£350 - £450",
    format: "Classroom and online options",
    nextDates: ["15 June 2025", "22 July 2025", "18 August 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"]
  },
  {
    id: 2,
    title: "Inspection & Testing",
    provider: "City & Guilds",
    description: "Learn how to properly test and verify electrical installations to industry standards.",
    duration: "5 days",
    level: "Advanced",
    price: "£600 - £750",
    format: "Classroom with practical assessments",
    nextDates: ["10 June 2025", "14 July 2025", "11 September 2025"],
    rating: 4.7,
    locations: ["Cardiff", "Newcastle", "London", "Edinburgh"]
  },
  {
    id: 3,
    title: "Electric Vehicle Charging",
    provider: "ECA",
    description: "Specialised training for installing and maintaining EV charging points.",
    duration: "2 days",
    level: "Intermediate",
    price: "£375 - £450",
    format: "Blended learning with practical sessions",
    nextDates: ["5 June 2025", "3 August 2025", "7 October 2025"],
    rating: 4.9,
    locations: ["Bristol", "London", "Manchester", "Leeds"]
  },
  {
    id: 4,
    title: "MEWP Operator Training (IPAF)",
    provider: "IPAF Certified",
    description: "Mobile Elevating Work Platform operation certification, essential for electricians working at height.",
    duration: "1-2 days",
    level: "All levels",
    price: "£200 - £350",
    format: "Practical training with theory assessment",
    nextDates: ["8 June 2025", "15 July 2025", "9 September 2025"],
    rating: 4.8,
    locations: ["Birmingham", "Manchester", "Bristol", "London", "Glasgow"]
  },
  {
    id: 5,
    title: "PASMA Towers for Users",
    provider: "PASMA Accredited",
    description: "Essential training for safe assembly, dismantling and use of mobile access towers.",
    duration: "1 day",
    level: "All levels",
    price: "£150 - £200",
    format: "Classroom with practical assessment",
    nextDates: ["12 June 2025", "21 July 2025", "18 August 2025"],
    rating: 4.7,
    locations: ["London", "Liverpool", "Edinburgh", "Cardiff"]
  },
  {
    id: 6,
    title: "Working at Heights & Harness Safety",
    provider: "Construction Skills",
    description: "Critical safety training for electrical work at height including harness use and rescue procedures.",
    duration: "1 day",
    level: "All levels",
    price: "£120 - £180",
    format: "Practical training with theory components",
    nextDates: ["20 June 2025", "25 July 2025", "15 September 2025"],
    rating: 4.9,
    locations: ["Newcastle", "Sheffield", "London", "Belfast"]
  },
  {
    id: 7,
    title: "Fire Alarm Systems Installation",
    provider: "FIA",
    description: "Comprehensive training on designing, installing and maintaining fire detection systems.",
    duration: "4 days",
    level: "Intermediate",
    price: "£500 - £600",
    format: "Classroom with practical elements",
    nextDates: ["8 June 2025", "10 August 2025", "12 October 2025"],
    rating: 4.8,
    locations: ["London", "Manchester", "Birmingham", "Glasgow"]
  },
  {
    id: 8,
    title: "Asbestos Awareness",
    provider: "UKATA Certified",
    description: "Critical safety training for identifying and working safely around potential asbestos materials.",
    duration: "Half day",
    level: "All levels",
    price: "£70 - £90",
    format: "Classroom or online options",
    nextDates: ["5 June 2025", "10 July 2025", "12 August 2025"],
    rating: 4.6,
    locations: ["Online", "London", "Manchester", "Birmingham", "Edinburgh"]
  },
  {
    id: 9,
    title: "Hazardous Areas & ATEX Training",
    provider: "CompEx",
    description: "Specialist training for electricians working in potentially explosive atmospheres and hazardous environments.",
    duration: "5 days",
    level: "Advanced",
    price: "£900 - £1,200",
    format: "Classroom with practical assessments",
    nextDates: ["13 June 2025", "18 July 2025", "22 September 2025"],
    rating: 4.9,
    locations: ["Aberdeen", "Manchester", "London", "Southampton"]
  },
  {
    id: 10,
    title: "First Aid at Work",
    provider: "St John Ambulance",
    description: "Essential first aid qualification for site workers, covering emergency response procedures.",
    duration: "3 days",
    level: "All levels",
    price: "£250 - £350",
    format: "Practical training with assessments",
    nextDates: ["10 June 2025", "15 July 2025", "20 August 2025"],
    rating: 4.8,
    locations: ["Nationwide", "London", "Manchester", "Birmingham", "Glasgow", "Bristol"]
  },
  {
    id: 11,
    title: "Confined Spaces Training",
    provider: "City & Guilds",
    description: "Safety training for working in restricted access areas with potential hazards.",
    duration: "2 days",
    level: "Intermediate",
    price: "£350 - £450",
    format: "Practical exercises with theory components",
    nextDates: ["22 June 2025", "17 July 2025", "12 September 2025"],
    rating: 4.7,
    locations: ["Leeds", "London", "Birmingham", "Newcastle"]
  },
  {
    id: 12,
    title: "Emergency Lighting Installation & Maintenance",
    provider: "Industry Qualifications",
    description: "Specialized certification for installing, testing and maintaining emergency lighting systems.",
    duration: "2 days",
    level: "Intermediate",
    price: "£320 - £400",
    format: "Classroom with hands-on practice",
    nextDates: ["8 June 2025", "20 July 2025", "15 September 2025"],
    rating: 4.6,
    locations: ["London", "Manchester", "Bristol", "Edinburgh"]
  },
  {
    id: 13,
    title: "Smart Home/Building Automation Systems",
    provider: "KNX Association",
    description: "Modern technology integration training for intelligent building systems installation and programming.",
    duration: "5 days",
    level: "Advanced",
    price: "£850 - £1,200",
    format: "Classroom with practical programming exercises",
    nextDates: ["14 June 2025", "19 July 2025", "13 September 2025"],
    rating: 4.9,
    locations: ["London", "Manchester", "Bristol"]
  },
  {
    id: 14,
    title: "Electric Vehicle Charging Installation (Advanced)",
    provider: "IET Academy",
    description: "Advanced training for complex EV charging installations including three-phase and commercial systems.",
    duration: "3 days",
    level: "Advanced",
    price: "£550 - £700",
    format: "Classroom with advanced practical assessments",
    nextDates: ["24 June 2025", "22 July 2025", "19 September 2025"],
    rating: 4.8,
    locations: ["London", "Birmingham", "Manchester", "Glasgow"]
  },
  {
    id: 15,
    title: "Testing & Inspection Periodic (Advanced)",
    provider: "NAPIT",
    description: "Comprehensive training for conducting periodic inspection and testing of electrical installations.",
    duration: "4 days",
    level: "Advanced",
    price: "£650 - £800",
    format: "Classroom with extensive practical assessment",
    nextDates: ["18 June 2025", "16 July 2025", "24 September 2025"],
    rating: 4.7,
    locations: ["London", "Manchester", "Leeds", "Newcastle", "Cardiff"]
  },
  {
    id: 16,
    title: "Commercial & Industrial 3-Phase Systems",
    provider: "ECA",
    description: "Specialized power systems training for complex commercial and industrial installations.",
    duration: "4 days",
    level: "Advanced",
    price: "£700 - £850",
    format: "Classroom and practical workshop sessions",
    nextDates: ["9 June 2025", "21 July 2025", "22 September 2025"],
    rating: 4.8,
    locations: ["Birmingham", "London", "Manchester", "Glasgow"]
  },
  {
    id: 17,
    title: "Data Cabling & Network Infrastructure",
    provider: "CNet Training",
    description: "Installation and testing of structured cabling systems for network and communications.",
    duration: "3 days",
    level: "Intermediate",
    price: "£450 - £600",
    format: "Hands-on practical training with theory",
    nextDates: ["11 June 2025", "16 July 2025", "23 September 2025"],
    rating: 4.6,
    locations: ["London", "Manchester", "Birmingham", "Edinburgh"]
  },
  {
    id: 18,
    title: "Thermal Imaging/Thermography",
    provider: "FLIR Training Centre",
    description: "For preventative maintenance and fault finding using thermal imaging technology.",
    duration: "2 days",
    level: "Intermediate",
    price: "£550 - £700",
    format: "Hands-on equipment training with analysis techniques",
    nextDates: ["17 June 2025", "29 July 2025", "25 September 2025"],
    rating: 4.7,
    locations: ["London", "Birmingham", "Manchester", "Aberdeen"]
  }
];

// Course training centers data
export const trainingCenters: TrainingCenter[] = [
  {
    id: 1,
    name: "National Training Centre",
    location: "London",
    address: "123 Electrical Way, London, EC1A 1BB",
    contact: "020 7123 4567",
    courses: ["18th Edition Wiring Regulations", "Inspection & Testing", "Electric Vehicle Charging", "MEWP Operator Training (IPAF)"],
    facilities: ["Workshop spaces", "Classroom facilities", "On-site parking", "Refreshments provided"]
  },
  {
    id: 2,
    name: "Northern Electrical Academy",
    location: "Manchester",
    address: "45 Power Street, Manchester, M1 2WD",
    contact: "0161 765 4321",
    courses: ["PASMA Towers for Users", "Working at Heights & Harness Safety", "18th Edition Wiring Regulations", "MEWP Operator Training (IPAF)"],
    facilities: ["Mock installation areas", "Computer suite", "Cafeteria", "Free parking"]
  },
  {
    id: 3,
    name: "Midlands Training Hub",
    location: "Birmingham",
    address: "78 Circuit Avenue, Birmingham, B4 6TH",
    contact: "0121 876 5432",
    courses: ["Fire Alarm Systems Installation", "18th Edition Wiring Regulations", "MEWP Operator Training (IPAF)"],
    facilities: ["Practical training areas", "Modern classrooms", "Accommodation available nearby", "Lunch included"]
  },
  {
    id: 4,
    name: "Scottish Electrical Institute",
    location: "Glasgow",
    address: "27 Voltage Road, Glasgow, G1 2BC",
    contact: "0141 432 1098",
    courses: ["18th Edition Wiring Regulations", "Inspection & Testing", "MEWP Operator Training (IPAF)", "Fire Alarm Systems Installation"],
    facilities: ["State-of-the-art equipment", "Small class sizes", "Central location", "Disabled access"]
  }
];
