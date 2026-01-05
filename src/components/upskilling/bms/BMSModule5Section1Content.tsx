import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Unlock, Network, Settings } from 'lucide-react';

export const BMSModule5Section1Content = () => {
  return (
    <div className="space-y-6">
      {/* What Are Communication Protocols */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            What Are Communication Protocols?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            A protocol is like a language that devices use to exchange information. Without a shared protocol, 
            devices cannot understand each other.
          </p>
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Analogy</h4>
            <p className="text-sm text-gray-300">
              Think of HVAC equipment speaking "BACnet," while lighting speaks "DALI." The BMS acts as the 
              interpreter so both can communicate.
            </p>
          </div>
          <p>
            Protocols define message structure, addressing, and how data is transmitted across networks.
          </p>
        </CardContent>
      </Card>

      {/* Open vs Proprietary Protocols */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Unlock className="h-5 w-5 text-elec-yellow" />
            Open vs Proprietary Protocols
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">Open Protocols</h4>
              <ul className="text-sm space-y-1">
                <li>• Standardised (BACnet, Modbus, KNX)</li>
                <li>• Multi-manufacturer support</li>
                <li>• Promotes interoperability</li>
                <li>• Future-proofing</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">Proprietary Protocols</h4>
              <ul className="text-sm space-y-1">
                <li>• Single manufacturer owned</li>
                <li>• Vendor lock-in risk</li>
                <li>• Limited integration options</li>
                <li>• Difficult upgrades</li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Example</h4>
            <p className="text-sm text-gray-300">
              A chiller using Modbus can be integrated into any Modbus-compatible BMS. But a chiller with a 
              proprietary protocol may only work with its manufacturer's control system.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Common BMS Protocols */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Network className="h-5 w-5 text-elec-yellow" />
            Common BMS Protocols
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">BACnet</h4>
              <p className="text-sm text-gray-300 mb-2">Building Automation and Control Network</p>
              <ul className="text-xs space-y-1">
                <li>• HVAC, lighting, access control</li>
                <li>• Large network support</li>
                <li>• Detailed device communication</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">Modbus</h4>
              <p className="text-sm text-gray-300 mb-2">Simple and robust protocol</p>
              <ul className="text-xs space-y-1">
                <li>• Meters, boilers, chillers</li>
                <li>• RTU (serial) and TCP/IP versions</li>
                <li>• Widely supported</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-foreground font-semibold mb-2">KNX</h4>
              <p className="text-sm text-gray-300 mb-2">Popular in European buildings</p>
              <ul className="text-xs space-y-1">
                <li>• Lighting, blinds, room control</li>
                <li>• Twisted-pair or IP networks</li>
                <li>• Standardised worldwide</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-400 italic">
            These protocols form the backbone of most modern BMS installations.
          </p>
        </CardContent>
      </Card>

      {/* Why Protocols Matter for Electricians */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Why Protocols Matter for Electricians
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>
            Even though configuration is usually handled by BMS engineers, electricians must:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <span className="font-medium text-foreground">Wire communication buses correctly</span>
              </div>
              <p className="text-sm text-gray-400 ml-4">Twisted pair, RS-485, Ethernet, etc.</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <span className="font-medium text-foreground">Maintain polarity and shielding</span>
              </div>
              <p className="text-sm text-gray-400 ml-4">For serial communications</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <span className="font-medium text-foreground">Avoid interference</span>
              </div>
              <p className="text-sm text-gray-400 ml-4">Cable runs and length limits</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                <span className="font-medium text-foreground">Ensure proper termination</span>
              </div>
              <p className="text-sm text-gray-400 ml-4">Prevent communication errors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};