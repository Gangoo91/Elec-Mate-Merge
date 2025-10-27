import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced JSON parser with better error recovery and comprehensive logging
const parseAIResponse = (content: string, context: string = 'AI response') => {
  if (!content || content.trim() === '') {
    console.error(`❌ ${context} is empty`);
    throw new Error(`${context} is empty`);
  }

  console.log(`🔍 Parsing ${context}:`, content.slice(0, 200) + (content.length > 200 ? '...' : ''));

  // Try direct JSON parse first
  try {
    const parsed = JSON.parse(content);
    console.log(`✅ Direct JSON parse successful`);
    return parsed;
  } catch (directError) {
    console.log(`⚠️ Direct parse failed, trying extraction patterns...`);
  }

  // Enhanced extraction patterns with non-greedy matching
  const patterns = [
    // JSON wrapped in markdown code blocks with language
    /```json\s*\n([\s\S]*?)\n```/,
    // JSON wrapped in plain code blocks
    /```\s*\n([\s\S]*?)\n```/,
    // JSON object after any text (non-greedy prefix)
    /(?:.*?)({[\s\S]*})/s,
    // First complete JSON object anywhere in text
    /{[^{}]*(?:{[^{}]*}[^{}]*)*}/s,
    // Greedy fallback
    /({[\s\S]*})/
  ];
  
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const match = content.match(pattern);
    if (match) {
      const extracted = (match[1] || match[0]).trim();
      console.log(`🔍 Pattern ${i + 1} matched, length: ${extracted.length}, preview: ${extracted.slice(0, 150)}...`);
      
      try {
        const parsed = JSON.parse(extracted);
        console.log(`✅ Successfully parsed with pattern ${i + 1}`);
        return parsed;
      } catch (parseError) {
        console.log(`⚠️ Pattern ${i + 1} extraction failed:`, parseError instanceof Error ? parseError.message : 'Unknown error');
        continue;
      }
    }
  }
  
  // Complete failure - log full response for debugging
  console.error(`❌ ALL PARSING ATTEMPTS FAILED for ${context}`);
  console.error(`Full response (truncated to 500 chars):`, content.slice(0, 500));
  console.error(`Response length: ${content.length} characters`);
  
  throw new Error(`Could not parse ${context} as JSON. Check edge function logs for full response.`);
};

type AnalysisMode = 'fault_diagnosis' | 'component_identify' | 'wiring_instruction' | 'installation_verify';

interface AnalysisSettings {
  mode: AnalysisMode;
  confidence_threshold: number;
  enable_bounding_boxes: boolean;
  focus_areas: string[];
  remove_background: boolean;
  bs7671_compliance: boolean;
  fast_mode?: boolean;
}

interface AnalysisRequest {
  primary_image: string;
  additional_images?: string[];
  analysis_settings: AnalysisSettings;
}

