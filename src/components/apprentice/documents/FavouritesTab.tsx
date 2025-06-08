
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, FileText, Download, Eye, Trash2 } from "lucide-react";
import { documentTemplates } from "@/data/apprentice/documentTemplates";
import DocumentCard from "./DocumentCard";
import DocumentPreviewDialog from "./DocumentPreviewDialog";
import { useToast } from "@/hooks/use-toast";
import type { DocumentTemplate } from "./DocumentCard";

const FavouritesTab = () => {
  const [favouriteIds, setFavouriteIds] = useState<number[]>([1, 3, 5]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<DocumentTemplate | null>(null);
  const { toast } = useToast();

  const favouriteDocuments = documentTemplates.filter(doc => 
    favouriteIds.includes(doc.id)
  );

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

  const handleRemoveFavourite = (documentId: number) => {
    setFavouriteIds(prev => prev.filter(id => id !== documentId));
    toast({
      title: "Removed from Favourites",
      description: "Document has been removed from your favourites.",
      variant: "default",
    });
  };

  const quickAccessDocuments = [
    { name: "Electrical Installation Certificate", category: "Certificates", lastUsed: "2 days ago" },
    { name: "Risk Assessment Template", category: "Safety", lastUsed: "1 week ago" },
    { name: "Site Inspection Form", category: "Inspections", lastUsed: "3 days ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Access Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Star className="h-5 w-5" />
            Quick Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickAccessDocuments.map((doc, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  <h4 className="font-medium text-white">{doc.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{doc.category}</p>
                <p className="text-xs text-elec-yellow">Last used {doc.lastUsed}</p>
                <Button size="sm" className="mt-2 w-full">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favourites Statistics */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Star className="h-5 w-5" />
            Favourites Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{favouriteDocuments.length}</div>
              <div className="text-sm text-muted-foreground">Favourite Templates</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {new Set(favouriteDocuments.map(d => d.type)).size}
              </div>
              <div className="text-sm text-muted-foreground">Document Types</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">24</div>
              <div className="text-sm text-muted-foreground">Downloads This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Favourite Documents */}
      {favouriteDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteDocuments.map((template) => (
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
                onClick={() => handleRemoveFavourite(template.id)}
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
              <div className="absolute top-2 left-2">
                <Star className="h-4 w-4 fill-elec-yellow text-elec-yellow" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-elec-yellow/10 p-4 mb-4">
            <Star className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-xl font-medium mb-2">No favourites yet</h3>
          <p className="text-muted-foreground mb-4">
            Star your most-used templates for quick access
          </p>
          <Button variant="outline">
            Browse Templates
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

export default FavouritesTab;
