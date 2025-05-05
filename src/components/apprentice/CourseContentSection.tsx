
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Info, Construction, AlertTriangle, HardHat, ListOrdered, Section, Cable, Lightbulb, TestTube, ShieldAlert } from "lucide-react";

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
  icon?: "safety" | "info" | "construction" | "warning" | "hardhat" | "list" | "section" | "cable" | "socket" | "bulb" | "test" | "tools" | "shield-alert";
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
    icon === "shield-alert" ? ShieldAlert :
    icon === "construction" ? Construction :
    icon === "warning" ? AlertTriangle :
    icon === "hardhat" ? HardHat :
    icon === "list" ? ListOrdered :
    icon === "section" ? Section :
    icon === "cable" ? Cable :
    icon === "socket" ? Cable : // Using Cable as a fallback for socket since it doesn't exist
    icon === "bulb" ? Lightbulb :
    icon === "test" ? TestTube :
    icon === "tools" ? Construction : Info; // Using Construction as a fallback for tools

  // Format description for safe isolation section
  const formatDescription = (text: string, id: string | undefined) => {
    if (id === "3.1") {
      // For the safe isolation section, highlight the steps more clearly
      const parts = text.split("The essential steps of safe isolation must be followed without exception:");
      const beforeSteps = parts[0];
      
      // Extract the part after the steps
      const afterPartsRaw = text.split("Proper isolation equipment includes");
      const afterSteps = "Proper isolation equipment includes" + afterPartsRaw[1];
      
      return (
        <>
          <p className="text-muted-foreground mb-4">{beforeSteps}</p>
          
          <div className="my-4 bg-elec-dark/50 border border-elec-yellow/20 rounded-md p-4">
            <h4 className="text-lg font-semibold text-elec-yellow mb-3">The Essential Steps of Safe Isolation:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li><span className="font-medium text-white">Identify</span> - Correctly identify the circuit or equipment to be worked on</li>
              <li><span className="font-medium text-white">Isolate</span> - Switch off and lock the isolation device</li>
              <li><span className="font-medium text-white">Prove the tester</span> - Test your voltage indicator on a known live source</li>
              <li><span className="font-medium text-white">Test dead</span> - Verify the circuit or equipment is dead</li>
              <li><span className="font-medium text-white">Reprove the tester</span> - Test your voltage indicator again on a known live source</li>
              <li><span className="font-medium text-white">Lock off and tag</span> - Apply locks and warning notices to prevent reconnection</li>
              <li><span className="font-medium text-white">Issue permit</span> - For complex systems, issue a permit-to-work</li>
            </ol>
          </div>
          
          <p className="text-muted-foreground mt-3">{afterSteps}</p>
        </>
      );
    }
    
    return <p className="text-muted-foreground text-sm md:text-base">{text}</p>;
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
