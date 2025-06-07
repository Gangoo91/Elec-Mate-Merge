
export interface AccreditationOption {
  id: string;
  title: string;
  provider: string;
  category: string;
  level: string;
  duration: string;
  cost: string;
  description: string;
  benefits: string[];
  requirements: string[];
  nextSteps: string[];
  popularity: number;
  difficulty: string;
  onlineAvailable: boolean;
  locations: string[];
  website: string;
  accreditationBody: string;
  renewalPeriod?: string;
  prerequisites?: string[];
  careerImpact: string;
}

export const accreditationCategories = [
  "All Categories",
  "Professional Bodies",
  "Trade Associations", 
  "Safety Certifications",
  "Specialist Skills",
  "Management & Leadership",
  "Health & Safety"
];

export const accreditationLevels = [
  "All Levels",
  "Entry Level",
  "Intermediate", 
  "Advanced",
  "Expert"
];

export const enhancedAccreditationOptions: AccreditationOption[] = [
  {
    id: "iet-professional",
    title: "IET Professional Registration",
    provider: "Institution of Engineering and Technology",
    category: "Professional Bodies",
    level: "Advanced",
    duration: "Ongoing process",
    cost: "£200-400 annually",
    description: "Professional registration with the IET demonstrating competence and commitment to electrical engineering excellence.",
    benefits: [
      "Professional recognition and credibility",
      "Access to exclusive networking events",
      "Continuing Professional Development support",
      "Enhanced career prospects",
      "Professional indemnity insurance discounts"
    ],
    requirements: [
      "Relevant electrical qualification",
      "Minimum 4 years relevant experience",
      "Continuing Professional Development commitment",
      "Professional interview"
    ],
    nextSteps: [
      "Review IET membership grades",
      "Prepare application portfolio",
      "Attend professional interview",
      "Maintain CPD records"
    ],
    popularity: 95,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.theiet.org",
    accreditationBody: "IET",
    renewalPeriod: "Annual",
    prerequisites: ["Electrical qualification", "4+ years experience"],
    careerImpact: "Significant enhancement to professional standing and career prospects"
  },
  {
    id: "eca-membership",
    title: "ECA Membership",
    provider: "Electrical Contractors' Association",
    category: "Trade Associations",
    level: "Intermediate",
    duration: "Ongoing",
    cost: "£300-800 annually",
    description: "Membership of the UK's leading trade association for electrical contractors, providing business support and industry representation.",
    benefits: [
      "Industry recognition and credibility",
      "Technical support and guidance",
      "Business development resources",
      "Networking opportunities",
      "Training and certification schemes"
    ],
    requirements: [
      "Electrical contracting business",
      "Appropriate electrical qualifications",
      "Public liability insurance",
      "Commitment to industry standards"
    ],
    nextSteps: [
      "Submit membership application",
      "Provide business documentation",
      "Undergo assessment process",
      "Maintain membership requirements"
    ],
    popularity: 88,
    difficulty: "Intermediate",
    onlineAvailable: true,
    locations: ["UK-wide"],
    website: "https://www.eca.co.uk",
    accreditationBody: "ECA",
    renewalPeriod: "Annual",
    careerImpact: "Enhanced business credibility and industry standing"
  },
  {
    id: "niceic-approved",
    title: "NICEIC Approved Contractor",
    provider: "National Inspection Council for Electrical Installation Contracting",
    category: "Trade Associations",
    level: "Advanced",
    duration: "Initial assessment + ongoing",
    cost: "£400-1200 annually",
    description: "Premier electrical contracting scheme providing consumer confidence and industry recognition.",
    benefits: [
      "Consumer trust and confidence",
      "Marketing and promotional support",
      "Technical support helpline",
      "Access to training courses",
      "Insurance scheme discounts"
    ],
    requirements: [
      "Relevant electrical qualifications",
      "2+ years electrical experience",
      "Public liability insurance",
      "Initial technical assessment"
    ],
    nextSteps: [
      "Complete application form",
      "Undergo technical assessment",
      "Demonstrate competence",
      "Maintain annual assessments"
    ],
    popularity: 92,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.niceic.com",
    accreditationBody: "NICEIC",
    renewalPeriod: "Annual",
    careerImpact: "Significant boost to business credibility and customer trust"
  },
  {
    id: "iosh-working-safely",
    title: "IOSH Working Safely",
    provider: "Institution of Occupational Safety and Health",
    category: "Safety Certifications",
    level: "Entry Level",
    duration: "1 day",
    cost: "£150-250",
    description: "Essential health and safety training for all workers, providing foundation knowledge of workplace safety.",
    benefits: [
      "Recognised safety qualification",
      "Enhanced safety awareness",
      "Improved employability",
      "Foundation for further safety training",
      "Internationally recognised"
    ],
    requirements: [
      "No prior qualifications needed",
      "Basic English comprehension",
      "Attendance at training course"
    ],
    nextSteps: [
      "Book training course",
      "Attend 1-day training",
      "Complete assessment",
      "Receive certificate"
    ],
    popularity: 85,
    difficulty: "Entry Level",
    onlineAvailable: true,
    locations: ["UK-wide", "Online"],
    website: "https://www.iosh.com",
    accreditationBody: "IOSH",
    renewalPeriod: "3 years",
    careerImpact: "Essential foundation for health and safety awareness"
  },
  {
    id: "smsts",
    title: "SMSTS (Site Management Safety Training Scheme)",
    provider: "CITB",
    category: "Safety Certifications",
    level: "Advanced",
    duration: "5 days",
    cost: "£600-900",
    description: "Comprehensive health and safety training for site managers and supervisors in construction.",
    benefits: [
      "Legal requirement for site management",
      "Enhanced career prospects",
      "Comprehensive safety knowledge",
      "Industry recognition",
      "Foundation for management roles"
    ],
    requirements: [
      "Previous construction experience",
      "CSCS card (recommended)",
      "English language proficiency"
    ],
    nextSteps: [
      "Book SMSTS course",
      "Complete 5-day training",
      "Pass written assessment",
      "Maintain certification"
    ],
    popularity: 78,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.citb.co.uk",
    accreditationBody: "CITB",
    renewalPeriod: "5 years",
    careerImpact: "Essential for construction site management roles"
  },
  {
    id: "compex",
    title: "CompEx (Explosive Atmospheres)",
    provider: "CompEx",
    category: "Specialist Skills",
    level: "Advanced",
    duration: "3-5 days per unit",
    cost: "£500-800 per unit",
    description: "Specialist certification for working with electrical equipment in explosive atmospheres.",
    benefits: [
      "Access to hazardous area work",
      "Specialist skills premium",
      "International recognition",
      "Enhanced safety competence",
      "Higher earning potential"
    ],
    requirements: [
      "Electrical qualification",
      "Relevant electrical experience",
      "Understanding of electrical principles"
    ],
    nextSteps: [
      "Choose relevant CompEx units",
      "Book training course",
      "Complete practical assessments",
      "Maintain certification"
    ],
    popularity: 65,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["Specialist centres UK-wide"],
    website: "https://www.compex.org.uk",
    accreditationBody: "CompEx",
    renewalPeriod: "3 years",
    careerImpact: "Access to highly specialised and well-paid roles"
  },
  {
    id: "pat-testing",
    title: "PAT Testing Certification",
    provider: "Various providers",
    category: "Specialist Skills",
    level: "Intermediate",
    duration: "1-2 days",
    cost: "£200-400",
    description: "Certification to carry out Portable Appliance Testing, ensuring electrical safety of portable equipment.",
    benefits: [
      "Additional revenue stream",
      "Flexible work opportunities",
      "High demand service",
      "Quick return on investment",
      "Standalone business opportunity"
    ],
    requirements: [
      "Basic electrical knowledge",
      "Understanding of electrical safety",
      "Training course completion"
    ],
    nextSteps: [
      "Choose training provider",
      "Complete PAT testing course",
      "Purchase testing equipment",
      "Start offering PAT services"
    ],
    popularity: 82,
    difficulty: "Intermediate",
    onlineAvailable: true,
    locations: ["UK-wide", "Online"],
    website: "Various providers",
    accreditationBody: "Various",
    renewalPeriod: "3 years (recommended)",
    careerImpact: "Excellent opportunity for additional income and business development"
  },
  {
    id: "solar-pv",
    title: "Solar PV Installation Certification",
    provider: "Various MCS providers",
    category: "Specialist Skills",
    level: "Intermediate",
    duration: "3-5 days",
    cost: "£800-1200",
    description: "Certification for installing solar photovoltaic systems, meeting MCS standards for renewable energy.",
    benefits: [
      "Access to growing renewable market",
      "Higher value installations",
      "Government scheme eligibility",
      "Future-proof skills",
      "Environmental contribution"
    ],
    requirements: [
      "Electrical qualification (Level 3)",
      "Understanding of AC/DC systems",
      "Working at height competence"
    ],
    nextSteps: [
      "Choose MCS training provider",
      "Complete training course",
      "Pass assessment",
      "Register with MCS scheme"
    ],
    popularity: 75,
    difficulty: "Intermediate",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.microgenerationcertification.org",
    accreditationBody: "MCS",
    renewalPeriod: "Annual surveillance",
    careerImpact: "Access to rapidly growing renewable energy sector"
  }
];
