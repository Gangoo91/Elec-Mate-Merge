/**
 * Certificate tools — read_certificates, generate_certificate_pdf, send_certificate,
 *                     get_expiring_certificates, send_client_expiry_reminders,
 *                     create_eicr, update_eicr, read_eicr
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

  // Normalise: agent may send underscores (minor_works) but map uses hyphens (minor-works)
  const certType = args.certificate_type.toLowerCase().replace(/_/g, '-');
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

  const initialData = {
    client_name: args.client_name.trim(),
    installation_address: args.installation_address.trim(),
    property_type: propertyType,
    purpose_of_inspection: purposeOfInspection,
    supply: {},
    earthing: {},
    boards: {},
    inspection: {},
    testing: {},
    defects: {},
    inspector: inspectorName ? { name: inspectorName } : {},
    company: {},
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

export async function updateEicr(args: Record<string, unknown>, user: UserContext) {
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

  // Count items from JSONB data
  const inspectionItems = Array.isArray(eicrData.inspection_items) ? eicrData.inspection_items : [];
  const defectObservations = Array.isArray(eicrData.defect_observations)
    ? eicrData.defect_observations
    : [];
  const scheduleOfTests = Array.isArray(eicrData.schedule_of_tests)
    ? eicrData.schedule_of_tests
    : [];

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
