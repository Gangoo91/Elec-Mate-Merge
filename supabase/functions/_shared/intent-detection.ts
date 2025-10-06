// Phase 3: AI-Powered Intent Detection
// Replaces keyword matching with semantic understanding

import { Message, ConversationSummary } from './conversation-memory.ts';

export interface IntentAnalysis {
  intents: {
    design: number;      // 0-1 confidence
    cost: number;
    installation: number;
    commissioning: number;
  };
  primaryIntent: 'design' | 'cost' | 'installation' | 'commissioning' | 'general';
  reasoning: string;
  requiresClarification: boolean;
  suggestedFollowUp?: string;
}

export async function detectIntents(
  latestMessage: string,
  conversationSummary: ConversationSummary,
  openAIApiKey: string
): Promise<IntentAnalysis> {
  const intentPrompt = `Analyze this user message and determine which electrical specialist agents should respond.

User message: "${latestMessage}"

Conversation context:
- Project type: ${conversationSummary.projectType}
- Last topic: ${conversationSummary.lastTopic}
- Key facts: ${conversationSummary.keyFacts.join(', ')}
- Recent decisions: ${conversationSummary.decisions.join(', ')}

Available specialists:
- DESIGN agent: Circuit design, cable sizing, voltage drop calculations, BS 7671 regulations, protection devices
- COST agent: Material pricing, labour estimates, budget optimization, supplier recommendations
- INSTALLATION agent: Practical installation methods, cable routing, mounting, tools required
- COMMISSIONING agent: Testing procedures, commissioning, certification, test results interpretation

Return JSON with:
{
  "intents": {
    "design": 0.0-1.0,
    "cost": 0.0-1.0,
    "installation": 0.0-1.0,
    "commissioning": 0.0-1.0
  },
  "primaryIntent": "design" | "cost" | "installation" | "commissioning" | "general",
  "reasoning": "Brief explanation of why these intents were selected",
  "requiresClarification": boolean,
  "suggestedFollowUp": "Question to ask if clarification needed (optional)"
}

Rules:
- If user is just acknowledging (e.g., "sounds great", "okay", "yes"), check conversation context to determine next logical step
- If message is vague or requires more info, set requiresClarification=true
- Confidence scores: >0.7 = definitely relevant, 0.4-0.7 = possibly relevant, <0.4 = not relevant`;

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
          { role: 'system', content: 'You are an intent classification system for electrical installation conversations. Always return valid JSON.' },
          { role: 'user', content: intentPrompt }
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 400
      }),
    });

    if (!response.ok) {
      console.error('Intent detection API error:', await response.text());
      return fallbackIntentDetection(latestMessage);
    }

    const data = await response.json();
    const intentData = JSON.parse(data.choices[0]?.message?.content || '{}');
    
    console.log('🎯 AI Intent Analysis:', intentData);
    return intentData as IntentAnalysis;

  } catch (error) {
    console.error('Intent detection failed, using fallback:', error);
    return fallbackIntentDetection(latestMessage);
  }
}

// Fallback to keyword-based detection if AI fails
function fallbackIntentDetection(message: string): IntentAnalysis {
  const lower = message.toLowerCase();
  
  const designScore = ['cable', 'size', 'mcb', 'voltage', 'regulation', 'amp', 'circuit', 'design']
    .filter(kw => lower.includes(kw)).length / 8;
  
  const costScore = ['price', 'cost', 'budget', 'cheap', 'wholesaler']
    .filter(kw => lower.includes(kw)).length / 5;
  
  const installScore = ['install', 'how to', 'method', 'mount', 'route']
    .filter(kw => lower.includes(kw)).length / 5;
  
  const commissionScore = ['test', 'certificate', 'verify', 'inspect', 'commission']
    .filter(kw => lower.includes(kw)).length / 5;

  const scores = { design: designScore, cost: costScore, installation: installScore, commissioning: commissionScore };
  const primaryIntent = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as any;

  return {
    intents: scores,
    primaryIntent: scores[primaryIntent] > 0.3 ? primaryIntent : 'general',
    reasoning: 'Fallback keyword-based detection',
    requiresClarification: Object.values(scores).every(s => s < 0.3)
  };
}
