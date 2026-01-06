import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileX } from 'lucide-react';
import MinorWorksObservationCard, { MinorWorksObservation } from './MinorWorksObservationCard';

interface MinorWorksObservationsListProps {
  observations: MinorWorksObservation[];
  onAddObservation: () => void;
  onUpdateObservation: (id: string, field: keyof MinorWorksObservation, value: any) => void;
  onRemoveObservation: (id: string) => void;
  onQuickMarkAllNA: () => void;
}

const MinorWorksObservationsList: React.FC<MinorWorksObservationsListProps> = ({
  observations,
  onAddObservation,
  onUpdateObservation,
  onRemoveObservation,
  onQuickMarkAllNA
}) => {
  if (observations.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-white/10 rounded-lg">
        <FileX className="h-12 w-12 text-white/70 mx-auto mb-4" />
        <p className="text-white/60 mb-4">No observations recorded yet</p>
        <p className="text-sm text-white/70 mb-6">
          Add observations for any defects, improvements, or investigations required
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={onAddObservation} variant="outline" className="w-full sm:w-auto min-h-[44px]">
            <Plus className="h-4 w-4 mr-2" />
            Add Observation
          </Button>
          <Button onClick={onQuickMarkAllNA} variant="secondary" className="w-full sm:w-auto min-h-[44px]">
            Mark All N/A
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {observations.length} observation{observations.length !== 1 ? 's' : ''} recorded
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={onAddObservation} variant="outline" size="sm" className="w-full sm:w-auto min-h-[44px]">
            <Plus className="h-4 w-4 mr-2" />
            Add Observation
          </Button>
          <Button onClick={onQuickMarkAllNA} variant="secondary" size="sm" className="w-full sm:w-auto min-h-[44px]">
            Mark All N/A
          </Button>
        </div>
      </div>
      
      {observations.map((observation, index) => (
        <MinorWorksObservationCard
          key={observation.id}
          observation={observation}
          index={index}
          onUpdate={onUpdateObservation}
          onRemove={onRemoveObservation}
        />
      ))}
    </div>
  );
};

export default MinorWorksObservationsList;