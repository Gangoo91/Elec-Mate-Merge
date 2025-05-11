
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection6_1/IntroSection";
import WorkingPractices from "./subsection6_1/WorkingPractices";
import RiskAssessment from "./subsection6_1/RiskAssessment";
import PlanningConsiderations from "./subsection6_1/PlanningConsiderations";
import CompletionButton from "./shared/CompletionButton";

const Subsection6_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* Working Practices Section */}
      <WorkingPractices />
      
      {/* Risk Assessment Section */}
      <RiskAssessment />
      
      {/* Planning Considerations Section */}
      <PlanningConsiderations />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection6_1;
