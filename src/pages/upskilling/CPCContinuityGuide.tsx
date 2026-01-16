import { ArrowLeft, Shield, Zap, CheckCircle, AlertTriangle, Info, Target, Settings, BookOpen, Eye, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CPCContinuityGuide = () => {
  const testingSteps = [
    {
      step: 1,
      title: "Pre-Test Preparation",
      icon: Settings,
      description: "Essential preparation before testing begins",
      details: [
        "Ensure safe isolation is complete and verified",
        "Select appropriate low-resistance ohmmeter (BS EN 61557-4)",
        "Check test instrument calibration and test leads",
        "Identify all CPC connections to be tested",
        "Remove any parallel paths that could affect readings",
        "Ensure all bonding conductors are disconnected if required"
      ],
      safetyPoints: [
        "Never test on live circuits",
        "Verify isolation with approved voltage indicator",
        "Check test leads for damage before use"
      ]
    },
    {
      step: 2,
      title: "Circuit Analysis",
      icon: Eye,
      description: "Understanding the circuit before testing",
      details: [
        "Identify the CPC route from consumer unit to furthest point",
        "Note any junction boxes or connection points",
        "Check for any borrowed neutrals or cross-connections",
        "Identify socket outlets, switches, and accessories on circuit",
        "Map out ring final circuits if applicable",
        "Note cable types and sizes used"
      ],
      safetyPoints: [
        "Understand the complete circuit layout",
        "Be aware of any unusual wiring arrangements"
      ]
    },
    {
      step: 3,
      title: "Test Method Selection",
      icon: Target,
      description: "Choose appropriate test method based on circuit type",
      details: [
        "Radial circuits: Test from CU earth terminal to furthest point",
        "Ring circuits: Test using R1 + R2 method or separate R1 and R2",
        "Use test current between 200mA and 1A (typically 200mA)",
        "For long runs, consider temperature correction factors",
        "Document which method is being used",
        "Set up test leads for minimum resistance path"
      ],
      safetyPoints: [
        "Ensure correct test current selection",
        "Verify test method suits circuit configuration"
      ]
    },
    {
      step: 4,
      title: "Resistance Measurement",
      icon: Activity,
      description: "Performing the actual continuity test",
      details: [
        "Connect test leads to CPC at distribution board and circuit end",
        "Take reading with all connections made",
        "Record resistance value in ohms (Ω)",
        "Test each outlet/accessory on the circuit",
        "For rings: test end-to-end and cross-connection resistance",
        "Repeat test if readings seem unusual"
      ],
      safetyPoints: [
        "Ensure good contact at test points",
        "Watch for intermittent connections",
        "Be aware of contact resistance in test leads"
      ]
    }
  ];

  const whyWeTest = [
    {
      title: "Legal Requirement",
      description: "BS 7671 Regulation 543.2.1 requires all protective conductors to be tested",
      icon: Shield
    },
    {
      title: "Safety Critical",
      description: "CPC provides the path for fault current to operate protective devices",
      icon: AlertTriangle
    },
    {
      title: "Protection Verification",
      description: "Ensures protective devices will operate within required disconnection times",
      icon: CheckCircle
    },
    {
      title: "Installation Integrity",
      description: "Confirms electrical and mechanical integrity of protective connections",
      icon: Zap
    }
  ];

  const scienceBehind = [
    {
      title: "Ohm's Law Application",
      description: "V = I × R - Lower resistance = higher fault current = faster disconnection",
      formula: "Fault Current (I) = Supply Voltage (V) ÷ Circuit Impedance (R)"
    },
    {
      title: "Fault Current Path",
      description: "Fault current flows through CPC back to source transformer neutral point",
      formula: "Total Circuit Impedance = R1 + R2 (where R1 = line, R2 = CPC)"
    },
    {
      title: "Temperature Effects",
      description: "Conductor resistance increases with temperature - correction factors needed",
      formula: "R₂ = R₁ × (1 + α(T₂ - T₁)) where α = temperature coefficient"
    },
    {
      title: "Protective Device Operation",
      description: "Device must operate before conductor temperature reaches damage threshold",
      formula: "Disconnection Time ∝ 1/(Fault Current)²"
    }
  ];

  const expectedResults = [
    {
      category: "Excellent",
      range: "< 0.05Ω per 100m",
      color: "text-green-400 bg-green-600/20",
      description: "Very low resistance, excellent continuity",
      implications: "High fault currents, fast protective device operation"
    },
    {
      category: "Good",
      range: "0.05Ω - 0.2Ω per 100m",
      color: "text-elec-yellow bg-elec-yellow/20",
      description: "Acceptable resistance for most applications",
      implications: "Adequate fault current levels, normal operation expected"
    },
    {
      category: "Acceptable",
      range: "0.2Ω - 1.0Ω",
      color: "text-elec-yellow bg-elec-yellow/20",
      description: "Higher resistance but still within limits",
      implications: "Check against circuit requirements, may need investigation"
    },
    {
      category: "Poor",
      range: "> 1.0Ω",
      color: "text-red-400 bg-red-600/20",
      description: "High resistance indicating problems",
      implications: "Investigate connections, possible safety risk"
    }
  ];

  const commonProblems = [
    {
      problem: "High Resistance Reading",
      causes: ["Poor connections", "Corroded terminals", "Undersized conductor", "Damaged cable"],
      solutions: ["Check all connections", "Clean terminals", "Verify cable size", "Replace damaged sections"]
    },
    {
      problem: "Open Circuit (∞Ω)",
      causes: ["Broken conductor", "Disconnected terminal", "Missing link", "Switch in circuit"],
      solutions: ["Trace circuit path", "Check all terminals", "Verify connections", "Remove switches from test"]
    },
    {
      problem: "Variable Readings",
      causes: ["Loose connections", "Intermittent fault", "Parallel paths", "Poor test lead contact"],
      solutions: ["Secure all connections", "Investigate cable route", "Remove parallel paths", "Check test equipment"]
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px] touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Tests
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-green-600/40 text-green-300 hover:bg-green-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Continuity Testing
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Continuity of CPCs (Circuit Protective Conductors)
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive guide to testing protective conductor continuity with practical procedures and result interpretation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Why We Test Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Why We Test CPC Continuity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyWeTest.map((reason, index) => {
                  const IconComponent = reason.icon;
                  return (
                    <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-5 w-5 text-elec-yellow" />
                        <h3 className="text-white font-semibold">{reason.title}</h3>
                      </div>
                      <p className="text-white text-sm">{reason.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Science Behind It */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-elec-yellow" />
                The Science Behind CPC Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {scienceBehind.map((science, index) => (
                <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">{science.title}</h3>
                  <p className="text-white text-sm mb-3">{science.description}</p>
                  <div className="bg-transparent p-3 rounded border-l-4 border-elec-yellow">
                    <code className="text-elec-yellow text-sm font-mono">{science.formula}</code>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hands-On Practical Testing */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Hands-On: How to Actually Do the Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-elec-yellow/20 p-4 rounded-lg border border-elec-yellow/30">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-elec-yellow font-semibold">Before You Start</h4>
                </div>
                <p className="text-yellow-200 text-sm">
                  You have a low-resistance ohmmeter (like a Megger MFT) and you're testing a radial socket circuit. 
                  The power is isolated and proven dead.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                    <h3 className="text-white text-lg font-semibold">Set Up Your Meter</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white">• Turn on your low-resistance ohmmeter</p>
                    <p className="text-white">• Select continuity/low-resistance mode (usually marked with Ω symbol)</p>
                    <p className="text-white">• Check test current is set to 200mA (standard for CPC testing)</p>
                    <p className="text-white">• Connect your test leads to the meter (usually red = positive, black = negative)</p>
                    <div className="bg-elec-yellow/20 p-3 rounded border-l-4 border-elec-yellow">
                      <p className="text-blue-200 text-sm"><strong>Tip:</strong> Touch the test leads together - reading should be close to 0.00Ω (this is your lead resistance)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                    <h3 className="text-white text-lg font-semibold">Locate Your Test Points</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white">• Go to the consumer unit/distribution board</p>
                    <p className="text-white">• Find the circuit you're testing (check circuit schedule)</p>
                    <p className="text-white">• Locate the earth terminal bar where the CPC connects</p>
                    <p className="text-white">• Go to the furthest socket on the circuit</p>
                    <p className="text-white">• Remove the socket faceplate to access the earth terminal</p>
                    <div className="bg-red-600/20 p-3 rounded border-l-4 border-red-400">
                      <p className="text-red-200 text-sm"><strong>Safety:</strong> Double-check isolation is still in place before removing socket</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                    <h3 className="text-white text-lg font-semibold">Make the Connections</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white">• Connect one test lead to the earth terminal bar at the consumer unit</p>
                    <p className="text-white">• Connect the other test lead to the earth terminal at the socket</p>
                    <p className="text-white">• Ensure good mechanical contact (clean terminals if necessary)</p>
                    <p className="text-white">• Make sure no parallel paths exist (disconnect bonding if required)</p>
                    <div className="bg-elec-yellow/20 p-3 rounded border-l-4 border-elec-yellow">
                      <p className="text-blue-200 text-sm"><strong>Physical Tip:</strong> Use crocodile clips for secure connection, press firmly on spring-loaded probes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                    <h3 className="text-white text-lg font-semibold">Take the Reading</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white">• Press the test button on your meter</p>
                    <p className="text-white">• Wait for the reading to stabilise (usually 2-3 seconds)</p>
                    <p className="text-white">• Read the display - it will show resistance in ohms (Ω)</p>
                    <p className="text-white">• Record the reading on your test certificate</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div className="bg-green-600/20 p-3 rounded text-center">
                        <p className="text-green-400 font-semibold">Good Reading</p>
                        <p className="text-green-300 text-sm">0.05Ω - 0.20Ω</p>
                      </div>
                      <div className="bg-elec-yellow/20 p-3 rounded text-center">
                        <p className="text-elec-yellow font-semibold">Check Further</p>
                        <p className="text-yellow-300 text-sm">0.20Ω - 1.00Ω</p>
                      </div>
                      <div className="bg-red-600/20 p-3 rounded text-center">
                        <p className="text-red-400 font-semibold">Problem</p>
                        <p className="text-red-300 text-sm">&gt;1.00Ω or ∞</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">5</div>
                    <h3 className="text-white text-lg font-semibold">Test Multiple Points</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white">• Keep one lead at the consumer unit earth bar</p>
                    <p className="text-white">• Move the other lead to each socket/accessory on the circuit</p>
                    <p className="text-white">• Record readings for each point tested</p>
                    <p className="text-white">• The furthest point should give the highest reading</p>
                    <div className="bg-elec-yellow/20 p-3 rounded border-l-4 border-elec-yellow">
                      <p className="text-blue-200 text-sm"><strong>Pattern:</strong> Readings should increase with distance - socket 1: 0.05Ω, socket 2: 0.08Ω, socket 3: 0.12Ω</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">6</div>
                    <h3 className="text-white text-lg font-semibold">What You See on Different Meters</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-white font-medium">Digital Display:</p>
                      <p className="text-white text-sm">• "0.12Ω" = 0.12 ohms resistance</p>
                      <p className="text-white text-sm">• "OL" or "∞" = open circuit (broken)</p>
                      <p className="text-white text-sm">• "0.00" = very low resistance (good)</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-medium">Analogue Needle:</p>
                      <p className="text-white text-sm">• Needle deflects right = good continuity</p>
                      <p className="text-white text-sm">• No deflection = open circuit</p>
                      <p className="text-white text-sm">• Read value where needle points</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-400 font-semibold">Real-World Example</h4>
                </div>
                <p className="text-green-200 text-sm mb-2">
                  Testing a 20A radial socket circuit with 2.5mm² T&E cable:
                </p>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Socket 1 (closest): 0.04Ω</li>
                  <li>• Socket 2 (middle): 0.08Ω</li>
                  <li>• Socket 3 (furthest): 0.12Ω ← Record this value</li>
                  <li>• All readings are good - circuit passes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Test Methods */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-elec-yellow" />
                Can't Reach? Alternative Test Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-600/20 p-4 rounded-lg border border-orange-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <h4 className="text-orange-400 font-semibold">Common Problem</h4>
                </div>
                <p className="text-orange-200 text-sm">
                  Your test leads are only 3-4 metres long but the socket is 20 metres away from the DB. 
                  Here's how to do the test properly without buying 50-metre leads!
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-3">
                    <span className="bg-elec-yellow text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    R1 + R2 Method at the Distribution Board
                  </h3>
                  <div className="space-y-3">
                    <p className="text-white font-medium">Best method for long circuits:</p>
                    <ul className="text-white text-sm space-y-2 ml-4">
                      <li>• At the DB, disconnect the line and CPC conductors from their terminals</li>
                      <li>• Link the line and CPC together at the furthest point (socket end)</li>
                      <li>• Measure resistance between line and CPC at the DB end</li>
                      <li>• This gives you the total R1 + R2 value for the circuit</li>
                    </ul>
                    <div className="bg-elec-yellow/20 p-3 rounded border-l-4 border-elec-yellow mt-3">
                      <p className="text-blue-200 text-sm"><strong>Why this works:</strong> Current flows down the line conductor, through the link, and back via the CPC</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-3">
                    <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    Temporary Link Method
                  </h3>
                  <div className="space-y-3">
                    <p className="text-white font-medium">Step-by-step process:</p>
                    <ul className="text-white text-sm space-y-2 ml-4">
                      <li>• Go to the furthest socket first</li>
                      <li>• Use a short piece of wire to link line and earth terminals together</li>
                      <li>• Return to the DB with your meter</li>
                      <li>• Test between line and earth terminals at the DB</li>
                      <li>• Remove the temporary link when finished</li>
                    </ul>
                    <div className="bg-green-600/20 p-3 rounded border-l-4 border-green-400 mt-3">
                      <p className="text-green-200 text-sm"><strong>Equipment needed:</strong> Small piece of 1.5mm² cable or dedicated test link</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-3">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    Junction Box Test Points
                  </h3>
                  <div className="space-y-3">
                    <p className="text-white font-medium">Using intermediate points:</p>
                    <ul className="text-white text-sm space-y-2 ml-4">
                      <li>• Test from DB to first accessible junction box</li>
                      <li>• Test from junction box to furthest point</li>
                      <li>• Add the resistance values together</li>
                      <li>• Verify continuity through each section</li>
                    </ul>
                    <div className="bg-purple-600/20 p-3 rounded border-l-4 border-purple-400 mt-3">
                      <p className="text-purple-200 text-sm"><strong>Example:</strong> DB to JB1: 0.05Ω, JB1 to Socket: 0.08Ω = Total: 0.13Ω</p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-6 rounded-lg">
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-3">
                    <span className="bg-elec-yellow text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                    Extended Test Leads
                  </h3>
                  <div className="space-y-3">
                    <p className="text-white font-medium">When you need longer reach:</p>
                    <ul className="text-white text-sm space-y-2 ml-4">
                      <li>• Use extension leads designed for test equipment</li>
                      <li>• Join multiple leads with proper connectors</li>
                      <li>• Compensate for additional lead resistance</li>
                      <li>• Ensure good connections at joints</li>
                    </ul>
                    <div className="bg-elec-yellow/20 p-3 rounded border-l-4 border-elec-yellow mt-3">
                      <p className="text-yellow-200 text-sm"><strong>Important:</strong> Null (zero) your leads AFTER extending to account for extra resistance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Practical Example: Long Circuit Test</h3>
                <div className="space-y-4">
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-2">Scenario:</h4>
                    <p className="text-white text-sm">32A ring main, 50 metres long, your leads are only 4 metres</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Method Used:</h4>
                      <p className="text-white text-sm mb-2">R1 + R2 at DB with temporary link</p>
                      <ul className="text-white text-sm space-y-1">
                        <li>1. Link line-earth at furthest socket</li>
                        <li>2. Test line-earth at DB: 0.85Ω</li>
                        <li>3. Remove link</li>
                        <li>4. Record result</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Verification:</h4>
                      <p className="text-white text-sm mb-2">Check makes sense for circuit</p>
                      <ul className="text-white text-sm space-y-1">
                        <li>• 2.5mm² cable: ~7.41mΩ/m</li>
                        <li>• 50m x 7.41mΩ = 0.37Ω (line)</li>
                        <li>• 50m x 7.41mΩ = 0.37Ω (CPC)</li>
                        <li>• Total expected: ~0.74Ω ✓</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h4 className="text-red-400 font-semibold">Safety Reminders</h4>
                </div>
                <ul className="text-red-200 text-sm space-y-1">
                  <li>• Always prove dead before installing temporary links</li>
                  <li>• Remove all temporary connections after testing</li>
                  <li>• Ensure links are properly secured and won't fall out</li>
                  <li>• Double-check connections before energising</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Complete Testing Procedure */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-elec-yellow" />
                Complete Testing Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {testingSteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="bg-transparent/80 p-6 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <IconComponent className="h-6 w-6 text-elec-yellow" />
                      <h3 className="text-white text-lg font-semibold">{step.title}</h3>
                    </div>
                    
                    <p className="text-white mb-4">{step.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Procedure:</h4>
                        <ul className="text-white text-sm space-y-1">
                          {step.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">Safety Points:</h4>
                        <ul className="text-white text-sm space-y-1">
                          {step.safetyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Expected Results */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-elec-yellow" />
                Expected Results & Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expectedResults.map((result, index) => (
                  <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${result.color} border-0`}>
                        {result.category}
                      </Badge>
                      <span className="text-white font-mono text-sm">{result.range}</span>
                    </div>
                    <p className="text-white text-sm mb-2">{result.description}</p>
                    <p className="text-white text-xs">{result.implications}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-elec-yellow/20 p-4 rounded-lg border border-blue-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-elec-yellow font-semibold">Important Notes</h4>
                </div>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Results must be compared with circuit design values</li>
                  <li>• Temperature correction may be required for accurate comparison</li>
                  <li>• High resistance readings may indicate poor connections or undersized conductors</li>
                  <li>• Always verify results make sense for the circuit being tested</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Common Problems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                Common Problems & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {commonProblems.map((item, index) => (
                <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">{item.problem}</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-red-400 font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        {item.causes.map((cause, causeIndex) => (
                          <li key={causeIndex} className="flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        {item.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Final Tips */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Shield className="h-6 w-6 text-elec-yellow" />
                Professional Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-transparent/80 p-4 rounded-lg">
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Always null (zero) your test leads before testing to account for lead resistance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Test at the extremities of the circuit for worst-case scenario
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Record all readings clearly with circuit reference and test conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    If in doubt about a reading, repeat the test or use an alternative method
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Consider the installation environment and cable routing when interpreting results
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenarios */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Eye className="h-6 w-6 text-elec-yellow" />
                Real-World Testing Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Scenario 1: Domestic Installation */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-elec-yellow text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  Domestic Kitchen Extension - 32A Ring Main
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                    <p className="text-blue-200 text-sm">
                      <strong>Scenario:</strong> Testing a new kitchen ring main - 2.5mm² T&E cable, 25-metre run, 8 socket outlets
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">What You'll Find:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Consumer unit in garage, kitchen 15m away</li>
                        <li>• Cable run under suspended floor</li>
                        <li>• 4 sockets on each leg of ring</li>
                        <li>• Junction box under kitchen island</li>
                        <li>• Some sockets behind fitted units</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Practical Challenges:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Accessing sockets behind appliances</li>
                        <li>• Lifting floorboards to trace cable</li>
                        <li>• Testing in cramped spaces</li>
                        <li>• Identifying which leg each socket is on</li>
                        <li>• Working around kitchen fitters</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-2">Expected Test Results:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-green-600/20 p-3 rounded text-center">
                        <p className="text-green-400 font-semibold">End-to-End Line</p>
                        <p className="text-green-300 text-sm">0.15Ω - 0.18Ω</p>
                      </div>
                      <div className="bg-green-600/20 p-3 rounded text-center">
                        <p className="text-green-400 font-semibold">End-to-End CPC</p>
                        <p className="text-green-300 text-sm">0.24Ω - 0.28Ω</p>
                      </div>
                      <div className="bg-green-600/20 p-3 rounded text-center">
                        <p className="text-green-400 font-semibold">R1 + R2 Max</p>
                        <p className="text-green-300 text-sm">0.19Ω - 0.22Ω</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                    <p className="text-yellow-200 text-sm">
                      <strong>Pro Tip:</strong> Mark each socket with masking tape as you test - "L1", "L2" etc. 
                      This helps you track which leg of the ring each socket is on and speeds up the R1+R2 test.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenario 2: Commercial Installation */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Office Refurbishment - Multiple Circuits
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-green-600/20 p-4 rounded border-l-4 border-green-400">
                    <p className="text-green-200 text-sm">
                      <strong>Scenario:</strong> Open-plan office, 12 ring circuits, SWA feeds to floor boxes, testing during weekend shutdown
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Practical Testing Strategy:</h4>
                    <div className="bg-transparent p-4 rounded space-y-2">
                      <p className="text-white text-sm"><strong>1. Pre-Test Preparation (30 mins):</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Obtain site plans and circuit schedules</li>
                        <li>• Identify all distribution boards</li>
                        <li>• Check access to floor boxes and trunking</li>
                        <li>• Coordinate with site security for access</li>
                      </ul>
                      
                      <p className="text-white text-sm mt-3"><strong>2. Testing Sequence (2-3 hours):</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Test one complete circuit at a time</li>
                        <li>• Use R1+R2 method to save time</li>
                        <li>• Label all circuits as you go</li>
                        <li>• Take photos of unusual results</li>
                      </ul>
                      
                      <p className="text-white text-sm mt-3"><strong>3. Common Issues Found:</strong></p>
                      <ul className="text-white text-sm ml-4 space-y-1">
                        <li>• Mixed cable types in same circuit</li>
                        <li>• Incorrect labelling on distribution board</li>
                        <li>• Joints in floor voids affecting readings</li>
                        <li>• Parallel paths through cable management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenario 3: Fault Finding */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  Fault Investigation - High Resistance Reading
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-400">
                    <p className="text-red-200 text-sm">
                      <strong>Problem:</strong> Periodic inspection shows CPC continuity reading of 2.5Ω - should be around 0.3Ω
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Systematic Fault Finding Process:</h4>
                    <div className="space-y-3">
                      <div className="bg-transparent p-3 rounded">
                        <p className="text-elec-yellow font-medium text-sm">Step 1: Verify the Problem</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Re-test with different meter</li>
                          <li>• Check test lead resistance</li>
                          <li>• Test at multiple points on circuit</li>
                          <li>• Compare with original test certificate</li>
                        </ul>
                      </div>
                      
                      <div className="bg-transparent p-3 rounded">
                        <p className="text-elec-yellow font-medium text-sm">Step 2: Isolate the Problem</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Test continuity of each cable section</li>
                          <li>• Check connections at junction boxes</li>
                          <li>• Inspect accessible cable for damage</li>
                          <li>• Test each socket back to previous point</li>
                        </ul>
                      </div>
                      
                      <div className="bg-transparent p-3 rounded">
                        <p className="text-elec-yellow font-medium text-sm">Step 3: Found the Culprit</p>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          <li>• Loose earth terminal in junction box</li>
                          <li>• Adding 2.2Ω to circuit resistance</li>
                          <li>• Probably vibration from building work</li>
                          <li>• Simple tightening fixes the problem</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600/20 p-4 rounded border-l-4 border-green-400">
                    <p className="text-green-200 text-sm">
                      <strong>Result:</strong> After tightening connection, reading drops to 0.29Ω - problem solved! 
                      Always check the obvious things first.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Equipment Guide */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Practical Equipment Setup & Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Meter Selection & Setup</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Recommended Meters:</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Megger MFT1731:</strong> Reliable, clear display, good for beginners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Fluke 1664FC:</strong> Bluetooth connectivity, data logging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Kewtech KT65:</strong> Budget option, simple operation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Robin KTS1710:</strong> Robust, good for site work</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Essential Setup Steps:</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li>• Check calibration certificate is current</li>
                      <li>• Verify test leads are undamaged</li>
                      <li>• Set correct test current (200mA typical)</li>
                      <li>• Zero/null test leads before starting</li>
                      <li>• Check battery level sufficient for testing</li>
                      <li>• Have spare fuses for test leads</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow mt-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Field Tip:</strong> Always carry a basic multimeter as backup. Digital meters can fail, 
                    and a simple continuity tester can get you out of trouble when you need to verify a circuit quickly.
                  </p>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Test Lead Techniques</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Making Good Contact:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Clean terminals with wire brush if corroded</li>
                        <li>• Use probe tips for small terminals</li>
                        <li>• Crocodile clips for secure long-term connection</li>
                        <li>• Spring-loaded probes for quick tests</li>
                        <li>• Banana plugs for panel connections</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-red-400 font-medium mb-2">Common Contact Problems:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Painted surfaces giving false readings</li>
                        <li>• Loose clips causing intermittent contact</li>
                        <li>• Oxidised terminals adding resistance</li>
                        <li>• Wrong terminal identification</li>
                        <li>• Parallel paths through metalwork</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                    <p className="text-blue-200 text-sm">
                      <strong>Professional Technique:</strong> For critical measurements, take the reading three times 
                      with slight probe movement each time. If all three readings are similar, you can be confident 
                      in the result.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Environmental Considerations</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-elec-yellow/20 p-4 rounded">
                      <h4 className="text-elec-yellow font-semibold mb-2">Cold Conditions</h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Copper resistance decreases</li>
                        <li>• Readings will be lower</li>
                        <li>• Apply temperature correction</li>
                        <li>• Keep meter warm for accuracy</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-600/20 p-4 rounded">
                      <h4 className="text-red-400 font-semibold mb-2">Hot Conditions</h4>
                      <ul className="text-red-200 text-sm space-y-1">
                        <li>• Copper resistance increases</li>
                        <li>• Readings will be higher</li>
                        <li>• Test early morning if possible</li>
                        <li>• Factor in operating temperature</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-600/20 p-4 rounded">
                      <h4 className="text-green-400 font-semibold mb-2">Humid Conditions</h4>
                      <ul className="text-green-200 text-sm space-y-1">
                        <li>• Risk of surface leakage</li>
                        <li>• Clean and dry terminals</li>
                        <li>• Check insulation resistance</li>
                        <li>• Be extra careful with readings</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-2">Temperature Correction Formula:</h4>
                    <p className="text-white text-sm font-mono">R₂ = R₁ × [1 + 0.004(T₂ - T₁)]</p>
                    <p className="text-white text-sm mt-2">Where: R₁ = measured resistance, T₁ = test temp, T₂ = operating temp (typically 70°C)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time-Saving Techniques */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-elec-yellow" />
                Time-Saving Techniques for Professionals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Efficient Testing Workflow</h3>
                
                <div className="space-y-4">
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-2">Pre-Test Organisation (Saves 30-40 minutes):</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">1.</span>
                        <span>Photograph all distribution boards before starting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">2.</span>
                        <span>Create a simple floor plan sketch with circuit numbers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">3.</span>
                        <span>Pre-label test certificate with all circuit references</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">4.</span>
                        <span>Check all required tools are working before starting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">5.</span>
                        <span>Identify any potential access issues early</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-600/20 p-4 rounded">
                      <h4 className="text-green-400 font-semibold mb-2">Batch Testing Method</h4>
                      <ul className="text-green-200 text-sm space-y-1">
                        <li>• Isolate all circuits first</li>
                        <li>• Disconnect all conductors in one go</li>
                        <li>• Test all end-to-end readings together</li>
                        <li>• Do all cross-connections as a batch</li>
                        <li>• Complete R1+R2 tests circuit by circuit</li>
                      </ul>
                    </div>
                    
                    <div className="bg-elec-yellow/20 p-4 rounded">
                      <h4 className="text-elec-yellow font-semibold mb-2">Smart Recording</h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Use voice recorder for readings</li>
                        <li>• Take photos of unusual results</li>
                        <li>• Use pre-printed test sheets</li>
                        <li>• Mark cables as you test them</li>
                        <li>• Note any issues immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">Common Shortcuts (That Actually Work)</h3>
                
                <div className="space-y-4">
                  <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                    <h4 className="text-elec-yellow font-semibold mb-2">The "Reference Socket" Method</h4>
                    <p className="text-yellow-200 text-sm mb-2">
                      For multiple similar circuits, establish a "reference" reading from a known good circuit, 
                      then you can quickly spot any circuits that read significantly different.
                    </p>
                    <ul className="text-yellow-200 text-sm space-y-1">
                      <li>• Test one complete circuit thoroughly first</li>
                      <li>• Note the typical reading for that cable type/length</li>
                      <li>• Use this as your benchmark for similar circuits</li>
                      <li>• Any circuit reading &gt;20% different needs investigation</li>
                    </ul>
                  </div>

                  <div className="bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                    <h4 className="text-elec-yellow font-semibold mb-2">The "Pattern Recognition" Approach</h4>
                    <p className="text-blue-200 text-sm mb-2">
                      Experienced electricians develop an eye for normal vs abnormal readings based on circuit characteristics.
                    </p>
                    <ul className="text-blue-200 text-sm space-y-1">
                      <li>• 2.5mm² T&E, 20m run ≈ 0.15-0.20Ω typically</li>
                      <li>• 4.0mm² T&E, same length ≈ 0.09-0.12Ω typically</li>
                      <li>• SWA cables typically 20-30% higher than T&E</li>
                      <li>• Readings that don't fit pattern need checking</li>
                    </ul>
                  </div>

                  <div className="bg-green-600/20 p-4 rounded border-l-4 border-green-400">
                    <h4 className="text-green-400 font-semibold mb-2">The "Confidence Check"</h4>
                    <p className="text-green-200 text-sm mb-2">
                      Quick sanity checks that catch 90% of problems without detailed investigation.
                    </p>
                    <ul className="text-green-200 text-sm space-y-1">
                      <li>• Reading roughly matches cable resistance tables?</li>
                      <li>• CPC reading higher than line reading? (smaller CSA)</li>
                      <li>• Cross-connections all showing infinite resistance?</li>
                      <li>• R1+R2 reading sensible for circuit length?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default CPCContinuityGuide;