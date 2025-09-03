import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RAMSData, RAMSRisk, RAMSReportOptions } from '@/types/rams';

interface SignOff {
  preparedBy?: { name: string; date: string; signatureDataUrl?: string };
  reviewedBy?: { name: string; date: string; signatureDataUrl?: string };
  approvedBy?: { name: string; date: string; signatureDataUrl?: string };
}

interface RAMSContextType {
  ramsData: RAMSData;
  reportOptions: RAMSReportOptions;
  signOff: SignOff;
  
  // Project info methods
  updateProjectInfo: (info: Partial<Pick<RAMSData, 'projectName' | 'location' | 'date' | 'assessor'>>) => void;
  
  // Activity methods
  addActivity: (activity: string) => void;
  removeActivity: (index: number) => void;
  
  // Risk methods
  addRisk: (risk: Omit<RAMSRisk, 'id'>) => void;
  addRiskFromTemplate: (template: any) => void;
  updateRisk: (id: string, updates: Partial<RAMSRisk>) => void;
  removeRisk: (id: string) => void;
  
  // Branding methods
  setBranding: (options: Partial<RAMSReportOptions>) => void;
  
  // Signature methods
  setSignatures: (signOff: Partial<SignOff>) => void;
  
  // Validation
  validate: () => { isValid: boolean; errors: string[] };
  
  // Reset
  reset: () => void;
}

const RAMSContext = createContext<RAMSContextType | undefined>(undefined);

export const useRAMS = (): RAMSContextType => {
  const context = useContext(RAMSContext);
  if (!context) {
    throw new Error('useRAMS must be used within a RAMSProvider');
  }
  return context;
};

interface RAMSProviderProps {
  children: ReactNode;
}

export const RAMSProvider: React.FC<RAMSProviderProps> = ({ children }) => {
  const [ramsData, setRAMSData] = useState<RAMSData>({
    projectName: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    assessor: '',
    activities: [],
    risks: []
  });

  const [reportOptions, setReportOptions] = useState<RAMSReportOptions>({
    includeSignatures: true,
    companyName: '',
    logoUrl: ''
  });

  const [signOff, setSignOffState] = useState<SignOff>({});

  const updateProjectInfo = (info: Partial<Pick<RAMSData, 'projectName' | 'location' | 'date' | 'assessor'>>) => {
    setRAMSData(prev => ({ ...prev, ...info }));
  };

  const addActivity = (activity: string) => {
    if (activity.trim() && !ramsData.activities.includes(activity.trim())) {
      setRAMSData(prev => ({
        ...prev,
        activities: [...prev.activities, activity.trim()]
      }));
    }
  };

  const removeActivity = (index: number) => {
    setRAMSData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const addRisk = (risk: Omit<RAMSRisk, 'id'>) => {
    const newRisk: RAMSRisk = {
      ...risk,
      id: Date.now().toString()
    };
    setRAMSData(prev => ({
      ...prev,
      risks: [...prev.risks, newRisk]
    }));
  };

  const addRiskFromTemplate = (template: any) => {
    const newRisk: RAMSRisk = {
      id: Date.now().toString(),
      hazard: template.hazard,
      risk: template.risk,
      likelihood: template.likelihood,
      severity: template.severity,
      riskRating: template.likelihood * template.severity,
      controls: template.controls,
      residualRisk: template.residualRisk || Math.max(1, Math.floor((template.likelihood * template.severity) / 2))
    };
    setRAMSData(prev => ({
      ...prev,
      risks: [...prev.risks, newRisk]
    }));
  };

  const updateRisk = (id: string, updates: Partial<RAMSRisk>) => {
    setRAMSData(prev => ({
      ...prev,
      risks: prev.risks.map(risk => 
        risk.id === id 
          ? { ...risk, ...updates, riskRating: (updates.likelihood || risk.likelihood) * (updates.severity || risk.severity) }
          : risk
      )
    }));
  };

  const removeRisk = (id: string) => {
    setRAMSData(prev => ({
      ...prev,
      risks: prev.risks.filter(risk => risk.id !== id)
    }));
  };

  const setBranding = (options: Partial<RAMSReportOptions>) => {
    setReportOptions(prev => ({ ...prev, ...options }));
  };

  const setSignatures = (newSignOff: Partial<SignOff>) => {
    setSignOffState(prev => ({ ...prev, ...newSignOff }));
  };

  const validate = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!ramsData.projectName.trim()) errors.push('Project name is required');
    if (!ramsData.location.trim()) errors.push('Location is required');
    if (!ramsData.assessor.trim()) errors.push('Assessor name is required');
    if (ramsData.activities.length === 0) errors.push('At least one activity is required');
    if (ramsData.risks.length === 0) errors.push('At least one risk assessment is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const reset = () => {
    setRAMSData({
      projectName: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      assessor: '',
      activities: [],
      risks: []
    });
    setReportOptions({
      includeSignatures: true,
      companyName: '',
      logoUrl: ''
    });
    setSignOffState({});
  };

  const value: RAMSContextType = {
    ramsData,
    reportOptions,
    signOff,
    updateProjectInfo,
    addActivity,
    removeActivity,
    addRisk,
    addRiskFromTemplate,
    updateRisk,
    removeRisk,
    setBranding,
    setSignatures,
    validate,
    reset
  };

  return (
    <RAMSContext.Provider value={value}>
      {children}
    </RAMSContext.Provider>
  );
};