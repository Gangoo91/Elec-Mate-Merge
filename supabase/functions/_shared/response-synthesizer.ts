// PHASE 4: Intelligent Response Synthesis
// Combines agent outputs into coherent, context-aware responses

import type { IntentAnalysis } from './intent-detection.ts';
import type { ConversationState } from './conversation-memory.ts';
import type { AgentOutput } from './agent-orchestration.ts';

interface SynthesisConfig {
  intents: IntentAnalysis;
  agentOutputs: AgentOutput[];
  conversationState: ConversationState;
  foundRegulations: any[];
  ragMetadata: {
    totalRAGCalls: number;
    regulationCount: number;
    searchMethod: string;
  };
  agentChain: string[];
  validationReport?: string;
}

export async function synthesizeAgentOutputs(config: SynthesisConfig): Promise<string> {
  const {
    intents,
    agentOutputs,
    conversationState,
    foundRegulations,
    ragMetadata,
    agentChain,
    validationReport
  } = config;

  // Check if this is a multi-circuit design
  const designerOutput = agentOutputs.find(o => o.agent === 'designer');
  const isMultiCircuit = designerOutput?.data?.structuredData?.circuits?.length > 1;
  
  let synthesizedResponse = '';

  // Add introduction
  if (isMultiCircuit) {
    synthesizedResponse += `I've designed a complete ${conversationState.projectType || 'electrical'} installation with ${designerOutput.data.structuredData.circuits.length} circuits, all compliant with BS 7671:2018+A2:2022.\n\n`;
  } else {
    synthesizedResponse += `Here's your BS 7671-compliant design:\n\n`;
  }

  // For multi-circuit designs, create a structured narrative
  if (isMultiCircuit && designerOutput) {
    // Designer summary
    synthesizedResponse += `## Circuit Design Summary\n\n`;
    synthesizedResponse += designerOutput.response + '\n\n';

    // Cost breakdown if available
    const costOutput = agentOutputs.find(o => o.agent === 'cost');
    if (costOutput) {
      synthesizedResponse += `## Cost Estimate\n\n`;
      synthesizedResponse += costOutput.response + '\n\n';
    }

    // Installation guidance
    const installerOutput = agentOutputs.find(o => o.agent === 'installer');
    if (installerOutput) {
      synthesizedResponse += `## Installation Notes\n\n`;
      synthesizedResponse += installerOutput.response + '\n\n';
    }

    // Safety considerations
    const safetyOutput = agentOutputs.find(o => o.agent === 'health-safety');
    if (safetyOutput) {
      synthesizedResponse += `## Health & Safety\n\n`;
      synthesizedResponse += safetyOutput.response + '\n\n';
    }

    // Project management timeline
    const projectOutput = agentOutputs.find(o => o.agent === 'project-mgmt');
    if (projectOutput) {
      synthesizedResponse += `## Project Timeline\n\n`;
      synthesizedResponse += projectOutput.response + '\n\n';
    }

  } else {
    // Single circuit - simpler narrative flow
    synthesizedResponse += agentOutputs
      .map(output => output.response)
      .join('\n\n');
  }

  // Add regulation citations footer
  if (foundRegulations.length > 0) {
    synthesizedResponse += `\n\n---\n\n`;
    synthesizedResponse += `**📚 Regulations Applied:** This design references ${foundRegulations.length} BS 7671 regulations`;
    
    if (ragMetadata.searchMethod) {
      synthesizedResponse += ` (Search: ${ragMetadata.searchMethod === 'exact' ? 'Exact match' : ragMetadata.searchMethod === 'vector' ? 'Semantic search' : 'Hybrid exact + semantic'})`;
    }
    
    synthesizedResponse += `\n\n`;
    
    // List top 5 most relevant regulations
    const topRegs = foundRegulations
      .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
      .slice(0, 5);
    
    topRegs.forEach(reg => {
      synthesizedResponse += `- **${reg.regulation_number}** ${reg.section}: ${reg.content.substring(0, 100)}...\n`;
    });
  }

  // Add performance metadata
  synthesizedResponse += `\n\n---\n\n`;
  synthesizedResponse += `*Designed by: ${agentChain.map(a => formatAgentName(a)).join(' → ')}*\n`;
  synthesizedResponse += `*RAG efficiency: ${ragMetadata.totalRAGCalls} database ${ragMetadata.totalRAGCalls === 1 ? 'query' : 'queries'} (regulations shared across agents)*`;

  // Add validation warnings if any
  if (validationReport) {
    synthesizedResponse += `\n\n⚠️ **Validation Notes:**\n${validationReport}`;
  }

  return synthesizedResponse;
}

function formatAgentName(agent: string): string {
  const names: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost': 'Cost Engineer',
    'installer': 'Installation Specialist',
    'health-safety': 'H&S Advisor',
    'inspector': 'Inspector',
    'project-mgmt': 'Project Manager'
  };
  return names[agent] || agent;
}
