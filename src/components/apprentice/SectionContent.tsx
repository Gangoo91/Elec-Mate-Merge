
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { healthAndSafetyContent } from "@/data/healthAndSafetyContent";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

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
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {sectionData.content.subsections.map((subsection: any) => (
            <Card 
              key={subsection.id}
              className="p-4 bg-elec-dark border border-elec-yellow/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-all group cursor-pointer"
              onClick={() => {
                // Scroll to the heading or expand section
                const element = document.getElementById(`subsection-${subsection.id}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-elec-yellow font-semibold">{subsection.id}</span>
                  <h3 className="font-semibold">{subsection.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 text-elec-yellow group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 space-y-12">
          {sectionData.content.subsections.map((subsection: any) => (
            <div 
              key={subsection.id} 
              id={`subsection-${subsection.id}`}
              className="scroll-mt-6 border-l-4 border-elec-yellow pl-6 py-2"
            >
              <CourseContentSection
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

export default SectionContent;
