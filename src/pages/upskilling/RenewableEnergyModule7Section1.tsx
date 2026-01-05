import { ArrowLeft, Shield, Lightbulb, AlertTriangle, Wrench, Cable, Zap, CheckCircle, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section1Questions } from '@/data/upskilling/renewableEnergyModule7QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import InstallationBestPracticesFAQ from '@/components/upskilling/renewable-energy/InstallationBestPracticesFAQ';
import InstallationBestPracticesPractical from '@/components/upskilling/renewable-energy/InstallationBestPracticesPractical';

const RenewableEnergyModule7Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is a key risk when handling DC systems?",
      options: [
        "Lower voltage levels make them safer",
        "DC arc formation that doesn't self-extinguish",
        "They use less current than AC",
        "DC cables are always insulated"
      ],
      correct: 1,
      explanation: "DC arcs do not have a natural zero crossing point like AC, making them more difficult to extinguish and creating serious fire and shock hazards during faults or switching operations."
    },
    {
      id: 2,
      question: "Why is cable support spacing important?",
      options: [
        "To reduce installation costs",
        "To prevent mechanical stress and maintain cable integrity",
        "To improve system efficiency",
        "To meet aesthetic requirements only"
      ],
      correct: 1,
      explanation: "Proper cable support spacing prevents mechanical stress, wind-induced movement, and thermal expansion damage that can lead to insulation failure and system faults over time."
    },
    {
      id: 3,
      question: "What's the purpose of bonding metal enclosures?",
      options: [
        "To improve system performance",
        "To provide an equipotential zone and fault protection",
        "To reduce electromagnetic interference only",
        "To save on cable costs"
      ],
      correct: 1,
      explanation: "Bonding creates an equipotential zone that prevents dangerous voltage differences between metal parts and provides a low-impedance path for fault currents to ensure protective devices operate correctly."
    },
    {
      id: 4,
      question: "Name a typical DC safety label requirement.",
      options: [
        "Installation date only",
        "Warning of dual supply (AC and DC) at inverter",
        "Installer's name",
        "System efficiency rating"
      ],
      correct: 1,
      explanation: "BS 7671 requires warning labels indicating the presence of dual supplies (AC and DC) at the inverter, as this creates additional hazards during maintenance and emergency response."
    },
    {
      id: 5,
      question: "How does poor cable routing lead to long-term faults?",
      options: [
        "It reduces system efficiency immediately",
        "Mechanical stress, water ingress, and UV degradation cause insulation failure",
        "It affects the warranty only",
        "It changes the electrical characteristics"
      ],
      correct: 1,
      explanation: "Poor cable routing exposes cables to mechanical stress, water ingress at sharp bends, UV degradation, and thermal cycling, all of which gradually degrade insulation and lead to earth faults or arc faults."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Installation Best Practices (DC Safety, Cable Management, Earth Bonding)
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Core principles for safe and professional renewable system installations
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Installation Standards
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
                  Apply correct DC safety standards
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Implement effective cable management
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand earth bonding and earthing system protocols
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
                Professional renewable energy installations require adherence to core safety principles and best practices. This section focuses on the critical aspects of DC safety, cable management, and earth bonding that ensure safe, reliable, and compliant installations in accordance with BS 7671 and industry standards.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                DC Arc Hazards and Isolation Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                DC systems present unique hazards that require specific safety procedures and equipment. Understanding DC arc characteristics and proper isolation methods is critical for installer safety and system reliability.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">DC Arc Hazards:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>No natural zero crossing:</strong> Arcs do not self-extinguish</li>
                    <li>• <strong>High energy content:</strong> Can reach temperatures {">20,000°C"}</li>
                    <li>• <strong>Sustained duration:</strong> Continue until manually interrupted</li>
                    <li>• <strong>Metal vapour production:</strong> Conductive plasma formation</li>
                    <li>• <strong>Fire ignition risk:</strong> Can ignite surrounding materials</li>
                    <li>• <strong>Equipment damage:</strong> Carbonises insulation materials</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Arc Initiation Causes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Loose connections:</strong> High resistance heating</li>
                    <li>• <strong>Connector degradation:</strong> Corrosion and contact wear</li>
                    <li>• <strong>Insulation failure:</strong> Age, UV, or mechanical damage</li>
                    <li>• <strong>Water ingress:</strong> Tracking across wet surfaces</li>
                    <li>• <strong>Live working:</strong> Incorrect disconnection procedures</li>
                    <li>• <strong>Vermin damage:</strong> Cable insulation compromise</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-3">Safe DC Isolation Procedures:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Before Working (LOTO Procedure):</h5>
                    <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                      <li>Turn off AC isolator at inverter</li>
                      <li>Turn off DC isolator at inverter</li>
                      <li>Cover or shade solar panels if possible</li>
                      <li>Open string fuses/breakers at combiner</li>
                      <li>Test circuits are dead with approved tester</li>
                      <li>Apply locks and warning labels</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Re-energisation Steps:</h5>
                    <ol className="text-gray-300 space-y-1 list-decimal list-inside">
                      <li>Remove all personnel from work area</li>
                      <li>Close string fuses/breakers</li>
                      <li>Check for any visible damage</li>
                      <li>Close DC isolator at inverter</li>
                      <li>Close AC isolator at inverter</li>
                      <li>Monitor system startup and operation</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-3">DC-Rated Equipment Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Isolators:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Must be DC-rated for system voltage</li>
                      <li>• Minimum 1.25 × system open circuit voltage</li>
                      <li>• Arc fault interruption capability</li>
                      <li>• Lockable in open position</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Fuses/Breakers:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• DC-rated for system voltage and current</li>
                      <li>• Appropriate breaking capacity</li>
                      <li>• Fast-acting for arc fault protection</li>
                      <li>• Accessible for maintenance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Test Equipment:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• DC voltage testers (CAT III rated)</li>
                      <li>• Insulation resistance testers</li>
                      <li>• Arc fault detection equipment</li>
                      <li>• Personal protective equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Labelling and Conduit Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Proper labelling and conduit installation ensure system safety, facilitate maintenance, and meet regulatory requirements. Clear identification prevents dangerous mistakes during future work.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Essential Label Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dual supply warning:</strong> At inverter AC and DC terminals</li>
                    <li>• <strong>DC voltage levels:</strong> Maximum Voc clearly marked</li>
                    <li>• <strong>Isolation points:</strong> All DC isolators identified</li>
                    <li>• <strong>Emergency procedures:</strong> Shutdown instructions posted</li>
                    <li>• <strong>Circuit identification:</strong> String numbers and polarity</li>
                    <li>• <strong>Date of installation:</strong> For maintenance tracking</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Label Specifications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Material:</strong> UV-resistant laminated vinyl</li>
                    <li>• <strong>Adhesive:</strong> Permanent acrylic for outdoor use</li>
                    <li>• <strong>Text:</strong> Minimum 2.5mm height, sans-serif font</li>
                    <li>• <strong>Colours:</strong> Black text on yellow background for warnings</li>
                    <li>• <strong>Symbols:</strong> Standard electrical warning symbols</li>
                    <li>• <strong>Languages:</strong> English, local language if required</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Conduit Installation Best Practices:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Material Selection:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• PVC conduit: General internal applications</li>
                      <li>• HDPE conduit: Underground and wet areas</li>
                      <li>• Galvanised steel: Mechanical protection required</li>
                      <li>• Flexible conduit: Equipment connections only</li>
                      <li>• Fire-rated: Escape routes and high-risk areas</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Installation Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maximum 40% fill capacity</li>
                      <li>• Expansion joints for long runs</li>
                      <li>• Drainage at low points</li>
                      <li>• Access points every 30m</li>
                      <li>• Earth continuity for metallic conduit</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-3">Label Placement Strategy:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">At Inverter Location:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• "DANGER - DUAL SUPPLY" on enclosure</li>
                      <li>• "DC VOLTAGE PRESENT - {'>'}600V" on DC terminals</li>
                      <li>• "SOLAR PV SYSTEM - ISOLATION REQUIRED" near AC isolator</li>
                      <li>• Emergency shutdown procedure chart</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Along DC Cable Routes:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• "DC SOLAR CABLES" every 3 metres</li>
                      <li>• "POSITIVE" and "NEGATIVE" polarity marking</li>
                      <li>• String identification at junction points</li>
                      <li>• Voltage level warnings at entry points</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-6 w-6 text-green-400" />
                Secure Cable Routing, Fixing, and Bend Radii
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Professional cable management ensures long-term reliability, prevents mechanical damage, and maintains system performance. Proper routing and support are critical for outdoor installations exposed to weather extremes.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Cable Support Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Horizontal runs:</strong> Support every 0.3m for PV cable</li>
                    <li>• <strong>Vertical runs:</strong> Support every 0.4m minimum</li>
                    <li>• <strong>Equipment connections:</strong> Strain relief within 150mm</li>
                    <li>• <strong>Cable trays:</strong> Continuous support preferred</li>
                    <li>• <strong>Mechanical protection:</strong> At potential damage points</li>
                    <li>• <strong>Weather resistance:</strong> UV-rated cable ties only</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Bend Radius Specifications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Single core PV cable:</strong> 4× cable diameter minimum</li>
                    <li>• <strong>Twin core cable:</strong> 6× cable diameter minimum</li>
                    <li>• <strong>Armoured cable:</strong> 6× cable outer diameter</li>
                    <li>• <strong>Installation bends:</strong> 8× diameter during pulling</li>
                    <li>• <strong>Flexible connections:</strong> Follow manufacturer specifications</li>
                    <li>• <strong>Junction boxes:</strong> Adequate cable entry space</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Cable Routing Best Practices:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Roof Installation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Route under tiles where possible</li>
                      <li>• Avoid sharp roof edges</li>
                      <li>• Use cable guides at penetrations</li>
                      <li>• Minimum 50mm from roof surface</li>
                      <li>• Drip loops at low points</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Wall Mounting:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Avoid south-facing exposure</li>
                      <li>• Use standoff brackets</li>
                      <li>• Maintain air circulation</li>
                      <li>• Protect from physical damage</li>
                      <li>• Seal penetrations properly</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Underground Routes:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Minimum 600mm depth</li>
                      <li>• Warning tape 300mm above</li>
                      <li>• Sand bed and backfill</li>
                      <li>• Avoid tree root zones</li>
                      <li>• Marker posts at changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-3">Common Cable Management Errors:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-red-400 font-medium mb-2">Errors to Avoid:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Sharp bends:</strong> Cause insulation stress and failure</li>
                      <li>• <strong>Inadequate support:</strong> Leads to cable sag and strain</li>
                      <li>• <strong>UV exposure:</strong> Degrades cable jacket over time</li>
                      <li>• <strong>Water traps:</strong> Create corrosion and tracking paths</li>
                      <li>• <strong>Mixed cable types:</strong> Different expansion rates cause stress</li>
                      <li>• <strong>Poor penetrations:</strong> Allow water ingress and damage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Earth Bonding to MET, Bonding Conductors, and Corrosion Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Proper earthing and bonding are fundamental to electrical safety, providing fault protection and creating equipotential zones that prevent dangerous voltage differences between metallic parts.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Main Earthing Terminal (MET) Connections:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Inverter earthing:</strong> 6mm² minimum to MET</li>
                    <li>• <strong>Array frame bonding:</strong> 4mm² minimum copper conductor</li>
                    <li>• <strong>Lightning protection:</strong> Coordinate with existing systems</li>
                    <li>• <strong>DC equipment:</strong> All metallic enclosures bonded</li>
                    <li>• <strong>Monitoring equipment:</strong> Communication isolation required</li>
                    <li>• <strong>Surge protection:</strong> SPD earthing coordination</li>
                  </ul>
                </div>
                <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                  <h4 className="text-teal-400 font-semibold mb-3">Bonding Conductor Specifications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Material:</strong> Bare or insulated copper conductor</li>
                    <li>• <strong>Size:</strong> Minimum 4mm² for equipment bonding</li>
                    <li>• <strong>Routing:</strong> Shortest practical path to MET</li>
                    <li>• <strong>Connections:</strong> Compression lugs or exothermic welding</li>
                    <li>• <strong>Identification:</strong> Green/yellow sleeving required</li>
                    <li>• <strong>Accessibility:</strong> Testable at junction points</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Array Frame Bonding Strategy:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Panel-to-Panel Bonding:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Bonding jumpers between adjacent frames</li>
                      <li>• Star-washer connections for penetration</li>
                      <li>• Stainless steel or copper hardware</li>
                      <li>• Continuity through mounting rails</li>
                      <li>• Regular inspection access</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Rail-to-Structure Bonding:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Bonding clamps at rail ends</li>
                      <li>• Connection to building earthing</li>
                      <li>• Avoid dissimilar metal contact</li>
                      <li>• Weather-resistant connections</li>
                      <li>• Multiple paths for redundancy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-3">Corrosion Control Measures:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Material Compatibility:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Avoid aluminium-copper direct contact</li>
                      <li>• Use bi-metallic transition connectors</li>
                      <li>• Stainless steel for outdoor connections</li>
                      <li>• Tin-plated copper for corrosion resistance</li>
                      <li>• Marine-grade materials in coastal areas</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-2">Protection Methods:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Corrosion-inhibiting compounds at joints</li>
                      <li>• Heat-shrink or tape weather sealing</li>
                      <li>• Regular cleaning of connection points</li>
                      <li>• Torque specifications for consistent pressure</li>
                      <li>• Inspection schedule for early detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-6 w-6 text-orange-400" />
                Common Errors and How to Avoid Them
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Learning from common installation mistakes helps prevent safety hazards, system failures, and compliance issues. Understanding these errors and their prevention is crucial for professional installations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Critical Safety Errors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Missing DC isolation:</strong> Unable to safely work on system</li>
                    <li>• <strong>Inadequate labelling:</strong> Emergency responders at risk</li>
                    <li>• <strong>Poor bonding:</strong> Shock hazard during faults</li>
                    <li>• <strong>Wrong cable types:</strong> Fire risk from overheating</li>
                    <li>• <strong>Bypassed protection:</strong> Arc fault risks</li>
                    <li>• <strong>Water ingress paths:</strong> Shock and fire hazards</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Prevention Strategies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Pre-installation planning:</strong> Detailed system design</li>
                    <li>• <strong>Quality materials:</strong> Use certified components only</li>
                    <li>• <strong>Proper tooling:</strong> Crimping tools calibrated</li>
                    <li>• <strong>Installation checklists:</strong> Step-by-step verification</li>
                    <li>• <strong>Peer review:</strong> Second-person inspection</li>
                    <li>• <strong>Continuing education:</strong> Stay current with standards</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Installation Error Categories:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Mechanical Installation Errors:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Over-tightened connections causing stress cracking</li>
                      <li>• Under-tightened connections creating high resistance</li>
                      <li>• Sharp cable bends damaging conductor insulation</li>
                      <li>• Inadequate weatherproofing at penetrations</li>
                      <li>• Mixed hardware materials causing galvanic corrosion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Electrical Installation Errors:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Reversed polarity connections affecting performance</li>
                      <li>• Mismatched string configurations reducing output</li>
                      <li>• Inadequate surge protection increasing failure risk</li>
                      <li>• Missing equipment earthing creating shock hazards</li>
                      <li>• Incorrect cable specifications for operating conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-3">Case Study: Failed Handover Inspection</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  A domestic PV installation failed a handover inspection due to lack of DC labelling and poorly secured cabling. The inspector identified multiple defects that required costly remedial work before system energisation could proceed.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium mb-2">Identified Issues:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• No "DUAL SUPPLY" warning at inverter</li>
                      <li>• DC cables unsupported over 1.5m spans</li>
                      <li>• Sharp bends in DC cables at roof penetration</li>
                      <li>• Missing string identification labels</li>
                      <li>• Corroded bonding connections</li>
                      <li>• No emergency shutdown procedure posted</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Remedial Actions:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Install compliant warning labels</li>
                      <li>• Add cable supports every 300mm</li>
                      <li>• Replace damaged cables with proper bend radius</li>
                      <li>• Apply string identification at all junction points</li>
                      <li>• Clean and re-make bonding connections</li>
                      <li>• Create and post shutdown procedure chart</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600 mt-4">
                  <h5 className="text-green-400 font-medium mb-2">Lessons Learned:</h5>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>• Installation checklists prevent oversight of critical requirements</li>
                    <li>• Quality materials and proper installation techniques avoid early failures</li>
                    <li>• Regular training updates ensure compliance with current standards</li>
                    <li>• Pre-inspection reviews can identify issues before formal testing</li>
                  </ul>
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
                Following best practices improves safety, reliability, and compliance. Quality installations reduce future faults and ensure long-term system performance while protecting installers, users, and emergency responders.
              </p>
              <p className="text-yellow-400 font-medium">
                Professional installation techniques, proper material selection, and adherence to safety standards are fundamental to successful renewable energy projects that deliver safe, reliable power for decades.
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
                questions={section1Questions}
                title="Installation Best Practices Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section1;