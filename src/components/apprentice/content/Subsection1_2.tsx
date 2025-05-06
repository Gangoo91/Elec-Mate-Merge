
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, FileText, List } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection1_2 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">BS 7671 (IET Wiring Regulations)</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          The BS 7671 (IET Wiring Regulations), currently in the 18th Edition, establishes the standards for electrical installations in the UK. 
          These regulations are not statutory in themselves but are the recognised standard for compliance with legal requirements 
          such as the Electricity at Work Regulations 1989.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <FileText className="mr-2 h-5 w-5" /> Structure of BS 7671
          </h3>
          
          <p className="text-elec-light/80 mb-2">
            The IET Wiring Regulations are organised into seven parts, plus appendices:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-elec-light/80">
            <li>
              <span className="font-semibold text-white">Part 1:</span> Scope, Object and Fundamental Principles
            </li>
            <li>
              <span className="font-semibold text-white">Part 2:</span> Definitions
            </li>
            <li>
              <span className="font-semibold text-white">Part 3:</span> Assessment of General Characteristics
            </li>
            <li>
              <span className="font-semibold text-white">Part 4:</span> Protection for Safety
            </li>
            <li>
              <span className="font-semibold text-white">Part 5:</span> Selection and Erection of Equipment
            </li>
            <li>
              <span className="font-semibold text-white">Part 6:</span> Inspection and Testing
            </li>
            <li>
              <span className="font-semibold text-white">Part 7:</span> Special Installations or Locations
            </li>
            <li>
              <span className="font-semibold text-white">Appendices:</span> Additional reference material and calculations
            </li>
          </ul>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <List className="mr-2 h-5 w-5" /> Key Requirements
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            As a professional electrician, you must understand these key aspects:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Protection Against Electric Shock</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Basic protection (protection against direct contact)</li>
                <li>Fault protection (protection against indirect contact)</li>
                <li>Additional protection by RCDs</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Protective Measures</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Earthed equipotential bonding and automatic disconnection of supply</li>
                <li>Double or reinforced insulation</li>
                <li>Electrical separation</li>
                <li>Extra-low voltage (SELV and PELV)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Circuit Design</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Selection of appropriate cable types and sizes</li>
                <li>Calculation of voltage drop</li>
                <li>Selection of overcurrent protective devices</li>
                <li>Coordination of protective devices</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <BookOpen className="mr-2 h-5 w-5" /> Application in Practice
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            The IET Wiring Regulations are applied through:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-elec-light/80">
            <li>The design of new electrical installations</li>
            <li>Alterations and additions to existing installations</li>
            <li>Periodic inspection and testing of existing installations</li>
            <li>Certification of compliance with BS 7671</li>
            <li>The use of appropriate forms for certification and reporting</li>
          </ul>
          
          <p className="mt-4 text-elec-light/80">
            It's essential to remain up-to-date with amendments and revisions to BS 7671, 
            as these incorporate new safety requirements and technological developments.
          </p>
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

export default Subsection1_2;
