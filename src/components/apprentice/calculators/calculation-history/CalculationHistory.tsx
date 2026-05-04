import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { History, RotateCcw, Trash2, Star, StarOff, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

interface CalculationEntry {
  id: string;
  calculatorType: string;
  inputs: { [key: string]: any };
  results: { [key: string]: any };
  timestamp: Date;
  isBookmarked: boolean;
  isValid: boolean;
}

interface CalculationHistoryProps {
  calculatorType: string;
  onRestoreCalculation: (entry: CalculationEntry) => void;
}

const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  calculatorType,
  onRestoreCalculation,
}) => {
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [calculatorType]);

  const loadHistory = () => {
    const parsed = storageGetJSONSync<any[]>(`calc_history_${calculatorType}`, []);
    if (parsed.length > 0) {
      setHistory(
        parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }))
      );
    }
  };

  const saveCalculation = (inputs: any, results: any, isValid: boolean) => {
    const newEntry: CalculationEntry = {
      id: Date.now().toString(),
      calculatorType,
      inputs,
      results,
      timestamp: new Date(),
      isBookmarked: false,
      isValid,
    };

    const updatedHistory = [newEntry, ...history.slice(0, 19)]; // Keep last 20
    setHistory(updatedHistory);

    storageSetJSONSync(`calc_history_${calculatorType}`, updatedHistory);
  };

  const toggleBookmark = (id: string) => {
    const updatedHistory = history.map((entry) =>
      entry.id === id ? { ...entry, isBookmarked: !entry.isBookmarked } : entry
    );
    setHistory(updatedHistory);
    storageSetJSONSync(`calc_history_${calculatorType}`, updatedHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    storageRemoveSync(`calc_history_${calculatorType}`);
  };

  const displayedHistory = showAll ? history : history.slice(0, 5);
  const bookmarkedHistory = history.filter((entry) => entry.isBookmarked);

  // Expose saveCalculation method
  React.useImperativeHandle(React.createRef(), () => ({
    saveCalculation,
  }));

  const formatInputsDisplay = (inputs: any) => {
    const keyMappings: { [key: string]: string } = {
      voltage: 'V',
      current: 'A',
      power: 'W',
      activePower: 'W',
      apparentPower: 'VA',
      length: 'm',
      resistance: 'Ω',
    };

    return Object.entries(inputs)
      .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
      .slice(0, 3)
      .map(([key, value]) => {
        const unit = keyMappings[key] || '';
        return `${key}: ${value}${unit}`;
      })
      .join(', ');
  };

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          History
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed mt-2">
          Your calculation history will appear here as you perform calculations.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Calculation history
        </span>
        <div className="flex gap-2">
          {history.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="h-9 text-[12px] text-white/85 hover:bg-white/[0.05] touch-manipulation"
            >
              {showAll ? 'Show less' : `Show all (${history.length})`}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="h-9 text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {bookmarkedHistory.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              <Star className="h-3 w-3" />
              <span>Bookmarked</span>
            </div>
            {bookmarkedHistory.map((entry) => (
              <HistoryEntry
                key={`bookmarked-${entry.id}`}
                entry={entry}
                onRestore={() => onRestoreCalculation(entry)}
                onToggleBookmark={() => toggleBookmark(entry.id)}
                formatInputsDisplay={formatInputsDisplay}
              />
            ))}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            <Clock className="h-3 w-3" />
            <span>Recent</span>
          </div>
          {displayedHistory.map((entry) => (
            <HistoryEntry
              key={entry.id}
              entry={entry}
              onRestore={() => onRestoreCalculation(entry)}
              onToggleBookmark={() => toggleBookmark(entry.id)}
              formatInputsDisplay={formatInputsDisplay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HistoryEntry: React.FC<{
  entry: CalculationEntry;
  onRestore: () => void;
  onToggleBookmark: () => void;
  formatInputsDisplay: (inputs: any) => string;
}> = ({ entry, onRestore, onToggleBookmark, formatInputsDisplay }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
            {entry.isValid ? 'Valid' : 'Invalid'}
          </span>
          <span className="text-[11px] text-white/55 font-mono">
            {format(entry.timestamp, 'MMM dd, HH:mm')}
          </span>
        </div>
        <p className="text-[12px] text-white/85 truncate">{formatInputsDisplay(entry.inputs)}</p>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleBookmark}
          className="h-9 w-9 p-0 text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
        >
          {entry.isBookmarked ? (
            <Star className="h-4 w-4 text-elec-yellow fill-current" />
          ) : (
            <StarOff className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRestore}
          className="h-9 w-9 p-0 text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalculationHistory;
export type { CalculationEntry };
