import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReportData {
  template: string;
  formData: any;
  additionalNotes?: string;
}

const createPrompt = (template: string, formData: any, additionalNotes?: string) => {
  const basePrompt = `You are a qualified electrical engineer with expertise in BS7671 18th Edition regulations. Generate a comprehensive, professional electrical report based on the provided data.

CRITICAL FORMATTING REQUIREMENTS FOR PROFESSIONAL PDFs:
- Use proper markdown formatting with clear hierarchical headings (# ## ###)
- Create well-structured tables using markdown table syntax for test results and measurements
- Use **bold** for important safety classifications (C1, C2, C3) and critical findings
- Include bullet points for lists using proper markdown (-) syntax
- Ensure consistent spacing between sections
- Use blockquotes (>) for important safety notices or regulatory warnings
- Format technical data in structured tables with clear headers
- Use code blocks (\`\`\`) for regulation references and specific measurements

CONTENT REQUIREMENTS:
- Use proper UK electrical terminology and BS7671 18th Edition regulation references
- Include specific code references where applicable (e.g., Regulation 134.1.1, 411.3.3)
- Provide clear recommendations and actions with priority classifications
- Include safety classifications (C1, C2, C3, FI) where relevant with proper explanations
- Be thorough and detailed in technical analysis
- Include proper conclusions and next steps
- Ensure full compliance with UK electrical standards

CRITICAL DATA USAGE REQUIREMENTS:
- ALWAYS use the actual data provided in the Form Data section below
- NEVER use placeholder text like "[Insert Name]", "[Insert Date]", "[Insert Company Name]"
- If specific data is not provided, use professional generic descriptions
- Use the client name, installer name, dates, and addresses exactly as provided
- Fill in all certificate sections with the actual form data provided

PROFESSIONAL STRUCTURE:
- Start with a clear executive summary
- Include installation details and scope of work
- Present findings in structured tables where appropriate
- Provide detailed technical measurements and test results
- Include clear recommendations with timescales
- End with compliance statements and certifications

Template Type: ${template}

Form Data:
${JSON.stringify(formData, null, 2)}

${additionalNotes ? `Additional Notes: ${additionalNotes}` : ''}

Generate a complete, professional electrical report using the EXACT data provided above. Do not use any placeholder text - use the actual client details, installer information, dates, and technical data provided. Use proper markdown formatting to ensure excellent PDF conversion. Include all necessary sections, technical details, and recommendations in a structured, professional format.`;

  switch (template) {
    case 'eicr':
      return basePrompt + `

## EICR SPECIFIC FORMATTING REQUIREMENTS:

Structure the EICR with the following sections using proper markdown:

# ELECTRICAL INSTALLATION CONDITION REPORT (EICR)

## Executive Summary
- Overall condition assessment with clear rating
- Key findings summary in bullet points
- Immediate safety concerns highlighted

## Installation Details
| Detail | Value |
|--------|-------|
| Supply Type | [TN-S/TN-C-S/TT] |
| Supply Voltage | [230V/400V] |
| Main Earthing | [Details] |
| RCD Protection | [Type and ratings] |

## Schedule of Items Inspected
Create a detailed table with:
| Item | Regulation | Condition | Comments |
|------|------------|-----------|----------|
| Consumer Unit | 421.1.201 | [Satisfactory/Unsatisfactory] | [Details] |
| Main Earthing | 542.1.2 | [Satisfactory/Unsatisfactory] | [Details] |

## Test Results
| Circuit | Description | R1+R2 (Ω) | Insulation (MΩ) | RCD (ms) | Result |
|---------|-------------|------------|-----------------|----------|--------|
| [Number] | [Description] | [Value] | [Value] | [Value] | **PASS/FAIL** |

## Observations and Recommendations
### **C1 - Danger Present (Immediate Action Required)**
- [List any C1 items with regulation references]

### **C2 - Potentially Dangerous (Urgent Action Required)**  
- [List any C2 items with regulation references]

### **C3 - Improvement Recommended**
- [List any C3 items with regulation references]

Include specific ohm readings, RCD trip times, and insulation resistance values in properly formatted tables.`;

    case 'minor-works':
      return basePrompt + `

Format as a Minor Works Certificate with:
- Description of work completed
- Circuit details and protection characteristics
- Installation method and cable information
- Test results including continuity, insulation resistance, and polarity
- RCD operation test results if applicable
- Earth fault loop impedance measurements
- Compliance statement with BS7671 18th Edition
- Any departures from BS7671 18th Edition (if applicable)
- Installation schedule and circuit particulars`;

    case 'periodic-inspection':
      return basePrompt + `

Format as a Periodic Inspection Report with:
- Purpose and scope of inspection
- Assessment of installation condition
- Comparison with previous reports
- Items requiring attention or improvement
- Recommended actions with timescales
- Overall condition assessment
- Recommended interval to next inspection
- Summary of inspection findings`;

    case 'client-explainer':
      return `You are a qualified electrician with expertise in BS7671 18th Edition electrical regulations. You excel at explaining technical electrical work to clients in clear, accessible language whilst maintaining technical accuracy and UK compliance.

Client Type: ${formData.clientType}
Technical Findings to Explain:
${formData.technicalNotes}

Communication Preferences:
- Tone: ${formData.tone}
- Complexity Level: ${formData.readingLevel}
- Include Analogies: ${formData.includeAnalogy ? 'Yes - use everyday comparisons' : 'No - keep explanations direct'}
- Include Cost Information: ${formData.includeCostInfo ? 'Yes - mention cost implications' : 'No - focus on technical aspects'}
- Emphasize Safety: ${formData.emphasizeSafety ? 'Yes - highlight safety importance' : 'No - balanced approach'}
- Include BS7671 References: ${formData.includeBS7671 ? 'Yes - include UK regulation references' : 'No - avoid technical references'}

${formData.includeBS7671 ? `
REGULATION CONTEXT USAGE:
You have access to specific BS 7671 regulation intelligence below. Use this to:
- Reference accurate regulation numbers (e.g., "Regulation 411.3.3 requires...")
- Explain why specific regulations apply to this situation
- Provide context on safety classifications (C1/C2/C3) with proper explanations
- Cross-reference related regulations when relevant

When explaining regulations to ${formData.clientType}:
- Cite the regulation number clearly and naturally
- Explain what the regulation means in practical terms
- Connect it directly to their specific situation
- Use the provided regulation keywords and topics for accuracy
` : ''}

CRITICAL FORMATTING REQUIREMENTS:
- Write in clear, flowing paragraphs - NOT bullet points
- Use a conversational, narrative style that reads naturally
- Break content into 3-5 well-structured paragraphs maximum
- Each paragraph should be 3-5 sentences long
- IMPORTANT: Add TWO line breaks (\n\n) between each section/paragraph
- Use section headings (with **bold** markers) to organize content
- Only use bullet points sparingly for specific lists (e.g., numbered action items)

CONTENT STRUCTURE:
Write your explanation as a cohesive narrative with these sections:

**What we found:**
[Write 2-3 flowing sentences describing the electrical issue/work in clear terms]

**Why it matters:**
[Write 3-4 sentences explaining safety, compliance, and practical implications. ${formData.includeAnalogy ? 'Include one helpful British analogy (like MOT, home insurance, etc.).' : ''} ${formData.emphasizeSafety ? 'Emphasise the safety aspects clearly.' : ''}]

**What this means for you:**
[Write 2-3 sentences on direct impact to the client and their property]

**Next steps:**
[Write 2-3 clear action items as a flowing paragraph OR a simple numbered list only if there are specific sequential steps]
${formData.includeCostInfo ? '\n\n**Cost considerations:**\n[Write 1-2 sentences about approximate cost implications]' : ''}

TONE & LANGUAGE REQUIREMENTS:
1. Use British English spelling and terminology (colour not color, earthing not grounding, etc.)
2. ${formData.includeBS7671 ? 'Include specific BS 7671 18th Edition regulation numbers (e.g., 411.3.3) and safety classifications (C1, C2, C3, FI)' : 'Avoid technical regulation references'}
3. Write at ${formData.readingLevel} complexity level appropriate for a ${formData.clientType}
4. Use ${formData.tone} tone whilst remaining professional
5. Explain technical terms naturally within sentences
6. Write as if speaking directly to the client in person

Remember: Write in flowing paragraphs that read naturally, not as a bullet-pointed list. Make it sound like a helpful electrician explaining things clearly over a cup of tea, not a formal report.

CRITICAL: Ensure you add TWO line breaks (\n\n) between each paragraph and section for proper formatting.`;

    case 'consumer-unit':
      return basePrompt + `

Format as a Consumer Unit Installation Report with:
- Pre-installation assessment
- Consumer unit specifications and compliance
- Circuit protection characteristics
- RCD/RCBO operation test results
- Earth fault loop impedance at origin
- Insulation resistance test results
- Continuity of protective conductors
- Polarity verification
- Installation certification and compliance statement`;

    case 'ev-charger':
      return basePrompt + `

Format as an EV Charger Installation Report with:
- Installation assessment and requirements
- Supply adequacy and earthing arrangements
- Dedicated circuit specifications
- RCD protection compliance (30mA Type A minimum)
- Earth fault loop impedance measurements
- Installation method and cable route
- Charging point specifications and compliance
- Mode 3 charging compliance verification
- Installation certificate and testing results`;

    case 'rcd-test':
      return basePrompt + `

Format as an RCD Test Report with:
- RCD specifications and location details
- Test equipment used and calibration status
- Ramp test results and trip characteristics
- Test button operation verification
- Trip time measurements at 1x, 2x, and 5x rated current
- Half-rated current non-trip test
- Insulation monitoring (if applicable)
- Pass/fail assessment against BS EN 61008/61009
- Recommendations for any remedial action required`;

    default:
      return basePrompt;
  }
};

