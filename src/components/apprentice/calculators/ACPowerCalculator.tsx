
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Zap, RotateCcw, Info, Calculator, Battery } from "lucide-react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";

const ACPowerCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [powerFactor, setPowerFactor] = useState("");
  const [activePower, setActivePower] = useState("");
  const [reactivePower, setReactivePower] = useState("");
  const [apparentPower, setApparentPower] = useState("");
  const [results, setResults] = useState<{
    activePower?: number;
    reactivePower?: number;
    apparentPower?: number;
    powerFactor?: number;
    phaseAngle?: number;
  } | null>(null);

  const calculatePower = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor);

    if (!isNaN(V) && !isNaN(I)) {
      const S = V * I; // Apparent Power
      let P = 0; // Active Power
      let Q = 0; // Reactive Power
      let calculatedPF = 1;
      let phaseAngle = 0;

      if (!isNaN(pf)) {
        calculatedPF = pf;
        P = S * pf;
        phaseAngle = Math.acos(pf) * (180 / Math.PI);
        Q = S * Math.sin(Math.acos(pf));
      } else {
        P = S; // Assume unity power factor if not specified
      }

      setResults({
        activePower: P,
        reactivePower: Q,
        apparentPower: S,
        powerFactor: calculatedPF,
        phaseAngle: phaseAngle
      });
    }
  };

  const calculateFromPowers = () => {
    const P = parseFloat(activePower);
    const Q = parseFloat(reactivePower);

    if (!isNaN(P) && !isNaN(Q)) {
      const S = Math.sqrt(P * P + Q * Q);
      const pf = P / S;
      const phaseAngle = Math.atan(Q / P) * (180 / Math.PI);

      setResults({
        activePower: P,
        reactivePower: Q,
        apparentPower: S,
        powerFactor: pf,
        phaseAngle: phaseAngle
      });
    } else if (!isNaN(P)) {
      const S = parseFloat(apparentPower);
      if (!isNaN(S)) {
        const pf = P / S;
        const Q = Math.sqrt(S * S - P * P);
        const phaseAngle = Math.acos(pf) * (180 / Math.PI);

        setResults({
          activePower: P,
          reactivePower: Q,
          apparentPower: S,
          powerFactor: pf,
          phaseAngle: phaseAngle
        });
      }
    }
  };

  const resetCalculator = () => {
    setVoltage("");
    setCurrent("");
    setPowerFactor("");
    setActivePower("");
    setReactivePower("");
    setApparentPower("");
    setResults(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>AC Power Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate AC power relationships: Active (P), Reactive (Q), and Apparent (S) power
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <DropdownTabs
          placeholder="Select calculation method"
          tabs={[
            {
              value: "voltage-current",
              label: "From V & I",
              icon: Calculator,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MobileInput
                      label="Voltage (V)"
                      type="number"
                      placeholder="230"
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      unit="V"
                    />
                    <MobileInput
                      label="Current (A)"
                      type="number"
                      placeholder="10"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      unit="A"
                    />
                    <MobileInput
                      label="Power Factor (optional)"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      placeholder="0.85"
                      value={powerFactor}
                      onChange={(e) => setPowerFactor(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <MobileButton onClick={calculatePower} variant="elec" className="flex-1">
                      Calculate Power
                    </MobileButton>
                    <MobileButton onClick={resetCalculator} variant="elec-outline">
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
                  </div>
                </div>
              )
            },
            {
              value: "power-components",
              label: "From Power Components",
              icon: Battery,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MobileInput
                      label="Active Power (W)"
                      type="number"
                      placeholder="1000"
                      value={activePower}
                      onChange={(e) => setActivePower(e.target.value)}
                      unit="W"
                    />
                    <MobileInput
                      label="Reactive Power (VAr)"
                      type="number"
                      placeholder="750"
                      value={reactivePower}
                      onChange={(e) => setReactivePower(e.target.value)}
                      unit="VAr"
                    />
                    <MobileInput
                      label="Apparent Power (VA)"
                      type="number"
                      placeholder="1250"
                      value={apparentPower}
                      onChange={(e) => setApparentPower(e.target.value)}
                      unit="VA"
                    />
                  </div>
                  <div className="flex gap-2">
                    <MobileButton onClick={calculateFromPowers} variant="elec" className="flex-1">
                      Calculate from Powers
                    </MobileButton>
                    <MobileButton onClick={resetCalculator} variant="elec-outline">
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
                  </div>
                </div>
              )
            }
          ]}
        />

        {results && (
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-300">AC Power Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-green-200">Active Power (P):</span>
                  <span className="text-green-300 font-mono">{results.activePower?.toFixed(2)} W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Reactive Power (Q):</span>
                  <span className="text-green-300 font-mono">{results.reactivePower?.toFixed(2)} VAr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Apparent Power (S):</span>
                  <span className="text-green-300 font-mono">{results.apparentPower?.toFixed(2)} VA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Power Factor:</span>
                  <span className="text-green-300 font-mono">{results.powerFactor?.toFixed(3)}</span>
                </div>
                {results.phaseAngle !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-green-200">Phase Angle:</span>
                    <span className="text-green-300 font-mono">{results.phaseAngle.toFixed(1)}°</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Info className="h-4 w-4" />
              AC Power Relationships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-blue-200">
              <h4 className="font-medium mb-2">Power Triangle:</h4>
              <ul className="space-y-1 text-blue-200/80">
                <li>• <strong>Active Power (P)</strong> - Real power that does work (Watts)</li>
                <li>• <strong>Reactive Power (Q)</strong> - Power stored/returned by reactive components (VAr)</li>
                <li>• <strong>Apparent Power (S)</strong> - Total power supplied by source (VA)</li>
                <li>• <strong>S² = P² + Q²</strong> (Pythagorean relationship)</li>
                <li>• <strong>Power Factor = P/S = cos(φ)</strong></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ACPowerCalculator;
