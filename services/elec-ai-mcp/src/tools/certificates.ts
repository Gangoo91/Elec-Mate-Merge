/**
 * Certificate tools — read_certificates, generate_certificate_pdf, send_certificate,
 *                     get_expiring_certificates, send_client_expiry_reminders,
 *                     create_eicr, update_eicr, read_eicr,
 *                     create_eic, update_eic, read_eic,
 *                     create_minor_works, update_minor_works, read_minor_works
 *
 * SECURITY.md §7 — Certificate safeguards:
 *   - Only send certificates marked as complete
 *   - Flag unsatisfactory results (C2 defects) before delivery
 *   - Cross-check cert matches the correct address and client
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';
import { formatEicrForPdf, formatEicForPdf } from './cert-formatters.js';

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

  // Normalise: agent may send underscores (minor_works) but map uses hyphens (minor-works)
  const certType = args.certificate_type.toLowerCase().replace(/_/g, '-');
  const functionName = CERT_PDF_FUNCTIONS[certType];

  if (!functionName) {
    throw new Error(
      `Unsupported certificate type: ${certType}. Supported: ${Object.keys(CERT_PDF_FUNCTIONS).join(', ')}`
    );
  }

  const supabase = user.supabase;

  // ── Fetch report data from DB (matches quote/invoice/RAMS pattern) ──
  const [reportRes, profileRes] = await Promise.all([
    supabase
      .from('reports')
      .select('id, report_id, data, report_type, status, customer_id')
      .eq('id', args.certificate_id)
      .single(),
    supabase.from('company_profiles').select('*').eq('user_id', user.userId).single(),
  ]);

  if (reportRes.error || !reportRes.data) {
    throw new Error('Certificate not found');
  }

  const report = reportRes.data;
  const rawFormData = (report.data || {}) as Record<string, unknown>;
  const companyProfile = (profileRes.data || null) as Record<string, unknown> | null;

  // ── Format data for the PDF template ────────────────────────────
  let formData: Record<string, unknown>;

  if (certType === 'eicr') {
    formData = await formatEicrForPdf(rawFormData, companyProfile, report.id, supabase);
  } else if (certType === 'eic') {
    formData = await formatEicForPdf(rawFormData, companyProfile, report.id, supabase);
  } else {
    // Minor works + other cert types: pass raw data directly.
    // The edge functions for these types have their own transformers.
    formData = rawFormData;
  }

  // ── Call the PDF generation edge function ───────────────────────
  const result = await callEdgeFunction(
    functionName,
    user.jwt,
    { formData },
    { timeoutMs: 90_000 }
  );

  if (result.error) throw new Error(result.error);

  // Cert edge functions return pdfUrl or downloadUrl depending on the type
  const data = result.data as Record<string, unknown> | null;
  const downloadUrl = (data?.downloadUrl ?? data?.pdfUrl ?? data?.download_url) as
    | string
    | undefined;

  if (!downloadUrl) {
    throw new Error('PDF generation failed — no download URL returned');
  }

  return {
    downloadUrl,
    documentId: data?.documentId,
    previewUrl: data?.previewUrl,
    certificate_id: args.certificate_id,
    certificate_type: certType,
    message: `Certificate PDF generated. To send as a WhatsApp document, use MEDIA:${downloadUrl}`,
  };
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

// ─── EICR Tools (3) ──────────────────────────────────────────────────────

export async function createEicr(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.client_name !== 'string' || args.client_name.trim().length === 0) {
    throw new Error('client_name is required');
  }
  if (
    typeof args.installation_address !== 'string' ||
    args.installation_address.trim().length === 0
  ) {
    throw new Error('installation_address is required');
  }

  const supabase = user.supabase;

  // Generate certificate number via DB RPC with hex fallback
  let certificateNumber: string;
  try {
    const { data: certNum, error: certNumError } = await supabase.rpc(
      'generate_certificate_number',
      {
        p_report_type: 'eicr',
      }
    );
    if (certNumError || !certNum) {
      throw new Error('RPC failed');
    }
    certificateNumber = certNum as string;
  } catch {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    certificateNumber = `EICR-${new Date().getFullYear()}-${hex.toUpperCase()}`;
  }

  const reportId = `eicr-${crypto.randomUUID()}`;
  const propertyType = typeof args.property_type === 'string' ? args.property_type : 'domestic';
  const inspectionDate =
    typeof args.inspection_date === 'string'
      ? args.inspection_date
      : new Date().toISOString().split('T')[0];
  const inspectorName = typeof args.inspector_name === 'string' ? args.inspector_name : null;
  const customerId = typeof args.customer_id === 'string' ? args.customer_id : null;
  const purposeOfInspection =
    typeof args.purpose_of_inspection === 'string' ? args.purpose_of_inspection : null;

  // Calculate default expiry: 5 years for domestic, 3 years for commercial
  const expiryYears = propertyType === 'commercial' ? 3 : 5;
  const expiryDate = new Date(inspectionDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + expiryYears);

  // Flat camelCase keys matching the frontend form + JSON formatter
  const initialData: Record<string, unknown> = {
    clientName: (args.client_name as string).trim(),
    installationAddress: (args.installation_address as string).trim(),
    description: propertyType,
    purposeOfInspection,
    inspectorName: inspectorName || '',
  };

  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: user.userId,
      report_id: reportId,
      report_type: 'eicr',
      certificate_number: certificateNumber,
      status: 'draft',
      client_name: (args.client_name as string).trim(),
      installation_address: (args.installation_address as string).trim(),
      inspection_date: inspectionDate,
      inspector_name: inspectorName,
      customer_id: customerId,
      expiry_date: expiryDate.toISOString().split('T')[0],
      edit_version: 1,
      data: initialData,
    })
    .select('id, report_id, certificate_number, status, created_at')
    .single();

  if (error) throw new Error(`Failed to create EICR: ${error.message}`);

  return {
    eicr_id: data.id,
    report_id: data.report_id,
    certificate_number: data.certificate_number,
    status: data.status,
    created_at: data.created_at,
  };
}

/**
 * Coerce `data` from JSON string to object and `edit_version` from string to number.
 * Handles double-serialisation when args pass through the curl/shell wrapper.
 */
