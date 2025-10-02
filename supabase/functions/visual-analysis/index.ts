import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type AnalysisMode = 'fault_diagnosis' | 'component_identify' | 'wiring_instruction' | 'installation_verify';

interface AnalysisSettings {
  mode: AnalysisMode;
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

    // Get mode-specific system prompt
    const getSystemPrompt = (mode: AnalysisMode): string => {
      const baseContext = `You are a highly experienced UK electrical expert specialising in BS 7671 18th Edition.`;
      
      switch (mode) {
        case 'component_identify':
          return `${baseContext}

Your role is to identify electrical components and provide comprehensive specifications:
1. Component name and type (precise terminology)
2. Manufacturer and model number (if visible)
3. Technical specifications (voltage, current, IP rating, breaking capacity, etc.)
4. BS 7671 compliance requirements for this component type
5. Typical applications and installation context
6. UK market availability and similar alternatives

IMPORTANT: You must respond in valid JSON format only. No markdown, no code blocks, just raw JSON.

Response format:
{
  "analysis": {
    "component": {
      "name": "Component name",
      "type": "Component type",
      "manufacturer": "Manufacturer name or Unknown",
      "model": "Model number or Unknown",
      "specifications": {
        "voltage_rating": "230V AC",
        "current_rating": "32A",
        "ip_rating": "IP20",
        "breaking_capacity": "6kA",
        "poles": "Single pole"
      },
      "bs7671_requirements": ["411.3.2 - RCD protection required", "526.3 - Correct cable sizing"],
      "typical_applications": ["Domestic consumer units", "Light commercial"],
      "installation_notes": "Must be installed by qualified electrician",
      "confidence": 0.95
    },
    "similar_components": [
      {
        "name": "Alternative component",
        "manufacturer": "Manufacturer",
        "notes": "Suitable replacement"
      }
    ],
    "summary": "Brief description of the component and its purpose"
  }
}`;

        case 'wiring_instruction':
          return `${baseContext}

Your role is to provide clear, step-by-step wiring instructions for electrical components:
1. Terminal identification (L, N, E and any additional terminals)
2. UK-standard colour codes (Brown=Live, Blue=Neutral, Green/Yellow=Earth)
3. Step-by-step connection procedure
4. Cable specification requirements (size, type, insulation)
5. Safety precautions and isolation requirements
6. Testing and verification steps
7. BS 7671 compliance requirements

IMPORTANT: You must respond in valid JSON format only. No markdown, no code blocks, just raw JSON.

Response format:
{
  "analysis": {
    "component_name": "Component being wired",
    "terminals": [
      {
        "label": "L1",
        "description": "Live terminal 1",
        "wire_colour": "Brown",
        "position": "Top left"
      }
    ],
    "wiring_steps": [
      {
        "step": 1,
        "title": "Safe isolation",
        "instruction": "Isolate supply and verify dead using approved voltage tester",
        "safety_critical": true,
        "bs7671_reference": "537.2"
      }
    ],
    "cable_requirements": {
      "minimum_size": "2.5mm²",
      "cable_type": "Twin and Earth (6242Y)",
      "insulation": "PVC 70°C"
    },
    "safety_warnings": ["Always isolate before working", "Use correct PPE"],
    "testing_required": ["Continuity test", "Insulation resistance test", "Polarity check"],
    "bs7671_compliance": ["411.3.2", "526.3"],
    "summary": "Brief overview of the wiring procedure"
  }
}`;

        case 'installation_verify':
          return `${baseContext}

Your role is to verify electrical installations against BS 7671 requirements:
1. Visual inspection checklist (workmanship, accessibility, labelling)
2. Compliance with BS 7671 regulations
3. Safety assessment (protective devices, earthing, bonding)
4. Installation quality and professional standards
5. Pass/Fail determination with detailed reasoning
6. Improvement recommendations even if passing

IMPORTANT: You must respond in valid JSON format only. No markdown, no code blocks, just raw JSON.

Response format:
{
  "analysis": {
    "overall_result": "pass|fail|requires_testing",
    "confidence": 0.85,
    "verification_checks": [
      {
        "check": "Protective device correctly rated",
        "result": "pass|fail|unable_to_verify",
        "details": "16A MCB appropriate for 2.5mm² cable",
        "bs7671_reference": "433.1.1"
      }
    ],
    "safety_assessment": {
      "rating": 8.5,
      "immediate_concerns": [],
      "observations": ["Good labelling", "Neat installation"]
    },
    "improvements": [
      {
        "recommendation": "Add arc fault protection",
        "priority": "recommended",
        "bs7671_reference": "421.1.7",
        "benefit": "Enhanced fire protection"
      }
    ],
    "summary": "Overall assessment of the installation quality and compliance"
  }
}`;

        case 'fault_diagnosis':
        default:
          return `${baseContext}

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
      }
    };

    const systemPrompt = getSystemPrompt(analysis_settings.mode);

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

    const getUserPrompt = (mode: AnalysisMode): string => {
      switch (mode) {
        case 'component_identify':
          return `Identify the electrical component(s) in this image and provide comprehensive specifications.

Focus on:
- Exact component name and type
- Manufacturer and model (read any visible text/labels)
- Technical specifications visible or typical for this component type
- BS 7671 requirements applicable to this component
- Typical UK applications and installation contexts

Provide detailed, accurate information based on what's visible in the image.`;

        case 'wiring_instruction':
          return `Provide detailed wiring instructions for the electrical component shown in this image.

Include:
- Clear terminal identification (label each terminal: L, N, E, etc.)
- UK-standard wire colours (Brown, Blue, Green/Yellow)
- Step-by-step connection procedure (safe isolation first)
- Cable size and type requirements
- Safety precautions and PPE requirements
- Testing procedures after installation
- Relevant BS 7671 regulations

Make instructions clear enough for a qualified electrician to follow safely.`;

        case 'installation_verify':
          return `Verify this electrical installation against BS 7671 18th Edition requirements.

Check for:
- Correct protective device selection and rating
- Proper earthing and bonding arrangements
- Appropriate cable sizing and routing
- Professional workmanship and installation quality
- Labelling and identification
- Accessibility and compliance with building regulations
- Any visible non-compliances or safety concerns

Provide a pass/fail assessment with detailed reasoning and improvement recommendations.`;

        case 'fault_diagnosis':
        default:
          return `Analyse these electrical installation images for EICR compliance and BS 7671 18th Edition requirements.

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
      }
    };

    const userPrompt = getUserPrompt(analysis_settings.mode);

    console.log('Sending request to OpenAI with GPT-5...');

    // Helper function for OpenAI API call with retry logic
    const callOpenAI = async (attempt = 1): Promise<Response> => {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-2025-08-07',
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

      // Retry on transient errors (429, 5xx) but only once
      if (!response.ok && attempt === 1 && (response.status === 429 || response.status >= 500)) {
        console.log(`Transient error ${response.status}, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        return callOpenAI(2);
      }

      return response;
    };

    const response = await callOpenAI();

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      console.log('Analysis failed with model: gpt-5-2025-08-07');
      throw new Error('Analysis failed, please try again');
    }

    const data = await response.json();
    console.log('GPT-5 analysis completed successfully', { model_used: 'gpt-5-2025-08-07' });

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