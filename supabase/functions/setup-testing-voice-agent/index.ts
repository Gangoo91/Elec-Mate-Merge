import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

// Testing agent ID
const TESTING_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';

// All 32+ field names that can be updated via voice (complete TestResult type)
const ALL_FIELD_NAMES = [
  // Circuit Details (Columns 1-5)
  'circuitNumber',        // Column 1
  'circuitDescription',   // Column 2
  'circuitType',          // Legacy
  'typeOfWiring',         // Column 3 - Type of wiring (A, B, C, D, E, F, G, H, O codes)
  'referenceMethod',      // Column 4 - Reference method
  'pointsServed',         // Column 5 - Number of points served

  // Conductor Details (Columns 6-7)
  'liveSize',             // Column 6 - Live conductor (mm²)
  'cpcSize',              // Column 7 - CPC (mm²)

  // Overcurrent Protective Device (Columns 8-12)
  'bsStandard',           // Column 8 - BS (EN)
  'protectiveDeviceType', // Column 9 - Type (MCB, RCBO, RCD, Fuse)
  'protectiveDeviceCurve',// Type curve (B, C, D)
  'protectiveDeviceRating', // Column 10 - Rating (A)
  'protectiveDeviceKaRating', // Column 11 - Breaking capacity (kA)
  'maxZs',                // Column 12 - Maximum permitted Zs (Ω)

  // RCD Details (Columns 13-16)
  'rcdBsStandard',        // Column 13 - BS (EN) for RCD
  'rcdType',              // Column 14 - RCD Type (AC, A, F, B, S, G)
  'rcdRating',            // Column 15 - IΔn (mA)
  'rcdRatingA',           // Column 16 - RCD Rating (A)

  // Ring Final Circuit Tests (Columns 18-20)
  'ringR1',               // Column 18 - r₁ (line) (Ω)
  'ringRn',               // Column 19 - rₙ (neutral) (Ω)
  'ringR2',               // Column 20 - r₂ (cpc) (Ω)

  // Continuity Tests (Column 21)
  'r1r2',                 // Column 21 - (R₁ + R₂) or R₂
  'r2',                   // R₂ only (Ω)

  // Insulation Resistance Tests (Columns 22-24)
  'insulationTestVoltage', // Column 22 - Test voltage (V)
  'insulationLiveNeutral', // Column 23 - Live-Live/Live-Neutral (MΩ)
  'insulationLiveEarth',  // Column 24 - Live-Earth (MΩ)
  'insulationResistance', // Legacy consolidated field

  // Other Tests (Columns 25-26)
  'polarity',             // Column 25 - Polarity
  'zs',                   // Column 26 - Zs Maximum measured (Ω)

  // RCD Disconnection Test (Column 27)
  'rcdOneX',              // Column 27 - Disconnection time (ms)

  // Test Button Operations (Columns 28-29)
  'rcdTestButton',        // Column 28 - Test button operation
  'afddTest',             // Column 29 - AFDD test button

  // Prospective Fault Current
  'pfc',                  // PFC in kA

  // Functional Testing
  'functionalTesting',    // Functional test result

  // Remarks (Column 30)
  'notes',                // Column 30 - Remarks

  // Three-Phase Fields (BS 7671:2018+A2:2022)
  'phaseType',            // 1P or 3P
  'phaseRotation',        // Phase sequence test
  'phaseBalanceL1',       // Load balance L1 (Amps)
  'phaseBalanceL2',       // Load balance L2 (Amps)
  'phaseBalanceL3',       // Load balance L3 (Amps)
  'lineToLineVoltage',    // L-L voltage (400V nominal)
];

