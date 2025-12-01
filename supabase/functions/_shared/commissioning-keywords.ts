/**
 * Comprehensive Commissioning Keyword Maps
 * Pattern: Same as installation-method-core.ts
 * Used for RAG keyword extraction to improve hit rates
 */

// ============================================================================
// COMMISSIONING KEYWORDS (300+ across 10 categories)
// ============================================================================

export const COMMISSIONING_TEST_KEYWORDS = {
  visual_inspection: ['visual inspection', 'initial inspection', 'workmanship', 'damage', 'corrosion', 'mechanical damage', 'correct erection', 'identification', 'cable zones', 'safe zones', 'IP rating', 'IP2X', 'IPXXB', 'conductor terminations', 'conductor identification', 'connections', 'bonding', 'earthing arrangements', 'presence of diagrams', 'labels', 'warning notices', 'fire barriers', 'sealing', 'band II circuits', 'RCD protection', 'circuit identification'],
  
  dead_tests: ['dead testing', 'safe isolation', 'prove dead', 'continuity', 'R1+R2', 'ring continuity', 'figure of eight', 'end-to-end', 'CPC continuity', 'protective conductor', 'main bonding', 'supplementary bonding', 'link-out method', 'long lead method', 'insulation resistance', 'IR test', 'megger', '500V DC', '250V DC', '1000V DC', 'live to earth', 'between conductors', '1 MΩ', '2 MΩ', '0.5 MΩ', 'polarity', 'polarity check', 'correct polarity', 'phase identification'],
  
  live_tests: ['live testing', 'earth fault loop', 'Zs', 'Ze', 'external loop impedance', 'circuit loop impedance', 'maximum Zs', 'disconnection time', '0.4s', '5s', 'Table 41.3', 'Table 41.4', 'RCD test', 'trip time', 'trip current', '30mA', '100mA', '300mA', '0.5 I∆n', 'I∆n', '5 I∆n', '40ms', '200ms', '300ms', 'ramp test', 'PFC', 'PSCC', 'prospective fault current', 'prospective short circuit', 'fault level', 'breaking capacity', 'functional testing', 'operation', 'switching', 'interlocks'],
  
  three_phase_testing: ['phase sequence', 'phase rotation', 'L1 L2 L3', 'RYB', 'motor rotation', 'clockwise', 'anticlockwise', 'voltage balance', 'phase-to-phase', 'line voltage', '400V', '415V', 'phase-to-neutral', '230V', 'neutral current', 'current balance', 'load balance', 'three-phase IR', 'phase-to-earth IR', 'L1-L2 IR', 'L2-L3 IR', 'L3-L1 IR', 'three-phase Zs', '4-pole RCD', 'neutral disconnect']
};

export const COMMISSIONING_INSTRUMENT_KEYWORDS = {
  test_instruments: ['multifunction tester', 'MFT', 'Megger MFT1741', 'Megger MFT1731', 'Fluke 1664', 'Fluke 1663', 'Kewtech KT65', 'Kewtech KT64', 'Di-Log DL9118', 'Di-Log DL9119', 'Martindale VI13700', 'loop tester', 'earth loop tester', 'insulation tester', 'insulation resistance tester', 'RCD tester', 'low resistance ohmmeter', 'LROM', '200mA test current', 'proving unit', 'voltage indicator', 'two-pole tester', 'GS38', 'test leads', 'lead resistance', 'probe resistance', 'clamp meter', 'current clamp', 'phase rotation meter', 'socket tester', '13A socket tester'],
  
  calibration: ['calibration', 'calibrated', 'valid calibration', 'calibration certificate', '12-month calibration', 'annual calibration', 'UKAS', 'traceable', 'accuracy', 'tolerance'],
  
  instrument_settings: ['test voltage', '500V DC', '250V DC', '1000V DC', 'test current', '200mA', 'no-trip test', 'trip test', 'continuity setting', 'auto-null', 'lead compensation', 'zero reading', 'instrument zeroed']
};

