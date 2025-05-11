
import React from "react";
import { ShieldAlert } from "lucide-react";

const KeyRegulations = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <ShieldAlert className="h-6 w-6 mr-2" />
        Key Regulations for Working Safely
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Electrical safety in the UK is governed by multiple regulations and standards. 
        Compliance is legally required and failure to adhere can result in prosecution 
        by the HSE, substantial fines, or imprisonment in serious cases.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-white mb-3">Electricity at Work Regulations 1989</h4>
          <p className="text-elec-light/80 mb-2">
            These regulations place duties on employers, employees and the self-employed 
            to ensure electrical safety in the workplace.
          </p>
          <p className="text-elec-light/80">
            Regulation 14 specifically covers working on or near live conductors, requiring that 
            no person shall work on or near any live conductor unless:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>It is unreasonable for it to be dead</li>
            <li>Suitable precautions are taken</li>
            <li>It is reasonable to work live</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3">BS 7671 Wiring Regulations</h4>
          <p className="text-elec-light/80 mb-2">
            The IET Wiring Regulations are the national standard for electrical installations 
            in the UK. The 18th Edition provides specific technical standards for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Protection against electric shock</li>
            <li>Isolation and switching procedures</li>
            <li>Protective measures for safety</li>
            <li>Inspection and testing requirements</li>
            <li>Special installations or locations</li>
            <li>Earthing arrangements and protective conductors</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KeyRegulations;
