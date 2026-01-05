import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, AlertCircle, Wifi, Share2, Router } from 'lucide-react';

export const BMSModule7Section1ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Network Topology
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">What is Network Topology?</h4>
          <p className="text-foreground mb-4">
            Network topology defines how BMS devices are connected to share data. The chosen topology affects system 
            reliability, cable requirements, device addressing, and troubleshooting methods. Understanding topology 
            is essential for successful BMS network design and installation.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Types of Network Topology</h4>
          <p className="text-foreground mb-4">
            Different BMS protocols use different network topologies, each with specific advantages, limitations, 
            and installation requirements. Understanding these helps in selecting the right approach for each project.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Bus Topology
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2"><strong>Common for:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• RS-485 Modbus networks</li>
                  <li>• BACnet MSTP (Master-Slave/Token-Passing)</li>
                  <li>• KNX/EIB installations</li>
                </ul>
                <p className="text-foreground mt-2"><strong>Characteristics:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Devices connected in series</li>
                  <li>• Requires termination resistors</li>
                  <li>• Shared communication medium</li>
                  <li>• Lower cable costs</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Star Topology
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2"><strong>Common for:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• BACnet/IP networks</li>
                  <li>• Ethernet-based systems</li>
                  <li>• Modern IP controllers</li>
                </ul>
                <p className="text-foreground mt-2"><strong>Characteristics:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Devices connect to central switch</li>
                  <li>• Higher reliability</li>
                  <li>• Easy fault isolation</li>
                  <li>• Higher cable costs</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Router className="h-4 w-4" />
                Tree/Hybrid
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground mb-2"><strong>Used in:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• KNX installations</li>
                  <li>• Large BACnet networks</li>
                  <li>• Multi-protocol systems</li>
                </ul>
                <p className="text-foreground mt-2"><strong>Features:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• Combines bus and star elements</li>
                  <li>• Hierarchical structure</li>
                  <li>• Scalable architecture</li>
                  <li>• Complex addressing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Network Limitations and Considerations</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 px-3 text-elec-yellow">Protocol</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Topology</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Max Devices</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Max Distance</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Termination</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">Modbus RTU</td>
                  <td className="py-2 px-3">Bus (RS-485)</td>
                  <td className="py-2 px-3">32 per segment</td>
                  <td className="py-2 px-3">1200m</td>
                  <td className="py-2 px-3">120Ω resistors</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">BACnet MSTP</td>
                  <td className="py-2 px-3">Bus (RS-485)</td>
                  <td className="py-2 px-3">127 per segment</td>
                  <td className="py-2 px-3">1200m</td>
                  <td className="py-2 px-3">120Ω resistors</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">BACnet/IP</td>
                  <td className="py-2 px-3">Star (Ethernet)</td>
                  <td className="py-2 px-3">Virtually unlimited</td>
                  <td className="py-2 px-3">100m per segment</td>
                  <td className="py-2 px-3">Not required</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">KNX/EIB</td>
                  <td className="py-2 px-3">Tree/Bus hybrid</td>
                  <td className="py-2 px-3">64 per line</td>
                  <td className="py-2 px-3">1000m</td>
                  <td className="py-2 px-3">Not required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Installation Considerations</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Planning Phase</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Segment limits:</strong> Plan device distribution to avoid overloading networks</li>
                <li>• <strong>Cable routing:</strong> Keep communications cables segregated from power</li>
                <li>• <strong>Future expansion:</strong> Allow spare capacity on each segment</li>
                <li>• <strong>Redundancy:</strong> Consider backup routes for critical devices</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Installation Best Practices</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Device addressing:</strong> Label every device with its network address during installation</li>
                <li>• <strong>Cable quality:</strong> Use specified cable types (e.g., Cat5e for Ethernet, screened twisted pair for RS-485)</li>
                <li>• <strong>Terminations:</strong> Install and test termination resistors where required</li>
                <li>• <strong>Testing:</strong> Verify network integrity before commissioning software</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 Which topology is typically used for BACnet/IP networks?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Star topology is typically used for BACnet/IP networks because they run over 
                Ethernet infrastructure, where devices connect back to a central switch or router. This provides better 
                reliability and easier fault isolation compared to bus topologies.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};