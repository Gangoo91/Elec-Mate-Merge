/**
 * EIC Observations Section
 *
 * Premium glass morphism section for recording observations and limitations.
 * Native mobile app feel with touch-optimized controls.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Plus, FileWarning, Info } from 'lucide-react';
import EICDefectObservationsList from './EICDefectObservationsList';
import { EICObservation } from '@/hooks/useEICObservations';
import { cn } from '@/lib/utils';

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
  const unsatisfactoryCount = observations.filter(obs => obs.defectCode === 'unsatisfactory').length;
  const limitationsCount = observations.filter(obs => obs.defectCode === 'limitation').length;

  return (
    <div className={cn("space-y-3", className)} id="eic-observations-section">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            Observations & Limitations
          </h3>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          {unsatisfactoryCount > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 bg-red-500/15 text-red-400 text-xs font-medium rounded-full">
              <AlertTriangle className="w-3 h-3" />
              {unsatisfactoryCount}
            </span>
          )}
          {limitationsCount > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/15 text-purple-400 text-xs font-medium rounded-full">
              <Info className="w-3 h-3" />
              {limitationsCount}
            </span>
          )}
        </div>
      </div>

      {/* Add Observation Button - Always Visible */}
      <motion.button
        onClick={onAddObservation}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full h-12 rounded-xl font-medium text-sm",
          "bg-orange-500/10 text-orange-400 border border-orange-500/20",
          "hover:bg-orange-500/15 transition-colors duration-200",
          "flex items-center justify-center gap-2",
          "touch-manipulation"
        )}
      >
        <Plus className="w-4 h-4" />
        Add Observation
      </motion.button>

      {/* Observations List */}
      {observations.length > 0 && (
        <EICDefectObservationsList
          observations={observations}
          reportId={reportId}
          onAddObservation={onAddObservation}
          onUpdateObservation={onUpdateObservation}
          onRemoveObservation={onRemoveObservation}
          onSyncToInspectionItem={onSyncToInspectionItem}
        />
      )}

      {/* Empty State */}
      {observations.length === 0 && (
        <div className="text-center py-6 text-muted-foreground/60">
          <FileWarning className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No observations recorded</p>
          <p className="text-xs mt-1">Tap above to add any defects or limitations</p>
        </div>
      )}
    </div>
  );
};

export default EICObservationsSection;
