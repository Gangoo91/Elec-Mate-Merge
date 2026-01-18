import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';

interface RcdPreset {
  id: string;
  label: string;
  description: string;
  bsStandard: string;
  type: string;
  rating: string;
  ratingA: string;
}

const rcdPresets: RcdPreset[] = [
  {
    id: 'standard-domestic',
    label: 'Standard Domestic',
    description: 'Most common household circuits',
    bsStandard: 'BS EN 61008',
    type: 'AC',
    rating: '30',
    ratingA: '40'
  },
  {
    id: 'high-sensitivity',
    label: 'High Sensitivity',
    description: 'Bathrooms, outdoor sockets',
    bsStandard: 'BS EN 61008',
    type: 'A',
    rating: '10',
    ratingA: '40'
  },
  {
    id: 'ev-shower',
    label: 'EV Charger / Shower',
    description: 'High current Type A',
    bsStandard: 'BS EN 61008',
    type: 'A',
    rating: '30',
    ratingA: '63'
  },
  {
    id: 'industrial',
    label: 'Industrial',
    description: 'Variable speed drives, IT equipment',
    bsStandard: 'BS EN 61008',
    type: 'B',
    rating: '30',
    ratingA: '63'
  },
  {
    id: 'time-delay',
    label: 'Time Delay (S-Type)',
    description: 'Discrimination with downstream RCDs',
    bsStandard: 'BS EN 61009',
    type: 'S',
    rating: '300',
    ratingA: '100'
  }
];

interface QuickRcdPresetsProps {
  testResults: Array<{ id: string; circuitDesignation: string }>;
  onApplyToCircuits: (circuitIds: string[], preset: RcdPreset) => void;
}

const QuickRcdPresets: React.FC<QuickRcdPresetsProps> = ({ testResults, onApplyToCircuits }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCircuits, setSelectedCircuits] = useState<Set<string>>(new Set());

  const toggleCircuit = (circuitId: string) => {
    const newSelected = new Set(selectedCircuits);
    if (newSelected.has(circuitId)) {
      newSelected.delete(circuitId);
    } else {
      newSelected.add(circuitId);
    }
    setSelectedCircuits(newSelected);
  };

  const selectAllCircuits = () => {
    setSelectedCircuits(new Set(testResults.map(r => r.id)));
  };

  const clearSelection = () => {
    setSelectedCircuits(new Set());
  };

  const handleApplyPreset = (preset: RcdPreset) => {
    const circuitIds = Array.from(selectedCircuits);
    
    if (circuitIds.length === 0) {
      toast.error("No Circuits Selected", {
        description: "Please select at least one circuit first",
      });
      return;
    }

    onApplyToCircuits(circuitIds, preset);
    
    toast.success(`✓ ${preset.label} Applied`, {
      description: `RCD details set for ${circuitIds.length} circuit${circuitIds.length > 1 ? 's' : ''}`,
      duration: 2000,
    });
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader 
        className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all touch-manipulation"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Quick RCD Presets</CardTitle>
          </div>
          <Button variant="ghost" size="sm">
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Circuit Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Select Circuits:</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={selectAllCircuits}
                  className="h-7 text-xs"
                >
                  All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearSelection}
                  className="h-7 text-xs"
                >
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {testResults.map(result => (
                <button
                  key={result.id}
                  onClick={() => toggleCircuit(result.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all touch-manipulation ${
                    selectedCircuits.has(result.id)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-accent text-accent-foreground hover:bg-accent/80'
                  }`}
                >
                  {result.circuitDesignation || `C${result.id}`}
                </button>
              ))}
            </div>
          </div>

          {/* RCD Preset Cards */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">Choose Preset:</p>
            <div className="grid grid-cols-1 gap-2">
              {rcdPresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  disabled={selectedCircuits.size === 0}
                  className="w-full p-4 rounded-lg border-2 border-border bg-card hover:border-primary hover:bg-accent/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {preset.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {preset.description}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {preset.bsStandard}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          Type {preset.type}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {preset.rating}mA
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {preset.ratingA}A
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default QuickRcdPresets;
