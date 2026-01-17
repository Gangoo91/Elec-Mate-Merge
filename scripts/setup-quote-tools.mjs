#!/usr/bin/env node
/**
 * Update ElevenLabs Agent Configuration
 *
 * This script:
 * 1. Creates 12 CLIENT tools (not webhook)
 * 2. Updates the agent to use these tools
 * 3. Updates the agent prompt to describe all 12 tools
 */

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const AGENT_ID = 'agent_0801kdxbb7hhepg80gfpgq8kgpgs';
const API_BASE = 'https://api.elevenlabs.io/v1';

// The 12 tools with their parameters
const QUOTE_TOOLS = [
  {
    name: 'create_quote',
    description: 'Create a quote and save it as a draft. Does NOT send an email - the user can review and send later from their dashboard. Use this when the user wants to create a quote but not send it yet.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Full name of the client' },
        clientEmail: { type: 'string', description: 'Client email address' },
        clientPhone: { type: 'string', description: 'Client phone number (optional)' },
        clientAddress: { type: 'string', description: 'Client address (optional)' },
        clientPostcode: { type: 'string', description: 'Client postcode (optional)' },
        jobTitle: { type: 'string', description: 'Short title for the job, e.g. Kitchen Rewire, Consumer Unit Upgrade' },
        jobDescription: { type: 'string', description: 'Detailed description of the work to be done (optional)' },
        itemDescription: { type: 'string', description: 'Description of the line item, e.g. Full kitchen rewire including materials' },
        itemUnitPrice: { type: 'number', description: 'Price in pounds for this item' },
        itemQuantity: { type: 'number', description: 'Quantity of this item (defaults to 1)' },
        vatRate: { type: 'number', description: 'VAT rate percentage (defaults to 20). Set to 0 for no VAT.' },
        notes: { type: 'string', description: 'Additional notes to include on the quote (optional)' },
        expiryDays: { type: 'number', description: 'Number of days until quote expires (defaults to 30)' }
      },
      required: ['clientName', 'clientEmail', 'jobTitle', 'itemDescription', 'itemUnitPrice']
    }
  },
  {
    name: 'create_invoice',
    description: 'Create an invoice and save it as a draft. Does NOT send an email - the user can review and send later. Use this when the user wants to create an invoice but not send it yet.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Full name of the client' },
        clientEmail: { type: 'string', description: 'Client email address' },
        clientPhone: { type: 'string', description: 'Client phone number (optional)' },
        clientAddress: { type: 'string', description: 'Client address (optional)' },
        clientPostcode: { type: 'string', description: 'Client postcode (optional)' },
        jobTitle: { type: 'string', description: 'Short title for the job' },
        jobDescription: { type: 'string', description: 'Detailed description of the work (optional)' },
        itemDescription: { type: 'string', description: 'Description of the work completed' },
        itemUnitPrice: { type: 'number', description: 'Amount in pounds' },
        itemQuantity: { type: 'number', description: 'Quantity (defaults to 1)' },
        vatRate: { type: 'number', description: 'VAT rate percentage (defaults to 20). Set to 0 for no VAT.' },
        paymentDays: { type: 'number', description: 'Number of days until payment is due (defaults to 30)' },
        notes: { type: 'string', description: 'Additional notes (optional)' }
      },
      required: ['clientName', 'clientEmail', 'jobTitle', 'itemDescription', 'itemUnitPrice']
    }
  },
  {
    name: 'send_quote',
    description: 'Send an existing quote to the client by email. Find the quote by client name or quote number. Use this when the user wants to send a quote that was already created.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Client name to search for' },
        quoteNumber: { type: 'string', description: 'Quote number e.g. QTE-2501-123' }
      },
      required: []
    }
  },
  {
    name: 'send_invoice',
    description: 'Send an existing invoice to the client by email. Find the invoice by client name or invoice number. Use this when the user wants to send an invoice that was already created.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Client name to search for' },
        invoiceNumber: { type: 'string', description: 'Invoice number e.g. INV-2501-123' }
      },
      required: []
    }
  },
  {
    name: 'create_and_send_quote',
    description: 'Create a quote AND send it immediately to the client by email. Use this when the user wants to create and send a quote in one step.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Full name of the client' },
        clientEmail: { type: 'string', description: 'Client email address' },
        clientPhone: { type: 'string', description: 'Client phone number (optional)' },
        clientAddress: { type: 'string', description: 'Client address (optional)' },
        clientPostcode: { type: 'string', description: 'Client postcode (optional)' },
        jobTitle: { type: 'string', description: 'Short title for the job' },
        jobDescription: { type: 'string', description: 'Detailed description of the work (optional)' },
        itemDescription: { type: 'string', description: 'Description of the line item' },
        itemUnitPrice: { type: 'number', description: 'Price in pounds' },
        itemQuantity: { type: 'number', description: 'Quantity (defaults to 1)' },
        vatRate: { type: 'number', description: 'VAT rate percentage (defaults to 20). Set to 0 for no VAT.' },
        notes: { type: 'string', description: 'Additional notes (optional)' },
        expiryDays: { type: 'number', description: 'Number of days until quote expires (defaults to 30)' }
      },
      required: ['clientName', 'clientEmail', 'jobTitle', 'itemDescription', 'itemUnitPrice']
    }
  },
  {
    name: 'create_and_send_invoice',
    description: 'Create an invoice AND send it immediately to the client by email. Can also convert an existing quote to an invoice and send it.',
    parameters: {
      type: 'object',
      properties: {
        quoteNumber: { type: 'string', description: 'Quote number to convert to invoice (optional - if provided, converts existing quote)' },
        clientName: { type: 'string', description: 'Full name of the client (required if not converting quote)' },
        clientEmail: { type: 'string', description: 'Client email address (required if not converting quote)' },
        clientPhone: { type: 'string', description: 'Client phone number (optional)' },
        clientAddress: { type: 'string', description: 'Client address (optional)' },
        clientPostcode: { type: 'string', description: 'Client postcode (optional)' },
        jobTitle: { type: 'string', description: 'Short title for the job (required if not converting quote)' },
        jobDescription: { type: 'string', description: 'Detailed description of the work (optional)' },
        itemDescription: { type: 'string', description: 'Description of the work completed (required if not converting quote)' },
        itemUnitPrice: { type: 'number', description: 'Amount in pounds (required if not converting quote)' },
        itemQuantity: { type: 'number', description: 'Quantity (defaults to 1)' },
        vatRate: { type: 'number', description: 'VAT rate percentage (defaults to 20). Set to 0 for no VAT.' },
        paymentDays: { type: 'number', description: 'Days until payment due (defaults to 30)' },
        invoiceNotes: { type: 'string', description: 'Additional notes for the invoice (optional)' }
      },
      required: []
    }
  },
  {
    name: 'delete_quote',
    description: 'Delete an existing quote. Find the quote by client name or quote number. Cannot delete quotes that have been converted to invoices.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Client name to search for' },
        quoteNumber: { type: 'string', description: 'Quote number e.g. QTE-2501-123' }
      },
      required: []
    }
  },
  {
    name: 'delete_invoice',
    description: 'Delete an existing invoice. Find the invoice by client name or invoice number. Cannot delete invoices that have been marked as paid.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Client name to search for' },
        invoiceNumber: { type: 'string', description: 'Invoice number e.g. INV-2501-123' }
      },
      required: []
    }
  },
  {
    name: 'convert_quote_to_invoice',
    description: 'Convert an existing quote to an invoice. Find the quote by client name or quote number. The invoice will be created as a draft.',
    parameters: {
      type: 'object',
      properties: {
        clientName: { type: 'string', description: 'Client name to search for' },
        quoteNumber: { type: 'string', description: 'Quote number e.g. QTE-2501-123' }
      },
      required: []
    }
  },
  {
    name: 'get_quote_info',
    description: 'Get information about quotes. Can filter by client name or status. Returns a list of recent quotes.',
    parameters: {
      type: 'object',
      properties: {
        client: { type: 'string', description: 'Client name to filter by (optional)' },
        status: { type: 'string', description: 'Quote status to filter by: draft, sent, accepted, declined (optional)' }
      },
      required: []
    }
  },
  {
    name: 'get_invoice_info',
    description: 'Get information about invoices. Can filter by client name or status. Returns a list of recent invoices.',
    parameters: {
      type: 'object',
      properties: {
        client: { type: 'string', description: 'Client name to filter by (optional)' },
        status: { type: 'string', description: 'Invoice status to filter by: draft, sent, paid, overdue (optional)' }
      },
      required: []
    }
  },
  {
    name: 'get_overdue_invoices',
    description: 'Get a list of all overdue invoices. Returns invoices that are past their due date and not yet paid.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  }
];

