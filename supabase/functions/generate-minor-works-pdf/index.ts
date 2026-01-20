import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const DEFAULT_MINOR_WORKS_TEMPLATE_ID = 'E6A82A45-09FE-46EC-9E6E-0D20B1E81D0D';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[MINOR-WORKS-PDF] Request started');

    // Verify PDF Monkey API key is configured
    if (!PDF_MONKEY_API_KEY) {
      console.error('[MINOR-WORKS-PDF] API key not configured');
      return new Response(
        JSON.stringify({ error: 'PDF Monkey API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const { formData, templateId } = await req.json();
    console.log('[MINOR-WORKS-PDF] Received form data for certificate:', formData?.certificateNumber);

    if (!formData) {
      return new Response(
        JSON.stringify({ error: 'Form data is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Use provided template ID or default
    const TEMPLATE_ID = templateId || DEFAULT_MINOR_WORKS_TEMPLATE_ID;
    console.log('[MINOR-WORKS-PDF] Using template ID:', TEMPLATE_ID);

    // Transform app form data to PDF template format
    const payload = transformFormDataForTemplate(formData);
    console.log('[MINOR-WORKS-PDF] Transformed payload keys:', Object.keys(payload));

    // Call PDF Monkey API
    console.log('[MINOR-WORKS-PDF] Calling PDF Monkey API');
    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: TEMPLATE_ID,
          status: 'pending',
          payload: payload
        }
      })
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      console.error('[MINOR-WORKS-PDF] API error:', pdfMonkeyResponse.status, errorText);
      return new Response(
        JSON.stringify({
          error: 'Failed to generate PDF',
          details: errorText,
          status: pdfMonkeyResponse.status
        }),
        {
          status: pdfMonkeyResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const pdfData = await pdfMonkeyResponse.json();
    console.log('[MINOR-WORKS-PDF] PDF generation initiated, document ID:', pdfData.document?.id);

    // Poll for document completion
    const documentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30; // 60 seconds max wait
    let documentStatus = pdfData.document?.status;

    while (documentStatus !== 'success' && documentStatus !== 'failure' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusResponse = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        }
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        documentStatus = statusData.document?.status;
        console.log('[MINOR-WORKS-PDF] Status check attempt', attempts + 1, '- Status:', documentStatus);

        if (documentStatus === 'success') {
          console.log('[MINOR-WORKS-PDF] PDF generated successfully');
          return new Response(
            JSON.stringify({
              success: true,
              pdfUrl: statusData.document.download_url,
              documentId: statusData.document.id,
              previewUrl: statusData.document.preview_url,
              status: statusData.document.status
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      }

      attempts++;
    }

    if (documentStatus === 'failure') {
      console.error('[MINOR-WORKS-PDF] PDF generation failed');
      return new Response(
        JSON.stringify({ error: 'PDF generation failed' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Timeout
    console.log('[MINOR-WORKS-PDF] Timeout waiting for PDF');
    return new Response(
      JSON.stringify({
        success: false,
        timeout: true,
        message: 'PDF generation in progress - taking longer than expected',
        documentId: documentId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('[MINOR-WORKS-PDF] Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

/**
 * Transform app form data (camelCase) to PDF template format (nested objects)
 */
function transformFormDataForTemplate(formData: any): any {
  const today = new Date().toLocaleDateString('en-GB');

  return {
    // Certificate metadata
    certificate_number: formData.certificateNumber || '',
    generated_at: today,
    work_date: formatDate(formData.workDate),
    date_of_completion: formatDate(formData.dateOfCompletion),
    next_inspection_due: formatDate(formData.nextInspectionDue),

    // Contractor details
    contractor: {
      name: formData.contractorName || formData.forAndOnBehalfOf || '',
      address: formData.contractorAddress || ''
    },

    // Supply characteristics
    supply: {
      voltage: formData.supplyVoltage || '230',
      frequency: formData.frequency || '50',
      phases: formData.supplyPhases || '1'
    },

    // Company details (for header)
    company: {
      name: formData.forAndOnBehalfOf || formData.contractorName || '',
      logo_url: formData.companyLogo || '',
      phone: formData.electricianPhone || '',
      email: formData.electricianEmail || '',
      address: formData.contractorAddress || '',
      registration_no: formData.registrationNumber ? `${formData.schemeProvider || ''}/${formData.registrationNumber}` : ''
    },

    // Client details
    client: {
      name: formData.clientName || '',
      phone: formData.clientPhone || '',
      email: formData.clientEmail || ''
    },

    person_ordering_work: formData.personOrderingWork || '',

    // Installation address
    installation: {
      address: formData.propertyAddress || '',
      postcode: formData.postcode || ''
    },

    // Work details
    work_type: formData.workType || '',
    work_location: formData.workLocation || '',
    work_description: formData.workDescription || '',
    departures: formData.departuresFromBS7671 || 'None',
    permitted_exceptions: formData.permittedExceptions || 'None',
    risk_assessment_attached: formData.riskAssessmentAttached || false,
    existing_installation_comments: formData.commentsOnExistingInstallation || '',

    // Earthing
    earthing: {
      type: formData.earthingArrangement || '',
      zdb: formData.zdb || '',
      conductor_present: formData.earthingConductorPresent || false,
      conductor_size: formData.mainEarthingConductorSize || '',
      conductor_material: formData.mainEarthingConductorMaterial || 'Copper'
    },

    // Bonding
    bonding: {
      size: formData.mainBondingConductorSize || '',
      water: formData.bondingWater || false,
      water_size: formData.bondingWaterSize || formData.mainBondingConductorSize || '',
      gas: formData.bondingGas || false,
      gas_size: formData.bondingGasSize || formData.mainBondingConductorSize || '',
      oil: formData.bondingOil || false,
      oil_size: formData.bondingOilSize || '',
      structural: formData.bondingStructural || false,
      structural_size: formData.bondingStructuralSize || '',
      other: formData.bondingOther || false,
      other_specify: formData.bondingOtherSpecify || ''
    },

    // Circuit details
    circuit: {
      db_ref: formData.distributionBoard || '',
      db_location_type: formData.dbLocationType || '',
      number: formData.circuitDesignation || '',
      description: formData.circuitDescription || '',
      type: formData.circuitType || '',
      reference_method: formData.referenceMethod || '',
      live_size: formData.liveConductorSize || '',
      cpc_size: formData.cpcSize || '',
      cable_type: formData.cableType || '',
      installation_method: formData.installationMethod || '',
      ocpd: {
        bs_en: formData.overcurrentDeviceBsEn || '',
        type: formData.protectiveDeviceType || '',
        rating: formData.protectiveDeviceRating || '',
        breaking_capacity: formData.protectiveDeviceKaRating || ''
      },
      protection: {
        rcd: formData.protectionRcd || false,
        rcbo: formData.protectionRcbo || false,
        afdd: formData.protectionAfdd || false,
        spd: formData.protectionSpd || false
      },
      rcd: {
        bs_en: formData.rcdBsEn || '',
        type: formData.rcdType || '',
        rating: formData.rcdRatingAmps || '',
        idn: formData.rcdIdn || ''
      },
      afdd: {
        bs_en: formData.afddBsEn || '',
        rating: formData.afddRating || ''
      },
      spd: {
        bs_en: formData.spdBsEn || '',
        type: formData.spdType || ''
      }
    },

    // Test results
    tests: {
      r1_r2: formData.continuityR1R2 || '',
      r2: formData.r2Continuity || '',
      ring_ll: formData.ringR1 || '',
      ring_nn: formData.ringRn || '',
      ring_cpc: formData.ringR2 || '',
      ring_r1_end: formData.ringR1EndToEnd || '',
      ring_rn_end: formData.ringRnEndToEnd || '',
      ring_r2_end: formData.ringR2EndToEnd || '',
      ring_r1_cross: formData.ringR1Cross || '',
      ring_rn_cross: formData.ringRnCross || '',
      ring_r2_cross: formData.ringR2Cross || '',
      ring_final: formData.ringFinalContinuity || '',
      insulation_voltage: formData.insulationTestVoltage || '500',
      ir_live_live: formData.insulationLiveLive || '',
      ir_live_neutral: formData.insulationLiveNeutral || '',
      ir_live_earth: formData.insulationLiveEarth || '',
      ir_neutral_earth: formData.insulationNeutralEarth || '',
      polarity: formData.polarity || '',
      zs: formData.earthFaultLoopImpedance || '',
      max_zs: formData.maxPermittedZs || '',
      pfc: formData.prospectiveFaultCurrent || '',
      rcd_time: formData.rcdOneX || '',
      rcd_5x_time: formData.rcdFiveX || '',
      rcd_half_x: formData.rcdHalfX || '',
      rcd_test_button: formData.rcdTestButton || '',
      rcd_rating: formData.rcdRating || '',
      functional_test: formData.functionalTesting || '',
      afdd_test_button: formData.afddTestButton || '',
      afdd_trip_time: formData.afddTripTime || '',
      rcbo_trip_time: formData.rcboTripTime || '',
      earth_electrode: formData.earthElectrodeResistance || '',
      phase_rotation: formData.phaseRotation || '',
      spd_visual: formData.spdVisualInspection || '',
      spd_indicator: formData.spdIndicatorStatus || '',
      spd_test_button: formData.spdTestButton || false,
      temperature: formData.testTemperature || ''
    },

    // Test equipment
    test_equipment: {
      model: formData.testEquipmentModel || '',
      serial: formData.testEquipmentSerial || '',
      calibration_date: formatDate(formData.testEquipmentCalDate),
      custom: formData.customTestEquipment || ''
    },

    // Declaration
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
      iet_declaration: formData.ietDeclaration || false,
      bs7671_compliance: formData.bs7671Compliance || false,
      test_results_accurate: formData.testResultsAccurate || false,
      work_safety: formData.workSafety || false,
      part_p_notification: formData.partPNotification || false,
      copy_provided: formData.copyProvided || false,
      additional_notes: formData.additionalNotes || ''
    },

    // Generation metadata
    _generated_at: new Date().toISOString(),
    _cache_bust: Date.now()
  };
}

/**
 * Format date to DD/MM/YYYY
 */
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
