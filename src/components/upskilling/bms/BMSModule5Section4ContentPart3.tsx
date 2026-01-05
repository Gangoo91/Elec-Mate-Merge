import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Lightbulb, Thermometer, Eye, Link } from 'lucide-react';

export const BMSModule5Section4ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cpu className="h-5 w-5 text-elec-yellow" />
          KNX Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          KNX devices fall into several categories, each serving specific functions in the building automation system. 
          Understanding device types and their applications is essential for proper system design and installation.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-elec-yellow" />
                Sensors (Input Devices)
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">Common Types:</p>
                <p className="text-foreground">• Wall switches and push buttons</p>
                <p className="text-foreground">• PIR occupancy detectors</p>
                <p className="text-foreground">• Light level sensors</p>
                <p className="text-foreground">• Temperature and humidity sensors</p>
                <p className="text-foreground">• Window/door contact sensors</p>
                <p className="text-foreground">• Weather stations</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-elec-yellow" />
                Actuators (Output Devices)
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">Lighting Control:</p>
                <p className="text-foreground">• Switch actuators (on/off control)</p>
                <p className="text-foreground">• Dimming actuators (0-10V, DALI, phase control)</p>
                <p className="text-foreground">• LED drivers with KNX interface</p>
                
                <p className="text-foreground font-medium mt-2">Motor Control:</p>
                <p className="text-foreground">• Blind/shutter actuators</p>
                <p className="text-foreground">• Valve actuators for heating/cooling</p>
                <p className="text-foreground">• Fan speed controllers</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Link className="h-4 w-4 text-elec-yellow" />
                System Devices
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">Couplers:</p>
                <p className="text-foreground">• Line couplers (connect lines within areas)</p>
                <p className="text-foreground">• Area couplers (connect areas to backbone)</p>
                <p className="text-foreground">• Media couplers (TP to IP conversion)</p>
                
                <p className="text-foreground font-medium mt-2">Power Supplies:</p>
                <p className="text-foreground">• 160mA, 320mA, 640mA capacities</p>
                <p className="text-foreground">• Integrated choke for interference suppression</p>
                <p className="text-foreground">• Additional power supplies for large lines</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-elec-yellow" />
                Specialised Devices
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">Gateways:</p>
                <p className="text-foreground">• KNX to BACnet gateways</p>
                <p className="text-foreground">• KNX to Modbus gateways</p>
                <p className="text-foreground">• KNX to DALI gateways</p>
                
                <p className="text-foreground font-medium mt-2">Interface Devices:</p>
                <p className="text-foreground">• USB programming interfaces</p>
                <p className="text-foreground">• IP routers for remote access</p>
                <p className="text-foreground">• Visualisation servers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Practical Device Example</h4>
          <p className="text-foreground text-sm">
            A KNX PIR sensor detects occupancy and sends a telegram to group address 1/2/3. 
            Both the lighting actuator and HVAC controller are programmed to listen to this address. 
            When occupancy is detected, lights turn on automatically and the temperature setpoint adjusts, 
            all without requiring a central controller.
          </p>
        </div>

        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Device Current Consumption</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Low Current (2-10mA):</p>
              <p className="text-foreground">Push buttons, binary inputs, simple sensors</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-yellow-400">Medium Current (10-20mA):</p>
              <p className="text-foreground">Switch actuators, dimmer actuators, room controllers</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-red-400">High Current (20mA+):</p>
              <p className="text-foreground">Couplers, gateways, complex multi-channel actuators</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};