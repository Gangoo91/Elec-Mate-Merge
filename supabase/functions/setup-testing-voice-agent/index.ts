import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

// Testing agent ID
const TESTING_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';

// All field names that can be updated via voice
const ALL_FIELD_NAMES = [
  // Circuit Details
  'circuitDescription', 'circuitType', 'pointsServed',
  // Phase & Wiring
  'phaseType', 'typeOfWiring', 'referenceMethod',
  // Cable Sizes
  'liveSize', 'cpcSize',
  // Protection - including device type and kA rating
  'bsStandard', 'protectiveDeviceType', 'protectiveDeviceCurve', 'protectiveDeviceRating', 'protectiveDeviceKaRating',
  // RCD - including amp rating
  'rcdBsStandard', 'rcdType', 'rcdRating', 'rcdRatingA',
  // Ring Tests
  'ringR1', 'ringRn', 'ringR2',
  // Continuity
  'r1r2', 'r2',
  // Insulation
  'insulationTestVoltage', 'insulationResistance', 'insulationLiveNeutral', 'insulationLiveEarth',
  // Test Results
  'polarity', 'zs', 'rcdOneX', 'rcdFiveX', 'rcdTestButton', 'afddTest', 'pfc', 'functionalTesting',
  // Three-Phase
  'phaseRotation', 'phaseBalanceL1', 'phaseBalanceL2', 'phaseBalanceL3', 'lineToLineVoltage',
  // Other
  'notes',
];

// The 3 tools for testing voice assistant
const TESTING_TOOLS = [
  {
    name: 'fill_eicr',
    description: 'Fill EICR Schedule of Tests. Use this for ALL EICR testing actions - adding circuits, setting test values, navigation between circuits, deleting circuits, moving/reordering circuits, switching boards, and checking missing tests.',
    parameters: [
      { name: 'action', type: 'string', required: true, description: 'What to do', enumValues: ['add_circuit', 'update_field', 'next', 'previous', 'select', 'delete_circuit', 'move_circuit', 'select_board', 'get_missing_tests', 'complete'] },
      { name: 'circuit_type', type: 'string', required: false, description: 'Type of circuit (for add_circuit)', enumValues: ['ring_final', 'radial', 'lighting', 'cooker', 'shower', 'immersion', 'smoke_detectors', 'spur', 'other'] },
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number to target or move' },
      { name: 'to_position', type: 'number', required: false, description: 'New position for move_circuit (1-based)' },
      { name: 'field', type: 'string', required: false, description: 'Field name to update (for update_field)', enumValues: ALL_FIELD_NAMES },
      { name: 'value', type: 'string', required: false, description: 'Value to set (for update_field)' },
      { name: 'description', type: 'string', required: false, description: 'Circuit description like Kitchen sockets' },
      { name: 'board_name', type: 'string', required: false, description: 'Board name or reference (for select_board or add_circuit to specific board). Examples: Main CU, Sub-DB1, Sub-DB2, Garage, Outbuilding' },
    ],
  },
  {
    name: 'fill_eic',
    description: 'Fill EIC Schedule of Tests. Use this for ALL EIC testing actions - adding circuits, setting test values, navigation between circuits, deleting circuits, moving/reordering circuits, switching boards, and checking missing tests.',
    parameters: [
      { name: 'action', type: 'string', required: true, description: 'What to do', enumValues: ['add_circuit', 'update_field', 'next', 'previous', 'select', 'delete_circuit', 'move_circuit', 'select_board', 'get_missing_tests', 'complete'] },
      { name: 'circuit_type', type: 'string', required: false, description: 'Type of circuit (for add_circuit)', enumValues: ['ring_final', 'radial', 'lighting', 'cooker', 'shower', 'immersion', 'smoke_detectors', 'spur', 'other'] },
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number to target or move' },
      { name: 'to_position', type: 'number', required: false, description: 'New position for move_circuit (1-based)' },
      { name: 'field', type: 'string', required: false, description: 'Field name to update (for update_field)', enumValues: ALL_FIELD_NAMES },
      { name: 'value', type: 'string', required: false, description: 'Value to set (for update_field)' },
      { name: 'description', type: 'string', required: false, description: 'Circuit description like Kitchen sockets' },
      { name: 'board_name', type: 'string', required: false, description: 'Board name or reference (for select_board or add_circuit to specific board). Examples: Main CU, Sub-DB1, Sub-DB2, Garage, Outbuilding' },
    ],
  },
  {
    name: 'fill_minor_works',
    description: 'Fill Minor Works certificate. Use this for ALL Minor Works testing actions.',
    parameters: [
      { name: 'action', type: 'string', required: true, description: 'What to do', enumValues: ['add_circuit', 'update_field', 'delete_circuit', 'move_circuit', 'complete'] },
      { name: 'circuit_type', type: 'string', required: false, description: 'Type of circuit', enumValues: ['lighting', 'socket', 'fixed_equipment', 'other'] },
      { name: 'circuit_number', type: 'number', required: false, description: 'Circuit number to target or move' },
      { name: 'to_position', type: 'number', required: false, description: 'New position for move_circuit (1-based)' },
      { name: 'field', type: 'string', required: false, description: 'Field name to update', enumValues: ALL_FIELD_NAMES },
      { name: 'value', type: 'string', required: false, description: 'Value to set' },
      { name: 'description', type: 'string', required: false, description: 'Circuit description' },
    ],
  },
];

