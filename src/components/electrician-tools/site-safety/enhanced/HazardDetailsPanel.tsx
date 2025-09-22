import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EnhancedHazard } from '@/types/enhanced-rams';

interface HazardDetailsPanelProps {
  hazard: EnhancedHazard;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HazardDetailsPanel: React.FC<HazardDetailsPanelProps> = ({ hazard, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{hazard.hazard_name}</DialogTitle>
        </DialogHeader>
        <p>Hazard details panel coming soon...</p>
      </DialogContent>
    </Dialog>
  );
};

export default HazardDetailsPanel;