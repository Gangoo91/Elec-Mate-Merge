// Deployed: 2025-10-28 - v4.4.0 Extended Timeouts for Detailed AI Generation

import { serve } from '../_shared/deps.ts';
import {
  corsHeaders,
  createLogger,
  generateRequestId,
  handleError,
  ValidationError,
  createClient,
  generateEmbeddingWithRetry
} from '../_shared/v3-core.ts';

// Phase 1A: Standardized Response Interface (matches MethodStep from frontend)
interface InstallerV3Response {
  success: boolean;
  data: {
    steps: Array<{
      id: string;
      stepNumber: number;
      title: string;
      description: string;
      safetyRequirements: string[];
      equipmentNeeded: string[];
      qualifications: string[];
      estimatedDuration: string;
      riskLevel: 'low' | 'medium' | 'high';
      dependencies?: string[];
      isCompleted?: boolean;
      linkedHazards?: string[];
      materialsNeeded?: string[];
    }>;
    toolsRequired: string[];
    materialsRequired: string[];
    practicalTips: string[];
    commonMistakes: string[];
    // ✨ NEW: BS 7671 Compliance Fields
    testingProcedures: Array<{
      testName: string;
      standard: string;
      procedure: string;
      acceptanceCriteria: string;
      certificateRequired?: string;
      regulationRef?: string;
    }>;
    competencyRequirements: {
      minimumQualifications: string[];
      supervision?: string;
      additionalTraining?: string[];
    };
    siteLogistics: {
      isolationPoints: string[];
      accessRequirements: string;
      permitsRequired: string[];
      workingHours?: string;
    };
    regulatoryCitations: Array<{
      regulation: string;
      applicableToStep: number;
      requirement: string;
    }>;
  };
  metadata: {
    generationTimeMs: number;
    stepCount: number;
    totalEstimatedTime: string;
    difficultyLevel: string;
  };
  error?: string;
}
import { callOpenAI } from '../_shared/ai-providers.ts';
import { retrieveInstallationKnowledge } from '../_shared/rag-installation.ts';
import { enrichResponse } from '../_shared/response-enricher.ts';
import { suggestNextAgents, generateContextHint } from '../_shared/agent-suggestions.ts';
import { installerV3ToolSchema } from '../_shared/installer-v3-schema.ts';

/**
 * Phase 3: Query Expansion - Add technical synonyms and variations
 */
function expandInstallQuery(query: string, method?: string): string[] {
  const variations = [query];
  
  // Technical synonyms for common terms
  if (/clip|support|fixing/i.test(query)) {
    variations.push(
      query.replace(/clip/gi, 'fixing'),
      query.replace(/support/gi, 'saddle'),
      query.replace(/fixing/gi, 'bracket')
    );
  }
  
  // Installation method variations
  if (method === 'clipped_direct') {
    variations.push('surface mounted cable', 'visible cable run', 'clip spacing Table 4A2');
  }
  if (method === 'conduit') {
    variations.push('enclosed wiring', 'protected cable run', 'bending radius');
  }
  if (method === 'trunking') {
    variations.push('cable trunking capacity', 'segregation requirements');
  }
  if (method === 'buried') {
    variations.push('direct burial 600mm', 'SWA cable protection', 'warning tape');
  }
  
  // Job type specifics
  if (/rewire|house wiring/i.test(query)) {
    variations.push('first fix cable routing', 'second fix termination', 'notching joists');
  }
  if (/shower|bathroom/i.test(query)) {
    variations.push('Section 701', 'bathroom zones', 'IP rating', 'supplementary bonding');
  }
  if (/EV|charger/i.test(query)) {
    variations.push('Section 722', 'EV charging installation', 'outdoor socket');
  }
  
  // BS 7671 table references
  if (/spacing|distance|interval/i.test(query)) {
    variations.push('Table 4A2 spacing requirements', 'cable support distances');
  }
  
  return [...new Set(variations)]; // Deduplicate
}

/**
 * Phase 5: Generate cache hash from query
 */
