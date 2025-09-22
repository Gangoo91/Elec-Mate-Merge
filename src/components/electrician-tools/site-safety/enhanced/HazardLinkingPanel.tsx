import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Task } from '@/types/enhanced-rams';

interface HazardLinkingPanelProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HazardLinkingPanel: React.FC<HazardLinkingPanelProps> = ({ task, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link Hazards to: {task.title}</DialogTitle>
        </DialogHeader>
        <p>Hazard linking coming soon...</p>
      </DialogContent>
    </Dialog>
  );
};

export default HazardLinkingPanel;