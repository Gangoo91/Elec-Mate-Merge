import React from 'react';
import { Plus } from 'lucide-react';
import EICDefectObservationsList from './EICDefectObservationsList';
import { EICObservation } from '@/hooks/useEICObservations';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

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
  className,
}) => {
  const criticalCount = observations.filter(
    (obs) => obs.defectCode === 'C1' || obs.defectCode === 'C2' || obs.defectCode === 'C3'
  ).length;
  const limitationsCount = observations.filter((obs) => obs.defectCode === 'limitation').length;

  return (
    <div className={className} id="eic-observations-section">
      <div className="space-y-4">
        <SectionTitle title="Observations and Limitations" />

        <div className="flex items-center gap-2 flex-wrap">
          {criticalCount > 0 && (
            <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium rounded-full">
              {criticalCount} defects
            </span>
          )}
          {limitationsCount > 0 && (
            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-medium rounded-full">
              {limitationsCount} limitation{limitationsCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-white">
            {observations.length === 0
              ? 'No observations recorded'
              : `${observations.length} observation${observations.length !== 1 ? 's' : ''}`}
          </p>
          <button
            onClick={onAddObservation}
            className="h-11 px-4 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:scale-[0.98] flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
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
    </div>
  );
};

export default EICObservationsSection;
