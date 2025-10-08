import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Robust JSON parser that handles markdown-wrapped responses
const parseAIResponse = (content: string, context: string = 'AI response') => {
  if (!content || content.trim() === '') {
    throw new Error(`${context} is empty`);
  }

  try {
    return JSON.parse(content);
  } catch (e) {
    const patterns = [
      /```json\s*\n([\s\S]*?)\n```/,
      /```\s*\n([\s\S]*?)\n```/,
      /{[\s\S]*}/
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        try {
          const extracted = match[1] || match[0];
          return JSON.parse(extracted);
        } catch (parseError) {
          continue;
        }
      }
    }
    
    throw new Error(`Could not parse ${context} as JSON`);
  }
};

type AnalysisMode = 'fault_diagnosis' | 'component_identify' | 'wiring_instruction' | 'installation_verify';

interface AnalysisSettings {
  mode: AnalysisMode;
  confidence_threshold: number;
  enable_bounding_boxes: boolean;
  focus_areas: string[];
  remove_background: boolean;
  bs7671_compliance: boolean;
  fast_mode?: boolean;
}

interface AnalysisRequest {
  primary_image: string;
  additional_images?: string[];
  analysis_settings: AnalysisSettings;
}

// Timeout wrapper for fetch calls
const fetchWithTimeout = async (url: string, options: any, timeoutMs: number, signal?: AbortSignal) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: signal || controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { primary_image, additional_images = [], analysis_settings }: AnalysisRequest = await req.json();

    if (!lovableApiKey) {
      throw new Error('Lovable API key not configured');
    }

    if (!primary_image) {
      throw new Error('Primary image URL is required');
    }

    console.log(`⚡ Starting ${analysis_settings.fast_mode ? 'FAST' : 'FULL'} visual analysis`, {
      mode: analysis_settings.mode,
      images: 1 + additional_images.length
    });

    const getSystemPrompt = (mode: AnalysisMode, fast: boolean): string => {
      const baseContext = `You are a UK electrical expert specialising in BS 7671 18th Edition.`;
      const responseFormat = `Respond in valid JSON only. ${fast ? 'Be concise.' : ''}`;
      
      switch (mode) {
        case 'fault_diagnosis':
          return `${baseContext}
${responseFormat}

Analyse electrical installations for EICR compliance. Classify issues:
- C1: Immediate danger (exposed live parts, missing earth)
- C2: Potentially dangerous (non-compliant, deteriorated)
- C3: Improvement recommended
- FI: Further investigation needed

${fast ? 'Focus on critical findings only.' : 'Provide detailed analysis with BS 7671 references.'}

Response format:
{
  "analysis": {
    "findings": [{
      "description": "Issue description",
      "eicr_code": "C1|C2|C3|FI",
      "confidence": 0.95,
      "bs7671_clauses": ["411.3.2"],
      "fix_guidance": "Remedial action"
    }],
    "compliance_summary": {
      "overall_assessment": "satisfactory|unsatisfactory",
      "c1_count": 0,
      "c2_count": 0,
      "c3_count": 0,
      "fi_count": 0,
      "safety_rating": 7.5
    },
    "summary": "Brief summary"
  }
}`;

        case 'component_identify':
          return `${baseContext}
${responseFormat}

Identify electrical components and provide specifications:
- Component name/type
- Manufacturer/model (if visible)
- Technical specs (voltage, current, IP rating)
- BS 7671 requirements
${fast ? '' : '- UK market alternatives'}

Response format:
{
  "analysis": {
    "component": {
      "name": "Component name",
      "type": "Type",
      "specifications": {"voltage_rating": "230V", "current_rating": "32A"},
      "bs7671_requirements": ["411.3.2"],
      "confidence": 0.95
    },
    "summary": "Brief description"
  }
}`;

        case 'wiring_instruction':
          return `${baseContext}
${responseFormat}

Provide wiring instructions:
- Terminal identification (L, N, E)
- UK colour codes (Brown=Live, Blue=Neutral, Green/Yellow=Earth)
- Connection procedure (isolation first)
- Cable requirements
${fast ? '' : '- Testing procedures'}

Response format:
{
  "analysis": {
    "component_name": "Component",
    "wiring_steps": [{
      "step": 1,
      "instruction": "Isolate supply",
      "safety_critical": true
    }],
    "cable_requirements": {"minimum_size": "2.5mm²"},
    "summary": "Procedure overview"
  }
}`;

        case 'installation_verify':
          return `${baseContext}
${responseFormat}

Verify installation against BS 7671:
- Protective device selection
- Earthing/bonding
- Cable sizing
- Professional workmanship
${fast ? '' : '- Improvement recommendations'}

Response format:
{
  "analysis": {
    "overall_result": "pass|fail|requires_testing",
    "confidence": 0.85,
    "verification_checks": [{
      "check": "Device correctly rated",
      "result": "pass|fail",
      "bs7671_reference": "433.1.1"
    }],
    "summary": "Assessment summary"
  }
}`;
      }
    };

    const systemPrompt = getSystemPrompt(analysis_settings.mode, analysis_settings.fast_mode || false);

    // Prepare images
    const images = [{
      type: "image_url",
      image_url: {
        url: primary_image,
        detail: analysis_settings.fast_mode ? "low" : "high"
      }
    }];

    // Limit additional images in fast mode
    const imageLimit = analysis_settings.fast_mode ? 2 : additional_images.length;
    additional_images.slice(0, imageLimit).forEach(imageUrl => {
      images.push({
        type: "image_url",
        image_url: {
          url: imageUrl,
          detail: analysis_settings.fast_mode ? "low" : "medium"
        }
      });
    });

    const getUserPrompt = (mode: AnalysisMode, fast: boolean): string => {
      const focusAreas = analysis_settings.focus_areas?.join(', ') || 'general';
      
      switch (mode) {
        case 'fault_diagnosis':
          return `Analyse for EICR compliance. Focus: ${focusAreas}. ${fast ? 'Report critical issues only.' : 'Detailed analysis with BS 7671 references.'}`;
        case 'component_identify':
          return `Identify component(s) and provide ${fast ? 'basic' : 'detailed'} specifications.`;
        case 'wiring_instruction':
          return `Provide ${fast ? 'essential' : 'step-by-step'} wiring instructions for UK electricians.`;
        case 'installation_verify':
          return `Verify installation compliance. ${fast ? 'Pass/fail only.' : 'Detailed assessment with improvements.'}`;
      }
    };

    const userPrompt = getUserPrompt(analysis_settings.mode, analysis_settings.fast_mode || false);

    console.log(`🚀 Calling Lovable AI Gateway (gemini-2.5-flash)...`);

    const timeout = analysis_settings.fast_mode ? 12000 : 20000; // 12s fast, 20s full
    const maxTokens = analysis_settings.fast_mode ? 800 : 2000;

    const aiResponse = await fetchWithTimeout(
      'https://ai.gateway.lovable.dev/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                { type: "text", text: userPrompt },
                ...images
              ]
            }
          ],
          max_tokens: maxTokens,
          response_format: { type: "json_object" }
        }),
      },
      timeout
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('❌ AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({
          error: 'Rate limit exceeded',
          code: 429,
          message: 'Too many requests. Please wait a moment.'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({
          error: 'Payment required',
          code: 402,
          message: 'Credits depleted. Please top up your workspace.'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      throw new Error('Analysis failed');
    }

    const data = await aiResponse.json();
    const duration = Date.now() - startTime;
    console.log(`✅ Analysis complete in ${duration}ms`);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from AI Gateway');
    }

    let analysisResult;
    try {
      analysisResult = parseAIResponse(data.choices[0].message.content, 'Analysis');
      
      if (!analysisResult || typeof analysisResult !== 'object') {
        throw new Error('Invalid analysis result');
      }

      if (!analysisResult.analysis) {
        analysisResult = { analysis: analysisResult };
      }

      // Ensure findings array exists for fault_diagnosis
      if (analysis_settings.mode === 'fault_diagnosis') {
        if (!analysisResult.analysis.findings || !Array.isArray(analysisResult.analysis.findings)) {
          console.warn('No findings array, creating empty array');
          analysisResult.analysis.findings = [];
        }

        analysisResult.analysis.findings = analysisResult.analysis.findings.map((finding: any, index: number) => ({
          description: finding.description || `Finding ${index + 1}`,
          eicr_code: finding.eicr_code || finding.severity || 'FI',
          confidence: typeof finding.confidence === 'number' ? finding.confidence : 0.5,
          bs7671_clauses: finding.bs7671_clauses || finding.regulation_reference || ['N/A'],
          fix_guidance: finding.fix_guidance || finding.remedial_action || 'Consult qualified electrician',
          ...finding
        }));

        // Apply confidence threshold
        analysisResult.analysis.findings = analysisResult.analysis.findings.filter(
          (finding: any) => (finding.confidence || 0) >= analysis_settings.confidence_threshold
        );
      }

    } catch (parseError) {
      console.error('❌ Parse error:', parseError);
      
      analysisResult = {
        analysis: {
          findings: [{
            description: "Analysis completed but response format was invalid",
            eicr_code: "FI",
            confidence: 0.5,
            bs7671_clauses: ["N/A"],
            fix_guidance: "Re-run analysis"
          }],
          compliance_summary: {
            overall_assessment: "unsatisfactory",
            c1_count: 0,
            c2_count: 0,
            c3_count: 0,
            fi_count: 1,
            safety_rating: 5.0
          },
          summary: "Analysis encountered formatting issues"
        }
      };
    }

    if (!analysisResult.analysis) {
      analysisResult = { analysis: analysisResult };
    }

    analysisResult.analysis.processing_time_ms = duration;
    analysisResult.analysis.fast_mode = analysis_settings.fast_mode || false;

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);
    
    const errorResponse = {
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error.name === 'AbortError' ? 'TIMEOUT' : 'ERROR',
      message: error.name === 'AbortError' 
        ? 'Analysis timed out. Try fast mode or fewer images.'
        : 'Analysis failed. Please try again.'
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
