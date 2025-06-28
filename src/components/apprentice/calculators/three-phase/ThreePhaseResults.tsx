
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ThreePhaseResultsProps {
  results: any;
}

const ThreePhaseResults: React.FC<ThreePhaseResultsProps> = ({ results }) => {
  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>Enter values and click Calculate to see results</p>
      </div>
    );
  }

  const formatValue = (value: number, unit: string, decimals: number = 2) => {
    return `${value.toFixed(decimals)} ${unit}`;
  };

  const getStatusBadge = (value: number, thresholds: {good: number, warning: number}) => {
    if (value <= thresholds.good) return <Badge variant="default">Good</Badge>;
    if (value <= thresholds.warning) return <Badge variant="secondary">Acceptable</Badge>;
    return <Badge variant="destructive">Check Required</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-elec-yellow mb-2">Three Phase Analysis</h3>
        
        {/* Current Results */}
        <div className="space-y-3">
          <div className="bg-elec-gray/50 p-3 rounded">
            <div className="text-2xl font-bold text-elec-yellow">
              {formatValue(results.lineCurrent, 'A')}
            </div>
            <div className="text-sm text-muted-foreground">Line Current</div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-elec-dark/50 p-2 rounded">
              <div className="font-medium">{formatValue(results.phaseCurrent, 'A')}</div>
              <div className="text-xs text-muted-foreground">Phase Current</div>
            </div>
            <div className="bg-elec-dark/50 p-2 rounded">
              <div className="font-medium">{formatValue(results.phaseVoltage, 'V')}</div>
              <div className="text-xs text-muted-foreground">Phase Voltage</div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Power Analysis */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Power Analysis</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between items-center">
              <span>Apparent Power:</span>
              <span className="font-medium">{formatValue(results.apparentPower, 'kVA')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Reactive Power:</span>
              <span className="font-medium">{formatValue(results.reactivePower, 'kVAR')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Power per Phase:</span>
              <span className="font-medium">{formatValue(results.powerPerPhase, 'kW')}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* System Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">System Status</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Current Density:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{formatValue(results.currentDensity, 'A/mm²')}</span>
                {getStatusBadge(results.currentDensity, {good: 4, warning: 6})}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs">Load Balance:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{formatValue(results.unbalance, '%')}</span>
                {getStatusBadge(results.unbalance, {good: 2, warning: 5})}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs">Power Factor:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">{formatValue(results.powerFactor * 100, '%')}</span>
                {getStatusBadge((1 - results.powerFactor) * 100, {good: 15, warning: 25})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreePhaseResults;
