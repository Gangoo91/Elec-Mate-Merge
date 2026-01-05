import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car } from 'lucide-react';

export const EVChargerConfigurationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Car className="h-5 w-5 text-elec-yellow" />
          EV Charger Configuration & Modes
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-elec-yellow text-elec-dark">BS 7671 Section 722</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Electric vehicle charging modes define different methods of connection between the vehicle and the supply, each with specific power levels, safety systems, and installation requirements.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-blue-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-300">Mode 1 Charging</h4>
              <Badge className="bg-blue-600 text-foreground">Up to 2.3kW (10A)</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Connection Method:</h5>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Standard household socket outlet (BS 1363)</li>
                  <li>• No dedicated EVSE (Electric Vehicle Supply Equipment)</li>
                  <li>• Simple cable connection to vehicle</li>
                  <li>• Manual plug-in operation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Safety & Limitations:</h5>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Vehicle-only protection systems</li>
                  <li>• Extended charging times (6-12 hours)</li>
                  <li>• Socket outlet thermal stress concerns</li>
                  <li>• Limited to occasional use only</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-green-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-300">Mode 2 Charging</h4>
              <Badge className="bg-green-600 text-foreground">Up to 7.4kW (32A)</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Connection Method:</h5>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• Portable EVSE with in-cable control box</li>
                  <li>• Standard socket outlet or dedicated connection</li>
                  <li>• Pilot wire communication system</li>
                  <li>• RCD protection in portable unit</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Safety Features:</h5>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• In-cable RCD and control electronics</li>
                  <li>• Temperature monitoring capability</li>
                  <li>• Proximity detection systems</li>
                  <li>• Charging time: typically 3-8 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-orange-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-orange-300">Mode 3 Charging</h4>
              <Badge className="bg-orange-600 text-foreground">Up to 43kW (63A)</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Connection Method:</h5>
                <ul className="text-orange-100 text-sm space-y-1">
                  <li>• Dedicated charging station with fixed cable</li>
                  <li>• Integrated safety and control systems</li>
                  <li>• Smart communication capabilities</li>
                  <li>• Professional installation required</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Advanced Features:</h5>
                <ul className="text-orange-100 text-sm space-y-1">
                  <li>• Load management and scheduling</li>
                  <li>• Energy monitoring and billing</li>
                  <li>• Remote monitoring capabilities</li>
                  <li>• Charging time: typically 1-4 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-red-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-red-300">Mode 4 Charging (DC Fast)</h4>
              <Badge className="bg-red-600 text-foreground">50kW+ DC Rapid</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Connection Method:</h5>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• DC rapid charging with built-in converter</li>
                  <li>• High-voltage DC supply to vehicle battery</li>
                  <li>• Advanced cooling and monitoring systems</li>
                  <li>• Commercial/public installation typical</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Technical Requirements:</h5>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• Three-phase supply typically required</li>
                  <li>• Sophisticated protection systems</li>
                  <li>• Grid connection impact assessment</li>
                  <li>• Charging time: typically 20-60 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h5 className="text-yellow-200 font-semibold mb-3">Installation Planning Considerations</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-medium text-foreground mb-2">Electrical Infrastructure</h6>
              <ul className="text-yellow-100 text-sm space-y-1">
                <li>• Available supply capacity and load calculations</li>
                <li>• Cable sizing for continuous high-current loads</li>
                <li>• Protection coordination with existing installation</li>
                <li>• Earthing system compatibility assessment</li>
                <li>• Future expansion capability planning</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Smart Integration Features</h6>
              <ul className="text-yellow-100 text-sm space-y-1">
                <li>• Load management and demand response</li>
                <li>• Integration with renewable energy sources</li>
                <li>• Time-of-use charging optimisation</li>
                <li>• Grid balancing service participation</li>
                <li>• Vehicle-to-grid (V2G) capability preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};