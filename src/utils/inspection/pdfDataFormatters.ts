import { DistributionBoard, MAIN_BOARD_ID, createDefaultBoard } from '@/types/distributionBoard';
import { TestResult } from '@/types/testResult';

export interface FormattedInspectionData {
  satisfactoryItems: any[];
  criticalDefects: any[];
  improvements: any[];
  limitations: any[];
  totalInspected: number;
  completionPercentage: number;
}

export interface FormattedCircuitData {
  reference: string;
  description: string;
  type: string;
  rating: string;
  cableSize: string;
  installationMethod: string;
  length: string;
  rcdProtected: boolean;
  testResults?: any;
}

export const formatInspectionDataForPDF = (inspectionItems: any[]): FormattedInspectionData => {
  const satisfactoryItems = inspectionItems.filter(item => item.outcome === 'satisfactory');
  const criticalDefects = inspectionItems.filter(item => ['C1', 'C2'].includes(item.outcome));
  const improvements = inspectionItems.filter(item => item.outcome === 'C3');
  const limitations = inspectionItems.filter(item => item.outcome === 'limitation');
  const totalInspected = inspectionItems.length;
  const completionPercentage = totalInspected > 0 ? Math.round((satisfactoryItems.length / totalInspected) * 100) : 0;

  return {
    satisfactoryItems,
    criticalDefects,
    improvements,
    limitations,
    totalInspected,
    completionPercentage
  };
};

export const formatCircuitDataForPDF = (formData: any): FormattedCircuitData[] => {
  // Check multiple possible locations for circuit data
  const circuitSources = [
    formData.circuits,
    formData.scheduleOfTests,
    formData.circuitDetails,
    formData.testResults?.map((test: any) => ({ ...test, testResults: test }))
  ].filter(Boolean);

  let circuits: any[] = [];
  
  // Try each source until we find circuit data
  for (const source of circuitSources) {
    if (Array.isArray(source) && source.length > 0) {
      circuits = source;
      break;
    }
  }

  if (circuits.length === 0) {
    // Create default circuits from form data if available
    const defaultCircuitCount = parseInt(formData.numberOfCircuits || '0', 10);
    if (defaultCircuitCount > 0) {
      circuits = Array.from({ length: Math.min(defaultCircuitCount, 20) }, (_, i) => ({
        reference: `C${i + 1}`,
        description: `Circuit ${i + 1}`,
        type: 'Power'
      }));
    }
  }

  return circuits.map((circuit: any, index: number) => ({
    reference: circuit.reference || circuit.circuitNumber || circuit.circuitRef || `C${index + 1}`,
    description: circuit.description || circuit.circuitDescription || circuit.designation || `Circuit ${index + 1}`,
    type: circuit.type || circuit.circuitType || circuit.wiringType || 'Power',
    rating: (circuit.rating || circuit.mcbRating || circuit.protectiveDeviceRating || '32').toString() + 'A',
    cableSize: (circuit.cableSize || circuit.cableCsa || circuit.liveSize || '2.5').toString() + 'mm2',
    installationMethod: circuit.installationMethod || circuit.referenceMethod || circuit.method || '101',
    length: (circuit.length || circuit.cableLength || circuit.circuitLength || '25').toString() + 'm',
    rcdProtected: circuit.rcdProtected || circuit.rcd === 'yes' || false,
    testResults: circuit.testResults || circuit
  }));
};

