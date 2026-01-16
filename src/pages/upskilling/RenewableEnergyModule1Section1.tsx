import { ArrowLeft, Lightbulb, Leaf, Shield, Zap, TrendingUp, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section1Questions } from '@/data/upskilling/renewableEnergyModule1QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule1Section1 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section1Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Introduction to Renewables – The Need, Benefits & Grid Impact
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding the environmental, economic, and energy security drivers behind renewable energy adoption
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Foundation Knowledge
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
                  Understand the environmental, economic, and energy security drivers for renewable adoption
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Recognise the benefits of renewable energy systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify challenges introduced to the national grid by renewable integration
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
                Renewable energy is at the heart of the global shift toward sustainability. As climate change concerns intensify and energy security becomes increasingly important, renewable technologies offer a path to a cleaner, more resilient energy future. This section introduces the core reasons why renewables are essential and explores how they fundamentally impact our energy infrastructure and grid systems.
              </p>
            </CardContent>
          </Card>

          {/* Climate Change and Carbon Reduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-400" />
                Climate Change and Carbon Reduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The primary environmental driver for renewable energy adoption is the urgent need to reduce greenhouse gas emissions. Traditional fossil fuel power generation is responsible for approximately 25% of global greenhouse gas emissions.
              </p>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Key Environmental Benefits:</h4>
                <ul className="text-gray-300 space-y-1">
                  <li>• Zero operational carbon emissions from wind, solar, and hydro</li>
                  <li>• Significant reduction in air pollution and particulate matter</li>
                  <li>• Minimal water consumption compared to thermal power plants</li>
                  <li>• Reduced environmental degradation from fuel extraction</li>
                </ul>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Life-cycle analysis shows that renewable technologies have carbon footprints 10-50 times lower than fossil fuel alternatives when considering manufacturing, operation, and decommissioning phases.
              </p>
            </CardContent>
          </Card>

          {/* Energy Independence and Resilience */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Energy Independence and Resilience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Energy security has become a critical national priority, particularly following recent geopolitical events that have highlighted the risks of fossil fuel dependence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Economic Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Reduced exposure to volatile fuel prices</li>
                    <li>• Lower long-term operational costs</li>
                    <li>• Job creation in green industries</li>
                    <li>• Reduced trade deficits from fuel imports</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-semibold mb-2">Security Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Domestic resource utilisation</li>
                    <li>• Reduced geopolitical risks</li>
                    <li>• Enhanced supply chain resilience</li>
                    <li>• Strategic independence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decentralised Generation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Renewables' Role in Decentralised Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Traditional power systems rely on large, centralised power stations that transmit electricity over long distances. Renewable energy enables a shift towards decentralised generation, where power is produced closer to where it's consumed.
              </p>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-white font-semibold mb-3">Decentralised Generation Characteristics:</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-yellow-400 font-medium">Scale and Location</h5>
                    <p className="text-gray-300 text-sm">Small to medium-scale installations (1kW to 50MW) located at or near consumption points</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-medium">Grid Connection</h5>
                    <p className="text-gray-300 text-sm">Connected to distribution networks rather than transmission systems</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-400 font-medium">Benefits</h5>
                    <p className="text-gray-300 text-sm">Reduced transmission losses, improved local resilience, faster deployment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid Impact */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-400" />
                Impact on Grid Stability, Balancing, and Flexibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                While renewables offer significant benefits, their integration presents new challenges for grid operation and stability. Understanding these challenges is crucial for successful renewable deployment.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Challenges:</h4>
                  <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    <h5 className="text-red-400 font-medium mb-1">Intermittency</h5>
                    <p className="text-gray-300 text-sm">Variable output from wind and solar requires backup systems and storage</p>
                  </div>
                  <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    <h5 className="text-red-400 font-medium mb-1">Forecasting</h5>
                    <p className="text-gray-300 text-sm">Weather-dependent generation makes accurate prediction challenging</p>
                  </div>
                  <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    <h5 className="text-red-400 font-medium mb-1">Grid Stability</h5>
                    <p className="text-gray-300 text-sm">Maintaining frequency and voltage within acceptable limits</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Solutions:</h4>
                  <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-1">Smart Grids</h5>
                    <p className="text-gray-300 text-sm">Advanced monitoring and control systems for real-time management</p>
                  </div>
                  <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-1">Energy Storage</h5>
                    <p className="text-gray-300 text-sm">Battery systems and pumped hydro to smooth output variations</p>
                  </div>
                  <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-1">Demand Response</h5>
                    <p className="text-gray-300 text-sm">Flexible consumption to match variable generation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Real World Example: UK Solar Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                The UK's increased solar capacity has fundamentally changed grid load profiles. During sunny days, solar generation significantly reduces midday demand from traditional power stations, creating what's known as the "duck curve" - where conventional generation must ramp down during the day and rapidly ramp up in the evening as solar output decreases. This has required grid operators to develop new balancing strategies and invest in flexible generation and storage technologies.
              </p>
              <div className="mt-4 p-3 bg-card rounded-lg">
                <p className="text-yellow-400 text-sm font-medium">Key Impact: Peak demand timing has shifted from midday to early evening, requiring new grid management approaches.</p>
              </div>
            </CardContent>
          </Card>

          {/* Comparison with Fossil Fuels */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Comparison with Fossil Fuel-Based Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white p-2">Aspect</th>
                      <th className="text-left text-green-400 p-2">Renewables</th>
                      <th className="text-left text-red-400 p-2">Fossil Fuels</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Fuel Cost</td>
                      <td className="p-2">Free (sun, wind, water)</td>
                      <td className="p-2">Variable market prices</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Emissions</td>
                      <td className="p-2">Zero operational</td>
                      <td className="p-2">Significant CO₂, NOₓ, SO₂</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Predictability</td>
                      <td className="p-2">Weather dependent</td>
                      <td className="p-2">Highly controllable</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Ramp Rate</td>
                      <td className="p-2">Variable by technology</td>
                      <td className="p-2">Fast (gas), slow (coal)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Lifespan</td>
                      <td className="p-2">20-30 years</td>
                      <td className="p-2">30-50 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                  <h4 className="text-cyan-400 font-semibold mb-2">Why is renewable energy considered essential for climate action?</h4>
                  <p className="text-gray-300 text-sm">
                    Renewable energy produces zero operational carbon emissions and can reduce electricity sector emissions by 85-95%. With electricity generation responsible for about 25% of global greenhouse gas emissions, the transition to renewables is crucial for meeting climate targets and limiting global warming to 1.5°C.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do renewables improve energy security?</h4>
                  <p className="text-gray-300 text-sm">
                    Renewables use domestic resources (sun, wind, water) that can't be weaponised or subjected to price manipulation by other countries. This reduces dependence on volatile fossil fuel imports, creates local jobs, and provides price stability over the long term since the "fuel" is free.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What is the "duck curve" and why does it matter?</h4>
                  <p className="text-gray-300 text-sm">
                    The duck curve describes how net electricity demand changes when solar generation is high during midday but drops as the sun sets, creating a steep evening ramp. This challenges grid operators who must rapidly increase conventional generation to meet rising evening demand, highlighting the need for storage and flexible resources.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Are renewables really cheaper than fossil fuels?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes, in most regions renewables are now the cheapest source of new electricity generation. Solar and wind costs have fallen 85% and 70% respectively since 2010. However, the total system costs including grid integration, storage, and flexibility services must be considered for fair comparison.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do renewables affect local communities?</h4>
                  <p className="text-gray-300 text-sm">
                    Renewables can bring significant benefits including local job creation, lease payments to landowners, business rates for local councils, and community benefit funds. However, they can also raise concerns about visual impact, noise, and land use that require careful planning and community engagement to address.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What happens when the wind doesn't blow and the sun doesn't shine?</h4>
                  <p className="text-gray-300 text-sm">
                    This challenge is addressed through a combination of: energy storage (batteries, pumped hydro), demand flexibility (smart appliances, industrial load shifting), grid interconnection (importing from areas with better conditions), and maintaining some dispatchable generation (gas, biomass) for backup during extended low renewable periods.
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
                Test your understanding of renewable energy fundamentals and their grid impact.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Introduction to Renewables Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <div></div>
            <Link to="../renewable-energy-module-1-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
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

export default RenewableEnergyModule1Section1;