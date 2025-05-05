
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, CircleDashed, AlertCircle, ShieldAlert } from "lucide-react";

type Subsection2_2Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_2Props) => {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-4">Electrical Symbols and Notation</h2>
        
        <p className="text-base">
          Electrical symbols provide a standardized visual language for communicating technical information. 
          Understanding these symbols is essential for correctly interpreting installation requirements.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5 col-span-1 lg:col-span-2">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <CircleDashed className="h-5 w-5 mr-2" />
              British Standard Symbols
            </h3>
            <div className="space-y-3">
              <p className="text-sm">BS EN 60617 provides the standardized electrical symbols used in the UK. These symbols represent various components including:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <h4 className="font-medium">Power Components</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Switches (single-pole, double-pole, etc.)</li>
                    <li>Socket outlets (standard, switched, specialized)</li>
                    <li>Distribution equipment (consumer units, boards)</li>
                    <li>Circuit protection devices (MCBs, RCDs, fuses)</li>
                    <li>Transformers and power supplies</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-elec-yellow/30 pl-3">
                  <h4 className="font-medium">Lighting and Control</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                    <li>Light fittings (various types and mounting)</li>
                    <li>Emergency lighting fixtures</li>
                    <li>Sensors and detectors</li>
                    <li>Control devices and actuators</li>
                    <li>Dimmers and controllers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <AlertCircle className="h-5 w-5 mr-2" />
              Symbol Variations
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Symbols may vary slightly between different drawing systems and conventions:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Industry Differences:</span> Industrial, commercial, and domestic drawings may use different symbol variants</li>
                <li><span className="font-medium">Company Standards:</span> Some organizations adopt modified symbols for internal use</li>
                <li><span className="font-medium">International Variations:</span> Projects with international collaboration may use IEC or other standards</li>
                <li><span className="font-medium">Legacy Drawings:</span> Older installations may use superseded symbol standards</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Circuit References and Notation
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Electrical drawings use standardized notation to convey detailed technical information:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Circuit References:</span> Unique identifiers for circuits (e.g., L1, L2, P1, P2) that link to schedules and details</li>
                <li><span className="font-medium">Cable Type Notation:</span> Indicates conductor size, number, and insulation (e.g., 2.5mm² T&E)</li>
                <li><span className="font-medium">Protective Device Marking:</span> Shows type and rating of protection (e.g., 32A B MCB)</li>
                <li><span className="font-medium">Height Notation:</span> Indicates mounting heights for accessories (e.g., SW+1200mm)</li>
                <li><span className="font-medium">Special Requirements:</span> Notes specific installation details or compliance requirements</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <AlertCircle className="h-5 w-5 mr-2" />
              Reading Composite Symbols
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Many symbols combine multiple elements to convey complex information:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Composite Switch Symbols:</span> Show multiple switching positions or special functions</li>
                <li><span className="font-medium">Accessory Combinations:</span> Represent multi-function accessories (e.g., switch+socket)</li>
                <li><span className="font-medium">Control System Elements:</span> Show both the device and its function in the system</li>
                <li><span className="font-medium">Connection Methods:</span> Indicate special termination requirements or connection types</li>
              </ul>
              
              <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg">
                <p className="font-medium mb-1 text-elec-yellow">Important Note:</p>
                <p className="text-sm">Always refer to the drawing legend when interpreting symbols, as slight variations can significantly change installation requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-6 border-t border-elec-yellow/20 mt-6">
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
    </>
  );
};

export default Subsection2_2;
