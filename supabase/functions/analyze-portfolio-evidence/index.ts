import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

/**
 * Portfolio Evidence AI Analyzer
 *
 * Analyzes uploaded portfolio evidence (images, documents) and suggests:
 * - KSB (Knowledge, Skills, Behaviours) mappings
 * - Assessment criteria codes
 * - Learning outcomes
 * - Relevant tags
 * - Quality assessment
 */

interface AnalyzeRequest {
  evidence_url: string;
  evidence_type: 'image' | 'document' | 'video';
  title?: string;
  description?: string;
  existing_tags?: string[];
}

interface KSBSuggestion {
  code: string;
  category: 'knowledge' | 'skill' | 'behaviour';
  description: string;
  confidence: number;
  reason: string;
}

interface TagSuggestion {
  tag: string;
  confidence: number;
  category: string;
}

interface AnalysisResult {
  ksb_suggestions: KSBSuggestion[];
  tag_suggestions: TagSuggestion[];
  assessment_criteria: Array<{ code: string; description: string; confidence: number }>;
  learning_outcomes: Array<{ code: string; description: string; confidence: number }>;
  quality_assessment: {
    score: number;
    feedback: string;
    improvements: string[];
  };
  detected_content: {
    description: string;
    electrical_elements: string[];
    work_type: string;
    location_type: string;
  };
  summary: string;
}

