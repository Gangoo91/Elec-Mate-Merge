// ELE-402, ELE-408
// Delete Own Account — GDPR Art. 17 (Right to Erasure)
// Soft-delete with 30-day grace period, confirmation email, audit log

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';
import { accountEmailHtml, escapeHtml } from '../_shared/account-email.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    // Authenticate the requesting user
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = userData.user.id;
    const userEmail = userData.user.email ?? '';
    const deletionRequestedAt = new Date().toISOString();

    console.log(`🗑️ GDPR account deletion requested for user ${userId}`);

    // --- Get profile for Stripe customer ID and name ---
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('full_name, stripe_customer_id')
      .eq('id', userId)
      .single();

    const fullName = profile?.full_name ?? 'there';
    const purgeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const purgeDateStr = purgeDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // --- Cancel every live Stripe subscription ---
    // Was `status=active` only and fire-and-forget: a trialist who deleted
    // their account kept a `trialing` subscription and was charged on day 8
    // for an account that no longer existed (found 4 Oct 2026). Now lists all
    // statuses, cancels anything still billable, and waits for the result.
    if (profile?.stripe_customer_id) {
      const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
      if (stripeKey) {
        try {
          const r = await fetch(
            `https://api.stripe.com/v1/subscriptions?customer=${profile.stripe_customer_id}&status=all&limit=20`,
            { headers: { Authorization: `Bearer ${stripeKey}` } }
          );
          const data = (await r.json()) as { data?: { id: string; status: string }[] };
          const billable = (data?.data ?? []).filter((s) =>
            ['active', 'trialing', 'past_due', 'unpaid', 'incomplete'].includes(s.status)
          );
          const results = await Promise.all(
            billable.map((sub) =>
              fetch(`https://api.stripe.com/v1/subscriptions/${sub.id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${stripeKey}` },
              })
            )
          );
          const failed = results.filter((res) => !res.ok).length;
          if (failed) console.error(`Stripe cancel: ${failed} of ${billable.length} failed`);
          else console.log(`Stripe subscriptions cancelled: ${billable.length}`);
        } catch (err: unknown) {
          // Don't block the deletion itself — but this is now logged as an
          // error, not a "non-critical" warning, so it shows up in monitoring.
          console.error('Stripe cancel failed:', err);
        }
      }
    }

    // --- Soft delete: set deletion_requested_at in profiles ---
    const { error: profileUpdateError } = await supabaseAdmin
      .from('profiles')
      .update({ deletion_requested_at: deletionRequestedAt })
      .eq('id', userId);

    if (profileUpdateError) {
      console.error('Failed to set deletion_requested_at:', profileUpdateError);
      throw new Error('Failed to initiate account deletion');
    }

    // --- Remove any data-export ZIP now: its emailed link would otherwise
    // keep working for up to 7 days after they asked us to delete them ---
    try {
      const exportsBucket = supabaseAdmin.storage.from('data-exports');
      const { data: zips } = await exportsBucket.list(userId);
      if (zips?.length) {
        await exportsBucket.remove(zips.map((o: { name: string }) => `${userId}/${o.name}`));
      }
    } catch (err: unknown) {
      console.error('Export ZIP removal failed:', err);
    }

    // --- Anonymise auth email so the user cannot log back in ---
    // This prevents login while preserving data for the 30-day grace period
    const anonymisedEmail = `deleted_${Date.now()}_${userId.slice(0, 8)}@deleted.elecmate.com`;
    const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email: anonymisedEmail,
    });
    if (authUpdateError) {
      console.warn('Auth email anonymisation failed (non-critical):', authUpdateError.message);
    }

    // --- Write audit log ---
    supabaseAdmin
      .from('security_audit_log')
      .insert({
        user_id: userId,
        action: 'gdpr_account_deletion_requested',
        table_name: 'profiles',
        record_id: userId,
        metadata: {
          deletionRequestedAt,
          scheduledPurgeDate: purgeDate.toISOString(),
          originalEmail: userEmail,
        },
      })
      .then(({ error }) => {
        if (error) console.warn('Audit log write failed (non-critical):', error.message);
      });

    // --- Send confirmation email to ORIGINAL email (before anonymising) ---
    if (userEmail) {
      resend.emails
        .send({
          from: 'Elec-Mate <founder@elec-mate.com>',
          to: [userEmail],
          subject: 'Your Elec-Mate account is being deleted',
          html: accountEmailHtml({
            title: 'Your Elec-Mate account is being deleted',
            eyebrow: 'Account deletion',
            heading: 'We’ve started deleting<br>your account',
            firstName:
              fullName && fullName !== 'there' ? String(fullName).split(/\s+/)[0] : undefined,
            paragraphs: [
              'You asked us to delete your Elec-Mate account, so you’ve been signed out and can’t sign back in.',
              'Any subscription or free trial you started on our website has been cancelled — you won’t be charged again.',
            ],
            panel: {
              label: 'Changed your mind?',
              title: `You can still undo this until ${escapeHtml(purgeDateStr)}`,
              body: 'Reply to this email before then and we’ll restore your account with all your certificates, quotes and records. You’d need to restart your subscription. After that date everything is erased for good and can’t be recovered.',
            },
            facts: [
              {
                k: 'Requested',
                v: escapeHtml(
                  new Date(deletionRequestedAt).toLocaleDateString('en-GB', {
                    timeZone: 'Europe/London',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                ),
              },
              { k: 'Permanently erased', v: escapeHtml(purgeDateStr) },
            ],
            note: {
              title: 'Paid in the iPhone or Android app?',
              body: 'Cancel it in your Apple ID or Google Play subscription settings — deleting your account can’t cancel those for you. Didn’t ask to delete your account? Reply straight away.',
            },
          }),
        })
        .catch((err: unknown) =>
          console.warn('Deletion confirmation email failed (non-critical):', err)
        );
    }

    console.log(
      `✅ Account deletion initiated for user ${userId} — purge scheduled ${purgeDateStr}`
    );

    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Account deletion initiated. Your data will be permanently removed within 30 days.',
        scheduledPurgeDate: purgeDate.toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'delete-own-account',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('Account deletion error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Deletion failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
