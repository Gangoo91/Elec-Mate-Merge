
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import SubsectionLearningContent from "./subsection/SubsectionLearningContent";
import SubsectionsNavigation from "./SubsectionsNavigation";

const SubsectionPage = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  
  // Detect if we're on an electrical theory page
  const path = window.location.pathname;
  const isElectricalTheory = path.includes("/elec2-04") || path.includes("/electrical-theory");
  
  // Use the effective unit slug based on the path
  const effectiveUnitSlug = isElectricalTheory ? "elec2-04" : unitSlug;
  
  console.log("SubsectionPage - Params:", { courseSlug, unitSlug: effectiveUnitSlug, sectionId, subsectionId, path });
  console.log("SubsectionPage - Is Electrical Theory:", isElectricalTheory);
  
  const {
    subsectionData,
    sectionTitle,
    siblingSubsections,
    navigateToSubsection,
    isCompleted,
    parentSectionNumber,
    markAsComplete,
  } = useSubsectionContent({
    courseSlug,
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

  useEffect(() => {
    console.log("SubsectionPage - Current subsectionId:", subsectionId);
    console.log("SubsectionPage - Current subsectionData:", subsectionData);
  }, [subsectionId, subsectionData]);

  // Handle back navigation to section page
  const handleBackToSection = () => {
    if (isElectricalTheory && sectionId) {
      navigate(`/apprentice/study/eal/level-2-diploma/unit/elec2-04/section/${sectionId}`);
    } else if (courseSlug && effectiveUnitSlug && sectionId) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${effectiveUnitSlug}/section/${sectionId}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 py-3 md:py-4 bg-elec-dark/80 border-b border-elec-yellow/30 shadow-md">
        <h1 className="text-lg md:text-xl font-semibold text-elec-yellow">
          {displaySectionTitle && `${displaySectionTitle}: `}
          {displaySubsectionTitle || "Learning Content"}
        </h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-5 px-4 md:px-6">
          {/* We've removed the top back button here */}
          
          {subsectionId && (
            <div className="mt-5">
              <SubsectionLearningContent
                subsectionId={subsectionId}
                isCompleted={isCompleted}
                markAsComplete={markAsComplete}
              />
            </div>
          )}
        </div>
      </div>
      
      <SubsectionsNavigation
        currentSubsectionId={subsectionId || ""}
        subsections={siblingSubsections}
        navigateToSubsection={navigateToSubsection}
        parentSectionNumber={parentSectionNumber}
      />
    </div>
  );
};

export default SubsectionPage;
