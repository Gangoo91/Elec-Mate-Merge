import { ArrowLeft, ArrowRight, Grid, CheckCircle, AlertTriangle, Target, Zap, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module3Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does TN-S stand for?",
      options: [
        "Total Neutral - Separate",
        "Terra Neutre - Separated",
        "Terrestrial Neutral - Single",
        "Technical Neutral - System"
      ],
      correct: 1,
      explanation: "TN-S stands for Terra Neutre - Separated, indicating separate neutral and earth conductors throughout."
    },
    {
      id: 2,
      question: "Which earthing system is most reliant on RCDs?",
      options: [
        "TN-S",
        "TN-C-S",
        "TT",
        "IT"
      ],
      correct: 2,
      explanation: "TT systems rely heavily on RCDs because they have high earth fault loop impedance, making traditional overcurrent protection inadequate."
    },
    {
      id: 3,
      question: "Where is the IT system typically used?",
      options: [
        "Domestic installations",
        "Commercial offices",
        "Medical environments and critical systems",
        "Industrial workshops"
      ],
      correct: 2,
      explanation: "IT systems are used in critical environments like hospitals where continuity of supply is essential."
    },
    {
      id: 4,
      question: "What does PME mean?",
      options: [
        "Protective Multiple Earthing",
        "Primary Multiple Earth",
        "Protective Metal Enclosure",
        "Primary Main Earth"
      ],
      correct: 0,
      explanation: "PME stands for Protective Multiple Earthing, which describes the TN-C-S system where multiple earth connections exist along the supply network."
    },
    {
      id: 5,
      question: "What risk is unique to TN-C-S systems?",
      options: [
        "High earth fault currents",
        "Neutral conductor failure creating live metalwork",
        "No earth fault protection",
        "High installation costs"
      ],
      correct: 1,
      explanation: "In TN-C-S systems, if the neutral conductor fails, all earthed metalwork can become live, which is why additional precautions are needed."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Grid className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Supply Systems – TN-S, TN-C-S, TT, IT
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding earthing arrangements and their safety implications
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                15 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Introduction: The Foundation of Electrical Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  Why Earthing Systems Matter
                </h4>
                <p className="text-base leading-relaxed mb-3">
                  Earthing arrangements form the critical foundation of electrical system safety, determining how fault currents flow and how quickly dangerous conditions are cleared. The choice between TN-S, TN-C-S, TT, and IT systems directly impacts installation design, protection coordination, and ongoing safety performance.
                </p>
                <p className="text-base leading-relaxed">
                  Understanding these systems is essential because incorrect selection or poor implementation can lead to inadequate fault protection, shock hazards, and potentially fatal accidents. Each system has specific characteristics that make it suitable for particular applications and environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                  <h5 className="text-red-400 font-semibold mb-2">Real-World Consequences of Poor Selection:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Earth fault currents insufficient to operate protective devices</li>
                    <li>• Metalwork remaining live during faults</li>
                    <li>• RCD nuisance tripping in unsuitable applications</li>
                    <li>• Compliance failures and dangerous installations</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-green-400 font-semibold mb-2">Benefits of Correct Implementation:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Reliable automatic disconnection of supply (ADS)</li>
                    <li>• Appropriate protection coordination</li>
                    <li>• Cost-effective installation design</li>
                    <li>• Long-term safety and compliance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Your Learning Journey
                </h5>
                <p className="text-sm">
                  This section builds on your understanding of protective measures and circuit design, connecting theoretical knowledge with practical system selection. You'll learn to evaluate supply arrangements, assess safety implications, and make informed decisions about earthing system selection for different installation types.
                </p>
              </div>
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
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30 mb-4">
                <p className="text-sm text-blue-300">
                  By the end of this section, you will demonstrate comprehensive understanding of earthing systems through practical application and critical evaluation.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Knowledge & Comprehension:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Define and distinguish between TN-S, TN-C-S, TT, and IT earthing systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Explain the operational principles and fault current paths for each system</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Describe the safety implications and protection requirements</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Application & Analysis:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Evaluate earthing system suitability for different installation types</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Analyse protection coordination requirements for each system</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compare installation complexity, costs, and maintenance requirements</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Assessment Criteria:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">You will be assessed on your ability to:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Select appropriate earthing systems for given scenarios</li>
                      <li>• Justify system selection with safety and technical reasoning</li>
                      <li>• Identify potential hazards and mitigation strategies</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">Professional Application:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Apply BS 7671 requirements correctly</li>
                      <li>• Consider real-world constraints and limitations</li>
                      <li>• Communicate technical decisions effectively</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TN-S System Detailed Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid className="h-6 w-6 text-green-500" />
                TN-S System: Separate Neutral and Earth
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">System Characteristics</h4>
                <p className="text-sm">
                  The TN-S system provides separate neutral (N) and protective earth (PE) conductors throughout the entire installation, from the supply transformer secondary winding to the final circuits. This separation provides the most reliable earthing arrangement.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Technical Advantages</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Low Earth Fault Loop Impedance</p>
                      <p className="text-xs text-white">Zs typically 0.8Ω or less, ensuring reliable ADS operation</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">No Neutral-Earth Voltage</p>
                      <p className="text-xs text-white">Separate conductors eliminate voltage between neutral and earth</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Reliable Fault Clearance</p>
                      <p className="text-xs text-white">Predictable fault currents enable accurate protective device coordination</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">EMC Performance</p>
                      <p className="text-xs text-white">Better electromagnetic compatibility due to separate earth path</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Installation Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Cable Requirements</p>
                      <p className="text-xs text-white">4-core or 5-core supply cables (L1, L2, L3, N, PE)</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Main Earthing Terminal</p>
                      <p className="text-xs text-white">Connected to supply earth conductor, not neutral</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Equipotential Bonding</p>
                      <p className="text-xs text-white">Main bonding to water, gas, structural steel as required</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Testing Requirements</p>
                      <p className="text-xs text-white">Standard earth fault loop impedance testing applicable</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Typical Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">New Commercial Buildings:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Office complexes</li>
                      <li>• Shopping centres</li>
                      <li>• Industrial facilities</li>
                      <li>• Data centres</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Residential Developments:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• New housing estates</li>
                      <li>• Apartment blocks</li>
                      <li>• Student accommodation</li>
                      <li>• Care homes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Specialist Installations:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Hospitals (non-critical areas)</li>
                      <li>• Schools and universities</li>
                      <li>• Laboratories</li>
                      <li>• Manufacturing plants</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TN-C-S System Detailed Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid className="h-6 w-6 text-yellow-400" />
                TN-C-S System: Protective Multiple Earthing (PME)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">System Operation</h4>
                <p className="text-sm mb-3">
                  TN-C-S combines the neutral and earth functions in the supply network (PEN conductor) but separates them at the service position. The neutral conductor is earthed at multiple points along the supply network, hence "Protective Multiple Earthing."
                </p>
                <p className="text-sm">
                  At the consumer's service head, the PEN conductor is separated into neutral (N) and protective earth (PE) conductors, which remain separate throughout the installation.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Advantages of TN-C-S</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Economic Supply</p>
                      <p className="text-xs text-white">Reduced cable costs for supply networks (3-core instead of 4-core)</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Reliable Earth Reference</p>
                      <p className="text-xs text-white">Multiple earth connections provide stable earth potential</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Good Fault Performance</p>
                      <p className="text-xs text-white">Low earth fault loop impedance when system is intact</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Wide Availability</p>
                      <p className="text-xs text-white">Standard supply for most UK domestic installations</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Critical Safety Considerations</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Neutral Conductor Failure Risk</p>
                      <p className="text-xs text-white">If supply neutral fails, all earthed metalwork becomes live</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Neutral-Earth Voltage</p>
                      <p className="text-xs text-white">Voltage can appear between neutral and earth under load</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Broken Neutral Effects</p>
                      <p className="text-xs text-white">Can cause overvoltage on some circuits, undervoltage on others</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Export Prohibition</p>
                      <p className="text-xs text-white">Cannot be used for portable equipment or mobile installations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Enhanced Bonding Requirements</h4>
                <p className="text-sm mb-3">
                  TN-C-S systems require comprehensive main equipotential bonding due to the risk of neutral conductor failure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Mandatory Bonding:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Incoming metallic water service pipes</li>
                      <li>• Incoming metallic gas service pipes</li>
                      <li>• Structural steel framework</li>
                      <li>• Central heating and air conditioning</li>
                      <li>• Lightning protection systems</li>
                      <li>• Telecommunications cable sheaths</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Bonding Conductor Size:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Minimum 10mm² for most installations</li>
                      <li>• 16mm² for supplies &gt;100A single-phase</li>
                      <li>• 25mm² for supplies &gt;200A three-phase</li>
                      <li>• Half the main earthing conductor size (max 25mm²)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TT System Detailed Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid className="h-6 w-6 text-orange-500" />
                TT System: Earth Electrode Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">System Configuration</h4>
                <p className="text-sm mb-3">
                  In TT systems, the installation earth is independent of the supply earth. The installation requires its own earth electrode, typically with earth fault loop impedance exceeding 200Ω. This high impedance makes RCD protection essential for safety.
                </p>
                <p className="text-sm">
                  The supply neutral is earthed at the transformer, but the installation earth electrode provides the only earth fault return path, resulting in limited fault current that cannot reliably operate conventional overcurrent devices.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">System Advantages</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Independent Earth</p>
                      <p className="text-xs text-white">Installation earth isolated from supply system faults</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">No Export Restrictions</p>
                      <p className="text-xs text-white">Suitable for portable equipment and mobile installations</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Supply Independence</p>
                      <p className="text-xs text-white">No dependency on supply earth arrangements</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Retrofit Capability</p>
                      <p className="text-xs text-white">Can be implemented where supply earth unavailable</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Design Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">RCD Protection Essential</p>
                      <p className="text-xs text-white">30mA RCDs required for socket outlets and most circuits</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Earth Electrode Installation</p>
                      <p className="text-xs text-white">Proper earth electrode design and installation critical</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Ra × IΔn ≤ 50V</p>
                      <p className="text-xs text-white">Earth electrode resistance calculation essential</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Seasonal Variations</p>
                      <p className="text-xs text-white">Earth resistance changes with weather conditions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Typical Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Rural Installations:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Farm buildings</li>
                      <li>• Remote cottages</li>
                      <li>• Agricultural outbuildings</li>
                      <li>• Caravan sites</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Temporary Installations:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Construction sites</li>
                      <li>• Outdoor events</li>
                      <li>• Mobile equipment</li>
                      <li>• Temporary buildings</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Specialist Applications:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Petrol stations</li>
                      <li>• Swimming pools</li>
                      <li>• Marinas</li>
                      <li>• Outdoor installations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IT System Detailed Analysis */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid className="h-6 w-6 text-purple-500" />
                IT System: Isolated or High Impedance Earthing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">System Principles</h4>
                <p className="text-sm mb-3">
                  IT systems have the supply either isolated from earth or connected through high impedance. The first earth fault does not require immediate disconnection, allowing continued operation whilst the fault is located and repaired.
                </p>
                <p className="text-sm">
                  All exposed-conductive-parts are connected to earth electrodes. An insulation monitoring device (IMD) continuously monitors the system and provides early warning of insulation deterioration.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">System Benefits</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Continuity of Supply</p>
                      <p className="text-xs text-white">First earth fault allows continued operation</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Enhanced Safety</p>
                      <p className="text-xs text-white">Low first fault current reduces shock risk</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Early Warning</p>
                      <p className="text-xs text-white">IMD provides advance notice of insulation problems</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Planned Maintenance</p>
                      <p className="text-xs text-white">Faults can be repaired during scheduled downtime</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">System Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm">Insulation Monitoring</p>
                      <p className="text-xs text-white">IMD with audible/visual alarm required</p>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm">Second Fault Protection</p>
                      <p className="text-xs text-white">Overcurrent or RCD protection for second faults</p>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm">Skilled Personnel</p>
                      <p className="text-xs text-white">Competent persons required for maintenance</p>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm">System Complexity</p>
                      <p className="text-xs text-white">Higher installation and maintenance complexity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Critical Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Medical Locations:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Operating theatres</li>
                      <li>• Intensive care units</li>
                      <li>• Life support systems</li>
                      <li>• Medical equipment rooms</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Process Industries:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Chemical processing</li>
                      <li>• Petrochemical plants</li>
                      <li>• Continuous manufacturing</li>
                      <li>• Critical production lines</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Safety-Critical Systems:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Emergency lighting</li>
                      <li>• Fire safety systems</li>
                      <li>• Security installations</li>
                      <li>• Data centres</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Selection Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Earthing System Selection Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Decision Framework</h4>
                <p className="text-sm">
                  Selecting the appropriate earthing system requires careful consideration of safety requirements, operational needs, installation constraints, and economic factors. The following framework guides systematic decision-making.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-semibold text-sm mb-2">System Selection Factors:</p>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Available supply arrangements</li>
                    <li>• Installation complexity and cost</li>
                    <li>• Safety and reliability requirements</li>
                    <li>• Maintenance and testing considerations</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-2">Decision Matrix:</p>
                  <ul className="text-xs text-white space-y-1">
                    <li>• TN-S: New installations with dedicated supply</li>
                    <li>• TN-C-S: Standard domestic/commercial supply</li>
                    <li>• TT: Remote locations or supply restrictions</li>
                    <li>• IT: Critical applications requiring continuity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-2">Cost Implications:</p>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Earth electrode installation costs</li>
                    <li>• RCD protection requirements</li>
                    <li>• Cable and equipment specifications</li>
                    <li>• Testing and maintenance frequency</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-2">Safety Assessment:</p>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Fault clearance capability</li>
                    <li>• Touch voltage limitations</li>
                    <li>• Environmental suitability</li>
                    <li>• User competency requirements</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">⚠️ Common Selection Errors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">❌ Typical Mistakes:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Assuming TN-C-S is always available</li>
                      <li>• Ignoring export restrictions for TN-C-S</li>
                      <li>• Underestimating TT system RCD requirements</li>
                      <li>• IT system complexity underestimation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">✅ Best Practices:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Verify supply arrangements early</li>
                      <li>• Consider long-term operational needs</li>
                      <li>• Factor in maintenance requirements</li>
                      <li>• Plan for future modifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Case Study */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real-World Case Study
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Hospital Emergency Power System Failure</h4>
                <p className="text-sm mb-3">
                  A contractor installs a TN-C-S system for emergency medical equipment, not realising the critical nature of supply continuity. During a neutral conductor fault, all emergency equipment loses earth reference simultaneously, compromising patient safety.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white">Poor system selection for critical applications can have life-threatening consequences.</p>
                </div>
              </div>
              
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-400 font-semibold mb-3">✅ Correct Approach</h4>
                <p className="text-sm">
                  System analysis identifies medical location requirements. IT system specified with insulation monitoring, ensuring first earth fault doesn't interrupt critical medical equipment. Patient safety maintained through continued supply during fault conditions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Test your understanding of electrical earthing systems"
                description={`${quizQuestions.length} questions • Select the best answer for each question`}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-3">
              <Button
                variant="outline"
                className="text-foreground border-gray-600 hover:bg-card hover:text-yellow-400 transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Module 3 Overview
              </Button>
            </Link>
            
            <Link to="../bs7671-module-3-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
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

export default BS7671Module3Section1;
