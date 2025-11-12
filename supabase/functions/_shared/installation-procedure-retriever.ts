/**
 * Intelligent Installation Procedure Retriever V3
 * Returns pre-structured installation steps instead of raw documents
 * 
 * This is the game-changer: RAG does 90% of the work, AI just formats.
 */

import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';

// Types
interface StructuredInstallationStep {
  step_number: number;
  step_title: string;
  step_description: string;
  tools_required: string[];
  materials_needed: string[];
  safety_notes: string[];
  regulation_references: string[];
  expected_duration_mins: number;
  quality_checks: string[];
  common_mistakes: string[];
  confidence_score: number;
  phase: string; // isolation, installation, testing
}

interface RetrievalParams {
  jobDescription: string;
  workType: 'domestic' | 'commercial' | 'industrial';
  location?: string;
  equipment?: string[];
}

/**
 * Main retrieval function: Multi-strategy approach
 */
export async function retrieveStructuredProcedures(
  params: RetrievalParams,
  supabase: SupabaseClient
): Promise<StructuredInstallationStep[]> {
  
  console.log('🎯 Installation Procedure Retriever: Starting intelligent retrieval');
  const startTime = performance.now();
  
  try {
    // Extract query features
    const location = params.location || detectLocation(params.jobDescription);
    const equipment = params.equipment || detectEquipment(params.jobDescription);
    
    console.log('📊 Query features:', { 
      workType: params.workType, 
      location, 
      equipment 
    });
    
    // Multi-strategy retrieval (optimized match_counts for speed)
    const [procedureResults, toolsResults, regulationResults] = await Promise.all([
      // Strategy A: Get installation procedures (reduced 15→10)
      supabase.rpc('search_practical_work_intelligence_hybrid', {
        query_text: params.jobDescription,
        match_count: 10
      }),
      
      // Strategy B: Get tools/materials lists (reduced 10→6)
      supabase.rpc('search_practical_work_intelligence_hybrid', {
        query_text: `${params.jobDescription} tools materials equipment`,
        match_count: 6
      }),
      
      // Strategy C: Get relevant regulations (reduced 12→8)
      supabase.rpc('search_regulations_intelligence_hybrid', {
        query_text: params.jobDescription,
        match_count: 8
      })
    ]);
    
    console.log('📦 Strategy results:', {
      procedures: procedureResults.data?.length || 0,
      tools: toolsResults.data?.length || 0,
      regulations: regulationResults.data?.length || 0
    });
    
    // Build structured steps from results
    const structuredSteps = buildStructuredSteps(
      procedureResults.data || [],
      toolsResults.data || [],
      regulationResults.data || [],
      params
    );
    
    const retrievalTime = performance.now() - startTime;
    console.log(`✅ Retrieved ${structuredSteps.length} pre-structured steps in ${retrievalTime.toFixed(0)}ms`);
    
    return structuredSteps;
  } catch (error) {
    console.error('❌ Installation procedure retrieval error:', error);
    return [];
  }
}

/**
 * Build structured steps from RAG results
 */