// Updated prompt for the agent
const AGENT_PROMPT = `You are a voice assistant for UK electricians managing quotes and invoices. You help them create, send, and manage their finances hands-free while on site.

## CRITICAL: Default Behavior
When the user says "Create a quote" or "Create an invoice" WITHOUT explicitly saying "don't send" or "just draft", you should:
1. Gather the required details (name, email, job, price, VAT)
2. Use create_and_send_quote or create_and_send_invoice to CREATE AND SEND the email

Only use the draft-only tools (create_quote, create_invoice) if the user explicitly says "don't send", "just create", "save as draft", or similar.

## Your 12 Tools:

### DEFAULT - Create AND Send (use these by default):
1. create_and_send_quote - Create a new quote AND email it immediately
2. create_and_send_invoice - Create a new invoice AND email it immediately

### Send Existing:
3. send_quote - Send an existing quote (already in system)
4. send_invoice - Send an existing invoice (already in system)

### Draft Only (only if user says "don't send"):
5. create_quote - Create quote as draft only
6. create_invoice - Create invoice as draft only

### Delete:
7. delete_quote - Delete a quote
8. delete_invoice - Delete an invoice

### Convert:
9. convert_quote_to_invoice - Convert quote to invoice

### Query:
10. get_quote_info - Look up quotes
11. get_invoice_info - Look up invoices
12. get_overdue_invoices - Check overdue invoices

## Example Conversations:

### "Create a quote for John Smith" (DEFAULT: sends email)
User: "Create a quote for John Smith"
→ Ask: "What's John's email address?"
→ Ask: "What's the job?"
→ Ask: "What's the price?"
→ Ask: "Should I add VAT at twenty percent?"
→ Call create_and_send_quote (NOT create_quote)
→ Confirm: "Done. Quote for five hundred pounds sent to john@email.com"

### "Create a quote but don't send it" (Draft only)
User: "Create a quote for John Smith but don't send it yet"
→ Gather same info
→ Call create_quote (draft only)
→ Confirm: "Quote saved as draft. Send it from your dashboard when ready."

### "Send the quote to John" (Existing quote)
User: "Send the quote to John Smith"
→ Call send_quote({ clientName: "John Smith" })
→ Confirm: "Quote QTE-2501-123 sent to John Smith."

### "Create an invoice for the Smith job"
User: "Create an invoice for John Smith"
→ Ask: "What's John's email?"
→ Ask: "What work was completed?"
→ Ask: "What's the total amount?"
→ Call create_and_send_invoice (NOT create_invoice)
→ Confirm: "Invoice for three hundred pounds sent to john@email.com"

### Delete/Convert
User: "Delete the quote for John Smith"
→ Call delete_quote({ clientName: "John Smith" })

User: "Convert John's quote to an invoice"
→ Call convert_quote_to_invoice({ clientName: "John" })

### Checking Status
User: "Any overdue invoices?"
→ Call get_overdue_invoices()
→ Report results

## VAT Handling:
- Default VAT rate is 20%
- If user says "no VAT" or "not registered", use vatRate: 0
- Say amounts in words: "four hundred fifty pounds"

## Response Style:
- Be concise - electricians are busy
- Confirm what you did with amount in words
- Use UK English

## Important:
- Email is REQUIRED - always ask if not provided
- ALWAYS use create_and_send_quote/create_and_send_invoice by default
- Only use create_quote/create_invoice if user explicitly wants draft only`;

