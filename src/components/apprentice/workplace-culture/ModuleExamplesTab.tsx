
import { CultureModule } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ModuleExamplesTabProps {
  module: CultureModule;
}

const ModuleExamplesTab = ({ module }: ModuleExamplesTabProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {module.content.examples.map((example, index) => (
            <AccordionItem key={index} value={`example-item-${index}`} className="border-elec-yellow/20 bg-elec-dark/40">
              <AccordionTrigger className="px-4 font-medium">
                Situation: {example.situation}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  <div className="pl-4 border-l-2 border-green-500">
                    <p className="text-sm text-green-400 mb-1">Effective Approach:</p>
                    <p className="text-elec-light/90">{example.rightApproach}</p>
                  </div>
                  <div className="pl-4 border-l-2 border-red-500">
                    <p className="text-sm text-red-400 mb-1">Less Effective Approach:</p>
                    <p className="text-elec-light/90">{example.wrongApproach}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {module.content.examples.map((example, index) => (
        <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <h4 className="font-medium mb-2">Situation: {example.situation}</h4>
          <div className="space-y-3 mt-4">
            <div className="pl-4 border-l-2 border-green-500">
              <p className="text-sm text-green-400 mb-1">Effective Approach:</p>
              <p className="text-elec-light/90">{example.rightApproach}</p>
            </div>
            <div className="pl-4 border-l-2 border-red-500">
              <p className="text-sm text-red-400 mb-1">Less Effective Approach:</p>
              <p className="text-elec-light/90">{example.wrongApproach}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleExamplesTab;
