import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ELEVENLABS_API_BASE = 'https://api.elevenlabs.io/v1';

// Quote/Invoice agent ID
const QUOTE_INVOICE_AGENT_ID = 'agent_0801kdxbb7hhepg80gfpgq8kgpgs';

// The 7 tools for quote/invoice voice assistant - COMPLETE parameters
const QUOTE_INVOICE_TOOLS = [
  {
    name: 'send_quote',
    description: 'Send an existing quote to a client via email. Use when user says "send quote to [name]" or "email the quote to [name]".',
    parameters: [
      { name: 'clientName', type: 'string', required: false, description: 'Client name to search for. Example: John Smith, Mrs Johnson' },
      { name: 'quoteNumber', type: 'string', required: false, description: 'Quote number like Q-ABC123 or QT-2024-001' },
    ]
  },
  {
    name: 'send_invoice',
    description: 'Send an existing invoice to a client via email. Use when user says "send invoice to [name]" or "email the invoice".',
    parameters: [
      { name: 'clientName', type: 'string', required: false, description: 'Client name to search for' },
      { name: 'invoiceNumber', type: 'string', required: false, description: 'Invoice number like INV-ABC123' },
    ]
  },
  {
    name: 'create_and_send_quote',
    description: 'Create a new quote and send to client via email. Gather ALL details through conversation before calling.',
    parameters: [
      // CLIENT DETAILS (QuoteClient)
      { name: 'clientName', type: 'string', required: true, description: 'Client full name. Example: John Smith, Mrs Sarah Johnson' },
      { name: 'clientEmail', type: 'string', required: true, description: 'Client email address - REQUIRED for sending. Example: john@email.com' },
      { name: 'clientPhone', type: 'string', required: false, description: 'Client phone number. Example: 07700 900123' },
      { name: 'clientAddress', type: 'string', required: false, description: 'Client property address. Example: 42 High Street, Manchester M1 1AA' },
      { name: 'clientPostcode', type: 'string', required: false, description: 'Client postcode. Example: M1 1AA, SW1A 1AA' },

      // JOB DETAILS (JobDetails)
      { name: 'jobTitle', type: 'string', required: true, description: 'Short job title. Example: Kitchen rewire, Consumer unit upgrade, Socket installation' },
      { name: 'jobDescription', type: 'string', required: false, description: 'Detailed description of work. Example: Full rewire of kitchen including new consumer unit' },
      { name: 'jobLocation', type: 'string', required: false, description: 'Job site location if different from client address' },
      { name: 'estimatedDuration', type: 'string', required: false, description: 'How long the job will take. Example: 2 days, 1 week, half a day' },
      { name: 'workStartDate', type: 'string', required: false, description: 'When work will start. Example: next Monday, 15th January' },
      { name: 'specialRequirements', type: 'string', required: false, description: 'Any special requirements or notes for the job' },

      // LINE ITEM (QuoteItem) - single item, ElevenLabs gathers one at a time
      { name: 'itemDescription', type: 'string', required: true, description: 'Description of work or materials. Example: Consumer unit upgrade 10-way with SPD' },
      { name: 'itemQuantity', type: 'number', required: true, description: 'Quantity of items. Usually 1 for labour/services' },
      { name: 'itemUnitPrice', type: 'number', required: true, description: 'Price in pounds per unit. Example: 450, 75.50, 1200' },
      { name: 'itemCategory', type: 'string', required: false, description: 'Category: labour, materials, equipment, or manual. Default labour' },

      // SETTINGS (QuoteSettings)
      { name: 'labourRate', type: 'number', required: false, description: 'Hourly labour rate in pounds. Uses default from profile if not specified' },
      { name: 'overheadPercentage', type: 'number', required: false, description: 'Overhead percentage. Default 10' },
      { name: 'profitMargin', type: 'number', required: false, description: 'Profit margin percentage. Default 15' },
      { name: 'vatRate', type: 'number', required: false, description: 'VAT percentage. Use 20 for VAT-registered, 0 for not VAT registered. Default 20' },
      { name: 'vatRegistered', type: 'boolean', required: false, description: 'Is the business VAT registered? Default true' },
      { name: 'breakdownMaterials', type: 'boolean', required: false, description: 'Show materials line by line or as one total? Default false (one total)' },

      // QUOTE EXTRAS
      { name: 'notes', type: 'string', required: false, description: 'Additional notes to appear on the quote' },
      { name: 'expiryDays', type: 'number', required: false, description: 'Days until quote expires. Default 30' },
    ]
  },
  {
    name: 'create_and_send_invoice',
    description: 'Create an invoice and send to client. Either convert an accepted quote OR create a fresh invoice with new details.',
    parameters: [
      // MODE 1: CONVERT FROM QUOTE
      { name: 'quoteNumber', type: 'string', required: false, description: 'Quote number to convert to invoice. Example: Q-ABC123' },

      // MODE 2: FRESH INVOICE - CLIENT DETAILS
      { name: 'clientName', type: 'string', required: false, description: 'Client name - for finding quote or fresh invoice' },
      { name: 'clientEmail', type: 'string', required: false, description: 'Client email - REQUIRED for fresh invoice if no quote' },
      { name: 'clientPhone', type: 'string', required: false, description: 'Client phone number' },
      { name: 'clientAddress', type: 'string', required: false, description: 'Client address' },
      { name: 'clientPostcode', type: 'string', required: false, description: 'Client postcode' },

      // JOB DETAILS (for fresh invoice)
      { name: 'jobTitle', type: 'string', required: false, description: 'Job title for fresh invoice' },
      { name: 'jobDescription', type: 'string', required: false, description: 'Job description for fresh invoice' },
      { name: 'workCompletionDate', type: 'string', required: false, description: 'When the work was completed' },

      // LINE ITEM (for fresh invoice)
      { name: 'itemDescription', type: 'string', required: false, description: 'Work description for fresh invoice' },
      { name: 'itemQuantity', type: 'number', required: false, description: 'Quantity for fresh invoice. Usually 1' },
      { name: 'itemUnitPrice', type: 'number', required: false, description: 'Price in pounds for fresh invoice' },
      { name: 'itemCategory', type: 'string', required: false, description: 'Category: labour, materials, equipment' },

      // FINANCIAL SETTINGS
      { name: 'vatRate', type: 'number', required: false, description: 'VAT percentage. Default 20' },
      { name: 'vatRegistered', type: 'boolean', required: false, description: 'VAT registered? Default true' },
      { name: 'breakdownMaterials', type: 'boolean', required: false, description: 'Break down materials line by line? Default false' },

      // INVOICE-SPECIFIC (InvoiceSettings)
      { name: 'paymentTerms', type: 'string', required: false, description: 'Payment terms text. Example: Due within 14 days, Payment on completion' },
      { name: 'paymentDays', type: 'number', required: false, description: 'Days until payment due. Default 14' },
      { name: 'paymentMethod', type: 'string', required: false, description: 'Preferred payment method: bank transfer, card, cash' },

      // BANK DETAILS (for invoice)
      { name: 'bankName', type: 'string', required: false, description: 'Bank name for payment. Example: Barclays, Lloyds, NatWest' },
      { name: 'bankAccountName', type: 'string', required: false, description: 'Account holder name' },
      { name: 'bankAccountNumber', type: 'string', required: false, description: 'Bank account number (8 digits)' },
      { name: 'bankSortCode', type: 'string', required: false, description: 'Sort code. Example: 20-00-00' },

      // INVOICE EXTRAS
      { name: 'invoiceNotes', type: 'string', required: false, description: 'Notes to appear on invoice' },
      { name: 'purchaseOrder', type: 'string', required: false, description: 'Client PO number if provided' },
    ]
  },
  {
    name: 'get_quote_info',
    description: 'Get information about quotes. Use to check quote status, amounts, or find quotes for a client.',
    parameters: [
      { name: 'client', type: 'string', required: false, description: 'Client name to filter by' },
      { name: 'status', type: 'string', required: false, description: 'Quote status to filter by: draft, sent, approved, rejected' },
    ]
  },
  {
    name: 'get_invoice_info',
    description: 'Get information about invoices. Use to check invoice status, amounts, or find invoices for a client.',
    parameters: [
      { name: 'client', type: 'string', required: false, description: 'Client name to filter by' },
      { name: 'status', type: 'string', required: false, description: 'Invoice status to filter by: sent, paid, overdue' },
    ]
  },
  {
    name: 'get_overdue_invoices',
    description: 'Get list of overdue/unpaid invoices. Use when user asks about outstanding payments, unpaid invoices, or overdue invoices.',
    parameters: []
  },
];

