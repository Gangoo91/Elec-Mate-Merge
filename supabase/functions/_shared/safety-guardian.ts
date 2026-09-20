/**
 * PHASE 3: Safety Guardian System
 * Proactively detects edge cases and special requirements
 * Returns warnings BEFORE the user asks
 */

export interface SafetyWarning {
  id: string;
  category: 'bathroom' | 'high_power' | 'ev' | 'buried' | 'structural' | 'rcd' | 'bonding';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  regulations: string[];
  checklistItems?: string[];
}

export interface GuardianResult {
  warnings: SafetyWarning[];
  criticalCount: number;
  warningCount: number;
}

/**
 * Detect edge cases from query and design parameters
 */
export function detectSafetyRequirements(
  query: string,
  circuitType?: string,
  power?: number,
  location?: string,
  voltage?: number,
  cableLength?: number
): GuardianResult {
  const warnings: SafetyWarning[] = [];
  const queryLower = query.toLowerCase();
  const effectiveLocation = location || detectLocationFromQuery(queryLower);
  const effectiveCircuitType = circuitType || detectCircuitTypeFromQuery(queryLower);
  
  // ========== BATHROOM / SECTION 701 ==========
  if (effectiveLocation === 'bathroom' || /bathroom|shower room|wet room/i.test(queryLower)) {
    warnings.push({
      id: 'bathroom_zones',
      category: 'bathroom',
      severity: 'critical',
      title: 'Bathroom Installation - Section 701',
      message: 'This installation is in a bathroom location (Section 701). Special requirements apply for zones, IP ratings, and RCD protection.',
      regulations: ['701.32', '701.410.3.5', '701.512.3', '701.53'],
      checklistItems: [
        '✓ Identify bathroom zones (0, 1, 2) where equipment will be installed',
        '✓ Minimum IP rating: Zone 0 = IPX7, Zone 1 = IPX4, Zone 2 = IPX4',
        '✓ All circuits MUST have 30mA RCD protection',
        '✓ Supplementary bonding required if not all extraneous parts are in same equipotential zone',
        '✓ Switches and controls must be outside zones 0, 1, 2 (or use pull-cord)',
        '✓ No socket outlets permitted except SELV (≤12V AC) in zone 1'
      ]
    });
  }
  
  // ========== HIGH POWER CIRCUITS (>32A) ==========
  if (power && power > 7360) { // >32A at 230V
    const estimatedCurrent = Math.ceil(power / (voltage || 230));
    warnings.push({
      id: 'high_power_diversity',
      category: 'high_power',
      severity: 'warning',
      title: `High Load Circuit (>${estimatedCurrent}A)`,
      message: `This ${(power/1000).toFixed(1)}kW load requires special considerations for diversity, cable sizing, and main switch rating.`,
      regulations: ['311.1', '433.1.1', '512.1.5'],
      checklistItems: [
        `✓ Design current: ~${estimatedCurrent}A - verify with actual appliance nameplate`,
        '✓ Apply diversity if multiple high-power circuits (Table 1A, Appendix 15)',
        '✓ Check existing main switch / consumer unit can handle additional load',
        '✓ Consider three-phase supply if total load exceeds 80A single-phase',
        '✓ Use larger cable to minimize voltage drop on high-current circuits',
        '✓ Verify earth fault loop impedance is achievable with proposed cable size'
      ]
    });
  }
  
  // ========== EV CHARGER / SECTION 722 ==========
  if (effectiveCircuitType === 'ev' || /ev|electric vehicle|car charg/i.test(queryLower)) {
    warnings.push({
      id: 'ev_charger_722',
      category: 'ev',
      severity: 'critical',
      title: 'EV Charger Installation - Section 722',
      message: 'EV charging points require dedicated circuits with specific protection and earthing arrangements per Section 722.',
      regulations: ['722.411.4', '722.531.2.1', '722.411.3.3', '722.531.3.1'],
      checklistItems: [
        '✓ Dedicated circuit required - no other loads on this circuit',
        '✓ Mandatory Type B RCD OR Type A RCD + 6mA DC fault protection device',
        '✓ Outdoor socket outlet - minimum IP54 rating',
        '✓ PME earthing: Additional earth electrode required at charging point',
        '✓ Cable route: Use SWA if buried, minimum 600mm depth, warning tape',
        '✓ Overvoltage protection (SPD) recommended',
        '✓ Installation must enable smart charging if >3.68kW (Building Regs Part S)'
      ]
    });
  }
  
  // ========== BURIED CABLE ==========
  if (/buried|underground|swa|armoured/i.test(queryLower) || effectiveLocation === 'outdoor') {
    warnings.push({
      id: 'buried_cable',
      category: 'buried',
      severity: 'warning',
      title: 'Buried / Outdoor Cable Installation',
      message: 'Underground cables require specific installation methods, depth, and mechanical protection.',
      regulations: ['522.8.10', '522.6.101', 'Table 4A2'],
      checklistItems: [
        '✓ Use SWA (Steel Wire Armoured) cable for buried installations',
        '✓ Minimum burial depth: 600mm (450mm if mechanical protection)',
        '✓ Install warning tape 150mm above cable',
        '✓ Cable must be marked with "Electric Cable" warning',
        '✓ Route to avoid areas likely to be disturbed (driveways, flowerbeds)',
        '✓ SWA armour provides earth continuity - use appropriate glands',
        '✓ Maintain cable installation records showing exact route'
      ]
    });
  }
  
  // ========== NOTCHED JOISTS / STRUCTURAL ==========
  if (/joist|floor|notch|drill|hole/i.test(queryLower)) {
    warnings.push({
      id: 'structural_notching',
      category: 'structural',
      severity: 'warning',
      title: 'Structural Considerations - Joists & Beams',
      message: 'Cable routes through joists and beams must comply with building regulations to avoid structural weakening.',
      regulations: ['522.6.101', '134.1.1'],
      checklistItems: [
        '✓ Holes: Maximum diameter = 0.25 × joist depth',
        '✓ Holes: Minimum 3 diameters apart, drilled on neutral axis (centerline)',
        '✓ Notches: Maximum depth = 0.125 × joist depth',
        '✓ Notches: Only in top edge, between 0.07 and 0.25 span from support',
        '✓ Never notch or drill near points of maximum stress',
        '✓ Use Building Control-approved methods for load-bearing walls',
        '✓ Consider floor trunking or conduit to avoid weakening structure'
      ]
    });
  }
  
  // ========== RCD PROTECTION (GENERAL) ==========
  if (power && power > 2000 && !warnings.find(w => w.category === 'bathroom' || w.category === 'ev')) {
    const requiresRCD = effectiveLocation === 'outdoor' || cableLength && cableLength > 10;
    
    if (requiresRCD || /rcd|protection|safety/i.test(queryLower)) {
      warnings.push({
        id: 'rcd_requirements',
        category: 'rcd',
        severity: 'info',
        title: 'RCD Protection Requirements',
        message: 'Check if this circuit requires additional RCD protection based on installation method and location.',
        regulations: ['411.3.3', '415.1.1', '522.6.202'],
        checklistItems: [
          '✓ Sockets ≤20A outdoors or for general use: 30mA RCD required',
          '✓ Buried cables <50mm depth: 30mA RCD required',
          '✓ Cables in walls/partitions <50mm from surface: 30mA RCD required',
          '✓ All bathroom circuits: 30mA RCD required',
          '✓ Consider RCBO for individual circuit protection vs shared RCD',
          '✓ Verify RCD trip time ≤40ms at 5× rated current (150mA for 30mA RCD)'
        ]
      });
    }
  }
  
  // ========== SUPPLEMENTARY BONDING ==========
  if (effectiveLocation === 'bathroom' || /bond|equipotential|extraneous/i.test(queryLower)) {
    warnings.push({
      id: 'bonding_requirements',
      category: 'bonding',
      severity: 'info',
      title: 'Equipotential Bonding',
      message: 'Check if supplementary bonding is required based on the location and presence of extraneous conductive parts.',
      regulations: ['701.415.2', '411.3.1.2', '544.2'],
      checklistItems: [
        '✓ Main equipotential bonding: Connect gas, water pipes to main earth terminal',
        '✓ Bonding conductor size: 6mm² CPC minimum (Table 54.8)',
        '✓ Bathroom supplementary bonding: Required if not all parts in same zone',
        '✓ Bond all extraneous conductive parts (pipes, metal baths, radiators)',
        '✓ Test bonding resistance: <0.05Ω between bonded parts',
        '✓ Label bonding conductors: "Safety Electrical Connection - Do Not Remove"'
      ]
    });
  }
  
  // Count severities
  const criticalCount = warnings.filter(w => w.severity === 'critical').length;
  const warningCount = warnings.filter(w => w.severity === 'warning').length;
  
  return {
    warnings,
    criticalCount,
    warningCount
  };
}

/**
 * Helper: Detect location from query text
 */
function detectLocationFromQuery(queryLower: string): string | undefined {
  if (/bathroom|shower room|wet room/i.test(queryLower)) return 'bathroom';
  if (/outdoor|outside|external|garden/i.test(queryLower)) return 'outdoor';
  if (/kitchen/i.test(queryLower)) return 'kitchen';
  if (/garage/i.test(queryLower)) return 'garage';
  return undefined;
}

/**
 * Helper: Detect circuit type from query text
 */
function detectCircuitTypeFromQuery(queryLower: string): string | undefined {
  if (/ev|electric vehicle|car charg/i.test(queryLower)) return 'ev';
  if (/shower/i.test(queryLower)) return 'shower';
  if (/cooker|oven/i.test(queryLower)) return 'cooker';
  if (/socket|ring/i.test(queryLower)) return 'socket';
  if (/light|lighting/i.test(queryLower)) return 'lighting';
  return undefined;
}

/**
 * Format warnings for UI display
 */
export function formatWarningsForUI(result: GuardianResult): any[] {
  return result.warnings.map(w => ({
    type: w.severity,
    title: w.title,
    message: w.message,
    regulations: w.regulations,
    checklist: w.checklistItems
  }));
}
