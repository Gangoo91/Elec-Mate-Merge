
import { PlayCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CultureModule } from "./types";

interface ModuleResourcesTabProps {
  module: CultureModule;
}

const ModuleResourcesTab = ({ module }: ModuleResourcesTabProps) => {
  const { resources } = module.content;

  if (!resources || resources.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Resources for this module are coming soon</p>
      </div>
    );
  }

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
            <Button variant="link" className="p-0 h-auto mt-2 text-elec-yellow">Download</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleResourcesTab;
