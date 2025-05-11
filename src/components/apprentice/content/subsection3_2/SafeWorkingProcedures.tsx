
import React from "react";
import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const SafeWorkingProcedures = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <ShieldAlert className="h-6 w-6 mr-2" />
        Safe Working Procedures
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Adhering to proper safe working procedures is paramount when working with electrical systems. 
        The Health and Safety Executive (HSE) in the UK provides strict guidelines that must be followed 
        to protect both workers and the public from electrical hazards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">Before Starting Work:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Complete a thorough risk assessment to identify potential hazards</li>
            <li>Ensure proper authorisation and permits are in place</li>
            <li>Check test equipment calibration and certification is current</li>
            <li>Verify safe isolation procedures and lock-off mechanisms</li>
            <li>Communicate with affected persons about the work scope</li>
            <li>Prepare the work area with appropriate barriers and signage</li>
            <li>Perform a visual inspection of all equipment to be used</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">During Work:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use appropriate PPE at all times during electrical work</li>
            <li>Apply lock-off procedures to prevent accidental energisation</li>
            <li>Use insulated tools that meet BS EN 60900 standards</li>
            <li>Follow permit-to-work systems for high-risk tasks</li>
            <li>Maintain good housekeeping practices in the work area</li>
            <li>Regularly reassess risks as work progresses</li>
            <li>Never take shortcuts with safety procedures</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafeWorkingProcedures;
