
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
  
  // If subsectionId is numeric only (like "1") and we're in section 6, convert it to "6.1" format
  let effectiveSubsectionId = subsectionId;
  const urlPath = window.location.pathname;
  const sectionMatch = urlPath.match(/\/section\/(\d+)/);
  
  if (/^\d+$/.test(subsectionId) && sectionMatch && sectionMatch[1]) {
    const sectionFromUrl = sectionMatch[1];
    effectiveSubsectionId = `${sectionFromUrl}.${subsectionId}`;
    console.log("SubsectionLearningContent - Converted subsection ID to:", effectiveSubsectionId);
  }
  
  return (
    <div className="animate-fade-in">
      <SubsectionRenderer 
        subsectionId={effectiveSubsectionId} 
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    </div>
  );
};

export default SubsectionLearningContent;
