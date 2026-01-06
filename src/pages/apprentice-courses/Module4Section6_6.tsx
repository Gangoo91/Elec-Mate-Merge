import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, ClipboardList, Shield, Book, Settings, Save, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Recording Inspection and Test Results - Module 4.6.6 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the legal requirements and best practices for recording inspection and test results. Master documentation standards for BS 7671 compliance and professional record keeping.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Which regulation requires test results to be recorded?",
    options: ["BS 7671 Regulation 521.5", "BS 7671 Regulation 631.3", "BS 7671 Regulation 411.4", "BS 7671 Regulation 110.1"],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 631.3 specifically requires test results to be recorded as part of the verification process to demonstrate compliance with the standard."
  },
  {
    id: 2,
    question: "Why should numerical values always be recorded instead of 'OK'?",
    options: ["It looks more professional", "Numerical values provide specific evidence of compliance and allow future comparison", "It's easier to read", "Clients prefer numbers"],
    correctIndex: 1,
    explanation: "Numerical values provide specific evidence that the installation meets requirements and allow future electricians to compare readings during maintenance or fault-finding."
  },
  {
    id: 3,
    question: "Name two documents used to record inspection and test results.",
    options: ["Invoice and Receipt", "Electrical Installation Certificate (EIC) and Minor Electrical Installation Works Certificate (MEIWC)", "Building Regulations and Part P", "Safety Certificate and Warranty"],
    correctIndex: 1,
    explanation: "The EIC is used for new installations and major alterations, while the MEIWC is used for minor works such as adding sockets to existing circuits."
  }
];

