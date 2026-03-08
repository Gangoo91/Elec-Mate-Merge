/**
 * Elec-AI MCP Server
 *
 * Serves 53+ tools to OpenClaw agents via dual transport:
 *   - HTTP mode (default): Streamable HTTP on configurable port
 *   - stdio mode: stdin/stdout for OpenClaw subprocess spawning
 *
 * Security layers:
 *   - JWT authentication on every request (HTTP) or at startup (stdio)
 *   - Per-user rate limiting (SECURITY.md §8)
 *   - Automatic audit logging (SECURITY.md §9)
 *   - Edge function allowlist (SECURITY.md §14)
 *   - CORS + security headers (HTTP mode)
 *
 * Endpoints (HTTP mode):
 *   POST /mcp    — MCP Streamable HTTP transport
 *   GET  /health — Health check with dependency status
 */

import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import express from 'express';
import { config, validateConfig } from './config.js';
import { authenticateUser, authenticateFromJwt, AuthError } from './auth.js';
import { registerAllTools } from './tools/registry.js';
import {
  RateLimitError,
  enforceRateLimits,
  cleanupRateLimiter,
} from './middleware/rate-limiter.js';
import { EdgeFunctionBlockedError } from './middleware/edge-function-guard.js';
import { createUserClient } from './lib/supabase.js';
import { handleProvisionAgent } from './api/provision-agent.js';
import { getHandler } from './tools/router.js';
import { logToolCall } from './middleware/audit-logger.js';
import { sanitiseError } from './lib/error-sanitiser.js';

// ─── Graceful shutdown ─────────────────────────────────────────────────
let isShuttingDown = false;
let httpServer: ReturnType<typeof import('net').createServer> | null = null;

