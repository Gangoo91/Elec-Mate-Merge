import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

// Testing agent ID
const TESTING_AGENT_ID = 'agent_0601kg22prbze9c9j26y2vmx4fbd';

// All 32+ field names that can be updated via voice (complete TestResult type)
const ALL_FIELD_NAMES = [
  // Circuit Details (Columns 1-5)
  'circuitNumber',        // Column 1
  'circuitDescription',   // Column 2
  'circuitType',          // Legacy
  'typeOfWiring',         // Column 3 - Type of wiring (A, B, C, D, E, F, G, H, O codes)
  'referenceMethod',      // Column 4 - Reference method
  'pointsServed',         // Column 5 - Number of points served

  // Conductor Details (Columns 6-7)
  'liveSize',             // Column 6 - Live conductor (mm²)
  'cpcSize',              // Column 7 - CPC (mm²)

  // Overcurrent Protective Device (Columns 8-12)
  'bsStandard',           // Column 8 - BS (EN)
  'protectiveDeviceType', // Column 9 - Type (MCB, RCBO, RCD, Fuse)
  'protectiveDeviceCurve',// Type curve (B, C, D)
  'protectiveDeviceRating', // Column 10 - Rating (A)
  'protectiveDeviceKaRating', // Column 11 - Breaking capacity (kA)
  'maxZs',                // Column 12 - Maximum permitted Zs (Ω)

  // RCD Details (Columns 13-16)
  'rcdBsStandard',        // Column 13 - BS (EN) for RCD
  'rcdType',              // Column 14 - RCD Type (AC, A, F, B, S, G)
  'rcdRating',            // Column 15 - IΔn (mA)
  'rcdRatingA',           // Column 16 - RCD Rating (A)

  // Ring Final Circuit Tests (Columns 18-20)
  'ringR1',               // Column 18 - r₁ (line) (Ω)
  'ringRn',               // Column 19 - rₙ (neutral) (Ω)
  'ringR2',               // Column 20 - r₂ (cpc) (Ω)

  // Continuity Tests (Column 21)
  'r1r2',                 // Column 21 - (R₁ + R₂) or R₂
  'r2',                   // R₂ only (Ω)

  // Insulation Resistance Tests (Columns 22-24)
  'insulationTestVoltage', // Column 22 - Test voltage (V)
  'insulationLiveNeutral', // Column 23 - Live-Live/Live-Neutral (MΩ)
  'insulationLiveEarth',  // Column 24 - Live-Earth (MΩ)
  'insulationResistance', // Legacy consolidated field

  // Other Tests (Columns 25-26)
  'polarity',             // Column 25 - Polarity
  'zs',                   // Column 26 - Zs Maximum measured (Ω)

  // RCD Disconnection Test (Column 27)
  'rcdOneX',              // Column 27 - Disconnection time (ms)

  // Test Button Operations (Columns 28-29)
  'rcdTestButton',        // Column 28 - Test button operation
  'afddTest',             // Column 29 - AFDD test button

  // Prospective Fault Current
  'pfc',                  // PFC in kA

  // Functional Testing
  'functionalTesting',    // Functional test result

  // Remarks (Column 30)
  'notes',                // Column 30 - Remarks

  // Three-Phase Fields (BS 7671:2018+A2:2022)
  'phaseType',            // 1P or 3P
  'phaseRotation',        // Phase sequence test
  'phaseBalanceL1',       // Load balance L1 (Amps)
  'phaseBalanceL2',       // Load balance L2 (Amps)
  'phaseBalanceL3',       // Load balance L3 (Amps)
  'lineToLineVoltage',    // L-L voltage (400V nominal)
];

