/**
 * POST /api/provision-agent
 *
 * Creates per-user OpenClaw agent workspace and registers the agent.
 * Called by the provision-business-ai edge function after Supabase provisioning.
 *
 * Authenticated via X-API-Key (VPS_API_KEY).
 *
 * Body:
 *   { user_id, phone_number, full_name, role }
 *
 * Creates:
 *   /home/openclaw/.openclaw/workspaces/<user_id>/
 *     ├── Symlinks to shared workspace files (SKILL.md, TOOLS.md, etc.)
 *     ├── USER.md (unique per user)
 *     └── config/mcporter.json (unique per user — X-Sender-Phone)
 *
 * Then runs:
 *   openclaw agents add <user_id> --workspace <dir>
 *   Adds peer binding + allowFrom directly in openclaw.json
 */

import { type Request, type Response } from 'express';
import { spawn, execSync } from 'node:child_process';
import {
  chmod,
  mkdir,
  symlink,
  writeFile,
  readFile,
  readdir,
  lstat,
  unlink,
  readlink,
  access,
} from 'node:fs/promises';
import { join } from 'node:path';
import { config } from '../config.js';

const OPENCLAW_HOME = '/home/openclaw/.openclaw';
const OPENCLAW_CONFIG = join(OPENCLAW_HOME, 'openclaw.json');
const SHARED_WORKSPACE = join(OPENCLAW_HOME, 'workspace');
const WORKSPACES_DIR = join(OPENCLAW_HOME, 'workspaces');
const OPENCLAW_BIN = '/usr/lib/node_modules/openclaw/openclaw.mjs';
/** Host Node 22 binary mounted into container (openclaw requires >=22.12) */
const NODE22_BIN = '/usr/local/bin/node22';

/** Files to symlink from the shared workspace — must match what actually exists */
const SHARED_FILES = [
  'AGENTS.md',
  'SOUL.md',
  'TOOLS.md',
  'BOOTSTRAP.md',
  'IDENTITY.md',
  'HEARTBEAT.md',
  'SKILL_REFERENCE.md',
  'RAILS_REFERENCE.md',
  'USER_PROFILE.md',
];

/**
 * Repair workspace symlinks — replaces stale copies or broken symlinks
 * with correct symlinks pointing to the shared workspace.
 * Idempotent: safe to call on every provision request.
 */
async function repairWorkspaceSymlinks(workspaceDir: string): Promise<string[]> {
  const repaired: string[] = [];

  for (const file of SHARED_FILES) {
    const target = join(SHARED_WORKSPACE, file);
    const link = join(workspaceDir, file);

    // Check if shared file exists
    try {
      await access(target);
    } catch {
      // Target doesn't exist in shared workspace — skip silently
      continue;
    }

    try {
      const stat = await lstat(link);

      if (stat.isSymbolicLink()) {
        // Check if symlink points to the right target
        const currentTarget = await readlink(link);
        if (currentTarget === target) continue; // Already correct
        // Wrong target — fix it
        await unlink(link);
        await symlink(target, link);
        repaired.push(`${file}: fixed symlink target (was ${currentTarget})`);
      } else if (stat.isFile()) {
        // Regular file (stale copy) — replace with symlink
        await unlink(link);
        await symlink(target, link);
        repaired.push(`${file}: replaced stale copy with symlink`);
      }
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        // File doesn't exist — create symlink
        await symlink(target, link);
        repaired.push(`${file}: created new symlink`);
      } else {
        console.error(
          `[provision] Failed to repair symlink for ${file}: ${(err as Error).message}`
        );
      }
    }
  }

  return repaired;
}

/** Convert phone number to WhatsApp JID format */
function phoneToJid(phone: string): string {
  // Strip + and any non-digit chars, append @s.whatsapp.net
  const digits = phone.replace(/\D/g, '');
  return `${digits}@s.whatsapp.net`;
}

/** Run a shell command and return stdout (stdin closed to prevent hangs) */
function runCommand(cmd: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      env: { ...process.env, HOME: '/home/openclaw' },
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 60_000,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });
    child.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (stderr) {
        console.log(`[provision] ${cmd} stderr: ${stderr.trim()}`);
      }
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Command exited with code ${code}: ${stderr || stdout}`));
      }
    });

    child.on('error', reject);
  });
}

interface ProvisionRequest {
  user_id: string;
  phone_number: string;
  full_name: string;
  role?: string;
}

/** Shell-escape a string for safe embedding in bash scripts */
function shellEscape(s: string): string {
  return `'${s.replace(/'/g, "'\\''")}'`;
}

