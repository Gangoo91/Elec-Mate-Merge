import { ArrowLeft, ArrowRight, Settings, CheckCircle, AlertTriangle, Target, Lightbulb, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module5Section1 = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What does IP65 indicate in equipment specification?",
      options: [
        "Dust tight, protection against water jets from any direction",
        "Limited dust ingress, protection against dripping water",
        "Complete dust protection, protection against immersion",
        "No dust protection, protection against splashing water"
      ],
      correct: 0,
      explanation: "IP65 means the equipment is dust-tight (6) and protected against water jets from any direction (5), making it suitable for harsh industrial environments."
    },
    {
      id: 2,
      question: "Why must temperature ratings be considered in equipment selection?",
      options: [
        "To comply with colour coding requirements",
        "To ensure equipment operates safely within its thermal limits and doesn't degrade prematurely",
        "To determine the correct voltage rating",
        "To calculate the installation cost"
      ],
      correct: 1,
      explanation: "Temperature ratings ensure equipment operates safely within thermal limits, preventing overheating, insulation breakdown, and premature failure."
    },
    {
      id: 3,
      question: "Which regulation in BS 7671 covers equipment suitability?",
      options: [
        "Part 3 - Assessment of general characteristics",
        "Part 5 - Selection and erection of equipment",
        "Part 4 - Protection for safety",
        "Part 6 - Inspection and testing"
      ],
      correct: 1,
      explanation: "Part 5 of BS 7671 covers the selection and erection of equipment, including requirements for suitability, ratings, and environmental considerations."
    },
    {
      id: 4,
      question: "What could happen if switchgear is under-rated for the current load?",
      options: [
        "Improved efficiency",
        "Overheating, contact welding, fire risk, and potential system failure",
        "Reduced maintenance requirements",
        "Better power factor correction"
      ],
      correct: 1,
      explanation: "Under-rated switchgear can overheat, leading to contact welding, arcing, fire risk, and catastrophic system failure due to inability to handle the current safely."
    },
    {
      id: 5,
      question: "What is the role of manufacturer instructions in equipment installation?",
      options: [
        "They are optional guidance only",
        "They provide legal compliance requirements and specific installation parameters for safe operation",
        "They only apply to warranty coverage",
        "They are only needed for complex equipment"
      ],
      correct: 1,
      explanation: "Manufacturer instructions provide essential legal compliance requirements and specific installation parameters necessary for safe, reliable operation and regulatory compliance."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Equipment Ratings and Suitability for Purpose
                </h1>
                <p className="text-white">
                  Ensuring appropriate equipment selection for safety and performance
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5.1
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
                When selecting electrical equipment, it's critical to ensure that it is appropriately rated for the environment, system characteristics, and specific tasks. Poor selection can compromise safety and system performance.
              </p>
              <p className="text-base leading-relaxed">
                This section covers the fundamental principles of equipment rating and suitability assessment, ensuring compliance with BS 7671 requirements for safe and reliable installations.
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
                  <span className="text-sm">Understand the concept of equipment ratings</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify how suitability is determined by location and environmental factors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Ensure compliance with BS 7671 for equipment installation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Apply manufacturer requirements and compatibility considerations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voltage and Current Ratings */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Voltage and Current Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Fundamental Rating Requirements</h4>
                <p className="text-sm">
                  Equipment must be rated to match or exceed the supply conditions and operating parameters to ensure safe and reliable operation throughout its expected lifetime.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Voltage Considerations</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Nominal Voltage:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Equipment rating must meet or exceed system nominal voltage</li>
                        <li>• Consider voltage variations (±10% for LV systems)</li>
                        <li>• Account for voltage rise during light load conditions</li>
                        <li>• Ensure adequate safety margin</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Insulation Voltage:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Must withstand system voltage plus overvoltages</li>
                        <li>• Consider impulse withstand capability</li>
                        <li>• Lightning and switching surge protection</li>
                        <li>• Altitude effects on insulation strength</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Current Considerations</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Continuous Current:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Normal operating current capacity</li>
                        <li>• Consider load growth and future expansion</li>
                        <li>• Temperature effects on current carrying capacity</li>
                        <li>• Derating factors for installation conditions</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Short-Circuit Current:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Fault current withstand capability</li>
                        <li>• Breaking capacity for switching devices</li>
                        <li>• Making capacity for contactors and switches</li>
                        <li>• Coordination with upstream protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Rating Selection Process</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Step 1 - System Analysis:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Determine system voltage</li>
                      <li>• Calculate load currents</li>
                      <li>• Assess fault levels</li>
                      <li>• Consider future expansion</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Step 2 - Environmental Review:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Temperature conditions</li>
                      <li>• Altitude effects</li>
                      <li>• Humidity levels</li>
                      <li>• Contamination exposure</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Step 3 - Rating Calculation:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Apply derating factors</li>
                      <li>• Include safety margins</li>
                      <li>• Consider coordination requirements</li>
                      <li>• Verify fault current capability</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Step 4 - Verification:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Check manufacturer specifications</li>
                      <li>• Verify standard compliance</li>
                      <li>• Confirm installation requirements</li>
                      <li>• Document selection rationale</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Ratings */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-red-500" />
                Temperature Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-white font-semibold mb-3">Critical Temperature Considerations</h4>
                <p className="text-sm">
                  Temperature ratings ensure equipment operates safely within thermal limits and doesn't degrade prematurely. Both ambient and operating temperatures must be considered.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Ambient Temperature</h4>
                  <div className="space-y-2">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Standard Conditions:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Typical rating: -5°C to +40°C</li>
                        <li>• Some equipment: -25°C to +55°C</li>
                        <li>• Special applications may vary</li>
                        <li>• Consider seasonal variations</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Extreme Conditions:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Outdoor installations</li>
                        <li>• Industrial process areas</li>
                        <li>• Cold storage facilities</li>
                        <li>• Hot climates or solar exposure</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">Operating Temperature</h4>
                  <div className="space-y-2">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Internal Heat Generation:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Resistive losses in conductors</li>
                        <li>• Core losses in transformers</li>
                        <li>• Switching losses in electronics</li>
                        <li>• Mechanical friction in motors</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Heat Dissipation:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Convection cooling requirements</li>
                        <li>• Forced air cooling systems</li>
                        <li>• Heat sink design considerations</li>
                        <li>• Enclosure ventilation needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Insulation Classes</h4>
                  <div className="space-y-2">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Standard Classes:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Class A: 105°C continuous</li>
                        <li>• Class B: 130°C continuous</li>
                        <li>• Class F: 155°C continuous</li>
                        <li>• Class H: 180°C continuous</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Selection Criteria:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Expected operating temperature</li>
                        <li>• Safety margin requirements</li>
                        <li>• Life expectancy targets</li>
                        <li>• Maintenance accessibility</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IP Ratings */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Ingress Protection (IP) Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Understanding Dust and Water Protection</h4>
                <p className="text-sm">
                  IP ratings define the level of protection provided by equipment enclosures against solid objects (dust) and liquids (water). Proper selection prevents equipment damage and ensures safety.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">First Digit - Solid Object Protection</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-600/20 p-2 rounded border border-gray-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP0X:</span>
                      <span className="text-xs">No protection</span>
                    </div>
                    <div className="bg-red-600/20 p-2 rounded border border-red-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP1X:</span>
                      <span className="text-xs">{'>'}50mm objects</span>
                    </div>
                    <div className="bg-orange-600/20 p-2 rounded border border-orange-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP2X:</span>
                      <span className="text-xs">{'>'}12.5mm objects</span>
                    </div>
                    <div className="bg-yellow-600/20 p-2 rounded border border-yellow-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP3X:</span>
                      <span className="text-xs">{'>'}2.5mm objects</span>
                    </div>
                    <div className="bg-green-600/20 p-2 rounded border border-green-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP4X:</span>
                      <span className="text-xs">{'>'}1mm objects</span>
                    </div>
                    <div className="bg-yellow-400/20 p-2 rounded border border-blue-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP5X:</span>
                      <span className="text-xs">Dust protected</span>
                    </div>
                    <div className="bg-purple-600/20 p-2 rounded border border-purple-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IP6X:</span>
                      <span className="text-xs">Dust tight</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Second Digit - Liquid Protection</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-600/20 p-2 rounded border border-gray-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX0:</span>
                      <span className="text-xs">No protection</span>
                    </div>
                    <div className="bg-red-600/20 p-2 rounded border border-red-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX1:</span>
                      <span className="text-xs">Dripping water</span>
                    </div>
                    <div className="bg-orange-600/20 p-2 rounded border border-orange-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX2:</span>
                      <span className="text-xs">15° tilted dripping</span>
                    </div>
                    <div className="bg-yellow-600/20 p-2 rounded border border-yellow-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX3:</span>
                      <span className="text-xs">Spraying water</span>
                    </div>
                    <div className="bg-green-600/20 p-2 rounded border border-green-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX4:</span>
                      <span className="text-xs">Splashing water</span>
                    </div>
                    <div className="bg-yellow-400/20 p-2 rounded border border-blue-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX5:</span>
                      <span className="text-xs">Water jets</span>
                    </div>
                    <div className="bg-purple-600/20 p-2 rounded border border-purple-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX6:</span>
                      <span className="text-xs">Powerful water jets</span>
                    </div>
                    <div className="bg-indigo-600/20 p-2 rounded border border-indigo-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX7:</span>
                      <span className="text-xs">Temporary immersion</span>
                    </div>
                    <div className="bg-pink-600/20 p-2 rounded border border-pink-600/40 flex justify-between">
                      <span className="text-white font-semibold text-sm">IPX8:</span>
                      <span className="text-xs">Continuous immersion</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Common Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Indoor Dry Locations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• IP20 - Basic finger protection</li>
                      <li>• IP30 - Tool protection</li>
                      <li>• Suitable for offices, homes</li>
                      <li>• Standard consumer units</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Outdoor/Wet Areas:</p>
                    <ul className="text-xs space-y-1">
                      <li>• IP44 - Bathroom zones</li>
                      <li>• IP65 - Outdoor installations</li>
                      <li>• IP67 - Underground applications</li>
                      <li>• Swimming pool equipment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Industrial Environments:</p>
                    <ul className="text-xs space-y-1">
                      <li>• IP54 - Dusty conditions</li>
                      <li>• IP65 - Washdown areas</li>
                      <li>• IP66 - Marine environments</li>
                      <li>• IP68 - Submersible applications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Exposure */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Environmental Exposure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Comprehensive Environmental Assessment</h4>
                <p className="text-sm">
                  Equipment must be suitable for the environmental conditions it will encounter throughout its operational life, including heat, moisture, corrosion, and mechanical stress.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Physical Environmental Factors</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Temperature & Humidity:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Ambient temperature ranges</li>
                        <li>• Humidity levels and condensation risk</li>
                        <li>• Thermal cycling effects</li>
                        <li>• Solar radiation exposure</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Mechanical Stress:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Vibration from machinery</li>
                        <li>• Impact from handling/transport</li>
                        <li>• Seismic considerations</li>
                        <li>• Wind loading for outdoor equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Chemical Environmental Factors</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Corrosive Agents:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Salt spray in coastal areas</li>
                        <li>• Industrial chemical exposure</li>
                        <li>• Acid rain effects</li>
                        <li>• Cleaning agent compatibility</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-purple-400 font-semibold text-sm mb-2">Contamination:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Dust and particulate matter</li>
                        <li>• Oil and grease exposure</li>
                        <li>• Biological contamination</li>
                        <li>• Explosive atmosphere classification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Material Selection Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Metallic Components:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Stainless steel grades</li>
                      <li>• Aluminium alloy selection</li>
                      <li>• Galvanised steel coating</li>
                      <li>• Copper and brass considerations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Polymeric Materials:</p>
                    <ul className="text-xs space-y-1">
                      <li>• UV-resistant plastics</li>
                      <li>• Chemical-resistant compounds</li>
                      <li>• Temperature-stable polymers</li>
                      <li>• Fire-retardant materials</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Protective Coatings:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Paint systems for outdoor use</li>
                      <li>• Powder coating durability</li>
                      <li>• Anodising for aluminium</li>
                      <li>• Zinc-rich primer systems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Gaskets and Seals:</p>
                    <ul className="text-xs space-y-1">
                      <li>• EPDM rubber compatibility</li>
                      <li>• Silicone seal durability</li>
                      <li>• Neoprene chemical resistance</li>
                      <li>• Viton high-temperature rating</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manufacturer Instructions and Compatibility */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-500" />
                Manufacturer Instructions and Compatibility
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Critical Documentation and System Integration</h4>
                <p className="text-sm">
                  Manufacturer instructions provide essential legal compliance requirements, while system compatibility ensures reliable operation across all connected components.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Manufacturer Documentation</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Installation Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Mounting orientations and clearances</li>
                        <li>• Environmental condition limits</li>
                        <li>• Connection torque specifications</li>
                        <li>• Earthing and bonding requirements</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Operational Parameters:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Setting and adjustment procedures</li>
                        <li>• Performance characteristics</li>
                        <li>• Coordination with other equipment</li>
                        <li>• Maintenance schedules and procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">System Compatibility</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Electrical Compatibility:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Voltage and frequency matching</li>
                        <li>• Current ratings and characteristics</li>
                        <li>• Power factor considerations</li>
                        <li>• Harmonic distortion effects</li>
                      </ul>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Physical Compatibility:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Dimensional fit and clearances</li>
                        <li>• Mounting method compatibility</li>
                        <li>• Cable entry arrangements</li>
                        <li>• Heat dissipation requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Legal and Compliance Aspects</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Regulatory Compliance:</p>
                    <ul className="text-xs space-y-1">
                      <li>• BS 7671 compliance requirements</li>
                      <li>• Product standard conformity</li>
                      <li>• CE marking and declarations</li>
                      <li>• UKCA marking requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Warranty and Liability:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Installation compliance for warranty</li>
                      <li>• Liability implications of non-compliance</li>
                      <li>• Insurance requirements</li>
                      <li>• Professional indemnity considerations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Documentation Requirements:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Installation certificates</li>
                      <li>• Commissioning records</li>
                      <li>• Operation and maintenance manuals</li>
                      <li>• As-built drawings and schedules</li>
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
                <h4 className="text-white font-semibold mb-3">Warehouse Socket Outlet Installation</h4>
                <p className="text-sm mb-3">
                  You're tasked with installing socket outlets in a warehouse. The environment is damp and may be exposed to occasional water spray from cleaning operations. You must select equipment with appropriate IP rating and confirm the suitability of breakers in the distribution board for connected loads.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white mb-2">
                    <strong>Environmental Assessment:</strong> Damp conditions with occasional water spray requires minimum IP44 rating, but IP65 recommended for cleaning operations.
                  </p>
                  <p className="text-xs text-white mb-2">
                    <strong>Equipment Selection:</strong> Industrial socket outlets with IP65 rating, corrosion-resistant materials, and appropriate current ratings for expected loads.
                  </p>
                  <p className="text-xs text-white mb-2">
                    <strong>Distribution Board:</strong> Verify MCB ratings match socket outlet ratings, confirm fault current capability, and ensure coordination with upstream protection.
                  </p>
                  <p className="text-xs text-white">
                    <strong>Outcome:</strong> Safe, reliable installation suitable for industrial environment with extended service life and minimal maintenance requirements.
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
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Correctly rated equipment ensures performance, safety, and longevity. Always check voltage, current, environmental suitability, and refer to manufacturer guidelines for compliant installations.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Equipment ratings must match or exceed system requirements with appropriate safety margins</li>
                  <li>• Temperature considerations include both ambient conditions and internal heat generation</li>
                  <li>• IP ratings provide protection against solid objects and liquids based on environmental exposure</li>
                  <li>• Environmental factors include temperature, humidity, corrosion, contamination, and mechanical stress</li>
                  <li>• Manufacturer instructions are legally required and provide essential installation parameters</li>
                  <li>• System compatibility ensures reliable operation across all connected components</li>
                  <li>• Proper selection reduces maintenance, extends equipment life, and ensures safety</li>
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
              <p className="text-white">
                Test your understanding of equipment ratings and suitability.
              </p>
              
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Equipment Ratings Quiz"
                description="Test your knowledge of equipment ratings and suitability requirements"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-5">
              <Button variant="outline" className="border-white text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 5
              </Button>
            </Link>
            <Link to="../bs7671-module-5-section-2">
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

export default BS7671Module5Section1;