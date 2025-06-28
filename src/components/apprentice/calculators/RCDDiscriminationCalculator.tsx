
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, RotateCcw, CheckCircle, XCircle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } = "@/components/ui/tabs";

const RCDDiscriminationCalculator = () => {
  const [upstreamRCDRating, setUpstreamRCDRating] = useState("");
  const [upstreamRCDType, setUpstreamRCDType] = useState("");
  const [downstreamRCDRating, setDownstreamRCDRating] = useState("");
  const [downstreamRCDType, setDownstreamRCDType] = useState("");
  const [faultCurrent, setFaultCurrent] = useState("");
  const [result, setResult] = useState<{
    discrimination: boolean;
    upstreamTripTime: number;
    downstreamTripTime: number;
    timeDifference: number;
    recommendations: string[];
  } | null>(null);

  // RCD trip time characteristics (in milliseconds)
  const rcdCharacteristics = {
    "standard": {
      "30": { min: 40, max: 300 },
      "100": { min: 130, max: 500 },
      "300": { min: 400, max: 1000 },
      "500": { min: 650, max: 1000 }
    },
    "s-type": {
      "30": { min: 130, max: 500 },
      "100": { min: 400, max: 1000 },
      "300": { min: 1000, max: 5000 },
      "500": { min: 1600, max: 5000 }
    },
    "g-type": {
      "30": { min: 10, max: 40 },
      "100": { min: 40, max: 130 },
      "300": { min: 130, max: 400 },
      "500": { min: 200, max: 650 }
    }
  };

  const calculateDiscrimination = () => {
    if (!upstreamRCDRating || !upstreamRCDType || !downstreamRCDRating || !downstreamRCDType) {
      return;
    }

    const upstreamChar = rcdCharacteristics[upstreamRCDType as keyof typeof rcdCharacteristics][upstreamRCDRating as keyof typeof rcdCharacteristics.standard];
    const downstreamChar = rcdCharacteristics[downstreamRCDType as keyof typeof rcdCharacteristics][downstreamRCDRating as keyof typeof rcdCharacteristics.standard];

    if (!upstreamChar || !downstreamChar) {
      return;
    }

    // Calculate typical trip times (use average of min and max)
    const upstreamTripTime = (upstreamChar.min + upstreamChar.max) / 2;
    const downstreamTripTime = (downstreamChar.min + downstreamChar.max) / 2;
    const timeDifference = upstreamTripTime - downstreamTripTime;

    // Check discrimination - upstream should trip slower than downstream
    const discrimination = upstreamChar.min > downstreamChar.max;

    let recommendations: string[] = [];

    if (discrimination) {
      recommendations = [
        "✓ Good discrimination achieved",
        "Downstream RCD will trip first during earth faults",
        "Upstream RCD provides backup protection",
        "Configuration meets BS 7671 requirements"
      ];
    } else {
      recommendations = [
        "⚠ Poor discrimination - both RCDs may trip simultaneously",
        "Consider using S-type (time-delayed) RCD upstream",
        "Review RCD ratings and types",
        "May cause unnecessary supply interruption"
      ];

      // Specific recommendations
      if (upstreamRCDType === "standard" && downstreamRCDType === "standard") {
        recommendations.push("Consider changing upstream RCD to S-type");
      }
      if (upstreamRCDRating === downstreamRCDRating) {
        recommendations.push("Use higher rating upstream RCD if possible");
      }
    }

    setResult({
      discrimination,
      upstreamTripTime,
      downstreamTripTime,
      timeDifference,
      recommendations
    });
  };

  const resetCalculator = () => {
    setUpstreamRCDRating("");
    setUpstreamRCDType("");
    setDownstreamRCDRating("");
    setDownstreamRCDType("");
    setFaultCurrent("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>RCD Discrimination Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Analyse RCD coordination and discrimination in tiered protection systems
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">RCD Configuration</h3>
                
                {/* Upstream RCD */}
                <div className="space-y-3 p-4 border border-blue-500/20 rounded-lg bg-blue-500/5">
                  <h4 className="text-blue-300 font-medium">Upstream (Main) RCD</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="upstream-type">RCD Type</Label>
                    <Select value={upstreamRCDType} onValueChange={setUpstreamRCDType}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (General)</SelectItem>
                        <SelectItem value="s-type">S-Type (Time Delayed)</SelectItem>
                        <SelectItem value="g-type">G-Type (General)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upstream-rating">Sensitivity (mA)</Label>
                    <Select value={upstreamRCDRating} onValueChange={setUpstreamRCDRating}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30mA</SelectItem>
                        <SelectItem value="100">100mA</SelectItem>
                        <SelectItem value="300">300mA</SelectItem>
                        <SelectItem value="500">500mA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Downstream RCD */}
                <div className="space-y-3 p-4 border border-green-500/20 rounded-lg bg-green-500/5">
                  <h4 className="text-green-300 font-medium">Downstream (Circuit) RCD</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="downstream-type">RCD Type</Label>
                    <Select value={downstreamRCDType} onValueChange={setDownstreamRCDType}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (General)</SelectItem>
                        <SelectItem value="s-type">S-Type (Time Delayed)</SelectItem>
                        <SelectItem value="g-type">G-Type (General)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="downstream-rating">Sensitivity (mA)</Label>
                    <Select value={downstreamRCDRating} onValueChange={setDownstreamRCDRating}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30mA</SelectItem>
                        <SelectItem value="100">100mA</SelectItem>
                        <SelectItem value="300">300mA</SelectItem>
                        <SelectItem value="500">500mA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateDiscrimination} className="flex-1">
                    Analyse Discrimination
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Analysis Results</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className={`border-2 ${result.discrimination ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          {result.discrimination ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <span className={`font-semibold ${result.discrimination ? 'text-green-300' : 'text-red-300'}`}>
                            {result.discrimination ? 'Good Discrimination' : 'Poor Discrimination'}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Upstream trip time:</span>
                            <span className="font-mono">{result.upstreamTripTime}ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Downstream trip time:</span>
                            <span className="font-mono">{result.downstreamTripTime}ms</span>
                          </div>
                          <div className="flex justify-between border-t border-muted/20 pt-2">
                            <span className="text-muted-foreground">Time difference:</span>
                            <span className="font-mono">{result.timeDifference}ms</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-500/30 bg-amber-500/5">
                      <CardContent className="pt-4">
                        <h4 className="text-amber-300 font-semibold mb-3">Recommendations</h4>
                        <ul className="space-y-1 text-amber-200 text-sm">
                          {result.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Shield className="h-8 w-8 mx-auto mb-2" />
                        <p>Configure RCD parameters to analyse discrimination</p>
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
                  <CardTitle className="text-blue-300">What is RCD Discrimination?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200">
                  <p>
                    RCD discrimination ensures that only the RCD closest to the fault operates, 
                    maintaining power supply to unaffected circuits.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Key Principles</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Downstream RCD should trip before upstream RCD</li>
                      <li>• Time delay discrimination prevents unwanted tripping</li>
                      <li>• Sensitivity grading provides backup protection</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300">RCD Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-green-200">
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Standard (General Purpose)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Fast operating times</li>
                        <li>• Typical domestic and commercial use</li>
                        <li>• Trip times: 40-300ms for 30mA</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">S-Type (Time Delayed)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Intentional time delay for discrimination</li>
                        <li>• Used upstream in tiered systems</li>
                        <li>• Trip times: 130-500ms for 30mA</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300">Design Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-amber-200">
                  <div className="space-y-3 text-sm">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Good Practice</h4>
                      <ul className="space-y-1">
                        <li>• Use S-type RCDs upstream</li>
                        <li>• Higher sensitivity downstream (30mA)</li>
                        <li>• Lower sensitivity upstream (100mA+)</li>
                        <li>• Ensure minimum 2:1 trip time ratio</li>
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Common Mistakes</h4>
                      <ul className="space-y-1">
                        <li>• Same sensitivity ratings at all levels</li>
                        <li>• All standard type RCDs</li>
                        <li>• Insufficient time discrimination margin</li>
                      </ul>
                    </div>
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

export default RCDDiscriminationCalculator;
