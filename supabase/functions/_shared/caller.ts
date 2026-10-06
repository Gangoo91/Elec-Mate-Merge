import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

/**
 * Who is calling this edge function?
 *
 * ⚠️ `verify_jwt` does NOT protect a function: the public anon key is a valid
 * JWT, so any visitor passes the gateway (proved 7 Oct 2026). A function that
 * uses the service role must decide here who the caller is and act only on
 * that caller's data.
 *
 *  - 'service' — the Authorization header is the service-role key: pg_cron
 *    (vault secret `service_role_key`) or another edge function.
 *  - 'user'    — a signed-in user's JWT (auth.getUser succeeds).
 *  - null      — anyone else, including the public anon key.
 */
export type Caller = { kind: 'service' } | { kind: 'user'; userId: string; email: string | null };

export async function identifyCaller(req: Request): Promise<Caller | null> {
  const header = req.headers.get('Authorization') ?? '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  if (serviceKey && token === serviceKey) return { kind: 'service' };
  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data?.user) return null;
  return { kind: 'user', userId: data.user.id, email: data.user.email ?? null };
}

/** profiles.admin_role in (super_admin, admin) — the same test the admin-* functions use. */
export async function isAdminUser(userId: string): Promise<boolean> {
  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data } = await admin.from('profiles').select('admin_role').eq('id', userId).maybeSingle();
  return !!data && ['super_admin', 'admin'].includes((data as { admin_role?: string }).admin_role ?? '');
}

/** Service role (cron / other functions) or a platform admin. */
export async function isServiceOrAdmin(req: Request): Promise<boolean> {
  const c = await identifyCaller(req);
  if (!c) return false;
  if (c.kind === 'service') return true;
  return isAdminUser(c.userId);
}

export function deny(cors: Record<string, string>, status = 401, message = 'Unauthorised'): Response {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

/**
 * Can the caller see this row under the database's own rules (RLS)? Used
 * before a service-role function acts on a record named in the request, so
 * shared access (team members, co-admins) works exactly as it does in the app
 * and nobody acts on a record they cannot see.
 */
export async function callerCanSee(req: Request, table: string, id: string): Promise<boolean> {
  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth: { persistSession: false },
  });
  const { data, error } = await client.from(table).select('id').eq('id', id).maybeSingle();
  return !error && !!data;
}
