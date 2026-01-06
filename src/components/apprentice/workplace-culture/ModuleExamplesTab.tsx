
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
      <div className="space-y-3 animate-fade-in">
        <Accordion type="single" collapsible className="w-full">
          {module.content.examples.map((example, index) => (
            <AccordionItem key={index} value={`example-item-${index}`} className="border-blue-500/20 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl overflow-hidden mb-2">
              <AccordionTrigger className="px-4 font-medium text-blue-400 hover:no-underline text-left">
                <span className="text-sm">Situation: {example.situation}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs font-medium text-green-400 mb-2">Effective Approach:</p>
                    <p className="text-sm text-white/80">{example.rightApproach}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-xs font-medium text-red-400 mb-2">Less Effective Approach:</p>
                    <p className="text-sm text-white/80">{example.wrongApproach}</p>
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
    <div className="space-y-4 animate-fade-in">
      {module.content.examples.map((example, index) => (
        <div key={index} className="p-5 rounded-xl bg-white/10 border border-white/10">
          <h4 className="font-semibold text-blue-400 mb-4">Situation: {example.situation}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">Effective Approach:</p>
              <p className="text-white/80">{example.rightApproach}</p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Less Effective Approach:</p>
              <p className="text-white/80">{example.wrongApproach}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleExamplesTab;
