import { ArrowLeft, ArrowRight, PoundSterling, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import RenewableEnergyFinancialCalculators from '@/components/upskilling/renewable-energy/RenewableEnergyFinancialCalculators';

const RenewableEnergyModule9Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main difference between FiT and SEG?",
      options: [
        "FiT paid for generation, SEG only pays for export",
        "FiT was government-backed, SEG is supplier-led",
        "FiT had guaranteed rates for 20 years, SEG rates can vary",
        "All of the above"
      ],
      correct: 3,
      explanation: "The Feed-in Tariff paid for both generation and export with guaranteed rates for 20 years and was government-backed. SEG is supplier-led, only pays for export, and rates can change."
    },
    {
      id: 2,
      question: "Can new systems register for the Feed-in Tariff?",
      options: [
        "Yes, applications are still open",
        "No, it closed to new applicants in March 2019",
        "Only for systems under 4kW",
        "Only for commercial installations"
      ],
      correct: 1,
      explanation: "The Feed-in Tariff scheme closed to new applicants on 31st March 2019. However, systems registered before this date continue to receive payments for their full 20-year term."
    },
    {
      id: 3,
      question: "What determines how much SEG income you get?",
      options: [
        "Only the amount of electricity you export",
        "The SEG tariff rate and amount exported",
        "Your total system capacity",
        "Government-set rates"
      ],
      correct: 1,
      explanation: "SEG income is determined by the tariff rate offered by your electricity supplier multiplied by the amount of electricity you export to the grid."
    },
    {
      id: 4,
      question: "What does net metering balance?",
      options: [
        "Import and export of electricity over a billing period",
        "Generation and consumption in real-time",
        "Monthly and annual usage",
        "Peak and off-peak consumption"
      ],
      correct: 0,
      explanation: "Net metering balances the electricity imported from and exported to the grid over a billing period, allowing customers to offset their consumption with their generation."
    },
    {
      id: 5,
      question: "Who provides SEG payments?",
      options: [
        "The government",
        "Your electricity supplier",
        "The DNO (Distribution Network Operator)",
        "Ofgem directly"
      ],
      correct: 1,
      explanation: "SEG payments are made by electricity suppliers who have over 150,000 domestic customers. They are required by law to offer a Smart Export Guarantee tariff."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <PoundSterling className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Feed-in Tariff (Legacy), SEG, and Net Metering
                </h1>
                <p className="text-xl text-gray-400">
                  Understanding payment schemes and energy export mechanisms
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 9
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 1
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Renewable energy systems often generate more power than the property needs. This section 
                explores how you get paid for exporting excess energy back to the grid.
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
                <span>Understand how the Feed-in Tariff (FiT) worked</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Learn how the Smart Export Guarantee (SEG) operates today</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand net metering principles</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Identify eligibility criteria and scheme benefits</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Feed-in Tariff (FiT) - Legacy Scheme</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-md p-4">
                <h4 className="text-red-400 font-semibold mb-2">Important:</h4>
                <p className="text-sm">
                  The Feed-in Tariff scheme closed to new applicants on 31st March 2019. However, existing 
                  FiT installations continue to receive payments for their full 20-year term.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-400">How FiT Worked:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-white mb-3">Payment Structure:</h5>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• <strong>Generation tariff:</strong> Paid for every kWh generated</li>
                      <li>• <strong>Export tariff:</strong> Additional payment for exported electricity</li>
                      <li>• <strong>Guaranteed rates:</strong> Fixed payments for 20 years</li>
                      <li>• <strong>Index-linked:</strong> Annual increases with RPI inflation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-3">Key Features:</h5>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• <strong>Degression:</strong> Rates reduced quarterly for new installations</li>
                      <li>• <strong>Capacity limits:</strong> Different rates for different system sizes</li>
                      <li>• <strong>MCS requirement:</strong> Installation by certified installers</li>
                      <li>• <strong>Deemed export:</strong> 50% of generation assumed exported</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="font-medium text-white mb-3">Typical FiT Rates (Final Tariffs - March 2019):</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h6 className="text-green-400 font-medium">Solar PV (≤4kW):</h6>
                        <p className="text-gray-300">3.79p/kWh generation</p>
                        <p className="text-gray-300">5.24p/kWh export</p>
                      </div>
                      <div>
                        <h6 className="text-yellow-400 font-medium">Solar PV (4-10kW):</h6>
                        <p className="text-gray-300">3.79p/kWh generation</p>
                        <p className="text-gray-300">5.24p/kWh export</p>
                      </div>
                      <div>
                        <h6 className="text-purple-400 font-medium">Wind (≤1.5kW):</h6>
                        <p className="text-gray-300">8.53p/kWh generation</p>
                        <p className="text-gray-300">5.24p/kWh export</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Smart Export Guarantee (SEG) - Current Scheme</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                <h4 className="text-green-400 font-semibold mb-2">Active Scheme:</h4>
                <p className="text-sm">
                  SEG replaced the Feed-in Tariff for new installations from 1st January 2020. Unlike FiT, 
                  SEG only pays for electricity exported to the grid.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">SEG Key Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-white mb-3">Payment Structure:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Export only:</strong> No generation tariff</li>
                        <li>• <strong>Variable rates:</strong> Set by individual suppliers</li>
                        <li>• <strong>Market-driven:</strong> Rates can change over time</li>
                        <li>• <strong>Half-hourly metering:</strong> Required for larger systems</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-3">Eligibility Requirements:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Capacity limit:</strong> Up to 5MW per installation</li>
                        <li>• <strong>MCS certification:</strong> Required for domestic systems</li>
                        <li>• <strong>Export meter:</strong> Must measure actual export</li>
                        <li>• <strong>Technology types:</strong> Solar, wind, hydro, anaerobic digestion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">Current SEG Tariff Comparison (2025):</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                        <h6 className="text-green-400 font-medium mb-2">Octopus Energy:</h6>
                        <p className="text-gray-300">20p/kWh (Outgoing Fixed)</p>
                        <p className="text-gray-300">Variable: 6-20p/kWh</p>
                        <p className="text-xs text-gray-400 mt-1">Market-leading rates - Updated Jan 2025</p>
                      </div>
                      <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                        <h6 className="text-yellow-400 font-medium mb-2">E.ON Next:</h6>
                        <p className="text-gray-300">15p/kWh</p>
                        <p className="text-gray-300">Fixed rate</p>
                        <p className="text-xs text-gray-400 mt-1">Competitive offering - Updated Jan 2025</p>
                      </div>
                      <div className="bg-yellow-900/20 p-3 rounded border border-yellow-400/30">
                        <h6 className="text-yellow-400 font-medium mb-2">British Gas:</h6>
                        <p className="text-gray-300">8.5p/kWh</p>
                        <p className="text-gray-300">Standard rate</p>
                        <p className="text-xs text-gray-400 mt-1">Lower but stable - Updated Jan 2025</p>
                      </div>
                      <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                        <h6 className="text-purple-400 font-medium mb-2">Good Energy:</h6>
                        <p className="text-gray-300">12p/kWh</p>
                        <p className="text-gray-300">Fixed rate</p>
                        <p className="text-xs text-gray-400 mt-1">100% renewable supplier</p>
                      </div>
                      <div className="bg-teal-900/20 p-3 rounded border border-teal-500/30">
                        <h6 className="text-teal-400 font-medium mb-2">EDF Energy:</h6>
                        <p className="text-gray-300">9.5p/kWh</p>
                        <p className="text-gray-300">Standard rate</p>
                        <p className="text-xs text-gray-400 mt-1">Updated Jan 2025</p>
                      </div>
                      <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                        <h6 className="text-orange-400 font-medium mb-2">SSE:</h6>
                        <p className="text-gray-300">7.5p/kWh</p>
                        <p className="text-gray-300">Standard rate</p>
                        <p className="text-xs text-gray-400 mt-1">Basic offering</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-700/50">
                      <p className="text-xs text-blue-200">
                        <strong>2025 Update:</strong> SEG rates have increased across most suppliers due to higher wholesale energy prices. 
                        Rates can vary based on time of export and contract terms. Check current rates before switching.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-4">Export Metering Requirements:</h4>
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Domestic Systems (≤30kW):</h5>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Smart meter with export capability required</li>
                        <li>• Half-hourly readings for accurate measurement</li>
                        <li>• Existing non-smart meters need upgrading</li>
                        <li>• Installer responsibility to arrange metering</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Commercial Systems (&gt;30kW):</h5>
                      <ul className="text-gray-300 space-y-1 text-sm">
                        <li>• Mandatory half-hourly settlement meters</li>
                        <li>• Professional metering arrangements required</li>
                        <li>• Higher administrative complexity</li>
                        <li>• Multiple tariff options available</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Net Metering Principles and Global Comparison</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Net metering is a billing mechanism that allows renewable energy system owners to 
                receive credit for electricity they export to the grid. While the UK doesn't use true 
                net metering, understanding these principles helps explain global renewable energy policies.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4">How Net Metering Works:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Basic Principle:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Meter runs forward when importing electricity</li>
                        <li>• Meter runs backwards when exporting electricity</li>
                        <li>• Net consumption calculated over billing period</li>
                        <li>• Credits can offset future consumption</li>
                        <li>• Excess credits may carry over between billing periods</li>
                        <li>• Some regions pay cash for annual excess generation</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">UK Context:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• UK doesn't use true net metering</li>
                        <li>• Import and export measured separately</li>
                        <li>• Different rates for import vs export</li>
                        <li>• SEG provides export payments instead</li>
                        <li>• Smart meters enable accurate measurement</li>
                        <li>• Half-hourly settlement for larger systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">Global Net Metering Variations:</h4>
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">USA (State Variations):</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Full retail rate credit in most states</li>
                            <li>• Annual true-up periods (California)</li>
                            <li>• Monthly netting (New York)</li>
                            <li>• Rollover credits to next billing cycle</li>
                            <li>• Some states phase out excess credits</li>
                            <li>• Time-of-use rate considerations</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-green-400 font-medium mb-2">Australia:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Feed-in tariff systems (6-20c/kWh)</li>
                            <li>• Regional variations by state</li>
                            <li>• Time-of-use export rates</li>
                            <li>• Separate import/export meters</li>
                            <li>• Virtual power plant programs</li>
                            <li>• Battery integration incentives</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-purple-400 font-medium mb-2">Germany (EEG System):</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• EEG feed-in tariffs (6-8c/kWh)</li>
                            <li>• Guaranteed long-term rates (20 years)</li>
                            <li>• Priority grid access</li>
                            <li>• Self-consumption incentives</li>
                            <li>• Market premium model for larger systems</li>
                            <li>• Renewable energy surcharge funding</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Emerging Global Trends:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-orange-400 font-medium mb-2">Policy Evolution:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Move from net metering to net billing</li>
                            <li>• Time-of-use export rates</li>
                            <li>• Capacity-based charges</li>
                            <li>• Grid modernization costs</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-cyan-400 font-medium mb-2">Technology Integration:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Smart inverter requirements</li>
                            <li>• Grid services participation</li>
                            <li>• Virtual power plants</li>
                            <li>• Peer-to-peer energy trading</li>
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
              <CardTitle className="text-white">Advanced SEG Strategies and Market Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">SEG Market Dynamics and Supplier Comparison:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h5 className="text-white font-medium mb-3">Top SEG Tariffs (Updated 2024):</h5>
                        <div className="space-y-3">
                          <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                            <div className="flex justify-between items-center mb-2">
                              <h6 className="text-green-400 font-medium">Octopus Energy Outgoing Fixed:</h6>
                              <span className="text-green-300 font-bold">15p/kWh</span>
                            </div>
                            <ul className="text-gray-300 text-xs space-y-1">
                              <li>• Highest fixed rate available</li>
                              <li>• No minimum export requirements</li>
                              <li>• Must be Octopus customer</li>
                              <li>• Monthly payments</li>
                            </ul>
                          </div>
                          <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                            <div className="flex justify-between items-center mb-2">
                              <h6 className="text-yellow-400 font-medium">Octopus Energy Agile Export:</h6>
                              <span className="text-blue-300 font-bold">Variable</span>
                            </div>
                            <ul className="text-gray-300 text-xs space-y-1">
                              <li>• Half-hourly export rates</li>
                              <li>• Can exceed 15p/kWh at peak times</li>
                              <li>• Requires half-hourly meter</li>
                              <li>• Smart home integration beneficial</li>
                            </ul>
                          </div>
                          <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                            <div className="flex justify-between items-center mb-2">
                              <h6 className="text-orange-400 font-medium">E.ON Next Export:</h6>
                              <span className="text-orange-300 font-bold">12p/kWh</span>
                            </div>
                            <ul className="text-gray-300 text-xs space-y-1">
                              <li>• Competitive fixed rate</li>
                              <li>• No customer requirement</li>
                              <li>• Quarterly payments</li>
                              <li>• Stable, reliable option</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-3">SEG Strategy Optimisation:</h5>
                        <div className="space-y-3">
                          <div className="bg-card p-3 rounded border border-gray-600">
                            <h6 className="text-yellow-400 font-medium mb-2">Maximising Returns:</h6>
                            <ul className="text-gray-300 text-xs space-y-1">
                              <li>• Monitor supplier rate changes quarterly</li>
                              <li>• Consider switching SEG provider independently</li>
                              <li>• Time battery discharge for peak export rates</li>
                              <li>• Install smart controls for appliance timing</li>
                              <li>• Track energy markets for rate predictions</li>
                            </ul>
                          </div>
                          <div className="bg-card p-3 rounded border border-gray-600">
                            <h6 className="text-cyan-400 font-medium mb-2">Advanced Metering:</h6>
                            <ul className="text-gray-300 text-xs space-y-1">
                              <li>• Half-hourly settlement for &gt;30kW systems</li>
                              <li>• Smart meter export capability essential</li>
                              <li>• Generation meter vs export meter differences</li>
                              <li>• Deemed export (50%) vs actual measurement</li>
                              <li>• CT clamp vs separate meter arrangements</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Commercial SEG Applications:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h5 className="text-white font-medium mb-3">Business Energy Trading:</h5>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Power Purchase Agreements (PPAs) for larger systems</li>
                          <li>• Direct energy trading with commercial buyers</li>
                          <li>• Renewable Energy Guarantee of Origin (REGO) certificates</li>
                          <li>• Corporate renewable energy procurement</li>
                          <li>• Behind-the-meter arrangements</li>
                          <li>• Embedded generation benefits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-3">Grid Services Revenue:</h5>
                        <ul className="text-gray-300 space-y-2">
                          <li>• Frequency response services</li>
                          <li>• Capacity market participation</li>
                          <li>• Balancing mechanism revenues</li>
                          <li>• Demand side response programs</li>
                          <li>• Virtual power plant aggregation</li>
                          <li>• Flexibility market opportunities</li>
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
              <CardTitle className="text-white">Installer Responsibilities and Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">SEG Registration Process:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Pre-Installation:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Check customer's supplier offers SEG</li>
                        <li>• Confirm export meter requirements</li>
                        <li>• Arrange smart meter installation if needed</li>
                        <li>• Provide SEG tariff comparison</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Post-Installation:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• Complete MCS certification process</li>
                        <li>• Submit SEG application on customer's behalf</li>
                        <li>• Provide all required documentation</li>
                        <li>• Follow up on application status</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">Maximising SEG Benefits:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h5 className="font-medium text-white mb-3">Customer Advice:</h5>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• <strong>Tariff shopping:</strong> Compare SEG rates across suppliers</li>
                      <li>• <strong>Switching suppliers:</strong> Can change SEG provider independently</li>
                      <li>• <strong>Export timing:</strong> Consider time-of-use tariffs</li>
                      <li>• <strong>Battery integration:</strong> Store energy for optimal export timing</li>
                      <li>• <strong>Regular reviews:</strong> Monitor tariff changes and market developments</li>
                    </ul>
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
                  <strong>Case Study:</strong> A homeowner with a 4kW solar system earns 15p per kWh through SEG, 
                  exporting 40% of their generation (approximately 1,400kWh annually) and saving £300 annually 
                  on their electricity bills through reduced imports and export income.
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
                While legacy incentives like the Feed-in Tariff have closed to new applicants, SEG offers 
                long-term income opportunities for new renewable energy exports — helping reduce system 
                payback periods and improve overall investment returns.
              </p>
            </CardContent>
          </Card>

          <RenewableEnergyFinancialCalculators />

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={quizQuestions} title="Export Schemes Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-9">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module
              </Button>
            </Link>
            <Link to="../renewable-energy-module-9-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default RenewableEnergyModule9Section1;