async function getExistingTools() {
  const response = await fetch(`${API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const data = await response.json();
  return data.tools || [];
}

async function deleteTool(toolId) {
  const response = await fetch(`${API_BASE}/convai/tools/${toolId}`, {
    method: 'DELETE',
    headers: { 'xi-api-key': API_KEY }
  });
  return response.ok;
}

async function createTool(tool) {
  console.log(`Creating tool: ${tool.name}...`);

  const properties = {};
  for (const [key, value] of Object.entries(tool.parameters.properties)) {
    properties[key] = {
      type: value.type,
      description: value.description
    };
  }

  const response = await fetch(`${API_BASE}/convai/tools`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tool_config: {
        type: 'client',
        name: tool.name,
        description: tool.description,
        parameters: {
          type: 'object',
          properties: properties,
          required: tool.parameters.required || []
        }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create ${tool.name}: ${error}`);
  }

  const data = await response.json();
  console.log(`  Created: ${tool.name} (ID: ${data.id})`);
  return data.id;
}

async function updateAgent(toolIds) {
  console.log(`\nUpdating agent ${AGENT_ID}...`);
  console.log(`  - Setting ${toolIds.length} tool IDs`);
  console.log(`  - Updating prompt`);
  console.log(`  - Clearing embedded tools`);

  const response = await fetch(`${API_BASE}/convai/agents/${AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            prompt: AGENT_PROMPT,
            tool_ids: toolIds,
            tools: []  // Clear embedded webhook tools
          }
        }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update agent: ${error}`);
  }

  console.log('Agent updated successfully!');
  return await response.json();
}

