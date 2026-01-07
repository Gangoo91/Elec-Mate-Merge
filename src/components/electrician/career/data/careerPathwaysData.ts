import { LucideIcon, Compass, Brain, Target, BarChart3, Clock, Award, MapPin, Briefcase, GraduationCap, TrendingUp, Users, Zap, Shield, Settings, Lightbulb, BookOpen, Building, Globe, Heart, Rocket, Laptop, Leaf, Star, DollarSign, CheckCircle } from "lucide-react";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface ContentSection {
  title: string;
  content: string | string[];
  icon?: LucideIcon;
}

export interface Resource {
  title: string;
  url?: string;
  description?: string;
}

export interface ModalContent {
  overview: string;
  sections: ContentSection[];
  resources?: Resource[];
  tips?: string[];
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  stats?: { label: string; value: string }[];
  icon?: LucideIcon;
  color?: "yellow" | "blue" | "green" | "purple" | "orange" | "amber" | "red";
  content: ModalContent;
}

export interface CareerSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "yellow" | "blue" | "green" | "purple" | "orange" | "amber" | "red";
  previewStat: string;
  statLabel: string;
  items: ContentItem[];
}

// ==========================================
// CAREER OVERVIEW ITEMS
// ==========================================

const careerOverviewItems: ContentItem[] = [
  {
    id: "progression-stages",
    title: "Career Progression Stages",
    description: "From apprentice to industry leader - understand your journey",
    badge: "Foundation",
    icon: TrendingUp,
    color: "yellow",
    stats: [
      { label: "Stages", value: "4" },
      { label: "Timeline", value: "5-15yrs" },
    ],
    content: {
      overview: "The electrical industry offers a clear, structured career path with defined stages. Each stage builds on the previous, with increasing responsibility, skills, and earning potential.",
      sections: [
        {
          title: "Stage 1: Foundation (Years 1-4)",
          icon: BookOpen,
          content: [
            "Electrical Apprenticeship (Level 3)",
            "Learn core installation techniques",
            "Gain practical experience under supervision",
            "Complete NVQ and AM2 assessment",
          ],
        },
        {
          title: "Stage 2: Qualified (Years 4-8)",
          icon: CheckCircle,
          content: [
            "JIB Gold Card holder",
            "Independent working capability",
            "Testing and certification competence",
            "Begin specialist training",
          ],
        },
        {
          title: "Stage 3: Specialist (Years 8-15)",
          icon: Star,
          content: [
            "Advanced qualifications (2391, 2399, 2919)",
            "Sector specialization",
            "Team leadership experience",
            "Project management skills",
          ],
        },
        {
          title: "Stage 4: Leadership (15+ Years)",
          icon: Users,
          content: [
            "Contracts Manager / Technical Director",
            "Business ownership opportunities",
            "Industry body involvement",
            "Mentoring next generation",
          ],
        },
      ],
      tips: [
        "Don't rush progression - build solid foundations at each stage",
        "Seek diverse project experience in the early years",
        "Develop soft skills alongside technical competence",
      ],
    },
  },
  {
    id: "career-pathways",
    title: "Popular Career Pathways",
    description: "Explore the most in-demand specializations",
    badge: "Hot",
    icon: Rocket,
    color: "yellow",
    stats: [
      { label: "Pathways", value: "8+" },
      { label: "Demand", value: "High" },
    ],
    content: {
      overview: "The electrical industry offers diverse career pathways. Choose based on your interests, aptitudes, and market demand.",
      sections: [
        {
          title: "High-Demand Pathways",
          icon: TrendingUp,
          content: [
            "EV Charging Installation (2919) - 40% growth projected",
            "Solar PV & Battery Storage (2399) - Net Zero driving demand",
            "Data Centre Specialist - Tech sector expansion",
            "Smart Building Systems - IoT integration",
          ],
        },
        {
          title: "Traditional Sectors",
          icon: Building,
          content: [
            "Domestic Installer - Steady demand, Part P registration",
            "Commercial & Industrial - Higher rates, complex systems",
            "Maintenance & Testing - Regular work, inspection skills",
            "Fire & Security - Specialist certifications required",
          ],
        },
      ],
      tips: [
        "Combine traditional skills with emerging technologies",
        "Consider geographic demand when choosing specialization",
        "Build a portfolio demonstrating specialist competence",
      ],
    },
  },
  {
    id: "qualification-routes",
    title: "Qualification Pathways",
    description: "Three routes into the electrical industry",
    badge: "Entry Points",
    icon: GraduationCap,
    color: "yellow",
    stats: [
      { label: "Routes", value: "3" },
      { label: "Duration", value: "2-4yrs" },
    ],
    content: {
      overview: "There are multiple pathways into the electrical industry, each suited to different circumstances and career goals.",
      sections: [
        {
          title: "Route 1: Apprenticeship (Recommended)",
          icon: BookOpen,
          content: [
            "4-year structured programme",
            "Earn while you learn (£8-£20k/year)",
            "Government funding available",
            "Direct pathway to Gold Card",
            "Best option for school leavers",
          ],
        },
        {
          title: "Route 2: College Full-Time",
          icon: GraduationCap,
          content: [
            "2-3 year diploma course",
            "Intensive learning environment",
            "Requires work placement",
            "Good for career changers",
            "May need additional practical experience",
          ],
        },
        {
          title: "Route 3: Fast-Track (Experienced)",
          icon: Zap,
          content: [
            "For those with related experience",
            "APL (Accredited Prior Learning)",
            "Intensive assessment-based route",
            "6-18 months typical duration",
            "Higher upfront costs",
          ],
        },
      ],
      resources: [
        { title: "JTL Apprenticeships", url: "https://www.jtltraining.com", description: "Major electrical apprenticeship provider" },
        { title: "ECA Training", url: "https://www.eca.co.uk/training", description: "Industry body training programmes" },
      ],
    },
  },
  {
    id: "industry-sectors",
    title: "Industry Sectors",
    description: "Where electricians work across the UK economy",
    badge: "Sectors",
    icon: Building,
    color: "yellow",
    stats: [
      { label: "Sectors", value: "6" },
      { label: "Jobs", value: "250k+" },
    ],
    content: {
      overview: "Electricians work across virtually every sector of the economy. Each sector offers different challenges, pay scales, and career opportunities.",
      sections: [
        {
          title: "Construction & Infrastructure",
          icon: Building,
          content: [
            "New build residential and commercial",
            "Major infrastructure projects (HS2, power stations)",
            "Higher day rates, project-based work",
            "CSCS card requirements",
          ],
        },
        {
          title: "Maintenance & Facilities",
          icon: Settings,
          content: [
            "Building maintenance contracts",
            "FM company employment",
            "Regular hours, stable income",
            "Multi-skilled opportunities",
          ],
        },
        {
          title: "Industrial & Manufacturing",
          icon: Zap,
          content: [
            "Factory installation and maintenance",
            "PLC and automation systems",
            "Higher technical requirements",
            "Premium rates for specialists",
          ],
        },
        {
          title: "Renewables & Green Energy",
          icon: Leaf,
          content: [
            "Solar PV installation",
            "Wind farm maintenance",
            "Battery storage systems",
            "Heat pump electrical work",
            "Fastest growing sector",
          ],
        },
      ],
    },
  },
  {
    id: "entrepreneurship",
    title: "Entrepreneurship Guide",
    description: "Start and grow your own electrical business",
    badge: "Business",
    icon: Briefcase,
    color: "yellow",
    stats: [
      { label: "Profit", value: "£50-150k" },
      { label: "Growth", value: "3-5yrs" },
    ],
    content: {
      overview: "Many electricians progress to running their own business. With proper planning, you can build a profitable enterprise while maintaining work-life balance.",
      sections: [
        {
          title: "Essential Requirements",
          icon: CheckCircle,
          content: [
            "Part P Competent Person Scheme registration",
            "NICEIC/NAPIT/ELECSA membership",
            "Public liability insurance (£2-5m minimum)",
            "Professional indemnity insurance",
            "Employers liability (if hiring staff)",
            "Business bank account and accounting software",
          ],
        },
        {
          title: "Business Models",
          icon: Building,
          content: [
            "Sole Trader - Simple, flexible, personal liability",
            "Limited Company - Tax efficient, professional image",
            "Partnership - Shared responsibility, skills combination",
            "Franchise - Established brand, support network",
          ],
        },
        {
          title: "Growth Strategy",
          icon: TrendingUp,
          content: [
            "Year 1: Establish reputation, build customer base",
            "Year 2-3: Hire first employee, increase capacity",
            "Year 3-5: Expand services, consider specialization",
            "Year 5+: Multiple teams, management focus",
          ],
        },
      ],
      tips: [
        "Start part-time while employed to build customer base",
        "Focus on a niche to differentiate from competition",
        "Invest in online presence and reviews",
        "Build relationships with suppliers for better rates",
      ],
    },
  },
  {
    id: "career-advancement",
    title: "Career Advancement Tips",
    description: "Accelerate your progression and maximize earnings",
    badge: "Pro Tips",
    icon: Star,
    color: "yellow",
    stats: [
      { label: "Tips", value: "12+" },
      { label: "Impact", value: "High" },
    ],
    content: {
      overview: "Success in the electrical industry requires more than technical skills. These proven strategies will help you advance faster and earn more.",
      sections: [
        {
          title: "Technical Excellence",
          icon: Zap,
          content: [
            "Stay current with BS 7671 amendments",
            "Gain testing and inspection qualification early",
            "Build expertise in high-demand technologies",
            "Maintain manufacturer certifications",
          ],
        },
        {
          title: "Professional Development",
          icon: BookOpen,
          content: [
            "Join professional bodies (IET, ECA)",
            "Attend industry events and conferences",
            "Contribute to technical forums",
            "Consider STEM Ambassador role",
          ],
        },
        {
          title: "Business Skills",
          icon: Briefcase,
          content: [
            "Learn to quote accurately and profitably",
            "Develop customer communication skills",
            "Understand contracts and compliance",
            "Build project management competence",
          ],
        },
      ],
      tips: [
        "Document all your work for portfolio evidence",
        "Network actively - most opportunities come through contacts",
        "Invest in quality tools and keep them maintained",
        "Never stop learning - industry changes constantly",
      ],
    },
  },
  {
    id: "industry-context",
    title: "Industry Context & Trends",
    description: "Understanding the UK electrical industry landscape",
    badge: "2024-2025",
    icon: Globe,
    color: "yellow",
    stats: [
      { label: "Value", value: "£5.8bn" },
      { label: "Jobs", value: "250k+" },
    ],
    content: {
      overview: "The UK electrical industry is undergoing significant transformation driven by decarbonization, digitalization, and skills shortages.",
      sections: [
        {
          title: "Market Overview",
          icon: BarChart3,
          content: [
            "UK electrical contracting market: £5.8bn+ annually",
            "250,000+ qualified electricians in the UK",
            "15,000+ new electricians needed annually",
            "Skills shortage driving wage increases",
          ],
        },
        {
          title: "Key Drivers",
          icon: TrendingUp,
          content: [
            "Net Zero 2050 commitment",
            "Electric vehicle infrastructure rollout",
            "Housing targets and retrofit programmes",
            "Smart building and IoT integration",
            "Aging workforce creating opportunities",
          ],
        },
        {
          title: "Challenges",
          icon: Shield,
          content: [
            "Material cost inflation",
            "Regulatory complexity increasing",
            "Competition from multi-skilled trades",
            "Insurance and compliance costs rising",
          ],
        },
      ],
    },
  },
  {
    id: "professional-journey",
    title: "Professional Development Journey",
    description: "From qualified to chartered - the professional pathway",
    badge: "Professional",
    icon: Target,
    color: "yellow",
    stats: [
      { label: "Levels", value: "4" },
      { label: "Peak", value: "CEng" },
    ],
    content: {
      overview: "Beyond trade qualifications, there's a professional pathway leading to Chartered Engineer status and industry leadership roles.",
      sections: [
        {
          title: "Professional Registration",
          icon: CheckCircle,
          content: [
            "EngTech (Engineering Technician) - Entry level",
            "IEng (Incorporated Engineer) - Degree level",
            "CEng (Chartered Engineer) - Masters level",
            "IET membership at appropriate grade",
          ],
        },
        {
          title: "Benefits of Registration",
          icon: Star,
          content: [
            "Industry-wide recognition",
            "Higher earning potential",
            "International credential recognition",
            "Access to professional networks",
            "Career protection and support",
          ],
        },
        {
          title: "Pathway Steps",
          icon: TrendingUp,
          content: [
            "Gain relevant qualifications (HNC/HND/Degree)",
            "Build competence evidence portfolio",
            "Demonstrate commitment to CPD",
            "Apply through professional body",
            "Maintain registration through ongoing development",
          ],
        },
      ],
      resources: [
        { title: "IET", url: "https://www.theiet.org", description: "Institution of Engineering and Technology" },
        { title: "Engineering Council", url: "https://www.engc.org.uk", description: "UK regulatory body for engineering" },
      ],
    },
  },
];

