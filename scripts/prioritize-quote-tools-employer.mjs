#!/usr/bin/env node
/**
 * Prioritize quote/invoice tools on Employer agent
 * Remove less important tools to make room
 */

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const EMPLOYER_AGENT_ID = 'agent_7301kdxbnshce7vv8mtah970y3g1';
const API_BASE = 'https://api.elevenlabs.io/v1';

// Tools to ALWAYS include (high priority)
const HIGH_PRIORITY_KEYWORDS = [
  'quote', 'invoice', 'employee', 'worker', 'job', 'timesheet',
  'navigate', 'dashboard', 'search', 'filter', 'dialog',
  'approval', 'pending', 'create', 'send', 'assign'
];

// Tools to deprioritize (can be dropped if needed)
const LOW_PRIORITY_KEYWORDS = [
  'generate_', 'export_', 'compare_', 'archive_', 'duplicate_',
  'get_profit', 'get_cash_flow', 'get_tender_win', 'get_tender_pipeline',
  'get_photo', 'share_photo', 'get_fleet', 'get_mileage'
];

async function main() {
  // Get all tools
  console.log('Fetching all tools...');
  const toolsRes = await fetch(`${API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const toolsData = await toolsRes.json();
  const allTools = toolsData.tools;
  console.log(`Total tools: ${allTools.length}`);

  // Categorize tools
  const highPriority = [];
  const mediumPriority = [];
  const lowPriority = [];

  for (const tool of allTools) {
    const name = tool.tool_config.name.toLowerCase();

    if (HIGH_PRIORITY_KEYWORDS.some(kw => name.includes(kw))) {
      highPriority.push(tool.id);
    } else if (LOW_PRIORITY_KEYWORDS.some(kw => name.includes(kw))) {
      lowPriority.push(tool.id);
    } else {
      mediumPriority.push(tool.id);
    }
  }

  console.log(`\nPriority breakdown:`);
  console.log(`  High: ${highPriority.length}`);
  console.log(`  Medium: ${mediumPriority.length}`);
  console.log(`  Low: ${lowPriority.length}`);

  // Build final list: High + Medium (up to 200)
  let finalTools = [...highPriority];
  const remaining = 200 - finalTools.length;

  if (remaining > 0) {
    finalTools = [...finalTools, ...mediumPriority.slice(0, remaining)];
  }

  console.log(`\nFinal tool count: ${finalTools.length}`);

  // Verify all quote tools are included
  const quoteTools = allTools.filter(t => {
    const name = t.tool_config.name.toLowerCase();
    return name.includes('quote') || name.includes('invoice');
  });

  const quoteToolsIncluded = quoteTools.filter(t => finalTools.includes(t.id));
  console.log(`Quote/Invoice tools included: ${quoteToolsIncluded.length}/${quoteTools.length}`);

  // Update agent
  console.log('\nUpdating Employer agent...');
  const updateRes = await fetch(`${API_BASE}/convai/agents/${EMPLOYER_AGENT_ID}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: {
            tool_ids: finalTools.slice(0, 200)
          }
        }
      }
    })
  });

  if (!updateRes.ok) {
    const error = await updateRes.text();
    console.log(`✗ Failed: ${error}`);
    return;
  }

  console.log('✓ Employer agent updated!');

  // List quote tools now on agent
  console.log('\nQuote/Invoice tools on Employer:');
  for (const t of quoteTools) {
    const isIncluded = finalTools.includes(t.id);
    console.log(`  ${isIncluded ? '✓' : '✗'} ${t.tool_config.name}`);
  }
}

main().catch(console.error);
