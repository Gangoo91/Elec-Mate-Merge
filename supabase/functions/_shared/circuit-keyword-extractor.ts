/**
 * Extract high-signal keywords from circuit data
 * Maps user inputs → intelligence table keywords for ultra-fast lookup
 */

export function extractIntelligenceKeywords(circuits: any[]): string[] {
  const keywords = new Set<string>();
  
  circuits.forEach(circuit => {
    const { loadType, loadPower, cableLength, specialLocation, phases } = circuit;
    
    // Core load type keywords
    if (loadType) {
      keywords.add(loadType.toLowerCase());
      keywords.add(`${loadType} circuit`);
    }
    
    // Power-based keywords
    if (loadPower) {
      if (loadPower > 7000) {
        keywords.add('high power circuit');
        keywords.add('dedicated circuit');
      }
      if (loadPower >= 3000 && loadPower <= 7000) {
        keywords.add('medium power');
      }
    }
    
    // Cable length keywords (voltage drop)
    if (cableLength) {
      if (cableLength > 50) {
        keywords.add('voltage drop');
        keywords.add('long cable run');
        keywords.add('mV/A/m');
      }
      if (cableLength > 100) {
        keywords.add('voltage drop calculation');
      }
    }
    
    // Phase keywords
    if (phases === 'three' || phases === 3) {
      keywords.add('three phase');
      keywords.add('balanced loading');
      keywords.add('three-phase');
    }
    
    // Special location keywords (CRITICAL for compliance)
    if (specialLocation && specialLocation !== 'none') {
      keywords.add(specialLocation);
      keywords.add(`${specialLocation} regulations`);
      
      if (specialLocation === 'bathroom') {
        keywords.add('Section 701');
        keywords.add('RCD');
        keywords.add('30mA');
        keywords.add('IP44');
        keywords.add('bathroom zones');
      }
      if (specialLocation === 'outdoor') {
        keywords.add('IP65');
        keywords.add('weatherproof');
        keywords.add('buried cable');
      }
    }
    
    // Load-specific design patterns
    if (loadType?.includes('socket')) {
      keywords.add('ring final');
      keywords.add('socket circuit');
      keywords.add('RCBO');
      keywords.add('411.3.3');
    }
    
    if (loadType?.includes('shower')) {
      keywords.add('shower circuit');
      keywords.add('high current');
      keywords.add('CPC sizing');
    }
    
    if (loadType?.includes('lighting')) {
      keywords.add('lighting circuit');
      keywords.add('radial');
      keywords.add('1.5mm²');
    }
    
    // Always include fundamental keywords
    keywords.add('cable sizing');
    keywords.add('protection');
    keywords.add('earthing');
    keywords.add('voltage drop');
  });
  
  return Array.from(keywords);
}

/**
 * Extract BS7671 regulation keywords from circuit data
 */
export function extractRegulationKeywords(circuits: any[], supply: any): string[] {
  const keywords = new Set<string>();
  
  // Core electrical safety keywords
  keywords.add('protection');
  keywords.add('earthing');
  keywords.add('automatic disconnection');
  keywords.add('earth fault');
  
  // Supply-specific keywords
  if (supply?.earthingSystem) {
    keywords.add(supply.earthingSystem); // TN-C-S, TN-S, TT
    keywords.add('earthing system');
  }
  
  if (supply?.ze) {
    keywords.add('Ze');
    keywords.add('external earth fault loop impedance');
  }
  
  // Circuit-specific regulation keywords
  circuits.forEach(circuit => {
    const { loadType, specialLocation, phases } = circuit;
    
    // Special locations trigger specific regulations
    if (specialLocation && specialLocation !== 'none') {
      keywords.add(specialLocation);
      
      if (specialLocation === 'bathroom') {
        keywords.add('Section 701');
        keywords.add('RCD');
        keywords.add('30mA');
        keywords.add('supplementary bonding');
        keywords.add('zones');
      }
      
      if (specialLocation === 'outdoor') {
        keywords.add('Section 714');
        keywords.add('outdoor lighting');
        keywords.add('IP rating');
      }
    }
    
    // Load type specific regulations
    if (loadType?.includes('socket')) {
      keywords.add('socket-outlet');
      keywords.add('411.3.3');
      keywords.add('RCD protection');
    }
    
    if (loadType?.includes('shower') || loadType?.includes('immersion')) {
      keywords.add('high current');
      keywords.add('dedicated circuit');
      keywords.add('441');
    }
    
    // Three-phase specific
    if (phases === 'three' || phases === 3) {
      keywords.add('three-phase');
      keywords.add('neutral');
      keywords.add('559');
    }
  });
  
  return Array.from(keywords);
}