// ==========================================
// SKILLS DEVELOPMENT ITEMS
// ==========================================

const skillsDevelopmentItems: ContentItem[] = [
  {
    id: "foundation-skills",
    title: "Foundation Skills",
    description: "Core competencies for years 1-2 of your career",
    badge: "Essential",
    icon: BookOpen,
    color: "blue",
    stats: [
      { label: "Skills", value: "12" },
      { label: "Level", value: "Basic" },
    ],
    content: {
      overview: "Foundation skills form the bedrock of your electrical career. Master these before progressing to more complex work.",
      sections: [
        {
          title: "Installation Fundamentals",
          icon: Zap,
          content: [
            "Cable selection and installation techniques",
            "Containment systems (trunking, conduit, tray)",
            "Wiring accessories and connection methods",
            "Consumer unit installation basics",
            "Socket and lighting circuit installation",
          ],
        },
        {
          title: "Safety & Compliance",
          icon: Shield,
          content: [
            "Safe isolation procedures",
            "Risk assessment participation",
            "PPE selection and use",
            "Working at height basics",
            "Asbestos awareness",
          ],
        },
        {
          title: "Tools & Equipment",
          icon: Settings,
          content: [
            "Hand tool proficiency",
            "Power tool safe operation",
            "Test equipment basics (multimeter, socket tester)",
            "Crimping and termination tools",
            "Tool maintenance and inspection",
          ],
        },
      ],
      tips: [
        "Practice cable stripping until it becomes second nature",
        "Learn to read installation instructions thoroughly",
        "Ask questions - experienced electricians expect it",
      ],
    },
  },
  {
    id: "intermediate-skills",
    title: "Intermediate Skills",
    description: "Building expertise in years 2-4",
    badge: "Developing",
    icon: TrendingUp,
    color: "blue",
    stats: [
      { label: "Skills", value: "15" },
      { label: "Level", value: "Mid" },
    ],
    content: {
      overview: "Intermediate skills enable you to work more independently and take on complex installation work.",
      sections: [
        {
          title: "Advanced Installation",
          icon: Zap,
          content: [
            "Three-phase systems understanding",
            "Industrial socket and plug systems",
            "Fire alarm and emergency lighting basics",
            "Data and communications cabling",
            "Outdoor and IP rated installations",
          ],
        },
        {
          title: "Testing Competence",
          icon: CheckCircle,
          content: [
            "Dead testing procedures",
            "Insulation resistance testing",
            "Continuity testing (R1+R2, ring)",
            "Understanding test results",
            "Basic fault finding methodology",
          ],
        },
        {
          title: "Documentation",
          icon: BookOpen,
          content: [
            "Minor Works Certificate completion",
            "Electrical Installation Certificate awareness",
            "Test schedule recording",
            "As-built drawing interpretation",
            "Method statement understanding",
          ],
        },
      ],
    },
  },
  {
    id: "specialist-skills",
    title: "Specialist Skills",
    description: "Advanced competencies for years 3-5+",
    badge: "Advanced",
    icon: Star,
    color: "blue",
    stats: [
      { label: "Skills", value: "20+" },
      { label: "Level", value: "High" },
    ],
    content: {
      overview: "Specialist skills differentiate you in the market and enable premium earnings.",
      sections: [
        {
          title: "Testing & Inspection",
          icon: CheckCircle,
          content: [
            "Live testing (loop impedance, PFC, RCD)",
            "Periodic inspection techniques",
            "EICR report writing",
            "Complex fault finding",
            "Harmonic analysis basics",
          ],
        },
        {
          title: "Specialist Installations",
          icon: Zap,
          content: [
            "EV charging systems",
            "Solar PV and battery storage",
            "Heat pump electrical requirements",
            "Fire detection and alarm systems",
            "Access control and CCTV power",
          ],
        },
        {
          title: "Design & Calculations",
          icon: Target,
          content: [
            "Cable sizing calculations (BS 7671)",
            "Voltage drop assessment",
            "Protective device coordination",
            "Discrimination studies",
            "Basic load scheduling",
          ],
        },
      ],
    },
  },
  {
    id: "digital-skills",
    title: "Digital & Technology Skills",
    description: "Essential tech skills for modern electricians",
    badge: "Modern",
    icon: Laptop,
    color: "blue",
    stats: [
      { label: "Skills", value: "10" },
      { label: "Trend", value: "Growing" },
    ],
    content: {
      overview: "Digital skills are increasingly essential as buildings become smarter and work processes digitize.",
      sections: [
        {
          title: "Digital Tools",
          icon: Laptop,
          content: [
            "Certification software (iCertifi, Certsure)",
            "Design tools (AutoCAD basics, Amtech)",
            "Project management apps",
            "Cloud storage and collaboration",
            "Mobile device proficiency",
          ],
        },
        {
          title: "Smart Systems",
          icon: Settings,
          content: [
            "Smart home platforms (KNX, C-Bus basics)",
            "Building Management Systems awareness",
            "IoT device integration",
            "Network basics for smart buildings",
            "Voice control and automation",
          ],
        },
        {
          title: "Emerging Tech",
          icon: Lightbulb,
          content: [
            "Battery storage systems",
            "V2G (Vehicle to Grid) concepts",
            "Smart grid and demand response",
            "Energy monitoring and analytics",
            "AI-assisted diagnostics",
          ],
        },
      ],
    },
  },
  {
    id: "business-skills",
    title: "Business & Soft Skills",
    description: "Non-technical skills that drive career success",
    badge: "Essential",
    icon: Briefcase,
    color: "blue",
    stats: [
      { label: "Skills", value: "8" },
      { label: "Impact", value: "High" },
    ],
    content: {
      overview: "Technical skills get you the job, but soft skills drive career progression and business success.",
      sections: [
        {
          title: "Communication",
          icon: Users,
          content: [
            "Customer explanation skills",
            "Technical writing clarity",
            "Active listening",
            "Conflict resolution",
            "Presentation basics",
          ],
        },
        {
          title: "Commercial Awareness",
          icon: DollarSign,
          content: [
            "Accurate estimating and quoting",
            "Profit margin understanding",
            "Contract basics",
            "Negotiation skills",
            "Time management",
          ],
        },
        {
          title: "Leadership",
          icon: Star,
          content: [
            "Apprentice mentoring",
            "Team coordination",
            "Delegation skills",
            "Decision making",
            "Problem solving methodology",
          ],
        },
      ],
    },
  },
  {
    id: "emerging-tech",
    title: "Emerging Technologies",
    description: "Future-proof skills for 2025 and beyond",
    badge: "Future",
    icon: Rocket,
    color: "blue",
    stats: [
      { label: "Technologies", value: "6" },
      { label: "Growth", value: "40%+" },
    ],
    content: {
      overview: "Stay ahead of the curve by developing competence in technologies that will define the next decade.",
      sections: [
        {
          title: "Electrification",
          icon: Zap,
          content: [
            "Heat pump electrical systems",
            "Induction cooking requirements",
            "Electric vehicle infrastructure",
            "Grid edge technologies",
            "Demand side response systems",
          ],
        },
        {
          title: "Energy Storage",
          icon: Shield,
          content: [
            "Lithium battery systems",
            "Hybrid inverter installation",
            "Grid-tied vs off-grid design",
            "Safety and BMS understanding",
            "System commissioning",
          ],
        },
        {
          title: "Smart Infrastructure",
          icon: Building,
          content: [
            "5G small cell power",
            "Edge computing facilities",
            "Smart street lighting",
            "EV charging networks",
            "Microgrids and local energy",
          ],
        },
      ],
    },
  },
  {
    id: "professional-framework",
    title: "Professional Development Framework",
    description: "Structured approach to skill progression",
    badge: "Framework",
    icon: Target,
    color: "blue",
    stats: [
      { label: "Stages", value: "5" },
      { label: "Years", value: "10+" },
    ],
    content: {
      overview: "A structured framework helps you plan development activities and track progress toward career goals.",
      sections: [
        {
          title: "Assessment",
          icon: CheckCircle,
          content: [
            "Current competency audit",
            "Gap analysis vs target role",
            "Strengths identification",
            "Development priority setting",
            "Mentor/assessor feedback",
          ],
        },
        {
          title: "Planning",
          icon: Target,
          content: [
            "Short-term goals (6-12 months)",
            "Medium-term goals (1-3 years)",
            "Long-term vision (5+ years)",
            "Training schedule creation",
            "Budget allocation",
          ],
        },
        {
          title: "Execution",
          icon: TrendingUp,
          content: [
            "Formal training courses",
            "On-the-job learning",
            "Self-study programmes",
            "Mentorship relationships",
            "Industry events attendance",
          ],
        },
      ],
    },
  },
  {
    id: "regional-skills",
    title: "Regional Skills Intelligence",
    description: "Skills demand varies by UK region",
    badge: "Regional",
    icon: MapPin,
    color: "blue",
    stats: [
      { label: "Regions", value: "10" },
      { label: "Data", value: "Live" },
    ],
    content: {
      overview: "Skills demand varies significantly across UK regions. Understanding local needs helps target your development.",
      sections: [
        {
          title: "London & South East",
          icon: Building,
          content: [
            "High demand: Data centres, commercial fit-out",
            "Premium skills: BMS, smart buildings",
            "Growing: EV infrastructure, residential retrofit",
          ],
        },
        {
          title: "North & Midlands",
          icon: Building,
          content: [
            "High demand: Industrial, manufacturing",
            "Premium skills: PLC/automation, maintenance",
            "Growing: EV, warehouse and logistics",
          ],
        },
        {
          title: "Scotland & Wales",
          icon: Building,
          content: [
            "High demand: Renewables, grid infrastructure",
            "Premium skills: Wind farm, hydro",
            "Growing: Heat pumps, rural electrification",
          ],
        },
      ],
    },
  },
  {
    id: "skills-marketplace",
    title: "Skills Marketplace Analysis",
    description: "What employers are paying for specific skills",
    badge: "Market Data",
    icon: DollarSign,
    color: "blue",
    stats: [
      { label: "Premium", value: "15-30%" },
      { label: "Skills", value: "12+" },
    ],
    content: {
      overview: "Certain skills command premium rates in the current market. Focus development on high-value competencies.",
      sections: [
        {
          title: "Premium Skills (15-30% uplift)",
          icon: Star,
          content: [
            "EV Charging Certified (2919): +£3-5/hr",
            "Solar PV Competent (2399): +£2-4/hr",
            "Data Centre Experience: +£3-6/hr",
            "Testing & Inspection (2391): +£2-4/hr",
          ],
        },
        {
          title: "High Demand Skills",
          icon: TrendingUp,
          content: [
            "Fire alarm competence (BS 5839)",
            "Emergency lighting (BS 5266)",
            "Industrial automation basics",
            "Smart home installation",
          ],
        },
        {
          title: "Emerging Premium",
          icon: Rocket,
          content: [
            "Battery storage installation",
            "Heat pump electrical",
            "V2G systems",
            "Microgrid design",
          ],
        },
      ],
    },
  },
];

