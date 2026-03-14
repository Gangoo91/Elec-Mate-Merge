import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Loader2, Mail } from 'lucide-react';

interface PDFExportProgressProps {
  isOpen: boolean;
  onClose: () => void;
  exportType: 'observations' | 'complete' | null;
  progress: number;
  status: 'preparing' | 'generating' | 'complete' | 'error';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: any;
  onEmailClick?: () => void;
  certificateType?: string;
}

const PDFExportProgress = ({
  isOpen,
  onClose,
  exportType,
  progress,
  status,
  formData,
  onEmailClick,
  certificateType = 'EICR',
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
      <DialogContent className="sm:max-w-sm bg-[#1a1f2e] border border-white/10 rounded-2xl p-0 overflow-hidden">
        <div className="flex flex-col items-center px-6 pt-8 pb-6 space-y-5">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            status === 'complete' ? 'bg-green-500/15' : status === 'error' ? 'bg-red-500/15' : 'bg-yellow-500/15'
          }`}>
            {status === 'complete' ? (
              <CheckCircle className="h-7 w-7 text-green-400" />
            ) : status === 'error' ? (
              <FileText className="h-7 w-7 text-red-400" />
            ) : (
              <Loader2 className="h-7 w-7 text-yellow-400 animate-spin" />
            )}
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h3 className="text-base font-semibold text-white">
              {status === 'complete' ? 'PDF Ready' : status === 'error' ? 'Export Failed' : `Exporting ${certificateType}`}
            </h3>
            <p className="text-sm text-white">{getStatusText()}</p>
          </div>

          {/* Progress bar */}
          {status !== 'complete' && status !== 'error' && (
            <div className="w-full space-y-2">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
              <p className="text-xs text-white text-center">{displayProgress}%</p>
            </div>
          )}

          {status === 'error' && (
            <p className="text-sm text-red-400 text-center">
              Please try again or contact support if the problem persists.
            </p>
          )}
        </div>

        {/* Action buttons */}
        {status === 'complete' && onEmailClick && formData && (
          <div className="border-t border-white/10 px-6 py-4 flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 touch-manipulation rounded-xl border-white/20 text-white hover:bg-white/5"
            >
              Close
            </Button>
            <Button
              onClick={onEmailClick}
              className="flex-1 h-11 touch-manipulation rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Client
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PDFExportProgress;
