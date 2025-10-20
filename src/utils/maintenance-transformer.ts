/**
 * Maintenance Transformer
 * Converts Maintenance Agent JSON output into PDF-ready format
 */

export interface MaintenanceAgentOutput {
  response: string;
  equipmentSummary: {
    equipmentType: string;
    location?: string;
    installationAge?: string;
    maintenanceType: 'preventive' | 'reactive' | 'periodic_inspection';
    overallRiskLevel: 'low' | 'medium' | 'high';
  };
  preWorkRequirements: Array<{
    category: 'isolation' | 'ppe' | 'access' | 'permits' | 'tools';
    requirement: string;
    mandatory: boolean;
    bs7671Reference?: string;
  }>;
  visualInspection: Array<{
    stepNumber: number;
    checkpoint: string;
    acceptanceCriteria: string;
    failureAction?: string;
    bs7671Reference?: string;
  }>;
  testingProcedures: Array<{
    testName: string;
    testType: 'dead' | 'live';
    sequence: number;
    instrumentRequired?: string;
    instrumentSettings?: string;
    procedure: string[];
    expectedResult: {
      value: string;
      unit?: string;
      passFailCriteria: string;
    };
    bs7671Reference?: string;
  }>;
  servicingTasks?: Array<{
    component: string;
    task: string;
    frequency?: string;
    torqueSettings?: string;
    consumables?: string[];
    procedure: string[];
  }>;
  documentation: {
    recordsRequired: string[];
    signOffRequirements: string[];
    nextDueCalculation: string;
    certificatesIssued?: string[];
  };
  commonFaults?: Array<{
    symptom: string;
    likelyCauses: string[];
    diagnosisSteps: string[];
    remedialAction: string;
    partsRequired?: string[];
  }>;
  bs7671References: Array<{
    regulation: string;
    title: string;
    relevance: string;
  }>;
}

export interface MaintenancePDFData {
  title: string;
  equipment: {
    type: string;
    location: string;
    age: string;
    maintenanceType: string;
    riskLevel: string;
  };
  overview: string;
  sections: Array<{
    title: string;
    content: string;
    subsections?: Array<{
      title: string;
      content: string;
      type?: 'list' | 'table' | 'paragraph';
    }>;
  }>;
  appendices: Array<{
    title: string;
    content: string;
  }>;
}

/**
 * Transforms maintenance agent output into PDF-ready format
 */
