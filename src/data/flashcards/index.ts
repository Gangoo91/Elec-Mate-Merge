import type { FlashcardData, FlashcardSetMeta } from './types';
import { cableColours } from './cableColours';
import { bs7671Regulations } from './bs7671Regulations';
import { eicrCodes } from './eicrCodes';
import { safeIsolation } from './safeIsolation';
import { testInstruments } from './testInstruments';
import { faultFinding } from './faultFinding';
import { earthingAndBonding } from './earthingAndBonding';
import { circuitProtection } from './circuitProtection';
import { wiringSystems } from './wiringSystems';
import { electricalScience } from './electricalScience';
import { firstAndSecondFix } from './firstAndSecondFix';
import { environmentalTech } from './environmentalTech';
// Level 2 new sets
import { healthAndSafety } from './healthAndSafety';
import { cableSelection } from './cableSelection';
import { diversityAndDemand } from './diversityAndDemand';
import { toolsAndEquipment } from './toolsAndEquipment';
import { partPRegs } from './partPRegs';
import { containmentCalcs } from './containmentCalcs';
import { documentationForms } from './documentationForms';
import { formulaeBasic } from './formulaeBasic';
// Level 3 new sets
import { designVerification } from './designVerification';
import { motorControl } from './motorControl';
import { lightingDesign } from './lightingDesign';
import { fireAlarmSystems } from './fireAlarmSystems';
import { commsAndData } from './commsAndData';
import { electricalMachines } from './electricalMachines';
import { advancedInspection } from './advancedInspection';
import { solarPvDesign } from './solarPvDesign';

export type { FlashcardData, FlashcardSetMeta, FlashcardLevel } from './types';

/** Card data keyed by set ID — used by FlashcardStudySession */
export const flashcardSets: Record<string, FlashcardData[]> = {
  'cable-colors': cableColours,
  'bs7671-regulations': bs7671Regulations,
  'eicr-codes': eicrCodes,
  'safe-isolation': safeIsolation,
  'test-instruments': testInstruments,
  'fault-finding': faultFinding,
  'earthing-bonding': earthingAndBonding,
  'circuit-protection': circuitProtection,
  'wiring-systems': wiringSystems,
  'electrical-science': electricalScience,
  'first-second-fix': firstAndSecondFix,
  'environmental-tech': environmentalTech,
  // Level 2 new sets
  'health-safety': healthAndSafety,
  'cable-selection': cableSelection,
  'diversity-demand': diversityAndDemand,
  'tools-equipment': toolsAndEquipment,
  'part-p-regs': partPRegs,
  'containment-calcs': containmentCalcs,
  'documentation-forms': documentationForms,
  'formulae-basic': formulaeBasic,
  // Level 3 new sets
  'design-verification': designVerification,
  'motor-control': motorControl,
  'lighting-design': lightingDesign,
  'fire-alarm-systems': fireAlarmSystems,
  'comms-data': commsAndData,
  'electrical-machines': electricalMachines,
  'advanced-inspection': advancedInspection,
  'solar-pv-design': solarPvDesign,
};

