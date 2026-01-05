import { ArrowLeft, GitBranch, Lightbulb, CheckCircle, AlertTriangle, Info, Settings, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import SystemComparisonFAQ from '@/components/upskilling/renewable-energy/SystemComparisonFAQ';
import SystemComparisonPractical from '@/components/upskilling/renewable-energy/SystemComparisonPractical';

const RenewableEnergyModule6Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which system is best for remote areas with no grid access?",
      options: [
        "Off-grid systems",
        "Grid-tied systems", 
        "Hybrid systems",
        "All systems work equally well"
      ],
      correct: 0,
      explanation: "Off-grid systems are designed specifically for areas without grid access, providing complete energy independence through batteries and backup generation."
    },
    {
      id: 2,
      question: "What's a key drawback of a pure grid-tied system?",
      options: [
        "Higher initial cost",
        "Complex installation process",
        "No backup power during outages",
        "Lower energy efficiency"
      ],
      correct: 2,
      explanation: "Grid-tied systems shut down during grid outages for safety reasons, leaving you without power even when the sun is shining or wind is blowing."
    },
    {
      id: 3,
      question: "Can hybrid systems export energy to the grid?",
      options: [
        "Yes, after batteries are charged",
        "No, never",
        "Only during emergencies",
        "Only with special permits"
      ],
      correct: 0,
      explanation: "Hybrid systems can export excess energy to the grid after satisfying local loads and charging batteries, providing the benefits of both grid-tied and off-grid systems."
    },
    {
      id: 4,
      question: "What's the main benefit of hybrid over off-grid?",
      options: [
        "Lower cost",
        "Grid backup reduces battery requirements",
        "Simpler installation",
        "Better efficiency"
      ],
      correct: 1,
      explanation: "Hybrid systems can rely on the grid as backup, reducing the battery capacity needed compared to pure off-grid systems, lowering overall system cost."
    },
    {
      id: 5,
      question: "Why is battery sizing more critical in off-grid setups?",
      options: [
        "Batteries are more expensive",
        "No grid backup available",
        "Installation is more complex",
        "Maintenance requirements are higher"
      ],
      correct: 1,
      explanation: "Without grid backup, off-grid systems must size batteries to handle all energy storage needs during periods without renewable generation, making proper sizing critical for reliability."
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
              Comparison: Off-Grid, Grid-Tied, and Hybrid Systems
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding the foundational differences between renewable energy system configurations
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
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
                  Identify the components of each configuration
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand operational functionality
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Recognise key pros and cons for each type
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
                This section outlines the foundational differences between the main types of renewable energy system configurations. Understanding these distinctions is crucial for selecting the most appropriate system for specific applications and requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <GitBranch className="h-6 w-6 text-yellow-400" />
                Off-Grid Systems: Total Energy Independence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Off-grid systems operate completely independently from the electricity grid, relying entirely on renewable generation, energy storage, and backup generation to meet all electrical demands.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Renewable generation (solar, wind)</li>
                    <li>• Battery storage system</li>
                    <li>• Backup generator (diesel, gas, petrol)</li>
                    <li>• Charge controller and inverter</li>
                    <li>• Load management systems</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Complete energy independence</li>
                    <li>• Suitable for remote locations</li>
                    <li>• No grid connection costs</li>
                    <li>• Unaffected by grid outages</li>
                    <li>• Can be scaled to any size</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-3">Challenges and Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Higher initial capital cost</li>
                      <li>• Requires larger battery capacity</li>
                      <li>• Generator maintenance and fuel costs</li>
                      <li>• Complex load management needed</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Weather-dependent reliability</li>
                      <li>• Professional maintenance required</li>
                      <li>• Energy efficiency critical</li>
                      <li>• Backup planning essential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Grid-Tied Systems: Lower Cost, Grid Dependency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Grid-tied systems are directly connected to the utility grid, allowing for energy import and export without the need for local energy storage or backup generation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Key Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Grid-tie inverter (no battery storage)</li>
                    <li>• Net metering capability</li>
                    <li>• Automatic grid synchronisation</li>
                    <li>• Anti-islanding protection</li>
                    <li>• Simplified system design</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Lowest initial cost</li>
                    <li>• No battery maintenance</li>
                    <li>• Grid acts as infinite storage</li>
                    <li>• High overall efficiency</li>
                    <li>• Simple installation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <h4 className="text-red-400 font-semibold mb-3">Limitations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• No backup power during outages</li>
                      <li>• Grid dependency for operation</li>
                      <li>• Subject to utility regulations</li>
                      <li>• Variable feed-in tariff rates</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Cannot operate during grid failures</li>
                      <li>• Export limitations may apply</li>
                      <li>• Potential curtailment issues</li>
                      <li>• No energy security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-6 w-6 text-purple-400" />
                Hybrid Systems: Best of Both Worlds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Hybrid systems combine grid connection with local energy storage, providing both grid interaction capabilities and backup power during outages.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">System Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Hybrid inverter with battery interface</li>
                    <li>• Battery storage system</li>
                    <li>• Grid connection and metering</li>
                    <li>• Energy management system</li>
                    <li>• Optional backup generator</li>
                  </ul>
                </div>
                <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                  <h4 className="text-teal-400 font-semibold mb-3">Operating Modes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Grid-tied mode (normal operation)</li>
                    <li>• Battery backup mode (outages)</li>
                    <li>• Peak shaving mode (cost optimisation)</li>
                    <li>• Off-grid mode (grid disconnection)</li>
                    <li>• Export control mode</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Hybrid System Advantages:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Energy Security:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Backup power during outages</li>
                      <li>• Grid support when available</li>
                      <li>• Reduced battery requirements</li>
                      <li>• Flexible operation modes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Economic Benefits:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Time-of-use optimisation</li>
                      <li>• Peak demand reduction</li>
                      <li>• Export revenue potential</li>
                      <li>• Lower battery costs vs off-grid</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Technical Advantages:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Grid stabilisation</li>
                      <li>• Load balancing capability</li>
                      <li>• System redundancy</li>
                      <li>• Scalable design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                Cost, Reliability, and Design Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Each system configuration involves different cost structures, reliability characteristics, and design requirements that must be carefully evaluated based on specific application needs.
              </p>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Comparative Analysis:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Aspect</th>
                        <th className="text-left p-2">Off-Grid</th>
                        <th className="text-left p-2">Grid-Tied</th>
                        <th className="text-left p-2">Hybrid</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Initial Cost</td>
                        <td className="p-2 text-red-400">Highest</td>
                        <td className="p-2 text-green-400">Lowest</td>
                        <td className="p-2 text-yellow-400">Medium</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Backup Power</td>
                        <td className="p-2 text-green-400">Yes</td>
                        <td className="p-2 text-red-400">No</td>
                        <td className="p-2 text-green-400">Yes</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Grid Export</td>
                        <td className="p-2 text-red-400">No</td>
                        <td className="p-2 text-green-400">Yes</td>
                        <td className="p-2 text-green-400">Yes</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Maintenance</td>
                        <td className="p-2 text-red-400">High</td>
                        <td className="p-2 text-green-400">Low</td>
                        <td className="p-2 text-yellow-400">Medium</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Complexity</td>
                        <td className="p-2 text-red-400">High</td>
                        <td className="p-2 text-green-400">Low</td>
                        <td className="p-2 text-yellow-400">Medium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Off-Grid Ideal For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Remote locations</li>
                    <li>• High grid connection costs</li>
                    <li>• Critical power applications</li>
                    <li>• Energy independence priorities</li>
                    <li>• Poor grid reliability areas</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Grid-Tied Ideal For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Urban/suburban locations</li>
                    <li>• Cost-sensitive projects</li>
                    <li>• Good grid reliability</li>
                    <li>• Net metering available</li>
                    <li>• Simple installations</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Hybrid Ideal For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Unreliable grid areas</li>
                    <li>• High electricity rates</li>
                    <li>• Critical loads present</li>
                    <li>• Time-of-use tariffs</li>
                    <li>• Future grid expansion</li>
                  </ul>
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
                Each system type offers different advantages depending on site constraints, user needs, and financial priorities. Off-grid systems provide complete independence but at higher cost and complexity. Grid-tied systems offer the lowest cost and simplest operation but lack backup capability. Hybrid systems combine the benefits of both approaches, providing grid interaction with energy security.
              </p>
              <p className="text-yellow-400 font-medium">
                The choice between configurations should be based on thorough analysis of site conditions, load requirements, grid reliability, economic factors, and user priorities for energy security versus cost optimisation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-cyan-400" />
                Real-World Case Studies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding how different system configurations perform in real applications helps inform design decisions for specific use cases.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Case Study 1: Remote Farm</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-white font-medium">System Details:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Location: Rural Australia, 15km from grid</li>
                        <li>• Load: 25 kWh/day average</li>
                        <li>• System: 12kW solar + 60kWh lithium + 8kW diesel backup</li>
                        <li>• Configuration: Off-grid with automated generator</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Results:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 95% renewable energy fraction</li>
                        <li>• Generator runs 3-4 hours/week in winter</li>
                        <li>• ROI achieved in 6 years vs grid extension</li>
                        <li>• 99.8% system availability</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Case Study 2: Suburban Home</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-white font-medium">System Details:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Location: Perth, Australia</li>
                        <li>• Load: 18 kWh/day average</li>
                        <li>• System: 8kW solar, grid-tied with 5kW/13.5kWh battery backup</li>
                        <li>• Configuration: Hybrid system</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Results:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 85% energy independence</li>
                        <li>• £800/year export revenue</li>
                        <li>• Backup power during 12 outages/year</li>
                        <li>• 8-year payback period</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Case Study 3: Commercial Building</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-white font-medium">System Details:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Location: Manchester office building</li>
                        <li>• Load: 150 kWh/day weekdays</li>
                        <li>• System: 50kW solar, grid-tied only</li>
                        <li>• Configuration: Pure grid-tied</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Results:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 35% on-site consumption</li>
                        <li>• £4,200/year electricity savings</li>
                        <li>• No backup during outages (not critical)</li>
                        <li>• 5.5-year simple payback</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Compass className="h-6 w-6 text-teal-400" />
                System Selection Decision Tree
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                A structured approach to selecting the most appropriate system configuration based on key decision factors.
              </p>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-teal-400 font-semibold mb-3">Decision Framework:</h4>
                
                <div className="space-y-4 text-sm">
                  <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                    <h5 className="text-red-400 font-medium mb-2">Step 1: Grid Availability Assessment</h5>
                    <ul className="text-gray-300 space-y-1">
                       <li>• <strong>No grid access:</strong> Off-grid is only option</li>
                       <li>• <strong>Grid connection cost {">£15,000:"}</strong> Consider off-grid</li>
                       <li>• <strong>Reliable grid available:</strong> Consider grid-tied or hybrid</li>
                       <li>• <strong>Unreliable grid {"(>10 outages/year):"}</strong> Hybrid recommended</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Step 2: Load Criticality Analysis</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Critical loads present:</strong> Require backup power (off-grid or hybrid)</li>
                      <li>• <strong>Non-critical loads only:</strong> Grid-tied acceptable</li>
                      <li>• <strong>Medical equipment:</strong> Off-grid with redundancy</li>
                      <li>• <strong>Business continuity required:</strong> Hybrid with adequate storage</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Step 3: Economic Considerations</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Budget constrained:</strong> Grid-tied lowest initial cost</li>
                      <li>• <strong>High electricity rates:</strong> All systems viable</li>
                      <li>• <strong>Good feed-in tariffs:</strong> Grid-tied or hybrid preferred</li>
                      <li>• <strong>Time-of-use rates:</strong> Hybrid with battery storage optimal</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-2">Step 4: Site and Environmental Factors</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Excellent renewable resource:</strong> All systems viable</li>
                      <li>• <strong>Poor renewable resource:</strong> Grid-tied with maximum export</li>
                      <li>• <strong>Remote location:</strong> Off-grid with generator backup</li>
                      <li>• <strong>Urban/suburban:</strong> Grid-tied or hybrid</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-teal-400 font-semibold mb-3">Quick Selection Guide:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Choose Off-Grid When:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>✓ No grid access available</li>
                      <li>✓ Grid connection cost {">"} system cost</li>
                      <li>✓ Complete energy independence desired</li>
                      <li>✓ Critical loads require 100% reliability</li>
                      <li>✓ Grid power quality inadequate</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-2">Choose Grid-Tied When:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>✓ Reliable grid available</li>
                      <li>✓ Lowest cost priority</li>
                      <li>✓ No critical loads present</li>
                      <li>✓ Good net metering available</li>
                      <li>✓ Minimal maintenance desired</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                    <h5 className="text-purple-400 font-medium mb-2">Choose Hybrid When:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>✓ Unreliable grid available</li>
                      <li>✓ Some critical loads present</li>
                      <li>✓ High electricity rates</li>
                      <li>✓ Time-of-use tariffs available</li>
                      <li>✓ Future energy independence desired</li>
                    </ul>
                  </div>
                </div>
              </div>
             </CardContent>
            </Card>

          <SystemComparisonFAQ />
          
          <SystemComparisonPractical />

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
                title="System Configuration Comparison Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section1;