
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection3_3/IntroSection";
import PPECategories from "./subsection3_3/PPECategories";
import GeneralSafetyPPE from "./subsection3_3/GeneralSafetyPPE";
import SelectionAndLegalFramework from "./subsection3_3/SelectionAndLegalFramework";
import InspectionAndLimitations from "./subsection3_3/InspectionAndLimitations";
import CompletionButton from "./subsection3_3/CompletionButton";

const Subsection3_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* First horizontal box - Categories of PPE */}
      <PPECategories />
      
      {/* Second horizontal box - General Safety PPE */}
      <GeneralSafetyPPE />
      
      {/* Third horizontal box - Selection and Risk Assessment + Legal Requirements */}
      <SelectionAndLegalFramework />
      
      {/* Fourth horizontal box - Inspection, Maintenance and Limitations */}
      <InspectionAndLimitations />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection3_3;
