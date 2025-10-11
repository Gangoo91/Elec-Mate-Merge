// Agent suggestion logic for Designer Agent
export function suggestNextAgents(
  userQuery: string,
  agentResponse: string,
  previousAgents: string[]
): Array<{agent: string; reason: string; priority?: string}> {
  const suggestions = [];
  
  // After designer completes, suggest relevant next agents
  if (!previousAgents.includes('cost-engineer') && agentResponse.includes('cable') || agentResponse.includes('MCB')) {
    suggestions.push({
      agent: 'cost-engineer',
      reason: 'Get pricing and materials estimate for this design',
      priority: 'high'
    });
  }
  
  if (!previousAgents.includes('installer') && agentResponse.includes('design')) {
    suggestions.push({
      agent: 'installer',
      reason: 'Get practical installation guidance and method',
      priority: 'medium'
    });
  }
  
  if (!previousAgents.includes('health-safety')) {
    suggestions.push({
      agent: 'health-safety',
      reason: 'Review safety requirements and risk assessment',
      priority: 'medium'
    });
  }
  
  return suggestions;
}