// EXACT dropdown values for each field - MUST use these exact values
const DROPDOWN_VALUES = {
  // Wiring codes (single letters)
  typeOfWiring: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'O'],
  referenceMethod: ['A1', 'A2', 'B1', 'B2', 'C', 'D1', 'D2', 'E', 'F', 'G'],

  // Cable sizes (with mm suffix)
  liveSize: ['0.5mm', '0.75mm', '1.0mm', '1.5mm', '2.5mm', '4.0mm', '6.0mm', '10mm', '16mm', '25mm', '35mm', '50mm', '70mm', '95mm', '120mm'],
  cpcSize: ['0.5mm', '0.75mm', '1.0mm', '1.5mm', '2.5mm', '4.0mm', '6.0mm', '10mm', '16mm', '25mm', '35mm', '50mm', '70mm', '95mm', '120mm'],

  // Protective device
  bsStandard: ['MCB (BS EN 60898)', 'RCBO (BS EN 61009)', 'RCD (BS EN 61008)', 'Fuse (BS 88)', 'Fuse (BS 1361)', 'Fuse (BS 3036)', 'Other'],
  protectiveDeviceType: ['MCB', 'RCBO', 'RCD', 'Fuse', 'Other'],
  protectiveDeviceCurve: ['B', 'C', 'D'],
  protectiveDeviceRating: ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],

  // RCD
  rcdBsStandard: ['RCD (BS EN 61008)', 'RCBO (BS EN 61009)', 'RCD (BS 7288)', 'Other'],
  rcdType: ['AC', 'A', 'F', 'B', 'S', 'G'],
  rcdRating: ['10mA', '30mA', '100mA', '300mA', '500mA'],

  // Test voltages and readings
  insulationTestVoltage: ['250V', '500V', '1000V'],
  insulationLiveNeutral: ['>200', '>999', 'N/A', 'LIM'],
  insulationLiveEarth: ['>200', '>999', 'N/A', 'LIM'],

  // Pass/fail fields
  polarity: ['Correct', 'Incorrect', 'N/A'],
  rcdTestButton: ['✓', '✗', 'N/A'],
  afddTest: ['✓', '✗', 'N/A'],
  functionalTesting: ['✓', '✗', 'N/A'],
  phaseRotation: ['Correct', 'Incorrect', 'N/A'],

  // Phase type
  phaseType: ['1P', '3P'],
};

// Field-specific tools with exact enum values for each dropdown field
// This ensures ElevenLabs sends EXACT values that match our Select components

