import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from '../_shared/mailer.ts';
import {
  OUTREACH_TEMPLATES,
  renderMergeTags,
  type MergeContext,
} from '../_shared/outreach-templates.ts';

// Batch API limits: Resend allows up to 100 emails per batch.send() call
// and 2 requests/sec on Pro. No per-email delay is needed — Resend handles
// delivery pacing internally.
const DEFAULT_BATCH_SIZE = 100;
const MAX_BATCH_SIZE = 100;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// ─── HMAC-signed unsubscribe tokens ─────────────────────────────
// Token = <base64url(email)>.<base64url(hmac_sha256(secret, email))>.
// Base64(email) was the old format and was trivially forgeable — any stranger
// could unsubscribe any recipient by guessing their address. The unsub endpoint
// still accepts legacy tokens so mail already in-flight continues to work.
const textEncoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array): string {
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signEmail(email: string): Promise<string> {
  const secret =
    Deno.env.get('OUTREACH_UNSUB_SECRET') ||
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
    '';
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, textEncoder.encode(email));
  const payload = base64UrlEncode(textEncoder.encode(email));
  const signature = base64UrlEncode(new Uint8Array(sig));
  return `${payload}.${signature}`;
}

async function buildUnsubLink(email: string, campaignId: string): Promise<string> {
  const token = await signEmail(email.trim().toLowerCase());
  const baseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  return `${baseUrl}/functions/v1/outreach-unsubscribe?token=${encodeURIComponent(token)}&campaign=${encodeURIComponent(campaignId)}`;
}

async function appendUnsubFooter(
  html: string,
  _email: string,
  _campaignId: string
): Promise<string> {
  // Reply-based opt-out: recipient just replies with STOP or UNSUBSCRIBE and
  // we remove them. Gmail / Outlook also get the native "Unsubscribe" button
  // from the List-Unsubscribe-Post header (mailto auto-reply with subject
  // "unsubscribe"). No web confirmation page to click through.
  const footer = `
    <div style="margin-top:24px;padding:16px 32px 32px;text-align:center;font-size:12px;color:#71717a;background:#000;">
      <p style="margin:0 0 8px">Don't want these emails? Just reply <strong style="color:#a1a1aa">STOP</strong> or <strong style="color:#a1a1aa">UNSUBSCRIBE</strong> and I'll remove you.</p>
    </div>`;
  if (html.includes('</body>')) return html.replace('</body>', `${footer}</body>`);
  return html + footer;
}

