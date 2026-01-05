import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { VoltageDropCalculator } from '@/components/upskilling/calculators/VoltageDropCalculator';

const EVChargingModule3Section2 = () => {
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
            <Zap className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold">
              Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Voltage Drop Calculations and Cable Sizing
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding voltage drop limits and selecting appropriate cable sizes for EV charging installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4 sm:space-y-6">
          
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
                Voltage drop calculations are fundamental to ensuring EV charging stations operate efficiently and safely. 
                Excessive voltage drop can lead to reduced charging speeds, equipment damage, and non-compliance with 
                BS 7671 requirements.
              </p>
              <p>
                This section covers the principles of voltage drop calculation, cable sizing methodology, and the 
                specific requirements for EV charging installations to ensure optimal performance and regulatory compliance.
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
                  "Calculate voltage drop for EV charging circuits according to BS 7671",
                  "Select appropriate cable sizes based on current carrying capacity and voltage drop",
                  "Apply cable sizing calculations for different installation methods",
                  "Understand the impact of cable length, current, and resistance on voltage drop",
                  "Identify when voltage drop compensation methods are required"
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
                <h3 className="text-xl font-semibold text-blue-300">BS 7671 Voltage Drop Limits</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-300">
                  BS 7671:2018+A2:2022 sets specific voltage drop limits for different types of installations:
                </p>
                <ul className="space-y-2 text-gray-300 ml-4">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Lighting circuits:</strong> 3% of nominal voltage (6.9V for 230V supply)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Power circuits (including EV charging):</strong> 5% of nominal voltage (11.5V for 230V supply)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Combined lighting and power:</strong> 4% maximum combined voltage drop</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="bg-card border-yellow-400/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Fundamental Voltage Drop Principles</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-white">What Causes Voltage Drop?</h3>
                <p>
                  Voltage drop occurs due to the resistance of conductors carrying current. This is governed by Ohm's Law 
                  and is influenced by several factors:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 border border-red-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-300 mb-2">Cable Factors:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Conductor material (copper vs aluminium)</li>
                      <li>• Cable cross-sectional area</li>
                      <li>• Cable length</li>
                      <li>• Cable temperature</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-300 mb-2">Load Factors:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Current magnitude</li>
                      <li>• Power factor</li>
                      <li>• Load type (resistive/inductive)</li>
                      <li>• Load diversity</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Basic Voltage Drop Formula:</h4>
                  <p className="font-mono text-amber-300 mb-2">Vd = (I × R × L) for single-phase</p>
                  <p className="font-mono text-amber-300 mb-2">Vd = (√3 × I × R × L) for three-phase</p>
                  <p className="text-sm text-gray-300">Where: Vd = voltage drop, I = current, R = resistance per unit length, L = cable length</p>
                </div>
              </CardContent>
            </Card>

            {/* Cable Sizing Methodology */}
            <Card className="bg-card border-yellow-400/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Cable Sizing Methodology</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-white">Step-by-Step Cable Selection Process</h3>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li><strong>Calculate design current (Ib):</strong> Based on load requirements and diversity</li>
                  <li><strong>Select protective device rating (In):</strong> Ensure In ≥ Ib</li>
                  <li><strong>Apply correction factors:</strong> For temperature, grouping, and installation method</li>
                  <li><strong>Determine minimum cable size for current capacity:</strong> Using BS 7671 tables</li>
                  <li><strong>Check voltage drop:</strong> Calculate and verify against limits</li>
                  <li><strong>Select final cable size:</strong> Largest of current capacity or voltage drop requirement</li>
                </ol>

                <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Key Correction Factors for EV Charging:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <h5 className="text-purple-200 font-semibold text-sm">Temperature (Ca)</h5>
                      <p className="text-xs text-gray-300">Ambient temperature effects on cable capacity</p>
                    </div>
                    <div>
                      <h5 className="text-purple-200 font-semibold text-sm">Grouping (Cg)</h5>
                      <p className="text-xs text-gray-300">Multiple cables in same route</p>
                    </div>
                    <div>
                      <h5 className="text-purple-200 font-semibold text-sm">Installation (Ci)</h5>
                      <p className="text-xs text-gray-300">Installation method affects heat dissipation</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white">EV Charging Specific Considerations</h3>
                <div className="space-y-3">
                  <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-400 mb-2">⚠️ Continuous Loading</h4>
                    <p className="text-gray-300">
                      EV charging represents a continuous load that can operate for extended periods. This affects both 
                      cable sizing and protective device selection, requiring careful consideration of thermal effects.
                    </p>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">Installation Environment</h4>
                    <p className="text-gray-300">
                      Outdoor installations, underground cables, and varying ambient temperatures all impact cable 
                      performance and sizing requirements for EV charging infrastructure.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cable Types and Applications */}
            <Card className="bg-card border-yellow-400/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Cable Types for EV Charging Applications</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">SWA (Steel Wire Armoured)</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Ideal for underground installations and areas requiring mechanical protection.
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Excellent mechanical protection</li>
                      <li>• Suitable for direct burial</li>
                      <li>• Higher cost but very durable</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">LSF (Low Smoke & Fume)</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Required in enclosed spaces and buildings with high occupancy.
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Reduced fire hazard</li>
                      <li>• Lower toxic gas emission</li>
                      <li>• Essential for enclosed car parks</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">XLPE Insulated</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Higher temperature rating allows for smaller cable sizes in many applications.
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• 90°C operating temperature</li>
                      <li>• Better current capacity</li>
                      <li>• Cost-effective solution</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Cable Size Quick Reference:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-green-400 font-semibold">3.5kW Single Phase:</span>
                      <p className="text-gray-300">Typically 2.5-4mm² depending on length</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-semibold">7kW Single Phase:</span>
                      <p className="text-gray-300">Typically 4-6mm² depending on length</p>
                    </div>
                    <div>
                      <span className="text-purple-400 font-semibold">11kW Three Phase:</span>
                      <p className="text-gray-300">Typically 2.5-4mm² depending on length</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-semibold">22kW Three Phase:</span>
                      <p className="text-gray-300">Typically 4-10mm² depending on length</p>
                    </div>
                  </div>
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
                  <p className="text-white font-semibold mb-2">Check 1: What is the maximum voltage drop allowed for EV charging circuits?</p>
                  <p className="text-gray-300">Answer: 5% of nominal voltage (11.5V for 230V supply) as per BS 7671 requirements for power circuits.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-white font-semibold mb-2">Check 2: Why might a cable need to be larger than required for current capacity alone?</p>
                  <p className="text-gray-300">Answer: To limit voltage drop within regulatory limits, especially for longer cable runs where resistance becomes significant.</p>
                </div>
                
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-white font-semibold mb-2">Check 3: What factors affect cable current-carrying capacity?</p>
                  <p className="text-gray-300">Answer: Ambient temperature, installation method, cable grouping, and conductor operating temperature rating.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voltage Drop Calculator */}
          <VoltageDropCalculator />

          {/* Real World Examples */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Real World Cable Sizing Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Example 1: Domestic 7kW Charger</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-gray-300 mb-2"><strong>Scenario:</strong> 7kW charger, 25m cable run, installed in conduit</p>
                  <p className="text-gray-300 mb-2"><strong>Design Current:</strong> 7000W ÷ 230V = 30.4A</p>
                  <p className="text-gray-300 mb-2"><strong>Cable for Current:</strong> 4mm² (37A capacity after derating)</p>
                  <p className="text-gray-300 mb-2"><strong>Voltage Drop Check:</strong> 30.4A × 25m × 11.5mV/A/m = 8.7V (3.8%)</p>
                  <p className="text-yellow-400 font-semibold">Result: 4mm² cable suitable (within 5% limit)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Example 2: Commercial 22kW Charger</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-gray-300 mb-2"><strong>Scenario:</strong> 22kW three-phase charger, 50m cable run, SWA cable</p>
                  <p className="text-gray-300 mb-2"><strong>Design Current:</strong> 22000W ÷ (√3 × 400V) = 31.8A</p>
                  <p className="text-gray-300 mb-2"><strong>Cable for Current:</strong> 6mm² (39A capacity)</p>
                  <p className="text-gray-300 mb-2"><strong>Voltage Drop Check:</strong> 31.8A × 50m × 7.3mV/A/m = 11.6V (2.9%)</p>
                  <p className="text-yellow-400 font-semibold">Result: 6mm² cable suitable for both current and voltage drop</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Example 3: Long Run 7kW Installation</h3>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="text-gray-300 mb-2"><strong>Scenario:</strong> 7kW charger, 80m cable run (unusual but possible)</p>
                  <p className="text-gray-300 mb-2"><strong>Design Current:</strong> 30.4A</p>
                  <p className="text-gray-300 mb-2"><strong>Cable for Current:</strong> 4mm² sufficient</p>
                  <p className="text-gray-300 mb-2"><strong>Voltage Drop (4mm²):</strong> 30.4A × 80m × 11.5mV/A/m = 28V (12.2% - too high!)</p>
                  <p className="text-gray-300 mb-2"><strong>Voltage Drop (10mm²):</strong> 30.4A × 80m × 4.4mV/A/m = 10.7V (4.7% - acceptable)</p>
                  <p className="text-yellow-400 font-semibold">Result: 10mm² cable required due to voltage drop limitation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-3-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-3-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default EVChargingModule3Section2;