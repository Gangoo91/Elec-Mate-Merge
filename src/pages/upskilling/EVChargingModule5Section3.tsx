import { ArrowLeft, ArrowRight, Activity, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Monitor, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule5Section3Quiz } from '@/components/upskilling/quiz/EVChargingModule5Section3Quiz';

const EVChargingModule5Section3 = () => {
  useEffect(() => {
    document.title = 'CT Clamps, Load-Sensing, and Control Logic - EV Charging Module 5 Section 3';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master current transformer clamps, load-sensing technologies, and control logic for EV charging systems. Covers installation, calibration, and monitoring techniques for optimal load management.');
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
            <Activity className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            CT Clamps, Load-Sensing, and Control Logic
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Monitoring and control technology for advanced load management
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
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
                Current Transformer (CT) clamps and advanced load-sensing technologies form the foundation of intelligent EV charging systems, providing real-time monitoring capabilities essential for Dynamic Load Management (DLM) and system optimisation. These monitoring solutions enable precise measurement of electrical parameters whilst implementing sophisticated control logic.
              </p>
              <p>
                Modern load-sensing systems combine high-accuracy CT clamps, smart metering technology, and advanced signal processing to deliver comprehensive electrical monitoring. The control logic processes this data to make intelligent decisions about power allocation, safety protection, and system optimisation in real-time.
              </p>
              <p>
                This section covers CT clamp selection and installation, load-sensing methodologies, control algorithm implementation, and practical techniques for building robust monitoring systems that ensure safe, efficient, and reliable EV charging operations across diverse electrical installations.
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
                <li>Select and install appropriate CT clamps for various electrical monitoring applications</li>
                <li>Design load-sensing systems for accurate real-time power measurement</li>
                <li>Implement control logic algorithms for intelligent load management</li>
                <li>Calibrate and commission monitoring equipment for optimal accuracy</li>
                <li>Troubleshoot common issues with CT clamps and sensing systems</li>
                <li>Integrate monitoring data with control systems and user interfaces</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Current Transformer (CT) Clamp Technology</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">CT Clamp Fundamentals</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Operating Principles</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Electromagnetic Induction:</strong> Primary current creates magnetic field inducing proportional secondary current</p>
                      <p><strong>Current Ratio:</strong> Fixed transformation ratio (e.g., 100:5A, 200:5A, 400:5A)</p>
                      <p><strong>Non-Intrusive Monitoring:</strong> Installation without breaking existing electrical connections</p>
                      <p><strong>Isolation:</strong> Electrical isolation between primary circuit and monitoring equipment</p>
                      <p><strong>Linear Response:</strong> Proportional output across full operating range</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">CT Clamp Types and Applications</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Split-Core CTs:</strong> Retrofit installation on existing installations without disconnection</p>
                      <p><strong>Solid-Core CTs:</strong> Higher accuracy for new installations with primary cable threading</p>
                      <p><strong>Rogowski Coils:</strong> Flexible sensors for awkward cable arrangements and large conductors</p>
                      <p><strong>Hall Effect Sensors:</strong> DC and AC current measurement with digital output</p>
                      <p><strong>Revenue-Grade CTs:</strong> Class 0.5 or 1.0 accuracy for billing and financial applications</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Accuracy and Specification Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Accuracy Class:</strong> Class 1 (±1%) minimum for DLM, Class 0.5 (±0.5%) for revenue applications</p>
                      <p><strong>Burden Rating:</strong> Secondary circuit impedance matching for optimal accuracy</p>
                      <p><strong>Frequency Response:</strong> 50Hz fundamental with harmonic measurement capability</p>
                      <p><strong>Temperature Stability:</strong> Coefficient &lt;0.1%/°C for consistent performance</p>
                      <p><strong>Dynamic Range:</strong> Accurate measurement from 1% to 120% of rated current</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">🔧 Installation Best Practices</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Install CTs on all three phases for three-phase monitoring</li>
                  <li>Ensure proper conductor centralisation within CT aperture</li>
                  <li>Maintain minimum separation from switching equipment and contactors</li>
                  <li>Use appropriate cable termination techniques for secondary connections</li>
                  <li>Label all CT installations with ratio, direction, and circuit identification</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Load-Sensing Technologies and Methods</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Sensing Techniques</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Real-Time Power Measurement</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Instantaneous power calculation (P = V × I × cos φ)</li>
                      <li>Reactive power monitoring for power factor analysis</li>
                      <li>Apparent power measurement for capacity planning</li>
                      <li>Harmonic analysis for power quality assessment</li>
                      <li>Peak demand recording and trending capabilities</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Multi-Point Monitoring</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Main incomer monitoring for total facility load</li>
                      <li>Sub-circuit monitoring for load disaggregation</li>
                      <li>Generation monitoring for renewable energy sources</li>
                      <li>Battery monitoring for storage system integration</li>
                      <li>Individual load monitoring for detailed analysis</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Smart Metering Integration</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Communication Protocols</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Modbus RTU/TCP:</strong> Industrial standard for meter communication and data retrieval</p>
                      <p><strong>M-Bus:</strong> European standard for utility meter reading and control</p>
                      <p><strong>DNP3:</strong> Distributed Network Protocol for SCADA and utility applications</p>
                      <p><strong>IEC 61850:</strong> International standard for electrical substation automation</p>
                      <p><strong>LonWorks:</strong> Building automation and control network protocol</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Data Acquisition and Processing</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Sampling Rates:</strong> Minimum 1Hz for load management, 10Hz+ for power quality</p>
                      <p><strong>Data Buffering:</strong> Local storage for communication redundancy and data integrity</p>
                      <p><strong>Signal Filtering:</strong> Digital filtering for noise reduction and measurement stability</p>
                      <p><strong>Calibration:</strong> Automatic offset and gain correction for measurement accuracy</p>
                      <p><strong>Synchronisation:</strong> Time-stamped data for coordinated multi-point analysis</p>
                    </div>
                  </div>

                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Control Logic and Algorithm Implementation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Intelligent Control Algorithms</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Load Monitoring and Analysis</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Baseline Calculation:</strong> Continuous calculation of non-EV electrical loads</p>
                      <p><strong>Load Forecasting:</strong> Predictive algorithms for anticipated demand changes</p>
                      <p><strong>Pattern Recognition:</strong> Machine learning for load behaviour identification</p>
                      <p><strong>Anomaly Detection:</strong> Automatic identification of unusual consumption patterns</p>
                      <p><strong>Trending Analysis:</strong> Historical data analysis for capacity planning</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Dynamic Response Logic</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Real-Time Adjustment:</strong> Sub-second response to load changes and constraints</p>
                      <p><strong>Hysteresis Control:</strong> Preventing oscillation through intelligent dead-bands</p>
                      <p><strong>Rate Limiting:</strong> Controlled power ramping to prevent electrical transients</p>
                      <p><strong>Priority Management:</strong> Hierarchical load shedding and restoration sequences</p>
                      <p><strong>Safety Interlocks:</strong> Automatic disconnection for overload and fault conditions</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Optimisation Strategies</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Linear Programming:</strong> Mathematical optimisation for resource allocation</p>
                      <p><strong>Genetic Algorithms:</strong> Evolutionary computing for complex optimisation problems</p>
                      <p><strong>Fuzzy Logic:</strong> Handling uncertainty and imprecise control requirements</p>
                      <p><strong>Neural Networks:</strong> Learning-based optimisation for adaptive control</p>
                      <p><strong>Model Predictive Control:</strong> Future state prediction for proactive control</p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">System Integration and Communication</h3>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Control System Architecture</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Distributed Control:</strong> Local intelligence with centralised coordination</p>
                    <p><strong>Redundancy:</strong> Failover mechanisms for critical control functions</p>
                    <p><strong>Scalability:</strong> Modular architecture supporting system expansion</p>
                    <p><strong>Interoperability:</strong> Standard protocols for third-party integration</p>
                    <p><strong>Cybersecurity:</strong> Encrypted communication and access control measures</p>
                  </div>
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
                    <p className="text-white font-medium mb-2">Question: What accuracy class is recommended for DLM applications?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        Class 1 (±1%) accuracy is the minimum recommendation for DLM applications, with Class 0.5 (±0.5%) preferred for revenue-grade monitoring and billing applications.
                      </p>
                    </details>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: What is the primary advantage of split-core CT clamps?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        Split-core CTs allow retrofit installation on existing electrical installations without disconnecting or breaking primary circuit connections, making them ideal for upgrading monitoring systems.
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
                  <summary className="cursor-pointer text-yellow-400 font-medium">How do I select the correct CT clamp ratio for my application?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Select CT ratio based on maximum expected current: 100:5A for circuits up to 100A, 200:5A up to 200A, etc. Choose the next larger ratio above your maximum current for optimal accuracy and headroom.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What causes inaccurate CT readings and how can they be corrected?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Common causes include incorrect CT ratio configuration, poor conductor positioning, electromagnetic interference, and burden mismatch. Corrections involve proper installation, calibration, and shielding of secondary connections.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can CT clamps be installed on existing live electrical systems?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Split-core CTs can be safely installed on de-energised systems by qualified electricians. Live working requires specialist training, equipment, and safety procedures in accordance with BS 7671 and workplace safety regulations.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How often should CT clamps be calibrated?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Annual calibration is recommended for revenue-grade applications, with 2-3 yearly calibration acceptable for monitoring-only applications. High-accuracy installations may require 6-monthly verification depending on criticality.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What communication distance limitations exist for CT monitoring systems?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Analogue CT signals: 100m maximum with appropriate cable sizing. Digital systems using Modbus RTU: 1km+ with repeaters. Ethernet/TCP communication: unlimited distance with network infrastructure.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How do environmental conditions affect CT clamp performance?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Temperature variations affect accuracy (±0.1%/°C typical), humidity can cause insulation issues, and vibration may affect mechanical connections. Use temperature-compensated CTs and environmental protection where required.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What safety considerations apply to CT clamp installations?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Never open-circuit CT secondary connections under load, ensure proper earthing of secondary circuits, use appropriate PPE during installation, and follow lockout/tagout procedures for safety isolation.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How can control logic handle communication failures?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Implement fail-safe modes with predetermined power limits, use watchdog timers for communication monitoring, provide local data buffering, and include manual override capabilities for emergency operation.</p>
                  </div>
                </details>

              </div>
            </CardContent>
          </Card>

          {/* Real-World Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Monitor className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real-World Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Case Study 1 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 1: Industrial Facility Load Monitoring</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> 500kVA industrial facility requiring comprehensive load monitoring for 25x EV charging points without disrupting production operations.</p>
                  <p><strong>Solution:</strong> Installed 15x split-core Class 1 CTs on main distribution panels, integrated with Modbus RTU communication network and centralised DLM controller.</p>
                  <p><strong>Implementation:</strong> Non-intrusive installation during scheduled maintenance window, comprehensive calibration and commissioning, operator training programme.</p>
                  <p><strong>Results:</strong> ±0.8% measurement accuracy achieved, 99.9% system availability, prevented 8 potential overload events, enabled 40% increase in charging capacity.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Proper CT selection and installation enables high-accuracy monitoring without operational disruption, providing essential data for intelligent load management.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 2: Residential Development Smart Monitoring</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> 40-unit residential development requiring individual dwelling monitoring and coordinated EV charging load management.</p>
                  <p><strong>Solution:</strong> Deployed wireless CT monitoring system with mesh network communication, integrated with cloud-based control platform and mobile user interfaces.</p>
                  <p><strong>Implementation:</strong> Individual dwelling CT installation, wireless gateway deployment, resident mobile app rollout with real-time consumption feedback.</p>
                  <p><strong>Results:</strong> 15% average energy consumption reduction, improved resident engagement, coordinated charging prevented infrastructure upgrades, 98% system uptime.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Wireless CT monitoring enables comprehensive coverage in complex installations whilst providing valuable user feedback for behaviour change.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 3: Commercial Building Retrofit</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> 1970s office building retrofit with limited electrical capacity requiring precision monitoring for 30x workplace charging points.</p>
                  <p><strong>Solution:</strong> High-accuracy Class 0.5 CT installation with advanced signal processing, predictive control algorithms, and building management system integration.</p>
                  <p><strong>Implementation:</strong> Phased installation approach, existing BMS integration, staff training and change management programme.</p>
                  <p><strong>Results:</strong> Avoided £150,000 electrical upgrade, 5% improvement in overall building energy efficiency, seamless EV charging integration, enhanced tenant satisfaction.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Precision monitoring and intelligent control enable maximum utilisation of limited electrical capacity in retrofit applications.</p>
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
                CT clamps and load-sensing technologies provide the essential measurement foundation for intelligent EV charging systems, enabling real-time monitoring and sophisticated control algorithms that optimise electrical infrastructure utilisation whilst maintaining safety and reliability.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Key Technical Requirements:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Class 1 accuracy CT clamps for reliable load management applications</li>
                    <li>Appropriate communication protocols for system integration</li>
                    <li>Intelligent control algorithms with real-time response capabilities</li>
                    <li>Redundancy and fail-safe mechanisms for critical applications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Implementation Benefits:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Accurate real-time monitoring enables optimal load allocation</li>
                    <li>Non-intrusive installation minimises disruption and costs</li>
                    <li>Advanced control logic maximises infrastructure utilisation</li>
                    <li>Comprehensive monitoring provides valuable operational insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule5Section3Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-5-section-2">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-5-section-4">
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

export default EVChargingModule5Section3;