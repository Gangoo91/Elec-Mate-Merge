import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type MaintenanceState = 'input' | 'processing' | 'results';
export type DetailLevel = 'quick' | 'full';

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
  detailLevel?: DetailLevel;
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
  partial?: boolean;
  missingSections?: string[];
}

export const useMaintenanceAdvisor = () => {
  const [state, setState] = useState<MaintenanceState>('input');
  const [input, setInput] = useState<MaintenanceInput>({
    equipmentType: '',
    equipmentDescription: '',
    location: '',
    ageYears: 0,
    detailLevel: 'full',
  });
  const [results, setResults] = useState<MaintenanceResults | null>(null);
  const [progress, setProgress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

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
      detailLevel: 'full',
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
    setStartTime(Date.now());

    try {
      // Always use full detail
      const isQuick = false;
      
      // Start backend call immediately
      const invokePromise = supabase.functions.invoke('maintenance-v3', {
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
          detailLevel: 'full',
        }
      });

      // Run progress ticker in parallel
      let cancelled = false;
      const progressSteps = isQuick
        ? [
            { msg: 'Analysing equipment...', duration: 4000 },
            { msg: 'Generating schedule...', duration: 8000 },
            { msg: 'Calculating costs...', duration: 8000 },
            { msg: 'Finalising plan...', duration: 5000 },
          ]
        : [
            { msg: 'Analysing equipment details...', duration: 3000 },
            { msg: 'Searching BS 7671 & GN3 regulations...', duration: 10000 },
            { msg: 'Calculating risk scores...', duration: 4000 },
            { msg: 'Generating detailed tasks...', duration: 15000 },
            { msg: 'Expanding procedures...', duration: 12000 },
            { msg: 'Analysing failure modes...', duration: 10000 },
            { msg: 'Creating compliance checklist...', duration: 8000 },
            { msg: 'Finalising maintenance plan...', duration: 8000 },
          ];

      const progressTicker = async () => {
        for (let i = 0; i < progressSteps.length && !cancelled; i++) {
          setProgress(progressSteps[i].msg);
          await new Promise(resolve => setTimeout(resolve, progressSteps[i].duration));
        }
      };

      // Run both in parallel
      const tickerPromise = progressTicker();
      const { data, error } = await invokePromise;
      cancelled = true;
      await tickerPromise;

      // Handle errors
      if (error) {
        console.error('Invoke error:', error);
        toast.error('Failed to generate schedule', {
          description: 'Network error. Please try again.'
        });
        setState('input');
        return;
      }

      // Handle backend errors (success:false)
      if (data && data.success === false) {
        console.error('Backend error:', data.error, data.code);
        toast.error(data.error || 'Failed to generate schedule', {
          description: data.code ? `Error: ${data.code}` : 'Please try again.'
        });
        setState('input');
        return;
      }

      // ✅ PHASE 3: Validate response structure before accessing nested properties
      if (!data || typeof data !== 'object') {
        console.error('Invalid response structure:', data);
        toast.error('Invalid response from server', {
          description: 'Please try again or contact support.'
        });
        setState('input');
        return;
      }

      // ✅ PHASE 3: Validate schedule structure
      if (!data.schedule || typeof data.schedule !== 'object') {
        console.error('Missing schedule in response:', data);
        toast.error('Incomplete response received', {
          description: 'The server returned an incomplete maintenance plan.'
        });
        setState('input');
        return;
      }

      // ✅ Check if schedule has tasks
      if (!data.schedule.schedule || data.schedule.schedule.length === 0) {
        console.warn('Empty schedule received:', data.schedule);
        toast.warning('No maintenance tasks generated', {
          description: 'The AI could not identify specific maintenance tasks. Try providing more equipment details.'
        });
        setState('input');
        return;
      }

      setResults(data.schedule);
      setState('results');
      
      // ✅ PHASE 3: Safe property access with optional chaining
      if (data.schedule?.partial) {
        toast.warning('Partial plan generated', {
          description: `Missing: ${data.schedule.missingSections?.join(', ') || 'unknown sections'}`
        });
      } else {
        toast.success(`Maintenance schedule generated (${data.schedule.schedule.length} tasks)`, {
          description: 'Plan created successfully'
        });
      }

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
    startTime,
    updateInput,
    generateSchedule,
    resetForm,
  };
};
