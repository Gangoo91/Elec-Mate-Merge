import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Server, Zap } from 'lucide-react';

export const BMSModule5Section5ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Common Gateway Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-foreground">
            Gateways are essential for connecting different building systems. Here are the most common applications you'll encounter as an electrician:
          </p>
          
          <div className="space-y-4">
            {/* Modbus to BACnet */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Server className="h-6 w-6 text-blue-400" />
                <h4 className="font-semibold text-blue-300 text-lg">Modbus to BACnet Gateway</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Application:</strong> Energy meters and power monitoring equipment typically use Modbus RTU or Modbus TCP, 
                  while Building Management Systems prefer BACnet for integration.
                </p>
                <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3">
                  <p className="text-blue-100 text-sm font-medium">Real Example:</p>
                  <p className="text-foreground text-xs mt-1">
                    A shopping centre has 50 Schneider Electric energy meters on Modbus. The Siemens BMS uses BACnet. 
                    A gateway converts the kWh, voltage, and current readings so the BMS can display energy consumption per shop.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                    <p className="text-green-300 font-medium text-xs">Wiring Requirements:</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• RS-485 A/B terminals for Modbus side</li>
                      <li>• Ethernet or MS/TP for BACnet side</li>
                      <li>• 24V DC power supply</li>
                      <li>• Shield connections critical for noise immunity</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 p-3 rounded border border-orange-600/30">
                    <p className="text-orange-300 font-medium text-xs">Configuration:</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• Set Modbus device addresses (1-247)</li>
                      <li>• Configure BACnet device ID</li>
                      <li>• Map register addresses to BACnet objects</li>
                      <li>• Set communication parameters (baud, parity)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* KNX to BACnet */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-6 w-6 text-purple-400" />
                <h4 className="font-semibold text-purple-300 text-lg">KNX to BACnet Gateway</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Application:</strong> KNX lighting and blind controls integrated into larger BMS systems 
                  for unified building management and energy optimisation.
                </p>
                <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-3">
                  <p className="text-purple-100 text-sm font-medium">Real Example:</p>
                  <p className="text-foreground text-xs mt-1">
                    Office building uses KNX for all lighting zones and motorised blinds. The main BMS (BACnet) 
                    needs to monitor lighting status and implement daylight harvesting strategies through the gateway.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                    <p className="text-green-300 font-medium text-xs">Installation Points:</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• Connect to KNX bus via bus connector</li>
                      <li>• Program physical addresses using ETS software</li>
                      <li>• Ethernet connection for BACnet network</li>
                      <li>• DIN-rail mounting in distribution board</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 p-3 rounded border border-orange-600/30">
                    <p className="text-orange-300 font-medium text-xs">Data Points Exposed:</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• Lighting on/off status per zone</li>
                      <li>• Dimming levels (0-100%)</li>
                      <li>• Blind position feedback</li>
                      <li>• Presence detector states</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* DALI Gateway */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                  <span className="text-black text-xs font-bold">D</span>
                </div>
                <h4 className="font-semibold text-yellow-300 text-lg">DALI to KNX/BACnet Gateway</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Application:</strong> Individual LED luminaire control via DALI protocol integrated 
                  into wider building automation systems.
                </p>
                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
                  <p className="text-yellow-100 text-sm font-medium">Real Example:</p>
                  <p className="text-foreground text-xs mt-1">
                    Hospital corridor has 200 DALI LED fittings. Each needs individual control for cleaning modes, 
                    emergency lighting, and patient comfort. Gateway exposes this to the BMS for scheduling and monitoring.
                  </p>
                </div>
                <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                  <p className="text-red-300 font-medium text-xs">⚠️ Important Considerations:</p>
                  <ul className="text-foreground text-xs mt-1 space-y-1">
                    <li>• DALI bus limited to 64 devices per line</li>
                    <li>• Polarity not critical but good practice</li>
                    <li>• Maximum cable length 300m</li>
                    <li>• Gateway provides DALI power supply</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-gray-300 mb-2">Multi-Protocol Controllers</h4>
          <p className="text-foreground text-sm">
            Some advanced gateways support multiple conversions simultaneously. For example, a single device might 
            handle Modbus-to-BACnet, KNX-to-BACnet, and DALI-to-BACnet conversion, reducing panel space and complexity.
          </p>
          <div className="mt-3 p-3 bg-elec-dark rounded border border-elec-yellow/30">
            <p className="text-elec-yellow text-xs font-medium">
              💡 Tip: When specifying multi-protocol gateways, ensure adequate processing power for all connected devices 
              to avoid communication delays during peak data periods.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};