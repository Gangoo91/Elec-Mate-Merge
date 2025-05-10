
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { DocumentTemplate } from "./DocumentCard";

interface DocumentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: DocumentTemplate | null;
  onDownload: (document: DocumentTemplate) => void;
}

const DocumentPreviewDialog = ({ open, onOpenChange, document, onDownload }: DocumentPreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{document?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full min-h-[60vh] bg-elec-dark rounded-md flex items-center justify-center">
          {document ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <FileText className="w-16 h-16 text-elec-yellow mx-auto mb-2" />
                <h3 className="text-xl font-medium">{document.fileName}</h3>
                <p className="text-muted-foreground">{document.type}</p>
              </div>
              <p className="text-muted-foreground mb-6">
                Document preview would display here. In a production environment, this would render a PDF or document preview.
              </p>
              <Button 
                variant="default" 
                className="flex gap-1 items-center"
                onClick={() => document && onDownload(document)}
              >
                <Download className="h-4 w-4" />
                Download Document
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreviewDialog;
