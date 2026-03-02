/**
 * JWT authentication for the MCP server.
 * Validates Supabase JWTs and extracts user context.
 *
 * Two modes:
 *   - HTTP: authenticateUser(authHeader) — validates from Authorization header per request
 *   - stdio: authenticateFromJwt(jwt) — validates once at startup from env var
 *
 * Security:
 *   - Server-side JWT validation via Supabase auth.getUser()
 *   - Distinct error types: missing, malformed, expired, revoked
 *   - Profile lookup for role-based tool filtering
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from './config.js';

export interface UserContext {
  userId: string;
  email: string;
  role: 'electrician' | 'apprentice' | 'employer';
  jwt: string;
  /** Pre-built Supabase client scoped to this user — reuse across tool calls */
  supabase: SupabaseClient;
}

/**
 * Validate a JWT string and return a UserContext.
 * Shared logic for both HTTP and stdio auth paths.
 */
async function validateJwt(jwt: string): Promise<UserContext> {
  if (!jwt) {
    throw new AuthError('empty_token', 'Empty JWT token');
  }

  // Basic JWT structure check (3 dot-separated base64 segments)
  const segments = jwt.split('.');
  if (segments.length !== 3) {
    throw new AuthError('malformed_token', 'Malformed JWT — expected 3 segments');
  }

  // Create a user-scoped Supabase client
  const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
    global: {
      headers: { Authorization: `Bearer ${jwt}` },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(jwt);

  if (error) {
    const msg = error.message?.toLowerCase() || '';
    if (msg.includes('expired')) {
      throw new AuthError('expired_token', 'JWT has expired — request a new token');
    }
    if (msg.includes('invalid') || msg.includes('malformed')) {
      throw new AuthError('invalid_token', 'JWT is invalid or has been revoked');
    }
    throw new AuthError('auth_failed', `Authentication failed: ${error.message}`);
  }

  if (!user) {
    throw new AuthError('no_user', 'No user found for this JWT');
  }

  // Fetch user role from profile (email lives in auth.users, not profiles)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    throw new AuthError('no_profile', 'User profile not found — account may be incomplete');
  }

  return {
    userId: user.id,
    email: user.email || '',
    role: profile.role || 'electrician',
    jwt,
    supabase,
  };
}

// ── API key → JWT cache ─────────────────────────────────────────────
let _apiKeyJwtCache: { jwt: string; fetchedAt: number } | null = null;
const API_KEY_JWT_TTL_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Authenticate via VPS API key.
 * Fetches (and caches) a user JWT from the get-agent-jwt edge function.
 */
async function authenticateWithApiKey(apiKey: string): Promise<UserContext> {
  if (!config.vpsApiKey) {
    throw new AuthError('api_key_disabled', 'API key auth is not configured');
  }
  if (apiKey !== config.vpsApiKey) {
    throw new AuthError('invalid_api_key', 'Invalid API key');
  }

  // Use cached JWT if fresh
  if (_apiKeyJwtCache && Date.now() - _apiKeyJwtCache.fetchedAt < API_KEY_JWT_TTL_MS) {
    return validateJwt(_apiKeyJwtCache.jwt);
  }

  // Fetch a new JWT from the get-agent-jwt edge function
  const res = await fetch(`${config.supabaseUrl}/functions/v1/get-agent-jwt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-VPS-API-Key': config.vpsApiKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`,
    },
    body: JSON.stringify({ phone_number: config.defaultPhone }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({ error: 'unknown' }))) as Record<string, unknown>;
    throw new AuthError('jwt_fetch_failed', `Failed to fetch JWT: ${err.error || res.statusText}`);
  }

  const data = (await res.json()) as { jwt?: string; error?: string };
  if (!data.jwt) {
    throw new AuthError('no_jwt', `No JWT returned: ${data.error || 'unknown'}`);
  }

  _apiKeyJwtCache = { jwt: data.jwt, fetchedAt: Date.now() };
  return validateJwt(data.jwt);
}

/**
 * Authenticate from HTTP headers.
 * Supports two modes:
 *   1. Bearer JWT (Authorization: Bearer <jwt>) — standard Supabase auth
 *   2. API key (X-API-Key header or non-JWT bearer token) — for mcporter/CLI tools
 */
export async function authenticateUser(
  authHeader: string | undefined,
  apiKeyHeader?: string | undefined
): Promise<UserContext> {
  // Try API key auth first (X-API-Key header)
  if (apiKeyHeader) {
    return authenticateWithApiKey(apiKeyHeader);
  }

  if (!authHeader) {
    throw new AuthError('missing_header', 'Missing Authorization header');
  }

  // Strip Bearer prefix
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();

  // If token looks like a JWT (3 dot-separated segments), validate as JWT
  if (token.split('.').length === 3) {
    return validateJwt(token);
  }

  // Otherwise treat as API key
  return authenticateWithApiKey(token);
}

/**
 * Authenticate from a raw JWT string.
 * Used in stdio transport mode (once at startup).
 */
export async function authenticateFromJwt(jwt: string): Promise<UserContext> {
  return validateJwt(jwt);
}

export class AuthError extends Error {
  public readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}
