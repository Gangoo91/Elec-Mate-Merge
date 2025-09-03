import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeftRight, RotateCcw, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";

interface ConversionCategory {
  name: string;
  units: { [key: string]: { name: string; factor: number } };
}

const conversionCategories: { [key: string]: ConversionCategory } = {
  power: {
    name: "Power",
    units: {
      W: { name: "Watts", factor: 1 },
      kW: { name: "Kilowatts", factor: 1000 },
      MW: { name: "Megawatts", factor: 1000000 },
      hp: { name: "Horsepower", factor: 745.7 },
      BTU: { name: "BTU/hour", factor: 0.293071 }
    }
  },
  voltage: {
    name: "Voltage",
    units: {
      V: { name: "Volts", factor: 1 },
      kV: { name: "Kilovolts", factor: 1000 },
      mV: { name: "Millivolts", factor: 0.001 }
    }
  },
  current: {
    name: "Current",
    units: {
      A: { name: "Amperes", factor: 1 },
      mA: { name: "Milliamperes", factor: 0.001 },
      kA: { name: "Kiloamperes", factor: 1000 }
    }
  },
  resistance: {
    name: "Resistance",
    units: {
      "Ω": { name: "Ohms", factor: 1 },
      "kΩ": { name: "Kilohms", factor: 1000 },
      "MΩ": { name: "Megohms", factor: 1000000 },
      "mΩ": { name: "Milliohms", factor: 0.001 }
    }
  },
  energy: {
    name: "Energy",
    units: {
      J: { name: "Joules", factor: 1 },
      kJ: { name: "Kilojoules", factor: 1000 },
      Wh: { name: "Watt-hours", factor: 3600 },
      kWh: { name: "Kilowatt-hours", factor: 3600000 }
    }
  }
};

