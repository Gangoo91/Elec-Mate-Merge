import { ArrowLeft, ArrowRight, Target, Calculator, Thermometer, Gauge, TrendingUp, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule5Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does MPPT stand for?",
      options: [
        "Maximum Power Point Tracking",
        "Multiple Panel Power Technology",
        "Maximum Performance Power Transfer",
        "Multi-Point Power Tracking"
      ],
      correct: 0,
      explanation: "MPPT stands for Maximum Power Point Tracking - the technology that continuously adjusts the electrical operating point to extract maximum power from solar panels under varying conditions."
    },
    {
      id: 2,
      question: "What happens if an inverter is oversized?",
      options: [
        "System fails to operate",
        "Reduced efficiency at low power levels and higher cost",
        "Panels produce more power",
        "No impact on performance"
      ],
      correct: 1,
      explanation: "Oversized inverters operate at lower efficiency during typical conditions and increase system cost unnecessarily. They may also fail to start up in low light conditions."
    },
    {
      id: 3,
      question: "Why is voltage window compatibility critical?",
      options: [
        "For aesthetic reasons",
        "To ensure the PV array voltage stays within the inverter's operating range",
        "To reduce installation costs",
        "To improve panel efficiency"
      ],
      correct: 1,
      explanation: "The PV array's voltage must remain within the inverter's input voltage window under all conditions (temperature variations, partial shade) to ensure safe, reliable operation."
    },
    {
      id: 4,
      question: "How does temperature impact array output?",
      options: [
        "Temperature has no effect",
        "Higher temperatures increase voltage",
        "Higher temperatures decrease voltage and power output",
        "Only affects current, not voltage"
      ],
      correct: 2,
      explanation: "Higher temperatures decrease solar panel voltage significantly (about -0.4%/°C) and reduce overall power output, while lower temperatures increase voltage which affects inverter sizing."
    },
    {
      id: 5,
      question: "Can you connect more panel watts than the inverter is rated for?",
      options: [
        "Never, it will damage the inverter",
        "Yes, this is called DC oversizing and is common practice",
        "Only in winter months",
        "Only with special permits"
      ],
      correct: 1,
      explanation: "DC oversizing (typically 110-140%) is common practice because panels rarely reach rated power, and it improves energy harvest during morning, evening, and overcast conditions."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              MPPT Tracking and Sizing for PV Arrays
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding Maximum Power Point Tracking technology and inverter sizing principles
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                MPPT & Sizing
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
                  Understand how MPPT technology improves solar system efficiency
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn the fundamentals of sizing inverters to match PV arrays
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify mismatch risks and environmental correction strategies
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
                Maximum Power Point Tracking (MPPT) technology and proper inverter sizing are fundamental to optimizing solar system performance. This section explores how MPPT controllers continuously find the optimal operating point for maximum energy harvest and how to size inverters correctly to match PV array characteristics under varying environmental conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                MPPT Fundamentals: Finding the Sweet Spot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Solar panels have a unique voltage-current characteristic that changes with light levels and temperature. MPPT technology continuously searches for the power point that delivers maximum energy to the load.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">How MPPT Works:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage sweeping:</strong> Continuously samples array voltage and current</li>
                    <li>• <strong>Power calculation:</strong> Calculates instantaneous power (V × I)</li>
                    <li>• <strong>Algorithm control:</strong> Perturb and observe method</li>
                    <li>• <strong>Operating point adjustment:</strong> Moves toward higher power</li>
                    <li>• <strong>Dynamic tracking:</strong> Responds to changing conditions</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Performance Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Efficiency gain:</strong> 15-30% over non-MPPT systems</li>
                    <li>• <strong>Condition adaptation:</strong> Optimizes for partial shade</li>
                    <li>• <strong>Temperature compensation:</strong> Maintains efficiency across temperatures</li>
                    <li>• <strong>Irradiance optimization:</strong> Maximizes low-light performance</li>
                    <li>• <strong>Aging mitigation:</strong> Compensates for panel degradation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">MPPT Algorithms and Technologies:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Perturb & Observe (P&O):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Most common algorithm</li>
                      <li>• Simple and robust implementation</li>
                      <li>• 99%+ tracking efficiency</li>
                      <li>• Fast response to changes</li>
                      <li>• Some oscillation around MPP</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Incremental Conductance:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Mathematical derivative approach</li>
                      <li>• Eliminates oscillation</li>
                      <li>• Better in rapidly changing conditions</li>
                      <li>• More complex implementation</li>
                      <li>• Slightly higher efficiency</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Advanced Algorithms:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Global peak tracking</li>
                      <li>• Neural network based</li>
                      <li>• Fuzzy logic control</li>
                      <li>• Machine learning optimization</li>
                      <li>• Partial shading handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-6 w-6 text-green-400" />
                Voltage and Current Window Alignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Proper voltage window matching ensures the PV array operates within the inverter's input range under all environmental conditions, from hot summer days to cold winter mornings.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Voltage Window Considerations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Minimum start voltage:</strong> Inverter turn-on threshold</li>
                    <li>• <strong>MPPT voltage range:</strong> Optimal operating window</li>
                    <li>• <strong>Maximum input voltage:</strong> Safety and damage limits</li>
                    <li>• <strong>Temperature coefficients:</strong> Voltage changes with temperature</li>
                    <li>• <strong>Safety margins:</strong> Allow for measurement tolerances</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">String Configuration Rules:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Minimum string length:</strong> Vmp(min) ÷ Panel Vmp</li>
                    <li>• <strong>Maximum string length:</strong> Vmax(inv) ÷ Panel Voc(cold)</li>
                    <li>• <strong>Current compatibility:</strong> String current ≤ Inverter Imax</li>
                    <li>• <strong>Power matching:</strong> Consider DC oversizing ratios</li>
                    <li>• <strong>Uniform strings:</strong> Same panel types and orientations</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Environmental Calculations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cold temperature:</strong> Highest voltage scenario</li>
                    <li>• <strong>Hot temperature:</strong> Lowest voltage and power</li>
                    <li>• <strong>Standard conditions:</strong> 25°C, 1000W/m² reference</li>
                    <li>• <strong>Local climate data:</strong> 99th percentile temperatures</li>
                    <li>• <strong>Installation factors:</strong> Mounting and ventilation effects</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-orange-400" />
                Inverter Oversizing and Undersizing Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Strategic inverter sizing optimizes energy harvest, cost-effectiveness, and system performance by understanding when and why to deviate from 1:1 DC to AC ratios.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">DC Oversizing Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Extended harvest hours:</strong> More energy in morning/evening</li>
                    <li>• <strong>Cloudy day performance:</strong> Better output in low irradiance</li>
                    <li>• <strong>Temperature compensation:</strong> Maintains power in heat</li>
                    <li>• <strong>Degradation buffer:</strong> Compensates for aging panels</li>
                    <li>• <strong>Cost optimization:</strong> Lower $/kWh system cost</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Oversizing Limits and Risks:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Typical range:</strong> 110-140% DC to AC ratio</li>
                    <li>• <strong>Clipping losses:</strong> Energy lost during peak conditions</li>
                    <li>• <strong>Grid code limits:</strong> Some utilities restrict oversizing</li>
                    <li>• <strong>Warranty implications:</strong> Manufacturer guidelines vary</li>
                    <li>• <strong>Economic optimum:</strong> Balance cost vs energy gains</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Sizing Calculation Example:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <div className="p-3 bg-gray-800 rounded">
                    <h5 className="text-white font-medium mb-2">Given System Parameters:</h5>
                    <ul className="space-y-1">
                      <li>• PV Array: 20 × 400W panels = 8kWp</li>
                      <li>• Panel Vmp: 40V, Panel Voc: 48V</li>
                      <li>• Inverter: 6kW AC, Voltage range: 150-500V</li>
                      <li>• Temperature range: -10°C to +70°C</li>
                      <li>• Voltage temperature coefficient: -0.35%/°C</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-gray-800 rounded">
                    <h5 className="text-white font-medium mb-2">String Sizing Calculation:</h5>
                    <ul className="space-y-1">
                      <li>• Cold voltage: 48V × (1 + 0.35% × 35°C) = 56V per panel</li>
                      <li>• Maximum string: 500V ÷ 56V = 8.9 → 8 panels maximum</li>
                      <li>• Hot voltage: 40V × (1 - 0.35% × 45°C) = 34V per panel</li>
                      <li>• Minimum string: 150V ÷ 34V = 4.4 → 5 panels minimum</li>
                      <li>• <strong>Result:</strong> 2 strings of 10 panels each, 133% oversizing ratio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-purple-400" />
                Temperature Impact on Array Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Temperature significantly affects solar panel performance and must be carefully considered in system design to ensure reliable operation and optimal energy harvest.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Temperature Effects:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage decrease:</strong> -0.3 to -0.5%/°C typical</li>
                    <li>• <strong>Current increase:</strong> +0.04 to +0.08%/°C slight</li>
                    <li>• <strong>Power reduction:</strong> -0.4 to -0.5%/°C overall</li>
                    <li>• <strong>Efficiency impact:</strong> 10-20% loss at 70°C</li>
                    <li>• <strong>Non-linear effects:</strong> Accelerated losses above 60°C</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Installation Factors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Mounting method:</strong> Rack vs integrated vs ground</li>
                    <li>• <strong>Ventilation clearance:</strong> 150mm minimum recommended</li>
                    <li>• <strong>Roof surface temperature:</strong> Dark surfaces add 15-25°C</li>
                    <li>• <strong>Tilt angle effect:</strong> Steeper angles improve cooling</li>
                    <li>• <strong>Wind exposure:</strong> Natural cooling reduces temperatures</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Design Considerations:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Ambient + rise:</strong> Panel temp = Ambient + 20-45°C</li>
                    <li>• <strong>Worst case scenarios:</strong> Use 99th percentile weather data</li>
                    <li>• <strong>Seasonal variations:</strong> Summer derate vs winter boost</li>
                    <li>• <strong>Location specific:</strong> Desert vs coastal temperature profiles</li>
                    <li>• <strong>Future climate:</strong> Consider warming trends</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-400" />
                Sizing Tools and Software Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Professional sizing tools combine complex calculations, weather data, and manufacturer specifications to optimize inverter selection and string configuration for maximum performance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Professional Software:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>PVsyst:</strong> Comprehensive system simulation and sizing</li>
                    <li>• <strong>Solar Pro:</strong> Professional design and financial modeling</li>
                    <li>• <strong>AutoCAD Electrical:</strong> Detailed electrical design</li>
                    <li>• <strong>HOMER Pro:</strong> Microgrid and hybrid system optimization</li>
                    <li>• <strong>SAM (NREL):</strong> Free performance and financial analysis</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Online Sizing Tools:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Manufacturer tools:</strong> SMA Sunny Design, Fronius Solar.web</li>
                    <li>• <strong>Aurora Solar:</strong> Cloud-based design platform</li>
                    <li>• <strong>OpenSolar:</strong> Collaborative design environment</li>
                    <li>• <strong>Helioscope:</strong> Advanced shading and performance analysis</li>
                    <li>• <strong>SketchUp Solar:</strong> 3D modeling with solar plugins</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: MPPT Performance in Partial Shading</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A real-world comparison demonstrates how different MPPT implementations handle partial shading scenarios and the resulting impact on energy harvest.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">Test Configuration:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Setup:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Array: 3 strings of 10 × 300W panels</li>
                      <li>• String inverter: Single MPPT for all strings</li>
                      <li>• Multi-MPPT inverter: Individual tracking per string</li>
                      <li>• Power optimizers: Panel-level MPPT</li>
                      <li>• Shading: 30% of one string affected</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Performance Results:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Single MPPT: 68% of clear-day performance</li>
                      <li>• Multi-MPPT: 85% of clear-day performance</li>
                      <li>• Power optimizers: 94% of clear-day performance</li>
                      <li>• Economic impact: £400-800/year difference</li>
                      <li>• ROI on optimization: 3-6 years typical</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">Key Insights:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>String-level impact:</strong> Single MPPT affects entire array performance</li>
                  <li>• <strong>Multiple MPPT benefits:</strong> String-level isolation improves partial shade performance</li>
                  <li>• <strong>Panel-level optimization:</strong> Highest performance but premium cost</li>
                  <li>• <strong>Site assessment critical:</strong> Shading analysis determines optimal MPPT strategy</li>
                  <li>• <strong>Economic optimization:</strong> Balance technology cost against performance gains</li>
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
                MPPT technology is fundamental to maximizing solar energy harvest by continuously finding the optimal operating point under varying conditions. Proper inverter sizing requires careful consideration of voltage windows, temperature effects, and strategic oversizing to balance cost and performance. Professional tools and detailed analysis ensure optimal system design for maximum return on investment.
              </p>
              <p className="text-yellow-400 font-medium">
                Smart MPPT systems and correctly sized inverters can improve energy harvest by 15-30% compared to basic systems, making the technology investment highly worthwhile.
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
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Why is my MPPT efficiency dropping in certain weather conditions?</h4>
                  <p className="text-gray-300 text-sm">
                    MPPT efficiency can drop due to rapidly changing conditions (clouds), partial shading creating multiple power peaks, or extreme temperatures affecting the algorithm's tracking speed. Modern algorithms handle these better, but older systems may struggle. Consider upgrading to inverters with faster MPPT scanning or advanced algorithms like global peak tracking.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How do I size an inverter for a complex roof with multiple orientations?</h4>
                  <p className="text-gray-300 text-sm">
                    Use multiple MPPT inputs to handle different orientations separately. Size each MPPT input for its specific array section, considering the orientation-specific irradiance patterns. The total DC capacity can exceed AC capacity by 120-140% since different orientations peak at different times. Model each orientation's production profile to avoid oversizing.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">What's the maximum safe DC oversizing ratio?</h4>
                  <p className="text-gray-300 text-sm">
                    Most manufacturers allow 110-140% DC oversizing, but check specific warranty terms. UK grid codes generally don't restrict DC oversizing, only AC export. Consider local climate - areas with frequent cloud cover can handle higher ratios (130-140%) while very sunny regions should stay closer to 110-120% to minimise clipping losses.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How do I calculate temperature derating for different climates?</h4>
                  <p className="text-gray-300 text-sm">
                    Use local 99th percentile temperatures: coldest for maximum voltage calculations, hottest for minimum power calculations. For roof-mounted systems, add 20-30°C to ambient for cell temperature. Use the panel's temperature coefficient (typically -0.35%/°C for voltage, -0.45%/°C for power) to calculate derating. Coastal areas have lower temperature swings than inland locations.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">Can MPPT tracking help with panel mismatch in the same string?</h4>
                  <p className="text-gray-300 text-sm">
                    MPPT optimises the string as a whole, but cannot overcome fundamental mismatch losses within a string. The weakest panel limits current flow through the entire string. For significant mismatch (different panel types, heavy shading), consider DC optimisers, microinverters, or separate MPPT inputs for different panel groups.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-2">How often should I recalibrate or check MPPT performance?</h4>
                  <p className="text-gray-300 text-sm">
                    Modern MPPT controllers are self-calibrating and don't require manual adjustment. However, monitor MPPT efficiency through your monitoring system - it should consistently be above 99%. Declining efficiency may indicate inverter aging, DC wiring issues, or environmental factors affecting the array. Annual performance analysis comparing to weather-corrected expectations is recommended.
                  </p>
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
                title="MPPT and Sizing Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule5Section2;