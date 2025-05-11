
import React from "react";
import { HardHat } from "lucide-react";

const GeneralSafetyPPE = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
        <HardHat className="h-5 w-5" />
        General Safety PPE Requirements
      </h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold">Head and Eye Protection</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Safety helmets</span>
              <p className="text-sm mt-1">BS EN 397 with electrical insulation properties</p>
            </li>
            <li>
              <span className="font-medium">Safety glasses/goggles</span>
              <p className="text-sm mt-1">BS EN 166 with appropriate impact resistance</p>
            </li>
            <li>
              <span className="font-medium">Face shields</span>
              <p className="text-sm mt-1">For protection against electrical flash, flying particles</p>
            </li>
          </ul>
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold">Body and Extremity Protection</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Safety footwear</span>
              <p className="text-sm mt-1">BS EN ISO 20345 with electrical resistance properties</p>
            </li>
            <li>
              <span className="font-medium">Flame-resistant clothing</span>
              <p className="text-sm mt-1">BS EN ISO 11612 compliant for thermal hazards</p>
            </li>
            <li>
              <span className="font-medium">Hi-visibility clothing</span>
              <p className="text-sm mt-1">BS EN ISO 20471 for work near roads or in low light</p>
            </li>
            <li>
              <span className="font-medium">Hearing protection</span>
              <p className="text-sm mt-1">For noisy environments, BS EN 352 rated</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeneralSafetyPPE;
