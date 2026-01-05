import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Thermometer, Monitor, Router } from 'lucide-react';

export const BMSModule5Section2ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cpu className="h-5 w-5 text-elec-yellow" />
          BACnet Device Types
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          BACnet defines devices by their role within the network. Understanding these device types helps 
          electricians plan cable runs and ensure proper power supply to each device category.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Cpu className="h-4 w-4 text-elec-yellow" />
                Controllers
              </h4>
              <p className="text-foreground text-sm">
                Local devices that directly control equipment (e.g., AHU controllers, VAV controllers). 
                These are the "brains" of local systems.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-elec-yellow" />
                Sensors & Actuators
              </h4>
              <p className="text-foreground text-sm">
                Input/output devices like temperature sensors, CO₂ detectors, and damper motors. 
                Often powered by 24V DC.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Monitor className="h-4 w-4 text-elec-yellow" />
                Operator Workstations (OWS)
              </h4>
              <p className="text-foreground text-sm">
                Software interfaces that let facility managers monitor and control the system. 
                Usually connected via BACnet/IP.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-3">
              <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
                <Router className="h-4 w-4 text-elec-yellow" />
                Routers & Gateways
              </h4>
              <p className="text-foreground text-sm">
                Link different BACnet networks together or connect BACnet to other protocols 
                (e.g., Modbus). Critical for system integration.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Example</h4>
          <p className="text-foreground text-sm">
            A VAV box may have a BACnet controller that talks to the central BMS workstation, 
            adjusting damper position based on occupancy and temperature readings from connected sensors.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};