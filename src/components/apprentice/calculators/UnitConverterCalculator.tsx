
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, ArrowUpDown } from "lucide-react";
import { useState } from "react";

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

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const fromFactor = conversionCategories[category].units[fromUnit].factor;
    const toFactor = conversionCategories[category].units[toUnit].factor;
    
    // Convert to base unit, then to target unit
    const baseValue = value * fromFactor;
    const convertedValue = baseValue / toFactor;
    
    setResult(convertedValue);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(result.toString());
      setResult(parseFloat(inputValue) || 0);
    }
  };

  const reset = () => {
    setInputValue("");
    setResult(null);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversionCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue("");
    setResult(null);
  };

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
        <div className="space-y-6">
          {/* Category Selection */}
          <div>
            <Label htmlFor="category">Conversion Category</Label>
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
                <Label htmlFor="from-unit">From</Label>
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
                  placeholder="Enter value"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <Label htmlFor="to-unit">To</Label>
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
                <Button onClick={convert} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                  Convert
                </Button>
                <Button variant="outline" onClick={swapUnits} size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={reset} size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Result Section */}
            <div className="space-y-4">
              <div className="rounded-md bg-elec-dark p-6 min-h-[200px] flex flex-col justify-center">
                {result !== null ? (
                  <div className="text-center space-y-4">
                    <div className="text-2xl font-mono text-elec-yellow">
                      {result.toExponential().includes('e') ? result.toExponential(3) : result.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {conversionCategories[category].units[toUnit].name}
                    </div>
                    <Separator />
                    <div className="text-xs text-muted-foreground">
                      {inputValue} {fromUnit} = {result.toExponential().includes('e') ? result.toExponential(3) : result.toLocaleString()} {toUnit}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Enter a value and click Convert
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConverterCalculator;
