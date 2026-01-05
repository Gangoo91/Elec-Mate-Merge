import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Target, Lightbulb, ChevronRight, ChevronLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What are the two main types of overcurrent?",
      options: [
        "Voltage surge and voltage dip",
        "Overload and short-circuit",
        "Earth fault and line fault",
        "Phase imbalance and harmonic distortion"
      ],
      correct: 1,
      explanation: "The two main types of overcurrent are overload (gradual current increase beyond design capacity) and short-circuit (sudden high current due to low impedance path)."
    },
    {
      id: 2,
      question: "Which device combines overcurrent and earth fault protection?",
      options: [
        "MCB",
        "MCCB", 
        "RCBO",
        "Fuse"
      ],
      correct: 2,
      explanation: "RCBO (Residual Current Breaker with Overcurrent protection) combines both overcurrent protection (like an MCB) and earth fault protection (like an RCD) in a single device."
    },
    {
      id: 3,
      question: "When would you typically use a Type D MCB?",
      options: [
        "For lighting circuits only",
        "For socket outlet circuits",
        "For motors with high starting currents",
        "For computer equipment"
      ],
      correct: 2,
      explanation: "Type D MCBs have the highest tripping threshold and are used for loads with very high inrush currents, such as large motors, transformers, and other inductive loads."
    },
    {
      id: 4,
      question: "Why must the breaking capacity of a device be checked?",
      options: [
        "To ensure it matches the load current",
        "To verify it can safely interrupt the maximum prospective fault current",
        "To check compatibility with cable size",
        "To ensure proper discrimination"
      ],
      correct: 1,
      explanation: "Breaking capacity (Icn or Icu) must exceed the maximum prospective fault current at the installation point to ensure the device can safely interrupt fault currents without damage."
    },
    {
      id: 5,
      question: "What does 'discrimination' mean in overcurrent protection?",
      options: [
        "Choosing the right device type",
        "Setting the correct current rating",
        "Ensuring only the device closest to the fault operates",
        "Matching device characteristics to load"
      ],
      correct: 2,
      explanation: "Discrimination (selectivity) ensures that when a fault occurs, only the protective device closest to the fault operates, leaving the rest of the installation energised."
    },
    {
      id: 6,
      question: "What is a key advantage of AFDD protection?",
      options: [
        "Faster than MCB operation",
        "Detection of series arc faults that MCBs cannot detect",
        "Lower cost than traditional protection",
        "Works without neutral conductor"
      ],
      correct: 1,
      explanation: "AFDDs can detect dangerous series arc faults (high resistance faults) that do not produce enough current to trip conventional MCBs, providing enhanced fire protection."
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
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Overcurrent Protection & Device Selection
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding protective devices and selection criteria
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
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
                Overcurrent protection forms the backbone of electrical installation safety, preventing fires, equipment damage, and ensuring system reliability. With increasing complexity of modern electrical loads and the introduction of renewable energy systems, selecting appropriate protective devices requires thorough understanding of device characteristics, coordination principles, and application requirements.
              </p>
              <p className="text-base leading-relaxed">
                BS 7671 provides comprehensive guidance for overcurrent protection, but successful implementation requires understanding device limitations, environmental factors, and coordination with other protection systems. Amendment 2 has introduced additional considerations for AFDD protection and smart system integration.
              </p>
              <p className="text-base leading-relaxed">
                This section covers the full spectrum of overcurrent protection, from basic device selection through to complex discrimination studies and modern protection technologies.
              </p>
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
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Analyse</strong> overcurrent conditions and their potential consequences in electrical installations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Select</strong> appropriate protective devices based on load characteristics, fault levels, and environmental conditions</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Calculate</strong> device ratings, breaking capacities, and coordination requirements for complex installations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Design</strong> protection schemes ensuring proper discrimination and system reliability</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Evaluate</strong> modern protection technologies including AFDD and smart protection devices</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>Apply</strong> Amendment 2 requirements for enhanced overcurrent protection in contemporary installations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of Overcurrent */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-red-500" />
                Types of Overcurrent
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Understanding Overcurrent Conditions</h4>
                <p className="text-sm">
                  Overcurrent occurs when the current in a circuit exceeds the designed or rated value. Different types require different protection strategies and device characteristics.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Overload Current</h4>
                  <p className="text-sm mb-3 text-orange-400">Gradual increase in current beyond design capacity</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Characteristics:</strong> 1.1 to 10 times rated current</li>
                    <li>• <strong>Duration:</strong> Seconds to hours before damage occurs</li>
                    <li>• <strong>Causes:</strong> Additional loads, motor stalling, equipment aging</li>
                    <li>• <strong>Effects:</strong> Gradual heating, insulation degradation</li>
                    <li>• <strong>Protection:</strong> Thermal or thermal-magnetic devices</li>
                  </ul>
                  
                  <div className="mt-3 p-2 bg-orange-600/20 rounded border border-orange-600/40">
                    <p className="text-xs text-orange-400">
                      <strong>Key Point:</strong> Overload protection allows temporary overcurrents but prevents sustained overheating
                    </p>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Short-Circuit Current</h4>
                  <p className="text-sm mb-3 text-red-400">Sudden high current due to low impedance path</p>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Characteristics:</strong> 10 to 1000+ times rated current</li>
                    <li>• <strong>Duration:</strong> Milliseconds before severe damage</li>
                    <li>• <strong>Causes:</strong> Insulation failure, contact between conductors</li>
                    <li>• <strong>Effects:</strong> Magnetic forces, arcing, fire risk</li>
                    <li>• <strong>Protection:</strong> Magnetic or current-limiting devices</li>
                  </ul>

                  <div className="mt-3 p-2 bg-red-600/20 rounded border border-red-600/40">
                    <p className="text-xs text-red-400">
                      <strong>Key Point:</strong> Short-circuit protection must operate extremely fast to prevent damage
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4">Real-World Overcurrent Scenarios</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Motor Starting:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Initial inrush: 6-8 times full load</li>
                      <li>• Duration: 2-10 seconds typical</li>
                      <li>• Requires Type C or D MCBs</li>
                      <li>• Consider soft-start systems</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Transformer Energising:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Magnetising inrush current</li>
                      <li>• Up to 12-25 times rated current</li>
                      <li>• Decays within seconds</li>
                      <li>• Can cause nuisance tripping</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Cable Faults:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• Mechanical damage during work</li>
                      <li>• Moisture ingress over time</li>
                      <li>• Rodent damage in rural areas</li>
                      <li>• Requires fast fault clearance</li>
                    </ul>
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
                Advanced Device Selection & Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Modern Protection Technologies</h4>
                <p className="text-sm">
                  Today's electrical installations require sophisticated protection strategies that go beyond basic overcurrent protection, incorporating arc fault detection, smart monitoring, and enhanced coordination.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Arc Fault Detection Devices (AFDD)</h4>
                  <p className="text-sm mb-3 text-purple-400">Enhanced fire protection through arc detection</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Detection Capabilities:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Series arc faults (high resistance)</li>
                        <li>• Parallel arc faults (line to line/earth)</li>
                        <li>• Combination arc fault patterns</li>
                        <li>• Distinguishes from normal arcing</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Amendment 2 Requirements:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Recommended for final circuits</li>
                        <li>• Higher risk installations priority</li>
                        <li>• Coordination with RCD protection</li>
                        <li>• Cost-benefit analysis required</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Installation Considerations:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Socket outlet circuits priority</li>
                        <li>• Sleeping accommodation areas</li>
                        <li>• Locations with combustible materials</li>
                        <li>• Historic buildings with aging wiring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Smart Protection Systems</h4>
                  <p className="text-sm mb-3 text-green-400">Intelligent monitoring and automated responses</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Smart MCB Features:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Remote monitoring capabilities</li>
                        <li>• Energy consumption tracking</li>
                        <li>• Predictive maintenance alerts</li>
                        <li>• Mobile app integration</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">IoT Integration:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Real-time fault notifications</li>
                        <li>• Historical data analysis</li>
                        <li>• Load pattern recognition</li>
                        <li>• Automatic reporting systems</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Future Developments:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• AI-powered fault prediction</li>
                        <li>• Self-healing grid integration</li>
                        <li>• Dynamic load management</li>
                        <li>• Blockchain-based certification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4">Practical Case Studies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-3">Commercial Office Building</h5>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <strong className="text-yellow-400">Challenge:</strong> High IT load density with sensitive equipment
                      </div>
                      <div className="text-xs">
                        <strong className="text-green-400">Solution:</strong> 
                        <ul className="mt-1 space-y-1">
                          <li>• Type B MCBs for general lighting/sockets</li>
                          <li>• RCBO protection for IT circuits</li>
                          <li>• Surge protection coordination</li>
                          <li>• Smart monitoring for energy management</li>
                        </ul>
                      </div>
                      <div className="text-xs">
                        <strong className="text-yellow-400">Result:</strong> Improved uptime, reduced energy costs, predictive maintenance
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-3">Industrial Manufacturing Plant</h5>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <strong className="text-yellow-400">Challenge:</strong> Large motor loads with high starting currents
                      </div>
                      <div className="text-xs">
                        <strong className="text-green-400">Solution:</strong> 
                        <ul className="mt-1 space-y-1">
                          <li>• Type D MCBs for motor feeders</li>
                          <li>• Discrimination study for selectivity</li>
                          <li>• Motor protection relays integration</li>
                          <li>• Condition monitoring systems</li>
                        </ul>
                      </div>
                      <div className="text-xs">
                        <strong className="text-yellow-400">Result:</strong> Minimised production downtime, optimised maintenance schedules
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breaking Capacity & Coordination */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Breaking Capacity & Discrimination
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Critical Selection Criteria</h4>
                <p className="text-sm">
                  Proper device coordination ensures that only the device closest to a fault operates, maintaining supply to unaffected parts of the installation while safely clearing faults.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Breaking Capacity Assessment</h4>
                  <p className="text-sm mb-3 text-orange-400">Ensuring devices can safely interrupt fault currents</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Key Calculations:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Prospective fault current (PFC) assessment</li>
                        <li>• Source impedance consideration</li>
                        <li>• Cable impedance calculations</li>
                        <li>• Transformer contribution analysis</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Breaking Capacity Types:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Icn (Ultimate breaking capacity)</li>
                        <li>• Ics (Service breaking capacity)</li>
                        <li>• Icw (Short-time withstand current)</li>
                        <li>• Safety margins and derating</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Discrimination Studies</h4>
                  <p className="text-sm mb-3 text-yellow-400">Coordinated protection for optimal selectivity</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Discrimination Methods:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Current discrimination (2:1 ratio typical)</li>
                        <li>• Time discrimination (graded timing)</li>
                        <li>• Energy discrimination (current limiting)</li>
                        <li>• Zone selective interlocking</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Practical Considerations:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Load diversity factors</li>
                        <li>• Future expansion provisions</li>
                        <li>• Maintenance accessibility</li>
                        <li>• Economic optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4">Discrimination Example - Hospital Installation</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Main Incomer:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• 400A MCCB with adjustable settings</li>
                      <li>• Long time delay: 1600A for 4 seconds</li>
                      <li>• Short time delay: 3200A for 0.4 seconds</li>
                      <li>• Instantaneous: 8000A</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Sub-Main Feeders:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• 100A MCCB distribution boards</li>
                      <li>• Long time delay: 100A for 10 seconds</li>
                      <li>• Short time delay: 800A for 0.2 seconds</li>
                      <li>• Current discrimination margin</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm mb-2">Final Circuits:</h5>
                    <ul className="text-xs space-y-1">
                      <li>• 32A MCB Type B for general sockets</li>
                      <li>• 16A RCBO for critical equipment</li>
                      <li>• Instantaneous operation only</li>
                      <li>• No time grading required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of overcurrent protection principles and device selection criteria."
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-4-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-4-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default BS7671Module4Section2;