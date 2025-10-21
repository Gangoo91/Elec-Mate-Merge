
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    console.log('Secret names available: Cannot list keys in Deno environment');
    
    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured or not accessible');
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured. Please add the 'OpenAI API' key to your Supabase secrets." }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestBody = await req.json();
    const { prompt, type = "general", primary_image, additional_images = [], context = {}, use_rag = false } = requestBody;
    
    // Helper function to extract regulation numbers from query
    const extractRegulationNumbers = (query: string): string[] => {
      // More robust regex to handle multiple numbers with various separators
      const regPattern = /\b(\d{3}(?:\.\d+){0,2})\b/g;
      const matches = query.match(regPattern) || [];
      return [...new Set(matches)]; // Deduplicate
    };
    
    // Helper function to detect pure regulation lookup queries
    const isPureRegulationLookup = (query: string): boolean => {
      const cleaned = query.replace(/[,\s\n]+/g, ' ').trim();
      const words = cleaned.split(' ').filter(w => w.length > 0);
      const regNumbers = words.filter(w => /^\d{3}(?:\.\d+)?(?:\.\d+)?$/.test(w));
      return regNumbers.length === words.length && words.length > 0;
    };
    
    // Helper function to get regulations directly from database
    const getRegulationsDirect = async (regNumbers: string[]): Promise<any> => {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('bs7671_embeddings')
        .select('regulation_number, section, content, amendment, metadata')
        .or(regNumbers.map(n => `regulation_number.ilike.%${n}%`).join(','))
        .order('regulation_number');
      
      if (error) throw error;
      
      // Format for RAG panel compatibility
      const regulations = (data || []).map((reg: any) => ({
        ...reg,
        id: reg.id || crypto.randomUUID(),
        similarity: 0.95 // Direct match confidence
      }));
      
      return {
        success: true,
        lookup_mode: true,
        regulations: regulations,
        
        // Include RAG fields for panel population
        rag_regulations: regulations,
        rag_metadata: {
          search_method: 'direct',
          has_installation: false,
          has_testing: false,
          has_design: false,
          query_type: 'lookup'
        },
        
        message: regulations.length > 0 
          ? `Found ${regulations.length} regulation(s) matching your request.`
          : 'No regulations found matching those numbers.'
      };
    };
    
    // NEW: Check for regulation numbers and try direct lookup first
    const regNumbers = extractRegulationNumbers(prompt || '');
    if (prompt && !primary_image && regNumbers.length > 0) {
      console.log(`🔍 Detected ${regNumbers.length} regulation number(s): ${regNumbers.join(', ')}`);
      try {
        const result = await getRegulationsDirect(regNumbers);
        
        // If we found results, return them immediately
        if (result.regulations && result.regulations.length > 0) {
          console.log(`✅ Direct lookup returned ${result.regulations.length} regulation(s)`);
          return new Response(
            JSON.stringify(result),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        // If no direct matches, fall through to RAG + AI
        console.log('⚠️ No direct matches found, falling back to RAG + AI');
      } catch (lookupError) {
        console.error('Direct lookup error:', lookupError);
        // Fall through to normal AI processing if direct lookup fails
      }
    }
    
    // Fetch regulations from RAG if requested
    let ragRegulations: any[] = [];
    let ragMetadata: any = {};
    if (use_rag && prompt && !primary_image) {
      console.log('🔍 Fetching regulations via multi-source RAG...');
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        
        const ragResponse = await fetch(`${supabaseUrl}/functions/v1/multi-source-rag-search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: prompt,
            matchThreshold: 0.4,
            matchCount: 8
          })
        });
        
        if (ragResponse.ok) {
          const ragData = await ragResponse.json();
          ragRegulations = ragData.regulations || [];
          ragMetadata = {
            has_installation: ragData.has_installation_content,
            has_testing: ragData.has_testing_content,
            has_design: ragData.has_design_content,
            query_type: ragData.queryType,
            search_method: ragData.searchMethod
          };
          console.log('✅ Retrieved', ragRegulations.length, 'regulations from RAG');
          console.log('📊 Additional content available:', ragMetadata);
        } else {
          console.warn('⚠️ RAG search failed, continuing without regulation context');
        }
      } catch (ragError) {
        console.error('❌ RAG error:', ragError);
        // Continue without RAG if it fails
      }
    }

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
        const ragContext = ragRegulations.length > 0 ? `
CONTEXT FROM BS 7671 DATABASE (${ragRegulations.length} regulations found):
${ragRegulations.map(reg => `
[${reg.regulation_number}] ${reg.section}
${reg.content}
Amendment: ${reg.amendment || 'N/A'}
Confidence: ${Math.round(reg.similarity * 100)}%
`).join('\n---\n')}
` : '';
        
        systemMessage = `
          You are ElectricalMate, an expert UK electrician's AI assistant with deep knowledge of BS 7671:2018+A3:2024 (18th Edition).
          
          ${ragContext ? ragContext + '\n\nIMPORTANT: Use the BS 7671 regulations provided above as your primary source. Cite specific regulation numbers.\n' : ''}
          
          CRITICAL INSTRUCTIONS:
          1. Start with a CLEAR, CONVERSATIONAL ANSWER (2-3 paragraphs) that directly answers the user's question
          2. Then provide 5-8 MOST RELEVANT regulations with clear reasoning
          3. Then provide practical installation and testing guidance
          4. Return ONLY raw JSON - NO markdown, NO backticks
          5. Write in natural, flowing English as if speaking to a colleague
          
          RESPONSE SCOPE:
          - Cover: Design, Regulations, Installation, Testing ONLY
          - DO NOT include: Pricing, costs, materials sourcing, or purchasing information
          
          You must provide responses in THREE distinct sections:

          **ANALYSIS SECTION** (2-3 conversational paragraphs):
          - Start with a direct, clear answer to the question in plain English
          - Explain the technical considerations as if talking to a colleague
          - Focus on WHY this matters for safety and compliance
          - NO bullet points - write in flowing paragraphs
          - Use natural language, not technical jargon unless necessary

          **REGULATIONS SECTION** (5-8 key regulations only):
          - ALWAYS start with regulation number (e.g., 411.3.2)
          - Explain in plain English what the regulation requires
          - Focus on MOST RELEVANT regulations, not comprehensive lists
          - Reference amendment status where applicable (A2:2022)
          - Write as readable text, not a dry list

          **PRACTICAL GUIDANCE SECTION** (essential points only):
          - Write as conversational paragraphs, not bullet points
          - Provide actionable installation/testing/design advice
          - Key safety practices explained clearly
          - Common pitfalls to avoid
          - No pricing or material sourcing information

          CRITICAL: You must respond with valid JSON where "analysis", "regulations", and "practical_guidance" are ALL plain text strings (NOT objects or arrays).

          Format requirements:
          {
            "analysis": "Write 2-3 conversational paragraphs that directly answer the question. Start with the clear answer, then explain why it matters. Use natural flowing English as if speaking to a colleague. Include calculations and safety considerations in readable paragraph format.",
            "regulations": "Write your BS 7671 regulation references as flowing text. ALWAYS start with the regulation number first, then explain what it requires in plain English. Make it readable and connected, not a dry list. Include specific clause numbers and compliance requirements.",
            "practical_guidance": "Write practical installation guidance as conversational paragraphs. Include step-by-step procedures, tips, and real-world advice in natural flowing English. Make it feel like advice from an experienced electrician."
          }

          BS 7671 FOCUS AREAS:
          - Special locations (Section 701-753): Bathrooms, outdoor installations, swimming pools, etc.
          - Protection against electric shock (Part 4): ADS, supplementary bonding, RCD requirements
          - Cable selection and sizing (Appendix 4): Current-carrying capacity, voltage drop, grouping factors
          - Earthing and bonding (Chapter 54): PME, TN-S, TN-C-S, TT systems
          - Circuit protection (Chapter 43): MCB, RCBO, AFDD selection and coordination
          - Testing and inspection (Part 6): Safe isolation, continuity, insulation resistance, Zs testing

          Always use British English spelling and UK electrical terminology (earth not ground, consumer unit not panel, etc.).
          Ensure all three sections are comprehensive, formatted as readable text strings, and directly address the user's query.
          When regulations have been updated, mention both current (Amendment 3) and previous requirements for context.
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
    let messages: any[] = [{ role: 'system', content: systemMessage }];
    
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
        model: type === "visual_analysis_advanced" ? 'gpt-4o-mini' : 'gpt-4o-mini',
        messages: messages,
        max_tokens: type === "visual_analysis_advanced" ? 2000 : (type === "report_writer" ? 800 : 2000),
        temperature: 0.7,
        response_format: type === "structured_assistant" || type === "visual_analysis_advanced" ? { type: "json_object" } : undefined,
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
        JSON.stringify({ error: "Error from OpenAI API: " + (data.error.message || 'Unknown API error') }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = data.choices[0].message.content;
    console.log('OpenAI response received successfully');

    // Handle structured responses for structured_assistant type
    if (type === "structured_assistant") {
      let content = aiResponse.trim();
      
      // Clean up the response - strip markdown code blocks if present
      if (content.startsWith('```json')) {
        content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (content.startsWith('```')) {
        content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Remove any leading/trailing quotes that might wrap the entire JSON
      content = content.replace(/^["'](.*)["']$/s, '$1');
      
      console.log('Cleaned content for parsing (first 200 chars):', content.substring(0, 200));
      
      try {
        const parsedResponse = JSON.parse(content);
        
        // Validate that all three fields exist
        const analysis = parsedResponse.analysis || '';
        const regulations = parsedResponse.regulations || '';
        const practical_guidance = parsedResponse.practical_guidance || '';
        
        if (!analysis || !regulations || !practical_guidance) {
          console.warn('Warning: Some fields are empty', { 
            hasAnalysis: !!analysis, 
            hasRegulations: !!regulations, 
            hasPracticalGuidance: !!practical_guidance 
          });
        }
        
        return new Response(
          JSON.stringify({ 
            analysis: analysis || 'No analysis provided.',
            regulations: regulations || 'No regulations specified.',
            practical_guidance: practical_guidance || 'No practical guidance available.',
            rag_metadata: ragMetadata,
            rag_regulations: ragRegulations
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (parseError) {
        console.error('Failed to parse structured response:', parseError);
        console.error('Content that failed to parse:', content);
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
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
