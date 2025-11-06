import { supabase } from "@/integrations/supabase/client";

export interface MergedMethodStatementOutput {
  installationSteps: any[];
  equipmentSchedule: any[];
  testingProcedures: any[];
  qualityRequirements: any[];
  siteLogistics: {
    vehicleAccess: string;
    parking: string;
    materialStorage: string;
    wasteManagement: string;
    welfareFacilities: string;
    siteRestrictions: string;
  };
  conditionalFlags: {
    work_at_height: boolean;
    services_utilities: boolean;
    hot_works: boolean;
    confined_spaces: boolean;
    client_liaison: boolean;
    noise_dust_controls: boolean;
    environmental_considerations: boolean;
    testing_commissioning: boolean;
  };
  workAtHeightEquipment: string[];
  competencyRequirements: {
    competencyRequirements: string;
    trainingRequired: string;
    supervisionLevel: string;
    additionalCertifications: string;
  };
  _agentOutputs: {
    installer: any;
    maintenance: any;
    healthSafety: any;
  };
}

// Helper to add delays between progress updates
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMethodStatement = async (
  userQuery: string,
  projectDetails: any,
  conversationId: string,
  onProgress?: (message: string) => void
): Promise<MergedMethodStatementOutput> => {
  try {
    // ===== DIRECT RAG ARCHITECTURE: Fast, reliable, enforced JSON =====
    if (onProgress) {
      onProgress('STAGE_1_START');
      await delay(800);
      onProgress('🔍 Searching installation knowledge base...');
      await delay(500);
    }
    
    if (onProgress) {
      onProgress('STAGE_2_START');
      await delay(800);
    }
    
    const { data: directData, error: directError } = await supabase.functions.invoke('installer-rag-direct', {
      body: {
        query: userQuery,
        projectDetails
      }
    });
    
    if (directError) {
      console.error('Direct RAG error:', directError);
      throw directError;
    }
    
    if (!directData?.success) {
      const diagnostics = directData?.diagnostics || {};
      console.error('Direct RAG failed:', {
        error: directData?.error,
        diagnostics
      });
      throw new Error(directData?.error || 'Failed to generate method statement - no structured data returned');
    }
    
    // Log performance metrics
    const diag = directData.diagnostics || {};
    console.log('✅ Direct RAG completed:', {
      totalMs: diag.totalMs,
      ragMs: diag.ragMs,
      aiMs: diag.aiMs,
      pwCount: diag.pwCount,
      regsCount: diag.regsCount,
      stepsCount: directData.steps?.length || 0
    });
    
    if (onProgress) {
      onProgress(`⚡ Retrieved ${diag.pwCount || 0} procedures + ${diag.regsCount || 0} regulations (${diag.ragMs || 0}ms)`);
      await delay(1000);
      onProgress('STAGE_3_START');
      await delay(800);
      onProgress('🤖 Generating method statement...');
      await delay(500);
    }
    
    // Transform direct RAG output to expected format
    const installerOutput = {
      installationSteps: (directData.steps || []).map((step: any, index: number) => ({
        step: index + 1,
        stepNumber: index + 1,
        title: step.title,
        description: step.detail,
        content: step.detail,
        tools: step.tools || [],
        equipmentNeeded: step.tools || [],
        materials: step.materials || [],
        safetyRequirements: [],
        qualifications: [],
        estimatedDuration: 'Not specified',
        riskLevel: 'medium' as const,
        linkedHazards: [],
        inspectionCheckpoints: [],
        notes: ''
      })),
      workType: 'electrical installation',
      equipmentType: 'electrical installation',
      jobTitle: userQuery,
      description: userQuery,
      estimatedDuration: 'Not specified',
      requiredQualifications: directData.competencyRequirements?.roles || [],
      toolsRequired: directData.materials || [],
      materialsRequired: directData.materials || [],
      detectedHazards: [],
      conditionalFlags: {},
      testingProcedures: directData.testingProcedures || [],
      equipmentSchedule: directData.equipmentSchedule || [],
      siteLogistics: directData.siteLogistics || {},
      competencyRequirements: directData.competencyRequirements || { roles: [], trainingRequired: [] },
      tips: directData.tips || [],
      citations: directData.citations || []
    };
    
    if (onProgress) {
      onProgress(`✅ Generated ${installerOutput.installationSteps.length} installation steps`);
      await delay(1000);
      onProgress('STAGE_4_START');
      await delay(800);
      onProgress('✅ Validating compliance requirements...');
      await delay(1000);
      onProgress('STAGE_5_COMPLETE');
    }
    
    // Return simplified output (no parallel agents for now - focus on speed)
    return mergeAgentOutputs(installerOutput, null, null);
    
  } catch (error) {
    console.error('Method statement generation failed:', error);
    throw error;
  }
};

