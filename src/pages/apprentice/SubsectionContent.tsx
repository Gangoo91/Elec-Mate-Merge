
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LearningBackButton from "@/components/apprentice/navigation/LearningBackButton";
import SubsectionLearningContent from "@/components/apprentice/subsection/SubsectionLearningContent";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import { legislationSection } from "@/data/electricalTheory/section1-legislation";

const SubsectionContent = () => {
  const { courseSlug = "level-2-diploma", unitSlug = "health-safety", sectionId, subsectionId } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Log parameters to debug
  console.log("SubsectionContent params:", { courseSlug, unitSlug, sectionId, subsectionId });
  
  // Ensure we have valid parameters for all routes
  const effectiveCourseSlug = courseSlug || "level-2-diploma";
  const effectiveUnitSlug = unitSlug || "health-safety";
  
  // Check if we're on the electrical theory unit
  const isElectricalTheory = effectiveUnitSlug === "elec2-04";
  
  const {
    subsectionData,
    sectionTitle,
    siblingSubsections,
    navigateToSubsection,
  } = useSubsectionContent({
    courseSlug: effectiveCourseSlug,
    unitSlug: effectiveUnitSlug,
    sectionId,
    subsectionId,
  });
  
  // Override title for electrical theory subsection 1.1
  let displaySectionTitle = sectionTitle;
  let displaySubsectionTitle = subsectionData?.title;
  
  if (isElectricalTheory && subsectionId === "1.1") {
    // Use correct title for electrical theory subsection 1.1
    displaySectionTitle = "Legislation & Regulations";
    displaySubsectionTitle = "Health and Safety at Work Act 1974";
  }
  
  // Check local storage for completion status
  useEffect(() => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
      const storedCompletion = localStorage.getItem(storageKey);
      setIsCompleted(storedCompletion === 'true');
      console.log("Checking completion status:", storageKey, storedCompletion);
    }
  }, [sectionId, subsectionId]);
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
      console.log("Marked as complete:", storageKey);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in bg-[#121212] px-4 md:px-6 max-w-4xl mx-auto py-8">
      {/* Back Button - Updated to go back to section rather than unit */}
      <div className="w-full">
        <LearningBackButton
          currentPath="subsection"
          courseSlug={effectiveCourseSlug}
          unitSlug={effectiveUnitSlug}
          sectionId={sectionId}
          subsectionId={subsectionId}
        />
      </div>
      
      {/* Subsection Title */}
      <div className="border-b border-elec-yellow/20 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-elec-yellow">
          {displaySectionTitle && `${displaySectionTitle}: `}
          {displaySubsectionTitle || "Learning Content"}
        </h1>
      </div>
      
      {/* Subsection content */}
      {subsectionId && (
        <SubsectionLearningContent 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      )}
    </div>
  );
};

export default SubsectionContent;