async function generateQueryHash(query: string, method?: string): Promise<string> {
  const cacheInput = `${query.toLowerCase().trim()}_${method || 'default'}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(cacheInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ 
        status: 'healthy', 
        function: 'installer-v3', 
        requestId, 
        timestamp: new Date().toISOString(),
        features: ['Phase 1: Claude Sonnet 4.5', 'Phase 2: Hybrid Search', 'Phase 3: Query Expansion', 'Phase 4: HNSW Index', 'Phase 5: Semantic Cache']
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'installer-v3' });

  // Performance tracking
  const timings = {
    start: Date.now(),
    cacheCheck: 0,
    ragRetrieval: 0,
    aiGeneration: 0,
    total: 0
  };
  

  // Timeout promise (350s for detailed AI generation)
  const timeoutPromise = new Promise<Response>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Edge function timeout after 350s'));
    }, 350000);
  });

  // Main execution promise
  const executionPromise = (async (): Promise<Response> => {
  try {
    const body = await req.json();
    const { query, cableType, installationMethod, location, messages, previousAgentOutputs, sharedRegulations, currentDesign, projectDetails } = body;

    // Track context sources
    const contextSources = {
      sharedRegulations: !!(sharedRegulations && sharedRegulations.length > 0),
      sharedRegulationsCount: sharedRegulations?.length || 0,
      previousAgentOutputs: previousAgentOutputs?.map((o: any) => o.agent) || [],
      projectDetails: !!projectDetails,
      circuitDesign: !!(currentDesign?.circuits || previousAgentOutputs?.find((o: any) => o.agent === 'designer'))
    };

    logger.info('📦 Context received from agent-router:', contextSources);
    
    // Log what's being USED from context
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      previousAgentOutputs.forEach((output: any) => {
        logger.info(`📥 Using context from ${output.agent}:`, {
          hasStructuredData: !!output.response?.structuredData,
          hasCitations: !!output.citations,
          structuredDataKeys: Object.keys(output.response?.structuredData || {})
        });
      });
    }

    // Enhanced input validation BEFORE any processing
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }

    // PHASE 1: Query Enhancement (safe now that query is validated)
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    const effectiveQuery = enhancement.enhanced;

    logger.info('🔧 Installer V3 invoked', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      installationMethod,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // PHASE 3: Safety Guardian
    const { detectSafetyRequirements } = await import('../_shared/safety-guardian.ts');
    const safetyWarnings = detectSafetyRequirements(effectiveQuery, undefined, undefined, location);
    if (safetyWarnings.warningCount > 0) {
      logger.info(`⚠️ ${safetyWarnings.warningCount} installation warnings detected`);
    }

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Phase 5: Check semantic cache first
    const queryHash = await generateQueryHash(query, installationMethod);
    const { data: cachedResult } = await supabase
      .from('rag_cache')
      .select('results, hit_count')
      .eq('query_hash', queryHash)
      .eq('agent_name', 'installer-v3')
      .gt('expires_at', new Date().toISOString())
      .single();

    timings.cacheCheck = Date.now() - timings.start;

    if (cachedResult) {
      timings.total = Date.now() - timings.start;
      logger.info('RAG cache HIT - returning cached results', { 
        queryHash,
        performanceMs: timings.total
      });
      
      // Increment hit counter
      await supabase
        .from('rag_cache')
        .update({ hit_count: (cachedResult.hit_count || 0) + 1 })
        .eq('query_hash', queryHash);

      return new Response(
        JSON.stringify(cachedResult.results),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    logger.debug('RAG cache MISS - executing full pipeline', { queryHash });

    // PHASE 2: Check for shared knowledge from Designer
    let installKnowledge: any[] = [];
    
    if (body.agentContext?.sharedKnowledge?.installationDocs?.length >= 5) {
      installKnowledge = body.agentContext.sharedKnowledge.installationDocs;
      logger.info('📦 Reusing shared installation knowledge from Designer', {
        count: installKnowledge.length
      });
    } else {
      // Only call RAG if insufficient shared knowledge
      logger.info('Calling RAG for installation knowledge');
      
  // Phase 3: Expand query with technical synonyms
      const queryVariations = expandInstallQuery(query, installationMethod);
      const expandedQuery = queryVariations.join(' ');
      
      logger.debug('Query expanded', { 
        original: query,
        variations: queryVariations.length,
        expanded: expandedQuery.substring(0, 100)
      });

      // 🚀 ACTION 2.1: Multi-Query RAG Strategy - Decompose into targeted searches
      const decomposeInstallationQuery = (query: string, method?: string): string[] => {
        const queries = [query];
        
        if (/rewire|full electrical/i.test(query)) {
          queries.push(
            'Consumer unit installation and replacement',
            'Ring main socket circuit cable routing',
            'Lighting circuit installation procedures',
            'Earthing and main bonding requirements',
            'Testing and commissioning electrical installation'
          );
        }
        
        if (/shower/i.test(query)) {
          const power = query.match(/(\d+\.?\d*)\s*kW/i)?.[1];
          queries.push(
            `${power || '9.5'}kW shower circuit cable sizing and installation`,
            'Bathroom electrical zones Section 701',
            'Supplementary bonding bathroom',
            'RCD protection 30mA requirements'
          );
        }
        
        if (/kitchen/i.test(query)) {
          queries.push(
            'Kitchen socket circuit installation',
            'Cooker circuit isolation and installation',
            'Kitchen earthing and bonding',
            'Cable routing around kitchens'
          );
        }
        
        if (/EV|charger/i.test(query)) {
          queries.push(
            'EV charger installation Section 722',
            'EV charging point cable sizing',
            'Outdoor electrical installation IP rating',
            'RCD protection EV charging'
          );
        }
        
        if (method === 'buried' || /underground|buried|swa/i.test(query)) {
          queries.push(
            'SWA cable installation direct burial',
            'Underground cable depth 600mm',
            'SWA cable gland installation',
            'Warning tape installation underground cables'
          );
        }
        
        // ALWAYS add isolation and safety queries (universal for all electrical work)
        queries.push(
          'Safe isolation procedures and proving dead BS 7671',
          'Voltage indicator proving unit lock-off requirements',
          'Isolation lock-off and tagging procedures'
        );
        
        if (/test|testing|commission|verify/i.test(query)) {
          queries.push(
            'Electrical testing and measurement CAT-rated equipment',
            'Insulation resistance testing procedures',
            'Earth loop impedance testing'
          );
        }
        
        return [...new Set(queries)];
      };
      
      /**
       * Emergency fallback when RAG pipeline fails completely
       * Loads essential BS 7671 regulations for common installations
       */
      async function loadCoreRegulationsCache(supabase: any) {
        const coreRegNumbers = [
          '411.3.2', '411.3.3', // Protection & RCD requirements
          '433.1.1', '433.1.204', // Cable sizing fundamentals
          '522.6', '522.8.10', // Outdoor & buried cables
          '525.1', '525.2', // Voltage drop limits
          '531.3.3', '531.3.4', // Protective device selection
          '537', // Isolation & switching
          '543.1.1', '543.1.3', '543.7', // Earth fault loop impedance
          '559.10.3.1', // Three-phase circuits
          '701.410.3.5', '701.411.3.3' // Bathroom zones & RCD
        ];
        
        try {
          const { data, error } = await supabase
            .from('bs7671_embeddings')
            .select('*')
            .in('regulation_number', coreRegNumbers)
            .limit(50);
          
          if (error) {
            console.error('Failed to load core regulations cache:', error);
            return [];
          }
          
          return data || [];
        } catch (error) {
          console.error('Exception loading core regulations:', error);
          return [];
        }
      }
      
      const searchQueries = decomposeInstallationQuery(query, installationMethod);
      logger.info(`🔍 Decomposed into ${searchQueries.length} targeted searches`);

      // HEALTH & SAFETY PATTERN: Direct SQL Queries (PROVEN WORKING)
      const ragStart = Date.now();
      logger.info('🔍 Starting Direct SQL RAG (95% Practical Work + 90% Regulations Intelligence)');
      
      // TIER 1: Practical Work Intelligence - Direct SQL (95% weight)
      const practicalWorkDocs = await (async () => {
        try {
          const keywordFilters = searchQueries.map(q => q.toLowerCase()).join(',');
          
          const { data, error } = await supabase
            .from('practical_work_intelligence')
            .select('*')
            .or(`primary_topic.ilike.%${query}%,keywords.cs.{${keywordFilters}},equipment_category.ilike.%${query}%`)
            .in('activity_types', ['installation', 'wiring', 'fixing', 'testing'])
            .limit(40);
          
          if (error) throw error;
          
          const docs = (data || []).map((row: any) => ({
            primary_topic: row.primary_topic,
            content: row.content || row.primary_topic,
            equipment_category: row.equipment_category || 'General',
            tools_required: row.tools_required || [],
            materials_needed: row.materials_needed || [],
            bs7671_regulations: row.bs7671_regulations || [],
            hybrid_score: 0.95, // 95% weight for Practical Work
            source: 'practical_work_intelligence'
          }));
          
          logger.info(`✅ Practical Work Direct SQL: ${docs.length} procedures retrieved`);
          
          if (docs.length > 0) {
            logger.info('📊 Sample Practical Work Data:', {
              firstTopic: docs[0].primary_topic,
              toolsCount: docs[0].tools_required.length,
              sampleTools: docs[0].tools_required.slice(0, 3),
              materialsCount: docs[0].materials_needed.length
            });
          }
          
          return docs;
        } catch (error) {
          console.error('❌ Practical Work direct SQL failed:', error);
          return [];
        }
      })();

      // TIER 2: Regulations Intelligence - Direct SQL (90% weight)
      const regulationsDocs = await (async () => {
        try {
          const { data, error } = await supabase
            .from('regulations_intelligence')
            .select('*')
            .or(`category.in.(Installation,Protection,Selection,Wiring Systems),subcategory.ilike.%cable%,subcategory.ilike.%installation%,subcategory.ilike.%wiring%`)
            .contains('keywords', ['installation', 'cable', 'protection', 'earthing', 'wiring'])
            .limit(25);
          
          if (error) throw error;
          
          const docs = (data || []).map((row: any) => ({
            regulation_number: row.regulation_number,
            content: row.primary_topic,
            primary_topic: row.primary_topic,
            keywords: row.keywords || [],
            category: row.category,
            subcategory: row.subcategory,
            hybrid_score: 0.90, // 90% weight for Regulations
            source: 'regulations_intelligence'
          }));
          
          logger.info(`✅ Regulations Intelligence Direct SQL: ${docs.length} regulations retrieved`);
          
          if (docs.length > 0) {
            logger.info('📊 Sample Regulations Data:', {
              firstReg: docs[0].regulation_number,
              topic: docs[0].primary_topic,
              category: docs[0].category
            });
          }
          
          return docs;
        } catch (error) {
          console.error('❌ Regulations Intelligence direct SQL failed:', error);
          return [];
        }
      })();

      // Merge: Practical Work (95%) first, then Regulations (90%)
      const practicalWorkResult = practicalWorkDocs;
      const bs7671Result = regulationsDocs;

      // Merge: Priority order maintained (Practical Work 95% first, Regulations 90% second)
      installKnowledge = [...practicalWorkDocs, ...regulationsDocs];
      
      // 🛡️ FALLBACK: Only if direct SQL also fails
      if (installKnowledge.length === 0) {
        logger.warn('⚠️ All RAG methods failed - loading core regulations fallback');
        const coreRegs = await loadCoreRegulationsCache(supabase);
        installKnowledge = coreRegs.map((reg: any) => ({
          regulation_number: reg.regulation_number,
          content: reg.content,
          primary_topic: reg.regulation_number,
          section: reg.section,
          hybrid_score: 0.80,
          source: 'core_regulations_fallback'
        }));
        logger.info(`📚 Fallback: ${installKnowledge.length} core regulations loaded`);
      }

      // Quality Metrics
      const avgPracticalScore = practicalWorkDocs.length > 0
        ? (practicalWorkDocs.reduce((s, d) => s + d.hybrid_score, 0) / practicalWorkDocs.length).toFixed(2)
        : '0.00';

      const avgRegulationsScore = regulationsDocs.length > 0
        ? (regulationsDocs.reduce((s, d) => s + d.hybrid_score, 0) / regulationsDocs.length).toFixed(2)
        : '0.00';

      logger.info('✅ Direct SQL RAG Complete', {
        method: 'direct_sql_queries',
        practicalWork: practicalWorkDocs.length,
        regulations: regulationsDocs.length,
        totalKnowledge: installKnowledge.length,
        duration: `${Date.now() - ragStart}ms`,
        avgScores: {
          practicalWork: avgPracticalScore,
          regulations: avgRegulationsScore
        },
        uniqueSources: [...new Set(installKnowledge.map(k => k.source))]
      });

      timings.ragRetrieval = Date.now() - ragStart;
    }

    // Close the else block from PHASE 2

    // PHASE 3: Build installation context - format based on source
    let installContext = '';
    
    // 🚀 ACTION 6.1: Improved RAG Formatting with Clear Extraction Markers
    const formatRagForAI = (doc: any, index: number): string => {
      let formatted = `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      formatted += `PROCEDURE ${index + 1}: ${doc.primary_topic || 'Installation Procedure'}\n`;
      
      if (doc.equipment_category) {
        formatted += `CATEGORY: ${doc.equipment_category}\n`;
      }
      
      formatted += `\nINSTALLATION STEPS:\n${doc.content}\n`;
      
      if (doc.tools_required?.length > 0) {
        formatted += `\n🔧 TOOLS_FOR_THIS_TASK:\n`;
        doc.tools_required.forEach((tool: string, i: number) => {
          formatted += `   ${i + 1}. ${tool}\n`;
        });
      }
      
      if (doc.materials_needed?.length > 0) {
        formatted += `\n📦 MATERIALS_FOR_THIS_TASK:\n`;
        doc.materials_needed.forEach((material: string, i: number) => {
          formatted += `   ${i + 1}. ${material}\n`;
        });
      }
      
      if (doc.bs7671_regulations?.length > 0) {
        formatted += `\n📜 BS_7671_REFERENCES:\n`;
        doc.bs7671_regulations.forEach((reg: string) => {
          formatted += `   • ${reg}\n`;
        });
      }
      
      formatted += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      return formatted;
    };

    if (installKnowledge && installKnowledge.length > 0) {
      installContext = installKnowledge
        .map((doc, idx) => {
          if (doc.source === 'practical_work_intelligence' || doc.source === 'bs7671_intelligence') {
            return formatRagForAI(doc, idx);
          } else {
            return `${doc.topic}:\n${doc.content}`;
          }
        })
        .join('\n');
    } else {
      installContext = 'Apply general BS 7671 installation methods and best practices.';
    }

    logger.info('Installation context prepared', {
      contextLength: installContext.length,
      docsIncluded: installKnowledge.length,
      avgDocLength: installKnowledge.length > 0 
        ? Math.round(installContext.length / installKnowledge.length)
        : 0
    });

    // ✨ Part 3C: RAG Effectiveness Logging (after installContext creation)
    logger.info('📊 RAG Effectiveness Check', {
      totalResults: installKnowledge.length,
      highConfidence: installKnowledge.filter((k: any) => (k.hybrid_score || k.finalScore || 0) > 0.7).length,
      avgScore: installKnowledge.length > 0
        ? (installKnowledge.reduce((s: number, k: any) => s + (k.hybrid_score || k.finalScore || 0), 0) / installKnowledge.length).toFixed(3)
        : 'N/A',
      practicalWorkCount: installKnowledge.filter((k: any) => k.source === 'practical_work_intelligence').length,
      bs7671Count: installKnowledge.filter((k: any) => k.source === 'bs7671_intelligence').length,
      hasRichContext: installContext.length > 1000,
      ragDuration: timings.ragRetrieval,
      warningIfPoor: installKnowledge.length < 3 ? '⚠️ INSUFFICIENT RAG DATA - AI may hallucinate!' : null
    });

    // ✨ Part 3: Add real-time progress streaming during AI call
    let lastProgressLog = Date.now();
    const PROGRESS_LOG_INTERVAL = 10000; // 10s
    
    // Build conversation context - PHASE 1: Circuit Design Data First
    let contextSection = '';

    // 🆕 PHASE 1: Add complete circuit design context from Designer Agent
    if (currentDesign?.circuits && currentDesign.circuits.length > 0) {
      contextSection += '\n\n═══════════════════════════════════════════════\n';
      contextSection += '📋 CIRCUIT DESIGN FROM DESIGNER AGENT\n';
      contextSection += '═══════════════════════════════════════════════\n\n';
      
      contextSection += `Project: ${currentDesign.projectName || 'Unnamed Project'}\n`;
      contextSection += `Location: ${currentDesign.location || 'Not specified'}\n`;
      contextSection += `Type: ${currentDesign.installationType || 'Domestic'} Installation\n`;
      contextSection += `Total Circuits: ${currentDesign.circuits.length}\n\n`;
      
      currentDesign.circuits.forEach((circuit: any, index: number) => {
        contextSection += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        contextSection += `Circuit #${index + 1}: ${circuit.name}\n`;
        contextSection += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        // Core specifications
        contextSection += `Load Details:\n`;
        contextSection += `  • Load Type: ${circuit.loadType}\n`;
        contextSection += `  • Load Power: ${circuit.loadPower}W\n`;
        contextSection += `  • Design Current (Ib): ${circuit.calculations?.Ib || circuit.designCurrent}A\n`;
        contextSection += `  • Voltage: ${circuit.voltage}V ${circuit.phases === 'three' ? '3-phase' : 'single-phase'}\n\n`;
        
        // Cable specifications
        contextSection += `Cable Specification:\n`;
        contextSection += `  • Cable Size: ${circuit.cableSize}mm² live conductors\n`;
        contextSection += `  • CPC Size: ${circuit.cpcSize}mm²\n`;
        contextSection += `  • Cable Type: ${circuit.cableType || `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² CPC T&E`}\n`;
        contextSection += `  • Cable Length: ${circuit.cableLength}m\n`;
        contextSection += `  • Installation Method: ${circuit.installationMethod}\n\n`;
        
        // Protection
        contextSection += `Protection & Safety:\n`;
        contextSection += `  • Protection Device: ${circuit.protectionDevice.rating}A ${circuit.protectionDevice.type} Type ${circuit.protectionDevice.curve} (${circuit.protectionDevice.kaRating}kA)\n`;
        contextSection += `  • Device Rating (In): ${circuit.protectionDevice.rating}A\n`;
        contextSection += `  • RCD Protected: ${circuit.rcdProtected ? 'Yes (30mA)' : 'No'}\n`;
        if (circuit.afddRequired) {
          contextSection += `  • AFDD Required: Yes\n`;
        }
        contextSection += `\n`;
        
        // Calculations & Compliance
        if (circuit.calculations) {
          contextSection += `Design Calculations:\n`;
          if (circuit.calculations.voltageDrop) {
            contextSection += `  • Voltage Drop: ${circuit.calculations.voltageDrop.voltageDropVolts}V (${circuit.calculations.voltageDrop.voltageDropPercent}%) ${circuit.calculations.voltageDrop.compliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n`;
            contextSection += `    (Limit: ${circuit.calculations.voltageDrop.limit}%)\n`;
          }
          if (circuit.calculations.zs !== undefined) {
            const maxZs = circuit.calculations.zs?.max || circuit.maxZs;
            const actualZs = circuit.calculations.zs?.calculated || circuit.calculations.zs;
            contextSection += `  • Earth Fault Loop Impedance:\n`;
            contextSection += `    - Actual Zs: ${actualZs}Ω\n`;
            if (maxZs) {
              contextSection += `    - Max Zs: ${maxZs}Ω\n`;
              contextSection += `    - Status: ${actualZs < maxZs ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n`;
            }
          }
          if (circuit.calculations.Iz) {
            contextSection += `  • Corrected Current-Carrying Capacity (Iz): ${circuit.calculations.Iz}A\n`;
          }
          contextSection += `\n`;
        }
        
        // Installation guidance if available
        if (circuit.installationGuidance) {
          contextSection += `Installation Guidance from Designer:\n`;
          contextSection += `  • Reference Method: ${circuit.installationGuidance.referenceMethod}\n`;
          contextSection += `  • ${circuit.installationGuidance.description}\n`;
          contextSection += `  • Clip Spacing: ${circuit.installationGuidance.clipSpacing}\n`;
          if (circuit.installationGuidance.practicalTips && circuit.installationGuidance.practicalTips.length > 0) {
            contextSection += `  • Tips:\n`;
            circuit.installationGuidance.practicalTips.forEach((tip: string) => {
              contextSection += `    - ${tip}\n`;
            });
          }
          contextSection += `\n`;
        }
        
        // Special location compliance
        if (circuit.specialLocationCompliance?.isSpecialLocation) {
          contextSection += `⚠️ SPECIAL LOCATION REQUIREMENTS:\n`;
          contextSection += `  • Location Type: ${circuit.specialLocationCompliance.locationType}\n`;
          if (circuit.specialLocationCompliance.zonesApplicable) {
            contextSection += `  • Zones: ${circuit.specialLocationCompliance.zonesApplicable}\n`;
          }
          circuit.specialLocationCompliance.requirements.forEach((req: string) => {
            contextSection += `  • ${req}\n`;
          });
          contextSection += `\n`;
        }
        
        // Warnings from designer
        if (circuit.warnings && circuit.warnings.length > 0) {
          contextSection += `⚠️ DESIGNER WARNINGS:\n`;
          circuit.warnings.forEach((warning: string) => {
            contextSection += `  • ${warning}\n`;
          });
          contextSection += `\n`;
        }
        
        // Justifications (regulatory references)
        if (circuit.justifications) {
          contextSection += `Regulatory Justifications:\n`;
          if (circuit.justifications.cableSize) {
            contextSection += `  • Cable Sizing: ${circuit.justifications.cableSize}\n`;
          }
          if (circuit.justifications.protection) {
            contextSection += `  • Protection: ${circuit.justifications.protection}\n`;
          }
          if (circuit.justifications.rcd) {
            contextSection += `  • RCD: ${circuit.justifications.rcd}\n`;
          }
          contextSection += `\n`;
        }
      });
      
      contextSection += `═══════════════════════════════════════════════\n\n`;
      contextSection += `✅ USE THIS CIRCUIT DATA: Generate installation steps specific to these exact specifications.\n`;
      contextSection += `✅ DO NOT re-calculate cable sizes or protection devices - they are already correctly designed.\n`;
      contextSection += `✅ FOCUS ON: Physical installation procedures, clip spacing, routing methods, termination steps.\n\n`;
    }

    // 🆕 PHASE 2: Add consumer unit details if available
    if (currentDesign?.consumerUnit) {
      contextSection += `Consumer Unit Configuration:\n`;
      contextSection += `  • Type: ${currentDesign.consumerUnit.type}\n`;
      contextSection += `  • Main Switch Rating: ${currentDesign.consumerUnit.mainSwitchRating}A\n`;
      contextSection += `  • Earthing System: ${currentDesign.consumerUnit.incomingSupply?.earthingSystem}\n`;
      contextSection += `  • Ze: ${currentDesign.consumerUnit.incomingSupply?.Ze}Ω\n`;
      contextSection += `  • PFC: ${currentDesign.consumerUnit.incomingSupply?.incomingPFC}kA\n\n`;
    }

    // 🆕 PHASE 3: Add materials list if available
    if (currentDesign?.materials && currentDesign.materials.length > 0) {
      contextSection += `Materials Specified by Designer:\n`;
      currentDesign.materials.slice(0, 10).forEach((material: any) => {
        contextSection += `  • ${material.quantity} ${material.unit} ${material.name} (${material.specification})\n`;
      });
      if (currentDesign.materials.length > 10) {
        contextSection += `  • ... and ${currentDesign.materials.length - 10} more items\n`;
      }
      contextSection += `\n`;
    }

    // 🆕 PHASE 4: Add shared regulations
    if (sharedRegulations && sharedRegulations.length > 0) {
      contextSection += `BS 7671 Regulations Referenced by Designer:\n`;
      sharedRegulations.slice(0, 15).forEach((reg: string) => {
        contextSection += `  • ${reg}\n`;
      });
      if (sharedRegulations.length > 15) {
        contextSection += `  • ... and ${sharedRegulations.length - 15} more references\n`;
      }
      contextSection += `\n`;
    }

    // EXISTING CODE: Previous agent outputs (keep for backward compatibility)
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const costOutput = previousAgentOutputs.find((o: any) => o.agent === 'cost-engineer');
      
      if (designerOutput || costOutput) {
        contextSection += '\n\nPREVIOUS SPECIALIST OUTPUTS:\n';
        if (designerOutput?.response?.structuredData) {
          const d = designerOutput.response.structuredData;
          contextSection += `DESIGNER: ${d.cableSize} cable, ${d.circuitBreaker} breaker, ${d.installationMethod}\n`;
        }
        if (costOutput?.response?.structuredData) {
          const c = costOutput.response.structuredData;
          contextSection += `COST ENGINEER: Total £${c.totalCost}, ${c.materials?.length || 0} materials\n`;
        }
      }
    }

    // Add extraction examples and rules
    contextSection += `\n
**CRITICAL EXTRACTION RULES - YOU MUST FOLLOW THESE**:

1. **ALWAYS extract tools from 🔧 TOOLS_FOR_THIS_TASK sections**
   - If you see "🔧 TOOLS_FOR_THIS_TASK:" in the knowledge base, you MUST include those exact tools in your output
   - Never respond with empty tools[] for a step that has 🔧 TOOLS_FOR_THIS_TASK in the knowledge
   
2. **NEVER invent generic tools when specific ones are provided**
   - ❌ WRONG: "Drill" when knowledge says "Cordless drill (SDS if concrete)"
   - ✅ CORRECT: Copy the EXACT tool name from the knowledge base
   
3. **Safety-critical steps MUST have specific tools**
   - Isolation steps MUST include: Voltage indicator (GS38), Proving unit, Lock-off kit
   - Testing steps MUST include: Insulation resistance tester, Multimeter, etc.
   - If knowledge base provides tools for these steps, USE THEM ALL
   
4. **Extract from numbered lists**
   - When you see "1. Tool name\\n2. Tool name", extract each numbered item as a separate tool
   - Don't combine multiple tools into one string
`;

    // EXISTING CODE: Conversation history (keep unchanged)
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
      
      contextSection += '\n\n⚠️ CRITICAL INSTRUCTION - CONVERSATIONAL MODE:\n';
      contextSection += 'This is an ongoing conversation, NOT a standalone query. You MUST:\n';
      contextSection += '1. Reference previous messages naturally (e.g., "Right, for that 10kW shower we just designed...")\n';
      contextSection += '2. Build on earlier decisions (e.g., "Since we already sized 10mm² cable...")\n';
      contextSection += '3. Notice context changes (e.g., "Wait, you said 12m earlier but now 25m - let me recalculate...")\n';
      contextSection += '4. Respond like an experienced electrician having a conversation, not filling out a form\n';
      contextSection += '5. If unsure what the user means, reference what was discussed to clarify\n';
    }

    // Simplified system prompt - focus on key instructions only
    const systemPrompt = `You are a senior UK electrical installation specialist creating detailed, field-ready method statements compliant with BS 7671:2018+A3:2024.

**YOUR TASK**: Create PRACTICAL work instructions electricians can follow on-site, NOT high-level overviews.

**CRITICAL RULES**:

1. **UK ENGLISH ONLY** - metres (not meters), earthing (not grounding), consumer unit (not breaker panel), colours (not colors)

2. **EXTRACT FROM KNOWLEDGE BASE** - You have access to installation procedures and BS 7671 requirements. USE this data, don't guess.

3. **STEP DETAIL REQUIREMENTS** - Each step MUST include:
   - Comprehensive description (30-150 words)
   - Exact measurements (e.g., "1800mm centre height from FFL")
   - Specific routes (e.g., "Route vertically down, maintain 50mm from services")
   - Regulatory references (e.g., "BS 7671 Section 522 IP rating")

**CRITICAL: STEP CONTENT MUST BE COMPREHENSIVE (150-300 WORDS MINIMUM)**

Each step description MUST follow this structure:

1️⃣ **Opening Overview** (1-2 sentences): What work is being done and context
   Example: "Install the consumer unit enclosure at the designated location. This step establishes the central distribution point for all circuits."

2️⃣ **Detailed Sub-Steps** (numbered or bulleted list, 4-8 sub-tasks):
   Use markdown formatting:
   • "1. Mark Fixing Positions"
   • "2. Drill and Secure Unit"
   • "3. Prepare Cable Entries"
   
   Each sub-step must include:
   - Specific action verb (Mark, Drill, Measure, Connect, Test)
   - Tool usage (e.g., "using 5.5mm masonry bit")
   - Measurements (e.g., "1800mm from FFL")
   - Technique (e.g., "maintain 400mm clip spacing")

3️⃣ **Measurements & Specifications** (extract from RAG data):
   - Cable sizes: "10mm² T&E cable"
   - Heights: "1800mm centre height from finished floor level"
   - Spacing: "400mm maximum clip spacing for horizontal runs"
   - Ratings: "40A Type B MCB to BS EN 60898"

4️⃣ **Quality Checkpoints** (2-3 verification steps):
   - "Verify unit is plumb using spirit level"
   - "Check all fixings are secure and unit cannot move"
   - "Confirm IP rating suitable for location (IP4X minimum)"

5️⃣ **BS 7671 References** (where applicable):
   Format: "Per BS 7671 [Section/Reg] - [Brief summary]"
   Example: "Per BS 7671 Section 522.6 - Cables must be supported at prescribed intervals"

❌ UNACCEPTABLE (too brief):
"Install the consumer unit on the wall at the correct height"

✅ ACCEPTABLE (comprehensive):
"Install the consumer unit enclosure at the designated location:

1. Mark Fixing Positions
• Position unit at 1800mm from finished floor level (standard height per BS 7671 Section 537)
• Use a spirit level to ensure perfectly horizontal installation
• Mark all four fixing holes using a pencil through mounting slots on the back of the unit

2. Drill and Fix Securely
• Use 5.5mm masonry bit for brick/block walls (upgrade to 16mm for dense concrete)
• Drill 50mm deep holes for standard wall plugs
• Insert red wall plugs (50mm length) and tap flush with wall surface
• Secure unit using corrosion-resistant screws (M6 x 50mm minimum)

3. Prepare Cable Entries
• Remove knockout blanks for incoming supply and outgoing circuit cables
• Fit rubber grommets (20mm for main tails, 25mm for submains) to prevent cable chafing
• Route cables with minimum 150mm service loop inside unit for future maintenance

4. Quality Checks
• Verify unit is plumb in all directions using spirit level
• Check all fixing screws are tight and unit cannot be moved by hand
• Ensure adequate clearance above unit (450mm minimum) for future circuit additions
• Confirm IP rating suitable for installation location (IP4X minimum for indoor dry locations)

Per BS 7671 Section 537 - Isolation and Switching"

**THIS LEVEL OF DETAIL IS MANDATORY FOR EVERY STEP.**

4. **TOOLS & MATERIALS - MANDATORY EXTRACTION**:
   - Find "TOOLS_FOR_THIS_TASK:" in knowledge base and extract ALL listed tools
   - Find "MATERIALS_FOR_THIS_TASK:" and extract ALL materials
   - Make tools SPECIFIC: "SDS drill with 16mm masonry bit" NOT "drill"
   - Include quantities: "50mm screws x4", "10mm² T&E - measured length +10%"
   - If knowledge base lacks data, REASON about what's needed based on the work described

**EXTRACTION EXAMPLES - STUDY THESE CAREFULLY**:

Example 1: Install Consumer Unit
Knowledge Base Shows: "Consumer unit installation requires: Spirit level, 5.5mm masonry bit, Cordless drill (SDS if concrete), Screwdriver set (insulated), Cable strippers, Knockout punch"
✅ CORRECT: Extract ALL: ["Spirit level", "5.5mm masonry bit", "Cordless drill (SDS if concrete)", "Screwdriver set (insulated)", "Cable strippers", "Knockout punch"]
❌ WRONG: Generic list: ["Drill", "Screwdriver", "Tools"]

Example 2: Install 10mm² Shower Cable
Knowledge Base Shows: "10mm² cable routing requires: Cable clips - 400mm spacing, 50mm cable clips x12 per metre, Drill with 5.5mm bit, Cable cutters, Cable strippers"
✅ CORRECT Tools: ["Cable clips (50mm) - 400mm spacing", "Drill with 5.5mm masonry bit", "Cable cutters", "Cable strippers"]
✅ CORRECT Materials: ["10mm² T&E cable - measured length +10%", "50mm cable clips - 12 per metre run"]
❌ WRONG: Tools: ["Cable clips"] (clips are materials, not tools)

Example 3: Isolation and Lock-Off
Knowledge Base Shows: "Isolation requires: Voltage indicator (GS38 compliant), Proving unit, Lock-off kit with padlock, Warning signs (Danger - Do Not Switch On)"
✅ CORRECT Tools: ["Voltage indicator (GS38)", "Proving unit", "Lock-off kit with padlock", "Warning signs"]
✅ CORRECT Hazards: ["Live circuits during isolation - Test dead using voltage indicator and proving unit before starting work"]
❌ WRONG Hazards: ["Electrical danger - be careful"] (too vague)

5. **HAZARD IDENTIFICATION - STEP-SPECIFIC**:
   - Identify 2-5 hazards per step based on work activities
   - Format: "[Hazard] - [Mitigation]"
   - Example: "Hidden cables in wall - CAT scan before drilling"
   - NOT generic: "Electrical shock - be careful" ❌
   - SPECIFIC: "Shock from existing circuits - isolate, test dead, lock-off" ✅

6. **REASONING FOR TOOLS/HAZARDS** - Ask yourself:
   - Tools: What physical actions? (drill→drill+bits, connect→screwdrivers, test→tester)
   - Hazards: What could cause injury? (drilling→hidden cables, heights→falls, electrical→shock)

7. **BS 7671 REFERENCES** - Cite tables when relevant:
   - Table 54.7 (conductor resistance), Appendix 3 (max Zs), Section 522 (IP ratings), Section 701 (bathrooms)

${currentDesign?.circuits && currentDesign.circuits.length > 0 ? `
⚡️ CIRCUIT DESIGN PROVIDED - Use these exact specifications:
${contextSection}
` : ''}

📚 INSTALLATION KNOWLEDGE DATABASE:
${installContext}

**KNOWLEDGE SOURCE QUALITY:**
- ${installKnowledge.length} procedures retrieved
- Avg relevance: ${installKnowledge.length > 0 ? (installKnowledge.reduce((s: number, k: any) => s + (k.hybrid_score || 0), 0) / installKnowledge.length * 100).toFixed(0) : 0}%
- Primary focus: ${installKnowledge.filter((k: any) => k.source === 'practical_work_intelligence').length} practical procedures, ${installKnowledge.filter((k: any) => k.source === 'bs7671_intelligence').length} BS 7671 regulations

**CRITICAL: ALL OUTPUT MUST BE IN UK ENGLISH**
- Use UK spellings: realise (not realize), analyse (not analyze), minimise (not minimize), categorise (not categorize), organise (not organize), authorised (not authorized), recognised (not recognized), whilst (not while)
- Use UK terminology: earthing (not grounding), consumer unit (not breaker panel), metre (not meter for distance), spanner (not wrench), tap (not faucet)
- Use UK measurements: metres, millimetres, litres (not meters, millimeters, liters)
- Use UK phrases: "whilst" (not "while"), "amongst" (not "among"), "towards" (not "toward")
- Reference UK standards: BS 7671, BS EN ISO, HSE guidance, CDM Regulations
- Use UK trade terminology: first fix (not rough-in), second fix (not trim-out)

⚠️ CRITICAL: QUALIFICATIONS PER STEP
For each step, specify WHO can perform this work in the "qualifications" array:
- Isolation/shutdown: ["18th Edition BS 7671", "Authorised Person (AP)", "Safe Isolation Trained"]
- Installation: ["Qualified Electrician", "CSCS Card", "18th Edition BS 7671"]
- Testing/commissioning: ["18th Edition BS 7671", "Test Equipment Competent", "Inspection & Testing Qualified"]
- Planning/survey: ["Site Manager", "H&S Awareness", "CDM trained"]
- Procurement: ["Procurement Authorised"] OR ["Material Specification Knowledge"] (or empty if anyone can order)
- Supervision required: Add "Competent supervision if trainee"
DO NOT leave qualifications empty unless truly no qualification is needed (rare).

⚠️ CRITICAL: MATCH EQUIPMENT TO WORK PHASE
Each step has a distinct phase - match equipment accordingly:

PLANNING/SURVEY PHASES:
- Drawings, plans, site survey forms
- Camera for photos
- Notepad and pen
- CAT & Genny scanner (if applicable)
- Measuring tape
- NO installation tools needed yet!

PROCUREMENT/ORDERING PHASES:
- Supplier contact details
- Purchase orders/requisition forms
- Equipment specifications
- Budget approval documentation
- Or simply: "No special tools required - administrative task"

INSTALLATION PHASES (actual physical work):
- Drills, fixings, rawlplugs
- Cable installation tools
- Mounting equipment
- Power tools as needed

TESTING/COMMISSIONING PHASES:
- Voltage testers (GS38)
- Multi-function testers
- Insulation testers
- Test certificates

SHUTDOWN/ISOLATION PHASES:
- Lock-off kits
- Warning signs and tags
- Voltage indicators
- Proving unit

❌ WRONG: "Pre-start survey" with "Drill, dust extraction, PPE"
✅ RIGHT: "Pre-start survey" with "Site survey form, Camera, Measuring tape, CAT scanner"

❌ WRONG: "Order materials" with "Lock-off kit, Cable clips"
✅ RIGHT: "Order materials" with "Supplier pricing lists" OR "No special tools required"

⚠️ CRITICAL: STEP-SPECIFIC SAFETY REQUIREMENTS
For each step's safetyNotes array:
- Only include safety requirements SPECIFIC to that individual step
- If a step has no unique safety requirements, leave the array EMPTY (do not add generic requirements)
- Example: Planning/survey phase should have NO safety notes or minimal ones like "Review site hazards"
- Example: Isolation phase MUST have "Isolation and lock-off required", "Prove dead before work"
- Example: Installation phase should have specific requirements like "Dust extraction required", "Manual handling assessment"
- DO NOT repeat the same safety requirements across multiple steps

Current date: September 2025.

🎯 TONE & COMMUNICATION:
✅ Conversational: "Right, full rewire on a 3-bed - that's a solid week's work for two sparks..."
✅ Practical: Explain the WHY before the HOW (e.g., "We clip every 400mm on horizontal runs because anything wider risks cable sag and potential damage")
✅ Safety-First: Always highlight critical safety points (e.g., "Isolate and test dead before ANY cable work - this is non-negotiable")
❌ Avoid: Robotic lists without context, vague terms like "regular intervals" or "appropriate spacing"

⚠️ CRITICAL: COMPREHENSIVE STEP DESCRIPTIONS REQUIRED
Each installation step MUST contain:
✓ Clear overview of what's being done (1 sentence)
✓ Bulleted or numbered sub-tasks showing the exact sequence (minimum 3-5 sub-tasks per step)
✓ Specific measurements extracted from knowledge base (e.g., "400mm clip spacing", "1.8m height", "16mm² cable")
✓ Quality/safety checkpoint at end of step
✗ Do NOT write single-sentence steps

BAD Example: "Install the consumer unit"
GOOD Example: "Install the consumer unit enclosure at 1.8m height from finished floor level:
• Mark fixing positions using a spirit level to ensure level installation
• Drill fixing holes using 5.5mm masonry bit for 50mm screws
• Insert wall plugs and secure unit with corrosion-resistant fixings
• Verify unit is plumb and secure before proceeding with cable entry
• Check clearances comply with BS 7671 Section 132.8 (minimum 300mm from water sources)"

📋 STRUCTURE YOUR RESPONSE:
1. **Acknowledge** (1-2 sentences) - Confirm what they're asking and show you understand the job
   Example: "Right, so you're looking at installing a shower circuit - 13kW load over 23m. That's a meaty cable run, let's break it down."

2. **Key Considerations** (2-4 bullets) - Critical things they must know BEFORE starting
   Example:
   - Circuit breaker: 40A Type B (13kW ÷ 230V = 56.5A, so 40A B-type won't nuisance trip on shower surge)
   - Cable size: 10mm² T&E (voltage drop: 3.2% at 23m - well within BS 7671's 5% limit)
   - Protection: 30mA RCD mandatory (bathroom circuit, Reg 701.411.3.3)

3. **Step-by-Step Guidance** - Practical installation sequence with EXACT values from knowledge base
   CRITICAL: Each step must have 3-5 sentences minimum with detailed sub-tasks
   Use specific measurements: "Clip spacing for 10mm² horizontal run: 250mm (BS 7671 Table 4A2)"
   Include practical tips: "When notching joists, max depth is 1/8th joist depth (e.g., 25mm notch on 200mm joist) - Section 522.6.204"
   
4. **Safety Warnings** (always include) - Highlight risks
   Example:
   ⚠️ CRITICAL SAFETY:
   - Isolate supply at consumer unit and TEST DEAD before starting
   - Bathroom zones: NO socket outlets within 3m of bath/shower (Section 701.512.3)
   - Double-pole isolation switch required (pull-cord type, outside zones)

5. **Pro Tips** - Time-savers and common mistakes to avoid
   Example:
   💡 PRO TIPS:
   - Route cable INSIDE safe zones (150mm from corners, 150mm above/below accessories)
   - Label cables at both ends BEFORE termination (saves hours of tracing later)
   - Test continuity BEFORE plastering over cables

INSTALLATION KNOWLEDGE DATABASE (${installKnowledge?.length || 0} verified guides):
${installContext}

**CRITICAL: EXTRACT PROCEDURES FROM RAG KNOWLEDGE**
The installation knowledge database above contains verified step-by-step procedures.
You MUST:
1. Search the knowledge base for procedures matching this work type
2. Extract specific steps from RAG docs (e.g., "Clip spacing 400mm for horizontal runs")
3. Include exact measurements from knowledge base (don't guess or generalise)
4. Reference table numbers if cited in knowledge (e.g., "Table 4A2", "Table 4D5")
5. Each step should contain 5-10 sub-tasks extracted from RAG procedures

Example of extracting from RAG:
If knowledge base says: "Cable clips for 2.5mm² T&E: horizontal runs 400mm spacing (Table 4A2), vertical runs 550mm"
Your step should say: "Install cable clips at 400mm intervals for horizontal runs per Table 4A2 (for 2.5mm² T&E). For vertical runs, increase spacing to 550mm."

DO NOT write generic steps like "Install cable clips at appropriate spacing"
DO extract specific values: "400mm spacing", "1.8m height", "16mm² cable", "50mm screws"

⚠️ CRITICAL: Extract specific values from knowledge base above:
✓ If database states "Clip spacing 2.5mm² horizontal: 400mm" → use 400mm in your steps
✓ If database mentions "Notching joists: max 0.125× joist depth" → include exact fraction
✓ If database references "BS 7671 Table 4A2" → cite the table number
✗ Never use vague terms like "regular intervals" or "appropriate spacing"

${contextSection}

⚠️ SECTION 8: TESTING & COMMISSIONING PROCEDURES (MANDATORY) ⚠️

You MUST provide MINIMUM 5 comprehensive BS 7671-compliant testing procedures in the "testingProcedures" array:

1️⃣ **Continuity of Protective Conductors (R1+R2)**
   - Standard: BS 7671 Reg 643.2.1
   - Procedure: "Using a multifunction tester, connect test leads between line conductor and circuit protective conductor at the furthest point of the circuit. Set tester to continuity mode (200mA test current). Record R1+R2 value and compare against maximum Zs from BS 7671 Appendix 3."
   - Acceptance: "R1+R2 must not exceed maximum Zs for the protective device. Example: 40A Type B MCB max Zs = 1.09Ω, so R1+R2 must be significantly lower to account for external impedance (Ze)."
   - Certificate: "Electrical Installation Certificate (EIC) - Test Results Schedule"

2️⃣ **Insulation Resistance Test**
   - Standard: BS 7671 Reg 643.3.2
   - Procedure: "Isolate circuit and remove all lamps/sensitive equipment. Using insulation resistance tester, apply 500V DC between live conductors and earth. Test for minimum 1 minute. Record reading."
   - Acceptance: "≥1.0MΩ for new installations at 500V DC (Reg 643.3.2). Circuits with electronic equipment: ≥0.5MΩ may be acceptable if individual components tested separately."
   - Certificate: "EIC Test Results Schedule"

3️⃣ **Polarity Verification**
   - Standard: BS 7671 Reg 643.6
   - Procedure: "Verify correct polarity at all socket outlets, switches, and accessories. Check phase conductor (brown/red) terminates on correct terminal. For socket outlets: phase on right terminal when viewed from front."
   - Acceptance: "All single-pole devices connected in phase conductor only. Correct polarity confirmed at all points. No crossed conductors."
   - Certificate: "EIC Schedule of Test Results"

4️⃣ **Earth Fault Loop Impedance (Zs)**
   - Standard: BS 7671 Reg 643.7, Appendix 3
   - Procedure: "Using loop impedance tester, measure Zs at furthest point of each circuit. Ensure test current sufficient (typically 15-25A). Record Zs value. Compare against maximum values from BS 7671 Appendix 3 Tables 3A-3E for the specific protective device."
   - Acceptance: "Measured Zs must not exceed maximum permitted value for protective device. Examples: 32A Type B MCB = 1.37Ω max, 40A Type B = 1.09Ω max, 6A Type B = 7.28Ω max. Account for temperature correction if tested in cold conditions."
   - Certificate: "EIC Schedule of Test Results"

5️⃣ **RCD Trip Time Test**
   - Standard: BS 7671 Reg 643.9.2, BS EN 61008/61009
   - Procedure: "Using RCD tester, apply half-rated test current (15mA for 30mA RCD) - RCD should NOT trip. Apply rated current (30mA) - RCD must trip within 300ms. Apply 5× rated current (150mA for 30mA RCD) - RCD must trip within 40ms. Test both phase-earth and neutral-earth faults."
   - Acceptance: "30mA RCD: Trip time ≤40ms at 150mA (5×In), ≤300ms at 30mA (1×In). No trip at 15mA (0.5×In). Ramp test: trip between 15-30mA."
   - Certificate: "EIC - RCD Test Schedule"

**EXTRACT FROM RAG KNOWLEDGE**: Search BS 7671 Intelligence knowledge base for:
- Chapter 64 (Inspection & Testing)
- Appendix 3 (Maximum Zs values)
- Guidance Note 3 (Inspection & Testing)
Use exact values from regulations where available.

⚠️ SECTION 9: COMPETENCY REQUIREMENTS (MANDATORY) ⚠️

You MUST specify overall competency requirements in the "competencyRequirements" object:

**minimumQualifications** (array, minimum 2):
- Domestic rewire: ["18th Edition BS 7671 (City & Guilds 2382-18)", "City & Guilds 2391 Inspection & Testing", "Part P Building Regulations competent"]
- Commercial installation: ["Level 3 Electrical Installation (C&G 2365)", "18th Edition BS 7671", "City & Guilds 2391", "NICEIC/NAPIT Approved Contractor", "ECS Gold Card"]
- EV Charger: ["18th Edition BS 7671", "OLEV-approved EV charger installer training", "City & Guilds 2391"]
- Testing/commissioning: ["18th Edition BS 7671", "City & Guilds 2391 Inspection & Testing Qualification", "Test Equipment Competency Certificate"]

**supervision** (string):
- "Qualified electrician (18th Edition + 2391) must supervise all trainees"
- "Competent Person Scheme member to verify and certify work"
- "No supervision required - work must be performed by qualified electrician only"
- "Authorised Person (AP) must supervise all isolation and switching activities"

**additionalTraining** (array - only genuinely relevant):
- Domestic: ["NICEIC Domestic Installer registration", "Part P notification procedures"]
- Commercial: ["CDM Regulations awareness", "CSCS Card (Construction Skills)", "Safe Isolation Training (prove dead)", "First Aid at Work"]
- Specific work: ["IPAF (Mobile Elevating Work Platforms) - if working at height >2m", "PASMA (Scaffold Tower) - if using scaffold", "Confined Spaces Entry - if working in cable vaults/ducts", "Asbestos Awareness - if working in pre-2000 buildings"]

⚠️ SECTION 10: SITE LOGISTICS (MANDATORY) ⚠️

You MUST provide detailed site logistics in the "siteLogistics" object:

**isolationPoints** (array, minimum 1 - BE SPECIFIC):
- ❌ WRONG: ["Main consumer unit", "Local isolator"]
- ✅ RIGHT: ["Main incoming isolator at consumer unit in hallway cupboard (TNCS earthing, 100A main switch)", "Submain isolator in garage distribution board (63A DP switch-fuse)", "Local isolation switch above shower unit (45A DP pull-cord switch, 2m height)"]
- Include: Location details, type of isolation device, ratings, earthing system

**accessRequirements** (string - minimum 2-3 sentences):
Must cover: Hours, affected areas, protection, waste, parking, special access
Example: "Coordinate access with occupants - bathroom and adjacent landing unavailable for 4-6 hours during installation. Protect finished flooring with dust sheets and hardboard along cable route from consumer unit to bathroom. Arrange skip or heavy-duty bags for demolition waste (old consumer unit, redundant cables, plasterboard). Van access required to front of property for material delivery. Loft access via hatch in landing ceiling - ensure safe working platform and adequate lighting in roof space."

**permitsRequired** (array):
- DOMESTIC: [] or ["None - domestic installation under homeowner consent"]
- COMMERCIAL: ["Permit to Work (PTW) - electrical isolation required", "Hot Work Permit - if cutting cables near flammable materials", "Work at Height Permit - if working above 2m", "Confined Space Entry Permit - if cable routing through ducts/vaults"]
- INDUSTRIAL: Add ["Lock-off/Tag-out authorisation", "Area clearance certificate", "Emergency isolation briefing"]

**workingHours** (string - consider supply interruption):
- "08:00-16:00 weekdays - coordinate 2-hour power outage window with building manager for consumer unit changeover"
- "Out-of-hours work preferred (after 18:00 or weekends) to minimize disruption to occupied commercial premises"
- "Daylight hours only (09:00-17:00) - external cable work requires natural light for safe excavation"
- "Phased work over 3 days - isolation windows 22:00-06:00 to avoid peak business hours"

⚠️ SECTION 11: REGULATORY CITATIONS (MANDATORY) ⚠️

You MUST provide MINIMUM 3 BS 7671 citations in the "regulatoryCitations" array, linked to specific installation steps.

**Extract from RAG BS 7671 Intelligence** where available. Cover:

1️⃣ **RCD Protection** (link to step installing RCD/consumer unit):
   - Regulation: "BS 7671 Reg 411.3.2.2"
   - applicableToStep: 4 (example - consumer unit installation)
   - Requirement: "Additional protection by 30mA RCD required for all socket outlets rated up to 20A for general use"

2️⃣ **Cable Installation Methods** (link to cable routing step):
   - Regulation: "BS 7671 Table 4A2"
   - applicableToStep: 6 (example - cable installation)
   - Requirement: "Cable support spacing for clipped direct (Method C): 2.5mm² T&E horizontal runs maximum 400mm intervals, vertical runs 550mm"

3️⃣ **Testing Requirements** (link to testing/commissioning steps):
   - Regulation: "BS 7671 Reg 643.2.1"
   - applicableToStep: 8 (example - continuity testing)
   - Requirement: "Continuity of protective conductors (R1+R2) must be verified before energising any circuit"

**Common regulations to include (if applicable to THIS job)**:
- Section 701 (Bathrooms/showers): Zones, RCD protection, IP ratings
- Reg 522.6.204 (Notching joists): Maximum depth 0.125× joist depth
- Reg 537.2.1.1 (Isolation): Means of isolation shall disconnect all live conductors
- Section 722 (EV charging): Requirements for electric vehicle charging installations
- Appendix 3 Tables 3A-3E (Maximum Zs values for different protective devices)
- Reg 521.10.1 (Safe zones): Cables concealed in walls/partitions to run in prescribed zones

**Link citations to actual installation steps** - analyze your step sequence and match regulations to relevant steps.

Respond using the tool schema provided with conversational, practical guidance.`;

    const userPrompt = `Provide detailed installation guidance for:
${query}

${cableType ? `Cable Type: ${cableType}` : ''}
${installationMethod ? `Installation Method: ${installationMethod}` : ''}
${location ? `Location: ${location}` : ''}

Include step-by-step instructions, practical tips, and things to avoid.`;

    // Phase 1: Call AI with GPT-5 mini for superior reasoning
    const model = 'gpt-5-mini-2025-08-07';
    
    logger.debug(`Calling ${model}`);
    // Progress monitoring for long-running AI calls
    const aiCallStart = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - aiCallStart) / 1000);
      logger.info(`⏱️ AI call in progress: ${elapsed}s elapsed (timeout: 240s)`);
    }, 30000); // Log every 30 seconds

    let aiResult;
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // ✨ REAL-TIME PROGRESS UPDATES every 10s
      let aiCallElapsed = 0;
      const progressInterval = setInterval(() => {
        aiCallElapsed += 10;
        logger.info(`🤖 AI generating installation steps (${aiCallElapsed}s)...`);
        
        // Show granular progress based on time elapsed
        if (aiCallElapsed === 10) {
          logger.info('   → Analyzing installation requirements...');
        } else if (aiCallElapsed === 20) {
          logger.info('   → Sequencing installation steps...');
        } else if (aiCallElapsed === 30) {
          logger.info('   → Adding practical procedures...');
        } else if (aiCallElapsed === 40) {
          logger.info('   → Enriching with safety requirements...');
        } else if (aiCallElapsed > 50 && aiCallElapsed % 20 === 0) {
          logger.info('   → Finalizing comprehensive method statement...');
        }
      }, 10000);
      
      // Start heartbeat to prevent "stuck job" false positives
      const heartbeatInterval = setInterval(async () => {
        try {
          const jobId = body.jobId;
          if (jobId) {
            await supabase
              .from('rams_generation_jobs')
              .update({ 
                current_step: `AI processing installation steps... (${Math.floor((Date.now() - aiCallStart) / 1000)}s)`,
                progress: Math.min((body.currentProgress || 0) + 1, 95)
              })
              .eq('id', jobId);
          }
        } catch (err) {
          console.warn('Heartbeat update failed (non-critical):', err);
        }
      }, 30000);
      
      // 🚀 ACTION 1.1: Upgrade to GPT-5 Flagship Model
      logger.info('🚀 Calling OpenAI GPT-5 FLAGSHIP - 32k tokens, 240s timeout');
      
      aiResult = await callOpenAI({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-5-2025-08-07',
        max_completion_tokens: 32000,
        tools: [installerV3ToolSchema],
        tool_choice: { type: 'function', function: { name: 'provide_installation_guidance' } }
      }, OPENAI_API_KEY, 300000); // 300s timeout
      
      clearInterval(heartbeatInterval);
      clearInterval(progressInterval);
      logger.info(`✅ OpenAI call completed in ${Math.round((Date.now() - aiCallStart) / 1000)}s`);
      
    } catch (error) {
      clearInterval(heartbeatInterval);
      clearInterval(progressInterval);
      const elapsed = Math.round((Date.now() - aiCallStart) / 1000);
      logger.error(`❌ OpenAI call failed after ${elapsed}s`);
      
      // Check if timeout error - provide graceful fallback
      if (error instanceof Error && (error.message.includes('timeout') || error.message.includes('aborted'))) {
        logger.warn('⚠️ Timeout detected - returning minimal fallback response');
        
        // Return minimal viable response instead of throwing
        aiResult = {
          content: '',
          toolCalls: [{
            function: {
              name: 'provide_installation_guidance',
              arguments: JSON.stringify({
                response: `Installation guidance generation timed out after ${elapsed}s. This is a complex installation requiring detailed planning. Please try generating RAMS in phases:\n\n1. Generate RAMS for planning/procurement phase\n2. Generate RAMS for installation phase separately\n3. Generate RAMS for testing/commissioning separately`,
                installationSteps: [
                  {
                    step: 1,
                    title: 'Phase 1: Planning & Risk Assessment',
                    description: 'Due to complexity, break this installation into manageable phases:\n• Review site conditions and access requirements\n• Identify all hazards and create detailed risk assessments\n• Procure materials and equipment\n• Arrange for any specialist subcontractors\n• Verify isolation procedures with client',
                    tools: ['Site survey tools', 'Risk assessment templates'],
                    materials: ['As per detailed design'],
                    safetyNotes: ['Full site survey required before work commences'],
                    estimatedTime: 120
                  },
                  {
                    step: 2,
                    title: 'Phase 2: Installation Execution',
                    description: 'Execute installation in controlled phases:\n• Isolate supply and verify dead\n• Install equipment per manufacturer instructions\n• Maintain safe zones around work area\n• Document all work stages with photos\n• Test continuity at each stage',
                    tools: ['Standard electrician tools', 'Test equipment'],
                    materials: ['As specified'],
                    safetyNotes: ['Isolation and lock-off mandatory', 'Permit to work may be required'],
                    estimatedTime: 240
                  }
                ],
                practicalTips: [
                  'Complex installations benefit from phased RAMS generation',
                  'Consider creating separate RAMS for each work phase',
                  'Always verify isolation before starting work'
                ],
                commonMistakes: [
                  'Attempting to document entire complex job in single RAMS',
                  'Not breaking work into manageable phases'
                ],
                toolsRequired: ['Standard electrician toolset', 'Test equipment', 'PPE']
              })
            }
          }]
        };
        
        // Continue with parsing (don't throw)
      } else {
        // Non-timeout error - surface immediately
        logger.error('OpenAI call failed - non-timeout error', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    }

    // Parse OpenAI tool call response
    let installResult: any;
    
    if (aiResult.toolCalls && aiResult.toolCalls.length > 0) {
      // OpenAI tool calls - parse arguments
      installResult = JSON.parse(aiResult.toolCalls[0].function.arguments);
    } else if (aiResult.content) {
      // Direct content - parse as JSON
      try {
        const jsonStr = aiResult.content;
        installResult = JSON.parse(jsonStr.trim());
      } catch (parseError) {
        logger.warn('Failed to parse AI content as JSON, using graceful fallback', { 
          error: parseError.message,
          contentPreview: aiResult.content.substring(0, 200)
        });
        
        // Graceful fallback with helpful guidance
        installResult = {
          response: 'Unable to process installation guidance at this time. Please provide more specific details about the installation method (e.g., "clipped direct", "conduit", "buried") and circuit requirements.',
          installationSteps: [
            {
              step: 1,
              title: 'Refine Query',
              description: 'Add installation method details (clipped direct, conduit, trunking, or buried) for accurate guidance.'
            },
            {
              step: 2,
              title: 'Include Circuit Details',
              description: 'Specify cable size, load type, and cable length for comprehensive installation steps.'
            }
          ],
          practicalTips: [
            'Always specify the installation method for precise clip spacing and derating factors',
            'Include cable length to get accurate voltage drop considerations'
          ]
        };
      }
    } else {
      throw new Error('No content or tool calls returned from AI');
    }

    // 🚨 CRITICAL: Validate non-zero steps immediately
    const steps = installResult.installationSteps || [];
    
    // 🔍 DEBUG: Log what AI actually generated
    logger.info('🤖 AI Generated Steps Analysis:', {
      totalSteps: steps.length,
      stepsWithTools: steps.filter((s: any) => s.tools && s.tools.length > 0).length,
      stepsWithMaterials: steps.filter((s: any) => s.materials && s.materials.length > 0).length,
      sampleStep: steps[0] ? {
        title: steps[0].title,
        hasTools: !!steps[0].tools,
        toolsCount: (steps[0].tools || []).length,
        toolsSample: (steps[0].tools || []).slice(0, 3),
        hasMaterials: !!steps[0].materials,
        materialsCount: (steps[0].materials || []).length
      } : 'no steps'
    });
    
    // Quality validation after AI generation
    steps.forEach((step: any, index: number) => {
      const issues: string[] = [];
      
      // Check description quality
      const wordCount = (step.description || '').split(/\s+/).length;
      if (wordCount < 30) {
        issues.push(`Description too short (${wordCount} words, need 30+)`);
      }
      
      // Check for specific measurements
      const hasSpecifics = /\d+mm|\d+m|\d+A|\d+kW|\d+%/i.test(step.description || '');
      if (!hasSpecifics && !/planning|procurement|preparation/i.test(step.title)) {
        issues.push('No specific measurements in description');
      }
      
      // Check for vague language
      const vagueTerms = /appropriate|suitable|regular intervals|as required|as needed/i;
      if (vagueTerms.test(step.description || '')) {
        issues.push('Contains vague language');
      }
      
      // Check tools specificity
      if (step.tools?.some((t: string) => /^(drill|screwdriver|tester|pliers)$/i.test(t.trim()))) {
        issues.push('Tools too generic (need sizes/types)');
      }
      
      if (issues.length > 0) {
        logger.warn(`⚠️ Quality issues in step ${index + 1} "${step.title}":`, issues);
      }
    });
    
    // RAG extraction verification
    const ragToolsAvailable = new Set(installKnowledge.flatMap((k: any) => k.tools_required || []));
    const ragMaterialsAvailable = new Set(installKnowledge.flatMap((k: any) => k.materials_needed || []));
    
    steps.forEach((step: any) => {
      const aiTools = step.tools || [];
      const matchedTools = aiTools.filter((t: string) => 
        Array.from(ragToolsAvailable).some(ragTool => 
          t.toLowerCase().includes(ragTool.toLowerCase()) || 
          ragTool.toLowerCase().includes(t.toLowerCase())
        )
      );
      
      const extractionRate = aiTools.length > 0 ? matchedTools.length / aiTools.length : 0;
      
      if (extractionRate < 0.3 && aiTools.length > 0) {
        logger.warn(`⚠️ Step "${step.title}" tools mostly invented (${(extractionRate*100).toFixed(0)}% from RAG)`);
      }
    });
    
    // Calculate overall quality score
    const qualityMetrics = {
      stepsWithTools: steps.filter((s: any) => s.tools && s.tools.length >= 3).length,
      stepsWithMaterials: steps.filter((s: any) => s.materials && s.materials.length >= 2).length,
      stepsWithHazards: steps.filter((s: any) => s.linkedHazards && s.linkedHazards.length >= 2).length,
      stepsWithRichDescriptions: steps.filter((s: any) => 
        s.description && s.description.split(/\s+/).length >= 30
      ).length,
      totalSteps: steps.length
    };
    
    const qualityScore = qualityMetrics.totalSteps > 0 ? (
      (qualityMetrics.stepsWithTools / qualityMetrics.totalSteps) * 25 +
      (qualityMetrics.stepsWithMaterials / qualityMetrics.totalSteps) * 25 +
      (qualityMetrics.stepsWithHazards / qualityMetrics.totalSteps) * 25 +
      (qualityMetrics.stepsWithRichDescriptions / qualityMetrics.totalSteps) * 25
    ) : 0;
    
    logger.info(`📊 Generation Quality Score: ${qualityScore.toFixed(0)}/100`, qualityMetrics);
    
    // 🚀 ACTION 3.1: Step-Level RAG Enrichment for poor-quality steps
    logger.info('🔍 Phase 2: Enriching each step with targeted RAG data...');
    
    // 🚨 CRITICAL: Identify safety-critical steps that MUST have tools
    const safetyCriticalKeywords = [
      'isolation', 'isolate', 'verify dead', 'prove dead', 'safe to work',
      'lock off', 'lockoff', 'isolation test', 'voltage test', 'test', 'testing'
    ];

    const isSafetyCritical = (stepTitle: string, stepDesc: string): boolean => {
      const combined = `${stepTitle} ${stepDesc}`.toLowerCase();
      return safetyCriticalKeywords.some(keyword => combined.includes(keyword));
    };
    
    for (const step of steps) {
      const needsEnrichment = 
        step.tools?.length < 3 || 
        step.materials?.length < 2 || 
        step.linkedHazards?.length < 2 ||
        isSafetyCritical(step.title, step.description);  // Force enrichment for safety steps
      
      if (!needsEnrichment) {
        continue;
      }
      
      // 🔍 DEBUG: Log enrichment attempt
      logger.info(`🔧 Attempting enrichment for step "${step.title}"`, {
        currentToolsCount: (step.tools || []).length,
        currentMaterialsCount: (step.materials || []).length,
        isSafetyCritical: isSafetyCritical(step.title, step.description)
      });
      
      const stepQuery = `${step.title} ${step.description}`.substring(0, 500);
      
        const { data: stepRag, error: stepRagError } = await supabase
          .from('practical_work_intelligence')
          .select('primary_topic, tools_required, materials_needed, bs7671_regulations, equipment_category, confidence_score')
          .or(`
            primary_topic.ilike.%${stepQuery}%,
            equipment_category.ilike.%${stepQuery}%,
            activity_types.cs.{installation,wiring,testing,fixing,mounting}
          `)
          .order('confidence_score', { ascending: false })
          .limit(5);

        // Error handling for enrichment query
        if (stepRagError) {
          logger.warn(`⚠️ Step enrichment query failed for "${step.title}":`, stepRagError);
        }
      
      if (stepRag && stepRag.length > 0) {
        const bestMatch = stepRag[0];
        
        // Enrich step with RAG data - CORRECTED FIELD NAMES
        if (!step.tools || step.tools.length < 3) {
          const ragTools = bestMatch.tools_required || [];  // ✅ CORRECT field name
          step.tools = [
            ...(step.tools || []),
            ...ragTools
          ].filter((t, i, arr) => arr.indexOf(t) === i)  // Deduplicate
           .slice(0, 10);
          
          logger.info(`✅ Enriched "${step.title}" tools: ${step.tools.length} from RAG (${ragTools.length} added)`);
        }
        
        if (!step.materials || step.materials.length < 2) {
          const ragMaterials = bestMatch.materials_needed || [];  // ✅ CORRECT field name
          step.materials = [
            ...(step.materials || []),
            ...ragMaterials
          ].filter((m, i, arr) => arr.indexOf(m) === i)
           .slice(0, 8);
           
          logger.info(`✅ Enriched "${step.title}" materials: ${step.materials.length} from RAG (${ragMaterials.length} added)`);
        }
        
        logger.info(`✅ Enriched step "${step.title}" with RAG data`);
      }
  }
  
  logger.info('✅ Step-level RAG enrichment complete');
  
  // 🚨 CRITICAL SAFETY VALIDATION: Detect steps with missing safety tools
  logger.info('🔐 Performing safety-critical tool validation...');

  steps.forEach((step: any, index: number) => {
    const isSafety = isSafetyCritical(step.title, step.description);
    
    if (isSafety && (!step.tools || step.tools.length === 0)) {
      logger.error(`🚨 CRITICAL: Safety step "${step.title}" has ZERO tools!`);
      
      // Emergency fallback: Add minimum safety tools based on step type
      if (/isolation|isolate|prove dead|verify dead/i.test(step.title)) {
        step.tools = [
          'Voltage indicator (GS38 compliant)',
          'Proving unit',
          'Lock-off kit with padlock',
          'Warning signs (Danger - Do Not Switch On)',
          'Insulated screwdriver set'
        ];
        logger.warn(`⚠️ Added emergency isolation tools to step ${index + 1}`);
      } else if (/test|testing|measurement/i.test(step.title)) {
        step.tools = [
          'Insulation resistance tester (500V DC)',
          'Multimeter (CAT III rated)',
          'Earth loop impedance tester',
          'Proving unit'
        ];
        logger.warn(`⚠️ Added emergency testing tools to step ${index + 1}`);
      }
    }
    
    if (isSafety && (!step.tools || step.tools.length === 0)) {
      logger.error(`🚨 CRITICAL: Safety step "${step.title}" has ZERO tools!`);
      
      // Emergency fallback: Add minimum safety tools based on step type
      if (/isolation|isolate|prove dead|verify dead/i.test(step.title)) {
        step.tools = [
          'Voltage indicator (GS38 compliant)',
          'Proving unit',
          'Lock-off kit with padlock',
          'Warning signs (Danger - Do Not Switch On)',
          'Insulated screwdriver set'
        ];
        logger.warn(`⚠️ Added emergency isolation tools to step ${index + 1}`);
      } else if (/test|testing|measurement/i.test(step.title)) {
        step.tools = [
          'Insulation resistance tester (500V DC)',
          'Multimeter (CAT III rated)',
          'Earth loop impedance tester',
          'Proving unit'
        ];
        logger.warn(`⚠️ Added emergency testing tools to step ${index + 1}`);
      }
    }
  });
    
    // 🚀 ACTION 5.1: Quality Boost Pass for poor overall quality
    if (qualityScore < 70) {
      logger.warn(`⚠️ Quality score ${qualityScore.toFixed(0)}/100 below target - considering enhancement...`);
      
      const poorSteps = steps.filter((s: any) => 
        (s.tools?.length || 0) < 3 || 
        (s.linkedHazards?.length || 0) < 2 ||
        (s.description?.split(/\s+/).length || 0) < 30
      );
      
      if (poorSteps.length > 0 && poorSteps.length <= 5) {
        logger.info(`🔧 Enhancement pass would target ${poorSteps.length} steps (deferred for performance)`);
      }
    }
    
    if (steps.length === 0) {
      logger.error('🚨 CRITICAL: AI generated ZERO steps', {
        hadToolCall: !!aiResult.toolCalls,
        hadInstallationSteps: !!installResult.installationSteps,
        rawSample: JSON.stringify(installResult).substring(0, 300)
      });
      throw new Error('AI generated zero installation steps - invalid response');
    }

    logger.info(`✅ Extracted ${steps.length} installation steps from AI response`);

    timings.aiGeneration = Date.now() - timings.start - timings.ragRetrieval - timings.cacheCheck;
    timings.total = Date.now() - timings.start;

    // IMPROVEMENT: Response Quality Validation
    const { validateResponse } = await import('../_shared/response-validation.ts');
    const validation = validateResponse(
      installResult.response,
      effectiveQuery,
      { installKnowledge, method: installationMethod }
    );

    if (!validation.isValid) {
      logger.warn('⚠️ Installation response validation issues', {
        issues: validation.issues.length
      });
    }

    logger.info('Installation guidance completed', {
      stepsCount: installResult.installationSteps?.length,
      tipsCount: installResult.practicalTips?.length,
      performanceMs: timings.total,
      validationConfidence: validation.confidence,
      breakdown: {
        cache: timings.cacheCheck,
        rag: timings.ragRetrieval,
        ai: timings.aiGeneration
      }
    });

    // Build RAG preview for UI display
    const ragPreview = installKnowledge.slice(0, 6).map(item => ({
      id: item.id,
      number: item.regulation_number || item.number,
      section: item.section,
      excerpt: (item.content || '').slice(0, 220) + '…'
    }));

    // Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      installResult,
      installKnowledge,
      'installation',
      { installationMethod, cableType, location }
    );

    // Helper: Find RAG entry that matches step SEMANTICALLY (not just keywords)
    function findRelevantRagForStep(step: any, ragKnowledge: any[]): any {
      const stepText = `${step.title} ${step.description || step.content || ''}`.toLowerCase();
      
      // Detect work type and context from step
      const workType = detectWorkType(step);
      const location = detectLocation(stepText);
      const equipment = detectEquipment(stepText);
      
      let bestMatch: any = null;
      let bestScore = 0;
      
      for (const rag of ragKnowledge) {
        let score = 0;
        
        // Exact equipment category match (+50 points)
        if (equipment && rag.equipment_category?.toLowerCase().includes(equipment)) {
          score += 50;
        }
        
        // Work type match (+30 points)
        const ragWorkType = detectWorkType({ title: rag.primary_topic, content: rag.content });
        if (workType === ragWorkType) {
          score += 30;
        }
        
        // Location context match (+20 points)
        if (location && rag.content?.toLowerCase().includes(location)) {
          score += 20;
        }
        
        // Exact phrase match in title (+40 points)
        const titlePhrases = extractPhrases(step.title);
        const ragTopicPhrases = extractPhrases(rag.primary_topic || '');
        const phraseMatches = titlePhrases.filter((p: string) => ragTopicPhrases.includes(p));
        score += phraseMatches.length * 40;
        
        // Power rating match if applicable (+15 points)
        const stepPower = extractPowerRating(step.description || step.content || '');
        const ragPower = extractPowerRating(rag.content || '');
        if (stepPower && ragPower && Math.abs(stepPower - ragPower) < 2) {
          score += 15;
        }
        
        const finalScore = score + (titleOverlap * 2); // Weight title matches more
        
        if (finalScore > bestScore) {
          bestScore = finalScore;
          bestMatch = rag;
        }
      }
      
      if (bestMatch && bestScore > 0) {
        logger.info(`🎯 Found RAG match for "${step.title}": "${bestMatch.primary_topic}" (score: ${bestScore})`);
      }
      
      return bestMatch;
    }

    // Helper: Extract hazards from RAG content text
    function extractHazardsFromRagContent(content: string, step: any): string[] {
      const hazards: string[] = [];
      
      // Look for hazard-related sentences in RAG content
      const sentences = content.split(/[.!?]+/);
      
      for (const sentence of sentences) {
        const lower = sentence.toLowerCase();
        if (lower.includes('hazard') || lower.includes('risk') || lower.includes('danger') || 
            lower.includes('shock') || lower.includes('height') || lower.includes('dust')) {
          hazards.push(sentence.trim());
        }
      }
      
      return hazards.length > 0 ? hazards : [];
    }

    // Helper: Enrich step with semantic RAG matching (no generic defaults)
    function enrichStepWithDefaults(step: any, ragKnowledge: any[]): any {
      const enriched = { ...step };
      
      // TOOLS: Try to find relevant RAG data by analyzing step content
      if (!enriched.tools || enriched.tools.length === 0) {
        const relevantRag = findRelevantRagForStep(step, ragKnowledge);
        
        if (relevantRag?.tools_required && relevantRag.tools_required.length > 0) {
          enriched.tools = relevantRag.tools_required;
          logger.info(`📌 Enriched step "${step.title}" with ${enriched.tools.length} tools from RAG match: "${relevantRag.primary_topic}"`);
        } else {
          // If RAG has no tools, log this as an AI failure (should not happen with new schema)
          logger.warn(`⚠️ AI failed to provide tools for step "${step.title}" and no RAG match found - this should not happen with minItems constraint`);
        }
      }
      
      // Validate step description length
      if (enriched.description && enriched.description.split(' ').length < 80) {
        logger.warn(`⚠️ Step ${step.step} description too brief (${enriched.description.split(' ').length} words). Minimum 150 words required.`);
      }
      
      // MATERIALS: Same logic
      if (!enriched.materials || enriched.materials.length === 0) {
        const relevantRag = findRelevantRagForStep(step, ragKnowledge);
        
        if (relevantRag?.materials_needed && relevantRag.materials_needed.length > 0) {
          enriched.materials = relevantRag.materials_needed;
          logger.info(`📌 Enriched step "${step.title}" with ${enriched.materials.length} materials from RAG`);
        }
      }
      
      // HAZARDS: Same logic
      if (!enriched.linkedHazards || enriched.linkedHazards.length === 0) {
        const relevantRag = findRelevantRagForStep(step, ragKnowledge);
        
        if (relevantRag?.content && relevantRag.content.toLowerCase().includes('hazard')) {
          // Extract hazards from RAG content if available
          enriched.linkedHazards = extractHazardsFromRagContent(relevantRag.content, step);
          if (enriched.linkedHazards.length > 0) {
            logger.info(`📌 Enriched step "${step.title}" with ${enriched.linkedHazards.length} hazards from RAG content`);
          }
        }
        
        if (!enriched.linkedHazards || enriched.linkedHazards.length === 0) {
          logger.warn(`⚠️ AI failed to provide hazards for step "${step.title}" - this should not happen with minItems constraint`);
          enriched.linkedHazards = []; // Keep empty to expose the problem
        }
      }
      
      return enriched;
    }

    // Helper: Infer hazards from step activities
    function inferHazardsFromStep(step: any): string[] {
      const desc = (step.description || '').toLowerCase();
      const title = (step.title || '').toLowerCase();
      const combined = `${title} ${desc}`;
      const hazards: string[] = [];
      
      if (/height|ladder|scaffold|roof|ceiling/i.test(combined)) {
        hazards.push('Working at height - use appropriate access equipment per Work at Height Regulations 2005');
      }
      if (/isolat|energi|live|electrical/i.test(combined)) {
        hazards.push('Electrical shock risk - isolation and lockout required per BS 7671');
      }
      if (/drill|dust|cutting|grinding/i.test(combined)) {
        hazards.push('Dust inhalation - use dust extraction and RPE per COSHH');
      }
      if (/lift|carry|manual handling|heavy/i.test(combined)) {
        hazards.push('Manual handling injury - assess load and use correct technique per HSE guidance');
      }
      if (/confined|tight|restricted space/i.test(combined)) {
        hazards.push('Confined space entry - permit required per Confined Spaces Regulations 1997');
      }
      if (/noise|loud|power tool/i.test(combined)) {
        hazards.push('Noise exposure - use hearing protection per Control of Noise at Work Regulations');
      }
      
      return hazards;
    }

    // Helper: Infer qualifications if AI didn't provide them
    function inferQualificationsFromStep(step: any): string[] {
      const desc = (step.description || '').toLowerCase();
      const safety = (step.safetyNotes || []).join(' ').toLowerCase();
      const title = (step.title || '').toLowerCase();
      const combined = `${title} ${desc} ${safety}`;
      
      const qualifications: string[] = [];
      
      // Isolation work
      if (/isolat|lock.?off|prove dead|test dead|energi|permit to work/i.test(combined)) {
        qualifications.push('18th Edition BS 7671', 'Authorised Person (AP)', 'Safe Isolation Trained');
      }
      // Installation work
      else if (/install|terminate|connect|fix|mount|drill|cable run|pulling cable|routing|first fix|second fix/i.test(combined)) {
        qualifications.push('Qualified Electrician', 'CSCS Card', '18th Edition BS 7671');
      }
      // Testing work
      else if (/test|commission|inspect after|measure|certificate|continuity|insulation resistance/i.test(combined)) {
        qualifications.push('18th Edition BS 7671', 'Test Equipment Competent', 'Inspection & Testing Qualified');
      }
      // Planning/survey
      else if (/planning|survey|assess|review|site visit|walkthrough|risk assessment/i.test(combined)) {
        qualifications.push('Site Manager', 'H&S Awareness', 'CDM trained');
      }
      // Procurement
      else if (/procurement|order|purchase|supplier|obtain materials/i.test(combined)) {
        qualifications.push('Procurement Authorised', 'Material Specification Knowledge');
      }
      
      // Default if nothing matches
      if (qualifications.length === 0) {
        qualifications.push('Competent Person', 'Competent supervision if trainee');
      }
      
      return qualifications;
    }

    // Build standardized response
    const standardizedResponse: InstallerV3Response = {
      success: true,
      data: {
        steps: (installResult.installationSteps || []).map((step: any, index: number) => {
          // ✨ ENRICH step with RAG data if AI didn't provide it
          const enrichedStep = enrichStepWithDefaults(step, installKnowledge);
          
          return {
            id: enrichedStep.id || `step-${index + 1}`,
            stepNumber: enrichedStep.step || enrichedStep.stepNumber || index + 1,
            title: enrichedStep.title || `Step ${index + 1}`,
            description: enrichedStep.description || '',
            safetyRequirements: enrichedStep.safetyNotes || enrichedStep.safetyRequirements || [],
            equipmentNeeded: enrichedStep.tools || enrichedStep.equipmentNeeded || enrichedStep.equipmentRequired || [],
            qualifications: enrichedStep.qualifications || inferQualificationsFromStep(enrichedStep),
            estimatedDuration: enrichedStep.estimatedTime ? `${enrichedStep.estimatedTime} minutes` : '15-30 minutes',
            riskLevel: 'medium' as const,
            dependencies: [],
            isCompleted: false,
            linkedHazards: enrichedStep.linkedHazards || [],
            materialsNeeded: enrichedStep.materials || [], // ✅ NEW: Add materials
            // 🔍 DEBUG: Log what we're sending to frontend
            _debug: {
              hadTools: !!enrichedStep.tools,
              toolsCount: (enrichedStep.tools || []).length,
              hadEquipmentNeeded: !!enrichedStep.equipmentNeeded,
              toolsSample: (enrichedStep.tools || []).slice(0, 3)
            }
          };
        }),
        toolsRequired: installResult.toolsRequired || [],
        materialsRequired: installResult.materialsRequired || [],
        practicalTips: installResult.practicalTips || [],
        commonMistakes: installResult.commonMistakes || [],
        // ✨ NEW: BS 7671 Compliance Data
        testingProcedures: installResult.testingProcedures || [],
        competencyRequirements: installResult.competencyRequirements || {
          minimumQualifications: ['18th Edition BS 7671', 'Qualified Electrician'],
          supervision: 'Qualified electrician must supervise trainees',
          additionalTraining: []
        },
        siteLogistics: installResult.siteLogistics || {
          isolationPoints: ['Main consumer unit isolator'],
          accessRequirements: 'Standard site access required. Coordinate with occupants for supply interruption.',
          permitsRequired: [],
          workingHours: '08:00-16:00 weekdays - coordinate power outage with occupants'
        },
        regulatoryCitations: installResult.regulatoryCitations || []
      },
      metadata: {
        generationTimeMs: timings.total,
        stepCount: installResult.installationSteps?.length || 0,
        totalEstimatedTime: installResult.totalEstimatedTime || 'Unknown',
        difficultyLevel: installResult.difficultyLevel || 'Medium',
        timingBreakdown: {
          cacheCheck: timings.cacheCheck,
          ragRetrieval: timings.ragRetrieval,
          aiGeneration: timings.aiGeneration,
          totalTime: timings.total
        },
        contextSources,
        receivedFrom: previousAgentOutputs?.map((o: any) => o.agent).join(', ') || 'none',
        // 🚀 ACTION 7.1: Quality Metrics for Frontend Display
        qualityMetrics: {
          overallScore: Math.round(qualityScore),
          ragExtractionRate: Math.round((qualityMetrics.stepsWithTools / qualityMetrics.totalSteps) * 100),
          stepsWithCompleteData: qualityMetrics.stepsWithTools,
          ragDataUsed: {
            practicalProcedures: installKnowledge.filter((k: any) => 
              k.source === 'practical_work_intelligence' || 
              k.source === 'practical_work'  // Fallback for alternate naming
            ).length,
            regulations: installKnowledge.filter((k: any) => 
              k.source === 'bs7671_intelligence' || 
              k.source === 'bs7671' ||
              k.source === 'regulations_intelligence'  // Alternative source names
            ).length,
            avgRelevance: Math.round(installKnowledge.length > 0 
              ? (installKnowledge.reduce((s: number, k: any) => s + (k.hybrid_score || 0), 0) / installKnowledge.length * 100)
              : 0
            ),
            // 🔍 DEBUG: Log what we're actually counting
            _debug: {
              totalKnowledge: installKnowledge.length,
              sourceBreakdown: installKnowledge.reduce((acc: any, k: any) => {
                acc[k.source] = (acc[k.source] || 0) + 1;
                return acc;
              }, {})
            }
          },
          // 📊 Detailed extraction breakdown by source
          extractionBreakdown: {
            practicalWork: {
              documentsUsed: installKnowledge.filter((k: any) => k.source === 'practical_work_intelligence').length,
              toolsExtracted: installKnowledge
                .filter((k: any) => k.source === 'practical_work_intelligence')
                .reduce((sum: number, k: any) => sum + ((k.tools_required || []).length), 0),
              materialsExtracted: installKnowledge
                .filter((k: any) => k.source === 'practical_work_intelligence')
                .reduce((sum: number, k: any) => sum + ((k.materials_needed || []).length), 0),
              regulationsExtracted: installKnowledge
                .filter((k: any) => k.source === 'practical_work_intelligence')
                .reduce((sum: number, k: any) => sum + ((k.bs7671_regulations || []).length), 0),
              avgConfidence: Math.round(
                installKnowledge.filter((k: any) => k.source === 'practical_work_intelligence').length > 0
                  ? (installKnowledge
                      .filter((k: any) => k.source === 'practical_work_intelligence')
                      .reduce((s: number, k: any) => s + (k.confidence_score || 0), 0) / 
                      installKnowledge.filter((k: any) => k.source === 'practical_work_intelligence').length * 100)
                  : 0
              )
            },
            bs7671: {
              documentsUsed: installKnowledge.filter((k: any) => k.source === 'bs7671_intelligence').length,
              regulationsExtracted: installKnowledge.filter((k: any) => k.source === 'bs7671_intelligence').length,
              avgRelevance: Math.round(
                installKnowledge.filter((k: any) => k.source === 'bs7671_intelligence').length > 0
                  ? (installKnowledge
                      .filter((k: any) => k.source === 'bs7671_intelligence')
                      .reduce((s: number, k: any) => s + (k.hybrid_score || 0), 0) / 
                      installKnowledge.filter((k: any) => k.source === 'bs7671_intelligence').length * 100)
                  : 0
              )
            }
          }
        }
      }
    };

    // Phase 5: Store in cache for 1 hour
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query.substring(0, 500),
        agent_name: 'installer-v3',
        results: standardizedResponse,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        hit_count: 0
      });

    logger.info('Results cached', { queryHash, expiresIn: '1 hour' });

    return new Response(
      JSON.stringify(standardizedResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    timings.total = Date.now() - timings.start;
    
    logger.error('Installer V3 error', { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      performanceMs: timings.total
    });
    
    const isTimeout = error instanceof Error && error.message.includes('timeout');
    
    // User-friendly error messages based on error type
    const userMessage = isTimeout
      ? "Request took too long - please try again with a simpler query."
      : error instanceof Error && error.message.includes('embedding')
      ? "I'm having trouble processing your query right now. Could you try rephrasing it?"
      : error instanceof Error && error.message.includes('cache')
      ? "Temporary storage issue - your request will still be processed, just might take a bit longer."
      : error instanceof Error && error.message.includes('API')
      ? "AI service temporarily unavailable. Please try again in a moment."
      : "Something went wrong on my end. The technical team has been notified. Please try again.";
    
    return new Response(
      JSON.stringify({
        success: false,
        error: userMessage,
        technicalError: error instanceof Error ? error.message : String(error),
        requestId,
        metadata: {
          generationTimeMs: timings.total,
          stepCount: 0,
          totalEstimatedTime: 'Unknown',
          difficultyLevel: 'Unknown',
          timedOut: isTimeout
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: isTimeout ? 408 : 500 
      }
    );
  }
  })();

  // Race between execution and timeout
  try {
    return await Promise.race([executionPromise, timeoutPromise]);
  } catch (error) {
    logger.error('Edge function timeout', { error });
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Edge function timeout after 350s',
        metadata: {
          generationTimeMs: 350000,
          stepCount: 0,
          totalEstimatedTime: 'Unknown',
          difficultyLevel: 'Unknown',
          timedOut: true
        }
      }),
      {
        status: 408,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
