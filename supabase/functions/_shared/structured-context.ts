// UPGRADE: Deep structured context extraction from agent outputs
// Extracts ALL technical data, not just surface-level values

export interface StructuredAgentOutput {
  agent: string;
  timestamp: string;
  naturalLanguage: string;
  structuredData: {
    // Designer outputs
    cableSize?: number;
    protectionDevice?: string;
    designCurrent?: number;
    deviceRating?: number;
    correctedCapacity?: number;
    correctionFactors?: {
      temperature?: number;
      grouping?: number;
      overall?: number;
    };
    voltageDrop?: {
      actual: number;
      percentage: number;
      limit: number;
      compliant: boolean;
    };
    earthFault?: {
      maxZs: number;
      actualZs?: number;
      r1r2?: number;
    };
    installationMethod?: string;
    
    // Cost Engineer outputs
    materials?: Array<{
      item: string;
      quantity: number;
      unitPrice: number;
      supplier: string;
      total: number;
    }>;
    labour?: {
      hours: number;
      rate: number;
      total: number;
    };
    totalCost?: number;
    
    // Installer outputs
    installationSteps?: string[];
    supportIntervals?: string;
    safeZones?: string[];
    specialRequirements?: string[];
    
    // Health & Safety outputs
    riskAssessment?: {
      hazards: Array<{
        hazard: string;
        likelihood: number;
        severity: number;
        riskRating: number;
        controls: string[];
        residualRisk: number;
      }>;
    };
    requiredPPE?: string[];
    methodStatement?: string[];
    emergencyProcedures?: string[];
    
    // Commissioning outputs
    testSequence?: string[];
    expectedResults?: Record<string, string>;
    passFailCriteria?: Record<string, string>;
  };
  reasoning: string[];
  citations: string[];
}

export function buildDeepStructuredContext(agentOutputs: any[]): string {
  if (!agentOutputs || agentOutputs.length === 0) return '';
  
  let context = '=== COMPLETE AGENT CONTEXT (All Technical Data) ===\n\n';
  
  for (const output of agentOutputs) {
    const structured = output.structuredData || {};
    context += `[${output.agent.toUpperCase()}]\n`;
    
    // Extract ALL technical specifications
    if (structured.cableSize) {
      context += `Cable Size: ${structured.cableSize}mm²\n`;
      context += `Protection: ${structured.protectionDevice}\n`;
      context += `Design Current (Ib): ${structured.designCurrent}A\n`;
      context += `Device Rating (In): ${structured.deviceRating}A\n`;
      context += `Corrected Capacity (Iz): ${structured.correctedCapacity}A\n`;
      
      if (structured.correctionFactors) {
        context += `Correction Factors:\n`;
        context += `  - Temperature (Ca): ${structured.correctionFactors.temperature}\n`;
        context += `  - Grouping (Cg): ${structured.correctionFactors.grouping}\n`;
        context += `  - Overall: ${structured.correctionFactors.overall}\n`;
      }
      
      if (structured.voltageDrop) {
        context += `Voltage Drop: ${structured.voltageDrop.actual}V (${structured.voltageDrop.percentage}%) - ${structured.voltageDrop.compliant ? 'COMPLIANT' : 'NON-COMPLIANT'}\n`;
      }
      
      if (structured.earthFault) {
        context += `Max Zs: ${structured.earthFault.maxZs}Ω\n`;
        if (structured.earthFault.r1r2) {
          context += `R1+R2: ${structured.earthFault.r1r2}Ω\n`;
        }
      }
    }
    
    if (structured.materials && structured.materials.length > 0) {
      context += `Materials Breakdown:\n`;
      structured.materials.forEach((m: any) => {
        context += `  - ${m.item} (${m.quantity}) @ £${m.unitPrice} from ${m.supplier} = £${m.total}\n`;
      });
      context += `Total Cost: £${structured.totalCost}\n`;
    }
    
    if (structured.installationSteps && structured.installationSteps.length > 0) {
      context += `Installation Steps:\n`;
      structured.installationSteps.forEach((step: string, i: number) => {
        context += `  ${i + 1}. ${step}\n`;
      });
    }
    
    if (structured.riskAssessment && structured.riskAssessment.hazards) {
      context += `Risk Assessment (5x5 Matrix):\n`;
      structured.riskAssessment.hazards.forEach((h: any) => {
        context += `  - ${h.hazard}: L${h.likelihood} × S${h.severity} = ${h.riskRating} (Residual: ${h.residualRisk})\n`;
        context += `    Controls: ${h.controls.join(', ')}\n`;
      });
      if (structured.requiredPPE) {
        context += `Required PPE: ${structured.requiredPPE.join(', ')}\n`;
      }
    }
    
    if (structured.testSequence && structured.testSequence.length > 0) {
      context += `Test Sequence:\n`;
      structured.testSequence.forEach((test: string, i: number) => {
        context += `  ${i + 1}. ${test}\n`;
      });
    }
    
    // Include reasoning chains
    if (output.reasoning && output.reasoning.length > 0) {
      context += `Reasoning:\n`;
      output.reasoning.forEach((r: string) => context += `  • ${r}\n`);
    }
    
    // Include regulatory citations
    if (output.citations && output.citations.length > 0) {
      context += `Citations: ${output.citations.join(', ')}\n`;
    }
    
    context += '\n';
  }
  
  return context;
}

export function extractStructuredData(agentResponse: string, agent: string): any {
  const data: any = {};
  
  // Extract technical values using regex patterns
  const patterns = {
    cableSize: /cable size.*?(\d+(?:\.\d+)?)\s*mm²/i,
    protection: /(?:MCB|RCBO|RCD).*?(\d+A\s+Type\s+[A-D])/i,
    designCurrent: /(?:Ib|design current).*?(\d+(?:\.\d+)?)\s*A/i,
    deviceRating: /(?:In|device rating).*?(\d+)\s*A/i,
    voltageDrop: /voltage drop.*?(\d+(?:\.\d+)?)\s*V.*?\((\d+(?:\.\d+)?)\s*%\)/i,
    maxZs: /max Zs.*?(\d+(?:\.\d+)?)\s*Ω/i,
  };
  
  for (const [key, pattern] of Object.entries(patterns)) {
    const match = agentResponse.match(pattern);
    if (match) {
      if (key === 'voltageDrop') {
        data[key] = {
          actual: parseFloat(match[1]),
          percentage: parseFloat(match[2]),
          compliant: parseFloat(match[2]) <= 3
        };
      } else if (key === 'cableSize' || key === 'designCurrent' || key === 'deviceRating' || key === 'maxZs') {
        data[key] = parseFloat(match[1]);
      } else {
        data[key] = match[1];
      }
    }
  }
  
  return data;
}
