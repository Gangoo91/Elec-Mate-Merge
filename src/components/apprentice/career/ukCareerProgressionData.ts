
export interface UKQualification {
  level: string;
  name: string;
  code?: string;
  duration: string;
  cost: string;
  awarding_body: string;
  description: string;
  renewal?: string;
}

export interface UKCareerLevel {
  id: string;
  title: string;
  jib_grade: string;
  typical_experience: string;
  key_qualifications: UKQualification[];
  salary_ranges: {
    london: string;
    south_east: string;
    midlands: string;
    north: string;
    scotland_wales: string;
  };
  progression_timeline: string;
  time_to_achieve?: string;
  prerequisites?: { name: string; code?: string; mandatory?: boolean; awarding_body?: string }[];
  day_rates?: { employed?: string; contractor?: string };
  cpd?: { interval?: string; requirements?: string[] };
  branches?: { id: string; title: string; description: string }[];
  portfolio_evidence?: string[];
  regional_notes?: string;
  typical_responsibilities: string[];
  next_steps: string[];
  work_sectors: string[];
}

export const ukQualifications: UKQualification[] = [
  {
    level: "Level 2",
    name: "Electrical Installation NVQ Diploma",
    duration: "12-18 months",
    cost: "£3,000-£5,000",
    awarding_body: "City & Guilds, EAL, NICEIC",
    description: "Foundation qualification for electrical installation work"
  },
  {
    level: "Level 3",
    name: "Electrical Installation NVQ Diploma",
    code: "2357/5357",
    duration: "12-24 months",
    cost: "£4,000-£7,000",
    awarding_body: "City & Guilds, EAL, NICEIC",
    description: "Advanced electrical installation qualification"
  },
  {
    level: "Level 3",
    name: "AM2 Assessment",
    code: "AM2/AM2S",
    duration: "1 day",
    cost: "£400-£600",
    awarding_body: "JIB/ECS",
    description: "Practical assessment for JIB Gold Card"
  },
  {
    level: "Level 3",
    name: "18th Edition BS 7671",
    code: "2382-22",
    duration: "3-5 days",
    cost: "£300-£500",
    awarding_body: "City & Guilds, NICEIC, NAPIT",
    description: "Wiring regulations qualification",
    renewal: "Stay current with BS 7671 A2:2022 updates"
  },
  {
    level: "Level 3",
    name: "Inspection & Testing (2391)",
    code: "2391-52",
    duration: "5-10 days",
    cost: "£800-£1,200",
    awarding_body: "City & Guilds, EAL",
    description: "Initial verification and periodic inspection",
    renewal: "Maintain competence through CPD and practice"
  },
  {
    level: "Level 4",
    name: "HNC Electrical Engineering",
    duration: "2 years part-time",
    cost: "£5,000-£8,000",
    awarding_body: "Pearson, SQA",
    description: "Higher National Certificate in Electrical Engineering"
  },
  {
    level: "Level 5",
    name: "HND Electrical Engineering",
    duration: "2 years part-time",
    cost: "£6,000-£10,000",
    awarding_body: "Pearson, SQA",
    description: "Higher National Diploma in Electrical Engineering"
  }
];