// Timeout wrapper for fetch calls
const fetchWithTimeout = async (url: string, options: any, timeoutMs: number, signal?: AbortSignal) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: signal || controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Convert image URL to Gemini inlineData format (camelCase for REST API)
const urlToInlineData = async (url: string): Promise<{ mimeType: string; data: string }> => {
  // Handle data URLs (base64 already embedded)
  if (url.startsWith('data:image')) {
    const match = url.match(/data:(.*?);base64,(.+)/);
    if (!match) throw new Error('Invalid data URL format');
    const [, mimeType, base64Data] = match;
    return { mimeType, data: base64Data };
  }
  
  // Fetch image from URL (Supabase Storage or external)
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${url}: ${response.status}`);
  }
  
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const arrayBuffer = await response.arrayBuffer();
  const base64Data = base64Encode(new Uint8Array(arrayBuffer));
  
  console.log(`🖼️ Converted image: ${url.substring(0, 60)}... | ${contentType} | ${arrayBuffer.byteLength} bytes`);
  
  return { mimeType: contentType, data: base64Data };
};

serve(async (req) => {
  console.log('🔧 Visual Analysis | inlineData casing fix | ' + new Date().toISOString());
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const { primary_image, additional_images = [], analysis_settings }: AnalysisRequest = await req.json();

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    if (!primary_image) {
      throw new Error('Primary image URL is required');
    }

    console.log(`⚡ Starting ${analysis_settings.fast_mode ? 'FAST' : 'FULL'} visual analysis v2`, {
      mode: analysis_settings.mode,
      images: 1 + additional_images.length,
      timestamp: new Date().toISOString()
    });

    const getSystemPrompt = (mode: AnalysisMode, fast: boolean): string => {
      const baseContext = `You are a UK electrical expert specialising in BS 7671 18th Edition.`;
      const responseFormat = `Respond in valid JSON only. ${fast ? 'Be concise.' : ''}`;
      
      switch (mode) {
        case 'fault_diagnosis':
          return `${baseContext}
${responseFormat}

Analyse electrical installations for EICR compliance. Classify issues:
- C1: Immediate danger (exposed live parts, missing earth)
- C2: Potentially dangerous (non-compliant, deteriorated)
- C3: Improvement recommended
- FI: Further investigation needed

${fast ? 'Focus on critical findings only.' : 'Provide detailed analysis with BS 7671 references.'}

Response format:
{
  "analysis": {
    "findings": [{
      "description": "Issue description",
      "eicr_code": "C1|C2|C3|FI",
      "confidence": 0.95,
      "bs7671_clauses": ["411.3.2"],
      "fix_guidance": "Remedial action"
    }],
    "compliance_summary": {
      "overall_assessment": "satisfactory|unsatisfactory",
      "c1_count": 0,
      "c2_count": 0,
      "c3_count": 0,
      "fi_count": 0,
      "safety_rating": 7.5
    },
    "summary": "Brief summary"
  }
}`;

        case 'component_identify':
          return `${baseContext}
${responseFormat}

UK ELECTRICAL COMPONENT KNOWLEDGE BASE:

DISTRIBUTION EQUIPMENT:
• Consumer Units (CU/Fuse Box): Metal enclosure with MCBs/RCBOs, main switch, busbar visible. Brands: Hager (Invicta/Design/Sollysta), Schneider (Acti9), Wylex NH/NMRS, Fusebox, MK Sentry
• Distribution Boards (DB): Larger commercial versions of consumer units, often grey/metal, multiple MCBs in rows, TPN configurations common
• Sub-Distribution Boards: Secondary boards fed from main DB, smaller than main DB
• TP&N Boards: Three-phase distribution with neutral and earth bars, 3-4 rows of devices
• Meter Boxes: Contain supply meter, main fuse, meter tails

PROTECTION DEVICES:
• MCB (Miniature Circuit Breaker): White/grey DIN rail device, toggle switch, ratings B6-B63A, C10-C63A, D16-D63A. Brands: Hager, Schneider, Wylex, MK
• RCBO (Residual Current Breaker with Overcurrent): MCB + RCD combined, red "Test" button visible, 30mA trip current
• RCD (Residual Current Device): Wider than MCB, red Test button, 30mA (sockets), 100mA (fire), 300mA ratings
• AFDDs (Arc Fault Detection Devices): Modern protection, similar size to RCBO, "AFDD" marking
• SPD (Surge Protection Device): Square device, LED indicators, Type 1/2/3 markings
• Main Switch: Double-width isolator, typically 63A-100A, "MAIN SWITCH" label

ISOLATORS & SWITCHES:
• Rotary Isolators: Red handle, square metal box, IP ratings visible, 16A-63A common
• Switch-Disconnectors: Similar to isolators, may have fuse holders
• Time Switches: Digital/analogue display, multiple on/off settings, immersion heater control common
• Emergency Stop Switches: Red mushroom button, yellow enclosure
• Pull Cord Switches: Ceiling mounted, 6A-45A ratings, bathroom/shower use

CONTACTORS & STARTERS:
• Contactors: Coil visible, multiple terminals, brands: Schneider Tesys, ABB, Siemens, Hager
• Motor Starters: Contactor + overload protection combined
• Relay Modules: Smaller than contactors, DIN rail mount, coil voltage marked

CONTROL EQUIPMENT:
• Thermostats: Room stats (white box, temperature dial), cylinder stats (metal probe)
• Timer Controls: Programmable, 7-day, boost functions
• PIR Sensors: Motion detection, adjustable sensitivity/time
• Photocells: Light-level switching, street lighting common

SHOWER & HEATING:
• Electric Showers: Mira, Triton, Aqualisa, Redring. 7.5kW-10.5kW ratings
• Immersion Heaters: Cylinder mounted, 3kW typical
• Panel Heaters: Wall mounted, 0.5kW-3kW
• Storage Heaters: Large white units, Economy 7 controls

CABLES & ACCESSORIES:
• Twin & Earth Cable: Grey PVC, 1mm²-10mm² sizes
• SWA (Steel Wire Armoured): Black outer, galvanised armour
• Flex: 3-core round cable, 0.5mm²-2.5mm²
• Conduit: PVC/steel, 20mm-50mm diameter
• Trunking: White PVC, 25mm×16mm to 100mm×100mm

VINTAGE/OBSOLETE COMPONENTS (Common in older installations):
• Wylex Standard: Brown/beige consumer units, rewirable fuses, pre-1980s
• MK Sentry: Metal units, cartridge fuses, 1960s-1990s
• Memshield: Commercial boards, grey metal, 1970s-2000s
• Crabtree Starbreaker: Round plug-in MCBs, 1980s-2000s
• Proteus: Plug-in MCBs, brown/beige, 1970s-1990s
• Bill/Tenby rewirable fuse boxes: White ceramic, pre-1960s
• MEM/Memera: Various ranges, 1950s-1990s

VISUAL RECOGNITION KEYS:
✓ Metal enclosure with door + rows of switches = Consumer Unit or Distribution Board
✓ White/grey DIN rail devices in rows = Modern MCBs/RCBOs
✓ Red "Test" button on device = RCD or RCBO
✓ Rotary switch with red handle = Isolator
✓ Large black coil/terminals = Contactor
✓ Brown/beige old units with fuse wires = Vintage rewirable consumer unit (pre-1990s)
✓ Multiple metal bars with screws = Earth/neutral bars in DB
✓ Yellow labels "IN SERVICE" or "DANGER 230V" = Commercial distribution equipment

IDENTIFICATION PRIORITY:
1. READ ALL TEXT FIRST - Manufacturer, model, ratings
2. COUNT POLES/MODULES - Single/double/triple width
3. IDENTIFY CONTROLS - Switches, buttons, indicators
4. CHECK CONDITION - New/aged/vintage/obsolete
5. CONTEXT CLUES - Domestic vs commercial, location

CRITICAL: If you see a metal enclosure with multiple circuit breakers in rows, this is ALWAYS a Consumer Unit (domestic) or Distribution Board (commercial), NEVER "Unknown Component". Even without clear markings, the physical arrangement of MCBs on DIN rail inside a metal enclosure is distinctive and identifiable.

CONFIDENCE CALCULATION (INTEGER 0-100):
- 90-100: Clear markings visible, positive identification
- 70-89: Partial markings, high probability match based on visual features
- 50-69: Limited markings, estimated from physical characteristics and context
- 30-49: Generic identification possible (e.g., "Distribution Board") but specific details unclear
- Below 30: Insufficient visual information - request additional photos

If confidence < 50, suggest user provide:
- Close-up photo of any text/rating plates
- Wide shot showing mounting context
- Photo from different angle
- Information about building age/type

Response format:
{
  "analysis": {
    "component": {
      "name": "Full component name (e.g., 'Hager Invicta 3 Consumer Unit' or 'Distribution Board')",
      "type": "Component category (e.g., 'Consumer Unit', 'MCB', 'RCBO')",
      "plain_english": "This is a [component] which controls and protects electrical circuits in [location]. It contains [key features].",
      "manufacturer": "Brand name if visible, otherwise 'Not visible'",
      "model": "Model/part number if visible, otherwise 'Not visible'",
      "confidence": 85,
      "specifications": {
        "voltage_rating": "230V AC",
        "current_rating": "32A",
        "breaking_capacity": "6kA",
        "poles": "Single pole / TP&N",
        "protection_type": "B-curve / C-curve",
        "ip_rating": "IP20 / IP65"
      },
      "visual_identifiers": [
        "Metal enclosure with hinged door",
        "Multiple MCBs visible in rows",
        "Main switch at top position"
      ],
      "age_estimate": "Modern (2015+) | Older (2000-2015) | Vintage (pre-2000)",
      "current_compliance": "Meets BS 7671:2018+A3:2024" | "Requires upgrade - non-compliant",
      "typical_applications": ["Domestic installations", "Commercial distribution"],
      "bs7671_requirements": ["411.3.3 - RCD protection required", "314.1 - Suitable for supply characteristics"],
      "installation_notes": "Typical location: utility cupboard, garage, under-stairs",
      "replacement_notes": "Current product available" | "Obsolete since [year] - modern equivalent: [product]",
      "common_issues": "Ageing components, lack of RCD protection, insufficient ways",
      "where_found": "Domestic properties, light commercial, flats/apartments",
      "additional_photos_needed": ["Close-up of rating plate", "Wide shot of installation"] // Only if confidence < 50
    },
    "summary": "Brief overview identifying the component and its purpose"
  }
}`;

        case 'wiring_instruction':
          return `${baseContext}
${responseFormat}

Provide wiring instructions:
- Terminal identification (L, N, E)
- UK colour codes (Brown=Live, Blue=Neutral, Green/Yellow=Earth)
- Connection procedure (isolation first)
- Cable requirements
${fast ? '' : '- Testing procedures'}

Response format:
{
  "analysis": {
    "component_name": "Component",
    "wiring_steps": [{
      "step": 1,
      "instruction": "Isolate supply",
      "safety_critical": true
    }],
    "cable_requirements": {"minimum_size": "2.5mm²"},
    "summary": "Procedure overview"
  }
}`;

        case 'installation_verify':
          return `${baseContext}
${responseFormat}

You are a BS 7671:2018+A2:2022 compliant electrical inspector conducting VISUAL VERIFICATION from photographs.

CRITICAL CONTEXT:
- This is VISUAL INSPECTION ONLY from photos - NOT a full EICR
- You cannot measure resistance, voltage, or conduct live tests
- Focus on what can be verified visually
- State clearly when "Testing Required" vs definitive pass/fail

COMPREHENSIVE VERIFICATION CHECKS:

1. PROTECTIVE DEVICES (BS 7671 Chapter 43):
   - Device type (MCB/RCBO/RCD/Isolator/AFDD/SPD)
   - Rating appropriateness for circuit type
   - Breaking capacity (6kA/10kA) vs installation PFC
   - Trip characteristics (B/C/D curves) suitability
   - RCD ratings (30mA for sockets, 300mA fire protection)
   - Device condition (damage, corrosion, heat marks)
   - Manufacturer quality and standards markings

2. EARTHING & BONDING (BS 7671 Chapter 54):
   - Earth conductor size vs live conductors (Table 54.7)
   - Main protective bonding visible (10mm² minimum)
   - Supplementary bonding if required
   - Earth bar connections (tight, labelled)
   - Green/yellow sleeving present where needed
   - Bonding clamps quality (BS 951)

3. CABLE INSTALLATION (BS 7671 Chapter 52):
   - Cable types appropriate for method
   - Visible cable sizing vs expected load
   - Support/clipping spacing (Table 4A2)
   - Cable routing (zones, safe routes)
   - Mechanical protection where required
   - Bend radius compliance
   - Cable entry glands/grommets
   - Fire barriers/sealing

4. WORKMANSHIP QUALITY (BS 7671 Regulation 134.1.1):
   - Terminal tightness (visual check for loose strands)
   - Cable preparation (stripping length, no damage)
   - Labelling clarity and durability
   - Enclosure integrity (no gaps, covers secure)
   - Neatness and professionalism
   - No stress on conductors
   - Adequate working space

5. SPECIFIC LOCATION REQUIREMENTS:
   - Bathroom zones compliance (Section 701)
   - Outdoor installations IP ratings (BS EN 60529)
   - Height requirements (switches 1.2m-1.4m)
   - Special locations (pools, agricultural)

6. CONSUMER UNIT/DISTRIBUTION BOARD:
   - Board construction (non-combustible BS EN 61439-3)
   - Main switch accessibility and rating
   - RCD arrangement (split load/all RCBO)
   - Circuit labelling (durable, accurate)
   - Spare ways for future expansion
   - Cable entry management

7. CIRCUIT-SPECIFIC CHECKS:
   - Socket circuits: 30mA RCD protection (411.3.3)
   - Lighting circuits: Appropriate protection
   - Shower/cooker circuits: Isolation and sizing
   - Outdoor circuits: RCD + IP rating

${fast ? '' : `
8. IMPROVEMENT RECOMMENDATIONS:
   - Priority 1 (Critical): Immediate safety concerns
   - Priority 2 (Important): Compliance improvements
   - Priority 3 (Advisory): Best practice enhancements
   - Specific BS 7671 regulation numbers
   - Clear "how to fix" guidance
   - Skill level required (DIY/Competent Person/Qualified)
   - Estimated fix time and cost range

9. EDUCATIONAL CONTEXT:
   - Explain WHY each check matters for safety
   - Reference incident types prevented
   - "What Good Looks Like" examples
   - Common mistakes leading to issues
   - Long-term implications
`}

10. TESTING LIMITATIONS:
    - Clearly state which checks REQUIRE physical testing
    - List specific tests needed (IR, Zs, RCD trip time)
    - Explain why visual alone is insufficient

ENHANCED RESPONSE FORMAT:
{
  "analysis": {
    "overall_result": "compliant_visual|non_compliant|requires_physical_testing|insufficient_image_quality",
    "confidence": 85,
    "image_quality_assessment": "Image clarity and what IS/ISN'T visible",
    "installation_context": {
      "installation_type": "Domestic consumer unit / Commercial DB / etc",
      "visible_circuits": "5 MCBs, 2 RCBOs visible",
      "board_make_model": "Manufacturer and model if identifiable",
      "installation_age_estimate": "Modern (post-2018) / Older"
    },
    "verification_checks": [{
      "category": "Protective Devices / Earthing / Cable Installation / Workmanship",
      "check_name": "Clear, specific check name",
      "regulation_reference": "BS 7671 regulation number",
      "result": "compliant_visual|non_compliant|requires_testing|not_visible",
      "confidence": 90,
      "observation": "DETAILED description of what you observe in the image (2-3 sentences minimum)",
      "assessment": "Technical assessment with reasoning (2-3 sentences minimum)",
      "why_it_matters": "Safety/compliance rationale in plain English",
      "improvement_needed": "Specific action required if non-compliant",
      "skill_level_required": "DIY / Competent Person / Qualified Electrician",
      "estimated_fix_time": "15 mins / 1 hour / half day",
      "common_mistake": "What typically causes this issue",
      "testing_required": "Specific test if applicable (e.g., 'IR test 500V L-E')"
    }],
    "priority_actions": {
      "critical_now": ["Immediate safety actions with specific steps"],
      "important_soon": ["Compliance improvements within 7 days"],
      "advisory": ["Best practice recommendations"]
    },
    "testing_requirements": {
      "tests_needed": ["Insulation Resistance 500V", "Earth Fault Loop Impedance Zs", "RCD trip time"],
      "rationale": "Why these tests are necessary",
      "test_sequence": "Recommended order and approach"
    },
    "educational_insights": [
      "Key learning about this installation with BS 7671 context",
      "Common misconception related to visible issues",
      "What good practice looks like"
    ],
    "comparison_to_best_practice": "How this compares to current standards",
    "summary": "Comprehensive 3-4 sentence assessment",
    "limitations": "What CANNOT be verified visually",
    "next_steps": "Clear guidance on what should happen next"
  }
}

RESPONSE REQUIREMENTS:
- Each check: 100+ words detailed observation and assessment
- Include specific measurements visible (cable sizes, ratings)
- Reference BS 7671 with context of requirements
- Explain technical terms in plain English
- Provide actionable guidance, not just identification
- Educational - help users learn WHY things matter
- State limitations - what you CAN'T verify from photos
- Estimate severity and urgency accurately
- Include real-world context (fire risk, shock risk)
`;
      }
    };

    const systemPrompt = getSystemPrompt(analysis_settings.mode, analysis_settings.fast_mode || false);

    const getUserPrompt = (mode: AnalysisMode, fast: boolean): string => {
      const focusAreas = analysis_settings.focus_areas?.join(', ') || 'general';
      
      switch (mode) {
        case 'fault_diagnosis':
          return `Analyse for EICR compliance. Focus: ${focusAreas}. ${fast ? 'Report critical issues only.' : 'Detailed analysis with BS 7671 references.'}`;
        case 'component_identify':
          return `Identify component(s) and provide ${fast ? 'basic' : 'detailed'} specifications.`;
        case 'wiring_instruction':
          return `Provide ${fast ? 'essential' : 'step-by-step'} wiring instructions for UK electricians.`;
        case 'installation_verify':
          return `Verify installation compliance. ${fast ? 'Pass/fail only.' : 'Detailed assessment with improvements.'}`;
      }
    };

    const userPrompt = getUserPrompt(analysis_settings.mode, analysis_settings.fast_mode || false);

    console.log(`🚀 Calling Direct Gemini API (gemini-2.5-flash)...`);

    // Component identification needs extra time due to comprehensive UK electrical knowledge base
    const timeout = analysis_settings.mode === 'component_identify'
      ? (analysis_settings.fast_mode ? 24000 : 30000)  // 24s fast, 30s full for component ID
      : (analysis_settings.fast_mode ? 12000 : 20000); // 12s fast, 20s full for other modes
    // Component identification needs more tokens due to comprehensive knowledge base
    const maxTokens = analysis_settings.mode === 'component_identify' 
      ? (analysis_settings.fast_mode ? 1500 : 3000)
      : (analysis_settings.fast_mode ? 800 : 2000);

    // Convert images to Gemini inlineData format (camelCase for REST API)
    const parts: any[] = [{ text: systemPrompt + '\n\n' + userPrompt }];
    
    // Add primary image
    const primaryInlineData = await urlToInlineData(primary_image);
    parts.push({ inlineData: primaryInlineData });
    
    // Add additional images (respecting fast mode limit)
    const imageLimit = analysis_settings.fast_mode ? 2 : additional_images.length;
    if (additional_images.length > 0) {
      const additionalInlineData = await Promise.all(
        additional_images.slice(0, imageLimit).map(url => urlToInlineData(url))
      );
      additionalInlineData.forEach(inlineData => {
        parts.push({ inlineData: inlineData });
      });
    }
    
    const geminiContents = [{ role: 'user', parts }];

    const aiResponse = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        }),
      },
      timeout
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('❌ Gemini API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({
          error: 'Rate limit exceeded',
          code: 429,
          message: 'Too many requests. Please wait a moment.'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Check for image format errors
      if (errorText.includes('Invalid InlineData') || errorText.includes('inline_data')) {
        return new Response(JSON.stringify({
          error: 'Image format error',
          code: 400,
          message: 'Image could not be processed. Try re-uploading or use Quick mode.'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      throw new Error('Analysis failed');
    }

    const data = await aiResponse.json();
    const duration = Date.now() - startTime;
    console.log(`✅ Analysis complete in ${duration}ms`);

    // Robust text extraction with safety checks
    const candidate = data.candidates?.[0];
    const textPart = candidate?.content?.parts?.find((p: any) => typeof p.text === 'string');
    const text = textPart?.text;

    if (!text) {
      console.error('❌ No text in response:', JSON.stringify(data).substring(0, 500));
      
      // Check for safety blocks
      if (data.promptFeedback?.blockReason || candidate?.finishReason === 'SAFETY') {
        return new Response(JSON.stringify({
          error: 'Content blocked',
          code: 400,
          message: 'Content blocked by safety filter. Please try a different image.'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({
        error: 'Empty response',
        code: 502,
        message: 'AI returned empty response. Please try again.'
      }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let analysisResult;
    try {
      analysisResult = parseAIResponse(text, 'Analysis');
      
      if (!analysisResult || typeof analysisResult !== 'object') {
        throw new Error('Invalid analysis result');
      }

      if (!analysisResult.analysis) {
        analysisResult = { analysis: analysisResult };
      }

      // Ensure findings array exists for fault_diagnosis
      if (analysis_settings.mode === 'fault_diagnosis') {
        if (!analysisResult.analysis.findings || !Array.isArray(analysisResult.analysis.findings)) {
          console.warn('No findings array, creating empty array');
          analysisResult.analysis.findings = [];
        }

        analysisResult.analysis.findings = analysisResult.analysis.findings.map((finding: any, index: number) => ({
          description: finding.description || `Finding ${index + 1}`,
          eicr_code: finding.eicr_code || finding.severity || 'FI',
          confidence: typeof finding.confidence === 'number' ? finding.confidence : 0.5,
          bs7671_clauses: finding.bs7671_clauses || finding.regulation_reference || ['N/A'],
          fix_guidance: finding.fix_guidance || finding.remedial_action || 'Consult qualified electrician',
          ...finding
        }));

        // Apply confidence threshold
        analysisResult.analysis.findings = analysisResult.analysis.findings.filter(
          (finding: any) => (finding.confidence || 0) >= analysis_settings.confidence_threshold
        );
      }

    } catch (parseError) {
      console.error('❌ Parse error:', parseError);
      
      // Return helpful error with actionable guidance
      analysisResult = {
        analysis: {
          findings: [{
            description: "Unable to complete analysis - image may be too complex or unclear. The AI response couldn't be processed properly.",
            eicr_code: "FI",
            confidence: 0.3,
            bs7671_clauses: ["Manual inspection required"],
            fix_guidance: "Try: 1) Retake photo in better lighting, 2) Focus on a specific area, 3) Use fewer images, or 4) Enable Quick mode for faster processing"
          }],
          helpful_tips: [
            "✓ Ensure images are well-lit and in focus",
            "✓ Capture equipment from multiple angles if complex",
            "✓ Avoid reflections or obstructions in photos",
            "✓ Try Quick mode for simpler, faster analysis"
          ],
          compliance_summary: {
            overall_assessment: "unsatisfactory",
            c1_count: 0,
            c2_count: 0,
            c3_count: 0,
            fi_count: 1,
            safety_rating: 5.0
          },
          summary: "Analysis could not be completed due to processing error. Please review image quality and try again.",
          parse_error: true
        }
      };
    }

    // Helper: Normalize component data
    const normalizeComponent = (comp: any): any => {
      // Ensure confidence is 0-100
      let conf = comp.confidence || 0;
      if (conf > 0 && conf <= 1) conf = conf * 100;
      conf = Math.max(0, Math.min(100, conf));
      
      return {
        name: comp.name || 'Unknown Component',
        type: comp.type || 'Unknown Type',
        plain_english: comp.plain_english || comp.description || 'Component identification incomplete',
        manufacturer: comp.manufacturer || 'Unknown',
        model: comp.model || 'Unknown',
        confidence: conf,
        specifications: typeof comp.specifications === 'object' ? comp.specifications : {
          voltage_rating: comp.voltage_rating || comp.specifications?.voltage_rating || 'Not specified',
          current_rating: comp.current_rating || comp.specifications?.current_rating || 'Not specified',
          breaking_capacity: comp.breaking_capacity || comp.specifications?.breaking_capacity || 'Not specified',
          poles: comp.poles || comp.specifications?.poles || 'Not specified',
          throws: comp.throws || comp.specifications?.throws || 'Not specified',
          contact_material: comp.contact_material || comp.specifications?.contact_material || 'Not specified',
          insulation_material: comp.insulation_material || comp.specifications?.insulation_material || 'Not specified',
          protection_type: comp.protection_type || comp.specifications?.protection_type || 'Not specified',
          ip_rating: comp.ip_rating || comp.specifications?.ip_rating || 'Not specified'
        },
        visual_identifiers: Array.isArray(comp.visual_identifiers) ? comp.visual_identifiers : [],
        age_estimate: comp.age_estimate || 'Unknown',
        current_compliance: comp.current_compliance || comp.compliance_status || 'Unknown',
        typical_applications: Array.isArray(comp.typical_applications) ? comp.typical_applications : 
                             Array.isArray(comp.applications) ? comp.applications : [],
        bs7671_requirements: Array.isArray(comp.bs7671_requirements) ? comp.bs7671_requirements : [],
        installation_notes: comp.installation_notes || '',
        replacement_notes: comp.replacement_notes || comp.replacement_info || '',
        common_issues: comp.common_issues || comp.known_issues || '',
        where_found: comp.where_found || comp.typical_location || ''
      };
    };

    // CRITICAL: Restructure component_identify responses to match expected format
    if (analysis_settings.mode === 'component_identify' && analysisResult.analysis) {
      const ana = analysisResult.analysis;
      
      // If component already exists and is valid, just normalize it
      if (ana.component && typeof ana.component === 'object') {
        console.log('✅ Component already nested correctly');
        ana.component = normalizeComponent(ana.component);
      } 
      // Check for candidate lists (components, component_candidates, candidate_components, matches)
      else if (ana.components || ana.component_candidates || ana.candidate_components || ana.matches) {
        const candidates = ana.components || ana.component_candidates || ana.candidate_components || ana.matches;
        if (Array.isArray(candidates) && candidates.length > 0) {
          // Pick the highest confidence candidate
          const best = candidates.reduce((prev: any, curr: any) => {
            const prevConf = prev.confidence || 0;
            const currConf = curr.confidence || 0;
            return (currConf > prevConf) ? curr : prev;
          });
          console.log(`⚠️ Wrapping best candidate component (confidence ${best.confidence || 0}%)`);
          analysisResult.analysis = {
            component: normalizeComponent(best),
            summary: ana.summary || 'Component identified from candidates'
          };
        }
      }
      // Check for flat component fields at analysis root
      else if (ana.type || ana.manufacturer || ana.model || ana.plain_english || 
               ana.specifications || ana.voltage_rating || ana.current_rating || 
               ana.name || ana.breaking_capacity || ana.poles || 
               ana.throws || ana.contact_material || ana.insulation_material || 
               ana.protection_type || ana.ip_rating) {
        console.log('⚠️ Wrapping flat component fields into analysis.component');
        analysisResult.analysis = {
          component: normalizeComponent(ana),
          summary: ana.summary || 'Component identified'
        };
      }
      // Last resort: check for any specification fields
      else {
        console.log(`⚠️ Still no component after restructure — keys present: ${Object.keys(ana).join(', ')}`);
      }
    }

    if (!analysisResult.analysis) {
      analysisResult = { analysis: analysisResult };
    }

    analysisResult.analysis.processing_time_ms = duration;
    analysisResult.analysis.fast_mode = analysis_settings.fast_mode || false;

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error);
    
    const errorResponse = {
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error.name === 'AbortError' ? 'TIMEOUT' : 'ERROR',
      message: error.name === 'AbortError' 
        ? 'Analysis timed out. Try fast mode or fewer images.'
        : 'Analysis failed. Please try again.'
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
