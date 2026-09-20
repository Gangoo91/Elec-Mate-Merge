// Comprehensive agent suggestion logic for all 6 agents
export function suggestNextAgents(
  currentAgent: string,
  userQuery: string,
  agentResponse: string,
  previousAgents: string[]
): Array<{agent: string; reason: string; priority?: string; contextHint?: string}> {
  const suggestions: Array<{agent: string; reason: string; priority?: string; contextHint?: string}> = [];
  
  // DESIGNER SUGGESTIONS
  if (currentAgent === 'designer') {
    // High priority: Cost engineer after design
    if (!previousAgents.includes('cost-engineer')) {
      suggestions.push({
        agent: 'cost-engineer',
        reason: 'Get accurate pricing and materials estimate for this design',
        priority: 'high'
      });
    }
    
    // Medium priority: Installer for practical guidance
    if (!previousAgents.includes('installer')) {
      suggestions.push({
        agent: 'installer',
        reason: 'Get practical installation method and step-by-step guidance',
        priority: 'medium'
      });
    }
    
    // Medium priority: H&S for risk assessment
    if (!previousAgents.includes('health-safety')) {
      suggestions.push({
        agent: 'health-safety',
        reason: 'Review safety requirements and risk assessment',
        priority: 'medium'
      });
    }
  }
  
  // COST ENGINEER SUGGESTIONS
  if (currentAgent === 'cost-engineer') {
    // High priority: Installer for labour costing accuracy
    if (!previousAgents.includes('installer')) {
      suggestions.push({
        agent: 'installer',
        reason: 'Verify labour time estimates with practical installation method',
        priority: 'high'
      });
    }
    
    // Medium priority: Project manager for large installations
    const isLargeJob = agentResponse.includes('£') && parseFloat(agentResponse.match(/£([\d,]+)/)?.[1]?.replace(',', '') || '0') > 5000;
    if (!previousAgents.includes('project-manager') && isLargeJob) {
      suggestions.push({
        agent: 'project-manager',
        reason: 'Large installation - coordinate scheduling and phasing',
        priority: 'medium'
      });
    }
  }
  
  // INSTALLER SUGGESTIONS
  if (currentAgent === 'installer') {
    // High priority: H&S for safety procedures
    if (!previousAgents.includes('health-safety')) {
      suggestions.push({
        agent: 'health-safety',
        reason: 'Create risk assessment and method statement for this installation',
        priority: 'high'
      });
    }
    
    // Medium priority: Commissioning for testing requirements
    if (!previousAgents.includes('commissioning')) {
      suggestions.push({
        agent: 'commissioning',
        reason: 'Prepare testing and commissioning schedule',
        priority: 'medium'
      });
    }
  }
  
  // HEALTH & SAFETY SUGGESTIONS
  if (currentAgent === 'health-safety') {
    // High priority: Commissioning for safe testing procedures
    if (!previousAgents.includes('commissioning')) {
      suggestions.push({
        agent: 'commissioning',
        reason: 'Get testing procedures that comply with safety requirements',
        priority: 'high'
      });
    }
    
    // Medium priority: Project manager for documentation
    if (!previousAgents.includes('project-manager')) {
      suggestions.push({
        agent: 'project-manager',
        reason: 'Coordinate safety documentation and compliance records',
        priority: 'medium'
      });
    }
  }
  
  // COMMISSIONING SUGGESTIONS
  if (currentAgent === 'commissioning') {
    // High priority: Project manager for handover
    if (!previousAgents.includes('project-manager')) {
      suggestions.push({
        agent: 'project-manager',
        reason: 'Coordinate handover documentation and final certification',
        priority: 'high'
      });
    }
  }
  
  // PROJECT MANAGER SUGGESTIONS
  // Typically the final agent, so no suggestions
  
  return suggestions;
}

/**
 * Generate context-aware hints for agent suggestions
 */
export function generateContextHint(
  targetAgent: string,
  currentAgent: string,
  structuredData: any
): string | undefined {
  // Cost Engineer hints
  if (targetAgent === 'cost-engineer' && structuredData?.cableSize) {
    return `Cable: ${structuredData.cableSize}mm² - ready for pricing`;
  }
  
  // Installer hints
  if (targetAgent === 'installer') {
    if (structuredData?.cableSize) {
      return `${structuredData.cableSize}mm² cable installation method needed`;
    }
    if (structuredData?.circuitType) {
      return `${structuredData.circuitType} installation guidance`;
    }
  }
  
  // H&S hints
  if (targetAgent === 'health-safety') {
    if (structuredData?.location === 'bathroom') {
      return `Bathroom zones risk assessment required`;
    }
    if (structuredData?.voltage && structuredData.voltage > 230) {
      return `High voltage safety procedures needed`;
    }
  }
  
  // Commissioning hints
  if (targetAgent === 'commissioning' && structuredData?.circuitBreaker) {
    return `${structuredData.circuitBreaker} testing requirements`;
  }
  
  // Project Manager hints
  if (targetAgent === 'project-manager') {
    const agentCount = structuredData?.consultedAgents?.length || 0;
    if (agentCount >= 3) {
      return `${agentCount} specialists consulted - ready to coordinate`;
    }
  }
  
  return undefined;
}
