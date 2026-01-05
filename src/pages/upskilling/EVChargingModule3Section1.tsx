import { ArrowLeft, Calculator, Target, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LoadCalculator } from '@/components/upskilling/calculators/LoadCalculator';
import { EVChargingModule3Section1Quiz } from '@/components/upskilling/quiz/EVChargingModule3Section1Quiz';
import { EVChargingModule3Section1FAQ } from '@/components/upskilling/quiz/EVChargingModule3Section1FAQ';

const EVChargingModule3Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../ev-charging-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold">
              Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Load Estimation and Diversity in Practice
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Calculating electrical loads and applying diversity factors for EV charging installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Load estimation is a critical aspect of designing electrical installations for EV charging systems. 
                Understanding how to calculate loads and apply diversity factors ensures safe, efficient, and 
                compliant installations whilst optimising costs.
              </p>
              <p>
                This section will teach you the fundamental principles of load calculation specific to EV charging 
                infrastructure, including how to apply diversity factors according to BS 7671 and IET guidance.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">By the end of this section, you will be able to:</p>
              <ul className="space-y-2">
                {[
                  "Calculate maximum demand for EV charging installations",
                  "Apply appropriate diversity factors according to BS 7671",
                  "Determine cable sizing requirements based on load calculations",
                  "Assess existing electrical supply capacity for EV charging additions",
                  "Apply load estimation principles to commercial and domestic installations"
                ].map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Content/Learning */}
          <div className="space-y-6">
            {/* BS 7671 Requirements Panel */}
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-yellow-400/30 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-blue-300">BS 7671 Requirements</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-300">
                  BS 7671:2018+A2:2022 provides specific guidance for EV charging installations:
                </p>
                <ul className="space-y-2 text-gray-300 ml-4">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Regulation 722:</strong> Specific requirements for EV charging equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Appendix 15:</strong> Energy storage systems and EV charging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Section 528:</strong> Caravan and motor caravan parks (relevant for charging points)</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="bg-card border-yellow-400/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Fundamental Load Calculation Principles</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-white">Maximum Demand vs Connected Load</h3>
                <p>
                  The <strong>connected load</strong> is the sum of all individual loads that could potentially operate simultaneously. 
                  However, the <strong>maximum demand</strong> is the actual maximum load that will be drawn in practice, 
                  taking into account diversity factors.
                </p>
                
                <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Why Diversity Matters:</h4>
                  <p className="text-gray-300">
                    Without diversity factors, electrical installations would be massively oversized and unnecessarily expensive. 
                    Real-world usage patterns show that peak demand rarely equals connected load.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold text-white">Diversity Factors for EV Charging</h3>
                <p>
                  According to IET guidance and industry best practice, diversity factors for EV charging depend on:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Number of charging points</li>
                  <li>Type of installation (domestic, workplace, public)</li>
                  <li>Charging speeds and user patterns</li>
                  <li>Time of use considerations</li>
                  <li>Load management system capabilities</li>
                  <li>Future expansion requirements</li>
                </ul>

                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Typical Diversity Factors:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-green-400 font-semibold mb-1">Domestic Installations:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• Single charger: 100% (no diversity)</li>
                        <li>• 2-3 chargers: 85-90%</li>
                        <li>• 4-5 chargers: 80-85%</li>
                        <li>• 6+ chargers: 75-80%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-1">Commercial Installations:</h5>
                      <ul className="space-y-1 text-sm">
                        <li>• 2-5 workplace: 80-85%</li>
                        <li>• 6-10 workplace: 70-80%</li>
                        <li>• 11-20 public: 60-70%</li>
                        <li>• 20+ rapid charging: 50-60%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Considerations */}
            <Card className="bg-card border-yellow-400/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Advanced Load Calculation Considerations</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-400 mb-2">⚠️ Smart Charging Impact</h4>
                  <p className="text-gray-300">
                    Smart charging systems can significantly affect diversity calculations. Systems that actively manage 
                    charging schedules can allow for higher diversity factors (lower maximum demand) by preventing 
                    simultaneous charging events.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-white">Load Management Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">Static Load Management</h4>
                    <p className="text-sm text-gray-300">
                      Fixed power allocation per charger. Simple but less efficient use of available capacity.
                    </p>
                  </div>
                  <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">Dynamic Load Management</h4>
                    <p className="text-sm text-gray-300">
                      Real-time adjustment based on actual demand. Optimises use of available supply capacity.
                    </p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">Predictive Management</h4>
                    <p className="text-sm text-gray-300">
                      Uses AI/ML to predict usage patterns and pre-allocate capacity for optimal efficiency.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white">Temperature and Environmental Factors</h3>
                <p>
                  Environmental conditions can significantly impact electrical load calculations:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Cable derating:</strong> Higher ambient temperatures reduce cable current-carrying capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Seasonal variations:</strong> Winter heating loads may increase overall electrical demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Battery performance:</strong> Cold weather increases charging times and energy requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-yellow-400/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Load Calculation Methodology</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-white">Step-by-Step Process</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong>Identify all loads:</strong> List existing and new EV charging loads</li>
                  <li><strong>Determine individual ratings:</strong> Note power ratings for each charger</li>
                  <li><strong>Calculate connected load:</strong> Sum all individual loads</li>
                  <li><strong>Apply diversity factor:</strong> Multiply by appropriate diversity factor</li>
                  <li><strong>Add safety margin:</strong> Include 10-20% safety factor</li>
                  <li><strong>Check against supply capacity:</strong> Verify existing supply can handle load</li>
                </ol>

                <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-400 mb-2">Formula:</h4>
                  <p className="font-mono text-amber-300">
                    Maximum Demand = (Connected Load × Diversity Factor) × Safety Factor
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Checks */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-white font-semibold mb-2">Check 1: What is the typical diversity factor for 3 domestic EV chargers?</p>
                  <p className="text-gray-300">Answer: 80-90% - Multiple domestic chargers rarely operate at full load simultaneously.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-white font-semibold mb-2">Check 2: Why do we apply a safety factor to load calculations?</p>
                  <p className="text-gray-300">Answer: To account for future load growth, measurement uncertainties, and ensure safe operation under all conditions.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-white font-semibold mb-2">Check 3: What factors affect diversity in workplace charging?</p>
                  <p className="text-gray-300">Answer: Employee arrival/departure patterns, charging durations, vehicle types, and shift patterns.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculator */}
          <LoadCalculator />

          {/* Real World Examples */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Real World Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Example 1: Residential Development</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-gray-300 mb-2"><strong>Scenario:</strong> 10-house development, each with 7kW EV charger</p>
                  <p className="text-gray-300 mb-2"><strong>Connected Load:</strong> 10 × 7kW = 70kW</p>
                  <p className="text-gray-300 mb-2"><strong>Diversity Factor:</strong> 75% (based on usage patterns)</p>
                  <p className="text-gray-300 mb-2"><strong>Safety Factor:</strong> 15%</p>
                  <p className="text-yellow-400 font-semibold">Maximum Demand: 70kW × 0.75 × 1.15 = 60.4kW</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Example 2: Office Car Park</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-gray-300 mb-2"><strong>Scenario:</strong> 20 workplace chargers at 22kW each</p>
                  <p className="text-gray-300 mb-2"><strong>Connected Load:</strong> 20 × 22kW = 440kW</p>
                  <p className="text-gray-300 mb-2"><strong>Diversity Factor:</strong> 70% (workplace patterns)</p>
                  <p className="text-gray-300 mb-2"><strong>Safety Factor:</strong> 20%</p>
                  <p className="text-yellow-400 font-semibold">Maximum Demand: 440kW × 0.70 × 1.20 = 369.6kW</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Example 3: Existing Installation Assessment</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-gray-300 mb-2"><strong>Scenario:</strong> Adding 2 × 7kW chargers to house with 60A supply</p>
                  <p className="text-gray-300 mb-2"><strong>Existing Load:</strong> 8kW (typical domestic)</p>
                  <p className="text-gray-300 mb-2"><strong>New Chargers:</strong> 2 × 7kW = 14kW</p>
                  <p className="text-gray-300 mb-2"><strong>Diversity Factor:</strong> 85% (2 chargers)</p>
                  <p className="text-gray-300 mb-2"><strong>Total Max Demand:</strong> 8kW + (14kW × 0.85) = 19.9kW</p>
                  <p className="text-yellow-400 font-semibold">Supply Capacity: 60A × 230V = 13.8kW - UPGRADE REQUIRED</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <EVChargingModule3Section1FAQ />

          {/* Summary */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Section Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Load estimation and diversity factors are fundamental to designing safe and efficient EV charging installations. 
                Key takeaways from this section include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Always distinguish between connected load and maximum demand</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Apply appropriate diversity factors based on installation type and usage patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Include safety factors to account for future growth and operational variations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Verify existing supply capacity before adding EV charging loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Use standardised calculation methods for consistency and compliance</span>
                </li>
              </ul>
              <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30 mt-4">
                <p className="text-yellow-400 font-semibold">
                  Remember: Accurate load calculations are essential for safety, compliance, and cost-effective installations. 
                  When in doubt, consult with experienced engineers and always err on the side of caution.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <EVChargingModule3Section1Quiz />

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule3Section1;