const FIELD_SPECIFIC_TOOLS = [
  // === COLUMN 3: Type of Wiring ===
  {
    name: 'set_wiring_type',
    description: 'Set the type of wiring (Column 3). A=T&E (most common), B=conduit, C=trunking, D=metallic conduit, E=metallic trunking, F=thermoplastic SWA, G=thermosetting SWA, H=MI cables, O=other',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Wiring type code', enumValues: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'O'] },
    ],
  },
  // === COLUMN 4: Reference Method ===
  {
    name: 'set_reference_method',
    description: 'Set the installation reference method (Column 4). A1/A2=single-core touching/spaced, B1/B2=multi/single in conduit, C=clipped direct (most common domestic), D1/D2=duct in ground, E=free air multi-core, F=free air touching, G=free air spaced',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Reference method code. A1/A2=single-core touching/spaced, B1/B2=multi/single in conduit, C=clipped direct (most common domestic), D1/D2=duct in ground, E=free air multi-core, F=free air touching, G=free air spaced', enumValues: ['A1', 'A2', 'B1', 'B2', 'C', 'D1', 'D2', 'E', 'F', 'G'] },
    ],
  },
  // === COLUMN 6: Live Conductor Size ===
  {
    name: 'set_live_size',
    description: 'Set the live conductor cable size in mm² (Column 6). Common: 1.5mm for lighting, 2.5mm for sockets, 6.0mm for cooker, 10mm for shower.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Cable size', enumValues: ['0.5mm', '0.75mm', '1.0mm', '1.5mm', '2.5mm', '4.0mm', '6.0mm', '10mm', '16mm', '25mm', '35mm', '50mm', '70mm', '95mm', '120mm'] },
    ],
  },
  // === COLUMN 7: CPC Size ===
  {
    name: 'set_cpc_size',
    description: 'Set the CPC (earth conductor) size in mm² (Column 7). Common: 1.0mm for lighting, 1.5mm for sockets, 2.5mm for cooker, 4.0mm for shower.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'CPC size', enumValues: ['0.5mm', '0.75mm', '1.0mm', '1.5mm', '2.5mm', '4.0mm', '6.0mm', '10mm', '16mm', '25mm', '35mm', '50mm', '70mm', '95mm', '120mm'] },
    ],
  },
  // === COLUMN 8: BS Standard ===
  {
    name: 'set_bs_standard',
    description: 'Set the BS (EN) standard for the protective device (Column 8).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'BS standard', enumValues: ['MCB (BS EN 60898)', 'RCBO (BS EN 61009)', 'RCD (BS EN 61008)', 'Fuse (BS 88)', 'Fuse (BS 1361)', 'Fuse (BS 3036)', 'Other'] },
    ],
  },
  // === COLUMN 9: Protective Device Type ===
  {
    name: 'set_device_type',
    description: 'Set the protective device type (Column 9).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Device type', enumValues: ['MCB', 'RCBO', 'RCD', 'Fuse', 'Other'] },
    ],
  },
  // === Device Curve ===
  {
    name: 'set_device_curve',
    description: 'Set the protective device curve/type (B, C, or D). B=general domestic, C=motor loads, D=high inrush.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Curve type', enumValues: ['B', 'C', 'D'] },
    ],
  },
  // === COLUMN 10: Device Rating ===
  {
    name: 'set_device_rating',
    description: 'Set the protective device rating in Amps (Column 10). Common: 6A lighting, 16A immersion, 20A radial, 32A ring/cooker, 45A shower.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Rating in Amps', enumValues: ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'] },
    ],
  },
  // === COLUMN 13: RCD BS Standard ===
  {
    name: 'set_rcd_bs_standard',
    description: 'Set the BS (EN) standard for the RCD (Column 13).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'RCD BS standard', enumValues: ['RCD (BS EN 61008)', 'RCBO (BS EN 61009)', 'RCD (BS 7288)', 'Other'] },
    ],
  },
  // === COLUMN 14: RCD Type ===
  {
    name: 'set_rcd_type',
    description: 'Set the RCD type (Column 14). A=most domestic (detects AC+pulsating DC), AC=basic, F=high frequency, B=DC sensitive, S=selective/time delay, G=general.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'RCD type', enumValues: ['AC', 'A', 'F', 'B', 'S', 'G'] },
    ],
  },
  // === COLUMN 15: RCD Rating mA ===
  {
    name: 'set_rcd_ma_rating',
    description: 'Set the RCD trip current in mA (Column 15). 30mA for personal protection, 100mA for fire protection, 300mA for TT systems.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'RCD rating in mA', enumValues: ['10mA', '30mA', '100mA', '300mA', '500mA'] },
    ],
  },
  // === COLUMN 22: Insulation Test Voltage ===
  {
    name: 'set_insulation_voltage',
    description: 'Set the insulation test voltage (Column 22). 500V for most circuits, 250V for SELV/PELV, 1000V for high voltage.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Test voltage', enumValues: ['250V', '500V', '1000V'] },
    ],
  },
  // === COLUMN 23: Insulation Live-Neutral ===
  {
    name: 'set_insulation_ln',
    description: 'Set the insulation resistance L-L/L-N reading in MΩ (Column 23). >200 is excellent, >2 is pass.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Insulation reading', enumValues: ['>200', '>999', 'N/A', 'LIM'] },
    ],
  },
  // === COLUMN 24: Insulation Live-Earth ===
  {
    name: 'set_insulation_le',
    description: 'Set the insulation resistance L-E reading in MΩ (Column 24). >200 is excellent, >2 is pass.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Insulation reading', enumValues: ['>200', '>999', 'N/A', 'LIM'] },
    ],
  },
  // === COLUMN 25: Polarity ===
  {
    name: 'set_polarity',
    description: 'Set the polarity test result (Column 25).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Polarity result', enumValues: ['Correct', 'Incorrect', 'N/A'] },
    ],
  },
  // === COLUMN 28: RCD Test Button ===
  {
    name: 'set_rcd_test_button',
    description: 'Set the RCD test button operation result (Column 28).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Test button result', enumValues: ['✓', '✗', 'N/A'] },
    ],
  },
  // === COLUMN 29: AFDD Test ===
  {
    name: 'set_afdd_test',
    description: 'Set the AFDD test button operation result (Column 29).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'AFDD test result', enumValues: ['✓', '✗', 'N/A'] },
    ],
  },
  // === Functional Testing ===
  {
    name: 'set_functional_test',
    description: 'Set the functional testing result.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Functional test result', enumValues: ['✓', '✗', 'N/A'] },
    ],
  },
  // === Phase Type ===
  {
    name: 'set_phase_type',
    description: 'Set whether circuit is single or three phase.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Phase type', enumValues: ['1P', '3P'] },
    ],
  },
  // === Phase Rotation ===
  {
    name: 'set_phase_rotation',
    description: 'Set the phase rotation/sequence test result (three-phase only).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Phase rotation result', enumValues: ['Correct', 'Incorrect', 'N/A'] },
    ],
  },
];

