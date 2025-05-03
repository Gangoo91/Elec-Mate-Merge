
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Info, Construction, AlertTriangle, HardHat, ListOrdered, Section } from "lucide-react";

interface ContentSectionProps {
  sectionNumber?: string;
  title: string;
  description: string;
  keyPoints?: string[];
  subsections?: {
    id: string;
    title: string;
    content: string;
    keyPoints?: string[];
  }[];
  icon?: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section";
  isMainSection?: boolean;
  subsectionId?: string;
}

const CourseContentSection = ({ 
  sectionNumber, 
  title, 
  description, 
  keyPoints = [], 
  subsections = [], 
  icon = "info",
  isMainSection = false,
  subsectionId
}: ContentSectionProps) => {
  // Select the appropriate icon based on the icon prop
  const IconComponent = 
    icon === "safety" ? Shield :
    icon === "construction" ? Construction :
    icon === "warning" ? AlertTriangle :
    icon === "hardhat" ? HardHat :
    icon === "list" ? ListOrdered :
    icon === "section" ? Section : Info;

  // Format description for safe isolation section
  const formatDescription = (text: string, id: string | undefined) => {
    if (id === "3.1") {
      // Split text at the list of steps
      const beforeSteps = text.split("The five essential steps of safe isolation must be followed without exception:")[0];
      const afterSteps = text.split("\n\nProper isolation equipment includes")[1];
      
      return (
        <>
          <p className="text-muted-foreground mb-4">{beforeSteps}</p>
          
          <div className="my-6">
            <h4 className="text-lg font-bold text-elec-yellow mb-4">The 5 Essential Steps of Safe Isolation:</h4>
            <ol className="list-none space-y-3 pl-0">
              <li className="flex gap-3 border border-elec-yellow/30 p-3 rounded-lg bg-elec-dark/70">
                <span className="flex-shrink-0 bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold">1</span>
                <span>Identify the circuit or equipment to be worked on, using diagrams and labels to ensure the correct isolation point.</span>
              </li>
              <li className="flex gap-3 border border-elec-yellow/30 p-3 rounded-lg bg-elec-dark/70">
                <span className="flex-shrink-0 bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold">2</span>
                <span>Isolate the supply by switching off and locking the isolation device.</span>
              </li>
              <li className="flex gap-3 border border-elec-yellow/30 p-3 rounded-lg bg-elec-dark/70">
                <span className="flex-shrink-0 bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold">3</span>
                <span>Prove the test instrument on a known live source.</span>
              </li>
              <li className="flex gap-3 border border-elec-yellow/30 p-3 rounded-lg bg-elec-dark/70">
                <span className="flex-shrink-0 bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold">4</span>
                <span>Use the test instrument to verify the circuit is dead.</span>
              </li>
              <li className="flex gap-3 border border-elec-yellow/30 p-3 rounded-lg bg-elec-dark/70">
                <span className="flex-shrink-0 bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold">5</span>
                <span>Confirm the test instrument still works on a known live source after testing.</span>
              </li>
            </ol>
          </div>
          
          <p className="text-muted-foreground">{afterSteps}</p>
        </>
      );
    }
    
    return <p className="text-muted-foreground">{text}</p>;
  };
  
  return (
    <div className={`mb-4 ${isMainSection ? 'bg-transparent' : ''}`}>
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-shrink-0 mt-1">
          {sectionNumber && (
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-elec-yellow text-elec-dark font-bold text-sm">
              {sectionNumber}
            </span>
          )}
          {!sectionNumber && (
            <IconComponent className="h-6 w-6 text-elec-yellow" />
          )}
        </div>
        <div className="flex-1">
          {formatDescription(description, subsectionId)}
        </div>
      </div>
      
      {keyPoints.length > 0 && (
        <Accordion type="single" collapsible className="ml-9 border-l-2 pl-4 border-elec-yellow/20">
          <AccordionItem value="key-points" className="border-b-0">
            <AccordionTrigger className="py-3 text-sm hover:no-underline">
              <span className="text-elec-yellow">Key Learning Points</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default CourseContentSection;
