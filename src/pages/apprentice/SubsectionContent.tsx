
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "@/components/apprentice/BackButton";
import SectionHeader from "@/components/apprentice/SectionHeader";
import SubsectionDisplay from "@/components/apprentice/SubsectionDisplay";
import SubsectionsNavigation from "@/components/apprentice/SubsectionsNavigation";
import { useSubsectionContent } from "@/hooks/useSubsectionContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

  const handleBackClick = () => {
    if (courseSlug && unitSlug) {
      // Navigate directly back to unit page instead of section page
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    } else {
      navigate(-1);
    }
  };

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
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Unit
        </Button>
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
