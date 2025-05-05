
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/apprentice/BackButton";
import SectionHeader from "@/components/apprentice/SectionHeader";
import SubsectionDisplay from "@/components/apprentice/SubsectionDisplay";
import SubsectionsNavigation from "@/components/apprentice/SubsectionsNavigation";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";

const SubsectionContent = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId = "" } = useParams();
  const navigate = useNavigate();
  
  const {
    subsectionData,
    sectionTitle,
    isCompleted,
    siblingSubsections,
    parentSectionNumber,
    markAsComplete,
    navigateToSubsection
  } = useSubsectionContent({ courseSlug, unitSlug, sectionId, subsectionId });

  if (!subsectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in bg-[#121212]">
      <div className="mb-6">
        <BackButton 
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
          sectionId={sectionId}
        />
      </div>
      
      <SectionHeader 
        sectionNumber={parentSectionNumber} 
        title={sectionTitle} 
      />
      
      <SubsectionDisplay 
        subsectionData={subsectionData}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
        subsectionId={subsectionId}
      />

      <SubsectionsNavigation 
        subsections={siblingSubsections}
        currentSubsectionId={subsectionId}
        navigateToSubsection={navigateToSubsection}
      />
    </div>
  );
};

export default SubsectionContent;
