
import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, FileText, Shield, Scale, Eye, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InspectionTestingQuiz from '@/components/upskilling/InspectionTestingQuiz';

const Module1Section1 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 1 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            What Is Inspection & Testing?
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Fundamental definition and purpose of electrical inspection and testing in accordance with BS 7671
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Definition Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Definition of Inspection & Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Electrical inspection and testing is a systematic examination and verification process that ensures electrical installations comply with BS 7671 (IET Wiring Regulations) and are safe for continued use.
              </p>
              <p className="text-base leading-relaxed">
                This process combines visual examination of electrical installations with instrument-based testing to verify that installations meet the required safety standards and regulatory requirements.
              </p>
            </CardContent>
          </Card>

          {/* Purpose Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Purpose of Inspection & Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Safety Verification
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Ensure protection against electric shock</li>
                    <li>• Verify fire protection measures</li>
                    <li>• Confirm thermal protection</li>
                    <li>• Check overcurrent protection</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Compliance Verification
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• BS 7671 compliance</li>
                    <li>• Building Regulations Part P</li>
                    <li>• Statutory requirements</li>
                    <li>• Industry standards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Framework Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-yellow-400" />
                Legal Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Key Legislation</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Electricity at Work Regulations 1989:</strong> Places duty on employers to maintain electrical systems</li>
                    <li>• <strong className="text-white">Health and Safety at Work Act 1974:</strong> General duty of care for electrical safety</li>
                    <li>• <strong className="text-white">Building Regulations Part P:</strong> Electrical safety in dwellings</li>
                    <li>• <strong className="text-white">Management of Health and Safety at Work Regulations 1999:</strong> Risk assessment requirements</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Compliance Standards</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">BS 7671:</strong> IET Wiring Regulations (18th Edition)</li>
                    <li>• <strong className="text-white">IET Guidance Note 3:</strong> Inspection & Testing</li>
                    <li>• <strong className="text-white">BS 7909:</strong> Code of practice for temporary electrical systems</li>
                    <li>• <strong className="text-white">BS 6423:</strong> Code of practice for maintenance of electrical installations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of Inspections Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                Types of Inspections
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Initial Verification</h4>
                  <p className="text-sm">Carried out on new installations before first use to ensure compliance with BS 7671</p>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Periodic Inspection</h4>
                  <p className="text-sm">Regular inspections of existing installations to ensure continued safety and compliance</p>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Condition Reports</h4>
                  <p className="text-sm">Assessment of electrical installations for property transactions or insurance purposes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Components Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Key Components of Inspection & Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Visual Inspection</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Condition of equipment and accessories</li>
                    <li>• Correct identification and labelling</li>
                    <li>• Compliance with manufacturer's instructions</li>
                    <li>• Absence of damage or deterioration</li>
                    <li>• Adequacy of working space and accessibility</li>
                    <li>• Proper selection and erection of equipment</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Testing Procedures</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Continuity of protective conductors</li>
                    <li>• Continuity of ring final circuit conductors</li>
                    <li>• Insulation resistance measurements</li>
                    <li>• Protection by SELV, PELV or electrical separation</li>
                    <li>• Insulation of floors and walls</li>
                    <li>• Polarity verification</li>
                    <li>• Earth electrode resistance</li>
                    <li>• Earth fault loop impedance</li>
                    <li>• RCD operation and timing</li>
                    <li>• Phase sequence</li>
                    <li>• Functional testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competency Requirements Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-yellow-400" />
                Competency Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Only competent persons should carry out inspection and testing. Competency includes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Knowledge Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Understanding of BS 7671 requirements</li>
                    <li>• Knowledge of electrical principles</li>
                    <li>• Awareness of safety procedures</li>
                    <li>• Understanding of test equipment operation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Practical Skills</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Ability to use test instruments safely</li>
                    <li>• Experience in electrical installation work</li>
                    <li>• Capability to interpret test results</li>
                    <li>• Skills in completing certification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes Section */}
          <Card className="bg-card border-transparent border-l-4 border-l-yellow-400">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Competency Requirement:</strong> Inspection and testing must only be carried out by competent persons who possess the necessary knowledge, training, and experience to perform these activities safely and accurately.
                </p>
              </div>
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Legal Obligation:</strong> Regular inspection and testing is not just good practice—it's a legal requirement under various regulations including the Electricity at Work Regulations 1989.
                </p>
              </div>
              <div className="bg-red-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Safety First:</strong> All inspection and testing work must be carried out safely, with appropriate risk assessments and safety precautions in place.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: Legal Requirements</h4>
                  <p className="text-sm">Can you name the three main pieces of legislation that govern electrical safety in the workplace?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">1. Electricity at Work Regulations 1989, 2. Health and Safety at Work Act 1974, 3. Building Regulations Part P (for dwellings)</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Standards Knowledge</h4>
                  <p className="text-sm">What is the current edition of BS 7671 and when was it published?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">18th Edition, published in 2018 with Amendment 2 in 2022</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: Inspection Types</h4>
                  <p className="text-sm">What's the difference between Initial Verification and Periodic Inspection?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Initial Verification: New installations before first use. Periodic Inspection: Regular checks on existing installations for continued safety.</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Competency</h4>
                  <p className="text-sm">What three elements define competency for electrical work?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Knowledge, Training, and Experience (plus appropriate supervision where needed)</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Do I need formal qualifications to carry out inspection and testing?</h4>
                  <p className="text-sm text-white">A: Not necessarily. While qualifications are important, competency is based on knowledge, training, and experience. You must demonstrate competency for the specific work being undertaken. However, most employers and insurance companies prefer formal qualifications such as C&G 2391-52 or equivalent.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: How often should electrical installations be inspected?</h4>
                  <p className="text-sm text-white">A: This depends on the type of installation and use. Domestic properties typically require inspection every 10 years, commercial premises every 5 years, and industrial or high-risk environments may require annual inspections. Always check the EICR for specific recommendations.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What's the difference between an EIC and an EICR?</h4>
                  <p className="text-sm text-white">A: An Electrical Installation Certificate (EIC) is issued for new installations or major alterations following initial verification. An Electrical Installation Condition Report (EICR) is issued following periodic inspection of existing installations.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I inspect and test my own work?</h4>
                  <p className="text-sm text-white">A: Generally no, for quality assurance reasons. BS 7671 recommends that inspection and testing should be carried out by a person other than the one who designed or installed the work, where practicable. This ensures independence and objectivity.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What equipment do I need for basic inspection and testing?</h4>
                  <p className="text-sm text-white">A: Essential equipment includes: Low resistance ohmmeter, Insulation resistance tester, Earth fault loop impedance tester, RCD tester, Phase rotation indicator, Voltage indicator, Test leads and probes. All equipment must be regularly calibrated and in good condition.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: What should I do if I find a dangerous defect during inspection?</h4>
                  <p className="text-sm text-white">A: Immediately isolate the dangerous circuit/equipment if safe to do so, notify the responsible person, issue appropriate warnings, and complete the necessary documentation. The defect must be rectified before the installation can be put back into service.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-yellow-400/10 border-blue-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/20 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Scenario: Commercial Kitchen Inspection</h4>
                <p className="text-sm mb-3">
                  You've been asked to carry out a periodic inspection on a busy commercial kitchen that hasn't been inspected for 7 years. The kitchen operates 16 hours daily and has high humidity and temperature conditions.
                </p>
                <h5 className="text-white font-semibold mb-2">Key Considerations:</h5>
                <ul className="text-sm space-y-1">
                  <li>• High risk environment requiring more frequent inspection</li>
                  <li>• Equipment likely subject to enhanced wear and tear</li>
                  <li>• IP ratings crucial due to moisture and cleaning</li>
                  <li>• Emergency lighting and fire alarm integration</li>
                  <li>• Coordination with business operations for minimal disruption</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-600/20 rounded">
                  <p className="text-xs"><strong>Learning Point:</strong> This scenario demonstrates why different environments require different inspection frequencies and approaches. The 7-year gap is too long for this high-risk environment.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-6">
                Complete this comprehensive quiz to test your understanding of inspection and testing fundamentals. The quiz now contains 10 questions covering all key areas.
              </p>
              <InspectionTestingQuiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module1Section1;
