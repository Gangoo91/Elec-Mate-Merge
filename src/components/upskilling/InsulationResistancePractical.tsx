import { Wrench, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const InsulationResistancePractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Testing Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Step-by-step procedure */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Step-by-Step Testing Procedure</h3>
          
          <div className="space-y-3">
            {[
              {
                step: 1,
                title: "Pre-test Safety Checks",
                content: "Ensure circuit is dead, locked off, and tested. Verify isolation of supply and check for any connected equipment that could be damaged.",
                safety: true
              },
              {
                step: 2,
                title: "Equipment Preparation",
                content: "Remove or disconnect electronic equipment, LED lamps, control gear, and surge protective devices. Document all disconnections.",
                safety: false
              },
              {
                step: 3,
                title: "Test Equipment Setup",
                content: "Select appropriate test voltage for circuit voltage. Verify insulation tester calibration and perform function test on known good/bad insulation.",
                safety: false
              },
              {
                step: 4,
                title: "Conductor Connections",
                content: "Connect live conductors together and test between them and earth. Then test between each pair of conductors with all others disconnected.",
                safety: false
              },
              {
                step: 5,
                title: "Apply Test Voltage",
                content: "Apply test voltage gradually and maintain for minimum 1 minute. Record stabilised reading when fluctuations cease.",
                safety: false
              },
              {
                step: 6,
                title: "Discharge and Document",
                content: "Safely discharge circuit capacitance. Record all readings, test conditions, and any observations in test documentation.",
                safety: true
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.safety ? 'bg-red-600 text-foreground' : 'bg-elec-yellow text-elec-dark'
                }`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    {item.title}
                    {item.safety && <AlertTriangle className="h-4 w-4 text-red-400" />}
                  </h4>
                  <p className="text-foreground text-sm leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test voltage selection guide */}
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Test Voltage Selection Guide
          </h3>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-600/20 text-green-200">SELV/PELV (≤50V)</Badge>
                <p className="text-foreground text-sm">Test voltage: <strong>250V DC</strong></p>
                <p className="text-foreground/70 text-xs">Minimum resistance: 0.5MΩ</p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-200">LV (50V-500V)</Badge>
                <p className="text-foreground text-sm">Test voltage: <strong>500V DC</strong></p>
                <p className="text-foreground/70 text-xs">Minimum resistance: 1MΩ</p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-orange-600/20 text-orange-200">500V-1000V</Badge>
                <p className="text-foreground text-sm">Test voltage: <strong>1000V DC</strong></p>
                <p className="text-foreground/70 text-xs">Minimum resistance: 1MΩ</p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-red-600/20 text-red-200">&gt;1000V</Badge>
                <p className="text-foreground text-sm">Test voltage: <strong>1000V DC minimum</strong></p>
                <p className="text-foreground/70 text-xs">Consult manufacturer specifications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common issues and solutions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Common Issues & Solutions</h3>
          
          <div className="grid gap-4">
            {[
              {
                issue: "Readings fluctuating during test",
                cause: "Capacitive effects or polarisation",
                solution: "Extend test duration, allow time for stabilisation, consider temperature effects",
                icon: "⚡"
              },
              {
                issue: "Unexpectedly low readings",
                cause: "Moisture, contamination, or damaged insulation",
                solution: "Investigate environmental conditions, check for physical damage, dry out if moisture suspected",
                icon: "💧"
              },
              {
                issue: "Cannot achieve minimum resistance",
                cause: "Equipment connected or genuine insulation failure",
                solution: "Verify all equipment disconnected, investigate cable routes, consider replacement if confirmed failure",
                icon: "⚠️"
              },
              {
                issue: "Test equipment showing errors",
                cause: "Instrument malfunction or overload",
                solution: "Check battery levels, verify test leads, calibrate equipment, replace if necessary",
                icon: "🔧"
              }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/30 border border-gray-600">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{item.issue}</h4>
                    <p className="text-foreground/70 text-sm mb-2"><strong>Cause:</strong> {item.cause}</p>
                    <p className="text-foreground text-sm"><strong>Solution:</strong> {item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best practices */}
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h3 className="text-green-200 font-medium mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Testing Best Practices
          </h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Always test at stable ambient temperature when possible</li>
            <li>• Record environmental conditions affecting the test</li>
            <li>• Use the highest appropriate test voltage for better accuracy</li>
            <li>• Test each conductor combination systematically</li>
            <li>• Allow sufficient time for readings to stabilise</li>
            <li>• Document any equipment that had to be disconnected</li>
            <li>• Verify test equipment calibration before use</li>
            <li>• Consider safety implications of test voltages on personnel</li>
          </ul>
        </div>

      </CardContent>
    </Card>
  );
};