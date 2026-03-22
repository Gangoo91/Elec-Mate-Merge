/**
 * generate-minor-works-pdf-v2
 *
 * Gotenberg-backed Minor Works PDF generation.
 * Flow: Transform → Zod validate → Render HTML → Gotenberg via VPS proxy → Upload to Storage → Return permanent URL.
 *
 * No polling (Gotenberg returns PDF in ~2-5s), no temporary URLs.
 * Zod validation catches missing fields BEFORE template rendering.
 * Template is TypeScript code — compile-time field safety.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { validateMinorWorksPayload, type MinorWorksPayload } from '../_shared/minor-works-schema.ts';
import { minorWorksTemplate } from '../_shared/certificate-templates/minor-works.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[MW-PDF-V2] Request started');

    // ── Auth ─────────────────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userSupabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    // ── Parse form data ──────────────────────────────────────────────
    const { formData } = await req.json();
    console.log('[MW-PDF-V2] Certificate:', formData?.certificateNumber);

    if (!formData) {
      return new Response(JSON.stringify({ success: false, error: 'Form data is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Transform camelCase → nested snake_case ──────────────────────
    const transformed = transformFormDataForTemplate(formData);

    // ── Zod validate — HARD FAIL if data malformed ───────────────────
    let validated;
    try {
      validated = validateMinorWorksPayload(transformed);
    } catch (zodError) {
      console.error('[MW-PDF-V2] Zod validation failed:', zodError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Payload validation failed',
          details: (zodError as { issues?: unknown }).issues || String(zodError),
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Render HTML template (TypeScript-typed — compile-time safety) ─
    console.log('[MW-PDF-V2] Rendering HTML template');
    const html = minorWorksTemplate(validated);

    // ── Send HTML to Gotenberg via VPS MCP proxy ─────────────────────
    if (!VPS_API_KEY) {
      throw new Error('VPS_API_KEY not configured');
    }

    console.log('[MW-PDF-V2] Sending to Gotenberg via VPS proxy');
    const pdfResponse = await fetch(`${VPS_URL}/api/html-to-pdf`, {
      method: 'POST',
      headers: {
        'X-API-Key': VPS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
    });

    if (!pdfResponse.ok) {
      const errText = await pdfResponse.text();
      console.error(`[MW-PDF-V2] Gotenberg proxy error (${pdfResponse.status}):`, errText);
      throw new Error(`PDF generation failed: ${pdfResponse.status}`);
    }

    const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
    console.log(`[MW-PDF-V2] PDF generated: ${pdfBytes.length} bytes`);

    // ── Upload to Supabase Storage (permanent — no 7-day expiry) ─────
    const certRef = formData.certificateNumber || 'MW';
    const fileName = `${certRef}-${Date.now()}.pdf`;
    const storagePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(storagePath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      console.error('[MW-PDF-V2] Storage upload failed:', uploadError.message);
      // Fallback: return base64-encoded PDF
      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < pdfBytes.length; i += chunkSize) {
        binary += String.fromCharCode(...pdfBytes.subarray(i, i + chunkSize));
      }
      const base64 = btoa(binary);
      return new Response(
        JSON.stringify({
          success: true,
          pdf_base64: base64,
          storagePath: null,
          pdfUrl: null,
          fallback: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: urlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(storagePath);

    console.log('[MW-PDF-V2] Upload complete:', urlData.publicUrl);

    // ── Return permanent URL ─────────────────────────────────────────
    return new Response(
      JSON.stringify({
        success: true,
        pdfUrl: urlData.publicUrl,
        storagePath,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[MW-PDF-V2] Error:', (error as Error).message);
    await captureException(error, {
      functionName: 'generate-minor-works-pdf-v2',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// ── Transform — camelCase form data → snake_case MinorWorksPayload ─────
//
// IMPORTANT: The return type is MinorWorksPayload — if you add a field to the
// Zod schema, TypeScript will ERROR here until you add the mapping.
// If you typo a field name, TypeScript will ERROR.
// This is intentional — it prevents schema drift.

/**
 * camelCase field names sent by the frontend form.
 * Keeps the input side typed so we catch renamed/removed form fields too.
 * All fields optional — the form may not send every field.
 */
