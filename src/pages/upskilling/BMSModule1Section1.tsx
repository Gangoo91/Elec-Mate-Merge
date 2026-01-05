import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, FileText, Shield, Scale, Eye, Users, Lightbulb, Cpu, Zap, Settings, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BMSEmbeddedQuiz from '@/components/upskilling/BMSEmbeddedQuiz';

const BMSModule1Section1 = () => {

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
            <BookOpen className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 1 - Section 1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            What Is a BMS and Why It's Used?
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive introduction to Building Management Systems and their role in modern electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Definition Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Definition of a Building Management System
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                A Building Management System (BMS), sometimes called a Building Automation System (BAS), is a computer-based control system that monitors and controls the mechanical and electrical equipment in a building, including HVAC, lighting, power systems, fire systems, and security systems.
              </p>
              <p className="text-base leading-relaxed">
                The BMS acts as the "central nervous system" of modern buildings, collecting data from sensors and controlling building services to optimise energy efficiency, occupant comfort, and system performance while ensuring safety and regulatory compliance.
              </p>
            </CardContent>
          </Card>

          {/* Core Functions Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Core Functions of a BMS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Monitoring & Control
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time monitoring of building systems</li>
                    <li>• Automated control of HVAC equipment</li>
                    <li>• Lighting control and scheduling</li>
                    <li>• Energy monitoring and management</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Safety & Security
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Fire alarm integration</li>
                    <li>• Access control systems</li>
                    <li>• Emergency lighting control</li>
                    <li>• Security system integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purpose and Benefits Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Why Buildings Need a BMS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Energy Efficiency</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Automatic scheduling:</strong> Systems operate only when needed</li>
                    <li>• <strong className="text-white">Optimisation:</strong> Continuous adjustment based on occupancy</li>
                    <li>• <strong className="text-white">Monitoring:</strong> Real-time energy consumption tracking</li>
                    <li>• <strong className="text-white">Demand response:</strong> Load shedding during peak periods</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Safety & Compliance</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Emergency systems:</strong> Fire alarms, emergency lighting</li>
                    <li>• <strong className="text-white">Regulatory compliance:</strong> Building regulations adherence</li>
                    <li>• <strong className="text-white">Safety monitoring:</strong> Continuous system health checks</li>
                    <li>• <strong className="text-white">Audit trails:</strong> Comprehensive logging for inspections</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMS Components Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="h-6 w-6 text-yellow-400" />
                Key BMS Components
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Central Processing Unit</h4>
                  <p className="text-sm">Main controller that processes data from sensors and sends control signals to field devices</p>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Field Devices</h4>
                  <p className="text-sm">Sensors, actuators, and controllers installed throughout the building to monitor and control systems</p>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">User Interface</h4>
                  <p className="text-sm">Software applications that allow operators to monitor systems and make adjustments remotely</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evolution of BMS Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Evolution of Building Management Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Traditional Systems (1970s-1990s)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Standalone pneumatic and basic electric controls</li>
                    <li>• Manual time clocks and thermostats</li>
                    <li>• Limited integration between systems</li>
                    <li>• Local control only - no remote access</li>
                    <li>• Basic on/off switching with minimal optimisation</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Modern BMS (2000s-Present)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Fully integrated digital systems</li>
                    <li>• Internet of Things (IoT) connectivity</li>
                    <li>• Predictive analytics and artificial intelligence</li>
                    <li>• Cloud-based monitoring and control</li>
                    <li>• Machine learning for pattern optimisation</li>
                    <li>• Mobile and web-based interfaces</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMS vs Traditional Controls Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                BMS vs Traditional Building Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white py-2">Aspect</th>
                      <th className="text-left text-white py-2">Traditional Controls</th>
                      <th className="text-left text-white py-2">Modern BMS</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-semibold text-yellow-400">Control Method</td>
                      <td className="py-2">Manual switches, time clocks</td>
                      <td className="py-2">Automated, sensor-based control</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-semibold text-yellow-400">Integration</td>
                      <td className="py-2">Independent systems</td>
                      <td className="py-2">Fully integrated platform</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-semibold text-yellow-400">Data Collection</td>
                      <td className="py-2">Manual readings</td>
                      <td className="py-2">Continuous real-time monitoring</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-semibold text-yellow-400">Access</td>
                      <td className="py-2">Local control only</td>
                      <td className="py-2">Remote web/mobile access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Electrician Requirements Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-yellow-400" />
                Why Electricians Need BMS Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Modern electricians increasingly encounter BMS during installation, maintenance, and troubleshooting work:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Industry Trends</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Growing demand for energy-efficient buildings</li>
                    <li>• Increased integration of electrical systems</li>
                    <li>• Client expectations for smart building features</li>
                    <li>• Regulatory requirements for energy monitoring</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Practical Applications</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Installation of BMS-compatible devices</li>
                    <li>• Troubleshooting integrated lighting systems</li>
                    <li>• Maintenance of emergency lighting controls</li>
                    <li>• Support for commissioning activities</li>
                  </ul>
                </div>
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
                  <strong className="text-white">Integration Awareness:</strong> Even basic electrical work may now involve systems that connect to or are controlled by a BMS. Understanding these connections is crucial for proper installation and maintenance.
                </p>
              </div>
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Energy Regulations:</strong> Building regulations increasingly require energy monitoring and control capabilities, making BMS knowledge essential for compliance.
                </p>
              </div>
              <div className="bg-green-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Future-Proofing:</strong> Understanding BMS principles helps electricians adapt to evolving technologies and maintain relevance in the changing industry.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* BMS Installation and Configuration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                BMS Installation Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Electrical Integration Points</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Power supply:</strong> Stable 24V DC or mains supply for controllers</li>
                    <li>• <strong>Communication wiring:</strong> Dedicated data cables (CAT5/6)</li>
                    <li>• <strong>Control wiring:</strong> Low voltage control circuits to equipment</li>
                    <li>• <strong>Emergency circuits:</strong> Independent power for safety systems</li>
                    <li>• <strong>Surge protection:</strong> Protection of sensitive electronic components</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Common Installation Issues</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>EMI interference:</strong> Keep data cables away from power cables</li>
                    <li>• <strong>Voltage drop:</strong> Ensure adequate cable sizing for distances</li>
                    <li>• <strong>Grounding:</strong> Proper earthing of all BMS components</li>
                    <li>• <strong>Access:</strong> Ensure controllers are accessible for maintenance</li>
                    <li>• <strong>Documentation:</strong> Maintain accurate as-built drawings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMS Safety Systems Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                BMS Safety Systems Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Fire Safety Integration</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Fire alarm monitoring:</strong> Status inputs from fire panel</li>
                    <li>• <strong>Smoke control:</strong> Automatic fan control during fire events</li>
                    <li>• <strong>Emergency lighting:</strong> Testing and monitoring systems</li>
                    <li>• <strong>Lift control:</strong> Fire service mode activation</li>
                    <li>• <strong>Access control:</strong> Emergency door release systems</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Security System Integration</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Intruder detection:</strong> Security system monitoring</li>
                    <li>• <strong>CCTV control:</strong> Camera positioning and recording</li>
                    <li>• <strong>Perimeter security:</strong> External lighting control</li>
                    <li>• <strong>Panic button response:</strong> Emergency system activation</li>
                    <li>• <strong>After-hours control:</strong> Reduced systems operation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Energy Management and Efficiency */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Energy Management and Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-white">
                Energy management is one of the primary drivers for BMS implementation, with systems typically achieving 10-30% energy savings through intelligent control and monitoring.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Load Shedding</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Priority-based load management</li>
                    <li>• Peak demand reduction</li>
                    <li>• Utility demand response participation</li>
                    <li>• Cost optimisation strategies</li>
                  </ul>
                </div>
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Scheduling Systems</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Occupancy-based operation</li>
                    <li>• Pre-cooling and pre-heating</li>
                    <li>• Night setback temperatures</li>
                    <li>• Holiday and weekend schedules</li>
                  </ul>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Performance Monitoring</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Energy consumption tracking</li>
                    <li>• Efficiency benchmarking</li>
                    <li>• Fault detection and diagnostics</li>
                    <li>• Maintenance scheduling alerts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMS Protocols and Communication */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Common BMS Communication Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">BACnet Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• International standard (ISO 16484-5)</li>
                    <li>• Widely used in commercial buildings</li>
                    <li>• Supports multiple network types (IP, MS/TP)</li>
                    <li>• Interoperability between different manufacturers</li>
                  </ul>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Modbus Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Simple, reliable communication</li>
                    <li>• Common in industrial applications</li>
                    <li>• RS-485 or TCP/IP variants</li>
                    <li>• Good for connecting meters and sensors</li>
                  </ul>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">KNX/EIB Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• European standard for home automation</li>
                    <li>• Decentralised system architecture</li>
                    <li>• Power and data on same cable</li>
                    <li>• Excellent for lighting control integration</li>
                  </ul>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">LonWorks Protocol</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Peer-to-peer networking capabilities</li>
                    <li>• Self-healing network topology</li>
                    <li>• Good for distributed control systems</li>
                    <li>• Common in older BMS installations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMS Maintenance and Troubleshooting */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                BMS Maintenance and Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Preventive Maintenance</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Regular system backups:</strong> Configuration and programming data</li>
                    <li>• <strong>Sensor calibration:</strong> Temperature, pressure, and flow sensors</li>
                    <li>• <strong>Network diagnostics:</strong> Communication integrity testing</li>
                    <li>• <strong>Battery replacement:</strong> UPS and controller backup batteries</li>
                    <li>• <strong>Software updates:</strong> Security patches and feature updates</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Common Faults and Solutions</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Communication failures:</strong> Check cable integrity and terminations</li>
                    <li>• <strong>Sensor drift:</strong> Recalibrate or replace faulty sensors</li>
                    <li>• <strong>Control loop instability:</strong> Tune PID parameters</li>
                    <li>• <strong>Network timeouts:</strong> Verify network settings and bandwidth</li>
                    <li>• <strong>Power supply issues:</strong> Check voltage levels and load distribution</li>
                  </ul>
                </div>
              </div>
              <div className="bg-red-600/10 p-4 rounded-lg mt-6">
                <h4 className="text-white font-semibold mb-2">⚠️ Safety Considerations</h4>
                <p className="text-sm text-white">
                  Always isolate electrical supplies before working on BMS components. Coordinate with building management to ensure safe shutdown procedures and maintain emergency systems operation during maintenance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Case Study */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Real-World Case Study: Office Building BMS Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Project Overview</h4>
                <p className="text-sm text-white mb-2">
                  A 15-storey commercial office building in London required a comprehensive BMS upgrade to meet new energy efficiency regulations and improve occupant comfort.
                </p>
                <p className="text-sm text-white">
                  <strong>Building specifications:</strong> 45,000m² floor area, 2,500 occupants, mixed HVAC systems
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Implementation Challenges</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Legacy systems:</strong> Integration with existing pneumatic controls</li>
                    <li>• <strong>Phased installation:</strong> Maintaining building operation during upgrade</li>
                    <li>• <strong>Multiple contractors:</strong> Coordination between electrical and HVAC teams</li>
                    <li>• <strong>Tenant requirements:</strong> Individual zone control for different companies</li>
                    <li>• <strong>Compliance issues:</strong> Meeting BS 7671 and building regulations</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Results Achieved</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Energy savings:</strong> 28% reduction in HVAC energy consumption</li>
                    <li>• <strong>Improved comfort:</strong> 95% tenant satisfaction with temperature control</li>
                    <li>• <strong>Maintenance efficiency:</strong> 40% reduction in callout visits</li>
                    <li>• <strong>Compliance:</strong> Full regulatory compliance achieved</li>
                    <li>• <strong>ROI:</strong> Payback period of 3.2 years through energy savings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Do I need specialised training to work with BMS as an electrician?</h4>
                  <p className="text-sm text-white">A: While basic electrical knowledge is sufficient for most BMS-related work, additional training in building automation and control systems is beneficial. Many manufacturers offer specific training programs for their systems.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I damage a BMS by working on connected electrical systems?</h4>
                  <p className="text-sm text-white">A: Yes, improper electrical work can affect BMS operation. Always identify BMS connections before starting work, follow isolation procedures, and coordinate with facilities management when working on integrated systems.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Are there specific regulations governing BMS installations?</h4>
                  <p className="text-sm text-white">A: BMS installations must comply with BS 7671 for electrical work, plus specific standards like BS EN ISO 16484 for building automation systems. Local building regulations may also apply.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: How do I know if a building has a BMS?</h4>
                  <p className="text-sm text-white">A: Look for central control panels, multiple sensors throughout the building, integrated lighting controls, and ask facility managers. Modern commercial buildings typically have some form of building automation.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Your Knowledge */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-6">
                Complete this comprehensive quiz to test your understanding of BMS fundamentals. The quiz contains 10 questions covering all key areas from this section.
              </p>
              <BMSEmbeddedQuiz />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BMSModule1Section1;