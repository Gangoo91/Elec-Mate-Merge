import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Zap,
  Timer,
  Gauge,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ============================================================================
// INSULATION RESISTANCE LIMITS (GN3 Table 2.9 / BS 7671 Table 64)
// ============================================================================

const insulationResistanceLimits = [
  {
    circuit: "SELV / PELV",
    testVoltage: "250V DC",
    minimum: "0.5 MΩ",
    expected: "≥2 MΩ",
    note: "Extra-low voltage circuits",
  },
  {
    circuit: "Up to 500V (inc. FELV)",
    testVoltage: "500V DC",
    minimum: "1.0 MΩ",
    expected: "≥2 MΩ",
    note: "Most domestic/commercial circuits",
  },
  {
    circuit: "Above 500V",
    testVoltage: "1000V DC",
    minimum: "1.0 MΩ",
    expected: "≥2 MΩ",
    note: "Industrial HV circuits",
  },
];

// ============================================================================
// EARTH FAULT LOOP IMPEDANCE (BS 7671 Table 41.3)
// ============================================================================

const zsLimitsTypeB = [
  { rating: "6A", maxZs: "7.28Ω", note: "Lighting circuits" },
  { rating: "10A", maxZs: "4.37Ω", note: "Lighting circuits" },
  { rating: "16A", maxZs: "2.73Ω", note: "Immersion heaters" },
  { rating: "20A", maxZs: "2.19Ω", note: "Water heaters" },
  { rating: "32A", maxZs: "1.37Ω", note: "Ring finals, cookers" },
  { rating: "40A", maxZs: "1.09Ω", note: "Showers, cookers" },
  { rating: "50A", maxZs: "0.87Ω", note: "Large loads" },
];

const zsLimitsTypeC = [
  { rating: "6A", maxZs: "3.64Ω", note: "Motor circuits" },
  { rating: "10A", maxZs: "2.19Ω", note: "Motor circuits" },
  { rating: "16A", maxZs: "1.37Ω", note: "Motor circuits" },
  { rating: "20A", maxZs: "1.09Ω", note: "Motor circuits" },
  { rating: "32A", maxZs: "0.68Ω", note: "Motor circuits" },
  { rating: "40A", maxZs: "0.55Ω", note: "Motor circuits" },
];

// ============================================================================
// RCD TRIP TIMES (GN3 Table 2.17 / BS EN 61008-1)
// ============================================================================

const rcdTripTimes = [
  {
    test: "½ × IΔn",
    current: "15mA (for 30mA RCD)",
    nonDelay: "Should NOT trip",
    sDelay: "Should NOT trip",
  },
  {
    test: "1 × IΔn",
    current: "30mA (for 30mA RCD)",
    nonDelay: "≤ 300ms",
    sDelay: "≤ 500ms",
  },
  {
    test: "5 × IΔn",
    current: "150mA (for 30mA RCD)",
    nonDelay: "≤ 40ms",
    sDelay: "≤ 150ms",
  },
];

interface InfoTooltipProps {
  content: string;
}

