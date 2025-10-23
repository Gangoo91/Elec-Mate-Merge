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
  isGenerating: boolean;
}

export const MobilePDFDownloadSheet: React.FC<MobilePDFDownloadSheetProps> = ({
  open,
  onOpenChange,
  onDownloadCombined,
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
            Download your complete RAMS document
          </SheetDescription>
        </SheetHeader>

        <div className="pb-6">
          <Button
            onClick={() => handleDownload(onDownloadCombined)}
            disabled={isGenerating}
            className="w-full h-auto py-4 flex flex-col items-start gap-2"
            variant="default"
            size="lg"
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
