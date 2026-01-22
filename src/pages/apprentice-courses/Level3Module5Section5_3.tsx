/**
 * Level 3 Module 5 Section 5.3 - Schedule of Inspections and Test Results
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Schedule of Inspections and Test Results - Level 3 Module 5 Section 5.3";
const DESCRIPTION = "Learn how to complete the schedule of inspections and schedule of test results accurately, recording all required verification data for electrical installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What must accompany every Electrical Installation Certificate?",
    options: [
      "Only a schedule of test results",
      "Only a schedule of inspections",
      "Both a schedule of inspections AND a schedule of test results",
      "Just the invoice"
    ],
    correctIndex: 2,
    explanation: "BS 7671 requires every EIC to be accompanied by both a schedule of inspections (visual checks) and a schedule of test results (measured values). Without both schedules, the certificate is incomplete."
  },
  {
    id: "check-2",
    question: "What does a tick mark indicate on the schedule of inspections?",
    options: [
      "The item was tested",
      "The item was inspected and found to be compliant",
      "The item needs attention",
      "The item was not applicable"
    ],
    correctIndex: 1,
    explanation: "A tick (checkmark) on the schedule of inspections indicates that the item was visually inspected and found to comply with the requirements. Different symbols are used for non-compliant items or items that don't apply (N/A)."
  },
  {
    id: "check-3",
    question: "On the schedule of test results, what value should be recorded for insulation resistance?",
    options: [
      "Just 'pass' or 'fail'",
      "The actual measured value in megohms",
      "Only whether it exceeds 1 megohm",
      "The test voltage used"
    ],
    correctIndex: 1,
    explanation: "The schedule of test results requires actual measured values to be recorded. For insulation resistance, record the measured value in megohms (e.g., >200, 150, 2.5). This provides reference data for future inspections."
  },
  {
    id: "check-4",
    question: "What information identifies each circuit on the schedule of test results?",
    options: [
      "Just the circuit number",
      "Circuit reference number, description, and protective device details",
      "Only the protective device rating",
      "Just the cable size"
    ],
    correctIndex: 1,
    explanation: "Each circuit should be clearly identified with its reference number, a description (e.g., 'Upstairs lighting'), and the type and rating of its protective device (e.g., 'B6'). This allows future electricians to understand the installation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How should multiple distribution boards be documented on the schedules?",
    options: [
      "All on one schedule",
      "Separate schedule pages for each distribution board, clearly referenced",
      "Only the main board needs documenting",
      "Sub-boards don't need schedules"
    ],
    correctAnswer: 1,
    explanation: "Each distribution board should have its own schedule page(s), clearly referenced to the board (e.g., 'DB1 - Main Consumer Unit', 'DB2 - Garage Sub-board'). This maintains clarity and allows easy reference for future work."
  },
  {
    id: 2,
    question: "What should be recorded in the R1+R2 column of the test results schedule?",
    options: [
      "The calculated value from cable tables",
      "The measured value of the line conductor plus protective conductor resistance",
      "The earth electrode resistance",
      "The external loop impedance"
    ],
    correctAnswer: 1,
    explanation: "R1+R2 is the measured resistance of the line conductor (R1) plus the circuit protective conductor (R2) from the distribution board to the furthest point. This measured value, combined with Ze, allows verification of Zs."
  },
  {
    id: 3,
    question: "What does 'LIM' indicate when recorded instead of an insulation resistance value?",
    options: [
      "Limited access",
      "The instrument limitation was reached (reading exceeded scale)",
      "The circuit has limited earth fault protection",
      "The test was limited due to connected equipment"
    ],
    correctAnswer: 1,
    explanation: "LIM indicates the test instrument's upper limit was exceeded - the insulation resistance is so high it couldn't be measured. This is recorded when instruments display >200 megohms or similar. It indicates excellent insulation."
  },
  {
    id: 4,
    question: "Which items appear on the schedule of inspections?",
    options: [
      "Only test results",
      "Visual checks of connections, enclosures, labels, and documentation",
      "Only protective device ratings",
      "Only cable sizes"
    ],
    correctAnswer: 1,
    explanation: "The schedule of inspections covers visual verification items: connection integrity, enclosure suitability, correct labelling, presence of diagrams, appropriate IP ratings, fire barriers, and many other items that cannot be tested but must be checked."
  },
  {
    id: 5,
    question: "When recording RCD test results, what values should be documented?",
    options: [
      "Just 'tested' or 'not tested'",
      "Operating time at rated residual current and, optionally, at 5 times rated current",
      "Only the rated sensitivity",
      "Just the manufacturer name"
    ],
    correctAnswer: 1,
    explanation: "Record the measured operating (trip) time in milliseconds at the rated residual current (e.g., 30mA). For 30mA RCDs: max 300ms at 1x, max 40ms at 5x. Recording actual times (e.g., '18ms at 5x') provides valuable reference data."
  },
  {
    id: 6,
    question: "What symbol is used on inspection schedules when an item does not apply to the installation?",
    options: [
      "A tick",
      "N/A",
      "A cross",
      "Leave blank"
    ],
    correctAnswer: 1,
    explanation: "N/A (Not Applicable) is used when an inspection item doesn't apply to the installation. For example, 'Presence of fire barriers' would be N/A for a domestic installation without fire barriers. Never leave items blank."
  },
  {
    id: 7,
    question: "What is the purpose of recording Zs (measured) on the schedule of test results?",
    options: [
      "To calculate voltage drop",
      "To verify the earth fault loop impedance allows the protective device to operate within required time",
      "To measure cable resistance only",
      "To check the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "Zs (measured) confirms the total earth fault loop impedance at the circuit's furthest point. This must not exceed the maximum permitted value for the protective device (Tables 41.2-41.4). If exceeded, fault current may be too low for disconnection."
  },
  {
    id: 8,
    question: "How should test results be recorded when testing reveals a problem?",
    options: [
      "Don't record the failing value",
      "Record the actual failing value and note the fault for rectification",
      "Record 'fail' without the value",
      "Leave the field blank"
    ],
    correctAnswer: 1,
    explanation: "Always record the actual measured value, even if it fails. This documents the issue and provides evidence of what was found. Note the problem requires rectification. After repair, retest and record the new value with the original for comparison."
  },
  {
    id: 9,
    question: "What information should be recorded at the top of each schedule page?",
    options: [
      "Just the page number",
      "Installation address, date, and certificate reference linking to the EIC",
      "Only the electrician's name",
      "Just the distribution board number"
    ],
    correctAnswer: 1,
    explanation: "Each schedule page should include: installation address, date, the certificate reference number it relates to, page numbering (page X of Y), and identification of the distribution board covered. This ensures pages can be correctly associated with the certificate."
  },
  {
    id: 10,
    question: "For a ring final circuit, what additional continuity test results should be recorded?",
    options: [
      "Just end-to-end readings",
      "r1, rn, r2 end-to-end values, and the calculated r1+r2 value",
      "Only the measured Zs",
      "Just that the ring is complete"
    ],
    correctAnswer: 1,
    explanation: "Ring circuit testing requires recording the end-to-end resistance of line (r1), neutral (rn), and protective conductor (r2). The calculated r1+r2 (which equals r1+r2 divided by 4) should be recorded for use in Zs verification."
  },
  {
    id: 11,
    question: "When should polarity be verified and recorded?",
    options: [
      "Only at socket outlets",
      "At the origin, distribution boards, and all points where polarity matters (switches, socket outlets, etc.)",
      "Only at the consumer unit",
      "Polarity doesn't need recording"
    ],
    correctAnswer: 1,
    explanation: "Polarity must be verified and confirmed correct at all relevant points: supply origin, distribution boards, all single-pole switching devices (must be in line conductor), and socket outlets. Record as tick/check when confirmed correct."
  },
  {
    id: 12,
    question: "How are lighting circuits typically documented differently from socket circuits?",
    options: [
      "They're documented identically",
      "Lighting circuits record r1+r2 to each point, with multiple entries per circuit",
      "Lighting circuits don't need full testing",
      "Only the first light needs documenting"
    ],
    correctAnswer: 1,
    explanation: "Lighting circuits typically have multiple outlets (light points). While the furthest point determines Zs compliance, documenting r1+r2 to multiple points provides comprehensive verification. Some formats allow grouping with highest r1+r2 recorded."
  }
];

const faqs = [
  {
    question: "Do I need a separate schedule for each circuit?",
    answer: "No, schedules are designed to list multiple circuits on each page. However, each distribution board should have its own schedule page(s). For large installations with many circuits, use continuation pages and number them clearly (Page 1 of 3, etc.)."
  },
  {
    question: "What if I can't complete all tests (e.g., circuit in use)?",
    answer: "Record what was tested and note any limitations clearly. If a circuit couldn't be fully isolated for insulation resistance testing, state this as a limitation on the certificate and recommend retesting when possible. Never fabricate results."
  },
  {
    question: "Should I record values that exceed the minimum requirement?",
    answer: "Yes, always record actual measured values. An insulation resistance of 150 megohms is far better than just meeting the 1 megohm minimum. Recording actual values provides baseline data for future comparison and demonstrates thorough testing."
  },
  {
    question: "Can I use abbreviations on the schedules?",
    answer: "Standard abbreviations are acceptable and expected (e.g., B32 for 32A Type B MCB, RFC for Ring Final Circuit, L1 for Lighting Circuit 1). Keep descriptions clear enough that another electrician would understand. Avoid non-standard abbreviations."
  },
  {
    question: "What's the difference between r1+r2 and R1+R2?",
    answer: "Lowercase r1+r2 refers to values at ambient temperature (as measured). Uppercase R1+R2 refers to values adjusted for conductor operating temperature. In practice, measured values (r1+r2) are recorded, and comparison with maximum Zs accounts for temperature."
  },
  {
    question: "How do I document a TT system on the schedules?",
    answer: "For TT systems, record the earth electrode resistance (RA) and verify that RA x Ia (RCD rated current) does not exceed 50V. The schedule should show the measured RA value and confirm RCD protection is adequate for the measured earth resistance."
  }
];

const Level3Module5Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Inspections:</strong> Visual checks with tick/cross/N/A</li>
              <li><strong>Test Results:</strong> Actual measured values recorded</li>
              <li><strong>Both required:</strong> EIC is incomplete without schedules</li>
              <li><strong>Per board:</strong> Separate pages for each distribution board</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Columns for each test type, rows for circuits</li>
              <li><strong>Use:</strong> Record values as you test each circuit</li>
              <li><strong>Apply:</strong> Complete every applicable field</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Schedule of Inspections */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Schedule of Inspections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The schedule of inspections documents visual verification of the installation. These are items that cannot be tested with instruments but must be checked to confirm compliance with BS 7671 and good practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key inspection items include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Connections:</strong> Properly made, secure, no damage to conductors</li>
                <li><strong>Conductors:</strong> Correct identification, appropriate sizes</li>
                <li><strong>Enclosures:</strong> Suitable for location, IP ratings appropriate</li>
                <li><strong>Labels:</strong> Circuit identification, warning notices present</li>
                <li><strong>Protection:</strong> Correct devices, coordination verified</li>
                <li><strong>Earthing:</strong> Bonding connections, earth electrode access</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Tick</p>
                <p className="text-white/90 text-xs">Inspected and compliant</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cross or C2/C3</p>
                <p className="text-white/90 text-xs">Inspected, issue found</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">N/A</p>
                <p className="text-white/90 text-xs">Not applicable</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Never leave items blank. Every item must have a tick, cross, or N/A. A blank suggests the item wasn't checked, which undermines the validity of the inspection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Recording Inspection Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Recording Inspection Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The inspection schedule is typically structured with categories of items to check. Work through systematically, checking each item and marking your findings. This process should be done with the installation safely isolated.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Methods of Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Presence of appropriate protective devices</li>
                  <li>Basic protection (insulation, barriers)</li>
                  <li>Fault protection (EEBADS suitable)</li>
                  <li>Additional protection (RCDs where required)</li>
                  <li>Prevention of mutual detrimental influence</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consumer Unit/Distribution</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Secure mounting and accessibility</li>
                  <li>Correct IP rating for location</li>
                  <li>Switchgear correctly identified</li>
                  <li>Circuit chart present and accurate</li>
                  <li>RCD test label displayed</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Diagrams, charts or schedules provided or available</li>
                <li>Warning notices present (voltage, RCD quarterly test, etc.)</li>
                <li>Main switch identification label</li>
                <li>Periodic inspection due date displayed</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> Use a systematic approach - start at the origin and work through to the final circuits. This ensures nothing is missed and creates a logical inspection sequence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Schedule of Test Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Schedule of Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The schedule of test results records the actual measured values from your testing. This provides objective evidence of compliance and creates baseline data for comparison during future periodic inspections.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Columns typically include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Circuit details:</strong> Reference number, description, protective device</li>
                <li><strong>Continuity:</strong> r1+r2 or R1+R2 values in ohms</li>
                <li><strong>Insulation resistance:</strong> Values in megohms (L-E, L-N, etc.)</li>
                <li><strong>Polarity:</strong> Tick when verified correct</li>
                <li><strong>Zs:</strong> Measured earth fault loop impedance in ohms</li>
                <li><strong>RCD:</strong> Operating time in milliseconds at rated current</li>
              </ul>
            </div>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">r1+r2</p>
                <p className="text-white/90 text-xs">Ohms</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">IR</p>
                <p className="text-white/90 text-xs">Megohms</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Zs</p>
                <p className="text-white/90 text-xs">Ohms</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RCD</p>
                <p className="text-white/90 text-xs">Milliseconds</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Record actual measured values, not just 'pass' or 'fail'. The value '2.45' in the insulation resistance column is far more useful than a tick. These values enable trending during future inspections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Circuit Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Circuit Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each circuit should be clearly identified and documented with sufficient detail that another electrician could understand the installation. Good documentation saves time on future work and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Circuit identification should include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Reference number:</strong> Matching the circuit chart (e.g., '1', 'L1', 'Ring 1')</li>
                <li><strong>Description:</strong> Location and type (e.g., 'Kitchen ring', 'Upstairs lights')</li>
                <li><strong>Protective device:</strong> Type and rating (e.g., 'B32', 'C10 RCBO 30mA')</li>
                <li><strong>Cable details:</strong> Size and type if required (e.g., '2.5mm T+E')</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Final Circuit Example</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ref: Ring 1</li>
                  <li>Description: Ground floor sockets</li>
                  <li>Protective device: B32 + RCD 30mA</li>
                  <li>r1: 0.43 ohms</li>
                  <li>rn: 0.42 ohms</li>
                  <li>r2: 0.71 ohms</li>
                  <li>R1+R2: 0.29 ohms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Radial Circuit Example</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ref: R3</li>
                  <li>Description: Immersion heater</li>
                  <li>Protective device: C16 RCBO 30mA</li>
                  <li>r1+r2: 0.35 ohms</li>
                  <li>IR: &gt;200 megohms</li>
                  <li>Zs: 0.82 ohms</li>
                  <li>RCD: 18ms at 150mA</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> For lighting circuits with multiple outlets, you may record the r1+r2 to the furthest point or most onerous location. Some schedules allow recording multiple values per circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Completing Schedules Effectively</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete circuit details before starting tests (saves time)</li>
                <li>Record values as you test - don't rely on memory</li>
                <li>Use waterproof or carbon-copy pads on site</li>
                <li>Double-check values before leaving site</li>
                <li>Transfer to final format promptly while fresh in mind</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Multiple Distribution Boards</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Separate schedule page(s) for each board</li>
                <li>Clear identification of each board location</li>
                <li>Cross-reference sub-board supplies to main board</li>
                <li>Record Ipf and Ze at each distribution board</li>
                <li>Number pages (Page 1 of 4, etc.)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Blank fields:</strong> Every applicable field must have data</li>
                <li><strong>Wrong units:</strong> IR in megohms, Zs in ohms, RCD in ms</li>
                <li><strong>Missing pages:</strong> Reference and number all pages</li>
                <li><strong>Illegible entries:</strong> Must be readable for future reference</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Result Abbreviations</p>
                <ul className="space-y-0.5">
                  <li>LIM - Instrument limit exceeded</li>
                  <li>N/A - Not applicable</li>
                  <li>RFC - Ring final circuit</li>
                  <li>B32, C20 - MCB type and rating</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Minimum Acceptable Values</p>
                <ul className="space-y-0.5">
                  <li>Insulation resistance: 1.0 megohms min</li>
                  <li>Continuity: Low, consistent reading</li>
                  <li>Zs: Per Tables 41.2-41.4</li>
                  <li>RCD 30mA: 300ms at 1x, 40ms at 5x</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section5-5-4">
              Next: Electronic vs Paper Certification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section5_3;
