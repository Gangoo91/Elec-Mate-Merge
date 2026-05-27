import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, ChevronDown, Info } from 'lucide-react';
import {
  useEICRValidation,
  type EICRValidationRule,
  EICR_TAB_LABEL,
  type EICRTabId,
} from '@/hooks/useEICRValidation';
import { scrollToField } from '@/utils/scrollToField';
import { cn } from '@/lib/utils';

interface EICRValidationPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  className?: string;
  onJumpToTab?: (tab: EICRTabId) => void;
}

const groupByTab = (rules: EICRValidationRule[]): Map<EICRTabId, EICRValidationRule[]> => {
  const groups = new Map<EICRTabId, EICRValidationRule[]>();
  for (const rule of rules) {
    const arr = groups.get(rule.tab) || [];
    arr.push(rule);
    groups.set(rule.tab, arr);
  }
  return groups;
};

const EICRValidationPanel: React.FC<EICRValidationPanelProps> = ({
  formData,
  className = '',
  onJumpToTab,
}) => {
  const validation = useEICRValidation(formData);
  const [showWarnings, setShowWarnings] = useState(false);

  // Header taps jump to the tab; row taps also flash the specific field.
  const handleJump = (tab?: EICRTabId, field?: string) => {
    if (!tab || !onJumpToTab) return;
    onJumpToTab(tab);
    if (field) {
      scrollToField(field, 80);
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const errorGroups = groupByTab(validation.errors);
  const warningGroups = groupByTab(validation.warnings);
  const totalErrors = validation.errors.length;
  const totalWarnings = validation.warnings.length;
  const ready = validation.isValid;

  // Empty state — full ready pill.
  if (ready && totalWarnings === 0) {
    return (
      <div
        className={cn(
          'rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2',
          'flex items-center gap-2',
          className
        )}
      >
        <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
        <span className="text-sm font-medium text-green-300">Ready to generate</span>
        <span className="ml-auto text-[10px] text-green-400/70">
          {validation.completionPercentage}%
        </span>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-white/[0.06] bg-white/[0.03] overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
        {ready ? (
          <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
        )}
        <span className="text-sm font-medium text-white">
          {ready
            ? 'Ready to generate'
            : `${totalErrors} item${totalErrors === 1 ? '' : 's'} to complete`}
        </span>
        <span className="ml-auto text-[10px] text-white/60">
          {validation.completionPercentage}%
        </span>
      </div>

      {/* Errors — grouped by tab */}
      {totalErrors > 0 && (
        <div className="divide-y divide-white/[0.04]">
          {Array.from(errorGroups.entries()).map(([tab, rules]) => (
            <div key={tab} className="px-3 py-2">
              <div className="flex items-baseline justify-between mb-1.5">
                <p className="text-[10px] uppercase tracking-wider text-white/50">
                  {EICR_TAB_LABEL[tab]} — {rules.length} missing
                </p>
                {onJumpToTab && (
                  <button
                    type="button"
                    onClick={() => handleJump(tab)}
                    className="text-[10px] text-elec-yellow hover:underline touch-manipulation"
                  >
                    Go →
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {rules.map((rule) => {
                  const RowContent = (
                    <>
                      <span className="w-1 h-1 rounded-full bg-red-400 shrink-0 mt-1.5" />
                      <span className="text-white flex-1 text-left">{rule.message}</span>
                      {rule.regulation && (
                        <span className="text-[10px] text-white/40 shrink-0">
                          {rule.regulation}
                        </span>
                      )}
                    </>
                  );
                  return onJumpToTab ? (
                    <button
                      key={rule.field}
                      type="button"
                      onClick={() => handleJump(rule.tab, rule.field)}
                      className="w-full flex items-baseline gap-2 text-xs rounded-md px-1 py-0.5 hover:bg-white/[0.04] touch-manipulation transition-colors"
                    >
                      {RowContent}
                    </button>
                  ) : (
                    <div
                      key={rule.field}
                      className="flex items-baseline gap-2 text-xs"
                    >
                      {RowContent}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Warnings */}
      {totalWarnings > 0 && (
        <div className="border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => setShowWarnings((v) => !v)}
            className="w-full flex items-center gap-2 px-3 py-2 text-left touch-manipulation"
          >
            <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="text-xs text-white">
              {totalWarnings} recommendation{totalWarnings === 1 ? '' : 's'}
            </span>
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 text-white/40 ml-auto transition-transform',
                showWarnings && 'rotate-180'
              )}
            />
          </button>
          {showWarnings && (
            <div className="divide-y divide-white/[0.04]">
              {Array.from(warningGroups.entries()).map(([tab, rules]) => (
                <div key={tab} className="px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1.5">
                    {EICR_TAB_LABEL[tab]}
                  </p>
                  <div className="space-y-1">
                    {rules.map((rule) => {
                      const RowContent = (
                        <>
                          <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                          <span className="text-white/80 flex-1 text-left">{rule.message}</span>
                        </>
                      );
                      return onJumpToTab ? (
                        <button
                          key={rule.field}
                          type="button"
                          onClick={() => handleJump(rule.tab, rule.field)}
                          className="w-full flex items-baseline gap-2 text-xs rounded-md px-1 py-0.5 hover:bg-white/[0.04] touch-manipulation transition-colors"
                        >
                          {RowContent}
                        </button>
                      ) : (
                        <div
                          key={rule.field}
                          className="flex items-baseline gap-2 text-xs"
                        >
                          {RowContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EICRValidationPanel;
