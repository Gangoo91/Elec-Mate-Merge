
import { CultureModule } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ModuleFAQTabProps {
  module: CultureModule;
}

const ModuleFAQTab = ({ module }: ModuleFAQTabProps) => {
  const { questions } = module.content;
  const isMobile = useIsMobile();

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-8 rounded-xl bg-white/10 border border-white/10">
        <p className="text-white/60">FAQ content for this module is coming soon</p>
      </div>
    );
  }

  // Use accordion layout on mobile, regular layout on desktop
  if (isMobile) {
    return (
      <div className="space-y-3 animate-fade-in">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`faq-item-${index}`} className="border-purple-500/20 bg-gradient-to-br from-elec-gray to-elec-card rounded-xl overflow-hidden mb-2">
              <AccordionTrigger className="px-4 text-purple-400 font-medium hover:no-underline text-left">
                <span className="text-sm">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm text-white/80">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  // Regular layout for desktop
  return (
    <div className="space-y-4 animate-fade-in">
      {questions.map((item, index) => (
        <div key={index} className="p-5 rounded-xl bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all">
          <h4 className="font-semibold text-purple-400 mb-3">{item.question}</h4>
          <p className="text-white/80">{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default ModuleFAQTab;
