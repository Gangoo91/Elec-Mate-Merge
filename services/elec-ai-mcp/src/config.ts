/**
 * Environment configuration for the Elec-AI MCP server.
 * All values read from environment variables with sensible defaults.
 */

export const config = {
  /** Port the MCP server listens on (HTTP mode only) */
  port: parseInt(process.env.MCP_PORT || '3100', 10),

  /** Transport mode: 'http' (Express, default) or 'stdio' (stdin/stdout for OpenClaw) */
  transport: (process.env.MCP_TRANSPORT || 'http') as 'http' | 'stdio',

  /** Pre-configured user JWT for stdio mode (one user per process) */
  userJwt: process.env.MCP_USER_JWT || '',

  /** Supabase project URL */
  supabaseUrl: process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co',

  /** Supabase anon key — used with user JWTs for RLS-scoped queries */
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',

  /** Supabase service role key — used ONLY for provisioning, never exposed to agents */
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

  /** Comma-separated list of allowed CORS origins (HTTP mode) */
  corsOrigins: process.env.CORS_ORIGINS || '*',

  /** Server environment */
  nodeEnv: process.env.NODE_ENV || 'development',

  /** Log level */
  logLevel: process.env.LOG_LEVEL || 'info',

  /** VPS API key for API key auth mode (mcporter / localhost tools) */
  vpsApiKey: process.env.VPS_API_KEY || '',

  /** Default phone number for API key auth → JWT resolution */
  defaultPhone: process.env.DEFAULT_PHONE || '+447506026934',

  /** Anthropic API key for vision analysis (Claude) */
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
} as const;

/** Validate required config on startup */
export function validateConfig(): void {
  const required: (keyof typeof config)[] = ['supabaseUrl', 'supabaseAnonKey'];

  const missing = required.filter((key) => !config[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // stdio mode requires a user JWT
  if (config.transport === 'stdio' && !config.userJwt) {
    throw new Error('MCP_USER_JWT is required when MCP_TRANSPORT=stdio');
  }
}