export const formatTestResultsForPDF = (formData: any): any[] => {
  // Check multiple possible locations for test results
  const testSources = [
    formData.scheduleOfTests,
    formData.testResults,
    formData.circuits?.filter((c: any) => c.testResults || c.r1r2 || c.zs),
    formData.circuitDetails
  ].filter(Boolean);

  let testResults: any[] = [];
  
  // Try each source until we find test data
  for (const source of testSources) {
    if (Array.isArray(source) && source.length > 0) {
      testResults = source;
      break;
    }
  }

  if (testResults.length === 0) {
    return [];
  }

  return testResults.map((result: any, index: number) => ({
    circuitNumber: result.circuitNumber || result.circuitReference || result.reference || `C${index + 1}`,
    circuitDescription: result.circuitDescription || result.description || result.designation || `Circuit ${index + 1}`,
    protectiveDeviceType: result.protectiveDeviceType || result.deviceType || result.type || 'MCB',
    protectiveDeviceRating: result.protectiveDeviceRating || result.rating || result.mcbRating || '32A',
    liveSize: result.liveSize || result.cableSize || result.cableCsa || '2.5mm2',
    cpcSize: result.cpcSize || result.earthSize || result.liveSize || '2.5mm2',
    r1r2: result.r1r2 || result.r1PlusR2 || 'N/A',
    ringContinuityLive: result.ringContinuityLive || result.ringContinuity || 'N/A',
    insulationLiveNeutral: result.insulationLiveNeutral || result.insulationResistance || result.insulation || 'N/A',
    polarity: result.polarity || (result.polarityTest !== false ? 'OK' : 'X'),
    zs: result.zs || result.earthFaultLoopImpedance || result.loopImpedance || 'N/A',
    rcdRating: result.rcdRating || result.rcdTest || 'N/A',
    rcdOneX: result.rcdOneX || result.rcdTime || result.rcdTripTime || 'N/A',
    pfcLiveNeutral: result.pfcLiveNeutral || result.pfc || result.faultCurrent || 'N/A',
    functionalTesting: result.functionalTesting || (result.functionalTest !== false ? 'OK' : 'X'),
    satisfactory: result.overallResult === 'satisfactory' || result.satisfactory || false,
    overallResult: result.overallResult || (result.satisfactory ? 'SAT' : 'UNSAT'),
    // Enhanced fields for comprehensive testing
    circuitReference: result.circuitReference || result.circuitNumber || `C${index + 1}`,
    installationMethod: result.installationMethod || result.referenceMethod || result.method || '101',
    cableLength: result.cableLength || result.length || '25m',
    rcdProtected: result.rcdProtected || result.rcd === 'yes' || false
  }));
};

export const formatObservationsForPDF = (observations: any[]): any[] => {
  return observations.map((obs, index) => ({
    ...obs,
    index: index + 1,
    codeDescription: getDefectCodeDescription(obs.defectCode),
    urgencyLevel: getUrgencyLevel(obs.defectCode),
    rectificationRequired: obs.defectCode !== 'FI' && obs.defectCode !== 'N/A'
  }));
};

export const getDefectCodeDescription = (code: string): string => {
  const descriptions = {
    'C1': 'Danger present - Risk of injury',
    'C2': 'Potentially dangerous - Urgent remedial action required',  
    'C3': 'Improvement recommended',
    'FI': 'Further investigation required',
    'LIM': 'Limitation of inspection/testing',
    'N/A': 'Not applicable'
  };
  return descriptions[code as keyof typeof descriptions] || 'Unknown';
};

export const getUrgencyLevel = (code: string): string => {
  const urgency = {
    'C1': 'IMMEDIATE',
    'C2': 'URGENT',
    'C3': 'IMPROVEMENT',
    'FI': 'INVESTIGATION',
    'LIM': 'NOTED',
    'N/A': 'N/A'
  };
  return urgency[code as keyof typeof urgency] || 'UNKNOWN';
};

export const formatClientDetails = (formData: any): any => {
  return {
    name: formData.clientName || 'Not specified',
    address: formData.clientAddress || 'Not specified',
    phone: formData.clientPhone || formData.phone || 'Not specified',
    email: formData.clientEmail || formData.email || 'Not specified',
    installationAddress: formData.installationAddress || formData.clientAddress || 'Not specified'
  };
};

export const formatInspectorDetails = (formData: any): any => {
  return {
    name: formData.inspectorName || 'Not specified',
    qualifications: formData.inspectorQualifications || 'Not specified',
    company: formData.companyName || 'Not specified',
    address: formData.companyAddress || 'Not specified',
    phone: formData.companyPhone || 'Not specified',
    email: formData.companyEmail || 'Not specified',
    registrationNumber: formData.registrationNumber || 'Not specified',
    inspectionDate: formData.inspectionDate || 'Not specified',
    nextInspectionDate: formData.nextInspectionDate || 'Not specified',
    signature: formData.inspectorSignature || null
  };
};

