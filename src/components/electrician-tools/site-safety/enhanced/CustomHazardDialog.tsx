import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CustomHazardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomHazardDialog: React.FC<CustomHazardDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Custom Hazard</DialogTitle>
        </DialogHeader>
        <p>Custom hazard creation coming soon...</p>
      </DialogContent>
    </Dialog>
  );
};

export default CustomHazardDialog;