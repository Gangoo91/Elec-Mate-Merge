
export interface EICRFormData {
  installationDetails?: {
    address: string;
    description: string;
    age: string;
    earthingSystem: string;
    supply: string;
    mainSwitch: string;
    mainEarth: string;
    mainBonding: string;
    alterations: boolean;
  };
  inspectorDetails?: {
    name: string;
    qualification: string;
    company: string;
    registrationNumber: string;
    contactDetails: string;
  };
  circuitInformation?: any[];
  visualInspectionResults?: any;
  testingResults?: any;
}

const STORAGE_KEYS = {
  INSTALLATION_DETAILS: 'eicr-installation-details',
  INSPECTOR_DETAILS: 'eicr-inspector-details',
  CIRCUIT_INFORMATION: 'eicr-circuit-information',
  VISUAL_INSPECTION_RESULTS: 'eicr-visual-inspection-results',
  TESTING_RESULTS: 'eicr-testing-results',
  INSPECTION_COMPLETE: 'eicr-inspection-complete',
  TESTING_COMPLETE: 'eicr-testing-complete',
} as const;

export class EICRDataManager {
  // Save individual sections
  static saveInstallationDetails(data: EICRFormData['installationDetails']) {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.INSTALLATION_DETAILS, JSON.stringify(data));
    }
  }

  static saveInspectorDetails(data: EICRFormData['inspectorDetails']) {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.INSPECTOR_DETAILS, JSON.stringify(data));
    }
  }

  static saveCircuitInformation(data: EICRFormData['circuitInformation']) {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.CIRCUIT_INFORMATION, JSON.stringify(data));
    }
  }

  static saveVisualInspectionResults(data: EICRFormData['visualInspectionResults']) {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.VISUAL_INSPECTION_RESULTS, JSON.stringify(data));
    }
  }

  static saveTestingResults(data: EICRFormData['testingResults']) {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.TESTING_RESULTS, JSON.stringify(data));
    }
  }

  // Load individual sections
  static loadInstallationDetails(): EICRFormData['installationDetails'] | null {
    const data = localStorage.getItem(STORAGE_KEYS.INSTALLATION_DETAILS);
    return data ? JSON.parse(data) : null;
  }

  static loadInspectorDetails(): EICRFormData['inspectorDetails'] | null {
    const data = localStorage.getItem(STORAGE_KEYS.INSPECTOR_DETAILS);
    return data ? JSON.parse(data) : null;
  }

  static loadCircuitInformation(): EICRFormData['circuitInformation'] | null {
    const data = localStorage.getItem(STORAGE_KEYS.CIRCUIT_INFORMATION);
    return data ? JSON.parse(data) : null;
  }

  static loadVisualInspectionResults(): EICRFormData['visualInspectionResults'] | null {
    const data = localStorage.getItem(STORAGE_KEYS.VISUAL_INSPECTION_RESULTS);
    return data ? JSON.parse(data) : null;
  }

  static loadTestingResults(): EICRFormData['testingResults'] | null {
    const data = localStorage.getItem(STORAGE_KEYS.TESTING_RESULTS);
    return data ? JSON.parse(data) : null;
  }

  // Load complete EICR data
  static loadCompleteEICRData(): EICRFormData {
    return {
      installationDetails: this.loadInstallationDetails(),
      inspectorDetails: this.loadInspectorDetails(),
      circuitInformation: this.loadCircuitInformation(),
      visualInspectionResults: this.loadVisualInspectionResults(),
      testingResults: this.loadTestingResults(),
    };
  }

  // Check completion status
  static isInstallationDetailsComplete(): boolean {
    const data = this.loadInstallationDetails();
    return !!(data?.address && data?.description && data?.earthingSystem && data?.supply);
  }

  static isInspectorDetailsComplete(): boolean {
    const data = this.loadInspectorDetails();
    return !!(data?.name && data?.qualification);
  }

  static isCircuitInformationComplete(): boolean {
    const data = this.loadCircuitInformation();
    return !!(data && data.length > 0);
  }

  static isVisualInspectionComplete(): boolean {
    return localStorage.getItem(STORAGE_KEYS.INSPECTION_COMPLETE) === 'true';
  }

  static isTestingComplete(): boolean {
    return localStorage.getItem(STORAGE_KEYS.TESTING_COMPLETE) === 'true';
  }

  // Set completion flags
  static setVisualInspectionComplete(complete: boolean = true) {
    localStorage.setItem(STORAGE_KEYS.INSPECTION_COMPLETE, complete.toString());
  }

  static setTestingComplete(complete: boolean = true) {
    localStorage.setItem(STORAGE_KEYS.TESTING_COMPLETE, complete.toString());
  }

  // Get overall progress
  static getOverallProgress(): number {
    const steps = [
      this.isInstallationDetailsComplete(),
      this.isInspectorDetailsComplete(),
      this.isCircuitInformationComplete(),
      this.isVisualInspectionComplete(),
      this.isTestingComplete(),
    ];
    
    const completedSteps = steps.filter(Boolean).length;
    return (completedSteps / steps.length) * 100;
  }

  // Clear all EICR data
  static clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Export EICR data for reporting
  static exportEICRData(): EICRFormData & { metadata: any } {
    const completeData = this.loadCompleteEICRData();
    
    return {
      ...completeData,
      metadata: {
        completionStatus: {
          installationDetails: this.isInstallationDetailsComplete(),
          inspectorDetails: this.isInspectorDetailsComplete(),
          circuitInformation: this.isCircuitInformationComplete(),
          visualInspection: this.isVisualInspectionComplete(),
          testing: this.isTestingComplete(),
        },
        overallProgress: this.getOverallProgress(),
        exportedAt: new Date().toISOString(),
      }
    };
  }

  // Validate EICR data completeness
  static validateEICRCompleteness(): { isComplete: boolean; missingSteps: string[] } {
    const missingSteps: string[] = [];
    
    if (!this.isInstallationDetailsComplete()) {
      missingSteps.push('Installation Details');
    }
    if (!this.isInspectorDetailsComplete()) {
      missingSteps.push('Inspector Details');
    }
    if (!this.isCircuitInformationComplete()) {
      missingSteps.push('Circuit Information');
    }
    if (!this.isVisualInspectionComplete()) {
      missingSteps.push('Visual Inspection');
    }
    if (!this.isTestingComplete()) {
      missingSteps.push('Testing & Results');
    }
    
    return {
      isComplete: missingSteps.length === 0,
      missingSteps,
    };
  }
}

export default EICRDataManager;
