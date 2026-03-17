/**
 * POST /api/deprovision-agent
 *
 * Removes the OpenClaw agent binding for a user when their subscription is cancelled.
 * The workspace is preserved (archived, not deleted) so it can be restored on re-subscribe.
 *
 * Authenticated via X-API-Key (VPS_API_KEY).
 *
 * Body:
 *   { user_id }
 *
 * Actions:
 *   1. Removes the WhatsApp peer binding from openclaw.json
 *   2. Removes the agent from openclaw.json agents.list
 *   3. Restarts the gateway to pick up the changes
 *   4. Workspace files are left intact (can be re-provisioned later)
 */

import { type Request, type Response } from 'express';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { config } from '../config.js';

const OPENCLAW_HOME = '/home/openclaw/.openclaw';
const OPENCLAW_CONFIG = join(OPENCLAW_HOME, 'openclaw.json');

export async function handleDeprovisionAgent(req: Request, res: Response) {
  // Auth check
  const apiKey = req.headers['x-api-key'] as string;
  if (!apiKey || apiKey !== config.vpsApiKey) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  const { user_id } = req.body;

  if (!user_id || typeof user_id !== 'string') {
    return res.status(400).json({ error: 'user_id is required' });
  }

  console.log(`[deprovision] Deprovisioning agent for user ${user_id}`);

  try {
    // Read current OpenClaw config
    const rawConfig = await readFile(OPENCLAW_CONFIG, 'utf-8');
    const clawConfig = JSON.parse(rawConfig);

    let changed = false;

    // Remove the agent from agents.list
    if (clawConfig.agents?.list && Array.isArray(clawConfig.agents.list)) {
      const before = clawConfig.agents.list.length;
      clawConfig.agents.list = clawConfig.agents.list.filter(
        (a: { id?: string }) => a.id !== user_id
      );
      if (clawConfig.agents.list.length < before) {
        changed = true;
        console.log(`[deprovision] Removed agent ${user_id} from agents.list`);
      }
    }

    // Remove any bindings for this agent
    if (clawConfig.bindings && Array.isArray(clawConfig.bindings)) {
      const before = clawConfig.bindings.length;
      clawConfig.bindings = clawConfig.bindings.filter(
        (b: { agentId?: string }) => b.agentId !== user_id
      );
      if (clawConfig.bindings.length < before) {
        changed = true;
        console.log(`[deprovision] Removed bindings for agent ${user_id}`);
      }
    }

    if (changed) {
      await writeFile(OPENCLAW_CONFIG, JSON.stringify(clawConfig, null, 2), 'utf-8');
      console.log(`[deprovision] Updated openclaw.json`);

      // Signal gateway to reload config (SIGHUP)
      try {
        const { execSync } = await import('node:child_process');
        execSync('pkill -HUP -f "openclaw gateway"', { stdio: 'ignore' });
        console.log(`[deprovision] Sent SIGHUP to openclaw gateway`);
      } catch {
        // Gateway may not be running in container — non-fatal
        console.log(`[deprovision] Could not signal gateway (may need manual restart)`);
      }
    } else {
      console.log(`[deprovision] No agent or bindings found for ${user_id} — nothing to remove`);
    }

    // Log the action
    console.log(`[deprovision] Agent ${user_id} deprovisioned successfully`);

    return res.json({
      deprovisioned: true,
      user_id,
      config_changed: changed,
    });
  } catch (err) {
    console.error(`[deprovision] Error:`, err);
    return res.status(500).json({
      error: 'Deprovision failed',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
