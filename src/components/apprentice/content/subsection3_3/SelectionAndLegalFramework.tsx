
import React from "react";
import { Zap } from "lucide-react";

const SelectionAndLegalFramework = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center gap-2">
        <Zap className="h-5 w-5" />
        Selection and Legal Framework
      </h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold">Voltage Classification</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Low voltage: up to 1000V AC/1500V DC</li>
            <li>High voltage: above 1000V AC/1500V DC</li>
            <li>Different classes of insulating gloves required for different voltage ranges:
              <ul className="list-disc pl-5 mt-1">
                <li>Class 00: Up to 500V AC</li>
                <li>Class 0: Up to 1000V AC</li>
                <li>Class 1: Up to 7500V AC</li>
                <li>Class 2: Up to 17,000V AC</li>
                <li>Class 3: Up to 26,500V AC</li>
                <li>Class 4: Up to 36,000V AC</li>
              </ul>
            </li>
          </ul>
          
          <h4 className="font-semibold mt-4">Arc Flash Risk Assessment</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Arc flash energy calculation</span>
              <p className="text-sm mt-1">Calculate potential incident energy in cal/cm²</p>
            </li>
            <li>
              <span className="font-medium">Arc flash boundaries</span>
              <p className="text-sm mt-1">Define Limited, Restricted, and Prohibited approach boundaries</p>
            </li>
          </ul>
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold">Regulatory Framework</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Health and Safety at Work Act 1974</span>
              <p className="text-sm mt-1">General duty of care for employers and employees</p>
            </li>
            <li>
              <span className="font-medium">Electricity at Work Regulations 1989</span>
              <p className="text-sm mt-1">Specific requirements for electrical safety measures</p>
            </li>
            <li>
              <span className="font-medium">Personal Protective Equipment at Work Regulations 1992 (amended 2022)</span>
              <p className="text-sm mt-1">Requirements for PPE provision, maintenance and use</p>
            </li>
            <li>
              <span className="font-medium">Management of Health and Safety at Work Regulations 1999</span>
              <p className="text-sm mt-1">Risk assessment requirements</p>
            </li>
          </ul>
          
          <h4 className="font-semibold mt-4">Employer Duties</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide appropriate PPE free of charge</li>
            <li>Ensure training on proper use</li>
            <li>Maintain PPE in good condition</li>
            <li>Provide storage facilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectionAndLegalFramework;
