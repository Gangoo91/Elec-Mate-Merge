import React, { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, TrendingDown, CheckCircle, XCircle, Info } from "lucide-react";

// Enhanced Voltage Drop Calculator with cable selection and mV/A/m lookup
const mvamData: Record<string, Record<string, Record<number, number>>> = {
  "Copper T&E": {
    "Clipped direct": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "In conduit/trunking": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "Buried direct": { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    "In insulation": { 1: 46, 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0 },
  },
  "Copper SWA": {
    "Clipped direct": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3 },
    "In tray": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3 },
    "Buried direct": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3 },
    "Underground duct": { 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0, 25: 1.9, 35: 1.4 },
  },
  "Copper XLPE": {
    "Clipped direct": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93 },
    "In tray": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93 },
    "Buried direct": { 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3, 50: 0.93 },
    "Underground duct": { 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0, 25: 1.9, 35: 1.4, 50: 0.98 },
  },
  "Aluminium SWA": {
    "Clipped direct": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63 },
    "In tray": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63 },
    "Buried direct": { 16: 4.6, 25: 2.9, 35: 2.1, 50: 1.5, 70: 1.1, 95: 0.80, 120: 0.63 },
    "Underground duct": { 16: 4.9, 25: 3.1, 35: 2.2, 50: 1.6, 70: 1.2, 95: 0.85, 120: 0.67 },
  },
};

function round(value: number, dp = 2) {
  const p = Math.pow(10, dp);
  return Math.round(value * p) / p;
}

