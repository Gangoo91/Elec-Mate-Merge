import { ArrowLeft, Wifi, Lightbulb, Zap, AlertTriangle, Settings, Calculator, TrendingUp, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import GridTiedSizingFAQ from '@/components/upskilling/renewable-energy/GridTiedSizingFAQ';
import GridTiedSizingPractical from '@/components/upskilling/renewable-energy/GridTiedSizingPractical';

const RenewableEnergyModule6Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What governs the allowed export power in the UK?",
      options: [
        "DNO connection agreements and G99/G100 standards",
        "Building regulations only",
        "Local council planning permission",
        "MCS installer certification"
      ],
      correct: 0,
      explanation: "DNO (Distribution Network Operator) connection agreements and engineering standards G99/G100 define maximum export limits and technical requirements for grid-connected generation."
    },
    {
      id: 2,
      question: "What device limits export automatically?",
      options: [
        "Circuit breaker",
        "Export limiting relay with CT clamps",
        "Generation meter",
        "Isolation switch"
      ],
      correct: 1,
      explanation: "Export limiting relays use current transformers (CT clamps) to monitor real-time export and automatically curtail generation when export limits are approached."
    },
    {
      id: 3,
      question: "Why is inverter oversizing a risk?",
      options: [
        "Higher installation costs",
        "Potential DNO export limit breaches",
        "Reduced system efficiency",
        "Warranty void issues"
      ],
      correct: 1,
      explanation: "Oversized inverters can produce more power than the agreed export limit, potentially causing DNO compliance breaches and grid stability issues."
    },
    {
      id: 4,
      question: "What's a CT clamp used for?",
      options: [
        "Measuring DC current from panels",
        "Monitoring AC current flow for export control",
        "Measuring battery voltage",
        "Controlling inverter temperature"
      ],
      correct: 1,
      explanation: "Current transformer (CT) clamps measure AC current flow in real-time, enabling precise monitoring and control of grid export levels."
    },
    {
      id: 5,
      question: "How do you handle sites with export restrictions?",
      options: [
        "Install larger inverters",
        "Use export limiting devices and size appropriately",
        "Ignore the restrictions",
        "Only install at night"
      ],
      correct: 1,
      explanation: "Sites with export restrictions require careful system sizing combined with export limiting devices to prevent breaching agreed limits while maximizing on-site consumption."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Grid-Tied Sizing and Export Management
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Designing effective grid-connected systems while managing export constraints and DNO rules
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Grid-Connected Design
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn to size grid-tied systems based on demand and site limits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand export management methods
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Design with DNO constraints in mind
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Grid-tied renewable energy systems must be carefully designed to work within DNO (Distribution Network Operator) constraints while maximizing economic benefit. This section focuses on designing effective grid-connected systems while managing export constraints and compliance with UK regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Matching Inverter Capacity to Building Load
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Proper inverter sizing ensures optimal energy utilization while maintaining grid compliance and maximizing financial returns from renewable generation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Load Analysis Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Annual consumption:</strong> Review 12 months of electricity bills</li>
                    <li>• <strong>Load profiles:</strong> Identify peak demand periods</li>
                    <li>• <strong>Seasonal variations:</strong> Summer vs winter consumption patterns</li>
                    <li>• <strong>Time-of-use patterns:</strong> Daytime vs evening loads</li>
                    <li>• <strong>Future load growth:</strong> Planned equipment additions</li>
                    <li>• <strong>Base load identification:</strong> Continuous power requirements</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Sizing Calculation Steps:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Step 1:</strong> Calculate average daytime load (kW)</li>
                    <li>• <strong>Step 2:</strong> Determine available roof area and orientation</li>
                    <li>• <strong>Step 3:</strong> Calculate maximum generation potential</li>
                    <li>• <strong>Step 4:</strong> Apply DNO export limitations</li>
                    <li>• <strong>Step 5:</strong> Optimize inverter size for maximum self-consumption</li>
                    <li>• <strong>Step 6:</strong> Verify compliance with connection agreement</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Practical Sizing Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Site Characteristics:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Annual consumption: 4,200 kWh</li>
                      <li>• Average daytime load: 1.2 kW</li>
                      <li>• Peak demand: 8 kW</li>
                      <li>• Available roof area: 40m² south-facing</li>
                      <li>• DNO export limit: 3.68 kW (16A single-phase)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Sizing Recommendations:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maximum array size: 6 kWp (fits roof area)</li>
                      <li>• Optimal inverter size: 3.68 kW (matches export limit)</li>
                      <li>• Expected annual generation: 5,100 kWh</li>
                      <li>• Self-consumption: ~35% (1,785 kWh)</li>
                      <li>• Export: ~65% (3,315 kWh)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-orange-400" />
                DNO Export Limits and Relay Types (G100/G99)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                UK DNOs enforce strict export limits through engineering recommendations G99 and G100, which define technical requirements for grid-connected generation equipment.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">G100 Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Scope:</strong> Installations ≤ 17 kW per phase</li>
                    <li>• <strong>Type testing:</strong> Required for all equipment</li>
                    <li>• <strong>Loss of mains protection:</strong> Mandatory frequency and voltage protection</li>
                    <li>• <strong>Reconnection delay:</strong> 20 seconds minimum after grid restoration</li>
                    <li>• <strong>Interface protection:</strong> G59/3 relay or equivalent</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">G99 Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Scope:</strong> All new connections from April 2019</li>
                    <li>• <strong>Power quality:</strong> Stricter harmonic limits</li>
                    <li>• <strong>Communication:</strong> Remote monitoring capabilities</li>
                    <li>• <strong>Grid support:</strong> Reactive power capability</li>
                    <li>• <strong>Fault ride-through:</strong> Enhanced grid stability support</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Protection Relay Types:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>G59/3 relays:</strong> Traditional protection systems</li>
                    <li>• <strong>Integrated inverter protection:</strong> Built-in G99 compliance</li>
                    <li>• <strong>Export limiting relays:</strong> Real-time power control</li>
                    <li>• <strong>Smart meters:</strong> Enhanced monitoring capability</li>
                    <li>• <strong>Remote trip systems:</strong> DNO emergency control</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Export Limit Classifications:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Connection Type</th>
                        <th className="text-left p-2">Maximum Export</th>
                        <th className="text-left p-2">Application Required</th>
                        <th className="text-left p-2">Typical Use</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Micro-generation (≤16A)</td>
                        <td className="p-2">3.68 kW</td>
                        <td className="p-2 text-green-400">Simple notification</td>
                        <td className="p-2">Domestic solar</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Small-scale (16-32A)</td>
                        <td className="p-2">7.36 kW</td>
                        <td className="p-2 text-yellow-400">DNO assessment</td>
                        <td className="p-2">Large domestic/small commercial</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Medium-scale (32-100A)</td>
                        <td className="p-2">23 kW</td>
                        <td className="p-2 text-orange-400">Detailed application</td>
                        <td className="p-2">Commercial installations</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Large-scale ({">100A"})</td>
                        <td className="p-2">Site-specific</td>
                        <td className="p-2 text-red-400">Full impact study</td>
                        <td className="p-2">Industrial/utility-scale</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-400" />
                Export-Limiting Devices and CT Clamps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Export limiting devices provide real-time control of generation output to prevent DNO limit breaches while maximizing system performance and grid compliance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">CT Clamp Technology:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Non-invasive installation:</strong> Clamps around supply cable</li>
                    <li>• <strong>Real-time monitoring:</strong> Continuous current measurement</li>
                    <li>• <strong>Bidirectional capability:</strong> Detects import and export flows</li>
                    <li>• <strong>High accuracy:</strong> ±1% measurement precision</li>
                    <li>• <strong>Safety isolation:</strong> No electrical connections required</li>
                    <li>• <strong>Multiple sizes:</strong> Various cable diameter options</li>
                  </ul>
                </div>
                <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                  <h4 className="text-teal-400 font-semibold mb-3">Export Limiting Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Power curtailment:</strong> Reduce inverter output dynamically</li>
                    <li>• <strong>Zero export control:</strong> Prevent any grid export</li>
                    <li>• <strong>Preset limit control:</strong> Maintain export below set threshold</li>
                    <li>• <strong>Time-based limits:</strong> Variable limits throughout day</li>
                    <li>• <strong>Grid voltage response:</strong> Reduce output at high voltages</li>
                    <li>• <strong>Remote control capability:</strong> DNO override functions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Installation Configuration Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Components:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• CT clamp on incoming supply cable</li>
                      <li>• Export limiting relay (Apollo, Ingecon, etc.)</li>
                      <li>• Communication cable to inverter</li>
                      <li>• Display/monitoring unit</li>
                      <li>• Manual override switch</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Control Logic:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Monitor real-time export current</li>
                      <li>• Compare to preset limit (e.g., 16A)</li>
                      <li>• Send curtail signal to inverter</li>
                      <li>• Reduce output to maintain compliance</li>
                      <li>• Log events for DNO reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
                Load-to-Generation Ratio Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Optimizing the load-to-generation ratio maximizes self-consumption, reduces export dependency, and improves system economics while maintaining grid compliance.
              </p>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Calculation Methodology:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Key Parameters:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Daytime load profile:</strong> kW demand 9am-5pm</li>
                      <li>• <strong>Generation profile:</strong> Expected kW output by hour</li>
                      <li>• <strong>Self-consumption ratio:</strong> % of generation used on-site</li>
                      <li>• <strong>Export ratio:</strong> % of generation exported</li>
                      <li>• <strong>Import reduction:</strong> kWh displaced from grid</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Optimization Targets:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Maximize self-consumption:</strong> {">"} 40% for good economics</li>
                      <li>• <strong>Minimize export curtailment:</strong> {"<"} 5% energy loss</li>
                      <li>• <strong>Match peak generation to peak load:</strong> Aligned profiles</li>
                      <li>• <strong>Consider battery storage:</strong> Increase self-consumption</li>
                      <li>• <strong>Load shifting potential:</strong> Time flexible loads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Worked Example - Office Building:</h4>
                <div className="space-y-4 text-sm">
                  <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Building Characteristics:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="text-gray-300 space-y-1">
                        <li>• Annual consumption: 25,000 kWh</li>
                        <li>• Daytime load: 85% of total</li>
                        <li>• Peak demand: 15 kW (2pm)</li>
                        <li>• Base load: 3 kW (overnight)</li>
                      </ul>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Operating hours: 8am-6pm</li>
                        <li>• Weekend operation: Minimal</li>
                        <li>• Seasonal variation: ±20%</li>
                        <li>• Available roof: 80m² south-facing</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-2">System Design Options:</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-gray-300">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-1">System Size</th>
                            <th className="text-left p-1">Annual Generation</th>
                            <th className="text-left p-1">Self-Consumption</th>
                            <th className="text-left p-1">Export</th>
                            <th className="text-left p-1">Economics</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">10 kWp</td>
                            <td className="p-1">8,500 kWh</td>
                            <td className="p-1">65% (5,525 kWh)</td>
                            <td className="p-1">35% (2,975 kWh)</td>
                            <td className="p-1 text-green-400">Optimal</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">15 kWp</td>
                            <td className="p-1">12,750 kWh</td>
                            <td className="p-1">45% (5,738 kWh)</td>
                            <td className="p-1">55% (7,012 kWh)</td>
                            <td className="p-1 text-yellow-400">Good</td>
                          </tr>
                          <tr>
                            <td className="p-1">20 kWp</td>
                            <td className="p-1">17,000 kWh</td>
                            <td className="p-1">35% (5,950 kWh)</td>
                            <td className="p-1">65% (11,050 kWh)</td>
                            <td className="p-1 text-orange-400">Export-dependent</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Grid-tied systems require careful sizing and export planning to avoid DNO breaches and maintain system efficiency. Success depends on understanding site load patterns, DNO constraints, and implementing appropriate export management technologies.
              </p>
              <p className="text-yellow-400 font-medium">
                Proper implementation of export limiting devices and compliance with G99/G100 standards ensures reliable, grid-friendly operation while maximizing economic returns from renewable generation investments.
              </p>
            </CardContent>
          </Card>

          <GridTiedSizingFAQ />
          
          <GridTiedSizingPractical />

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Grid-Tied Sizing and Export Management Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section3;