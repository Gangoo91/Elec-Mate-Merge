import { MethodTemplate, StepTemplate } from '@/types/method-statement';

export const methodTemplates: MethodTemplate[] = [
  {
    id: 'consumer-unit-replacement',
    name: 'Consumer Unit Replacement',
    description: 'Complete replacement of existing consumer unit with RCD protection',
    category: 'Installation',
    workType: 'Installation Work',
    estimatedDuration: '4-6 hours',
    difficultyLevel: 'intermediate',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified', 'AM2'],
    steps: [
      {
        title: 'Initial Assessment & Planning',
        description: 'Survey existing installation and plan new consumer unit layout',
        safetyRequirements: ['PPE', 'Risk assessment completed'],
        equipmentNeeded: ['Installation tester', 'Digital camera', 'Measuring tape'],
        qualifications: ['18th Edition'],
        estimatedDuration: '30 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Isolation & Verification',
        description: 'Isolate main supply and verify isolation at consumer unit',
        safetyRequirements: ['Prove dead device', 'Lockout/tagout procedures', 'Two-person verification'],
        equipmentNeeded: ['Voltage indicator', 'Proving unit', 'Isolation locks'],
        qualifications: ['18th Edition', 'Safe isolation procedures'],
        estimatedDuration: '20 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Remove Existing Consumer Unit',
        description: 'Carefully remove old consumer unit and label all circuits',
        safetyRequirements: ['Eye protection', 'Dust mask', 'Careful handling of asbestos'],
        equipmentNeeded: ['Label maker', 'Circuit identification tools', 'Hand tools'],
        qualifications: ['18th Edition'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      },
      {
        title: 'Install New Consumer Unit',
        description: 'Mount and wire new consumer unit with RCD protection',
        safetyRequirements: ['Secure mounting', 'Proper cable management', 'IP rating compliance'],
        equipmentNeeded: ['New consumer unit', 'MCBs', 'RCDs', 'Cable management'],
        qualifications: ['18th Edition', 'Part P'],
        estimatedDuration: '2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Certification',
        description: 'Complete installation testing and issue certificates',
        safetyRequirements: ['Safe re-energisation', 'Sequential testing'],
        equipmentNeeded: ['Multifunction tester', 'Schedule of test results'],
        qualifications: ['18th Edition', 'Testing competence'],
        estimatedDuration: '1 hour',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'socket-outlet-installation',
    name: 'Socket Outlet Installation',
    description: 'Installation of new socket outlets on existing circuits',
    category: 'Installation',
    workType: 'Installation Work',
    estimatedDuration: '2-3 hours',
    difficultyLevel: 'basic',
    isPopular: true,
    requiredQualifications: ['18th Edition', 'Part P Qualified'],
    steps: [
      {
        title: 'Circuit Assessment',
        description: 'Assess existing circuit capacity and suitability',
        safetyRequirements: ['Circuit testing', 'Load calculations'],
        equipmentNeeded: ['Circuit tester', 'Load calculation sheets'],
        qualifications: ['18th Edition'],
        estimatedDuration: '20 minutes',
        riskLevel: 'low'
      },
      {
        title: 'Safe Isolation',
        description: 'Isolate circuit and verify isolation',
        safetyRequirements: ['Lockout procedures', 'Voltage testing'],
        equipmentNeeded: ['Voltage tester', 'Proving unit', 'Isolation locks'],
        qualifications: ['Safe isolation procedures'],
        estimatedDuration: '15 minutes',
        riskLevel: 'high'
      },
      {
        title: 'Installation Work',
        description: 'Install new socket outlets and make connections',
        safetyRequirements: ['Proper terminations', 'Cable protection'],
        equipmentNeeded: ['Socket outlets', 'Cable', 'Installation tools'],
        qualifications: ['18th Edition', 'Part P'],
        estimatedDuration: '1.5 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Test installation and complete certification',
        safetyRequirements: ['Safe re-energisation', 'Functional testing'],
        equipmentNeeded: ['Socket tester', 'Certification forms'],
        qualifications: ['Testing competence'],
        estimatedDuration: '30 minutes',
        riskLevel: 'medium'
      }
    ]
  },
  {
    id: 'lighting-circuit-installation',
    name: 'Lighting Circuit Installation',
    description: 'Installation of new lighting circuits with switching',
    category: 'Installation',
    workType: 'Installation Work',
    estimatedDuration: '4-8 hours',
    difficultyLevel: 'intermediate',
    requiredQualifications: ['18th Edition', 'Part P Qualified'],
    steps: [
      {
        title: 'Design & Planning',
        description: 'Design lighting layout and switching arrangements',
        safetyRequirements: ['Switching heights', 'Emergency lighting considerations'],
        equipmentNeeded: ['Design software', 'Lighting calculations'],
        qualifications: ['Lighting design competence'],
        estimatedDuration: '1 hour',
        riskLevel: 'low'
      },
      {
        title: 'First Fix Installation',
        description: 'Install cables and back boxes for lighting circuit',
        safetyRequirements: ['Cable protection', 'Fire barrier integrity'],
        equipmentNeeded: ['Twin & earth cable', 'Back boxes', 'Installation tools'],
        qualifications: ['18th Edition'],
        estimatedDuration: '3 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Second Fix & Connection',
        description: 'Install fittings and complete all connections',
        safetyRequirements: ['Working at height', 'Secure fixings'],
        equipmentNeeded: ['Light fittings', 'Switches', 'Connectors'],
        qualifications: ['18th Edition', 'Part P'],
        estimatedDuration: '2 hours',
        riskLevel: 'medium'
      },
      {
        title: 'Testing & Commissioning',
        description: 'Complete testing and functional verification',
        safetyRequirements: ['Safe re-energisation', 'Emergency lighting testing'],
        equipmentNeeded: ['Installation tester', 'Light meter'],
        qualifications: ['Testing competence'],
        estimatedDuration: '45 minutes',
        riskLevel: 'medium'
      }
    ]
  }
];

export const stepTemplates: StepTemplate[] = [
  {
    id: 'isolation-verification',
    title: 'Isolation & Verification',
    description: 'Isolate electrical supply and verify safe isolation',
    category: 'Safety',
    safetyRequirements: [
      'Use approved voltage indicator',
      'Prove dead device before and after use',
      'Apply lockout/tagout procedures',
      'Two-person verification where required'
    ],
    equipmentNeeded: [
      'Voltage indicator (GS38 compliant)',
      'Proving unit',
      'Isolation locks and tags',
      'Warning notices'
    ],
    qualifications: ['Safe isolation procedures (GS38)', '18th Edition'],
    estimatedDuration: '15-20 minutes',
    riskLevel: 'high',
    commonlyUsedWith: ['testing-commissioning', 'installation-work']
  },
  {
    id: 'testing-commissioning',
    title: 'Testing & Commissioning',
    description: 'Complete electrical testing and commission installation',
    category: 'Testing',
    safetyRequirements: [
      'Safe re-energisation procedures',
      'Sequential testing approach',
      'Functional testing of protection devices'
    ],
    equipmentNeeded: [
      'Multifunction installation tester',
      'PAT tester (if applicable)',
      'Test certificates and schedules'
    ],
    qualifications: ['18th Edition', 'Testing and inspection competence'],
    estimatedDuration: '30-60 minutes',
    riskLevel: 'medium',
    commonlyUsedWith: ['isolation-verification', 'installation-work']
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'Conduct site-specific risk assessment',
    category: 'Planning',
    safetyRequirements: [
      'Identify all hazards',
      'Assess risk levels',
      'Implement control measures'
    ],
    equipmentNeeded: [
      'Risk assessment forms',
      'Camera for hazard documentation',
      'Site survey equipment'
    ],
    qualifications: ['Risk assessment training'],
    estimatedDuration: '20-30 minutes',
    riskLevel: 'low',
    commonlyUsedWith: ['method-statement', 'planning-preparation']
  }
];

export const getTemplatesByCategory = (category?: string): MethodTemplate[] => {
  if (!category) return methodTemplates;
  return methodTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string): MethodTemplate | undefined => {
  return methodTemplates.find(template => template.id === id);
};

export const getStepTemplatesByCategory = (category?: string): StepTemplate[] => {
  if (!category) return stepTemplates;
  return stepTemplates.filter(template => template.category === category);
};