// ==========================================
// PROFESSIONAL DEVELOPMENT ITEMS
// ==========================================

const professionalDevelopmentItems: ContentItem[] = [
  {
    id: "continuing-education",
    title: "Continuing Education",
    description: "Formal qualifications and certifications",
    badge: "CPD",
    icon: GraduationCap,
    color: "green",
    stats: [
      { label: "Hours/Year", value: "30+" },
      { label: "Courses", value: "50+" },
    ],
    content: {
      overview: "Continuing Professional Development (CPD) is essential for maintaining competence and progressing your career.",
      sections: [
        {
          title: "Essential Qualifications",
          icon: CheckCircle,
          content: [
            "18th Edition Amendment updates (A3:2024)",
            "Inspection & Testing (2391-52)",
            "EV Charging (2919) certification",
            "Solar PV (2399) installation",
            "PAT Testing certification",
          ],
        },
        {
          title: "CPD Activities",
          icon: BookOpen,
          content: [
            "Formal training courses",
            "Manufacturer product training",
            "Online learning modules",
            "Industry conference attendance",
            "Technical article reading and webinars",
          ],
        },
        {
          title: "Recording CPD",
          icon: Target,
          content: [
            "Maintain a CPD log/portfolio",
            "Record learning outcomes",
            "Evidence of practical application",
            "Annual review and planning",
            "Scheme compliance requirements",
          ],
        },
      ],
    },
  },
  {
    id: "professional-networking",
    title: "Professional Networking",
    description: "Build connections that advance your career",
    badge: "Networking",
    icon: Users,
    color: "green",
    stats: [
      { label: "Events", value: "20+/yr" },
      { label: "Value", value: "High" },
    ],
    content: {
      overview: "Your professional network is one of your most valuable career assets. Most opportunities come through connections.",
      sections: [
        {
          title: "Industry Bodies",
          icon: Building,
          content: [
            "IET (Institution of Engineering and Technology)",
            "ECA (Electrical Contractors Association)",
            "SELECT (Scotland)",
            "NICEIC, NAPIT, ELECSA contractor schemes",
          ],
        },
        {
          title: "Networking Opportunities",
          icon: Users,
          content: [
            "Trade shows (ELEX, Edie Live)",
            "Local trade associations",
            "LinkedIn professional groups",
            "Technical training events",
            "Manufacturer showcase days",
          ],
        },
        {
          title: "Building Relationships",
          icon: Heart,
          content: [
            "Mentor relationships",
            "Peer learning groups",
            "Supplier partnerships",
            "Client relationship building",
            "Contractor collaboration",
          ],
        },
      ],
    },
  },
  {
    id: "leadership-management",
    title: "Leadership & Management",
    description: "Skills for supervisory and management roles",
    badge: "Leadership",
    icon: Star,
    color: "green",
    stats: [
      { label: "Skills", value: "8" },
      { label: "Salary Uplift", value: "+30%" },
    ],
    content: {
      overview: "Leadership skills unlock senior positions and significantly higher earning potential.",
      sections: [
        {
          title: "Site Leadership",
          icon: Shield,
          content: [
            "SSSTS (Site Supervisor Safety Training)",
            "SMSTS (Site Manager Safety Training)",
            "IOSH Managing Safely",
            "First Aid at Work",
          ],
        },
        {
          title: "Management Skills",
          icon: Target,
          content: [
            "Project management fundamentals",
            "Team motivation and development",
            "Performance management",
            "Resource planning and allocation",
            "Budget management basics",
          ],
        },
        {
          title: "Business Leadership",
          icon: Briefcase,
          content: [
            "Strategic planning",
            "Client relationship management",
            "Negotiation and contracts",
            "Business development",
            "Financial management",
          ],
        },
      ],
    },
  },
  {
    id: "personal-development",
    title: "Personal Development Planning",
    description: "Structure your career growth",
    badge: "Planning",
    icon: Target,
    color: "green",
    stats: [
      { label: "Timeframe", value: "1-5yrs" },
      { label: "Reviews", value: "Quarterly" },
    ],
    content: {
      overview: "A structured Personal Development Plan (PDP) keeps you focused and accountable for career growth.",
      sections: [
        {
          title: "Self Assessment",
          icon: CheckCircle,
          content: [
            "Skills audit against career goals",
            "Strengths and weaknesses analysis",
            "Values and priorities clarification",
            "Work-life balance review",
            "Feedback from colleagues/clients",
          ],
        },
        {
          title: "Goal Setting",
          icon: Target,
          content: [
            "SMART objectives (Specific, Measurable, Achievable, Relevant, Time-bound)",
            "Short-term milestones (3-6 months)",
            "Medium-term targets (1-2 years)",
            "Long-term vision (5+ years)",
          ],
        },
        {
          title: "Action Planning",
          icon: TrendingUp,
          content: [
            "Training and qualification schedule",
            "Networking activities",
            "Experience opportunities to seek",
            "Budget and resource allocation",
            "Progress review checkpoints",
          ],
        },
      ],
    },
  },
  {
    id: "digital-professionalism",
    title: "Digital Professionalism",
    description: "Online presence and digital reputation",
    badge: "Digital",
    icon: Laptop,
    color: "green",
    stats: [
      { label: "Platforms", value: "5+" },
      { label: "Impact", value: "Growing" },
    ],
    content: {
      overview: "Your digital presence increasingly influences career opportunities and business success.",
      sections: [
        {
          title: "Professional Profiles",
          icon: Users,
          content: [
            "LinkedIn optimization",
            "Industry forum participation",
            "Professional website/portfolio",
            "Google Business Profile (if self-employed)",
            "Review management",
          ],
        },
        {
          title: "Content Creation",
          icon: BookOpen,
          content: [
            "Sharing technical knowledge",
            "Project showcase posts",
            "Industry comment and insight",
            "Video content (tutorials, tips)",
            "Blog writing",
          ],
        },
        {
          title: "Digital Tools",
          icon: Settings,
          content: [
            "Professional communication tools",
            "Project collaboration platforms",
            "Customer relationship management",
            "Scheduling and booking systems",
            "Accounting and invoicing software",
          ],
        },
      ],
    },
  },
  {
    id: "innovation-entrepreneurship",
    title: "Innovation & Entrepreneurship",
    description: "Create value and build businesses",
    badge: "Innovation",
    icon: Lightbulb,
    color: "green",
    stats: [
      { label: "Opportunity", value: "High" },
      { label: "Growth", value: "15%/yr" },
    ],
    content: {
      overview: "The electrical industry offers significant opportunities for innovation and business creation.",
      sections: [
        {
          title: "Business Opportunities",
          icon: Briefcase,
          content: [
            "Specialist installation services",
            "Maintenance contracts",
            "Training and consultancy",
            "Product distribution",
            "Technology solutions",
          ],
        },
        {
          title: "Innovation Areas",
          icon: Lightbulb,
          content: [
            "Smart home integration",
            "Energy management services",
            "Renewable energy solutions",
            "EV charging networks",
            "Building performance optimization",
          ],
        },
        {
          title: "Getting Started",
          icon: Rocket,
          content: [
            "Market research and validation",
            "Business planning",
            "Funding options (grants, loans)",
            "Scheme registration requirements",
            "Marketing and customer acquisition",
          ],
        },
      ],
    },
  },
  {
    id: "sustainability-leadership",
    title: "Sustainability & ESG Leadership",
    description: "Lead the green transition",
    badge: "Green",
    icon: Leaf,
    color: "green",
    stats: [
      { label: "Demand", value: "Growing" },
      { label: "Premium", value: "+20%" },
    ],
    content: {
      overview: "Sustainability expertise is increasingly valuable as the industry decarbonizes.",
      sections: [
        {
          title: "Knowledge Areas",
          icon: BookOpen,
          content: [
            "Net Zero strategies and targets",
            "Building energy regulations",
            "Retrofit assessment (PAS 2035)",
            "Renewable energy technologies",
            "Circular economy principles",
          ],
        },
        {
          title: "Practical Skills",
          icon: Zap,
          content: [
            "Energy auditing basics",
            "Solar PV design and installation",
            "Heat pump integration",
            "EV infrastructure planning",
            "Battery storage systems",
          ],
        },
        {
          title: "Industry Leadership",
          icon: Star,
          content: [
            "Sustainability ambassador role",
            "Green certification schemes",
            "Industry working groups",
            "Policy engagement",
            "Client education",
          ],
        },
      ],
    },
  },
  {
    id: "wellbeing-resilience",
    title: "Wellbeing & Resilience",
    description: "Maintain mental and physical health",
    badge: "Wellbeing",
    icon: Heart,
    color: "green",
    stats: [
      { label: "Priority", value: "High" },
      { label: "Impact", value: "Career-long" },
    ],
    content: {
      overview: "A sustainable career requires attention to physical and mental health. The industry is increasingly recognizing this.",
      sections: [
        {
          title: "Physical Health",
          icon: Shield,
          content: [
            "Manual handling best practice",
            "Ergonomics and posture",
            "Hearing protection",
            "Eye care and protection",
            "Regular health checks",
          ],
        },
        {
          title: "Mental Wellbeing",
          icon: Heart,
          content: [
            "Stress management techniques",
            "Work-life balance",
            "Peer support networks",
            "Industry mental health resources",
            "Professional support when needed",
          ],
        },
        {
          title: "Career Sustainability",
          icon: TrendingUp,
          content: [
            "Financial planning and security",
            "Diversified skills reduce risk",
            "Transition planning as you age",
            "Mentoring as a two-way benefit",
            "Industry advocacy for wellbeing",
          ],
        },
      ],
      resources: [
        { title: "Lighthouse Construction Industry Charity", url: "https://www.lighthouseclub.org", description: "24/7 support helpline" },
        { title: "Mates in Mind", url: "https://www.matesinmind.org", description: "Mental health in construction" },
      ],
    },
  },
  {
    id: "industry-leadership",
    title: "Industry Leadership",
    description: "Shaping the future of the profession",
    badge: "Leadership",
    icon: Star,
    color: "green",
    stats: [
      { label: "Roles", value: "Many" },
      { label: "Impact", value: "High" },
    ],
    content: {
      overview: "Experienced electricians can influence the industry's future through leadership and advocacy.",
      sections: [
        {
          title: "Professional Bodies",
          icon: Building,
          content: [
            "IET committee membership",
            "Trade association involvement",
            "Standards development participation",
            "Technical authoring",
            "Industry consultation responses",
          ],
        },
        {
          title: "Education & Training",
          icon: GraduationCap,
          content: [
            "College advisory roles",
            "Apprentice mentoring",
            "Assessment and verification",
            "Training delivery",
            "Curriculum development input",
          ],
        },
        {
          title: "Advocacy",
          icon: Users,
          content: [
            "Promoting the profession",
            "STEM Ambassador activities",
            "Diversity and inclusion initiatives",
            "Safety culture leadership",
            "Environmental responsibility",
          ],
        },
      ],
    },
  },
  {
    id: "international-development",
    title: "International Development",
    description: "Global opportunities and recognition",
    badge: "Global",
    icon: Globe,
    color: "green",
    stats: [
      { label: "Countries", value: "50+" },
      { label: "Opportunity", value: "Growing" },
    ],
    content: {
      overview: "UK electrical qualifications are respected globally, opening international career opportunities.",
      sections: [
        {
          title: "Recognition",
          icon: CheckCircle,
          content: [
            "UK qualifications highly regarded internationally",
            "Commonwealth countries often accept directly",
            "Europe may require additional assessment",
            "Middle East construction opportunities",
            "Australasia skilled worker programmes",
          ],
        },
        {
          title: "Preparation",
          icon: BookOpen,
          content: [
            "Research target country requirements",
            "Professional registration (IET/Engineering Council)",
            "English language certification if required",
            "Visa and work permit understanding",
            "Cultural awareness development",
          ],
        },
        {
          title: "Opportunities",
          icon: Rocket,
          content: [
            "International contracting projects",
            "Overseas permanent positions",
            "Consultancy and training export",
            "Equipment manufacturer roles",
            "International development projects",
          ],
        },
      ],
    },
  },
  {
    id: "career-toolkit",
    title: "Career Planning Toolkit",
    description: "Resources for career management",
    badge: "Toolkit",
    icon: Settings,
    color: "green",
    stats: [
      { label: "Tools", value: "10+" },
      { label: "Value", value: "Essential" },
    ],
    content: {
      overview: "A collection of practical tools and templates for managing your electrical career.",
      sections: [
        {
          title: "Planning Tools",
          icon: Target,
          content: [
            "Skills audit template",
            "Personal development plan format",
            "CPD log template",
            "Goal setting worksheet",
            "Progress review checklist",
          ],
        },
        {
          title: "Career Documents",
          icon: BookOpen,
          content: [
            "CV/resume templates for electricians",
            "Portfolio presentation guide",
            "Cover letter examples",
            "Interview preparation checklist",
            "Reference request template",
          ],
        },
        {
          title: "Business Tools",
          icon: Briefcase,
          content: [
            "Quote template",
            "Invoice format",
            "Terms and conditions example",
            "Customer feedback form",
            "Business plan outline",
          ],
        },
      ],
    },
  },
];

