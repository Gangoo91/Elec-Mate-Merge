import { ArrowLeft, ArrowRight, Zap, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Battery, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule5Section2Quiz } from '@/components/upskilling/quiz/EVChargingModule5Section2Quiz';

const EVChargingModule5Section2 = () => {
  useEffect(() => {
    document.title = 'EV/PV/Battery Integration via HEMS - EV Charging Module 5 Section 2';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to integrate EV charging with renewable energy sources and battery storage through Home Energy Management Systems (HEMS). Covers system design, control strategies, and optimisation techniques.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            EV/PV/Battery Integration via HEMS
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Integrating charging with renewable energy and storage systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Home Energy Management Systems (HEMS) represent the future of intelligent energy consumption, enabling seamless integration between EV charging, solar photovoltaic (PV) generation, and battery storage systems. This integrated approach maximises renewable energy utilisation whilst minimising grid dependency and electricity costs.
              </p>
              <p>
                Modern HEMS platforms use sophisticated algorithms to coordinate energy flows between multiple sources and loads, prioritising renewable energy consumption, optimising battery charge/discharge cycles, and scheduling EV charging during periods of excess solar generation or low electricity prices.
              </p>
              <p>
                This section covers HEMS architecture, system integration strategies, control algorithms, and practical implementation techniques for creating intelligent, sustainable EV charging solutions that work harmoniously with renewable energy infrastructure and energy storage systems.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Design integrated EV/PV/Battery systems using HEMS technology</li>
                <li>Calculate energy flows and optimisation strategies for renewable integration</li>
                <li>Configure control algorithms for maximum solar self-consumption</li>
                <li>Implement battery storage coordination with EV charging schedules</li>
                <li>Analyse system performance and economic benefits of integrated solutions</li>
                <li>Troubleshoot communication and control issues in multi-device systems</li>
              </ul>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">HEMS Architecture and System Components</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Core HEMS Components</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Energy Management Controller</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Central Processing Unit:</strong> Real-time coordination of all energy devices and loads</p>
                      <p><strong>Data Acquisition:</strong> Continuous monitoring of generation, consumption, and storage</p>
                      <p><strong>Optimisation Engine:</strong> Algorithms for maximum efficiency and cost reduction</p>
                      <p><strong>User Interface:</strong> Mobile/web applications for monitoring and control</p>
                      <p><strong>Communication Hub:</strong> Multi-protocol connectivity for device integration</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Solar PV Integration</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Generation Monitoring:</strong> Real-time PV output measurement and forecasting</p>
                      <p><strong>MPPT Coordination:</strong> Maximum power point tracking optimisation</p>
                      <p><strong>Export Control:</strong> Grid export limitation and self-consumption maximisation</p>
                      <p><strong>Weather Integration:</strong> Solar generation prediction using meteorological data</p>
                      <p><strong>Performance Analytics:</strong> System efficiency monitoring and fault detection</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Battery Storage Coordination</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>State of Charge Management:</strong> Optimal battery charging and discharging strategies</p>
                      <p><strong>Cycle Life Optimisation:</strong> Battery health preservation through intelligent control</p>
                      <p><strong>Grid Services:</strong> Peak shaving, load shifting, and frequency response capabilities</p>
                      <p><strong>Emergency Backup:</strong> Critical load support during grid outages</p>
                      <p><strong>Thermal Management:</strong> Temperature monitoring and cooling system integration</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">⚡ Integration Benefits</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Maximises renewable energy self-consumption up to 90%</li>
                  <li>Reduces electricity bills by 60-80% through intelligent load management</li>
                  <li>Provides grid independence and resilience during outages</li>
                  <li>Enables participation in demand response and grid services</li>
                  <li>Optimises carbon footprint through clean energy prioritisation</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">EV Charging Integration Strategies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Solar-Driven Charging Modes</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Excess Solar Charging</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>EV charging power matches surplus PV generation</li>
                      <li>Prevents grid export whilst utilising free solar energy</li>
                      <li>Dynamic power adjustment based on cloud coverage</li>
                      <li>Minimum charging rate maintained from grid if required</li>
                      <li>Maximises solar self-consumption and bill savings</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Scheduled Solar Charging</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Pre-planned charging during forecast peak solar periods</li>
                      <li>Weather prediction integration for optimal scheduling</li>
                      <li>User departure time consideration for charge completion</li>
                      <li>Battery storage coordination for extended solar availability</li>
                      <li>Fallback to grid charging if solar insufficient</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Energy Storage Coordination</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Battery Priority Management</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Hierarchical Charging:</strong> Home battery priority over EV during peak tariff periods</p>
                      <p><strong>Load Balancing:</strong> Simultaneous charging of battery and EV when surplus available</p>
                      <p><strong>Discharge Control:</strong> Battery power to EV charging during grid peak periods</p>
                      <p><strong>Reserve Management:</strong> Maintaining minimum battery charge for emergency backup</p>
                      <p><strong>Cycle Optimisation:</strong> Minimising battery degradation through intelligent cycling</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Time-of-Use Optimisation</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Tariff Analysis:</strong> Real-time electricity pricing integration and forecasting</p>
                      <p><strong>Cost Minimisation:</strong> Charging scheduling during lowest price periods</p>
                      <p><strong>Peak Avoidance:</strong> Preventing charging during high-cost peak demand periods</p>
                      <p><strong>Export Revenue:</strong> Battery discharge to grid during high export price periods</p>
                      <p><strong>Carbon Optimisation:</strong> Charging during periods of cleanest grid electricity</p>
                    </div>
                  </div>

                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Control Algorithms and System Optimisation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Intelligent Control Strategies</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Predictive Control Algorithms</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Solar Forecasting:</strong> Weather-based PV generation prediction for next 24-48 hours</p>
                      <p><strong>Load Prediction:</strong> Historical consumption analysis for demand forecasting</p>
                      <p><strong>Price Forecasting:</strong> Electricity tariff prediction and optimisation strategies</p>
                      <p><strong>User Behaviour:</strong> Learning charging patterns and departure schedules</p>
                      <p><strong>Grid Conditions:</strong> Network demand and carbon intensity forecasting</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Real-Time Optimisation</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Energy Balance Calculation:</strong> Continuous generation vs. consumption monitoring</p>
                      <p><strong>Priority Matrix:</strong> Dynamic weighting of charging priorities and constraints</p>
                      <p><strong>Power Allocation:</strong> Optimal distribution between loads and storage systems</p>
                      <p><strong>Constraint Management:</strong> Ensuring system limits and safety parameters</p>
                      <p><strong>Performance Feedback:</strong> Continuous algorithm improvement through machine learning</p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Communication and Interoperability</h3>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Protocol Integration</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>OCPP Integration:</strong> EV charge point communication and control</p>
                    <p><strong>SunSpec Modbus:</strong> Solar inverter monitoring and control standards</p>
                    <p><strong>CAN Bus:</strong> Battery management system communication protocols</p>
                    <p><strong>Zigbee/Z-Wave:</strong> Smart home device integration and control</p>
                    <p><strong>MQTT/HTTP APIs:</strong> Cloud connectivity and third-party service integration</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-200 font-medium">Test your understanding:</p>
                <div className="space-y-3">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: What is the primary advantage of HEMS integration with EV charging?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        HEMS enables maximum utilisation of renewable solar energy for EV charging, reducing electricity costs by up to 80% whilst minimising grid dependency and carbon footprint.
                      </p>
                    </details>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: How does battery storage enhance EV charging integration?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        Battery storage extends the availability of solar energy for EV charging beyond daylight hours, provides backup power during outages, and enables participation in grid services for additional revenue.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What size solar PV system is needed for effective EV charging integration?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>A typical 4-6kW solar system can provide 15-25kWh daily generation, sufficient for 60-100 miles of daily EV driving. Larger 8-12kW systems enable complete energy independence for most households with normal driving patterns.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can HEMS work with existing solar and battery installations?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Yes, modern HEMS platforms can integrate with most existing solar inverters and battery systems through standard communication protocols like Modbus, SunSpec, and manufacturer APIs. Retrofit integration typically requires minimal additional hardware.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How reliable is solar-dependent EV charging?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>HEMS systems include intelligent fallback to grid charging when solar is insufficient, ensuring reliable EV availability. Battery storage and weather forecasting further improve charging reliability and predictability.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What are the typical cost savings from integrated EV/PV/Battery systems?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Integrated systems typically achieve 60-80% reduction in electricity costs, £800-2000 annual savings for average households, and 5-8 year payback periods including government incentives and reduced grid dependency.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How does HEMS handle multiple EVs in one household?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Advanced HEMS platforms can coordinate multiple EVs through priority scheduling, available solar allocation, and user-defined charging requirements. Systems balance immediate needs with overnight optimisation and grid constraints.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What maintenance is required for integrated HEMS systems?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>HEMS require minimal maintenance - annual software updates, periodic communication testing, and standard solar/battery maintenance. Self-diagnostic capabilities alert users to performance issues and maintenance requirements.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can HEMS integrate with smart home automation systems?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Yes, HEMS platforms typically offer APIs and integration with popular smart home systems like Home Assistant, SmartThings, and Apple HomeKit, enabling voice control and advanced automation scenarios.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How does grid export control work with EV charging?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>HEMS continuously monitors generation and consumption, directing excess solar power to EV charging before grid export. This maximises self-consumption whilst complying with DNO export limitations and optimising financial returns.</p>
                  </div>
                </details>

              </div>
            </CardContent>
          </Card>

          {/* Real-World Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Battery className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real-World Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Case Study 1 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 1: Suburban Family Home Integration</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>System:</strong> 8kW solar PV, 13.5kWh battery storage, dual EV household with HEMS coordination.</p>
                  <p><strong>Challenge:</strong> Maximise solar self-consumption, minimise electricity bills, ensure reliable EV charging for daily commutes.</p>
                  <p><strong>Implementation:</strong> Intelligent scheduling prioritises solar charging during peak generation, battery backup for evening charging, grid fallback for urgent requirements.</p>
                  <p><strong>Results:</strong> 85% solar self-consumption achieved, £1,400 annual electricity savings, 95% renewable EV charging, complete grid independence during summer months.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Proper system sizing and intelligent control algorithms enable near-complete energy independence whilst maintaining convenience and reliability.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 2: Commercial Fleet Integration</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>System:</strong> 100kW commercial solar array, 200kWh battery system, 20-vehicle fleet charging with HEMS coordination.</p>
                  <p><strong>Challenge:</strong> Reduce operational costs, minimise peak demand charges, maintain fleet availability during working hours.</p>
                  <p><strong>Implementation:</strong> Predictive algorithms coordinate fleet charging with solar generation forecasts, battery peak shaving, and time-of-use optimisation.</p>
                  <p><strong>Results:</strong> 70% reduction in electricity costs, £25,000 annual savings, eliminated demand charges, 90% renewable fleet operation.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Commercial-scale HEMS integration provides significant economic benefits whilst supporting sustainability goals and corporate social responsibility.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 3: Community Energy Sharing</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>System:</strong> 12-home development with shared 150kW solar farm, distributed battery storage, coordinated EV charging network.</p>
                  <p><strong>Challenge:</strong> Optimise community energy resources, enable peer-to-peer energy trading, maintain individual household autonomy.</p>
                  <p><strong>Implementation:</strong> Advanced HEMS platform coordinates community resources whilst respecting individual preferences and priority settings.</p>
                  <p><strong>Results:</strong> 95% renewable energy achievement, 60% average cost reduction, enhanced energy security, successful peer-trading implementation.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Community-scale HEMS enables shared renewable resources and energy trading whilst maintaining individual control and optimising collective benefits.</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-green-200 space-y-4">
              <p>
                HEMS integration represents the pinnacle of intelligent energy management, enabling seamless coordination between EV charging, renewable generation, and energy storage to maximise sustainability whilst minimising costs and grid dependency.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Key Integration Components:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Intelligent energy management controller with optimisation algorithms</li>
                    <li>Solar PV integration with generation forecasting capabilities</li>
                    <li>Battery storage coordination with cycle life optimisation</li>
                    <li>Multi-protocol communication for seamless device integration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Benefits and Outcomes:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Up to 90% renewable energy self-consumption achievement</li>
                    <li>60-80% reduction in electricity bills through intelligent optimisation</li>
                    <li>Enhanced energy security and grid independence capabilities</li>
                    <li>Participation in grid services and demand response programmes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule5Section2Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-5-section-1">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-5-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule5Section2;