function buildListUnsubscribeHeaders(_unsubUrl: string) {
  // Reply-based opt-out only. Gmail's native "Unsubscribe" button fires a
  // mailto reply with subject "unsubscribe" to founder@elec-mate.com. We
  // drop the One-Click POST header since there is no web handler — a silent
  // POST to nothing would just fail and confuse Gmail's algorithm.
  return {
    'List-Unsubscribe': `<mailto:founder@elec-mate.com?subject=unsubscribe>`,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ─── Auth ────────────────────────────────────────────────────
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    switch (action) {
      // ─── get_contacts ─────────────────────────────────────────
      // PostgREST caps every query at max-rows (1000 on this project), so
      // when the UI asks for more than that we page through in 1000-row
      // chunks and stitch the result. The `count: 'exact'` total is fetched
      // once on the first page.
      case 'get_contacts': {
        const {
          search,
          contact_type,
          tag,
          suppressed_only,
          engaged_only,
          never_opened,
          page = 1,
          limit = 100,
          order_by = 'created_at',
        } = body;

        const CHUNK = 1000; // PostgREST server-side cap
        const startOffset = (page - 1) * limit;
        const orderCol = order_by === 'engagement' ? 'engagement_score' : 'created_at';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const buildQuery = (includeCount: boolean): any => {
          let q = supabaseAdmin
            .from('outreach_contacts')
            .select('*', includeCount ? { count: 'exact' } : {});
          if (contact_type && contact_type !== 'all') q = q.eq('contact_type', contact_type);
          if (search) {
            q = q.or(
              `email.ilike.%${search}%,name.ilike.%${search}%,organisation.ilike.%${search}%`
            );
          }
          if (tag) q = q.contains('tags', [tag]);
          if (suppressed_only) q = q.eq('is_suppressed', true);
          if (engaged_only) q = q.gt('engagement_score', 0);
          if (never_opened) q = q.eq('total_opens', 0).gt('total_sends', 0);
          q = q.order(orderCol, { ascending: false });
          return q;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const collected: any[] = [];
        let totalCount: number | null = null;
        let offset = startOffset;
        const remaining = () => limit - collected.length;

        while (collected.length < limit) {
          const chunkSize = Math.min(CHUNK, remaining());
          const fromIdx = offset;
          const toIdx = offset + chunkSize - 1;
          const includeCount = totalCount === null;
          const q = buildQuery(includeCount).range(fromIdx, toIdx);
          const { data, error, count } = await q;
          if (error) throw error;
          if (includeCount) totalCount = count ?? 0;
          const rows = data || [];
          collected.push(...rows);
          if (rows.length < chunkSize) break; // no more data
          offset += rows.length;
        }

        result = { contacts: collected, total: totalCount ?? 0, page, limit };
        break;
      }

      // ─── get_contact_stats (for dashboard) ────────────────────
      case 'get_contact_stats': {
        const { count: total } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id', { count: 'exact', head: true });
        const { count: suppressed } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id', { count: 'exact', head: true })
          .eq('is_suppressed', true);
        const { count: engaged } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id', { count: 'exact', head: true })
          .gt('engagement_score', 0);

        const { data: byType } = await supabaseAdmin
          .from('outreach_contacts')
          .select('contact_type');

        const typeCounts: Record<string, number> = {};
        for (const row of byType || []) {
          const t = row.contact_type || 'other';
          typeCounts[t] = (typeCounts[t] || 0) + 1;
        }

        result = {
          total: total || 0,
          suppressed: suppressed || 0,
          engaged: engaged || 0,
          active: (total || 0) - (suppressed || 0),
          byType: typeCounts,
        };
        break;
      }

      // ─── import_contacts ──────────────────────────────────────
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
                  : String(c.tags)
                      .split(',')
                      .map((t: string) => t.trim())
                : [],
              source: c.source || 'csv_import',
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

      // ─── delete_contacts ──────────────────────────────────────
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

      // ─── bulk_suppress ────────────────────────────────────────
      case 'bulk_suppress': {
        const { contactIds, reason = 'admin_bulk_suppress' } = body;
        if (!contactIds || !Array.isArray(contactIds)) throw new Error('contactIds array required');
        const { error } = await supabaseAdmin
          .from('outreach_contacts')
          .update({
            is_suppressed: true,
            suppression_reason: reason,
            suppressed_at: new Date().toISOString(),
          })
          .in('id', contactIds);
        if (error) throw error;
        result = { suppressed: contactIds.length };
        break;
      }

      // ─── bulk_unsuppress ──────────────────────────────────────
      case 'bulk_unsuppress': {
        const { contactIds } = body;
        if (!contactIds || !Array.isArray(contactIds)) throw new Error('contactIds array required');
        const { error } = await supabaseAdmin
          .from('outreach_contacts')
          .update({
            is_suppressed: false,
            suppression_reason: null,
            suppressed_at: null,
          })
          .in('id', contactIds);
        if (error) throw error;
        result = { unsuppressed: contactIds.length };
        break;
      }

      // ─── bulk_tag ─────────────────────────────────────────────
      case 'bulk_tag': {
        const { contactIds, addTags = [], removeTags = [] } = body;
        if (!contactIds || !Array.isArray(contactIds)) throw new Error('contactIds required');

        const { data: rows } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id, tags')
          .in('id', contactIds);

        for (const row of rows || []) {
          const current: string[] = Array.isArray(row.tags) ? row.tags : [];
          const next = Array.from(
            new Set([...current.filter((t) => !removeTags.includes(t)), ...addTags])
          );
          await supabaseAdmin
            .from('outreach_contacts')
            .update({ tags: next })
            .eq('id', row.id);
        }
        result = { updated: rows?.length || 0 };
        break;
      }

      // ─── import_platform_employers ────────────────────────────
      case 'import_platform_employers': {
        // Imports profiles with company_name set into outreach_contacts as employers.
        // Dedupes on email. Never overwrites existing contacts.
        const { data: profiles, error: pErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, company_name, role')
          .not('company_name', 'is', null);

        if (pErr) throw pErr;

        let imported = 0;
        let skipped = 0;

        for (const p of profiles || []) {
          const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(p.id);
          const email = authUser?.user?.email?.toLowerCase();
          if (!email || !p.company_name) {
            skipped++;
            continue;
          }
          const { error } = await supabaseAdmin.from('outreach_contacts').upsert(
            {
              email,
              name: p.full_name || null,
              organisation: p.company_name,
              role: p.role || 'Employer',
              contact_type: 'employer',
              tags: ['internal_user', 'active_user'],
              source: 'internal_user_import',
            },
            { onConflict: 'email', ignoreDuplicates: true }
          );
          if (error) skipped++;
          else imported++;
        }

        result = { imported, skipped };
        break;
      }

      // ═══════════════════════════════════════════════════════════
      // TEMPLATES
      // ═══════════════════════════════════════════════════════════
      case 'list_templates': {
        const { data, error } = await supabaseAdmin
          .from('outreach_email_templates')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (error) throw error;
        result = { templates: data };
        break;
      }

      case 'seed_templates': {
        // Idempotent: upsert by slug.
        let upserted = 0;
        for (const t of OUTREACH_TEMPLATES) {
          const { error } = await supabaseAdmin.from('outreach_email_templates').upsert(
            {
              slug: t.slug,
              name: t.name,
              category: t.category,
              subject: t.subject,
              preheader: t.preheader,
              html_body: t.html_body,
              merge_tags: t.merge_tags,
              description: t.description,
              thumbnail_emoji: t.thumbnail_emoji,
              sort_order: t.sort_order,
              is_active: true,
            },
            { onConflict: 'slug' }
          );
          if (!error) upserted++;
        }
        result = { upserted, total: OUTREACH_TEMPLATES.length };
        break;
      }

      case 'save_template': {
        const { slug, name, category, subject, preheader, html_body, merge_tags, description, thumbnail_emoji } = body;
        if (!slug || !name || !subject || !html_body) throw new Error('slug, name, subject, html_body required');
        const { error } = await supabaseAdmin.from('outreach_email_templates').upsert(
          {
            slug,
            name,
            category: category || 'general',
            subject,
            preheader: preheader || null,
            html_body,
            merge_tags: merge_tags || [],
            description: description || null,
            thumbnail_emoji: thumbnail_emoji || null,
            is_active: true,
            created_by: callerId !== 'service_role' ? callerId : null,
          },
          { onConflict: 'slug' }
        );
        if (error) throw error;
        result = { saved: true };
        break;
      }

      case 'delete_template': {
        const { slug } = body;
        if (!slug) throw new Error('slug required');
        const { error } = await supabaseAdmin
          .from('outreach_email_templates')
          .update({ is_active: false })
          .eq('slug', slug);
        if (error) throw error;
        result = { deleted: true };
        break;
      }

      // ═══════════════════════════════════════════════════════════
      // CAMPAIGNS
      // ═══════════════════════════════════════════════════════════
      case 'get_campaigns': {
        const { data, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        result = { campaigns: data };
        break;
      }

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
          .order('created_at', { ascending: false })
          .limit(500);
        if (sErr) throw sErr;

        result = { campaign, sends };
        break;
      }

      case 'create_campaign': {
        const {
          name,
          subject,
          html_body,
          from_name,
          from_email,
          reply_to,
          preheader,
          segment_filter,
          template_slug,
          notes,
        } = body;
        if (!name || !subject || !html_body) throw new Error('name, subject, html_body required');

        const { data, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .insert({
            name,
            subject,
            html_body,
            from_name: from_name || 'Andrew from Elec-Mate',
            from_email: from_email || 'founder@elec-mate.com',
            reply_to: reply_to || 'founder@elec-mate.com',
            preheader: preheader || null,
            segment_filter: segment_filter || {},
            template_slug: template_slug || null,
            notes: notes || null,
            created_by: callerId !== 'service_role' ? callerId : null,
          })
          .select()
          .single();
        if (error) throw error;
        result = { campaign: data };
        break;
      }

      case 'update_campaign': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { campaignId, ...updates } = body as any;
        if (!campaignId) throw new Error('campaignId required');
        delete updates.action;

        const { data: existing } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('status')
          .eq('id', campaignId)
          .single();
        if (existing?.status !== 'draft' && existing?.status !== 'scheduled') {
          throw new Error('Can only edit draft or scheduled campaigns');
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

      case 'clone_campaign': {
        const { campaignId, newName } = body;
        if (!campaignId) throw new Error('campaignId required');
        const { data: source, error: sErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        if (sErr) throw sErr;

        const { data: cloned, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .insert({
            name: newName || `${source.name} (copy)`,
            subject: source.subject,
            html_body: source.html_body,
            from_name: source.from_name,
            from_email: source.from_email,
            reply_to: source.reply_to,
            preheader: source.preheader,
            segment_filter: source.segment_filter,
            template_slug: source.template_slug,
            cloned_from: campaignId,
            notes: source.notes,
            status: 'draft',
            created_by: callerId !== 'service_role' ? callerId : null,
          })
          .select()
          .single();
        if (error) throw error;
        result = { campaign: cloned };
        break;
      }

      case 'clone_to_non_openers': {
        // Clone a completed campaign, then restrict recipients to those who didn't open.
        const { campaignId, newName } = body;
        if (!campaignId) throw new Error('campaignId required');
        const { data: source } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        if (!source) throw new Error('Source campaign not found');

        const { data: nonOpeners } = await supabaseAdmin
          .from('outreach_campaign_sends')
          .select('contact_id, email')
          .eq('campaign_id', campaignId)
          .in('status', ['sent', 'delivered']);

        const { data: cloned, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .insert({
            name: newName || `${source.name} — follow-up`,
            subject: `Following up: ${source.subject}`,
            html_body: source.html_body,
            from_name: source.from_name,
            from_email: source.from_email,
            reply_to: source.reply_to,
            preheader: source.preheader,
            segment_filter: {
              ...(source.segment_filter || {}),
              contact_ids: (nonOpeners || []).map((r) => r.contact_id),
            },
            cloned_from: campaignId,
            notes: `Follow-up to non-openers of "${source.name}"`,
            status: 'draft',
            created_by: callerId !== 'service_role' ? callerId : null,
          })
          .select()
          .single();
        if (error) throw error;
        result = { campaign: cloned, targetCount: nonOpeners?.length || 0 };
        break;
      }

      case 'schedule_campaign': {
        const { campaignId, scheduledAt } = body;
        if (!campaignId || !scheduledAt) throw new Error('campaignId and scheduledAt required');
        const when = new Date(scheduledAt);
        if (isNaN(when.getTime())) throw new Error('Invalid scheduledAt');
        const { error } = await supabaseAdmin
          .from('outreach_campaigns')
          .update({ scheduled_at: when.toISOString(), status: 'scheduled' })
          .eq('id', campaignId)
          .eq('status', 'draft');
        if (error) throw error;
        result = { scheduled: true, when: when.toISOString() };
        break;
      }

      case 'unschedule_campaign': {
        const { campaignId } = body;
        if (!campaignId) throw new Error('campaignId required');
        const { error } = await supabaseAdmin
          .from('outreach_campaigns')
          .update({ scheduled_at: null, status: 'draft' })
          .eq('id', campaignId)
          .eq('status', 'scheduled');
        if (error) throw error;
        result = { unscheduled: true };
        break;
      }

      // ─── prepare_send ─────────────────────────────────────────
      case 'prepare_send': {
        const { campaignId } = body;
        if (!campaignId) throw new Error('campaignId required');

        const { data: campaign, error: cErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        if (cErr) throw cErr;
        if (!['draft', 'paused', 'scheduled'].includes(campaign.status)) {
          throw new Error('Campaign must be in draft, scheduled, or paused status');
        }

        const filter = campaign.segment_filter || {};

        // If contact_ids explicitly provided (follow-up flow), target only those
        let contacts: { id: string; email: string; name: string | null; organisation: string | null; role: string | null; tags: string[] | null }[] = [];

        if (Array.isArray(filter.contact_ids) && filter.contact_ids.length > 0) {
          // Chunk large id arrays — PostgREST puts `.in()` values in the URL
          // and anything over ~200 IDs blows past URL limits. 500 UUIDs per
          // chunk keeps each request well under the 16KB header cap.
          const CHUNK = 500;
          const ids: string[] = filter.contact_ids;
          for (let i = 0; i < ids.length; i += CHUNK) {
            const slice = ids.slice(i, i + CHUNK);
            const { data, error } = await supabaseAdmin
              .from('outreach_contacts')
              .select('id, email, name, organisation, role, tags')
              .in('id', slice)
              .eq('is_suppressed', false);
            if (error) throw error;
            if (data) contacts.push(...data);
          }
          console.log(
            `[prepare_send] resolved ${contacts.length}/${ids.length} contacts from id list`
          );
        } else {
          // Tag/filter-based resolution. Paginate through the 1000-row
          // PostgREST cap so segments bigger than 1k get fully hydrated.
          const CHUNK = 1000;
          let offset = 0;
          while (true) {
            let q = supabaseAdmin
              .from('outreach_contacts')
              .select('id, email, name, organisation, role, tags')
              .eq('is_suppressed', false)
              .range(offset, offset + CHUNK - 1);
            if (Array.isArray(filter.contact_type) && filter.contact_type.length > 0) {
              q = q.in('contact_type', filter.contact_type);
            }
            if (Array.isArray(filter.tags) && filter.tags.length > 0) {
              // .contains() = AND semantics (contact must have ALL tags).
              q = q.contains('tags', filter.tags);
            }
            const { data, error: qErr } = await q;
            if (qErr) throw qErr;
            const rows = data || [];
            contacts.push(...rows);
            if (rows.length < CHUNK) break;
            offset += CHUNK;
          }
          console.log(
            `[prepare_send] resolved ${contacts.length} contacts from tag filter`
          );
        }

        if (contacts.length === 0) {
          result = { recipients: 0, message: 'No matching contacts found' };
          break;
        }

        // Cross-system suppression: fetch every row from email_suppressions so
        // winback-unsubscribed / Resend-bounced / admin-suppressed addresses
        // are filtered out even if outreach_contacts.is_suppressed wasn't
        // flipped. This is the authoritative list.
        const { data: suppressedRows } = await supabaseAdmin
          .from('email_suppressions')
          .select('email');
        const suppressedSet = new Set(
          (suppressedRows || []).map((r) => (r.email || '').trim().toLowerCase())
        );
        const beforeSuppress = contacts.length;
        contacts = contacts.filter(
          (c) => !suppressedSet.has((c.email || '').trim().toLowerCase())
        );
        const suppressed = beforeSuppress - contacts.length;
        if (suppressed > 0) {
          console.log(`[prepare_send] filtered ${suppressed} suppressed addresses`);
        }

        if (contacts.length === 0) {
          result = {
            recipients: 0,
            message: `All ${beforeSuppress} matching contacts are on the suppression list`,
          };
          break;
        }

        // Clear pending sends from a previous prepare
        await supabaseAdmin
          .from('outreach_campaign_sends')
          .delete()
          .eq('campaign_id', campaignId)
          .eq('status', 'pending');

        const sendRows = contacts.map((c) => ({
          campaign_id: campaignId,
          contact_id: c.id,
          email: c.email.trim().toLowerCase(),
          status: 'pending',
        }));

        // Pending rows for this campaign were wiped above, so a plain INSERT
        // is safe — no unique-constraint dance needed. (Previously used UPSERT
        // with onConflict='campaign_id,contact_id' but that column pair has no
        // unique index so PostgreSQL rejected every batch silently.)
        let insertedCount = 0;
        const insertErrors: string[] = [];
        for (let i = 0; i < sendRows.length; i += 100) {
          const batch = sendRows.slice(i, i + 100);
          const { error: insertErr } = await supabaseAdmin
            .from('outreach_campaign_sends')
            .insert(batch);
          if (insertErr) {
            console.error(
              '[prepare_send] insert batch error:',
              insertErr.message,
              'batch_start:',
              i
            );
            insertErrors.push(insertErr.message);
          } else {
            insertedCount += batch.length;
          }
        }
        if (insertedCount === 0 && insertErrors.length > 0) {
          throw new Error(
            `Failed to queue any recipients: ${insertErrors[0]}`
          );
        }

        const { error: campaignUpdateErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .update({
            total_recipients: insertedCount,
            status: 'sending',
            started_at: new Date().toISOString(),
          })
          .eq('id', campaignId);
        if (campaignUpdateErr) throw campaignUpdateErr;

        console.log(
          `[prepare_send] queued ${insertedCount} recipients for campaign ${campaignId}`
        );
        result = { recipients: insertedCount };
        break;
      }

      // ─── send_batch ───────────────────────────────────────────
      // Uses Resend's batch.send() endpoint — up to 100 emails per API call
      // in a single HTTP request. No per-email delay needed (Resend handles
      // delivery pacing). Client is expected to add its own ~500ms gap
      // between send_batch calls to stay under the 2-req/sec rate limit.
      case 'send_batch': {
        const { campaignId, batchSize = DEFAULT_BATCH_SIZE } = body;
        if (!campaignId) throw new Error('campaignId required');

        const safeBatchSize = Math.min(batchSize, MAX_BATCH_SIZE);

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

        // Pull next pending batch (up to 100 at a time — Resend batch max)
        const { data: pendingSends, error: pErr } = await supabaseAdmin
          .from('outreach_campaign_sends')
          .select('id, email, contact_id')
          .eq('campaign_id', campaignId)
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
          .limit(safeBatchSize);
        if (pErr) throw pErr;

        if (!pendingSends || pendingSends.length === 0) {
          await supabaseAdmin
            .from('outreach_campaigns')
            .update({ status: 'completed', completed_at: new Date().toISOString() })
            .eq('id', campaignId);
          result = { sent: 0, remaining: 0, failed: 0, completed: true };
          break;
        }

        // Batch-fetch the contacts for merge-tag context
        const contactIds = pendingSends.map((s) => s.contact_id).filter(Boolean);
        const { data: contactRows } = await supabaseAdmin
          .from('outreach_contacts')
          .select('id, email, name, organisation, role, tags')
          .in('id', contactIds);
        const contactMap = new Map<string, MergeContext>();
        for (const c of contactRows || []) {
          contactMap.set(c.id, {
            email: c.email,
            name: c.name,
            organisation: c.organisation,
            role: c.role,
            tags: c.tags,
          });
        }

        const fromAddress = `${campaign.from_name} <${campaign.from_email}>`;
        const replyTo = campaign.reply_to || campaign.from_email;

        // Build the email array for Resend batch.send(). Merge tags + unsub
        // token are resolved per recipient before submission.
        const emailPayloads = await Promise.all(
          pendingSends.map(async (send) => {
            const ctx: MergeContext = contactMap.get(send.contact_id as string) || {
              email: send.email,
            };
            const rendered = renderMergeTags(campaign.html_body, ctx);
            const renderedSubject = renderMergeTags(campaign.subject, ctx);
            const htmlWithUnsub = await appendUnsubFooter(rendered, send.email, campaignId);
            const unsubUrl = await buildUnsubLink(send.email, campaignId);
            return {
              sendId: send.id,
              contactId: send.contact_id,
              email: send.email,
              renderedSubject,
              payload: {
                from: fromAddress,
                to: [send.email],
                replyTo,
                subject: renderedSubject,
                html: htmlWithUnsub,
                headers: buildListUnsubscribeHeaders(unsubUrl),
                tags: [
                  { name: 'campaign', value: 'outreach' },
                  { name: 'campaign_id', value: campaignId },
                ],
              },
            };
          })
        );

        let sentCount = 0;
        let failedCount = 0;
        const errors: string[] = [];

        try {
          // ONE API call for the whole batch — Resend's recommended pattern
          const { data: batchData, error: batchError } = await resend.batch.send(
            emailPayloads.map((e) => e.payload)
          );

          if (batchError) {
            throw new Error(batchError.message || 'Resend batch.send() failed');
          }

          // batchData.data is an array of { id } in the same order as input
          const results = batchData?.data || [];
          const sentAt = new Date().toISOString();

          // Update all rows as sent with their Resend IDs
          const sendUpdates = emailPayloads.map((e, idx) => ({
            send_id: e.sendId,
            resend_id: results[idx]?.id || null,
          }));

          for (const u of sendUpdates) {
            await supabaseAdmin
              .from('outreach_campaign_sends')
              .update({
                status: 'sent',
                sent_at: sentAt,
                resend_email_id: u.resend_id,
              })
              .eq('id', u.send_id);
          }

          // Bump contact engagement counters (best effort, parallel)
          await Promise.all(
            emailPayloads
              .filter((e) => e.contactId)
              .map((e) =>
                supabaseAdmin
                  .rpc('recompute_contact_engagement', { p_contact_id: e.contactId })
                  .then(() => {})
                  .catch(() => {})
              )
          );

          // Email logs in one multi-row insert
          await supabaseAdmin.from('email_logs').insert(
            emailPayloads.map((e, idx) => ({
              to_email: e.email,
              subject: e.renderedSubject,
              template: 'outreach_campaign',
              status: 'sent',
              metadata: {
                campaign_id: campaignId,
                campaign_name: campaign.name,
                contact_id: e.contactId,
                resend_id: results[idx]?.id,
              },
            }))
          );

          sentCount = emailPayloads.length;
        } catch (err) {
          // Whole-batch failure — Resend either rejected or network errored.
          // Mark the entire batch as failed so the client can retry.
          failedCount = emailPayloads.length;
          const msg = err instanceof Error ? err.message : String(err);
          errors.push(msg);
          for (const e of emailPayloads) {
            await supabaseAdmin
              .from('outreach_campaign_sends')
              .update({ status: 'failed', error_message: msg })
              .eq('id', e.sendId);
          }
        }

        // Counter update (RPC or fallback)
        await supabaseAdmin
          .rpc('increment_outreach_counters', {
            p_campaign_id: campaignId,
            p_sent: sentCount,
            p_failed: failedCount,
          })
          .then(() => {})
          .catch(async () => {
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

        const { count: remaining } = await supabaseAdmin
          .from('outreach_campaign_sends')
          .select('id', { count: 'exact', head: true })
          .eq('campaign_id', campaignId)
          .eq('status', 'pending');

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

      // ─── send_test ────────────────────────────────────────────
      case 'send_test': {
        const { campaignId, testEmail, previewContactId, previewContext } = body;
        if (!campaignId || !testEmail) throw new Error('campaignId and testEmail required');

        const normalisedEmail = String(testEmail).trim().toLowerCase();
        const { data: supRow } = await supabaseAdmin
          .from('email_suppressions')
          .select('email')
          .eq('email', normalisedEmail)
          .maybeSingle();
        if (supRow) {
          throw new Error(
            `${normalisedEmail} is on the suppression list. Remove via admin if this is deliberate.`
          );
        }

        const { data: campaign, error: cErr } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('*')
          .eq('id', campaignId)
          .single();
        if (cErr) throw cErr;

        // Derive test context from the campaign's template category when no
        // explicit override is given — so a business campaign doesn't preview
        // with "Sample College" merge data, and vice versa.
        const categoryFromName =
          typeof campaign.name === 'string' && /business/i.test(campaign.name)
            ? 'business'
            : 'college';

        const defaultBusinessCtx: MergeContext = {
          email: testEmail,
          name: 'Sam Walker',
          organisation: 'Sample Electrical Ltd',
          role: 'Director',
          tags: ['london', 'business_pool'],
        };
        const defaultCollegeCtx: MergeContext = {
          email: testEmail,
          name: 'Test Recipient',
          organisation: 'Sample College',
          role: 'Electrical Tutor',
          tags: ['london'],
        };

        let ctx: MergeContext =
          categoryFromName === 'business' ? defaultBusinessCtx : defaultCollegeCtx;

        // Client-supplied preview context wins over the default.
        if (previewContext && typeof previewContext === 'object') {
          ctx = { ...ctx, ...previewContext, email: testEmail };
        }

        // If a preview contact specified, use real data for merge tags
        if (previewContactId) {
          const { data } = await supabaseAdmin
            .from('outreach_contacts')
            .select('email, name, organisation, role, tags')
            .eq('id', previewContactId)
            .single();
          if (data) ctx = { ...data, email: testEmail };
        }

        const rendered = renderMergeTags(campaign.html_body, ctx);
        const renderedSubject = renderMergeTags(campaign.subject, ctx);
        const htmlWithUnsub = await appendUnsubFooter(rendered, testEmail, campaignId);
        const unsubUrl = await buildUnsubLink(testEmail, campaignId);
        const fromAddress = `${campaign.from_name} <${campaign.from_email}>`;
        const replyTo = campaign.reply_to || campaign.from_email;

        const { error: emailError } = await resend.emails.send({
          from: fromAddress,
          to: [testEmail.trim().toLowerCase()],
          replyTo,
          subject: `[TEST] ${renderedSubject}`,
          html: htmlWithUnsub,
          headers: buildListUnsubscribeHeaders(unsubUrl),
          tags: [
            { name: 'campaign', value: 'outreach_test' },
            { name: 'campaign_id', value: campaignId },
          ],
        });
        if (emailError) throw new Error(`Failed to send test: ${emailError.message}`);
        result = { success: true, email: testEmail };
        break;
      }

      // ─── send_template_direct ─────────────────────────────────
      // One-off send of a template to an arbitrary email. No campaign row created.
      // Used by the Quick Send widget on the Overview tab.
      case 'send_template_direct': {
        const { toEmail, templateSlug, previewContact } = body;
        if (!toEmail || !templateSlug) throw new Error('toEmail and templateSlug required');

        const normalisedEmail = String(toEmail).trim().toLowerCase();
        const { data: supRow } = await supabaseAdmin
          .from('email_suppressions')
          .select('email')
          .eq('email', normalisedEmail)
          .maybeSingle();
        if (supRow) {
          throw new Error(
            `${normalisedEmail} is on the suppression list. Remove via admin if this is deliberate.`
          );
        }

        const { data: template, error: tErr } = await supabaseAdmin
          .from('outreach_email_templates')
          .select('*')
          .eq('slug', templateSlug)
          .single();
        if (tErr || !template) throw new Error('Template not found — run Install templates first');

        const ctx: MergeContext = previewContact || {
          email: toEmail,
          name: 'Sam Tutor',
          organisation: 'Sample College',
          role: 'Head of Electrical',
          tags: ['london'],
        };

        const rendered = renderMergeTags(template.html_body, ctx);
        const renderedSubject = renderMergeTags(template.subject, ctx);
        const adhocId = 'adhoc-' + crypto.randomUUID();
        const htmlWithUnsub = await appendUnsubFooter(rendered, toEmail, adhocId);
        const unsubUrl = await buildUnsubLink(toEmail, adhocId);

        const { error: emailError } = await resend.emails.send({
          from: 'Andrew from Elec-Mate <founder@elec-mate.com>',
          to: [toEmail.trim().toLowerCase()],
          replyTo: 'founder@elec-mate.com',
          subject: `[TEST] ${renderedSubject}`,
          html: htmlWithUnsub,
          headers: buildListUnsubscribeHeaders(unsubUrl),
          tags: [
            { name: 'campaign', value: 'adhoc_preview' },
            { name: 'template_slug', value: templateSlug },
          ],
        });
        if (emailError) throw new Error(`Send failed: ${emailError.message}`);

        await supabaseAdmin.from('email_logs').insert({
          to_email: toEmail,
          subject: `[TEST] ${renderedSubject}`,
          template: `outreach_preview_${templateSlug}`,
          status: 'sent',
          metadata: { template_slug: templateSlug, adhoc_id: adhocId },
        });

        result = { success: true, to: toEmail, template: templateSlug };
        break;
      }

      // ─── preview_render ───────────────────────────────────────
      case 'preview_render': {
        const { html_body, subject, contactId } = body;
        let ctx: MergeContext = {
          email: 'sample@college.ac.uk',
          name: 'Sam Tutor',
          organisation: 'Sample College',
          role: 'Head of Electrical',
          tags: ['london'],
        };
        if (contactId) {
          const { data } = await supabaseAdmin
            .from('outreach_contacts')
            .select('email, name, organisation, role, tags')
            .eq('id', contactId)
            .single();
          if (data) ctx = data;
        }
        result = {
          html: renderMergeTags(html_body || '', ctx),
          subject: renderMergeTags(subject || '', ctx),
          context: ctx,
        };
        break;
      }

      // ─── pause_campaign ───────────────────────────────────────
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

      // ─── process_scheduled (cron entry point) ─────────────────
      case 'process_scheduled': {
        const now = new Date().toISOString();
        const { data: due } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('id, name')
          .eq('status', 'scheduled')
          .lte('scheduled_at', now);
        result = { found: due?.length || 0, ids: (due || []).map((d) => d.id) };
        break;
      }

      // ─── get_stats ────────────────────────────────────────────
      case 'get_stats': {
        const { data: campaigns, error } = await supabaseAdmin
          .from('outreach_campaigns')
          .select(
            'status, total_recipients, sent_count, failed_count, open_count, click_count, bounce_count'
          );
        if (error) throw error;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totals = (campaigns || []).reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      // ═══════════════════════════════════════════════════════════
      // LEAD DISCOVERY — education_leads + business_leads
      // ═══════════════════════════════════════════════════════════
      case 'get_leads': {
        const {
          pool = 'education',
          search,
          status_filter,
          source_filter,
          has_email,
          country_filter,
          org_type_filter,
          sic_filter,
          order_by = 'discovered_at',
          page = 1,
          limit = 100,
        } = body;
        const table = pool === 'business' ? 'business_leads' : 'education_leads';
        let q = supabaseAdmin.from(table).select('*', { count: 'exact' });

        if (status_filter && status_filter !== 'all') q = q.eq('status', status_filter);
        if (source_filter) q = q.eq('source', source_filter);
        if (country_filter) q = q.eq('country', country_filter);
        if (has_email === true) q = q.not('email', 'is', null);
        if (has_email === false) q = q.is('email', null);
        if (pool === 'education' && org_type_filter) {
          q = q.eq('organisation_type', org_type_filter);
        }
        if (pool === 'business' && sic_filter) {
          q = q.contains('sic_codes', [sic_filter]);
        }
        if (search) {
          if (pool === 'education') {
            q = q.or(
              `organisation.ilike.%${search}%,email.ilike.%${search}%,name.ilike.%${search}%,city.ilike.%${search}%`
            );
          } else {
            q = q.or(
              `company_name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%,postcode.ilike.%${search}%`
            );
          }
        }

        q = q.order(order_by === 'confidence' ? 'confidence_score' : 'created_at', {
          ascending: false,
        });
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        q = q.range(from, to);

        const { data, error, count } = await q;
        if (error) throw error;
        result = { leads: data, total: count, pool, page, limit };
        break;
      }

      case 'get_leads_overview': {
        const { data, error } = await supabaseAdmin
          .from('outreach_leads_overview')
          .select('*');
        if (error) throw error;
        const { data: runs } = await supabaseAdmin
          .from('outreach_scrape_runs')
          .select('*')
          .order('started_at', { ascending: false })
          .limit(10);
        result = { overview: data, recentRuns: runs || [] };
        break;
      }

      case 'update_lead_status': {
        const { pool, leadIds, newStatus, rejectionReason } = body;
        if (!pool || !Array.isArray(leadIds) || !newStatus)
          throw new Error('pool, leadIds, newStatus required');
        const table = pool === 'business' ? 'business_leads' : 'education_leads';
        const { error } = await supabaseAdmin
          .from(table)
          .update({
            status: newStatus,
            rejection_reason: rejectionReason || null,
            reviewed_at: new Date().toISOString(),
            reviewed_by: callerId !== 'service_role' ? callerId : null,
          })
          .in('id', leadIds);
        if (error) throw error;
        result = { updated: leadIds.length };
        break;
      }

      case 'promote_leads': {
        // Move selected leads into outreach_contacts as campaign-ready contacts.
        const { pool, leadIds, tagsToApply } = body;
        if (!pool || !Array.isArray(leadIds)) throw new Error('pool, leadIds required');
        const table = pool === 'business' ? 'business_leads' : 'education_leads';

        const { data: leads, error: fErr } = await supabaseAdmin
          .from(table)
          .select('*')
          .in('id', leadIds);
        if (fErr) throw fErr;

        let promoted = 0;
        let skipped = 0;

        for (const lead of leads || []) {
          if (!lead.email) {
            skipped++;
            continue;
          }
          const email = lead.email.trim().toLowerCase();
          const organisation =
            pool === 'business' ? lead.company_name : lead.organisation;
          const baseTags: string[] = [...(tagsToApply || [])];
          if (lead.country) baseTags.push(lead.country.toLowerCase().replace(/\s+/g, '_'));
          if (lead.region) baseTags.push(lead.region.toLowerCase().replace(/\s+/g, '_'));
          if (pool === 'business' && Array.isArray(lead.accreditations)) {
            for (const a of lead.accreditations) baseTags.push(a);
          }
          if (pool === 'education' && lead.organisation_type) {
            baseTags.push(lead.organisation_type);
          }

          const contactType =
            pool === 'business'
              ? 'employer'
              : lead.organisation_type === 'private_training_provider' ||
                  lead.organisation_type === 'apprenticeship_provider'
                ? 'training_provider'
                : lead.organisation_type === 'trade_body'
                  ? 'trade_body'
                  : 'college';

          const { data: contact, error: cErr } = await supabaseAdmin
            .from('outreach_contacts')
            .upsert(
              {
                email,
                name: lead.name || null,
                organisation,
                role: lead.role || (pool === 'business' ? 'Director' : 'Enquiries'),
                contact_type: contactType,
                tags: Array.from(new Set(baseTags.filter(Boolean))),
                source: `lead_${pool}_${lead.source}`,
              },
              { onConflict: 'email', ignoreDuplicates: false }
            )
            .select('id')
            .single();

          if (cErr) {
            skipped++;
            continue;
          }

          await supabaseAdmin
            .from(table)
            .update({
              status: 'promoted',
              promoted_to_contact_id: contact.id,
              reviewed_at: new Date().toISOString(),
              reviewed_by: callerId !== 'service_role' ? callerId : null,
            })
            .eq('id', lead.id);
          promoted++;
        }

        result = { promoted, skipped, requested: leadIds.length };
        break;
      }

      case 'delete_leads': {
        const { pool, leadIds } = body;
        if (!pool || !Array.isArray(leadIds)) throw new Error('pool, leadIds required');
        const table = pool === 'business' ? 'business_leads' : 'education_leads';
        const { error } = await supabaseAdmin.from(table).delete().in('id', leadIds);
        if (error) throw error;
        result = { deleted: leadIds.length };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error('Error in send-outreach-campaign:', msg);
    return new Response(
      JSON.stringify({
        error: msg,
        stack: stack?.split('\n').slice(0, 3).join(' | '),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
