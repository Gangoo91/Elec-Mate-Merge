import { Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section5PracticalGuidance = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance for Electricians
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/30">
          <h4 className="text-foreground font-semibold mb-3">Professional Installation Guidelines</h4>
          <p className="text-sm mb-3">
            When setting up lighting and emergency scenes, electricians must balance aesthetic 
            preferences with safety requirements and regulatory compliance. Proper planning and 
            systematic testing ensure reliable operation when systems are needed most.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Planning and Design</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Lighting Zone Planning</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Map indoor zones (bedrooms, living areas, hallways)</li>
                  <li>• Plan outdoor coverage (gardens, driveways, perimeter)</li>
                  <li>• Identify stairwell and corridor emergency routes</li>
                  <li>• Plan exit pathway illumination strategies</li>
                </ul>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Safety and Compliance</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Ensure emergency lighting meets BS 5266 standards</li>
                  <li>• Verify adequate illumination levels for escape routes</li>
                  <li>• Plan battery backup duration for critical systems</li>
                  <li>• Design for accessibility and inclusive needs</li>
                </ul>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Integration Requirements</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Coordinate with existing security systems</li>
                  <li>• Plan CCTV and lighting synchronisation</li>
                  <li>• Design sensor placement for optimal coverage</li>
                  <li>• Consider smart home hub compatibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Testing and Commissioning</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-orange-400 font-semibold text-sm mb-1">Sensor Communication Testing</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Test PIR detection ranges and sensitivity</li>
                  <li>• Verify door/window sensor integration</li>
                  <li>• Check response times under various conditions</li>
                  <li>• Test wireless signal strength throughout property</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">Emergency Scene Verification</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Simulate fire alarm activation scenarios</li>
                  <li>• Test evacuation pathway lighting sequences</li>
                  <li>• Verify battery backup operation duration</li>
                  <li>• Check manual override functionality</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">Performance Validation</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Test scene activation from multiple triggers</li>
                  <li>• Verify timing and transition behaviours</li>
                  <li>• Check integration with voice assistants</li>
                  <li>• Validate mobile app control functionality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Customer Education and Training</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">System Operation:</p>
              <ul className="text-xs space-y-1">
                <li>• Demonstrate scene activation methods</li>
                <li>• Show mobile app scene customisation</li>
                <li>• Explain voice command integration</li>
                <li>• Train on manual override procedures</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Emergency Procedures:</p>
              <ul className="text-xs space-y-1">
                <li>• Practice emergency scene activation</li>
                <li>• Explain evacuation lighting guidance</li>
                <li>• Show manual emergency light controls</li>
                <li>• Review battery backup procedures</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Maintenance and Updates:</p>
              <ul className="text-xs space-y-1">
                <li>• Schedule regular scene testing routines</li>
                <li>• Explain battery replacement schedules</li>
                <li>• Show firmware update procedures</li>
                <li>• Provide troubleshooting guidelines</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
          <h4 className="text-red-400 font-semibold mb-3">Critical Installation Reminders</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Always Verify:</p>
              <ul className="text-xs space-y-1">
                <li>• Emergency lighting meets local building codes</li>
                <li>• Battery backup systems function correctly</li>
                <li>• All emergency scenes activate reliably</li>
                <li>• Manual overrides work in all conditions</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Never Compromise On:</p>
              <ul className="text-xs space-y-1">
                <li>• Life safety lighting requirements</li>
                <li>• Emergency evacuation pathway clarity</li>
                <li>• Battery backup minimum duration</li>
                <li>• Compliance with electrical safety standards</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-green-400 font-semibold mb-3">Professional Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Installation Efficiency:</p>
              <ul className="text-xs space-y-1">
                <li>• Pre-configure devices before installation</li>
                <li>• Use cable management for clean installations</li>
                <li>• Label all circuits and zones clearly</li>
                <li>• Document configuration settings thoroughly</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Future-Proofing:</p>
              <ul className="text-xs space-y-1">
                <li>• Install additional neutral conductors</li>
                <li>• Plan for technology upgrade pathways</li>
                <li>• Choose open-standard protocols where possible</li>
                <li>• Design expandable network infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};