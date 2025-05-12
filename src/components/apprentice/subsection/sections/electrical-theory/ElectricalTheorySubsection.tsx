
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-lg">{content}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Key Points</h2>
        <ul className="space-y-2">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-4 border-t border-elec-yellow/20">
          <Button
            onClick={markAsComplete}
            disabled={isCompleted}
            className={`w-full ${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          >
            {isCompleted ? 'Subsection Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTheorySubsection;
