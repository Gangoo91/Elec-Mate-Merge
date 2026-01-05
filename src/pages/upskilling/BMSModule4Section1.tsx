import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Target, CheckCircle, BookOpen, Wrench, AlertTriangle, Lightbulb as LightIcon, Info, Users, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule4Section1QuizData } from '@/data/upskilling/bmsModule4Section1QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule4Section1 = () => {
  const [checkAnswers, setCheckAnswers] = useState<{[key: string]: boolean}>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "BMS Module 4 Section 1: Integration with DALI, 1-10V, and Smart Lighting | Electrical Training";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to integrate DALI, 1-10V dimming, and smart lighting systems with Building Management Systems. Comprehensive guide for electricians on lighting control protocols and BMS integration.');
    }
  }, []);

  const handleCheckAnswer = (checkId: string, isCorrect: boolean) => {
    setCheckAnswers(prev => ({
      ...prev,
      [checkId]: isCorrect
    }));
  };

  const renderInlineCheck = (checkId: string, question: string, correctAnswer: string, explanation: string) => (
    <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-yellow-400/30 mt-6">
      <CardContent className="pt-6">
        <div className="flex-1">
          <p className="text-white font-medium mb-3">{question}</p>
            <details className="group">
              <summary className="cursor-pointer text-blue-300 hover:text-blue-200 transition-colors list-none flex items-center gap-2">
                <span>Click to reveal answer</span>
                <ArrowRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-3 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-200 font-medium mb-2">Answer: {correctAnswer}</p>
                <p className="text-green-100 text-sm">{explanation}</p>
              </div>
            </details>
          </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../bms-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-400" />
              <Badge 
                variant="secondary" 
                className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
              >
                Module 4 - Section 1
              </Badge>
            </div>
            <Badge 
              variant="outline" 
              className="border-gray-600 text-gray-300 text-xs px-2 py-1 w-fit"
            >
              25 min read
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Integration with DALI, 1–10V, and Smart Lighting
          </h1>
          <p className="text-base text-white mt-2">
            Master the integration of intelligent lighting control protocols with Building Management Systems for optimal energy efficiency and occupant comfort
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              <p className="text-lg">
                Lighting control represents one of the most impactful and commonly implemented applications of Building Management Systems. 
                By integrating sophisticated lighting protocols such as <strong>DALI (Digital Addressable Lighting Interface)</strong>, 
                <strong>1–10V dimming systems</strong>, and <strong>smart lighting technologies</strong>, buildings can achieve remarkable 
                energy efficiency gains whilst maintaining superior occupant comfort and productivity.
              </p>
              
              <p>
                For electricians working with BMS installations, understanding these diverse lighting control protocols presents both 
                significant opportunities and critical challenges. Each system operates with distinct communication methods, wiring 
                requirements, and integration approaches. A thorough understanding of their differences, capabilities, and limitations 
                is essential for successful implementation.
              </p>

              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-200 mb-2">Critical Installation Considerations</h4>
                    <p className="text-amber-100 text-sm">
                      Mistakes in lighting control wiring, addressing, or protocol configuration can render entire lighting networks 
                      inoperative. Proper installation techniques, systematic commissioning procedures, and thorough understanding 
                      of each protocol's requirements are essential for reliable system operation.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                This comprehensive section will equip you with the knowledge and practical skills needed to successfully integrate 
                these lighting technologies with BMS platforms, ensuring optimal performance and long-term reliability.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-6 text-lg">By the end of this section, learners will be able to:</p>
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {[
                  "Describe the operational principles of DALI, 1–10V, and smart lighting protocols",
                  "Explain the integration methods for each lighting system with BMS platforms",
                  "Recognise the electrician's critical role in wiring and commissioning lighting controls", 
                  "Identify the specific advantages and operational limitations of each approach",
                  "Implement proper wiring techniques for different lighting control systems",
                  "Troubleshoot common integration issues and communication failures",
                  "Select appropriate lighting protocols based on project requirements and constraints",
                  "Apply systematic commissioning procedures to ensure reliable system operation"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: DALI Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                DALI Systems and Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Digital Addressable Lighting Interface (DALI)</h3>
                <p>
                  DALI represents the gold standard for intelligent lighting control, offering unprecedented flexibility and 
                  functionality through its digital communication protocol. As an international standard (IEC 62386), DALI 
                  enables sophisticated lighting control strategies that were previously impossible with conventional systems.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">DALI Characteristic</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Specification</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Practical Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2">Device Capacity</td>
                        <td className="border border-gray-600 px-4 py-2">64 devices per loop</td>
                        <td className="border border-gray-600 px-4 py-2">Individual control of each fitting</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2">Wiring Requirements</td>
                        <td className="border border-gray-600 px-4 py-2">Two-wire bus (polarity free)</td>
                        <td className="border border-gray-600 px-4 py-2">Simple installation, no polarity concerns</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2">Communication</td>
                        <td className="border border-gray-600 px-4 py-2">Bidirectional digital protocol</td>
                        <td className="border border-gray-600 px-4 py-2">Status feedback and fault reporting</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2">Control Resolution</td>
                        <td className="border border-gray-600 px-4 py-2">254 dimming levels</td>
                        <td className="border border-gray-600 px-4 py-2">Precise light level control</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-200 mb-2">DALI System Advantages</h4>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• <strong>Individual Addressability:</strong> Each fitting can be controlled independently</li>
                    <li>• <strong>Flexible Grouping:</strong> Fittings can belong to multiple overlapping groups</li>
                    <li>• <strong>Fault Monitoring:</strong> Ballasts report lamp failures and operational status</li>
                    <li>• <strong>Energy Efficiency:</strong> Precise dimming enables optimal energy consumption</li>
                    <li>• <strong>Scene Control:</strong> Pre-programmed lighting scenes for different activities</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-white">BMS Integration Architecture</h4>
                <p>
                  DALI systems integrate with BMS platforms through dedicated DALI gateways or controllers that translate 
                  between the DALI protocol and the BMS communication network (typically Modbus, BACnet, or Ethernet-based protocols).
                </p>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-200 mb-2">Typical Integration Components:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• DALI Gateway/Controller with BMS protocol support</li>
                    <li>• DALI Bus Power Supply (16V DC, polarity-free)</li>
                    <li>• DALI-compatible LED drivers or ballasts</li>
                    <li>• Commissioning software for addressing and configuration</li>
                    <li>• Presence/daylight sensors with DALI interfaces</li>
                  </ul>
                </div>
              </div>

              {renderInlineCheck(
                "dali-check",
                "Why is DALI more flexible than traditional on/off lighting control?",
                "Individual addressability and digital feedback",
                "DALI allows each lighting fitting to be individually addressed and controlled, enabling sophisticated strategies like automatic daylight compensation, individual dimming, and real-time status monitoring, unlike simple on/off systems that only provide basic switching functionality."
              )}
            </CardContent>
          </Card>

          {/* Section 2: 1-10V Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LightIcon className="h-5 w-5 text-yellow-400" />
                1–10V Dimming Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Analog Dimming Technology</h3>
                <p>
                  The 1–10V dimming standard provides a cost-effective, reliable method for lighting control using analog voltage 
                  signals. While less sophisticated than DALI, 1–10V systems offer excellent reliability and are widely supported 
                  across the lighting industry, making them ideal for applications requiring simple, robust dimming functionality.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">1-10V Parameter</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Specification</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Installation Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2">Control Signal Range</td>
                        <td className="border border-gray-600 px-4 py-2">1V (min) to 10V (max brightness)</td>
                        <td className="border border-gray-600 px-4 py-2">Linear relationship voltage to light output</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2">Wiring Requirements</td>
                        <td className="border border-gray-600 px-4 py-2">Separate control and mains circuits</td>
                        <td className="border border-gray-600 px-4 py-2">Segregation essential to prevent interference</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2">Control Current</td>
                        <td className="border border-gray-600 px-4 py-2">Typically 100μA maximum</td>
                        <td className="border border-gray-600 px-4 py-2">Low power control signal</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2">Cable Type</td>
                        <td className="border border-gray-600 px-4 py-2">Screened/shielded low voltage cable</td>
                        <td className="border border-gray-600 px-4 py-2">Protection against EMI essential</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-200 mb-2">1-10V Advantages</h4>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• Simple, proven technology</li>
                      <li>• Cost-effective implementation</li>
                      <li>• Wide industry compatibility</li>
                      <li>• Reliable analog operation</li>
                      <li>• Minimal commissioning required</li>
                    </ul>
                  </div>
                  
                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-200 mb-2">1-10V Limitations</h4>
                    <ul className="text-amber-100 text-sm space-y-1">
                      <li>• No individual fitting control</li>
                      <li>• No status feedback capability</li>
                      <li>• Group-based control only</li>
                      <li>• Limited integration features</li>
                      <li>• Susceptible to EMI without proper screening</li>
                    </ul>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-white">BMS Integration Methods</h4>
                <p>
                  1–10V systems integrate with BMS platforms through analog output modules or specialized dimming controllers 
                  that convert digital BMS commands into the appropriate analog voltage levels for lighting control.
                </p>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-200 mb-2">Integration Requirements:</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• BMS analog output modules (0-10V capable)</li>
                    <li>• Screened control cable installation</li>
                    <li>• Proper segregation from power circuits</li>
                    <li>• 1-10V compatible LED drivers or ballasts</li>
                    <li>• Manual override switching for maintenance</li>
                  </ul>
                </div>
              </div>

              {renderInlineCheck(
                "1-10v-check",
                "Why can't a 1–10V system provide feedback on lamp failures?",
                "Analog signals without digital feedback capability",
                "1-10V systems use simple analog voltage control signals that only flow in one direction (from controller to driver). They lack the bidirectional digital communication required to send status information back from individual fittings to the control system."
              )}
            </CardContent>
          </Card>

          {/* Section 3: Smart Lighting Integration */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Smart Lighting Integration Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Advanced Wireless and IP-Based Lighting</h3>
                <p>
                  Smart lighting represents the cutting edge of lighting control technology, utilising wireless communication 
                  protocols and IP networking to create highly flexible, scalable lighting systems. These solutions eliminate 
                  traditional control wiring whilst providing unprecedented integration capabilities with modern BMS platforms.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">Smart Protocol</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Range/Coverage</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Key Advantages</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Typical Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Zigbee 3.0</strong></td>
                        <td className="border border-gray-600 px-4 py-2">10-100m mesh network</td>
                        <td className="border border-gray-600 px-4 py-2">Self-healing mesh, low power</td>
                        <td className="border border-gray-600 px-4 py-2">Office buildings, retail spaces</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Bluetooth Mesh</strong></td>
                        <td className="border border-gray-600 px-4 py-2">10-30m per hop</td>
                        <td className="border border-gray-600 px-4 py-2">Smartphone integration, fast commissioning</td>
                        <td className="border border-gray-600 px-4 py-2">Meeting rooms, small offices</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Wi-Fi 6</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Building-wide coverage</td>
                        <td className="border border-gray-600 px-4 py-2">High bandwidth, existing infrastructure</td>
                        <td className="border border-gray-600 px-4 py-2">Smart buildings, IoT integration</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>PoE Lighting</strong></td>
                        <td className="border border-gray-600 px-4 py-2">100m per network segment</td>
                        <td className="border border-gray-600 px-4 py-2">Power + data over single cable</td>
                        <td className="border border-gray-600 px-4 py-2">Data centres, modern offices</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-200 mb-2">Smart Lighting Capabilities</h4>
                  <ul className="text-purple-100 text-sm space-y-1">
                    <li>• <strong>Wireless Commissioning:</strong> Configuration via smartphone apps or web interfaces</li>
                    <li>• <strong>Real-time Analytics:</strong> Energy consumption, occupancy patterns, and usage data</li>
                    <li>• <strong>Predictive Maintenance:</strong> Proactive fault detection and maintenance scheduling</li>
                    <li>• <strong>Integration Platform:</strong> Seamless connection with IoT sensors and building systems</li>
                    <li>• <strong>Remote Management:</strong> Cloud-based monitoring and control capabilities</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-white">Security and Infrastructure Considerations</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-red-200 mb-2">Security Challenges</h5>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Network vulnerability to cyber attacks</li>
                      <li>• Encryption key management complexity</li>
                      <li>• Firmware update security requirements</li>
                      <li>• Network segmentation necessities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-200 mb-2">Infrastructure Dependencies</h5>
                    <ul className="text-blue-100 text-sm space-y-1">
                      <li>• Robust network infrastructure required</li>
                      <li>• IT department coordination essential</li>
                      <li>• Backup power systems for network equipment</li>
                      <li>• Professional network design and management</li>
                    </ul>
                  </div>
                </div>
              </div>

              {renderInlineCheck(
                "smart-lighting-check",
                "What is one advantage of smart lighting compared to wired protocols like DALI?",
                "Easily scalable without rewiring",
                "Smart lighting systems use wireless or network-based communication, allowing new fixtures, sensors, and controls to be added without installing additional control wiring, making expansion and reconfiguration much simpler and more cost-effective."
              )}
            </CardContent>
          </Card>

          {/* Section 4: Protocol Comparison and Selection */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Protocol Comparison and Selection Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Choosing the Right Lighting Control Strategy</h3>
                <p>
                  Selecting the appropriate lighting control protocol requires careful consideration of project requirements, 
                  budget constraints, functionality needs, and long-term maintenance implications. Each technology offers 
                  distinct advantages that suit different application scenarios.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="border border-gray-600 px-4 py-2 text-left">Selection Criteria</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">DALI</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">1-10V</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Smart Lighting</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Initial Cost</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Medium-High</td>
                        <td className="border border-gray-600 px-4 py-2">Low</td>
                        <td className="border border-gray-600 px-4 py-2">High</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Individual Control</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Yes - Excellent</td>
                        <td className="border border-gray-600 px-4 py-2">No - Group only</td>
                        <td className="border border-gray-600 px-4 py-2">Yes - Excellent</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Status Feedback</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Yes - Full status</td>
                        <td className="border border-gray-600 px-4 py-2">No - No feedback</td>
                        <td className="border border-gray-600 px-4 py-2">Yes - Comprehensive</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Installation Complexity</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Medium</td>
                        <td className="border border-gray-600 px-4 py-2">Low</td>
                        <td className="border border-gray-600 px-4 py-2">High</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Commissioning Time</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Medium</td>
                        <td className="border border-gray-600 px-4 py-2">Low</td>
                        <td className="border border-gray-600 px-4 py-2">Medium-High</td>
                      </tr>
                      <tr className="bg-gray-800/50">
                        <td className="border border-gray-600 px-4 py-2"><strong>Future Scalability</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Good</td>
                        <td className="border border-gray-600 px-4 py-2">Limited</td>
                        <td className="border border-gray-600 px-4 py-2">Excellent</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Maintenance Requirements</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Low</td>
                        <td className="border border-gray-600 px-4 py-2">Very Low</td>
                        <td className="border border-gray-600 px-4 py-2">Medium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-lg font-semibold text-white">Application-Specific Recommendations</h4>
                
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-green-200 mb-2">🏢 Office Buildings</h5>
                    <p className="text-green-100 text-sm mb-2">
                      <strong>Recommended:</strong> DALI for main areas, Smart lighting for meeting rooms
                    </p>
                    <ul className="text-green-100 text-sm space-y-1">
                      <li>• DALI provides excellent daylight harvesting in open-plan areas</li>
                      <li>• Smart lighting enables flexible meeting room configurations</li>
                      <li>• Hybrid approach maximises functionality within budget constraints</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-200 mb-2">🏭 Industrial/Warehouse</h5>
                    <p className="text-blue-100 text-sm mb-2">
                      <strong>Recommended:</strong> 1-10V dimming systems
                    </p>
                    <ul className="text-blue-100 text-sm space-y-1">
                      <li>• Simple, robust technology suits harsh environments</li>
                      <li>• Lower cost suits large-scale installations</li>
                      <li>• Minimal maintenance requirements reduce operational costs</li>
                    </ul>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-200 mb-2">🏬 Retail/Hospitality</h5>
                    <p className="text-purple-100 text-sm mb-2">
                      <strong>Recommended:</strong> Smart lighting with scene control
                    </p>
                    <ul className="text-purple-100 text-sm space-y-1">
                      <li>• Dynamic lighting scenes enhance customer experience</li>
                      <li>• Mobile app control enables staff flexibility</li>
                      <li>• Analytics provide valuable occupancy insights</li>
                    </ul>
                  </div>
                </div>
              </div>

              {renderInlineCheck(
                "selection-check",
                "Which lighting protocol would you choose for a small warehouse with simple dimming needs, and why?",
                "1-10V dimming systems",
                "For a small warehouse with simple dimming requirements, 1-10V systems are ideal because they offer reliable, cost-effective group dimming control with minimal installation complexity and very low maintenance requirements, which suits the straightforward operational needs of warehouse environments."
              )}
            </CardContent>
          </Card>

          {/* Practical Guidance Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Practical Implementation Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6 leading-relaxed">
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Essential Installation Procedures</h3>
                <p>
                  Successful lighting control integration requires systematic approach to installation, commissioning, and testing. 
                  Following these practical guidelines ensures reliable system operation and minimises troubleshooting time during commissioning.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      DALI Installation Best Practices
                    </h4>
                    <ul className="text-blue-100 text-sm space-y-2">
                      <li>• <strong>Bus Topology:</strong> Use dedicated DALI cable (2-core + earth, minimum 1.5mm²)</li>
                      <li>• <strong>Cable Routing:</strong> Maintain 300mm separation from mains cables</li>
                      <li>• <strong>Power Supply:</strong> Install 16V DALI PSU with overcurrent protection</li>
                      <li>• <strong>Address Assignment:</strong> Use commissioning software for systematic addressing</li>
                      <li>• <strong>Documentation:</strong> Record device addresses and group allocations</li>
                      <li>• <strong>Testing:</strong> Verify individual device communication before grouping</li>
                    </ul>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      1-10V System Guidelines
                    </h4>
                    <ul className="text-green-100 text-sm space-y-2">
                      <li>• <strong>Control Wiring:</strong> Use screened/shielded low voltage cable</li>
                      <li>• <strong>Segregation:</strong> Never mix control and mains in same containment</li>
                      <li>• <strong>Connections:</strong> Secure positive and negative control connections</li>
                      <li>• <strong>Earth Bonding:</strong> Connect cable screens to local earth points</li>
                      <li>• <strong>Testing:</strong> Use multimeter to verify 0-10V signal range</li>
                      <li>• <strong>Commissioning:</strong> Test dimming curves and minimum levels</li>
                    </ul>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Smart Lighting Deployment
                    </h4>
                    <ul className="text-purple-100 text-sm space-y-2">
                      <li>• <strong>Network Planning:</strong> Coordinate with IT team for infrastructure</li>
                      <li>• <strong>Power Supply:</strong> Ensure adequate PoE capacity where applicable</li>
                      <li>• <strong>Wireless Coverage:</strong> Verify signal strength at all fitting locations</li>
                      <li>• <strong>Security Setup:</strong> Configure encryption keys and access controls</li>
                      <li>• <strong>Commissioning App:</strong> Install and configure vendor software</li>
                      <li>• <strong>Backup Plans:</strong> Establish manual override procedures</li>
                    </ul>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-200 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      BMS Integration Steps
                    </h4>
                    <ul className="text-amber-100 text-sm space-y-2">
                      <li>• <strong>Gateway Selection:</strong> Choose compatible interface devices</li>
                      <li>• <strong>Protocol Mapping:</strong> Configure communication parameters</li>
                      <li>• <strong>Address Allocation:</strong> Plan BMS point naming conventions</li>
                      <li>• <strong>Alarm Setup:</strong> Define fault and status reporting</li>
                      <li>• <strong>Schedule Programming:</strong> Configure time-based control</li>
                      <li>• <strong>User Training:</strong> Provide operator interface guidance</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Common Installation Pitfalls to Avoid
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-red-200 mb-2">Wiring Issues:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Mixing control and mains cables in 1-10V systems</li>
                        <li>• Incorrect polarity in DALI installations (though polarity-free)</li>
                        <li>• Insufficient cable separation causing EMI</li>
                        <li>• Poor earth bonding of cable screens</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-200 mb-2">Configuration Errors:</h5>
                      <ul className="text-red-100 text-sm space-y-1">
                        <li>• Duplicate DALI addresses causing conflicts</li>
                        <li>• Inadequate network security in smart systems</li>
                        <li>• Missing backup power for critical controls</li>
                        <li>• Insufficient documentation for maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-200 mb-3">Pre-Commissioning Checklist:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-gray-300 mb-2">Physical Installation:</h5>
                      <ul className="text-white space-y-1">
                        <li>All cables properly terminated and tested</li>
                        <li>Power supplies commissioned and verified</li>
                        <li>Cable segregation maintained throughout</li>
                        <li>Earth bonding completed and tested</li>
                        <li>Emergency manual overrides functional</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-300 mb-2">System Configuration:</h5>
                      <ul className="text-white space-y-1">
                        <li>Device addressing completed and documented</li>
                        <li>BMS integration points configured</li>
                        <li>User interfaces programmed and tested</li>
                        <li>Alarm and fault reporting verified</li>
                        <li>Handover documentation prepared</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-green-400" />
                Real World Case Study: London Office Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <div className="bg-green-900/30 border border-green-500/40 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-3">Project Overview: Hybrid Lighting Integration</h4>
                <p className="text-green-100 mb-4">
                  A prestigious London office development required a sophisticated lighting control system that could accommodate 
                  diverse workspace requirements whilst achieving aggressive energy efficiency targets. The electrical contractor 
                  implemented a hybrid approach combining three different lighting protocols.
                </p>

                <div className="space-y-3">
                  <div className="bg-gray-800/50 p-3 rounded">
                    <h5 className="font-semibold text-blue-200">DALI Implementation - Open Plan Areas</h5>
                    <p className="text-blue-100 text-sm">
                      Six DALI loops covering 240 individual LED panels with integrated daylight and presence sensors. 
                      Each panel individually addressable for precise daylight harvesting and task-specific illumination.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded">
                    <h5 className="font-semibold text-purple-200">1-10V Systems - Service Areas</h5>
                    <p className="text-purple-100 text-sm">
                      Corridors, storage areas, and plant rooms utilised 1-10V dimming for reliable, cost-effective control 
                      with simple time-based and occupancy-triggered dimming sequences.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded">
                    <h5 className="font-semibold text-amber-200">Smart Lighting - Meeting Spaces</h5>
                    <p className="text-amber-100 text-sm">
                      Bluetooth mesh-enabled LED panels in 18 meeting rooms allowing mobile app control, 
                      calendar integration, and dynamic scene adjustment for presentations and video conferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/30 border border-yellow-400/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-3">Integration Challenges and Solutions</h4>
                <div className="space-y-2">
                  <p className="text-blue-100 text-sm">
                    <strong>Challenge:</strong> Three different protocols required coordination through a single BMS interface.
                  </p>
                  <p className="text-blue-100 text-sm">
                    <strong>Solution:</strong> Multi-protocol gateway installed to translate between DALI, analog, and Bluetooth signals, 
                    presenting unified control interface to the BMS.
                  </p>
                  <p className="text-blue-100 text-sm">
                    <strong>Result:</strong> Seamless integration enabling centralised monitoring, scheduling, and energy management 
                    across all lighting systems through the main BMS platform.
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/30 border border-amber-500/40 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Achieved Results</h4>
                <ul className="text-amber-100 text-sm space-y-1">
                  <li>• <strong>30% energy reduction</strong> compared to previous conventional lighting system</li>
                  <li>• <strong>Individual workstation control</strong> improving occupant satisfaction scores by 25%</li>
                  <li>• <strong>Predictive maintenance</strong> reducing lighting service calls by 40%</li>
                  <li>• <strong>Flexible meeting spaces</strong> with instant lighting scene changes</li>
                  <li>• <strong>Detailed analytics</strong> enabling further optimisation opportunities</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p className="text-sm sm:text-base">
                Successful integration of lighting control systems with BMS platforms requires comprehensive understanding of each 
                protocol's capabilities, limitations, and implementation requirements. DALI provides sophisticated individual control 
                with excellent feedback capabilities, 1–10V offers reliable and cost-effective group dimming, whilst smart lighting 
                systems deliver unparalleled flexibility and integration possibilities.
              </p>
              <p className="text-sm sm:text-base">
                For electricians, mastering these technologies involves not only understanding the technical specifications but also 
                developing practical skills in proper installation techniques, systematic commissioning procedures, and effective 
                troubleshooting methods. Each protocol demands specific attention to wiring segregation, addressing procedures, 
                and integration testing to ensure reliable long-term operation.
              </p>
              <p className="text-sm sm:text-base">
                The London office case study demonstrates the power of hybrid approaches, where different protocols are strategically 
                deployed based on specific area requirements. This results in optimal functionality, cost-effectiveness, and energy 
                performance whilst maintaining seamless integration through modern BMS platforms and gateway technologies.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule4Section1QuizData}
                title="BMS Module 4 Section 1: Lighting Integration Assessment"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <Link to="../bms-module-4" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 4
              </Button>
            </Link>
            
            <Link to="../bms-module-4-section-2" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section: Environmental Control Integration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BMSModule4Section1;