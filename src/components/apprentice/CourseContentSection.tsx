
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
}

const CourseContentSection = ({ 
  sectionNumber, 
  title, 
  description, 
  keyPoints = [], 
  subsections = [], 
  icon = "info",
  isMainSection = false
}: ContentSectionProps) => {
  // Select the appropriate icon based on the icon prop
  const IconComponent = 
    icon === "safety" ? Shield :
    icon === "construction" ? Construction :
    icon === "warning" ? AlertTriangle :
    icon === "hardhat" ? HardHat :
    icon === "list" ? ListOrdered :
    icon === "section" ? Section : Info;
  
  return (
    <div className={`mb-6 ${isMainSection ? 'bg-elec-gray rounded-lg p-5 border-l-4 border-elec-yellow' : ''}`}>
      <div className="flex items-start gap-3 mb-3">
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
          <h3 className={`${isMainSection ? 'text-xl' : 'text-lg'} font-semibold`}>
            {title}
          </h3>
          <p className="text-muted-foreground mt-1">{description}</p>
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

      {/* Removed subsection rendering as this is now handled in UnitDetails directly */}
    </div>
  );
};

export default CourseContentSection;
