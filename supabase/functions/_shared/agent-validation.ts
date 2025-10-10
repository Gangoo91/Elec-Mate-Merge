// Phase 9: Inter-Agent Validation & Challenge Protocol
// BS 7671 18th Edition compliant validation rules

export interface Challenge {
  id: string;
  challenger: string;
  target: string;
  issue: string;
  recommendation: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  regulation?: string; // BS 7671 reference
  timestamp: Date;
}

export interface ValidationResult {
  isValid: boolean;
  challenges: Challenge[];
  warnings: string[];
}

export interface ChallengeResolution {
  action: 'accepted' | 'defended' | 'compromised';
  revisedOutput?: any;
  reasoning: string;
  agentResponse: string;
}

// BS 7671 voltage drop limits
const VOLTAGE_DROP_LIMITS = {
  lighting: 3, // 3% for lighting circuits
  other: 5     // 5% for other uses
};

// Validate Designer output
export function validateDesignerOutput(
  output: string,
  agentContext: any
): ValidationResult {
  const challenges: Challenge[] = [];
  const warnings: string[] = [];

  // Extract design parameters from output
  const cableMatch = output.match(/([\d.]+)\s*mm²/i);
  const cableSize = cableMatch ? parseFloat(cableMatch[1]) : null;

  const mcbMatch = output.match(/(\d+)A\s*(?:MCB|Type\s*[ABC])/i);
  const mcbRating = mcbMatch ? parseInt(mcbMatch[1]) : null;

  const vdMatch = output.match(/voltage\s*drop[:\s]*([\d.]+)%/i);
  const voltageDrop = vdMatch ? parseFloat(vdMatch[1]) : null;

  const loadMatch = output.match(/([\d.]+)\s*kW/i);
  const loadKw = loadMatch ? parseFloat(loadMatch[1]) : null;

  const izMatch = output.match(/Iz[:\s]*([\d.]+)A/i) || output.match(/(?:capacity|CCC)[:\s]*([\d.]+)A/i);
  const cableCcc = izMatch ? parseFloat(izMatch[1]) : null;

  const rcdMentioned = /RCD|RCBO|30\s*mA/i.test(output);
  const isSocket = /socket|ring\s*main/i.test(output);
  const isOutdoor = /outdoor|outside|external/i.test(output);

  // CRITICAL: Voltage drop exceeds BS 7671 limits
  if (voltageDrop !== null) {
    const isLighting = /light/i.test(output);
    const limit = isLighting ? VOLTAGE_DROP_LIMITS.lighting : VOLTAGE_DROP_LIMITS.other;
    
    if (voltageDrop > limit) {
      challenges.push({
        id: `vd-${Date.now()}`,
        challenger: 'health-safety',
        target: 'designer',
        issue: `Voltage drop ${voltageDrop}% exceeds BS 7671 limit of ${limit}%`,
        recommendation: cableSize ? `Increase cable size from ${cableSize}mm² to next larger size` : 'Increase cable size',
        severity: 'critical',
        regulation: 'BS 7671:2018 Appendix 4 Section 6.4',
        timestamp: new Date()
      });
    }
  }

  // CRITICAL: Cable CCC must be ≥ MCB rating (Iz ≥ In)
  if (cableCcc !== null && mcbRating !== null && cableCcc < mcbRating) {
    challenges.push({
      id: `iz-${Date.now()}`,
      challenger: 'health-safety',
      target: 'designer',
      issue: `Cable capacity ${cableCcc}A is less than MCB rating ${mcbRating}A (Iz < In)`,
      recommendation: `Increase cable size or reduce MCB rating to comply with Iz ≥ In`,
      severity: 'critical',
      regulation: 'BS 7671:2018 Regulation 433.1.1',
      timestamp: new Date()
    });
  }

  // HIGH: RCD protection required for sockets ≤32A
  if (isSocket && !rcdMentioned && mcbRating && mcbRating <= 32) {
    challenges.push({
      id: `rcd-${Date.now()}`,
      challenger: 'health-safety',
      target: 'designer',
      issue: 'Socket circuits ≤32A require RCD protection',
      recommendation: 'Specify 30mA RCD or RCBO protection',
      severity: 'high',
      regulation: 'BS 7671:2018 Regulation 411.3.3',
      timestamp: new Date()
    });
  }

  // HIGH: Outdoor circuits require RCD
  if (isOutdoor && !rcdMentioned) {
    challenges.push({
      id: `outdoor-rcd-${Date.now()}`,
      challenger: 'health-safety',
      target: 'designer',
      issue: 'Outdoor circuits require RCD protection',
      recommendation: 'Specify 30mA RCD or RCBO protection for outdoor installation',
      severity: 'high',
      regulation: 'BS 7671:2018 Regulation 411.3.3',
      timestamp: new Date()
    });
  }

  // MEDIUM: Cable size warnings
  if (cableSize && cableSize < 1.5) {
    warnings.push('Cable size below 1.5mm² - verify suitable for load and mechanical protection');
  }

  return {
    isValid: challenges.length === 0,
    challenges,
    warnings
  };
}

