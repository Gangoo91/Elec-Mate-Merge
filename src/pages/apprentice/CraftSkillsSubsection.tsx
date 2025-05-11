
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { craftSkillsContent } from "@/data/craftSkills/index";
import type { Subsection } from "@/data/healthAndSafety/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";

const CraftSkillsSubsection = () => {
  const { courseSlug, unitSlug, sectionId, subsectionId } = useParams();
  const [subsectionData, setSubsectionData] = useState<Subsection | null>(null);
  const [sectionTitle, setSectionTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (sectionId && subsectionId) {
      // Find the section
      const section = craftSkillsContent.find(
        section => section.sectionNumber === sectionId
      );
      
      if (section) {
        setSectionTitle(section.title);
        
        // Safely access subsections with type checking
        const subsections = section.content && 
          typeof section.content === 'object' && 
          'subsections' in section.content ? 
          section.content.subsections : 
          section.subsections || [];
        
        // Find the subsection
        const subsection = subsections.find(
          sub => sub.id === subsectionId
        );
        
        if (subsection) {
          setSubsectionData(subsection);
          
          // Check local storage for completion status
          const storageKey = `completion_craft_${sectionId}_${subsectionId}`;
          const storedCompletion = localStorage.getItem(storageKey);
          setIsCompleted(storedCompletion === 'true');
        }
      }
    }
  }, [sectionId, subsectionId]);
  
  const markAsComplete = () => {
    if (sectionId && subsectionId) {
      const storageKey = `completion_craft_${sectionId}_${subsectionId}`;
      localStorage.setItem(storageKey, 'true');
      setIsCompleted(true);
    }
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
        <BackButton 
          courseSlug={courseSlug}
          unitSlug={unitSlug}
          sectionId={sectionId}
        />
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-elec-yellow text-xl font-bold">{subsectionData.id}</span>
            <h1 className="text-2xl font-bold">{subsectionData.title}</h1>
            {isCompleted && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
          </div>
          <div className="text-sm text-elec-yellow/80">
            {sectionTitle}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-elec-light/90 leading-relaxed prose prose-invert max-w-none">
            <p className="mb-4">{typeof subsectionData.content === 'string' ? subsectionData.content : 'Content placeholder for this subsection.'}</p>
            
            {/* Image or illustration placeholder */}
            <div className="my-6 bg-elec-dark/50 rounded-lg p-4 flex flex-col items-center text-center">
              <div className="w-full h-64 bg-elec-dark rounded-lg mb-4 flex items-center justify-center border border-elec-yellow/20">
                <p className="text-elec-yellow/70">Practical demonstration image for {subsectionData.title}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Visual reference for the techniques described in this section
              </p>
            </div>
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
          
          {/* Mark as Complete button */}
          <div className="flex justify-end pt-4 border-t border-elec-yellow/20">
            <Button 
              variant="study"
              className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
              onClick={markAsComplete}
              disabled={isCompleted}
            >
              {isCompleted ? 'Completed' : 'Mark as Complete'}
              {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftSkillsSubsection;
