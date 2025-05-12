
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

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
  subsectionId
}: ElectricalTheorySubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow">{title}</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-lg md:text-xl leading-relaxed">{content}</p>
        
        <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-white">Key Points</h2>
        <ul className="space-y-3">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-base md:text-lg">
              <span className="text-elec-yellow mt-1 text-2xl">•</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-10 pt-6 border-t border-elec-yellow/30">
          <Button
            onClick={markAsComplete}
            disabled={isCompleted}
            className={`w-full py-3 h-auto text-lg ${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          >
            {isCompleted ? 'Subsection Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTheorySubsection;
