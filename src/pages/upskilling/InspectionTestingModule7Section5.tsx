import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Protective Device Operation - Module 7 Section 5";
const DESCRIPTION = "Verify that MCBs, RCBOs, fuses and other protective devices operate correctly and coordinate for proper circuit protection.";

const quickCheckQuestions = [
  {
    id: "rewirable-fuse",
    question: "A BS 3036 rewirable fuse carrier has two strands of 15A wire twisted together. Is this acceptable?",
    options: [
      "Yes, it doubles the protection",
      "Yes, if the carrier is intact",
      "No - only a single strand of correct rating should be used",
      "Only for lighting circuits"
    ],
    correctIndex: 2,
    explanation: "No. Only a single strand of correct rating fuse wire should be used. Multiple strands increase the current-carrying capacity beyond the rating, compromising protection. This must be corrected."
  },
  {
    id: "faded-labels",
    question: "A consumer unit has labels but they're faded and barely readable. What should be done?",
    options: [
      "Nothing - labels are optional",
      "Record as C3 and replace with clear, durable labels",
      "Only note if other faults exist",
      "Wait until next inspection"
    ],
    correctIndex: 1,
    explanation: "Labels should be replaced with clear, durable identification. This is a defect under Regulation 514.9.1. While not dangerous, unclear labelling compromises safe isolation and should be recorded and rectified."
  },
  {
    id: "spd-fault",
    question: "An SPD installed 3 years ago has a red status indicator. The installation passes all other tests. What should be recorded?",
    options: [
      "Nothing - SPDs are not part of inspection",
      "C3 or C2 - surge protection is no longer functioning",
      "Satisfactory - if other tests pass",
      "FI - further investigation needed"
    ],
    correctIndex: 1,
    explanation: "The SPD fault should be recorded as a C3 observation (improvement recommended) or C2 if deemed potentially dangerous. The occupier should be advised the surge protection is no longer functioning and replacement is recommended."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When checking an MCB, what should be verified during functional testing?",
    options: [
      "Its earth fault loop impedance",
      "It can be switched on/off and the mechanism operates correctly",
      "Its prospective fault current rating only",
      "The cable size connected to it"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of an MCB verifies the switching mechanism operates correctly - it can be switched on and off freely, doesn't stick, and the position indicator shows correctly."
  },
  {
    id: 2,
    question: "What visual check should be performed on a fuse carrier?",
    options: [
      "The fuse wire colour",
      "Correct fuse rating for the circuit and secure carrier fit",
      "The temperature of the fuse",
      "The fuse manufacturer's logo"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection of fuse carriers should verify: correct fuse rating matches the circuit design, carrier fits securely without loose connections, and the fuse is the correct type (BS 88, BS 1361, etc.)."
  },
  {
    id: 3,
    question: "An MCB won't stay in the ON position when switched. What does this indicate?",
    options: [
      "The MCB is working correctly",
      "There is likely a fault on the circuit or the MCB is defective",
      "The load is too small",
      "Normal behaviour for a new MCB"
    ],
    correctAnswer: 1,
    explanation: "If an MCB won't stay ON, either there's a fault on the circuit causing immediate trip (short circuit, earth fault, overload) or the MCB mechanism is defective. Investigation is required."
  },
  {
    id: 4,
    question: "For an RCBO, which functional aspects need verification?",
    options: [
      "Only the RCD test button",
      "Only the MCB switching",
      "Both RCD function (test button) and MCB switching mechanism",
      "Only the label is readable"
    ],
    correctAnswer: 2,
    explanation: "An RCBO combines MCB and RCD functions, so both must be functionally tested: verify the switching mechanism operates and the test button trips the device."
  },
  {
    id: 5,
    question: "When checking consumer unit labelling, what is required?",
    options: [
      "Manufacturer's name only",
      "Each circuit should be clearly identified and labels should be accurate",
      "Only the main switch needs labelling",
      "Labels are optional if drawings exist"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.9.1 requires every circuit to be identified. Labels should clearly describe each circuit and be accurate, durable, and legible. This aids safe isolation."
  },
  {
    id: 6,
    question: "A main switch doesn't fully isolate - some circuits remain live. This is:",
    options: [
      "Acceptable if those circuits are on different phases",
      "A serious defect requiring immediate attention",
      "Normal for a split-load board",
      "Only an issue for three-phase supplies"
    ],
    correctAnswer: 1,
    explanation: "A main switch must isolate all circuits it's designed to control. Circuits remaining live indicates a wiring fault or incorrect switch specification - this is a serious safety defect."
  },
  {
    id: 7,
    question: "What should be checked about the consumer unit or distribution board enclosure?",
    options: [
      "Only that it's the correct colour",
      "Secure mounting, covers intact, IP rating maintained, no damage",
      "Only that it has a main switch",
      "That it matches other installations"
    ],
    correctAnswer: 1,
    explanation: "Enclosure inspection includes: secure mounting, all covers/blanks fitted, no damage compromising IP rating, adequate clearances, and suitable for the environment."
  },
  {
    id: 8,
    question: "For protective device coordination, what should be verified?",
    options: [
      "All devices are the same brand",
      "Upstream devices are rated higher than downstream devices",
      "All devices have the same rating",
      "Devices are installed in alphabetical order"
    ],
    correctAnswer: 1,
    explanation: "Coordination (discrimination) requires upstream devices to be rated appropriately so they don't trip before downstream devices during faults, unless both are designed to trip together."
  },
  {
    id: 9,
    question: "A surge protection device (SPD) has a status indicator showing fault. What action is required?",
    options: [
      "No action - continue using",
      "Replace or investigate as the SPD may no longer provide protection",
      "Reset the indicator",
      "Wait for it to clear automatically"
    ],
    correctAnswer: 1,
    explanation: "SPD fault indication means the device may no longer provide surge protection. It should be replaced or investigated by a competent person to restore protection."
  },
  {
    id: 10,
    question: "When recording protective device verification, what should be documented?",
    options: [
      "Nothing - it's just a visual check",
      "Device types, ratings, and any defects found",
      "Only the total number of devices",
      "Just the main switch rating"
    ],
    correctAnswer: 1,
    explanation: "The schedule of inspections and circuit chart should record device types (MCB, RCBO, fuse), ratings (current and breaking capacity), and any defects or observations noted."
  }
];

const faqs = [
  {
    question: "Should I operate every MCB during functional testing?",
    answer: "Yes. Every MCB should be switched off and on to verify the mechanism operates correctly. This also confirms the switching doesn't cause issues (arc, sticking, position indicator). Warn occupants before testing as loads will be interrupted."
  },
  {
    question: "How do I check if fuse ratings are correct?",
    answer: "Compare the fuse rating against the circuit design (check conductor size, load requirements, and cable current-carrying capacity). The fuse rating should not exceed the cable current-carrying capacity and should provide adequate protection for the load."
  },
  {
    question: "What if a protective device has no visible rating?",
    answer: "All protective devices must have ratings clearly marked. If rating markings are illegible, damaged, or missing, the device should be replaced. You cannot safely verify protection without knowing the rating."
  },
  {
    question: "Should I test MCB tripping under fault conditions?",
    answer: "No - MCBs are tested during manufacture and certified to standards. Functional testing verifies the mechanism operates (switching on/off). Deliberately overloading or short-circuiting to test tripping is dangerous and unnecessary."
  },
  {
    question: "What's the difference between isolators and circuit breakers?",
    answer: "Circuit breakers (MCBs) provide automatic protection and can break fault currents. Isolators (switch-disconnectors) are designed to disconnect circuits that are already off-load. Verify each type is used correctly for its intended purpose."
  },
  {
    question: "Are there special requirements for metal consumer units?",
    answer: "Metal consumer units require all cable entries to use appropriate glands or grommets, the enclosure must be earthed, and any unused entries must be blanked. Verify the internal earth bar connections to the enclosure."
  }
];

const InspectionTestingModule7Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Protective Device Operation
          </h1>
          <p className="text-white/80">
            Verify MCBs, RCBOs, fuses and other protective devices are correctly installed and function
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>MCBs:</strong> Operate every one - verify switching mechanism</li>
              <li><strong>RCBOs:</strong> Test button AND switching mechanism</li>
              <li><strong>Fuses:</strong> Correct rating, secure carrier fit</li>
              <li><strong>Labels:</strong> Every circuit clearly identified (514.9.1)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Stuck switches, faded labels, SPD faults</li>
              <li><strong>Use:</strong> Warn occupants before switching tests</li>
              <li><strong>Apply:</strong> Check main switch isolates ALL circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Verify MCB and RCBO operation and ratings",
              "Test fuse carriers and connections",
              "Check isolator and switch-disconnector function",
              "Verify time-delay devices and coordination",
              "Confirm device labelling and schedules",
              "Document protective device verification"
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

        {/* Section 1: MCB and RCBO Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            MCB and RCBO Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Miniature circuit breakers (MCBs) and residual current circuit breakers with overcurrent
              protection (RCBOs) require both visual and functional verification:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB/RCBO Checks</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Rating matches circuit design (In, type, Icn)</li>
                <li>Switching mechanism operates freely</li>
                <li>Position indicator shows correct state</li>
                <li>Secure mounting on DIN rail</li>
                <li>Terminal connections secure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCBO Additional Check</p>
              <p className="text-sm text-white/90">
                Test button should trip the device - verify RCD function operates in addition to MCB switching.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Fuse and Fuse Carrier Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fuse and Fuse Carrier Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Where fuses are used for circuit protection, careful inspection ensures correct
              ratings and secure installation:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 88 (HRC) Fuses</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Verify correct fuse rating for circuit</li>
                  <li>Check carrier fits securely without gaps</li>
                  <li>Confirm fuse-link contacts are clean</li>
                  <li>Check indicator (if fitted) shows healthy</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 1361 Consumer Unit Fuses</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Rating marked on carrier matches circuit</li>
                  <li>Carrier inserted fully and securely</li>
                  <li>No signs of overheating or arcing</li>
                  <li>Correct colour coding matches rating</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 3036 Rewirable Fuses</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Correct fuse wire rating (not oversized)</li>
                <li>Single strand of wire only</li>
                <li>Properly secured at both terminals</li>
                <li>Carrier complete with ceramic tube</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Main Switch and Isolators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Main Switch and Isolators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Main switches and isolators provide the means of isolation required by Regulation 537.2.
              Their correct function is critical for safety:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Switch Verification</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolates ALL live conductors (L1, L2, L3, N where required)</li>
                <li>Clear ON/OFF position indication</li>
                <li>Mechanism operates smoothly</li>
                <li>Rating suitable for installation demand</li>
              </ul>
            </div>

            <p className="text-sm text-amber-400/70">
              <strong>Critical check:</strong> Verify the main switch actually de-energises all circuits.
              Test each circuit is dead after operating the main switch.
            </p>
          </div>
        </section>

        {/* Section 4: Circuit Labelling Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Circuit Labelling Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 514.9.1 requires identification of circuits. Clear, accurate labelling
              is essential for safe operation and maintenance:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Labelling Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Every circuit clearly identified</li>
                <li>Labels legible and durable</li>
                <li>Description accurate (e.g., "Kitchen Sockets" not just "Sockets")</li>
                <li>Device ratings visible or on circuit chart</li>
                <li>Warning labels where required (RCD test frequency, isolation points)</li>
              </ul>
            </div>

            <p>
              A circuit chart should be provided showing circuit numbers, descriptions, protective
              device types and ratings, and associated RCDs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Enclosure Condition */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Enclosure Condition
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The consumer unit or distribution board enclosure is part of the protective measures.
              Verify its condition during inspection:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Condition</p>
                <ul className="text-sm text-white space-y-1">
                  <li>No damage, cracks, or deformation</li>
                  <li>All covers securely fitted</li>
                  <li>Blanking plates in unused ways</li>
                  <li>Cable entries properly grommeted/glanded</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metal Enclosures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Enclosure properly earthed</li>
                  <li>All cable entries use appropriate glands</li>
                  <li>No sharp edges at entries</li>
                  <li>IP rating maintained</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mounting</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Securely fixed to structure</li>
                <li>Appropriate height for operation</li>
                <li>Adequate working space in front</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: SPDs and Additional Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            SPDs and Additional Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern installations may include surge protection devices (SPDs) and other supplementary
              protective devices that require verification:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Verification</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Status indicator shows healthy (green/no fault)</li>
                <li>Correct type for location (Type 1, 2, or 3)</li>
                <li>Short connections to earth bar</li>
                <li>Associated overcurrent protection correct</li>
              </ul>
            </div>

            <p className="text-sm text-amber-400/70">
              <strong>Important:</strong> If an SPD status indicator shows fault (typically red or flashing),
              the device should be replaced as it may no longer provide surge protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Warn Occupants</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Operating every MCB will interrupt circuits - warn before testing</li>
                <li>Sensitive equipment may need to be shut down properly first</li>
                <li>Consider timing of tests to minimise disruption</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Check Coordination</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify upstream devices are rated higher than downstream for discrimination</li>
                <li>Main switch rating should exceed total of final circuits</li>
                <li>Sub-main protection should coordinate with both ends</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forcing stuck switches</strong> - investigate, don't force</li>
                <li><strong>Ignoring faded labels</strong> - record and recommend replacement</li>
                <li><strong>Missing SPD faults</strong> - always check status indicators</li>
                <li><strong>Not testing main switch isolation</strong> - verify ALL circuits dead</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Device Testing</p>
                <ul className="space-y-0.5">
                  <li>MCB = Switch on/off</li>
                  <li>RCBO = Both functions</li>
                  <li>RCD = Test button operation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Requirements</p>
                <ul className="space-y-0.5">
                  <li>Labelling = Reg 514.9.1</li>
                  <li>Main switch = Isolate all circuits</li>
                  <li>SPD = Check status indicator</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Module Completion */}
        <section className="mb-10">
          <div className="p-6 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Module 7 Complete!</h3>
            <p className="text-white/70 mb-3">
              You've mastered polarity testing, phase rotation, functional testing, and protective device verification.
            </p>
            <p className="text-elec-yellow text-sm">
              Continue to Module 8: Visual Inspection & Documentation
            </p>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-7/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8">
              Next: Module 8
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule7Section5;
