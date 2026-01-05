import { ArrowLeft, Flame, CheckCircle, Target, Lightbulb, Zap, Battery, Car, Wifi, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section6 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What causes an arc fault?",
      options: [
        "Overload conditions only",
        "Electrical breakdown between conductors due to damaged cables, loose connections, or worn insulation",
        "Normal switching operations",
        "Earth fault conditions"
      ],
      correct: 1,
      explanation: "Arc faults are caused by electrical breakdown between conductors, typically due to damaged cables, loose connections, or worn insulation, creating dangerous sparks and high temperatures."
    },
    {
      id: 2,
      question: "What does an AFDD do when it detects a dangerous arc?",
      options: [
        "Sounds an alarm only",
        "Reduces the current flow",
        "Disconnects power to the affected circuit",
        "Increases the voltage to clear the arc"
      ],
      correct: 2,
      explanation: "When an AFDD detects a dangerous arc, it immediately disconnects power to the affected circuit to prevent fire and protect the installation."
    },
    {
      id: 3,
      question: "Where is it recommended to install AFDDs?",
      options: [
        "In all domestic properties",
        "High-risk sleeping accommodation, places with valuable content, and wooden/combustible structures",
        "Only in industrial installations",
        "Only where RCDs are not fitted"
      ],
      correct: 1,
      explanation: "AFDDs are recommended for high-risk sleeping accommodation (HMOs, care homes), places with valuable content (museums), and wooden or combustible structures."
    },
    {
      id: 4,
      question: "Are AFDDs mandatory under BS 7671?",
      options: [
        "Yes, in all new installations",
        "Yes, but only in commercial buildings",
        "No, they are recommended but not mandatory",
        "Only in high-risk locations"
      ],
      correct: 2,
      explanation: "AFDDs are recommended under Amendment 2 of BS 7671 but are not mandatory. They are encouraged for enhanced fire prevention in high-risk areas."
    },
    {
      id: 5,
      question: "How are AFDDs typically installed in a consumer unit?",
      options: [
        "As standalone devices only",
        "In combination with RCBOs on DIN rail mounting",
        "As external units connected by cables",
        "Built into the main switch"
      ],
      correct: 1,
      explanation: "AFDDs are typically installed in combination with RCBOs on DIN rail mounting within consumer units, providing both arc fault and earth fault protection."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Flame className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Arc Fault Detection Devices (AFDDs) – New Requirements
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Enhanced fire prevention through arc fault detection
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                20 minutes
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
                Arc faults are a hidden fire risk in electrical systems that traditional protective devices cannot detect. Arc Fault Detection Devices (AFDDs) are designed to detect and isolate dangerous arcing faults, offering a new level of safety introduced in Amendment 2 of the 18th Edition.
              </p>
              <p className="text-base leading-relaxed">
                Understanding how AFDDs work and where they should be used is crucial for modern electrical safety and fire prevention strategies.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand what arc faults are and how they occur</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Learn how AFDDs work and where they should be used</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify changes introduced in Amendment 2 regarding AFDDs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Be aware of installation and coordination considerations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Is an Arc Fault */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-red-500" />
                What Is an Arc Fault?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Electrical Breakdown Between Conductors</h4>
                <p className="text-sm mb-3">
                  An arc fault is an electrical breakdown between conductors that can occur due to damaged cables, loose connections, or worn insulation. This creates dangerous high temperatures, sparks, and potential fires.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Common Causes</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Damaged or deteriorated cable insulation</li>
                    <li>• Loose connections at terminals</li>
                    <li>• Worn or corroded conductors</li>
                    <li>• Physical damage to wiring</li>
                    <li>• Overheating from poor connections</li>
                    <li>• Rodent damage to cables</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">Arc Characteristics</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Temperatures exceeding 3000°C</li>
                    <li>• Ionized air creating conductive path</li>
                    <li>• Intermittent and unpredictable nature</li>
                    <li>• May not trip conventional breakers</li>
                    <li>• Produces distinctive frequency patterns</li>
                    <li>• Can ignite surrounding materials</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Fire Risks</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Ignition of insulation materials</li>
                    <li>• Spread to surrounding combustibles</li>
                    <li>• Hidden locations make detection difficult</li>
                    <li>• Can smoulder for extended periods</li>
                    <li>• Often occurs in wall cavities</li>
                    <li>• May not be detected until too late</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-red-400 font-semibold mb-3">Why Traditional Protection Fails</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Overcurrent Devices:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Arc currents often below trip threshold</li>
                      <li>• Intermittent nature prevents consistent detection</li>
                      <li>• MCBs/fuses designed for overload/short circuits</li>
                      <li>• Cannot distinguish between normal and dangerous arcs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">RCD Devices:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Arc faults may not create earth leakage</li>
                      <li>• Line-to-neutral arcs won't trigger RCDs</li>
                      <li>• Detection limited to earth fault scenarios</li>
                      <li>• No protection against series arc faults</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Is an AFDD */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Flame className="h-6 w-6 text-yellow-400" />
                What Is an AFDD?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Advanced Arc Detection Technology</h4>
                <p className="text-sm mb-3">
                  An Arc Fault Detection Device is a protective device that continuously monitors circuits for arc characteristics and disconnects power when a dangerous arc is detected. AFDDs are typically DIN rail mounted and installed in consumer units.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">How AFDDs Work</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">1.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Continuous Monitoring</p>
                      <p className="text-xs text-gray-400">AFDD continuously analyses current waveforms and frequency patterns</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">2.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Pattern Recognition</p>
                      <p className="text-xs text-gray-400">Intelligent algorithms distinguish between normal and dangerous arcs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">3.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Arc Detection</p>
                      <p className="text-xs text-gray-400">Device identifies characteristic signatures of dangerous arcing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold text-lg">4.</span>
                    <div>
                      <p className="text-white font-semibold text-sm">Immediate Disconnection</p>
                      <p className="text-xs text-gray-400">Circuit is rapidly disconnected to prevent fire development</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Detection Methods</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Frequency Analysis:</p>
                      <p className="text-xs">Monitors high-frequency components created by arcing</p>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Current Signature:</p>
                      <p className="text-xs">Analyses current waveform distortions and irregularities</p>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm mb-2">Pattern Recognition:</p>
                      <p className="text-xs">Uses intelligent algorithms to distinguish arc types</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Types of Arc Faults Detected</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Series Arc Faults:</p>
                      <p className="text-xs">Arcing along a single conductor due to loose connections</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Parallel Arc Faults:</p>
                      <p className="text-xs">Arcing between live conductors or to earth</p>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Ground Arc Faults:</p>
                      <p className="text-xs">Arcing from live conductor to earthed parts</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements under Amendment 2 */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Requirements under Amendment 2 (2022)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Recommended (Not Mandatory) Applications</h4>
                <p className="text-sm mb-3">
                  Amendment 2 of BS 7671 introduced recommendations for AFDD use in specific high-risk applications, though they remain optional rather than mandatory in most situations.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <div className="bg-red-600/20 p-3 rounded border border-red-600/40 mb-4">
                    <h4 className="text-red-400 font-semibold text-lg mb-2">High-Risk Sleeping Accommodation</h4>
                    <p className="text-xs">Houses in Multiple Occupation (HMOs), care homes, student accommodation</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li>• Increased fire risk due to occupancy density</li>
                    <li>• Vulnerable occupants who may not respond quickly</li>
                    <li>• Higher probability of electrical misuse</li>
                    <li>• Enhanced life safety requirements</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40 mb-4">
                    <h4 className="text-yellow-400 font-semibold text-lg mb-2">Premises with Valuable Content</h4>
                    <p className="text-xs">Museums, art galleries, historic buildings, archives</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li>• Irreplaceable cultural heritage at risk</li>
                    <li>• High economic value of contents</li>
                    <li>• Historical significance requiring preservation</li>
                    <li>• Insurance and regulatory requirements</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <div className="bg-green-600/20 p-3 rounded border border-green-600/40 mb-4">
                    <h4 className="text-green-400 font-semibold text-lg mb-2">Wooden/Combustible Structures</h4>
                    <p className="text-xs">Timber frame buildings, wooden structures, thatched properties</p>
                  </div>
                  <ul className="text-sm space-y-2">
                    <li>• Rapid fire spread characteristics</li>
                    <li>• Limited escape time for occupants</li>
                    <li>• Construction materials highly combustible</li>
                    <li>• Fire suppression challenges</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Installation Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Circuit Selection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Final circuits in high-risk areas</li>
                      <li>• Circuits supplying bedrooms and escape routes</li>
                      <li>• Areas with high fire load or risk</li>
                      <li>• Circuits in concealed spaces</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Cost-Benefit Analysis:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Risk assessment approach recommended</li>
                      <li>• Consider consequences of fire</li>
                      <li>• Insurance implications and requirements</li>
                      <li>• Life safety versus property protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amendment 3 Updates - AFDD for Modern Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-green-500" />
                Amendment 3: AFDDs for Energy Storage and EV Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Enhanced AFDD Requirements</h4>
                <p className="text-sm mb-3">
                  Amendment 3 extends AFDD applications to energy storage systems, EV charging infrastructure, and renewable energy installations where arc fault risks are elevated due to DC circuits and high-power switching.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold text-lg mb-3">Energy Storage Protection</h4>
                  <ul className="text-sm space-y-2">
                    <li>• AFDDs recommended for battery storage systems</li>
                    <li>• DC arc fault detection capabilities</li>
                    <li>• Integration with battery management systems</li>
                    <li>• Enhanced fire prevention in energy storage areas</li>
                    <li>• Coordination with thermal protection systems</li>
                    <li>• Remote monitoring and diagnostics</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">EV Charging Infrastructure</h4>
                  <ul className="text-sm space-y-2">
                    <li>• AFDD protection for high-power charging circuits</li>
                    <li>• DC fault detection in charging cables</li>
                    <li>• Protection against connector arcing</li>
                    <li>• Integration with smart charging systems</li>
                    <li>• Enhanced safety for public charging points</li>
                    <li>• Coordination with ground fault protection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-orange-400 font-semibold mb-3">Bidirectional System Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Power Flow Challenges:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Detection in both power flow directions</li>
                      <li>• Variable load and generation patterns</li>
                      <li>• Harmonic distortion effects on detection</li>
                      <li>• Inverter switching characteristics</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">System Integration:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Coordination with renewable energy systems</li>
                      <li>• Grid-tie inverter protection</li>
                      <li>• Microgrid arc fault management</li>
                      <li>• Smart grid communication protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced AFDD Technologies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-6 w-6 text-cyan-500" />
                Advanced AFDD Technologies and Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-cyan-600/10 p-4 rounded-lg border border-cyan-600/30">
                <h4 className="text-white font-semibold mb-3">Next-Generation AFDD Features</h4>
                <p className="text-sm mb-3">
                  Modern AFDDs incorporate advanced algorithms, IoT connectivity, and predictive maintenance capabilities to enhance fire prevention and system reliability.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-semibold text-lg mb-3">Smart Detection</h4>
                  <ul className="text-sm space-y-2">
                    <li>• AI-enhanced arc recognition</li>
                    <li>• Machine learning algorithms</li>
                    <li>• Adaptive sensitivity settings</li>
                    <li>• False trip reduction technology</li>
                    <li>• Load-specific calibration</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold text-lg mb-3">IoT Integration</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Remote monitoring capabilities</li>
                    <li>• Cloud-based diagnostics</li>
                    <li>• Mobile app notifications</li>
                    <li>• Historical event logging</li>
                    <li>• Predictive maintenance alerts</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-indigo-400 font-semibold text-lg mb-3">System Coordination</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Integration with building management</li>
                    <li>• Fire alarm system coordination</li>
                    <li>• Emergency lighting integration</li>
                    <li>• HVAC system shutdown protocols</li>
                    <li>• Security system interfacing</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <h4 className="text-red-400 font-semibold">Installation Best Practices</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Testing Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Functional testing after installation</li>
                      <li>• Periodic testing schedules</li>
                      <li>• Arc injection testing methods</li>
                      <li>• Documentation and certification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Maintenance Protocols:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Regular visual inspections</li>
                      <li>• Firmware update procedures</li>
                      <li>• Sensitivity calibration checks</li>
                      <li>• Replacement scheduling guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge: AFDDs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white">
                Test your understanding of Arc Fault Detection Devices.
              </p>

              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="AFDD Technology and Applications"
                description="Test your knowledge of BS 7671 arc fault detection requirements"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-4-section-5">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Back to Module 4
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module4Section6;