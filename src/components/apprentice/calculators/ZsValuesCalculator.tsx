
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BookOpen, AlertCircle, Info, Shield, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zsValues } from "./zs-values/ZsValuesData";
import ZsCalculatorForm from "./zs-values/ZsCalculatorForm";
import ZsCalculatorResult from "./zs-values/ZsCalculatorResult";
import ZsCalculatorInfo from "./zs-values/ZsCalculatorInfo";

const ZsValuesCalculator = () => {
  const [mcbRating, setMcbRating] = useState("");
  const [rcboRating, setRcboRating] = useState("");
  const [fusRating, setFusRating] = useState("");
  const [fuseType, setFuseType] = useState("");
  const [protectionType, setProtectionType] = useState("");
  const [mcbCurve, setMcbCurve] = useState("");
  const [rcboCurve, setRcboCurve] = useState("");
  const [ze, setZe] = useState<string>("");
  const [r1r2, setR1R2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculatedZs = ze && r1r2 ? parseFloat(ze) + parseFloat(r1r2) : null;

  const calculateZs = () => {
    let rating: number;
    let deviceType: keyof typeof zsValues;
    let curveType: string | undefined;

    if (protectionType === "mcb") {
      rating = parseInt(mcbRating);
      deviceType = "mcb";
      curveType = mcbCurve;
    } else if (protectionType === "rcbo") {
      rating = parseInt(rcboRating);
      deviceType = "rcbo";
      curveType = rcboCurve;
    } else if (protectionType === "fuse") {
      rating = parseInt(fusRating);
      deviceType = fuseType as keyof typeof zsValues;
    } else {
      return;
    }

    let maxZs: number | undefined;

    if ((deviceType === "mcb" || deviceType === "rcbo") && curveType) {
      const deviceData = zsValues[deviceType] as any;
      const curveData = deviceData[curveType];
      maxZs = curveData?.[rating as keyof typeof curveData];
    } else {
      const deviceData = zsValues[deviceType] as any;
      maxZs = deviceData?.[rating as keyof typeof deviceData];
    }

    setResult(maxZs || null);
  };

const resetCalculator = () => {
    setMcbRating("");
    setRcboRating("");
    setFusRating("");
    setFuseType("");
    setProtectionType("");
    setMcbCurve("");
    setRcboCurve("");
    setZe("");
    setR1R2("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Maximum Zs Values Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate maximum earth fault loop impedance values according to BS 7671
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="guidance" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guidance
            </TabsTrigger>
            <TabsTrigger value="standards" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ZsCalculatorForm
                mcbRating={mcbRating}
                setMcbRating={setMcbRating}
                rcboRating={rcboRating}
                setRcboRating={setRcboRating}
                fusRating={fusRating}
                setFusRating={setFusRating}
                fuseType={fuseType}
                setFuseType={setFuseType}
                protectionType={protectionType}
                setProtectionType={setProtectionType}
                mcbCurve={mcbCurve}
                setMcbCurve={setMcbCurve}
                rcboCurve={rcboCurve}
                setRcboCurve={setRcboCurve}
                ze={ze}
                setZe={setZe}
                r1r2={r1r2}
                setR1R2={setR1R2}
                onCalculate={calculateZs}
                onReset={resetCalculator}
              />
              
              <ZsCalculatorResult
                result={result}
                calculatedZs={calculatedZs}
                protectionType={protectionType}
                mcbRating={mcbRating}
                rcboRating={rcboRating}
                fusRating={fusRating}
                fuseType={fuseType}
                mcbCurve={mcbCurve}
                rcboCurve={rcboCurve}
              />
            </div>
          </TabsContent>

          <TabsContent value="guidance">
            <ZsCalculatorInfo />
          </TabsContent>

          <TabsContent value="standards">
            <div className="space-y-6">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    BS 7671:2018+A3:2024 References
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
                      <h4 className="font-medium mb-2 text-blue-300">Regulation 411.4.5 - Maximum Earth Fault Loop Impedance</h4>
                      <p className="text-blue-200/90 text-sm mb-3">
                        "The earth fault loop impedance (Zs) at every point of utilisation shall not exceed the values given in Tables 41.2, 41.3 and 41.4."
                      </p>
                      <div className="text-sm text-blue-200">
                        <p className="mb-2"><strong>Plain English:</strong></p>
                        <p>Every socket, light fitting, and electrical point must have a low enough earth fault loop impedance 
                        so that if a dangerous fault occurs, the protective device (MCB, fuse, etc.) will switch off quickly enough 
                        to prevent electric shock or fire.</p>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
                      <h4 className="font-medium mb-2 text-blue-300">Table 41.3 - Maximum Zs Values for Final Circuits ≤32A</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-blue-200 mb-2"><strong>What it covers:</strong></p>
                          <ul className="space-y-1 text-blue-200/80">
                            <li>• Socket outlets (13A, 16A, 32A)</li>
                            <li>• Lighting circuits</li>
                            <li>• Small appliance circuits</li>
                            <li>• Domestic and commercial final circuits</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-blue-200 mb-2"><strong>Key requirements:</strong></p>
                          <ul className="space-y-1 text-blue-200/80">
                            <li>• 0.4 second maximum disconnection time</li>
                            <li>• Values at 70°C conductor temperature</li>
                            <li>• TN system earthing arrangement</li>
                            <li>• 230V nominal voltage assumed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Disconnection Times Explained
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                      <h4 className="font-medium mb-2 text-blue-300">0.4 Second Rule (Final Circuits ≤32A)</h4>
                      <div className="text-sm text-green-200">
                        <p className="mb-2"><strong>Why 0.4 seconds?</strong></p>
                        <ul className="space-y-1 text-green-200/80">
                          <li>• Maximum safe touch duration for 230V</li>
                          <li>• Based on human physiological response</li>
                          <li>• Prevents ventricular fibrillation</li>
                          <li>• Includes let-go time for muscle control</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                      <h4 className="font-medium mb-2 text-yellow-300">5 Second Rule (Distribution {">"}32A)</h4>
                      <div className="text-sm text-green-200">
                        <p className="mb-2"><strong>Why longer is acceptable?</strong></p>
                        <ul className="space-y-1 text-green-200/80">
                          <li>• Lower probability of direct contact</li>
                          <li>• Focus shifts to fire prevention</li>
                          <li>• May require supplementary bonding</li>
                          <li>• Industrial/commercial environments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Origin of Zs Values
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded p-4">
                    <h4 className="font-medium mb-3 text-purple-300">How are the tabulated values calculated?</h4>
                    <div className="space-y-3 text-sm text-purple-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-2">Basic Formula:</p>
                          <div className="bg-purple-500/20 border border-purple-500/30 rounded p-2 font-mono text-xs">
                            Zs = Uo / If
                          </div>
                          <ul className="space-y-1 text-xs mt-2 text-purple-200/80">
                            <li>• Uo = 230V (nominal voltage to earth)</li>
                            <li>• If = Fault current needed for disconnection</li>
                            <li>• Actually uses 0.8 × Uo for safety margin</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Protective Device Characteristics:</p>
                          <ul className="space-y-1 text-xs text-purple-200/80">
                            <li>• MCB curves: I²t characteristics</li>
                            <li>• Time/current relationship</li>
                            <li>• Magnetic trip thresholds</li>
                            <li>• Manufacturing tolerances</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-orange-300 text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    TT System Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4">
                    <h4 className="font-medium mb-3 text-orange-300">RCD Protection Verification (Regulation 411.5.3)</h4>
                    <div className="space-y-3 text-sm text-orange-200">
                      <p>
                        For TT systems, the condition <span className="font-mono bg-orange-500/20 px-1 rounded">RA × IΔn ≤ 50V</span> shall be fulfilled.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium mb-2">Where:</p>
                          <ul className="space-y-1 text-xs text-orange-200/80">
                            <li>• RA = resistance of earth electrode</li>
                            <li>• IΔn = rated residual current of RCD</li>
                            <li>• 50V = maximum touch voltage</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Example:</p>
                          <ul className="space-y-1 text-xs text-orange-200/80">
                            <li>• 30mA RCD: RA ≤ 1667Ω</li>
                            <li>• 100mA RCD: RA ≤ 500Ω</li>
                            <li>• 300mA RCD: RA ≤ 167Ω</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300 text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Voltage Factor Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-amber-200">
                    <p className="mb-3">
                      BS 7671 tabulated Zs values are calculated using a voltage factor approach, which balances practical considerations with safety requirements.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Key Points:</h4>
                      <ul className="space-y-1 text-amber-200/80">
                        <li>• Uses 0.8 × Uo (184V) rather than full nominal voltage</li>
                        <li>• Accounts for voltage variations during fault conditions</li>
                        <li>• Provides practical safety margin for real-world installations</li>
                        <li>• Considers impedance of fault return path through earth</li>
                        <li>• Temperature coefficient already included in tabulated values</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-500/30 bg-slate-500/5">
                <CardHeader>
                  <CardTitle className="text-slate-300 text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Related Standards & Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">British Standards:</h4>
                        <ul className="space-y-1 text-slate-200/80 text-xs">
                          <li>• BS EN 60898 - MCB specifications</li>
                          <li>• BS EN 61009 - RCBO specifications</li>
                          <li>• BS 88 - HRC fuse specifications</li>
                          <li>• BS 1362 - 13A plug fuses</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">IET Publications:</h4>
                        <ul className="space-y-1 text-slate-200/80 text-xs">
                          <li>• Guidance Note 3 - Inspection & Testing</li>
                          <li>• Code of Practice for EIC</li>
                          <li>• Design & Installation handbook</li>
                          <li>• Commentary on BS 7671</li>
                        </ul>
                      </div>
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

export default ZsValuesCalculator;
