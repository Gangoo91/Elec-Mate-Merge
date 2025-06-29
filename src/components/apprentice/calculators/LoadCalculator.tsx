
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Info, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoadCalculator = () => {
  const [lighting, setLighting] = useState<string>("");
  const [sockets, setSockets] = useState<string>("");
  const [heating, setHeating] = useState<string>("");
  const [motors, setMotors] = useState<string>("");
  const [diversityFactor, setDiversityFactor] = useState<string>("0.8");
  const [result, setResult] = useState<{
    totalLoad: number;
    diversifiedLoad: number;
    recommendedSupply: number;
  } | null>(null);

  const calculateLoad = () => {
    const lightingLoad = parseFloat(lighting) || 0;
    const socketsLoad = parseFloat(sockets) || 0;
    const heatingLoad = parseFloat(heating) || 0;
    const motorsLoad = parseFloat(motors) || 0;
    const diversity = parseFloat(diversityFactor);

    const totalLoad = lightingLoad + socketsLoad + heatingLoad + motorsLoad;
    const diversifiedLoad = totalLoad * diversity;
    const recommendedSupply = Math.ceil(diversifiedLoad * 1.25); // 25% safety margin

    setResult({
      totalLoad,
      diversifiedLoad,
      recommendedSupply
    });
  };

  const reset = () => {
    setLighting("");
    setSockets("");
    setHeating("");
    setMotors("");
    setDiversityFactor("0.8");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Load Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate total electrical load with diversity factors for installations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="lighting">Lighting Load (W)</Label>
              <Input
                id="lighting"
                type="number"
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                placeholder="e.g., 2000"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="sockets">Socket Outlets (W)</Label>
              <Input
                id="sockets"
                type="number"
                value={sockets}
                onChange={(e) => setSockets(e.target.value)}
                placeholder="e.g., 5000"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="heating">Heating Load (W)</Label>
              <Input
                id="heating"
                type="number"
                value={heating}
                onChange={(e) => setHeating(e.target.value)}
                placeholder="e.g., 8000"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="motors">Motor Load (W)</Label>
              <Input
                id="motors"
                type="number"
                value={motors}
                onChange={(e) => setMotors(e.target.value)}
                placeholder="e.g., 1500"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="diversity">Diversity Factor</Label>
              <Input
                id="diversity"
                type="number"
                step="0.1"
                min="0.1"
                max="1"
                value={diversityFactor}
                onChange={(e) => setDiversityFactor(e.target.value)}
                placeholder="e.g., 0.8"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateLoad} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Load Assessment</h3>
                    <Badge variant="secondary" className="mb-4">
                      Diversity: {diversityFactor}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Connected Load:</span>
                      <div className="font-mono text-elec-yellow">{result.totalLoad.toFixed(0)} W</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">After Diversity:</span>
                      <div className="font-mono text-elec-yellow">{result.diversifiedLoad.toFixed(0)} W</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Recommended Supply:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.recommendedSupply} W</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter load values to calculate total demand
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Diversity factors vary by application. Typical values: lighting 0.9, sockets 0.4-0.8, heating 1.0.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadCalculator;
