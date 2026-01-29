import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Commissioning - HNC Module 5 Section 5.2";
const DESCRIPTION = "Master electrical commissioning procedures: BS 7671 verification requirements, initial verification testing, EIC/EICR certification, test sequences, energisation procedures and switchgear commissioning.";

const quickCheckQuestions = [
  {
    id: "initial-verification",
    question: "What must be completed before any electrical installation is energised?",
    options: ["Client sign-off only", "Initial verification testing", "Final account payment", "Building control approval"],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 610.1 requires that every electrical installation shall be inspected and tested during erection and on completion, before being put into service. Initial verification must be completed before energisation."
  },
  {
    id: "dead-testing",
    question: "Which tests must be carried out with the supply disconnected (dead testing)?",
    options: ["Voltage drop only", "Prospective fault current only", "Continuity and insulation resistance", "Earth loop impedance only"],
    correctIndex: 2,
    explanation: "Dead tests include continuity of protective conductors, continuity of ring final circuit conductors, insulation resistance, and polarity. These must be completed before live testing commences."
  },
  {
    id: "eic-purpose",
    question: "What is the purpose of an Electrical Installation Certificate (EIC)?",
    options: ["To request DNO connection", "To certify initial verification of a new installation", "To record periodic inspection findings", "To approve design only"],
    correctIndex: 1,
    explanation: "The EIC certifies that a new installation, or addition/alteration to an existing installation, has been designed, constructed, inspected and tested in accordance with BS 7671."
  },
  {
    id: "test-sequence",
    question: "Why is the correct sequence of testing important?",
    options: ["To save time only", "To ensure earlier tests validate later test results", "To satisfy insurance requirements", "To reduce equipment costs"],
    correctIndex: 1,
    explanation: "The test sequence ensures safety and accuracy - for example, insulation resistance must be verified before live testing, and continuity of protective conductors must be confirmed before earth fault loop testing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 7671, what is the minimum insulation resistance for a 230V circuit?",
    options: [
      "0.5 megohms",
      "1.0 megohm",
      "2.0 megohms",
      "10 megohms"
    ],
    correctAnswer: 1,
    explanation: "For circuits up to and including 500V, BS 7671 Table 61 requires a minimum insulation resistance of 1.0 megohm when tested at 500V DC."
  },
  {
    id: 2,
    question: "What must be disconnected before carrying out insulation resistance testing?",
    options: ["Nothing - test with all equipment connected", "Only lighting circuits", "Electronic equipment, surge protective devices, and voltage-sensitive devices", "Only socket outlets"],
    correctAnswer: 2,
    explanation: "Electronic equipment, SPDs, PIRs, and other voltage-sensitive equipment must be disconnected as the 500V DC test voltage could damage them. Lamps should also be removed."
  },
  {
    id: 3,
    question: "When testing ring final circuit continuity, what confirms the ring is complete?",
    options: ["High resistance reading", "Equal readings at each socket", "Resistance at mid-point approximately equal to end-to-end values", "Zero resistance throughout"],
    correctAnswer: 2,
    explanation: "With cross-connected leads at the distribution board, readings at each socket should be substantially the same and approximately equal to the initial end-to-end measurement. This confirms the ring is continuous."
  },
  {
    id: 4,
    question: "What document must accompany every new electrical installation?",
    options: ["Minor Works Certificate", "EICR", "Electrical Installation Certificate (EIC)", "Domestic Installation Certificate only"],
    correctAnswer: 2,
    explanation: "An Electrical Installation Certificate (EIC) must be issued for every new installation. It includes design, construction and inspection/test schedules, signed by the responsible persons."
  },
  {
    id: 5,
    question: "What is the maximum permitted Zs for a 32A Type B MCB on a TN-S system?",
    options: [
      "0.72 ohms",
      "1.09 ohms",
      "1.44 ohms",
      "2.19 ohms"
    ],
    correctAnswer: 2,
    explanation: "For a 32A Type B MCB, the maximum Zs from BS 7671 Table 41.3 is 1.44 ohms (at 70 degrees C, the 0.8 factor gives a field test maximum of approximately 1.15 ohms)."
  },
  {
    id: 6,
    question: "When should RCD operation be tested during commissioning?",
    options: ["Only at final inspection", "During dead testing phase", "After all other tests are satisfactory and supply is energised", "Before insulation resistance testing"],
    correctAnswer: 2,
    explanation: "RCD testing requires a live supply and is part of live testing. It should only be carried out after dead tests and earth fault loop impedance tests confirm the installation is safe to energise."
  },
  {
    id: 7,
    question: "What is the purpose of functional testing during switchgear commissioning?",
    options: ["To check cable colours only", "To verify protection settings, interlocks and control circuits operate correctly", "To measure insulation resistance only", "To confirm nameplate details"],
    correctAnswer: 1,
    explanation: "Functional testing verifies that protection relays operate at correct settings, mechanical and electrical interlocks function properly, and control/indication circuits perform as designed."
  },
  {
    id: 8,
    question: "Who must sign Schedule 1 (design) of an Electrical Installation Certificate?",
    options: ["The installing electrician only", "The client", "The person responsible for the design of the installation", "Any competent person"],
    correctAnswer: 2,
    explanation: "Schedule 1 must be signed by the person responsible for the design, confirming it complies with BS 7671. This may be different from the installer if design and installation are by separate parties."
  },
  {
    id: 9,
    question: "What documentation should be provided for LV switchgear commissioning?",
    options: ["Visual inspection only", "Test certificates, relay settings, protection coordination studies and as-built drawings", "Manufacturer catalogues only", "Installation photographs only"],
    correctAnswer: 1,
    explanation: "Switchgear commissioning documentation includes factory test certificates, site test results, protection relay settings, coordination studies, cable schedules, and as-built single line diagrams."
  },
  {
    id: 10,
    question: "Before energising a new installation, what must be verified regarding the DNO supply?",
    options: ["Only the meter serial number", "PSCC/PFC and Ze are within design parameters", "The supply cable colour only", "Nothing - just connect"],
    correctAnswer: 1,
    explanation: "The prospective short circuit current (PSCC) and external earth fault loop impedance (Ze) must be verified to confirm the installation protective devices are adequate and discrimination is maintained."
  },
  {
    id: 11,
    question: "What is the trip time requirement for a 30mA RCD at 5 times rated residual current (150mA)?",
    options: ["40ms maximum", "200ms maximum", "300ms maximum", "1 second maximum"],
    correctAnswer: 0,
    explanation: "When tested at 5 times the rated residual current (5 x 30mA = 150mA), a general-use RCD must trip within 40ms. This tests the RCD's ability to provide supplementary protection against electric shock."
  },
  {
    id: 12,
    question: "Why is phased energisation recommended for large installations?",
    options: ["To save electricity costs", "To allow systematic fault identification and prevent cascading failures", "To satisfy insurance only", "It is not recommended"],
    correctAnswer: 1,
    explanation: "Phased energisation allows faults to be identified and isolated to specific sections, prevents overloading during initial energisation, and enables systematic verification of each section before proceeding."
  }
];

