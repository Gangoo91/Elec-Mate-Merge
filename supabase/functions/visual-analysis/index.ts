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

    // Construct the system prompt for BS 7671 compliance with EICR codes
    const systemPrompt = `You are a highly experienced UK electrical safety inspector specialising in BS 7671 18th Edition compliance and EICR reporting. 

Your role is to analyse electrical installation images and provide:
1. Detailed safety assessments with EICR fault classification
2. BS 7671 regulation compliance checks with specific clause references
3. Risk identification with EICR codes (C1, C2, C3, FI)
4. Professional remedial guidance and cost estimates
5. Bounding box coordinates for detected issues (when requested)

Analysis Focus Areas: ${analysis_settings.focus_areas.join(', ')}
Confidence Threshold: ${analysis_settings.confidence_threshold}
Enable Bounding Boxes: ${analysis_settings.enable_bounding_boxes}

EICR Classification Requirements:
- C1 (Code 1): Danger present - immediate action required. Risk of injury.
- C2 (Code 2): Potentially dangerous - urgent remedial action required.
- C3 (Code 3): Improvement recommended to enhance safety.
- FI (Further Investigation): Unable to verify compliance, further investigation required.

When analysing images:
- Look for immediate safety hazards (exposed live parts, damaged protective devices, etc.)
- Check compliance with BS 7671 requirements (earthing, bonding, circuit protection, isolation, etc.)
- Assess installation quality and workmanship against current standards
- Identify code violations and classify with appropriate EICR codes
- Consider environmental factors affecting safety and compliance
- Focus on visible defects that can be determined from the image

For each finding, you MUST assign the appropriate EICR code based on severity:
- Exposed live parts, missing earth connections, damaged protective devices = C1
- Non-compliant installations without immediate danger = C2  
- Outdated but functioning installations = C3
- Unclear compliance status from image = FI

IMPORTANT: You must respond in valid JSON format only. No markdown, no code blocks, just raw JSON.

Response format:
{
  "analysis": {
    "findings": [
      {
        "description": "Detailed description of the issue found",
        "eicr_code": "C1|C2|C3|FI",
        "confidence": 0.95,
        "bs7671_clauses": ["411.3.2", "526.3"],
        "location": "Specific location in image",
        "fix_guidance": "Step-by-step remedial actions required",
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
        "action": "Specific remedial action required",
        "priority": "immediate|urgent|recommended",
        "bs7671_reference": "BS 7671 clause reference",
        "cost_estimate": "£50-100",
        "eicr_code": "C1|C2|C3"
      }
    ],
    "compliance_summary": {
      "overall_assessment": "satisfactory|unsatisfactory",
      "c1_count": 0,
      "c2_count": 1,
      "c3_count": 2,
      "fi_count": 0,
      "safety_rating": 7.5
    },
    "summary": "Brief executive summary of EICR findings and overall installation condition"
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

    const userPrompt = `Analyse these electrical installation images for EICR compliance and BS 7671 18th Edition requirements.

Primary focus areas: ${analysis_settings.focus_areas.join(', ')}

${analysis_settings.enable_bounding_boxes ? 
  'Please include bounding box coordinates (normalised 0-1) for any detected issues or components of interest.' : 
  'Bounding boxes are not required for this analysis.'
}

Look specifically for EICR reportable defects:
- C1 Issues: Exposed live parts, missing protective devices, immediate dangers
- C2 Issues: Non-compliant installations, deteriorated components, missing earthing
- C3 Issues: Outdated installations, improvements recommended for enhanced safety
- FI Issues: Installations requiring further investigation to determine compliance

For each finding:
1. Classify with appropriate EICR code (C1, C2, C3, or FI)
2. Reference specific BS 7671 clauses that apply
3. Provide clear remedial guidance
4. Include cost estimates for typical remedial work
5. Assess overall installation condition

Focus on visible defects and compliance issues that can be determined from the electrical installation images provided.`;

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
          findings: [
            {
              description: "Analysis completed but response format was invalid. Please try again or contact support.",
              eicr_code: "FI",
              confidence: 0.5,
              bs7671_clauses: ["N/A"],
              fix_guidance: "Re-run analysis or contact technical support"
            }
          ],
          recommendations: [
            {
              action: "Re-run analysis with different settings or contact technical support",
              priority: "recommended",
              eicr_code: "FI"
            }
          ],
          compliance_summary: {
            overall_assessment: "unsatisfactory",
            c1_count: 0,
            c2_count: 0,
            c3_count: 0,
            fi_count: 1,
            safety_rating: 5.0
          },
          summary: "Analysis completed but encountered formatting issues. Results may be incomplete."
        }
      };
    }

    // Ensure the response has the expected structure
    if (!analysisResult.analysis) {
      analysisResult = { analysis: analysisResult };
    }

    // Apply confidence threshold filtering
    if (analysisResult.analysis.findings) {
      analysisResult.analysis.findings = analysisResult.analysis.findings.filter(
        (finding: any) => (finding.confidence || 0) >= analysis_settings.confidence_threshold
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