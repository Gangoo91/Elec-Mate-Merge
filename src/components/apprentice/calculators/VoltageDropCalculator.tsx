import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingDown,
  RotateCcw,
  Calculator,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  BookOpen,
  Lightbulb,
  Cable,
  Zap
} from "lucide-react";
import WhyThisMatters from "@/components/common/WhyThisMatters";

// BS 7671 Appendix 4 mV/A/m values - accurate tabulated data
const mvamData: Record<string, Record<string, Record<number, number>>> = {
  "Copper T&E (6242Y)": {
    "Clipped direct (C)": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "In conduit/trunking (B)": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "Enclosed in insulation": { 1: 46, 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0 },
  },
  "Copper SWA (BS 5467)": {
    "Clipped direct (C)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "In tray/ladder (E)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "Buried direct (D1)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "Underground duct (D2)": { 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0, 25: 1.9, 35: 1.4, 50: 0.98, 70: 0.67, 95: 0.49, 120: 0.39 },
  },
  "Copper XLPE": {
    "Clipped direct (C)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "In tray/ladder (E)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
    "Buried direct (D1)": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.36 },
  },
  "Aluminium SWA": {
    "Clipped direct (C)": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63, 150: 0.52, 185: 0.41, 240: 0.32, 300: 0.26 },
    "In tray/ladder (E)": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63, 150: 0.52, 185: 0.41, 240: 0.32, 300: 0.26 },
    "Buried direct (D1)": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63, 150: 0.52, 185: 0.41, 240: 0.32, 300: 0.26 },
  },
};

const circuitTypeOptions = [
  { value: "lighting", label: "Lighting (3% limit)" },
  { value: "other", label: "Power/Other (5% limit)" },
];

