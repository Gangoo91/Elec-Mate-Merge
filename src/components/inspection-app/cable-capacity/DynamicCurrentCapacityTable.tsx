
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cableSizeOptions } from '@/types/cableTypes';
import { installationMethods } from '@/utils/regulationChecker/cableCapacityCalculator';
import { Zap, Info } from 'lucide-react';

interface CorrectionFactors {
  ambient: number;
  grouping: number;
  thermal: number;
}

const ambientTemperatureFactors = {
  25: 1.22, 30: 1.15, 35: 1.08, 40: 1.00, 45: 0.91, 50: 0.82, 55: 0.71, 60: 0.58
} as const;

const groupingFactors = {
  1: 1.00, 2: 0.80, 3: 0.70, 4: 0.65, 5: 0.60, 6: 0.57, 7: 0.54, 8: 0.52, 9: 0.50
} as const;

const thermalInsulationFactors = {
  none: 1.00, partial: 0.87, full: 0.78
} as const;

type AmbientTempKey = keyof typeof ambientTemperatureFactors;
type GroupingKey = keyof typeof groupingFactors;
type ThermalKey = keyof typeof thermalInsulationFactors;

export const DynamicCurrentCapacityTable = () => {
  const [selectedMethod, setSelectedMethod] = useState('method_c');
  const [ambientTemp, setAmbientTemp] = useState('40');
  const [groupingCount, setGroupingCount] = useState('1');
  const [thermalInsulation, setThermalInsulation] = useState('none');

  const getCorrectedCapacity = (baseCapacity: number): number => {
    const ambientTempNum = Number(ambientTemp) as AmbientTempKey;
    const groupingCountNum = Number(groupingCount) as GroupingKey;
    
    const ambientFactor = ambientTemperatureFactors[ambientTempNum] || 1.0;
    const groupingFactor = groupingFactors[groupingCountNum] || 1.0;
    const thermalFactor = thermalInsulationFactors[thermalInsulation as ThermalKey] || 1.0;
    const methodFactor = installationMethods[selectedMethod as keyof typeof installationMethods]?.factor || 1.0;
    
    return Math.round(baseCapacity * methodFactor * ambientFactor * groupingFactor * thermalFactor);
  };

  return (
    <Card className="bg-muted border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Dynamic Current Carrying Capacity
        </CardTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="text-sm text-white/80 mb-1 block">Installation Method</label>
            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
               <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(installationMethods).map(([key, method]) => (
                  <SelectItem key={key} value={key}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-white/80 mb-1 block">Ambient Temperature (°C)</label>
            <Select value={ambientTemp} onValueChange={setAmbientTemp}>
             <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(ambientTemperatureFactors).map(temp => (
                  <SelectItem key={temp} value={temp}>{temp}°C</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-white/80 mb-1 block">Circuits Grouped</label>
            <Select value={groupingCount} onValueChange={setGroupingCount}>
             <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(groupingFactors).map(count => (
                  <SelectItem key={count} value={count}>{count} circuit{count !== '1' ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-white/80 mb-1 block">Thermal Insulation</label>
            <Select value={thermalInsulation} onValueChange={setThermalInsulation}>
              <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="full">Fully Surrounded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-semibold">Correction Factors Applied</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
            <div className="text-white/80">
              Installation: <Badge variant="outline" className="ml-1 text-blue-400 border-blue-400">
                {installationMethods[selectedMethod as keyof typeof installationMethods]?.factor}
              </Badge>
            </div>
            <div className="text-white/80">
              Ambient: <Badge variant="outline" className="ml-1 text-orange-400 border-orange-400">
                {ambientTemperatureFactors[Number(ambientTemp) as AmbientTempKey] || 1.0}
              </Badge>
            </div>
            <div className="text-white/80">
              Grouping: <Badge variant="outline" className="ml-1 text-purple-400 border-purple-400">
                {groupingFactors[Number(groupingCount) as GroupingKey] || 1.0}
              </Badge>
            </div>
            <div className="text-white/80">
              Thermal: <Badge variant="outline" className="ml-1 text-green-400 border-green-400">
                {thermalInsulationFactors[thermalInsulation as ThermalKey] || 1.0}
              </Badge>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground">Cable Size</TableHead>
              <TableHead className="text-foreground">Base Capacity (A)</TableHead>
              <TableHead className="text-foreground">Corrected Capacity (A)</TableHead>
              <TableHead className="text-foreground">Derating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cableSizeOptions.slice(0, 10).map((cable) => {
              const correctedCapacity = getCorrectedCapacity(cable.currentCarryingCapacity);
              const derating = Math.round(((correctedCapacity / cable.currentCarryingCapacity) * 100));
              
              return (
                <TableRow key={cable.value}>
                  <TableCell className="text-foreground font-medium">{cable.label}</TableCell>
                  <TableCell className="text-white/80">{cable.currentCarryingCapacity}</TableCell>
                  <TableCell className="text-elec-yellow font-bold">{correctedCapacity}</TableCell>
                  <TableCell>
                    <Badge variant={derating >= 90 ? "default" : derating >= 70 ? "secondary" : "destructive"}>
                      {derating}%
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