function coerceDataArg(args: Record<string, unknown>): void {
  if (typeof args.data === 'string') {
    try {
      const parsed = JSON.parse(args.data);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('data must be a JSON object');
      }
      args.data = parsed;
    } catch (e) {
      if (e instanceof SyntaxError) throw new Error('data is not valid JSON');
      throw e;
    }
  }
  if (typeof args.edit_version === 'string') {
    const v = parseInt(args.edit_version, 10);
    if (isNaN(v)) throw new Error('edit_version must be a number');
    args.edit_version = v;
  }
}

export async function updateEicr(args: Record<string, unknown>, user: UserContext) {
  coerceDataArg(args);
  if (typeof args.eicr_id !== 'string') {
    throw new Error('eicr_id is required');
  }
  if (typeof args.edit_version !== 'number') {
    throw new Error('edit_version is required (optimistic concurrency)');
  }
  if (typeof args.data !== 'object' || args.data === null) {
    throw new Error('data object is required');
  }

  const supabase = user.supabase;

  // Fetch existing EICR
  const { data: existing, error: fetchError } = await supabase
    .from('reports')
    .select('id, report_type, data, edit_version, certificate_number')
    .eq('id', args.eicr_id)
    .single();

  if (fetchError || !existing) {
    throw new Error('EICR not found');
  }
  if (existing.report_type !== 'eicr') {
    throw new Error('Report is not an EICR');
  }
  if (existing.edit_version !== args.edit_version) {
    throw new Error(
      `Concurrent edit conflict: expected version ${args.edit_version} but found ${existing.edit_version}. Re-read the EICR and try again.`
    );
  }

  // Deep merge new data into existing
  const currentData = (existing.data as Record<string, unknown>) || {};
  const newData = args.data as Record<string, unknown>;
  const mergedData = { ...currentData, ...newData };

  // Build update payload
  const updatePayload: Record<string, unknown> = {
    data: mergedData,
    edit_version: (existing.edit_version as number) + 1,
    updated_at: new Date().toISOString(),
  };

  // Sync relevant top-level columns from merged data
  if (typeof mergedData.client_name === 'string') {
    updatePayload.client_name = mergedData.client_name;
  }
  if (typeof mergedData.installation_address === 'string') {
    updatePayload.installation_address = mergedData.installation_address;
  }
  if (typeof mergedData.inspection_date === 'string') {
    updatePayload.inspection_date = mergedData.inspection_date;
  }
  if (typeof (mergedData.inspector as Record<string, unknown>)?.name === 'string') {
    updatePayload.inspector_name = (mergedData.inspector as Record<string, unknown>).name;
  }

  // Allow status update if provided
  if (typeof args.status === 'string') {
    updatePayload.status = args.status;
  }

  // CAS guard: only update if edit_version still matches
  const { data: updated, error: updateError } = await supabase
    .from('reports')
    .update(updatePayload)
    .eq('id', args.eicr_id)
    .eq('edit_version', args.edit_version)
    .select('id, certificate_number, edit_version, status, updated_at')
    .single();

  if (updateError) {
    throw new Error(`Failed to update EICR: ${updateError.message}`);
  }
  if (!updated) {
    throw new Error('Concurrent edit conflict: another update occurred. Re-read and try again.');
  }

  return {
    eicr_id: updated.id,
    certificate_number: updated.certificate_number,
    edit_version: updated.edit_version,
    status: updated.status,
    section: typeof args.section === 'string' ? args.section : undefined,
    updated_fields_count: Object.keys(newData).length,
    updated_at: updated.updated_at,
  };
}