const UnitConverterCalculator = () => {
  const [category, setCategory] = useState<string>("power");
  const [fromUnit, setFromUnit] = useState<string>("W");
  const [toUnit, setToUnit] = useState<string>("kW");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [equation, setEquation] = useState<string>("");

  // Format values for display with thousands separators and scientific notation for extremes
  const formatValue = (value: number): string => {
    if (value >= 1e6 || (value < 1e-3 && value > 0)) {
      return value.toExponential(3);
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  // Get equivalent units for the current category
  const getEquivalentUnits = (baseValue: number) => {
    const units = conversionCategories[category].units;
    return Object.entries(units)
      .filter(([key]) => key !== toUnit)
      .map(([key, unit]) => ({
        unit: key,
        name: unit.name,
        value: baseValue / unit.factor
      }));
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const fromFactor = conversionCategories[category].units[fromUnit].factor;
    const toFactor = conversionCategories[category].units[toUnit].factor;
    
    // Convert to base unit, then to target unit
    const baseValue = value * fromFactor;
    const convertedValue = baseValue / toFactor;
    
    setResult(convertedValue);
    
    // Create equation string
    const conversionFactor = fromFactor / toFactor;
    setEquation(`${formatValue(value)} ${fromUnit} × ${formatValue(conversionFactor)} = ${formatValue(convertedValue)} ${toUnit}`);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() && !isNaN(parseFloat(inputValue))) {
      convert();
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // If we have a result, swap the values and re-convert
    if (result !== null && inputValue) {
      const newInput = result.toString();
      setInputValue(newInput);
      // Trigger conversion with swapped units
      setTimeout(() => {
        const value = parseFloat(newInput);
        if (!isNaN(value)) {
          const fromFactor = conversionCategories[category].units[toUnit].factor; // Note: swapped
          const toFactor = conversionCategories[category].units[temp].factor; // Note: swapped
          
          const baseValue = value * fromFactor;
          const convertedValue = baseValue / toFactor;
          
          setResult(convertedValue);
          
          const conversionFactor = fromFactor / toFactor;
          setEquation(`${formatValue(value)} ${toUnit} × ${formatValue(conversionFactor)} = ${formatValue(convertedValue)} ${temp}`);
        }
      }, 0);
    }
  };

  const reset = () => {
    setInputValue("");
    setResult(null);
    setEquation("");
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversionCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue("");
    setResult(null);
    setEquation("");
  };

  // Get category-specific guidance
  const getWhyThisMatters = () => {
    const points: { [key: string]: string[] } = {
      power: [
        "1 kW = 1000 W - Essential for electrical load calculations",
        "Estimate current draw: I ≈ P/V (e.g., 3 kW ÷ 230 V ≈ 13 A)",
        "Common appliances: kettle ~3 kW, LED bulb ~10 W, oven ~2.5 kW"
      ],
      voltage: [
        "UK domestic: 230 V single-phase, 400 V three-phase",
        "Distribution: 11 kV, 33 kV for substations and networks",
        "Sensor readings: mV ranges for thermocouples and instrumentation"
      ],
      current: [
        "MCB and conductor sizing depends on current rating",
        "Typical ratings: 6A lighting, 16A sockets, 32A cooker circuits",
        "Fault current calculations require kA for discrimination"
      ],
      resistance: [
        "Continuity testing: < 0.05 Ω for protective conductors",
        "Insulation resistance: > 1 MΩ @ 500V for most circuits",
        "Earth fault loop: Zs values determine disconnection times"
      ],
      energy: [
        "Billing uses kWh: 1 kWh = 3.6 MJ (physics to practical)",
        "Quick check: 3 kW appliance × 2 hours = 6 kWh",
        "Battery storage commonly rated in kWh for capacity"
      ]
    };
    return points[category] || [];
  };

  const getPracticalGuidance = () => {
    const guidance: { [key: string]: string[] } = {
      power: ["Use kW for appliance ratings and load calculations", "W for smaller devices and LED lighting"],
      voltage: ["Always measure actual voltage - nominal vs actual can vary", "kV for HV work, mV for sensor circuits"],
      current: ["Consider diversity factors when sizing", "Account for starting currents with motors"],
      resistance: ["Use appropriate test voltage for measurement type", "Temperature affects resistance readings"],
      energy: ["kWh for energy consumption and billing", "J for battery and capacitor energy storage"]
    };
    return guidance[category] || [];
  };

  const isInputValid = inputValue.trim() && !isNaN(parseFloat(inputValue));

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Unit Converter</CardTitle>
        </div>
        <CardDescription>
          Convert between different electrical units including power, voltage, current, resistance, and energy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="category">Conversion Category</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-4 h-4 rounded-full bg-muted text-xs flex items-center justify-center cursor-help">?</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose the type of electrical unit to convert</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(conversionCategories).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="from-unit">From</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-4 h-4 rounded-full bg-muted text-xs flex items-center justify-center cursor-help">?</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select the unit you're converting from</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {Object.entries(conversionCategories[category].units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name} ({key})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="input-value">Value</Label>
                  <Input
                    id="input-value"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter value"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                  {!isInputValid && inputValue && (
                    <p className="text-sm text-red-400 mt-1">Please enter a valid number</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="to-unit">To</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-4 h-4 rounded-full bg-muted text-xs flex items-center justify-center cursor-help">?</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select the unit you're converting to</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      {Object.entries(conversionCategories[category].units).map(([key, unit]) => (
                        <SelectItem key={key} value={key}>
                          {unit.name} ({key})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={convert} 
                    disabled={!isInputValid}
                    className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Convert
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" onClick={swapUnits} size="icon">
                        <ArrowLeftRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Swap units</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" onClick={reset} size="icon">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <div className="rounded-md bg-elec-dark p-6 min-h-[200px] flex flex-col justify-center">
                  {result !== null ? (
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-mono text-elec-yellow">
                        {formatValue(result)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {conversionCategories[category].units[toUnit].name}
                      </div>
                      <Separator />
                      <div className="text-xs text-muted-foreground">
                        {equation}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Enter a value and click Convert or press Enter
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Equivalent Units Display */}
            {result !== null && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Other Equivalent Units</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {getEquivalentUnits(parseFloat(inputValue) * conversionCategories[category].units[fromUnit].factor).map(({ unit, name, value }) => (
                      <div key={unit} className="bg-elec-dark rounded-md p-3 border border-elec-yellow/20">
                        <div className="font-mono text-elec-yellow">{formatValue(value)}</div>
                        <div className="text-sm text-muted-foreground">{name} ({unit})</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why This Matters Section */}
                <WhyThisMatters points={getWhyThisMatters()} />

                {/* Practical Guidance */}
                <InfoBox
                  title="Practical Guidance"
                  points={getPracticalGuidance()}
                  className="bg-elec-dark/50"
                />
              </div>
            )}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default UnitConverterCalculator;