export const formatCompanyBranding = (formData: any): any => {
  return {
    logo: formData.companyLogo || null,
    name: formData.companyName || 'Not specified',
    tagline: formData.companyTagline || '',
    accentColor: formData.companyAccentColor || '#3b82f6',
    website: formData.companyWebsite || ''
  };
};

export const formatSupplyCharacteristics = (formData: any): string[] => {
  const characteristics = [];
  
  // Basic supply details
  if (formData.phases) characteristics.push(`Phases: ${formData.phases === '1' ? 'Single' : 'Three'} Phase`);
  if (formData.supplyVoltage) characteristics.push(`Voltage: ${formData.supplyVoltage}V`);
  if (formData.supplyFrequency) characteristics.push(`Frequency: ${formData.supplyFrequency}Hz`);
  if (formData.supplyPME) characteristics.push(`PME: ${formData.supplyPME.toUpperCase()}`);
  
  // Earthing system
  if (formData.earthingArrangement) characteristics.push(`Earthing: ${formData.earthingArrangement}`);
  if (formData.earthElectrodeType && formData.earthElectrodeType !== 'n/a') {
    characteristics.push(`Earth electrode: ${formData.earthElectrodeType}`);
  }
  
  // Protective devices
  if (formData.mainProtectiveDevice) characteristics.push(`Main protective device: ${formData.mainProtectiveDevice}`);
  if (formData.rcdMainSwitch === 'yes' && formData.rcdRating) {
    characteristics.push(`RCD main switch: ${formData.rcdRating}`);
  } else if (formData.rcdMainSwitch === 'no') {
    characteristics.push(`RCD main switch: No`);
  }
  
  // Legacy support
  if (formData.supplyType) characteristics.push(`Supply Type: ${formData.supplyType}`);
  if (formData.nominalVoltage) characteristics.push(`Voltage: ${formData.nominalVoltage}V`);
  if (formData.frequency) characteristics.push(`Frequency: ${formData.frequency}Hz`);
  if (formData.prospectiveFaultCurrent) characteristics.push(`PSCC: ${formData.prospectiveFaultCurrent}kA`);
  if (formData.externalEarthFaultLoopImpedance) characteristics.push(`Ze: ${formData.externalEarthFaultLoopImpedance} Ohms`);
  if (formData.suppliedFrom) characteristics.push(`Supplied from: ${formData.suppliedFrom}`);
  if (formData.installationEarthElectrode) characteristics.push(`Earth electrode: ${formData.installationEarthElectrode}`);
  if (formData.mainEarthingConductor) characteristics.push(`Main earthing conductor: ${formData.mainEarthingConductor}`);
  if (formData.mainBondingLocations) characteristics.push(`Main bonding locations: ${formData.mainBondingLocations}`);
  
  return characteristics.length > 0 ? characteristics : ['Supply characteristics to be confirmed'];
};

export const formatInstallationDetails = (formData: any): string[] => {
  const details = [];
  
  // Basic installation info
  if (formData.description) details.push(`Property type: ${formData.description.replace(/-/g, ' ')}`);
  if (formData.installationType) details.push(`Installation type: ${formData.installationType.replace(/-/g, ' ')}`);
  if (formData.estimatedAge) details.push(`Estimated age: ${formData.estimatedAge} ${formData.ageUnit || 'years'}`);
  
  // Installation history
  if (formData.evidenceOfAlterations === 'yes') {
    details.push(`Alterations: ${formData.alterationsDetails || 'Evidence of alterations observed'}`);
  }
  if (formData.lastInspectionType === 'known' && formData.dateOfLastInspection) {
    details.push(`Last inspection: ${new Date(formData.dateOfLastInspection).toLocaleDateString('en-GB')}`);
  }
  
  // Electrical installation details
  if (formData.boardSize) details.push(`Consumer unit: ${formData.boardSize}`);
  if (formData.intakeCableSize && formData.intakeCableType) {
    details.push(`Intake cable: ${formData.intakeCableSize} ${formData.intakeCableType}`);
  }
  if (formData.tailsSize) details.push(`Meter tails: ${formData.tailsSize}`);
  if (formData.tailsLength) details.push(`Tails length: ${formData.tailsLength}m`);
  
  // Purpose and scope
  if (formData.purposeOfInspection) {
    const purpose = formData.purposeOfInspection === 'other' ? 
      formData.otherPurpose || 'Other purpose' : 
      formData.purposeOfInspection.replace(/-/g, ' ');
    details.push(`Purpose: ${purpose}`);
  }
  if (formData.extentOfInspection) details.push(`Extent: ${formData.extentOfInspection.substring(0, 100)}${formData.extentOfInspection.length > 100 ? '...' : ''}`);
  if (formData.limitationsOfInspection) details.push(`Limitations: ${formData.limitationsOfInspection.substring(0, 100)}${formData.limitationsOfInspection.length > 100 ? '...' : ''}`);
  
  // Legacy support
  if (formData.mainSwitchLocation) details.push(`Main switch: ${formData.mainSwitchLocation}`);
  if (formData.consumerUnitMake) details.push(`Consumer unit: ${formData.consumerUnitMake} ${formData.consumerUnitModel || ''}`.trim());
  if (formData.numberOfCircuits) details.push(`Number of circuits: ${formData.numberOfCircuits}`);
  
  return details.length > 0 ? details : ['Installation details to be confirmed'];
};

