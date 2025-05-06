
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection2_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Workplace Inspection Procedures</h2>
      
      <div className="space-y-4">
        <p className="text-elec-light/80">
          This section is currently under development. Content will be added soon.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Coming Soon</h3>
          <p className="text-elec-light/80">
            We're working on comprehensive materials covering workplace inspection procedures 
            for electrical installations, including:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-elec-light/80">
            <li>Different types of workplace inspections</li>
            <li>Key areas to focus on during inspections</li>
            <li>Documentation requirements and record keeping</li>
            <li>Regulatory compliance and legal requirements</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Subsection2_1;
