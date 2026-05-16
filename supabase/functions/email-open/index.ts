/**
 * email-open — unified tracking pixel endpoint.
 *
 * Embedded as a 1x1 invisible image at the end of every client-facing
 * email. When the client's email client loads images, this endpoint
 * fires, records the open, and (on FIRST open) sends a push + in-app
 * notification to the electrician so they know straight away.
 *
 * URL shape:
 *   /functions/v1/email-open?type=<entity_type>&id=<entity_id>
 *
 * entity_type values (string, free-form so new email types don't need
 * a schema change):
 *   quote_send | quote_reminder | quote_acceptance
 *   invoice_send | payment_reminder
 *   cert_send | cert_expiry
 *   scope_send | photos_send
 *   signature_request | briefing_sign_off
 *
 * Always returns the 1x1 GIF — failures are logged but never surfaced
 * to the client's mail app.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// 1x1 transparent GIF
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00, 0xff, 0xff, 0xff,
  0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b,
]);

const pixelHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'image/gif',
  'Cache-Control': 'no-cache, no-store, must-revalidate, private',
  Pragma: 'no-cache',
  Expires: '0',
};

const pixelResponse = () =>
  new Response(TRACKING_PIXEL, { status: 200, headers: pixelHeaders });

interface EntityContext {
  ownerUserId: string;
  /** Human label for the notification, e.g. "Quote QUO-2026-0142" */
  label: string;
  /** Client name to address the notification with */
  clientName: string;
  /** Entity-specific link for the in-app notification's `data` payload */
  appLink?: string;
}

/**
 * Look up the entity that was opened, returning enough context to
 * compose the push notification. Returns null for unknown types or
 * missing rows — we still record the open via the generic table, just
 * skip the push.
 */
async function resolveEntity(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  entityType: string,
  entityId: string
): Promise<EntityContext | null> {
  try {
    // Quote-family: quote_send, quote_reminder, quote_acceptance all live on quotes
    if (
      entityType === 'quote_send' ||
      entityType === 'quote_reminder' ||
      entityType === 'quote_acceptance'
    ) {
      const { data } = await supabase
        .from('quotes')
        .select('user_id, quote_number, client_data, accepted_by_name')
        .eq('id', entityId)
        .maybeSingle();
      if (!data) return null;
      return {
        ownerUserId: data.user_id,
        label: `Quote ${data.quote_number || ''}`.trim(),
        clientName: data.accepted_by_name || data.client_data?.name || 'Client',
        appLink: `/electrician/quote-builder/${entityId}`,
      };
    }

    // Invoice-family: invoice_send, payment_reminder
    if (entityType === 'invoice_send' || entityType === 'payment_reminder') {
      // Try new invoices table first, fall back to legacy quotes table
      const { data: inv } = await supabase
        .from('invoices')
        .select('user_id, invoice_number, client_data')
        .eq('id', entityId)
        .maybeSingle();
      if (inv) {
        return {
          ownerUserId: inv.user_id,
          label: `Invoice ${inv.invoice_number || ''}`.trim(),
          clientName: inv.client_data?.name || 'Client',
          appLink: `/electrician/invoices/${entityId}`,
        };
      }
      // Legacy fallback: invoices stored on quotes table
      const { data: legacy } = await supabase
        .from('quotes')
        .select('user_id, invoice_number, client_data')
        .eq('id', entityId)
        .eq('invoice_raised', true)
        .maybeSingle();
      if (!legacy) return null;
      return {
        ownerUserId: legacy.user_id,
        label: `Invoice ${legacy.invoice_number || ''}`.trim(),
        clientName: legacy.client_data?.name || 'Client',
        appLink: `/electrician/invoices/${entityId}`,
      };
    }

    // Certificate-family: cert_send, cert_expiry
    if (entityType === 'cert_send' || entityType === 'cert_expiry') {
      const { data } = await supabase
        .from('reports')
        .select('user_id, certificate_number, report_type, client_name, installation_address')
        .eq('id', entityId)
        .maybeSingle();
      if (!data) return null;
      const certType = String(data.report_type || 'Certificate').toUpperCase();
      return {
        ownerUserId: data.user_id,
        label: `${certType} ${data.certificate_number || ''}`.trim(),
        clientName: data.client_name || 'Client',
        appLink: `/electrician/certs/${entityId}`,
      };
    }

    if (entityType === 'scope_send') {
      const { data } = await supabase
        .from('scope_share_links')
        .select('user_id, client_name, scope_data')
        .eq('id', entityId)
        .maybeSingle();
      if (!data) return null;
      return {
        ownerUserId: data.user_id,
        label: 'Scope of works',
        clientName: data.client_name || data.scope_data?.customerName || 'Client',
        appLink: `/electrician/scope/${entityId}`,
      };
    }

    if (entityType === 'photos_send') {
      const { data } = await supabase
        .from('photo_projects')
        .select('user_id, name')
        .eq('id', entityId)
        .maybeSingle();
      if (!data) return null;
      return {
        ownerUserId: data.user_id,
        label: `Photos: ${data.name || 'project'}`,
        clientName: 'Client',
        appLink: `/electrician/photos/${entityId}`,
      };
    }

    if (entityType === 'signature_request') {
      const { data } = await supabase
        .from('signature_requests')
        .select('user_id, document_title, signer_name')
        .eq('id', entityId)
        .maybeSingle();
      if (!data) return null;
      return {
        ownerUserId: data.user_id,
        label: data.document_title || 'Document',
        clientName: data.signer_name || 'Recipient',
      };
    }

    if (entityType === 'briefing_sign_off') {
      const { data } = await supabase
        .from('team_briefings')
        .select('user_id, briefing_name')
        .eq('id', entityId)
        .maybeSingle();
      if (!data) return null;
      return {
        ownerUserId: data.user_id,
        label: `Briefing: ${data.briefing_name || ''}`.trim(),
        clientName: 'Recipient',
      };
    }
  } catch (e) {
    console.error('resolveEntity error:', e);
  }
  return null;
}

