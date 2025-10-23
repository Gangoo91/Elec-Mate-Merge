import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

// Risk scoring constants
const AGE_RISK_WEIGHTS = { 0: 0, 5: 5, 10: 15, 15: 25, 20: 30 };
const ENV_RISK_WEIGHTS = { indoor: 0, outdoor: 10, damp: 15, corrosive: 20 };
const CRIT_RISK_WEIGHTS = { low: 0, medium: 10, high: 15 };

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      equipmentDescription, 
      equipmentType, 
      location, 
      ageYears,
      buildingType,
      environment,
      criticality,
      manufacturer,
      modelNumber,
      lastInspectionDate,
      currentIssues,
      clientName,
      siteAddress,
      assessorName,
      companyName
    } = await req.json();

    if (!equipmentDescription || !equipmentType || !location) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('🔧 Generating comprehensive maintenance plan for:', equipmentType, buildingType || '');

    // Step 1: Generate embedding for comprehensive search
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: `${equipmentType} ${buildingType || ''} ${environment || ''}: ${equipmentDescription}`,
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to generate embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Step 2: Execute parallel knowledge retrieval (4 searches)
    const [maintenanceKnowledge, bs7671Regs, failureModes, pricingData] = await Promise.all([
      // 2a. Maintenance procedures & schedules
      supabase.rpc('search_maintenance_hybrid', {
        query_text: `${equipmentType} ${buildingType || ''} maintenance schedule intervals procedures GN3 inspection testing`,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType || null,
        match_count: 12
      }),
      
      // 2b. BS 7671 regulations
      supabase.rpc('search_bs7671_hybrid_cached', {
        query_text: `${equipmentType} periodic inspection testing maintenance requirements ${buildingType || ''} installation`,
        query_embedding: queryEmbedding,
        match_count: 10
      }),
      
      // 2c. Common failures & defects
      supabase.rpc('search_maintenance_hybrid', {
        query_text: `${equipmentType} common failures defects problems wear degradation age ${ageYears} years ${environment || ''}`,
        query_embedding: queryEmbedding,
        equipment_filter: equipmentType || null,
        match_count: 8
      }),
      
      // 2d. Parts & pricing (may not have data for all equipment)
      supabase.rpc('search_pricing', {
        query_text: `${equipmentType} replacement parts maintenance materials components`,
        query_embedding: queryEmbedding,
        category_filter: null,
        match_threshold: 0.6,
        match_count: 10
      })
    ]);

    console.log(`📚 Knowledge retrieved - Maintenance: ${maintenanceKnowledge.data?.length || 0}, Regulations: ${bs7671Regs.data?.length || 0}, Failures: ${failureModes.data?.length || 0}, Parts: ${pricingData?.data?.length || 0}`);

    // Step 3: Build comprehensive expert knowledge context (NEVER exposed to user)
    const expertKnowledge = `
=== EXPERT KNOWLEDGE BASE ===

MAINTENANCE PROCEDURES & SCHEDULES:
${maintenanceKnowledge.data?.map((item: any) => 
  `• ${item.topic}: ${item.content}`
).join('\n') || 'Standard industry practices apply'}

BS 7671:2018+A3:2024 REGULATIONS:
${bs7671Regs.data?.map((reg: any) => 
  `• Regulation ${reg.regulation_number} (${reg.section}): ${reg.content.substring(0, 400)}...`
).join('\n') || 'General electrical safety requirements apply'}

COMMON FAILURE MODES & PREVENTIVE MEASURES:
${failureModes.data?.map((item: any) => 
  `• ${item.topic}: ${item.content}`
).join('\n') || 'Age-related wear and environmental factors'}

REPLACEMENT PARTS & COST ESTIMATES:
${pricingData?.data?.map((item: any) => 
  `• ${item.item_name}: £${item.base_cost} (${item.wholesaler}) - ${item.in_stock ? 'Available' : 'Order required'}`
).join('\n') || 'Standard electrical components and materials'}
`;

    // Step 4: Calculate risk score (0-100)
    const riskScore = calculateRiskScore({
      ageYears: ageYears || 0,
      environment: environment || 'indoor',
      criticality: criticality || 'medium',
      currentIssues: currentIssues || '',
      lastInspectionDate
    });

    const riskLevel = riskScore >= 75 ? 'critical' : riskScore >= 50 ? 'high' : riskScore >= 25 ? 'medium' : 'low';

    console.log(`⚠️ Risk Assessment - Score: ${riskScore}/100, Level: ${riskLevel}`);

    // Step 5: Generate comprehensive maintenance plan with AI
    const systemPrompt = `You are a highly experienced UK electrical maintenance planning expert with 20+ years of field experience. You have deep expertise in:
- BS 7671:2018+A3:2024 (18th Edition Wiring Regulations)
- GN3 (Guidance Note 3: Inspection & Testing)  
- IET Codes of Practice
- Manufacturer maintenance schedules
- Real-world failure mode analysis
- UK electrical industry best practices

Based on the detailed technical knowledge provided below, generate a comprehensive, professional maintenance plan that demonstrates expert-level understanding.

CRITICAL INSTRUCTIONS:
- Present ALL information as your own expert knowledge and professional experience
- NEVER reference "sources", "databases", "retrieved information", "knowledge base", or "RAG"
- Write as if you personally know these regulations and practices from decades of hands-on work
- Use authoritative language: "Based on BS 7671 Regulation X..." not "According to retrieved data..."
- Show regulation citations as professional references, not search results
- All cost estimates should be presented as "industry standard estimates" based on your experience

${expertKnowledge}

Return ONLY a valid JSON object (no markdown, no code blocks) with this EXACT structure:
{
  "equipmentType": "string",
  "location": "string",
  "ageYears": number,
  "buildingType": "string",
  "riskScore": ${riskScore},
  "riskLevel": "${riskLevel}",
  "riskFactors": ["string array of plain English risk explanations"],
  "complianceStatus": "compliant" | "attention-needed" | "non-compliant",
  "complianceWarnings": ["string array of compliance issues if any"],
  "nextEICRDue": "ISO date string (calculate based on ${buildingType || 'commercial'})",
  "schedule": [
    {
      "interval": "Monthly | 6 Months | 1 Year | 3 Years | 5 Years",
      "task": "Specific detailed task description",
      "regulation": "BS 7671:2018+A3:2024 Regulation X.X.X or GN3 Section X",
      "priority": "high" | "medium" | "low",
      "estimatedDurationMinutes": number,
      "estimatedCost": { "min": number, "max": number },
      "requiredQualifications": ["e.g., '18th Edition', 'Inspection & Testing Level 3'"],
      "toolsRequired": ["e.g., 'Multifunction tester', 'Insulation resistance meter'"],
      "procedure": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
      "safetyPrecautions": ["Warning 1", "PPE requirement 2"],
      "recordKeeping": "What to document for this task",
      "nextDue": "ISO date (calculate from today + interval)",
      "taskCategory": "inspection" | "testing" | "maintenance" | "replacement"
    }
  ],
  "annualCostEstimate": { "min": number, "max": number },
  "totalEstimatedHours": number,
  "commonFailureModes": [
    {
      "failure": "Description of common failure",
      "probability": number (0-100%),
      "earlyWarnings": ["Sign 1 to watch for", "Symptom 2"],
      "preventiveMeasures": ["Action 1", "Action 2"]
    }
  ],
  "replacementTimeline": [
    {
      "component": "Component name",
      "estimatedYear": number (current year + X),
      "reason": "Why replacement needed",
      "estimatedCost": { "min": number, "max": number }
    }
  ],
  "recommendedParts": [
    {
      "part": "Part description",
      "quantity": number,
      "estimatedCost": number,
      "purpose": "Why this part is needed"
    }
  ],
  "upgradeRecommendations": [
    {
      "upgrade": "Upgrade description",
      "cost": { "min": number, "max": number },
      "benefit": "Why upgrade is beneficial",
      "regulation": "BS 7671 reference if applicable",
      "priority": "high" | "medium" | "low"
    }
  ],
  "regulations": [
    {
      "regulationNumber": "BS 7671:2018+A3:2024 Reg XXX.X.X",
      "section": "Part/Chapter name",
      "title": "Regulation title",
      "excerpt": "Key requirement (50-100 words)",
      "whyApplies": "Plain English explanation of relevance to this installation",
      "consequence": "What happens if requirement not met",
      "relatedRegs": ["Reg XXX.X.X", "Reg YYY.Y.Y"]
    }
  ],
  "complianceChecklist": [
    {
      "requirement": "Specific compliance requirement",
      "regulation": "BS 7671 Reg XXX.X.X",
      "status": "compliant" | "unknown" | "non-compliant",
      "action": "Required action if non-compliant"
    }
  ],
  "recommendations": ["General recommendation 1", "Best practice 2"]
}`;

    const userPrompt = `Generate a comprehensive maintenance plan for:

EQUIPMENT DETAILS:
- Type: ${equipmentType}
- Description: ${equipmentDescription}
- Manufacturer: ${manufacturer || 'Not specified'}
- Model: ${modelNumber || 'Not specified'}
- Age: ${ageYears || 'Unknown'} years
- Location: ${location}

INSTALLATION CONTEXT:
- Building Type: ${buildingType || 'Not specified'}
- Environment: ${environment || 'Indoor'}
- Criticality: ${criticality || 'Medium'}
- Current Issues: ${currentIssues || 'None reported'}
- Last Inspection: ${lastInspectionDate || 'Unknown'}

CLIENT INFORMATION:
- Client: ${clientName || 'Not specified'}
- Site Address: ${siteAddress || location}
- Assessed By: ${assessorName || 'Professional Engineer'}
- Company: ${companyName || 'Independent Assessment'}

REQUIRED OUTPUT:
Generate a detailed, field-ready maintenance plan including:

1. COMPREHENSIVE TASK SCHEDULE:
   - Routine visual inspections (monthly/quarterly)
   - Periodic testing per GN3 intervals
   - Component-specific maintenance procedures
   - Emergency/safety-critical checks
   - Each task MUST include: step-by-step procedure, tools required, safety precautions, qualifications needed, duration, cost estimate

2. RISK ASSESSMENT:
   - Identify specific risk factors for this ${ageYears || 'aged'} year old ${equipmentType}
   - Current risk level already calculated as: ${riskLevel} (${riskScore}/100)
   - Provide actionable risk mitigation steps

3. PREDICTIVE MAINTENANCE:
   - Common failure modes for this equipment type in ${environment || 'indoor'} ${buildingType || 'installation'}
   - Early warning signs to monitor
   - Component replacement timeline (when will parts likely need replacing?)
   - Preventive measures to extend lifespan

4. COMPLIANCE REQUIREMENTS:
   - Specific BS 7671:2018+A3:2024 regulations that apply
   - GN3 testing requirements and intervals
   - EICR scheduling (next inspection due date)
   - Compliance checklist items

5. COST PLANNING:
   - Annual maintenance cost estimate (labour + materials)
   - Recommended spare parts to stock
   - Upgrade opportunities with ROI
   - Total annual hours required

6. PROFESSIONAL DOCUMENTATION:
   - All regulation citations with excerpts and explanations
   - Record-keeping requirements for each task
   - Next due dates calculated from today (${new Date().toISOString().split('T')[0]})

CRITICAL: Base all recommendations on your extensive professional experience and the regulations you know intimately. Never mention information retrieval or data sources.`;

    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 4000, // Increased for comprehensive output
      }),
    });

    if (!completionResponse.ok) {
      const errorText = await completionResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error('Failed to generate maintenance schedule');
    }

    const completionData = await completionResponse.json();
    const rawResponse = completionData.choices[0].message.content.trim();
    
    // Clean response (remove markdown if present)
    const cleanedResponse = rawResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const schedule = JSON.parse(cleanedResponse);

    // Sanitize response - REMOVE ALL RAG REFERENCES
    delete schedule.ragSources;
    delete schedule.knowledgeBase;
    delete schedule.retrievedData;
    delete schedule.similarityScores;

    console.log(`✅ Comprehensive maintenance plan generated - ${schedule.schedule?.length || 0} tasks, Risk: ${riskLevel}, Compliance: ${schedule.complianceStatus || 'pending'}`);

    return new Response(
      JSON.stringify({
        success: true,
        schedule,
        metadata: {
          generatedAt: new Date().toISOString(),
          equipmentType,
          riskLevel,
          totalTasks: schedule.schedule?.length || 0
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Maintenance plan generation failed:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate maintenance plan'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Risk scoring algorithm
function calculateRiskScore(params: {
  ageYears: number;
  environment: string;
  criticality: string;
  currentIssues: string;
  lastInspectionDate?: string;
}): number {
  let score = 0;
  
  // Age factor (0-30 points)
  if (params.ageYears >= 20) score += 30;
  else if (params.ageYears >= 15) score += 25;
  else if (params.ageYears >= 10) score += 15;
  else if (params.ageYears >= 5) score += 5;
  
  // Environment factor (0-20 points)
  const envLower = params.environment.toLowerCase();
  if (envLower.includes('corrosive') || envLower.includes('chemical')) score += 20;
  else if (envLower.includes('damp') || envLower.includes('wet') || envLower.includes('humid')) score += 15;
  else if (envLower.includes('outdoor') || envLower.includes('external')) score += 10;
  else if (envLower.includes('dusty') || envLower.includes('dirty')) score += 8;
  
  // Criticality factor (0-15 points)
  const critLower = params.criticality.toLowerCase();
  if (critLower.includes('high') || critLower.includes('critical') || critLower.includes('life-safety')) score += 15;
  else if (critLower.includes('medium')) score += 10;
  else if (critLower.includes('low')) score += 0;
  
  // Current issues factor (0-20 points)
  if (params.currentIssues && params.currentIssues.length > 10) {
    const issuesLower = params.currentIssues.toLowerCase();
    if (issuesLower.includes('fail') || issuesLower.includes('broken') || issuesLower.includes('fault')) score += 20;
    else if (issuesLower.includes('worn') || issuesLower.includes('degraded') || issuesLower.includes('damage')) score += 15;
    else if (issuesLower.includes('concern') || issuesLower.includes('issue') || issuesLower.includes('problem')) score += 10;
    else score += 5; // Any issues mentioned
  }
  
  // Inspection overdue factor (0-15 points)
  if (params.lastInspectionDate) {
    try {
      const lastInspection = new Date(params.lastInspectionDate);
      const monthsSince = (Date.now() - lastInspection.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsSince > 60) score += 15; // 5+ years overdue
      else if (monthsSince > 36) score += 10; // 3+ years overdue
      else if (monthsSince > 12) score += 5; // 1+ year overdue
    } catch {
      // Invalid date, assume unknown = moderate risk
      score += 8;
    }
  } else {
    // No inspection date = unknown history
    score += 8;
  }
  
  return Math.min(100, score); // Cap at 100
}
