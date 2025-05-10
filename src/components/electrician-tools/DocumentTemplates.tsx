
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type DocumentType = {
  name: string;
  fileType: string;
  category: "invoicing" | "certification" | "reporting" | "contracts";
  lastUpdated: string;
  description: string;
};

const documentTypes: DocumentType[] = [
  { 
    name: "Invoice Template", 
    fileType: "PDF", 
    category: "invoicing",
    lastUpdated: "May 2023",
    description: "Standard invoice template with itemized billing and payment details."
  },
  { 
    name: "Job Estimate", 
    fileType: "Word", 
    category: "invoicing",
    lastUpdated: "June 2023",
    description: "Detailed job estimation template with breakdown of materials and labor."
  },
  { 
    name: "Client Contract", 
    fileType: "PDF", 
    category: "contracts",
    lastUpdated: "April 2023",
    description: "Legal contract template for electrical work agreements with clients."
  },
  { 
    name: "Electrical Test Report", 
    fileType: "Excel", 
    category: "reporting",
    lastUpdated: "May 2023",
    description: "Comprehensive electrical testing report with results documentation."
  },
  { 
    name: "EICR Template", 
    fileType: "PDF", 
    category: "certification",
    lastUpdated: "July 2023",
    description: "Electrical Installation Condition Report template with industry standard checks."
  },
  { 
    name: "Material List", 
    fileType: "Excel", 
    category: "reporting",
    lastUpdated: "June 2023",
    description: "Material inventory and pricing list template for tracking project resources."
  },
  { 
    name: "Minor Works Certificate", 
    fileType: "PDF", 
    category: "certification",
    lastUpdated: "March 2023",
    description: "Certificate for minor electrical works in accordance with BS 7671."
  },
  { 
    name: "Domestic Installation Certificate", 
    fileType: "PDF", 
    category: "certification",
    lastUpdated: "April 2023",
    description: "Residential electrical installation certification template."
  }
];

const DocumentTemplates = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);

  const handleDownload = (docName: string) => {
    toast({
      title: "Download Started",
      description: `${docName} is downloading.`,
    });
  };

  const filteredDocuments = activeTab === "all" 
    ? documentTypes 
    : documentTypes.filter(doc => doc.category === activeTab);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
          <TabsTrigger value="certification">Certification</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc, i) => (
              <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-base">{doc.name}</CardTitle>
                      <CardDescription>
                        {doc.fileType} • Editable
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-xs text-muted-foreground">
                      Last updated: {doc.lastUpdated}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{selectedDocument?.name}</DialogTitle>
                            <DialogDescription>
                              {selectedDocument?.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-center items-center p-6 border rounded-md bg-elec-dark">
                            <div className="flex flex-col items-center gap-2">
                              <FileText className="h-16 w-16 text-elec-yellow opacity-70" />
                              <p className="text-sm">Preview not available in development mode</p>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              onClick={() => handleDownload(selectedDocument?.name || "")}
                              className="w-full sm:w-auto"
                            >
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(doc.name)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-20 bg-elec-gray/30 rounded-lg border border-elec-yellow/10">
              <FileText className="h-12 w-12 text-elec-yellow/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground">
                There are no templates available in this category yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Custom Template Builder</CardTitle>
          <CardDescription>
            Create and customize your own document templates with your branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Launch Template Builder</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentTemplates;
