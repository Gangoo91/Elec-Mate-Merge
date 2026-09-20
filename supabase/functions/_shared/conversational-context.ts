/**
 * Multi-Turn Conversation Intelligence
 * Extracts context from conversation history and detects follow-up patterns
 */

export interface ConversationalContext {
  lastTopic?: string;
  lastDesign?: any;
  previousParameters?: any;
  conversationDepth: number;
  topics: string[];
}

export interface FollowUpDetection {
  isFollowUp: boolean;
  type: 'what-if' | 'refinement' | 'continuation' | 'clarification' | 'comparison' | '';
  previousTopic: string;
  inheritedParams?: any;
}

/**
 * Extract full conversational context from message history
 */
export function extractConversationalContext(
  messages: any[],
  conversationSummary?: any,
  previousAgentOutputs?: any[]
): ConversationalContext {
  const userMessages = messages.filter(m => m.role === 'user');
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  
  // Extract last design from previous outputs
  let lastDesign = null;
  if (previousAgentOutputs && previousAgentOutputs.length > 0) {
    const lastOutput = previousAgentOutputs[previousAgentOutputs.length - 1];
    if (lastOutput.structuredData?.circuits) {
      lastDesign = lastOutput.structuredData.circuits[0];
    }
  }
  
  // Extract topics discussed
  const topics = userMessages.map(m => {
    const content = m.content.toLowerCase();
    if (content.includes('shower')) return 'shower_circuit';
    if (content.includes('cooker') || content.includes('oven')) return 'cooker_circuit';
    if (content.includes('ev') || content.includes('charger')) return 'ev_charger';
    if (content.includes('outdoor') || content.includes('garage')) return 'outdoor_supply';
    if (content.includes('submain') || content.includes('distribution')) return 'submain';
    return 'general';
  });
  
  // Get last topic
  const lastTopic = topics.length > 0 ? topics[topics.length - 1] : undefined;
  
  // Extract parameters from last assistant response
  let previousParameters = null;
  if (lastDesign) {
    previousParameters = {
      power: lastDesign.power,
      voltage: lastDesign.voltage,
      cableLength: lastDesign.cableLength,
      cableSize: lastDesign.cableSize,
      protectionDevice: lastDesign.protectionDevice
    };
  }
  
  return {
    lastTopic,
    lastDesign,
    previousParameters,
    conversationDepth: userMessages.length,
    topics: [...new Set(topics)] // Unique topics
  };
}

/**
 * Detect if current query is a follow-up to previous conversation
 */
export function detectFollowUpPattern(
  query: string,
  context: ConversationalContext
): FollowUpDetection {
  const lowerQuery = query.toLowerCase().trim();
  
  // "What about X?" / "What if X?" patterns
  if (lowerQuery.startsWith('what about') || lowerQuery.startsWith('what if')) {
    return {
      isFollowUp: true,
      type: 'what-if',
      previousTopic: context.lastTopic || 'previous circuit',
      inheritedParams: context.previousParameters
    };
  }
  
  // "Use X instead" / "Rather than" patterns
  if (lowerQuery.includes('instead') || lowerQuery.includes('rather than') || lowerQuery.includes('change to')) {
    return {
      isFollowUp: true,
      type: 'refinement',
      previousTopic: context.lastDesign?.name || 'previous suggestion',
      inheritedParams: context.previousParameters
    };
  }
  
  // Implicit continuations ("And for outdoor?", "But if...")
  if ((lowerQuery.startsWith('and ') || lowerQuery.startsWith('but ') || lowerQuery.startsWith('also ')) && context.lastTopic) {
    return {
      isFollowUp: true,
      type: 'continuation',
      previousTopic: context.lastTopic,
      inheritedParams: context.previousParameters
    };
  }
  
  // "Why X?" clarifications about previous design
  if (lowerQuery.startsWith('why ') && context.conversationDepth > 1) {
    return {
      isFollowUp: true,
      type: 'clarification',
      previousTopic: context.lastTopic || 'previous design',
      inheritedParams: context.previousParameters
    };
  }
  
  // "X vs Y?" comparisons
  if ((lowerQuery.includes(' vs ') || lowerQuery.includes(' versus ') || lowerQuery.includes('compared to')) && context.lastDesign) {
    return {
      isFollowUp: true,
      type: 'comparison',
      previousTopic: context.lastDesign.cableSize || 'previous cable',
      inheritedParams: context.previousParameters
    };
  }
  
  return { 
    isFollowUp: false, 
    type: '', 
    previousTopic: '',
    inheritedParams: null
  };
}

/**
 * Build enriched system prompt with conversational context
 */
export function enrichSystemPromptWithContext(
  basePrompt: string,
  followUp: FollowUpDetection,
  context: ConversationalContext
): string {
  if (!followUp.isFollowUp) {
    return basePrompt;
  }
  
  let enrichment = '\n\n📝 CONVERSATION CONTEXT:\n';
  
  switch (followUp.type) {
    case 'what-if':
      enrichment += `This is a "what-if" scenario based on previous discussion about: ${followUp.previousTopic}\n`;
      if (followUp.inheritedParams) {
        enrichment += `Previous design parameters: ${JSON.stringify(followUp.inheritedParams, null, 2)}\n`;
        enrichment += `User is exploring variations - maintain continuity with previous design where possible.\n`;
      }
      break;
      
    case 'refinement':
      enrichment += `User wants to refine/change the previous suggestion: "${followUp.previousTopic}"\n`;
      if (context.lastDesign) {
        enrichment += `Previous design: ${context.lastDesign.cableSize} cable, ${context.lastDesign.protectionDevice}\n`;
        enrichment += `Focus on explaining WHY the change is being requested and implications.\n`;
      }
      break;
      
    case 'continuation':
      enrichment += `Continuation of discussion about: ${followUp.previousTopic}\n`;
      enrichment += `Maintain context from previous response and build upon it.\n`;
      break;
      
    case 'clarification':
      enrichment += `User seeking clarification about: ${followUp.previousTopic}\n`;
      if (context.lastDesign) {
        enrichment += `Reference previous design: ${JSON.stringify(context.lastDesign, null, 2)}\n`;
        enrichment += `Provide detailed explanation with regulation citations for WHY decisions were made.\n`;
      }
      break;
      
    case 'comparison':
      enrichment += `User comparing options related to: ${followUp.previousTopic}\n`;
      enrichment += `Provide detailed pros/cons with regulation backing for each option.\n`;
      break;
  }
  
  return basePrompt + enrichment;
}
