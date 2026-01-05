import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section5SecurityIntegration = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-green-500" />
          2. Security Integration with Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-foreground font-semibold mb-3">Automated Security Response</h4>
          <p className="text-sm mb-3">
            When motion is detected by an outdoor PIR, security lights can activate automatically, 
            creating both a deterrent effect and improved visibility for security cameras. Interior 
            lights can be triggered to simulate occupancy, discouraging intruders who might be 
            watching the property for signs of vacancy.
          </p>
          <p className="text-sm">
            Lights linked with CCTV can highlight an area when a camera is activated, improving 
            recording quality and providing better identification capabilities during security events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Deterrent Lighting Strategies</h4>
            <div className="space-y-3">
              <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Motion-Activated Floodlights</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Sudden bright illumination startles intruders</li>
                  <li>• Wide-angle coverage of vulnerable areas</li>
                  <li>• Integration with PIR motion sensors</li>
                  <li>• Adjustable sensitivity and duration settings</li>
                </ul>
              </div>
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Occupancy Simulation</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Random lighting patterns when away</li>
                  <li>• TV simulation with flickering blue light</li>
                  <li>• Bedroom lights mimicking sleep routines</li>
                  <li>• Kitchen and living room activity patterns</li>
                </ul>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Perimeter Security Lighting</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Pathway illumination preventing hiding spots</li>
                  <li>• Garden and boundary fence lighting</li>
                  <li>• Driveway and garage area coverage</li>
                  <li>• Integration with security camera positioning</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">CCTV and Lighting Integration</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">Camera-Triggered Lighting</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Lights activate when camera detects motion</li>
                  <li>• Infrared illuminators for night vision</li>
                  <li>• Colour temperature optimised for recording</li>
                  <li>• Elimination of backlighting issues</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-orange-400 font-semibold text-sm mb-1">Recording Enhancement</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Improved facial recognition capability</li>
                  <li>• License plate visibility enhancement</li>
                  <li>• Reduced shadows and blind spots</li>
                  <li>• Consistent lighting for evidence quality</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">Alert Integration</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Coordinated lighting and recording activation</li>
                  <li>• Visual alerts to neighbours via lighting</li>
                  <li>• Different lighting patterns for threat levels</li>
                  <li>• Integration with alarm system responses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Security Lighting Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Sensor Integration:</p>
              <ul className="text-xs space-y-1">
                <li>• PIR motion detector placement</li>
                <li>• Door/window contact sensor linking</li>
                <li>• Glass break sensor coordination</li>
                <li>• Vibration sensor integration</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Timing and Scheduling:</p>
              <ul className="text-xs space-y-1">
                <li>• Dusk-to-dawn automatic operation</li>
                <li>• Holiday and vacation mode settings</li>
                <li>• Seasonal adjustment programming</li>
                <li>• Weekend vs weekday variations</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Response Customisation:</p>
              <ul className="text-xs space-y-1">
                <li>• Different responses for zones</li>
                <li>• Escalating alert sequences</li>
                <li>• Integration with security monitoring</li>
                <li>• Manual override capabilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
          <h4 className="text-orange-400 font-semibold mb-3">Psychological Deterrence Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Immediate Impact:</p>
              <ul className="text-xs space-y-1">
                <li>• Sudden illumination creates startle response</li>
                <li>• Eliminates concealment opportunities</li>
                <li>• Suggests active monitoring and awareness</li>
                <li>• Increases perceived risk of detection</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Long-term Effect:</p>
              <ul className="text-xs space-y-1">
                <li>• Property appears actively monitored</li>
                <li>• Creates impression of occupancy</li>
                <li>• Neighbourhood security enhancement</li>
                <li>• Builds reputation as difficult target</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};