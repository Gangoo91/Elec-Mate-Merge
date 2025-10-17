import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Placeholder template ID - replace with actual PDF Monkey template ID
const METHOD_STATEMENT_TEMPLATE_ID = 'PLACEHOLDER-METHOD-STATEMENT-TEMPLATE-ID';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { methodData } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    console.log('Generating Method Statement PDF with template:', METHOD_STATEMENT_TEMPLATE_ID);

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

    // Prepare payload for PDF Monkey template
    const payload = {
      jobTitle: methodData.jobTitle,
      location: methodData.location,
      contractor: methodData.contractor,
      supervisor: methodData.supervisor,
      workType: methodData.workType,
      duration: methodData.duration,
      teamSize: methodData.teamSize,
      description: methodData.description,
      overallRiskLevel: methodData.overallRiskLevel?.toUpperCase(),
      reviewDate: methodData.reviewDate,
      steps: methodData.steps?.map((step: any) => ({
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        safetyRequirements: Array.isArray(step.safetyRequirements) 
          ? step.safetyRequirements.join(', ') 
          : step.safetyRequirements,
        estimatedDuration: step.estimatedDuration,
        riskLevel: step.riskLevel?.toUpperCase()
      })) || []
    };

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: METHOD_STATEMENT_TEMPLATE_ID,
          status: "pending",
          payload: payload,
          meta: {
            _filename: `Method_Statement_${methodData.jobTitle?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`
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
        
        console.log(`Polling attempt ${i + 1}/${maxAttempts}, current status: ${status}`);
        
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
          console.log('PDF generation completed successfully');
          break;
        } else if (status === 'failure') {
          throw new Error('PDF generation failed');
        }
      }
    }

    // Check if PDF generation completed successfully
    if (!downloadUrl || status !== 'success') {
      console.log('PDF generation timed out or incomplete', { status, downloadUrl });
      return new Response(JSON.stringify({
        success: false,
        useFallback: true,
        message: 'PDF generation timed out'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
    console.error('Error in generate-method-statement-pdf function:', error);
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