interface MinorWorksFormData {
  certificateNumber?: string;
  workDate?: string;
  dateOfCompletion?: string;
  nextInspectionDue?: string;

  contractorName?: string;
  contractorAddress?: string;

  supplyVoltage?: string;
  frequency?: string;
  supplyPhases?: string;

  forAndOnBehalfOf?: string;
  companyLogo?: string;
  companyName?: string;
  companyTagline?: string;
  companyAccentColor?: string;
  companyWebsite?: string;
  brandingTagline?: string;
  brandingAccentColor?: string;
  brandingWebsite?: string;
  schemeLogo?: string;
  schemeLogoDataUrl?: string;
  registrationSchemeLogo?: string;

  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  personOrderingWork?: string;

  propertyAddress?: string;
  postcode?: string;

  workType?: string;
  workLocation?: string;
  workDescription?: string;
  departuresFromBS7671?: string;
  permittedExceptions?: string;
  riskAssessmentAttached?: boolean;
  commentsOnExistingInstallation?: string;

  earthingArrangement?: string;
  zdb?: string;
  earthingConductorPresent?: boolean;
  mainEarthingConductorSize?: string;
  mainEarthingConductorSizeCustom?: string;
  mainEarthingConductorMaterial?: string;

  mainBondingConductorSize?: string;
  mainBondingConductorSizeCustom?: string;
  bondingWater?: boolean;
  bondingWaterSize?: string;
  bondingGas?: boolean;
  bondingGasSize?: string;
  bondingOil?: boolean;
  bondingOilSize?: string;
  bondingStructural?: boolean;
  bondingStructuralSize?: string;
  bondingOther?: boolean;
  bondingOtherSpecify?: string;

  distributionBoard?: string;
  dbLocationType?: string;
  circuitDesignation?: string;
  circuitDescription?: string;
  circuitType?: string;
  referenceMethod?: string;
  numberOfConductors?: string;
  liveConductorSize?: string;
  cpcSize?: string;
  cableType?: string;
  installationMethod?: string;
  overcurrentDeviceBsEn?: string;
  protectiveDeviceType?: string;
  protectiveDeviceRating?: string;
  protectiveDeviceKaRating?: string;

  protectionRcd?: boolean;
  protectionRcbo?: boolean;
  protectionAfdd?: boolean;
  protectionSpd?: boolean;
  rcdBsEn?: string;
  rcdType?: string;
  rcdRatingAmps?: string;
  rcdIdn?: string;
  afddBsEn?: string;
  afddRating?: string;
  spdBsEn?: string;
  spdType?: string;

  continuityR1R2?: string;
  r2Continuity?: string;
  ringR1?: string;
  ringRn?: string;
  ringR2?: string;
  ringR1EndToEnd?: string;
  ringRnEndToEnd?: string;
  ringR2EndToEnd?: string;
  ringR1Cross?: string;
  ringRnCross?: string;
  ringR2Cross?: string;
  ringFinalContinuity?: string;
  insulationTestVoltage?: string;
  insulationLiveLive?: string;
  insulationLiveNeutral?: string;
  insulationLiveEarth?: string;
  insulationNeutralEarth?: string;
  polarity?: string;
  earthFaultLoopImpedance?: string;
  maxPermittedZs?: string;
  prospectiveFaultCurrent?: string;
  rcdOneX?: string;
  rcdFiveX?: string;
  rcdHalfX?: string;
  rcdTestButton?: string;
  rcdRating?: string;
  functionalTesting?: string;
  afddTestButton?: string;
  afddTripTime?: string;
  rcboTripTime?: string;
  earthElectrodeResistance?: string;
  phaseRotation?: string;
  spdVisualInspection?: string;
  spdIndicatorStatus?: string;
  spdTestButton?: string | boolean;
  testTemperature?: string;

  testEquipmentModel?: string;
  testEquipmentSerial?: string;
  testEquipmentCalDate?: string;
  customTestEquipment?: string;

  electricianName?: string;
  electricianPhone?: string;
  electricianEmail?: string;
  position?: string;
  signatureDate?: string;
  qualificationLevel?: string;
  schemeProvider?: string;
  registrationNumber?: string;
  signature?: string;
  ietDeclaration?: boolean;
  bs7671Compliance?: boolean;
  testResultsAccurate?: boolean;
  workSafety?: boolean;
  partPNotification?: boolean;
  copyProvided?: boolean;
  additionalNotes?: string;
}

