import { corsHeaders, serve } from '../_shared/deps.ts';
import { createLogger } from '../_shared/logger.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);

  try {
    const { circuit } = await req.json();
    
    if (!circuit) {
      return new Response(
        JSON.stringify({ success: false, error: 'Circuit data required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    logger.info('Regenerating justifications for circuit', { circuitNumber: circuit.circuitNumber });

    const prompt = `Generate detailed technical justifications for this electrical circuit design:

Circuit Details:
- Load: ${circuit.loadType} (${circuit.power}W at ${circuit.voltage}V)
- Cable: ${circuit.cableSize}mm² / ${circuit.cpcSize}mm² (${circuit.cableLength}m)
- Protection: ${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type}
- Installation Method: ${circuit.installationMethod}
- RCD Protection: ${circuit.rcdProtected ? 'Yes' : 'No'}
- Max Zs: ${circuit.maxZs}Ω
${circuit.calculatedZs ? `- Calculated Zs: ${circuit.calculatedZs}Ω` : ''}

Calculations:
- Design Current (Ib): ${circuit.calculations?.Ib?.toFixed(2)}A
- Cable Current Capacity (Iz): ${circuit.calculations?.Iz?.toFixed(2)}A
- Voltage Drop: ${circuit.calculations?.voltageDrop?.volts?.toFixed(2)}V (${circuit.calculations?.voltageDrop?.percent?.toFixed(2)}%)

${circuit.warnings && circuit.warnings.length > 0 ? `Warnings:\n${circuit.warnings.map((w: string) => `- ${w}`).join('\n')}` : ''}

Provide justifications in this JSON format:
{
  "cableSize": "Explain cable sizing choice with calculations",
  "protection": "Explain protective device selection and compliance",
  "rcd": "Explain RCD requirements and compliance"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert electrical engineer. Generate concise, regulation-compliant justifications for circuit designs per BS 7671:2018+A3:2024.' 
          },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 800,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('OpenAI API error', { status: response.status, error: errorText });
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const justifications = JSON.parse(data.choices[0].message.content);

    logger.info('✅ Justifications regenerated successfully');

    return new Response(
      JSON.stringify({ success: true, justifications }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    logger.error('Regenerate justifications error', { error });
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        requestId
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
