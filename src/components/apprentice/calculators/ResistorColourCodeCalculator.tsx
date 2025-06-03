
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sigma } from "lucide-react";

// Define proper types for color values
type ColorWithValue = {
  value: number;
  multiplier: number;
  color: string;
  tolerance?: string;
};

type ColorWithoutValue = {
  multiplier: number;
  color: string;
  tolerance?: string;
};

type ColorValue = ColorWithValue | ColorWithoutValue;

const ResistorColourCodeCalculator = () => {
  const [band1, setBand1] = useState("");
  const [band2, setBand2] = useState("");
  const [band3, setBand3] = useState("");
  const [band4, setBand4] = useState("");
  const [result, setResult] = useState<{
    resistance: number;
    tolerance: string;
    formattedValue: string;
  } | null>(null);

  const colorValues: Record<string, ColorValue> = {
    black: { value: 0, multiplier: 1, color: "#000000" },
    brown: { value: 1, multiplier: 10, color: "#964B00", tolerance: "±1%" },
    red: { value: 2, multiplier: 100, color: "#FF0000", tolerance: "±2%" },
    orange: { value: 3, multiplier: 1000, color: "#FFA500" },
    yellow: { value: 4, multiplier: 10000, color: "#FFFF00" },
    green: { value: 5, multiplier: 100000, color: "#008000", tolerance: "±0.5%" },
    blue: { value: 6, multiplier: 1000000, color: "#0000FF", tolerance: "±0.25%" },
    violet: { value: 7, multiplier: 10000000, color: "#8B00FF", tolerance: "±0.1%" },
    grey: { value: 8, multiplier: 100000000, color: "#808080", tolerance: "±0.05%" },
    white: { value: 9, multiplier: 1000000000, color: "#FFFFFF" },
    gold: { multiplier: 0.1, color: "#FFD700", tolerance: "±5%" },
    silver: { multiplier: 0.01, color: "#C0C0C0", tolerance: "±10%" },
  };

  const toleranceColors = {
    brown: "±1%",
    red: "±2%",
    green: "±0.5%",
    blue: "±0.25%",
    violet: "±0.1%",
    grey: "±0.05%",
    gold: "±5%",
    silver: "±10%",
  };

  // Type guard to check if color has value property
  const hasValue = (color: ColorValue): color is ColorWithValue => {
    return 'value' in color;
  };

  const formatResistance = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)}MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 2)}kΩ`;
    } else {
      return `${value.toFixed(value % 1 === 0 ? 0 : 2)}Ω`;
    }
  };

  const calculateResistance = () => {
    if (!band1 || !band2 || !band3 || !band4) return;

    const color1 = colorValues[band1];
    const color2 = colorValues[band2];
    const color3 = colorValues[band3];
    const tolerance = toleranceColors[band4 as keyof typeof toleranceColors];

    // Check if the colors have value property (digits 1 and 2 must have value)
    if (!hasValue(color1) || !hasValue(color2) || !color3 || !tolerance) return;

    const digit1 = color1.value;
    const digit2 = color2.value;
    const multiplier = color3.multiplier;

    const resistance = (digit1 * 10 + digit2) * multiplier;
    const formattedValue = formatResistance(resistance);

    setResult({
      resistance,
      tolerance,
      formattedValue
    });
  };

  const resetCalculator = () => {
    setBand1("");
    setBand2("");
    setBand3("");
    setBand4("");
    setResult(null);
  };

  const ColorOption = ({ color, name }: { color: string; name: string }) => (
    <div className="flex items-center">
      <div 
        className="w-4 h-4 rounded-full border border-gray-400 mr-2" 
        style={{ backgroundColor: colorValues[name]?.color }}
      />
      <span className="capitalize">{name}</span>
    </div>
  );

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sigma className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Resistor Colour Code Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">1st Band (First Digit)</label>
              <Select value={band1} onValueChange={setBand1}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(colorValues).slice(1, 10).map(([name]) => (
                    <SelectItem key={name} value={name}>
                      <ColorOption color={colorValues[name].color} name={name} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">2nd Band (Second Digit)</label>
              <Select value={band2} onValueChange={setBand2}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(colorValues).slice(0, 10).map(([name]) => (
                    <SelectItem key={name} value={name}>
                      <ColorOption color={colorValues[name].color} name={name} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">3rd Band (Multiplier)</label>
              <Select value={band3} onValueChange={setBand3}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(colorValues).map(([name]) => (
                    <SelectItem key={name} value={name}>
                      <ColorOption color={colorValues[name].color} name={name} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">4th Band (Tolerance)</label>
              <Select value={band4} onValueChange={setBand4}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(toleranceColors).map(([name, tolerance]) => (
                    <SelectItem key={name} value={name}>
                      <div className="flex items-center justify-between w-full">
                        <ColorOption color={colorValues[name].color} name={name} />
                        <span className="text-xs text-muted-foreground ml-2">{tolerance}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateResistance} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!band1 || !band2 || !band3 || !band4}
              >
                <Sigma className="mr-2 h-4 w-4" />
                Calculate
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Resistance Value</h3>
            {result ? (
              <div className="space-y-3">
                <div className="text-2xl font-bold text-white">
                  {result.formattedValue}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Tolerance: {result.tolerance}</p>
                  <p>Exact value: {result.resistance}Ω</p>
                </div>
                
                {/* Visual resistor representation */}
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Resistor bands:</p>
                  <div className="flex items-center gap-1 bg-amber-100 p-2 rounded">
                    <div className="w-6 h-8 border border-gray-400" style={{ backgroundColor: band1 ? colorValues[band1]?.color : '#ccc' }} />
                    <div className="w-6 h-8 border border-gray-400" style={{ backgroundColor: band2 ? colorValues[band2]?.color : '#ccc' }} />
                    <div className="w-6 h-8 border border-gray-400" style={{ backgroundColor: band3 ? colorValues[band3]?.color : '#ccc' }} />
                    <div className="w-2 bg-amber-100"></div>
                    <div className="w-6 h-8 border border-gray-400" style={{ backgroundColor: band4 ? colorValues[band4]?.color : '#ccc' }} />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Select all four colour bands to calculate resistance</p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">How to Read Resistor Colour Codes</h4>
          <p className="text-xs text-muted-foreground">
            Band 1 & 2: First and second significant digits<br/>
            Band 3: Multiplier (number of zeros or decimal multiplier)<br/>
            Band 4: Tolerance (accuracy of the resistor value)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResistorColourCodeCalculator;
