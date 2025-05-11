
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
}

const DownloadResources = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const { toast } = useToast();
  
  // Mock resources data - in a real application, this would come from an API
  const resources: Resource[] = [
    {
      id: "001",
      title: "Safe Isolation Procedures Checklist",
      description: "A detailed checklist for safe isolation of electrical circuits in accordance with HSE guidelines",
      fileType: "PDF",
      fileSize: "1.2 MB",
    },
    {
      id: "002",
      title: "Electrical Safety Risk Assessment Template",
      description: "A comprehensive template for documenting electrical safety risk assessments",
      fileType: "PDF",
      fileSize: "2.3 MB",
    },
    {
      id: "003",
      title: "PPE Selection Guide for Electrical Work",
      description: "Visual guide for selecting appropriate PPE based on the voltage level and work environment",
      fileType: "PDF",
      fileSize: "3.1 MB",
    },
    {
      id: "004",
      title: "Electrical Accident Response Flowchart",
      description: "Step-by-step guide for responding to electrical accidents in the workplace",
      fileType: "PDF",
      fileSize: "1.8 MB",
    }
  ];
  
  const handleDownload = (resource: Resource) => {
    // In a real application, this would initiate an actual file download
    // For now, we'll just show a toast notification
    toast({
      title: "Download Started",
      description: `${resource.title} (${resource.fileSize}) is downloading...`,
    });
    
    setSelectedResource(null);
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
        <Download className="h-6 w-6 mr-2" />
        Electrical Safety Resources
      </h3>
      
      <p className="mb-4 text-elec-light/90">
        Access and download valuable resources for working safely with electrical systems. 
        These documents provide additional guidance and templates to help implement the safety 
        procedures described in this section.
      </p>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Resources
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Safety Resources</DialogTitle>
            <DialogDescription>
              Select a resource to download
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-auto">
            {resources.map((resource) => (
              <div 
                key={resource.id} 
                className="flex items-start p-3 border border-elec-yellow/10 rounded-md bg-elec-dark/20 hover:bg-elec-dark/40 cursor-pointer transition-colors"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="p-2 rounded bg-elec-yellow/10 mr-3">
                  <FileText className="h-6 w-6 text-elec-yellow" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{resource.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{resource.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-[10px] font-medium">{resource.fileType}</span>
                    <span className="ml-2">{resource.fileSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline" className="sm:mt-0">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={() => selectedResource && handleDownload(selectedResource)}
              disabled={!selectedResource}
              className="mt-2 sm:mt-0"
            >
              <Download className="h-4 w-4 mr-2" />
              {selectedResource ? `Download ${selectedResource.fileType}` : 'Select a resource'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DownloadResources;