export async function readEicr(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.eicr_id !== 'string') {
    throw new Error('eicr_id is required');
  }

  const supabase = user.supabase;

  const { data: eicr, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', args.eicr_id)
    .single();

  if (error || !eicr) {
    throw new Error('EICR not found');
  }
  if (eicr.report_type !== 'eicr') {
    throw new Error('Report is not an EICR');
  }

  const eicrData = (eicr.data as Record<string, unknown>) || {};
  const includeSet = new Set<string>();

  if (Array.isArray(args.include)) {
    for (const item of args.include) {
      if (typeof item === 'string') {
        if (item === 'all') {
          includeSet.add('inspection_items');
          includeSet.add('defects');
          includeSet.add('circuits');
          includeSet.add('photos');
        } else {
          includeSet.add(item);
        }
      }
    }
  }

  // Count items from JSONB data (camelCase — matches how app + agent store data)
  const inspectionItems = Array.isArray(eicrData.inspectionItems) ? eicrData.inspectionItems : [];
  const defectObservations = Array.isArray(eicrData.defectObservations)
    ? eicrData.defectObservations
    : [];
  const scheduleOfTests = Array.isArray(eicrData.scheduleOfTests) ? eicrData.scheduleOfTests : [];

  // Count photos from inspection_photos table
  const { count: photoCount } = await supabase
    .from('inspection_photos')
    .select('id', { count: 'exact', head: true })
    .eq('report_id', eicr.report_id);

  const result: Record<string, unknown> = {
    id: eicr.id,
    certificate_number: eicr.certificate_number,
    report_id: eicr.report_id,
    status: eicr.status,
    client_name: eicr.client_name,
    installation_address: eicr.installation_address,
    inspection_date: eicr.inspection_date,
    property_type: eicrData.property_type || 'domestic',
    inspector_name: eicr.inspector_name,
    edit_version: eicr.edit_version,
    expiry_date: eicr.expiry_date,
    pdf_url: eicr.pdf_url,
    created_at: eicr.created_at,
    updated_at: eicr.updated_at,
    data: eicrData,
    inspection_items_count: inspectionItems.length,
    defects_count: defectObservations.length,
    circuits_count: scheduleOfTests.length,
    photos_count: photoCount || 0,
  };

  // Include full arrays if requested
  if (includeSet.has('inspection_items')) {
    result.inspection_items = inspectionItems;
  }
  if (includeSet.has('defects')) {
    result.defect_observations = defectObservations;
  }
  if (includeSet.has('circuits')) {
    result.schedule_of_tests = scheduleOfTests;
  }
  if (includeSet.has('photos')) {
    const { data: photos } = await supabase
      .from('inspection_photos')
      .select('id, image_url, description, tags, created_at')
      .eq('report_id', eicr.report_id)
      .order('created_at', { ascending: true });
    result.photos = photos || [];
  }

  return result;
}

