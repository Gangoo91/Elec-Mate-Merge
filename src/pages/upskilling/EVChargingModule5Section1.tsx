import { ArrowLeft, ArrowRight, Settings, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule5Section1Quiz } from '@/components/upskilling/quiz/EVChargingModule5Section1Quiz';

const EVChargingModule5Section1 = () => {
  useEffect(() => {
    document.title = 'Dynamic Load Management (DLM) - EV Charging Module 5 Section 1';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to implement intelligent Dynamic Load Management systems for EV charging. Covers algorithms, hardware, control strategies, and BS 7671 compliance.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Dynamic Load Management (DLM)
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Implementing intelligent load management systems for optimised EV charging
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Dynamic Load Management (DLM) is an advanced control strategy that automatically adjusts EV charging power based on real-time electrical demand, available capacity, and grid conditions. This intelligent approach prevents infrastructure overload whilst maximising charging efficiency.
              </p>
              <p>
                Modern DLM systems use sophisticated algorithms to monitor electrical installation capacity, current demand from other loads, and individual EV charging requirements. The system then dynamically allocates available power to optimise charging across multiple vehicles whilst maintaining electrical safety and compliance.
              </p>
              <p>
                This section covers DLM principles, implementation strategies, hardware requirements, and control algorithms essential for designing scalable EV charging solutions that adapt to varying electrical demands and prevent costly infrastructure upgrades.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Design and implement Dynamic Load Management systems for EV charging</li>
                <li>Calculate load allocation algorithms and power distribution strategies</li>
                <li>Select appropriate monitoring equipment and control hardware</li>
                <li>Configure DLM parameters for different installation types and requirements</li>
                <li>Integrate DLM with existing electrical infrastructure and protection systems</li>
                <li>Troubleshoot and optimise DLM performance for maximum efficiency</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">DLM Fundamentals and Operating Principles</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Core DLM Concepts</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Load Monitoring and Assessment</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Real-Time Monitoring:</strong> Continuous measurement of electrical demand across all circuits</p>
                      <p><strong>Capacity Calculation:</strong> Dynamic assessment of available power for EV charging allocation</p>
                      <p><strong>Demand Forecasting:</strong> Predictive algorithms based on historical usage patterns</p>
                      <p><strong>Safety Margins:</strong> Configurable headroom to prevent overload conditions</p>
                      <p><strong>Response Time:</strong> Sub-second adjustment capabilities for rapid load changes</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Power Allocation Algorithms</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Proportional Distribution:</strong> Equal power sharing across active charging sessions</p>
                      <p><strong>Priority-Based Allocation:</strong> Weighted distribution based on user or vehicle priority</p>
                      <p><strong>First-Come-First-Served:</strong> Sequential allocation ensuring fair access to full power</p>
                      <p><strong>Demand-Response Integration:</strong> Grid signal responsive power modulation</p>
                      <p><strong>Time-Based Optimisation:</strong> Scheduling algorithms for off-peak charging</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Control Loop Architecture</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Measurement Phase:</strong> Data collection from CT clamps, smart meters, and charge points</p>
                      <p><strong>Processing Phase:</strong> Algorithm execution and power allocation calculation</p>
                      <p><strong>Communication Phase:</strong> Command transmission to individual charge points</p>
                      <p><strong>Verification Phase:</strong> Confirmation of power adjustment implementation</p>
                      <p><strong>Monitoring Phase:</strong> Continuous system performance and safety verification</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">⚡ DLM Benefits</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Maximises utilisation of existing electrical infrastructure capacity</li>
                  <li>Prevents costly electrical supply upgrades and reinforcement works</li>
                  <li>Reduces peak demand charges and optimises electricity costs</li>
                  <li>Enables scalable EV charging deployment without grid constraints</li>
                  <li>Provides automated load balancing and safety protection</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">DLM Hardware and Monitoring Equipment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Current Monitoring Solutions</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">CT Clamp Systems</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Non-intrusive installation on existing cables</li>
                      <li>Accuracy class 1 or better for revenue-grade monitoring</li>
                      <li>Multiple ratio options (100:5A, 200:5A, 400:5A)</li>
                      <li>Split-core design for retrofit installations</li>
                      <li>Temperature compensated for stable readings</li>
                      <li>Suitable for three-phase and single-phase monitoring</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Smart Meter Integration</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Direct communication via Modbus, M-Bus, or Ethernet</li>
                      <li>Real-time energy and demand data access</li>
                      <li>Import/export monitoring for bidirectional power flow</li>
                      <li>Time-of-use tariff integration capabilities</li>
                      <li>Historical data logging and analysis features</li>
                      <li>Remote monitoring and diagnostic capabilities</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Control and Communication Systems</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">DLM Controller Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Processing Power:</strong> Minimum ARM Cortex-A53 or equivalent for real-time processing</p>
                      <p><strong>Memory Requirements:</strong> 1GB RAM minimum, 8GB storage for data logging</p>
                      <p><strong>Communication Interfaces:</strong> Ethernet, WiFi, 4G, RS485, and CAN bus support</p>
                      <p><strong>I/O Capabilities:</strong> Analogue inputs for CT monitoring, digital outputs for control</p>
                      <p><strong>Environmental Rating:</strong> IP54 minimum for indoor installations, IP65 for outdoor</p>
                      <p><strong>Safety Certifications:</strong> CE marking, BS EN 61010 electrical safety compliance</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Communication Protocols</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>OCPP (Open Charge Point Protocol):</strong> Industry standard for charge point communication</p>
                      <p><strong>Modbus TCP/RTU:</strong> Industrial protocol for meter and sensor integration</p>
                      <p><strong>MQTT:</strong> Lightweight messaging for IoT device connectivity</p>
                      <p><strong>RESTful APIs:</strong> Web-based interfaces for third-party system integration</p>
                      <p><strong>WebSocket:</strong> Real-time bidirectional communication for dynamic updates</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">🔧 Installation Considerations</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Position CT clamps on main incomer before EV charging circuits</li>
                  <li>Ensure adequate cable separation to prevent electromagnetic interference</li>
                  <li>Install DLM controller in accessible location for maintenance</li>
                  <li>Provide backup power supply for critical control functions</li>
                  <li>Plan communication cable routes to avoid high-voltage interference</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">DLM Algorithms and Control Strategies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Load Allocation Methodologies</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Equal Distribution Algorithm</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Formula:</strong> Available Power ÷ Number of Active Charging Sessions</p>
                      <p><strong>Advantages:</strong> Simple implementation, fair allocation, predictable behaviour</p>
                      <p><strong>Applications:</strong> Workplace charging, residential developments, public facilities</p>
                      <p><strong>Limitations:</strong> May not optimise total charging throughput or user priorities</p>
                      <p><strong>Example:</strong> 50kW available ÷ 5 active sessions = 10kW per vehicle</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Priority-Weighted Distribution</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Algorithm:</strong> Power allocation based on configurable priority weightings</p>
                      <p><strong>Priority Factors:</strong> User type, vehicle SoC, departure time, subscription level</p>
                      <p><strong>Dynamic Adjustment:</strong> Priorities change based on real-time conditions</p>
                      <p><strong>Fairness Controls:</strong> Minimum power guarantees prevent complete priority exclusion</p>
                      <p><strong>Use Cases:</strong> Fleet operations, premium services, emergency vehicle charging</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Demand Response Integration</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Grid Signal Processing:</strong> Real-time response to utility demand reduction requests</p>
                      <p><strong>Frequency Response:</strong> Automatic power reduction during grid frequency deviations</p>
                      <p><strong>Time-of-Use Optimisation:</strong> Charging scheduling based on electricity pricing</p>
                      <p><strong>Carbon Intensity Response:</strong> Power modulation based on grid carbon content</p>
                      <p><strong>Revenue Generation:</strong> Participation in grid services and flexibility markets</p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Control Features</h3>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Machine Learning Integration</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Usage Pattern Recognition:</strong> Learning from historical charging behaviour</p>
                    <p><strong>Demand Forecasting:</strong> Predicting future power requirements and availability</p>
                    <p><strong>Optimisation Algorithms:</strong> Continuous improvement of allocation strategies</p>
                    <p><strong>Anomaly Detection:</strong> Identifying unusual patterns and potential system issues</p>
                    <p><strong>Performance Metrics:</strong> Automated reporting and efficiency analysis</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">DLM Configuration and Commissioning</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">System Configuration Parameters</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Electrical Parameters</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Maximum Import Capacity:</strong> Total electrical supply capacity available for all loads</p>
                      <p><strong>Base Load Allocation:</strong> Power reserved for essential building/facility operations</p>
                      <p><strong>Safety Margin:</strong> Percentage headroom to prevent overload (typically 5-10%)</p>
                      <p><strong>Minimum Charging Power:</strong> Lowest acceptable power per charging session</p>
                      <p><strong>Maximum Charging Power:</strong> Peak power available per charge point</p>
                      <p><strong>Phase Balance Limits:</strong> Acceptable phase imbalance thresholds</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Control Timing Settings</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Monitoring Interval:</strong> Frequency of power measurement updates (1-60 seconds)</p>
                      <p><strong>Control Response Time:</strong> Delay between measurement and power adjustment</p>
                      <p><strong>Smoothing Periods:</strong> Averaging windows to prevent rapid power fluctuations</p>
                      <p><strong>Priority Refresh Rate:</strong> How often priority calculations are updated</p>
                      <p><strong>Communication Timeout:</strong> Maximum time for charge point response</p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Commissioning Procedures</h3>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Testing and Verification Steps</h4>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li>Verify CT clamp installation and polarity using calibrated test equipment</li>
                    <li>Configure electrical parameters matching site infrastructure capacity</li>
                    <li>Test communication links between DLM controller and all charge points</li>
                    <li>Validate power allocation algorithms using graduated load testing</li>
                    <li>Verify safety functions including overload protection and emergency stops</li>
                    <li>Test priority management and user interface functionality</li>
                    <li>Document all settings and provide operation and maintenance instructions</li>
                  </ol>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-200 font-medium">Test your understanding:</p>
                <div className="space-y-3">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: What is the primary benefit of implementing Dynamic Load Management?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        DLM maximises utilisation of existing electrical infrastructure by intelligently allocating available power to EV charging, preventing overloads and avoiding costly electrical supply upgrades.
                      </p>
                    </details>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: What is the typical response time required for effective DLM control?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        DLM systems should respond within seconds to load changes, with sub-second capability preferred for rapid adjustment to prevent electrical overload conditions.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How does DLM prevent electrical overloads?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>DLM continuously monitors total electrical demand and automatically reduces EV charging power when approaching the maximum supply capacity. Safety margins and real-time control ensure the electrical installation never exceeds its design limits.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can DLM work with existing charge points?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Yes, most modern charge points support OCPP (Open Charge Point Protocol) which enables external control of charging power. Older units may require retrofit communication modules or replacement with DLM-compatible equipment.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What happens if the DLM system fails?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Well-designed DLM systems include fail-safe modes where charge points revert to reduced power operation or predetermined limits. Backup communication paths and redundant monitoring help ensure continued safe operation during system maintenance.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How accurate do CT clamps need to be for DLM?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>CT clamps should have accuracy class 1 or better (±1% error) for effective DLM operation. Higher accuracy improves system performance and allows closer operation to maximum capacity limits without safety concerns.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can DLM integrate with solar PV and battery systems?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Advanced DLM systems can integrate with renewable energy sources and storage systems to optimise charging from solar generation, store excess energy, and reduce grid import during peak periods. This requires bidirectional power monitoring and sophisticated control algorithms.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What are the typical cost savings from DLM implementation?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>DLM can save £20,000-£100,000+ by avoiding electrical supply upgrades, reduce ongoing demand charges by 20-40%, and enable deployment of 2-3 times more charge points within existing electrical capacity constraints.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How does DLM handle three-phase load balancing?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Advanced DLM systems monitor each phase individually and can adjust single-phase charge points or modify three-phase charging current per phase to maintain acceptable phase balance within supply transformer and protection device limitations.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What communication infrastructure is required for DLM?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>DLM requires reliable network connectivity between the central controller and all charge points. This can be wired Ethernet, WiFi, or cellular connections. Redundant communication paths improve system reliability and response times.</p>
                  </div>
                </details>

              </div>
            </CardContent>
          </Card>

          {/* Real-World Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real-World Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Case Study 1 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 1: Office Building Charging Hub</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> 20-space office car park requiring EV charging without upgrading 150kVA main electrical supply serving the building.</p>
                  <p><strong>Solution:</strong> Implemented DLM system monitoring building load via CT clamps, dynamically allocating surplus capacity to 10x 22kW charge points based on occupancy patterns and electrical demand.</p>
                  <p><strong>Result:</strong> Avoided £85,000 electrical upgrade costs. System provides 7.4kW average charging during peak building load, increasing to full 22kW during low-demand periods. 95% user satisfaction with charging availability.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Intelligent load monitoring and demand forecasting enables maximum utilisation of existing electrical infrastructure without compromising building operations.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 2: Residential Development Fleet Charging</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> 50-unit apartment complex with 30 EV charging points requiring fair allocation and preventing simultaneous high-power charging overloads.</p>
                  <p><strong>Solution:</strong> Advanced DLM with priority queuing, time-based scheduling, and user preference integration. System balances immediate charging needs with overnight optimisation strategies.</p>
                  <p><strong>Result:</strong> Zero infrastructure overload events over 18 months. Average charging time reduced by 23% through intelligent scheduling. Residents save average £180/year through off-peak optimisation.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Multi-user DLM systems require sophisticated priority management and user communication to ensure fair access whilst maximising system efficiency.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 3: Industrial Site Fleet Management</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> Manufacturing facility with variable production loads and 15 delivery van charging requirements during shift changes.</p>
                  <p><strong>Solution:</strong> Predictive DLM using production schedule integration, machine learning demand forecasting, and emergency override capabilities for critical vehicle charging.</p>
                  <p><strong>Result:</strong> 40% reduction in peak demand charges. 99.7% fleet readiness maintained. System prevented 12 potential production delays through priority charging allocation.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Industrial DLM systems benefit significantly from integration with operational data and predictive analytics to anticipate charging demands.</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-green-200 space-y-4">
              <p>
                Dynamic Load Management is essential for scalable EV charging deployment, enabling intelligent power allocation that maximises infrastructure utilisation whilst maintaining electrical safety and preventing costly supply upgrades.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Key Implementation Requirements:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Accurate current monitoring via CT clamps or smart meters</li>
                    <li>Real-time communication with OCPP-compatible charge points</li>
                    <li>Robust control algorithms with configurable parameters</li>
                    <li>Safety margins and fail-safe operational modes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Benefits and Outcomes:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Avoids expensive electrical infrastructure upgrades</li>
                    <li>Enables higher charge point density within existing capacity</li>
                    <li>Reduces peak demand charges and electricity costs</li>
                    <li>Provides automated load balancing and protection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule5Section1Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-5">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 5
              </Button>
            </Link>
            <Link to="../ev-charging-module-5-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule5Section1;