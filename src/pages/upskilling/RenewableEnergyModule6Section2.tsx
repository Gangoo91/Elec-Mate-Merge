import { ArrowLeft, Compass, Lightbulb, Battery, Zap, AlertTriangle, Settings, Calculator, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import OffGridDesignFAQ from '@/components/upskilling/renewable-energy/OffGridDesignFAQ';
import OffGridDesignPractical from '@/components/upskilling/renewable-energy/OffGridDesignPractical';

const RenewableEnergyModule6Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is energy autonomy?",
      options: [
        "The number of days a system can operate without renewable generation",
        "The efficiency of the solar panels",
        "The battery charging speed",
        "The generator fuel consumption rate"
      ],
      correct: 0,
      explanation: "Energy autonomy refers to the number of days an off-grid system can supply power without any renewable energy generation, relying solely on stored energy in batteries."
    },
    {
      id: 2,
      question: "When should a generator be included?",
      options: [
        "Only in commercial systems",
        "For extended autonomy periods or critical loads",
        "Only in winter months",
        "When batteries are expensive"
      ],
      correct: 1,
      explanation: "Generators should be included when extended autonomy is required beyond what batteries can economically provide, or when critical loads must never lose power regardless of weather conditions."
    },
    {
      id: 3,
      question: "How are autonomy days calculated?",
      options: [
        "Battery capacity (kWh) ÷ Daily load consumption (kWh)",
        "Solar panel capacity ÷ Daily consumption",
        "Number of batteries × battery voltage",
        "Generator capacity ÷ total loads"
      ],
      correct: 0,
      explanation: "Autonomy days = Usable battery capacity (kWh) ÷ Daily load consumption (kWh). This assumes no renewable generation during the autonomy period."
    },
    {
      id: 4,
      question: "What's a common risk in off-grid design?",
      options: [
        "Too much solar generation",
        "Undersized battery storage",
        "Over-complex wiring",
        "Expensive equipment"
      ],
      correct: 1,
      explanation: "Undersized battery storage is a common and critical risk that can lead to power shortages during periods of low renewable generation or high demand."
    },
    {
      id: 5,
      question: "What type of loads need highest priority?",
      options: [
        "Entertainment systems",
        "Lighting and communication",
        "Air conditioning",
        "Electric vehicle charging"
      ],
      correct: 1,
      explanation: "Critical loads like lighting, communication, refrigeration, and safety systems should have highest priority to ensure essential services remain operational during energy shortages."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Off-Grid Design Considerations (Autonomy, Generator Backup)
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Technical and practical design concerns for completely standalone systems
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Off-Grid Design
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
                  Understand how to design for energy autonomy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Calculate storage and backup requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Factor in generator usage and load priorities
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
                This section explores the technical and practical design concerns when working with completely standalone systems. Off-grid renewable energy systems require careful consideration of energy autonomy, backup generation, and load management to ensure reliable operation in all conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-yellow-400" />
                Energy Autonomy and Storage Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Energy autonomy defines how long an off-grid system can operate without renewable generation, relying solely on stored energy. Typical autonomy periods range from 3-5 days for residential systems to 7-10 days for critical applications.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Autonomy Calculation:</h4>
                  <div className="space-y-3 text-sm">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <p className="text-white font-medium">Basic Formula:</p>
                      <p className="text-gray-300">Autonomy Days = Usable Battery Capacity (kWh) ÷ Daily Load (kWh)</p>
                    </div>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Account for battery depth of discharge (DoD)</li>
                      <li>• Consider temperature derating factors</li>
                      <li>• Include inverter efficiency losses</li>
                      <li>• Factor in aging and capacity degradation</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Autonomy Design Factors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Climate considerations:</strong> Extended periods without sun/wind</li>
                    <li>• <strong>Load criticality:</strong> Essential vs non-essential loads</li>
                    <li>• <strong>Seasonal variations:</strong> Winter generation deficits</li>
                    <li>• <strong>Geographic location:</strong> Weather patterns and extremes</li>
                    <li>• <strong>Cost optimisation:</strong> Battery vs generator economics</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Example Autonomy Calculation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Parameters:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Daily load consumption: 15 kWh</li>
                      <li>• Required autonomy: 4 days</li>
                      <li>• Battery type: Lithium (90% DoD)</li>
                      <li>• Inverter efficiency: 95%</li>
                      <li>• Temperature derating: 10%</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Calculation Steps:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Gross energy needed: 15 × 4 = 60 kWh</li>
                      <li>• Account for inverter: 60 ÷ 0.95 = 63.2 kWh</li>
                      <li>• Temperature factor: 63.2 ÷ 0.9 = 70.2 kWh</li>
                      <li>• Battery capacity: 70.2 ÷ 0.9 = 78 kWh</li>
                      <li>• <strong>Result: 78 kWh battery bank required</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-green-400" />
                Generator Sizing and Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Backup generators provide extended autonomy and battery charging capability during prolonged periods without renewable generation. Proper sizing and integration are critical for system reliability and efficiency.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Generator Sizing Criteria:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Load capacity:</strong> Critical loads + battery charging</li>
                    <li>• <strong>Charging rate:</strong> 10-20% of battery capacity (kWh)</li>
                    <li>• <strong>Surge capability:</strong> Motor starting requirements</li>
                    <li>• <strong>Runtime requirements:</strong> Fuel tank sizing</li>
                    <li>• <strong>Efficiency considerations:</strong> Load matching for optimal fuel consumption</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Generator Types and Applications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Petrol:</strong> Small systems, occasional use</li>
                    <li>• <strong>Diesel:</strong> Larger systems, frequent operation</li>
                    <li>• <strong>Natural gas/LPG:</strong> Clean burning, grid gas available</li>
                    <li>• <strong>Dual fuel:</strong> Flexibility and backup fuel options</li>
                    <li>• <strong>Inverter generators:</strong> Clean power for sensitive electronics</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Generator Integration Strategies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">AC Coupling:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Generator connects to AC bus</li>
                      <li>• Standard changeover switch</li>
                      <li>• Simple integration</li>
                      <li>• Manual or automatic start</li>
                      <li>• Suitable for most applications</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">DC Coupling:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Generator charges batteries directly</li>
                      <li>• Requires battery charger</li>
                      <li>• More complex control</li>
                      <li>• Higher efficiency potential</li>
                      <li>• Better load regulation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Auto-Start Control:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Battery voltage triggers</li>
                      <li>• Time-based scheduling</li>
                      <li>• Load demand activation</li>
                      <li>• Remote monitoring capability</li>
                      <li>• Maintenance scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" />
                Charging Profiles and Battery Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Off-grid systems require sophisticated charging algorithms and protection systems to maximise battery life and system reliability across varying generation and load conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Charging Strategies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Bulk charging:</strong> Maximum current until absorption voltage</li>
                    <li>• <strong>Absorption:</strong> Constant voltage to complete charging</li>
                    <li>• <strong>Float maintenance:</strong> Lower voltage for long-term storage</li>
                    <li>• <strong>Equalisation:</strong> Periodic high voltage (lead-acid only)</li>
                    <li>• <strong>Temperature compensation:</strong> Voltage adjustment for temperature</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Protection Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Over-voltage protection:</strong> Prevents battery damage</li>
                    <li>• <strong>Under-voltage disconnect:</strong> Prevents deep discharge</li>
                    <li>• <strong>Over-current protection:</strong> Fusing and circuit breakers</li>
                    <li>• <strong>Temperature monitoring:</strong> Thermal protection and derating</li>
                    <li>• <strong>Ground fault protection:</strong> Safety systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Battery Management Considerations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Lead-Acid Batteries:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Voltage-based state of charge estimation</li>
                      <li>• Regular equalisation charging required</li>
                      <li>• Temperature compensation critical</li>
                      <li>• Ventilation requirements for vented types</li>
                      <li>• Specific gravity monitoring (flooded types)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Lithium Batteries:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Built-in Battery Management System (BMS)</li>
                      <li>• Cell balancing and protection</li>
                      <li>• More precise state of charge tracking</li>
                      <li>• Temperature-based derating</li>
                      <li>• Communication protocols for monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                Load Management in Critical Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Effective load management ensures critical functions remain operational during energy shortages while optimising system efficiency and battery life.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Critical Loads (Priority 1):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Safety and security systems</li>
                    <li>• Emergency lighting</li>
                    <li>• Communication equipment</li>
                    <li>• Medical equipment</li>
                    <li>• Refrigeration (food/medicine)</li>
                    <li>• Water pumping systems</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Essential Loads (Priority 2):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Basic lighting circuits</li>
                    <li>• Computer equipment</li>
                    <li>• Small appliances</li>
                    <li>• Heating/cooling (reduced)</li>
                    <li>• Charging devices</li>
                    <li>• Control systems</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Non-Essential (Priority 3):</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Entertainment systems</li>
                    <li>• High-power appliances</li>
                    <li>• Electric vehicle charging</li>
                    <li>• Pool/spa equipment</li>
                    <li>• Workshop equipment</li>
                    <li>• Decorative lighting</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Load Management Strategies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Automatic Load Shedding:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Voltage-based disconnection</li>
                      <li>• Programmable load controllers</li>
                      <li>• Smart switching systems</li>
                      <li>• Time-based scheduling</li>
                      <li>• Manual override capability</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Load Scheduling:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Peak generation utilisation</li>
                      <li>• Off-peak battery conservation</li>
                      <li>• Weather-based adjustments</li>
                      <li>• Seasonal load profiles</li>
                      <li>• User education and training</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Reliability Risks and Mitigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Off-grid systems face unique reliability challenges that require proactive design and mitigation strategies to ensure consistent operation.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Common Risk Factors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Weather dependency:</strong> Extended periods without generation</li>
                    <li>• <strong>Battery degradation:</strong> Capacity loss over time</li>
                    <li>• <strong>Component failures:</strong> No grid backup available</li>
                    <li>• <strong>Maintenance access:</strong> Remote location challenges</li>
                    <li>• <strong>Load growth:</strong> System oversizing requirements</li>
                    <li>• <strong>Fuel availability:</strong> Generator backup reliability</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Mitigation Strategies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>System redundancy:</strong> Multiple generation sources</li>
                    <li>• <strong>Conservative sizing:</strong> Adequate safety margins</li>
                    <li>• <strong>Quality components:</strong> Proven reliability in off-grid applications</li>
                    <li>• <strong>Preventive maintenance:</strong> Regular inspection schedules</li>
                    <li>• <strong>Spare parts inventory:</strong> Critical component stockpiling</li>
                    <li>• <strong>Remote monitoring:</strong> Early fault detection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-red-400 font-semibold mb-3">System Reliability Best Practices:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Design Phase:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Conservative load calculations</li>
                      <li>• Redundant charging sources</li>
                      <li>• Modular system architecture</li>
                      <li>• Quality component selection</li>
                      <li>• Future expansion planning</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Installation Phase:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Professional installation standards</li>
                      <li>• Comprehensive testing protocols</li>
                      <li>• Documentation and labelling</li>
                      <li>• User training programmes</li>
                      <li>• Maintenance planning</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Operation Phase:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Regular performance monitoring</li>
                      <li>• Preventive maintenance schedules</li>
                      <li>• Emergency response procedures</li>
                      <li>• System upgrades and improvements</li>
                      <li>• Performance optimisation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Case Study: Remote Research Station</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A remote research station requires 7 days of autonomy with critical loads that must never lose power. The system includes environmental monitoring equipment, communication systems, and basic amenities.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-orange-400 font-semibold mb-3">System Requirements:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Load Profile:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Critical loads: 2 kW continuous</li>
                      <li>• Essential loads: 1 kW average</li>
                      <li>• Total daily consumption: 45 kWh</li>
                      <li>• Peak demand: 4 kW</li>
                      <li>• Autonomy requirement: 7 days</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Design Solution:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Battery capacity: 400 kWh lithium</li>
                      <li>• Solar generation: 15 kW array</li>
                      <li>• Backup generator: 8 kW diesel</li>
                      <li>• Load management: 3-tier priority system</li>
                      <li>• Monitoring: Satellite communication</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">Key Design Features:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Extended autonomy:</strong> 7 days without generation capability</li>
                  <li>• <strong>Redundant generation:</strong> Oversized solar array plus diesel backup</li>
                  <li>• <strong>Critical load protection:</strong> Uninterruptible power to essential systems</li>
                  <li>• <strong>Remote monitoring:</strong> Real-time system status and alerting</li>
                  <li>• <strong>Maintenance access:</strong> Scheduled helicopter visits for service</li>
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
                Off-grid systems must be resilient and flexible. Proper storage, backup, and load planning are key to uptime. Energy autonomy calculations, generator integration, battery protection, and load management strategies are fundamental to successful off-grid system design and operation.
              </p>
              <p className="text-yellow-400 font-medium">
                Successful off-grid systems require conservative design margins, redundant generation sources, sophisticated load management, and comprehensive maintenance planning to ensure reliable operation in challenging environments.
              </p>
            </CardContent>
          </Card>

          <OffGridDesignFAQ />
          
          <OffGridDesignPractical />

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
                title="Off-Grid Design Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section2;