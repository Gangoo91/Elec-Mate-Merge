/**
 * Smart Agent Request Builder
 * Auto-detects user context and builds rich requests
 */

import { RichAgentRequest } from '@/types/agent-request';

export function useAgentRequest() {
  const buildRequest = (
    query: string,
    options?: Partial<RichAgentRequest>
  ): RichAgentRequest => {
    // Auto-detect user experience level from query complexity
    const experienceLevel = detectExperienceLevel(query);
    
    // Get recent queries from session storage
    const previousQueries = getRecentQueries();
    
    // Save current query for next time
    saveQuery(query);
    
    // Build rich request
    return {
      query,
      userContext: {
        experienceLevel,
        previousQueries: previousQueries.slice(0, 3),
        preferredExplanationStyle: 'conversational',
        ...options?.userContext
      },
      projectContext: options?.projectContext,
      systemContext: {
        requiresFastResponse: false,
        allowFallback: true,
        ...options?.systemContext
      },
      ...options
    };
  };
  
  return { buildRequest };
}

/**
 * Detect user experience level from query complexity
 */
function detectExperienceLevel(query: string): 'apprentice' | 'electrician' | 'designer' | 'expert' {
  // Apprentice indicators: basic questions, "what is", "how do I"
  if (/what is|how do i|explain|basic|beginner/i.test(query)) {
    return 'apprentice';
  }
  
  // Expert indicators: complex multi-part queries, specific reg numbers
  if (/\d{3}\.\d+\.\d+/.test(query) || query.split(/\s+/).length > 20) {
    return 'expert';
  }
  
  // Designer indicators: design-specific terms
  if (/design|calculate|size|select|Zs|voltage drop/i.test(query)) {
    return 'designer';
  }
  
  return 'electrician'; // Default
}

/**
 * Get recent queries from session storage
 */
function getRecentQueries(): string[] {
  try {
    const stored = sessionStorage.getItem('recent_queries');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save query to session storage (keep last 5)
 */
function saveQuery(query: string): void {
  try {
    const queries = getRecentQueries();
    queries.unshift(query);
    sessionStorage.setItem('recent_queries', JSON.stringify(queries.slice(0, 5)));
  } catch {
    // Ignore storage errors
  }
}
