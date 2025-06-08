
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";

export interface DocumentTemplate {
  id: number;
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  previewUrl: string;
  fileName: string;
}

interface DocumentCardProps {
  document: DocumentTemplate;
  onPreview: (document: DocumentTemplate) => void;
  onDownload: (document: DocumentTemplate) => void;
}

const DocumentCard = ({ document, onPreview, onDownload }: DocumentCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-elec-yellow/10">
            <FileText className="h-6 w-6 text-elec-yellow" />
          </div>
          <CardTitle className="text-lg">{document.title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{document.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Document Type:</span> {document.type}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1 items-center"
            onClick={() => onPreview(document)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            className="flex gap-1 items-center"
            onClick={() => onDownload(document)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
