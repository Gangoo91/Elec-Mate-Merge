
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, AlertTriangle, Sparkles, Save } from 'lucide-react';

interface StartNewEICRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDuplicate?: () => void;
  hasUnsavedChanges: boolean;
}

const StartNewEICRDialog = ({
  isOpen,
  onClose,
  onConfirm,
  onDuplicate,
  hasUnsavedChanges
}: StartNewEICRDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="relative p-6 pb-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bs7671-warning/10 to-transparent" />
          <div className="relative">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-bs7671-warning/20 border border-bs7671-warning/30">
                  <Sparkles className="h-5 w-5 text-bs7671-warning" />
                </div>
                <DialogTitle className="text-lg font-semibold">
                  Start New EICR Report
                </DialogTitle>
              </div>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-2 space-y-4">
          <DialogDescription className="text-sm leading-relaxed">
            Choose how you want to proceed with creating a new report:
          </DialogDescription>
          
          {hasUnsavedChanges && (
            <Card className="p-3 bg-bs7671-warning/5 border-bs7671-warning/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-bs7671-warning mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-bs7671-warning">You have unsaved changes!</p>
                  <p>Consider saving your work before proceeding.</p>
                </div>
              </div>
            </Card>
          )}
          
          {/* Option Cards */}
          <div className="space-y-3">
            {onDuplicate && (
              <Card 
                className="p-4 cursor-pointer border-2 hover:border-primary/50 hover:bg-accent/50 transition-all"
                onClick={onDuplicate}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">Duplicate Current Report</h4>
                    <p className="text-xs text-muted-foreground">
                      Keep all data with a new certificate number. Perfect for similar properties or repeat inspections.
                    </p>
                  </div>
                </div>
              </Card>
            )}
            
            <Card 
              className="p-4 cursor-pointer border-2 hover:border-destructive/50 hover:bg-destructive/5 transition-all"
              onClick={onConfirm}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                  <Sparkles className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">Start Fresh Report</h4>
                  <p className="text-xs text-muted-foreground">
                    Clear all fields and begin a completely new report from scratch.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex p-6 pt-2 bg-muted/20">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartNewEICRDialog;
