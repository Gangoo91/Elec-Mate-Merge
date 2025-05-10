
import { CheckCircle } from "lucide-react";
import { CultureModule } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ModuleOverviewTabProps {
  module: CultureModule;
}

const ModuleOverviewTab = ({ module }: ModuleOverviewTabProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <p>{module.content.overview}</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="key-points" className="border-elec-yellow/20 bg-elec-dark/40">
            <AccordionTrigger className="px-4 font-medium">
              Key Points
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ul className="space-y-2">
                {module.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          {module.content.checklist && (
            <AccordionItem value="checklist" className="border-elec-yellow/20 bg-elec-dark/40">
              <AccordionTrigger className="px-4 font-medium">
                Quick Reference Checklist
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="space-y-2">
                  {module.content.checklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border border-elec-yellow/40 flex-shrink-0 mt-0.5"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
        <p>{module.content.overview}</p>
      </div>
      
      <div>
        <h3 className="font-medium text-lg mb-3">Key Points</h3>
        <ul className="space-y-2">
          {module.content.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {module.content.checklist && (
        <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <h3 className="font-medium mb-3">Quick Reference Checklist</h3>
          <ul className="space-y-2">
            {module.content.checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded border border-elec-yellow/40 flex-shrink-0 mt-0.5"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModuleOverviewTab;