/**
 * Compose the push title + body based on entity type. Keeps the
 * messaging consistent and on-brand with the rest of Elec-Mate's
 * notification voice.
 */
function composePush(
  entityType: string,
  ctx: EntityContext
): { title: string; body: string } {
  const who = ctx.clientName;
  switch (entityType) {
    case 'quote_send':
      return {
        title: `${who} opened your quote`,
        body: `${ctx.label} — good signal, they're looking.`,
      };
    case 'quote_reminder':
      return {
        title: `${who} opened your reminder`,
        body: `${ctx.label} reminder — they've seen it now.`,
      };
    case 'quote_acceptance':
      return {
        title: `${who} viewed the acceptance email`,
        body: `${ctx.label}`,
      };
    case 'invoice_send':
      return {
        title: `${who} opened your invoice`,
        body: `${ctx.label} — they've seen it.`,
      };
    case 'payment_reminder':
      return {
        title: `${who} opened the payment reminder`,
        body: `${ctx.label} — chase landed.`,
      };
    case 'cert_send':
      return {
        title: `${who} opened the certificate`,
        body: `${ctx.label} delivered.`,
      };
    case 'cert_expiry':
      return {
        title: `${who} opened the expiry reminder`,
        body: `${ctx.label} — they know it's coming up.`,
      };
    case 'scope_send':
      return {
        title: `${who} opened the scope of works`,
        body: `${ctx.label} — review pending.`,
      };
    case 'photos_send':
      return {
        title: `${who} opened the photos`,
        body: ctx.label,
      };
    case 'signature_request':
      return {
        title: `${who} opened the signature request`,
        body: ctx.label,
      };
    case 'briefing_sign_off':
      return {
        title: `${who} opened the briefing`,
        body: ctx.label,
      };
    default:
      return {
        title: `${who} opened an email from you`,
        body: ctx.label,
      };
  }
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: pixelHeaders });
  }
  // Always return the pixel — never surface errors to the mail client.
  try {
    const url = new URL(req.url);
    const entityType = (url.searchParams.get('type') || '').trim();
    const entityId = (url.searchParams.get('id') || '').trim();

    if (!entityType || !entityId) return pixelResponse();

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) return pixelResponse();

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null;
    const userAgent = req.headers.get('user-agent') || null;

    const ctx = await resolveEntity(supabase, entityType, entityId);
    if (!ctx) {
      console.warn(`email-open: unknown entity ${entityType}/${entityId}`);
      return pixelResponse();
    }

    // Upsert the open + figure out whether this is the first one.
    const { data: openRows, error: rpcErr } = await supabase.rpc('record_email_open', {
      p_entity_type: entityType,
      p_entity_id: entityId,
      p_owner_user_id: ctx.ownerUserId,
      p_recipient_email: null,
      p_ip: ip,
      p_user_agent: userAgent,
    });

    if (rpcErr) {
      console.error('record_email_open RPC failed:', rpcErr);
      return pixelResponse();
    }

    const isFirstOpen: boolean = Array.isArray(openRows)
      ? !!openRows[0]?.is_first_open
      : !!(openRows as { is_first_open?: boolean })?.is_first_open;
    console.log(`email-open: ${entityType}/${entityId} isFirstOpen=${isFirstOpen} owner=${ctx.ownerUserId}`);

    // Mirror quote_send opens to quote_views (back-compat with the
    // existing QuoteDetailView UI that reads email_opened_at from
    // quote_views). Best-effort — never blocks the response.
    if (entityType === 'quote_send' || entityType === 'quote_reminder') {
      try {
        const { data: currentView } = await supabase
          .from('quote_views')
          .select('email_open_count, view_count, email_opened_at')
          .eq('quote_id', entityId)
          .maybeSingle();
        if (currentView) {
          await supabase
            .from('quote_views')
            .update({
              email_opened_at: currentView.email_opened_at || new Date().toISOString(),
              email_open_count: (currentView.email_open_count || 0) + 1,
              last_viewed_at: new Date().toISOString(),
              view_count: (currentView.view_count || 0) + 1,
            })
            .eq('quote_id', entityId);
        }
      } catch (e) {
        console.warn('quote_views mirror failed (non-fatal):', e);
      }
    }

    // Fire push + in-app notification only on first open.
    if (isFirstOpen) {
      const { title, body } = composePush(entityType, ctx);

      // Push notification (best effort)
      supabase.functions
        .invoke('send-push-notification', {
          body: {
            userId: ctx.ownerUserId,
            title,
            body,
            type: 'email_opened',
            data: {
              entity_type: entityType,
              entity_id: entityId,
              link: ctx.appLink || null,
            },
          },
        })
        .catch((e: unknown) => console.warn('Push notification failed:', e));

      // In-app notification — write to `push_notification_log` since
      // that's the table NotificationProvider reads (and subscribes to
      // via realtime) to populate the bell-icon feed. The convention
      // in this codebase is: the originating function inserts the row;
      // `send-push-notification` only handles device delivery (FCM/APNS).
      // We don't write to `notification_log` (older, unread by UI) or
      // `ojt_notifications` (check constraints reject non-OJT types).
      const { error: notifError } = await supabase.from('push_notification_log').insert({
        user_id: ctx.ownerUserId,
        type: 'email_opened',
        reference_id: entityId,
        title,
        body,
      });
      if (notifError) {
        console.warn('push_notification_log insert failed:', notifError);
      } else {
        console.log(`email-open: first-open notification logged for ${entityType}/${entityId}`);
      }
    }
  } catch (e) {
    console.error('email-open handler error:', e);
  }
  return pixelResponse();
};

serve(handler);
