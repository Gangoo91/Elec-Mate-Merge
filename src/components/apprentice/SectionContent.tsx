
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { healthAndSafetyContent } from "@/data/healthAndSafetyContent";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const [sectionData, setSectionData] = useState<any>(null);
  
  useEffect(() => {
    if (sectionId) {
      // Find the section with matching ID
      const section = healthAndSafetyContent.find(
        section => section.sectionNumber.toLowerCase().replace(/\//g, "-") === sectionId
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}>
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Unit
          </Button>
        </Link>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            {sectionData.sectionNumber}
          </span>
          <h2 className="text-2xl font-bold">{sectionData.title}</h2>
        </div>
        
        <div className="space-y-8">
          {sectionData.content.subsections.map((subsection: any) => (
            <CourseContentSection
              key={subsection.id}
              title={subsection.title}
              description={subsection.content}
              keyPoints={subsection.keyPoints}
              icon={sectionData.content.icon}
              isMainSection={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