const faqs = [
  {
    question: "What is the difference between initial verification and periodic inspection?",
    answer: "Initial verification (documented on an EIC) is carried out on new installations or additions/alterations before being put into service. It confirms compliance with design and BS 7671. Periodic inspection (documented on an EICR) assesses the ongoing safety of an existing installation, identifying deterioration, damage, or departures from current standards. The test scope and acceptance criteria differ between the two."
  },
  {
    question: "Can I energise an installation with minor defects?",
    answer: "Minor defects (Classification Code C3 - improvement recommended) do not prevent energisation but should be recorded and communicated to the client. However, installations with dangerous conditions (C1) or potentially dangerous conditions (C2) must not be energised until these are rectified. The responsible person must make a professional judgement on safety."
  },
  {
    question: "What testing is required for an addition to an existing installation?",
    answer: "The new circuits must undergo full initial verification testing. Additionally, you must verify the existing installation can safely supply the addition - check Ze, PSCC, and main protective devices. The characteristics of the existing installation affecting the addition must be recorded on Schedule of Inspections. Issue an EIC for the addition."
  },
  {
    question: "How do I commission emergency lighting systems?",
    answer: "Emergency lighting commissioning includes: verification of luminaire positions against design, functional testing of each luminaire, duration testing (full rated duration), verification of central battery systems, testing of monitoring and fault indication, and documentation of as-installed details. Follow BS 5266-1 requirements and provide commissioning certificates."
  },
  {
    question: "What records should be kept for switchgear commissioning?",
    answer: "Maintain comprehensive records including: factory test certificates, site acceptance test results, protection relay settings and test reports, primary injection test results where applicable, insulation resistance values, contact resistance measurements, functional test results, and as-commissioned single line diagrams with protection settings annotated."
  },
  {
    question: "Who can sign an Electrical Installation Certificate?",
    answer: "The EIC has three parts: Schedule 1 (design) - signed by the designer, Schedule 2 (construction) - signed by the installer/constructor, and Schedule 3 (inspection and test) - signed by the person responsible for inspection and testing. One person may sign all three if they were responsible for all aspects, or different persons sign their respective schedules."
  }
];

