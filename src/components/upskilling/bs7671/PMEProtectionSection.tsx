import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export const PMEProtectionSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          PME and PEN Conductor Protection
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-red-600 text-foreground">Regulation 722.411.4.1</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Protective Multiple Earthing (PME) systems present unique challenges for EV charging installations due to the risk of PEN conductor failure and the potential for exported voltages to vehicle chassis and connected metalwork.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow">PEN Conductor Risks</h4>
            
            <div className="bg-elec-dark p-4 rounded border border-red-600">
              <h5 className="font-medium text-red-300 mb-3">Failure Scenarios</h5>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Upstream PEN conductor breakage or high resistance joint</li>
                <li>• Voltage rise on exposed conductive parts</li>
                <li>• Current flow through earth path and vehicle chassis</li>
                <li>• Potential shock hazard to vehicle occupants</li>
                <li>• Risk of fire from overheating conductors</li>
                <li>• Equipment damage from sustained overvoltage</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded border border-orange-600">
              <h5 className="font-medium text-orange-300 mb-3">Risk Factors</h5>
              <ul className="text-orange-100 text-sm space-y-1">
                <li>• High charging currents increase risk severity</li>
                <li>• Extended charging periods increase exposure time</li>
                <li>• Outdoor installations subject to weather effects</li>
                <li>• Multiple earth connections through vehicle</li>
                <li>• Public accessibility increasing touch potential</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow">Protection Methods</h4>
            
            <div className="bg-elec-dark p-4 rounded border border-green-600">
              <h5 className="font-medium text-green-300 mb-3">Additional Earth Electrode</h5>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Install electrode local to EV charging point</li>
                <li>• Minimum resistance value: typically ≤20Ω</li>
                <li>• Connect to main earthing terminal via separate conductor</li>
                <li>• Label as "Safety Electrical Connection - Do Not Remove"</li>
                <li>• Regular testing and maintenance required</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded border border-blue-600">
              <h5 className="font-medium text-blue-300 mb-3">PEN Fault Detection</h5>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Voltage monitoring between neutral and earth</li>
                <li>• Automatic isolation on fault detection</li>
                <li>• Trip threshold typically 70V for &gt;5 seconds</li>
                <li>• Manual reset required after fault clearance</li>
                <li>• Status indication for maintenance purposes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h5 className="text-blue-200 font-semibold mb-3">Enhanced Protective Bonding</h5>
          <p className="text-blue-100 text-sm mb-3">
            EV charging installations may require enhanced main protective bonding to reduce touch voltages during PEN faults:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-medium text-foreground mb-2">Bonding Requirements</h6>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• All extraneous conductive parts within 2m of charging point</li>
                <li>• Metal water/gas pipes, structural steelwork</li>
                <li>• Minimum conductor size: 6mm² copper equivalent</li>
                <li>• Secure mechanical and electrical connections</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Special Considerations</h6>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Vehicle charging cable may introduce earth path</li>
                <li>• Consider metalwork in garage/carport structures</li>
                <li>• Coordinate with building lightning protection</li>
                <li>• Document all bonding arrangements clearly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h5 className="text-green-200 font-semibold mb-3">TN-S System Advantages</h5>
          <p className="text-green-100 text-sm mb-3">
            Where possible, TN-S earthing systems are preferred for EV charging installations:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h6 className="font-medium text-foreground mb-2">Safety Benefits</h6>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• No PEN conductor risks</li>
                <li>• Better fault current capability</li>
                <li>• Reduced earth impedance</li>
                <li>• Enhanced protection reliability</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Performance Benefits</h6>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Better electromagnetic compatibility</li>
                <li>• Reduced voltage disturbances</li>
                <li>• Suitable for all charging modes</li>
                <li>• Future-proofed for technology advances</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Installation Benefits</h6>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Simplified protection arrangements</li>
                <li>• No additional earth electrode required</li>
                <li>• Standard RCD protection adequate</li>
                <li>• Reduced ongoing maintenance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h5 className="text-red-200 font-semibold mb-3">Testing and Verification Requirements</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-medium text-foreground mb-2">Initial Verification</h6>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Earth electrode resistance measurement</li>
                <li>• PEN fault protection device testing</li>
                <li>• Main protective bonding verification</li>
                <li>• RCD operation and sensitivity testing</li>
                <li>• Earth fault loop impedance measurement</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Periodic Inspection</h6>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Annual earth electrode resistance checks</li>
                <li>• Six-monthly RCD testing recommended</li>
                <li>• Visual inspection of all protective bonding</li>
                <li>• PEN fault device function verification</li>
                <li>• Documentation of all test results</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};