// ==========================================
// INDUSTRY INSIGHTS ITEMS
// ==========================================

const industryInsightsItems: ContentItem[] = [
  {
    id: "market-trends",
    title: "Market Trends & Growth Areas",
    description: "Where the industry is heading 2024-2030",
    badge: "2024-2030",
    icon: TrendingUp,
    color: "purple",
    stats: [
      { label: "Growth", value: "6.8%" },
      { label: "Investment", value: "£12bn" },
    ],
    content: {
      overview: "The UK electrical industry is experiencing unprecedented transformation driven by decarbonization and digitalization.",
      sections: [
        {
          title: "High Growth Areas",
          icon: TrendingUp,
          content: [
            "EV Charging Infrastructure: 40% annual growth",
            "Solar PV & Battery: 35% growth (Net Zero driver)",
            "Smart Buildings: 25% growth (IoT integration)",
            "Data Centres: 20% growth (Tech expansion)",
            "Heat Pump Installation: 30% growth (gas boiler phase-out)",
          ],
        },
        {
          title: "Traditional Sector Outlook",
          icon: Building,
          content: [
            "Domestic: Stable growth, retrofit focus",
            "Commercial: Strong new build and refurb",
            "Industrial: Automation driving complexity",
            "Infrastructure: Major projects (HS2, nuclear)",
          ],
        },
        {
          title: "Skills Demand",
          icon: Users,
          content: [
            "15,000+ new electricians needed annually",
            "Aging workforce creating succession gaps",
            "Specialist skills commanding premium rates",
            "Multi-skilling increasingly valued",
          ],
        },
      ],
    },
  },
  {
    id: "sector-analysis",
    title: "Sector Analysis & Opportunities",
    description: "Deep dive into industry sectors",
    badge: "Analysis",
    icon: BarChart3,
    color: "purple",
    stats: [
      { label: "Sectors", value: "8" },
      { label: "Jobs", value: "250k+" },
    ],
    content: {
      overview: "Understanding sector dynamics helps you position yourself for the best opportunities.",
      sections: [
        {
          title: "Construction & New Build",
          icon: Building,
          content: [
            "Housing targets driving demand",
            "Large commercial developments in cities",
            "Infrastructure mega-projects",
            "MMC (Modern Methods of Construction) changing approach",
            "High earning potential but project-based",
          ],
        },
        {
          title: "Maintenance & FM",
          icon: Settings,
          content: [
            "Steady, recurring revenue",
            "FM contracts offer stability",
            "Multi-skilled roles emerging",
            "Technology integration increasing",
            "Work-life balance potential",
          ],
        },
        {
          title: "Renewables & Green Tech",
          icon: Leaf,
          content: [
            "Fastest growing sector",
            "Government policy support",
            "Training and certification requirements",
            "Higher technical complexity",
            "Values-driven career choice",
          ],
        },
        {
          title: "Specialist & Industrial",
          icon: Zap,
          content: [
            "Premium rates for specialists",
            "Higher barriers to entry",
            "Advanced technical skills needed",
            "Automation and PLC knowledge valued",
            "Often involves travel or shifts",
          ],
        },
      ],
    },
  },
  {
    id: "future-skills",
    title: "Future Skills Demand",
    description: "Skills that will be most valuable 2025-2035",
    badge: "Future",
    icon: Rocket,
    color: "purple",
    stats: [
      { label: "Timeframe", value: "10yrs" },
      { label: "Change", value: "Significant" },
    ],
    content: {
      overview: "Anticipating future skills demand helps you invest in the right development today.",
      sections: [
        {
          title: "High Certainty (2025-2028)",
          icon: CheckCircle,
          content: [
            "EV charging installation (all levels)",
            "Solar PV and battery storage",
            "Heat pump electrical requirements",
            "Smart home and building integration",
            "Advanced testing and diagnostics",
          ],
        },
        {
          title: "Emerging (2028-2032)",
          icon: TrendingUp,
          content: [
            "Vehicle-to-Grid (V2G) systems",
            "Microgrid design and maintenance",
            "AI-assisted fault diagnosis",
            "Hydrogen system electrical",
            "Advanced energy storage",
          ],
        },
        {
          title: "Speculative (2032+)",
          icon: Lightbulb,
          content: [
            "Wireless power distribution",
            "Advanced automation and robotics",
            "Quantum computing infrastructure",
            "Space-related electrical systems",
            "Fusion energy electrical",
          ],
        },
      ],
      tips: [
        "Focus current investment on high-certainty skills",
        "Monitor emerging areas for early-mover advantage",
        "Build strong fundamentals that transfer to new technologies",
      ],
    },
  },
  {
    id: "industry-outlook",
    title: "Industry Outlook & Strategy",
    description: "Strategic view for career planning",
    badge: "Strategy",
    icon: Target,
    color: "purple",
    stats: [
      { label: "Outlook", value: "Positive" },
      { label: "Planning", value: "5-10yrs" },
    ],
    content: {
      overview: "Understanding industry trajectory helps you make strategic career decisions.",
      sections: [
        {
          title: "Opportunities",
          icon: TrendingUp,
          content: [
            "Skills shortage = bargaining power",
            "Electrification = growing demand",
            "Technology = higher value work",
            "Regulations = barriers to entry protect skilled",
            "Net Zero = decades of work",
          ],
        },
        {
          title: "Challenges",
          icon: Shield,
          content: [
            "Keeping pace with technology change",
            "Regulatory complexity increasing",
            "Competition from adjacent trades",
            "Material and supply chain issues",
            "Insurance and compliance costs",
          ],
        },
        {
          title: "Strategic Recommendations",
          icon: Target,
          content: [
            "Invest in continuous learning",
            "Build specialist expertise",
            "Develop business/commercial skills",
            "Network actively",
            "Consider business ownership",
            "Plan for sector shifts",
          ],
        },
      ],
    },
  },
];

