
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection6_1/IntroSection";
import WorkingPractices from "./subsection6_1/WorkingPractices";
import RiskAssessment from "./subsection6_1/RiskAssessment";
import PlanningConsiderations from "./subsection6_1/PlanningConsiderations";
import SafeIsolationProcedures from "./subsection6_1/SafeIsolationProcedures";
import CompletionButton from "../shared/CompletionButton";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

const Subsection6_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("Subsection6_1 rendering with ID:", subsectionId);
  
  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* Decorative Separator with Icon */}
      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-grow bg-elec-yellow/30" />
        <div className="bg-elec-yellow/10 p-2 rounded-full">
          <span className="text-elec-yellow text-xl">⚡</span>
        </div>
        <Separator className="flex-grow bg-elec-yellow/30" />
      </div>
      
      {/* Working Practices Section */}
      <div className="pt-2">
        <WorkingPractices />
      </div>
      
      {/* Safe Isolation Procedures Section */}
      <div className="rounded-lg border border-elec-yellow/20 p-4 md:p-6 bg-gradient-to-b from-elec-dark/50 to-elec-dark">
        <h3 className="text-2xl font-bold text-elec-yellow mb-6">Essential Safety Procedures</h3>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <SafeIsolationProcedures />
        </div>
      </div>
      
      {/* Risk Assessment Section */}
      <RiskAssessment />
      
      {/* Planning Considerations Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <div className="p-4 md:p-6">
          <PlanningConsiderations />
        </div>
      </Card>
      
      {/* Completion Button */}
      <div className="pt-6 border-t border-elec-yellow/20">
        <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
      </div>
    </div>
  );
};

export default Subsection6_1;
