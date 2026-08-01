import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, Info, Calculator, RotateCcw, Zap, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  assessMaximumDemand,
  kwToAmps,
  A2_CAUTIONS,
  A2_ROW_LABELS,
  A2_TEXT,
  PREMISES_LABELS,
  type A2Assessment,
  type PremisesType,
} from '@/utils/diversity-table-a2';

const LoadCalculator = () => {
  const [supplyType, setSupplyType] = useState<string>('single-phase');
  const [supplyVoltage, setSupplyVoltage] = useState<string>('230');
  const [lighting, setLighting] = useState<string>('');
  const [sockets, setSockets] = useState<string>('');
  const [heating, setHeating] = useState<string>('');
  const [cooker, setCooker] = useState<string>('');
  const [waterHeating, setWaterHeating] = useState<string>('');
  const [motors, setMotors] = useState<string>('');
  // ELE-1423 — Table A2 gives three premises columns; the household one is not
  // interchangeable with the others (lighting is 66% vs 90%).
  const [premises, setPremises] = useState<PremisesType>('household');
  const [cookerSocket, setCookerSocket] = useState(false);
  // Loads Table A2 predates. A4:2026 requires EV charging in the maximum demand
  // of a single-phase installation; 722.311.201 allows a reduction only where
  // load management actively limits output.
  const [evAndHeatPump, setEvAndHeatPump] = useState<string>('');
  const [result, setResult] = useState<{
    assessment: A2Assessment;
    connectedCurrent: number;
    estimatedCurrent: number;
    recommendedMainSwitch: string;
    supplyAdequacy: string;
  } | null>(null);

  const calculateTotalLoad = () => {
    const voltage = parseFloat(supplyVoltage) || 230;
    const threePhase = supplyType === 'three-phase';
    const amps = (kw: string) => kwToAmps(parseFloat(kw) || 0, voltage, threePhase);

    // ELE-1423 — Table A2 works in AMPERES per circuit or point of utilization,
    // and most rows are "100% of the largest + x% of the others". The previous
    // engine applied flat multipliers to kW totals, which cannot express any of
    // that: the lighting factor was the small-shops figure, and the cooker rule
    // applied a 10 AMPERE threshold to a kW value. Inputs stay in kW because
    // that is how appliances are rated; they are converted here.
    const assessment = assessMaximumDemand(
      premises,
      {
        lighting: { currents: [amps(lighting)] },
        socketsAndStationary: { currents: [amps(sockets)] },
        heatingAndPower: { currents: [amps(heating)] },
        cooking: { currents: [amps(cooker)], cookerControlUnitSocket: cookerSocket },
        waterHeatersThermostatic: { currents: [amps(waterHeating)] },
        motors: { currents: [amps(motors)] },
      },
      amps(evAndHeatPump)
    );

    const estimatedCurrent = assessment.maximumDemand;
    const connectedCurrent = assessment.totalConnected;

    let recommendedMainSwitch = '';
    if (estimatedCurrent <= 32) recommendedMainSwitch = '40A';
    else if (estimatedCurrent <= 50) recommendedMainSwitch = '63A';
    else if (estimatedCurrent <= 63) recommendedMainSwitch = '80A';
    else if (estimatedCurrent <= 80) recommendedMainSwitch = '100A';
    else recommendedMainSwitch = '125A or higher';

    let supplyAdequacy = '';
    if (estimatedCurrent <= 100) supplyAdequacy = 'Standard single phase supply adequate';
    else if (estimatedCurrent <= 200) supplyAdequacy = 'Three phase supply recommended';
    else supplyAdequacy = 'High load - DNO consultation required';

    setResult({
      assessment,
      connectedCurrent,
      estimatedCurrent,
      recommendedMainSwitch,
      supplyAdequacy,
    });
  };

  const resetCalculator = () => {
    setSupplyType('single-phase');
    setSupplyVoltage('230');
    setLighting('');
    setSockets('');
    setHeating('');
    setCooker('');
    setWaterHeating('');
    setMotors('');
    setPremises('household');
    setCookerSocket(false);
    setEvAndHeatPump('');
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart4 className="h-5 w-5 text-elec-yellow" />
          <div>
            <CardTitle>Load Assessment Calculator</CardTitle>
            <CardDescription className="mt-1">
              Maximum demand assessed using the allowances for diversity in On-Site Guide Appendix
              A, Table A2. Enter the connected load per category; the table's rules are applied in
              amperes and the working is shown.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="premises-type">Premises type</Label>
                <Select value={premises} onValueChange={(v) => setPremises(v as PremisesType)}>
                  <SelectTrigger className="bg-card border border-muted/40 h-11 touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    {(Object.keys(PREMISES_LABELS) as PremisesType[]).map((k) => (
                      <SelectItem key={k} value={k}>
                        {PREMISES_LABELS[k]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-white/70">
                  Table A2 gives different allowances per premises type — household lighting is 66%,
                  small shops 90%. No guidance is given for blocks of dwellings, large hotels or
                  industrial premises.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supply-type">Supply Type</Label>
                <Select value={supplyType} onValueChange={setSupplyType}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="single-phase">Single Phase</SelectItem>
                    <SelectItem value="three-phase">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                <Select value={supplyVoltage} onValueChange={setSupplyVoltage}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="230">230V</SelectItem>
                    <SelectItem value="400">400V</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lighting-load">Lighting Load (kW)</Label>
                <Input
                  id="lighting-load"
                  type="number"
                  step="0.1"
                  placeholder="Enter lighting load"
                  className="bg-card border border-muted/40"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                />
                <p className="text-xs text-white/70">{A2_TEXT.lighting[premises]}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="socket-load">Socket Outlets Load (kW)</Label>
                <Input
                  id="socket-load"
                  type="number"
                  step="0.1"
                  placeholder="Enter socket outlets load"
                  className="bg-card border border-muted/40"
                  value={sockets}
                  onChange={(e) => setSockets(e.target.value)}
                />
                <p className="text-xs text-white/70">{A2_TEXT.socketsAndStationary[premises]}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="heating-load">Space Heating Load (kW)</Label>
                <Input
                  id="heating-load"
                  type="number"
                  step="0.1"
                  placeholder="Enter heating load"
                  className="bg-card border border-muted/40"
                  value={heating}
                  onChange={(e) => setHeating(e.target.value)}
                />
                <p className="text-xs text-white/70">{A2_TEXT.heatingAndPower[premises]}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cooker-load">Cooking Load (kW)</Label>
                <Input
                  id="cooker-load"
                  type="number"
                  step="0.1"
                  placeholder="Enter cooker load"
                  className="bg-card border border-muted/40"
                  value={cooker}
                  onChange={(e) => setCooker(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">First 10kW + 30% remainder</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="water-heating-load">Water Heating Load (kW)</Label>
                <Input
                  id="water-heating-load"
                  type="number"
                  step="0.1"
                  placeholder="Enter water heating load"
                  className="bg-card border border-muted/40"
                  value={waterHeating}
                  onChange={(e) => setWaterHeating(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {A2_TEXT.waterHeatersThermostatic[premises]}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motor-load">Motor Load (kW)</Label>
                <Input
                  id="motor-load"
                  type="number"
                  step="0.1"
                  placeholder="Enter motor load"
                  className="bg-card border border-muted/40"
                  value={motors}
                  onChange={(e) => setMotors(e.target.value)}
                />
                <p className="text-xs text-white/70">{A2_TEXT.motors[premises]}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer touch-manipulation">
                <input
                  type="checkbox"
                  checked={cookerSocket}
                  onChange={(e) => setCookerSocket(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--elec-yellow))]"
                />
                <span className="text-xs text-white leading-snug">
                  Socket-outlet incorporated in the cooker control unit
                  <span className="block text-white/60">
                    Table A2 row 3 adds a further 5 A where this is fitted.
                  </span>
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ev-heatpump">EV charging / heat pump (kW)</Label>
              <Input
                id="ev-heatpump"
                type="number"
                inputMode="decimal"
                placeholder="0"
                className="bg-card border border-muted/40 h-11 text-base touch-manipulation"
                value={evAndHeatPump}
                onChange={(e) => setEvAndHeatPump(e.target.value)}
              />
              <p className="text-xs text-white/70">
                Taken at 100% — Table A2 predates these loads, and BS 7671 requires EV charging to
                be included in maximum demand. A lower figure applies only where load management
                actively limits the output (Reg 722.311.201).
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={calculateTotalLoad}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Load
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold">Load Assessment Results</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-white/70">
                        Total connected load (no diversity):
                      </span>
                      <span className="font-semibold text-white">
                        {result.connectedCurrent.toFixed(1)} A
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-elec-yellow/10 rounded">
                      <span className="text-sm font-medium text-white">
                        Assessed maximum demand:
                      </span>
                      <span className="text-xl font-bold text-elec-yellow">
                        {result.estimatedCurrent.toFixed(1)} A
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recommended Equipment:</p>
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Main Switch:</span>
                        <span className="text-green-300">{result.recommendedMainSwitch}</span>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <div className="text-sm text-blue-300">
                        <p className="font-medium text-blue-400">Supply Assessment:</p>
                        <p>{result.supplyAdequacy}</p>
                      </div>
                    </div>
                  </div>

                  {/* Per-row working, so the assessment can be checked against
                      the printed table rather than taken on trust. */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      Table A2 rows applied
                    </p>
                    {result.assessment.rows.map((r) => (
                      <div key={r.row} className="text-xs">
                        <div className="flex justify-between gap-3">
                          <span className="text-white">{A2_ROW_LABELS[r.row]}</span>
                          <span className="tabular-nums shrink-0 text-white">
                            {r.connected.toFixed(1)} A → {r.diversified.toFixed(1)} A
                          </span>
                        </div>
                        <p className="text-white/60 leading-snug">
                          {r.notApplicable
                            ? 'Not applicable to these premises — no allowance taken, full load stands'
                            : r.rule}
                        </p>
                      </div>
                    ))}
                    {result.assessment.fullDemandAdditions > 0 && (
                      <div className="flex justify-between gap-3 text-xs">
                        <span className="text-white">EV charging / heat pump</span>
                        <span className="tabular-nums shrink-0 text-white">
                          {result.assessment.fullDemandAdditions.toFixed(1)} A at 100%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* The two cautions the On-Site Guide prints with Table A2. */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {A2_CAUTIONS.map((c) => (
                      <p key={c} className="text-[11px] leading-snug text-white/70">
                        • {c}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <BarChart4 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Enter load values to calculate assessment</p>
                  </div>
                </div>
              )}
            </div>

            {/* What This Means Panel */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <p className="font-medium">What This Means:</p>
                  <ul className="text-sm space-y-1">
                    <li>
                      • Diversity factors reduce total load as not all equipment operates
                      simultaneously
                    </li>
                    <li>• Current calculation determines cable and protective device sizing</li>
                    <li>• Main switch rating provides adequate discrimination and safety margin</li>
                    <li>• Supply assessment ensures adequate network capacity</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* BS 7671 Guidance */}
            <Alert className="border-green-500/20 bg-green-500/10">
              <Info className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-200">
                <div className="space-y-2">
                  <p className="font-medium">Reference points:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Diversity allowances: On-Site Guide Appendix A, Table A2</li>
                    <li>• BS 7671 has no diversity tables — Reg 311.1 permits diversity</li>
                    <li>• Main switch sizing per Section 537</li>
                    <li>• Supply adequacy assessment per Part 3</li>
                    <li>• Consider future expansion and load growth</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadCalculator;
