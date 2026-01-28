// UK Electrical Industry Constants
// Job titles, qualifications, and card types specific to the UK electrical trade

export interface JobTitle {
  value: string;
  label: string;
  category: 'Apprentice' | 'Operative' | 'Supervisor' | 'Management' | 'Engineering';
}

export const UK_JOB_TITLES: JobTitle[] = [
  // Apprentice levels
  { value: 'apprentice_1st', label: 'Apprentice Electrician (1st Year)', category: 'Apprentice' },
  { value: 'apprentice_2nd', label: 'Apprentice Electrician (2nd Year)', category: 'Apprentice' },
  { value: 'apprentice_3rd', label: 'Apprentice Electrician (3rd Year)', category: 'Apprentice' },
  { value: 'apprentice_4th', label: 'Apprentice Electrician (4th Year)', category: 'Apprentice' },
  // Operative roles
  { value: 'installation', label: 'Installation Electrician', category: 'Operative' },
  { value: 'maintenance', label: 'Maintenance Electrician', category: 'Operative' },
  { value: 'approved', label: 'Approved Electrician', category: 'Operative' },
  { value: 'domestic', label: 'Domestic Electrician', category: 'Operative' },
  { value: 'commercial', label: 'Commercial Electrician', category: 'Operative' },
  { value: 'industrial', label: 'Industrial Electrician', category: 'Operative' },
  // Supervisory roles
  { value: 'qualified_supervisor', label: 'Qualified Supervisor', category: 'Supervisor' },
  { value: 'site_supervisor', label: 'Site Supervisor', category: 'Supervisor' },
  { value: 'foreman', label: 'Electrical Foreman', category: 'Supervisor' },
  // Management roles
  { value: 'project_manager', label: 'Project Manager', category: 'Management' },
  { value: 'contracts_manager', label: 'Contracts Manager', category: 'Management' },
  { value: 'operations_manager', label: 'Operations Manager', category: 'Management' },
  // Engineering roles
  { value: 'electrical_engineer', label: 'Electrical Engineer', category: 'Engineering' },
  { value: 'design_engineer', label: 'Design Engineer', category: 'Engineering' },
  { value: 'testing_commissioning', label: 'Testing & Commissioning Engineer', category: 'Engineering' },
];

export interface QualificationItem {
  value: string;
  label: string;
  awarding: string;
  hasExpiry?: boolean;
  expiryYears?: number;
}

export interface QualificationCategory {
  label: string;
  icon: string;
  items: QualificationItem[];
}

