
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection4_1/IntroSection";
import LegalRequirements from "./subsection4_1/LegalRequirements";
import AccessEquipmentSelection from "./subsection4_1/AccessEquipmentSelection";
import CompletionButton from "./subsection4_1/CompletionButton";

const Subsection4_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* First horizontal box - Legal Requirements */}
      <LegalRequirements />
      
      {/* Second horizontal box - Access Equipment Selection */}
      <AccessEquipmentSelection />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection4_1;
