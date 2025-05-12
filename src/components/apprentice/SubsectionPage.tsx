
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import SubsectionLearningContent from "./subsection/SubsectionLearningContent";
import SubsectionsNavigation from "./SubsectionsNavigation";
import LearningBackButton from "./navigation/LearningBackButton";

const SubsectionPage = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  
  // Detect if we're on an electrical theory page
  const path = window.location.pathname;
  const isElectricalTheory = path.includes("/elec2-04") || path.includes("/electrical-theory");
  
  // Use the effective unit slug based on the path
  const effectiveUnitSlug = isElectricalTheory ? "elec2-04" : unitSlug;
  const effectiveCourseSlug = courseSlug || "level-2-diploma";
  
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

  // Override titles for electrical theory subsections
  let displaySectionTitle = sectionTitle;
  let displaySubsectionTitle = subsectionData?.title;
  
  if (isElectricalTheory) {
    displaySectionTitle = "Legislation & Regulations";
    
    if (subsectionId === "1.1") {
      displaySubsectionTitle = "Health and Safety at Work Act 1974";
    } else if (subsectionId === "1.2") {
      displaySubsectionTitle = "Electricity at Work Regulations 1989";
    } else if (subsectionId === "1.3") {
      displaySubsectionTitle = "Building Regulations (Part P)";
    } else if (subsectionId === "1.4") {
      displaySubsectionTitle = "British Standards (BS 7671)";
    } else if (subsectionId === "1.5") {
      displaySubsectionTitle = "Guidance Documents";
    } else if (subsectionId === "1.6") {
      displaySubsectionTitle = "Roles and Responsibilities";
    }
    
    console.log("SubsectionPage - Overriding title for electrical theory subsection:", subsectionId);
  }

  useEffect(() => {
    console.log("SubsectionPage - Current subsectionId:", subsectionId);
    console.log("SubsectionPage - Current subsectionData:", subsectionData);
    console.log("SubsectionPage - Using titles:", { displaySectionTitle, displaySubsectionTitle });
  }, [subsectionId, subsectionData, displaySectionTitle, displaySubsectionTitle]);

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
          {/* Add back button for all subsections */}
          <div className="mb-5">
            <LearningBackButton
              currentPath="subsection"
              courseSlug={effectiveCourseSlug}
              unitSlug={effectiveUnitSlug}
              sectionId={sectionId}
              subsectionId={subsectionId}
            />
          </div>
          
          {subsectionId && (
            <div className="mt-5">
              <SubsectionLearningContent
                subsectionId={subsectionId}
                isCompleted={isCompleted}
                markAsComplete={markAsComplete}
                isElectricalTheory={isElectricalTheory}
                courseSlug={effectiveCourseSlug}
                unitSlug={effectiveUnitSlug}
                sectionId={sectionId}
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
