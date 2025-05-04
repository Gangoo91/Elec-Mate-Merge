
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Subsection3_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection3_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection3_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">First-Fix and Second-Fix Installation Process</h2>
      
      <div className="space-y-4">
        <p>
          Installation work is typically divided into two main phases: first-fix and second-fix.
          Understanding this workflow is essential for efficient and effective electrical installations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow">First-Fix</h3>
            <p>First-fix work is completed before plastering and decorating:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Installation of cable containment systems (trunking, conduit)</li>
              <li>Routing cables through walls, floors and ceilings</li>
              <li>Positioning and fixing back boxes for outlets and switches</li>
              <li>Installation of consumer unit housings</li>
              <li>Running all necessary cables to their approximate positions</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-elec-yellow mb-2">Key Considerations:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Plan cable routes to avoid damage and minimize lengths</li>
                <li>Maintain appropriate separation from other services</li>
                <li>Leave sufficient slack for connections</li>
                <li>Label cables clearly for second-fix identification</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow">Second-Fix</h3>
            <p>Second-fix work is completed after plastering and decorating:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Installation of wiring accessories (switches, sockets)</li>
              <li>Connection and termination of all circuits</li>
              <li>Mounting and wiring of consumer units</li>
              <li>Connection of lighting fixtures and other final accessories</li>
              <li>Final labeling of circuits and distribution boards</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-elec-yellow mb-2">Key Considerations:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintain consistent termination methods</li>
                <li>Ensure proper torque settings for terminals</li>
                <li>Apply clear and permanent circuit identification</li>
                <li>Complete visual inspections before power-up</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Work Sequencing Best Practices</h3>
          
          <div className="space-y-4">
            <p>Effective sequencing of work can minimize rework and damage to finished surfaces:</p>
            
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-semibold text-white">Site Assessment</span>
                <p className="mt-1">Conduct thorough site surveys and understand building plans before beginning any work.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Planning</span>
                <p className="mt-1">Create detailed plans for cable routes, outlet positions, and circuit arrangements.</p>
              </li>
              <li>
                <span className="font-semibold text-white">First-Fix Installation</span>
                <p className="mt-1">Install all containment systems and cable runs before building work is completed.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Interim Testing</span>
                <p className="mt-1">Perform continuity and insulation resistance tests on cables before they're covered.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Second-Fix Installation</span>
                <p className="mt-1">Complete all terminations and fit accessories after decorating is finished.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Final Testing</span>
                <p className="mt-1">Conduct full inspection and testing according to BS 7671 requirements.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Certification</span>
                <p className="mt-1">Provide appropriate certification documentation for the installation.</p>
              </li>
            </ol>
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

export default Subsection3_1;