async function main() {
  console.log('=== Update ElevenLabs Agent for Client Tools ===\n');
  console.log(`Agent ID: ${AGENT_ID}`);
  console.log(`Tools to create: ${QUOTE_TOOLS.length}`);
  console.log('Tool type: CLIENT (executes in browser via SDK)\n');

  // Step 1: Delete ALL existing tools with matching names
  console.log('Step 1: Cleaning up existing tools...');
  const existingTools = await getExistingTools();
  const toolNames = QUOTE_TOOLS.map(t => t.name);

  for (const existing of existingTools) {
    if (toolNames.includes(existing.tool_config?.name)) {
      console.log(`  Deleting: ${existing.tool_config.name} (${existing.id})`);
      await deleteTool(existing.id);
    }
  }

  // Step 2: Create all 12 client tools
  console.log('\nStep 2: Creating 12 client tools...');
  const toolIds = [];

  for (const tool of QUOTE_TOOLS) {
    try {
      const id = await createTool(tool);
      toolIds.push(id);
    } catch (error) {
      console.error(`  ERROR: ${error.message}`);
    }
  }

  console.log(`\nCreated ${toolIds.length}/${QUOTE_TOOLS.length} tools`);

  if (toolIds.length !== QUOTE_TOOLS.length) {
    console.error('\nERROR: Not all tools were created. Aborting agent update.');
    process.exit(1);
  }

  // Step 3: Update agent with new tool IDs, prompt, and clear embedded tools
  console.log('\nStep 3: Updating agent configuration...');
  try {
    await updateAgent(toolIds);
  } catch (error) {
    console.error(`Failed to update agent: ${error.message}`);
    process.exit(1);
  }

  console.log('\n=== Done ===');
  console.log('\nTool IDs assigned to agent:');
  toolIds.forEach((id, i) => {
    console.log(`  ${i + 1}. ${QUOTE_TOOLS[i].name}: ${id}`);
  });

  console.log('\nAgent prompt updated to describe all 12 tools.');
  console.log('Embedded webhook tools cleared.');
  console.log('\nThe SDK clientTools in useQuoteInvoiceVoice.ts will now handle these tools.');
}

main().catch(console.error);
