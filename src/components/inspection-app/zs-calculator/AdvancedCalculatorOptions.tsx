
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Thermometer, AlertTriangle } from 'lucide-react';
import { TEMPERATURE_CORRECTION_FACTORS } from '@/utils/zsCalculations';

interface AdvancedOptionsProps {
  additionalResistances: number;
  onAdditionalResistancesChange: (value: number) => void;
  temperatureCorrection: boolean;
  onTemperatureCorrectionChange: (enabled: boolean) => void;
  conductorMaterial: 'copper' | 'aluminium';
  onConductorMaterialChange: (material: 'copper' | 'aluminium') => void;
  operatingTemperature: number;
  onOperatingTemperatureChange: (temp: number) => void;
}

export const AdvancedCalculatorOptions: React.FC<AdvancedOptionsProps> = ({
  additionalResistances,
  onAdditionalResistancesChange,
  temperatureCorrection,
  onTemperatureCorrectionChange,
  conductorMaterial,
  onConductorMaterialChange,
  operatingTemperature,
  onOperatingTemperatureChange
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const temperatureOptions = Object.keys(TEMPERATURE_CORRECTION_FACTORS.copper).map(temp => ({
    value: parseInt(temp),
    label: `${temp}°C`
  }));

  const correctionFactor = temperatureCorrection 
    ? TEMPERATURE_CORRECTION_FACTORS[conductorMaterial][operatingTemperature as keyof typeof TEMPERATURE_CORRECTION_FACTORS.copper] || 1.0
    : 1.0;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle 
          className="text-foreground flex items-center justify-between cursor-pointer"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Advanced Options
          </div>
          <Badge variant="outline" className="text-xs">
            {showAdvanced ? 'Hide' : 'Show'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      {showAdvanced && (
        <CardContent className="space-y-6">
          {/* Additional Resistances */}
          <div className="space-y-2">
            <Label htmlFor="additional-resistances" className="text-foreground">
              Additional Resistances (Ω)
            </Label>
            <Input
              id="additional-resistances"
              type="number"
              step="0.001"
              placeholder="e.g. 0.050"
              value={additionalResistances || ''}
              onChange={(e) => onAdditionalResistancesChange(parseFloat(e.target.value) || 0)}
              className="bg-muted border-border text-foreground"
            />
            <p className="text-xs text-white/70">
              Include bond conductor resistance, meter tails, etc.
            </p>
          </div>

          {/* Temperature Correction */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-blue-400" />
                <Label className="text-foreground">Temperature Correction</Label>
              </div>
              <Switch
                checked={temperatureCorrection}
                onCheckedChange={onTemperatureCorrectionChange}
              />
            </div>

            {temperatureCorrection && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-blue-400/30">
                <div className="space-y-2">
                  <Label className="text-foreground">Conductor Material</Label>
                  <Select value={conductorMaterial} onValueChange={onConductorMaterialChange}>
                    <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="copper" className="text-foreground">Copper</SelectItem>
                      <SelectItem value="aluminium" className="text-foreground">Aluminium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Operating Temperature</Label>
                  <Select 
                    value={operatingTemperature.toString()} 
                    onValueChange={(value) => onOperatingTemperatureChange(parseInt(value))}
                  >
                    <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray text-foreground">
                      {temperatureOptions.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value.toString()}
                          className="text-foreground"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">Temperature Factor</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Correction factor: <span className="font-bold text-elec-yellow">{correctionFactor}</span>
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Applied to R1+R2 values to account for conductor temperature effects
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AdvancedCalculatorOptions;
