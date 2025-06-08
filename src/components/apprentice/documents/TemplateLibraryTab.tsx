
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Star, Filter, TrendingUp } from "lucide-react";
import DocumentFilters from "./DocumentFilters";
import DocumentCard from "./DocumentCard";
import DocumentPreviewDialog from "./DocumentPreviewDialog";
import { documentTemplates } from "@/data/apprentice/documentTemplates";
import type { DocumentTemplate } from "./DocumentCard";

const TemplateLibraryTab = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const [favourites, setFavourites] = useState<number[]>([]);
  const { toast } = useToast();

  const filteredDocuments = useMemo(() => {
    return documentTemplates.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = documentType === "all" || doc.type === documentType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, documentType]);

  const popularTemplates = useMemo(() => {
    return documentTemplates.slice(0, 3);
  }, []);

  const handlePreview = (document: DocumentTemplate) => {
    setCurrentDocument(document);
    setPreviewOpen(true);
  };

  const handleDownload = (document: DocumentTemplate) => {
    toast({
      title: "Download Started",
      description: `${document.fileName} is downloading...`,
      variant: "default",
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${document.fileName} has been downloaded successfully.`,
        variant: "default",
      });
    }, 1500);
  };

  const handleToggleFavourite = (documentId: number) => {
    setFavourites(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Popular Templates Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Most Popular Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularTemplates.map((template) => (
              <div key={template.id} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  <h4 className="font-medium text-white">{template.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleDownload(template)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Categories Overview */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Template Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: "PDF Form", count: documentTemplates.filter(d => d.type === "PDF Form").length },
              { type: "Word Document", count: documentTemplates.filter(d => d.type === "Word Document").length },
              { type: "Excel Sheet", count: documentTemplates.filter(d => d.type === "Excel Sheet").length },
              { type: "All Templates", count: documentTemplates.length }
            ].map((category) => (
              <div key={category.type} className="text-center p-3 border border-blue-500/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{category.count}</div>
                <div className="text-sm text-muted-foreground">{category.type}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <DocumentFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
      />
      
      {/* Templates Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((template) => (
            <div key={template.id} className="relative">
              <DocumentCard 
                document={template} 
                onPreview={handlePreview} 
                onDownload={handleDownload} 
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 p-1 h-auto"
                onClick={() => handleToggleFavourite(template.id)}
              >
                <Star 
                  className={`h-4 w-4 ${
                    favourites.includes(template.id) 
                      ? 'fill-elec-yellow text-elec-yellow' 
                      : 'text-muted-foreground'
                  }`} 
                />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-elec-yellow/10 p-4 mb-4">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-xl font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            No document templates match your current search criteria
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setDocumentType("all"); }}>
            Reset Filters
          </Button>
        </div>
      )}

      <DocumentPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        document={currentDocument}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default TemplateLibraryTab;
