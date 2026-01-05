import { ArrowLeft, BarChart, Clock, Zap, TrendingDown, PoundSterling, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule4Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is peak shaving used for?",
      options: [
        "Increasing battery capacity",
        "Reducing maximum demand charges by capping peak power draw",
        "Improving solar panel efficiency",
        "Extending battery lifespan"
      ],
      correct: 1,
      explanation: "Peak shaving reduces maximum demand charges by using battery power to cap the peak power draw from the grid, lowering monthly demand charges which can represent 30-50% of commercial electricity bills."
    },
    {
      id: 2,
      question: "How does load shifting reduce costs?",
      options: [
        "By reducing total energy consumption",
        "By storing energy during low-cost periods and using it during high-cost periods",
        "By eliminating the need for grid connection",
        "By increasing solar panel output"
      ],
      correct: 1,
      explanation: "Load shifting reduces costs by storing energy when electricity prices are low (typically overnight) and discharging during peak price periods, exploiting Time-of-Use tariff price differences that can be 3-5x higher."
    },
    {
      id: 3,
      question: "What role does a smart controller play?",
      options: [
        "Only monitors battery voltage",
        "Automatically optimizes charging and discharging based on tariffs, solar forecast, and demand patterns",
        "Converts DC to AC power",
        "Provides backup power only"
      ],
      correct: 1,
      explanation: "Smart controllers use algorithms to automatically optimize battery operation based on electricity tariffs, weather forecasts, historical consumption patterns, and real-time conditions to maximize economic benefits."
    },
    {
      id: 4,
      question: "When would you discharge your battery under TOU pricing?",
      options: [
        "During the cheapest rate periods",
        "Only when the grid fails",
        "During peak rate periods when electricity is most expensive",
        "Continuously throughout the day"
      ],
      correct: 2,
      explanation: "Under TOU pricing, you discharge the battery during peak rate periods (typically 4-7 PM) when electricity is most expensive, using stored energy instead of purchasing expensive grid power."
    },
    {
      id: 5,
      question: "What's the difference between energy and power savings?",
      options: [
        "There is no difference",
        "Energy savings reduce kWh consumption; power savings reduce maximum kW demand",
        "Power savings are always larger than energy savings",
        "Energy savings only apply to solar systems"
      ],
      correct: 1,
      explanation: "Energy savings reduce total kWh consumption (affecting usage charges), while power savings reduce maximum kW demand (affecting demand charges). Both provide different cost savings mechanisms."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              Load Shifting, Peak Shaving, and Energy Efficiency
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Strategic battery operation for demand management and cost reduction
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Energy Management
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
                  Define load shifting and peak shaving strategies for cost reduction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Apply energy storage systems for improved efficiency and savings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand Time-of-Use (TOU) tariffs and optimization strategies
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
                Battery storage systems extend far beyond backup power applications. When operated strategically, they become powerful tools for managing energy demand, reducing electricity costs, and improving overall system efficiency. This section explores advanced energy management strategies that unlock the full economic potential of battery systems.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-400" />
                Load Shifting Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Load shifting involves storing energy during periods of low cost or low demand and using it during periods of high cost or high demand, effectively time-shifting energy consumption.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Basic Load Shifting Strategy:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Off-peak charging:</strong> Store energy during low-cost periods</li>
                    <li>• <strong>Peak discharge:</strong> Use stored energy during high-cost periods</li>
                    <li>• <strong>Daily cycling:</strong> Typically one complete cycle per day</li>
                    <li>• <strong>Automated operation:</strong> Smart controllers manage timing</li>
                    <li>• <strong>Grid arbitrage:</strong> Profit from price differences</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Economic Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Reduced electricity bills:</strong> Lower average energy costs</li>
                    <li>• <strong>Demand charge reduction:</strong> Lower peak demand costs</li>
                    <li>• <strong>Grid service revenue:</strong> Frequency response and balancing</li>
                    <li>• <strong>Solar self-consumption:</strong> Store excess PV for later use</li>
                    <li>• <strong>Price hedge:</strong> Protection against rising energy costs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Typical UK Load Shifting Schedule:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Off-Peak Charging (00:30-07:30):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Economy 7/10 rates: 7-12p/kWh</li>
                      <li>• Agile rates: Often negative pricing</li>
                      <li>• Full battery charge ready for day</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Peak Discharge (16:00-19:00):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Peak rates: 20-45p/kWh</li>
                      <li>• Highest demand charges apply</li>
                      <li>• Maximum economic benefit period</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Daily Savings Potential:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 10kWh cycling: £2-4/day typical</li>
                      <li>• Annual savings: £700-1,400</li>
                      <li>• ROI improvement: 2-4 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingDown className="h-6 w-6 text-green-400" />
                Peak Shaving Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Peak shaving reduces maximum power demand by using battery power to cap the peak load seen by the grid, significantly reducing demand charges for commercial and industrial customers.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Peak Shaving Operation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Demand monitoring:</strong> Real-time load tracking</li>
                    <li>• <strong>Threshold setting:</strong> Define maximum grid draw</li>
                    <li>• <strong>Battery activation:</strong> Automatic discharge when threshold reached</li>
                    <li>• <strong>Load balancing:</strong> Battery supplements grid power</li>
                    <li>• <strong>Continuous adjustment:</strong> Dynamic response to load changes</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Demand Charge Structure:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Monthly maximum:</strong> Highest 30-minute average demand</li>
                    <li>• <strong>Red band rates:</strong> £35-60/kW/month typical</li>
                    <li>• <strong>Amber band rates:</strong> £15-25/kW/month</li>
                    <li>• <strong>Seasonal variations:</strong> Higher winter demand charges</li>
                    <li>• <strong>Multiple tariff periods:</strong> Different rates by time</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Sizing for Peak Shaving:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Load analysis:</strong> Identify peak patterns</li>
                    <li>• <strong>Peak duration:</strong> Typically 2-4 hours daily</li>
                    <li>• <strong>Shaving capacity:</strong> 20-50% of peak load</li>
                    <li>• <strong>Energy requirements:</strong> 1-4 hours storage duration</li>
                    <li>• <strong>ROI optimization:</strong> Balance cost vs savings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PoundSterling className="h-6 w-6 text-orange-400" />
                Time-of-Use (TOU) Tariff Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                TOU tariffs create price signals that battery systems can exploit for cost savings, with sophisticated controllers optimizing operation based on tariff structures and consumption patterns.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">UK TOU Tariff Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Economy 7:</strong> 7-hour off-peak rate overnight</li>
                    <li>• <strong>Economy 10:</strong> 10 hours split afternoon/overnight</li>
                    <li>• <strong>Agile pricing:</strong> 30-minute pricing periods</li>
                    <li>• <strong>Go tariff:</strong> 4-hour super off-peak window</li>
                    <li>• <strong>Commercial TOU:</strong> Red/amber/green rate periods</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Optimization Strategies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Predictive charging:</strong> Weather and consumption forecasts</li>
                    <li>• <strong>Price arbitrage:</strong> Buy low, use high strategy</li>
                    <li>• <strong>Solar integration:</strong> Prioritize solar self-consumption</li>
                    <li>• <strong>Load forecasting:</strong> Predict daily consumption patterns</li>
                    <li>• <strong>Reserve management:</strong> Maintain backup capacity</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Agile Tariff Example (Octopus Energy):</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-white p-2">Time Period</th>
                        <th className="text-left text-white p-2">Typical Rate</th>
                        <th className="text-left text-white p-2">Battery Action</th>
                        <th className="text-left text-white p-2">Economic Impact</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2">02:00-05:00</td>
                        <td className="p-2">2-8p/kWh</td>
                        <td className="p-2">Charge</td>
                        <td className="p-2">Low cost storage</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">07:00-09:00</td>
                        <td className="p-2">25-35p/kWh</td>
                        <td className="p-2">Discharge</td>
                        <td className="p-2">Morning peak avoidance</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">16:00-19:00</td>
                        <td className="p-2">30-45p/kWh</td>
                        <td className="p-2">Discharge</td>
                        <td className="p-2">Maximum savings period</td>
                      </tr>
                      <tr>
                        <td className="p-2">Negative pricing</td>
                        <td className="p-2">-5 to -20p/kWh</td>
                        <td className="p-2">Charge + export</td>
                        <td className="p-2">Paid to consume energy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart className="h-6 w-6 text-purple-400" />
                Industrial vs Residential Case Studies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Load management strategies vary significantly between residential and industrial applications due to different consumption patterns, tariff structures, and operational requirements.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Residential Case Study:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>System:</strong> 4kW solar + 10kWh battery</li>
                    <li>• <strong>Consumption:</strong> 12 kWh/day average</li>
                    <li>• <strong>Tariff:</strong> Octopus Agile (dynamic pricing)</li>
                    <li>• <strong>Strategy:</strong> Load shifting + solar optimization</li>
                    <li>• <strong>Annual savings:</strong> £850 (vs standard tariff)</li>
                    <li>• <strong>ROI period:</strong> 6.5 years including battery</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Industrial Case Study:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>System:</strong> 200kW solar + 500kWh battery</li>
                    <li>• <strong>Consumption:</strong> 2,000 kWh/day average</li>
                    <li>• <strong>Peak demand:</strong> 400kW (reduced to 250kW)</li>
                    <li>• <strong>Strategy:</strong> Peak shaving + load shifting</li>
                    <li>• <strong>Annual savings:</strong> £85,000 (demand + energy)</li>
                    <li>• <strong>ROI period:</strong> 4.2 years</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Automation and Smart Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced automation systems use machine learning and predictive algorithms to optimize battery operation continuously, adapting to changing conditions and maximizing economic benefits.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Smart Controller Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Weather forecasting:</strong> Solar generation prediction</li>
                    <li>• <strong>Load forecasting:</strong> Consumption pattern analysis</li>
                    <li>• <strong>Price forecasting:</strong> Tariff optimization algorithms</li>
                    <li>• <strong>Grid services:</strong> Frequency response participation</li>
                    <li>• <strong>Remote monitoring:</strong> Performance analytics and alerts</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Machine Learning Applications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Pattern recognition:</strong> Learning consumption habits</li>
                    <li>• <strong>Predictive modeling:</strong> Optimizing charge/discharge timing</li>
                    <li>• <strong>Adaptive algorithms:</strong> Continuous performance improvement</li>
                    <li>• <strong>Anomaly detection:</strong> Identifying unusual patterns</li>
                    <li>• <strong>Seasonal adjustment:</strong> Adapting to changing conditions</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Integration Capabilities:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Smart home systems:</strong> IoT device coordination</li>
                    <li>• <strong>Energy management:</strong> Building automation integration</li>
                    <li>• <strong>Grid communication:</strong> Demand response participation</li>
                    <li>• <strong>API connectivity:</strong> Third-party service integration</li>
                    <li>• <strong>Cloud analytics:</strong> Advanced performance insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Case Study: Tesco Distribution Centre Peak Shaving</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Tesco's Daventry distribution centre demonstrates large-scale peak shaving with a 1MW/2.5MWh battery system, achieving significant demand charge savings.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-yellow-400 font-semibold mb-3">System Performance:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Demand Management:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Baseline peak demand: 3.2MW</li>
                      <li>• Peak shaved to: 2.2MW consistently</li>
                      <li>• Demand charge savings: £48,000/year</li>
                      <li>• Additional Triad avoidance: £15,000/year</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Operational Benefits:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 99.8% system availability achieved</li>
                      <li>• Grid services revenue: £8,000/year</li>
                      <li>• Carbon footprint reduction: 180 tonnes CO2/year</li>
                      <li>• System ROI: 5.8 years total project</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Technology Integration:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Predictive analytics:</strong> Machine learning optimizes daily schedules</li>
                  <li>• <strong>Real-time control:</strong> Sub-second response to demand spikes</li>
                  <li>• <strong>Grid services:</strong> Automatic participation in frequency response markets</li>
                  <li>• <strong>Remote monitoring:</strong> 24/7 system oversight and optimization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Grid Services and Revenue Streams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Battery systems can participate in multiple grid services simultaneously, creating diverse revenue streams that significantly improve project economics.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Frequency Response Services:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Dynamic Containment:</strong> £9-17/MW/h availability payments</li>
                    <li>• <strong>Dynamic Moderation:</strong> £6-12/MW/h for sustained response</li>
                    <li>• <strong>Dynamic Regulation:</strong> £4-8/MW/h for fine frequency control</li>
                    <li>• <strong>Fast Reserve:</strong> £8-15/MW/h for rapid response capability</li>
                    <li>• <strong>Response time:</strong> Sub-second to 30-second requirements</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Capacity Market Revenue:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Capacity payments:</strong> £15-45/kW/year for availability</li>
                    <li>• <strong>Duration requirements:</strong> Minimum 30-minute discharge</li>
                    <li>• <strong>Performance testing:</strong> Annual stress tests required</li>
                    <li>• <strong>De-rating factors:</strong> Reduced payments for shorter duration</li>
                    <li>• <strong>Contract lengths:</strong> 1-year and 15-year options available</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Balancing Mechanism:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Energy arbitrage:</strong> £50-200/MWh price spreads</li>
                    <li>• <strong>Bid-offer spreads:</strong> Profit from imbalance pricing</li>
                    <li>• <strong>System buy/sell prices:</strong> Exploit price volatility</li>
                    <li>• <strong>Constraint payments:</strong> Revenue from grid constraint management</li>
                    <li>• <strong>Minimum bid size:</strong> 1MW for direct participation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Machine Learning and Predictive Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced algorithms use historical data, weather forecasts, and market signals to optimize battery operation for maximum economic benefit.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Predictive Analytics:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Load forecasting:</strong> Neural networks predict consumption patterns</li>
                    <li>• <strong>Price prediction:</strong> Market models forecast electricity prices</li>
                    <li>• <strong>Weather integration:</strong> Solar/wind generation forecasting</li>
                    <li>• <strong>Demand response signals:</strong> Grid operator requirement prediction</li>
                    <li>• <strong>Model accuracy:</strong> 95%+ accuracy for next-day optimization</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Optimization Algorithms:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Multi-objective optimization:</strong> Balance multiple revenue streams</li>
                    <li>• <strong>Reinforcement learning:</strong> Adaptive strategies that improve over time</li>
                    <li>• <strong>Stochastic programming:</strong> Handle uncertainty in forecasts</li>
                    <li>• <strong>Real-time dispatch:</strong> Minute-by-minute optimization</li>
                    <li>• <strong>Portfolio optimization:</strong> Coordinate multiple battery sites</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Case Study: Harmony Energy's Grid-Scale Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Harmony Energy Income Trust operates multiple grid-scale battery systems across the UK, demonstrating advanced load management and revenue optimization strategies.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-orange-400 font-semibold mb-3">Portfolio Overview:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">System Specifications:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Portfolio capacity: 500MW+ across 20+ sites</li>
                      <li>• Duration: Primarily 1-2 hour systems</li>
                      <li>• Technology: Tesla Megapack and equivalent</li>
                      <li>• Grid connections: 11kV to 132kV</li>
                      <li>• Geographic spread: England, Scotland, Wales</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Revenue Optimization:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Dynamic Containment: 60% of revenue</li>
                      <li>• Energy arbitrage: 25% of revenue</li>
                      <li>• Other grid services: 15% of revenue</li>
                      <li>• Utilization rate: 1.5-2.5 cycles per day</li>
                      <li>• Target returns: 8-12% IRR</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">Advanced Optimization Features:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Portfolio coordination:</strong> Sites work together to maximize system-wide revenues</li>
                  <li>• <strong>Market stacking:</strong> Simultaneous participation in multiple revenue streams</li>
                  <li>• <strong>Predictive maintenance:</strong> AI prevents failures during high-value periods</li>
                  <li>• <strong>Risk management:</strong> Hedging strategies protect against market volatility</li>
                  <li>• <strong>Performance tracking:</strong> Real-time monitoring of over 500 revenue KPIs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commercial vs Residential Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Load management strategies differ significantly between commercial and residential applications due to scale, access to markets, and operational complexity.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Residential Optimization:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Self-consumption focus:</strong> Maximize use of own solar generation</li>
                    <li>• <strong>TOU arbitrage:</strong> Simple off-peak charging strategies</li>
                    <li>• <strong>Backup reliability:</strong> Ensure power during outages</li>
                    <li>• <strong>Aggregated services:</strong> Participate via virtual power plants</li>
                    <li>• <strong>Typical savings:</strong> £300-800/year for 10kWh system</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Commercial Optimization:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Demand charge reduction:</strong> Primary economic driver</li>
                    <li>• <strong>Grid services participation:</strong> Direct market access</li>
                    <li>• <strong>Power quality management:</strong> Voltage support and harmonics</li>
                    <li>• <strong>Process integration:</strong> Coordinate with industrial operations</li>
                    <li>• <strong>Typical savings:</strong> £50,000-500,000/year for MW-scale systems</li>
                  </ul>
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
                Strategic battery operation through load shifting and peak shaving transforms storage systems from simple backup power into sophisticated economic tools. Advanced algorithms, multiple revenue streams, and predictive optimization enable batteries to provide significant value while supporting grid stability and renewable energy integration.
              </p>
              <p className="text-yellow-400 font-medium">
                Modern battery systems can achieve 8-15% IRR through intelligent operation across multiple revenue streams including grid services, energy arbitrage, and demand charge reduction.
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
                title="Load Management Strategies Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule4Section5;