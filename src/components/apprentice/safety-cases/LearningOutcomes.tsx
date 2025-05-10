
import React from "react";
import { Check } from "lucide-react";

const LearningOutcomes = () => {
  return (
    <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20 mt-6">
      <h3 className="text-lg font-medium mb-2 text-elec-yellow">Learning Outcomes</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Critical thinking in high-pressure situations</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Regulations awareness and application</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Situational judgement skills development</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Professional communication under pressure</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>UK regulatory framework compliance</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Risk assessment and hazard identification</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Emergency response preparedness</span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Electrical safety in specialised environments</span>
        </li>
      </ul>
    </div>
  );
};

export default LearningOutcomes;
