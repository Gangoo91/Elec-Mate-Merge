
import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { EICRFault } from '@/types/eicr';

export interface EICRData {
  installationDetails?: any;
  inspectorDetails?: any;
  circuits?: any[];
  testResults?: any[];
  observations?: any[];
}

export interface TestResult {
  stepId: string;
  value?: number;
  unit?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  notes?: string;
  timestamp: Date;
  isWithinLimits?: boolean;
}

export interface EICRSession {
  eicr_report: any;
  auto_populate: boolean;
  current_circuit?: string;
}

interface EICRContextType {
  eicr: EICRData;
  eicrSession: EICRSession;
  updateEICR: (data: Partial<EICRData>) => void;
  populateFromTestResult: (stepId: string, result: TestResult) => void;
  initializeEICR: (installationDetails: any, inspectorDetails: any) => void;
  resetEICR: () => void;
  generateEICRReport: () => any;
  setAutoPopulate: (value: boolean) => void;
  addFault: (fault: EICRFault) => void;
  updateFault: (id: string, fault: Partial<EICRFault>) => void;
  removeFault: (id: string) => void;
}

const EICRContext = createContext<EICRContextType | undefined>(undefined);

export const useEICR = () => {
  const context = useContext(EICRContext);
  if (context === undefined) {
    throw new Error('useEICR must be used within an EICRProvider');
  }
  return context;
};

interface EICRProviderProps {
  children: ReactNode;
}

export const EICRProvider: React.FC<EICRProviderProps> = ({ children }) => {
  const [eicr, setEICR] = useState<EICRData>({
    circuits: [],
    testResults: [],
    observations: []
  });

  const [eicrSession, setEICRSession] = useState<EICRSession>({
    eicr_report: {},
    auto_populate: false
  });

  const updateEICR = useCallback((data: Partial<EICRData>) => {
    setEICR(prev => ({ ...prev, ...data }));
  }, []);

  const populateFromTestResult = useCallback((stepId: string, result: TestResult) => {
    console.log('Populating EICR from test result:', { stepId, result });

    setEICR(prev => ({
      ...prev,
      testResults: [
        ...(prev.testResults || []).filter(r => r.stepId !== stepId),
        result
      ]
    }));
  }, []);

  const initializeEICR = useCallback((installationDetails: any, inspectorDetails: any) => {
    setEICR({
      installationDetails,
      inspectorDetails,
      circuits: [],
      testResults: [],
      observations: []
    });
  }, []);

  const resetEICR = useCallback(() => {
    setEICR({
      circuits: [],
      testResults: [],
      observations: []
    });
    setEICRSession({
      eicr_report: {},
      auto_populate: false
    });
  }, []);

  const generateEICRReport = useCallback(() => {
    return {
      ...eicr,
      generatedAt: new Date(),
      session: eicrSession
    };
  }, [eicr, eicrSession]);

  const setAutoPopulate = useCallback((value: boolean) => {
    setEICRSession(prev => ({
      ...prev,
      auto_populate: value
    }));
  }, []);

  const addFault = useCallback((fault: EICRFault) => {
    setEICR(prev => ({
      ...prev,
      observations: [...(prev.observations || []), fault]
    }));
  }, []);

  const updateFault = useCallback((id: string, faultUpdate: Partial<EICRFault>) => {
    setEICR(prev => ({
      ...prev,
      observations: (prev.observations || []).map(fault =>
        fault.id === id ? { ...fault, ...faultUpdate } : fault
      )
    }));
  }, []);

  const removeFault = useCallback((id: string) => {
    setEICR(prev => ({
      ...prev,
      observations: (prev.observations || []).filter(fault => fault.id !== id)
    }));
  }, []);

  const value = useMemo(() => ({
    eicr,
    eicrSession,
    updateEICR,
    populateFromTestResult,
    initializeEICR,
    resetEICR,
    generateEICRReport,
    setAutoPopulate,
    addFault,
    updateFault,
    removeFault
  }), [
    eicr,
    eicrSession,
    updateEICR,
    populateFromTestResult,
    initializeEICR,
    resetEICR,
    generateEICRReport,
    setAutoPopulate,
    addFault,
    updateFault,
    removeFault
  ]);

  return (
    <EICRContext.Provider value={value}>
      {children}
    </EICRContext.Provider>
  );
};

/**
 * Selector hooks for EICR context
 * These allow components to subscribe to specific parts of the EICR state
 * without re-rendering when other parts change.
 */

/** Get EICR data (installation details, inspector details, circuits, test results, observations) */
export const useEICRData = () => useEICR().eicr;

/** Get EICR circuits array */
export const useEICRCircuits = () => useEICR().eicr.circuits;

/** Get EICR test results array */
export const useEICRTestResults = () => useEICR().eicr.testResults;

/** Get EICR observations/faults array */
export const useEICRObservations = () => useEICR().eicr.observations;

/** Get EICR installation details */
export const useEICRInstallationDetails = () => useEICR().eicr.installationDetails;

/** Get EICR inspector details */
export const useEICRInspectorDetails = () => useEICR().eicr.inspectorDetails;

/** Get EICR session state */
export const useEICRSession = () => useEICR().eicrSession;

/** Get auto-populate setting */
export const useEICRAutoPopulate = () => useEICR().eicrSession.auto_populate;

/** Get EICR update functions only (for components that only need to write) */
export const useEICRActions = () => {
  const context = useEICR();
  return {
    updateEICR: context.updateEICR,
    populateFromTestResult: context.populateFromTestResult,
    initializeEICR: context.initializeEICR,
    resetEICR: context.resetEICR,
    setAutoPopulate: context.setAutoPopulate,
    addFault: context.addFault,
    updateFault: context.updateFault,
    removeFault: context.removeFault,
  };
};
