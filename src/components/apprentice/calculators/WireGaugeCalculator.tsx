
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Cable, Info } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WireData {
  awg: string;
  swg: string;
  diameter_mm: number;
  diameter_inch: number;
  area_mm2: number;
  area_circ_mil: number;
  resistance_ohm_km: number;
  current_rating_a: number;
}

const wireGaugeData: WireData[] = [
  { awg: "0000 (4/0)", swg: "7/0", diameter_mm: 11.68, diameter_inch: 0.460, area_mm2: 107.2, area_circ_mil: 211600, resistance_ohm_km: 0.161, current_rating_a: 195 },
  { awg: "000 (3/0)", swg: "6/0", diameter_mm: 10.40, diameter_inch: 0.410, area_mm2: 85.0, area_circ_mil: 167800, resistance_ohm_km: 0.203, current_rating_a: 165 },
  { awg: "00 (2/0)", swg: "5/0", diameter_mm: 9.27, diameter_inch: 0.365, area_mm2: 67.4, area_circ_mil: 133100, resistance_ohm_km: 0.256, current_rating_a: 145 },
  { awg: "0 (1/0)", swg: "4/0", diameter_mm: 8.25, diameter_inch: 0.325, area_mm2: 53.5, area_circ_mil: 105500, resistance_ohm_km: 0.323, current_rating_a: 125 },
  { awg: "1", swg: "3/0", diameter_mm: 7.35, diameter_inch: 0.289, area_mm2: 42.4, area_circ_mil: 83690, resistance_ohm_km: 0.407, current_rating_a: 110 },
  { awg: "2", swg: "2/0", diameter_mm: 6.54, diameter_inch: 0.258, area_mm2: 33.6, area_circ_mil: 66360, resistance_ohm_km: 0.513, current_rating_a: 95 },
  { awg: "4", swg: "0", diameter_mm: 5.19, diameter_inch: 0.204, area_mm2: 21.2, area_circ_mil: 41740, resistance_ohm_km: 0.815, current_rating_a: 70 },
  { awg: "6", swg: "2", diameter_mm: 4.11, diameter_inch: 0.162, area_mm2: 13.3, area_circ_mil: 26240, resistance_ohm_km: 1.296, current_rating_a: 55 },
  { awg: "8", swg: "4", diameter_mm: 3.26, diameter_inch: 0.128, area_mm2: 8.37, area_circ_mil: 16510, resistance_ohm_km: 2.061, current_rating_a: 40 },
  { awg: "10", swg: "6", diameter_mm: 2.59, diameter_inch: 0.102, area_mm2: 5.26, area_circ_mil: 10380, resistance_ohm_km: 3.277, current_rating_a: 30 },
  { awg: "12", swg: "8", diameter_mm: 2.05, diameter_inch: 0.081, area_mm2: 3.31, area_circ_mil: 6530, resistance_ohm_km: 5.211, current_rating_a: 20 },
  { awg: "14", swg: "10", diameter_mm: 1.63, diameter_inch: 0.064, area_mm2: 2.08, area_circ_mil: 4107, resistance_ohm_km: 8.286, current_rating_a: 15 },
  { awg: "16", swg: "12", diameter_mm: 1.29, diameter_inch: 0.051, area_mm2: 1.31, area_circ_mil: 2583, resistance_ohm_km: 13.17, current_rating_a: 10 },
  { awg: "18", swg: "14", diameter_mm: 1.02, diameter_inch: 0.040, area_mm2: 0.823, area_circ_mil: 1624, resistance_ohm_km: 20.95, current_rating_a: 7 }
];

const WireGaugeCalculator = () => {
  const [searchType, setSearchType] = useState<"awg" | "swg" | "diameter" | "current">("awg");
  const [searchValue, setSearchValue] = useState<string>("");
  const [results, setResults] = useState<WireData[]>([]);

  const searchWire = () => {
    if (!searchValue.trim()) {
      setResults([]);
      return;
    }

    let filteredResults: WireData[] = [];

    switch (searchType) {
      case "awg":
        filteredResults = wireGaugeData.filter(wire => 
          wire.awg.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      case "swg":
        filteredResults = wireGaugeData.filter(wire => 
          wire.swg.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      case "diameter":
        const diameterValue = parseFloat(searchValue);
        if (!isNaN(diameterValue)) {
          filteredResults = wireGaugeData.filter(wire => 
            Math.abs(wire.diameter_mm - diameterValue) <= 0.5
          );
        }
        break;
      case "current":
        const currentValue = parseFloat(searchValue);
        if (!isNaN(currentValue)) {
          filteredResults = wireGaugeData.filter(wire => 
            wire.current_rating_a >= currentValue
          ).slice(0, 3); // Show top 3 suitable options
        }
        break;
    }

    setResults(filteredResults);
  };

  const reset = () => {
    setSearchValue("");
    setResults([]);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Wire Gauge Calculator</CardTitle>
        </div>
        <CardDescription>
          Convert between AWG, SWG, diameter, and find suitable wire sizes for your current requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Search Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search-type">Search By</Label>
              <Select value={searchType} onValueChange={(value: "awg" | "swg" | "diameter" | "current") => setSearchType(value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="awg">AWG Size</SelectItem>
                  <SelectItem value="swg">SWG Size</SelectItem>
                  <SelectItem value="diameter">Diameter (mm)</SelectItem>
                  <SelectItem value="current">Current Rating (A)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="search-value">
                {searchType === "awg" ? "AWG Size" : 
                 searchType === "swg" ? "SWG Size" :
                 searchType === "diameter" ? "Diameter (mm)" : "Current (A)"}
              </Label>
              <Input
                id="search-value"
                type={searchType === "diameter" || searchType === "current" ? "number" : "text"}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === "awg" ? "e.g., 12" :
                  searchType === "swg" ? "e.g., 8" :
                  searchType === "diameter" ? "e.g., 2.05" : "e.g., 20"
                }
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={searchWire} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                Search
              </Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-elec-yellow">Wire Specifications</h3>
              {results.map((wire, index) => (
                <div key={index} className="rounded-md bg-elec-dark p-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">AWG {wire.awg}</Badge>
                    <Badge variant="secondary">SWG {wire.swg}</Badge>
                    <Badge variant="outline">{wire.current_rating_a}A Rating</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Diameter:</span>
                      <div className="font-mono text-elec-yellow">
                        {wire.diameter_mm} mm<br />
                        {wire.diameter_inch}" inches
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Area:</span>
                      <div className="font-mono text-elec-yellow">
                        {wire.area_mm2} mm²<br />
                        {wire.area_circ_mil.toLocaleString()} CM
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Resistance:</span>
                      <div className="font-mono text-elec-yellow">
                        {wire.resistance_ohm_km} Ω/km
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Current:</span>
                      <div className="font-mono text-elec-yellow">
                        {wire.current_rating_a} A
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchValue && results.length === 0 && (
            <Alert className="border-yellow-500/20 bg-yellow-500/10">
              <Info className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-200">
                No matching wire sizes found. Try adjusting your search criteria.
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-blue-500/20 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-200">
              Current ratings are for typical copper conductors at 60°C. Always consult BS 7671 for specific installation requirements.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default WireGaugeCalculator;
