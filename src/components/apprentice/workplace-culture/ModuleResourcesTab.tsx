
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

  const getResourceColor = (type: string) => {
    switch (type) {
      case "audio": return { bg: "bg-orange-500/10", border: "border-orange-500/20", icon: "bg-orange-500/20 text-orange-400" };
      case "video": return { bg: "bg-red-500/10", border: "border-red-500/20", icon: "bg-red-500/20 text-red-400" };
      case "document": return { bg: "bg-blue-500/10", border: "border-blue-500/20", icon: "bg-blue-500/20 text-blue-400" };
      default: return { bg: "bg-elec-yellow/10", border: "border-elec-yellow/20", icon: "bg-elec-yellow/20 text-elec-yellow" };
    }
  };

  if (!resources || resources.length === 0) {
    return (
      <div className="text-center p-8 rounded-xl bg-white/10 border border-white/10">
        <p className="text-white/60">Resources for this module are coming soon</p>
      </div>
    );
  }

  // Use accordion layout on mobile
  if (isMobile) {
    return (
      <div className="space-y-3 animate-fade-in">
        <Accordion type="single" collapsible className="w-full">
          {resources.map((resource, index) => {
            const colors = getResourceColor(resource.type);
            return (
              <AccordionItem key={index} value={`resource-item-${index}`} className={`${colors.border} bg-gradient-to-br from-elec-gray to-elec-card rounded-xl overflow-hidden mb-2`}>
                <AccordionTrigger className="px-4 font-medium hover:no-underline">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${colors.icon}`}>
                      {resource.type === "audio" && <PlayCircle className="h-3.5 w-3.5" />}
                      {resource.type === "document" && <FileText className="h-3.5 w-3.5" />}
                      {resource.type === "video" && <PlayCircle className="h-3.5 w-3.5" />}
                    </div>
                    <span className="text-sm text-white">{resource.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-sm text-white/70 mb-3">{resource.description}</p>
                  {resource.url ? (
                    <Button size="sm" variant="outline" className="h-9 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Access Resource <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="h-9 border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/10">Download</Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }

  // Regular grid layout for desktop
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
      {resources.map((resource, index) => {
        const colors = getResourceColor(resource.type);
        return (
          <div key={index} className={`p-4 rounded-xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-transform`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${colors.icon} flex-shrink-0`}>
                {resource.type === "audio" && <PlayCircle className="h-4 w-4" />}
                {resource.type === "document" && <FileText className="h-4 w-4" />}
                {resource.type === "video" && <PlayCircle className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white mb-1">{resource.title}</h3>
                <p className="text-sm text-white/70">{resource.description}</p>
                {resource.url ? (
                  <Button size="sm" variant="link" className="p-0 h-auto mt-3 text-elec-yellow hover:text-elec-yellow/80" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Access Resource <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                ) : (
                  <Button size="sm" variant="link" className="p-0 h-auto mt-3 text-elec-yellow hover:text-elec-yellow/80">Download</Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModuleResourcesTab;
