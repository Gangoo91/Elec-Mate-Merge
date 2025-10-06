/**
 * GS 38 - Electrical Test Equipment Safety Guidance
 * HSE Guidance Note GS38 (Fourth Edition) - Published 2015
 * 
 * Extracted from official HSE GS 38 PDF
 * For use in Health & Safety and Commissioning agents
 */

export interface GS38Requirement {
  section: string;
  title: string;
  content: string;
  category: 'critical' | 'important' | 'reference';
  keyPoints: string[];
  appliesTo?: string[];
}

/**
 * Critical GS 38 safety requirements for test equipment
 */
export const GS38_CORE_REQUIREMENTS: GS38Requirement[] = [
  {
    section: '1',
    title: 'Introduction & Scope',
    content: 'GS 38 applies to people using electrical test equipment on low voltage electrical systems and equipment (up to 1000V AC). This includes electricians, contractors, test supervisors, technicians, and appliance repairers.',
    category: 'critical',
    keyPoints: [
      'Applies to circuits up to 1000V AC',
      'Covers test probes, leads, lamps, voltage detectors, measuring equipment',
      'Mandatory for all electrical testing work'
    ]
  },
  {
    section: '3',
    title: 'Legal Requirements',
    content: 'Electricity at Work Regulations 1989 require systems to be safe and maintained safely. Live working only permitted when: (1) unreasonable to work dead AND (2) reasonable to work live AND (3) suitable precautions taken.',
    category: 'critical',
    keyPoints: [
      'Equipment must be properly constructed and maintained',
      'Live working only when unavoidable',
      'Must have adequate training and competence',
      'Adequate supervision required'
    ],
    appliesTo: ['all_testing', 'commissioning', 'maintenance']
  },
  {
    section: '9',
    title: 'Test Probe Standards',
    content: 'Test probes and leads MUST conform to BS EN 61010-031 or BS EN 61243-3. Must be marked with CAT rating (II, III, or IV) and manufacturer identification.',
    category: 'critical',
    keyPoints: [
      'Must conform to BS EN 61010-031 or BS EN 61243-3',
      'Marked with CAT rating (II, III, or IV)',
      'Finger barriers required to prevent contact',
      'Maximum 4mm exposed metal tip',
      'HBC fuses (typically 500mA) or current limitation required',
      'Shrouded connectors mandatory'
    ],
    appliesTo: ['test_equipment', 'probes', 'multimeters']
  },
  {
    section: '10',
    title: 'CAT Rating Requirements',
    content: 'Measurement categories reflect overvoltage protection levels. Equipment CAT rating MUST match or exceed the installation category being tested.',
    category: 'critical',
    keyPoints: [
      'CAT IV: Supply source/meters/primary overcurrent protection',
      'CAT III: Distribution boards, socket outlets, permanently connected equipment',
      'CAT II: Appliances, portable tools, circuits directly connected to installation',
      'NEVER use lower CAT rating than installation requires'
    ],
    appliesTo: ['all_testing', 'equipment_selection']
  },
  {
    section: '11',
    title: 'Test Lead Requirements',
    content: 'Test leads must be adequately insulated, colour-coded, flexible, sheathed for mechanical protection, and appropriate length. No exposed conductors except probe tips.',
    category: 'critical',
    keyPoints: [
      'Adequate insulation for voltage rating',
      'Colour-coded for easy distinction',
      'Sheathed for mechanical protection',
      'No exposed conductors except tips',
      'Appropriate length - not too long/unwieldy',
      'Protected against contamination'
    ],
    appliesTo: ['test_leads', 'test_equipment']
  },
  {
    section: '13',
    title: 'Voltage Detector Types',
    content: 'Two approved types: (1) Test lamps with HBC fuse protection (2) 2-pole detectors with built-in current limiting and dual indication systems.',
    category: 'critical',
    keyPoints: [
      'Test lamps: Require 500mA HBC fuse protection',
      '2-pole detectors: Built-in current limiting, dual indication',
      'Must be proved before AND after use',
      'Marked with max voltage and CAT rating',
      'Short-time rating must be marked if applicable'
    ],
    appliesTo: ['voltage_detection', 'proving_dead']
  },
  {
    section: '14',
    title: 'Non-Contact Voltage Detectors',
    content: 'Single-pole/non-contact voltage detectors ("voltage sticks") should ONLY be used for identifying live equipment, NOT for proving dead.',
    category: 'critical',
    keyPoints: [
      'ONLY for identifying live equipment',
      'NOT suitable for proving dead',
      'Contact-type devices MUST be used for proving dead',
      'Useful for identifying live cables in trunking'
    ],
    appliesTo: ['voltage_detection', 'live_identification']
  },
  {
    section: '20',
    title: 'Proving Test Equipment',
    content: 'Test equipment used to prove dead may fail to indicate danger. MUST be proved before and after use on a proving unit or known live source.',
    category: 'critical',
    keyPoints: [
      'Prove equipment BEFORE use',
      'Prove equipment AFTER use',
      'Use proprietary proving unit (preferred)',
      'Alternative: Test on known live source of similar voltage',
      'Prevents false sense of safety from faulty equipment'
    ],
    appliesTo: ['all_testing', 'safe_isolation']
  },
  {
    section: '21',
    title: 'Multimeter Safety',
    content: 'Most accidents occur from incorrect multimeter settings. Ensure correct function setting, appropriate CAT rating, and secure lead connections.',
    category: 'critical',
    keyPoints: [
      'Check correct function BEFORE connecting',
      'Verify CAT rating matches installation',
      'Ensure leads securely connected',
      'Setting to wrong function = major shock/arc hazard',
      'Current range when measuring voltage = most common cause of accidents'
    ],
    appliesTo: ['multimeters', 'measuring_equipment']
  }
];

/**
 * Common GS 38 violations that cause accidents
 */
export const GS38_COMMON_VIOLATIONS = [
  'Using test probes with excessive exposed metal (>4mm tip)',
  'Missing or damaged finger barriers on probes',
  'Test leads with visible damage, cracking, or fraying',
  'Using equipment without proper CAT rating',
  'Failing to prove test equipment before/after use',
  'Using non-contact detectors to prove dead',
  'Multimeter set to wrong function (especially current range)',
  'Missing or incorrect HBC fuse protection',
  'Exposed live terminals on equipment',
  'Using makeshift or inadequate test equipment'
];

/**
 * GS 38 Pre-Testing Safety Checklist
 */
export const GS38_PRE_TEST_CHECKLIST = [
  'Test equipment appropriate for voltage/CAT rating?',
  'Test probes have finger barriers and max 4mm exposed tip?',
  'Test leads in good condition (no damage, fraying)?',
  'Equipment proved on proving unit or known live source?',
  'Correct function selected on multimeter?',
  'PPE appropriate for task and voltage level?',
  'Working area safe (adequate space, lighting, secure footing)?',
  'Risk assessment current and applicable?'
];

/**
 * Get GS 38 requirements by category
 */
export function getGS38RequirementsByCategory(category: 'critical' | 'important' | 'reference'): GS38Requirement[] {
  return GS38_CORE_REQUIREMENTS.filter(req => req.category === category);
}

/**
 * Get GS 38 requirements applicable to specific testing activity
 */
export function getGS38RequirementsForActivity(activity: string): GS38Requirement[] {
  return GS38_CORE_REQUIREMENTS.filter(req => 
    req.appliesTo?.includes(activity) || req.appliesTo?.includes('all_testing')
  );
}

/**
 * GS 38 citation format for agent responses
 */
export function formatGS38Citation(section: string, title: string): string {
  return `(GS 38 §${section}: ${title})`;
}
