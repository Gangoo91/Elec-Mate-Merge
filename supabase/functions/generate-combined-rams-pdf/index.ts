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

    console.log('📄 Combined RAMS PDF Generation Started');
    console.log('🔧 Template ID:', COMBINED_RAMS_TEMPLATE_ID);
    console.log('📊 RAMS Data:', { 
      projectName: ramsData?.projectName, 
      risksCount: ramsData?.risks?.length,
      location: ramsData?.location 
    });
    console.log('📋 Method Data:', { 
      jobTitle: methodData?.jobTitle, 
      stepsCount: methodData?.steps?.length,
      workType: methodData?.workType
    });

    if (!pdfMonkeyApiKey) {
      console.warn('⚠️  PDF_MONKEY_API_KEY not configured');
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        message: 'PDF Monkey API key not configured',
        templateId: COMBINED_RAMS_TEMPLATE_ID
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build payload in the EXACT nested structure PDF Monkey template expects
    const payload = {
      ramsData: {
        projectName: ramsData.projectName,
        location: ramsData.location,
        date: ramsData.date,
        assessor: ramsData.assessor,
        contractor: ramsData.contractor,
        supervisor: ramsData.supervisor,
        activities: [methodData.workType || "Electrical installation work"],
        risks: ramsData.risks.map((risk: any) => ({
          id: risk.id || `risk-${risk.hazard?.substring(0, 10)}`,
          hazard: risk.hazard,
          likelihood: risk.likelihood,
          severity: risk.severity,
          riskRating: risk.riskRating,
          controls: risk.controls,
          residualRisk: risk.residualRisk,
          furtherAction: risk.furtherAction || "",
          responsible: risk.responsible || ramsData.assessor,
          actionBy: risk.actionBy || new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
          done: risk.done || false
        })),
        // Emergency contacts as individual fields (not nested object)
        siteManagerName: ramsData.siteManagerName || "",
        siteManagerPhone: ramsData.siteManagerPhone || "",
        firstAiderName: ramsData.firstAiderName || "",
        firstAiderPhone: ramsData.firstAiderPhone || "",
        safetyOfficerName: ramsData.safetyOfficerName || "",
        safetyOfficerPhone: ramsData.safetyOfficerPhone || "",
        assemblyPoint: ramsData.assemblyPoint || ""
      },
      methodStatementData: {
        jobTitle: methodData.jobTitle,
        location: methodData.location,
        contractor: methodData.contractor,
        supervisor: methodData.supervisor,
        workType: methodData.workType,
        duration: methodData.duration,
        teamSize: methodData.teamSize,
        description: methodData.description,
        overallRiskLevel: methodData.overallRiskLevel,
        reviewDate: methodData.reviewDate,
        steps: methodData.steps?.map((step: any) => ({
          id: step.id || `step-${step.stepNumber}`,
          stepNumber: step.stepNumber,
          title: step.title,
          description: step.description,
          estimatedDuration: step.estimatedDuration,
          riskLevel: step.riskLevel,
          safetyRequirements: step.safetyRequirements || [],
          equipmentNeeded: step.equipmentNeeded || [],
          qualifications: step.qualifications || [],
          isCompleted: step.isCompleted || false,
          dependencies: step.dependencies || [],
          notes: step.notes || "",
          linkedHazards: step.linkedHazards || []
        })) || [],
        id: methodData.id || "",
        approvedBy: methodData.approvedBy || "",
        createdAt: methodData.createdAt || new Date().toISOString(),
        updatedAt: methodData.updatedAt || new Date().toISOString()
      }
    };

    console.log('📤 Sending payload to PDF Monkey...');
    console.log('📦 NESTED PAYLOAD STRUCTURE:');
    console.log(JSON.stringify(payload, null, 2));
    
    console.log('📋 RAMS Data:', {
      projectName: payload.ramsData.projectName,
      risksCount: payload.ramsData.risks?.length,
      activitiesCount: payload.ramsData.activities?.length,
      hasEmergencyContacts: !!(payload.ramsData.siteManagerName || payload.ramsData.firstAiderName)
    });
    
    console.log('📋 Method Statement Data:', {
      jobTitle: payload.methodStatementData.jobTitle,
      stepsCount: payload.methodStatementData.steps?.length,
      workType: payload.methodStatementData.workType
    });

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: COMBINED_RAMS_TEMPLATE_ID,
          status: "pending",
          payload: payload,
          meta: {
            _filename: `Combined_RAMS_${ramsData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`
          }
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ PDF Monkey API Error');
      console.error('Status:', response.status);
      console.error('Response:', errorText);
      
      let errorDetails;
      try {
        errorDetails = JSON.parse(errorText);
      } catch (e) {
        errorDetails = { message: errorText };
      }
      
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        error: `PDF Monkey API error: ${response.status}`,
        details: errorDetails,
        templateId: COMBINED_RAMS_TEMPLATE_ID
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const pdfResponse = await response.json();
    const documentId = pdfResponse.document.id;
    let downloadUrl = pdfResponse.document.download_url;
    let status = pdfResponse.document.status;
    
    console.log('📨 Initial PDF Monkey Response:');
    console.log('Document ID:', documentId);
    console.log('Initial Status:', status);
    console.log('Initial Download URL:', downloadUrl ? 'Present' : 'Null');
    
    if (pdfResponse.document.meta) {
      console.log('Document Meta:', pdfResponse.document.meta);
    }
    
    // Log full response for debugging
    console.log('📄 Full PDF Monkey Response:');
    console.log(JSON.stringify(pdfResponse, null, 2));
    
    // Enhanced polling with exponential backoff
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      console.log('⏳ Document not ready, starting polling...');
      const maxAttempts = 30; // Reduced from 60
      const delays = [1000, 2000, 4000, 8000, 16000]; // Exponential backoff
      
      for (let i = 0; i < maxAttempts; i++) {
        const delay = delays[Math.min(i, delays.length - 1)];
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`🔄 Poll ${i + 1}/${maxAttempts} (wait: ${delay}ms) | Status: ${status}`);
        
        const statusResponse = await fetch(
          `https://api.pdfmonkey.io/api/v1/documents/${documentId}`,
          {
            headers: {
              'Authorization': `Bearer ${pdfMonkeyApiKey}`,
            }
          }
        );
        
        if (!statusResponse.ok) {
          console.error('❌ Status check failed:', statusResponse.status);
          const errorText = await statusResponse.text();
          console.error('Error response:', errorText);
          break;
        }
        
        const statusData = await statusResponse.json();
        const oldStatus = status;
        status = statusData.document.status;
        downloadUrl = statusData.document.download_url;
        
        if (status !== oldStatus) {
          console.log(`📊 Status changed: ${oldStatus} → ${status}`);
        }
        
        if (statusData.document.errors) {
          console.error('❌ Document errors:', statusData.document.errors);
        }
        
        if (status === 'success') {
          console.log('✅ PDF generation completed successfully');
          break;
        } else if (status === 'failure') {
          console.error('❌ PDF generation failed');
          console.error('Failure cause:', statusData.document.failure_cause);
          console.error('Generation logs:', statusData.document.generation_logs);
          console.error('Full failure details:', JSON.stringify(statusData.document, null, 2));
          return new Response(JSON.stringify({
            success: false,
            useFallback: true,
            error: 'PDF Monkey generation failed',
            details: statusData.document.errors || 'Unknown error',
            templateId: COMBINED_RAMS_TEMPLATE_ID
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // Check if PDF generation completed successfully
    if (!downloadUrl || status !== 'success') {
      console.warn('⚠️  PDF generation incomplete');
      console.warn('Final Status:', status);
      console.warn('Download URL:', downloadUrl ? 'Present' : 'Missing');
      
      return new Response(JSON.stringify({
        success: false,
        useFallback: true,
        message: `PDF generation ${status === 'draft' ? 'stuck in draft status' : 'timed out'}`,
        status: status,
        documentId: documentId,
        templateId: COMBINED_RAMS_TEMPLATE_ID,
        hint: status === 'draft' 
          ? 'Template may not be set to auto-generate mode in PDF Monkey dashboard'
          : 'Generation took too long - check template configuration'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('✅ Success! Download URL ready:', downloadUrl);
    
    return new Response(JSON.stringify({
      success: true,
      documentId: documentId,
      downloadUrl: downloadUrl,
      status: status,
      templateId: COMBINED_RAMS_TEMPLATE_ID
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Fatal error in generate-combined-rams-pdf:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      templateId: COMBINED_RAMS_TEMPLATE_ID
    });
    
    return new Response(JSON.stringify({ 
      success: false,
      useFallback: true,
      error: error instanceof Error ? error.message : 'Failed to generate PDF',
      templateId: COMBINED_RAMS_TEMPLATE_ID
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