const VoltageDropCalculator: React.FC = () => {
  const [circuit, setCircuit] = useState<"lighting" | "other">("other");
  const [family, setFamily] = useState<keyof typeof mvamData>("Copper T&E");
  const [method, setMethod] = useState<string>("Clipped direct");
  const [cableSize, setCableSize] = useState<string>("");
  const [length, setLength] = useState<string>("30");
  const [current, setCurrent] = useState<string>("16");
  const [results, setResults] = useState<any>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const dataForMethod = mvamData[family]?.[method] || {};
  const sizes = Object.keys(dataForMethod).map(Number).sort((a, b) => a - b);
  
  // Get mV/A/m value for selected cable size
  const selectedMvam = cableSize ? dataForMethod[Number(cableSize)] : null;

  const calculate = () => {
    const I = Number(current);
    const Lroute = Number(length);
    const mvam = selectedMvam;
    
    if (!isFinite(I) || I <= 0 || !isFinite(Lroute) || Lroute <= 0 || !mvam) {
      setResults(null);
      return;
    }

    const Ltotal = Lroute * 2; // out + back
    const limit = circuit === "lighting" ? 3 : 5;
    const Vd = (mvam * I * Ltotal) / 1000; // volts
    const pct = (Vd / 230) * 100;
    const within = pct <= limit;

    // Find alternative sizes that would work
    const alternatives = sizes
      .map((size) => {
        const altMvam = dataForMethod[size];
        const altVd = (altMvam * I * Ltotal) / 1000;
        const altPct = (altVd / 230) * 100;
        const altWithin = altPct <= limit;
        return { size, mvam: altMvam, Vd: altVd, pct: altPct, within: altWithin };
      })
      .filter((alt) => alt.within)
      .slice(0, 3);

    const recommended = alternatives[0] || null;

    setResults({ 
      current: I, 
      length: Lroute, 
      Vd, 
      pct, 
      within, 
      limit, 
      mvam, 
      selectedSize: Number(cableSize),
      alternatives,
      recommended 
    });
    setHasCalculated(true);
  };

  const reset = () => {
    setCircuit("other");
    setFamily("Copper T&E");
    setMethod("Clipped direct");
    setCableSize("");
    setLength("30");
    setCurrent("16");
    setResults(null);
    setHasCalculated(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-elec-yellow" />
        <h3 className="text-lg font-semibold text-foreground">Enhanced Voltage Drop Calculator</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Circuit Type */}
        <div className="space-y-2">
          <Label className="text-foreground">Circuit type</Label>
          <RadioGroup
            value={circuit}
            onValueChange={(v) => setCircuit((v as "lighting" | "other") ?? "other")}
            className="grid grid-cols-1 gap-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem id="vd-light" value="lighting" />
              <Label htmlFor="vd-light">Lighting (3% limit)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem id="vd-other" value="other" />
              <Label htmlFor="vd-other">Other/Power (5% limit)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Cable Family */}
        <div className="space-y-2">
          <Label className="text-foreground">Cable family</Label>
          <Select value={family} onValueChange={(v) => {
            setFamily(v as keyof typeof mvamData);
            setMethod("Clipped direct");
            setCableSize("");
          }}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select family" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mvamData).map((k) => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Installation Method */}
        <div className="space-y-2">
          <Label className="text-foreground">Installation method</Label>
          <Select value={method} onValueChange={(v) => {
            setMethod(v);
            setCableSize("");
          }}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mvamData[family] || {}).map((k) => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cable Size */}
        <div className="space-y-2">
          <Label className="text-foreground">Cable size (mm²)</Label>
          <Select value={cableSize} onValueChange={setCableSize}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}mm² - {dataForMethod[size]} mV/A/m
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Show selected mV/A/m value */}
      {selectedMvam && (
        <div className="mb-4 p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-elec-yellow" />
            <span className="text-sm font-medium text-foreground">
              Selected: {cableSize}mm² {family} {method} = <strong>{selectedMvam} mV/A/m</strong>
            </span>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Load Current */}
        <div className="space-y-2">
          <Label className="text-foreground">Load current (A)</Label>
          <Input
            inputMode="decimal"
            value={current}
            onChange={(e) => setCurrent(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
            className="bg-background"
            placeholder="e.g. 16"
          />
        </div>

        {/* Route Length */}
        <div className="space-y-2">
          <Label className="text-foreground">Route length (m)</Label>
          <Input
            inputMode="decimal"
            value={length}
            onChange={(e) => setLength(e.target.value.replace(/[^0-9.+\-eE]/g, ""))}
            className="bg-background"
            placeholder="e.g. 30"
          />
          <p className="text-xs text-muted-foreground">One-way route length. Calculator doubles this for total circuit path.</p>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex gap-2 mb-6">
        <Button 
          onClick={calculate} 
          className="flex-1"
          disabled={!selectedMvam || !current || !length}
        >
          <TrendingDown className="w-4 h-4 mr-2" />
          Calculate Voltage Drop
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>

      {/* Results */}
      {hasCalculated && (
        <div className="space-y-4">
          {results?.within ? (
            <div className="rounded-lg p-4 bg-emerald-500/10 border border-emerald-400/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h4 className="font-semibold text-foreground">Selected cable PASSES: {results.selectedSize}mm²</h4>
              </div>
              <p className="text-sm text-foreground mb-2">
                Voltage drop: {round(results.Vd, 2)} V ({round(results.pct, 2)}%) ≤ {results.limit}% limit
              </p>
              <p className="text-xs text-muted-foreground">
                This meets BS 7671 voltage drop guidance for {circuit} circuits.
              </p>
            </div>
          ) : (
            <div className="rounded-lg p-4 bg-red-500/10 border border-red-400/30">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-foreground">Selected cable FAILS: {results.selectedSize}mm²</h4>
              </div>
              <p className="text-sm text-foreground mb-2">
                Voltage drop: {round(results.Vd, 2)} V ({round(results.pct, 2)}%) &gt; {results.limit}% limit
              </p>
              {results.recommended && (
                <p className="text-sm text-foreground">
                  <strong>Suggested:</strong> Use {results.recommended.size}mm² instead → {round(results.recommended.pct, 2)}% ✓
                </p>
              )}
            </div>
          )}

          {/* Cable Size Suggestions */}
          {results?.alternatives?.length > 0 && (
            <div className="rounded-lg p-4 bg-elec-dark/10 border border-border/20">
              <h4 className="font-semibold text-foreground mb-3">Cable sizes that would work:</h4>
              <div className="grid gap-2">
                {results.alternatives.map((alt: any) => (
                  <div key={alt.size} className="flex items-center justify-between text-sm p-2 bg-emerald-500/10 rounded">
                    <span className="text-foreground font-medium">{alt.size}mm² ({alt.mvam} mV/A/m)</span>
                    <span className="text-emerald-400">
                      {round(alt.pct, 2)}% ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Based on typical Appendix 4 values. Always verify against BS 7671 and manufacturer data.
          </p>
        </div>
      )}
    </div>
  );
};

export default VoltageDropCalculator;
