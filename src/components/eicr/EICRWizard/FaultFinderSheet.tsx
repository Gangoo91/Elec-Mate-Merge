import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Sparkles } from 'lucide-react';
import DiagnosticWizard from '@/components/fault-finding/DiagnosticWizard';

interface FaultFinderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Bottom sheet wrapper for the AI Fault Finder (DiagnosticWizard)
 * Provides a mobile-friendly way to access fault diagnosis from within the EICR wizard
 */
export const FaultFinderSheet: React.FC<FaultFinderSheetProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader className="text-left pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <SheetTitle className="flex items-center gap-2">
                AI Fault Finder
                <Badge className="bg-primary/10 text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </SheetTitle>
              <SheetDescription>
                Answer questions to diagnose electrical faults
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6">
          <DiagnosticWizard />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FaultFinderSheet;