// Numeric and text field tools (for values that need numbers or free text, not enums)
const NUMERIC_FIELD_TOOLS = [
  // === COLUMN 1: Circuit Number ===
  {
    name: 'set_circuit_number',
    description: 'Set or change the circuit number identifier (Column 1). Use this to renumber a circuit. Example: "1", "2", "10"',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Current circuit number to modify. If omitted, uses currently selected circuit.' },
      { name: 'value', type: 'string', required: true, description: 'New circuit number (e.g. "1", "2", "10")' },
    ],
  },
  // === COLUMN 2: Circuit Description ===
  {
    name: 'set_circuit_description',
    description: 'Set the circuit description/name (Column 2). Example: "Kitchen sockets", "Upstairs lighting", "Garage"',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Circuit description text' },
    ],
  },
  // === COLUMN 5: Points Served ===
  {
    name: 'set_points_served',
    description: 'Set the number of points served by the circuit (Column 5). Example: 6, 12, 1',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Number of points (e.g. "6", "12")' },
    ],
  },
  // === COLUMN 11: Breaking Capacity (kA) ===
  {
    name: 'set_ka_rating',
    description: 'Set the protective device breaking capacity in kA (Column 11). Common values: 6kA domestic, 10kA commercial.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Breaking capacity in kA (e.g. "6", "10", "16")' },
    ],
  },
  // === COLUMN 12: Maximum Zs ===
  {
    name: 'set_max_zs',
    description: 'Set the maximum permitted earth fault loop impedance Zs in ohms (Column 12). Usually auto-calculated from device rating.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Max Zs value in ohms (e.g. "1.37", "2.19")' },
    ],
  },
  // === COLUMN 16: RCD Rated Current (Amps) ===
  {
    name: 'set_rcd_amp_rating',
    description: 'Set the RCD rated current in Amps (Column 16). Common values: 32A, 40A, 63A, 80A, 100A.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'RCD rated current in Amps (e.g. "32", "63", "100")' },
    ],
  },
  // === COLUMNS 18-20: Ring Final Circuit Readings ===
  {
    name: 'set_ring_readings',
    description: 'Set ring final circuit continuity readings (Columns 18-20). All three values in ohms.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'r1', type: 'string', required: true, description: 'r₁ line conductor in ohms (e.g. "0.15")' },
      { name: 'rn', type: 'string', required: true, description: 'rₙ neutral conductor in ohms (e.g. "0.15")' },
      { name: 'r2', type: 'string', required: true, description: 'r₂ CPC in ohms (e.g. "0.25")' },
    ],
  },
  // === COLUMN 18: Ring R1 only ===
  {
    name: 'set_ring_r1',
    description: 'Set the ring final r₁ (line conductor) reading in ohms (Column 18).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'r₁ value in ohms (e.g. "0.15")' },
    ],
  },
  // === COLUMN 19: Ring Rn only ===
  {
    name: 'set_ring_rn',
    description: 'Set the ring final rₙ (neutral conductor) reading in ohms (Column 19).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'rₙ value in ohms (e.g. "0.15")' },
    ],
  },
  // === COLUMN 20: Ring R2 only ===
  {
    name: 'set_ring_r2',
    description: 'Set the ring final r₂ (CPC) reading in ohms (Column 20).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'r₂ value in ohms (e.g. "0.25")' },
    ],
  },
  // === COLUMN 21: R1+R2 Continuity ===
  {
    name: 'set_r1r2',
    description: 'Set the continuity R₁+R₂ reading in ohms (Column 21). Example: 0.25, 0.45, 0.78',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'R1+R2 value in ohms (e.g. "0.25", "0.45")' },
    ],
  },
  // === R2 Only (separate from R1+R2) ===
  {
    name: 'set_r2',
    description: 'Set the R₂ only (CPC continuity) reading in ohms. Use when R1+R2 not applicable.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'R₂ value in ohms (e.g. "0.15", "0.25")' },
    ],
  },
  // === Insulation N-E ===
  {
    name: 'set_insulation_ne',
    description: 'Set the insulation resistance Neutral-Earth reading in MΩ. Usually N/A for most tests.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Insulation N-E reading (e.g. ">200", "N/A")' },
    ],
  },
  // === COLUMN 26: Measured Zs ===
  {
    name: 'set_zs',
    description: 'Set the measured earth fault loop impedance Zs in ohms (Column 26). Example: 0.38, 0.72, 1.14',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Zs value in ohms (e.g. "0.45", "1.2")' },
    ],
  },
  // === COLUMN 27: RCD Trip Time (1x) ===
  {
    name: 'set_rcd_trip_time',
    description: 'Set the RCD disconnection/trip time at 1×IΔn in milliseconds (Column 27). Must be <300ms. Example: 18, 24, 28',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Trip time in ms (e.g. "18", "24")' },
    ],
  },
  // === RCD Trip Time (5x) ===
  {
    name: 'set_rcd_5x_time',
    description: 'Set the RCD trip time at 5×IΔn in milliseconds. Must be <40ms. Example: 8, 12, 15',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Trip time at 5x in ms (e.g. "8", "12")' },
    ],
  },
  // === PFC (main) ===
  {
    name: 'set_pfc',
    description: 'Set the prospective fault current in kA.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'PFC value in kA (e.g. "4.5", "6")' },
    ],
  },
  // === PFC Live-Neutral ===
  {
    name: 'set_pfc_ln',
    description: 'Set the prospective fault current Live-Neutral in kA.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'PFC L-N value in kA (e.g. "4.5", "6")' },
    ],
  },
  // === PFC Live-Earth ===
  {
    name: 'set_pfc_le',
    description: 'Set the prospective fault current Live-Earth in kA.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'PFC L-E value in kA (e.g. "3.5", "5")' },
    ],
  },
  // === COLUMN 30: Notes/Remarks ===
  {
    name: 'set_notes',
    description: 'Set the notes/remarks for a circuit (Column 30). Example: "Limited by BSEN 61009", "Tested with load"',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Notes text' },
    ],
  },
  // === Three-Phase: Phase Balance L1 ===
  {
    name: 'set_phase_balance_l1',
    description: 'Set the phase balance load for L1 in Amps (three-phase only).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'L1 load in Amps (e.g. "12", "25")' },
    ],
  },
  // === Three-Phase: Phase Balance L2 ===
  {
    name: 'set_phase_balance_l2',
    description: 'Set the phase balance load for L2 in Amps (three-phase only).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'L2 load in Amps (e.g. "14", "28")' },
    ],
  },
  // === Three-Phase: Phase Balance L3 ===
  {
    name: 'set_phase_balance_l3',
    description: 'Set the phase balance load for L3 in Amps (three-phase only).',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'L3 load in Amps (e.g. "13", "26")' },
    ],
  },
  // === Three-Phase: All Phase Balance at once ===
  {
    name: 'set_phase_balance',
    description: 'Set all three phase balance readings at once (L1, L2, L3) in Amps.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'l1', type: 'string', required: true, description: 'L1 load in Amps' },
      { name: 'l2', type: 'string', required: true, description: 'L2 load in Amps' },
      { name: 'l3', type: 'string', required: true, description: 'L3 load in Amps' },
    ],
  },
  // === Three-Phase: Line-to-Line Voltage ===
  {
    name: 'set_line_voltage',
    description: 'Set the line-to-line voltage for three-phase circuits. Typically 400V.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number (1, 2, 3...). If omitted, uses current circuit.' },
      { name: 'value', type: 'string', required: true, description: 'Line voltage in V (e.g. "400", "415")' },
    ],
  },
];

