import { ArrowLeft, Scale, Globe2, FileText, TrendingUp, Building, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section4Questions } from '@/data/upskilling/renewableEnergyModule1QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule1Section4 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section4Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Global & UK Regulatory Landscape
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding Net Zero commitments, smart energy initiatives, and the policy frameworks driving renewable deployment
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Policy & Regulation
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand key Net Zero commitments and their impact on renewable deployment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn how policy shapes renewable energy investment and development
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify financial incentives and compliance schemes supporting renewable energy
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
                Government policy is the primary driver of renewable energy investment and innovation worldwide. From ambitious Net Zero targets to specific financial mechanisms, regulatory frameworks determine what gets built, how quickly, and where. Understanding this landscape is critical for anyone working in renewable energy, as policies create markets, set standards, and define the rules of engagement. This section explores the key regulatory drivers shaping the renewable energy sector, from global climate agreements to local planning regulations.
              </p>
            </CardContent>
          </Card>

          {/* UK Net Zero Target */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                UK's Net Zero by 2050 Target
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The UK became the first major economy to enshrine a Net Zero target in law through the Climate Change Act 2008 (2050 Target Amendment) Order 2019.
              </p>
              
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-3">Legal Framework:</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Binding commitment:</strong> Legally binding target to reach net zero greenhouse gas emissions by 2050</li>
                  <li>• <strong>Carbon budgets:</strong> Five-year caps on UK emissions, providing stepping stones to 2050</li>
                  <li>• <strong>Independent oversight:</strong> Committee on Climate Change monitors progress and recommends policies</li>
                  <li>• <strong>Sectoral targets:</strong> Specific goals for electricity, transport, buildings, and industry</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Electricity Sector Targets:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>2030:</strong> Fully decarbonised electricity system</li>
                    <li>• <strong>2035:</strong> Clean power generation (subject to security of supply)</li>
                    <li>• <strong>Offshore wind:</strong> 50GW by 2030</li>
                    <li>• <strong>Solar:</strong> 70GW by 2035 (industry ambition)</li>
                    <li>• <strong>Storage:</strong> 30GW by 2030</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Supporting Policies:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Green financing:</strong> £12bn Green Bond programme</li>
                    <li>• <strong>Innovation funding:</strong> £1bn Net Zero Innovation Portfolio</li>
                    <li>• <strong>Skills development:</strong> Green Jobs Taskforce initiatives</li>
                    <li>• <strong>Industrial strategy:</strong> Sector deals for offshore wind</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Energy Initiatives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe2 className="h-6 w-6 text-yellow-400" />
                Smart Energy Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The UK's smart energy strategy focuses on enabling flexible, efficient energy systems that can accommodate high levels of renewable generation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Smart Meters:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Target: All homes by 2024</li>
                    <li>• Half-hourly data collection</li>
                    <li>• Enable time-of-use tariffs</li>
                    <li>• Support demand response</li>
                    <li>• Facilitate peer-to-peer trading</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Demand Side Response (DSR):</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Flexibility services markets</li>
                    <li>• Industrial demand reduction</li>
                    <li>• Residential smart appliances</li>
                    <li>• EV smart charging</li>
                    <li>• Heat pump optimisation</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Virtual Power Plants (VPPs):</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Aggregate distributed resources</li>
                    <li>• Solar + storage + flexible loads</li>
                    <li>• Grid services provision</li>
                    <li>• Market participation</li>
                    <li>• Optimised dispatch</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Smart Grid Investments:</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Ofgem's RIIO-2 price control (2021-2026) allocates £25bn for network investment, including:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Advanced monitoring and control systems</li>
                  <li>• Flexibility services procurement</li>
                  <li>• Enhanced grid resilience and cybersecurity</li>
                  <li>• EV charging infrastructure support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Financial Support Mechanisms */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-400" />
                Financial Support Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The UK has developed sophisticated financial mechanisms to support renewable energy deployment and ensure value for money for consumers.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Contracts for Difference (CfD):</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Mechanism:</strong> Long-term contracts (15 years) that provide price certainty for low-carbon generation
                    </p>
                    <p className="text-gray-300">
                      <strong>How it works:</strong> Generators receive the difference between a strike price and market price
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Competitive allocation rounds</li>
                      <li>• Technology-specific "pots"</li>
                      <li>• Consumer protection from high prices</li>
                      <li>• Revenue certainty for investors</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Smart Export Guarantee (SEG):</h4>
                  <div className="text-sm space-y-2">
                    <p className="text-gray-300">
                      <strong>Replaced:</strong> Feed-in Tariffs for new installations from 2020
                    </p>
                    <p className="text-gray-300">
                      <strong>Coverage:</strong> Small-scale renewables up to 5MW
                    </p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Mandatory for large suppliers</li>
                      <li>• Market-based export rates</li>
                      <li>• Smart meter requirement</li>
                      <li>• Technology agnostic</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Recent CfD Results (2023):</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-white p-2">Technology</th>
                        <th className="text-left text-white p-2">Capacity Awarded</th>
                        <th className="text-left text-white p-2">Strike Price</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Offshore Wind</td>
                        <td className="p-2">11GW</td>
                        <td className="p-2">£37.35/MWh</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Solar PV</td>
                        <td className="p-2">3.5GW</td>
                        <td className="p-2">£47.87/MWh</td>
                      </tr>
                      <tr>
                        <td className="p-2">Onshore Wind</td>
                        <td className="p-2">1.5GW</td>
                        <td className="p-2">£52.29/MWh</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Building Regulations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-orange-400" />
                Building Regulations and Permitted Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Building regulations and planning frameworks play a crucial role in enabling renewable energy deployment, particularly for distributed generation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Building Regulations Part L:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>2022 updates:</strong> 31% reduction in carbon emissions for new homes</li>
                    <li>• <strong>Fabric first:</strong> Improved insulation and airtightness standards</li>
                    <li>• <strong>Low carbon heating:</strong> Heat pumps preferred over gas boilers</li>
                    <li>• <strong>EV charging:</strong> Mandatory charge points for new buildings</li>
                    <li>• <strong>Future Homes Standard:</strong> Zero carbon homes from 2025</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Permitted Development Rights:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solar PV:</strong> No planning permission needed for most rooftop installations</li>
                    <li>• <strong>Size limits:</strong> Up to 1MW for non-domestic buildings</li>
                    <li>• <strong>Ground-mounted:</strong> Up to 9m² for domestic properties</li>
                    <li>• <strong>Wind turbines:</strong> Limited permitted development rights</li>
                    <li>• <strong>Heat pumps:</strong> Permitted development with noise considerations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-2">National Planning Policy Framework (NPPF):</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Presumption in favour of sustainable development</li>
                  <li>• Support for renewable and low carbon energy development</li>
                  <li>• Requirement for local authorities to have positive strategies</li>
                  <li>• Landscape and heritage considerations balanced against climate benefits</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Global Climate Frameworks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe2 className="h-6 w-6 text-cyan-400" />
                Global Climate Frameworks and Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                International climate agreements create the global context for national renewable energy policies and drive international cooperation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">EU Green Deal:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Net zero by 2050</li>
                    <li>• 55% emissions reduction by 2030</li>
                    <li>• REPowerEU plan</li>
                    <li>• Green taxonomy regulation</li>
                    <li>• Carbon border adjustment</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">US Inflation Reduction Act:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• $370bn clean energy investment</li>
                    <li>• Production and investment tax credits</li>
                    <li>• Domestic content requirements</li>
                    <li>• Green hydrogen support</li>
                    <li>• Carbon capture incentives</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">COP Agreements:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Paris Agreement (2015)</li>
                    <li>• Global Stocktake process</li>
                    <li>• Loss and damage fund</li>
                    <li>• Transition away from fossil fuels</li>
                    <li>• Technology transfer mechanisms</li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                <h4 className="text-cyan-400 font-semibold mb-3">Key International Initiatives:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">International Renewable Energy Agency (IRENA)</h5>
                    <p className="text-gray-300">Global renewable energy transformation roadmap</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Mission Innovation</h5>
                    <p className="text-gray-300">Accelerating clean energy innovation</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Global Green Growth Institute</h5>
                    <p className="text-gray-300">Supporting green growth in developing countries</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">RE100 Initiative</h5>
                    <p className="text-gray-300">Corporate renewable energy procurement</p>
                  </div>
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
                Policy frameworks are the foundation of renewable energy markets. From legally binding Net Zero targets to specific financial mechanisms like Contracts for Difference, regulations create the conditions for investment, innovation, and deployment. Understanding these frameworks is essential for navigating the renewable energy sector.
              </p>
              <p className="text-yellow-400 font-medium">
                As policies evolve to accelerate decarbonisation, staying informed about regulatory changes and opportunities is crucial for success in the renewable energy industry.
              </p>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-cyan-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What is the difference between Net Zero and carbon neutral?</h4>
                  <p className="text-gray-300 text-sm">
                    Net Zero means balancing all greenhouse gas emissions with removals, while carbon neutral only addresses CO₂. Net Zero is more comprehensive, covering all GHGs (methane, nitrous oxide, etc.) and requires deep decarbonisation rather than just offsetting. It's a more stringent commitment to climate action.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do Contracts for Difference (CfD) protect consumers?</h4>
                  <p className="text-gray-300 text-sm">
                    CfDs provide two-way protection: when market prices are below the strike price, generators receive top-up payments. When market prices exceed the strike price, generators pay back the difference to the Low Carbon Contracts Company, which reduces consumer bills. This shields consumers from both low and high price volatility.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Why are renewable energy costs falling in CfD auctions?</h4>
                  <p className="text-gray-300 text-sm">
                    Competitive auctions drive cost reductions as developers bid against each other. Technology improvements (larger turbines, higher efficiency panels), economies of scale, supply chain optimisation, and lower financing costs due to reduced risk all contribute to falling strike prices.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What planning permissions are needed for solar PV installations?</h4>
                  <p className="text-gray-300 text-sm">
                    Most rooftop solar installations under 1MW require no planning permission under permitted development rights. Ground-mounted systems up to 9m² for homes are also permitted. Larger installations, listed buildings, or conservation areas may require full planning applications and need to consider landscape and heritage impacts.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do international climate policies affect UK renewable development?</h4>
                  <p className="text-gray-300 text-sm">
                    International frameworks like the Paris Agreement set expectations for national climate action. EU policies affect UK-EU energy trading and technology standards. Trade policies and carbon border adjustments can impact supply chains. International cooperation also drives technology transfer and joint research initiatives.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What support is available for community energy projects?</h4>
                  <p className="text-gray-300 text-sm">
                    Community energy groups can access the Smart Export Guarantee for small-scale generation, apply for CfDs for larger projects (though competitive), access local authority sustainability funds, and benefit from community energy loan schemes. The Rural Community Energy Fund also supports feasibility studies and development costs.
                  </p>
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
                Test your understanding of renewable energy policy and regulatory frameworks.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Regulatory Landscape Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Link to="../renewable-energy-module-1-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-1">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module 1
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule1Section4;