import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, Calculator, RotateCcw, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PowerQualityCalculator = () => {
  const [fundamental, setFundamental] = useState<string>("");
  const [harmonic3, setHarmonic3] = useState<string>("");
  const [harmonic5, setHarmonic5] = useState<string>("");
  const [harmonic7, setHarmonic7] = useState<string>("");
  const [harmonic9, setHarmonic9] = useState<string>("");
  const [harmonic11, setHarmonic11] = useState<string>("");
  const [harmonic13, setHarmonic13] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("230");
  const [result, setResult] = useState<{
    thd: number;
    rms: number;
    distortionFactor: number;
    crestFactor: number;
    powerQualityRating: string;
    recommendations: string[];
    harmonicSpectrum: { harmonic: number; percentage: number; magnitude: number }[];
  } | null>(null);

  const calculatePowerQuality = () => {
    const I1 = parseFloat(fundamental) || 0;
    const I3 = parseFloat(harmonic3) || 0;
    const I5 = parseFloat(harmonic5) || 0;
    const I7 = parseFloat(harmonic7) || 0;
    const I9 = parseFloat(harmonic9) || 0;
    const I11 = parseFloat(harmonic11) || 0;
    const I13 = parseFloat(harmonic13) || 0;
    const V = parseFloat(voltage);

    if (I1 > 0) {
      // Calculate THD (Total Harmonic Distortion)
      const harmonicSum = Math.sqrt(I3*I3 + I5*I5 + I7*I7 + I9*I9 + I11*I11 + I13*I13);
      const thd = (harmonicSum / I1) * 100;

      // Calculate RMS current
      const rms = Math.sqrt(I1*I1 + I3*I3 + I5*I5 + I7*I7 + I9*I9 + I11*I11 + I13*I13);

      // Calculate distortion factor
      const distortionFactor = I1 / rms;

      // Estimate crest factor (simplified)
      const crestFactor = 1.414 * (1 + thd/100); // Approximation

      // Power quality rating
      let powerQualityRating = "";
      let recommendations: string[] = [];

      if (thd <= 5) {
        powerQualityRating = "Excellent";
        recommendations = ["Power quality meets IEEE 519 standards", "No corrective action required"];
      } else if (thd <= 8) {
        powerQualityRating = "Good";
        recommendations = ["Minor harmonic distortion present", "Monitor for trends", "Consider load balancing"];
      } else if (thd <= 15) {
        powerQualityRating = "Fair";
        recommendations = ["Harmonic mitigation recommended", "Install harmonic filters", "Review non-linear loads"];
      } else if (thd <= 25) {
        powerQualityRating = "Poor";
        recommendations = ["Immediate attention required", "Install active harmonic filters", "Upgrade power factor correction"];
      } else {
        powerQualityRating = "Critical";
        recommendations = ["Urgent corrective action needed", "Risk of equipment damage", "Install comprehensive harmonic mitigation"];
      }

      // Build harmonic spectrum
      const harmonicSpectrum = [
        { harmonic: 3, percentage: I3 > 0 ? (I3/I1)*100 : 0, magnitude: I3 },
        { harmonic: 5, percentage: I5 > 0 ? (I5/I1)*100 : 0, magnitude: I5 },
        { harmonic: 7, percentage: I7 > 0 ? (I7/I1)*100 : 0, magnitude: I7 },
        { harmonic: 9, percentage: I9 > 0 ? (I9/I1)*100 : 0, magnitude: I9 },
        { harmonic: 11, percentage: I11 > 0 ? (I11/I1)*100 : 0, magnitude: I11 },
        { harmonic: 13, percentage: I13 > 0 ? (I13/I1)*100 : 0, magnitude: I13 },
      ].filter(h => h.magnitude > 0);

      setResult({
        thd,
        rms,
        distortionFactor,
        crestFactor,
        powerQualityRating,
        recommendations,
        harmonicSpectrum
      });
    }
  };

  const reset = () => {
    setFundamental("");
    setHarmonic3("");
    setHarmonic5("");
    setHarmonic7("");
    setHarmonic9("");
    setHarmonic11("");
    setHarmonic13("");
    setVoltage("230");
    setResult(null);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Excellent": return "text-green-400";
      case "Good": return "text-blue-400";
      case "Fair": return "text-yellow-400";
      case "Poor": return "text-orange-400";
      case "Critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Quality & THD Calculator</CardTitle>
        </div>
        <CardDescription>
          Analyze harmonic distortion and calculate Total Harmonic Distortion (THD) for power quality assessment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Current Harmonics</h3>
            
            <MobileInput
              label="Fundamental (1st Harmonic)"
              type="number"
              step="0.1"
              value={fundamental}
              onChange={(e) => setFundamental(e.target.value)}
              placeholder="e.g., 10.0"
              unit="A"
            />

            <div className="grid grid-cols-2 gap-3">
              <MobileInput
                label="3rd Harmonic"
                type="number"
                step="0.1"
                value={harmonic3}
                onChange={(e) => setHarmonic3(e.target.value)}
                placeholder="e.g., 0.5"
                unit="A"
              />

              <MobileInput
                label="5th Harmonic"
                type="number"
                step="0.1"
                value={harmonic5}
                onChange={(e) => setHarmonic5(e.target.value)}
                placeholder="e.g., 0.8"
                unit="A"
              />

              <MobileInput
                label="7th Harmonic"
                type="number"
                step="0.1"
                value={harmonic7}
                onChange={(e) => setHarmonic7(e.target.value)}
                placeholder="e.g., 0.3"
                unit="A"
              />

              <MobileInput
                label="9th Harmonic"
                type="number"
                step="0.1"
                value={harmonic9}
                onChange={(e) => setHarmonic9(e.target.value)}
                placeholder="e.g., 0.2"
                unit="A"
              />

              <MobileInput
                label="11th Harmonic"
                type="number"
                step="0.1"
                value={harmonic11}
                onChange={(e) => setHarmonic11(e.target.value)}
                placeholder="e.g., 0.15"
                unit="A"
              />

              <MobileInput
                label="13th Harmonic"
                type="number"
                step="0.1"
                value={harmonic13}
                onChange={(e) => setHarmonic13(e.target.value)}
                placeholder="e.g., 0.1"
                unit="A"
              />
            </div>

            <MobileInput
              label="System Voltage"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="230"
              unit="V"
            />

            <div className="flex gap-2">
              <MobileButton 
                onClick={calculatePowerQuality}
                variant="elec"
                disabled={!fundamental}
                icon={<Calculator className="h-4 w-4" />}
                className="flex-1"
              >
                Analyze Power Quality
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Power Quality Analysis</h3>
                    <Badge variant="secondary" className={`mb-4 ${getRatingColor(result.powerQualityRating)}`}>
                      {result.powerQualityRating}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Harmonic Distortion:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.thd.toFixed(2)}%</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">RMS Current:</span>
                      <div className="font-mono text-elec-yellow">{result.rms.toFixed(2)} A</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Distortion Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.distortionFactor.toFixed(3)}</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Crest Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.crestFactor.toFixed(2)}</div>
                    </div>

                    {result.harmonicSpectrum.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-blue-400" />
                            <span className="font-medium">Harmonic Spectrum:</span>
                          </div>
                          <div className="space-y-1 pl-6">
                            {result.harmonicSpectrum.map((harmonic) => (
                              <div key={harmonic.harmonic} className="flex justify-between text-xs">
                                <span>{harmonic.harmonic}th:</span>
                                <span>{harmonic.percentage.toFixed(1)}% ({harmonic.magnitude.toFixed(2)}A)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">Recommendations:</span>
                      </div>
                      <ul className="space-y-1 pl-6">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-xs text-muted-foreground">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter harmonic current values to analyze power quality
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Activity className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                IEEE 519 recommends THD &lt; 5% for general systems. 
                High THD can cause equipment heating, neutral current, and reduced efficiency.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerQualityCalculator;