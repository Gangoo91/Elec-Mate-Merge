
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus } from 'lucide-react';
import EICDefectObservationsList from './EICDefectObservationsList';
import { EICObservation } from '@/hooks/useEICObservations';

interface EICObservationsSectionProps {
  observations: EICObservation[];
  reportId: string;
  onAddObservation: () => void;
  onUpdateObservation: (id: string, field: keyof EICObservation, value: any) => void;
  onRemoveObservation: (id: string) => void;
  onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
  className?: string;
}

const EICObservationsSection: React.FC<EICObservationsSectionProps> = ({
  observations,
  reportId,
  onAddObservation,
  onUpdateObservation,
  onRemoveObservation,
  onSyncToInspectionItem,
  className
}) => {
  const criticalCount = observations.filter(obs => obs.defectCode === 'C1' || obs.defectCode === 'C2' || obs.defectCode === 'C3').length;
  const limitationsCount = observations.filter(obs => obs.defectCode === 'limitation').length;

  return (
    <div className={className} id="eic-observations-section">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Observations and Limitations
            {criticalCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium rounded-full">
                {criticalCount} defects
              </span>
            )}
            {limitationsCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-medium rounded-full">
                {limitationsCount} limitation{limitationsCount !== 1 ? 's' : ''}
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Record any unsatisfactory items, limitations, or observations identified during the inspection
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {observations.length === 0 
                  ? "No observations recorded" 
                  : `${observations.length} observation${observations.length !== 1 ? 's' : ''} recorded`
                }
              </p>
              <Button onClick={onAddObservation} variant="outline" size="default" className="h-10 touch-manipulation">
                <Plus className="h-4 w-4 mr-2" />
                Add Observation
              </Button>
            </div>
            
            <EICDefectObservationsList
              observations={observations}
              reportId={reportId}
              onAddObservation={onAddObservation}
              onUpdateObservation={onUpdateObservation}
              onRemoveObservation={onRemoveObservation}
              onSyncToInspectionItem={onSyncToInspectionItem}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICObservationsSection;
