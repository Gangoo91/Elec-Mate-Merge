
export interface PolarityTestResult {
  circuitRef: string;
  testMethod: string;
  socketOutlets: 'pass' | 'fail' | 'n/a' | 'pending';
  lightingPoints: 'pass' | 'fail' | 'n/a' | 'pending';
  isolatorSwitches: 'pass' | 'fail' | 'n/a' | 'pending';
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

export const testMethods = [
  { value: 'dead', label: 'Dead Testing (Preferred)' },
  { value: 'live', label: 'Live Testing (Where necessary)' }
];
