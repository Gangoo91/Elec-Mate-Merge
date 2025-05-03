
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { healthAndSafetyContent } from "@/data/healthAndSafetyContent";
import { electricalTheoryContent } from "@/data/electricalTheoryContent";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SectionContent = () => {
  const { courseSlug, unitSlug, sectionId } = useParams();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState<any>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  useEffect(() => {
    if (sectionId) {
      // Determine which unit we're in to choose the correct content source
      if (unitSlug && unitSlug.includes("elec2-01")) {
        // Find the section with matching ID in health and safety content
        const section = healthAndSafetyContent.find(
          section => section.sectionNumber.toLowerCase().replace(/\//g, "-") === sectionId
        );
        
        if (section) {
          setSectionData(section);
        }
      } else if (unitSlug && unitSlug.includes("elec2-04")) {
        // Find the section with matching ID in electrical theory content
        const section = electricalTheoryContent.find(
          section => section.sectionNumber.toLowerCase() === sectionId
        );
        
        if (section) {
          setSectionData(section);
        }
      }
    }
  }, [sectionId, unitSlug]);

  const handleBackClick = () => {
    if (courseSlug && unitSlug) {
      navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`);
    }
  };

  if (!sectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading section content...</p>
      </div>
    );
  }

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            {sectionData.sectionNumber}
          </span>
          <h2 className="text-2xl font-bold">{sectionData.title}</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {sectionData.content.subsections.map((subsection: any) => (
            <Card 
              key={subsection.id}
              className="p-4 bg-elec-dark border border-elec-yellow/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-elec-yellow font-semibold">{subsection.id}</span>
                  <h3 className="font-semibold">{subsection.title}</h3>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-elec-yellow hover:bg-elec-yellow/10"
                        onClick={() => toggleSection(subsection.id)}
                      >
                        <Book className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {expandedSection === subsection.id && (
                <div className="mt-4 pt-4 border-t border-elec-yellow/20 animate-fade-in">
                  <CourseContentSection
                    title={subsection.title}
                    description={subsection.content}
                    keyPoints={subsection.keyPoints}
                    icon={sectionData.content.icon}
                    isMainSection={true}
                    subsectionId={subsection.id}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