// ==========================================
// CAREER TIMELINE ITEMS (JIB LEVELS)
// ==========================================

const careerTimelineItems: ContentItem[] = [
  {
    id: "apprentice",
    title: "Electrical Apprentice",
    description: "Foundation level - 0-4 years experience",
    badge: "JIB Apprentice",
    icon: BookOpen,
    color: "orange",
    stats: [
      { label: "Duration", value: "4 years" },
      { label: "Salary", value: "£15-27k" },
    ],
    content: {
      overview: "The apprenticeship stage is where you build foundational skills through structured learning combining college study with practical on-site experience.",
      sections: [
        {
          title: "Key Qualifications",
          icon: GraduationCap,
          content: [
            "Level 2/3 NVQ Diploma in Electrical Installation",
            "18th Edition BS 7671 (2382-22)",
            "ECS Health & Safety Assessment",
            "Functional Skills (if required)",
          ],
        },
        {
          title: "Typical Responsibilities",
          icon: Zap,
          content: [
            "Assisting qualified electricians",
            "Basic cable installation and containment",
            "Learning safe isolation procedures",
            "Portfolio evidence collection",
            "College attendance and assignment completion",
          ],
        },
        {
          title: "Salary by Region",
          icon: DollarSign,
          content: [
            "London: £19,000 - £27,000",
            "South East: £17,000 - £25,000",
            "Midlands: £16,000 - £23,000",
            "North: £15,000 - £22,000",
          ],
        },
      ],
      tips: [
        "Focus on building strong fundamentals",
        "Document all learning for portfolio evidence",
        "Seek varied work experience",
      ],
    },
  },
  {
    id: "improver",
    title: "Electrical Improver",
    description: "Developing stage - 2-5 years experience",
    badge: "JIB Improver",
    icon: TrendingUp,
    color: "orange",
    stats: [
      { label: "Duration", value: "1-2 years" },
      { label: "Salary", value: "£22-35k" },
    ],
    content: {
      overview: "The improver stage bridges the gap between apprentice and qualified status. You're building competence and working toward your AM2 assessment.",
      sections: [
        {
          title: "Key Qualifications",
          icon: GraduationCap,
          content: [
            "Level 3 NVQ Diploma completed or near completion",
            "18th Edition current",
            "Working toward AM2/AM2S assessment",
            "ECS Card at Improver level",
          ],
        },
        {
          title: "Typical Responsibilities",
          icon: Zap,
          content: [
            "More complex installation work",
            "Working with reduced supervision",
            "Basic testing and inspection procedures",
            "Quality checking own work",
            "Supporting apprentices",
          ],
        },
        {
          title: "Salary by Region",
          icon: DollarSign,
          content: [
            "London: £27,000 - £35,000",
            "South East: £25,000 - £33,000",
            "Midlands: £23,000 - £30,000",
            "North: £22,000 - £28,000",
          ],
        },
      ],
      tips: [
        "Focus on AM2 preparation",
        "Gain testing and inspection experience",
        "Start considering specialization areas",
      ],
    },
  },
  {
    id: "electrician",
    title: "Electrician (Gold Card)",
    description: "Qualified stage - 4-7 years experience",
    badge: "JIB Electrician",
    icon: Award,
    color: "orange",
    stats: [
      { label: "Duration", value: "Career level" },
      { label: "Salary", value: "£27-46k" },
    ],
    content: {
      overview: "The Gold Card represents full qualification as an electrician. You can work independently and are responsible for the quality and safety of your work.",
      sections: [
        {
          title: "Key Qualifications",
          icon: GraduationCap,
          content: [
            "Level 3 NVQ Diploma",
            "AM2/AM2S Assessment passed",
            "18th Edition current",
            "ECS Gold Card",
          ],
        },
        {
          title: "Typical Responsibilities",
          icon: Zap,
          content: [
            "Independent electrical work",
            "Testing and certification",
            "Advanced fault finding",
            "Mentoring improvers and apprentices",
            "Customer liaison",
          ],
        },
        {
          title: "Salary by Region",
          icon: DollarSign,
          content: [
            "London: £35,000 - £46,000",
            "South East: £33,000 - £44,000",
            "Midlands: £29,000 - £40,000",
            "North: £27,000 - £38,000",
          ],
        },
      ],
      tips: [
        "Gain 2391 (Inspection & Testing) for advancement",
        "Build specialist expertise",
        "Consider NICEIC/NAPIT registration",
      ],
    },
  },
  {
    id: "approved",
    title: "Approved Electrician",
    description: "Senior stage - 5-10 years experience",
    badge: "JIB Approved",
    icon: CheckCircle,
    color: "orange",
    stats: [
      { label: "Duration", value: "Career level" },
      { label: "Salary", value: "£28-49k" },
    ],
    content: {
      overview: "Approved Electrician status recognizes enhanced competence in testing, inspection, and installation oversight.",
      sections: [
        {
          title: "Key Qualifications",
          icon: GraduationCap,
          content: [
            "All Gold Card qualifications",
            "2391-52 Inspection & Testing",
            "Demonstrated inspection competence",
            "3+ years post-Gold Card experience",
          ],
        },
        {
          title: "Typical Responsibilities",
          icon: Zap,
          content: [
            "Periodic inspection and testing",
            "EICR report production",
            "Design verification",
            "Quality assurance",
            "Team supervision",
          ],
        },
        {
          title: "Salary by Region",
          icon: DollarSign,
          content: [
            "London: £38,000 - £49,000",
            "South East: £35,000 - £46,000",
            "Midlands: £30,000 - £41,000",
            "North: £28,000 - £39,000",
          ],
        },
      ],
      tips: [
        "Consider Qualified Supervisor pathway",
        "Develop project management skills",
        "Explore business ownership options",
      ],
    },
  },
  {
    id: "supervisor",
    title: "Electrical Supervisor",
    description: "Leadership stage - 7-12+ years experience",
    badge: "JIB Supervisor",
    icon: Users,
    color: "orange",
    stats: [
      { label: "Duration", value: "Senior level" },
      { label: "Salary", value: "£38-72k" },
    ],
    content: {
      overview: "Supervisors lead teams, manage projects, and ensure quality and safety across multiple work areas.",
      sections: [
        {
          title: "Key Qualifications",
          icon: GraduationCap,
          content: [
            "Approved Electrician status",
            "SSSTS/SMSTS certification",
            "IOSH Managing Safely",
            "HNC/HND preferred for senior roles",
          ],
        },
        {
          title: "Typical Responsibilities",
          icon: Zap,
          content: [
            "Team leadership and coordination",
            "Project planning and scheduling",
            "Quality and safety management",
            "Client and stakeholder liaison",
            "Budget and resource management",
          ],
        },
        {
          title: "Salary by Region",
          icon: DollarSign,
          content: [
            "London: £49,000 - £72,000",
            "South East: £46,000 - £66,000",
            "Midlands: £41,000 - £60,000",
            "North: £38,000 - £55,000",
          ],
        },
      ],
      tips: [
        "Develop business management skills",
        "Build industry network",
        "Consider contracts management pathway",
      ],
    },
  },
];

