
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection4_1/IntroSection";
import LadderTypes from "./subsection4_1/LadderTypes";
import LadderInspection from "./subsection4_1/LadderInspection";
import CompletionButton from "./shared/CompletionButton";

const Subsection4_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* First horizontal box - Ladder Types */}
      <LadderTypes />
      
      {/* Second horizontal box - Ladder Inspection & Safe Use */}
      <LadderInspection />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection4_1;
