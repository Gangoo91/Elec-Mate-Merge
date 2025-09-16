import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Image } from "lucide-react";

interface FileViewerProps {
  fileName: string;
  fileUrl: string;
  fileType?: string;
  trigger?: React.ReactNode;
}

const FileViewer = ({ fileName, fileUrl, fileType, trigger }: FileViewerProps) => {
  const [open, setOpen] = useState(false);
  
  const getFileIcon = () => {
    if (!fileType) return <FileText className="h-4 w-4" />;
    
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType === 'application/pdf') return <FileText className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  const renderFilePreview = () => {
    if (!fileType) {
      return (
        <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Preview not available</p>
          </div>
        </div>
      );
    }

    if (fileType.startsWith('image/')) {
      return (
        <div className="flex justify-center">
          <img 
            src={fileUrl} 
            alt={fileName}
            className="max-w-full max-h-96 object-contain rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    }

    if (fileType === 'application/pdf') {
      return (
        <div className="h-96">
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            className="rounded-lg border"
            title={fileName}
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <div className="text-center">
          <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {fileName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Preview not available for this file type
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-2"
        >
          <Eye className="h-3 w-3" />
          View
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getFileIcon()}
              {fileName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {renderFilePreview()}
            
            <div className="flex justify-end">
              <Button onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileViewer;