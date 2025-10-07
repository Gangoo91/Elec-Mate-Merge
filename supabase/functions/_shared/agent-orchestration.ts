// Phase 4: Agentic Orchestration
// Plans and coordinates agent execution with context passing

import { Message, ConversationSummary, ConversationState } from './conversation-memory.ts';
import { IntentAnalysis } from './intent-detection.ts';

export interface AgentPlan {
  sequence: AgentStep[];
  reasoning: string;
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
}

export interface AgentStep {
  agent: 'designer' | 'cost-engineer' | 'installer' | 'health-safety' | 'commissioning';
  priority: number;
  reasoning: string;
  dependencies: string[]; // Which previous agents must complete first
}

export interface AgentContext {
  messages: Message[];
  conversationSummary: ConversationSummary;
  conversationState: ConversationState;
  previousAgentOutputs: AgentOutput[];
  userQuery: string;
  fullConversationThread: Message[]; // Complete thread including agent responses
}

export interface AgentOutput {
  agent: string;
  response: string;
  citations: any[];
  toolCalls: any[];
  costUpdates?: any;
  confidence: number;
}

// Normalise intent keys to agent IDs
function normaliseIntentKey(k: string): 'designer' | 'cost-engineer' | 'installer' | 'health-safety' | 'commissioning' {
  const map: Record<string, 'designer' | 'cost-engineer' | 'installer' | 'health-safety' | 'commissioning'> = {
    design: 'designer',
    designer: 'designer',
    cost: 'cost-engineer',
    'cost-engineer': 'cost-engineer',
    installation: 'installer',
    installer: 'installer',
    safety: 'health-safety',
    'health-safety': 'health-safety',
    ppe: 'health-safety',
    hazard: 'health-safety',
    risk: 'health-safety',
    'risk-assessment': 'health-safety',
    commissioning: 'commissioning'
  };
  return map[k] ?? 'designer';
}

export async function planAgentSequence(
  intentAnalysis: IntentAnalysis,
  conversationSummary: ConversationSummary,
  userQuery: string,
  openAIApiKey: string
): Promise<AgentPlan> {
  
  try {
    console.log('📋 Using RULE-BASED agent planning (fast, deterministic)');
    
    // Defensive check: ensure intents object exists
    if (!intentAnalysis || !intentAnalysis.intents) {
      console.warn('⚠️ Invalid intent analysis, using default full sequence');
      return createStandardSequence('Full design workflow');
    }

    // Get intent scores (with safe defaults)
    const intents = intentAnalysis.intents || {};
    const designScore = intents.design || intents.designer || 0;
    const costScore = intents.cost || intents['cost-engineer'] || 0;
    const installScore = intents.installation || intents.installer || 0;
    const commissionScore = intents.commissioning || 0;

    // RULE 1: Single high-confidence intent
    const highConfidenceIntents = Object.entries(intents)
      .filter(([_, score]) => score >= 0.7)
      .map(([agent, score]) => ({ agent: normaliseIntentKey(agent), score }));

    if (highConfidenceIntents.length === 1) {
      console.log(`✅ Single high-confidence intent: ${highConfidenceIntents[0].agent}`);
      return {
        sequence: [{
          agent: highConfidenceIntents[0].agent,
          priority: 1,
          reasoning: `Primary focus on ${highConfidenceIntents[0].agent}`,
          dependencies: []
        }],
        reasoning: 'Single clear intent detected',
        estimatedComplexity: 'simple'
      };
    }

    // RULE 2: Testing/commissioning only query
    if (commissionScore >= 0.6 && designScore < 0.4 && costScore < 0.4) {
      console.log('✅ Testing/commissioning query detected');
      return {
        sequence: [{
          agent: 'commissioning',
          priority: 1,
          reasoning: 'Testing and commissioning focus',
          dependencies: []
        }],
        reasoning: 'Commissioning-only request',
        estimatedComplexity: 'simple'
      };
    }

    // RULE 3: Cost-only query (but not if design needed)
    if (costScore >= 0.6 && designScore < 0.4 && installScore < 0.4) {
      console.log('✅ Cost estimation query detected');
      return {
        sequence: [{
          agent: 'cost-engineer',
          priority: 1,
          reasoning: 'Pricing and cost focus',
          dependencies: []
        }],
        reasoning: 'Cost-only request',
        estimatedComplexity: 'simple'
      };
    }

    // RULE 4: Installation-only query (practical guidance)
    if (installScore >= 0.6 && designScore < 0.4 && commissionScore < 0.4) {
      console.log('✅ Installation guidance query detected');
      return {
        sequence: [{
          agent: 'installer',
          priority: 1,
          reasoning: 'Practical installation focus',
          dependencies: []
        }],
        reasoning: 'Installation-only request',
        estimatedComplexity: 'simple'
      };
    }

    // RULE 5: New circuit design (full workflow)
    // If design score is high, use standard sequence: designer → cost → installer → commissioning
    if (designScore >= 0.5) {
      console.log('✅ Full circuit design detected - using standard sequence');
      return createStandardSequence('Complete circuit design workflow');
    }

    // RULE 6: Multiple intents (partial workflow)
    // Build sequence based on which intents are present
    const sequence: AgentStep[] = [];
    let priority = 1;

    if (designScore >= 0.4) {
      sequence.push({
        agent: 'designer',
        priority: priority++,
        reasoning: 'Circuit design and calculations',
        dependencies: []
      });
    }

    if (costScore >= 0.4) {
      sequence.push({
        agent: 'cost-engineer',
        priority: priority++,
        reasoning: 'Pricing and budgeting',
        dependencies: designScore >= 0.4 ? ['designer'] : []
      });
    }

    if (installScore >= 0.4) {
      sequence.push({
        agent: 'installer',
        priority: priority++,
        reasoning: 'Installation guidance',
        dependencies: designScore >= 0.4 ? ['designer'] : []
      });
    }

    if (commissionScore >= 0.4) {
      sequence.push({
        agent: 'commissioning',
        priority: priority++,
        reasoning: 'Testing and certification',
        dependencies: []
      });
    }

    // Ensure we have at least one agent
    if (sequence.length === 0) {
      console.warn('⚠️ No clear intents, using default designer');
      return {
        sequence: [{
          agent: 'designer',
          priority: 1,
          reasoning: 'Default - need more context',
          dependencies: []
        }],
        reasoning: 'Unclear request - starting with design',
        estimatedComplexity: 'simple'
      };
    }

    console.log(`✅ Built sequence from intents: ${sequence.map(s => s.agent).join(' → ')}`);
    
    return {
      sequence,
      reasoning: 'Rule-based planning from intent analysis',
      estimatedComplexity: sequence.length > 2 ? 'complex' : 'moderate'
    };

  } catch (outerError) {
    console.error('❌ Critical error in planAgentSequence:', outerError);
    return createStandardSequence('Emergency fallback - full workflow');
  }
}

