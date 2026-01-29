/**
 * EIC Inspection Stats Summary
 *
 * Sticky header with progress bar showing inspection completion status.
 * Native mobile app feel with glass morphism styling.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

interface EICInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: '' | 'satisfactory' | 'not-applicable' | 'limitation';
  notes?: string;
}

interface EICInspectionStatsSummaryProps {
  inspectionItems: EICInspectionItem[];
}

const EICInspectionStatsSummary: React.FC<EICInspectionStatsSummaryProps> = ({ inspectionItems }) => {
  const totalItems = inspectionItems.length;
  const completed = inspectionItems.filter(item => item.outcome !== '').length;
  const satisfactory = inspectionItems.filter(item => item.outcome === 'satisfactory').length;
  const notApplicable = inspectionItems.filter(item => item.outcome === 'not-applicable').length;
  const limitation = inspectionItems.filter(item => item.outcome === 'limitation').length;
  const progressPercent = totalItems > 0 ? (completed / totalItems) * 100 : 0;

  return (
    <div className="sticky top-0 z-10 -mx-2 sm:-mx-4 md:-mx-6 px-2 sm:px-4 md:px-6 py-3 bg-background/80 backdrop-blur-md border-b border-white/[0.06]">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            Schedule of Inspections
          </h3>
        </div>
        <span className="text-sm font-medium text-foreground/70">
          {completed}/{totalItems}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-green-500"
        />
      </div>

      {/* Quick Stats */}
      <div className="flex items-center gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-green-400" />
          </div>
          <span className="text-green-400 font-medium">{satisfactory}</span>
          <span className="text-foreground/50">Satisfactory</span>
        </div>

        <div className="w-px h-4 bg-white/10" />

        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-neutral-500/20 flex items-center justify-center">
            <Minus className="w-2.5 h-2.5 text-neutral-400" />
          </div>
          <span className="text-neutral-400 font-medium">{notApplicable}</span>
          <span className="text-foreground/50">N/A</span>
        </div>

        {limitation > 0 && (
          <>
            <div className="w-px h-4 bg-white/10" />

            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-[8px] text-amber-400 font-bold">L</span>
              </div>
              <span className="text-amber-400 font-medium">{limitation}</span>
              <span className="text-foreground/50">LIM</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EICInspectionStatsSummary;
