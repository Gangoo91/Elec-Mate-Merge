import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CheckItem {
  id: string;
  label: string;
  result: 'pass' | 'fail' | 'na';
  section?: string;
  notes?: string;
  photoUrl?: string;
}

export interface PreUseCheck {
  id: string;
  user_id: string;
  equipment_id: string | null;
  equipment_type: string;
  equipment_description: string | null;
  check_date: string;
  site_address: string | null;
  items: CheckItem[];
  overall_result: 'pass' | 'fail' | 'na';
  checked_by: string | null;
  signature: string | null;
  actions_required: string | null;
  requires_approval: boolean;
  approval_status: 'not_required' | 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_at: string | null;
  approval_comments: string | null;
  approval_signature: string | null;
  created_at: string;
}

export interface CheckTemplate {
  id: string;
  label: string;
  section?: string;
}

export const CHECK_TEMPLATES: Record<string, CheckTemplate[]> = {
  // LOLER 1998 + BS EN 131 + INDG 455
  ladder: [
    // Structure & Condition
    { id: 'l1', label: 'Stiles straight and undamaged — no bends, cracks or dents', section: 'Structure & Condition' },
    { id: 'l2', label: 'Rungs secure, evenly spaced and free from damage', section: 'Structure & Condition' },
    { id: 'l3', label: 'No cracks, splits, corrosion or excessive wear', section: 'Structure & Condition' },
    { id: 'l4', label: 'Locking mechanisms/hinges working correctly (stepladders)', section: 'Structure & Condition' },
    { id: 'l5', label: 'Extension mechanisms and locks functional (extending ladders)', section: 'Structure & Condition' },
    { id: 'l6', label: 'Not warped, twisted or distorted from heat/weather damage', section: 'Structure & Condition' },
    // Safety Features
    { id: 'l7', label: 'Feet/shoes present, in good condition and anti-slip', section: 'Safety Features' },
    { id: 'l8', label: 'Anti-slip devices at base functioning', section: 'Safety Features' },
    { id: 'l9', label: 'Tie-off point or stabiliser present for use above 3m', section: 'Safety Features' },
    // Compliance & Suitability
    { id: 'l10', label: 'Labels/rating plate visible — duty rating and classification legible', section: 'Compliance' },
    { id: 'l11', label: 'Inspection sticker/tag present and within date', section: 'Compliance' },
    { id: 'l12', label: 'Maximum safe working load not exceeded', section: 'Compliance' },
    { id: 'l13', label: 'Appropriate ladder type for the task (not used as scaffold substitute)', section: 'Compliance' },
    { id: 'l14', label: 'Clean and free from oil, grease or other contaminants', section: 'Compliance' },
    { id: 'l15', label: 'Correct angle of use — 75° (1-in-4 rule) for leaning ladders', section: 'Compliance' },
  ],
  // WAHR 2005 Reg 12 + NASC SG4:15 + TG20:13
  scaffold: [
    // Foundation & Base
    { id: 's1', label: 'Base plates secure on firm, level ground', section: 'Foundation & Base' },
    { id: 's2', label: 'Sole boards in place where required', section: 'Foundation & Base' },
    { id: 's3', label: 'Standards plumb and properly braced', section: 'Foundation & Base' },
    // Structure
    { id: 's4', label: 'Ledger and transom connections secure and tight', section: 'Structure' },
    { id: 's5', label: 'Couplers tight — no slipping or rotation', section: 'Structure' },
    { id: 's6', label: 'Ties/anchors at correct intervals (max 4m vertical, 6m horizontal)', section: 'Structure' },
    { id: 's7', label: 'Erected to TG20 compliance or has specific design drawing', section: 'Structure' },
    // Platform & Edge Protection
    { id: 's8', label: 'Platforms fully boarded with no gaps >25mm', section: 'Platform & Edge Protection' },
    { id: 's9', label: 'Handrails fitted at correct height (950mm minimum)', section: 'Platform & Edge Protection' },
    { id: 's10', label: 'Mid-rails fitted', section: 'Platform & Edge Protection' },
    { id: 's11', label: 'Toe boards fitted (minimum 150mm height)', section: 'Platform & Edge Protection' },
    { id: 's12', label: 'Brick guards fitted where materials stored on platform', section: 'Platform & Edge Protection' },
    { id: 's13', label: 'Gap between scaffold and building <300mm (or edge protected)', section: 'Platform & Edge Protection' },
    // Access
    { id: 's14', label: 'Safe access provided — internal ladder or stairway', section: 'Access' },
    { id: 's15', label: 'Access ladders properly secured and extending 1m above platform', section: 'Access' },
    { id: 's16', label: 'Loading bay properly constructed with gate', section: 'Access' },
    // Documentation & Compliance
    { id: 's17', label: 'Scaffold tag present, signed and within 7-day inspection date', section: 'Documentation' },
    { id: 's18', label: 'Scaffold inspection register present on site', section: 'Documentation' },
    { id: 's19', label: 'Inspected by CISRS competent person', section: 'Documentation' },
    { id: 's20', label: '"Do Not Use" signage procedure in place if failed', section: 'Documentation' },
  ],
  // PUWER 1998 + Electricity at Work Regulations 1989 + IET Code of Practice
  power_tool: [
    // Physical Condition
    { id: 'pt1', label: 'Casing undamaged — no cracks, holes or missing parts', section: 'Physical Condition' },
    { id: 'pt2', label: 'Cable/flex in good condition — no cuts, fraying or exposed conductors', section: 'Physical Condition' },
    { id: 'pt3', label: 'Plug pins not bent, loose or damaged', section: 'Physical Condition' },
    { id: 'pt4', label: 'Cable entry to tool and plug secure — no strain on connections', section: 'Physical Condition' },
    { id: 'pt5', label: 'Ventilation openings clear and unobstructed', section: 'Physical Condition' },
    // Safety Features
    { id: 'pt6', label: 'Guards and safety features operational and correctly fitted', section: 'Safety Features' },
    { id: 'pt7', label: 'Emergency stop/trigger lock-off functioning', section: 'Safety Features' },
    { id: 'pt8', label: 'Correct accessories and consumables fitted (blades, discs, bits)', section: 'Safety Features' },
    { id: 'pt9', label: 'Correct RPM rating of accessories for the tool', section: 'Safety Features' },
    { id: 'pt10', label: 'Dust extraction fitted where required (COSHH)', section: 'Safety Features' },
    // Electrical Safety & Compliance
    { id: 'pt11', label: 'PAT test label present and in date', section: 'Electrical Safety' },
    { id: 'pt12', label: 'Correct voltage for site use (110V CTE or battery preferred)', section: 'Electrical Safety' },
    { id: 'pt13', label: 'RCD protection in use if 230V on site', section: 'Electrical Safety' },
    { id: 'pt14', label: 'Operator trained and competent to use this specific tool', section: 'Electrical Safety' },
  ],
  // GS38 4th Ed + BS EN 61010 + BS 7671 Chapter 64
  test_instrument: [
    // Calibration & Certification
    { id: 'ti1', label: 'Calibration sticker present and within date', section: 'Calibration' },
    { id: 'ti2', label: 'Calibration certificate available if requested', section: 'Calibration' },
    { id: 'ti3', label: 'Self-test/zero check performed successfully', section: 'Calibration' },
    // Physical Condition
    { id: 'ti4', label: 'Instrument case undamaged — no cracks or exposed internals', section: 'Physical Condition' },
    { id: 'ti5', label: 'Display clear, readable and all segments functional', section: 'Physical Condition' },
    { id: 'ti6', label: 'Battery level adequate for intended tests', section: 'Physical Condition' },
    { id: 'ti7', label: 'Selector switch/buttons functioning correctly', section: 'Physical Condition' },
    // GS38 Test Lead Compliance
    { id: 'ti8', label: 'Test leads GS38 compliant — finger guards and shrouded', section: 'GS38 Compliance' },
    { id: 'ti9', label: 'Probes shrouded with maximum 4mm exposed tip (2mm for voltage detection)', section: 'GS38 Compliance' },
    { id: 'ti10', label: 'Lead fuses present and correct rating (typically 500mA HRC)', section: 'GS38 Compliance' },
    { id: 'ti11', label: 'Leads undamaged — no cracking, fraying or exposed conductors', section: 'GS38 Compliance' },
    { id: 'ti12', label: 'CAT rating appropriate for intended use (CAT III/IV for distribution)', section: 'GS38 Compliance' },
    // Functional Checks
    { id: 'ti13', label: 'Continuity range functional — test leads <1Ω resistance', section: 'Functional Checks' },
    { id: 'ti14', label: 'Insulation resistance range functional and correct test voltage available', section: 'Functional Checks' },
  ],
  // LOLER 1998 + PUWER 1998 + PASMA guidance + IPAF
  access_equipment: [
    // Structure & Condition
    { id: 'ae1', label: 'Structure sound — no visible damage, bends or corrosion', section: 'Structure & Condition' },
    { id: 'ae2', label: 'All components present — no missing braces, frames or rungs', section: 'Structure & Condition' },
    { id: 'ae3', label: 'Locking pins and clips secure and undamaged', section: 'Structure & Condition' },
    // Stability
    { id: 'ae4', label: 'On firm, level ground (spirit level check)', section: 'Stability' },
    { id: 'ae5', label: 'Castors/wheels in locked position', section: 'Stability' },
    { id: 'ae6', label: 'Outriggers/stabilisers correctly deployed and secured', section: 'Stability' },
    { id: 'ae7', label: 'Correct height-to-base ratio maintained (3:1 indoor, 2.5:1 outdoor)', section: 'Stability' },
    { id: 'ae8', label: 'Clear of overhead obstructions and power lines', section: 'Stability' },
    // Platform & Edge Protection
    { id: 'ae9', label: 'Guardrails fitted on all open sides', section: 'Platform & Safety' },
    { id: 'ae10', label: 'Platform secure and fully boarded', section: 'Platform & Safety' },
    { id: 'ae11', label: 'Trap door platforms closed when platform in use', section: 'Platform & Safety' },
    { id: 'ae12', label: 'Not overloaded — within duty rating for persons and materials', section: 'Platform & Safety' },
    // Compliance & Documentation
    { id: 'ae13', label: 'Erected by PASMA trained person (card verified)', section: 'Compliance' },
    { id: 'ae14', label: 'Erected per manufacturer instruction manual', section: 'Compliance' },
    { id: 'ae15', label: 'Inspection tag current and within date', section: 'Compliance' },
    { id: 'ae16', label: 'Wind speed acceptable (<17mph / 7.7m/s for standard towers)', section: 'Compliance' },
  ],
  // LOLER 1998 + WAHR 2005 + BS EN 361/355/362
  harness: [
    { id: 'h1', label: 'Webbing free from cuts, fraying, abrasion or chemical damage', section: 'Webbing & Stitching' },
    { id: 'h2', label: 'All stitching intact — no loose, broken or pulled threads', section: 'Webbing & Stitching' },
    { id: 'h3', label: 'No heat damage, discolouration or UV degradation', section: 'Webbing & Stitching' },
    { id: 'h4', label: 'D-rings and attachment points free from corrosion and distortion', section: 'Hardware' },
    { id: 'h5', label: 'Buckles and adjusters functioning correctly', section: 'Hardware' },
    { id: 'h6', label: 'Karabiners gate closing and locking properly', section: 'Hardware' },
    { id: 'h7', label: 'Lanyard / energy absorber free from damage', section: 'Lanyard' },
    { id: 'h8', label: 'Shock absorber pack sealed — not deployed', section: 'Lanyard' },
    { id: 'h9', label: 'Lanyard length appropriate for fall distance available', section: 'Lanyard' },
    { id: 'h10', label: 'Labels legible — manufacturer, model, serial, date of manufacture', section: 'Compliance' },
    { id: 'h11', label: 'Thorough examination (6-monthly) in date', section: 'Compliance' },
    { id: 'h12', label: 'Stored correctly — dry, ventilated, away from chemicals/UV', section: 'Compliance' },
  ],
  // PUWER 1998 + EAW 1989 + IET Code of Practice
  extension_lead: [
    { id: 'el1', label: 'Cable sheath undamaged — no cuts, splits or exposed conductors', section: 'Cable Condition' },
    { id: 'el2', label: 'No taped joints or repairs on cable', section: 'Cable Condition' },
    { id: 'el3', label: 'Cable not kinked, crushed or showing heat damage', section: 'Cable Condition' },
    { id: 'el4', label: 'Plug undamaged — pins straight, not burnt or loose', section: 'Connections' },
    { id: 'el5', label: 'Socket undamaged — no cracks, shutters operating', section: 'Connections' },
    { id: 'el6', label: 'Cable entry to plug and socket secure — no strain', section: 'Connections' },
    { id: 'el7', label: 'Earth continuity verified (green/yellow present)', section: 'Connections' },
    { id: 'el8', label: 'PAT test label present and in date', section: 'Electrical Safety' },
    { id: 'el9', label: 'Correct voltage rating for site use (110V CTE preferred)', section: 'Electrical Safety' },
    { id: 'el10', label: 'Cable reel fully unwound during use (thermal protection)', section: 'Electrical Safety' },
    { id: 'el11', label: 'RCD protection in use if 230V', section: 'Electrical Safety' },
    { id: 'el12', label: 'Cable length and rating appropriate for load', section: 'Electrical Safety' },
  ],
  // EAW 1989 Reg 12 + BS 7671 Reg 411.3.3 + BS EN 61008/61009
  portable_rcd: [
    { id: 'rcd1', label: 'Test button operates correctly — trips on press', section: 'Functional Test' },
    { id: 'rcd2', label: 'Reset button re-engages after trip', section: 'Functional Test' },
    { id: 'rcd3', label: 'Trip time within 40ms at rated residual current (30mA)', section: 'Functional Test' },
    { id: 'rcd4', label: 'Enclosure undamaged — no cracks or missing covers', section: 'Physical Condition' },
    { id: 'rcd5', label: 'Plug pins straight and undamaged', section: 'Physical Condition' },
    { id: 'rcd6', label: 'Socket outlet undamaged and shuttered', section: 'Physical Condition' },
    { id: 'rcd7', label: 'Lead/cable in good condition — no damage', section: 'Physical Condition' },
    { id: 'rcd8', label: 'Rating label legible (30mA, rated current)', section: 'Compliance' },
    { id: 'rcd9', label: 'PAT test label present and in date', section: 'Compliance' },
    { id: 'rcd10', label: 'Compatible with equipment to be protected', section: 'Compliance' },
  ],
  // PUWER 1998 + EAW 1989 + BS 7671 + BS 7430
  generator: [
    { id: 'gen1', label: 'Fuel level adequate — no leaks from tank or lines', section: 'Engine & Fuel' },
    { id: 'gen2', label: 'Oil level correct — no leaks', section: 'Engine & Fuel' },
    { id: 'gen3', label: 'Coolant level correct (liquid-cooled units)', section: 'Engine & Fuel' },
    { id: 'gen4', label: 'Air filter clean and correctly fitted', section: 'Engine & Fuel' },
    { id: 'gen5', label: 'Exhaust system secure — no leaks or damage', section: 'Engine & Fuel' },
    { id: 'gen6', label: 'Output voltage correct (110V CTE or 230V as specified)', section: 'Electrical' },
    { id: 'gen7', label: 'Earth connection present and secure (BS 7430)', section: 'Electrical' },
    { id: 'gen8', label: 'Circuit breakers operational — test trip and reset', section: 'Electrical' },
    { id: 'gen9', label: 'Output sockets undamaged and weatherproof', section: 'Electrical' },
    { id: 'gen10', label: 'PAT test label in date (if applicable)', section: 'Electrical' },
    { id: 'gen11', label: 'Emergency stop accessible and functional', section: 'Safety' },
    { id: 'gen12', label: 'Guards and covers in place — no exposed moving parts', section: 'Safety' },
    { id: 'gen13', label: 'Adequate ventilation — not in enclosed space', section: 'Safety' },
    { id: 'gen14', label: 'Operating manual available on site', section: 'Safety' },
  ],
  // RRO 2005 + BS 5306-3 + BS 5306-8
  fire_extinguisher: [
    { id: 'fe1', label: 'Pressure gauge in green zone (stored pressure type)', section: 'Condition' },
    { id: 'fe2', label: 'Safety pin present and sealed with tamper tag', section: 'Condition' },
    { id: 'fe3', label: 'Hose and nozzle undamaged and clear', section: 'Condition' },
    { id: 'fe4', label: 'Body free from damage, corrosion or dents', section: 'Condition' },
    { id: 'fe5', label: 'Operating instructions legible', section: 'Condition' },
    { id: 'fe6', label: 'Service label present and within annual service date', section: 'Compliance' },
    { id: 'fe7', label: 'Correct type for hazards present (water/foam/CO₂/powder/wet chemical)', section: 'Compliance' },
    { id: 'fe8', label: 'Mounted at correct height and accessible (not obstructed)', section: 'Compliance' },
    { id: 'fe9', label: 'Fire point signage visible', section: 'Compliance' },
    { id: 'fe10', label: 'Weight feels correct — not discharged or empty', section: 'Compliance' },
  ],
  // H&S First Aid Regs 1981 + BS 8599-1:2019
  first_aid_kit: [
    { id: 'fa1', label: 'Container clean, undamaged and closes properly', section: 'Container' },
    { id: 'fa2', label: 'Contents list present and readable', section: 'Container' },
    { id: 'fa3', label: 'HSE guidance leaflet included', section: 'Container' },
    { id: 'fa4', label: 'Location clearly signed with white cross on green background', section: 'Container' },
    { id: 'fa5', label: 'Assorted plasters (sterile, individually wrapped) — sufficient quantity', section: 'Contents' },
    { id: 'fa6', label: 'Eye pads (sterile) — minimum 2', section: 'Contents' },
    { id: 'fa7', label: 'Triangular bandages — minimum 2', section: 'Contents' },
    { id: 'fa8', label: 'Medium/large sterile dressings — sufficient quantity', section: 'Contents' },
    { id: 'fa9', label: 'Sterile cleansing wipes — sufficient quantity', section: 'Contents' },
    { id: 'fa10', label: 'Disposable gloves (nitrile) — minimum 3 pairs', section: 'Contents' },
    { id: 'fa11', label: 'Microporous tape present', section: 'Contents' },
    { id: 'fa12', label: 'All items within expiry date', section: 'Expiry & Replenishment' },
  ],
  // PPER 2022 + BS EN 397/20345/166/352/20471
  ppe: [
    { id: 'ppe1', label: 'Hard hat undamaged — no cracks, dents or UV degradation (BS EN 397)', section: 'Head Protection' },
    { id: 'ppe2', label: 'Hard hat within replacement date (typically 5 years from manufacture)', section: 'Head Protection' },
    { id: 'ppe3', label: 'Harness/cradle adjusted and secure', section: 'Head Protection' },
    { id: 'ppe4', label: 'Safety boots in good condition — steel toe intact (BS EN ISO 20345)', section: 'Foot Protection' },
    { id: 'ppe5', label: 'Sole grip adequate — not worn smooth', section: 'Foot Protection' },
    { id: 'ppe6', label: 'Hi-vis vest/jacket clean and reflective strips intact (BS EN 20471)', section: 'Visibility' },
    { id: 'ppe7', label: 'Correct class for environment (Class 1/2/3)', section: 'Visibility' },
    { id: 'ppe8', label: 'Safety glasses/goggles undamaged — lenses clear (BS EN 166)', section: 'Eye Protection' },
    { id: 'ppe9', label: 'Ear protection available and in good condition (BS EN 352)', section: 'Hearing Protection' },
    { id: 'ppe10', label: 'Gloves appropriate for task — no holes or degradation', section: 'Hand Protection' },
    { id: 'ppe11', label: 'RPE face-fit tested and filter in date (if required)', section: 'Respiratory' },
    { id: 'ppe12', label: 'All PPE correctly stored when not in use', section: 'General' },
  ],
  // LOLER 1998 + PUWER 1998 + IPAF guidance
  mewp: [
    { id: 'mw1', label: 'Structure sound — no visible damage, cracks or corrosion', section: 'Structure' },
    { id: 'mw2', label: 'Hydraulic system — no leaks, hoses in good condition', section: 'Structure' },
    { id: 'mw3', label: 'Pins, bolts and safety clips secure', section: 'Structure' },
    { id: 'mw4', label: 'All controls functional — lift, lower, drive, slew', section: 'Controls' },
    { id: 'mw5', label: 'Emergency lowering system operational', section: 'Controls' },
    { id: 'mw6', label: 'Horn and warning devices working', section: 'Controls' },
    { id: 'mw7', label: 'Guardrails and mid-rails secure on platform', section: 'Platform Safety' },
    { id: 'mw8', label: 'Platform floor secure and non-slip', section: 'Platform Safety' },
    { id: 'mw9', label: 'Gate/chain at access point closes properly', section: 'Platform Safety' },
    { id: 'mw10', label: 'Outriggers/stabilisers deploy and lock correctly', section: 'Stability' },
    { id: 'mw11', label: 'Ground conditions suitable — firm, level surface', section: 'Stability' },
    { id: 'mw12', label: 'Clear of overhead obstructions and power lines (minimum distances)', section: 'Stability' },
    { id: 'mw13', label: 'Operator holds valid IPAF card for this category', section: 'Compliance' },
    { id: 'mw14', label: 'LOLER thorough examination (6-monthly) in date', section: 'Compliance' },
  ],
};

