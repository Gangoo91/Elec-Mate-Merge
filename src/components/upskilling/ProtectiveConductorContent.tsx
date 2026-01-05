
import { BookOpen, Shield, Zap, Settings, Cable, CheckCircle, AlertTriangle, Wrench, Target, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProtectiveConductorContent = () => {
  const testingTriggers = [
    "During initial verification of a new circuit",
    "After alterations involving the earth path",
    "Following any repair or fault where bonding might be compromised",
    "As a spot-check during periodic inspections if a fault is suspected"
  ];

  const testSteps = [
    { step: 1, action: "Set your tester to low-resistance (Ω) mode" },
    { step: 2, action: "Zero the leads first" },
    { step: 3, action: "Connect one probe at the origin (e.g. DB earth bar)" },
    { step: 4, action: "Connect the other at the far end (e.g. socket CPC terminal)" },
    { step: 5, action: "Record the reading and verify it's within acceptable limits" }
  ];

  const commonProblems = [
    { issue: "High resistance readings", causes: ["Loose terminal connections", "Corroded connections", "Damaged conductor"] },
    { issue: "No continuity", causes: ["Broken CPC", "Disconnected earth terminal", "Faulty connection"] },
    { issue: "Intermittent readings", causes: ["Poor connection quality", "Oxidised terminals", "Vibration damage"] }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What Is the CPC */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">What Is the CPC?</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              The Circuit Protective Conductor (CPC) is the earth wire that ensures fault current flows 
              safely back to the supply, enabling protective devices to disconnect the circuit during a fault.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3 sm:p-4">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                <strong>Remember:</strong> The CPC provides the return path for fault current, ensuring 
                automatic disconnection of supply (ADS) can operate effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Why CPC Continuity Testing Matters */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Why CPC Continuity Testing Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
              <h4 className="text-red-200 font-medium mb-2">Without Proper CPC</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Fault current cannot return to source</li>
                <li>• Protective devices won't operate</li>
                <li>• Exposed metalwork remains live</li>
                <li>• Risk of fatal electric shock</li>
              </ul>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">With Good CPC Continuity</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Fault current flows safely to earth</li>
                <li>• MCBs/RCDs operate within required time</li>
                <li>• Metalwork remains at earth potential</li>
                <li>• Protection against electric shock</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Regulatory Requirements (BS 7671)</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <h4 className="text-blue-200 font-medium mb-2">Section 643.2.3</h4>
              <p className="text-foreground text-sm">
                The continuity of protective conductors, including main equipotential bonding 
                conductors and supplementary equipotential bonding conductors, shall be verified.
              </p>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">Testing Requirement</h4>
              <p className="text-foreground text-sm">
                Must be tested during initial verification and after any work that might affect 
                the earth fault path integrity.
              </p>
            </div>
          </div>
        </div>

        {/* When Should You Test */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">When Should You Test CPC Continuity?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testingTriggers.map((trigger, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <p className="text-foreground text-sm">{trigger}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Method */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Test Method – Low Resistance Ohmmeter</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {testSteps.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded bg-gray-600/10 border border-gray-600/20">
                  <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-foreground">{item.action}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-sm">
                <strong>Purpose:</strong> You are confirming there is no break and minimal resistance in the CPC path.
              </p>
            </div>
          </div>
        </div>

        {/* Acceptable Test Values */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Acceptable Test Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">Typical Reading</h4>
              <p className="text-foreground text-sm">
                Resistance should be very low, typically less than 1 ohm
              </p>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <Settings className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2">Documentation</h4>
              <p className="text-foreground text-sm">
                Record exact readings—don't just tick a box
              </p>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
              <h4 className="text-red-200 font-medium mb-2">High Resistance</h4>
              <p className="text-foreground text-sm">
                Check for loose terminals, corrosion, or wrong conductor size
              </p>
            </div>
          </div>
        </div>

        {/* Testing Different CPC Types */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Testing Different CPC Types</h3>
          <div className="space-y-3">
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">Cable CPC (Most Common)</h4>
              <p className="text-foreground text-sm mb-2">
                Standard earth wire within multicore cable (e.g., twin & earth)
              </p>
              <div className="bg-green-600/10 border border-green-600/20 rounded p-2">
                <p className="text-foreground text-xs">
                  <strong>Test:</strong> From consumer unit earth bar to final accessory earth terminal
                </p>
              </div>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">Metal Conduit/Trunking as CPC</h4>
              <p className="text-foreground text-sm mb-2">
                Metal containment system acting as protective conductor
              </p>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-2">
                <p className="text-foreground text-xs">
                  <strong>Test:</strong> From earth bar to exposed metalwork via containment system
                </p>
              </div>
            </div>

            <div className="bg-[#323232] rounded-lg p-4">
              <h4 className="text-foreground font-medium mb-3">Separate CPC</h4>
              <p className="text-foreground text-sm mb-2">
                Independent earth wire run alongside circuit conductors
              </p>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-2">
                <p className="text-foreground text-xs">
                  <strong>Test:</strong> End-to-end continuity of the separate earth conductor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Bonding Conductors */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Testing Bonding Conductors</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <p className="text-foreground">
              Main and supplementary bonding must also be tested for continuity using a similar method.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-4">
                <h4 className="text-yellow-200 font-medium mb-2">Main Bonding</h4>
                <p className="text-foreground text-sm mb-2">
                  From MET (Main Earth Terminal):
                </p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• To gas service pipe</li>
                  <li>• To water service pipe</li>
                  <li>• To oil service pipe</li>
                  <li>• To structural steelwork</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Supplementary Bonding</h4>
                <p className="text-foreground text-sm mb-2">
                  Between exposed/extraneous parts:
                </p>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Bath to taps</li>
                  <li>• Radiator to pipework</li>
                  <li>• Metal fixtures to services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Problems and Solutions */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Problems and Solutions</h3>
          <div className="space-y-3">
            {commonProblems.map((problem, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-red-200 font-medium mb-2">{problem.issue}</h4>
                <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                  <p className="text-foreground text-sm mb-2">Common causes:</p>
                  <ul className="text-foreground text-xs space-y-1">
                    {problem.causes.map((cause, causeIndex) => (
                      <li key={causeIndex}>• {cause}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Important Testing Notes</h3>
          <div className="space-y-3">
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Cable className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-200 font-medium mb-2">Large Installations</h4>
                  <p className="text-foreground text-sm">
                    For large installations, long CPC runs may require calculation of maximum permissible resistance
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Parallel Paths</h4>
                  <p className="text-foreground text-sm">
                    Always ensure parallel paths (e.g. through metal containment) don't give false positives
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Safety During Testing</h4>
                  <p className="text-foreground text-sm">
                    Always isolate circuits before testing and ensure test equipment is properly calibrated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
