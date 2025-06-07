
export interface EnhancedEducationOption {
  id: number;
  title: string;
  institution: string;
  description: string;
  level: string;
  category: string;
  duration: string;
  studyMode: string;
  cost: string;
  fundingOptions: string[];
  locations: string[];
  nextIntakes: string[];
  entryRequirements: string[];
  keyTopics: string[];
  careerOutcomes: string[];
  employmentRate: number;
  averageStartingSalary: string;
  industryDemand: "High" | "Medium" | "Low";
  rating: number;
  accreditation: string[];
  partnerEmployers: string[];
  onlineComponents: boolean;
  practicalHours: number;
  assessmentMethods: string[];
}

export const educationCategories = [
  "All Categories",
  "Higher National Certificates (HNC)",
  "Higher National Diplomas (HND)", 
  "Foundation Degrees",
  "Bachelor's Degrees",
  "Master's Degrees",
  "Professional Certifications",
  "Apprenticeship Pathway"
];

export const studyModes = [
  "All Study Modes",
  "Full-time",
  "Part-time", 
  "Distance Learning",
  "Flexible",
  "Evening Classes",
  "Weekend Study"
];

export const enhancedEducationOptions: EnhancedEducationOption[] = [
  {
    id: 1,
    title: "HNC Electrical Engineering",
    institution: "City & Guilds College London",
    description: "Comprehensive Higher National Certificate covering electrical engineering fundamentals with hands-on practical experience and industry-relevant theory.",
    level: "Level 4",
    category: "Higher National Certificates (HNC)",
    duration: "1-2 years",
    studyMode: "Part-time",
    cost: "£3,500 - £5,200",
    fundingOptions: ["Advanced Learner Loan", "Employer Sponsorship", "Self-funded"],
    locations: ["London", "Birmingham", "Manchester", "Leeds"],
    nextIntakes: ["September 2025", "January 2026"],
    entryRequirements: ["Level 3 Electrical Installation", "C&G 2365", "NVQ Level 3", "Relevant work experience"],
    keyTopics: ["Electrical Principles", "Circuit Analysis", "Power Systems", "Control Systems", "Health & Safety", "Project Management"],
    careerOutcomes: ["Electrical Technician", "Maintenance Engineer", "Design Technician", "Project Coordinator"],
    employmentRate: 96,
    averageStartingSalary: "£28,000 - £32,000",
    industryDemand: "High",
    rating: 4.8,
    accreditation: ["Pearson", "City & Guilds", "EAL"],
    partnerEmployers: ["Balfour Beatty", "Kier Group", "Carillion"],
    onlineComponents: true,
    practicalHours: 240,
    assessmentMethods: ["Coursework", "Practical Assessment", "Written Examinations"]
  },
  {
    id: 2,
    title: "HND Electrical & Electronic Engineering",
    institution: "Coventry University",
    description: "Advanced Higher National Diploma combining electrical and electronic engineering with modern technology applications and industry partnerships.",
    level: "Level 5",
    category: "Higher National Diplomas (HND)",
    duration: "2 years full-time, 3 years part-time",
    studyMode: "Full-time",
    cost: "£6,800 - £8,500",
    fundingOptions: ["Advanced Learner Loan", "Student Finance", "Employer Sponsorship"],
    locations: ["Coventry", "London", "Scarborough"],
    nextIntakes: ["September 2025", "February 2026"],
    entryRequirements: ["HNC or equivalent", "Level 3 qualifications", "Industry experience"],
    keyTopics: ["Advanced Circuit Design", "Digital Systems", "Power Electronics", "Renewable Energy", "Automation", "Research Methods"],
    careerOutcomes: ["Senior Technician", "Design Engineer", "Project Engineer", "Technical Manager"],
    employmentRate: 94,
    averageStartingSalary: "£32,000 - £38,000",
    industryDemand: "High",
    rating: 4.7,
    accreditation: ["Pearson BTEC", "IET Accredited"],
    partnerEmployers: ["Rolls-Royce", "BAE Systems", "Schneider Electric"],
    onlineComponents: true,
    practicalHours: 480,
    assessmentMethods: ["Portfolio", "Group Projects", "Presentations", "Technical Reports"]
  },
  {
    id: 3,
    title: "BEng (Hons) Electrical Engineering",
    institution: "University of Strathclyde",
    description: "Honours degree in electrical engineering with strong industry connections, covering power systems, electronics, and emerging technologies.",
    level: "Level 6",
    category: "Bachelor's Degrees",
    duration: "3-4 years full-time, 5-6 years part-time",
    studyMode: "Full-time",
    cost: "£9,250 per year (UK students)",
    fundingOptions: ["Student Finance", "Scholarships", "Employer Sponsorship", "Bursaries"],
    locations: ["Glasgow", "London"],
    nextIntakes: ["September 2025"],
    entryRequirements: ["A-Levels: ABB including Maths", "BTEC Triple Distinction", "HND with Merit"],
    keyTopics: ["Power Systems Engineering", "Control Engineering", "Signal Processing", "Renewable Energy Systems", "Professional Engineering"],
    careerOutcomes: ["Graduate Engineer", "Design Engineer", "Project Engineer", "Research & Development"],
    employmentRate: 97,
    averageStartingSalary: "£26,000 - £32,000",
    industryDemand: "High",
    rating: 4.9,
    accreditation: ["IET Accredited", "Engineering Council"],
    partnerEmployers: ["Scottish Power", "SSE", "National Grid"],
    onlineComponents: false,
    practicalHours: 600,
    assessmentMethods: ["Examinations", "Coursework", "Laboratory Reports", "Final Year Project"]
  },
  {
    id: 4,
    title: "Foundation Degree in Building Services Engineering",
    institution: "South Thames College",
    description: "Work-focused foundation degree combining electrical, mechanical, and building services with strong employer partnerships.",
    level: "Level 5",
    category: "Foundation Degrees",
    duration: "2 years full-time, 3 years part-time",
    studyMode: "Part-time",
    cost: "£4,500 - £6,000",
    fundingOptions: ["Student Finance", "Advanced Learner Loan", "Employer Sponsorship"],
    locations: ["London", "Surrey", "Kent"],
    nextIntakes: ["September 2025", "January 2026"],
    entryRequirements: ["Level 3 qualification", "Relevant work experience", "GCSE Maths & English"],
    keyTopics: ["HVAC Systems", "Electrical Installation", "Energy Management", "Sustainability", "Building Regulations"],
    careerOutcomes: ["Building Services Technician", "Energy Assessor", "Facilities Manager", "M&E Coordinator"],
    employmentRate: 92,
    averageStartingSalary: "£24,000 - £28,000",
    industryDemand: "Medium",
    rating: 4.5,
    accreditation: ["University of Greenwich validated"],
    partnerEmployers: ["Crown House Technologies", "Skanska", "Mace Group"],
    onlineComponents: true,
    practicalHours: 300,
    assessmentMethods: ["Work-based Assessment", "Portfolio", "Technical Reports"]
  },
  {
    id: 5,
    title: "MSc Renewable Energy Engineering",
    institution: "University of Edinburgh",
    description: "Advanced master's degree focusing on renewable energy technologies, smart grids, and sustainable electrical systems.",
    level: "Level 7",
    category: "Master's Degrees",
    duration: "1 year full-time, 2 years part-time",
    studyMode: "Full-time",
    cost: "£12,500 - £15,000",
    fundingOptions: ["Postgraduate Loan", "Research Councils", "Industry Sponsorship", "Scholarships"],
    locations: ["Edinburgh", "Online delivery available"],
    nextIntakes: ["September 2025"],
    entryRequirements: ["Bachelor's degree 2:1 or above", "Engineering background preferred", "Professional experience considered"],
    keyTopics: ["Wind Energy Systems", "Solar PV Technology", "Energy Storage", "Smart Grid Technology", "Policy & Economics"],
    careerOutcomes: ["Renewable Energy Engineer", "Project Developer", "Energy Consultant", "Research Engineer"],
    employmentRate: 95,
    averageStartingSalary: "£35,000 - £45,000",
    industryDemand: "High",
    rating: 4.8,
    accreditation: ["IET Accredited", "Engineering Council"],
    partnerEmployers: ["Ørsted", "EDF Renewables", "ScottishPower Renewables"],
    onlineComponents: true,
    practicalHours: 200,
    assessmentMethods: ["Dissertation", "Group Project", "Technical Assignments", "Industry Placement"]
  },
  {
    id: 6,
    title: "City & Guilds 2391-52 Inspection & Testing",
    institution: "Various Training Centres",
    description: "Professional certification for electrical inspection and testing, essential for qualified electricians seeking advancement.",
    level: "Level 3",
    category: "Professional Certifications",
    duration: "5-10 days intensive",
    studyMode: "Flexible",
    cost: "£800 - £1,200",
    fundingOptions: ["Employer Funding", "Self-funded", "Skills Bank"],
    locations: ["Nationwide locations", "London", "Birmingham", "Manchester", "Glasgow"],
    nextIntakes: ["Monthly intakes available"],
    entryRequirements: ["18th Edition", "Level 3 Electrical qualification", "Industry experience"],
    keyTopics: ["BS 7671 Requirements", "Test Equipment", "Inspection Procedures", "Certification", "Health & Safety"],
    careerOutcomes: ["Qualified Supervisor", "Inspection Engineer", "Compliance Officer", "Self-employment opportunities"],
    employmentRate: 98,
    averageStartingSalary: "£32,000 - £40,000",
    industryDemand: "High",
    rating: 4.9,
    accreditation: ["City & Guilds", "EAL", "NICEIC Approved"],
    partnerEmployers: ["NICEIC", "NAPIT", "Electrical Safety First"],
    onlineComponents: false,
    practicalHours: 35,
    assessmentMethods: ["Practical Assessment", "Multiple Choice Exam", "Open Book Exam"]
  },
  {
    id: 7,
    title: "Degree Apprenticeship - Electrical Engineering",
    institution: "Rolls-Royce & University Partners",
    description: "Earn while you learn degree apprenticeship combining university study with hands-on experience at leading engineering companies.",
    level: "Level 6",
    category: "Apprenticeship Pathway",
    duration: "4-5 years",
    studyMode: "Part-time",
    cost: "Fully funded by employer",
    fundingOptions: ["Fully funded", "Apprenticeship Levy"],
    locations: ["Derby", "Bristol", "Various employer sites"],
    nextIntakes: ["September 2025"],
    entryRequirements: ["A-Levels AAB", "Strong GCSE profile", "Successful assessment centre"],
    keyTopics: ["Engineering Fundamentals", "Power Systems", "Control Systems", "Professional Skills", "Research Project"],
    careerOutcomes: ["Graduate Engineer", "Design Engineer", "Project Engineer", "Technical Specialist"],
    employmentRate: 100,
    averageStartingSalary: "£28,000 - £35,000",
    industryDemand: "High",
    rating: 4.9,
    accreditation: ["IET Accredited", "University validated"],
    partnerEmployers: ["Rolls-Royce", "BAE Systems", "Siemens"],
    onlineComponents: true,
    practicalHours: 1200,
    assessmentMethods: ["University Assessments", "Workplace Projects", "Portfolio", "Final Degree Project"]
  },
  {
    id: 8,
    title: "BSc (Hons) Smart Grid Technology",
    institution: "Nottingham Trent University",
    description: "Cutting-edge degree programme focusing on future electrical networks, IoT integration, and digital energy systems.",
    level: "Level 6",
    category: "Bachelor's Degrees",
    duration: "3 years full-time, 4 years with placement",
    studyMode: "Full-time",
    cost: "£9,250 per year (UK students)",
    fundingOptions: ["Student Finance", "Industry Scholarships", "Placement Year Salary"],
    locations: ["Nottingham", "Online components available"],
    nextIntakes: ["September 2025"],
    entryRequirements: ["A-Levels: BBC including Maths", "BTEC Extended Diploma", "Access to HE"],
    keyTopics: ["Smart Grid Architecture", "Data Analytics", "IoT Systems", "Cybersecurity", "Energy Storage", "Electric Vehicles"],
    careerOutcomes: ["Smart Grid Engineer", "Data Analyst", "Network Engineer", "Innovation Specialist"],
    employmentRate: 93,
    averageStartingSalary: "£25,000 - £30,000",
    industryDemand: "High",
    rating: 4.6,
    accreditation: ["IET Recognition pending"],
    partnerEmployers: ["National Grid ESO", "UK Power Networks", "Octopus Energy"],
    onlineComponents: true,
    practicalHours: 450,
    assessmentMethods: ["Practical Projects", "Data Analysis Tasks", "Group Work", "Industry Challenge"]
  }
];
