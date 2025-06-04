
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EICRReport, EICRFault, EICRCircuit, EICRSession } from '@/types/eicr';
import { TestResult } from '@/types/inspection-testing';

interface EICRContextType {
  eicrSession: EICRSession | null;
  initializeEICR: (installationDetails: any, inspectorDetails: any) => void;
  addFault: (fault: Omit<EICRFault, 'id' | 'timestamp'>) => void;
  updateFault: (id: string, updates: Partial<EICRFault>) => void;
  removeFault: (id: string) => void;
  addCircuit: (circuit: EICRCircuit) => void;
  updateCircuit: (ref: string, updates: Partial<EICRCircuit>) => void;
  populateFromTestResult: (stepId: string, result: TestResult) => void;
  generateEICRReport: () => EICRReport | null;
  setAutoPopulate: (enabled: boolean) => void;
}

const EICRContext = createContext<EICRContextType | undefined>(undefined);

export const useEICR = () => {
  const context = useContext(EICRContext);
  if (!context) {
    throw new Error('useEICR must be used within an EICRProvider');
  }
  return context;
};

interface EICRProviderProps {
  children: ReactNode;
}

export const EICRProvider = ({ children }: EICRProviderProps) => {
  const [eicrSession, setEicrSession] = useState<EICRSession | null>(null);

  const initializeEICR = (installationDetails: any, inspectorDetails: any) => {
    const newReport: EICRReport = {
      id: `eicr-${Date.now()}`,
      installation_details: {
        address: installationDetails.address || '',
        description: installationDetails.description || '',
        estimated_age: installationDetails.estimatedAge || '',
        evidence_of_alterations: installationDetails.alterations || false,
        earthing_arrangements: installationDetails.earthing || '',
        supply_characteristics: installationDetails.supply || '',
        main_switch_rating: installationDetails.mainSwitch || '',
        main_earthing_conductor: installationDetails.mainEarth || '',
        main_bonding_conductors: installationDetails.mainBonding || '',
      },
      inspection_details: {
        extent_of_inspection: '100% visual inspection, sample testing of circuits',
        limitations: [],
        departures_from_bs7671: [],
        risk_assessment_required: false,
      },
      circuits: [],
      faults: [],
      overall_assessment: 'satisfactory',
      inspector_details: {
        name: inspectorDetails.name || '',
        qualification: inspectorDetails.qualification || '',
        signature_date: new Date(),
      },
      created_at: new Date(),
      updated_at: new Date(),
    };

    setEicrSession({
      eicr_report: newReport,
      auto_populate: true,
    });
  };

  const addFault = (fault: Omit<EICRFault, 'id' | 'timestamp'>) => {
    if (!eicrSession) return;

    const newFault: EICRFault = {
      ...fault,
      id: `fault-${Date.now()}`,
      timestamp: new Date(),
    };

    setEicrSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        eicr_report: {
          ...prev.eicr_report,
          faults: [...prev.eicr_report.faults, newFault],
          overall_assessment: newFault.faultCode === 'C1' || newFault.faultCode === 'C2' ? 'unsatisfactory' : prev.eicr_report.overall_assessment,
          updated_at: new Date(),
        },
      };
    });
  };

  const updateFault = (id: string, updates: Partial<EICRFault>) => {
    if (!eicrSession) return;

    setEicrSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        eicr_report: {
          ...prev.eicr_report,
          faults: prev.eicr_report.faults.map(fault =>
            fault.id === id ? { ...fault, ...updates } : fault
          ),
          updated_at: new Date(),
        },
      };
    });
  };

  const removeFault = (id: string) => {
    if (!eicrSession) return;

    setEicrSession(prev => {
      if (!prev) return null;
      const updatedFaults = prev.eicr_report.faults.filter(fault => fault.id !== id);
      const hasC1OrC2 = updatedFaults.some(fault => fault.faultCode === 'C1' || fault.faultCode === 'C2');
      
      return {
        ...prev,
        eicr_report: {
          ...prev.eicr_report,
          faults: updatedFaults,
          overall_assessment: hasC1OrC2 ? 'unsatisfactory' : 'satisfactory',
          updated_at: new Date(),
        },
      };
    });
  };

  const addCircuit = (circuit: EICRCircuit) => {
    if (!eicrSession) return;

    setEicrSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        eicr_report: {
          ...prev.eicr_report,
          circuits: [...prev.eicr_report.circuits, circuit],
          updated_at: new Date(),
        },
      };
    });
  };

  const updateCircuit = (ref: string, updates: Partial<EICRCircuit>) => {
    if (!eicrSession) return;

    setEicrSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        eicr_report: {
          ...prev.eicr_report,
          circuits: prev.eicr_report.circuits.map(circuit =>
            circuit.ref === ref ? { ...circuit, ...updates } : circuit
          ),
          updated_at: new Date(),
        },
      };
    });
  };

  const populateFromTestResult = (stepId: string, result: TestResult) => {
    if (!eicrSession || !eicrSession.auto_populate) return;

    // Auto-populate based on test result
    if (result.status === 'failed' || (result.isWithinLimits === false)) {
      const faultCode = determineFaultCode(stepId, result);
      if (faultCode) {
        addFault({
          circuitRef: eicrSession.current_circuit || 'Unknown',
          circuitType: 'other',
          faultCode,
          description: generateFaultDescription(stepId, result),
          location: 'To be specified',
          remedy: generateRemedyRecommendation(stepId, result),
          stepId,
        });
      }
    }

    // Update circuit data if available
    if (eicrSession.current_circuit) {
      const circuitUpdates = generateCircuitUpdates(stepId, result);
      if (Object.keys(circuitUpdates).length > 0) {
        updateCircuit(eicrSession.current_circuit, circuitUpdates);
      }
    }
  };

  const determineFaultCode = (stepId: string, result: TestResult): 'C1' | 'C2' | 'C3' | null => {
    // Determine fault severity based on test type and result
    if (stepId.includes('insulation') && result.value && result.value < 0.5) {
      return 'C1'; // Dangerous - low insulation
    }
    if (stepId.includes('earth-fault-loop') && result.value && result.value > 1.44) {
      return 'C2'; // Potentially dangerous - high Zs
    }
    if (stepId.includes('rcd') && result.value && result.value > 300) {
      return 'C2'; // Potentially dangerous - slow RCD
    }
    if (stepId.includes('continuity') && result.value && result.value > 0.05) {
      return 'C3'; // Improvement recommended
    }
    return 'C3'; // Default to improvement recommended
  };

  const generateFaultDescription = (stepId: string, result: TestResult): string => {
    if (stepId.includes('insulation')) {
      return `Insulation resistance below minimum requirement: ${result.value}${result.unit}`;
    }
    if (stepId.includes('earth-fault-loop')) {
      return `Earth fault loop impedance exceeds maximum permitted: ${result.value}${result.unit}`;
    }
    if (stepId.includes('rcd')) {
      return `RCD operation time exceeds maximum permitted: ${result.value}${result.unit}`;
    }
    if (stepId.includes('continuity')) {
      return `High resistance in protective conductor: ${result.value}${result.unit}`;
    }
    return `Test failure detected in ${stepId}`;
  };

  const generateRemedyRecommendation = (stepId: string, result: TestResult): string => {
    if (stepId.includes('insulation')) {
      return 'Investigate and rectify insulation fault. Re-test before energizing.';
    }
    if (stepId.includes('earth-fault-loop')) {
      return 'Check earthing arrangements and protective conductor continuity.';
    }
    if (stepId.includes('rcd')) {
      return 'RCD to be replaced or repaired by competent person.';
    }
    if (stepId.includes('continuity')) {
      return 'Check and tighten all protective conductor connections.';
    }
    return 'Further investigation required by competent person.';
  };

  const generateCircuitUpdates = (stepId: string, result: TestResult): Partial<EICRCircuit> => {
    const updates: Partial<EICRCircuit> = {};

    if (stepId.includes('earth-fault-loop') && result.value !== undefined) {
      updates.measured_zs = result.value;
      updates.overall_condition = result.isWithinLimits !== false ? 'satisfactory' : 'unsatisfactory';
    }
    if (stepId.includes('insulation') && result.value !== undefined) {
      updates.insulation_resistance = result.value;
    }
    if (stepId.includes('polarity')) {
      updates.polarity_correct = result.status === 'completed';
    }
    if (stepId.includes('rcd') && result.value !== undefined) {
      updates.rcd_operation = result.value;
    }
    if (stepId.includes('continuity') && result.value !== undefined) {
      updates.continuity_cpc = result.value;
    }

    return updates;
  };

  const generateEICRReport = (): EICRReport | null => {
    return eicrSession?.eicr_report || null;
  };

  const setAutoPopulate = (enabled: boolean) => {
    if (!eicrSession) return;
    
    setEicrSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        auto_populate: enabled,
      };
    });
  };

  return (
    <EICRContext.Provider
      value={{
        eicrSession,
        initializeEICR,
        addFault,
        updateFault,
        removeFault,
        addCircuit,
        updateCircuit,
        populateFromTestResult,
        generateEICRReport,
        setAutoPopulate,
      }}
    >
      {children}
    </EICRContext.Provider>
  );
};
