
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Gauge, AlertTriangle } from "lucide-react";

const PowerQualityCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [thd, setThd] = useState("");
  const [result, setResult] = useState<{
    voltageVariation: number;
    frequencyVariation: number;
    powerQualityIndex: number;
    status: string;
  } | null>(null);

  const calculatePowerQuality = () => {
    if (!voltage || !frequency || !thd) return;

    const V = parseFloat(voltage);
    const f = parseFloat(frequency);
    const thdValue = parseFloat(thd);
    
    const nominalVoltage = 230; // UK nominal
    const nominalFrequency = 50; // UK nominal
    
    const voltageVariation = Math.abs((V - nominalVoltage) / nominalVoltage) * 100;
    const frequencyVariation = Math.abs((f - nominalFrequency) / nominalFrequency) * 100;
    
    // Simple power quality index
    let powerQualityIndex = 100;
    powerQualityIndex -= voltageVariation * 2;
    powerQualityIndex -= frequencyVariation * 10;
    powerQualityIndex -= thdValue;
    
    const status = powerQualityIndex > 90 ? "Excellent" :
                  powerQualityIndex > 80 ? "Good" :
                  powerQualityIndex > 70 ? "Fair" : "Poor";

    setResult({
      voltageVariation,
      frequencyVariation,
      powerQualityIndex: Math.max(0, powerQualityIndex),
      status
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Quality Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Assess electrical power quality parameters and indices
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">RMS Voltage (V)</Label>
              <input
                id="voltage"
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 235"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency (Hz)</Label>
              <input
                id="frequency"
                type="number"
                step="0.01"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 50.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thd">Total Harmonic Distortion (%)</Label>
              <input
                id="thd"
                type="number"
                step="0.1"
                value={thd}
                onChange={(e) => setThd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 5.2"
              />
            </div>

            <Button onClick={calculatePowerQuality} className="w-full">
              Assess Power Quality
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg">Power Quality Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-blue-200 text-sm">Power Quality Index</div>
                    <div className={`font-mono text-3xl font-bold ${
                      result.powerQualityIndex > 90 ? 'text-green-300' :
                      result.powerQualityIndex > 80 ? 'text-yellow-300' :
                      result.powerQualityIndex > 70 ? 'text-orange-300' : 'text-red-300'
                    }`}>
                      {result.powerQualityIndex.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">{result.status}</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Voltage Variation:</span>
                      <span>{result.voltageVariation.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frequency Variation:</span>
                      <span>{result.frequencyVariation.toFixed(3)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Gauge className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter parameters to assess power quality</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerQualityCalculator;
