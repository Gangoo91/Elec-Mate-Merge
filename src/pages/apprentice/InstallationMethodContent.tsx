
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { installationMethodsContent } from "@/data/installationMethods/index";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import type { SectionData } from "@/data/healthAndSafety/types";

const InstallationMethodContent = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  
  useEffect(() => {
    if (sectionId) {
      // Find the section with matching section number
      const section = installationMethodsContent.find(
        section => section.sectionNumber === sectionId
      );
      
      if (section) {
        setSectionData(section);
      }
    }
  }, [sectionId]);

  const handleBackClick = () => {
    navigate(-1);
  };

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
        <Button 
          variant="outline" 
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            {sectionData.sectionNumber}
          </span>
          <h2 className="text-2xl font-bold">{sectionData.title}</h2>
        </div>
        
        <div className="space-y-8">
          {sectionData.content.subsections.map((subsection) => (
            <div key={subsection.id} className="border-b border-elec-yellow/20 pb-6 last:border-0">
              <CourseContentSection
                sectionNumber={subsection.id}
                title={subsection.title}
                description={subsection.content}
                keyPoints={subsection.keyPoints}
                icon={sectionData.content.icon}
                isMainSection={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstallationMethodContent;
