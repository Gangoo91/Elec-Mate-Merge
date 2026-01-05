import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, AlertTriangle, Cable, Layers } from 'lucide-react';

export const BMSModule5Section6ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Network Planning Basics
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Network planning ensures that all devices can communicate efficiently. Poorly planned networks result in data clashes, long delays, or complete loss of control. Understanding the technical limits and requirements is essential for reliable system design.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-4">Understanding Device Limits</h3>
        
        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-yellow-300 text-lg mb-4">Why Device Limits Matter</h4>
          <p className="text-gray-300 mb-4">
            Each communication protocol has physical and electrical limitations that determine how many devices can reliably communicate on a single network segment. These limits are based on several factors:
          </p>
          <ul className="text-gray-300 space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Electrical loading:</strong> Each device adds capacitance and resistance to the network</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Token passing time:</strong> More devices = longer time for each to communicate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Address space:</strong> Limited number of unique addresses available</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span><strong>Collision domain:</strong> More devices increase chance of data conflicts</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Modbus RTU Details */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-blue-300 text-lg">Modbus RTU Specifications</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">Device Limit: 32 devices maximum</p>
                <ul className="text-sm text-blue-100 mt-2 space-y-1">
                  <li>• Address range: 1-247 (but electrical limit is 32)</li>
                  <li>• Master-slave architecture</li>
                  <li>• Half-duplex communication</li>
                  <li>• Typical response time: 10-50ms per device</li>
                </ul>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">Practical Considerations:</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Keep to 24 devices for reliable operation</li>
                  <li>• Each device poll adds ~30ms to cycle time</li>
                  <li>• Use repeaters beyond 32 devices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* BACnet MSTP Details */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <Network className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">BACnet MSTP Specifications</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">Device Limit: 127 devices maximum</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Address range: 0-127</li>
                  <li>• Token-passing protocol</li>
                  <li>• Full-duplex capable on RS-485</li>
                  <li>• Typical response time: 5-20ms per device</li>
                </ul>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Practical Considerations:</p>
                <ul className="text-sm text-yellow-100 mt-2 space-y-1">
                  <li>• Best performance with 50-75 devices</li>
                  <li>• Token rotation time increases with devices</li>
                  <li>• Segment at 100 devices for optimal performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Cable Length Calculations</h3>
        
        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600 mb-6">
          <h4 className="font-semibold text-orange-300 text-lg mb-4">RS-485 Cable Length Formula</h4>
          <p className="text-gray-300 mb-4">
            The maximum cable length for RS-485 depends on baud rate and cable quality. Use this formula for planning:
          </p>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4 mb-4">
            <p className="font-mono text-orange-200 text-lg">Max Length = 120,000 ÷ Baud Rate (metres)</p>
            <p className="text-sm text-orange-100 mt-2">This assumes standard 24 AWG twisted pair cable</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="font-medium text-red-200">9600 baud</p>
              <p className="text-sm text-red-100">Maximum: 1200m</p>
              <p className="text-xs text-red-100">Most common BMS rate</p>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <p className="font-medium text-yellow-200">19200 baud</p>
              <p className="text-sm text-yellow-100">Maximum: 600m</p>
              <p className="text-xs text-yellow-100">Faster but shorter range</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <p className="font-medium text-blue-200">38400 baud</p>
              <p className="text-sm text-blue-100">Maximum: 300m</p>
              <p className="text-xs text-blue-100">High speed applications</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Network Topology Rules</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* RS-485 Topology */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h4 className="font-semibold text-red-300 text-lg">RS-485 Daisy Chain Rules</h4>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                RS-485 networks must maintain 120Ω characteristic impedance throughout the cable run. Any branches or stubs create impedance mismatches.
              </p>
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="font-medium text-red-200">Critical Requirements:</p>
                <ul className="text-sm text-red-100 mt-2 space-y-1">
                  <li>• Single continuous cable from first to last device</li>
                  <li>• 120Ω termination resistors at both ends only</li>
                  <li>• No stubs longer than 300mm</li>
                  <li>• Maximum 3 devices at any stub point</li>
                  <li>• Twisted pair cable throughout</li>
                </ul>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Common Mistakes:</p>
                <ul className="text-sm text-yellow-100 mt-2 space-y-1">
                  <li>• Star wiring (causes reflections)</li>
                  <li>• Multiple terminations</li>
                  <li>• Long stubs to individual devices</li>
                  <li>• Mixing cable types</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ethernet Topology */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-3">
              <Network className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">Ethernet Network Rules</h4>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Ethernet networks use packet switching and can handle more complex topologies through managed switches.
              </p>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">Design Options:</p>
                <ul className="text-sm text-green-100 mt-2 space-y-1">
                  <li>• Star topology with central switch</li>
                  <li>• Hierarchical switching tree</li>
                  <li>• Ring topology with managed switches</li>
                  <li>• Redundant paths for fault tolerance</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">Cable Specifications:</p>
                <ul className="text-sm text-blue-100 mt-2 space-y-1">
                  <li>• Cat5e minimum for 100Mbps</li>
                  <li>• Cat6 recommended for future-proofing</li>
                  <li>• Maximum 100m between switch and device</li>
                  <li>• No termination resistors required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4">Practical Planning Example</h3>
        
        <div className="bg-elec-dark p-6 rounded-lg border border-gray-600">
          <h4 className="font-semibold text-blue-300 text-lg mb-4">Office Building HVAC Network Design</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-blue-200 mb-2">Building Requirements:</p>
              <ul className="text-sm text-blue-100 space-y-1 mb-4">
                <li>• 5-storey office building</li>
                <li>• 40 AHUs with VAV controllers</li>
                <li>• 120 VAV boxes with damper actuators</li>
                <li>• 25 fan coil units</li>
                <li>• Central plant with 15 devices</li>
                <li>• Total: 200 BACnet devices</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-green-200 mb-2">Network Solution:</p>
              <ul className="text-sm text-green-100 space-y-1 mb-4">
                <li>• Segment 1: Central plant (15 devices)</li>
                <li>• Segment 2: AHUs floors 1-2 (16 devices)</li>
                <li>• Segment 3: AHUs floors 3-5 (24 devices)</li>
                <li>• Segment 4: VAV boxes floors 1-3 (75 devices)</li>
                <li>• Segment 5: VAV boxes floors 4-5 (45 devices)</li>
                <li>• Segment 6: Fan coils all floors (25 devices)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
            <p className="font-medium text-green-200">Result:</p>
            <p className="text-sm text-green-100">6 segments, maximum 75 devices per segment, well within BACnet MSTP limits. Each segment connects via BACnet/IP router to central supervisory system.</p>
          </div>
        </div>

        <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
          <p className="text-yellow-100 font-medium">
            <strong>Installation Tip:</strong> Always check protocol specifications before installation. Exceeding device limits or cable lengths will cause communication failures that are difficult to diagnose later.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};