export const UK_QUALIFICATIONS: Record<string, QualificationCategory> = {
  core: {
    label: 'Core Qualifications',
    icon: 'GraduationCap',
    items: [
      { value: 'nvq_level_2', label: 'NVQ Level 2 Electrical Installation', awarding: 'City & Guilds' },
      { value: 'nvq_level_3', label: 'NVQ Level 3 Electrical Installation', awarding: 'City & Guilds' },
      { value: 'cg_2365_l2', label: 'City & Guilds 2365 Level 2', awarding: 'City & Guilds' },
      { value: 'cg_2365_l3', label: 'City & Guilds 2365 Level 3', awarding: 'City & Guilds' },
      { value: 'am2', label: 'AM2 Assessment', awarding: 'JIB/NET' },
      { value: 'eal_diploma', label: 'EAL Level 3 Diploma', awarding: 'EAL' },
      { value: 'eal_level_2', label: 'EAL Level 2 Diploma in Electrical Installation', awarding: 'EAL' },
      { value: 'eal_level_2_et', label: 'EAL Level 2 Certificate in Electrotechnical Technology', awarding: 'EAL' },
      { value: 'eal_level_3_et', label: 'EAL Level 3 Certificate in Electrotechnical Technology', awarding: 'EAL' },
    ]
  },
  testing: {
    label: 'Testing & Inspection',
    icon: 'ClipboardCheck',
    items: [
      { value: '2391_52', label: '2391-52 Initial & Periodic Inspection', awarding: 'City & Guilds' },
      { value: '2391_51', label: '2391-51 Initial Verification', awarding: 'City & Guilds' },
      { value: '2394', label: '2394 Periodic Inspection & Testing', awarding: 'City & Guilds' },
      { value: '2395', label: '2395 Initial Verification', awarding: 'City & Guilds' },
      { value: 'pat_testing', label: 'PAT Testing Qualification', awarding: 'Various' },
      { value: 'eal_inspection_testing', label: 'EAL Level 3 Certificate in Inspection, Testing & Certification', awarding: 'EAL' },
      { value: 'eal_initial_verification', label: 'EAL Level 3 Award in Initial Verification', awarding: 'EAL' },
    ]
  },
  regulations: {
    label: 'Regulations',
    icon: 'BookOpen',
    items: [
      { value: '18th_edition', label: '18th Edition (BS 7671)', awarding: 'City & Guilds', hasExpiry: true, expiryYears: 5 },
      { value: 'part_p', label: 'Part P Building Regulations', awarding: 'Various' },
      { value: 'cg_2382', label: 'City & Guilds 2382', awarding: 'City & Guilds', hasExpiry: true, expiryYears: 5 },
      { value: 'eal_18th_edition', label: 'EAL Level 3 Award in Requirements for Electrical Installations (BS 7671)', awarding: 'EAL', hasExpiry: true, expiryYears: 5 },
    ]
  },
  cards: {
    label: 'Industry Cards',
    icon: 'CreditCard',
    items: [
      { value: 'ecs_gold', label: 'ECS Gold Card', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 5 },
      { value: 'ecs_blue', label: 'ECS Blue Card', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 5 },
      { value: 'ecs_yellow', label: 'ECS Yellow Card', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 3 },
      { value: 'ecs_black', label: 'ECS Black Card', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 5 },
      { value: 'cscs_green', label: 'CSCS Green Card', awarding: 'CSCS', hasExpiry: true, expiryYears: 5 },
      { value: 'cscs_blue', label: 'CSCS Blue Card', awarding: 'CSCS', hasExpiry: true, expiryYears: 5 },
      { value: 'jib_grading', label: 'JIB Grading Card', awarding: 'JIB', hasExpiry: true, expiryYears: 5 },
    ]
  },
  specialist: {
    label: 'Specialist',
    icon: 'Shield',
    items: [
      { value: 'ipaf_3a', label: 'IPAF 3a (Static Vertical)', awarding: 'IPAF', hasExpiry: true, expiryYears: 5 },
      { value: 'ipaf_3b', label: 'IPAF 3b (Mobile Vertical)', awarding: 'IPAF', hasExpiry: true, expiryYears: 5 },
      { value: 'pasma', label: 'PASMA Tower Scaffold', awarding: 'PASMA', hasExpiry: true, expiryYears: 5 },
      { value: 'asbestos', label: 'Asbestos Awareness', awarding: 'Various', hasExpiry: true, expiryYears: 1 },
      { value: 'first_aid', label: 'First Aid at Work', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'confined_spaces', label: 'Confined Spaces', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'working_at_height', label: 'Working at Height', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
    ]
  },
  renewable: {
    label: 'Renewable Energy',
    icon: 'Zap',
    items: [
      { value: 'ev_charging', label: 'EV Charging Installation', awarding: 'City & Guilds/IMI' },
      { value: 'ev_2919', label: 'City & Guilds 2919 EV', awarding: 'City & Guilds' },
      { value: 'solar_pv', label: 'Solar PV Installation', awarding: 'MCS/Various' },
      { value: 'bess', label: 'Battery Storage (BESS)', awarding: 'Various' },
      { value: 'heat_pumps', label: 'Heat Pump Installation', awarding: 'Various' },
      { value: 'eal_ev_charging', label: 'EAL Level 3 Award in EV Charging Installation', awarding: 'EAL' },
    ]
  },
  fire_security: {
    label: 'Fire & Security',
    icon: 'Bell',
    items: [
      { value: 'fire_alarm', label: 'Fire Alarm Systems', awarding: 'Various' },
      { value: 'emergency_lighting', label: 'Emergency Lighting', awarding: 'Various' },
      { value: 'intruder_alarm', label: 'Intruder Alarm Systems', awarding: 'Various' },
      { value: 'cctv', label: 'CCTV Installation', awarding: 'Various' },
      { value: 'access_control', label: 'Access Control', awarding: 'Various' },
    ]
  },
};

export interface ECSCardType {
  value: string;
  label: string;
  color: string;
  description: string;
  category?: 'ECS' | 'CSCS' | 'Scheme' | 'Other';
}

export const ECS_CARD_TYPES: ECSCardType[] = [
  // ECS Cards
  { value: 'gold', label: 'ECS Gold Card', color: '#FFD700', description: 'Fully qualified with NVQ L3 and AM2', category: 'ECS' },
  { value: 'blue', label: 'ECS Blue Card', color: '#4169E1', description: 'Qualified electrical technician', category: 'ECS' },
  { value: 'yellow', label: 'ECS Yellow Card', color: '#FFD93D', description: 'Apprentice or trainee', category: 'ECS' },
  { value: 'white', label: 'ECS White Card', color: '#F5F5F5', description: 'Electrical labourer', category: 'ECS' },
  { value: 'green', label: 'ECS Green Card', color: '#228B22', description: 'Electricians mate', category: 'ECS' },
  { value: 'black', label: 'ECS Black Card', color: '#1A1A1A', description: 'Manager or supervisor', category: 'ECS' },
  { value: 'red', label: 'ECS Red Card', color: '#DC143C', description: 'Experienced without formal quals', category: 'ECS' },
  // CSCS Cards (Construction Skills Certification Scheme)
  { value: 'cscs_green', label: 'CSCS Green Card', color: '#00A651', description: 'Construction Site Operative', category: 'CSCS' },
  { value: 'cscs_blue', label: 'CSCS Blue Card', color: '#0066CC', description: 'Skilled Worker', category: 'CSCS' },
  { value: 'cscs_gold', label: 'CSCS Gold Card', color: '#D4AF37', description: 'Supervisory or Management', category: 'CSCS' },
  // Competent Person Schemes
  { value: 'niceic', label: 'NICEIC Registered', color: '#003087', description: 'NICEIC approved contractor', category: 'Scheme' },
  { value: 'napit', label: 'NAPIT Registered', color: '#E31837', description: 'NAPIT approved contractor', category: 'Scheme' },
  { value: 'elecsa', label: 'ELECSA Registered', color: '#1E3A8A', description: 'ELECSA approved contractor', category: 'Scheme' },
  { value: 'stroma', label: 'Stroma Registered', color: '#00B388', description: 'Stroma certification scheme', category: 'Scheme' },
  // Other / None
  { value: 'none', label: 'No card yet', color: '#6B7280', description: 'Not currently registered', category: 'Other' },
];

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'Basic understanding, requires supervision' },
  { value: 'intermediate', label: 'Intermediate', description: 'Works independently on standard tasks' },
  { value: 'advanced', label: 'Advanced', description: 'Handles complex tasks, can mentor' },
  { value: 'expert', label: 'Expert', description: 'Industry leader, specialist knowledge' },
] as const;

