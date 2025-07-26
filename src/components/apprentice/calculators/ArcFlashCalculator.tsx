import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Calculator, RotateCcw, Shield, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ArcFlashCalculator = () => {
  const [voltage, setVoltage] = useState<string>("415");
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [clearingTime, setClearingTime] = useState<string>("");
  const [workingDistance, setWorkingDistance] = useState<string>("450");
  const [enclosureType, setEnclosureType] = useState<string>("open");
  const [result, setResult] = useState<{
    incidentEnergy: number;
    arcFlashBoundary: number;
    ppeLevel: string;
    riskCategory: number;
    recommendations: string[];
  } | null>(null);

  const calculateArcFlash = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(faultCurrent);
    const t = parseFloat(clearingTime);
    const D = parseFloat(workingDistance);

    if (V > 0 && I > 0 && t > 0 && D > 0) {
      // Simplified IEEE 1584 calculation for demonstration
      // Real implementation would use more complex formulas
      
      let K1 = enclosureType === "enclosed" ? -0.792 : -0.555;
      let K2 = enclosureType === "enclosed" ? 0.113 : 0.0; 
      
      // Arc current calculation (simplified)
      const Ia = Math.pow(10, (K1 + K2 + 0.662 * Math.log10(I) + 0.0966 * V + 0.000526 * V + 0.5588 * V * Math.log10(I) - 0.00304 * V * Math.log10(I) * Math.log10(I)));
      
      // Incident energy calculation (simplified)
      const logEn = K1 + K2 + 1.081 * Math.log10(Ia) + 0.0011 * V;
      const En = Math.pow(10, logEn);
      const incidentEnergy = 4.184 * En * (t / 0.2) * (610 / D) * (610 / D);
      
      // Arc flash boundary (mm)
      const arcFlashBoundary = 610 * Math.sqrt(4.184 * En * (t / 0.2) / 5.0);

      // Determine PPE level and risk category
      let ppeLevel = "";
      let riskCategory = 0;
      let recommendations: string[] = [];

      if (incidentEnergy <= 1.2) {
        ppeLevel = "Category 0";
        riskCategory = 0;
        recommendations = ["Standard work clothing", "Safety glasses", "Leather gloves"];
      } else if (incidentEnergy <= 4.0) {
        ppeLevel = "Category 1";
        riskCategory = 1;
        recommendations = ["Arc-rated clothing (4 cal/cm²)", "Arc-rated face shield", "Arc-rated gloves"];
      } else if (incidentEnergy <= 8.0) {
        ppeLevel = "Category 2";
        riskCategory = 2;
        recommendations = ["Arc-rated clothing (8 cal/cm²)", "Arc-rated face shield", "Arc-rated gloves", "Hard hat"];
      } else if (incidentEnergy <= 25.0) {
        ppeLevel = "Category 3";
        riskCategory = 3;
        recommendations = ["Arc-rated clothing (25 cal/cm²)", "Arc-rated hood", "Arc-rated gloves", "Hard hat"];
      } else {
        ppeLevel = "Category 4";
        riskCategory = 4;
        recommendations = ["Arc-rated clothing (40 cal/cm²)", "Arc-rated hood", "Arc-rated gloves", "Hard hat", "Consider remote operation"];
      }

      setResult({
        incidentEnergy,
        arcFlashBoundary,
        ppeLevel,
        riskCategory,
        recommendations
      });
    }
  };

  const reset = () => {
    setVoltage("415");
    setFaultCurrent("");
    setClearingTime("");
    setWorkingDistance("450");
    setEnclosureType("open");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Arc Flash Energy Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate arc flash incident energy and determine PPE requirements according to IEEE 1584 guidelines.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="System Voltage (V)"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="e.g., 415"
              unit="V"
            />

            <MobileInput
              label="Prospective Fault Current (A)"
              type="number"
              value={faultCurrent}
              onChange={(e) => setFaultCurrent(e.target.value)}
              placeholder="e.g., 25000"
              unit="A"
            />

            <MobileInput
              label="Arc Clearing Time (s)"
              type="number"
              step="0.01"
              value={clearingTime}
              onChange={(e) => setClearingTime(e.target.value)}
              placeholder="e.g., 0.1"
              unit="s"
            />

            <MobileInput
              label="Working Distance (mm)"
              type="number"
              value={workingDistance}
              onChange={(e) => setWorkingDistance(e.target.value)}
              placeholder="e.g., 450"
              unit="mm"
            />

            <MobileSelect value={enclosureType} onValueChange={setEnclosureType}>
              <MobileSelectTrigger label="Enclosure Type">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="open">Open Air</MobileSelectItem>
                <MobileSelectItem value="enclosed">Box/Enclosure</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <div className="flex gap-2">
              <MobileButton onClick={calculateArcFlash} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
                Calculate Arc Flash
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Arc Flash Analysis</h3>
                    <Badge 
                      variant={result.riskCategory <= 1 ? "default" : result.riskCategory <= 3 ? "secondary" : "destructive"}
                      className="mb-4"
                    >
                      {result.ppeLevel}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Incident Energy:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.incidentEnergy.toFixed(2)} cal/cm²</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Arc Flash Boundary:</span>
                      <div className="font-mono text-elec-yellow">{Math.round(result.arcFlashBoundary)} mm</div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-400" />
                        <span className="font-medium">Required PPE:</span>
                      </div>
                      <ul className="space-y-1 pl-6">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-xs text-muted-foreground">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter system parameters to calculate arc flash energy
                </div>
              )}
            </div>

            <Alert className="border-red-500/20 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">
                <strong>Warning:</strong> This is a simplified calculation for estimation only. 
                Professional arc flash studies should be conducted by qualified engineers.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArcFlashCalculator;