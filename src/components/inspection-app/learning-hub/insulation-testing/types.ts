
export interface InsulationTestResult {
  circuitRef: string;
  testVoltage: string;
  liveNeutral: string;
  liveEarth: string;
  neutralEarth: string;
  temperature: string;
  correctedValues: {
    liveNeutral: string;
    liveEarth: string;
    neutralEarth: string;
  };
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

export const testVoltages = [
  { value: '250', label: '250V DC' },
  { value: '500', label: '500V DC' },
  { value: '1000', label: '1000V DC' }
];
