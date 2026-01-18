/**
 * EIC Inspection Checklist Card
 *
 * Premium glass morphism cards for the Schedule of Inspections.
 * Native mobile app feel with touch-optimized controls.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, MessageSquare } from 'lucide-react';
import { EICInspectionItem } from '@/data/bs7671EICChecklistData';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface EICInspectionChecklistCardProps {
  inspectionItems: EICInspectionItem[];
  onUpdateItem: (id: string, field: keyof EICInspectionItem, value: any) => void;
}

const EICInspectionChecklistCard: React.FC<EICInspectionChecklistCardProps> = ({
  inspectionItems,
  onUpdateItem
}) => {
  const handleOutcomeChange = (id: string, outcome: 'satisfactory' | 'not-applicable') => {
    const currentItem = inspectionItems.find(item => item.id === id);
    if (currentItem?.outcome === outcome) {
      // Toggle off if clicking the same button
      onUpdateItem(id, 'outcome', '');
    } else {
      onUpdateItem(id, 'outcome', outcome);
    }
  };

  if (inspectionItems.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No inspection items found. Please refresh the page or contact support.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Subtitle */}
      <p className="text-xs text-muted-foreground px-1">
        IET Model Forms - BS7671 18th Edition + A3:2024 compliant
      </p>

      {/* Inspection Cards */}
      <div className="space-y-2">
        {inspectionItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            className={cn(
              // Glass morphism base
              "relative overflow-hidden rounded-xl",
              "bg-white/[0.03] backdrop-blur-sm",
              "border border-white/[0.06]",
              // Left status border (4px)
              "border-l-4",
              item.outcome === 'satisfactory' && "border-l-green-500",
              item.outcome === 'not-applicable' && "border-l-neutral-500",
              item.outcome === '' && "border-l-amber-500/40",
              // Touch optimization
              "touch-manipulation"
            )}
          >
            <div className="p-4">
              {/* Header: Number Badge + Description */}
              <div className="flex gap-3 mb-4">
                {/* Circular Number Badge */}
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    "text-sm font-bold transition-colors duration-200",
                    item.outcome === 'satisfactory' && "bg-green-500/20 text-green-400",
                    item.outcome === 'not-applicable' && "bg-neutral-500/20 text-neutral-400",
                    item.outcome === '' && "bg-elec-yellow/20 text-elec-yellow"
                  )}
                >
                  {item.itemNumber}
                </div>

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed flex-1 pt-1">
                  {item.description}
                </p>
              </div>

              {/* Segmented Control Buttons */}
              <div className="flex gap-2">
                {/* Satisfactory Button */}
                <button
                  onClick={() => handleOutcomeChange(item.id, 'satisfactory')}
                  className={cn(
                    "flex-1 h-11 rounded-lg font-medium text-sm transition-all duration-200",
                    "touch-manipulation active:scale-[0.97]",
                    "flex items-center justify-center gap-1.5",
                    item.outcome === 'satisfactory'
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                      : "bg-white/[0.05] text-foreground/70 hover:bg-white/[0.08] border border-white/[0.08]"
                  )}
                >
                  {item.outcome === 'satisfactory' && (
                    <Check className="w-4 h-4" />
                  )}
                  Satisfactory
                </button>

                {/* N/A Button */}
                <button
                  onClick={() => handleOutcomeChange(item.id, 'not-applicable')}
                  className={cn(
                    "flex-1 h-11 rounded-lg font-medium text-sm transition-all duration-200",
                    "touch-manipulation active:scale-[0.97]",
                    "flex items-center justify-center gap-1.5",
                    item.outcome === 'not-applicable'
                      ? "bg-neutral-600 text-white"
                      : "bg-white/[0.05] text-foreground/70 hover:bg-white/[0.08] border border-white/[0.08]"
                  )}
                >
                  {item.outcome === 'not-applicable' && (
                    <Minus className="w-4 h-4" />
                  )}
                  N/A
                </button>
              </div>

              {/* Animated Notes Section */}
              <AnimatePresence>
                {item.outcome && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 mb-2">
                        <MessageSquare className="w-3.5 h-3.5 text-foreground/50" />
                        <span className="text-xs text-foreground/50">Notes (optional)</span>
                      </div>
                      <Textarea
                        placeholder="Add any observations or comments..."
                        value={item.notes || ''}
                        onChange={(e) => onUpdateItem(item.id, 'notes', e.target.value)}
                        className="min-h-[60px] text-sm bg-white/[0.03] border-white/[0.08] resize-none focus:ring-1 focus:ring-elec-yellow/50 focus:border-elec-yellow/50"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EICInspectionChecklistCard;