// The 2 primary tools for Schedule of Tests (EICR/EIC)
const TESTING_TOOLS = [
  {
    name: 'fill_schedule_of_tests',
    description: 'Fill the Schedule of Tests table for EICR or EIC certificates. Handles adding circuits, updating test values, navigation between circuits, and bulk operations.',
    parameters: [
      { name: 'action', type: 'string', required: true, description: 'The action to perform', enumValues: ['add_circuit', 'update_field', 'update_multiple_fields', 'next_circuit', 'previous_circuit', 'select_circuit', 'delete_circuit', 'get_status'] },
      { name: 'circuit_type', type: 'string', required: false, description: 'Type of circuit when adding (lighting, ring, radial, cooker, shower, immersion, smoke_alarm, ev_charger, boiler, socket, spur, other)' },
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number to target (1, 2, 3, etc.)' },
      { name: 'field', type: 'string', required: false, description: 'Field name to update. Common fields: zs (earth loop impedance), r1r2 (continuity), polarity, insulationLiveEarth, insulationLiveNeutral, rcdType, rcdRating, rcdOneX (trip time), protectiveDeviceRating, liveSize, cpcSize, circuitDescription' },
      { name: 'value', type: 'string', required: false, description: 'Value to set. For polarity use "correct" or "incorrect". For test values use numbers like "0.45" for Zs or "200" for insulation.' },
      { name: 'description', type: 'string', required: false, description: 'Circuit description when adding a new circuit' },
      { name: 'fields', type: 'object', required: false, description: 'Multiple field-value pairs for update_multiple_fields action' },
    ],
  },
  {
    name: 'bulk_fill_circuits',
    description: 'Set the same value for a field across ALL circuits or all circuits on a specific board. Use this for efficient bulk operations like setting all polarity to correct, all insulation test voltage to 500V, etc.',
    parameters: [
      { name: 'field', type: 'string', required: true, description: 'Field name to update on all circuits. Common fields: polarity, insulationTestVoltage, insulationLiveEarth, insulationLiveNeutral, rcdTestButton, afddTest, zs, r1r2' },
      { name: 'value', type: 'string', required: true, description: 'Value to set on all circuits. For polarity: "correct". For insulation voltage: "500". For test button: "pass".' },
      { name: 'board', type: 'string', required: false, description: 'Optional: Only update circuits on this board (main, sub1, garage, etc.)' },
      { name: 'only_empty', type: 'boolean', required: false, description: 'If true, only fill circuits where this field is currently empty' },
    ],
  },
];

