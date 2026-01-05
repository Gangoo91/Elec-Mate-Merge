import { Card, CardContent } from '@/components/ui/card';
import { Network, Globe, Zap } from 'lucide-react';

export const BMSModule5Section4Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardContent className="p-6">
        <div className="space-y-4 text-foreground">
          <div className="flex items-start gap-4">
            <Network className="h-8 w-8 text-elec-yellow mt-1 flex-shrink-0" />
            <div className="space-y-3">
              <p className="text-lg">
                KNX is an international standard (ISO/IEC 14543) for home and building automation, widely used across 
                Europe and increasingly worldwide. Unlike BACnet and Modbus, which originated in industrial systems, 
                KNX was designed from the start for building functions such as lighting, blinds, HVAC room control, and sensors.
              </p>
              <p>
                For electricians, KNX means understanding the bus topology, device addressing, and power requirements. 
                Even though programming is done by specialists, correct wiring and device installation are essential for 
                a stable KNX network.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-elec-yellow" />
                <h4 className="text-foreground font-semibold">International Standard</h4>
              </div>
              <p className="text-foreground text-sm">
                ISO/IEC 14543 standard ensures global compatibility and interoperability between different manufacturers' devices.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                <h4 className="text-foreground font-semibold">Building-Focused Design</h4>
              </div>
              <p className="text-foreground text-sm">
                Purpose-built for building automation functions rather than adapted from industrial protocols.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};