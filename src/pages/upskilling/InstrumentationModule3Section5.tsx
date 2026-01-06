import { ArrowLeft, ArrowRight, Shield, Zap, AlertTriangle, CheckCircle, Lightbulb, Radio, Cable, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule3Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is a ground loop?",
      options: [
        "A type of electrical filter",
        "Unwanted current flow between different ground points at different potentials",
        "A method for signal amplification",
        "A type of cable shielding"
      ],
      correct: 1,
      explanation: "A ground loop occurs when there are multiple electrical connections to ground at different potentials, creating unwanted current flow that can cause interference and measurement errors."
    },
    {
      id: 2,
      question: "How does shielding improve signal quality?",
      options: [
        "By amplifying the signal strength",
        "By blocking external electromagnetic interference from affecting the signal",
        "By converting analog signals to digital",
        "By reducing power consumption"
      ],
      correct: 1,
      explanation: "Shielding improves signal quality by creating a conductive barrier that blocks external electromagnetic interference (EMI) and radio frequency interference (RFI) from affecting the signal conductors."
    },
    {
      id: 3,
      question: "What's a common source of EMI?",
      options: [
        "Temperature changes",
        "Motor drives, switching power supplies, and radio transmitters",
        "Low-frequency signals",
        "Ground connections"
      ],
      correct: 1,
      explanation: "Common EMI sources include motor drives with switching frequencies, switching power supplies, radio transmitters, fluorescent lights, and any equipment that generates rapid electrical transitions."
    },
    {
      id: 4,
      question: "Why use twisted pair cables?",
      options: [
        "They are cheaper than other cable types",
        "They cancel out electromagnetic interference through balanced signal transmission",
        "They carry more current",
        "They work at higher temperatures"
      ],
      correct: 1,
      explanation: "Twisted pair cables cancel out electromagnetic interference because both conductors receive equal interference, and in differential signalling, this common-mode interference is rejected while the differential signal is preserved."
    },
    {
      id: 5,
      question: "How do you diagnose signal noise issues?",
      options: [
        "Only by measuring signal amplitude",
        "Using oscilloscopes to observe noise patterns and signal analysers to identify frequency content",
        "By checking power supply voltage",
        "By measuring cable resistance"
      ],
      correct: 1,
      explanation: "Signal noise diagnosis requires oscilloscopes to visualise noise patterns in time domain, spectrum analysers to identify frequency content of interference, and systematic isolation techniques to locate noise sources."
  }  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Signal Integrity – Noise, Ground Loops, and Shielding
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Preserving signal fidelity in challenging industrial environments
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 3.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                55 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Radio className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Even the best sensors are useless if their signals are corrupted during transmission. Signal integrity encompasses all aspects of preserving signal fidelity from sensor to processing system. In industrial environments filled with electromagnetic interference, ground potential differences, and environmental challenges, maintaining signal integrity requires systematic design approaches and proven techniques.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Poor signal integrity can cause measurement errors, false alarms, system instability, and in critical applications, safety hazards. Proactive design prevents small problems from becoming large failures.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base">By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identify major threats to signal quality in industrial environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand how ground loops and interference arise and propagate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Learn best practices to maintain signal fidelity and system reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply troubleshooting techniques for diagnosing signal integrity problems</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Noise Sources */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Radio className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Noise Sources and Interference
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding noise sources is the first step in combating signal integrity problems. Industrial environments present numerous sources of electromagnetic interference that can corrupt measurement signals through various coupling mechanisms.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Electromagnetic Interference (EMI) Sources</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">High-Frequency Sources</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Switching Equipment:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Variable frequency drives (VFDs)</li>
                            <li>• Switching power supplies</li>
                            <li>• Motor contactors and relays</li>
                            <li>• PWM controllers</li>
                            <li>• DC-DC converters</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Communication Systems:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Radio transmitters</li>
                            <li>• Wireless communication devices</li>
                            <li>• Cellular repeaters</li>
                            <li>• Bluetooth and WiFi</li>
                            <li>• Digital communication protocols</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Low-Frequency Sources</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Power System Sources:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• 50/60 Hz mains frequency</li>
                            <li>• Power line harmonics</li>
                            <li>• Transformer magnetising currents</li>
                            <li>• Fluorescent lighting ballasts</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Mechanical Sources:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Motor brush noise</li>
                            <li>• Vibration-induced signals</li>
                            <li>• Mechanical switching contacts</li>
                            <li>• Rotating machinery signatures</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Coupling Mechanisms</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Capacitive Coupling</h6>
                          <p className="mb-2">High-frequency noise couples through stray capacitance between conductors.</p>
                          <p><strong>Effect:</strong> Higher frequencies couple more readily</p>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Inductive Coupling</h6>
                          <p className="mb-2">Magnetic fields from current-carrying conductors induce voltages in nearby circuits.</p>
                          <p><strong>Effect:</strong> Proportional to current and frequency</p>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Conductive Coupling</h6>
                          <p className="mb-2">Direct electrical connection through shared conductors or ground paths.</p>
                          <p><strong>Effect:</strong> All frequencies affected equally</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Radio Frequency Interference (RFI)</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Common RFI Sources</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <Radio className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Commercial Radio:</strong> AM/FM broadcast stations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Radio className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Mobile Communications:</strong> Cellular, 2-way radio</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Radio className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Industrial Heating:</strong> RF induction heaters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Radio className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Lighting Systems:</strong> High-intensity discharge</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">RFI Characteristics</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Frequency Range:</strong> 3 kHz to 3 GHz typically</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Penetration:</strong> Can penetrate inadequate shielding</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Distance Effects:</strong> Varies with antenna patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Detection:</strong> Often intermittent and location-dependent</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ground Loops */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Ground Loops and Ground Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Ground loops are one of the most common and troublesome sources of interference in instrumentation systems. They occur when current flows through unintended ground paths, creating voltage differences that appear as noise in measurement circuits.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Ground Loop Formation and Effects</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">How Ground Loops Form</h5>
                      <p className="text-xs sm:text-sm mb-3">Ground loops form when there are multiple electrical connections to ground at different potentials, creating a closed loop for current flow.</p>
                      <div className="bg-card p-3 rounded text-xs sm:text-sm">
                        <p className="mb-2"><strong>Common Scenario:</strong></p>
                        <p className="mb-1">• Sensor grounded at field location</p>
                        <p className="mb-1">• Control system grounded at panel location</p>
                        <p className="mb-1">• Cable shield connects both grounds</p>
                        <p>• Current flows through shield due to ground potential difference</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Ground Loop Current Sources</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Natural Sources:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Soil resistance variations</li>
                            <li>• Galvanic corrosion potentials</li>
                            <li>• Stray DC currents</li>
                            <li>• Temperature gradients</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">System Sources:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Power system neutral currents</li>
                            <li>• Unbalanced loads</li>
                            <li>• Harmonic currents</li>
                            <li>• Fault currents</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Effects on Measurement Systems</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Signal Corruption:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• AC hum (50/60 Hz noise)</li>
                            <li>• DC offset errors</li>
                            <li>• Measurement instability</li>
                            <li>• False alarm conditions</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">System Effects:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Control loop instability</li>
                            <li>• Communication errors</li>
                            <li>• Equipment damage risk</li>
                            <li>• Safety system failures</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Ground Loop Prevention Strategies</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Single-Point Grounding</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Connect all system grounds to one central point</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Eliminate multiple ground connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Use isolated signal conditioning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Ground shield at one end only</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Differential Signalling</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Use balanced signal transmission</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Common-mode rejection benefits</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Twisted pair cable implementation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Ground potential independence</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shielding Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Shielding Techniques and Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Effective shielding creates barriers to electromagnetic interference while maintaining signal integrity. The choice of shielding method depends on the frequency range of interference, signal characteristics, and installation environment.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Cable Shielding Methods</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Foil Shielding</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="mb-2">Thin aluminium or copper foil wrapped around cable conductors.</p>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• 100% coverage possible</li>
                            <li>• Excellent high-frequency performance</li>
                            <li>• Thin construction saves space</li>
                            <li>• Good electromagnetic compatibility</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Limitations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Fragile, tears easily</li>
                            <li>• Difficult to terminate</li>
                            <li>• Poor flexibility</li>
                            <li>• Requires drain wire</li>
                          </ul>
                          <strong className="text-white mt-2 block">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Fixed installations</li>
                            <li>• High-frequency signals</li>
                            <li>• Data communications</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Braided Shielding</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="mb-2">Woven metal strands forming a flexible conductive sleeve.</p>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Good flexibility and durability</li>
                            <li>• Easy termination</li>
                            <li>• Good low-frequency performance</li>
                            <li>• Mechanical strength</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Coverage:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Typically 65-95% coverage</li>
                            <li>• Gaps allow some interference</li>
                            <li>• Coverage decreases with flexing</li>
                          </ul>
                          <strong className="text-white mt-2 block">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Flexible installations</li>
                            <li>• Low-frequency signals</li>
                            <li>• Instrumentation cables</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Combination Shielding</h5>
                      <p className="text-xs sm:text-sm mb-2">Foil and braid combination providing benefits of both methods.</p>
                      <div className="bg-card p-3 rounded text-xs sm:text-sm">
                        <p><strong>Construction:</strong> Foil provides high-frequency protection with 100% coverage, while braid provides mechanical protection and easy termination.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Shielding Best Practices</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Installation Guidelines</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>360° Termination:</strong> Maintain shield continuity through connectors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Shield Grounding:</strong> Ground at one end only to prevent loops</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Routing:</strong> Separate from power cables and interference sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Bending Radius:</strong> Maintain minimum bend radius to preserve shield</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Advanced Techniques</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Multiple Shields:</strong> Individual and overall shields for multi-conductor cables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Triaxial Cables:</strong> Guard conductor between inner and outer shields</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Active Shielding:</strong> Driven shields to reduce capacitive loading</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Ferrite Suppressors:</strong> Additional high-frequency filtering</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Cable Selection and Routing</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Signal Cables</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Twisted pair construction</li>
                        <li>• Individual shield per pair</li>
                        <li>• Low-capacitance design</li>
                        <li>• Instrumentation grade</li>
                        <li>• Colour-coded identification</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Power Separation</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Minimum 300mm separation</li>
                        <li>• Cross at 90° angles only</li>
                        <li>• Use separate cable trays</li>
                        <li>• Consider conduit systems</li>
                        <li>• Avoid parallel runs</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Environmental Protection</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Weather-resistant jackets</li>
                        <li>• UV-stable materials</li>
                        <li>• Chemical resistance</li>
                        <li>• Temperature ratings</li>
                        <li>• Rodent protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Troubleshooting Signal Integrity Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Systematic troubleshooting of signal integrity problems requires understanding the symptoms, identifying likely causes, and applying appropriate diagnostic techniques to isolate and resolve issues.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Diagnostic Techniques</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Oscilloscope Analysis</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Time Domain Analysis:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Observe noise patterns</li>
                            <li>• Identify periodic interference</li>
                            <li>• Measure signal-to-noise ratio</li>
                            <li>• Check for signal clipping</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Trigger Techniques:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Edge triggering for impulse noise</li>
                            <li>• Video triggering for periodic noise</li>
                            <li>• Logic triggering for digital interference</li>
                            <li>• Single-shot capture for intermittent issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Spectrum Analysis</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Frequency Domain:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Identify interference frequencies</li>
                            <li>• Locate harmonic patterns</li>
                            <li>• Measure noise floor levels</li>
                            <li>• Compare signal and noise spectra</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Common Signatures:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• 50/60 Hz and harmonics (power)</li>
                            <li>• Switching frequencies (VFDs)</li>
                            <li>• Radio frequency bands (RFI)</li>
                            <li>• Broadband noise (arcing)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Isolation Testing</h5>
                      <p className="text-xs sm:text-sm mb-2">Systematic disconnection and reconnection to identify interference sources.</p>
                      <div className="bg-card p-3 rounded text-xs sm:text-sm">
                        <p><strong>Process:</strong> Disconnect suspected interference sources one by one while monitoring signal quality to identify the culprit.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Common Problems and Solutions</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-600 rounded-lg">
                      <thead>
                        <tr className="bg-card">
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-yellow-400">Symptom</th>
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Likely Cause</th>
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Solution</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs sm:text-sm">
                        <tr>
                          <td className="border border-gray-600 p-3 font-medium">50/60 Hz Hum</td>
                          <td className="border border-gray-600 p-3">Ground loops, power coupling</td>
                          <td className="border border-gray-600 p-3">Single-point grounding, isolation</td>
                        </tr>
                        <tr className="bg-card">
                          <td className="border border-gray-600 p-3 font-medium">High-frequency noise</td>
                          <td className="border border-gray-600 p-3">VFD interference, switching supplies</td>
                          <td className="border border-gray-600 p-3">Shielded cables, filtering</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 font-medium">Intermittent errors</td>
                          <td className="border border-gray-600 p-3">RFI, poor connections</td>
                          <td className="border border-gray-600 p-3">Better shielding, secure terminations</td>
                        </tr>
                        <tr className="bg-card">
                          <td className="border border-gray-600 p-3 font-medium">Signal attenuation</td>
                          <td className="border border-gray-600 p-3">Cable resistance, capacitance</td>
                          <td className="border border-gray-600 p-3">Signal boosters, lower impedance</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 font-medium">DC offset</td>
                          <td className="border border-gray-600 p-3">Ground potential differences</td>
                          <td className="border border-gray-600 p-3">Differential inputs, isolation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Hospital Laboratory Signal Protection</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  In a hospital laboratory, temperature sensors require protection from electromagnetic interference generated by nearby MRI machines and other medical equipment that could compromise critical sample storage monitoring:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Interference Assessment</h5>
                      <p className="text-xs">MRI systems generate intense RF fields (1.5-3 Tesla) with frequencies up to 300 MHz, plus gradient coil switching creating broadband EMI up to 100 kHz.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Multi-Layer Protection</h5>
                      <p className="text-xs">Combination foil/braid shielded cables with 360° connector terminations, isolated 4-20mA transmitters, and ferrite suppressors on cable ends provide comprehensive protection.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Installation Strategy</h5>
                      <p className="text-xs">Signal cables routed through dedicated conduits 2m minimum from MRI room, with single-point grounding at monitoring panel to eliminate ground loops.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Validation Testing</h5>
                      <p className="text-xs">Signal integrity testing during MRI operation confirmed &lt;0.01°C measurement error and no false alarms, meeting FDA validation requirements for pharmaceutical storage.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> Comprehensive signal integrity design achieved 99.9% data availability with zero interference-related temperature excursions over 2-year validation period, ensuring patient safety and regulatory compliance.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Preserving signal integrity ensures your data is trustworthy and your systems are reliable. Proactive design choices, proper shielding techniques, and systematic troubleshooting prevent small interference problems from becoming large system failures that compromise safety and operational effectiveness.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Signal Integrity Essentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Noise Sources:</strong> Identify and mitigate EMI, RFI, and ground-related interference
                  </div>
                  <div>
                    <strong className="text-white">Ground Systems:</strong> Implement single-point grounding and eliminate ground loops
                  </div>
                  <div>
                    <strong className="text-white">Shielding:</strong> Select appropriate cable types and installation practices
                  </div>
                  <div>
                    <strong className="text-white">Troubleshooting:</strong> Apply systematic diagnostic techniques for problem resolution
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-6 sm:pt-8">
            <Link to="../instrumentation-module-3-section-4" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-4" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400/10">
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

export default InstrumentationModule3Section5;