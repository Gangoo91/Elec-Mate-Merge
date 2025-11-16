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
      installationType: supply.installationType || 'domestic'
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
    if (typeof circuit.cableLength !== 'number' || circuit.cableLength <= 0) {
      throw new Error(`Circuit ${index + 1}: Invalid cableLength`);
    }

    return {
      name: circuit.name.trim(),
      loadType: circuit.loadType.toLowerCase().trim(),
      loadPower: Math.round(circuit.loadPower), // Round to integer
      cableLength: Math.round(circuit.cableLength), // Round to integer
      phases: (circuit.phases || 'single').toLowerCase(),
      specialLocation: (circuit.specialLocation || 'none').toLowerCase(),
      installMethod: circuit.installMethod || 'auto',
      protectionType: circuit.protectionType || 'auto',
      
      // Special location sub-fields
      bathroomZone: circuit.bathroomZone || null,
      outdoorInstall: circuit.outdoorInstall || null,
      
      // Frontend pre-calculated values (if available)
      calculatedIb: circuit.calculatedIb || null,
      suggestedMCB: circuit.suggestedMCB || null,
      calculatedDiversity: circuit.calculatedDiversity || null,
      estimatedCableSize: circuit.estimatedCableSize || null
    };
  }
}
