import { Star, Circle, Square, Zap, Shield, TrendingUp, Network, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TopologiesContent = () => {
  return (
    <div className="space-y-6">
      {/* Simple Explanation */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Network className="h-5 w-5 text-elec-yellow" />
            What is Network Topology?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed text-lg">
            Think of network topology as the "shape" or "pattern" of how computers and devices are connected together.
          </p>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Simple Analogy</h4>
            <p className="text-gray-300 leading-relaxed">
              Imagine connecting several houses in a neighbourhood:
            </p>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>• <strong>Star:</strong> All houses connect to a central town hall</li>
              <li>• <strong>Bus:</strong> All houses connect to one main road</li>
              <li>• <strong>Ring:</strong> Houses connect in a circle, each to their neighbours</li>
              <li>• <strong>Mesh:</strong> Every house connects directly to every other house</li>
            </ul>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Why Does This Matter?</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              The way devices are connected affects how fast data travels, what happens when something breaks, 
              how much it costs to build, and how easy it is to add new devices. Different shapes work better 
              for different situations.
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Star Topology */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Star className="h-5 w-5 text-elec-yellow" />
            Star Topology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            In a star topology, all devices connect to a central hub or switch. This is the most 
            common topology in modern LANs and forms the backbone of structured cabling systems.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Advantages
              </h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• Easy to install and configure</li>
                <li>• Fault isolation - single cable failure doesn't affect others</li>
                <li>• Easy to troubleshoot and maintain</li>
                <li>• Excellent performance with dedicated bandwidth per link</li>
                <li>• Scalable - easy to add new devices</li>
              </ul>
            </div>
            
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Disadvantages
              </h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>• Single point of failure at central hub</li>
                <li>• Requires more cable than other topologies</li>
                <li>• Performance depends on central device capacity</li>
                <li>• Hub replacement can be costly</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-blue-100 text-sm">
              <strong>Best Use Cases:</strong> Office networks, home networks, most structured cabling installations, 
              telecommunications rooms, data centres for server connections
            </p>
          </div>
          
          <div className="bg-gray-600/20 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-gray-300 mb-2">Technical Details</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Maximum cable length per segment: 100m (horizontal cabling)</li>
              <li>• Supports full-duplex communication</li>
              <li>• Each connection gets dedicated bandwidth</li>
              <li>• Compatible with Ethernet switching technology</li>
              <li>• Supports Power over Ethernet (PoE) delivery</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Bus Topology */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Square className="h-5 w-5 text-elec-yellow" />
            Bus Topology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            In a bus topology, all devices connect to a single backbone cable. Data travels along 
            the backbone, and each device receives all transmissions but only processes data intended for it.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Advantages
              </h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• Cost-effective - uses minimal cable</li>
                <li>• Simple to implement for small networks</li>
                <li>• Easy to extend the backbone</li>
                <li>• No central device required</li>
              </ul>
            </div>
            
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Disadvantages
              </h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>• Difficult to troubleshoot problems</li>
                <li>• Backbone failure affects entire network</li>
                <li>• Performance degrades with more devices</li>
                <li>• Limited cable length and device count</li>
                <li>• Collision domains can cause data conflicts</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-blue-100 text-sm">
              <strong>Best Use Cases:</strong> Legacy systems, temporary installations, simple point-of-sale networks, 
              older Ethernet implementations (10BASE2, 10BASE5)
            </p>
          </div>
          
          <div className="bg-gray-600/20 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-gray-300 mb-2">Historical Context</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bus topology was common in early Ethernet networks using coaxial cable. While largely obsolete 
              for LANs, the concept still applies to some industrial control systems and automotive networks.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ring Topology */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Circle className="h-5 w-5 text-elec-yellow" />
            Ring Topology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            In a ring topology, devices are connected in a circular fashion, with each device having 
            exactly two neighbours. Data travels in one direction around the ring until it reaches its destination.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Advantages
              </h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• Equal access for all devices</li>
                <li>• Predictable performance characteristics</li>
                <li>• No collisions with token-based access</li>
                <li>• Can span longer distances than bus</li>
                <li>• Orderly data transmission</li>
              </ul>
            </div>
            
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Disadvantages
              </h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>• Single device failure can break the ring</li>
                <li>• Difficult to reconfigure</li>
                <li>• Adding/removing devices disrupts network</li>
                <li>• Slower data transmission for distant devices</li>
                <li>• Requires more cable than bus topology</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-blue-100 text-sm">
              <strong>Best Use Cases:</strong> Token Ring networks, FDDI backbones, some industrial control systems, 
              metropolitan area networks (MANs)
            </p>
          </div>
          
          <div className="bg-gray-600/20 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-gray-300 mb-2">Token Passing</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ring networks often use token passing for access control. A special data packet (token) circulates 
              around the ring, and only the device holding the token can transmit data.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mesh Topology */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Network className="h-5 w-5 text-elec-yellow" />
            Mesh Topology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            In a mesh topology, devices have multiple connections to other devices, providing 
            redundant paths for data transmission. Can be full mesh (every device connected to every other) 
            or partial mesh (some devices have multiple connections).
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Advantages
              </h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>• Excellent fault tolerance and redundancy</li>
                <li>• Multiple paths provide load balancing</li>
                <li>• High security - difficult to intercept data</li>
                <li>• Self-healing capabilities</li>
                <li>• Optimal performance for critical applications</li>
              </ul>
            </div>
            
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Disadvantages
              </h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>• Very expensive to implement</li>
                <li>• Complex installation and maintenance</li>
                <li>• Requires extensive cabling</li>
                <li>• Difficult to troubleshoot</li>
                <li>• Overkill for most applications</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-blue-100 text-sm">
              <strong>Best Use Cases:</strong> WAN connections, critical infrastructure, wireless mesh networks, 
              data centres, internet backbone, military communications
            </p>
          </div>
          
          <div className="bg-gray-600/20 border border-gray-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-gray-300 mb-2">Full vs Partial Mesh</h4>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• <strong>Full Mesh:</strong> Every device connects to every other device</li>
              <li>• <strong>Partial Mesh:</strong> Some devices have multiple connections, but not all</li>
              <li>• Formula for full mesh: n(n-1)/2 connections needed for n devices</li>
              <li>• Partial mesh is more practical and cost-effective</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Hybrid Topologies */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Hybrid Topologies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Hybrid topologies combine two or more different topology types to create a network 
            that best meets specific requirements. This approach leverages the advantages of 
            different topologies whilst minimising their disadvantages.
          </p>
          
          <div className="space-y-4">
            <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-300 mb-2">Star-Bus Hybrid</h4>
              <p className="text-indigo-100 text-sm">
                Multiple star networks connected via a backbone bus. Common in structured cabling 
                where departments have star configurations connected to a main distribution frame.
              </p>
            </div>
            
            <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-300 mb-2">Tree (Hierarchical) Topology</h4>
              <p className="text-indigo-100 text-sm">
                Combines star and bus characteristics in a hierarchical structure. Root node connects 
                to multiple levels of star-configured sub-networks.
              </p>
            </div>
            
            <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-300 mb-2">Partial Mesh with Star</h4>
              <p className="text-indigo-100 text-sm">
                Critical devices use mesh connections for redundancy, whilst standard users connect 
                via star topology for cost efficiency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Comparison */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Performance & Cost Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-2 text-foreground">Topology</th>
                  <th className="text-left p-2 text-foreground">Cost</th>
                  <th className="text-left p-2 text-foreground">Performance</th>
                  <th className="text-left p-2 text-foreground">Reliability</th>
                  <th className="text-left p-2 text-foreground">Scalability</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-medium">Star</td>
                  <td className="p-2 text-yellow-400">Medium</td>
                  <td className="p-2 text-green-400">High</td>
                  <td className="p-2 text-yellow-400">Medium</td>
                  <td className="p-2 text-green-400">Excellent</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-medium">Bus</td>
                  <td className="p-2 text-green-400">Low</td>
                  <td className="p-2 text-red-400">Poor</td>
                  <td className="p-2 text-red-400">Poor</td>
                  <td className="p-2 text-red-400">Limited</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-2 font-medium">Ring</td>
                  <td className="p-2 text-yellow-400">Medium</td>
                  <td className="p-2 text-yellow-400">Medium</td>
                  <td className="p-2 text-red-400">Poor</td>
                  <td className="p-2 text-yellow-400">Moderate</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Mesh</td>
                  <td className="p-2 text-red-400">Very High</td>
                  <td className="p-2 text-green-400">Excellent</td>
                  <td className="p-2 text-green-400">Excellent</td>
                  <td className="p-2 text-red-400">Complex</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Selection Criteria */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            How to Choose the Right Topology
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-2">Consider Your Requirements</h4>
                <ul className="space-y-1 text-green-100 text-sm">
                  <li>• Budget constraints</li>
                  <li>• Number of devices</li>
                  <li>• Performance needs</li>
                  <li>• Reliability requirements</li>
                  <li>• Future growth plans</li>
                  <li>• Maintenance capabilities</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">Small Networks (5-20 devices)</h4>
                <p className="text-blue-100 text-sm">
                  <strong>Recommended:</strong> Star topology with a single switch. Simple, cost-effective, 
                  and provides good performance for most applications.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2">Medium Networks (20-100 devices)</h4>
                <p className="text-purple-100 text-sm">
                  <strong>Recommended:</strong> Hierarchical star (tree) topology with multiple switches 
                  connected to a central backbone switch.
                </p>
              </div>
              
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-2">Large Networks (100+ devices)</h4>
                <p className="text-orange-100 text-sm">
                  <strong>Recommended:</strong> Hybrid topology combining star clusters with partial mesh 
                  for backbone connections and redundancy where needed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};