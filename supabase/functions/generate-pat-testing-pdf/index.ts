import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { captureException } from '../_shared/sentry.ts';

const PDFMONKEY_API_KEY = Deno.env.get('PDFMONKEY_API_KEY');
const TEMPLATE_ID = '9B374EDE-A879-4470-A507-4FBA2F7DA7A6';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface PDFMonkeyDocument {
  id: string;
  status: string;
  download_url?: string;
  preview_url?: string;
  errors?: string[];
}

async function createPDFMonkeyDocument(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any,
  templateId?: string
): Promise<PDFMonkeyDocument> {
  const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      document: {
        document_template_id: templateId || TEMPLATE_ID,
        payload: formData,
        status: 'pending',
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PDF Monkey create error:', errorText);
    throw new Error(`Failed to create PDF document: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.document;
}

async function getPDFMonkeyDocument(documentId: string): Promise<PDFMonkeyDocument> {
  const response = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${PDFMONKEY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PDF Monkey fetch error:', errorText);
    throw new Error(`Failed to fetch PDF document: ${response.status}`);
  }

  const data = await response.json();
  return data.document;
}

async function waitForPDFGeneration(
  documentId: string,
  maxAttempts = 30
): Promise<PDFMonkeyDocument> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const document = await getPDFMonkeyDocument(documentId);

    console.log(`[Attempt ${attempt + 1}] Document status: ${document.status}`);

    if (document.status === 'success') {
      return document;
    }

    if (document.status === 'failure') {
      throw new Error(`PDF generation failed: ${document.errors?.join(', ') || 'Unknown error'}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error('PDF generation timed out');
}

/**
 * Server-side formatter for raw (camelCase) form data.
 * Used when the email flow sends report.data directly without client-side formatting.
 * Detects raw data by checking for camelCase keys (e.g. clientName) vs formatted keys (e.g. client_details).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatRawFormData(raw: any): any {
  const resultCode = (val: string): string => {
    if (val === 'pass') return 'P';
    if (val === 'fail') return 'F';
    if (val === 'na') return 'N/A';
    return '';
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appliances = (raw.appliances || []).map((app: any, index: number) => ({
    asset_number: app.assetNumber || '',
    description: app.description || '',
    make: app.make || '',
    model: app.model || '',
    serial_number: app.serialNumber || '',
    location: app.location || '',
    appliance_class: app.applianceClass || 'I',
    category: app.category || 'portable',
    visual: {
      flex: resultCode(app.visualInspection?.flexCondition || ''),
      plug: resultCode(app.visualInspection?.plugCondition || ''),
      fuse: app.visualInspection?.fuseRating || '',
      case: resultCode(app.visualInspection?.enclosureCondition || ''),
      switch: resultCode(app.visualInspection?.switchesControls || ''),
      env: resultCode(app.visualInspection?.suitableForEnvironment || ''),
    },
    electrical: {
      earth: app.electricalTests?.earthContinuity?.reading || '',
      earth_result: resultCode(app.electricalTests?.earthContinuity?.result || ''),
      insulation: app.electricalTests?.insulationResistance?.reading || '',
      insulation_result: resultCode(app.electricalTests?.insulationResistance?.result || ''),
      load: app.electricalTests?.loadTest?.reading || '',
      load_result: resultCode(app.electricalTests?.loadTest?.result || ''),
      leakage: app.electricalTests?.leakageCurrent?.reading || '',
      leakage_result: resultCode(app.electricalTests?.leakageCurrent?.result || ''),
      polarity: resultCode(app.electricalTests?.polarity || ''),
      functional: resultCode(app.electricalTests?.functionalCheck || ''),
    },
    visual_notes: app.visualInspection?.notes || '',
    overall_result: app.overallResult || '',
    repair_code: app.repairCode || '',
    next_test_due: app.nextTestDue || '',
    notes: app.notes || '',
    test_date: app.testDate || '',
    tested_by: app.testedBy || '',
    has_photos: (app.photos || []).length > 0,
    photo_count: (app.photos || []).length,
    first_photo: (app.photos || [])[0] || '',
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalTested = appliances.filter((a: any) => a.overall_result !== '').length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPassed = appliances.filter((a: any) => a.overall_result === 'pass').length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalFailed = appliances.filter((a: any) => a.overall_result === 'fail').length;
  const passRate = totalTested > 0 ? Math.round((totalPassed / totalTested) * 100) : 0;

  const failedAppliances = appliances
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((a: any) => a.overall_result === 'fail')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((a: any) => ({
      asset_number: a.asset_number,
      description: a.description,
      make: a.make,
      model: a.model,
      serial_number: a.serial_number,
      location: a.location,
      repair_code: a.repair_code || '',
      repair_code_label: '',
      failure_reasons: '',
      notes: a.notes || '',
      visual_notes: a.visual_notes || '',
      photos: [],
      has_photos: false,
    }));

  return {
    metadata: {
      certificate_number: raw.certificateNumber || `PAT-${Date.now()}`,
      test_date: raw.testDate || '',
      report_reference: raw.reportReference || '',
      standard: 'IET Code of Practice (5th Edition)',
    },
    client_details: {
      client_name: raw.clientName || '',
      client_address: raw.clientAddress || '',
      client_phone: raw.clientTelephone || '',
      client_email: raw.clientEmail || '',
      contact_person: raw.contactPerson || '',
    },
    site_details: {
      site_name: raw.siteName || '',
      site_address: raw.siteAddress || '',
      site_contact_name: raw.siteContactName || '',
      site_contact_phone: raw.siteContactPhone || '',
    },
    test_equipment: {
      make: raw.testEquipment?.make || '',
      model: raw.testEquipment?.model || '',
      serial_number: raw.testEquipment?.serialNumber || '',
      last_calibration: raw.testEquipment?.lastCalibrationDate || '',
      next_calibration: raw.testEquipment?.nextCalibrationDue || '',
    },
    appliances,
    summary: {
      total_tested: totalTested,
      total_passed: totalPassed,
      total_failed: totalFailed,
      pass_rate: passRate,
    },
    failed_appliances: failedAppliances,
    recommendations: raw.recommendations || '',
    retest_interval: raw.suggestedRetestInterval || '12',
    next_test_due: raw.nextTestDue || '',
    additional_notes: raw.additionalNotes || '',
    declarations: {
      tester: {
        name: raw.testerName || '',
        company: raw.testerCompany || '',
        qualifications: raw.testerQualifications || '',
        signature: raw.testerSignature || '',
        date: raw.testerDate || '',
      },
    },
    has_photos: false,
    appliance_photos: [],
    company_logo: '',
    company_name: raw.testerCompany || '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_tagline: '',
    company_accent_color: '#22c55e',
    registration_scheme: '',
    registration_number: '',
    registration_scheme_logo: '',
  };
}

/**
 * Detect if data is already formatted (has metadata/client_details)
 * or raw (has clientName/siteAddress)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRawFormData(data: any): boolean {
  return (
    !data.metadata &&
    (data.clientName !== undefined || data.appliances?.[0]?.assetNumber !== undefined)
  );
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!PDFMONKEY_API_KEY) {
      throw new Error('PDFMONKEY_API_KEY environment variable is not set');
    }

    const { formData: rawFormData, templateId } = await req.json();

    if (!rawFormData) {
      throw new Error('No form data provided');
    }

    // Auto-format raw data (from email flow) or use pre-formatted data (from app)
    const formData = isRawFormData(rawFormData) ? formatRawFormData(rawFormData) : rawFormData;

    console.log('[generate-pat-testing-pdf] Creating PDF document');
    console.log('[generate-pat-testing-pdf] Data was raw:', isRawFormData(rawFormData));
    console.log('[generate-pat-testing-pdf] Form data keys:', Object.keys(formData));

    // Log key sections for debugging
    console.log(
      '[generate-pat-testing-pdf] Client details:',
      JSON.stringify(formData.client_details, null, 2)
    );
    console.log(
      '[generate-pat-testing-pdf] Site details:',
      JSON.stringify(formData.site_details, null, 2)
    );
    console.log(
      '[generate-pat-testing-pdf] Test equipment:',
      JSON.stringify(formData.test_equipment, null, 2)
    );
    console.log('[generate-pat-testing-pdf] Summary:', JSON.stringify(formData.summary, null, 2));
    console.log('[generate-pat-testing-pdf] Appliances count:', formData.appliances?.length || 0);

    // Create the document
    const document = await createPDFMonkeyDocument(formData, templateId);
    console.log('Document created with ID:', document.id);

    // Wait for generation to complete
    const completedDocument = await waitForPDFGeneration(document.id);

    // Calculate expiry (PDF Monkey URLs typically expire after 7 days)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    return new Response(
      JSON.stringify({
        success: true,
        pdfUrl: completedDocument.download_url,
        previewUrl: completedDocument.preview_url,
        documentId: completedDocument.id,
        expiresAt,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('PAT Testing PDF generation error:', error);
    await captureException(error, {
      functionName: 'generate-pat-testing-pdf',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
