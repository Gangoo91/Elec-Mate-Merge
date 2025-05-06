
import { useParams } from "react-router-dom";
import BackButton from "@/components/apprentice/BackButton";
import SectionHeader from "@/components/apprentice/SectionHeader";
import { useSectionContent } from "@/hooks/useSectionContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const isMobile = useIsMobile();
  
  const {
    sectionData,
    loading,
    handleBackClick,
    navigateToSubsection
  } = useSectionContent({ courseSlug, unitSlug, sectionId });

  // Track completion status of subsections
  const [completedSubsections, setCompletedSubsections] = useState<Record<string, boolean>>({});

  // Load completion status from localStorage
  useEffect(() => {
    if (sectionId && sectionData) {
      const completionStatus: Record<string, boolean> = {};
      
      sectionData.content.subsections.forEach(subsection => {
        const storageKey = `completion_${sectionId}_${subsection.id}`;
        const isCompleted = localStorage.getItem(storageKey) === 'true';
        completionStatus[subsection.id] = isCompleted;
      });
      
      setCompletedSubsections(completionStatus);
    }
  }, [sectionId, sectionData]);

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
      
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-lg text-elec-light/80 mb-8">
          Select a subsection below to view its detailed content.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionData.content.subsections.map((subsection) => (
            <div 
              key={subsection.id}
              onClick={() => navigateToSubsection(subsection)}
              className="border border-elec-yellow/20 rounded-lg p-5 bg-[#1a1a1a] hover:bg-elec-yellow/5 transition-all cursor-pointer relative"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold">
                    {subsection.id}
                  </span>
                  <h3 className="text-lg font-semibold">{subsection.title}</h3>
                </div>
                <BookOpen className="h-5 w-5 text-elec-yellow" />
              </div>
              
              <p className="text-elec-light/70 line-clamp-2">
                {subsection.content?.substring(0, 100)}...
              </p>
              
              {/* Completion indicator */}
              {completedSubsections[subsection.id] && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
