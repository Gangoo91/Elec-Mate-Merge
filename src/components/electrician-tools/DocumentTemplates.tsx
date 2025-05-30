
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentTemplate, DocumentTemplateService } from "@/services/documentTemplateService";
import DocumentGenerator from "./DocumentGenerator";

const DocumentTemplates = () => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templatesData = await DocumentTemplateService.getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        toast({
          title: "Error Loading Templates",
          description: "Failed to load document templates.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleDownloadTemplate = async (template: DocumentTemplate) => {
    try {
      await DocumentTemplateService.downloadTemplate(template.id);
      toast({
        title: "Download Started",
        description: `${template.name} template is downloading.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download template.",
        variant: "destructive"
      });
    }
  };

  const handlePreview = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleGenerateDocument = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setShowGenerator(true);
  };

  const filteredTemplates = activeTab === "all" 
    ? templates 
    : templates.filter(template => template.category === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <FileText className="h-12 w-12 text-elec-yellow/50 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

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
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>
                        {template.fileType} • Editable
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Last updated: {template.lastUpdated}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreview(template)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadTemplate(template)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" /> Download
                      </Button>
                      <Button 
                        size="sm" 
                        className="col-span-2"
                        onClick={() => handleGenerateDocument(template)}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" /> Create Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
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

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center p-6 border rounded-md bg-elec-dark">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-16 w-16 text-elec-yellow opacity-70" />
              <p className="text-sm">Preview not available in development mode</p>
              <p className="text-xs text-muted-foreground">
                Template contains {selectedTemplate?.fields?.length || 0} customizable fields
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowPreview(false);
              if (selectedTemplate) handleGenerateDocument(selectedTemplate);
            }}>
              <Edit className="h-4 w-4 mr-2" /> Create Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Generator Dialog */}
      <Dialog open={showGenerator} onOpenChange={setShowGenerator}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTemplate && (
            <DocumentGenerator 
              template={selectedTemplate}
              onClose={() => setShowGenerator(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Custom Template Builder Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Custom Template Builder</CardTitle>
          <CardDescription>
            Create and customize your own document templates with your branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled>
            Launch Template Builder (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentTemplates;