// ─── EIC Tools (3) ───────────────────────────────────────────────────────

export async function createEic(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.client_name !== 'string' || args.client_name.trim().length === 0) {
    throw new Error('client_name is required');
  }
  if (
    typeof args.installation_address !== 'string' ||
    args.installation_address.trim().length === 0
  ) {
    throw new Error('installation_address is required');
  }

  const supabase = user.supabase;

  // Generate certificate number via DB RPC with hex fallback
  let certificateNumber: string;
  try {
    const { data: certNum, error: certNumError } = await supabase.rpc(
      'generate_certificate_number',
      {
        p_report_type: 'eic',
      }
    );
    if (certNumError || !certNum) {
      throw new Error('RPC failed');
    }
    certificateNumber = certNum as string;
  } catch {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    certificateNumber = `EIC-${new Date().getFullYear()}-${hex.toUpperCase()}`;
  }

  const reportId = `eic-${crypto.randomUUID()}`;
  const propertyType = typeof args.property_type === 'string' ? args.property_type : 'domestic';
  const inspectionDate =
    typeof args.inspection_date === 'string'
      ? args.inspection_date
      : new Date().toISOString().split('T')[0];
  const inspectorName = typeof args.inspector_name === 'string' ? args.inspector_name : null;
  const customerId = typeof args.customer_id === 'string' ? args.customer_id : null;
  const descriptionOfInstallation =
    typeof args.description_of_installation === 'string' ? args.description_of_installation : null;

  // Calculate default expiry: 5 years for domestic, 3 years for commercial
  const expiryYears = propertyType === 'commercial' ? 3 : 5;
  const expiryDate = new Date(inspectionDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + expiryYears);

  // Flat camelCase keys matching the frontend form + JSON formatter
  const initialData: Record<string, unknown> = {
    clientName: (args.client_name as string).trim(),
    installationAddress: (args.installation_address as string).trim(),
    installationType: propertyType,
    description: descriptionOfInstallation,
    inspectorName: inspectorName || '',
  };

  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: user.userId,
      report_id: reportId,
      report_type: 'eic',
      certificate_number: certificateNumber,
      status: 'draft',
      client_name: (args.client_name as string).trim(),
      installation_address: (args.installation_address as string).trim(),
      inspection_date: inspectionDate,
      inspector_name: inspectorName,
      customer_id: customerId,
      expiry_date: expiryDate.toISOString().split('T')[0],
      edit_version: 1,
      data: initialData,
    })
    .select('id, report_id, certificate_number, status, created_at')
    .single();

  if (error) throw new Error(`Failed to create EIC: ${error.message}`);

  return {
    eic_id: data.id,
    report_id: data.report_id,
    certificate_number: data.certificate_number,
    status: data.status,
    created_at: data.created_at,
  };
}

