import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, AlertTriangle, Settings, ClipboardCheck } from 'lucide-react';

export const BMSModule7Section2Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Electrician's Role in Programming Support</h4>
          <p className="text-foreground mb-4">
            While electricians don't write BMS programs, they play a crucial role in verifying that programmed 
            logic matches physical installation and performs as intended during commissioning.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Physical Verification
              </h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Signal matching:</strong> Ensure wired sensors match programmed points</li>
                <li>• <strong>I/O verification:</strong> Confirm inputs/outputs correspond to IO list</li>
                <li>• <strong>Polarity checks:</strong> Verify analog signals have correct polarity</li>
                <li>• <strong>Range testing:</strong> Check sensor ranges match programming</li>
                <li>• <strong>Address verification:</strong> Confirm network device addresses</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Testing Support
              </h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Manual operation:</strong> Operate switches, dampers, relays during testing</li>
                <li>• <strong>Load simulation:</strong> Create test conditions for programming verification</li>
                <li>• <strong>Response monitoring:</strong> Observe physical responses to programmed commands</li>
                <li>• <strong>Timing verification:</strong> Confirm delays and sequences operate correctly</li>
                <li>• <strong>Override testing:</strong> Test manual override and emergency functions</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Safety and Fail-Safe Verification</h4>
          
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-red-400 font-semibold mb-2">Critical Safety Checks</h5>
                <p className="text-sm text-foreground mb-2">
                  Electricians must verify that programmed safety interlocks and fail-safes operate correctly:
                </p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• Fire alarm inputs disable plant equipment as programmed</li>
                  <li>• Emergency stop functions override all other commands</li>
                  <li>• Safety trips and interlocks respond immediately</li>
                  <li>• Fail-safe states are achieved when inputs are lost</li>
                  <li>• Manual overrides work but don't compromise safety</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Fire Safety</h5>
              <ul className="space-y-1 text-sm">
                <li>• Fire panel interface signals</li>
                <li>• Smoke extract fan control</li>
                <li>• Fire damper operation</li>
                <li>• HVAC shutdown sequences</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">Equipment Protection</h5>
              <ul className="space-y-1 text-sm">
                <li>• Motor overload protection</li>
                <li>• Low water level trips</li>
                <li>• High temperature shutoffs</li>
                <li>• Pressure safety limits</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">System Interlocks</h5>
              <ul className="space-y-1 text-sm">
                <li>• Pump/fan start sequences</li>
                <li>• Valve position confirmations</li>
                <li>• Lead/lag alternation</li>
                <li>• Duty/standby changeover</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Best Practices During Programming & Testing</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">Systematic Testing Approach</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-foreground">Pre-Testing Checks:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Ensure all points from IO list are programmed</li>
                        <li>• Verify control sequences match design intent</li>
                        <li>• Check that safety interlocks are included</li>
                        <li>• Confirm manual override capabilities</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-foreground">During Testing:</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Test each sequence with electricians present</li>
                        <li>• Validate wiring matches programming</li>
                        <li>• Document any discrepancies immediately</li>
                        <li>• Record final configuration parameters</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Failure Mode Testing</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-foreground">Simulated Failures:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Disconnect sensor signals temporarily</li>
                    <li>• Simulate power failures to devices</li>
                    <li>• Test communication network interruptions</li>
                    <li>• Activate fire alarm and safety inputs</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">Expected Responses:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Systems fail to safe states</li>
                    <li>• Alarms are generated appropriately</li>
                    <li>• Manual override remains functional</li>
                    <li>• Recovery operates correctly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Communication and Documentation</h4>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold mb-2">Reporting and Feedback</h5>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-foreground">Issues to Report:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Programmed outputs don't match physical behaviour</li>
                  <li>• Missing or incorrect input/output points</li>
                  <li>• Safety interlocks not functioning as expected</li>
                  <li>• Timing sequences incorrect or unsuitable</li>
                  <li>• Manual overrides not working properly</li>
                </ul>
              </div>
              
              <div>
                <strong className="text-foreground">Documentation Requirements:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Control sequences in plain language for operators</li>
                  <li>• Final tuning parameters for PID loops</li>
                  <li>• Commissioning test results and sign-offs</li>
                  <li>• As-built modifications to original design</li>
                  <li>• Operating and maintenance instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};