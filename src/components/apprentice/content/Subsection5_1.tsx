
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection5_1/IntroSection";
import ElectricalHazards from "./subsection5_1/ElectricalHazards";
import WorkplaceHazards from "./subsection5_1/WorkplaceHazards";
import HazardRecognition from "./subsection5_1/HazardRecognition";
import CompletionButton from "./subsection5_1/CompletionButton";

const Subsection5_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* First horizontal box - Electrical Hazards */}
      <ElectricalHazards />
      
      {/* Second horizontal box - Non-Electrical Workplace Hazards */}
      <WorkplaceHazards />
      
      {/* Third horizontal box - Hazard Recognition and Risk Levels */}
      <HazardRecognition />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection5_1;
