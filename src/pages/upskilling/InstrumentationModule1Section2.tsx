import { ArrowLeft, ArrowRight, Map, AlertTriangle, CheckCircle, Thermometer, Factory, Building, Sun, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule1Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "List two examples of instrumentation in HVAC systems.",
      options: [
        "Temperature sensors and humidity sensors",
        "Light switches and door handles",
        "Paint and wallpaper",
        "Chairs and tables"
      ],
      correct: 0,
      explanation: "HVAC systems commonly use temperature sensors, humidity sensors, pressure sensors, and flow meters for climate control and system monitoring."
    },
    {
      id: 2,
      question: "How is instrumentation used in BMS for energy savings?",
      options: [
        "By increasing power consumption",
        "Through occupancy sensors and automated lighting/HVAC control",
        "By running systems continuously",
        "Only for decoration purposes"
      ],
      correct: 1,
      explanation: "BMS uses occupancy sensors, light sensors, and time schedules to automatically control lighting and HVAC systems, reducing energy consumption when spaces are unoccupied."
    },
    {
      id: 3,
      question: "Why is pressure monitoring critical in process control?",
      options: [
        "For aesthetic reasons only",
        "To ensure safety, prevent equipment damage, and maintain product quality",
        "It's not important",
        "Only for legal documentation"
      ],
      correct: 1,
      explanation: "Pressure monitoring prevents dangerous over-pressurisation, protects equipment from damage, ensures process efficiency, and maintains consistent product quality."
    },
    {
      id: 4,
      question: "What role does instrumentation play in solar energy systems?",
      options: [
        "No role at all",
        "Only for cleaning panels",
        "Monitoring power output, irradiance levels, and system performance",
        "Just for marketing purposes"
      ],
      correct: 2,
      explanation: "Solar systems use instrumentation to monitor power output, solar irradiance, panel temperature, system efficiency, and fault conditions for optimal performance."
    },
    {
      id: 5,
      question: "Name one benefit shared across all industries using instrumentation.",
      options: [
        "Increased complexity",
        "Higher costs only",
        "Improved safety and operational efficiency",
        "More manual work required"
      ],
      correct: 2,
      explanation: "All industries benefit from instrumentation through improved safety, enhanced operational efficiency, better product quality, and regulatory compliance."
  }  ];


  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div>
        <Link to="../instrumentation-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Map className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Where and Why Instrumentation Is Used
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  Applications across HVAC, Process Control, BMS, and Renewable Energy
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Map className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Instrumentation is ubiquitous across modern industries, playing critical roles in sectors from manufacturing and energy to building management and renewable technologies. Understanding where and why instrumentation is applied helps engineers appreciate its economic value, safety benefits, and operational advantages.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300">
                  Each industry sector has unique instrumentation requirements driven by specific operational challenges, safety regulations, and performance objectives.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify key industries using instrumentation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand specific use cases for each sector
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise benefits of real-time measurement and control
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Appreciate the economic and safety value of instrumentation
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* HVAC Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-yellow-400" />
                HVAC Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                HVAC (Heating, Ventilation, and Air Conditioning) systems rely heavily on instrumentation to maintain comfortable indoor environments while optimising energy consumption and ensuring air quality standards.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key HVAC Instrumentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Temperature Control</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Room temperature sensors (RTDs, thermistors)</li>
                        <li>• Duct temperature measurement</li>
                        <li>• Outdoor air temperature compensation</li>
                        <li>• Thermal comfort monitoring</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Humidity & Air Quality</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Relative humidity sensors</li>
                        <li>• CO₂ concentration monitoring</li>
                        <li>• Volatile organic compound (VOC) detection</li>
                        <li>• Particulate matter measurement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Pressure & Flow Control</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Static pressure monitoring in ducts</li>
                      <li>• Differential pressure across filters</li>
                      <li>• Airflow measurement and control</li>
                      <li>• Variable air volume (VAV) box control</li>
                      <li>• Fan speed optimisation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Energy Management</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Power consumption monitoring</li>
                      <li>• Energy efficiency calculations</li>
                      <li>• Demand-based ventilation control</li>
                      <li>• Peak load management</li>
                      <li>• Seasonal energy performance tracking</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                  <h4 className="text-white font-semibold mb-2">HVAC Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong className="text-yellow-400">Comfort:</strong> Precise temperature and humidity control for occupant satisfaction
                    </div>
                    <div>
                      <strong className="text-yellow-400">Efficiency:</strong> Energy savings of 20-40% through optimised operation
                    </div>
                    <div>
                      <strong className="text-yellow-400">Health:</strong> Improved indoor air quality and ventilation control
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Factory className="h-6 w-6 text-yellow-400" />
                Process Control Industries
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Process industries including chemicals, pharmaceuticals, food and beverage, and petrochemicals depend on sophisticated instrumentation for safe, efficient, and consistent production operations.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Critical Process Variables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Pressure</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Reactor pressure monitoring</li>
                        <li>• Pipeline pressure control</li>
                        <li>• Safety relief valve settings</li>
                        <li>• Vacuum system control</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Flow</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Raw material feed rates</li>
                        <li>• Product flow measurement</li>
                        <li>• Coolant flow monitoring</li>
                        <li>• Waste stream flow control</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Level</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Tank level indication</li>
                        <li>• Overflow prevention</li>
                        <li>• Batch volume control</li>
                        <li>• Interface level detection</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Composition</h5>
                      <ul className="text-xs space-y-1">
                        <li>• pH measurement</li>
                        <li>• Conductivity monitoring</li>
                        <li>• Gas concentration analysis</li>
                        <li>• Moisture content control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Safety Instrumentation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Emergency shutdown systems (ESD)</li>
                      <li>• Fire and gas detection</li>
                      <li>• Safety integrity level (SIL) instrumentation</li>
                      <li>• Toxic gas monitoring</li>
                      <li>• Explosion prevention systems</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Quality Control</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Real-time product analysis</li>
                      <li>• Statistical process control</li>
                      <li>• Batch consistency monitoring</li>
                      <li>• Contamination detection</li>
                      <li>• Regulatory compliance tracking</li>
                    </ul>
                  </div>
                </div>

                <Alert className="bg-red-600/10 border-red-600/30">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Critical Importance:</strong> In process industries, instrumentation failures can result in safety hazards, environmental damage, production losses, and regulatory violations costing millions of pounds.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Building Management Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-6 w-6 text-yellow-400" />
                Building Management Systems (BMS)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Building Management Systems integrate multiple building services through comprehensive instrumentation networks, delivering significant energy savings, improved comfort, and enhanced security across commercial, institutional, and residential buildings.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">BMS Instrumentation Categories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Environmental Control</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Space temperature sensors</li>
                        <li>• Humidity monitoring</li>
                        <li>• CO₂ and air quality sensors</li>
                        <li>• Lighting level sensors</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Occupancy & Security</h5>
                      <ul className="text-sm space-y-1">
                        <li>• PIR occupancy sensors</li>
                        <li>• Access control systems</li>
                        <li>• CCTV integration</li>
                        <li>• Door and window status</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Energy Management</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Electrical power monitoring</li>
                        <li>• Gas and water flow meters</li>
                        <li>• Energy consumption analysis</li>
                        <li>• Peak demand management</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Smart Building Features</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Predictive maintenance scheduling</li>
                      <li>• Automated fault detection and diagnostics</li>
                      <li>• Dynamic setpoint optimisation</li>
                      <li>• Integration with weather forecasts</li>
                      <li>• Mobile app control and monitoring</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Cost-Benefit Analysis</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 15-30% reduction in energy costs</li>
                      <li>• 10-20% decrease in maintenance costs</li>
                      <li>• Improved asset lifecycle management</li>
                      <li>• Enhanced tenant satisfaction</li>
                      <li>• Compliance with green building standards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Renewable Energy */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-6 w-6 text-yellow-400" />
                Renewable Energy Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Renewable energy systems require sophisticated instrumentation to maximise energy capture, ensure system reliability, and integrate effectively with electrical grids. From solar photovoltaic to wind turbines, instrumentation is crucial for optimal performance.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Solar PV Instrumentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Performance Monitoring</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Solar irradiance measurement</li>
                        <li>• Panel temperature monitoring</li>
                        <li>• DC and AC power output</li>
                        <li>• Energy yield calculations</li>
                        <li>• Performance ratio analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Condition Monitoring</h5>
                      <ul className="text-sm space-y-1">
                        <li>• String current monitoring</li>
                        <li>• Inverter efficiency tracking</li>
                        <li>• Ground fault detection</li>
                        <li>• Arc fault protection</li>
                        <li>• Module degradation analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Wind Energy Instrumentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Wind Conditions</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Wind speed (anemometers)</li>
                        <li>• Wind direction (wind vanes)</li>
                        <li>• Turbulence measurement</li>
                        <li>• Wind shear analysis</li>
                        <li>• Atmospheric pressure</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Turbine Monitoring</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Rotor speed sensors</li>
                        <li>• Generator temperature</li>
                        <li>• Gearbox vibration analysis</li>
                        <li>• Power output measurement</li>
                        <li>• Blade pitch angle control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Grid Integration</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Grid frequency monitoring</li>
                      <li>• Voltage regulation</li>
                      <li>• Power quality measurement</li>
                      <li>• Reactive power control</li>
                      <li>• Anti-islanding protection</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Economic Benefits</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Maximised energy yield</li>
                      <li>• Predictive maintenance cost savings</li>
                      <li>• Extended equipment life</li>
                      <li>• Improved capacity factor</li>
                      <li>• Reduced downtime losses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Smart Office Building Energy Management</h4>
                <p className="text-sm leading-relaxed mb-4">
                  A modern office building implements comprehensive BMS instrumentation to achieve maximum energy efficiency and occupant comfort:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium">Occupancy Detection</h5>
                      <p className="text-xs">PIR sensors and CO₂ monitors detect room occupancy in real-time across 200 office spaces</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium">Automated Control Response</h5>
                      <p className="text-xs">When rooms are unoccupied for 15 minutes, lighting automatically dims to 20% and HVAC adjusts to setback temperatures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium">Energy Monitoring</h5>
                      <p className="text-xs">Smart meters track energy consumption by floor and department, identifying usage patterns and optimization opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium">Annual Savings</h5>
                      <p className="text-xs">Building achieves 35% reduction in energy costs (£150,000 annually) while maintaining optimal comfort levels</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Result:</strong> Significant cost savings, improved sustainability credentials, and enhanced tenant satisfaction through intelligent automation
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Instrumentation applications span across industries, each with unique requirements but common benefits. From HVAC systems optimising building comfort to process control ensuring safety, BMS integrating building services, and renewable energy maximising efficiency - instrumentation provides the measurement, monitoring, and control foundation for modern industrial operations.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Universal Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong className="text-yellow-400">Safety:</strong> Preventing hazardous conditions and protecting personnel
                  </div>
                  <div>
                    <strong className="text-yellow-400">Efficiency:</strong> Optimising performance and reducing waste
                  </div>
                  <div>
                    <strong className="text-yellow-400">Quality:</strong> Maintaining consistent product and service standards
                  </div>
                  <div>
                    <strong className="text-yellow-400">Compliance:</strong> Meeting regulatory and legal requirements
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../instrumentation-module-1-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-1-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10 touch-manipulation active:scale-[0.98]">
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

export default InstrumentationModule1Section2;