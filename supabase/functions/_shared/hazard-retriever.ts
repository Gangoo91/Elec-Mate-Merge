/**
 * Intelligent Hazard Retriever V3
 * Returns pre-structured hazards instead of raw regulations
 * 
 * This is the game-changer: RAG does 90% of the work, AI just formats.
 */

import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';

// Types
interface StructuredHazard {
  id: string;
  hazard_description: string;
  hazard_category: string;
  likelihood: number;
  severity: number;
  risk_score: number;
  control_measures: string[];
  control_hierarchy?: string;
  required_ppe?: any;
  applies_to_work_types?: string[];
  applies_to_locations?: string[];
  applies_to_equipment?: string[];
  applies_to_installation_phases?: string[];
  regulation_number: string;
  regulation_section: string;
  regulation_excerpt?: string;
  confidence_score: number;
  usage_count: number;
  similarity?: number;
  linkedToStep?: number;
  relevance?: number;
}

interface RetrievalParams {
  jobDescription: string;
  workType: 'domestic' | 'commercial' | 'industrial';
  location?: string;
  equipment?: string[];
  installationPhases?: string[];
}

/**
 * Main retrieval function: Multi-strategy approach
 */
export async function retrieveStructuredHazards(
  params: RetrievalParams,
  supabase: SupabaseClient
): Promise<StructuredHazard[]> {
  
  console.log('🎯 Hazard Retriever: Starting intelligent retrieval');
  const startTime = performance.now();
  
  try {
    // Step 1: Extract query features
    const location = params.location || detectLocation(params.jobDescription);
    const equipment = params.equipment || detectEquipment(params.jobDescription);
    const phases = params.installationPhases || ['isolation', 'installation', 'testing'];
    
    console.log('📊 Query features:', { 
      workType: params.workType, 
      location, 
      equipment, 
      phases 
    });
    
    // Step 2: Multi-strategy retrieval (parallel)
    const [semanticResults, contextResults, criticalResults] = await Promise.all([
      // Strategy A: Semantic search on hazard descriptions
      semanticHazardSearch(params.jobDescription, supabase),
      
      // Strategy B: Filter by work type + location + equipment
      filterHazardsByContext({
        workType: params.workType,
        location,
        equipment
      }, supabase),
      
      // Strategy C: Get critical hazards that ALWAYS apply
      getCriticalHazards(params.workType, supabase)
    ]);
    
    console.log('📦 Strategy results:', {
      semantic: semanticResults.length,
      context: contextResults.length,
      critical: criticalResults.length
    });
    
    // Step 3: Merge and deduplicate
    const allHazards = [...semanticResults, ...contextResults, ...criticalResults];
    const uniqueHazards = Array.from(
      new Map(allHazards.map(h => [h.id, h])).values()
    );
    
    // Step 4: Link to installation phases
    const linkedHazards = uniqueHazards.map(h => ({
      ...h,
      linkedToStep: determineLinkedStep(h, phases)
    }));
    
    // Step 5: Rank by relevance
    const rankedHazards = linkedHazards
      .map(h => ({
        ...h,
        relevance: calculateRelevance(h, params, location, equipment, phases)
      }))
      .sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
      .slice(0, 20); // Top 20 most relevant
    
    const retrievalTime = performance.now() - startTime;
    console.log(`✅ Retrieved ${rankedHazards.length} pre-structured hazards in ${retrievalTime.toFixed(0)}ms`);
    
    return rankedHazards;
  } catch (error) {
    console.error('❌ Hazard retrieval error:', error);
    return [];
  }
}

/**
 * Strategy A: Semantic search using embeddings
 */
