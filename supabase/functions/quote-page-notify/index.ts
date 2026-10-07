// quote-page-notify (ELE-1989)
//
// Fired by submit_quote_request (net.http_post, service-role key) after a
// customer sends a request from a firm's public quote page:
//   1. the firm gets an email at its own address (notification_email →
//      company_email → owner's login email) with the job, contact details and
//      a button to Leads; photos are linked through short-lived signed URLs.
//   2. the customer, if they gave an email, gets a branded confirmation from
//      the firm (From = firm name <noreply@>, Reply-To = firm).
// The bell + push already come from the employer_leads trigger.
//
// verify_jwt is irrelevant: only the service-role key is accepted below.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { sendEmail, clientFacingSender } from '../_shared/mailer.ts';
import { renderEmailShell, renderSteps, renderButton, renderCard } from '../_shared/email-template.ts';
import { isSuppressed } from '../_shared/suppressions.ts';
import { withSentry } from '../_shared/sentry.ts';

const APP_URL = 'https://elec-mate.com';

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

Deno.serve(
  withSentry('quote-page-notify', async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const bearer = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '').trim();
    if (!serviceKey || bearer !== serviceKey) return json({ error: 'forbidden' }, 403);

    let leadId = '';
    try {
      leadId = String((await req.json())?.lead_id ?? '');
    } catch {
      return json({ error: 'bad request' }, 400);
    }
    if (!/^[0-9a-f-]{36}$/i.test(leadId)) return json({ error: 'lead_id required' }, 400);

    const admin = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });

    const { data: lead } = await admin
      .from('employer_leads')
      .select('id, user_id, name, email, phone, source, notes, job_type, postcode, preferred_timing, photos, created_at')
      .eq('id', leadId)
      .maybeSingle();
    if (!lead || lead.source !== 'Quote page') return json({ ok: false, reason: 'not a quote page lead' });

    const { data: cp } = await admin
      .from('company_profiles')
      .select(
        'company_name, company_email, company_phone, company_website, notification_email, logo_url, logo_data_url, accent_color, primary_color'
      )
      .eq('user_id', lead.user_id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    let ownerEmail: string | null = null;
    try {
      const { data } = await admin.auth.admin.getUserById(lead.user_id);
      ownerEmail = data?.user?.email ?? null;
    } catch {
      /* fall through */
    }

    const companyName = (cp?.company_name || '').trim() || 'Your business';
    const colour = cp?.accent_color || cp?.primary_color || '#0f172a';
    const logo = cp?.logo_url || null; // data URLs are blocked by most mail clients
    const company = {
      name: companyName,
      logoUrl: logo,
      primaryColor: colour,
      email: cp?.company_email ?? null,
      phone: cp?.company_phone ?? null,
      website: cp?.company_website ?? null,
    };

    // Details text = notes minus the "Job:/When:/Postcode:/Photos:" header lines
    const details = String(lead.notes ?? '')
      .split('\n')
      .filter((l) => !/^(Job|When|Postcode|Photos): /.test(l))
      .join('\n')
      .trim();

    const facts: Array<[string, string]> = [];
    if (lead.job_type) facts.push(['Job', lead.job_type]);
    if (lead.preferred_timing) facts.push(['When', lead.preferred_timing]);
    if (lead.postcode) facts.push(['Postcode', lead.postcode]);
    if (lead.phone) facts.push(['Phone', lead.phone]);
    if (lead.email) facts.push(['Email', lead.email]);
    const factsHtml = facts
      .map(
        ([k, v]) =>
          `<p style="margin:0 0 8px;font-size:15px;color:#334155;line-height:1.5;"><strong style="color:#0f172a;">${esc(k)}:</strong> ${esc(v)}</p>`
      )
      .join('');

    const results: Record<string, unknown> = {};

    // ── 1. Firm alert ──────────────────────────────────────────────
    const firmTo = [cp?.notification_email, cp?.company_email, ownerEmail].find(isEmail) ?? null;
    if (firmTo) {
      const photos: string[] = Array.isArray(lead.photos) ? lead.photos : [];
      const photoLinks: string[] = [];
      for (const p of photos.slice(0, 3)) {
        const { data } = await admin.storage.from('quote-page-photos').createSignedUrl(p, 60 * 60 * 24 * 7);
        if (data?.signedUrl) photoLinks.push(data.signedUrl);
      }
      const photosHtml = photoLinks.length
        ? `<p style="margin:14px 0 6px;font-size:13px;font-weight:600;color:#0f172a;">Photos</p>` +
          photoLinks
            .map(
              (u, i) =>
                `<a href="${esc(u)}" style="display:inline-block;margin:0 8px 8px 0;"><img src="${esc(u)}" alt="Photo ${i + 1}" width="120" style="width:120px;height:auto;border-radius:8px;border:1px solid #e2e8f0;" /></a>`
            )
            .join('') +
          `<p style="margin:4px 0 0;font-size:12px;color:#64748b;">Photo links work for 7 days. They are always in Leads.</p>`
        : '';

      const html = renderEmailShell({
        subject: `New quote request from ${lead.name}`,
        preheader: `${lead.name}${lead.job_type ? ` · ${lead.job_type}` : ''}${lead.postcode ? ` · ${lead.postcode}` : ''}`,
        company,
        greeting: 'New quote request',
        body: `<p style="margin:0;font-size:16px;color:#334155;line-height:1.6;"><strong>${esc(lead.name)}</strong> asked for a quote through your quote page. Reply quickly: the first firm to call usually wins the job.</p>`,
        card: renderCard({
          label: 'The request',
          body:
            factsHtml +
            (details
              ? `<p style="margin:12px 0 0;font-size:15px;color:#334155;line-height:1.6;white-space:pre-wrap;">${esc(details)}</p>`
              : '') +
            photosHtml,
        }),
        cta: renderButton({
          label: 'Open in Leads',
          href: `${APP_URL}/employer?section=leads&lead=${encodeURIComponent(leadId)}`,
          background: colour,
          microcopy: lead.phone ? `Or call ${lead.name} on ${lead.phone}` : undefined,
        }),
        // A table row like every other shell block (a bare <p> rendered above the card)
        signoff: `<tr><td style="padding:0 36px 36px;"><p style="margin:0;font-size:13px;color:#64748b;">Sent by Elec-Mate because your quote page is switched on. Turn it off any time in Employer Hub, Quote page.</p></td></tr>`,
      });
      const r = await sendEmail({
        from: 'Elec-Mate <noreply@elec-mate.com>',
        to: firmTo,
        replyTo: isEmail(lead.email) ? lead.email : undefined,
        subject: `New quote request: ${lead.name}${lead.job_type ? `, ${lead.job_type}` : ''}`,
        html,
        log: { template: 'quote_page_firm_alert', entityId: lead.id, userId: lead.user_id },
      });
      results.firm = r.error ? r.error.message : 'sent';
    } else {
      results.firm = 'no address';
    }

    // ── 2. Customer confirmation ───────────────────────────────────
    if (isEmail(lead.email)) {
      if (await isSuppressed(admin, lead.email)) {
        results.customer = 'suppressed';
      } else {
        // The name is typed by whoever filled the form: keep it to letters so the
        // confirmation can't be used to carry someone else's words or links.
        const first =
          String(lead.name).trim().split(/\s+/)[0].replace(/[^\p{L}'-]/gu, '').slice(0, 20) || 'there';
        const sender = clientFacingSender({
          companyName,
          companyEmail: cp?.company_email ?? null,
          userEmail: ownerEmail,
        });
        const html = renderEmailShell({
          subject: `We have your request, ${first}`,
          preheader: `${companyName} has your quote request and will be in touch.`,
          company,
          greeting: `Hi ${esc(first)},`,
          body: `<p style="margin:0;font-size:16px;color:#334155;line-height:1.6;">Thanks for asking ${esc(companyName)} for a quote. Your request has arrived and the team will be in touch soon.</p>`,
          card:
            renderSteps({
              label: 'What happens next',
              steps: [
                `${companyName} reads your request and any photos`,
                'They call or email you to ask anything they need',
                'You get a clear quote with no obligation',
              ],
              accent: colour,
            }) +
            (factsHtml ? renderCard({ label: 'What you sent', body: factsHtml }) : ''),
          signoff: `<p style="margin:0;font-size:15px;color:#334155;">Thanks,<br/><strong>${esc(companyName)}</strong></p>${
            cp?.company_phone
              ? `<p style="margin:10px 0 0;font-size:14px;color:#64748b;">Need us sooner? Call ${esc(cp.company_phone)}.</p>`
              : ''
          }`,
        });
        const r = await sendEmail({
          from: sender.from,
          replyTo: sender.replyTo,
          to: lead.email,
          subject: `${companyName}: we have your quote request`,
          html,
          log: { template: 'quote_page_customer_confirmation', entityId: lead.id, userId: lead.user_id },
        });
        results.customer = r.error ? r.error.message : 'sent';
      }
    }

    return json({ ok: true, ...results });
  })
);