export const ukCareerLevels: UKCareerLevel[] = [
  {
    id: "apprentice",
    title: "Electrical Apprentice",
    jib_grade: "Apprentice",
    typical_experience: "0-4 years",
    key_qualifications: [
      ukQualifications[0], // Level 2 NVQ
      ukQualifications[3]  // 18th Edition
    ],
    salary_ranges: {
      london: "£18,000 - £25,000",
      south_east: "£16,000 - £23,000",
      midlands: "£15,000 - £21,000",
      north: "£14,000 - £20,000",
      scotland_wales: "£14,000 - £20,000"
    },
    progression_timeline: "4 years typical apprenticeship duration",
    time_to_achieve: "0–4 years",
    prerequisites: [
      { name: "ECS Health & Safety Assessment", code: "ECS H&S", mandatory: true, awarding_body: "ECS" },
      { name: "Level 2 Diploma enrolment", mandatory: true },
      { name: "BS 7671 awareness (18th Edition)", code: "2382-22", mandatory: false, awarding_body: "City & Guilds" }
    ],
    day_rates: { employed: "Apprentice wage (age/year dependent)", contractor: "N/A" },
    cpd: { interval: "Ongoing", requirements: ["College assignments", "Toolbox talks", "Logbook updates"] },
    branches: [],
    portfolio_evidence: ["Supervisor sign-offs", "Site photos with descriptions", "Risk assessments", "College project work"],
    regional_notes: "Wages vary by region; London weighting may apply",
    typical_responsibilities: [
      "Learning electrical installation basics",
      "Assisting qualified electricians",
      "Following safety procedures",
      "Basic fault finding under supervision"
    ],
    next_steps: [
      "Complete Level 3 NVQ Diploma",
      "Pass AM2 assessment",
      "Gain JIB Gold Card",
      "Progress to Approved Electrician"
    ],
    work_sectors: ["Domestic", "Commercial", "Industrial", "Construction"]
  },
  {
    id: "improver",
    title: "Electrical Improver",
    jib_grade: "Improver",
    typical_experience: "2-5 years",
    key_qualifications: [
      ukQualifications[1], // Level 3 NVQ
      ukQualifications[3]  // 18th Edition
    ],
    salary_ranges: {
      london: "£25,000 - £32,000",
      south_east: "£23,000 - £30,000",
      midlands: "£21,000 - £28,000",
      north: "£20,000 - £26,000",
      scotland_wales: "£20,000 - £26,000"
    },
    progression_timeline: "1-2 years between apprentice and approved status",
    time_to_achieve: "~1–2 years from Apprentice",
    prerequisites: [
      { name: "Working towards Level 3 NVQ", code: "2357/5357", mandatory: true },
      { name: "18th Edition (recommended)", code: "2382-22", mandatory: false },
      { name: "ECS Health & Safety Assessment", code: "ECS H&S", mandatory: true }
    ],
    day_rates: { employed: "£100–£150/day equivalent", contractor: "£120–£180/day" },
    cpd: { interval: "Ongoing", requirements: ["Toolbox talks", "Manufacturer briefings"] },
    branches: [],
    portfolio_evidence: ["Second-fix installations", "Test results witnessed", "RAMS participation"],
    regional_notes: "Rates vary; London/South East command higher day rates",
    typical_responsibilities: [
      "More complex installation work",
      "Working with minimal supervision",
      "Basic design calculations",
      "Quality control checks"
    ],
    next_steps: [
      "Complete AM2 assessment",
      "Gain additional experience",
      "Consider Inspection & Testing qualification",
      "Apply for Approved Electrician status"
    ],
    work_sectors: ["Domestic", "Commercial", "Industrial", "Maintenance"]
  },
  {
    id: "electrician",
    title: "Electrician",
    jib_grade: "Electrician (Gold Card)",
    typical_experience: "4-7 years",
    key_qualifications: [
      ukQualifications[1], // Level 3 NVQ
      ukQualifications[2], // AM2
      ukQualifications[3]  // 18th Edition
    ],
    salary_ranges: {
      london: "£32,000 - £42,000",
      south_east: "£30,000 - £40,000",
      midlands: "£27,000 - £37,000",
      north: "£25,000 - £35,000",
      scotland_wales: "£25,000 - £35,000"
    },
    progression_timeline: "Achieved after NVQ3 + AM2 (Gold Card)",
    time_to_achieve: "Typically 4–7 years total",
    prerequisites: [
      { name: "Level 3 NVQ", code: "2357/5357", mandatory: true },
      { name: "AM2/AM2S practical assessment", code: "AM2/AM2S", mandatory: true, awarding_body: "JIB/ECS" },
      { name: "18th Edition BS 7671", code: "2382-22", mandatory: true }
    ],
    day_rates: { employed: "£150–£220/day equivalent", contractor: "£180–£280/day" },
    cpd: { interval: "Annual (recommended)", requirements: ["BS 7671 amendment updates", "Manufacturer CPD"] },
    branches: [
      { id: "qs", title: "Qualified Supervisor (NICEIC/NAPIT)", description: "Take responsibility for compliance and certification" },
      { id: "specialist", title: "Specialist Installer (EV/Solar)", description: "Gain 2919 (EV) or 2399 (Solar PV) and focus on renewables" }
    ],
    portfolio_evidence: ["EIC/MWC certificates", "Test sheets (initial verification)", "Complex fault rectification write-ups"],
    regional_notes: "Day rates highest in London/South East; industrial sites often pay premium",
    typical_responsibilities: [
      "Independent electrical work",
      "Testing and certification for own work",
      "Mentoring improvers/apprentices",
      "Advanced fault finding"
    ],
    next_steps: [
      "Gain Inspection & Testing (2391)",
      "Progress to Approved Electrician with experience",
      "Choose a specialism (EV, Solar PV, Data, Industrial)",
      "Consider Qualified Supervisor (NICEIC/NAPIT)"
    ],
    work_sectors: ["Domestic", "Commercial", "Industrial", "Maintenance"]
  },
  {
    id: "approved",
    title: "Approved Electrician",
    jib_grade: "Approved Electrician",
    typical_experience: "5-10 years",
    key_qualifications: [
      ukQualifications[1], // Level 3 NVQ
      ukQualifications[2], // AM2
      ukQualifications[3], // 18th Edition
      ukQualifications[4]  // 2391
    ],
    salary_ranges: {
      london: "£35,000 - £45,000",
      south_east: "£32,000 - £42,000",
      midlands: "£28,000 - £38,000",
      north: "£26,000 - £36,000",
      scotland_wales: "£26,000 - £36,000"
    },
    progression_timeline: "1-3 years from Electrician with 2391 and experience",
    time_to_achieve: "~1–3 years from Electrician",
    prerequisites: [
      { name: "Inspection & Testing", code: "2391-52", mandatory: true, awarding_body: "City & Guilds/EAL" },
      { name: "Demonstrable installation/testing experience", mandatory: true }
    ],
    day_rates: { employed: "£170–£240/day equivalent", contractor: "£200–£300/day" },
    cpd: { interval: "Annual", requirements: ["BS 7671 updates", "Scheme technical updates"] },
    branches: [
      { id: "tech", title: "Technician (JIB)", description: "Advanced technical responsibilities" },
      { id: "qs", title: "Qualified Supervisor", description: "Sign-off and compliance lead" }
    ],
    portfolio_evidence: ["EICR reports", "Full testing schedules", "Design/calculation examples"],
    regional_notes: "Industrial/Infrastructure roles often carry higher rates",
    typical_responsibilities: [
      "Independent electrical work",
      "Supervising apprentices and improvers",
      "Design and installation planning",
      "Inspection and testing",
      "Certification and compliance"
    ],
    next_steps: [
      "Lead small teams or become Qualified Supervisor",
      "Progress to Supervisor or Technician Electrician (JIB)",
      "Consider HNC/HND or design-focused courses",
      "Start or scale a contracting business"
    ],
    work_sectors: ["All sectors", "Specialist installations", "Commissioning"]
  },
  {
    id: "supervisor",
    title: "Electrical Supervisor",
    jib_grade: "Supervisor",
    typical_experience: "7-12 years",
    key_qualifications: [
      ukQualifications[1], // Level 3 NVQ
      ukQualifications[4], // 2391
      ukQualifications[5]  // HNC
    ],
    salary_ranges: {
      london: "£45,000 - £65,000",
      south_east: "£42,000 - £60,000",
      midlands: "£38,000 - £55,000",
      north: "£35,000 - £50,000",
      scotland_wales: "£35,000 - £50,000"
    },
    progression_timeline: "2-4 years from Approved with leadership experience",
    time_to_achieve: "~2–4 years from Approved",
    day_rates: { employed: "£220–£320/day equivalent", contractor: "£260–£380/day" },
    cpd: { interval: "Annual", requirements: ["Management H&S (SMSTS/SSSTS)", "Manufacturer leadership briefings"] },
    portfolio_evidence: ["Project programmes", "RAMS & permits", "Budget reports", "Team training records"],
    typical_responsibilities: [
      "Managing electrical teams and projects",
      "Budget and resource planning",
      "Health and safety compliance",
      "Client liaison",
      "Staff development"
    ],
    next_steps: [
      "Electrical Manager roles",
      "Contracts Manager positions",
      "Start electrical contracting business",
      "Move into engineering consultancy"
    ],
    work_sectors: ["Large commercial", "Industrial", "Infrastructure", "Energy"]
  },
  {
    id: "contractor",
    title: "Electrical Contractor",
    jib_grade: "Self-employed",
    typical_experience: "5+ years",
    key_qualifications: [
      ukQualifications[1], // Level 3 NVQ
      ukQualifications[4]  // 2391
    ],
    salary_ranges: {
      london: "£40,000 - £80,000+",
      south_east: "£35,000 - £70,000+",
      midlands: "£30,000 - £60,000+",
      north: "£28,000 - £55,000+",
      scotland_wales: "£28,000 - £55,000+"
    },
    progression_timeline: "Can start after approved status with business setup",
    time_to_achieve: "Varies — depends on business setup",
    prerequisites: [
      { name: "Business setup", mandatory: true },
      { name: "Public liability & professional indemnity insurance", mandatory: true },
      { name: "Certification scheme membership (NICEIC/NAPIT)", mandatory: false }
    ],
    day_rates: { employed: "N/A", contractor: "£200–£450+/day" },
    cpd: { interval: "Annual", requirements: ["Scheme assessment", "Regulatory updates", "Accounts & H&S compliance"] },
    branches: [
      { id: "di", title: "Domestic Installer", description: "Part P domestic scope" },
      { id: "ac", title: "Approved Contractor", description: "Full scope commercial/industrial" }
    ],
    portfolio_evidence: ["Client testimonials", "EIC/EICR portfolio", "QMS procedures"],
    regional_notes: "Rates vary widely by sector, client base and region",
    typical_responsibilities: [
      "Running own electrical business",
      "Client acquisition and management",
      "Project estimation and delivery",
      "Regulatory compliance",
      "Business development"
    ],
    next_steps: [
      "Expand business operations",
      "Employ additional electricians",
      "Specialise in high-value sectors",
      "Develop multiple revenue streams"
    ],
    work_sectors: ["Domestic", "Commercial", "Specialist installations", "Maintenance contracts"]
  }
];

