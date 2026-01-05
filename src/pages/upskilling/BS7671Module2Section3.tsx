import { ArrowLeft, ArrowRight, Star, AlertTriangle, CheckCircle, Zap, Shield, Target, FileText, Lightbulb, TrendingUp, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module2Section3 = () => {
  // SEO
  useEffect(() => {
    const title = 'Amendment 2 & 3 New Definitions - AFDD, PEI, Bidirectional Protection | BS 7671 Module 2 Section 3';
    document.title = title;
    const desc = 'Learn new definitions from BS 7671 Amendment 2 & 3 including AFDD, PEI, Functional Earthing, and bidirectional protection terminology for renewable energy systems.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const quizQuestions = [
    {
      id: 1,
      question: "What does AFDD stand for?",
      options: [
        "Automatic Fire Detection Device",
        "Arc Fault Detection Device",
        "Advanced Fault Detection Device",
        "Automatic Fault Disconnection Device"
      ],
      correct: 1,
      explanation: "AFDD stands for Arc Fault Detection Device, which detects dangerous arcing conditions that traditional protective devices cannot sense."
    },
    {
      id: 2,
      question: "What risk does an AFDD help prevent?",
      options: [
        "Electric shock only",
        "Overcurrent conditions",
        "Fire caused by arc faults",
        "Voltage fluctuations"
      ],
      correct: 2,
      explanation: "AFDDs primarily help prevent fires caused by dangerous arc faults that can occur due to damaged cables or poor connections."
    },
    {
      id: 3,
      question: "How is functional earthing different from protective earthing?",
      options: [
        "Functional earthing uses smaller conductors",
        "Functional earthing is for equipment operation, not safety",
        "Functional earthing is only for DC systems",
        "There is no difference"
      ],
      correct: 1,
      explanation: "Functional earthing is used for equipment operation (like signal integrity or EMI suppression), while protective earthing is specifically for safety."
    },
    {
      id: 4,
      question: "What type of systems might require PEI (Protective Equipotential Bonding for Electrical Interference)?",
      options: [
        "Simple lighting circuits",
        "Smart home systems with electronic equipment",
        "Basic socket outlets",
        "Manual switches only"
      ],
      correct: 1,
      explanation: "PEI is required for smart home systems and other installations with sensitive electronic equipment that could be affected by electromagnetic interference."
    },
    {
      id: 5,
      question: "Why were these new definitions introduced in Amendment 2?",
      options: [
        "To make the regulations longer",
        "To reflect technological developments and emerging safety challenges",
        "To replace old definitions",
        "To align with American standards"
      ],
      correct: 1,
      explanation: "Amendment 2 introduced new definitions to address technological developments like smart homes, renewable energy, and emerging safety challenges."
    },
    {
      id: 6,
      question: "What is the key focus of Amendment 3's bidirectional protection requirements?",
      options: [
        "Improving traditional circuit protection",
        "Protecting against reverse current flow from renewable energy sources",
        "Enhancing RCD performance",
        "Reducing installation costs"
      ],
      correct: 1,
      explanation: "Amendment 3 focuses on bidirectional protection to manage reverse current flows from renewable energy sources like solar PV and energy storage systems."
    },
    {
      id: 7,
      question: "Which installations require bidirectional protective devices under Amendment 3?",
      options: [
        "All domestic installations",
        "Only commercial premises",
        "Prosumer installations with renewable generation or energy storage",
        "Traditional installations without generation"
      ],
      correct: 2,
      explanation: "Amendment 3 requires bidirectional protective devices specifically for prosumer installations that have renewable generation or energy storage capabilities."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Star className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  New Definitions from Amendment 2 & 3
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  AFDD, PEI, Functional Earthing & Bidirectional Protection
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
              <Badge variant="outline" className="border-yellow-600 text-yellow-300">
                Amendment 2 & 3
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                This section covers the evolution of electrical terminology from Amendment 2's foundational definitions through to Amendment 3's current requirements. Amendment 2 introduced critical terms like AFDD and PEI, while Amendment 3 builds on this foundation with essential bidirectional protection terminology for our renewable energy future.
              </p>
              <p className="text-base leading-relaxed">
                With Amendment 3 now effective from 31st July 2024, understanding both sets of definitions is crucial - Amendment 2 terms remain relevant for smart installations, while Amendment 3 terms are mandatory for prosumer installations with renewable generation or energy storage.
              </p>
              <Alert className="bg-green-600/10 border-green-600/30">
                <Star className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Current Practice:</strong> Modern electrical installations increasingly combine Amendment 2 technologies (smart systems, AFDDs) with Amendment 3 requirements (bidirectional protection for renewables), making both sets of definitions essential knowledge.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand Amendment 2 definitions: AFDDs, PEI, and Functional Earthing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Master Amendment 3 bidirectional protection terminology
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise when bidirectional protective devices are required
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Apply current terminology in renewable energy installations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand prosumer installation requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Stay compliant with Amendment 3 effective from July 2024
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* AFDD - Arc Fault Detection Device */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                AFDD - Arc Fault Detection Device
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Arc Fault Detection Devices (AFDDs) represent a significant advancement in electrical fire prevention. They detect dangerous arcing conditions that traditional MCBs and RCDs cannot identify, providing enhanced protection against electrical fires.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Understanding Arc Faults</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">What Are Arc Faults?</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Unintended electrical discharge between conductors</li>
                      <li>• Generate intense heat (over 6,000°C)</li>
                      <li>• Can occur without tripping conventional protection</li>
                      <li>• Major cause of electrical fires</li>
                      <li>• Often caused by damaged cables or poor connections</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Common Causes</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Cable damage from nails or drilling</li>
                      <li>• Deteriorated insulation over time</li>
                      <li>• Loose or corroded connections</li>
                      <li>• Rodent damage to cables</li>
                      <li>• Overloaded extension leads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                  <h5 className="text-white font-semibold mb-3">How AFDDs Work</h5>
                  <div className="space-y-2">
                    <p className="text-xs">AFDDs use sophisticated algorithms to distinguish between:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Normal electrical noise and dangerous arcs</li>
                      <li>• Parallel arcs (line to neutral/earth)</li>
                      <li>• Series arcs (in damaged conductors)</li>
                      <li>• Load switching vs dangerous arcing</li>
                    </ul>
                    <p className="text-xs mt-2">When a dangerous arc is detected, the AFDD disconnects the circuit within milliseconds.</p>
                  </div>
                </div>

                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-white font-semibold mb-3">Installation Requirements</h5>
                  <div className="space-y-2">
                    <p className="text-xs">Amendment 2 requires AFDDs in specific locations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Higher risk of ignition premises</li>
                      <li>• Premises with sleeping accommodation</li>
                      <li>• When cables are concealed in combustible construction</li>
                      <li>• Circuits feeding socket outlets up to 32A</li>
                    </ul>
                    <p className="text-xs mt-2">Risk assessment determines specific requirements for each installation.</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">AFDD vs Traditional Protection</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">MCB Protection</h5>
                    <p className="text-xs">Detects overcurrent and short circuits but cannot sense dangerous arcing at normal current levels</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">RCD Protection</h5>
                    <p className="text-xs">Detects earth leakage currents but parallel arcs may not create sufficient imbalance to trip</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">AFDD Protection</h5>
                    <p className="text-xs">Specifically designed to detect the unique signatures of dangerous arcing conditions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PEI - Protective Equipotential Bonding for Electrical Interference */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Radio className="h-6 w-6 text-yellow-400" />
                PEI - Protective Equipotential Bonding for Electrical Interference
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                PEI addresses the growing need to protect sensitive electronic equipment from electromagnetic interference (EMI) in modern smart installations. It's a specialized form of equipotential bonding designed for signal integrity rather than basic electrical safety.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Understanding Electromagnetic Interference</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Sources of EMI</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Switching power supplies</li>
                      <li>• Variable frequency drives</li>
                      <li>• LED lighting with electronic control gear</li>
                      <li>• Wireless communication devices</li>
                      <li>• Electric vehicle charging equipment</li>
                      <li>• Renewable energy inverters</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Affected Equipment</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Smart home automation systems</li>
                      <li>• Security and access control systems</li>
                      <li>• Fire alarm and detection systems</li>
                      <li>• Audio/visual equipment</li>
                      <li>• Computer networks and servers</li>
                      <li>• Building management systems</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                  <h5 className="text-white font-semibold mb-3">PEI Implementation</h5>
                  <div className="space-y-2">
                    <h6 className="text-white font-semibold text-sm">Key Requirements:</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Low impedance bonding connections</li>
                      <li>• Star-point earthing arrangements where appropriate</li>
                      <li>• Separation of noisy and clean earth systems</li>
                      <li>• Dedicated EMI suppression measures</li>
                      <li>• Coordinated cable routing and screening</li>
                    </ul>
                    <p className="text-xs mt-2">PEI works alongside but is separate from protective equipotential bonding for safety.</p>
                  </div>
                </div>

                <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                  <h5 className="text-white font-semibold mb-3">Design Considerations</h5>
                  <div className="space-y-2">
                    <h6 className="text-white font-semibold text-sm">Planning Requirements:</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Early coordination with IT/AV specialists</li>
                      <li>• Assessment of EMI sources and susceptible equipment</li>
                      <li>• Selection of appropriate cable types and routes</li>
                      <li>• Consideration of frequency response requirements</li>
                      <li>• Integration with building automation systems</li>
                    </ul>
                    <p className="text-xs mt-2">Requires specialized knowledge beyond traditional electrical installation.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Practical Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">Smart Homes</h5>
                    <p className="text-xs">Ensures reliable operation of home automation, security systems, and smart appliances without interference</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">Commercial Buildings</h5>
                    <p className="text-xs">Protects building management systems, access control, and fire safety systems from EMI</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">Data Centers</h5>
                    <p className="text-xs">Critical for maintaining signal integrity in high-density electronic equipment installations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Functional Earthing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Functional Earthing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Functional Earthing is earthing required for proper operation of electrical equipment, distinct from protective earthing which is required for safety. This definition clarifies the different purposes of earthing connections in modern installations.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Functional vs Protective Earthing</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Protective Earthing</h5>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h6 className="text-white font-semibold text-sm mb-2">Purpose: Safety</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Prevents dangerous voltages on metalwork</li>
                        <li>• Enables automatic disconnection during faults</li>
                        <li>• Required by safety regulations</li>
                        <li>• Sized for fault current capacity</li>
                        <li>• Cannot be switched or isolated during operation</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-3">Functional Earthing</h5>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <h6 className="text-white font-semibold text-sm mb-2">Purpose: Operation</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Required for equipment to function correctly</li>
                        <li>• Provides reference potential for circuits</li>
                        <li>• May be needed for EMI suppression</li>
                        <li>• Can be isolated for testing/maintenance</li>
                        <li>• Sizing based on functional requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-white font-semibold mb-3">IT Equipment</h5>
                  <div className="space-y-2">
                    <p className="text-xs">Computer systems often require functional earthing for:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Signal reference levels</li>
                      <li>• EMI suppression filtering</li>
                      <li>• Static discharge protection</li>
                      <li>• Communication protocols</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                  <h5 className="text-white font-semibold mb-3">Control Systems</h5>
                  <div className="space-y-2">
                    <p className="text-xs">Industrial control equipment needs functional earthing for:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Sensor reference potentials</li>
                      <li>• Analog signal integrity</li>
                      <li>• Noise immunity</li>
                      <li>• Communication buses</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                  <h5 className="text-white font-semibold mb-3">Electronic Equipment</h5>
                  <div className="space-y-2">
                    <p className="text-xs">Modern electronic devices may require functional earthing for:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Circuit operation</li>
                      <li>• RF interference reduction</li>
                      <li>• Voltage reference</li>
                      <li>• Safe operation modes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-white font-semibold mb-3">Design Implications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Installation Considerations</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Separate functional earth may be required</li>
                      <li>• Different earthing arrangements for different equipment</li>
                      <li>• Consideration of earth loop interactions</li>
                      <li>• Documentation of functional earthing requirements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Maintenance Implications</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Functional earthing may be temporarily disconnected</li>
                      <li>• Different testing procedures may apply</li>
                      <li>• Equipment operation may be affected by earth integrity</li>
                      <li>• Specialist knowledge may be required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Amendment 2 Definitions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Other Key Amendment 2 Definitions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Amendment 2 introduced several other important definitions that reflect technological developments and changing installation practices in modern electrical work.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Energy Efficiency Definitions</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Energy Storage System</h5>
                      <p className="text-xs mt-1">System consisting of one or more energy storage devices, power conversion equipment, and associated control systems</p>
                    </div>
                    <div className="bg-green-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">DC Installation</h5>
                      <p className="text-xs mt-1">Installation where DC circuits are used for power distribution, common in renewable energy systems</p>
                    </div>
                    <div className="bg-green-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Prosumer</h5>
                      <p className="text-xs mt-1">Entity that both consumes and produces electrical energy, typically through renewable sources</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Smart Technology Definitions</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Smart Installation</h5>
                      <p className="text-xs mt-1">Installation incorporating communication technology for monitoring, control, and optimization</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Load Management System</h5>
                      <p className="text-xs mt-1">System that controls electrical loads to optimize energy consumption and demand</p>
                    </div>
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Communication Network</h5>
                      <p className="text-xs mt-1">Infrastructure enabling data exchange between electrical equipment and control systems</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Impact on Modern Installations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Design complexity:</strong> New definitions reflect more complex system interactions</li>
                    <li>• <strong>Safety considerations:</strong> Additional safety measures for energy storage and DC systems</li>
                    <li>• <strong>Integration requirements:</strong> Need for coordination between multiple systems</li>
                    <li>• <strong>Future developments:</strong> Framework for emerging technologies</li>
                  </ul>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Professional development:</strong> Electricians must understand smart technologies</li>
                    <li>• <strong>Testing procedures:</strong> New definitions may require different test methods</li>
                    <li>• <strong>Documentation:</strong> More detailed commissioning and handover information</li>
                    <li>• <strong>Maintenance:</strong> Specialized knowledge for smart system maintenance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario - Amendment 2 & 3 Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Modern Net-Zero Smart Home (2024)</h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Project:</strong> A new-build family home meeting 2024 building regulations with smart automation, renewable energy generation, battery storage, and EV charging. The installation must comply with both Amendment 2 and Amendment 3 requirements.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        <strong>Amendment 2 Definitions Applied:</strong>
                      </p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• <strong>AFDD protection:</strong> Required for socket circuits in timber frame sleeping accommodation</li>
                        <li>• <strong>PEI implementation:</strong> Smart home hub protected from EMI generated by solar inverters and LED drivers</li>
                        <li>• <strong>Functional earthing:</strong> Separate signal reference earth for home automation and security systems</li>
                        <li>• <strong>Energy storage system:</strong> 13.5kWh battery with AC coupling</li>
                        <li>• <strong>Smart installation:</strong> Integrated energy management with automated load control</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold">
                        <strong>Amendment 3 Requirements:</strong>
                      </p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• <strong>Bidirectional protection:</strong> Required for 8kW solar PV system with grid export capability</li>
                        <li>• <strong>Prosumer installation:</strong> Property consumes grid energy and exports surplus solar generation</li>
                        <li>• <strong>Grid interaction safety:</strong> Bidirectional RCBO protecting solar and battery circuits</li>
                        <li>• <strong>DNO coordination:</strong> Export limitation and G98 compliance for sub-16A connection</li>
                        <li>• <strong>V2G preparation:</strong> Future-ready for bidirectional EV charging</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-sm font-semibold">
                    <strong>Integrated Design Challenges:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• Coordinating AFDD protection with bidirectional protection devices</li>
                    <li>• Managing EMI from high-frequency solar inverters affecting smart automation reliability</li>
                    <li>• Implementing separate protective and functional earthing systems</li>
                    <li>• Ensuring fault current coordination between traditional and bidirectional protection</li>
                    <li>• Future-proofing for smart grid participation and energy trading</li>
                  </ul>
                  
                  <p className="text-sm font-semibold">
                    <strong>Success Factors for Amendment 2 & 3 Compliance:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• Early coordination between smart systems specialist, renewables installer, and DNO</li>
                    <li>• Comprehensive protection strategy addressing both fire safety (AFDD) and grid safety (bidirectional)</li>
                    <li>• Integrated earthing design covering protective, functional, and EMI requirements</li>
                    <li>• Detailed fault current analysis for both forward and reverse current flows</li>
                    <li>• Documentation using current Amendment 3 terminology and compliance certificates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amendment 3 - Bidirectional Protection */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Amendment 3 - Bidirectional Protection Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Amendment 3, effective from 31st July 2024, introduces critical terminology for bidirectional protection in renewable energy and prosumer installations. These definitions address the unique challenges of managing reverse current flows from generation sources.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Amendment 3 Definitions</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Bidirectional Protective Device</h5>
                    <p className="text-sm mb-2">A protective device that can interrupt fault currents flowing in both directions through the device.</p>
                    <ul className="text-xs space-y-1">
                      <li>• Essential for prosumer installations</li>
                      <li>• Protects against reverse fault currents</li>
                      <li>• Ensures grid and installation safety</li>
                      <li>• Required for renewable energy sources</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold mb-2">Prosumer Installation</h5>
                    <p className="text-sm mb-2">An electrical installation that both consumes and produces electrical energy.</p>
                    <ul className="text-xs space-y-1">
                      <li>• Solar PV installations</li>
                      <li>• Wind generation systems</li>
                      <li>• Energy storage systems</li>
                      <li>• Combined heat and power units</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-white font-semibold mb-3">When Bidirectional Protection is Required</h5>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold">Mandatory Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• New prosumer installations from 31st July 2024</li>
                      <li>• Solar PV systems with grid connection</li>
                      <li>• Energy storage systems that can export</li>
                      <li>• Wind generation installations</li>
                      <li>• Micro-CHP systems</li>
                    </ul>
                    <p className="text-xs mt-2">Risk assessment determines specific requirements for each installation type.</p>
                  </div>
                </div>

                <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                  <h5 className="text-white font-semibold mb-3">Implementation Considerations</h5>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold">Design Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Assessment of maximum reverse fault current</li>
                      <li>• Coordination with grid protection systems</li>
                      <li>• Selection of appropriate bidirectional devices</li>
                      <li>• Integration with energy management systems</li>
                      <li>• Compliance with DNO requirements</li>
                    </ul>
                    <p className="text-xs mt-2">Requires understanding of both electrical protection and renewable energy systems.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Grid Interaction and Safety</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">Grid Protection</h5>
                    <p className="text-xs">Bidirectional protection ensures that faults in prosumer installations don't compromise grid stability or safety for other users.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-1">Installation Safety</h5>
                    <p className="text-xs">Protects prosumer installation equipment and personnel from reverse fault currents that could exceed design parameters.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                This section covers the progression from Amendment 2's foundational definitions to Amendment 3's current bidirectional protection requirements. These terms are essential for working with modern installations from smart homes to renewable energy systems.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Amendment 2 Foundations</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• AFDDs provide critical fire protection against arc faults</li>
                      <li>• PEI addresses EMI challenges in smart installations</li>
                      <li>• Functional earthing serves equipment operation needs</li>
                      <li>• New energy technology definitions reflect modern practice</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Amendment 3 Current Requirements</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• Bidirectional protection mandatory for prosumer installations</li>
                      <li>• Effective from 31st July 2024 for new installations</li>
                      <li>• Essential for renewable energy and storage systems</li>
                      <li>• Grid interaction safety is paramount</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Amendment 2 & 3 Definitions Quiz"
            description="Test your understanding of new definitions from BS 7671 Amendment 2 & 3, including bidirectional protection."
          />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to="../bs7671-module-2-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-2-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module2Section3;