const HNCModule5Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Commissioning
          </h1>
          <p className="text-white/80">
            Testing procedures, verification requirements and certification for building services electrical systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Initial verification:</strong> Required before energisation</li>
              <li className="pl-1"><strong>Test sequence:</strong> Dead tests before live tests</li>
              <li className="pl-1"><strong>EIC:</strong> Certifies new installation compliance</li>
              <li className="pl-1"><strong>BS 7671 Part 6:</strong> Inspection and testing requirements</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LV switchgear:</strong> Protection verification critical</li>
              <li className="pl-1"><strong>Distribution boards:</strong> Full circuit testing</li>
              <li className="pl-1"><strong>Submains:</strong> Impedance and PSCC checks</li>
              <li className="pl-1"><strong>Final circuits:</strong> RCD and loop impedance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 7671 verification requirements to building services installations",
              "Execute the correct sequence of initial verification tests",
              "Complete Electrical Installation Certificates accurately",
              "Commission LV switchgear and distribution systems",
              "Implement safe energisation procedures",
              "Document test results and certification requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: BS 7671 Verification Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 7671 Verification Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Part 6 establishes the mandatory requirements for inspection and testing of electrical
              installations. Initial verification must be carried out on every new installation, addition or
              alteration before the installation is put into service.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Key Regulatory Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regulation 610.1:</strong> Every installation shall be inspected and tested during erection and on completion</li>
                <li className="pl-1"><strong>Regulation 610.2:</strong> Precautions shall be taken to avoid danger to persons and damage to property</li>
                <li className="pl-1"><strong>Regulation 631.1:</strong> Certification shall be provided confirming compliance with BS 7671</li>
                <li className="pl-1"><strong>Regulation 632.1:</strong> Schedule of test results shall accompany certification</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Requirements (Chapter 61)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Inspection Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verification Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connection of conductors</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection for security and correctness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Identification of conductors</td>
                      <td className="border border-white/10 px-3 py-2">Colour coding per Table 51</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Routing of cables</td>
                      <td className="border border-white/10 px-3 py-2">Compliance with prescribed zones</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective devices</td>
                      <td className="border border-white/10 px-3 py-2">Correct type and rating for circuit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enclosures and barriers</td>
                      <td className="border border-white/10 px-3 py-2">IP rating suitable for environment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Labelling and notices</td>
                      <td className="border border-white/10 px-3 py-2">Warning signs, circuit identification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Inspection shall precede testing. Many tests rely on visual confirmation that the installation is correctly assembled.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Test Sequences and Procedures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Sequences and Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The sequence of testing is critical - each test validates the safety of subsequent tests and
              confirms results of previous tests. Dead tests must always precede live tests.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Test Sequence</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5 border-l-2 border-blue-400">
                  <p className="text-sm font-medium text-blue-300">Dead Tests (Supply Isolated)</p>
                  <ol className="text-sm text-white mt-2 space-y-1 list-decimal list-inside">
                    <li>Continuity of protective conductors (including main and supplementary bonding)</li>
                    <li>Continuity of ring final circuit conductors</li>
                    <li>Insulation resistance</li>
                    <li>Polarity (initial check)</li>
                    <li>Earth electrode resistance (TT systems)</li>
                  </ol>
                </div>
                <div className="p-3 rounded bg-white/5 border-l-2 border-green-400">
                  <p className="text-sm font-medium text-green-300">Live Tests (Supply Energised)</p>
                  <ol className="text-sm text-white mt-2 space-y-1 list-decimal list-inside" start={6}>
                    <li>Polarity verification (live confirmation)</li>
                    <li>Earth fault loop impedance (Zs)</li>
                    <li>Prospective fault current (PSCC)</li>
                    <li>RCD operation</li>
                    <li>Functional testing</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Test Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Acceptable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity (R1+R2)</td>
                      <td className="border border-white/10 px-3 py-2">Low resistance ohmmeter</td>
                      <td className="border border-white/10 px-3 py-2">Compare with calculated values</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">500V DC (for 230V circuits)</td>
                      <td className="border border-white/10 px-3 py-2">1.0 megohm minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth electrode (TT)</td>
                      <td className="border border-white/10 px-3 py-2">AC earth electrode tester</td>
                      <td className="border border-white/10 px-3 py-2">RA x Idn not greater than 50V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loop impedance (Zs)</td>
                      <td className="border border-white/10 px-3 py-2">Live at 230V</td>
                      <td className="border border-white/10 px-3 py-2">Not greater than tabulated maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD (30mA)</td>
                      <td className="border border-white/10 px-3 py-2">Live at 230V</td>
                      <td className="border border-white/10 px-3 py-2">300ms at IΔn, 40ms at 5xIΔn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Final Circuit Testing</p>
              <p className="text-sm text-white mb-2">The three-step ring test confirms continuity and identifies interconnections:</p>
              <ol className="text-sm text-white space-y-1 list-decimal list-inside">
                <li><strong>Step 1:</strong> Measure end-to-end resistance of line conductors (r1)</li>
                <li><strong>Step 2:</strong> Measure end-to-end resistance of cpc conductors (r2)</li>
                <li><strong>Step 3:</strong> Cross-connect L1 to L2 and cpc1 to cpc2, measure at each socket</li>
              </ol>
              <p className="text-sm text-white/70 mt-2">Readings at each socket should be substantially equal and approximately (r1+r2)/4</p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Building services note:</strong> Large installations require systematic testing by distribution board, with clear marking of tested circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Certification and Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Certification and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper certification is a legal requirement under BS 7671 and the Building Regulations. The type
              of certificate depends on the nature of the work undertaken.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Certificate (EIC)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">New installations</li>
                  <li className="pl-1">Additions to existing installations</li>
                  <li className="pl-1">Alterations to existing installations</li>
                  <li className="pl-1">Three schedules: design, construction, inspection</li>
                  <li className="pl-1">Must include test results schedule</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EICR (Condition Report)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Periodic inspection of existing installations</li>
                  <li className="pl-1">Reports condition, not compliance</li>
                  <li className="pl-1">Classification codes (C1, C2, C3, FI)</li>
                  <li className="pl-1">Recommends next inspection interval</li>
                  <li className="pl-1">Limitations of inspection recorded</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC Schedule Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Schedule</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Signed By</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Confirms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule 1 - Design</td>
                      <td className="border border-white/10 px-3 py-2">Designer</td>
                      <td className="border border-white/10 px-3 py-2">Design complies with BS 7671</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule 2 - Construction</td>
                      <td className="border border-white/10 px-3 py-2">Constructor/Installer</td>
                      <td className="border border-white/10 px-3 py-2">Work constructed to design and BS 7671</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Schedule 3 - Inspection</td>
                      <td className="border border-white/10 px-3 py-2">Inspector</td>
                      <td className="border border-white/10 px-3 py-2">Inspected and tested, complies with BS 7671</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Test Results Schedule</td>
                      <td className="border border-white/10 px-3 py-2">Tester</td>
                      <td className="border border-white/10 px-3 py-2">Individual circuit test values</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Building Services Certification</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Large installations:</strong> Multiple EICs may be issued for phased completion</li>
                <li className="pl-1"><strong>Part P notification:</strong> Required for notifiable domestic work</li>
                <li className="pl-1"><strong>Building control:</strong> EIC forms part of completion evidence</li>
                <li className="pl-1"><strong>O&M manuals:</strong> Include copies of all certification</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional duty:</strong> Certification is a declaration of compliance. Sign only work you are responsible for and have verified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Switchgear Commissioning and Energisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Switchgear Commissioning and Energisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LV switchgear commissioning requires systematic verification of protection settings, mechanical
              operation and control circuits. Energisation procedures must ensure safety and allow fault
              identification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LV Switchboard Commissioning Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Pre-Energisation Checks</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Visual inspection complete</li>
                    <li className="pl-1">Busbar torque settings verified</li>
                    <li className="pl-1">Insulation resistance tested</li>
                    <li className="pl-1">Protection relay settings confirmed</li>
                    <li className="pl-1">CT/VT polarity checked</li>
                    <li className="pl-1">Mechanical interlocks tested</li>
                    <li className="pl-1">Earthing connections secure</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Functional Testing</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Circuit breaker operation (manual)</li>
                    <li className="pl-1">Protection relay trip testing</li>
                    <li className="pl-1">Indication and metering circuits</li>
                    <li className="pl-1">Remote control operation</li>
                    <li className="pl-1">Auto-changeover systems</li>
                    <li className="pl-1">Alarm and fault indication</li>
                    <li className="pl-1">Key interlock systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Energisation Procedure</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-inside">
                <li><strong>Preparation:</strong> Confirm all dead tests complete, area secured, personnel briefed</li>
                <li><strong>DNO liaison:</strong> Confirm supply availability, agree energisation time</li>
                <li><strong>Initial energisation:</strong> Energise incomer only, verify voltage and phase rotation</li>
                <li><strong>Sectional energisation:</strong> Close outgoing circuits systematically, verify loads</li>
                <li><strong>Load proving:</strong> Gradually apply load, monitor for abnormal conditions</li>
                <li><strong>Live testing:</strong> Complete Zs, PSCC and RCD tests as circuits are energised</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Coordination Verification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verification Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Main incomer</td>
                      <td className="border border-white/10 px-3 py-2">PSCC within device rating, coordination with DNO fuse</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Submain protection</td>
                      <td className="border border-white/10 px-3 py-2">Discrimination with upstream, let-through energy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board MCBs</td>
                      <td className="border border-white/10 px-3 py-2">Correct type and rating for cable/load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuit devices</td>
                      <td className="border border-white/10 px-3 py-2">Zs within limits, RCD protection where required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Energisation Safety Precautions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All personnel clear of switchgear during energisation</li>
                <li className="pl-1">Appropriate PPE worn (arc flash rated where required)</li>
                <li className="pl-1">Rescue equipment and trained first aider available</li>
                <li className="pl-1">Communications established with control room/DNO</li>
                <li className="pl-1">Permit to work system in place for HV systems</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Real-world example:</strong> A new commercial office block with 1000A main switchboard requires phased energisation - main incomer first, then floor distribution boards sequentially, with load proving at each stage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Insulation Resistance Testing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A distribution board with 12 circuits requires insulation resistance testing. Three circuits have electronic dimmers.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Isolate supply to distribution board</p>
                <p>Step 2: Disconnect electronic dimmers from L and N</p>
                <p>Step 3: Link all L and N conductors together at DB</p>
                <p>Step 4: Test between linked L-N and Earth</p>
                <p className="mt-2">Reading: 85 megohms</p>
                <p className="text-green-400">→ Pass (minimum 1.0 megohm required)</p>
                <p className="mt-2 text-white/60">Reconnect dimmers after testing complete</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Loop Impedance Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify a socket circuit protected by 32A Type B MCB meets disconnection requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From BS 7671 Table 41.3:</p>
                <p>Maximum Zs for 32A Type B = 1.44 ohms (at 70°C)</p>
                <p className="mt-2">Applying 0.8 correction for ambient testing:</p>
                <p>Field test maximum = 1.44 × 0.8 = 1.15 ohms</p>
                <p className="mt-2">Measured Zs at furthest socket: 0.92 ohms</p>
                <p className="text-green-400">→ Pass (0.92 &lt; 1.15 ohms)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: RCD Testing Requirements</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 30mA RCD protecting socket circuits requires full commissioning tests.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required tests for 30mA Type A RCD:</p>
                <p className="mt-2">1. Test at rated residual current (30mA):</p>
                <p>   Maximum trip time: 300ms</p>
                <p>   Measured: 28ms <span className="text-green-400">✓</span></p>
                <p className="mt-2">2. Test at 5× rated current (150mA):</p>
                <p>   Maximum trip time: 40ms</p>
                <p>   Measured: 12ms <span className="text-green-400">✓</span></p>
                <p className="mt-2">3. Test button operation: Trips correctly <span className="text-green-400">✓</span></p>
                <p className="mt-2 text-white/60">Record all values on test results schedule</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify all visual inspection items before testing</li>
                <li className="pl-1">Follow mandatory test sequence - dead tests first</li>
                <li className="pl-1">Disconnect sensitive equipment before insulation testing</li>
                <li className="pl-1">Record all test values accurately</li>
                <li className="pl-1">Compare measured values with calculated/design values</li>
                <li className="pl-1">Complete certification before handover</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimum insulation resistance: <strong>1.0 megohm</strong> at 500V DC</li>
                <li className="pl-1">30mA RCD at IΔn: <strong>300ms</strong> maximum</li>
                <li className="pl-1">30mA RCD at 5×IΔn: <strong>40ms</strong> maximum</li>
                <li className="pl-1">Temperature correction factor: <strong>0.8</strong> (Zs field testing)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Testing out of sequence</strong> — live testing before dead tests verified</li>
                <li className="pl-1"><strong>Damaging equipment</strong> — insulation testing with electronics connected</li>
                <li className="pl-1"><strong>Incorrect Zs comparison</strong> — using tabulated values without 0.8 factor</li>
                <li className="pl-1"><strong>Incomplete certification</strong> — missing schedules or signatures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Continuity of protective conductors</li>
                  <li>2. Ring circuit continuity</li>
                  <li>3. Insulation resistance (500V DC)</li>
                  <li>4. Polarity</li>
                  <li>5. Earth electrode (TT systems)</li>
                  <li>6. Earth fault loop impedance</li>
                  <li>7. RCD operation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Certification</p>
                <ul className="space-y-0.5">
                  <li>EIC - New installations/additions</li>
                  <li>EICR - Existing installation condition</li>
                  <li>Schedule 1 - Designer signs</li>
                  <li>Schedule 2 - Constructor signs</li>
                  <li>Schedule 3 - Inspector signs</li>
                  <li>Test results schedule required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section5-3">
              Next: Mechanical Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section5_2;