// ==========================================
// JIB GRADES ITEMS
// ==========================================

const jibGradesItems: ContentItem[] = [
  {
    id: "apprentice-grade",
    title: "Apprentice Grade",
    description: "Entry level with protected minimum wage",
    badge: "Entry",
    icon: BookOpen,
    color: "amber",
    stats: [
      { label: "Hourly", value: "£8.00+" },
      { label: "Day Rate", value: "£60-65" },
    ],
    content: {
      overview: "The apprentice grade covers those enrolled on approved Level 3 apprenticeship programmes, with protected minimum wages and structured progression.",
      sections: [
        {
          title: "Requirements",
          icon: CheckCircle,
          content: [
            "Enrolled on approved Level 3 apprenticeship programme",
            "Working towards 2357/5357 NVQ Diploma",
            "Health & Safety test passed",
            "Monthly college attendance",
            "Employer mentorship",
          ],
        },
        {
          title: "Pay Rates (2024)",
          icon: DollarSign,
          content: [
            "Hourly: £8.00 minimum (apprentice national minimum)",
            "Day rate: £60-65/day typical",
            "Increases with each year of apprenticeship",
            "Regional variations apply",
          ],
        },
        {
          title: "Progression",
          icon: TrendingUp,
          content: [
            "Duration: 4 years typical",
            "Fast track: 2-3 years with prior experience (adult)",
            "Next level: Improver (after NVQ completion)",
          ],
        },
      ],
    },
  },
  {
    id: "improver-grade",
    title: "Improver Grade",
    description: "Post-qualification development level",
    badge: "Developing",
    icon: TrendingUp,
    color: "amber",
    stats: [
      { label: "Hourly", value: "£16-22" },
      { label: "Day Rate", value: "£160-220" },
    ],
    content: {
      overview: "The improver grade covers qualified electricians working toward their AM2 assessment and Gold Card status.",
      sections: [
        {
          title: "Requirements",
          icon: CheckCircle,
          content: [
            "Level 3 NVQ Diploma completed",
            "18th Edition BS 7671 certificate current",
            "Working towards AM2/AM2S assessment",
            "Minimum 6 months post-qualification experience",
            "ECS Health & Safety test passed",
          ],
        },
        {
          title: "Pay Rates (2024)",
          icon: DollarSign,
          content: [
            "Hourly: £16-22/hr typical",
            "Day rate: £160-220/day",
            "London premium: +10-15%",
            "Contractor rates: +15-25%",
          ],
        },
        {
          title: "Progression",
          icon: TrendingUp,
          content: [
            "Duration: 1-2 years typical",
            "Key milestone: AM2 assessment pass",
            "Next level: Electrician (Gold Card)",
          ],
        },
      ],
    },
  },
  {
    id: "electrician-grade",
    title: "Electrician (Gold Card)",
    description: "Fully qualified with industry-wide recognition",
    badge: "Qualified",
    icon: Award,
    color: "amber",
    stats: [
      { label: "Hourly", value: "£24-30" },
      { label: "Day Rate", value: "£200-320" },
    ],
    content: {
      overview: "The Gold Card represents full qualification as an electrician with UK-wide recognition and independent working authority.",
      sections: [
        {
          title: "Requirements",
          icon: CheckCircle,
          content: [
            "Level 3 NVQ Diploma completed",
            "AM2/AM2S assessment passed",
            "18th Edition BS 7671 current",
            "ECS Health & Safety test valid",
            "Minimum 2 years post-qualification experience",
          ],
        },
        {
          title: "Pay Rates (2024)",
          icon: DollarSign,
          content: [
            "Hourly: £24-30/hr base",
            "Day rate: £200-320/day",
            "London/SE premium: +15-25%",
            "Contractor rates: +20-30%",
          ],
        },
        {
          title: "Benefits",
          icon: Star,
          content: [
            "UK-wide site access",
            "Independent working authority",
            "Specialist pathway options",
            "Self-employment eligibility",
            "Part P registration pathway",
          ],
        },
      ],
    },
  },
  {
    id: "approved-grade",
    title: "Approved Electrician",
    description: "Enhanced with inspection & testing competence",
    badge: "Senior",
    icon: CheckCircle,
    color: "amber",
    stats: [
      { label: "Hourly", value: "£25-32" },
      { label: "Day Rate", value: "£220-330" },
    ],
    content: {
      overview: "Approved Electrician status recognizes enhanced competence in inspection, testing, and quality assurance.",
      sections: [
        {
          title: "Requirements",
          icon: CheckCircle,
          content: [
            "All Gold Card requirements",
            "2391-52 Inspection & Testing",
            "Minimum 3 years post-Gold Card experience",
            "Demonstrated complex installation competence",
            "JIB membership and CPD compliance",
          ],
        },
        {
          title: "Pay Rates (2024)",
          icon: DollarSign,
          content: [
            "Hourly: £25-32/hr enhanced",
            "Day rate: £220-330/day",
            "Testing/inspection work commands premium",
            "Contractor rates: +20-35%",
          ],
        },
        {
          title: "Progression",
          icon: TrendingUp,
          content: [
            "Qualified Supervisor pathway",
            "Technician Electrician pathway",
            "Business ownership opportunity",
            "Contracts management",
          ],
        },
      ],
    },
  },
  {
    id: "technician-grade",
    title: "Technician Electrician",
    description: "Advanced technical and design competence",
    badge: "Technical",
    icon: Settings,
    color: "amber",
    stats: [
      { label: "Hourly", value: "£28-36" },
      { label: "Day Rate", value: "£240-360" },
    ],
    content: {
      overview: "Technician Electricians hold advanced technical responsibilities including design, commissioning, and technical leadership.",
      sections: [
        {
          title: "Requirements",
          icon: CheckCircle,
          content: [
            "Approved Electrician status",
            "HNC/HND Electrical Engineering preferred",
            "2391-52 plus design qualifications",
            "Proven design and inspection competence",
            "Minimum 5 years advanced experience",
          ],
        },
        {
          title: "Pay Rates (2024)",
          icon: DollarSign,
          content: [
            "Hourly: £28-36/hr premium",
            "Day rate: £240-360/day",
            "Design work commands premium",
            "Contractor rates: +25-40%",
          ],
        },
        {
          title: "Responsibilities",
          icon: Zap,
          content: [
            "Electrical system design",
            "Advanced commissioning",
            "Technical problem solving",
            "Team technical leadership",
            "Client consultation",
          ],
        },
      ],
    },
  },
  {
    id: "supervisor-grade",
    title: "Supervisor Grade",
    description: "Management and leadership responsibilities",
    badge: "Management",
    icon: Users,
    color: "amber",
    stats: [
      { label: "Hourly", value: "£32-45" },
      { label: "Day Rate", value: "£280-400" },
    ],
    content: {
      overview: "Supervisors combine technical competence with management skills to lead teams and deliver projects safely and effectively.",
      sections: [
        {
          title: "Requirements",
          icon: CheckCircle,
          content: [
            "Approved or Technician Electrician status",
            "SSSTS/SMSTS certification",
            "IOSH Managing Safely or equivalent",
            "Proven team leadership experience",
            "First Aid at Work certification",
          ],
        },
        {
          title: "Pay Rates (2024)",
          icon: DollarSign,
          content: [
            "Hourly: £32-45/hr management",
            "Day rate: £280-400/day",
            "Salary: £49,000-72,000/year",
            "Bonus potential on projects",
          ],
        },
        {
          title: "Responsibilities",
          icon: Zap,
          content: [
            "Site safety management",
            "Team coordination and planning",
            "Quality control and reporting",
            "Client communication",
            "Budget oversight",
          ],
        },
      ],
    },
  },
];

