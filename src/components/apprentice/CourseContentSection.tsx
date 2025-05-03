
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Shield, Info, Construction, HardHat, AlertTriangle, ListOrdered, Section } from "lucide-react";

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
    <div className={`mb-6 ${isMainSection ? 'bg-elec-gray rounded-lg p-5 border-l-4 border-elec-yellow' : 'pl-4'}`}>
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

      {subsections.length > 0 && (
        <div className="ml-9 mt-4 space-y-4">
          {subsections.map((subsection) => (
            <Collapsible key={subsection.id} className="border-l-2 pl-4 border-elec-yellow/20">
              <CollapsibleTrigger className="flex items-center gap-2 hover:text-elec-yellow transition-colors">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-elec-yellow/80 text-elec-dark font-bold text-xs">
                  {subsection.id}
                </span>
                <span className="font-medium">{subsection.title}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 pb-4 pl-7">
                <p className="text-sm text-muted-foreground">{subsection.content}</p>
                {subsection.keyPoints && subsection.keyPoints.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm text-elec-yellow font-medium mb-2">Key Points:</h4>
                    <ul className="space-y-1 text-sm">
                      {subsection.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-elec-yellow font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseContentSection;
