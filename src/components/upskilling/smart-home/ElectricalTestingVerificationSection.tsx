import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, ClipboardCheck, Zap } from 'lucide-react';
import TestingRequirementsQuickCheck from '@/components/upskilling/smart-home/TestingRequirementsQuickCheck';

const ElectricalTestingVerificationSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TestTube className="h-6 w-6 text-elec-yellow" />
          4. Testing and Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          After installation, comprehensive testing ensures safety compliance and system reliability. 
          All tests must be performed in the correct sequence before energising any smart devices.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-400" />
              Essential Test Sequence
            </h4>
            
            <div className="space-y-3">
              <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-500 text-foreground text-xs px-2 py-1 rounded font-bold">1</span>
                  <h5 className="font-medium text-foreground">Continuity Testing</h5>
                </div>
                <p className="text-gray-300 text-sm mb-2">Test before energising any circuits:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Protective conductor continuity (earth)</li>
                  <li>• Ring final circuit continuity (if applicable)</li>
                  <li>• Phase conductor continuity</li>
                  <li>• Neutral conductor continuity</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-500 text-foreground text-xs px-2 py-1 rounded font-bold">2</span>
                  <h5 className="font-medium text-foreground">Insulation Resistance</h5>
                </div>
                <p className="text-gray-300 text-sm mb-2">Test at 500V DC between:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Phase and neutral conductors</li>
                  <li>• Phase conductors and earth</li>
                  <li>• Neutral conductor and earth</li>
                  <li>• Minimum acceptable: 1 MΩ</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-500 text-foreground text-xs px-2 py-1 rounded font-bold">3</span>
                  <h5 className="font-medium text-foreground">Polarity Verification</h5>
                </div>
                <p className="text-gray-300 text-sm">Ensure correct connections:</p>
                <ul className="text-gray-300 text-sm space-y-1 mt-2">
                  <li>• Phase to phase terminals</li>
                  <li>• Neutral to neutral terminals</li>
                  <li>• Correct switch connections (phase switching)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Functional Testing
            </h4>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h5 className="font-medium text-amber-200 mb-2">RCD Operation Testing</h5>
              <p className="text-amber-100 text-sm mb-2">Test at rated current (usually 30mA):</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Test button operation (monthly test)</li>
                <li>• Ramp test from 50% to 100% of rated current</li>
                <li>• Verify disconnection within time limits</li>
                <li>• Record test results on certificate</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Smart Device Functionality</h5>
              <p className="text-blue-100 text-sm mb-2">After electrical tests pass:</p>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Confirm devices power up safely</li>
                <li>• Check for overheating during operation</li>
                <li>• Verify communication with hubs/controllers</li>
                <li>• Test all intended functions</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <h5 className="font-medium text-foreground mb-2">Documentation Requirements</h5>
              <p className="text-gray-300 text-sm mb-2">Record and retain:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• All test results and measurements</li>
                <li>• Test equipment calibration details</li>
                <li>• Any deviations from standards</li>
                <li>• Compliance certificates (EIC/MEIWC)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-red-200 mb-2">Critical Safety Points</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-red-100 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Never energise circuits until all tests are complete and satisfactory
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Disconnect smart devices during insulation resistance testing
              </li>
            </ul>
            <ul className="space-y-2 text-red-100 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Use calibrated test equipment with current certificates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Report any failures or non-compliance immediately
              </li>
            </ul>
          </div>
        </div>

        <TestingRequirementsQuickCheck />
      </CardContent>
    </Card>
  );
};

export default ElectricalTestingVerificationSection;