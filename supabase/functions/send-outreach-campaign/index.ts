import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@4.0.0';

const SEND_DELAY_MS = 500;
const DEFAULT_BATCH_SIZE = 10;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// ─── Unsubscribe footer appended to every outreach email ────
function buildUnsubLink(email: string, campaignId: string): string {
  const token = btoa(email);
  const baseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  return `${baseUrl}/functions/v1/outreach-unsubscribe?token=${encodeURIComponent(token)}&campaign=${campaignId}`;
}

function appendUnsubFooter(html: string, email: string, campaignId: string): string {
  const unsubUrl = buildUnsubLink(email, campaignId);
  const footer = `
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #333;text-align:center;font-size:12px;color:#666;">
      <p>You're receiving this because we thought Elec-Mate could help your organisation.</p>
      <p><a href="${unsubUrl}" style="color:#999;text-decoration:underline;">Unsubscribe</a></p>
    </div>`;
  // Insert before closing body/html tags if present, otherwise append
  if (html.includes('</body>')) {
    return html.replace('</body>', `${footer}</body>`);
  }
  return html + footer;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ─── Auth ────────────────────────────────────────────────
    const authHeader = req.headers.get('authorization');
    if (!authHeader) throw new Error('No authorization header');

    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const token = authHeader.replace('Bearer ', '');
    const isServiceRole = token === serviceRoleKey;

    let callerId = 'service_role';

    if (!isServiceRole) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );

      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();
      if (userError || !user) throw new Error('Unauthorized');

      const { data: callerProfile } = await supabaseClient
        .from('profiles')
        .select('admin_role, full_name')
        .eq('id', user.id)
        .single();

      if (!callerProfile?.admin_role) throw new Error('Unauthorized: Admin access required');
      callerId = user.id;
    }

    const body = await req.json();
    const { action } = body;

    console.log(`Admin ${callerId} outreach action: ${action}`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result: any;

    switch (action) {
      // ─── get_contacts ──────────────────────────────────────
      case 'get_contacts': {
        const { search, contact_type, page = 1, limit = 50 } = body;
        let query = supabaseAdmin
          .from('outreach_contacts')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false });

        if (contact_type && contact_type !== 'all') {
          query = query.eq('contact_type', contact_type);
        }
        if (search) {
          query = query.or(
            `email.ilike.%${search}%,name.ilike.%${search}%,organisation.ilike.%${search}%`
          );
        }

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;
        if (error) throw error;

        result = { contacts: data, total: count, page, limit };
        break;
      }

      // ─── import_contacts ───────────────────────────────────
      case 'import_contacts': {
        const { contacts } = body;
        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
          throw new Error('contacts array is required');
        }

        let imported = 0;
        let skipped = 0;
        const errors: string[] = [];

        for (const c of contacts) {
          if (!c.email) {
            skipped++;
            continue;
          }
          const email = c.email.trim().toLowerCase();
          const { error } = await supabaseAdmin.from('outreach_contacts').upsert(
            {
              email,
              name: c.name || null,
              organisation: c.organisation || c.organization || null,
              role: c.role || null,
              contact_type: c.contact_type || c.type || 'other',
              tags: c.tags
                ? Array.isArray(c.tags)
                  ? c.tags
                  : c.tags.split(',').map((t: string) => t.trim())
                : [],
              source: 'csv_import',
            },
            { onConflict: 'email', ignoreDuplicates: false }
          );

          if (error) {
            errors.push(`${email}: ${error.message}`);
            skipped++;
          } else {
            imported++;
          }
        }

        result = { imported, skipped, errors: errors.length > 0 ? errors : undefined };
        break;
      }

      // ─── delete_contacts ───────────────────────────────────
      case 'delete_contacts': {
        const { contactIds } = body;
        if (!contactIds || !Array.isArray(contactIds)) throw new Error('contactIds array required');

        const { error } = await supabaseAdmin
          .from('outreach_contacts')
          .delete()
          .in('id', contactIds);

        if (error) throw error;
        result = { deleted: contactIds.length };
        break;
      }

      // ─── get_campaigns ─────────────────────────────────────
      case 'get_campaigns': {
        const { data, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        result = { campaigns: data };
        break;
      }

      // ─── get_campaign ──────────────────────────────────────
      case 'get_campaign': {
        const { campaignId } = body;
        if (!campaignId) throw new Error('campaignId required');

        const { data: campaign, error: cErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();

        if (cErr) throw cErr;

        const { data: sends, error: sErr } = await supabaseAdmin
          .from('outreach_campaign_sends')
          .select(
            'id, contact_id, email, status, sent_at, delivered_at, opened_at, clicked_at, bounced_at, error_message'
          )
          .eq('campaign_id', campaignId)
          .order('created_at', { ascending: false });

        if (sErr) throw sErr;

        result = { campaign, sends };
        break;
      }

      // ─── create_campaign ───────────────────────────────────
      case 'create_campaign': {
        const { name, subject, html_body, from_name, from_email, segment_filter } = body;
        if (!name || !subject || !html_body) throw new Error('name, subject, html_body required');

        const { data, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .insert({
            name,
            subject,
            html_body,
            from_name: from_name || 'Andrew from Elec-Mate',
            from_email: from_email || 'founder@elec-mate.com',
            segment_filter: segment_filter || {},
            created_by: callerId !== 'service_role' ? callerId : null,
          })
          .select()
          .single();

        if (error) throw error;
        result = { campaign: data };
        break;
      }

      // ─── update_campaign ───────────────────────────────────
      case 'update_campaign': {
        const { campaignId, ...updates } = body;
        if (!campaignId) throw new Error('campaignId required');
        delete updates.action;

        const { data: existing } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('status')
          .eq('id', campaignId)
          .single();

        if (existing?.status !== 'draft') {
          throw new Error('Can only edit draft campaigns');
        }

        const { data, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .update(updates)
          .eq('id', campaignId)
          .select()
          .single();

        if (error) throw error;
        result = { campaign: data };
        break;
      }

      // ─── delete_campaign ───────────────────────────────────
      case 'delete_campaign': {
        const { campaignId } = body;
        if (!campaignId) throw new Error('campaignId required');

        const { data: existing } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('status')
          .eq('id', campaignId)
          .single();

        if (existing?.status === 'sending') {
          throw new Error('Cannot delete a campaign that is currently sending');
        }

        const { error } = await supabaseAdmin
          .from('outreach_campaigns')
          .delete()
          .eq('id', campaignId);

        if (error) throw error;
        result = { deleted: true };
        break;
      }

      // ─── prepare_send ──────────────────────────────────────
      case 'prepare_send': {
        const { campaignId } = body;
        if (!campaignId) throw new Error('campaignId required');

        const { data: campaign, error: cErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();

        if (cErr) throw cErr;
        if (campaign.status !== 'draft' && campaign.status !== 'paused') {
          throw new Error('Campaign must be in draft or paused status to prepare');
        }

        // Build contact query from segment_filter
        let contactQuery = supabaseAdmin
          .from('outreach_contacts')
          .select('id, email')
          .eq('is_suppressed', false);

        const filter = campaign.segment_filter || {};

        if (
          filter.contact_type &&
          Array.isArray(filter.contact_type) &&
          filter.contact_type.length > 0
        ) {
          contactQuery = contactQuery.in('contact_type', filter.contact_type);
        }

        if (filter.tags && Array.isArray(filter.tags) && filter.tags.length > 0) {
          contactQuery = contactQuery.overlaps('tags', filter.tags);
        }

        const { data: contacts, error: qErr } = await contactQuery;
        if (qErr) throw qErr;

        if (!contacts || contacts.length === 0) {
          result = { recipients: 0, message: 'No matching contacts found' };
          break;
        }

        // Delete any existing pending sends (in case of re-prepare)
        await supabaseAdmin
          .from('outreach_campaign_sends')
          .delete()
          .eq('campaign_id', campaignId)
          .eq('status', 'pending');

        // Create send rows
        const sendRows = contacts.map((c: any) => ({
          campaign_id: campaignId,
          contact_id: c.id,
          email: c.email.trim().toLowerCase(),
          status: 'pending',
        }));

        // Insert in batches of 100
        let insertedCount = 0;
        for (let i = 0; i < sendRows.length; i += 100) {
          const batch = sendRows.slice(i, i + 100);
          const { error: insertErr } = await supabaseAdmin
            .from('outreach_campaign_sends')
            .upsert(batch, { onConflict: 'campaign_id,contact_id', ignoreDuplicates: true });

          if (insertErr) {
            console.error('Insert batch error:', insertErr.message);
          } else {
            insertedCount += batch.length;
          }
        }

        // Update campaign
        await supabaseAdmin
          .from('outreach_campaigns')
          .update({
            total_recipients: insertedCount,
            status: 'sending',
            started_at: new Date().toISOString(),
          })
          .eq('id', campaignId);

        result = { recipients: insertedCount };
        break;
      }

      // ─── send_batch ────────────────────────────────────────
      case 'send_batch': {
        const { campaignId, batchSize = DEFAULT_BATCH_SIZE } = body;
        if (!campaignId) throw new Error('campaignId required');

        const { data: campaign, error: cErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();

        if (cErr) throw cErr;
        if (campaign.status !== 'sending') {
          result = { sent: 0, remaining: 0, failed: 0, message: 'Campaign is not in sending status' };
          break;
        }

        // Get next batch of pending sends
        const { data: pendingSends, error: pErr } = await supabaseAdmin
          .from('outreach_campaign_sends')
          .select('id, email, contact_id')
          .eq('campaign_id', campaignId)
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
          .limit(batchSize);

        if (pErr) throw pErr;

        if (!pendingSends || pendingSends.length === 0) {
          // All done
          await supabaseAdmin
            .from('outreach_campaigns')
            .update({ status: 'completed', completed_at: new Date().toISOString() })
            .eq('id', campaignId);

          result = { sent: 0, remaining: 0, failed: 0, completed: true };
          break;
        }

        let sentCount = 0;
        let failedCount = 0;
        const errors: string[] = [];
        const fromAddress = `${campaign.from_name} <${campaign.from_email}>`;

        for (const send of pendingSends) {
          try {
            const htmlWithUnsub = appendUnsubFooter(campaign.html_body, send.email, campaignId);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: fromAddress,
              to: [send.email],
              subject: campaign.subject,
              html: htmlWithUnsub,
              tags: [
                { name: 'campaign', value: 'outreach' },
                { name: 'campaign_id', value: campaignId },
              ],
            });

            if (emailError) {
              throw new Error(emailError.message);
            }

            // Update send row
            await supabaseAdmin
              .from('outreach_campaign_sends')
              .update({
                status: 'sent',
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
              })
              .eq('id', send.id);

            // Log to email_logs
            await supabaseAdmin.from('email_logs').insert({
              to_email: send.email,
              subject: campaign.subject,
              template: 'outreach_campaign',
              status: 'sent',
              metadata: {
                campaign_id: campaignId,
                campaign_name: campaign.name,
                contact_id: send.contact_id,
                resend_id: emailData?.id,
              },
            });

            sentCount++;

            // Rate limit
            if (sentCount < pendingSends.length) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: any) {
            failedCount++;
            errors.push(`${send.email}: ${err.message}`);

            await supabaseAdmin
              .from('outreach_campaign_sends')
              .update({ status: 'failed', error_message: err.message })
              .eq('id', send.id);
          }
        }

        // Update campaign counters
        await supabaseAdmin
          .rpc('increment_outreach_counters', {
            p_campaign_id: campaignId,
            p_sent: sentCount,
            p_failed: failedCount,
          })
          .then(() => {})
          .catch(async () => {
            // Fallback: manual update if RPC doesn't exist
            const { data: current } = await supabaseAdmin
              .from('outreach_campaigns')
              .select('sent_count, failed_count')
              .eq('id', campaignId)
              .single();

            if (current) {
              await supabaseAdmin
                .from('outreach_campaigns')
                .update({
                  sent_count: (current.sent_count || 0) + sentCount,
                  failed_count: (current.failed_count || 0) + failedCount,
                })
                .eq('id', campaignId);
            }
          });

        // Count remaining
        const { count: remaining } = await supabaseAdmin
          .from('outreach_campaign_sends')
          .select('id', { count: 'exact', head: true })
          .eq('campaign_id', campaignId)
          .eq('status', 'pending');

        // Auto-complete if none remaining
        if (remaining === 0) {
          await supabaseAdmin
            .from('outreach_campaigns')
            .update({ status: 'completed', completed_at: new Date().toISOString() })
            .eq('id', campaignId);
        }

        result = {
          sent: sentCount,
          remaining: remaining || 0,
          failed: failedCount,
          errors: errors.length > 0 ? errors : undefined,
          completed: remaining === 0,
        };
        break;
      }

      // ─── send_test ─────────────────────────────────────────
      case 'send_test': {
        const { campaignId, testEmail } = body;
        if (!campaignId || !testEmail) throw new Error('campaignId and testEmail required');

        const { data: campaign, error: cErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();

        if (cErr) throw cErr;

        const htmlWithUnsub = appendUnsubFooter(campaign.html_body, testEmail, campaignId);
        const fromAddress = `${campaign.from_name} <${campaign.from_email}>`;

        const { error: emailError } = await resend.emails.send({
          from: fromAddress,
          to: [testEmail.trim().toLowerCase()],
          subject: `[TEST] ${campaign.subject}`,
          html: htmlWithUnsub,
          tags: [
            { name: 'campaign', value: 'outreach_test' },
            { name: 'campaign_id', value: campaignId },
          ],
        });

        if (emailError) throw new Error(`Failed to send test: ${emailError.message}`);

        result = { success: true, email: testEmail };
        break;
      }

      // ─── pause_campaign ────────────────────────────────────
      case 'pause_campaign': {
        const { campaignId } = body;
        if (!campaignId) throw new Error('campaignId required');

        const { error } = await supabaseAdmin
          .from('outreach_campaigns')
          .update({ status: 'paused' })
          .eq('id', campaignId)
          .eq('status', 'sending');

        if (error) throw error;
        result = { paused: true };
        break;
      }

      // ─── get_stats ─────────────────────────────────────────
      case 'get_stats': {
        const { data: campaigns, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .select(
            'status, total_recipients, sent_count, failed_count, open_count, click_count, bounce_count'
          );

        if (error) throw error;

        const totals = (campaigns || []).reduce(
          (acc: any, c: any) => {
            acc.totalRecipients += c.total_recipients || 0;
            acc.totalSent += c.sent_count || 0;
            acc.totalFailed += c.failed_count || 0;
            acc.totalOpened += c.open_count || 0;
            acc.totalClicked += c.click_count || 0;
            acc.totalBounced += c.bounce_count || 0;
            return acc;
          },
          {
            totalRecipients: 0,
            totalSent: 0,
            totalFailed: 0,
            totalOpened: 0,
            totalClicked: 0,
            totalBounced: 0,
          }
        );

        const { count: contactCount } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id', { count: 'exact', head: true });

        const { count: suppressedCount } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id', { count: 'exact', head: true })
          .eq('is_suppressed', true);

        result = {
          ...totals,
          totalCampaigns: campaigns?.length || 0,
          totalContacts: contactCount || 0,
          suppressedContacts: suppressedCount || 0,
          openRate:
            totals.totalSent > 0
              ? ((totals.totalOpened / totals.totalSent) * 100).toFixed(1)
              : '0',
          clickRate:
            totals.totalSent > 0
              ? ((totals.totalClicked / totals.totalSent) * 100).toFixed(1)
              : '0',
        };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in send-outreach-campaign:', error.message);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join(' | '),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