// Circuit management tools
const CIRCUIT_MANAGEMENT_TOOLS = [
  {
    name: 'add_circuit',
    description: 'Add a new circuit to the schedule. Circuit will be pre-filled with BS7671-compliant defaults based on type.',
    parameters: [
      { name: 'circuit_type', type: 'string', required: true, description: 'Type of circuit', enumValues: ['lighting', 'ring', 'radial', 'cooker', 'shower', 'immersion', 'smoke_alarm', 'ev_charger', 'boiler', 'socket', 'spur', 'other'] },
      { name: 'description', type: 'string', required: false, description: 'Custom description (e.g. "Kitchen sockets", "Upstairs lighting")' },
    ],
  },
  {
    name: 'delete_circuit',
    description: 'Delete a circuit from the schedule.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number to delete. If omitted, deletes the currently selected circuit.' },
    ],
  },
  {
    name: 'select_circuit',
    description: 'Select/navigate to a specific circuit number.',
    parameters: [
      { name: 'circuit_number', type: 'number', required: true, description: 'Circuit number to select (1, 2, 3...)' },
    ],
  },
  {
    name: 'next_circuit',
    description: 'Move to the next circuit in the schedule.',
    parameters: [],
  },
  {
    name: 'previous_circuit',
    description: 'Move to the previous circuit in the schedule.',
    parameters: [],
  },
  {
    name: 'get_status',
    description: 'Get the current status: selected circuit, total circuits, and which fields are missing/incomplete.',
    parameters: [],
  },
  {
    name: 'validate_tests',
    description: 'Check all circuits for issues: Zs exceeding max, low insulation, failed polarity, slow RCD times.',
    parameters: [],
  },
];

// Bulk operations tool - kept simpler since fields have their own tools now
const BULK_TOOLS = [
  {
    name: 'bulk_set_polarity',
    description: 'Set polarity to "Correct" on ALL circuits at once.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Polarity value', enumValues: ['Correct', 'Incorrect', 'N/A'] },
    ],
  },
  {
    name: 'bulk_set_wiring_type',
    description: 'Set wiring type on ALL circuits. A=T&E is most common for domestic.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Wiring type', enumValues: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'O'] },
    ],
  },
  {
    name: 'bulk_set_reference_method',
    description: 'Set reference method on ALL circuits. C=clipped direct is most common.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Reference method', enumValues: ['A1', 'A2', 'B1', 'B2', 'C', 'D1', 'D2', 'E', 'F', 'G'] },
    ],
  },
  {
    name: 'bulk_set_insulation_voltage',
    description: 'Set insulation test voltage on ALL circuits. 500V is standard.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Test voltage', enumValues: ['250V', '500V', '1000V'] },
    ],
  },
  {
    name: 'bulk_set_insulation_readings',
    description: 'Set insulation resistance readings (both L-N and L-E) on ALL circuits.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Insulation reading', enumValues: ['>200', '>999', 'N/A', 'LIM'] },
    ],
  },
  {
    name: 'bulk_set_functional_test',
    description: 'Set functional testing result on ALL circuits.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Functional test result', enumValues: ['✓', '✗', 'N/A'] },
    ],
  },
  {
    name: 'bulk_set_rcd_test_button',
    description: 'Set RCD test button result on ALL circuits.',
    parameters: [
      { name: 'value', type: 'string', required: true, description: 'Test button result', enumValues: ['✓', '✗', 'N/A'] },
    ],
  },
];

