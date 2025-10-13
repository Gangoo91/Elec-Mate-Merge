/**
 * PHASE 2: Edge Case Detection
 * Detects impractical scenarios and prompts for clarification
 */

export interface EdgeCaseResult {
  isEdgeCase: boolean;
  type?: string;
  suggestion?: string;
}

export function detectEdgeCases(
  circuitParams: any,
  userMessage: string,
  currentDesign?: any
): EdgeCaseResult {
  const { power, cableLength, voltage, phases } = circuitParams;
  const msgLower = userMessage.toLowerCase();
  
  // 1. IMPOSSIBLE SINGLE-PHASE LOAD (>100kW is industrial/commercial)
  if (power > 100000 && phases === 1) {
    const kW = power / 1000;
    const possibleTypo = power / 1000; // They might have meant kW not W
    
    return {
      isEdgeCase: true,
      type: 'excessive-single-phase-load',
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
        suggestion: `A ${cableLength}m cable run for ${(power/1000).toFixed(1)}kW is going to have significant voltage drop issues - I estimate around ${estimatedVD.toFixed(0)}% which exceeds BS 7671 limits (5% max for power circuits).

Practical options:
1. **Reduce distance** - Can you install a local distribution board/sub-main closer to the load?
2. **Verify distance** - Is ${cableLength}m definitely correct? That's quite a run.
3. **Use larger cable** - Even with 16mm² or 25mm², voltage drop will be marginal.

Which approach makes sense for your installation?`
      };
    }
  }
  
  // 3. SUSPICIOUSLY LONG CABLE RUN (>150m for domestic)
  if (cableLength > 150 && !msgLower.includes('commercial') && !msgLower.includes('industrial')) {
    return {
      isEdgeCase: true,
      type: 'excessive-cable-length',
      suggestion: `That's a ${cableLength}m cable run - quite unusual for a domestic installation. 

Just to confirm:
• Is this definitely ${cableLength} metres (not feet)?
• Are you running from the main consumer unit, or could there be a sub-distribution board closer?
• Is this a commercial/industrial site with long cable routes?

Once I know the context, I can design the circuit properly with appropriate voltage drop considerations.`
    };
  }
  
  // 4. FOLLOW-UP QUESTION WITHOUT CONTEXT
  if ((msgLower.startsWith('why ') || msgLower.includes('why not')) && 
      power === 0 && 
      (!currentDesign || !currentDesign.circuits || currentDesign.circuits.length === 0)) {
    return {
      isEdgeCase: true,
      type: 'context-question-no-design',
      suggestion: `I'd be happy to explain, but I don't have a previous design to reference. Could you either:

1. Ask me to design a circuit first (e.g., "9.5kW shower, 18m run")
2. Clarify which specific scenario you're asking about

Then I can explain the cable selection, protection choices, and BS 7671 reasoning behind it.`
    };
  }
  
  // 5. THREE-PHASE WITH UNUSUAL VOLTAGE
  if (phases === 3 && voltage !== 400 && voltage !== 230) {
    return {
      isEdgeCase: true,
      type: 'non-standard-voltage',
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
