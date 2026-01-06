import { useState } from "react";
import { Zap, BookOpen, AlertCircle, Info, Shield, AlertTriangle, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CalculatorCard,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { zsValues, zsValues5s, rcdZsValues } from "./zs-values/ZsValuesData";
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
  const [disconnectionTime, setDisconnectionTime] = useState("0.4");
  const [rcdRating, setRcdRating] = useState("30");

  const config = CALCULATOR_CONFIG['testing'];
  const calculatedZs = ze && r1r2 ? parseFloat(ze) + parseFloat(r1r2) : null;

  const calculateZs = () => {
    const data = disconnectionTime === "0.4" ? zsValues : zsValues5s;
    let rating: number;
    let maxZs: number | undefined;

    if (protectionType === "rcd") {
      rating = parseInt(rcdRating);
      maxZs = rcdZsValues[rating as keyof typeof rcdZsValues];
    } else if (protectionType === "mcb") {
      rating = parseInt(mcbRating);
      const deviceData = data.mcb as any;
      maxZs = deviceData?.[mcbCurve]?.[rating];
    } else if (protectionType === "rcbo") {
      rating = parseInt(rcboRating);
      const deviceData = data.rcbo as any;
      maxZs = deviceData?.[rcboCurve]?.[rating];
    } else if (protectionType === "fuse") {
      rating = parseInt(fusRating);
      const deviceData = data[fuseType as keyof typeof data] as any;
      maxZs = deviceData?.[rating];
    } else {
      return;
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
    <div className="space-y-4">
      <CalculatorCard
        category="testing"
        title="Maximum Zs Values Calculator"
        description="Calculate maximum earth fault loop impedance values according to BS 7671"
      >
        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white/5 rounded-xl p-1">
            <TabsTrigger
              value="calculator"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Zap className="h-4 w-4 mr-2" />
              Calculator
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Guidance
            </TabsTrigger>
            <TabsTrigger
              value="standards"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                disconnectionTime={disconnectionTime}
                setDisconnectionTime={setDisconnectionTime}
                rcdRating={rcdRating}
                setRcdRating={setRcdRating}
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

          <TabsContent value="guidance" className="mt-4">
            <ZsCalculatorInfo />
          </TabsContent>

          <TabsContent value="standards" className="mt-4 space-y-4">
            {/* BS 7671 References */}
            <div className="calculator-card p-4" style={{ borderColor: '#60a5fa30' }}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-blue-300">BS 7671:2018+A3:2024 References</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
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

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium mb-2 text-blue-300">Table 41.3 - Maximum Zs Values for Final Circuits ≤32A</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-200 mb-2"><strong>What it covers:</strong></p>
                      <ul className="space-y-1 text-blue-200/80 text-xs">
                        <li>• Socket outlets (13A, 16A, 32A)</li>
                        <li>• Lighting circuits</li>
                        <li>• Small appliance circuits</li>
                        <li>• Domestic and commercial final circuits</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-blue-200 mb-2"><strong>Key requirements:</strong></p>
                      <ul className="space-y-1 text-blue-200/80 text-xs">
                        <li>• 0.4 second maximum disconnection time</li>
                        <li>• Values at 70°C conductor temperature</li>
                        <li>• TN system earthing arrangement</li>
                        <li>• 230V nominal voltage assumed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disconnection Times */}
            <div className="calculator-card p-4" style={{ borderColor: '#22c55e30' }}>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">Disconnection Times Explained</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-medium mb-2 text-emerald-300">0.4 Second Rule (Final Circuits ≤32A)</h4>
                  <div className="text-sm text-emerald-200">
                    <p className="mb-2"><strong>Why 0.4 seconds?</strong></p>
                    <ul className="space-y-1 text-emerald-200/80 text-xs">
                      <li>• Maximum safe touch duration for 230V</li>
                      <li>• Based on human physiological response</li>
                      <li>• Prevents ventricular fibrillation</li>
                      <li>• Includes let-go time for muscle control</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-medium mb-2 text-amber-300">5 Second Rule (Distribution {">"}32A)</h4>
                  <div className="text-sm text-amber-200">
                    <p className="mb-2"><strong>Why longer is acceptable?</strong></p>
                    <ul className="space-y-1 text-amber-200/80 text-xs">
                      <li>• Lower probability of direct contact</li>
                      <li>• Focus shifts to fire prevention</li>
                      <li>• May require supplementary bonding</li>
                      <li>• Industrial/commercial environments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Origin of Zs Values */}
            <Collapsible>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa30' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm sm:text-base font-medium text-purple-300">Origin of Zs Values</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
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
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* TT System Considerations */}
            <Collapsible>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#fb923c30' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-orange-400" />
                    <span className="text-sm sm:text-base font-medium text-orange-300">TT System Considerations</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
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
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Voltage Factor */}
            <Collapsible>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2430' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span className="text-sm sm:text-base font-medium text-amber-300">Voltage Factor Considerations</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="text-sm text-amber-200">
                    <p className="mb-3">
                      BS 7671 tabulated Zs values are calculated using a voltage factor approach, which balances practical considerations with safety requirements.
                    </p>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <h4 className="font-medium mb-2">Key Points:</h4>
                      <ul className="space-y-1 text-amber-200/80 text-xs">
                        <li>• Uses 0.8 × Uo (184V) rather than full nominal voltage</li>
                        <li>• Accounts for voltage variations during fault conditions</li>
                        <li>• Provides practical safety margin for real-world installations</li>
                        <li>• Considers impedance of fault return path through earth</li>
                        <li>• Temperature coefficient already included in tabulated values</li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Related Standards */}
            <Collapsible>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#94a3b830' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-slate-400" />
                    <span className="text-sm sm:text-base font-medium text-slate-300">Related Standards & Documents</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
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
                </CollapsibleContent>
              </div>
            </Collapsible>
          </TabsContent>
        </Tabs>
      </CalculatorCard>

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Zs</strong> = Ze + (R1+R2). Must be ≤ tabulated maximum for automatic disconnection within required time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZsValuesCalculator;
