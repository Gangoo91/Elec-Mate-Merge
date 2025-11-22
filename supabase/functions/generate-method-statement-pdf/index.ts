import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { emergencyProcedures } from '../_shared/emergencyProcedures.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * PDF Monkey Template: 9ABC438D-8E08-4FC3-BC12-CFC3BCB0DB3C
 * 
 * Template expects step-specific hazard data in pure method statement format:
 * - steps[].linkedHazards: comma-separated string of step-specific hazards
 * - steps[].safetyRequirements: comma-separated string (includes H&S controls)
 * - steps[].riskLevel: uppercase enum (LOW/MEDIUM/HIGH)
 * - NO standalone risk assessment section (hazards embedded in steps)
 * 
 * H&S Agent uses linkedToStep field:
 * - linkedToStep: 1-N maps hazards to specific steps
 * - linkedToStep: 0 indicates general site hazards (added to Step 1)
 */
const METHOD_STATEMENT_TEMPLATE_ID = '9ABC438D-8E08-4FC3-BC12-CFC3BCB0DB3C';

/**
 * Transform tools and materials into structured equipment schedule
 */
function createEquipmentSchedule(toolsRequired: string[] = [], materialsRequired: string[] = []) {
  const schedule = [];
  
  // Tools section
  toolsRequired.forEach((tool, index) => {
    schedule.push({
      itemNumber: index + 1,
      type: 'Tool',
      description: tool,
      quantity: '1 set',
      inspectionRequired: isInspectableEquipment(tool),
      inspectionFrequency: isInspectableEquipment(tool) ? 'Before use' : 'N/A'
    });
  });
  
  // Materials section
  materialsRequired.forEach((material, index) => {
    schedule.push({
      itemNumber: toolsRequired.length + index + 1,
      type: 'Material',
      description: material,
      quantity: 'As required',
      inspectionRequired: false,
      inspectionFrequency: 'N/A'
    });
  });
  
  return schedule;
}

/**
 * Check if equipment requires inspection
 */
