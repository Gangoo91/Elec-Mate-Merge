import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-green-500" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
          <h4 className="text-foreground font-semibold mb-3">Manchester Family Smart Lighting Integration</h4>
          <p className="text-sm mb-3">
            A family home in Manchester integrated PIR sensors with their comprehensive smart lighting 
            system, creating multiple automated responses for security, convenience, and emergency 
            situations. The installation demonstrates practical integration of lighting scenes with 
            security systems and emergency protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Security Integration Response</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Night Security Activation</p>
                <p className="text-xs text-foreground">
                  When motion was detected in the garden at night, three coordinated responses 
                  activated automatically: exterior floodlights illuminated the detection area, 
                  CCTV cameras began recording with enhanced night vision, and interior hallway 
                  lights switched on to simulate occupancy.
                </p>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Occupancy Simulation</p>
                <p className="text-xs text-foreground">
                  During family holidays, the "Away Mode" scene activated random lighting patterns 
                  throughout the house, including living room lights in the evening, bedroom lights 
                  at bedtime hours, and bathroom lights for brief periods to create realistic 
                  occupancy patterns.
                </p>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Deterrent Effectiveness</p>
                <p className="text-xs text-foreground">
                  The visible security lighting response and simulated occupancy successfully 
                  deterred attempted intrusions, with the bright activation causing would-be 
                  intruders to leave the property immediately on multiple occasions.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Emergency Response System</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">Fire Safety Protocol</p>
                <p className="text-xs text-foreground">
                  In the emergency profile, smoke alarm activation triggered all lights to flash 
                  red three times, then illuminated a sequential pathway from all bedrooms to 
                  the front door, with stairway lighting at maximum brightness to guide safe 
                  evacuation.
                </p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Medical Emergency Response</p>
                <p className="text-xs text-foreground">
                  The medical emergency scene activated all interior lights to full brightness, 
                  illuminated the pathway to the front door, and switched on exterior porch 
                  lights to assist emergency services in locating the property quickly.
                </p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">Power Outage Backup</p>
                <p className="text-xs text-foreground">
                  During a neighbourhood power cut, battery backup systems automatically activated 
                  emergency lighting in hallways and stairwells, while solar-charged garden 
                  lights continued perimeter security illumination throughout the night.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Technical Implementation Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Hardware Components:</p>
              <ul className="text-xs space-y-1">
                <li>• 12x PIR motion sensors (indoor/outdoor)</li>
                <li>• 18x Smart LED downlights with dimming</li>
                <li>• 6x Smart switches with scene control</li>
                <li>• Central hub with Zigbee mesh network</li>
                <li>• Battery backup system for critical circuits</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Scene Configuration:</p>
              <ul className="text-xs space-y-1">
                <li>• 8x Daily living scenes (morning, evening, etc.)</li>
                <li>• 4x Security scenes (away, night, alert)</li>
                <li>• 3x Emergency scenes (fire, medical, power out)</li>
                <li>• Seasonal adjustment programming</li>
                <li>• Manual override capabilities throughout</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Integration Features:</p>
              <ul className="text-xs space-y-1">
                <li>• CCTV system synchronised activation</li>
                <li>• Smoke alarm integration protocols</li>
                <li>• Mobile app control and monitoring</li>
                <li>• Voice assistant scene activation</li>
                <li>• Neighbour notification via exterior lights</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
          <h4 className="text-purple-400 font-semibold mb-3">Installation and Configuration Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Challenges Encountered:</p>
              <ul className="text-xs space-y-1">
                <li>• Existing wiring lacked neutral conductors in some locations</li>
                <li>• Stone walls required careful wireless signal planning</li>
                <li>• Integration with legacy alarm system needed custom programming</li>
                <li>• Battery backup sizing for adequate emergency duration</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Solutions Implemented:</p>
              <ul>
                <li>• Bypass modules installed for neutral-free smart switches</li>
                <li>• Mesh network optimised with strategic repeater placement</li>
                <li>• API integration bridge for alarm system communication</li>
                <li>• Staged battery backup with priority circuit designation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-blue-400 font-semibold mb-3">Results and Customer Satisfaction</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Measured Benefits:</p>
              <ul className="text-xs space-y-1">
                <li>• 40% reduction in false security alerts</li>
                <li>• 15% energy savings through intelligent scheduling</li>
                <li>• 100% emergency scene activation reliability</li>
                <li>• Enhanced property security and peace of mind</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Ongoing Benefits:</p>
              <ul className="text-xs space-y-1">
                <li>• Daily convenience through automated lighting</li>
                <li>• Improved home security and deterrence</li>
                <li>• Enhanced safety through emergency protocols</li>
                <li>• Reduced energy consumption and costs</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};