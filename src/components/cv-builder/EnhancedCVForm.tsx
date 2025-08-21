
import React from "react";
import { CVData } from "./types";
import { EnhancedPersonalInfoForm } from "./forms/EnhancedPersonalInfoForm";
import { EnhancedExperienceForm } from "./forms/EnhancedExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { EnhancedSkillsForm } from "./forms/EnhancedSkillsForm";

interface EnhancedCVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const EnhancedCVForm: React.FC<EnhancedCVFormProps> = ({ cvData, onChange }) => {
  return (
    <div className="space-y-4">
      <EnhancedPersonalInfoForm cvData={cvData} onChange={onChange} />
      <EnhancedExperienceForm cvData={cvData} onChange={onChange} />
      <EducationForm cvData={cvData} onChange={onChange} />
      <EnhancedSkillsForm cvData={cvData} onChange={onChange} />
    </div>
  );
};
