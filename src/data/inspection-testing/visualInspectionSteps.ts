
import { TestStep } from '@/types/inspection-testing';

export const preTestingVisualInspectionSteps: TestStep[] = [
  {
    id: 'general-condition-assessment',
    title: 'General Condition Assessment',
    description: 'Overall assessment of the electrical installation condition',
    instructions: [
      'Assess overall condition of electrical installation',
      'Check for signs of damage, deterioration, or abuse',
      'Verify installation appears complete and suitable for intended use',
      'Identify any obvious safety concerns requiring immediate attention'
    ],
    category: 'visual-inspection',
    estimatedTime: '15 minutes',
    order: '1',
    safetyWarnings: [
      'Do not touch any electrical equipment during visual inspection',
      'Report any immediate safety concerns before proceeding'
    ]
  },
  {
    id: 'consumer-unit-inspection',
    title: 'Consumer Unit/Distribution Board Inspection',
    description: 'Detailed inspection of the main distribution equipment',
    instructions: [
      'Check consumer unit/distribution board condition and security',
      'Verify correct labelling of circuits',
      'Inspect protective devices (MCBs, RCDs, etc.) for damage',
      'Check for adequate working space and accessibility',
      'Verify IP rating compliance for location'
    ],
    category: 'visual-inspection',
    estimatedTime: '20 minutes',
    order: '2'
  },
  {
    id: 'cable-and-wiring-inspection',
    title: 'Cable and Wiring System Inspection',
    description: 'Visual inspection of cables, conduits, and wiring systems',
    instructions: [
      'Inspect visible cables for damage, deterioration, or inappropriate installation',
      'Check cable supports, fixings, and routing compliance',
      'Verify appropriate cable types for installation method',
      'Check for adequate protection against mechanical damage',
      'Inspect cable entries and gland arrangements'
    ],
    category: 'visual-inspection',
    estimatedTime: '30 minutes',
    order: '3'
  },
  {
    id: 'earthing-bonding-inspection',
    title: 'Earthing and Bonding Inspection',
    description: 'Visual verification of earthing and bonding arrangements',
    instructions: [
      'Verify main earthing terminal and connections',
      'Check main equipotential bonding connections',
      'Inspect supplementary bonding where required',
      'Verify earth electrode arrangements (where accessible)',
      'Check earthing conductor sizes and connections'
    ],
    category: 'visual-inspection',
    estimatedTime: '25 minutes',
    order: '4',
    safetyWarnings: [
      'Do not disconnect earthing or bonding conductors during inspection'
    ]
  },
  {
    id: 'accessories-outlets-inspection',
    title: 'Accessories and Outlets Inspection',
    description: 'Inspection of switches, sockets, and other electrical accessories',
    instructions: [
      'Check socket outlets for damage and secure mounting',
      'Inspect switches for proper operation and condition',
      'Verify appropriate accessories for location (IP ratings)',
      'Check light fittings and lampholders',
      'Inspect junction boxes and connection points'
    ],
    category: 'visual-inspection',
    estimatedTime: '35 minutes',
    order: '5'
  },
  {
    id: 'special-locations-inspection',
    title: 'Special Locations Inspection',
    description: 'Inspection of bathrooms, kitchens, and other special locations',
    instructions: [
      'Identify special locations requiring additional protection',
      'Verify zone classifications in bathrooms',
      'Check IP ratings appropriate for location',
      'Inspect RCD protection requirements',
      'Verify supplementary bonding where required'
    ],
    category: 'visual-inspection',
    estimatedTime: '20 minutes',
    order: '6'
  }
];

export const allVisualInspectionSteps: TestStep[] = [
  ...preTestingVisualInspectionSteps
];
