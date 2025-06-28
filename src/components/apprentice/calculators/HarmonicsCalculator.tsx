
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HarmonicsCalculator = () => {
  const [loadType, setLoadType] = useState("");
  const [totalLoad, setTotalLoad] = useState("");
  const [harmonicOrder, setHarmonicOrder] = useState("");
  const [result, setResult] = useState<{
    thd: number;
    neutralCurrent: number;
    kFactor: number;
    cableDerating: number;
    recommendations: string[];
  } | null>(null);

  const calculateHarmonics = () => {
    if (!loadType || !totalLoad || !harmonicOrder) return;

    const load = parseFloat(totalLoad);
    
    // Typical harmonic content for different loads (simplified)
    const harmonicData: { [key: string]: { [key: string]: number } } = {
      'led-lighting': { '3': 0.15, '5': 0.08, '7': 0.05, 'thd': 0.18 },
      'fluorescent': { '3': 0.20, '5': 0.12, '7': 0.08, 'thd': 0.25 },
      'computer': { '3': 0.25, '5': 0.15, '7': 0.10, 'thd': 0.30 },
      'ups': { '3': 0.10, '5': 0.06, '7': 0.04, 'thd': 0.12 },
      'variable-drive': { '3': 0.08, '5': 0.20, '7': 0.15, 'thd': 0.26 }
    };

    const harmonics = harmonicData[loadType] || { '3': 0.1, '5': 0.05, '7': 0.03, 'thd': 0.12 };
    
    const thd = harmonics.thd * 100; // Convert to percentage
    const thirdHarmonic = harmonics['3'];
    
    // Neutral current calculation (primarily 3rd harmonic)
    const neutralCurrent = load * thirdHarmonic * Math.sqrt(3);
    
    // K-factor calculation for transformer loading
    const kFactor = 1 + (harmonics['3'] * 9) + (harmonics['5'] * 25) + (harmonics['7'] * 49);
    
    // Cable derating factor
    const cableDerating = thd > 15 ? 0.86 : thd > 10 ? 0.93 : 1.0;

    const recommendations = [];
    if (thd > 15) {
      recommendations.push("High THD level - consider harmonic filters");
      recommendations.push("Use oversized neutral conductor");
    }
    if (neutralCurrent > load * 0.2) {
      recommendations.push("Significant neutral current - check neutral sizing");
      recommendations.push("Consider 3-phase load balancing");
    }
    if (kFactor > 4) {
      recommendations.push("High K-factor transformer required");
      recommendations.push("Derate transformer capacity");
    }

    setResult({
      thd,
      neutralCurrent,
      kFactor,
      cableDerating,
      recommendations
    });
  };

  const resetCalculator = () => {
    setLoadType("");
    setTotalLoad("");
    setHarmonicOrder("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Harmonics Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Analyse harmonic distortion and its effects on electrical systems
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Standards & Effects</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="load-type">Load Type</Label>
                  <Select value={loadType} onValueChange={setLoadType}>
                    <SelectTrigger id="load-type">
                      <SelectValue placeholder="Select load type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="led-lighting">LED Lighting</SelectItem>
                      <SelectItem value="fluorescent">Fluorescent Lighting</SelectItem>
                      <SelectItem value="computer">Computer/IT Equipment</SelectItem>
                      <SelectItem value="ups">UPS Systems</SelectItem>
                      <SelectItem value="variable-drive">Variable Speed Drives</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-load">Total Load (A)</Label>
                  <input
                    id="total-load"
                    type="number"
                    value={totalLoad}
                    onChange={(e) => setTotalLoad(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harmonic-order">Analysis Type</Label>
                  <Select value={harmonicOrder} onValueChange={setHarmonicOrder}>
                    <SelectTrigger id="harmonic-order">
                      <SelectValue placeholder="Select analysis type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thd">Total Harmonic Distortion</SelectItem>
                      <SelectItem value="individual">Individual Harmonics</SelectItem>
                      <SelectItem value="neutral">Neutral Current Analysis</SelectItem>
                      <SelectItem value="transformer">Transformer K-Factor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateHarmonics} className="flex-1">
                    Analyse Harmonics
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {result ? (
                  <Card className="border-purple-500/30 bg-purple-500/5">
                    <CardHeader>
                      <CardTitle className="text-purple-300 text-lg">Harmonic Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-purple-200">Total THD</div>
                          <div className="text-purple-300 font-mono text-lg">{result.thd.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-purple-200">K-Factor</div>
                          <div className="text-purple-300 font-mono text-lg">{result.kFactor.toFixed(1)}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-purple-200">Neutral Current</div>
                          <div className="text-purple-300 font-mono text-lg">{result.neutralCurrent.toFixed(1)} A</div>
                        </div>
                        <div>
                          <div className="text-purple-200">Cable Derating</div>
                          <div className="text-purple-300 font-mono text-lg">{(result.cableDerating * 100).toFixed(0)}%</div>
                        </div>
                      </div>

                      <div className={`p-3 rounded border ${
                        result.thd < 8 ? 'bg-green-500/10 border-green-500/20' :
                        result.thd < 15 ? 'bg-yellow-500/10 border-yellow-500/20' :
                        'bg-red-500/10 border-red-500/20'
                      }`}>
                        <div className="text-sm font-medium">
                          Harmonic Level: {result.thd < 8 ? 'Acceptable' : result.thd < 15 ? 'Moderate' : 'High'}
                        </div>
                      </div>

                      {result.recommendations.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-amber-300 font-medium text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Recommendations
                          </h4>
                          <ul className="space-y-1 text-amber-200 text-xs">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-amber-400 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Activity className="h-8 w-8 mx-auto mb-2" />
                        <p>Select load parameters to analyse harmonics</p>
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
                    Harmonic Standards & Effects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-blue-200 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">BS EN 61000-3-2 Limits</h4>
                    <p>Equipment current ≤16A per phase must comply with harmonic emission limits.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Common Effects:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Neutral:</strong> Increased current due to 3rd harmonics</li>
                      <li>• <strong>Transformers:</strong> Additional heating (K-factor)</li>
                      <li>• <strong>Cables:</strong> Skin effect and additional losses</li>
                      <li>• <strong>Power Factor:</strong> Apparent power increase</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Mitigation Methods:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Active/passive harmonic filters</li>
                      <li>• Phase shifting transformers</li>
                      <li>• Properly sized neutral conductors</li>
                      <li>• K-rated transformers</li>
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

export default HarmonicsCalculator;
