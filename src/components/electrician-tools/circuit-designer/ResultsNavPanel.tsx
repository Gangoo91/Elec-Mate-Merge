import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CircuitDesign } from '@/types/installation-design';
import { Search, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ResultsNavPanelProps {
  circuits: CircuitDesign[];
  selectedCircuit: number;
  onSelectCircuit: (index: number) => void;
}

export const ResultsNavPanel = ({
  circuits,
  selectedCircuit,
  onSelectCircuit
}: ResultsNavPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCircuits = circuits.filter(circuit => 
    circuit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    circuit.circuitNumber?.toString().includes(searchQuery)
  );

  const getCircuitStatus = (circuit: CircuitDesign) => {
    const warnings = circuit.warnings?.length || 0;
    if (warnings > 0) return 'warning';
    return 'success';
  };

  return (
    <Card className="h-full lg:sticky lg:top-4">
      <CardContent className="p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search circuits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        {/* Circuit List */}
        <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {filteredCircuits.map((circuit, index) => {
            const actualIndex = circuits.findIndex(c => c === circuit);
            const isSelected = actualIndex === selectedCircuit;
            const status = getCircuitStatus(circuit);

            return (
              <Button
                key={actualIndex}
                variant={isSelected ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onSelectCircuit(actualIndex)}
                className={cn(
                  "w-full justify-start h-auto py-2 px-3 font-normal",
                  isSelected && "bg-primary/10 border-l-2 border-l-primary"
                )}
              >
                <div className="flex items-start gap-2 w-full text-left">
                  <div className="flex-shrink-0 mt-0.5">
                    {status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {circuit.circuitNumber && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0">
                          {circuit.circuitNumber}
                        </Badge>
                      )}
                      <span className="text-sm font-medium truncate">
                        {circuit.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {circuit.cableSize}mm² • {circuit.protectionDevice?.rating}A
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="pt-3 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Circuits</span>
            <span className="font-semibold">{circuits.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              Compliant
            </span>
            <span className="font-semibold">
              {circuits.filter(c => !c.warnings || c.warnings.length === 0).length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              With Warnings
            </span>
            <span className="font-semibold">
              {circuits.filter(c => c.warnings && c.warnings.length > 0).length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
