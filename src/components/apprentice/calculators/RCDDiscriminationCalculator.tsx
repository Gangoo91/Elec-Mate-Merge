
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RCDDevice {
  id: string;
  name: string;
  rating: string;
  type: string;
  tripTime1x: number;
  tripTime5x: number;
}

const RCDDiscriminationCalculator = () => {
  const [upstreamRcd, setUpstreamRcd] = useState<RCDDevice | null>(null);
  const [downstreamRcd, setDownstreamRcd] = useState<RCDDevice | null>(null);
  const [faultCurrent, setFaultCurrent] = useState("");
  const [discriminationResult, setDiscriminationResult] = useState<{
    isDiscriminative: boolean;
    upstreamTime: number;
    downstreamTime: number;
    timeDifference: number;
  } | null>(null);

  // Common RCD configurations
  const rcdDevices = [
    { id: "main-300", name: "Main RCD", rating: "300mA", type: "S-Type", tripTime1x: 300, tripTime5x: 150 },
    { id: "main-100", name: "Main RCD", rating: "100mA", type: "Standard", tripTime1x: 300, tripTime5x: 40 },
    { id: "circuit-30", name: "Circuit RCD", rating: "30mA", type: "Standard", tripTime1x: 300, tripTime5x: 40 },
    { id: "rcbo-30", name: "RCBO", rating: "30mA", type: "Standard", tripTime1x: 300, tripTime5x: 40 },
    { id: "socket-30", name: "Socket RCD", rating: "30mA", type: "Standard", tripTime1x: 300, tripTime5x: 40 },
  ];

  const calculateDiscrimination = () => {
    if (!upstreamRcd || !downstreamRcd || !faultCurrent) return;

    const fault = parseFloat(faultCurrent);
    if (isNaN(fault)) return;

    // Determine which trip time to use based on fault current
    const getTrippingTime = (rcd: RCDDevice, current: number) => {
      const ratedCurrent = parseFloat(rcd.rating);
      const ratio = current / ratedCurrent;
      
      if (ratio >= 5) {
        return rcd.tripTime5x;
      } else if (ratio >= 1) {
        return rcd.tripTime1x;
      } else {
        return Infinity; // Won't trip
      }
    };

    const upstreamTime = getTrippingTime(upstreamRcd, fault);
    const downstreamTime = getTrippingTime(downstreamRcd, fault);
    
    // For discrimination, upstream should be slower by at least 200ms
    const timeDifference = upstreamTime - downstreamTime;
    const isDiscriminative = timeDifference >= 200 && downstreamTime !== Infinity;

    setDiscriminationResult({
      isDiscriminative,
      upstreamTime,
      downstreamTime,
      timeDifference
    });
  };

  const resetCalculator = () => {
    setUpstreamRcd(null);
    setDownstreamRcd(null);
    setFaultCurrent("");
    setDiscriminationResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>RCD Discrimination / Selectivity Tool</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="upstream-rcd">Upstream RCD (Supply Side)</Label>
              <Select 
                value={upstreamRcd?.id || ""} 
                onValueChange={(value) => {
                  const rcd = rcdDevices.find(r => r.id === value);
                  setUpstreamRcd(rcd || null);
                }}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select upstream RCD" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {rcdDevices.map((rcd) => (
                    <SelectItem key={rcd.id} value={rcd.id}>
                      {rcd.name} - {rcd.rating} ({rcd.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="downstream-rcd">Downstream RCD (Load Side)</Label>
              <Select 
                value={downstreamRcd?.id || ""} 
                onValueChange={(value) => {
                  const rcd = rcdDevices.find(r => r.id === value);
                  setDownstreamRcd(rcd || null);
                }}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select downstream RCD" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {rcdDevices.map((rcd) => (
                    <SelectItem key={rcd.id} value={rcd.id}>
                      {rcd.name} - {rcd.rating} ({rcd.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fault-current">Earth Fault Current (mA)</Label>
              <Input
                id="fault-current"
                type="number"
                step="1"
                value={faultCurrent}
                onChange={(e) => setFaultCurrent(e.target.value)}
                placeholder="e.g., 150"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateDiscrimination} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!upstreamRcd || !downstreamRcd || !faultCurrent}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Check Discrimination
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Discrimination Analysis</h3>
            {discriminationResult ? (
              <div className="space-y-3">
                <div className={`p-3 rounded ${discriminationResult.isDiscriminative ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                  <p className={`font-medium ${discriminationResult.isDiscriminative ? 'text-green-300' : 'text-red-300'}`}>
                    {discriminationResult.isDiscriminative ? '✓ DISCRIMINATIVE' : '✗ NON-DISCRIMINATIVE'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Downstream RCD Trip Time:</p>
                  <p className="text-xl font-bold text-white">
                    {discriminationResult.downstreamTime === Infinity ? 'Won\'t Trip' : `${discriminationResult.downstreamTime}ms`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Upstream RCD Trip Time:</p>
                  <p className="text-xl font-bold text-white">
                    {discriminationResult.upstreamTime === Infinity ? 'Won\'t Trip' : `${discriminationResult.upstreamTime}ms`}
                  </p>
                </div>

                {discriminationResult.timeDifference !== Infinity && (
                  <div>
                    <p className="text-sm text-muted-foreground">Time Difference:</p>
                    <p className="text-lg font-bold text-white">{discriminationResult.timeDifference}ms</p>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-xs text-blue-300">
                    <strong>Discrimination Requirement:</strong> Upstream RCD must be at least 200ms slower than downstream RCD to ensure selectivity.
                  </p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Tip:</strong> Use S-Type (time delayed) RCDs upstream and standard RCDs downstream for better discrimination.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select RCD devices and enter fault current to analyze discrimination.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RCDDiscriminationCalculator;
