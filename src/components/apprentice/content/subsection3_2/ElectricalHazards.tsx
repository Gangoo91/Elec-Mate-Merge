
import React from "react";
import { AlertTriangle } from "lucide-react";

const ElectricalHazards = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <AlertTriangle className="h-6 w-6 mr-2" />
        Common Electrical Hazards
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Identifying and understanding electrical hazards is essential for implementing 
        effective control measures. The IET Code of Practice for Electrical Safety 
        Management provides comprehensive guidance on hazard identification and risk assessment.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">Hazard Types:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Direct contact with live parts causing electric shock</li>
            <li>Indirect contact through conductive materials or water</li>
            <li>Arc flash/blast injuries causing severe burns</li>
            <li>Fire from electrical faults or overheating</li>
            <li>Stored electrical energy in capacitors or UPS systems</li>
            <li>Step and touch potentials during high voltage work</li>
            <li>EMF exposure from high-current systems</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-elec-yellow mb-3">Common Issues:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Exposed conductors with damaged insulation</li>
            <li>Damaged equipment or terminated cables</li>
            <li>Water ingress in electrical installations</li>
            <li>Overloaded circuits causing excessive heat</li>
            <li>Poorly maintained equipment and connections</li>
            <li>Lack of RCD protection where required</li>
            <li>Inadequate earthing and bonding arrangements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElectricalHazards;