// Validate Cost Engineer output
export function validateCostOutput(
  output: string,
  designerOutput: string
): ValidationResult {
  const challenges: Challenge[] = [];
  const warnings: string[] = [];

  // Extract cable size from designer
  const designerCableMatch = designerOutput.match(/([\d.]+)\s*mm²/i);
  const designerCableSize = designerCableMatch ? parseFloat(designerCableMatch[1]) : null;

  // Extract cable from cost output
  const costCableMatch = output.match(/([\d.]+)\s*mm²/i);
  const costCableSize = costCableMatch ? parseFloat(costCableMatch[1]) : null;

  // Check for over-specification (cost engineer inflating specs)
  if (designerCableSize && costCableSize && costCableSize > designerCableSize * 1.5) {
    challenges.push({
      id: `overspec-${Date.now()}`,
      challenger: 'cost-engineer',
      target: 'designer',
      issue: `Specified ${costCableSize}mm² cable but designer calculated ${designerCableSize}mm²`,
      recommendation: `Verify ${designerCableSize}mm² is sufficient before upgrading to ${costCableSize}mm²`,
      severity: 'medium',
      timestamp: new Date()
    });
  }

  // Check for unrealistic pricing
  const totalMatch = output.match(/total[:\s]*£?([\d,]+)/i);
  const total = totalMatch ? parseFloat(totalMatch[1].replace(/,/g, '')) : null;

  if (total && total < 50) {
    warnings.push('Total cost seems low - verify all materials and labour included');
  }

  return {
    isValid: challenges.length === 0,
    challenges,
    warnings
  };
}

// Validate Installer practicality
export function validateInstallerOutput(
  output: string,
  designerOutput: string
): ValidationResult {
  const challenges: Challenge[] = [];
  const warnings: string[] = [];

  // Check for impractical routing
  const lengthMatch = designerOutput.match(/(\d+)\s*m/i);
  const length = lengthMatch ? parseInt(lengthMatch[1]) : null;

  if (length && length > 50) {
    const bendRadiusCheck = /bend\s*radius/i.test(output);
    if (!bendRadiusCheck) {
      warnings.push('Long cable runs (>50m) should mention bend radius and clip spacing considerations');
    }
  }

  // Check for termination concerns
  const cableMatch = designerOutput.match(/([\d.]+)\s*mm²/i);
  const cableSize = cableMatch ? parseFloat(cableMatch[1]) : null;

  if (cableSize && cableSize >= 10) {
    const terminationCheck = /terminat|gland|lug/i.test(output);
    if (!terminationCheck) {
      challenges.push({
        id: `term-${Date.now()}`,
        challenger: 'installer',
        target: 'designer',
        issue: `Large cable (${cableSize}mm²) requires proper termination guidance`,
        recommendation: 'Specify cable lugs or glands for secure termination',
        severity: 'medium',
        timestamp: new Date()
      });
    }
  }

  // Check for installation method compatibility
  const swaCheck = /SWA|armoured/i.test(designerOutput);
  const buriedCheck = /buried|underground/i.test(designerOutput);

  if (buriedCheck && !swaCheck) {
    challenges.push({
      id: `buried-${Date.now()}`,
      challenger: 'installer',
      target: 'designer',
      issue: 'Underground installation specified without SWA cable',
      recommendation: 'Use SWA cable for buried installations or provide adequate ducting',
      severity: 'high',
      regulation: 'BS 7671:2018 Regulation 522.8',
      timestamp: new Date()
    });
  }

  return {
    isValid: challenges.length === 0,
    challenges,
    warnings
  };
}

// Review challenge and decide on action
export async function reviewChallenge(
  targetAgent: string,
  challenge: Challenge,
  originalOutput: string,
  agentContext: any,
  openAIApiKey: string
): Promise<ChallengeResolution> {
  console.log(`🔍 ${targetAgent} reviewing challenge from ${challenge.challenger}`);

  const prompt = `You are the ${targetAgent} agent. Another specialist (${challenge.challenger}) has raised a concern about your design:

**Issue:** ${challenge.issue}
**Recommendation:** ${challenge.recommendation}
${challenge.regulation ? `**Regulation:** ${challenge.regulation}` : ''}
**Severity:** ${challenge.severity}

**Your original output:**
${originalOutput}

**User requirements:**
${agentContext.userQuery}

Review this challenge and decide:
1. ACCEPT: The challenge is valid, revise your design accordingly
2. DEFEND: The challenge is incorrect, provide reasoning why your original design is correct
3. COMPROMISE: Find middle ground between your design and the recommendation

Respond in JSON format:
{
  "action": "accepted" | "defended" | "compromised",
  "reasoning": "Technical explanation of your decision",
  "revisedOutput": "Updated design output (only if accepted/compromised)",
  "agentResponse": "Brief explanation to user about the change"
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a BS 7671 compliant electrical design expert who carefully reviews challenges from other specialists.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log(`${targetAgent} decided to ${result.action} the challenge`);

    return {
      action: result.action,
      revisedOutput: result.revisedOutput,
      reasoning: result.reasoning,
      agentResponse: result.agentResponse || `${result.action === 'accepted' ? 'Accepted' : result.action === 'defended' ? 'Maintained' : 'Adjusted'} based on specialist feedback`
    };

  } catch (error) {
    console.error('Error reviewing challenge:', error);
    // Default to accepting critical/high severity challenges
    if (challenge.severity === 'critical' || challenge.severity === 'high') {
      return {
        action: 'accepted',
        reasoning: 'Safety-critical issue, accepting recommendation by default',
        agentResponse: 'Updated design for safety compliance'
      };
    }
    return {
      action: 'defended',
      reasoning: 'Unable to process challenge, maintaining original design',
      agentResponse: 'Maintained original design'
    };
  }
}