export const COMMISSIONING_FAULT_KEYWORDS = {
  symptoms: ['tripping', 'RCD tripping', 'MCB tripping', 'nuisance tripping', 'intermittent fault', 'no power', 'partial loss', 'low insulation', 'high loop impedance', 'high Zs', 'incorrect polarity', 'reversed polarity', 'RCD won\'t trip', 'RCD slow', 'continuity fail', 'open circuit', 'high resistance', 'overheating', 'burning smell', 'sparking', 'flickering'],
  
  causes: ['earth fault', 'short circuit', 'insulation breakdown', 'water ingress', 'moisture', 'condensation', 'damaged cable', 'rodent damage', 'mechanical damage', 'loose connection', 'high resistance joint', 'poor termination', 'undersized cable', 'voltage drop', 'overload', 'neutral-earth fault', 'borrowed neutral', 'cross-connection', 'parallel paths', 'unintended earth path'],
  
  diagnostic_tests: ['half-split method', 'split load', 'IR test each circuit', 'IR test phase-to-phase', 'IR test phase-to-earth', 'disconnect loads', 'isolate circuits', 'test at distribution board', 'test at socket', 'test at light fitting', 'dead test', 'live test', 'continuity check', 'lead placement', 'instrument setup'],
  
  common_faults: ['RCD Type AC on EV charger', 'missing RCD', '30mA missing', 'socket without RCD', 'outdoor socket no RCD', 'borrowed neutral', 'parallel earth paths', 'TNS to TNCS upgrade', 'PME on outbuilding', 'supplementary bonding missing', 'plastic pipework', 'no main bonding', 'undersized bonding', '10mm² required', '6mm² bonding', 'high Ze', 'TT system', 'earth rod resistance', 'incorrect Zs limit', 'wrong BS 7671 table']
};

export const COMMISSIONING_SAFETY_KEYWORDS = {
  safe_isolation: ['safe isolation', 'safe isolation procedure', 'lock off', 'lockout tagout', 'LOTO', 'isolate', 'isolation', 'isolator', 'main switch', 'identify circuit', 'test', 'prove dead', 'voltage indicator', 'GS38', 'two-pole tester', 'adjacent live', 'test before and after', 'proving unit', 'lock device', 'padlock', 'warning notice', 'DANGER - MEN WORKING', 'do not switch on'],
  
  ppe: ['PPE', 'safety glasses', 'eye protection', 'insulated gloves', 'Class 0 gloves', '1000V rated', 'arc flash protection', 'safety boots', 'steel toe cap', 'insulated boots', 'hard hat', 'bump cap', 'hi-vis', 'high visibility', 'hearing protection'],
  
  hazards: ['electric shock', 'arc flash', 'thermal burn', 'fire risk', 'adjacent live', 'live parts', 'exposed live', 'working at height', 'ladder work', 'falls from height', 'manual handling', 'lifting heavy', 'dust', 'asbestos', 'confined space', 'hot work'],
  
  regulations: ['BS 7671', 'Wiring Regulations', '18th Edition', 'IET Guidance Note 3', 'GN3', 'Chapter 64', 'Regulation 537.2', 'Regulation 612', 'Regulation 643', 'EAWR', 'Electricity at Work Regulations', 'Part P', 'Building Regulations', 'CDM', 'HASWA', 'Health and Safety', 'risk assessment', 'method statement', 'RAMS', 'permit to work']
};

export const COMMISSIONING_CERTIFICATION_KEYWORDS = {
  certificate_types: ['EIC', 'electrical installation certificate', 'EICR', 'electrical installation condition report', 'Minor Works Certificate', 'MWC', 'Domestic EIC', 'Commercial EIC', 'periodic inspection', 'initial verification'],
  
  schedules: ['Schedule of Inspections', 'Schedule of Test Results', 'Circuit Details', 'Schedule 1', 'Schedule 2', 'Inspection Schedule', 'Test Schedule'],
  
  required_data: ['maximum demand', 'prospective fault current', 'external loop impedance', 'Ze', 'earthing arrangement', 'TN-S', 'TN-C-S', 'PME', 'TT', 'main bonding', 'RCD details', 'RCD rating', 'RCD type', 'Type AC', 'Type A', 'Type B', 'main switch rating', 'number of circuits', 'circuit description', 'overcurrent device', 'R1+R2', 'insulation resistance', 'polarity', 'maximum Zs', 'live Zs', 'RCD trip time'],
  
  codes: ['C1', 'C2', 'C3', 'FI', 'danger present', 'potentially dangerous', 'improvement recommended', 'further investigation', 'Code 1', 'Code 2', 'Code 3', 'unsatisfactory', 'satisfactory'],
  
  next_inspection: ['next inspection', 'periodic inspection interval', '5 years', '10 years', '3 years', 'change of occupancy', 'change of use']
};

