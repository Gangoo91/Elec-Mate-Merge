
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DefectObservationCard from './DefectObservationCard';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface DefectObservationsListProps {
  defectObservations: DefectObservation[];
  reportId: string;
  onAddObservation: () => void;
  onUpdateObservation: (id: string, field: keyof DefectObservation | '__BULK__', value: any) => void;
  onRemoveObservation: (id: string) => void;
  certificateContext?: {
    certificateNumber?: string;
    certificateType?: 'eicr' | 'eic';
    installationAddress?: string;
    clientName?: string;
  };
}

const DefectObservationsList = ({
  defectObservations,
  reportId,
  onAddObservation,
  onUpdateObservation,
  onRemoveObservation,
  certificateContext
}: DefectObservationsListProps) => {
  if (defectObservations.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-muted-foreground mb-2">
          No observations recorded yet
        </p>
        <p className="text-sm text-muted-foreground/80">
          Complete your inspection checklist to automatically populate observations
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {defectObservations.map((defect, index) => (
        <DefectObservationCard
          key={defect.id}
          defect={defect}
          reportId={reportId}
          index={index}
          onUpdate={onUpdateObservation}
          onRemove={onRemoveObservation}
          certificateContext={certificateContext}
        />
      ))}
    </div>
  );
};

export default DefectObservationsList;
