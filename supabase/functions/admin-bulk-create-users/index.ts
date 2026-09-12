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
  /** Already had an account: switched to free access (and emailed) instead of created. */
  updated: string[];
}

/** Optional branded "your access is live" email, tailored to the batch. */
interface AccessEmail {
  orgName: string;
  /** Employer (contractor) rather than a college: changes wording + which org column is set. */
  employer: boolean;
  requester: string | null;
  learnerCode: string | null;
  electricianCode: string | null;
  /** Optional opening clause that replaces the generated one. */
  intro: string | null;
  /** Andrew offered the account; nobody asked. Changes the email's opening. */
  offered: boolean;
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
          offered: ae.offered === true,
          employer: ae.employer === true,
          intro: typeof ae.intro === 'string' && ae.intro.trim() ? ae.intro.trim() : null,
          requester:
            typeof ae.requester === 'string' && ae.requester.trim() ? ae.requester.trim() : null,
          learnerCode:
            typeof ae.learnerCode === 'string' && ae.learnerCode.trim()
              ? ae.learnerCode.trim().toUpperCase()
              : null,
          electricianCode:
            typeof ae.electricianCode === 'string' && ae.electricianCode.trim()
              ? ae.electricianCode.trim().toUpperCase()
              : null,
        };
      }

      // Accounts that already exist, sent by the page with the id it knows.
      // With includeExisting they get free access and the email too; nothing
      // is created and no password is set or sent.
      const includeExisting = body.includeExisting === true;
      const existing: Array<{ id: string; email: string }> = [];
      if (includeExisting && Array.isArray(body.existing)) {
        for (const e of body.existing as Array<Record<string, unknown>>) {
          if (typeof e?.id === 'string' && typeof e?.email === 'string' && isValidEmail(e.email))
            existing.push({ id: e.id, email: e.email.trim().toLowerCase() });
        }
      }
      // Which app they see. Tutors get the Electrician view (nothing is gated,
      // and it is what their learners will use once qualified); a cohort gets the
      // Apprentice view. Either way the onboarding role picker is skipped so the
      // first login goes straight in. Null leaves the picker for them.
      const role: 'electrician' | 'apprentice' | null =
        body.role === 'electrician' || body.role === 'apprentice' ? body.role : null;
      const previewOnly = body.preview === true;
      const testSend = body.test === true;

      if (!Array.isArray(rawEmails) || rawEmails.length === 0) {
        if (!(includeExisting && existing.length > 0) && !previewOnly && !testSend)
          return json({ error: 'no_emails' }, 400);
      }
      // Optional first names keyed by email, for addresses like info@ that carry
      // no name of their own ("Russell <info@centre.co.uk>" on the page).
      const names: Record<string, string> = {};
      if (body.names && typeof body.names === 'object') {
        for (const [k, v] of Object.entries(body.names as Record<string, unknown>)) {
          if (typeof v === 'string' && v.trim()) names[String(k).trim().toLowerCase()] = v.trim();
        }
      }
      if (password.length < 8)
        return json(
          { error: 'weak_password', message: 'Password must be at least 8 characters.' },
          400
        );
      if (Array.isArray(rawEmails) && rawEmails.length > 200)
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
        updated: [],
      };
      for (const raw of Array.isArray(rawEmails) ? (rawEmails as unknown[]) : []) {
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

      // ── Preview / test: render exactly what would go out, create nothing ──
      if (previewOnly || testSend) {
        if (!accessEmail)
          return json({ error: 'no_email_config', message: 'Turn the email on first.' }, 400);
        const sample = emails[0] ?? existing[0]?.email ?? 'tutor@college.ac.uk';
        const mail = buildStaffAccessEmail({
          email: sample,
          password: password || 'ElecMate0000!',
          orgName: accessEmail.orgName,
          requester: accessEmail.requester,
          learnerCode: accessEmail.learnerCode,
          electricianCode: accessEmail.electricianCode,
          offered: accessEmail.offered,
          employer: accessEmail.employer,
          firstName: names[sample] ?? null,
          existingAccount: !emails[0] && !!existing[0],
        });
        if (previewOnly)
          return json({
            preview: { to: sample, subject: mail.subject, html: mail.html, text: mail.text },
          });
        const sent = await sendEmail({
          from: `Andrew at Elec-Mate <${FOUNDER}>`,
          to: [FOUNDER],
          replyTo: `Andrew Moore <${FOUNDER}>`,
          subject: `[TEST to ${sample}] ${mail.subject}`,
          html: mail.html,
          text: mail.text,
          tags: ['college-staff-access', 'test'],
        });
        if (sent.error)
          return json({ error: 'test_failed', message: sent.error.message || 'send failed' }, 500);
        return json({ test: true, to: FOUNDER, sample, subject: mail.subject });
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
        if (newId && (grantAccess || collegeId || role || accessEmail)) {
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
          if (role) {
            update.role = role;
            update.onboarding_completed = true;
          }
          // Which college or provider a tutor/cohort account belongs to, for the
          // Colleges page. created_via is copied from auth metadata by the trigger.
          if (accessEmail?.orgName) {
            if (accessEmail.employer) update.employer_org = accessEmail.orgName;
            else update.college_org = accessEmail.orgName;
          }
          // A name given on the page ("Russell <info@…>") is the person's name, so
          // the Colleges and Users pages show a person rather than a mailbox.
          if (names[email]) update.full_name = names[email];

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
              electricianCode: accessEmail.electricianCode,
              offered: accessEmail.offered,
              employer: accessEmail.employer,
              intro: accessEmail.intro,
              firstName: names[email] ?? null,
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

      // ── Existing accounts: switch to free access, tell them, keep their password ──
      for (const ex of existing) {
        const { data: found } = await admin.auth.admin.getUserById(ex.id);
        const realEmail = (found?.user?.email || '').toLowerCase();
        if (!found?.user || realEmail !== ex.email) {
          result.failed.push({ email: ex.email, reason: 'existing account not found by id' });
          continue;
        }
        if (grantAccess || collegeId || role || accessEmail) {
          const update: Record<string, unknown> = {};
          if (grantAccess) {
            update.free_access_granted = true;
            update.free_access_granted_by = user.id;
            update.free_access_reason = freeAccessReason;
          }
          if (collegeId) update.college_id = collegeId;
          if (role) {
            update.role = role;
            update.onboarding_completed = true;
          }
          // Which college or provider a tutor/cohort account belongs to, for the
          // Colleges page. created_via is copied from auth metadata by the trigger.
          if (accessEmail?.orgName) {
            if (accessEmail.employer) update.employer_org = accessEmail.orgName;
            else update.college_org = accessEmail.orgName;
          }
          if (names[ex.email]) update.full_name = names[ex.email];
          const { error: upErr } = await admin.from('profiles').update(update).eq('id', ex.id);
          if (upErr) {
            result.failed.push({ email: ex.email, reason: `access not granted: ${upErr.message}` });
            continue;
          }
        }
        result.updated.push(ex.email);
        if (accessEmail) {
          try {
            const mail = buildStaffAccessEmail({
              email: ex.email,
              password: '',
              orgName: accessEmail.orgName,
              requester: accessEmail.requester,
              learnerCode: accessEmail.learnerCode,
              electricianCode: accessEmail.electricianCode,
              offered: accessEmail.offered,
              employer: accessEmail.employer,
              intro: accessEmail.intro,
              firstName: names[ex.email] ?? null,
              existingAccount: true,
            });
            const sent = await sendEmail({
              from: `Andrew at Elec-Mate <${FOUNDER}>`,
              to: [ex.email],
              bcc: [FOUNDER],
              replyTo: `Andrew Moore <${FOUNDER}>`,
              subject: mail.subject,
              html: mail.html,
              text: mail.text,
              tags: ['college-staff-access'],
            });
            if (sent.error)
              result.emailFailed.push({
                email: ex.email,
                reason: sent.error.message || 'send failed',
              });
            else result.emailed.push(ex.email);
          } catch (err) {
            result.emailFailed.push({
              email: ex.email,
              reason: err instanceof Error ? err.message : 'send failed',
            });
          }
        }
      }

      return json({
        success: true,
        summary: {
          created: result.created.length,
          updated: result.updated.length,
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