function shutdown(signal: string): void {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`\n${signal} received — shutting down gracefully...`);

  cleanupRateLimiter();

  if (httpServer) {
    httpServer.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
    // Force exit after 10s if connections don't drain
    setTimeout(() => {
      console.error('Forced shutdown after 10s timeout.');
      process.exit(1);
    }, 10_000);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ─── HTTP mode ─────────────────────────────────────────────────────────

function startHttp(): void {
  const app = express();

  // ── Security headers (every response) ──────────────────────────────
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '0');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    next();
  });

  // ── CORS ───────────────────────────────────────────────────────────
  app.use((req, res, next) => {
    const allowedOrigins = config.corsOrigins;

    if (allowedOrigins === '*') {
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else {
      const origins = allowedOrigins.split(',').map((o) => o.trim());
      const requestOrigin = req.headers.origin || '';
      if (origins.includes(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      }
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Request-Id, X-API-Key, X-Sender-Phone'
    );
    res.setHeader('Access-Control-Expose-Headers', 'X-Request-Id');
    res.setHeader('Access-Control-Max-Age', '86400');

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    next();
  });

  // ── Request correlation ID ─────────────────────────────────────────
  app.use((req, res, next) => {
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    res.setHeader('X-Request-Id', requestId);
    next();
  });

  app.use(express.json({ limit: '1mb' }));

  // ── Health check ───────────────────────────────────────────────────
  app.get('/health', async (_req, res) => {
    if (isShuttingDown) {
      res.status(503).json({ status: 'shutting_down' });
      return;
    }

    const mem = process.memoryUsage();
    const health: Record<string, unknown> = {
      status: 'ok',
      service: 'elec-ai-mcp',
      version: '1.0.0',
      transport: 'http',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      memory_mb: {
        rss: Math.round(mem.rss / 1048576),
        heap_used: Math.round(mem.heapUsed / 1048576),
        heap_total: Math.round(mem.heapTotal / 1048576),
      },
    };

    // Check Supabase
    if (config.supabaseAnonKey) {
      try {
        const supabase = createUserClient(config.supabaseAnonKey);
        const start = Date.now();
        await supabase.from('profiles').select('id').limit(1);
        health.supabase = { status: 'ok', latency_ms: Date.now() - start };
      } catch {
        health.supabase = { status: 'error' };
        health.status = 'degraded';
      }
    } else {
      health.supabase = { status: 'not_configured' };
      health.status = 'degraded';
    }

    // Check OpenClaw gateway process
    try {
      const { execSync } = await import('node:child_process');
      const count = execSync('pgrep -cf openclaw 2>/dev/null || echo 0', {
        encoding: 'utf-8',
        timeout: 3000,
      }).trim();
      const n = parseInt(count, 10);
      health.openclaw = { status: n > 0 ? 'ok' : 'down', processes: n };
      if (n === 0) health.status = 'degraded';
    } catch {
      health.openclaw = { status: 'unknown' };
    }

    // Count active agent workspaces
    try {
      const { readdirSync, existsSync } = await import('node:fs');
      const wsDir = '/root/.openclaw/workspaces';
      if (existsSync(wsDir)) {
        const dirs = readdirSync(wsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
        health.agents = { active_workspaces: dirs.length };
      } else {
        health.agents = { active_workspaces: 0 };
      }
    } catch {
      health.agents = { active_workspaces: 'unknown' };
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
  });

  // ── Agent provisioning endpoint ──────────────────────────────────
  app.post('/api/provision-agent', handleProvisionAgent);

  // ── REST tool-call endpoint (bypasses mcporter) ─────────────────
  app.post('/api/tool-call', async (req, res) => {
    if (isShuttingDown) {
      res.status(503).json({ error: 'Server is shutting down' });
      return;
    }

    const apiKey = req.headers['x-api-key'] as string | undefined;
    const {
      tool,
      arguments: toolArgs,
      sender_phone: senderPhone,
    } = req.body as {
      tool?: string;
      arguments?: Record<string, unknown>;
      sender_phone?: string;
    };

    if (!tool) {
      res.status(400).json({ error: 'Missing required field: tool' });
      return;
    }

    try {
      const userContext = await authenticateUser(undefined, apiKey, senderPhone);

      const handler = getHandler(tool);
      if (!handler) {
        res.status(404).json({ error: `Unknown tool: ${tool}` });
        return;
      }

      enforceRateLimits(userContext.userId, tool);

      const startTime = Date.now();
      const result = await handler(toolArgs || {}, userContext);
      const durationMs = Date.now() - startTime;

      logToolCall(userContext, tool, toolArgs || {}, { success: true, durationMs });

      res.json({ success: true, result });
    } catch (err) {
      if (err instanceof AuthError) {
        res.status(401).json({ error: err.message, code: err.code });
        return;
      }
      if (err instanceof RateLimitError) {
        res.status(429).json({ error: err.message, retry_after_ms: err.retryAfterMs });
        return;
      }
      const rawMessage = err instanceof Error ? err.message : String(err);
      console.error(`[tool-call] ${tool} error:`, rawMessage);
      res.status(500).json({ error: sanitiseError(rawMessage) });
    }
  });

  // ── Proactive message endpoint (used by cron edge functions) ──────
  app.post('/api/send-message', async (req, res) => {
    if (isShuttingDown) {
      res.status(503).json({ error: 'Server is shutting down' });
      return;
    }

    const apiKey = req.headers['x-api-key'] as string | undefined;
    if (!apiKey || apiKey !== config.vpsApiKey) {
      res.status(401).json({ error: 'Invalid API key' });
      return;
    }

    const { target, message, channel } = req.body as {
      target?: string;
      message?: string;
      channel?: string;
    };

    if (!target || !message) {
      res.status(400).json({ error: 'Missing required fields: target, message' });
      return;
    }

    const ch = channel || 'whatsapp';

    try {
      const { execSync } = await import('node:child_process');
      const result = execSync(
        `openclaw message send --channel ${ch} --target "${target}" --message "${message.replace(/"/g, '\\"')}" --json 2>&1`,
        { timeout: 30_000, encoding: 'utf-8' }
      );
      res.json({ success: true, result: result.trim() });
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : String(err);
      console.error('[send-message] Error:', rawMsg);
      res.status(500).json({ error: sanitiseError(rawMsg) });
    }
  });

  // ── MCP Streamable HTTP endpoint ───────────────────────────────────
  app.post('/mcp', async (req, res) => {
    if (isShuttingDown) {
      res.status(503).json({ error: 'Server is shutting down' });
      return;
    }

    try {
      const userContext = await authenticateUser(
        req.headers.authorization,
        req.headers['x-api-key'] as string | undefined,
        req.headers['x-sender-phone'] as string | undefined
      );

      const server = new McpServer({
        name: 'elec-ai-mcp',
        version: '1.0.0',
      });

      registerAllTools(server, userContext);

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });

      await server.connect(transport);

      res.on('close', () => {
        transport.close?.();
        server.close?.();
      });

      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      if (res.headersSent) return;

      if (err instanceof AuthError) {
        res.status(401).json({ error: err.message, code: err.code });
        return;
      }
      if (err instanceof RateLimitError) {
        res.status(429).json({
          error: err.message,
          retry_after_ms: err.retryAfterMs,
        });
        return;
      }
      if (err instanceof EdgeFunctionBlockedError) {
        res.status(403).json({ error: err.message });
        return;
      }
      console.error('MCP request error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Handle GET and DELETE (MCP spec requires 405)
  app.get('/mcp', (_req, res) => {
    res.status(405).json({ error: 'Method not allowed — use POST for Streamable HTTP' });
  });
  app.delete('/mcp', (_req, res) => {
    res.status(405).json({ error: 'Method not allowed — stateless server, no sessions to delete' });
  });

  httpServer = app.listen(config.port, () => {
    console.log(`⚡ Elec-AI MCP server listening on port ${config.port}`);
    console.log(`   Health:    http://localhost:${config.port}/health`);
    console.log(`   MCP:       http://localhost:${config.port}/mcp`);
    console.log(`   Transport: HTTP (Streamable)`);
    console.log(`   Env:       ${config.nodeEnv}`);
    console.log(`   CORS:      ${config.corsOrigins}`);
  });
}

// ─── stdio mode ────────────────────────────────────────────────────────

async function startStdio(): Promise<void> {
  // In stdio mode, auth happens once at startup from MCP_USER_JWT env var
  const userContext = await authenticateFromJwt(config.userJwt);

  const server = new McpServer({
    name: 'elec-ai-mcp',
    version: '1.0.0',
  });

  registerAllTools(server, userContext);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`⚡ Elec-AI MCP server running via stdio`);
  console.error(`   User:      ${userContext.email} (${userContext.role})`);
  console.error(`   Tools:     ${userContext.role === 'apprentice' ? '21 apprentice' : '53 core'}`);
}

// ─── Entry point ───────────────────────────────────────────────────────

function start(): void {
  validateConfig();

  if (config.transport === 'stdio') {
    startStdio().catch((err) => {
      console.error('Failed to start stdio MCP server:', err);
      process.exit(1);
    });
  } else {
    startHttp();
  }
}

start();
