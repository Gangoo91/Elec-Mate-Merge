import { Cable, Zap, BarChart, Award, Settings, TestTube, Wrench, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TwistedPairContent = () => {
  const categories = [
    {
      category: "Cat5e",
      bandwidth: "100 MHz",
      speed: "1 Gbps",
      distance: "100m",
      applications: "Basic Ethernet, VoIP, basic data networks",
      notes: "Minimum standard for new installations"
    },
    {
      category: "Cat6",
      bandwidth: "250 MHz", 
      speed: "1 Gbps (10 Gbps up to 55m)",
      distance: "100m (55m for 10G)",
      applications: "Gigabit Ethernet, high-density networks",
      notes: "Better performance than Cat5e, reduced crosstalk"
    },
    {
      category: "Cat6A",
      bandwidth: "500 MHz",
      speed: "10 Gbps",
      distance: "100m",
      applications: "10 Gigabit Ethernet, server rooms, future-proofing",
      notes: "Augmented Category 6, full 10G performance"
    },
    {
      category: "Cat7",
      bandwidth: "600 MHz",
      speed: "10 Gbps+",
      distance: "100m",
      applications: "High-performance networks, industrial environments",
      notes: "Shielded, requires special connectors"
    },
    {
      category: "Cat8",
      bandwidth: "2000 MHz",
      speed: "25/40 Gbps",
      distance: "30m",
      applications: "Data centres, server interconnects",
      notes: "Latest standard, limited distance"
    }
  ];

  const constructionFeatures = [
    {
      icon: Cable,
      title: "Four Twisted Pairs",
      description: "Standard configuration with eight individual conductors arranged in four pairs, each twisted at different rates."
    },
    {
      icon: Zap,
      title: "Twist Rate Variation",
      description: "Each pair has a different twist rate (typically 3-12 twists per inch) to minimise crosstalk between pairs."
    },
    {
      icon: BarChart,
      title: "Electromagnetic Shielding",
      description: "Higher categories include additional shielding (STP/FTP) to reduce external interference and improve performance."
    }
  ];

  const standards = [
    {
      organisation: "TIA/EIA",
      standard: "TIA-568-C",
      description: "American standard defining cable categories, performance requirements, and installation practices"
    },
    {
      organisation: "ISO/IEC",
      standard: "ISO/IEC 11801",
      description: "International standard for structured cabling systems in commercial buildings"
    },
    {
      organisation: "CENELEC",
      standard: "EN 50173",
      description: "European standard harmonised with ISO/IEC 11801 for structured cabling systems"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cable Construction */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Twisted Pair Construction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-300 space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">Why Twist the Wires?</h3>
            <p>
              The twisting of wire pairs is not merely a construction convenience—it's a fundamental 
              electromagnetic principle that dramatically improves signal quality:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Noise Cancellation:</strong> External electromagnetic interference affects both wires in a pair equally, creating common-mode noise that can be cancelled at the receiver</li>
              <li><strong>Crosstalk Reduction:</strong> Different twist rates for each pair ensure that interference between pairs is minimised</li>
              <li><strong>Signal Integrity:</strong> Maintains consistent impedance and reduces signal reflection</li>
              <li><strong>Balanced Transmission:</strong> Enables differential signalling for improved noise immunity</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {constructionFeatures.map((feature, index) => (
              <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                <feature.icon className="h-8 w-8 text-elec-yellow mb-3" />
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Specifications */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Cable Categories and Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Category</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Bandwidth</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Max Speed</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Distance</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Applications</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-slate-800/30">
                    <td className="py-3 px-4 text-foreground font-semibold">{cat.category}</td>
                    <td className="py-3 px-4 text-gray-300">{cat.bandwidth}</td>
                    <td className="py-3 px-4 text-gray-300">{cat.speed}</td>
                    <td className="py-3 px-4 text-gray-300">{cat.distance}</td>
                    <td className="py-3 px-4 text-gray-300">{cat.applications}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{cat.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Industry Standards */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Award className="h-5 w-5 text-elec-yellow" />
            Industry Standards and Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Twisted pair cables must comply with recognised industry standards to ensure 
            performance, compatibility, and reliability across different manufacturers and installations.
          </p>
          
          <div className="space-y-4">
            {standards.map((standard, index) => (
              <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">{standard.organisation} - {standard.standard}</h4>
                <p className="text-gray-300">{standard.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simple Installation Guide */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Simple Installation Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-300">
          <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">What You'll Need (Basic Tools)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li>• Cable (twisted pair - Cat5e, Cat6, or Cat6A)</li>
                <li>• RJ45 connectors (plugs)</li>
                <li>• Crimping tool</li>
                <li>• Cable stripper or sharp knife</li>
                <li>• Cable tester (simple continuity tester)</li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li>• Wall plates and keystone jacks</li>
                <li>• Punch-down tool</li>
                <li>• Cable ties or velcro straps</li>
                <li>• Drill and appropriate bits</li>
                <li>• Cable management (trunking/conduit)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-4">Step-by-Step Installation Process</h3>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Planning Your Route
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Measure the distance:</strong> From the router/switch to each outlet location</li>
                  <li><strong>Add extra length:</strong> Always add 10-20% extra cable for routing and connections</li>
                  <li><strong>Avoid interference:</strong> Keep away from power cables, fluorescent lights, and motors</li>
                  <li><strong>Choose the path:</strong> Use walls, ceilings, or conduits - avoid sharp bends</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Running the Cable
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Don't pull too hard:</strong> Maximum 25 pounds of force - cable should glide, not stretch</li>
                  <li><strong>Support every 1.5 metres:</strong> Use cable clips or ties to secure the cable</li>
                  <li><strong>Gentle bends only:</strong> Never bend tighter than 4 times the cable diameter</li>
                  <li><strong>Label as you go:</strong> Mark both ends of each cable run for easy identification</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Terminating the Cable
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-elec-yellow mb-2">At the Wall Outlet:</h5>
                    <ul className="space-y-1 text-sm ml-4">
                      <li>1. Strip outer jacket back 25mm (1 inch)</li>
                      <li>2. Separate the 4 pairs but keep them twisted</li>
                      <li>3. Follow T568B wiring standard (most common in UK)</li>
                      <li>4. Punch down wires - one firm push per wire</li>
                      <li>5. Trim excess wire with punch-down tool</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow mb-2">RJ45 Plug (Patch Cable):</h5>
                    <ul className="space-y-1 text-sm ml-4">
                      <li>1. Strip outer jacket back 13mm (0.5 inch)</li>
                      <li>2. Untwist pairs as little as possible</li>
                      <li>3. Arrange wires in T568B order</li>
                      <li>4. Trim to 13mm length and insert into plug</li>
                      <li>5. Crimp firmly - check all 8 wires are visible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Testing Your Work
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Continuity test:</strong> Use a simple cable tester to check all 8 wires connect properly</li>
                  <li><strong>Check for shorts:</strong> No wires should connect to the wrong pins</li>
                  <li><strong>Test with devices:</strong> Plug in a computer and check for network connectivity</li>
                  <li><strong>Speed test:</strong> Verify you're getting expected speeds (100Mbps, 1Gbps, etc.)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Best Practices */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Installation Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Critical Installation Factors</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Bend Radius:</strong> Never exceed 4 times the cable diameter to prevent damage to internal conductors</li>
              <li><strong>Pulling Tension:</strong> Maximum 25 pounds (110N) pulling force to avoid stretching</li>
              <li><strong>Untwisting:</strong> Minimise untwisting at terminations—maximum 13mm (0.5") for Cat6</li>
              <li><strong>Cable Management:</strong> Use proper support and avoid compression in cable trays</li>
              <li><strong>Separation:</strong> Maintain distance from power cables and fluorescent lighting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Environmental Considerations</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Temperature Rating:</strong> Ensure cables are rated for the installation environment</li>
              <li><strong>Fire Rating:</strong> Use appropriate fire-rated cables (CMP, CMR, CM) as required</li>
              <li><strong>Moisture Protection:</strong> Consider outdoor-rated or gel-filled cables for external use</li>
              <li><strong>Chemical Resistance:</strong> Specify chemical-resistant jackets for industrial environments</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes and Simple Solutions */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Common Mistakes and Simple Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Common Mistakes</h3>
              <div className="space-y-3">
                <div className="bg-red-900/20 border border-red-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-1">Too Much Untwisting</h4>
                  <p className="text-sm">Untwisting pairs more than 13mm at terminations reduces performance significantly.</p>
                </div>
                <div className="bg-red-900/20 border border-red-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-1">Sharp Bends</h4>
                  <p className="text-sm">Bending cable too tightly can break internal conductors or change electrical properties.</p>
                </div>
                <div className="bg-red-900/20 border border-red-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-1">Poor Cable Management</h4>
                  <p className="text-sm">Cables bunched together or compressed can cause crosstalk and heat buildup.</p>
                </div>
                <div className="bg-red-900/20 border border-red-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-1">Wrong Wiring Standard</h4>
                  <p className="text-sm">Mixing T568A and T568B standards can cause connectivity issues.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Simple Solutions</h3>
              <div className="space-y-3">
                <div className="bg-green-900/20 border border-green-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-1">Measure and Mark</h4>
                  <p className="text-sm">Use a ruler to ensure you only untwist the minimum amount needed for termination.</p>
                </div>
                <div className="bg-green-900/20 border border-green-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-1">Use Cable Guides</h4>
                  <p className="text-sm">Use corner protectors and cable guides to maintain proper bend radius.</p>
                </div>
                <div className="bg-green-900/20 border border-green-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-1">Support Every 1.5m</h4>
                  <p className="text-sm">Regular support prevents cable sag and maintains proper separation.</p>
                </div>
                <div className="bg-green-900/20 border border-green-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-1">Stick to T568B</h4>
                  <p className="text-sm">Use T568B standard throughout your installation for consistency.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Understanding Section */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-elec-yellow" />
            Simple Understanding Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-300">
          <div className="bg-blue-900/20 border border-blue-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Think of It Like This...</h3>
            <p className="text-sm">
              A twisted pair cable is like a highway with 8 lanes (wires) arranged in 4 pairs. 
              The twisting is like having the lanes weave slightly - this prevents traffic from one 
              lane interfering with traffic in other lanes (electromagnetic interference).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Key Concepts Made Simple</h3>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Why 8 Wires?</h4>
                <p className="text-sm">
                  • 4 wires carry data signals (transmit and receive)
                  <br />• 4 wires provide return paths for the signals
                  <br />• Working in pairs creates a balanced system that cancels noise
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Why Different Categories?</h4>
                <p className="text-sm">
                  • Higher categories = tighter specifications
                  <br />• Better materials and construction = higher speeds
                  <br />• Cat5e = 100MHz, Cat6 = 250MHz, Cat6A = 500MHz
                  <br />• More MHz = more data can travel per second
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">The 100-Metre Rule</h4>
                <p className="text-sm">
                  • Electrical signals get weaker over distance
                  <br />• 100 metres is the maximum before signals become too weak
                  <br />• This includes patch cables at both ends (typically 90m permanent + 10m patch)
                  <br />• Beyond 100m, you need switches or repeaters to boost the signal
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">What Happens When You Make Mistakes?</h4>
                <p className="text-sm">
                  • Untwist too much = crosstalk = slow speeds or connection drops
                  <br />• Bend too tight = broken wires = no connection at all
                  <br />• Wrong wiring order = might work slowly or not at all
                  <br />• Poor termination = intermittent connection issues
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-300 mb-2">Quick Success Tips</h3>
            <ul className="space-y-1 text-sm">
              <li>• Always test your work - a £20 cable tester can save hours of troubleshooting</li>
              <li>• Label everything - you'll thank yourself later</li>
              <li>• Buy quality tools - cheap crimpers make poor connections</li>
              <li>• Practice on spare cable first - get the technique right</li>
              <li>• When in doubt, start over - cable is cheaper than your time</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Testing and Certification */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TestTube className="h-5 w-5 text-elec-yellow" />
            Testing and Certification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p>
            Proper testing ensures that installed twisted pair cables meet performance specifications 
            and will support the intended applications reliably.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Required Tests</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Basic Tests</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Wire map verification</li>
                  <li>Length measurement</li>
                  <li>Insertion loss</li>
                  <li>Return loss</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Advanced Tests</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Near-end crosstalk (NEXT)</li>
                  <li>Far-end crosstalk (FEXT)</li>
                  <li>Alien crosstalk (AXT)</li>
                  <li>Propagation delay</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Certification Levels</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Level II (Basic):</strong> Qualification testing for basic connectivity</li>
              <li><strong>Level IIE (Enhanced):</strong> Basic performance parameters</li>
              <li><strong>Level III (Certification):</strong> Full performance testing to category standards</li>
              <li><strong>Level IV (Extended):</strong> Advanced parameters including alien crosstalk</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};