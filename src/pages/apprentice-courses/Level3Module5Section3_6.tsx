/**
 * Level 3 Module 5 Section 3.6 - Prospective Fault Current and Verification of Protective Devices
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Prospective Fault Current and Verification of Protective Devices - Level 3 Module 5 Section 3.6";
const DESCRIPTION = "Master prospective fault current (Ipf) testing, protective device verification, breaking capacity requirements and coordination according to BS 7671 and GN3.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "At what location must prospective fault current (Ipf) be measured?",
    options: [
      "Only at the furthest point of the installation",
      "At the origin and at every relevant point where protective devices are installed",
      "Only at socket outlets",
      "Only at the main switch"
    ],
    correctIndex: 1,
    explanation: "Regulation 643.7.3.201 requires Ipf to be determined at the origin and at every relevant point where a protective device operates under fault conditions. This ensures each device has adequate breaking capacity for the fault current at its location."
  },
  {
    id: "check-2",
    question: "A consumer unit has a rated breaking capacity (Icn) of 6kA. What is the maximum Ipf that can exist at that location?",
    options: [
      "6kA or less",
      "10kA",
      "16kA",
      "There is no maximum"
    ],
    correctIndex: 0,
    explanation: "Regulation 434.5.1 requires that the breaking capacity of each protective device must not be less than the prospective fault current at its point of installation. If Ipf exceeds 6kA, devices with higher breaking capacity are required."
  },
  {
    id: "check-3",
    question: "When measuring prospective fault current, which reading should be recorded?",
    options: [
      "The lowest reading obtained",
      "The average of L-N and L-E readings",
      "The greater of the short-circuit current and earth fault current",
      "Only the L-N reading"
    ],
    correctIndex: 2,
    explanation: "GN3 states that the maximum Ipf is the greater of the prospective short-circuit current (L-N) and the prospective earth fault current (L-E). Both must be measured and the higher value recorded to ensure protective devices are adequately rated."
  },
  {
    id: "check-4",
    question: "A BS 88 fuse has a breaking capacity of 80kA. In what type of installation would this typically be required?",
    options: [
      "Domestic installations",
      "Commercial or industrial installations close to a large transformer",
      "All installations as standard",
      "Only TT system installations"
    ],
    correctIndex: 1,
    explanation: "Very high breaking capacities (80kA) are found in industrial fuses because fault currents near large transformers or substations can be extremely high. Domestic installations typically have much lower Ipf (usually below 16kA) and use devices with lower breaking capacity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the abbreviation Ipf stand for?",
    options: [
      "Internal protection factor",
      "Impedance of protective function",
      "Prospective fault current",
      "Insulation protection feature"
    ],
    correctAnswer: 2,
    explanation: "Ipf is the abbreviation for prospective fault current - the maximum current that would flow if a short circuit or earth fault occurred at a given point, before any protective device operates."
  },
  {
    id: 2,
    question: "According to BS 7671, what is the minimum breaking capacity (Icn) typically required for a domestic consumer unit?",
    options: [
      "3kA",
      "6kA",
      "10kA",
      "16kA"
    ],
    correctAnswer: 2,
    explanation: "BS EN 61439-3 for domestic consumer units typically requires devices rated for at least 10kA Icn. However, where DNO declares Ipf is 16kA or less, 16kA-rated units are often specified. Always verify actual Ipf at the installation."
  },
  {
    id: 3,
    question: "On a three-phase installation, what is the approximate relationship between single-phase and balanced three-phase fault current?",
    options: [
      "Three-phase is the same as single-phase",
      "Three-phase is approximately double the single-phase value",
      "Three-phase is approximately half the single-phase value",
      "There is no relationship"
    ],
    correctAnswer: 1,
    explanation: "As a rule of thumb, the maximum balanced three-phase prospective short-circuit current is approximately twice the single-phase value. This factor errs on the safe side for equipment selection purposes."
  },
  {
    id: 4,
    question: "Why does prospective fault current decrease further downstream from the origin?",
    options: [
      "Because voltage drops",
      "Because cable impedance increases the total fault loop impedance",
      "Because MCBs reduce the current",
      "It doesn't - Ipf remains constant"
    ],
    correctAnswer: 1,
    explanation: "Fault current is limited by the total impedance of the fault loop. As you move downstream, the additional cable resistance and reactance increase total impedance, reducing the maximum fault current. This is why Ipf is highest at the origin."
  },
  {
    id: 5,
    question: "What instrument is used to measure prospective fault current?",
    options: [
      "Insulation resistance tester",
      "Loop impedance tester with Ipf function",
      "Clamp meter",
      "Voltage indicator"
    ],
    correctAnswer: 1,
    explanation: "Prospective fault current is measured using a loop impedance tester that has a prospective fault current (Ipf or PSCC) function. The instrument measures the loop impedance and calculates the fault current using Ohm's law."
  },
  {
    id: 6,
    question: "What is the difference between Icn and Ics for circuit breakers?",
    options: [
      "There is no difference",
      "Icn is the maximum interrupt capacity, Ics is the service interrupt capacity",
      "Ics is always higher than Icn",
      "Icn is for DC, Ics is for AC"
    ],
    correctAnswer: 1,
    explanation: "Icn (rated ultimate short-circuit breaking capacity) is the maximum current the device can interrupt, potentially affecting its future performance. Ics (rated service short-circuit breaking capacity) is the current it can interrupt and remain fully operational afterwards."
  },
  {
    id: 7,
    question: "If the DNO states that maximum Ipf at the origin is 16kA, what breaking capacity should the main switch have?",
    options: [
      "6kA minimum",
      "10kA minimum",
      "16kA or greater",
      "Any capacity is acceptable"
    ],
    correctAnswer: 2,
    explanation: "Regulation 434.5.1 requires the breaking capacity to be not less than the prospective fault current. If Ipf is 16kA, all protective devices at the origin must have at least 16kA breaking capacity. Devices rated for higher values are acceptable."
  },
  {
    id: 8,
    question: "When testing Ipf, you connect the instrument between which conductors?",
    options: [
      "Line and neutral for PSCC, line and earth for earth fault current",
      "Only line and neutral",
      "Only line and earth",
      "Neutral and earth"
    ],
    correctAnswer: 0,
    explanation: "To measure prospective short-circuit current (PSCC), connect between line and neutral. To measure prospective earth fault current, connect between line and earth. Both values should be measured and the higher one recorded."
  },
  {
    id: 9,
    question: "What precaution is essential when measuring prospective fault current?",
    options: [
      "Isolate the supply first",
      "Measure downstream of a protective device rated for the anticipated Ipf",
      "Use insulated test leads only",
      "Remove all fuses"
    ],
    correctAnswer: 1,
    explanation: "Ipf testing is a live test. You must measure downstream of a protective device that is rated for the anticipated fault current. This ensures that if an actual fault occurs during testing, it will be safely interrupted."
  },
  {
    id: 10,
    question: "Where should the prospective fault current value be recorded?",
    options: [
      "Only on the test instrument memory",
      "On the EIC/EICR and schedule of test results",
      "Only verbally to the client",
      "It doesn't need to be recorded"
    ],
    correctAnswer: 1,
    explanation: "Ipf must be recorded on the Electrical Installation Certificate (EIC), Electrical Installation Condition Report (EICR), and the schedule of test results. This documents that the measurement was taken and protective devices are suitably rated."
  },
  {
    id: 11,
    question: "A measured Ipf of 4.5kA is obtained at a sub-distribution board. The MCBs have Icn of 6kA. Is this acceptable?",
    options: [
      "No - Ipf should be higher than Icn",
      "Yes - Icn (6kA) exceeds Ipf (4.5kA)",
      "No - you need 10kA MCBs minimum",
      "Cannot determine from this information"
    ],
    correctAnswer: 1,
    explanation: "The breaking capacity (6kA) exceeds the prospective fault current (4.5kA), satisfying Regulation 434.5.1. The MCBs are adequately rated to safely interrupt any fault at this location."
  },
  {
    id: 12,
    question: "What effect does a long cable run have on Ipf at the end of that run?",
    options: [
      "Ipf increases",
      "Ipf decreases",
      "Ipf remains the same",
      "Ipf becomes unpredictable"
    ],
    correctAnswer: 1,
    explanation: "Longer cable runs add more impedance to the fault loop, reducing the maximum fault current at the end of the run. This is why devices at sub-boards often have lower Ipf than at the origin, and may have lower breaking capacity requirements."
  }
];

const faqs = [
  {
    question: "What if I cannot measure Ipf because the supply is not connected?",
    answer: "If the supply is not yet connected, Ipf can be determined by enquiry to the DNO (they provide maximum values for their network) or by calculation using the known impedances. Record the source of the Ipf value (measured, DNO declared, or calculated) on the certificate."
  },
  {
    question: "Do I need to measure Ipf at every socket outlet?",
    answer: "No - Ipf measurement is required at the origin and at every point where a protective device is installed. Socket outlets don't contain protective devices, so Ipf is measured at the consumer unit/distribution board where the MCBs/RCBOs are located."
  },
  {
    question: "What should I do if measured Ipf exceeds the device breaking capacity?",
    answer: "This is a serious non-compliance. The protective device cannot safely interrupt a fault and could fail catastrophically (arc flash, explosion). The device must be replaced with one having adequate breaking capacity, or upstream protection must be provided. Record this as a C1 (potentially dangerous) observation."
  },
  {
    question: "Why might Ipf readings be inaccurate with solar PV or battery systems?",
    answer: "Grid-connected inverters and battery systems can contribute to fault current, but test instruments may not accurately measure this contribution. GN3 notes that Ipf measurements may not be accurate with grid-connected or island-mode inverters. Additional assessment may be required."
  },
  {
    question: "How do I verify protective device coordination (selectivity)?",
    answer: "Selectivity ensures that the device closest to the fault operates first, minimizing disruption. Verification can be done using manufacturer's selectivity tables, time-current characteristic curves, or by confirming the installation matches the designer's specification."
  },
  {
    question: "What is back-up protection and how does it relate to Ipf?",
    answer: "Back-up protection allows a downstream device with lower breaking capacity to be protected by an upstream device with higher capacity. The upstream device limits the let-through energy. This is permitted under Regulation 434.5.1 if coordination is verified with manufacturer's data."
  }
];

const Level3Module5Section3_6 = () => {
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
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
              <li><strong>Ipf:</strong> Maximum current at short circuit or earth fault</li>
              <li><strong>Test at:</strong> Origin and all protective device locations</li>
              <li><strong>Record:</strong> Greater of PSCC (L-N) and earth fault (L-E)</li>
              <li><strong>Breaking capacity:</strong> Must exceed measured Ipf</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Icn rating on MCBs (e.g., 6000, 10000)</li>
              <li><strong>Use:</strong> Compare Ipf reading with device Icn</li>
              <li><strong>Apply:</strong> Ensure all devices can safely interrupt faults</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Understanding Prospective Fault Current */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Prospective Fault Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prospective fault current (Ipf) is the maximum current that would flow at a given point in an installation if a short circuit or earth fault occurred, before any protective device operates to interrupt it. This value determines the breaking capacity required for protective devices at that location.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Two types of fault current to measure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Prospective short-circuit current (PSCC):</strong> Measured L-N, occurs during a line-neutral short circuit</li>
                <li><strong>Prospective earth fault current:</strong> Measured L-E, occurs during a line-earth fault</li>
                <li><strong>Record the greater value:</strong> This is the maximum Ipf the protective devices must handle</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Domestic</p>
                <p className="text-white/90 text-xs">Typically 1-6kA at origin</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Commercial</p>
                <p className="text-white/90 text-xs">Can reach 10-25kA</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Industrial</p>
                <p className="text-white/90 text-xs">May exceed 50kA near transformers</p>
              </div>
            </div>

            <p>
              Fault current is highest at the origin (closest to the supply transformer) and decreases further into the installation as cable impedance adds to the fault loop. This is why main switchgear requires higher breaking capacity than final circuit devices.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If a protective device attempts to interrupt a fault current exceeding its breaking capacity, it may fail catastrophically - potentially causing arc flash, fire, or explosion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Measuring Prospective Fault Current */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Measuring Prospective Fault Current
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ipf is measured using a loop impedance tester with a prospective fault current function. The instrument measures the loop impedance and calculates the fault current using Ohm's law (I = V/Z). This is a live test that must be performed with appropriate safety precautions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Ensure you are downstream of rated protection</li>
                  <li>2. Set instrument to Ipf or PSCC function</li>
                  <li>3. Measure between L-N for PSCC</li>
                  <li>4. Measure between L-E for earth fault current</li>
                  <li>5. Record the higher of the two values</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where to Test</p>
                <ul className="text-sm text-white space-y-1">
                  <li>At the origin (main switchgear)</li>
                  <li>At each distribution board</li>
                  <li>At sub-distribution boards</li>
                  <li>Where protective devices change rating</li>
                  <li>Where breaking capacity might be exceeded</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety precautions for live testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use GS38 compliant test leads with limited probe exposure</li>
                <li>Only test downstream of protective devices rated for expected Ipf</li>
                <li>Do not use fused leads alone as protection - fit temporary fuse if needed</li>
                <li>Be aware that RCDs may trip during testing</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> If supply is not yet connected, Ipf can be obtained from the DNO (they declare maximum values for their network) or calculated from known impedances. Always record the source of the value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Protective Device Breaking Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protective Device Breaking Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every protective device has a rated breaking capacity - the maximum fault current it can safely interrupt. Regulation 434.5.1 requires that the breaking capacity of each device must not be less than the prospective fault current at its point of installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Breaking capacity ratings for common devices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS EN 60898 MCBs:</strong> Icn 6, 10, 15, 20, or 25 kA</li>
                <li><strong>BS 3036 rewirable fuses:</strong> 1, 2, or 4 kA (S1A, S2A, S4A)</li>
                <li><strong>BS 88-2 cartridge fuses:</strong> 80 kA at 400V (System E)</li>
                <li><strong>BS EN 61009 RCBOs:</strong> Various, typically 6-10 kA</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Icn vs Ics</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Icn:</strong> Ultimate breaking capacity - maximum interrupt, may affect device performance</li>
                  <li><strong>Ics:</strong> Service breaking capacity - can interrupt and remain fully operational</li>
                  <li>Example: Icn 10kA might have Ics 7.5kA</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">If Ipf Exceeds Icn</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Device cannot safely interrupt fault</li>
                  <li>Risk of arc flash, explosion, fire</li>
                  <li>Non-compliant installation</li>
                  <li>Must upgrade or provide back-up protection</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Always verify that Icn or Ics (as applicable) exceeds the measured Ipf. For domestic installations, DNO declarations up to 16kA mean 16kA-rated consumer units are standard, but always measure to confirm.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Protective Device Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protective Device Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Coordination (selectivity) ensures that when a fault occurs, only the protective device closest to the fault operates, minimizing disruption to the rest of the installation. This requires careful selection of devices based on their time-current characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Verifying coordination:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Manufacturer's selectivity tables:</strong> Show device combinations that achieve selectivity</li>
                <li><strong>Time-current curves:</strong> Plot device characteristics to verify no overlap</li>
                <li><strong>Designer's specification:</strong> Confirm installed devices match the design</li>
                <li><strong>Discrimination margin:</strong> Upstream device should be slower or rated higher</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Back-up Protection</p>
                <p className="text-white/90 text-xs">Upstream device limits let-through energy</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Discrimination</p>
                <p className="text-white/90 text-xs">Nearest device operates first</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cascading</p>
                <p className="text-white/90 text-xs">Combined device operation</p>
              </div>
            </div>

            <p>
              For RCD coordination, time-delayed (Type S) RCDs are used upstream with non-delayed RCDs downstream. This ensures the downstream RCD trips first for faults on its circuits while the upstream RCD provides backup and remains closed.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 100mA Type S RCCB at the origin with 30mA non-delayed RCBOs on final circuits. A 20mA earth fault trips the RCBO in under 40ms while the RCCB (with 130ms delay) remains closed, maintaining supply to other circuits.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing Ipf</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test at the origin before testing at distribution boards</li>
                <li>Compare readings - downstream should be lower</li>
                <li>For three-phase, measure on each phase and record highest</li>
                <li>Note any significant variations between phases</li>
                <li>Consider effect of connected generation (PV, batteries)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Verifying Device Ratings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check Icn marking on each protective device</li>
                <li>Verify all devices at that location meet the Ipf</li>
                <li>Remember that Ics may be lower than Icn for some devices</li>
                <li>Check for back-up protection arrangements if Icn is marginal</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Not testing at origin:</strong> Highest Ipf location often missed</li>
                <li><strong>Recording only L-N:</strong> L-E fault current may be higher in some installations</li>
                <li><strong>Ignoring rewirable fuses:</strong> Only 1-4kA breaking capacity - often inadequate</li>
                <li><strong>Assuming DNO values:</strong> Always measure if supply is connected</li>
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
                <p className="font-medium text-white mb-1">Typical Breaking Capacities</p>
                <ul className="space-y-0.5">
                  <li>BS EN 60898 MCBs: 6, 10, 15, 20, 25 kA</li>
                  <li>BS 3036 fuses: 1, 2, 4 kA</li>
                  <li>BS 88-2 HRC fuses: up to 80 kA</li>
                  <li>Consumer units: typically 10-16 kA</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>643.7.3.201 - Ipf determination</li>
                  <li>434.5.1 - Breaking capacity requirement</li>
                  <li>434.1 - Protection against fault current</li>
                  <li>GN3 Section 2.6.16 - Ipf testing</li>
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
            <Link to="/study-centre/apprentice/level3-module5-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section4">
              Next: Commissioning
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section3_6;
