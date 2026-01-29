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
      // City & Guilds
      { value: 'nvq_level_2', label: 'NVQ Level 2 Electrical Installation', awarding: 'City & Guilds' },
      { value: 'nvq_level_3', label: 'NVQ Level 3 Electrical Installation', awarding: 'City & Guilds' },
      { value: 'cg_2365_l2', label: 'City & Guilds 2365 Level 2', awarding: 'City & Guilds' },
      { value: 'cg_2365_l3', label: 'City & Guilds 2365 Level 3', awarding: 'City & Guilds' },
      { value: 'cg_2330_l2', label: 'City & Guilds 2330 Level 2 Theory', awarding: 'City & Guilds' },
      { value: 'cg_2330_l3', label: 'City & Guilds 2330 Level 3 Theory', awarding: 'City & Guilds' },
      { value: 'cg_5357_l2', label: 'City & Guilds 5357 Level 2 Diploma', awarding: 'City & Guilds' },
      { value: 'cg_5357_l3', label: 'City & Guilds 5357 Level 3 Diploma', awarding: 'City & Guilds' },
      // Assessment
      { value: 'am2', label: 'AM2 Assessment', awarding: 'JIB/NET' },
      { value: 'am2s', label: 'AM2S Assessment (Scotland)', awarding: 'SELECT' },
      // EAL
      { value: 'eal_diploma', label: 'EAL Level 3 Diploma', awarding: 'EAL' },
      { value: 'eal_level_2', label: 'EAL Level 2 Diploma in Electrical Installation', awarding: 'EAL' },
      { value: 'eal_level_2_et', label: 'EAL Level 2 Certificate in Electrotechnical Technology', awarding: 'EAL' },
      { value: 'eal_level_3_et', label: 'EAL Level 3 Certificate in Electrotechnical Technology', awarding: 'EAL' },
      { value: 'eal_level_3_diploma', label: 'EAL Level 3 Diploma in Electrical Installation', awarding: 'EAL' },
      { value: 'eal_domestic', label: 'EAL Level 2 Award in Domestic Electrical Installation', awarding: 'EAL' },
      // Other
      { value: 'btec_level_3', label: 'BTEC Level 3 National Diploma in Electrical Installation', awarding: 'Pearson' },
      { value: 'hnd_electrical', label: 'HND Electrical & Electronic Engineering', awarding: 'Various' },
      { value: 'degree_electrical', label: 'BSc/BEng Electrical Engineering', awarding: 'University' },
    ]
  },
  testing: {
    label: 'Inspection & Testing',
    icon: 'ClipboardCheck',
    items: [
      // City & Guilds
      { value: '2391_52', label: '2391-52 Initial & Periodic Inspection', awarding: 'City & Guilds' },
      { value: '2391_51', label: '2391-51 Initial Verification', awarding: 'City & Guilds' },
      { value: '2394', label: '2394 Periodic Inspection & Testing', awarding: 'City & Guilds' },
      { value: '2395', label: '2395 Initial Verification', awarding: 'City & Guilds' },
      { value: '2391_50', label: '2391-50 Periodic Inspection', awarding: 'City & Guilds' },
      // PAT
      { value: 'pat_testing', label: 'PAT Testing Qualification', awarding: 'Various' },
      { value: 'cg_2377', label: 'City & Guilds 2377 PAT Testing', awarding: 'City & Guilds' },
      // EAL
      { value: 'eal_inspection_testing', label: 'EAL Level 3 Certificate in Inspection, Testing & Certification', awarding: 'EAL' },
      { value: 'eal_initial_verification', label: 'EAL Level 3 Award in Initial Verification', awarding: 'EAL' },
      { value: 'eal_periodic_testing', label: 'EAL Level 3 Award in Periodic Inspection & Testing', awarding: 'EAL' },
      // Specialist Testing
      { value: 'thermal_imaging', label: 'Thermal Imaging Level 1', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'thermal_imaging_l2', label: 'Thermal Imaging Level 2', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
    ]
  },
  regulations: {
    label: 'Regulations',
    icon: 'BookOpen',
    items: [
      // 18th Edition
      { value: '18th_edition', label: '18th Edition (BS 7671:2018+A2:2022)', awarding: 'City & Guilds', hasExpiry: true, expiryYears: 5 },
      { value: 'cg_2382_22', label: 'City & Guilds 2382-22 (18th Edition)', awarding: 'City & Guilds', hasExpiry: true, expiryYears: 5 },
      { value: 'eal_18th_edition', label: 'EAL Level 3 Award in BS 7671:2018+A2:2022', awarding: 'EAL', hasExpiry: true, expiryYears: 5 },
      // Building Regs
      { value: 'part_p', label: 'Part P Building Regulations', awarding: 'Various' },
      { value: 'part_l', label: 'Part L Building Regulations (Energy)', awarding: 'Various' },
      // Design
      { value: 'cg_2396', label: 'City & Guilds 2396 Design & Verification', awarding: 'City & Guilds' },
      { value: 'eal_design_verification', label: 'EAL Level 4 Award in Design & Verification', awarding: 'EAL' },
    ]
  },
  cards: {
    label: 'Industry Cards',
    icon: 'CreditCard',
    items: [
      // ECS Cards
      { value: 'ecs_gold', label: 'ECS Gold Card (Approved Electrician)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 5 },
      { value: 'ecs_blue', label: 'ECS Blue Card (Electrician)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 5 },
      { value: 'ecs_yellow', label: 'ECS Yellow Card (Apprentice)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 3 },
      { value: 'ecs_white', label: 'ECS White Card (Electrical Labourer)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 3 },
      { value: 'ecs_green', label: 'ECS Green Card (Electrician\'s Mate)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 3 },
      { value: 'ecs_black', label: 'ECS Black Card (Manager/Supervisor)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 5 },
      { value: 'ecs_red', label: 'ECS Red Card (Experienced Worker)', awarding: 'JIB/ECS', hasExpiry: true, expiryYears: 3 },
      // CSCS
      { value: 'cscs_green', label: 'CSCS Green Card', awarding: 'CSCS', hasExpiry: true, expiryYears: 5 },
      { value: 'cscs_blue', label: 'CSCS Blue Card', awarding: 'CSCS', hasExpiry: true, expiryYears: 5 },
      { value: 'cscs_gold', label: 'CSCS Gold Card', awarding: 'CSCS', hasExpiry: true, expiryYears: 5 },
      // JIB
      { value: 'jib_grading', label: 'JIB Grading Card', awarding: 'JIB', hasExpiry: true, expiryYears: 5 },
    ]
  },
  specialist: {
    label: 'Health & Safety',
    icon: 'Shield',
    items: [
      // Access equipment
      { value: 'ipaf_3a', label: 'IPAF 3a (Static Vertical)', awarding: 'IPAF', hasExpiry: true, expiryYears: 5 },
      { value: 'ipaf_3b', label: 'IPAF 3b (Mobile Vertical)', awarding: 'IPAF', hasExpiry: true, expiryYears: 5 },
      { value: 'ipaf_1b', label: 'IPAF 1b (Static Boom)', awarding: 'IPAF', hasExpiry: true, expiryYears: 5 },
      { value: 'pasma', label: 'PASMA Tower Scaffold', awarding: 'PASMA', hasExpiry: true, expiryYears: 5 },
      { value: 'pasma_towers', label: 'PASMA Towers for Users', awarding: 'PASMA', hasExpiry: true, expiryYears: 5 },
      // Safety
      { value: 'asbestos', label: 'Asbestos Awareness (Cat A)', awarding: 'Various', hasExpiry: true, expiryYears: 1 },
      { value: 'asbestos_cat_b', label: 'Asbestos Cat B (Non-Licensed)', awarding: 'Various', hasExpiry: true, expiryYears: 1 },
      { value: 'first_aid', label: 'First Aid at Work', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'first_aid_emergency', label: 'Emergency First Aid at Work', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'confined_spaces', label: 'Confined Spaces Entry', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'confined_spaces_rescue', label: 'Confined Spaces Rescue', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'working_at_height', label: 'Working at Height', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'manual_handling', label: 'Manual Handling', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'coshh', label: 'COSHH Awareness', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      // Site Safety
      { value: 'smsts', label: 'SMSTS (Site Management Safety)', awarding: 'CITB', hasExpiry: true, expiryYears: 5 },
      { value: 'sssts', label: 'SSSTS (Site Supervisor Safety)', awarding: 'CITB', hasExpiry: true, expiryYears: 5 },
      { value: 'health_safety_env', label: 'Health, Safety & Environment Test', awarding: 'CITB', hasExpiry: true, expiryYears: 2 },
    ]
  },
  renewable: {
    label: 'Renewable Energy',
    icon: 'Zap',
    items: [
      // EV Charging
      { value: 'ev_charging', label: 'EV Charging Equipment Installation', awarding: 'City & Guilds/IMI' },
      { value: 'ev_2919', label: 'City & Guilds 2919 EV Charging', awarding: 'City & Guilds' },
      { value: 'eal_ev_charging', label: 'EAL Level 3 Award in EV Charging Installation', awarding: 'EAL' },
      { value: 'imi_ev', label: 'IMI Level 3 EV Charging Installation', awarding: 'IMI' },
      // Solar
      { value: 'solar_pv', label: 'Solar PV Installation', awarding: 'MCS/Various' },
      { value: 'solar_pv_design', label: 'Solar PV System Design', awarding: 'Various' },
      { value: 'mcs_pv', label: 'MCS Solar PV Installation', awarding: 'MCS' },
      // Battery Storage
      { value: 'bess', label: 'Battery Energy Storage Systems (BESS)', awarding: 'Various' },
      { value: 'bess_domestic', label: 'Domestic Battery Storage Installation', awarding: 'Various' },
      { value: 'bess_commercial', label: 'Commercial Battery Storage', awarding: 'Various' },
      // Heat Pumps
      { value: 'heat_pumps', label: 'Heat Pump Installation (Electrical)', awarding: 'Various' },
      { value: 'ashp', label: 'Air Source Heat Pump Installation', awarding: 'Various' },
      { value: 'gshp', label: 'Ground Source Heat Pump Installation', awarding: 'Various' },
      // Smart Home
      { value: 'eal_smart_home', label: 'EAL Level 3 Award in Smart Home Technology', awarding: 'EAL' },
      { value: 'smart_home_systems', label: 'Smart Home Systems Installation', awarding: 'Various' },
    ]
  },
  fire_security: {
    label: 'Fire & Security',
    icon: 'Bell',
    items: [
      // Fire Alarm
      { value: 'fire_alarm', label: 'Fire Alarm Systems Installation', awarding: 'Various' },
      { value: 'fire_alarm_design', label: 'Fire Alarm System Design (BS 5839)', awarding: 'FIA' },
      { value: 'fia_foundation', label: 'FIA Foundation in Fire Detection & Alarm', awarding: 'FIA' },
      { value: 'fia_level_3', label: 'FIA Level 3 Fire Alarm Systems', awarding: 'FIA' },
      // Emergency Lighting
      { value: 'emergency_lighting', label: 'Emergency Lighting Installation', awarding: 'Various' },
      { value: 'emergency_lighting_design', label: 'Emergency Lighting Design (BS 5266)', awarding: 'Various' },
      // Security
      { value: 'intruder_alarm', label: 'Intruder Alarm Systems', awarding: 'Various' },
      { value: 'sia_cctv', label: 'SIA CCTV Operative', awarding: 'SIA', hasExpiry: true, expiryYears: 3 },
      { value: 'cctv', label: 'CCTV Installation', awarding: 'Various' },
      { value: 'access_control', label: 'Access Control Systems', awarding: 'Various' },
      { value: 'door_entry', label: 'Door Entry Systems', awarding: 'Various' },
      // Data
      { value: 'data_cabling', label: 'Data & Comms Cabling', awarding: 'Various' },
      { value: 'fibre_optic', label: 'Fibre Optic Installation', awarding: 'Various' },
    ]
  },
  data_comms: {
    label: 'Data & Communications',
    icon: 'Network',
    items: [
      { value: 'cat5e_6', label: 'Cat5e/Cat6 Cabling Installation', awarding: 'Various' },
      { value: 'cat6a_7', label: 'Cat6a/Cat7 Cabling Installation', awarding: 'Various' },
      { value: 'fibre_optic', label: 'Fibre Optic Cable Installation', awarding: 'Various' },
      { value: 'fibre_termination', label: 'Fibre Optic Termination & Splicing', awarding: 'Various' },
      { value: 'network_testing', label: 'Network Cable Testing & Certification', awarding: 'Fluke/Various' },
      { value: 'wifi_installation', label: 'WiFi System Installation', awarding: 'Various' },
      { value: 'cctv_ip', label: 'IP CCTV Systems', awarding: 'Various' },
      { value: 'av_systems', label: 'Audio Visual Systems', awarding: 'Various' },
    ]
  },
  industrial: {
    label: 'Industrial & Controls',
    icon: 'Factory',
    items: [
      { value: 'plc_programming', label: 'PLC Programming', awarding: 'Various' },
      { value: 'siemens_plc', label: 'Siemens PLC Programming', awarding: 'Siemens' },
      { value: 'allen_bradley', label: 'Allen-Bradley PLC Programming', awarding: 'Rockwell' },
      { value: 'hmi_scada', label: 'HMI/SCADA Systems', awarding: 'Various' },
      { value: 'motor_control', label: 'Motor Control & Drives', awarding: 'Various' },
      { value: 'vsd_vfd', label: 'Variable Speed/Frequency Drives', awarding: 'Various' },
      { value: 'bms_systems', label: 'Building Management Systems', awarding: 'Various' },
      { value: 'hvac_controls', label: 'HVAC Control Systems', awarding: 'Various' },
      { value: 'high_voltage', label: 'High Voltage Switching (HV Authorised)', awarding: 'Various', hasExpiry: true, expiryYears: 3 },
      { value: 'hv_jointing', label: 'HV Cable Jointing', awarding: 'Various' },
      { value: 'compex', label: 'CompEx (Hazardous Areas)', awarding: 'JTL/CompEx', hasExpiry: true, expiryYears: 5 },
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
  { value: 'beginner', label: 'Beginner', description: 'Learning the basics, requires supervision', icon: 'seedling' },
  { value: 'intermediate', label: 'Intermediate', description: 'Works independently on standard tasks', icon: 'sprout' },
  { value: 'advanced', label: 'Advanced', description: 'Handles complex work, can mentor others', icon: 'tree' },
  { value: 'expert', label: 'Expert', description: 'Industry leader, specialist knowledge', icon: 'crown' },
] as const;

export type SkillLevel = typeof SKILL_LEVELS[number]['value'];

export const UK_ELECTRICAL_SKILLS = {
  installation: {
    label: 'Installation',
    icon: 'plug',
    color: 'yellow',
    skills: [
      'Domestic Installation',
      'Commercial Installation',
      'Industrial Installation',
      'Consumer Unit Installation',
      'Distribution Board Installation',
      'Main Switchboard Installation',
      'Cable Installation & Management',
      'Containment Systems (Trunking/Tray)',
      'Conduit Installation',
      'SWA Cable Installation',
      'MICC Cable Installation',
      'Lighting Systems',
      'Socket & Final Circuit Installation',
      'Three-Phase Systems',
      'Single-Phase Systems',
      'Busbar Trunking',
      'Rising Mains',
      'Outdoor Wiring',
      'Garden & Landscape Lighting',
      'Bathroom Installations (Special Locations)',
      'Kitchen Wiring',
      'Garage & Outbuilding Wiring',
      'New Build Electrical Installation',
      'Rewiring & Upgrades',
      'Additions & Alterations',
    ]
  },
  testing: {
    label: 'Inspection & Testing',
    icon: 'clipboard-check',
    color: 'blue',
    skills: [
      'Initial Verification (IVR)',
      'Periodic Inspection (EICR)',
      'Fault Finding & Diagnosis',
      'Continuity Testing (R1+R2)',
      'Insulation Resistance Testing',
      'Earth Loop Impedance (Zs)',
      'External Loop Impedance (Ze)',
      'Prospective Fault Current (PFC)',
      'RCD Testing (Time & Trip)',
      'Polarity Testing',
      'PAT Testing',
      'Earth Electrode Testing',
      'Ring Final Circuit Testing',
      'Radial Circuit Testing',
      'Multi-Meter Proficiency',
      'Thermal Imaging',
      'Power Quality Analysis',
      'Harmonic Analysis',
      'Certificate Completion (EIC/EICR)',
      'Minor Works Certification',
      'Non-Compliance Reporting',
    ]
  },
  specialist: {
    label: 'Specialist Systems',
    icon: 'shield',
    color: 'purple',
    skills: [
      'Fire Alarm Systems (BS 5839)',
      'Emergency Lighting (BS 5266)',
      'Intruder Alarm Systems',
      'CCTV & Surveillance Systems',
      'Access Control Systems',
      'Door Entry Systems',
      'Nurse Call Systems',
      'Disabled Refuge Systems',
      'Public Address Systems',
      'Audio Visual Installation',
      'Structured Cabling (Cat5e/Cat6/Cat6a)',
      'Fibre Optic Installation',
      'Network Cabinet Installation',
      'Smart Home Systems',
      'KNX Building Automation',
      'BMS Systems',
      'HVAC Controls',
      'Lighting Control Systems (DALI)',
      'Motor Control Centres',
      'Variable Speed Drives (VSD)',
      'Soft Starters',
      'PLC Programming',
      'Industrial Control Panels',
      'Hazardous Area Installations (ATEX)',
      'Clean Room Installations',
    ]
  },
  renewable: {
    label: 'Renewable & Green Energy',
    icon: 'leaf',
    color: 'green',
    skills: [
      'EV Charging Installation (OZEV)',
      'EV Charger Commissioning',
      'Solar PV Installation',
      'Solar PV System Design',
      'Battery Storage Systems',
      'Hybrid Inverters',
      'Grid-Tied Systems',
      'Off-Grid Systems',
      'Heat Pump Electrical Connections',
      'Air Source Heat Pump Wiring',
      'Ground Source Heat Pump Wiring',
      'Smart Meter Installation',
      'Energy Monitoring Systems',
      'Power Factor Correction',
      'LED Lighting Upgrades',
      'Energy Efficiency Audits',
      'Micro-Generation (MCS)',
      'Wind Turbine Connections',
      'G98/G99 Grid Connection',
    ]
  },
  maintenance: {
    label: 'Maintenance & Repair',
    icon: 'wrench',
    color: 'orange',
    skills: [
      'Reactive Maintenance',
      'Planned Preventative Maintenance (PPM)',
      'Breakdown Repairs',
      'Emergency Call-Outs',
      'Lighting Maintenance',
      'Distribution Board Maintenance',
      'Switchgear Maintenance',
      'Motor Maintenance',
      'Generator Maintenance',
      'UPS System Maintenance',
      'Air Conditioning Electrical Maintenance',
      'Heating System Electrical Repairs',
      'Commercial Kitchen Equipment',
      'Industrial Machinery Repairs',
      'Building Services Maintenance',
    ]
  },
  design: {
    label: 'Design & Planning',
    icon: 'pencil-ruler',
    color: 'cyan',
    skills: [
      'Electrical System Design',
      'Load Calculations (BS 7671)',
      'Cable Sizing & Selection',
      'Protection Coordination',
      'Discrimination Studies',
      'Short Circuit Calculations',
      'Voltage Drop Calculations',
      'Single Line Diagrams',
      'Schematic Drawings',
      'As-Built Documentation',
      'AutoCAD Electrical',
      'Amtech/Trimble',
      'DIALux Lighting Design',
      'Relux Lighting Design',
      'Specification Writing',
      'Bill of Materials (BOM)',
      'Project Estimation',
      'Method Statements',
      'Risk Assessments',
    ]
  },
  safety: {
    label: 'Health & Safety',
    icon: 'hard-hat',
    color: 'red',
    skills: [
      'Safe Isolation Procedures',
      'Permit to Work Systems',
      'Lock Out Tag Out (LOTO)',
      'Working at Height',
      'Confined Space Entry',
      'Asbestos Awareness',
      'Manual Handling',
      'First Aid at Work',
      'Fire Safety Awareness',
      'CDM Regulations',
      'Site Safety Management',
      'Toolbox Talks',
      'RAMS Writing',
      'Incident Reporting',
      'PPE Selection & Use',
    ]
  },
  software: {
    label: 'Software & Digital',
    icon: 'laptop',
    color: 'indigo',
    skills: [
      'Certifications Software (Certsure/NICEIC)',
      'Socket & See Certification',
      'Megger ProInstall',
      'Regs4Sparks',
      'Electrical OM (Trimble)',
      'On-Screen Takeoff',
      'Bluebeam Revu',
      'Microsoft Office/365',
      'Project Management Software',
      'Building Information Modelling (BIM)',
      'Smart Device Configuration',
      'Network Configuration',
      'Commissioning Software',
    ]
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