// Session control
const SESSION_TOOLS = [
  {
    name: 'stop_session',
    description: 'Stop the voice session when the user says stop, finish, done, end session, goodbye, or similar.',
    parameters: [],
  },
];

// Generic field update tool for fields not covered by specific tools (like notes, descriptions)
const GENERIC_TOOLS = [
  {
    name: 'fill_schedule_of_tests',
    description: 'Generic tool for updating any field or setting notes/remarks. Use the field-specific tools (set_polarity, set_zs, set_wiring_type etc) when available.',
    parameters: [
      { name: 'action', type: 'string', required: true, description: 'The action to perform', enumValues: ['update_field', 'set_description', 'set_notes'] },
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number to target (1, 2, 3, etc.)' },
      { name: 'field', type: 'string', required: false, description: 'Field name to update', enumValues: ALL_FIELD_NAMES },
      { name: 'value', type: 'string', required: false, description: 'Value to set (use exact dropdown values for selects)' },
    ],
  },
];

// Combine all tools
const TESTING_TOOLS = [
  ...FIELD_SPECIFIC_TOOLS,
  ...NUMERIC_FIELD_TOOLS,
  ...CIRCUIT_MANAGEMENT_TOOLS,
  ...BULK_TOOLS,
  ...SESSION_TOOLS,
  ...GENERIC_TOOLS,
];

