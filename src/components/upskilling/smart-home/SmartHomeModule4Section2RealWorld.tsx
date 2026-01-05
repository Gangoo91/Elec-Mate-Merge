import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const SmartHomeModule4Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">The OpenTherm Compatibility Issue</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-red-200 mb-3">The Problem</h5>
              <p className="text-gray-300 mb-4">
                A homeowner decides to upgrade their heating system with a smart thermostat that supports OpenTherm for modulating control. They purchase a Nest Learning Thermostat expecting significant energy savings through efficient boiler modulation.
              </p>
              <p className="text-gray-300 mb-4">
                However, after installation, they don't see the expected energy savings. The system works, but the boiler still seems to run at full output much of the time, similar to their old thermostat.
              </p>
              <p className="text-gray-300">
                Upon investigation, the installer discovers that whilst the Nest thermostat supports OpenTherm, the homeowner's 15-year-old combi boiler only accepts simple on/off switching via relay contacts.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-orange-200 mb-3">What Went Wrong</h5>
              <p className="text-gray-300 mb-4">
                The compatibility issue wasn't identified during the initial assessment. Key oversights included:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Assessment Gaps</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Boiler manual not checked for OpenTherm support</li>
                    <li>• Assumed newer smart features would work with older boiler</li>
                    <li>• No compatibility verification performed</li>
                    <li>• Customer expectations not properly managed</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Technical Issues</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Boiler lacks digital communication interface</li>
                    <li>• Only supports basic relay switching</li>
                    <li>• No modulation capability available</li>
                    <li>• Smart features limited to scheduling only</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-green-200 mb-3">The Solution</h5>
              <p className="text-gray-300 mb-4">
                The installer had several options to address the compatibility issue and still provide value to the customer:
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-elec-gray border border-blue-600/30 rounded">
                  <h6 className="font-medium text-blue-200 mb-2">Short-term Fix</h6>
                  <p className="text-gray-300 text-sm">
                    Configure the Nest for relay-only operation and focus on smart scheduling, geofencing, and remote control benefits. 
                    While modulation isn't available, these features still provide energy savings.
                  </p>
                </div>
                
                <div className="p-3 bg-elec-gray border border-green-600/30 rounded">
                  <h6 className="font-medium text-green-200 mb-2">Add Smart TRVs</h6>
                  <p className="text-gray-300 text-sm">
                    Install smart TRVs on key radiators to create room-level zoning. This provides the precise control 
                    that boiler modulation would have offered, just at the room level instead.
                  </p>
                </div>
                
                <div className="p-3 bg-elec-gray border border-purple-600/30 rounded">
                  <h6 className="font-medium text-purple-200 mb-2">Future Upgrade Path</h6>
                  <p className="text-gray-300 text-sm">
                    Recommend boiler replacement with OpenTherm-compatible model when due for renewal, 
                    ensuring the smart thermostat can then deliver full modulating benefits.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-blue-200 mb-3">Lessons Learned</h5>
              <p className="text-gray-300 mb-4">
                This scenario highlights the importance of thorough compatibility assessment before installation:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Essential Checks</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Review boiler specifications and manual</li>
                    <li>• Check manufacturer compatibility lists</li>
                    <li>• Verify communication protocols supported</li>
                    <li>• Assess existing wiring and connections</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Customer Management</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Set realistic expectations about functionality</li>
                    <li>• Explain what features will/won't work</li>
                    <li>• Provide upgrade pathway options</li>
                    <li>• Document system limitations clearly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-3">Discussion Questions:</h5>
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm">What should have been checked before installation?</p>
                <p className="text-gray-400 text-xs mt-1">Consider compatibility verification steps and documentation review.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">How could the installer still provide value to the customer?</p>
                <p className="text-gray-400 text-xs mt-1">Think about alternative smart features and zoning solutions.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">What preventive measures can avoid similar issues?</p>
                <p className="text-gray-400 text-xs mt-1">Consider assessment procedures and customer communication strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};