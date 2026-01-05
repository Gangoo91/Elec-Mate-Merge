import { ArrowLeft, Cable, Zap, ArrowRight, BarChart3, CheckCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule4Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which system is easier to retrofit: DC or AC coupling?",
      options: [
        "DC coupling is easier",
        "AC coupling is easier to retrofit",
        "Both are equally difficult",
        "Neither can be retrofitted"
      ],
      correct: 1,
      explanation: "AC coupling is much easier to retrofit because it can be added to existing solar installations without modifying the original PV inverter. The battery system connects on the AC side with its own inverter."
    },
    {
      id: 2,
      question: "Where does the battery connect in a DC coupled system?",
      options: [
        "After the inverter on the AC side",
        "Before the inverter on the DC side",
        "Directly to the grid",
        "Through a separate DC-AC converter"
      ],
      correct: 1,
      explanation: "In DC coupled systems, the battery connects before the inverter on the DC side, sharing the same inverter with the solar panels. This allows direct DC-DC energy transfer between panels and battery."
    },
    {
      id: 3,
      question: "What's the impact of multiple conversions on AC coupled systems?",
      options: [
        "Improves system efficiency",
        "Reduces system cost",
        "Causes efficiency losses due to multiple DC-AC-DC conversions",
        "Has no impact on performance"
      ],
      correct: 2,
      explanation: "AC coupled systems suffer efficiency losses from multiple power conversions: DC-AC (PV inverter), AC-DC (battery charger), and DC-AC (battery inverter). Each conversion step loses 2-5% efficiency."
    },
    {
      id: 4,
      question: "Which system offers better round-trip efficiency?",
      options: [
        "AC coupled systems",
        "DC coupled systems",
        "Both have identical efficiency",
        "Efficiency depends only on battery type"
      ],
      correct: 1,
      explanation: "DC coupled systems typically offer better round-trip efficiency (92-96%) because energy flows directly between PV and battery on the DC side, eliminating unnecessary AC-DC conversions that occur in AC coupled systems."
    },
    {
      id: 5,
      question: "Can both coupling types work with hybrid inverters?",
      options: [
        "Only DC coupling works with hybrid inverters",
        "Only AC coupling works with hybrid inverters",
        "Yes, hybrid inverters can support both coupling architectures",
        "Hybrid inverters are incompatible with both systems"
      ],
      correct: 2,
      explanation: "Modern hybrid inverters can support both coupling types: they have DC inputs for direct PV and battery connection (DC coupling) and can also work with AC-coupled battery systems through their AC connections."
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
              DC Coupled vs AC Coupled Storage Systems
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding different battery system architectures and their applications
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                System Architecture
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
                  Define the differences between DC and AC coupled battery systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Compare efficiency, cost, and retrofit potential of each approach
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Choose the appropriate coupling method based on project requirements
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
                Battery systems can be integrated into solar or grid installations using either DC or AC coupling architectures. Each approach has distinct advantages and limitations, making the choice dependent on specific project requirements, existing infrastructure, and performance priorities.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-6 w-6 text-yellow-400" />
                DC Coupled Systems Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                In DC coupled systems, the battery connects before the inverter on the DC side, sharing the same power conversion equipment with the solar array.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">System Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>PV array:</strong> Solar panels connected to DC combiner</li>
                    <li>• <strong>Charge controller:</strong> MPPT controller for battery charging</li>
                    <li>• <strong>Battery bank:</strong> DC storage system with BMS</li>
                    <li>• <strong>Hybrid inverter:</strong> Combined PV and battery inverter</li>
                    <li>• <strong>DC disconnect:</strong> Safety isolation switches</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Higher efficiency:</strong> Direct DC-DC energy transfer</li>
                    <li>• <strong>Simplified design:</strong> Single inverter for PV and battery</li>
                    <li>• <strong>Lower cost:</strong> Fewer power conversion components</li>
                    <li>• <strong>Coordinated control:</strong> Unified system management</li>
                    <li>• <strong>Compact installation:</strong> Reduced equipment footprint</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">DC System Energy Flow:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">PV Array</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="px-2 py-1 bg-yellow-400 text-blue-100 rounded text-xs">DC Combiner</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-xs">Charge Controller</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="px-2 py-1 bg-purple-600 text-purple-100 rounded text-xs">Battery/Inverter</span>
                  </div>
                  <p><strong>Direct DC charging:</strong> Energy flows directly from panels to battery without AC conversion</p>
                  <p><strong>Load supply:</strong> Battery and PV can simultaneously supply loads through shared inverter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-400" />
                AC Coupled Systems Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                AC coupled systems connect the battery storage after separate inverters, allowing independent operation of PV and battery systems on the AC side.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">System Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>PV inverter:</strong> Standard solar inverter (existing or new)</li>
                    <li>• <strong>Battery inverter:</strong> Separate bidirectional inverter</li>
                    <li>• <strong>Battery system:</strong> Independent storage with BMS</li>
                    <li>• <strong>AC panel:</strong> Common AC connection point</li>
                    <li>• <strong>Smart meter:</strong> Energy flow monitoring</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Key Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Easy retrofit:</strong> Add to existing PV systems</li>
                    <li>• <strong>Independent sizing:</strong> PV and battery sized separately</li>
                    <li>• <strong>System flexibility:</strong> Different manufacturers/technologies</li>
                    <li>• <strong>Modular expansion:</strong> Easy to add more battery capacity</li>
                    <li>• <strong>Maintenance independence:</strong> Systems can be serviced separately</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">AC System Energy Flow:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">PV Array</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="px-2 py-1 bg-orange-600 text-orange-100 rounded text-xs">PV Inverter</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="px-2 py-1 bg-yellow-400 text-blue-100 rounded text-xs">AC Panel</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="px-2 py-1 bg-purple-600 text-purple-100 rounded text-xs">Battery Inverter</span>
                  </div>
                  <p><strong>AC charging:</strong> Excess PV power converted DC→AC→DC to charge battery</p>
                  <p><strong>Load supply:</strong> Battery power converted DC→AC to supply loads</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-orange-400" />
                Efficiency Comparison and Conversion Losses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding conversion losses is crucial for system design and economic analysis, as efficiency differences compound over the system lifetime.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">DC Coupling Efficiency:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>PV to battery:</strong> 95-98% (direct DC transfer)</li>
                    <li>• <strong>Battery to load:</strong> 94-97% (single DC-AC conversion)</li>
                    <li>• <strong>Round-trip efficiency:</strong> 92-96% typical</li>
                    <li>• <strong>PV to load (direct):</strong> 94-97% efficiency</li>
                    <li>• <strong>Minimal conversion steps:</strong> Fewer efficiency losses</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">AC Coupling Efficiency:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>PV to battery:</strong> 88-92% (DC-AC-DC conversion)</li>
                    <li>• <strong>Battery to load:</strong> 94-97% (DC-AC conversion)</li>
                    <li>• <strong>Round-trip efficiency:</strong> 85-90% typical</li>
                    <li>• <strong>PV to load (direct):</strong> 94-97% efficiency</li>
                    <li>• <strong>Multiple conversions:</strong> Cumulative efficiency losses</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Economic Impact of Efficiency:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Annual Energy Impact:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 5kWh daily cycling at 5% efficiency difference</li>
                      <li>• Annual loss: ~90 kWh more with AC coupling</li>
                      <li>• Value at 15p/kWh: £13.50/year difference</li>
                      <li>• 20-year impact: £270 additional cost</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">System Sizing Impact:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• AC systems may require larger battery capacity</li>
                      <li>• PV array may need upsizing to compensate</li>
                      <li>• Consider lifecycle efficiency in ROI calculations</li>
                      <li>• Efficiency gains compound over system life</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-purple-400" />
                Application Examples and Selection Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Choosing between DC and AC coupling depends on project-specific factors including existing infrastructure, system requirements, and future expansion plans.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">DC Coupling Best For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>New installations:</strong> Designing from scratch</li>
                    <li>• <strong>High cycling applications:</strong> Daily charge/discharge</li>
                    <li>• <strong>Off-grid systems:</strong> Maximum efficiency critical</li>
                    <li>• <strong>Cost-sensitive projects:</strong> Minimizing equipment costs</li>
                    <li>• <strong>Compact installations:</strong> Limited space available</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">AC Coupling Best For:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Retrofit projects:</strong> Adding storage to existing PV</li>
                    <li>• <strong>Phased installations:</strong> PV first, battery later</li>
                    <li>• <strong>Different orientations:</strong> PV and battery optimization</li>
                    <li>• <strong>Modular expansion:</strong> Growing battery capacity over time</li>
                    <li>• <strong>Technology mixing:</strong> Different manufacturers/types</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Real-World Examples:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Retrofit Example (AC Coupling):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Existing 4kW solar system installed in 2015</li>
                      <li>• Adding 10kWh battery storage in 2024</li>
                      <li>• AC coupling preserves existing inverter warranty</li>
                      <li>• Installation in one day without system disruption</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">New Build Example (DC Coupling):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 6kW PV system with 15kWh battery</li>
                      <li>• Single 6kW hybrid inverter handles both</li>
                      <li>• 3% higher efficiency saves £40/year</li>
                      <li>• Unified monitoring and control system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Commercial Retrofit vs New Build</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">AC Coupled Retrofit Project:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Existing system:</strong> 50kW rooftop PV (2018 installation)</li>
                    <li>• <strong>Battery addition:</strong> 100kWh Tesla Megapack</li>
                    <li>• <strong>Installation time:</strong> 2 days with minimal disruption</li>
                    <li>• <strong>Peak shaving savings:</strong> £2,000/month demand charge reduction</li>
                    <li>• <strong>Payback period:</strong> 4.5 years including grid services revenue</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">DC Coupled New Installation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Integrated system:</strong> 75kW PV + 150kWh storage</li>
                    <li>• <strong>Efficiency gain:</strong> 5% higher than AC coupled equivalent</li>
                    <li>• <strong>Equipment cost savings:</strong> £8,000 fewer power electronics</li>
                    <li>• <strong>Annual energy bonus:</strong> 2,200 kWh additional throughput</li>
                    <li>• <strong>Payback improvement:</strong> 6 months faster than AC equivalent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Hybrid Coupling Architectures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced systems combine DC and AC coupling benefits, creating flexible architectures that optimize for different energy flows and applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Multi-String Configurations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Hybrid inverter + AC storage:</strong> Best of both worlds approach</li>
                    <li>• <strong>DC string for new PV:</strong> High efficiency path for new panels</li>
                    <li>• <strong>AC coupling for existing PV:</strong> Integrate legacy systems</li>
                    <li>• <strong>Modular expansion:</strong> Add capacity using either method</li>
                    <li>• <strong>Load optimization:</strong> Route power through most efficient path</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Power Routing Intelligence:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dynamic path selection:</strong> Choose most efficient energy route</li>
                    <li>• <strong>Load prioritization:</strong> Direct supply critical vs. non-critical loads</li>
                    <li>• <strong>Time-based optimization:</strong> Adjust routing based on TOU rates</li>
                    <li>• <strong>Predictive control:</strong> Anticipate energy needs and pre-position</li>
                    <li>• <strong>Grid service optimization:</strong> Balance local needs with grid revenue</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: SolarEdge DC Optimized + StorEdge AC Coupling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A commercial installation demonstrates how hybrid coupling approaches can optimize performance by combining DC optimization with AC coupling flexibility.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">System Architecture:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Primary PV System:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 50kWp PV array with power optimizers</li>
                      <li>• SolarEdge 3-phase inverter (DC coupling)</li>
                      <li>• Module-level MPPT optimization</li>
                      <li>• Shade tolerance and monitoring</li>
                      <li>• Safety: automatic module shutdown</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Storage System:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 100kWh LFP battery system</li>
                      <li>• AC coupled via StorEdge interface</li>
                      <li>• Independent battery inverter</li>
                      <li>• Backup power capability</li>
                      <li>• Grid services participation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-3">Performance Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">PV Optimization:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 15% yield increase vs. string inverters</li>
                      <li>• Individual module monitoring</li>
                      <li>• Rapid fault detection</li>
                      <li>• Enhanced safety features</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Storage Flexibility:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Independent battery management</li>
                      <li>• Easy capacity expansion</li>
                      <li>• Multiple operation modes</li>
                      <li>• Grid service revenue: £8,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Overall System:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Combined efficiency: 91%</li>
                      <li>• Self-consumption: 78%</li>
                      <li>• ROI period: 8.2 years</li>
                      <li>• Annual savings: £12,500</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The choice between DC and AC coupling affects system efficiency, cost, and installation complexity. DC coupling offers superior efficiency for new installations, while AC coupling provides flexibility for retrofits and system expansion. Advanced hybrid approaches can optimize performance by combining the benefits of both architectures.
              </p>
              <p className="text-yellow-400 font-medium">
                Choose DC coupling for maximum efficiency in new installations, AC coupling for retrofit flexibility, or hybrid approaches for optimized performance across all operating conditions.
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
                title="DC vs AC Coupling Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule4Section4;