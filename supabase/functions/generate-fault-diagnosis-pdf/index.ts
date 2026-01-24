const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// PDF Monkey template ID for Fault Diagnosis documents
const FAULT_DIAGNOSIS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { faultDiagnosisData } = await req.json();
    const pdfMonkeyApiKey = Deno.env.get('PDF_MONKEY_API_KEY');

    console.log('🔧 Generating Fault Diagnosis PDF with template:', FAULT_DIAGNOSIS_TEMPLATE_ID);

    if (!pdfMonkeyApiKey) {
      console.log('⚠️ PDF_MONKEY_API_KEY not configured, using fallback');
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        message: 'PDF Monkey not configured'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const diagnosis = faultDiagnosisData.structuredDiagnosis || faultDiagnosisData;

    // Build payload with direct pass-through (no recalculation)
    const payload = {
      // Project metadata
      projectName: faultDiagnosisData.projectName || 'Fault Diagnosis Report',
      location: faultDiagnosisData.location || 'Not specified',
      clientName: faultDiagnosisData.clientName || 'Not specified',
      installationType: faultDiagnosisData.installationType || 'General',
      date: new Date().toISOString().split('T')[0],
      
      // Fault Summary Section
      faultSummary: {
        reportedSymptom: diagnosis.faultSummary.reportedSymptom,
        likelyRootCauses: diagnosis.faultSummary.likelyRootCauses || [],
        safetyRisk: diagnosis.faultSummary.safetyRisk,
        safetyRiskColor: getSafetyRiskColor(diagnosis.faultSummary.safetyRisk),
        immediateAction: diagnosis.faultSummary.immediateAction || '',
        secondarySymptoms: diagnosis.faultSummary.secondarySymptoms || [],
        riskToOccupants: diagnosis.faultSummary.riskToOccupants || '',
        riskToProperty: diagnosis.faultSummary.riskToProperty || '',
        typicalRepairTime: diagnosis.faultSummary.typicalRepairTime || ''
      },
      
      // Diagnostic Workflow Section (array of steps)
      diagnosticWorkflow: (diagnosis.diagnosticWorkflow || []).map((step: any) => ({
        stepNumber: step.stepNumber,
        ragStatus: step.ragStatus,
        ragStatusColor: getRAGColor(step.ragStatus),
        stepTitle: step.stepTitle,
        action: step.action,
        whatToTest: step.whatToTest,
        whatToMeasure: step.whatToMeasure || '',
        expectedReading: step.expectedReading || '',
        acceptableRange: step.acceptableRange || '',
        instrumentSetup: step.instrumentSetup || '',
        safetyWarnings: step.safetyWarnings || [],
        ifFailed: step.ifFailed || '',
        regulation: step.regulation || '',
        leadPlacement: step.leadPlacement || '',
        testDuration: step.testDuration || '',
        temperatureNotes: step.temperatureNotes || '',
        troubleshootingSequence: step.troubleshootingSequence || [],
        realWorldExample: step.realWorldExample || '',
        instrumentModel: step.instrumentModel || '',
        clientExplanation: step.clientExplanation || ''
      })),
      
      // Corrective Actions Section
      correctiveActions: (diagnosis.correctiveActions || []).map((action: any) => ({
        forSymptom: action.forSymptom,
        action: action.action,
        detailedProcedure: action.detailedProcedure || [],
        stepByStepFix: action.stepByStepFix || [],
        whyThisWorks: action.whyThisWorks || '',
        alternativeMethods: action.alternativeMethods || [],
        tools: action.tools || [],
        estimatedTime: action.estimatedTime || '',
        verificationTest: action.verificationTest || '',
        materialsCost: action.materialsCost || '',
        skillLevel: action.skillLevel || 'qualified',
        partNumbers: action.partNumbers || [],
        bs7671Reference: action.bs7671Reference || '',
        commonBrands: action.commonBrands || [],
        safetyNotes: action.safetyNotes || []
      })),
      
      // Lockout/Tagout Section
      lockoutTagout: diagnosis.lockoutTagout ? {
        required: diagnosis.lockoutTagout.required,
        procedure: diagnosis.lockoutTagout.procedure || [],
        isolationPoints: diagnosis.lockoutTagout.isolationPoints || []
      } : { required: false, procedure: [], isolationPoints: [] },
      
      // Additional Context Section
      additionalContext: diagnosis.additionalContext ? {
        commonMistakes: diagnosis.additionalContext.commonMistakes || [],
        proTips: diagnosis.additionalContext.proTips || [],
        regulations: diagnosis.additionalContext.regulations || []
      } : { commonMistakes: [], proTips: [], regulations: [] },
      
      // Cost Estimate Section
      costEstimate: diagnosis.costEstimate ? {
        materials: diagnosis.costEstimate.materials || '£0',
        labour: diagnosis.costEstimate.labour || '£0',
        total: diagnosis.costEstimate.total || '£0',
        notes: diagnosis.costEstimate.notes || ''
      } : null,
      
      // Client Communication Section
      clientCommunication: diagnosis.clientCommunication ? {
        summary: diagnosis.clientCommunication.summary,
        urgencyExplanation: diagnosis.clientCommunication.urgencyExplanation,
        whatToExpect: diagnosis.clientCommunication.whatToExpect,
        quotationNotes: diagnosis.clientCommunication.quotationNotes || ''
      } : null,
      
      // Documentation Requirements Section
      documentationRequirements: diagnosis.documentationRequirements ? {
        testsToRecord: diagnosis.documentationRequirements.testsToRecord || [],
        certificatesNeeded: diagnosis.documentationRequirements.certificatesNeeded || [],
        notesForEIC: diagnosis.documentationRequirements.notesForEIC || ''
      } : null
    };

    console.log('📦 Payload built:', JSON.stringify({ 
      workflow_steps: payload.diagnosticWorkflow.length,
      corrective_actions: payload.correctiveActions.length,
      safety_risk: payload.faultSummary.safetyRisk
    }));

    const response = await fetch('https://api.pdfmonkey.io/api/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pdfMonkeyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document: {
          document_template_id: FAULT_DIAGNOSIS_TEMPLATE_ID,
          status: "pending",
          payload: payload,
          meta: {
            _filename: `Fault-Diagnosis-${faultDiagnosisData.projectName?.replace(/[^a-z0-9]/gi, '_') || Date.now()}.pdf`
          }
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ PDF Monkey API error:', response.status, errorText);
      throw new Error(`PDF Monkey API error: ${response.status}`);
    }

    const pdfResponse = await response.json();
    const documentId = pdfResponse.document.id;
    let downloadUrl = pdfResponse.document.download_url;
    let status = pdfResponse.document.status;
    
    // Poll for completion if still generating
    if (status === 'draft' || status === 'pending' || status === 'generating') {
      const maxAttempts = 60;
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log(`🔄 Polling attempt ${i + 1}/${maxAttempts}, current status: ${status}`);
        
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
          console.log('✅ PDF generation completed successfully');
          break;
        } else if (status === 'failure') {
          throw new Error('PDF generation failed');
        }
      }
    }

    // Check if PDF generation completed successfully
    if (!downloadUrl || status !== 'success') {
      console.log('⏱️ PDF generation timed out or incomplete', { status, downloadUrl });
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
    console.error('❌ Error in generate-fault-diagnosis-pdf function:', error);
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

function getSafetyRiskColor(risk: string): string {
  switch (risk) {
    case 'CRITICAL': return '#DC2626'; // Red
    case 'HIGH': return '#EA580C';     // Orange
    case 'MODERATE': return '#D97706'; // Amber
    case 'LOW': return '#16A34A';      // Green
    default: return '#6B7280';         // Gray
  }
}

function getRAGColor(status: string): string {
  switch (status) {
    case 'RED': return '#DC2626';
    case 'AMBER': return '#D97706';
    case 'GREEN': return '#16A34A';
    default: return '#6B7280';
  }
}
