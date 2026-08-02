import React from 'react';
import EICDefectObservationsList from './EICDefectObservationsList';
import { EICObservation, normalizeEICDefectCode } from '@/hooks/useEICObservations';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

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
  // Counts go through normalizeEICDefectCode so legacy EICR codes (C1/C2/C3)
  // on older certs are counted as defects instead of vanishing from the header.
  const unsatisfactoryCount = observations.filter(
    (obs) => normalizeEICDefectCode(obs.defectCode) === 'unsatisfactory'
  ).length;
  const limitationsCount = observations.filter(
    (obs) => normalizeEICDefectCode(obs.defectCode) === 'limitation'
  ).length;

  const handleAddObservation = () => {
    haptic.light();
    onAddObservation();
  };

  return (
    <section className={cn(cardCn, className)} id="eic-observations-section">
      <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
        Observations and limitations
      </h2>

      {(unsatisfactoryCount > 0 || limitationsCount > 0) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {unsatisfactoryCount > 0 && (
            <span className="text-[12px] font-semibold text-red-400">
              {unsatisfactoryCount} defects
            </span>
          )}
          {limitationsCount > 0 && (
            <span className="text-[12px] font-semibold text-amber-400">
              {limitationsCount} LIM
            </span>
          )}
        </div>
      )}

      <button
        onClick={handleAddObservation}
        className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all touch-manipulation active:scale-[0.98] hover:bg-elec-yellow/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto sm:px-8"
      >
        Add observation
      </button>

      {observations.length > 0 && (
        <EICDefectObservationsList
          observations={observations}
          reportId={reportId}
          onUpdateObservation={onUpdateObservation}
          onRemoveObservation={onRemoveObservation}
          onSyncToInspectionItem={onSyncToInspectionItem}
        />
      )}

      {observations.length === 0 && (
        <div className="py-6 text-center">
          <p className="text-[13px] text-white">No observations recorded</p>
        </div>
      )}
    </section>
  );
};

export default EICObservationsSection;
