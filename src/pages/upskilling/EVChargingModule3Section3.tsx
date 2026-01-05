import { ArrowLeft, ArrowRight, Shield, Target, BookOpen, CheckCircle, AlertTriangle, Zap, Settings, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule3Section3Quiz } from '@/components/upskilling/quiz/EVChargingModule3Section3Quiz';

const EVChargingModule3Section3 = () => {
  useEffect(() => {
    document.title = 'Circuit Protection and RCD Selection - EV Charging Module 3 Section 3';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master circuit protection and RCD selection for EV charging installations. Learn about protective device sizing, coordination, and safety requirements for electric vehicle charging circuits.');
    }

    // Add JSON-LD structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": "Circuit Protection and RCD Selection for EV Charging",
      "description": "Comprehensive training on circuit protection devices and RCD selection for EV charging installations",
      "provider": {
        "@type": "Organization",
        "name": "EV Charging Training"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
        
        <div className="max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                Circuit Protection and RCD Selection
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 break-words">
                Module 3, Section 3 - Protective Device Selection and Coordination
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
              Module 3.3
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
              32 minutes
            </Badge>
          </div>
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
                Proper circuit protection is fundamental to the safe operation of EV charging installations. 
                The selection of appropriate protective devices ensures both safety and reliability whilst 
                providing discrimination and coordination within the electrical system.
              </p>
              <p>
                This section focuses on the critical aspects of protective device selection, sizing, and 
                coordination specifically for EV charging circuits, including RCD requirements, circuit 
                breaker selection, and advanced protection technologies.
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
                  "Select appropriate RCD types and ratings for EV charging circuits",
                  "Size circuit breakers correctly for different EV charging loads",
                  "Understand discrimination and coordination principles",
                  "Apply surge protection device (SPD) requirements",
                  "Implement arc fault detection device (AFDD) protection where required",
                  "Design protective systems for different charging scenarios"
                ].map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* RCD Selection */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">RCD Selection and Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-yellow-400/30 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-blue-300">BS 7671 RCD Requirements</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    Regulation 722.531.2.101 specifies mandatory RCD protection for EV charging installations:
                  </p>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Type A RCD minimum:</strong> Protection against AC residual currents and pulsating DC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Type B RCD preferred:</strong> Additional protection against smooth DC residual currents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>30mA rating:</strong> Maximum permitted residual current for additional protection</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">RCD Types and Applications</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border border-green-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-3">Type AC RCD</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Detects AC residual currents only</li>
                    <li>• <strong>Not suitable</strong> for EV charging</li>
                    <li>• May not detect DC faults</li>
                    <li>• Legacy installations only</li>
                  </ul>
                  <div className="mt-3 p-2 bg-red-900/30 border border-red-500/30 rounded">
                    <p className="text-xs text-red-300">⚠️ Non-compliant for new EV installations</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-900/40 to-orange-800/40 border border-amber-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-400 mb-3">Type A RCD</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Detects AC and pulsating DC</li>
                    <li>• Minimum requirement for EV</li>
                    <li>• Suitable for most Mode 2/3 charging</li>
                    <li>• Cost-effective solution</li>
                  </ul>
                  <div className="mt-3 p-2 bg-amber-900/30 border border-amber-500/30 rounded">
                    <p className="text-xs text-amber-300">✓ Compliant minimum standard</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-800/40 border border-yellow-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">Type B RCD</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Detects all residual currents</li>
                    <li>• Preferred for EV charging</li>
                    <li>• Handles smooth DC currents</li>
                    <li>• Future-proof protection</li>
                  </ul>
                  <div className="mt-3 p-2 bg-blue-900/30 border border-yellow-400/30 rounded">
                    <p className="text-xs text-blue-300">⭐ Recommended best practice</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-yellow-400 mb-2">Selection Criteria:</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <Gauge className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Charging power:</strong> Higher power installations benefit from Type B protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Gauge className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Vehicle type:</strong> Consider DC leakage characteristics of target vehicles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Gauge className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Installation environment:</strong> External installations may require enhanced protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Gauge className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Future requirements:</strong> Type B provides better future compatibility</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Circuit Breaker Selection */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Circuit Breaker Selection and Sizing</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Circuit breakers must be correctly sized to protect the installation whilst allowing normal 
                operation. EV charging presents unique considerations due to sustained high current loads.
              </p>

              <h3 className="text-xl font-semibold text-white">Sizing Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Current Rating Selection:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• MCB rating ≥ design current (Ib)</li>
                    <li>• MCB rating ≤ cable current capacity (Iz)</li>
                    <li>• Consider sustained load factors</li>
                    <li>• Allow for temperature derating</li>
                    <li>• Account for grouping factors</li>
                  </ul>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">Characteristic Selection:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Type B: General EV charging applications</li>
                    <li>• Type C: High inrush current scenarios</li>
                    <li>• Type D: Motor loads and special applications</li>
                    <li>• Consider starting characteristics</li>
                    <li>• Ensure discrimination with upstream devices</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">EV Load Characteristics</h3>
              <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-400 mb-2">Key Considerations:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Sustained loading:</strong> EV charging operates at full load for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Switch-on transients:</strong> Initial connection may cause brief overcurrent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Power factor:</strong> Near unity power factor for resistive charging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Harmonic content:</strong> Switch-mode power supplies may generate harmonics</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white">Example Sizing Calculations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2 text-yellow-400">Charging Power</th>
                      <th className="text-left p-2 text-yellow-400">Design Current</th>
                      <th className="text-left p-2 text-yellow-400">MCB Rating</th>
                      <th className="text-left p-2 text-yellow-400">Cable CSA</th>
                      <th className="text-left p-2 text-yellow-400">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2">3.7kW (16A)</td>
                      <td className="p-2">16A</td>
                      <td className="p-2">20A Type B</td>
                      <td className="p-2">2.5mm²</td>
                      <td className="p-2">Standard domestic</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">7.4kW (32A)</td>
                      <td className="p-2">32A</td>
                      <td className="p-2">40A Type B</td>
                      <td className="p-2">6.0mm²</td>
                      <td className="p-2">Fast charging</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">11kW (16A 3-phase)</td>
                      <td className="p-2">16A</td>
                      <td className="p-2">20A Type B</td>
                      <td className="p-2">2.5mm²</td>
                      <td className="p-2">Commercial 3-phase</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">22kW (32A 3-phase)</td>
                      <td className="p-2">32A</td>
                      <td className="p-2">40A Type B</td>
                      <td className="p-2">6.0mm²</td>
                      <td className="p-2">High-power 3-phase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Protection */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Advanced Protection Technologies</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h3 className="text-xl font-semibold text-white">Surge Protection Devices (SPDs)</h3>
              <p>
                SPDs protect EV charging equipment from transient overvoltages caused by switching operations 
                or lightning strikes, particularly important for outdoor installations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-900/40 to-red-800/40 border border-orange-500/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-400 mb-2">SPD Requirements:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Type 2 SPD minimum for distribution boards</li>
                    <li>• Type 3 SPD at charging point if &gt;30m from Type 2</li>
                    <li>• Consider lightning risk assessment</li>
                    <li>• Coordinate with other protective devices</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-800/40 border border-yellow-400/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Selection Criteria:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Uc rating ≥ 1.1 × nominal voltage</li>
                    <li>• Imax ≥ expected surge current</li>
                    <li>• Up protection level appropriate for equipment</li>
                    <li>• Follow of current interruption capability</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">Arc Fault Detection Devices (AFDDs)</h3>
              <p>
                AFDDs provide enhanced protection against arc faults, which can cause fires. 
                Whilst not mandatory for EV charging, they provide additional safety benefits.
              </p>

              <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/30 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-2">AFDD Considerations for EV Charging:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Settings className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Enhanced safety:</strong> Particularly beneficial for domestic installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Insurance benefits:</strong> May reduce insurance premiums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Compatibility:</strong> Ensure compatibility with EV charging equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Settings className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Testing requirements:</strong> Regular functional testing required</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Discrimination and Coordination */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Discrimination and Coordination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Proper discrimination ensures that only the protective device closest to a fault operates, 
                maintaining supply to unaffected circuits whilst clearing faults safely.
              </p>

              <h3 className="text-xl font-semibold text-white">Time-Current Discrimination</h3>
              <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-yellow-400 mb-2">Discrimination Requirements:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Upstream devices:</strong> Must have higher current rating or longer time delay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>RCD coordination:</strong> Use time-delayed RCDs upstream where required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Back-up protection:</strong> Ensure adequate fault current breaking capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Testing verification:</strong> Verify discrimination through testing</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white">Typical Protection Hierarchy</h3>
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-800/40 border border-green-500/30 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <span><strong>Incomer:</strong> Main switch/MCCB (100A+, time-delayed RCD if required)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <span><strong>Distribution:</strong> MCB (63A-80A, selective RCD if required)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <span><strong>Final circuit:</strong> MCB + RCD (20A-40A, 30mA instantaneous)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <span><strong>Equipment:</strong> Internal protection within charging unit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="border border-red-600/30 bg-red-600/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                RCD Discrimination Failure
              </p>
              <p>
                A commercial car park experienced nuisance tripping where multiple EV chargers 
                would disconnect when one developed a fault. Investigation revealed inadequate 
                RCD discrimination - all circuits used 30mA instantaneous RCDs without proper 
                upstream coordination, causing widespread disruption.
              </p>
              <p className="text-sm italic">
                Solution: Implemented selective 300mA S-type RCD upstream with maintained 30mA 
                protection at individual charging points, ensuring fault containment.
              </p>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-yellow-400/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Quick Knowledge Checks</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="font-semibold text-yellow-400 mb-2">Q: What is the minimum RCD type required for EV charging?</p>
                  <p className="text-sm">A: Type A RCD minimum, with Type B RCD preferred for enhanced protection against all residual current types.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="font-semibold text-yellow-400 mb-2">Q: How should circuit breakers be sized for sustained EV loading?</p>
                  <p className="text-sm">A: MCB rating should be ≥ design current and ≤ cable capacity, accounting for sustained loading and derating factors.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-yellow-400/30">
                  <p className="font-semibold text-yellow-400 mb-2">Q: When are SPDs required for EV charging installations?</p>
                  <p className="text-sm">A: SPDs are required based on risk assessment, particularly for outdoor installations and areas with high lightning activity.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Summary */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-amber-900/40 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white">Section Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p>
                This section covered the critical aspects of circuit protection for EV charging installations. 
                Key takeaways include the mandatory requirement for Type A RCD protection (with Type B preferred), 
                proper circuit breaker sizing for sustained loads, and the importance of discrimination in 
                protection system design.
              </p>
              <p>
                Advanced protection technologies such as SPDs and AFDDs provide enhanced safety and reliability, 
                whilst proper coordination ensures selective operation during fault conditions. 
                Regular testing and maintenance of protective devices is essential for continued safe operation.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule3Section3Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-3-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-3-section-4">
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

export default EVChargingModule3Section3;