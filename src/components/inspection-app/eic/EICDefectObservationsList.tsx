
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import EICDefectObservationCard from './EICDefectObservationCard';
import { EICObservation } from '@/hooks/useEICObservations';

interface EICDefectObservationsListProps {
  observations: EICObservation[];
  reportId: string;
  onAddObservation: () => void;
  onUpdateObservation: (id: string, field: keyof EICObservation, value: any) => void;
  onRemoveObservation: (id: string) => void;
  onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
}

const EICDefectObservationsList: React.FC<EICDefectObservationsListProps> = ({
  observations,
  reportId,
  onAddObservation,
  onUpdateObservation,
  onRemoveObservation,
  onSyncToInspectionItem
}) => {
  if (observations.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-lg">
        <p className="text-white/60 mb-4">No observations recorded yet</p>
        <Button onClick={onAddObservation} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add First Observation
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {observations.map((observation, index) => (
        <EICDefectObservationCard
          key={observation.id}
          observation={observation}
          reportId={reportId}
          index={index}
          onUpdate={onUpdateObservation}
          onRemove={onRemoveObservation}
          onSyncToInspectionItem={onSyncToInspectionItem}
        />
      ))}
    </div>
  );
};

export default EICDefectObservationsList;