export type SkillLevel = typeof SKILL_LEVELS[number]['value'];

export const UK_ELECTRICAL_SKILLS = {
  installation: {
    label: 'Installation',
    skills: ['Domestic Installation', 'Commercial Installation', 'Industrial Installation', 
             'Consumer Units', 'Distribution Boards', 'Cable Installation', 'Containment Systems',
             'Lighting Systems', 'Socket Circuits', 'Three-Phase Systems']
  },
  testing: {
    label: 'Testing & Inspection',
    skills: ['Initial Verification', 'Periodic Inspection', 'Fault Finding', 
             'Continuity Testing', 'Insulation Resistance', 'Earth Loop Impedance',
             'RCD Testing', 'Polarity Testing', 'PAT Testing']
  },
  specialist: {
    label: 'Specialist Systems',
    skills: ['Fire Alarm Systems', 'Emergency Lighting', 'Intruder Alarms',
             'CCTV Systems', 'Access Control', 'Data & Comms', 'Smart Home',
             'BMS Systems', 'Motor Control', 'PLC Programming']
  },
  renewable: {
    label: 'Renewable & Green',
    skills: ['EV Charging', 'Solar PV', 'Battery Storage', 'Heat Pump Wiring',
             'Smart Meters', 'Energy Monitoring']
  },
};

// Helper functions
export const getAllQualifications = (): QualificationItem[] => {
  return Object.values(UK_QUALIFICATIONS).flatMap(category => category.items);
};

export const getAllSkills = (): string[] => {
  return Object.values(UK_ELECTRICAL_SKILLS).flatMap(category => category.skills);
};

export const getJobTitleLabel = (value: string): string => {
  const title = UK_JOB_TITLES.find(t => t.value === value);
  return title?.label || value;
};

export const getQualificationLabel = (value: string): string => {
  const qual = getAllQualifications().find(q => q.value === value);
  return qual?.label || value;
};

export const getECSCardType = (value: string): ECSCardType | undefined => {
  return ECS_CARD_TYPES.find(c => c.value === value);
};