export const COMMISSIONING_CIRCUIT_KEYWORDS = {
  ring_final: ['ring final circuit', '32A ring', 'ring continuity', 'figure of eight', 'end-to-end', 'spurs', 'unfused spur', 'fused spur', 'socket circuit', '2.5mm² ring', 'R1+R2 reading', 'divide by 4', 'ring circuit test', '100m² floor area'],
  
  radial: ['radial circuit', '20A radial', '32A radial', 'end fed', '2.5mm² radial', '4mm² radial', '16A radial'],
  
  lighting: ['lighting circuit', '6A lighting', '10A lighting', '1.5mm² lighting', '1mm² lighting', 'loop-in', 'junction box', 'switch wire', 'strapper', 'two-way switching', 'intermediate switching'],
  
  cooker: ['cooker circuit', '32A cooker', '40A cooker', '45A cooker', '6mm² cooker', '10mm² cooker', 'diversity', 'cooker control unit', 'Table 4A1'],
  
  shower: ['shower circuit', 'electric shower', '40A shower', '45A shower', '50A shower', '8.5kW', '9.5kW', '10.5kW', '6mm² shower', '10mm² shower', 'pull cord switch', 'ceiling switch'],
  
  ev_charger: ['EV charger', 'electric vehicle', '32A EV', '7kW', '7.2kW', '22kW', 'Mode 3', 'Type 2', 'tethered', 'untethered', 'RCD Type A', 'RCD Type B', '6mA DC', 'PME earthing', 'TT earthing', 'earth rod', 'PEN conductor'],
  
  fire_alarm: ['fire alarm circuit', 'smoke alarm', 'heat detector', 'FP200', 'fire resistant cable', 'MICC', 'mineral cable', 'BS 5839', 'interlinked', 'mains powered', 'battery backup'],
  
  emergency_lighting: ['emergency lighting', 'emergency exit', 'maintained', 'non-maintained', 'FP200', 'fire resistant', 'BS 5266', '3-hour duration'],
  
  three_phase: ['three-phase circuit', '400V circuit', '415V circuit', 'L1 L2 L3', 'TP&N', 'balanced load', 'phase rotation', 'motor circuit', 'DOL starter', 'star-delta']
};

export const COMMISSIONING_LOCATION_KEYWORDS = {
  domestic: ['domestic', 'dwelling', 'house', 'flat', 'bungalow', 'residential', 'home'],
  
  commercial: ['commercial', 'office', 'shop', 'retail', 'restaurant', 'pub', 'hotel', 'school', 'hospital', 'care home'],
  
  industrial: ['industrial', 'factory', 'warehouse', 'workshop', 'manufacturing'],
  
  special_locations: ['bathroom', 'Zone 0', 'Zone 1', 'Zone 2', 'swimming pool', 'sauna', 'agricultural', 'Section 701', 'Section 702', 'Section 705', 'outdoor', 'garden', 'caravan', 'marina']
};

export const COMMISSIONING_EARTHING_KEYWORDS = {
  earthing_systems: ['TN-S', 'TN-C-S', 'PME', 'protective multiple earthing', 'TT', 'earth rod', 'IT system', 'TNS', 'TNCS', 'separate neutral and earth', 'combined neutral and earth', 'PEN conductor'],
  
  earthing_tests: ['Ze', 'external loop impedance', 'earth electrode resistance', 'Ra', 'earth rod test', 'disconnect neutral', 'test at origin', 'main earthing terminal', 'MET'],
  
  bonding: ['main bonding', 'supplementary bonding', 'equipotential bonding', '10mm²', '6mm²', '4mm²', 'bonding conductor', 'earth clamp', 'gas bonding', 'water bonding', 'oil bonding', 'structural steel', 'extraneous conductive part', 'exposed conductive part'],
  
  protection: ['automatic disconnection', 'ADS', 'fault protection', 'basic protection', 'disconnection time', '0.4 seconds', '5 seconds', 'TN system', 'TT system', 'supplementary protection', '30mA RCD']
};

export const COMMISSIONING_RCD_KEYWORDS = {
  rcd_types: ['RCD', 'residual current device', 'RCCB', 'RCBO', 'Type AC', 'Type A', 'Type B', 'Type F', '30mA', '100mA', '300mA', '500mA', '10mA', 'S-type', 'time-delayed'],
  
  rcd_testing: ['RCD test', 'trip test', 'no-trip test', 'ramp test', '0.5 I∆n', 'I∆n', '5 I∆n', 'half rated current', 'rated current', 'five times rated', 'trip time', '40ms', '200ms', '300ms', 'test button', 'mechanical test'],
  
  rcd_faults: ['RCD won\'t trip', 'RCD nuisance tripping', 'RCD slow', 'RCD fails test', 'unwanted tripping', 'leakage current', '9mA', 'cumulative leakage', 'faulty appliance', 'damp circuit'],
  
  rcd_requirements: ['socket outlet protection', '30mA protection', 'mobile equipment', 'outdoor socket', 'RCD protection required', 'additional protection', 'cables in walls', 'cables less than 50mm depth', 'concealed cables', 'socket outlet ≤32A']
};

