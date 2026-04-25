/**
 * Inspector Qualifications — single source of truth (ELE-850)
 *
 * Used by:
 *  - Settings → Inspector Sheet (saving the inspector's qualifications)
 *  - EICR Inspector Details (cert form chips)
 *  - EIC Declarations — Designer / Constructor / Inspector chips
 *
 * The awarding-body-neutral entries (Level 3 Award in I&T (any awarding body)
 * etc.) exist for installers who hold LCL, PAA/VTCT, NOCN, or equivalent
 * qualifications and do NOT hold the specific City & Guilds 2391-xx number.
 * Misrepresenting a specific qualification on a signed statutory document is a
 * legal risk.
 */
export const INSPECTOR_QUALIFICATIONS: readonly string[] = [
  '18th Edition BS7671',
  'City & Guilds 2365 Level 2',
  'City & Guilds 2365 Level 3',
  'City & Guilds 2330 Level 2',
  'City & Guilds 2330 Level 3',
  'NVQ Level 3 Electrical Installation',
  'AM2 Assessment',
  // ELE-850 — Awarding-body-neutral Level 3 I&T options
  'Level 3 Award in Inspection & Testing (any awarding body)',
  'Level 3 Award in Initial Verification & Certification (any awarding body)',
  'Level 3 Award in Periodic Inspection, Testing & Certification (any awarding body)',
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'City & Guilds 2394/2395',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 3 Initial Verification',
  'EAL Level 3 Periodic Inspection',
  'LCL Level 3 Inspection & Testing',
  'PAA/VTCT Level 3 Inspection & Testing',
  'NOCN Level 3 Inspection & Testing',
  'City & Guilds 2377 PAT Testing',
  'PAT Testing Certified',
  'NICEIC Approved',
  'NICEIC Domestic Installer',
  'NAPIT Registered',
  'ELECSA Registered',
  'ECA Member',
  'SELECT Member',
  'JIB Approved',
  'JIB Graded Electrician',
  'CompEx Certified',
  'EV Charging Installation',
  'Solar PV Installation',
  'Battery Storage Installation',
  'Fire Alarm (BS 5839)',
  'Emergency Lighting (BS 5266)',
  'Data & Fibre Installation',
];