const VoltageDropCalculator: React.FC = () => {
  const [circuit, setCircuit] = useState<string>("other");
  const [family, setFamily] = useState<string>("Copper T&E (6242Y)");
  const [method, setMethod] = useState<string>("Clipped direct (C)");
  const [cableSize, setCableSize] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("230");
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentage: number;
    voltageAtLoad: number;
    limit: number;
    compliant: boolean;
    mvam: number;
    maxLength: number;
    alternatives: Array<{size: number; mvam: number; pct: number; compliant: boolean}>;
  } | null>(null);

  const dataForMethod = mvamData[family]?.[method] || {};
  const sizes = Object.keys(dataForMethod).map(Number).sort((a, b) => a - b);
  const selectedMvam = cableSize ? dataForMethod[Number(cableSize)] : null;

  const familyOptions = Object.keys(mvamData).map(k => ({ value: k, label: k }));
  const methodOptions = Object.keys(mvamData[family] || {}).map(k => ({ value: k, label: k }));
  const sizeOptions = sizes.map(size => ({
    value: size.toString(),
    label: `${size}mm² (${dataForMethod[size]} mV/A/m)`
  }));
  const voltageOptions = [
    { value: "230", label: "230V (Single Phase)" },
    { value: "400", label: "400V (Three Phase)" },
  ];

  const calculate = () => {
    const I = Number(current);
    const L = Number(length);
    const V = Number(supplyVoltage);
    const mvam = selectedMvam;

    if (!isFinite(I) || I <= 0 || !isFinite(L) || L <= 0 || !mvam) {
      setResult(null);
      return;
    }

    // BS 7671 formula: Vd = mV/A/m × Ib × L / 1000
    // Note: mV/A/m values in Appendix 4 account for two conductors (go and return)
    const voltageDrop = (mvam * I * L) / 1000;
    const percentage = (voltageDrop / V) * 100;
    const voltageAtLoad = V - voltageDrop;
    const limit = circuit === "lighting" ? 3 : 5;
    const compliant = percentage <= limit;

    // Maximum length calculation: L = (V × limit% / 100) / (mV/A/m × I / 1000)
    const maxLength = (V * (limit / 100) * 1000) / (mvam * I);

    // Calculate alternatives
    const alternatives = sizes
      .map((size) => {
        const altMvam = dataForMethod[size];
        const altVd = (altMvam * I * L) / 1000;
        const altPct = (altVd / V) * 100;
        return { size, mvam: altMvam, pct: altPct, compliant: altPct <= limit };
      })
      .filter((alt) => alt.compliant)
      .slice(0, 4);

    setResult({
      voltageDrop,
      percentage,
      voltageAtLoad,
      limit,
      compliant,
      mvam,
      maxLength,
      alternatives
    });
  };

  const reset = () => {
    setCircuit("other");
    setFamily("Copper T&E (6242Y)");
    setMethod("Clipped direct (C)");
    setCableSize("");
    setLength("");
    setCurrent("");
    setSupplyVoltage("230");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          <div className="flex-1">
            <CardTitle>Voltage Drop Calculator</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Calculate voltage drop using BS 7671 Appendix 4 tabulated values
            </p>
          </div>
          <Badge variant="outline" className="hidden sm:flex">BS 7671</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-11 bg-elec-dark">
            <TabsTrigger value="calculator" className="text-sm">Calculator</TabsTrigger>
            <TabsTrigger value="guidance" className="text-sm">Guidance</TabsTrigger>
            <TabsTrigger value="standards" className="text-sm">Standards</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                  <Cable className="h-5 w-5" />
                  Cable Selection
                </h3>

                <MobileSelectWrapper
                  label="Circuit Type"
                  value={circuit}
                  onValueChange={setCircuit}
                  options={circuitTypeOptions}
                />

                <MobileSelectWrapper
                  label="Supply Voltage"
                  value={supplyVoltage}
                  onValueChange={setSupplyVoltage}
                  options={voltageOptions}
                />

                <MobileSelectWrapper
                  label="Cable Family"
                  value={family}
                  onValueChange={(v) => {
                    setFamily(v);
                    setMethod(Object.keys(mvamData[v] || {})[0] || "");
                    setCableSize("");
                  }}
                  options={familyOptions}
                />

                <MobileSelectWrapper
                  label="Installation Method (Reference)"
                  value={method}
                  onValueChange={(v) => {
                    setMethod(v);
                    setCableSize("");
                  }}
                  options={methodOptions}
                />

                <MobileSelectWrapper
                  label="Cable Size"
                  value={cableSize}
                  onValueChange={setCableSize}
                  placeholder="Select cable size"
                  options={sizeOptions}
                />

                {selectedMvam && (
                  <Alert className="bg-elec-yellow/10 border-elec-yellow/30">
                    <Info className="h-4 w-4 text-elec-yellow" />
                    <AlertDescription className="text-elec-yellow">
                      <strong>mV/A/m value:</strong> {selectedMvam} mV/A/m
                      <p className="text-xs text-elec-yellow/70 mt-1">From BS 7671 Appendix 4</p>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <MobileInput
                    label="Design Current (A)"
                    type="text"
                    inputMode="decimal"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="e.g. 16"
                    hint="Ib - design current"
                  />
                  <MobileInput
                    label="Cable Length (m)"
                    type="text"
                    inputMode="decimal"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g. 30"
                    hint="One-way route length"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <MobileButton
                    onClick={calculate}
                    variant="elec"
                    className="flex-1"
                    disabled={!selectedMvam || !current || !length}
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate
                  </MobileButton>
                  <MobileButton onClick={reset} variant="elec-outline">
                    <RotateCcw className="h-5 w-5" />
                  </MobileButton>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Results</h3>

                {result ? (
                  <div className="space-y-4">
                    {/* Main Result Card */}
                    <Card className={`border-2 ${
                      result.compliant
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-red-500/50 bg-red-500/10'
                    }`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-4">
                          {result.compliant ? (
                            <CheckCircle className="h-6 w-6 text-green-400" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-400" />
                          )}
                          <span className={`text-lg font-bold ${
                            result.compliant ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {result.compliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Voltage Drop</p>
                            <p className={`text-2xl font-bold ${
                              result.compliant ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {result.voltageDrop.toFixed(2)} V
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Percentage</p>
                            <p className={`text-2xl font-bold ${
                              result.compliant ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {result.percentage.toFixed(2)}%
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Voltage at Load</p>
                            <p className="text-lg font-semibold text-white">
                              {result.voltageAtLoad.toFixed(1)} V
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Max Length @ {current}A</p>
                            <p className="text-lg font-semibold text-white">
                              {result.maxLength.toFixed(1)} m
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* How It Worked Out */}
                    <Card className="border-purple-500/30 bg-purple-500/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-purple-300 text-base flex items-center gap-2">
                          <Calculator className="h-4 w-4" />
                          How It Worked Out
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="space-y-2 font-mono text-xs bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                          <p className="text-purple-200">
                            <span className="text-purple-400">Formula:</span> Vd = (mV/A/m × Ib × L) ÷ 1000
                          </p>
                          <p className="text-purple-200">
                            <span className="text-purple-400">Step 1:</span> mV/A/m = {result.mvam} (from Appendix 4)
                          </p>
                          <p className="text-purple-200">
                            <span className="text-purple-400">Step 2:</span> Vd = ({result.mvam} × {current} × {length}) ÷ 1000
                          </p>
                          <p className="text-purple-200">
                            <span className="text-purple-400">Step 3:</span> Vd = {(result.mvam * Number(current) * Number(length)).toFixed(1)} ÷ 1000 = <strong>{result.voltageDrop.toFixed(2)} V</strong>
                          </p>
                          <p className="text-purple-200">
                            <span className="text-purple-400">Step 4:</span> % = ({result.voltageDrop.toFixed(2)} ÷ {supplyVoltage}) × 100 = <strong>{result.percentage.toFixed(2)}%</strong>
                          </p>
                          <p className={`${result.compliant ? 'text-green-300' : 'text-red-300'}`}>
                            <span className="text-purple-400">Check:</span> {result.percentage.toFixed(2)}% {result.compliant ? '≤' : '>'} {result.limit}% limit → {result.compliant ? 'PASS ✓' : 'FAIL ✗'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Alternative Sizes */}
                    {result.alternatives.length > 0 && (
                      <Card className="border-blue-500/30 bg-blue-500/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-blue-300 text-base">
                            Compliant Cable Sizes
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            {result.alternatives.map((alt) => (
                              <div
                                key={alt.size}
                                className={`flex items-center justify-between p-2 rounded ${
                                  alt.size === Number(cableSize)
                                    ? 'bg-elec-yellow/20 border border-elec-yellow/40'
                                    : 'bg-blue-500/10'
                                }`}
                              >
                                <span className="text-white font-medium">
                                  {alt.size}mm²
                                  <span className="text-muted-foreground text-xs ml-2">
                                    ({alt.mvam} mV/A/m)
                                  </span>
                                </span>
                                <span className="text-green-400 font-mono">
                                  {alt.pct.toFixed(2)}% ✓
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Warning if non-compliant */}
                    {!result.compliant && (
                      <Alert className="border-red-500/30 bg-red-500/10">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <AlertDescription className="text-red-200">
                          <strong>Action Required:</strong> Use a larger cable size or reduce cable length.
                          {result.alternatives.length > 0 && (
                            <span> Recommended: {result.alternatives[0].size}mm² ({result.alternatives[0].pct.toFixed(2)}%)</span>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <TrendingDown className="h-8 w-8 mx-auto mb-2" />
                        <p>Select cable and enter values to calculate voltage drop</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Why This Matters */}
            <WhyThisMatters
              title="Why voltage drop matters"
              points={[
                "Excessive voltage drop causes poor equipment performance - motors struggle to start, lamps dim",
                "BS 7671 limits: 3% for lighting circuits, 5% for other circuits (from origin to final point)",
                "Higher voltage drop wastes energy as heat in cables, increasing running costs",
                "Can cause nuisance tripping of protective devices due to undervoltage",
                "Compliance is a legal requirement under Part P Building Regulations"
              ]}
            />
          </TabsContent>

          <TabsContent value="guidance" className="space-y-6 mt-6">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Practical Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-200 mb-2">When to Check</h4>
                    <ul className="space-y-1 text-sm text-blue-200/80">
                      <li>• Long cable runs (20m+)</li>
                      <li>• High current circuits (32A+)</li>
                      <li>• Sensitive equipment (IT, lighting)</li>
                      <li>• Motor circuits (starting current)</li>
                      <li>• Distant outbuildings/sheds</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-200 mb-2">Solutions for High Drop</h4>
                    <ul className="space-y-1 text-sm text-blue-200/80">
                      <li>• Increase cable CSA (cross-sectional area)</li>
                      <li>• Reduce cable length if possible</li>
                      <li>• Use copper instead of aluminium</li>
                      <li>• Split load across multiple circuits</li>
                      <li>• Consider local sub-distribution</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-amber-200 mb-2">
                    <AlertTriangle className="h-4 w-4 inline mr-2" />
                    Common Mistakes
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-200/80">
                    <li>• Forgetting voltage drop is cumulative from origin to furthest point</li>
                    <li>• Using wrong mV/A/m value for installation method</li>
                    <li>• Not considering startup currents for motors (can be 6-8× running)</li>
                    <li>• Ignoring existing voltage drop from supply to origin</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Typical mV/A/m Values (Quick Reference)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-green-500/30">
                        <th className="text-left py-2 text-green-200">Cable Size</th>
                        <th className="text-center py-2 text-green-200">T&E</th>
                        <th className="text-center py-2 text-green-200">SWA Cu</th>
                        <th className="text-center py-2 text-green-200">SWA Al</th>
                      </tr>
                    </thead>
                    <tbody className="text-green-200/80">
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">1.5mm²</td>
                        <td className="text-center">29</td>
                        <td className="text-center">29</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">2.5mm²</td>
                        <td className="text-center">18</td>
                        <td className="text-center">18</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">4mm²</td>
                        <td className="text-center">11</td>
                        <td className="text-center">11</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">6mm²</td>
                        <td className="text-center">7.3</td>
                        <td className="text-center">7.3</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">10mm²</td>
                        <td className="text-center">4.4</td>
                        <td className="text-center">4.4</td>
                        <td className="text-center">-</td>
                      </tr>
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">16mm²</td>
                        <td className="text-center">2.8</td>
                        <td className="text-center">2.8</td>
                        <td className="text-center">4.6</td>
                      </tr>
                      <tr className="border-b border-green-500/20">
                        <td className="py-2">25mm²</td>
                        <td className="text-center">-</td>
                        <td className="text-center">1.8</td>
                        <td className="text-center">2.9</td>
                      </tr>
                      <tr>
                        <td className="py-2">35mm²</td>
                        <td className="text-center">-</td>
                        <td className="text-center">1.3</td>
                        <td className="text-center">2.1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-green-200/60 mt-2">Values in mV/A/m. For full tables see BS 7671 Appendix 4.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="standards" className="space-y-6 mt-6">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  BS 7671:2018+A3:2024 References
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-200 mb-2">Regulation 525 - Voltage Drop</h4>
                  <p className="text-sm text-blue-200/80 mb-3">
                    "The voltage drop between the origin of an installation and any load point shall not exceed the values in Table 52."
                  </p>
                  <div className="bg-blue-500/20 rounded p-3">
                    <h5 className="font-medium text-blue-200 mb-2">Table 52 - Maximum Voltage Drop</h5>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-blue-500/30">
                          <th className="text-left py-1 text-blue-200">Circuit Type</th>
                          <th className="text-right py-1 text-blue-200">Max %</th>
                          <th className="text-right py-1 text-blue-200">At 230V</th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-200/80">
                        <tr className="border-b border-blue-500/20">
                          <td className="py-1">Lighting</td>
                          <td className="text-right">3%</td>
                          <td className="text-right">6.9V</td>
                        </tr>
                        <tr>
                          <td className="py-1">Other (power, heating)</td>
                          <td className="text-right">5%</td>
                          <td className="text-right">11.5V</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-200 mb-2">Appendix 4 - mV/A/m Values</h4>
                  <p className="text-sm text-blue-200/80 mb-2">
                    Provides tabulated voltage drop values in millivolts per ampere per metre for various cable types and installation methods.
                  </p>
                  <ul className="space-y-1 text-sm text-blue-200/80">
                    <li>• <strong>Table 4D1B:</strong> Single-phase circuits - single cables</li>
                    <li>• <strong>Table 4D2B:</strong> Single-phase circuits - multicore cables</li>
                    <li>• <strong>Table 4D3B:</strong> Three-phase circuits - single cables</li>
                    <li>• <strong>Table 4D4B:</strong> Three-phase circuits - multicore cables</li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-purple-200 mb-2">Voltage Drop Formula</h4>
                  <div className="bg-purple-500/20 rounded p-3 font-mono text-sm">
                    <p className="text-purple-200 mb-2">For single-phase AC:</p>
                    <p className="text-purple-300">Vd = (mV/A/m × Ib × L) ÷ 1000</p>
                    <p className="text-purple-200/60 text-xs mt-2">
                      Where: Vd = voltage drop (V), Ib = design current (A), L = route length (m)
                    </p>
                  </div>
                  <div className="bg-purple-500/20 rounded p-3 font-mono text-sm mt-3">
                    <p className="text-purple-200 mb-2">For three-phase AC:</p>
                    <p className="text-purple-300">Vd = (mV/A/m × Ib × L) ÷ 1000</p>
                    <p className="text-purple-200/60 text-xs mt-2">
                      (Use three-phase mV/A/m values from Tables 4D3B/4D4B)
                    </p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-amber-200 mb-2">
                    <AlertTriangle className="h-4 w-4 inline mr-2" />
                    Important Notes
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-200/80">
                    <li>• Tabulated values assume conductor operating at maximum temperature</li>
                    <li>• Supply voltage tolerance: +10% to -6% of nominal (216.2V to 253V)</li>
                    <li>• mV/A/m values include both line and neutral conductors</li>
                    <li>• Higher values apply when cables are enclosed in thermal insulation</li>
                    <li>• Consider total drop from origin (cutout) not just from consumer unit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;
