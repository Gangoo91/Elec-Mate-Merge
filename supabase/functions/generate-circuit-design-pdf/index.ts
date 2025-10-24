import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const CIRCUIT_DESIGN_TEMPLATE_ID = 'CIRCUIT_DESIGN_DEFAULT'; // Placeholder - user will create template

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[CIRCUIT-PDF] Request started');

    if (!PDF_MONKEY_API_KEY) {
      console.error('[CIRCUIT-PDF] PDF_MONKEY_API_KEY not configured');
      return new Response(
        JSON.stringify({ 
          success: false,
          useFallback: true,
          error: 'PDF_MONKEY_API_KEY not configured' 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { design, userId } = await req.json();

    if (!design) {
      return new Response(
        JSON.stringify({ error: 'Design data is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('[CIRCUIT-PDF] Processing design:', design.projectName);

    // Get user's custom template if they've configured one
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let templateId = CIRCUIT_DESIGN_TEMPLATE_ID;

    if (userId) {
      const { data: template } = await supabase
        .from('pdf_templates')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'circuit_design')
        .eq('is_active', true)
        .single();

      if (template?.pdf_monkey_template_id) {
        templateId = template.pdf_monkey_template_id;
        console.log('[CIRCUIT-PDF] Using custom template:', templateId);
      }
    }

    // Transform design data to PDF-friendly format
    const payload = {
      // Project Header
      projectName: design.projectName || '',
      location: design.location || '',
      clientName: design.clientName || '',
      electricianName: design.electricianName || '',
      installationType: design.installationType || 'domestic',
      generatedDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),

      // Summary
      totalLoad: design.totalLoad / 1000, // Convert to kW
      diversifiedLoad: design.diversityBreakdown?.diversifiedLoad || design.totalLoad / 1000,
      circuitCount: design.circuits.length,
      consumerUnitRating: design.consumerUnit.mainSwitchRating,
      complianceStatus: design.circuits.every((c: any) => 
        c.calculations.voltageDrop.compliant && c.calculations.zs < c.calculations.maxZs
      ) ? 'All Compliant' : 'Issues Found',

      // Diversity Breakdown
      diversityBreakdown: design.diversityBreakdown ? {
        totalConnectedLoad: design.diversityBreakdown.totalConnectedLoad,
        diversifiedLoad: design.diversityBreakdown.diversifiedLoad,
        overallDiversityFactor: (design.diversityBreakdown.overallDiversityFactor * 100).toFixed(0) + '%',
        reasoning: design.diversityBreakdown.reasoning,
        bs7671Reference: design.diversityBreakdown.bs7671Reference,
        circuitDiversity: (design.diversityBreakdown.circuitDiversity || []).map((cd: any) => ({
          circuitName: cd.circuitName,
          connectedLoad: cd.connectedLoad.toFixed(1),
          diversityFactor: (cd.diversityFactorApplied * 100).toFixed(0) + '%',
          diversifiedLoad: cd.diversifiedLoad.toFixed(1),
          justification: cd.justification
        }))
      } : null,

      // Circuits
      circuits: design.circuits.map((c: any) => ({
        circuitNumber: c.circuitNumber,
        name: c.name,
        loadType: c.loadType,
        loadPower: c.loadPower,
        loadPowerKW: (c.loadPower / 1000).toFixed(1),
        cableType: c.cableType || `${c.cableSize}mm² / ${c.cpcSize}mm² CPC`,
        cableSize: c.cableSize,
        cpcSize: c.cpcSize,
        cableLength: c.cableLength,
        protectionDevice: `${c.protectionDevice.rating}A Type ${c.protectionDevice.curve} ${c.protectionDevice.type}`,
        rcdProtected: c.rcdProtected ? 'Yes' : 'No',
        afddRequired: c.afddRequired ? 'Yes' : 'No',

        // Calculations
        designCurrent: c.calculations.Ib?.toFixed(1) || 'N/A',
        voltageDrop: `${c.calculations.voltageDrop.volts?.toFixed(1) || 'N/A'}V (${c.calculations.voltageDrop.percent?.toFixed(1) || 'N/A'}%)`,
        voltageDropCompliant: c.calculations.voltageDrop.compliant ? 'Yes' : 'No',
        zsActual: c.calculations.zs?.toFixed(2) || 'N/A',
        zsMax: c.calculations.maxZs?.toFixed(2) || 'N/A',
        zsCompliant: c.calculations.zs < c.calculations.maxZs ? 'Yes' : 'No',

        // Justifications
        cableSizeJustification: c.justifications?.cableSize || '',
        protectionJustification: c.justifications?.protection || '',
        rcdJustification: c.justifications?.rcd || '',

        // Special Location
        isSpecialLocation: c.specialLocationCompliance?.isSpecialLocation || false,
        specialLocationType: c.specialLocationCompliance?.locationType || '',
        specialLocationRequirements: (c.specialLocationCompliance?.requirements || []).join('; '),

        // Expected Test Results
        expectedR1R2: c.expectedTestResults?.r1r2?.at70C || 'N/A',
        expectedZs: c.expectedTestResults?.zs?.calculated || 'N/A',
        expectedInsulation: c.expectedTestResults?.insulationResistance?.minResistance || 'N/A',

        // Warnings
        warnings: (c.warnings || []).join('; ')
      })),

      // Materials
      materials: (design.materials || []).map((m: any) => ({
        item: m.name,
        specification: m.specification,
        quantity: m.quantity,
        unit: m.unit,
        notes: m.notes || ''
      })),

      // Consumer Unit
      consumerUnit: {
        type: design.consumerUnit.type,
        mainSwitchRating: design.consumerUnit.mainSwitchRating,
        earthingSystem: design.consumerUnit.incomingSupply.earthingSystem,
        ze: design.consumerUnit.incomingSupply.Ze?.toFixed(2) || 'N/A',
        pscc: design.consumerUnit.incomingSupply.incomingPFC || 'N/A'
      },

      // Design Warnings
      designWarnings: design.practicalGuidance || [],

      // Compliance
      complianceStatement: 'BS 7671:2018+A3:2024',
      generationTimestamp: new Date().toISOString()
    };

    console.log('[CIRCUIT-PDF] Payload prepared, calling PDF Monkey API');

    // Call PDF Monkey API
    const pdfMonkeyResponse = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PDF_MONKEY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: templateId,
          status: 'pending',
          payload: payload,
          meta: {
            _filename: `Circuit_Design_${design.projectName.replace(/\s+/g, '_')}.pdf`
          }
        }
      })
    });

    if (!pdfMonkeyResponse.ok) {
      const errorText = await pdfMonkeyResponse.text();
      const isTemplateError = pdfMonkeyResponse.status === 422 && errorText.includes('template must exist');
      
      console.error('[CIRCUIT-PDF] PDF Monkey API error:', pdfMonkeyResponse.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          useFallback: true,
          error: isTemplateError ? 'PDF template not configured' : `PDF Monkey API error: ${pdfMonkeyResponse.status}`,
          reason: isTemplateError ? 'template_missing' : 'api_error',
          details: errorText
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const pdfData = await pdfMonkeyResponse.json();
    console.log('[CIRCUIT-PDF] PDF generation initiated, document ID:', pdfData.document?.id);

    // Poll for completion
    const documentId = pdfData.document?.id;
    let attempts = 0;
    const maxAttempts = 30; // 60 seconds max

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      attempts++;

      const statusResponse = await fetch(
        `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
        {
          headers: { 'Authorization': `Bearer ${PDF_MONKEY_API_KEY}` }
        }
      );

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        const status = statusData.document?.status;

        console.log(`[CIRCUIT-PDF] Poll attempt ${attempts}/${maxAttempts}, status: ${status}`);

        if (status === 'success') {
          console.log('[CIRCUIT-PDF] PDF generation complete');
          return new Response(
            JSON.stringify({
              success: true,
              documentId: statusData.document.id,
              downloadUrl: statusData.document.download_url,
              previewUrl: statusData.document.preview_url,
              status: 'success'
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        } else if (status === 'failure') {
          console.error('[CIRCUIT-PDF] PDF generation failed');
          return new Response(
            JSON.stringify({ 
              success: false,
              useFallback: true,
              error: 'PDF generation failed',
              status: 'failure'
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }
    }

    // Timeout
    console.warn('[CIRCUIT-PDF] PDF generation timed out');
    return new Response(
      JSON.stringify({ 
        success: false,
        useFallback: true,
        error: 'PDF generation timed out',
        status: 'timeout'
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[CIRCUIT-PDF] Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        useFallback: true,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
