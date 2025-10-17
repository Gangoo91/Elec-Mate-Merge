import type { RAMSData, RAMSRisk } from '@/types/rams';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';

interface AgentResponse {
  response?: string;
  confidence?: number;
  structuredData?: any;
  riskAssessment?: {
    hazards?: Array<{
      hazard: string;
      risk: string;
      likelihood: number;
      severity: number;
      controls: string[];
    }>;
  };
  methodStatementSteps?: any[];
}

/**
 * Transform Health & Safety agent response into RAMS risks
 */
export function transformHealthSafetyToRAMS(
  hsResponse: AgentResponse,
  projectInfo: { projectName: string; location: string; assessor: string; date: string }
): { risks: RAMSRisk[]; activities: string[] } {
  const risks: RAMSRisk[] = [];
  const activities: string[] = [];
  
  // Try multiple possible locations for hazard data
  const hazards = hsResponse.riskAssessment?.hazards 
    || (hsResponse.response as any)?.riskAssessment?.hazards
    || (hsResponse.structuredData as any)?.riskAssessment?.hazards
    || (hsResponse as any).structuredData?.hazards
    || (hsResponse as any).hazards;
  
  console.log('🔍 Transformer received hsResponse:', {
    hasRiskAssessment: !!hsResponse.riskAssessment,
    hasResponseRiskAssessment: !!(hsResponse.response as any)?.riskAssessment,
    hasStructuredData: !!hsResponse.structuredData,
    hazardsFound: hazards?.length || 0
  });
  
  // Handle structured response from health-safety agent
  if (hazards && Array.isArray(hazards)) {
    hazards.forEach((hazard, idx) => {
      const riskRating = hazard.likelihood * hazard.severity;
      const residualRisk = Math.max(1, Math.floor(riskRating / 2));
      
      risks.push({
        id: `risk-${idx + 1}`,
        hazard: hazard.hazard,
        risk: hazard.risk,
        likelihood: hazard.likelihood,
        severity: hazard.severity,
        riskRating,
        controls: hazard.controls.join('\n• '),
        residualRisk,
        furtherAction: "",
        responsible: projectInfo.assessor,
        actionBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        done: false
      });
    });
    
    console.log('✅ Transformer created', risks.length, 'risk entries');
    return { risks, activities: activities.length > 0 ? activities : ["Electrical installation work"] };
  }
  
  // Fallback to string parsing if response is a string
  let responseText = '';
  if (typeof hsResponse === 'string') {
    responseText = hsResponse;
  } else if (typeof hsResponse.response === 'string') {
    responseText = hsResponse.response;
  } else if (typeof hsResponse.response === 'object' && hsResponse.response && 'response' in hsResponse.response && typeof (hsResponse.response as any).response === 'string') {
    responseText = (hsResponse.response as any).response;
  }
  const lines = responseText.split('\n');
  
  let currentHazard = "";
  let currentRisk = "";
  let currentControls: string[] = [];
  let likelihood = 3;
  let severity = 4;
  
  lines.forEach((line, idx) => {
    const trimmed = line.trim().replace(/[*#]/g, '').trim();
    
    // Extract hazards
    if (trimmed.match(/^hazard:/i)) {
      if (currentHazard) {
        addRisk();
      }
      currentHazard = trimmed.replace(/^hazard:\s*/i, '');
      currentRisk = "";
      currentControls = [];
    }
    
    // Extract risks/consequences
    if (trimmed.match(/^(risk|consequence):/i)) {
      currentRisk = trimmed.replace(/^(risk|consequence):\s*/i, '');
    }
    
    // Extract likelihood/severity from risk matrix
    if (trimmed.match(/likelihood.*?(\d)/i)) {
      const match = trimmed.match(/(\d)/);
      if (match) likelihood = parseInt(match[1]);
    }
    
    if (trimmed.match(/severity.*?(\d)/i)) {
      const match = trimmed.match(/(\d)/);
      if (match) severity = parseInt(match[1]);
    }
    
    // Extract control measures
    if (trimmed.match(/^(control|measure|mitigation):/i) || trimmed.match(/^[-•*]\s/)) {
      const control = trimmed.replace(/^(control|measure|mitigation):\s*/i, '').replace(/^[-•*]\s/, '');
      if (control && control.length > 5) {
        currentControls.push(control);
      }
    }
    
    // Extract activities
    if (trimmed.match(/^(activity|task|work):/i)) {
      const activity = trimmed.replace(/^(activity|task|work):\s*/i, '');
      if (activity && !activities.includes(activity)) {
        activities.push(activity);
      }
    }
  });
  
  // Add last hazard
  if (currentHazard) {
    addRisk();
  }
  
  function addRisk() {
    const riskRating = likelihood * severity;
    const residualRisk = Math.max(1, Math.floor(riskRating / 2));
    
    risks.push({
      id: `risk-${risks.length + 1}`,
      hazard: currentHazard || "Electrical hazard",
      risk: currentRisk || "Electric shock, burns, or injury",
      likelihood,
      severity,
      riskRating,
      controls: currentControls.length > 0 ? currentControls.join('\n• ') : "Appropriate safety measures to be implemented",
      residualRisk,
      furtherAction: "",
      responsible: projectInfo.assessor,
      actionBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      done: false
    });
  }
  
  // Add default risks if none extracted
  if (risks.length === 0) {
    risks.push({
      id: 'risk-1',
      hazard: "Electrical shock from live conductors",
      risk: "Electric shock, burns, or fatality",
      likelihood: 4,
      severity: 5,
      riskRating: 20,
      controls: "• Isolate and lock-off power supply\n• Use approved voltage tester\n• Wear insulated gloves and safety boots\n• Competent person supervision required",
      residualRisk: 6,
      furtherAction: "Regular equipment testing",
      responsible: projectInfo.assessor,
      actionBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      done: false
    });
  }
  
  return { risks, activities };
}

/**
 * Transform Installer agent response into Method Statement steps
 */
export function transformInstallerToMethodSteps(installerResponse: AgentResponse): MethodStep[] {
  const steps: MethodStep[] = [];
  
  // Try multiple possible locations for steps data
  const methodSteps = installerResponse.methodStatementSteps
    || (installerResponse.response as any)?.methodStatementSteps
    || (installerResponse.structuredData as any)?.methodStatementSteps
    || (installerResponse as any).installationSteps
    || (installerResponse.response as any)?.installationSteps
    || (installerResponse.structuredData as any)?.installationSteps;
  
  console.log('🔍 Transformer received installerResponse:', {
    hasMethodSteps: !!installerResponse.methodStatementSteps,
    hasResponseMethodSteps: !!(installerResponse.response as any)?.methodStatementSteps,
    hasStructuredData: !!installerResponse.structuredData,
    stepsFound: methodSteps?.length || 0
  });
  
  // Handle structured response from installer agent
  if (methodSteps && Array.isArray(methodSteps)) {
    const transformedSteps = methodSteps.map((step, idx) => ({
      id: step.id || `step-${idx + 1}`,
      stepNumber: step.stepNumber || idx + 1,
      title: step.title || step.step || 'Installation Step',
      description: step.description || '',
      estimatedDuration: step.estimatedDuration || step.duration || '30 minutes',
      riskLevel: step.riskLevel || 'medium',
      safetyRequirements: step.safetyRequirements || [],
      equipmentNeeded: step.equipmentNeeded || step.equipment || [],
      qualifications: step.qualifications || [],
      isCompleted: false
    }));
    
    console.log('✅ Transformer created', transformedSteps.length, 'method steps');
    return transformedSteps;
  }
  
  // Fallback to string parsing if response is a string
  let responseText = '';
  if (typeof installerResponse === 'string') {
    responseText = installerResponse;
  } else if (typeof installerResponse.response === 'string') {
    responseText = installerResponse.response;
  } else if (typeof installerResponse.response === 'object' && installerResponse.response && 'response' in installerResponse.response && typeof (installerResponse.response as any).response === 'string') {
    responseText = (installerResponse.response as any).response;
  }
  const lines = responseText.split('\n');
  
  let stepNumber = 1;
  let currentStep: Partial<MethodStep> | null = null;
  let currentSection = '';
  
  lines.forEach(line => {
    const trimmed = line.trim().replace(/[*#]/g, '').trim();
    
    // Detect step indicators
    if (trimmed.match(/^(step|stage|\d+\.|\d+\))/i)) {
      if (currentStep && currentStep.title) {
        finalizeStep();
      }
      
      currentStep = {
        id: `step-${stepNumber}`,
        stepNumber: stepNumber++,
        title: trimmed.replace(/^(step|stage|\d+\.|\d+\))\s*/i, '').substring(0, 100),
        description: "",
        estimatedDuration: "30 minutes",
        riskLevel: "medium" as const,
        safetyRequirements: [],
        equipmentNeeded: [],
        qualifications: [],
        isCompleted: false
      };
      currentSection = 'description';
    }
    // Detect safety requirements section
    else if (trimmed.match(/^(safety|ppe|protection|precaution):/i)) {
      currentSection = 'safety';
    }
    // Detect equipment/materials section
    else if (trimmed.match(/^(equipment|material|tool):/i)) {
      currentSection = 'equipment';
    }
    // Detect time estimate
    else if (trimmed.match(/time.*?(\d+)\s*(hour|min|hr)/i)) {
      const match = trimmed.match(/(\d+)\s*(hour|min|hr)/i);
      if (match && currentStep) {
        currentStep.estimatedDuration = `${match[1]} ${match[2]}`;
      }
    }
    // Add content to current section
    else if (currentStep && trimmed && trimmed.length > 5) {
      if (currentSection === 'description') {
        currentStep.description += (currentStep.description ? " " : "") + trimmed;
      } else if (currentSection === 'safety' && trimmed.match(/^[-•*]\s/)) {
        currentStep.safetyRequirements?.push(trimmed.replace(/^[-•*]\s/, ''));
      } else if (currentSection === 'equipment' && trimmed.match(/^[-•*]\s/)) {
        currentStep.equipmentNeeded?.push(trimmed.replace(/^[-•*]\s/, ''));
      }
    }
  });
  
  // Finalize last step
  if (currentStep && currentStep.title) {
    finalizeStep();
  }
  
  function finalizeStep() {
    if (!currentStep) return;
    
    // Add default safety requirements if none found
    if (!currentStep.safetyRequirements || currentStep.safetyRequirements.length === 0) {
      currentStep.safetyRequirements = ["PPE required", "Competent person supervision"];
    }
    
    // Add default equipment if none found
    if (!currentStep.equipmentNeeded || currentStep.equipmentNeeded.length === 0) {
      currentStep.equipmentNeeded = ["Hand tools", "Test equipment"];
    }
    
    // Add default qualifications
    if (!currentStep.qualifications || currentStep.qualifications.length === 0) {
      currentStep.qualifications = ["18th Edition BS 7671", "AM2 qualified"];
    }
    
    // Determine risk level based on keywords
    const desc = (currentStep.title + " " + currentStep.description).toLowerCase();
    if (desc.match(/live|energi[sz]ed|high voltage|danger/)) {
      currentStep.riskLevel = "high";
    } else if (desc.match(/height|confined|ladder|scaffold/)) {
      currentStep.riskLevel = "medium";
    } else {
      currentStep.riskLevel = "low";
    }
    
    steps.push(currentStep as MethodStep);
    currentStep = null;
  }
  
  // Add default steps if none extracted
  if (steps.length === 0) {
    steps.push({
      id: 'step-1',
      stepNumber: 1,
      title: "Preparation and Safety Checks",
      description: "Verify safe isolation of electrical supply. Check work area for hazards. Ensure all required tools and materials are available.",
      estimatedDuration: "30 minutes",
      riskLevel: "medium",
      safetyRequirements: ["Isolation confirmed", "PPE worn", "Risk assessment reviewed"],
      equipmentNeeded: ["Voltage tester", "Lock-off devices", "Warning signs"],
      qualifications: ["18th Edition BS 7671", "Competent person"],
      isCompleted: false
    });
  }
  
  return steps;
}

/**
 * Combine H&S and Installer outputs into complete RAMS data
 */
export function combineAgentOutputsToRAMS(
  hsResponse: AgentResponse,
  installerResponse: AgentResponse,
  projectInfo: {
    projectName: string;
    location: string;
    assessor: string;
    date: string;
    contractor: string;
    supervisor: string;
  }
): { ramsData: RAMSData; methodData: Partial<MethodStatementData> } {
  // Transform H&S response to RAMS risks
  const { risks, activities } = transformHealthSafetyToRAMS(hsResponse, projectInfo);
  
  // Transform Installer response to method steps
  const steps = transformInstallerToMethodSteps(installerResponse);
  
  // Create RAMS data
  const ramsData: RAMSData = {
    projectName: projectInfo.projectName,
    location: projectInfo.location,
    date: projectInfo.date,
    assessor: projectInfo.assessor,
    activities: activities.length > 0 ? activities : ["Electrical installation work"],
    risks
  };
  
  // Create Method Statement data
  const methodData: Partial<MethodStatementData> = {
    jobTitle: projectInfo.projectName,
    location: projectInfo.location,
    contractor: projectInfo.contractor,
    supervisor: projectInfo.supervisor,
    workType: "Electrical Installation",
    duration: estimateTotalDuration(steps),
    teamSize: "2-3 electricians",
    description: extractWorkDescription(installerResponse),
    overallRiskLevel: calculateOverallRisk(risks),
    reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
    steps
  };
  
  return { ramsData, methodData };
}

function estimateTotalDuration(steps: MethodStep[]): string {
  let totalMinutes = 0;
  
  steps.forEach(step => {
    const duration = step.estimatedDuration.toLowerCase();
    if (duration.includes('hour')) {
      const hours = parseInt(duration.match(/(\d+)/)?.[1] || '0');
      totalMinutes += hours * 60;
    } else if (duration.includes('min')) {
      const mins = parseInt(duration.match(/(\d+)/)?.[1] || '0');
      totalMinutes += mins;
    }
  });
  
  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  } else if (totalMinutes < 480) {
    const hours = Math.round(totalMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    const days = Math.ceil(totalMinutes / 480);
    return `${days} day${days > 1 ? 's' : ''}`;
  }
}

function extractWorkDescription(installerResponse: AgentResponse): string {
  let responseText = '';
  if (typeof installerResponse === 'string') {
    responseText = installerResponse;
  } else if (typeof installerResponse.response === 'string') {
    responseText = installerResponse.response;
  } else if (typeof installerResponse.response === 'object' && installerResponse.response && 'response' in installerResponse.response && typeof (installerResponse.response as any).response === 'string') {
    responseText = (installerResponse.response as any).response;
  }
  const lines = responseText.split('\n').filter(l => l.trim().length > 20);
  const firstParagraph = lines.slice(0, 3).join(' ').replace(/[*#]/g, '').trim();
  return firstParagraph.substring(0, 300) || 'Electrical installation work as per specifications';
}

function calculateOverallRisk(risks: RAMSRisk[]): 'low' | 'medium' | 'high' {
  if (risks.length === 0) return 'medium';
  
  const avgRisk = risks.reduce((sum, r) => sum + r.riskRating, 0) / risks.length;
  
  if (avgRisk > 15) return 'high';
  if (avgRisk > 8) return 'medium';
  return 'low';
}
