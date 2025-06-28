
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Thermometer, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EnhancedCableSizingInputsProps {
  inputs: {
    current: string;
    length: string;
    installationType: string;
    cableType: string;
    ambientTemp?: string;
    cableGrouping?: string;
    loadType?: string;
    diversityFactor?: string;
  };
  errors: Record<string, string> | null;
  updateInput: (field: string, value: string) => void;
  setInstallationType: (type: string) => void;
  setCableType: (type: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
}

const EnhancedCableSizingInputs: React.FC<EnhancedCableSizingInputsProps> = ({
  inputs,
  errors,
  updateInput,
  setInstallationType,
  setCableType,
  calculateCableSize,
  resetCalculator,
}) => {
  return (
    <div className="space-y-6">
      {/* Primary Inputs */}
      <Card className="bg-elec-dark/30 border-elec-yellow/10">
        <CardHeader>
          <CardTitle className="text-sm text-elec-yellow flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Primary Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current">Design Current (A)</Label>
            <Input
              id="current"
              type="number"
              value={inputs.current}
              onChange={(e) => updateInput('current', e.target.value)}
              placeholder="Enter current in Amps"
              className={`bg-elec-dark border-elec-yellow/20 ${errors?.current ? 'border-red-500' : ''}`}
            />
            {errors?.current && <p className="text-red-400 text-xs mt-1">{errors.current}</p>}
          </div>

          <div>
            <Label htmlFor="length">Cable Length (m)</Label>
            <Input
              id="length"
              type="number"
              value={inputs.length}
              onChange={(e) => updateInput('length', e.target.value)}
              placeholder="Enter length in metres"
              className={`bg-elec-dark border-elec-yellow/20 ${errors?.length ? 'border-red-500' : ''}`}
            />
            {errors?.length && <p className="text-red-400 text-xs mt-1">{errors.length}</p>}
          </div>

          <div>
            <Label htmlFor="installation-type">Installation Method</Label>
            <Select value={inputs.installationType} onValueChange={setInstallationType}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select installation method" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="clipped-direct">Clipped Direct (Method C)</SelectItem>
                <SelectItem value="in-conduit">In Conduit (Method B)</SelectItem>
                <SelectItem value="in-trunking">In Trunking (Method B)</SelectItem>
                <SelectItem value="on-tray">On Cable Tray (Method E)</SelectItem>
                <SelectItem value="buried-direct">Buried Direct (Method D)</SelectItem>
                <SelectItem value="in-duct">In Underground Duct (Method D)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="cable-type">Cable Type</Label>
            <Select value={inputs.cableType} onValueChange={setCableType}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select cable type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="pvc">PVC Insulated</SelectItem>
                <SelectItem value="xlpe">XLPE Insulated</SelectItem>
                <SelectItem value="swa">SWA Armoured</SelectItem>
                <SelectItem value="lsf">Low Smoke & Fume</SelectItem>
                <SelectItem value="heat-resistant">Heat Resistant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Environmental & Real-World Factors */}
      <Card className="bg-elec-dark/30 border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Environmental Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
            <Input
              id="ambient-temp"
              type="number"
              value={inputs.ambientTemp || '30'}
              onChange={(e) => updateInput('ambientTemp', e.target.value)}
              placeholder="30"
              min="0"
              max="60"
              className="bg-elec-dark border-elec-yellow/20"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Standard: 30°C (BS 7671). Typical UK: 20-25°C
            </p>
          </div>

          <div>
            <Label htmlFor="cable-grouping">Cables in Group</Label>
            <Select value={inputs.cableGrouping || '1'} onValueChange={(value) => updateInput('cableGrouping', value)}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Number of cables" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="1">1 cable (no grouping)</SelectItem>
                <SelectItem value="2">2 cables</SelectItem>
                <SelectItem value="3">3 cables</SelectItem>
                <SelectItem value="4">4 cables</SelectItem>
                <SelectItem value="5">5-6 cables</SelectItem>
                <SelectItem value="7">7-9 cables</SelectItem>
                <SelectItem value="10">10+ cables</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              More cables = higher derating factor required
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Load Characteristics */}
      <Card className="bg-elec-dark/30 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-sm text-blue-400 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Load Characteristics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="load-type">Load Type</Label>
            <Select value={inputs.loadType || 'resistive'} onValueChange={(value) => updateInput('loadType', value)}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select load type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="resistive">Resistive (Heating, Lighting)</SelectItem>
                <SelectItem value="inductive">Inductive (Motors, Transformers)</SelectItem>
                <SelectItem value="capacitive">Capacitive (Power Factor Correction)</SelectItem>
                <SelectItem value="mixed">Mixed Load</SelectItem>
                <SelectItem value="non-linear">Non-Linear (LED, Switch Mode)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="diversity-factor">Diversity Factor</Label>
            <Input
              id="diversity-factor"
              type="number"
              step="0.1"
              min="0.1"
              max="1.0"
              value={inputs.diversityFactor || '1.0'}
              onChange={(e) => updateInput('diversityFactor', e.target.value)}
              placeholder="1.0"
              className="bg-elec-dark border-elec-yellow/20"
            />
            <p className="text-xs text-muted-foreground mt-1">
              0.1-1.0 (1.0 = 100% load, 0.7 = 70% typical domestic)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={calculateCableSize}
          className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Enhanced
        </Button>
        <Button 
          variant="outline" 
          onClick={resetCalculator}
          className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingInputs;
