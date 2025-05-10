
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
      <div className="text-center p-8">
        <p className="text-muted-foreground">FAQ content for this module is coming soon</p>
      </div>
    );
  }

  // Use accordion layout on mobile, regular layout on desktop
  if (isMobile) {
    return (
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`faq-item-${index}`} className="border-elec-yellow/20 bg-elec-dark/40">
              <AccordionTrigger className="px-4 text-elec-yellow font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-elec-light/90">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  // Regular layout for desktop
  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <h4 className="font-medium text-elec-yellow mb-2">{item.question}</h4>
          <p className="text-elec-light/90">{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default ModuleFAQTab;
