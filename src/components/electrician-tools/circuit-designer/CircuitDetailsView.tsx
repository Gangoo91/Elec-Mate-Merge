import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircuitDesign } from "@/types/installation-design";
import { AlertCircle, CheckCircle, Info, Zap, Calculator, FileText, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CircuitDetailsViewProps {
  circuit: CircuitDesign;
  circuitNumber: number;
}

export function CircuitDetailsView({ circuit, circuitNumber }: CircuitDetailsViewProps) {
  const hasWarnings = circuit.warnings && circuit.warnings.length > 0;

  return (
    <div className="space-y-4">
      {/* Circuit Header */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg font-bold">
                  Circuit {circuitNumber}
                </Badge>
                <CardTitle className="text-2xl">{circuit.name}</CardTitle>
              </div>
              <CardDescription className="text-base capitalize">
                {circuit.loadType.replace('-', ' ')} • {circuit.phases === 'three' ? '3-Phase' : 'Single Phase'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {hasWarnings ? (
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Warnings
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Compliant
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Cable Size</div>
              <div className="text-2xl font-bold text-primary">
                {circuit.cableSize}mm²
              </div>
              <div className="text-xs text-muted-foreground">
                CPC: {circuit.cpcSize}mm²
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Protection</div>
              <div className="text-2xl font-bold">
                {circuit.protectionDevice.rating}A
              </div>
              <div className="text-xs text-muted-foreground">
                {circuit.protectionDevice.type} Type {circuit.protectionDevice.curve}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Load Power</div>
              <div className="text-2xl font-bold">
                {circuit.loadPower.toFixed(2)} kW
              </div>
              <div className="text-xs text-muted-foreground">
                {circuit.designCurrent.toFixed(1)}A design current
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Cable Length</div>
              <div className="text-2xl font-bold">
                {circuit.cableLength}m
              </div>
              <div className="text-xs text-muted-foreground">
                {circuit.installationMethod}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="gap-2">
            <Info className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="calculations" className="gap-2">
            <Calculator className="h-4 w-4" />
            Calculations
          </TabsTrigger>
          <TabsTrigger value="justifications" className="gap-2">
            <FileText className="h-4 w-4" />
            Justifications
          </TabsTrigger>
          <TabsTrigger value="materials" className="gap-2">
            Materials
          </TabsTrigger>
          <TabsTrigger value="warnings" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Warnings {hasWarnings && `(${circuit.warnings.length})`}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Circuit Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Voltage</div>
                  <div className="font-medium">{circuit.voltage}V</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phases</div>
                  <div className="font-medium capitalize">{circuit.phases === 'three' ? '3-Phase' : 'Single Phase'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Cable Type</div>
                  <div className="font-medium">{circuit.cableType || `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² T&E`}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Installation Method</div>
                  <div className="font-medium capitalize">{circuit.installationMethod.replace('-', ' ')}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">RCD Protection</div>
                  <div className="font-medium">{circuit.rcdProtected ? 'Yes' : 'No'}</div>
                </div>
                {circuit.afddRequired !== undefined && (
                  <div>
                    <div className="text-sm text-muted-foreground">AFDD Required</div>
                    <div className="font-medium">{circuit.afddRequired ? 'Yes' : 'No'}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {circuit.specialLocationCompliance && circuit.specialLocationCompliance.isSpecialLocation && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-1">Special Location Requirements</div>
                <div className="text-sm space-y-1">
                  <div>Location: {circuit.specialLocationCompliance.locationType}</div>
                  <div className="text-muted-foreground">{circuit.specialLocationCompliance.regulation}</div>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {circuit.specialLocationCompliance.requirements.map((req, idx) => (
                      <li key={idx} className="text-muted-foreground">{req}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Calculations Tab */}
        <TabsContent value="calculations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Design Calculations</CardTitle>
              <CardDescription>BS 7671:2018+A3:2024 Compliant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current Ratings */}
                <div>
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Current Ratings
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">Ib (Design Current)</div>
                      <div className="text-xl font-bold mt-1">{circuit.calculations.Ib.toFixed(1)}A</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">In (Nominal Rating)</div>
                      <div className="text-xl font-bold mt-1">{circuit.calculations.In}A</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">Iz (Cable Capacity)</div>
                      <div className="text-xl font-bold mt-1">{circuit.calculations.Iz}A</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Voltage Drop */}
                <div>
                  <div className="font-medium mb-2">Voltage Drop</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">Voltage Drop</div>
                      <div className="text-xl font-bold mt-1">
                        {circuit.calculations.voltageDrop.volts.toFixed(2)}V
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ({circuit.calculations.voltageDrop.percent.toFixed(2)}%)
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">Compliance</div>
                      <div className={`text-xl font-bold mt-1 ${circuit.calculations.voltageDrop.compliant ? 'text-emerald-500' : 'text-red-500'}`}>
                        {circuit.calculations.voltageDrop.compliant ? 'Pass' : 'Fail'}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Limit: {circuit.calculations.voltageDrop.limit}%
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Earth Fault Loop Impedance */}
                <div>
                  <div className="font-medium mb-2">Earth Fault Loop Impedance (Zs)</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">Calculated Zs</div>
                      <div className="text-xl font-bold mt-1">{circuit.calculations.zs.toFixed(3)}Ω</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground">Max Permitted Zs</div>
                      <div className="text-xl font-bold mt-1">{circuit.calculations.maxZs.toFixed(3)}Ω</div>
                      <div className={`text-xs mt-1 ${circuit.calculations.zs <= circuit.calculations.maxZs ? 'text-emerald-500' : 'text-red-500'}`}>
                        {circuit.calculations.zs <= circuit.calculations.maxZs ? '✓ Compliant' : '✗ Non-compliant'}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Derating */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Derated Capacity</div>
                      <div className="text-lg font-bold mt-1">{circuit.calculations.deratedCapacity.toFixed(1)}A</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Safety Margin</div>
                      <div className="text-lg font-bold mt-1">{circuit.calculations.safetyMargin.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {circuit.expectedTestResults && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expected Test Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">R1+R2 (at operating temperature)</div>
                  <div className="text-muted-foreground mt-1">{circuit.expectedTestResults.r1r2.at70C}</div>
                </div>
                <div>
                  <div className="font-medium">Zs (Earth Fault Loop)</div>
                  <div className="text-muted-foreground mt-1">
                    Calculated: {circuit.expectedTestResults.zs.calculated}, Max: {circuit.expectedTestResults.zs.maxPermitted}
                  </div>
                </div>
                <div>
                  <div className="font-medium">Insulation Resistance</div>
                  <div className="text-muted-foreground mt-1">
                    Test at {circuit.expectedTestResults.insulationResistance.testVoltage}, Min: {circuit.expectedTestResults.insulationResistance.minResistance}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Justifications Tab */}
        <TabsContent value="justifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cable Size Justification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {circuit.justifications.cableSize}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Protection Device Justification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {circuit.justifications.protection}
              </p>
            </CardContent>
          </Card>

          {circuit.justifications.rcd && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">RCD Protection Justification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {circuit.justifications.rcd}
                </p>
              </CardContent>
            </Card>
          )}

          {circuit.earthingRequirements && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Earthing Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">CPC Size:</span> {circuit.earthingRequirements.cpcSize}
                </div>
                <div>
                  <span className="font-medium">Supplementary Bonding:</span> {circuit.earthingRequirements.supplementaryBonding ? 'Required' : 'Not Required'}
                </div>
                <p className="text-muted-foreground mt-2">{circuit.earthingRequirements.justification}</p>
                <div className="text-xs text-muted-foreground">{circuit.earthingRequirements.regulation}</div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Materials & Costs Tab */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materials for This Circuit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                  <span>{circuit.cableType || `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² T&E`}</span>
                  <span>{circuit.cableLength}m</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                  <span>{circuit.protectionDevice.type} {circuit.protectionDevice.rating}A Type {circuit.protectionDevice.curve}</span>
                  <span>1 unit</span>
                </div>
                {circuit.rcdProtected && (
                  <div className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                    <span>30mA RCD Protection</span>
                    <span>Included</span>
                  </div>
                )}
                {circuit.afddRequired && (
                  <div className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                    <span>AFDD Device</span>
                    <span>1 unit</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Full material list available in project summary.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warnings Tab */}
        <TabsContent value="warnings" className="space-y-4 mt-4">
          {circuit.warnings && circuit.warnings.length > 0 ? (
            circuit.warnings.map((warning, idx) => (
              <Alert key={idx} variant="destructive" className="bg-amber-500/10 text-amber-900 border-amber-500/30">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-lg font-medium">No Warnings</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This circuit design is fully compliant with BS 7671:2018+A3:2024
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
