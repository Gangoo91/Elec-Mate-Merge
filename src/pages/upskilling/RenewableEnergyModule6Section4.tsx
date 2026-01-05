import { ArrowLeft, Settings, Lightbulb, Zap, AlertTriangle, Activity, Cpu, Wifi, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import ControlStrategiesFAQ from '@/components/upskilling/renewable-energy/ControlStrategiesFAQ';
import ControlStrategiesPractical from '@/components/upskilling/renewable-energy/ControlStrategiesPractical';

const RenewableEnergyModule6Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is ATS?",
      options: [
        "Automatic Transfer Switch",
        "Advanced Testing System",
        "Alternating Transfer Signal",
        "Active Temperature Sensor"
      ],
      correct: 0,
      explanation: "ATS stands for Automatic Transfer Switch - a device that automatically switches loads between primary and backup power sources based on preset conditions."
    },
    {
      id: 2,
      question: "What's the downside of manual switching?",
      options: [
        "Higher initial cost",
        "Slower response time and human error risk",
        "More complex installation",
        "Higher maintenance requirements"
      ],
      correct: 1,
      explanation: "Manual switching relies on human intervention, leading to slower response times during outages and potential for human error in emergency situations."
    },
    {
      id: 3,
      question: "What can trigger automated switching in hybrid systems?",
      options: [
        "Only time schedules",
        "Battery SOC, grid status, load demand, and time",
        "Only grid voltage",
        "Only manual commands"
      ],
      correct: 1,
      explanation: "Hybrid systems use multiple triggers: battery state of charge (SOC), grid availability, load demand levels, time-of-use tariffs, and user-defined parameters for intelligent switching."
    },
    {
      id: 4,
      question: "How is load prioritised in auto-control systems?",
      options: [
        "All loads treated equally",
        "Critical, essential, and non-essential hierarchies",
        "By installation date",
        "By power consumption level"
      ],
      correct: 1,
      explanation: "Auto-control systems prioritize loads in hierarchies: critical loads (safety, medical), essential loads (basic lighting, refrigeration), and non-essential loads (entertainment, high-power appliances)."
    },
    {
      id: 5,
      question: "Name one benefit of using automation in grid-tied backup systems.",
      options: [
        "Lower installation costs",
        "Faster switchover and uninterrupted power supply",
        "Simpler maintenance",
        "Reduced component count"
      ],
      correct: 1,
      explanation: "Automation provides near-instantaneous switchover times (typically < 10ms), ensuring critical loads maintain uninterrupted power supply during grid disturbances."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              Control Strategies: Manual vs Automated Switching
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              How different system types manage load switching, generation priorities, and backup transitions
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 4
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
                  Compare manual and automated control logic
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand switchgear and controller roles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Recognise how automation increases system resilience
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
                This section looks at how different system types manage load switching, generation priorities, and backup transitions. The choice between manual and automated control strategies significantly impacts system reliability, response time, and user experience during power disturbances.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Basic Control Logic Diagrams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding fundamental control logic is essential for designing reliable switching systems that respond appropriately to changing conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Grid-Tied Control Logic:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-white font-medium">Control Flow:</p>
                      <ul className="text-gray-300 space-y-1 mt-2">
                        <li>1. Monitor grid voltage and frequency</li>
                        <li>2. If grid OK → Generate and export</li>
                        <li>3. If grid fault → Disconnect immediately</li>
                        <li>4. Wait 20 seconds after grid restoration</li>
                        <li>5. Reconnect and resume operation</li>
                      </ul>
                    </div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong>Primary input:</strong> Grid status monitoring</li>
                      <li>• <strong>Protection:</strong> Anti-islanding mandatory</li>
                      <li>• <strong>Response time:</strong> 0.5 seconds maximum</li>
                      <li>• <strong>Reconnection:</strong> Automatic after delay</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Off-Grid Control Logic:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-white font-medium">Control Flow:</p>
                      <ul className="text-gray-300 space-y-1 mt-2">
                        <li>1. Monitor battery SOC and load demand</li>
                        <li>2. Prioritise renewable generation</li>
                        <li>3. If SOC low → Start generator</li>
                        <li>4. If overload → Shed non-critical loads</li>
                        <li>5. Balance generation and consumption</li>
                      </ul>
                    </div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• <strong>Primary input:</strong> Battery state and load demand</li>
                      <li>• <strong>Generator control:</strong> SOC and time-based triggers</li>
                      <li>• <strong>Load management:</strong> Priority-based shedding</li>
                      <li>• <strong>Optimization:</strong> Fuel consumption minimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-3">Hybrid System Control Logic:</h4>
                <div className="bg-card p-3 rounded border border-gray-600 text-sm">
                  <p className="text-white font-medium mb-2">Multi-Mode Operation:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-purple-400 font-medium">Normal Grid Mode:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Solar → Load → Battery → Grid export</li>
                        <li>• Time-of-use optimization</li>
                        <li>• Peak shaving if configured</li>
                        <li>• Grid support functions</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-purple-400 font-medium">Backup Mode:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Battery → Critical loads only</li>
                        <li>• Solar charging if available</li>
                        <li>• Generator start if SOC low</li>
                        <li>• Load shedding if necessary</li>
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
                <RotateCcw className="h-6 w-6 text-orange-400" />
                Manual Bypass Switches vs ATS (Automatic Transfer Switch)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The choice between manual and automatic switching affects system reliability, response time, and operational complexity during power transitions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Manual Bypass Switches:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Operation:</strong> Manual lever or rotary switch</li>
                    <li>• <strong>Response time:</strong> Minutes to hours (depends on presence)</li>
                    <li>• <strong>Cost:</strong> Low initial investment</li>
                    <li>• <strong>Reliability:</strong> Simple, fewer failure points</li>
                    <li>• <strong>Applications:</strong> Non-critical loads, maintenance switching</li>
                    <li>• <strong>Standards:</strong> BS EN 60947-3 switching devices</li>
                    <li>• <strong>Limitations:</strong> Requires human intervention</li>
                  </ul>
                </div>
                <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                  <h4 className="text-teal-400 font-semibold mb-3">Automatic Transfer Switch (ATS):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Operation:</strong> Motorized contactors with control logic</li>
                    <li>• <strong>Response time:</strong> 0.1 to 10 seconds typical</li>
                    <li>• <strong>Cost:</strong> Higher initial investment</li>
                    <li>• <strong>Reliability:</strong> Complex but proven technology</li>
                    <li>• <strong>Applications:</strong> Critical loads, emergency systems</li>
                    <li>• <strong>Standards:</strong> BS EN 60947-6-1 ATS requirements</li>
                    <li>• <strong>Benefits:</strong> Unattended operation, fast response</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">ATS Configuration Types:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">2-Position ATS:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Source 1 or Source 2</li>
                      <li>• No parallel operation</li>
                      <li>• Break-before-make operation</li>
                      <li>• Most common configuration</li>
                      <li>• Lower cost option</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">3-Position ATS:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Source 1, OFF, or Source 2</li>
                      <li>• Manual isolation position</li>
                      <li>• Maintenance-friendly</li>
                      <li>• Enhanced safety features</li>
                      <li>• Preferred for critical applications</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Soft-Start ATS:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Gradual load transfer</li>
                      <li>• Reduced inrush current</li>
                      <li>• Motor-friendly switching</li>
                      <li>• Higher equipment protection</li>
                      <li>• Premium applications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="h-6 w-6 text-purple-400" />
                Hybrid Inverter Control Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern hybrid inverters employ sophisticated control algorithms to optimize energy flow, battery life, and grid interaction based on multiple input parameters.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Control Parameters:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Battery SOC thresholds:</strong> Charge/discharge limits</li>
                    <li>• <strong>Time-of-use schedules:</strong> Tariff-based optimization</li>
                    <li>• <strong>Load priority settings:</strong> Critical vs non-critical</li>
                    <li>• <strong>Export limitations:</strong> Grid compliance management</li>
                    <li>• <strong>Generator start/stop:</strong> Backup activation logic</li>
                    <li>• <strong>Seasonal adjustments:</strong> Winter/summer profiles</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Operating Modes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Self-consumption mode:</strong> Minimize grid interaction</li>
                    <li>• <strong>Backup mode:</strong> UPS-style operation</li>
                    <li>• <strong>Time-of-use mode:</strong> Economic optimization</li>
                    <li>• <strong>Peak shaving mode:</strong> Demand charge reduction</li>
                    <li>• <strong>Grid support mode:</strong> Reactive power provision</li>
                    <li>• <strong>Off-grid mode:</strong> Island operation capability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Advanced Control Features:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Predictive Control:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Weather forecasting integration</li>
                      <li>• Load prediction algorithms</li>
                      <li>• Battery optimization planning</li>
                      <li>• Generator scheduling</li>
                      <li>• Market price forecasting</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Adaptive Learning:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• User behavior pattern recognition</li>
                      <li>• Seasonal usage adjustments</li>
                      <li>• Battery aging compensation</li>
                      <li>• System performance optimization</li>
                      <li>• Fault prediction capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Monitoring-Based Automation (SOC Triggers, Load Shedding)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Intelligent monitoring systems enable automated responses to changing conditions, ensuring system protection and optimal performance without human intervention.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">SOC-Based Triggers:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>90% SOC:</strong> Reduce charging rate</li>
                    <li>• <strong>80% SOC:</strong> Enable grid export</li>
                    <li>• <strong>50% SOC:</strong> Normal operation window</li>
                    <li>• <strong>30% SOC:</strong> Start generator</li>
                    <li>• <strong>20% SOC:</strong> Priority load shedding</li>
                    <li>• <strong>10% SOC:</strong> Emergency disconnect</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Load Shedding Hierarchy:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Level 1:</strong> Non-essential loads (entertainment)</li>
                    <li>• <strong>Level 2:</strong> Comfort loads (HVAC)</li>
                    <li>• <strong>Level 3:</strong> Selected lighting circuits</li>
                    <li>• <strong>Level 4:</strong> Non-critical appliances</li>
                    <li>• <strong>Level 5:</strong> Hot water heating</li>
                    <li>• <strong>Protected:</strong> Critical loads always maintain power</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Monitoring Parameters:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Battery voltage:</strong> Real-time SOC estimation</li>
                    <li>• <strong>Current flow:</strong> Charge/discharge rates</li>
                    <li>• <strong>Grid status:</strong> Voltage and frequency</li>
                    <li>• <strong>Load demand:</strong> Real-time consumption</li>
                    <li>• <strong>Generation output:</strong> Solar/wind production</li>
                    <li>• <strong>Temperature:</strong> Component thermal monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Automation Response Examples:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                    <h5 className="text-orange-400 font-medium mb-2">Scenario 1: Grid Outage During Low SOC</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>1. Grid failure detected in 0.5 seconds</li>
                      <li>2. Switch to battery backup mode</li>
                      <li>3. Check SOC (example: 25%)</li>
                      <li>4. Immediately shed non-critical loads</li>
                      <li>5. Start generator after 30-second delay</li>
                      <li>6. Restore loads when generation stable</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-2">Scenario 2: High Solar Generation, Full Battery</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>1. Battery reaches 95% SOC</li>
                      <li>2. Reduce solar charging rate</li>
                      <li>3. Enable grid export mode</li>
                      <li>4. Monitor export limits via CT clamps</li>
                      <li>5. Curtail generation if export limit reached</li>
                      <li>6. Resume full output when grid export reduces</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-6 w-6 text-green-400" />
                Integration with Smart Home Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern renewable energy systems integrate seamlessly with smart home platforms, enabling coordinated energy management and enhanced user control.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Communication Protocols:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Modbus TCP/RTU:</strong> Industrial standard protocol</li>
                    <li>• <strong>SunSpec:</strong> Solar industry standard</li>
                    <li>• <strong>MQTT:</strong> Internet of Things messaging</li>
                    <li>• <strong>RESTful APIs:</strong> Web-based integration</li>
                    <li>• <strong>Zigbee/Z-Wave:</strong> Home automation protocols</li>
                    <li>• <strong>WiFi/Ethernet:</strong> Network connectivity</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Smart Home Platforms:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Home Assistant:</strong> Open-source platform</li>
                    <li>• <strong>OpenHAB:</strong> Vendor-neutral automation</li>
                    <li>• <strong>Samsung SmartThings:</strong> Consumer ecosystem</li>
                    <li>• <strong>Apple HomeKit:</strong> iOS integration</li>
                    <li>• <strong>Google Home:</strong> Voice control integration</li>
                    <li>• <strong>Amazon Alexa:</strong> Voice-activated control</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Coordinated Control Examples:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Load Shifting Automation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• EV charging during peak solar</li>
                      <li>• Hot water heating optimization</li>
                      <li>• Pool pump scheduling</li>
                      <li>• Dishwasher/washing machine delays</li>
                      <li>• Heat pump pre-heating</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Emergency Response:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Automatic lighting during outages</li>
                      <li>• Garage door backup operation</li>
                      <li>• Security system battery backup</li>
                      <li>• Communication system priority</li>
                      <li>• Medical equipment protection</li>
                    </ul>
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
                Automated switching enables smarter, faster energy management—especially for hybrid and off-grid setups. The evolution from manual to automated control systems provides enhanced reliability, faster response times, and optimized energy utilization.
              </p>
              <p className="text-yellow-400 font-medium">
                Integration with smart home systems and advanced monitoring creates sophisticated energy ecosystems that adapt to user patterns, optimize costs, and maintain reliable power supply across all operating conditions.
              </p>
            </CardContent>
          </Card>

          <ControlStrategiesFAQ />
          
          <ControlStrategiesPractical />

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
                title="Control Strategies Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section4;