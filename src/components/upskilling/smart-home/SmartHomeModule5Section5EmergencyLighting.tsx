import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section5EmergencyLighting = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          3. Emergency Lighting and Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
          <h4 className="text-foreground font-semibold mb-3">Life Safety Lighting Systems</h4>
          <p className="text-sm mb-3">
            Smart lighting can be programmed for emergencies — e.g., flashing lights during a fire 
            alarm to alert occupants and guide evacuation. Lights can automatically guide occupants 
            to exits using sequential activation patterns that create clear pathway indication even 
            in smoke-filled conditions.
          </p>
          <p className="text-sm">
            In some systems, smart bulbs turn red or pulse to alert occupants of danger, while 
            emergency exit lighting activates to maximum brightness and switches to battery backup 
            power during power failures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Emergency Response Scenarios</h4>
            <div className="space-y-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Fire Emergency Response</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• All lights flash red to indicate danger</li>
                  <li>• Sequential pathway lighting to nearest exit</li>
                  <li>• Bedroom lights at maximum brightness</li>
                  <li>• Stairwell emergency illumination activation</li>
                </ul>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Medical Emergency</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Full bright white lighting throughout home</li>
                  <li>• Pathway illumination to main entrance</li>
                  <li>• Exterior porch lights for emergency services</li>
                  <li>• Bathroom lighting for medical assistance</li>
                </ul>
              </div>
              <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Power Outage Response</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Battery backup lighting activation</li>
                  <li>• Essential areas prioritised (stairs, exits)</li>
                  <li>• Low-power emergency mode operation</li>
                  <li>• Generator integration for extended outages</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Evacuation Guidance Systems</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">Pathway Illumination</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Sequential lighting from bedrooms to exits</li>
                  <li>• Stairway step-by-step illumination</li>
                  <li>• Hallway guidance with directional cues</li>
                  <li>• Multiple exit route programming</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-blue-400 font-semibold text-sm mb-1">Visual Alert Systems</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Colour-coded emergency identification</li>
                  <li>• Strobe lighting for hearing impaired</li>
                  <li>• Brightness variations for different threats</li>
                  <li>• Integration with smoke detector alerts</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-purple-400 font-semibold text-sm mb-1">Smart Response Features</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Automatic exit route calculation</li>
                  <li>• Blocked path detection and rerouting</li>
                  <li>• Occupancy-based guidance customisation</li>
                  <li>• Integration with emergency services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Emergency Lighting Standards and Compliance</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">BS 5266 Requirements:</p>
              <ul className="text-xs space-y-1">
                <li>• Minimum illumination levels for escape routes</li>
                <li>• Battery backup duration requirements</li>
                <li>• Testing and maintenance schedules</li>
                <li>• Installation certification standards</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Smart System Integration:</p>
              <ul className="text-xs space-y-1">
                <li>• Traditional emergency lighting compliance</li>
                <li>• Smart enhancement overlay systems</li>
                <li>• Dual-mode operation capabilities</li>
                <li>• Override and manual control provisions</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Testing and Verification:</p>
              <ul className="text-xs space-y-1">
                <li>• Monthly function testing protocols</li>
                <li>• Annual duration testing procedures</li>
                <li>• Smart system integration verification</li>
                <li>• Documentation and record keeping</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-blue-400 font-semibold mb-3">Advanced Emergency Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Intelligent Evacuation:</p>
              <ul className="text-xs space-y-1">
                <li>• Real-time hazard assessment integration</li>
                <li>• Dynamic route calculation based on conditions</li>
                <li>• Crowd management and flow optimisation</li>
                <li>• Emergency services coordination protocols</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Communication Integration:</p>
              <ul className="text-xs space-y-1">
                <li>• Voice announcement coordination</li>
                <li>• Mobile alert synchronisation</li>
                <li>• Neighbour notification systems</li>
                <li>• Emergency service automatic contact</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};