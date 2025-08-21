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

    // Construct the system prompt for BS 7671 compliance
    const systemPrompt = `You are a highly experienced UK electrical safety inspector specialising in BS 7671 18th Edition compliance. 

Your role is to analyse electrical installation images and provide:
1. Detailed safety assessments
2. BS 7671 regulation compliance checks
3. Risk identification with severity ratings
4. Professional recommendations with cost estimates
5. Bounding box coordinates for detected issues (when requested)

Analysis Focus Areas: ${analysis_settings.focus_areas.join(', ')}
Confidence Threshold: ${analysis_settings.confidence_threshold}
Enable Bounding Boxes: ${analysis_settings.enable_bounding_boxes}

When analysing images:
- Look for immediate safety hazards (exposed conductors, damaged equipment, overheating, etc.)
- Check compliance with BS 7671 requirements (earthing, bonding, circuit protection, etc.)
- Assess installation quality and workmanship
- Identify code violations and non-compliant installations
- Consider environmental factors affecting safety

For severity ratings:
- CRITICAL: Immediate danger to life or property
- HIGH: Significant safety concern requiring urgent attention
- MEDIUM: Non-compliance that should be addressed soon
- LOW: Minor issues or improvements recommended

IMPORTANT: You must respond in valid JSON format only. No markdown, no code blocks, just raw JSON.

Response format:
{
  "analysis": {
    "issues": [
      {
        "description": "Detailed description of the issue",
        "severity": "critical|high|medium|low",
        "confidence": 0.95,
        "regulation": "BS 7671 section reference",
        "location": "Specific location in image",
        "bounding_box": {
          "x": 0.1,
          "y": 0.1,
          "width": 0.2,
          "height": 0.2,
          "confidence": 0.95,
          "label": "Issue type"
        }
      }
    ],
    "recommendations": [
      {
        "action": "Specific action to take",
        "priority": "high|medium|low",
        "regulation": "BS 7671 reference",
        "cost_estimate": "£50-100"
      }
    ],
    "regulations": [
      {
        "clause": "BS 7671 Section 411.3.2",
        "description": "Requirement description",
        "compliance_status": "compliant|non_compliant|requires_inspection"
      }
    ],
    "overall_safety_rating": 7.5,
    "summary": "Brief executive summary of findings",
    "bounding_boxes": [...]
  }
}`;

    // Prepare images for analysis
    const images = [
      {
        type: "image_url",
        image_url: {
          url: primary_image,
          detail: "high"
        }
      }
    ];

    // Add additional images if provided
    additional_images.forEach(imageUrl => {
      images.push({
        type: "image_url",
        image_url: {
          url: imageUrl,
          detail: "medium"
        }
      });
    });

    const userPrompt = `Analyse these electrical installation images for safety compliance and BS 7671 18th Edition requirements.

Primary focus areas: ${analysis_settings.focus_areas.join(', ')}

${analysis_settings.enable_bounding_boxes ? 
  'Please include bounding box coordinates (normalised 0-1) for any detected issues or components of interest.' : 
  'Bounding boxes are not required for this analysis.'
}

Look specifically for:
- Electrical safety hazards and code violations
- Component condition and installation quality
- Compliance with BS 7671 earthing and bonding requirements
- Circuit protection adequacy
- Environmental and accessibility concerns
- Labelling and identification compliance

Provide detailed, actionable recommendations with regulation references and cost estimates where appropriate.`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'o4-mini-2025-04-16',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: "text",
                text: userPrompt
              },
              ...images
            ]
          }
        ],
        max_completion_tokens: 4000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    let analysisResult;
    try {
      analysisResult = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', data.choices[0].message.content);
      
      // Fallback response structure
      analysisResult = {
        analysis: {
          issues: [
            {
              description: "Analysis completed but response format was invalid. Please try again or contact support.",
              severity: "medium",
              confidence: 0.5,
              regulation: "N/A"
            }
          ],
          recommendations: [
            {
              action: "Re-run analysis with different settings or contact technical support",
              priority: "low"
            }
          ],
          regulations: [],
          overall_safety_rating: 5.0,
          summary: "Analysis completed but encountered formatting issues. Results may be incomplete."
        }
      };
    }

    // Ensure the response has the expected structure
    if (!analysisResult.analysis) {
      analysisResult = { analysis: analysisResult };
    }

    // Apply confidence threshold filtering
    if (analysisResult.analysis.issues) {
      analysisResult.analysis.issues = analysisResult.analysis.issues.filter(
        (issue: any) => (issue.confidence || 0) >= analysis_settings.confidence_threshold
      );
    }

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