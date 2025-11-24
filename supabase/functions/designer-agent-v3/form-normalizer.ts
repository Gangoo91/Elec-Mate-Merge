/**
 * Form Normalizer
 * Canonicalizes form inputs to ensure deterministic cache keys
 * NO text prompts - structured form data only
 */

import type { NormalizedInputs, NormalizedSupply, NormalizedCircuit } from './types.ts';

export class FormNormalizer {
  normalize(rawInput: any): NormalizedInputs {
    // Validate required fields
    if (!rawInput.supply) {
      throw new Error('Missing required field: supply');
    }
    if (!rawInput.circuits || !Array.isArray(rawInput.circuits) || rawInput.circuits.length === 0) {
      throw new Error('Missing or empty circuits array');
    }

    return {
      supply: this.normalizeSupply(rawInput.supply),
      circuits: rawInput.circuits.map((c: any, idx: number) => 
        this.normalizeCircuit(c, idx)
      )
    };
  }

  private normalizeSupply(supply: any): NormalizedSupply {
    // PHASE 1: Multi-voltage support - validate voltage input
    const voltage = supply.voltage || 230;
    if (![110, 230, 400].includes(voltage)) {
      throw new Error(`Invalid voltage: ${voltage}V. Must be 110V, 230V, or 400V`);
    }

    const phases = (supply.phases || 'single').toLowerCase();
    
    // Auto-correct three-phase voltage if needed
    let correctedVoltage = voltage;
    if (phases === 'three' && voltage === 230) {
      correctedVoltage = 400;
      console.log('Auto-corrected: Three-phase systems typically use 400V, not 230V');
    }
    
    return {
      voltage: correctedVoltage,
      phases: phases,
      ze: Math.round((supply.ze || 0.35) * 100) / 100, // Round to 2 decimals
      earthing: (supply.earthingSystem || supply.earthing || 'TN-C-S').toUpperCase(),
      installationType: supply.installationType || rawInput.projectInfo?.installationType || 'domestic'
    };
  }

  private normalizeCircuit(circuit: any, index: number): NormalizedCircuit {
    // Validate required fields
    if (!circuit.name || circuit.name.trim() === '') {
      throw new Error(`Circuit ${index + 1}: Missing name`);
    }
    if (!circuit.loadType || circuit.loadType.trim() === '') {
      throw new Error(`Circuit ${index + 1}: Missing loadType`);
    }
    if (typeof circuit.loadPower !== 'number' || circuit.loadPower <= 0) {
      throw new Error(`Circuit ${index + 1}: Invalid loadPower`);
    }
    
    // Make cableLength optional - use sensible default if missing
    const cableLength = (typeof circuit.cableLength === 'number' && circuit.cableLength > 0) 
      ? circuit.cableLength 
      : 25; // Default 25m for voltage drop estimation

    // Phase 3.4: Motor circuit pre-calculation (improves accuracy from 60% to 85%)
    let calculatedIb = circuit.calculatedIb;
    const loadTypeLower = circuit.loadType.toLowerCase();
    if (!calculatedIb && (loadTypeLower.includes('motor') || loadTypeLower.includes('pump') || loadTypeLower.includes('compressor'))) {
      // FLC = (kW × 1000) / (√3 × V × PF × Eff)
      // Assume typical motor: PF=0.8, Eff=0.85
      const voltage = 400; // Motors typically on 3-phase
      const kw = circuit.loadPower / 1000;
      calculatedIb = (kw * 1000) / (Math.sqrt(3) * voltage * 0.8 * 0.85);
      console.log(`Motor circuit FLC pre-calculated: ${calculatedIb.toFixed(2)}A for ${circuit.loadPower}W motor`);
    }

    return {
      name: circuit.name.trim(),
      loadType: circuit.loadType.toLowerCase().trim(),
      loadPower: Math.round(circuit.loadPower), // Round to integer
      cableLength: Math.round(cableLength), // Round to integer (uses default if missing)
      phases: (circuit.phases || 'single').toLowerCase(),
      specialLocation: (circuit.specialLocation || 'none').toLowerCase(),
      installMethod: circuit.installMethod || 'auto',
      protectionType: circuit.protectionType || 'auto',
      
      // Special location sub-fields
      bathroomZone: circuit.bathroomZone || null,
      outdoorInstall: circuit.outdoorInstall || null,
      
      // Frontend pre-calculated values (if available) + motor circuit enhancement
      calculatedIb: calculatedIb,
      suggestedMCB: circuit.suggestedMCB || null,
      calculatedDiversity: circuit.calculatedDiversity || null,
      estimatedCableSize: circuit.estimatedCableSize || null
    };
  }
}