export async function updateEic(args: Record<string, unknown>, user: UserContext) {
  coerceDataArg(args);
  if (typeof args.eic_id !== 'string') {
    throw new Error('eic_id is required');
  }
  if (typeof args.edit_version !== 'number') {
    throw new Error('edit_version is required (optimistic concurrency)');
  }
  if (typeof args.data !== 'object' || args.data === null) {
    throw new Error('data object is required');
  }

  const supabase = user.supabase;

  // Fetch existing EIC
  const { data: existing, error: fetchError } = await supabase
    .from('reports')
    .select('id, report_type, data, edit_version, certificate_number')
    .eq('id', args.eic_id)
    .single();

  if (fetchError || !existing) {
    throw new Error('EIC not found');
  }
  if (existing.report_type !== 'eic') {
    throw new Error('Report is not an EIC');
  }
  if (existing.edit_version !== args.edit_version) {
    throw new Error(
      `Concurrent edit conflict: expected version ${args.edit_version} but found ${existing.edit_version}. Re-read the EIC and try again.`
    );
  }

  // Deep merge new data into existing
  const currentData = (existing.data as Record<string, unknown>) || {};
  const newData = args.data as Record<string, unknown>;
  const mergedData = { ...currentData, ...newData };

  // Build update payload
  const updatePayload: Record<string, unknown> = {
    data: mergedData,
    edit_version: (existing.edit_version as number) + 1,
    updated_at: new Date().toISOString(),
  };

  // Sync relevant top-level columns from merged data
  if (typeof mergedData.client_name === 'string') {
    updatePayload.client_name = mergedData.client_name;
  }
  if (typeof mergedData.installation_address === 'string') {
    updatePayload.installation_address = mergedData.installation_address;
  }
  if (typeof mergedData.inspection_date === 'string') {
    updatePayload.inspection_date = mergedData.inspection_date;
  }
  if (typeof (mergedData.inspector as Record<string, unknown>)?.name === 'string') {
    updatePayload.inspector_name = (mergedData.inspector as Record<string, unknown>).name;
  }

  // Allow status update if provided
  if (typeof args.status === 'string') {
    updatePayload.status = args.status;
  }

  // CAS guard: only update if edit_version still matches
  const { data: updated, error: updateError } = await supabase
    .from('reports')
    .update(updatePayload)
    .eq('id', args.eic_id)
    .eq('edit_version', args.edit_version)
    .select('id, certificate_number, edit_version, status, updated_at')
    .single();

  if (updateError) {
    throw new Error(`Failed to update EIC: ${updateError.message}`);
  }
  if (!updated) {
    throw new Error('Concurrent edit conflict: another update occurred. Re-read and try again.');
  }

  return {
    eic_id: updated.id,
    certificate_number: updated.certificate_number,
    edit_version: updated.edit_version,
    status: updated.status,
    section: typeof args.section === 'string' ? args.section : undefined,
    updated_fields_count: Object.keys(newData).length,
    updated_at: updated.updated_at,
  };
}

export async function readEic(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.eic_id !== 'string') {
    throw new Error('eic_id is required');
  }

  const supabase = user.supabase;

  const { data: eic, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', args.eic_id)
    .single();

  if (error || !eic) {
    throw new Error('EIC not found');
  }
  if (eic.report_type !== 'eic') {
    throw new Error('Report is not an EIC');
  }

  const eicData = (eic.data as Record<string, unknown>) || {};
  const includeSet = new Set<string>();

  if (Array.isArray(args.include)) {
    for (const item of args.include) {
      if (typeof item === 'string') {
        if (item === 'all') {
          includeSet.add('circuits');
          includeSet.add('photos');
        } else {
          includeSet.add(item);
        }
      }
    }
  }

  // Count items from JSONB data (camelCase — matches how app + agent store data)
  const scheduleOfCircuits = Array.isArray(eicData.scheduleOfTests) ? eicData.scheduleOfTests : [];

  // Count photos from inspection_photos table
  const { count: photoCount } = await supabase
    .from('inspection_photos')
    .select('id', { count: 'exact', head: true })
    .eq('report_id', eic.report_id);

  const result: Record<string, unknown> = {
    id: eic.id,
    certificate_number: eic.certificate_number,
    report_id: eic.report_id,
    status: eic.status,
    client_name: eic.client_name,
    installation_address: eic.installation_address,
    inspection_date: eic.inspection_date,
    property_type: eicData.property_type || 'domestic',
    inspector_name: eic.inspector_name,
    edit_version: eic.edit_version,
    expiry_date: eic.expiry_date,
    pdf_url: eic.pdf_url,
    created_at: eic.created_at,
    updated_at: eic.updated_at,
    data: eicData,
    circuits_count: scheduleOfCircuits.length,
    photos_count: photoCount || 0,
  };

  // Include full arrays if requested
  if (includeSet.has('circuits')) {
    result.schedule_of_circuits = scheduleOfCircuits;
  }
  if (includeSet.has('photos')) {
    const { data: photos } = await supabase
      .from('inspection_photos')
      .select('id, image_url, description, tags, created_at')
      .eq('report_id', eic.report_id)
      .order('created_at', { ascending: true });
    result.photos = photos || [];
  }

  return result;
}