// System prompt for quote/invoice assistant
const SYSTEM_PROMPT = `You are a voice assistant for UK electricians managing quotes and invoices. You help them send quotes, invoices, and manage their finances hands-free while on site.

## Your 7 Tools:
1. send_quote - Send an existing quote to a client by name or quote number
2. send_invoice - Send an existing invoice to a client by name or invoice number
3. create_and_send_quote - Create a brand new quote with line items and send it
4. create_and_send_invoice - Convert a quote to invoice OR create a fresh invoice
5. get_quote_info - Look up quotes by client or status
6. get_invoice_info - Look up invoices by client or status
7. get_overdue_invoices - Check for unpaid/overdue invoices

## How to Handle Requests:

### SENDING A QUOTE:
User: "Send quote to John Smith"
→ Call send_quote({ clientName: "John Smith" })
→ Confirm: "Done. Quote Q-ABC123 for four hundred fifty pounds sent to John Smith."

### SENDING AN INVOICE:
User: "Send invoice to John Smith"
→ Call send_invoice({ clientName: "John Smith" })
→ Confirm: "Invoice INV-123 sent to John Smith for three hundred twenty pounds."

### CREATING A NEW QUOTE:
User: "Create a quote for John Smith"
→ Ask: "What's John's email address?"
→ Ask: "What's the job? Kitchen rewire, consumer unit, or something else?"
→ Ask: "What's the price for this work?"
→ Ask: "Are you VAT registered? Should I add twenty percent VAT?"
→ Ask: "Do you want to break down the materials line by line, or just show a total?"
→ Call create_and_send_quote with all details
→ Confirm: "Done. Quote for five hundred forty pounds including VAT sent to john@email.com"

### VAT HANDLING:
- Default VAT rate is 20% for UK VAT-registered businesses
- If user says "no VAT", "not VAT registered", or "I'm not registered", use vatRate: 0 and vatRegistered: false
- Always ask about VAT before creating quotes: "Should I add VAT to this quote?"
- Say amounts in words: "four hundred fifty pounds" not "£450"

### MATERIALS BREAKDOWN:
- Ask: "Do you want to break down materials line by line, or just show a total materials cost?"
- If line by line: set breakdownMaterials: true
- If total only: set breakdownMaterials: false (default)
- This affects how materials appear on the quote or invoice

### INVOICING A JOB (Converting Quote):
User: "Invoice the Smith job" or "Invoice John Smith"
→ Call create_and_send_invoice({ clientName: "Smith" })
→ This finds an accepted quote and converts it to an invoice
→ Confirm: "Created invoice for five hundred pounds from the accepted quote and sent to John."

### CREATING A FRESH INVOICE (No Quote):
User: "I need to invoice Dave for an emergency call-out"
→ Ask: "What's Dave's email address?"
→ Ask: "What's the amount for the work?"
→ Ask: "Should I add VAT?"
→ Ask: "Do you want to include your bank details for payment?"
→ Call create_and_send_invoice with clientName, clientEmail, itemDescription, itemUnitPrice, vatRate, and bank details if provided
→ Confirm: "Invoice for two hundred fifty pounds sent to dave@email.com. Payment due in 14 days."

### BANK DETAILS FOR INVOICES:
- Ask: "Do you want to include your bank details for payment?"
- If yes, gather: bank name, account holder name, account number, and sort code
- Example: "What's your bank name?" → "Barclays"
- Example: "What's the account name?" → "Smith Electrical Ltd"
- Example: "What's the account number?" → "12345678"
- Example: "What's the sort code?" → "20-00-00"
- These appear on the invoice so clients know where to pay

### PAYMENT TERMS:
- Default payment term is 14 days
- Ask: "How many days until payment is due? The usual is 14 days"
- Common options: 7 days, 14 days, 30 days, or payment on completion

### CHECKING INVOICES:
User: "Any overdue invoices?" or "What's outstanding?"
→ Call get_overdue_invoices()
→ Report: "You have 2 overdue invoices. Mrs Johnson owes three hundred pounds, 10 days overdue."

### CHECKING QUOTES:
User: "What quotes are pending?"
→ Call get_quote_info({ status: "sent" })
→ Report: "You have 3 quotes awaiting response..."

## Response Style:
- Be concise - electricians are busy on site
- Always confirm what you did with the amount in words
- If a client isn't found, ask for clarification
- Use UK English spelling
- Say amounts in words: "four hundred fifty pounds"

## Important Rules:
- Email address is REQUIRED to send anything - always ask if not provided
- For fresh invoices: you need clientName, clientEmail, itemDescription, itemUnitPrice
- Always confirm the amount and recipient before sending
- UK pounds sterling only

## Error Handling:
- If quote/invoice not found: "I couldn't find that. Could you check the name?"
- If no email: "I need an email address to send this. What's the client's email?"
- If no accepted quotes: "There's no accepted quote for that client. Would you like to create a fresh invoice?"`;

