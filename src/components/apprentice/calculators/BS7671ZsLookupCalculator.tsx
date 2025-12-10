import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Zap, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zsValues, zsValues5s, curveTypes, fuseTypes, rcdZsValues, disconnectionTimes, getTableReference, get80PercentZs } from "./zs-values/ZsValuesData";
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
  const [disconnectionTime, setDisconnectionTime] = useState<"0.4" | "5">("0.4");

  const getZsData = () => {
    return disconnectionTime === "0.4" ? zsValues : zsValues5s;
  };

  const performLookup = () => {
    if (searchType === "device" && deviceType) {
      const data = getZsData();
      const deviceResults: any[] = [];
      const tableRef = getTableReference(deviceType, disconnectionTime);
      
      if (deviceType === "rcd") {
        // RCD values from Table 41.5
        for (const [rating, maxZs] of Object.entries(rcdZsValues)) {
          deviceResults.push({
            device: "RCD",
            curve: "N/A",
            rating: `${rating}mA`,
            maxZs: `${maxZs}Ω`,
            testZs: `${get80PercentZs(maxZs)}Ω`,
            tableRef: "Table 41.5"
          });
        }
      } else if (deviceType === "mcb" || deviceType === "rcbo") {
        const deviceData = data[deviceType as keyof typeof data];
        if (deviceData) {
          for (const [curveKey, curveLabel] of Object.entries(curveTypes)) {
            const curveData = deviceData[curveKey as keyof typeof deviceData] as any;
            if (curveData) {
              for (const [rating, maxZs] of Object.entries(curveData)) {
                deviceResults.push({
                  device: deviceType.toUpperCase(),
                  curve: curveLabel,
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`,
                  testZs: `${get80PercentZs(maxZs as number)}Ω`,
                  tableRef
                });
              }
            }
          }
        }
      } else {
        // Fuse types
        const fuseData = data[deviceType as keyof typeof data];
        if (fuseData && typeof fuseData === 'object') {
          for (const [rating, maxZs] of Object.entries(fuseData)) {
            deviceResults.push({
              device: fuseTypes[deviceType as keyof typeof fuseTypes] || deviceType.toUpperCase(),
              curve: "N/A",
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              testZs: `${get80PercentZs(maxZs as number)}Ω`,
              tableRef
            });
          }
        }
      }
      
      setResults(deviceResults);
    } else if (searchType === "compliance" && measuredZs) {
      checkCompliance();
    }
  };

  const checkCompliance = () => {
    const zsValue = parseFloat(measuredZs);
    if (isNaN(zsValue)) return;

    const compliantDevices: any[] = [];
    const data = getZsData();
    const tableRef = disconnectionTime === "0.4" ? "Table 41.3/41.2" : "Table 41.3/41.4";

    // Check MCBs and RCBOs
    for (const deviceKey of ["mcb", "rcbo"]) {
      const deviceData = data[deviceKey as keyof typeof data];
      if (deviceData && typeof deviceData === 'object') {
        for (const [curveKey, curveData] of Object.entries(deviceData)) {
          if (typeof curveData === 'object') {
            for (const [rating, maxZs] of Object.entries(curveData as any)) {
              const testZs = get80PercentZs(maxZs as number);
              if (zsValue <= testZs) {
                compliantDevices.push({
                  device: deviceKey.toUpperCase(),
                  curve: curveTypes[curveKey as keyof typeof curveTypes],
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`,
                  testZs: `${testZs}Ω`,
                  margin: `${(testZs - zsValue).toFixed(3)}Ω`,
                  tableRef
                });
              }
            }
          }
        }
      }
    }

    // Check fuses
    for (const [fuseKey, fuseName] of Object.entries(fuseTypes)) {
      const fuseData = data[fuseKey as keyof typeof data];
      if (fuseData && typeof fuseData === 'object') {
        for (const [rating, maxZs] of Object.entries(fuseData)) {
          const testZs = get80PercentZs(maxZs as number);
          if (zsValue <= testZs) {
            compliantDevices.push({
              device: fuseName,
              curve: "N/A",
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              testZs: `${testZs}Ω`,
              margin: `${(testZs - zsValue).toFixed(3)}Ω`,
              tableRef: disconnectionTime === "0.4" ? "Table 41.2" : "Table 41.4"
            });
          }
        }
      }
    }

    // Check RCDs (Table 41.5)
    for (const [rating, maxZs] of Object.entries(rcdZsValues)) {
      const testZs = get80PercentZs(maxZs);
      if (zsValue <= testZs) {
        compliantDevices.push({
          device: "RCD",
          curve: "N/A",
          rating: `${rating}mA`,
          maxZs: `${maxZs}Ω`,
          testZs: `${testZs}Ω`,
          margin: `${(testZs - zsValue).toFixed(3)}Ω`,
          tableRef: "Table 41.5"
        });
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
      setCurve(`type-${curveChar.toLowerCase()}`);
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
    setDisconnectionTime("0.4");
  };

  return (
    <div className="bg-elec-grey min-h-screen">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-light">BS 7671 Zs Lookup (Tables 41.2-41.5)</CardTitle>
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
                        <SelectItem value="compliance">Check Compliance (80% rule)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="disconnection-time">Disconnection Time</Label>
                    <Select value={disconnectionTime} onValueChange={(v) => setDisconnectionTime(v as "0.4" | "5")}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select disconnection time" />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20">
                        {Object.entries(disconnectionTimes).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {searchType === "device" && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
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
                      <div>
                        <Label htmlFor="device-type">Device Type</Label>
                        <Select value={deviceType} onValueChange={setDeviceType}>
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                            <SelectValue placeholder="Select device type" />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            <SelectItem value="mcb">MCB (Table 41.3)</SelectItem>
                            <SelectItem value="rcbo">RCBO (Table 41.3)</SelectItem>
                            <SelectItem value="rcd">RCD (Table 41.5)</SelectItem>
                            {Object.entries(fuseTypes).map(([key, label]) => (
                              <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
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
                    <p className="text-sm text-muted-foreground mt-1">
                      Checks against 80% of max Zs (ambient temperature correction)
                    </p>
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