const InfoTooltip = ({ content }: InfoTooltipProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Info className="h-3.5 w-3.5 text-white/40 hover:text-white/60 ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-white/10 backdrop-blur-sm border-white/20">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const GN3AcceptanceLimits = () => {
  return (
    <Card className="bg-white/5 border border-white/10">
      <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/10">
            <Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-sm sm:text-lg text-white">Acceptance Limits</CardTitle>
            <p className="text-[10px] sm:text-sm text-white/60">
              GN3 / BS 7671:2018+A3:2024
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <Tabs defaultValue="ir" className="w-full">
          <TabsList className="grid grid-cols-3 bg-white/5 p-0.5 sm:p-1 h-auto">
            <TabsTrigger
              value="ir"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 text-xs sm:text-sm py-2"
            >
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              IR
            </TabsTrigger>
            <TabsTrigger
              value="zs"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400 text-xs sm:text-sm py-2"
            >
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Zs
            </TabsTrigger>
            <TabsTrigger
              value="rcd"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 text-xs sm:text-sm py-2"
            >
              <Timer className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              RCD
            </TabsTrigger>
          </TabsList>

          {/* Insulation Resistance Tab */}
          <TabsContent value="ir" className="mt-3 sm:mt-4">
            <div className="rounded-lg border border-white/10 overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Circuit</TableHead>
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Test V</TableHead>
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Min</TableHead>
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Expected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insulationResistanceLimits.map((row, i) => (
                    <TableRow key={i} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white/80 text-[10px] sm:text-sm p-2 sm:p-4">
                        {row.circuit}
                        <span className="hidden sm:inline"><InfoTooltip content={row.note} /></span>
                      </TableCell>
                      <TableCell className="font-mono text-purple-400 text-[10px] sm:text-sm p-2 sm:p-4">
                        {row.testVoltage}
                      </TableCell>
                      <TableCell className="font-mono text-red-400 font-medium text-[10px] sm:text-sm p-2 sm:p-4">
                        {row.minimum}
                      </TableCell>
                      <TableCell className="font-mono text-green-400 text-[10px] sm:text-sm p-2 sm:p-4">
                        {row.expected}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-[10px] sm:text-xs text-white/50 mt-2">
              Source: GN3 Table 2.9 / BS 7671 Table 64
            </p>
          </TabsContent>

          {/* Earth Fault Loop Impedance Tab */}
          <TabsContent value="zs" className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] sm:text-xs">
                  Type B
                </Badge>
                <span className="text-[10px] sm:text-xs text-white/50">0.4s disconnect</span>
              </div>
              <div className="rounded-lg border border-white/10 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Rating</TableHead>
                      <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Max Zs</TableHead>
                      <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4 hidden sm:table-cell">Use</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zsLimitsTypeB.map((row, i) => (
                      <TableRow key={i} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white/80 font-medium text-[10px] sm:text-sm p-2 sm:p-4">{row.rating}</TableCell>
                        <TableCell className="font-mono text-yellow-400 font-medium text-[10px] sm:text-sm p-2 sm:p-4">
                          {row.maxZs}
                        </TableCell>
                        <TableCell className="text-white/60 text-[10px] sm:text-sm p-2 sm:p-4 hidden sm:table-cell">{row.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] sm:text-xs">
                  Type C
                </Badge>
                <span className="text-[10px] sm:text-xs text-white/50">Motor circuits</span>
              </div>
              <div className="rounded-lg border border-white/10 overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Rating</TableHead>
                      <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Max Zs</TableHead>
                      <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4 hidden sm:table-cell">Note</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zsLimitsTypeC.slice(0, 4).map((row, i) => (
                      <TableRow key={i} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white/80 font-medium text-[10px] sm:text-sm p-2 sm:p-4">{row.rating}</TableCell>
                        <TableCell className="font-mono text-cyan-400 font-medium text-[10px] sm:text-sm p-2 sm:p-4">
                          {row.maxZs}
                        </TableCell>
                        <TableCell className="text-white/60 text-[10px] sm:text-sm p-2 sm:p-4 hidden sm:table-cell">{row.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-white/50">
              Source: BS 7671 Tables 41.3, 41.4. Values at 10°C conductor temp.
            </p>
          </TabsContent>

          {/* RCD Trip Times Tab */}
          <TabsContent value="rcd" className="mt-3 sm:mt-4">
            <div className="rounded-lg border border-white/10 overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Test</TableHead>
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4 hidden sm:table-cell">Current</TableHead>
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">Normal</TableHead>
                    <TableHead className="text-white/60 text-[10px] sm:text-xs p-2 sm:p-4">S-type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rcdTripTimes.map((row, i) => (
                    <TableRow key={i} className="border-white/10 hover:bg-white/5">
                      <TableCell className="text-white/80 font-medium text-[10px] sm:text-sm p-2 sm:p-4">{row.test}</TableCell>
                      <TableCell className="font-mono text-orange-400 text-[10px] sm:text-sm p-2 sm:p-4 hidden sm:table-cell">
                        {row.current}
                      </TableCell>
                      <TableCell className={`font-mono text-[10px] sm:text-sm p-2 sm:p-4 ${row.nonDelay.includes("NOT") ? "text-red-400" : "text-green-400"}`}>
                        {row.nonDelay}
                      </TableCell>
                      <TableCell className={`font-mono text-[10px] sm:text-sm p-2 sm:p-4 ${row.sDelay.includes("NOT") ? "text-red-400" : "text-amber-400"}`}>
                        {row.sDelay}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3 p-2.5 sm:p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs sm:text-sm text-amber-200">
                <strong>Note:</strong> 5×IΔn test is OPTIONAL per BS 7671:2018+A3:2024 (for fault-finding only).
                The 1×IΔn test is required for certification.
              </p>
            </div>
            <p className="text-[10px] sm:text-xs text-white/50 mt-2">
              Source: GN3 Table 2.17 / BS EN 61008-1, 61009-1
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GN3AcceptanceLimits;
