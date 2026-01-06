
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
      <div className="space-y-4 animate-fade-in">
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <p className="text-white/80">{module.content.overview}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="key-points" className="border-green-500/20 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl overflow-hidden mb-2">
            <AccordionTrigger className="px-4 font-medium text-green-400 hover:no-underline">
              Key Points
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ul className="space-y-2">
                {module.content.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {module.content.checklist && (
            <AccordionItem value="checklist" className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl overflow-hidden">
              <AccordionTrigger className="px-4 font-medium text-elec-yellow hover:no-underline">
                Quick Reference Checklist
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="space-y-2">
                  {module.content.checklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                      <div className="w-4 h-4 rounded border-2 border-elec-yellow/40 flex-shrink-0 mt-0.5"></div>
                      <span className="text-sm text-white/80">{item}</span>
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
    <div className="space-y-4 animate-fade-in">
      <div className="p-5 rounded-xl bg-white/10 border border-white/10">
        <p className="text-white/80">{module.content.overview}</p>
      </div>

      <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20">
        <h3 className="font-semibold text-green-400 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Key Points
        </h3>
        <ul className="space-y-3">
          {module.content.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/10 border border-white/5">
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/80">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {module.content.checklist && (
        <div className="p-5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
          <h3 className="font-semibold text-elec-yellow mb-4">Quick Reference Checklist</h3>
          <ul className="space-y-3">
            {module.content.checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/10 border border-white/5">
                <div className="w-5 h-5 rounded border-2 border-elec-yellow/40 flex-shrink-0 mt-0.5"></div>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModuleOverviewTab;
