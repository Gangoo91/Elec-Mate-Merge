/**
 * Installation Method Agent Core Logic
 * STANDALONE TOOL VERSION (not used by circuit designer)
 * Uses ultra-fast practical work intelligence RAG
 */

import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

interface InstallationMethodRequest {
  query: string;
  projectDetails?: any;
  designerContext?: any;
}

export async function generateInstallationMethod(
  supabase: any,
  request: InstallationMethodRequest
) {
  const startTime = Date.now();
  
  console.log('🔧 Installation Method Agent START', {
    query: request.query,
    hasProjectDetails: !!request.projectDetails,
    hasDesignerContext: !!request.designerContext
  });

  // STEP 1: Extract keywords from query (50 keywords target)
  const keywords = extractInstallationKeywords(request.query, request.designerContext);
  console.log(`📝 Extracted ${keywords.length} keywords:`, keywords.slice(0, 10));

  // STEP 2: Ultra-fast parallel RAG search
  const ragStart = Date.now();
  const [practicalWorkResult, regulations] = await Promise.all([
    searchPracticalWorkIntelligence(supabase, {
      query: request.query,
      tradeFilter: 'installer',
      matchCount: 25
    }),
    searchRegulationsIntelligence(supabase, {
      keywords: Array.from(keywords),
      appliesTo: ['all installations', 'installation work'],
      categories: ['installation', 'testing', 'inspection', 'earthing', 'protection'],
      limit: 15
    })
  ]);

  const ragTime = Date.now() - ragStart;
  console.log(`⚡ RAG search complete in ${ragTime}ms:`, {
    practicalWorkHits: practicalWorkResult.results.length,
    regulationHits: regulations.length,
    practicalQuality: practicalWorkResult.qualityScore.toFixed(1)
  });

  // STEP 3: Call GPT-5 Mini for installation method generation
  const aiStart = Date.now();
  const installationMethod = await callInstallationMethodAI(
    request,
    {
      practicalWork: practicalWorkResult.results,
      regulations,
      keywords: Array.from(keywords)
    }
  );
  const aiTime = Date.now() - aiStart;

  const totalTime = Date.now() - startTime;
  console.log(`✅ Installation Method complete in ${totalTime}ms (RAG: ${ragTime}ms, AI: ${aiTime}ms)`);

  return {
    installationMethod,
    metadata: {
      totalTime,
      ragTime,
      aiTime,
      practicalWorkHits: practicalWorkResult.results.length,
      regulationHits: regulations.length,
      qualityScore: practicalWorkResult.qualityScore
    }
  };
}

function extractInstallationKeywords(query: string, designerContext?: any): Set<string> {
  const keywords = new Set<string>();
  
  // Base installation keywords
  const baseKeywords = [
    'installation', 'install', 'mounting', 'fixing', 'routing', 'cable',
    'termination', 'connection', 'testing', 'inspection', 'commissioning',
    'safety', 'protection', 'earthing', 'bonding', 'isolation', 'tools',
    'materials', 'procedure', 'method', 'sequence', 'step'
  ];
  
  baseKeywords.forEach(kw => keywords.add(kw));

  // Extract from query
  const queryWords = query.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
  
  queryWords.forEach(w => keywords.add(w));

  // Extract from designer context if available
  if (designerContext?.circuits) {
    designerContext.circuits.forEach((circuit: any) => {
      if (circuit.loadType) keywords.add(circuit.loadType.toLowerCase());
      if (circuit.location) keywords.add(circuit.location.toLowerCase());
      if (circuit.cableType) keywords.add(circuit.cableType.toLowerCase());
    });
  }

  // Add circuit-specific keywords
  const circuitKeywords = [
    'socket', 'lighting', 'cooker', 'shower', 'ev', 'charging',
    'domestic', 'commercial', 'industrial', 'consumer', 'unit',
    'distribution', 'board', 'mcb', 'rcd', 'rcbo'
  ];
  
  circuitKeywords.forEach(kw => {
    if (query.toLowerCase().includes(kw)) {
      keywords.add(kw);
    }
  });

  return keywords;
}

async function callInstallationMethodAI(
  request: InstallationMethodRequest,
  ragContext: any
) {
  const systemPrompt = `You are an expert Installation Method Specialist for electrical installations.

Generate a comprehensive, step-by-step installation method statement based on BS 7671:2018+A2:2024 and industry best practices.

KNOWLEDGE BASE PROVIDED:
- ${ragContext.practicalWork.length} practical work intelligence results
- ${ragContext.regulations.length} BS 7671 regulations
- Keywords: ${ragContext.keywords.slice(0, 15).join(', ')}

OUTPUT STRUCTURE:
{
  "installationGuide": "High-level overview paragraph",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "content": "Detailed step description",
      "safety": ["Safety point 1", "Safety point 2"],
      "toolsRequired": ["Tool 1", "Tool 2"],
      "materialsNeeded": ["Material 1", "Material 2"],
      "estimatedDuration": "15-30 minutes",
      "riskLevel": "low|medium|high",
      "inspectionCheckpoints": ["Check 1", "Check 2"]
    }
  ],
  "summary": {
    "totalSteps": 5,
    "estimatedDuration": "2-3 hours",
    "requiredQualifications": ["Qualification 1"],
    "toolsRequired": ["All tools needed"],
    "materialsRequired": ["All materials needed"],
    "overallRiskLevel": "medium"
  }
}

REQUIREMENTS:
- Cover FULL installation lifecycle: preparation → installation → testing → inspection
- Include specific BS 7671 regulation references
- Provide realistic time estimates
- List ALL tools and materials needed
- Highlight safety-critical steps
- Include inspection checkpoints per step
- Use metric measurements (mm, metres)
- UK spelling throughout`;

  const userPrompt = `Generate installation method for: ${request.query}

${request.projectDetails ? `
PROJECT DETAILS:
- Project: ${request.projectDetails.projectName || 'N/A'}
- Location: ${request.projectDetails.location || 'N/A'}
- Type: ${request.projectDetails.installationType || 'domestic'}
` : ''}

${request.designerContext ? `
DESIGNER CONTEXT:
${JSON.stringify(request.designerContext, null, 2)}
` : ''}

PRACTICAL WORK INTELLIGENCE:
${ragContext.practicalWork.slice(0, 15).map((pw: any, i: number) => 
  `${i + 1}. ${pw.activity_description || pw.task_name} (${pw.trade})`
).join('\n')}

RELEVANT REGULATIONS:
${ragContext.regulations.slice(0, 10).map((reg: any, i: number) =>
  `${i + 1}. ${reg.regulation_number}: ${reg.primary_topic}`
).join('\n')}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return JSON.parse(content);
}
