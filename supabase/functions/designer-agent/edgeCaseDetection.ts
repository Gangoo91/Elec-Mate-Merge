/**
 * PHASE 2: Edge Case Detection
 * Detects impractical scenarios and prompts for clarification
 */

export interface EdgeCaseResult {
  isEdgeCase: boolean;
  type?: string;
  suggestion?: string;
  allowTheoreticalDesign?: boolean; // Allow AI to continue with warnings
}

export function detectEdgeCases(
  circuitParams: any,
  userMessage: string,
  currentDesign?: any
): EdgeCaseResult {
  const { power, cableLength, voltage, phases, voltageSource } = circuitParams;
  const msgLower = userMessage.toLowerCase();
  
  // 1. IMPOSSIBLE SINGLE-PHASE LOAD (>100kW is industrial/commercial)
  if (power > 100000 && phases === 1) {
    const kW = power / 1000;
    const possibleTypo = power / 1000; // They might have meant kW not W
    
    return {
      isEdgeCase: true,
      type: 'excessive-single-phase-load',
      allowTheoreticalDesign: false,
      suggestion: `That's ${kW}kW on single-phase 230V - that would draw ${(power / voltage).toFixed(0)}A which is well beyond typical domestic installations. 

Did you mean:
• ${possibleTypo}kW (${possibleTypo * 1000}W)? That's more realistic for domestic.
• Three-phase supply? At 400V three-phase, this becomes manageable.
• Commercial/industrial installation? I'd need to know the supply infrastructure.

Please clarify the load or supply type so I can design this properly.`
    };
  }
  
  // 2. EXTREME VOLTAGE DROP SCENARIO (long distance + high power)
  if (cableLength > 80 && power > 7000) {
    const estimatedVD = ((power / voltage) * cableLength * 0.029) / voltage * 100; // Rough estimate
    
    if (estimatedVD > 15) {
      return {
        isEdgeCase: true,
        type: 'long-distance-high-power',
        allowTheoreticalDesign: true, // Can provide theoretical design with warnings
        suggestion: `A ${cableLength}m cable run for ${(power/1000).toFixed(1)}kW is going to have significant voltage drop issues - I estimate around ${estimatedVD.toFixed(0)}% which exceeds BS 7671 limits (5% max for power circuits).

Practical options:
1. **Reduce distance** - Can you install a local distribution board/sub-main closer to the load?
2. **Verify distance** - Is ${cableLength}m definitely correct? That's quite a run.
3. **Use larger cable** - Even with 16mm² or 25mm², voltage drop will be marginal.

I can provide a theoretical design showing why it won't work, or you can clarify the installation context first.`
      };
    }
  }
  
  // 3. SUSPICIOUSLY LONG CABLE RUN (>150m for domestic)
  if (cableLength > 150 && !msgLower.includes('commercial') && !msgLower.includes('industrial')) {
    return {
      isEdgeCase: true,
      type: 'excessive-cable-length',
      allowTheoreticalDesign: true,
      suggestion: `That's a ${cableLength}m cable run - quite unusual for a domestic installation. 

Just to confirm:
• Is this definitely ${cableLength} metres (not feet)?
• Are you running from the main consumer unit, or could there be a sub-distribution board closer?
• Is this a commercial/industrial site with long cable routes?

I can show you the theoretical design, but the voltage drop calculations might indicate you need a different approach.`
    };
  }
  
  // 4. FOLLOW-UP QUESTION WITHOUT CONTEXT
  // PHASE 2: Don't flag as edge case if we successfully pulled params from currentDesign
  if ((msgLower.startsWith('why ') || msgLower.includes('why not') || msgLower.includes('better to')) && 
      power === 0 && 
      !circuitParams.isContextQuestion && // Check if context question was successfully resolved
      (!currentDesign || !currentDesign.circuits || currentDesign.circuits.length === 0)) {
    return {
      isEdgeCase: true,
      type: 'context-question-no-design',
      allowTheoreticalDesign: false,
      suggestion: `I'd be happy to explain, but I don't have a previous design to reference. Could you either:

1. Ask me to design a circuit first (e.g., "9.5kW shower, 18m run")
2. Clarify which specific scenario you're asking about

Then I can explain the cable selection, protection choices, and BS 7671 reasoning behind it.`
    };
  }
  
  // 5. THREE-PHASE WITH UNUSUAL VOLTAGE
  // Only flag if user EXPLICITLY specified a non-standard voltage
  // Don't flag auto-corrected voltages (voltageSource === 'auto')
  if (phases === 'three' && voltage !== 400 && voltage !== 230 && voltageSource === 'explicit') {
    return {
      isEdgeCase: true,
      type: 'non-standard-voltage',
      allowTheoreticalDesign: false,
      suggestion: `You've specified ${voltage}V three-phase, which is non-standard for UK installations (we typically use 400V line-to-line, or 230V line-to-neutral).

Could you confirm:
• Is this 400V three-phase? (standard UK commercial/industrial)
• Or 230V single-phase? (standard UK domestic)
• Or a different voltage system entirely?

I need the correct voltage to calculate cable sizing and voltage drop accurately.`
    };
  }
  
  // No edge case detected
  return { isEdgeCase: false };
}