export async function handleProvisionAgent(req: Request, res: Response): Promise<void> {
  // Authenticate via X-API-Key (timing-safe)
  const { timingSafeCompare } = await import('../lib/request-signer.js');
  const apiKey = req.headers['x-api-key'] as string | undefined;
  if (!apiKey || !config.vpsApiKey || !timingSafeCompare(apiKey, config.vpsApiKey)) {
    res.status(401).json({ error: 'Invalid or missing API key' });
    return;
  }

  const body = req.body as ProvisionRequest;

  // Validate required fields
  if (!body.user_id || !body.phone_number) {
    res.status(400).json({ error: 'user_id and phone_number are required' });
    return;
  }

  // Input validation — prevent injection
  if (!/^\+\d{7,15}$/.test(body.phone_number)) {
    res.status(400).json({ error: 'phone_number must be E.164 format (e.g. +447507241303)' });
    return;
  }
  if (!/^[a-f0-9-]{36}$/i.test(body.user_id)) {
    res.status(400).json({ error: 'user_id must be a valid UUID' });
    return;
  }
  if (body.full_name && body.full_name.length > 100) {
    res.status(400).json({ error: 'full_name must be under 100 characters' });
    return;
  }

  const { user_id, phone_number, full_name, role } = body;
  const userRole = role || 'electrician';
  const workspaceDir = join(WORKSPACES_DIR, user_id);
  const configDir = join(workspaceDir, 'config');

  console.log(`[provision] Starting provisioning for ${user_id} (${full_name})`);

  try {
    // 1. Create workspace directory
    await mkdir(workspaceDir, { recursive: true });
    await mkdir(configDir, { recursive: true });

    // 2. Repair/create workspace symlinks — replaces stale copies with correct symlinks
    const repaired = await repairWorkspaceSymlinks(workspaceDir);
    if (repaired.length > 0) {
      console.log(`[provision] Repaired symlinks: ${repaired.join('; ')}`);
    }

    // 3. Create USER.md (unique per user)
    const userMd = `# User Profile

- **Name:** ${full_name}
- **Phone:** ${phone_number}
- **Role:** ${userRole}
- **User ID:** ${user_id}

This user is verified and provisioned for the Elec-Mate Business AI agent.
Always address them by name and use their data from the MCP tools.
`;
    await writeFile(join(workspaceDir, 'USER.md'), userMd, 'utf-8');

    // 4. Create per-user mcporter config (X-Sender-Phone baked in)
    const mcporterConfig = {
      mcpServers: {
        elecmate: {
          baseUrl: 'http://127.0.0.1:3100/mcp',
          description: 'Elec-Mate Business AI tools for UK electricians',
          headers: {
            'X-API-Key': config.vpsApiKey,
            'X-Sender-Phone': phone_number,
          },
          timeout: 180000,
        },
      },
      imports: [],
    };
    await writeFile(
      join(configDir, 'mcporter.json'),
      JSON.stringify(mcporterConfig, null, 2),
      'utf-8'
    );

    // 5. Create per-user bin/mcp-call wrapper (bypasses mcporter for data isolation)
    const binDir = join(workspaceDir, 'bin');
    await mkdir(binDir, { recursive: true });

    const mcpCallScript = `#!/bin/bash
# Tool caller for ${(full_name || '').replace(/[^a-zA-Z0-9 .-]/g, '')} — identity baked in
export MCP_SENDER_PHONE=${shellEscape(phone_number)}
export MCP_API_KEY=${shellEscape(config.vpsApiKey)}
export MCP_HMAC_SECRET=${shellEscape(config.hmacSecret || '')}
exec /opt/elec-ai/mcp-call "$@"
`;
    const mcpCallPath = join(binDir, 'mcp-call');
    await writeFile(mcpCallPath, mcpCallScript, 'utf-8');
    await chmod(mcpCallPath, 0o755);
    console.log(`[provision] Created ${mcpCallPath}`);

    // 6. Register agent with OpenClaw
    const jid = phoneToJid(phone_number);

    try {
      await runCommand(NODE22_BIN, [
        OPENCLAW_BIN,
        'agents',
        'add',
        user_id,
        '--workspace',
        workspaceDir,
        '--non-interactive',
      ]);
      console.log(`[provision] Agent added: ${user_id}`);
    } catch (err: unknown) {
      const msg = (err as Error).message || '';
      // Agent may already exist — that's okay
      if (!msg.includes('already exists')) {
        throw err;
      }
      console.log(`[provision] Agent ${user_id} already exists, continuing`);
    }

    // 7. Add peer-based WhatsApp binding + allowFrom in openclaw.json
    //    We write directly to openclaw.json because `openclaw agents bind`
    //    creates accountId bindings (wrong — accountId = bot login, not sender).
    //    Peer bindings match the sender's phone number (E.164 format).
    try {
      const raw = await readFile(OPENCLAW_CONFIG, 'utf-8');
      const ocConfig = JSON.parse(raw);

      // Add peer-based binding (skip if already exists for this agent)
      const bindings: Array<Record<string, unknown>> = ocConfig.bindings || [];
      const alreadyBound = bindings.some((b: Record<string, unknown>) => b.agentId === user_id);
      if (!alreadyBound) {
        bindings.push({
          agentId: user_id,
          match: {
            channel: 'whatsapp',
            peer: { kind: 'direct', id: phone_number },
          },
        });
        ocConfig.bindings = bindings;
        console.log(`[provision] Added peer binding: whatsapp direct ${phone_number} → ${user_id}`);
      } else {
        console.log(`[provision] Binding for ${user_id} already exists`);
      }

      // Add JID to allowFrom (dmPolicy: "allowlist")
      const allowFrom: string[] = ocConfig.channels?.whatsapp?.allowFrom || [];
      if (!allowFrom.includes(jid)) {
        allowFrom.push(jid);
        ocConfig.channels.whatsapp.allowFrom = allowFrom;
        console.log(`[provision] Added ${jid} to allowFrom`);
      } else {
        console.log(`[provision] ${jid} already in allowFrom`);
      }

      await writeFile(OPENCLAW_CONFIG, JSON.stringify(ocConfig, null, 2), 'utf-8');
    } catch (err: unknown) {
      // Non-fatal — agent still works, just needs manual config entry
      console.error(`[provision] Failed to update openclaw.json: ${(err as Error).message}`);
    }

    // 8. Fix ownership — Docker runs as root, OpenClaw gateway runs as openclaw user
    try {
      execSync(`chown -R openclaw:openclaw ${workspaceDir}`);
      const agentDir = join(OPENCLAW_HOME, 'agents', user_id);
      execSync(`chown -R openclaw:openclaw ${agentDir}`);
      console.log(`[provision] Fixed ownership for workspace and agent dirs`);
    } catch (chownErr) {
      // Non-fatal — log but continue (dirs may still work if permissions are open)
      console.error(`[provision] chown failed: ${(chownErr as Error).message}`);
    }

    // 9. Signal gateway restart by writing a marker file (host systemd watches this)
    try {
      await writeFile(join(OPENCLAW_HOME, '.restart-gateway'), Date.now().toString());
      console.log(`[provision] Gateway restart marker written`);
    } catch (restartErr) {
      console.error(`[provision] Failed to write restart marker: ${(restartErr as Error).message}`);
    }

    // Verify workspace
    const files = await readdir(workspaceDir);
    console.log(`[provision] Workspace created with ${files.length} entries: ${files.join(', ')}`);

    res.status(200).json({
      provisioned: true,
      user_id,
      workspace: workspaceDir,
      whatsapp_jid: jid,
      files: files,
      repaired_symlinks: repaired,
    });
  } catch (err) {
    console.error(`[provision] Failed for ${user_id}:`, err);
    res.status(500).json({
      error: 'Provisioning failed',
      detail: (err as Error).message,
    });
  }
}

