import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Isolation and Testing Routines - MOET Module 7 Section 2.1";
const DESCRIPTION = "Demonstrating safe isolation to an EPA assessor: prove-test-prove sequence, GS38 compliance, explaining actions aloud and time management during practical observation.";

const quickCheckQuestions = [
  {
    id: "prove-test-prove",
    question: "What is the correct sequence for the 'prove-test-prove' procedure?",
    options: [
      "Prove the circuit is dead, test it, prove it again",
      "Prove the voltage indicator works on a known live source, test the circuit for dead, prove the indicator still works on the known source",
      "Prove the circuit is live, switch it off, prove it is dead",
      "Test the circuit, prove it is dead, test it again"
    ],
    correctIndex: 1,
    explanation: "The prove-test-prove sequence ensures your voltage indicator is working correctly before and after testing the circuit. You prove on a known live source (or proving unit), test the isolated circuit for dead, then re-prove the indicator works. This confirms the 'dead' reading was genuine, not due to a faulty instrument."
  },
  {
    id: "gs38-compliance",
    question: "According to GS38, what is the maximum exposed probe tip length for a voltage indicator used on LV systems?",
    options: [
      "10 mm",
      "4 mm with finger guards or barriers",
      "25 mm without any guards",
      "There is no limit specified"
    ],
    correctIndex: 1,
    explanation: "GS38 specifies that probe tips should have a maximum of 4 mm exposed metal, with finger guards or barriers to prevent accidental contact with live parts. This is a key safety requirement that assessors will check during the practical observation."
  },
  {
    id: "assessor-explanation",
    question: "Why is it important to explain your actions aloud during the EPA practical observation?",
    options: [
      "It is not important — just complete the task silently",
      "To demonstrate to the assessor that you understand the reasoning behind each step, not just the actions",
      "To fill time during the observation",
      "Because the assessor will ask you to read from a script"
    ],
    correctIndex: 1,
    explanation: "Explaining your actions demonstrates competence beyond physical skill. It shows the assessor that you understand why each step is necessary — the safety reasoning, the regulatory requirements, and the technical principles. This is the difference between performing a procedure and truly understanding it."
  },
  {
    id: "three-phase-isolation",
    question: "When isolating a three-phase circuit, you must test between which conductor combinations?",
    options: [
      "Only L1-L2 and L2-L3",
      "All phase-to-phase combinations (L1-L2, L2-L3, L1-L3), all phase-to-neutral, and all phase-to-earth combinations",
      "Only line to earth",
      "Only line to neutral on each phase"
    ],
    correctIndex: 1,
    explanation: "For a three-phase circuit, all conductor combinations must be tested to confirm the circuit is dead: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, and N-E. Missing any combination could mean a conductor remains live despite appearing dead on the tested pairs. This thoroughness is what the assessor expects to see."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The first step in a safe isolation procedure is to:",
    options: [
      "Test the circuit with a voltage indicator",
      "Identify the circuit to be isolated and obtain authorisation",
      "Apply lock-off devices",
      "Inform the assessor you are ready"
    ],
    correctAnswer: 1,
    explanation: "Before any physical actions, you must correctly identify the specific circuit to be isolated and obtain authorisation (e.g., from the authorised person or through a permit to work). Working on the wrong circuit is a common and potentially fatal error."
  },
  {
    id: 2,
    question: "After switching off and locking off a circuit, the next step is to:",
    options: [
      "Begin work immediately",
      "Prove the voltage indicator on a known live source, then test the circuit for dead",
      "Remove the fuses and begin work",
      "Ask the assessor if the circuit is dead"
    ],
    correctAnswer: 1,
    explanation: "After isolation and lock-off, you must prove your voltage indicator works (on a known live source or proving unit), test the isolated circuit for dead, and then re-prove the indicator. Only after this prove-test-prove sequence can you confirm the circuit is safe to work on."
  },
  {
    id: 3,
    question: "A GS38-compliant voltage indicator should have:",
    options: [
      "Long metal probes for easy access to terminals",
      "Fused leads, finger guards, max 4 mm exposed probe tips, and CAT III/IV rating",
      "Wireless Bluetooth connectivity",
      "Only an audible indicator, no display"
    ],
    correctAnswer: 1,
    explanation: "GS38 requires: fused test leads (typically 500 mA HRC fuses), finger guards or barriers on probes, maximum 4 mm exposed conductive tip, robust insulation, and appropriate CAT rating for the voltage level. These requirements prevent accidental contact and limit fault energy."
  },
  {
    id: 4,
    question: "During the EPA practical observation, the assessor is primarily assessing:",
    options: [
      "How quickly you can complete the task",
      "Your competence in performing the task safely, correctly and with understanding",
      "Whether you follow instructions without question",
      "Your ability to work without any tools"
    ],
    correctAnswer: 1,
    explanation: "The assessor evaluates competence — can you perform the task safely, correctly, and do you understand why each step is necessary? Speed is not the primary criterion; safe, methodical work with clear understanding is what achieves pass and distinction grades."
  },
  {
    id: 5,
    question: "If your voltage indicator fails the 'prove' test (does not indicate on the known live source), you should:",
    options: [
      "Use the indicator anyway — it is probably fine",
      "Stop, do not proceed with testing, and obtain a replacement indicator that passes the prove test",
      "Tap the indicator to see if it starts working",
      "Ask the assessor to confirm the circuit is dead verbally"
    ],
    correctAnswer: 1,
    explanation: "If the voltage indicator fails the prove test, it cannot be relied upon to give accurate readings. You must stop and obtain a working replacement. Using a suspect instrument could give a false 'dead' reading on a live circuit — with potentially fatal consequences."
  },
  {
    id: 6,
    question: "Lock-off devices are used to:",
    options: [
      "Speed up the isolation process",
      "Physically prevent the isolator from being switched back on, with only the person who applied it able to remove it",
      "Indicate that work has been completed",
      "Replace the need for voltage testing"
    ],
    correctAnswer: 1,
    explanation: "Lock-off devices (locks, hasps, multi-lock devices) physically prevent re-energisation. Each person working on the circuit applies their own lock — the circuit cannot be re-energised until every lock is removed. This is a fundamental safety control in the LOTO procedure."
  },
  {
    id: 7,
    question: "When explaining your safe isolation actions to the assessor, you should:",
    options: [
      "Read from a pre-prepared script",
      "Explain each step as you perform it, including the safety reason for the step and any relevant regulation",
      "Wait until the end and summarise everything at once",
      "Only explain if the assessor asks a specific question"
    ],
    correctAnswer: 1,
    explanation: "Proactive explanation as you work demonstrates genuine understanding. State what you are doing, why you are doing it, and reference relevant standards (GS38, EAWR Reg 14, BS 7671). This running commentary helps the assessor assess both your practical competence and underpinning knowledge."
  },
  {
    id: 8,
    question: "The danger zone notice ('Danger — Do Not Switch On') should be placed:",
    options: [
      "On the work bench",
      "At the point of isolation where the lock-off device is applied",
      "In the site office",
      "On the equipment being worked on only"
    ],
    correctAnswer: 1,
    explanation: "The danger notice must be placed at the point of isolation (the isolator or switch that has been locked off) so that anyone approaching it can see that the circuit has been deliberately isolated and must not be re-energised. It is a visual warning complementing the physical lock."
  },
  {
    id: 9,
    question: "During time-limited practical tasks, the best approach to time management is to:",
    options: [
      "Rush through safety checks to save time for the actual work",
      "Work methodically and safely — never compromise safety for speed — but practise beforehand to build efficient habits",
      "Ask the assessor for extra time",
      "Skip the prove-test-prove sequence if time is short"
    ],
    correctAnswer: 1,
    explanation: "Safety must never be compromised for speed. However, practising the procedure repeatedly before the EPA builds muscle memory and efficiency, allowing you to work both safely and within the time allowed. The assessor will fail a candidate who skips safety steps regardless of time pressure."
  },
  {
    id: 10,
    question: "Which regulation requires that precautions are taken to prevent electrical danger during work activities?",
    options: [
      "Building Regulations Part P",
      "Regulation 4(3) of the Electricity at Work Regulations 1989",
      "Health and Safety at Work Act Section 7 only",
      "BS 7671 Regulation 134.1.1 only"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(3) of the EAWR 1989 is the primary legal requirement for safe working practices including safe isolation. It places a duty on every person to ensure that precautions are taken to prevent danger from electrical work activities."
  },
  {
    id: 11,
    question: "A proving unit differs from a known live source in that:",
    options: [
      "They are the same thing",
      "A proving unit generates a test voltage electronically and is self-contained, while a known live source is an actual energised supply that you use to verify your indicator reads correctly",
      "A proving unit replaces the need for a voltage indicator",
      "A known live source is always safer than a proving unit"
    ],
    correctAnswer: 1,
    explanation: "A proving unit is an electronic device that generates a test voltage for verifying your voltage indicator. A known live source is an actual energised supply (e.g., a socket outlet on a different circuit). Both serve the same purpose — confirming your indicator works — but a proving unit is more convenient and avoids needing access to a separate live source."
  },
  {
    id: 12,
    question: "When multiple people are working on the same isolated circuit, the LOTO procedure requires:",
    options: [
      "Only one lock from the supervisor",
      "Each person applies their own personal safety lock — the circuit cannot be re-energised until every individual lock has been removed by its owner",
      "Locks are only needed during break times",
      "A single lock with the key left in a communal area"
    ],
    correctAnswer: 1,
    explanation: "Multi-lock devices (hasps) allow each person working on the circuit to apply their own personal lock. The isolator cannot be operated until every lock is removed. Each person is responsible for their own lock and key — no one else can remove it. This ensures no individual can be endangered by premature re-energisation."
  }
];

const faqs = [
  {
    question: "How long does the safe isolation section of the practical observation typically take?",
    answer: "The safe isolation demonstration typically takes 10-15 minutes as part of the broader practical observation. The total observation is usually 3-4 hours covering multiple tasks. Practise the procedure until you can complete it confidently in 10 minutes — this gives you a comfortable margin without rushing."
  },
  {
    question: "Do I need to bring my own tools and test equipment to the EPA?",
    answer: "This depends on the EPAO and the assessment venue. Some provide standardised equipment; others require you to bring your own. Check with your training provider well in advance. If bringing your own, ensure your voltage indicator is GS38-compliant, in calibration, and that you are familiar with it."
  },
  {
    question: "What happens if I make a mistake during the practical observation?",
    answer: "The assessor will observe and note the error. Minor errors that you self-correct may not prevent a pass. However, significant safety errors — such as failing to prove dead before touching conductors — are likely to result in a fail for that element. If you realise you have made a mistake, calmly correct it and explain what you are doing. Self-awareness and correction demonstrate competence."
  },
  {
    question: "Can the assessor ask me questions during the practical observation?",
    answer: "Yes. The assessor may ask clarifying questions such as 'Why are you doing that?' or 'What would happen if...?' These questions test your underpinning knowledge and are an opportunity to demonstrate understanding. Answer clearly and reference relevant standards or regulations where appropriate."
  },
  {
    question: "Should I practise with the same type of equipment I will use in the EPA?",
    answer: "Ideally, yes. If your training provider can confirm the type of equipment at the assessment venue, practise with the same or similar equipment. Familiarity with the specific isolators, distribution boards, and test instruments reduces hesitation and errors on the day."
  },
  {
    question: "What is the difference between isolation and switching off?",
    answer: "Switching off removes the electrical supply under normal operating conditions but does not guarantee a physical break in the circuit — some switches have electronic components that could fail. Isolation creates a physical break in the circuit (e.g., removing a fuse, opening a switch-disconnector) that is visible and verifiable. Safe working requires isolation, not just switching off. The assessor will check that you understand this distinction."
  }
];

const MOETModule7Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
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
            <Shield className="h-4 w-4" />
            <span>Module 7.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Isolation and Testing Routines
          </h1>
          <p className="text-white/80">
            Demonstrating safe isolation competence to the EPA assessor with confidence and clarity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Sequence:</strong> Identify, isolate, lock off, prove-test-prove</li>
              <li className="pl-1"><strong>GS38:</strong> 4 mm tips, fused leads, finger guards, CAT rated</li>
              <li className="pl-1"><strong>Explain:</strong> Talk through each step and its safety reason</li>
              <li className="pl-1"><strong>Time:</strong> Practise until efficient — never skip safety steps</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR Reg 4(3):</strong> Legal duty for safe systems of work</li>
              <li className="pl-1"><strong>LOTO:</strong> Lock out, tag out — personal safety locks</li>
              <li className="pl-1"><strong>Assessor:</strong> Observing safety, method and understanding</li>
              <li className="pl-1"><strong>ST1426:</strong> Core practical competence for EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Demonstrate the complete safe isolation procedure to an assessor",
              "Execute the prove-test-prove sequence correctly every time",
              "Ensure all test equipment meets GS38 requirements",
              "Explain each step and its safety rationale clearly",
              "Manage time effectively during the practical observation",
              "Avoid common mistakes that lead to practical assessment failures"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Safe Isolation Procedure for EPA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the foundation of all electrical maintenance work and is always assessed during the EPA
              practical observation. The assessor will watch you perform the complete procedure and evaluate not just
              whether you do it, but whether you understand why each step is necessary. This is the single most important
              competence you will demonstrate — getting it wrong is an automatic fail.
            </p>

            <p>
              The procedure must be followed every time, without exception. Even if you have isolated the same circuit
              a hundred times before, the EPA assessor expects to see the full procedure performed methodically. Shortcuts
              that may seem acceptable in a hurried workplace are never acceptable during assessment — and ideally should
              never be acceptable in the workplace either. The EPA tests your professional standard, not your minimum standard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Complete Safe Isolation Sequence</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Identify the circuit:</strong> Confirm the exact circuit to be isolated using labels, drawings, and circuit charts. Verify the circuit identity — do not rely on a single label</li>
                <li className="pl-1"><strong>Obtain authorisation:</strong> Confirm you have permission to isolate (PTW if required). On some sites, a permit to work is mandatory before isolation</li>
                <li className="pl-1"><strong>Notify affected persons:</strong> Inform anyone who may be affected by the isolation — production staff, building occupants, other trades</li>
                <li className="pl-1"><strong>Switch off:</strong> Switch off the circuit at the local isolator or distribution board using the correct device</li>
                <li className="pl-1"><strong>Isolate:</strong> Remove fuses or open the isolator to create a physical break in the circuit</li>
                <li className="pl-1"><strong>Lock off:</strong> Apply a personal safety lock and danger notice at the point of isolation</li>
                <li className="pl-1"><strong>Prove:</strong> Prove the voltage indicator on a known live source or proving unit</li>
                <li className="pl-1"><strong>Test:</strong> Test the isolated circuit between all conductors (L-N, L-E, N-E for single phase; all combinations for three-phase)</li>
                <li className="pl-1"><strong>Re-prove:</strong> Prove the voltage indicator again on the known live source or proving unit</li>
                <li className="pl-1"><strong>Confirm dead:</strong> The circuit is now confirmed dead and safe to work on</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical: Test Between ALL Conductors</p>
              <p className="text-sm text-white">
                When testing for dead, you must test between all combinations: line-neutral, line-earth, and neutral-earth.
                A circuit may appear dead between line and neutral but have a fault condition between neutral and earth.
                Testing all combinations confirms the circuit is genuinely de-energised. For three-phase circuits, test
                between all phases and between each phase and neutral/earth — that is a minimum of ten tests.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase vs Three-Phase Test Combinations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Combinations</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Tests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phase</td>
                      <td className="border border-white/10 px-3 py-2">L-N, L-E, N-E</td>
                      <td className="border border-white/10 px-3 py-2">3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase (no neutral)</td>
                      <td className="border border-white/10 px-3 py-2">L1-L2, L2-L3, L1-L3, L1-E, L2-E, L3-E</td>
                      <td className="border border-white/10 px-3 py-2">6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three-phase with neutral</td>
                      <td className="border border-white/10 px-3 py-2">L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E</td>
                      <td className="border border-white/10 px-3 py-2">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The prove-test-prove sequence is non-negotiable. Skipping the re-prove step
              is a common shortcut that assessors will immediately identify as a fail point. Even if the test shows dead,
              without re-proving your indicator you cannot be certain the reading was accurate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            GS38 Compliance and Test Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety Executive's Guidance Note GS38 sets out the requirements for electrical test
              equipment used by electricians. During the EPA, your test equipment must be visibly compliant with
              GS38, and you should be able to explain the requirements if asked. Using non-compliant equipment is
              both a safety risk and a potential fail point in the assessment.
            </p>

            <p>
              GS38 was published specifically to address the number of electrical accidents caused by inadequate
              or damaged test equipment. The guidance applies to all voltage indicators, multimeters, and other
              instruments used for testing on or near live conductors. Understanding the reasoning behind each
              requirement helps you explain it to the assessor and demonstrates deeper knowledge.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Probe tips:</strong> Maximum 4 mm exposed conductive material — prevents accidental contact with adjacent conductors</li>
                <li className="pl-1"><strong>Finger guards:</strong> Barriers to prevent fingers touching live parts — protects against electric shock during testing</li>
                <li className="pl-1"><strong>Fused leads:</strong> 500 mA HRC fuses in both leads — limits the energy released during a fault on the test instrument</li>
                <li className="pl-1"><strong>Robust insulation:</strong> Leads rated for the voltage being tested — prevents insulation breakdown and shock</li>
                <li className="pl-1"><strong>CAT rating:</strong> Appropriate category for the installation (CAT III or CAT IV for distribution) — ensures the instrument can withstand transient voltages</li>
                <li className="pl-1"><strong>Calibration:</strong> Within calibration date (check the label) — ensures readings are accurate and reliable</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Equipment Check</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Visual inspection of leads — no damage, cracks, or exposed conductors</li>
                <li className="pl-1">Confirm probe tips meet GS38 requirements (4 mm maximum, with guards)</li>
                <li className="pl-1">Check fuses are present and the correct rating (500 mA HRC)</li>
                <li className="pl-1">Check calibration date is current</li>
                <li className="pl-1">Test battery condition (if applicable)</li>
                <li className="pl-1">Prove on known live source before use</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CAT Rating Guide for Maintenance Environments</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CAT Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT II</td>
                      <td className="border border-white/10 px-3 py-2">Domestic appliance level</td>
                      <td className="border border-white/10 px-3 py-2">Socket outlets, portable equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT III</td>
                      <td className="border border-white/10 px-3 py-2">Distribution level</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards, bus bars, motor control centres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT IV</td>
                      <td className="border border-white/10 px-3 py-2">Origin of installation</td>
                      <td className="border border-white/10 px-3 py-2">Incoming supply, service heads, main switchgear</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Demonstrating that you check your test equipment before use shows the assessor
              a professional, safety-conscious approach. This is a distinction-level behaviour — it shows you do not just
              use the right equipment, you actively verify it is safe and suitable before every use.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Explaining Your Actions to the Assessor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The practical observation assesses both your ability to perform tasks and your understanding of why each
              step is necessary. Talking through your actions as you work — sometimes called "thinking aloud" — is the
              most effective way to demonstrate this understanding. Without verbal communication, the assessor can only
              see what you do, not why you are doing it.
            </p>

            <p>
              Many candidates underestimate how important this communication element is. Two candidates who perform
              the identical procedure can receive different grades: the one who explains their reasoning scores higher
              because the assessor has evidence of understanding, not just mechanical skill. Practise your running
              commentary until it feels natural and conversational, not scripted.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Say at Each Step</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Identifying circuit:</strong> "I'm confirming the circuit identity using the schedule of circuits and distribution board labelling to ensure I isolate the correct circuit"</li>
                <li className="pl-1"><strong>Locking off:</strong> "I'm applying my personal safety lock so the circuit cannot be re-energised by anyone else while I'm working on it — this is my LOTO procedure"</li>
                <li className="pl-1"><strong>Proving:</strong> "I'm proving my voltage indicator on this known live source to confirm it's reading correctly before I test the isolated circuit"</li>
                <li className="pl-1"><strong>Testing:</strong> "I'm testing between line and neutral, line and earth, and neutral and earth to confirm the circuit is dead on all conductors"</li>
                <li className="pl-1"><strong>Re-proving:</strong> "I'm re-proving the indicator on the known source to confirm it's still working correctly — this validates my 'dead' reading was genuine"</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Referencing Standards Naturally</p>
              <p className="text-sm text-white">
                Where natural, reference the relevant standard or regulation. For example: "I'm following the GS38
                guidance by checking my probe tips are within the 4 mm maximum" or "This prove-test-prove sequence is
                required by HSG85 safe working practices." You do not need to recite regulation numbers from memory,
                but demonstrating awareness of the regulatory framework achieves higher marks. The key word is "naturally"
                — do not force in references that feel out of place. If a reference comes to mind, include it; if not,
                your practical demonstration speaks for itself.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Dos and Don'ts</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Do</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Explain at key decision points</li>
                    <li className="pl-1">Use your own words, not a script</li>
                    <li className="pl-1">Reference safety reasons for each step</li>
                    <li className="pl-1">State what readings you expect and why</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Don't</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Narrate every micro-action</li>
                    <li className="pl-1">Read from prepared notes</li>
                    <li className="pl-1">Stay completely silent</li>
                    <li className="pl-1">Wait to be asked before speaking</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Practise the running commentary during your preparation. It should feel
              natural, not scripted. The assessor wants to hear genuine understanding, not a memorised speech.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Time Management During Practical Tasks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The practical observation has a defined time allocation. You need to work efficiently without compromising
              safety. This balance comes from practice — the more familiar you are with the procedure, the more
              efficiently you can perform it while maintaining quality and safety. Time management during the EPA
              is not about rushing; it is about eliminating hesitation and unnecessary delays.
            </p>

            <p>
              The biggest time-wasters during practical assessments are not the procedures themselves but the pauses
              caused by uncertainty: hesitating over which probe to connect, searching for the right tool, or trying
              to remember the next step. These pauses disappear with repeated practice. A well-practised candidate
              moves smoothly from one step to the next, appearing calm and confident — which is exactly the impression
              you want to give the assessor.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Speed Through Practice</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Repetition:</strong> Practise the safe isolation procedure until it is second nature — aim for at least 20 complete run-throughs</li>
                <li className="pl-1"><strong>Tool preparation:</strong> Have all tools and equipment ready and organised before starting — a tool roll or pouch saves searching time</li>
                <li className="pl-1"><strong>Efficient movement:</strong> Plan your sequence to minimise unnecessary back-and-forth between the isolator and work position</li>
                <li className="pl-1"><strong>Avoid hesitation:</strong> Confidence from practice eliminates pauses and uncertainty that waste valuable minutes</li>
                <li className="pl-1"><strong>Self-timing:</strong> Time yourself during practice to identify where you can improve efficiency without compromising safety</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Time Allocation for Practical Tasks</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safe isolation procedure</td>
                      <td className="border border-white/10 px-3 py-2">10-15 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Full procedure, no shortcuts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault diagnosis</td>
                      <td className="border border-white/10 px-3 py-2">20-40 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Systematic method, clear reasoning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Component replacement</td>
                      <td className="border border-white/10 px-3 py-2">15-30 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Correct procedure, workmanship quality</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Testing and verification</td>
                      <td className="border border-white/10 px-3 py-2">10-20 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Thorough testing, documented results</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Never Compromise Safety for Speed</p>
              <p className="text-sm text-white">
                If time is running short, do not skip safety steps. A candidate who completes the task slowly but safely
                will score higher than one who rushes and omits critical safety procedures. The assessor is looking for
                competent, safe practice — not a speed record. If you run out of time, the fact that you maintained
                safety throughout will be noted positively. A methodical approach that does not quite finish is always
                better than a rushed approach that skips proving dead.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Safe isolation is a core competence requirement of the Maintenance and
              Operations Engineering Technician standard. It is assessed in every EPA practical observation and is
              a fundamental skill for your entire career.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Mistakes and How to Avoid Them
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Experience from EPA assessors across the country reveals consistent patterns in the mistakes candidates make
              during the safe isolation demonstration. Understanding these common errors — and deliberately practising to
              avoid them — gives you a significant advantage. Most of these mistakes are preventable through awareness
              and practice, not through additional knowledge.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Top Safe Isolation Errors in EPA Assessments</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Skipping the re-prove step:</strong> Testing the circuit for dead but not re-proving the indicator afterwards. This is the single most common error and is a significant fail point</li>
                <li className="pl-1"><strong>Not testing all conductor combinations:</strong> Only testing L-N on a single-phase circuit and missing L-E and N-E, or missing phase-to-phase tests on three-phase circuits</li>
                <li className="pl-1"><strong>Using non-GS38-compliant equipment:</strong> Probes without finger guards, exposed tips longer than 4 mm, or leads without fuses</li>
                <li className="pl-1"><strong>Forgetting to apply the lock and danger notice:</strong> Isolating and testing but not physically locking off the isolator before beginning work</li>
                <li className="pl-1"><strong>Not identifying the circuit correctly:</strong> Rushing into isolation without confirming the circuit identity from the schedule of circuits or distribution board labelling</li>
                <li className="pl-1"><strong>Working in silence:</strong> Performing the procedure correctly but not explaining any of the steps, leaving the assessor unable to confirm understanding</li>
                <li className="pl-1"><strong>Not checking equipment before use:</strong> Starting to test without visually inspecting the voltage indicator and leads for damage</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Assessment Practice Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Practise the complete procedure at least 20 times until it is automatic</li>
                <li className="pl-1">Have a colleague observe and give feedback on your technique and communication</li>
                <li className="pl-1">Time yourself to ensure you can complete the procedure comfortably within the allocation</li>
                <li className="pl-1">Practise on different types of distribution boards and isolators if possible</li>
                <li className="pl-1">Rehearse your verbal commentary at each step until it flows naturally</li>
                <li className="pl-1">Verify your test equipment is GS38-compliant, calibrated, and in good condition</li>
                <li className="pl-1">Familiarise yourself with the specific lock-off devices you will use</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Handling Nerves During the Procedure</p>
              <p className="text-sm text-white">
                Assessment nerves can cause even well-prepared candidates to make mistakes. The best defence is overlearning
                — practising so much that the procedure becomes automatic, like driving a car. When nerves affect your
                conscious thinking, your trained muscle memory takes over. If you feel nervous during the assessment, take
                a breath, return to the start of the step you are on, and continue methodically. The assessor understands
                nerves and will not penalise a brief pause to compose yourself.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The candidates who perform best in EPA safe isolation assessments are not
              necessarily the most technically knowledgeable — they are the ones who have practised the most. Repetition
              builds the confidence and fluency that the assessor is looking for.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
          <div className="p-4 rounded-lg bg-white/5">
            <h2 className="text-lg font-semibold text-white mb-3">Quick Reference — Safe Isolation</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">Procedure Order</p>
                <ol className="list-decimal list-outside ml-5 space-y-0.5">
                  <li className="pl-1">Identify circuit</li>
                  <li className="pl-1">Obtain authorisation</li>
                  <li className="pl-1">Notify affected persons</li>
                  <li className="pl-1">Switch off</li>
                  <li className="pl-1">Isolate (physical break)</li>
                  <li className="pl-1">Lock off + danger notice</li>
                  <li className="pl-1">Prove indicator</li>
                  <li className="pl-1">Test for dead (all combinations)</li>
                  <li className="pl-1">Re-prove indicator</li>
                  <li className="pl-1">Confirm dead — safe to work</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">Key Standards</p>
                <ul className="list-disc list-outside ml-5 space-y-0.5">
                  <li className="pl-1">GS38 — Test equipment requirements</li>
                  <li className="pl-1">EAWR 1989 Reg 4(3) — Safe systems of work</li>
                  <li className="pl-1">EAWR 1989 Reg 12 — Isolation requirements</li>
                  <li className="pl-1">EAWR 1989 Reg 14 — Working on dead equipment</li>
                  <li className="pl-1">HSG85 — Electricity at work: safe working practices</li>
                  <li className="pl-1">BS 7671 — IET Wiring Regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Safe Isolation" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section2-2">
              Next: Fault Diagnosis Exercises
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section2_1;
