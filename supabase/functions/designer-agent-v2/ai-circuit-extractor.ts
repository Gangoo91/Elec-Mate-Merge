/**
 * AI-Powered Circuit Extraction
 * Uses Lovable AI to extract structured circuit data from natural language descriptions
 */

interface ExtractedCircuit {
  name: string;
  loadType: string;
  loadPower: number;
  quantity?: number;
  cableLength?: number;
  phases: 'single' | 'three';
  specialLocation?: 'bathroom' | 'outdoor' | 'kitchen' | 'none';
}

interface CircuitExtractionResult {
  inferredCircuits: any[];
  specialRequirements: string[];
  installationConstraints: string[];
}

/**
 * Extract circuits using AI tool calling
 */
export async function extractCircuitsWithAI(
  additionalPrompt: string,
  installationType: string,
  lovableApiKey: string,
  logger: any
): Promise<CircuitExtractionResult> {
  if (!additionalPrompt?.trim()) {
    return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
  }

  logger.info('🤖 AI Circuit Extraction Starting', { 
    promptLength: additionalPrompt.length,
    installationType 
  });

  try {
    const systemPrompt = `You are an expert electrical installation designer. Extract ALL circuits mentioned in the user's installation description.

IMPORTANT RULES:
1. Extract EVERY circuit mentioned - don't miss any
2. For plurals like "4 socket rings" or "6 lighting circuits", set quantity field
3. Use typical power ratings if not specified:
   - Socket ring: 7200W (32A)
   - Lighting circuit: 500W (typical room), 300W (small room), 200W (external)
   - Cooker: 11000W (typical)
   - Shower: Use kW value × 1000
   - EV charger: Use kW value × 1000
4. Estimate cable lengths based on property type:
   - Domestic: 20-30m typical, 10m for same floor
   - Commercial: 30-50m typical
   - Industrial: 40-80m typical
5. Identify special locations: bathroom, outdoor, kitchen, or none
6. Default to single phase unless explicitly three-phase`;

    const userPrompt = `Installation type: ${installationType}
Description: ${additionalPrompt}

Extract ALL circuits with their specifications.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'extract_circuits',
            description: 'Extract all electrical circuits from installation description',
            parameters: {
              type: 'object',
              properties: {
                circuits: {
                  type: 'array',
                  description: 'All circuits found in the description',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'Descriptive circuit name (e.g., "Ground Floor Socket Ring", "Bathroom Lighting")'
                      },
                      loadType: {
                        type: 'string',
                        enum: ['socket', 'lighting', 'cooker', 'shower', 'ev-charger', 'immersion', 'heating', 'smoke-alarm', 'garage', 'outdoor', 'other'],
                        description: 'Type of electrical load'
                      },
                      loadPower: {
                        type: 'number',
                        description: 'Power in Watts (not kW)'
                      },
                      quantity: {
                        type: 'number',
                        description: 'Number of identical circuits (e.g., "4 socket rings" = 4)'
                      },
                      cableLength: {
                        type: 'number',
                        description: 'Estimated cable run length in meters'
                      },
                      phases: {
                        type: 'string',
                        enum: ['single', 'three'],
                        description: 'Single or three phase'
                      },
                      specialLocation: {
                        type: 'string',
                        enum: ['bathroom', 'outdoor', 'kitchen', 'none'],
                        description: 'Special location requiring extra safety measures'
                      }
                    },
                    required: ['name', 'loadType', 'loadPower', 'phases']
                  }
                },
                specialRequirements: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Special safety requirements (e.g., RCD protection, IP ratings, bonding)'
                },
                installationConstraints: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Installation constraints (e.g., cable routing, derating factors)'
                }
              },
              required: ['circuits']
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'extract_circuits' } },
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('❌ AI extraction failed', { 
        status: response.status, 
        error: errorText 
      });
      throw new Error(`AI extraction failed: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      logger.warn('⚠️ No tool call in AI response, using fallback');
      return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
    }

    const extractedData = JSON.parse(toolCall.function.arguments);
    const circuits: ExtractedCircuit[] = extractedData.circuits || [];
    
    logger.info('✅ AI Extraction Complete', {
      circuitsFound: circuits.length,
      totalWithQuantities: circuits.reduce((sum, c) => sum + (c.quantity || 1), 0)
    });

    // Expand circuits by quantity
    const expandedCircuits = expandCircuitsByQuantity(circuits, logger);
    
    return {
      inferredCircuits: expandedCircuits,
      specialRequirements: extractedData.specialRequirements || [],
      installationConstraints: extractedData.installationConstraints || []
    };

  } catch (error) {
    logger.error('❌ AI extraction error', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    // Return empty result - caller will use fallback
    return { 
      inferredCircuits: [], 
      specialRequirements: [], 
      installationConstraints: [] 
    };
  }
}

/**
 * Expand circuits with quantity > 1 into individual circuit objects
 */
function expandCircuitsByQuantity(circuits: ExtractedCircuit[], logger: any): any[] {
  const expanded: any[] = [];
  
  circuits.forEach((circuit, index) => {
    const quantity = circuit.quantity || 1;
    
    if (quantity === 1) {
      expanded.push({
        id: `ai-${index}`,
        name: circuit.name,
        loadType: circuit.loadType,
        loadPower: circuit.loadPower,
        cableLength: circuit.cableLength || 25,
        phases: circuit.phases,
        specialLocation: circuit.specialLocation || 'none'
      });
    } else {
      // Create multiple identical circuits with numbered names
      for (let i = 1; i <= quantity; i++) {
        expanded.push({
          id: `ai-${index}-${i}`,
          name: `${circuit.name} ${i}`,
          loadType: circuit.loadType,
          loadPower: circuit.loadPower,
          cableLength: circuit.cableLength || 25,
          phases: circuit.phases,
          specialLocation: circuit.specialLocation || 'none'
        });
      }
      
      logger.info(`🔢 Expanded ${circuit.name} × ${quantity} into ${quantity} circuits`);
    }
  });
  
  return expanded;
}
