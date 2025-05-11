
import React from "react";
import SubsectionRenderer from "./SubsectionRenderer";

interface SubsectionLearningContentProps {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const SubsectionLearningContent = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionLearningContentProps) => {
  console.log("SubsectionLearningContent - Rendering with ID:", subsectionId);
  console.log("SubsectionLearningContent - Completion status:", isCompleted);
  
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