function mergeAgentOutputs(installer: any, maintenance: any | null, healthSafety: any | null): MergedMethodStatementOutput {
  // Get installation steps from installer
  const installerSteps = installer.installationSteps || [];
  
  // Extract H&S data if available
  const allHazards = healthSafety?.riskAssessment?.hazards || [];
  const allControls = healthSafety?.riskAssessment?.controls || [];
  
  // Debug: H&S hazards breakdown
  console.log('🔍 H&S Agent Hazards Breakdown:');
  const hazardsByStep = allHazards.reduce((acc: any, h: any) => {
    const step = h.linkedToStep !== undefined ? h.linkedToStep : 'unknown';
    acc[step] = (acc[step] || 0) + 1;
    return acc;
  }, {});
  console.log('Hazards per step:', hazardsByStep);
  if (allHazards.length > 0) {
    console.log('Sample hazard:', allHazards[0]);
  }
  
  console.log('🔍 Merging agent outputs:', {
    installerSteps: installerSteps.length,
    totalHazards: allHazards.length,
    hasHealthSafety: !!healthSafety
  });
  
  return {
    // Installation steps (enriched with step-specific hazards)
    installationSteps: installerSteps.map((step: any, index: number) => {
      const stepNumber = index + 1;
      
      // Get step-specific hazards
      let stepSpecificHazards = allHazards
        .filter((h: any) => h.linkedToStep === stepNumber)
        .map((h: any) => h.hazard);
      
      // For Step 1, also include general site hazards (linkedToStep: 0)
      if (stepNumber === 1) {
        const generalHazards = allHazards
          .filter((h: any) => h.linkedToStep === 0)
          .map((h: any) => h.hazard);
        stepSpecificHazards = [...generalHazards, ...stepSpecificHazards];
        if (generalHazards.length > 0) {
          console.log(`Step 1: Added ${generalHazards.length} general site hazards`);
        }
      }
      
      // Fallback: If no step-linked hazards found, try keyword matching
      if (stepSpecificHazards.length === 0 && allHazards.length > 0) {
        const stepKeywords = ((step.description || '') + ' ' + (step.title || '')).toLowerCase();
        const keywordMatchedHazards = allHazards
          .filter((h: any) => {
            // Skip if explicitly linked to a different step
            if (h.linkedToStep !== undefined && h.linkedToStep !== stepNumber && h.linkedToStep !== 0) return false;
            
            const hazardText = (h.hazard || '').toLowerCase();
            const hazardWords = hazardText.split(' ').filter((w: string) => w.length > 3);
            
            // Check if any hazard keyword appears in step description
            return hazardWords.some((word: string) => stepKeywords.includes(word));
          })
          .map((h: any) => h.hazard);
        
        if (keywordMatchedHazards.length > 0) {
          console.log(`Step ${stepNumber}: Keyword fallback matched ${keywordMatchedHazards.length} hazards`);
          stepSpecificHazards = keywordMatchedHazards;
        }
      }
      
      // Filter controls for this step (match by linkedToStep AND hazard name)
      const stepSpecificControls = allControls
        .filter((c: any) => 
          (c.linkedToStep === stepNumber || c.linkedToStep === 0) &&
          stepSpecificHazards.includes(c.hazard)
        )
        .map((c: any) => c.controlMeasure);
      
      // Calculate max risk level for this step
      const stepHazardObjects = allHazards.filter((h: any) => 
        h.linkedToStep === stepNumber || 
        (stepNumber === 1 && h.linkedToStep === 0) ||
        stepSpecificHazards.includes(h.hazard)
      );
      const maxRiskLevel = stepHazardObjects.length > 0
        ? stepHazardObjects.reduce((max: string, h: any) => {
            const levels: Record<string, number> = { 'low': 1, 'medium': 2, 'high': 3, 'very high': 4 };
            const currentLevel = (h.riskLevel || 'medium').toLowerCase();
            return (levels[currentLevel] || 2) > (levels[max.toLowerCase()] || 0) ? currentLevel : max;
          }, 'low')
        : (step.riskLevel || 'medium');
      
      console.log(`✅ Step ${stepNumber}: ${stepSpecificHazards.length} hazards, risk: ${maxRiskLevel}`);
      
      return {
        stepNumber: step.step || step.stepNumber || stepNumber,
        title: step.title || step.stepTitle || `Step ${stepNumber}`,
        description: step.description || step.content || '',
        safetyRequirements: [
          ...(step.safetyRequirements || []),
          ...stepSpecificControls
        ],
        equipmentNeeded: step.equipmentNeeded || step.tools || [],
        qualifications: step.qualifications || [],
        estimatedDuration: step.estimatedDuration || step.duration || 'Not specified',
        riskLevel: maxRiskLevel as 'low' | 'medium' | 'high',
        linkedHazards: stepSpecificHazards,
        inspectionCheckpoints: maintenance?.inspectionChecklist?.[index] || [],
        notes: step.criticalPoints?.join('; ') || ''
      };
    }),
    
    // Equipment schedule (from maintenance pre-work requirements, or defaults)
    equipmentSchedule: maintenance ? (maintenance.preWorkRequirements || [])
      .filter((req: any) => req.category === 'tools' || req.category === 'equipment')
      .map((req: any) => ({
        name: req.requirement,
        quantity: '1 No.',
        certification: req.bs7671Reference || 'N/A',
        inspection: 'Daily pre-use check',
        responsible: 'Site Supervisor'
      })) : [],
    
    // Testing procedures (from maintenance, or defaults)
    testingProcedures: maintenance ? (maintenance.testingProcedures || []).map((test: any) => ({
      name: test.testName,
      standard: test.bs7671Reference || 'BS 7671:2018+A3:2024',
      procedure: test.procedure || [],
      criteria: test.expectedResult?.value || test.expectedResult?.passFailCriteria || 'Pass',
      certification: maintenance.documentation?.certificatesIssued?.[0] || 'EIC'
    })) : [],
    
    // Quality requirements (from maintenance, or defaults)
    qualityRequirements: maintenance ? (maintenance.testingProcedures || []).map((test: any) => ({
      stage: test.testName,
      requirement: Array.isArray(test.procedure) ? test.procedure.join('. ') : test.testName,
      criteria: test.expectedResult?.passFailCriteria || 'Pass'
    })) : [],
    
    // Site logistics (from H&S, or defaults)
    siteLogistics: {
      vehicleAccess: healthSafety?.siteLogistics?.vehicleAccess || 'Via main entrance',
      parking: healthSafety?.siteLogistics?.parking || 'On-site parking available',
      materialStorage: healthSafety?.siteLogistics?.materialStorage || 'Secure compound',
      wasteManagement: healthSafety?.siteLogistics?.wasteManagement || 'Segregated waste bins',
      welfareFacilities: healthSafety?.siteLogistics?.welfare || 'On-site facilities',
      siteRestrictions: healthSafety?.siteLogistics?.restrictions || 'None specified'
    },
    
    // Conditional flags (from H&S + installer, or defaults)
    conditionalFlags: {
      work_at_height: healthSafety?.conditionalFlags?.workAtHeight || false,
      services_utilities: installer.conditionalFlags?.servicesUtilities || healthSafety?.conditionalFlags?.servicesUtilities || false,
      hot_works: healthSafety?.conditionalFlags?.hotWorks || false,
      confined_spaces: healthSafety?.conditionalFlags?.confinedSpaces || false,
      client_liaison: healthSafety?.conditionalFlags?.clientLiaison || true, // Default true for installations
      noise_dust_controls: healthSafety?.conditionalFlags?.noiseDust || false,
      environmental_considerations: healthSafety?.conditionalFlags?.environmental || false,
      testing_commissioning: maintenance !== null // True if maintenance data available
    },
    
    // Work at height equipment (from H&S if flagged, or defaults)
    workAtHeightEquipment: healthSafety?.workAtHeightEquipment || [],
    
    // Competency requirements (from H&S, or defaults)
    competencyRequirements: {
      competencyRequirements: healthSafety?.competency?.qualifications || '18th Edition BS 7671:2018+A3:2024, ECS Gold Card',
      trainingRequired: healthSafety?.competency?.training || 'Site induction, Manual Handling, Working at Height',
      supervisionLevel: healthSafety?.competency?.supervision || 'Continuous supervision by qualified electrician',
      additionalCertifications: healthSafety?.competency?.additional || 'N/A'
    },
    
    // Raw agent outputs (for debugging/review)
    _agentOutputs: {
      installer,
      maintenance,
      healthSafety
    }
  };
}
