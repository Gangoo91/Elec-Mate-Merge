import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Wifi, Link, Database } from 'lucide-react';

export const ProtocolDetailsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Code className="h-5 w-5 text-elec-yellow" />
          BMS Protocol Deep Dive
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Understanding communication protocols is crucial for successful BMS integration. Each protocol 
          has specific strengths and typical applications in building automation systems.
        </p>
        
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-foreground">BACnet</h4>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">HVAC Primary</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Purpose:</strong> Building Automation and Control Networks</p>
                <p><strong>Best for:</strong> HVAC systems, energy management</p>
                <p><strong>Range:</strong> Building-wide networks</p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Key Features:</p>
                  <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                    <li>Standardised object types (AI, AO, BI, BO)</li>
                    <li>Self-describing devices</li>
                    <li>Multiple transport layers (IP, MS/TP, Ethernet)</li>
                    <li>Trending and alarm capabilities</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-green-400" />
                <h4 className="font-semibold text-foreground">Modbus</h4>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Industrial</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Purpose:</strong> Industrial communication protocol</p>
                <p><strong>Best for:</strong> Simple device integration, legacy systems</p>
                <p><strong>Range:</strong> Device level to system level</p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Key Features:</p>
                  <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                    <li>Simple master-slave architecture</li>
                    <li>Wide device compatibility</li>
                    <li>RS485 and Ethernet variants</li>
                    <li>Minimal overhead</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold text-foreground">KNX</h4>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Integrated</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Purpose:</strong> Home and building automation</p>
                <p><strong>Best for:</strong> Lighting, blinds, HVAC integration</p>
                <p><strong>Range:</strong> Room to building level</p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Key Features:</p>
                  <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                    <li>Decentralised intelligence</li>
                    <li>Twisted pair or wireless</li>
                    <li>Interoperability certification</li>
                    <li>Scene and logic control</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Link className="h-5 w-5 text-yellow-400" />
                <h4 className="font-semibold text-foreground">DALI</h4>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Lighting</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Purpose:</strong> Digital Addressable Lighting Interface</p>
                <p><strong>Best for:</strong> LED lighting control and dimming</p>
                <p><strong>Range:</strong> Lighting circuits and zones</p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Key Features:</p>
                  <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                    <li>Individual fixture addressing</li>
                    <li>Bidirectional communication</li>
                    <li>Status feedback and diagnostics</li>
                    <li>Group and scene control</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Protocol Integration Strategies</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Gateway Approach</h5>
              <p className="mb-2">Use protocol gateways to connect different systems:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>BACnet-to-DALI gateway for lighting integration</li>
                <li>Modbus-to-BACnet converter for legacy equipment</li>
                <li>KNX-to-IP gateway for network integration</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Native Integration</h5>
              <p className="mb-2">Modern BMS platforms support multiple protocols:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Multi-protocol controllers reduce gateway needs</li>
                <li>Software-based protocol conversion</li>
                <li>Cloud-based integration platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};