import { ArrowLeft, ArrowRight, Building, Thermometer, Lightbulb, Shield, Wifi, CheckCircle, AlertTriangle, Settings, Zap, Users, Target, Book, HelpCircle, Network, Battery, Gauge, Wrench, FileText, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule1Section2QuizData } from '@/data/upskilling/bmsModule1Section2QuizData';

const BMSModule1Section2 = () => {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../bms-module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 1 - Section 2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Common Systems Integrated with BMS
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            HVAC, Lighting, and Access Control Integration for Modern Buildings
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                A Building Management System (BMS) is only valuable when it integrates and coordinates different building services. The most common systems connected to a BMS include heating, ventilation, and air conditioning (HVAC), lighting, and access/security controls.
              </p>
              <p className="text-base leading-relaxed">
                For electricians, understanding how these systems interact within a BMS is essential for installation, maintenance, and troubleshooting. This integration creates intelligent buildings that operate efficiently, safely, and economically.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed mb-4">
                By the end of this section, you should be able to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Identify the main systems typically integrated with a BMS</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Describe how HVAC, lighting, and access control operate under BMS supervision</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Explain the benefits of integration for efficiency, comfort, and safety</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Recognise the electrician's role in wiring and connecting these systems</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HVAC Integration Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-yellow-400" />
                HVAC Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">HVAC is the largest energy user in most buildings.</strong> BMS connects to sensors (temperature, humidity, CO₂) and controls boilers, chillers, fans, and dampers for optimal performance and energy efficiency.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Key Control Points</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Temperature control:</strong> Maintaining comfort zones automatically</li>
                    <li>• <strong className="text-white">Humidity management:</strong> Preventing condensation and ensuring comfort</li>
                    <li>• <strong className="text-white">Air quality monitoring:</strong> CO₂ and indoor air quality sensors</li>
                    <li>• <strong className="text-white">Equipment scheduling:</strong> Time-based and occupancy-based operation</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Practical Example</h4>
                  <div className="bg-green-600/10 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Meeting Room Scenario:</strong> If CO₂ levels rise in a meeting room, the BMS automatically increases ventilation to bring in fresh outside air, maintaining healthy indoor air quality without manual intervention.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">In-line Check:</p>
                    <p className="text-sm mt-1">What type of sensor might trigger a BMS to adjust ventilation?</p>
                    <p className="text-xs mt-2 text-gray-400">Answer: CO₂ sensor - monitors air quality and occupancy levels</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lighting Systems Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Lighting Systems Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Lighting accounts for a significant share of building energy use.</strong> BMS can control lights via schedules, occupancy sensors, and daylight sensors to minimise waste whilst ensuring adequate illumination.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Control Methods</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Time scheduling:</strong> Automatic on/off based on occupancy patterns</li>
                    <li>• <strong className="text-white">Occupancy detection:</strong> Motion sensors trigger lighting activation</li>
                    <li>• <strong className="text-white">Daylight harvesting:</strong> Dimming based on natural light levels</li>
                    <li>• <strong className="text-white">Emergency lighting:</strong> Monitoring and compliance management</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Energy Benefits</h4>
                  <div className="bg-green-600/10 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Daylight Integration:</strong> Automatically dimming or switching off lights when natural daylight is sufficient, reducing energy consumption by up to 40% in perimeter areas.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">In-line Check:</p>
                    <p className="text-sm mt-1">Give one way a BMS helps reduce energy use through lighting control.</p>
                    <p className="text-xs mt-2 text-gray-400">Answer: Automatic scheduling or daylight harvesting - dimming/switching lights based on occupancy or natural light</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access and Security Systems Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Access and Security Systems Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Integration with door access, CCTV, and alarms enhances safety.</strong> BMS coordination provides comprehensive security management and emergency response capabilities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Security Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Access logging:</strong> Complete audit trail of entry/exit events</li>
                    <li>• <strong className="text-white">Automated lighting:</strong> Lights activate with access card use</li>
                    <li>• <strong className="text-white">CCTV integration:</strong> Camera activation triggered by access events</li>
                    <li>• <strong className="text-white">Alarm coordination:</strong> Integrated response to security breaches</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Fire Safety Integration</h4>
                  <div className="bg-red-600/10 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Emergency Response:</strong> Fire alarm integration allows the BMS to shut down HVAC to prevent smoke spread and unlock doors automatically for safe evacuation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">In-line Check:</p>
                    <p className="text-sm mt-1">How can BMS integration improve safety during a fire alarm event?</p>
                    <p className="text-xs mt-2 text-gray-400">Answer: Automatically shuts down HVAC and unlocks doors for safe evacuation whilst preventing smoke spread</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expanding Integrations Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-6 w-6 text-yellow-400" />
                Expanding Integrations (IoT and Renewables)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Modern BMS increasingly integrates with IoT devices and renewable systems.</strong> This creates opportunities for future-proofing buildings and achieving sustainability goals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">IoT Integration</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Wireless sensors:</strong> Easy retrofit and expansion capabilities</li>
                    <li>• <strong className="text-white">Smart meters:</strong> Real-time energy monitoring and analysis</li>
                    <li>• <strong className="text-white">Cloud connectivity:</strong> Remote monitoring and predictive maintenance</li>
                    <li>• <strong className="text-white">Mobile interfaces:</strong> Smartphone and tablet control applications</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Renewable Integration</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Solar PV systems:</strong> Energy generation monitoring and optimisation</li>
                    <li>• <strong className="text-white">Battery storage:</strong> Load balancing and peak shaving control</li>
                    <li>• <strong className="text-white">EV charging:</strong> Smart charging based on energy availability</li>
                    <li>• <strong className="text-white">Heat pumps:</strong> Efficient heating/cooling system integration</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">In-line Check:</p>
                    <p className="text-sm mt-1">Give one example of a modern system (outside HVAC/lighting) that can be integrated with a BMS.</p>
                    <p className="text-xs mt-2 text-gray-400">Answer: Solar PV, battery storage, EV charging, or IoT sensors</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Practical Guidance for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">As an electrician working with BMS installations:</strong>
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Installation Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Wiring diagrams:</strong> Always read and understand system interconnections</li>
                    <li>• <strong className="text-white">Low-voltage wiring:</strong> Be mindful of control and communication cabling</li>
                    <li>• <strong className="text-white">Sensor placement:</strong> Ensure correct installation for accurate feedback</li>
                    <li>• <strong className="text-white">Cable separation:</strong> Keep data cables away from power cables</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Quality Assurance</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Commissioning support:</strong> Work closely with commissioning engineers</li>
                    <li>• <strong className="text-white">Documentation:</strong> Maintain accurate as-built drawings</li>
                    <li>• <strong className="text-white">Testing procedures:</strong> Verify all connections before energising</li>
                    <li>• <strong className="text-white">System integration:</strong> Your installation quality determines BMS performance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-yellow-400" />
                Real World Case Study
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold text-lg mb-3">London Hospital BMS Integration</h4>
                <p className="text-base leading-relaxed">
                  A hospital in London integrated HVAC, lighting, and access control through its BMS with remarkable outcomes:
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-2">Patient Comfort</h5>
                  <p className="text-sm">Patient rooms kept at stable, comfortable temperatures automatically adjusted based on occupancy and medical requirements.</p>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-2">Energy Efficiency</h5>
                  <p className="text-sm">Lighting automatically dimmed in corridors at night whilst maintaining safety levels, reducing energy waste significantly.</p>
                </div>
                <div className="bg-red-600/10 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-2">Security Enhancement</h5>
                  <p className="text-sm">Security alerts linked to CCTV and access logs enabled rapid response to incidents and improved overall safety.</p>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <h5 className="text-white font-semibold mb-2">Financial Results</h5>
                <p className="text-sm leading-relaxed">
                  <strong className="text-yellow-400">Annual energy savings exceeded £250,000</strong>, alongside improved patient comfort and staff efficiency. The payback period was less than 3 years.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes Section */}
          <Card className="bg-card border-transparent border-l-4 border-l-yellow-400">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">System Integration:</strong> BMS integration requires careful planning of all electrical connections. Poor installation can lead to system failures and energy inefficiency.
                </p>
              </div>
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Safety Compliance:</strong> All integrated systems must comply with BS 7671 and relevant building regulations. Emergency systems require independent backup power supplies.
                </p>
              </div>
              <div className="bg-green-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Future Opportunities:</strong> Understanding BMS integration opens new career opportunities in smart buildings, renewable energy, and sustainable construction projects.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm">• BMS integrates HVAC, lighting, and access/security as core systems</p>
                  <p className="text-sm">• HVAC integration manages air quality and comfort efficiently</p>
                  <p className="text-sm">• Lighting integration reduces wasted energy and ensures compliance</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">• Access/security integration enhances safety and monitoring</p>
                  <p className="text-sm">• Expanding integrations include IoT devices and renewable systems</p>
                  <p className="text-sm">• Proper installation is critical for system performance and safety</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol Integration Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-6 w-6 text-yellow-400" />
                Communication Protocols and Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">BMS systems rely on standardised communication protocols</strong> to connect diverse building services. Understanding these protocols is essential for proper installation and troubleshooting.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">BACnet Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Industry standard:</strong> ISO 16484-5 compliant protocol</li>
                    <li>• <strong className="text-white">Open protocol:</strong> Vendor-independent communication</li>
                    <li>• <strong className="text-white">Multiple networks:</strong> Ethernet, MS/TP, LonTalk support</li>
                    <li>• <strong className="text-white">Object-oriented:</strong> Standardised data representation</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Modbus Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Simple and robust:</strong> Easy to implement and troubleshoot</li>
                    <li>• <strong className="text-white">Serial and Ethernet:</strong> RS-485 and TCP/IP variants</li>
                    <li>• <strong className="text-white">Master-slave:</strong> Clear communication hierarchy</li>
                    <li>• <strong className="text-white">Wide support:</strong> Compatible with many devices</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">LonWorks Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Peer-to-peer:</strong> Distributed intelligence architecture</li>
                    <li>• <strong className="text-white">Self-healing:</strong> Automatic route discovery</li>
                    <li>• <strong className="text-white">Variable topology:</strong> Star, bus, loop configurations</li>
                    <li>• <strong className="text-white">Interoperability:</strong> LonMark certified devices</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">Installation Tip:</p>
                    <p className="text-sm mt-1">Always verify protocol compatibility before connecting devices. Mixed protocols require gateways or bridges for communication.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Management Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-yellow-400" />
                Advanced Energy Management Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Modern BMS systems implement sophisticated energy management</strong> strategies that go beyond basic scheduling to actively optimise building performance and reduce operational costs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Peak Demand Management</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Load shedding:</strong> Automatically reduce non-critical loads during peak periods</li>
                    <li>• <strong className="text-white">Demand limiting:</strong> Keep maximum demand below contracted levels</li>
                    <li>• <strong className="text-white">Load sequencing:</strong> Stagger equipment start-up to prevent demand spikes</li>
                    <li>• <strong className="text-white">Priority control:</strong> Maintain critical systems whilst reducing others</li>
                  </ul>
                  <div className="bg-green-600/10 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Example:</strong> Office building reduces HVAC output by 20% and dims lighting by 30% during peak tariff periods, saving £15,000 annually.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Energy Monitoring & Analytics</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Real-time monitoring:</strong> Continuous tracking of energy consumption</li>
                    <li>• <strong className="text-white">Trend analysis:</strong> Identify patterns and anomalies in usage</li>
                    <li>• <strong className="text-white">Benchmarking:</strong> Compare performance against targets and peers</li>
                    <li>• <strong className="text-white">Fault detection:</strong> Early warning of equipment inefficiencies</li>
                  </ul>
                  <div className="bg-purple-600/10 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>ROI Impact:</strong> Energy monitoring typically identifies 5-15% savings opportunities within the first year of implementation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance and Troubleshooting Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-6 w-6 text-yellow-400" />
                Maintenance and Troubleshooting Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Effective maintenance and systematic troubleshooting</strong> ensure integrated BMS systems continue to operate efficiently and safely throughout their service life.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Preventive Maintenance</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Sensor calibration:</strong> Quarterly accuracy checks and adjustments</li>
                    <li>• <strong className="text-white">Connection inspection:</strong> Check all electrical and data connections</li>
                    <li>• <strong className="text-white">Software updates:</strong> Keep firmware and software current</li>
                    <li>• <strong className="text-white">Backup verification:</strong> Test system backup and recovery procedures</li>
                  </ul>
                  <div className="bg-orange-600/10 p-3 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>BS 7671 Compliance:</strong> Regular inspection and testing of all electrical connections is mandatory under Section 514.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Common Issues & Solutions</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded-lg">
                      <p className="text-sm font-semibold text-white mb-1">Communication Failures</p>
                      <p className="text-xs text-gray-300">Check network cables, verify protocol settings, test with diagnostic tools</p>
                    </div>
                    <div className="bg-card p-3 rounded-lg">
                      <p className="text-sm font-semibold text-white mb-1">Sensor Drift</p>
                      <p className="text-xs text-gray-300">Recalibrate sensors, check environmental conditions, replace if necessary</p>
                    </div>
                    <div className="bg-card p-3 rounded-lg">
                      <p className="text-sm font-semibold text-white mb-1">Control Loop Instability</p>
                      <p className="text-xs text-gray-300">Review PID parameters, check actuator response, verify sensor placement</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Best Practices Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-6 w-6 text-yellow-400" />
                Advanced Installation Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Professional installation techniques</strong> are critical for achieving optimal BMS performance and ensuring long-term reliability of integrated building systems.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Wiring Standards & Practices</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Cable segregation:</strong> Separate power and data cables by minimum 300mm</li>
                    <li>• <strong className="text-white">Screening and earthing:</strong> Proper EMC protection for all data cables</li>
                    <li>• <strong className="text-white">Fire-rated cables:</strong> Use appropriate fire-resistant cables in escape routes</li>
                    <li>• <strong className="text-white">Termination quality:</strong> Clean, tight connections with proper strain relief</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Commissioning Procedures</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Pre-commissioning:</strong> Verify all hardware before software configuration</li>
                    <li>• <strong className="text-white">Point-to-point testing:</strong> Test every I/O point individually</li>
                    <li>• <strong className="text-white">Integration testing:</strong> Verify system interactions and sequences</li>
                    <li>• <strong className="text-white">Performance verification:</strong> Confirm system meets design specifications</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-400/30">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-400">Critical Installation Point:</p>
                    <p className="text-sm mt-1">Temperature sensors must be located away from heat sources and in representative locations. Poor sensor placement can cause the entire HVAC system to operate inefficiently.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Compliance Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Regulatory Compliance and Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Compliance with UK building regulations and electrical standards</strong> is mandatory for all BMS installations. Understanding these requirements protects both installers and building occupants.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">BS 7671 Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Section 444:</strong> Measures against electromagnetic influences</li>
                    <li>• <strong className="text-white">Section 528:</strong> Selection and erection of wiring systems</li>
                    <li>• <strong className="text-white">Section 710:</strong> Medical locations special requirements</li>
                    <li>• <strong className="text-white">Section 528.1:</strong> Cables in escape routes - fire performance</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Building Regulations</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Part L:</strong> Conservation of fuel and power requirements</li>
                    <li>• <strong className="text-white">Part B:</strong> Fire safety provisions for controls and wiring</li>
                    <li>• <strong className="text-white">Part M:</strong> Access to and use of buildings considerations</li>
                    <li>• <strong className="text-white">Part P:</strong> Electrical safety in dwelling applications</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-500">Legal Requirement:</p>
                    <p className="text-sm mt-1">All BMS electrical work must be certified by a competent person. Non-compliance can result in insurance claims being voided and legal liability for accidents.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost-Benefit Analysis Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Cost-Benefit Analysis and ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-base leading-relaxed">
                  <strong className="text-white">Understanding the financial benefits of BMS integration</strong> helps justify investment costs and demonstrates the value of professional installation to clients.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Typical Investment Costs</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">HVAC integration:</strong> £15-25 per m² floor area</li>
                    <li>• <strong className="text-white">Lighting control:</strong> £8-15 per m² floor area</li>
                    <li>• <strong className="text-white">Access control:</strong> £200-500 per door</li>
                    <li>• <strong className="text-white">Installation labour:</strong> 30-40% of equipment cost</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Annual Savings</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Energy costs:</strong> 15-30% reduction typical</li>
                    <li>• <strong className="text-white">Maintenance:</strong> 10-20% reduction in costs</li>
                    <li>• <strong className="text-white">Staff productivity:</strong> 2-5% improvement</li>
                    <li>• <strong className="text-white">Insurance:</strong> Premium reductions possible</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Payback Analysis</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-white mb-1">Office Buildings</p>
                      <p className="text-xs text-gray-300">Typical payback: 3-5 years</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-white mb-1">Retail Premises</p>
                      <p className="text-xs text-gray-300">Typical payback: 2-4 years</p>
                    </div>
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-white mb-1">Industrial Facilities</p>
                      <p className="text-xs text-gray-300">Typical payback: 1-3 years</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-500">Business Case Example:</p>
                    <p className="text-sm mt-1">10,000 m² office building: £200,000 investment, £65,000 annual savings, 3.1 year payback, 15-year NPV of £485,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Your Knowledge Section - Inline Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed mb-6">
                Complete the quiz below to test your understanding of BMS system integration concepts. Answer each question to progress through the assessment.
              </p>
              <SingleQuestionQuiz 
                questions={bmsModule1Section2QuizData}
                title="Section 2 Assessment: Common Systems Integrated with BMS"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to="../bms-module-1-section-1" className="flex-1 sm:flex-initial">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-1-section-3" className="flex-1 sm:flex-initial">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
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

export default BMSModule1Section2;