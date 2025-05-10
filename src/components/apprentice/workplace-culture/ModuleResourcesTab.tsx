
import { PlayCircle, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CultureModule } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ModuleResourcesTabProps {
  module: CultureModule;
}

const ModuleResourcesTab = ({ module }: ModuleResourcesTabProps) => {
  const { resources } = module.content;
  const isMobile = useIsMobile();

  if (!resources || resources.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Resources for this module are coming soon</p>
      </div>
    );
  }

  // Use accordion layout on mobile
  if (isMobile) {
    return (
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {resources.map((resource, index) => (
            <AccordionItem key={index} value={`resource-item-${index}`} className="border-elec-yellow/20 bg-elec-dark/40">
              <AccordionTrigger className="px-4 font-medium flex items-center">
                <span className="mr-2">
                  {resource.type === "audio" && <PlayCircle className="h-5 w-5 text-elec-yellow inline mr-2" />}
                  {resource.type === "document" && <FileText className="h-5 w-5 text-elec-yellow inline mr-2" />}
                  {resource.type === "video" && <PlayCircle className="h-5 w-5 text-elec-yellow inline mr-2" />}
                </span>
                {resource.title}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="text-sm text-elec-light/80 mb-2">{resource.description}</p>
                {resource.url ? (
                  <Button variant="link" className="p-0 h-auto text-elec-yellow flex items-center" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Access Resource <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button variant="link" className="p-0 h-auto text-elec-yellow">Download</Button>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  // Regular grid layout for desktop
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource, index) => (
        <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20 flex items-start gap-3">
          {resource.type === "audio" && <PlayCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />}
          {resource.type === "document" && <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />}
          {resource.type === "video" && <PlayCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />}
          <div>
            <h3 className="font-medium mb-1">{resource.title}</h3>
            <p className="text-sm text-elec-light/80">{resource.description}</p>
            {resource.url ? (
              <Button variant="link" className="p-0 h-auto mt-2 text-elec-yellow flex items-center" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Access Resource <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button variant="link" className="p-0 h-auto mt-2 text-elec-yellow">Download</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleResourcesTab;