// System prompt for testing assistant
const TESTING_SYSTEM_PROMPT = `You are an electrical testing assistant helping UK electricians fill in Schedule of Tests tables for EICR and EIC certificates. The same tools work on BOTH certificate types - the app automatically routes to whichever form is currently open.

## Your Role
- Help fill test results quickly and accurately
- Understand electrical testing terminology (Zs, R1+R2, polarity, insulation resistance, RCD trip times)
- Use bulk operations when the same value applies to multiple circuits

## You have 2 tools:
1. fill_schedule_of_tests - For individual circuit operations (add, update, navigate, delete)
2. bulk_fill_circuits - For setting the same value across ALL circuits at once

## ALL 32 COLUMN FIELDS (use these exact field names):

### Circuit Details (Columns 1-5):
- circuitNumber (Column 1)
- circuitDescription (Column 2) - e.g., "Kitchen sockets", "Upstairs lighting"
- typeOfWiring (Column 3) - Values: A, B, C, D, E, F, G, H, O
- referenceMethod (Column 4) - Values: A, B, C, D, E, F, G
- pointsServed (Column 5) - Number like "6", "12"

### Conductor Details (Columns 6-7):
- liveSize (Column 6) - Cable size with mm suffix: "1.5mm", "2.5mm", "4.0mm", "6.0mm", "10mm"
- cpcSize (Column 7) - Earth conductor size: same values as liveSize

### Overcurrent Protective Device (Columns 8-12):
- bsStandard (Column 8) - "MCB (BS EN 60898)", "RCBO (BS EN 61009)", "Fuse (BS 1361)", "Fuse (BS 3036)"
- protectiveDeviceType (Column 9) - "MCB", "RCBO", "RCD", "Fuse"
- protectiveDeviceCurve - Type curve: "B", "C", "D"
- protectiveDeviceRating (Column 10) - Rating in amps: "6", "10", "16", "20", "32", "40", "50", "63"
- protectiveDeviceKaRating (Column 11) - Breaking capacity: "6", "10", "16" (kA)
- maxZs (Column 12) - Maximum Zs in ohms (auto-calculated)

### RCD Details (Columns 13-16):
- rcdBsStandard (Column 13) - "RCD (BS EN 61008)", "RCBO (BS EN 61009)"
- rcdType (Column 14) - RCD type: "AC", "A", "F", "B", "S", "G"
- rcdRating (Column 15) - Trip current mA: "10", "30", "100", "300", "500"
- rcdRatingA (Column 16) - RCD rated current: "16", "25", "32", "40", "63", "80", "100"

### Ring Final Circuit Tests (Columns 18-20):
- ringR1 (Column 18) - r₁ line in ohms
- ringRn (Column 19) - rₙ neutral in ohms
- ringR2 (Column 20) - r₂ cpc in ohms

### Continuity Tests (Column 21):
- r1r2 (Column 21) - (R₁ + R₂) continuity in ohms, e.g., "0.45", "0.78"
- r2 - R₂ only in ohms

### Insulation Resistance Tests (Columns 22-24):
- insulationTestVoltage (Column 22) - Test voltage: "250", "500", "1000"
- insulationLiveNeutral (Column 23) - L-L/L-N in MΩ, typically ">200" or "200"
- insulationLiveEarth (Column 24) - L-E in MΩ, typically ">200" or "200"

### Other Tests (Columns 25-26):
- polarity (Column 25) - "Correct", "Incorrect", "N/A"
- zs (Column 26) - Measured Zs in ohms, e.g., "0.38", "0.72", "1.14"

### RCD Disconnection Test (Column 27):
- rcdOneX (Column 27) - Trip time in ms, e.g., "18", "24", "28"

### Test Button Operations (Columns 28-29):
- rcdTestButton (Column 28) - "✓", "✗", "N/A"
- afddTest (Column 29) - AFDD test: "✓", "✗", "N/A"

### Prospective Fault Current & Functional:
- pfc - Prospective fault current in kA
- functionalTesting - "✓", "✗", "N/A"

### Remarks (Column 30):
- notes - Free text remarks

### Three-Phase Fields:
- phaseType - "1P" or "3P"
- phaseRotation - "Correct", "Incorrect", "N/A"
- phaseBalanceL1, phaseBalanceL2, phaseBalanceL3 - Load in amps
- lineToLineVoltage - Typically "400"

## Field Name Aliases (understand these spoken variations)
- "zed s" / "earth loop" / "loop impedance" / "earth fault loop" = zs
- "r one plus r two" / "continuity" / "r1 r2" = r1r2
- "insulation" / "megger" / "IR" / "insulation resistance" = insulationLiveEarth
- "polarity" / "correct polarity" / "pol" = polarity
- "trip time" / "RCD time" / "disconnect time" = rcdOneX
- "cable size" / "live size" / "conductor size" = liveSize
- "earth size" / "CPC" / "earth conductor" = cpcSize
- "breaker" / "MCB" / "rating" / "device rating" = protectiveDeviceRating
- "type curve" / "curve" = protectiveDeviceCurve
- "ring line" / "r1" = ringR1
- "ring neutral" / "rn" = ringRn
- "ring earth" / "ring cpc" = ringR2
- "max zs" / "maximum zs" = maxZs
- "test button" / "rcd button" = rcdTestButton
- "afdd" / "arc fault" = afddTest

## Value Conversions
- Polarity: "ok"/"pass"/"good"/"yes"/"satisfactory" → "Correct", "fail"/"no"/"wrong" → "Incorrect"
- RCD test button: "ok"/"works"/"pass" → "✓", "fail"/"no" → "✗"
- Functional: "ok"/"pass"/"satisfactory" → "✓"
- Cable sizes: "2.5" → "2.5mm", "4" → "4.0mm"
- Insulation: typically >200 MΩ is good, minimum 1.0 MΩ

## How to use the tools:

### Adding circuits:
"Add a lighting circuit" → fill_schedule_of_tests({ action: "add_circuit", circuit_type: "lighting" })
"Add 6 ring circuits" → fill_schedule_of_tests({ action: "add_circuit", circuit_type: "ring" }) - call 6 times

### Updating individual circuit values:
"Set Zs to 0.45 on circuit 3" → fill_schedule_of_tests({ action: "update_field", circuit_number: 3, field: "zs", value: "0.45" })
"R1R2 is 0.25" → fill_schedule_of_tests({ action: "update_field", field: "r1r2", value: "0.25" })
"Circuit 1 is a 32 amp type B MCB" → fill_schedule_of_tests({ action: "update_multiple_fields", circuit_number: 1, fields: { "protectiveDeviceRating": "32", "protectiveDeviceCurve": "B", "protectiveDeviceType": "MCB" } })

### Navigation:
"Next circuit" → fill_schedule_of_tests({ action: "next_circuit" })
"Previous circuit" → fill_schedule_of_tests({ action: "previous_circuit" })
"Go to circuit 5" → fill_schedule_of_tests({ action: "select_circuit", circuit_number: 5 })

### Bulk operations (USE THIS FOR EFFICIENCY):
"All polarity correct" → bulk_fill_circuits({ field: "polarity", value: "Correct" })
"Set insulation test voltage to 500 on all circuits" → bulk_fill_circuits({ field: "insulationTestVoltage", value: "500" })
"Fill all empty insulation values with 200" → bulk_fill_circuits({ field: "insulationLiveEarth", value: "200", only_empty: true })
"Set all RCD test buttons to pass" → bulk_fill_circuits({ field: "rcdTestButton", value: "✓" })

### Status check:
"What's my circuit status?" → fill_schedule_of_tests({ action: "get_status" })
"What's missing?" → fill_schedule_of_tests({ action: "get_status" })

## Circuit types:
- lighting = Lighting circuit (6A, 1.5mm cable, MCB Type B)
- ring = Ring final socket circuit (32A, 2.5mm cable, RCBO Type A)
- radial = Radial socket circuit (20A, 2.5mm cable, RCBO Type A)
- cooker = Cooker circuit (32A, 6mm cable, MCB Type B)
- shower = Shower circuit (45A, 10mm cable, RCBO Type A)
- immersion = Immersion heater (16A, 2.5mm cable, MCB Type B)
- smoke_alarm = Smoke/fire alarm (6A, 1.5mm cable, MCB Type B)
- ev_charger = EV charger circuit (32A, 6mm cable, RCBO Type A)
- boiler = Boiler circuit (3A, 1.5mm cable, MCB Type B)
- spur = Fused spur (13A, 2.5mm cable)

## Workflow Tips
1. Ask how many circuits first
2. Use bulk_fill_circuits for values that are the same across all circuits (polarity, insulation voltage, test button)
3. Use fill_schedule_of_tests for individual circuit values (Zs varies per circuit)
4. Confirm before deleting circuits
5. For ring finals, remind user to fill ringR1, ringRn, ringR2 columns

## Response style:
- Be brief and concise - electricians are busy on site
- Confirm actions: "Added 6 lighting circuits"
- Confirm readings: "Set Zs to 0.45 on circuit 3"
- For bulk operations: "Set polarity to correct on all 12 circuits"
- Don't ask unnecessary questions - make intelligent choices`;