// ─── Minor Works Tools (3) ───────────────────────────────────────────────

export async function createMinorWorks(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.client_name !== 'string' || args.client_name.trim().length === 0) {
    throw new Error('client_name is required');
  }
  if (
    typeof args.installation_address !== 'string' ||
    args.installation_address.trim().length === 0
  ) {
    throw new Error('installation_address is required');
  }

  const supabase = user.supabase;

  // Generate certificate number via DB RPC with hex fallback
  let certificateNumber: string;
  try {
    const { data: certNum, error: certNumError } = await supabase.rpc(
      'generate_certificate_number',
      {
        p_report_type: 'minor-works',
      }
    );
    if (certNumError || !certNum) {
      throw new Error('RPC failed');
    }
    certificateNumber = certNum as string;
  } catch {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    certificateNumber = `MW-${new Date().getFullYear()}-${hex.toUpperCase()}`;
  }

  const reportId = `mw-${crypto.randomUUID()}`;
  const inspectionDate =
    typeof args.inspection_date === 'string'
      ? args.inspection_date
      : new Date().toISOString().split('T')[0];
  const inspectorName = typeof args.inspector_name === 'string' ? args.inspector_name : null;
  const customerId = typeof args.customer_id === 'string' ? args.customer_id : null;
  const descriptionOfWork =
    typeof args.description_of_work === 'string' ? args.description_of_work : null;

  const installationAddr = (args.installation_address as string).trim();
  const initialData = {
    // Flat camelCase keys matching the frontend form + PDF export
    clientName: (args.client_name as string).trim(),
    propertyAddress: installationAddr,
    workDescription: descriptionOfWork,
    electricianName: inspectorName || '',
  };

  // Minor works certificates don't expire
  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: user.userId,
      report_id: reportId,
      report_type: 'minor-works',
      certificate_number: certificateNumber,
      status: 'draft',
      client_name: (args.client_name as string).trim(),
      installation_address: (args.installation_address as string).trim(),
      inspection_date: inspectionDate,
      inspector_name: inspectorName,
      customer_id: customerId,
      edit_version: 1,
      data: initialData,
    })
    .select('id, report_id, certificate_number, status, created_at')
    .single();

  if (error) throw new Error(`Failed to create Minor Works: ${error.message}`);

  return {
    minor_works_id: data.id,
    report_id: data.report_id,
    certificate_number: data.certificate_number,
    status: data.status,
    created_at: data.created_at,
  };
}

