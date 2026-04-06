import { useState } from 'react';
import { ChevronDown, Trash2, Edit2, Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getRiskColors } from '@/utils/risk-level-helpers';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { HazardEditSheet } from './HazardEditSheet';

interface EnhancedHazardCardProps {
  hazard: any;
  index: number;
  onUpdate?: (index: number, field: string, value: any) => void;
  onDelete?: (index: number) => void;
}

export const EnhancedHazardCard = ({
  hazard,
  index,
  onUpdate,
  onDelete,
}: EnhancedHazardCardProps) => {
  const { isMobile } = useMobileEnhanced();
  const [expanded, setExpanded] = useState(index < 3);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const riskScore = hazard.riskScore || hazard.likelihood * hazard.severity;
  const riskColors = getRiskColors(riskScore);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile && onUpdate) {
      setShowEditSheet(true);
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden border-l-4',
        riskColors.border
      )}
    >
      {/* Header — tappable div, NOT button */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 p-4 cursor-pointer touch-manipulation active:bg-white/[0.03] transition-colors"
      >
        <span className="text-sm font-bold text-white w-6 text-center shrink-0">
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-white truncate">
            {hazard.hazard}
          </p>
        </div>

        <span
          className={cn(
            'h-6 px-2 rounded-lg text-[10px] font-bold shrink-0 flex items-center',
            riskScore >= 15
              ? 'bg-red-500/15 text-red-400'
              : riskScore >= 8
                ? 'bg-amber-500/15 text-amber-400'
                : 'bg-green-500/15 text-green-400'
          )}
        >
          {riskScore}
        </span>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-white shrink-0" />
        </motion.div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-white/[0.06]">
              {/* Control Measures — view mode */}
              {hazard.controlMeasure && !isEditing && (
                <div className="space-y-1.5 pt-3">
                  <p className="text-[11px] font-medium text-white uppercase tracking-wider">
                    Control Measures
                  </p>
                  <div className="space-y-1.5">
                    {hazard.controlMeasure
                      .split(
                        /\n|(?=PRIMARY ACTION:|ENGINEER CONTROLS:|ADMINISTRATIVE CONTROLS:|VERIFICATION:|COMPETENCY REQUIREMENT:|EQUIPMENT STANDARDS:|REGULATION:|ELIMINATE|SUBSTITUTE)/i
                      )
                      .filter((s: string) => s.trim())
                      .map((line: string, i: number) => {
                        const match = line.match(/^([A-Z\s]+):/);
                        return (
                          <div key={i} className="flex gap-2">
                            <div className="w-1 h-1 rounded-full bg-orange-400 mt-2 shrink-0" />
                            <p className="text-[13px] text-white leading-relaxed">
                              {match ? (
                                <>
                                  <span className="font-semibold">
                                    {match[1].trim()}:
                                  </span>{' '}
                                  {line.substring(match[0].length).trim()}
                                </>
                              ) : (
                                line.trim()
                              )}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Control Measures — edit mode */}
              {isEditing && (
                <div className="pt-3 space-y-1.5">
                  <p className="text-[11px] font-medium text-white uppercase tracking-wider">
                    Control Measures
                  </p>
                  <Textarea
                    value={hazard.controlMeasure || ''}
                    onChange={(e) =>
                      onUpdate?.(index, 'controlMeasure', e.target.value)
                    }
                    placeholder="Enter control measures..."
                    className="min-h-[100px] text-[13px] bg-white/[0.03] border-white/[0.08] text-white"
                  />
                </div>
              )}

              {/* Likelihood & Severity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-medium text-white uppercase tracking-wider mb-2">
                    Likelihood
                  </p>
                  {isEditing ? (
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={hazard.likelihood}
                      onChange={(e) =>
                        onUpdate?.(
                          index,
                          'likelihood',
                          parseInt(e.target.value)
                        )
                      }
                      className="w-20 h-9 text-sm bg-white/[0.03] border-white/[0.08] text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'w-2.5 h-2.5 rounded-sm',
                            i < hazard.likelihood
                              ? 'bg-amber-400'
                              : 'bg-white/[0.08]'
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-white">
                        {hazard.likelihood}/5
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white uppercase tracking-wider mb-2">
                    Severity
                  </p>
                  {isEditing ? (
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={hazard.severity}
                      onChange={(e) =>
                        onUpdate?.(index, 'severity', parseInt(e.target.value))
                      }
                      className="w-20 h-9 text-sm bg-white/[0.03] border-white/[0.08] text-white"
                    />
                  ) : (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'w-2.5 h-2.5 rounded-sm',
                            i < hazard.severity
                              ? 'bg-red-400'
                              : 'bg-white/[0.08]'
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-white">
                        {hazard.severity}/5
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Regulation */}
              {(hazard.regulation || isEditing) && (
                <div>
                  <p className="text-[11px] font-medium text-white uppercase tracking-wider mb-1.5">
                    Regulation
                  </p>
                  {isEditing ? (
                    <Input
                      value={hazard.regulation || ''}
                      onChange={(e) =>
                        onUpdate?.(index, 'regulation', e.target.value)
                      }
                      placeholder="e.g. BS 7671 Section 537"
                      className="h-9 text-sm bg-white/[0.03] border-white/[0.08] text-white"
                    />
                  ) : (
                    <p className="text-[13px] text-blue-400">
                      {hazard.regulation}
                    </p>
                  )}
                </div>
              )}

              {/* Hazard title edit (only in edit mode) */}
              {isEditing && (
                <div>
                  <p className="text-[11px] font-medium text-white uppercase tracking-wider mb-1.5">
                    Hazard Name
                  </p>
                  <Input
                    value={hazard.hazard}
                    onChange={(e) =>
                      onUpdate?.(index, 'hazard', e.target.value)
                    }
                    className="h-9 text-sm bg-white/[0.03] border-white/[0.08] text-white"
                  />
                </div>
              )}

              {/* Action buttons — at bottom of content, no nesting issues */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEditClick}
                      className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-[11px] font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.97]"
                    >
                      <Edit2 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this hazard?')) onDelete?.(index);
                      }}
                      className="h-9 w-9 rounded-lg bg-red-500/10 text-red-400 ring-1 ring-red-500/20 flex items-center justify-center touch-manipulation active:scale-[0.97]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="h-9 px-3 rounded-lg bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 text-[11px] font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.97]"
                    >
                      <Save className="h-3 w-3" /> Done
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-[11px] font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.97]"
                    >
                      <X className="h-3 w-3" /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Edit Sheet */}
      {onUpdate && (
        <HazardEditSheet
          hazard={hazard}
          index={index}
          open={showEditSheet}
          onOpenChange={setShowEditSheet}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
