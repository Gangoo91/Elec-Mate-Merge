import { useState } from "react";
import { Calculator, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CalculatorType = 'zs' | 'r1r2-temp' | 'voltage-drop' | 'rcd' | 'pfc' | null;

interface TestCalculatorWidgetProps {
  onCalculated?: (value: string) => void;
  className?: string;
}

export const TestCalculatorWidget = ({ onCalculated, className }: TestCalculatorWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calcType, setCalcType] = useState<CalculatorType>(null);
  
  // Zs Calculator states
  const [ze, setZe] = useState("");
  const [r1r2, setR1r2] = useState("");
  const [zsResult, setZsResult] = useState("");
  
  // R1+R2 Temperature Correction states
  const [r20, setR20] = useState("");
  const [tempFactor, setTempFactor] = useState("1.2"); // Default 70°C
  const [rTempResult, setRTempResult] = useState("");
  
  // Voltage Drop states
  const [mvAm, setMvAm] = useState("");
  const [ib, setIb] = useState("");
  const [length, setLength] = useState("");
  const [vdResult, setVdResult] = useState("");
  
  // RCD Trip Time states
  const [rcdRating, setRcdRating] = useState("30");
  const [testCurrent, setTestCurrent] = useState("150"); // 5x for 30mA
  const [maxTripTime, setMaxTripTime] = useState("40");
  
  // PFC states
  const [voltage, setVoltage] = useState("230");
  const [zsForPfc, setZsForPfc] = useState("");
  const [pfcResult, setPfcResult] = useState("");

  const calculateZs = () => {
    const zeVal = parseFloat(ze);
    const r1r2Val = parseFloat(r1r2);
    if (!isNaN(zeVal) && !isNaN(r1r2Val)) {
      const result = zeVal + r1r2Val;
      setZsResult(result.toFixed(3));
      onCalculated?.(result.toFixed(3));
    }
  };

  const calculateRTemp = () => {
    const r20Val = parseFloat(r20);
    const factor = parseFloat(tempFactor);
    if (!isNaN(r20Val) && !isNaN(factor)) {
      const result = r20Val * factor;
      setRTempResult(result.toFixed(3));
      onCalculated?.(result.toFixed(3));
    }
  };

  const calculateVoltageDrop = () => {
    const mvAmVal = parseFloat(mvAm);
    const ibVal = parseFloat(ib);
    const lengthVal = parseFloat(length);
    if (!isNaN(mvAmVal) && !isNaN(ibVal) && !isNaN(lengthVal)) {
      const result = (mvAmVal * ibVal * lengthVal) / 1000;
      setVdResult(result.toFixed(2));
      onCalculated?.(result.toFixed(2));
    }
  };

  const calculatePFC = () => {
    const voltageVal = parseFloat(voltage);
    const zsVal = parseFloat(zsForPfc);
    if (!isNaN(voltageVal) && !isNaN(zsVal) && zsVal !== 0) {
      const result = voltageVal / zsVal;
      setPfcResult(result.toFixed(0));
      onCalculated?.(result.toFixed(0));
    }
  };

  const renderCalculator = () => {
    switch (calcType) {
      case 'zs':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Zs Calculator</h3>
            <p className="text-sm text-white/70">Zs = Ze + (R1 + R2)</p>
            
            <div className="space-y-3">
              <div>
                <Label className="text-white">Ze (External Earth Fault Loop Impedance) Ω</Label>
                <Input
                  type="number"
                  step="0.001"
                  value={ze}
                  onChange={(e) => setZe(e.target.value)}
                  placeholder="e.g., 0.25"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">R1 + R2 (Circuit Resistance) Ω</Label>
                <Input
                  type="number"
                  step="0.001"
                  value={r1r2}
                  onChange={(e) => setR1r2(e.target.value)}
                  placeholder="e.g., 0.15"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <Button
                onClick={calculateZs}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Calculate Zs
              </Button>
              
              {zsResult && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-white/70 mb-1">Result:</p>
                  <p className="text-2xl font-bold text-green-400">{zsResult} Ω</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'r1r2-temp':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">R1+R2 Temperature Correction</h3>
            <p className="text-sm text-white/70">R@temp = R@20°C × correction factor</p>
            
            <div className="space-y-3">
              <div>
                <Label className="text-white">R1+R2 at 20°C (Ω)</Label>
                <Input
                  type="number"
                  step="0.001"
                  value={r20}
                  onChange={(e) => setR20(e.target.value)}
                  placeholder="e.g., 0.15"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">Temperature Correction Factor</Label>
                <select
                  value={tempFactor}
                  onChange={(e) => setTempFactor(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-background/40 border border-elec-yellow/30 text-white"
                >
                  <option value="1.04">30°C - 1.04</option>
                  <option value="1.10">50°C - 1.10</option>
                  <option value="1.2">70°C - 1.20 (common)</option>
                  <option value="1.28">90°C - 1.28</option>
                </select>
              </div>
              
              <Button
                onClick={calculateRTemp}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Calculate R@temp
              </Button>
              
              {rTempResult && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-white/70 mb-1">Result:</p>
                  <p className="text-2xl font-bold text-green-400">{rTempResult} Ω</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'voltage-drop':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Voltage Drop Calculator</h3>
            <p className="text-sm text-white/70">VD = (mV/A/m × Ib × L) ÷ 1000</p>
            
            <div className="space-y-3">
              <div>
                <Label className="text-white">mV/A/m (from cable tables)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={mvAm}
                  onChange={(e) => setMvAm(e.target.value)}
                  placeholder="e.g., 18"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">Design Current Ib (A)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={ib}
                  onChange={(e) => setIb(e.target.value)}
                  placeholder="e.g., 20"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">Cable Length (m)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g., 25"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <Button
                onClick={calculateVoltageDrop}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Calculate Voltage Drop
              </Button>
              
              {vdResult && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-white/70 mb-1">Result:</p>
                  <p className="text-2xl font-bold text-green-400">{vdResult} V</p>
                  <p className="text-xs text-white/60 mt-2">
                    {parseFloat(vdResult) <= 11.5 ? "✓ Within 5% limit (230V)" : "⚠ Exceeds 5% limit"}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'rcd':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">RCD Trip Time Reference</h3>
            
            <div className="space-y-3">
              <div>
                <Label className="text-white">RCD Rating (mA)</Label>
                <select
                  value={rcdRating}
                  onChange={(e) => setRcdRating(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-background/40 border border-elec-yellow/30 text-white"
                >
                  <option value="30">30mA</option>
                  <option value="100">100mA</option>
                  <option value="300">300mA</option>
                </select>
              </div>
              
              <div>
                <Label className="text-white">Test Current</Label>
                <select
                  value={testCurrent}
                  onChange={(e) => setTestCurrent(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-background/40 border border-elec-yellow/30 text-white"
                >
                  <option value="50">½ × IΔn (50% test)</option>
                  <option value="100">1 × IΔn (100% test)</option>
                  <option value="150">5 × IΔn (150mA for 30mA RCD)</option>
                </select>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm text-white font-semibold mb-2">BS 7671 Requirements:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>• ½ × IΔn: Should NOT trip</li>
                  <li>• 1 × IΔn: Must trip within {rcdRating === "30" ? "300ms" : "300ms"}</li>
                  <li>• 5 × IΔn: Must trip within 40ms</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'pfc':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Prospective Fault Current (PFC)</h3>
            <p className="text-sm text-white/70">PFC = Voltage ÷ Zs</p>
            
            <div className="space-y-3">
              <div>
                <Label className="text-white">System Voltage (V)</Label>
                <Input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  placeholder="230"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">Zs (Earth Fault Loop Impedance) Ω</Label>
                <Input
                  type="number"
                  step="0.001"
                  value={zsForPfc}
                  onChange={(e) => setZsForPfc(e.target.value)}
                  placeholder="e.g., 0.40"
                  className="bg-background/40 border-elec-yellow/30 text-white"
                />
              </div>
              
              <Button
                onClick={calculatePFC}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Calculate PFC
              </Button>
              
              {pfcResult && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-sm text-white/70 mb-1">Prospective Fault Current:</p>
                  <p className="text-2xl font-bold text-green-400">{pfcResult} A</p>
                  <p className="text-xs text-white/60 mt-2">
                    Ensure protective device can handle this fault current
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Select Calculator</h3>
            
            <Button
              onClick={() => setCalcType('zs')}
              variant="outline"
              className="w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              Zs Calculator (Ze + R1+R2)
            </Button>
            
            <Button
              onClick={() => setCalcType('r1r2-temp')}
              variant="outline"
              className="w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              R1+R2 Temperature Correction
            </Button>
            
            <Button
              onClick={() => setCalcType('voltage-drop')}
              variant="outline"
              className="w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              Voltage Drop Calculator
            </Button>
            
            <Button
              onClick={() => setCalcType('rcd')}
              variant="outline"
              className="w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              RCD Trip Time Reference
            </Button>
            
            <Button
              onClick={() => setCalcType('pfc')}
              variant="outline"
              className="w-full justify-start border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              Prospective Fault Current (PFC)
            </Button>
          </div>
        );
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className={cn("border-elec-yellow/30 hover:bg-elec-yellow/10 text-white", className)}
      >
        <Calculator className="h-4 w-4 mr-2" />
        Calculator
      </Button>
    );
  }

  return (
    <Card className="p-5 bg-card border-elec-yellow/20 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Test Calculator</h3>
        </div>
        <div className="flex items-center gap-2">
          {calcType && (
            <Button
              onClick={() => setCalcType(null)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white"
            >
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              setIsOpen(false);
              setCalcType(null);
            }}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {renderCalculator()}
    </Card>
  );
};
