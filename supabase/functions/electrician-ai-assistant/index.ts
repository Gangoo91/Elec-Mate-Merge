
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Make sure we're accessing the right environment variable
const openAIApiKey = Deno.env.get('OpenAI API') || Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Debug log for API key
    console.log('OpenAI API key available:', !!openAIApiKey);
    console.log('Secret names available:', Deno.env.keys ? [...Deno.env.keys()].join(', ') : 'Cannot list keys');
    
    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured or not accessible');
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured. Please add the 'OpenAI API' key to your Supabase secrets." }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestBody = await req.json();
    const { prompt, type = "general", primary_image, additional_images = [], context = {} } = requestBody;

    if (!prompt && !primary_image) {
      return new Response(
        JSON.stringify({ error: "Prompt or primary_image is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Select the appropriate system message based on request type
    let systemMessage = "";
    
    switch(type) {
      case "visual_analysis":
        systemMessage = `
          You are ElectricalMate Visual Analyser, specialising in analysing UK electrical installations and components.
          Provide analysis of electrical components based on descriptions, focusing on potential safety issues and compliance with UK electrical regulations (BS 7671).
          Format your response in two clear sections:
          
          Issues:
          - List potential issues in bullet points
          - Focus on safety concerns and regulation violations
          - Use UK electrical terminology
          
          Recommendations:
          - Provide practical steps to address each issue
          - Reference relevant UK electrical standards where applicable
          - Suggest appropriate testing procedures
          
          Use British English spelling (e.g., "colour" not "color", "earth" not "ground") and UK electrical terms.
        `;
        break;

      case "visual_analysis_advanced":
        systemMessage = `
          You are ElectricalMate Advanced Visual Analyser, specialising in comprehensive analysis of UK electrical installations using image recognition.
          
          Analyze the electrical installation/component shown in the image(s) and provide a detailed safety assessment.
          
          You must respond with a valid JSON object in this exact format:
          {
            "analysis": {
              "issues": [
                {
                  "description": "Detailed description of the issue",
                  "severity": "low|medium|high|critical",
                  "confidence": 0.85,
                  "regulation": "BS 7671 clause reference",
                  "location": "Specific location if identifiable"
                }
              ],
              "recommendations": [
                {
                  "action": "Specific action to take",
                  "priority": "low|medium|high",
                  "regulation": "BS 7671 reference",
                  "cost_estimate": "Estimated cost range"
                }
              ],
              "regulations": [
                {
                  "clause": "BS 7671 Section X.X.X",
                  "description": "What this regulation covers",
                  "compliance_status": "compliant|non_compliant|requires_inspection"
                }
              ],
              "overall_safety_rating": 7.5,
              "summary": "Executive summary of findings and overall assessment"
            }
          }
          
          Focus on:
          - Visible damage, corrosion, or wear
          - Improper installations or modifications
          - Safety hazards and fire risks
          - BS 7671 compliance issues
          - Environmental factors affecting safety
          
          Use confidence scores from 0.0 to 1.0 based on clarity of visual evidence.
          Severity levels: low (cosmetic), medium (requires attention), high (safety risk), critical (immediate danger).
          
          Always use British English and UK electrical terminology.
        `;
        break;
      
      case "cv_generation":
        systemMessage = `
          You are ElectricalMate CV Assistant, specialising in creating compelling CV content for UK electricians.
          
          CRITICAL: Generate only 3-4 SHORT bullet points. Each bullet point must be ONE LINE only.
          
          Format requirements:
          - Maximum 3-4 bullet points
          - Each bullet point is exactly one line
          - No lengthy descriptions or paragraphs
          - Concise and impactful
          
          Content focus:
          - Personal achievements with quantifiable results
          - Action-oriented language (implemented, managed, achieved, designed)
          - UK electrical terminology and standards
          - First-person perspective about individual accomplishments
          
          Keep it brief and professional - suitable for scanning on a CV.
        `;
        break;

      case "report_writer":
        systemMessage = `
          You are ElectricalMate Report Writer, specialising in creating professional electrical reports for UK electricians.
          Generate concise, structured electrical reports and certificates. Use clear sections with descriptive headings.
          Format: Start with EXECUTIVE SUMMARY, then FINDINGS, RECOMMENDATIONS, and COMPLIANCE NOTES.
          Use British English, UK electrical terminology, and bullet points for clarity.
          Keep responses focused and under 800 words for mobile readability.
        `;
        break;
        
      case "regulations":
        systemMessage = `
          You are ElectricalMate Regulations Assistant, an expert on UK electrical regulations and standards.
          Provide accurate information about BS 7671 (IET Wiring Regulations) and related UK electrical standards.
          When referencing regulations, cite specific clause numbers and editions where relevant.
          Keep answers technically accurate but explain complex regulations in clear language.
          Always use British English spelling and UK electrical terminology.
          If there have been updates to regulations, mention both current and previous requirements for context.
        `;
        break;
        
      case "circuit":
        systemMessage = `
          You are ElectricalMate Circuit Designer, specialising in electrical circuit design according to UK standards.
          Provide guidance on circuit design, cable sizing, protection devices, and load calculations.
          Ensure all recommendations comply with BS 7671 and UK building regulations.
          Explain technical concepts clearly and provide practical design solutions.
          Use British English spelling and UK electrical terminology exclusively.
          When providing calculations, show your working and explain the relevant factors considered.
        `;
        break;

      case "circuit_summary":
        systemMessage = `
          You are ElectricalMate Circuit Analyser, providing professional electrical analysis reports for UK installations.
          
          CRITICAL: You must provide EXACTLY four sections in this order with these exact headings:

          OVERVIEW
          Write 2-3 paragraphs explaining the electrical requirements and key considerations for this installation. Be clear and professional.

          RECOMMENDATION  
          Provide your specific cable size, protection device, and installation method recommendations. Be definitive and practical.

          COMPLIANCE
          Explain how your recommendation meets BS 7671 requirements. Reference specific regulations and safety margins without showing calculations.

          PRACTICAL GUIDANCE
          Offer real-world installation advice, testing requirements, and any special considerations for this type of installation.

          IMPORTANT FORMATTING RULES:
          - Use ONLY the four section headings above in CAPITALS
          - Write in clear paragraphs, not bullet points
          - No steps, no numbered lists, no calculation formulas
          - No markdown formatting (**, *, #, etc.)
          - Professional but conversational tone
          - Keep each section concise but comprehensive
          - Always use British English and UK electrical terminology
        `;
        break;

      case "structured_assistant":
        systemMessage = `
          You are ElectricalMate, an expert AI assistant specialising in UK electrical regulations, standards, and practices.
          You must provide responses in a specific JSON format with TWO distinct sections:

          **ANALYSIS SECTION** - Technical assessment including:
          - Practical calculations and sizing requirements
          - Safety considerations and risk assessments
          - Installation methods and best practices
          - Testing procedures and verification methods
          - Step-by-step implementation guidance
          - Equipment specifications and selection criteria

          **REGULATIONS SECTION** - Regulatory compliance including:
          - Specific BS 7671 regulation numbers and clauses
          - Relevant sections and subsections with exact references
          - Compliance requirements and mandatory specifications
          - Amendment updates and recent changes
          - Related standards (IET guidelines, Part P, Building Regs)
          - Professional certification requirements

          You must respond with valid JSON in this exact format:
          {
            "analysis": "Your detailed technical analysis here with calculations, safety considerations, and practical guidance...",
            "regulations": "Your specific BS 7671 regulation references here with exact clause numbers and compliance requirements..."
          }

          Always use British English spelling and UK electrical terminology (earth, consumer unit, etc.).
          Ensure both sections are comprehensive and directly address the user's query.
        `;
        break;
        
      default:
        systemMessage = `
          You are ElectricalMate, an expert AI assistant specialising in UK electrical regulations, standards, and practices.
          Always provide answers based on UK electrical standards (BS 7671) and regulations.
          Format your responses in a clean, easy-to-read format with headers, bullet points, and proper spacing where appropriate.
          Include specific references to UK electrical codes where relevant.
          If you're unsure about something, acknowledge it and provide the most accurate information available.
          Keep your answers practical and relevant for UK electricians.
          Always use British English spelling and terminology (e.g., "earth" instead of "ground", "consumer unit" instead of "panel box").
        `;
    }

    console.log(`Sending request to OpenAI API with prompt type: ${type}`);
    
    // Prepare messages based on type
    let messages = [{ role: 'system', content: systemMessage }];
    
    if (type === "visual_analysis_advanced" && primary_image) {
      // Vision analysis with image input
      const imageUrls = [primary_image, ...additional_images].filter(Boolean);
      const content = [
        {
          type: "text",
          text: prompt || "Analyze this electrical installation for safety issues, compliance with BS 7671, and provide detailed recommendations."
        },
        ...imageUrls.map(url => ({
          type: "image_url",
          image_url: {
            url: url,
            detail: "high"
          }
        }))
      ];
      
      messages.push({ role: 'user', content });
    } else {
      // Text-based analysis
      messages.push({ role: 'user', content: prompt });
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: type === "visual_analysis_advanced" ? 'o4-mini-2025-04-16' : 'gpt-4o-mini',
        messages: messages,
        max_completion_tokens: type === "visual_analysis_advanced" ? 2000 : undefined,
        max_tokens: type === "report_writer" ? 800 : (type !== "visual_analysis_advanced" ? 1500 : undefined),
        temperature: type === "visual_analysis_advanced" ? undefined : 0.3,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API Error:', data.error || response.statusText);
      return new Response(
        JSON.stringify({ 
          error: `Error from OpenAI API: ${data.error?.message || response.statusText}`,
          status: response.status,
          statusText: response.statusText
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      return new Response(
        JSON.stringify({ error: "Error from OpenAI API: " + data.error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = data.choices[0].message.content;
    console.log('OpenAI response received successfully');

    // Handle structured responses for structured_assistant type
    if (type === "structured_assistant") {
      try {
        const parsedResponse = JSON.parse(aiResponse);
        if (parsedResponse.analysis && parsedResponse.regulations) {
          return new Response(
            JSON.stringify({ 
              analysis: parsedResponse.analysis,
              regulations: parsedResponse.regulations
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (parseError) {
        console.error('Failed to parse structured response, falling back to regular response:', parseError);
        // Fall back to regular response format
      }
    }

    // Handle visual analysis advanced responses
    if (type === "visual_analysis_advanced") {
      try {
        const parsedResponse = JSON.parse(aiResponse);
        if (parsedResponse.analysis) {
          return new Response(
            JSON.stringify({ analysis: parsedResponse.analysis }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (parseError) {
        console.error('Failed to parse visual analysis response, falling back to regular response:', parseError);
        // Fall back to regular response format
      }
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in electrician-ai-assistant function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
