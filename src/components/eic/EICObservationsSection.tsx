import React from 'react';
import { Plus, AlertTriangle, Info } from 'lucide-react';
import EICDefectObservationsList from './EICDefectObservationsList';
import { EICObservation } from '@/hooks/useEICObservations';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

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
  onUpdateObservation: (id: string, field: keyof EICObservation, value: string | boolean) => void;
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
  const haptic = useHaptic();
  const unsatisfactoryCount = observations.filter(
    (obs) => obs.defectCode === 'unsatisfactory'
  ).length;
  const limitationsCount = observations.filter((obs) => obs.defectCode === 'limitation').length;

  const handleAddObservation = () => {
    haptic.light();
    onAddObservation();
  };

  return (
    <div className={cn('space-y-3', className)} id="eic-observations-section">
      <SectionTitle title="Observations & Limitations" />

      <div className="flex items-center gap-2 flex-wrap">
        {unsatisfactoryCount > 0 && (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium rounded-full">
            <AlertTriangle className="w-3 h-3" />
            {unsatisfactoryCount} defects
          </span>
        )}
        {limitationsCount > 0 && (
          <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-medium rounded-full">
            <Info className="w-3 h-3" />
            {limitationsCount} LIM
          </span>
        )}
      </div>

      <button
        onClick={handleAddObservation}
        className="w-full h-11 rounded-lg font-medium text-sm bg-white/[0.05] border border-white/[0.08] text-white flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        Add Observation
      </button>

      {observations.length > 0 && (
        <EICDefectObservationsList
          observations={observations}
          reportId={reportId}
          onAddObservation={handleAddObservation}
          onUpdateObservation={onUpdateObservation}
          onRemoveObservation={onRemoveObservation}
          onSyncToInspectionItem={onSyncToInspectionItem}
        />
      )}

      {observations.length === 0 && (
        <div className="text-center py-6 text-white">
          <p className="text-xs">No observations recorded</p>
        </div>
      )}
    </div>
  );
};

export default EICObservationsSection;
