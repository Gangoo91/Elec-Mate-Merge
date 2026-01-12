#!/usr/bin/env node
/**
 * Assign the RIGHT tools to the RIGHT agent
 * - Electrician: Quotes, invoices, certificates, pricing, form filling
 * - Employer: Employees, jobs, timesheets, HR, safety, fleet
 */

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const ELECTRICIAN_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';
const EMPLOYER_AGENT_ID = 'agent_7301kdxbnshce7vv8mtah970y3g1';
const API_BASE = 'https://api.elevenlabs.io/v1';

// Keywords for Electrician Hub tools
const ELECTRICIAN_KEYWORDS = [
  'quote', 'invoice', 'price', 'circuit', 'cert', 'test', 'polarity',
  'material', 'labour', 'line_item', 'form', 'field', 'step',
  'preview', 'submit', 'cancel', 'send_quote', 'send_invoice',
  'create_quote', 'lookup', 'low_stock', 'supplier', 'order', 'received',
  'price_book', 'labour_rate', 'cash_flow', 'profit', 'revenue',
  'client_balance', 'supplier_balance', 'outstanding'
];

// Keywords for Employer Hub tools
const EMPLOYER_KEYWORDS = [
  'employee', 'worker', 'job', 'timesheet', 'leave', 'expense', 'tender',
  'incident', 'rams', 'safety', 'training', 'briefing', 'compliance',
  'vehicle', 'fleet', 'mileage', 'fuel', 'photo', 'progress', 'snag',
  'checklist', 'document', 'pack', 'client', 'portal', 'message', 'email',
  'report', 'generate', 'export', 'summarise', 'expand', 'certification',
  'elecid', 'interview', 'contract', 'vacancy', 'talent', 'site', 'location',
  'tracking', 'deadline', 'schedule', 'pending', 'approval', 'urgent',
  'assign', 'update', 'archive', 'duplicate', 'resolve', 'escalate', 'close',
  'flag', 'near_miss', 'policy', 'active', 'available', 'expiring'
];

// Shared tools (go to both agents)
const SHARED_KEYWORDS = [
  'navigate', 'go_back', 'go_home', 'scroll', 'toggle', 'show_help',
  'refresh', 'search', 'filter', 'clear', 'dashboard', 'summary',
  'dialog', 'open_dialog', 'close_dialog', 'sidebar', 'view'
];

async function getTools() {
  const response = await fetch(`${API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const data = await response.json();
  return data.tools;
}

async function updateAgentTools(agentId, agentName, toolIds) {
  console.log(`\nUpdating ${agentName} with ${toolIds.length} tools...`);

  const response = await fetch(`${API_BASE}/convai/agents/${agentId}`, {
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
    console.log(`✗ Failed: ${error}`);
    return false;
  }

  console.log(`✓ ${agentName} updated successfully`);
  return true;
}

function categorizeTools(tools) {
  const electricianTools = [];
  const employerTools = [];

  for (const tool of tools) {
    const name = tool.tool_config.name.toLowerCase();
    const id = tool.id;

    const isElectrician = ELECTRICIAN_KEYWORDS.some(kw => name.includes(kw));
    const isEmployer = EMPLOYER_KEYWORDS.some(kw => name.includes(kw));
    const isShared = SHARED_KEYWORDS.some(kw => name.includes(kw));

    // Shared tools go to both
    if (isShared) {
      electricianTools.push(id);
      employerTools.push(id);
    } else if (isElectrician && !isEmployer) {
      electricianTools.push(id);
    } else if (isEmployer && !isElectrician) {
      employerTools.push(id);
    } else if (isElectrician && isEmployer) {
      // Both keywords match - add to both
      electricianTools.push(id);
      employerTools.push(id);
    } else {
      // No match - add to both as fallback
      electricianTools.push(id);
      employerTools.push(id);
    }
  }

  // Remove duplicates
  return {
    electrician: [...new Set(electricianTools)],
    employer: [...new Set(employerTools)]
  };
}

async function main() {
  console.log('=== Assigning Tools to Agents ===\n');

  // Get all tools
  console.log('Fetching all tools...');
  const tools = await getTools();
  console.log(`Found ${tools.length} total tools\n`);

  // Categorize
  const { electrician, employer } = categorizeTools(tools);

  console.log('Tool distribution:');
  console.log(`  Electrician Hub: ${electrician.length} tools`);
  console.log(`  Employer Hub: ${employer.length} tools`);

  // Check limits
  if (electrician.length > 200) {
    console.log(`\n⚠ Electrician has ${electrician.length} tools, limiting to 200`);
  }
  if (employer.length > 200) {
    console.log(`\n⚠ Employer has ${employer.length} tools, limiting to 200`);
  }

  // Update agents (limit to 200 each)
  await updateAgentTools(ELECTRICIAN_AGENT_ID, 'Electrician Hub', electrician.slice(0, 200));
  await updateAgentTools(EMPLOYER_AGENT_ID, 'Employer Hub', employer.slice(0, 200));

  console.log('\n=== Complete ===');
}

main().catch(console.error);