// System prompt for testing assistant
const TESTING_SYSTEM_PROMPT = `You are an electrical testing assistant helping UK electricians fill in Schedule of Tests tables for EICR and EIC certificates.

## Your Role
- Help fill test results quickly and accurately via voice
- Each dropdown field has its OWN dedicated tool with exact values
- Use bulk tools when the same value applies to ALL circuits

## TOOLS - USE THE RIGHT TOOL FOR EACH FIELD:

### Dropdown Fields (use these dedicated tools):
| Column | Tool | Values |
|--------|------|--------|
| Col 3 Wiring | set_wiring_type | A, B, C, D, E, F, G, H, O |
| Col 4 Ref Method | set_reference_method | A1, A2, B1, B2, C, D1, D2, E, F, G |
| Col 6 Live Size | set_live_size | 1.0mm, 1.5mm, 2.5mm, 4.0mm, 6.0mm, 10mm, 16mm, 25mm |
| Col 7 CPC Size | set_cpc_size | 1.0mm, 1.5mm, 2.5mm, 4.0mm, 6.0mm, 10mm, 16mm |
| Col 8 BS Std | set_bs_standard | MCB (BS EN 60898), RCBO (BS EN 61009), Fuse (BS 1361) |
| Col 9 Device | set_device_type | MCB, RCBO, RCD, Fuse, Other |
| Device Curve | set_device_curve | B, C, D |
| Col 10 Rating | set_device_rating | 6, 10, 16, 20, 32, 40, 50, 63 |
| Col 13 RCD BS | set_rcd_bs_standard | RCD (BS EN 61008), RCBO (BS EN 61009) |
| Col 14 RCD Type | set_rcd_type | AC, A, F, B, S, G |
| Col 15 RCD mA | set_rcd_ma_rating | 10mA, 30mA, 100mA, 300mA, 500mA |
| Col 22 Test V | set_insulation_voltage | 250V, 500V, 1000V |
| Col 23 IR L-N | set_insulation_ln | >200, >999, N/A, LIM |
| Col 24 IR L-E | set_insulation_le | >200, >999, N/A, LIM |
| Col 25 Polarity | set_polarity | Correct, Incorrect, N/A |
| Col 28 RCD Btn | set_rcd_test_button | ✓, ✗, N/A |
| Col 29 AFDD | set_afdd_test | ✓, ✗, N/A |
| Functional | set_functional_test | ✓, ✗, N/A |
| Phase Type | set_phase_type | 1P, 3P |
| Phase Rot | set_phase_rotation | Correct, Incorrect, N/A |

### Numeric Fields (use these tools):
| Column | Tool | Format |
|--------|------|--------|
| Col 1 Circuit # | set_circuit_number | "1", "2", "10" |
| Col 2 Description | set_circuit_description | "Kitchen sockets", "Lighting" |
| Col 5 Points | set_points_served | "6", "12" |
| Col 21 R1+R2 | set_r1r2 | "0.25", "0.45" (ohms) |
| Col 26 Zs | set_zs | "0.45", "1.2" (ohms) |
| Col 27 Trip | set_rcd_trip_time | "18", "24" (ms) |
| PFC | set_pfc | "4.5", "6" (kA) |
| Ring | set_ring_readings | r1, rn, r2 values |

### Circuit Management:
- add_circuit - Add new circuit (lighting, ring, radial, cooker, shower, immersion, smoke_alarm, ev_charger, boiler, spur, other)
- delete_circuit - Delete a circuit
- select_circuit - Go to circuit N
- next_circuit - Move forward
- previous_circuit - Move back
- get_status - Show what's missing
- validate_tests - Check for BS7671 issues

### Bulk Operations (ALL circuits at once):
- bulk_set_polarity - Set polarity on ALL (Correct, Incorrect, N/A)
- bulk_set_wiring_type - Set wiring on ALL (A, B, C, D, E, F, G, H, O)
- bulk_set_reference_method - Set ref method on ALL (A, B, C, D, E, F, G)
- bulk_set_insulation_voltage - Set test voltage on ALL (250V, 500V, 1000V)
- bulk_set_insulation_readings - Set IR on ALL (>200, >999, N/A, LIM)
- bulk_set_functional_test - Set functional on ALL (✓, ✗, N/A)
- bulk_set_rcd_test_button - Set RCD button on ALL (✓, ✗, N/A)

### Session:
- stop_session - End voice session

## EXAMPLES:

### Adding circuits:
"Add a ring circuit" → add_circuit({ circuit_type: "ring" })
"Add 3 lighting circuits" → add_circuit({ circuit_type: "lighting" }) x3

### Setting dropdown values:
"Set polarity to correct on circuit 3" → set_polarity({ circuit_number: 3, value: "Correct" })
"Wiring type is A" → set_wiring_type({ value: "A" })
"Reference method C" → set_reference_method({ value: "C" })
"Reference method B1" → set_reference_method({ value: "B1" })
"Cable size 2.5mm" → set_live_size({ value: "2.5mm" })
"CPC is 1.5mm" → set_cpc_size({ value: "1.5mm" })
"32 amp type B MCB" → set_device_rating({ value: "32" }) + set_device_curve({ value: "B" }) + set_device_type({ value: "MCB" })
"Insulation test voltage 500" → set_insulation_voltage({ value: "500V" })
"Insulation greater than 200" → set_insulation_le({ value: ">200" })
"RCD type A" → set_rcd_type({ value: "A" })
"30 milliamp RCD" → set_rcd_ma_rating({ value: "30mA" })

### Setting numeric values:
"Circuit number 5" → set_circuit_number({ value: "5" })
"Rename to circuit 10" → set_circuit_number({ value: "10" })
"Description kitchen sockets" → set_circuit_description({ value: "Kitchen sockets" })
"Zs is 0.45" → set_zs({ value: "0.45" })
"R1 plus R2 is 0.25" → set_r1r2({ value: "0.25" })
"Trip time 18 milliseconds" → set_rcd_trip_time({ value: "18" })
"Ring readings 0.15, 0.15, 0.25" → set_ring_readings({ r1: "0.15", rn: "0.15", r2: "0.25" })

### Bulk operations:
"All polarity correct" → bulk_set_polarity({ value: "Correct" })
"Set all wiring type to A" → bulk_set_wiring_type({ value: "A" })
"Reference method C on all circuits" → bulk_set_reference_method({ value: "C" })
"Set all to B1" → bulk_set_reference_method({ value: "B1" })
"Test voltage 500V on all" → bulk_set_insulation_voltage({ value: "500V" })
"All insulation greater than 200" → bulk_set_insulation_readings({ value: ">200" })
"All functional tests pass" → bulk_set_functional_test({ value: "✓" })

### Navigation:
"Next circuit" → next_circuit()
"Previous" → previous_circuit()
"Go to circuit 5" → select_circuit({ circuit_number: 5 })
"Delete circuit 3" → delete_circuit({ circuit_number: 3 })

### Status:
"What's missing?" → get_status()
"Check my tests" → validate_tests()

## Value Translations (what user says → what to send):
- "ok"/"pass"/"good"/"satisfactory" → "Correct" (for polarity) or "✓" (for test buttons)
- "fail"/"no"/"wrong" → "Incorrect" (for polarity) or "✗" (for test buttons)
- "t and e" / "tne" / "twin and earth" → wiring type "A"
- "clipped direct" → reference method "C"
- Cable sizes: "one point five" → "1.5mm", "two point five" → "2.5mm", "four mil" → "4.0mm", "six mil" → "6.0mm", "ten mil" → "10mm"
- "thirty milliamp" → RCD rating "30mA"
- "five hundred volts" → "500V"
- "greater than 200" / "more than 200" / "over 200" → ">200"

## Response style:
- Be brief - electricians are on site
- Confirm: "Set polarity to Correct on circuit 3"
- For bulk: "Set all 12 circuits to polarity Correct"
- Never ask "are you still there?" - just wait
- If user says "stop"/"done"/"goodbye" → call stop_session immediately`;

