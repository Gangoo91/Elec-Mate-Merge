import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
  const basePrompt = `You are a qualified electrical engineer with expertise in BS 7671:2018+A2:2022 regulations. Generate a comprehensive, professional electrical report based on the provided data.

IMPORTANT REQUIREMENTS:
- Use proper electrical terminology and BS 7671 regulation references
- Include specific code references where applicable (e.g., Regulation 134.1.1)
- Provide clear recommendations and actions
- Format as a professional document with proper headings
- Include safety classifications (C1, C2, C3) where relevant
- Be thorough and detailed in your analysis
- Include proper conclusions and next steps
- Ensure compliance with UK electrical standards

Template Type: ${template}

Form Data:
${JSON.stringify(formData, null, 2)}

${additionalNotes ? `Additional Notes: ${additionalNotes}` : ''}

Generate a complete, professional electrical report that would be suitable for submission to Building Control or for insurance purposes. Include all necessary sections, technical details, and recommendations.`;

  switch (template) {
    case 'eicr':
      return basePrompt + `

Format as an EICR (Electrical Installation Condition Report) with:
- Executive Summary with overall condition assessment
- Installation details and supply characteristics  
- Extent and limitations of inspection and testing
- Schedule of Items Inspected with detailed findings
- Schedule of Test Results with actual measurements
- Fault classification (C1/C2/C3/FI) with specific regulation references
- Recommendations for remedial work
- Next inspection interval recommendation
- Conclusion and declaration of compliance

Include specific ohm readings, RCD trip times, and insulation resistance values where applicable.`;

    case 'minor-works':
      return basePrompt + `

Format as a Minor Works Certificate with:
- Description of work completed
- Circuit details and protection characteristics
- Installation method and cable information
- Test results including continuity, insulation resistance, and polarity
- RCD operation test results if applicable
- Earth fault loop impedance measurements
- Compliance statement with BS 7671
- Any departures from BS 7671 (if applicable)
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
      return `You are a qualified electrician with expertise in BS 7671:2018+A2:2022 (18th Edition) electrical regulations. You excel at explaining technical electrical work to clients in clear, accessible language whilst maintaining technical accuracy and UK compliance.

Client Type: ${formData.clientType}
Technical Findings to Explain:
${formData.technicalNotes}

Communication Preferences:
- Tone: ${formData.tone}
- Complexity Level: ${formData.readingLevel}
- Include Analogies: ${formData.includeAnalogy ? 'Yes - use everyday comparisons' : 'No - keep explanations direct'}
- Include Cost Information: ${formData.includeCostInfo ? 'Yes - mention cost implications' : 'No - focus on technical aspects'}
- Emphasize Safety: ${formData.emphasizeSafety ? 'Yes - highlight safety importance' : 'No - balanced approach'}
- Include BS 7671 References: ${formData.includeBS7671 ? 'Yes - include UK regulation references' : 'No - avoid technical references'}

CRITICAL REQUIREMENTS:
1. Use British English spelling and terminology throughout (colour not color, earthing not grounding, etc.)
2. Reference UK electrical standards and regulations where appropriate
3. ${formData.includeBS7671 ? 'Include specific BS 7671 regulation numbers (e.g., 411.3.3, 134.1.1) and safety classifications (C1, C2, C3, FI)' : 'Avoid technical regulation references but maintain accuracy'}
4. Use appropriate ${formData.tone} tone whilst remaining professional
5. Write at ${formData.readingLevel} complexity level appropriate for a ${formData.clientType}
6. ${formData.includeAnalogy ? 'Include helpful analogies using British everyday examples (like car MOTs, home insurance, etc.)' : 'Use direct, clear explanations without analogies'}

Structure your explanation to cover:
- **What we found:** Clear description of the electrical issue/work
- **Why it matters:** Safety, compliance, and practical implications
- **What this means for you:** Direct impact on the client
- **Next steps:** Clear actions required or recommendations
- ${formData.includeCostInfo ? '**Cost considerations:** Approximate cost implications and factors affecting pricing' : ''}

Use natural, conversational British English. Explain any technical terms you must use. ${formData.emphasizeSafety ? 'Emphasise safety aspects and the importance of prompt action where relevant.' : 'Provide balanced information focusing on practical implications.'} Ensure the explanation helps the client make informed decisions about their electrical installation.`;

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

    const prompt = createPrompt(template, formData, additionalNotes);
    console.log('Generated prompt for template:', template);

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
            content: 'You are a qualified electrical engineer with extensive knowledge of BS 7671:2018+A2:2022 regulations and UK electrical standards. Generate professional, detailed electrical reports that comply with industry standards and regulations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.3
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
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});