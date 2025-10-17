import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

interface MobilePDFDownloadSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadCombined: () => void;
  onDownloadRAMS: () => void;
  onDownloadMethod: () => void;
  isGenerating: boolean;
}

export const MobilePDFDownloadSheet: React.FC<MobilePDFDownloadSheetProps> = ({
  open,
  onOpenChange,
  onDownloadCombined,
  onDownloadRAMS,
  onDownloadMethod,
  isGenerating
}) => {
  const handleDownload = (downloadFn: () => void) => {
    downloadFn();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="text-left pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </SheetTitle>
          <SheetDescription>
            Choose which document you'd like to download
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-3 pb-6">
          <Button
            onClick={() => handleDownload(onDownloadCombined)}
            disabled={isGenerating}
            className="w-full h-auto py-4 flex flex-col items-start gap-2"
            variant="default"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="bg-primary-foreground/20 p-2 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Combined RAMS</div>
                <div className="text-xs opacity-90 font-normal">
                  Full document with RAMS and Method Statement
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 opacity-50" />
            </div>
          </Button>

          <Button
            onClick={() => handleDownload(onDownloadRAMS)}
            disabled={isGenerating}
            className="w-full h-auto py-4 flex flex-col items-start gap-2"
            variant="outline"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">RAMS Only</div>
                <div className="text-xs text-muted-foreground font-normal">
                  Risk Assessment document only
                </div>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => handleDownload(onDownloadMethod)}
            disabled={isGenerating}
            className="w-full h-auto py-4 flex flex-col items-start gap-2"
            variant="outline"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">Method Statement Only</div>
                <div className="text-xs text-muted-foreground font-normal">
                  Work method procedures only
                </div>
              </div>
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
