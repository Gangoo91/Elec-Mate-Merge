import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, RotateCcw, Sun } from "lucide-react";

const SolarArrayCalculator = () => {
  const [panelWattage, setPanelWattage] = useState("");
  const [panelLength, setPanelLength] = useState("");
  const [panelWidth, setPanelWidth] = useState("");
  const [availableLength, setAvailableLength] = useState("");
  const [availableWidth, setAvailableWidth] = useState("");
  const [dailySunHours, setDailySunHours] = useState("");
  const [systemEfficiency, setSystemEfficiency] = useState("85");
  const [result, setResult] = useState<{
    panelsPerRow?: number;
    numberOfRows?: number;
    totalPanels?: number;
    totalWattage?: number;
    dailyGeneration?: number;
    monthlyGeneration?: number;
    yearlyGeneration?: number;
    usedArea?: number;
    areaEfficiency?: number;
  } | null>(null);

  const calculateSolarArray = () => {
    const panelW = parseFloat(panelWattage);
    const panelL = parseFloat(panelLength);
    const panelWd = parseFloat(panelWidth);
    const availL = parseFloat(availableLength);
    const availW = parseFloat(availableWidth);
    const sunHours = parseFloat(dailySunHours);
    const efficiency = parseFloat(systemEfficiency) / 100;

    if (!panelW || !panelL || !panelWd || !availL || !availW || !sunHours) return;

    // Calculate panel layout with 0.5m spacing
    const spacing = 0.5;
    const panelWithSpacing = panelL + spacing;
    const panelWidthWithSpacing = panelWd + spacing;

    const panelsPerRow = Math.floor(availL / panelWithSpacing);
    const numberOfRows = Math.floor(availW / panelWidthWithSpacing);
    const totalPanels = panelsPerRow * numberOfRows;
    const totalWattage = totalPanels * panelW;

    // Calculate generation
    const dailyGeneration = (totalWattage * sunHours * efficiency) / 1000; // kWh
    const monthlyGeneration = dailyGeneration * 30;
    const yearlyGeneration = dailyGeneration * 365;

    // Calculate area usage
    const usedArea = totalPanels * panelL * panelWd;
    const totalArea = availL * availW;
    const areaEfficiency = (usedArea / totalArea) * 100;

    setResult({
      panelsPerRow,
      numberOfRows,
      totalPanels,
      totalWattage,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration,
      usedArea,
      areaEfficiency
    });
  };

  const reset = () => {
    setPanelWattage("");
    setPanelLength("");
    setPanelWidth("");
    setAvailableLength("");
    setAvailableWidth("");
    setDailySunHours("");
    setSystemEfficiency("85");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-elec-yellow" />
          Solar Array Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            label="Panel Wattage"
            type="number"
            value={panelWattage}
            onChange={(e) => setPanelWattage(e.target.value)}
            placeholder="e.g., 400"
            unit="W"
          />
          <MobileInput
            label="Panel Length"
            type="number"
            value={panelLength}
            onChange={(e) => setPanelLength(e.target.value)}
            placeholder="e.g., 2.0"
            unit="m"
          />
          <MobileInput
            label="Panel Width"
            type="number"
            value={panelWidth}
            onChange={(e) => setPanelWidth(e.target.value)}
            placeholder="e.g., 1.0"
            unit="m"
          />
          <MobileInput
            label="Available Length"
            type="number"
            value={availableLength}
            onChange={(e) => setAvailableLength(e.target.value)}
            placeholder="e.g., 12"
            unit="m"
          />
          <MobileInput
            label="Available Width"
            type="number"
            value={availableWidth}
            onChange={(e) => setAvailableWidth(e.target.value)}
            placeholder="e.g., 8"
            unit="m"
          />
          <MobileInput
            label="Daily Sun Hours"
            type="number"
            value={dailySunHours}
            onChange={(e) => setDailySunHours(e.target.value)}
            placeholder="e.g., 4.5"
            unit="hours"
          />
          <MobileInput
            label="System Efficiency"
            type="number"
            value={systemEfficiency}
            onChange={(e) => setSystemEfficiency(e.target.value)}
            placeholder="e.g., 85"
            unit="%"
          />
        </div>

        <div className="flex gap-2">
          <MobileButton onClick={calculateSolarArray} className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Array
          </MobileButton>
          <MobileButton onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4" />
          </MobileButton>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-3">Array Layout Results:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>Panels per row: <span className="text-elec-yellow font-medium">{result.panelsPerRow}</span></p>
                <p>Number of rows: <span className="text-elec-yellow font-medium">{result.numberOfRows}</span></p>
                <p>Total panels: <span className="text-elec-yellow font-medium">{result.totalPanels}</span></p>
                <p>Total wattage: <span className="text-elec-yellow font-medium">{result.totalWattage?.toLocaleString()} W</span></p>
              </div>
              <div>
                <p>Daily generation: <span className="text-elec-yellow font-medium">{result.dailyGeneration?.toFixed(1)} kWh</span></p>
                <p>Monthly generation: <span className="text-elec-yellow font-medium">{result.monthlyGeneration?.toFixed(0)} kWh</span></p>
                <p>Yearly generation: <span className="text-elec-yellow font-medium">{result.yearlyGeneration?.toFixed(0)} kWh</span></p>
                <p>Area efficiency: <span className="text-elec-yellow font-medium">{result.areaEfficiency?.toFixed(1)}%</span></p>
              </div>
            </div>
          </div>
        )}

        <Alert>
          <Sun className="h-4 w-4" />
          <AlertDescription>
            Calculations include 0.5m spacing between panels. UK average sun hours: 3-4.5 depending on location.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default SolarArrayCalculator;