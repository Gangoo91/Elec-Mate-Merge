import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart4, Info, Calculator, RotateCcw, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoadCalculator = () => {
  const [supplyType, setSupplyType] = useState<string>("single-phase");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("230");
  const [lighting, setLighting] = useState<string>("");
  const [sockets, setSockets] = useState<string>("");
  const [heating, setHeating] = useState<string>("");
  const [cooker, setCooker] = useState<string>("");
  const [waterHeating, setWaterHeating] = useState<string>("");
  const [motors, setMotors] = useState<string>("");
  const [result, setResult] = useState<{
    totalLoad: number;
    totalLoadAfterDiversity: number;
    estimatedCurrent: number;
    diversityFactors: { [key: string]: number };
    recommendedMainSwitch: string;
    supplyAdequacy: string;
  } | null>(null);

  const calculateTotalLoad = () => {
    const lightingLoad = parseFloat(lighting) || 0;
    const socketLoad = parseFloat(sockets) || 0;
    const heatingLoad = parseFloat(heating) || 0;
    const cookerLoad = parseFloat(cooker) || 0;
    const waterHeatingLoad = parseFloat(waterHeating) || 0;
    const motorLoad = parseFloat(motors) || 0;
    
    // BS 7671 diversity factors
    const diversityFactors = {
      lighting: 0.9,       // 90% for lighting
      sockets: 0.6,        // 60% for socket outlets
      heating: 0.8,        // 80% for space heating
      cooker: 0.6,         // 60% for cooking (first 10kW + 30% remainder)
      waterHeating: 1.0,   // 100% for water heating
      motors: 0.8          // 80% for motors
    };
    
    // Apply diversity factors
    const lightingAfterDiversity = lightingLoad * diversityFactors.lighting;
    const socketsAfterDiversity = socketLoad * diversityFactors.sockets;
    const heatingAfterDiversity = heatingLoad * diversityFactors.heating;
    const waterHeatingAfterDiversity = waterHeatingLoad * diversityFactors.waterHeating;
    const motorsAfterDiversity = motorLoad * diversityFactors.motors;
    
    // Special calculation for cookers (first 10kW at 100%, remainder at 30%)
    let cookerAfterDiversity = 0;
    if (cookerLoad > 0) {
      if (cookerLoad <= 10) {
        cookerAfterDiversity = cookerLoad;
      } else {
        cookerAfterDiversity = 10 + ((cookerLoad - 10) * 0.3);
      }
    }
    
    const totalLoad = lightingLoad + socketLoad + heatingLoad + cookerLoad + waterHeatingLoad + motorLoad;
    const totalAfterDiversity = lightingAfterDiversity + socketsAfterDiversity + heatingAfterDiversity + 
                               cookerAfterDiversity + waterHeatingAfterDiversity + motorsAfterDiversity;
    
    // Calculate estimated current
    const voltage = parseFloat(supplyVoltage);
    const voltageFactor = supplyType === "three-phase" ? Math.sqrt(3) : 1;
    const estimatedCurrent = totalAfterDiversity * 1000 / (voltage * voltageFactor);
    
    // Recommend main switch rating
    let recommendedMainSwitch = "";
    if (estimatedCurrent <= 32) recommendedMainSwitch = "40A";
    else if (estimatedCurrent <= 50) recommendedMainSwitch = "63A";
    else if (estimatedCurrent <= 63) recommendedMainSwitch = "80A";
    else if (estimatedCurrent <= 80) recommendedMainSwitch = "100A";
    else recommendedMainSwitch = "125A or higher";
    
    // Supply adequacy assessment
    let supplyAdequacy = "";
    if (estimatedCurrent <= 100) supplyAdequacy = "Standard single phase supply adequate";
    else if (estimatedCurrent <= 200) supplyAdequacy = "Three phase supply recommended";
    else supplyAdequacy = "High load - DNO consultation required";
    
    setResult({
      totalLoad,
      totalLoadAfterDiversity: totalAfterDiversity,
      estimatedCurrent,
      diversityFactors,
      recommendedMainSwitch,
      supplyAdequacy
    });
  };

  const resetCalculator = () => {
    setSupplyType("single-phase");
    setSupplyVoltage("230");
    setLighting("");
    setSockets("");
    setHeating("");
    setCooker("");
    setWaterHeating("");
    setMotors("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-elec-yellow" />
          <div>
            <CardTitle>Load Assessment Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate total electrical load with BS 7671 diversity factors and supply requirements.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supply-type">Supply Type</Label>
                <Select value={supplyType} onValueChange={setSupplyType}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="single-phase">Single Phase</SelectItem>
                    <SelectItem value="three-phase">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                <Select value={supplyVoltage} onValueChange={setSupplyVoltage}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="230">230V</SelectItem>
                    <SelectItem value="400">400V</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lighting-load">Lighting Load (kW)</Label>
                <Input 
                  id="lighting-load" 
                  type="number" 
                  step="0.1"
                  placeholder="Enter lighting load" 
                  className="bg-card border border-muted/40"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">90% diversity factor applied</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="socket-load">Socket Outlets Load (kW)</Label>
                <Input 
                  id="socket-load" 
                  type="number" 
                  step="0.1"
                  placeholder="Enter socket outlets load" 
                  className="bg-card border border-muted/40"
                  value={sockets}
                  onChange={(e) => setSockets(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">60% diversity factor applied</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="heating-load">Space Heating Load (kW)</Label>
                <Input 
                  id="heating-load" 
                  type="number" 
                  step="0.1"
                  placeholder="Enter heating load" 
                  className="bg-card border border-muted/40"
                  value={heating}
                  onChange={(e) => setHeating(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">80% diversity factor applied</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cooker-load">Cooking Load (kW)</Label>
                <Input 
                  id="cooker-load" 
                  type="number" 
                  step="0.1"
                  placeholder="Enter cooker load" 
                  className="bg-card border border-muted/40"
                  value={cooker}
                  onChange={(e) => setCooker(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">First 10kW + 30% remainder</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="water-heating-load">Water Heating Load (kW)</Label>
                <Input 
                  id="water-heating-load" 
                  type="number" 
                  step="0.1"
                  placeholder="Enter water heating load" 
                  className="bg-card border border-muted/40"
                  value={waterHeating}
                  onChange={(e) => setWaterHeating(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">100% diversity factor (no reduction)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motor-load">Motor Load (kW)</Label>
                <Input 
                  id="motor-load" 
                  type="number" 
                  step="0.1"
                  placeholder="Enter motor load" 
                  className="bg-card border border-muted/40"
                  value={motors}
                  onChange={(e) => setMotors(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">80% diversity factor applied</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" onClick={calculateTotalLoad}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Load
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold">Load Assessment Results</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Connected Load:</span>
                      <span className="font-semibold">{result.totalLoad.toFixed(2)} kW</span>
                    </div>
                    <div className="flex justify-between p-3 bg-elec-yellow/10 rounded">
                      <span className="text-sm font-medium">Load After Diversity:</span>
                      <span className="text-xl font-bold text-elec-yellow">{result.totalLoadAfterDiversity.toFixed(2)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Current:</span>
                      <span className="font-semibold text-elec-yellow">{result.estimatedCurrent.toFixed(1)} A</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommended Equipment:</p>
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Main Switch:</span>
                        <span className="text-green-300">{result.recommendedMainSwitch}</span>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <div className="text-sm text-blue-300">
                        <p className="font-medium text-blue-400">Supply Assessment:</p>
                        <p>{result.supplyAdequacy}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>Load reduction: {(result.totalLoad - result.totalLoadAfterDiversity).toFixed(2)} kW 
                    ({(((result.totalLoad - result.totalLoadAfterDiversity) / result.totalLoad) * 100).toFixed(1)}%)</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <BarChart4 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Enter load values to calculate assessment</p>
                  </div>
                </div>
              )}
            </div>

            {/* What This Means Panel */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <p className="font-medium">What This Means:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Diversity factors reduce total load as not all equipment operates simultaneously</li>
                    <li>• Current calculation determines cable and protective device sizing</li>
                    <li>• Main switch rating provides adequate discrimination and safety margin</li>
                    <li>• Supply assessment ensures adequate network capacity</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* BS 7671 Guidance */}
            <Alert className="border-green-500/20 bg-green-500/10">
              <Info className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-200">
                <div className="space-y-2">
                  <p className="font-medium">BS 7671 Regulations:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Diversity factors from Appendix 1 Table 1B</li>
                    <li>• Main switch sizing per Section 537</li>
                    <li>• Supply adequacy assessment per Part 3</li>
                    <li>• Consider future expansion and load growth</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadCalculator;