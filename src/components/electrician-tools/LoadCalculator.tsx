
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart4 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LoadCalculator = () => {
  const [lighting, setLighting] = useState<string>("");
  const [sockets, setSockets] = useState<string>("");
  const [heating, setHeating] = useState<string>("");
  const [cooker, setCooker] = useState<string>("");
  const [totalLoad, setTotalLoad] = useState<number | null>(null);

  const calculateTotalLoad = () => {
    const lightingLoad = parseFloat(lighting) || 0;
    const socketLoad = parseFloat(sockets) || 0;
    const heatingLoad = parseFloat(heating) || 0;
    const cookerLoad = parseFloat(cooker) || 0;
    
    // Apply diversity factors
    const socketLoadWithDiversity = socketLoad * 0.6; // 60% diversity for socket outlets
    const heatingLoadWithDiversity = heatingLoad * 0.8; // 80% diversity for heating
    
    const total = lightingLoad + socketLoadWithDiversity + heatingLoadWithDiversity + cookerLoad;
    setTotalLoad(total);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Load Assessment Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate total electrical load with diversity factors for installations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lighting-load">Lighting Load (W)</Label>
            <Input 
              id="lighting-load" 
              type="number" 
              placeholder="Enter lighting load" 
              className="bg-elec-dark border-elec-yellow/20"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="socket-load">Socket Outlets Load (W)</Label>
            <Input 
              id="socket-load" 
              type="number" 
              placeholder="Enter socket outlets load" 
              className="bg-elec-dark border-elec-yellow/20"
              value={sockets}
              onChange={(e) => setSockets(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">60% diversity factor applied</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="heating-load">Heating Load (W)</Label>
            <Input 
              id="heating-load" 
              type="number" 
              placeholder="Enter heating load" 
              className="bg-elec-dark border-elec-yellow/20"
              value={heating}
              onChange={(e) => setHeating(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">80% diversity factor applied</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cooker-load">Cooker Load (W)</Label>
            <Input 
              id="cooker-load" 
              type="number" 
              placeholder="Enter cooker load" 
              className="bg-elec-dark border-elec-yellow/20"
              value={cooker}
              onChange={(e) => setCooker(e.target.value)}
            />
          </div>
        </div>
        
        <Button className="w-full" onClick={calculateTotalLoad}>Calculate Total Load</Button>
        
        <div className="rounded-md bg-elec-dark p-4 text-center">
          <div className="text-sm text-muted-foreground">Total Estimated Load:</div>
          <div className="text-2xl font-bold text-elec-yellow">{totalLoad ? `${totalLoad.toFixed(2)} W (${(totalLoad / 1000).toFixed(2)} kW)` : '-- W'}</div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          This calculation includes standard diversity factors as per electrical regulations. For precise calculations, consider additional factors like power factor and simultaneity.
        </p>
      </CardContent>
    </Card>
  );
};

export default LoadCalculator;
