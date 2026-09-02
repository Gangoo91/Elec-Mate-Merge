import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface ElectricalTheorySubsectionProps {
  title: string;
  content: string;
  keyPoints: string[];
  isCompleted: boolean;
  markAsComplete: () => void;
  subsectionId: string;
}

const ElectricalTheorySubsection = ({
  title,
  content,
  keyPoints,
  isCompleted,
  markAsComplete,
  subsectionId,
}: ElectricalTheorySubsectionProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">{title}</h1>

      <p className="text-[14px] text-white leading-relaxed">{content}</p>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Key points
        </span>
        <ul className="space-y-1.5">
          {keyPoints.map((point, index) => (
            <li
              key={index}
              className="text-[14px] text-white leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-white/[0.06]">
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
        >
          {isCompleted ? 'Subsection completed' : 'Mark as complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ElectricalTheorySubsection;
