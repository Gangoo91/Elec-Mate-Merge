
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Loader2, Mail } from 'lucide-react';

interface PDFExportProgressProps {
  isOpen: boolean;
  onClose: () => void;
  exportType: 'observations' | 'complete' | null;
  progress: number;
  status: 'preparing' | 'generating' | 'complete' | 'error';
  formData?: any;
  onEmailClick?: () => void;
}

const PDFExportProgress = ({ 
  isOpen, 
  onClose, 
  exportType, 
  progress, 
  status,
  formData,
  onEmailClick
}: PDFExportProgressProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (status === 'complete') {
      setDisplayProgress(100);
      // Only auto-close if no email option available
      if (!onEmailClick) {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, status, onClose, onEmailClick]);

  const getStatusText = () => {
    switch (status) {
      case 'preparing':
        return 'Preparing document data...';
      case 'generating':
        return 'Generating PDF document...';
      case 'complete':
        return 'PDF generated successfully!';
      case 'error':
        return 'An error occurred while generating the PDF.';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'error':
        return <FileText className="h-8 w-8 text-red-600" />;
      default:
        return <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            Exporting {exportType === 'complete' ? 'Complete EICR' : 'Observations'} to PDF
          </DialogTitle>
          <DialogDescription>
            {getStatusText()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Progress 
            value={displayProgress} 
            className="w-full" 
          />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {displayProgress}% Complete
            </p>
          </div>
          
          {status === 'complete' && (
            <div className="text-center text-sm text-green-600">
              Your PDF has been downloaded successfully!
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center text-sm text-red-600">
              Please try again or contact support if the problem persists.
            </div>
          )}
        </div>

        {status === 'complete' && onEmailClick && formData && (
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onEmailClick} className="bg-elec-blue hover:bg-elec-blue/90">
              <Mail className="h-4 w-4 mr-2" />
              Email to Client
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PDFExportProgress;
