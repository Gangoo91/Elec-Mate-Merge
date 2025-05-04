
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, HardHat } from "lucide-react";

interface Subsection4_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection4_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection4_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Safe Working Practices for Electrical Installations</h2>
      
      <div className="space-y-5">
        <p>
          Safety is paramount in electrical installations. As an electrician, you must understand and apply safe working 
          practices to protect yourself, your colleagues, and end users. The Electricity at Work Regulations 1989 
          place legal responsibilities on employers and employees to ensure electrical safety.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-5 mt-6">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Safe Isolation Procedures
          </h3>
          
          <p>
            Safe isolation is a critical procedure that must be followed before working on any electrical equipment or circuit. 
            The steps below outline the correct procedure for safe isolation:
          </p>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/20 rounded-lg p-5">
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-semibold text-white">Identify</span>
                <p className="mt-1">Correctly identify the circuit or equipment to be worked on using drawings, labels, or testing.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Isolate</span>
                <p className="mt-1">Switch off and lock the correct isolation device to disconnect the supply.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Prove the voltage indicator</span>
                <p className="mt-1">Test your voltage indicator on a known live source to verify it's working correctly.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Test for dead</span>
                <p className="mt-1">Use the voltage indicator to verify that the circuit or equipment is dead at all points where work will take place.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Re-prove the voltage indicator</span>
                <p className="mt-1">Test your voltage indicator again on a known live source to ensure it's still working correctly.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Secure the isolation</span>
                <p className="mt-1">Apply locks, tags, and/or warning notices to prevent the supply being inadvertently reconnected.</p>
              </li>
            </ol>
          </div>
          
          <div className="mt-5">
            <h4 className="font-semibold text-white mb-2">Essential Isolation Equipment</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>GS38-compliant voltage indicator</li>
              <li>Proving unit (for testing the voltage indicator)</li>
              <li>Locking off devices and padlocks</li>
              <li>Warning tags and notices</li>
              <li>Circuit identification tools</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <HardHat className="h-5 w-5 mr-2" />
              Personal Protective Equipment (PPE)
            </h3>
            
            <p>
              Appropriate PPE must be selected, maintained, and used correctly for electrical work. Key electrical PPE includes:
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-elec-yellow/20 p-1 rounded-full mt-1">
                  <HardHat className="h-4 w-4 text-elec-yellow" />
                </div>
                <div>
                  <span className="font-semibold text-white">Insulated Tools</span>
                  <p className="mt-1">Tools with insulated handles rated to at least 1000V, regularly inspected for damage.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-elec-yellow/20 p-1 rounded-full mt-1">
                  <HardHat className="h-4 w-4 text-elec-yellow" />
                </div>
                <div>
                  <span className="font-semibold text-white">Insulating Gloves</span>
                  <p className="mt-1">Appropriate voltage-rated gloves for protection against electric shock.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-elec-yellow/20 p-1 rounded-full mt-1">
                  <HardHat className="h-4 w-4 text-elec-yellow" />
                </div>
                <div>
                  <span className="font-semibold text-white">Eye Protection</span>
                  <p className="mt-1">Safety glasses or face shields to protect against arcs or flying debris.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-elec-yellow/20 p-1 rounded-full mt-1">
                  <HardHat className="h-4 w-4 text-elec-yellow" />
                </div>
                <div>
                  <span className="font-semibold text-white">Flame-Resistant Clothing</span>
                  <p className="mt-1">For work where arc flash hazards exist.</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-elec-yellow/20 p-1 rounded-full mt-1">
                  <HardHat className="h-4 w-4 text-elec-yellow" />
                </div>
                <div>
                  <span className="font-semibold text-white">Insulating Mats</span>
                  <p className="mt-1">To provide insulation from ground when working on electrical equipment.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow">Risk Assessment</h3>
            
            <p>
              Risk assessment is a legal requirement and essential for identifying hazards and implementing control measures before work begins.
            </p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Risk Assessment Process</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Identify the hazards associated with the work</li>
                <li>Determine who might be harmed and how</li>
                <li>Evaluate the risks and decide on precautions</li>
                <li>Record your findings and implement them</li>
                <li>Review and update as necessary</li>
              </ol>
              
              <div className="mt-4">
                <h4 className="font-semibold text-white mb-2">Common Electrical Hazards</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Electric shock and burns</li>
                  <li>Fire from faulty electrical equipment</li>
                  <li>Arc flash and blast</li>
                  <li>Falls from height when accessing electrical equipment</li>
                  <li>Manual handling injuries from heavy equipment</li>
                  <li>Exposure to asbestos or other hazardous materials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Permits to Work</h3>
          
          <div className="space-y-4">
            <p>
              A permit-to-work system provides formal authorization for specific work activities and ensures that all safety measures are in place.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">When are Permits Required?</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Work on high voltage systems</li>
                  <li>Work in hazardous areas (explosive atmospheres)</li>
                  <li>Complex isolations involving multiple energy sources</li>
                  <li>Work on shared services or where other contractors may be affected</li>
                  <li>Hot work (work involving flames or generating heat)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Key Elements of a Permit</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Clear description of work to be done</li>
                  <li>Hazards identified and precautions required</li>
                  <li>Isolation points and methods clearly stated</li>
                  <li>Time limitations for the work</li>
                  <li>Competent persons authorized to do the work</li>
                  <li>Signatures of issuer and receiver</li>
                  <li>Handback procedure after work completion</li>
                </ul>
              </div>
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

export default Subsection4_1;
