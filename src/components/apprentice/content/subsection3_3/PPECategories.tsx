
import React from "react";
import { Shield } from "lucide-react";

const PPECategories = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
        <Shield className="h-5 w-5" />
        Categories of Electrical Safety PPE
      </h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold">Insulating PPE</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Insulating gloves</span>
              <p className="text-sm mt-1">Must be certified to BS EN 60903 standard with appropriate class rating (Class 00-4)</p>
            </li>
            <li>
              <span className="font-medium">Insulating mats</span>
              <p className="text-sm mt-1">BS EN 61111 rated for the appropriate voltage class</p>
            </li>
            <li>
              <span className="font-medium">Insulated tools</span>
              <p className="text-sm mt-1">VDE/BS EN 60900 rated for either 1000V AC or 1500V DC</p>
            </li>
            <li>
              <span className="font-medium">Insulating blankets</span>
              <p className="text-sm mt-1">For covering exposed live parts, BS EN 61112 compliance</p>
            </li>
          </ul>
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold">Arc Flash Protection</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Arc flash rated clothing</span>
              <p className="text-sm mt-1">Rated in cal/cm², typically 8-40 cal/cm² based on risk assessment</p>
            </li>
            <li>
              <span className="font-medium">Face shields</span>
              <p className="text-sm mt-1">Arc rated to protect against thermal energy</p>
            </li>
            <li>
              <span className="font-medium">Arc flash hood/balaclava</span>
              <p className="text-sm mt-1">Protects head and neck from thermal energy</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PPECategories;
