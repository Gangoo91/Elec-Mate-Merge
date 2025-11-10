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

    // Import OpenAI provider and timeout utilities
    const { callOpenAI, withRetry, withTimeout, AIProviderError } = await import('../_shared/ai-providers.ts');

    // Timeout configuration: allow more time for complex circuit extractions
    const RETRY_TIMEOUT = 90000; // 90s total (1.5 minutes)
    const PER_ATTEMPT_TIMEOUT = 45000; // 45s per OpenAI attempt
    
    // FIX 1: Wrap retry in timeout (NOT the OpenAI call itself)
    const aiExtractionPromise = withTimeout(
      withRetry(async () => {
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
      }, openAiKey, PER_ATTEMPT_TIMEOUT); // 20s per attempt
      }, {
        maxAttempts: 2,
        backoff: [500, 1000]
      }),
      RETRY_TIMEOUT, // 25s total timeout
      'AI circuit extraction'
    );

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
    
    // FIX 4: Detailed error logging instead of "Unknown error"
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'UnknownError',
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 3).join('\n') : undefined,
      isAIProviderError: error instanceof AIProviderError,
      statusCode: (error as any)?.statusCode,
      retryable: (error as any)?.retryable
    };
    
    logger.warn('⚠️ AI extraction failed, using regex fallback', { 
      timeElapsed: `${timeElapsed}ms`,
      ...errorDetails
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
 * FIX 2: Enhanced regex-based circuit parser with keyword inference
 * Fallback for when AI fails - now understands natural language
 */
function parseCircuitsWithRegex(prompt: string, logger: any): any[] {
  const circuits: any[] = [];
  const lowerPrompt = prompt.toLowerCase();
  
  // Existing pattern matching for specific phrases
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
  
  // FIX 2: Keyword-based inference for natural language descriptions
  if (circuits.length === 0) {
    const keywordInference = [
      { 
        keywords: ['kitchen', 'extension', 'appliances'], 
        circuits: [
          { name: 'Kitchen Socket Ring', loadType: 'socket', power: 7200, cableLength: 25 },
          { name: 'Kitchen Lighting', loadType: 'lighting', power: 500, cableLength: 15 }
        ]
      },
      { 
        keywords: ['ev', 'charger', 'electric vehicle', 'car charger'], 
        circuits: [
          { name: 'EV Charger', loadType: 'ev-charger', power: 7400, cableLength: 30 }
        ]
      },
      { 
        keywords: ['workshop', 'cnc', 'machine', 'welding'], 
        circuits: [
          { name: 'Workshop Sockets', loadType: 'socket', power: 7200, cableLength: 30 },
          { name: 'Workshop Lighting', loadType: 'lighting', power: 1000, cableLength: 25 },
          { name: 'Three Phase Supply', loadType: 'other', power: 15000, cableLength: 40, phases: 'three' }
        ]
      },
      { 
        keywords: ['bathroom', 'shower', 'ensuite'], 
        circuits: [
          { name: 'Bathroom Lighting', loadType: 'lighting', power: 500, cableLength: 20, specialLocation: 'bathroom' },
          { name: 'Electric Shower', loadType: 'shower', power: 9500, cableLength: 15, specialLocation: 'bathroom' }
        ]
      },
      { 
        keywords: ['rewire', 'house', 'flat', 'dwelling', 'property'], 
        circuits: [
          { name: 'Downstairs Sockets', loadType: 'socket', power: 7200, cableLength: 30 },
          { name: 'Upstairs Sockets', loadType: 'socket', power: 7200, cableLength: 35 },
          { name: 'Downstairs Lights', loadType: 'lighting', power: 500, cableLength: 25 },
          { name: 'Upstairs Lights', loadType: 'lighting', power: 500, cableLength: 30 }
        ]
      },
      {
        keywords: ['garage', 'outbuilding', 'shed'],
        circuits: [
          { name: 'Garage Sockets', loadType: 'socket', power: 7200, cableLength: 40 },
          { name: 'Garage Lighting', loadType: 'lighting', power: 500, cableLength: 35 }
        ]
      }
    ];
    
    // Find first matching category (2+ keywords OR 40%+ match)
    for (const inference of keywordInference) {
      const matchCount = inference.keywords.filter(kw => lowerPrompt.includes(kw)).length;
      
      if (matchCount >= 2 || matchCount / inference.keywords.length >= 0.4) {
        logger.info(`📝 Regex inferred circuits from keywords: ${inference.keywords.join(', ')}`);
        circuits.push(...inference.circuits.map((c, i) => ({
          ...c,
          id: `inferred-${i}`,
          phases: c.phases || 'single',
          specialLocation: c.specialLocation || 'none'
        })));
        break; // Only infer from first matching category
      }
    }
  }
  
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
