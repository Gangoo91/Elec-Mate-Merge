
import React from "react";
import { Zap } from "lucide-react";

const SafeIsolationProcedures = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <Zap className="h-6 w-6 mr-2" />
        Safe Isolation Procedures
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Safe isolation is a critical procedure that must be followed before working on electrical systems. 
        The HSE's guidance HSG85 emphasises the importance of proper isolation to prevent accidental energisation. 
        Failure to follow proper isolation procedures has resulted in numerous injuries and fatalities in the UK.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">Five Steps of Safe Isolation:</h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li><span className="font-medium">Identify</span> the circuit or equipment to be worked on</li>
            <li><span className="font-medium">Isolate</span> and secure with appropriate lock-off devices</li>
            <li><span className="font-medium">Prove</span> the voltage tester is working on known live source</li>
            <li><span className="font-medium">Test</span> that the circuit or equipment is dead</li>
            <li><span className="font-medium">Reprove</span> the tester works on a known live source</li>
          </ol>
          <p className="mt-3 text-elec-light/80">
            Each step must be documented in accordance with company procedures, 
            and a permit-to-work may be required for complex systems.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">When live work is permitted:</h4>
          <p className="mb-2 text-elec-light/80">
            Regulation 14 of the Electricity at Work Regulations states that live working 
            is only permitted when:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>It's unreasonable for the circuit to be dead</li>
            <li>It's reasonable to work live</li>
            <li>Suitable precautions are in place to prevent injury</li>
            <li>A risk assessment has been completed and documented</li>
            <li>The work is authorised by a competent person</li>
            <li>Special tools and PPE are provided and used</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafeIsolationProcedures;
