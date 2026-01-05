import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, AlertCircle } from 'lucide-react';

export const BMSModule7Section3ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Addressing in BMS Networks
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Each protocol has its own addressing rules:
        </p>

        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">BACnet</h4>
            <p className="text-foreground">
              Devices have a Device ID and may also use IP addresses (for BACnet/IP) or node IDs (for BACnet MSTP).
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-300 mb-2">Modbus</h4>
            <p className="text-foreground">
              Devices have numeric addresses (1–247). Each register stores specific data (e.g., temperature = Register 30001).
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-300 mb-2">KNX</h4>
            <p className="text-foreground">
              Devices use physical addresses (Line.Device format, e.g., 1.1.12). Logical group addresses then link devices for control.
            </p>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-semibold mb-1">Key Rule</h4>
              <p className="text-foreground">
                No two devices on the same network segment can share the same address — otherwise, communication conflicts occur.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
          <h4 className="text-cyan-300 font-semibold mb-2">💡 Inline Check</h4>
          <p className="text-foreground font-medium">
            What happens if two devices are given the same Modbus address?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};