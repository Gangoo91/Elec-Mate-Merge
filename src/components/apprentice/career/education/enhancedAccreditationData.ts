
import { Award, GraduationCap, Building, Users, Briefcase, Shield, Star, Trophy } from "lucide-react";

export interface UKAccreditation {
  id: string;
  title: string;
  provider: string;
  level: "Foundation" | "Professional" | "Advanced" | "Specialist";
  category: "Engineering" | "Trade" | "Business" | "Safety" | "Management";
  description: string;
  detailedDescription: string;
  requirements: string[];
  benefits: string[];
  careerImpact: {
    salaryIncrease: string;
    jobOpportunities: string[];
    progression: string;
  };
  costs: {
    applicationFee: string;
    annualFee: string;
    totalCost: string;
    currency: "GBP";
  };
  fundingOptions: string[];
  eligibleFunding: {
    apprenticeshipLevy: boolean;
    governmentSupport: boolean;
    employerSupport: boolean;
    professionalbodyGrants: boolean;
  };
  timeToComplete: string;
  renewalPeriod: string;
  ukRecognition: {
    governmentRecognised: boolean;
    internationalRecognition: boolean;
    industryStandard: boolean;
  };
  applicationProcess: {
    steps: string[];
    documentation: string[];
    timeline: string;
  };
  supportResources: {
    mentorship: boolean;
    studyMaterials: boolean;
    workshops: boolean;
    onlinePortal: boolean;
  };
  successRate: number;
  memberBenefits: string[];
  icon: any;
  websiteLink: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export const ukAccreditations: UKAccreditation[] = [
  {
    id: "iet-membership",
    title: "IET Membership (MIET)",
    provider: "Institution of Engineering and Technology",
    level: "Professional",
    category: "Engineering",
    description: "Professional membership demonstrating engineering competence and commitment to CPD.",
    detailedDescription: "Membership of the IET provides professional recognition, access to technical resources, networking opportunities, and demonstrates your commitment to engineering excellence. MIET status is widely recognised across the UK electrical industry.",
    requirements: [
      "CEng, IEng, or EngTech registration OR",
      "Relevant engineering degree OR",
      "Substantial engineering experience (8+ years)",
      "Commitment to Continuing Professional Development (CPD)",
      "Professional references from existing members"
    ],
    benefits: [
      "Post-nominal letters (MIET)",
      "Professional recognition and credibility",
      "Access to IET technical library and resources",
      "Networking events and conferences",
      "Career development services",
      "Professional indemnity insurance discounts",
      "CPD tracking and support"
    ],
    careerImpact: {
      salaryIncrease: "£3,000-£8,000 annually",
      jobOpportunities: ["Senior Electrical Engineer", "Project Manager", "Design Engineer", "Consultant"],
      progression: "Gateway to Chartered Engineer status and senior technical roles"
    },
    costs: {
      applicationFee: "£25",
      annualFee: "£168",
      totalCost: "£193 first year, £168 annually",
      currency: "GBP"
    },
    fundingOptions: [
      "Employer professional development budget",
      "Apprenticeship Levy funds",
      "IET bursary schemes",
      "Tax relief on professional subscriptions"
    ],
    eligibleFunding: {
      apprenticeshipLevy: true,
      governmentSupport: false,
      employerSupport: true,
      professionalbodyGrants: true
    },
    timeToComplete: "2-6 months application process",
    renewalPeriod: "Annual membership renewal",
    ukRecognition: {
      governmentRecognised: true,
      internationalRecognition: true,
      industryStandard: true
    },
    applicationProcess: {
      steps: [
        "Complete online application form",
        "Submit academic and professional qualifications",
        "Provide professional references (2 required)",
        "Pay application fee",
        "Await assessment and approval"
      ],
      documentation: [
        "Degree certificates or equivalent qualifications",
        "Professional experience record",
        "CPD evidence",
        "Professional references"
      ],
      timeline: "2-3 months from submission to approval"
    },
    supportResources: {
      mentorship: true,
      studyMaterials: true,
      workshops: true,
      onlinePortal: true
    },
    successRate: 92,
    memberBenefits: [
      "IET magazine subscription",
      "Online engineering resources",
      "Professional development courses",
      "Local network events",
      "Career guidance services"
    ],
    icon: Award,
    websiteLink: "https://www.theiet.org/membership/",
    contactInfo: {
      phone: "01438 313311",
      email: "membership@theiet.org",
      address: "Michael Faraday House, Six Hills Way, Stevenage SG1 2AY"
    }
  },
  {
    id: "chartered-engineer",
    title: "Chartered Engineer (CEng)",
    provider: "Engineering Council UK",
    level: "Advanced",
    category: "Engineering",
    description: "The highest level of engineering qualification in the UK, demonstrating engineering leadership.",
    detailedDescription: "CEng is the gold standard for engineering professionals in the UK. It demonstrates your ability to develop appropriate solutions to engineering problems using new or existing technologies, with commercial awareness and environmental impact consideration.",
    requirements: [
      "Accredited MEng degree OR BEng + MSc OR equivalent",
      "Minimum 4 years post-graduation experience",
      "Evidence of engineering competence and responsibility",
      "Professional development record",
      "Professional review interview"
    ],
    benefits: [
      "Internationally recognised qualification",
      "Post-nominal letters (CEng)",
      "Enhanced career prospects",
      "Higher earning potential",
      "Professional credibility and status",
      "Access to senior engineering roles",
      "International mobility"
    ],
    careerImpact: {
      salaryIncrease: "£8,000-£15,000 annually",
      jobOpportunities: ["Chief Engineer", "Engineering Director", "Technical Consultant", "R&D Manager"],
      progression: "Gateway to C-suite engineering positions and international opportunities"
    },
    costs: {
      applicationFee: "£300",
      annualFee: "£220 (through professional institution)",
      totalCost: "£520 first year, £220 annually",
      currency: "GBP"
    },
    fundingOptions: [
      "Employer sponsorship (common for senior roles)",
      "Apprenticeship Levy",
      "Professional development loans",
      "Institution bursary schemes"
    ],
    eligibleFunding: {
      apprenticeshipLevy: true,
      governmentSupport: false,
      employerSupport: true,
      professionalbodyGrants: true
    },
    timeToComplete: "6-12 months preparation and assessment",
    renewalPeriod: "Annual through professional institution",
    ukRecognition: {
      governmentRecognised: true,
      internationalRecognition: true,
      industryStandard: true
    },
    applicationProcess: {
      steps: [
        "Self-assessment against UK-SPEC competences",
        "Prepare application with evidence portfolio",
        "Submit application through professional institution",
        "Professional review interview",
        "Final assessment and approval"
      ],
      documentation: [
        "Academic transcripts and certificates",
        "Detailed experience record",
        "CPD evidence portfolio",
        "Professional references",
        "Technical reports or project examples"
      ],
      timeline: "6-9 months from application to approval"
    },
    supportResources: {
      mentorship: true,
      studyMaterials: true,
      workshops: true,
      onlinePortal: true
    },
    successRate: 78,
    memberBenefits: [
      "CEng directory listing",
      "Professional recognition events",
      "Technical conference discounts",
      "Mentoring opportunities",
      "International networking"
    ],
    icon: Trophy,
    websiteLink: "https://www.engc.org.uk/ceng",
    contactInfo: {
      phone: "020 3206 0500",
      email: "info@engc.org.uk",
      address: "Engineering Council, Arden House, 1102 Warwick Road, Acocks Green, Birmingham B27 6BH"
    }
  },
  {
    id: "eca-membership",
    title: "ECA Membership",
    provider: "Electrical Contractors' Association",
    level: "Professional",
    category: "Trade",
    description: "Essential membership for electrical contractors, providing business credibility and support.",
    detailedDescription: "ECA membership is the mark of quality for electrical contractors in the UK. It provides business credibility, technical support, and access to industry schemes that can significantly boost your contracting business.",
    requirements: [
      "Established electrical contracting business",
      "Relevant electrical qualifications (Level 3 minimum)",
      "Public liability insurance (£2M minimum)",
      "Employers' liability insurance",
      "Professional indemnity insurance",
      "Health & safety policy and procedures"
    ],
    benefits: [
      "Business credibility and trust mark",
      "Technical helpline support",
      "Legal and commercial advice",
      "Access to ECA insurance schemes",
      "Client referral service",
      "Industry representation",
      "Training and CPD opportunities"
    ],
    careerImpact: {
      salaryIncrease: "15-25% increase in contract rates",
      jobOpportunities: ["Commercial Contracts", "Industrial Projects", "Public Sector Work", "Insurance Work"],
      progression: "Access to higher-value contracts and business growth opportunities"
    },
    costs: {
      applicationFee: "£200",
      annualFee: "£600-£2,000 (based on turnover)",
      totalCost: "£800-£2,200 first year",
      currency: "GBP"
    },
    fundingOptions: [
      "Business expense (tax deductible)",
      "Professional development funds",
      "Small business grants",
      "Payment plans available"
    ],
    eligibleFunding: {
      apprenticeshipLevy: false,
      governmentSupport: false,
      employerSupport: false,
      professionalbodyGrants: false
    },
    timeToComplete: "4-8 weeks assessment process",
    renewalPeriod: "Annual membership renewal",
    ukRecognition: {
      governmentRecognised: true,
      internationalRecognition: false,
      industryStandard: true
    },
    applicationProcess: {
      steps: [
        "Complete business assessment application",
        "Submit required documentation",
        "Site inspection (if required)",
        "Insurance verification",
        "Final approval and membership activation"
      ],
      documentation: [
        "Business registration documents",
        "Electrical qualifications",
        "Insurance certificates",
        "Health & safety documentation",
        "Bank references"
      ],
      timeline: "4-6 weeks from application to approval"
    },
    supportResources: {
      mentorship: true,
      studyMaterials: true,
      workshops: true,
      onlinePortal: true
    },
    successRate: 85,
    memberBenefits: [
      "ECA member logo usage rights",
      "Technical publications",
      "Business development seminars",
      "Insurance scheme access",
      "Parliamentary representation"
    ],
    icon: Building,
    websiteLink: "https://www.eca.co.uk/membership",
    contactInfo: {
      phone: "020 7313 4800",
      email: "info@eca.co.uk",
      address: "ESCA House, 34 Palace Court, London W2 4HY"
    }
  },
  {
    id: "incorporated-engineer",
    title: "Incorporated Engineer (IEng)",
    provider: "Engineering Council UK",
    level: "Professional",
    category: "Engineering",
    description: "Professional registration for engineers implementing existing and emerging technologies.",
    detailedDescription: "IEng registration demonstrates your ability to maintain and manage applications of current and developing technology, and may involve responsibility for complex technical or other work.",
    requirements: [
      "Accredited BEng degree OR HND/HNC + further learning",
      "Minimum 4 years relevant experience",
      "Evidence of engineering competence",
      "Professional development record",
      "Professional review"
    ],
    benefits: [
      "Internationally recognised qualification",
      "Post-nominal letters (IEng)",
      "Professional credibility",
      "Career advancement opportunities",
      "Higher earning potential",
      "Pathway to CEng registration"
    ],
    careerImpact: {
      salaryIncrease: "£4,000-£10,000 annually",
      jobOpportunities: ["Senior Technician", "Project Engineer", "Design Engineer", "Site Manager"],
      progression: "Stepping stone to Chartered Engineer status and management roles"
    },
    costs: {
      applicationFee: "£200",
      annualFee: "£180 (through professional institution)",
      totalCost: "£380 first year, £180 annually",
      currency: "GBP"
    },
    fundingOptions: [
      "Employer professional development budget",
      "Apprenticeship Levy",
      "Professional development loans",
      "Institution support schemes"
    ],
    eligibleFunding: {
      apprenticeshipLevy: true,
      governmentSupport: false,
      employerSupport: true,
      professionalbodyGrants: true
    },
    timeToComplete: "4-8 months preparation and assessment",
    renewalPeriod: "Annual through professional institution",
    ukRecognition: {
      governmentRecognised: true,
      internationalRecognition: true,
      industryStandard: true
    },
    applicationProcess: {
      steps: [
        "Self-assessment against competence standards",
        "Prepare application portfolio",
        "Submit through professional institution",
        "Professional review interview",
        "Assessment and approval"
      ],
      documentation: [
        "Academic qualifications",
        "Professional experience evidence",
        "CPD records",
        "Professional references",
        "Project portfolios"
      ],
      timeline: "4-6 months from application to approval"
    },
    supportResources: {
      mentorship: true,
      studyMaterials: true,
      workshops: true,
      onlinePortal: true
    },
    successRate: 82,
    memberBenefits: [
      "Professional directory listing",
      "Networking opportunities",
      "Technical resources access",
      "Career development support",
      "Professional recognition"
    ],
    icon: GraduationCap,
    websiteLink: "https://www.engc.org.uk/ieng",
    contactInfo: {
      phone: "020 3206 0500",
      email: "info@engc.org.uk",
      address: "Engineering Council, Arden House, 1102 Warwick Road, Acocks Green, Birmingham B27 6BH"
    }
  },
  {
    id: "engineering-technician",
    title: "Engineering Technician (EngTech)",
    provider: "Engineering Council UK",
    level: "Foundation",
    category: "Engineering",
    description: "Foundation level professional registration for engineering technicians.",
    detailedDescription: "EngTech registration recognises your ability to apply proven techniques and procedures to solve practical engineering problems. It's the first step on the professional registration ladder.",
    requirements: [
      "Level 3 engineering qualification OR substantial experience",
      "Minimum 3 years relevant experience",
      "Evidence of technical competence",
      "Continuing professional development",
      "Professional references"
    ],
    benefits: [
      "Professional recognition",
      "Post-nominal letters (EngTech)",
      "Career development pathway",
      "Enhanced employability",
      "Access to professional networks",
      "Foundation for further registration"
    ],
    careerImpact: {
      salaryIncrease: "£2,000-£5,000 annually",
      jobOpportunities: ["Senior Technician", "Technical Specialist", "Quality Inspector", "Maintenance Engineer"],
      progression: "Pathway to IEng and CEng registration"
    },
    costs: {
      applicationFee: "£120",
      annualFee: "£140 (through professional institution)",
      totalCost: "£260 first year, £140 annually",
      currency: "GBP"
    },
    fundingOptions: [
      "Apprenticeship Levy",
      "Employer training budget",
      "Professional development support",
      "Institution bursary schemes"
    ],
    eligibleFunding: {
      apprenticeshipLevy: true,
      governmentSupport: false,
      employerSupport: true,
      professionalbodyGrants: true
    },
    timeToComplete: "3-6 months preparation and assessment",
    renewalPeriod: "Annual through professional institution",
    ukRecognition: {
      governmentRecognised: true,
      internationalRecognition: true,
      industryStandard: true
    },
    applicationProcess: {
      steps: [
        "Complete self-assessment",
        "Gather evidence portfolio",
        "Submit application",
        "Professional interview",
        "Assessment and approval"
      ],
      documentation: [
        "Qualification certificates",
        "Work experience records",
        "CPD evidence",
        "Professional references",
        "Technical competence examples"
      ],
      timeline: "3-4 months from application to approval"
    },
    supportResources: {
      mentorship: true,
      studyMaterials: true,
      workshops: true,
      onlinePortal: true
    },
    successRate: 88,
    memberBenefits: [
      "Professional recognition",
      "Technical resources",
      "Career guidance",
      "Networking events",
      "Development opportunities"
    ],
    icon: Shield,
    websiteLink: "https://www.engc.org.uk/engtech",
    contactInfo: {
      phone: "020 3206 0500",
      email: "info@engc.org.uk",
      address: "Engineering Council, Arden House, 1102 Warwick Road, Acocks Green, Birmingham B27 6BH"
    }
  }
];

export const accreditationCategories = [
  "All Categories",
  "Engineering",
  "Trade",
  "Business",
  "Safety",
  "Management"
];

export const accreditationLevels = [
  "All Levels",
  "Foundation",
  "Professional", 
  "Advanced",
  "Specialist"
];

export const fundingTypes = [
  "All Funding Types",
  "Apprenticeship Levy",
  "Government Support",
  "Employer Support",
  "Professional Body Grants"
];