serve(async (req) => {
  console.log('Generate electrical report function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { template, formData, additionalNotes }: ReportData = await req.json();
    console.log('Received data:', { template, formData: Object.keys(formData), additionalNotes });

    // ✅ RAG Integration: Fetch relevant BS 7671 regulations for Client Explainer
    let regulationContext = '';
    
    if (template === 'client-explainer' && formData.includeBS7671 && formData.technicalNotes) {
      console.log('🔍 Fetching BS 7671 regulation intelligence for Client Explainer...');
      
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      try {
        const { data: regulationData, error: regError } = await supabase.rpc('search_regulations_intelligence_hybrid', {
          query_text: formData.technicalNotes,
          match_count: 5
        });
        
        if (regError) {
          console.error('⚠️ Regulation intelligence search error:', regError);
        } else if (regulationData && regulationData.length > 0) {
          console.log(`✅ Retrieved ${regulationData.length} relevant regulations`);
          
          regulationContext = '\n\n## RELEVANT BS 7671 REGULATIONS:\n\n' + 
            regulationData.map((reg: any, idx: number) => 
              `${idx + 1}. **Regulation ${reg.regulation_number}** (${reg.category || 'General'})\n` +
              `   - Topic: ${reg.primary_topic || 'N/A'}\n` +
              `   - Keywords: ${reg.keywords?.join(', ') || 'N/A'}\n` +
              `   - Applies to: ${reg.applies_to?.join(', ') || 'All installations'}\n` +
              `   - Practical application: ${reg.practical_application || 'See regulation details'}`
            ).join('\n\n');
        } else {
          console.log('ℹ️ No specific regulations found, AI will use general BS 7671 knowledge');
        }
      } catch (err) {
        console.error('⚠️ Failed to fetch regulation intelligence:', err);
      }
    }

    const prompt = createPrompt(template, formData, additionalNotes) + regulationContext;
    console.log('Generated prompt for template:', template, regulationContext ? '(with regulation context)' : '');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are a qualified electrical engineer with extensive knowledge of BS7671 18th Edition regulations and UK electrical standards. Generate professional, detailed electrical reports that comply with industry standards and regulations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_completion_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(JSON.stringify({ 
        error: `OpenAI API error: ${response.status}`,
        details: errorData 
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    const generatedReport = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      report: generatedReport,
      template,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-electrical-report function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});