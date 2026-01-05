import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Target, AlertTriangle, Zap, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import EVChargingModule6Section3Quiz from '@/components/upskilling/quiz/EVChargingModule6Section3Quiz';

const EVChargingModule6Section3 = () => {
  useEffect(() => {
    document.title = 'BS 7671 Part 722 Testing Procedures - EV Charging Module 6 Section 3';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master BS 7671 Part 722 testing procedures for EV charging installations. Learn testing requirements, verification methods, and compliance standards.');
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
            <CheckCircle className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            BS 7671 Part 722 Testing Procedures
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Comprehensive testing and verification procedures for EV charging installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">

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
                BS 7671 Part 722 provides specific requirements for electric vehicle charging installations, 
                including comprehensive testing procedures to ensure safety, compliance, and optimal performance. 
                This section covers the mandatory testing procedures that must be performed during installation, 
                commissioning, and periodic inspection of EV charging equipment.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Testing Fundamentals</h4>
                <ul className="text-sm space-y-1">
                  <li>• Initial verification and commissioning tests</li>
                  <li>• Continuity and insulation resistance testing</li>
                  <li>• Earth fault loop impedance verification</li>
                  <li>• RCD testing for all protection types</li>
                  <li>• Functional testing of safety systems</li>
                  <li>• Documentation and certification requirements</li>
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
                  "Understand BS 7671 Part 722 testing requirements and procedures",
                  "Perform initial verification and commissioning testing",
                  "Execute continuity and insulation resistance testing",
                  "Conduct earth fault loop impedance verification",
                  "Test protective device operation and RCD functionality", 
                  "Verify communication and control system operation",
                  "Complete certification documentation and test records",
                  "Understand periodic inspection and re-testing requirements"
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
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">BS 7671 Part 722 Testing Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Initial Verification Testing */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Initial Verification Testing</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Pre-Testing Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Verify all electrical connections are secure and properly terminated</li>
                      <li>• Ensure all protective devices are correctly rated and installed</li>
                      <li>• Confirm installation complies with manufacturer's specifications</li>
                      <li>• Check all equipment is correctly labelled and identified</li>
                      <li>• Complete visual inspection of all components</li>
                      <li>• Verify correct polarity of all connections</li>
                    </ul>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Continuity Testing Procedure</h4>
                    <ol className="text-sm space-y-1">
                      <li>1. Isolate the circuit completely from the supply</li>
                      <li>2. Connect test instrument between main earthing terminal and exposed conductive parts</li>
                      <li>3. Apply test current (typically 200mA) and measure resistance</li>
                      <li>4. Record readings for all protective conductor paths</li>
                      <li>5. Verify readings comply with BS 7671 requirements (typically ≤ 0.05Ω for socket outlets)</li>
                    </ol>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Insulation Resistance Testing</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Test Requirements</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Test voltage: 500V DC for circuits up to 500V</li>
                          <li>• Test voltage: 1000V DC for circuits 500V-1000V</li>
                          <li>• Minimum acceptable resistance: 1MΩ for new installations</li>
                          <li>• Apply test voltage for minimum 60 seconds</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Test Sequence</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Disconnect sensitive equipment before testing</li>
                          <li>• Test between live conductors and earth</li>
                          <li>• Test between live conductors (with neutrals connected)</li>
                          <li>• Record all readings on test certificate</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earth Fault Loop Impedance */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Earth Fault Loop Impedance Testing</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Maximum Zs Values for EV Charging</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2 text-yellow-400">Circuit Protection</th>
                            <th className="text-left py-2 text-yellow-400">Rating (A)</th>
                            <th className="text-left py-2 text-yellow-400">Max Zs (Ω)</th>
                            <th className="text-left py-2 text-yellow-400">Application</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Type B MCB</td>
                            <td className="py-2">32A</td>
                            <td className="py-2">1.44</td>
                            <td className="py-2">Single phase charging</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Type B MCB</td>
                            <td className="py-2">40A</td>
                            <td className="py-2">1.15</td>
                            <td className="py-2">Three phase charging</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Type C MCB</td>
                            <td className="py-2">32A</td>
                            <td className="py-2">0.72</td>
                            <td className="py-2">High inrush current</td>
                          </tr>
                          <tr>
                            <td className="py-2">RCBO Type A</td>
                            <td className="py-2">32A</td>
                            <td className="py-2">1.44</td>
                            <td className="py-2">Combined protection</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Test Method Selection</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">No-Trip Method</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Used when RCD protection is present</li>
                          <li>• Prevents nuisance tripping during testing</li>
                          <li>• Calculate Zs = Ze + (R1 + R2)</li>
                          <li>• Suitable for most EV charging circuits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Direct Method</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Direct measurement of fault loop</li>
                          <li>• May cause RCD to trip during test</li>
                          <li>• More accurate measurement method</li>
                          <li>• Requires temporary RCD isolation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Testing Procedures */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Testing Procedures</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Smart Charging System Testing</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Communication Testing</h5>
                        <ul className="text-sm space-y-1">
                          <li>• OCPP protocol verification</li>
                          <li>• Network connectivity testing</li>
                          <li>• Load balancing functionality</li>
                          <li>• Remote monitoring capabilities</li>
                          <li>• Firmware update procedures</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Environmental Testing</h5>
                        <ul className="text-sm space-y-1">
                          <li>• IP rating verification (outdoor units)</li>
                          <li>• Temperature cycling tests</li>
                          <li>• Vibration and shock testing</li>
                          <li>• EMC compliance verification</li>
                          <li>• Lightning protection testing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Safety System Verification</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Control Pilot (CP) Testing</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 12V state verification (standby mode)</li>
                          <li>• 9V state test (vehicle connected)</li>
                          <li>• 6V state confirmation (ready to charge)</li>
                          <li>• PWM duty cycle measurement for current limiting</li>
                          <li>• Error state testing (-12V, 0V conditions)</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Emergency Safety Systems</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Emergency stop button functionality</li>
                          <li>• Automatic isolation on fault detection</li>
                          <li>• Ground fault monitoring systems</li>
                          <li>• Arc fault detection testing</li>
                          <li>• Door lock and interlock mechanisms</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule6Section3Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-6-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-6-section-4">
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

export default EVChargingModule6Section3;