// System prompt for testing assistant
const TESTING_SYSTEM_PROMPT = `You are an electrical testing assistant for UK electricians. You help fill EICR, EIC, and Minor Works certificates quickly and accurately.

## You have 3 tools:
1. fill_eicr - For EICR Schedule of Tests
2. fill_eic - For EIC Schedule of Tests
3. fill_minor_works - For Minor Works certificates

## How to use them:

When user says "add a ring final" or "add circuit for kitchen sockets":
Call fill_eicr({ action: "add_circuit", circuit_type: "ring_final", description: "Kitchen sockets" })
This AUTOMATICALLY fills all 32 columns with BS7671 defaults including cable sizes, protection, insulation values.

When user gives a test reading like "R1R2 is 0.45" or "the R1 is 0.25":
Call fill_eicr({ action: "update_field", field: "r1r2", value: "0.45" })

When user says "next circuit":
Call fill_eicr({ action: "next" })

When user says "go to circuit 3" or "select circuit 3":
Call fill_eicr({ action: "select", circuit_number: 3 })

When user says "delete circuit 3" or "remove circuit 3":
Call fill_eicr({ action: "delete_circuit", circuit_number: 3 })
This removes the circuit AND automatically renumbers all remaining circuits.

When user says "move circuit 3 to position 1" or "put circuit 5 first":
Call fill_eicr({ action: "move_circuit", circuit_number: 3, to_position: 1 })
This moves the circuit to the new position AND automatically renumbers all circuits.

When user says "select Sub-DB1", "switch to garage board", or "go to the sub board":
Call fill_eicr({ action: "select_board", board_name: "Sub-DB1" })
This switches to a different distribution board. Common board names: Main CU, Sub-DB1, Sub-DB2, Garage, Outbuilding.

When user says "add circuit to Sub-DB1" or "add a ring final to the garage board":
Call fill_eicr({ action: "add_circuit", circuit_type: "ring_final", board_name: "Garage" })
This adds a circuit to a specific board.

When user says "what's missing on circuit 3", "what tests do I need", or "check circuit 1":
Call fill_eicr({ action: "get_missing_tests", circuit_number: 3 })
This returns which test readings are still needed for that circuit.

When user finishes scanning circuits or adds circuits, proactively inform them what tests are missing.

## Circuit types and what they mean:
- ring_final = Socket outlets on a ring (32A, 2.5mm cable, RCBO)
- radial = Socket outlets on radial (20A, 2.5mm cable, RCBO)
- lighting = Lighting circuit (6A, 1.5mm cable, MCB)
- cooker = Cooker circuit (32A, 6mm cable, MCB)
- shower = Shower circuit (45A, 10mm cable, RCBO)
- immersion = Immersion heater (16A, 2.5mm cable, MCB)
- smoke_detectors = Smoke/fire alarm circuit (6A, 1.5mm cable, MCB)
- spur = Fused spur (13A, 2.5mm cable)

## Field names for update_field:
Test readings: r1r2, r2, insulationResistance, polarity, rcdOneX, rcdFiveX, pfc, zs
Ring tests: ringR1, ringRn, ringR2
Insulation: insulationLiveNeutral, insulationLiveEarth, insulationTestVoltage
Cable: liveSize, cpcSize
Protection: bsStandard, protectiveDeviceType, protectiveDeviceRating, protectiveDeviceCurve, protectiveDeviceKaRating
RCD: rcdBsStandard, rcdType, rcdRating, rcdRatingA, rcdTestButton
Three-phase: phaseRotation, phaseBalanceL1, phaseBalanceL2, phaseBalanceL3, lineToLineVoltage
Other: phaseType, typeOfWiring, referenceMethod, functionalTesting, afddTest
DO NOT update: maxZs (auto-calculated)

## ALL 16 DROPDOWN FIELDS - Use EXACT values:

### Phase & Wiring:
- phaseType: "1P", "3P"
  User says "single phase" → value: "1P"
  User says "three phase" → value: "3P"

- typeOfWiring: "A", "B", "C", "D", "E", "F", "G", "H", "O"
  User says "clipped direct" → value: "C"
  User says "conduit" or "trunking" → value: "B"
  User says "free air" → value: "E"

- referenceMethod: "A", "B", "C", "D", "E", "F", "G"
  User says "method C" → value: "C"

### Cable Sizes (MUST include mm suffix):
- liveSize: "1.0mm", "1.5mm", "2.5mm", "4.0mm", "6.0mm", "10mm", "16mm", "25mm", "35mm", "50mm", "70mm", "95mm"
- cpcSize: same values as liveSize
  User says "2.5" or "2.5mm" → value: "2.5mm"
  User says "4mm" → value: "4.0mm"
  User says "10mm" → value: "10mm"

### Protection:
- bsStandard: "MCB (BS EN 60898)", "RCBO (BS EN 61009)", "RCD (BS EN 61008)", "Fuse (BS 88)", "Fuse (BS 1361)", "Fuse (BS 3036)", "Other"
  User says "MCB" → value: "MCB (BS EN 60898)"
  User says "RCBO" → value: "RCBO (BS EN 61009)"
  User says "rewireable" → value: "Fuse (BS 3036)"

- protectiveDeviceType: "MCB", "RCBO", "RCD", "Fuse", "Other"
  User says "MCB" → value: "MCB"
  User says "RCBO" → value: "RCBO"
  User says "fuse" → value: "Fuse"

- protectiveDeviceCurve: "B", "C", "D"
  User says "type B" → value: "B"

- protectiveDeviceRating: "6", "10", "16", "20", "25", "32", "40", "50", "63", "80", "100"
  User says "32 amp" → value: "32"

- protectiveDeviceKaRating: "6", "10", "16"
  User says "6kA" or "6 kilo amp" → value: "6"
  User says "10kA" → value: "10"

### RCD:
- rcdBsStandard: "RCD (BS EN 61008)", "RCBO (BS EN 61009)", "RCD (BS 7288)", "Other"

- rcdType: "AC", "A", "F", "B", "S", "G"
  User says "type A" → value: "A"
  User says "type AC" → value: "AC"
  User says "selective" → value: "S"

- rcdRating: "10", "30", "100", "300", "500"
  User says "30 milliamp" → value: "30"

- rcdRatingA: "16", "25", "32", "40", "63", "80", "100"
  User says "RCD 63 amp" → value: "63"
  User says "63 amp RCD" → value: "63"

### Test Results:
- insulationTestVoltage: "250", "500", "1000"
  User says "500 volt" → value: "500"

- polarity: "Correct", "Incorrect", "N/A"
  User says "OK" or "pass" → value: "Correct"

- rcdTestButton: "✓", "✗", "N/A"
  User says "pass" → value: "✓"
  User says "fail" → value: "✗"

- afddTest: "✓", "✗", "N/A"
  User says "pass" → value: "✓"

- functionalTesting: "✓", "✗", "N/A"
  User says "satisfactory" → value: "✓"

### Three-Phase (for 3-phase circuits):
- phaseRotation: "Correct", "Incorrect", "N/A"
  User says "rotation OK" → value: "Correct"

- phaseBalanceL1, phaseBalanceL2, phaseBalanceL3: Numeric values (load current in amps)
  User says "L1 is 15 amps" → field: "phaseBalanceL1", value: "15"

- lineToLineVoltage: Numeric values (typically 400V)
  User says "line voltage 400" → value: "400"

Examples:
- "cable size 2.5" → field: "liveSize", value: "2.5mm"
- "wiring type C" → field: "typeOfWiring", value: "C"
- "clipped direct" → field: "typeOfWiring", value: "C"
- "single phase" → field: "phaseType", value: "1P"
- "MCB" → field: "bsStandard", value: "MCB (BS EN 60898)"
- "RCD type A" → field: "rcdType", value: "A"
- "polarity OK" → field: "polarity", value: "Correct"
- "RCD passed" → field: "rcdTestButton", value: "✓"

## Response style:
- Be brief and concise - electricians are busy on site
- Confirm actions: "Added ring final circuit 1 with all defaults"
- Confirm readings: "R1R2 set to 0.45"
- Don't ask unnecessary questions - make intelligent choices
- If circuit type is unclear, pick the most likely one based on context
- Ring final vs radial? Default to ring final for 32A sockets, radial for 20A`;

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
