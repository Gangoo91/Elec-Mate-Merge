
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { craftSkillsContent } from "@/data/craftSkills/index";
import type { SectionData, Subsection } from "@/data/healthAndSafety/types";
import BackButton from "@/components/common/BackButton";

const CraftSkillsContent = () => {
  const { sectionId, courseSlug, unitSlug } = useParams();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  
  useEffect(() => {
    if (sectionId) {
      // Find the section with matching section number
      const section = craftSkillsContent.find(
        section => section.sectionNumber === sectionId
      );
      
      if (section) {
        setSectionData(section);
      }
    }
  }, [sectionId]);

  if (!sectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading section content...</p>
      </div>
    );
  }

  const handleSubsectionClick = (subsection: Subsection) => {
    if (courseSlug && unitSlug && sectionId) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}/craft-skills/${sectionId}/subsection/${subsection.id}`);
    }
  };

  // Safely access subsections with type checking
  const subsections = sectionData.content && 
    typeof sectionData.content === 'object' && 
    'subsections' in sectionData.content ? 
    sectionData.content.subsections : 
    sectionData.subsections || [];

  return (
    <div className="space-y-6 animate-fade-in px-4 md:px-0">
      <div className="mb-6">
        <BackButton 
          courseSlug={courseSlug} 
          unitSlug={unitSlug} 
          sectionId={sectionId}
        />
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-elec-yellow text-elec-dark w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold">
              {sectionData.sectionNumber}
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{sectionData.title}</h1>
        </div>
        
        <div className="space-y-4 max-w-4xl mx-auto">
          {subsections.map((subsection) => (
            <div 
              key={subsection.id} 
              className="border border-elec-yellow/20 rounded-lg p-5 hover:bg-elec-yellow/5 transition-all cursor-pointer"
              onClick={() => handleSubsectionClick(subsection)}
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
    </div>
  );
};

export default CraftSkillsContent;
