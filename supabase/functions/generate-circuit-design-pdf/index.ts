import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const PDF_MONKEY_API_KEY = Deno.env.get('PDF_MONKEY_API_KEY');
const CIRCUIT_DESIGN_TEMPLATE_ID = 'DF1DE972-30B4-45F9-83C0-4CEB4DE90E70';

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

    // Get user's custom template if configured
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

    // ✨ DIRECT PASS-THROUGH: No fallbacks, no computation, no transformation
    // Frontend sends complete data, we just pass it to PDF Monkey with minimal metadata
    const payload = {
      // === METADATA (only things we add) ===
      generatedDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      date: new Date().toLocaleDateString('en-GB'),
      designReference: `REF-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      
      // === PASS-THROUGH: Everything else comes directly from frontend ===
      projectName: design.projectName,
      location: design.location,
      clientName: design.clientName,
      electricianName: design.electricianName,
      installationType: design.installationType,
      
      // Consumer Unit
      consumerUnit: design.consumerUnit,
      voltage: design.consumerUnit?.incomingSupply?.voltage,
      phases: design.consumerUnit?.incomingSupply?.phases === 'single' ? 'Single Phase' : 'Three Phase',
      voltageDisplay: `${design.consumerUnit?.incomingSupply?.voltage}V ${design.consumerUnit?.incomingSupply?.phases === 'single' ? 'Single Phase' : 'Three Phase'}`,
      earthingSystem: design.consumerUnit?.incomingSupply?.earthingSystem,
      ze: design.consumerUnit?.incomingSupply?.Ze,
      pscc: design.consumerUnit?.incomingSupply?.incomingPFC,
      consumerUnitRating: design.consumerUnit?.mainSwitchRating,
      
      // Load Assessment (direct from frontend)
      totalLoad: design.totalLoad,
      totalLoadKW: design.totalLoad ? `${(design.totalLoad / 1000).toFixed(1)} kW` : null,
      diversifiedLoad: design.diversifiedLoad,
      diversifiedLoadKW: design.diversifiedLoad ? `${(design.diversifiedLoad / 1000).toFixed(1)} kW` : null,
      diversityFactor: design.diversityFactor,
      diversityFactorPercent: design.diversityFactor,
      totalDesignCurrent: design.totalDesignCurrent,
      
      // Diversity Breakdown (direct pass-through)
      diversityBreakdown: design.diversityBreakdown,
      
      // Circuit counts
      circuitCount: design.circuits?.length || 0,
      totalCircuits: design.circuits?.length || 0,
      
      // Compliance Status (direct from frontend calculations)
      complianceChecks: design.complianceChecks,
      allCircuitsCompliant: design.complianceChecks?.allCircuitsCompliant,
      complianceStatus: design.complianceChecks?.allCircuitsCompliant ? 'All Compliant' : 'Issues Found',
      warningCount: design.complianceChecks?.totalWarnings || 0,
      compliantCircuits: (design.circuits?.length || 0) - (design.complianceChecks?.criticalIssues || 0),
      
      // Circuits (direct pass-through with no transformation)
      circuits: (design.circuits || []).map((c: any) => ({
        // Basic Info
        circuitNumber: c.circuitNumber,
        name: c.name,
        loadType: c.loadType,
        loadPower: c.loadPower,
        loadPowerKW: c.loadPower ? (c.loadPower / 1000).toFixed(1) : null,
        phases: c.phases === 'single' ? 'Single Phase' : 'Three Phase',
        
        // Cable Specification (direct from frontend - NO FALLBACKS)
        cableType: c.cableType,
        cableSize: c.cableSize,
        cpcSize: c.cpcSize,
        cableLength: c.cableLength,
        installationMethod: c.installationMethod,
        
        // Protection Device
        protectionDevice: c.protectionDevice ? 
          `${c.protectionDevice.rating}A Type ${c.protectionDevice.curve} ${c.protectionDevice.type}` : null,
        protectionRating: c.protectionDevice?.rating,
        protectionCurve: c.protectionDevice?.curve,
        protectionType: c.protectionDevice?.type,
        protectionKaRating: c.protectionDevice?.kaRating,
        rcdProtected: c.rcdProtected ? 'Yes' : 'No',
        rcdProtectedText: c.rcdProtected ? 'Yes (30mA)' : 'No',
        afddRequired: c.afddRequired ? 'Yes' : 'No',
        
        // Calculations (direct pass-through)
        designCurrent: c.calculations?.Ib?.toFixed(1),
        designCurrentIb: c.calculations?.Ib?.toFixed(1),
        nominalCurrentIn: c.protectionDevice?.rating,
        cableCapacityIz: c.calculations?.Iz?.toFixed(0),
        deratedCapacity: c.calculations?.deratedCapacity?.toFixed(0),
        safetyMargin: c.calculations?.safetyMargin?.toFixed(0),
        voltageDrop: c.calculations?.voltageDrop ? 
          `${c.calculations.voltageDrop.volts?.toFixed(1)}V (${c.calculations.voltageDrop.percent?.toFixed(1)}%)` : null,
        voltageDropVolts: c.calculations?.voltageDrop?.volts?.toFixed(1),
        voltageDropPercent: c.calculations?.voltageDrop?.percent?.toFixed(1),
        voltageDropCompliant: c.calculations?.voltageDrop?.compliant ? 'Yes' : 'No',
        zsActual: c.calculations?.zs?.toFixed(2),
        zsMax: c.calculations?.maxZs?.toFixed(2),
        zsCompliant: (c.calculations?.zs && c.calculations?.maxZs && c.calculations.zs < c.calculations.maxZs) ? 'Yes' : 'No',
        calculations: c.calculations,
        
        // Compliance Status (direct from Phase 5.5)
        complianceStatus: c.complianceStatus,
        complianceStatusText: c.complianceStatus === 'pass' ? '✓ PASS' : 
                             c.complianceStatus === 'warning' ? '⚠ REVIEW' : '✗ FAIL',
        complianceStatusColour: c.complianceStatus === 'pass' ? 'green' : 
                                c.complianceStatus === 'warning' ? 'amber' : 'red',
        validationIssues: c.validationIssues || [],
        hasValidationIssues: (c.validationIssues?.length || 0) > 0,
        
        // Justifications (direct pass-through)
        justifications: c.justifications,
        justificationCable: c.justifications?.cableSize,
        cableSizeJustification: c.justifications?.cableSize,
        justificationProtection: c.justifications?.protection,
        protectionJustification: c.justifications?.protection,
        justificationRcd: c.justifications?.rcd,
        rcdJustification: c.justifications?.rcd,
        
        // Expected Test Results (direct pass-through)
        expectedTests: c.expectedTests,
        expectedTestResults: c.expectedTestResults,
        expectedR1R2: c.expectedTests?.r1r2?.at70C?.toFixed(3) || c.expectedTestResults?.r1r2?.at70C,
        expectedZs: c.expectedTests?.zs?.expected?.toFixed(2) || c.calculations?.zs?.toFixed(2),
        expectedInsulation: c.expectedTests?.insulationResistance?.minResistance || c.expectedTestResults?.insulationResistance?.minResistance,
        
        // Derating Factors (direct pass-through)
        deratingFactors: c.deratingFactors,
        
        // Fault Current Analysis (direct pass-through)
        faultCurrentAnalysis: c.faultCurrentAnalysis,
        
        // Earthing Requirements (direct pass-through)
        earthingRequirements: c.earthingRequirements,
        
        // Installation Guidance (direct pass-through)
        installationGuidance: c.installationGuidance,
        fullInstallationGuidance: c.fullInstallationGuidance,
        guidanceQualityMetrics: c.guidanceQualityMetrics,
        
        // Special Locations (direct pass-through)
        isSpecialLocation: c.specialLocationCompliance?.isSpecialLocation,
        specialLocationType: c.specialLocationCompliance?.locationType,
        specialLocationRequirements: c.specialLocationCompliance?.requirements?.join('; '),
        specialLocationRegulation: c.specialLocationCompliance?.regulation,
        
        // Diversity
        diversityFactor: c.diversityFactor ? `${(c.diversityFactor * 100).toFixed(0)}%` : null,
        diversityJustification: c.diversityJustification,
        
        // Warnings
        warnings: c.warnings?.join('; '),
        hasWarnings: (c.warnings?.length || 0) > 0
      })),
      
      // Materials (direct pass-through)
      materials: design.materials,
      
      // Design Notes (direct pass-through)
      designNotes: design.designNotes,
      
      // Practical Guidance (direct pass-through)
      practicalGuidance: design.practicalGuidance,
      
      // Installation Guidance (direct pass-through)
      installationGuidance: design.installationGuidance,
      
      // Compliance
      complianceStatement: 'BS 7671:2018+A3:2024',
      generationTimestamp: new Date().toISOString()
    };

    // Log missing data warnings (but don't generate fake data)
    const missingDataWarnings: string[] = [];
    
    payload.circuits.forEach((c: any, idx: number) => {
      if (!c.cableType) missingDataWarnings.push(`Circuit ${idx + 1}: Missing cableType`);
      if (!c.installationMethod) missingDataWarnings.push(`Circuit ${idx + 1}: Missing installationMethod`);
      if (!c.expectedTests && !c.expectedTestResults) missingDataWarnings.push(`Circuit ${idx + 1}: Missing expected test results`);
    });
    
    if (missingDataWarnings.length > 0) {
      console.warn('[CIRCUIT-PDF] Missing data detected:', missingDataWarnings);
    }

    // Validation logging
    console.log('[CIRCUIT-PDF] Payload summary:', {
      projectName: payload.projectName,
      circuitCount: payload.circuits.length,
      totalLoad: payload.totalLoad,
      diversifiedLoad: payload.diversifiedLoad,
      complianceStatus: payload.complianceStatus,
      missingDataCount: missingDataWarnings.length
    });

    console.log('[CIRCUIT-PDF] Calling PDF Monkey API');

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
            _filename: `Circuit_Design_${design.projectName?.replace(/\s+/g, '_') || 'Export'}.pdf`
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
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
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