export const ukWorkSectors = [
  {
    name: "Domestic",
    description: "Residential electrical work including new builds, rewiring, and maintenance",
    typical_pay: "£150-£300/day",
    growth_outlook: "Stable",
    key_skills: ["Consumer unit installation", "Fault finding", "PAT testing", "Solar PV"]
  },
  {
    name: "Commercial",
    description: "Office buildings, retail spaces, and commercial facilities",
    typical_pay: "£180-£350/day",
    growth_outlook: "Growing",
    key_skills: ["Three-phase systems", "Fire alarms", "Emergency lighting", "Data cabling"]
  },
  {
    name: "Industrial",
    description: "Manufacturing plants, warehouses, and heavy industry",
    typical_pay: "£200-£400/day",
    growth_outlook: "Strong",
    key_skills: ["Motor control", "PLCs", "High voltage", "Automation systems"]
  },
  {
    name: "Construction",
    description: "New build residential and commercial construction projects",
    typical_pay: "£170-£320/day",
    growth_outlook: "Cyclical",
    key_skills: ["First fix", "Second fix", "Temporary supplies", "Site safety"]
  },
  {
    name: "Maintenance",
    description: "Ongoing maintenance contracts for various types of properties",
    typical_pay: "£160-£280/day",
    growth_outlook: "Stable",
    key_skills: ["Fault diagnosis", "Preventive maintenance", "Emergency repairs", "Testing"]
  },
  {
    name: "Renewable Energy",
    description: "Solar PV, wind, and other renewable energy installations",
    typical_pay: "£200-£450/day",
    growth_outlook: "Rapid growth",
    key_skills: ["Solar PV design", "Battery storage", "Grid connection", "MCS certification"]
  },
  {
    name: "Data/Telecoms",
    description: "Network cabling, telecommunications, and IT infrastructure",
    typical_pay: "£180-£350/day",
    growth_outlook: "Strong",
    key_skills: ["Fibre optics", "Cat6/7 cabling", "Network testing", "Wireless systems"]
  }
];

