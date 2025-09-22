import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RAMSData, RAMSRisk, RAMSReportOptions } from '@/types/rams';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  estimatedDuration?: string;
  riskLevel: 'low' | 'medium' | 'high';
  linkedHazards: string[];
  responsiblePerson?: string;
  prerequisites?: string[];
  status: 'pending' | 'in-progress' | 'completed';
}

interface SignOff {
  preparedBy?: { name: string; date: string; signatureDataUrl?: string };
  reviewedBy?: { name: string; date: string; signatureDataUrl?: string };
  approvedBy?: { name: string; date: string; signatureDataUrl?: string };
}

interface RAMSContextType {
  ramsData: RAMSData;
  reportOptions: RAMSReportOptions;
  signOff: SignOff;
  tasks: Task[];
  
  // Project info methods
  updateProjectInfo: (info: Partial<Pick<RAMSData, 'projectName' | 'location' | 'date' | 'assessor'>>) => void;
  
  // Activity methods (legacy support)
  addActivity: (activity: string) => void;
  removeActivity: (index: number) => void;
  
  // Task methods
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  linkHazardToTask: (taskId: string, hazardId: string) => void;
  unlinkHazardFromTask: (taskId: string, hazardId: string) => void;
  
  // Risk methods
  addRisk: (risk: Omit<RAMSRisk, 'id'>) => void;
  addRiskFromTemplate: (template: any) => void;
  addRiskFromHazard: (hazardData: any, taskId?: string) => void;
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

  const [tasks, setTasks] = useState<Task[]>([]);

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

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const linkHazardToTask = (taskId: string, hazardId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, linkedHazards: [...task.linkedHazards.filter(h => h !== hazardId), hazardId] }
        : task
    ));
  };

  const unlinkHazardFromTask = (taskId: string, hazardId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, linkedHazards: task.linkedHazards.filter(h => h !== hazardId) }
        : task
    ));
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

  const addRiskFromHazard = (hazardData: any, taskId?: string) => {
    const defaultLikelihood = 
      hazardData.riskLevel === 'Very High' ? 5 :
      hazardData.riskLevel === 'High' ? 4 :
      hazardData.riskLevel === 'Medium' ? 3 : 2;
    
    const defaultSeverity = 
      hazardData.riskLevel === 'Very High' ? 5 :
      hazardData.riskLevel === 'High' ? 4 :
      hazardData.riskLevel === 'Medium' ? 3 : 2;

    const newRisk: RAMSRisk = {
      id: Date.now().toString(),
      hazard: hazardData.name,
      risk: hazardData.description,
      likelihood: defaultLikelihood,
      severity: defaultSeverity,
      riskRating: defaultLikelihood * defaultSeverity,
      controls: hazardData.commonControls?.join('\n• ') || '',
      residualRisk: Math.max(1, Math.floor((defaultLikelihood * defaultSeverity) / 2))
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
    if (ramsData.activities.length === 0 && tasks.length === 0) errors.push('At least one activity or task is required');
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
    setTasks([]);
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
    tasks,
    updateProjectInfo,
    addActivity,
    removeActivity,
    addTask,
    updateTask,
    removeTask,
    linkHazardToTask,
    unlinkHazardFromTask,
    addRisk,
    addRiskFromTemplate,
    addRiskFromHazard,
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