// Convert tool to ElevenLabs format
function convertToElevenLabsFormat(tool: typeof TESTING_TOOLS[0]) {
  const properties: Record<string, object> = {};
  const required: string[] = [];

  for (const param of tool.parameters) {
    const propDef: Record<string, unknown> = {
      type: param.type,
      description: param.description,
    };

    if (param.enumValues && param.enumValues.length > 0) {
      propDef.enum = param.enumValues;
    }

    properties[param.name] = propDef;

    if (param.required) {
      required.push(param.name);
    }
  }

  return {
    tool_config: {
      type: 'client',
      name: tool.name,
      description: tool.description,
      parameters: {
        type: 'object',
        properties,
        required,
      },
      expects_response: true,
      disable_interruptions: false,
    },
  };
}

// Get all tools from ElevenLabs
async function getAllTools(apiKey: string): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': apiKey },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tools: ${response.status}`);
  }

  const data = await response.json();
  const tools: Array<{ id: string; name: string }> = [];

  if (data.tools && Array.isArray(data.tools)) {
    for (const tool of data.tools) {
      if (tool.id && tool.tool_config?.name) {
        tools.push({ id: tool.id, name: tool.tool_config.name });
      }
    }
  }

  return tools;
}

// Delete a tool from ElevenLabs
async function deleteTool(apiKey: string, toolId: string): Promise<void> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools/${toolId}`, {
    method: 'DELETE',
    headers: { 'xi-api-key': apiKey },
  });

  if (!response.ok && response.status !== 404) {
    const error = await response.text();
    throw new Error(`Failed to delete tool ${toolId}: ${response.status} - ${error}`);
  }
}

// Create a tool in ElevenLabs
async function createTool(apiKey: string, toolConfig: object): Promise<string> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/tools`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toolConfig),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create tool: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.id;
}

