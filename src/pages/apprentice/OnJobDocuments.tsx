
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { documentTemplates } from "@/data/apprentice/documentTemplates";
import DocumentCard from "@/components/apprentice/documents/DocumentCard";
import DocumentPreviewDialog from "@/components/apprentice/documents/DocumentPreviewDialog";
import DocumentFilters from "@/components/apprentice/documents/DocumentFilters";
import type { DocumentTemplate } from "@/components/apprentice/documents/DocumentCard";

const OnJobDocuments = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [documentType, setDocumentType] = useState("all");
  const { toast } = useToast();

  // Filter documents based on search query and type
  const filteredDocuments = useMemo(() => {
    return documentTemplates.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = documentType === "all" || doc.type === documentType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, documentType]);

  const handlePreview = (document: DocumentTemplate) => {
    setCurrentDocument(document);
    setPreviewOpen(true);
  };

  const handleDownload = (document: DocumentTemplate) => {
    // In a real application, this would trigger a download
    // For now, we'll just show a toast notification
    toast({
      title: "Download Started",
      description: `${document.fileName} is downloading...`,
      variant: "default",
    });
    
    // This would be replaced with actual download logic in a production app
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${document.fileName} has been downloaded successfully.`,
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation Templates</h1>
          <p className="text-muted-foreground mt-1">
            Download standardised templates for electrical work documentation
          </p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to On-Job Tools
          </Button>
        </Link>
      </div>

      {/* Filter section */}
      <DocumentFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
      />
      
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((template) => (
            <DocumentCard 
              key={template.id} 
              document={template} 
              onPreview={handlePreview} 
              onDownload={handleDownload} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-elec-yellow/10 p-4 mb-4">
            <Search className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-xl font-medium mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">
            No document templates match your current search criteria
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setDocumentType("all"); }}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Document Preview Dialog */}
      <DocumentPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        document={currentDocument}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default OnJobDocuments;
