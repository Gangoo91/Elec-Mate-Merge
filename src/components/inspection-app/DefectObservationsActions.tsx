
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';

interface DefectObservationsActionsProps {
  onAddObservation: () => void;
  onManualSave: () => void;
}

const DefectObservationsActions = ({
  onAddObservation,
  onManualSave,
}: DefectObservationsActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={onManualSave} className="h-9 px-4" variant="outline" size="sm">
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button onClick={onAddObservation} className="h-9 px-4 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium" size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Observation
      </Button>
    </div>
  );
};

export default DefectObservationsActions;