async function semanticHazardSearch(
  query: string,
  supabase: SupabaseClient
): Promise<StructuredHazard[]> {
  
  try {
    // Generate embedding for query
    const embedding = await generateEmbedding(query);
    
    if (!embedding) {
      console.log('⚠️ No embedding generated, skipping semantic search');
      return [];
    }
    
    // Search using RPC function
    const { data, error } = await supabase.rpc('match_extracted_hazards', {
      query_embedding: embedding,
      match_threshold: 0.70,
      match_count: 15
    });
    
    if (error) {
      console.error('Semantic search error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Semantic search failed:', error);
    return [];
  }
}

/**
 * Strategy B: Filter by context (work type, location, equipment)
 */
async function filterHazardsByContext(
  context: {
    workType: string;
    location?: string;
    equipment?: string[];
  },
  supabase: SupabaseClient
): Promise<StructuredHazard[]> {
  
  try {
    // NOTE: regulation_hazards_extracted table does not exist
    // Using regulations_intelligence as alternative
    let query = supabase
      .from('regulations_intelligence')
      .select('*')
      .or(`primary_topic.ilike.%${context.workType}%,secondary_topics.cs.{${context.workType}}`);
    
    if (context.location) {
      query = query.ilike('applies_to', `%${context.location}%`);
    }
    
    if (context.equipment && context.equipment.length > 0) {
      const equipmentFilter = context.equipment.map(eq => `equipment.cs.{${eq}}`).join(',');
      query = query.or(equipmentFilter);
    }
    
    const { data, error } = await query
      .order('confidence_score', { ascending: false })
      .order('usage_count', { ascending: false })
      .limit(15);
    
    if (error) {
      console.error('Context filter error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Context filtering failed:', error);
    return [];
  }
}

/**
 * Strategy C: Get critical hazards that ALWAYS apply
 */
async function getCriticalHazards(
  workType: string,
  supabase: SupabaseClient
): Promise<StructuredHazard[]> {
  
  try {
    // NOTE: regulation_hazards_extracted table does not exist
    // Using regulations_intelligence as alternative
    const { data, error } = await supabase
      .from('regulations_intelligence')
      .select('*')
      .or(`primary_topic.ilike.%${workType}%,regulation_type.eq.electrical`)
      .gte('confidence_score', 0.8) // High confidence
      .order('confidence_score', { ascending: false })
      .limit(5);
    
    if (error) {
      console.error('Critical hazards error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Critical hazards fetch failed:', error);
    return [];
  }
}

/**
 * Link hazards to specific installation steps
 */
function determineLinkedStep(
  hazard: StructuredHazard,
  phases: string[]
): number {
  
  if (!phases || phases.length === 0) return 0;
  
  // Find the first phase this hazard applies to
  for (let i = 0; i < phases.length; i++) {
    if (hazard.applies_to_installation_phases?.includes(phases[i])) {
      return i + 1;
    }
  }
  
  return 0; // General hazard (not step-specific)
}

/**
 * Calculate relevance score for ranking
 */
function calculateRelevance(
  hazard: StructuredHazard,
  params: RetrievalParams,
  location?: string,
  equipment?: string[],
  phases?: string[]
): number {
  
  let score = 0;
  
  // Base score from confidence
  score += hazard.confidence_score * 10;
  
  // Boost if used in past jobs (crowd wisdom)
  score += Math.log(hazard.usage_count + 1) * 5;
  
  // Boost if matches work type
  if (hazard.applies_to_work_types?.includes(params.workType)) {
    score += 20;
  }
  
  // Boost if matches location
  if (location && hazard.applies_to_locations?.includes(location)) {
    score += 15;
  }
  
  // Boost if matches equipment
  if (equipment && equipment.some(e => hazard.applies_to_equipment?.includes(e))) {
    score += 15;
  }
  
  // Boost critical hazards
  if (hazard.severity >= 4 && hazard.hazard_category === 'electrical') {
    score += 25;
  }
  
  // Boost if linked to installation phases
  if (phases && phases.some(p => hazard.applies_to_installation_phases?.includes(p))) {
    score += 10;
  }
  
  // Boost if semantic similarity is high
  if (hazard.similarity && hazard.similarity > 0.8) {
    score += 15;
  }
  
  return score;
}

/**
 * Detect location from job description
 */
function detectLocation(description: string): string | undefined {
  const lower = description.toLowerCase();
  
  const locationKeywords = {
    bathroom: ['bathroom', 'shower', 'ensuite', 'wc'],
    kitchen: ['kitchen', 'cooker', 'oven', 'hob'],
    outdoor: ['outdoor', 'external', 'garden', 'outside'],
    garage: ['garage', 'workshop'],
    commercial: ['office', 'shop', 'warehouse', 'factory']
  };
  
  for (const [location, keywords] of Object.entries(locationKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return location;
    }
  }
  
  return undefined;
}

/**
 * Detect equipment from job description
 */
function detectEquipment(description: string): string[] {
  const lower = description.toLowerCase();
  const detected: string[] = [];
  
  const equipmentKeywords: Record<string, string[]> = {
    consumer_unit: ['consumer unit', 'cu ', 'fuse board', 'distribution board'],
    shower: ['shower', 'electric shower'],
    ev_charger: ['ev', 'electric vehicle', 'charger', 'charging point'],
    socket: ['socket', 'outlet', 'plug'],
    lighting: ['light', 'lighting', 'luminaire'],
    cooker: ['cooker', 'oven', 'hob'],
    heating: ['heating', 'heater', 'radiator']
  };
  
  for (const [equipment, keywords] of Object.entries(equipmentKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      detected.push(equipment);
    }
  }
  
  return detected;
}

/**
 * Generate embedding for text (placeholder - implement with your embedding service)
 */
async function generateEmbedding(text: string): Promise<number[] | null> {
  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.log('⚠️ No OpenAI API key, skipping embedding');
      return null;
    }
    
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: text
      })
    });
    
    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error('Embedding generation failed:', error);
    return null;
  }
}
