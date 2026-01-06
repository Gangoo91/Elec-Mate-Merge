/**
 * Level 3 Module 4 Section 1.1 - Types of Faults
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Types of Faults - Level 3 Module 4 Section 1.1";
const DESCRIPTION = "Understand open circuit, short circuit, earth faults, high resistance joints and other common electrical fault types encountered in installations.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary characteristic of an open circuit fault?",
    options: [
      "Excessive current flow through a low resistance path",
      "Complete break in the circuit preventing current flow",
      "Current flowing to earth through insulation",
      "Fluctuating voltage at the load"
    ],
    correctIndex: 1,
    explanation: "An open circuit fault is a complete break in the current path - like a broken conductor or loose connection. No current can flow because the circuit is incomplete, which is why the load won't operate."
  },
  {
    id: "check-2",
    question: "A short circuit fault typically results in:",
    options: [
      "Very high current flow, causing protective devices to operate",
      "Gradual reduction in circuit voltage",
      "Intermittent operation of the load",
      "Increased resistance in the circuit"
    ],
    correctIndex: 0,
    explanation: "Short circuits create a low-resistance path that bypasses the normal load. This causes very high current flow (limited only by supply impedance), which should trip MCBs or blow fuses almost instantaneously."
  },
  {
    id: "check-3",
    question: "Why are high resistance joints particularly dangerous?",
    options: [
      "They cause immediate circuit failure",
      "They trip RCDs instantly",
      "They generate heat which can cause fires",
      "They reduce the earth fault loop impedance"
    ],
    correctIndex: 2,
    explanation: "High resistance joints are dangerous because they generate heat (P = I²R) at the connection point. This localised heating can damage insulation, cause arcing, and potentially start fires - often without tripping protective devices."
  },
  {
    id: "check-4",
    question: "An earth fault differs from a short circuit because:",
    options: [
      "It only occurs in three-phase systems",
      "Current flows to earth rather than between live conductors",
      "It never trips protective devices",
      "It only affects the neutral conductor"
    ],
    correctIndex: 1,
    explanation: "An earth fault specifically involves current flowing from a live conductor to earth (via the CPC, metalwork, or person). A short circuit is between live conductors (L-N or L-L). Earth faults are detected by RCDs; short circuits by overcurrent devices."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A customer reports that a socket outlet is completely dead with no power. The circuit MCB is still on. What type of fault is most likely?",
    options: [
      "Short circuit fault",
      "Earth fault",
      "Open circuit fault",
      "Overload condition"
    ],
    correctAnswer: 2,
    explanation: "A completely dead socket with the MCB still on indicates an open circuit - a break in the circuit preventing current flow. If it were a short circuit, the MCB would have tripped. The break could be a loose connection, broken conductor, or failed accessory."
  },
  {
    id: 2,
    question: "Which fault type is most likely to cause an RCD to trip but leave the MCB unaffected?",
    options: [
      "Open circuit",
      "Short circuit between live and neutral",
      "Earth fault",
      "High resistance joint"
    ],
    correctAnswer: 2,
    explanation: "RCDs detect imbalance between line and neutral currents - this occurs when current flows to earth instead of returning via neutral. A 30mA RCD trips when earth leakage exceeds 30mA, even if total circuit current is low. MCBs don't detect earth faults unless the fault current is high enough."
  },
  {
    id: 3,
    question: "What is transient fault behaviour?",
    options: [
      "A fault that only occurs at specific times of day",
      "A fault that appears intermittently and may clear itself temporarily",
      "A fault caused by transient voltage spikes",
      "A fault that transfers between circuits"
    ],
    correctAnswer: 1,
    explanation: "Transient faults are intermittent - they appear and disappear unpredictably. Examples include loose connections that only fail under vibration or thermal movement, or insulation that breaks down only when warm. These are notoriously difficult to diagnose."
  },
  {
    id: 4,
    question: "A ring final circuit shows correct continuity when tested cold, but the homeowner reports occasional socket failures during winter evenings. What fault type should you suspect?",
    options: [
      "Permanent open circuit",
      "Short circuit",
      "High resistance joint affected by thermal cycling",
      "Earth fault on the CPC"
    ],
    correctAnswer: 2,
    explanation: "Thermal cycling (cold-hot-cold) causes expansion and contraction that can affect poor connections. A high resistance joint might test acceptable when cold but fail under load when heated. Winter evenings mean high demand, generating more heat at weak joints."
  },
  {
    id: 5,
    question: "Which statement about series and parallel faults is correct?",
    options: [
      "Series faults increase current flow; parallel faults decrease it",
      "Series faults decrease current flow; parallel faults can cause excessive current",
      "Both types always trip protective devices immediately",
      "Series faults only occur in three-phase systems"
    ],
    correctAnswer: 1,
    explanation: "Series faults (open circuits, high resistance joints) are in the current path, reducing or stopping current flow. Parallel faults (short circuits, earth faults) create alternative paths that bypass normal resistance, allowing excessive current. Understanding this helps predict fault behaviour."
  },
  {
    id: 6,
    question: "An insulation resistance test shows 0.2 MΩ between line and earth on a lighting circuit. This indicates:",
    options: [
      "The circuit is in perfect condition",
      "An open circuit fault",
      "Degraded insulation with potential earth fault",
      "A short circuit between line and neutral"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires minimum 1 MΩ insulation resistance. 0.2 MΩ indicates significantly degraded insulation allowing leakage current to earth. This partial breakdown could worsen to a full earth fault, and may already be causing nuisance RCD tripping."
  },
  {
    id: 7,
    question: "What distinguishes an incipient fault from an established fault?",
    options: [
      "Incipient faults are always more dangerous",
      "Incipient faults are developing but haven't yet caused failure",
      "Established faults cannot be detected by testing",
      "Incipient faults only occur in new installations"
    ],
    correctAnswer: 1,
    explanation: "Incipient faults are in early stages of development - degrading insulation, corroding connections, or developing cracks. They haven't yet caused circuit failure but will worsen over time. Early detection through periodic inspection prevents them becoming established faults."
  },
  {
    id: 8,
    question: "A neutral-earth fault in a single-phase installation would most likely cause:",
    options: [
      "Immediate MCB tripping",
      "The RCD to trip when load is connected",
      "No apparent symptoms until neutral is disconnected",
      "Visible arcing at the consumer unit"
    ],
    correctAnswer: 2,
    explanation: "A N-E fault connects neutral to earth - current can return via either path. With intact neutral, the circuit works normally. If neutral breaks (open circuit), current returns via earth/CPC. This is dangerous as normally non-live metalwork becomes live, but may show no symptoms initially."
  },
  {
    id: 9,
    question: "Which fault type typically produces localised discolouration or burning at connection points?",
    options: [
      "Open circuit",
      "Earth fault",
      "High resistance joint",
      "Reverse polarity"
    ],
    correctAnswer: 2,
    explanation: "High resistance joints generate heat (P = I²R) at the poor connection. This heat causes discolouration of plastic, burning of insulation, and potentially melting of terminals. Visual inspection often reveals these tell-tale signs of overheating before complete failure."
  },
  {
    id: 10,
    question: "Why might a short circuit fault on a final circuit not trip the distribution board MCB?",
    options: [
      "Short circuits never trip MCBs",
      "The fault current is limited by circuit impedance and may exceed the final circuit MCB rating but not the DB MCB",
      "MCBs cannot detect short circuits",
      "Distribution board MCBs are not connected to final circuits"
    ],
    correctAnswer: 1,
    explanation: "Fault current depends on total circuit impedance (Zs). A short circuit on a long final circuit might produce 500A - enough to trip a 32A MCB instantly, but below the instantaneous trip threshold of a 100A main switch. Discrimination ensures only the faulty circuit isolates."
  },
  {
    id: 11,
    question: "What is the most common cause of intermittent earth faults in domestic installations?",
    options: [
      "Factory defects in cables",
      "Damaged insulation from DIY work, rodents, or mechanical damage",
      "Incorrect cable sizing",
      "Faulty meter equipment"
    ],
    correctAnswer: 1,
    explanation: "Intermittent earth faults often result from physical damage - nails or screws through cables, rodent gnawing, cables trapped or crushed during alterations. The damage creates a path to earth that may only make contact intermittently, causing unpredictable RCD tripping."
  },
  {
    id: 12,
    question: "A socket tester shows correct wiring, but the socket intermittently fails under load. Continuity testing shows values at the high end of acceptable. What is the likely fault?",
    options: [
      "Reversed polarity",
      "Missing earth",
      "High resistance connection requiring re-termination",
      "Overloaded circuit"
    ],
    correctAnswer: 2,
    explanation: "High-end continuity readings suggest connections are complete but have excessive resistance. Under load, the voltage drop across these high-resistance joints increases, potentially causing the socket to fail. Re-termination with properly tightened connections should resolve this."
  }
];

const faqs = [
  {
    question: "Can a fault be both a short circuit and an earth fault at the same time?",
    answer: "Yes - for example, if a live conductor contacts earthed metalwork, you have current flowing through a low-resistance unintended path (short circuit characteristic) to earth (earth fault characteristic). This is often called a 'line-to-earth short circuit'. It would typically be detected by both overcurrent devices (if fault current is high enough) and RCDs."
  },
  {
    question: "Why do some faults only appear when equipment is under load?",
    answer: "Load current generates heat (I²R heating). A marginal connection might conduct adequately when cool but fail when heated by load current - the thermal expansion can break the contact. Additionally, higher currents make voltage drops across high-resistance joints more significant, potentially causing equipment malfunction."
  },
  {
    question: "What is the difference between a fault and a defect?",
    answer: "A defect is a non-compliance with standards that may or may not cause immediate problems - like a missing label or inadequate cable support. A fault is an abnormal condition that affects circuit operation - no power, tripping, overheating. A defect can lead to a fault over time, which is why periodic inspection catches defects before they become faults."
  },
  {
    question: "How can I identify if a fault is in the fixed installation or in connected equipment?",
    answer: "Disconnect all loads and portable equipment from the circuit. If the fault clears (RCD stays on, insulation resistance improves), the problem is with connected equipment. If the fault persists, it's in the fixed installation. Always test the installation with equipment disconnected to establish a baseline."
  },
  {
    question: "Why might an earth fault not trip the RCD?",
    answer: "The earth fault current must exceed the RCD's rated residual operating current (typically 30mA) to cause tripping. Very high-resistance earth fault paths might limit current below this threshold. Also, if the fault is downstream of the RCD but returns to the supply via a path that doesn't pass through the RCD's CT, it won't be detected."
  },
  {
    question: "What causes neutral faults to be particularly hazardous?",
    answer: "In a TN system, if the neutral breaks while load is connected, the 'floating' neutral can rise towards line voltage. Connected equipment may be damaged, and in three-phase systems, single-phase loads can experience dangerous overvoltages. Neutral faults don't trip protective devices because no excess current flows."
  }
];

const Level3Module4Section1_1 = () => {
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
            <span>Module 4.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Faults
          </h1>
          <p className="text-white/80">
            Understanding open circuit, short circuit, earth faults, and high resistance conditions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Open circuit:</strong> Break in conductor - no current flows</li>
              <li><strong>Short circuit:</strong> Low resistance path - excessive current</li>
              <li><strong>Earth fault:</strong> Current to earth - RCD territory</li>
              <li><strong>High resistance:</strong> Poor connection - localised heating</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Dead circuit + MCB on = open circuit</li>
              <li><strong>Spot:</strong> Tripped MCB + burning smell = short circuit</li>
              <li><strong>Use:</strong> RCD trips = investigate earth fault</li>
              <li><strong>Use:</strong> Discoloured terminals = high resistance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and classify the main types of electrical faults",
              "Understand the electrical characteristics of each fault type",
              "Recognise how different faults affect protective devices",
              "Distinguish between series faults and parallel faults",
              "Understand transient and intermittent fault behaviour",
              "Predict fault symptoms based on fault type"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Open Circuit Faults */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Open Circuit Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An open circuit fault occurs when there is a complete break in the current path, preventing electricity from flowing to the load. Think of it as a gap in the road - traffic simply cannot pass. This is the most common fault type you'll encounter, yet it's often the easiest to conceptualise.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common causes of open circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Broken conductors - physical damage, fatigue, or corrosion</li>
                <li>Loose or disconnected terminations</li>
                <li>Failed switches or switch contacts</li>
                <li>Blown fuses (intentional open circuit)</li>
                <li>Burned-out elements in loads (lamp filaments, heating elements)</li>
                <li>Corroded connections that have lost continuity</li>
              </ul>
            </div>

            <p>
              The key characteristic of an open circuit is that no current flows through the break, so there's no voltage drop across the load - it simply doesn't work. However, the supply voltage is still present up to the point of the break, which is crucial for fault location. Using a voltmeter, you can trace along the circuit until you find where voltage disappears - that's your open circuit.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> An open circuit fault typically won't trip protective devices because no fault current flows. The MCB stays on, the RCD stays on - the circuit is simply incomplete.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Short Circuit Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Short Circuit Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A short circuit creates an unintended low-resistance path that bypasses the normal load. Instead of current flowing through the designed circuit with its intentional resistance, current takes the "shortcut" through the fault path. Because resistance is extremely low, current becomes extremely high - potentially thousands of amperes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Line-to-Neutral Short Circuit</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Direct contact between L and N conductors</li>
                  <li>Current limited only by cable and supply impedance</li>
                  <li>Detected by MCBs and fuses</li>
                  <li>Common cause: Damaged cables, crushed insulation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Line-to-Line Short Circuit (Three-phase)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Contact between two or three phase conductors</li>
                  <li>Very high fault currents (line voltage higher)</li>
                  <li>Can cause significant arcing and damage</li>
                  <li>May produce unbalanced supply conditions</li>
                </ul>
              </div>
            </div>

            <p>
              The prospective short-circuit current (PSCC) at any point depends on the total impedance from the supply transformer to that point. At the origin of an installation (meter position), PSCC might be 16kA or more. At a distant socket, it might be only 1kA due to added cable impedance. This is why we need to verify that protective devices can handle the available fault current.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A nail driven through a cable in a wall creates a direct short between line and neutral. Current jumps from perhaps 10A (normal load) to 800A (fault current). The 32A MCB detects this massive overcurrent and trips within milliseconds via its magnetic release mechanism.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Earth Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earth Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An earth fault occurs when current flows from a live conductor to earth through an unintended path. This might be through the circuit protective conductor (CPC), exposed metalwork, or - in the worst case - through a person. Earth faults are particularly dangerous because they can make normally safe metalwork live, creating shock hazards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The earth fault path matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Via CPC:</strong> Current returns through the designed earth path - detected by RCDs, potentially by overcurrent devices if fault current is high</li>
                <li><strong>Via extraneous metalwork:</strong> Current returns through water pipes, gas pipes, structural steel - may or may not be detected depending on path impedance</li>
                <li><strong>Via ground:</strong> Current flows into actual earth mass - low current due to high ground resistance, may not trip anything</li>
              </ul>
            </div>

            <p>
              RCDs detect earth faults by measuring the difference between current flowing out on the line conductor and returning on the neutral. Normally these are equal. If some current is escaping to earth, there's an imbalance. A 30mA RCD trips when this imbalance exceeds 30mA - far below the level that would trip an MCB, but enough to provide shock protection.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Earth faults can be low-current (RCD territory) or high-current (approaching short-circuit levels). A "bolted" earth fault - direct contact to well-bonded metalwork - can produce very high fault currents and will trip both RCDs and overcurrent devices.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: High Resistance Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            High Resistance Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High resistance faults (also called series resistance faults or "dry joints") occur when a connection or conductor has higher resistance than it should. Unlike open circuits, current still flows - but the resistance causes voltage drop and heat generation. These faults are insidious because they don't immediately trip protective devices, but can cause fires.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Voltage Drop</p>
                <p className="text-white/90 text-xs">V = IR at the fault causes reduced voltage at the load</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Heat Generation</p>
                <p className="text-white/90 text-xs">P = I²R concentrates heat at the high-resistance point</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Progressive Damage</p>
                <p className="text-white/90 text-xs">Heat damages insulation, worsening the fault</p>
              </div>
            </div>

            <p>
              Common causes include poorly tightened terminations, corroded connections, damaged conductor strands, and incompatible materials (aluminium-copper joints without proper treatment). The danger is that current flow is often below the MCB rating, so the protective device sees nothing wrong - meanwhile, a terminal is glowing red inside a plastic accessory.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 13A socket with a loose terminal connection develops 0.5Ω resistance at the joint. Drawing 13A, the power dissipated at the joint is P = 13² × 0.5 = 84.5W - like having a small heater inside your socket. Over time, this melts plastic, chars insulation, and can ignite nearby materials.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Initial Fault Classification</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask: "Is the circuit dead, or is something tripping?" Dead = likely open circuit. Tripping = likely short or earth fault</li>
                <li>Check which device tripped: MCB only = overcurrent/short. RCD = earth fault. Both = high-current earth fault</li>
                <li>Look for patterns: All circuits dead = supply issue. One circuit = fault on that circuit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Type Indicators</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Burning smell without tripping = high resistance fault (urgent investigation needed)</li>
                <li>Lights dimming under load = high resistance in supply or neutral</li>
                <li>Intermittent symptoms = loose connections, damaged cables, transient faults</li>
                <li>Equipment damage = likely overcurrent event (short circuit or overload)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Resetting MCBs without investigation</strong> - You need to know WHY it tripped before resetting</li>
                <li><strong>Assuming one fault type</strong> - Multiple faults can coexist, especially after damage events</li>
                <li><strong>Ignoring intermittent symptoms</strong> - Transient faults will likely become permanent faults</li>
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
                <p className="font-medium text-white mb-1">Fault Type by Symptom</p>
                <ul className="space-y-0.5">
                  <li>Dead circuit, MCB on = Open circuit</li>
                  <li>MCB trips instantly = Short circuit</li>
                  <li>RCD trips = Earth fault</li>
                  <li>Overheating = High resistance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Protective Device Response</p>
                <ul className="space-y-0.5">
                  <li>Open circuit = No device operation</li>
                  <li>Short circuit = MCB magnetic trip</li>
                  <li>Earth fault = RCD trip (if fitted)</li>
                  <li>High resistance = Often no trip</li>
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
            <Link to="../level3-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section1-2">
              Next: Symptoms & Indicators
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section1_1;