// Update agent with tool IDs, system prompt, and TTS model for speed
async function updateAgent(apiKey: string, agentId: string, toolIds: string[], systemPrompt: string): Promise<void> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/${agentId}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            prompt: systemPrompt,
            tool_ids: toolIds,
          },
        },
        tts: {
          model_id: 'eleven_turbo_v2', // Fast model for English
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update agent: ${response.status} - ${error}`);
  }
}

// Clear all tools from agent first
async function clearAgentTools(apiKey: string, agentId: string): Promise<void> {
  const response = await fetch(`${ELEVENLABS_API_BASE}/convai/agents/${agentId}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            tool_ids: [],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to clear agent tools: ${response.status} - ${error}`);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'ELEVENLABS_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Starting testing voice agent setup...');

    // Step 1: Clear all tools from agent first (so they can be deleted)
    console.log('Clearing tools from agent...');
    await clearAgentTools(apiKey, TESTING_AGENT_ID);
    console.log('Agent tools cleared');

    // Small delay to ensure tools are unassigned
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Get all existing tools
    console.log('Fetching existing tools...');
    const existingTools = await getAllTools(apiKey);
    console.log(`Found ${existingTools.length} existing tools`);

    // Step 3: Delete ALL existing tools (clean slate)
    // This ensures no old tools remain
    let deletedCount = 0;
    const deletedNames: string[] = [];
    for (const tool of existingTools) {
      console.log(`Deleting tool: ${tool.name} (${tool.id})`);
      try {
        await deleteTool(apiKey, tool.id);
        deletedCount++;
        deletedNames.push(tool.name);
      } catch (e) {
        console.log(`Could not delete ${tool.name}: ${e}`);
      }
      await new Promise(resolve => setTimeout(resolve, 150)); // Rate limit
    }
    console.log(`Deleted ${deletedCount} tools: ${deletedNames.join(', ')}`);

    // Step 4: Create the 3 new tools
    console.log('Creating new testing tools...');
    const newToolIds: string[] = [];

    for (const tool of TESTING_TOOLS) {
      const elevenLabsFormat = convertToElevenLabsFormat(tool);
      console.log(`Creating tool: ${tool.name}`);
      const toolId = await createTool(apiKey, elevenLabsFormat);
      newToolIds.push(toolId);
      console.log(`Created ${tool.name} with ID: ${toolId}`);
      await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
    }

    // Step 5: Update agent with new tools and system prompt
    console.log('Updating agent configuration...');
    await updateAgent(apiKey, TESTING_AGENT_ID, newToolIds, TESTING_SYSTEM_PROMPT);
    console.log('Agent updated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Testing voice agent configured successfully',
        agentId: TESTING_AGENT_ID,
        deletedTools: deletedCount,
        createdTools: TESTING_TOOLS.map(t => t.name),
        toolIds: newToolIds,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error setting up testing voice agent:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
