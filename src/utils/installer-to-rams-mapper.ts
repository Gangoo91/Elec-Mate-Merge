import { RAMSData, RAMSRisk } from '@/types/rams';
import { InstallerAgentOutput, InstallerStepOutput } from './rams-transformer';
import { v4 as uuidv4 } from 'uuid';

/**
 * Extracts hazards from installation procedures and maps to RAMS activities
 * Identifies risks based on installation methods and work environment
 */
export function extractHazardsFromInstallation(
  installerOutput: InstallerAgentOutput,
  projectName: string,
  location: string,
  assessor: string
): RAMSData {
  const identifiedHazards = new Set<string>();
  const activities = new Set<string>();
  
  // Extract activities and hazards from each installation step
  installerOutput.steps.forEach(step => {
    activities.add(extractActivity(step));
    step.hazards?.forEach(hazard => identifiedHazards.add(hazard));
    
    // Identify implicit hazards from step description
    const implicitHazards = identifyImplicitHazards(step);
    implicitHazards.forEach(hazard => identifiedHazards.add(hazard));
  });

  const risks: RAMSRisk[] = Array.from(identifiedHazards).map(hazard => {
    const riskData = mapHazardToRisk(hazard, installerOutput);
    return {
      id: uuidv4(),
      hazard: riskData.hazard,
      risk: riskData.risk,
      likelihood: riskData.likelihood,
      severity: riskData.severity,
      riskRating: riskData.likelihood * riskData.severity,
      controls: riskData.controls,
      residualRisk: calculateResidualRisk(riskData.likelihood, riskData.severity, riskData.controls),
      responsible: assessor,
    };
  });

  return {
    projectName,
    location,
    date: new Date().toISOString().split('T')[0],
    assessor,
    activities: Array.from(activities),
    risks,
  };
}

function extractActivity(step: InstallerStepOutput): string {
  // Extract main activity from step description
  const verbs = ['install', 'mount', 'fix', 'connect', 'terminate', 'test', 'inspect'];
  const desc = step.description.toLowerCase();
  
  for (const verb of verbs) {
    if (desc.includes(verb)) {
      return step.description.split('.')[0];
    }
  }
  
  return `Installation work - Step ${step.stepNumber}`;
}

function identifyImplicitHazards(step: InstallerStepOutput): string[] {
  const hazards: string[] = [];
  const desc = step.description.toLowerCase();
  
  // Work at height
  if (desc.includes('ladder') || desc.includes('scaffold') || desc.includes('ceiling') || desc.includes('overhead')) {
    hazards.push('Work at height');
  }
  
  // Electrical hazards
  if (desc.includes('live') || desc.includes('energized') || desc.includes('voltage')) {
    hazards.push('Electrical shock');
  }
  
  // Manual handling
  if (desc.includes('cable') || desc.includes('equipment') || desc.includes('panel')) {
    hazards.push('Manual handling');
  }
  
  // Confined spaces
  if (desc.includes('confined') || desc.includes('enclosure') || desc.includes('duct')) {
    hazards.push('Confined space');
  }
  
  // Drilling/cutting
  if (desc.includes('drill') || desc.includes('cut') || desc.includes('chase')) {
    hazards.push('Dust and debris');
  }
  
  return hazards;
}

interface RiskAssessment {
  hazard: string;
  risk: string;
  likelihood: number;
  severity: number;
  controls: string;
}

function mapHazardToRisk(hazard: string, installerOutput: InstallerAgentOutput): RiskAssessment {
  const hazardLower = hazard.toLowerCase();
  
  // BS 7671 and HSE standard controls for common electrical hazards
  const hazardMap: Record<string, RiskAssessment> = {
    'electrical shock': {
      hazard: 'Electrical shock from live conductors',
      risk: 'Electric shock causing injury or death',
      likelihood: 3,
      severity: 5,
      controls: 'Isolate supply, lock off, test dead before work, use voltage indicator, appropriate PPE (insulated gloves, safety footwear), competent person only',
    },
    'work at height': {
      hazard: 'Falls from height',
      risk: 'Serious injury from falling',
      likelihood: 3,
      severity: 4,
      controls: 'Use appropriate access equipment (scaffold/MEWP), edge protection, harness if required, inspection before use, 3-point contact on ladders',
    },
    'manual handling': {
      hazard: 'Manual handling of cables and equipment',
      risk: 'Musculoskeletal injury',
      likelihood: 4,
      severity: 2,
      controls: 'Assess load before lifting, team lift for heavy items, use cable drums/reels, mechanical aids where possible, proper lifting technique',
    },
    'confined space': {
      hazard: 'Working in confined spaces',
      risk: 'Asphyxiation, entrapment',
      likelihood: 2,
      severity: 5,
      controls: 'Confined space risk assessment, atmosphere testing, forced ventilation, emergency rescue plan, communication system, trained personnel',
    },
    'dust and debris': {
      hazard: 'Dust and debris from drilling/cutting',
      risk: 'Respiratory issues, eye injury',
      likelihood: 4,
      severity: 2,
      controls: 'Dust extraction equipment, RPE (respiratory protective equipment), safety glasses, wet cutting where possible, clean as you go',
    },
  };
  
  // Find matching hazard or create generic one
  for (const [key, assessment] of Object.entries(hazardMap)) {
    if (hazardLower.includes(key)) {
      return assessment;
    }
  }
  
  // Generic hazard assessment
  return {
    hazard: hazard,
    risk: 'Potential injury or damage',
    likelihood: 3,
    severity: 3,
    controls: 'Follow safe working procedures, appropriate PPE, competent person, risk assessment before work',
  };
}

function calculateResidualRisk(likelihood: number, severity: number, controls: string): number {
  // With proper controls, reduce likelihood by 2 levels (minimum 1)
  const reducedLikelihood = Math.max(1, likelihood - 2);
  // Controls may also reduce severity by 1 level for certain hazards
  const reducedSeverity = severity > 3 ? severity - 1 : severity;
  
  return reducedLikelihood * reducedSeverity;
}
