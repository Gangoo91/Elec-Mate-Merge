// Phase 2: Conversation Memory System
// Provides conversation state tracking and summarization

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ConversationState {
  projectType: 'domestic' | 'commercial' | 'industrial' | 'unknown';
  circuits: Circuit[];
  constraints: {
    budget?: number;
    timeline?: string;
    location?: string;
    buildingType?: string;
  };
  decisions: Decision[];
  requirements: string[];
  openQuestions: string[];
  stage: 'discovery' | 'design' | 'costing' | 'implementation' | 'testing' | 'refinement';
}

export interface Circuit {
  type: string;
  load?: number;
  cableSize?: number;
  protection?: string;
  status: 'pending' | 'designed' | 'costed' | 'approved';
}

export interface Decision {
  topic: string;
  decision: string;
  reasoning: string;
  timestamp: string;
}

export interface ConversationSummary {
  projectType: string;
  decisions: string[];
  requirements: string[];
  openQuestions: string[];
  keyFacts: string[];
  lastTopic: string;
  circuits?: any[];
  calculations?: any;
  constraints?: any;
}

export function buildConversationState(messages: Message[], context?: any): ConversationState {
  const state: ConversationState = {
    projectType: 'unknown',
    circuits: [],
    constraints: {},
    decisions: [],
    requirements: [],
    openQuestions: [],
    stage: 'discovery'
  };

  // Analyze messages to build state
  for (const msg of messages) {
    if (msg.role === 'user') {
      const content = msg.content.toLowerCase();
      
      // Detect project type
      if (content.includes('domestic') || content.includes('house') || content.includes('flat') || content.includes('bed')) {
        state.projectType = 'domestic';
      } else if (content.includes('commercial') || content.includes('shop') || content.includes('office')) {
        state.projectType = 'commercial';
      } else if (content.includes('industrial') || content.includes('factory')) {
        state.projectType = 'industrial';
      }

      // Extract building type
      if (content.includes('3-bed') || content.includes('three bed')) {
        state.constraints.buildingType = '3-bed house';
      } else if (content.includes('4-bed') || content.includes('four bed')) {
        state.constraints.buildingType = '4-bed house';
      }

      // Detect circuits being discussed
      if (content.includes('shower')) {
        addCircuitIfNew(state.circuits, { type: 'shower', status: 'pending' });
      }
      if (content.includes('cooker')) {
        addCircuitIfNew(state.circuits, { type: 'cooker', status: 'pending' });
      }
      if (content.includes('ev charger') || content.includes('car charger')) {
        addCircuitIfNew(state.circuits, { type: 'ev_charger', status: 'pending' });
      }

      // Extract constraints
      const budgetMatch = content.match(/£?(\d+[,\d]*)/);
      if (content.includes('budget') && budgetMatch) {
        state.constraints.budget = parseInt(budgetMatch[1].replace(',', ''));
      }
    }

    // Track decisions from assistant messages
    if (msg.role === 'assistant') {
      const content = msg.content.toLowerCase();
      
      // Detect stage progression
      if (content.includes('calculate') || content.includes('cable size') || content.includes('mcb')) {
        state.stage = 'design';
      } else if (content.includes('cost') || content.includes('price') || content.includes('£')) {
        state.stage = 'costing';
      } else if (content.includes('test') || content.includes('commission')) {
        state.stage = 'testing';
      }
    }
  }

  return state;
}

function addCircuitIfNew(circuits: Circuit[], newCircuit: Circuit) {
  if (!circuits.some(c => c.type === newCircuit.type)) {
    circuits.push(newCircuit);
  }
}

export async function summarizeConversation(
  messages: Message[],
  openAIApiKey: string
): Promise<ConversationSummary> {
  // For conversations < 10 messages, use simple extraction
  if (messages.length < 10) {
    return extractSimpleSummary(messages);
  }

  // UPGRADE: Use FULL conversation with smart compression for older messages
  // Keep last 20 messages full, compress older ones BUT preserve technical specs
  const recentMessages = messages.slice(-20);
  const olderMessages = messages.slice(0, -20);
  
  // Import query parser to detect technical content
  const { parseQueryEntities } = await import('./query-parser.ts');
  
  // Compress older messages but preserve technical specs
  const compressedOlder = olderMessages.map(msg => {
    const entities = parseQueryEntities(msg.content);
    
    // NEVER compress messages with technical parameters
    if (entities.power || entities.distance || entities.loadType) {
      return `${msg.role}: ${msg.content}`; // Keep full message
    }
    
    // Only compress conversational fluff
    if (msg.role === 'user' && msg.content.length > 200) {
      return `${msg.role}: [User query about electrical installation]`;
    }
    
    return `${msg.role}: ${msg.content}`;
  });
  
  const conversationText = [
    ...compressedOlder,
    ...recentMessages.map(m => `${m.role}: ${m.content}`)
  ].filter(Boolean).join('\n');

  const summaryPrompt = `Analyze this electrical installation conversation and extract COMPREHENSIVE structured data as JSON:

${conversationText}

Return JSON with these keys:
- projectType: string (domestic/commercial/industrial)
- decisions: string[] (ALL key decisions made with reasoning)
- requirements: string[] (ALL user requirements extracted)
- openQuestions: string[] (questions still unanswered)
- keyFacts: string[] (ALL technical facts: cable sizes, MCB ratings, loads, correction factors, Zs values, installation methods, etc.)
- circuits: array of {type, cableSize, protection, load, method, status} (extract ALL circuits discussed)
- calculations: {cableCapacity?, voltageDrop?, earthFault?, diversity?} (extract any calculation results)
- constraints: {budget?, timeline?, location?, buildingType?, specialRequirements?}
- lastTopic: string (what was the most recent topic discussed)

CRITICAL: Extract ALL technical specifications and reasoning chains, not just summaries.`;

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
          { role: 'system', content: 'You extract ALL structured information from electrical conversations. Return comprehensive JSON with every technical detail.' },
          { role: 'user', content: summaryPrompt },
        ],
        response_format: { type: "json_object" },
        max_completion_tokens: 2000
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return JSON.parse(data.choices[0]?.message?.content || '{}');
    }
  } catch (error) {
    console.error('Summarization failed, using simple extraction:', error);
  }

  return extractSimpleSummary(messages);
}

function extractSimpleSummary(messages: Message[]): ConversationSummary {
  const state = buildConversationState(messages);
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  
  return {
    projectType: state.projectType,
    decisions: state.decisions.map(d => d.decision),
    requirements: state.requirements,
    openQuestions: state.openQuestions,
    keyFacts: state.circuits.map(c => `${c.type} circuit`),
    lastTopic: detectLastTopic(messages)
  };
}

function detectLastTopic(messages: Message[]): string {
  const recentAssistant = messages.filter(m => m.role === 'assistant').slice(-2);
  const combined = recentAssistant.map(m => m.content.toLowerCase()).join(' ');
  
  if (combined.includes('3-bed') || combined.includes('three bed')) return '3-bed house design';
  if (combined.includes('shower')) return 'shower circuit';
  if (combined.includes('cooker')) return 'cooker circuit';
  if (combined.includes('ev') || combined.includes('charger')) return 'ev charger';
  if (combined.includes('cable') && combined.includes('size')) return 'cable sizing';
  if (combined.includes('test')) return 'testing and commissioning';
  
  return 'general electrical installation';
}
