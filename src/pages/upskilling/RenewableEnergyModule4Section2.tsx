import { ArrowLeft, BarChart, Calculator, Clock, Battery, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const RenewableEnergyModule4Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What happens if you regularly discharge a battery beyond its DoD limit?",
      options: [
        "It increases battery capacity",
        "It has no effect on performance",
        "It significantly reduces cycle life and can cause permanent damage",
        "It improves charging efficiency"
      ],
      correct: 2,
      explanation: "Regularly discharging a battery beyond its recommended DoD limit significantly reduces cycle life, can cause permanent capacity loss, and may lead to irreversible damage to the battery cells."
    },
    {
      id: 2,
      question: "How do you calculate usable battery capacity?",
      options: [
        "Total capacity × Depth of Discharge",
        "Total capacity ÷ Depth of Discharge",
        "Total capacity + Depth of Discharge",
        "Total capacity - Depth of Discharge"
      ],
      correct: 0,
      explanation: "Usable battery capacity = Total capacity × Depth of Discharge. For example, a 100kWh battery with 80% DoD provides 80kWh of usable capacity."
    },
    {
      id: 3,
      question: "What is round-trip efficiency?",
      options: [
        "The time it takes to charge a battery",
        "The percentage of stored energy that can be retrieved",
        "The maximum discharge rate",
        "The battery's cycle life"
      ],
      correct: 1,
      explanation: "Round-trip efficiency is the percentage of energy stored in a battery that can be retrieved during discharge. It accounts for losses during both charging and discharging processes."
    },
    {
      id: 4,
      question: "Why does DoD affect cycle life?",
      options: [
        "Deeper discharges cause more chemical stress and structural changes in battery materials",
        "It doesn't affect cycle life",
        "Shallow discharges cause more damage",
        "DoD only affects charging time"
      ],
      correct: 0,
      explanation: "Deeper discharges cause more chemical stress and structural changes in battery materials, leading to faster degradation. Limiting DoD extends cycle life significantly."
    },
    {
      id: 5,
      question: "What's a typical lifespan for LFP batteries?",
      options: [
        "2-5 years",
        "5-8 years",
        "10-15 years",
        "20-25 years"
      ],
      correct: 2,
      explanation: "LFP batteries typically last 10-15 years with proper usage and management, achieving 3000-5000 cycles at 80% DoD before reaching 80% of original capacity."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              Battery Sizing, Depth of Discharge, and Lifespan
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding capacity requirements, performance metrics, and longevity factors
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Battery Sizing
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
                  Calculate battery storage capacity requirements for different applications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand how Depth of Discharge (DoD) affects battery lifespan
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn how proper sizing affects overall system performance and economics
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
                Correct battery sizing and understanding performance metrics ensures reliable storage operation and maximizes battery lifespan. This section provides the tools and knowledge needed to properly size battery systems and optimize their performance for different applications.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calculator className="h-6 w-6 text-yellow-400" />
                Battery Sizing Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Proper battery sizing requires understanding daily energy requirements, backup duration needs, and system efficiency factors.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Daily Load Analysis:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Energy audit:</strong> Calculate total daily kWh consumption</li>
                    <li>• <strong>Load profiling:</strong> Understand when energy is consumed</li>
                    <li>• <strong>Peak demand:</strong> Identify maximum instantaneous power draw</li>
                    <li>• <strong>Seasonal variation:</strong> Account for changing consumption patterns</li>
                    <li>• <strong>Future growth:</strong> Plan for increased demand over time</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Autonomy Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Backup duration:</strong> Hours/days of autonomous operation</li>
                    <li>• <strong>Weather patterns:</strong> Consider local solar/wind availability</li>
                    <li>• <strong>Grid reliability:</strong> Factor in outage frequency and duration</li>
                    <li>• <strong>Critical vs non-critical loads:</strong> Prioritize essential systems</li>
                    <li>• <strong>Safety margins:</strong> Add 10-20% buffer for unexpected events</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Battery Sizing Calculation:</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p><strong>Required Battery Capacity (kWh) = (Daily Load × Autonomy Days) ÷ (DoD × System Efficiency)</strong></p>
                  <div className="mt-3 p-3 bg-gray-800 rounded">
                    <h5 className="text-white font-medium mb-2">Example Calculation:</h5>
                    <ul className="space-y-1">
                      <li>• Daily consumption: 25 kWh</li>
                      <li>• Autonomy requirement: 2 days</li>
                      <li>• Battery DoD: 80% (LFP)</li>
                      <li>• System efficiency: 90%</li>
                      <li>• <strong>Result:</strong> (25 × 2) ÷ (0.8 × 0.9) = <span className="text-yellow-400">69.4 kWh nominal capacity</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart className="h-6 w-6 text-green-400" />
                Depth of Discharge (DoD) Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Depth of Discharge is the percentage of battery capacity that has been used relative to the total capacity. DoD significantly impacts battery lifespan and economics.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">DoD vs Cycle Life:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Lead-acid 30% DoD:</strong> 1200-1500 cycles</li>
                    <li>• <strong>Lead-acid 50% DoD:</strong> 600-800 cycles</li>
                    <li>• <strong>Lead-acid 80% DoD:</strong> 200-400 cycles</li>
                    <li>• <strong>LFP 80% DoD:</strong> 4000-5000 cycles</li>
                    <li>• <strong>LFP 95% DoD:</strong> 2000-3000 cycles</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Chemistry-Specific DoD:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Flooded lead-acid:</strong> 50% maximum recommended</li>
                    <li>• <strong>AGM/Gel:</strong> 60-70% acceptable</li>
                    <li>• <strong>Standard Li-Ion:</strong> 80-90% typical</li>
                    <li>• <strong>LFP:</strong> 90-95% safe operating range</li>
                    <li>• <strong>Flow batteries:</strong> 100% without degradation</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Economic Impact:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Shallow cycling:</strong> Higher upfront cost, longer life</li>
                    <li>• <strong>Deep cycling:</strong> Lower upfront cost, shorter life</li>
                    <li>• <strong>Sweet spot:</strong> Balance between capacity and longevity</li>
                    <li>• <strong>Total cost of ownership:</strong> Include replacement costs</li>
                    <li>• <strong>Warranty considerations:</strong> DoD affects warranty terms</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-400" />
                Battery Lifespan Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Understanding battery degradation mechanisms and planning for replacement ensures reliable long-term operation and accurate financial projections.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Degradation Factors:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Cycle aging:</strong> Wear from charge/discharge cycles</li>
                    <li>• <strong>Calendar aging:</strong> Time-based degradation even when unused</li>
                    <li>• <strong>Temperature stress:</strong> High temperatures accelerate aging</li>
                    <li>• <strong>State of charge:</strong> Holding high/low SoC increases degradation</li>
                    <li>• <strong>Charge rate:</strong> Fast charging increases stress</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Lifespan Indicators:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Capacity retention:</strong> Typically 80% End of Life criteria</li>
                    <li>• <strong>Internal resistance:</strong> Increasing resistance reduces efficiency</li>
                    <li>• <strong>Self-discharge rate:</strong> Higher rates indicate aging</li>
                    <li>• <strong>Voltage stability:</strong> Reduced voltage stability over time</li>
                    <li>• <strong>Thermal behavior:</strong> Increased heat generation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Typical Battery Lifespans:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Years of Service:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Flooded lead-acid: 5-8 years</li>
                      <li>• AGM/Gel: 6-10 years</li>
                      <li>• Standard Li-Ion: 8-12 years</li>
                      <li>• LFP: 10-15 years</li>
                      <li>• Flow batteries: 20+ years</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Total Throughput:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Lead-acid: 500-1000 MWh/MWh</li>
                      <li>• Li-Ion: 2000-4000 MWh/MWh</li>
                      <li>• LFP: 4000-6000 MWh/MWh</li>
                      <li>• Flow: 10000+ MWh/MWh</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-purple-400" />
                Round-Trip Efficiency and System Losses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Round-trip efficiency represents the energy losses during storage and retrieval, directly affecting system economics and sizing requirements.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Efficiency Components:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Battery efficiency:</strong> Chemical storage/retrieval losses</li>
                    <li>• <strong>Inverter efficiency:</strong> AC/DC conversion losses</li>
                    <li>• <strong>BMS losses:</strong> Management system power consumption</li>
                    <li>• <strong>Cabling losses:</strong> Resistance losses in connections</li>
                    <li>• <strong>Auxiliary systems:</strong> Cooling, monitoring power draw</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Typical Round-Trip Efficiencies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Lead-acid systems:</strong> 75-85%</li>
                    <li>• <strong>Li-Ion systems:</strong> 90-95%</li>
                    <li>• <strong>LFP systems:</strong> 92-96%</li>
                    <li>• <strong>Flow battery systems:</strong> 65-80%</li>
                    <li>• <strong>Target for sizing:</strong> Use 90% for planning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Real-World Sizing Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Residential Example:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Daily consumption:</strong> 15 kWh</li>
                    <li>• <strong>Backup requirement:</strong> 1 day</li>
                    <li>• <strong>Peak load:</strong> 5 kW</li>
                    <li>• <strong>Battery choice:</strong> LFP (90% DoD, 95% efficiency)</li>
                    <li>• <strong>Calculation:</strong> (15 × 1) ÷ (0.9 × 0.95) = 17.5 kWh</li>
                    <li>• <strong>Recommended size:</strong> 20 kWh system</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Small Commercial Example:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Daily consumption:</strong> 100 kWh</li>
                    <li>• <strong>Backup requirement:</strong> 4 hours peak load</li>
                    <li>• <strong>Peak load:</strong> 50 kW</li>
                    <li>• <strong>Critical load:</strong> 30 kW × 4 hours = 120 kWh</li>
                    <li>• <strong>Calculation:</strong> 120 ÷ (0.9 × 0.95) = 140 kWh</li>
                    <li>• <strong>Recommended size:</strong> 150 kWh system</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Sizing Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern battery sizing incorporates probabilistic analysis, machine learning, and real-time optimization to achieve more accurate and cost-effective designs.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Monte Carlo Analysis:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Weather variability:</strong> Model solar and wind resource uncertainty</li>
                    <li>• <strong>Load variation:</strong> Account for consumption pattern changes</li>
                    <li>• <strong>Equipment reliability:</strong> Factor in component failure rates</li>
                    <li>• <strong>Risk assessment:</strong> Quantify probability of energy shortfalls</li>
                    <li>• <strong>Optimization:</strong> Find optimal sizing with acceptable risk levels</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Machine Learning Approaches:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Historical data analysis:</strong> Learn from years of consumption patterns</li>
                    <li>• <strong>Predictive modeling:</strong> Forecast future energy requirements</li>
                    <li>• <strong>Dynamic sizing:</strong> Adjust capacity based on usage evolution</li>
                    <li>• <strong>Anomaly detection:</strong> Identify unusual consumption events</li>
                    <li>• <strong>Continuous optimization:</strong> Improve sizing accuracy over time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Battery Degradation Models</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Accurate degradation modeling is essential for predicting long-term performance and optimizing replacement schedules for economic viability.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Capacity Fade Models:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Linear fade:</strong> Simplified constant degradation rate</li>
                    <li>• <strong>Square root model:</strong> Initial rapid fade, then slower</li>
                    <li>• <strong>Arrhenius model:</strong> Temperature-dependent degradation</li>
                    <li>• <strong>Multi-factor models:</strong> SoC, temperature, and cycling effects</li>
                    <li>• <strong>Empirical models:</strong> Based on manufacturer test data</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Resistance Growth:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Power fade:</strong> Increasing internal resistance over time</li>
                    <li>• <strong>Thermal effects:</strong> Higher resistance at temperature extremes</li>
                    <li>• <strong>State of health (SoH):</strong> Combined capacity and power metrics</li>
                    <li>• <strong>End of life criteria:</strong> 80% capacity or 150% resistance</li>
                    <li>• <strong>Performance impact:</strong> Reduced efficiency and power capability</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-3">Degradation Mitigation:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Operating window:</strong> Limit SoC range to 20-80%</li>
                    <li>• <strong>Temperature control:</strong> Active thermal management systems</li>
                    <li>• <strong>Charge rate limitation:</strong> Avoid high C-rate charging</li>
                    <li>• <strong>Calendar aging:</strong> Storage at optimal SoC levels</li>
                    <li>• <strong>Load balancing:</strong> Even utilization across battery modules</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Case Study: Residential Battery Sizing Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                A detailed sizing analysis for a UK residential customer demonstrates how multiple factors influence optimal battery capacity selection.
              </p>
              <div className="bg-card p-4 rounded-lg mb-4">
                <h4 className="text-green-400 font-semibold mb-3">Customer Profile:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Load Profile:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Annual consumption: 4,200 kWh</li>
                      <li>• Daily average: 11.5 kWh</li>
                      <li>• Peak winter: 18 kWh/day</li>
                      <li>• Minimum summer: 8 kWh/day</li>
                      <li>• Peak demand: 3.5 kW</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">PV System:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Capacity: 4.2 kWp south-facing</li>
                      <li>• Annual generation: 3,800 kWh</li>
                      <li>• Summer peak: 25 kWh/day</li>
                      <li>• Winter minimum: 2 kWh/day</li>
                      <li>• Self-consumption without storage: 45%</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-3">Sizing Analysis Results:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">5 kWh Battery:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Self-consumption: 67%</li>
                      <li>• Annual savings: £420</li>
                      <li>• ROI period: 14.3 years</li>
                      <li>• Good for light users</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">10 kWh Battery (Optimal):</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Self-consumption: 82%</li>
                      <li>• Annual savings: £680</li>
                      <li>• ROI period: 11.8 years</li>
                      <li>• Best economic performance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">15 kWh Battery:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Self-consumption: 89%</li>
                      <li>• Annual savings: £790</li>
                      <li>• ROI period: 15.2 years</li>
                      <li>• Diminishing returns evident</li>
                    </ul>
                  </div>
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
                Proper battery sizing requires careful analysis of energy requirements, backup duration, and efficiency factors. Understanding DoD impact on cycle life is crucial for economic optimization. Advanced modeling techniques and degradation analysis enable more accurate sizing decisions for optimal system performance and economics.
              </p>
              <p className="text-yellow-400 font-medium">
                Use advanced sizing methods including probabilistic analysis and degradation modeling to achieve optimal battery system design.
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
                title="Battery Sizing and DoD Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule4Section2;