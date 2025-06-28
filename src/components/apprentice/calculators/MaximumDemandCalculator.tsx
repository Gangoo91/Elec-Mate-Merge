
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Info, Calculator, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Load {
  id: number;
  name: string;
  power: number;
  diversityFactor: number;
}

const MaximumDemandCalculator = () => {
  const [loads, setLoads] = useState<Load[]>([
    { id: 1, name: "Lighting", power: 0, diversityFactor: 0.9 },
    { id: 2, name: "Socket Outlets", power: 0, diversityFactor: 0.6 },
  ]);
  const [result, setResult] = useState<{
    totalConnectedLoad: number;
    maximumDemand: number;
    overallDiversityFactor: number;
  } | null>(null);

  const addLoad = () => {
    const newLoad: Load = {
      id: Date.now(),
      name: `Load ${loads.length + 1}`,
      power: 0,
      diversityFactor: 1.0
    };
    setLoads([...loads, newLoad]);
  };

  const removeLoad = (id: number) => {
    if (loads.length > 1) {
      setLoads(loads.filter(load => load.id !== id));
    }
  };

  const updateLoad = (id: number, field: keyof Load, value: string | number) => {
    setLoads(loads.map(load => 
      load.id === id ? { ...load, [field]: value } : load
    ));
  };

  const calculateMaximumDemand = () => {
    const totalConnectedLoad = loads.reduce((sum, load) => sum + load.power, 0);
    const maximumDemand = loads.reduce((sum, load) => sum + (load.power * load.diversityFactor), 0);
    const overallDiversityFactor = totalConnectedLoad > 0 ? maximumDemand / totalConnectedLoad : 0;

    setResult({
      totalConnectedLoad,
      maximumDemand,
      overallDiversityFactor
    });
  };

  const reset = () => {
    setLoads([
      { id: 1, name: "Lighting", power: 0, diversityFactor: 0.9 },
      { id: 2, name: "Socket Outlets", power: 0, diversityFactor: 0.6 },
    ]);
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Maximum Demand Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate maximum demand considering diversity factors for different load types.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Load Configuration</h3>
              <Button onClick={addLoad} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Load
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {loads.map((load) => (
                <div key={load.id} className="p-3 border border-elec-yellow/20 rounded-md bg-elec-dark">
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      value={load.name}
                      onChange={(e) => updateLoad(load.id, 'name', e.target.value)}
                      className="flex-1 mr-2 bg-elec-gray border-elec-yellow/20"
                      placeholder="Load name"
                    />
                    {loads.length > 1 && (
                      <Button 
                        onClick={() => removeLoad(load.id)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Power (kW)</Label>
                      <Input
                        type="number"
                        value={load.power}
                        onChange={(e) => updateLoad(load.id, 'power', parseFloat(e.target.value) || 0)}
                        className="bg-elec-gray border-elec-yellow/20"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Diversity Factor</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={load.diversityFactor}
                        onChange={(e) => updateLoad(load.id, 'diversityFactor', parseFloat(e.target.value) || 0)}
                        className="bg-elec-gray border-elec-yellow/20"
                        placeholder="1.0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={calculateMaximumDemand} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Maximum Demand Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {loads.length} Load{loads.length !== 1 ? 's' : ''} Configured
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Connected Load:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.totalConnectedLoad.toFixed(2)} kW</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Maximum Demand:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.maximumDemand.toFixed(2)} kW</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Overall Diversity Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.overallDiversityFactor.toFixed(3)}</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Maximum Demand = Σ(Load × Diversity Factor)</div>
                      <div>Diversity reduces total connected load</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Configure loads and diversity factors to calculate maximum demand
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Diversity factors vary by installation type. Typical values: Lighting (0.9), Sockets (0.6), Motors (0.8).
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaximumDemandCalculator;
