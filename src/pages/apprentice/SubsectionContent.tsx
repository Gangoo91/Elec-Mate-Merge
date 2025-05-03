
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { installationMethodsContent } from "@/data/installationMethods/index";
import type { Subsection } from "@/data/healthAndSafety/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SubsectionContent = () => {
  const { sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const [subsectionData, setSubsectionData] = useState<Subsection | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  
  useEffect(() => {
    if (sectionId && subsectionId) {
      // Find the section
      const section = installationMethodsContent.find(
        section => section.sectionNumber === sectionId
      );
      
      if (section) {
        setSectionTitle(section.title);
        // Find the subsection
        const subsection = section.content.subsections.find(
          sub => sub.id === subsectionId
        );
        
        if (subsection) {
          setSubsectionData(subsection);
        }
      }
    }
  }, [sectionId, subsectionId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!subsectionData) {
    return (
      <div className="text-center py-8">
        <p>Loading content...</p>
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
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-elec-yellow text-xl font-bold">{subsectionData.id}</span>
            <h1 className="text-2xl font-bold">{subsectionData.title}</h1>
          </div>
          <div className="text-sm text-elec-yellow/80">
            {sectionTitle}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-elec-light/90 leading-relaxed">
            {subsectionData.content}
          </div>
          
          {subsectionData.keyPoints && subsectionData.keyPoints.length > 0 && (
            <Accordion type="single" collapsible className="border-t border-elec-yellow/20 pt-4">
              <AccordionItem value="key-points" className="border-b-0">
                <AccordionTrigger className="py-3 text-elec-yellow hover:no-underline">
                  Key Learning Points
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 list-disc pl-5 text-elec-light/80">
                    {subsectionData.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubsectionContent;
