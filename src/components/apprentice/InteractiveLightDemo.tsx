
import React from "react";
import { Switch } from "@/components/ui/switch";

type InteractiveLightDemoProps = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const InteractiveLightDemo = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: InteractiveLightDemoProps) => {
  // Only show for specific subsections
  if (subsectionId !== "1.1") return null;
  
  return (
    <div className="mt-6 p-4 border border-elec-yellow/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Interactive Demo: Light Switch Circuit</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-white/80 rounded-md flex items-center justify-center mb-2">
            <div className="w-10 h-10 border border-white/80 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `${isCompleted ? '#EAAA08' : '#3F3F3F'}` }}></div>
            </div>
          </div>
          <span className="text-sm text-elec-light/80">Light Fitting</span>
        </div>
        
        <div className="h-0.5 w-16 bg-white/70"></div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm">Off</span>
            <Switch 
              checked={isCompleted}
              onCheckedChange={markAsComplete}
              className="data-[state=checked]:bg-elec-yellow"
            />
            <span className="text-sm">On</span>
          </div>
          <span className="text-sm text-elec-light/80 mt-2">Light Switch</span>
        </div>
      </div>
      <p className="text-sm mt-4 text-center">Click the switch to turn the light on and mark this section as complete</p>
    </div>
  );
};

export default InteractiveLightDemo;