// Convert tool to ElevenLabs format
function convertToElevenLabsFormat(tool: typeof QUOTE_INVOICE_TOOLS[0]) {
  const properties: Record<string, object> = {};
  const required: string[] = [];

  for (const param of tool.parameters) {
    const propDef: Record<string, unknown> = {
      type: param.type,
      description: param.description,
    };

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

// Update agent with tool IDs, system prompt, and TTS model
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

    console.log('Starting quote/invoice voice agent setup...');

    // Step 1: Clear all tools from agent first (so they can be deleted)
    console.log('Clearing tools from agent...');
    await clearAgentTools(apiKey, QUOTE_INVOICE_AGENT_ID);
    console.log('Agent tools cleared');

    // Small delay to ensure tools are unassigned
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 2: Get all existing tools
    console.log('Fetching existing tools...');
    const existingTools = await getAllTools(apiKey);
    console.log(`Found ${existingTools.length} existing tools`);

    // Step 3: Delete quote/invoice related tools (or all if clean slate desired)
    const toolNamesToDelete = ['send_quote', 'send_invoice', 'create_and_send_quote', 'create_and_send_invoice', 'get_quote_info', 'get_invoice_info', 'get_overdue_invoices'];
    let deletedCount = 0;
    const deletedNames: string[] = [];

    for (const tool of existingTools) {
      if (toolNamesToDelete.includes(tool.name)) {
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
    }
    console.log(`Deleted ${deletedCount} tools: ${deletedNames.join(', ')}`);

    // Step 4: Create the 7 new tools
    console.log('Creating new quote/invoice tools...');
    const newToolIds: string[] = [];

    for (const tool of QUOTE_INVOICE_TOOLS) {
      const elevenLabsFormat = convertToElevenLabsFormat(tool);
      console.log(`Creating tool: ${tool.name}`);
      const toolId = await createTool(apiKey, elevenLabsFormat);
      newToolIds.push(toolId);
      console.log(`Created ${tool.name} with ID: ${toolId}`);
      await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
    }

    // Step 5: Update agent with new tools and system prompt
    console.log('Updating agent configuration...');
    await updateAgent(apiKey, QUOTE_INVOICE_AGENT_ID, newToolIds, SYSTEM_PROMPT);
    console.log('Agent updated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote/Invoice voice agent configured successfully',
        agentId: QUOTE_INVOICE_AGENT_ID,
        deletedTools: deletedCount,
        createdTools: QUOTE_INVOICE_TOOLS.map(t => t.name),
        toolIds: newToolIds,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error setting up quote/invoice voice agent:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
