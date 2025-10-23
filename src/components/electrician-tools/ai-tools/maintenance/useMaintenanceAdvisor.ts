import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type MaintenanceState = 'input' | 'processing' | 'results';

export interface MaintenanceInput {
  equipmentType: string;
  equipmentDescription: string;
  location: string;
  ageYears: number;
  buildingType?: 'domestic' | 'commercial' | 'industrial';
  environment?: 'indoor' | 'outdoor' | 'damp' | 'corrosive';
  criticality?: 'standard' | 'critical' | 'life-safety';
  lastInspectionDate?: string;
  manufacturer?: string;
  modelNumber?: string;
  currentIssues?: string;
  clientName?: string;
  siteAddress?: string;
  assessorName?: string;
  companyName?: string;
  photos?: File[];
}

export interface MaintenanceTask {
  interval: string;
  task: string;
  regulation?: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDurationMinutes?: number;
  estimatedCost?: { min: number; max: number };
  requiredQualifications?: string[];
  toolsRequired?: string[];
  procedure?: string[];
  safetyPrecautions?: string[];
  nextDue?: string;
  taskCategory?: 'inspection' | 'testing' | 'maintenance' | 'replacement';
}

export interface RegulationCitation {
  regulationNumber: string;
  section?: string;
  title?: string;
  excerpt: string;
  whyApplies?: string;
  consequence?: string;
  relatedRegs?: string[];
  confidence?: number;
}

export interface FailureMode {
  failure: string;
  probability: number;
  earlyWarnings?: string[];
  preventiveMeasures?: string[];
}

export interface ReplacementItem {
  component: string;
  estimatedYear: number;
  reason: string;
  estimatedCost?: { min: number; max: number };
}

export interface RecommendedPart {
  part: string;
  quantity: number;
  estimatedCost?: number;
  purpose: string;
}

export interface UpgradeRecommendation {
  upgrade: string;
  cost: { min: number; max: number };
  benefit: string;
  regulation?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ComplianceCheckItem {
  requirement: string;
  regulation: string;
  status: 'compliant' | 'unknown' | 'non-compliant';
  action?: string;
}

export interface MaintenanceResults {
  equipmentType: string;
  location: string;
  ageYears: number;
  buildingType?: string;
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  riskFactors?: string[];
  complianceStatus?: 'compliant' | 'attention-needed' | 'non-compliant';
  nextEICRDue?: string;
  complianceWarnings?: string[];
  schedule: MaintenanceTask[];
  annualCostEstimate?: { min: number; max: number };
  totalEstimatedHours?: number;
  commonFailureModes?: FailureMode[];
  replacementTimeline?: ReplacementItem[];
  recommendedParts?: RecommendedPart[];
  upgradeRecommendations?: UpgradeRecommendation[];
  regulations?: RegulationCitation[];
  complianceChecklist?: ComplianceCheckItem[];
  ragSources?: Array<{
    topic: string;
    source: string;
    relevance: number;
    excerpt?: string;
  }>;
  recommendations: string[];
}

export const useMaintenanceAdvisor = () => {
  const [state, setState] = useState<MaintenanceState>('input');
  const [input, setInput] = useState<MaintenanceInput>({
    equipmentType: '',
    equipmentDescription: '',
    location: '',
    ageYears: 0,
  });
  const [results, setResults] = useState<MaintenanceResults | null>(null);
  const [progress, setProgress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const updateInput = (updates: Partial<MaintenanceInput>) => {
    setInput(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setState('input');
    setInput({
      equipmentType: '',
      equipmentDescription: '',
      location: '',
      ageYears: 0,
    });
    setResults(null);
    setProgress('');
  };

  const generateSchedule = async () => {
    if (!input.equipmentDescription.trim() || !input.equipmentType || !input.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setState('processing');
    setIsProcessing(true);
    setResults(null);

    try {
      // Progress updates
      setProgress('Analysing equipment details...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Searching BS 7671 & GN3 regulations...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Calculating risk scores...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Generating maintenance tasks...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Estimating costs & durations...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Identifying failure modes...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Creating compliance checklist...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress('Finalizing maintenance plan...');

      const { data, error } = await supabase.functions.invoke('maintenance-plan-generator', {
        body: {
          equipmentDescription: input.equipmentDescription.trim(),
          equipmentType: input.equipmentType,
          location: input.location,
          ageYears: input.ageYears || 0,
          buildingType: input.buildingType,
          environment: input.environment,
          criticality: input.criticality,
          lastInspectionDate: input.lastInspectionDate,
          manufacturer: input.manufacturer,
          modelNumber: input.modelNumber,
          currentIssues: input.currentIssues,
          clientName: input.clientName,
          siteAddress: input.siteAddress,
          assessorName: input.assessorName,
          companyName: input.companyName,
        }
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate maintenance schedule');
      }

      setResults(data.schedule);
      setState('results');
      
      toast.success('Maintenance schedule generated', {
        description: `${data.schedule.schedule.length} tasks identified`
      });

    } catch (err) {
      console.error('Maintenance generation error:', err);
      toast.error('Failed to generate schedule', {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
      setState('input');
    } finally {
      setIsProcessing(false);
      setProgress('');
    }
  };

  return {
    state,
    input,
    results,
    progress,
    isProcessing,
    updateInput,
    generateSchedule,
    resetForm,
  };
};
