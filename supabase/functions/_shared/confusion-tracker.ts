/**
 * User Confusion Tracking System (Phase 7E)
 * Tracks user follow-up questions to identify confusing aspects of responses
 * and continuously improve the system
 */

import { createClient } from './deps.ts';

export interface ConfusionPattern {
  originalQuery: string;
  originalResponse: string;
  userFollowUp: string;
  confusionType: 'calculation_unclear' | 'regulation_missing' | 'assumption_wrong' | 'terminology' | 'why_question';
  timestamp: string;
  userId?: string;
  sessionId?: string;
  agentName?: string;
  circuitType?: string;
  resolutionProvided?: boolean;
}

/**
 * Track confusion pattern for future learning
 */
export async function trackConfusion(pattern: ConfusionPattern): Promise<void> {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store to learning review queue for analysis
    const { error } = await supabase
      .from('learning_review_queue')
      .insert({
        agent_name: pattern.agentName || 'designer',
        issue_type: pattern.confusionType,
        ai_answer: pattern.originalResponse,
        user_correction: pattern.userFollowUp,
        status: 'pending',
        pattern_frequency: 1,
        suggested_prompt_change: generatePromptSuggestion(pattern),
      });

    if (error) {
      console.error('Failed to track confusion:', error);
    } else {
      console.log('📝 Confusion pattern tracked:', {
        type: pattern.confusionType,
        session: pattern.sessionId
      });
    }
  } catch (error) {
    console.error('Error tracking confusion:', error);
    // Non-critical - don't throw
  }
}

/**
 * Generate suggested prompt improvements based on confusion pattern
 */
function generatePromptSuggestion(pattern: ConfusionPattern): string {
  const suggestions: Record<string, string> = {
    'calculation_unclear': 'Add explicit calculation breakdown section showing step-by-step working',
    'regulation_missing': 'Include all relevant regulation references upfront, not just primary ones',
    'assumption_wrong': 'State all assumptions clearly before presenting the solution',
    'terminology': 'Define technical terms when first used, especially for apprentice-level users',
    'why_question': 'Proactively explain WHY decisions are made, not just WHAT they are'
  };

  return suggestions[pattern.confusionType] || 'Review and improve clarity of response';
}

/**
 * Detect if user message is a confusion/clarification question
 */
export function detectConfusionSignals(
  userMessage: string,
  conversationalContext: any
): { isConfused: boolean; confusionType?: string; topic?: string } {
  const lowerMessage = userMessage.toLowerCase().trim();

  // "Why" questions about previous response
  if (lowerMessage.startsWith('why ') && conversationalContext.lastDesign) {
    return {
      isConfused: true,
      confusionType: 'why_question',
      topic: conversationalContext.lastTopic
    };
  }

  // Confusion indicators
  const confusionPatterns = [
    { pattern: /don't understand|confused about|not clear/i, type: 'calculation_unclear' },
    { pattern: /but (what|where|which|how) regulation/i, type: 'regulation_missing' },
    { pattern: /assumed|assumption|didn't specify/i, type: 'assumption_wrong' },
    { pattern: /what (does|is|means) .* mean/i, type: 'terminology' },
    { pattern: /but (i|we) said|actually (i|we)/i, type: 'assumption_wrong' }
  ];

  for (const { pattern, type } of confusionPatterns) {
    if (pattern.test(lowerMessage)) {
      return {
        isConfused: true,
        confusionType: type,
        topic: conversationalContext.lastTopic
      };
    }
  }

  return { isConfused: false };
}

/**
 * Get common confusion patterns for proactive prevention
 */
export async function getCommonConfusions(
  circuitType?: string,
  limit: number = 5
): Promise<string[]> {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const query = supabase
      .from('learning_review_queue')
      .select('suggested_prompt_change, pattern_frequency')
      .eq('agent_name', 'designer')
      .eq('status', 'pending')
      .order('pattern_frequency', { ascending: false })
      .limit(limit);

    const { data, error } = await query;

    if (error || !data) return [];

    return data.map(d => d.suggested_prompt_change).filter(Boolean);
  } catch (error) {
    console.error('Error fetching common confusions:', error);
    return [];
  }
}
