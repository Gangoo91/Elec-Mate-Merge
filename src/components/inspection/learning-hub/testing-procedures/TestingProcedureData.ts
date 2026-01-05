

export interface TestingStep {
  id: string;
  title: string;
  description: string;
  safetyNote?: string;
  equipment: string[];
  expectedResult: string;
  commonIssues: string[];
  regulation: string;
  isInteractive: boolean;
}

export interface TestingProcedure {
  id: string;
  title: string;
  regulation: string;
  description: string;
  duration: string;
  difficulty: 'Essential' | 'Critical' | 'Required';
  category: 'continuity' | 'insulation' | 'impedance' | 'rcd' | 'polarity' | 'functional';
  steps: TestingStep[];
  equipment: string[];
  safetyRequirements: string[];
  acceptanceCriteria: {
    parameter: string;
    requirement: string;
    regulation: string;
  }[];
  realWorldExamples: {
    scenario: string;
    expectedReading: string;
    troubleshooting: string[];
  }[];
  commonMistakes: string[];
  tips: string[];
}

export const testingProceduresData: TestingProcedure[] = [];

export const testingEquipment = [
  {
    name: 'Multifunction Tester (MFT)',
    description: 'All-in-one testing instrument for electrical installations',
    tests: ['Continuity', 'Insulation Resistance', 'Loop Impedance', 'RCD Testing'],
    keyFeatures: [
      'Automatic test sequences',
      'Data logging capability',
      'Bluetooth connectivity',
      'Rechargeable battery'
    ],
    calibrationRequirement: 'Annual calibration to traceable standards',
    standards: ['IEC 61557-1', 'IEC 61557-2', 'IEC 61557-3', 'IEC 61557-6'],
    safetyFeatures: [
      'CAT III 300V rated',
      'Fused test leads',
      'Automatic discharge',
      'Overload protection'
    ]
  },
  {
    name: 'RCD Tester',
    description: 'Dedicated instrument for testing residual current devices',
    tests: ['RCD Trip Time', 'RCD Sensitivity', 'Ramp Testing'],
    keyFeatures: [
      'Variable test currents',
      'Phase angle selection',
      'Memory for test results',
      'Auto-ranging'
    ],
    calibrationRequirement: 'Annual calibration required',
    standards: ['IEC 61557-6'],
    safetyFeatures: [
      'CAT III rated',
      'Automatic safety checks',
      'Overload protection'
    ]
  }
];

