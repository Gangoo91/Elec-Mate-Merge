import { ArrowLeft, ArrowRight, Shield, BookOpen, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import EVChargingModule6Section4Quiz from '@/components/upskilling/quiz/EVChargingModule6Section4Quiz';

const EVChargingModule6Section4 = () => {
  useEffect(() => {
    document.title = 'RCD and Functional Testing - EV Charging Module 6 Section 4';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn RCD testing procedures for EV charging installations. Master Type A, Type B, and EV-RCD testing for safe charging systems.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            RCD and Functional Testing
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Testing protective devices and EV-specific safety equipment
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Residual Current Devices (RCDs) are critical safety components in EV charging installations, 
                providing protection against earth faults and ensuring personal safety. This section covers 
                the testing procedures for different types of RCDs used in EV charging applications, including 
                standard Type A, specialized Type B, and EV-specific RCDs designed for DC fault detection.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">RCD Testing Fundamentals</h4>
                <ul className="text-sm space-y-1">
                  <li>• Type A RCD testing for AC charging applications</li>
                  <li>• Type B RCD testing for DC fault protection</li>
                  <li>• EV-specific RCD testing procedures</li>
                  <li>• Functional testing of charging control systems</li>
                  <li>• Trip time verification and calibration</li>
                  <li>• Documentation and test record requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="space-y-3">
                {[
                  "Understand different RCD types and their applications in EV charging",
                  "Perform Type A RCD testing procedures and interpret results",
                  "Execute Type B RCD functional tests for DC fault protection",
                  "Test EV-specific RCD protection systems",
                  "Verify DC fault detection capabilities and trip times",
                  "Understand test current requirements and safety procedures",
                  "Interpret test results and complete fault diagnosis",
                  "Complete RCD testing documentation and certification"
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
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">RCD Types and Testing Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* RCD Types */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">RCD Classifications for EV Charging</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Type A RCD</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Detects sinusoidal AC residual currents</li>
                      <li>• Responds to pulsating DC up to 6mA</li>
                      <li>• Standard for basic AC charging</li>
                      <li>• Trip current: 30mA typical</li>
                      <li>• Operating time: ≤300ms</li>
                    </ul>
                    <div className="mt-3 p-2 bg-blue-800/50 rounded text-xs text-blue-200">
                      Applications: Mode 1, Mode 2 charging
                    </div>
                  </div>
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Type B RCD</h4>
                    <ul className="text-sm space-y-1">
                      <li>• All Type A capabilities plus:</li>
                      <li>• Smooth DC residual currents</li>
                      <li>• AC up to 1kHz frequency</li>
                      <li>• DC component up to 10mA</li>
                      <li>• Essential for DC charging</li>
                    </ul>
                    <div className="mt-3 p-2 bg-green-800/50 rounded text-xs text-green-200">
                      Applications: Mode 3, DC fast charging
                    </div>
                  </div>
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">EV-RCD</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Specialized for EV applications</li>
                      <li>• Enhanced DC fault detection</li>
                      <li>• Communication capability</li>
                      <li>• Self-testing functions</li>
                      <li>• Overcurrent protection</li>
                    </ul>
                    <div className="mt-3 p-2 bg-amber-800/50 rounded text-xs text-amber-200">
                      Applications: Smart charging systems
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced RCD Testing */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced RCD Testing Procedures</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Type A RCD Testing Sequence</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Test Procedure</h5>
                        <ol className="text-sm space-y-1">
                          <li>1. Manual test button operation verification</li>
                          <li>2. Half-rated current test (15mA for 30mA RCD)</li>
                          <li>3. Full-rated current test (30mA)</li>
                          <li>4. Five times rated current test (150mA)</li>
                          <li>5. Test all phase combinations</li>
                          <li>6. Record all operating times</li>
                        </ol>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Pass Criteria</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Half-rated: Should NOT trip</li>
                          <li>• Full-rated: ≤300ms (general use)</li>
                          <li>• Full-rated: ≤40ms (socket outlets)</li>
                          <li>• 5× rated: ≤40ms (all applications)</li>
                          <li>• Manual test: Must operate correctly</li>
                          <li>• Reset: Must function properly</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Type B RCD Advanced Testing</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">AC Testing</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Standard Type A test sequence</li>
                          <li>• 50Hz sinusoidal test current</li>
                          <li>• All phase combinations</li>
                          <li>• Operating time verification</li>
                          <li>• Reset functionality check</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">DC Testing</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Smooth DC test current application</li>
                          <li>• 6mA DC threshold verification</li>
                          <li>• Positive and negative DC testing</li>
                          <li>• Time delay verification</li>
                          <li>• Saturation immunity testing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">High-Frequency AC</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 1kHz test frequency</li>
                          <li>• 30mA trip threshold</li>
                          <li>• Waveform distortion testing</li>
                          <li>• Response time verification</li>
                          <li>• Harmonic immunity testing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">EV-RCD Specific Testing</h4>
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-yellow-400 mb-2">Communication Testing</h5>
                          <ul className="text-sm space-y-1">
                            <li>• MODBUS communication protocol</li>
                            <li>• Status reporting functionality</li>
                            <li>• Remote trip and reset commands</li>
                            <li>• Diagnostic data transmission</li>
                            <li>• Event logging capabilities</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-yellow-400 mb-2">Self-Testing Functions</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Automatic periodic self-testing</li>
                            <li>• Component integrity verification</li>
                            <li>• Calibration drift detection</li>
                            <li>• Fault indication systems</li>
                            <li>• Maintenance scheduling alerts</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Fault Diagnosis */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Comprehensive Fault Diagnosis</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Common RCD Faults and Solutions</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2 text-yellow-400">Fault Symptom</th>
                            <th className="text-left py-2 text-yellow-400">Possible Cause</th>
                            <th className="text-left py-2 text-yellow-400">Solution</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">RCD won't trip at rated current</td>
                            <td className="py-2">Parallel earth paths, wiring error</td>
                            <td className="py-2">Check wiring, eliminate parallel paths</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Nuisance tripping</td>
                            <td className="py-2">High earth leakage, interference</td>
                            <td className="py-2">Measure leakage, check for EMI sources</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Slow operating time</td>
                            <td className="py-2">High fault impedance, worn contacts</td>
                            <td className="py-2">Check Zs values, replace if necessary</td>
                          </tr>
                          <tr>
                            <td className="py-2">Won't reset</td>
                            <td className="py-2">Persistent fault, mechanical failure</td>
                            <td className="py-2">Locate fault, check mechanism</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Advanced Diagnostic Techniques</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Earth Leakage Assessment</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Individual circuit leakage measurement</li>
                          <li>• Cumulative leakage calculation</li>
                          <li>• Load-dependent leakage analysis</li>
                          <li>• Frequency spectrum analysis</li>
                          <li>• Temperature coefficient assessment</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Performance Monitoring</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Trip time trend analysis</li>
                          <li>• Sensitivity drift monitoring</li>
                          <li>• Contact resistance measurement</li>
                          <li>• Insulation integrity checking</li>
                          <li>• Environmental impact assessment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule6Section4Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-6-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-6-section-5">
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

export default EVChargingModule6Section4;