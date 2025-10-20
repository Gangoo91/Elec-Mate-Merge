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
    minimumQualifications: string;
    mandatoryTraining: string;
    supervisionLevel: string;
    additionalCertifications: string;
  };
  _agentOutputs: {
    installer: any;
    maintenance: any;
    healthSafety: any;
  };
}

export const generateMethodStatement = async (
  userQuery: string,
  projectDetails: any,
  conversationId: string,
  onProgress?: (message: string) => void
): Promise<MergedMethodStatementOutput> => {
  try {
    // ===== PHASE 1: INSTALLER AGENT (Sequential - must go first) =====
    // Searches RAG for installation procedures and generates base installation steps
    if (onProgress) onProgress('STAGE_1_START');
    if (onProgress) onProgress('🔧 Searching installation procedures & generating steps...');
    
    const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-v3', {
      body: { 
        query: `Search RAG for installation procedures and create detailed installation steps for: ${userQuery}
        
CRITICAL: Search RAG first for relevant installation procedures, best practices, and BS 7671 requirements`,
        projectDetails,
        conversationId
      }
    });
    
    console.log('📦 Installer response structure:', JSON.stringify(installerData, null, 2));
    
    if (installerError) throw installerError;
    
    if (!installerData?.success) {
      throw new Error(installerData?.error || 'Installer agent failed');
    }
    
    // Try multiple possible response structures for resilience
    const installerOutput = installerData?.result || 
                            installerData?.data?.result || 
                            installerData?.structuredData || 
                            installerData;
    
    if (!installerOutput) {
      throw new Error('Installer agent returned empty response');
    }
    
    console.log('✅ Installer completed:', { steps: (installerOutput.installationSteps || installerOutput.methodStatementSteps || []).length });
    
    if (onProgress) onProgress('STAGE_2_START');
    
    // ===== PHASE 2: H&S + MAINTENANCE AGENTS (Parallel - both search RAG concurrently) =====
    if (onProgress) onProgress('STAGE_3_START');
    if (onProgress) onProgress('⚡ Searching RAG for hazards & testing procedures in parallel...');
    
    const [healthSafetyResult, maintenanceResult] = await Promise.allSettled([
      // Health-Safety-v3 - Searches RAG for hazards, then fills hazards per step
      supabase.functions.invoke('health-safety-v3', {
        body: {
          query: `Search RAG for health & safety hazards, then assess risks for each step of: ${userQuery}
          
CRITICAL: Search RAG first for relevant hazards, control measures, and safety requirements`,
          projectType: 'installation',
          workType: installerOutput.workType || 'electrical installation',
          location: projectDetails?.location || 'Site location',
          // CRITICAL: Pass installation steps in structured format for step-specific hazard linking
          installationSteps: (installerOutput.installationSteps || installerOutput.methodStatementSteps || []).map((s: any, i: number) => ({
            stepNumber: i + 1,
            title: s.title || s.stepTitle || `Step ${i + 1}`,
            description: s.description || s.content || '',
            safetyRequirements: s.safetyRequirements || [],
            equipmentNeeded: s.equipmentNeeded || s.tools || []
          })),
          detectedHazards: installerOutput.detectedHazards || []
        }
      }),
      
      // Maintenance-v3 - FINAL REVIEWER: Searches RAG, validates installer+H&S, fills gaps, completes method statement
      supabase.functions.invoke('maintenance-v3', {
        body: {
          query: `FINAL REVIEW & VALIDATION: Search RAG for procedures, then validate and complete comprehensive method statement for: ${userQuery}
          
CRITICAL TASKS AS FINAL REVIEWER (in order):
1. SEARCH RAG FIRST for inspection, testing, and commissioning procedures
2. VALIDATE installer steps for completeness, safety, and BS 7671 compliance
3. ADD missing information from RAG knowledge (testing procedures, inspection checkpoints, fault diagnosis)
4. ENHANCE quality with specific tool requirements, torque settings, acceptance criteria
5. FILL ALL remaining method statement fields (tools, materials, practical tips, warnings, compliance regulations)
6. CROSS-CHECK that all outputs align and are consistent
7. ENSURE comprehensive BS 7671:2018+A3:2024 compliance references`,
          
          projectType: 'installation',
          equipmentType: installerOutput.equipmentType || 'electrical installation',
          workType: installerOutput.workType || 'electrical installation',
          maintenanceType: 'preventive',
          location: projectDetails?.location || 'Site location',
          
          // INSTALLER OUTPUT FOR FINAL REVIEW & VALIDATION
          installerSteps: (installerOutput.installationSteps || installerOutput.methodStatementSteps || []),
          installerJobDetails: {
            jobTitle: installerOutput.jobTitle,
            description: installerOutput.description,
            workType: installerOutput.workType,
            estimatedDuration: installerOutput.estimatedDuration,
            requiredQualifications: installerOutput.requiredQualifications,
            toolsRequired: installerOutput.toolsRequired,
            materialsRequired: installerOutput.materialsRequired,
            detectedHazards: installerOutput.detectedHazards || []
          }
        }
      })
    ]);
    
    // Handle parallel results with graceful degradation
    let maintenanceOutput = null;
    let healthSafetyOutput = null;
    
    if (onProgress) onProgress('STAGE_4_START');
    
    if (maintenanceResult.status === 'fulfilled') {
      maintenanceOutput = maintenanceResult.value.data?.result;
      if (onProgress) onProgress('✅ Final validation & inspection procedures complete');
    } else {
      console.warn('⚠️ Maintenance agent (final reviewer) failed, continuing without validation:', maintenanceResult.reason);
      if (onProgress) onProgress('⚠️ Final validation unavailable, using installer baseline');
    }
    
    if (healthSafetyResult.status === 'fulfilled') {
      healthSafetyOutput = healthSafetyResult.value.data?.result;
      if (onProgress) onProgress('✅ Risk assessment complete');
    } else {
      console.warn('⚠️ H&S agent failed, continuing without risk assessment:', healthSafetyResult.reason);
      if (onProgress) onProgress('⚠️ Risk assessment unavailable, using baseline hazards');
    }
    
    if (onProgress) onProgress('STAGE_5_COMPLETE');
    
    // STEP 3: Merge outputs (handles null agents gracefully)
    return mergeAgentOutputs(installerOutput, maintenanceOutput, healthSafetyOutput);
    
  } catch (error) {
    console.error('Method statement generation failed:', error);
    throw error;
  }
};

function mergeAgentOutputs(installer: any, maintenance: any | null, healthSafety: any | null): MergedMethodStatementOutput {
  // Get installation steps from installer
  const installerSteps = installer.installationSteps || installer.methodStatementSteps || [];
  
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
      minimumQualifications: healthSafety?.competency?.qualifications || '18th Edition BS 7671:2018+A3:2024, ECS Gold Card',
      mandatoryTraining: healthSafety?.competency?.training || 'Site induction, Manual Handling, Working at Height',
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