// ============================================================================
// Board Grouping for Multi-Board PDF Export
// ============================================================================

export interface BoardGroupedCircuits {
  board: DistributionBoard;
  circuits: any[];
  verificationData: {
    zdb: string;
    ipf: string;
    polarity: boolean;
    phaseSequence: boolean;
    spdStatus: boolean;
    spdNA: boolean;
  };
}

/**
 * Format circuit data grouped by distribution board for PDF export
 * Supports both legacy single-board and new multi-board installations
 */
export const formatCircuitDataGroupedByBoard = (formData: any): BoardGroupedCircuits[] => {
  // Get boards - use distributionBoards if available, otherwise create default main board
  let boards: DistributionBoard[] = formData.distributionBoards || [];

  if (boards.length === 0) {
    // Create a default main board from legacy single-board data
    const mainBoard = createDefaultBoard(MAIN_BOARD_ID, 'Main CU', 0);
    mainBoard.reference = formData.dbReference || 'Main CU';
    mainBoard.zdb = formData.zdb || '';
    mainBoard.ipf = formData.ipf || '';
    mainBoard.confirmedCorrectPolarity = formData.confirmedCorrectPolarity || false;
    mainBoard.confirmedPhaseSequence = formData.confirmedPhaseSequence || false;
    mainBoard.spdOperationalStatus = formData.spdOperationalStatus || false;
    mainBoard.spdNA = formData.spdNA || false;
    boards = [mainBoard];
  }

  // Get all circuits/test results
  const allCircuits = formatTestResultsForPDF(formData);

  // Get raw circuit data for boardId lookup
  const rawCircuits: TestResult[] = formData.scheduleOfTests || formData.testResults || formData.circuits || [];

  // Group circuits by board
  return boards
    .sort((a, b) => a.order - b.order)
    .map(board => {
      // Find circuits belonging to this board
      const boardCircuits = allCircuits.filter((circuit, index) => {
        const rawCircuit = rawCircuits[index];
        const circuitBoardId = rawCircuit?.boardId || MAIN_BOARD_ID;
        return circuitBoardId === board.id;
      });

      return {
        board,
        circuits: boardCircuits,
        verificationData: {
          zdb: board.zdb || '',
          ipf: board.ipf || '',
          polarity: board.confirmedCorrectPolarity || false,
          phaseSequence: board.confirmedPhaseSequence || false,
          spdStatus: board.spdOperationalStatus || false,
          spdNA: board.spdNA || false,
        },
      };
    });
};

/**
 * Check if form data has multiple boards
 */
export const hasMultipleBoards = (formData: any): boolean => {
  return (formData.distributionBoards?.length || 0) > 1;
};

/**
 * Get total circuit count across all boards
 */
export const getTotalCircuitCount = (boardGroups: BoardGroupedCircuits[]): number => {
  return boardGroups.reduce((total, group) => total + group.circuits.length, 0);
};