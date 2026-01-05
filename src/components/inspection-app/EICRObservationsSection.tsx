import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DefectObservationsHeader from './DefectObservationsHeader';
import DefectObservationsList from './DefectObservationsList';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface EICRObservationsSectionProps {
  defectObservations: DefectObservation[];
  reportId: string;
  onUpdateObservation: (id: string, field: keyof DefectObservation, value: any) => void;
  onRemoveObservation: (id: string) => void;
  formData?: any;
  onUpdateFormData?: (data: any) => void;
}

const EICRObservationsSection = React.forwardRef<HTMLDivElement, EICRObservationsSectionProps>(
  ({ defectObservations, reportId, onUpdateObservation, onRemoveObservation, formData, onUpdateFormData }, ref) => {
    // Note: Auto-save is now handled by EICRFormProvider via useCloudSync

    const criticalIssues = defectObservations.filter(obs => ['C1', 'C2'].includes(obs.defectCode)).length;
    const improvements = defectObservations.filter(obs => obs.defectCode === 'C3').length;

    return (
      <div ref={ref}>
        <Card>
          <CardHeader>
            <DefectObservationsHeader
              hasUnsavedChanges={false}
              criticalIssues={criticalIssues}
              improvements={improvements}
            />
            <div className="pt-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Observations are automatically populated from your inspection checklist.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DefectObservationsList
              defectObservations={defectObservations}
              reportId={reportId}
              onAddObservation={() => {}} // Not used in EICR mode
              onUpdateObservation={onUpdateObservation}
              onRemoveObservation={onRemoveObservation}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
);

EICRObservationsSection.displayName = 'EICRObservationsSection';

export default EICRObservationsSection;