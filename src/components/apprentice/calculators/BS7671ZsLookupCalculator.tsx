import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Zap, Search, RotateCcw } from "lucide-react";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { MobileInput } from "@/components/ui/mobile-input";
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
                  <MobileSelect value={searchType} onValueChange={setSearchType}>
                    <MobileSelectTrigger label="Search Type">
                      <MobileSelectValue placeholder="Select search type" />
                    </MobileSelectTrigger>
                    <MobileSelectContent>
                      <MobileSelectItem value="device">Lookup by Device Type</MobileSelectItem>
                      <MobileSelectItem value="compliance">Check Compliance (80% rule)</MobileSelectItem>
                    </MobileSelectContent>
                  </MobileSelect>

                  <MobileSelect value={disconnectionTime} onValueChange={(v) => setDisconnectionTime(v as "0.4" | "5")}>
                    <MobileSelectTrigger label="Disconnection Time">
                      <MobileSelectValue placeholder="Select disconnection time" />
                    </MobileSelectTrigger>
                    <MobileSelectContent>
                      {Object.entries(disconnectionTimes).map(([key, label]) => (
                        <MobileSelectItem key={key} value={key}>{label}</MobileSelectItem>
                      ))}
                    </MobileSelectContent>
                  </MobileSelect>
                </div>

                {searchType === "device" && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <MobileInput
                        label="Quick Device (e.g. B32, C16)"
                        value={quickDevice}
                        onChange={(e) => handleQuickDevice(e.target.value)}
                        placeholder="B32, C16, D40..."
                      />
                      <MobileSelect value={deviceType} onValueChange={setDeviceType}>
                        <MobileSelectTrigger label="Device Type">
                          <MobileSelectValue placeholder="Select device type" />
                        </MobileSelectTrigger>
                        <MobileSelectContent>
                          <MobileSelectItem value="mcb">MCB (Table 41.3)</MobileSelectItem>
                          <MobileSelectItem value="rcbo">RCBO (Table 41.3)</MobileSelectItem>
                          <MobileSelectItem value="rcd">RCD (Table 41.5)</MobileSelectItem>
                          {Object.entries(fuseTypes).map(([key, label]) => (
                            <MobileSelectItem key={key} value={key}>{label}</MobileSelectItem>
                          ))}
                        </MobileSelectContent>
                      </MobileSelect>
                    </div>
                  </>
                )}

                {searchType === "compliance" && (
                  <MobileInput
                    label="Measured Zs Value (Ω)"
                    type="number"
                    step="0.001"
                    value={measuredZs}
                    onChange={(e) => setMeasuredZs(e.target.value)}
                    placeholder="e.g., 0.75"
                    hint="Checks against 80% of max Zs (ambient temperature correction)"
                  />
                )}

                <div className="flex gap-2">
                  <MobileButton
                    onClick={performLookup}
                    variant="elec"
                    className="flex-1 min-h-[48px]"
                    disabled={searchType === "device" ? !deviceType : !measuredZs}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {searchType === "device" ? "Show Values" : "Check Compliance"}
                  </MobileButton>

                  <MobileButton variant="elec-outline" onClick={resetCalculator} className="min-h-[48px]">
                    <RotateCcw className="h-4 w-4" />
                  </MobileButton>
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
