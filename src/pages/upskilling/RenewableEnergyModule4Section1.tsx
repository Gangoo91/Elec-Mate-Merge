import { ArrowLeft, Battery, Zap, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule4Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which battery chemistry is known for thermal stability?",
      options: [
        "Standard Lithium-Ion",
        "Lead-Acid",
        "LFP (Lithium Iron Phosphate)",
        "Flow Batteries"
      ],
      correct: 2,
      explanation: "LFP (Lithium Iron Phosphate) batteries are known for their excellent thermal stability and safety characteristics, making them less prone to thermal runaway compared to other lithium chemistries."
    },
    {
      id: 2,
      question: "What's a typical depth of discharge for lead-acid batteries?",
      options: [
        "20-30%",
        "50-60%",
        "80-90%",
        "95-100%"
      ],
      correct: 1,
      explanation: "Lead-acid batteries typically operate best with a depth of discharge of 50-60% to maintain reasonable cycle life. Deeper discharges significantly reduce their lifespan."
    },
    {
      id: 3,
      question: "What makes flow batteries unique?",
      options: [
        "Highest energy density",
        "Lowest cost per kWh",
        "Scalable energy and power independently",
        "No maintenance required"
      ],
      correct: 2,
      explanation: "Flow batteries are unique because energy capacity and power output can be scaled independently - energy capacity depends on electrolyte volume, while power depends on stack size."
    },
    {
      id: 4,
      question: "Which type has the highest energy density?",
      options: [
        "Lead-Acid",
        "LFP",
        "Standard Lithium-Ion",
        "Flow Batteries"
      ],
      correct: 2,
      explanation: "Standard Lithium-Ion batteries have the highest energy density, typically 150-250 Wh/kg, making them ideal for applications where space and weight are critical."
    },
    {
      id: 5,
      question: "Why might someone choose LFP over standard Li-Ion?",
      options: [
        "Higher energy density",
        "Lower cost",
        "Better safety and longer cycle life",
        "Faster charging"
      ],
      correct: 2,
      explanation: "LFP is chosen over standard Li-Ion for better safety (thermal stability, no thermal runaway risk), longer cycle life (typically 3000-5000 cycles), and more stable performance, despite lower energy density."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Types of Batteries (Li-Ion, Lead-Acid, LFP, Flow)
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding the major battery chemistries and their applications in energy storage systems
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Battery Chemistry
              </Badge>
            </div>
          </div>

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
                  Identify key battery types used in renewable energy systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand each battery type's advantages and limitations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Compare chemistries based on cost, safety, lifespan, and depth of discharge
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Battery technology forms the backbone of modern energy storage systems, enabling the capture and release of electrical energy when needed. This section introduces the major battery chemistries used in renewable energy applications, exploring their unique characteristics, performance metrics, and optimal use cases.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-yellow-400" />
                Lithium-Ion (Li-Ion) Batteries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Lithium-Ion batteries represent the current standard for high-performance energy storage, offering excellent energy density and efficiency characteristics.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>High energy density:</strong> 150-250 Wh/kg</li>
                    <li>• <strong>Long cycle life:</strong> 1000-3000 cycles typical</li>
                    <li>• <strong>Low self-discharge:</strong> &lt;5% per month</li>
                    <li>• <strong>High efficiency:</strong> 95%+ round-trip efficiency</li>
                    <li>• <strong>No memory effect:</strong> Partial charging doesn't reduce capacity</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Limitations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Higher cost:</strong> £300-600/kWh installed</li>
                    <li>• <strong>Thermal sensitivity:</strong> Performance degrades in extreme temperatures</li>
                    <li>• <strong>Safety concerns:</strong> Risk of thermal runaway if damaged</li>
                    <li>• <strong>Complex BMS required:</strong> Sophisticated management systems needed</li>
                    <li>• <strong>Aging characteristics:</strong> Capacity fades over time even when unused</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-400" />
                Lead-Acid Batteries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Lead-acid technology represents the most mature and cost-effective battery solution, available in multiple configurations to suit different applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Flooded Lead-Acid:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Lowest cost:</strong> £80-150/kWh</li>
                    <li>• <strong>Proven reliability:</strong> 150+ years of development</li>
                    <li>• <strong>Maintenance required:</strong> Regular topping up with distilled water</li>
                    <li>• <strong>Ventilation needed:</strong> Hydrogen gas emission during charging</li>
                    <li>• <strong>Cycle life:</strong> 300-800 cycles at 50% DoD</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">AGM (Absorbed Glass Mat):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Sealed design:</strong> No maintenance required</li>
                    <li>• <strong>Better performance:</strong> Higher discharge rates possible</li>
                    <li>• <strong>Spill-proof:</strong> Can be mounted in any orientation</li>
                    <li>• <strong>Moderate cost:</strong> £120-200/kWh</li>
                    <li>• <strong>Cycle life:</strong> 400-1000 cycles at 50% DoD</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Gel Batteries:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Deep cycle capability:</strong> Best lead-acid option for regular cycling</li>
                    <li>• <strong>Temperature tolerance:</strong> Performs better in extreme temperatures</li>
                    <li>• <strong>Slow charging:</strong> Lower charge acceptance rates</li>
                    <li>• <strong>Higher cost:</strong> £150-250/kWh</li>
                    <li>• <strong>Cycle life:</strong> 500-1200 cycles at 50% DoD</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-orange-400" />
                LFP (Lithium Iron Phosphate) Batteries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                LFP batteries offer the best balance of safety, longevity, and performance for stationary energy storage applications, making them increasingly popular for renewable energy systems.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Safety Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Thermal stability:</strong> No thermal runaway risk</li>
                    <li>• <strong>Chemical stability:</strong> Phosphate cathode is inherently stable</li>
                    <li>• <strong>No toxic gas emission:</strong> Safe for indoor installation</li>
                    <li>• <strong>Wide temperature range:</strong> -20°C to +60°C operation</li>
                    <li>• <strong>Overcharge tolerance:</strong> More forgiving of charging errors</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Performance Characteristics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Long cycle life:</strong> 3000-5000 cycles at 80% DoD</li>
                    <li>• <strong>Flat discharge curve:</strong> Consistent voltage throughout discharge</li>
                    <li>• <strong>Fast charging:</strong> 1C charge rates possible</li>
                    <li>• <strong>Low self-discharge:</strong> &lt;3% per month</li>
                    <li>• <strong>Energy density:</strong> 90-120 Wh/kg</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-purple-400" />
                Flow Batteries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Flow batteries offer unique advantages for large-scale, long-duration energy storage applications where scalability and longevity are more important than energy density.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Unique Architecture:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Separate power and energy:</strong> Independent scaling possible</li>
                    <li>• <strong>External electrolyte:</strong> Energy stored in liquid tanks</li>
                    <li>• <strong>Pump-driven circulation:</strong> Electrolyte flows through reaction stack</li>
                    <li>• <strong>Modular design:</strong> Easy capacity expansion</li>
                    <li>• <strong>No degradation:</strong> Electrolyte doesn't wear out</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Applications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Grid-scale storage:</strong> MW-scale installations</li>
                    <li>• <strong>Long duration:</strong> 4-12 hour discharge capability</li>
                    <li>• <strong>Load shifting:</strong> Daily energy arbitrage</li>
                    <li>• <strong>Renewable integration:</strong> Smoothing variable generation</li>
                    <li>• <strong>Backup power:</strong> Extended duration emergency supply</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Battery Chemistry Comparison Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white p-2">Chemistry</th>
                      <th className="text-left text-white p-2">Cycle Life</th>
                      <th className="text-left text-white p-2">Cost/kWh</th>
                      <th className="text-left text-white p-2">DoD</th>
                      <th className="text-left text-white p-2">Maintenance</th>
                      <th className="text-left text-white p-2">Safety</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Lead-Acid</td>
                      <td className="p-2">300-1200</td>
                      <td className="p-2">£80-250</td>
                      <td className="p-2">50-60%</td>
                      <td className="p-2">Regular</td>
                      <td className="p-2">Good</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Li-Ion</td>
                      <td className="p-2">1000-3000</td>
                      <td className="p-2">£300-600</td>
                      <td className="p-2">80-90%</td>
                      <td className="p-2">Minimal</td>
                      <td className="p-2">Moderate</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">LFP</td>
                      <td className="p-2">3000-5000</td>
                      <td className="p-2">£200-400</td>
                      <td className="p-2">80-95%</td>
                      <td className="p-2">Minimal</td>
                      <td className="p-2">Excellent</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Flow</td>
                      <td className="p-2">10000+</td>
                      <td className="p-2">£400-800</td>
                      <td className="p-2">100%</td>
                      <td className="p-2">Moderate</td>
                      <td className="p-2">Excellent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Battery Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Emerging battery technologies are pushing the boundaries of energy storage performance, offering new possibilities for renewable energy applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Solid-State Batteries:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Solid electrolyte:</strong> No liquid components, improved safety</li>
                    <li>• <strong>Higher energy density:</strong> 2-3x improvement potential</li>
                    <li>• <strong>Extended temperature range:</strong> -40°C to +100°C operation</li>
                    <li>• <strong>Longer cycle life:</strong> 10,000+ cycles projected</li>
                    <li>• <strong>Commercial timeline:</strong> 2025-2030 for stationary applications</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Sodium-Ion Batteries:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Abundant materials:</strong> Sodium is widely available</li>
                    <li>• <strong>Cost advantage:</strong> 20-30% lower than lithium</li>
                    <li>• <strong>Safety benefits:</strong> Non-flammable electrolyte</li>
                    <li>• <strong>Temperature tolerance:</strong> Better low-temperature performance</li>
                    <li>• <strong>Current status:</strong> Commercial deployment beginning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Battery Testing and Certification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding battery testing standards and certification requirements ensures safe, reliable system deployment and compliance with regulations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Safety Standards:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>IEC 62619:</strong> Safety for lithium cells and batteries</li>
                    <li>• <strong>UN38.3:</strong> Transport safety testing</li>
                    <li>• <strong>UL 9540:</strong> Energy storage systems safety</li>
                    <li>• <strong>IEC 61215:</strong> Photovoltaic module qualification</li>
                    <li>• <strong>BS EN 50272:</strong> Secondary battery installations</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Performance Testing:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Capacity verification:</strong> IEC 61427 cycling tests</li>
                    <li>• <strong>Efficiency measurements:</strong> Round-trip efficiency validation</li>
                    <li>• <strong>Temperature testing:</strong> Performance across operating range</li>
                    <li>• <strong>Cycle life testing:</strong> Long-term degradation assessment</li>
                    <li>• <strong>Calendar life testing:</strong> Storage aging evaluation</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Certification Bodies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>DNV GL:</strong> Global energy testing and certification</li>
                    <li>• <strong>TÜV Rheinland:</strong> International safety certification</li>
                    <li>• <strong>Intertek:</strong> Quality assurance and testing</li>
                    <li>• <strong>UL (Underwriters Laboratories):</strong> Safety certification</li>
                    <li>• <strong>DEKRA:</strong> Testing and inspection services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Tesla Megapack at Hornsdale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Hornsdale Power Reserve in South Australia demonstrates large-scale lithium-ion battery deployment, showcasing the potential of grid-scale storage systems.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">System Specifications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Technical Details:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Initial capacity: 100MW/129MWh</li>
                      <li>• Expanded to: 150MW/194MWh</li>
                      <li>• Tesla Megapack technology</li>
                      <li>• Grid-scale frequency regulation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Performance Results:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Response time: 140ms to full power</li>
                      <li>• Availability: &gt;99% operational uptime</li>
                      <li>• Revenue: $24M+ in first two years</li>
                      <li>• Grid stability: Significant frequency regulation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Economic and Technical Impact:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Grid services:</strong> Faster response than conventional generators</li>
                  <li>• <strong>Cost reduction:</strong> Reduced need for expensive peaking plants</li>
                  <li>• <strong>Renewable integration:</strong> Supports increased wind energy penetration</li>
                  <li>• <strong>Market demonstration:</strong> Proved commercial viability of grid-scale storage</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Each battery chemistry serves different applications based on specific requirements. Lead-acid remains cost-effective for basic applications, while lithium technologies offer superior performance. Understanding emerging technologies, testing standards, and real-world deployments enables informed decision-making for renewable energy projects.
              </p>
              <p className="text-yellow-400 font-medium">
                Choose battery chemistry based on project needs, safety requirements, cost constraints, expected cycle life, and future technology developments.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Battery Types Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule4Section1;