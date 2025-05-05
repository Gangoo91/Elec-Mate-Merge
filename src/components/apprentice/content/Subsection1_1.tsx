
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import TypesOfDrawings from "./subsection1_1/TypesOfDrawings";
import ElectricalSymbols from "./subsection1_1/ElectricalSymbols";
import FloorPlanReading from "./subsection1_1/FloorPlanReading";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection1_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Understanding Electrical Drawings and Diagrams</h2>
      
      <div className="space-y-5">
        <p>
          Electrical drawings and diagrams are the foundation of any successful installation. They provide critical information 
          about circuit layouts, component locations, and connection details required for accurate and safe electrical installations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TypesOfDrawings />
          <ElectricalSymbols />
        </div>
        
        <FloorPlanReading />
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

export default Subsection1_1;
