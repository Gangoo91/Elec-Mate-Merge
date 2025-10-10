import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, corsHeaders } from '../_shared/deps.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { designData, planData, companyDetails, userId } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    if (!pdfMonkeyApiKey) {
      throw new Error('PDF_MONKEY_API_KEY not configured');
    }

    console.log('🎨 Starting PDF generation with PDF Monkey template...');

    // Build payload matching PDF Monkey template: 8C64318C-A404-4A55-9039-294164C19FB4
    const payload = {
      company_details: {
        company_logo_url: companyDetails?.company_logo_url || '',
        company_name: companyDetails?.company_name || 'Electrical Contractor',
        company_address: companyDetails?.company_address || '',
        company_phone: companyDetails?.company_phone || '',
        company_email: companyDetails?.company_email || '',
        company_website: companyDetails?.company_website || '',
      },
      client_details: {
        client_name: planData?.clientName || 'Client Name',
        property_address: planData?.siteInfo?.address || '',
        postcode: planData?.siteInfo?.postcode || '',
        contact_number: planData?.clientContact || '',
        email: planData?.clientEmail || '',
      },
      project_info: {
        project_name: planData?.projectName || 'Electrical Installation Project',
        location: planData?.siteInfo?.address || '',
        design_engineer: companyDetails?.company_name || 'Electrical Designer',
        design_date: new Date().toLocaleDateString('en-GB'),
        installation_type: planData?.installationType || 'domestic',
      },
      document: {
        reference: `IP-${Date.now()}`,
        generated_date: new Date().toLocaleDateString('en-GB'),
        registration_number: companyDetails?.registration_number || '',
        vat_number: companyDetails?.vat_number || '',
      },
      design_parameters: {
        voltage: planData?.voltage || 230,
        phases: planData?.phases || 'single',
        supply_type: planData?.installationType || 'domestic',
        earthing_system: planData?.environmentalProfile?.finalApplied?.earthing || 'TN-S',
        ze: planData?.environmentalProfile?.finalApplied?.ze || 0.35,
        ambient_temperature: planData?.environmentalProfile?.finalApplied?.ambientTemp || 30,
        installation_method: planData?.installationMethod || 'clipped-direct',
        cable_type: planData?.cableType || 'pvc-twin-earth',
      },
      circuits: mapCircuitsToTemplate(designData, planData),
    };

    console.log('📄 Payload prepared, calling PDF Monkey API...');

    // Call PDF Monkey API
    const pdfResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: '8C64318C-A404-4A55-9039-294164C19FB4',
          payload,
          meta: {
            _filename: `Electrical_Design_Spec_${payload.document.reference}.pdf`,
          },
        },
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('PDF Monkey API error:', errorText);
      throw new Error(`PDF generation failed: ${pdfResponse.statusText}`);
    }

    const pdfData = await pdfResponse.json();
    console.log('✅ PDF Monkey response received:', pdfData.document?.id);

    // Poll for PDF completion (PDF Monkey processes async)
    let attempts = 0;
    let downloadUrl = null;

    while (attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s between polls

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${pdfData.document.id}`,
        {
          headers: {
            'Authorization': `Bearer ${pdfMonkeyApiKey}`,
          },
        }
      );

      const statusData = await statusResponse.json();
      
      if (statusData.document.status === 'success') {
        downloadUrl = statusData.document.download_url;
        console.log('✅ PDF ready:', downloadUrl);
        break;
      } else if (statusData.document.status === 'failure') {
        throw new Error('PDF generation failed on PDF Monkey');
      }

      attempts++;
    }

    if (!downloadUrl) {
      throw new Error('PDF generation timeout - PDF not ready after 60s');
    }

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl,
        documentId: pdfData.document.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'PDF generation failed',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

/**
 * Map designer data circuits to PDF template format
 */
function mapCircuitsToTemplate(designData: any, planData: any): any[] {
  const circuits = designData?.circuits || [];
  
  if (circuits.length === 0) {
    // Fallback: create a single circuit from planData
    return [{
      circuit_number: 1,
      circuit_name: planData?.loadType || 'Circuit',
      load_type: planData?.loadType || 'General',
      total_load_kw: (planData?.totalLoad || 0) / 1000,
      cable_length: planData?.cableLength || 0,
      ib: designData?.designCurrent || 0,
      protection: `${designData?.deviceRating || 'TBC'}A MCB`,
      cable_size: `${designData?.cableSize || 'TBC'}mm²`,
      cable_spec: `${designData?.cableSize || 'TBC'}mm² twin & earth (6242Y)`,
      table_ref: 'Table 4D5',
      it: designData?.IzTabulated || 0,
      ca: designData?.correctionFactors?.temperature || 1.0,
      cg: designData?.correctionFactors?.grouping || 1.0,
      iz: designData?.Iz || 0,
      vd_percent: designData?.voltageDrop?.percentage || 0,
      vd_volts: designData?.voltageDrop?.actual || 0,
      vd_max: planData?.installationType === 'domestic' ? 3 : 5,
      max_zs: designData?.earthFault?.maxZs || 0,
      zs_regulation: 'Reg 411.4.4',
      compliance_status: 'pass',
      rcd_rating: designData?.rcdRating || '',
      rcd_reason: designData?.rcdRequirements?.reason || '',
      reg_1: 'Reg 433.1 - Overload protection satisfied',
      reg_2: 'Reg 525 - Voltage drop within limits',
      reg_3: 'Reg 411.3.2 - Earth fault protection adequate',
    }];
  }

  // Map multiple circuits from designData
  return circuits.map((circuit: any, idx: number) => ({
    circuit_number: idx + 1,
    circuit_name: circuit.name || `Circuit ${idx + 1}`,
    load_type: circuit.loadType || 'General',
    total_load_kw: ((circuit.load || circuit.loadPower || 0) / 1000).toFixed(2),
    cable_length: circuit.cableLength || 0,
    
    // Design current & protection
    ib: (circuit.calculations?.Ib || 0).toFixed(1),
    in: circuit.calculations?.In || circuit.protectionDevice?.rating || 0,
    protection: circuit.protection || `${circuit.calculations?.In || circuit.protectionDevice?.rating || 'TBC'}A Type ${circuit.protectionDevice?.curve || 'B'} MCB`,
    
    // Cable specifications
    cable_size: (circuit.cableSize || '').replace('mm²', ''),
    cable_spec: circuit.cableSpec || `${circuit.cableSize || 'TBC'} twin & earth (6242Y)`,
    table_ref: circuit.calculations?.tableRef || 'Table 4D5',
    
    // Correction factors & capacity
    it: (circuit.calculations?.IzTabulated || circuit.calculations?.Iz || 0).toFixed(1),
    ca: (circuit.calculations?.correctionFactors?.Ca || 1.0).toFixed(2),
    cg: (circuit.calculations?.correctionFactors?.Cg || 1.0).toFixed(2),
    iz: (circuit.calculations?.Iz || 0).toFixed(1),
    equation: circuit.calculations?.equation || `Iz = It × Ca × Cg`,
    
    // Voltage drop
    vd_percent: (circuit.calculations?.voltageDrop?.percent || 0).toFixed(2),
    vd_volts: (circuit.calculations?.voltageDrop?.volts || 0).toFixed(2),
    vd_max: circuit.calculations?.voltageDrop?.max || (planData?.installationType === 'domestic' ? 3 : 5),
    
    // Earth fault loop impedance
    max_zs: (circuit.calculations?.zs?.max || 0).toFixed(2),
    zs_regulation: circuit.calculations?.zs?.regulation || 'Table 41.3',
    
    // Compliance
    compliance_status: circuit.complianceStatus || (circuit.calculations?.zs?.compliant && circuit.calculations?.voltageDrop?.compliant ? 'pass' : 'review'),
    
    // RCD
    rcd_rating: circuit.rcdRequirements?.rating || (circuit.rcdProtected ? `${circuit.rcdRating || 30}mA` : ''),
    rcd_reason: circuit.rcdRequirements?.reason || (circuit.rcdProtected ? 'Additional protection required' : ''),
    
    // Regulations (3 bullets) - use from designer or fallback
    reg_1: circuit.regulations?.[0] || 'Reg 433.1 - Overload protection: Ib ≤ In ≤ Iz satisfied',
    reg_2: circuit.regulations?.[1] || `Reg 525 - Voltage drop ${circuit.calculations?.voltageDrop?.compliant ? 'within limits' : 'exceeds limits'}`,
    reg_3: circuit.regulations?.[2] || `Reg 411.3.2 - Earth fault protection ${circuit.calculations?.zs?.compliant ? 'adequate' : 'requires review'}`,
  }));
}
