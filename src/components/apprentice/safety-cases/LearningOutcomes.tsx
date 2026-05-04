import React from 'react';
import { CheckCircle } from 'lucide-react';

const LearningOutcomes = () => {
  const outcomes = [
    'Critical thinking in high-pressure situations',
    'Regulations awareness and application',
    'Situational judgement skills development',
    'Professional communication under pressure',
    'UK regulatory framework compliance',
    'Risk assessment and hazard identification',
    'Emergency response preparedness',
    'Electrical safety in specialised environments',
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 animate-fade-in mt-6">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Learning outcomes
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
            <CheckCircle className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-1" />
            <span>{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningOutcomes;
