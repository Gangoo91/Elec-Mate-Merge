import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Recording Inspection and Test Results
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the legal requirements and best practices for accurate documentation of electrical testing.
            </p>
          </header>

          {/* Quick Summary */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">In 30 Seconds</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Accurate recording of results is a legal requirement under BS 7671 and EAWR 1989.</li>
                  <li>Clear records prove the installation has been inspected, tested, and complies with safety standards.</li>
                  <li>Poor records can undermine certificate validity and expose you to safety risks and liability.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Spot it / Use it</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Incomplete forms, missing signatures, vague entries like "OK".</li>
                  <li><strong>Use:</strong> Official test sheets, numerical values, proper units and signatures.</li>
                  <li><strong>Check:</strong> Forms are complete, legible, and stored securely.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 list-disc pl-6">
              <li>Explain why recording test results is required.</li>
              <li>Identify the forms and documentation used.</li>
              <li>Accurately record polarity, continuity, insulation resistance, and earth fault loop impedance results.</li>
              <li>Understand the importance of keeping records for future maintenance.</li>
              <li>Apply best practice in presenting clear, professional documentation.</li>
            </ul>
          </section>

          {/* Why Records Matter */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Why Records Matter
            </h2>
            <p className="text-white/80 mb-4">
              Accurate record keeping serves multiple critical purposes in electrical work:
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="font-medium text-elec-yellow text-sm mb-2">Legal and Professional Requirements</p>
              <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                <li><strong>Provide legal proof of compliance</strong> with BS 7671 and statutory regulations</li>
                <li><strong>Show the system has been tested</strong> to BS 7671 Part 6 standards with specific test values</li>
                <li><strong>Protect the contractor</strong> in case of disputes, insurance claims, or liability issues</li>
                <li><strong>Assist future electricians</strong> in maintenance, upgrades, and fault-finding</li>
                <li><strong>Demonstrate professional competence</strong> and adherence to industry standards</li>
                <li><strong>Enable warranty claims</strong> and manufacturer support when issues arise</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Insurance implications</p>
                <p className="text-xs text-white/70">
                  Many insurance policies require evidence of proper installation and testing. Missing or inadequate records can void coverage.
                </p>
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-1">Regulatory enforcement</p>
                <p className="text-xs text-white/70">
                  Local authority building control and HSE inspectors routinely request test certificates. Inability to produce documentation can result in enforcement action.
                </p>
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

          {/* What Must Be Recorded */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What Must Be Recorded
            </h2>
            <p className="text-white/80 mb-4">
              BS 7671 requires specific test results to be documented with precise values and proper units:
            </p>

            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
              <p className="font-medium text-green-400 text-sm mb-2">Essential Test Results</p>
              <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                <li><strong>Continuity of protective conductors</strong> — resistance values in ohms (Ω), typically &lt;0.05Ω for final circuits</li>
                <li><strong>Insulation resistance results</strong> — minimum 1MΩ at 500V DC, recorded in megohms (MΩ)</li>
                <li><strong>Polarity confirmation</strong> — verification that line conductors connect only to line terminals</li>
                <li><strong>Earth fault loop impedance values</strong> — measured in ohms (Ω), must not exceed BS 7671 maximum values</li>
                <li><strong>RCD trip times</strong> — measured in milliseconds (ms), typically 10-40ms at rated current</li>
                <li><strong>Visual inspection findings</strong> — comprehensive checklist of installation aspects</li>
              </ul>
            </div>

            <div className="mt-4 p-3 rounded bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Additional measurements that may be required:</p>
              <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
                <li><strong>Phase sequence</strong> — for three-phase installations</li>
                <li><strong>Voltage measurements</strong> — supply voltage at origin and circuit extremities</li>
                <li><strong>Current measurements</strong> — load currents and earth leakage currents</li>
                <li><strong>Functional testing</strong> — operation of switches, isolators, and protective devices</li>
                <li><strong>Temperature rise</strong> — conductor and connection temperatures under load</li>
              </ul>
            </div>
          </section>

          <InlineCheck
            id="numerical-values-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Forms and Certificates */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Forms and Certificates
            </h2>
            <p className="text-white/80 mb-4">
              Different types of electrical work require specific documentation:
            </p>

            <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
              <p className="font-medium text-purple-400 text-sm mb-2">Official Documentation</p>
              <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                <li><strong>Electrical Installation Certificate (EIC)</strong> — for new installations, consumer unit replacements, and major alterations</li>
                <li><strong>Minor Electrical Installation Works Certificate (MEIWC)</strong> — for additions like socket outlets, lighting points, or single circuit additions</li>
                <li><strong>Electrical Installation Condition Report (EICR)</strong> — for periodic inspection and testing of existing installations</li>
                <li><strong>Schedule of Inspections and Test Results</strong> — detailed circuit-by-circuit test data</li>
                <li><strong>All must be signed</strong> by the responsible person with appropriate qualifications</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Certificate completion requirements:</p>
                <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
                  <li>Designer signature</li>
                  <li>Constructor signature</li>
                  <li>Inspector/tester signature</li>
                  <li>Date of inspection and testing</li>
                  <li>Next inspection due date</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-red-500/5 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Common errors to avoid:</p>
                <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
                  <li>Incomplete sections left blank</li>
                  <li>Missing signatures or dates</li>
                  <li>Incorrect supply characteristics</li>
                  <li>Test results in wrong units</li>
                </ul>
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

          {/* How to Record Correctly */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              How to Record Correctly
            </h2>
            <p className="text-white/80 mb-4">
              Professional recording requires attention to detail and proper procedures:
            </p>

            <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
              <p className="font-medium text-orange-400 text-sm mb-2">Best Practice Recording</p>
              <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                <li><strong>Use the correct test forms</strong> issued by the IET — ensure current edition</li>
                <li><strong>Enter results clearly</strong> in black ink or type — avoid pencil or erasable ink</li>
                <li><strong>Record correct units:</strong> resistance in ohms (Ω), insulation resistance in megohms (MΩ), time in ms</li>
                <li><strong>Avoid vague entries</strong> like "OK", "Pass", "Satisfactory" — numerical values are mandatory</li>
                <li><strong>Record separately</strong> for each circuit to enable precise fault location</li>
                <li><strong>Cross-reference circuit numbers</strong> with distribution board labelling</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded bg-white/5 border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Recording methodology:</p>
                <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
                  <li>Follow BS 7671 Part 6 test sequence</li>
                  <li>Verify instrument calibration dates</li>
                  <li>Ensure installation is isolated for dead tests</li>
                  <li>Take multiple readings where results are close to limits</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-blue-500/5 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-400 mb-2">Digital vs. handwritten:</p>
                <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
                  <li><strong>Digital:</strong> reduced errors, automatic calculations, data backup</li>
                  <li><strong>Handwritten:</strong> no battery dependency, immediate completion</li>
                  <li><strong>Hybrid:</strong> digital capture with printed copies for signatures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Regulatory Reference */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Regulatory Reference
            </h2>
            <p className="text-white/80 mb-4">
              Key regulations governing record keeping:
            </p>

            <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
              <p className="font-medium text-red-400 text-sm mb-2">Legal Framework</p>
              <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                <li><strong>BS 7671 Regulation 631.3</strong> — "The results of verification shall be recorded"</li>
                <li><strong>Electricity at Work Regulations 1989 Regulation 4(2)</strong> — Systems must be maintained to prevent danger</li>
                <li><strong>Building Regulations Part P</strong> — Notification and certification requirements for domestic work</li>
                <li><strong>Construction (Design and Management) Regulations</strong> — Handover information requirements</li>
              </ul>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Consequences of non-compliance:</p>
              <ul className="text-xs text-white/70 space-y-1 list-disc pl-4">
                <li><strong>Criminal prosecution</strong> under EAWR for unsafe systems</li>
                <li><strong>Professional sanctions</strong> from competent person scheme providers</li>
                <li><strong>Insurance claim rejection</strong> for inadequate documentation</li>
                <li><strong>Civil liability</strong> for damages resulting from electrical incidents</li>
                <li><strong>Trading standards action</strong> for fraudulent or misleading certificates</li>
              </ul>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-2">Pre-Testing Preparation</p>
                <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                  <li>Print sufficient test sheets and ensure they are the current IET edition</li>
                  <li>Verify test instrument calibration certificates are current</li>
                  <li>Pre-populate certificate headers with site address and installer details</li>
                  <li>Review installation drawings to ensure circuit identification matches</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <p className="font-medium text-green-400 text-sm mb-2">During Testing Best Practices</p>
                <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                  <li>Double-check units before recording: Ω, MΩ, ms, V</li>
                  <li>Record ambient temperature for insulation resistance correction</li>
                  <li>Take photographs of critical readings as backup evidence</li>
                  <li>Investigate anomalous results immediately — don't leave until later</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <p className="font-medium text-blue-400 text-sm mb-2">Record Keeping and Storage</p>
                <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                  <li>Make multiple copies: original for client, copy for contractor, copy for competent person scheme</li>
                  <li>Use waterproof storage for physical documents, cloud backup for digital copies</li>
                  <li>Index certificates systematically by date, client name, and job reference</li>
                  <li>Scan handwritten certificates to create digital backup</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="font-medium text-red-400 text-sm mb-2">Common Pitfalls to Avoid</p>
                <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                  <li><strong>Never falsify results</strong> — if a test fails, investigate and rectify</li>
                  <li>Don't use old certificate forms — ensure current IET edition</li>
                  <li>Avoid generic results — each installation is unique</li>
                  <li>Never sign incomplete certificates — all sections must be completed or marked "N/A"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Examples
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="font-medium text-red-400 mb-2">Case Study 1: The "Satisfactory" Disaster</p>
                <p className="text-sm text-white/80 mb-2">
                  On a £50,000 commercial office fit-out, the contractor failed to record insulation resistance values and instead wrote "satisfactory" throughout. Six months later, a fault caused equipment damage and business interruption.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Consequences:</strong> £15,000 re-testing and rectification, insurance claim rejected, loss of future contracts worth £200,000+, professional sanctions from competent person scheme.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <p className="font-medium text-green-400 mb-2">Case Study 2: The Photography Success</p>
                <p className="text-sm text-white/80 mb-2">
                  An industrial contractor routinely photographed all test instrument displays during commissioning. When a dispute arose 18 months later, the photographs proved invaluable.
                </p>
                <p className="text-xs text-white/70">
                  <strong>Outcome:</strong> Client accepted responsibility for maintenance issues. Contractor's reputation protected and additional maintenance contract secured.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">Q: {faq.question}</p>
                  <p className="text-sm text-white/70"><strong>A:</strong> {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Pocket Guide – Recording Test Results
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Always use official test sheets (EIC, MEIWC).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Record numerical values, not "OK".</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Double-check units before entry.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Sign and date all certificates.</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Keep copies securely for future reference.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Photograph readings as backup.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Never falsify results — investigate anomalies.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Record per circuit, not just per installation.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Recap – What You've Learned
            </h2>
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <ul className="text-white/80 space-y-2 list-disc pl-6">
                <li>You now understand the importance of recording inspection and test results for compliance and liability protection.</li>
                <li>You can identify the required forms and certificates.</li>
                <li>You know which test values must be documented.</li>
                <li>You've learned best practice for accurate and professional record keeping.</li>
                <li>You are aware of the legal and regulatory requirements under BS 7671 and EAWR.</li>
              </ul>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-8">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Identifying Defects
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 6
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section6_6;
