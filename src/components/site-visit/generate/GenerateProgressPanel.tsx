import React from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
  error?: string;
}

interface GenerateProgressPanelProps {
  steps: ProgressStep[];
}

export const GenerateProgressPanel = ({ steps }: GenerateProgressPanelProps) => {
  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
        >
          {step.status === 'pending' && (
            <div className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0" />
          )}
          {step.status === 'running' && (
            <Loader2 className="h-6 w-6 text-elec-yellow animate-spin flex-shrink-0" />
          )}
          {step.status === 'done' && (
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          {step.status === 'error' && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{step.label}</p>
            {step.error && <p className="text-xs text-red-400">{step.error}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
