
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Edit, Clock, Shield, Star } from "lucide-react";
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
import TemplateSearch, { TemplateFilters } from "./TemplateSearch";

const DocumentTemplates = () => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<DocumentTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<TemplateFilters>({
    category: "all",
    difficulty: "all",
    ukSpecific: false,
    regulationCompliant: "all"
  });
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = DocumentTemplateService.getTemplateCategories();

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templatesData = await DocumentTemplateService.getTemplates();
        setTemplates(templatesData);
        setFilteredTemplates(templatesData);
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

  // Filter templates based on search and filters
  const applyFilters = useMemo(() => {
    let result = templates;

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter(template => template.category === filters.category);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query)
      );
    }

    // Apply difficulty filter
    if (filters.difficulty !== "all") {
      result = result.filter(template => template.difficulty === filters.difficulty);
    }

    // Apply UK specific filter
    if (filters.ukSpecific) {
      result = result.filter(template => template.ukSpecific);
    }

    // Apply regulation compliance filter
    if (filters.regulationCompliant !== "all") {
      result = result.filter(template => 
        template.regulationCompliant?.includes(filters.regulationCompliant)
      );
    }

    return result;
  }, [templates, searchQuery, filters]);

  useEffect(() => {
    setFilteredTemplates(applyFilters);
  }, [applyFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: TemplateFilters) => {
    setFilters(newFilters);
  };

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

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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
      {/* Search and Filters */}
      <TemplateSearch
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        totalCount={templates.length}
        filteredCount={filteredTemplates.length}
      />

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex flex-wrap">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.label}
              <Badge variant="outline" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base leading-tight">{template.name}</CardTitle>
                        {template.ukSpecific && (
                          <Badge variant="outline" className="ml-2 text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">
                            UK
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {template.fileType} • {template.estimatedTime || "Variable time"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>

                    {/* Template Metadata */}
                    <div className="flex flex-wrap gap-2">
                      {template.difficulty && (
                        <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                          {template.difficulty}
                        </Badge>
                      )}
                      {template.regulationCompliant && template.regulationCompliant.length > 0 && (
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                          <Shield className="h-3 w-3 mr-1" />
                          Compliant
                        </Badge>
                      )}
                    </div>

                    {/* Regulation Compliance */}
                    {template.regulationCompliant && template.regulationCompliant.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Compliant with:</strong> {template.regulationCompliant.slice(0, 2).join(", ")}
                        {template.regulationCompliant.length > 2 && ` +${template.regulationCompliant.length - 2} more`}
                      </div>
                    )}

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
                {searchQuery || Object.values(filters).some(f => f && f !== "all") 
                  ? "Try adjusting your search or filters." 
                  : "There are no templates available in this category yet."
                }
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTemplate?.name}
              {selectedTemplate?.ukSpecific && (
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  UK Specific
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Template Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Difficulty:</strong> {selectedTemplate?.difficulty || "Not specified"}
              </div>
              <div>
                <strong>Est. Time:</strong> {selectedTemplate?.estimatedTime || "Variable"}
              </div>
            </div>

            {/* Regulation Compliance */}
            {selectedTemplate?.regulationCompliant && selectedTemplate.regulationCompliant.length > 0 && (
              <div className="text-sm">
                <strong>Compliant with:</strong>
                <ul className="list-disc list-inside mt-1 text-muted-foreground">
                  {selectedTemplate.regulationCompliant.map((reg, index) => (
                    <li key={index}>{reg}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview Placeholder */}
            <div className="flex justify-center items-center p-6 border rounded-md bg-elec-dark">
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-16 w-16 text-elec-yellow opacity-70" />
                <p className="text-sm">Preview not available in development mode</p>
                <p className="text-xs text-muted-foreground">
                  Template contains {selectedTemplate?.fields?.length || 0} customizable fields
                </p>
              </div>
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
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Custom Template Builder
          </CardTitle>
          <CardDescription>
            Create and customize your own document templates with your branding and specific requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled>
            <Clock className="h-4 w-4 mr-2" />
            Launch Template Builder (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentTemplates;
