import { ArrowLeft, Gauge, Shield, Zap, CheckCircle, AlertTriangle, Info, Target, Settings, BookOpen, Eye, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InsulationResistanceGuide = () => {
  const whyWeTest = [
    {
      title: "Safety Critical",
      description: "Ensures no dangerous leakage current between conductors or to earth",
      icon: Shield
    },
    {
      title: "Legal Requirement",
      description: "BS 7671 requires minimum insulation resistance of 1MΩ at 500V DC",
      icon: CheckCircle
    },
    {
      title: "Fault Prevention",
      description: "Identifies deteriorating insulation before it causes dangerous faults",
      icon: AlertTriangle
    },
    {
      title: "Installation Integrity",
      description: "Verifies cables and accessories haven't been damaged during installation",
      icon: Zap
    }
  ];

  const testVoltages = [
    {
      voltage: "250V DC",
      circuits: "SELV, PELV circuits (≤50V)",
      application: "Extra low voltage systems, doorbells, some LED drivers"
    },
    {
      voltage: "500V DC", 
      circuits: "Low voltage circuits (>50V ≤500V)",
      application: "Standard domestic and commercial installations"
    },
    {
      voltage: "1000V DC",
      circuits: "High voltage circuits (>500V ≤1000V)",
      application: "Industrial installations, HV equipment"
    }
  ];

  const testProcedure = [
    {
      step: 1,
      title: "Preparation",
      description: "Essential setup before testing begins",
      details: [
        "Ensure safe isolation is complete and proven",
        "Remove or disconnect electronic equipment",
        "Remove fluorescent lamps and LED fittings",
        "Withdraw or isolate sensitive equipment",
        "Set up insulation resistance tester",
        "Check test leads for damage"
      ]
    },
    {
      step: 2,
      title: "Test Selection",
      description: "Choose correct test voltage",
      details: [
        "Standard 230V installation: Use 500V DC",
        "SELV circuits: Use 250V DC",
        "Check equipment rating before testing",
        "Ensure no parallel paths exist",
        "Remove any surge protection devices",
        "Link switches to 'closed' position"
      ]
    },
    {
      step: 3,
      title: "Conductor Tests",
      description: "Test between each conductor combination",
      details: [
        "Line to Neutral: Minimum 1MΩ",
        "Line to Earth: Minimum 1MΩ", 
        "Neutral to Earth: Minimum 1MΩ",
        "For 3-phase: L1-L2, L1-L3, L2-L3",
        "Record all readings",
        "Take readings after voltage stabilises"
      ]
    }
  ];

  const expectedResults = [
    {
      category: "Excellent",
      range: "≥ 200MΩ",
      color: "text-green-400 bg-green-600/20",
      description: "New installation, perfect condition",
      action: "No action required"
    },
    {
      category: "Good", 
      range: "50MΩ - 200MΩ",
      color: "text-elec-yellow bg-elec-yellow/20",
      description: "Good condition, older installation",
      action: "Acceptable, monitor trends"
    },
    {
      category: "Investigate",
      range: "2MΩ - 50MΩ",
      color: "text-elec-yellow bg-elec-yellow/20", 
      description: "Above minimum but requires investigation",
      action: "Find cause of lower reading - check for moisture, damage"
    },
    {
      category: "Acceptable",
      range: "1MΩ - 2MΩ",
      color: "text-orange-400 bg-orange-600/20", 
      description: "Meets minimum but close to failure",
      action: "Investigate immediately, consider remedial action"
    },
    {
      category: "Fail",
      range: "&lt; 1MΩ",
      color: "text-red-400 bg-red-600/20",
      description: "Below minimum, unsafe",
      action: "Find and rectify fault before energising"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <Gauge className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-purple-600/40 text-purple-300 hover:bg-purple-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Resistance Testing
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Insulation Resistance Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Complete guide to testing insulation resistance between conductors and to earth
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
                Why We Test Insulation Resistance
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

          {/* Test Voltages */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Zap className="h-6 w-6 text-elec-yellow" />
                Test Voltages - Which One to Use?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testVoltages.map((voltage, index) => (
                <div key={index} className="bg-transparent/80 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-elec-yellow/40 text-blue-300 border-0">{voltage.voltage}</Badge>
                    <h3 className="text-white font-semibold">{voltage.circuits}</h3>
                  </div>
                  <p className="text-white text-sm">{voltage.application}</p>
                </div>
              ))}
              
              <div className="bg-elec-yellow/20 p-4 rounded-lg border border-blue-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-elec-yellow font-semibold">Most Common</h4>
                </div>
                <p className="text-blue-200 text-sm">
                  For standard UK domestic and commercial installations (230V single phase), 
                  always use <strong>500V DC</strong> test voltage.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hands-On Testing Guide */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Step-by-Step: How to Test Insulation Resistance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {testProcedure.map((step) => (
                <div key={step.step} className="bg-transparent/80 p-6 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-white text-lg font-semibold">{step.title}</h3>
                  </div>
                  
                  <p className="text-white mb-4">{step.description}</p>
                  
                  <ul className="text-white text-sm space-y-2">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Detailed Testing Process */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-3">
                  <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  Physical Testing Process
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-600/20 p-4 rounded border-l-4 border-purple-400">
                    <p className="text-purple-200 text-sm">
                      <strong>You have:</strong> 500V insulation resistance tester, single phase circuit isolated and proven dead
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-3">At the Consumer Unit:</h4>
                      <ul className="text-white text-sm space-y-2">
                        <li>• Remove circuit from all protective devices</li>
                        <li>• Ensure no equipment is connected</li>
                        <li>• Set all switches to 'ON' position</li>
                        <li>• Remove any surge protectors</li>
                        <li>• Prepare your insulation tester</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Test Sequence:</h4>
                      <div className="bg-transparent p-3 rounded space-y-1">
                        <p className="text-elec-yellow font-mono text-sm">1. Line to Neutral</p>
                        <p className="text-elec-yellow font-mono text-sm">2. Line to Earth</p>
                        <p className="text-elec-yellow font-mono text-sm">3. Neutral to Earth</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-white font-medium">How to Take Each Reading:</h4>
                    <div className="bg-transparent p-4 rounded">
                      <ol className="text-white text-sm space-y-2">
                        <li>1. Connect test leads to appropriate terminals</li>
                        <li>2. Press and hold TEST button</li>
                        <li>3. Wait for reading to stabilise (15-30 seconds)</li>
                        <li>4. Record the final steady reading</li>
                        <li>5. Release TEST button (allows capacitance to discharge)</li>
                        <li>6. Move to next test combination</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You See on the Meter */}
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-4">What You See on Your Meter</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Digital Display Examples:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">"&gt;999MΩ" = Excellent</p>
                      <p className="text-green-400 font-mono text-sm">"150MΩ" = Very Good</p>
                      <p className="text-elec-yellow font-mono text-sm">"15MΩ" = Acceptable</p>
                      <p className="text-red-400 font-mono text-sm">"0.5MΩ" = Fail</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-orange-400 font-medium mb-2">During Testing:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• Reading may start low then climb</li>
                      <li>• Wait for stabilisation</li>
                      <li>• Capacitive circuits take longer</li>
                      <li>• Temperature affects readings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expected Results */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Activity className="h-6 w-6 text-elec-yellow" />
                Expected Results & What They Mean
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
                      <span className="text-white font-mono text-sm" dangerouslySetInnerHTML={{ __html: result.range }}></span>
                    </div>
                    <p className="text-white text-sm mb-2">{result.description}</p>
                    <p className="text-white text-xs">{result.action}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-elec-yellow/20 p-4 rounded-lg border border-blue-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-elec-yellow font-semibold">Critical Values to Remember</h4>
                </div>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• <strong>1MΩ minimum</strong> - Below this is a failure</li>
                  <li>• <strong>2MΩ threshold</strong> - Readings below 2MΩ should be investigated</li>
                  <li>• <strong>Higher is better</strong> - New installations typically give &gt;100MΩ</li>
                  <li>• Temperature and humidity significantly affect readings</li>
                </ul>
              </div>

          {/* Real-World Examples */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Target className="h-6 w-6 text-elec-yellow" />
                Real-World Testing Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-4">Example 1: New Domestic Installation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Installation Details:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• 3-bedroom house, new build</li>
                      <li>• 2.5mm² T&E cable throughout</li>
                      <li>• Standard consumer unit</li>
                      <li>• All equipment disconnected</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">Line to Neutral: &gt;999MΩ ✓</p>
                      <p className="text-green-400 font-mono text-sm">Line to Earth: &gt;999MΩ ✓</p>
                      <p className="text-green-400 font-mono text-sm">Neutral to Earth: &gt;999MΩ ✓</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>Conclusion:</strong> Excellent readings typical of new installation. All values well above minimum requirements.
                </p>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-elec-yellow font-semibold mb-4">Example 2: Older Installation Requiring Investigation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Installation Details:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• 1980s office building</li>
                      <li>• Some dampness issues noted</li>
                      <li>• Mixed cable types</li>
                      <li>• Socket circuit testing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">Line to Neutral: 85MΩ ✓</p>
                      <p className="text-elec-yellow font-mono text-sm">Line to Earth: 1.8MΩ ⚠</p>
                      <p className="text-elec-yellow font-mono text-sm">Neutral to Earth: 1.5MΩ ⚠</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>Action Required:</strong> Line to earth and neutral to earth readings below 2MΩ require investigation. 
                  Check for moisture ingress, damaged insulation, or poor connections.
                </p>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-4">Example 3: Failed Test Requiring Immediate Action</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Installation Details:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• Kitchen extension circuit</li>
                      <li>• Recent building work</li>
                      <li>• Possible cable damage</li>
                      <li>• Circuit keeps tripping RCD</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Test Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">Line to Neutral: 150MΩ ✓</p>
                      <p className="text-red-400 font-mono text-sm">Line to Earth: 0.3MΩ ✗</p>
                      <p className="text-red-400 font-mono text-sm">Neutral to Earth: 0.4MΩ ✗</p>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>Action Required:</strong> Circuit fails insulation test. Do not energise. 
                  Investigate cable route for damage, likely cause of RCD tripping.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Factors */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Gauge className="h-6 w-6 text-elec-yellow" />
                Environmental Factors Affecting Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-semibold mb-3">Temperature Effects</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li>• Higher temperature = Lower resistance</li>
                    <li>• Cold conditions = Higher resistance</li>
                    <li>• Standard test temperature: 20°C</li>
                    <li>• Significant variations require correction</li>
                    <li>• Note ambient temperature during testing</li>
                  </ul>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-green-400 font-semibold mb-3">Humidity Effects</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li>• High humidity = Lower resistance</li>
                    <li>• Moisture on surfaces conducts current</li>
                    <li>• Test in dry conditions where possible</li>
                    <li>• Damp conditions may give false failures</li>
                    <li>• Allow installation to dry if needed</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/20 p-4 rounded-lg border border-elec-yellow/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-elec-yellow font-semibold">Course Tip</h4>
                </div>
                <p className="text-yellow-200 text-sm">
                  In your practical assessment, if readings are affected by environmental conditions, 
                  note this on your test certificate and explain how you would address it in a real installation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Testing Techniques */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Advanced Testing Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-4">Section Testing for Fault Location</h3>
                <p className="text-white text-sm mb-3">
                  When overall circuit reading is low, test individual sections to locate the problem:
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Method:</h4>
                    <ul className="text-white text-sm space-y-1">
                      <li>• Isolate each section of the circuit</li>
                      <li>• Test from distribution board to first outlet</li>
                      <li>• Test between consecutive outlets</li>
                      <li>• Identify which section has low reading</li>
                      <li>• Focus investigation on problem section</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Example Results:</h4>
                    <div className="bg-transparent p-3 rounded space-y-1">
                      <p className="text-green-400 font-mono text-sm">DB to Socket 1: 200MΩ ✓</p>
                      <p className="text-green-400 font-mono text-sm">Socket 1 to 2: 180MΩ ✓</p>
                      <p className="text-red-400 font-mono text-sm">Socket 2 to 3: 0.8MΩ ✗</p>
                      <p className="text-green-400 font-mono text-sm">Socket 3 to 4: 190MΩ ✓</p>
                    </div>
                    <p className="text-white text-xs mt-2">Problem between sockets 2 and 3</p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-elec-yellow font-semibold mb-4">PI (Polarisation Index) Testing</h3>
                <p className="text-white text-sm mb-3">
                  Advanced technique for evaluating insulation condition over time:
                </p>
                <div className="space-y-3">
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-medium mb-2">Procedure:</h4>
                    <ol className="text-white text-sm space-y-1">
                      <li>1. Take reading at 1 minute</li>
                      <li>2. Continue test for full 10 minutes</li>
                      <li>3. Take final reading at 10 minutes</li>
                      <li>4. Calculate PI = R₁₀min ÷ R₁min</li>
                    </ol>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-green-600/20 p-3 rounded text-center">
                      <p className="text-green-400 font-semibold">PI ≥ 4.0</p>
                      <p className="text-green-300 text-sm">Excellent</p>
                    </div>
                    <div className="bg-elec-yellow/20 p-3 rounded text-center">
                      <p className="text-elec-yellow font-semibold">PI 2.0-4.0</p>
                      <p className="text-yellow-300 text-sm">Good</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded text-center">
                      <p className="text-red-400 font-semibold">PI &lt; 2.0</p>
                      <p className="text-red-300 text-sm">Poor</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment-Specific Guidance */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Zap className="h-6 w-6 text-elec-yellow" />
                Equipment That Must Be Disconnected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Always Disconnect</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Electronic equipment (TVs, computers, etc.)
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Fluorescent lamps and LED fittings
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Surge protection devices
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Dimmer switches
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      Motor capacitors
                    </li>
                  </ul>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-green-400 font-semibold mb-3">Can Usually Stay Connected</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Incandescent lamps (if switches closed)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Simple resistive heaters
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Basic socket outlets (empty)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Standard switches (in closed position)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-600/20 p-4 rounded-lg border border-orange-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-orange-400" />
                  <h4 className="text-orange-400 font-semibold">When in Doubt</h4>
                </div>
                <p className="text-orange-200 text-sm">
                  If you're unsure whether equipment can handle the test voltage, always disconnect it. 
                  It's better to be safe than damage expensive equipment or get false readings.
                </p>
              </div>
            </CardContent>
          </Card>
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
              <div className="space-y-4">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Very Low Reading (&lt;1MΩ)</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Damaged cable insulation</li>
                        <li>• Water ingress in accessories</li>
                        <li>• Equipment still connected</li>
                        <li>• Surge protector still in circuit</li>
                        <li>• Nail or screw through cable</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Disconnect all equipment</li>
                        <li>• Check for moisture in outlets</li>
                        <li>• Test individual sections</li>
                        <li>• Inspect cable routes</li>
                        <li>• Use section testing to locate fault</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Reading Won't Stabilise</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Large capacitive load connected</li>
                        <li>• Very long cable runs</li>
                        <li>• Electronic equipment still connected</li>
                        <li>• Variable environmental conditions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Wait longer for stabilisation</li>
                        <li>• Remove all electronic loads</li>
                        <li>• Test in controlled conditions</li>
                        <li>• Use higher test voltage if appropriate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-3">Problem: Different Readings on Similar Circuits</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Possible Causes:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Different cable types or ages</li>
                        <li>• Varying environmental conditions</li>
                        <li>• Different installation methods</li>
                        <li>• Partial equipment disconnection</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">Solutions:</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Check installation records</li>
                        <li>• Verify complete disconnection</li>
                        <li>• Test under same conditions</li>
                        <li>• Document differences and investigate</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Exam Tips */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Eye className="h-6 w-6 text-elec-yellow" />
                Exam Tips & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-semibold mb-3">Before Testing</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Confirm isolation is complete and proven
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Remove or disconnect ALL equipment
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Check your insulation tester is working
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Set test voltage to 500V for standard circuits
                    </li>
                  </ul>
                </div>
                
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-semibold mb-3">During Testing</h3>
                  <ul className="text-white text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Test all conductor combinations
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Wait for readings to stabilise
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Record readings clearly and legibly
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Check results meet minimum 1MΩ
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/30 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-400 font-semibold">Exam Success Tips</h4>
                </div>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Always remove lamps and electronic equipment before testing</li>
                  <li>• If reading is below 1MΩ, investigate before proceeding</li>
                  <li>• Higher readings indicate better insulation condition</li>
                  <li>• Environmental conditions affect readings - note temperature and humidity</li>
                  <li>• Document any unusual findings or deviations from expected results</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Testing Techniques */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Settings className="h-6 w-6 text-elec-yellow" />
                Advanced Testing Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-4">Sequential Testing for Large Installations</h3>
                <div className="space-y-4">
                  <p className="text-white text-sm">
                    For commercial or industrial installations with multiple circuits, use a systematic approach:
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Phase 1: Distribution Board Level</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Test each outgoing circuit at the DB</li>
                        <li>• Record initial readings for all circuits</li>
                        <li>• Identify any circuits with low readings</li>
                        <li>• Mark questionable circuits for detailed investigation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Phase 2: Sub-circuit Testing</h4>
                      <ul className="text-white text-sm space-y-1">
                        <li>• Break down low-reading circuits into sections</li>
                        <li>• Test individual branches and spurs</li>
                        <li>• Isolate problem areas systematically</li>
                        <li>• Document findings with circuit references</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-elec-yellow/20 p-4 rounded">
                    <p className="text-blue-200 text-sm">
                      <strong>Pro Tip:</strong> Always test the worst-performing circuit first during detailed investigation. 
                      This often reveals the root cause affecting multiple circuits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-orange-400 font-semibold mb-4">Testing in Challenging Conditions</h3>
                <div className="space-y-4">
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Damp Environments</h4>
                    <div className="bg-transparent p-4 rounded">
                      <div className="space-y-3">
                        <div>
                          <p className="text-elec-yellow font-medium text-sm">Challenge:</p>
                          <p className="text-white text-sm">Moisture on surfaces creates false current paths</p>
                        </div>
                        
                        <div>
                          <p className="text-green-400 font-medium text-sm">Solutions:</p>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Use compressed air to dry surfaces before testing</li>
                            <li>• Test during drier parts of the day if possible</li>
                            <li>• Apply temporary heating to reduce humidity</li>
                            <li>• Clean isolators and switches with appropriate solvents</li>
                            <li>• Document environmental conditions with readings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">High Capacitance Circuits</h4>
                    <div className="bg-transparent p-4 rounded">
                      <div className="space-y-3">
                        <div>
                          <p className="text-elec-yellow font-medium text-sm">Challenge:</p>
                          <p className="text-white text-sm">Long cable runs and control circuits take time to charge</p>
                        </div>
                        
                        <div>
                          <p className="text-green-400 font-medium text-sm">Technique:</p>
                          <ul className="text-white text-sm space-y-1">
                            <li>• Allow 60+ seconds for reading stabilisation</li>
                            <li>• Watch for gradual increase in resistance</li>
                            <li>• Don't accept initial low readings immediately</li>
                            <li>• Some modern testers have auto-timing features</li>
                            <li>• Document actual stabilisation time</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Selection and Setup */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <Gauge className="h-6 w-6 text-elec-yellow" />
                Equipment Selection & Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-elec-yellow font-semibold mb-4">Choosing the Right Insulation Tester</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Basic Requirements (Training/Domestic)</h4>
                    <div className="bg-transparent p-4 rounded">
                      <ul className="text-white text-sm space-y-2">
                        <li>• 250V and 500V test capabilities minimum</li>
                        <li>• Clear digital display with auto-ranging</li>
                        <li>• Prove-before-use test function</li>
                        <li>• Test lead storage and protection</li>
                        <li>• Calibration certificate (annual requirement)</li>
                        <li>• Suitable resolution: 0.01MΩ to 999MΩ+</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Professional/Industrial Features</h4>
                    <div className="bg-transparent p-4 rounded">
                      <ul className="text-white text-sm space-y-2">
                        <li>• Multiple test voltages: 250V, 500V, 1000V</li>
                        <li>• PI (Polarisation Index) calculation</li>
                        <li>• Data logging and Bluetooth connectivity</li>
                        <li>• Auto-discharge function for safety</li>
                        <li>• Backlit display for poor lighting conditions</li>
                        <li>• Robust construction for site conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-elec-yellow/20 p-4 rounded border-l-4 border-elec-yellow">
                  <p className="text-yellow-200 text-sm">
                    <strong>Calibration Critical:</strong> BS 7671 requires test instruments to be calibrated. 
                    Never use an out-of-calibration tester for compliance testing.
                  </p>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-4">Pre-Test Equipment Checks</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-white font-medium mb-3">Essential Checks Before Each Test Session</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-elec-yellow font-medium text-sm mb-2">Tester Verification:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Battery level sufficient for testing</li>
                          <li>• Display functioning correctly</li>
                          <li>• All test voltage options working</li>
                          <li>• Auto-discharge function operational</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-orange-400 font-medium text-sm mb-2">Test Lead Inspection:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• No visible damage to insulation</li>
                          <li>• Probe tips clean and sharp</li>
                          <li>• Continuity check between leads</li>
                          <li>• Insulation check between leads (should be ∞Ω)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-400">
                    <p className="text-red-200 text-sm">
                      <strong>Safety Check:</strong> Always perform a prove-before-use test. Test on a known good 
                      circuit first to verify the tester is working correctly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment and Exam Preparation */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Assessment & Exam Preparation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-purple-400 font-semibold mb-4">Practical Assessment Scenarios</h3>
                <div className="space-y-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-3">Scenario 1: "The Circuit That Wouldn't Pass"</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        <strong>Situation:</strong> Ring final circuit showing 0.8MΩ line to earth, other readings normal.
                      </p>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Your systematic approach:</p>
                        <ol className="text-white text-sm space-y-1 ml-4">
                          <li>1. Re-check test voltage selection (should be 500V)</li>
                          <li>2. Verify all equipment disconnected from circuit</li>
                          <li>3. Test individual socket positions to isolate fault</li>
                          <li>4. Check for moisture in outdoor sockets</li>
                          <li>5. Examine any recent additions or modifications</li>
                          <li>6. Document findings and recommended actions</li>
                        </ol>
                      </div>
                      
                      <div className="bg-green-600/20 p-3 rounded">
                        <p className="text-green-200 text-sm">
                          <strong>Examiner Expects:</strong> Logical fault-finding sequence, safety awareness, 
                          and clear documentation of the investigation process.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-elec-yellow font-medium mb-3">Scenario 2: "Mixed Results Interpretation"</h4>
                    <div className="space-y-3">
                      <p className="text-white text-sm">
                        <strong>Results:</strong> L-N: 150MΩ, L-E: 2.5MΩ, N-E: 180MΩ
                      </p>
                      
                      <div>
                        <p className="text-elec-yellow font-medium text-sm">Analysis required:</p>
                        <ul className="text-white text-sm space-y-1">
                          <li>• L-E reading is concerning (below 2MΩ investigation threshold)</li>
                          <li>• L-N and N-E readings excellent</li>
                          <li>• Suggests earth conductor path issue</li>
                          <li>• Could indicate damaged earth conductor insulation</li>
                          <li>• Requires investigation before energising</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-transparent/80 p-6 rounded-lg">
                <h3 className="text-red-400 font-semibold mb-4">Common Exam Mistakes to Avoid</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-red-400 font-medium mb-2">Technical Errors:</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Using wrong test voltage for circuit type</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Not allowing sufficient time for reading stabilisation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Forgetting to disconnect electronic equipment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Misinterpreting readings due to environmental factors</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-transparent p-4 rounded">
                    <h4 className="text-red-400 font-medium mb-2">Documentation Errors:</h4>
                    <ul className="text-white text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Not recording test voltage used</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Failing to note environmental conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Missing follow-up actions for low readings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Incomplete circuit identification details</span>
                      </li>
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

export default InsulationResistanceGuide;