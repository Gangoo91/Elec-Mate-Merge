// Helper function to extract circuit context for H&S agent
export function extractCircuitContext(agentContext: any): string {
  const designerOutput = agentContext.previousAgentOutputs.find((a: any) => a.agent === 'designer');
  
  if (!designerOutput) {
    return 'General electrical installation (circuit type unknown)';
  }
  
  const response = designerOutput.response;
  
  // Extract circuit details
  const circuitName = extractValue(response, /Circuit:?\s*(.+?)(?:\n|$)/i) || 
                      extractValue(response, /for\s+(?:a|the)\s+(.+?)(?:\n|circuit|installation)/i) ||
                      'Unknown Circuit';
  const load = extractValue(response, /Load:?\s*(\d+)\s*W/i) || 
               extractValue(response, /(\d+)\s*W\s+load/i) ||
               'Unknown';
  const cable = extractValue(response, /Cable:?\s*([\d.]+)\s*mm²/i) || 
                extractValue(response, /([\d.]+)\s*mm²\s+cable/i) ||
                'Unknown';
  const device = extractValue(response, /Protection:?\s*(\d+A\s*Type\s*[ABC])/i) || 
                 extractValue(response, /(\d+A\s*Type\s*[ABC])\s*(?:MCB|RCBO)/i) ||
                 'Unknown MCB';
  const method = extractValue(response, /Method:?\s*(clipped|buried|conduit|trunking)/i) || 
                 extractValue(response, /(clipped direct|buried|in conduit|in trunking)/i) ||
                 'Unknown method';
  
  return `Circuit Name: ${circuitName}
Load: ${load}W
Cable: ${cable}mm²
Protection: ${device}
Installation Method: ${method}

This is NOT a shower circuit unless explicitly stated above.`;
}

function extractValue(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  return match ? match[1]?.trim() : null;
}
