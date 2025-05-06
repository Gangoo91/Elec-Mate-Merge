
import React from "react";
import { useParams } from "react-router-dom";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import SubsectionLearningContent from "./subsection/SubsectionLearningContent";
import SubsectionsNavigation from "./SubsectionsNavigation";

const SubsectionPage = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
  
  const {
    subsectionData,
    sectionTitle,
    isCompleted,
    siblingSubsections,
    parentSectionNumber,
    markAsComplete,
    navigateToSubsection,
  } = useSubsectionContent({
    courseSlug,
    unitSlug,
    sectionId,
    subsectionId,
  });

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 py-3 bg-elec-dark/80 border-b border-elec-yellow/20">
        <h1 className="text-lg font-semibold text-elec-yellow">
          {sectionTitle && `${sectionTitle}: `}
          {subsectionData?.title || "Loading..."}
        </h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
          {subsectionId && (
            <SubsectionLearningContent
              subsectionId={subsectionId}
              isCompleted={isCompleted}
              markAsComplete={markAsComplete}
            />
          )}
        </div>
      </div>
      
      <SubsectionsNavigation
        currentSubsectionId={subsectionId || ""}
        subsections={siblingSubsections}
        navigateToSubsection={navigateToSubsection}
      />
    </div>
  );
};

export default SubsectionPage;
