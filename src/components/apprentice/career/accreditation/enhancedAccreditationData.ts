
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
  "Competent Person Schemes",
  "Professional Engineering Bodies",
  "Trade Associations",
  "Safety & Health Bodies",
  "Project & Construction Management"
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
    id: "niceic-approved",
    title: "NICEIC Approved Contractor",
    provider: "National Inspection Council for Electrical Installation Contracting",
    category: "Competent Person Schemes",
    level: "Advanced",
    duration: "Initial assessment + ongoing",
    cost: "£400-1200 annually",
    description: "Premier electrical contracting scheme providing consumer confidence and industry recognition for electrical contractors.",
    benefits: [
      "Consumer trust and confidence",
      "Marketing and promotional support",
      "Technical support helpline",
      "Access to training courses",
      "Insurance scheme discounts",
      "Building Control notification rights"
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
    id: "napit-membership",
    title: "NAPIT Membership",
    provider: "National Association of Professional Inspectors and Testers",
    category: "Competent Person Schemes",
    level: "Advanced",
    duration: "Initial assessment + ongoing",
    cost: "£350-900 annually",
    description: "Leading competent person scheme for electrical contractors, providing industry recognition and Building Regulations compliance.",
    benefits: [
      "Building Control notification rights",
      "Consumer confidence through recognition",
      "Technical support and guidance",
      "Marketing materials and support",
      "Insurance benefits",
      "Professional networking opportunities"
    ],
    requirements: [
      "Appropriate electrical qualifications",
      "Relevant electrical experience",
      "Public liability insurance",
      "Technical assessment"
    ],
    nextSteps: [
      "Submit membership application",
      "Undergo technical assessment",
      "Demonstrate electrical competence",
      "Maintain annual membership"
    ],
    popularity: 88,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.napit.org.uk",
    accreditationBody: "NAPIT",
    renewalPeriod: "Annual",
    careerImpact: "Enhanced business credibility and regulatory compliance"
  },
  {
    id: "elecsa-scheme",
    title: "ELECSA Membership",
    provider: "ELECSA (Part of Certsure)",
    category: "Competent Person Schemes",
    level: "Advanced",
    duration: "Initial assessment + ongoing",
    cost: "£400-800 annually",
    description: "Government-authorised competent person scheme for electrical contractors, enabling self-certification of electrical work.",
    benefits: [
      "Self-certification of electrical work",
      "Building Control notification rights",
      "Consumer protection through insurance",
      "Technical support helpline",
      "Marketing support materials",
      "Industry recognition"
    ],
    requirements: [
      "Electrical qualifications (City & Guilds 2391/2392)",
      "Minimum 3 years electrical experience",
      "Public liability insurance",
      "Initial assessment process"
    ],
    nextSteps: [
      "Apply for ELECSA membership",
      "Complete technical assessment",
      "Demonstrate electrical competence",
      "Maintain ongoing compliance"
    ],
    popularity: 85,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.elecsa.co.uk",
    accreditationBody: "ELECSA/Certsure",
    renewalPeriod: "Annual",
    careerImpact: "Enables independent electrical contracting with regulatory compliance"
  },
  {
    id: "stroma-certification",
    title: "STROMA Certification",
    provider: "STROMA Certification",
    category: "Competent Person Schemes",
    level: "Advanced",
    duration: "Assessment process + ongoing",
    cost: "£350-750 annually",
    description: "UKAS-accredited certification body providing competent person scheme membership for electrical contractors.",
    benefits: [
      "UKAS-accredited certification",
      "Building Regulations compliance",
      "Technical support services",
      "Insurance scheme access",
      "Marketing support",
      "Professional recognition"
    ],
    requirements: [
      "Appropriate electrical qualifications",
      "Relevant work experience",
      "Technical competence assessment",
      "Insurance requirements"
    ],
    nextSteps: [
      "Submit application to STROMA",
      "Undergo competence assessment",
      "Demonstrate technical skills",
      "Maintain certification standards"
    ],
    popularity: 78,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.stroma.com",
    accreditationBody: "STROMA",
    renewalPeriod: "Annual",
    careerImpact: "Professional certification with UKAS recognition"
  },
  {
    id: "iet-professional",
    title: "IET Professional Registration",
    provider: "Institution of Engineering and Technology",
    category: "Professional Engineering Bodies",
    level: "Advanced",
    duration: "Ongoing process",
    cost: "£200-400 annually",
    description: "Professional registration with the IET demonstrating competence and commitment to electrical engineering excellence.",
    benefits: [
      "Professional recognition and credibility",
      "Access to exclusive networking events",
      "Continuing Professional Development support",
      "Enhanced career prospects",
      "Professional indemnity insurance discounts",
      "Post-nominal letters (IEng, CEng)"
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
    careerImpact: "Significant enhancement to professional standing and career prospects"
  },
  {
    id: "cibse-membership",
    title: "CIBSE Membership",
    provider: "Chartered Institution of Building Services Engineers",
    category: "Professional Engineering Bodies",
    level: "Advanced",
    duration: "Ongoing process",
    cost: "£180-350 annually",
    description: "Professional membership for building services engineers, including electrical systems designers and engineers.",
    benefits: [
      "Professional recognition in building services",
      "Access to technical guidance and standards",
      "Networking with building services professionals",
      "CPD opportunities and support",
      "Career development resources",
      "Post-nominal letters (MCIBSE, FCIBSE)"
    ],
    requirements: [
      "Building services engineering qualification",
      "Relevant work experience",
      "Commitment to professional development",
      "Application and interview process"
    ],
    nextSteps: [
      "Review CIBSE membership categories",
      "Prepare professional application",
      "Attend assessment interview",
      "Maintain professional standards"
    ],
    popularity: 72,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.cibse.org",
    accreditationBody: "CIBSE",
    renewalPeriod: "Annual",
    careerImpact: "Enhanced credibility in building services engineering"
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
      "Training and certification schemes",
      "Industry advocacy and representation"
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
    id: "select-membership",
    title: "SELECT Membership",
    provider: "SELECT (Scotland's Electrical Trade Association)",
    category: "Trade Associations",
    level: "Intermediate",
    duration: "Ongoing",
    cost: "£250-600 annually",
    description: "Scotland's leading electrical trade association, representing electrical contractors and promoting industry standards.",
    benefits: [
      "Scottish electrical industry representation",
      "Technical support and advice",
      "Business development assistance",
      "Training and development opportunities",
      "Networking events and forums",
      "Industry advocacy in Scotland"
    ],
    requirements: [
      "Scottish electrical contracting business",
      "Appropriate electrical qualifications",
      "Insurance requirements",
      "Commitment to industry standards"
    ],
    nextSteps: [
      "Apply for SELECT membership",
      "Submit business credentials",
      "Complete assessment process",
      "Engage with member services"
    ],
    popularity: 75,
    difficulty: "Intermediate",
    onlineAvailable: true,
    locations: ["Scotland-wide"],
    website: "https://www.select.org.uk",
    accreditationBody: "SELECT",
    renewalPeriod: "Annual",
    careerImpact: "Strong regional recognition and business support in Scotland"
  },
  {
    id: "jib-ecs-membership",
    title: "JIB/ECS Card Scheme",
    provider: "Joint Industry Board for the Electrical Contracting Industry",
    category: "Trade Associations",
    level: "Intermediate",
    duration: "Card validity 3-5 years",
    cost: "£35-50 for card",
    description: "Industry employment and card scheme providing portable skills record and site access for electrical workers.",
    benefits: [
      "Industry-recognised skills card",
      "Site access for major projects",
      "Portable employment record",
      "Training and development pathways",
      "Industry-standard wages and conditions",
      "Career progression framework"
    ],
    requirements: [
      "Appropriate electrical qualifications",
      "Health and safety training",
      "Employment in electrical industry",
      "Meet card scheme criteria"
    ],
    nextSteps: [
      "Apply for appropriate ECS card",
      "Submit qualification evidence",
      "Complete application process",
      "Maintain card validity"
    ],
    popularity: 90,
    difficulty: "Intermediate",
    onlineAvailable: true,
    locations: ["UK-wide"],
    website: "https://www.jib.org.uk",
    accreditationBody: "JIB",
    renewalPeriod: "3-5 years",
    careerImpact: "Essential for employment on major electrical projects"
  },
  {
    id: "iosh-membership",
    title: "IOSH Membership",
    provider: "Institution of Occupational Safety and Health",
    category: "Safety & Health Bodies",
    level: "Advanced",
    duration: "Ongoing",
    cost: "£150-300 annually",
    description: "Professional membership of the world's largest professional health and safety organisation.",
    benefits: [
      "Professional health and safety recognition",
      "Access to technical resources and guidance",
      "Networking with safety professionals",
      "CPD opportunities and support",
      "Career development in safety",
      "Post-nominal letters (MIOSH, FIOSH)"
    ],
    requirements: [
      "Health and safety qualification",
      "Relevant work experience",
      "Commitment to professional development",
      "Application and assessment process"
    ],
    nextSteps: [
      "Review IOSH membership grades",
      "Prepare professional application",
      "Submit experience evidence",
      "Maintain professional standards"
    ],
    popularity: 80,
    difficulty: "Advanced",
    onlineAvailable: true,
    locations: ["UK-wide"],
    website: "https://www.iosh.com",
    accreditationBody: "IOSH",
    renewalPeriod: "Annual",
    careerImpact: "Enhanced credibility in health and safety management"
  },
  {
    id: "nebosh-qualification",
    title: "NEBOSH Qualifications",
    provider: "National Examination Board in Occupational Safety and Health",
    category: "Safety & Health Bodies",
    level: "Advanced",
    duration: "Certificate: 10 days, Diploma: 18 months",
    cost: "£1500-4000 depending on level",
    description: "Internationally recognised health and safety qualifications for safety professionals and managers.",
    benefits: [
      "Internationally recognised qualifications",
      "Enhanced safety career prospects",
      "Higher earning potential in safety roles",
      "Pathway to safety management positions",
      "Professional credibility",
      "Global employment opportunities"
    ],
    requirements: [
      "No formal entry requirements for Certificate",
      "English language proficiency",
      "Commitment to study programme",
      "For Diploma: prior safety experience recommended"
    ],
    nextSteps: [
      "Choose appropriate NEBOSH qualification",
      "Select training provider",
      "Complete study programme",
      "Pass examinations"
    ],
    popularity: 85,
    difficulty: "Advanced",
    onlineAvailable: true,
    locations: ["UK-wide, International"],
    website: "https://www.nebosh.org.uk",
    accreditationBody: "NEBOSH",
    renewalPeriod: "Qualification permanent, CPD recommended",
    careerImpact: "Significant enhancement to health and safety career prospects"
  },
  {
    id: "apm-membership",
    title: "APM Membership",
    provider: "Association for Project Management",
    category: "Project & Construction Management",
    level: "Advanced",
    duration: "Ongoing",
    cost: "£200-400 annually",
    description: "Professional membership of the UK's chartered body for project management professionals.",
    benefits: [
      "Professional project management recognition",
      "Access to project management resources",
      "Networking with PM professionals",
      "Career development opportunities",
      "CPD support and guidance",
      "Post-nominal letters (MAPM, FAPM)"
    ],
    requirements: [
      "Project management experience",
      "Relevant qualifications or experience",
      "Commitment to professional development",
      "Application and assessment"
    ],
    nextSteps: [
      "Review APM membership categories",
      "Prepare professional application",
      "Submit experience portfolio",
      "Engage with APM community"
    ],
    popularity: 70,
    difficulty: "Advanced",
    onlineAvailable: true,
    locations: ["UK-wide"],
    website: "https://www.apm.org.uk",
    accreditationBody: "APM",
    renewalPeriod: "Annual",
    careerImpact: "Enhanced credibility for project management roles in electrical industry"
  },
  {
    id: "ciob-membership",
    title: "CIOB Membership",
    provider: "Chartered Institute of Building",
    category: "Project & Construction Management",
    level: "Advanced",
    duration: "Ongoing",
    cost: "£250-450 annually",
    description: "Professional membership for construction and project management professionals in the built environment.",
    benefits: [
      "Professional construction industry recognition",
      "Access to construction resources and standards",
      "Networking with construction professionals",
      "Career advancement opportunities",
      "Professional development support",
      "Post-nominal letters (MCIOB, FCIOB)"
    ],
    requirements: [
      "Construction industry experience",
      "Relevant qualifications",
      "Professional development commitment",
      "Application and interview process"
    ],
    nextSteps: [
      "Review CIOB membership grades",
      "Prepare professional application",
      "Attend assessment interview",
      "Maintain professional standards"
    ],
    popularity: 68,
    difficulty: "Advanced",
    onlineAvailable: false,
    locations: ["UK-wide"],
    website: "https://www.ciob.org",
    accreditationBody: "CIOB",
    renewalPeriod: "Annual",
    careerImpact: "Enhanced credibility for construction management roles"
  }
];
