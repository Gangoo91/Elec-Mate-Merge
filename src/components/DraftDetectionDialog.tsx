
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
import { FileText, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface DraftDetectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadDraft: () => void;
  onStartNew: () => void;
  draftTimestamp: number;
}

const DraftDetectionDialog = ({
  isOpen,
  onClose,
  onLoadDraft,
  onStartNew,
  draftTimestamp
}: DraftDetectionDialogProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="relative p-6 pb-0">
          <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 to-transparent" />
          <div className="relative">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/20 border border-elec-yellow/30">
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </div>
                <DialogTitle className="text-lg font-semibold">
                  Draft Found
                </DialogTitle>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last saved: {formatDate(draftTimestamp)}
              </div>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-2 space-y-4">
          <DialogDescription className="text-sm leading-relaxed">
            We found an existing EICR draft. Would you like to continue with your saved work or start a new report?
          </DialogDescription>
          
          <Card className="p-3 bg-elec-yellow/5 border-elec-yellow/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Starting a new report will preserve your draft in save points - nothing will be lost.
              </p>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 p-6 pt-2 bg-muted/20">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onStartNew}
              className="flex-1 border-elec-yellow/30 hover:bg-elec-yellow/5"
            >
              Start New Report
            </Button>
            <Button
              onClick={onLoadDraft}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Continue Draft
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full text-xs text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DraftDetectionDialog;
