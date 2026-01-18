/**
 * EIC Defect Observations List
 *
 * Renders the list of observation cards with animations.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  onUpdateObservation,
  onRemoveObservation,
  onSyncToInspectionItem
}) => {
  if (observations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {observations.map((observation, index) => (
          <motion.div
            key={observation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <EICDefectObservationCard
              observation={observation}
              reportId={reportId}
              index={index}
              onUpdate={onUpdateObservation}
              onRemove={onRemoveObservation}
              onSyncToInspectionItem={onSyncToInspectionItem}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EICDefectObservationsList;
