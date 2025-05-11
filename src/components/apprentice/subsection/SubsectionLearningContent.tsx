
import React from "react";
import { SubsectionProps } from "../content/subsection1_1/types";
import SubsectionRenderer from "./SubsectionRenderer";

const SubsectionLearningContent = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  console.log("SubsectionLearningContent rendering with subsectionId:", subsectionId);

  return (
    <div className="animate-fade-in">
      <SubsectionRenderer
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    </div>
  );
};

export default SubsectionLearningContent;
