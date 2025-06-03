
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cable, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const CableDeratingCalculator = () => {
  const [ambientTemp, setAmbientTemp] = useState("30");
  const [installationMethod, setInstallationMethod] = useState("");
  const [numberOfCircuits, setNumberOfCircuits] = useState("1");
  const [thermalInsulation, setThermalInsulation] = useState(false);
  const [groupingFactor, setGroupingFactor] = useState("");
  const [overallDerating, setOverallDerating] = useState<number | null>(null);
  const [factors, setFactors] = useState<{
    temperature: number;
    grouping: number;
    thermal: number;
  } | null>(null);

  // Temperature derating factors (BS 7671 Table 4B1)
  const temperatureFactors: { [key: string]: number } = {
    "25": 1.03,
    "30": 1.00,
    "35": 0.94,
    "40": 0.87,
    "45": 0.79,
    "50": 0.71,
    "55": 0.61,
    "60": 0.50
  };

  // Grouping factors based on number of circuits (BS 7671 Table 4C1)
  const getGroupingFactor = (circuits: number, method: string): number => {
    const groupingTable: { [key: string]: { [key: number]: number } } = {
      "enclosed": {
        1: 1.00, 2: 0.80, 3: 0.70, 4: 0.65, 5: 0.60, 6: 0.57, 
        7: 0.54, 8: 0.52, 9: 0.50, 10: 0.48, 12: 0.45, 16: 0.41, 20: 0.38
      },
      "surface": {
        1: 1.00, 2: 0.85, 3: 0.79, 4: 0.75, 5: 0.73, 6: 0.72,
        7: 0.72, 8: 0.71, 9: 0.70, 10: 0.70, 12: 0.69, 16: 0.67, 20: 0.66
      },
      "spaced": {
        1: 1.00, 2: 0.88, 3: 0.82, 4: 0.77, 5: 0.75, 6: 0.73,
        7: 0.72, 8: 0.72, 9: 0.71, 10: 0.70, 12: 0.70, 16: 0.68, 20: 0.66
      }
    };

    const table = groupingTable[method] || groupingTable["enclosed"];
    return table[circuits] || table[20]; // Use 20+ value for higher numbers
  };

  const calculateDerating = () => {
    const tempFactor = temperatureFactors[ambientTemp] || 1.0;
    const circuits = parseInt(numberOfCircuits);
    const groupFactor = installationMethod ? getGroupingFactor(circuits, installationMethod) : 1.0;
    const thermalFactor = thermalInsulation ? 0.5 : 1.0; // Significant derating for thermal insulation

    const overall = tempFactor * groupFactor * thermalFactor;

    setFactors({
      temperature: tempFactor,
      grouping: groupFactor,
      thermal: thermalFactor
    });
    setOverallDerating(overall);
  };

  const resetCalculator = () => {
    setAmbientTemp("30");
    setInstallationMethod("");
    setNumberOfCircuits("1");
    setThermalInsulation(false);
    setGroupingFactor("");
    setOverallDerating(null);
    setFactors(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Derating Factors Tool</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
              <Select value={ambientTemp} onValueChange={setAmbientTemp}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="25">25°C</SelectItem>
                  <SelectItem value="30">30°C (Reference)</SelectItem>
                  <SelectItem value="35">35°C</SelectItem>
                  <SelectItem value="40">40°C</SelectItem>
                  <SelectItem value="45">45°C</SelectItem>
                  <SelectItem value="50">50°C</SelectItem>
                  <SelectItem value="55">55°C</SelectItem>
                  <SelectItem value="60">60°C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installation-method">Installation Method</Label>
              <Select value={installationMethod} onValueChange={setInstallationMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select installation method" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="enclosed">Enclosed (Conduit/Trunking)</SelectItem>
                  <SelectItem value="surface">Surface Mounted</SelectItem>
                  <SelectItem value="spaced">Spaced Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="number-circuits">Number of Circuits</Label>
              <Input
                id="number-circuits"
                type="number"
                min="1"
                max="20"
                value={numberOfCircuits}
                onChange={(e) => setNumberOfCircuits(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="thermal-insulation"
                checked={thermalInsulation}
                onCheckedChange={(checked) => setThermalInsulation(checked as boolean)}
              />
              <Label htmlFor="thermal-insulation">
                Cable in contact with thermal insulation
              </Label>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateDerating} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!installationMethod}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Derating
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Derating Analysis</h3>
            {overallDerating !== null && factors ? (
              <div className="space-y-3">
                <div className="border-b border-elec-yellow/20 pb-3">
                  <p className="text-sm text-muted-foreground">Overall Derating Factor:</p>
                  <p className="text-3xl font-bold text-elec-yellow">{overallDerating.toFixed(3)}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Temperature Factor (Ca):</p>
                  <p className="text-xl font-bold text-white">{factors.temperature.toFixed(3)}</p>
                  <p className="text-xs text-muted-foreground">At {ambientTemp}°C</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Grouping Factor (Cg):</p>
                  <p className="text-xl font-bold text-white">{factors.grouping.toFixed(3)}</p>
                  <p className="text-xs text-muted-foreground">{numberOfCircuits} circuits - {installationMethod}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Thermal Insulation Factor (Ci):</p>
                  <p className="text-xl font-bold text-white">{factors.thermal.toFixed(3)}</p>
                  <p className="text-xs text-muted-foreground">
                    {thermalInsulation ? 'With thermal insulation' : 'No thermal insulation'}
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Formula:</strong> Overall Factor = Ca × Cg × Ci<br />
                    New Current Rating = Tabulated Rating × Overall Factor
                  </p>
                </div>

                {overallDerating < 0.8 && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                    <p className="text-xs text-amber-300">
                      <strong>Warning:</strong> Significant derating required. Consider cable size increase or installation method change.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Configure installation conditions to calculate derating factors.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableDeratingCalculator;
