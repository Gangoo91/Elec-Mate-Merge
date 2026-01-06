/**
 * Level 3 Module 4 Section 1.4 - Safety Considerations Before and During Fault Finding
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Considerations Before and During Fault Finding - Level 3 Module 4 Section 1.4";
const DESCRIPTION = "Essential safe working practices, risk assessment, and safe isolation procedures for electrical fault diagnosis and rectification work.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Before beginning fault diagnosis, what must you always do first?",
    options: [
      "Start testing at the consumer unit",
      "Conduct a risk assessment and determine if safe isolation is required",
      "Ask the customer what they think is wrong",
      "Check your test equipment batteries"
    ],
    correctIndex: 1,
    explanation: "Risk assessment comes first. Identify hazards (live working, working at height, asbestos, etc.), assess who might be harmed, and determine control measures. Many fault-finding tasks require safe isolation - this must be determined before work begins, not discovered mid-task."
  },
  {
    id: "check-2",
    question: "When is live testing permitted during fault finding?",
    options: [
      "Whenever the electrician deems it necessary",
      "Only when dead testing cannot provide the required diagnostic information",
      "Live testing is never permitted",
      "Only on circuits below 50V"
    ],
    correctIndex: 1,
    explanation: "Live working is only permitted when it's unreasonable for the work to be done dead, and then only with appropriate precautions. For fault finding, this means: dead test first where possible; only live test when you need to observe fault behaviour or measure operating voltages/currents that dead testing can't provide."
  },
  {
    id: "check-3",
    question: "What is the correct sequence for safe isolation?",
    options: [
      "Isolate, secure, lock, test",
      "Test, isolate, secure, verify",
      "Identify, isolate, secure, prove dead, work",
      "Lock, prove dead, isolate, work"
    ],
    correctIndex: 2,
    explanation: "The safe isolation procedure is: Identify the circuit to be worked on; Isolate (switch off and lock off); Secure against re-energisation; Prove dead using a proved tester. Only then begin work. Skipping steps or changing the order creates danger."
  },
  {
    id: "check-4",
    question: "Why must you prove your voltage tester before AND after proving dead?",
    options: [
      "To check the batteries haven't run out",
      "Because regulations require it",
      "To confirm the tester works - a faulty tester could falsely indicate dead",
      "To ensure accurate voltage readings"
    ],
    correctIndex: 2,
    explanation: "A faulty voltage tester might not indicate voltage even when present. Proving the tester on a known live source before testing confirms it works. Proving it again after confirms it hasn't failed during use. This 'prove-test-prove' approach catches tester faults that could lead to fatal errors."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "You arrive at a job where the customer reports a burning smell from a socket. What's your immediate priority?",
    options: [
      "Locate and test the socket",
      "Ensure the circuit is safely isolated before investigation",
      "Ask the customer for more information",
      "Call your supervisor for advice"
    ],
    correctAnswer: 1,
    explanation: "A burning smell indicates an active dangerous condition. Before any investigation, ensure the circuit is safely isolated to prevent fire and shock risks. The priority is making the situation safe, then investigating. Never investigate an active fault on a live circuit."
  },
  {
    id: 2,
    question: "What does 'suitable precautions' for live working include?",
    options: [
      "Working quickly to minimise exposure time",
      "Barriers, insulated tools, PPE, accompaniment, and limiting work scope",
      "Warning signs only",
      "Simply being careful"
    ],
    correctAnswer: 1,
    explanation: "Suitable precautions for live working include: barriers to prevent inadvertent contact, insulated tools rated for the voltage, appropriate PPE (insulating gloves, eye protection), accompaniment by a competent person, limiting the work area and scope. 'Being careful' is not a control measure."
  },
  {
    id: 3,
    question: "A lock-off device should be used when:",
    options: [
      "Only in commercial premises",
      "Whenever you isolate a circuit for work that takes more than a few seconds",
      "Only if the customer requests it",
      "Only on three-phase supplies"
    ],
    correctAnswer: 1,
    explanation: "Lock-off devices should be used whenever you isolate for work. They physically prevent re-energisation and show the circuit is being worked on. Even brief work can result in electrocution if someone unknowingly switches the circuit back on. Use your lock, carry the key."
  },
  {
    id: 4,
    question: "What additional hazard might exist in domestic properties built before 2000?",
    options: [
      "Three-phase supplies",
      "Asbestos in electrical equipment and building materials",
      "Higher voltage supplies",
      "Aluminium main cables"
    ],
    correctAnswer: 1,
    explanation: "Pre-2000 properties may contain asbestos - in old flash guards, heater storage elements, consumer unit backing boards, floor tiles, or building materials you might disturb during investigation. If you suspect asbestos, stop work and seek specialist advice. Disturbing asbestos fibres creates serious health risks."
  },
  {
    id: 5,
    question: "When testing protective device operation, why should you stand to the side of the distribution board?",
    options: [
      "For better lighting",
      "In case of arc flash or device failure during operation",
      "To let the customer see the test",
      "It's not necessary with modern equipment"
    ],
    correctAnswer: 1,
    explanation: "If a protective device fails or an arc flash occurs, standing directly in front exposes you to the blast. Standing to the side reduces injury risk. While modern equipment is safer, faults can cause unexpected behaviour. This simple habit costs nothing and could prevent serious burns or eye injury."
  },
  {
    id: 6,
    question: "What PPE is appropriate for fault finding in a domestic consumer unit?",
    options: [
      "None required for domestic work",
      "Full arc flash suit and face shield",
      "Safety glasses/goggles and insulating gloves as minimum",
      "Steel toe cap boots only"
    ],
    correctAnswer: 2,
    explanation: "As minimum: safety glasses protect against debris and minor arc flash; insulating gloves protect against contact with live parts. Additional PPE depends on circumstances - face shields for higher risk work, arc-rated clothing if arc flash risk is elevated. Domestic doesn't mean safe - fault currents can be very high."
  },
  {
    id: 7,
    question: "You need to trace a live fault by measuring voltage at various points. What approach minimises risk?",
    options: [
      "Work quickly with both hands",
      "Use one-hand technique, keep other hand behind your back, use insulated probes",
      "Have someone watch while you test",
      "Wear rubber gloves only"
    ],
    correctAnswer: 1,
    explanation: "The one-hand technique prevents current flowing hand-to-hand across your heart - the most dangerous shock path. Keep your free hand behind your back or in your pocket. Use probes with insulated shafts and finger guards. This limits exposure even if you contact live parts accidentally."
  },
  {
    id: 8,
    question: "A customer tells you they've 'turned off the circuit at the fuse box'. What should you do?",
    options: [
      "Trust them and begin work",
      "Thank them but prove dead yourself before starting",
      "Ask them to show you which switch they turned off",
      "Check the circuit with a neon screwdriver"
    ],
    correctAnswer: 1,
    explanation: "Never trust anyone else's isolation - always prove dead yourself using a proved voltage tester. The customer might have switched the wrong circuit, the MCB might not have fully opened, or the circuit might be fed from multiple sources. Your safety is your responsibility - prove it yourself."
  },
  {
    id: 9,
    question: "What should you do if you discover a fault requires live testing but you don't feel competent to do it safely?",
    options: [
      "Attempt it anyway - you need to learn",
      "Refuse to do the work entirely",
      "Explain to the customer and arrange for someone with appropriate competence",
      "Ask the customer to do the live testing"
    ],
    correctAnswer: 2,
    explanation: "Recognising the limits of your competence is itself a sign of competence. If work requires live testing you're not confident performing safely, explain this to the customer and arrange appropriate support - perhaps an experienced colleague or specialist. Never attempt work beyond your competence for pride or convenience."
  },
  {
    id: 10,
    question: "Which of these is a sign that your voltage tester may have failed during use?",
    options: [
      "It indicates the circuit is dead when tested",
      "It fails to indicate on the proving unit after testing the circuit",
      "The LED display is dim",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All these indicate potential tester failure: dim displays suggest battery issues; failure to indicate on proving unit after testing is the critical check; even indicating dead could mean the tester failed rather than the circuit being dead. Any doubt about tester operation means you cannot trust results. Replace or prove again."
  },
  {
    id: 11,
    question: "What risk does working in a damp environment add to electrical fault finding?",
    options: [
      "Corrosion of test equipment",
      "Reduced body resistance increasing shock severity",
      "Equipment getting wet and needing replacement",
      "Slipping on wet floors"
    ],
    correctAnswer: 1,
    explanation: "Damp conditions reduce body resistance and contact resistance - meaning the same voltage drives more current through you. A shock that might cause discomfort in dry conditions could be fatal in damp conditions. Additional precautions are needed: RCD protection, lower voltage test equipment where possible, extra insulation."
  },
  {
    id: 12,
    question: "After completing fault repairs, what safety check is essential before restoring supply?",
    options: [
      "Check your tools are all collected",
      "Verify the installation is safe - no exposed conductors, covers replaced, circuit tests satisfactory",
      "Ask the customer if they're happy",
      "Check the time to ensure you're not overrunning"
    ],
    correctAnswer: 1,
    explanation: "Before restoring supply, verify: all covers are replaced (no exposed live parts), all terminations are secure (no loose conductors), insulation resistance is satisfactory (no short circuits or earth faults), polarity is correct, and any temporary arrangements have been removed. Energising an unsafe circuit creates immediate danger."
  }
];

const faqs = [
  {
    question: "Can I ever work live on a circuit?",
    answer: "Only if it's unreasonable to work dead AND you take all necessary precautions. For fault diagnosis, this might mean tracing a fault that only manifests when live, or measuring voltages/currents under operating conditions. You must have competence, use appropriate PPE, implement barriers, use insulated tools, and follow approved procedures. The decision to work live must be justified and documented."
  },
  {
    question: "What if the customer pressures me to work faster and skip safety steps?",
    answer: "Never compromise safety for speed or customer pressure. Explain that the procedures protect everyone - them, you, and their property. If they insist on shortcuts, decline to continue. No job is worth injury or death. Document refusals if customers become difficult. Your employer should support safe working practices over customer demands."
  },
  {
    question: "How do I know if my voltage tester is suitable for the work?",
    answer: "Check the tester's CAT rating (category) matches the environment - CAT III minimum for distribution level work, CAT IV for origin. Check it's rated for the voltage (typically 600V AC/DC minimum for LV work). Check it's in date for calibration and visually undamaged. GS38 specifies requirements for test probes - finger guards, limited exposed metal, fused leads. If in doubt, it's not suitable."
  },
  {
    question: "What should I do if I receive an electric shock while fault finding?",
    answer: "If you receive a shock, stop work immediately even if you feel fine. Shocks can cause delayed cardiac effects. Seek medical attention - even minor shocks warrant checking. Report the incident as required by your employer and investigate what went wrong. Don't continue working after a shock without medical clearance."
  },
  {
    question: "Is it safe to use a neon screwdriver for testing?",
    answer: "Neon screwdrivers are not reliable voltage testers. They can fail to indicate due to poor earth contact, and don't indicate voltage magnitude. They're also easily damaged and provide no audible indication. Use a proper voltage tester meeting GS38 requirements for proving circuits dead. Neon screwdrivers are acceptable for basic live/dead indication but never for safety-critical proving."
  },
  {
    question: "What's the legal basis for safe isolation requirements?",
    answer: "The Electricity at Work Regulations 1989 require that equipment be made dead before work (Regulation 13) unless it's unreasonable (Regulation 14, which requires adequate precautions). The HSE Guidance Note GS38 specifies test equipment requirements. Failing to isolate properly is a criminal offence if it exposes persons to danger, regardless of whether injury actually occurs."
  }
];

const Level3Module4Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Considerations Before and During Fault Finding
          </h1>
          <p className="text-white/80">
            Safe isolation, risk assessment, and working practices for fault diagnosis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>First:</strong> Risk assess before any work begins</li>
              <li><strong>Isolate:</strong> Identify, isolate, secure, prove dead</li>
              <li><strong>Prove:</strong> Test your tester before AND after</li>
              <li><strong>Live work:</strong> Only when absolutely necessary</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Multiple supplies or backfeeds</li>
              <li><strong>Spot:</strong> Asbestos in older installations</li>
              <li><strong>Use:</strong> Lock-off every time you isolate</li>
              <li><strong>Use:</strong> One-hand technique for live testing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct risk assessments before fault finding work",
              "Apply safe isolation procedures correctly",
              "Understand when live working is and isn't permitted",
              "Use appropriate PPE and control measures",
              "Recognise additional hazards in fault finding",
              "Ensure safety before restoring supply"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Risk Assessment for Fault Finding */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Risk Assessment for Fault Finding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before beginning any fault finding work, assess the risks involved. Fault finding often requires working on electrical systems that have behaved unexpectedly - this inherent uncertainty demands careful hazard identification. A few minutes of risk assessment can prevent fatal accidents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key hazards to consider:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical shock:</strong> From contact with live parts during testing or investigation</li>
                <li><strong>Arc flash:</strong> From faults during testing or when operating protective devices</li>
                <li><strong>Fire:</strong> From active faults or re-energising faulty circuits</li>
                <li><strong>Burns:</strong> From overheated components or arc flash</li>
                <li><strong>Working at height:</strong> Accessing distribution boards or tracing cables</li>
                <li><strong>Asbestos:</strong> In older installations' equipment and building materials</li>
              </ul>
            </div>

            <p>
              The fault you're investigating may itself create additional hazards. A fault that's causing overheating means hot components. A fault that's tripping devices unpredictably means the system is unstable. Factor the fault's nature into your risk assessment.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Risk assessment isn't paperwork - it's thinking. A mental walk-through of 'what could hurt me and how do I prevent it' before starting work is the core of risk assessment. Document it appropriately, but do the thinking regardless.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Safe Isolation Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safe Isolation Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safe isolation is the foundation of electrical safety. The procedure ensures that circuits are genuinely dead before you work on them, and that they cannot be re-energised by someone else while you're working. Every step matters - shortcuts kill.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Five Steps</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1. Identify:</strong> Confirm which circuit(s) to isolate</li>
                  <li><strong>2. Isolate:</strong> Switch off at the point of isolation</li>
                  <li><strong>3. Secure:</strong> Apply lock and warning notice</li>
                  <li><strong>4. Prove:</strong> Prove tester, test circuit, prove tester</li>
                  <li><strong>5. Work:</strong> Only now is it safe to begin</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proving Dead</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test voltage tester on known live source</li>
                  <li>Test the circuit at the point of work</li>
                  <li>Test all conductors (L-N, L-E, N-E)</li>
                  <li>Test voltage tester on known live again</li>
                  <li>Only proceed if all steps pass</li>
                </ul>
              </div>
            </div>

            <p>
              Why prove the tester twice? A voltage tester that fails during use might show 'dead' when the circuit is actually live. By checking it works both before and after testing the circuit, you catch tester failures. This simple step has prevented many fatalities.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You isolate a ring circuit by switching off its MCB, apply a lock-off with your lock, prove your voltage tester on an adjacent live circuit, test at the socket you'll work on (L-N, L-E, N-E all read zero), then prove your tester works on the adjacent live circuit again. Now and only now do you begin work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: When and How to Work Live */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            When and How to Work Live
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity at Work Regulations are clear: work should be done dead unless it's unreasonable in all circumstances. For fault finding, this creates a genuine dilemma - some faults can only be diagnosed while circuits are live. The law permits this, but requires rigorous precautions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Live testing is justified when:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dead testing cannot diagnose the fault (e.g., intermittent faults only appearing under load)</li>
                <li>You need to measure operating voltages, currents, or power quality</li>
                <li>The fault behaviour must be observed to understand the cause</li>
                <li>Isolating would cause unreasonable disruption (not just inconvenience)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required precautions for live work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Competence:</strong> Only competent persons may work live; know your limits</li>
                <li><strong>PPE:</strong> Insulating gloves, safety glasses/face shield, appropriate clothing</li>
                <li><strong>Insulated tools:</strong> All tools must be insulated and rated for the voltage</li>
                <li><strong>Barriers:</strong> Prevent inadvertent contact with live parts</li>
                <li><strong>Accompaniment:</strong> Second competent person present for rescue if needed</li>
                <li><strong>Limited work area:</strong> Minimise exposed live parts and work scope</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Live working is a last resort, not a convenience. Every live working decision should be justifiable - 'I could have worked dead but chose not to' is indefensible if an accident occurs.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: PPE and Equipment Safety */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            PPE and Equipment Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Personal Protective Equipment and properly rated test equipment form your final line of defence. They won't prevent faults, but they reduce the severity of harm if something goes wrong. Using inadequate or damaged PPE is not a calculated risk - it's negligence.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Test Equipment</p>
                <p className="text-white/90 text-xs">CAT rated for environment, GS38 compliant probes, in calibration</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Insulating Gloves</p>
                <p className="text-white/90 text-xs">Correct class for voltage, inspected before use, clean and dry</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Eye Protection</p>
                <p className="text-white/90 text-xs">Safety glasses minimum, face shield for higher risk work</p>
              </div>
            </div>

            <p>
              GS38 specifies test probe requirements: maximum 4mm exposed metal (2mm preferred), finger barriers to prevent slip, fused leads for protection against fault current, and robust insulation. Your test equipment is only as safe as its weakest element - damaged leads or worn probes create danger.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A test lead with cracked insulation exposes you to shock risk during testing. The probe tip touching live parts is normal - the cracked insulation allowing your finger to contact the conductor is not. Inspect leads before each use; replace damaged equipment immediately.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Fault Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess risks: What hazards exist? What controls are needed?</li>
                <li>Check equipment: Is your tester suitable, in date, undamaged?</li>
                <li>Plan isolation: Where will you isolate? Do you have lock-off equipment?</li>
                <li>Consider the fault: Does the fault itself create additional hazards?</li>
                <li>Check environment: Damp conditions, confined spaces, asbestos risk?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain isolation: Keep your lock in place; don't let others reset</li>
                <li>Work dead where possible: Only go live when dead testing can't answer the question</li>
                <li>One-hand technique: If live testing, keep one hand away from live parts</li>
                <li>Stay alert: Don't rush, don't get complacent, question unexpected results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trusting others' isolation</strong> - Always prove dead yourself</li>
                <li><strong>Skipping the second prove</strong> - Tester might have failed during use</li>
                <li><strong>Working live for convenience</strong> - Only when genuinely necessary</li>
                <li><strong>Using damaged PPE</strong> - Inspect before use; replace if in doubt</li>
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
                <p className="font-medium text-white mb-1">Safe Isolation Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Identify the circuit</li>
                  <li>2. Switch off and isolate</li>
                  <li>3. Lock off and post warning</li>
                  <li>4. Prove tester - Test circuit - Prove tester</li>
                  <li>5. Begin work only when proved dead</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Live Working Requirements</p>
                <ul className="space-y-0.5">
                  <li>Unreasonable to work dead</li>
                  <li>Competent person only</li>
                  <li>Suitable PPE worn</li>
                  <li>Insulated tools used</li>
                  <li>Accompaniment where needed</li>
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
            <Link to="../level3-module4-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Diagnostic Sequence
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1-5">
              Next: Documentation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section1_4;