export function transformMaintenanceOutputToPDF(
  maintenanceOutput: MaintenanceAgentOutput,
  projectDetails: {
    equipmentType?: string;
    location?: string;
    installationAge?: string;
  }
): MaintenancePDFData {
  const { equipmentSummary, response } = maintenanceOutput;

  // Build PDF data structure
  const pdfData: MaintenancePDFData = {
    title: `Maintenance Instruction - ${equipmentSummary.equipmentType}`,
    equipment: {
      type: equipmentSummary.equipmentType,
      location: equipmentSummary.location || projectDetails.location || 'Not specified',
      age: equipmentSummary.installationAge || projectDetails.installationAge || 'Not specified',
      maintenanceType: equipmentSummary.maintenanceType,
      riskLevel: equipmentSummary.overallRiskLevel
    },
    overview: response,
    sections: [],
    appendices: []
  };

  // Section 1: Pre-Work Requirements
  const preWorkContent = maintenanceOutput.preWorkRequirements
    .map(req => {
      const mandatoryLabel = req.mandatory ? '**[MANDATORY]**' : '[RECOMMENDED]';
      const regRef = req.bs7671Reference ? ` (${req.bs7671Reference})` : '';
      return `• ${mandatoryLabel} **${req.category.toUpperCase()}**: ${req.requirement}${regRef}`;
    })
    .join('\n');

  pdfData.sections.push({
    title: 'SECTION 1: PRE-WORK REQUIREMENTS',
    content: 'Complete the following before starting maintenance work:',
    subsections: [{
      title: 'Safety Requirements',
      content: preWorkContent,
      type: 'list'
    }]
  });

  // Section 2: Visual Inspection
  const visualInspectionContent = maintenanceOutput.visualInspection
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map(step => {
      const regRef = step.bs7671Reference ? ` *(${step.bs7671Reference})*` : '';
      let content = `**Step ${step.stepNumber}: ${step.checkpoint}**${regRef}\n`;
      content += `  - ✓ Acceptance Criteria: ${step.acceptanceCriteria}\n`;
      if (step.failureAction) {
        content += `  - ⚠ Failure Action: ${step.failureAction}`;
      }
      return content;
    })
    .join('\n\n');

  pdfData.sections.push({
    title: 'SECTION 2: VISUAL INSPECTION SEQUENCE',
    content: 'Perform systematic visual inspection in the following order:',
    subsections: [{
      title: 'Inspection Checkpoints',
      content: visualInspectionContent,
      type: 'paragraph'
    }]
  });

  // Section 3: Testing Procedures
  const deadTests = maintenanceOutput.testingProcedures
    .filter(t => t.testType === 'dead')
    .sort((a, b) => a.sequence - b.sequence);
  
  const liveTests = maintenanceOutput.testingProcedures
    .filter(t => t.testType === 'live')
    .sort((a, b) => a.sequence - b.sequence);

  const formatTest = (test: MaintenanceAgentOutput['testingProcedures'][0]) => {
    const regRef = test.bs7671Reference ? ` *(${test.bs7671Reference})*` : '';
    let content = `**${test.testName}**${regRef}\n`;
    if (test.instrumentRequired) {
      content += `  - Instrument: ${test.instrumentRequired}\n`;
    }
    if (test.instrumentSettings) {
      content += `  - Settings: ${test.instrumentSettings}\n`;
    }
    content += `  - Procedure:\n`;
    test.procedure.forEach((step, idx) => {
      content += `    ${idx + 1}. ${step}\n`;
    });
    const unit = test.expectedResult.unit ? ` ${test.expectedResult.unit}` : '';
    content += `  - Expected Result: ${test.expectedResult.value}${unit}\n`;
    content += `  - Pass/Fail: ${test.expectedResult.passFailCriteria}`;
    return content;
  };

  pdfData.sections.push({
    title: 'SECTION 3: TESTING PROCEDURES',
    content: 'Perform tests in the sequence specified below.',
    subsections: [
      {
        title: '3.1 Dead Tests (Isolation Required)',
        content: deadTests.map(formatTest).join('\n\n'),
        type: 'paragraph'
      },
      {
        title: '3.2 Live Tests',
        content: liveTests.map(formatTest).join('\n\n'),
        type: 'paragraph'
      }
    ]
  });

  // Section 4: Servicing Tasks (if applicable)
  if (maintenanceOutput.servicingTasks && maintenanceOutput.servicingTasks.length > 0) {
    const servicingContent = maintenanceOutput.servicingTasks
      .map(task => {
        let content = `**Component: ${task.component}**\n`;
        content += `  - Task: ${task.task}\n`;
        if (task.frequency) {
          content += `  - Frequency: ${task.frequency}\n`;
        }
        if (task.torqueSettings) {
          content += `  - Torque: ${task.torqueSettings}\n`;
        }
        if (task.consumables && task.consumables.length > 0) {
          content += `  - Consumables: ${task.consumables.join(', ')}\n`;
        }
        content += `  - Procedure:\n`;
        task.procedure.forEach((step, idx) => {
          content += `    ${idx + 1}. ${step}\n`;
        });
        return content;
      })
      .join('\n\n');

    pdfData.sections.push({
      title: 'SECTION 4: SERVICING TASKS',
      content: servicingContent,
      subsections: []
    });
  }

  // Section 5: Documentation & Sign-Off
  const docContent = `**Records Required:**\n${maintenanceOutput.documentation.recordsRequired.map(r => `• ${r}`).join('\n')}\n\n` +
    `**Sign-Off Requirements:**\n${maintenanceOutput.documentation.signOffRequirements.map(r => `• ${r}`).join('\n')}\n\n` +
    `**Next Due Calculation:**\n${maintenanceOutput.documentation.nextDueCalculation}` +
    (maintenanceOutput.documentation.certificatesIssued && maintenanceOutput.documentation.certificatesIssued.length > 0 
      ? `\n\n**Certificates to Issue:**\n${maintenanceOutput.documentation.certificatesIssued.map(c => `• ${c}`).join('\n')}` 
      : '');

  pdfData.sections.push({
    title: 'SECTION 5: DOCUMENTATION & SIGN-OFF',
    content: docContent,
    subsections: []
  });

  // Appendix A: Common Faults (if applicable)
  if (maintenanceOutput.commonFaults && maintenanceOutput.commonFaults.length > 0) {
    const faultsContent = maintenanceOutput.commonFaults
      .map((fault, idx) => {
        let content = `**Fault ${idx + 1}: ${fault.symptom}**\n\n`;
        content += `*Likely Causes:*\n${fault.likelyCauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\n`;
        content += `*Diagnosis Steps:*\n${fault.diagnosisSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n`;
        content += `*Remedial Action:*\n${fault.remedialAction}`;
        if (fault.partsRequired && fault.partsRequired.length > 0) {
          content += `\n\n*Parts Required:* ${fault.partsRequired.join(', ')}`;
        }
        return content;
      })
      .join('\n\n---\n\n');

    pdfData.appendices.push({
      title: 'APPENDIX A: COMMON FAULTS & DIAGNOSIS',
      content: faultsContent
    });
  }

  // Appendix B: BS 7671 References
  const referencesContent = maintenanceOutput.bs7671References
    .map(ref => `**${ref.regulation}** - ${ref.title}\n  ${ref.relevance}`)
    .join('\n\n');

  pdfData.appendices.push({
    title: 'APPENDIX B: BS 7671 REFERENCES',
    content: referencesContent
  });

  return pdfData;
}
