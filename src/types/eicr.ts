
export type FaultCode = 'C1' | 'C2' | 'C3' | 'FI';

export type CircuitType = 
  | 'lighting'
  | 'power'
  | 'cooker'
  | 'shower'
  | 'immersion'
  | 'heating'
  | 'smoke-alarm'
  | 'security'
  | 'other';

export interface EICRFault {
  id: string;
  circuitRef: string;
  circuitType: CircuitType;
  faultCode: FaultCode;
  description: string;
  location: string;
  remedy: string;
  stepId?: string; // Link to test step that generated this fault
  timestamp: Date;
}

export interface EICRCircuit {
  ref: string;
  type: CircuitType;
  description: string;
  protective_device: string;
  rating: string;
  conductor_csa: string;
  earthing_conductor: string;
  max_zs: number;
  measured_zs?: number;
  insulation_resistance?: number;
  polarity_correct?: boolean;
  rcd_operation?: number;
  continuity_cpc?: number;
  overall_condition: 'satisfactory' | 'unsatisfactory';
}

export interface EICRReport {
  id: string;
  installation_details: {
    address: string;
    description: string;
    estimated_age: string;
    evidence_of_alterations: boolean;
    earthing_arrangements: string;
    supply_characteristics: string;
    main_switch_rating: string;
    main_earthing_conductor: string;
    main_bonding_conductors: string;
  };
  inspection_details: {
    extent_of_inspection: string;
    limitations: string[];
    departures_from_bs7671: string[];
    risk_assessment_required: boolean;
  };
  circuits: EICRCircuit[];
  faults: EICRFault[];
  overall_assessment: 'satisfactory' | 'unsatisfactory';
  next_inspection_date?: Date;
  inspector_details: {
    name: string;
    qualification: string;
    signature_date: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export interface EICRSession {
  eicr_report: EICRReport;
  auto_populate: boolean;
  current_circuit?: string;
}
