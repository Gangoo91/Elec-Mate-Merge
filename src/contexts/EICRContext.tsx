
import React, { createContext, useContext, useState, ReactNode } from 'react';
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

  const updateEICR = (data: Partial<EICRData>) => {
    setEICR(prev => ({ ...prev, ...data }));
  };

  const populateFromTestResult = (stepId: string, result: TestResult) => {
    console.log('Populating EICR from test result:', { stepId, result });
    
    setEICR(prev => ({
      ...prev,
      testResults: [
        ...(prev.testResults || []).filter(r => r.stepId !== stepId),
        result
      ]
    }));
  };

  const initializeEICR = (installationDetails: any, inspectorDetails: any) => {
    setEICR({
      installationDetails,
      inspectorDetails,
      circuits: [],
      testResults: [],
      observations: []
    });
  };

  const resetEICR = () => {
    setEICR({
      circuits: [],
      testResults: [],
      observations: []
    });
    setEICRSession({
      eicr_report: {},
      auto_populate: false
    });
  };

  const generateEICRReport = () => {
    return {
      ...eicr,
      generatedAt: new Date(),
      session: eicrSession
    };
  };

  const setAutoPopulate = (value: boolean) => {
    setEICRSession(prev => ({
      ...prev,
      auto_populate: value
    }));
  };

  const addFault = (fault: EICRFault) => {
    setEICR(prev => ({
      ...prev,
      observations: [...(prev.observations || []), fault]
    }));
  };

  const updateFault = (id: string, faultUpdate: Partial<EICRFault>) => {
    setEICR(prev => ({
      ...prev,
      observations: (prev.observations || []).map(fault => 
        fault.id === id ? { ...fault, ...faultUpdate } : fault
      )
    }));
  };

  const removeFault = (id: string) => {
    setEICR(prev => ({
      ...prev,
      observations: (prev.observations || []).filter(fault => fault.id !== id)
    }));
  };

  const value = {
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
  };

  return (
    <EICRContext.Provider value={value}>
      {children}
    </EICRContext.Provider>
  );
};
