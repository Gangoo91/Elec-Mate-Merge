import { ArrowLeft, Layers, Zap, TrendingUp, Sun, Shield, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section1Questions } from '@/data/upskilling/renewableEnergyModule2QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule2Section1 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section1Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              PV Panel Types (Monocrystalline, Poly, Thin Film)
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding different photovoltaic panel technologies and their characteristics
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Panel Technologies
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
                  Distinguish between monocrystalline, polycrystalline, and thin-film technologies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Evaluate efficiency, cost, and physical characteristics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Select appropriate panels for different use cases
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
                The first step in designing any PV system is understanding your panel technology. This section breaks down the three main PV types, helping you make informed decisions based on efficiency, cost, space constraints, and application requirements.
              </p>
            </CardContent>
          </Card>

          {/* Monocrystalline Panels */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-6 w-6 text-yellow-400" />
                Monocrystalline Silicon Panels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Monocrystalline panels are manufactured from single silicon crystals, offering the highest efficiency and premium performance characteristics.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Characteristics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Efficiency:</strong> 18-22% (highest commercially available)</li>
                    <li>• <strong>Appearance:</strong> Dark black or very dark blue colour</li>
                    <li>• <strong>Cell structure:</strong> Uniform appearance with rounded corners</li>
                    <li>• <strong>Temperature coefficient:</strong> -0.4% to -0.5% per °C</li>
                    <li>• <strong>Lifespan:</strong> 25-30 years with excellent degradation rates</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Advantages & Disadvantages:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-green-400 font-medium">Advantages:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Space-efficient due to high efficiency</li>
                        <li>• Better performance in low-light conditions</li>
                        <li>• Longer warranties and proven reliability</li>
                        <li>• Higher power output per unit area</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-medium">Disadvantages:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Higher initial cost per watt</li>
                        <li>• More energy-intensive manufacturing process</li>
                        <li>• Performance drops more in high temperatures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Polycrystalline Panels */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Layers className="h-6 w-6 text-cyan-400" />
                Polycrystalline Silicon Panels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Polycrystalline panels are made from multiple silicon crystals melted together, offering a balance between cost and performance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Key Characteristics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Efficiency:</strong> 15-18% (good performance)</li>
                    <li>• <strong>Appearance:</strong> Distinctive bluish hue with visible grain patterns</li>
                    <li>• <strong>Cell structure:</strong> Square cells with sharp corners</li>
                    <li>• <strong>Temperature coefficient:</strong> -0.45% to -0.5% per °C</li>
                    <li>• <strong>Manufacturing:</strong> Less energy-intensive production process</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-3">Advantages & Disadvantages:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-green-400 font-medium">Advantages:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Lower cost per watt - budget-friendly</li>
                        <li>• Simpler manufacturing process</li>
                        <li>• Good performance-to-price ratio</li>
                        <li>• Widely available with established supply chains</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-medium">Disadvantages:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Lower efficiency requires more roof space</li>
                        <li>• Slightly higher temperature coefficient</li>
                        <li>• Less aesthetically appealing to some users</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thin Film Panels */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" />
                Thin Film Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Thin film panels use different semiconductor materials deposited in thin layers, offering unique advantages for specific applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Amorphous Silicon (a-Si):</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Efficiency: 6-8%</li>
                    <li>• Flexible substrate options</li>
                    <li>• Better low-light performance</li>
                    <li>• Lower temperature coefficient</li>
                    <li>• Lowest manufacturing cost</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Cadmium Telluride (CdTe):</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Efficiency: 9-11%</li>
                    <li>• Excellent temperature coefficient</li>
                    <li>• Fast energy payback time</li>
                    <li>• Good performance in high temperatures</li>
                    <li>• Utility-scale applications</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">CIGS (Copper Indium Gallium Selenide):</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Efficiency: 10-12%</li>
                    <li>• Best thin-film efficiency</li>
                    <li>• Flexible and lightweight</li>
                    <li>• Good low-light performance</li>
                    <li>• Premium thin-film option</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Thin Film Advantages:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Flexible and lightweight:</strong> Suitable for unconventional installations</li>
                  <li>• <strong>Better in diffuse light:</strong> Maintains output in cloudy conditions</li>
                  <li>• <strong>Lower temperature coefficient:</strong> Better high-temperature performance</li>
                  <li>• <strong>Aesthetic options:</strong> Can be integrated into building materials</li>
                  <li>• <strong>Lower manufacturing energy:</strong> Reduced carbon footprint</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Performance Factors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-orange-400" />
                Performance Impact Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding key performance factors helps in selecting the right panel technology for specific conditions and applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Temperature Coefficients:</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Definition:</strong> Percentage decrease in power output per degree Celsius above 25°C
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Monocrystalline:</strong> -0.4% to -0.5% per °C</li>
                      <li>• <strong>Polycrystalline:</strong> -0.45% to -0.5% per °C</li>
                      <li>• <strong>Thin film:</strong> -0.25% to -0.4% per °C</li>
                    </ul>
                    <p className="text-yellow-400 text-xs">
                      Lower temperature coefficients mean better performance in hot climates.
                    </p>
                  </div>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Degradation Rates:</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Definition:</strong> Annual reduction in power output over the panel's lifetime
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Monocrystalline:</strong> 0.4-0.5% per year</li>
                      <li>• <strong>Polycrystalline:</strong> 0.5-0.6% per year</li>
                      <li>• <strong>Thin film:</strong> 0.6-0.8% per year</li>
                    </ul>
                    <p className="text-yellow-400 text-xs">
                      Lower degradation rates mean better long-term performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emerging Technologies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
                Emerging PV Technologies and Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The solar industry continues to innovate with new technologies that push efficiency boundaries and reduce costs.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">PERC Technology:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Passivated Emitter Rear Cell:</strong> Enhanced light capture</li>
                    <li>• <strong>Efficiency gains:</strong> 1-2% improvement over standard cells</li>
                    <li>• <strong>Market adoption:</strong> 80%+ of new installations</li>
                    <li>• <strong>Cost premium:</strong> Minimal additional cost</li>
                    <li>• <strong>Performance:</strong> Better low-light and high-temperature response</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Bifacial Panels:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dual-sided generation:</strong> Front and rear light capture</li>
                    <li>• <strong>Bifaciality factor:</strong> 70-95% rear-side efficiency</li>
                    <li>• <strong>Gain potential:</strong> 10-30% additional energy yield</li>
                    <li>• <strong>Mounting requirements:</strong> Elevated for ground reflection</li>
                    <li>• <strong>Applications:</strong> Ground mount, elevated installations</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Half-Cell Technology:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cell division:</strong> Reduces resistive losses</li>
                    <li>• <strong>Shading tolerance:</strong> Better partial shading performance</li>
                    <li>• <strong>Hot spot reduction:</strong> Lower cell operating temperatures</li>
                    <li>• <strong>Power gain:</strong> 5-10W additional output per panel</li>
                    <li>• <strong>Reliability:</strong> Reduced thermal stress and cracking</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Performance Analysis */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Performance Analysis: UK Installation Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A comprehensive study of three identical 4kWp residential installations in Manchester using different panel technologies over 12 months provides valuable performance insights.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Installation Details:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System A: Monocrystalline</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 10 × 400W mono panels</li>
                      <li>• 20.8% panel efficiency</li>
                      <li>• -0.38%/°C temperature coefficient</li>
                      <li>• Annual yield: 3,847 kWh</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">System B: Polycrystalline</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 12 × 335W poly panels</li>
                      <li>• 17.2% panel efficiency</li>
                      <li>• -0.41%/°C temperature coefficient</li>
                      <li>• Annual yield: 3,654 kWh</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">System C: Thin Film (CdTe)</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 36 × 112W thin film panels</li>
                      <li>• 11.5% panel efficiency</li>
                      <li>• -0.25%/°C temperature coefficient</li>
                      <li>• Annual yield: 3,721 kWh</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Performance Insights:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Summer performance:</strong> Thin film outperformed in high temperatures (July-August)</li>
                  <li>• <strong>Winter performance:</strong> Monocrystalline maintained highest output in low light</li>
                  <li>• <strong>Cloudy day performance:</strong> Thin film showed best diffuse light response</li>
                  <li>• <strong>Overall leader:</strong> Monocrystalline achieved 5% higher annual yield</li>
                  <li>• <strong>Cost effectiveness:</strong> Polycrystalline provided best £/kWh over system lifetime</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Manufacturing Quality and Warranties */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-400" />
                Manufacturing Quality and Warranty Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Panel quality and manufacturer warranties significantly impact long-term system performance and project economics.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Quality Indicators:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>IEC certifications:</strong> IEC 61215, IEC 61730 compliance</li>
                    <li>• <strong>Flash test results:</strong> Factory power measurement accuracy</li>
                    <li>• <strong>Visual inspection:</strong> Cell alignment, soldering quality</li>
                    <li>• <strong>Mechanical testing:</strong> Hail impact, wind loading certification</li>
                    <li>• <strong>Salt mist testing:</strong> Corrosion resistance for coastal areas</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Warranty Structures:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Product warranty:</strong> 10-25 years materials/workmanship</li>
                    <li>• <strong>Performance warranty:</strong> 80% output after 25 years</li>
                    <li>• <strong>Linear warranties:</strong> Annual degradation limits (≤0.6%/year)</li>
                    <li>• <strong>Enhanced warranties:</strong> Premium tiers with lower degradation</li>
                    <li>• <strong>Bankability factors:</strong> Manufacturer financial stability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-2">Tier 1 Manufacturer Criteria (Bloomberg NEF):</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Vertically integrated manufacturing (from wafer to module)</li>
                  <li>• Bankable by development banks for utility-scale projects</li>
                  <li>• Automated production lines with quality control systems</li>
                  <li>• Substantial R&D investment and patent portfolio</li>
                  <li>• Financial transparency and stable business model</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Application Selection Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Panel Selection Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white p-2">Application</th>
                      <th className="text-left text-white p-2">Recommended Type</th>
                      <th className="text-left text-white p-2">Key Reasons</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Limited roof space</td>
                      <td className="p-2 text-yellow-400">Monocrystalline</td>
                      <td className="p-2">Highest efficiency maximises power in small areas</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Budget-conscious residential</td>
                      <td className="p-2 text-cyan-400">Polycrystalline</td>
                      <td className="p-2">Best balance of cost and performance</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Hot climate installations</td>
                      <td className="p-2 text-purple-400">Thin film</td>
                      <td className="p-2">Better temperature coefficient and heat tolerance</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Flexible/curved surfaces</td>
                      <td className="p-2 text-purple-400">Thin film</td>
                      <td className="p-2">Flexible substrate options available</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Utility-scale projects</td>
                      <td className="p-2 text-yellow-400">Monocrystalline</td>
                      <td className="p-2">Lowest levelised cost of energy (LCOE)</td>
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
                Each panel type suits different project needs. Know your trade-offs in cost, space, and performance. Monocrystalline offers premium efficiency, polycrystalline provides the best value proposition, and thin film excels in challenging conditions.
              </p>
              <p className="text-yellow-400 font-medium">
                The right panel choice depends on your specific application requirements, budget constraints, and site conditions.
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
                Test your understanding of different PV panel technologies and their characteristics.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="PV Panel Types Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section1;