import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

interface CreateResult {
  created: string[];
  skipped: { email: string; reason: string }[];
  failed: { email: string; reason: string }[];
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !serviceKey || !anonKey) return json({ error: 'not_configured' }, 500);

    // ── Authorise: caller must be a super_admin ────────────────────────
    const authHeader = req.headers.get('Authorization') || '';
    const jwt = authHeader.replace('Bearer ', '').trim();
    if (!jwt) return json({ error: 'unauthorised' }, 401);

    const {
      data: { user },
      error: userErr,
    } = await createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    }).auth.getUser(jwt);
    if (userErr || !user) return json({ error: 'unauthorised' }, 401);

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: callerProfile } = await admin
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (callerProfile?.admin_role !== 'super_admin') return json({ error: 'forbidden' }, 403);

    // ── Parse + validate input ─────────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const rawEmails: unknown = body.emails;
    const password: string = typeof body.password === 'string' ? body.password : '';
    const grantAccess: boolean = body.grantAccess !== false; // default true
    const freeAccessReason: string =
      typeof body.freeAccessReason === 'string' && body.freeAccessReason.trim()
        ? body.freeAccessReason.trim()
        : 'Bulk-created via admin';
    const collegeId: string | null =
      typeof body.collegeId === 'string' && body.collegeId.trim() ? body.collegeId.trim() : null;

    if (!Array.isArray(rawEmails) || rawEmails.length === 0)
      return json({ error: 'no_emails' }, 400);
    if (password.length < 8)
      return json(
        { error: 'weak_password', message: 'Password must be at least 8 characters.' },
        400
      );
    if (rawEmails.length > 200)
      return json({ error: 'too_many', message: 'Max 200 per batch.' }, 400);

    // Normalise + dedupe
    const seen = new Set<string>();
    const emails: string[] = [];
    const result: CreateResult = { created: [], skipped: [], failed: [] };
    for (const raw of rawEmails) {
      const email = String(raw).trim().toLowerCase();
      if (!email) continue;
      if (!isValidEmail(email)) {
        result.failed.push({ email, reason: 'invalid email' });
        continue;
      }
      if (seen.has(email)) {
        result.skipped.push({ email, reason: 'duplicate in list' });
        continue;
      }
      seen.add(email);
      emails.push(email);
    }

    // ── Create accounts ────────────────────────────────────────────────
    for (const email of emails) {
      const { data: created, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { created_via: 'admin_bulk' },
      });

      if (error) {
        const msg = (error.message || '').toLowerCase();
        if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
          result.skipped.push({ email, reason: 'already has an account' });
        } else {
          result.failed.push({ email, reason: error.message || 'create failed' });
        }
        continue;
      }

      const newId = created.user?.id;
      if (newId && (grantAccess || collegeId)) {
        /*
         * Grant free access / attach the college.
         *
         * This relies on `handle_new_user` having created the profile row.
         * Both outcomes used to be swallowed — `.then(() => {}, () => {})` —
         * and the address was pushed onto `created` regardless. So if the
         * trigger had not run, or the update failed, the admin was told the
         * account was ready while the student hit the paywall on first login.
         * There are already two accounts in auth.users with no profile row, so
         * this is not hypothetical.
         *
         * The row is now confirmed rather than assumed, and a partial is
         * reported as a partial.
         */
        const update: Record<string, unknown> = {};
        if (grantAccess) {
          update.free_access_granted = true;
          update.free_access_granted_by = user.id;
          update.free_access_reason = freeAccessReason;
        }
        if (collegeId) update.college_id = collegeId;

        const { data: updated, error: updateError } = await admin
          .from('profiles')
          .update(update)
          .eq('id', newId)
          .select('id')
          .maybeSingle();

        if (updateError || !updated) {
          // The login exists, but not the thing that makes it usable.
          result.failed.push({
            email,
            reason: updateError
              ? `account created, but access not granted: ${updateError.message}`
              : 'account created, but no profile row was found to grant access on',
          });
          continue;
        }
      }
      result.created.push(email);
    }

    return json({
      success: true,
      summary: {
        created: result.created.length,
        skipped: result.skipped.length,
        failed: result.failed.length,
      },
      ...result,
    });
  } catch (error) {
    console.error('[admin-bulk-create-users] Error:', error);
    return json({ error: error instanceof Error ? error.message : 'unknown' }, 500);
  }
});
