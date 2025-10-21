import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // Prepare comprehensive payload for PDF Monkey template
    const payload = {
      // Document metadata
      document_ref: `MS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      issue_date: new Date().toLocaleDateString('en-GB'),
      
      // Core method statement data
      jobTitle: methodData.jobTitle || 'Installation Method Statement',
      location: methodData.location || 'Site location',
      contractor: methodData.contractor || 'Contractor name',
      supervisor: methodData.supervisor || 'Site supervisor',
      workType: methodData.workType || 'Electrical installation',
      duration: methodData.duration || 'Variable',
      teamSize: methodData.teamSize || '1-2 persons',
      description: methodData.description || '',
      overallRiskLevel: (methodData.overallRiskLevel || 'medium').toUpperCase(),
      reviewDate: methodData.reviewDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      
      // Installation steps (enriched with inspection checkpoints and hazards)
      steps: (methodData.steps || []).map((step: any) => ({
        stepNumber: step.stepNumber,
        title: step.title,
        description: step.description,
        safetyRequirements: Array.isArray(step.safetyRequirements) 
          ? step.safetyRequirements.join(', ') 
          : (step.safetyRequirements || ''),
        estimatedDuration: step.estimatedDuration || 'Not specified',
        riskLevel: (step.riskLevel || 'medium').toUpperCase(),
        inspectionCheckpoints: Array.isArray(step.inspectionCheckpoints) 
          ? step.inspectionCheckpoints.join(', ') 
          : '',
        linkedHazards: Array.isArray(step.linkedHazards) 
          ? step.linkedHazards.join(', ') 
          : ''
      })),
      
      // Debug logging
      _debug_total_steps: (methodData.steps || []).length,
      _debug_steps_with_hazards: (methodData.steps || []).filter((s: any) => s.linkedHazards && s.linkedHazards.length > 0).length,
      
      // Equipment schedule (from maintenance agent)
      equipment_list: (methodData.equipmentSchedule || []).map((eq: any) => ({
        name: eq.name,
        quantity: eq.quantity || '1 No.',
        certification: eq.certification || 'N/A',
        inspection: eq.inspection || 'Daily',
        responsible: eq.responsible || 'Site Supervisor'
      })),
      
      // Quality requirements (from maintenance agent)
      quality_requirements: (methodData.qualityRequirements || []).map((qr: any) => ({
        stage: qr.stage,
        requirement: qr.requirement,
        criteria: qr.criteria
      })),
      
      // Testing & commissioning (from maintenance agent)
      testing_commissioning: methodData.conditionalFlags?.testing_commissioning !== false,
      testing_procedures: (methodData.testingProcedures || []).map((tp: any) => ({
        name: tp.name,
        standard: tp.standard || 'BS 7671:2018+A3:2024',
        criteria: tp.criteria,
        certification: tp.certification || 'EIC'
      })),
      
      // Site logistics (from H&S agent)
      vehicle_access: methodData.siteLogistics?.vehicleAccess || 'Via main entrance',
      parking: methodData.siteLogistics?.parking || 'On-site parking available',
      material_storage: methodData.siteLogistics?.materialStorage || 'Secure compound',
      waste_management: methodData.siteLogistics?.wasteManagement || 'Segregated waste bins',
      welfare_facilities: methodData.siteLogistics?.welfareFacilities || 'On-site facilities',
      site_restrictions: methodData.siteLogistics?.siteRestrictions || 'None specified',
      
      // Competency requirements (from H&S agent)
      competency_requirements: methodData.competencyRequirements?.minimumQualifications || '18th Edition BS 7671:2018+A3:2024',
      training_required: methodData.competencyRequirements?.mandatoryTraining || 'Site induction, Manual Handling',
      supervision_level: methodData.competencyRequirements?.supervisionLevel || 'Continuous supervision',
      
      // Conditional flags (from all agents)
      work_at_height: methodData.conditionalFlags?.work_at_height || false,
      wah_equipment: Array.isArray(methodData.workAtHeightEquipment) 
        ? methodData.workAtHeightEquipment.join(', ') 
        : '',
      services_utilities: methodData.conditionalFlags?.services_utilities || false,
      hot_works: methodData.conditionalFlags?.hot_works || false,
      confined_spaces: methodData.conditionalFlags?.confined_spaces || false,
      client_liaison: methodData.conditionalFlags?.client_liaison !== false,
      noise_dust_controls: methodData.conditionalFlags?.noise_dust_controls || false,
      environmental_considerations: methodData.conditionalFlags?.environmental_considerations || false
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
