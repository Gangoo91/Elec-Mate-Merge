/**
 * Circuit Parser Module
 * Extracts and validates circuit data from text
 */

import { parseQueryEntities } from '../../_shared/query-parser.ts';

export interface ParsedCircuit {
  name: string;
  loadType: string;
  loadPower: number;
  cableLength: number;
  phases: string;
  specialLocation?: string;
}

/**
 * Extract circuits from additional prompt text using NLP entity parsing
 */
export function extractCircuitsFromPrompt(additionalPrompt: string, existingCircuits: any[]): {
  inferredCircuits: ParsedCircuit[];
  specialRequirements: string[];
  installationConstraints: string[];
} {
  if (!additionalPrompt?.trim()) {
    return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
  }

  const entities = parseQueryEntities(additionalPrompt);
  const inferredCircuits: ParsedCircuit[] = [];
  const specialRequirements: string[] = [];
  const installationConstraints: string[] = [];
  
  // Extract special requirements from entities
  if (entities.specialRequirements) {
    specialRequirements.push(...entities.specialRequirements);
  }
  
  // Extract installation constraints
  if (entities.installationConstraints) {
    installationConstraints.push(...entities.installationConstraints);
  }
  
  // Add location-based requirements
  if (entities.location === 'bathroom') {
    specialRequirements.push('⚠️ Section 701: Bathroom installation - 30mA RCD mandatory, IP rating zones, bonding required');
  }
  if (entities.location === 'outdoor') {
    specialRequirements.push('⚠️ Reg 411.3.3: Outdoor installation - 30mA RCD mandatory, IP65+ rating, SWA cable');
  }
  
  // Add earthing system requirements
  if (entities.earthingSystem === 'TT') {
    specialRequirements.push('⚠️ TT System: 30mA RCD on all circuits, earth electrode resistance critical');
  }
  
  // Add high temperature derating
  if (entities.ambientTemperature && entities.ambientTemperature > 30) {
    installationConstraints.push(`🔧 High ambient temperature (${entities.ambientTemperature}°C): Apply temperature derating factor`);
  }
  
  // Infer circuits if power + load type mentioned
  if (entities.power && entities.loadType) {
    inferredCircuits.push({
      name: `${entities.loadType} (from prompt)`,
      loadType: entities.loadType,
      loadPower: entities.power,
      cableLength: entities.distance || 20,
      phases: entities.phases || 'single',
      specialLocation: entities.location || 'none'
    });
  }
  
  return { inferredCircuits, specialRequirements, installationConstraints };
}

/**
 * Validate circuit data structure
 */
export function validateCircuitData(circuit: any): boolean {
  return !!(
    circuit &&
    typeof circuit.name === 'string' &&
    typeof circuit.loadPower === 'number' &&
    circuit.loadPower > 0 &&
    typeof circuit.cableLength === 'number' &&
    circuit.cableLength > 0
  );
}
