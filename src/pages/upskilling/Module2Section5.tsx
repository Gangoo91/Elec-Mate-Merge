
import { ArrowLeft, Wrench, Calendar, AlertTriangle, Shield, CheckCircle2, Clock, FileText, Book, Settings, Eye, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Module2Section5Quiz from '@/components/upskilling/Module2Section5Quiz';

const Module2Section5 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
              Module 2 • Section 5
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-white">
              Calibration & Maintenance
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Instrument Calibration & Maintenance
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-4xl">
            Calibration requirements, maintenance procedures and verification of test instrument accuracy
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Intro */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-elec-yellow" />
                Introduction to Instrument Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm leading-relaxed">
                Accurate readings mean nothing if your instrument is out of calibration. This comprehensive section covers how to maintain test equipment to ensure safety, compliance, and reliability in all electrical testing scenarios.
              </p>
              <p className="text-sm leading-relaxed">
                Understanding calibration requirements isn't just about ticking boxes—it's about ensuring every measurement you take can be trusted, whether you're conducting a routine inspection or defending your work in court.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm font-medium text-elec-yellow">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Understand the critical importance of instrument calibration for safety and legal compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Identify appropriate calibration intervals and maintenance schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Implement routine maintenance and storage best practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Recognise signs of faulty or compromised test equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Maintain proper documentation and traceability records</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Main Content Sections */}
          <div className="space-y-6">
            
            {/* Understanding Calibration */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Book className="h-5 w-5 text-elec-yellow" />
                  Understanding Calibration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Calibration is the process of checking and adjusting your instrument against a known reference standard to ensure accuracy within acceptable tolerances set by BS7671 and BS EN 61557.
                </p>
                <p className="text-sm leading-relaxed">
                  It's not simply about pressing a 'self-test' button—true calibration involves comparing your instrument's readings against certified reference standards that are traceable to national standards. This creates a chain of measurement traceability that ensures your readings are accurate and legally defensible.
                </p>
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Key Point:</p>
                  <p className="text-sm">
                    Calibration differs from verification. Verification checks if the instrument meets specifications, whilst calibration may involve adjustment to bring the instrument within tolerance.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Legal and Professional Requirements */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  Legal and Professional Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  The requirement for calibrated test equipment isn't just good practice—it's a legal and professional obligation with serious consequences if ignored.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Legal Implications</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Courts may dismiss uncalibrated evidence</li>
                      <li>• Insurance claims may be invalidated</li>
                      <li>• Personal liability in case of accidents</li>
                      <li>• Prosecution under EAWR 2005</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Professional Consequences</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Loss of scheme membership (NICEIC/NAPIT)</li>
                      <li>• Invalidated certificates and reports</li>
                      <li>• Damage to professional reputation</li>
                      <li>• Potential regulatory action</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calibration Standards and Traceability */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  Calibration Standards and Traceability
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Proper calibration requires traceability to national standards through an unbroken chain of comparisons. This ensures that your instrument's readings can be trusted and verified independently.
                </p>
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Traceability Chain</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-elec-yellow">1.</span>
                      <span>National Primary Standards (NPL - National Physical Laboratory)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-elec-yellow">2.</span>
                      <span>Secondary Standards (UKAS accredited laboratories)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-elec-yellow">3.</span>
                      <span>Working Standards (Calibration service providers)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-elec-yellow">4.</span>
                      <span>Your Test Instruments</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  Always ensure your calibration certificate shows UKAS accreditation or equivalent. This provides confidence that the calibration meets international standards and will be accepted by courts and regulatory bodies.
                </p>
              </CardContent>
            </Card>

            {/* Calibration Intervals and Scheduling */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-elec-yellow" />
                  Calibration Intervals and Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Determining the correct calibration interval balances cost, risk, and reliability. Whilst 12 months is standard, several factors may require more frequent calibration.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Standard Intervals</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Multifunction testers: 12 months</li>
                      <li>• RCD testers: 12 months</li>
                      <li>• Insulation testers: 12 months</li>
                      <li>• Earth loop impedance testers: 12 months</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Factors Affecting Frequency</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Frequency of use</li>
                      <li>• Working environment conditions</li>
                      <li>• Criticality of measurements</li>
                      <li>• Historical drift patterns</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-300 mb-2">💡 Professional Tip:</p>
                  <p className="text-sm">
                    Some contractors calibrate high-use instruments every 6 months to reduce the risk of out-of-tolerance periods and maintain client confidence.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Equipment Maintenance Procedures */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-elec-yellow" />
                  Equipment Maintenance Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Regular maintenance extends instrument life, maintains accuracy between calibrations, and helps identify potential problems before they affect your work.
                </p>
                <div className="space-y-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-3">Daily Checks</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Visual inspection of case and display</li>
                      <li>• Test lead continuity and condition</li>
                      <li>• Battery level and charging status</li>
                      <li>• Self-test function verification</li>
                      <li>• Proving unit check (where applicable)</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-3">Weekly Maintenance</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Clean instrument case and display</li>
                      <li>• Check all function buttons and switches</li>
                      <li>• Inspect probe tips and shrouds</li>
                      <li>• Review and update usage log</li>
                      <li>• Charge batteries fully</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-3">Monthly Reviews</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Calibration certificate validity check</li>
                      <li>• Test lead insulation resistance check</li>
                      <li>• Storage case condition assessment</li>
                      <li>• Backup of stored test results</li>
                      <li>• Software/firmware update check</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recognising Equipment Problems */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-elec-yellow" />
                  Recognising Equipment Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Early identification of instrument problems prevents inaccurate readings and potential safety hazards. Regular monitoring helps maintain measurement integrity.
                </p>
                <div className="space-y-4">
                  <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
                    <h4 className="text-red-300 font-medium mb-3">⚠️ Immediate Action Required</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Inconsistent readings on known circuits</li>
                      <li>• Failed self-test or proving unit verification</li>
                      <li>• Cracked or damaged test leads</li>
                      <li>• Display anomalies or missing segments</li>
                      <li>• Broken seals or tamper evidence</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                    <h4 className="text-orange-300 font-medium mb-3">⚠️ Monitor Closely</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Slow or erratic measurement response</li>
                      <li>• Unusual battery drain patterns</li>
                      <li>• Intermittent connection issues</li>
                      <li>• Readings drift during extended use</li>
                      <li>• Physical damage to case or connectors</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Storage and Transportation */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  Storage and Transportation Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Proper storage and transportation protect your investment and maintain calibration accuracy between services.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Storage Environment</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Temperature: 0°C to 40°C</li>
                      <li>• Humidity: &lt;85% RH</li>
                      <li>• Dust-free environment</li>
                      <li>• Away from magnetic fields</li>
                      <li>• Secure, dry location</li>
                    </ul>
                  </div>
                  <div className="bg-transparent/80 p-4 rounded-lg">
                    <h4 className="text-elec-yellow font-medium mb-2">Transportation Guidelines</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Use padded carrying case</li>
                      <li>• Avoid extreme temperatures</li>
                      <li>• Prevent shock and vibration</li>
                      <li>• Keep test leads organised</li>
                      <li>• Include calibration certificates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentation and Record Keeping */}
            <Card className="bg-transparent border-transparent">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  Documentation and Record Keeping
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <p className="text-sm leading-relaxed">
                  Comprehensive documentation provides evidence of due diligence and supports the validity of your test results in legal or compliance situations.
                </p>
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Essential Records</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Calibration certificates with UKAS accreditation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Instrument serial numbers and asset registers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Maintenance logs and inspection records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Usage logs linking instruments to specific jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Remedial action records for any identified issues</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* On-the-Job Scenario */}
          <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Real-World Scenario: The Cost of Neglecting Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-transparent/80 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-300 mb-2">⚠️ Case Study:</p>
                <p className="text-sm leading-relaxed mb-3">
                  An electrical contractor performs periodic testing on a commercial installation using a tester that's six months overdue for calibration. The loop impedance readings appear normal, and certificates are issued. Three months later, a fault occurs causing a small fire. Investigation reveals the tester was reading 30% low, meaning actual fault levels were dangerously high.
                </p>
                <p className="text-sm font-medium text-red-300 mb-1">Consequences:</p>
                <ul className="text-sm space-y-1">
                  <li>• Insurance claim rejected due to invalid certificates</li>
                  <li>• NICEIC membership suspended pending investigation</li>
                  <li>• Legal action for negligence initiated</li>
                  <li>• All certificates issued with that instrument recalled</li>
                  <li>• Professional reputation severely damaged</li>
                </ul>
                <p className="text-sm font-medium text-green-300 mt-3">Prevention:</p>
                <p className="text-sm leading-relaxed">
                  Simple calendar reminders and a robust calibration management system would have prevented this expensive and dangerous situation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Calibration is a legal requirement, not just good practice—non-compliance has serious consequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>UKAS-accredited calibration provides traceability to national standards and legal defensibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Regular maintenance and monitoring helps identify problems before they compromise safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Proper documentation and record-keeping supports professional credibility and compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>Investment in quality calibration and maintenance protects both safety and business reputation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Module2Section5Quiz />
        </div>
      </main>
    </div>
  );
};

export default Module2Section5;
