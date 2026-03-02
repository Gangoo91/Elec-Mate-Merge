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
 *   openclaw agents bind --agent <user_id> --bind whatsapp:<jid>
 */

import { type Request, type Response } from 'express';
import { spawn } from 'node:child_process';
import { mkdir, symlink, writeFile, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { config } from '../config.js';

const OPENCLAW_HOME = '/home/openclaw/.openclaw';
const OPENCLAW_CONFIG = join(OPENCLAW_HOME, 'openclaw.json');
const SHARED_WORKSPACE = join(OPENCLAW_HOME, 'workspace');
const WORKSPACES_DIR = join(OPENCLAW_HOME, 'workspaces');
const OPENCLAW_BIN = '/usr/lib/node_modules/openclaw/openclaw.mjs';
/** Host Node 22 binary mounted into container (openclaw requires >=22.12) */
const NODE22_BIN = '/usr/local/bin/node22';

/** Files to symlink from the shared workspace */
const SHARED_FILES = [
  'SKILL.md',
  'SOUL.md',
  'TOOLS.md',
  'AGENTS.md',
  'RAILS.md',
  'SECURITY.md',
  'DATA_POLICY.md',
  'USER_PROFILE.md',
  'HEARTBEAT.md',
  'IDENTITY.md',
];

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

export async function handleProvisionAgent(req: Request, res: Response): Promise<void> {
  // Authenticate via X-API-Key
  const apiKey = req.headers['x-api-key'] as string | undefined;
  if (!apiKey || apiKey !== config.vpsApiKey) {
    res.status(401).json({ error: 'Invalid or missing API key' });
    return;
  }

  const body = req.body as ProvisionRequest;

  // Validate required fields
  if (!body.user_id || !body.phone_number) {
    res.status(400).json({ error: 'user_id and phone_number are required' });
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

    // 2. Symlink shared files (skip if already exists)
    for (const file of SHARED_FILES) {
      const target = join(SHARED_WORKSPACE, file);
      const link = join(workspaceDir, file);
      try {
        await symlink(target, link);
      } catch (err: unknown) {
        // EEXIST is fine — symlink already exists
        if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err;
      }
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

    // 5. Register agent with OpenClaw
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

    // 6. Bind WhatsApp number
    try {
      await runCommand(NODE22_BIN, [
        OPENCLAW_BIN,
        'agents',
        'bind',
        '--agent',
        user_id,
        '--bind',
        `whatsapp:${jid}`,
      ]);
      console.log(`[provision] Bound WhatsApp ${jid} to agent ${user_id}`);
    } catch (err: unknown) {
      const msg = (err as Error).message || '';
      if (!msg.includes('already bound')) {
        throw err;
      }
      console.log(`[provision] WhatsApp ${jid} already bound, continuing`);
    }

    // 7. Add JID to allowFrom in openclaw.json (dmPolicy: "allowlist")
    try {
      const raw = await readFile(OPENCLAW_CONFIG, 'utf-8');
      const ocConfig = JSON.parse(raw);
      const allowFrom: string[] = ocConfig.channels?.whatsapp?.allowFrom || [];
      if (!allowFrom.includes(jid)) {
        allowFrom.push(jid);
        ocConfig.channels.whatsapp.allowFrom = allowFrom;
        await writeFile(OPENCLAW_CONFIG, JSON.stringify(ocConfig, null, 4), 'utf-8');
        console.log(`[provision] Added ${jid} to allowFrom`);
      } else {
        console.log(`[provision] ${jid} already in allowFrom`);
      }
    } catch (err: unknown) {
      // Non-fatal — agent still works, just needs manual allowlist entry
      console.error(`[provision] Failed to update allowFrom: ${(err as Error).message}`);
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
    });
  } catch (err) {
    console.error(`[provision] Failed for ${user_id}:`, err);
    res.status(500).json({
      error: 'Provisioning failed',
      detail: (err as Error).message,
    });
  }
}
