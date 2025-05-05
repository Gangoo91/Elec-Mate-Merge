
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, AlertOctagon } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection3_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Electrical Safety Fundamentals</h2>
      
      <div className="space-y-4">
        <p>
          Electrical safety is paramount in the electrical industry. Understanding the basic principles and hazards
          helps prevent accidents and ensures compliance with health and safety regulations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Electrical Hazards
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Electric Shock</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Current passing through the body</li>
                <li>Effects range from tingling sensation to death</li>
                <li>As little as 50mA can be fatal</li>
                <li>Path through the heart is most dangerous</li>
                <li>Wet conditions increase severity</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Electrical Fire and Burns</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Thermal burns from heated equipment</li>
                <li>Arc flash burns from electrical explosions</li>
                <li>Fires from ignition of combustible materials</li>
                <li>Explosions in flammable atmospheres</li>
                <li>Secondary fires from damaged equipment</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Danger Statistics:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Approximately 1000 electrical accidents at work annually in the UK</li>
                  <li>Around 30 people die from electrical accidents each year</li>
                  <li>Electricians are 4x more likely to be injured at work</li>
                  <li>Most common sources: faulty plugs, sockets and wiring</li>
                  <li>Improper isolation procedures are a leading cause</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Safety Principles
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Safe Isolation Procedures</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identify circuit to be isolated</li>
                <li>Gain permission to isolate</li>
                <li>Switch off and lock off</li>
                <li>Prove dead using approved voltage indicator</li>
                <li>Post warning signs and secure the area</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Working Safely</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Never work on live equipment (unless justified)</li>
                <li>Use the correct tools and equipment</li>
                <li>Wear appropriate PPE</li>
                <li>Maintain good housekeeping</li>
                <li>Follow safe systems of work</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Essential Safety Equipment:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Approved voltage indicator (test lamp or meter)</li>
                  <li>Proving unit for testing the indicator</li>
                  <li>Locking off devices and padlocks</li>
                  <li>Warning signs and barriers</li>
                  <li>Insulated tools and protective equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <AlertOctagon className="h-5 w-5 mr-2" />
            Safety Legislation
          </h3>
          
          <div className="space-y-4">
            <p>Key legislation that governs electrical safety in the workplace:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Primary Legislation</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Health and Safety at Work Act 1974</span>
                    <p className="text-sm mt-1">Overarching duty to ensure safety of employees and others</p>
                  </li>
                  <li>
                    <span className="font-medium">Electricity at Work Regulations 1989</span>
                    <p className="text-sm mt-1">Specific requirements for electrical safety</p>
                  </li>
                  <li>
                    <span className="font-medium">Management of Health and Safety at Work Regulations 1999</span>
                    <p className="text-sm mt-1">Requirements for risk assessment and management</p>
                  </li>
                  <li>
                    <span className="font-medium">Provision and Use of Work Equipment Regulations 1998</span>
                    <p className="text-sm mt-1">Requirements for electrical equipment safety</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Guidance and Standards</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">BS 7671 (IET Wiring Regulations)</span>
                    <p className="text-sm mt-1">Technical standard for electrical installations</p>
                  </li>
                  <li>
                    <span className="font-medium">HSE Guidance Notes</span>
                    <p className="text-sm mt-1">HSG85, HSG230, INDG354 for electrical safety</p>
                  </li>
                  <li>
                    <span className="font-medium">ENA publications</span>
                    <p className="text-sm mt-1">Guidance for working on distribution networks</p>
                  </li>
                  <li>
                    <span className="font-medium">Employer safety policies</span>
                    <p className="text-sm mt-1">Company-specific rules and procedures</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Competence Requirement:</p>
              <p>Regulation 16 of the Electricity at Work Regulations 1989 requires that no person shall engage in work that requires technical knowledge or experience to prevent danger unless they have that knowledge or experience, or are under appropriate supervision. This places legal responsibility on both employers and individuals to ensure competence for electrical work.</p>
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

export default Subsection3_1;
