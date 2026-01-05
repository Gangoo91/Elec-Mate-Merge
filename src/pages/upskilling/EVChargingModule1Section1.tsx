import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule1Section1 = () => {
  const quizQuestions = evModule1Section1Questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  }));

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="../ev-charging-module-1">
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
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  EV Basics and Charging Principles
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding electric vehicle charging fundamentals
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 1
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Electric vehicles (EVs) are transforming the transport industry, offering a cleaner alternative to traditional internal combustion engine vehicles. As EV adoption grows, so does the need for skilled professionals who understand EV charging principles.
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-blue-200">
                  <strong className="text-blue-300">Did you know?</strong> The UK government plans to ban the sale of new petrol and diesel cars by 2030, making EV charging infrastructure critical for the future.
                </p>
              </div>
              <p>
                This section provides a foundation in EV operation and charging — covering battery technology, charging types, safety, and key considerations for installation.
              </p>
              <p>
                Whether working on domestic or commercial sites, understanding EV charging basics is essential for compliance, safety, and efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm text-white mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Explain the basic operating principles of electric vehicles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Describe the different EV charging levels and connector types</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Understand AC and DC charging differences</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Identify safety and regulatory requirements for EV charging installations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Recognise factors affecting charging speed and efficiency</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">How EVs Work – The Basics</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">How Electric Vehicles Actually Work</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-card p-3 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-yellow-400 font-semibold">Electric Motor Power:</span>
                    <span className="ml-2">EVs are powered by electric motors drawing energy from rechargeable lithium-ion battery packs. These motors are incredibly efficient, converting about 85-90% of electrical energy into motion.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-card p-3 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-yellow-400 font-semibold">Motor Controller:</span>
                    <span className="ml-2">The motor controller manages power delivery based on driver input, acting like the 'brain' that determines how much power flows from the battery to the motor.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-card p-3 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-yellow-400 font-semibold">Regenerative Braking:</span>
                    <span className="ml-2">During deceleration, the motor works in reverse as a generator, converting kinetic energy back to electricity and returning it to the battery - extending range by up to 20%.</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Charging Levels Explained</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="text-red-300 font-bold mb-3 text-lg">Level 1 (Slow)</h4>
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                       <span className="text-white">Supply:</span>
                       <span className="text-white">230V AC single-phase</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Current:</span>
                       <span className="text-white">10–16A</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Time:</span>
                       <span className="text-white">6–12 hours</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Use case:</span>
                       <span className="text-white">Overnight home charging</span>
                     </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="text-yellow-300 font-bold mb-3 text-lg">Level 2 (Fast)</h4>
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                       <span className="text-white">Supply:</span>
                       <span className="text-white">230V/400V AC</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Current:</span>
                       <span className="text-white">16–32A</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Time:</span>
                       <span className="text-white">3–6 hours</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Use case:</span>
                       <span className="text-white">Home & workplace</span>
                     </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-green-300 font-bold mb-3 text-lg">Level 3 (Rapid)</h4>
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                       <span className="text-white">Supply:</span>
                       <span className="text-white">DC direct current</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Power:</span>
                       <span className="text-white">50–350kW</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Time:</span>
                       <span className="text-white">20–60 min</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-white">Use case:</span>
                       <span className="text-white">Motorway services</span>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/30 p-4 rounded-lg border border-yellow-400">
                <h5 className="text-blue-300 font-semibold mb-2">Professional Tip:</h5>
                <p className="text-blue-200 text-sm">
                  Most domestic installations use Level 2 charging as it provides the best balance of charging speed and installation cost. Level 1 is too slow for daily use, while Level 3 requires expensive infrastructure.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Connector Types - Know Your Plugs</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <span className="text-yellow-400 font-bold text-lg">Type 1</span>
                   <p className="text-white text-sm mt-2">Single-phase AC connector, mainly found on older EV models (pre-2018). Becoming less common in the UK market.</p>
                   <div className="text-xs text-white mt-2 bg-gray-800 p-2 rounded">
                     <strong>Common on:</strong> Older Nissan Leaf, some imports
                   </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <span className="text-yellow-400 font-bold text-lg">Type 2</span>
                   <p className="text-white text-sm mt-2">The European standard! Supports both single and three-phase AC charging. Most versatile connector.</p>
                   <div className="text-xs text-white mt-2 bg-gray-800 p-2 rounded">
                     <strong>Common on:</strong> BMW, Audi, Mercedes, Tesla Model S/X
                   </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <span className="text-yellow-400 font-bold text-lg">CHAdeMO</span>
                   <p className="text-white text-sm mt-2">Japanese rapid DC charging standard. Reliable but being phased out in favour of CCS.</p>
                   <div className="text-xs text-white mt-2 bg-gray-800 p-2 rounded">
                     <strong>Common on:</strong> Nissan Leaf, Mitsubishi Outlander
                   </div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <span className="text-yellow-400 font-bold text-lg">CCS</span>
                   <p className="text-white text-sm mt-2">Combined Charging System - the future! Handles both AC and DC in one connector. European standard.</p>
                   <div className="text-xs text-white mt-2 bg-gray-800 p-2 rounded">
                     <strong>Common on:</strong> BMW i3, Volkswagen ID series, most new EVs
                   </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <span className="text-yellow-400 font-bold text-lg">Tesla Supercharger</span>
                 <p className="text-white text-sm mt-2">Proprietary high-speed DC network. Tesla vehicles only (though Tesla is opening up to other brands with adapters).</p>
                 <div className="text-xs text-white mt-2 bg-gray-800 p-2 rounded">
                   <strong>Note:</strong> Tesla is transitioning to CCS in Europe
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">AC vs DC Charging - Understanding the Difference</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-card p-4 sm:p-6 rounded-lg border border-yellow-400">
                  <h4 className="text-blue-300 font-bold mb-4 text-lg sm:text-xl">AC Charging (Alternating Current)</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Electricity comes from the grid as AC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Vehicle's onboard charger converts AC to DC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Charging speed limited by onboard charger capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                      <span>Cheaper infrastructure, perfect for overnight charging</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-900/30 rounded text-blue-200 text-xs">
                    <strong>Best for:</strong> Home, workplace, and destination charging
                  </div>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-lg border border-green-500">
                  <h4 className="text-green-300 font-bold mb-4 text-lg sm:text-xl">DC Charging (Direct Current)</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                      <span>Charger converts AC to DC before reaching vehicle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                      <span>Bypasses onboard charger completely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                      <span>Much higher power delivery possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                      <span>Expensive infrastructure, requires dedicated equipment</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-900/30 rounded text-green-200 text-xs">
                    <strong>Best for:</strong> Rapid charging during long journeys
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-400">
                <h5 className="text-yellow-300 font-semibold mb-2">Key Installation Insight:</h5>
                <p className="text-yellow-200 text-sm">
                  AC charging installations are much simpler and cheaper because they use standard electrical supply. DC charging requires specialized power electronics and costs £20,000-£150,000+ per unit, making it unsuitable for most domestic applications.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Factors Affecting Charging Speed</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h5 className="text-yellow-400 font-semibold mb-3">Infrastructure Factors</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <span><strong>Supply voltage:</strong> Higher voltage = faster charging (400V three-phase vs 230V single-phase)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <span><strong>Current capacity:</strong> Limited by cables, MCBs, and supply capacity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <span><strong>Charger rating:</strong> A 7kW charger can't exceed 7kW regardless of supply</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h5 className="text-yellow-400 font-semibold mb-3">Vehicle Factors</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <span><strong>Battery capacity:</strong> Larger batteries take longer to charge to 100%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <span><strong>Onboard charger:</strong> Many vehicles limited to 7kW even on 22kW supply</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      <span><strong>Battery management:</strong> System protects battery health by controlling charge rate</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-semibold mb-3">Environmental Factors</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-white">Temperature Effects:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Cold weather (below 0°C): 20-40% slower charging</li>
                      <li>• Hot weather (above 35°C): Battery cooling reduces charge rate</li>
                      <li>• Optimal range: 15-25°C for maximum charging speed</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-white">State of Charge (SoC):</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• 0-50%: Maximum charging speed</li>
                      <li>• 50-80%: Gradual speed reduction</li>
                      <li>• 80-100%: Significantly slower for battery protection</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500">
                <h5 className="text-green-300 font-semibold mb-2">Real-World Example:</h5>
                <p className="text-green-200 text-sm">
                  A BMW i3 with a 7kW onboard charger will charge at 7kW maximum, even when connected to a 22kW public charger. The charging speed is always limited by the weakest link in the chain!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Safety and Compliance - Critical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-500 mb-4">
                <h5 className="text-red-300 font-bold mb-2">Legal Requirement</h5>
                <p className="text-red-200 text-sm">
                  All EV charging installations MUST comply with BS 7671 Section 722. Non-compliance can result in insurance invalidation, safety hazards, and legal liability.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h5 className="text-yellow-400 font-semibold mb-3">Protection Requirements</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>RCD Protection:</strong> Type A (minimum) or Type B (DC fault protection)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>MCB Rating:</strong> Correctly sized for continuous load (125% rule)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>Cable Rating:</strong> Must handle continuous current + ambient derating</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h5 className="text-yellow-400 font-semibold mb-3">Earthing Considerations</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>PME Restrictions:</strong> Earth electrode may be required for outdoor installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>Open PEN Detection:</strong> Built-in protection on most modern chargers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>Equipotential Bonding:</strong> All metalwork must be properly bonded</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-semibold mb-3">Installation Standards</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>IP Rating:</strong> Minimum IP54 for outdoor units</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>Cable Management:</strong> SWA cable or proper conduit systems</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>Isolation:</strong> Local isolator within 2m of charge point</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                      <span><strong>Testing:</strong> Full electrical installation testing required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real-World Case Study</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="bg-red-900/30 p-6 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-4">
                  <div className="bg-red-600/30 p-3 rounded-full">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h4 className="text-red-300 font-bold text-lg mb-3">Installation Failure Case Study</h4>
                    <div className="space-y-3 text-sm">
                      <p className="text-red-200">
                        <strong>The Problem:</strong> A residential 7kW EV charger installation failed its inspection because the installer didn't address PME earthing requirements for the outdoor charging unit.
                      </p>
                      <p className="text-orange-200">
                        <strong>The Issue:</strong> BS 7671 requires special earthing arrangements for EV charging points, particularly where PME (Protective Multiple Earthing) supplies are used with outdoor equipment.
                      </p>
                      <p className="text-green-200">
                        <strong>The Solution:</strong> The charger was replaced with a model featuring built-in open PEN fault detection, eliminating the need for a separate earth electrode while ensuring full compliance with BS 7671.
                      </p>
                      <div className="bg-yellow-900/30 p-3 rounded mt-4 border border-yellow-600">
                        <p className="text-yellow-200">
                          <strong>Key Lesson:</strong> Always check PME earthing requirements before installation. Modern charge points with integrated protection can simplify compliance significantly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Q: Can I plug an EV directly into a standard 13 A socket?</h4>
                <p>A: Yes, but charging will be slow (Level 1) and may not be ideal for long-term use.</p>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Q: Do all EVs support rapid charging?</h4>
                <p>A: No — the vehicle must have the appropriate battery management system and charging port.</p>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Q: Is three-phase power required for home EV chargers?</h4>
                <p>A: No — most domestic chargers use single-phase, but three-phase allows faster charging if available.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p>
                EV basics and charging principles cover the key concepts needed to safely and efficiently charge electric vehicles. Understanding charging levels, connector types, and safety requirements ensures installations meet both user needs and regulatory standards.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Test Your Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="EV Basics and Charging Principles Quiz"
              />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div></div>
            <Link to="../ev-charging-module-1-section-2">
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

export default EVChargingModule1Section1;