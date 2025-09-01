import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Settings, TrendingUp, RotateCw, AlertCircle, Info, Zap } from "lucide-react";

interface RingCircuitFormProps {
  readings: {
    endToEndLive: string;
    endToEndNeutral: string;
    endToEndCpc: string;
    liveToNeutral: string;
    liveToCpc: string;
    neutralToCpc: string;
  };
  cableType: string;
  cableLength: string;
  temperature: string;
  errors: { [key: string]: string };
  onInputChange: (field: string, value: string) => void;
  onCableTypeChange: (value: string) => void;
  onCableLengthChange: (value: string) => void;
  onTemperatureChange: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  hasResults: boolean;
}

const RingCircuitForm: React.FC<RingCircuitFormProps> = ({
  readings,
  cableType,
  cableLength,
  temperature,
  errors,
  onInputChange,
  onCableTypeChange,
  onCableLengthChange,
  onTemperatureChange,
  onCalculate,
  onReset,
  hasResults
}) => {
  const hasAllReadings = Object.values(readings).every(value => value.trim() !== "");

  const handleCalculate = () => {
    onCalculate();
    // Auto-scroll to results after calculation
    setTimeout(() => {
      const resultsElement = document.getElementById('calculator-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg sm:text-xl">Ring Final Circuit Calculator</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs self-start sm:self-auto border-elec-yellow/30 text-elec-yellow">
              BS 7671:2018
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cable Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-elec-yellow" />
              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow">Cable Settings (Optional)</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cable-type" className="text-sm font-medium">Cable Type</Label>
                <Select value={cableType} onValueChange={onCableTypeChange}>
                  <SelectTrigger className="mt-1 bg-elec-dark border-elec-yellow/20 h-11">
                    <SelectValue placeholder="Select cable type" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-yellow/20 z-50">
                    <SelectItem value="2.5mm-twin">2.5mm² Twin & Earth</SelectItem>
                    <SelectItem value="4mm-twin">4.0mm² Twin & Earth</SelectItem>
                    <SelectItem value="6mm-twin">6.0mm² Twin & Earth</SelectItem>
                    <SelectItem value="10mm-twin">10.0mm² Twin & Earth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="cable-length" className="text-sm font-medium flex items-center gap-2">
                  Total Cable Length (m)
                  {errors.cableLength && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="cable-length"
                  type="number"
                  step="1"
                  placeholder="e.g. 80"
                  value={cableLength}
                  onChange={(e) => onCableLengthChange(e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.cableLength && (
                  <p className="text-xs text-destructive mt-1">{errors.cableLength}</p>
                )}
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="temperature" className="text-sm font-medium flex items-center gap-2">
                  Test Temperature (°C)
                  {errors.temperature && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="temperature" 
                  type="number"
                  step="1"
                  value={temperature}
                  onChange={(e) => onTemperatureChange(e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.temperature && (
                  <p className="text-xs text-destructive mt-1">{errors.temperature}</p>
                )}
              </div>
            </div>

            <Alert className="bg-info/10 border-info/30">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-info text-sm">
                Cable settings enable comparison with theoretical values and temperature correction for more accurate analysis.
              </AlertDescription>
            </Alert>
          </div>

          <Separator className="bg-elec-yellow/20" />

          {/* End-to-End Readings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow">End-to-End Readings</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="end-to-end-live" className="text-sm font-medium flex items-center gap-2">
                  Live Conductor (Ω)
                  {errors.endToEndLive && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="end-to-end-live"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.20"
                  value={readings.endToEndLive}
                  onChange={(e) => onInputChange("endToEndLive", e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.endToEndLive && (
                  <p className="text-xs text-destructive mt-1">{errors.endToEndLive}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="end-to-end-neutral" className="text-sm font-medium flex items-center gap-2">
                  Neutral Conductor (Ω)
                  {errors.endToEndNeutral && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="end-to-end-neutral"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.20"
                  value={readings.endToEndNeutral}
                  onChange={(e) => onInputChange("endToEndNeutral", e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.endToEndNeutral && (
                  <p className="text-xs text-destructive mt-1">{errors.endToEndNeutral}</p>
                )}
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="end-to-end-cpc" className="text-sm font-medium flex items-center gap-2">
                  CPC (Earth) (Ω)
                  {errors.endToEndCpc && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="end-to-end-cpc"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.92"
                  value={readings.endToEndCpc}
                  onChange={(e) => onInputChange("endToEndCpc", e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.endToEndCpc && (
                  <p className="text-xs text-destructive mt-1">{errors.endToEndCpc}</p>
                )}
              </div>
            </div>
          </div>

          {/* Cross-Connected Readings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <RotateCw className="h-4 w-4 text-elec-yellow" />
              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow">Cross-Connected Readings</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="live-to-neutral" className="text-sm font-medium flex items-center gap-2">
                  Live to Neutral (Ω)
                  {errors.liveToNeutral && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="live-to-neutral"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 0.60"
                  value={readings.liveToNeutral}
                  onChange={(e) => onInputChange("liveToNeutral", e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.liveToNeutral && (
                  <p className="text-xs text-destructive mt-1">{errors.liveToNeutral}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="live-to-cpc" className="text-sm font-medium flex items-center gap-2">
                  Live to CPC (Ω)
                  {errors.liveToCpc && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="live-to-cpc"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.56"
                  value={readings.liveToCpc}
                  onChange={(e) => onInputChange("liveToCpc", e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.liveToCpc && (
                  <p className="text-xs text-destructive mt-1">{errors.liveToCpc}</p>
                )}
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="neutral-to-cpc" className="text-sm font-medium flex items-center gap-2">
                  Neutral to CPC (Ω)
                  {errors.neutralToCpc && <AlertCircle className="h-3 w-3 text-destructive" />}
                </Label>
                <Input
                  id="neutral-to-cpc"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.56"
                  value={readings.neutralToCpc}
                  onChange={(e) => onInputChange("neutralToCpc", e.target.value)}
                  className="mt-1 bg-elec-dark border-elec-yellow/20 h-11"
                />
                {errors.neutralToCpc && (
                  <p className="text-xs text-destructive mt-1">{errors.neutralToCpc}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleCalculate}
              disabled={!hasAllReadings}
              className="flex-1 h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Ring Circuit
            </Button>
            {hasResults && (
              <Button 
                variant="outline" 
                onClick={onReset}
                className="sm:w-auto border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Reset Calculator
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RingCircuitForm;