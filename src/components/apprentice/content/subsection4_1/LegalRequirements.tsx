
import React from "react";

const LegalRequirements = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Working at Height Regulations</h3>
      
      <div className="space-y-4">
        <p>
          The Work at Height Regulations 2005 provides a comprehensive framework for managing the risks 
          associated with working at height. Electrical workers must understand these regulations as they 
          frequently work in elevated positions when installing lighting, cable trays, or accessing 
          distribution boards.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Key Regulations for Electrical Work</h4>
          <ul className="list-disc pl-5 space-y-2 text-elec-light/80">
            <li>
              <span className="font-medium text-white">Regulation 4:</span> Proper planning and organization of all work at height
            </li>
            <li>
              <span className="font-medium text-white">Regulation 6:</span> Avoiding work at height where possible
            </li>
            <li>
              <span className="font-medium text-white">Regulation 7:</span> Proper risk assessment for unavoidable height work
            </li>
            <li>
              <span className="font-medium text-white">Regulation 8:</span> Account for weather conditions that could endanger health and safety
            </li>
            <li>
              <span className="font-medium text-white">Regulation 9:</span> Staff must be properly trained for working at height
            </li>
            <li>
              <span className="font-medium text-white">Regulation 12:</span> Inspection of work equipment for working at height
            </li>
          </ul>
        </div>
        
        <p>
          Electrical contractors must follow the hierarchy of control measures outlined in the 
          regulations: avoid working at height if possible; use work equipment to prevent falls; 
          minimize the distance and consequences of a fall should one occur.
        </p>
      </div>
    </div>
  );
};

export default LegalRequirements;
