
import { useParams } from "react-router-dom";
import BackButton from "@/components/apprentice/BackButton";
import SectionHeader from "@/components/apprentice/SectionHeader";
import SectionSubsectionCard from "@/components/apprentice/SectionSubsectionCard";
import { useSectionContent } from "@/hooks/useSectionContent";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  
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
    <div className="space-y-6 animate-fade-in bg-[#121212]">
      <div className="mb-6">
        <BackButton 
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
          sectionId={sectionId} 
        />
      </div>
      
      <SectionHeader 
        sectionNumber={sectionData.sectionNumber} 
        title={sectionData.title} 
      />
      
      {/* Directly show all subsections content without requiring clicks */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {sectionData.content.subsections.map((subsection) => (
          <SectionSubsectionCard
            key={subsection.id}
            subsection={subsection}
            navigateToSubsection={navigateToSubsection}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionContent;