// ─── Regulation References ───

export interface RegulationRef {
  name: string;
  shortName: string;
  description: string;
  /** Statutory inspection interval in days (if applicable). */
  statutoryIntervalDays?: number;
}

export const REGULATION_REFS: Record<string, RegulationRef> = {
  ladder: {
    name: 'LOLER 1998 (Lifting Operations and Lifting Equipment Regulations)',
    shortName: 'LOLER 1998',
    description:
      'Ladders must be visually inspected before each use. Fixed ladders and those used as a workplace require formal 6-monthly thorough examination under Regulation 9.',
    statutoryIntervalDays: 183,
  },
  scaffold: {
    name: 'Work at Height Regulations 2005',
    shortName: 'WAHR 2005',
    description:
      'Scaffold must be inspected before first use, after any alteration, and at intervals not exceeding 7 days (Regulation 12). A written inspection report is required.',
    statutoryIntervalDays: 7,
  },
  power_tool: {
    name: 'PUWER 1998 (Provision and Use of Work Equipment Regulations)',
    shortName: 'PUWER 1998',
    description:
      'Power tools must be maintained in efficient working order (Regulation 5). Visual check before each use; PAT testing at intervals appropriate to risk.',
  },
  test_instrument: {
    name: 'GS38 (HSE Guidance Sheet 38, 4th Edition)',
    shortName: 'GS38',
    description:
      'Test instruments must have GS38-compliant leads (max 4mm exposed tips, shrouded probes), correct fuses, and current calibration certificate.',
  },
  access_equipment: {
    name: 'LOLER 1998 / Work at Height Regulations 2005',
    shortName: 'LOLER 1998',
    description:
      'Mobile access equipment (towers, MEWPs) requires 6-monthly thorough examination under LOLER Regulation 9. Pre-use visual inspection before each use.',
    statutoryIntervalDays: 183,
  },
  harness: {
    name: 'LOLER 1998 / WAHR 2005 / BS EN 361',
    shortName: 'LOLER 1998',
    description:
      'Fall arrest harnesses require 6-monthly thorough examination under LOLER Regulation 9. Visual inspection before each use. Lanyards must comply with BS EN 355.',
    statutoryIntervalDays: 183,
  },
  extension_lead: {
    name: 'PUWER 1998 / Electricity at Work Regulations 1989',
    shortName: 'PUWER 1998',
    description:
      'Extension leads must be visually inspected before each use (PUWER Reg 5). PAT testing at intervals appropriate to risk. 110V CTE preferred for construction sites.',
  },
  portable_rcd: {
    name: 'Electricity at Work Regulations 1989 / BS 7671 Reg 411.3.3',
    shortName: 'EAW 1989',
    description:
      'Portable RCDs must be tested before each use — press test button to verify trip. 30mA sensitivity, <40ms trip time. Required for 230V equipment on construction sites.',
  },
  generator: {
    name: 'PUWER 1998 / EAW 1989 / BS 7430',
    shortName: 'PUWER 1998',
    description:
      'Portable generators must be maintained in efficient working order (PUWER Reg 5). Earthing per BS 7430. Output voltage and circuit protection checked before use.',
  },
  fire_extinguisher: {
    name: 'Regulatory Reform (Fire Safety) Order 2005 / BS 5306-3',
    shortName: 'RRO 2005',
    description:
      'Fire extinguishers require monthly visual inspection and annual servicing (BS 5306-3). Correct type must be provided for hazards present. Must be accessible and signed.',
  },
  first_aid_kit: {
    name: 'Health & Safety (First-Aid) Regulations 1981 / BS 8599-1',
    shortName: 'First Aid 1981',
    description:
      'Employers must provide adequate first aid equipment (Reg 3). Contents per BS 8599-1. Check expiry dates and replenish after use.',
  },
  ppe: {
    name: 'Personal Protective Equipment at Work Regulations 2022',
    shortName: 'PPER 2022',
    description:
      'PPE must be maintained in good working order and replaced when defective (Reg 7). Employers must ensure PPE is suitable, properly fitting, and used correctly.',
  },
  mewp: {
    name: 'LOLER 1998 / PUWER 1998 / IPAF Guidance',
    shortName: 'LOLER 1998',
    description:
      'MEWPs require 6-monthly thorough examination under LOLER. Operators must hold valid IPAF card. Pre-use checks before each shift. Emergency lowering must be tested.',
    statutoryIntervalDays: 183,
  },
};

