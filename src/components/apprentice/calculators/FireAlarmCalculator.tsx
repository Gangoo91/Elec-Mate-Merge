
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

const FireAlarmCalculator = () => {
  const [systemType, setSystemType] = useState("");
  const [buildingArea, setBuildingArea] = useState("");
  const [riskCategory, setRiskCategory] = useState("");
  const [result, setResult] = useState<{
    detectors: number;
    sounders: number;
    cableLength: number;
    batteryBackup: number;
  } | null>(null);

  const calculateFireAlarm = () => {
    if (!systemType || !buildingArea || !riskCategory) return;

    const area = parseFloat(buildingArea);
    
    // BS 5839 coverage areas (simplified)
    const coverage: { [key: string]: { [key: string]: number } } = {
      'low-risk': { 'smoke': 84, 'heat': 50 },
      'ordinary-risk': { 'smoke': 60, 'heat': 40 },
      'high-risk': { 'smoke': 37, 'heat': 25 }
    };
    
    const detectorCoverage = coverage[riskCategory]?.[systemType] || 60;
    const detectors = Math.ceil(area / detectorCoverage);
    const sounders = Math.ceil(area / 150); // 150m² per sounder typical
    const cableLength = Math.ceil(area / 10) * 2; // Rough estimate for loop cable
    const batteryBackup = detectors * 0.5 + sounders * 2; // Simplified Ah calculation

    setResult({
      detectors,
      sounders,
      cableLength,
      batteryBackup
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Fire Alarm Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate fire detection system requirements per BS 5839
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-type">Detector Type</Label>
              <Select value={systemType} onValueChange={setSystemType}>
                <SelectTrigger id="system-type">
                  <SelectValue placeholder="Select detector type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smoke">Smoke Detection</SelectItem>
                  <SelectItem value="heat">Heat Detection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-category">Risk Category</Label>
              <Select value={riskCategory} onValueChange={setRiskCategory}>
                <SelectTrigger id="risk-category">
                  <SelectValue placeholder="Select risk category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-risk">Low Risk</SelectItem>
                  <SelectItem value="ordinary-risk">Ordinary Risk</SelectItem>
                  <SelectItem value="high-risk">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="building-area">Building Area (m²)</Label>
              <input
                id="building-area"
                type="number"
                value={buildingArea}
                onChange={(e) => setBuildingArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 500"
              />
            </div>

            <Button onClick={calculateFireAlarm} className="w-full">
              Calculate Fire Alarm System
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-300 text-lg">Fire Alarm System Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-red-200">Detectors</div>
                      <div className="text-red-300 font-mono text-xl font-bold">{result.detectors}</div>
                    </div>
                    <div>
                      <div className="text-red-200">Sounders</div>
                      <div className="text-red-300 font-mono text-xl font-bold">{result.sounders}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-red-200">Cable Length</div>
                      <div className="text-red-300 font-mono text-lg">{result.cableLength}m</div>
                    </div>
                    <div>
                      <div className="text-red-200">Battery Backup</div>
                      <div className="text-red-300 font-mono text-lg">{result.batteryBackup}Ah</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter building details to calculate fire alarm system</p>
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

export default FireAlarmCalculator;