function transformFormDataForTemplate(formData: MinorWorksFormData): MinorWorksPayload {
  const today = new Date().toLocaleDateString('en-GB');
  const ietDeclared = formData.ietDeclaration || false;

  const result: MinorWorksPayload = {
    certificate_number: formData.certificateNumber || '',
    generated_at: today,
    bs7671_amendment_date: 'A3:2024',
    work_date: formatDate(formData.workDate),
    date_of_completion: formatDate(formData.dateOfCompletion),
    next_inspection_due: formatDate(formData.nextInspectionDue),

    contractor: {
      name: formData.contractorName || formData.forAndOnBehalfOf || '',
      address: formData.contractorAddress || '',
    },

    supply: {
      voltage: formData.supplyVoltage || '230',
      frequency: formData.frequency || '50',
      phases: formData.supplyPhases || '1',
    },

    company: {
      name: formData.forAndOnBehalfOf || formData.contractorName || '',
      logo_url: formData.companyLogo || '',
      phone: formData.electricianPhone || '',
      email: formData.electricianEmail || '',
      address: formData.contractorAddress || '',
      registration_no: formData.registrationNumber
        ? `${formData.schemeProvider || ''}/${formData.registrationNumber}`
        : '',
      tagline: formData.brandingTagline || formData.companyTagline || '',
      accent_color: formData.brandingAccentColor || formData.companyAccentColor || '#d69e2e',
      website: formData.brandingWebsite || formData.companyWebsite || '',
      scheme_logo:
        formData.schemeLogo || formData.schemeLogoDataUrl || formData.registrationSchemeLogo || '',
    },

    client: {
      name: formData.clientName || '',
      phone: formData.clientPhone || '',
      email: formData.clientEmail || '',
    },

    person_ordering_work: formData.personOrderingWork || '',

    installation: {
      address: formData.propertyAddress || '',
      postcode: formData.postcode || '',
    },

    work_type: formData.workType || '',
    work_location: formData.workLocation || '',
    work_description: formData.workDescription || '',
    departures: formData.departuresFromBS7671 || 'None',
    permitted_exceptions: formData.permittedExceptions || 'None',
    risk_assessment_attached: formData.riskAssessmentAttached || false,
    existing_installation_comments: formData.commentsOnExistingInstallation || '',

    earthing: {
      type: formData.earthingArrangement || '',
      zdb: formData.zdb || '',
      conductor_present: formData.earthingConductorPresent || false,
      conductor_size: formData.mainEarthingConductorSize || formData.mainEarthingConductorSizeCustom || '',
      conductor_material: formData.mainEarthingConductorMaterial || 'Copper',
    },

    bonding: {
      size: formData.mainBondingConductorSize || formData.mainBondingConductorSizeCustom || '',
      water: formData.bondingWater || false,
      water_size: formData.bondingWaterSize || formData.mainBondingConductorSize || '',
      gas: formData.bondingGas || false,
      gas_size: formData.bondingGasSize || formData.mainBondingConductorSize || '',
      oil: formData.bondingOil || false,
      oil_size: formData.bondingOilSize || '',
      structural: formData.bondingStructural || false,
      structural_size: formData.bondingStructuralSize || '',
      other: formData.bondingOther || false,
      other_specify: formData.bondingOtherSpecify || '',
    },

    circuit: {
      db_ref: formData.distributionBoard || '',
      db_location_type: formData.dbLocationType || '',
      number: formData.circuitDesignation || '',
      description: formData.circuitDescription || '',
      type: formData.circuitType || '',
      reference_method: formData.referenceMethod || '',
      number_of_conductors: formData.numberOfConductors || '',
      live_size: formData.liveConductorSize || '',
      cpc_size: formData.cpcSize || '',
      cable_type: formData.cableType || '',
      installation_method: formData.installationMethod || '',
      ocpd: {
        bs_en: formData.overcurrentDeviceBsEn || '',
        type: formData.protectiveDeviceType || '',
        rating: formData.protectiveDeviceRating || '',
        breaking_capacity: formData.protectiveDeviceKaRating || '',
      },
      protection: {
        rcd: formData.protectionRcd || false,
        rcbo: formData.protectionRcbo || false,
        afdd: formData.protectionAfdd || false,
        spd: formData.protectionSpd || false,
      },
      rcd: {
        bs_en: formData.rcdBsEn || '',
        type: formData.rcdType || '',
        rating: formData.rcdRatingAmps || '',
        idn: formData.rcdIdn || '',
      },
      afdd: {
        bs_en: formData.afddBsEn || '',
        rating: formData.afddRating || '',
      },
      spd: {
        bs_en: formData.spdBsEn || '',
        type: formData.spdType || '',
      },
    },

    tests: {
      r1_r2: formData.continuityR1R2 || 'N/A',
      r2: formData.r2Continuity || 'N/A',
      ring_ll: formData.ringR1 || 'N/A',
      ring_nn: formData.ringRn || 'N/A',
      ring_cpc: formData.ringR2 || 'N/A',
      ring_r1_end: formData.ringR1EndToEnd || formData.ringR1 || 'N/A',
      ring_rn_end: formData.ringRnEndToEnd || formData.ringRn || 'N/A',
      ring_r2_end: formData.ringR2EndToEnd || formData.ringR2 || 'N/A',
      ring_r1_cross: formData.ringR1Cross || 'N/A',
      ring_rn_cross: formData.ringRnCross || 'N/A',
      ring_r2_cross: formData.ringR2Cross || 'N/A',
      ring_final: formData.ringFinalContinuity || 'N/A',
      insulation_voltage: formData.insulationTestVoltage || '500',
      ir_live_live: formData.insulationLiveLive || 'N/A',
      ir_live_neutral: formData.insulationLiveNeutral || 'N/A',
      ir_live_earth: formData.insulationLiveEarth || 'N/A',
      ir_neutral_earth: formData.insulationNeutralEarth || 'N/A',
      polarity: formData.polarity || 'N/A',
      zs: formData.earthFaultLoopImpedance || 'N/A',
      max_zs: formData.maxPermittedZs || 'N/A',
      pfc: formData.prospectiveFaultCurrent || 'N/A',
      rcd_time: formData.rcdOneX || 'N/A',
      rcd_5x_time: formData.rcdFiveX || 'N/A',
      rcd_half_x: formData.rcdHalfX || 'N/A',
      rcd_test_button: formData.rcdTestButton || 'N/A',
      rcd_rating: formData.rcdRating || 'N/A',
      functional_test: formData.functionalTesting || 'N/A',
      afdd_test_button: formData.afddTestButton || 'N/A',
      afdd_trip_time: formData.afddTripTime || 'N/A',
      rcbo_trip_time: formData.rcboTripTime || 'N/A',
      earth_electrode: formData.earthElectrodeResistance || 'N/A',
      phase_rotation: formData.phaseRotation || 'N/A',
      spd_visual: formData.spdVisualInspection || 'N/A',
      spd_indicator: formData.spdIndicatorStatus || 'N/A',
      spd_test_button: formData.spdTestButton ?? false,
      temperature: formData.testTemperature || 'N/A',
    },

    test_equipment: {
      model: formData.testEquipmentModel || '',
      serial: formData.testEquipmentSerial || '',
      calibration_date: formatDate(formData.testEquipmentCalDate),
      custom: formData.customTestEquipment || '',
    },

    declaration: {
      name: formData.electricianName || '',
      company: formData.forAndOnBehalfOf || '',
      address: formData.contractorAddress || '',
      phone: formData.electricianPhone || '',
      email: formData.electricianEmail || '',
      position: formData.position || '',
      date: formatDate(formData.signatureDate),
      qualification: formData.qualificationLevel || '',
      scheme_provider: formData.schemeProvider || '',
      registration_number: formData.registrationNumber || '',
      signature: formData.signature || '',
      iet_declaration: ietDeclared,
      bs7671_compliance: ietDeclared || formData.bs7671Compliance || false,
      test_results_accurate: ietDeclared || formData.testResultsAccurate || false,
      work_safety: ietDeclared || formData.workSafety || false,
      part_p_notification: formData.partPNotification || false,
      copy_provided: formData.copyProvided || false,
      additional_notes: formData.additionalNotes || '',
    },
  };

  return result;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-GB');
  } catch {
    return dateStr;
  }
}
