
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle, XCircle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DiscriminationCalculator = () => {
  const [upstreamDevice, setUpstreamDevice] = useState("");
  const [upstreamRating, setUpstreamRating] = useState("");
  const [downstreamDevice, setDownstreamDevice] = useState("");
  const [downstreamRating, setDownstreamRating] = useState("");
  const [faultCurrent, setFaultCurrent] = useState("");
  const [result, setResult] = useState<{
    discriminates: boolean;
    upstreamTime: number;
    downstreamTime: number;
    margin: number;
    recommendation: string;
  } | null>(null);

  const calculateDiscrimination = () => {
    if (!upstreamDevice || !upstreamRating || !downstreamDevice || !downstreamRating || !faultCurrent) return;

    const If = parseFloat(faultCurrent);
    const upRating = parseFloat(upstreamRating);
    const downRating = parseFloat(downstreamRating);

    // Simplified time-current characteristics (real implementation would use actual curves)
    const getOperatingTime = (device: string, rating: number, current: number): number => {
      const multiple = current / rating;
      
      if (device.includes('mcb-b')) {
        return multiple > 5 ? 0.1 : multiple > 3 ? 5 : 100;
      } else if (device.includes('mcb-c')) {
        return multiple > 10 ? 0.1 : multiple > 5 ? 5 : 100;
      } else if (device.includes('fuse')) {
        return multiple > 10 ? 0.2 : multiple > 5 ? 2 : 50;
      }
      return 100;
    };

    const upstreamTime = getOperatingTime(upstreamDevice, upRating, If);
    const downstreamTime = getOperatingTime(downstreamDevice, downRating, If);
    
    const margin = upstreamTime / downstreamTime;
    const discriminates = margin >= 2; // 2:1 ratio generally required

    let recommendation = "";
    if (!discriminates) {
      recommendation = "Devices may not discriminate properly. Consider different ratings or device types.";
    } else if (margin < 3) {
      recommendation = "Marginal discrimination. Consider increasing upstream device rating.";
    } else {
      recommendation = "Good discrimination achieved.";
    }

    setResult({
      discriminates,
      upstreamTime,
      downstreamTime,
      margin,
      recommendation
    });
  };

  const resetCalculator = () => {
    setUpstreamDevice("");
    setUpstreamRating("");
    setDownstreamDevice("");
    setDownstreamRating("");
    setFaultCurrent("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Discrimination Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Analyse protective device coordination and selectivity
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Standards & Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Upstream (Supply Side) Device</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="upstream-device">Device Type</Label>
                  <Select value={upstreamDevice} onValueChange={setUpstreamDevice}>
                    <SelectTrigger id="upstream-device">
                      <SelectValue placeholder="Select upstream device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcb-b">MCB Type B</SelectItem>
                      <SelectItem value="mcb-c">MCB Type C</SelectItem>
                      <SelectItem value="mcb-d">MCB Type D</SelectItem>
                      <SelectItem value="fuse-bs88">BS 88 HRC Fuse</SelectItem>
                      <SelectItem value="fuse-bs1361">BS 1361 Fuse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upstream-rating">Rating (A)</Label>
                  <Select value={upstreamRating} onValueChange={setUpstreamRating}>
                    <SelectTrigger id="upstream-rating">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16">16A</SelectItem>
                      <SelectItem value="20">20A</SelectItem>
                      <SelectItem value="25">25A</SelectItem>
                      <SelectItem value="32">32A</SelectItem>
                      <SelectItem value="40">40A</SelectItem>
                      <SelectItem value="50">50A</SelectItem>
                      <SelectItem value="63">63A</SelectItem>
                      <SelectItem value="80">80A</SelectItem>
                      <SelectItem value="100">100A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <h3 className="font-medium text-lg pt-4">Downstream (Load Side) Device</h3>

                <div className="space-y-2">
                  <Label htmlFor="downstream-device">Device Type</Label>
                  <Select value={downstreamDevice} onValueChange={setDownstreamDevice}>
                    <SelectTrigger id="downstream-device">
                      <SelectValue placeholder="Select downstream device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcb-b">MCB Type B</SelectItem>
                      <SelectItem value="mcb-c">MCB Type C</SelectItem>
                      <SelectItem value="mcb-d">MCB Type D</SelectItem>
                      <SelectItem value="fuse-bs88">BS 88 HRC Fuse</SelectItem>
                      <SelectItem value="fuse-bs1361">BS 1361 Fuse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downstream-rating">Rating (A)</Label>
                  <Select value={downstreamRating} onValueChange={setDownstreamRating}>
                    <SelectTrigger id="downstream-rating">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6A</SelectItem>
                      <SelectItem value="10">10A</SelectItem>
                      <SelectItem value="16">16A</SelectItem>
                      <SelectItem value="20">20A</SelectItem>
                      <SelectItem value="25">25A</SelectItem>
                      <SelectItem value="32">32A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fault-current">Fault Current (A)</Label>
                  <input
                    id="fault-current"
                    type="number"
                    value={faultCurrent}
                    onChange={(e) => setFaultCurrent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 1000"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateDiscrimination} className="flex-1">
                    Check Discrimination
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {result ? (
                  <Card className={`${result.discriminates ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${result.discriminates ? 'text-green-300' : 'text-red-300'}`}>
                        {result.discriminates ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        Discrimination Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Upstream Time</div>
                          <div className="font-mono text-lg">{result.upstreamTime.toFixed(2)}s</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Downstream Time</div>
                          <div className="font-mono text-lg">{result.downstreamTime.toFixed(2)}s</div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Time Ratio: </span>
                          <span className="font-semibold">{result.margin.toFixed(1)}:1</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {result.margin >= 2 ? '✓ Adequate (≥2:1)' : '✗ Inadequate (<2:1)'}
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                        <p className="text-blue-200 text-sm">{result.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Shield className="h-8 w-8 mx-auto mb-2" />
                        <p>Configure devices to check discrimination</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guidance">
            <div className="space-y-4">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Discrimination Principles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-blue-200 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">BS 7671 Requirements</h4>
                    <p>Regulation 536.1 requires discrimination between protective devices to minimise the extent of circuits affected by faults.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Discrimination Methods:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Current:</strong> Different operating current levels</li>
                      <li>• <strong>Time:</strong> Time delays in upstream devices</li>
                      <li>• <strong>Energy:</strong> Energy limiting devices</li>
                      <li>• <strong>Direction:</strong> Directional protection</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Typical Time Ratios:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• MCB to MCB: 2:1 minimum</li>
                      <li>• Fuse to MCB: Variable based on characteristics</li>
                      <li>• Time delayed devices: 0.4s minimum difference</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DiscriminationCalculator;
