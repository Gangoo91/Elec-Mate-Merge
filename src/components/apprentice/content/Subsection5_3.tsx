
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, ClipboardList, Lightbulb } from "lucide-react";

interface Subsection5_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection5_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection5_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Emergency Lighting Requirements</h2>
      
      <div className="space-y-4">
        <p>
          Emergency lighting is required in many buildings to provide illumination when the normal supply fails.
          These systems must comply with BS 5266, which specifies requirements for installation, operation, and maintenance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Types of Emergency Lighting
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Escape Route Lighting</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Illumination of escape routes to at least 1 lux at floor level</li>
                <li>Higher illumination (5 lux) at specific danger points</li>
                <li>Positioning at changes of direction and obstacles</li>
                <li>Maximum 2m height above floor level</li>
                <li>Minimum 1-hour duration (3 hours for certain premises)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Open Area (Anti-Panic) Lighting</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Aimed at preventing panic in larger open spaces</li>
                <li>Minimum 0.5 lux throughout the floor area</li>
                <li>Excludes 0.5m border around the room perimeter</li>
                <li>Required in areas larger than 60m²</li>
                <li>Also required in toilet facilities larger than 8m²</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">High-Risk Task Area Lighting:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provides illumination for potentially dangerous processes</li>
                  <li>Minimum 10% of normal lighting or 15 lux, whichever is greater</li>
                  <li>Must activate instantly without perceptible delay</li>
                  <li>Duration based on risk – minimum of duration of risk</li>
                  <li>Examples: industrial process control, laboratory work</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              System Types and Design
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Self-Contained Systems</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Each fitting contains its own battery and control gear</li>
                <li>Maintained type: illuminated continuously</li>
                <li>Non-maintained: illuminates only on power failure</li>
                <li>Sustained: normal lamp plus emergency lamp</li>
                <li>Simpler installation with no central system</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Centrally Powered Systems</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Central battery system powers multiple luminaires</li>
                <li>Higher initial cost but easier maintenance</li>
                <li>Typically 24V or 50V SELV systems</li>
                <li>Special fire-resistant cabling required</li>
                <li>Central monitoring and testing capability</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Static Inverter Systems:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provides full mains voltage in emergency mode</li>
                  <li>Can power standard luminaires</li>
                  <li>Automatic changeover on mains failure</li>
                  <li>Centralized battery bank requires dedicated space</li>
                  <li>Higher capacity compared to individual batteries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            Testing and Maintenance Requirements
          </h3>
          
          <div className="space-y-4">
            <p>Emergency lighting systems require regular testing and maintenance to ensure reliability:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Mandatory Testing</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Daily checks</span>
                    <p className="text-sm mt-1">Visual inspection of central systems to verify normal operation</p>
                  </li>
                  <li>
                    <span className="font-medium">Monthly functional test</span>
                    <p className="text-sm mt-1">Brief interruption of mains to verify all luminaires operate correctly</p>
                  </li>
                  <li>
                    <span className="font-medium">Annual full duration test</span>
                    <p className="text-sm mt-1">Full rated duration test (1-3 hours) to verify battery capacity</p>
                  </li>
                  <li>
                    <span className="font-medium">Documentation</span>
                    <p className="text-sm mt-1">All tests must be recorded in a logbook maintained on the premises</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Inspection and Certification</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Initial verification</span>
                    <p className="text-sm mt-1">Complete testing of system before commissioning</p>
                  </li>
                  <li>
                    <span className="font-medium">Certification</span>
                    <p className="text-sm mt-1">System must be certified as compliant with BS 5266</p>
                  </li>
                  <li>
                    <span className="font-medium">Periodic inspection</span>
                    <p className="text-sm mt-1">Regular professional inspection, usually annually</p>
                  </li>
                  <li>
                    <span className="font-medium">Automatic test systems</span>
                    <p className="text-sm mt-1">Self-testing systems can simplify maintenance requirements</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>Emergency lighting is required by various regulations, including the Regulatory Reform (Fire Safety) Order 2005, which places responsibility on the "responsible person" to ensure adequate emergency lighting is provided and maintained. BS 5266-1 provides the code of practice for emergency lighting installation and maintenance. Failure to comply with these requirements can result in prosecution, as well as potentially endangering building occupants in emergency situations.</p>
            </div>
          </div>
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

export default Subsection5_3;
