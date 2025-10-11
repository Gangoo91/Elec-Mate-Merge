// Comprehensive agent suggestion logic for all 6 agents
export function suggestNextAgents(
  currentAgent: string,
  userQuery: string,
  agentResponse: string,
  previousAgents: string[]
): Array<{agent: string; reason: string; priority?: string}> {
  const suggestions = [];
  
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