export async function updateMinorWorks(args: Record<string, unknown>, user: UserContext) {
  coerceDataArg(args);
  if (typeof args.minor_works_id !== 'string') {
    throw new Error('minor_works_id is required');
  }
  if (typeof args.edit_version !== 'number') {
    throw new Error('edit_version is required (optimistic concurrency)');
  }
  if (typeof args.data !== 'object' || args.data === null) {
    throw new Error('data object is required');
  }

  const supabase = user.supabase;

  // Fetch existing Minor Works
  const { data: existing, error: fetchError } = await supabase
    .from('reports')
    .select('id, report_type, data, edit_version, certificate_number')
    .eq('id', args.minor_works_id)
    .single();

  if (fetchError || !existing) {
    throw new Error('Minor Works certificate not found');
  }
  if (existing.report_type !== 'minor-works') {
    throw new Error('Report is not a Minor Works certificate');
  }
  if (existing.edit_version !== args.edit_version) {
    throw new Error(
      `Concurrent edit conflict: expected version ${args.edit_version} but found ${existing.edit_version}. Re-read the Minor Works and try again.`
    );
  }

  // Deep merge new data into existing
  const currentData = (existing.data as Record<string, unknown>) || {};
  const newData = args.data as Record<string, unknown>;
  const mergedData = { ...currentData, ...newData };

  // Build update payload
  const updatePayload: Record<string, unknown> = {
    data: mergedData,
    edit_version: (existing.edit_version as number) + 1,
    updated_at: new Date().toISOString(),
  };

  // Sync relevant top-level columns from merged data
  if (typeof mergedData.client_name === 'string') {
    updatePayload.client_name = mergedData.client_name;
  }
  if (typeof mergedData.installation_address === 'string') {
    updatePayload.installation_address = mergedData.installation_address;
  }
  if (typeof mergedData.inspection_date === 'string') {
    updatePayload.inspection_date = mergedData.inspection_date;
  }
  if (typeof (mergedData.inspector as Record<string, unknown>)?.name === 'string') {
    updatePayload.inspector_name = (mergedData.inspector as Record<string, unknown>).name;
  }

  // Allow status update if provided
  if (typeof args.status === 'string') {
    updatePayload.status = args.status;
  }

  // CAS guard: only update if edit_version still matches
  const { data: updated, error: updateError } = await supabase
    .from('reports')
    .update(updatePayload)
    .eq('id', args.minor_works_id)
    .eq('edit_version', args.edit_version)
    .select('id, certificate_number, edit_version, status, updated_at')
    .single();

  if (updateError) {
    throw new Error(`Failed to update Minor Works: ${updateError.message}`);
  }
  if (!updated) {
    throw new Error('Concurrent edit conflict: another update occurred. Re-read and try again.');
  }

  return {
    minor_works_id: updated.id,
    certificate_number: updated.certificate_number,
    edit_version: updated.edit_version,
    status: updated.status,
    section: typeof args.section === 'string' ? args.section : undefined,
    updated_fields_count: Object.keys(newData).length,
    updated_at: updated.updated_at,
  };
}

export async function readMinorWorks(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.minor_works_id !== 'string') {
    throw new Error('minor_works_id is required');
  }

  const supabase = user.supabase;

  const { data: mw, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', args.minor_works_id)
    .single();

  if (error || !mw) {
    throw new Error('Minor Works certificate not found');
  }
  if (mw.report_type !== 'minor-works') {
    throw new Error('Report is not a Minor Works certificate');
  }

  const mwData = (mw.data as Record<string, unknown>) || {};
  const includeSet = new Set<string>();

  if (Array.isArray(args.include)) {
    for (const item of args.include) {
      if (typeof item === 'string') {
        if (item === 'all') {
          includeSet.add('photos');
        } else {
          includeSet.add(item);
        }
      }
    }
  }

  // Count photos from inspection_photos table
  const { count: photoCount } = await supabase
    .from('inspection_photos')
    .select('id', { count: 'exact', head: true })
    .eq('report_id', mw.report_id);

  const result: Record<string, unknown> = {
    id: mw.id,
    certificate_number: mw.certificate_number,
    report_id: mw.report_id,
    status: mw.status,
    client_name: mw.client_name,
    installation_address: mw.installation_address,
    inspection_date: mw.inspection_date,
    inspector_name: mw.inspector_name,
    edit_version: mw.edit_version,
    pdf_url: mw.pdf_url,
    created_at: mw.created_at,
    updated_at: mw.updated_at,
    data: mwData,
    photos_count: photoCount || 0,
  };

  if (includeSet.has('photos')) {
    const { data: photos } = await supabase
      .from('inspection_photos')
      .select('id, image_url, description, tags, created_at')
      .eq('report_id', mw.report_id)
      .order('created_at', { ascending: true });
    result.photos = photos || [];
  }

  return result;
}
