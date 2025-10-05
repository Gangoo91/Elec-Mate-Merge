import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planData, result } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    if (!pdfMonkeyApiKey) {
      throw new Error('PDF Monkey API key not configured');
    }

    console.log('Generating PDF for installation plan');

    // Prepare data for PDF template
    const pdfData = {
      date: new Date().toLocaleDateString('en-GB'),
      planReference: `IP-${Date.now()}`,
      
      // Project details
      installationType: planData.installationType || 'domestic',
      loadType: planData.loadType,
      totalLoad: planData.totalLoad,
      designCurrent: (planData.totalLoad / planData.voltage).toFixed(1),
      voltage: planData.voltage,
      phases: planData.phases,
      cableLength: planData.cableLength,
      location: planData.location,
      cableRun: planData.installationMethod,
      
      // Results
      cableSize: result.recommendedCableSize,
      cableType: planData.cableType,
      capacity: result.capacity,
      deratedCapacity: result.deratedCapacity.toFixed(1),
      protectiveDevice: result.protectiveDevice,
      voltageDrop: result.voltageDrop.toFixed(2),
      voltageDropPercent: result.voltageDropPercent.toFixed(2),
      zs: result.zs.toFixed(3),
      safetyMargin: result.safetyMargin.toFixed(1),
      
      // Environmental
      ambientTemp: planData.environmentalProfile.finalApplied.ambientTemp,
      tempFactor: result.factors.temperature,
      grouping: planData.environmentalProfile.finalApplied.grouping,
      groupingFactor: result.factors.grouping,
      overallFactor: result.factors.overall.toFixed(2),
      earthing: planData.environmentalProfile.finalApplied.earthing,
      ze: planData.environmentalProfile.finalApplied.ze,
      
      // Compliance
      compliant: result.compliant,
      compliancePercent: result.compliant ? 100 : 0,
      
      // Materials
      materials: result.materials.map(m => ({
        name: m.name,
        specification: m.specification,
        quantity: m.quantity,
        unitCost: '0.00', // Would need actual pricing
        totalCost: '0.00'
      })),
      
      // Costs
      materialsCost: result.costEstimate.total,
      labourCost: (parseFloat(result.costEstimate.total) * 1.5).toFixed(2),
      subtotal: (parseFloat(result.costEstimate.total) * 2.5).toFixed(2),
      vat: (parseFloat(result.costEstimate.total) * 2.5 * 0.2).toFixed(2),
      totalCost: (parseFloat(result.costEstimate.total) * 2.5 * 1.2).toFixed(2),
      
      // Guidance
      practicalGuidance: result.practicalGuidance.map(g => ({
        title: g.title,
        points: g.points
      })),
      
      warnings: result.warnings,
      recommendations: result.recommendations
    };

    // Call PDF Monkey API
    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: 'YOUR_TEMPLATE_ID', // User needs to provide this after creating template
          payload: pdfData,
          meta: {
            _filename: `Installation_Plan_${pdfData.planReference}.pdf`
          }
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PDF Monkey API error:', response.status, errorText);
      throw new Error(`PDF Monkey API error: ${response.status}`);
    }

    const pdfResponse = await response.json();
    console.log('PDF generated successfully');

    return new Response(JSON.stringify({
      success: true,
      documentId: pdfResponse.document.id,
      downloadUrl: pdfResponse.document.download_url,
      status: pdfResponse.document.status
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-install-plan-pdf function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to generate PDF',
      details: error instanceof Error ? error.stack : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