/**
 * POST /api/repair-workspaces
 * Scans ALL workspaces (including workspace-main) and repairs stale symlinks.
 * Run this after updating shared workspace files to ensure all agents see the latest.
 */
export async function handleRepairWorkspaces(req: Request, res: Response): Promise<void> {
  const { timingSafeCompare } = await import('../lib/request-signer.js');
  const apiKey = req.headers['x-api-key'] as string | undefined;
  if (!apiKey || !config.vpsApiKey || !timingSafeCompare(apiKey, config.vpsApiKey)) {
    res.status(401).json({ error: 'Invalid or missing API key' });
    return;
  }

  const results: Record<string, string[]> = {};

  try {
    // Repair workspace-main (the default/main agent workspace)
    const workspaceMain = join(OPENCLAW_HOME, 'workspace-main');
    try {
      const repaired = await repairWorkspaceSymlinks(workspaceMain);
      if (repaired.length > 0) results['workspace-main'] = repaired;
    } catch {
      /* workspace-main may not exist */
    }

    // Repair all user workspaces
    try {
      const dirs = await readdir(WORKSPACES_DIR, { withFileTypes: true });
      for (const d of dirs) {
        if (!d.isDirectory()) continue;
        const ws = join(WORKSPACES_DIR, d.name);
        const repaired = await repairWorkspaceSymlinks(ws);
        if (repaired.length > 0) results[d.name] = repaired;
      }
    } catch {
      /* workspaces dir may not exist */
    }

    const totalRepaired = Object.values(results).reduce((sum, r) => sum + r.length, 0);
    console.log(
      `[repair] Repaired ${totalRepaired} symlinks across ${Object.keys(results).length} workspaces`
    );

    res.json({
      success: true,
      repaired_count: totalRepaired,
      workspaces: results,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
