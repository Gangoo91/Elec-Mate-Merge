import { ArrowLeft, ArrowRight, Settings, Battery, Grid3X3, Network, Power, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule5Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which system provides power during grid outages?",
      options: [
        "Grid-tied systems only",
        "Off-grid and hybrid systems with battery backup",
        "All solar systems automatically",
        "Only micro-inverter systems"
      ],
      correct: 1,
      explanation: "Off-grid and hybrid systems with battery backup can provide power during outages. Standard grid-tied systems shut down for safety when the grid fails."
    },
    {
      id: 2,
      question: "What's the main drawback of grid-tied systems?",
      options: [
        "Higher installation costs",
        "Lower efficiency",
        "No power during grid outages",
        "Cannot sell excess energy"
      ],
      correct: 2,
      explanation: "Grid-tied systems shut down during outages for safety reasons, leaving you without power even if the sun is shining and panels are producing electricity."
    },
    {
      id: 3,
      question: "Can hybrid systems work without the grid?",
      options: [
        "No, they always require grid connection",
        "Yes, they can operate independently when needed",
        "Only during daytime hours",
        "Only with special permits"
      ],
      correct: 1,
      explanation: "Hybrid systems are designed to work with or without the grid, providing flexibility to operate independently during outages or when desired."
    },
    {
      id: 4,
      question: "Which system typically needs the most battery storage?",
      options: [
        "Grid-tied systems",
        "Hybrid systems", 
        "Off-grid systems",
        "All systems need equal storage"
      ],
      correct: 2,
      explanation: "Off-grid systems need the most storage as they must store enough energy to meet all electrical needs during periods without solar generation."
    },
    {
      id: 5,
      question: "Which system is most suitable for remote rural areas?",
      options: [
        "Grid-tied systems",
        "Hybrid systems",
        "Off-grid systems",
        "Micro-inverter systems"
      ],
      correct: 2,
      explanation: "Off-grid systems are ideal for remote areas where grid connection is unavailable or prohibitively expensive, providing complete energy independence."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Grid-Tied vs Off-Grid vs Hybrid Configurations
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding different system configurations and their optimal applications
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                System Configurations
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
                  Define grid-tied, off-grid, and hybrid system configurations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand how each configuration manages power flow and storage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify optimal use cases based on location, budget, and energy goals
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
                Solar installations can be configured in three primary ways: grid-tied, off-grid, and hybrid systems. Each configuration serves different needs and offers unique advantages and limitations. Understanding these differences is crucial for selecting the right system design for specific applications, budgets, and energy independence goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid3X3 className="h-6 w-6 text-yellow-400" />
                Grid-Tied Systems: Maximum Economy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Grid-tied systems connect directly to the utility grid without battery storage, offering the most cost-effective entry into solar energy with excellent return on investment through net metering.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solar panels:</strong> Generate DC electricity</li>
                    <li>• <strong>Grid-tie inverter:</strong> Converts DC to grid-synchronised AC</li>
                    <li>• <strong>Net meter:</strong> Measures energy flow bidirectionally</li>
                    <li>• <strong>Grid connection:</strong> Direct utility interconnection</li>
                    <li>• <strong>Monitoring system:</strong> Performance tracking</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Power Flow Management:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Daytime surplus:</strong> Excess power feeds to grid</li>
                    <li>• <strong>Net metering credits:</strong> Utility credits for export</li>
                    <li>• <strong>Evening draw:</strong> Import from grid when needed</li>
                    <li>• <strong>Automatic switching:</strong> Seamless import/export</li>
                    <li>• <strong>Zero storage:</strong> Grid acts as virtual battery</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Advantages and Limitations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-green-400 font-medium mb-2">Advantages:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Lowest upfront investment cost</li>
                      <li>• Highest return on investment</li>
                      <li>• No battery maintenance required</li>
                      <li>• Net metering maximises savings</li>
                      <li>• Grid provides unlimited backup capacity</li>
                      <li>• Simpler installation and permitting</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-red-400 font-medium mb-2">Limitations:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• No power during grid outages</li>
                      <li>• Dependent on net metering policies</li>
                      <li>• No energy independence</li>
                      <li>• Vulnerable to rate structure changes</li>
                      <li>• Cannot provide emergency backup</li>
                      <li>• Export limitations may apply</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-green-400" />
                Off-Grid Systems: Complete Independence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Off-grid systems operate independently from the utility grid, relying entirely on solar generation and battery storage to meet all electrical needs.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Essential Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solar array:</strong> Sized for peak demand + storage</li>
                    <li>• <strong>Charge controller:</strong> MPPT for battery charging</li>
                    <li>• <strong>Battery bank:</strong> Deep-cycle storage system</li>
                    <li>• <strong>Off-grid inverter:</strong> DC to AC conversion</li>
                    <li>• <strong>Backup generator:</strong> Emergency power source</li>
                    <li>• <strong>System monitoring:</strong> SOC and performance tracking</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Energy Management:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solar charging:</strong> Batteries charged during day</li>
                    <li>• <strong>Load prioritisation:</strong> Critical vs non-critical loads</li>
                    <li>• <strong>Battery cycling:</strong> Daily charge/discharge cycles</li>
                    <li>• <strong>Generator backup:</strong> Automatic start during low SOC</li>
                    <li>• <strong>Load shedding:</strong> Non-essential load disconnection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Sizing Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Daily Energy Budget:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Calculate total daily kWh needs</li>
                      <li>• Include inefficiency losses (20-30%)</li>
                      <li>• Plan for seasonal variations</li>
                      <li>• Consider future load growth</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Battery Capacity:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 3-7 days autonomy typical</li>
                      <li>• Depth of discharge limitations</li>
                      <li>• Temperature derating factors</li>
                      <li>• Battery technology selection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Array Sizing:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Worst-case month solar irradiance</li>
                      <li>• Charge efficiency factors</li>
                      <li>• System losses and derating</li>
                      <li>• Seasonal tilt optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-6 w-6 text-purple-400" />
                Hybrid Systems: Best of Both Worlds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Hybrid systems combine grid connection with battery storage, offering flexibility to operate with or without the grid while providing backup power and energy independence options.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">System Architecture:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Hybrid inverter:</strong> Multi-mode operation capability</li>
                    <li>• <strong>Battery storage:</strong> Lithium or lead-acid options</li>
                    <li>• <strong>Grid connection:</strong> Import/export capability</li>
                    <li>• <strong>Critical load panel:</strong> Priority circuit protection</li>
                    <li>• <strong>Smart controls:</strong> Automatic mode switching</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Operating Modes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Grid-tie mode:</strong> Normal grid-connected operation</li>
                    <li>• <strong>Backup mode:</strong> Islanded operation during outages</li>
                    <li>• <strong>Self-consumption:</strong> Battery-first energy use</li>
                    <li>• <strong>Time-of-use:</strong> Rate arbitrage optimization</li>
                    <li>• <strong>Peak shaving:</strong> Demand charge reduction</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Smart Energy Management:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <div className="p-3 bg-gray-800 rounded">
                    <h5 className="text-white font-medium mb-2">Intelligent Load Prioritisation:</h5>
                    <ul className="space-y-1">
                      <li>• <strong>Critical loads:</strong> Essential circuits powered during outages</li>
                      <li>• <strong>Non-critical loads:</strong> Grid-dependent systems</li>
                      <li>• <strong>Scheduled loads:</strong> Time-based operation (pool pumps, EVs)</li>
                      <li>• <strong>Load shedding:</strong> Automatic demand management</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-800 rounded">
                    <h5 className="text-white font-medium mb-2">Advanced Control Strategies:</h5>
                    <ul className="space-y-1">
                      <li>• Weather forecasting integration for charging optimization</li>
                      <li>• Grid signal response for demand response programmes</li>
                      <li>• Machine learning for consumption pattern optimization</li>
                      <li>• Remote monitoring and control capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-orange-400" />
                Configuration Selection Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Choosing the right configuration depends on multiple factors including grid availability, budget, energy independence goals, and backup power requirements.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Grid-Tied Best For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Urban/suburban locations:</strong> Reliable grid access</li>
                    <li>• <strong>Budget-conscious users:</strong> Lowest upfront cost</li>
                    <li>• <strong>ROI-focused projects:</strong> Maximum financial returns</li>
                    <li>• <strong>Simple installations:</strong> Minimal complexity</li>
                    <li>• <strong>Net metering available:</strong> Good utility rates</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Off-Grid Best For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Remote locations:</strong> No grid access available</li>
                    <li>• <strong>High grid connection costs:</strong> £10k+ for grid extension</li>
                    <li>• <strong>Energy independence:</strong> Complete self-sufficiency goals</li>
                    <li>• <strong>Stable loads:</strong> Predictable energy consumption</li>
                    <li>• <strong>Environmental concerns:</strong> Zero grid dependence</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Hybrid Best For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Backup power needs:</strong> Critical load protection</li>
                    <li>• <strong>TOU rate structures:</strong> Peak hour cost avoidance</li>
                    <li>• <strong>Unreliable grid:</strong> Frequent outage areas</li>
                    <li>• <strong>Future flexibility:</strong> Changing energy needs</li>
                    <li>• <strong>Advanced users:</strong> Energy management interest</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Economic Comparison:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Factor</th>
                        <th className="text-left p-2">Grid-Tied</th>
                        <th className="text-left p-2">Off-Grid</th>
                        <th className="text-left p-2">Hybrid</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Initial Cost</td>
                        <td className="p-2 text-green-400">£4-6k/kW</td>
                        <td className="p-2 text-red-400">£12-18k/kW</td>
                        <td className="p-2 text-yellow-400">£8-12k/kW</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Payback Period</td>
                        <td className="p-2 text-green-400">6-10 years</td>
                        <td className="p-2 text-red-400">15-25 years</td>
                        <td className="p-2 text-yellow-400">10-15 years</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Maintenance Cost</td>
                        <td className="p-2 text-green-400">Very Low</td>
                        <td className="p-2 text-red-400">High</td>
                        <td className="p-2 text-yellow-400">Medium</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Energy Independence</td>
                        <td className="p-2 text-red-400">None</td>
                        <td className="p-2 text-green-400">Complete</td>
                        <td className="p-2 text-yellow-400">Partial</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: Configuration Decision Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A rural property owner evaluates different system configurations based on their specific circumstances and requirements.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">Property Assessment:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Site Characteristics:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Location: Rural property, 2km from nearest grid</li>
                      <li>• Grid connection cost: £15,000 estimate</li>
                      <li>• Load profile: 25kWh/day average consumption</li>
                      <li>• Critical loads: Refrigeration, security, heating controls</li>
                      <li>• Budget: £25,000 available for solar installation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Configuration Analysis:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Grid-tied:</strong> £40k total (grid + solar) - Not viable</li>
                      <li>• <strong>Off-grid:</strong> £22k for complete system - Feasible</li>
                      <li>• <strong>Hybrid:</strong> £45k total cost - Over budget</li>
                      <li>• <strong>Decision:</strong> Off-grid with future grid connection option</li>
                      <li>• <strong>ROI:</strong> Energy independence vs grid connection avoided</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Implementation Strategy:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Phase 1:</strong> Install off-grid system with oversized inverter</li>
                  <li>• <strong>Phase 2:</strong> Monitor performance and grid extension possibility</li>
                  <li>• <strong>Phase 3:</strong> Retrofit to hybrid if grid becomes available</li>
                  <li>• <strong>Benefits:</strong> Immediate energy independence and future flexibility</li>
                  <li>• <strong>Cost avoided:</strong> £15k grid connection fee deferred</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The choice between grid-tied, off-grid, and hybrid configurations depends on site-specific factors including grid availability, budget constraints, backup power requirements, and energy independence goals. Grid-tied systems offer the best economics where grid access is available, off-grid systems provide complete independence for remote locations, and hybrid systems deliver flexibility with backup capabilities.
              </p>
              <p className="text-yellow-400 font-medium">
                Hybrid systems represent the most flexible option, allowing users to optimize between grid interaction and energy independence based on changing needs and utility rate structures.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Can I switch from grid-tied to hybrid later without replacing everything?</h4>
                  <p className="text-gray-300 text-sm">
                    You can add AC-coupled battery storage to existing grid-tied systems, but this requires an additional battery inverter and is less efficient than DC-coupled systems. Alternatively, replacing the string inverter with a hybrid inverter provides better integration. Budget 40-60% of original system cost for a meaningful retrofit with 10-15kWh storage.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How much battery storage do I need for different backup requirements?</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>Essential loads only (8-12 hours):</strong> 5-10kWh<br/>
                    <strong>Partial house backup (24 hours):</strong> 15-25kWh<br/>
                    <strong>Whole house backup (2-3 days):</strong> 30-50kWh<br/>
                    <strong>Off-grid (3-7 days autonomy):</strong> 50-100kWh+<br/>
                    Consider load prioritisation and generator backup to reduce storage requirements and costs.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Is off-grid solar cost-effective compared to grid extension?</h4>
                  <p className="text-gray-300 text-sm">
                    Off-grid becomes cost-effective when grid connection costs exceed £15,000-30,000 (typically {'>'} 500m from nearest connection). Consider ongoing grid costs (standing charges, peak demand charges) vs off-grid maintenance. Off-grid requires lifestyle adjustments and backup generators for reliability, but provides energy independence and fixed long-term costs.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">What's the payback period difference between system configurations?</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>Grid-tied:</strong> 6-10 years (best ROI)<br/>
                    <strong>Hybrid (without TOU optimisation):</strong> 10-15 years<br/>
                    <strong>Hybrid (with TOU/backup value):</strong> 8-12 years<br/>
                    <strong>Off-grid:</strong> 15-25 years (hard to quantify independence value)<br/>
                    Payback improves with higher self-consumption rates and time-of-use tariffs.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Can hybrid systems participate in grid services for additional revenue?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes, hybrid systems can provide frequency response, voltage support, and peak shaving services. Revenue potential: £200-1000+ annually depending on battery size and local market. Requires smart inverters with grid-following capabilities and aggregator partnerships. Check DNO approval requirements for grid service participation.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How do I optimise system configuration for time-of-use tariffs?</h4>
                  <p className="text-gray-300 text-sm">
                    Size batteries for 80-100% of evening peak consumption. Program charging during off-peak periods (often 00:30-06:30) and discharging during peak periods (16:00-19:00). Consider solar generation timing vs peak periods - winter peak periods may require grid charging while summer allows solar charging. Typical savings: 10-25p/kWh arbitrage value.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                title="System Configuration Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule5Section3;