// Helper: Create standard full sequence
function createStandardSequence(reasoning: string): AgentPlan {
  return {
    sequence: [
      { agent: 'designer', priority: 1, reasoning: 'Circuit design and calculations', dependencies: [] },
      { agent: 'cost-engineer', priority: 2, reasoning: 'Material and labour pricing', dependencies: ['designer'] },
      { agent: 'installer', priority: 3, reasoning: 'Practical installation guidance', dependencies: ['designer'] },
      { agent: 'health-safety', priority: 4, reasoning: 'Risk assessment and PPE requirements', dependencies: ['installer'] },
      { agent: 'commissioning', priority: 5, reasoning: 'Testing and certification', dependencies: [] }
    ],
    reasoning,
    estimatedComplexity: 'complex' as const
  };
}

function createFallbackPlan(intentAnalysis: IntentAnalysis): AgentPlan {
  // Safe defaults if intents are missing or malformed
  const intents = intentAnalysis?.intents ?? { 
    design: 0.6, 
    cost: 0.5, 
    installation: 0.5, 
    commissioning: 0.4 
  };
  
  const sequence: AgentStep[] = [];
  let priority = 1;

  // Add agents in logical order based on confidence
  const sortedIntents = Object.entries(intents)
    .filter(([_, score]) => (score ?? 0) >= 0.4)
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));

  for (const [intentKey, score] of sortedIntents) {
    const agent = normaliseIntentKey(intentKey);
    // Prevent duplicates if multiple keys normalise to same agent
    if (!sequence.find(s => s.agent === agent)) {
      sequence.push({
        agent,
        priority: priority++,
        reasoning: `Intent score: ${(score ?? 0).toFixed(2)}`,
        dependencies: []
      });
    }
  }

  // Ultimate fallback: always have at least one agent
  if (sequence.length === 0) {
    sequence.push({ 
      agent: 'designer', 
      priority: 1, 
      reasoning: 'Ultimate fallback - no valid intents', 
      dependencies: [] 
    });
  }

  return {
    sequence,
    reasoning: 'Fallback plan based on normalised intent scores',
    estimatedComplexity: sequence.length > 2 ? 'complex' : 'simple'
  };
}

export function shouldRetryWithFeedback(
  agentOutput: AgentOutput,
  validationIssues: string[]
): boolean {
  return agentOutput.confidence < 0.7 || validationIssues.length > 0;
}
