import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, Cable, Zap, Settings, Activity, Router, Signal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule2Section6QuizData } from '@/data/upskilling/bmsModule2Section6QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule2Section6 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  // SEO
  useEffect(() => {
    const title = 'Cabling, Interference, and Shielding Practices | BMS Module 2 Section 6';
    document.title = title;
    const desc = 'Learn proper cabling, interference protection and shielding techniques for BMS installations. Understand signal integrity, EMI mitigation, and BS 7671 compliance.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const handleInlineAnswer = (checkId: string, answerIndex: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: answerIndex }));
  };

  const InlineCheck = ({ 
    id, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    id: string; 
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    explanation: string; 
  }) => {
    const selectedAnswer = inlineChecks[id];
    const showFeedback = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineAnswer(id, index)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  showFeedback
                    ? index === correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/20 text-white'
                      : 'border-gray-600 bg-gray-800 text-white'
                    : selectedAnswer === index
                    ? 'border-yellow-400 bg-yellow-600/20 text-white'
                    : 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    showFeedback
                      ? index === correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-gray-500'
                  }`}>
                    {showFeedback && index === correctAnswer && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== correctAnswer && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {!showFeedback && selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Cabling, Interference, and Shielding Practices
                </h1>
                <p className="text-base text-white mt-2">
                  Maintaining signal integrity through proper cable installation and protection
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                22 min read
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Reliable communication between sensors, actuators, and controllers depends on correct cabling and shielding practices. 
                Poor installation can lead to electrical noise, inaccurate readings, or complete system failures. Electricians play a 
                crucial role in ensuring cables are routed, terminated, and protected correctly to maintain signal integrity in a 
                Building Management System (BMS).
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Understanding interference sources, proper cable selection, and shielding techniques is essential for reliable BMS operation. 
                Poor cable practices are one of the most common causes of system faults and ongoing maintenance issues.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4 text-base sm:text-lg">By the end of this section, you should be able to:</p>
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Explain why interference affects BMS signals",
                  "Identify best practices for cabling in control systems",
                  "Understand when and how to use shielding to protect signals",
                  "Apply BS 7671 and manufacturer requirements to maintain system integrity"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Why Interference is a Problem */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Signal className="h-6 w-6 text-yellow-400" />
                1. Why Interference is a Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                BMS signals are often low-voltage analog (0–10V, 4–20mA), making them vulnerable to electrical noise and interference. 
                Understanding why interference occurs and its effects is crucial for proper system design and installation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Signal Vulnerabilities:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Low Signal Levels</h5>
                    <p className="text-sm text-white">Analog signals (0-10V, 4-20mA) have low power levels making them susceptible to external electrical noise</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Long Cable Runs</h5>
                    <p className="text-sm text-white">Extended cable runs act as antennas, picking up electromagnetic interference from surrounding equipment</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Shared Pathways</h5>
                    <p className="text-sm text-white">Signal cables routed alongside power cables are exposed to electromagnetic fields and switching noise</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Environmental Factors</h5>
                    <p className="text-sm text-white">Temperature variations, humidity, and vibration can affect cable characteristics and signal integrity</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Common Sources of Interference</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Electrical Equipment</h5>
                    <p className="mb-2">Motors and variable speed drives (VSDs)</p>
                    <p className="mb-2">Switching power supplies</p>
                    <p className="mb-2">Contactors and relays</p>
                    <p>UPS systems and inverters</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Lighting Systems</h5>
                    <p className="mb-2">Fluorescent lighting ballasts</p>
                    <p className="mb-2">LED driver circuits</p>
                    <p className="mb-2">Dimming controls</p>
                    <p>Emergency lighting systems</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Radio Frequency</h5>
                    <p className="mb-2">Mobile phone signals</p>
                    <p className="mb-2">Wi-Fi and Bluetooth devices</p>
                    <p className="mb-2">Radio transmitters</p>
                    <p>Microwave ovens</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Mechanical Sources</h5>
                    <p className="mb-2">Lift motors and drives</p>
                    <p className="mb-2">Air handling unit motors</p>
                    <p className="mb-2">Pump control systems</p>
                    <p>Welding equipment</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Effects of Interference</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Inaccurate Readings</h5>
                    <p>Sensor readings fluctuate or become unreliable, leading to poor system control decisions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Unstable Control</h5>
                    <p>Actuators hunt or oscillate due to noisy control signals, causing equipment wear and energy waste</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Communication Errors</h5>
                    <p>Digital communication protocols experience data corruption, timeouts, and lost messages</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">System Instability</h5>
                    <p>Overall system performance becomes unpredictable with frequent alarms and service calls</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Digital vs Analog Signal Vulnerability</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Analog Signals (More Vulnerable)</h5>
                    <p>Continuous voltage/current levels where any interference directly affects the signal value. Small noise additions cause proportional measurement errors.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Digital Signals (More Robust)</h5>
                    <p>Discrete on/off states with defined switching thresholds. Interference must be significant to cause false switching between logic levels.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Error Detection</h5>
                    <p>Digital protocols often include checksums and error correction, while analog signals have no inherent error detection mechanism.</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check1"
                question="Why are analog BMS signals more vulnerable to interference than digital signals?"
                options={[
                  "Analog signals use higher voltages than digital signals",
                  "Analog signal values are directly affected by any noise, while digital signals have switching thresholds",
                  "Analog cables are longer than digital cables",
                  "Analog signals require more power to operate"
                ]}
                correctAnswer={1}
                explanation="Analog signals are continuous voltage/current levels where any interference directly affects the signal value. Digital signals have defined switching thresholds, so interference must be significant to cause false switching between logic levels."
              />
            </CardContent>
          </Card>

          {/* Section 2: Best Practices for Cabling */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Cable className="h-6 w-6 text-yellow-400" />
                2. Best Practices for Cabling
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Proper cable routing and installation practices are fundamental to maintaining signal integrity and preventing 
                interference-related problems in BMS installations.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Cable Segregation Principles:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Power and Control Separation</h5>
                    <p className="text-sm text-white">Keep power and control cables in different containment systems - minimum 300mm separation where parallel runs are unavoidable</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Voltage Level Segregation</h5>
                    <p className="text-sm text-white">Separate high voltage (&gt;50V), low voltage (12-50V), and extra-low voltage (&lt;12V) cables into different cable routes</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Signal Type Grouping</h5>
                    <p className="text-sm text-white">Group similar signal types together - analog inputs, digital inputs, analog outputs, and communication cables</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Crossing Techniques</h5>
                    <p className="text-sm text-white">When cables must cross, ensure they cross at 90 degrees to minimise electromagnetic coupling</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-3">Cable Selection and Specifications:</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Twisted Pair Cables</h5>
                    <p>Use twisted pair construction for analog signals. The twisting cancels out electromagnetic interference through balanced impedance.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Cable Impedance</h5>
                    <p>Match cable impedance to system requirements (typically 120Ω for RS-485, 100Ω for Ethernet)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Conductor Material</h5>
                    <p>Use copper conductors for signal integrity. Avoid aluminium for control and communication cables</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Environmental Rating</h5>
                    <p>Select appropriate outer sheath material (PVC, LSOH, PE) based on installation environment and fire regulations</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-3">Containment Selection:</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Metallic Systems</h5>
                    <p className="mb-2">Steel conduit and trunking for high EMI protection</p>
                    <p className="mb-2">Galvanised steel tray with covers</p>
                    <p>Ensures continuous earth path for shielding</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Non-Metallic Systems</h5>
                    <p className="mb-2">PVC conduit for general signal cable protection</p>
                    <p className="mb-2">Cable basket systems for easy access</p>
                    <p>Suitable where EMI protection not critical</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Installation Environment Considerations</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Temperature Variations</h5>
                    <p>Select cables rated for expected temperature range. Consider thermal expansion in long runs</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Moisture Protection</h5>
                    <p>Use appropriate IP ratings for containment in damp locations. Consider condensation in temperature-varying environments</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Mechanical Protection</h5>
                    <p>Provide adequate protection against physical damage, especially in areas with mobile equipment or maintenance access</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Chemical Compatibility</h5>
                    <p>Consider chemical exposure from cleaning agents, industrial processes, or environmental conditions</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="Why should signal cables not be run parallel with high-voltage cables?"
                options={[
                  "High-voltage cables are physically larger and take up more space",
                  "Electromagnetic fields from high-voltage cables induce interference in signal cables",
                  "High-voltage cables generate more heat than signal cables",
                  "Signal cables are more expensive and need protection"
                ]}
                correctAnswer={1}
                explanation="High-voltage cables carrying large currents generate electromagnetic fields that can induce interference in nearby signal cables, causing noise and signal corruption. Maintaining separation prevents this electromagnetic coupling."
              />
            </CardContent>
          </Card>

          {/* Section 3: Shielding Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Router className="h-6 w-6 text-yellow-400" />
                3. Shielding Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Shielded cables provide an additional layer of protection against electromagnetic interference (EMI). 
                Proper selection, installation, and termination of shields is critical for effective interference reduction.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Shield Types and Applications:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Foil Shields (Mylar/Aluminium)</h5>
                    <p className="text-sm text-white">Provide 100% coverage against high-frequency interference. Lightweight and cost-effective for general applications</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Braided Shields</h5>
                    <p className="text-sm text-white">Woven wire mesh offering excellent low-frequency protection and mechanical strength. Typically 70-95% coverage</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Combination Shields</h5>
                    <p className="text-sm text-white">Foil plus braid construction providing comprehensive protection across all frequencies</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Armoured Cables</h5>
                    <p className="text-sm text-white">Steel wire or tape armour for severe EMI environments and additional mechanical protection</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Shield Earthing Principles</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Single-Point Earthing (Preferred)</h5>
                    <p>Earth shield at one end only to prevent ground loop currents. Typically earth at the controller/receiver end</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Ground Loop Problems</h5>
                    <p>Earthing at both ends can create circulating currents if earth potentials differ, potentially making interference worse</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Long Cable Runs</h5>
                    <p>For runs &gt;300m, consider earthing at both ends through capacitors to provide RF path while blocking DC ground loops</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Shield Continuity</h5>
                    <p>Maintain continuous shield connection through junction boxes and ensure low-impedance earth connections</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">High-Noise Environment Solutions</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Double-Shielded Cables</h5>
                    <p>Two separate shields with individual earthing for maximum protection near VSDs and welding equipment</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Metallic Conduit Systems</h5>
                    <p>Continuous steel conduit/trunking providing an additional shield layer around the cable shield</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Physical Separation</h5>
                    <p>Increase separation distances beyond minimum requirements - use dedicated cable routes for critical signals</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Fibre Optic Alternatives</h5>
                    <p>Consider fibre optic communication for complete electrical isolation in extreme EMI environments</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Manufacturer Requirements</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Cable Specifications</h5>
                    <p>Follow manufacturer's recommended cable types, impedance values, and maximum cable lengths</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Termination Methods</h5>
                    <p>Use recommended shield termination techniques - proper glands, cable boots, and earth connections</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Installation Guidelines</h5>
                    <p>Adhere to minimum bend radius, pulling tensions, and environmental requirements specified by manufacturers</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Testing Requirements</h5>
                    <p>Perform recommended continuity, insulation, and shield integrity tests before system commissioning</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="Why should shields usually be earthed at one end only?"
                options={[
                  "To save on earth cable and installation costs",
                  "To prevent ground loop currents that can make interference worse",
                  "To comply with electrical safety regulations",
                  "To reduce the total resistance of the shielding system"
                ]}
                correctAnswer={1}
                explanation="Earthing shields at both ends can create ground loop currents if earth potentials differ between the two points. These circulating currents can actually make interference worse and should be avoided by earthing at one end only."
              />
            </CardContent>
          </Card>

          {/* Section 4: Testing and Maintenance Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                4. Testing and Maintenance Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Regular testing and maintenance of cabling systems ensures ongoing signal integrity and helps identify 
                potential problems before they cause system failures.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Commissioning Tests:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Signal Stability Testing</h5>
                    <p className="text-sm text-white">Use multimeter to monitor analog signals for fluctuations over time - stable readings indicate good installation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Continuity Verification</h5>
                    <p className="text-sm text-white">Test all cable cores for continuity and verify no short circuits between conductors or to earth</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Insulation Resistance</h5>
                    <p className="text-sm text-white">Measure insulation resistance between conductors and to earth - minimum 2MΩ for low voltage systems</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Shield Integrity</h5>
                    <p className="text-sm text-white">Verify shield continuity and proper earth connections using low-resistance ohmmeter</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-3">Interference Detection Techniques:</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Signal Monitoring</h5>
                    <p>Use oscilloscope or data logger to monitor signal quality over extended periods, looking for noise patterns</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Load Switching Tests</h5>
                    <p>Monitor signals while switching large loads to identify interference sources and coupling paths</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Frequency Analysis</h5>
                    <p>Use spectrum analyser to identify specific interference frequencies and trace back to source equipment</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Correlation Testing</h5>
                    <p>Compare signal behaviour with equipment operation schedules to identify interference correlation</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Ongoing Maintenance Requirements</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Regular Inspections</h5>
                    <p className="mb-2">Visual inspection of cable containment</p>
                    <p className="mb-2">Check earth connections and glands</p>
                    <p className="mb-2">Verify cable support and routing</p>
                    <p>Document any modifications or damage</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Performance Monitoring</h5>
                    <p className="mb-2">Track signal quality trends over time</p>
                    <p className="mb-2">Monitor for increasing noise levels</p>
                    <p className="mb-2">Record environmental condition changes</p>
                    <p>Investigate recurring system alarms</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Common Fault Indicators</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Intermittent Faults</h5>
                    <p>Signal readings that vary without corresponding physical changes often indicate interference problems</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Time-Correlated Issues</h5>
                    <p>Problems that occur at specific times may relate to equipment switching schedules or environmental factors</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Weather-Related Problems</h5>
                    <p>Issues during wet conditions may indicate moisture ingress or deteriorating cable insulation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Progressive Degradation</h5>
                    <p>Gradually worsening signal quality often indicates aging cables or deteriorating connections</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Documentation and Records</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Test Records</h5>
                    <p>Maintain comprehensive records of all commissioning and periodic tests for trend analysis</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Cable Schedules</h5>
                    <p>Keep up-to-date cable schedules showing routes, specifications, and connection details</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Modification Records</h5>
                    <p>Document all system changes, additions, and repairs with dates and responsible personnel</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Fault History</h5>
                    <p>Maintain log of all interference-related faults and their resolution methods for future reference</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check4"
                question="What test tool can be used to confirm analog signal stability during commissioning?"
                options={[
                  "Insulation resistance tester",
                  "Multimeter with data logging capability",
                  "Earth loop impedance tester",
                  "Phase rotation indicator"
                ]}
                correctAnswer={1}
                explanation="A multimeter with data logging capability can monitor analog signal levels over time to confirm stability and detect fluctuations that may indicate interference problems during commissioning."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg font-medium text-yellow-400">As an electrician:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Always route signal cabling away from high-current circuits and VSDs using separate containment systems</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Use proper containment to protect cabling from physical damage and provide electromagnetic shielding where required</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Clearly label signal, power, and network cables with comprehensive identification systems for future maintenance</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Document shielding and earthing practices in as-built drawings for future maintenance teams and system modifications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">The Problem</h4>
                <p className="text-red-100 text-sm">
                  In a large office building, temperature sensors throughout the building kept giving fluctuating readings, 
                  causing the HVAC system to hunt and waste energy. The BMS was showing erratic temperature values that 
                  didn't correlate with actual room conditions, leading to occupant complaints about comfort levels.
                </p>
              </div>
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Investigation</h4>
                <p className="text-amber-100 text-sm">
                  On investigation, it was discovered that the sensor cables had been installed in the same cable tray 
                  as the power supply cables for HVAC fans and pumps. The high switching currents from the motor starters 
                  were generating electromagnetic interference that was being picked up by the unshielded sensor cables, 
                  causing the analog temperature signals to fluctuate.
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">The Solution</h4>
                <p className="text-green-100 text-sm">
                  The sensor cables were rerouted into separate containment with proper segregation from power cables. 
                  Shielded twisted-pair cables were installed with shields earthed at the controller end only. Additional 
                  metallic trunking was used in areas close to motor control panels for extra electromagnetic protection.
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">The Result</h4>
                <p className="text-blue-100 text-sm">
                  After rerouting the cables with proper shielding and segregation, the temperature sensors provided 
                  stable and accurate data. The HVAC system performance improved dramatically with precise temperature 
                  control, reduced energy consumption, and elimination of occupant comfort complaints.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>BMS cabling must be installed to prevent interference and signal loss through proper routing and segregation</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Keep power and control cables separate, and use twisted-pair cables for analog signals to reduce noise susceptibility</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Shielding reduces EMI when properly installed - earth the shield at one end only to prevent ground loops</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Testing and maintenance ensure ongoing signal stability - poor cable practice is a leading cause of BMS faults</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule2Section6QuizData}
                title="Cabling, Interference, and Shielding Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between'} pt-8`}>
            <Link to="../bms-module-2-section-5" className={isMobile ? 'w-full' : ''}>
              <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full py-3' : ''}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-3" className={isMobile ? 'w-full' : ''}>
              <Button className={`bg-yellow-400 text-black hover:bg-yellow-600 ${isMobile ? 'w-full py-3' : ''}`}>
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BMSModule2Section6;