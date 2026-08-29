import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { renderEmailShell, renderButton } from '../_shared/email-template.ts';

/**
 * Maintenance agreement signing (ELE-430) — one function, three actions:
 *
 *   { action: 'summary', token }             → the agreement facts for the
 *       public signing page. Token IS the capability (unguessable uuid,
 *       unique-indexed); nothing else is exposed.
 *   { action: 'sign', token, name, signature } → stores the drawn signature
 *       (data URL, same convention the quote-acceptance flow has used in
 *       production since ELE-954), stamps who/when, and tells the
 *       electrician. One-shot: an already-signed agreement refuses again.
 *   { action: 'send', contract_id }          → electrician-authed (their JWT
 *       + RLS proves ownership); emails the client a branded invitation with
 *       the signing link and stamps sent_for_signature_at.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SIGNING_ORIGIN = 'https://www.elec-mate.com';

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  six_monthly: 'Every 6 months',
  annually: 'Annually',
  two_yearly: 'Every 2 years',
  three_yearly: 'Every 3 years',
  five_yearly: 'Every 5 years',
  custom: 'Custom schedule',
};

const longDate = (iso: string | null): string =>
  iso
    ? new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const action = body?.action as string;

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // ── Electrician sends the agreement out for signature ──────────────────
    if (action === 'send') {
      const { contract_id } = body;
      if (!contract_id) return json({ error: 'contract_id is required' }, 400);

      // Ownership via the caller's own JWT + RLS — no trust in the body.
      const userScoped = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
      );
      const { data: contract } = await userScoped
        .from('maintenance_contracts')
        .select('*')
        .eq('id', contract_id)
        .maybeSingle();
      if (!contract) return json({ error: 'Contract not found' }, 404);
      if (contract.client_signed_at) return json({ error: 'Already signed' }, 409);

      const { data: customer } = contract.customer_id
        ? await admin
            .from('customers')
            .select('name, email')
            .eq('id', contract.customer_id)
            .maybeSingle()
        : { data: null };
      const to = String(customer?.email || '').trim().toLowerCase();
      if (!to) {
        return json(
          { error: 'No email on the customer record — add one to send for signature.' },
          400
        );
      }

      const { data: company } = await admin
        .from('company_profiles')
        .select(
          'company_name, company_email, company_phone, company_website, company_address, logo_url, logo_data_url, primary_color, vat_number, company_registration'
        )
        .eq('user_id', contract.user_id)
        .maybeSingle();
      const companyName = (company?.company_name as string) || 'Your Electrician';
      const clientFirst =
        String(customer?.name || contract.customer_name || 'there').split(/\s+/)[0] || 'there';

      const signUrl = `${SIGNING_ORIGIN}/agreement/${contract.signing_token}`;
      const cta = renderButton({
        href: signUrl,
        label: 'Review and sign',
        background: (company?.primary_color as string) || '#0f172a',
        microcopy: 'Takes about a minute — sign with your finger or mouse',
      });
      const html = renderEmailShell({
        subject: `Your maintenance agreement with ${companyName}`,
        preheader: `${contract.job_type} · ${FREQUENCY_LABELS[contract.frequency as string] || ''} — review and sign online`,
        company: {
          name: companyName,
          logoUrl: (company?.logo_url as string) || (company?.logo_data_url as string) || null,
          primaryColor: (company?.primary_color as string) || null,
          email: (company?.company_email as string) || null,
          phone: (company?.company_phone as string) || null,
          website: (company?.company_website as string) || null,
          address: (company?.company_address as string) || null,
          vatNumber: (company?.vat_number as string) || null,
          registrationNumber: (company?.company_registration as string) || null,
        },
        greeting: `Hi <strong style="color:#0f172a">${clientFirst}</strong>,`,
        body: `Here's your maintenance agreement with <strong style="color:#0f172a">${companyName}</strong> — <strong style="color:#0f172a">${contract.job_type}</strong>, ${String(FREQUENCY_LABELS[contract.frequency as string] || '').toLowerCase()}. Review the details and sign online; you'll both have it on record from then on.`,
        cta,
      });

      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) return json({ error: 'RESEND_API_KEY not configured' }, 500);
      const resend = new Resend(resendApiKey);
      const sender = clientFacingSender({
        companyName,
        companyEmail: ((company?.company_email as string) || '') || undefined,
      });
      const { error: emailError } = await resend.emails.send({
        ...sender,
        to,
        subject: `Your maintenance agreement with ${companyName}`,
        html,
        text: htmlToPlainText(html),
      });
      if (emailError) return json({ error: `Email failed: ${emailError.message}` }, 502);

      await admin
        .from('maintenance_contracts')
        .update({ sent_for_signature_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('id', contract.id);

      return json({ sent: true, to });
    }

    // ── Public actions, token-addressed ─────────────────────────────────────
    const token = body?.token as string;
    if (!token || !/^[0-9a-f-]{36}$/i.test(token)) {
      return json({ error: 'Invalid link' }, 400);
    }

    const { data: contract } = await admin
      .from('maintenance_contracts')
      .select('*')
      .eq('signing_token', token)
      .maybeSingle();
    if (!contract) return json({ error: 'Agreement not found' }, 404);

    const [{ data: customer }, { data: company }] = await Promise.all([
      contract.customer_id
        ? admin.from('customers').select('name, email, address').eq('id', contract.customer_id).maybeSingle()
        : Promise.resolve({ data: null }),
      admin
        .from('company_profiles')
        .select('company_name, logo_url, logo_data_url, primary_color, company_registration, vat_number, company_address')
        .eq('user_id', contract.user_id)
        .maybeSingle(),
    ]);

    if (action === 'summary') {
      return json({
        company: {
          name: (company?.company_name as string) || 'Your Electrician',
          logo_url: (company?.logo_url as string) || (company?.logo_data_url as string) || null,
          primary_color: (company?.primary_color as string) || null,
          registration_number: (company?.company_registration as string) || null,
          vat_number: (company?.vat_number as string) || null,
        },
        client: {
          name: (customer?.name as string) || (contract.customer_name as string),
          address: (customer?.address as string) || null,
        },
        contract: {
          job_type: contract.job_type,
          description: contract.description,
          frequency_label:
            contract.frequency === 'custom' && contract.frequency_custom_days
              ? `Every ${contract.frequency_custom_days} days`
              : FREQUENCY_LABELS[contract.frequency as string] || contract.frequency,
          start_date: longDate(contract.start_date as string),
          end_date: longDate(contract.end_date as string | null),
          price:
            contract.default_invoice_amount != null
              ? Number(contract.default_invoice_amount).toFixed(2)
              : null,
          vat_applies: !!(company?.vat_number as string),
          client_type: (contract.client_type as string) || 'domestic',
          signed_at: contract.client_signed_at,
          signed_by: contract.client_signed_name,
          status: contract.status,
        },
      });
    }

    if (action === 'sign') {
      const { name, signature } = body;
      if (!name || typeof name !== 'string' || !name.trim()) {
        return json({ error: 'Your name is required' }, 400);
      }
      if (
        !signature ||
        typeof signature !== 'string' ||
        !signature.startsWith('data:image/') ||
        signature.length > 400_000
      ) {
        return json({ error: 'A drawn signature is required' }, 400);
      }
      if (contract.client_signed_at) return json({ error: 'Already signed' }, 409);
      if (contract.status === 'ended') return json({ error: 'This agreement has ended' }, 410);

      const signedAt = new Date().toISOString();
      const { error: signError } = await admin
        .from('maintenance_contracts')
        .update({
          client_signed_at: signedAt,
          client_signed_name: name.trim().slice(0, 120),
          client_signature: signature,
          updated_at: signedAt,
        })
        .eq('id', contract.id)
        .is('client_signed_at', null);
      if (signError) throw signError;

      // Tell the electrician the moment it lands.
      try {
        await admin.from('user_notifications').insert({
          user_id: contract.user_id,
          type: 'agreement_signed',
          title: `Agreement signed — ${contract.customer_name}`,
          message: `${name.trim()} signed the ${contract.job_type} maintenance agreement.`,
          link: '/electrician/renewals',
          metadata: { contract_id: contract.id },
        });
      } catch {
        /* non-critical */
      }

      return json({ signed: true, signed_at: signedAt });
    }

    return json({ error: 'Unknown action' }, 400);
  } catch (error) {
    console.error('maintenance-agreement error:', error);
    await captureException(error, {
      functionName: 'maintenance-agreement',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'Internal error' }, 500);
  }
});
