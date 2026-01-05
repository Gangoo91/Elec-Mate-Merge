
export const testSequence = [
  {
    step: 0,
    title: 'Safe Isolation Procedure',
    regulation: '537.2.1.1',
    description: 'Complete safe isolation and proving dead before any testing begins',
    method: 'Follow HSE GS38 guidance and company procedures',
    acceptance: 'Circuit isolated, locked off, and proved dead',
    safety: 'CRITICAL: This step must be completed before any other testing',
    icon: '🔒',
    priority: 'CRITICAL',
    testType: 'isolation'
  },
  {
    step: 1,
    title: 'Continuity of Protective Conductors',
    regulation: '612.2.1',
    description: 'Test continuity of circuit protective conductors (cpc) and main earthing conductors',
    method: 'Low reading ohmmeter (typically 200mA test current)',
    acceptance: 'Should be low resistance path, typically <1Ω for most circuits',
    safety: 'Ensure supply is isolated and proved dead',
    icon: '🔗',
    priority: 'HIGH',
    testType: 'dead'
  },
  {
    step: 2,
    title: 'Continuity of Ring Final Circuit Conductors',
    regulation: '612.2.2',
    description: 'Verify ring continuity and correct polarity of ring final circuits',
    method: 'End-to-end test followed by cross-connection test',
    acceptance: 'R1+R2 values should be consistent around the ring',
    safety: 'Circuit must be isolated and all accessories disconnected',
    icon: '⭕',
    priority: 'HIGH',
    testType: 'dead'
  },
  {
    step: 3,
    title: 'Insulation Resistance',
    regulation: '612.3',
    description: 'Test insulation between live conductors and between live conductors and earth',
    method: '500V DC for circuits ≤500V, 1000V DC for circuits >500V',
    acceptance: 'Minimum 1MΩ for circuits ≤500V, 5MΩ for circuits >500V',
    safety: 'Remove sensitive equipment, ensure personnel safety',
    icon: '⚡',
    priority: 'HIGH',
    testType: 'dead'
  },
  {
    step: 4,
    title: 'Polarity',
    regulation: '612.6',
    description: 'Verify correct polarity of single-pole devices and accessories',
    method: 'Continuity test or approved test method',
    acceptance: 'All single-pole devices connected in line conductor only',
    safety: 'Supply must be isolated during testing',
    icon: '🔄',
    priority: 'MEDIUM',
    testType: 'dead'
  },
  {
    step: 5,
    title: 'Earth Electrode Resistance (if applicable)',
    regulation: '612.7',
    description: 'Measure resistance of earth electrode to remote earth',
    method: 'Earth electrode resistance tester',
    acceptance: 'Varies by system type - typically ≤200Ω for TT systems',
    safety: 'Use appropriate earth electrode test equipment',
    icon: '🌍',
    priority: 'MEDIUM',
    testType: 'dead'
  },
  {
    step: 6,
    title: 'Earth Fault Loop Impedance (Ze then Zs)',
    regulation: '612.9',
    description: 'Measure external earth fault loop impedance (Ze), then earth fault loop impedance (Zs) at relevant points',
    method: 'Loop impedance tester with supply energised (line-to-earth method standard)',
    acceptance: 'Must not exceed values in BS7671 tables',
    safety: 'Live testing - ensure test equipment is suitable and calibrated. Follow manufacturer guidance for test lead connections',
    icon: '🔋',
    priority: 'HIGH',
    testType: 'live'
  },
  {
    step: 7,
    title: 'Additional Protection (RCD Testing)',
    regulation: '612.13',
    description: 'Test operation of RCDs at rated residual current',
    method: 'RCD tester at 1×In (Amendment 3)',
    acceptance: 'Trip within 300ms at 1×In',
    safety: 'Follow RCD tester operating instructions',
    icon: '🛡️',
    priority: 'HIGH',
    testType: 'live'
  },
  {
    step: 8,
    title: 'Prospective Fault Current',
    regulation: '612.11',
    description: 'Measure prospective short-circuit and earth fault current',
    method: 'PFC tester at origin and relevant points',
    acceptance: 'Protective devices must be capable of breaking the fault current',
    safety: 'High current measurement - use appropriate equipment',
    icon: '⚡',
    priority: 'MEDIUM',
    testType: 'live'
  }
];

export const quickRefValues = [
  { label: 'Min Insulation Resistance', value: '≥1MΩ', regulation: '612.3.2' },
  { label: 'RCD Trip Time (1×In)', value: '≤300ms', regulation: '612.13.2' },
  { label: 'Ring Circuit Tolerance', value: '±0.05Ω', regulation: '612.2.2' },
  { label: 'Test Voltage (LV)', value: '500V DC', regulation: '612.3.2' },
  { label: 'Continuity Test Current', value: '4-24mA', regulation: '612.2.1' }
];

export const testingChecklist = [
  'Test instruments calibrated and within date',
  'Appropriate PPE worn and checked',
  'Warning notices displayed at work area',
  'All personnel informed of testing activities',
  'Emergency procedures reviewed and understood',
  'Test leads inspected for damage',
  'RCDs isolated during loop impedance testing',
  'Sensitive equipment disconnected where required',
  'Test results recorded immediately',
  'Any deviations documented with justification'
];
