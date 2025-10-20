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
    // STEP 1: Installer-v3 (Sequential - must go first)
    if (onProgress) onProgress('🔧 Generating installation procedure...');
    
    const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-v3', {
      body: { 
        query: userQuery,
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
    
    // STEP 2: Maintenance + H&S in PARALLEL
    if (onProgress) onProgress('🔍 Running inspection and risk assessment in parallel...');
    
    const [maintenanceResult, healthSafetyResult] = await Promise.allSettled([
      // Maintenance-v3 call
      supabase.functions.invoke('maintenance-v3', {
        body: {
          query: `Inspection and testing requirements for: ${userQuery}`,
          equipmentType: installerOutput.equipmentType || 'electrical installation',
          maintenanceType: 'preventive',
          // Context from installer
          installationSteps: installerOutput.installationSteps || installerOutput.methodStatementSteps,
          detectedHazards: installerOutput.detectedHazards || []
        }
      }),
      
      // Health-Safety-v3 call (runs at same time)
      supabase.functions.invoke('health-safety-v3', {
        body: {
          query: userQuery,
          projectType: 'installation',
          // Context from installer
          installationSteps: installerOutput.installationSteps || installerOutput.methodStatementSteps,
          detectedHazards: installerOutput.detectedHazards || [],
          workType: installerOutput.workType
        }
      })
    ]);
    
    // Handle parallel results with graceful degradation
    let maintenanceOutput = null;
    let healthSafetyOutput = null;
    
    if (maintenanceResult.status === 'fulfilled') {
      maintenanceOutput = maintenanceResult.value.data?.result;
      if (onProgress) onProgress('✅ Inspection procedures ready');
    } else {
      console.warn('Maintenance agent failed, continuing without inspection data:', maintenanceResult.reason);
      if (onProgress) onProgress('⚠️ Inspection data unavailable, using defaults');
    }
    
    if (healthSafetyResult.status === 'fulfilled') {
      healthSafetyOutput = healthSafetyResult.value.data?.result;
      if (onProgress) onProgress('✅ Risk assessment complete');
    } else {
      console.warn('H&S agent failed, continuing without risk assessment:', healthSafetyResult.reason);
      if (onProgress) onProgress('⚠️ Risk assessment unavailable, using defaults');
    }
    
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
  
  return {
    // Installation steps (from installer, enriched with other agents)
    installationSteps: installerSteps.map((step: any, index: number) => ({
      stepNumber: step.step || step.stepNumber || index + 1,
      title: step.title || step.stepTitle || `Step ${index + 1}`,
      description: step.description || step.content || '',
      safetyRequirements: step.safetyRequirements || [],
      equipmentNeeded: step.equipmentNeeded || step.tools || [],
      qualifications: step.qualifications || [],
      estimatedDuration: step.estimatedDuration || step.duration || 'Not specified',
      riskLevel: (step.riskLevel || 'medium') as 'low' | 'medium' | 'high',
      // Add inspection checkpoints from maintenance (if available)
      inspectionCheckpoints: maintenance?.inspectionChecklist?.[index] || [],
      // Add hazards and controls from H&S (if available)
      linkedHazards: healthSafety?.hazards?.[index] || [],
      controlMeasures: healthSafety?.controlMeasures?.[index] || []
    })),
    
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
