
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Load {
  id: number;
  name: string;
  power: number;
  quantity: number;
  diversityFactor: number;
  loadType: string;
}

const MaximumDemandCalculator = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [newLoad, setNewLoad] = useState({
    name: "",
    power: "",
    quantity: "1",
    loadType: "lighting"
  });
  const [totalDemand, setTotalDemand] = useState<number | null>(null);

  // Typical diversity factors for different load types
  const diversityFactors = {
    lighting: 0.9,
    sockets: 0.4,
    heating: 1.0,
    motors: 0.8,
    aircon: 0.8,
    cooking: 0.6,
    immersion: 1.0,
    shower: 1.0
  };

  const loadTypes = {
    lighting: "Lighting",
    sockets: "Socket Outlets",
    heating: "Space Heating",
    motors: "Motors",
    aircon: "Air Conditioning",
    cooking: "Cooking Equipment",
    immersion: "Immersion Heater",
    shower: "Electric Shower"
  };

  const addLoad = () => {
    if (!newLoad.name || !newLoad.power) return;

    const load: Load = {
      id: Date.now(),
      name: newLoad.name,
      power: parseFloat(newLoad.power),
      quantity: parseInt(newLoad.quantity),
      diversityFactor: diversityFactors[newLoad.loadType as keyof typeof diversityFactors],
      loadType: newLoad.loadType
    };

    setLoads([...loads, load]);
    setNewLoad({ name: "", power: "", quantity: "1", loadType: "lighting" });
  };

  const removeLoad = (id: number) => {
    setLoads(loads.filter(load => load.id !== id));
  };

  const calculateMaximumDemand = () => {
    const totalDemandValue = loads.reduce((total, load) => {
      const loadDemand = load.power * load.quantity * load.diversityFactor;
      return total + loadDemand;
    }, 0);

    setTotalDemand(totalDemandValue);
  };

  const resetCalculator = () => {
    setLoads([]);
    setTotalDemand(null);
    setNewLoad({ name: "", power: "", quantity: "1", loadType: "lighting" });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Maximum Demand Estimator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Add Loads</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="load-name">Load Name</Label>
                <Input
                  id="load-name"
                  value={newLoad.name}
                  onChange={(e) => setNewLoad({ ...newLoad, name: e.target.value })}
                  placeholder="e.g., Kitchen Lights"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="load-type">Load Type</Label>
                <Select value={newLoad.loadType} onValueChange={(value) => setNewLoad({ ...newLoad, loadType: value })}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {Object.entries(loadTypes).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="load-power">Power (W)</Label>
                <Input
                  id="load-power"
                  type="number"
                  value={newLoad.power}
                  onChange={(e) => setNewLoad({ ...newLoad, power: e.target.value })}
                  placeholder="e.g., 1000"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="load-quantity">Quantity</Label>
                <Input
                  id="load-quantity"
                  type="number"
                  value={newLoad.quantity}
                  onChange={(e) => setNewLoad({ ...newLoad, quantity: e.target.value })}
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <Button 
              onClick={addLoad}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              disabled={!newLoad.name || !newLoad.power}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Load
            </Button>

            {loads.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-md font-medium">Added Loads</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {loads.map((load) => (
                    <div key={load.id} className="flex items-center justify-between bg-elec-dark/50 p-2 rounded">
                      <div className="text-sm">
                        <span className="font-medium">{load.name}</span>
                        <span className="text-muted-foreground"> - {load.power}W × {load.quantity} × {load.diversityFactor}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeLoad(load.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={calculateMaximumDemand}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={loads.length === 0}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Demand
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Maximum Demand</h3>
            {totalDemand !== null ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Maximum Demand:</p>
                  <p className="text-2xl font-bold text-white">{totalDemand.toFixed(0)}W</p>
                  <p className="text-lg text-white">{(totalDemand / 1000).toFixed(2)}kW</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Estimated Current @ 230V:</p>
                  <p className="text-xl font-bold text-white">{(totalDemand / 230).toFixed(1)}A</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> This calculation uses typical diversity factors. 
                    Actual diversity may vary based on specific installation requirements and usage patterns.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Diversity Factors Used:</strong><br />
                    Lighting: 90%, Sockets: 40%, Heating: 100%, Motors: 80%, 
                    A/C: 80%, Cooking: 60%, Immersion: 100%, Shower: 100%
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Add loads and calculate to see the maximum demand estimation.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaximumDemandCalculator;
