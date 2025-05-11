
import React from "react";
import { ShieldAlert } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PPEAndSafetyEquipment = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <ShieldAlert className="h-6 w-6 mr-2" />
        PPE & Safety Equipment
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Personal Protective Equipment (PPE) is the last line of defence against electrical hazards. 
        The Electricity at Work Regulations 1989 requires employers to provide suitable PPE, 
        and workers must use it correctly. All electrical safety equipment should conform to 
        relevant British Standards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!isMobile ? (
          <>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">Essential PPE:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Insulated gloves (rated for appropriate voltage level)</li>
                <li>Eye protection/face shield for arc flash protection</li>
                <li>Non-conductive safety footwear with appropriate rating</li>
                <li>Flame-resistant clothing meeting BS EN ISO standards</li>
                <li>Insulating mats to BS EN 61111 standards</li>
                <li>Hard hat with electrical protection rating</li>
                <li>Arc flash protection clothing for high-risk areas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">Safety Equipment:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Approved voltage indicators to GS38 standards</li>
                <li>Proving units for testing voltage indicators</li>
                <li>Locking-off devices and MCB locks</li>
                <li>Warning signs and safety tags</li>
                <li>Barriers and screening for work areas</li>
                <li>Insulated tools to BS EN 60900</li>
                <li>Rescue equipment including insulated hooks</li>
              </ul>
            </div>
          </>
        ) : (
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Essential PPE & Equipment:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Insulated gloves (voltage rated)</li>
              <li>Eye protection/face shield</li>
              <li>Approved voltage indicators</li>
              <li>Proving units for testing</li>
              <li>Locking-off devices</li>
              <li>Warning signs and barriers</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PPEAndSafetyEquipment;
