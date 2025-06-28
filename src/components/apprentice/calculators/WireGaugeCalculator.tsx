
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WireGaugeCalculator = () => {
  const [conversionType, setConversionType] = useState<string>("awg-to-metric");
  const [awgSize, setAwgSize] = useState<string>("");
  const [metricSize, setMetricSize] = useState<string>("");
  const [swgSize, setSwgSize] = useState<string>("");
  const [result, setResult] = useState<{
    awg?: string;
    metric?: string;
    swg?: string;
    diameter?: number;
    area?: number;
    resistance?: number;
    ampacity?: number;
  } | null>(null);

  // Wire gauge conversion tables
  const awgToMetric = {
    "30": { metric: "0.05", diameter: 0.254, area: 0.0507, resistance: 338.6, ampacity: 0.52 },
    "28": { metric: "0.08", diameter: 0.321, area: 0.0804, resistance: 212.9, ampacity: 0.83 },
    "26": { metric: "0.13", diameter: 0.404, area: 0.128, resistance: 133.9, ampacity: 1.3 },
    "24": { metric: "0.2", diameter: 0.511, area: 0.205, resistance: 84.2, ampacity: 2.1 },
    "22": { metric: "0.33", diameter: 0.644, area: 0.326, resistance: 52.9, ampacity: 3.3 },
    "20": { metric: "0.5", diameter: 0.812, area: 0.518, resistance: 33.3, ampacity: 5.2 },
    "18": { metric: "0.75", diameter: 1.024, area: 0.823, resistance: 20.9, ampacity: 8.3 },
    "16": { metric: "1.3", diameter: 1.291, area: 1.31, resistance: 13.2, ampacity: 13 },
    "14": { metric: "2.0", diameter: 1.628, area: 2.08, resistance: 8.29, ampacity: 20 },
    "12": { metric: "2.5", diameter: 2.053, area: 3.31, resistance: 5.21, ampacity: 25 },
    "10": { metric: "4.0", diameter: 2.588, area: 5.26, resistance: 3.28, ampacity: 35 },
    "8": { metric: "6.0", diameter: 3.264, area: 8.37, resistance: 2.06, ampacity: 55 },
    "6": { metric: "10", diameter: 4.115, area: 13.3, resistance: 1.30, ampacity: 75 },
    "4": { metric: "16", diameter: 5.189, area: 21.2, resistance: 0.815, ampacity: 95 },
    "2": { metric: "25", diameter: 6.544, area: 33.6, resistance: 0.513, ampacity: 130 },
    "1": { metric: "35", diameter: 7.348, area: 42.4, resistance: 0.407, ampacity: 150 },
    "1/0": { metric: "50", diameter: 8.251, area: 53.5, resistance: 0.323, ampacity: 170 },
    "2/0": { metric: "70", diameter: 9.266, area: 67.4, resistance: 0.256, ampacity: 195 },
    "3/0": { metric: "95", diameter: 10.405, area: 85.0, resistance: 0.203, ampacity: 225 },
    "4/0": { metric: "120", diameter: 11.684, area: 107.2, resistance: 0.161, ampacity: 260 },
  };

  const calculateWireGauge = () => {
    if (conversionType === "awg-to-metric" && awgSize) {
      const data = awgToMetric[awgSize as keyof typeof awgToMetric];
      if (data) {
        setResult({
          awg: awgSize,
          metric: data.metric,
          diameter: data.diameter,
          area: data.area,
          resistance: data.resistance,
          ampacity: data.ampacity
        });
      }
    } else if (conversionType === "metric-to-awg" && metricSize) {
      // Find closest AWG equivalent
      const metric = parseFloat(metricSize);
      let closestAwg = "";
      let closestDiff = Infinity;
      
      Object.entries(awgToMetric).forEach(([awg, data]) => {
        const diff = Math.abs(parseFloat(data.metric) - metric);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestAwg = awg;
        }
      });
      
      if (closestAwg) {
        const data = awgToMetric[closestAwg as keyof typeof awgToMetric];
        setResult({
          awg: closestAwg,
          metric: data.metric,
          diameter: data.diameter,
          area: data.area,
          resistance: data.resistance,
          ampacity: data.ampacity
        });
      }
    }
  };

  const reset = () => {
    setAwgSize("");
    setMetricSize("");
    setSwgSize("");
    setConversionType("awg-to-metric");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Wire Gauge Calculator</CardTitle>
        </div>
        <CardDescription>
          Convert between AWG, SWG, and metric wire sizes with electrical properties.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="conversion-type">Conversion Type</Label>
              <Select value={conversionType} onValueChange={setConversionType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="awg-to-metric">AWG to Metric</SelectItem>
                  <SelectItem value="metric-to-awg">Metric to AWG</SelectItem>
                  <SelectItem value="swg-conversion">SWG Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {conversionType === "awg-to-metric" && (
              <div>
                <Label htmlFor="awg-size">AWG Size</Label>
                <Select value={awgSize} onValueChange={setAwgSize}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue placeholder="Select AWG size" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-48">
                    {Object.keys(awgToMetric).map((awg) => (
                      <SelectItem key={awg} value={awg}>
                        AWG {awg}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {conversionType === "metric-to-awg" && (
              <div>
                <Label htmlFor="metric-size">Metric Size (mm²)</Label>
                <Input
                  id="metric-size"
                  type="number"
                  step="0.1"
                  value={metricSize}
                  onChange={(e) => setMetricSize(e.target.value)}
                  placeholder="e.g., 2.5"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}

            {conversionType === "swg-conversion" && (
              <div>
                <Label htmlFor="swg-size">SWG Size</Label>
                <Input
                  id="swg-size"
                  type="number"
                  value={swgSize}
                  onChange={(e) => setSwgSize(e.target.value)}
                  placeholder="e.g., 14"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculateWireGauge} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Convert
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Wire Gauge Conversion</h3>
                    <div className="flex gap-2 justify-center mb-4">
                      {result.awg && <Badge variant="secondary">AWG {result.awg}</Badge>}
                      {result.metric && <Badge variant="secondary">{result.metric} mm²</Badge>}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    {result.diameter && (
                      <div>
                        <span className="text-muted-foreground">Wire Diameter:</span>
                        <div className="font-mono text-elec-yellow">{result.diameter.toFixed(3)} mm</div>
                      </div>
                    )}
                    
                    {result.area && (
                      <div>
                        <span className="text-muted-foreground">Cross-sectional Area:</span>
                        <div className="font-mono text-elec-yellow">{result.area.toFixed(2)} mm²</div>
                      </div>
                    )}
                    
                    {result.resistance && (
                      <div>
                        <span className="text-muted-foreground">Resistance (20°C):</span>
                        <div className="font-mono text-elec-yellow">{result.resistance.toFixed(2)} mΩ/m</div>
                      </div>
                    )}
                    
                    {result.ampacity && (
                      <div>
                        <span className="text-muted-foreground">Current Capacity:</span>
                        <div className="font-mono text-elec-yellow">{result.ampacity} A</div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>AWG: American Wire Gauge</div>
                      <div>SWG: Standard Wire Gauge (Imperial)</div>
                      <div>Ampacity for copper wire in free air</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select wire gauge to see conversion and properties
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Current capacity varies with installation method and ambient temperature. Consult local codes.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WireGaugeCalculator;
