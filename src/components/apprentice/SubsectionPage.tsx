
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import SubsectionLearningContent from "./subsection/SubsectionLearningContent";
import SubsectionsNavigation from "./SubsectionsNavigation";
import BackButton from "./BackButton";

const SubsectionPage = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
  
  // Detect if we're on an electrical theory page
  const path = window.location.pathname;
  const isElectricalTheory = path.includes("/elec2-04") || path.includes("/electrical-theory");
  
  // Use the effective unit slug based on the path
  const effectiveUnitSlug = isElectricalTheory ? "elec2-04" : unitSlug;
  
  console.log("SubsectionPage - Params:", { courseSlug, unitSlug: effectiveUnitSlug, sectionId, subsectionId });
  
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

  useEffect(() => {
    console.log("SubsectionPage - Current subsectionId:", subsectionId);
    console.log("SubsectionPage - Current subsectionData:", subsectionData);
  }, [subsectionId, subsectionData]);

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 py-3 bg-elec-dark/80 border-b border-elec-yellow/20">
        <h1 className="text-lg font-semibold text-elec-yellow">
          {sectionTitle && `${sectionTitle}: `}
          {subsectionData?.title || "Learning Content"}
        </h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-4 px-4 md:px-8">
          <BackButton courseSlug={courseSlug} unitSlug={effectiveUnitSlug} sectionId={sectionId} />
          
          {subsectionId && (
            <div className="mt-4">
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
