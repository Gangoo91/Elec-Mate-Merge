import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const COMBINED_RAMS_TEMPLATE_ID = '5BF63AF1-015E-4D45-BE84-574634897B01';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ramsData, methodData } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    console.log('Generating Combined RAMS PDF with template:', COMBINED_RAMS_TEMPLATE_ID);

    if (!pdfMonkeyApiKey) {
      console.log('PDF_MONKEY_API_KEY not configured, using fallback');
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        message: 'PDF Monkey not configured'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Merge RAMS and Method data into combined payload
    const combinedPayload = {
      projectName: ramsData.projectName,
      location: ramsData.location,
      date: ramsData.date,
      assessor: ramsData.assessor,
      contractor: methodData.contractor || ramsData.contractor,
      supervisor: methodData.supervisor || ramsData.supervisor,
      workType: methodData.workType,
      duration: methodData.duration,
      teamSize: methodData.teamSize,
      description: methodData.description,
      risks: ramsData.risks.map((risk: any) => ({
        hazard: risk.hazard,
        likelihood: risk.likelihood,
        severity: risk.severity,
        riskRating: risk.riskRating,
        riskLevel: getRiskLevel(risk.riskRating),
        controls: risk.controls,
        residualRisk: risk.residualRisk
      })),
      steps: methodData.steps?.map((step: any) => ({
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        safetyRequirements: step.safetyRequirements.join(', '),
        riskLevel: step.riskLevel.toUpperCase(),
        estimatedDuration: step.estimatedDuration
      })) || [],
      emergencyContacts: {
        siteManager: ramsData.siteManagerName,
        siteManagerPhone: ramsData.siteManagerPhone,
        firstAider: ramsData.firstAiderName,
        firstAiderPhone: ramsData.firstAiderPhone,
        safetyOfficer: ramsData.safetyOfficerName,
        safetyOfficerPhone: ramsData.safetyOfficerPhone,
        assemblyPoint: ramsData.assemblyPoint
      }
    };

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: COMBINED_RAMS_TEMPLATE_ID,
          payload: combinedPayload,
          meta: {
            _filename: `Combined_RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`
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
    const documentId = pdfResponse.document.id;
    let downloadUrl = pdfResponse.document.download_url;
    let status = pdfResponse.document.status;
    
    // Poll for completion if still generating (include 'draft' status)
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      const maxAttempts = 60;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const statusResponse = await fetch(
          `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
          {
            headers: {
              'Authorization': `Bearer ${pdfMonkeyApiKey}`,
            }
          }
        );
        
        const statusData = await statusResponse.json();
        status = statusData.document.status;
        downloadUrl = statusData.document.download_url;
        
        if (status === 'success') {
          break;
        } else if (status === 'failure') {
          throw new Error('PDF generation failed');
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      documentId: documentId,
      downloadUrl: downloadUrl,
      status: status
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-combined-rams-pdf function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      useFallback: true,
      error: error instanceof Error ? error.message : 'Failed to generate PDF'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getRiskLevel(rating: number): string {
  if (rating <= 4) return 'Low';
  if (rating <= 9) return 'Medium';
  if (rating <= 16) return 'High';
  return 'Very High';
}
