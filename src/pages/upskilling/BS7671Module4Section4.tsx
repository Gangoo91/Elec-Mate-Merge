import { ArrowLeft, ArrowRight, CircuitBoard, CheckCircle, AlertTriangle, Target, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section4 = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What current level typically triggers a 30 mA RCD?",
      options: [
        "30 mA or above",
        "Less than 30 mA",
        "Exactly 30 mA",
        "Between 15-30 mA"
      ],
      correct: 0,
      explanation: "A 30 mA RCD will trip when the residual current reaches 30 mA or above, providing protection against earth leakage currents that could cause electric shock."
    },
    {
      id: 2,
      question: "Which RCD type is suitable for appliances with pulsed DC leakage?",
      options: [
        "Type AC",
        "Type A",
        "Type F",
        "Type S"
      ],
      correct: 1,
      explanation: "Type A RCDs can detect both AC and pulsating DC residual currents, making them suitable for modern appliances that may produce pulsed DC leakage currents."
    },
    {
      id: 3,
      question: "Where are RCDs required under the 18th Edition?",
      options: [
        "Only in bathrooms",
        "All socket outlets ≤ 32A, circuits in special locations, and generally all final circuits in new domestic installations",
        "Only outdoor circuits",
        "Only TT systems"
      ],
      correct: 1,
      explanation: "The 18th Edition requires RCD protection for socket outlets ≤ 32A, circuits in special locations like bathrooms, and generally all final circuits in new domestic installations."
    },
    {
      id: 4,
      question: "What does an S-type RCD do?",
      options: [
        "Provides surge protection",
        "Has a short time delay to provide selectivity with downstream RCDs",
        "Only works with single-phase supplies",
        "Provides additional earth leakage protection"
      ],
      correct: 1,
      explanation: "S-type (selective) RCDs have a built-in time delay to provide discrimination with downstream RCDs, preventing unnecessary tripping of upstream devices when only a local fault occurs."
    },
    {
      id: 5,
      question: "What's the purpose of the test button on an RCD?",
      options: [
        "To reset the RCD after it trips",
        "To create an artificial earth leakage to verify the RCD trips correctly",
        "To measure the trip current",
        "To check the supply voltage"
      ],
      correct: 1,
      explanation: "The test button creates an artificial earth leakage current that should cause the RCD to trip, providing a simple functional test to verify the device is working correctly."
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
              <CircuitBoard className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Residual Current Devices (RCDs)
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Use and Placement for Maximum Safety
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.4
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
                Residual Current Devices (RCDs) are life-saving devices designed to detect earth leakage currents and automatically disconnect the power supply. Unlike traditional overcurrent devices that require high fault currents to operate, RCDs can detect very small leakage currents that could be dangerous to humans.
              </p>
              <p className="text-base leading-relaxed">
                This section explores the correct use, types, and placement of RCDs in modern electrical installations, ensuring compliance with BS 7671 requirements and maximum protection for users.
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
                  <span className="text-sm">Understand the types and sensitivity of RCDs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify when and where RCDs are required under BS 7671</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Learn how RCDs complement other protective devices</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Recognise limitations and special installation considerations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What is an RCD */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                What is an RCD?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Operating Principle</h4>
                <p className="text-sm mb-3">
                  RCDs continuously monitor the balance between live conductors (line and neutral in single-phase, or all lines in three-phase systems). When an earth fault occurs, some current flows to earth rather than returning through the neutral, creating an imbalance.
                </p>
                <p className="text-sm">
                  When this imbalance reaches the device's rated sensitivity (typically 30mA), the RCD trips and disconnects the supply, providing protection against electric shock and reducing fire risk.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">How RCDs Work</h4>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">1.</span>
                      <span><strong>Current Monitoring:</strong> Toroidal transformer monitors current flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">2.</span>
                      <span><strong>Balance Detection:</strong> Compares outgoing and returning currents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">3.</span>
                      <span><strong>Imbalance Sensing:</strong> Detects earth leakage current</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">4.</span>
                      <span><strong>Trip Mechanism:</strong> Activates when threshold exceeded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">5.</span>
                      <span><strong>Contact Opening:</strong> Disconnects supply within milliseconds</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Protection Benefits</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Electric Shock Protection:</strong> Rapid disconnection limits shock duration</li>
                    <li>• <strong>Fire Prevention:</strong> Detects arc faults and insulation breakdown</li>
                    <li>• <strong>Equipment Protection:</strong> Prevents damage from earth faults</li>
                    <li>• <strong>Fast Response:</strong> Typically trips in 10-40 milliseconds</li>
                    <li>• <strong>High Sensitivity:</strong> Detects currents as low as 6mA</li>
                    <li>• <strong>Additional Protection:</strong> Works alongside other safety measures</li>
                  </ul>
                  
                  <div className="mt-3 p-2 bg-green-600/20 rounded border border-green-600/40">
                    <p className="text-xs text-green-400">
                      <strong>Key Point:</strong> RCDs provide additional protection - they don't replace other safety measures
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of RCDs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CircuitBoard className="h-6 w-6 text-green-500" />
                Types of RCDs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Understanding RCD Classifications</h4>
                <p className="text-sm">
                  Different RCD types are designed to detect different waveforms of residual current. Modern appliances often produce complex leakage currents that older RCD types cannot detect effectively.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Standard RCD Types</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <h5 className="text-yellow-400 font-semibold text-sm mb-2">Type AC</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Detection:</strong> Standard AC residual currents only</li>
                        <li>• <strong>Applications:</strong> Basic installations, older equipment</li>  
                        <li>• <strong>Limitations:</strong> Cannot detect DC components</li>
                        <li>• <strong>Status:</strong> Being phased out in many applications</li>
                      </ul>
                    </div>

                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <h5 className="text-green-400 font-semibold text-sm mb-2">Type A</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Detection:</strong> AC and pulsating DC residual currents</li>
                        <li>• <strong>Applications:</strong> Modern appliances, IT equipment</li>
                        <li>• <strong>Requirements:</strong> Mandatory for many applications</li>
                        <li>• <strong>Benefits:</strong> Better protection with modern equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Advanced RCD Types</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <h5 className="text-purple-400 font-semibold text-sm mb-2">Type F</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Detection:</strong> Up to 1kHz residual currents</li>
                        <li>• <strong>Applications:</strong> Variable speed drives, LED lighting</li>
                        <li>• <strong>Benefits:</strong> Reduced nuisance tripping</li>
                        <li>• <strong>Use:</strong> Industrial and commercial installations</li>
                      </ul>
                    </div>

                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <h5 className="text-orange-400 font-semibold text-sm mb-2">Type B</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Detection:</strong> All residual current types up to 20kHz</li>
                        <li>• <strong>Applications:</strong> EV charging, PV inverters</li>
                        <li>• <strong>DC Protection:</strong> Detects smooth DC residual currents</li>
                        <li>• <strong>Cost:</strong> Most expensive but most comprehensive</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Selection Guidance</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Domestic Installations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Type A minimum for most circuits</li>
                      <li>• Type AC acceptable for older installations</li>
                      <li>• Consider Type F for LED lighting</li>
                      <li>• Type B for EV charging points</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Commercial/Industrial:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Type A standard requirement</li>
                      <li>• Type F for VSD and electronic equipment</li>
                      <li>• Type B for special applications</li>
                      <li>• Consider selectivity requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Special Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Medical locations: Type B often required</li>
                      <li>• Data centres: Type F minimum</li>
                      <li>• Solar installations: Type B mandatory</li>
                      <li>• Swimming pools: Enhanced protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-orange-500" />
                Regulatory Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">BS 7671 18th Edition Requirements</h4>
                <p className="text-sm">
                  The 18th Edition significantly expanded RCD requirements, making them mandatory for most final circuits in new installations and many existing installation modifications.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Mandatory RCD Protection</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Socket Outlets ≤ 32A:</p>
                      <ul className="text-xs space-y-1">
                        <li>• All socket outlets rated 32A or less</li>
                        <li>• Unless documented risk assessment justifies otherwise</li>
                        <li>• Applies to domestic, commercial, and industrial</li>
                        <li>• 30mA sensitivity required</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Special Locations:</p>
                      <ul className="text-xs space-y-1">
                        <li>• All circuits in bathrooms (except SELV)</li>
                        <li>• Outdoor installations and equipment</li>
                        <li>• Swimming pools and surrounding areas</li>
                        <li>• Construction sites and temporary installations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">New Domestic Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">All Final Circuits:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Socket outlet circuits</li>
                        <li>• Lighting circuits</li>
                        <li>• Dedicated appliance circuits</li>
                        <li>• Immersion heater circuits</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Exceptions:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Fire alarm systems (where specified)</li>
                        <li>• Emergency lighting (where specified)</li>
                        <li>• SELV circuits under 25V AC</li>
                        <li>• Specific risk-assessed installations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">System-Specific Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">TT Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• RCD protection essential for all circuits</li>
                      <li>• High earth electrode resistance</li>
                      <li>• Cannot achieve fast disconnection otherwise</li>
                      <li>• Usually 100mA for fire protection</li>
                      <li>• 30mA for shock protection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">TN Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• RCD provides additional protection</li>
                      <li>• Required for specific circuits/locations</li>
                      <li>• Improves safety beyond ADS</li>
                      <li>• Helps with high impedance faults</li>
                      <li>• Fire protection benefit</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">IT Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• First fault monitoring preferred</li>
                      <li>• RCDs may be used for specific circuits</li>
                      <li>• Consider system earthing philosophy</li>
                      <li>• Maintain IT system benefits</li>
                      <li>• Special coordination required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selectivity and Discrimination */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-500" />
                Selectivity and Discrimination
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Preventing Unwanted Trips</h4>
                <p className="text-sm">
                  In installations with multiple RCDs, proper selectivity ensures that only the RCD closest to the fault trips, maintaining power to unaffected circuits and improving installation availability.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Time-Delayed RCDs (S-Type)</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Built-in Delay:</strong> Typically 130-500ms delay before tripping</li>
                    <li>• <strong>Upstream Protection:</strong> Used as main incomer RCDs</li>
                    <li>• <strong>Coordination:</strong> Allows downstream RCDs to trip first</li>
                    <li>• <strong>Selectivity:</strong> Prevents loss of entire installation</li>
                    <li>• <strong>Applications:</strong> Distribution boards, main switch positions</li>
                  </ul>
                  
                  <div className="mt-3 p-2 bg-purple-600/20 rounded border border-purple-600/40">
                    <p className="text-xs text-purple-400">
                      <strong>Note:</strong> S-type RCDs still provide shock protection but with slight delay
                    </p>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Current Discrimination</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Different Sensitivities:</strong> Use 100mA upstream, 30mA downstream</li>
                    <li>• <strong>Limited Effectiveness:</strong> Only works for faults between thresholds</li>
                    <li>• <strong>Fire Protection:</strong> 100mA RCDs provide fire protection</li>
                    <li>• <strong>Shock Protection:</strong> 30mA RCDs for personal protection</li>
                    <li>• <strong>Coordination Issues:</strong> Both may trip on large faults</li>
                  </ul>
                  
                  <div className="mt-3 p-2 bg-orange-600/20 rounded border border-orange-600/40">
                    <p className="text-xs text-orange-400">
                      <strong>Warning:</strong> Current discrimination alone is not reliable for selectivity
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Design Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Installation Layout:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Use RCBOs for individual circuit protection</li>
                      <li>• Consider split-load consumer units</li>
                      <li>• Minimize shared neutral arrangements</li>
                      <li>• Plan for maintenance and testing</li>
                      <li>• Consider load diversity and usage patterns</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Nuisance Tripping Prevention:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Separate high-leakage equipment</li>
                      <li>• Use appropriate RCD types for loads</li>
                      <li>• Consider cumulative earth leakage</li>
                      <li>• Implement proper cable installation</li>
                      <li>• Regular testing and maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Testing and Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-white font-semibold mb-3">Essential Testing Requirements</h4>
                <p className="text-sm">
                  Regular testing ensures RCDs continue to provide protection throughout their service life. Both functional and comprehensive testing are required at different intervals.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Functional Testing</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Test Button Operation:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Creates artificial earth leakage current</li>
                        <li>• Should cause RCD to trip immediately</li>
                        <li>• Simple test for basic functionality</li>
                        <li>• Recommended monthly by users</li>
                        <li>• Reset and verify normal operation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">User Instructions:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Press test button quarterly</li>
                        <li>• RCD should click and switch off</li>
                        <li>• Reset the RCD after testing</li>
                        <li>• If no trip occurs, call electrician</li>
                        <li>• Record test dates for reference</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Professional Testing</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Calibrated RCD Tester:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Measures actual trip current</li>
                        <li>• Records trip time at various currents</li>
                        <li>• Tests at 50%, 100%, and 500% of IΔn</li>
                        <li>• Verifies compliance with standards</li>
                        <li>• Identifies deteriorating performance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Test Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Initial verification after installation</li>
                        <li>• Periodic inspection and testing</li>
                        <li>• After any modifications or faults</li>
                        <li>• Document all test results</li>
                        <li>• Compare with previous test data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Test Standards and Limits</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Trip Current:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Should not trip at 50% of IΔn</li>
                      <li>• Must trip at 100% of IΔn</li>
                      <li>• Typical range: 50-100% of rated current</li>
                      <li>• For 30mA RCD: trip between 15-30mA</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Trip Time:</p>
                    <ul className="text-xs space-y-1">
                      <li>• At IΔn: ≤ 300ms (general use)</li>
                      <li>• At 5×IΔn: ≤ 40ms</li>
                      <li>• S-type: Additional time delay</li>
                      <li>• Type A/F/B: May have longer times</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Test Frequencies:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Domestic: User monthly, professional every 10 years</li>
                      <li>• Commercial: Professional every 5 years</li>
                      <li>• Industrial: Professional every 1 year</li>
                      <li>• Special locations: More frequent</li>
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
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Kitchen Rewiring with RCD Protection</h4>
                <p className="text-sm mb-3">
                  An electrician is rewiring a domestic kitchen as part of a larger renovation project. The new installation must comply with the 18th Edition requirements for RCD protection.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white mb-2">
                    <strong>Design Solution:</strong> The electrician installs individual RCBOs (combined MCB + RCD) for each final circuit, providing both overload protection and 30mA RCD protection.
                  </p>
                  <p className="text-xs text-white mb-2">
                    <strong>Circuits Protected:</strong> Ring final circuit for sockets, radial circuit for dishwasher, dedicated circuit for electric oven, under-cabinet lighting circuit.
                  </p>
                  <p className="text-xs text-white">
                    <strong>Benefits:</strong> Each circuit has independent protection, fault on one circuit won't affect others, easier fault finding, compliance with current standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amendment 3 RCD Updates */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-cyan-500" />
                Amendment 3 RCD Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-cyan-600/10 p-4 rounded-lg border border-cyan-600/30">
                <h4 className="text-white font-semibold mb-3">Enhanced RCD Requirements</h4>
                <p className="text-sm">
                  Amendment 3 significantly enhanced RCD requirements, introducing new applications, improved selectivity requirements, and additional protection for modern electrical systems.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">EV Charging RCD Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Type B RCD Mandatory:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Detects AC, pulsating DC, and smooth DC</li>
                        <li>• 6 mA DC fault detection capability</li>
                        <li>• Frequency response up to 1 kHz minimum</li>
                        <li>• Must not nuisance trip on normal DC leakage</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Smart Charging Integration:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Remote monitoring and control</li>
                        <li>• Communication with charge management</li>
                        <li>• Load balancing coordination</li>
                        <li>• Fault logging and diagnostics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Energy Storage RCD Protection</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm mb-2">DC-Coupled Systems:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Type B RCD for inverter AC output</li>
                        <li>• DC residual current monitoring</li>
                        <li>• Insulation monitoring systems</li>
                        <li>• Emergency shutdown coordination</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">AC-Coupled Systems:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Enhanced Type A protection minimum</li>
                        <li>• Harmonic-tolerant RCD types</li>
                        <li>• Grid-interactive protection</li>
                        <li>• Anti-islanding coordination</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Smart Device RCD Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">IoT Device Protection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Type F RCD for switch-mode supplies</li>
                      <li>• Enhanced EMC immunity</li>
                      <li>• Network communication isolation</li>
                      <li>• Surge coordination with RCDs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Heat Pump Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Variable frequency drive compatibility</li>
                      <li>• Type F minimum requirement</li>
                      <li>• Defrost cycle considerations</li>
                      <li>• Refrigerant leak detection coordination</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">LED Lighting Systems:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Driver circuit leakage management</li>
                      <li>• Dimming system compatibility</li>
                      <li>• Emergency lighting coordination</li>
                      <li>• Smart lighting network protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arc Fault Detection Interrupters (AFDDs) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-red-500" />
                Arc Fault Detection Interrupters (AFDDs)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Fire Prevention Through Arc Detection</h4>
                <p className="text-sm">
                  AFDDs represent a significant advancement in electrical fire prevention, detecting dangerous arcing conditions that traditional protective devices cannot identify.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">AFDD Requirements</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Mandatory Applications:</strong> Sleeping accommodation in new builds</li>
                    <li>• <strong>High-Risk Environments:</strong> Where consequences of fire are severe</li>
                    <li>• <strong>Historic Buildings:</strong> Where escape routes are limited</li>
                    <li>• <strong>Detection Capability:</strong> Series and parallel arc faults</li>
                    <li>• <strong>Nuisance Trip Immunity:</strong> Distinguish between dangerous and normal arcs</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">AFDD + RCD Coordination</h4>
                  <ul className="text-sm space-y-2">
                    <li>• <strong>Combined Protection:</strong> RCBO with integrated AFDD</li>
                    <li>• <strong>Selectivity:</strong> Proper discrimination between devices</li>
                    <li>• <strong>Testing Coordination:</strong> Test both functions regularly</li>
                    <li>• <strong>Installation Considerations:</strong> Manufacturer compatibility</li>
                    <li>• <strong>Maintenance:</strong> Enhanced testing requirements</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Implementation Guidelines</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Circuit Selection:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Final circuits serving bedrooms</li>
                      <li>• Circuits with flexible cables and extensions</li>
                      <li>• Areas with portable electrical equipment</li>
                      <li>• Circuits in concealed locations</li>
                      <li>• Risk assessment-based selection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Testing and Maintenance:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Monthly test button operation</li>
                      <li>• Annual professional testing</li>
                      <li>• Arc signature database updates</li>
                      <li>• Performance degradation monitoring</li>
                      <li>• Integration with building management</li>
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
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                RCDs are a vital part of modern electrical protection systems. Understanding their function, types, and correct application is essential for ensuring compliance with BS 7671 and protecting life and property from electrical hazards.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• RCDs detect earth leakage currents and provide rapid disconnection</li>
                  <li>• Type A RCDs are now standard for most applications</li>
                  <li>• Type B RCDs mandatory for EV charging and energy storage</li>
                  <li>• 18th Edition requires RCD protection for most final circuits</li>
                  <li>• Amendment 3 introduces enhanced requirements for modern systems</li>
                  <li>• AFDDs provide additional fire protection through arc detection</li>
                  <li>• Proper selectivity prevents unnecessary loss of supply</li>
                  <li>• Regular testing ensures continued protection</li>
                  <li>• RCDs complement but don't replace other protective measures</li>
                  <li>• Correct type selection is crucial for reliable operation</li>
                  <li>• Smart device integration requires careful RCD selection</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of RCD types, applications, and requirements."
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-4-section-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module 4
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module4Section4;