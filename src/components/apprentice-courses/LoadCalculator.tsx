import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, Plus, X, Lightbulb, Zap } from 'lucide-react';

interface Appliance {
  id: string;
  name: string;
  power: number;
  quantity: number;
  type: 'lighting' | 'socket' | 'heating' | 'motor' | 'other';
}

interface CableRecommendation {
  size: string;
  current: number;
  method: string;
}

const diversityFactors = {
  lighting: 0.9,
  socket: 0.4,
  heating: 1.0,
  motor: 0.8,
  other: 0.7
};

const cableData: CableRecommendation[] = [
  { size: '1.0mm²', current: 13, method: 'Method C (clipped direct)' },
  { size: '1.5mm²', current: 16, method: 'Method C (clipped direct)' },
  { size: '2.5mm²', current: 23, method: 'Method C (clipped direct)' },
  { size: '4.0mm²', current: 31, method: 'Method C (clipped direct)' },
  { size: '6.0mm²', current: 41, method: 'Method C (clipped direct)' },
  { size: '10.0mm²', current: 57, method: 'Method C (clipped direct)' },
  { size: '16.0mm²', current: 76, method: 'Method C (clipped direct)' }
];

export const LoadCalculator = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [voltage, setVoltage] = useState<number>(230);
  const [calculated, setCalculated] = useState(false);
  const [newAppliance, setNewAppliance] = useState({
    name: '',
    power: '',
    quantity: '1',
    type: 'other' as const
  });

  const addAppliance = useCallback(() => {
    if (newAppliance.name && newAppliance.power) {
      const appliance: Appliance = {
        id: Math.random().toString(36).substr(2, 9),
        name: newAppliance.name,
        power: parseFloat(newAppliance.power),
        quantity: parseInt(newAppliance.quantity),
        type: newAppliance.type
      };
      setAppliances(prev => [...prev, appliance]);
      setNewAppliance({ name: '', power: '', quantity: '1', type: 'other' });
      setCalculated(false); // Reset calculations when adding new appliance
    }
  }, [newAppliance]);

  const removeAppliance = useCallback((id: string) => {
    setAppliances(prev => prev.filter(a => a.id !== id));
    setCalculated(false); // Reset calculations when removing appliance
  }, []);

  const handleCalculate = useCallback(() => {
    if (appliances.length > 0) {
      setCalculated(true);
    }
  }, [appliances]);

  const resetCalculator = useCallback(() => {
    setAppliances([]);
    setCalculated(false);
  }, []);

  const calculations = useCallback(() => {
    let totalConnectedLoad = 0;
    let totalMaximumDemand = 0;
    
    const breakdownByType: Record<string, { connected: number; demand: number; count: number }> = {};

    appliances.forEach(appliance => {
      const connected = appliance.power * appliance.quantity;
      const diversity = diversityFactors[appliance.type];
      const demand = connected * diversity;

      totalConnectedLoad += connected;
      totalMaximumDemand += demand;

      if (!breakdownByType[appliance.type]) {
        breakdownByType[appliance.type] = { connected: 0, demand: 0, count: 0 };
      }
      breakdownByType[appliance.type].connected += connected;
      breakdownByType[appliance.type].demand += demand;
      breakdownByType[appliance.type].count += appliance.quantity;
    });

    const current = totalMaximumDemand / voltage;
    const designCurrent = current * 1.25; // 25% safety margin
    const recommendedCable = cableData.find(cable => cable.current >= designCurrent) || cableData[cableData.length - 1];
    const recommendedMCB = current <= 6 ? 6 : current <= 10 ? 10 : current <= 16 ? 16 : current <= 20 ? 20 : current <= 25 ? 25 : current <= 32 ? 32 : current <= 40 ? 40 : 50;
    
    // Calculate voltage drop for recommended cable (rough estimate)
    const cableResistance = {
      '1.0mm²': 18.1,
      '1.5mm²': 12.1,
      '2.5mm²': 7.41,
      '4.0mm²': 4.61,
      '6.0mm²': 3.08,
      '10.0mm²': 1.83,
      '16.0mm²': 1.15
    };
    
    const resistance = cableResistance[recommendedCable.size as keyof typeof cableResistance] || 1.83;
    const voltageDrop = (current * resistance * 20) / 1000; // Assume 20m run
    const voltageDropPercent = (voltageDrop / voltage) * 100;

    return {
      totalConnectedLoad: totalConnectedLoad / 1000,
      totalMaximumDemand: totalMaximumDemand / 1000,
      current: current,
      designCurrent: designCurrent,
      recommendedCable,
      recommendedMCB,
      breakdownByType,
      diversityApplied: ((totalConnectedLoad - totalMaximumDemand) / totalConnectedLoad * 100) || 0,
      voltageDrop,
      voltageDropPercent
    };
  }, [appliances, voltage]);

  const results = calculations();

  return (
    <Card className="mb-8 p-6 bg-card border-border/20">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-foreground" />
        <h3 className="text-xl font-semibold text-foreground">Try It: Load Calculator</h3>
        <Badge variant="secondary">Interactive Tool</Badge>
      </div>

      {/* Add Appliance Form */}
      <div className="space-y-4 mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="col-span-1">
            <Label htmlFor="appliance-name">Appliance Name</Label>
            <Input
              id="appliance-name"
              placeholder="e.g. Immersion Heater"
              value={newAppliance.name}
              onChange={(e) => setNewAppliance(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="appliance-power">Power (W)</Label>
            <Input
              id="appliance-power"
              type="number"
              placeholder="3000"
              value={newAppliance.power}
              onChange={(e) => setNewAppliance(prev => ({ ...prev, power: e.target.value }))}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="appliance-quantity">Quantity</Label>
            <Input
              id="appliance-quantity"
              type="number"
              min="1"
              value={newAppliance.quantity}
              onChange={(e) => setNewAppliance(prev => ({ ...prev, quantity: e.target.value }))}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="appliance-type">Type</Label>
            <Select value={newAppliance.type} onValueChange={(value) => setNewAppliance(prev => ({ ...prev, type: value as any }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lighting">Lighting (90% diversity)</SelectItem>
                <SelectItem value="socket">Socket Outlet (40% diversity)</SelectItem>
                <SelectItem value="heating">Heating (100% diversity)</SelectItem>
                <SelectItem value="motor">Motor (80% diversity)</SelectItem>
                <SelectItem value="other">Other (70% diversity)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1">
            <Label className="block">&nbsp;</Label>
            <Button onClick={addAppliance} className="w-full" disabled={!newAppliance.name || !newAppliance.power}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Supply Voltage */}
      <div className="mb-6">
        <Label htmlFor="voltage">Supply Voltage (V)</Label>
        <Select value={voltage.toString()} onValueChange={(value) => setVoltage(parseInt(value))}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="230">230V (Single Phase)</SelectItem>
            <SelectItem value="400">400V (Three Phase)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appliance List */}
      {appliances.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3">Added Appliances</h4>
          <div className="space-y-2">
            {appliances.map(appliance => (
              <div key={appliance.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/30 rounded gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="font-medium">{appliance.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{appliance.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {appliance.power}W × {appliance.quantity} = {appliance.power * appliance.quantity}W
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeAppliance(appliance.id)} className="self-end sm:self-center">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calculate Button */}
      {appliances.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Button onClick={handleCalculate} className="bg-primary hover:bg-primary/90">
            <Calculator className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Calculate Load & Cable Requirements</span>
            <span className="sm:hidden">Calculate</span>
          </Button>
          <Button onClick={resetCalculator} variant="outline">
            Reset Calculator
          </Button>
        </div>
      )}

      {/* Results */}
      {calculated && appliances.length > 0 && (
        <div className="space-y-6">
          <Separator />
          
          <div className="space-y-6">
            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Load Calculations
              </h4>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border/20 last:border-b-0">
                  <span className="text-sm sm:text-base">Total Connected Load:</span>
                  <span className="font-medium text-lg sm:text-base">{results.totalConnectedLoad.toFixed(2)} kW</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border/20 last:border-b-0">
                  <span className="text-sm sm:text-base">Maximum Demand (after diversity):</span>
                  <span className="font-medium text-primary text-lg sm:text-base">{results.totalMaximumDemand.toFixed(2)} kW</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border/20 last:border-b-0">
                  <span className="text-sm sm:text-base">Design Current (with 25% margin):</span>
                  <span className="font-medium text-lg sm:text-base">{results.designCurrent.toFixed(1)} A</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border/20 last:border-b-0">
                  <span className="text-sm sm:text-base">Design Current:</span>
                  <span className="font-medium text-primary text-lg sm:text-base">{results.current.toFixed(1)} A</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border/20 last:border-b-0">
                  <span className="text-sm sm:text-base">Voltage Drop (20m run):</span>
                  <span className="font-medium text-lg sm:text-base">{results.voltageDrop.toFixed(2)}V ({results.voltageDropPercent.toFixed(1)}%)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2">
                  <span className="text-sm text-muted-foreground">Diversity Applied:</span>
                  <span className="text-sm text-muted-foreground">{results.diversityApplied.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Recommendations
              </h4>
              <div className="space-y-4">
                <div className="bg-background/50 p-3 rounded border">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-sm text-muted-foreground">Cable Size:</span>
                    <div className="text-right">
                      <div className="font-medium text-primary text-xl">{results.recommendedCable.size}</div>
                      <div className="text-xs text-muted-foreground">Capacity: {results.recommendedCable.current}A</div>
                    </div>
                  </div>
                </div>
                <div className="bg-background/50 p-3 rounded border">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-sm text-muted-foreground">MCB Rating:</span>
                    <div className="font-medium text-primary text-xl text-right">{results.recommendedMCB}A</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 rounded">
                  <strong>Note:</strong> Based on Method C installation. Consider derating factors for final design.
                </div>
              </div>
            </div>
          </div>

          {/* Diversity Breakdown */}
          {Object.keys(results.breakdownByType).length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-3">Load Breakdown by Type</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(results.breakdownByType).map(([type, data]) => (
                  <div key={type} className="p-3 bg-muted/30 rounded">
                    <div className="font-medium capitalize mb-2">{type}</div>
                    <div className="text-sm space-y-1">
                      <div>Connected: {(data.connected / 1000).toFixed(2)} kW</div>
                      <div>After Diversity: {(data.demand / 1000).toFixed(2)} kW</div>
                      <div className="text-xs text-muted-foreground">
                        Diversity: {(diversityFactors[type as keyof typeof diversityFactors] * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};