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
): { risks: RAMSRisk[]; hazards: Array<{ id: string; hazard: string; likelihood: number; severity: number; riskScore: number; riskLevel: string; regulation?: string; }>; activities: string[] } {
  const risks: RAMSRisk[] = [];
  const identifiedHazards: Array<{ id: string; hazard: string; likelihood: number; severity: number; riskScore: number; riskLevel: string; regulation?: string; }> = [];
  const activities: string[] = [];
  
  // Try multiple possible locations for hazard data
  const sourceHazards = hsResponse.riskAssessment?.hazards 
    || (hsResponse.response as any)?.riskAssessment?.hazards
    || (hsResponse.structuredData as any)?.riskAssessment?.hazards
    || (hsResponse as any).structuredData?.hazards
    || (hsResponse as any).hazards;
  
  console.log('🔍 Transformer received hsResponse:', {
    hasRiskAssessment: !!hsResponse.riskAssessment,
    hasResponseRiskAssessment: !!(hsResponse.response as any)?.riskAssessment,
    hasStructuredData: !!hsResponse.structuredData,
    hazardsFound: sourceHazards?.length || 0
  });
  
  // Generate controls from hazard description if not provided
  const generateControlsFromHazard = (hazard: any): string[] => {
    const controls: string[] = [];
    
    // Use regulation as a control if available
    if (hazard.regulation) {
      controls.push(`Comply with ${hazard.regulation}`);
    }
    
    const hazardLower = hazard.hazard.toLowerCase();
    
    if (hazardLower.includes('electric shock') || hazardLower.includes('live') || hazardLower.includes('electrocution')) {
      controls.push('Isolate and lock-off power supply before work');
      controls.push('Use approved voltage tester to prove dead');
      controls.push('Wear insulated gloves and safety boots');
      controls.push('Competent person supervision required');
    }
    
    if (hazardLower.includes('arc flash') || hazardLower.includes('arc blast')) {
      controls.push('Maintain safe working distance from switchgear');
      controls.push('Wear arc-rated PPE when switching');
      controls.push('Use remote operation where possible');
    }
    
    if (hazardLower.includes('asbestos')) {
      controls.push('Conduct asbestos survey before drilling/fixing');
      controls.push('Licensed asbestos contractor if ACMs present');
      controls.push('Do not disturb suspected ACMs');
    }
    
    if (hazardLower.includes('dust') || hazardLower.includes('silica')) {
      controls.push('Use dust extraction equipment (Class H/M)');
      controls.push('Wear RPE (FFP3 mask minimum)');
      controls.push('Wet cutting where feasible');
    }
    
    if (hazardLower.includes('height') || hazardLower.includes('ladder') || hazardLower.includes('podium')) {
      controls.push('Use appropriate access equipment (podium/stepladder)');
      controls.push('Ensure 3-point contact when climbing');
      controls.push('Inspect access equipment before use');
    }
    
    if (hazardLower.includes('manual handling') || hazardLower.includes('lifting')) {
      controls.push('Mechanical aids for heavy items');
      controls.push('Team lift for items >25kg');
      controls.push('Proper lifting technique training');
    }
    
    if (hazardLower.includes('fire')) {
      controls.push('Ensure correct protective device ratings');
      controls.push('Torque all terminations to manufacturer specs');
      controls.push('Thermal imaging post-energisation');
    }
    
    if (hazardLower.includes('hidden') || hazardLower.includes('striking')) {
      controls.push('Use CAT & Genny scanner before drilling');
      controls.push('Refer to drawings and services plans');
      controls.push('Hand-dig trial holes where required');
    }
    
    if (hazardLower.includes('slip') || hazardLower.includes('trip') || hazardLower.includes('fall')) {
      controls.push('Keep work area tidy and free of obstructions');
      controls.push('Secure trailing cables and leads');
      controls.push('Adequate lighting in work areas');
    }
    
    if (hazardLower.includes('public') || hazardLower.includes('customer')) {
      controls.push('Erect barriers and warning signs');
      controls.push('Supervise work area continuously');
      controls.push('Brief staff/public on restricted areas');
    }
    
    if (hazardLower.includes('noise') || hazardLower.includes('vibration')) {
      controls.push('Wear hearing protection (ear defenders)');
      controls.push('Limit exposure time to vibrating tools');
      controls.push('Use anti-vibration gloves');
    }
    
    if (hazardLower.includes('tool') || hazardLower.includes('equipment')) {
      controls.push('All tools 110V or battery-powered');
      controls.push('Visual inspection before use');
      controls.push('Current PAT test certificate required');
    }
    
    if (hazardLower.includes('competence') || hazardLower.includes('supervision')) {
      controls.push('Work supervised by qualified electrician');
      controls.push('Apprentices under direct supervision');
      controls.push('Pre-start toolbox talk on specific hazards');
    }
    
    if (hazardLower.includes('backfeed') || hazardLower.includes('isolation') || hazardLower.includes('ups') || hazardLower.includes('generator')) {
      controls.push('Identify all sources of supply (inc. UPS/PV)');
      controls.push('Isolate all sources before work');
      controls.push('Lock-off and tag all isolation points');
    }
    
    if (hazardLower.includes('fire alarm') || hazardLower.includes('emergency lighting') || hazardLower.includes('life safety')) {
      controls.push('Coordinate with building management');
      controls.push('Arrange alternative provision during work');
      controls.push('Minimise downtime of critical systems');
    }
    
    if (controls.length === 0) {
      controls.push('Conduct dynamic risk assessment before work');
      controls.push('Follow method statement procedures');
      controls.push('Ensure competent supervision');
    }
    
    return controls;
  };
  
  // Handle structured response from health-safety agent
  if (sourceHazards && Array.isArray(sourceHazards)) {
    console.log('🔍 Individual hazard structure:', sourceHazards[0]);
    sourceHazards.forEach((sourceHazard, idx) => {
      const riskRating = sourceHazard.likelihood * sourceHazard.severity;
      const residualRisk = Math.max(1, Math.floor(riskRating / 2));
      
      // Store raw hazard for HAZARDS IDENTIFIED section
      identifiedHazards.push({
        id: `hazard-${idx + 1}`,
        hazard: sourceHazard.hazard,
        likelihood: sourceHazard.likelihood,
        severity: sourceHazard.severity,
        riskScore: riskRating,
        riskLevel: riskRating >= 15 ? 'high' : riskRating >= 8 ? 'medium' : 'low',
        regulation: sourceHazard.regulation
      });
      
      risks.push({
        id: `risk-${idx + 1}`,
        hazard: sourceHazard.hazard,
        risk: sourceHazard.risk,
        likelihood: sourceHazard.likelihood,
        severity: sourceHazard.severity,
        riskRating,
        controls: Array.isArray(sourceHazard.controls) && sourceHazard.controls.length > 0
          ? '• ' + sourceHazard.controls.join('\n• ')
          : typeof sourceHazard.controls === 'string' && sourceHazard.controls.trim()
            ? sourceHazard.controls
            : sourceHazard.controlMeasures && Array.isArray(sourceHazard.controlMeasures) && sourceHazard.controlMeasures.length > 0
              ? '• ' + sourceHazard.controlMeasures.join('\n• ')
              : '• ' + generateControlsFromHazard(sourceHazard).join('\n• '),
        residualRisk,
        furtherAction: "",
        responsible: projectInfo.assessor,
        actionBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        done: false
      });
    });
    
    console.log('✅ Transformer created', risks.length, 'risk entries and', identifiedHazards.length, 'hazard entries');
    return { risks, hazards: identifiedHazards, activities: activities.length > 0 ? activities : ["Electrical installation work"] };
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
  
  return { risks, hazards: identifiedHazards, activities };
}

/**
 * Transform Installer agent response into Method Statement steps
 */
export function transformInstallerToMethodSteps(
  installerResponse: AgentResponse,
  hazards: Array<{ id: string; hazard: string; likelihood: number; severity: number; riskScore: number; riskLevel: string; regulation?: string; }> = []
): MethodStep[] {
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
  
  // Helper function to link hazards to a step based on keyword matching
  const linkHazardsToStep = (step: any): string[] => {
    const stepText = `${step.title || step.step || ''} ${step.description || ''}`.toLowerCase();
    const linkedHazardIds: string[] = [];
    
    hazards.forEach(hazard => {
      const hazardText = hazard.hazard.toLowerCase();
      
      // Keyword matching logic
      const keywords = [
        { hazard: ['electric', 'shock', 'live', 'voltage'], step: ['electric', 'cable', 'wire', 'circuit', 'terminal', 'connect', 'test', 'energi'] },
        { hazard: ['height', 'fall', 'working at height'], step: ['ladder', 'scaffold', 'height', 'above', 'ceiling', 'roof', 'elevated'] },
        { hazard: ['manual', 'handling', 'lifting'], step: ['lift', 'carry', 'move', 'install', 'position', 'transport', 'handling'] },
        { hazard: ['confined', 'space'], step: ['confined', 'enclosed', 'restricted', 'access', 'tight'] },
        { hazard: ['dust', 'silica', 'debris'], step: ['dust', 'drill', 'cut', 'chase', 'grind', 'debris'] },
        { hazard: ['fire', 'burn'], step: ['hot', 'heat', 'solder', 'burn', 'flame', 'fire'] },
        { hazard: ['sharp', 'cut'], step: ['cut', 'strip', 'sharp', 'blade', 'knife', 'trim'] },
        { hazard: ['noise'], step: ['drill', 'noise', 'loud', 'power tool', 'drilling'] },
        { hazard: ['trip', 'slip'], step: ['cable', 'route', 'floor', 'access', 'install'] }
      ];
      
      for (const match of keywords) {
        const hazardMatch = match.hazard.some(keyword => hazardText.includes(keyword));
        const stepMatch = match.step.some(keyword => stepText.includes(keyword));
        
        if (hazardMatch && stepMatch) {
          linkedHazardIds.push(hazard.id);
          break;
        }
      }
    });
    
    return [...new Set(linkedHazardIds)]; // Remove duplicates
  };
  
  // Infer safety requirements from step description
  const inferSafetyRequirements = (step: any): string[] => {
    const safety: string[] = [];
    const combined = `${step.title || ''} ${step.description || ''}`.toLowerCase();
    
    if (combined.includes('isolat') || combined.includes('dead')) {
      safety.push('Isolation and lock-off required');
      safety.push('Prove dead before work');
    }
    if (combined.includes('live') || combined.includes('energis')) {
      safety.push('Live working prohibited unless specifically authorised');
      safety.push('Arc-rated PPE required if switching');
    }
    if (combined.includes('height') || combined.includes('ladder') || combined.includes('podium')) {
      safety.push('Work at height assessment required');
      safety.push('Stable working platform');
    }
    if (combined.includes('drill') || combined.includes('dust')) {
      safety.push('Dust extraction and RPE required');
    }
    if (combined.includes('manual') || combined.includes('lift') || combined.includes('heavy')) {
      safety.push('Manual handling assessment');
    }
    if (combined.includes('test')) {
      safety.push('GS38 compliant test equipment');
      safety.push('Confirm isolation before testing');
    }
    
    return safety.length > 0 ? safety : ['Follow general site safety rules', 'PPE required'];
  };
  
  // Infer equipment from step description
  const inferEquipment = (step: any): string[] => {
    const equipment: string[] = [];
    const combined = `${step.title || ''} ${step.description || ''}`.toLowerCase();
    
    if (combined.includes('test') || combined.includes('prove')) {
      equipment.push('Voltage tester (GS38 compliant)');
      equipment.push('Multi-function tester');
    }
    if (combined.includes('isolat') || combined.includes('lock')) {
      equipment.push('Lock-off kit and tags');
    }
    if (combined.includes('termin') || combined.includes('connect')) {
      equipment.push('Torque screwdriver/wrench');
      equipment.push('Cable strippers');
      equipment.push('Insulated hand tools');
    }
    if (combined.includes('drill') || combined.includes('fix')) {
      equipment.push('Drill with dust extraction');
      equipment.push('PPE (goggles, gloves, RPE)');
    }
    if (combined.includes('label')) {
      equipment.push('Label maker or pre-printed labels');
    }
    if (combined.includes('mount') || combined.includes('install')) {
      equipment.push('Spirit level');
      equipment.push('Fixings and rawlplugs');
    }
    if (combined.includes('cable') || combined.includes('route')) {
      equipment.push('Cable clips and fixings');
      equipment.push('Trunking/conduit as required');
    }
    
    return equipment.length > 0 ? equipment : ['Standard electrician hand tools'];
  };
  
  // Infer qualifications from step description
  const inferQualifications = (step: any): string[] => {
    const quals: string[] = [];
    const combined = `${step.title || ''} ${step.description || ''}`.toLowerCase();
    
    if (combined.includes('isolat') || combined.includes('switch') || combined.includes('energis')) {
      quals.push('Authorised Person (Electrical)');
    }
    if (combined.includes('test') || combined.includes('commission')) {
      quals.push('BS 7671 18th Edition');
      quals.push('Inspection & Testing (2391)');
    }
    if (combined.includes('design') || combined.includes('calculate')) {
      quals.push('Electrical Installation Design');
    }
    
    return quals.length > 0 ? quals : ['Qualified electrician'];
  };
  
  // Handle structured response from installer agent
  if (methodSteps && Array.isArray(methodSteps)) {
    const transformedSteps = methodSteps.map((step, idx) => ({
      id: step.id || `step-${idx + 1}`,
      stepNumber: step.stepNumber || idx + 1,
      title: step.title || step.step || 'Installation Step',
      description: step.description || '',
      estimatedDuration: step.estimatedDuration || step.duration || '30 minutes',
      riskLevel: step.riskLevel || 'medium',
      safetyRequirements: step.safetyRequirements && step.safetyRequirements.length > 0
        ? step.safetyRequirements
        : inferSafetyRequirements(step),
      equipmentNeeded: step.equipmentNeeded && step.equipmentNeeded.length > 0
        ? step.equipmentNeeded
        : step.equipment && step.equipment.length > 0
          ? step.equipment
          : inferEquipment(step),
      qualifications: step.qualifications && step.qualifications.length > 0
        ? step.qualifications
        : inferQualifications(step),
      linkedHazards: linkHazardsToStep(step),
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
        linkedHazards: [],
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
    
    // Link hazards to this step
    currentStep.linkedHazards = linkHazardsToStep(currentStep);
    
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
      linkedHazards: [],
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
    siteManagerName?: string;
    siteManagerPhone?: string;
    firstAiderName?: string;
    firstAiderPhone?: string;
    safetyOfficerName?: string;
    safetyOfficerPhone?: string;
    assemblyPoint?: string;
  }
): { ramsData: RAMSData; methodData: Partial<MethodStatementData> } {
  // Transform H&S response to RAMS risks
  const { risks, hazards, activities } = transformHealthSafetyToRAMS(hsResponse, projectInfo);
  
  // Transform Installer response to method steps (with hazard linking)
  const steps = transformInstallerToMethodSteps(installerResponse, hazards);
  
  // Create RAMS data
  const ramsData: RAMSData = {
    projectName: projectInfo.projectName,
    location: projectInfo.location,
    date: projectInfo.date,
    assessor: projectInfo.assessor,
    contractor: projectInfo.contractor || '',
    supervisor: projectInfo.supervisor || '',
    siteManagerName: projectInfo.siteManagerName || '',
    siteManagerPhone: projectInfo.siteManagerPhone || '',
    firstAiderName: projectInfo.firstAiderName || '',
    firstAiderPhone: projectInfo.firstAiderPhone || '',
    safetyOfficerName: projectInfo.safetyOfficerName || '',
    safetyOfficerPhone: projectInfo.safetyOfficerPhone || '',
    assemblyPoint: projectInfo.assemblyPoint || '',
    activities: activities.length > 0 ? activities : ["Electrical installation work"],
    risks,
    hazards
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