// ==========================================
// REGIONAL MARKETS ITEMS
// ==========================================

const regionalMarketsItems: ContentItem[] = [
  {
    id: "regions-overview",
    title: "UK Regions Overview",
    description: "National picture of electrical job markets",
    badge: "Overview",
    icon: MapPin,
    color: "red",
    stats: [
      { label: "Regions", value: "10" },
      { label: "Jobs", value: "250k+" },
    ],
    content: {
      overview: "The UK electrical job market varies significantly by region, with differences in pay, demand, and specializations.",
      sections: [
        {
          title: "High Pay Regions",
          icon: DollarSign,
          content: [
            "London: Highest rates, +25-35% premium",
            "South East: Strong premium, +15-25%",
            "Major cities: Birmingham, Manchester, Leeds, Edinburgh",
          ],
        },
        {
          title: "High Demand Regions",
          icon: TrendingUp,
          content: [
            "South East: Housing boom, commercial growth",
            "East of England: Data centres, logistics",
            "Scotland: Renewables, oil & gas transition",
            "Wales: Manufacturing, renewables",
          ],
        },
        {
          title: "Specialist Hotspots",
          icon: Star,
          content: [
            "London/SE: Data centres, smart buildings",
            "North West: Industrial, manufacturing",
            "Scotland: Wind, offshore",
            "South West: Solar, tourism",
          ],
        },
      ],
    },
  },
  {
    id: "wage-bands",
    title: "JIB Wage Bands & Allowances",
    description: "Official rates and regional adjustments",
    badge: "Pay Rates",
    icon: DollarSign,
    color: "red",
    stats: [
      { label: "Updated", value: "2024" },
      { label: "Bands", value: "6" },
    ],
    content: {
      overview: "JIB sets national wage rates with regional variations and allowances for different working conditions.",
      sections: [
        {
          title: "Base Rates (2024)",
          icon: DollarSign,
          content: [
            "Apprentice: £8.00+ minimum",
            "Improver: £16-22/hr",
            "Electrician: £24-30/hr",
            "Approved: £25-32/hr",
            "Technician: £28-36/hr",
            "Supervisor: £32-45/hr",
          ],
        },
        {
          title: "Regional Premiums",
          icon: MapPin,
          content: [
            "London: +25-35%",
            "South East: +15-25%",
            "Other major cities: +5-15%",
            "Rural areas: Base rate",
          ],
        },
        {
          title: "Allowances",
          icon: Star,
          content: [
            "Travel/mileage allowances",
            "Overnight accommodation",
            "Tool allowances",
            "Skill premium (e.g., EV, testing)",
            "Shift premiums (nights, weekends)",
          ],
        },
      ],
    },
  },
  {
    id: "demand-hotspots",
    title: "Demand Hotspots & Cities",
    description: "Where the jobs are concentrated",
    badge: "Hot Spots",
    icon: TrendingUp,
    color: "red",
    stats: [
      { label: "Cities", value: "20+" },
      { label: "Growth", value: "High" },
    ],
    content: {
      overview: "Job demand concentrates in major cities and regions with significant construction, industrial, or infrastructure activity.",
      sections: [
        {
          title: "Top Cities",
          icon: Building,
          content: [
            "London: 40,000+ electricians, diverse work",
            "Birmingham: Manufacturing, construction",
            "Manchester: Tech, commercial growth",
            "Leeds: Financial services, residential",
            "Edinburgh/Glasgow: Renewables, commercial",
          ],
        },
        {
          title: "Growth Areas",
          icon: TrendingUp,
          content: [
            "Milton Keynes: Logistics, data centres",
            "Cambridge: Tech, biotech",
            "Bristol: Aerospace, professional services",
            "Cardiff: Government, digital",
          ],
        },
        {
          title: "Infrastructure Hotspots",
          icon: Zap,
          content: [
            "HS2 route: West Midlands to London",
            "Nuclear sites: Somerset, Suffolk",
            "Wind farms: North East, Scotland",
            "Data corridors: London to Cambridge",
          ],
        },
      ],
    },
  },
  {
    id: "apprenticeships-providers",
    title: "Apprenticeships & Training Providers",
    description: "Regional training options and providers",
    badge: "Training",
    icon: GraduationCap,
    color: "red",
    stats: [
      { label: "Providers", value: "100+" },
      { label: "Starts/yr", value: "15k+" },
    ],
    content: {
      overview: "Quality apprenticeship and training providers operate across all UK regions, with some specializing in particular sectors.",
      sections: [
        {
          title: "Major Providers",
          icon: GraduationCap,
          content: [
            "JTL: Largest electrical apprenticeship provider",
            "ECA Training: Industry body programmes",
            "NICEIC Academy: Contractor-focused training",
            "College networks: Regional FE colleges",
          ],
        },
        {
          title: "Regional Specialists",
          icon: MapPin,
          content: [
            "London: SELECT, City & Guilds centres",
            "Scotland: SECTT, Scottish colleges",
            "Wales: CITB Wales, Coleg Cambria",
            "Northern Ireland: CITB NI",
          ],
        },
        {
          title: "Employer Programmes",
          icon: Building,
          content: [
            "Major contractors run internal academies",
            "Utility companies (UKPN, Western Power)",
            "FM companies (Mitie, Interserve)",
            "Manufacturing (Siemens, ABB)",
          ],
        },
      ],
    },
  },
  {
    id: "cost-of-living",
    title: "Cost of Living & Travel",
    description: "Balancing pay with regional costs",
    badge: "Cost Analysis",
    icon: DollarSign,
    color: "red",
    stats: [
      { label: "Variation", value: "40%+" },
      { label: "Factor", value: "Critical" },
    ],
    content: {
      overview: "Higher pay in some regions is offset by higher living costs. Consider net disposable income when evaluating opportunities.",
      sections: [
        {
          title: "High Cost Regions",
          icon: Building,
          content: [
            "London: +40-50% living costs",
            "South East: +20-30%",
            "Cambridge/Oxford: +25-35%",
            "Bristol: +15-20%",
          ],
        },
        {
          title: "Lower Cost Regions",
          icon: MapPin,
          content: [
            "North East: -15-20% vs national average",
            "Yorkshire: -10-15%",
            "West Midlands: -5-10%",
            "Wales: -10-15%",
          ],
        },
        {
          title: "Travel Considerations",
          icon: TrendingUp,
          content: [
            "Commuting costs can be significant",
            "LOA (lodging allowance) for travel work",
            "Van/fuel costs for self-employed",
            "Time value of commute",
          ],
        },
      ],
    },
  },
  {
    id: "compliance-practice",
    title: "Compliance & Best Practice",
    description: "Regional regulatory considerations",
    badge: "Compliance",
    icon: Shield,
    color: "red",
    stats: [
      { label: "Bodies", value: "5+" },
      { label: "Priority", value: "Essential" },
    ],
    content: {
      overview: "While national regulations apply, some regional variations and best practices exist across the UK.",
      sections: [
        {
          title: "National Standards",
          icon: CheckCircle,
          content: [
            "BS 7671 applies across UK",
            "Part P (Building Regulations) in England & Wales",
            "Scottish Building Standards (similar)",
            "Northern Ireland Building Regulations",
          ],
        },
        {
          title: "Regional Bodies",
          icon: Building,
          content: [
            "England & Wales: NICEIC, NAPIT, ELECSA",
            "Scotland: SELECT (industry association)",
            "Northern Ireland: NIBSID",
            "All: ECS card scheme applies UK-wide",
          ],
        },
        {
          title: "Best Practice",
          icon: Star,
          content: [
            "Join relevant regional association",
            "Understand local authority requirements",
            "Build relationships with building control",
            "Stay current with regional updates",
          ],
        },
      ],
    },
  },
  {
    id: "key-employers",
    title: "Key Employers & Projects",
    description: "Major employers by region",
    badge: "Employers",
    icon: Building,
    color: "red",
    stats: [
      { label: "Employers", value: "1000+" },
      { label: "Projects", value: "Major" },
    ],
    content: {
      overview: "Understanding key employers and projects helps you identify opportunities and target your job search.",
      sections: [
        {
          title: "Major Contractors",
          icon: Building,
          content: [
            "National: NG Bailey, Balfour Beatty, Crown House",
            "London: Weinstock, MCE Group, Walters",
            "Regional specialists vary by area",
            "FM companies: Mitie, CBRE, JLL",
          ],
        },
        {
          title: "Major Projects",
          icon: Zap,
          content: [
            "HS2: Multi-billion infrastructure",
            "Hinkley Point C: Nuclear new build",
            "London infrastructure: Crossrail completion",
            "Data centre expansion: UK-wide",
          ],
        },
        {
          title: "Growing Sectors",
          icon: TrendingUp,
          content: [
            "EV charging networks",
            "Solar farm development",
            "Battery storage facilities",
            "Smart grid upgrades",
          ],
        },
      ],
    },
  },
  {
    id: "agencies-job-boards",
    title: "Agencies & Job Boards",
    description: "Finding work across UK regions",
    badge: "Job Search",
    icon: Users,
    color: "red",
    stats: [
      { label: "Agencies", value: "50+" },
      { label: "Boards", value: "10+" },
    ],
    content: {
      overview: "The right agencies and job boards can help you find opportunities, whether permanent, contract, or temporary work.",
      sections: [
        {
          title: "Specialist Agencies",
          icon: Users,
          content: [
            "Electus Recruitment: Electrical specialist",
            "Hays Building Services: M&E focus",
            "Matchtech: Engineering and technical",
            "Reed: General with electrical division",
          ],
        },
        {
          title: "Job Boards",
          icon: Laptop,
          content: [
            "Indeed: Largest general board",
            "CV-Library: Strong in trades",
            "Totaljobs: Good for permanent",
            "LinkedIn: Growing for electrical",
          ],
        },
        {
          title: "Direct Routes",
          icon: Building,
          content: [
            "Company careers pages",
            "Industry networking",
            "Trade association job boards",
            "Social media (LinkedIn, Facebook groups)",
          ],
        },
      ],
      resources: [
        { title: "JIB Job Board", url: "https://www.jib.org.uk", description: "Industry-specific listings" },
        { title: "ECA Members Directory", url: "https://www.eca.co.uk", description: "Find ECA member contractors" },
      ],
    },
  },
];

