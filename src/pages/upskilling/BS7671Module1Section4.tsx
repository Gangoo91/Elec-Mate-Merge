import { ArrowLeft, ArrowRight, Zap, AlertTriangle, CheckCircle, BookOpen, Star, Building, Battery, Car, Lightbulb, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module1Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main focus of Amendment 3?",
      options: [
        "Arc fault detection devices",
        "Bidirectional protective devices",
        "Surge protective devices",
        "Emergency lighting"
      ],
      correct: 1,
      explanation: "Amendment 3 primarily focuses on bidirectional protective devices and their application in modern installations with renewable energy systems."
    },
    {
      id: 2,
      question: "Which type of installations require bidirectional protective devices?",
      options: [
        "All domestic installations",
        "Only commercial buildings",
        "Installations with solar PV and battery storage that can export power",
        "Emergency lighting circuits only"
      ],
      correct: 2,
      explanation: "Bidirectional protective devices are required for installations with renewable energy sources like solar PV and battery storage that can export power to the grid."
    },
    {
      id: 3,
      question: "What is a key consumer unit requirement introduced in Amendment 3?",
      options: [
        "All units must be metal-clad",
        "Enhanced protection for prosumer installations",
        "Mandatory AFDD in all circuits",
        "Type B RCDs only"
      ],
      correct: 1,
      explanation: "Amendment 3 introduces enhanced consumer unit requirements specifically for prosumer installations to handle bidirectional power flow safely."
    },
    {
      id: 4,
      question: "When did Amendment 3 come into effect?",
      options: [
        "January 1st, 2024",
        "March 31st, 2024",
        "July 31st, 2024",
        "December 31st, 2024"
      ],
      correct: 2,
      explanation: "Amendment 3 to BS 7671:2018 came into effect on July 31st, 2024."
    },
    {
      id: 5,
      question: "How do bidirectional protective devices differ from unidirectional devices?",
      options: [
        "They only work in one direction",
        "They can detect and interrupt fault currents flowing in both directions",
        "They are cheaper to manufacture",
        "They have lower breaking capacity"
      ],
      correct: 1,
      explanation: "Bidirectional protective devices can detect and safely interrupt fault currents flowing in both directions, essential for installations that both consume and generate electricity."
    }
  ];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Star className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Amendment 3 Highlights
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Latest changes including bidirectional protection and consumer unit requirements (2024)
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
              <Badge variant="outline" className="border-yellow-600 text-yellow-300">
                Current
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Amendment 3 to BS 7671:2018 represents a focused but critical update addressing the growing complexity of renewable energy installations. Effective from July 31st, 2024, these changes specifically target bidirectional power flow scenarios and enhanced consumer unit requirements for prosumer installations.
              </p>
              <Alert className="bg-red-600/10 border-red-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Current Standard:</strong> Amendment 3 is now the current version of BS 7671. Installations must comply with these latest requirements for legal compliance and professional best practice.
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
                    Understand bidirectional vs unidirectional protective devices
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Apply Amendment 3 requirements to prosumer installations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Evaluate consumer unit requirements for renewable energy systems
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise when bidirectional protection is required
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Specify appropriate protective devices for two-way power flow
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Ensure compliance with current BS 7671 Amendment 3 standards
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Changes Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
                Key Changes in Amendment 3 (2024)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Amendment 3 addresses the critical gap in protective device technology for installations with bidirectional power flow, building upon Amendment 2's prosumer installation framework to enhance safety and performance.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Core Changes</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Bidirectional Protective Devices</p>
                      <p className="text-xs">Definition and application requirements</p>
                    </div>
                    <div className="bg-green-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Enhanced Consumer Unit Requirements</p>
                      <p className="text-xs">Specific provisions for renewable energy systems</p>
                    </div>
                    <div className="bg-purple-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Grid Connection Safety</p>
                      <p className="text-xs">Protection for two-way power flow scenarios</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Implementation Timeline</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Effective Date</p>
                      <p className="text-xs">31st July 2024 - Amendment 3 in force</p>
                    </div>
                    <div className="bg-orange-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Transition Period</p>
                      <p className="text-xs">Builds upon Amendment 2 requirements</p>
                    </div>
                    <div className="bg-red-600/10 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm">Compliance Focus</p>
                      <p className="text-xs">Mandatory for new prosumer installations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bidirectional Protective Devices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Bidirectional Protective Devices - Core Amendment 3 Change
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <Star className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Key Innovation:</strong> Amendment 3 introduces bidirectional protective devices to safely handle two-way power flow in modern renewable energy installations.
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="text-white font-semibold text-lg mb-4">Understanding Bidirectional vs Unidirectional Protection</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                    <h5 className="text-white font-semibold mb-3">Unidirectional Devices (Traditional)</h5>
                    <ul className="text-sm space-y-2">
                      <li>• Designed for one-way current flow</li>
                      <li>• Suitable for conventional installations</li>
                      <li>• Cannot detect reverse fault currents</li>
                      <li>• May fail to provide adequate protection in prosumer installations</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                    <h5 className="text-white font-semibold mb-3">Bidirectional Devices (Amendment 3)</h5>
                    <ul className="text-sm space-y-2">
                      <li>• Detect faults in both directions</li>
                      <li>• Essential for renewable energy systems</li>
                      <li>• Protect against reverse fault currents</li>
                      <li>• Ensure safe grid interaction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-3">When Bidirectional Protection is Required</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Installation Types:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Solar PV systems with grid export</li>
                      <li>• Battery energy storage systems</li>
                      <li>• Wind generation installations</li>
                      <li>• Combined heat and power (CHP) systems</li>
                      <li>• Vehicle-to-grid (V2G) charging points</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Safety Considerations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Protection during export conditions</li>
                      <li>• Fault detection in both directions</li>
                      <li>• Safe isolation during maintenance</li>
                      <li>• Grid protection compliance</li>
                      <li>• Emergency shutdown capability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consumer Unit Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-green-500" />
                Enhanced Consumer Unit Requirements for Prosumer Installations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Amendment 3 Consumer Unit Provisions</h4>
                <p className="text-sm">
                  Amendment 3 introduces specific consumer unit requirements for installations with renewable energy sources to ensure safe bidirectional power management and grid interaction.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold text-lg mb-4">Key Requirements for Prosumer Installations</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-3">Protective Device Selection</h5>
                    <div className="space-y-2">
                      <div className="bg-card p-3 rounded border border-blue-600/30">
                        <p className="text-white font-semibold text-sm">Bidirectional MCBs/RCBOs</p>
                        <p className="text-xs text-white">Essential for circuits with potential reverse current flow</p>
                      </div>
                      <div className="bg-card p-3 rounded border border-green-600/30">
                        <p className="text-white font-semibold text-sm">Enhanced Breaking Capacity</p>
                        <p className="text-xs text-white">Must handle fault currents from both grid and generation sources</p>
                      </div>
                      <div className="bg-card p-3 rounded border border-purple-600/30">
                        <p className="text-white font-semibold text-sm">Coordination Requirements</p>
                        <p className="text-xs text-white">Proper discrimination between generation and load protection</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-yellow-400 font-semibold mb-3">Installation Considerations</h5>
                    <div className="bg-card p-4 rounded-lg">
                      <ul className="text-sm space-y-2">
                        <li><strong>Labelling:</strong> Clear identification of bidirectional circuits</li>
                        <li><strong>Isolation:</strong> Safe isolation procedures for maintenance</li>
                        <li><strong>Monitoring:</strong> Integration with energy management systems</li>
                        <li><strong>Testing:</strong> Verification of bidirectional operation</li>
                        <li><strong>Documentation:</strong> Enhanced installation records</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h5 className="text-white font-semibold text-sm">Solar PV Circuits</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Bidirectional protection required</li>
                    <li>• Export limitation compliance</li>
                    <li>• G99 connection requirements</li>
                    <li>• DNO notification protocols</li>
                  </ul>
                </div>

                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-5 w-5 text-green-400" />
                    <h5 className="text-white font-semibold text-sm">Battery Storage</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Charge/discharge protection</li>
                    <li>• Emergency shutdown systems</li>
                    <li>• Thermal management integration</li>
                    <li>• Safety isolation requirements</li>
                  </ul>
                </div>

                <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="h-5 w-5 text-purple-400" />
                    <h5 className="text-white font-semibold text-sm">EV V2G Systems</h5>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• Vehicle-to-grid protection</li>
                    <li>• Dynamic load management</li>
                    <li>• Communication protocols</li>
                    <li>• Grid support functions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amendment Timeline and Transition */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Amendment Timeline and Transition Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Understanding the progression from Amendment 2 to Amendment 3 is crucial for ensuring compliance and safe installation practices in modern electrical systems.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Amendment 2 Foundation (2022)</h4>
                  <div className="bg-card p-4 rounded-lg border border-blue-600/30">
                    <h5 className="text-yellow-400 font-semibold mb-3">Key Achievements:</h5>
                    <ul className="text-sm space-y-2">
                      <li>• Introduced Part 8 - Prosumer Installations</li>
                      <li>• AFDD requirements for high-risk premises</li>
                      <li>• Enhanced SPD guidance</li>
                      <li>• Updated model forms (EIC, EICR, MEIWC)</li>
                      <li>• Protected escape route clarifications</li>
                      <li>• RCD coordination improvements</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Amendment 3 Enhancement (2024)</h4>
                  <div className="bg-card p-4 rounded-lg border border-green-600/30">
                    <h5 className="text-green-400 font-semibold mb-3">Focused Improvements:</h5>
                    <ul className="text-sm space-y-2">
                      <li>• Bidirectional protective device definitions</li>
                      <li>• Enhanced consumer unit requirements</li>
                      <li>• Prosumer installation safety enhancements</li>
                      <li>• Grid interaction protection requirements</li>
                      <li>• Two-way power flow safety provisions</li>
                      <li>• Renewable energy system compatibility</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-white font-semibold mb-3">Compliance Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-yellow-300 font-semibold text-sm">March 2022</p>
                    <p className="text-xs text-white">Amendment 2 Published</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-semibold text-sm">July 31, 2024</p>
                    <p className="text-xs text-white">Amendment 3 Effective</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-300 font-semibold text-sm">Current</p>
                    <p className="text-xs text-white">Amendment 3 Mandatory</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Impact */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Amendment 3 Implementation Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Amendment 3 brings focused but critical safety improvements for modern installations, building upon Amendment 2's prosumer framework.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Professional Impact</h4>
                  <div className="bg-card p-4 rounded-lg">
                    <ul className="text-sm space-y-2">
                      <li>• Enhanced competency requirements for renewable installations</li>
                      <li>• Updated design methodology for bidirectional systems</li>
                      <li>• Improved safety protocols for prosumer work</li>
                      <li>• Enhanced testing and verification procedures</li>
                      <li>• Updated documentation requirements</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Industry Benefits</h4>
                  <div className="bg-green-600/10 p-4 rounded-lg">
                    <ul className="text-sm space-y-2">
                      <li>• Improved safety for renewable energy installations</li>
                      <li>• Better grid stability through proper protection</li>
                      <li>• Reduced fire risk in prosumer installations</li>
                      <li>• Enhanced system reliability and performance</li>
                      <li>• Future-proofing for smart grid development</li>
                    </ul>
                  </div>
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
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Solar PV Installation with Inadequate Protection</h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> A contractor installs a 5kW solar PV system with battery storage in September 2024, using standard unidirectional MCBs in the consumer unit for the generation circuits.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Problem:</strong> During a fault condition where the battery discharges into a short circuit on the AC side, the unidirectional MCBs fail to detect the reverse fault current, creating a dangerous situation.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Impact:</strong>
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• Inadequate protection against reverse fault currents</li>
                    <li>• Non-compliance with Amendment 3 requirements</li>
                    <li>• Potential fire risk and safety hazard</li>
                    <li>• Installation fails electrical safety inspection</li>
                    <li>• DNO may refuse grid connection approval</li>
                  </ul>
                  
                  <p className="text-sm">
                    <strong>Solution:</strong> Replace with bidirectional MCBs/RCBOs as required by Amendment 3 for proper protection of prosumer installations with two-way power flow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why It Matters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                Why Amendment 3 Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Amendment 3 addresses critical safety gaps in renewable energy installations. As bidirectional power flow becomes standard, proper protection is essential for safety and grid stability.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Renewable Energy Growth</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Solar PV adoption acceleration</li>
                    <li>• Battery storage proliferation</li>
                    <li>• Vehicle-to-grid development</li>
                    <li>• Prosumer market expansion</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Safety Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Bidirectional fault protection</li>
                    <li>• Grid interaction safety</li>
                    <li>• Reverse current detection</li>
                    <li>• Emergency isolation capability</li>
                  </ul>
                </div>
                
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Grid Evolution</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Smart grid development</li>
                    <li>• Distributed generation growth</li>
                    <li>• Grid stability requirements</li>
                    <li>• Energy storage integration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm">Technical Competency:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Bidirectional protection expertise</li>
                      <li>• Prosumer installation skills</li>
                      <li>• Grid connection compliance</li>
                      <li>• Renewable energy system integration</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Business Opportunities:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Growing renewable energy market</li>
                      <li>• Specialised protection services</li>
                      <li>• Amendment 3 compliance consultancy</li>
                      <li>• Future-ready installation capabilities</li>
                    </ul>
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
                Amendment 3 delivers focused but essential safety improvements for renewable energy installations. Understanding bidirectional protection is critical for modern electrical professionals working with prosumer systems.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Bidirectional protective devices are essential for renewable energy installations</li>
                  <li>• Enhanced consumer unit requirements ensure safe prosumer operation</li>
                  <li>• Amendment 3 builds upon Amendment 2's prosumer framework</li>
                  <li>• Proper protection is crucial for two-way power flow scenarios</li>
                  <li>• Grid interaction safety requires specialist protective devices</li>
                  <li>• Amendment 3 compliance is mandatory for current installations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                description="Test your understanding of Amendment 3 changes and bidirectional protection requirements."
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Link to="../bs7671-module-1-section-3" className="w-full sm:w-auto">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Previous Section</span>
                <span className="sm:hidden">Previous</span>
              </Button>
            </Link>
            <Link to="../bs7671-module-1" className="w-full sm:w-auto">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                <span className="hidden sm:inline">Complete Module 1</span>
                <span className="sm:hidden">Complete</span>
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module1Section4;