import { useState } from "react";
import { Copy, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyToClipboard } from "@/lib/calc-utils";
import { useToast } from "@/hooks/use-toast";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
import { Info, AlertTriangle } from "lucide-react";

interface ZsLookupResultProps {
  searchType: string;
  results: any[];
  complianceCheck: any;
  measuredZs: string;
}

const ZsLookupResult = ({ searchType, results, complianceCheck, measuredZs }: ZsLookupResultProps) => {
  const { toast } = useToast();
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterCurve, setFilterCurve] = useState("");
  const [filterRatingMin, setFilterRatingMin] = useState("");
  const [filterRatingMax, setFilterRatingMax] = useState("");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredResults = results.filter(item => {
    const curveMatch = !filterCurve || item.curve.toLowerCase().includes(filterCurve.toLowerCase());
    const ratingValue = parseFloat(item.rating.replace("A", ""));
    const minMatch = !filterRatingMin || ratingValue >= parseFloat(filterRatingMin);
    const maxMatch = !filterRatingMax || ratingValue <= parseFloat(filterRatingMax);
    return curveMatch && minMatch && maxMatch;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortColumn) {
      case "rating":
        aValue = parseFloat(a.rating.replace("A", ""));
        bValue = parseFloat(b.rating.replace("A", ""));
        break;
      case "maxZs":
        aValue = parseFloat(a.maxZs.replace("Ω", ""));
        bValue = parseFloat(b.maxZs.replace("Ω", ""));
        break;
      case "margin":
        aValue = parseFloat(a.margin?.replace("Ω", "") || "0");
        bValue = parseFloat(b.margin?.replace("Ω", "") || "0");
        break;
      default:
        aValue = a[sortColumn];
        bValue = b[sortColumn];
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const copyResults = async () => {
    let text = "";
    if (searchType === "device" && results.length > 0) {
      text = `BS7671 Zs Lookup - Device Values\n\n`;
      text += `Device\tCurve\tRating\tMax Zs (100%)\t80% Test Value\n`;
      sortedResults.forEach(item => {
        const testValue = (parseFloat(item.maxZs.replace("Ω", "")) * 0.8).toFixed(3);
        text += `${item.device}\t${item.curve}\t${item.rating}\t${item.maxZs}\t${testValue}Ω\n`;
      });
    } else if (searchType === "compliance" && complianceCheck) {
      text = `BS7671 Zs Compliance Check\n\n`;
      text += `Measured Zs: ${complianceCheck.measuredZs}Ω\n`;
      text += `Compliant devices: ${complianceCheck.compliantDevices.length}\n\n`;
      text += `Device\tCurve\tRating\tMax Zs\tMargin\tHeadroom %\n`;
      complianceCheck.compliantDevices.slice(0, 20).forEach((item: any) => {
        const headroom = ((parseFloat(item.margin.replace("Ω", "")) / parseFloat(item.maxZs.replace("Ω", ""))) * 100).toFixed(1);
        text += `${item.device}\t${item.curve}\t${item.rating}\t${item.maxZs}\t${item.margin}\t${headroom}%\n`;
      });
    }
    
    const success = await copyToClipboard(text);
    toast({
      title: success ? "Results copied!" : "Copy failed",
      description: success ? "Lookup results copied to clipboard" : "Please try again",
      variant: success ? "success" : "destructive"
    });
  };

  const getComplianceStatus = (item: any) => {
    if (!measuredZs || !item.maxZs) return null;
    
    const measured = parseFloat(measuredZs);
    const maxZs = parseFloat(item.maxZs.replace("Ω", ""));
    const testValue = maxZs * 0.8;
    
    if (measured <= testValue) {
      return { status: "pass", text: "Pass (80%)", color: "bg-green-500/20 text-green-300" };
    } else if (measured <= maxZs) {
      return { status: "warning", text: "Pass (100%)", color: "bg-yellow-500/20 text-yellow-300" };
    } else {
      return { status: "fail", text: "Fail", color: "bg-red-500/20 text-red-300" };
    }
  };

  const getHeadroomBar = (margin: string, maxZs: string) => {
    const marginValue = parseFloat(margin.replace("Ω", ""));
    const maxValue = parseFloat(maxZs.replace("Ω", ""));
    const percentage = Math.min((marginValue / maxValue) * 100, 100);
    
    let colorClass = "bg-green-500";
    if (percentage < 10) colorClass = "bg-red-500";
    else if (percentage < 25) colorClass = "bg-yellow-500";
    
    return (
      <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  if (results.length === 0 && !complianceCheck) return null;

  return (
    <div className="space-y-6">
      {/* Why This Matters */}
      <WhyThisMatters
        points={[
          "Zs values ensure protective devices operate within required disconnection times (0.4s for final circuits, 5s for distribution)",
          "Values in BS7671 tables are maximum limits - actual installations should have margin for safety",
          "80% test values account for conductor temperature rise under fault conditions"
        ]}
      />

      {/* Assumptions */}
      <InfoBox
        title="Key Assumptions"
        icon={<Info className="h-5 w-5 text-blue-400" />}
        points={[
          "Nominal voltage: 230V (single phase), 400V (three phase)",
          "Standard ambient temperature (20°C for cables)",
          "Values from BS7671 Tables 41.2, 41.3, and 41.4",
          "TN system unless otherwise specified"
        ]}
      />

      {/* Device Lookup Results */}
      {searchType === "device" && results.length > 0 && (
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-elec-light">Device Lookup Results</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyResults}
                className="text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Results
              </Button>
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div>
                <Label htmlFor="filter-curve" className="text-xs">Filter by Curve</Label>
                <Input
                  id="filter-curve"
                  placeholder="e.g., B, C, D"
                  value={filterCurve}
                  onChange={(e) => setFilterCurve(e.target.value)}
                  className="h-8 text-xs bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="filter-min" className="text-xs">Min Rating (A)</Label>
                <Input
                  id="filter-min"
                  type="number"
                  placeholder="e.g., 6"
                  value={filterRatingMin}
                  onChange={(e) => setFilterRatingMin(e.target.value)}
                  className="h-8 text-xs bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="filter-max" className="text-xs">Max Rating (A)</Label>
                <Input
                  id="filter-max"
                  type="number"
                  placeholder="e.g., 32"
                  value={filterRatingMax}
                  onChange={(e) => setFilterRatingMax(e.target.value)}
                  className="h-8 text-xs bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-elec-card">
                  <tr className="border-b border-elec-yellow/20">
                    <th 
                      className="text-left p-2 cursor-pointer hover:bg-elec-yellow/10"
                      onClick={() => handleSort("device")}
                    >
                      Device {sortColumn === "device" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="text-left p-2 cursor-pointer hover:bg-elec-yellow/10"
                      onClick={() => handleSort("curve")}
                    >
                      Curve {sortColumn === "curve" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="text-left p-2 cursor-pointer hover:bg-elec-yellow/10"
                      onClick={() => handleSort("rating")}
                    >
                      Rating {sortColumn === "rating" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th 
                      className="text-left p-2 cursor-pointer hover:bg-elec-yellow/10"
                      onClick={() => handleSort("maxZs")}
                    >
                      Max Zs (100%) {sortColumn === "maxZs" && (sortDirection === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="text-left p-2">80% Test Value</th>
                    <th className="text-left p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((item, index) => {
                    const testValue = (parseFloat(item.maxZs.replace("Ω", "")) * 0.8).toFixed(3);
                    const compliance = getComplianceStatus(item);
                    
                    return (
                      <tr key={index} className="border-b border-elec-yellow/10 hover:bg-elec-yellow/5">
                        <td className="p-2 font-medium">{item.device}</td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-xs">
                            {item.curve}
                          </Badge>
                        </td>
                        <td className="p-2">{item.rating}</td>
                        <td className="p-2 font-mono">{item.maxZs}</td>
                        <td className="p-2 font-mono text-blue-300">{testValue}Ω</td>
                        <td className="p-2">
                          {compliance && (
                            <Badge className={`text-xs ${compliance.color}`}>
                              {compliance.text}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {sortedResults.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No devices match your filter criteria
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Check Results */}
      {searchType === "compliance" && complianceCheck && (
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-elec-light">
                Compliance Check for Zs = {complianceCheck.measuredZs}Ω
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyResults}
                className="text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy Results
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-4">
            {complianceCheck.compliantDevices.length > 0 ? (
              <>
                <div className="bg-green-500/20 border border-green-500/30 rounded p-3">
                  <p className="text-green-300 font-medium">
                    ✓ {complianceCheck.compliantDevices.length} compliant protection devices found
                  </p>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-elec-card">
                      <tr className="border-b border-elec-yellow/20">
                        <th className="text-left p-2">Device</th>
                        <th className="text-left p-2">Curve</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Max Zs</th>
                        <th className="text-left p-2">Margin</th>
                        <th className="text-left p-2">Headroom</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceCheck.compliantDevices.slice(0, 20).map((item: any, index: number) => {
                        const headroom = ((parseFloat(item.margin.replace("Ω", "")) / parseFloat(item.maxZs.replace("Ω", ""))) * 100).toFixed(1);
                        const testValue = parseFloat(item.maxZs.replace("Ω", "")) * 0.8;
                        const measured = complianceCheck.measuredZs;
                        
                        let status = "Pass (80%)";
                        let statusColor = "bg-green-500/20 text-green-300";
                        
                        if (measured > testValue && measured <= parseFloat(item.maxZs.replace("Ω", ""))) {
                          status = "Pass (100%)";
                          statusColor = "bg-yellow-500/20 text-yellow-300";
                        }
                        
                        return (
                          <tr key={index} className="border-b border-elec-yellow/10">
                            <td className="p-2">{item.device}</td>
                            <td className="p-2">
                              <Badge variant="outline" className="text-xs">
                                {item.curve}
                              </Badge>
                            </td>
                            <td className="p-2">{item.rating}</td>
                            <td className="p-2 font-mono">{item.maxZs}</td>
                            <td className="p-2 font-mono text-green-400">{item.margin}</td>
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                {getHeadroomBar(item.margin, item.maxZs)}
                                <span className="text-xs">{headroom}%</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <Badge className={`text-xs ${statusColor}`}>
                                {status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {complianceCheck.compliantDevices.length > 20 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Showing top 20 results of {complianceCheck.compliantDevices.length} compliant devices.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
                  <p className="text-red-300 font-medium">
                    ✗ No compliant protection devices found for this Zs value
                  </p>
                  <p className="text-xs text-red-300 mt-1">
                    The measured Zs exceeds all maximum values in BS7671.
                  </p>
                </div>
                
                <InfoBox
                  title="Remediation Options"
                  icon={<AlertTriangle className="h-5 w-5 text-yellow-400" />}
                  points={[
                    "Reduce circuit length or increase conductor size",
                    "Improve earthing arrangements (lower Ze)",
                    "Consider different protection device with higher Zs tolerance",
                    "Check for loose connections increasing circuit resistance"
                  ]}
                />
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZsLookupResult;