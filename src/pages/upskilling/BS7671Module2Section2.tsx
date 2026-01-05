import { ArrowLeft, ArrowRight, Zap, AlertTriangle, CheckCircle, Shield, Target, FileText, Lightbulb, Settings, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module2Section2 = () => {
  // SEO
  useEffect(() => {
    const title = 'Key Terms - CPC, ADS, SELV, PELV | BS 7671 Module 2 Section 2';
    document.title = title;
    const desc = 'Learn essential BS 7671 terminology including CPC, ADS, SELV, PELV and protective devices. Understanding key terms for electrical safety and protection systems.';
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
      question: "What is the main function of a CPC (Circuit Protective Conductor)?",
      options: [
        "To carry normal load current",
        "To provide a path for fault current to enable automatic disconnection",
        "To reduce electromagnetic interference",
        "To provide neutral return path"
      ],
      correct: 1,
      explanation: "The CPC provides a path for fault current back to the source, allowing protective devices to operate and disconnect the supply automatically."
    },
    {
      id: 2,
      question: "How does SELV differ from PELV?",
      options: [
        "SELV allows higher voltages",
        "PELV allows earth connection, SELV does not",
        "SELV is for AC only, PELV for DC",
        "There is no difference"
      ],
      correct: 1,
      explanation: "SELV (Separated Extra Low Voltage) requires complete isolation from earth, while PELV (Protective Extra Low Voltage) allows earthing."
    },
    {
      id: 3,
      question: "Where is ADS (Automatic Disconnection of Supply) typically applied?",
      options: [
        "Only in domestic installations",
        "In most installations as the primary protective measure",
        "Only in industrial installations",
        "Only where RCDs are not available"
      ],
      correct: 1,
      explanation: "ADS is the most commonly used protective measure in most electrical installations, providing both basic and fault protection."
    },
    {
      id: 4,
      question: "What does an RCD (Residual Current Device) detect?",
      options: [
        "Overcurrent conditions",
        "Voltage fluctuations",
        "Imbalance between line and neutral currents",
        "Power factor changes"
      ],
      correct: 2,
      explanation: "An RCD detects the imbalance between line and neutral currents, which indicates current leaking to earth (residual current)."
    },
    {
      id: 5,
      question: "Which system allows earth connection — SELV or PELV?",
      options: [
        "SELV only",
        "PELV only",
        "Both allow earth connection",
        "Neither allows earth connection"
      ],
      correct: 1,
      explanation: "PELV (Protective Extra Low Voltage) allows earth connection, while SELV (Separated Extra Low Voltage) must be completely isolated from earth."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Cable className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Key Terms – CPC, ADS, SELV, PELV, Protective Devices
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Essential terminology for electrical safety and protection
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 minutes
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
                A core part of understanding the 18th Edition is familiarising yourself with key terms that appear regularly in installations and design decisions. This section breaks down essential terminology like CPC, ADS, SELV, and PELV that form the foundation of electrical safety systems.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Safety Foundation:</strong> These terms represent the core concepts of electrical protection. Misunderstanding them can lead to inadequate safety measures and non-compliant installations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand and differentiate CPC, ADS, SELV, and PELV
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify correct applications for each protective measure
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Learn the role of protective devices in ensuring safety
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Apply these concepts in practical installation scenarios
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* CPC - Circuit Protective Conductor */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-6 w-6 text-yellow-400" />
                CPC - Circuit Protective Conductor
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                The Circuit Protective Conductor (CPC) is fundamental to electrical safety. It provides the path for fault current to return to the source, enabling automatic disconnection when dangerous faults occur.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Characteristics of CPC</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Primary function:</strong> Carries fault current safely back to source</li>
                    <li>• <strong>Identification:</strong> Green and yellow insulation</li>
                    <li>• <strong>Sizing:</strong> Based on fault current and disconnection time</li>
                    <li>• <strong>Continuity:</strong> Must be continuous throughout circuit</li>
                  </ul>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Connection:</strong> Links all exposed metalwork</li>
                    <li>• <strong>Testing:</strong> Requires continuity verification</li>
                    <li>• <strong>Protection:</strong> Cannot be switched or fused</li>
                    <li>• <strong>Materials:</strong> Copper or appropriate conductor</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-white font-semibold mb-3">CPC Functions</h5>
                  <ul className="text-sm space-y-2">
                    <li>• Provides fault current return path</li>
                    <li>• Enables automatic disconnection</li>
                    <li>• Maintains safe potential on metalwork</li>
                    <li>• Facilitates protective device operation</li>
                    <li>• Prevents dangerous voltages on equipment</li>
                  </ul>
                </div>

                <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                  <h5 className="text-white font-semibold mb-3">CPC Requirements</h5>
                  <ul className="text-sm space-y-2">
                    <li>• Minimum 1.5mm² for fixed wiring</li>
                    <li>• Cross-sectional area calculations required</li>
                    <li>• Must withstand fault current without damage</li>
                    <li>• Continuous electrical connection essential</li>
                    <li>• Proper termination at all points</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ADS - Automatic Disconnection of Supply */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                ADS - Automatic Disconnection of Supply
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Automatic Disconnection of Supply (ADS) is the most common protective measure used in electrical installations. It combines basic protection (preventing contact with live parts) and fault protection (protection during fault conditions).
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">How ADS Works</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-400/10 p-3 rounded-lg text-center">
                      <p className="text-white font-semibold text-sm mb-1">1. Normal Operation</p>
                      <p className="text-xs">Basic protection prevents contact with live parts</p>
                    </div>
                    <div className="bg-orange-600/10 p-3 rounded-lg text-center">
                      <p className="text-white font-semibold text-sm mb-1">2. Fault Occurs</p>
                      <p className="text-xs">Current flows through CPC creating fault loop</p>
                    </div>
                    <div className="bg-green-600/10 p-3 rounded-lg text-center">
                      <p className="text-white font-semibold text-sm mb-1">3. Auto Disconnection</p>
                      <p className="text-xs">Protective device operates within required time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">ADS Components</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Basic Protection</h5>
                      <p className="text-xs mt-1">Insulation, barriers, or enclosures prevent contact with live parts</p>
                    </div>
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Fault Protection</h5>
                      <p className="text-xs mt-1">Automatic disconnection when fault occurs</p>
                    </div>
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Protective Devices</h5>
                      <p className="text-xs mt-1">MCBs, RCDs, or fuses provide disconnection</p>
                    </div>
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Earthing System</h5>
                      <p className="text-xs mt-1">Provides fault current return path</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Disconnection Times</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Final Circuits ≤32A</h5>
                      <p className="text-xs mt-1">0.4 seconds maximum disconnection time</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Distribution Circuits</h5>
                      <p className="text-xs mt-1">5 seconds maximum disconnection time</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">Special Locations</h5>
                      <p className="text-xs mt-1">Reduced times may apply (e.g., 0.04s for some areas)</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <h5 className="text-white font-semibold text-sm">TT Systems</h5>
                      <p className="text-xs mt-1">RCD required - typically 30mA for socket outlets</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SELV and PELV */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                SELV and PELV - Extra Low Voltage Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                SELV (Separated Extra Low Voltage) and PELV (Protective Extra Low Voltage) are special protective measures using extra low voltage (typically not exceeding 50V AC or 120V DC) to provide safety.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">SELV - Separated Extra Low Voltage</h4>
                  <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Key Characteristics</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Complete electrical separation from earth</li>
                          <li>• No part may be connected to earth</li>
                          <li>• Maximum 50V AC / 120V DC under normal conditions</li>
                          <li>• Requires isolation transformer or battery supply</li>
                          <li>• No basic or fault protection needed</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Typical Applications</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Bathroom shaver sockets</li>
                          <li>• Swimming pool lighting</li>
                          <li>• Portable tools in hazardous areas</li>
                          <li>• Medical equipment in patient areas</li>
                          <li>• Emergency lighting systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">PELV - Protective Extra Low Voltage</h4>
                  <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Key Characteristics</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Earthing is permitted</li>
                          <li>• May be connected to earth or CPC</li>
                          <li>• Maximum 50V AC / 120V DC under normal conditions</li>
                          <li>• Similar safety level to SELV</li>
                          <li>• More flexible installation requirements</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Typical Applications</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Fire alarm systems</li>
                          <li>• Security systems</li>
                          <li>• Telecommunications equipment</li>
                          <li>• Computer network systems</li>
                          <li>• Garden lighting installations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">SELV vs PELV Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Earthing</h5>
                    <p className="text-xs">SELV: No earth connection allowed</p>
                    <p className="text-xs">PELV: Earth connection permitted</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Flexibility</h5>
                    <p className="text-xs">SELV: More restrictive installation</p>
                    <p className="text-xs">PELV: More flexible requirements</p>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Safety Level</h5>
                    <p className="text-xs">SELV: Highest level of safety</p>
                    <p className="text-xs">PELV: Equivalent safety level</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protective Devices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Protective Devices - MCBs, RCDs, Fuses
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Protective devices are essential components that detect abnormal conditions and automatically disconnect circuits to prevent danger. Each type serves specific protective functions.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">MCBs (Miniature Circuit Breakers)</h4>
                  <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Primary Functions</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Overcurrent protection</li>
                          <li>• Short circuit protection</li>
                          <li>• Manual isolation</li>
                          <li>• Indication of tripped state</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Characteristics</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Type B, C, D curves available</li>
                          <li>• Ratings: 6A to 125A typical</li>
                          <li>• Breaking capacity: 6kA to 25kA</li>
                          <li>• Reusable after tripping</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">RCDs (Residual Current Devices)</h4>
                  <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Primary Functions</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Earth leakage detection</li>
                          <li>• Additional protection against electric shock</li>
                          <li>• Fire protection (high sensitivity)</li>
                          <li>• Protects against earth fault currents</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Characteristics</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Ratings: 30mA, 100mA, 300mA</li>
                          <li>• Types: AC, A, F, B</li>
                          <li>• Test button for functional checks</li>
                          <li>• Time delay options available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Fuses</h4>
                  <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Primary Functions</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Overcurrent protection</li>
                          <li>• Short circuit protection</li>
                          <li>• Discrimination with other devices</li>
                          <li>• High breaking capacity</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm mb-2">Characteristics</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Types: BS 88, BS 1361, BS 3036</li>
                          <li>• Single use - must be replaced</li>
                          <li>• Excellent current limitation</li>
                          <li>• No maintenance required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Device Selection Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Load characteristics:</strong> Inductive, resistive, motor loads</li>
                    <li>• <strong>Fault levels:</strong> Available fault current at installation point</li>
                    <li>• <strong>Discrimination:</strong> Selective operation with upstream devices</li>
                    <li>• <strong>Environmental conditions:</strong> Temperature, humidity, corrosion</li>
                  </ul>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Accessibility:</strong> Location for testing and maintenance</li>
                    <li>• <strong>Cost considerations:</strong> Initial cost vs running costs</li>
                    <li>• <strong>Standards compliance:</strong> BS EN 60898, BS EN 61009</li>
                    <li>• <strong>Future expansion:</strong> Provision for additional circuits</li>
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
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Swimming Pool Installation Challenge</h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> An electrician needs to install lighting around a swimming pool. The area is classified as Zone 1 (area likely to be wet) and requires special consideration for electrical safety.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Challenge:</strong> Normal mains voltage (230V) cannot be used in Zone 1 due to the increased risk of electric shock in wet conditions.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Solution Applied:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• SELV system chosen for maximum safety</li>
                    <li>• 12V LED lighting installed</li>
                    <li>• Safety isolating transformer located outside zones</li>
                    <li>• No earthing of SELV circuit (complete separation)</li>
                    <li>• IP67 rated luminaires for water protection</li>
                  </ul>
                  
                  <p className="text-sm">
                    <strong>Why This Works:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• 12V cannot cause dangerous shock even when wet</li>
                    <li>• Complete separation prevents earth fault currents</li>
                    <li>• No protective devices needed for SELV circuit</li>
                    <li>• Compliance with BS 7671 Section 702 (Swimming Pools)</li>
                    <li>• Safe operation in wet conditions</li>
                  </ul>
                  
                  <p className="text-sm">
                    <strong>Alternative Considered:</strong> PELV could be used with earthing, but SELV provides higher level of safety in this wet environment.
                  </p>
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
                Understanding these key terms is essential for electrical safety and compliance. Each serves a specific protective function and must be correctly applied based on installation requirements and environmental conditions.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li>• CPC provides essential fault current path for automatic disconnection</li>
                  <li>• ADS is the most common protective measure combining basic and fault protection</li>
                  <li>• SELV offers highest safety through complete separation from earth</li>
                  <li>• PELV provides equivalent safety with more flexible earthing options</li>
                  <li>• MCBs, RCDs, and fuses each serve specific protective functions</li>
                  <li>• Correct device selection depends on load, environment, and safety requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Key Terms Quiz"
            description="Test your understanding of essential BS 7671 terminology and protective measures."
          />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to="../bs7671-module-2-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-2-section-3">
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

export default BS7671Module2Section2;