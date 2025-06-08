
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Trash2, Edit, Share, FolderOpen } from "lucide-react";

interface UserDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  lastModified: string;
  category: string;
}

const MyDocumentsTab = () => {
  const [documents, setDocuments] = useState<UserDocument[]>([
    {
      id: 1,
      name: "Site_Safety_Assessment_Project_A.pdf",
      type: "PDF",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-15",
      category: "Safety"
    },
    {
      id: 2,
      name: "Electrical_Test_Results_Office_Block.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadDate: "2024-01-12",
      lastModified: "2024-01-14",
      category: "Testing"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc: UserDocument = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.split('/')[1]?.toUpperCase() || 'Unknown',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          lastModified: new Date().toISOString().split('T')[0],
          category: "General"
        };
        setDocuments(prev => [...prev, newDoc]);
      });
      
      toast({
        title: "Upload Successful",
        description: `${files.length} file(s) uploaded successfully.`,
        variant: "default",
      });
    }
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "Document has been removed from your collection.",
      variant: "default",
    });
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-elec-yellow/30 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload your documents</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Storage Overview */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Storage Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{documents.length}</div>
              <div className="text-sm text-muted-foreground">Total Documents</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0).toFixed(1)} MB
              </div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
            <div className="text-center p-3 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">2.5 GB</div>
              <div className="text-sm text-muted-foreground">Available Space</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search your documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-elec-dark border-elec-yellow/20"
        />
      </div>

      {/* Documents List */}
      {filteredDocuments.length > 0 ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-elec-yellow/10">
                      <FileText className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Rename
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-elec-yellow/10 p-4 mb-4">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-xl font-medium mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">
            Upload your first document to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default MyDocumentsTab;