/** Full metadata for each flashcard set — used by the hub page and filtering */
export const flashcardSetDefinitions: FlashcardSetMeta[] = [
  // ── Original 12 sets ────────────────────────────────────────────
  {
    id: 'cable-colors',
    title: 'Cable Colours & Identification',
    iconName: 'Target',
    description: 'Learn UK cable colour codes and identification standards',
    count: 25,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Basic Theory',
    level: 'Both',
  },
  {
    id: 'bs7671-regulations',
    title: 'BS 7671 Key Regulations',
    iconName: 'BookOpen',
    description: 'Essential BS 7671 regulations every apprentice should know',
    count: 28,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Regulations',
    level: 'Both',
  },
  {
    id: 'eicr-codes',
    title: 'EICR Observation Codes',
    iconName: 'Brain',
    description: 'C1, C2, C3, FI codes and their meanings',
    count: 30,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Testing & Inspection',
    level: 'Level 3',
  },
  {
    id: 'safe-isolation',
    title: 'Safe Isolation Procedures',
    iconName: 'Shield',
    description: 'Step-by-step safe isolation and proving dead procedures',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Safety',
    level: 'Both',
  },
  {
    id: 'test-instruments',
    title: 'Test Instruments & Equipment',
    iconName: 'Zap',
    description: 'Common electrical testing equipment and their uses',
    count: 30,
    difficulty: 'beginner',
    estimatedTime: '18 mins',
    category: 'Testing & Inspection',
    level: 'Both',
  },
  {
    id: 'fault-finding',
    title: 'Common Electrical Faults',
    iconName: 'Target',
    description: 'Identifying and understanding common electrical faults',
    count: 35,
    difficulty: 'advanced',
    estimatedTime: '20 mins',
    category: 'Testing & Inspection',
    level: 'Level 3',
  },
  {
    id: 'earthing-bonding',
    title: 'Earthing & Bonding',
    iconName: 'Cable',
    description: 'TN-S, TN-C-S, TT systems, MET, main and supplementary bonding',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Both',
  },
  {
    id: 'circuit-protection',
    title: 'Circuit Protection',
    iconName: 'ShieldCheck',
    description: 'MCBs, RCDs, RCBOs, fuses, discrimination and fault current',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Both',
  },
  {
    id: 'wiring-systems',
    title: 'Wiring Systems & Enclosures',
    iconName: 'Wrench',
    description: 'Trunking, conduit, SWA, MICC, cable tray, IP ratings and fixings',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Level 2',
  },
  {
    id: 'electrical-science',
    title: 'Electrical Science',
    iconName: 'Atom',
    description: "Ohm's law, power, energy, magnetism, AC theory and transformers",
    count: 25,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Basic Theory',
    level: 'Level 2',
  },
  {
    id: 'first-second-fix',
    title: 'First Fix & Second Fix',
    iconName: 'Hammer',
    description: 'Back boxes, cable routes, consumer unit install, termination and testing',
    count: 25,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Level 2',
  },
  {
    id: 'environmental-tech',
    title: 'Environmental Technology',
    iconName: 'Leaf',
    description: 'Solar PV, EV charging, heat pumps, battery storage and smart meters',
    count: 25,
    difficulty: 'advanced',
    estimatedTime: '15 mins',
    category: 'Green Technology',
    level: 'Level 3',
  },

  // ── Level 2 new sets ────────────────────────────────────────────
  {
    id: 'health-safety',
    title: 'Health & Safety Legislation',
    iconName: 'Shield',
    description: 'HASAWA 1974, CDM 2015, COSHH, RIDDOR and workplace safety law',
    count: 28,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Safety',
    level: 'Level 2',
  },
  {
    id: 'cable-selection',
    title: 'Cable Selection & Sizing',
    iconName: 'Cable',
    description: 'Current capacity, correction factors, voltage drop and cable types',
    count: 30,
    difficulty: 'intermediate',
    estimatedTime: '18 mins',
    category: 'Installation',
    level: 'Level 2',
  },
  {
    id: 'diversity-demand',
    title: 'Diversity & Maximum Demand',
    iconName: 'TrendingUp',
    description: 'Load assessment, diversity factors and supply capacity calculations',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Basic Theory',
    level: 'Level 2',
  },
  {
    id: 'tools-equipment',
    title: 'Tools & Equipment',
    iconName: 'Wrench',
    description: 'VDE tools, power tools, PPE, access equipment and tool safety',
    count: 25,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Level 2',
  },
  {
    id: 'part-p-regs',
    title: 'Building Regulations Part P',
    iconName: 'BookOpen',
    description: 'Notifiable work, competent person schemes and building control',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Regulations',
    level: 'Level 2',
  },
  {
    id: 'containment-calcs',
    title: 'Containment & Space Factors',
    iconName: 'Wrench',
    description: 'Trunking, conduit and cable tray sizing, space factors and fixings',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Level 2',
  },
  {
    id: 'documentation-forms',
    title: 'Electrical Documentation',
    iconName: 'BookOpen',
    description: 'EIC, MEIWC, EICR forms, test results and certification requirements',
    count: 28,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Testing & Inspection',
    level: 'Level 2',
  },
  {
    id: 'formulae-basic',
    title: 'Electrical Formulae',
    iconName: 'Atom',
    description: "Ohm's law, power, resistance, AC theory and practical calculations",
    count: 28,
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'Basic Theory',
    level: 'Level 2',
  },

  // ── Level 3 new sets ────────────────────────────────────────────
  {
    id: 'design-verification',
    title: 'Design & Verification',
    iconName: 'Target',
    description: 'Design process, initial verification, calculations and protective devices',
    count: 30,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Testing & Inspection',
    level: 'Level 3',
  },
  {
    id: 'motor-control',
    title: 'Motor Control Systems',
    iconName: 'Zap',
    description: 'Motor types, starting methods, control circuits and VFDs',
    count: 28,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Installation',
    level: 'Level 3',
  },
  {
    id: 'lighting-design',
    title: 'Lighting Design',
    iconName: 'Lightbulb',
    description: 'LED technology, lux levels, emergency lighting and controls',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Level 3',
  },
  {
    id: 'fire-alarm-systems',
    title: 'Fire Alarm Systems',
    iconName: 'Shield',
    description: 'BS 5839 system categories, detectors, wiring and commissioning',
    count: 28,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Safety',
    level: 'Level 3',
  },
  {
    id: 'comms-data',
    title: 'Communications & Data',
    iconName: 'Cable',
    description: 'Structured cabling, fibre optics, network basics and testing',
    count: 25,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    category: 'Installation',
    level: 'Level 3',
  },
  {
    id: 'electrical-machines',
    title: 'Electrical Machines',
    iconName: 'Atom',
    description: 'Transformers, DC machines, AC machines, efficiency and applications',
    count: 28,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Basic Theory',
    level: 'Level 3',
  },
  {
    id: 'advanced-inspection',
    title: 'Advanced Inspection & Testing',
    iconName: 'Target',
    description: 'Dead tests, live tests, EICR process and special locations',
    count: 30,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Testing & Inspection',
    level: 'Level 3',
  },
  {
    id: 'solar-pv-design',
    title: 'Solar PV Design',
    iconName: 'Leaf',
    description: 'PV fundamentals, system design, G98/G99 grid connection and A3:2024',
    count: 28,
    difficulty: 'advanced',
    estimatedTime: '18 mins',
    category: 'Green Technology',
    level: 'Level 3',
  },
];

/** Lightweight metadata for stats hooks that need to iterate over sets */
export const flashcardSetMeta = flashcardSetDefinitions.map((def) => ({
  id: def.id,
  title: def.title,
  count: def.count,
}));