function isInspectableEquipment(tool: string): boolean {
  const inspectableKeywords = ['ladder', 'scaffold', 'drill', 'meter', 'tester', 'rcd', 'mft', 'megger'];
  return inspectableKeywords.some(keyword => tool.toLowerCase().includes(keyword));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('📥 Received request body keys:', Object.keys(requestBody));
    
    const methodData = requestBody.methodData || requestBody.methodStatement;
    
    if (!methodData) {
      console.error('❌ No method data found in request. Body keys:', Object.keys(requestBody));
      return new Response(JSON.stringify({ 
        success: false,
        useFallback: true,
        error: 'No method data provided. Expected methodData or methodStatement in request body.'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('✅ Method data received. Keys:', Object.keys(methodData));
    
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

    // ✅ ALIGNED TO JSON SCHEMA - camelCase field mapping (FLATTENED - NO WRAPPER)
    const payload = {
      // Project Metadata (exact schema match)
      projectMetadata: methodData.projectMetadata || {
        documentRef: methodData.projectMetadata?.documentRef || `MS-${Date.now()}`,
        issueDate: methodData.projectMetadata?.issueDate || new Date().toISOString().split('T')[0],
        reviewDate: methodData.projectMetadata?.reviewDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
        companyName: methodData.projectMetadata?.companyName || '',
        contractor: methodData.projectMetadata?.contractor || methodData.contractor || '',
        siteManagerName: methodData.projectMetadata?.siteManagerName || methodData.siteManagerName || '',
        siteManagerPhone: methodData.projectMetadata?.siteManagerPhone || methodData.siteManagerPhone || '',
        firstAiderName: methodData.projectMetadata?.firstAiderName || methodData.firstAiderName || '',
        firstAiderPhone: methodData.projectMetadata?.firstAiderPhone || methodData.firstAiderPhone || '',
        safetyOfficerName: methodData.projectMetadata?.safetyOfficerName || methodData.safetyOfficerName || '',
        safetyOfficerPhone: methodData.projectMetadata?.safetyOfficerPhone || methodData.safetyOfficerPhone || '',
        assemblyPoint: methodData.projectMetadata?.assemblyPoint || methodData.assemblyPoint || '',
        startDate: methodData.projectMetadata?.startDate || '',
        completionDate: methodData.projectMetadata?.completionDate || '',
        siteSupervisor: methodData.projectMetadata?.siteSupervisor || methodData.supervisor || '',
        clientContact: methodData.projectMetadata?.clientContact || '',
        preparedByName: methodData.projectMetadata?.preparedByName || '',
        preparedByPosition: methodData.projectMetadata?.preparedByPosition || '',
        preparedDate: methodData.projectMetadata?.preparedDate || '',
        authorisedByName: methodData.projectMetadata?.authorisedByName || '',
        authorisedByPosition: methodData.projectMetadata?.authorisedByPosition || '',
        authorisedDate: methodData.projectMetadata?.authorisedDate || ''
      },

      // Executive Summary (exact schema match)
      executiveSummary: methodData.executiveSummary || {
        cableType: '',
        cableSize: '',
        runLength: '',
        installationMethod: '',
        supplyType: '',
        protectiveDevice: '',
        voltageDrop: '',
        zsRequirement: '',
        purpose: ''
      },
      
      // Materials List (exact schema match)
      materialsList: (methodData.materialsList || []).map((material: any) => ({
        description: material.description || '',
        specification: material.specification || '',
        quantity: material.quantity || '',
        unit: material.unit || '',
        notes: material.notes || ''
      })),

      // Installation Steps (exact schema match with camelCase)
      steps: (methodData.steps || []).map((step: any) => ({
        id: step.id || `step-${step.step || step.stepNumber}`,
        stepNumber: step.step || step.stepNumber,
        title: step.title,
        description: step.description,
        estimatedDuration: step.duration || step.estimatedDuration || 'Not specified',
        riskLevel: step.riskLevel || 'MEDIUM',
        safetyRequirements: step.safetyNotes || step.safetyRequirements || [],
        equipmentNeeded: step.tools || step.equipmentNeeded || [],
        materialsNeeded: step.materials || step.materialsNeeded || [],
        personnel: step.personnel || '',
        bsReferences: step.bsReferences || [],
        linkedHazards: step.linkedHazards || [],
        inspectionCheckpoints: step.inspectionCheckpoints || [],
        isCompleted: step.isCompleted || false,
        dependencies: step.dependencies || [],
        notes: step.notes || ''
      })),
      
      // Testing Requirements (exact schema match)
      testingRequirements: (methodData.testingRequirements || []).map((test: any) => ({
        description: test.description || '',
        regulation: test.regulation || '',
        expectedReading: test.expectedReading || '',
        passRange: test.passRange || ''
      })),
      
      // Regulatory References (exact schema match)
      regulatoryReferences: (methodData.regulatoryReferences || []).map((ref: any) => ({
        number: ref.number || '',
        description: ref.description || ''
      })),

      // Installation Hazards (NEW - Section 5, exact schema match)
      installationHazards: methodData.installationHazards || null,

      // Scope of Work (exact schema match)
      scopeOfWork: methodData.scopeOfWork || {
        description: '',
        keyDeliverables: [],
        exclusions: ''
      },
      
      // Schedule Details (exact schema match)
      scheduleDetails: methodData.scheduleDetails || {
        workingHours: '',
        teamSize: '',
        weatherDependency: '',
        accessRequirements: '',
        estimatedDuration: methodData.duration || ''
      },

      // Practical Tips (exact schema match)
      practicalTips: methodData.practicalTips || [],

      // Common Mistakes (exact schema match)
      commonMistakes: methodData.commonMistakes || [],

      // RAG Citations (exact schema match)
      ragCitations: methodData.ragCitations || [],
      
      // Legacy/backward compatibility fields
      projectName: methodData.projectName || '',
      jobTitle: methodData.jobTitle || 'Installation Method Statement',
      location: methodData.location || 'Site location',
      contractor: methodData.contractor || '',
      supervisor: methodData.supervisor || '',
      workType: methodData.workType || 'Electrical installation',
      duration: methodData.duration || 'Variable',
      teamSize: methodData.teamSize || '1-2 persons',
      description: methodData.description || '',
      overallRiskLevel: methodData.overallRiskLevel || 'MEDIUM',
      reviewDate: methodData.reviewDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      
      // Emergency contacts (backward compatibility)
      siteManagerName: methodData.siteManagerName || '',
      siteManagerPhone: methodData.siteManagerPhone || '',
      firstAiderName: methodData.firstAiderName || '',
      firstAiderPhone: methodData.firstAiderPhone || '',
      safetyOfficerName: methodData.safetyOfficerName || '',
      safetyOfficerPhone: methodData.safetyOfficerPhone || '',
      assemblyPoint: methodData.assemblyPoint || '',
      
      // Competency Matrix
      competencyMatrix: methodData.competencyMatrix || {},
      
      // Emergency Procedures (static)
      emergencyProcedures: {
        electricShock: emergencyProcedures.electricShock,
        arcFlash: emergencyProcedures.arcFlash,
        fire: emergencyProcedures.fire
      },
      
      id: methodData.id || '',
      approvedBy: methodData.approvedBy || '',
      createdAt: methodData.createdAt || new Date().toISOString(),
      updatedAt: methodData.updatedAt || new Date().toISOString(),
      
      // Legacy fields
      toolsRequired: methodData.toolsRequired || [],
      materialsRequired: methodData.materialsRequired || [],
      totalEstimatedTime: methodData.totalEstimatedTime || '',
      difficultyLevel: methodData.difficultyLevel || '',
      complianceRegulations: methodData.complianceRegulations || [],
      complianceWarnings: methodData.complianceWarnings || [],
      
      // Equipment & Schedules
      equipmentSchedule: createEquipmentSchedule(
        methodData.toolsRequired,
        methodData.materialsRequired
      ),
      qualityRequirements: methodData.qualityRequirements || [],
      testingProcedures: methodData.testingProcedures || [],
      siteLogistics: methodData.siteLogistics || {},
      competencyRequirements: methodData.competencyRequirements || {},
      conditionalFlags: methodData.conditionalFlags || {},
      workAtHeightEquipment: methodData.workAtHeightEquipment || []
    };

    console.log('📤 Sending payload to PDF Monkey (FLATTENED - no wrapper)...');
    console.log('📦 Method Statement Data:', {
      jobTitle: payload.jobTitle,
      stepsCount: payload.steps?.length,
      toolsCount: payload.toolsRequired?.length,
      materialsCount: payload.materialsRequired?.length,
      workType: payload.workType
    });

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
      publicUrl: downloadUrl,
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
