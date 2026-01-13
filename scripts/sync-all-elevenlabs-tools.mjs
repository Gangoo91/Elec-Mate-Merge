#!/usr/bin/env node
/**
 * Sync ALL tools from voiceToolsRegistry to ElevenLabs
 * Then assign to both Electrician and Employer agents
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = 'sk_a88cf76a8e4f26859699dd0a6c50539ce7e0a31d0a1fe9e5';
const ELECTRICIAN_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';
const EMPLOYER_AGENT_ID = 'agent_7301kdxbnshce7vv8mtah970y3g1';
const API_BASE = 'https://api.elevenlabs.io/v1';

// Read and parse the voiceToolsRegistry
const registryPath = path.join(__dirname, '../src/config/voiceToolsRegistry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf-8');

// Extract the tools array using regex (simplified parsing)
function parseToolsFromRegistry(content) {
  const tools = [];

  // Find all tool definitions
  const toolRegex = /\{\s*name:\s*['"]([^'"]+)['"]\s*,\s*description:\s*['"]([^'"]+)['"]\s*,\s*category:\s*['"]([^'"]+)['"]\s*,\s*parameters:\s*\[([\s\S]*?)\]\s*,\s*waitForResponse:\s*(true|false)\s*,\s*disableInterruptions:\s*(true|false)\s*,\s*executionMode:\s*['"]([^'"]+)['"]\s*\}/g;

  let match;
  while ((match = toolRegex.exec(content)) !== null) {
    const [_, name, description, category, paramsStr, waitForResponse, disableInterruptions, executionMode] = match;

    // Parse parameters
    const params = [];
    const paramRegex = /\{\s*name:\s*['"]([^'"]+)['"]\s*,\s*type:\s*['"]([^'"]+)['"]\s*,\s*required:\s*(true|false)\s*,\s*description:\s*['"]([^'"]+)['"](?:\s*,\s*enumValues:\s*\[([^\]]*)\])?\s*\}/g;
    let paramMatch;
    while ((paramMatch = paramRegex.exec(paramsStr)) !== null) {
      params.push({
        name: paramMatch[1],
        type: paramMatch[2],
        required: paramMatch[3] === 'true',
        description: paramMatch[4],
        enumValues: paramMatch[5] ? paramMatch[5].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean) : undefined
      });
    }

    tools.push({
      name,
      description,
      category,
      parameters: params,
      waitForResponse: waitForResponse === 'true',
      disableInterruptions: disableInterruptions === 'true',
      executionMode
    });
  }

  return tools;
}

// Convert to ElevenLabs format
function convertToElevenLabsFormat(tool) {
  const properties = {};
  const required = [];

  for (const param of tool.parameters) {
    properties[param.name] = {
      type: param.type === 'array' ? 'array' : param.type,
      description: param.description
    };
    if (param.enumValues && param.enumValues.length > 0) {
      properties[param.name].enum = param.enumValues;
    }
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
        required
      },
      expects_response: tool.waitForResponse,
      disable_interruptions: tool.disableInterruptions
    }
  };
}

// Get existing tools
async function getExistingTools() {
  const response = await fetch(`${API_BASE}/convai/tools`, {
    headers: { 'xi-api-key': API_KEY }
  });
  const data = await response.json();
  return new Map(data.tools.map(t => [t.tool_config.name, t.id]));
}

// Create a tool
async function createTool(tool) {
  const body = convertToElevenLabsFormat(tool);
  const response = await fetch(`${API_BASE}/convai/tools`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create ${tool.name}: ${error}`);
  }

  const data = await response.json();
  return data.id;
}

// Update an existing tool
async function updateTool(toolId, tool) {
  const body = convertToElevenLabsFormat(tool);
  const response = await fetch(`${API_BASE}/convai/tools/${toolId}`, {
    method: 'PATCH',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update ${tool.name}: ${error}`);
  }

  return await response.json();
}

// Update agent with tools
async function updateAgentTools(agentId, toolIds) {
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
    throw new Error(`Failed to update agent ${agentId}: ${error}`);
  }

  return await response.json();
}

// Main sync function
async function syncAllTools() {
  console.log('=== ElevenLabs Full Tool Sync ===\n');

  // Parse registry
  console.log('Parsing voiceToolsRegistry...');
  const registryTools = parseToolsFromRegistry(registryContent);
  console.log(`Found ${registryTools.length} tools in registry\n`);

  // Get existing tools
  console.log('Fetching existing tools from ElevenLabs...');
  const existingTools = await getExistingTools();
  console.log(`Found ${existingTools.size} existing tools\n`);

  // Sync ALL tools - create new ones OR update existing ones
  let created = 0;
  let updated = 0;
  let failed = 0;
  const allToolIds = [];

  for (const tool of registryTools) {
    try {
      const existingId = existingTools.get(tool.name);

      if (existingId) {
        // UPDATE existing tool
        process.stdout.write(`Updating ${tool.name}... `);
        await updateTool(existingId, tool);
        allToolIds.push(existingId);
        updated++;
        console.log(`✓ updated`);
      } else {
        // CREATE new tool
        process.stdout.write(`Creating ${tool.name}... `);
        const id = await createTool(tool);
        allToolIds.push(id);
        created++;
        console.log(`✓ ${id}`);
      }

      // Rate limit - 100ms between requests
      await new Promise(r => setTimeout(r, 100));
    } catch (error) {
      failed++;
      console.log(`✗ ${error.message}`);
    }
  }

  console.log(`\nCreated: ${created}, Updated: ${updated}, Failed: ${failed}, Total: ${allToolIds.length}\n`);

  // Update both agents
  console.log('Updating Electrician agent...');
  try {
    await updateAgentTools(ELECTRICIAN_AGENT_ID, allToolIds);
    console.log(`✓ Electrician agent updated with ${allToolIds.length} tools`);
  } catch (error) {
    console.log(`✗ ${error.message}`);
  }

  console.log('Updating Employer agent...');
  try {
    await updateAgentTools(EMPLOYER_AGENT_ID, allToolIds);
    console.log(`✓ Employer agent updated with ${allToolIds.length} tools`);
  } catch (error) {
    console.log(`✗ ${error.message}`);
  }

  console.log('\n=== Sync Complete ===');
}

syncAllTools().catch(console.error);
