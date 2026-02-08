import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Isolation and Verification - MOET Module 4.4.1";
const DESCRIPTION = "Comprehensive guide to safe isolation procedures in repair contexts: proving dead before work, multi-source isolation, verification after repair, and re-energisation sequences for electrical maintenance technicians under BS 7671 and GS38.";

const quickCheckQuestions = [
  {
    id: "isolation-prove-dead",
    question: "Why must you prove a voltage indicator is working both before AND after testing a circuit for dead?",
    options: [
      "To satisfy documentation requirements only",
      "To confirm the indicator has not failed during the test, which could give a false 'dead' reading",
      "Because the battery may have gone flat between tests",
      "To calibrate the instrument before use"
    ],
    correctIndex: 1,
    explanation: "If a voltage indicator fails during use (e.g., a blown fuse, damaged lead), it will show zero volts regardless of whether the circuit is live. Proving the indicator on a known live source or proving unit after testing confirms it is still functioning correctly. This is the critical step that prevents false 'dead' readings — a leading cause of fatal electrical accidents."
  },
  {
    id: "multi-source",
    question: "In a motor control centre with a mains supply and a standby generator, what must be isolated before work begins?",
    options: [
      "Only the mains supply since the generator is a backup",
      "Only the generator since the mains is the primary supply",
      "All sources of supply that could energise the equipment, including mains, generator and any UPS or battery systems",
      "Only the circuit breaker feeding the specific motor"
    ],
    correctIndex: 2,
    explanation: "Multi-source isolation requires that ALL sources of supply that could energise the equipment are identified and isolated. This includes mains, standby generators, UPS systems, battery supplies, solar PV, and any backfeed from connected equipment. Missing even one source can result in fatal electrocution."
  },
  {
    id: "locking-off",
    question: "What is the purpose of attaching a unique personal lock and danger tag to an isolator?",
    options: [
      "To show the circuit belongs to you",
      "To prevent unauthorised re-energisation while work is in progress",
      "To identify which circuit is being worked on for billing purposes",
      "To comply with company branding requirements"
    ],
    correctIndex: 1,
    explanation: "A personal safety lock and danger tag prevent anyone from re-energising the circuit while you are working on it. Only the person who applied the lock should remove it. This is a fundamental principle of safe isolation under the Electricity at Work Regulations 1989, Regulation 13, which requires adequate precautions to prevent charging."
  },
  {
    id: "re-energisation",
    question: "What checks should be carried out BEFORE re-energising a circuit after repair?",
    options: [
      "Visual inspection only",
      "Insulation resistance test, continuity check, visual inspection, verification that all tools and temporary earths have been removed, and confirmation that all personnel are clear",
      "Simply remove the lock and switch on",
      "A phone call to the control room is sufficient"
    ],
    correctIndex: 1,
    explanation: "Before re-energisation, a systematic pre-energisation check must confirm: all connections are correctly made and tight, insulation resistance is satisfactory, continuity is proven, all tools and materials are removed, temporary earths are removed, all guards and covers are replaced, and all personnel are clear of the equipment. Only then should the circuit be re-energised in a controlled manner."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under BS 7671 and GS38, what is the first step in the safe isolation procedure?",
    options: [
      "Test the circuit with a voltage indicator",
      "Identify the circuit to be worked on and all sources of supply",
      "Lock off the isolator",
      "Inform the client that power will be off"
    ],
    correctAnswer: 1,
    explanation: "The first step is always to identify the circuit to be worked on and all sources of supply. Without correct identification, you may isolate the wrong circuit or miss an alternative supply source. This requires consulting drawings, schedules, and physically tracing the circuit where necessary."
  },
  {
    id: 2,
    question: "A proving unit (such as a Martindale VI-15700) is used to:",
    options: [
      "Test insulation resistance of cables",
      "Provide a known voltage source to prove that a voltage indicator is functioning correctly",
      "Measure earth loop impedance",
      "Charge batteries in a voltage indicator"
    ],
    correctAnswer: 1,
    explanation: "A proving unit generates a known voltage (typically around 50 V or 230 V depending on the model) that allows you to verify your voltage indicator is working correctly. It is used before and after testing a circuit to confirm the indicator has not failed. This is the 'prove-test-prove' sequence mandated by HSE guidance GS38."
  },
  {
    id: 3,
    question: "Which HSE guidance document specifically covers the safe use of electrical test equipment?",
    options: [
      "GS6",
      "GS38",
      "HSR25",
      "PM29"
    ],
    correctAnswer: 1,
    explanation: "GS38 (Electrical Test Equipment for Use by Electricians) provides detailed guidance on the safe use of test equipment, including voltage indicators, test leads and probes. It specifies requirements for fused test leads, shrouded probes, and maximum exposed probe tip lengths to reduce the risk of arc flash and short circuits during testing."
  },
  {
    id: 4,
    question: "When using a voltage indicator to prove dead, you should test between:",
    options: [
      "Line and neutral only",
      "Line and earth only",
      "All live conductors to earth and between all live conductors (L-N, L-E, N-E for single phase; all phase combinations plus each phase to N and E for three phase)",
      "Any two convenient points"
    ],
    correctAnswer: 2,
    explanation: "You must test between ALL live conductors and earth, and between ALL live conductors. For single phase: L-N, L-E, N-E. For three phase: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E. Missing any combination could leave a live conductor undetected."
  },
  {
    id: 5,
    question: "What does Regulation 13 of the Electricity at Work Regulations 1989 require?",
    options: [
      "All work must be carried out by qualified electricians",
      "Adequate precautions shall be taken to prevent electrical equipment that has been made dead from becoming live while work is in progress",
      "Risk assessments must be reviewed annually",
      "Portable appliance testing must be carried out every 12 months"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires adequate precautions to prevent electrical equipment that has been made dead from becoming live while any work is carried out on or near the equipment. This is achieved through locking off with personal safety locks, applying danger tags, and where appropriate, applying temporary earths."
  },
  {
    id: 6,
    question: "Why should two-pole voltage indicators be preferred over single-pole indicators (neon screwdrivers) for proving dead?",
    options: [
      "They are cheaper to purchase",
      "They test between two points giving a definitive result, whereas single-pole indicators can give false readings due to induced voltages or capacitive coupling",
      "They are easier to carry in a tool belt",
      "They do not require batteries"
    ],
    correctAnswer: 1,
    explanation: "Two-pole voltage indicators test the potential difference between two points, giving a definitive live or dead indication. Single-pole indicators (neon screwdrivers) detect voltage at a single point relative to earth through the user's body capacitance, making them susceptible to false readings from induced voltages, capacitive coupling, and static charges. GS38 recommends two-pole indicators for safe isolation."
  },
  {
    id: 7,
    question: "In a repair context, what additional isolation consideration applies when working on variable speed drives (VSDs)?",
    options: [
      "VSDs can be treated the same as any other circuit",
      "The DC bus capacitors may retain a lethal charge for several minutes after isolation — manufacturer's specified discharge time must be observed",
      "VSDs do not need isolation as they operate at extra-low voltage",
      "Only the motor needs to be isolated, not the drive"
    ],
    correctAnswer: 1,
    explanation: "Variable speed drives contain large DC bus capacitors that can retain a lethal charge (typically 600-800 V DC) for several minutes after the AC supply is disconnected. The manufacturer's specified discharge time must be observed, and the voltage across the DC bus must be verified as safe (typically below 50 V DC) before any work commences. Some drives have active discharge circuits; others rely on passive discharge through bleed resistors."
  },
  {
    id: 8,
    question: "What is the correct sequence for re-energisation after repair?",
    options: [
      "Remove lock, close isolator, walk away",
      "Complete pre-energisation checks, confirm all personnel are clear, remove temporary earths, replace covers, remove lock and tag, re-energise in a controlled manner, carry out functional tests",
      "Phone the control room and ask them to switch on",
      "Remove the lock and ask a colleague to close the switch while you observe"
    ],
    correctAnswer: 1,
    explanation: "Re-energisation must follow a systematic sequence: complete all pre-energisation checks (IR, continuity, visual), confirm all personnel are clear, remove temporary earths (if applied), replace all guards and covers, remove personal lock and danger tag (in that order), re-energise in a controlled manner (starting from the supply end), and carry out functional tests to confirm correct operation."
  },
  {
    id: 9,
    question: "When multiple persons are working on the same isolated circuit, which locking-off arrangement should be used?",
    options: [
      "Only the first person to arrive needs to apply a lock",
      "A multi-lock hasp (scissor clamp) allowing each person to apply their own personal lock — the isolator cannot be re-energised until ALL locks are removed",
      "A single lock with copies of the key given to each worker",
      "No locks are needed if a permit to work is in place"
    ],
    correctAnswer: 1,
    explanation: "A multi-lock hasp (also called a scissor clamp or lockout hasp) allows each person working on the circuit to apply their own personal safety lock. The isolator cannot be operated until every individual lock has been removed by its owner. This ensures that no person can be put at risk by another worker removing 'their' lock and re-energising. Each person retains personal control of their own safety."
  },
  {
    id: 10,
    question: "GS38 specifies that test probe tips should not have an exposed metal tip exceeding:",
    options: [
      "1 mm",
      "2 mm",
      "4 mm",
      "10 mm"
    ],
    correctAnswer: 2,
    explanation: "GS38 recommends that test probes should have a maximum exposed metal tip of 4 mm, with the remainder of the probe finger-guarded. This minimises the risk of accidental short circuits and arc flash during testing. The probes should also incorporate fused test leads (typically 500 mA HRC fuses) to limit fault current in the event of a short circuit."
  },
  {
    id: 11,
    question: "What is the purpose of applying temporary earths (safety earths) after isolation in HV systems?",
    options: [
      "To improve the earth resistance of the installation",
      "To provide a path that will cause protective devices to operate immediately if the circuit is accidentally re-energised, protecting the worker",
      "To discharge static electricity from the worker's clothing",
      "To test the earthing system resistance"
    ],
    correctAnswer: 1,
    explanation: "Temporary safety earths are applied after isolation and proving dead to provide a low-impedance path to earth. If the circuit is accidentally re-energised, the temporary earth will cause a massive fault current that trips the protective devices immediately, disconnecting the supply before a worker can be harmed. This is standard practice for HV systems and is also used on LV systems in high-risk situations."
  },
  {
    id: 12,
    question: "After completing a repair, you measure the insulation resistance and obtain a reading of 0.5 MΩ between line and earth on a 230 V circuit. What should you do?",
    options: [
      "Re-energise — this is an acceptable value",
      "Investigate further — the minimum acceptable value for a 230 V circuit is 1.0 MΩ per BS 7671",
      "Ignore the reading and carry out a functional test",
      "Apply a second coat of insulation tape and re-test"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 6.3 specifies a minimum insulation resistance of 1.0 MΩ for circuits operating at up to 500 V (SELV/PELV require 0.5 MΩ at 250 V test voltage, and circuits up to 500 V require 1.0 MΩ at 500 V test voltage). A reading of 0.5 MΩ on a 230 V circuit is below the minimum and indicates a potential insulation fault that must be investigated and corrected before re-energisation."
  }
];

const faqs = [
  {
    question: "Can I use a multimeter instead of a two-pole voltage indicator for proving dead?",
    answer: "While a CAT III or CAT IV rated multimeter can detect voltage, GS38 and best practice recommend a two-pole voltage indicator (such as a Fluke T150 or Martindale VT28) for proving dead. Two-pole indicators are simpler, more robust, less susceptible to user error (e.g., wrong range selection), and provide a clear pass/fail indication. A multimeter set to the wrong range or function could give a misleading reading."
  },
  {
    question: "What if the isolator does not have a facility for a lock?",
    answer: "If the isolator cannot be locked off, alternative precautions must be taken. This may include removing the fuse carrier and retaining it, using a lockout device designed to fit over the switch, posting a competent person as a safety observer at the isolator, or using a permit-to-work system. The chosen method must provide an equivalent level of security to locking off. Simply placing a 'Do Not Switch On' label is NOT sufficient on its own."
  },
  {
    question: "Do I need to prove dead at the point of work as well as at the isolator?",
    answer: "Yes. You should prove dead at the point of work, not just at the isolator. There may be other sources of supply, backfeed from connected equipment, or the wrong circuit may have been isolated. Testing at the point of work is the final confirmation that the conductors you are about to touch are indeed dead. This is especially important in complex installations with multiple circuits in the same enclosure."
  },
  {
    question: "How often should voltage indicators be checked and calibrated?",
    answer: "Voltage indicators should be visually inspected before each use (checking for damage to leads, probes and the indicator body), proved on a known source before and after each use, and formally calibrated at intervals recommended by the manufacturer — typically annually. A damaged or out-of-calibration indicator must be withdrawn from service immediately. Records of calibration should be maintained."
  },
  {
    question: "What is a 'permit to work' and when is it required for isolation?",
    answer: "A permit to work (PTW) is a formal documented procedure that authorises specific work on specific equipment for a specific period. It ensures that all necessary safety precautions (including isolation, proving dead, and earthing) have been carried out before work begins. PTWs are typically required for HV work, work in hazardous areas, complex isolations involving multiple sources, and any work where the risk assessment identifies a need for formal control."
  }
];

const MOETModule4Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
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
            <span>Module 4.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Isolation and Verification
          </h1>
          <p className="text-white/80">
            Reviewing safe isolation procedures specifically in the context of repair and replacement work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Prove-test-prove:</strong> Confirm indicator works before and after testing</li>
              <li className="pl-1"><strong>Multi-source:</strong> Identify and isolate ALL supplies including backfeed</li>
              <li className="pl-1"><strong>Lock and tag:</strong> Personal lock prevents unauthorised re-energisation</li>
              <li className="pl-1"><strong>Verify after repair:</strong> IR, continuity, visual checks before re-energising</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR 1989 Reg 12-14:</strong> Dead working, preventing re-energisation</li>
              <li className="pl-1"><strong>GS38:</strong> Safe use of test equipment and proving units</li>
              <li className="pl-1"><strong>BS 7671:</strong> Isolation and switching requirements (Chapter 53)</li>
              <li className="pl-1"><strong>ST1426:</strong> Safe working practices competence requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the prove-test-prove safe isolation procedure in a repair context",
              "Identify and isolate all sources of supply including generators, UPS and backfeed",
              "Implement correct locking off and tagging procedures for individual and multi-person working",
              "Verify circuit integrity after repair using appropriate tests before re-energisation",
              "Follow a systematic re-energisation sequence to return equipment to service safely",
              "Recognise stored energy hazards in VSDs, capacitors and battery systems during isolation"
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
            The Safe Isolation Procedure — Repair Context
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the single most critical safety procedure in electrical maintenance. Every year,
              electricians and maintenance technicians are killed or seriously injured because they worked on
              circuits that were assumed to be dead but were not. The safe isolation procedure, when followed
              correctly and completely, eliminates this risk. In a repair context, the procedure takes on
              additional importance because the fault condition itself may have created unexpected hazards — such
              as backfeed through failed components, cross-connections between circuits, or stored energy in
              capacitors and inductors.
            </p>
            <p>
              The procedure follows the well-established <strong>prove-test-prove</strong> sequence defined in
              HSE guidance note GS38 and reinforced by BS 7671 and the IET Guidance Note 3 (Inspection & Testing).
              This sequence ensures that the voltage indicator is confirmed as working before and after the critical
              test, eliminating the possibility of a false dead reading from a faulty instrument.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Isolation Procedure — Step by Step</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Identify the circuit:</strong> Consult circuit charts, distribution board schedules, and schematic diagrams to identify the correct circuit and all points of isolation. Physically trace the circuit where any doubt exists.</li>
                <li className="pl-1"><strong>Identify all sources of supply:</strong> Consider mains, standby generators, UPS systems, battery supplies, PV arrays, and any possibility of backfeed from interconnected equipment or parallel sources.</li>
                <li className="pl-1"><strong>Notify affected persons:</strong> Inform all persons who may be affected by the isolation, including building occupants, production staff, and the duty holder or responsible person.</li>
                <li className="pl-1"><strong>Isolate the circuit:</strong> Open the isolator, switch-disconnector or circuit breaker that provides isolation. Ensure the device provides full disconnection (visible contact gap or positive indication).</li>
                <li className="pl-1"><strong>Lock off and tag:</strong> Apply your personal safety lock and danger tag to the isolator. Use a multi-lock hasp if multiple persons will be working. Retain the only key on your person.</li>
                <li className="pl-1"><strong>Prove the voltage indicator:</strong> Test the two-pole voltage indicator on a known live source or proving unit to confirm it indicates correctly.</li>
                <li className="pl-1"><strong>Test for dead:</strong> Test between all live conductors and earth, and between all live conductors, at the point of work. For single phase: L-N, L-E, N-E. For three phase: L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E.</li>
                <li className="pl-1"><strong>Re-prove the voltage indicator:</strong> Immediately re-test the indicator on the known live source or proving unit to confirm it is still functioning correctly.</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Warning</p>
              <p className="text-sm text-white">
                Never assume a circuit is dead because a switch is in the 'off' position, a fuse has been removed,
                or a colleague tells you it is dead. The only acceptable confirmation is your own personal
                prove-test-prove procedure carried out at the point of work. 'Test before you touch' is not just
                good practice — it is a legal requirement under the Electricity at Work Regulations 1989.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 Test Equipment Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage indicator:</strong> Two-pole type, CAT III or CAT IV rated for the system voltage</li>
                <li className="pl-1"><strong>Test leads:</strong> Fused (typically 500 mA HRC), with finger guards and shrouded connectors</li>
                <li className="pl-1"><strong>Probe tips:</strong> Maximum 4 mm exposed metal, with spring-loaded retractable tips preferred</li>
                <li className="pl-1"><strong>Proving unit:</strong> Battery-powered unit generating a known test voltage to confirm indicator operation</li>
                <li className="pl-1"><strong>Condition:</strong> Free from damage, within calibration date, leads undamaged with no exposed conductors</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Multi-Source Isolation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern electrical installations frequently have multiple sources of supply. A maintenance technician
              must identify every possible source that could energise the equipment being worked on. Failure to
              identify and isolate all sources is one of the most common causes of fatal electrical accidents
              in industrial and commercial environments.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Multiple Supply Sources</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mains supply:</strong> The primary utility supply — may enter the building at multiple points in larger installations</li>
                <li className="pl-1"><strong>Standby generators:</strong> Automatic transfer switches (ATS) can re-energise circuits without warning when mains fails</li>
                <li className="pl-1"><strong>UPS systems:</strong> Uninterruptible power supplies maintain output voltage even when the mains supply is isolated — the UPS output and battery must be isolated separately</li>
                <li className="pl-1"><strong>Solar PV arrays:</strong> PV panels generate DC voltage whenever exposed to light — the DC side cannot be 'switched off' during daylight hours and must be treated as live</li>
                <li className="pl-1"><strong>Battery systems:</strong> Emergency lighting, fire alarm and security system batteries provide a continuous supply independent of the mains</li>
                <li className="pl-1"><strong>Backfeed:</strong> Motors, transformers and other equipment can backfeed voltage into supposedly dead circuits through electromagnetic induction or capacitive coupling</li>
                <li className="pl-1"><strong>Parallel supplies:</strong> Bus section switches connecting multiple transformer or generator feeds</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Source Isolation Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Isolation Point</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mains supply</td>
                      <td className="border border-white/10 px-3 py-2">Main switch / ACB / MCCB</td>
                      <td className="border border-white/10 px-3 py-2">Prove dead at point of work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generator</td>
                      <td className="border border-white/10 px-3 py-2">ATS and generator breaker</td>
                      <td className="border border-white/10 px-3 py-2">Prevent auto-start; lock off ATS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS</td>
                      <td className="border border-white/10 px-3 py-2">UPS output breaker and battery disconnect</td>
                      <td className="border border-white/10 px-3 py-2">Confirm UPS shows no output</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar PV</td>
                      <td className="border border-white/10 px-3 py-2">DC isolator and AC isolator</td>
                      <td className="border border-white/10 px-3 py-2">DC side may still be live in daylight</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery systems</td>
                      <td className="border border-white/10 px-3 py-2">Battery isolator / disconnect</td>
                      <td className="border border-white/10 px-3 py-2">Prove dead at battery terminals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Stored Energy Hazards in Repair Work</p>
              <p className="text-sm text-white">
                During repair work, stored energy is a particular hazard because the fault condition may have
                left capacitors charged, inductors energised, or mechanical systems under tension. Variable
                speed drives (VSDs) contain DC bus capacitors that can retain 600-800 V DC for up to 10 minutes
                after isolation. Power factor correction (PFC) capacitor banks can also retain a charge. Always
                allow the manufacturer's specified discharge time, then verify with a voltage indicator before
                touching any internal components.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Locking Off, Tagging and Permit-to-Work Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Locking off is the physical prevention of re-energisation using a personal safety lock applied to
              the isolating device. Under EAWR 1989 Regulation 13, adequate precautions must be taken to prevent
              equipment from becoming live while work is in progress. Locking off with a personal lock is the
              most effective and widely used method of achieving this requirement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Locking Off Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Personal lock:</strong> Each person working on the circuit applies their own unique lock — only they hold the key</li>
                <li className="pl-1"><strong>Multi-lock hasp:</strong> When multiple persons are working, a hasp allows each to apply their own lock. The isolator cannot operate until all locks are removed</li>
                <li className="pl-1"><strong>Danger tag:</strong> A tag with the person's name, date, time and nature of work is attached alongside the lock</li>
                <li className="pl-1"><strong>Key retention:</strong> The key must remain on the person of the lock owner at all times — never left in a toolbox, locker or handed to a colleague</li>
                <li className="pl-1"><strong>Lock removal:</strong> Only the person who applied the lock may remove it. If a lock must be removed in an emergency with the owner absent, a formal procedure involving a senior authorised person must be followed with full documentation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Permit-to-Work Systems</p>
              <p className="text-sm text-white mb-3">
                For complex, high-risk or HV isolation work, a formal permit-to-work (PTW) system provides
                additional layers of control. A PTW is a written document that authorises specific work on
                specific equipment for a defined period.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Issue:</strong> An authorised person (AP) issues the permit after confirming all safety precautions are in place</li>
                <li className="pl-1"><strong>Receipt:</strong> The competent person (CP) receiving the permit confirms understanding of the work scope and safety measures</li>
                <li className="pl-1"><strong>Clearance:</strong> Upon completion, the CP clears the permit confirming all work is complete, personnel are clear, and temporary earths removed</li>
                <li className="pl-1"><strong>Cancellation:</strong> The AP cancels the permit and authorises re-energisation</li>
                <li className="pl-1"><strong>Audit trail:</strong> All permits are recorded and retained for a minimum period (typically 3-5 years)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A permit to work is NOT a substitute for safe isolation and locking
              off — it is an additional administrative control used alongside physical measures. The physical
              isolation and locking off must still be carried out regardless of whether a PTW is in place.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Verification After Repair and Re-Energisation Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After completing a repair, the circuit must be verified as safe before it is returned to service.
              This verification is not optional — re-energising a circuit without proper checks risks further
              damage to equipment, fire, or injury to personnel. The verification and re-energisation sequence
              must be systematic and documented.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Energisation Checks</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Visual inspection:</strong> Confirm all connections are correctly made and tight, no tools or materials left in the enclosure, all guards and covers replaced, no visible damage to insulation or components</li>
                <li className="pl-1"><strong>Insulation resistance:</strong> Measure IR between all live conductors and earth, and between live conductors. Compare with BS 7671 Table 6.3 minimum values (1.0 MΩ for circuits up to 500 V)</li>
                <li className="pl-1"><strong>Continuity:</strong> Verify protective conductor continuity (R1+R2) and confirm main bonding connections are intact if disturbed during the repair</li>
                <li className="pl-1"><strong>Polarity:</strong> Confirm correct polarity of connections, especially after replacing switches, socket outlets or distribution equipment</li>
                <li className="pl-1"><strong>Torque check:</strong> Verify all electrical connections are tightened to the manufacturer's specified torque values</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Re-Energisation Sequence</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Confirm all clear:</strong> Verify that all personnel are clear of the equipment and no one remains working on the circuit</li>
                <li className="pl-1"><strong>Remove temporary earths:</strong> If safety earths were applied, remove them in the correct order (earth end last)</li>
                <li className="pl-1"><strong>Replace covers and guards:</strong> Ensure all enclosure covers, barriers and protective guards are securely in place</li>
                <li className="pl-1"><strong>Remove lock and tag:</strong> Remove your personal danger tag first, then your safety lock</li>
                <li className="pl-1"><strong>Re-energise from supply end:</strong> Close the isolator or circuit breaker. If multiple stages of isolation exist, re-energise from the supply end working towards the load</li>
                <li className="pl-1"><strong>Functional testing:</strong> Carry out functional tests to confirm the repair is successful and the equipment operates correctly — motor rotation, load current, control sequences, protective devices</li>
                <li className="pl-1"><strong>Monitor:</strong> Observe the equipment during initial operation for any signs of abnormality — unusual noise, vibration, heat, or smell</li>
                <li className="pl-1"><strong>Document:</strong> Record all test results, work carried out and the equipment's status in the maintenance log</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Phased Re-Energisation</p>
              <p className="text-sm text-white">
                For complex equipment such as motor control centres or process control systems, re-energisation
                should be carried out in phases. Energise the control circuits first and verify correct operation
                of interlocks, indicators and protective functions. Then energise the power circuits under no-load
                conditions where possible. Finally, apply the load gradually while monitoring currents, voltages
                and temperatures. This phased approach minimises the risk of further damage if an issue remains.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in safe
              isolation, testing and recommissioning procedures. The ability to safely return equipment to service
              after repair is a core skill that demonstrates your understanding of both electrical safety and
              equipment functionality.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Safe Isolation and Verification"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-2">
              Next: Component Removal and Replacement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section4_1;