// ==========================================
// SECTION DEFINITIONS
// ==========================================

export const careerSections: CareerSection[] = [
  {
    id: "career-overview",
    title: "Career Overview",
    description: "Explore career pathways, progression routes, and industry opportunities",
    icon: Compass,
    color: "yellow",
    previewStat: "12+",
    statLabel: "Pathways",
    items: careerOverviewItems,
  },
  {
    id: "skills-development",
    title: "Skills Development",
    description: "Build technical expertise and professional capabilities",
    icon: Brain,
    color: "blue",
    previewStat: "30+",
    statLabel: "Skills",
    items: skillsDevelopmentItems,
  },
  {
    id: "professional-development",
    title: "Professional Development",
    description: "Advance your career through qualifications and certifications",
    icon: Target,
    color: "green",
    previewStat: "30hrs",
    statLabel: "CPD/Year",
    items: professionalDevelopmentItems,
  },
  {
    id: "industry-insights",
    title: "Industry Insights",
    description: "Market trends, growth areas, and future opportunities",
    icon: BarChart3,
    color: "purple",
    previewStat: "6.8%",
    statLabel: "Growth",
    items: industryInsightsItems,
  },
  {
    id: "career-timeline",
    title: "Career Timeline",
    description: "Visual progression path from apprentice to senior roles",
    icon: Clock,
    color: "orange",
    previewStat: "5",
    statLabel: "JIB Levels",
    items: careerTimelineItems,
  },
  {
    id: "jib-grades",
    title: "JIB Grades",
    description: "Official grading scheme with rates and requirements",
    icon: Award,
    color: "amber",
    previewStat: "£85k+",
    statLabel: "Top Rate",
    items: jibGradesItems,
  },
  {
    id: "regional-markets",
    title: "Regional Markets",
    description: "UK regional job markets, salaries, and opportunities",
    icon: MapPin,
    color: "red",
    previewStat: "10",
    statLabel: "Regions",
    items: regionalMarketsItems,
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getSectionById(id: string): CareerSection | undefined {
  return careerSections.find(section => section.id === id);
}

export function getItemById(sectionId: string, itemId: string): ContentItem | undefined {
  const section = getSectionById(sectionId);
  return section?.items.find(item => item.id === itemId);
}
