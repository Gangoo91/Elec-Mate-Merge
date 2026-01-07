import React from 'react';
import { Bookmark, ChevronRight, Shield, Wrench, ClipboardList, HardHat, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RiskBar } from './RiskBar';
import type { EnhancedRiskConsequence } from '@/data/hazards';

interface HazardCardV2Props {
  hazard: EnhancedRiskConsequence;
  index: number;
  isBookmarked: boolean;
  onTap: () => void;
  onBookmark: () => void;
  highlight?: string;
}

// Control hierarchy icons
const controlIcons: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  elimination: { icon: Ban, color: 'text-red-400', label: 'Eliminate' },
  substitution: { icon: Shield, color: 'text-orange-400', label: 'Substitute' },
  engineering: { icon: Wrench, color: 'text-yellow-400', label: 'Engineer' },
  administrative: { icon: ClipboardList, color: 'text-blue-400', label: 'Admin' },
  ppe: { icon: HardHat, color: 'text-green-400', label: 'PPE' },
};

// Get which control types are present
const getActiveControls = (controlMeasures: EnhancedRiskConsequence['controlMeasures']) => {
  return Object.entries(controlMeasures)
    .filter(([_, measures]) => measures && measures.length > 0)
    .map(([type]) => type);
};

// Highlight search term in text
const highlightText = (text: string, highlight?: string) => {
  if (!highlight) return text;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <mark key={i} className="bg-elec-yellow/30 text-white px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

// Count total control measures
const countControls = (controlMeasures: EnhancedRiskConsequence['controlMeasures']) => {
  return Object.values(controlMeasures).reduce(
    (acc, measures) => acc + (measures?.length || 0),
    0
  );
};

export const HazardCardV2: React.FC<HazardCardV2Props> = ({
  hazard,
  index,
  isBookmarked,
  onTap,
  onBookmark,
  highlight,
}) => {
  const activeControls = getActiveControls(hazard.controlMeasures);
  const totalControls = countControls(hazard.controlMeasures);

  return (
    <div
      className="animate-fade-in-up"
      style={{
        animationDelay: `${index * 40}ms`,
        opacity: 0,
      }}
    >
      <div
        onClick={onTap}
        className={cn(
          "bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4",
          "active:scale-[0.98] transition-all duration-200 cursor-pointer",
          "hover:border-white/[0.1] hover:bg-white/[0.04]"
        )}
      >
        <div className="flex items-start gap-3">
          {/* Risk Indicator */}
          <div className="pt-0.5">
            <RiskBar riskRating={hazard.riskRating} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-[15px] leading-tight pr-8">
              {highlightText(hazard.hazard, highlight)}
            </h3>
            <p className="text-sm text-white/50 mt-1.5 line-clamp-2 leading-relaxed">
              {highlightText(hazard.consequence, highlight)}
            </p>

            {/* Control Hierarchy Icons */}
            <div className="flex items-center gap-2 mt-3">
              {activeControls.map((control) => {
                const config = controlIcons[control];
                if (!config) return null;
                const Icon = config.icon;
                return (
                  <div
                    key={control}
                    className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center",
                      "bg-white/[0.05] border border-white/[0.08]"
                    )}
                    title={config.label}
                  >
                    <Icon className={cn("h-3.5 w-3.5", config.color)} />
                  </div>
                );
              })}
              <span className="text-xs text-white/40 ml-auto">
                {totalControls} control{totalControls !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Bookmark + Chevron */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark();
              }}
              className={cn(
                "p-1.5 -mr-1 rounded-lg transition-all",
                "hover:bg-white/[0.05] active:scale-90"
              )}
            >
              <Bookmark
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isBookmarked
                    ? "fill-elec-yellow text-elec-yellow"
                    : "text-white/30"
                )}
              />
            </button>
            <ChevronRight className="h-5 w-5 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardCardV2;
