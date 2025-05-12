
import React from "react";
import SubsectionRenderer from "./SubsectionRenderer";
import LearningBackButton from "@/components/apprentice/navigation/LearningBackButton";

interface SubsectionLearningContentProps {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
  isElectricalTheory?: boolean;
  courseSlug?: string;
  unitSlug?: string;
  sectionId?: string;
}

const SubsectionLearningContent = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete,
  isElectricalTheory = false,
  courseSlug,
  unitSlug,
  sectionId
}: SubsectionLearningContentProps) => {
  console.log("SubsectionLearningContent - Rendering with ID:", subsectionId);
  console.log("SubsectionLearningContent - Completion status:", isCompleted);
  console.log("SubsectionLearningContent - Is Electrical Theory:", isElectricalTheory);
  
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
      {/* Add back button for electrical theory content */}
      {isElectricalTheory && (
        <div className="mb-6">
          <LearningBackButton
            currentPath="subsection"
            courseSlug={courseSlug || "level-2-diploma"}
            unitSlug={unitSlug || "elec2-04"}
            sectionId={sectionId || "1"}
            subsectionId={subsectionId}
          />
        </div>
      )}
      
      <SubsectionRenderer 
        subsectionId={effectiveSubsectionId} 
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
        isElectricalTheory={isElectricalTheory}
      />
    </div>
  );
};

export default SubsectionLearningContent;
