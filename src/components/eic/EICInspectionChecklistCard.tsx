/**
 * EIC Inspection Checklist Card
 *
 * Premium flat design for the Schedule of Inspections.
 * Native mobile app feel with touch-optimized controls.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, MessageSquare } from 'lucide-react';
import { EICInspectionItem } from '@/data/bs7671EICChecklistData';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

interface EICInspectionChecklistCardProps {
  inspectionItems: EICInspectionItem[];
  onUpdateItem: (id: string, field: keyof EICInspectionItem, value: any) => void;
}

const EICInspectionChecklistCard: React.FC<EICInspectionChecklistCardProps> = ({
  inspectionItems,
  onUpdateItem
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  const handleOutcomeChange = (id: string, outcome: 'satisfactory' | 'not-applicable') => {
    haptics.tap();
    const currentItem = inspectionItems.find(item => item.id === id);
    if (currentItem?.outcome === outcome) {
      // Toggle off if clicking the same button
      onUpdateItem(id, 'outcome', '');
    } else {
      onUpdateItem(id, 'outcome', outcome);
      if (outcome === 'satisfactory') {
        haptics.success();
      }
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
    <div className={cn("space-y-0", isMobile && "-mx-4")}>
      {/* Subtitle */}
      <p className={cn(
        "text-xs text-muted-foreground mb-2",
        isMobile ? "px-4" : "px-1"
      )}>
        IET Model Forms - BS7671 18th Edition + A3:2024 compliant
      </p>

      {/* Inspection Items - Flat List */}
      <div className="divide-y divide-border/20">
        {inspectionItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: index * 0.01 }}
            className={cn(
              "py-4 touch-manipulation",
              isMobile ? "px-4" : "px-1"
            )}
          >
            {/* Item Row */}
            <div className="flex items-start gap-3">
              {/* Small Number Badge */}
              <div
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center",
                  "text-xs font-semibold transition-colors duration-200",
                  item.outcome === 'satisfactory' && "bg-green-500/20 text-green-400",
                  item.outcome === 'not-applicable' && "bg-neutral-500/20 text-neutral-400",
                  !item.outcome && "bg-amber-500/20 text-amber-400"
                )}
              >
                {item.itemNumber}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Description - Left Aligned */}
                <p className="text-sm text-foreground text-left leading-snug mb-3">
                  {item.description}
                </p>

                {/* Compact Buttons Row */}
                <div className="flex gap-2">
                  {/* Satisfactory Button */}
                  <button
                    onClick={() => handleOutcomeChange(item.id, 'satisfactory')}
                    className={cn(
                      "h-10 px-4 rounded-lg font-medium text-sm transition-all duration-150",
                      "touch-manipulation active:scale-[0.97]",
                      "flex items-center justify-center gap-1.5",
                      item.outcome === 'satisfactory'
                        ? "bg-green-500 text-white"
                        : "bg-card/50 text-foreground/70 border border-border/30 hover:bg-card"
                    )}
                  >
                    {item.outcome === 'satisfactory' && (
                      <Check className="w-4 h-4" />
                    )}
                    <span className={cn(item.outcome === 'satisfactory' ? "" : "hidden sm:inline")}>
                      Satisfactory
                    </span>
                    <span className={cn(item.outcome === 'satisfactory' ? "hidden" : "sm:hidden")}>
                      ✓
                    </span>
                  </button>

                  {/* N/A Button */}
                  <button
                    onClick={() => handleOutcomeChange(item.id, 'not-applicable')}
                    className={cn(
                      "h-10 px-4 rounded-lg font-medium text-sm transition-all duration-150",
                      "touch-manipulation active:scale-[0.97]",
                      "flex items-center justify-center gap-1.5",
                      item.outcome === 'not-applicable'
                        ? "bg-neutral-500 text-white"
                        : "bg-card/50 text-foreground/70 border border-border/30 hover:bg-card"
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
                      <div className="mt-3 pt-3 border-t border-border/20">
                        <div className="flex items-center gap-1.5 mb-2">
                          <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Notes (optional)</span>
                        </div>
                        <Textarea
                          placeholder="Add any observations or comments..."
                          value={item.notes || ''}
                          onChange={(e) => onUpdateItem(item.id, 'notes', e.target.value)}
                          className="min-h-[60px] text-base bg-background border-border resize-none focus:ring-1 focus:ring-elec-yellow/50 focus:border-elec-yellow/50 touch-manipulation"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EICInspectionChecklistCard;
