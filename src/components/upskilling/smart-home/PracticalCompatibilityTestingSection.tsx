import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, CheckCircle, Clock, FileText } from 'lucide-react';

export const PracticalCompatibilityTestingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TestTube className="h-6 w-6 text-elec-yellow" />
          Practical Compatibility Testing Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Develop a systematic approach to testing load and control compatibility before 
          full installation to avoid costly mistakes and client dissatisfaction.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Pre-Installation Testing Protocol
            </h4>
            <div className="space-y-3">
              <div className="bg-green-900/20 border-l-4 border-green-600 p-3">
                <h5 className="text-green-300 font-semibold text-sm">Step 1: Documentation Review</h5>
                <ul className="text-green-200 text-xs space-y-1 mt-1">
                  <li>• Check manufacturer compatibility charts</li>
                  <li>• Verify voltage and wattage specifications</li>
                  <li>• Confirm dimming capabilities and ranges</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 border-l-4 border-blue-600 p-3">
                <h5 className="text-blue-300 font-semibold text-sm">Step 2: Bench Testing</h5>
                <ul className="text-blue-200 text-xs space-y-1 mt-1">
                  <li>• Test one bulb/fixture with proposed dimmer</li>
                  <li>• Check full dimming range (1-100%)</li>
                  <li>• Listen for buzzing or humming noises</li>
                  <li>• Observe for flickering or strobing</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 border-l-4 border-purple-600 p-3">
                <h5 className="text-purple-300 font-semibold text-sm">Step 3: Load Testing</h5>
                <ul className="text-purple-200 text-xs space-y-1 mt-1">
                  <li>• Test with minimum and maximum loads</li>
                  <li>• Verify startup behaviour</li>
                  <li>• Check thermal performance over time</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Performance Evaluation Criteria
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <h5 className="text-gray-300 font-semibold text-sm mb-2">✓ Pass Criteria</h5>
                <ul className="text-gray-300 text-xs space-y-1">
                  <li>• Smooth dimming 0-100%</li>
                  <li>• No audible noise</li>
                  <li>• No visible flicker</li>
                  <li>• Stable startup</li>
                  <li>• Normal operating temperature</li>
                </ul>
              </div>
              <div>
                <h5 className="text-red-300 font-semibold text-sm mb-2">✗ Fail Criteria</h5>
                <ul className="text-red-300 text-xs space-y-1">
                  <li>• Flickering or strobing</li>
                  <li>• Buzzing or humming</li>
                  <li>• Limited dimming range</li>
                  <li>• Startup delays or failures</li>
                  <li>• Excessive heat generation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <h4 className="text-foreground font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              Testing Documentation Template
            </h4>
            <div className="bg-gray-800 p-3 rounded border">
              <p className="text-gray-300 text-xs font-mono">
                Project: _______________<br/>
                Date: _______________<br/>
                Installer: _______________<br/><br/>
                
                Load Type: _______________<br/>
                Control Type: _______________<br/>
                Quantity: _______________<br/><br/>
                
                Test Results:<br/>
                □ Dimming Range: _____ % to _____ %<br/>
                □ No Flicker: Yes / No<br/>
                □ No Noise: Yes / No<br/>
                □ Startup: Normal / Delayed / Failed<br/>
                □ Temperature: Normal / Warm / Hot<br/><br/>
                
                Overall: Pass / Fail<br/>
                Notes: _______________
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-600/50 p-4 rounded-lg">
          <p className="text-amber-200 text-sm">
            <strong>Professional Tip:</strong> Always test combinations you haven't used before, 
            even if they appear on compatibility lists. Real-world performance can vary.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};