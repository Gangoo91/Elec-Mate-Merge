
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Zap, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zsValues, curveTypes, fuseTypes } from "./zs-values/ZsValuesData";
import ZsLookupResult from "./zs-lookup/ZsLookupResult";
import ZsLookupGuidance from "./zs-lookup/ZsLookupGuidance";
import ZsLookupStandards from "./zs-lookup/ZsLookupStandards";

const BS7671ZsLookupCalculator = () => {
  const [searchType, setSearchType] = useState("device");
  const [deviceType, setDeviceType] = useState("");
  const [deviceRating, setDeviceRating] = useState("");
  const [curve, setCurve] = useState("");
  const [measuredZs, setMeasuredZs] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [complianceCheck, setComplianceCheck] = useState<any>(null);
  const [quickDevice, setQuickDevice] = useState("");

  const performLookup = () => {
    if (searchType === "device" && deviceType) {
      // Show all values for a specific device type
      const deviceData = zsValues[deviceType as keyof typeof zsValues];
      if (deviceData) {
        const deviceResults = [];
        
        if (deviceType === "mcb" || deviceType === "rcbo") {
          // For MCBs/RCBOs, show all curve types and ratings
          for (const [curveKey, curveLabel] of Object.entries(curveTypes)) {
            const curveData = deviceData[curveKey as keyof typeof deviceData] as any;
            if (curveData) {
              for (const [rating, maxZs] of Object.entries(curveData)) {
                deviceResults.push({
                  device: deviceType.toUpperCase(),
                  curve: curveLabel,
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`
                });
              }
            }
          }
        } else {
          // For fuses, show ratings directly
          for (const [rating, maxZs] of Object.entries(deviceData)) {
            deviceResults.push({
              device: fuseTypes[deviceType as keyof typeof fuseTypes] || deviceType.toUpperCase(),
              curve: "N/A",
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`
            });
          }
        }
        
        setResults(deviceResults);
      }
    } else if (searchType === "compliance" && measuredZs) {
      // Check compliance against a measured Zs value
      checkCompliance();
    }
  };

  const checkCompliance = () => {
    const zsValue = parseFloat(measuredZs);
    if (isNaN(zsValue)) return;

    const compliantDevices = [];

    // Check all devices
    for (const [deviceKey, deviceData] of Object.entries(zsValues)) {
      if (deviceKey === "mcb" || deviceKey === "rcbo") {
        for (const [curveKey, curveData] of Object.entries(deviceData)) {
          for (const [rating, maxZs] of Object.entries(curveData as any)) {
            if (zsValue <= (maxZs as number)) {
              compliantDevices.push({
                device: deviceKey.toUpperCase(),
                curve: curveTypes[curveKey as keyof typeof curveTypes],
                rating: `${rating}A`,
                maxZs: `${maxZs}Ω`,
                margin: `${((maxZs as number) - zsValue).toFixed(3)}Ω`
              });
            }
          }
        }
      } else {
        for (const [rating, maxZs] of Object.entries(deviceData)) {
          if (zsValue <= (maxZs as number)) {
            compliantDevices.push({
              device: fuseTypes[deviceKey as keyof typeof fuseTypes] || deviceKey.toUpperCase(),
              curve: "N/A",
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              margin: `${((maxZs as number) - zsValue).toFixed(3)}Ω`
            });
          }
        }
      }
    }

    setComplianceCheck({
      measuredZs: zsValue,
      compliantDevices: compliantDevices.sort((a, b) => parseFloat(a.margin) - parseFloat(b.margin))
    });
  };


  const handleQuickDevice = (value: string) => {
    setQuickDevice(value);
    // Parse common formats like "B32", "C16", "D40"
    const match = value.match(/^([BCD])(\d+)$/i);
    if (match) {
      const [, curveChar, rating] = match;
      setDeviceType("mcb");
      setCurve(curveChar.toLowerCase());
      setDeviceRating(rating);
    }
  };

  const resetCalculator = () => {
    setSearchType("device");
    setDeviceType("");
    setDeviceRating("");
    setCurve("");
    setMeasuredZs("");
    setResults([]);
    setComplianceCheck(null);
    setQuickDevice("");
  };

  return (
    <div className="bg-elec-grey min-h-screen">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-light">BS7671 Zs Lookup Table</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="results" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-elec-dark">
              <TabsTrigger value="results" className="text-elec-light">Results</TabsTrigger>
              <TabsTrigger value="guidance" className="text-elec-light">Guidance</TabsTrigger>
              <TabsTrigger value="standards" className="text-elec-light">Standards</TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="search-type">Search Type</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select search type" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20">
                        <SelectItem value="device">Lookup by Device Type</SelectItem>
                        <SelectItem value="compliance">Check Compliance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {searchType === "device" && (
                    <div>
                      <Label htmlFor="quick-device">Quick Device (e.g. B32, C16)</Label>
                      <Input
                        id="quick-device"
                        value={quickDevice}
                        onChange={(e) => handleQuickDevice(e.target.value)}
                        placeholder="B32, C16, D40..."
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                  )}
                </div>

                {searchType === "device" && (
                  <div>
                    <Label htmlFor="device-type">Device Type</Label>
                    <Select value={deviceType} onValueChange={setDeviceType}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20">
                        <SelectItem value="mcb">MCB (Miniature Circuit Breaker)</SelectItem>
                        <SelectItem value="rcbo">RCBO (RCD + MCB)</SelectItem>
                        {Object.entries(fuseTypes).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {searchType === "compliance" && (
                  <div>
                    <Label htmlFor="measured-zs">Measured Zs Value (Ω)</Label>
                    <Input
                      id="measured-zs"
                      type="number"
                      step="0.001"
                      value={measuredZs}
                      onChange={(e) => setMeasuredZs(e.target.value)}
                      placeholder="e.g., 0.75"
                      className="bg-elec-dark border-elec-yellow/20"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={performLookup}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    disabled={searchType === "device" ? !deviceType : !measuredZs}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {searchType === "device" ? "Show Values" : "Check Compliance"}
                  </Button>
                  
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </div>

              <ZsLookupResult
                searchType={searchType}
                results={results}
                complianceCheck={complianceCheck}
                measuredZs={measuredZs}
              />
            </TabsContent>

            <TabsContent value="guidance">
              <ZsLookupGuidance />
            </TabsContent>

            <TabsContent value="standards">
              <ZsLookupStandards />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671ZsLookupCalculator;
