import { ArrowLeft, ArrowRight, Wrench, CheckCircle, AlertCircle, Monitor, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import RenewableEnergyFinancialCalculators from '@/components/upskilling/renewable-energy/RenewableEnergyFinancialCalculators';

const RenewableEnergyModule9Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What software is commonly used for solar design in the UK?",
      options: [
        "AutoCAD only",
        "PV*Sol, SolarEdge Designer, and SketchUp",
        "Microsoft Excel",
        "Google Earth"
      ],
      correct: 1,
      explanation: "PV*Sol and SolarEdge Designer are industry-standard software tools, while SketchUp is often used for 3D visualisation. These provide comprehensive design, shading analysis, and financial modelling capabilities."
    },
    {
      id: 2,
      question: "What does SAP assess in building applications?",
      options: [
        "Solar panel efficiency only",
        "Overall energy performance and carbon emissions of buildings",
        "Structural integrity",
        "Planning permission requirements"
      ],
      correct: 1,
      explanation: "SAP (Standard Assessment Procedure) is the UK's methodology for assessing energy performance of dwellings, calculating energy costs, carbon emissions, and energy ratings for building regulations compliance."
    },
    {
      id: 3,
      question: "Name three key outputs from PV modelling tools.",
      options: [
        "Colour, weight, and price",
        "kWh/year yield, financial ROI, and CO₂ savings",
        "Length, width, and height",
        "Voltage, current, and resistance"
      ],
      correct: 1,
      explanation: "PV modelling tools provide annual energy yield (kWh/year), financial metrics (ROI, payback), and environmental benefits (CO₂ savings), along with detailed performance analysis and system optimisation data."
    },
    {
      id: 4,
      question: "Why include CO₂ savings in reports?",
      options: [
        "It's legally required",
        "Environmental benefits support business cases and demonstrate sustainability impact",
        "It increases the system price",
        "It's only for government buildings"
      ],
      correct: 1,
      explanation: "CO₂ savings demonstrate environmental benefits, support corporate sustainability goals, can be required for grant applications, and help justify investments beyond purely financial returns."
    },
    {
      id: 5,
      question: "What affects simulation accuracy the most?",
      options: [
        "The brand of software used",
        "Quality of input data (weather, shading, load profiles)",
        "The computer processor speed",
        "The price of the system"
      ],
      correct: 1,
      explanation: "Simulation accuracy depends heavily on input data quality: accurate weather data, precise shading analysis, realistic load profiles, and correct equipment specifications are crucial for reliable predictions."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-9">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 9
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Tools for Estimating Yield and Return (PV*Sol, SAP, etc.)
                </h1>
                <p className="text-xl text-gray-400">
                  Software tools for financial modelling and yield estimation
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 9
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 4
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Modelling tools allow installers to forecast energy generation, financial returns, and 
                payback periods with precision. These software packages are essential for accurate system 
                design, client presentations, and securing project funding.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Learn how to use modelling software for system design</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Input weather, shading, and load profile data</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand simulation outputs like kWh/year and ROI</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Present results to clients in clear reports</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">PV*Sol - Comprehensive Solar Design Platform</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Industry Standard Tool:</h4>
                <p className="text-sm">
                  PV*Sol by Valentin Software is widely considered the gold standard for solar system 
                  design and financial modelling in the UK and globally, offering comprehensive 3D design 
                  and detailed performance simulation capabilities.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Key Features and Capabilities:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                      <h5 className="text-white font-medium mb-3">3D Design and Visualisation:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>3D roof modelling:</strong> Import satellite data or CAD drawings</li>
                        <li>• <strong>Module placement:</strong> Automatic and manual layout options</li>
                        <li>• <strong>Shading analysis:</strong> Near and far shading objects</li>
                        <li>• <strong>Visualisation:</strong> Photorealistic renderings for client presentations</li>
                        <li>• <strong>Orientation optimisation:</strong> Automatic tilt and azimuth adjustment</li>
                        <li>• <strong>Roof penetration planning:</strong> Mounting system integration</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-4 rounded border border-yellow-400/30">
                      <h5 className="text-white font-medium mb-3">Performance Simulation:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Weather data:</strong> Meteonorm database with local weather stations</li>
                        <li>• <strong>Irradiance calculation:</strong> Minute-by-minute solar analysis</li>
                        <li>• <strong>Temperature effects:</strong> Module performance at different temperatures</li>
                        <li>• <strong>System losses:</strong> DC/AC conversion, cable losses, soiling</li>
                        <li>• <strong>Degradation modelling:</strong> Long-term performance decline</li>
                        <li>• <strong>Mismatch analysis:</strong> String-level performance variations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">Financial Modelling Capabilities:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h6 className="text-yellow-400 font-medium mb-3">Cost Analysis:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Component costs and labour</li>
                          <li>• Installation and commissioning</li>
                          <li>• Maintenance and replacement schedules</li>
                          <li>• Financing options and interest rates</li>
                          <li>• Insurance and operational costs</li>
                          <li>• VAT and tax considerations</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-cyan-400 font-medium mb-3">Revenue Streams:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Electricity bill savings</li>
                          <li>• SEG export payments</li>
                          <li>• Feed-in tariff (legacy systems)</li>
                          <li>• Power Purchase Agreements</li>
                          <li>• Grid services revenue</li>
                          <li>• Carbon credit monetisation</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-green-400 font-medium mb-3">Financial Metrics:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Simple and discounted payback</li>
                          <li>• Net Present Value (NPV)</li>
                          <li>• Internal Rate of Return (IRR)</li>
                          <li>• Levelised Cost of Energy (LCOE)</li>
                          <li>• Return on Investment (ROI)</li>
                          <li>• Sensitivity analysis scenarios</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-4">Advanced Features for Professional Use:</h4>
                  <div className="space-y-4">
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                      <h5 className="text-white font-medium mb-3">Energy Management Integration:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Battery Storage Modelling:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Battery capacity and efficiency curves</li>
                            <li>• Charge/discharge strategies</li>
                            <li>• Degradation and replacement cycles</li>
                            <li>• Grid services participation</li>
                            <li>• Time-of-use tariff optimisation</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-purple-400 font-medium mb-2">Load Profile Integration:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Hourly consumption data import</li>
                            <li>• Smart meter data analysis</li>
                            <li>• Heat pump integration modelling</li>
                            <li>• EV charging optimisation</li>
                            <li>• Demand response strategies</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                      <h5 className="text-white font-medium mb-3">Reporting and Documentation:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-green-400 font-medium mb-2">Technical Reports:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Detailed yield calculations</li>
                            <li>• Shading analysis reports</li>
                            <li>• String design documentation</li>
                            <li>• Performance ratio analysis</li>
                            <li>• Loss budget breakdowns</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-cyan-400 font-medium mb-2">Client Presentations:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Executive summary reports</li>
                            <li>• Financial projections and graphs</li>
                            <li>• 3D visualisations and layouts</li>
                            <li>• Environmental impact summaries</li>
                            <li>• Customisable branded templates</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">SAP (Standard Assessment Procedure) Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">SAP Overview and Applications:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-4 rounded border border-yellow-400/30">
                      <h5 className="text-white font-medium mb-3">What SAP Calculates:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Energy Performance Certificate (EPC) ratings:</strong> A-G scale</li>
                        <li>• <strong>Primary energy consumption:</strong> kWh/m²/year</li>
                        <li>• <strong>CO₂ emissions:</strong> kg CO₂/m²/year</li>
                        <li>• <strong>Energy costs:</strong> Annual fuel bills</li>
                        <li>• <strong>Building compliance:</strong> Part L building regulations</li>
                        <li>• <strong>Target Emission Rate (TER):</strong> New build requirements</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                      <h5 className="text-white font-medium mb-3">Solar PV in SAP Calculations:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Generation credit:</strong> Reduces primary energy consumption</li>
                        <li>• <strong>EPC rating improvement:</strong> Can move properties up rating bands</li>
                        <li>• <strong>Building regulations compliance:</strong> Helps meet Part L requirements</li>
                        <li>• <strong>Planning considerations:</strong> Renewable energy targets</li>
                        <li>• <strong>Property value impact:</strong> Better EPC ratings</li>
                        <li>• <strong>Green financing eligibility:</strong> Mortgage rate benefits</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">SAP Software Tools:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h6 className="text-yellow-400 font-medium mb-3">Professional SAP Software:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• <strong>Elmhurst Energy Systems:</strong> SAP 2012 and SAP 10</li>
                          <li>• <strong>IES Virtual Environment:</strong> Integrated building simulation</li>
                          <li>• <strong>NHER Plan Assessor:</strong> SAP calculations and compliance</li>
                          <li>• <strong>Stroma FSAP:</strong> Full SAP assessment tool</li>
                          <li>• <strong>EPC software integration:</strong> Direct EPC generation</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-cyan-400 font-medium mb-3">Integration Requirements:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Building fabric data input</li>
                          <li>• Heating system specifications</li>
                          <li>• Solar PV system details</li>
                          <li>• Shading and orientation factors</li>
                          <li>• Ventilation and thermal bridging</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-green-400 font-medium mb-3">Output Benefits:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Regulatory compliance documentation</li>
                          <li>• EPC rating predictions</li>
                          <li>• Building performance certificates</li>
                          <li>• Energy improvement recommendations</li>
                          <li>• Carbon reduction quantification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Other Professional Design Tools</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Alternative Software Platforms:</h4>
                  <div className="space-y-4">
                    <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                      <h5 className="text-white font-medium mb-3">SolarEdge Designer:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Features:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Free web-based platform</li>
                            <li>• Integrated with SolarEdge equipment</li>
                            <li>• Automatic roof detection from satellite data</li>
                            <li>• Shading analysis and irradiance mapping</li>
                            <li>• Module-level design and optimisation</li>
                            <li>• String design validation</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Outputs:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Annual energy production estimates</li>
                            <li>• System layout and specifications</li>
                            <li>• Bill of materials</li>
                            <li>• Performance ratio calculations</li>
                            <li>• Installation drawings</li>
                            <li>• Customer presentation materials</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-900/20 p-4 rounded border border-cyan-500/30">
                      <h5 className="text-white font-medium mb-3">HOMER Pro:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-purple-400 font-medium mb-2">Specialisation:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Microgrid and hybrid system design</li>
                            <li>• Solar + battery + generator systems</li>
                            <li>• Grid-tied and off-grid applications</li>
                            <li>• Load management and demand response</li>
                            <li>• Economic optimisation algorithms</li>
                            <li>• Sensitivity and uncertainty analysis</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-orange-400 font-medium mb-2">Applications:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Remote and rural installations</li>
                            <li>• Industrial and commercial microgrids</li>
                            <li>• Island and off-grid communities</li>
                            <li>• Research and development projects</li>
                            <li>• Feasibility studies</li>
                            <li>• Technology comparison analysis</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                      <h5 className="text-white font-medium mb-3">Additional Design Tools:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h6 className="text-green-400 font-medium mb-2">SketchUp + Extensions:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• 3D building modelling</li>
                            <li>• Solar analysis extensions</li>
                            <li>• Shading studies</li>
                            <li>• Client visualisation</li>
                            <li>• Cost-effective option</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">AutoCAD + Solar:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Technical drawing production</li>
                            <li>• Electrical schematic design</li>
                            <li>• Detailed installation drawings</li>
                            <li>• Engineering documentation</li>
                            <li>• Industry standard format</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-cyan-400 font-medium mb-2">Manufacturer Tools:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Enphase System Designer</li>
                            <li>• SMA Sunny Design</li>
                            <li>• Fronius Solar.start</li>
                            <li>• Equipment-specific optimisation</li>
                            <li>• Warranty and performance validation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Data Inputs and Simulation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">Critical Input Parameters:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-900/20 p-4 rounded border border-yellow-400/30">
                      <h5 className="text-white font-medium mb-3">Site and Environmental Data:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Location coordinates:</strong> Latitude, longitude, elevation</li>
                        <li>• <strong>Weather data:</strong> 20+ years historical records</li>
                        <li>• <strong>Solar irradiance:</strong> Global horizontal and direct normal</li>
                        <li>• <strong>Temperature data:</strong> Ambient and module operating temperatures</li>
                        <li>• <strong>Wind speed:</strong> Affects module cooling and performance</li>
                        <li>• <strong>Atmospheric conditions:</strong> Humidity, air mass, turbidity</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30">
                      <h5 className="text-white font-medium mb-3">System Design Parameters:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Module specifications:</strong> Power rating, efficiency, temperature coefficients</li>
                        <li>• <strong>Inverter characteristics:</strong> Efficiency curves, MPPT ranges</li>
                        <li>• <strong>Array configuration:</strong> Tilt angle, azimuth, row spacing</li>
                        <li>• <strong>Mounting system:</strong> Type, height, ventilation characteristics</li>
                        <li>• <strong>DC wiring:</strong> Cable losses, string configuration</li>
                        <li>• <strong>AC infrastructure:</strong> Transformer losses, grid connection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">Advanced Modelling Considerations:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h6 className="text-green-400 font-medium mb-3">Shading Analysis:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Near shading: chimneys, dormer windows</li>
                          <li>• Far shading: trees, buildings, hills</li>
                          <li>• Self-shading: row-to-row effects</li>
                          <li>• Seasonal variations</li>
                          <li>• Time-of-day impact assessment</li>
                          <li>• Partial shading optimisation strategies</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-cyan-400 font-medium mb-3">Performance Losses:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Module degradation (0.5-0.8%/year)</li>
                          <li>• Soiling and dust accumulation</li>
                          <li>• Snow coverage (seasonal)</li>
                          <li>• Inverter efficiency variations</li>
                          <li>• DC and AC cable losses</li>
                          <li>• Transformer and grid losses</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-orange-400 font-medium mb-3">Load Profile Integration:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Hourly consumption patterns</li>
                          <li>• Seasonal demand variations</li>
                          <li>• Weekday vs weekend differences</li>
                          <li>• Business vs residential profiles</li>
                          <li>• Smart meter data import</li>
                          <li>• Future load growth projections</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Professional Report Generation and Client Presentation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Essential Report Components:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                      <h5 className="text-white font-medium mb-3">Technical Summary:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>System specifications:</strong> Capacity, module count, inverter details</li>
                        <li>• <strong>Performance predictions:</strong> Annual kWh yield, monthly breakdown</li>
                        <li>• <strong>Efficiency metrics:</strong> Performance ratio, specific yield</li>
                        <li>• <strong>Loss analysis:</strong> Detailed breakdown of system losses</li>
                        <li>• <strong>Compliance information:</strong> Building regulations, grid codes</li>
                        <li>• <strong>Warranty details:</strong> Component warranties and guarantees</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                      <h5 className="text-white font-medium mb-3">Financial Analysis:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Investment summary:</strong> Total system cost breakdown</li>
                        <li>• <strong>Revenue projections:</strong> Self-consumption savings, export income</li>
                        <li>• <strong>Payback analysis:</strong> Simple and discounted payback periods</li>
                        <li>• <strong>Long-term returns:</strong> 25-year NPV, IRR, total savings</li>
                        <li>• <strong>Sensitivity analysis:</strong> Best/worst case scenarios</li>
                        <li>• <strong>Financing options:</strong> Loan terms, leasing alternatives</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">Environmental Impact Documentation:</h4>
                  <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                    <h5 className="text-white font-medium mb-3">CO₂ and Environmental Benefits:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h6 className="text-green-400 font-medium mb-2">Carbon Savings:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Annual CO₂ reduction (tonnes)</li>
                          <li>• Lifetime carbon offset</li>
                          <li>• Equivalent trees planted</li>
                          <li>• Cars removed from road equivalent</li>
                          <li>• Carbon payback time</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-yellow-400 font-medium mb-2">Energy Metrics:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Primary energy savings</li>
                          <li>• Fossil fuel displacement</li>
                          <li>• Energy payback time</li>
                          <li>• Renewable energy percentage</li>
                          <li>• Grid decarbonisation contribution</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-yellow-400 font-medium mb-2">Sustainability Impact:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Corporate sustainability goals</li>
                          <li>• ESG reporting contributions</li>
                          <li>• Green building certification points</li>
                          <li>• Public sector carbon targets</li>
                          <li>• Community environmental benefits</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-4">Client Presentation Best Practices:</h4>
                  <div className="bg-cyan-900/20 p-4 rounded border border-cyan-500/30">
                    <h5 className="text-white font-medium mb-3">Effective Communication Strategies:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h6 className="text-orange-400 font-medium mb-2">Visual Elements:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• 3D system visualisations and renderings</li>
                          <li>• Before/after property images</li>
                          <li>• Performance graphs and charts</li>
                          <li>• Financial projection timelines</li>
                          <li>• Interactive presentations and tools</li>
                          <li>• Mobile-friendly report formats</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-purple-400 font-medium mb-2">Key Messages:</h6>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Clear payback period communication</li>
                          <li>• Long-term financial benefits</li>
                          <li>• Environmental impact quantification</li>
                          <li>• Energy independence benefits</li>
                          <li>• Property value enhancement</li>
                          <li>• Technology reliability and warranties</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> An installer uses PV*Sol to show a school that their proposed 
                  100kW system will generate 95,000 kWh annually, pay back in 7 years, save £180,000 over 
                  25 years, and prevent 13 tonnes of CO₂ emissions annually — the comprehensive analysis 
                  and professional presentation secured the £85,000 project.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Accurate modelling using professional software builds client confidence, secures project 
                funding, and ensures realistic expectations post-installation. The investment in quality 
                design tools pays dividends through improved project success rates and customer satisfaction.
              </p>
            </CardContent>
          </Card>

          <RenewableEnergyFinancialCalculators />

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={quizQuestions} title="Modelling Tools Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-9-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-10">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9Section4;