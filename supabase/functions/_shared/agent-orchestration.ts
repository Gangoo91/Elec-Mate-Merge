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
  agent: 'designer' | 'cost-engineer' | 'installer' | 'commissioning';
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
}

export interface AgentOutput {
  agent: string;
  response: string;
  citations: any[];
  toolCalls: any[];
  costUpdates?: any;
  confidence: number;
}

export async function planAgentSequence(
  intentAnalysis: IntentAnalysis,
  conversationSummary: ConversationSummary,
  userQuery: string,
  openAIApiKey: string
): Promise<AgentPlan> {
  
  try {
    // Defensive check: ensure intents object exists
    if (!intentAnalysis || !intentAnalysis.intents) {
      console.warn('⚠️ Invalid intent analysis, using fallback');
      return createFallbackPlan({ 
        intents: { designer: 0.5 }, 
        primaryIntent: 'designer',
        reasoning: 'Fallback due to missing intent data',
        needsClarification: false 
      });
    }

    // Simple cases: Single high-confidence intent
    const highConfidenceIntents = Object.entries(intentAnalysis.intents)
      .filter(([_, score]) => score >= 0.7)
      .map(([agent, score]) => ({ agent, score }));

    if (highConfidenceIntents.length === 1) {
      return {
        sequence: [{
          agent: highConfidenceIntents[0].agent as any,
          priority: 1,
          reasoning: `Primary focus on ${highConfidenceIntents[0].agent}`,
          dependencies: []
        }],
        reasoning: 'Single clear intent detected',
        estimatedComplexity: 'simple'
      };
    }

  // Complex cases: Use GPT-5 to plan sequence
  const planningPrompt = `You're planning which electrical specialists to consult and in what order.

User query: "${userQuery}"
Conversation context: ${conversationSummary.lastTopic}
Intent scores: ${JSON.stringify(intentAnalysis.intents)}

Available agents:
- designer: Circuit design, calculations, BS 7671 compliance
- cost-engineer: Material pricing, budget estimates
- installer: Practical installation guidance
- commissioning: Testing and certification

Plan the optimal sequence. For example:
- If asking about a new circuit: designer → cost-engineer → installer → commissioning
- If asking about testing: commissioning only
- If asking about cost: cost-engineer only (unless design not done yet, then designer → cost-engineer)

Return JSON:
{
  "sequence": [
    {
      "agent": "designer",
      "priority": 1,
      "reasoning": "Need design calculations first",
      "dependencies": []
    },
    {
      "agent": "cost-engineer",
      "priority": 2,
      "reasoning": "Cost depends on design output",
      "dependencies": ["designer"]
    }
  ],
  "reasoning": "Overall strategy explanation",
  "estimatedComplexity": "simple" | "moderate" | "complex"
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: 'You are an agent coordination planner. Return valid JSON.' },
          { role: 'user', content: planningPrompt }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 600
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const plan = JSON.parse(data.choices[0]?.message?.content || '{}');
      console.log('📋 Agent Plan:', plan);
      return plan as AgentPlan;
    }
  } catch (error) {
    console.error('Planning failed, using fallback:', error);
  }

  // Fallback: Create sequence based on intent scores
  return createFallbackPlan(intentAnalysis);
  } catch (outerError) {
    console.error('❌ Critical error in planAgentSequence:', outerError);
    // Ultimate fallback
    return {
      sequence: [{
        agent: 'designer',
        priority: 1,
        reasoning: 'Emergency fallback - critical error in planning',
        dependencies: []
      }],
      reasoning: 'Emergency fallback due to critical error',
      estimatedComplexity: 'simple'
    };
  }
}

function createFallbackPlan(intentAnalysis: IntentAnalysis): AgentPlan {
  const sequence: AgentStep[] = [];
  let priority = 1;

  // Add agents in logical order based on confidence
  const sortedIntents = Object.entries(intentAnalysis.intents)
    .filter(([_, score]) => score >= 0.4)
    .sort((a, b) => b[1] - a[1]);

  for (const [agent, score] of sortedIntents) {
    sequence.push({
      agent: agent as any,
      priority: priority++,
      reasoning: `Intent score: ${score.toFixed(2)}`,
      dependencies: priority > 2 ? [sequence[0].agent] : []
    });
  }

  return {
    sequence,
    reasoning: 'Fallback plan based on intent scores',
    estimatedComplexity: sequence.length > 2 ? 'complex' : 'simple'
  };
}

export function shouldRetryWithFeedback(
  agentOutput: AgentOutput,
  validationIssues: string[]
): boolean {
  return agentOutput.confidence < 0.7 || validationIssues.length > 0;
}