export const COMMISSIONING_CALCULATION_KEYWORDS = {
  voltage_drop: ['voltage drop', 'VD', 'mV/A/m', 'cable voltage drop', 'maximum voltage drop', '3% drop', '5% drop', '11.5V drop', 'Table 4Ab', 'volt drop calculation'],
  
  loop_impedance: ['Zs calculation', 'Ze + R1+R2', 'maximum Zs', 'Zs limit', 'Table 41.3', 'Table 41.4', 'disconnection time', '0.4s Zs', '5s Zs', 'BS 88 fuse', 'Type B MCB', 'Type C MCB', 'Type D MCB'],
  
  diversity: ['diversity', 'maximum demand', 'diversity factor', 'Table 4A1', 'socket outlet diversity', 'lighting diversity', 'cooker diversity', '10A + 30% remainder', '66% first 10A'],
  
  temperature_correction: ['temperature correction', 'ambient temperature', '70°C', 'conductor temperature', 'thermal insulation', 'derating', 'grouped cables', 'Ca', 'Ci', 'Cg', 'correction factors']
};

export const COMMISSIONING_TROUBLESHOOTING_KEYWORDS = {
  systematic_approach: ['half-split method', 'split the system', 'isolate sections', 'divide and conquer', 'systematic testing', 'process of elimination', 'test at board', 'test at outlet', 'work upstream', 'work downstream'],
  
  diagnostic_sequence: ['visual check first', 'smell burning', 'look for damage', 'check connections', 'tighten terminals', 'dead test first', 'IR test', 'continuity', 'then live test', 'Zs', 'RCD test', 'functional test last'],
  
  measurement_points: ['test at distribution board', 'test at socket outlet', 'test at light fitting', 'test at furthest point', 'test both ends', 'red lead to line', 'black lead to earth', 'probe placement', 'terminal identification'],
  
  expected_readings: ['typical R1+R2', '0.3Ω to 1.5Ω', 'typical IR', '>200MΩ', 'typical Zs', '0.5Ω to 1.5Ω', 'typical Ze', '0.1Ω to 0.8Ω', 'TN-S Ze', '0.35Ω', 'TN-C-S Ze', '0.35Ω', 'TT Ra', '<200Ω']
};

/**
 * Extract comprehensive commissioning keywords from query
 * Target: 50+ keywords for maximum RAG coverage
 */
export function extractCommissioningKeywords(query: string, circuitType?: string): Set<string> {
  const keywords = new Set<string>();
  const queryLower = query.toLowerCase();
  
  console.log('🔍 Extracting comprehensive commissioning keywords...');
  
  // CATEGORY 1: Test Keywords (Visual + Dead + Live)
  Object.values(COMMISSIONING_TEST_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 2: Instrument Keywords
  Object.values(COMMISSIONING_INSTRUMENT_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 3: Fault Keywords
  Object.values(COMMISSIONING_FAULT_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 4: Safety Keywords
  Object.values(COMMISSIONING_SAFETY_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 5: Certification Keywords
  Object.values(COMMISSIONING_CERTIFICATION_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 6: Circuit Keywords
  Object.entries(COMMISSIONING_CIRCUIT_KEYWORDS).forEach(([type, kws]) => {
    const matchTerms = type.split('_');
    if (matchTerms.some(term => queryLower.includes(term))) {
      kws.forEach(kw => keywords.add(kw));
    }
  });
  
  // CATEGORY 7: Location Keywords
  Object.values(COMMISSIONING_LOCATION_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 8: Earthing Keywords
  Object.values(COMMISSIONING_EARTHING_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 9: RCD Keywords
  Object.values(COMMISSIONING_RCD_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 10: Calculation Keywords
  Object.values(COMMISSIONING_CALCULATION_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // CATEGORY 11: Troubleshooting Keywords
  Object.values(COMMISSIONING_TROUBLESHOOTING_KEYWORDS).flat().forEach(kw => {
    if (queryLower.includes(kw.toLowerCase())) {
      keywords.add(kw);
    }
  });
  
  // Add all query words (minimum 3 chars)
  const queryWords = queryLower.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
  queryWords.forEach(w => keywords.add(w));
  
  // Circuit-specific keywords
  if (circuitType) {
    const circuitLower = circuitType.toLowerCase();
    if (circuitLower.includes('ring')) {
      COMMISSIONING_CIRCUIT_KEYWORDS.ring_final.forEach(kw => keywords.add(kw));
    }
    if (circuitLower.includes('shower')) {
      COMMISSIONING_CIRCUIT_KEYWORDS.shower.forEach(kw => keywords.add(kw));
    }
    if (circuitLower.includes('cooker')) {
      COMMISSIONING_CIRCUIT_KEYWORDS.cooker.forEach(kw => keywords.add(kw));
    }
    if (circuitLower.includes('lighting')) {
      COMMISSIONING_CIRCUIT_KEYWORDS.lighting.forEach(kw => keywords.add(kw));
    }
    if (circuitLower.includes('ev') || circuitLower.includes('charger')) {
      COMMISSIONING_CIRCUIT_KEYWORDS.ev_charger.forEach(kw => keywords.add(kw));
    }
  }
  
  console.log(`✅ Extracted ${keywords.size} keywords for RAG enhancement`);
  return keywords;
}