const Module4Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which BS 7671 regulation specifically requires test results to be recorded?",
      options: [
        "521.5",
        "631.3",
        "411.4",
        "110.1"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Regulation 631.3 specifically requires that the results of verification, including inspection and testing, shall be recorded."
    },
    {
      id: 2,
      question: "True or False: Writing 'OK' on a test certificate is acceptable if the reading looks fine.",
      options: [
        "True",
        "False",
        "Only for minor works",
        "Only if the client agrees"
      ],
      correctAnswer: 1,
      explanation: "False - numerical values must always be recorded to provide specific evidence of compliance and to allow future comparison during maintenance."
    },
    {
      id: 3,
      question: "Name two items that must be recorded during electrical testing.",
      options: [
        "Weather conditions and time of day",
        "Insulation resistance and earth fault loop impedance",
        "Client preferences and cost",
        "Tool serial numbers and battery levels"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance and earth fault loop impedance are critical safety measurements that must be recorded to demonstrate compliance with BS 7671."
    },
    {
      id: 4,
      question: "What does EIC stand for?",
      options: [
        "Electrical Inspection Certificate",
        "Electrical Installation Certificate",
        "Electrical Information Card",
        "Electrical Installation Checklist"
      ],
      correctAnswer: 1,
      explanation: "EIC stands for Electrical Installation Certificate, which is used to certify new electrical installations and major alterations."
    },
    {
      id: 5,
      question: "Which regulation requires employers to maintain safe systems of work?",
      options: [
        "BS 7671",
        "Electricity at Work Regulations 1989",
        "Part P Building Regulations",
        "BS EN 61439"
      ],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 place a statutory duty on employers to maintain electrical systems in a safe condition and keep appropriate records."
    },
    {
      id: 6,
      question: "Why should each circuit be recorded separately?",
      options: [
        "To increase paperwork",
        "To provide detailed evidence of compliance and fault-tracing",
        "To satisfy the client",
        "To justify higher charges"
      ],
      correctAnswer: 1,
      explanation: "Recording each circuit separately provides detailed evidence of individual circuit compliance and enables precise fault location during future maintenance."
    },
    {
      id: 7,
      question: "What unit is insulation resistance measured in?",
      options: [
        "Ohms (Ω)",
        "Megohms (MΩ)",
        "Volts (V)",
        "Amps (A)"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance is measured in megohms (MΩ) because the resistance values are typically very high, often in the millions of ohms."
    },
    {
      id: 8,
      question: "Give one reason why photographs of test meters should be taken.",
      options: [
        "For social media posting",
        "For backup evidence in case results are disputed",
        "To show off expensive equipment",
        "To fill up the phone storage"
      ],
      correctAnswer: 1,
      explanation: "Photographs provide backup evidence of actual meter readings, which can be crucial if test results are later questioned or disputed."
    },
    {
      id: 9,
      question: "Which certificate is used for small alterations, such as adding a socket to an existing circuit?",
      options: [
        "Electrical Installation Certificate (EIC)",
        "Minor Electrical Installation Works Certificate (MEIWC)",
        "Periodic Inspection Report (PIR)",
        "Electrical Safety Certificate (ESC)"
      ],
      correctAnswer: 1,
      explanation: "The Minor Electrical Installation Works Certificate (MEIWC) is specifically designed for small alterations and additions to existing circuits."
    },
    {
      id: 10,
      question: "True or False: Digital copies of test results are acceptable if they are secure and signed off.",
      options: [
        "False - only paper copies are valid",
        "True - digital copies are acceptable with proper security",
        "Only for commercial installations",
        "Only with client permission"
      ],
      correctAnswer: 1,
      explanation: "True - digital copies are acceptable provided they are secure, cannot be easily altered, and are properly signed off by the responsible person."
    }
  ];

  const faqs = [
    {
      question: "Do I need to keep records after handover?",
      answer: "Yes, installers should retain copies for at least the recommended retention period for liability protection and future reference. This provides protection against potential claims and assists with warranty issues."
    },
    {
      question: "Can results be recorded digitally?",
      answer: "Yes, provided they are secure, accurate, and signed off by the responsible person. Digital systems must have appropriate security measures to prevent unauthorised alteration of results."
    },
    {
      question: "What if a client requests only a 'visual check' and not full testing?",
      answer: "You must still complete appropriate documentation for the work done. Failing to record test results where testing was performed could leave you liable, regardless of client preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.6.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Recording Inspection and Test Results
          </h1>
          <p className="text-white">
            Master the legal requirements and best practices for accurate documentation of electrical testing.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accurate recording of inspection and test results is not just good practice — it is a legal and regulatory requirement under BS 7671 and the Electricity at Work Regulations 1989.</li>
                <li>Clear records prove that the installation has been inspected, tested, and complies with safety standards.</li>
                <li>Poor or incomplete records can undermine the validity of the installation certificate and expose both the installer and client to safety risks and liability.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Incomplete forms, missing signatures, vague entries like "OK".</li>
                <li><strong>Use:</strong> Official test sheets, numerical values, proper units and signatures.</li>
                <li><strong>Check:</strong> Forms are complete, legible, and stored securely.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain why recording test results is required.</li>
            <li>Identify the forms and documentation used.</li>
            <li>Accurately record polarity, continuity, insulation resistance, and earth fault loop impedance results.</li>
            <li>Understand the importance of keeping records for future maintenance.</li>
            <li>Apply best practice in presenting clear, professional documentation.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Why Records Matter */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Why Records Matter</h3>
            <p className="text-base text-white mb-4">
              Accurate record keeping serves multiple critical purposes in electrical work and forms the foundation of professional electrical practice:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Legal and Professional Requirements</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Provide legal proof of compliance</strong> with BS 7671 and statutory regulations - essential in legal proceedings</li>
                      <li><strong>Show the system has been tested</strong> to BS 7671 Part 6 standards with specific test values and dates</li>
                      <li><strong>Protect the contractor</strong> in case of disputes, insurance claims, or liability issues</li>
                      <li><strong>Assist future electricians</strong> in maintenance, upgrades, fault-finding, and periodic inspections</li>
                      <li><strong>Demonstrate professional competence</strong> and adherence to industry standards</li>
                      <li><strong>Enable warranty claims</strong> and manufacturer support when issues arise</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Insurance implications:</strong></p>
                      <p className="text-xs text-white">
                        Many insurance policies require evidence of proper installation and testing. Missing or inadequate records can void coverage, leaving both contractor and client exposed to significant financial liability in the event of electrical incidents.
                      </p>
                    </div>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Regulatory enforcement:</strong></p>
                      <p className="text-xs text-white">
                        Local authority building control and HSE inspectors routinely request test certificates. Inability to produce proper documentation can result in enforcement action, work stoppage, and potential prosecution under health and safety legislation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="recording-requirements-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* What Must Be Recorded */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. What Must Be Recorded</h3>
            <p className="text-base text-white mb-4">
              BS 7671 requires specific test results to be documented with precise values and proper units:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Essential Test Results</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Continuity of protective conductors</strong> - resistance values in ohms (Ω), typically &lt;0.05Ω for final circuits</li>
                      <li><strong>Insulation resistance results</strong> - minimum 1MΩ at 500V DC, recorded in megohms (MΩ)</li>
                      <li><strong>Polarity confirmation</strong> - verification that line conductors connect only to line terminals</li>
                      <li><strong>Earth fault loop impedance values</strong> - measured in ohms (Ω), must not exceed maximum values in BS 7671</li>
                      <li><strong>RCD trip times</strong> - measured in milliseconds (ms), typically 10-40ms at rated current</li>
                      <li><strong>Visual inspection findings</strong> - comprehensive checklist of installation aspects</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Additional measurements that may be required:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Phase sequence</strong> - for three-phase installations to ensure correct motor rotation</li>
                        <li><strong>Voltage measurements</strong> - supply voltage at origin and at extremities of circuits</li>
                        <li><strong>Current measurements</strong> - load currents and earth leakage currents</li>
                        <li><strong>Functional testing</strong> - operation of switches, isolators, and protective devices</li>
                        <li><strong>Temperature rise</strong> - measurement of conductor and connection temperatures under load</li>
                        <li><strong>Harmonic distortion levels</strong> - in installations with significant non-linear loads</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded border border-amber-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Recording environmental conditions:</strong></p>
                      <p className="text-xs text-white">
                        Temperature and humidity during testing can affect results, particularly insulation resistance. BS 7671 requires adjustment of results for temperature where specified, and environmental conditions should be noted when measurements are taken in extreme conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="numerical-values-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Forms and Certificates */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Forms and Certificates</h3>
            <p className="text-base text-white mb-4">
              Different types of electrical work require specific documentation with strict completion requirements:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Official Documentation</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Electrical Installation Certificate (EIC)</strong> - for new installations, consumer unit replacements, and major alterations affecting the main protective bonding</li>
                      <li><strong>Minor Electrical Installation Works Certificate (MEIWC)</strong> - for additions like socket outlets, lighting points, or single circuit additions</li>
                      <li><strong>Electrical Installation Condition Report (EICR)</strong> - for periodic inspection and testing of existing installations to assess their continued safety</li>
                      <li><strong>Schedule of Inspections and Test Results</strong> - detailed circuit-by-circuit test data accompanying certificates</li>
                      <li><strong>Schedule of Items Inspected</strong> - comprehensive checklist covering all aspects of visual inspection</li>
                      <li><strong>All must be signed</strong> by the responsible person with appropriate qualifications and Part P registration where applicable</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Certificate completion requirements:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Designer signature</strong> - person responsible for the design compliance</li>
                        <li><strong>Constructor signature</strong> - person responsible for construction compliance</li>
                        <li><strong>Inspector/tester signature</strong> - qualified person who conducted the verification</li>
                        <li><strong>Date of inspection and testing</strong> - when the verification was completed</li>
                        <li><strong>Next inspection due date</strong> - recommended date for next periodic inspection (typically 1-10 years depending on installation type)</li>
                        <li><strong>Supply characteristics</strong> - voltage, frequency, prospective short circuit current, earth fault loop impedance</li>
                        <li><strong>EICR coding system</strong> - C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), FI (further investigation required)</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-red-50/50 dark:bg-red-900/10 rounded border border-red-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Common completion errors to avoid:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li>Incomplete sections left blank instead of entering "N/A" where appropriate</li>
                        <li>Missing signatures or dates - all three designer/constructor/tester signatures required</li>
                        <li>Incorrect supply characteristics copied from previous jobs</li>
                        <li>Generic inspection schedules not tailored to the specific installation type</li>
                        <li>Test results in wrong units or incorrectly transcribed from instruments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documents-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* How to Record Correctly */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. How to Record Correctly</h3>
            <p className="text-base text-white mb-4">
              Professional recording requires attention to detail, proper procedures, and understanding of measurement significance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-1">Best Practice Recording</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Use the correct test forms</strong> issued by the IET (Institution of Engineering and Technology) - ensure current edition</li>
                      <li><strong>Enter results clearly</strong> in black ink or type - avoid pencil or erasable ink</li>
                      <li><strong>Record correct units:</strong> resistance in ohms (Ω), insulation resistance in megohms (MΩ), time in milliseconds (ms)</li>
                      <li><strong>Avoid vague entries</strong> like "OK", "Pass", "Satisfactory" — specific numerical values are mandatory</li>
                      <li><strong>Record separately</strong> for each circuit to enable precise fault location and future reference</li>
                      <li><strong>Cross-reference circuit numbers</strong> with distribution board labelling and as-installed drawings</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Recording methodology:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Test sequence</strong> - follow BS 7671 Part 6 test sequence to ensure accurate results</li>
                        <li><strong>Instrument calibration</strong> - verify test instruments are within calibration date</li>
                        <li><strong>Test conditions</strong> - ensure installation is de-energised and isolated for dead tests</li>
                        <li><strong>Measurement accuracy</strong> - record to appropriate number of significant figures based on instrument precision</li>
                        <li><strong>Repeat measurements</strong> - take multiple readings where results are close to limit values</li>
                        <li><strong>Temperature correction</strong> - apply temperature correction factors where specified in BS 7671</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-elec-yellow/5/50 dark:bg-blue-900/10 rounded border border-blue-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Digital vs. handwritten records:</strong></p>
                      <p className="text-xs text-white mb-2">
                        Digital test instruments with data logging capability can improve accuracy and reduce transcription errors. However, handwritten records remain valid provided they are clear, permanent, and properly signed.
                      </p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Digital advantages:</strong> reduced errors, automatic calculations, data backup, professional presentation</li>
                        <li><strong>Handwritten advantages:</strong> no battery dependency, immediate completion, familiar to all contractors</li>
                        <li><strong>Hybrid approach:</strong> digital capture with printed hard copies for signatures and client handover</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Regulatory Reference */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">5. Regulatory Reference</h3>
            <p className="text-base text-white mb-4">
              Key regulations governing record keeping with specific obligations and penalties:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-1">Legal Framework</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li><strong>BS 7671 Regulation 631.3</strong> – "The results of verification shall be recorded" - makes recording mandatory, not optional</li>
                      <li><strong>Electricity at Work Regulations 1989 Regulation 4(2)</strong> – Systems must be maintained to prevent danger</li>
                      <li><strong>Building Regulations Part P</strong> – Notification and certification requirements for domestic electrical work</li>
                      <li><strong>Construction (Design and Management) Regulations</strong> – Handover information requirements</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-[#121212]/50 rounded border">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Specific regulatory obligations:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Record retention periods:</strong> No statutory minimum, but professional indemnity insurance typically requires 6-15 years</li>
                        <li><strong>Competent person schemes:</strong> NICEIC, NAPIT, ECA, Certsure require compliant documentation for membership</li>
                        <li><strong>Local authority requirements:</strong> Building control may request certificates at any time during construction</li>
                        <li><strong>Insurance requirements:</strong> Public liability and professional indemnity policies often specify documentation standards</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 p-3 bg-red-50/50 dark:bg-red-900/10 rounded border border-red-200/30">
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Consequences of non-compliance:</strong></p>
                      <ul className="text-xs text-white list-disc ml-4 space-y-1">
                        <li><strong>Criminal prosecution</strong> under EAWR for unsafe systems</li>
                        <li><strong>Professional sanctions</strong> from competent person scheme providers</li>
                        <li><strong>Insurance claim rejection</strong> for inadequate documentation</li>
                        <li><strong>Civil liability</strong> for damages resulting from electrical incidents</li>
                        <li><strong>Trading standards action</strong> for fraudulent or misleading certificates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Practical Guidance
          </h2>
          <div className="space-y-6">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-medium text-white mb-3">Pre-Testing Preparation</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-6">
                <li><strong>Prepare documentation in advance:</strong> Print sufficient test sheets and ensure they are the current IET edition</li>
                <li><strong>Check test instrument calibration:</strong> Verify calibration certificates are current (typically annual calibration required)</li>
                <li><strong>Prepare site identification:</strong> Pre-populate certificate headers with site address, installer details, and date</li>
                <li><strong>Review installation drawings:</strong> Ensure circuit identification matches as-installed configuration</li>
                <li><strong>Coordinate with other trades:</strong> Ensure installation is complete and ready for testing</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <h3 className="font-medium text-white mb-3">During Testing Best Practices</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-6">
                <li><strong>Double-check units before recording:</strong> Ω for resistance, MΩ for insulation resistance, ms for time, V for voltage</li>
                <li><strong>Record ambient temperature:</strong> Required for insulation resistance correction and useful for future reference</li>
                <li><strong>Take photographs of critical readings:</strong> Particularly for borderline results or unusual measurements</li>
                <li><strong>Investigate anomalous results immediately:</strong> Don't leave fault-finding until later - conditions may change</li>
                <li><strong>Use consistent decimal places:</strong> Match instrument precision but avoid false accuracy</li>
                <li><strong>Mark circuits clearly:</strong> Use circuit labels that match final labelling of distribution boards</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-elec-yellow/5/50 dark:bg-blue-900/10 border border-blue-200/30">
              <h3 className="font-medium text-white mb-3">Record Keeping and Storage</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-6">
                <li><strong>Make multiple copies immediately:</strong> Original for client, copy for contractor, copy for competent person scheme</li>
                <li><strong>Use waterproof storage:</strong> Physical documents in sealed filing systems, digital copies with cloud backup</li>
                <li><strong>Index certificates systematically:</strong> By date, client name, and job reference for easy retrieval</li>
                <li><strong>Scan handwritten certificates:</strong> Create digital backup even for handwritten originals</li>
                <li><strong>Link to job documentation:</strong> Store with quotations, variations, and correspondence for complete project record</li>
                <li><strong>Regular backup verification:</strong> Test digital storage systems and verify document legibility</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/30">
              <h3 className="font-medium text-white mb-3">Quality Assurance Checks</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-6">
                <li><strong>Peer review critical installations:</strong> Have another qualified person check certificates for major projects</li>
                <li><strong>Use calculation checks:</strong> Verify R1+R2 values against individual measurements where possible</li>
                <li><strong>Compare similar circuits:</strong> Similar circuits should show similar test results - investigate significant variations</li>
                <li><strong>Check arithmetic:</strong> Ensure all calculations and derived values are correct</li>
                <li><strong>Verify signatures and dates:</strong> All required signature boxes completed with correct qualifications noted</li>
                <li><strong>Review before handover:</strong> Final check of all documentation completeness before client presentation</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-200/30">
              <h3 className="font-medium text-white mb-3">Common Pitfalls to Avoid</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-6">
                <li><strong>Never falsify results:</strong> If a test fails, investigate and rectify - falsification is fraud and extremely dangerous</li>
                <li><strong>Don't use old certificate forms:</strong> Regulations evolve - ensure you're using current edition IET forms</li>
                <li><strong>Avoid generic results:</strong> Each installation is unique - don't copy results from previous jobs</li>
                <li><strong>Don't ignore instrument warnings:</strong> Error messages, low battery indicators, or out-of-range readings require attention</li>
                <li><strong>Never sign incomplete certificates:</strong> All sections must be completed or marked "N/A" as appropriate</li>
                <li><strong>Don't test in unsuitable conditions:</strong> Wet weather can affect insulation resistance results significantly</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Real-World Examples
          </h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-4 bg-red-50/50 dark:bg-red-900/10 border border-red-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 1: The "Satisfactory" Disaster</h3>
              <p className="text-base text-white mb-3">
                On a £50,000 commercial office fit-out, the contractor failed to record insulation resistance values and instead wrote "satisfactory" throughout the test schedule. Six months later, a fault developed causing equipment damage and business interruption.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The problem:</strong> When insurance investigators requested evidence of proper installation, no numerical test results existed. The fault was traced to moisture ingress that should have been detected during initial testing.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The consequences:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>£15,000 re-testing and rectification at contractor's expense</li>
                <li>Insurance claim rejected due to inadequate installation evidence</li>
                <li>Loss of client relationship and future contracts worth £200,000+</li>
                <li>Professional sanctions from competent person scheme</li>
                <li>Potential legal action for professional negligence</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-elec-yellow/5/50 dark:bg-blue-900/10 border border-blue-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 2: The Missing Signature</h3>
              <p className="text-base text-white mb-3">
                A domestic solar installation was completed with comprehensive test results recorded, but the apprentice who conducted the testing forgot to get the supervising electrician to sign the certificate before the supervisor left for another job.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The discovery:</strong> Local authority building control spotted the missing qualified person signature during routine inspection three weeks later.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The resolution required:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>Complete system shutdown and re-testing by qualified person</li>
                <li>New certificate issued with proper signatures</li>
                <li>Building control re-inspection fee (£200)</li>
                <li>Client complaint to competent person scheme</li>
                <li>Improved supervision procedures implemented company-wide</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 3: The Photography Success</h3>
              <p className="text-base text-white mb-3">
                An industrial installation contractor routinely photographed all test instrument displays during commissioning. When a dispute arose over alleged poor workmanship, the photographs proved invaluable.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The situation:</strong> Client claimed installation was faulty based on problems occurring 18 months after commissioning. They requested re-testing and threatened legal action.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The evidence:</strong>
              </p>
              <ul className="text-xs text-white list-disc ml-6 space-y-1">
                <li>Photographs showed all test results were well within limits at commissioning</li>
                <li>Time-stamped images proved installation date and conditions</li>
                <li>Comparison with current readings identified gradual deterioration due to environmental factors</li>
                <li>Client accepted responsibility for maintenance issues</li>
                <li>Contractor's reputation protected and additional maintenance contract secured</li>
              </ul>
            </div>
            
            <div className="rounded-lg p-4 bg-purple-50/50 dark:bg-purple-900/10 border border-purple-200/30">
              <h3 className="font-medium text-white mb-2">Case Study 4: The Digital Documentation Advantage</h3>
              <p className="text-base text-white mb-3">
                A contractor using digital test equipment with cloud storage prevented a major dispute when original paper certificates were destroyed in an office flood.
              </p>
              <p className="text-xs sm:text-sm text-white mb-3">
                <strong>The benefit:</strong> All test data was automatically backed up and could be reproduced instantly, saving thousands in re-testing costs and maintaining client confidence during the insurance claim process.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-xs sm:text-sm text-white"><strong>A:</strong> {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Book className="w-5 h-5" />
            Pocket Guide – Recording Test Results
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Always use official test sheets (EIC, MEIWC).
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Record numerical values, not "OK".
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Double-check units before entry.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Sign and date all certificates.
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4 bg-green-50/50 dark:bg-green-900/10 border border-green-200/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Keep copies securely for future reference.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Photograph readings as backup.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Never falsify results — investigate anomalies.
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  Record per circuit, not just per installation.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Recap (What You've Learned)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>You now understand the importance of recording inspection and test results for compliance and liability protection.</li>
            <li>You can identify the required forms and certificates.</li>
            <li>You know which test values must be documented.</li>
            <li>You've learned best practice for accurate and professional record keeping.</li>
            <li>You are aware of the legal and regulatory requirements under BS 7671 and EAWR.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../6-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section6_6;