import { ArrowLeft, Battery, Zap, BarChart3, Clock, Grid3x3, Lightbulb, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { section3Questions } from '@/data/upskilling/renewableEnergyModule1QuizData';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule1Section3 = () => {
  // Transform quiz data to match SingleQuestionQuiz format
  const quizQuestions = section3Questions.map(q => ({
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
              Renewable Generation vs Energy Storage
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding how storage technologies complement variable renewable generation to ensure grid reliability
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Generation & Storage
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand the mismatch between renewable generation and electricity demand
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn about key energy storage technologies and their characteristics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Grasp how storage systems stabilise the grid and enable higher renewable penetration
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
                Renewable energy systems don't always produce power when it's needed most. Solar panels generate peak power during midday when demand is often lower, while wind turbines produce variable output depending on weather conditions. This fundamental mismatch between when renewable energy is generated and when electricity is demanded creates both challenges and opportunities. Energy storage technologies bridge this gap, allowing renewable energy to be captured when available and released when needed, transforming intermittent renewables into reliable, dispatchable power sources.
              </p>
            </CardContent>
          </Card>

          {/* Solar and Wind Variability */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-400" />
                Solar and Wind Variability Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The variable nature of solar and wind resources creates significant challenges for grid operators and energy planners.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-orange-400 font-semibold mb-3">Solar Variability:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Daily cycles:</strong> Peak generation at midday, zero at night</li>
                    <li>• <strong>Seasonal variation:</strong> Lower output in winter months</li>
                    <li>• <strong>Weather impact:</strong> Clouds can reduce output by 70-90%</li>
                    <li>• <strong>Geographic effects:</strong> Time zone differences affect peak timing</li>
                    <li>• <strong>Predictability:</strong> Weather forecasting enables 1-2 day accuracy</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-orange-400 font-semibold mb-3">Wind Variability:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Diurnal patterns:</strong> Often stronger at night</li>
                    <li>• <strong>Seasonal trends:</strong> Higher in winter months (UK)</li>
                    <li>• <strong>Weather systems:</strong> Associated with pressure changes</li>
                    <li>• <strong>Offshore advantage:</strong> More consistent than onshore</li>
                    <li>• <strong>Ramp rates:</strong> Can change rapidly during storms</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-400 font-semibold mb-2">Impact on Grid Operations:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Curtailment:</strong> Renewable energy wasted when generation exceeds demand and grid flexibility</p>
                  <p><strong>Ramping Requirements:</strong> Conventional plants must rapidly adjust output to compensate for renewable variations</p>
                  <p><strong>Reserve Margins:</strong> Additional backup capacity needed to maintain grid reliability</p>
                  <p><strong>Economic Impacts:</strong> Price volatility and reduced capacity factors for conventional plants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peak Demand vs Peak Generation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-purple-400" />
                Peak Demand vs Peak Generation Mismatch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                The timing mismatch between renewable energy generation and electricity demand is a fundamental challenge that storage helps address.
              </p>
              
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-3">Typical Daily Patterns (UK):</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium mb-2">Electricity Demand:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Morning peak:</strong> 7-9 AM (breakfast, commute)</li>
                      <li>• <strong>Evening peak:</strong> 5-7 PM (highest demand)</li>
                      <li>• <strong>Midday dip:</strong> Lower industrial/office demand</li>
                      <li>• <strong>Night minimum:</strong> 2-5 AM (lowest demand)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Solar Generation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Peak generation:</strong> 12-2 PM (solar noon)</li>
                      <li>• <strong>Morning ramp:</strong> 8-12 PM (increasing output)</li>
                      <li>• <strong>Evening ramp:</strong> 2-7 PM (decreasing output)</li>
                      <li>• <strong>Zero output:</strong> Night hours</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-2">The "Duck Curve" Phenomenon:</h4>
                <p className="text-gray-300 text-sm mb-3">
                  High solar penetration creates a characteristic demand curve resembling a duck's silhouette:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Belly:</strong> Midday demand depression as solar meets daytime load</li>
                  <li>• <strong>Neck:</strong> Steep evening ramp as solar output drops and demand rises</li>
                  <li>• <strong>Head:</strong> Evening peak requiring rapid conventional generation ramp-up</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Storage Technologies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-green-400" />
                Energy Storage Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Various storage technologies address different timescales and applications, from seconds to seasons.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Lithium-ion Batteries:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Duration:</strong> 1-4 hours typically</li>
                    <li>• <strong>Efficiency:</strong> 85-95% round-trip</li>
                    <li>• <strong>Response:</strong> Milliseconds</li>
                    <li>• <strong>Applications:</strong> Grid services, residential</li>
                    <li>• <strong>Costs:</strong> Declining rapidly</li>
                    <li>• <strong>Lifespan:</strong> 10-20 years</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Pumped Hydro Storage:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Duration:</strong> 6-24+ hours</li>
                    <li>• <strong>Efficiency:</strong> 70-85% round-trip</li>
                    <li>• <strong>Response:</strong> Minutes to hours</li>
                    <li>• <strong>Applications:</strong> Bulk energy storage</li>
                    <li>• <strong>Costs:</strong> High capital, low operation</li>
                    <li>• <strong>Lifespan:</strong> 50-100 years</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-green-400 font-semibold mb-3">Thermal Storage:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <strong>Duration:</strong> Hours to days</li>
                    <li>• <strong>Efficiency:</strong> 90-95% for heat</li>
                    <li>• <strong>Response:</strong> Minutes to hours</li>
                    <li>• <strong>Applications:</strong> Heating, industrial</li>
                    <li>• <strong>Costs:</strong> Very low for sensible heat</li>
                    <li>• <strong>Lifespan:</strong> 20-30 years</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-2">Emerging Technologies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Compressed Air Energy Storage (CAES)</h5>
                    <p className="text-gray-300">Uses compressed air in underground caverns</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Liquid Air Energy Storage (LAES)</h5>
                    <p className="text-gray-300">Stores energy by liquefying air</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Gravity Storage</h5>
                    <p className="text-gray-300">Uses potential energy of elevated masses</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Power-to-X</h5>
                    <p className="text-gray-300">Converts electricity to hydrogen or synthetic fuels</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid-scale vs Behind-the-meter */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Grid3x3 className="h-6 w-6 text-yellow-400" />
                Grid-scale vs Behind-the-meter Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Energy storage can be deployed at different scales and locations in the electricity system, each serving distinct purposes.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Grid-scale Storage:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-white font-medium">Characteristics:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Large capacity (10MW to 1GW+)</li>
                        <li>• Connected to transmission network</li>
                        <li>• Utility or merchant owned</li>
                        <li>• Multiple revenue streams</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Applications:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Energy arbitrage (buy low, sell high)</li>
                        <li>• Grid balancing services</li>
                        <li>• Renewable firming</li>
                        <li>• Peak shaving</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Behind-the-meter Storage:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="text-white font-medium">Characteristics:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Smaller capacity (5kWh to 10MWh)</li>
                        <li>• Customer-side of electricity meter</li>
                        <li>• End-user owned or leased</li>
                        <li>• Self-consumption focused</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Benefits:</h5>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Reduced electricity bills</li>
                        <li>• Backup power capability</li>
                        <li>• Solar self-consumption increase</li>
                        <li>• Demand charge reduction</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequency Regulation and Grid Services */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Role in Frequency Regulation and Grid Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Beyond shifting energy in time, storage systems provide valuable grid services that help maintain power quality and system stability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Frequency Services:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Primary response:</strong> Automatic response within seconds to frequency deviations</li>
                    <li>• <strong>Secondary response:</strong> Sustained response for 30 minutes</li>
                    <li>• <strong>Enhanced frequency response:</strong> Sub-second response for grid stability</li>
                    <li>• <strong>Inertia services:</strong> Synthetic inertia from power electronics</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Additional Grid Services:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage support:</strong> Reactive power provision</li>
                    <li>• <strong>Black start capability:</strong> Grid restoration after outages</li>
                    <li>• <strong>Congestion management:</strong> Relieving transmission constraints</li>
                    <li>• <strong>System security:</strong> Fast ramping to maintain stability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-2">Value Stacking:</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Modern storage systems can provide multiple services simultaneously, maximising economic value:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Energy arbitrage + frequency response</li>
                  <li>• Peak shaving + backup power</li>
                  <li>• Solar self-consumption + grid services</li>
                  <li>• Multiple revenue streams improve project economics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Real World Example: Solar + Storage Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A 50MW solar farm in California installs 20MW/80MWh of battery storage to improve project economics and grid compatibility. The storage system captures excess midday solar generation when wholesale prices are low (often negative during spring months) and releases energy during the evening peak when prices are highest.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Project Benefits:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Revenue increase:</strong> 30-40% higher project revenues compared to solar alone</li>
                  <li>• <strong>Grid value:</strong> Transforms intermittent solar into dispatchable resource</li>
                  <li>• <strong>Capacity factor:</strong> Effective solar capacity factor increases from 25% to 35%</li>
                  <li>• <strong>Grid services:</strong> Additional revenue from frequency regulation markets</li>
                </ul>
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
                Generation and storage are two sides of the same coin in a renewable energy system. While renewable technologies provide clean, low-cost electricity, their variable nature requires storage solutions to ensure reliability and maximise value. Storage transforms intermittent renewables into dispatchable resources that can compete with traditional power plants.
              </p>
              <p className="text-yellow-400 font-medium">
                As storage costs continue to decline and technologies mature, the combination of renewables and storage is becoming the lowest-cost option for new electricity supply in many markets.
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
                  <h4 className="text-cyan-400 font-semibold mb-2">Why do we need energy storage if renewable generation is free?</h4>
                  <p className="text-gray-300 text-sm">
                    While the "fuel" is free, renewable energy is often generated when it's not needed and unavailable when it is needed. Storage allows us to capture this free energy when abundant and use it during peak demand periods, dramatically improving the economic and grid value of renewable generation.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How much storage is needed for a fully renewable grid?</h4>
                  <p className="text-gray-300 text-sm">
                    Studies suggest 4-24 hours of storage capacity may be needed for high renewable penetration (80-100%), depending on the renewable mix, demand flexibility, and grid interconnection. However, this is still an active area of research with results varying significantly by location and system design.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What's the difference between power and energy in storage systems?</h4>
                  <p className="text-gray-300 text-sm">
                    Power (MW) is how fast energy can be delivered or absorbed, while energy (MWh) is how much total energy can be stored. A 10MW/40MWh battery can deliver 10MW for 4 hours, or 5MW for 8 hours. The ratio determines whether the system is optimised for short, high-power applications or longer-duration energy shifting.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">Are home batteries worth the investment?</h4>
                  <p className="text-gray-300 text-sm">
                    Home batteries can be economically justified when combined with solar PV, time-of-use tariffs, or backup power requirements. With current UK electricity prices and battery costs, payback periods are typically 8-12 years. However, battery costs continue to fall while electricity prices rise, improving the economics.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">How do storage systems provide frequency regulation?</h4>
                  <p className="text-gray-300 text-sm">
                    When grid frequency deviates from 50Hz (indicating supply-demand imbalance), storage systems can instantly inject or absorb power to restore balance. Their millisecond response time makes them far more effective than traditional generators, which take minutes to respond to frequency signals.
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h4 className="text-cyan-400 font-semibold mb-2">What happens to old EV batteries - can they be used for grid storage?</h4>
                  <p className="text-gray-300 text-sm">
                    Yes! EV batteries retain 70-80% capacity when "retired" from vehicles and can have a second life in stationary storage applications where weight and space are less critical. This creates additional value for EV batteries and potentially lower-cost storage options for grid applications.
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
                Test your understanding of renewable generation and energy storage concepts.
              </p>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Generation vs Storage Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Link to="../renewable-energy-module-1-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-1-section-4">
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

export default RenewableEnergyModule1Section3;