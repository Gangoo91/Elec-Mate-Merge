
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, AlertCircle, Wrench } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection2_2 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Electrical Safety Symbols and Documentation</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          Electrical safety symbols and documentation are crucial for effective communication of hazards, requirements and system information. 
          As an electrical professional, understanding and correctly using these symbols and documents is essential for safe working practices.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Safety Symbols in Electrical Work
          </h3>
          
          <p className="text-elec-light/80">
            Electrical safety symbols are standardised graphical representations that convey important safety information without relying on text. 
            These symbols are defined by British Standards (BS EN ISO 7010) and are used across a range of electrical documentation and equipment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-elec-dark/70 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Hazard Warning Symbols</h4>
              <ul className="list-disc pl-5 text-elec-light/80">
                <li><span className="font-medium text-amber-400">Electric shock risk</span> - Lightning bolt in triangle</li>
                <li><span className="font-medium text-amber-400">High voltage</span> - "Danger High Voltage" text with symbol</li>
                <li><span className="font-medium text-amber-400">Flammable materials</span> - Flame in triangle</li>
                <li><span className="font-medium text-amber-400">Hot surfaces</span> - Hand over radiating surface</li>
                <li><span className="font-medium text-amber-400">Laser beam</span> - Radiating beam symbol</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark/70 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Mandatory Action Symbols</h4>
              <ul className="list-disc pl-5 text-elec-light/80">
                <li><span className="font-medium text-blue-400">Eye protection</span> - Face with goggles</li>
                <li><span className="font-medium text-blue-400">Ear protection</span> - Face with ear defenders</li>
                <li><span className="font-medium text-blue-400">Hard hat area</span> - Head with hard hat</li>
                <li><span className="font-medium text-blue-400">Safety footwear</span> - Boot symbol</li>
                <li><span className="font-medium text-blue-400">Insulated gloves</span> - Hands with gloves</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-2">
            <h4 className="font-semibold text-white mb-2">Circuit Diagram Symbols</h4>
            <p className="text-elec-light/80 mb-2">
              Standard symbols are used in circuit diagrams to represent electrical components and connections:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <ul className="list-disc pl-5 text-elec-light/80">
                  <li>Switch (various types)</li>
                  <li>Socket outlets</li>
                  <li>Light fittings</li>
                  <li>Circuit breakers</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 text-elec-light/80">
                  <li>RCDs and RCBOs</li>
                  <li>Distribution boards</li>
                  <li>Isolators</li>
                  <li>Motors</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-5 text-elec-light/80">
                  <li>Transformers</li>
                  <li>Earthing arrangements</li>
                  <li>Conductors and cables</li>
                  <li>Junction boxes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <AlertCircle className="mr-2 h-5 w-5" /> Essential Documentation
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Risk Assessments</h4>
              <p className="text-elec-light/80 mt-1">
                Documents that identify hazards, assess risks, and detail control measures for specific electrical tasks.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Must be completed before work begins</li>
                <li>Should be reviewed and updated as conditions change</li>
                <li>Must be communicated to all workers involved</li>
                <li>Required under the Management of Health and Safety at Work Regulations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Method Statements</h4>
              <p className="text-elec-light/80 mt-1">
                Step-by-step procedures for carrying out electrical work safely.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Includes sequence of operations</li>
                <li>Details specific safety measures</li>
                <li>Lists required PPE and equipment</li>
                <li>Identifies responsible persons</li>
                <li>Incorporates emergency procedures</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Permits to Work</h4>
              <p className="text-elec-light/80 mt-1">
                Formal, documented authorisation for high-risk electrical activities.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Identifies scope and location of work</li>
                <li>Specifies precautions required</li>
                <li>Provides clear time limitations</li>
                <li>Requires signatures from authorised persons</li>
                <li>Includes handover and handback procedures</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <Wrench className="mr-2 h-5 w-5" /> Certification and Reporting Documentation
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            Upon completion of electrical installation work, the following documentation must be provided:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Electrical Installation Certificate (EIC)</h4>
              <p className="text-elec-light/80 mt-1">
                For new installations, additions, or alterations that include appropriate inspection and testing.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Contains details of the installation and who designed, built, and tested it</li>
                <li>Includes declarations of compliance with BS 7671</li>
                <li>Must be issued by a competent person</li>
                <li>Accompanied by schedules of inspections and test results</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Minor Electrical Installation Works Certificate</h4>
              <p className="text-elec-light/80 mt-1">
                For minor works that don't include a new circuit (e.g., adding a socket to an existing circuit).
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Electrical Installation Condition Report (EICR)</h4>
              <p className="text-elec-light/80 mt-1">
                For periodic inspection and testing of existing installations.
              </p>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Identifies any damage, deterioration, defects, or dangerous conditions</li>
                <li>Records observations and recommendations using standard coding</li>
                <li>Assigns condition codes (C1, C2, C3, F1) to indicate urgency of remedial work</li>
              </ul>
            </div>
            
            <p className="mt-4 text-elec-light/80">
              All electrical documentation should be stored securely and made available to clients, building 
              occupiers, and regulatory authorities as required. Records should typically be kept for the 
              lifetime of the installation or a minimum of 5 years.
            </p>
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

export default Subsection2_2;
