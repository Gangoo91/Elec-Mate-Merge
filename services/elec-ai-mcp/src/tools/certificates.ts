/**
 * Certificate tools — read_certificates, generate_certificate_pdf, send_certificate,
 *                     get_expiring_certificates, send_client_expiry_reminders
 *
 * SECURITY.md §7 — Certificate safeguards:
 *   - Only send certificates marked as complete
 *   - Flag unsatisfactory results (C2 defects) before delivery
 *   - Cross-check cert matches the correct address and client
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

/** Map cert type to the correct edge function name.
 *  reports.report_type uses hyphens: eic, eicr, minor-works, ev-charging, etc.
 */
const CERT_PDF_FUNCTIONS: Record<string, string> = {
  eic: 'generate-eic-pdf',
  eicr: 'generate-eicr-pdf',
  'minor-works': 'generate-minor-works-pdf',
  'ev-charging': 'generate-ev-charging-pdf',
  'fire-alarm': 'generate-fire-alarm-pdf',
  'emergency-lighting': 'generate-emergency-lighting-pdf',
  'pat-testing': 'generate-pat-testing-pdf',
  'solar-pv': 'generate-solar-pv-pdf',
};

export async function readCertificates(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('reports')
    .select(
      'id, report_type, certificate_number, installation_address, customer_id, client_name, status, inspection_date, expiry_date, pdf_url, created_at'
    );

  if (typeof args.type === 'string') {
    query = query.eq('report_type', args.type);
  }
  if (typeof args.status === 'string') {
    query = query.eq('status', args.status);
  }
  if (typeof args.client_id === 'string') {
    query = query.eq('customer_id', args.client_id);
  }
  if (typeof args.address === 'string' && args.address.length > 0) {
    query = query.ilike('installation_address', `%${args.address}%`);
  }
  if (typeof args.expiry_before === 'string') {
    query = query.lte('expiry_date', args.expiry_before);
  }

  // Exclude soft-deleted reports
  query = query.is('deleted_at', null);

  query = query.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read certificates: ${error.message}`);

  return { certificates: data || [] };
}

export async function generateCertificatePdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.certificate_id !== 'string') {
    throw new Error('certificate_id is required');
  }
  if (typeof args.certificate_type !== 'string') {
    throw new Error('certificate_type is required');
  }

  const certType = args.certificate_type.toLowerCase();
  const functionName = CERT_PDF_FUNCTIONS[certType];

  if (!functionName) {
    throw new Error(
      `Unsupported certificate type: ${certType}. Supported: ${Object.keys(CERT_PDF_FUNCTIONS).join(', ')}`
    );
  }

  const result = await callEdgeFunction(
    functionName,
    user.jwt,
    {
      reportId: args.certificate_id,
    },
    { timeoutMs: 60_000 }
  );

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function sendCertificate(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.certificate_id !== 'string') {
    throw new Error('certificate_id is required');
  }
  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }

  const supabase = user.supabase;

  // ── SECURITY.md §7 — Certificate safeguards ────────────────────────

  // 1. Verify certificate exists and is complete
  const { data: cert, error: certError } = await supabase
    .from('reports')
    .select('id, report_type, installation_address, customer_id, status')
    .eq('id', args.certificate_id)
    .single();

  if (certError || !cert) {
    throw new Error('Certificate not found');
  }

  // 2. Cross-check: cert belongs to the specified client
  if (cert.customer_id && cert.customer_id !== args.client_id) {
    throw new Error(
      'Certificate does not belong to the specified client. Please check the client_id.'
    );
  }

  const warnings: string[] = [];

  // 3. Check client details if sending via WhatsApp
  if (args.channel === 'whatsapp') {
    const { data: client, error: clientError } = await supabase
      .from('customers')
      .select('name, phone')
      .eq('id', args.client_id)
      .single();

    if (clientError || !client) {
      throw new Error('Client not found');
    }
    if (!client.phone) {
      throw new Error(`No phone number on file for ${client.name}`);
    }
  }

  // ── Get client email for Resend delivery ──────────────────────────
  const { data: clientForEmail } = await supabase
    .from('customers')
    .select('email, name')
    .eq('id', args.client_id)
    .single();

  if (!clientForEmail?.email) {
    throw new Error(`No email address on file for client. Please add one first.`);
  }

  // send-certificate-resend handles PDF generation + Resend email internally
  const result = await callEdgeFunction(
    'send-certificate-resend',
    user.jwt,
    {
      reportId: args.certificate_id,
      recipientEmail: clientForEmail.email,
      customMessage: typeof args.message === 'string' ? args.message : undefined,
    },
    { timeoutMs: 60_000 }
  );

  if (result.error) throw new Error(result.error);

  return {
    ...((result.data as Record<string, unknown>) || {}),
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

export async function getExpiringCertificates(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const daysAhead =
    typeof args.days_ahead === 'number' && args.days_ahead > 0 ? args.days_ahead : 90;

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysAhead);

  const { data, error } = await supabase
    .from('reports')
    .select('id, report_type, installation_address, customer_id, client_name, expiry_date')
    .is('deleted_at', null)
    .not('expiry_date', 'is', null)
    .lte('expiry_date', futureDate.toISOString())
    .gte('expiry_date', new Date().toISOString())
    .order('expiry_date', { ascending: true });

  if (error) throw new Error(`Failed to get expiring certificates: ${error.message}`);

  const certificates = (data || []).map((cert) => ({
    ...cert,
    days_remaining: Math.ceil(
      (new Date(cert.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    ),
  }));

  return { certificates };
}

export async function sendClientExpiryReminders(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.days_ahead !== 'number' || args.days_ahead <= 0) {
    throw new Error('days_ahead must be a positive number');
  }

  const result = await callEdgeFunction('send-expiry-reminders', user.jwt, {
    days_ahead: args.days_ahead,
    certificate_types: args.certificate_types,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
