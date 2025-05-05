
import { useParams } from "react-router-dom";
import BackButton from "@/components/apprentice/BackButton";
import SectionHeader from "@/components/apprentice/SectionHeader";
import { useSectionContent } from "@/hooks/useSectionContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen } from "lucide-react";

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
        />
      </div>
      
      <SectionHeader 
        sectionNumber={sectionData.sectionNumber} 
        title={sectionData.title} 
      />
      
      <div className="space-y-4 max-w-4xl mx-auto">
        {sectionData.content.subsections.map((subsection) => (
          <div 
            key={subsection.id}
            className="border border-elec-yellow/20 rounded-lg p-5 hover:bg-elec-yellow/5 transition-all cursor-pointer bg-[#1a1a1a]"
            onClick={() => navigateToSubsection(subsection)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-xl font-bold text-elec-yellow mr-4">
                  {subsection.id}
                </div>
                <div className="text-xl font-medium">
                  {subsection.title}
                </div>
              </div>
              <BookOpen className="h-5 w-5 text-elec-yellow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionContent;
