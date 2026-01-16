import { ArrowLeft, ArrowRight, FileText, AlertTriangle, CheckCircle, Award, Shield, Globe, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule1Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does ISO/IEC 17025 focus on?",
      options: [
        "Building construction only",
        "General requirements for the competence of testing and calibration laboratories",
        "Computer programming",
        "Food safety regulations"
      ],
      correct: 1,
      explanation: "ISO/IEC 17025 is the international standard that specifies the general requirements for the competence, impartiality and consistent operation of testing and calibration laboratories."
    },
    {
      id: 2,
      question: "Why is UKAS accreditation important in calibration?",
      options: [
        "It's not important",
        "It ensures calibration laboratories meet quality standards and provides traceability",
        "It's only for decoration",
        "It increases costs unnecessarily"
      ],
      correct: 1,
      explanation: "UKAS accreditation provides confidence that calibration laboratories operate competently and generate valid results with proper traceability to national standards."
    },
    {
      id: 3,
      question: "Name one reason standards are essential in instrumentation.",
      options: [
        "To make things more complicated",
        "To ensure accuracy, safety, and regulatory compliance",
        "To increase bureaucracy",
        "They serve no purpose"
      ],
      correct: 1,
      explanation: "Standards ensure instrumentation systems meet accuracy requirements, maintain safety levels, enable interoperability, and support regulatory compliance across industries."
    },
    {
      id: 4,
      question: "How do standards support legal compliance?",
      options: [
        "They don't affect legal compliance",
        "By providing accepted benchmarks for demonstrating due diligence and regulatory conformity",
        "Only through increasing costs",
        "By making systems more complex"
      ],
      correct: 1,
      explanation: "Standards provide recognised benchmarks that regulators and courts use to assess whether organisations have met their legal obligations for safety and quality."
    },
    {
      id: 5,
      question: "What industry might be required to follow ISO standards strictly?",
      options: [
        "Entertainment industry only",
        "Pharmaceutical manufacturing",
        "Fashion industry only",
        "Sports equipment only"
      ],
      correct: 1,
      explanation: "Pharmaceutical manufacturing requires strict adherence to ISO standards (including ISO/IEC 17025) to ensure product safety, efficacy, and regulatory approval from authorities like MHRA."
  }  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div>
        <Link to="../instrumentation-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Key Industry Standards
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  BS EN, UKAS, ISO/IEC 17025 and their importance in instrumentation
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Industry standards form the backbone of instrumentation practice, ensuring consistency, accuracy, and safety across all applications. From calibration laboratories to manufacturing facilities, these standards provide the framework for quality assurance, regulatory compliance, and professional competence.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300">
                  Understanding and implementing key industry standards is not optional in professional instrumentation practice — it's essential for legal compliance, safety, and business success.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify key instrumentation-related standards
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand their importance in calibration and compliance
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise the role of accreditation bodies
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Appreciate the impact on safety, performance, and audits
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* BS EN Standards */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-6 w-6 text-yellow-400" />
                BS EN Standards: European Norms for Electrical Instrumentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                BS EN standards represent European norms (EN) adopted as British Standards (BS). These harmonised standards ensure consistency across European markets and provide technical specifications for instrumentation design, installation, and operation.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Key BS EN Standards for Instrumentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">Safety & EMC Standards</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>BS EN 61010:</strong> Safety requirements for electrical equipment for measurement, control, and laboratory use</li>
                        <li>• <strong>BS EN 61326:</strong> EMC requirements for electrical equipment for measurement, control and laboratory use</li>
                        <li>• <strong>BS EN 50581:</strong> Technical documentation for the assessment of electrical products with respect to RoHS</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Performance Standards</h5>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>BS EN 60751:</strong> Industrial platinum resistance thermometers and platinum temperature sensors</li>
                        <li>• <strong>BS EN 62058:</strong> Electricity metering equipment (AC) - General requirements, tests and test conditions</li>
                        <li>• <strong>BS EN 61298:</strong> Process measurement and control devices - General methods and procedures for evaluating performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Functional Safety Standards</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>BS EN 61508:</strong> Functional safety of electrical/electronic/programmable electronic safety-related systems</li>
                      <li>• <strong>BS EN 61511:</strong> Functional safety - Safety instrumented systems for the process industry sector</li>
                      <li>• <strong>BS EN 62061:</strong> Safety of machinery - Functional safety of safety-related electrical, electronic and programmable electronic control systems</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Communication & Interoperability</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>BS EN 50325:</strong> Industrial communications subsystem based on ISO 11898 (CAN) for controller-device interfaces</li>
                      <li>• <strong>BS EN 61158:</strong> Industrial communication networks - Fieldbus specifications</li>
                      <li>• <strong>BS EN 62541:</strong> OPC unified architecture specifications</li>
                    </ul>
                  </div>
                </div>

                <Alert className="bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Brexit Impact:</strong> Despite leaving the EU, the UK continues to recognise many BS EN standards as they remain technically valid and support international trade compatibility.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* UKAS Accreditation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                UKAS: United Kingdom Accreditation Service
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                UKAS is the UK's National Accreditation Body, ensuring that calibration and testing laboratories meet internationally recognised quality standards. UKAS accreditation provides confidence in measurement results and is often mandatory for regulated industries.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">UKAS Accreditation Services</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">Calibration (ISO/IEC 17025)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Electrical measurements (voltage, current, resistance)</li>
                        <li>• Temperature and humidity calibration</li>
                        <li>• Pressure and flow measurement standards</li>
                        <li>• Dimensional and mass calibration</li>
                        <li>• Time and frequency standards</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Testing (ISO/IEC 17025)</h5>
                      <ul className="text-sm space-y-1">
                        <li>• EMC testing and compliance</li>
                        <li>• Safety testing to relevant standards</li>
                        <li>• Environmental testing</li>
                        <li>• Product performance verification</li>
                        <li>• Type approval and certification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Benefits of UKAS Accreditation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Quality Assurance</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Competence demonstration</li>
                        <li>• Regular assessment and surveillance</li>
                        <li>• Continuous improvement requirements</li>
                        <li>• International recognition</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Traceability</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Links to national standards</li>
                        <li>• Measurement uncertainty quantification</li>
                        <li>• Documented calibration chain</li>
                        <li>• Legal metrology compliance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Market Access</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Regulatory acceptance</li>
                        <li>• Customer confidence</li>
                        <li>• International recognition</li>
                        <li>• Reduced audit requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">UKAS Assessment Process</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Initial application and documentation review</li>
                      <li>• On-site assessment by technical experts</li>
                      <li>• Competence demonstration through witness testing</li>
                      <li>• Annual surveillance visits</li>
                      <li>• Four-yearly re-assessment cycle</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Industries Requiring UKAS</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Pharmaceuticals (MHRA requirements)</li>
                      <li>• Automotive (IATF 16949)</li>
                      <li>• Aerospace (AS9100)</li>
                      <li>• Medical devices (ISO 13485)</li>
                      <li>• Nuclear industry (safety-critical measurements)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ISO/IEC 17025 */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                ISO/IEC 17025: Standard for Testing and Calibration Laboratories
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                ISO/IEC 17025 is the international standard that specifies the general requirements for the competence, impartiality and consistent operation of testing and calibration laboratories. It is the foundation standard for all laboratory accreditation worldwide.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">ISO/IEC 17025:2017 Structure</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">General Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Impartiality and confidentiality</li>
                        <li>• Organisational structure and responsibility</li>
                        <li>• Risk-based thinking approach</li>
                        <li>• Customer focus and service quality</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Structural Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Legal entity and responsibility</li>
                        <li>• Laboratory management requirements</li>
                        <li>• Organisational structure definition</li>
                        <li>• Authority and responsibility allocation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Resource Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Personnel</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Competence requirements</li>
                        <li>• Training and development</li>
                        <li>• Competence records</li>
                        <li>• Authorisation processes</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Facilities</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Environmental conditions</li>
                        <li>• Laboratory design</li>
                        <li>• Access and security</li>
                        <li>• Housekeeping standards</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Equipment</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Equipment specifications</li>
                        <li>• Calibration requirements</li>
                        <li>• Maintenance programmes</li>
                        <li>• Equipment records</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Traceability</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Metrological traceability</li>
                        <li>• Calibration certificates</li>
                        <li>• Reference standards</li>
                        <li>• Uncertainty evaluation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Process Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">Pre-Examination/Testing</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Review of requests and contracts</li>
                        <li>• Method selection and validation</li>
                        <li>• Sampling procedures</li>
                        <li>• Item handling and storage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Examination/Testing</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Technical procedure implementation</li>
                        <li>• Data recording and calculation</li>
                        <li>• Uncertainty evaluation</li>
                        <li>• Quality control monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Alert className="bg-yellow-400/10 border-blue-600/30">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>2017 Revision:</strong> The current version emphasises risk-based thinking, customer focus, and flexibility in quality management system implementation while maintaining technical rigour.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Why Standards Matter */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Why Standards Matter: Traceability, Repeatability, Legal Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Standards provide the framework for consistent, reliable, and legally defensible instrumentation practices. They ensure measurements are accurate, comparable, and traceable while supporting safety, quality, and regulatory compliance across all industries.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Core Benefits of Standards Compliance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">Traceability</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Unbroken chain to national standards</li>
                        <li>• Documented measurement uncertainty</li>
                        <li>• International recognition and acceptance</li>
                        <li>• Legal validity of measurements</li>
                        <li>• Audit trail for quality systems</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Repeatability</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Consistent measurement procedures</li>
                        <li>• Standardised calibration intervals</li>
                        <li>• Uniform competence requirements</li>
                        <li>• Reproducible test conditions</li>
                        <li>• Quality assurance protocols</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Legal Compliance</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Regulatory requirement satisfaction</li>
                        <li>• Due diligence demonstration</li>
                        <li>• Professional liability protection</li>
                        <li>• Insurance coverage maintenance</li>
                        <li>• Court-admissible evidence</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Impact on Safety</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Consistent safety system performance</li>
                      <li>• Reliable alarm and trip functions</li>
                      <li>• Predictable equipment behaviour</li>
                      <li>• Standardised maintenance procedures</li>
                      <li>• Clear responsibility definitions</li>
                      <li>• Emergency response protocols</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Impact on Performance</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Optimised process efficiency</li>
                      <li>• Reduced measurement uncertainty</li>
                      <li>• Improved product quality</li>
                      <li>• Enhanced system reliability</li>
                      <li>• Lower maintenance costs</li>
                      <li>• Extended equipment life</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-6 w-6 text-yellow-400" />
                Standards in Regulated Industries
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Different industries have varying requirements for standards compliance, with heavily regulated sectors requiring strict adherence to multiple standards frameworks. Understanding these requirements is crucial for professional practice.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Industry-Specific Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="bg-card p-3 rounded">
                        <h5 className="text-white font-medium mb-1">Pharmaceutical Industry</h5>
                        <ul className="text-xs space-y-1">
                          <li>• ISO/IEC 17025 for analytical laboratories</li>
                          <li>• MHRA GMP compliance requirements</li>
                          <li>• 21 CFR Part 11 for electronic records</li>
                          <li>• Validation of computerised systems</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card p-3 rounded">
                        <h5 className="text-white font-medium mb-1">Nuclear Industry</h5>
                        <ul className="text-xs space-y-1">
                          <li>• Nuclear safety standards (IEC 61513)</li>
                          <li>• Radiation monitoring requirements</li>
                          <li>• Safety-critical system qualification</li>
                          <li>• Seismic and environmental testing</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-card p-3 rounded">
                        <h5 className="text-white font-medium mb-1">Automotive Industry</h5>
                        <ul className="text-xs space-y-1">
                          <li>• IATF 16949 quality management</li>
                          <li>• Measurement system analysis (MSA)</li>
                          <li>• Production part approval process (PPAP)</li>
                          <li>• Statistical process control (SPC)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-card p-3 rounded">
                        <h5 className="text-white font-medium mb-1">Food & Beverage</h5>
                        <ul className="text-xs space-y-1">
                          <li>• HACCP critical control point monitoring</li>
                          <li>• Temperature and humidity validation</li>
                          <li>• Sanitary design requirements</li>
                          <li>• Traceability for food safety</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="bg-orange-600/10 border-orange-600/30">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Compliance Costs:</strong> While standards compliance requires investment in training, equipment, and procedures, the cost of non-compliance (regulatory action, product recalls, legal liability) is typically far greater.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Pharmaceutical Manufacturing Compliance</h4>
                <p className="text-sm leading-relaxed mb-4">
                  A pharmaceutical company must follow ISO/IEC 17025 standards for laboratory instrumentation to pass MHRA (Medicines and Healthcare products Regulatory Agency) audits for drug manufacturing compliance:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium">Calibration Laboratory Accreditation</h5>
                      <p className="text-xs">Internal calibration lab achieves UKAS accreditation to ISO/IEC 17025 for temperature, pressure, and analytical measurements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium">Traceability Requirements</h5>
                      <p className="text-xs">All process instrumentation calibrated with certificates traceable to national standards, with documented uncertainty budgets</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium">Quality System Integration</h5>
                      <p className="text-xs">Calibration procedures integrated with GMP quality system, including risk assessments and validation protocols</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium">Regulatory Approval</h5>
                      <p className="text-xs">MHRA audit successfully completed, with product license approved based on demonstrated measurement capability and compliance</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Result:</strong> Product approved for market, regulatory compliance maintained, and patient safety assured through rigorous standards adherence
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Standards ensure consistency, accuracy, and safety across instrumentation practices, particularly in regulated industries. From BS EN harmonised standards to UKAS accreditation and ISO/IEC 17025 compliance, these frameworks provide the foundation for professional competence and legal compliance.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Standards Framework</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong className="text-white">BS EN Standards:</strong> Technical specifications and safety requirements for instrumentation
                  </div>
                  <div>
                    <strong className="text-white">UKAS Accreditation:</strong> Quality assurance and competence demonstration for laboratories
                  </div>
                  <div>
                    <strong className="text-white">ISO/IEC 17025:</strong> International benchmark for testing and calibration laboratory competence
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../instrumentation-module-1-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-1">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10 touch-manipulation active:scale-[0.98]">
                Complete Module 1
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule1Section4;