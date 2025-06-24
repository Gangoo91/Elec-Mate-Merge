
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, FileText, Download, Eye, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  dateAdded: string;
  category: string;
}

const FavouritesTab = () => {
  const [favouriteDocuments, setFavouriteDocuments] = useState<PersonalDocument[]>([
    {
      id: 1,
      name: "Electrical Installation Certificate",
      type: "PDF",
      size: "2.4 MB",
      dateAdded: "2024-01-15",
      category: "Certificates"
    },
    {
      id: 2,
      name: "Risk Assessment Template",
      type: "PDF",
      size: "1.8 MB",
      dateAdded: "2024-01-10",
      category: "Safety"
    },
    {
      id: 3,
      name: "Site Inspection Form",
      type: "PDF",
      size: "1.2 MB",
      dateAdded: "2024-01-08",
      category: "Inspections"
    }
  ]);

  const { toast } = useToast();

  const handleDownload = (document: PersonalDocument) => {
    toast({
      title: "Download Started",
      description: `${document.name} is downloading...`,
      variant: "default",
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${document.name} has been downloaded successfully.`,
        variant: "default",
      });
    }, 1500);
  };

  const handleRemoveFavourite = (documentId: number) => {
    setFavouriteDocuments(prev => prev.filter(doc => doc.id !== documentId));
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
              <div className="text-sm text-muted-foreground">Favourite Documents</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {new Set(favouriteDocuments.map(d => d.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Document Categories</div>
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
          {favouriteDocuments.map((document) => (
            <Card key={document.id} className="border-elec-yellow/20 bg-elec-gray relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    <CardTitle className="text-sm text-white">{document.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Star className="h-4 w-4 fill-elec-yellow text-elec-yellow" />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-1 h-auto"
                      onClick={() => handleRemoveFavourite(document.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  <p>Type: {document.type} • Size: {document.size}</p>
                  <p>Added: {new Date(document.dateAdded).toLocaleDateString()}</p>
                  <p>Category: {document.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(document)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-elec-yellow/10 p-4 mb-4">
            <Star className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-xl font-medium mb-2">No favourites yet</h3>
          <p className="text-muted-foreground mb-4">
            Star your most important documents for quick access
          </p>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavouritesTab;
