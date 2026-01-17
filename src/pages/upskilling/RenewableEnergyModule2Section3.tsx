import { ArrowLeft, Calculator, Zap, TrendingUp, BarChart3, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section3Questions } from '@/data/upskilling/renewableEnergyModule2QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule2Section3 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section3Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/renewable-energy-module-2">
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
              String Design, Voltage Matching &amp; Panel Sizing
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Designing solar panel strings and matching system voltages for optimal performance and safety
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                String Design
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
                  Calculate string voltages and currents for safe system operation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand inverter input requirements and MPPT windows
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Avoid mismatch and overvoltage issues through proper design
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
                Correct electrical configuration ensures system safety and compatibility. This section covers how to size and design panel arrays to match inverter specifications whilst maximising performance. Electrical compatibility starts at the design table — don't mismatch your string and inverter specifications.
              </p>
            </CardContent>
          </Card>

          {/* Panel Electrical Parameters */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Understanding Panel Electrical Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Every solar panel has key electrical specifications that determine how it can be connected and what performance to expect.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Voltage Parameters:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>VOC (Open Circuit Voltage):</strong> Maximum voltage with no load</li>
                    <li>• <strong>VMP (Maximum Power Voltage):</strong> Voltage at maximum power point</li>
                    <li>• <strong>Typical values:</strong> VOC ~45V, VMP ~37V (per panel)</li>
                    <li>• <strong>Temperature effect:</strong> Voltage decreases as temperature rises</li>
                    <li>• <strong>Design significance:</strong> VOC determines string limits</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Current Parameters:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>ISC (Short Circuit Current):</strong> Maximum current with no voltage</li>
                    <li>• <strong>IMP (Maximum Power Current):</strong> Current at maximum power point</li>
                    <li>• <strong>Typical values:</strong> ISC ~11A, IMP ~10A (per panel)</li>
                    <li>• <strong>Temperature effect:</strong> Current slightly increases with temperature</li>
                    <li>• <strong>Design significance:</strong> ISC determines fusing requirements</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Standard Test Conditions (STC):</h4>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>All panel ratings are given at STC: 1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum</p>
                  <p><strong>Real-world considerations:</strong> Actual conditions vary significantly from STC</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* String Design Fundamentals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-green-400" />
                String Length and MPPT Window Design
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                String design must keep voltages within the inverter's MPPT (Maximum Power Point Tracking) window under all operating conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">MPPT Window Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Minimum voltage:</strong> String VMP must exceed MPPT minimum</li>
                    <li>• <strong>Maximum voltage:</strong> String VOC must stay below MPPT maximum</li>
                    <li>• <strong>Typical residential:</strong> 125V to 600V MPPT range</li>
                    <li>• <strong>Typical commercial:</strong> 250V to 1000V MPPT range</li>
                    <li>• <strong>Safety margin:</strong> Leave 10% buffer on voltage limits</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">String Length Calculation:</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Minimum panels:</strong> MPPT min voltage ÷ Panel VMP
                    </p>
                    <p className="text-gray-300">
                      <strong>Maximum panels:</strong> MPPT max voltage ÷ Panel VOC (at lowest temp)
                    </p>
                    <p className="text-yellow-400 text-xs mt-2">
                      Example: 600V ÷ 45V = 13 panels maximum (with temperature considerations)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Design Example (400W Panels):</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-white p-2">Panels per String</th>
                        <th className="text-left text-white p-2">String VMP</th>
                        <th className="text-left text-white p-2">String VOC</th>
                        <th className="text-left text-white p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">8 panels</td>
                        <td className="p-2">296V</td>
                        <td className="p-2">360V</td>
                        <td className="p-2 text-green-400">✓ Within MPPT</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">12 panels</td>
                        <td className="p-2">444V</td>
                        <td className="p-2">540V</td>
                        <td className="p-2 text-green-400">✓ Within MPPT</td>
                      </tr>
                      <tr>
                        <td className="p-2">15 panels</td>
                        <td className="p-2">555V</td>
                        <td className="p-2">675V</td>
                        <td className="p-2 text-red-400">✗ Exceeds max</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Series vs Parallel */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-purple-400" />
                Series vs Parallel Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding how panels combine electrically is fundamental to system design and troubleshooting.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Series Connection:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage:</strong> Adds together (V1 + V2 + V3...)</li>
                    <li>• <strong>Current:</strong> Remains the same as individual panels</li>
                    <li>• <strong>Power:</strong> P = V(total) × I</li>
                    <li>• <strong>Advantage:</strong> Higher voltage, lower current losses</li>
                    <li>• <strong>Disadvantage:</strong> Entire string limited by worst panel</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Parallel Connection:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage:</strong> Remains the same as individual panels</li>
                    <li>• <strong>Current:</strong> Adds together (I1 + I2 + I3...)</li>
                    <li>• <strong>Power:</strong> P = V × I(total)</li>
                    <li>• <strong>Advantage:</strong> Independent string performance</li>
                    <li>• <strong>Disadvantage:</strong> Higher current, requires larger conductors</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-2">Series String Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Shading impact:</strong> One shaded panel reduces entire string output</li>
                  <li>• <strong>Panel matching:</strong> Use panels from same batch/manufacturer</li>
                  <li>• <strong>Bypass diodes:</strong> Minimise series shading losses</li>
                  <li>• <strong>Safety:</strong> Higher voltages require additional precautions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Temperature Effects */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-orange-400" />
                Temperature Derating and Maximum System Voltage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Temperature significantly affects panel voltage, requiring careful consideration in string design to avoid overvoltage conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Temperature Effects on Voltage:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cold weather:</strong> Voltage increases significantly</li>
                    <li>• <strong>Hot weather:</strong> Voltage decreases</li>
                    <li>• <strong>Temperature coefficient:</strong> Typically -0.4% per °C</li>
                    <li>• <strong>UK winter minimum:</strong> -10°C to -15°C possible</li>
                    <li>• <strong>Design consideration:</strong> Size for coldest expected temperature</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Voltage Calculation at Temperature:</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Formula:</strong> V(temp) = V(STC) × [1 + (T(cell) - 25) × Temp Coeff]
                    </p>
                    <p className="text-gray-300">
                      <strong>Example:</strong> 45V panel at -10°C
                    </p>
                    <p className="text-gray-300">
                      V = 45V × [1 + (-10 - 25) × (-0.004)] = 51.3V
                    </p>
                    <p className="text-yellow-400 text-xs">
                      14% voltage increase at cold temperatures!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">Maximum System Voltage Considerations:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>UK regulations:</strong> 1000V maximum system voltage for LV installations</li>
                  <li>• <strong>Safety margin:</strong> Design for 900V maximum to allow temperature variation</li>
                  <li>• <strong>Component ratings:</strong> All DC components must be rated for system voltage</li>
                  <li>• <strong>String fusing:</strong> Required for parallel strings in most cases</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Design Tools */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-cyan-400" />
                Sizing Tools and Datasheet Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Professional design tools and proper datasheet interpretation are essential for accurate string sizing and system design.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Design Software:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>PVsyst:</strong> Professional system design</li>
                    <li>• <strong>Aurora Solar:</strong> Sales and design platform</li>
                    <li>• <strong>SolarEdge Designer:</strong> System layout tool</li>
                    <li>• <strong>Helioscope:</strong> Performance modelling</li>
                    <li>• <strong>SketchUp:</strong> 3D design with solar plugins</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Key Datasheet Parameters:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Electrical data:</strong> VOC, VMP, ISC, IMP</li>
                    <li>• <strong>Temperature coefficients:</strong> All parameters</li>
                    <li>• <strong>Tolerances:</strong> Power output variation</li>
                    <li>• <strong>Mechanical data:</strong> Dimensions, weight</li>
                    <li>• <strong>Certifications:</strong> Standards compliance</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Validation Checks:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Voltage limits:</strong> All temperature conditions</li>
                    <li>• <strong>Current limits:</strong> Inverter and wiring capacity</li>
                    <li>• <strong>Power matching:</strong> Array vs inverter sizing</li>
                    <li>• <strong>Safety factors:</strong> Code compliance margins</li>
                    <li>• <strong>Performance ratio:</strong> Expected vs actual output</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Design Mistakes */}
          <Card className="bg-red-900/20 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Common String Design Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-white font-medium mb-2">Overvoltage Issues:</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Not accounting for cold temperature voltage rise</li>
                    <li>• Exceeding inverter maximum input voltage</li>
                    <li>• Inadequate safety margins in design</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-2">Undervoltage Problems:</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• String voltage below MPPT minimum at high temperatures</li>
                    <li>• Poor performance during hot weather</li>
                    <li>• Inverter unable to start in low light conditions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-2">Panel Mismatch:</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Mixing different panel models in same string</li>
                    <li>• Combining different orientations or tilt angles</li>
                    <li>• Ignoring panel tolerance variations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-2">Current Oversizing:</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Too many parallel strings for inverter input</li>
                    <li>• Inadequate DC conductor sizing</li>
                    <li>• Missing or undersized string fusing</li>
                  </ul>
                </div>
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
                Electrical compatibility starts at the design table. Proper string design ensures safety, compliance, and optimal performance. Understanding panel parameters, temperature effects, and inverter requirements is essential for successful solar installations. Don't mismatch your string and inverter specifications.
              </p>
              <p className="text-yellow-400 font-medium">
                Always validate your design with proper tools and leave safety margins for temperature variations and component tolerances.
              </p>
            </CardContent>
          </Card>

          {/* Advanced String Design Scenarios */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Complex System Design Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Real-world installations often present complex scenarios requiring advanced design considerations.
              </p>
              
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Multi-Orientation System Design:</h4>
                <div className="text-sm space-y-3">
                  <p className="text-gray-300">
                    <strong>Scenario:</strong> Commercial building with east, south, and west-facing roof sections
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <h5 className="text-white font-medium">East Roof (90°):</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 16 × 400W panels</li>
                        <li>• 2 strings of 8 panels</li>
                        <li>• Dedicated MPPT input</li>
                        <li>• Performance: 85% of south</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">South Roof (180°):</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 24 × 400W panels</li>
                        <li>• 3 strings of 8 panels</li>
                        <li>• Primary MPPT input</li>
                        <li>• Performance: 100% baseline</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">West Roof (270°):</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• 16 × 400W panels</li>
                        <li>• 2 strings of 8 panels</li>
                        <li>• Separate MPPT input</li>
                        <li>• Performance: 87% of south</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-yellow-400 text-xs">
                    <strong>Key:</strong> Never mix orientations in the same string - use separate MPPT inputs
                  </p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Power Optimizer vs String Inverter Comparison:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-white p-2">Factor</th>
                        <th className="text-left text-white p-2">String Inverters</th>
                        <th className="text-left text-white p-2">Power Optimizers</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Shading tolerance</td>
                        <td className="p-2">Poor - whole string affected</td>
                        <td className="p-2">Excellent - panel-level MPPT</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Monitoring</td>
                        <td className="p-2">String-level only</td>
                        <td className="p-2">Panel-level detail</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-medium">Cost</td>
                        <td className="p-2">Lower initial investment</td>
                        <td className="p-2">15-25% premium</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Reliability</td>
                        <td className="p-2">Fewer components</td>
                        <td className="p-2">More potential failure points</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting and Diagnostics */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                String Performance Troubleshooting Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding common string issues and diagnostic approaches enables quick problem resolution.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Common String Problems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Underperformance:</strong> Output below expected levels</li>
                    <li>• <strong>Overvoltage:</strong> String voltage exceeding inverter limits</li>
                    <li>• <strong>Ground faults:</strong> Insulation breakdown to earth</li>
                    <li>• <strong>Arc faults:</strong> Loose connections causing arcing</li>
                    <li>• <strong>Shading losses:</strong> Partial panel obstruction</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Diagnostic Tools:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>DC clamp meters:</strong> String current measurement</li>
                    <li>• <strong>Multimeters:</strong> Voltage and resistance testing</li>
                    <li>• <strong>Insulation testers:</strong> Ground fault detection</li>
                    <li>• <strong>Thermal cameras:</strong> Hot spot identification</li>
                    <li>• <strong>I-V curve tracers:</strong> Panel performance analysis</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">Step-by-Step Diagnostic Process:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>1. Visual inspection:</strong> Check for obvious damage, shading, or soiling</p>
                  <p><strong>2. Performance comparison:</strong> Compare string outputs against expected values</p>
                  <p><strong>3. Electrical testing:</strong> Measure voltages and currents at key points</p>
                  <p><strong>4. Isolation testing:</strong> Test individual panels if string-level issue identified</p>
                  <p><strong>5. Documentation:</strong> Record findings and corrective actions taken</p>
                </div>
              </div>
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
                Test your understanding of string design principles and electrical system matching.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="String Design Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section3;