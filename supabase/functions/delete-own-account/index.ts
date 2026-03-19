// ELE-402, ELE-408
// Delete Own Account — GDPR Art. 17 (Right to Erasure)
// Soft-delete with 30-day grace period, confirmation email, audit log

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from 'npm:resend@2.0.0';

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

    // --- Cancel active Stripe subscriptions via customer ID (non-blocking) ---
    if (profile?.stripe_customer_id) {
      const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
      if (stripeKey) {
        fetch(
          `https://api.stripe.com/v1/subscriptions?customer=${profile.stripe_customer_id}&status=active&limit=5`,
          { headers: { Authorization: `Bearer ${stripeKey}` } }
        )
          .then((r) => r.json())
          .then((data: { data?: { id: string }[] }) => {
            const subs = data?.data ?? [];
            return Promise.all(
              subs.map((sub) =>
                fetch(`https://api.stripe.com/v1/subscriptions/${sub.id}/cancel`, {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${stripeKey}` },
                })
              )
            );
          })
          .then(() => console.log('Stripe subscriptions cancelled'))
          .catch((err: unknown) => console.warn('Stripe cancel failed (non-critical):', err));
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
          from: 'Elec-Mate <noreply@elec-mate.com>',
          to: [userEmail],
          subject: 'Your Elec-Mate account deletion has been requested',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 12px;">
              <div style="margin-bottom: 24px;">
                <span style="background: #FACC15; color: #000; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;">⚡ Elec-Mate</span>
              </div>
              <h2 style="color: #fff; margin-bottom: 8px;">Account deletion requested</h2>
              <p style="color: #aaa; margin-bottom: 24px;">Hi ${fullName},</p>
              <p style="color: #aaa;">
                Your account deletion was requested on 
                <strong style="color: #fff;">${new Date(deletionRequestedAt).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'long', timeStyle: 'short' })}</strong>.
              </p>
              <p style="color: #aaa;">
                Your account has been deactivated and all your data will be <strong style="color: #fff;">permanently and irreversibly deleted on ${purgeDateStr}</strong>.
              </p>
              <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <p style="color: #FACC15; margin: 0 0 8px; font-weight: bold;">Changed your mind?</p>
                <p style="color: #aaa; margin: 0; font-size: 14px;">
                  If this was a mistake, contact us within 30 days at 
                  <a href="mailto:privacy@elec-mate.com" style="color: #FACC15;">privacy@elec-mate.com</a> 
                  and we can restore your account.
                </p>
              </div>
              <div style="background: #1a0000; border: 1px solid #ff333333; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <p style="color: #ff6666; margin: 0 0 8px; font-weight: bold;">⚠️ Security notice</p>
                <p style="color: #aaa; margin: 0; font-size: 14px;">
                  If you did not request this deletion, contact us immediately at 
                  <a href="mailto:privacy@elec-mate.com" style="color: #FACC15;">privacy@elec-mate.com</a>.
                </p>
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 32px;">
                Elec-Mate Ltd · ICO Registration: ZB935897 · privacy@elec-mate.com<br>
                This deletion request is processed in accordance with UK GDPR Article 17 (Right to Erasure).
              </p>
            </div>
          `,
        })
        .catch((err: unknown) =>
          console.warn('Deletion confirmation email failed (non-critical):', err)
        );
    }

    console.log(`✅ Account deletion initiated for user ${userId} — purge scheduled ${purgeDateStr}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Account deletion initiated. Your data will be permanently removed within 30 days.',
        scheduledPurgeDate: purgeDate.toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Account deletion error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Deletion failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
