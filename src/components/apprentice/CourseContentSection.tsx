
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, Info, Construction, HardHat, AlertTriangle } from "lucide-react";

interface ContentSectionProps {
  title: string;
  description: string;
  keyPoints?: string[];
  icon?: "safety" | "info" | "construction" | "warning" | "hardhat";
}

const CourseContentSection = ({ title, description, keyPoints = [], icon = "info" }: ContentSectionProps) => {
  // Select the appropriate icon based on the icon prop
  const IconComponent = 
    icon === "safety" ? Shield :
    icon === "construction" ? Construction :
    icon === "warning" ? AlertTriangle :
    icon === "hardhat" ? HardHat : Info;
  
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 mt-1">
          <IconComponent className="h-6 w-6 text-elec-yellow" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
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
    </div>
  );
};

export default CourseContentSection;
