import { ArrowLeft, ArrowRight, Monitor, Smartphone, TrendingUp, Bell, Settings, Cloud, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule5Section6 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What can monitoring platforms detect early to prevent system failures?",
      options: [
        "Weather forecast changes",
        "Performance degradation, string failures, and inverter faults",
        "Electricity price fluctuations",
        "Planning permission issues"
      ],
      correct: 1,
      explanation: "Monitoring platforms can detect performance issues early including panel degradation, string failures, inverter faults, shading problems, and other technical issues before they cause significant energy loss."
    },
    {
      id: 2,
      question: "What's the main benefit of remote fault alerts?",
      options: [
        "Reduced electricity bills",
        "Faster response times and reduced system downtime",
        "Better weather forecasting",
        "Automatic system repairs"
      ],
      correct: 1,
      explanation: "Remote fault alerts enable immediate notification of problems, allowing faster response times, reduced downtime, and prevention of minor issues becoming major failures."
    },
    {
      id: 3,
      question: "Can you adjust inverter settings remotely through monitoring platforms?",
      options: [
        "No, all changes must be made physically at the inverter",
        "Yes, most modern inverters support remote configuration",
        "Only during daylight hours",
        "Only with DNO approval"
      ],
      correct: 1,
      explanation: "Most modern smart inverters support remote configuration including power limits, voltage settings, and operational parameters through secure monitoring platforms."
    },
    {
      id: 4,
      question: "Which stakeholders benefit most from remote monitoring tools?",
      options: [
        "Only system owners",
        "Installers, O&M providers, system owners, and investors",
        "Only maintenance companies",
        "Only electricity suppliers"
      ],
      correct: 1,
      explanation: "Multiple stakeholders benefit including system owners (performance visibility), installers (warranty support), O&M providers (maintenance efficiency), and investors (asset performance tracking)."
    },
    {
      id: 5,
      question: "Name two key data points you should monitor daily for optimal system performance:",
      options: [
        "Weather forecast and electricity prices",
        "Energy generation and system status/alarms",
        "Planning permission status and warranty dates",
        "Social media mentions and customer reviews"
      ],
      correct: 1,
      explanation: "Daily monitoring should focus on energy generation (comparing to expected output) and system status/alarms (checking for any faults or performance issues that need attention)."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              Monitoring Platforms and Remote Management
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Advanced tools for tracking performance and optimising solar system operations
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                System Monitoring
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
                  Understand what monitoring platforms do and their key features
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify common remote management capabilities and benefits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn how monitoring data supports maintenance and system uptime
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
                Modern solar installations rely on sophisticated monitoring platforms and remote management systems to maximise performance, minimise downtime, and optimise maintenance operations. These tools provide real-time visibility into system performance and enable proactive management of solar assets across entire portfolios.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-6 w-6 text-yellow-400" />
                Monitoring Platform Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Solar monitoring platforms collect, analyse, and present data from inverters, optimisers, meters, and environmental sensors to provide comprehensive system visibility and performance insights.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Core Monitoring Functions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Real-time data:</strong> Live power generation and system status</li>
                    <li>• <strong>Historical analysis:</strong> Long-term performance trends</li>
                    <li>• <strong>Fault detection:</strong> Automatic identification of issues</li>
                    <li>• <strong>Performance comparison:</strong> Expected vs actual generation</li>
                    <li>• <strong>Reporting tools:</strong> Automated performance reports</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Data Collection Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Direct inverter communication:</strong> RS485, Ethernet, WiFi</li>
                    <li>• <strong>Power line communication:</strong> Data over DC or AC cables</li>
                    <li>• <strong>Wireless systems:</strong> Zigbee, LoRa, cellular connections</li>
                    <li>• <strong>External sensors:</strong> Irradiance, temperature, wind speed</li>
                    <li>• <strong>Smart meters:</strong> Grid import/export measurements</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Performance Indicators (KPIs):</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Energy Metrics:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Daily, monthly, annual generation</li>
                      <li>• Specific yield (kWh/kWp)</li>
                      <li>• Performance ratio (PR)</li>
                      <li>• Capacity factor</li>
                      <li>• Energy export vs consumption</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">System Health:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Inverter efficiency</li>
                      <li>• String current balance</li>
                      <li>• DC/AC voltage levels</li>
                      <li>• Temperature measurements</li>
                      <li>• Error and alarm status</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Financial Data:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Revenue from generation</li>
                      <li>• Savings from self-consumption</li>
                      <li>• Feed-in tariff payments</li>
                      <li>• Carbon footprint reduction</li>
                      <li>• Return on investment tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-6 w-6 text-red-400" />
                Intelligent Fault Detection and Alerting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced monitoring systems use machine learning and rule-based algorithms to detect faults early, categorise issues by severity, and provide actionable insights for maintenance teams.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Fault Detection Capabilities:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>String failures:</strong> Open circuits, short circuits</li>
                    <li>• <strong>Panel degradation:</strong> Gradual performance decline</li>
                    <li>• <strong>Inverter faults:</strong> Communication loss, overheating</li>
                    <li>• <strong>Shading analysis:</strong> New or temporary obstructions</li>
                    <li>• <strong>Soiling detection:</strong> Dust accumulation impact</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Alert Management:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Severity levels:</strong> Critical, high, medium, low priority</li>
                    <li>• <strong>Multiple channels:</strong> Email, SMS, push notifications</li>
                    <li>• <strong>Escalation rules:</strong> Automatic escalation if unresolved</li>
                    <li>• <strong>Customisable thresholds:</strong> Site-specific alarm settings</li>
                    <li>• <strong>Acknowledgment tracking:</strong> Response time monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-3">Common Fault Types and Detection Methods:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Fault Type</th>
                        <th className="text-left p-2">Detection Method</th>
                        <th className="text-left p-2">Typical Impact</th>
                        <th className="text-left p-2">Response Time</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Inverter Failure</td>
                        <td className="p-2">Communication loss + zero output</td>
                        <td className="p-2">100% system loss</td>
                        <td className="p-2">Immediate</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">String Open Circuit</td>
                        <td className="p-2">Current imbalance detection</td>
                        <td className="p-2">10-30% power loss</td>
                        <td className="p-2">15 minutes</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Panel Degradation</td>
                        <td className="p-2">Performance ratio trending</td>
                        <td className="p-2">5-15% gradual loss</td>
                        <td className="p-2">Monthly analysis</td>
                      </tr>
                      <tr>
                        <td className="p-2">Soiling/Shading</td>
                        <td className="p-2">Weather-corrected underperformance</td>
                        <td className="p-2">5-25% temporary loss</td>
                        <td className="p-2">Daily/weekly</td>
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
                <Settings className="h-6 w-6 text-green-400" />
                Remote Control and Configuration Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern smart inverters and monitoring systems enable comprehensive remote control capabilities, allowing operators to adjust settings, manage power output, and optimise performance without site visits.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Remote Control Functions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Power curtailment:</strong> Limit output for grid management</li>
                    <li>• <strong>Voltage regulation:</strong> Power factor and reactive power control</li>
                    <li>• <strong>Protection settings:</strong> Voltage and frequency thresholds</li>
                    <li>• <strong>Start/stop control:</strong> System shutdown and restart</li>
                    <li>• <strong>Time-based scheduling:</strong> Automated operational profiles</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Configuration Management:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Bulk updates:</strong> Fleet-wide setting changes</li>
                    <li>• <strong>Version control:</strong> Configuration history tracking</li>
                    <li>• <strong>Rollback capability:</strong> Revert to previous settings</li>
                    <li>• <strong>Template management:</strong> Standardised configurations</li>
                    <li>• <strong>Compliance monitoring:</strong> DNO requirement adherence</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Advanced Grid Integration Features:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Grid Support Services:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Frequency response (FFR)</li>
                      <li>• Voltage support services</li>
                      <li>• Reactive power provision</li>
                      <li>• Power quality improvement</li>
                      <li>• Grid stabilisation support</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Demand Response:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Automatic load shedding</li>
                      <li>• Price signal response</li>
                      <li>• Peak demand management</li>
                      <li>• Emergency grid support</li>
                      <li>• Carbon intensity optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Market Participation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Capacity market bidding</li>
                      <li>• Balancing mechanism</li>
                      <li>• Flexibility services</li>
                      <li>• Virtual power plant aggregation</li>
                      <li>• Peer-to-peer energy trading</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-purple-400" />
                User Interfaces and Mobile Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern monitoring platforms provide intuitive interfaces across multiple devices, enabling stakeholders to access system information and controls from anywhere with internet connectivity.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Web Portal Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dashboard overview:</strong> System status and key metrics</li>
                    <li>• <strong>Detailed analytics:</strong> Performance analysis tools</li>
                    <li>• <strong>Historical data:</strong> Long-term trend analysis</li>
                    <li>• <strong>Reporting engine:</strong> Automated and custom reports</li>
                    <li>• <strong>User management:</strong> Role-based access control</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Mobile App Capabilities:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Real-time monitoring:</strong> Live system status</li>
                    <li>• <strong>Push notifications:</strong> Instant alert delivery</li>
                    <li>• <strong>Quick diagnostics:</strong> Rapid fault identification</li>
                    <li>• <strong>Field support tools:</strong> Maintenance assistance</li>
                    <li>• <strong>Photo documentation:</strong> Visual inspection records</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Stakeholder-Specific Views:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Owner Portal:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Energy generation and savings summary</li>
                      <li>• Financial performance tracking</li>
                      <li>• Environmental impact metrics</li>
                      <li>• System health status</li>
                      <li>• Maintenance history and scheduling</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Installer/O&M Interface:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Fleet-wide performance overview</li>
                      <li>• Fault prioritisation and routing</li>
                      <li>• Maintenance scheduling tools</li>
                      <li>• Warranty claim support</li>
                      <li>• Performance benchmarking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cloud className="h-6 w-6 text-cyan-400" />
                Platform Ecosystem and Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The monitoring landscape includes manufacturer-specific platforms, third-party aggregators, and open-standard systems that vary in features, compatibility, and integration capabilities.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Manufacturer Platforms:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>SMA Sunny Portal:</strong> Comprehensive SMA ecosystem</li>
                    <li>• <strong>Fronius Solar.web:</strong> Professional fleet management</li>
                    <li>• <strong>SolarEdge Monitoring:</strong> Optimiser-level visibility</li>
                    <li>• <strong>Enphase Enlighten:</strong> Micro-inverter platform</li>
                    <li>• <strong>Huawei FusionSolar:</strong> AI-powered analytics</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Third-Party Solutions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>SolarLog:</strong> Multi-brand compatibility</li>
                    <li>• <strong>Locus Energy:</strong> Performance analytics</li>
                    <li>• <strong>AlsoEnergy PowerTrack:</strong> Commercial focus</li>
                    <li>• <strong>Solar-Log WEB Enerest:</strong> Professional O&M</li>
                    <li>• <strong>Meteocontrol VCOM:</strong> Independent monitoring</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Open Standards:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Modbus protocols:</strong> Industrial standard communication</li>
                    <li>• <strong>SunSpec Alliance:</strong> Interoperability standards</li>
                    <li>• <strong>IEEE 2030.5:</strong> Smart grid communication</li>
                    <li>• <strong>API integration:</strong> Custom development support</li>
                    <li>• <strong>Data export formats:</strong> CSV, XML, JSON compatibility</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-3">Integration Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Technical Integration:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Communication protocol compatibility</li>
                      <li>• Data format standardisation</li>
                      <li>• Real-time vs batch data transfer</li>
                      <li>• Security and encryption requirements</li>
                      <li>• Network infrastructure needs</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Business Integration:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cost structure and licensing models</li>
                      <li>• Support and maintenance terms</li>
                      <li>• Data ownership and portability</li>
                      <li>• Scalability and fleet management</li>
                      <li>• Third-party integration support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: Fleet Monitoring Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A solar installer managing 150 installations across the UK implements a comprehensive monitoring solution to improve maintenance efficiency and customer service.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">Implementation Strategy:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Multi-brand inverter compatibility</li>
                      <li>• Automated fault detection and alerting</li>
                      <li>• Customer-facing dashboards</li>
                      <li>• Maintenance workflow integration</li>
                      <li>• Performance guaranty monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Results After 12 Months:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 40% reduction in mean time to repair</li>
                      <li>• 25% decrease in customer service calls</li>
                      <li>• 15% improvement in system uptime</li>
                      <li>• £50k annual saving in maintenance costs</li>
                      <li>• 95% customer satisfaction rating</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Key Success Factors:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Proactive monitoring:</strong> Issues detected before customer awareness</li>
                  <li>• <strong>Automated workflows:</strong> Streamlined maintenance scheduling and dispatch</li>
                  <li>• <strong>Customer transparency:</strong> Self-service portals reduce support burden</li>
                  <li>• <strong>Data-driven decisions:</strong> Performance analytics guide maintenance priorities</li>
                  <li>• <strong>Scalable platform:</strong> System grows efficiently with business expansion</li>
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
                Modern monitoring platforms and remote management systems are essential for maximising solar system performance, reducing maintenance costs, and ensuring optimal uptime. These tools provide real-time visibility, intelligent fault detection, and remote control capabilities that transform solar asset management from reactive to proactive operations.
              </p>
              <p className="text-yellow-400 font-medium">
                Effective monitoring reduces downtime by 15-30%, cuts maintenance costs by 20-40%, and ensures systems operate at peak performance throughout their operational lifetime.
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
                  <h4 className="text-white font-semibold mb-2">Which monitoring platform should I choose for different system types?</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>Residential:</strong> SolarEdge, Enphase Enlighten, or SolarPower.com offer user-friendly interfaces<br/>
                    <strong>Commercial:</strong> Solar-Log, Meteocontrol, or Sungrow iSolarCloud provide fleet management<br/>
                    <strong>Utility-scale:</strong> DNV GL Navigator, SCADA integration, or custom solutions<br/>
                    Consider inverter manufacturer integration, third-party compatibility, and long-term platform stability.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How do I interpret performance ratio (PR) and what's considered good?</h4>
                  <p className="text-gray-300 text-sm">
                    Performance Ratio = (Actual Energy / Expected Energy at STC) × 100. Good PR values: {'>'} 85% excellent, 80-85% good, 75-80% acceptable, {'<'} 75% investigate. PR accounts for all system losses including inverter efficiency, cable losses, soiling, shading, and temperature effects. Monitor monthly PR trends to identify degradation.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Can I remotely update inverter firmware and settings?</h4>
                  <p className="text-gray-300 text-sm">
                    Most modern smart inverters support remote firmware updates and configuration changes through secure platforms. Requires inverter internet connectivity (WiFi, Ethernet, or cellular). Always verify manufacturer authorisation for remote changes, maintain configuration backups, and follow cybersecurity best practices including VPN access and strong authentication.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How quickly should monitoring systems detect and alert on faults?</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>Critical faults (inverter failure):</strong> {'<'} 5 minutes<br/>
                    <strong>String faults:</strong> 15-30 minutes<br/>
                    <strong>Performance degradation:</strong> Daily analysis<br/>
                    <strong>Soiling/shading:</strong> Weekly trends<br/>
                    Configure different alert thresholds based on fault severity and potential revenue impact. Balance sensitivity vs false alarms.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">What's the cost difference between basic and advanced monitoring?</h4>
                  <p className="text-gray-300 text-sm">
                    <strong>Basic monitoring:</strong> £50-200 (often included with inverter)<br/>
                    <strong>Advanced monitoring:</strong> £200-1000+ depending on features<br/>
                    <strong>Professional O&M platforms:</strong> £1000-5000/year for large systems<br/>
                    Advanced features justify costs through reduced downtime, optimised performance, and predictive maintenance capabilities.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How do I ensure monitoring data security and prevent cyber attacks?</h4>
                  <p className="text-gray-300 text-sm">
                    Use VPN connections for remote access, enable two-factor authentication, regularly update firmware, segment monitoring networks from critical systems, monitor for unauthorised access attempts, and follow manufacturer cybersecurity guidelines. Consider cyber insurance for large commercial installations.
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
                title="Monitoring and Remote Management Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule5Section6;