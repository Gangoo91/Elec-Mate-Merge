import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileSearch, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AIAnalysisConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  photoUrl: string;
  inspectorContext: {
    classification?: string;
    itemLocation?: string;
    description?: string;
  };
}

const AIAnalysisConfirmDialog: React.FC<AIAnalysisConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  photoUrl,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Quality Assurance</DialogTitle>
          <DialogDescription>
            Get a second opinion on this observation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Photo Preview */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-primary/20">
            <img
              src={photoUrl}
              alt="Observation photo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Simple disclaimer */}
          <Alert className="border-primary/30">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-xs">
              AI provides a second opinion based on visible evidence and BS7671:2018+A3:2024 regulations. Final classification decision remains with the inspector.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex-row gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1 gap-2">
            <FileSearch className="h-4 w-4" />
            Analyse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisConfirmDialog;
