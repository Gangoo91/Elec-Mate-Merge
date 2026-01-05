import { ArrowLeft, ArrowRight, Clock, CheckCircle, Users, Lightbulb, HelpCircle, Settings, BookOpen, Target, AlertTriangle, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule5Section4Quiz } from '@/components/upskilling/quiz/EVChargingModule5Section4Quiz';

const EVChargingModule5Section4 = () => {
  useEffect(() => {
    document.title = 'Off-Peak Charging Strategies - EV Charging Module 5 Section 4';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master off-peak charging strategies to optimise costs and grid impact. Learn tariff structures, smart scheduling, and implementation best practices.');
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
            <Clock className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Off-Peak Charging Strategies
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Optimising charging times for cost and grid impact through intelligent scheduling and tariff management
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">

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
                Off-peak charging strategies are fundamental to maximising the economic and environmental benefits 
                of electric vehicle charging whilst minimising strain on the electrical grid. This section explores 
                the principles, technologies, and implementation methods for effective off-peak charging programmes.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Why Off-Peak Charging Matters</h4>
                <ul className="text-sm space-y-1">
                  <li>• Reduces electricity costs by 40-60% compared to peak rates</li>
                  <li>• Minimises grid stress during high-demand periods</li>
                  <li>• Maximises utilisation of renewable energy generation</li>
                  <li>• Supports grid stability through demand-side management</li>
                  <li>• Enables faster charging speeds during low-demand periods</li>
                </ul>
              </div>
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
              <div className="space-y-3">
                {[
                  "Understand UK electricity tariff structures and time-of-use pricing",
                  "Design automated off-peak charging systems and schedules",
                  "Implement smart charging algorithms for cost optimisation",
                  "Configure load management systems for demand response",
                  "Integrate renewable energy sources with charging schedules",
                  "Calculate economic benefits of off-peak charging strategies"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content/Learning */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Off-Peak Charging Strategies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* UK Electricity Tariff Structure */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">UK Electricity Tariff Structure</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Standard Tariffs</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Single rate: 24-28p/kWh average</li>
                        <li>• Standing charge: 40-50p/day</li>
                        <li>• No time differentiation</li>
                        <li>• Simple but not cost-optimised</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Economy 7 Tariffs</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Off-peak: 9-15p/kWh (00:30-07:30)</li>
                        <li>• Peak: 30-35p/kWh (07:30-00:30)</li>
                        <li>• 7-hour off-peak window</li>
                        <li>• Ideal for overnight EV charging</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-200 mb-2">Modern Time-of-Use Tariffs</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Super Off-Peak (02:00-05:00):</p>
                        <p>5-10p/kWh - Renewable surplus periods</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Off-Peak (23:00-07:00):</p>
                        <p>12-18p/kWh - Standard overnight rate</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Peak (16:00-19:00):</p>
                        <p>35-50p/kWh - High demand periods</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Charging Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Smart Charging Technologies</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Timer-Based Charging</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Basic Implementation</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Set charging start time (e.g., 00:30)</li>
                          <li>• Programme charging duration</li>
                          <li>• Manual schedule configuration</li>
                          <li>• Fixed timing regardless of demand</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Advanced Features</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Multiple timer profiles</li>
                          <li>• Seasonal schedule adjustment</li>
                          <li>• Holiday mode programming</li>
                          <li>• Integration with tariff data</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Dynamic Load Management</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Grid Signal Response</h5>
                        <p className="text-xs">Real-time adjustment to grid frequency and demand signals</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Price Optimisation</h5>
                        <p className="text-xs">Automated charging during lowest cost periods</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Load Balancing</h5>
                        <p className="text-xs">Distribution of charging across available time windows</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Strategies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Implementation Strategies</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Domestic Installations</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Install smart EV charger with scheduling</li>
                        <li>• Configure for Economy 7 or ToU tariff</li>
                        <li>• Set departure time-based charging</li>
                        <li>• Monitor consumption via app</li>
                        <li>• Regular schedule optimisation</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Commercial Fleet Charging</h4>
                      <ul className="text-sm space-y-2">
                        <li>• Implement centralised management system</li>
                        <li>• Vehicle arrival/departure scheduling</li>
                        <li>• Load sequencing across fleet</li>
                        <li>• Integration with fleet management</li>
                        <li>• Demand forecasting algorithms</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-200 mb-2">Best Practice Implementation</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Phase 1 - Basic Setup:</p>
                        <p>Configure timers for standard off-peak periods, monitor consumption patterns</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Phase 2 - Smart Integration:</p>
                        <p>Implement dynamic pricing response and grid signal integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Cost Calculation Example</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-yellow-400 font-medium">Standard Tariff Charging:</p>
                    <p>40kWh × 26p = £10.40 per charge</p>
                    <p>Annual cost (3 charges/week): £1,622</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium">Off-Peak Charging:</p>
                    <p>40kWh × 12p = £4.80 per charge</p>
                    <p>Annual cost (3 charges/week): £749</p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-800/30 rounded">
                  <p className="text-green-200 text-sm">
                    <strong>Annual Savings:</strong> £873 (54% reduction)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "What if I need to charge during peak hours due to urgent travel?",
                  answer: "Most smart chargers allow manual override for urgent charging needs. However, this should be used sparingly as peak rates can be 3-4 times higher than off-peak rates. Consider portable charging or public rapid chargers for emergency top-ups."
                },
                {
                  question: "How do I know my local off-peak times and rates?",
                  answer: "Check your electricity supplier's tariff details. Economy 7 typically runs 00:30-07:30, but times can vary by region. Many suppliers now offer app-based tariff information showing real-time and forecast pricing."
                },
                {
                  question: "Can smart charging damage my vehicle's battery?",
                  answer: "No, smart charging using standard AC rates (3-22kW) is actually better for battery longevity than rapid DC charging. Slower, overnight charging reduces battery thermal stress and can extend battery life."
                },
                {
                  question: "What happens if my car isn't ready when I need it?",
                  answer: "Modern smart chargers allow you to set a 'departure time' ensuring the vehicle is charged by when you need it. The system works backwards from this time to determine the latest start time for charging."
                },
                {
                  question: "Do I need a special electricity meter for off-peak charging?",
                  answer: "Economy 7 requires a dual-rate meter, but modern smart meters can handle multiple tariff periods automatically. Time-of-use tariffs work with existing smart meters without additional hardware."
                },
                {
                  question: "How much can I save with off-peak charging?",
                  answer: "Typical savings range from 40-60% on charging costs. A household charging 10,000 miles annually could save £400-800 per year compared to peak rate charging, depending on the tariff structure."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Real-World Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real-World Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Case Study 1: Residential Smart Charging</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Location:</p>
                      <p className="text-sm">3-bedroom house, Surrey</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Setup:</p>
                      <p className="text-sm">7kW Zappi charger, Octopus Go tariff, Tesla Model 3</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Implementation:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Charging scheduled for 00:30-04:30 (5p/kWh)</li>
                        <li>• Solar PV integration for daytime top-ups</li>
                        <li>• Smart home integration with Alexa</li>
                        <li>• Monthly usage monitoring and optimisation</li>
                      </ul>
                    </div>
                    <div className="bg-green-800/30 p-3 rounded">
                      <p className="text-green-200 font-medium text-sm">Results:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 68% reduction in charging costs</li>
                        <li>• £947 annual savings</li>
                        <li>• 12-month payback on smart charger</li>
                        <li>• 95% off-peak charging compliance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Case Study 2: Commercial Fleet Operation</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Location:</p>
                      <p className="text-sm">Delivery company depot, Manchester</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Setup:</p>
                      <p className="text-sm">15 × 22kW chargers, 25-vehicle electric fleet, ChargePoint management</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Implementation:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Vehicle return schedule integration</li>
                        <li>• Load balancing across charging points</li>
                        <li>• Half-hourly meter for reduced rates</li>
                        <li>• Predictive charging based on route data</li>
                      </ul>
                    </div>
                    <div className="bg-green-800/30 p-3 rounded">
                      <p className="text-green-200 font-medium text-sm">Results:</p>
                      <ul className="text-sm space-y-1">
                        <li>• £14,000 annual electricity savings</li>
                        <li>• 43% reduction in peak demand charges</li>
                        <li>• 18-month ROI on smart infrastructure</li>
                        <li>• 99.7% fleet availability maintained</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-600 p-5 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-3">Case Study 3: Multi-Tenancy Apartment Complex</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Challenge:</p>
                    <p className="text-sm">120-unit apartment block with limited electrical capacity and varied charging needs</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Solution:</p>
                    <p className="text-sm">Dynamic load management system with user-configurable scheduling and fair access algorithms</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Outcome:</p>
                    <p className="text-sm">95% resident satisfaction, 30% lower electricity costs, no infrastructure upgrades required</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Implementation Details */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Technical Implementation Guide</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Smart Charging Algorithms */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Smart Charging Algorithms</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Demand Response Algorithm</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Input Parameters</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Current grid frequency (49.8-50.2 Hz)</li>
                          <li>• Real-time electricity pricing</li>
                          <li>• Vehicle departure time requirements</li>
                          <li>• Current state of charge (SoC)</li>
                          <li>• Available charging power capacity</li>
                          <li>• Local renewable generation forecast</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Control Logic</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Priority 1: Meet departure time SoC requirements</li>
                          <li>• Priority 2: Minimise charging cost</li>
                          <li>• Priority 3: Maximise renewable energy usage</li>
                          <li>• Priority 4: Support grid stability</li>
                          <li>• Dynamic power modulation (1-100%)</li>
                          <li>• Pause charging during grid stress events</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Load Balancing Implementation</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Sequential Charging</h5>
                        <p className="text-sm">Charges vehicles one at a time to maximum power, then moves to next vehicle. Simple but may not meet all departure times.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Equal Share Distribution</h5>
                        <p className="text-sm">Divides available power equally among all connected vehicles. Fair but may be inefficient for varying battery sizes.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Priority-Based Allocation</h5>
                        <p className="text-sm">Assigns power based on departure time urgency and required charging energy. Most efficient for mixed-use scenarios.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration with Grid Services */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Grid Services Integration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Vehicle-to-Grid (V2G) Preparation</h4>
                    <ul className="text-sm space-y-2">
                      <li>• CHAdeMO or CCS2 bidirectional capability verification</li>
                      <li>• Grid export licensing and metering requirements</li>
                      <li>• Battery warranty implications assessment</li>
                      <li>• Revenue potential calculation (£200-500/year)</li>
                      <li>• Grid code compliance for reactive power support</li>
                      <li>• Emergency backup power configuration</li>
                    </ul>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Frequency Response Services</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Dynamic Containment (DC) service participation</li>
                      <li>• Firm Frequency Response (FFR) capability</li>
                      <li>• Enhanced Frequency Response (EFR) qualification</li>
                      <li>• Response time requirements (2-30 seconds)</li>
                      <li>• Minimum asset size thresholds (1MW+)</li>
                      <li>• Aggregation services for smaller installations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Monitoring and Analytics */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Monitoring and Analytics</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Key Performance Indicators (KPIs)</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Cost Efficiency</h5>
                        <p className="text-xs">Average cost per kWh, monthly savings vs standard tariff, cost per mile driven</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Grid Impact</h5>
                        <p className="text-xs">Peak demand contribution, load factor improvement, grid frequency support</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">User Experience</h5>
                        <p className="text-xs">Departure time compliance, charging completion rate, user satisfaction scores</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Data Analytics Platform</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Real-Time Dashboard</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Live charging status and power flow</li>
                          <li>• Current electricity rates and forecasts</li>
                          <li>• Grid frequency and carbon intensity</li>
                          <li>• Renewable generation levels</li>
                          <li>• Active demand response events</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Historical Analysis</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monthly cost analysis and trends</li>
                          <li>• Charging pattern optimisation recommendations</li>
                          <li>• Carbon footprint tracking</li>
                          <li>• Peak demand analysis</li>
                          <li>• Equipment utilisation reports</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Strategies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Advanced Off-Peak Strategies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Renewable Energy Integration */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Renewable Energy Integration</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Solar PV Optimisation</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Daytime Charging Strategy</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Monitor solar generation vs consumption</li>
                          <li>• Divert excess PV to EV charging</li>
                          <li>• Minimise grid export during peak generation</li>
                          <li>• Coordinate with battery storage systems</li>
                          <li>• Weather forecast integration</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Hybrid Charging Approach</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Morning: Solar PV top-up charging</li>
                          <li>• Afternoon: Peak avoidance mode</li>
                          <li>• Evening: Grid import minimisation</li>
                          <li>• Night: Off-peak completion charging</li>
                          <li>• Seasonal profile adjustment</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-200 mb-3">Wind Generation Correlation</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">High Wind Periods:</p>
                        <p>Typically overnight and winter months - aligns well with EV charging patterns</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Grid Carbon Intensity:</p>
                        <p>Lowest between 02:00-06:00 when renewable percentage peaks</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Price Signals:</p>
                        <p>Negative pricing during high renewable generation periods</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive Analytics */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Predictive Analytics and Machine Learning</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Usage Pattern Learning</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Data Collection</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Historical charging sessions</li>
                          <li>• Vehicle arrival/departure times</li>
                          <li>• Daily/weekly driving patterns</li>
                          <li>• Seasonal usage variations</li>
                          <li>• User behaviour preferences</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Predictive Modelling</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Machine learning algorithms</li>
                          <li>• Future energy requirement forecasting</li>
                          <li>• Optimal charging schedule generation</li>
                          <li>• Anomaly detection and alerts</li>
                          <li>• Continuous model improvement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Weather and Grid Forecasting</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Weather Integration</h5>
                        <p className="text-sm">Temperature effects on battery efficiency, solar/wind generation forecasts, and heating/cooling load predictions to optimise charging windows.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Grid Demand Forecasting</h5>
                        <p className="text-sm">National Grid ESO data integration for demand predictions, transmission constraint forecasting, and renewable generation scheduling.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Emerging Technologies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Blockchain and Peer-to-Peer Trading</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Local energy trading between EV owners</li>
                      <li>• Smart contracts for automated settlements</li>
                      <li>• Decentralised grid balancing services</li>
                      <li>• Transparent carbon credit trading</li>
                      <li>• Community energy sharing protocols</li>
                    </ul>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">5G and IoT Integration</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Ultra-low latency grid response</li>
                      <li>• Massive device connectivity</li>
                      <li>• Edge computing for local optimisation</li>
                      <li>• Advanced vehicle connectivity</li>
                      <li>• Real-time network slicing for priority charging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning Cards */}
          <Card className="bg-red-900/20 border-red-600 border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-200">Important Considerations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-red-800/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-200 mb-2">Regulatory Compliance</h4>
                  <ul className="text-sm text-red-100 space-y-1">
                    <li>• G99 grid connection requirements for installations &gt;16A</li>
                    <li>• DNO notification requirements for load increases &gt;3.68kW</li>
                    <li>• Building regulations compliance for electrical installations</li>
                    <li>• Data protection (GDPR) for usage monitoring systems</li>
                  </ul>
                </div>
                <div className="bg-red-800/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-200 mb-2">Safety Considerations</h4>
                  <ul className="text-sm text-red-100 space-y-1">
                    <li>• Ensure adequate earthing and RCD protection</li>
                    <li>• Regular PAT testing of portable charging equipment</li>
                    <li>• Fire safety protocols for underground car parks</li>
                    <li>• Emergency stop procedures for automated systems</li>
                  </ul>
                </div>
                <div className="bg-red-800/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-200 mb-2">Grid Impact Limits</h4>
                  <ul className="text-sm text-red-100 space-y-1">
                    <li>• Maximum 80% transformer loading during peak periods</li>
                    <li>• Voltage regulation within ±6% of nominal</li>
                    <li>• Harmonic distortion limits per IEEE 519 standards</li>
                    <li>• Power factor requirements (&gt;0.95 lagging)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Case Studies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Additional Implementation Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="bg-card/80 p-5 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 1: Domestic Smart Charging Implementation</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Household Profile</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Semi-detached house, 7kW home charger</li>
                      <li>• BMW i3 (42kWh battery)</li>
                      <li>• Daily commute: 45 miles</li>
                      <li>• Economy 7 tariff: 12p/32p per kWh</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Implementation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Smart charger with app control</li>
                      <li>• Charging schedule: 01:00-06:00</li>
                      <li>• 90% state of charge target</li>
                      <li>• Manual override for emergencies</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-900/20 border border-green-600 rounded">
                  <p className="text-green-200 text-sm">
                    <strong>Results:</strong> Annual charging cost reduced from £1,200 to £480 (60% saving). 
                    Payback period for smart charger upgrade was 8 months.
                  </p>
                </div>
              </div>

              <div className="bg-card/80 p-5 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 2: Fleet Optimisation with Dynamic Pricing</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Fleet Overview</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 25 delivery vans (e-NV200)</li>
                      <li>• Operating hours: 07:00-18:00</li>
                      <li>• 22kW charging infrastructure</li>
                      <li>• Agile tariff (half-hourly pricing)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Smart System Features</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Vehicle scheduling integration</li>
                      <li>• Dynamic load management</li>
                      <li>• Price forecasting algorithms</li>
                      <li>• Renewable energy optimisation</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600 rounded">
                  <p className="text-blue-200 text-sm">
                    <strong>Innovation:</strong> AI-driven charging schedule automatically shifts load to periods of 
                    negative pricing (paid to consume). Average fuel cost equivalent: 2.5p per mile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Key Takeaways</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Key Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Charging cost reduction of 40-60%</li>
                    <li>• Reduced grid stress during peak demand</li>
                    <li>• Better integration with renewable energy</li>
                    <li>• Improved battery longevity through slower charging</li>
                    <li>• Support for grid stability and decarbonisation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Implementation Steps</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Choose appropriate time-of-use tariff</li>
                    <li>• Install smart charging equipment</li>
                    <li>• Configure charging schedules</li>
                    <li>• Monitor and optimise performance</li>
                    <li>• Consider integration with renewable energy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <EVChargingModule5Section4Quiz />
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../ev-charging-module-5-section-3">
              <Button 
                variant="outline" 
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: CT Clamps & Control Logic
              </Button>
            </Link>
            
            <Link to="../ev-charging-module-5-section-5">
              <Button 
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200"
              >
                Next: Multiple Unit Coordination
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EVChargingModule5Section4;