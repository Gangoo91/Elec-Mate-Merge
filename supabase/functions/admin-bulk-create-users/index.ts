import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

import { withSentry } from '../_shared/sentry.ts';
import { sendEmail } from '../_shared/mailer.ts';
import { buildStaffAccessEmail } from '../_shared/staff-access-email.ts';
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
  /** Accounts that were also sent the branded login email. */
  emailed: string[];
  /** Accounts created and granted access, but the email did not go. Admin sends the login by hand. */
  emailFailed: { email: string; reason: string }[];
}

/** Optional branded "your access is live" email, tailored to the batch. */
interface AccessEmail {
  orgName: string;
  requester: string | null;
  learnerCode: string | null;
}

const FOUNDER = 'founder@elec-mate.com';

serve(
  withSentry('admin-bulk-create-users', async (req: Request) => {
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

      // Branded login email per person. Sent only when the admin asked for it
      // and gave the organisation name the email is tailored to.
      let accessEmail: AccessEmail | null = null;
      if (body.accessEmail && typeof body.accessEmail === 'object') {
        const ae = body.accessEmail as Record<string, unknown>;
        const orgName = typeof ae.orgName === 'string' ? ae.orgName.trim() : '';
        if (!orgName)
          return json(
            {
              error: 'no_org_name',
              message: 'Give the college or organisation name for the email.',
            },
            400
          );
        accessEmail = {
          orgName,
          requester:
            typeof ae.requester === 'string' && ae.requester.trim() ? ae.requester.trim() : null,
          learnerCode:
            typeof ae.learnerCode === 'string' && ae.learnerCode.trim()
              ? ae.learnerCode.trim().toUpperCase()
              : null,
        };
      }

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
      const result: CreateResult = {
        created: [],
        skipped: [],
        failed: [],
        emailed: [],
        emailFailed: [],
      };
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

        // The account is live and usable — now tell the person, if asked to.
        // An email failure never undoes the account: it is reported so the
        // admin can send the login by hand (Copy logins still works).
        if (accessEmail) {
          try {
            const mail = buildStaffAccessEmail({
              email,
              password,
              orgName: accessEmail.orgName,
              requester: accessEmail.requester,
              learnerCode: accessEmail.learnerCode,
            });
            const sent = await sendEmail({
              from: `Andrew at Elec-Mate <${FOUNDER}>`,
              to: [email],
              bcc: [FOUNDER],
              replyTo: `Andrew Moore <${FOUNDER}>`,
              subject: mail.subject,
              html: mail.html,
              text: mail.text,
              tags: ['college-staff-access'],
            });
            if (sent.error) {
              result.emailFailed.push({ email, reason: sent.error.message || 'send failed' });
            } else {
              result.emailed.push(email);
            }
          } catch (err) {
            result.emailFailed.push({
              email,
              reason: err instanceof Error ? err.message : 'send failed',
            });
          }
        }
      }

      return json({
        success: true,
        summary: {
          created: result.created.length,
          skipped: result.skipped.length,
          failed: result.failed.length,
          emailed: result.emailed.length,
          emailFailed: result.emailFailed.length,
        },
        ...result,
      });
    } catch (error) {
      console.error('[admin-bulk-create-users] Error:', error);
      return json({ error: error instanceof Error ? error.message : 'unknown' }, 500);
    }
  })
);