function buildStructuredSteps(
  procedures: any[],
  tools: any[],
  regulations: any[],
  params: RetrievalParams
): StructuredInstallationStep[] {
  
  const steps: StructuredInstallationStep[] = [];
  
  // Phase 1: Isolation (always first)
  const isolationProcedures = procedures.filter(p => 
    p.content?.toLowerCase().includes('isolat') || 
    p.content?.toLowerCase().includes('lock') ||
    p.content?.toLowerCase().includes('safe')
  ).slice(0, 3);
  
  if (isolationProcedures.length > 0) {
    steps.push({
      step_number: 1,
      step_title: 'Isolation and Safety',
      step_description: buildStepDescription(isolationProcedures, 'isolation'),
      tools_required: extractTools(isolationProcedures, tools, 'isolation'),
      materials_needed: extractMaterials(isolationProcedures),
      safety_notes: extractSafetyNotes(isolationProcedures, regulations),
      regulation_references: extractRegulations(regulations, 'isolation'),
      expected_duration_mins: 15,
      quality_checks: ['Verify dead with voltage tester', 'Lock off confirmed', 'Warning notices posted'],
      common_mistakes: ['Forgetting to test dead', 'Not locking off supply'],
      confidence_score: calculateConfidence(isolationProcedures),
      phase: 'isolation'
    });
  }
  
  // Phase 2: Installation steps
  const installationProcedures = procedures.filter(p => 
    !p.content?.toLowerCase().includes('test') &&
    !p.content?.toLowerCase().includes('isolat')
  ).slice(0, 6);
  
  // Group by installation type
  const cableSteps = installationProcedures.filter(p => 
    p.content?.toLowerCase().includes('cable') || 
    p.content?.toLowerCase().includes('wire')
  );
  
  const connectionSteps = installationProcedures.filter(p => 
    p.content?.toLowerCase().includes('connect') || 
    p.content?.toLowerCase().includes('terminat')
  );
  
  const mountingSteps = installationProcedures.filter(p => 
    p.content?.toLowerCase().includes('mount') || 
    p.content?.toLowerCase().includes('fix')
  );
  
  // Add cable routing step
  if (cableSteps.length > 0) {
    steps.push({
      step_number: steps.length + 1,
      step_title: 'Cable Installation and Routing',
      step_description: buildStepDescription(cableSteps, 'cable'),
      tools_required: extractTools(cableSteps, tools, 'cable'),
      materials_needed: extractMaterials(cableSteps),
      safety_notes: extractSafetyNotes(cableSteps, regulations),
      regulation_references: extractRegulations(regulations, 'cable'),
      expected_duration_mins: 30,
      quality_checks: ['Cable sized correctly', 'Safe zones followed', 'Proper fixings used'],
      common_mistakes: ['Wrong cable size', 'Incorrect routing', 'Poor support'],
      confidence_score: calculateConfidence(cableSteps),
      phase: 'installation'
    });
  }
  
  // Add mounting step
  if (mountingSteps.length > 0) {
    steps.push({
      step_number: steps.length + 1,
      step_title: 'Equipment Mounting and Fixing',
      step_description: buildStepDescription(mountingSteps, 'mounting'),
      tools_required: extractTools(mountingSteps, tools, 'mounting'),
      materials_needed: extractMaterials(mountingSteps),
      safety_notes: extractSafetyNotes(mountingSteps, regulations),
      regulation_references: extractRegulations(regulations, 'mounting'),
      expected_duration_mins: 20,
      quality_checks: ['Securely fixed', 'Level and plumb', 'Adequate clearances'],
      common_mistakes: ['Poor fixings', 'Wrong location', 'Inadequate clearance'],
      confidence_score: calculateConfidence(mountingSteps),
      phase: 'installation'
    });
  }
  
  // Add termination step
  if (connectionSteps.length > 0) {
    steps.push({
      step_number: steps.length + 1,
      step_title: 'Terminations and Connections',
      step_description: buildStepDescription(connectionSteps, 'termination'),
      tools_required: extractTools(connectionSteps, tools, 'termination'),
      materials_needed: extractMaterials(connectionSteps),
      safety_notes: extractSafetyNotes(connectionSteps, regulations),
      regulation_references: extractRegulations(regulations, 'termination'),
      expected_duration_mins: 25,
      quality_checks: ['Correct polarity', 'Tight connections', 'No exposed conductors'],
      common_mistakes: ['Wrong polarity', 'Loose connections', 'Damaged insulation'],
      confidence_score: calculateConfidence(connectionSteps),
      phase: 'installation'
    });
  }
  
  // Phase 3: Testing (always last)
  const testingProcedures = procedures.filter(p => 
    p.content?.toLowerCase().includes('test') || 
    p.content?.toLowerCase().includes('verif')
  ).slice(0, 3);
  
  if (testingProcedures.length > 0) {
    steps.push({
      step_number: steps.length + 1,
      step_title: 'Testing and Verification',
      step_description: buildStepDescription(testingProcedures, 'testing'),
      tools_required: extractTools(testingProcedures, tools, 'testing'),
      materials_needed: [],
      safety_notes: extractSafetyNotes(testingProcedures, regulations),
      regulation_references: extractRegulations(regulations, 'testing'),
      expected_duration_mins: 30,
      quality_checks: ['All tests passed', 'Results recorded', 'Certificate completed'],
      common_mistakes: ['Incomplete tests', 'Not recording results', 'Wrong test sequence'],
      confidence_score: calculateConfidence(testingProcedures),
      phase: 'testing'
    });
  }
  
  return steps;
}

