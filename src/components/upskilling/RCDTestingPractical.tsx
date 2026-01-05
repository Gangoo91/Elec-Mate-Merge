import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, AlertTriangle, CheckCircle } from 'lucide-react';

const RCDTestingPractical = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Practical Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4 sm:space-y-6">
          <p className="text-sm sm:text-base leading-relaxed">
            Follow these step-by-step procedures for safe and accurate RCD testing in 
            real installation environments.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Step-by-Step Testing Process</CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Step 1: Preparation and Safety</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Isolate all loads from the circuit under test</li>
                <li>• Verify RCD is energised and functional</li>
                <li>• Check test button operation</li>
                <li>• Confirm correct earthing arrangements</li>
                <li>• Ensure safe working environment</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Step 2: Equipment Setup</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Connect test leads to appropriate terminals</li>
                <li>• Select correct RCD type on tester</li>
                <li>• Set test voltage (230V single phase, 400V three phase)</li>
                <li>• Verify phase sequence for three-phase systems</li>
                <li>• Perform instrument self-test</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Step 3: Test Execution</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Perform ½ × IΔn test first (no trip expected)</li>
                <li>• Reset RCD if tripped during sensitivity test</li>
                <li>• Execute 1 × IΔn tests at 0° and 180°</li>
                <li>• Record both trip times, note the longer value</li>
                <li>• Perform 5 × IΔn test (only mandatory for socket outlets ≤20A)</li>
                <li>• Test all phases on three-phase RCDs</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Step 4: Results and Documentation</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Record all test results on appropriate certificate</li>
                <li>• Note RCD type, rating, and location</li>
                <li>• Document any anomalies or concerns</li>
                <li>• Reset RCD to normal service position</li>
                <li>• Restore circuit loads and verify operation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Special Considerations</CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4 sm:space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Type A RCDs</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Can detect AC and pulsating DC residual currents</li>
                <li>• Required for circuits supplying equipment with rectifiers</li>
                <li>• Test with both AC and pulsating DC test currents</li>
                <li>• Common in modern installations</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Type B RCDs</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Detect AC, pulsating DC, and smooth DC currents</li>
                <li>• Required for EV charging and inverter circuits</li>
                <li>• Specialised test equipment may be required</li>
                <li>• More complex testing procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Common Testing Errors
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-2">Incorrect Test Location</h4>
              <p className="text-sm sm:text-base">Testing from the distribution board doesn't prove circuit integrity. Always test from the furthest practical point.</p>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-2">Wrong RCD Type Selection</h4>
              <p className="text-sm sm:text-base">Ensure tester is set for correct RCD type (AC, A, or B) to avoid invalid test results.</p>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-2">Parallel Earth Paths</h4>
              <p className="text-sm sm:text-base">Bonding connections can create parallel paths affecting test results. Consider disconnecting where safe to do so.</p>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-2">Insufficient Supply Voltage</h4>
              <p className="text-sm sm:text-base">Low supply voltage can affect RCD operation. Verify supply voltage is within normal limits before testing.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Best Practice Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4 sm:space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Testing Frequency</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Initial verification: All tests required</li>
                <li>• Periodic inspection: Based on environment</li>
                <li>• After fault repairs: Relevant tests</li>
                <li>• Monthly test button operation (user)</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3">Record Keeping</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Use appropriate test certificates</li>
                <li>• Record actual measured values</li>
                <li>• Note environmental conditions</li>
                <li>• Include RCD manufacturer and type</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Three-Phase RCD Testing</CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4 sm:space-y-6">
          <p className="text-sm sm:text-base leading-relaxed">
            Three-phase RCDs require testing between each line conductor and neutral to ensure 
            balanced protection across all phases.
          </p>
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-3">Testing Procedure:</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>• Test L1 to N, then L2 to N, then L3 to N</li>
              <li>• Perform complete test sequence for each phase</li>
              <li>• Record longest trip time found</li>
              <li>• Verify phase sequence before testing</li>
              <li>• Ensure balanced loading where possible</li>
              <li>• Check neutral integrity and star point earthing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RCDTestingPractical;