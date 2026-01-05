import { TrendingUp, Zap, Gauge, Users, Cloud, AlertTriangle, Wifi, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const NetworkSpeedContent = () => {
  return (
    <div className="space-y-6">
      {/* Simple Explanation */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Gauge className="h-5 w-5 text-elec-yellow" />
            Understanding Speed, Bandwidth, and Throughput
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed text-lg">
            Network speed concepts are like motorway traffic - there&apos;s a difference between the speed limit, 
            the number of lanes, and how fast traffic actually moves.
          </p>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Traffic Analogy</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-blue-300 mb-2">Bandwidth = Motorway Width</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The maximum amount of data that can travel through the network - like the number of lanes on a motorway.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-300 mb-2">Speed = Speed Limit</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The theoretical maximum rate at which data can travel - like the posted speed limit.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-300 mb-2">Throughput = Actual Traffic Flow</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The actual amount of data successfully transmitted - like how fast traffic really moves.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bandwidth Requirements */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-elec-yellow" />
            Bandwidth Requirements by Application
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Different applications have varying bandwidth requirements. Understanding these needs is essential 
            for proper network planning and ensuring adequate performance for all users.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">Basic Applications</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• <strong>Email & Web Browsing:</strong> 1-5 Mbps per user</li>
                  <li>• <strong>File Sharing:</strong> 10-50 Mbps</li>
                  <li>• <strong>VoIP Calls:</strong> 100 Kbps per call</li>
                  <li>• <strong>Standard Video Conferencing:</strong> 2-4 Mbps</li>
                  <li>• <strong>Cloud Applications:</strong> 5-25 Mbps</li>
                </ul>
              </div>
              
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Medium Applications</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• <strong>HD Video Streaming:</strong> 5-25 Mbps</li>
                  <li>• <strong>Video Conferencing (HD):</strong> 6-15 Mbps</li>
                  <li>• <strong>CAD/Design Software:</strong> 50-100 Mbps</li>
                  <li>• <strong>Database Applications:</strong> 10-100 Mbps</li>
                  <li>• <strong>Backup Operations:</strong> 100-500 Mbps</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-3">High-Demand Applications</h4>
                <ul className="space-y-2 text-red-100 text-sm">
                  <li>• <strong>4K Video Streaming:</strong> 25-100 Mbps</li>
                  <li>• <strong>Virtual Reality:</strong> 50-200 Mbps</li>
                  <li>• <strong>Large File Transfers:</strong> 500+ Mbps</li>
                  <li>• <strong>Real-time Collaboration:</strong> 100-500 Mbps</li>
                  <li>• <strong>Server Virtualisation:</strong> 1-10 Gbps</li>
                </ul>
              </div>
              
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-3">Future Applications</h4>
                <ul className="space-y-2 text-purple-100 text-sm">
                  <li>• <strong>8K Video:</strong> 100-400 Mbps</li>
                  <li>• <strong>Augmented Reality:</strong> 200-1000 Mbps</li>
                  <li>• <strong>IoT Sensor Networks:</strong> Variable</li>
                  <li>• <strong>AI/Machine Learning:</strong> 1-100 Gbps</li>
                  <li>• <strong>Holographic Communications:</strong> 1+ Gbps</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Speed Standards */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Ethernet Speed Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Ethernet standards have evolved dramatically over the decades to support increasing bandwidth demands. 
            Understanding these standards helps in selecting appropriate infrastructure for current and future needs.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 text-foreground">Standard</th>
                  <th className="text-left p-3 text-foreground">Speed</th>
                  <th className="text-left p-3 text-foreground">Cable Type</th>
                  <th className="text-left p-3 text-foreground">Max Distance</th>
                  <th className="text-left p-3 text-foreground">Year Introduced</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">10BASE-T</td>
                  <td className="p-3">10 Mbps</td>
                  <td className="p-3">Cat 3</td>
                  <td className="p-3">100m</td>
                  <td className="p-3 text-gray-400">1990</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">100BASE-TX</td>
                  <td className="p-3">100 Mbps</td>
                  <td className="p-3">Cat 5</td>
                  <td className="p-3">100m</td>
                  <td className="p-3 text-gray-400">1995</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">1000BASE-T</td>
                  <td className="p-3 text-green-400">1 Gbps</td>
                  <td className="p-3">Cat 5e/6</td>
                  <td className="p-3">100m</td>
                  <td className="p-3">1999</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">10GBASE-T</td>
                  <td className="p-3 text-blue-400">10 Gbps</td>
                  <td className="p-3">Cat 6A/7</td>
                  <td className="p-3">100m</td>
                  <td className="p-3">2006</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">25GBASE-T</td>
                  <td className="p-3 text-purple-400">25 Gbps</td>
                  <td className="p-3">Cat 8</td>
                  <td className="p-3">30m</td>
                  <td className="p-3">2016</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">40GBASE-T</td>
                  <td className="p-3 text-red-400">40 Gbps</td>
                  <td className="p-3">Cat 8</td>
                  <td className="p-3">30m</td>
                  <td className="p-3">2016</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">Fibre Optic Standards</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              Fibre optic cables support much higher speeds and longer distances: 10 Gbps, 25 Gbps, 40 Gbps, 
              100 Gbps, and beyond. Single-mode fibre can transmit data over tens of kilometres, making it 
              ideal for backbone connections and inter-building links.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Factors Affecting Performance */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Factors Affecting Network Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Network performance is influenced by multiple factors beyond just bandwidth capacity. 
            Understanding these factors helps in diagnosing performance issues and optimising network design.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-3">Physical Layer Factors</h4>
                <ul className="space-y-2 text-red-100 text-sm">
                  <li>• <strong>Cable quality:</strong> Category rating and condition</li>
                  <li>• <strong>Distance limitations:</strong> Signal attenuation over length</li>
                  <li>• <strong>Interference:</strong> EMI and crosstalk</li>
                  <li>• <strong>Connection quality:</strong> Terminations and splices</li>
                  <li>• <strong>Environmental conditions:</strong> Temperature and humidity</li>
                </ul>
              </div>
              
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-3">Network Design Factors</h4>
                <ul className="space-y-2 text-yellow-100 text-sm">
                  <li>• <strong>Topology choice:</strong> Star vs mesh vs hybrid</li>
                  <li>• <strong>Bandwidth allocation:</strong> Oversubscription ratios</li>
                  <li>• <strong>Switch capacity:</strong> Backplane and forwarding rates</li>
                  <li>• <strong>Network segmentation:</strong> VLANs and subnets</li>
                  <li>• <strong>Redundancy design:</strong> Multiple paths and failover</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Traffic and Usage Factors</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• <strong>User behaviour:</strong> Concurrent usage patterns</li>
                  <li>• <strong>Application mix:</strong> Voice, data, video ratios</li>
                  <li>• <strong>Time of day:</strong> Peak vs off-peak usage</li>
                  <li>• <strong>Protocol overhead:</strong> Headers and error correction</li>
                  <li>• <strong>Security processing:</strong> Encryption and firewall inspection</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">Equipment Performance</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• <strong>Processing power:</strong> CPU and memory capacity</li>
                  <li>• <strong>Buffer sizes:</strong> Packet queuing capabilities</li>
                  <li>• <strong>Firmware efficiency:</strong> Optimised switching algorithms</li>
                  <li>• <strong>Hardware features:</strong> Hardware vs software processing</li>
                  <li>• <strong>Age and condition:</strong> Degradation over time</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Proofing Strategies */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Future Proofing Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Future proofing involves designing networks that can accommodate evolving requirements without 
            requiring complete infrastructure replacement. This approach maximises investment value and 
            minimises disruption during upgrades.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-3">Infrastructure Future Proofing</h4>
                <ul className="space-y-2 text-purple-100 text-sm">
                  <li>• <strong>Higher category cables:</strong> Cat 6A instead of Cat 6</li>
                  <li>• <strong>Fibre backbone:</strong> Single-mode for long-term capacity</li>
                  <li>• <strong>Larger conduits:</strong> 40% spare capacity for future cables</li>
                  <li>• <strong>Modular design:</strong> Easy expansion and reconfiguration</li>
                  <li>• <strong>Multiple pathways:</strong> Physical diversity for resilience</li>
                </ul>
              </div>
              
              <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-300 mb-3">Technology Planning</h4>
                <ul className="space-y-2 text-cyan-100 text-sm">
                  <li>• <strong>Standards roadmaps:</strong> Follow IEEE and TIA developments</li>
                  <li>• <strong>Bandwidth trends:</strong> Plan for 10x growth every 5 years</li>
                  <li>• <strong>Application evolution:</strong> Consider emerging technologies</li>
                  <li>• <strong>Migration planning:</strong> Gradual upgrade strategies</li>
                  <li>• <strong>Lifecycle management:</strong> Refresh schedules and EOL planning</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-3">Capacity Planning</h4>
                <ul className="space-y-2 text-orange-100 text-sm">
                  <li>• <strong>Growth projections:</strong> User and device expansion</li>
                  <li>• <strong>Application requirements:</strong> Bandwidth per user trends</li>
                  <li>• <strong>Peak usage patterns:</strong> Oversubscription ratios</li>
                  <li>• <strong>Quality of service:</strong> Performance guarantees</li>
                  <li>• <strong>Redundancy planning:</strong> Failover capacity requirements</li>
                </ul>
              </div>
              
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Financial Considerations</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• <strong>Total cost of ownership:</strong> Initial plus operational costs</li>
                  <li>• <strong>Phased implementation:</strong> Spreading costs over time</li>
                  <li>• <strong>Technology refresh cycles:</strong> Active vs passive lifespans</li>
                  <li>• <strong>Risk assessment:</strong> Cost of inadequate capacity</li>
                  <li>• <strong>ROI analysis:</strong> Benefits of proactive investment</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bandwidth Calculation Methods */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Gauge className="h-5 w-5 text-elec-yellow" />
            Bandwidth Calculation Methodologies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Accurate bandwidth planning requires systematic calculation methods that account for 
            application requirements, user behaviour, and network overhead factors.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-3">Step-by-Step Calculation Process</h4>
              <ol className="space-y-2 text-blue-100 text-sm">
                <li><strong>1. Application Inventory:</strong> List all applications and their bandwidth requirements</li>
                <li><strong>2. User Classification:</strong> Group users by role and application usage patterns</li>
                <li><strong>3. Concurrency Analysis:</strong> Determine peak simultaneous usage percentages</li>
                <li><strong>4. Protocol Overhead:</strong> Add 15-25% for TCP/IP, security, and management traffic</li>
                <li><strong>5. Growth Planning:</strong> Apply growth factors based on business projections</li>
                <li><strong>6. Safety Margin:</strong> Add 20-40% buffer for unexpected demands</li>
              </ol>
            </div>
            
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-3">Practical Calculation Example</h4>
              <div className="text-green-100 text-sm space-y-2">
                <p><strong>Scenario:</strong> 100-person creative agency</p>
                <div className="ml-4 space-y-1">
                  <p>• 60 designers: 50 Mbps each (4K video, large files)</p>
                  <p>• 30 admin staff: 5 Mbps each (office applications)</p>
                  <p>• 10 executives: 10 Mbps each (video conferencing)</p>
                </div>
                <p><strong>Base calculation:</strong> (60×50) + (30×5) + (10×10) = 3,250 Mbps</p>
                <p><strong>Concurrency factor:</strong> 80% peak usage = 2,600 Mbps</p>
                <p><strong>Protocol overhead:</strong> +20% = 3,120 Mbps</p>
                <p><strong>Growth (5 years):</strong> +100% = 6,240 Mbps</p>
                <p><strong>Safety margin:</strong> +30% = <strong>8,112 Mbps required</strong></p>
                <p className="text-green-300 font-medium">Recommendation: 10 Gbps backbone minimum</p>
              </div>
            </div>
            
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-300 mb-3">Oversubscription Ratios</h4>
              <p className="text-purple-100 text-sm mb-2">
                Not all users need maximum bandwidth simultaneously. Common oversubscription ratios:
              </p>
              <ul className="space-y-1 text-purple-100 text-sm">
                <li>• <strong>Desktop users:</strong> 20:1 to 40:1 (conservative to aggressive)</li>
                <li>• <strong>Server connections:</strong> 4:1 to 8:1</li>
                <li>• <strong>Backbone links:</strong> 2:1 to 4:1</li>
                <li>• <strong>Internet connections:</strong> 10:1 to 20:1</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Monitoring */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <HardDrive className="h-5 w-5 text-elec-yellow" />
            Performance Monitoring and Optimisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Continuous monitoring and optimisation ensure networks deliver expected performance 
            and help identify when upgrades are needed before performance degrades.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-3">Key Performance Metrics</h4>
                <ul className="space-y-2 text-red-100 text-sm">
                  <li>• <strong>Bandwidth utilisation:</strong> Peak and average usage</li>
                  <li>• <strong>Latency:</strong> Round-trip time measurements</li>
                  <li>• <strong>Packet loss:</strong> Dropped packet percentages</li>
                  <li>• <strong>Jitter:</strong> Variation in packet timing</li>
                  <li>• <strong>Error rates:</strong> CRC and frame errors</li>
                  <li>• <strong>Availability:</strong> Uptime and downtime tracking</li>
                </ul>
              </div>
              
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-3">Monitoring Tools</h4>
                <ul className="space-y-1 text-yellow-100 text-sm">
                  <li>• SNMP-based network management systems</li>
                  <li>• Flow-based monitoring (NetFlow, sFlow)</li>
                  <li>• Synthetic transaction monitoring</li>
                  <li>• Application performance monitoring (APM)</li>
                  <li>• Wi-Fi analytics and optimisation tools</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Performance Thresholds</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• <strong>Bandwidth:</strong> Alert at 70%, critical at 85%</li>
                  <li>• <strong>Latency:</strong> &lt;1ms LAN, &lt;150ms WAN</li>
                  <li>• <strong>Packet loss:</strong> &lt;0.1% for voice, &lt;1% for data</li>
                  <li>• <strong>Jitter:</strong> &lt;30ms for voice applications</li>
                  <li>• <strong>Availability:</strong> 99.9% minimum for business critical</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">Optimisation Strategies</h4>
                <ul className="space-y-1 text-blue-100 text-sm">
                  <li>• Quality of Service (QoS) implementation</li>
                  <li>• Traffic shaping and bandwidth management</li>
                  <li>• Caching and content delivery networks</li>
                  <li>• Network segmentation and VLANs</li>
                  <li>• Load balancing and redundancy</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry-Specific Requirements */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-elec-yellow" />
            Industry-Specific Bandwidth Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Different industries have unique bandwidth requirements based on their specific 
            applications, compliance needs, and operational characteristics.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-3">
                <h5 className="font-medium text-indigo-300 mb-2">Healthcare</h5>
                <ul className="text-indigo-100 text-sm space-y-1">
                  <li>• Medical imaging: 100-500 Mbps per workstation</li>
                  <li>• Electronic health records: 10-25 Mbps per user</li>
                  <li>• Telemedicine: 25-50 Mbps per session</li>
                  <li>• Real-time monitoring: Low latency critical</li>
                </ul>
              </div>
              
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                <h5 className="font-medium text-green-300 mb-2">Education</h5>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• Interactive learning: 10-25 Mbps per classroom</li>
                  <li>• Video streaming: 5-15 Mbps per concurrent stream</li>
                  <li>• Student devices: 1-5 Mbps per device</li>
                  <li>• Administrative systems: 5-10 Mbps per user</li>
                </ul>
              </div>
              
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
                <h5 className="font-medium text-purple-300 mb-2">Financial Services</h5>
                <ul className="text-purple-100 text-sm space-y-1">
                  <li>• Trading platforms: Ultra-low latency required</li>
                  <li>• Real-time data feeds: 50-200 Mbps</li>
                  <li>• Video conferencing: 10-25 Mbps per room</li>
                  <li>• Backup and disaster recovery: 1-10 Gbps</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3">
                <h5 className="font-medium text-red-300 mb-2">Manufacturing</h5>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• Industrial control: 1-10 Mbps, &lt;10ms latency</li>
                  <li>• Machine monitoring: 100 Kbps - 5 Mbps per device</li>
                  <li>• Quality control imaging: 25-100 Mbps</li>
                  <li>• ERP systems: 5-20 Mbps per user</li>
                </ul>
              </div>
              
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-3">
                <h5 className="font-medium text-orange-300 mb-2">Media & Entertainment</h5>
                <ul className="text-orange-100 text-sm space-y-1">
                  <li>• 4K video editing: 200-800 Mbps per workstation</li>
                  <li>• Live streaming: 50-200 Mbps per stream</li>
                  <li>• Asset management: 100-500 Mbps shared</li>
                  <li>• Collaboration: 25-100 Mbps per user</li>
                </ul>
              </div>
              
              <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-3">
                <h5 className="font-medium text-cyan-300 mb-2">Retail</h5>
                <ul className="text-cyan-100 text-sm space-y-1">
                  <li>• Point of sale: 1-5 Mbps per terminal</li>
                  <li>• Inventory management: 5-15 Mbps</li>
                  <li>• Digital signage: 10-50 Mbps per display</li>
                  <li>• Customer Wi-Fi: 2-10 Mbps per user</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Migration Planning */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Migration and Upgrade Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Successful network upgrades require careful planning to minimise disruption whilst 
            ensuring compatibility and optimal performance throughout the transition period.
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-800/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Phased Migration Strategy</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-blue-300 mb-2">Phase 1: Foundation</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Upgrade backbone infrastructure</li>
                    <li>• Install new core switches</li>
                    <li>• Establish parallel pathways</li>
                    <li>• Test connectivity and performance</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-300 mb-2">Phase 2: Distribution</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Upgrade distribution switches</li>
                    <li>• Migrate high-priority segments</li>
                    <li>• Validate application performance</li>
                    <li>• Adjust configurations as needed</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-300 mb-2">Phase 3: Access</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Replace edge switches</li>
                    <li>• Migrate end-user connections</li>
                    <li>• Decommission old equipment</li>
                    <li>• Complete documentation updates</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-300 mb-3">Compatibility Considerations</h4>
              <div className="grid md:grid-cols-2 gap-4 text-yellow-100 text-sm">
                <div>
                  <strong>Technical Compatibility:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Ethernet standards and speeds</li>
                    <li>• Connector types and pinouts</li>
                    <li>• Power requirements (PoE versions)</li>
                    <li>• Management protocols and features</li>
                  </ul>
                </div>
                <div>
                  <strong>Operational Compatibility:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Configuration migration procedures</li>
                    <li>• Staff training requirements</li>
                    <li>• Monitoring system integration</li>
                    <li>• Backup and recovery procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emerging Technologies */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cloud className="h-5 w-5 text-elec-yellow" />
            Emerging Technologies and Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Several emerging technologies will significantly impact future network requirements. 
            Understanding these trends helps in making informed future-proofing decisions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="h-4 w-4 text-indigo-400" />
                  <h5 className="font-medium text-indigo-300">Internet of Things (IoT)</h5>
                </div>
                <p className="text-indigo-100 text-sm">
                  Billions of connected devices requiring network connectivity, though typically low bandwidth per device.
                </p>
              </div>
              
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="h-4 w-4 text-red-400" />
                  <h5 className="font-medium text-red-300">Edge Computing</h5>
                </div>
                <p className="text-red-100 text-sm">
                  Processing data closer to sources, requiring distributed high-speed connections throughout facilities.
                </p>
              </div>
              
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="h-4 w-4 text-yellow-400" />
                  <h5 className="font-medium text-yellow-300">Cloud Migration</h5>
                </div>
                <p className="text-yellow-100 text-sm">
                  Increased reliance on internet connectivity with higher uplink bandwidth requirements.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <h5 className="font-medium text-green-300">Artificial Intelligence</h5>
                </div>
                <p className="text-green-100 text-sm">
                  AI workloads requiring massive data movement between storage, processing, and presentation systems.
                </p>
              </div>
              
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <h5 className="font-medium text-purple-300">Hybrid Work</h5>
                </div>
                <p className="text-purple-100 text-sm">
                  Remote collaboration tools requiring higher quality video conferencing and file sharing capabilities.
                </p>
              </div>
              
              <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4 text-cyan-400" />
                  <h5 className="font-medium text-cyan-300">Real-time Applications</h5>
                </div>
                <p className="text-cyan-100 text-sm">
                  Low-latency requirements for VR, AR, gaming, and industrial control systems.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};