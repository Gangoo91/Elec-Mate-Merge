/**
 * Rich Agent Request Types
 * Enhanced request envelope for better AI responses
 */

export interface RichAgentRequest {
  // Core query
  query: string;
  
  // User context (for personalization)
  userContext?: {
    experienceLevel: 'apprentice' | 'electrician' | 'designer' | 'expert';
    previousQueries?: string[]; // Last 3 queries for context
    preferredExplanationStyle?: 'technical' | 'conversational' | 'detailed';
  };
  
  // Project context (for better recommendations)
  projectContext?: {
    projectType?: 'domestic' | 'commercial' | 'industrial';
    buildingAge?: 'new' | 'modern' | 'period';
    budget?: 'tight' | 'standard' | 'premium';
  };
  
  // System context (for optimization)
  systemContext?: {
    cacheHint?: string; // Hint for cache key
    requiresFastResponse?: boolean; // <5s response time needed
    allowFallback?: boolean; // OK to return template response if AI fails
    cacheWarming?: boolean; // This is a cache warming request
  };
  
  // Legacy support (backward compatible)
  circuitType?: string;
  power?: number;
  voltage?: number;
  cableLength?: number;
  messages?: any[];
  previousAgentOutputs?: any[];
}

export interface AgentResponse {
  success: boolean;
  response?: string;
  result?: any;
  error?: string;
  data?: any;
  structuredData?: any;
  enrichment?: {
    displayHints?: {
      primaryView?: string;
      expandableSections?: string[];
      highlightTerms?: string[];
    };
    interactiveElements?: any[];
  };
  citations?: Array<{
    source?: string;
    section?: string;
    regulation_number?: string;
    title?: string;
    content?: string;
    excerpt?: string;
    relevance?: number;
  }>;
  metadata?: {
    requestId?: string;
    timestamp?: string;
    responseSource?: string;
    calculationTime?: string;
    regulationCount?: number;
    citationConfidence?: number;
    validatedCitations?: boolean;
    [key: string]: any;
  };
  rendering?: {
    layout?: string;
    priority?: string;
    callouts?: any[];
  };
  suggestedNextAgents?: string[];
}

export type AgentType = 'designer' | 'cost-engineer' | 'health-safety' | 'installer' | 'project-manager' | 'commissioning' | 'maintenance' | 'tutor';