// Convert tool to ElevenLabs format
function convertToElevenLabsFormat(tool: typeof TESTING_TOOLS[0]) {
  const properties: Record<string, object> = {};
  const required: string[] = [];

  for (const param of tool.parameters) {
    const propDef: Record<string, unknown> = {
      type: param.type,
      description: param.description,
    };

    if (param.enumValues && param.enumValues.length > 0) {
      propDef.enum = param.enumValues;
    }

    properties[param.name] = propDef;

    if (param.required) {
      required.push(param.name);
    }
  }

  return {
    tool_config: {
      type: 'client',
      name: tool.name,
      description: tool.description,
      parameters: {
        type: 'object',
        properties,
        required,
      },
      expects_response: true,
      disable_interruptions: false,
    },
  };
}

// Get all tools from ElevenLabs
async function getAllTools(apiKey: string): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': apiKey },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tools: ${response.status}`);
  }

  const data = await response.json();
  const tools: Array<{ id: string; name: string }> = [];

  if (data.tools && Array.isArray(data.tools)) {
    for (const tool of data.tools) {
      if (tool.id && tool.tool_config?.name) {
        tools.push({ id: tool.id, name: tool.tool_config.name });
      }
    }
  }

  return tools;
}

// Delete a tool from ElevenLabs
async function deleteTool(apiKey: string, toolId: string): Promise<void> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools/${toolId}`, {
    method: 'DELETE',
    headers: { 'xi-api-key': apiKey },
  });

  if (!response.ok && response.status !== 404) {
    const error = await response.text();
    throw new Error(`Failed to delete tool ${toolId}: ${response.status} - ${error}`);
  }
}

// Create a tool in ElevenLabs
async function createTool(apiKey: string, toolConfig: object): Promise<string> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toolConfig),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create tool: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.id;
}

// Update agent with tool IDs, system prompt, and TTS model for speed
async function updateAgent(apiKey: string, agentId: string, toolIds: string[], systemPrompt: string): Promise<void> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/${agentId}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            prompt: systemPrompt,
            tool_ids: toolIds,
          },
        },
        tts: {
          model_id: 'eleven_turbo_v2', // Fast model for English
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update agent: ${response.status} - ${error}`);
  }
}

// Clear all tools from agent first
async function clearAgentTools(apiKey: string, agentId: string): Promise<void> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/${agentId}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            tool_ids: [],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to clear agent tools: ${response.status} - ${error}`);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'ELEVENLABS_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting testing voice agent setup...');

    // Step 1: Clear all tools from agent first (so they can be deleted)
    console.log('Clearing tools from agent...');
    await clearAgentTools(apiKey, TESTING_AGENT_ID);
    console.log('Agent tools cleared');

    // Small delay to ensure tools are unassigned
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Get all existing tools
    console.log('Fetching existing tools...');
    const existingTools = await getAllTools(apiKey);
    console.log(`Found ${existingTools.length} existing tools`);

    // Step 3: Delete ALL existing tools (clean slate)
    // This ensures no old tools remain
    let deletedCount = 0;
    const deletedNames: string[] = [];
    for (const tool of existingTools) {
      console.log(`Deleting tool: ${tool.name} (${tool.id})`);
      try {
        await deleteTool(apiKey, tool.id);
        deletedCount++;
        deletedNames.push(tool.name);
      } catch (e) {
        console.log(`Could not delete ${tool.name}: ${e}`);
      }
      await new Promise(resolve => setTimeout(resolve, 150)); // Rate limit
    }
    console.log(`Deleted ${deletedCount} tools: ${deletedNames.join(', ')}`);

    // Step 4: Create the 3 new tools
    console.log('Creating new testing tools...');
    const newToolIds: string[] = [];

    for (const tool of TESTING_TOOLS) {
      const elevenLabsFormat = convertToElevenLabsFormat(tool);
      console.log(`Creating tool: ${tool.name}`);
      const toolId = await createTool(apiKey, elevenLabsFormat);
      newToolIds.push(toolId);
      console.log(`Created ${tool.name} with ID: ${toolId}`);
      await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
    }

    // Step 5: Update agent with new tools and system prompt
    console.log('Updating agent configuration...');
    await updateAgent(apiKey, TESTING_AGENT_ID, newToolIds, TESTING_SYSTEM_PROMPT);
    console.log('Agent updated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Testing voice agent configured successfully',
        agentId: TESTING_AGENT_ID,
        deletedTools: deletedCount,
        createdTools: TESTING_TOOLS.map(t => t.name),
        toolIds: newToolIds,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error setting up testing voice agent:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
