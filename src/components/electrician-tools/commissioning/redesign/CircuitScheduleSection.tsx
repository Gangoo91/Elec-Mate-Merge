import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';

interface Circuit {
  circuitNumber: number;
  circuitName: string;
  cableSize: string;
  protectionDevice: string;
  expectedR1R2?: string;
  maxZs?: string;
  testMethod?: string;
}

interface CircuitScheduleSectionProps {
  circuits: Circuit[];
}

export const CircuitScheduleSection = ({ circuits }: CircuitScheduleSectionProps) => {
  const [expandedCircuit, setExpandedCircuit] = useState<number | null>(null);

  if (!circuits || circuits.length === 0) return null;

  return (
    <div className="space-y-4">
      <Card className="bg-card border-elec-yellow/20 hover:border-elec-yellow/30">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-elec-yellow shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Circuit Schedule</h2>
          </div>
          <p className="text-sm text-white/70 mt-2">
            {circuits.length} circuits to test
          </p>
        </div>
      </Card>

      <div className="space-y-2">
        {circuits.map((circuit) => {
          const isExpanded = expandedCircuit === circuit.circuitNumber;
          
          return (
            <Card
              key={circuit.circuitNumber}
              className={`transition-all ${
                isExpanded
                  ? 'bg-card border-elec-yellow'
                  : 'bg-card/80 border-border/40 hover:border-elec-yellow/30'
              }`}
            >
              <button
                onClick={() => setExpandedCircuit(isExpanded ? null : circuit.circuitNumber)}
                className="w-full p-4 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-bold">
                  {circuit.circuitNumber}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    {circuit.circuitName}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {circuit.cableSize}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {circuit.protectionDevice}
                    </Badge>
                  </div>
                </div>

                <div className="text-white/40 shrink-0">
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-elec-yellow/20">
                  {circuit.expectedR1R2 && (
                    <div className="flex justify-between items-start pt-3">
                      <span className="text-sm text-white/60">Expected R1+R2:</span>
                      <span className="text-sm text-white font-medium text-right">{circuit.expectedR1R2}</span>
                    </div>
                  )}
                  
                  {circuit.maxZs && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-white/60">Max Zs:</span>
                      <span className="text-sm text-elec-yellow font-medium text-right">{circuit.maxZs}</span>
                    </div>
                  )}
                  
                  {circuit.testMethod && (
                    <div className="bg-background/50 rounded-lg p-3 mt-2">
                      <div className="text-xs text-white/60 mb-1">Test Method:</div>
                      <div className="text-sm text-white">{circuit.testMethod}</div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
