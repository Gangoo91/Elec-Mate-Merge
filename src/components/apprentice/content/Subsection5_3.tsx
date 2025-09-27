
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection5_3/IntroSection";
import EnhancedEmergencyProcedures from "./subsection5_3/EnhancedEmergencyProcedures";
import FirstAidResponse from "./subsection5_3/FirstAidResponse";
import FireSafety from "./subsection5_3/FireSafety";
import CompletionButton from "../shared/CompletionButton";

const Subsection5_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* Emergency Procedures Section */}
      <EnhancedEmergencyProcedures />
      
      {/* First Aid Response Section */}
      <FirstAidResponse />
      
      {/* Fire Safety Section */}
      <FireSafety />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection5_3;