export const regionalJobMarkets = [
  {
    region: "London",
    job_availability: "High",
    average_rates: "£200-£400/day",
    cost_of_living: "Very High",
    transport_links: "Excellent",
    key_sectors: ["Commercial", "High-end residential", "Infrastructure", "Data centres"],
    major_employers: ["Balfour Beatty", "VINCI", "Skanska", "ISG"],
    growth_areas: ["Electric vehicle charging", "Smart buildings", "Renewable energy"]
  },
  {
    region: "South East",
    job_availability: "High",
    average_rates: "£180-£350/day",
    cost_of_living: "High",
    transport_links: "Good",
    key_sectors: ["Residential", "Commercial", "Industrial", "Marine"],
    major_employers: ["Bouygues", "Morgan Sindall", "Kier", "Local contractors"],
    growth_areas: ["Offshore wind", "Data centres", "Housing developments"]
  },
  {
    region: "Midlands",
    job_availability: "Good",
    average_rates: "£160-£300/day",
    cost_of_living: "Medium",
    transport_links: "Good",
    key_sectors: ["Manufacturing", "Automotive", "Logistics", "Commercial"],
    major_employers: ["JLR", "BMW", "Amazon", "Regional contractors"],
    growth_areas: ["Electric vehicle manufacturing", "Automation", "Warehousing"]
  },
  {
    region: "North England",
    job_availability: "Good",
    average_rates: "£150-£280/day",
    cost_of_living: "Low-Medium",
    transport_links: "Good",
    key_sectors: ["Industrial", "Energy", "Transport", "Commercial"],
    major_employers: ["Sellafield", "Nuclear sector", "Transport for the North"],
    growth_areas: ["Nuclear power", "Offshore wind", "HS2 infrastructure"]
  },
  {
    region: "Scotland",
    job_availability: "Good",
    average_rates: "£150-£290/day",
    cost_of_living: "Medium",
    transport_links: "Good",
    key_sectors: ["Oil & Gas", "Renewable energy", "Whisky industry", "Marine"],
    major_employers: ["SSE", "ScottishPower", "Wood Group", "Offshore operators"],
    growth_areas: ["Offshore wind", "Green hydrogen", "Energy storage"]
  },
  {
    region: "Wales",
    job_availability: "Moderate",
    average_rates: "£140-£270/day",
    cost_of_living: "Low-Medium",
    transport_links: "Good",
    key_sectors: ["Manufacturing", "Energy", "Tourism", "Agriculture"],
    major_employers: ["Airbus", "Ford", "Tata Steel", "Local authorities"],
    growth_areas: ["Renewable energy", "Electric vehicle components", "Data centres"]
  }
];
