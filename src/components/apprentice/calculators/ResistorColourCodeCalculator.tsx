
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sigma, Info } from "lucide-react";

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
    if (value >= 1000000000000) {
      return `${(value / 1000000000000).toFixed(value % 1000000000000 === 0 ? 0 : 2)}TΩ`;
    } else if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 2)}GΩ`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)}MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 2)}kΩ`;
    } else {
      return `${value.toFixed(value % 1 === 0 ? 0 : 2)}Ω`;
    }
  };

  const calculateToleranceRange = (resistance: number, tolerance: string): { min: number; max: number } => {
    const percent = parseFloat(tolerance.replace('±', '').replace('%', '')) / 100;
    const range = resistance * percent;
    return {
      min: resistance - range,
      max: resistance + range
    };
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
        className="w-4 h-4 rounded-full border-2 border-border mr-2 shadow-sm" 
        style={{ backgroundColor: colorValues[name]?.color }}
        aria-label={`${name} color swatch`}
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
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-2 block">1st Band (First Digit)</label>
                <Select value={band1} onValueChange={setBand1}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                    <SelectValue placeholder="Select colour" />
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
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                    <SelectValue placeholder="Select colour" />
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
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                    <SelectValue placeholder="Select colour" />
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
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-10">
                    <SelectValue placeholder="Select colour" />
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
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
              <MobileButton 
                onClick={calculateResistance} 
                variant="elec"
                disabled={!band1 || !band2 || !band3 || !band4}
                className="text-sm sm:text-base"
              >
                <Sigma className="mr-2 h-4 w-4" />
                Calculate
              </MobileButton>
              <MobileButton variant="outline" onClick={resetCalculator} className="text-sm sm:text-base">
                Reset
              </MobileButton>
            </div>

            {/* Visual resistor representation */}
            {(band1 || band2 || band3 || band4) && (
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs font-medium mb-2 text-muted-foreground">Resistor Preview:</p>
                <div className="flex items-center justify-center gap-1 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md">
                  <div className="w-3 h-6 sm:w-4 sm:h-8 border border-border rounded-sm" 
                       style={{ backgroundColor: band1 ? colorValues[band1]?.color : 'transparent' }} 
                       aria-label="First band" />
                  <div className="w-3 h-6 sm:w-4 sm:h-8 border border-border rounded-sm" 
                       style={{ backgroundColor: band2 ? colorValues[band2]?.color : 'transparent' }} 
                       aria-label="Second band" />
                  <div className="w-3 h-6 sm:w-4 sm:h-8 border border-border rounded-sm" 
                       style={{ backgroundColor: band3 ? colorValues[band3]?.color : 'transparent' }} 
                       aria-label="Multiplier band" />
                  <div className="w-1 sm:w-2 bg-amber-50 dark:bg-amber-950/20"></div>
                  <div className="w-3 h-6 sm:w-4 sm:h-8 border border-border rounded-sm" 
                       style={{ backgroundColor: band4 ? colorValues[band4]?.color : 'transparent' }} 
                       aria-label="Tolerance band" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {result ? (
              <>
                <ResultCard
                  title="Resistance Value"
                  value={result.formattedValue}
                  status="success"
                />
                <ResultCard
                  title="Tolerance"
                  value={result.tolerance}
                  subtitle="Accuracy range"
                />
                <ResultCard
                  title="Value Range"
                  value={(() => {
                    const range = calculateToleranceRange(result.resistance, result.tolerance);
                    return `${formatResistance(range.min)} - ${formatResistance(range.max)}`;
                  })()}
                  subtitle="Min - Max values"
                />
                <ResultCard
                  title="Exact Value"
                  value={formatResistance(result.resistance)}
                  subtitle="Precise calculation"
                />
              </>
            ) : (
              <ResultCard
                title="Resistance Calculator"
                isEmpty={true}
                emptyMessage="Select all four colour bands to calculate resistance value"
                icon={<Sigma className="h-8 w-8" />}
              />
            )}
          </div>
        </div>

        {/* Help section */}
        <div className="bg-info/5 border border-info/20 rounded-lg p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-info/10 flex items-center justify-center">
              <Info className="h-4 w-4 text-info" />
            </div>
            <h4 className="text-base font-semibold text-info">Quick Reference</h4>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-3 bg-card/50 rounded-md border border-border/50">
              <div className="flex-shrink-0 w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center">
                <span className="text-xs font-bold text-elec-yellow">1-2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">First & Second Bands</p>
                <p className="text-xs text-muted-foreground mt-0.5">Significant digits that form the base value</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-card/50 rounded-md border border-border/50">
              <div className="flex-shrink-0 w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center">
                <span className="text-xs font-bold text-elec-yellow">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Third Band</p>
                <p className="text-xs text-muted-foreground mt-0.5">Multiplier (adds zeros or decimal factor)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-card/50 rounded-md border border-border/50">
              <div className="flex-shrink-0 w-6 h-6 rounded bg-elec-yellow/20 flex items-center justify-center">
                <span className="text-xs font-bold text-elec-yellow">4</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Fourth Band</p>
                <p className="text-xs text-muted-foreground mt-0.5">Tolerance (accuracy percentage)</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="grid gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-muted-foreground">Read left to right, tolerance band typically has a gap</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-muted-foreground">Common: Gold (±5%), Silver (±10%), Brown (±1%)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResistorColourCodeCalculator;
