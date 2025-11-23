/**
 * Ultra-Fast Design Intelligence Search
 * Uses GIN indexes for <50ms keyword matching on design_knowledge_intelligence table
 * Returns enriched facets: concepts, formulas, examples, tables
 */

export interface IntelligenceSearchParams {
  keywords: string[];
  loadTypes?: string[];
  cableSizes?: number[];
  categories?: ('cable_sizing' | 'voltage_drop' | 'protection' | 'earthing' | 'special_locations')[];
  facetTypes?: ('concept' | 'formula' | 'table' | 'example' | 'regulation' | 'general')[];
  limit?: number;
}

export interface IntelligenceFacet {
  id: string;
  facet_type: string;
  primary_topic: string;
  content: string;
  design_category: string;
  keywords: string[];
  bs7671_regulations?: string[];
  formulas?: string[];
  calculation_steps?: string[];
  worked_examples?: any[];
  table_refs?: string[];
  cable_sizes?: string[];
  load_types?: string[];
  quality_score?: number;
  confidence_score?: number;
}

/**
 * Search design intelligence using ultra-fast GIN indexes
 * Performance: 20-50ms (vs 3-5s for vector embedding)
 */
export async function searchDesignIntelligence(
  supabase: any,
  params: IntelligenceSearchParams
): Promise<IntelligenceFacet[]> {
  
  const {
    keywords,
    loadTypes = [],
    cableSizes = [],
    categories = [],
    facetTypes = [],
    limit = 20
  } = params;
  
  console.log('⚡ Intelligence search:', { 
    keywords: keywords.length, 
    loadTypes: loadTypes.length,
    cableSizes: cableSizes.length 
  });
  
  // Build ultra-fast query using GIN indexes
  let query = supabase
    .from('design_knowledge_intelligence')
    .select('*')
    .is('is_archived', false);
  
  // KEYWORD MATCH (primary filter - uses idx_dki_keywords_gin)
  if (keywords.length > 0) {
    query = query.overlaps('keywords', keywords);
  }
  
  // LOAD TYPE FILTER (uses idx_dki_load_types_gin)
  if (loadTypes.length > 0) {
    query = query.overlaps('load_types', loadTypes);
  }
  
  // CABLE SIZE FILTER (uses idx_dki_cable_sizes_gin)
  if (cableSizes.length > 0) {
    query = query.overlaps('cable_sizes', cableSizes.map(String));
  }
  
  // CATEGORY FILTER (uses idx_dki_category B-tree)
  if (categories.length > 0) {
    query = query.in('design_category', categories);
  }
  
  // FACET TYPE FILTER (uses idx_dki_facet_type B-tree)
  if (facetTypes.length > 0) {
    query = query.in('facet_type', facetTypes);
  }
  
  // ORDER BY QUALITY + LIMIT
  query = query
    .order('quality_score', { ascending: false })
    .order('confidence_score', { ascending: false })
    .limit(limit);
  
  const { data, error } = await query;
  
  if (error) {
    console.error('❌ Intelligence search failed:', error);
    return [];
  }
  
  console.log(`✅ Intelligence search: ${data?.length || 0} facets found`);
  return data || [];
}

/**
 * Search BS7671 Regulations Intelligence using ultra-fast GIN indexes
 * Performance: 20-50ms (vs 500ms-2s for vector search)
 */
export async function searchRegulationsIntelligence(
  supabase: any,
  params: {
    keywords: string[];
    appliesTo?: string[];
    categories?: string[];
    regulationNumbers?: string[];
    limit?: number;
  }
): Promise<any[]> {
  
  const {
    keywords,
    appliesTo = [],
    categories = [],
    regulationNumbers = [],
    limit = 20
  } = params;
  
  console.log('⚡ Regulations intelligence search:', { 
    keywords: keywords.length, 
    appliesTo: appliesTo.length,
    categories: categories.length
  });
  
  // Build ultra-fast query using GIN indexes
  let query = supabase
    .from('regulations_intelligence')
    .select('*');
  
  // KEYWORD MATCH (primary filter - uses GIN index on keywords)
  if (keywords.length > 0) {
    query = query.overlaps('keywords', keywords);
  }
  
  // APPLIES TO FILTER (installation type)
  if (appliesTo.length > 0) {
    query = query.overlaps('applies_to', appliesTo);
  }
  
  // CATEGORY FILTER
  if (categories.length > 0) {
    query = query.in('category', categories);
  }
  
  // SPECIFIC REGULATION NUMBERS (fast direct lookup)
  if (regulationNumbers.length > 0) {
    query = query.in('regulation_number', regulationNumbers);
  }
  
  // ORDER BY CONFIDENCE + LIMIT
  query = query
    .order('confidence_score', { ascending: false })
    .limit(limit);
  
  const { data, error } = await query;
  
  if (error) {
    console.error('❌ Regulations intelligence search failed:', error);
    return [];
  }
  
  console.log(`✅ Regulations intelligence: ${data?.length || 0} results found`);
  return data || [];
}

/**
 * Search Practical Work Intelligence using ultra-fast GIN indexes
 * Performance: 20-50ms (vs 500ms-2s for vector search)
 * Returns installation guidance, best practices, testing procedures
 */
export async function searchPracticalWorkIntelligence(
  supabase: any,
  params: {
    keywords: string[];
    appliesTo?: string[];
    cableSizes?: string[];
    activityTypes?: string[];
    limit?: number;
  }
): Promise<any[]> {
  
  const {
    keywords,
    appliesTo = [],
    cableSizes = [],
    activityTypes = [],
    limit = 25
  } = params;
  
  console.log('⚡ Practical work intelligence search:', { 
    keywords: keywords.length, 
    appliesTo: appliesTo.length,
    cableSizes: cableSizes.length
  });
  
  // Build ultra-fast query using GIN indexes
  let query = supabase
    .from('practical_work_intelligence')
    .select('*');
  
  // KEYWORD MATCH (primary filter - uses GIN index on keywords)
  if (keywords.length > 0) {
    query = query.overlaps('keywords', keywords);
  }
  
  // APPLIES TO FILTER (load types, installation types)
  if (appliesTo.length > 0) {
    query = query.overlaps('applies_to', appliesTo);
  }
  
  // CABLE SIZE FILTER
  if (cableSizes.length > 0) {
    query = query.overlaps('cable_sizes', cableSizes);
  }
  
  // ACTIVITY TYPE FILTER (installation, testing, maintenance, etc.)
  if (activityTypes.length > 0) {
    query = query.overlaps('activity_types', activityTypes);
  }
  
  // ORDER BY CONFIDENCE + LIMIT
  query = query
    .order('confidence_score', { ascending: false })
    .limit(limit);
  
  const { data, error } = await query;
  
  if (error) {
    console.error('❌ Practical work intelligence search failed:', error);
    return [];
  }
  
  console.log(`✅ Practical work intelligence: ${data?.length || 0} results found`);
  return data || [];
}
