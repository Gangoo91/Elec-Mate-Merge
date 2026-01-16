import { ArrowLeft, Building, Shield, Wind, Wrench, Mountain, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section4Questions } from '@/data/upskilling/renewableEnergyModule2QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule2Section4 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section4Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Mounting Systems and Structural Considerations
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding roof and ground mounting systems with structural analysis and engineering requirements
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Mounting Systems
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand roof vs ground mount advantages and disadvantages
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Consider wind, snow, and uplift forces in structural design
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Select proper anchoring methods and materials for different applications
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Whether on a roof or ground, your panels need a solid foundation. This section explores structural choices and engineering basics for safe, reliable solar installations. Bad mounting equals system failure — structural soundness is non-negotiable in solar design.
              </p>
            </CardContent>
          </Card>

          {/* Roof Mount Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-yellow-400" />
                Roof Mounting Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Roof-mounted systems are the most common solar installation type, requiring careful consideration of roof structure, waterproofing, and load distribution.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Penetrative Mounting:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Method:</strong> Bolts/screws penetrate roof membrane</li>
                    <li>• <strong>Advantages:</strong> Strong attachment, lower weight, cost-effective</li>
                    <li>• <strong>Materials:</strong> Stainless steel bolts, EPDM flashing</li>
                    <li>• <strong>Waterproofing:</strong> Critical - use proper sealants and flashing</li>
                    <li>• <strong>Roof types:</strong> Suitable for pitched roofs, metal roofing</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Ballasted Mounting:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Method:</strong> Weight holds system in place</li>
                    <li>• <strong>Advantages:</strong> No roof penetrations, reversible</li>
                    <li>• <strong>Weight:</strong> 15-25 kg/m² additional roof loading</li>
                    <li>• <strong>Wind resistance:</strong> Requires careful aerodynamic design</li>
                    <li>• <strong>Roof types:</strong> Ideal for flat roofs with adequate capacity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Roof Type Considerations:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-white p-2">Roof Type</th>
                        <th className="text-left text-white p-2">Mounting Method</th>
                        <th className="text-left text-white p-2">Key Considerations</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Concrete Tile</td>
                        <td className="p-2">Penetrative with tile hooks</td>
                        <td className="p-2">Locate rafters, avoid tile damage</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Clay Tile</td>
                        <td className="p-2">Tile replacement or drilling</td>
                        <td className="p-2">Fragile tiles, specialist fixings</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Metal/Standing Seam</td>
                        <td className="p-2">Clamp-on systems</td>
                        <td className="p-2">No penetrations, seam clamping</td>
                      </tr>
                      <tr>
                        <td className="p-2">Flat Membrane</td>
                        <td className="p-2">Ballasted or fixed</td>
                        <td className="p-2">Membrane protection, weight limits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wind Load Calculations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wind className="h-6 w-6 text-green-400" />
                Wind Load Calculations (BS EN 1991)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Wind loading is often the governing design factor for solar mounting systems. BS EN 1991-1-4 provides the framework for wind load calculations in the UK.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Key Wind Load Factors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Basic wind speed:</strong> Regional variation (21-29 m/s in UK)</li>
                    <li>• <strong>Terrain category:</strong> Affects wind exposure</li>
                    <li>• <strong>Building height:</strong> Higher buildings = higher loads</li>
                    <li>• <strong>Panel position:</strong> Edge, corner, and centre zones</li>
                    <li>• <strong>Tilt angle:</strong> Affects pressure coefficients significantly</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Critical Load Cases:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Uplift:</strong> Negative pressure lifts panels</li>
                    <li>• <strong>Positive pressure:</strong> Wind pushing down on panels</li>
                    <li>• <strong>Lateral forces:</strong> Horizontal wind loads on array</li>
                    <li>• <strong>Roof edge effects:</strong> Higher loads near building edges</li>
                    <li>• <strong>Snow and wind combination:</strong> Combined loading scenarios</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Design Wind Speeds (BS EN 1991-1-4):</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Inland Areas:</h5>
                    <p className="text-gray-300">22-24 m/s basic wind speed</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Coastal Areas:</h5>
                    <p className="text-gray-300">26-28 m/s basic wind speed</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Scotland/Northern:</h5>
                    <p className="text-gray-300">Up to 29 m/s in exposed areas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Structural Materials */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-6 w-6 text-purple-400" />
                Structural Material Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Material selection affects system longevity, maintenance requirements, and structural performance. Each material has specific advantages for different applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Aluminium Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Advantages:</strong> Lightweight, corrosion resistant, easy to work</li>
                    <li>• <strong>Alloys:</strong> 6061-T6 and 6063-T5 commonly used</li>
                    <li>• <strong>Strength:</strong> Good strength-to-weight ratio</li>
                    <li>• <strong>Lifespan:</strong> 25+ years with proper design</li>
                    <li>• <strong>Cost:</strong> Higher initial cost, lower maintenance</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Steel Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Advantages:</strong> High strength, lower cost, readily available</li>
                    <li>• <strong>Types:</strong> Galvanised, stainless, or powder-coated</li>
                    <li>• <strong>Corrosion:</strong> Requires protective coatings</li>
                    <li>• <strong>Weight:</strong> Heavier than aluminium alternatives</li>
                    <li>• <strong>Applications:</strong> Ground mount, large commercial systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-2">Material Compatibility:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Galvanic corrosion:</strong> Avoid direct contact between dissimilar metals</p>
                  <p><strong>Fasteners:</strong> Match fastener material to structure (stainless steel preferred)</p>
                  <p><strong>Sealants:</strong> Use compatible materials that don't degrade over time</p>
                  <p><strong>Coastal installations:</strong> Specify marine-grade materials and coatings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Structural Calculations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wind className="h-6 w-6 text-cyan-400" />
                Detailed Structural Load Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Professional installations require detailed structural analysis to ensure safety and compliance with building codes.
              </p>
              
              <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                <h4 className="text-cyan-400 font-semibold mb-3">Worked Example: Flat Roof Wind Load Calculation</h4>
                <div className="text-sm space-y-3">
                  <p className="text-gray-300">
                    <strong>Project:</strong> 50kW system on industrial flat roof in Birmingham
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium">Design Parameters:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Building height: 12m</li>
                        <li>• Basic wind speed: 23 m/s</li>
                        <li>• Terrain category: II (suburban)</li>
                        <li>• Panel tilt: 10° (low profile)</li>
                        <li>• Array area: 350m²</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Calculated Loads:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Peak velocity pressure: 1.1 kN/m²</li>
                        <li>• Uplift coefficient: -1.2</li>
                        <li>• Design uplift load: 1.32 kN/m²</li>
                        <li>• Total uplift force: 462 kN</li>
                        <li>• Required ballast: 47 tonnes</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <p className="text-cyan-400 text-xs font-medium">
                      Result: Ballasted system feasible with adequate structural capacity (50 kN/m² roof loading)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-2">Snow Load Considerations:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>UK Snow Loading (BS EN 1991-1-3):</strong></p>
                  <p>• Ground snow load: 0.4-1.0 kN/m² (altitude dependent)</p>
                  <p>• Roof snow load factor: 0.8 (typical flat roof)</p>
                  <p>• Panel mounting: Additional 0.2 kN/m² for frame structure</p>
                  <p>• Combined loading: Wind + snow load combinations per Eurocode</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Case Studies */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Installation Case Study: Historic Building Adaptation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A Grade II listed warehouse conversion in Liverpool required innovative mounting solutions to preserve the building&apos;s character while achieving renewable energy targets.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Challenges:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Heritage Constraints:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• No roof penetrations permitted</li>
                      <li>• Visual impact minimisation required</li>
                      <li>• Original slate roof preservation</li>
                      <li>• Conservation officer approval needed</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Technical Challenges:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Complex roof geometry</li>
                      <li>• Load-bearing beam assessment</li>
                      <li>• Thermal bridge considerations</li>
                      <li>• Weather-tightness maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Innovative Solution:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Standing seam clamping:</strong> No penetration mounting system</li>
                  <li>• <strong>Low-profile panels:</strong> BIPV integration with traditional materials</li>
                  <li>• <strong>Structural reinforcement:</strong> Internal beam strengthening</li>
                  <li>• <strong>Heritage approval:</strong> Reversible installation design</li>
                  <li>• <strong>Result:</strong> 30kW installation with full planning approval</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Material Selection Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-6 w-6 text-purple-400" />
                Advanced Material Engineering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Material selection significantly impacts system longevity, particularly in challenging environmental conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Coastal Installations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Aluminium grade:</strong> 6061-T6 marine grade</li>
                    <li>• <strong>Fasteners:</strong> 316 stainless steel minimum</li>
                    <li>• <strong>Anodising:</strong> 25μm hard anodised finish</li>
                    <li>• <strong>Gaskets:</strong> EPDM or silicone seals</li>
                    <li>• <strong>Testing:</strong> 1000-hour salt spray compliance</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Industrial/Chemical:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Special coatings:</strong> PVDF or FEP protective layers</li>
                    <li>• <strong>Chemical resistance:</strong> pH 4-9 stable materials</li>
                    <li>• <strong>Temperature cycling:</strong> -40°C to +85°C rated</li>
                    <li>• <strong>UV protection:</strong> Enhanced polymer stabilisers</li>
                    <li>• <strong>Grounding:</strong> Enhanced EGC for safety</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">High Altitude/Snow:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Load capacity:</strong> Enhanced snow load ratings</li>
                    <li>• <strong>Thermal expansion:</strong> Sliding rail systems</li>
                    <li>• <strong>Ice formation:</strong> Heated cable provisions</li>
                    <li>• <strong>Wind resistance:</strong> Aerodynamic profiling</li>
                    <li>• <strong>Access:</strong> Integrated walkway systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ground Mount Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Mountain className="h-6 w-6 text-orange-400" />
                Ground Mount Frames and Racking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Ground-mounted systems offer flexibility in orientation and tilt angle but require foundation design and additional site preparation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Foundation Types:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Concrete footings:</strong> Most robust, suitable for large arrays</li>
                    <li>• <strong>Driven piles:</strong> Steel posts driven into ground</li>
                    <li>• <strong>Helical piles:</strong> Screwed foundations for difficult soils</li>
                    <li>• <strong>Ballasted systems:</strong> Above-ground weight-based systems</li>
                    <li>• <strong>Ground screws:</strong> Minimal excavation alternative</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Ground Mount Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Optimal orientation:</strong> Independent of building direction</li>
                    <li>• <strong>Maintenance access:</strong> Easy cleaning and servicing</li>
                    <li>• <strong>Cooling:</strong> Better air circulation around panels</li>
                    <li>• <strong>Scalability:</strong> Easy to expand systems</li>
                    <li>• <strong>Tracking options:</strong> Can incorporate solar tracking systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">Site Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Soil conditions:</strong> Geotechnical survey for large installations</li>
                  <li>• <strong>Drainage:</strong> Prevent water pooling around foundations</li>
                  <li>• <strong>Access:</strong> Maintenance vehicle access routes</li>
                  <li>• <strong>Setbacks:</strong> Planning requirements and neighbour considerations</li>
                  <li>• <strong>Security:</strong> Fencing and anti-theft measures</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Building Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                Building Integration and Waterproofing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Proper integration with building systems is crucial for maintaining structural integrity and weather protection.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Waterproofing Methods:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>EPDM boot flashing:</strong> Flexible rubber seals around penetrations</li>
                    <li>• <strong>Butyl tape:</strong> Self-adhesive sealing tape</li>
                    <li>• <strong>Sikaflex sealants:</strong> Polyurethane weatherproofing</li>
                    <li>• <strong>Lead flashing:</strong> Traditional metal weatherproofing</li>
                    <li>• <strong>Membrane welding:</strong> Heat-welded seams for flat roofs</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">BIPV Integration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>In-roof systems:</strong> Panels replace roof tiles/membrane</li>
                    <li>• <strong>Building envelope:</strong> Integration with facades and windows</li>
                    <li>• <strong>Aesthetics:</strong> Seamless architectural integration</li>
                    <li>• <strong>Performance:</strong> May have reduced cooling compared to on-roof</li>
                    <li>• <strong>Complexity:</strong> Higher installation and maintenance complexity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-2">Installation Best Practices:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Pre-drilling:</strong> Use pilot holes to prevent tile cracking</li>
                  <li>• <strong>Sealant application:</strong> Apply generously but neatly</li>
                  <li>• <strong>Rafter location:</strong> Always fix into structural members</li>
                  <li>• <strong>Load distribution:</strong> Use spreader plates for point loads</li>
                  <li>• <strong>Weather window:</strong> Install during dry conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Structural Assessment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Structural Load Assessment Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white p-2">System Size</th>
                      <th className="text-left text-white p-2">Assessment Required</th>
                      <th className="text-left text-white p-2">Professional Involvement</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2">&lt; 4kWp domestic</td>
                      <td className="p-2">Basic load check by installer</td>
                      <td className="p-2">MCS installer competency</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">4-50kWp commercial</td>
                      <td className="p-2">Detailed structural assessment</td>
                      <td className="p-2">Structural engineer review</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">&gt; 50kWp or complex</td>
                      <td className="p-2">Full structural analysis</td>
                      <td className="p-2">Chartered structural engineer</td>
                    </tr>
                    <tr>
                      <td className="p-2">Listed buildings</td>
                      <td className="p-2">Heritage impact assessment</td>
                      <td className="p-2">Conservation specialist</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Bad mounting equals system failure. Structural soundness is non-negotiable in solar design. Whether roof-mounted or ground-mounted, proper foundation design, material selection, and waterproofing are essential for long-term system reliability. Understanding wind loads, material properties, and installation best practices ensures safe, durable solar installations.
              </p>
              <p className="text-yellow-400 font-medium">
                Always engage qualified structural engineers for complex installations and follow manufacturer specifications for mounting systems.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Test your understanding of mounting systems and structural considerations.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Mounting Systems Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section4;