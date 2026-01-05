import { ArrowLeft, ArrowRight, TrendingUp, CheckCircle, AlertCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import RenewableEnergyFinancialCalculators from '@/components/upskilling/renewable-energy/RenewableEnergyFinancialCalculators';

const RenewableEnergyModule9Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's the formula for ROI?",
      options: [
        "(Annual Savings / Total Investment) × 100",
        "(Net Gain / Total Investment) × 100",
        "(Total Investment / Annual Savings) × 100",
        "(Net Gain / Annual Savings) × 100"
      ],
      correct: 1,
      explanation: "ROI (Return on Investment) = (Net Gain / Total Investment) × 100. Net gain includes all savings minus ongoing costs over the investment period."
    },
    {
      id: 2,
      question: "How long do PV panels typically last?",
      options: [
        "15-20 years",
        "20-25 years",
        "25-30 years",
        "30-35 years"
      ],
      correct: 2,
      explanation: "Solar PV panels typically last 25-30 years with most manufacturers offering 25-year performance warranties. They continue to generate electricity beyond this period but at reduced efficiency."
    },
    {
      id: 3,
      question: "What costs should be included in payback calculations?",
      options: [
        "Only the initial installation cost",
        "Installation cost plus maintenance",
        "Installation, maintenance, insurance, and component replacements",
        "Installation cost plus electricity bill savings"
      ],
      correct: 2,
      explanation: "Accurate payback calculations should include all costs: initial installation, ongoing maintenance, insurance, and planned component replacements (especially inverters)."
    },
    {
      id: 4,
      question: "What might reduce annual savings over time?",
      options: [
        "Panel degradation only",
        "Electricity price changes only",
        "Panel degradation, electricity price changes, and component failures",
        "System upgrades"
      ],
      correct: 2,
      explanation: "Annual savings can be reduced by panel degradation (typically 0.5% per year), changes in electricity prices, component failures requiring replacement, and changing usage patterns."
    },
    {
      id: 5,
      question: "Why is inverter lifespan important in ROI calculations?",
      options: [
        "Inverters last longer than panels",
        "Inverter replacement costs affect long-term returns",
        "Inverters improve over time",
        "Inverters don't affect system performance"
      ],
      correct: 1,
      explanation: "Inverters typically need replacing after 10-15 years (shorter than panel lifespan), and replacement costs (£1,000-£3,000) significantly impact long-term ROI calculations."
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
              <TrendingUp className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Understanding ROI, Payback Periods, and System Lifespan
                </h1>
                <p className="text-xl text-gray-400">
                  Financial metrics and return on investment calculations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 9
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 2
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Investing in renewables requires a clear picture of when savings start outweighing costs. 
                This section breaks down financial returns and payback timelines using real-world data.
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
                <span>Calculate return on investment (ROI)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Estimate payback periods using real-world data</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand how lifespan impacts long-term value</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Factor in degradation, inflation, and energy pricing</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">ROI and Payback Fundamentals</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 border border-blue-600/20 rounded-md p-4">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Financial Metrics:</h4>
                <p className="text-sm">
                  Understanding these calculations helps customers make informed decisions and allows 
                  installers to present compelling financial cases for renewable energy investments.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Return on Investment (ROI) Formula:</h4>
                  <div className="bg-card p-6 rounded border border-gray-600">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-4">
                        ROI = (Net Gain / Total Investment) × 100
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h5 className="font-medium text-white mb-3">Net Gain Calculation:</h5>
                          <ul className="text-gray-300 space-y-1 text-left">
                            <li>• Total electricity bill savings over system lifetime</li>
                            <li>• SEG export income over system lifetime</li>
                            <li>• Minus ongoing maintenance costs</li>
                            <li>• Minus component replacement costs</li>
                            <li>• Minus insurance and monitoring costs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-white mb-3">Total Investment:</h5>
                          <ul className="text-gray-300 space-y-1 text-left">
                            <li>• Initial installation cost</li>
                            <li>• Scaffolding and access costs</li>
                            <li>• DNO application fees</li>
                            <li>• Building work (if required)</li>
                            <li>• Electrical upgrades (if required)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-4">Payback Period Formula:</h4>
                  <div className="bg-card p-6 rounded border border-gray-600">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-4">
                        Payback Period = Installation Cost / Annual Savings
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h5 className="font-medium text-white mb-3">Annual Savings Include:</h5>
                          <ul className="text-gray-300 space-y-1 text-left">
                            <li>• Reduced electricity bill from self-consumption</li>
                            <li>• SEG payments for exported electricity</li>
                            <li>• Standing charge savings (if applicable)</li>
                            <li>• Minus annual maintenance costs</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-white mb-3">Simple vs Complex Methods:</h5>
                          <ul className="text-gray-300 space-y-1 text-left">
                            <li>• <strong>Simple:</strong> Fixed annual savings</li>
                            <li>• <strong>Complex:</strong> Accounts for inflation</li>
                            <li>• <strong>Complex:</strong> Includes degradation</li>
                            <li>• <strong>Complex:</strong> Variable electricity prices</li>
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
              <CardTitle className="text-white">System Component Lifespans</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">Component Lifetime Expectations:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-medium mb-3">Solar PV Panels:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Lifespan:</strong> 25-30 years</li>
                        <li>• <strong>Warranty:</strong> 25 years performance</li>
                        <li>• <strong>Degradation:</strong> 0.5% per year</li>
                        <li>• <strong>End of life:</strong> Still 80-85% output</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-4 rounded border border-yellow-400/30">
                      <h5 className="text-yellow-400 font-medium mb-3">Inverters:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Lifespan:</strong> 10-15 years</li>
                        <li>• <strong>Warranty:</strong> 5-10 years</li>
                        <li>• <strong>Replacement cost:</strong> £1,000-£3,000</li>
                        <li>• <strong>Efficiency:</strong> Improves with technology</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
                      <h5 className="text-purple-400 font-medium mb-3">Battery Storage:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Lifespan:</strong> 10-15 years</li>
                        <li>• <strong>Warranty:</strong> 10 years / 6,000 cycles</li>
                        <li>• <strong>Degradation:</strong> 2-3% per year</li>
                        <li>• <strong>Replacement:</strong> £3,000-£8,000</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-4">Mounting and Structural Components:</h4>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h5 className="text-white font-medium mb-3">Mounting Systems:</h5>
                        <ul className="text-gray-300 space-y-1">
                          <li>• <strong>Rails and clamps:</strong> 25+ years</li>
                          <li>• <strong>Roof attachments:</strong> 25+ years</li>
                          <li>• <strong>Maintenance:</strong> Annual inspections</li>
                          <li>• <strong>Material:</strong> Anodised aluminium preferred</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-3">Monitoring and Safety:</h5>
                        <ul className="text-gray-300 space-y-1">
                          <li>• <strong>Monitoring systems:</strong> 10-15 years</li>
                          <li>• <strong>DC isolators:</strong> 15-20 years</li>
                          <li>• <strong>AC isolators:</strong> 15-20 years</li>
                          <li>• <strong>Generation meter:</strong> 15-20 years</li>
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
              <CardTitle className="text-white">Advanced Financial Modelling and Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-4">Comprehensive Financial Analysis Methods:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Simple vs Complex Payback:</h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <h6 className="text-green-400 font-medium mb-2">Simple Payback:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Installation Cost ÷ Annual Savings</li>
                            <li>• Assumes constant savings each year</li>
                            <li>• Quick calculation for initial assessment</li>
                            <li>• Doesn't account for inflation or degradation</li>
                            <li>• Typically 6-12 years for UK domestic systems</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Discounted Payback:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Accounts for time value of money</li>
                            <li>• Uses discount rate (typically 3-5%)</li>
                            <li>• More accurate for long-term investments</li>
                            <li>• Typically 1-2 years longer than simple payback</li>
                            <li>• Better for comparing investment options</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Net Present Value (NPV) Analysis:</h5>
                      <div className="space-y-3 text-sm">
                        <div>
                          <h6 className="text-purple-400 font-medium mb-2">NPV Formula:</h6>
                          <div className="bg-gray-800 p-2 rounded text-xs">
                            NPV = Σ (Annual Cash Flow ÷ (1 + r)^t) - Initial Investment
                          </div>
                          <ul className="text-gray-300 space-y-1 mt-2">
                            <li>• r = discount rate (inflation + opportunity cost)</li>
                            <li>• t = year number (1, 2, 3... up to system life)</li>
                            <li>• Positive NPV indicates profitable investment</li>
                            <li>• Higher NPV = better investment option</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-orange-400 font-medium mb-2">Internal Rate of Return (IRR):</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Discount rate that makes NPV = 0</li>
                            <li>• Typical UK solar IRR: 8-15%</li>
                            <li>• Compare to other investment returns</li>
                            <li>• Higher IRR indicates better investment</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Factors Affecting Long-Term Financial Performance:</h4>
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Performance Degradation Impact:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Solar Panel Degradation:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Standard panels: 0.5-0.8% annually</li>
                            <li>• Premium panels: 0.25-0.5% annually</li>
                            <li>• Year 25 output: 80-90% of original</li>
                            <li>• Cumulative impact on lifetime savings: 6-10%</li>
                            <li>• Factor into realistic projections</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-cyan-400 font-medium mb-2">Inverter Performance:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Efficiency typically stable for 10+ years</li>
                            <li>• Replacement every 10-15 years</li>
                            <li>• Technology improvements with replacement</li>
                            <li>• Cost: £1,000-£3,000 for domestic systems</li>
                            <li>• Plan for 1-2 replacements over system life</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-green-400 font-medium mb-2">Battery Degradation:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Lithium-ion: 2-3% capacity loss annually</li>
                            <li>• Warranty typically 10 years/6,000 cycles</li>
                            <li>• Replacement cost: £3,000-£8,000</li>
                            <li>• Technology improvements reduce future costs</li>
                            <li>• Consider cycling patterns and depth of discharge</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Economic Variables and Market Trends:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Electricity Price Trends:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Historical UK average: 3-5% annual increases</li>
                            <li>• Volatile recent years: -20% to +200% changes</li>
                            <li>• Long-term trend toward renewable pricing</li>
                            <li>• Time-of-use tariffs becoming standard</li>
                            <li>• Self-consumption becomes more valuable</li>
                            <li>• Consider price volatility in scenarios</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-purple-400 font-medium mb-2">Export Rate Evolution:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• SEG rates vary 4-15p/kWh currently</li>
                            <li>• Market-driven rates increase competition</li>
                            <li>• Time-of-use export rates emerging</li>
                            <li>• Grid services revenue opportunities</li>
                            <li>• Peer-to-peer trading development</li>
                            <li>• Virtual power plant participation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-400 mb-4">Real-World Financial Scenario Analysis:</h4>
                  <div className="bg-card p-6 rounded border border-gray-600">
                    <h5 className="text-white font-medium mb-4">Comprehensive 4kW System Financial Model:</h5>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h6 className="text-green-400 font-medium mb-3">System Specifications & Assumptions:</h6>
                        <div className="bg-gray-800 p-3 rounded">
                          <ul className="text-gray-300 space-y-1">
                            <li>• <strong>System size:</strong> 4kW solar PV</li>
                            <li>• <strong>Installation cost:</strong> £6,000 (inc. VAT)</li>
                            <li>• <strong>Annual generation:</strong> 3,500 kWh</li>
                            <li>• <strong>Self-consumption:</strong> 60% (2,100 kWh)</li>
                            <li>• <strong>Export to grid:</strong> 40% (1,400 kWh)</li>
                            <li>• <strong>Electricity price:</strong> 30p/kWh (Year 1)</li>
                            <li>• <strong>SEG rate:</strong> 15p/kWh</li>
                            <li>• <strong>Price inflation:</strong> 4% annually</li>
                            <li>• <strong>Panel degradation:</strong> 0.5% annually</li>
                            <li>• <strong>Discount rate:</strong> 3% (for NPV)</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h6 className="text-yellow-400 font-medium mb-3">Financial Results Analysis:</h6>
                        <div className="space-y-3">
                          <div className="bg-gray-800 p-3 rounded">
                            <div className="text-yellow-400 font-medium">Year 1 Savings:</div>
                            <ul className="text-gray-300 space-y-1 text-xs mt-1">
                              <li>• Self-consumption: 2,100 × £0.30 = £630</li>
                              <li>• SEG export: 1,400 × £0.15 = £210</li>
                              <li>• Annual maintenance: -£50</li>
                              <li>• <strong>Net annual savings: £790</strong></li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-3 rounded">
                            <div className="text-green-400 font-medium">25-Year Analysis:</div>
                            <ul className="text-gray-300 space-y-1 text-xs mt-1">
                              <li>• Simple payback: 7.6 years</li>
                              <li>• Discounted payback: 8.9 years</li>
                              <li>• Total savings (nominal): £28,500</li>
                              <li>• NPV (3% discount): £12,800</li>
                              <li>• IRR: 12.4%</li>
                              <li>• <strong>ROI: 313% over 25 years</strong></li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 p-3 rounded">
                            <div className="text-purple-400 font-medium">Sensitivity Analysis:</div>
                            <ul className="text-gray-300 space-y-1 text-xs mt-1">
                              <li>• Best case (low degradation): IRR 14.2%</li>
                              <li>• Worst case (high degradation): IRR 10.1%</li>
                              <li>• With battery (£4k): IRR 10.8%</li>
                              <li>• High electricity inflation (6%): IRR 15.7%</li>
                            </ul>
                          </div>
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
              <CardTitle className="text-white">Risk Assessment and Mitigation Strategies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-4">Financial Risk Factors:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                      <h5 className="font-medium text-white mb-3">Technical Risks:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>Component failure:</strong> Inverter replacement costs</li>
                        <li>• <strong>Performance issues:</strong> Shading, soiling, module defects</li>
                        <li>• <strong>Installation quality:</strong> Poor workmanship affecting output</li>
                        <li>• <strong>Technology obsolescence:</strong> Rapid technology advancement</li>
                        <li>• <strong>Weather variations:</strong> Lower than expected generation</li>
                        <li>• <strong>Grid connection issues:</strong> Export limitations or curtailment</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                      <h5 className="font-medium text-white mb-3">Market & Regulatory Risks:</h5>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>• <strong>SEG rate reductions:</strong> Lower export payments</li>
                        <li>• <strong>Policy changes:</strong> New regulations or charges</li>
                        <li>• <strong>Electricity market volatility:</strong> Price fluctuations</li>
                        <li>• <strong>Supplier switching:</strong> Loss of favourable SEG rates</li>
                        <li>• <strong>Grid charging reforms:</strong> New network costs</li>
                        <li>• <strong>Property changes:</strong> Moving house, roof repairs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-4">Risk Mitigation Strategies:</h4>
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Financial Protection Measures:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Insurance & Warranties:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Comprehensive system insurance</li>
                            <li>• Extended inverter warranties</li>
                            <li>• Performance guarantees</li>
                            <li>• Installer insurance coverage</li>
                            <li>• Product liability protection</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-yellow-400 font-medium mb-2">Conservative Projections:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Use lower generation estimates</li>
                            <li>• Plan for higher degradation rates</li>
                            <li>• Include replacement costs</li>
                            <li>• Conservative electricity price growth</li>
                            <li>• Build in maintenance contingency</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-green-400 font-medium mb-2">Diversification Options:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Multiple SEG supplier relationships</li>
                            <li>• Battery storage for flexibility</li>
                            <li>• Smart home integration</li>
                            <li>• EV charging coordination</li>
                            <li>• Future expansion capability</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded border border-gray-600">
                      <h5 className="font-medium text-white mb-3">Performance Optimisation Strategies:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h6 className="text-purple-400 font-medium mb-2">Maximising Self-Consumption:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Smart appliance timing (dishwasher, washing machine)</li>
                            <li>• Hot water diverters for immersion heating</li>
                            <li>• Electric vehicle charging during generation</li>
                            <li>• Battery storage for time-shifting</li>
                            <li>• Smart home automation systems</li>
                            <li>• Load monitoring and optimisation</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-cyan-400 font-medium mb-2">Export Income Optimisation:</h6>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Regular SEG tariff comparison and switching</li>
                            <li>• Time-of-use export rate utilisation</li>
                            <li>• Battery discharge timing for peak rates</li>
                            <li>• Grid services participation (larger systems)</li>
                            <li>• Virtual power plant membership</li>
                            <li>• Future flexibility market participation</li>
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
              <CardTitle className="text-white">Real World Scenario</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
                <p className="text-sm">
                  <strong>Case Study:</strong> A £6,000 solar system saves £700/year through reduced imports 
                  and SEG payments. Simple payback = ~8.5 years. After that, it generates pure profit for 
                  another 15–20 years, with total lifetime savings exceeding £15,000.
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
                ROI and payback analysis helps clients understand the long-term financial benefits of 
                renewable energy investments and enables them to plan future investments with confidence. 
                Consider all costs, degradation, and economic factors for accurate projections.
              </p>
            </CardContent>
          </Card>

          <RenewableEnergyFinancialCalculators />

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={quizQuestions} title="ROI and Payback Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-9-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-9-section-3">
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

export default RenewableEnergyModule9Section2;