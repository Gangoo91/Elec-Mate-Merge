export interface EICCircuitData {
  circuitNumber: string;
  phaseType: "single" | "three";
  circuitDescription: string;
  referenceMethod: string;
  pointsServed: string;
  liveSize: string;
  cpcSize: string;
  protectiveDeviceType: string;
  protectiveDeviceCurve: string;
  protectiveDeviceRating: string;
  protectiveDeviceKaRating: string;
  bsStandard: string;
  
  // Expected values (pre-filled for guidance)
  r1r2: string; // Expected R1+R2
  ringR1?: string;
  ringRn?: string;
  ringR2?: string;
  ringContinuityLive?: string;
  ringContinuityNeutral?: string;
  insulationTestVoltage: string;
  insulationResistance: string; // Expected minimum
  polarity: string; // Pre-filled as "Correct (verify on-site)"
  zs: string; // Expected Zs
  maxZs: string;
  
  // RCD fields (conditional)
  rcdRating?: string;
  rcdOneX?: string;
  rcdTestButton?: string;
  
  // AFDD (conditional)
  afddTest?: string;
  
  // PFC and functional (to be tested on-site)
  pfc: string;
  functionalTesting: string;
}

export interface EICScheduleOfTests {
  installationId: string;
  installationAddress: string;
  designerName: string;
  designDate: string;
  circuits: EICCircuitData[];
  createdAt: string;
  status: "pending" | "in-progress" | "completed";
}

export interface AgentCircuitOutput {
  circuitNumber: number;
  description: string;
  loadType: string;
  phases: "single" | "three" | "dc";
  cableSize: string;
  cpcSize: string;
  cableLength: number;
  installationMethod: string;
  protectiveDevice: string;
  protectiveDeviceRating: number;
  protectiveDeviceCurve?: string;
  protectiveDeviceKaRating?: number; // Breaking capacity in kA
  maxZs: number;
  calculatedZs?: number;
  voltageDropCompliance: boolean;
  rcdProtection?: boolean;
  rcdRating?: number; // RCD rating in mA (30, 100, 300)
  afddRequired?: boolean;
  isRingCircuit?: boolean;
  circuitTopology?: 'ring' | 'radial'; // Alternative ring circuit indicator
}
