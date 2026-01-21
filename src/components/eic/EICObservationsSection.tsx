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
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

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
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const unsatisfactoryCount = observations.filter(obs => obs.defectCode === 'unsatisfactory').length;
  const limitationsCount = observations.filter(obs => obs.defectCode === 'limitation').length;

  const handleAddObservation = () => {
    haptics.tap();
    onAddObservation();
  };

  return (
    <div className={cn("space-y-3", isMobile && "-mx-4", className)} id="eic-observations-section">
      {/* Section Header */}
      <div className={cn(
        "flex items-center justify-between",
        isMobile ? "px-4 py-4 bg-card/30 border-y border-border/20" : "pb-3 border-b border-border/30"
      )}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">Observations & Limitations</h3>
          </div>
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

      {/* Content Area */}
      <div className={cn(isMobile && "px-4")}>
        {/* Add Observation Button - Always Visible */}
        <motion.button
          onClick={handleAddObservation}
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
      </div>

      {/* Observations List */}
      {observations.length > 0 && (
        <div className={cn(isMobile && "px-4")}>
          <EICDefectObservationsList
            observations={observations}
            reportId={reportId}
            onAddObservation={handleAddObservation}
            onUpdateObservation={onUpdateObservation}
            onRemoveObservation={onRemoveObservation}
            onSyncToInspectionItem={onSyncToInspectionItem}
          />
        </div>
      )}

      {/* Empty State */}
      {observations.length === 0 && (
        <div className={cn("text-center py-6 text-muted-foreground/60", isMobile && "px-4")}>
          <FileWarning className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No observations recorded</p>
          <p className="text-xs mt-1">Tap above to add any defects or limitations</p>
        </div>
      )}
    </div>
  );
};

export default EICObservationsSection;
