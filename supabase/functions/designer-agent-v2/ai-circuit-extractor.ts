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
  openAiKey: string,
  logger: any
): Promise<CircuitExtractionResult> {
  if (!additionalPrompt?.trim()) {
    return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
  }

  logger.info('🤖 AI Circuit Extraction Starting (GPT-5 Mini)', { 
    promptLength: additionalPrompt.length,
    installationType 
  });

  // Fix 6: Add debug logging
  const extractionStartTime = Date.now();
  logger.info('🔍 Starting AI circuit extraction', {
    promptLength: additionalPrompt.length,
    installationType,
    timestamp: new Date().toISOString()
  });

  try {
    // Fix 4: Optimized prompt (reduced from ~800 to ~480 tokens)
    const systemPrompt = `Extract electrical circuits from installation description as JSON.

OUTPUT FORMAT:
{
  "circuits": [{
    "name": "Circuit name",
    "loadType": "socket|lighting|shower|cooker|ev-charger|outdoor|other",
    "loadPower": 1000,
    "quantity": 1,
    "cableLength": 20,
    "phases": "single|three",
    "specialLocation": "bathroom|outdoor|kitchen|none"
  }],
  "specialRequirements": ["BS 7671 specific requirements"],
  "installationConstraints": ["Installation method constraints"]
}

RULES:
- Extract ALL circuits mentioned
- For "4 socket rings" set quantity: 4
- Infer power ratings: socket=7200W, lighting=500W, cooker=11000W
- Default cable length: 20m (domestic), 30m (commercial)
- Always specify specialLocation for bathrooms/outdoors`;

    const userPrompt = `Installation type: ${installationType}
Description: ${additionalPrompt}

Extract ALL circuits with their specifications.`;

    // Import OpenAI provider
    const { callOpenAI, withRetry } = await import('../_shared/ai-providers.ts');

    // Fix 1: Reduced timeout from 35s to 20s
    const EXTRACTION_TIMEOUT = 20000; // 20s - fail fast
    
    // Fix 2: Parallel AI + Regex fallback race
    const aiExtractionPromise = withRetry(async () => {
      // Fix 1: Early termination at 15s instead of 30s
      const elapsed = Date.now() - extractionStartTime;
      if (elapsed > 15000) {
        logger.warn('⚠️ Circuit extraction exceeding 15s, forcing timeout', { elapsed });
        throw new Error('Extraction timeout - using fallback');
      }
      
      return await callOpenAI({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'gpt-5-mini-2025-08-07',
        // GPT-5 models don't support temperature parameter
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
      tool_choice: { type: 'function', function: { name: 'extract_circuits' } }
    }, openAiKey, EXTRACTION_TIMEOUT); // 20s timeout - fail fast
    }, {
      maxAttempts: 2, // Fix 1: Reduced from 3 to 2
      backoff: [500, 1000] // Fix 1: Faster retries (500ms, 1000ms)
    });

    // Fix 2: Create regex fallback promise
    const regexFallbackPromise = new Promise<CircuitExtractionResult>((resolve) => {
      setTimeout(() => {
        logger.info('🔄 Starting parallel regex fallback');
        const fallbackCircuits = parseCircuitsWithRegex(additionalPrompt, logger);
        resolve({
          inferredCircuits: fallbackCircuits,
          specialRequirements: [],
          installationConstraints: []
        });
      }, 15000); // Start after 15s if AI hasn't completed
    });

    // Fix 2: Race AI extraction vs regex fallback
    const winner = await Promise.race([
      aiExtractionPromise.then(result => ({ type: 'ai' as const, result })),
      regexFallbackPromise.then(result => ({ type: 'regex' as const, result }))
    ]);

    let finalResult: any;
    
    if (winner.type === 'ai') {
      if (!winner.result.toolCalls || winner.result.toolCalls.length === 0) {
        logger.warn('⚠️ No tool call in GPT-5 Mini response, using regex fallback');
        const fallbackCircuits = parseCircuitsWithRegex(additionalPrompt, logger);
        finalResult = {
          inferredCircuits: fallbackCircuits,
          specialRequirements: [],
          installationConstraints: []
        };
      } else {
        const extractedData = JSON.parse(winner.result.content);
        const circuits: ExtractedCircuit[] = extractedData.circuits || [];
        
        const elapsed = Date.now() - extractionStartTime;
        logger.info('✅ AI Extraction Complete', {
          circuitsFound: circuits.length,
          totalWithQuantities: circuits.reduce((sum, c) => sum + (c.quantity || 1), 0),
          elapsed: `${elapsed}ms`,
          tokensEstimate: additionalPrompt.length * 0.75
        });

        const expandedCircuits = expandCircuitsByQuantity(circuits, logger);
        
        finalResult = {
          inferredCircuits: expandedCircuits,
          specialRequirements: extractedData.specialRequirements || [],
          installationConstraints: extractedData.installationConstraints || []
        };
      }
    } else {
      // Regex fallback won the race
      logger.info('⚡ Regex fallback completed first (AI too slow)');
      finalResult = winner.result;
    }

    return finalResult;

  } catch (error) {
    const timeElapsed = Date.now() - extractionStartTime;
    logger.warn('⚠️ AI extraction failed, using regex fallback', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      timeElapsed: `${timeElapsed}ms`
    });
    
    // Immediate fallback to regex parser on timeout
    const fallbackCircuits = parseCircuitsWithRegex(additionalPrompt, logger);
    
    return { 
      inferredCircuits: fallbackCircuits, 
      specialRequirements: [], 
      installationConstraints: [] 
    };
  }
}

/**
 * Fallback regex-based circuit parser (instant, no AI calls)
 */
function parseCircuitsWithRegex(prompt: string, logger: any): any[] {
  const circuits: any[] = [];
  const lowerPrompt = prompt.toLowerCase();
  
  // Simple pattern matching for common circuits
  const patterns = [
    { regex: /(\d+)\s*socket\s*ring/gi, loadType: 'socket', power: 7200 },
    { regex: /(\d+)\s*lighting\s*circuit/gi, loadType: 'lighting', power: 500 },
    { regex: /(\d+\.?\d*)\s*kw\s*shower/gi, loadType: 'shower', power: 0, multiplier: 1000 },
    { regex: /(\d+\.?\d*)\s*kw\s*cooker/gi, loadType: 'cooker', power: 0, multiplier: 1000 },
    { regex: /(\d+\.?\d*)\s*kw\s*ev\s*charger/gi, loadType: 'ev-charger', power: 0, multiplier: 1000 }
  ];
  
  patterns.forEach((pattern, idx) => {
    const matches = [...prompt.matchAll(pattern.regex)];
    matches.forEach((match, matchIdx) => {
      const qty = parseInt(match[1]) || 1;
      const power = pattern.multiplier ? parseFloat(match[1]) * pattern.multiplier : pattern.power;
      
      for (let i = 1; i <= qty; i++) {
        circuits.push({
          id: `regex-${idx}-${matchIdx}-${i}`,
          name: `${pattern.loadType} ${circuits.length + 1}`,
          loadType: pattern.loadType,
          loadPower: power,
          cableLength: 25,
          phases: 'single',
          specialLocation: 'none'
        });
      }
    });
  });
  
  logger.info('📝 Regex fallback extracted circuits', { count: circuits.length });
  return circuits;
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
