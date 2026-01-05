import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Zap, Globe, Shield } from 'lucide-react';

export const BMSModule5Section3ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          Modbus TCP/IP
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Modbus TCP/IP encapsulates Modbus data within standard Ethernet frames, allowing it to run over 
          IP networks. This provides significant advantages in speed, scalability, and integration with 
          existing IT infrastructure.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-elec-yellow" />
              Network Infrastructure
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Runs over Ethernet (Cat5e/6) cabling</p>
              <p className="text-foreground">• Each device has an IP address</p>
              <p className="text-foreground">• Uses standard TCP/IP port 502</p>
              <p className="text-foreground">• Can leverage existing IT network infrastructure</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Performance Advantages
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Much faster than RTU (100 Mbps vs 115 kbps)</p>
              <p className="text-foreground">• Supports many more devices than RTU</p>
              <p className="text-foreground">• Simultaneous connections possible</p>
              <p className="text-foreground">• Better suited for real-time applications</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              IT Integration Considerations
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• Requires coordination with IT departments</p>
              <p className="text-foreground">• IP address management and VLAN setup</p>
              <p className="text-foreground">• Network security and firewall configuration</p>
              <p className="text-foreground">• Potential conflicts with corporate network policies</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Practical Example</h4>
          <p className="text-foreground text-sm">
            A modern chiller communicates over Modbus TCP/IP, providing detailed operating data 
            (temperatures, pressures, alarms, energy consumption) directly to the BMS without the 
            speed and distance limitations of RS-485 serial communication.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">When to Use TCP/IP vs RTU</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Use TCP/IP for:</p>
              <p className="text-foreground">• High-speed data requirements</p>
              <p className="text-foreground">• Large numbers of devices</p>
              <p className="text-foreground">• Integration with IT systems</p>
              <p className="text-foreground">• Remote monitoring capabilities</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-blue-400">Use RTU for:</p>
              <p className="text-foreground">• Simple meter reading</p>
              <p className="text-foreground">• Cost-sensitive applications</p>
              <p className="text-foreground">• Standalone BMS networks</p>
              <p className="text-foreground">• Harsh industrial environments</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Security Considerations for TCP/IP</h4>
          <div className="space-y-2 text-sm">
            <p className="text-foreground">• Modbus TCP has no built-in security features</p>
            <p className="text-foreground">• Use VLANs to segregate BMS traffic from corporate networks</p>
            <p className="text-foreground">• Consider VPN connections for remote access</p>
            <p className="text-foreground">• Implement firewall rules to restrict access</p>
            <p className="text-foreground">• Monitor network traffic for unauthorised access attempts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};