// Convert image URL to base64 for Gemini
const urlToInlineData = async (url: string): Promise<{ mimeType: string; data: string }> => {
  if (url.startsWith('data:image')) {
    const match = url.match(/data:(.*?);base64,(.+)/);
    if (!match) throw new Error('Invalid data URL format');
    const [, mimeType, base64Data] = match;
    return { mimeType, data: base64Data };
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${url}: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const arrayBuffer = await response.arrayBuffer();
  const base64Data = base64Encode(new Uint8Array(arrayBuffer));

  return { mimeType: contentType, data: base64Data };
};

const getSystemPrompt = () => `You are an expert UK electrical apprenticeship portfolio assessor.
Your role is to analyze evidence (photos, documents, videos) submitted by apprentices and suggest appropriate KSB mappings, tags, and assessment criteria.

ASSESSMENT CRITERIA MAPPING (from UK Electrical Installation Apprenticeship Standard):

PANEL BUILDING (PB):
- PB1: Select and install enclosures and mounting systems
- PB2: Install busbars and distribution systems
- PB3: Install circuit protection devices (MCBs, RCBOs, RCDs)
- PB4: Wire and terminate panel components
- PB5: Label and document panel installations

WIRING SYSTEMS (WS):
- WS1: Install cable containment systems (trunking, tray, conduit)
- WS2: Install cables in containment systems
- WS3: Install and terminate SWA cables
- WS4: Install wiring accessories (sockets, switches, FCUs)
- WS5: Install final circuits (ring, radial, lighting)

FAULT FINDING (FF):
- FF1: Identify symptoms and causes of faults
- FF2: Apply safe isolation procedures
- FF3: Use test instruments for fault finding
- FF4: Repair and rectify electrical faults
- FF5: Document faults and repairs

TESTING (TS):
- TS1: Conduct visual inspections
- TS2: Test continuity of protective conductors
- TS3: Test insulation resistance
- TS4: Verify polarity
- TS5: Measure earth fault loop impedance
- TS6: Test RCD operation
- TS7: Complete electrical certificates (EICR, EIC, Minor Works)

SAFE WORKING (SW):
- SW1: Conduct risk assessments
- SW2: Select and use appropriate PPE
- SW3: Work within permit systems
- SW4: Apply working at height procedures

EPA KNOWLEDGE (K):
- K1: Apply electrical principles (Ohm's law, power calculations)
- K2: Apply wiring regulations (BS 7671)
- K3: Apply installation design principles
- K4: Apply environmental awareness
- K5: Apply health and safety legislation

EPA BEHAVIOURS (B):
- B1: Communicate effectively with stakeholders
- B2: Demonstrate professional conduct
- B3: Work effectively in a team
- B4: Apply problem-solving skills
- B5: Demonstrate commitment to quality

TAG CATEGORIES:
- Work Type: practical, theory, workplace, college, assessment
- Skills: teamwork, problem-solving, documentation, presentation
- Other: research, innovation, leadership

QUALITY ASSESSMENT CRITERIA:
1. Evidence clarity and visibility
2. Relevance to claimed KSB
3. Level of detail shown
4. Professional presentation
5. Safety compliance visible

Analyze the provided evidence and return a JSON response with suggested mappings.
Be specific about WHY each mapping is appropriate based on what you observe.
Confidence scores should be 0-100 representing certainty of the mapping.`;

const getUserPrompt = (request: AnalyzeRequest) => {
  let prompt = `Analyze this portfolio evidence for an electrical apprentice.

Evidence Type: ${request.evidence_type}
${request.title ? `Title: ${request.title}` : ''}
${request.description ? `Description: ${request.description}` : ''}
${request.existing_tags?.length ? `Existing Tags: ${request.existing_tags.join(', ')}` : ''}

Provide your analysis in the following JSON format:
{
  "ksb_suggestions": [
    {
      "code": "WS4",
      "category": "skill",
      "description": "Install wiring accessories",
      "confidence": 85,
      "reason": "Photo shows socket outlet installation with correct cable termination"
    }
  ],
  "tag_suggestions": [
    {
      "tag": "practical",
      "confidence": 95,
      "category": "work_type"
    }
  ],
  "assessment_criteria": [
    {
      "code": "AC2.3",
      "description": "Install wiring accessories correctly",
      "confidence": 80
    }
  ],
  "learning_outcomes": [
    {
      "code": "LO2",
      "description": "Install electrical wiring systems",
      "confidence": 85
    }
  ],
  "quality_assessment": {
    "score": 75,
    "feedback": "Clear photo showing good workmanship. Consider including wider context.",
    "improvements": ["Add annotation showing cable entry method", "Include close-up of terminal connections"]
  },
  "detected_content": {
    "description": "Photo of double socket outlet installation in plasterboard wall",
    "electrical_elements": ["double socket outlet", "twin and earth cable", "back box"],
    "work_type": "domestic installation",
    "location_type": "residential property"
  },
  "summary": "Good evidence of socket installation skill. Maps well to WS4 and B5."
}

Be thorough but only suggest mappings where you have reasonable confidence (>50%).
Return ONLY valid JSON, no markdown code blocks.`;

  return prompt;
};

serve(async (req) => {
  console.log('📁 Portfolio Evidence Analyzer | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const request: AnalyzeRequest = await req.json();

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    if (!request.evidence_url) {
      throw new Error('Evidence URL is required');
    }

    console.log(`⚡ Analyzing portfolio evidence`, {
      type: request.evidence_type,
      title: request.title,
      timestamp: new Date().toISOString()
    });

    const systemPrompt = getSystemPrompt();
    const userPrompt = getUserPrompt(request);

    // Build request parts
    const parts: any[] = [{ text: systemPrompt + '\n\n' + userPrompt }];

    // Add image if applicable
    if (request.evidence_type === 'image') {
      try {
        const inlineData = await urlToInlineData(request.evidence_url);
        parts.push({ inlineData });
        console.log('🖼️ Image converted for analysis');
      } catch (imgError) {
        console.error('⚠️ Could not load image, proceeding with text-only analysis:', imgError);
      }
    }

    const geminiContents = [{ role: 'user', parts }];

    const aiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 3000,
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('❌ Gemini API error:', aiResponse.status, errorText);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const data = await aiResponse.json();
    const duration = Date.now() - startTime;
    console.log(`✅ Analysis complete in ${duration}ms`);

    // Extract response text
    const candidate = data.candidates?.[0];
    const textPart = candidate?.content?.parts?.find((p: any) => typeof p.text === 'string');
    const text = textPart?.text;

    if (!text) {
      console.error('❌ No text in response');
      throw new Error('AI returned empty response');
    }

    // Parse JSON response
    let analysisResult: AnalysisResult;
    try {
      analysisResult = JSON.parse(text);
    } catch (parseError) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```json\s*\n?([\s\S]*?)\n?```/) || text.match(/({[\s\S]*})/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[1]);
      } else {
        throw parseError;
      }
    }

    // Validate and normalize response
    const normalizedResult: AnalysisResult = {
      ksb_suggestions: (analysisResult.ksb_suggestions || []).map(ksb => ({
        code: ksb.code || 'UNKNOWN',
        category: ksb.category || 'skill',
        description: ksb.description || '',
        confidence: Math.min(100, Math.max(0, ksb.confidence || 0)),
        reason: ksb.reason || ''
      })).filter(ksb => ksb.confidence >= 50),

      tag_suggestions: (analysisResult.tag_suggestions || []).map(tag => ({
        tag: tag.tag || '',
        confidence: Math.min(100, Math.max(0, tag.confidence || 0)),
        category: tag.category || 'general'
      })).filter(tag => tag.confidence >= 50),

      assessment_criteria: (analysisResult.assessment_criteria || []).map(ac => ({
        code: ac.code || '',
        description: ac.description || '',
        confidence: Math.min(100, Math.max(0, ac.confidence || 0))
      })).filter(ac => ac.confidence >= 50),

      learning_outcomes: (analysisResult.learning_outcomes || []).map(lo => ({
        code: lo.code || '',
        description: lo.description || '',
        confidence: Math.min(100, Math.max(0, lo.confidence || 0))
      })).filter(lo => lo.confidence >= 50),

      quality_assessment: {
        score: Math.min(100, Math.max(0, analysisResult.quality_assessment?.score || 70)),
        feedback: analysisResult.quality_assessment?.feedback || 'Evidence analyzed successfully.',
        improvements: analysisResult.quality_assessment?.improvements || []
      },

      detected_content: {
        description: analysisResult.detected_content?.description || 'Evidence analyzed',
        electrical_elements: analysisResult.detected_content?.electrical_elements || [],
        work_type: analysisResult.detected_content?.work_type || 'general electrical work',
        location_type: analysisResult.detected_content?.location_type || 'unknown'
      },

      summary: analysisResult.summary || 'Evidence analysis complete.'
    };

    return new Response(JSON.stringify({
      success: true,
      analysis: normalizedResult,
      processing_time_ms: duration
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      processing_time_ms: duration
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
