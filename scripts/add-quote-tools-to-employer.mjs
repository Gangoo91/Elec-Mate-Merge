#!/usr/bin/env node
/**
 * Add quote/invoice tools to the Employer agent
 */

import fs from 'fs';

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const EMPLOYER_AGENT_ID = 'agent_7301kdxbnshce7vv8mtah970y3g1';
const API_BASE = 'https://api.elevenlabs.io/v1';

async function main() {
  // Get all tools
  console.log('Fetching all tools...');
  const toolsRes = await fetch(`${API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const toolsData = await toolsRes.json();
  const allTools = toolsData.tools;
  console.log(`Total tools in account: ${allTools.length}`);

  // Get current employer agent
  console.log('\nFetching Employer agent...');
  const agentRes = await fetch(`${API_BASE}/convai/agents/${EMPLOYER_AGENT_ID}`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const agentData = await agentRes.json();
  const currentToolIds = agentData.conversation_config?.agent?.prompt?.tool_ids || [];
  console.log(`Current Employer tools: ${currentToolIds.length}`);

  // Find all quote/invoice related tools
  const quoteTools = allTools.filter(t => {
    const name = t.tool_config.name.toLowerCase();
    return name.includes('quote') || name.includes('invoice');
  });

  console.log('\nQuote/Invoice tools found:');
  quoteTools.forEach(t => {
    const isOnAgent = currentToolIds.includes(t.id);
    console.log(`  ${isOnAgent ? '✓' : '✗'} ${t.tool_config.name}`);
  });

  // Get quote tool IDs
  const quoteToolIds = quoteTools.map(t => t.id);

  // Find missing
  const missingIds = quoteToolIds.filter(id => !currentToolIds.includes(id));
  console.log(`\nMissing from Employer: ${missingIds.length} tools`);

  if (missingIds.length === 0) {
    console.log('All quote tools already on Employer agent!');
    return;
  }

  // Combine (deduplicated), respect 200 limit
  const combined = [...new Set([...currentToolIds, ...quoteToolIds])];
  const finalTools = combined.slice(0, 200);
  console.log(`\nUpdating Employer with ${finalTools.length} tools...`);

  // Update agent
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
            tool_ids: finalTools
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

  console.log('✓ Employer agent updated with quote tools!');

  // Verify
  const verifyRes = await fetch(`${API_BASE}/convai/agents/${EMPLOYER_AGENT_ID}`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const verifyData = await verifyRes.json();
  const newToolIds = verifyData.conversation_config?.agent?.prompt?.tool_ids || [];

  console.log(`\nVerification: Employer now has ${newToolIds.length} tools`);

  // Check quote tools
  const quoteToolsOnAgent = quoteTools.filter(t => newToolIds.includes(t.id));
  console.log(`Quote/Invoice tools on Employer: ${quoteToolsOnAgent.length}/${quoteTools.length}`);
}

main().catch(console.error);
