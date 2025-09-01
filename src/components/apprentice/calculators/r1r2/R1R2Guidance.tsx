import InfoBox from "@/components/common/InfoBox";
import { BookOpen, AlertTriangle, Lightbulb, CheckCircle, XCircle, Settings, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const R1R2Guidance = () => {
  return (
    <div className="space-y-6">
      {/* What is R1+R2 */}
      <InfoBox
        title="Understanding R1+R2 Testing"
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-300 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  What is R1+R2?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs space-y-1">
                  <li>• <strong>R1:</strong> Resistance of line conductor</li>
                  <li>• <strong>R2:</strong> Resistance of protective conductor (CPC)</li>
                  <li>• <strong>R1+R2:</strong> Combined resistance for earth fault path</li>
                  <li>• Essential component of earth fault loop impedance</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-500/10 border-green-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-300 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Why Test R1+R2?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs space-y-1">
                  <li>• Verify protective conductor continuity</li>
                  <li>• Calculate earth fault loop impedance (Zs)</li>
                  <li>• Ensure protection operates correctly</li>
                  <li>• Required by BS7671 for verification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-elec-dark/50 rounded p-3">
            <p className="text-xs text-elec-light">
              <strong>Key relationship:</strong> Zs = Ze + R1+R2, where Ze is external earth fault loop impedance. 
              R1+R2 testing provides the internal circuit component needed for complete Zs calculation.
            </p>
          </div>
        </div>
      </InfoBox>

      {/* Testing Methods */}
      <InfoBox
        title="Testing Methods & Procedures"
        icon={<Settings className="h-5 w-5 text-yellow-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <h4 className="text-elec-yellow font-medium mb-3">Method 1: Direct R1+R2 Test</h4>
              <ol className="text-xs space-y-2 list-decimal list-inside">
                <li><strong>Isolate circuit:</strong> Switch off and lock off protective device</li>
                <li><strong>Prove dead:</strong> Use approved voltage indicator</li>
                <li><strong>Link conductors:</strong> Connect line and CPC at distribution board</li>
                <li><strong>Test at outlets:</strong> Measure between line and CPC terminals</li>
                <li><strong>Record readings:</strong> Test at furthest point and each outlet</li>
                <li><strong>Remove links:</strong> Restore normal connections</li>
              </ol>
            </div>
            
            <div>
              <h4 className="text-elec-yellow font-medium mb-3">Method 2: Calculation Method</h4>
              <ol className="text-xs space-y-2 list-decimal list-inside">
                <li><strong>Measure length:</strong> Determine actual cable route length</li>
                <li><strong>Identify conductors:</strong> Line and CPC cross-sectional areas</li>
                <li><strong>Material type:</strong> Copper or aluminium conductors</li>
                <li><strong>Calculate values:</strong> Using resistance per metre data</li>
                <li><strong>Apply factors:</strong> Temperature correction for test limit</li>
                <li><strong>Compare results:</strong> Verify against measured values</li>
              </ol>
            </div>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
              <h5 className="text-green-300 font-medium text-xs mb-1">✓ Best Practices:</h5>
              <ul className="text-xs space-y-0.5">
                <li>• Test at low voltage (4-24V DC)</li>
                <li>• Use calibrated continuity tester</li>
                <li>• Test all outlets on the circuit</li>
                <li>• Record highest reading found</li>
              </ul>
            </div>
            
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
              <h5 className="text-red-300 font-medium text-xs mb-1">❌ Common Mistakes:</h5>
              <ul className="text-xs space-y-0.5">
                <li>• Forgetting to remove or bridge RCDs</li>
                <li>• Testing with circuit energised</li>
                <li>• Not testing at furthest point</li>
                <li>• Incorrect lead resistance compensation</li>
              </ul>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Conductor Sizing Requirements */}
      <InfoBox
        title="CPC Sizing Requirements (BS7671 Table 54.7)"
        icon={<AlertTriangle className="h-5 w-5 text-orange-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">Minimum CPC Sizes</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">Line Conductor ≤ 16mm²</h5>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Line CSA:</span>
                    <span className="font-mono">CPC = Line CSA</span>
                  </div>
                  <p className="text-muted-foreground">CPC same size as line conductor</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">Line Conductor &gt; 16mm²</h5>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Line CSA:</span>
                    <span className="font-mono">CPC = Line CSA ÷ 2</span>
                  </div>
                  <p className="text-muted-foreground">Minimum 16mm² CPC required</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-3">
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-300 text-xs">Example 1</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-1">
                  <p>Line: 2.5mm²</p>
                  <p>CPC: 2.5mm²</p>
                  <Badge className="bg-green-500/20 text-green-300 text-xs">✓ Compliant</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-300 text-xs">Example 2</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-1">
                  <p>Line: 25mm²</p>
                  <p>CPC: 16mm²</p>
                  <Badge className="bg-green-500/20 text-green-300 text-xs">✓ Compliant</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-300 text-xs">Example 3</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-1">
                  <p>Line: 50mm²</p>
                  <p>CPC: 25mm²</p>
                  <Badge className="bg-green-500/20 text-green-300 text-xs">✓ Compliant</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </InfoBox>

      {/* Temperature Effects */}
      <InfoBox
        title="Temperature Effects & Correction Factors"
        icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-3">Why Temperature Matters</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">Testing Temperature (~20°C)</h5>
                <ul className="text-xs space-y-1">
                  <li>• Continuity tests performed at ambient</li>
                  <li>• Cables not carrying load current</li>
                  <li>• Lower resistance values measured</li>
                  <li>• Direct comparison possible</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-elec-light mb-2">Operating Temperature (70°C+)</h5>
                <ul className="text-xs space-y-1">
                  <li>• Cables heated by load current</li>
                  <li>• Higher resistance due to temperature</li>
                  <li>• Must account for this in calculations</li>
                  <li>• Safety margin essential</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
              <h5 className="text-yellow-300 font-medium text-xs mb-2">Temperature Coefficients</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Copper:</span>
                  <span className="font-mono">0.004/°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Aluminium:</span>
                  <span className="font-mono">0.004/°C</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
              <h5 className="text-blue-300 font-medium text-xs mb-2">Correction Factor</h5>
              <div className="space-y-1 text-xs">
                <p><strong>Formula:</strong> (234.5 + θ₂) / (234.5 + θ₁)</p>
                <p>θ₁ = Test temp (20°C)</p>
                <p>θ₂ = Operating temp (70°C)</p>
                <p><strong>Result:</strong> Factor ≈ 1.67</p>
              </div>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Troubleshooting High Readings */}
      <InfoBox
        title="Troubleshooting High R1+R2 Readings"
        icon={<XCircle className="h-5 w-5 text-red-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-red-300 font-medium mb-3">Common Causes</h4>
              <ul className="text-xs space-y-2">
                <li>• <strong>Loose connections:</strong> High resistance joints</li>
                <li>• <strong>Damaged conductors:</strong> Partial breaks or nicks</li>
                <li>• <strong>Incorrect terminations:</strong> Poor workmanship</li>
                <li>• <strong>Wrong conductor size:</strong> Smaller than expected</li>
                <li>• <strong>Long cable runs:</strong> Exceeding design limits</li>
                <li>• <strong>Parallel paths:</strong> Not accounted for in design</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-green-300 font-medium mb-3">Investigation Steps</h4>
              <ol className="text-xs space-y-2 list-decimal list-inside">
                <li>Check all connections are tight</li>
                <li>Verify conductor sizes match installation certificate</li>
                <li>Test individual cable sections to isolate faults</li>
                <li>Check for damaged cable (visual inspection)</li>
                <li>Measure actual cable length vs. calculated</li>
                <li>Consider parallel earth paths in metallic conduit</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <h5 className="text-red-300 font-medium text-xs mb-2">When R1+R2 Exceeds Test Limit:</h5>
            <ul className="text-xs space-y-1">
              <li>• <strong>Do not energise</strong> until fault is found and corrected</li>
              <li>• Investigate systematically from distribution board to final outlet</li>
              <li>• Consider cable replacement if widespread damage found</li>
              <li>• Recalculate expected values to verify test equipment accuracy</li>
            </ul>
          </div>
        </div>
      </InfoBox>

      {/* Real-World Applications */}
      <InfoBox
        title="Real-World Applications & Scenarios"
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">New Installation</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p>Calculate expected R1+R2 during design phase</p>
                  <p>Test to verify installation quality</p>
                  <p>Compare measured vs calculated values</p>
                  <Badge className="bg-blue-500/20 text-blue-300 text-xs">Initial Verification</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">Periodic Inspection</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p>Compare current readings with previous tests</p>
                  <p>Identify deterioration over time</p>
                  <p>Check for loose connections</p>
                  <Badge className="bg-green-500/20 text-green-300 text-xs">PIR Testing</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-elec-dark/30 border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-elec-light text-sm">Fault Finding</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs space-y-2">
                  <p>High readings indicate connection problems</p>
                  <p>Step-by-step testing to isolate faults</p>
                  <p>Verify repairs before re-energising</p>
                  <Badge className="bg-red-500/20 text-red-300 text-xs">Diagnostic</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </InfoBox>
    </div>
  );
};

export default R1R2Guidance;