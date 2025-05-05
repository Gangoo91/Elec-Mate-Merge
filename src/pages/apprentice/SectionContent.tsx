
import { useParams } from "react-router-dom";
import BackButton from "@/components/apprentice/BackButton";
import SectionHeader from "@/components/apprentice/SectionHeader";
import SectionSubsectionCard from "@/components/apprentice/SectionSubsectionCard";
import { useSectionContent } from "@/hooks/useSectionContent";
import { useIsMobile } from "@/hooks/use-mobile";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const isMobile = useIsMobile();
  
  const {
    sectionData,
    loading,
    handleBackClick,
    navigateToSubsection
  } = useSectionContent({ courseSlug, unitSlug, sectionId });

  if (loading || !sectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading section content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in bg-[#121212] px-4 md:px-0">
      <div className="mb-6">
        <BackButton 
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
          // We don't pass sectionId here so BackButton will navigate back to unit page
          // instead of trying to navigate to a specific section
        />
      </div>
      
      <SectionHeader 
        sectionNumber={sectionData.sectionNumber} 
        title={sectionData.title} 
      />
      
      {/* Use collapsible mode on mobile, regular cards on desktop */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {sectionData.content.subsections.map((subsection) => (
          <SectionSubsectionCard
            key={subsection.id}
            subsection={subsection}
            navigateToSubsection={navigateToSubsection}
            collapsible={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionContent;
