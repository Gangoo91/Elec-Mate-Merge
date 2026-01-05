import { ArrowLeft, Shield, Power, Home, AlertTriangle, Settings, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule4Section6 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is islanding, and why is it a safety concern?",
      options: [
        "A method to improve battery efficiency",
        "When a distributed generator continues to power a local area after grid disconnection, creating safety hazards for maintenance workers",
        "A type of battery installation method",
        "A grid connection protocol"
      ],
      correct: 1,
      explanation: "Islanding occurs when distributed generation continues to energise a local grid section after the main grid has been disconnected, creating potentially fatal hazards for utility workers who may think the lines are de-energised."
    },
    {
      id: 2,
      question: "Can hybrid inverters work without the grid?",
      options: [
        "No, they require constant grid connection",
        "Only during daylight hours",
        "Yes, they can switch to off-grid mode and operate independently using battery power",
        "Only with special government permits"
      ],
      correct: 2,
      explanation: "Hybrid inverters are designed to operate in multiple modes, including off-grid operation where they form their own grid using battery power to supply local loads when the main grid is unavailable."
    },
    {
      id: 3,
      question: "What's a typical use case for backup-only battery systems?",
      options: [
        "Daily load shifting to save money",
        "Emergency power for critical loads during grid outages",
        "Improving solar panel efficiency",
        "Reducing battery degradation"
      ],
      correct: 1,
      explanation: "Backup-only systems are designed specifically to provide emergency power during grid outages, typically for critical loads like medical equipment, security systems, or essential lighting, rather than daily cycling for economic benefits."
    },
    {
      id: 4,
      question: "What role does the ATS (Automatic Transfer Switch) play?",
      options: [
        "Converts DC to AC power",
        "Monitors battery state of charge",
        "Automatically switches loads between grid and backup power sources",
        "Controls solar panel output"
      ],
      correct: 2,
      explanation: "An ATS automatically switches loads between the primary grid supply and backup power sources (battery/generator) when power failures are detected, ensuring seamless transition for critical loads."
    },
    {
      id: 5,
      question: "What's the key tradeoff in off-grid systems?",
      options: [
        "Cost vs performance",
        "System reliability vs complexity and cost - overbuilding for worst-case scenarios",
        "Battery type vs solar panel type",
        "AC vs DC coupling"
      ],
      correct: 1,
      explanation: "Off-grid systems must be sized for worst-case scenarios (lowest solar production, highest consumption), leading to oversized and expensive systems to ensure reliability during adverse conditions."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Backup Power and Grid-Independent Operation
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Reliable power systems for outages and autonomous operation
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Backup Systems
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
                  Set up backup systems for critical loads and whole-home protection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand islanding requirements and grid-disconnection safety rules
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Design autonomous systems and hybrid backup configurations
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
                One of the most valuable benefits of battery storage systems is providing reliable power when the grid fails or isn't available. This section explores backup power configurations, safety requirements, and design considerations for both emergency backup and completely autonomous operation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Home className="h-6 w-6 text-yellow-400" />
                Backup System Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Backup systems can be configured to protect either essential loads only or provide whole-home backup, with different approaches suitable for various applications and budgets.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Essential Loads Backup:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Critical circuits only:</strong> Lighting, refrigeration, heating controls</li>
                    <li>• <strong>Lower capacity required:</strong> 5-15kWh typical residential</li>
                    <li>• <strong>Dedicated backup panel:</strong> Pre-selected essential circuits</li>
                    <li>• <strong>Extended runtime:</strong> 8-24 hours typical duration</li>
                    <li>• <strong>Cost-effective approach:</strong> Lower initial investment</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Whole Home Backup:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Complete load coverage:</strong> All circuits remain powered</li>
                    <li>• <strong>Higher capacity needed:</strong> 20-40kWh+ residential systems</li>
                    <li>• <strong>Seamless operation:</strong> No lifestyle changes during outages</li>
                    <li>• <strong>Shorter runtime:</strong> 4-12 hours at full load</li>
                    <li>• <strong>Premium solution:</strong> Higher cost but maximum convenience</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Load Prioritisation Strategy:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Priority 1 - Critical (Always On):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Medical equipment</li>
                      <li>• Security systems</li>
                      <li>• Emergency lighting</li>
                      <li>• Communication systems</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Priority 2 - Essential (Managed):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Refrigeration</li>
                      <li>• Heating/cooling controls</li>
                      <li>• IT equipment</li>
                      <li>• Basic lighting</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Priority 3 - Optional (Shed First):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Electric vehicle charging</li>
                      <li>• Water heating</li>
                      <li>• High-power appliances</li>
                      <li>• Non-essential lighting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Power className="h-6 w-6 text-green-400" />
                UPS vs Battery Storage Differences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                While both UPS and battery storage systems provide backup power, they serve different purposes and have distinct operating characteristics and applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">UPS (Uninterruptible Power Supply):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Instantaneous switching:</strong> 0ms transfer time</li>
                    <li>• <strong>Short duration:</strong> 5-30 minutes typical runtime</li>
                    <li>• <strong>Power conditioning:</strong> Clean, stable AC output</li>
                    <li>• <strong>IT equipment focus:</strong> Servers, computers, telecommunications</li>
                    <li>• <strong>Graceful shutdown:</strong> Time to save work and shut down safely</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Battery Storage Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Fast switching:</strong> 10-100ms transfer time typical</li>
                    <li>• <strong>Extended duration:</strong> Hours to days of operation</li>
                    <li>• <strong>Whole facility backup:</strong> Complete electrical system support</li>
                    <li>• <strong>Solar integration:</strong> Renewable energy charging capability</li>
                    <li>• <strong>Multi-mode operation:</strong> Backup, load shifting, peak shaving</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Hybrid Approach - UPS + Battery Storage:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Critical IT loads:</strong> Protected by UPS for instant response and power conditioning</p>
                  <p><strong>Building systems:</strong> Backed up by battery storage for extended operation</p>
                  <p><strong>Seamless integration:</strong> UPS maintains critical systems while battery storage handles facilities</p>
                  <p><strong>Cost optimization:</strong> Right-sized solutions for different load types</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                Grid Isolation Safety and Anti-Islanding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Safety regulations require backup systems to disconnect from the grid during outages to prevent islanding, which poses serious risks to utility workers and equipment.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Islanding Hazards:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Worker safety:</strong> Utility staff assume lines are dead</li>
                    <li>• <strong>Equipment damage:</strong> Out-of-phase reconnection</li>
                    <li>• <strong>Voltage/frequency drift:</strong> Uncontrolled power quality</li>
                    <li>• <strong>Fire risk:</strong> Overloading and protection failure</li>
                    <li>• <strong>Legal liability:</strong> Violation of grid connection agreements</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">G99 Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Loss of mains protection:</strong> Mandatory detection systems</li>
                    <li>• <strong>Disconnection time:</strong> &lt;2 seconds for grid loss</li>
                    <li>• <strong>Reconnection delay:</strong> 20-second minimum wait period</li>
                    <li>• <strong>Voltage/frequency monitoring:</strong> Continuous grid parameter checking</li>
                    <li>• <strong>Communication protocols:</strong> Grid operator notification requirements</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Protection Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage monitoring:</strong> Over/under voltage detection</li>
                    <li>• <strong>Frequency monitoring:</strong> Rate of change of frequency (ROCOF)</li>
                    <li>• <strong>Vector shift:</strong> Phase angle change detection</li>
                    <li>• <strong>Communication-based:</strong> Direct grid operator signals</li>
                    <li>• <strong>Physical isolation:</strong> Contactors and transfer switches</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-400" />
                Generator-Battery Hybrid Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Combining generators with battery storage creates robust backup systems that leverage the quick response of batteries with the extended runtime capability of fuel-powered generators.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">System Architecture:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Battery provides instant response:</strong> 10-100ms switching</li>
                    <li>• <strong>Generator auto-start:</strong> 30-60 seconds to full power</li>
                    <li>• <strong>Seamless handover:</strong> Battery maintains loads during gen start</li>
                    <li>• <strong>Load sharing:</strong> Both sources can run simultaneously</li>
                    <li>• <strong>Intelligent control:</strong> Coordinated operation management</li>
                  </ul>
                  </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Advanced Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Microgrid formation:</strong> Create standalone power networks</li>
                    <li>• <strong>Black start capability:</strong> Restart grid sections after blackouts</li>
                    <li>• <strong>Fuel cell integration:</strong> Hydrogen backup for extended duration</li>
                    <li>• <strong>Multi-energy systems:</strong> Heat pumps and thermal storage</li>
                    <li>• <strong>Smart load management:</strong> Automatic prioritization during emergencies</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Operational Benefits:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Extended runtime:</strong> Unlimited with fuel supply</li>
                  <li>• <strong>Fuel efficiency:</strong> Generator runs at optimal load</li>
                  <li>• <strong>Reduced generator cycling:</strong> Battery handles short outages</li>
                  <li>• <strong>Peak load support:</strong> Battery supplements generator capacity</li>
                  <li>• <strong>Maintenance scheduling:</strong> Battery covers generator service periods</li>
                </ul>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Control Logic Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Short Outages (&lt;30 minutes):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Battery provides full backup power</li>
                      <li>• Generator remains off (noise/emissions)</li>
                      <li>• Automatic grid reconnection when restored</li>
                      <li>• Battery recharges from grid</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Extended Outages (&gt;30 minutes):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Generator auto-starts after battery SOC threshold</li>
                      <li>• Battery continues supplying critical loads</li>
                      <li>• Generator charges battery and supplies loads</li>
                      <li>• Optimal generator loading for efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                Off-Grid System Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Off-grid systems must be completely self-sufficient, requiring careful sizing and design to ensure reliable operation under all conditions without grid backup.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Design Challenges:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Worst-case sizing:</strong> Must handle minimum renewable generation</li>
                    <li>• <strong>Seasonal variations:</strong> Winter solar production significantly lower</li>
                    <li>• <strong>Load growth planning:</strong> Future consumption increases</li>
                    <li>• <strong>Equipment redundancy:</strong> No grid backup for failures</li>
                    <li>• <strong>Maintenance accessibility:</strong> Remote location considerations</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">System Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Oversized PV array:</strong> 150-300% of annual consumption</li>
                    <li>• <strong>Large battery bank:</strong> 3-7 days autonomy typical</li>
                    <li>• <strong>Backup generation:</strong> Generator for extended low-generation periods</li>
                    <li>• <strong>Load management:</strong> Automatic load shedding capabilities</li>
                    <li>• <strong>System monitoring:</strong> Remote diagnostics and alerts</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-3">Off-Grid Sizing Example (Remote Cabin):</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Energy Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Daily consumption: 8 kWh average</li>
                      <li>• Winter peak: 12 kWh/day</li>
                      <li>• Autonomy target: 5 days</li>
                      <li>• Peak load: 3kW simultaneous</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">System Sizing:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• PV array: 8kW (worst-case conditions)</li>
                      <li>• Battery bank: 60kWh usable (5-day autonomy)</li>
                      <li>• Inverter: 5kW (peak load + margin)</li>
                      <li>• Generator: 7kW (battery charging + loads)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Hospital Critical Power System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A 200-bed NHS hospital implements a comprehensive backup power system combining batteries, generators, and UPS systems for different criticality levels.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Multi-Tier Backup Architecture:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Tier 1 - Life Critical:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• UPS: Instant response (0ms)</li>
                      <li>• Operating theatres, ICU, life support</li>
                      <li>• 15-minute runtime to generator start</li>
                      <li>• Redundant UPS systems with bypass</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Tier 2 - Essential Services:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Battery storage: 50ms response</li>
                      <li>• Emergency lighting, elevators, IT systems</li>
                      <li>• 2-hour runtime from 500kWh battery</li>
                      <li>• Generator charging capability</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Tier 3 - General Loads:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Generator: 60-second start time</li>
                      <li>• General lighting, HVAC, non-critical equipment</li>
                      <li>• 72-hour fuel capacity on-site</li>
                      <li>• Automatic load shedding if required</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">System Performance:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Reliability achieved:</strong> 99.999% uptime for critical loads</li>
                  <li>• <strong>Testing regime:</strong> Monthly backup system tests under load</li>
                  <li>• <strong>Maintenance strategy:</strong> Redundancy allows online servicing</li>
                  <li>• <strong>Cost savings:</strong> Battery systems reduce generator runtime by 70%</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Microgrid and Community Resilience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced backup systems can form microgrids that provide community-wide resilience, enabling multiple properties to share resources during extended outages.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Microgrid Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Central battery storage:</strong> Community-scale 500kWh+ systems</li>
                    <li>• <strong>Distributed generation:</strong> Multiple PV and CHP sources</li>
                    <li>• <strong>Smart grid controller:</strong> Coordinated power management</li>
                    <li>• <strong>Islanding protection:</strong> Safe disconnection from main grid</li>
                    <li>• <strong>Load balancing:</strong> Real-time supply-demand matching</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Community Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Shared costs:</strong> Lower per-household investment</li>
                    <li>• <strong>Extended duration:</strong> Days to weeks of autonomy</li>
                    <li>• <strong>Resource pooling:</strong> Optimize generation and storage</li>
                    <li>• <strong>Emergency services:</strong> Maintain critical infrastructure</li>
                    <li>• <strong>Economic benefits:</strong> Grid services revenue sharing</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Implementation Challenges:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Regulatory approval:</strong> DNO permissions required</li>
                    <li>• <strong>Legal framework:</strong> Energy sharing agreements</li>
                    <li>• <strong>Technical coordination:</strong> Complex control systems</li>
                    <li>• <strong>Cost allocation:</strong> Fair billing mechanisms</li>
                    <li>• <strong>Maintenance responsibilities:</strong> Shared ownership models</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Integration with Renewable Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern backup systems integrate multiple renewable sources and storage technologies to provide robust, sustainable emergency power capabilities.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Multi-Source Integration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solar PV arrays:</strong> Primary renewable generation source</li>
                    <li>• <strong>Wind turbines:</strong> Complementary generation profiles</li>
                    <li>• <strong>Hydroelectric:</strong> Consistent baseload generation</li>
                    <li>• <strong>Fuel cells:</strong> Hydrogen-powered extended backup</li>
                    <li>• <strong>Biogas generators:</strong> Waste-to-energy systems</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Hybrid Storage Solutions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Battery banks:</strong> Fast response and cycling capability</li>
                    <li>• <strong>Compressed air:</strong> Long-duration mechanical storage</li>
                    <li>• <strong>Flywheel systems:</strong> High-power, short-duration support</li>
                    <li>• <strong>Pumped hydro:</strong> Large-scale gravitational storage</li>
                    <li>• <strong>Thermal storage:</strong> Heat storage for heating applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: Isles of Scilly Smart Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Isles of Scilly demonstrate advanced community resilience through a hybrid renewable energy system with sophisticated backup capabilities.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">System Architecture:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Generation Assets:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 2MW wind turbines (3 units)</li>
                      <li>• 500kWp solar PV arrays</li>
                      <li>• 2MW diesel backup generators</li>
                      <li>• 2MW/1MWh battery storage</li>
                      <li>• Smart grid control system</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Backup Capabilities:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 100% renewable operation possible</li>
                      <li>• 8-hour battery autonomy</li>
                      <li>• Diesel backup for extended outages</li>
                      <li>• Critical infrastructure protection</li>
                      <li>• Tourist accommodation support</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Performance and Benefits:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Renewable penetration:</strong> 85% renewable energy achieved</li>
                  <li>• <strong>Grid stability:</strong> Frequency maintained within ±0.5Hz</li>
                  <li>• <strong>Cost reduction:</strong> 40% lower electricity costs vs. mainland</li>
                  <li>• <strong>Reliability improvement:</strong> 99.95% uptime achieved</li>
                  <li>• <strong>Carbon reduction:</strong> 80% reduction in CO2 emissions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Regulatory Compliance and Safety Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Backup power systems must comply with comprehensive safety regulations and standards to ensure reliable operation and personnel protection.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">UK Regulatory Framework:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>BS 7671:</strong> Electrical installation requirements</li>
                    <li>• <strong>G99:</strong> Grid connection technical requirements</li>
                    <li>• <strong>Planning Permission:</strong> Local authority approval</li>
                    <li>• <strong>Building Regulations:</strong> Part P electrical safety</li>
                    <li>• <strong>Environmental permits:</strong> Noise and emissions limits</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Safety Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Fire protection:</strong> Detection and suppression systems</li>
                    <li>• <strong>Ventilation systems:</strong> Gas venting and air circulation</li>
                    <li>• <strong>Emergency shutdown:</strong> Manual and automatic isolation</li>
                    <li>• <strong>Personal protection:</strong> Arc flash and electrical safety</li>
                    <li>• <strong>Maintenance access:</strong> Safe working procedures</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Testing and Commissioning:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Witness testing:</strong> DNO approval procedures</li>
                    <li>• <strong>Performance validation:</strong> Capacity and efficiency tests</li>
                    <li>• <strong>Safety function tests:</strong> Protection system verification</li>
                    <li>• <strong>Operational procedures:</strong> Staff training requirements</li>
                    <li>• <strong>Maintenance schedules:</strong> Preventive maintenance plans</li>
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
                Backup power systems provide critical security and continuity during grid outages, but require careful design to ensure safety, reliability, and compliance. From simple UPS systems to complex microgrids, advanced integration with renewable sources and sophisticated control systems enable sustainable, community-wide resilience solutions.
              </p>
              <p className="text-yellow-400 font-medium">
                Modern backup systems integrate multiple technologies and renewable sources to provide sustainable, reliable emergency power while supporting community resilience and regulatory compliance.
              </p>
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
                title="Backup Power Systems Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule4Section6;