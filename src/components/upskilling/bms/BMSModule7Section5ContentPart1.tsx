import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckSquare, Zap, Settings } from 'lucide-react';

export const BMSModule7Section5ContentPart1 = () => {
  const powerChecks = [
    "24V AC/DC supplies: 22-26V under load",
    "230V single phase: 207-253V (BS7671)",
    "400V three phase: 360-440V line-to-line",
    "Control signal voltages: 0-10V, 4-20mA ranges",
    "Battery backup systems: Full charge capacity",
    "UPS systems: Switchover time <10ms"
  ];

  const digitalIOTests = [
    "Digital Inputs: Use jumper wire to simulate contact closure",
    "Status feedback: Manually operate dampers/valves to verify position",
    "Alarm inputs: Test with normally closed dry contacts",
    "Digital Outputs: Command on/off, verify LED indicators respond",
    "Relay outputs: Check with multimeter for contact closure",
    "24V outputs: Measure voltage when active (22-26V expected)"
  ];

  const analogIOTests = [
    "Temperature inputs: Use calibrated simulator (4-20mA or Pt100)",
    "Pressure inputs: Apply known pressure, verify reading ±2%",
    "Flow inputs: Simulate with current source (4mA = 0%, 20mA = 100%)",
    "Analog outputs: Command 0-100%, measure with multimeter",
    "Control signals: Verify 0-10V or 2-10V as per specification",
    "Sensor calibration: Check against UKAS traceable instruments"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-elec-yellow" />
          Pre-Functional Commissioning - Detailed Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Pre-functional commissioning systematically verifies all electrical infrastructure before testing 
          operational sequences. This critical phase prevents equipment damage and ensures safe commissioning.
        </p>

        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-foreground font-bold mb-3">🔧 Essential Tools Required</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>• Digital multimeter (True RMS)</div>
            <div>• Current loop calibrator</div>
            <div>• Insulation tester (500V/1000V)</div>
            <div>• Temperature simulator</div>
            <div>• Phase rotation tester</div>
            <div>• Earth loop impedance tester</div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Power System Verification</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Systematic verification of all power supplies with specific voltage tolerances per BS7671:
            </p>
            <ul className="text-xs text-foreground space-y-1 ml-4">
              {powerChecks.map((check, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  {check}
                </li>
              ))}
            </ul>
            <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
              <p className="text-xs text-foreground">
                <strong>Critical:</strong> Test at maximum load conditions. Record all readings in commissioning sheets.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <Settings className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Digital I/O Testing Procedures</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Test each digital point individually using systematic approach:
            </p>
            <ul className="text-xs text-foreground space-y-1 ml-4">
              {digitalIOTests.map((test, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-start gap-3 mb-3">
              <Settings className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Analogue I/O Calibration</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Precise calibration of analogue signals with acceptable tolerances:
            </p>
            <ul className="text-xs text-foreground space-y-1 ml-4">
              {analogIOTests.map((test, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <h4 className="text-foreground font-semibold">Safety Interlock Verification</h4>
            </div>
            <p className="text-sm text-foreground mb-3">
              Critical safety systems must be tested before any equipment operation:
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2 bg-red-900/30 rounded">
                <strong className="text-red-300">Fire Alarm Interface:</strong> Test NC contacts, verify equipment shuts down within 5 seconds
              </div>
              <div className="p-2 bg-red-900/30 rounded">
                <strong className="text-red-300">Emergency Stops:</strong> Test all E-stop buttons, verify immediate power isolation
              </div>
              <div className="p-2 bg-red-900/30 rounded">
                <strong className="text-red-300">High/Low Pressure Trips:</strong> Simulate using test points, verify safe shutdown sequences
              </div>
              <div className="p-2 bg-red-900/30 rounded">
                <strong className="text-red-300">Temperature Limits:</strong> Test high temperature cutouts on boilers/chillers
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Example</h4>
          <p className="text-sm text-foreground">
            Before testing an AHU, the engineer checks that all sensors read sensible values (e.g., 21°C, not 0°C) 
            and that actuators move when commanded. Digital inputs show correct states, and analog inputs provide 
            realistic readings within expected ranges.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground">
                👉 Why must pre-functional commissioning happen before full sequences are tested?
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Think: What could happen if you test complex sequences without verifying basic wiring first?
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};