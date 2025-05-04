
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Appliance = {
  id: number;
  name: string;
  watts: string;
};

const LoadCalculator = () => {
  const [voltage, setVoltage] = useState<string>("230");
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: 1, name: "", watts: "" },
    { id: 2, name: "", watts: "" },
  ]);
  const [totalPower, setTotalPower] = useState<string | null>(null);
  const [totalCurrent, setTotalCurrent] = useState<string | null>(null);

  const handleApplianceChange = (id: number, field: "name" | "watts", value: string) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const addAppliance = () => {
    const newId = appliances.length > 0 ? Math.max(...appliances.map(a => a.id)) + 1 : 1;
    setAppliances([...appliances, { id: newId, name: "", watts: "" }]);
  };

  const calculateLoad = () => {
    const totalWatts = appliances.reduce((sum, app) => {
      const watts = parseFloat(app.watts);
      return sum + (isNaN(watts) ? 0 : watts);
    }, 0);
    
    const volts = parseFloat(voltage);
    if (isNaN(volts) || volts === 0) return;
    
    setTotalPower(totalWatts.toFixed(0));
    setTotalCurrent((totalWatts / volts).toFixed(2));
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Load Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate the total load on a circuit based on connected appliances.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voltage">Supply Voltage (V)</Label>
            <Input 
              id="voltage" 
              type="number" 
              value={voltage} 
              onChange={(e) => setVoltage(e.target.value)}
              className="bg-elec-dark border-elec-yellow/20"
            />
          </div>
          <div className="space-y-2">
            <Label>Appliances</Label>
            <div className="space-y-2">
              {appliances.map(appliance => (
                <div key={appliance.id} className="flex gap-2">
                  <Input 
                    placeholder="Name" 
                    value={appliance.name}
                    onChange={(e) => handleApplianceChange(appliance.id, "name", e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                  <Input 
                    type="number" 
                    placeholder="Watts" 
                    value={appliance.watts}
                    onChange={(e) => handleApplianceChange(appliance.id, "watts", e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={addAppliance}
            >
              + Add Appliance
            </Button>
          </div>
          <Button className="w-full" onClick={calculateLoad}>Calculate Total Load</Button>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-elec-dark p-3 text-center">
              <div className="text-xs text-muted-foreground">Total Power:</div>
              <div className="text-xl font-bold text-elec-yellow">
                {totalPower ? `${totalPower} W` : '-- W'}
              </div>
            </div>
            <div className="rounded-md bg-elec-dark p-3 text-center">
              <div className="text-xs text-muted-foreground">Total Current:</div>
              <div className="text-xl font-bold text-elec-yellow">
                {totalCurrent ? `${totalCurrent} A` : '-- A'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadCalculator;
