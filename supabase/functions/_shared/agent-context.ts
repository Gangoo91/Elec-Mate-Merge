/**
 * Agent Context Sharing Protocol
 * Enables intelligent context passing between agents
 */

export interface RAGPriority {
  bs7671: number;        // 0-100 priority for regulations
  design: number;        // 0-100 priority for design docs
  health_safety: number; // 0-100 priority for H&S
  installation: number;  // 0-100 priority for installation
  inspection: number;    // 0-100 priority for testing
  project_mgmt: number;  // 0-100 priority for project mgmt
}

export interface QueryIntent {
  primaryGoal: 'design' | 'safety' | 'installation' | 'inspection' | 'pricing' | 'general';
  circuitType?: string;
  powerRating?: number;
  complexity: 'simple' | 'medium' | 'complex';
  requiresCalculations: boolean;
  requiresRegulations: boolean;
  keywords: string[];
}

export interface FoundRegulation {
  regulation_number: string;
  section: string;
  content: string;
  relevance: number;
  source: 'exact' | 'vector' | 'keyword';
}

export interface DesignDecision {
  parameter: string;
  value: any;
  reasoning: string;
  regulation?: string;
  confidence: number;
}

export interface ContextEnvelope {
  // Core tracking
  requestId: string;
  sessionId?: string;
  timestamp: number;
  
  // Intent classification
  queryIntent: QueryIntent;
  
  // Shared knowledge
  foundRegulations: FoundRegulation[];
  designDecisions: DesignDecision[];
  
  // RAG optimization
  ragPriority: RAGPriority;
  embeddingCache?: {
    query: string;
    embedding: number[];
    generatedAt: number;
  };
  
  // Agent handoff
  previousAgent?: string;
  nextAgent?: string;
  agentChain: string[];
  
  // Performance
  totalTokens?: number;
  ragCallCount?: number;
}

export function createContextEnvelope(
  requestId: string,
  queryIntent: QueryIntent
): ContextEnvelope {
  return {
    requestId,
    timestamp: Date.now(),
    queryIntent,
    foundRegulations: [],
    designDecisions: [],
    ragPriority: inferRAGPriority(queryIntent),
    agentChain: [],
    ragCallCount: 0,
    totalTokens: 0,
  };
}

export function inferRAGPriority(intent: QueryIntent): RAGPriority {
  const base: RAGPriority = {
    bs7671: 0,
    design: 0,
    health_safety: 0,
    installation: 0,
    inspection: 0,
    project_mgmt: 0,
  };

  switch (intent.primaryGoal) {
    case 'design':
      base.bs7671 = 95;
      base.design = 100;
      base.installation = 60;
      break;
    case 'safety':
      base.health_safety = 100;
      base.bs7671 = 80;
      base.installation = 50;
      break;
    case 'installation':
      base.installation = 100;
      base.design = 70;
      base.bs7671 = 85;
      break;
    case 'inspection':
      base.inspection = 100;
      base.bs7671 = 90;
      base.installation = 60;
      break;
    case 'pricing':
      base.design = 70;
      base.installation = 60;
      break;
    default:
      base.bs7671 = 70;
      base.design = 70;
      base.health_safety = 50;
  }

  return base;
}

export function mergeContext(
  existing: ContextEnvelope,
  newData: Partial<ContextEnvelope>
): ContextEnvelope {
  return {
    ...existing,
    ...newData,
    foundRegulations: [
      ...existing.foundRegulations,
      ...(newData.foundRegulations || []),
    ].filter((reg, index, self) =>
      index === self.findIndex(r => r.regulation_number === reg.regulation_number)
    ),
    designDecisions: [
      ...existing.designDecisions,
      ...(newData.designDecisions || []),
    ],
    agentChain: [
      ...existing.agentChain,
      ...(newData.agentChain || []),
    ],
    ragCallCount: (existing.ragCallCount || 0) + (newData.ragCallCount || 0),
    totalTokens: (existing.totalTokens || 0) + (newData.totalTokens || 0),
  };
}
