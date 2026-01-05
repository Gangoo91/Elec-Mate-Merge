import { Shield, Zap, Factory, Building, AlertTriangle, CheckCircle, Wrench, Users, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CableShieldingContent = () => {
  const cableTypes = [
    {
      type: "UTP",
      fullName: "Unshielded Twisted Pair",
      construction: "Four twisted pairs with no additional shielding",
      protection: "Wire twisting only",
      cost: "Lowest",
      applications: "Office environments, residential, low-EMI areas",
      advantages: ["Lowest cost", "Easiest to install", "Most flexible", "No grounding required"],
      disadvantages: ["Limited EMI protection", "Not suitable for industrial environments", "Performance degrades near interference sources"]
    },
    {
      type: "FTP",
      fullName: "Foiled Twisted Pair (F/UTP)",
      construction: "Four twisted pairs surrounded by overall foil shield",
      protection: "Overall foil shield around all pairs",
      cost: "Medium",
      applications: "Mixed environments, areas with moderate EMI, cost-sensitive shielded applications",
      advantages: ["Better EMI protection than UTP", "Lower cost than STP", "Good for moderate interference"],
      disadvantages: ["Requires proper grounding", "More difficult to terminate", "Single point of shield failure"]
    },
    {
      type: "STP",
      fullName: "Shielded Twisted Pair (S/FTP or F/FTP)",
      construction: "Individual pair shields plus overall shield",
      protection: "Shield around each pair plus overall shield",
      cost: "Highest",
      applications: "Industrial environments, high-EMI areas, critical data applications",
      advantages: ["Maximum EMI protection", "Best performance in noisy environments", "Individual pair isolation"],
      disadvantages: ["Highest cost", "Most complex installation", "Critical grounding requirements", "Least flexible"]
    }
  ];

  const emiSources = [
    {
      icon: Zap,
      source: "Electrical Equipment",
      description: "Motors, transformers, switching equipment, fluorescent lighting",
      impact: "High-frequency noise, voltage spikes, magnetic fields"
    },
    {
      icon: Factory,
      source: "Industrial Machinery",
      description: "Variable frequency drives, welding equipment, heavy machinery",
      impact: "Broadband interference, conducted and radiated emissions"
    },
    {
      icon: Building,
      source: "Building Systems",
      description: "HVAC systems, lifts, fire alarm systems, security equipment",
      impact: "Low to medium frequency interference, power line noise"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cable Type Comparison */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Cable Shielding Types Explained</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cableTypes.map((cable, index) => (
            <div key={index} className="rounded-lg border border-gray-600 p-6 bg-elec-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-elec-yellow text-elec-dark rounded-lg flex items-center justify-center font-bold text-lg">
                  {cable.type}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{cable.fullName}</h3>
                  <p className="text-gray-300">{cable.construction}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-elec-yellow mb-2">Protection Method</h4>
                    <p className="text-gray-300 text-sm">{cable.protection}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-elec-yellow mb-2">Typical Applications</h4>
                    <p className="text-gray-300 text-sm">{cable.applications}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-elec-yellow mb-2">Relative Cost</h4>
                    <p className="text-gray-300 text-sm">{cable.cost}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Advantages</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {cable.advantages.map((advantage, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Disadvantages</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {cable.disadvantages.map((disadvantage, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                          {disadvantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* EMI Sources and Environments */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Understanding Electromagnetic Interference (EMI)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-gray-300">
            <p>
              EMI is unwanted electromagnetic energy that can interfere with data signals. 
              In data cabling, EMI manifests as noise that degrades signal quality, reduces data rates, 
              or causes connection errors. Understanding EMI sources helps determine when shielded cables are necessary.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {emiSources.map((source, index) => (
              <div key={index} className="rounded-lg border border-gray-600 p-4 bg-elec-dark">
                <source.icon className="mb-3 h-8 w-8 text-elec-yellow" />
                <h4 className="mb-2 font-semibold text-foreground">{source.source}</h4>
                <p className="mb-3 text-sm text-gray-300">{source.description}</p>
                <div className="rounded border border-gray-600 p-2 bg-elec-gray">
                  <p className="text-xs text-gray-300">{source.impact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-gray-600 p-4 bg-elec-dark">
            <h3 className="mb-2 font-semibold text-foreground">EMI Assessment Guidelines</h3>
            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div>
                <h4 className="mb-1 font-medium text-foreground">Low EMI Environment</h4>
                <p className="text-gray-300">Standard office, residential, minimal electrical equipment</p>
                <p className="mt-1 text-elec-yellow">UTP cables sufficient</p>
              </div>
              <div>
                <h4 className="mb-1 font-medium text-foreground">Medium EMI Environment</h4>
                <p className="text-gray-300">Mixed office/industrial, moderate electrical equipment</p>
                <p className="mt-1 text-elec-yellow">FTP cables recommended</p>
              </div>
              <div>
                <h4 className="mb-1 font-medium text-foreground">High EMI Environment</h4>
                <p className="text-gray-300">Industrial facilities, heavy electrical equipment</p>
                <p className="mt-1 text-elec-yellow">STP cables required</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Requirements */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Installation Requirements by Cable Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-gray-600 p-4 bg-elec-dark">
            <h3 className="mb-4 text-lg font-semibold text-foreground">UTP Installation</h3>
            <div className="grid gap-4 text-sm text-gray-300 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-elec-yellow">Standard Requirements</h4>
                <ul className="space-y-1">
                  <li>• No special grounding needed</li>
                  <li>• Standard RJ45 connectors</li>
                  <li>• Normal cable management practices</li>
                  <li>• Regular patch panels and outlets</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-elec-yellow">Best Practices</h4>
                <ul className="space-y-1">
                  <li>• Keep away from power cables (300mm minimum)</li>
                  <li>• Avoid fluorescent lighting runs</li>
                  <li>• Use proper cable management</li>
                  <li>• Test for basic connectivity</li>
                </ul>
              </div>
            </div>
          </div>

            <div className="rounded-lg border border-gray-600 p-4 bg-elec-dark">
              <h3 className="mb-4 text-lg font-semibold text-foreground">FTP Installation</h3>
              <div className="grid gap-4 text-sm text-gray-300 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-elec-yellow">Special Requirements</h4>
                  <ul className="space-y-1">
                    <li>• Shielded connectors required</li>
                    <li>• Continuous shield from end to end</li>
                    <li>• Proper grounding at patch panels</li>
                    <li>• 360-degree shield termination</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-elec-yellow">Critical Points</h4>
                  <ul className="space-y-1">
                    <li>• All components must be shielded</li>
                    <li>• Single ground point to avoid loops</li>
                    <li>• Shield continuity testing essential</li>
                    <li>• Proper drain wire connection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-600 p-4 bg-elec-dark">
              <h3 className="mb-4 text-lg font-semibold text-foreground">STP Installation</h3>
              <div className="grid gap-4 text-sm text-gray-300 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-elec-yellow">Complex Requirements</h4>
                  <ul className="space-y-1">
                    <li>• Fully shielded system end-to-end</li>
                    <li>• Individual pair shield termination</li>
                    <li>• Specialised connectors and panels</li>
                    <li>• Comprehensive grounding strategy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-elec-yellow">Expert Installation</h4>
                  <ul className="space-y-1">
                    <li>• Requires specialist training</li>
                    <li>• Multiple shield terminations</li>
                    <li>• Complex testing procedures</li>
                    <li>• Bonding and earthing critical</li>
                  </ul>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Grounding and Earthing */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Critical: Grounding and Earthing for Shielded Cables
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="rounded-lg border p-4 bg-background">
            <h3 className="mb-2 font-semibold">Why Grounding is Critical</h3>
            <p className="text-sm">
              Improperly grounded shielded cables can actually perform worse than UTP cables. 
              The shield can act as an antenna, picking up more interference than it blocks. 
              Proper grounding is essential for shielded cables to provide their intended benefits.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Grounding Principles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-background">
                  <h4 className="mb-2 font-semibold">Single Point Grounding</h4>
                  <p className="text-sm">Ground shields at one end only (typically at the patch panel) to avoid ground loops and circulating currents.</p>
                </div>
                <div className="rounded-lg border p-4 bg-background">
                  <h4 className="mb-2 font-semibold">360-Degree Termination</h4>
                  <p className="text-sm">Shield must be terminated around the entire circumference of the connector, not just with a drain wire.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-background">
                  <h4 className="mb-2 font-semibold">Low Impedance Path</h4>
                  <p className="text-sm">The grounding path must have low impedance at high frequencies to effectively drain interference.</p>
                </div>
                <div className="rounded-lg border p-4 bg-background">
                  <h4 className="mb-2 font-semibold">Equipotential Bonding</h4>
                  <p className="text-sm">All grounded components must be at the same potential to prevent circulating currents.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-background">
            <h3 className="mb-2 font-semibold">Common Grounding Mistakes</h3>
            <ul className="space-y-1 text-sm">
              <li>• Grounding at both ends (creates ground loops)</li>
              <li>• Using only drain wire connection (insufficient high-frequency performance)</li>
              <li>• Poor shield continuity through patch panels</li>
              <li>• Mixing shielded and unshielded components</li>
              <li>• Inadequate bonding to building earth system</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Simple Understanding Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Simple Understanding Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="rounded-lg border p-4 bg-background">
            <h3 className="mb-3 text-lg font-semibold">Think of It Like This...</h3>
            <p className="text-sm">
              Cable shielding is like wearing different types of protection in different environments:
              <br />• UTP = T-shirt (fine for normal weather)
              <br />• FTP = Light jacket (good for moderate conditions)  
              <br />• STP = Full protective suit (necessary for harsh environments)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Key Concepts Made Simple</h3>
            <div className="space-y-4">
              <div className="rounded-lg border p-4 bg-background">
                <h4 className="mb-2 font-semibold">When Do I Need Shielding?</h4>
                <p className="text-sm">
                  • Can you hear electrical humming or buzzing? Consider FTP
                  <br />• Are there lots of motors, welders, or heavy machinery? Use STP
                  <br />• Is it a normal office with computers and printers? UTP is fine
                  <br />• Near radio transmitters or radar? Definitely need STP
                </p>
              </div>

              <div className="rounded-lg border p-4 bg-background">
                <h4 className="mb-2 font-semibold">The Grounding Reality</h4>
                <p className="text-sm">
                  • Shielded cable without proper grounding = money wasted
                  <br />• Like having a lightning rod that's not connected to earth
                  <br />• The shield needs somewhere to send the interference
                  <br />• One ground point only - more creates problems
                </p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Cost vs Benefit Reality Check</h4>
                <p className="text-sm">
                  • UTP: £1 per metre, easy installation
                  <br />• FTP: £2-3 per metre, moderate complexity
                  <br />• STP: £4-6 per metre, expert installation required
                  <br />• Don't pay for shielding you don't need!
                </p>
              </div>

              <div className="rounded-lg border p-4 bg-background">
                <h4 className="mb-2 font-semibold">Cost Reality</h4>
                <p className="text-sm">
                  • UTP: £1 per metre, easy installation
                  <br />• FTP: £2-3 per metre, moderate complexity
                  <br />• STP: £4-6 per metre, expert installation required
                  <br />• Don't pay for shielding you don't need!
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-background">
            <h3 className="mb-2 font-semibold">Quick Decision Guide</h3>
            <ul className="space-y-1 text-sm">
              <li>• Normal office/home = UTP (cheapest, easiest)</li>
              <li>• Near some electrical equipment = FTP (good compromise)</li>
              <li>• Industrial environment = STP (maximum protection)</li>
              <li>• When in doubt, measure the EMI first</li>
              <li>• Remember: proper installation is more important than cable type</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};