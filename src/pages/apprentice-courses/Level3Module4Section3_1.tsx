/**
 * Level 3 Module 4 Section 3.1 - Ring and Radial Circuit Faults
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ring and Radial Circuit Faults - Level 3 Module 4 Section 3.1";
const DESCRIPTION = "Understand common faults in ring final circuits and radial circuits, including broken rings, crossed connections, high resistance joints, and diagnostic testing techniques.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the most common cause of a ring final circuit operating as two radial circuits?",
    options: [
      "Overloaded sockets causing MCB trips",
      "A break in the ring conductor at a termination or joint",
      "Incorrect cable sizing throughout the circuit",
      "RCD nuisance tripping"
    ],
    correctIndex: 1,
    explanation: "A broken ring occurs when there's a break in the conductor - usually at a loose termination or damaged cable joint. The ring then operates as two radial circuits from the consumer unit, each feeding sockets up to the break point. This can cause overloading of conductors."
  },
  {
    id: "check-2",
    question: "During ring final circuit testing, you find L1 to L2 reads 0.4 ohms, N1 to N2 reads 0.4 ohms, but CPC1 to CPC2 reads infinity. What does this indicate?",
    options: [
      "The ring is operating correctly",
      "There is a break in the CPC (earth) conductor",
      "The test instrument is faulty",
      "There is a short circuit on the ring"
    ],
    correctIndex: 1,
    explanation: "The infinity reading between CPC ends while L and N show continuity indicates the CPC has a break. This is extremely dangerous - sockets may have no effective earth connection, meaning fault current cannot flow and exposed metalwork could become live without tripping protection."
  },
  {
    id: "check-3",
    question: "A customer reports that only some sockets on a ring circuit work. The MCB is on. What fault should you investigate first?",
    options: [
      "Short circuit between live and neutral",
      "Open circuit in the ring - partial break affecting one leg",
      "RCD earth leakage fault",
      "Neutral-earth fault"
    ],
    correctIndex: 1,
    explanation: "With the MCB still on but only some sockets working, this indicates an open circuit rather than a short circuit (which would trip the MCB). A break in one leg of the ring means sockets on that side have no supply, while sockets on the other side continue working normally."
  },
  {
    id: "check-4",
    question: "What is a 'figure-of-eight' fault in a ring circuit?",
    options: [
      "A cable damaged in a figure-8 pattern",
      "Crossed polarity connections creating a figure-8 current path",
      "Eight sockets connected incorrectly",
      "A fault that trips the MCB eight times"
    ],
    correctIndex: 1,
    explanation: "A figure-of-eight fault occurs when conductors are cross-connected at an intermediate point - for example, L and N swapped at a junction. This creates a figure-8 current path that can cause unbalanced loading and may not be detected by simple end-to-end continuity testing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A ring final circuit continuity test shows: L1-L2 = 0.38 ohms, N1-N2 = 0.38 ohms, CPC1-CPC2 = 0.65 ohms. These values suggest:",
    options: [
      "The ring has a break in the line conductor",
      "Normal readings for a ring using 2.5mm2 L/N and 1.5mm2 CPC",
      "The neutral conductor is undersized",
      "There is a high resistance joint on the CPC"
    ],
    correctAnswer: 1,
    explanation: "These readings are typical for a ring using 2.5mm2 twin and earth cable. The CPC reading is higher because the earth conductor is 1.5mm2, which has higher resistance per metre than the 2.5mm2 line and neutral conductors. The readings being close indicates good continuity throughout."
  },
  {
    id: 2,
    question: "During the ring circuit r1+r2 test at the furthest point, you measure 1.1 ohms. What should you verify?",
    options: [
      "Nothing - any reading means the ring is complete",
      "That this value equals approximately (end-to-end L + end-to-end CPC) / 4",
      "That this value is exactly half the end-to-end readings",
      "That this value is less than 0.5 ohms"
    ],
    correctAnswer: 1,
    explanation: "The r1+r2 value at any socket should equal approximately (r1 + r2) / 4 where r1 is end-to-end line resistance and r2 is end-to-end CPC resistance. This formula accounts for the parallel paths in a ring. Significant deviation indicates a fault or interconnection issue."
  },
  {
    id: 3,
    question: "A radial circuit serving kitchen sockets keeps tripping the 20A MCB when multiple appliances are used. The cable is 2.5mm2. What is the most likely cause?",
    options: [
      "Earth fault on one of the appliances",
      "Circuit overload - load exceeds 20A rating",
      "Short circuit in the cable run",
      "Faulty MCB requiring replacement"
    ],
    correctAnswer: 1,
    explanation: "A kitchen radial circuit on 20A with 2.5mm2 cable can only supply 20A. Multiple high-power appliances (kettle 3kW = 13A, toaster 2kW = 8.7A) can easily exceed this. The MCB is correctly protecting the circuit from overload. The solution is load management or circuit upgrade."
  },
  {
    id: 4,
    question: "You discover that a ring circuit has a spur connected to a socket that already has two cables. This is:",
    options: [
      "Acceptable if the spur feeds only one socket",
      "A code violation - spurs can only connect to single-cable sockets",
      "Permitted if the total load is under 13A",
      "Allowed as long as the cable is 4mm2"
    ],
    correctAnswer: 1,
    explanation: "According to BS 7671 guidance, spurs should only be connected to sockets that form part of the ring (having one cable in and one out). A socket with two cables is already a junction point. Connecting a spur creates an uncontrolled branch that can lead to overloading."
  },
  {
    id: 5,
    question: "What symptom would indicate a high resistance joint in a ring circuit?",
    options: [
      "Immediate MCB tripping when circuit is loaded",
      "Localised heating at the joint, possible discolouration, voltage drop under load",
      "RCD tripping every few hours",
      "Complete circuit failure with no supply"
    ],
    correctAnswer: 1,
    explanation: "High resistance joints cause localised heating (P=I2R) and voltage drop under load. The joint may show discolouration, melted plastic, or burning smell. This fault is dangerous because it may not trip protective devices while generating enough heat to start a fire."
  },
  {
    id: 6,
    question: "During ring testing, the r1+r2 values vary significantly between sockets - some are 0.8 ohms, others are 1.4 ohms. This indicates:",
    options: [
      "Normal variation in a ring circuit",
      "Different socket manufacturers used",
      "A break in the ring causing some sockets to be fed from one direction only",
      "The test instrument needs calibration"
    ],
    correctAnswer: 2,
    explanation: "In a complete ring, r1+r2 should be similar at all points because current can flow either way around the ring. Large variations indicate a break - sockets near one end of a broken ring show low readings, while those near the break show high readings as current must travel the long way."
  },
  {
    id: 7,
    question: "A homeowner has added a double socket to their ring circuit by cutting into the ring cable in the loft. What is the primary concern?",
    options: [
      "The socket may not be IP rated for loft installation",
      "The ring may now be operating as two radials with inadequate conductor sizing",
      "The MCB rating may be too high",
      "There is no concern if connections are correct"
    ],
    correctAnswer: 1,
    explanation: "If the loft socket is wired incorrectly (e.g., cable cut and only one end connected, or poor joint), the ring operates as two radials. Each radial would be protected by a 32A device but using 2.5mm2 cable intended for ring current sharing - potentially dangerous overloading."
  },
  {
    id: 8,
    question: "What test would identify a figure-of-eight cross-connection fault in a ring circuit?",
    options: [
      "Standard end-to-end continuity test",
      "Insulation resistance testing",
      "Cross-referencing r1+r2 readings at multiple sockets around the ring",
      "RCD trip time testing"
    ],
    correctAnswer: 2,
    explanation: "End-to-end continuity may show acceptable readings with a cross-connection. Testing r1+r2 at multiple points reveals the fault - readings will be inconsistent and may exceed expected values at some locations because the cross-over creates different path lengths."
  },
  {
    id: 9,
    question: "A 4mm2 radial circuit for an electric shower is tripping its 40A MCB. Insulation resistance tests 250 megohms. What is the most likely fault?",
    options: [
      "Earth fault on the circuit",
      "Short circuit at the shower unit",
      "Shower element partially failed, drawing excessive current",
      "Loose connection causing arcing"
    ],
    correctAnswer: 2,
    explanation: "Good insulation resistance rules out earth faults and short circuits. A partially failed shower element can increase current draw beyond the MCB rating. Electric showers draw high currents (9.5kW = 41.3A at 230V) - if the element develops a low-resistance fault, current exceeds the MCB rating."
  },
  {
    id: 10,
    question: "When testing ring continuity, you discover the builder installed two separate radial circuits to the consumer unit instead of a ring. What action is required?",
    options: [
      "No action - radials are safer than rings",
      "Replace the 32A MCB with two 20A MCBs and separate the circuits",
      "Connect the cables to form a ring",
      "Install RCD protection and leave as is"
    ],
    correctAnswer: 1,
    explanation: "Two radials on a single 32A MCB means each 2.5mm2 cable could carry up to 32A, exceeding its current carrying capacity. The solution is either to properly complete the ring, or provide each radial with appropriate protection (typically 20A for 2.5mm2) on separate MCB ways."
  },
  {
    id: 11,
    question: "A ring circuit shows correct end-to-end readings, but several sockets have no earth continuity to the consumer unit. The most likely cause is:",
    options: [
      "Faulty earth terminal at the consumer unit",
      "Broken CPC within the cable, possibly from installation damage",
      "Incorrect cable installed without CPC",
      "The ring was installed as Class II"
    ],
    correctAnswer: 1,
    explanation: "End-to-end CPC readings can appear correct if the break is mid-circuit and both 'ends' still connect through. However, individual sockets between the break and one end may lose earth continuity. This commonly occurs where cables are damaged - the small CPC (1.5mm2) breaks first."
  },
  {
    id: 12,
    question: "You are fault-finding on a radial circuit where the voltage at the socket measures 215V with load connected, but 232V with no load. This indicates:",
    options: [
      "Supply voltage problems from the DNO",
      "High resistance in the circuit causing excessive voltage drop",
      "Neutral fault in the installation",
      "Faulty multimeter readings"
    ],
    correctAnswer: 1,
    explanation: "17V drop under load indicates high resistance in the circuit - likely a loose termination or damaged conductor. BS 7671 limits voltage drop to 5% (11.5V) for lighting and 5% for power. This excessive drop suggests a high resistance joint that requires investigation and repair."
  }
];

const faqs = [
  {
    question: "How can I tell if a ring circuit has been extended with too many spurs?",
    answer: "Count the non-fused spurs - BS 7671 guidance suggests non-fused spurs should not exceed the number of sockets/FCUs on the ring itself. Also check that no spur feeds more than one single or one twin socket. Multiple spurs from one socket or spurs feeding multiple outlets indicate non-compliance that should be addressed."
  },
  {
    question: "Why does my ring circuit test show different readings at different sockets?",
    answer: "In a healthy ring, r1+r2 readings should be similar at all points (within 0.05 ohms typically). Variations indicate problems: a break in the ring causing unequal path lengths, a cross-connection, or high resistance joints. Test at multiple points and compare - consistent readings confirm ring integrity."
  },
  {
    question: "Can I convert a ring circuit to radials without rewiring?",
    answer: "Yes, but you must ensure each radial has appropriate protection for its cable size. Disconnect at the consumer unit, install separate MCBs for each cable (typically 20A for 2.5mm2), and verify each radial independently. Document the change. This is often done when ring faults are difficult to locate."
  },
  {
    question: "What causes intermittent socket failures on a ring circuit?",
    answer: "Intermittent failures usually indicate loose connections or damaged conductors that make/break contact with vibration, temperature changes, or loading. The fault is often at socket terminals, junction boxes, or where cables pass through walls/floors. Thermal imaging under load can reveal hot spots before complete failure."
  },
  {
    question: "How do I test for a neutral fault on a radial or ring circuit?",
    answer: "Measure voltage between line and neutral (should be approximately 230V), then between line and earth (should also be approximately 230V), then between neutral and earth (should be 0V or very low). If N-E shows significant voltage, there may be a neutral fault. Also measure R(n) continuity end-to-end on a ring - it should match line conductor values."
  },
  {
    question: "Why would a ring circuit work normally but fail insulation resistance testing?",
    answer: "The circuit may have degraded insulation that allows small leakage currents but not enough to trip RCDs or cause operational problems - yet. Common causes include: moisture ingress, damaged cable sections, deteriorated accessory backboxes, or connected equipment with poor insulation. Disconnect loads and test again to isolate whether the fault is fixed wiring or equipment."
  }
];

const Level3Module4Section3_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module4-section3">
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
            <span>Module 4.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ring and Radial Circuit Faults
          </h1>
          <p className="text-white/80">
            Diagnosing broken rings, interconnection problems, and distribution circuit failures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Broken ring:</strong> Circuit operates as two radials - overload risk</li>
              <li><strong>High resistance:</strong> Localised heating, voltage drop under load</li>
              <li><strong>Cross-connection:</strong> Figure-8 path, unbalanced loading</li>
              <li><strong>CPC break:</strong> No earth protection - shock hazard</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Varying r1+r2 readings = broken ring</li>
              <li><strong>Spot:</strong> Discoloured terminals = high resistance joint</li>
              <li><strong>Use:</strong> End-to-end test reveals continuity breaks</li>
              <li><strong>Use:</strong> Socket-by-socket r1+r2 confirms ring integrity</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify symptoms of broken ring circuits and their causes",
              "Test ring circuits systematically to locate faults",
              "Recognise figure-of-eight and cross-connection faults",
              "Diagnose high resistance joints in ring and radial circuits",
              "Understand the dangers of CPC discontinuity",
              "Apply appropriate remedial actions for common faults"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Ring Circuit Faults */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Ring Circuit Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring final circuits are the standard method for supplying socket outlets in UK domestic installations. The ring configuration allows current to flow in either direction from the consumer unit, effectively halving the current in each conductor compared to a radial circuit. However, this design creates unique failure modes that require specific diagnostic approaches.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The critical principle: why rings fail differently</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>A ring relies on BOTH legs being complete - break one and it becomes two radials</li>
                <li>32A MCB protection assumes current sharing between conductors</li>
                <li>If the ring breaks, each 2.5mm2 conductor might carry full load current</li>
                <li>2.5mm2 cable in normal conditions is rated around 20-24A, not 32A</li>
                <li>Result: potential overheating without MCB tripping</li>
              </ul>
            </div>

            <p>
              When a ring breaks, the MCB doesn't know - it still sees total circuit current within its rating. But that current is no longer shared between two paths. A broken ring with 25A total load would have each socket conductor carrying up to 25A (depending on fault location), exceeding the cable's thermal capacity. Over time, this degrades insulation and creates fire risk.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Reference:</strong> Regulation 433.1 requires conductors to be protected against overcurrent. A broken ring defeats this protection because the 32A MCB no longer correctly protects the reduced current capacity of a single radial leg.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Systematic Ring Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Systematic Ring Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper ring testing isn't just about confirming the circuit works - it's about verifying the ring configuration is intact. The three-stage test method (end-to-end, cross-connection, socket-by-socket) reveals different fault types and should always be completed fully, even if early stages appear normal.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 1: End-to-End</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test L1 to L2 at consumer unit</li>
                  <li>Test N1 to N2 at consumer unit</li>
                  <li>Test CPC1 to CPC2 at consumer unit</li>
                  <li>All should show low, consistent readings</li>
                  <li>Infinity = complete break in that conductor</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 2: Cross-Connection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Link L1 to L2 at consumer unit</li>
                  <li>Link N1 to N2 at consumer unit</li>
                  <li>Link CPC1 to CPC2 at consumer unit</li>
                  <li>This creates the figure-8 test configuration</li>
                  <li>Enables socket-by-socket testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 3: Socket Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test r1+r2 at each socket (L to CPC)</li>
                  <li>Readings should be consistent</li>
                  <li>Maximum reading = (r1 + r2) / 4</li>
                  <li>Record highest for Zs calculation</li>
                  <li>Variations indicate faults</li>
                </ul>
              </div>
            </div>

            <p>
              The beauty of this method is that each stage reveals specific fault types. End-to-end testing shows complete breaks. Socket-by-socket testing reveals partial breaks, cross-connections, and high-resistance joints. By comparing readings around the ring, you can often pinpoint fault locations without destructive investigation.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A ring has end-to-end readings of L=0.4 ohms, N=0.4 ohms, CPC=0.65 ohms. After cross-connection, socket A shows r1+r2 = 0.26 ohms, socket B = 0.27 ohms, but socket C = 0.48 ohms. The high reading at C suggests a partial break or high-resistance joint between B and C, or between C and the next socket.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Radial Circuit Faults */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Radial Circuit Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Radial circuits are simpler than rings - current has only one path. This makes fault location more straightforward but also means any break causes total circuit failure downstream of the fault. Radial circuits are increasingly common in modern installations, particularly for specific loads like cookers, showers, and dedicated appliance circuits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common radial circuit faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Open circuit:</strong> Complete break - everything downstream is dead</li>
                <li><strong>High resistance joint:</strong> Voltage drop under load, localised heating</li>
                <li><strong>Insulation breakdown:</strong> RCD tripping, potential shock hazard</li>
                <li><strong>Overload:</strong> MCB trips under normal use - circuit undersized for load</li>
                <li><strong>Loose terminations:</strong> Intermittent failures, arcing, fire risk</li>
              </ul>
            </div>

            <p>
              Radial fault location uses the half-split method: disconnect at a midpoint and test each half. If the fault is in the first half, the second half will test clear. Continue splitting the faulty section until you isolate the problem. This is particularly effective for long radial runs or circuits with multiple junction points.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> For radial circuits feeding single high-power loads (showers, cookers), voltage drop testing under load often reveals high-resistance faults. Measure voltage at the load while operating - if it drops significantly below 230V (more than 5%), investigate the circuit for poor connections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Complex Fault Scenarios */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Complex Fault Scenarios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real-world fault finding often involves multiple issues or faults that don't present clearly. Cross-connection faults, intermittent breaks, and interconnected problems require systematic diagnosis and sometimes creative testing approaches to resolve.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Figure-of-Eight Cross-Connection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Conductors crossed at intermediate point</li>
                  <li>End-to-end tests may appear normal</li>
                  <li>Socket r1+r2 readings vary unexpectedly</li>
                  <li>Can cause unbalanced conductor loading</li>
                  <li>Often from DIY additions or alterations</li>
                  <li>Requires conductor-by-conductor tracing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interconnected Rings</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Two rings accidentally connected</li>
                  <li>End-to-end shows four conductors</li>
                  <li>Confusing test results</li>
                  <li>May work normally but exceeds design assumptions</li>
                  <li>Common in properties with extensions</li>
                  <li>Each ring should be independent</li>
                </ul>
              </div>
            </div>

            <p>
              Intermittent faults are the most challenging to diagnose. The circuit tests correctly when cold but fails under load or at certain times. These often involve thermal expansion at poor joints - the connection is adequate when cool but opens when heated by load current. Thermal imaging can reveal these faults by showing hot spots at connection points under load.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A ring circuit trips its MCB only on winter evenings. Investigation shows the ring is broken, but the customer's normal daytime load doesn't exceed the capacity of a single radial leg. In the evening, with heating, lighting, and cooking, total load increases enough to trip the MCB. The break has been present for months but only manifests under high load.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ring Circuit Fault-Finding Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always complete all three stages of ring testing, even if early stages seem normal</li>
                <li>Record readings at every socket - patterns reveal fault locations</li>
                <li>If end-to-end readings differ significantly from expected values, investigate before proceeding</li>
                <li>Remember: expected resistance = 2 x (cable length in metres) x (conductor resistance per metre)</li>
                <li>For 2.5mm2 copper: approximately 7.41 milliohms per metre at 20 degrees C</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Locating Breaks Without Opening Every Socket</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Map the socket locations and estimate cable route</li>
                <li>Inconsistent r1+r2 readings point toward fault location</li>
                <li>The highest reading is typically nearest the fault</li>
                <li>Use TDR (Time Domain Reflectometer) for precise break location if available</li>
                <li>Consider thermal imaging under load for high-resistance faults</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping socket-by-socket testing</strong> - End-to-end tests alone won't reveal all faults</li>
                <li><strong>Assuming two cables = ring</strong> - Could be radials or interconnected circuits</li>
                <li><strong>Ignoring slightly high readings</strong> - Today's marginal joint is tomorrow's fire</li>
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
                <p className="font-medium text-white mb-1">Ring Test Expected Values (30m 2.5/1.5mm2)</p>
                <ul className="space-y-0.5">
                  <li>L end-to-end: approximately 0.44 ohms</li>
                  <li>N end-to-end: approximately 0.44 ohms</li>
                  <li>CPC end-to-end: approximately 0.74 ohms</li>
                  <li>r1+r2 (max): approximately 0.30 ohms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fault Indicators</p>
                <ul className="space-y-0.5">
                  <li>Infinity reading = complete break</li>
                  <li>Variable r1+r2 = partial break</li>
                  <li>High single reading = high resistance joint</li>
                  <li>Very low reading = possible short</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section3-2">
              Next: Lighting Circuit Faults
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section3_1;
