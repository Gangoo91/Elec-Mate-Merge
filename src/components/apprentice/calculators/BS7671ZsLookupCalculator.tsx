
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Zap, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zsValues, curveTypes, fuseTypes } from "./zs-values/ZsValuesData";

const BS7671ZsLookupCalculator = () => {
  const [searchType, setSearchType] = useState("device");
  const [deviceType, setDeviceType] = useState("");
  const [deviceRating, setDeviceRating] = useState("");
  const [curve, setCurve] = useState("");
  const [measuredZs, setMeasuredZs] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [complianceCheck, setComplianceCheck] = useState<any>(null);

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


  const resetCalculator = () => {
    setSearchType("device");
    setDeviceType("");
    setDeviceRating("");
    setCurve("");
    setMeasuredZs("");
    setResults([]);
    setComplianceCheck(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>BS7671 Zs Lookup Table</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
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

        {/* Results Display */}
        {results.length > 0 && (
          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">
              Maximum Zs Values for {deviceType?.toUpperCase()}
            </h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-elec-yellow/20">
                    <th className="text-left p-2">Device</th>
                    <th className="text-left p-2">Curve</th>
                    <th className="text-left p-2">Rating</th>
                    <th className="text-left p-2">Max Zs</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => (
                    <tr key={index} className="border-b border-elec-yellow/10">
                      <td className="p-2">{item.device}</td>
                      <td className="p-2">{item.curve}</td>
                      <td className="p-2">{item.rating}</td>
                      <td className="p-2 font-mono">{item.maxZs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {complianceCheck && (
          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">
              Compliance Check for Zs = {complianceCheck.measuredZs}Ω
            </h3>
            
            {complianceCheck.compliantDevices.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded p-3">
                  <p className="text-green-300 font-medium">
                    ✓ {complianceCheck.compliantDevices.length} compliant protection devices found
                  </p>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-elec-yellow/20">
                        <th className="text-left p-2">Device</th>
                        <th className="text-left p-2">Curve</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Max Zs</th>
                        <th className="text-left p-2">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceCheck.compliantDevices.slice(0, 20).map((item: any, index: number) => (
                        <tr key={index} className="border-b border-elec-yellow/10">
                          <td className="p-2">{item.device}</td>
                          <td className="p-2">{item.curve}</td>
                          <td className="p-2">{item.rating}</td>
                          <td className="p-2 font-mono">{item.maxZs}</td>
                          <td className="p-2 font-mono text-green-400">{item.margin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {complianceCheck.compliantDevices.length > 20 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Showing top 20 results of {complianceCheck.compliantDevices.length} compliant devices.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
                <p className="text-red-300 font-medium">
                  ✗ No compliant protection devices found for this Zs value
                </p>
                <p className="text-xs text-red-300 mt-1">
                  The measured Zs exceeds all maximum values in BS7671.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
          <p className="text-xs text-blue-300">
            <strong>BS7671 Reference:</strong> Maximum Zs values per Table 41.3 (MCB), Table 41.4 (Fuses). 
            Values assume 230V nominal voltage and standard ambient temperature.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671ZsLookupCalculator;
