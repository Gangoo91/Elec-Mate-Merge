import { ArrowLeft, Shield, Zap, Settings, Monitor, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule4Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's the primary difference between MPPT and PWM controllers?",
      options: [
        "MPPT is cheaper than PWM",
        "MPPT tracks maximum power point, PWM uses pulse width modulation",
        "PWM is more efficient than MPPT",
        "There is no significant difference"
      ],
      correct: 1,
      explanation: "MPPT (Maximum Power Point Tracking) controllers continuously adjust to find the optimal operating point for maximum power extraction, while PWM (Pulse Width Modulation) controllers use simple on/off switching to regulate charging voltage."
    },
    {
      id: 2,
      question: "What does a BMS do?",
      options: [
        "Only monitors battery voltage",
        "Manages cell balancing, thermal monitoring, and safety protection",
        "Converts DC to AC power",
        "Stores energy in batteries"
      ],
      correct: 1,
      explanation: "A Battery Management System (BMS) performs multiple critical functions: cell balancing to ensure uniform charging, thermal monitoring for safety, voltage and current protection, and emergency shutdowns when parameters exceed safe limits."
    },
    {
      id: 3,
      question: "Can a hybrid inverter operate off-grid?",
      options: [
        "No, it requires grid connection",
        "Only during daylight hours",
        "Yes, it can switch between grid-tied and off-grid modes",
        "Only with special permits"
      ],
      correct: 2,
      explanation: "Hybrid inverters are designed to operate in multiple modes: grid-tied when the grid is available, and off-grid (island mode) when the grid fails, automatically switching between modes and using battery storage as needed."
    },
    {
      id: 4,
      question: "Why is thermal monitoring important?",
      options: [
        "To improve charging speed",
        "To prevent thermal runaway and maintain battery performance",
        "To reduce electricity costs",
        "To comply with building regulations"
      ],
      correct: 1,
      explanation: "Thermal monitoring prevents dangerous thermal runaway conditions, maintains optimal battery performance (batteries perform poorly at extreme temperatures), and triggers protective shutdowns if temperatures exceed safe limits."
    },
    {
      id: 5,
      question: "What's a common cause of BMS-triggered shutdown?",
      options: [
        "Low solar irradiance",
        "Cell voltage imbalance or over-temperature condition",
        "High electricity demand",
        "Grid voltage fluctuations"
      ],
      correct: 1,
      explanation: "BMS systems commonly trigger shutdowns due to cell voltage imbalances (indicating potential cell failure), over-temperature conditions (fire risk), overcurrent situations, or individual cell voltages exceeding safe limits."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              Charge Controllers, BMS, and Hybrid Inverters
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Intelligent control systems for battery charging, protection, and energy management
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Control Systems
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
                  Understand the functions of charge controllers and Battery Management Systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn how hybrid inverters integrate batteries with renewable energy systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify system compatibility requirements and protection mechanisms
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
                Battery systems require intelligent control devices to regulate charging, protect against faults, and manage energy flows effectively. This section covers the critical components that ensure safe, efficient, and reliable battery operation in renewable energy systems.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Charge Controllers: MPPT vs PWM
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Charge controllers regulate the flow of energy from renewable sources to batteries, preventing overcharging and optimizing energy harvest.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">PWM (Pulse Width Modulation):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Simple switching:</strong> On/off control to maintain battery voltage</li>
                    <li>• <strong>Lower cost:</strong> £50-200 for residential applications</li>
                    <li>• <strong>Direct connection:</strong> Solar panel voltage must match battery bank</li>
                    <li>• <strong>Efficiency:</strong> 75-80% typical performance</li>
                    <li>• <strong>Applications:</strong> Small systems, budget installations</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">MPPT (Maximum Power Point Tracking):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Intelligent tracking:</strong> Continuously finds optimal operating point</li>
                    <li>• <strong>Higher efficiency:</strong> 92-97% energy conversion</li>
                    <li>• <strong>Voltage transformation:</strong> Can step down high PV voltages</li>
                    <li>• <strong>Temperature compensation:</strong> Adjusts for varying conditions</li>
                    <li>• <strong>Cost:</strong> £150-800 depending on capacity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">MPPT Advantages and Sizing:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Performance Benefits:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 15-30% more energy harvest vs PWM</li>
                      <li>• Works with high-voltage PV arrays</li>
                      <li>• Better performance in partial shade</li>
                      <li>• Temperature compensation built-in</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Sizing Considerations:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• PV array must not exceed controller Voc rating</li>
                      <li>• Charge current must match battery bank size</li>
                      <li>• Consider derating for high temperatures</li>
                      <li>• Allow 25% safety margin on current rating</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                Battery Management Systems (BMS)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                BMS units are critical safety devices that monitor and protect battery systems from dangerous operating conditions while optimizing performance and lifespan.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Cell Balancing:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Active balancing:</strong> Energy transfer between cells</li>
                    <li>• <strong>Passive balancing:</strong> Resistive discharge of high cells</li>
                    <li>• <strong>Top balancing:</strong> Equalizing cells at full charge</li>
                    <li>• <strong>Bottom balancing:</strong> Equalizing at minimum voltage</li>
                    <li>• <strong>Continuous monitoring:</strong> Real-time cell voltage tracking</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Thermal Management:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Temperature sensors:</strong> Multiple measurement points</li>
                    <li>• <strong>Thermal protection:</strong> Automatic cutoffs at temperature limits</li>
                    <li>• <strong>Cooling control:</strong> Fan activation and thermal management</li>
                    <li>• <strong>Heating systems:</strong> Low-temperature charging protection</li>
                    <li>• <strong>Thermal modeling:</strong> Predictive temperature management</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Safety Protection:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Overvoltage protection:</strong> Individual cell and pack level</li>
                    <li>• <strong>Undervoltage protection:</strong> Prevents over-discharge damage</li>
                    <li>• <strong>Overcurrent protection:</strong> Charge and discharge current limits</li>
                    <li>• <strong>Short circuit protection:</strong> Rapid disconnection capability</li>
                    <li>• <strong>Ground fault detection:</strong> Isolation monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-orange-400" />
                Hybrid Inverters and System Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Hybrid inverters combine traditional grid-tie functionality with battery storage capabilities, providing comprehensive energy management in a single device.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Core Functions:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Grid-tie operation:</strong> Standard solar inverter functionality</li>
                    <li>• <strong>Battery charging:</strong> Integrated charge controller capability</li>
                    <li>• <strong>Battery discharging:</strong> DC-AC conversion from storage</li>
                    <li>• <strong>Load management:</strong> Intelligent power routing decisions</li>
                    <li>• <strong>Anti-islanding protection:</strong> Safe grid disconnection</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Advanced Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Time-of-use optimization:</strong> Economic dispatch based on tariffs</li>
                    <li>• <strong>Peak shaving:</strong> Reduce maximum demand charges</li>
                    <li>• <strong>Backup power:</strong> Seamless transition to battery during outages</li>
                    <li>• <strong>Multiple MPPT inputs:</strong> Optimize multiple PV strings</li>
                    <li>• <strong>Remote monitoring:</strong> Internet-based system oversight</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">Operating Modes:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Grid-tied mode:</strong> Normal operation with grid export capability</li>
                  <li>• <strong>Self-consumption mode:</strong> Prioritize local consumption over export</li>
                  <li>• <strong>Time-of-use mode:</strong> Charge/discharge based on electricity rates</li>
                  <li>• <strong>Backup mode:</strong> Emergency power during grid outages</li>
                  <li>• <strong>Off-grid mode:</strong> Standalone operation without grid connection</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-6 w-6 text-purple-400" />
                Communication Protocols and Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern battery systems use sophisticated communication protocols to enable monitoring, control, and integration with broader energy management systems.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Communication Standards:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>CAN Bus:</strong> High-speed communication for BMS data</li>
                    <li>• <strong>Modbus RTU/TCP:</strong> Industrial standard for device integration</li>
                    <li>• <strong>Sunspec Modbus:</strong> Solar industry standard protocol</li>
                    <li>• <strong>Ethernet/WiFi:</strong> Internet connectivity for remote monitoring</li>
                    <li>• <strong>RS485/RS232:</strong> Serial communication for legacy systems</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Monitoring Capabilities:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Real-time data:</strong> Voltage, current, temperature, SoC</li>
                    <li>• <strong>Historical logging:</strong> Performance trends and analysis</li>
                    <li>• <strong>Alarm management:</strong> Configurable alerts and notifications</li>
                    <li>• <strong>Remote diagnostics:</strong> Troubleshooting and maintenance</li>
                    <li>• <strong>Performance analytics:</strong> Efficiency and optimization insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Common Faults and BMS Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding common fault conditions and BMS responses is crucial for proper system maintenance and troubleshooting.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Voltage-Related Faults:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cell overvoltage:</strong> Individual cell exceeds safe limits</li>
                    <li>• <strong>Pack overvoltage:</strong> Total voltage too high</li>
                    <li>• <strong>Cell undervoltage:</strong> Deep discharge protection</li>
                    <li>• <strong>Voltage imbalance:</strong> Cells drifting apart</li>
                    <li>• <strong>Voltage sensor failure:</strong> Measurement system malfunction</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Thermal and Current Faults:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Over-temperature:</strong> Thermal runaway prevention</li>
                    <li>• <strong>Under-temperature:</strong> Cold weather charging protection</li>
                    <li>• <strong>Charge overcurrent:</strong> Excessive charging rate</li>
                    <li>• <strong>Discharge overcurrent:</strong> High load protection</li>
                    <li>• <strong>Short circuit:</strong> Emergency disconnection</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">System-Level Issues:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Communication loss:</strong> BMS unable to communicate</li>
                    <li>• <strong>Isolation fault:</strong> Ground fault detection</li>
                    <li>• <strong>Contactor failure:</strong> Switching mechanism problems</li>
                    <li>• <strong>Fuse failure:</strong> Overcurrent protection activation</li>
                    <li>• <strong>Environmental conditions:</strong> Humidity, vibration limits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Tesla Powerwall 2 Control Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Tesla Powerwall 2 demonstrates advanced integration of charge control, BMS, and inverter functions in a single residential battery system.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Integrated Systems:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Control Integration:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Built-in hybrid inverter (5kW continuous)</li>
                      <li>• Advanced BMS with cell-level monitoring</li>
                      <li>• Intelligent energy management algorithms</li>
                      <li>• Seamless grid-tie and backup operation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Smart Features:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Time-based control and peak shaving</li>
                      <li>• Storm watch mode for severe weather</li>
                      <li>• Over-the-air software updates</li>
                      <li>• Mobile app monitoring and control</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Performance Results:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Round-trip efficiency:</strong> 90% system-level performance</li>
                  <li>• <strong>Seamless backup:</strong> &lt;100ms transition to backup mode</li>
                  <li>• <strong>Longevity:</strong> 10-year warranty with 70% capacity retention</li>
                  <li>• <strong>Safety record:</strong> Zero thermal runaway incidents reported</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Control Algorithms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Next-generation battery management systems incorporate artificial intelligence and predictive analytics to optimize performance and extend lifespan.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">AI-Powered BMS:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Predictive maintenance:</strong> AI identifies degradation patterns early</li>
                    <li>• <strong>Adaptive protection:</strong> Dynamic safety thresholds based on conditions</li>
                    <li>• <strong>Performance optimization:</strong> Machine learning improves efficiency</li>
                    <li>• <strong>Fault prediction:</strong> Anticipate failures before they occur</li>
                    <li>• <strong>Lifespan extension:</strong> Optimize cycling patterns for longevity</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Cloud Integration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Fleet management:</strong> Monitor thousands of systems centrally</li>
                    <li>• <strong>Benchmark analytics:</strong> Compare performance across installations</li>
                    <li>• <strong>Firmware updates:</strong> Over-the-air system improvements</li>
                    <li>• <strong>Data aggregation:</strong> Learn from collective operational data</li>
                    <li>• <strong>Remote diagnostics:</strong> Troubleshoot issues without site visits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Grid Integration and Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Battery systems must comply with increasingly sophisticated grid codes and standards as they become integral to grid stability and operation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Grid Code Compliance:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>G99 requirements:</strong> Engineering Recommendation for distribution</li>
                    <li>• <strong>Frequency response:</strong> Automatic generation control participation</li>
                    <li>• <strong>Voltage regulation:</strong> Reactive power control capabilities</li>
                    <li>• <strong>Fault ride-through:</strong> Stay connected during grid disturbances</li>
                    <li>• <strong>Power quality:</strong> Harmonic distortion limits</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Ancillary Services:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Frequency regulation:</strong> Primary, secondary, and tertiary response</li>
                    <li>• <strong>Voltage support:</strong> Reactive power compensation</li>
                    <li>• <strong>Black start capability:</strong> Grid restoration support</li>
                    <li>• <strong>Capacity markets:</strong> Availability payments for grid security</li>
                    <li>• <strong>System inertia:</strong> Virtual inertia provision</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Future Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Fast frequency response:</strong> Sub-second response requirements</li>
                    <li>• <strong>Cyber security:</strong> IEC 62351 and NERC CIP compliance</li>
                    <li>• <strong>Data privacy:</strong> Secure handling of operational data</li>
                    <li>• <strong>Interoperability:</strong> IEEE 2030 smart grid standards</li>
                    <li>• <strong>Carbon accounting:</strong> Lifecycle emissions tracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Case Study: Sungrow's Advanced BMS Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Sungrow's PowerTitan energy storage system demonstrates advanced BMS capabilities in large-scale applications, showing how sophisticated control systems improve performance and safety.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-purple-400 font-semibold mb-3">Technology Features:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Advanced BMS Capabilities:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Three-level BMS architecture</li>
                      <li>• Cell, cluster, and system level control</li>
                      <li>• Active balancing technology</li>
                      <li>• AI-powered predictive maintenance</li>
                      <li>• Liquid cooling integration</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Safety Systems:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Multi-level fire protection</li>
                      <li>• Electrical isolation monitoring</li>
                      <li>• Thermal runaway prevention</li>
                      <li>• Emergency shutdown systems</li>
                      <li>• Real-time gas detection</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-purple-400 font-semibold mb-2">Performance Results:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Efficiency:</strong> 95%+ round-trip efficiency achieved</li>
                  <li>• <strong>Cycle life:</strong> Extended to 8,000+ cycles through optimized control</li>
                  <li>• <strong>Safety record:</strong> Zero thermal events across global deployments</li>
                  <li>• <strong>Grid services:</strong> Millisecond response time for frequency regulation</li>
                  <li>• <strong>Maintenance reduction:</strong> 40% fewer service interventions vs. conventional systems</li>
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
                Modern battery systems rely on sophisticated control and protection systems to ensure safe, efficient operation. Charge controllers optimize energy harvest, BMS units protect against faults, and hybrid inverters provide integrated energy management. Advanced AI-powered systems and grid integration capabilities are driving the next generation of storage technology.
              </p>
              <p className="text-yellow-400 font-medium">
                Invest in quality control systems with advanced features to maximize battery performance, safety, and lifespan while enabling grid service participation.
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
                title="Control Systems Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule4Section3;