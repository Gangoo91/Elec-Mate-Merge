
import { serve } from '../_shared/deps.ts';
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
    
    // Helper function to extract keywords for intelligent lookup
    const extractQueryKeywords = (query: string) => {
      return {
        amperage: query.match(/\b(\d+)A\b/)?.[1],
        circuitType: query.match(/\b(ring|radial)\s+circuit\b/i)?.[0],
        hasKeywords: /cable\s+sizing|RCD|protection|installation|voltage\s+drop|earth|bonding/i.test(query)
      };
    };
    
    // Helper function to detect pure regulation lookup queries
    const isPureRegulationLookup = (query: string): boolean => {
      const cleaned = query.replace(/[,\s\n]+/g, ' ').trim();
      const words = cleaned.split(' ').filter(w => w.length > 0);
      const regNumbers = words.filter(w => /^\d{3}(?:\.\d+)?(?:\.\d+)?$/.test(w));
      return regNumbers.length === words.length && words.length > 0;
    };
    
    // Helper function to get regulations directly from database
    const getRegulationsDirect = async (regNumbers: string[], keywords?: any): Promise<any> => {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      let intelligence;
      let error;
      
      // If we have keywords but no regulation numbers, try keyword-based lookup
      if (keywords?.hasKeywords && regNumbers.length === 0) {
        const filters = [];
        if (keywords.amperage) filters.push(`keywords.cs.{${keywords.amperage}A}`);
        if (keywords.circuitType) filters.push(`keywords.ilike.%${keywords.circuitType}%`);
        
        if (filters.length > 0) {
          const result = await supabase
            .from('regulations_intelligence')
            .select(`
              *,
              bs7671_embeddings!inner(content, section, amendment, metadata)
            `)
            .or(filters.join(','))
            .limit(5);
          
          intelligence = result.data;
          error = result.error;
          
          console.log('🔍 Keyword-based lookup:', { keywords, found: intelligence?.length || 0 });
        }
      }
      
      // Fallback to regulation number lookup
      if (!intelligence || intelligence.length === 0) {
        const result = await supabase
          .from('regulations_intelligence')
          .select(`
            *,
            bs7671_embeddings!inner(content, section, amendment, metadata)
          `)
          .or(regNumbers.map(n => `regulation_number.ilike.%${n}%`).join(','))
          .order('regulation_number');
        
        intelligence = result.data;
        error = result.error;
      }
      
      if (error) throw error;
      
      // Format with enriched intelligence data
      const regulations = (intelligence || []).map((intel: any) => ({
        id: intel.regulation_id,
        regulation_number: intel.regulation_number,
        section: intel.bs7671_embeddings.section,
        content: intel.bs7671_embeddings.content,
        amendment: intel.bs7671_embeddings.amendment,
        metadata: intel.bs7671_embeddings.metadata,
        similarity: 0.95,
        // Intelligence enrichments
        primary_topic: intel.primary_topic,
        keywords: intel.keywords,
        category: intel.category,
        practical_application: intel.practical_application
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
    
    // Check for regulation numbers and try direct lookup first
    const regNumbers = extractRegulationNumbers(prompt || '');
    const keywords = extractQueryKeywords(prompt || '');
    
    console.log('🔍 Query analysis:', { 
      regulation_numbers: regNumbers,
      keywords,
      query: prompt?.substring(0, 50) 
    });
    
    if (prompt && !primary_image && (regNumbers.length > 0 || keywords.hasKeywords)) {
      try {
        const result = await getRegulationsDirect(regNumbers, keywords);
        
        // If we found results, return them immediately
        if (result.regulations && result.regulations.length > 0) {
          console.log('✅ Direct lookup success:', { count: result.regulations.length });
          return new Response(
            JSON.stringify(result),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (lookupError) {
        console.error('❌ Direct lookup error:', lookupError);
        // Fall through to normal AI processing if direct lookup fails
      }
    }
    
    // Fetch regulations from RAG if requested - Direct RPC call (no HTTP overhead)
    let ragRegulations: any[] = [];
    let ragMetadata: any = {};
    if (use_rag && prompt && !primary_image) {
      try {
        const startTime = Date.now();
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        console.log('🔍 Starting intelligence search for:', prompt?.substring(0, 50));
        
        // Direct RPC call to regulations intelligence (simplified architecture)
        const intelligencePromise = supabase.rpc('search_regulations_intelligence_hybrid', {
          query_text: prompt,
          match_count: 8
        });
        
        // Add 5-second timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Intelligence search timeout')), 5000)
        );
        
        const { data: intelligenceResults, error: intelligenceError } = await Promise.race([
          intelligencePromise,
          timeoutPromise
        ]) as any;
        
        if (intelligenceError) {
          console.error('❌ Intelligence search failed:', intelligenceError);
        } else if (intelligenceResults && intelligenceResults.length > 0) {
          console.log('✅ Intelligence search found:', intelligenceResults.length, 'regulations');
          
          // Enrich with full regulation content (parallel lookups for speed)
          const enrichmentPromises = intelligenceResults.map(async (intel: any) => {
            const { data: fullReg } = await supabase
              .from('bs7671_embeddings')
              .select('content, section, amendment, metadata')
              .eq('id', intel.regulation_id)
              .single();
            
            return {
              id: intel.regulation_id,
              regulation_number: intel.regulation_number,
              section: fullReg?.section || intel.section,
              content: fullReg?.content || intel.content,
              amendment: fullReg?.amendment,
              metadata: fullReg?.metadata || {},
              similarity: intel.hybrid_score || 0.8,
              // Intelligence enrichments
              primary_topic: intel.primary_topic,
              keywords: intel.keywords,
              category: intel.category,
              practical_application: intel.practical_application
            };
          });
          
          ragRegulations = await Promise.all(enrichmentPromises);
          ragMetadata = {
            search_method: 'intelligence_hybrid',
            results_count: ragRegulations.length,
            query_keywords: keywords,
            search_time_ms: Date.now() - startTime
          };
          
          console.log('✅ Enrichment complete:', {
            regulations_count: ragRegulations.length,
            time_ms: Date.now() - startTime
          });
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
ENRICHED REGULATIONS (${ragRegulations.length} pre-analyzed):
${ragRegulations.map(reg => `
[${reg.regulation_number}] ${reg.section}
${reg.content}
Amendment: ${reg.amendment || 'N/A'}
`).join('\n---\n')}
` : '';
        
        systemMessage = `You are ElectricalMate, an expert UK electrician's AI assistant with BS 7671:2018+A3:2024 expertise.

${ragContext ? ragContext + '\n\n🚨 CRITICAL: These regulations are PRE-ANALYZED. DO NOT re-analyze. Copy regulation numbers and content directly.\n' : ''}

INSTRUCTIONS (FOLLOW EXACTLY):
1. Return ONLY valid JSON - NO markdown blocks, NO \`\`\`json, NO extra text
2. JSON structure: {"quick_answer": "...", "technical_answer": "...", "regulations": "...", "practical_guidance": "..."}
3. Format each section with proper markdown for readability

SECTION FORMATTING:

**quick_answer** (2-3 sentences max):
- Direct answer with key regulation numbers in **bold**
- Plain text, no markdown formatting needed
Example: "Yes, 30mA RCD protection is required per **Regulation 701.411.3.3**. This applies to all socket outlets and circuits in bathrooms."

**technical_answer** (use rich markdown):
- Use ## for subheadings
- Use **bold** for key terms and regulation numbers
- Use bullet points (- or •) for lists
- Add line breaks between paragraphs (\n\n)
Example: "## Voltage Drop Calculation\n\nFor a 32A ring circuit:\n\n**Cable sizing:** 2.5mm² twin & earth\n- Maximum run: 106m total loop\n- Voltage drop: 18mV/A/m\n- Result: 0.96V (compliant)\n\n**Zs earth fault loop:**\n- Maximum Zs: 1.44Ω (Type B 32A)\n- Measured: 0.85Ω (pass)"

**regulations** (formatted list):
- One regulation per paragraph
- Start each with **Regulation X.Y.Z** in bold
- Explain what it requires in plain English
- Add line break between regulations (\n\n)
Example: "**Regulation 411.3.3** requires disconnection times of 0.4s for socket outlets and 5s for fixed equipment on TN systems.\n\n**Regulation 701.411.3.3** mandates 30mA RCD protection for all circuits in bathroom locations."

**practical_guidance** (numbered steps):
- Use numbered lists (1. 2. 3.)
- Include ## subheadings for sections
- Bold key actions
Example: "## Installation Steps\n\n1. **Safe isolation** - Lock off consumer unit\n2. **Cable routing** - Run via safe zones only\n3. **Testing** - Check R1+R2, insulation resistance, Zs"

RESPONSE SCOPE: Design, Regulations, Installation, Testing ONLY
DO NOT: Pricing, costs, materials sourcing

Always use British English (earth not ground, consumer unit not panel).`;
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
        model: 'gpt-5-mini-2025-08-07',
        messages: messages,
        max_completion_tokens: type === "visual_analysis_advanced" ? 4000 : (type === "report_writer" ? 800 : (type === "structured_assistant" ? 6000 : 2000)),
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
    console.log('Raw OpenAI response data:', JSON.stringify(data, null, 2));
    console.log('Content field:', aiResponse);

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
      
      // Check if content is empty
      if (!content || content.trim() === '') {
        console.error('OpenAI returned empty content');
        return new Response(
          JSON.stringify({ 
            error: 'OpenAI returned empty response',
            debug: { rawContent: aiResponse, type: type }
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      try {
        const parsedResponse = JSON.parse(content);
        
        // Validate that all FOUR fields exist (new format)
        const quick_answer = parsedResponse.quick_answer || '';
        const technical_answer = parsedResponse.technical_answer || '';
        const regulations = parsedResponse.regulations || '';
        const practical_guidance = parsedResponse.practical_guidance || '';
        
        if (!quick_answer || !technical_answer || !regulations || !practical_guidance) {
          console.warn('Warning: Some fields are empty', { 
            hasQuickAnswer: !!quick_answer,
            hasTechnicalAnswer: !!technical_answer, 
            hasRegulations: !!regulations, 
            hasPracticalGuidance: !!practical_guidance 
          });
        }
        
        return new Response(
          JSON.stringify({ 
            quick_answer: quick_answer || 'No quick answer provided.',
            technical_answer: technical_answer || 'No technical analysis provided.',
            regulations: regulations || 'No regulations specified.',
            practical_guidance: practical_guidance || 'No practical guidance available.'
            // RAG metadata hidden - trade secret
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
