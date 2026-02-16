export interface TestType {
  id: string;
  name: string;
  unit: string;
  description: string;
  icon: string;
  requiredForAll?: boolean;
  requiredForCircuits?: string[];
}

export const testTypes: TestType[] = [
  {
    id: 'continuity',
    name: 'Continuity of Protective Conductors',
    unit: 'Ω',
    description: 'Test protective conductor continuity',
    icon: '🔗',
    requiredForAll: true,
  },
  {
    id: 'insulation',
    name: 'Insulation Resistance',
    unit: 'MΩ',
    description: 'Test insulation between conductors',
    icon: '⚡',
    requiredForAll: true,
  },
  {
    id: 'zs',
    name: 'Earth Fault Loop Impedance (Zs)',
    unit: 'Ω',
    description: 'Test earth fault loop impedance',
    icon: '🌍',
    requiredForAll: true,
  },
  {
    id: 'rcd',
    name: 'RCD Operation',
    unit: 'ms',
    description: 'Test RCD trip times (where applicable)',
    icon: '🛡️',
    requiredForCircuits: ['rcd', 'socket', 'bathroom'],
  },
  {
    id: 'polarity',
    name: 'Polarity Check',
    unit: 'Pass/Fail',
    description: 'Verify correct polarity',
    icon: '🔄',
    requiredForAll: true,
  },
];
