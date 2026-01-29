import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Commissioning Procedures - HNC Module 7 Section 6.5";
const DESCRIPTION = "Master commissioning procedures for electrical installations: pre-commissioning checks, initial verification per BS 7671, insulation resistance testing, continuity testing, RCD testing, polarity verification, functional testing, and EICR completion.";

const quickCheckQuestions = [
  {
    id: "pre-commissioning",
    question: "What is the primary purpose of pre-commissioning checks?",
    options: ["To energise the installation quickly", "To verify installation completeness and identify defects before energisation", "To complete handover documentation", "To test RCD operation"],
    correctIndex: 1,
    explanation: "Pre-commissioning checks verify that the installation is complete, correctly installed, and free from obvious defects before any electrical testing or energisation takes place."
  },
  {
    id: "dead-testing",
    question: "Which tests must be completed before the installation is energised?",
    options: ["RCD testing and earth fault loop impedance", "Continuity, insulation resistance, and polarity verification", "Functional testing and load measurements", "Prospective fault current only"],
    correctIndex: 1,
    explanation: "Continuity of protective conductors, insulation resistance testing, and polarity verification are dead tests that must be completed before energisation to ensure safety."
  },
  {
    id: "insulation-resistance",
    question: "What is the minimum acceptable insulation resistance value for a 230V circuit per BS 7671?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "10 MΩ"],
    correctIndex: 1,
    explanation: "For circuits operating at nominal voltages up to and including 500V AC, the minimum insulation resistance value is 1.0 MΩ per Regulation 643.3.2 of BS 7671."
  },
  {
    id: "eicr-purpose",
    question: "What is the purpose of the Electrical Installation Certificate (EIC)?",
    options: ["To list all materials used", "To certify that the installation complies with BS 7671 and is safe for use", "To record energy consumption", "To detail the project costs"],
    correctIndex: 1,
    explanation: "The EIC certifies that the new installation, or alteration/addition, has been designed, constructed, inspected, and tested in accordance with BS 7671 and is safe to use."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What document should be completed first during visual inspection before any testing?",
    options: [
      "Schedule of Test Results",
      "Pre-commissioning checklist verifying installation completeness",
      "Electrical Installation Certificate",
      "Minor Works Certificate"
    ],
    correctAnswer: 1,
    explanation: "A pre-commissioning checklist should be completed first to verify installation completeness, correct component installation, and absence of obvious defects before any electrical testing begins."
  },
  {
    id: 2,
    question: "According to BS 7671, at what test voltage should insulation resistance testing be performed on a 230V circuit?",
    options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
    correctAnswer: 1,
    explanation: "For circuits with nominal voltage up to and including 500V AC (which includes 230V circuits), insulation resistance testing must be performed at 500V DC per Table 64.3 of BS 7671."
  },
  {
    id: 3,
    question: "When testing continuity of protective conductors, what is the purpose of comparing R1+R2 values?",
    options: ["To calculate power consumption", "To verify earth fault loop impedance will be within limits", "To determine cable size", "To test RCD operation"],
    correctAnswer: 1,
    explanation: "The measured R1+R2 value, when added to the external earth fault loop impedance (Ze), gives the total earth fault loop impedance (Zs), which must be within the limits stated in BS 7671 to ensure protective devices operate within the required disconnection time."
  },
  {
    id: 4,
    question: "What is the maximum disconnection time for a 32A final circuit in a TN system per BS 7671?",
    options: ["0.1 seconds", "0.2 seconds", "0.4 seconds", "5 seconds"],
    correctAnswer: 2,
    explanation: "For final circuits not exceeding 63A in TN systems, the maximum disconnection time is 0.4 seconds per Regulation 411.3.2.2. This ensures rapid disconnection under earth fault conditions."
  },
  {
    id: 5,
    question: "During polarity testing, which connections must be verified as correct?",
    options: [
      "Only the live conductor connection",
      "Single-pole switches in line conductor, centre contact of ES lampholders to line, and correct phase rotation",
      "Only three-phase connections",
      "Neutral conductor connections only"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing verifies that single-pole switches are in the line conductor only, centre contacts of ES lampholders are connected to line, and phase rotation is correct for three-phase equipment."
  },
  {
    id: 6,
    question: "What is the maximum trip time for a 30mA RCD at 150mA test current?",
    options: ["40ms", "200ms", "300ms", "1 second"],
    correctAnswer: 0,
    explanation: "When tested at 5 times rated residual current (5 x 30mA = 150mA), the RCD must trip within 40ms per BS EN 61008/61009. This verifies the RCD will provide fast disconnection under high fault currents."
  },
  {
    id: 7,
    question: "What test equipment is used to measure prospective fault current (PFC)?",
    options: ["Insulation resistance tester", "Earth loop impedance tester with PFC function", "Continuity tester", "RCD tester"],
    correctAnswer: 1,
    explanation: "Earth loop impedance testers typically include a PFC measurement function. PFC must be measured at the origin and at various points to verify protective devices have adequate breaking capacity."
  },
  {
    id: 8,
    question: "When should functional testing of emergency lighting be performed?",
    options: [
      "Before any other testing",
      "After all safety tests are complete and the installation is energised",
      "Only during the EICR periodic inspection",
      "Functional testing is not required"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of emergency lighting and other systems must be performed after the installation is safely energised and all safety verification tests have confirmed compliance."
  },
  {
    id: 9,
    question: "What document must accompany the EIC to record all test results?",
    options: [
      "Building Regulations compliance certificate",
      "Schedule of Inspections and Schedule of Test Results",
      "Risk assessment",
      "Method statement"
    ],
    correctAnswer: 1,
    explanation: "The EIC must be accompanied by a Schedule of Inspections (confirming visual checks) and Schedule of Test Results (recording all measured values) to provide complete verification evidence."
  },
  {
    id: 10,
    question: "What is the purpose of an EICR (Electrical Installation Condition Report)?",
    options: [
      "To certify new installations",
      "To report on the condition of an existing installation and identify defects",
      "To record energy consumption",
      "To approve design drawings"
    ],
    correctAnswer: 1,
    explanation: "An EICR reports on the condition of an existing installation, identifying any damage, deterioration, defects, dangerous conditions, or non-compliance with current standards."
  },
  {
    id: 11,
    question: "Before energising an installation, which of the following must be confirmed?",
    options: [
      "All circuits have been loaded",
      "The client has paid the invoice",
      "All dead tests are satisfactory and the supply characteristics are known",
      "All labels have been fitted"
    ],
    correctAnswer: 2,
    explanation: "Before energisation, all dead tests (continuity, insulation resistance, polarity) must return satisfactory results, and the supply characteristics (voltage, frequency, PFC, Ze) must be known and recorded."
  },
  {
    id: 12,
    question: "What classification code indicates a dangerous condition requiring immediate action on an EICR?",
    options: ["C3", "C2", "C1", "FI"],
    correctAnswer: 2,
    explanation: "C1 indicates 'Danger present - risk of injury. Immediate remedial action required.' This classification requires the danger to be addressed before the installation continues in use."
  }
];

const faqs = [
  {
    question: "What is the correct sequence for initial verification testing?",
    answer: "The testing sequence per BS 7671 Regulation 643 is: (1) Continuity of protective conductors including main and supplementary bonding, (2) Continuity of ring final circuit conductors, (3) Insulation resistance, (4) Protection by SELV and PELV or electrical separation, (5) Basic protection by barriers and enclosures, (6) Insulation resistance/impedance of floors and walls, (7) Polarity, (8) Protection by automatic disconnection of supply. Steps 1-7 are dead tests; step 8 includes live testing."
  },
  {
    question: "How do I determine acceptable earth fault loop impedance values?",
    answer: "Maximum Zs values are found in BS 7671 Tables 41.2-41.5 for different protective device types and ratings. The measured value must be less than 80% of the tabulated value to allow for temperature rise during fault conditions. For example, a 32A Type B MCB has a maximum Zs of 1.37Ω at 20°C, so the measured value should not exceed 1.09Ω (1.37 × 0.8)."
  },
  {
    question: "What should I do if insulation resistance test results are below the minimum?",
    answer: "If IR is below 1.0 MΩ: (1) Disconnect all loads and accessories, (2) Re-test individual circuits to identify the fault, (3) Subdivide cables by disconnecting at junction boxes, (4) Check for moisture ingress, damaged cables, or faulty accessories, (5) Repair faults and re-test until satisfactory. Never energise circuits with IR below minimum values."
  },
  {
    question: "When is a Minor Works Certificate appropriate instead of an EIC?",
    answer: "A Minor Works Certificate is appropriate for additions or alterations to an existing installation that do not include a new circuit - for example, adding a socket outlet to an existing circuit or replacing a consumer unit. If work involves a new circuit, an EIC is required with full Schedule of Test Results for that circuit."
  },
  {
    question: "How often should periodic inspection and testing be carried out?",
    answer: "Recommended intervals vary by installation type: domestic premises every 10 years (or change of occupancy), commercial every 5 years, industrial every 3 years, swimming pools annually. However, the duty holder should assess risk and may require more frequent inspection. The previous EICR will recommend the next inspection date."
  },
  {
    question: "What handover documentation must be provided to the client?",
    answer: "The contractor must provide: (1) Electrical Installation Certificate or Minor Works Certificate with schedules, (2) As-built drawings showing final installation, (3) Operation and Maintenance manual including manufacturers' literature, (4) Test equipment calibration certificates if requested, (5) Building Regulations Part P notification confirmation where applicable, (6) Any warranties or guarantees."
  }
];

const HNCModule7Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6">
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
            <span>Module 7.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Commissioning Procedures
          </h1>
          <p className="text-white/80">
            Pre-commissioning checks, initial verification, functional testing, and handover documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Pre-commissioning:</strong> Visual inspection before any testing</li>
              <li className="pl-1"><strong>Dead tests:</strong> Continuity, IR, polarity before energisation</li>
              <li className="pl-1"><strong>Live tests:</strong> Zs, PFC, RCD operation after energisation</li>
              <li className="pl-1"><strong>Documentation:</strong> EIC/EICR with full test schedules</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Test Values</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>IR minimum:</strong> 1.0 MΩ for circuits &lt;500V</li>
              <li className="pl-1"><strong>Test voltage:</strong> 500V DC for 230V circuits</li>
              <li className="pl-1"><strong>RCD trip time:</strong> &lt;300ms at IΔn, &lt;40ms at 5×IΔn</li>
              <li className="pl-1"><strong>Disconnection:</strong> 0.4s for TN final circuits ≤63A</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct systematic pre-commissioning checks per BS 7671",
              "Perform dead tests: continuity, insulation resistance, polarity",
              "Execute live tests: Zs, PFC, and RCD operation testing",
              "Apply correct test sequences and interpret results",
              "Complete EIC and EICR documentation accurately",
              "Prepare comprehensive handover packages for clients"
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

        {/* Section 1: Pre-Commissioning Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Pre-Commissioning Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pre-commissioning checks form the essential first stage of verification, conducted before any
              electrical testing begins. This systematic visual inspection identifies installation defects,
              ensures completeness, and confirms the installation is ready for safe testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-Commissioning Checklist Items:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Connection integrity:</strong> All terminations tight, cables correctly identified</li>
                <li className="pl-1"><strong>Cable installation:</strong> Correct support, bend radii, segregation maintained</li>
                <li className="pl-1"><strong>Enclosure security:</strong> All covers fitted, IP ratings maintained, knockouts sealed</li>
                <li className="pl-1"><strong>Earthing system:</strong> All earth connections made, bonding conductors installed</li>
                <li className="pl-1"><strong>Labelling:</strong> Circuit identification, warning notices, safety signs in place</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection Requirements per BS 7671 Regulation 643.1</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Inspection Item</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Check Required</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Defects</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conductor selection</td>
                      <td className="border border-white/10 px-3 py-2">CSA for current and voltage drop</td>
                      <td className="border border-white/10 px-3 py-2">Undersized cables, incorrect type</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Connection of conductors</td>
                      <td className="border border-white/10 px-3 py-2">Correct method, accessibility</td>
                      <td className="border border-white/10 px-3 py-2">Loose terminals, inaccessible joints</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protective devices</td>
                      <td className="border border-white/10 px-3 py-2">Type and rating correct</td>
                      <td className="border border-white/10 px-3 py-2">Wrong MCB type, oversized fuses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Basic protection</td>
                      <td className="border border-white/10 px-3 py-2">Insulation, barriers, enclosures</td>
                      <td className="border border-white/10 px-3 py-2">Exposed live parts, damaged insulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Presence of diagrams</td>
                      <td className="border border-white/10 px-3 py-2">Wiring diagrams at DB, circuit charts</td>
                      <td className="border border-white/10 px-3 py-2">Missing or incomplete documentation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical requirement:</strong> Visual inspection must be completed and any defects rectified before proceeding to electrical testing. Never test an installation with visible defects.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Initial Verification - Dead Tests */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Initial Verification - Dead Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dead tests are performed with the supply isolated and the installation de-energised. These
              tests verify the fundamental safety of the installation before any live testing or
              energisation takes place.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuity Testing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Protective conductors (CPC)</li>
                  <li className="pl-1">Main bonding conductors</li>
                  <li className="pl-1">Supplementary bonding</li>
                  <li className="pl-1">Ring final circuit conductors</li>
                  <li className="pl-1">Record R1+R2 values</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">L-N, L-E, N-E testing</li>
                  <li className="pl-1">500V DC test voltage</li>
                  <li className="pl-1">Minimum 1.0 MΩ required</li>
                  <li className="pl-1">Disconnect sensitive equipment</li>
                  <li className="pl-1">Test with switches on</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Polarity Verification</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single-pole switches in line</li>
                  <li className="pl-1">ES lampholder centre contacts</li>
                  <li className="pl-1">Socket outlet connections</li>
                  <li className="pl-1">Phase rotation (3-phase)</li>
                  <li className="pl-1">Use approved voltage indicator</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance Test Requirements per BS 7671</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage DC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IR Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV and PELV</td>
                      <td className="border border-white/10 px-3 py-2">250V</td>
                      <td className="border border-white/10 px-3 py-2">&gt;0.5 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to and including 500V (except SELV/PELV)</td>
                      <td className="border border-white/10 px-3 py-2">500V</td>
                      <td className="border border-white/10 px-3 py-2">&gt;1.0 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500V up to 1000V</td>
                      <td className="border border-white/10 px-3 py-2">1000V</td>
                      <td className="border border-white/10 px-3 py-2">&gt;1.0 MΩ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Ring Final Circuit Continuity Test Procedure</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Step 1:</span> <span className="text-white">Measure end-to-end resistance of L conductors (r1)</span></p>
                <p><span className="text-white/60">Step 2:</span> <span className="text-white">Measure end-to-end resistance of N conductors (rn)</span></p>
                <p><span className="text-white/60">Step 3:</span> <span className="text-white">Measure end-to-end resistance of CPC (r2)</span></p>
                <p><span className="text-white/60">Step 4:</span> <span className="text-white">Cross-connect L1 to L2 and N1 to N2, test each socket (should equal r1/4 + rn/4)</span></p>
                <p><span className="text-white/60">Step 5:</span> <span className="text-white">Cross-connect L1 to CPC2, test L-CPC at each socket to obtain R1+R2</span></p>
                <p><span className="text-white/60">Result:</span> <span className="text-white">All readings should be consistent; significant deviation indicates spurs or faults</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Test instrument requirement:</strong> All test equipment must be calibrated and comply with GS38 for electrical test equipment used by electricians.
            </p>
          </div>
        </section>

        {/* Section 3: Live Testing and RCD Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Live Testing and RCD Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Live testing is performed after all dead tests return satisfactory results and the
              installation is safely energised. These tests verify the effectiveness of the protective
              measures under actual operating conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Fault Loop Impedance (Zs) Testing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purpose:</strong> Verify protective devices will disconnect within required time</li>
                <li className="pl-1"><strong>Formula:</strong> Zs = Ze + (R1+R2)</li>
                <li className="pl-1"><strong>Measurement:</strong> Use earth loop impedance tester at furthest point of circuit</li>
                <li className="pl-1"><strong>Temperature correction:</strong> Measured value must not exceed 80% of maximum tabulated value</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Earth Fault Loop Impedance Values (BS 7671 Table 41.3)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">MCB Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type B Zs (Ω)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type C Zs (Ω)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type D Zs (Ω)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6A</td>
                      <td className="border border-white/10 px-3 py-2">7.67</td>
                      <td className="border border-white/10 px-3 py-2">3.83</td>
                      <td className="border border-white/10 px-3 py-2">1.92</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16A</td>
                      <td className="border border-white/10 px-3 py-2">2.87</td>
                      <td className="border border-white/10 px-3 py-2">1.44</td>
                      <td className="border border-white/10 px-3 py-2">0.72</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">32A</td>
                      <td className="border border-white/10 px-3 py-2">1.44</td>
                      <td className="border border-white/10 px-3 py-2">0.72</td>
                      <td className="border border-white/10 px-3 py-2">0.36</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">63A</td>
                      <td className="border border-white/10 px-3 py-2">0.73</td>
                      <td className="border border-white/10 px-3 py-2">0.36</td>
                      <td className="border border-white/10 px-3 py-2">0.18</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Apply 0.8 multiplier to account for conductor temperature rise during fault conditions</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Testing Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum Trip Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expected Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No-trip test</td>
                      <td className="border border-white/10 px-3 py-2">50% IΔn (15mA for 30mA RCD)</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                      <td className="border border-white/10 px-3 py-2">Must NOT trip</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full test (AC)</td>
                      <td className="border border-white/10 px-3 py-2">100% IΔn (30mA)</td>
                      <td className="border border-white/10 px-3 py-2">300ms</td>
                      <td className="border border-white/10 px-3 py-2">Must trip ≤300ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5× test</td>
                      <td className="border border-white/10 px-3 py-2">5× IΔn (150mA)</td>
                      <td className="border border-white/10 px-3 py-2">40ms</td>
                      <td className="border border-white/10 px-3 py-2">Must trip ≤40ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ramp test</td>
                      <td className="border border-white/10 px-3 py-2">Rising current</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                      <td className="border border-white/10 px-3 py-2">Record actual trip current</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> RCD testing causes earth leakage that will trip the device. Ensure connected equipment can tolerate sudden disconnection and reset all RCDs after testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Functional Testing and Handover Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Functional Testing and Handover Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional testing verifies that all systems operate as intended after successful completion
              of safety verification tests. This includes testing controls, interlocks, and operational
              sequences, followed by comprehensive documentation and formal handover.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Testing Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Lighting Systems</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• All luminaires illuminate correctly</li>
                    <li>• Switching operates as designed</li>
                    <li>• Dimming controls function smoothly</li>
                    <li>• Emergency lighting duration test</li>
                    <li>• PIR/daylight sensors respond</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Power Distribution</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Load balancing across phases</li>
                    <li>• Metering reads correctly</li>
                    <li>• Changeover switches operate</li>
                    <li>• Generator start/transfer sequence</li>
                    <li>• UPS battery backup duration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certification Documentation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Certificate Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">When Used</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Schedules</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical Installation Certificate (EIC)</td>
                      <td className="border border-white/10 px-3 py-2">New installations, new circuits</td>
                      <td className="border border-white/10 px-3 py-2">Schedule of Inspections, Schedule of Test Results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minor Works Certificate</td>
                      <td className="border border-white/10 px-3 py-2">Additions/alterations without new circuits</td>
                      <td className="border border-white/10 px-3 py-2">Test results on certificate form</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical Installation Condition Report (EICR)</td>
                      <td className="border border-white/10 px-3 py-2">Periodic inspection of existing installation</td>
                      <td className="border border-white/10 px-3 py-2">Condition report, observations, schedules</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EICR Classification Codes</p>
              <div className="text-sm space-y-2">
                <p><strong>C1 - Danger present:</strong> Risk of injury exists. Immediate remedial action required.</p>
                <p><strong>C2 - Potentially dangerous:</strong> Urgent remedial action required.</p>
                <p><strong>C3 - Improvement recommended:</strong> Not compliant with current standards but no immediate danger.</p>
                <p><strong>FI - Further investigation:</strong> Cannot determine condition without further investigation.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Package</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EIC/Minor Works/EICR:</strong> Completed and signed by competent person</li>
                <li className="pl-1"><strong>Schedule of Test Results:</strong> All circuits with measured values</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Final installation layout, distribution schematics</li>
                <li className="pl-1"><strong>O&amp;M manual:</strong> Manufacturers' literature, maintenance schedules</li>
                <li className="pl-1"><strong>Part P notification:</strong> Building Control notification where applicable</li>
                <li className="pl-1"><strong>Warranties:</strong> Equipment guarantees and installer warranties</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Professional requirement:</strong> Certificates must only be issued by persons competent in electrical installation testing and able to verify the work meets BS 7671 requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Verifying Earth Fault Loop Impedance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 32A Type B MCB protects a ring final circuit. Ze measured at origin = 0.35Ω. Verify the circuit is compliant.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given information:</p>
                <p>MCB: 32A Type B</p>
                <p>Ze (measured at origin): 0.35Ω</p>
                <p>R1+R2 (measured at furthest socket): 0.72Ω</p>
                <p className="mt-2">Step 1: Calculate total Zs</p>
                <p>Zs = Ze + (R1+R2)</p>
                <p>Zs = 0.35 + 0.72 = 1.07Ω</p>
                <p className="mt-2">Step 2: Check against BS 7671 Table 41.3</p>
                <p>Maximum Zs for 32A Type B = 1.44Ω</p>
                <p>Apply 0.8 correction: 1.44 × 0.8 = 1.15Ω</p>
                <p className="mt-2 text-green-400">Result: 1.07Ω &lt; 1.15Ω - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Troubleshooting Low Insulation Resistance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A lighting circuit shows 0.4 MΩ insulation resistance. Identify and locate the fault.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Initial test result:</p>
                <p>Circuit 3 (Lighting) IR: 0.4 MΩ - FAIL (minimum 1.0 MΩ)</p>
                <p className="mt-2">Fault-finding procedure:</p>
                <p>Step 1: Disconnect all luminaires at their terminals</p>
                <p>Step 2: Re-test IR = 1.5 MΩ (cable is OK)</p>
                <p>Step 3: Reconnect luminaires one at a time</p>
                <p>Step 4: After reconnecting luminaire 5: IR = 0.4 MΩ</p>
                <p className="mt-2 text-green-400">Fault identified: Luminaire 5 has internal insulation breakdown</p>
                <p className="text-green-400">Action: Replace luminaire and re-test entire circuit</p>
                <p className="text-green-400">Final IR: 1.8 MΩ - COMPLIANT</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: RCD Test Sequence</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Complete RCD testing on a 30mA Type A RCBO protecting a socket circuit.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Test equipment: Calibrated multifunction tester</p>
                <p className="text-white/60">Device: 30mA Type A RCBO</p>
                <p className="mt-2">Test 1: 50% IΔn (15mA) - No trip test</p>
                <p>Result: Device did not trip ✓</p>
                <p className="mt-2">Test 2: 100% IΔn (30mA) - Full load test</p>
                <p>Result: Tripped in 28ms ✓ (must be ≤300ms)</p>
                <p className="mt-2">Test 3: 5× IΔn (150mA) - Fast trip test</p>
                <p>Result: Tripped in 12ms ✓ (must be ≤40ms)</p>
                <p className="mt-2">Test 4: Ramp test</p>
                <p>Result: Tripped at 24mA (within 50-100% of IΔn) ✓</p>
                <p className="mt-2 text-green-400">All RCD tests PASS - Record results on schedule</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Sequence Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete visual inspection and pre-commissioning checks</li>
                <li className="pl-1">Perform continuity tests on all protective conductors</li>
                <li className="pl-1">Complete ring final circuit continuity tests where applicable</li>
                <li className="pl-1">Test insulation resistance on all circuits</li>
                <li className="pl-1">Verify polarity throughout the installation</li>
                <li className="pl-1">Energise installation and measure supply characteristics</li>
                <li className="pl-1">Test earth fault loop impedance and prospective fault current</li>
                <li className="pl-1">Test all RCDs and RCBOs</li>
                <li className="pl-1">Conduct functional testing of all systems</li>
                <li className="pl-1">Complete and issue certification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Test Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Minimum IR for 230V circuits: <strong>1.0 MΩ</strong> at 500V DC</li>
                <li className="pl-1">RCD trip time at IΔn: <strong>≤300ms</strong></li>
                <li className="pl-1">RCD trip time at 5×IΔn: <strong>≤40ms</strong></li>
                <li className="pl-1">TN disconnection time ≤63A: <strong>0.4 seconds</strong></li>
                <li className="pl-1">Temperature correction factor: <strong>0.8</strong> (multiply max Zs)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Commissioning Errors to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Testing before visual inspection</strong> - Always inspect first, test second</li>
                <li className="pl-1"><strong>Energising with failed IR</strong> - Never energise circuits below 1.0 MΩ</li>
                <li className="pl-1"><strong>Forgetting temperature correction</strong> - Apply 0.8 factor to tabulated Zs values</li>
                <li className="pl-1"><strong>Incomplete documentation</strong> - All test results must be recorded</li>
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
                <p className="font-medium text-white mb-1">Dead Tests (Before Energisation)</p>
                <ul className="space-y-0.5">
                  <li>Continuity of protective conductors</li>
                  <li>Ring final circuit continuity</li>
                  <li>Insulation resistance (500V DC, &gt;1.0 MΩ)</li>
                  <li>Polarity verification</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Live Tests (After Energisation)</p>
                <ul className="space-y-0.5">
                  <li>Earth fault loop impedance (Zs)</li>
                  <li>Prospective fault current (PFC)</li>
                  <li>RCD operation (no-trip, IΔn, 5×IΔn)</li>
                  <li>Functional testing of all systems</li>
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
            <Link to="../h-n-c-module7-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6-6">
              Next: Section 6.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section6_5;
