import { ArrowLeft, Shield, CheckCircle, Target, Lightbulb, Zap, Battery, Car, Wifi, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's the main purpose of an SPD?",
      options: [
        "To provide overcurrent protection",
        "To divert surge energy to earth and clamp voltage to safe levels",
        "To detect earth faults",
        "To provide isolation"
      ],
      correct: 1,
      explanation: "SPDs protect against transient overvoltages by diverting surge energy to earth and clamping voltage to safe levels, protecting connected equipment."
    },
    {
      id: 2,
      question: "When is a Type 1 SPD used?",
      options: [
        "For general protection in consumer units",
        "For point-of-use protection",
        "For direct lightning strikes or external surges at main distribution boards",
        "Only in industrial installations"
      ],
      correct: 2,
      explanation: "Type 1 SPDs are designed for direct lightning strikes or external surges and are typically installed at the main distribution board."
    },
    {
      id: 3,
      question: "What four consequences trigger mandatory SPD installation?",
      options: [
        "Cost, availability, installation time, maintenance",
        "Serious injury/loss of life, public services/cultural heritage, commercial/industrial damage, affecting large groups",
        "Voltage levels, current ratings, environmental conditions, building type",
        "Lightning risk, switching surges, utility faults, equipment sensitivity"
      ],
      correct: 1,
      explanation: "SPDs are mandatory where consequences could cause serious injury/loss of life, affect public services or cultural heritage, damage commercial/industrial activity, or affect large groups of people."
    },
    {
      id: 4,
      question: "What's the difference between Type 2 and Type 3 SPDs?",
      options: [
        "Type 2 is for AC, Type 3 is for DC",
        "Type 2 is for general protection in distribution boards, Type 3 is for point-of-use protection of sensitive electronics",
        "Type 2 is cheaper, Type 3 is more expensive",
        "Type 2 is mandatory, Type 3 is optional"
      ],
      correct: 1,
      explanation: "Type 2 SPDs provide general protection from switching surges in distribution boards, while Type 3 SPDs offer point-of-use protection for sensitive electronics and are used alongside upstream SPDs."
    },
    {
      id: 5,
      question: "Where should SPDs be placed?",
      options: [
        "At the end of long cable runs",
        "As close as possible to the origin of the installation",
        "Only in outdoor locations",
        "In every room of the building"
      ],
      correct: 1,
      explanation: "SPDs should be placed as close as possible to the origin of the installation to provide effective protection, typically at the main distribution board."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Surge Protection Devices (SPDs) – When and Why
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Protecting electrical systems against transient overvoltages
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Electrical surges can cause serious damage to sensitive electronic equipment and pose fire risks. Surge Protection Devices (SPDs) are used to safeguard electrical systems against transient overvoltages, especially in installations with high exposure risk.
              </p>
              <p className="text-base leading-relaxed">
                Understanding when and why to install SPDs is crucial for protecting modern electrical installations and ensuring compliance with BS 7671 requirements.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand what causes surges and how they affect installations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify when SPDs are required under BS 7671</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Learn about the different types and locations for SPDs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand coordination with other protective devices</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Is a Surge */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-500" />
                What Is a Surge?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Transient Overvoltages</h4>
                <p className="text-sm mb-3">
                  Electrical surges are transient overvoltages caused by lightning strikes, switching events, or utility faults. Though they typically last only microseconds, they can cause insulation breakdown or data loss.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Lightning Strikes</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Direct strikes to buildings or nearby structures</li>
                    <li>• Induced voltages from nearby strikes</li>
                    <li>• Can reach tens of thousands of volts</li>
                    <li>• Most severe but less common cause</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Switching Events</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Motor starting and stopping</li>
                    <li>• Capacitor bank switching</li>
                    <li>• Utility grid switching operations</li>
                    <li>• Most common cause of surges</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Utility Faults</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Transformer failures</li>
                    <li>• Line-to-ground faults</li>
                    <li>• Power system disturbances</li>
                    <li>• Voltage regulation issues</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-red-400 font-semibold mb-3">Potential Damage</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Immediate Effects:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Equipment destruction or damage</li>
                      <li>• Data corruption or loss</li>
                      <li>• System shutdowns</li>
                      <li>• Fire risk from overheating</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Long-term Effects:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Reduced equipment lifespan</li>
                      <li>• Degraded performance</li>
                      <li>• Increased maintenance costs</li>
                      <li>• System reliability issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Do SPDs Do */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-500" />
                What Do SPDs Do?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Protection Mechanisms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Divert Surge Energy:</p>
                    <p className="text-xs">SPDs provide a low-impedance path to earth, diverting dangerous surge currents away from sensitive equipment.</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Clamp Voltage:</p>
                    <p className="text-xs">They limit the voltage that reaches protected equipment to safe levels, preventing damage.</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">How SPDs Work</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">1.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Normal Operation</p>
                      <p className="text-xs text-gray-400">SPD presents high impedance, allowing normal current flow</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">2.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Surge Detection</p>
                      <p className="text-xs text-gray-400">When voltage exceeds threshold, SPD activates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">3.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Energy Diversion</p>
                      <p className="text-xs text-gray-400">SPD conducts surge current to earth, clamping voltage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">4.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Reset</p>
                      <p className="text-xs text-gray-400">After surge passes, SPD returns to high impedance state</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of SPDs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-500" />
                Types of SPDs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <div className="bg-red-600/20 p-3 rounded border border-red-600/40 mb-4">
                    <h4 className="text-red-400 font-semibold text-lg mb-2">Type 1 SPDs</h4>
                    <p className="text-xs">For direct lightning strikes or external surges</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Main distribution boards</li>
                        <li>• Service entrance equipment</li>
                        <li>• Buildings with external lightning protection</li>
                        <li>• High-exposure locations</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">Characteristics:</p>
                      <ul className="text-xs space-y-1">
                        <li>• High surge current rating (25-100kA)</li>
                        <li>• Low protection level</li>
                        <li>• Robust construction</li>
                        <li>• Often gas discharge tube based</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40 mb-4">
                    <h4 className="text-yellow-400 font-semibold text-lg mb-2">Type 2 SPDs</h4>
                    <p className="text-xs">For general protection from switching surges</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Consumer units and sub-boards</li>
                        <li>• Most common type installed</li>
                        <li>• Commercial and residential buildings</li>
                        <li>• Standard protection requirement</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">Characteristics:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Medium surge current rating (5-40kA)</li>
                        <li>• Good protection level</li>
                        <li>• Metal oxide varistor (MOV) based</li>
                        <li>• Cost-effective solution</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <div className="bg-green-600/20 p-3 rounded border border-green-600/40 mb-4">
                    <h4 className="text-green-400 font-semibold text-lg mb-2">Type 3 SPDs</h4>
                    <p className="text-xs">For point-of-use protection for sensitive electronics</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• At sensitive equipment locations</li>
                        <li>• IT and data communication equipment</li>
                        <li>• Medical equipment protection</li>
                        <li>• Used with upstream Type 2 SPDs</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">Characteristics:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Lower surge current rating (1-10kA)</li>
                        <li>• Very low protection level</li>
                        <li>• Fast response time</li>
                        <li>• Often built into equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Coordination and Selection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Installation Strategy:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Type 1 at service entrance for lightning protection</li>
                      <li>• Type 2 at distribution boards for switching surges</li>
                      <li>• Type 3 for sensitive equipment point-of-use</li>
                      <li>• Maintain minimum separation distances</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Selection Criteria:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Risk assessment of installation</li>
                      <li>• Lightning protection system presence</li>
                      <li>• Equipment sensitivity levels</li>
                      <li>• Economic impact of failures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* When SPDs are Required */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                When are SPDs Required?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">BS 7671 Requirements</h4>
                <p className="text-sm mb-3">
                  SPDs are mandatory where the consequences of failure could be serious injury or loss of life, interruption of public services, or significant economic loss. Risk assessment determines the need.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Mandatory Applications</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Where consequences involve serious injury or loss of life</li>
                    <li>• Interruption to public services (hospitals, emergency services)</li>
                    <li>• Commercial or industrial activity interruption</li>
                    <li>• Systems serving large numbers of people</li>
                    <li>• Cultural heritage locations (museums, historic buildings)</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Risk Assessment Factors</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Lightning activity level (Ng value for area)</li>
                    <li>• Building height and exposure</li>
                    <li>• Presence of external lightning protection</li>
                    <li>• Soil resistivity and earthing system</li>
                    <li>• Equipment sensitivity and replacement cost</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-400 font-semibold mb-3">Installation Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Location Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• As close as possible to origin of installation</li>
                      <li>• Short connection leads (max 0.5m total)</li>
                      <li>• Accessible for inspection and maintenance</li>
                      <li>• Clear labelling and identification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Coordination Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Upstream overcurrent protection</li>
                      <li>• Selectivity with other protective devices</li>
                      <li>• Earth fault loop impedance considerations</li>
                      <li>• Regular testing and maintenance schedule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amendment 3 Updates - EV and Renewable Energy SPD Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Car className="h-6 w-6 text-yellow-400" />
                Amendment 3: SPDs for EV Charging and Renewable Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Enhanced SPD Requirements</h4>
                <p className="text-sm mb-3">
                  Amendment 3 introduces specific SPD considerations for EV charging infrastructure and renewable energy installations, addressing the unique surge risks from bidirectional power flow and DC circuits.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">EV Charging Protection</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Type 2 SPDs mandatory for EV charging circuits</li>
                    <li>• Coordination with DC fault protection</li>
                    <li>• Protection against switching surges from EV chargers</li>
                    <li>• Enhanced earthing requirements for SPD installation</li>
                    <li>• Consideration of harmonics and power quality</li>
                    <li>• Integration with smart charging systems</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold text-lg mb-3">Renewable Energy Systems</h4>
                  <ul className="text-sm space-y-2">
                    <li>• SPDs required for both AC and DC sides of inverters</li>
                    <li>• Protection of battery storage systems</li>
                    <li>• Coordination with bidirectional power flow</li>
                    <li>• Enhanced surge immunity for smart inverters</li>
                    <li>• Protection of monitoring and control systems</li>
                    <li>• Grid-tie protection considerations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Smart Grid Integration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Communication Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Protection of data communication lines</li>
                      <li>• Surge protection for IoT devices</li>
                      <li>• Ethernet and wireless system protection</li>
                      <li>• Integration with building management systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Energy Storage Protection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Battery management system (BMS) protection</li>
                      <li>• DC surge protection devices</li>
                      <li>• Isolation and switching surge protection</li>
                      <li>• Fire safety considerations for battery systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Installation Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-6 w-6 text-purple-500" />
                Advanced Installation and Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Modern Installation Practices</h4>
                <p className="text-sm mb-3">
                  Modern installations require careful consideration of SPD placement, coordination with other protective devices, and integration with smart building systems.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold text-lg mb-3">Smart Building Integration</h4>
                  <ul className="text-sm space-y-2">
                    <li>• BMS integration and monitoring</li>
                    <li>• Remote status indication</li>
                    <li>• Predictive maintenance capabilities</li>
                    <li>• Energy management system protection</li>
                    <li>• Cybersecurity considerations</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-indigo-400 font-semibold text-lg mb-3">Coordination Strategy</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Cascaded protection systems</li>
                    <li>• Selectivity with other devices</li>
                    <li>• Earth fault loop impedance effects</li>
                    <li>• Backup protection considerations</li>
                    <li>• Testing and commissioning protocols</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-semibold text-lg mb-3">Future-Proofing</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Scalability for system expansion</li>
                    <li>• Upgrade paths for new technologies</li>
                    <li>• Compatibility with emerging standards</li>
                    <li>• Maintenance access and replacement</li>
                    <li>• Performance monitoring systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <h4 className="text-red-400 font-semibold">Critical Installation Points</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Earthing System:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Low impedance earth connection essential</li>
                      <li>• Separate earthing for sensitive equipment</li>
                      <li>• Earth electrode resistance monitoring</li>
                      <li>• Equipotential bonding requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Connection Length:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Keep connection leads as short as possible</li>
                      <li>• Maximum 0.5m total lead length</li>
                      <li>• Use appropriate conductor sizes</li>
                      <li>• Avoid sharp bends and loops</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge: SPDs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white">
                Test your understanding of Surge Protection Devices and their applications.
              </p>

              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="SPD Requirements and Applications"
                description="Test your knowledge of BS 7671 surge protection requirements"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-4-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-4-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module4Section5;