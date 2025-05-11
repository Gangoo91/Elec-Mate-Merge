
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection6_1/IntroSection";
import WorkingPractices from "./subsection6_1/WorkingPractices";
import RiskAssessment from "./subsection6_1/RiskAssessment";
import PlanningConsiderations from "./subsection6_1/PlanningConsiderations";
import SafeIsolationProcedures from "./subsection6_1/SafeIsolationProcedures";
import CompletionButton from "../shared/CompletionButton";
import { Separator } from "@/components/ui/separator";

const Subsection6_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("Subsection6_1 rendering with ID:", subsectionId);
  
  return (
    <div className="space-y-10 animate-fade-in pb-8">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* Decorative Separator */}
      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-grow bg-elec-yellow/30" />
        <div className="bg-elec-yellow/10 p-2 rounded-full">
          <span className="text-elec-yellow text-xl">⚡</span>
        </div>
        <Separator className="flex-grow bg-elec-yellow/30" />
      </div>
      
      {/* Safe Isolation Procedures - New Section */}
      <SafeIsolationProcedures />
      
      {/* Working Practices Section */}
      <WorkingPractices />
      
      {/* Risk Assessment Section */}
      <RiskAssessment />
      
      {/* Planning Considerations Section */}
      <PlanningConsiderations />
      
      {/* Completion Button */}
      <div className="pt-4 border-t border-elec-yellow/20">
        <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
      </div>
    </div>
  );
};

export default Subsection6_1;
