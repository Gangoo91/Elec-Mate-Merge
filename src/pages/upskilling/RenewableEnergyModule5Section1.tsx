import { ArrowLeft, ArrowRight, Zap, Building, Home, Cpu, CheckCircle, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule5Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Which inverter is best for sites with variable shading?",
      options: [
        "String inverters",
        "Central inverters", 
        "Microinverters with individual panel optimization",
        "Hybrid inverters"
      ],
      correct: 2,
      explanation: "Microinverters provide individual panel-level optimization, allowing unshaded panels to operate at maximum efficiency even when other panels in the array are shaded, eliminating the series string effect."
    },
    {
      id: 2,
      question: "What's a typical use case for a central inverter?",
      options: [
        "Residential rooftop installations",
        "Large utility-scale solar farms with uniform conditions",
        "Small commercial buildings",
        "Distributed residential systems"
      ],
      correct: 1,
      explanation: "Central inverters are ideal for large utility-scale installations where hundreds or thousands of panels operate under uniform conditions, providing the most cost-effective solution per watt."
    },
    {
      id: 3,
      question: "Which inverter allows battery integration?",
      options: [
        "Only string inverters",
        "Only central inverters",
        "Hybrid inverters specifically designed for storage",
        "Only microinverters"
      ],
      correct: 2,
      explanation: "Hybrid inverters are specifically designed to integrate battery storage, providing DC coupling for batteries and managing both solar generation and energy storage in a single device."
    },
    {
      id: 4,
      question: "What is a key benefit of microinverters?",
      options: [
        "Lowest cost per watt",
        "Individual panel monitoring and fault isolation",
        "Highest power capacity",
        "Simplest installation"
      ],
      correct: 1,
      explanation: "Microinverters provide individual panel monitoring and fault isolation, allowing precise performance tracking and ensuring that a failure in one panel doesn't affect the entire string's performance."
    },
    {
      id: 5,
      question: "Which inverter scales best for large utility projects?",
      options: [
        "Microinverters",
        "String inverters",
        "Central inverters for mega-scale projects",
        "Hybrid inverters"
      ],
      correct: 2,
      explanation: "Central inverters scale best for large utility projects, offering the lowest cost per watt and simplest maintenance for installations with thousands of panels under uniform conditions."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Inverter Types: String, Central, Hybrid, and Microinverters
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding different inverter technologies and their optimal applications
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Inverter Technology
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
                  Differentiate between key inverter types and their operating principles
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Match inverter technology to system size, layout, and site conditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify typical use cases and economic considerations for each inverter type
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
                Inverters are the heart of any solar power system, converting DC electricity from panels into AC electricity for use in homes and businesses. The choice of inverter technology significantly impacts system performance, cost, monitoring capabilities, and maintenance requirements. This section explores the four main inverter types and their optimal applications.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                String Inverters: Modular and Cost-Effective
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                String inverters connect multiple solar panels in series, converting DC power from entire strings of panels. They represent the most common inverter technology for residential and small commercial installations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cost-effective:</strong> £200-600 per kW installed</li>
                    <li>• <strong>Proven reliability:</strong> 10-15 year track record</li>
                    <li>• <strong>Simple installation:</strong> Fewer components to install</li>
                    <li>• <strong>Easy maintenance:</strong> Single point of service</li>
                    <li>• <strong>High efficiency:</strong> 96-98% peak efficiency</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Limitations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Series effect:</strong> Weakest panel limits entire string</li>
                    <li>• <strong>Shading sensitivity:</strong> Partial shade impacts whole string</li>
                    <li>• <strong>String-level monitoring:</strong> Limited fault diagnosis</li>
                    <li>• <strong>Design constraints:</strong> Requires uniform panel orientation</li>
                    <li>• <strong>Single point of failure:</strong> Inverter failure stops entire system</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Technical Specifications:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Power Range:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Residential: 3-10kW</li>
                      <li>• Commercial: 10-100kW</li>
                      <li>• String inputs: 1-3 MPPT trackers</li>
                      <li>• Voltage range: 150-1000V DC</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Installation Requirements:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Shaded location preferred</li>
                      <li>• Ventilation clearances required</li>
                      <li>• DC and AC disconnect switches</li>
                      <li>• Ground fault protection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Best Applications:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Uniform roof orientations</li>
                      <li>• Minimal shading conditions</li>
                      <li>• Cost-sensitive projects</li>
                      <li>• Simple system designs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-green-400" />
                Central Inverters: High-Capacity for Large-Scale Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Central inverters handle power from hundreds or thousands of panels, providing the most cost-effective solution for utility-scale installations with uniform operating conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Architecture Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Mega-scale capacity:</strong> 500kW to 4MW+ units</li>
                    <li>• <strong>Lowest cost per watt:</strong> £100-300/kW at scale</li>
                    <li>• <strong>High efficiency:</strong> 98-99% at rated power</li>
                    <li>• <strong>Centralized maintenance:</strong> Single service location</li>
                    <li>• <strong>Advanced monitoring:</strong> Sophisticated SCADA integration</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Design Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dedicated buildings:</strong> Climate-controlled housing</li>
                    <li>• <strong>HV transformers:</strong> Step-up to transmission voltage</li>
                    <li>• <strong>Complex DC combiners:</strong> Hundreds of string inputs</li>
                    <li>• <strong>Redundancy systems:</strong> Backup cooling and controls</li>
                    <li>• <strong>Safety systems:</strong> Arc fault detection and suppression</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Operational Challenges:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Single point risk:</strong> Inverter failure affects large capacity</li>
                    <li>• <strong>Complex installation:</strong> Specialized commissioning required</li>
                    <li>• <strong>Uniform conditions needed:</strong> All panels must operate similarly</li>
                    <li>• <strong>High maintenance skills:</strong> Specialized technicians required</li>
                    <li>• <strong>Grid code compliance:</strong> Complex protection systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-orange-400" />
                Hybrid Inverters: Battery-Ready and Flexible
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Hybrid inverters combine traditional solar inverter functionality with battery charging and energy management capabilities, providing the foundation for complete energy independence.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Multi-Mode Operation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Grid-tie mode:</strong> Standard solar inverter operation</li>
                    <li>• <strong>Self-consumption:</strong> Prioritize local consumption over export</li>
                    <li>• <strong>Time-of-use mode:</strong> Charge/discharge based on tariffs</li>
                    <li>• <strong>Backup mode:</strong> Emergency power during outages</li>
                    <li>• <strong>Off-grid mode:</strong> Complete grid independence</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Advanced Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Integrated MPPT:</strong> Multiple solar input tracking</li>
                    <li>• <strong>Battery management:</strong> Built-in charge controller</li>
                    <li>• <strong>Smart energy routing:</strong> Automatic power flow optimization</li>
                    <li>• <strong>Grid services:</strong> Frequency response and voltage support</li>
                    <li>• <strong>Remote monitoring:</strong> Comprehensive system oversight</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Economic Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Cost Structure:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Initial cost: 20-40% premium over string inverters</li>
                      <li>• Future-ready: Avoid replacement when adding batteries</li>
                      <li>• Grid services revenue: £200-1000/year potential</li>
                      <li>• Self-consumption value: 10-25p/kWh savings</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Applications:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Future battery plans: Essential for planned storage</li>
                      <li>• Energy independence: Off-grid or backup requirements</li>
                      <li>• TOU optimization: Time-of-use tariff management</li>
                      <li>• Grid instability: Areas with frequent outages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="h-6 w-6 text-purple-400" />
                Microinverters: Per-Panel Control and Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Microinverters attach to individual panels, providing panel-level MPPT, monitoring, and fault isolation. They represent the premium solution for maximum performance optimization.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Performance Advantages:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Panel-level MPPT:</strong> Each panel optimized individually</li>
                    <li>• <strong>Shade tolerance:</strong> Unaffected panels maintain full output</li>
                    <li>• <strong>Mismatch mitigation:</strong> Different panel types/ages supported</li>
                    <li>• <strong>Fault isolation:</strong> Single panel issues don't affect others</li>
                    <li>• <strong>Design flexibility:</strong> Multiple orientations possible</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Monitoring and Safety:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Panel-level monitoring:</strong> Individual performance tracking</li>
                    <li>• <strong>Rapid shutdown:</strong> Built-in safety compliance</li>
                    <li>• <strong>No high voltage DC:</strong> Enhanced rooftop safety</li>
                    <li>• <strong>Granular diagnostics:</strong> Precise fault identification</li>
                    <li>• <strong>Performance guarantees:</strong> Panel-level warranties possible</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Economic Trade-offs:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Higher upfront cost:</strong> £400-800/kW premium</li>
                    <li>• <strong>Performance gains:</strong> 5-25% yield improvement in shade</li>
                    <li>• <strong>Extended warranties:</strong> 20-25 year product warranties</li>
                    <li>• <strong>Maintenance complexity:</strong> More components to service</li>
                    <li>• <strong>ROI in complex sites:</strong> Justified by performance gains</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: SolarEdge Power Optimizers vs Microinverters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A comparative study of panel-level optimization technologies demonstrates the performance benefits and economic trade-offs in complex installation scenarios.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">Test Installation Comparison:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">SolarEdge DC Optimizers:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cost: £50/panel optimizer + string inverter</li>
                      <li>• Efficiency: 99.5% optimizer + 97.5% inverter</li>
                      <li>• Monitoring: Panel-level performance data</li>
                      <li>• Safety: Rapid shutdown compliance</li>
                      <li>• Performance gain: 12% in partial shade</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Enphase Microinverters:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cost: £80/panel all-in-one solution</li>
                      <li>• Efficiency: 96.5% microinverter only</li>
                      <li>• Monitoring: Individual panel AC monitoring</li>
                      <li>• Safety: No high voltage DC on roof</li>
                      <li>• Performance gain: 15% in partial shade</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Findings:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Shading performance:</strong> Both systems significantly outperformed string inverters</li>
                  <li>• <strong>Installation time:</strong> Microinverters required 15% more installation time</li>
                  <li>• <strong>Maintenance calls:</strong> String + optimizers had 40% fewer service calls</li>
                  <li>• <strong>Long-term reliability:</strong> String inverters showed better 10-year performance</li>
                  <li>• <strong>Economic optimum:</strong> Choice depends on shading severity and site complexity</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Inverter Selection Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white p-2">Criteria</th>
                      <th className="text-left text-white p-2">String</th>
                      <th className="text-left text-white p-2">Central</th>
                      <th className="text-left text-white p-2">Hybrid</th>
                      <th className="text-left text-white p-2">Micro</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Best System Size</td>
                      <td className="p-2">3-100kW</td>
                      <td className="p-2">500kW+</td>
                      <td className="p-2">3-50kW</td>
                      <td className="p-2">3-20kW</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Cost per Watt</td>
                      <td className="p-2">Low</td>
                      <td className="p-2">Lowest</td>
                      <td className="p-2">Medium</td>
                      <td className="p-2">Highest</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Shade Tolerance</td>
                      <td className="p-2">Poor</td>
                      <td className="p-2">Poor</td>
                      <td className="p-2">Good</td>
                      <td className="p-2">Excellent</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Monitoring Level</td>
                      <td className="p-2">String</td>
                      <td className="p-2">Inverter</td>
                      <td className="p-2">String</td>
                      <td className="p-2">Panel</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Battery Ready</td>
                      <td className="p-2">No</td>
                      <td className="p-2">No</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">Limited</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Typical Warranty</td>
                      <td className="p-2">10-12 years</td>
                      <td className="p-2">10-15 years</td>
                      <td className="p-2">10-12 years</td>
                      <td className="p-2">20-25 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Inverter selection significantly impacts system performance, cost, and operational characteristics. String inverters offer cost-effective solutions for uniform conditions, central inverters provide the most economical option for utility-scale installations, hybrid inverters enable future battery integration, and microinverters deliver maximum performance optimization for complex sites.
              </p>
              <p className="text-yellow-400 font-medium">
                Choose string inverters for cost-effectiveness, central for utility scale, hybrid for future flexibility, and microinverters for maximum performance in challenging conditions.
              </p>
            </CardContent>
          </Card>


          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold mb-2">When should I choose string inverters over microinverters?</h4>
                  <p className="text-gray-300 text-sm">Choose string inverters for uniform roof orientations with minimal shading, where cost is the primary concern. They're ideal for simple installations where all panels face the same direction and operate under similar conditions. String inverters offer the best value for straightforward residential and small commercial systems.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold mb-2">What are the maintenance requirements for different inverter types?</h4>
                  <p className="text-gray-300 text-sm">String and central inverters require regular inspection of cooling systems, connection tightness, and performance monitoring. Microinverters need minimal maintenance but may require panel-level replacement. Hybrid inverters add battery system maintenance. Central inverters need specialized technicians, while string/microinverters can often be serviced by standard installers.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold mb-2">How do I determine if the extra cost of microinverters is justified?</h4>
                  <p className="text-gray-300 text-sm">Microinverters justify their premium (typically 15-25% more) when you have complex roof layouts, partial shading, multiple orientations, or need panel-level monitoring. Calculate the additional energy harvest from shaded conditions and the value of detailed monitoring. For sites with uniform conditions, string inverters often provide better ROI.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold mb-2">What warranty differences should I expect between inverter types?</h4>
                  <p className="text-gray-300 text-sm">String inverters typically offer 5-12 year warranties with extension options. Microinverters often provide 15-25 year warranties matching panel life. Central inverters may have 2-5 year warranties with comprehensive service agreements. Hybrid inverters usually offer 5-10 years with separate battery warranties. Consider total cost of ownership including warranty coverage.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold mb-2">Can I mix different inverter types in one installation?</h4>
                  <p className="text-gray-300 text-sm">Generally not recommended due to different monitoring systems, warranties, and maintenance requirements. However, you might use string inverters for main roof areas and microinverters for shaded sections. Hybrid inverters can work alongside string inverters for phased battery additions. Always consult with your installer about system compatibility and monitoring integration.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="text-white font-semibold mb-2">How do inverter efficiencies compare in real-world conditions?</h4>
                  <p className="text-gray-300 text-sm">Peak efficiencies: Central (98-99%), String (96-98%), Microinverters (95-97%), Hybrid (94-97%). However, real-world performance depends on partial loading, temperature, and system design. Microinverters often achieve higher overall system efficiency despite lower peak efficiency due to individual MPPT tracking and reduced mismatch losses.</p>
                </div>
              </div>
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
                title="Inverter Types Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule5Section1;