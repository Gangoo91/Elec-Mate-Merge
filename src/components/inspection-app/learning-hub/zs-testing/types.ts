
export interface ZsTestResult {
  circuitRef: string;
  testMethod: 'dead' | 'live';
  protectiveDevice: string;
  deviceRating: number;
  zsReading: string;
  zsMaxPermitted: string;
  temperature: string;
  correctedZs: string;
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

// BS 7671 Table 41.3 - Maximum Zs values for MCBs (0.4s disconnection)
export const protectiveDevices = [
  // Type B MCBs - Table 41.3(a)
  { value: 'mcb-b6', label: 'MCB Type B 6A', maxZs: '7.28' },
  { value: 'mcb-b10', label: 'MCB Type B 10A', maxZs: '4.37' },
  { value: 'mcb-b16', label: 'MCB Type B 16A', maxZs: '2.73' },
  { value: 'mcb-b20', label: 'MCB Type B 20A', maxZs: '2.19' },
  { value: 'mcb-b25', label: 'MCB Type B 25A', maxZs: '1.75' },
  { value: 'mcb-b32', label: 'MCB Type B 32A', maxZs: '1.37' },
  { value: 'mcb-b40', label: 'MCB Type B 40A', maxZs: '1.09' },
  { value: 'mcb-b50', label: 'MCB Type B 50A', maxZs: '0.87' },
  // Type C MCBs - Table 41.3(b)
  { value: 'mcb-c6', label: 'MCB Type C 6A', maxZs: '3.64' },
  { value: 'mcb-c10', label: 'MCB Type C 10A', maxZs: '2.19' },
  { value: 'mcb-c16', label: 'MCB Type C 16A', maxZs: '1.37' },
  { value: 'mcb-c20', label: 'MCB Type C 20A', maxZs: '1.09' },
  { value: 'mcb-c25', label: 'MCB Type C 25A', maxZs: '0.87' },
  { value: 'mcb-c32', label: 'MCB Type C 32A', maxZs: '0.68' },
  { value: 'mcb-c40', label: 'MCB Type C 40A', maxZs: '0.55' },
  { value: 'mcb-c50', label: 'MCB Type C 50A', maxZs: '0.44' },
  // Type D MCBs - Table 41.3(c)
  { value: 'mcb-d6', label: 'MCB Type D 6A', maxZs: '1.82' },
  { value: 'mcb-d10', label: 'MCB Type D 10A', maxZs: '1.09' },
  { value: 'mcb-d16', label: 'MCB Type D 16A', maxZs: '0.68' },
  { value: 'mcb-d20', label: 'MCB Type D 20A', maxZs: '0.55' },
  { value: 'mcb-d25', label: 'MCB Type D 25A', maxZs: '0.44' },
  { value: 'mcb-d32', label: 'MCB Type D 32A', maxZs: '0.34' },
  { value: 'mcb-d40', label: 'MCB Type D 40A', maxZs: '0.27' },
  { value: 'mcb-d50', label: 'MCB Type D 50A', maxZs: '0.22' },
  // BS 88-3 Fuses (0.4s) - Table 41.2(b)
  { value: 'fuse-5', label: 'BS 88-3 5A Fuse', maxZs: '8.89' },
  { value: 'fuse-6', label: 'BS 88-3 6A Fuse', maxZs: '7.42' },
  { value: 'fuse-10', label: 'BS 88-3 10A Fuse', maxZs: '4.26' },
  { value: 'fuse-16', label: 'BS 88-3 16A Fuse', maxZs: '2.45' },
  { value: 'fuse-20', label: 'BS 88-3 20A Fuse', maxZs: '1.77' },
  { value: 'fuse-25', label: 'BS 88-3 25A Fuse', maxZs: '1.35' },
  { value: 'fuse-32', label: 'BS 88-3 32A Fuse', maxZs: '1.00' }
];

export const testMethods = [
  { value: 'live', label: 'Live Testing (Standard Method)' },
  { value: 'dead', label: 'Dead Testing (Alternative)' }
];
