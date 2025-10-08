import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface DesignSpecRequest {
  designData: any;
  companyDetails?: any;
  clientDetails?: any;
  userId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { designData, companyDetails, clientDetails, userId } = await req.json() as DesignSpecRequest;

    console.log('🎨 Generating Designer Calculations PDF via PDF Monkey');

    // Initialize Supabase to fetch company profile
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch company profile for logo and additional details
    let companyProfile: any = null;
    if (userId) {
      const { data } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (data) {
        companyProfile = data;
        console.log('✅ Company profile loaded:', companyProfile.company_name);
      }
    }

    // Prepare PDF Monkey payload
    const pdfPayload = transformToPDFMonkeySchema(designData, companyDetails, clientDetails, companyProfile);

    console.log('📤 Sending to PDF Monkey API...');

    // Call PDF Monkey API
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');
    if (!pdfMonkeyApiKey) {
      console.warn('⚠️ PDF_MONKEY_API_KEY not configured, returning fallback response');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'PDF_MONKEY_API_KEY not configured',
        fallback: true 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: '8C64318C-A404-4A55-9039-294164C19FB4',
          payload: pdfPayload,
          status: 'pending',
        }
      }),
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      console.error('❌ PDF Monkey API error:', pdfMonkeyResponse.status, errorText);
      return new Response(JSON.stringify({ 
        success: false, 
        error: `PDF Monkey API error: ${pdfMonkeyResponse.status}`,
        fallback: true 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const pdfMonkeyData = await pdfMonkeyResponse.json();
    console.log('✅ PDF Monkey document created:', pdfMonkeyData.document?.id);

    // Poll for PDF generation (PDF Monkey processes asynchronously)
    const documentId = pdfMonkeyData.document?.id;
    if (!documentId) {
      throw new Error('No document ID returned from PDF Monkey');
    }

    // Wait for PDF to be ready (max 30 seconds)
    let pdfUrl = null;
    let attempts = 0;
    const maxAttempts = 30;

    while (!pdfUrl && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const statusResponse = await fetch(`https://api.pdfmonkey.io/api/v1/documents/${documentId}`, {
        headers: {
          'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        },
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        if (statusData.document?.status === 'success') {
          pdfUrl = statusData.document.download_url;
          console.log('✅ PDF ready:', pdfUrl);
        } else if (statusData.document?.status === 'failure') {
          throw new Error('PDF generation failed on PDF Monkey');
        }
      }
      
      attempts++;
    }

    if (!pdfUrl) {
      throw new Error('PDF generation timeout');
    }

    return new Response(JSON.stringify({
      success: true,
      downloadUrl: pdfUrl,
      documentId,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error generating design spec PDF:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'PDF generation failed',
      fallback: true 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function transformToPDFMonkeySchema(designData: any, companyDetails: any, clientDetails: any, companyProfile: any) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  // Extract company details
  const company = companyProfile || companyDetails || {};
  const companyName = company.company_name || companyDetails?.companyName || 'Professional Electrical Services';
  const companyAddress = company.address || companyDetails?.address || 'Not specified';
  const companyPhone = company.phone || companyDetails?.phone || 'Not specified';
  const companyEmail = company.email || companyDetails?.email || 'Not specified';
  const companyWebsite = company.website || companyDetails?.website || '';
  const companyLogoUrl = company.logo_url || '';

  // Extract client details
  const clientName = clientDetails?.clientName || clientDetails?.client_name || 'Client';
  const propertyAddress = clientDetails?.propertyAddress || clientDetails?.property_address || designData?.location || 'Not specified';
  const postcode = clientDetails?.postcode || 'Not specified';
  const contactNumber = clientDetails?.contactNumber || clientDetails?.contact_number || 'Not specified';
  const email = clientDetails?.email || 'Not specified';

  // Extract project details
  const projectName = designData?.projectName || 'Electrical Installation';
  const location = designData?.location || propertyAddress;
  const designEngineer = designData?.designEngineer || company.contact_name || 'Qualified Electrician';
  const designDate = formattedDate;
  const installationType = designData?.installationType || 'Domestic Installation';

  // Extract design parameters
  const voltage = designData?.voltage || 230;
  const phases = designData?.phases || 'Single Phase';
  const supplyType = phases === 'Single Phase' ? 'TN-S Single Phase' : 'TN-S Three Phase';
  const earthingSystem = designData?.earthingSystem || 'TN-S';
  const ze = designData?.ze || '0.35';
  const ambientTemperature = designData?.ambientTemperature || designData?.environmentalProfile?.finalApplied?.ambientTemp || 25;
  const installationMethod = designData?.installationMethod || 'Clipped Direct';
  const cableType = designData?.cableType || '6242Y Twin & Earth';

  // Transform circuits
  const circuits = transformCircuits(designData?.circuits || [], voltage, ambientTemperature, installationMethod);

  return {
    document: {
      reference: `DS-${projectName.replace(/\s+/g, '_')}-${now.toISOString().split('T')[0]}`,
      generated_date: formattedDate,
      registration_number: 'N/A',
      vat_number: 'N/A',
    },
    company_details: {
      company_name: companyName,
      company_address: companyAddress,
      company_phone: companyPhone,
      company_email: companyEmail,
      company_website: companyWebsite,
      company_logo_url: companyLogoUrl,
    },
    client_details: {
      client_name: clientName,
      property_address: propertyAddress,
      postcode: postcode,
      contact_number: contactNumber,
      email: email,
    },
    project_info: {
      project_name: projectName,
      location: location,
      design_engineer: designEngineer,
      design_date: designDate,
      installation_type: installationType,
    },
    design_parameters: {
      voltage: voltage,
      phases: phases,
      supply_type: supplyType,
      earthing_system: earthingSystem,
      ze: ze,
      ambient_temperature: ambientTemperature,
      installation_method: installationMethod,
      cable_type: cableType,
    },
    circuits: circuits,
  };
}

function transformCircuits(circuits: any[], voltage: number, ambientTemp: number, installationMethod: string) {
  if (!circuits || circuits.length === 0) {
    return [];
  }

  return circuits.map((circuit: any, index: number) => {
    const calc = circuit.calculationResults || {};
    const cableCapacity = calc.cableCapacity || {};
    const voltageDrop = calc.voltageDrop || {};
    const compliance = cableCapacity.compliance || {};
    const factors = cableCapacity.factors || {};

    const circuitNumber = index + 1;
    const circuitName = circuit.name || circuit.circuitType || `Circuit ${circuitNumber}`;
    const loadType = circuit.loadType || circuit.circuitType || 'General Load';
    const totalLoadKW = (circuit.power || circuit.totalLoad || 0) / 1000;
    const cableLength = circuit.cableLength || 15;
    const ib = circuit.designCurrent || cableCapacity.Ib || 0;
    const deviceIn = circuit.deviceRating || cableCapacity.In || 0;
    const protection = `${deviceIn}A ${circuit.deviceType || 'B'}`;
    const cableSize = circuit.cableSize || 2.5;

    // Calculate values
    const cableSpec = `${cableSize}mm² ${circuit.cableType || '6242Y'} T&E`;
    const tableRef = cableCapacity.tableReference || 'Table 4D5';
    const it = cableCapacity.IzTabulated || 0;
    const ca = factors.temperatureFactor || 1.0;
    const cg = factors.groupingFactor || 1.0;
    const iz = cableCapacity.Iz || 0;
    const equation = cableCapacity.equation || `Iz = It × Ca × Cg`;

    const vdPercent = voltageDrop.percentage || 0;
    const vdVolts = voltageDrop.voltageDrop || 0;
    const vdMax = voltageDrop.limit || 3;
    const maxZs = calc.maxZs?.maxZs || 'TBC';
    const zsRegulation = calc.maxZs?.regulation || 'Table 41.3';

    // RCD requirements
    const rcdRequirements = calc.rcdRequirements || {};
    const rcdRating = rcdRequirements.required ? '30mA RCD Required' : 'Standard Protection';
    const rcdReason = rcdRequirements.reason || 'BS 7671 Compliance';

    // Compliance status
    const complianceStatus = compliance.overallCompliant ? 'pass' : 'review';

    // BS 7671 references
    const reg1 = 'Regulation 411.3.2.2 - Automatic disconnection of supply';
    const reg2 = 'Regulation 525 - Voltage drop in consumers installations';
    const reg3 = `Regulation 415.1 - Protection by ${rcdRequirements.required ? 'RCD' : 'automatic disconnection'}`;

    return {
      circuit_number: circuitNumber,
      circuit_name: circuitName,
      load_type: loadType,
      total_load_kw: totalLoadKW.toFixed(2),
      cable_length: cableLength,
      ib: ib.toFixed(1),
      protection: protection,
      cable_size: cableSize,
      compliance_status: complianceStatus,
      cable_spec: cableSpec,
      table_ref: tableRef,
      it: it.toFixed(1),
      ca: ca.toFixed(2),
      cg: cg.toFixed(2),
      iz: iz.toFixed(1),
      equation: equation,
      vd_percent: vdPercent.toFixed(2),
      vd_volts: vdVolts.toFixed(2),
      vd_max: vdMax,
      max_zs: maxZs,
      zs_regulation: zsRegulation,
      in: deviceIn,
      rcd_rating: rcdRating,
      rcd_reason: rcdReason,
      reg_1: reg1,
      reg_2: reg2,
      reg_3: reg3,
    };
  });
}