/**
 * Build step description from procedures
 */
function buildStepDescription(procedures: any[], phase: string): string {
  if (procedures.length === 0) return `Complete ${phase} phase of installation.`;
  
  // Take top 3 most relevant procedures
  const topProcedures = procedures.slice(0, 3);
  const descriptions = topProcedures
    .map(p => p.content || '')
    .filter(c => c.length > 0)
    .map(c => c.slice(0, 250)); // Limit each to 250 chars
  
  return descriptions.join(' ') || `Complete ${phase} phase of installation.`;
}

/**
 * Extract tools from procedures
 */
function extractTools(procedures: any[], toolsDocs: any[], phase: string): string[] {
  const allTools = new Set<string>();
  
  // Extract from procedures
  procedures.forEach(p => {
    const content = (p.content || '').toLowerCase();
    
    // Common tools by phase
    if (phase === 'isolation') {
      if (content.includes('voltage')) allTools.add('Voltage tester');
      if (content.includes('lock')) allTools.add('Lock-off kit');
      if (content.includes('sign') || content.includes('notice')) allTools.add('Warning notices');
    } else if (phase === 'cable') {
      if (content.includes('strip')) allTools.add('Wire strippers');
      if (content.includes('crimp')) allTools.add('Crimping tool');
      if (content.includes('drill')) allTools.add('Drill');
      if (content.includes('clip') || content.includes('fix')) allTools.add('Cable clips');
    } else if (phase === 'termination') {
      allTools.add('Screwdrivers');
      if (content.includes('strip')) allTools.add('Wire strippers');
      if (content.includes('crimp')) allTools.add('Crimping tool');
    } else if (phase === 'testing') {
      if (content.includes('multimeter')) allTools.add('Multimeter');
      if (content.includes('test') || content.includes('mft')) allTools.add('Multifunction tester');
      if (content.includes('earth')) allTools.add('Earth loop tester');
    }
  });
  
  // Extract from tools documents
  toolsDocs.slice(0, 5).forEach(t => {
    if (t.tools_required && Array.isArray(t.tools_required)) {
      t.tools_required.forEach((tool: string) => allTools.add(tool));
    }
  });
  
  return Array.from(allTools).slice(0, 8); // Max 8 tools per step
}

/**
 * Extract materials from procedures
 */
function extractMaterials(procedures: any[]): string[] {
  const allMaterials = new Set<string>();
  
  procedures.forEach(p => {
    if (p.materials_needed && Array.isArray(p.materials_needed)) {
      p.materials_needed.forEach((mat: string) => allMaterials.add(mat));
    }
  });
  
  return Array.from(allMaterials).slice(0, 10);
}

/**
 * Extract safety notes
 */
function extractSafetyNotes(procedures: any[], regulations: any[]): string[] {
  const notes = new Set<string>();
  
  // From procedures
  procedures.forEach(p => {
    if (p.safety_considerations && Array.isArray(p.safety_considerations)) {
      p.safety_considerations.forEach((note: string) => notes.add(note));
    }
  });
  
  // From regulations
  regulations.slice(0, 5).forEach(r => {
    if (r.control_measures && Array.isArray(r.control_measures)) {
      r.control_measures.forEach((measure: string) => notes.add(measure));
    }
  });
  
  return Array.from(notes).slice(0, 6);
}

/**
 * Extract regulation references
 */
function extractRegulations(regulations: any[], phase: string): string[] {
  const refs = new Set<string>();
  
  regulations.slice(0, 8).forEach(r => {
    if (r.regulation_number) {
      const ref = r.regulation_section 
        ? `${r.regulation_number} - ${r.regulation_section}`
        : r.regulation_number;
      refs.add(ref);
    }
  });
  
  return Array.from(refs).slice(0, 5);
}

/**
 * Calculate confidence score
 */
function calculateConfidence(procedures: any[]): number {
  if (procedures.length === 0) return 0.5;
  
  const avgScore = procedures.reduce((sum, p) => {
    return sum + (p.hybrid_score || p.confidence_score || 5);
  }, 0) / procedures.length;
  
  // Normalize to 0-1
  return Math.min(avgScore / 10, 1.0);
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
