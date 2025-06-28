
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { History, RotateCcw, Trash2, Star, StarOff, Clock } from "lucide-react";
import { format } from 'date-fns';

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

interface CalculationHistoryRef {
  saveCalculation: (inputs: any, results: any, isValid: boolean) => void;
}

const CalculationHistory = forwardRef<CalculationHistoryRef, CalculationHistoryProps>(({
  calculatorType,
  onRestoreCalculation
}, ref) => {
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [calculatorType]);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem(`calc_history_${calculatorType}`);
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
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
      isValid
    };

    const updatedHistory = [newEntry, ...history.slice(0, 19)]; // Keep last 20
    setHistory(updatedHistory);
    
    localStorage.setItem(
      `calc_history_${calculatorType}`,
      JSON.stringify(updatedHistory)
    );
  };

  // Expose saveCalculation method through ref
  useImperativeHandle(ref, () => ({
    saveCalculation
  }));

  const toggleBookmark = (id: string) => {
    const updatedHistory = history.map(entry =>
      entry.id === id ? { ...entry, isBookmarked: !entry.isBookmarked } : entry
    );
    setHistory(updatedHistory);
    localStorage.setItem(
      `calc_history_${calculatorType}`,
      JSON.stringify(updatedHistory)
    );
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(`calc_history_${calculatorType}`);
  };

  const displayedHistory = showAll ? history : history.slice(0, 5);
  const bookmarkedHistory = history.filter(entry => entry.isBookmarked);

  const formatInputsDisplay = (inputs: any) => {
    const keyMappings: { [key: string]: string } = {
      voltage: 'V',
      current: 'A',
      power: 'W',
      activePower: 'W',
      apparentPower: 'VA',
      length: 'm',
      resistance: 'Ω'
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
      <Alert className="border-blue-500/20 bg-blue-500/10">
        <History className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          Your calculation history will appear here as you perform calculations.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="h-4 w-4" />
            Calculation History
          </CardTitle>
          <div className="flex gap-2">
            {history.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `Show All (${history.length})`}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Bookmarked calculations */}
          {bookmarkedHistory.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-elec-yellow mb-2 flex items-center gap-1">
                <Star className="h-3 w-3" />
                Bookmarked
              </h4>
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

          {/* Recent calculations */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Recent
            </h4>
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
      </CardContent>
    </Card>
  );
});

CalculationHistory.displayName = 'CalculationHistory';

const HistoryEntry: React.FC<{
  entry: CalculationEntry;
  onRestore: () => void;
  onToggleBookmark: () => void;
  formatInputsDisplay: (inputs: any) => string;
}> = ({ entry, onRestore, onToggleBookmark, formatInputsDisplay }) => {
  return (
    <div className="flex items-center justify-between p-2 rounded border border-elec-yellow/10 bg-elec-dark/50">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge 
            variant={entry.isValid ? "default" : "destructive"} 
            className="text-xs"
          >
            {entry.isValid ? 'Valid' : 'Invalid'}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {format(entry.timestamp, 'MMM dd, HH:mm')}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {formatInputsDisplay(entry.inputs)}
        </p>
      </div>
      <div className="flex gap-1 ml-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleBookmark}
          className="h-6 w-6 p-0"
        >
          {entry.isBookmarked ? (
            <Star className="h-3 w-3 text-elec-yellow fill-current" />
          ) : (
            <StarOff className="h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRestore}
          className="h-6 w-6 p-0"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CalculationHistory;
export type { CalculationEntry };
