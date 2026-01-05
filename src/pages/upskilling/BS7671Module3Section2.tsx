import { ArrowLeft, ArrowRight, Calculator, CheckCircle, AlertTriangle, Target, TrendingUp, PoundSterling, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module3Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the typical diversity factor for domestic socket outlets?",
      options: [
        "100% (no diversity)",
        "66% for first 10A, 40% for remainder",
        "50% for all socket outlets",
        "75% for first 20A, 25% for remainder"
      ],
      correct: 1,
      explanation: "BS 7671 recommends 66% diversity for the first 10A of socket outlets, then 40% for the remainder in domestic installations."
    },
    {
      id: 2,
      question: "When calculating maximum demand, which load should NOT have diversity applied?",
      options: [
        "Lighting circuits",
        "Socket outlet circuits", 
        "Emergency lighting",
        "Cooker circuits"
      ],
      correct: 2,
      explanation: "Emergency lighting and other safety-critical loads should be calculated at 100% demand with no diversity applied."
    },
    {
      id: 3,
      question: "What is the standard diversity factor for fixed heating appliances?",
      options: [
        "100% for first 10kW, 50% remainder",
        "75% for all heating loads",
        "100% for first 5kW, 75% remainder", 
        "90% for all heating loads"
      ],
      correct: 0,
      explanation: "Fixed heating appliances typically use 100% for the first 10kW, then 50% for the remainder."
    },
    {
      id: 4,
      question: "In a large office building, what diversity might be applied to fluorescent lighting?",
      options: [
        "No diversity (100%)",
        "90% diversity factor",
        "75% diversity factor",
        "Depends on occupancy patterns"
      ],
      correct: 3,
      explanation: "Lighting diversity depends on usage patterns, occupancy schedules, and building management systems. Analysis of actual usage is required."
    },
    {
      id: 5,
      question: "What must be considered when applying diversity to motor loads?",
      options: [
        "Starting current only",
        "Running current only", 
        "Both starting and running currents",
        "Power factor correction"
      ],
      correct: 2,
      explanation: "Motor diversity must consider both starting currents (which may not be diverse) and running currents (which may have diversity applied)."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Calculator className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Maximum Demand & Diversity
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Calculating realistic electrical loads for efficient design
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.2
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
                <PoundSterling className="h-6 w-6 text-yellow-400" />
                Introduction: Economic and Safe Design Through Diversity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-yellow-400" />
                  The Critical Balance: Safety vs. Economy
                </h4>
                <p className="text-base leading-relaxed mb-3">
                  Maximum demand calculations represent one of the most critical design decisions in electrical installations. Poor diversity assessment can result in catastrophically undersized installations, leading to overheating, equipment failure, and fire risks. Conversely, excessive over-engineering wastes significant resources and increases project costs unnecessarily.
                </p>
                <p className="text-base leading-relaxed">
                  Understanding diversity factors—the statistical reality that not all electrical loads operate simultaneously at maximum demand—enables engineers to design installations that are both economically viable and inherently safe. This section explores the science and art of diversity application.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                  <h5 className="text-red-400 font-semibold mb-2">Cost of Poor Diversity Calculations:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Undersized cables causing voltage drop and overheating</li>
                    <li>• Nuisance tripping from overloaded protective devices</li>
                    <li>• Supply upgrades costing tens of thousands of pounds</li>
                    <li>• Production downtime and equipment damage</li>
                    <li>• Non-compliance and potential insurance issues</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-green-400 font-semibold mb-2">Benefits of Accurate Assessment:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Optimal cable sizes reducing material costs by 20-40%</li>
                    <li>• Correctly rated switchgear preventing over-specification</li>
                    <li>• Reduced supply capacity requirements</li>
                    <li>• Lower installation and operational costs</li>
                    <li>• Future expansion capability built-in appropriately</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Professional Competency Development
                </h5>
                <p className="text-sm">
                  Mastering diversity calculations demonstrates advanced electrical engineering competency. This skill separates competent designers from basic installers, requiring understanding of load behaviour, statistical analysis, and risk assessment. These calculations directly impact project profitability and long-term system reliability.
                </p>
              </div>
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
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30 mb-4">
                <p className="text-sm text-blue-300">
                  By completing this section, you will apply diversity principles to calculate maximum demand accurately, justify your decisions with technical reasoning, and optimise installation design for both safety and economy.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Knowledge & Comprehension:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Define diversity factors and explain their statistical basis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Interpret BS 7671 Appendix 1 diversity tables accurately</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Describe the relationship between load types and diversity application</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Application & Analysis:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Calculate maximum demand for complex installations using appropriate diversity factors</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Analyse load patterns to determine suitable diversity assumptions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compare alternative design approaches and recommend optimal solutions</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Application & Evaluation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">Design Competencies:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Justify diversity selections with technical reasoning</li>
                      <li>• Balance safety margins against economic constraints</li>
                      <li>• Integrate future expansion planning into calculations</li>
                      <li>• Validate designs against real-world performance data</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">Assessment Methods:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Complex calculation exercises with multiple load types</li>
                      <li>• Case studies requiring diversity factor justification</li>
                      <li>• Design optimisation challenges</li>
                      <li>• Professional scenario-based problem solving</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Diversity */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
                Understanding Electrical Diversity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">What is Diversity?</h4>
                <p className="text-sm mb-3">
                  Diversity (or demand factor) recognises that connected load rarely equals maximum demand. Not all circuits operate simultaneously at full load, allowing for reduced cable sizes, switchgear ratings, and supply capacity.
                </p>
                <p className="text-sm">
                  Proper application of diversity factors results in significant cost savings whilst maintaining adequate capacity for normal and foreseeable peak demand conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Benefits of Applying Diversity</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Reduced Cable Sizes</p>
                      <p className="text-xs text-white">Smaller cables needed when realistic loads calculated</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Lower Switchgear Ratings</p>
                      <p className="text-xs text-white">MCBs, RCDs, and switches can be correctly sized</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Optimised Supply Capacity</p>
                      <p className="text-xs text-white">Right-sized supply avoids expensive oversizing</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Cost Effectiveness</p>
                      <p className="text-xs text-white">Significant material and installation savings</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Risks of Incorrect Application</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Undersized Installation</p>
                      <p className="text-xs text-white">Excessive diversity can cause overloading</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Safety Concerns</p>
                      <p className="text-xs text-white">Overloaded cables and switchgear create hazards</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Poor Performance</p>
                      <p className="text-xs text-white">Voltage drop and nuisance tripping issues</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm">Future Expansion Problems</p>
                      <p className="text-xs text-white">No capacity for additional loads</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Diversity Principles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Load Analysis:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Study actual usage patterns</li>
                      <li>• Consider peak demand times</li>
                      <li>• Account for seasonal variations</li>
                      <li>• Evaluate future load growth</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Conservative Approach:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Use proven diversity factors</li>
                      <li>• Consider worst-case scenarios</li>
                      <li>• Include safety margins</li>
                      <li>• Document assumptions clearly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BS 7671 Diversity Factors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-green-500" />
                BS 7671 Standard Diversity Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Domestic Installation Diversity</h4>
                <p className="text-sm">
                  BS 7671 Appendix 1 provides guidance on diversity factors for typical domestic installations. These factors are based on extensive load surveys and provide reliable starting points for calculations.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4">Domestic Diversity Table</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-white">Load Type</th>
                        <th className="text-left p-3 text-white">Diversity Factor</th>
                        <th className="text-left p-3 text-white">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-semibold">Lighting</td>
                        <td className="p-3">66% for circuits &gt;5A</td>
                        <td className="p-3 text-xs">Minimum 5A per circuit</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-semibold">Socket Outlets</td>
                        <td className="p-3">66% first 10A + 40% remainder</td>
                        <td className="p-3 text-xs">Per room or area</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-semibold">Cooker/Hob</td>
                        <td className="p-3">100% first 10A + 30% + 5A</td>
                        <td className="p-3 text-xs">Plus oven/grill allowance</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-semibold">Water Heating</td>
                        <td className="p-3">100% or time control</td>
                        <td className="p-3 text-xs">Consider off-peak operation</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-semibold">Space Heating</td>
                        <td className="p-3">100% first 10kW + 50%</td>
                        <td className="p-3 text-xs">Thermostat control assumed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Motors</td>
                        <td className="p-3">100% largest + 50% others</td>
                        <td className="p-3 text-xs">Consider starting currents</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Commercial Diversity Considerations</h4>
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Office Buildings</p>
                      <p className="text-xs text-white">Socket outlets: 75-90%, Lighting: depends on controls</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Retail Premises</p>
                      <p className="text-xs text-white">Higher diversity due to display lighting and equipment</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Industrial Facilities</p>
                      <p className="text-xs text-white">Process-dependent, often minimal diversity</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <p className="text-white font-semibold text-sm">Educational Buildings</p>
                      <p className="text-xs text-white">Consider term-time vs. holiday operation</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Special Considerations</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Emergency Systems</p>
                      <p className="text-xs text-white">No diversity - 100% demand for safety systems</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Motor Starting</p>
                      <p className="text-xs text-white">Consider both starting and running diversity</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Future Expansion</p>
                      <p className="text-xs text-white">Include allowance for anticipated growth</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm">Seasonal Loads</p>
                      <p className="text-xs text-white">Air conditioning, heating variations throughout year</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Calculation Methods */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Practical Calculation Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Step-by-Step Maximum Demand Calculation</h4>
                <p className="text-sm">
                  A systematic approach ensures accuracy and provides clear documentation for design decisions and future modifications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Calculation Process</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">Load Inventory</h5>
                        <p className="text-xs text-white">List all circuits with connected loads, ratings, and operating characteristics</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">Load Categorisation</h5>
                        <p className="text-xs text-white">Group similar loads and identify appropriate diversity factors</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">Diversity Application</h5>
                        <p className="text-xs text-white">Apply BS 7671 or appropriate diversity factors to each load category</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">Load Summation</h5>
                        <p className="text-xs text-white">Sum diversified loads to determine maximum demand</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">Safety Margins</h5>
                        <p className="text-xs text-white">Add appropriate safety margins and future expansion allowances</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Worked Example: Small Office</h4>
                  <div className="bg-card p-4 rounded-lg space-y-3">
                    <div>
                      <p className="text-white font-semibold text-sm">Connected Loads:</p>
                      <ul className="text-xs text-white space-y-1 mt-2">
                        <li>• Lighting: 5kW (fluorescent/LED)</li>
                        <li>• Socket outlets: 15kW (general power)</li>
                        <li>• Air conditioning: 8kW (split systems)</li>
                        <li>• Server room: 3kW (constant load)</li>
                        <li>• Kitchen: 2kW (small appliances)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-white font-semibold text-sm">Diversity Application:</p>
                      <ul className="text-xs text-white space-y-1 mt-2">
                        <li>• Lighting: 5kW × 90% = 4.5kW</li>
                        <li>• Sockets: 15kW × 75% = 11.25kW</li>
                        <li>• A/C: 8kW × 80% = 6.4kW</li>
                        <li>• Servers: 3kW × 100% = 3kW</li>
                        <li>• Kitchen: 2kW × 66% = 1.32kW</li>
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-600 pt-2">
                      <p className="text-yellow-400 font-semibold text-sm">Maximum Demand: 26.47kW</p>
                      <p className="text-xs text-white">Plus 10% safety margin: 29.1kW</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Advanced Considerations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Load Monitoring:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Use power quality analysers for existing installations</li>
                      <li>• Record peak demand over representative periods</li>
                      <li>• Account for seasonal and operational variations</li>
                      <li>• Validate diversity assumptions with real data</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Future Planning:</p>
                    <ul className="text-xs text-white space-y-1">
                      <li>• Consider business growth and expansion plans</li>
                      <li>• Plan for technology changes (EV charging, heat pumps)</li>
                      <li>• Design flexibility for load redistribution</li>
                      <li>• Review and update diversity assumptions periodically</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes and Solutions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Common Mistakes and Prevention
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                  <h4 className="text-red-400 font-semibold mb-3">❌ Typical Errors</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Applying excessive diversity without justification</li>
                    <li>• Ignoring motor starting currents in diversity calculations</li>
                    <li>• Using domestic diversity factors for commercial installations</li>
                    <li>• Failing to consider simultaneous operation scenarios</li>
                    <li>• Not accounting for future load growth</li>
                    <li>• Mixing different diversity methodologies inconsistently</li>
                  </ul>
                </div>

                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h4 className="text-green-400 font-semibold mb-3">✅ Best Practices</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use conservative diversity factors for critical applications</li>
                    <li>• Document all assumptions and calculation methods</li>
                    <li>• Validate diversity assumptions with operational data</li>
                    <li>• Consider worst-case operational scenarios</li>
                    <li>• Include appropriate safety margins</li>
                    <li>• Regular review and updating of load assessments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">⚠️ Warning Signs of Poor Diversity Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Operational Issues:</p>
                    <p className="text-xs text-white">Frequent MCB tripping, voltage drop complaints, overheating cables</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Performance Problems:</p>
                    <p className="text-xs text-white">Equipment not reaching rated performance, unexplained energy costs</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Expansion Limitations:</p>
                    <p className="text-xs text-white">No capacity for additional loads, expensive upgrades required</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Case Study */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real-World Case Study
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Office Building Supply Failure</h4>
                <p className="text-sm mb-3">
                  A contractor applies 50% diversity to all loads in a 24/7 call centre, not considering that most equipment operates continuously. During peak operation, the supply is overloaded, causing equipment shutdowns and business interruption costing £50,000 per hour.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white">Inappropriate diversity application in critical operations can have severe financial consequences.</p>
                </div>
              </div>
              
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-400 font-semibold mb-3">✅ Correct Approach</h4>
                <p className="text-sm">
                  Load analysis reveals 24/7 operation with minimal diversity. Design uses 95% diversity with load monitoring systems. Installation handles peak demands safely with capacity for planned expansion, ensuring business continuity.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Test your understanding of maximum demand and diversity"
                description={`${quizQuestions.length} questions • Select the best answer for each question`}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-3-section-1">
              <Button variant="outline" className="text-foreground border-gray-600 hover:bg-card hover:text-yellow-400 transition-all duration-200">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-3-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
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

export default BS7671Module3Section2;
