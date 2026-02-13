import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface RiskMatrixVisualProps {
  hazards: any[];
  onRiskLevelClick: (minScore: number, maxScore: number) => void;
}

export const RiskMatrixVisual = ({ hazards, onRiskLevelClick }: RiskMatrixVisualProps) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  // Calculate hazard counts per cell
  const getCellCount = (likelihood: number, severity: number): number => {
    const score = likelihood * severity;
    return hazards.filter(h => {
      const hazardScore = h.likelihood * h.severity;
      return hazardScore === score;
    }).length;
  };

  const getCellColor = (score: number): string => {
    if (score >= 15) return 'bg-red-500/80 hover:bg-red-500 border-red-600';
    if (score >= 12) return 'bg-orange-500/80 hover:bg-orange-500 border-orange-600';
    if (score >= 6) return 'bg-amber-500/80 hover:bg-amber-500 border-amber-600';
    return 'bg-green-500/80 hover:bg-green-500 border-green-600';
  };

  const handleCellClick = (likelihood: number, severity: number) => {
    const score = likelihood * severity;
    const cellKey = `${likelihood}-${severity}`;
    setSelectedCell(cellKey);
    onRiskLevelClick(score, score);
  };

  return (
    <div className="bg-elec-card/50 rounded-lg border border-border/50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold mb-1">Risk Matrix</h3>
        <p className="text-xs text-white">Click cells to filter hazards by risk level</p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Matrix Grid */}
          <div className="grid grid-cols-6 gap-1 text-xs">
            {/* Header Row */}
            <div className="text-center font-semibold py-2"></div>
            {[1, 2, 3, 4, 5].map(sev => (
              <div key={sev} className="text-center font-semibold py-2 text-white">
                {sev}
              </div>
            ))}

            {/* Rows */}
            {[5, 4, 3, 2, 1].map(likelihood => (
              <>
                <div key={`label-${likelihood}`} className="text-right font-semibold py-2 pr-2 text-white">
                  {likelihood}
                </div>
                {[1, 2, 3, 4, 5].map(severity => {
                  const score = likelihood * severity;
                  const count = getCellCount(likelihood, severity);
                  const cellKey = `${likelihood}-${severity}`;
                  const isSelected = selectedCell === cellKey;
                  
                  return (
                    <button
                      key={cellKey}
                      onClick={() => handleCellClick(likelihood, severity)}
                      className={`
                        ${getCellColor(score)}
                        ${isSelected ? 'ring-2 ring-elec-yellow ring-offset-2 ring-offset-background' : ''}
                        aspect-square rounded border-2 flex items-center justify-center
                        transition-all hover:scale-105 cursor-pointer
                        font-semibold text-foreground
                      `}
                    >
                      <div className="text-center">
                        <div className="text-lg leading-none">{score}</div>
                        {count > 0 && (
                          <div className="text-[10px] leading-none mt-0.5 opacity-90">
                            {count}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </>
            ))}
          </div>

          {/* Labels */}
          <div className="grid grid-cols-6 gap-1 mt-2">
            <div></div>
            <div className="col-span-5 text-center text-xs font-semibold text-white">
              SEVERITY →
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            <div className="text-xs font-semibold text-white text-right pr-2">
              ← LIKELIHOOD
            </div>
            <div className="col-span-5"></div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border/30">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/80 border border-red-600"></div>
            <span className="text-white">Very High (15-25)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500/80 border border-orange-600"></div>
            <span className="text-white">High (12-14)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500/80 border border-amber-600"></div>
            <span className="text-white">Medium (6-11)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500/80 border border-green-600"></div>
            <span className="text-white">Low (1-5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
