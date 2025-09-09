import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisSettings {
  confidence_threshold: number;
  enable_bounding_boxes: boolean;
  focus_areas: string[];
  remove_background: boolean;
  bs7671_compliance: boolean;
}

interface AnalysisRequest {
  primary_image: string;
  additional_images?: string[];
  analysis_settings: AnalysisSettings;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { primary_image, additional_images = [], analysis_settings }: AnalysisRequest = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!primary_image) {
      throw new Error('Primary image URL is required');
    }

    console.log('Starting visual analysis with settings:', analysis_settings);

    // Extract settings for easier access
    const { confidence_threshold: confidenceThreshold, focus_areas: focusAreas, bs7671_compliance } = analysis_settings;

    console.log('Sending request to OpenAI with GPT-5...');

    // Try primary analysis with GPT-5
    let analysisResult;
    try {
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-2025-08-07',
          max_completion_tokens: 3000,
          messages: [
            {
              role: 'system',
              content: `You are an expert electrical inspector specializing in BS 7671 18th Edition compliance analysis.

Analyze the electrical installation image for compliance issues and safety concerns.

Focus on these key areas based on the analysis settings:
${focusAreas.map(area => `- ${area.replace('_', ' ')}`).join('\n')}

CRITICAL INSTRUCTIONS:
- You must respond with valid JSON only. No markdown, no explanations outside the JSON structure.
- For classification: C1 = Danger present, C2 = Potentially dangerous, C3 = Improvement recommended, FI = Further investigation, Satisfactory = No issues
- Include specific BS 7671 regulation references where applicable
- Provide clear justification for your verdict
- Give actionable next steps

Required JSON structure:
{
  "detected_object": "brief description of main electrical component (e.g., 'Type B MCB in consumer unit', 'Socket outlet', 'RCD protection device')",
  "overall_compliance": "compliant" | "non_compliant" | "needs_attention",
  "compliance_summary": {
    "verdict": "detailed verdict explanation with specific issues found",
    "verdict_label": "C1" | "C2" | "C3" | "FI" | "Satisfactory",
    "justification": "specific technical reason for this classification with regulation reference"
  },
  "findings": [
    {
      "id": "finding_1",
      "severity": "high" | "medium" | "low",
      "category": "Safety" | "Compliance" | "Installation" | "Labelling" | "Protection",
      "description": "detailed technical description of the issue found",
      "regulation": "specific BS 7671 regulation number (e.g., 'Regulation 411.3.2', 'Section 514')",
      "justification": "technical explanation of why this violates BS 7671 and the safety implications",
      "next_steps": "specific remedial action required to resolve this issue",
      "location": "precise location in the image where this issue was identified"
    }
  ],
  "recommendations": ["actionable recommendations for improvement"],
  "confidence_score": 0.95
}`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this electrical installation image for BS 7671 compliance. Settings: confidence_threshold=${confidenceThreshold}, focus_areas=${focusAreas.join(', ')}, bs7671_compliance=${bs7671_compliance}`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: primary_image,
                    detail: 'high'
                  }
                }
              ]
            }
          ]
        })
      });

      if (!openAIResponse.ok) {
        throw new Error(`OpenAI API error: ${openAIResponse.status}`);
      }

      const result = await openAIResponse.json();
      console.log('GPT-5 analysis completed successfully', { model_used: 'gpt-5-2025-08-07' });
      
      const rawResponse = result.choices[0].message.content;
      console.log('Raw response length:', rawResponse?.length || 0);
      
      // Clean and parse the JSON response
      let cleanedResponse = rawResponse;
      if (rawResponse.includes('```json')) {
        cleanedResponse = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      cleanedResponse = cleanedResponse.trim();
      
      try {
        analysisResult = JSON.parse(cleanedResponse);
        console.log('Successfully parsed JSON response');
      } catch (parseError) {
        console.error('JSON parsing failed, attempting cleanup:', parseError);
        // Try to extract JSON from response
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
          console.log('Successfully parsed cleaned JSON');
        } else {
          throw new Error('Could not extract valid JSON from response');
        }
      }
      
    } catch (primaryError) {
      console.error('Primary analysis failed, trying fallback:', primaryError);
      
      // Fallback to GPT-4.1 with simpler prompt
      try {
        const fallbackResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4.1-2025-04-14',
            max_completion_tokens: 2000,
            temperature: 0.1,
            messages: [
              {
                role: 'system',
                content: `You are an electrical inspector. Analyze the image and respond with valid JSON only.

JSON format:
{
  "detected_object": "electrical component name",
  "overall_compliance": "compliant",
  "compliance_summary": {
    "verdict": "analysis summary",
    "verdict_label": "Satisfactory",
    "justification": "reason for verdict"
  },
  "findings": [],
  "recommendations": [],
  "confidence_score": 0.8
}`
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: 'Analyze this electrical installation for BS 7671 compliance. Respond with JSON only.'
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: primary_image,
                      detail: 'medium'
                    }
                  }
                ]
              }
            ]
          })
        });

        if (fallbackResponse.ok) {
          const fallbackResult = await fallbackResponse.json();
          const fallbackContent = fallbackResult.choices[0].message.content;
          analysisResult = JSON.parse(fallbackContent);
          console.log('Fallback analysis successful');
        } else {
          throw new Error('Fallback analysis also failed');
        }
      } catch (fallbackError) {
        console.error('Both primary and fallback failed:', fallbackError);
        // Return a structured error response
        analysisResult = {
          detected_object: "electrical installation",
          overall_compliance: "needs_attention",
          compliance_summary: {
            verdict: "Analysis temporarily unavailable due to technical issues. Please try again.",
            verdict_label: "FI",
            justification: "Technical analysis could not be completed"
          },
          findings: [],
          recommendations: ["Try uploading the image again", "Ensure image is clear and well-lit"],
          confidence_score: 0.1
        };
      }
    }

    // Validate and enrich the result
    if (!analysisResult.findings) analysisResult.findings = [];
    if (!analysisResult.recommendations) analysisResult.recommendations = [];
    if (!analysisResult.confidence_score) analysisResult.confidence_score = 0.7;

    
    console.log('Analysis complete, returning results');
    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in visual-analysis function:', error);
    
    const errorResponse = {
      error: error instanceof Error ? error.message : 'Unknown error occurred during analysis',
      details: 'Please check your images and try again. If the problem persists, contact support.'
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});