/**
 * Check if a statutory inspection is due or overdue for given equipment.
 * Returns null if no statutory interval applies.
 */
export function getStatutoryInspectionStatus(
  equipmentType: string,
  lastInspection: string | null
): {
  status: 'ok' | 'due_soon' | 'overdue' | 'unknown';
  daysUntilDue: number | null;
  label: string;
} | null {
  const reg = REGULATION_REFS[equipmentType];
  if (!reg?.statutoryIntervalDays) return null;

  if (!lastInspection) {
    return {
      status: 'unknown',
      daysUntilDue: null,
      label: `${reg.shortName}: No inspection recorded`,
    };
  }

  const lastDate = new Date(lastInspection);
  lastDate.setHours(0, 0, 0, 0);
  const dueDate = new Date(lastDate);
  dueDate.setDate(dueDate.getDate() + reg.statutoryIntervalDays);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilDue < 0) {
    return {
      status: 'overdue',
      daysUntilDue,
      label: `${reg.shortName}: Inspection overdue by ${Math.abs(daysUntilDue)} day(s)`,
    };
  }

  if (daysUntilDue <= 14) {
    return {
      status: 'due_soon',
      daysUntilDue,
      label: `${reg.shortName}: Inspection due in ${daysUntilDue} day(s)`,
    };
  }

  return {
    status: 'ok',
    daysUntilDue,
    label: `${reg.shortName}: Next inspection in ${daysUntilDue} day(s)`,
  };
}

export function usePreUseChecks() {
  return useQuery({
    queryKey: ['pre-use-checks'],
    queryFn: async (): Promise<PreUseCheck[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pre_use_checks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as unknown as PreUseCheck[];
    },
    staleTime: 30_000,
  });
}

export function useCreatePreUseCheck() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (check: {
      equipment_type: string;
      equipment_description?: string;
      equipment_id?: string;
      site_address?: string;
      items: CheckItem[];
      overall_result: 'pass' | 'fail' | 'na';
      checked_by?: string;
      signature?: string;
      actions_required?: string;
      photos?: string[];
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pre_use_checks')
        .insert({
          user_id: user.id,
          ...check,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pre-use-checks'] });
      toast({
        title: 'Check Recorded',
        description: 'Pre-use equipment check has been saved.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Could not save check.',
        variant: 'destructive',
      });
    },
  });
}
