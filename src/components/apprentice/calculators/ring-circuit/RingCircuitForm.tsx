import React from "react";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Settings, TrendingUp, RotateCw, Info, Zap, RotateCcw } from "lucide-react";

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
              <MobileSelect value={cableType} onValueChange={onCableTypeChange}>
                <MobileSelectTrigger label="Cable Type">
                  <MobileSelectValue placeholder="Select cable type" />
                </MobileSelectTrigger>
                <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
                  <MobileSelectItem value="2.5mm-twin">2.5mm² Twin & Earth</MobileSelectItem>
                  <MobileSelectItem value="4mm-twin">4.0mm² Twin & Earth</MobileSelectItem>
                  <MobileSelectItem value="6mm-twin">6.0mm² Twin & Earth</MobileSelectItem>
                  <MobileSelectItem value="10mm-twin">10.0mm² Twin & Earth</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
              
              <div>
                <MobileInput
                  id="cable-length"
                  label="Total Cable Length (m)"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 80"
                  value={cableLength}
                  onChange={(e) => onCableLengthChange(e.target.value)}
                  error={errors.cableLength}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <MobileInput
                  id="temperature"
                  label="Test Temperature (°C)"
                  type="text"
                  inputMode="numeric"
                  value={temperature}
                  onChange={(e) => onTemperatureChange(e.target.value)}
                  error={errors.temperature}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
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
                <MobileInput
                  id="end-to-end-live"
                  label="Live Conductor (Ω)"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1.20"
                  value={readings.endToEndLive}
                  onChange={(e) => onInputChange("endToEndLive", e.target.value)}
                  error={errors.endToEndLive}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
              </div>
              
              <div>
                <MobileInput
                  id="end-to-end-neutral"
                  label="Neutral Conductor (Ω)"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1.20"
                  value={readings.endToEndNeutral}
                  onChange={(e) => onInputChange("endToEndNeutral", e.target.value)}
                  error={errors.endToEndNeutral}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <MobileInput
                  id="end-to-end-cpc"
                  label="CPC (Earth) (Ω)"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1.92"
                  value={readings.endToEndCpc}
                  onChange={(e) => onInputChange("endToEndCpc", e.target.value)}
                  error={errors.endToEndCpc}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
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
                <MobileInput
                  id="live-to-neutral"
                  label="Live to Neutral (Ω)"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 0.60"
                  value={readings.liveToNeutral}
                  onChange={(e) => onInputChange("liveToNeutral", e.target.value)}
                  error={errors.liveToNeutral}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
              </div>
              
              <div>
                <MobileInput
                  id="live-to-cpc"
                  label="Live to CPC (Ω)"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1.56"
                  value={readings.liveToCpc}
                  onChange={(e) => onInputChange("liveToCpc", e.target.value)}
                  error={errors.liveToCpc}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <MobileInput
                  id="neutral-to-cpc"
                  label="Neutral to CPC (Ω)"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1.56"
                  value={readings.neutralToCpc}
                  onChange={(e) => onInputChange("neutralToCpc", e.target.value)}
                  error={errors.neutralToCpc}
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <MobileButton
              onClick={handleCalculate}
              disabled={!hasAllReadings}
              variant="elec"
              className="flex-1 min-h-[48px]"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Ring Circuit
            </MobileButton>
            {hasResults && (
              <MobileButton
                variant="elec-outline"
                onClick={onReset}
                className="min-h-[48px]"
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RingCircuitForm;