
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface EICRContextType {
  eicr: EICRData;
  updateEICR: (data: Partial<EICRData>) => void;
  populateFromTestResult: (stepId: string, result: TestResult) => void;
  resetEICR: () => void;
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

  const resetEICR = () => {
    setEICR({
      circuits: [],
      testResults: [],
      observations: []
    });
  };

  const value = {
    eicr,
    updateEICR,
    populateFromTestResult,
    resetEICR
  };

  return (
    <EICRContext.Provider value={value}>
      {children}
    </EICRContext.Provider>
  );
};
