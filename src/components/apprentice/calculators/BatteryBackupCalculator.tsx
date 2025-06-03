
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Battery, Calculator, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Load {
  id: number;
  name: string;
  power: number;
  priority: string;
}

const BatteryBackupCalculator = () => {
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [batteryVoltage, setBatteryVoltage] = useState("12");
  const [inverterEfficiency, setInverterEfficiency] = useState("90");
  const [loads, setLoads] = useState<Load[]>([]);
  const [newLoad, setNewLoad] = useState({
    name: "",
    power: "",
    priority: "essential"
  });
  const [results, setResults] = useState<any>(null);

  const priorities = {
    essential: "Essential (Emergency Lighting, Alarms)",
    important: "Important (Communications, Computers)",
    convenience: "Convenience (General Lighting, Sockets)"
  };

  const addLoad = () => {
    if (!newLoad.name || !newLoad.power) return;

    const load: Load = {
      id: Date.now(),
      name: newLoad.name,
      power: parseFloat(newLoad.power),
      priority: newLoad.priority
    };

    setLoads([...loads, load]);
    setNewLoad({ name: "", power: "", priority: "essential" });
  };

  const removeLoad = (id: number) => {
    setLoads(loads.filter(load => load.id !== id));
  };

  const calculateRuntime = () => {
    const capacity = parseFloat(batteryCapacity);
    const voltage = parseFloat(batteryVoltage);
    const efficiency = parseFloat(inverterEfficiency) / 100;

    if (!capacity || !voltage || loads.length === 0) return;

    // Calculate total power by priority
    const essentialPower = loads.filter(l => l.priority === "essential").reduce((sum, l) => sum + l.power, 0);
    const importantPower = loads.filter(l => l.priority === "important").reduce((sum, l) => sum + l.power, 0);
    const conveniencePower = loads.filter(l => l.priority === "convenience").reduce((sum, l) => sum + l.power, 0);

    const totalPower = essentialPower + importantPower + conveniencePower;

    // Battery energy in Wh
    const batteryEnergy = capacity * voltage;
    
    // Usable energy (typically 50% for lead-acid, 80% for lithium)
    const usableEnergyLead = batteryEnergy * 0.5;
    const usableEnergyLithium = batteryEnergy * 0.8;

    // Runtime calculations (accounting for inverter efficiency)
    const availableEnergyLead = usableEnergyLead * efficiency;
    const availableEnergyLithium = usableEnergyLithium * efficiency;

    // Runtime scenarios
    const runtimes = {
      essentialOnly: {
        lead: essentialPower > 0 ? availableEnergyLead / essentialPower : 0,
        lithium: essentialPower > 0 ? availableEnergyLithium / essentialPower : 0
      },
      essentialAndImportant: {
        lead: (essentialPower + importantPower) > 0 ? availableEnergyLead / (essentialPower + importantPower) : 0,
        lithium: (essentialPower + importantPower) > 0 ? availableEnergyLithium / (essentialPower + importantPower) : 0
      },
      allLoads: {
        lead: totalPower > 0 ? availableEnergyLead / totalPower : 0,
        lithium: totalPower > 0 ? availableEnergyLithium / totalPower : 0
      }
    };

    setResults({
      batteryEnergy,
      usableEnergyLead,
      usableEnergyLithium,
      essentialPower,
      importantPower,
      conveniencePower,
      totalPower,
      runtimes
    });
  };

  const resetCalculator = () => {
    setBatteryCapacity("");
    setBatteryVoltage("12");
    setInverterEfficiency("90");
    setLoads([]);
    setNewLoad({ name: "", power: "", priority: "essential" });
    setResults(null);
  };

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return `${h}h ${m}m`;
    } else {
      const days = Math.floor(hours / 24);
      const h = Math.floor(hours % 24);
      return `${days}d ${h}h`;
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Battery Backup Runtime Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Battery System</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="battery-capacity">Capacity (Ah)</Label>
                <Input
                  id="battery-capacity"
                  type="number"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  placeholder="e.g., 100"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="battery-voltage">Voltage (V)</Label>
                <Select value={batteryVoltage} onValueChange={setBatteryVoltage}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="48">48V</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="inverter-efficiency">Efficiency (%)</Label>
                <Input
                  id="inverter-efficiency"
                  type="number"
                  value={inverterEfficiency}
                  onChange={(e) => setInverterEfficiency(e.target.value)}
                  placeholder="e.g., 90"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium text-elec-yellow">Loads</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="load-name">Load Name</Label>
                <Input
                  id="load-name"
                  value={newLoad.name}
                  onChange={(e) => setNewLoad({ ...newLoad, name: e.target.value })}
                  placeholder="e.g., Emergency Lights"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="load-power">Power (W)</Label>
                <Input
                  id="load-power"
                  type="number"
                  value={newLoad.power}
                  onChange={(e) => setNewLoad({ ...newLoad, power: e.target.value })}
                  placeholder="e.g., 50"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="load-priority">Priority</Label>
                <Select value={newLoad.priority} onValueChange={(value) => setNewLoad({ ...newLoad, priority: value })}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {Object.entries(priorities).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <h4 className="text-md font-medium">Connected Loads</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {loads.map((load) => (
                    <div key={load.id} className="flex items-center justify-between bg-elec-dark/50 p-2 rounded text-sm">
                      <span>{load.name} - {load.power}W</span>
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
                onClick={calculateRuntime}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!batteryCapacity || loads.length === 0}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Runtime
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Runtime Analysis</h3>
            {results ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Battery Energy:</p>
                  <p className="text-lg font-bold text-white">{results.batteryEnergy.toFixed(0)} Wh</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-medium text-blue-300">Runtime Scenarios</h4>
                  
                  {results.essentialPower > 0 && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <p className="text-sm font-medium text-red-300">Essential Loads Only ({results.essentialPower}W)</p>
                      <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                        <span>Lead-acid: {formatTime(results.runtimes.essentialOnly.lead)}</span>
                        <span>Lithium: {formatTime(results.runtimes.essentialOnly.lithium)}</span>
                      </div>
                    </div>
                  )}

                  {results.essentialPower + results.importantPower > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <p className="text-sm font-medium text-amber-300">Essential + Important ({results.essentialPower + results.importantPower}W)</p>
                      <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                        <span>Lead-acid: {formatTime(results.runtimes.essentialAndImportant.lead)}</span>
                        <span>Lithium: {formatTime(results.runtimes.essentialAndImportant.lithium)}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <p className="text-sm font-medium text-green-300">All Loads ({results.totalPower}W)</p>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                      <span>Lead-acid: {formatTime(results.runtimes.allLoads.lead)}</span>
                      <span>Lithium: {formatTime(results.runtimes.allLoads.lithium)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Note:</strong> Assumes 50% depth of discharge for lead-acid, 
                    80% for lithium. Actual runtime may vary with temperature and battery condition.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Configure battery system and add loads to calculate backup runtime.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatteryBackupCalculator;
