#!/usr/bin/env node
/**
 * Setup ONLY 6 Quote/Invoice Tools in ElevenLabs
 *
 * Tools:
 * 1. create_quote - Create quote, save as draft
 * 2. create_invoice - Create invoice, save as draft
 * 3. send_quote - Send existing quote by email
 * 4. send_invoice - Send existing invoice by email
 * 5. create_and_send_quote - Create + send immediately
 * 6. create_and_send_invoice - Create + send immediately
 */

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const AGENT_ID = 'agent_0801kdxbb7hhepg80gfpgq8kgpgs';
const API_BASE = 'https://api.elevenlabs.io/v1';

// Supabase anon key for authentication
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

// The 6 tools with their parameters
const QUOTE_TOOLS = [
  {
    name: 'create_quote',
    description: 'Create a quote and save it as a draft. Does NOT send an email - the user can review and send later from their dashboard. Use this when the user wants to create a quote but not send it yet.',
    parameters: {
      type: 'object',
      properties: {
        clientName: {
          type: 'string',
          description: 'Full name of the client'
        },
        clientEmail: {
          type: 'string',
          description: 'Client email address'
        },
        clientPhone: {
          type: 'string',
          description: 'Client phone number (optional)'
        },
        clientAddress: {
          type: 'string',
          description: 'Client address (optional)'
        },
        jobTitle: {
          type: 'string',
          description: 'Short title for the job, e.g. Kitchen Rewire, Consumer Unit Upgrade'
        },
        jobDescription: {
          type: 'string',
          description: 'Detailed description of the work to be done (optional)'
        },
        itemDescription: {
          type: 'string',
          description: 'Description of the line item, e.g. Full kitchen rewire including materials'
        },
        itemUnitPrice: {
          type: 'number',
          description: 'Price in pounds for this item'
        },
        itemQuantity: {
          type: 'number',
          description: 'Quantity of this item (defaults to 1)'
        },
        vatRegistered: {
          type: 'boolean',
          description: 'Whether to include VAT at 20% (defaults to true)'
        },
        notes: {
          type: 'string',
          description: 'Additional notes to include on the quote (optional)'
        }
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
        clientName: {
          type: 'string',
          description: 'Full name of the client'
        },
        clientEmail: {
          type: 'string',
          description: 'Client email address'
        },
        clientPhone: {
          type: 'string',
          description: 'Client phone number (optional)'
        },
        clientAddress: {
          type: 'string',
          description: 'Client address (optional)'
        },
        jobTitle: {
          type: 'string',
          description: 'Short title for the job (optional)'
        },
        itemDescription: {
          type: 'string',
          description: 'Description of the work completed'
        },
        itemUnitPrice: {
          type: 'number',
          description: 'Amount in pounds'
        },
        itemQuantity: {
          type: 'number',
          description: 'Quantity (defaults to 1)'
        },
        vatRegistered: {
          type: 'boolean',
          description: 'Whether to include VAT at 20% (defaults to true)'
        },
        paymentDays: {
          type: 'number',
          description: 'Number of days until payment is due (defaults to 14)'
        },
        notes: {
          type: 'string',
          description: 'Additional notes (optional)'
        }
      },
      required: ['clientName', 'clientEmail', 'itemDescription', 'itemUnitPrice']
    }
  },
  {
    name: 'send_quote',
    description: 'Send an existing quote to the client by email. Find the quote by client name or quote number. Use this when the user wants to send a quote that was already created.',
    parameters: {
      type: 'object',
      properties: {
        clientName: {
          type: 'string',
          description: 'Client name to search for'
        },
        quoteNumber: {
          type: 'string',
          description: 'Quote number e.g. Q-ABC123'
        }
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
        clientName: {
          type: 'string',
          description: 'Client name to search for'
        },
        invoiceNumber: {
          type: 'string',
          description: 'Invoice number e.g. INV-001234'
        }
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
        clientName: {
          type: 'string',
          description: 'Full name of the client'
        },
        clientEmail: {
          type: 'string',
          description: 'Client email address'
        },
        clientPhone: {
          type: 'string',
          description: 'Client phone number (optional)'
        },
        clientAddress: {
          type: 'string',
          description: 'Client address (optional)'
        },
        jobTitle: {
          type: 'string',
          description: 'Short title for the job'
        },
        jobDescription: {
          type: 'string',
          description: 'Detailed description of the work (optional)'
        },
        itemDescription: {
          type: 'string',
          description: 'Description of the line item'
        },
        itemUnitPrice: {
          type: 'number',
          description: 'Price in pounds'
        },
        itemQuantity: {
          type: 'number',
          description: 'Quantity (defaults to 1)'
        },
        vatRegistered: {
          type: 'boolean',
          description: 'Include VAT at 20% (defaults to true)'
        },
        notes: {
          type: 'string',
          description: 'Additional notes (optional)'
        }
      },
      required: ['clientName', 'clientEmail', 'jobTitle', 'itemDescription', 'itemUnitPrice']
    }
  },
  {
    name: 'create_and_send_invoice',
    description: 'Create an invoice AND send it immediately to the client by email. Use this when the user wants to create and send an invoice in one step.',
    parameters: {
      type: 'object',
      properties: {
        clientName: {
          type: 'string',
          description: 'Full name of the client'
        },
        clientEmail: {
          type: 'string',
          description: 'Client email address'
        },
        clientPhone: {
          type: 'string',
          description: 'Client phone number (optional)'
        },
        clientAddress: {
          type: 'string',
          description: 'Client address (optional)'
        },
        jobTitle: {
          type: 'string',
          description: 'Short title for the job (optional)'
        },
        itemDescription: {
          type: 'string',
          description: 'Description of the work completed'
        },
        itemUnitPrice: {
          type: 'number',
          description: 'Amount in pounds'
        },
        itemQuantity: {
          type: 'number',
          description: 'Quantity (defaults to 1)'
        },
        vatRegistered: {
          type: 'boolean',
          description: 'Include VAT at 20% (defaults to true)'
        },
        paymentDays: {
          type: 'number',
          description: 'Days until payment due (defaults to 14)'
        },
        notes: {
          type: 'string',
          description: 'Additional notes (optional)'
        }
      },
      required: ['clientName', 'clientEmail', 'itemDescription', 'itemUnitPrice']
    }
  }
];

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

  // Build properties with correct JSON schema types
  const properties = {};
  for (const [key, value] of Object.entries(tool.parameters.properties)) {
    properties[key] = {
      type: value.type,
      description: value.description
    };
  }

  // Build request body properties (include tool_name + all params)
  const requestBodyProps = {
    tool_name: { type: 'string', description: 'The tool name' },
    ...properties
  };

  const response = await fetch(`${API_BASE}/convai/tools`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tool_config: {
        type: 'webhook',
        name: tool.name,
        description: tool.description,
        api_schema: {
          url: 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/voice-tools',
          method: 'POST',
          request_headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          request_body_schema: {
            type: 'object',
            properties: requestBodyProps,
            required: ['tool_name', ...(tool.parameters.required || [])]
          }
        },
        response_timeout_secs: 30,
        execution_mode: 'immediate'
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

async function assignToolsToAgent(toolIds) {
  console.log(`\nAssigning ${toolIds.length} tools to agent ${AGENT_ID}...`);

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
            tool_ids: toolIds
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
}

async function main() {
  console.log('=== Setup 6 Quote/Invoice Tools in ElevenLabs ===\n');
  console.log(`Agent ID: ${AGENT_ID}`);
  console.log(`Tools to create: ${QUOTE_TOOLS.length}\n`);

  // First, get existing tools and delete ones with matching names
  console.log('Checking for existing tools to update...');
  const existingTools = await getExistingTools();
  const toolNames = QUOTE_TOOLS.map(t => t.name);

  for (const existing of existingTools) {
    if (toolNames.includes(existing.tool_config?.name)) {
      console.log(`  Deleting existing tool: ${existing.tool_config.name}`);
      await deleteTool(existing.id);
    }
  }
  console.log('');

  const toolIds = [];

  // Create each tool
  for (const tool of QUOTE_TOOLS) {
    try {
      const id = await createTool(tool);
      toolIds.push(id);
    } catch (error) {
      console.error(`  ERROR: ${error.message}`);
    }
  }

  console.log(`\nCreated ${toolIds.length}/${QUOTE_TOOLS.length} tools`);

  // Assign tools to agent
  if (toolIds.length > 0) {
    try {
      await assignToolsToAgent(toolIds);
    } catch (error) {
      console.error(`Failed to assign tools: ${error.message}`);
    }
  }

  console.log('\n=== Done ===');
  console.log('\nTools created:');
  QUOTE_TOOLS.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.name}`);
  });
}

main().catch(console.error);
