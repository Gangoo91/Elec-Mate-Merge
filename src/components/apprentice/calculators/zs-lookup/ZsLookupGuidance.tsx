import InfoBox from "@/components/common/InfoBox";
import { BookOpen, AlertTriangle, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ZsLookupGuidance = () => {
  return (
    <div className="space-y-6">
      {/* When to Use 80% vs 100% */}
      <InfoBox
        title="When to Use 80% vs 100% Test Values"
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-green-500/10 border-green-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-300 text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Use 80% Test Values When:
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs space-y-1">
                  <li>• Testing existing installations</li>
                  <li>• Verifying circuit protection</li>
                  <li>• Periodic inspection & testing</li>
                  <li>• Fault finding & diagnostics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-300 text-sm flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Use 100% Tabulated Values When:
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs space-y-1">
                  <li>• Designing new circuits</li>
                  <li>• Circuit calculations</li>
                  <li>• Determining maximum cable length</li>
                  <li>• Academic/training purposes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
            <p className="text-yellow-200 text-xs">
              <strong>Why the 80% factor?</strong> Under fault conditions, conductor temperature rises significantly. 
              The 80% factor accounts for increased resistance due to this temperature rise, ensuring protection operates correctly.
            </p>
          </div>
        </div>
      </InfoBox>

      {/* TN vs TT Systems */}
      <InfoBox
        title="TN vs TT System Considerations"
        icon={<AlertTriangle className="h-5 w-5 text-yellow-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-elec-yellow font-medium mb-2">TN Systems (Most UK Installations)</h4>
              <ul className="text-xs space-y-1 text-elec-light">
                <li>• Exposed metalwork connected to supply neutral</li>
                <li>• Low impedance fault path</li>
                <li>• Overcurrent protection can provide fault protection</li>
                <li>• Use standard Zs tables from BS7671</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-elec-yellow font-medium mb-2">TT Systems (Some Rural Areas)</h4>
              <ul className="text-xs space-y-1 text-elec-light">
                <li>• Installation earth electrode independent of supply</li>
                <li>• Higher impedance fault path</li>
                <li>• RCD protection required for fault protection</li>
                <li>• Check: RA × IΔn ≤ 50V</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-200 text-xs">
              <strong>For TT systems:</strong> RCD operation verification is critical. 
              Check that RA × IΔn ≤ 50V where RA is earth electrode resistance and IΔn is RCD rated current.
            </p>
          </div>
        </div>
      </InfoBox>

      {/* MCB/RCBO Curve Types */}
      <InfoBox
        title="Understanding MCB/RCBO Curve Types"
        icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-500/20 text-blue-300 mt-0.5">Type B</Badge>
              <div className="flex-1">
                <p className="text-xs"><strong>3-5 × In trip current</strong></p>
                <p className="text-xs text-muted-foreground">Resistive loads, lighting, heating, general domestic circuits</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge className="bg-green-500/20 text-green-300 mt-0.5">Type C</Badge>
              <div className="flex-1">
                <p className="text-xs"><strong>5-10 × In trip current</strong></p>
                <p className="text-xs text-muted-foreground">Inductive loads, fluorescent lighting, small motors, transformers</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge className="bg-orange-500/20 text-orange-300 mt-0.5">Type D</Badge>
              <div className="flex-1">
                <p className="text-xs"><strong>10-20 × In trip current</strong></p>
                <p className="text-xs text-muted-foreground">High inrush current loads, large motors, welding equipment</p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 rounded p-3">
            <p className="text-xs text-elec-light">
              <strong>Curve selection affects Zs:</strong> Higher curves (C, D) allow more fault current before tripping, 
              requiring lower Zs values to ensure 0.4s disconnection time compliance.
            </p>
          </div>
        </div>
      </InfoBox>

      {/* Worked Examples */}
      <InfoBox
        title="Worked Examples"
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        as="section"
      >
        <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-2">Example 1: Testing a Socket Circuit</h4>
            <div className="text-xs space-y-1">
              <p>• Protection: 32A Type B MCB</p>
              <p>• Maximum Zs (100%): 1.44Ω</p>
              <p>• Test limit (80%): 1.44 × 0.8 = 1.15Ω</p>
              <p>• Measured Zs: 0.85Ω</p>
              <p className="text-green-400">• Result: ✓ Pass (good margin)</p>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 rounded p-4">
            <h4 className="text-elec-yellow font-medium mb-2">Example 2: Circuit Design Check</h4>
            <div className="text-xs space-y-1">
              <p>• Protection: 16A Type C MCB</p>
              <p>• Maximum Zs (100%): 1.44Ω</p>
              <p>• Calculated Zs: 1.35Ω</p>
              <p>• Safety margin: (1.44 - 1.35) / 1.44 = 6.3%</p>
              <p className="text-yellow-400">• Result: ⚠ Pass but low margin</p>
            </div>
          </div>
        </div>
      </InfoBox>

      {/* Common Pitfalls */}
      <InfoBox
        title="Common Pitfalls & Best Practices"
        icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
        as="section"
      >
        <div className="space-y-3 text-elec-light text-sm sm:text-[0.95rem]">
          <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
            <h5 className="text-red-300 font-medium text-xs mb-1">❌ Common Mistakes:</h5>
            <ul className="text-xs space-y-0.5">
              <li>• Using 100% values for testing (should use 80%)</li>
              <li>• Ignoring temperature effects on resistance</li>
              <li>• Not accounting for parallel earth paths</li>
              <li>• Forgetting to include all circuit components in Zs</li>
            </ul>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
            <h5 className="text-green-300 font-medium text-xs mb-1">✓ Best Practices:</h5>
            <ul className="text-xs space-y-0.5">
              <li>• Always use 80% test values for verification testing</li>
              <li>• Allow design margin for temperature/aging effects</li>
              <li>• Consider voltage drop in your calculations</li>
              <li>• Test at the furthest point on the circuit</li>
            </ul>
          </div>
        </div>
      </InfoBox>

      {/* Testing Procedures */}
      <InfoBox
        title="Testing Procedures"
        icon={<CheckCircle className="h-5 w-5 text-green-400" />}
        as="section"
      >
        <div className="space-y-3 text-elec-light text-sm sm:text-[0.95rem]">
          <ol className="text-xs space-y-2 list-decimal list-inside">
            <li><strong>Safety first:</strong> Isolate circuit and prove dead</li>
            <li><strong>Test method:</strong> Use loop impedance tester or Ze + (R1+R2) method</li>
            <li><strong>Test points:</strong> Test at the furthest point and at each outlet</li>
            <li><strong>Record results:</strong> Compare against 80% test values</li>
            <li><strong>Documentation:</strong> Record on appropriate test certificate</li>
          </ol>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
            <p className="text-blue-200 text-xs">
              <strong>Testing tip:</strong> If testing shows marginal results, consider measurement uncertainty 
              and conductor temperature at time of test vs operating temperature.
            </p>
          </div>
        </div>
      </InfoBox>
    </div>
  );
};

export default ZsLookupGuidance;