import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Switchgear Selection - HNC Module 7 Section 1.1";
const DESCRIPTION = "Master LV switchgear selection for building services projects: LV switchboard types, MCCB vs ACB selection criteria, rated currents, short-circuit ratings, forms of separation, and type-tested assemblies to BS EN 61439.";

const quickCheckQuestions = [
  {
    id: "switchboard-definition",
    question: "What is the primary function of an LV switchboard?",
    options: ["To generate electrical power", "To distribute and control electrical power to downstream circuits", "To convert AC to DC power", "To measure energy consumption only"],
    correctIndex: 1,
    explanation: "An LV switchboard receives power from the incoming supply (transformer or main incomer) and distributes it to downstream circuits via protective devices, providing switching, protection, and isolation functions."
  },
  {
    id: "mccb-acb-difference",
    question: "What is the key operational difference between an MCCB and an ACB?",
    options: ["MCCBs are for DC only, ACBs are for AC only", "ACBs are withdrawable for maintenance without de-energising the busbar", "MCCBs have higher breaking capacities than ACBs", "There is no significant difference"],
    correctIndex: 1,
    explanation: "ACBs (Air Circuit Breakers) are typically withdrawable, allowing removal for maintenance while the busbar remains energised. MCCBs are generally fixed-mount devices requiring isolation of the supply for maintenance."
  },
  {
    id: "icu-ics-meaning",
    question: "What does Icu represent in switchgear ratings?",
    options: ["Rated continuous current", "Rated ultimate short-circuit breaking capacity", "Rated service voltage", "Rated impulse withstand voltage"],
    correctIndex: 1,
    explanation: "Icu (rated ultimate short-circuit breaking capacity) is the maximum fault current the device can safely interrupt. After breaking at Icu, the device may require inspection or replacement. Ics is the service short-circuit breaking capacity for continued operation."
  },
  {
    id: "form-separation",
    question: "What does Form 4 separation in a switchboard provide?",
    options: ["No internal separation", "Separation of busbars from functional units only", "Separation of busbars, functional units, and terminals from each other", "Separation of busbars and functional units, plus separation of all terminals from each other"],
    correctIndex: 3,
    explanation: "Form 4 provides the highest level of internal separation: busbars separated from functional units, functional units separated from each other, and terminals separated from each other. This allows work on one circuit while others remain live."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS EN 61439, what is a Type-Tested Assembly (TTA)?",
    options: [
      "An assembly tested only by the manufacturer",
      "An assembly conforming to an established design verified by type tests",
      "An assembly that requires on-site testing only",
      "An assembly with no specified test requirements"
    ],
    correctAnswer: 1,
    explanation: "A TTA is a switchgear assembly conforming to an established design, verified to meet BS EN 61439 requirements through type tests. The manufacturer holds test evidence for the design, ensuring compliance without requiring individual unit testing."
  },
  {
    id: 2,
    question: "When would you typically specify an ACB over an MCCB for main incomer protection?",
    options: ["For currents below 100A", "When withdrawable functionality and high breaking capacity are required", "When cost is the only consideration", "For final circuit protection"],
    correctAnswer: 1,
    explanation: "ACBs are specified for main incomers where withdrawable functionality enables maintenance without complete shutdown, and where high breaking capacities (up to 150kA) are needed. They also offer comprehensive protection settings and communication capabilities."
  },
  {
    id: 3,
    question: "What is the typical maximum rated current (In) range for MCCBs?",
    options: ["Up to 63A", "63A to 250A", "100A to 1600A", "Above 2000A only"],
    correctAnswer: 2,
    explanation: "MCCBs typically range from 100A to 1600A rated current, with some manufacturers offering frames up to 2500A or 3200A. Below 100A, MCBs are generally more economical; above 1600A, ACBs become more practical."
  },
  {
    id: 4,
    question: "What is the significance of Ics/Icu = 100% on a circuit breaker?",
    options: [
      "The device can only operate once at fault level",
      "The device can continue normal operation after interrupting at its ultimate breaking capacity",
      "The device requires replacement after any fault",
      "The device has no service breaking capacity"
    ],
    correctAnswer: 1,
    explanation: "When Ics equals Icu (100%), the circuit breaker can interrupt at its maximum rated fault level and remain serviceable for continued operation without inspection or replacement. Lower percentages indicate reduced capability after ultimate fault interruption."
  },
  {
    id: 5,
    question: "Which form of internal separation requires barriers between the terminals of all functional units?",
    options: ["Form 1", "Form 2", "Form 3", "Form 4"],
    correctAnswer: 3,
    explanation: "Form 4 requires separation of terminals belonging to different functional units from each other. Form 4a separates terminals in a common space, while Form 4b provides individual enclosure for each functional unit's terminals."
  },
  {
    id: 6,
    question: "What does the short-circuit withstand rating (Icw) indicate for a switchboard?",
    options: [
      "Maximum current the board can switch",
      "Maximum fault current the busbars can carry for a specified time without damage",
      "Normal operating current capacity",
      "Maximum voltage rating"
    ],
    correctAnswer: 1,
    explanation: "Icw (rated short-time withstand current) is the fault current the switchboard busbars and structure can carry for a specified duration (typically 1 second) without damage. This ensures discrimination by allowing upstream devices time to operate."
  },
  {
    id: 7,
    question: "For a 2000A main LV switchboard with 50kA prospective fault current, which device type is most appropriate for the main incomer?",
    options: ["MCB", "MCCB 400A frame", "MCCB 2500A frame", "ACB"],
    correctAnswer: 3,
    explanation: "At 2000A with 50kA fault level, an ACB is most appropriate. It provides adequate current rating, sufficient breaking capacity, withdrawable functionality for maintenance, and comprehensive protection features essential for main incomer applications."
  },
  {
    id: 8,
    question: "What is a Partially Type-Tested Assembly (PTTA)?",
    options: [
      "An assembly with no testing performed",
      "An assembly using type-tested components but requiring design verification for non-tested arrangements",
      "An assembly tested after installation only",
      "An assembly that fails type testing"
    ],
    correctAnswer: 1,
    explanation: "A PTTA uses type-tested components and arrangements but includes elements not covered by type tests. The manufacturer must use design rules derived from type tests to verify compliance, with calculations and assessment replacing full testing."
  },
  {
    id: 9,
    question: "Which standard specifically covers low-voltage switchgear and controlgear assemblies?",
    options: ["BS 7671", "BS EN 61439", "BS EN 60947", "BS EN 62271"],
    correctAnswer: 1,
    explanation: "BS EN 61439 covers low-voltage switchgear and controlgear assemblies (switchboards, distribution boards, motor control centres). BS EN 60947 covers individual switching devices, while BS 7671 is the wiring regulations."
  },
  {
    id: 10,
    question: "When selecting an MCCB, what does the frame size primarily determine?",
    options: [
      "Only the physical dimensions",
      "The maximum settable current rating and breaking capacity range",
      "The type of mounting only",
      "The colour of the device"
    ],
    correctAnswer: 1,
    explanation: "Frame size determines the maximum rated current achievable with that frame (e.g., 250A frame, 630A frame) and typically defines the available breaking capacity options. Larger frames provide higher current ratings and usually higher breaking capacities."
  },
  {
    id: 11,
    question: "What advantage does Form 3 separation provide over Form 2?",
    options: [
      "No additional advantage",
      "Separation of terminals from busbars in addition to functional unit separation",
      "Higher current rating capability",
      "Reduced cost"
    ],
    correctAnswer: 1,
    explanation: "Form 3 adds terminal separation from busbars to the functional unit separation of Form 2. This allows cable termination work while other circuits remain energised, improving safety and reducing downtime during modifications."
  },
  {
    id: 12,
    question: "For discrimination studies, which MCCB characteristic is most critical?",
    options: [
      "Physical size",
      "Time-current characteristics and adjustable settings",
      "Colour coding",
      "Manufacturer's warranty period"
    ],
    correctAnswer: 1,
    explanation: "Time-current characteristics define how the MCCB responds to overcurrent. Adjustable thermal (Ir) and magnetic (Im) settings enable coordination with upstream and downstream devices, ensuring the device nearest the fault operates first."
  }
];

const faqs = [
  {
    question: "When should I specify an ACB instead of an MCCB?",
    answer: "Specify ACBs for main incomers and major submains where: rated current exceeds 1600A; withdrawable functionality is required for maintenance without shutdown; high breaking capacities (&gt;50kA) are needed; comprehensive protection settings and communication interfaces are required; or where the installation demands enhanced safety features. For currents below 800A with moderate fault levels, MCCBs are often more economical while still providing adequate protection."
  },
  {
    question: "What factors determine the required form of separation?",
    answer: "Form selection depends on: operational requirements (can work proceed on one circuit while others are live?); maintenance frequency; safety policy and personnel competence; criticality of supply continuity; and client specification. Form 1 suits simple installations; Form 2 for typical commercial applications; Form 3/4 for critical facilities, hospitals, data centres, or where circuits must be worked on with adjacent circuits live."
  },
  {
    question: "How do I verify that a switchboard meets BS EN 61439?",
    answer: "Request the manufacturer's Declaration of Conformity and technical documentation showing: design verification (type tests or design rules); routine test results for the specific assembly; temperature-rise verification for the configuration supplied; short-circuit withstand evidence; and IP rating test evidence. For TTAs, type test reports should be available. For PTTAs, design calculations must demonstrate compliance."
  },
  {
    question: "What is the relationship between Icu and Ics?",
    answer: "Icu (ultimate) is the maximum fault current the device can interrupt, but operation at this level may require inspection or replacement. Ics (service) is the fault level at which the device remains fully serviceable after operation. The relationship (Ics as percentage of Icu) indicates reliability: 100% means full serviceability at maximum rating; 50% means serviceability is only assured up to half the ultimate rating."
  },
  {
    question: "How do I select the correct MCCB breaking capacity?",
    answer: "Calculate the prospective short-circuit current (PSCC) at the installation point using fault level calculations or measurements. The MCCB's Icu must exceed the PSCC. Consider: transformer rating and impedance; cable length and impedance to the board; any current-limiting devices upstream. Apply appropriate safety margins and consider future increases in supply capacity. Use Ics for the expected service fault level."
  },
  {
    question: "What documentation should accompany a type-tested assembly?",
    answer: "BS EN 61439 requires: identification of the assembly; circuit diagrams and wiring schedules; technical characteristics (voltage, current, Icw, IP rating); installation, operation, and maintenance instructions; routine test reports; Declaration of Conformity; and for TTAs, reference to the type test report. Additional project-specific documentation may include coordination studies and setting schedules."
  }
];

const HNCModule7Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1">
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
            <span>Module 7.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Switchgear Selection
          </h1>
          <p className="text-white/80">
            LV switchboards, MCCB vs ACB, rated currents, short-circuit ratings, and type-tested assemblies
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LV switchboards:</strong> Distribute power via MCCBs, ACBs, and MCBs</li>
              <li className="pl-1"><strong>MCCB:</strong> 100A-1600A, fixed mount, cost-effective</li>
              <li className="pl-1"><strong>ACB:</strong> 800A-6300A, withdrawable, high breaking capacity</li>
              <li className="pl-1"><strong>BS EN 61439:</strong> Standard for switchgear assemblies</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Selection Factors</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>In:</strong> Rated current must exceed load current</li>
              <li className="pl-1"><strong>Icu:</strong> Must exceed prospective fault current</li>
              <li className="pl-1"><strong>Form:</strong> Level of internal separation required</li>
              <li className="pl-1"><strong>TTA/PTTA:</strong> Assembly test verification method</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify LV switchboard configurations and their applications",
              "Compare MCCB and ACB characteristics for selection",
              "Apply rated current (In) and breaking capacity (Icu/Ics) criteria",
              "Specify forms of separation (Forms 1-4) appropriately",
              "Distinguish between TTA and PTTA under BS EN 61439",
              "Select switchgear based on fault levels and operational requirements"
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

        {/* Section 1: LV Switchboard Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            LV Switchboard Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Low voltage switchboards are the central distribution point in electrical installations,
              receiving power from transformers or main supplies and distributing it to downstream
              circuits. Proper selection ensures safe operation, adequate protection, and efficient
              power distribution.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">LV Switchboard Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main incomer:</strong> ACB or MCCB receiving supply from transformer or upstream board</li>
                <li className="pl-1"><strong>Busbar system:</strong> Copper or aluminium bars distributing current to outgoing devices</li>
                <li className="pl-1"><strong>Outgoing circuits:</strong> MCCBs, MCBs, or fused switches protecting downstream circuits</li>
                <li className="pl-1"><strong>Metering:</strong> Current transformers and meters for monitoring and billing</li>
                <li className="pl-1"><strong>Protection relays:</strong> Electronic devices providing advanced protection functions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Switchboard Configurations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-ended</td>
                      <td className="border border-white/10 px-3 py-2">Single incomer feeding all outgoing circuits</td>
                      <td className="border border-white/10 px-3 py-2">Small commercial, non-critical loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double-ended</td>
                      <td className="border border-white/10 px-3 py-2">Two incomers with bus section switch</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced reliability, dual supplies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ring main</td>
                      <td className="border border-white/10 px-3 py-2">Multiple interconnected boards</td>
                      <td className="border border-white/10 px-3 py-2">Large sites, industrial facilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">With standby</td>
                      <td className="border border-white/10 px-3 py-2">Generator or UPS integration</td>
                      <td className="border border-white/10 px-3 py-2">Critical facilities, hospitals, data centres</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Switchboard configuration directly impacts reliability, maintenance flexibility, and capital cost. Match configuration to the criticality and operational requirements of the installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: MCCB vs ACB Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            MCCB vs ACB Selection Criteria
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between Moulded Case Circuit Breakers (MCCBs) and Air Circuit Breakers (ACBs)
              depends on rated current, fault level, operational requirements, and budget. Each device
              type has distinct characteristics suited to specific applications.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCCB Characteristics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Rated current: 100A to 1600A typical</li>
                  <li className="pl-1">Breaking capacity: up to 70kA</li>
                  <li className="pl-1">Fixed or plug-in mounting</li>
                  <li className="pl-1">Thermal-magnetic or electronic trip</li>
                  <li className="pl-1">Compact design, cost-effective</li>
                  <li className="pl-1">Limited adjustability on basic units</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">ACB Characteristics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Rated current: 800A to 6300A</li>
                  <li className="pl-1">Breaking capacity: up to 150kA</li>
                  <li className="pl-1">Withdrawable for maintenance</li>
                  <li className="pl-1">Electronic trip unit standard</li>
                  <li className="pl-1">Comprehensive protection settings</li>
                  <li className="pl-1">Communication interfaces available</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Decision Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Choose MCCB</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Choose ACB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rated current</td>
                      <td className="border border-white/10 px-3 py-2">&lt;1600A</td>
                      <td className="border border-white/10 px-3 py-2">&gt;800A, especially &gt;1600A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fault level</td>
                      <td className="border border-white/10 px-3 py-2">&lt;50kA typical</td>
                      <td className="border border-white/10 px-3 py-2">&gt;50kA or high reliability required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Shutdown acceptable</td>
                      <td className="border border-white/10 px-3 py-2">Withdrawable needed, live busbar work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Protection</td>
                      <td className="border border-white/10 px-3 py-2">Basic overcurrent protection</td>
                      <td className="border border-white/10 px-3 py-2">Advanced functions, communication</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Budget</td>
                      <td className="border border-white/10 px-3 py-2">Cost-sensitive applications</td>
                      <td className="border border-white/10 px-3 py-2">Reliability justifies premium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Overlap Zone: 800A to 1600A</p>
              <p className="text-sm text-white">
                In the 800A-1600A range, both MCCB and ACB are viable. The decision hinges on:
                withdrawable requirement (ACB); fault level (&gt;50kA favours ACB); protection complexity
                (ACB for advanced settings); and total cost of ownership including maintenance downtime.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> For main incomers in commercial and industrial installations, ACBs provide superior reliability and maintenance flexibility despite higher initial cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Rated Currents and Breaking Capacities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Rated Currents and Short-Circuit Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the rated values of switchgear is essential for correct selection.
              These ratings ensure the device can handle normal operation and fault conditions
              without damage or danger.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Rated Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In</td>
                      <td className="border border-white/10 px-3 py-2">Rated current</td>
                      <td className="border border-white/10 px-3 py-2">Maximum continuous current without exceeding temperature rise limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ue</td>
                      <td className="border border-white/10 px-3 py-2">Rated operational voltage</td>
                      <td className="border border-white/10 px-3 py-2">Voltage at which device operates (typically 400V for LV)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Icu</td>
                      <td className="border border-white/10 px-3 py-2">Ultimate short-circuit breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Maximum fault current device can interrupt (may require replacement after)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ics</td>
                      <td className="border border-white/10 px-3 py-2">Service short-circuit breaking capacity</td>
                      <td className="border border-white/10 px-3 py-2">Fault current device can interrupt and remain serviceable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Icw</td>
                      <td className="border border-white/10 px-3 py-2">Short-time withstand current</td>
                      <td className="border border-white/10 px-3 py-2">Fault current withstood for specified duration (typically 1s) without damage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Icm</td>
                      <td className="border border-white/10 px-3 py-2">Rated short-circuit making capacity</td>
                      <td className="border border-white/10 px-3 py-2">Peak fault current device can close onto</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Icu Selection Process</p>
                <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                  <li className="pl-1">Calculate prospective fault current (PSCC)</li>
                  <li className="pl-1">Apply diversity/impedance factors</li>
                  <li className="pl-1">Select Icu &gt; PSCC at installation point</li>
                  <li className="pl-1">Consider future supply increases</li>
                  <li className="pl-1">Document selection rationale</li>
                </ol>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ics/Icu Ratios</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>25%:</strong> Budget devices, non-critical</li>
                  <li className="pl-1"><strong>50%:</strong> Standard commercial</li>
                  <li className="pl-1"><strong>75%:</strong> Enhanced reliability</li>
                  <li className="pl-1"><strong>100%:</strong> Critical applications, full serviceability</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Worked Example: Breaking Capacity Selection</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Transformer:</span> <span className="text-white">1000kVA, 6% impedance</span></p>
                <p><span className="text-white/60">Secondary voltage:</span> <span className="text-white">400V</span></p>
                <p><span className="text-white/60">PSCC at transformer:</span> <span className="text-white">I<sub>sc</sub> = kVA × 1000 / (√3 × V × Z%)</span></p>
                <p><span className="text-white/60">Calculation:</span> <span className="text-white">= 1000 × 1000 / (1.732 × 400 × 0.06) = 24.1kA</span></p>
                <p><span className="text-white/60">Selection:</span> <span className="text-white">MCCB with Icu ≥ 25kA (select 36kA for margin)</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Always verify the prospective fault current through calculation or measurement. Undersized breaking capacity creates serious safety risks during fault conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Forms of Separation and Type-Tested Assemblies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Forms of Separation and Type-Tested Assemblies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 61439 defines forms of internal separation to protect personnel working on one
              part of a switchboard from live parts in other areas. The standard also establishes
              verification requirements through type-tested and partially type-tested assemblies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Forms of Internal Separation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Form</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Separation Provided</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 1</td>
                      <td className="border border-white/10 px-3 py-2">No internal separation</td>
                      <td className="border border-white/10 px-3 py-2">Simple distribution boards, single-user access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 2a</td>
                      <td className="border border-white/10 px-3 py-2">Busbars separated from functional units; terminals not separated</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial switchboards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 2b</td>
                      <td className="border border-white/10 px-3 py-2">Form 2a plus terminals in same compartment as busbar</td>
                      <td className="border border-white/10 px-3 py-2">Modified commercial applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 3a</td>
                      <td className="border border-white/10 px-3 py-2">Busbars and functional units separated; terminals not separated from busbars</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, frequent maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 3b</td>
                      <td className="border border-white/10 px-3 py-2">Form 3a plus terminals separated from busbars</td>
                      <td className="border border-white/10 px-3 py-2">Higher safety requirement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 4a</td>
                      <td className="border border-white/10 px-3 py-2">Form 3b plus terminals separated from each other (in common space)</td>
                      <td className="border border-white/10 px-3 py-2">Critical facilities, hospitals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Form 4b</td>
                      <td className="border border-white/10 px-3 py-2">Form 3b plus terminals enclosed individually</td>
                      <td className="border border-white/10 px-3 py-2">Maximum safety, data centres</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Type-Tested Assembly (TTA)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Conforms to established tested design</li>
                  <li className="pl-1">Full type test evidence available</li>
                  <li className="pl-1">No design variations from tested configuration</li>
                  <li className="pl-1">Routine tests verify individual assembly</li>
                  <li className="pl-1">Highest level of verified performance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Partially Type-Tested Assembly (PTTA)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Uses type-tested components</li>
                  <li className="pl-1">Design rules derived from type tests</li>
                  <li className="pl-1">Calculations replace some testing</li>
                  <li className="pl-1">Allows design variations</li>
                  <li className="pl-1">More flexible, requires engineering expertise</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 61439 Verification Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Temperature rise:</strong> Verify conductors and components do not exceed limits under rated current</li>
                <li className="pl-1"><strong>Dielectric properties:</strong> Insulation must withstand rated impulse and power frequency voltages</li>
                <li className="pl-1"><strong>Short-circuit withstand:</strong> Assembly must withstand Icw for rated duration</li>
                <li className="pl-1"><strong>Protection circuits:</strong> Verify effectiveness of protective bonding</li>
                <li className="pl-1"><strong>Clearances and creepage:</strong> Minimum distances between live parts and earth</li>
                <li className="pl-1"><strong>Mechanical operation:</strong> Correct function of operating mechanisms</li>
                <li className="pl-1"><strong>IP rating:</strong> Ingress protection against solid objects and water</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Specifying Form of Separation</p>
              <div className="text-sm space-y-2">
                <p><strong>Form 1:</strong> Acceptable where only trained personnel access and full isolation is always applied.</p>
                <p><strong>Form 2:</strong> Standard for commercial buildings where circuit work requires isolation of affected circuits only.</p>
                <p><strong>Form 3:</strong> Required where cable termination must proceed with adjacent circuits energised.</p>
                <p><strong>Form 4:</strong> Essential for critical facilities requiring maximum flexibility and safety during live maintenance.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Specification note:</strong> Always specify form of separation in tender documents. Cost increases with form number, but Form 2 or higher is typical for most commercial and industrial applications.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Main Switchboard Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify switchgear for a 1600A main LV switchboard fed from a 1000kVA transformer (6% impedance).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate prospective fault current</p>
                <p>I<sub>sc</sub> = (1000 × 1000) / (1.732 × 400 × 0.06) = 24.1kA</p>
                <p className="mt-2 text-white/60">Step 2: Select main incomer device</p>
                <p>Options: 1600A MCCB (Icu 36kA) or 1600A ACB (Icu 65kA)</p>
                <p className="mt-2 text-white/60">Step 3: Evaluate requirements</p>
                <p>- Withdrawable preferred for maintenance flexibility</p>
                <p>- Communication interface for BMS integration required</p>
                <p>- Form 3b separation specified</p>
                <p className="mt-2 text-green-400">Selection: ACB 1600A, Icu 65kA, withdrawable</p>
                <p className="text-green-400">Rationale: Maintenance flexibility, adequate breaking capacity with margin, integration capability</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: MCCB Frame Size Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select MCCB for a 350A submain with 25kA prospective fault current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Requirements analysis:</p>
                <p>- Load current: 350A</p>
                <p>- PSCC: 25kA</p>
                <p>- Fixed mounting acceptable</p>
                <p className="mt-2 text-white/60">Frame size options:</p>
                <p>- 400A frame: Icu options 25kA, 36kA, 50kA</p>
                <p>- 630A frame: Higher capacity, oversized for application</p>
                <p className="mt-2 text-white/60">Selection process:</p>
                <p>Frame: 400A (minimum frame for 350A setting)</p>
                <p>Icu: 36kA (exceeds 25kA PSCC with margin)</p>
                <p>Trip unit: Electronic adjustable (Ir 0.4-1 × In, Im 1.5-10 × In)</p>
                <p className="mt-2 text-green-400">Selection: MCCB 400A frame, 350A setting, 36kA, electronic trip</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Form of Separation Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine form of separation for a data centre main switchboard.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Operational requirements:</p>
                <p>- 24/7 operation, no planned shutdowns</p>
                <p>- Regular circuit additions expected</p>
                <p>- Maintenance on individual circuits with others live</p>
                <p>- Multiple maintenance personnel may work simultaneously</p>
                <p className="mt-2 text-white/60">Assessment:</p>
                <p>- Form 1: Inadequate - no separation</p>
                <p>- Form 2: Inadequate - terminals not separated</p>
                <p>- Form 3: Marginal - functional units separated but terminals shared</p>
                <p>- Form 4: Optimal - full separation of all elements</p>
                <p className="mt-2 text-green-400">Specification: Form 4b</p>
                <p className="text-green-400">Rationale: Maximum safety for live working, individual terminal compartments enable simultaneous work on multiple circuits</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Switchgear Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Calculate maximum demand and select In with appropriate margin</li>
                <li className="pl-1">Determine prospective fault current at each switchboard location</li>
                <li className="pl-1">Select breaking capacity (Icu) exceeding PSCC</li>
                <li className="pl-1">Specify Ics/Icu ratio based on criticality</li>
                <li className="pl-1">Determine operational requirements (withdrawable, communication)</li>
                <li className="pl-1">Specify form of separation based on maintenance requirements</li>
                <li className="pl-1">Verify TTA or PTTA compliance with BS EN 61439</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">MCCB range: <strong>100A to 1600A</strong> typical</li>
                <li className="pl-1">ACB range: <strong>800A to 6300A</strong></li>
                <li className="pl-1">MCCB breaking capacity: <strong>up to 70kA</strong></li>
                <li className="pl-1">ACB breaking capacity: <strong>up to 150kA</strong></li>
                <li className="pl-1">Icw duration: <strong>typically 1 second</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Specification Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized breaking capacity</strong> - failure to calculate actual PSCC</li>
                <li className="pl-1"><strong>Ignoring Ics</strong> - specifying Icu only without considering service requirements</li>
                <li className="pl-1"><strong>Form underspecification</strong> - selecting Form 1 where live working is anticipated</li>
                <li className="pl-1"><strong>No growth margin</strong> - sizing exactly to current load without future capacity</li>
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
                <p className="font-medium text-white mb-1">Device Selection</p>
                <ul className="space-y-0.5">
                  <li>MCCB: 100A-1600A, up to 70kA</li>
                  <li>ACB: 800A-6300A, up to 150kA</li>
                  <li>ACB for withdrawable requirement</li>
                  <li>Icu must exceed PSCC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Forms of Separation</p>
                <ul className="space-y-0.5">
                  <li>Form 1: No internal separation</li>
                  <li>Form 2: Busbars separated</li>
                  <li>Form 3: Functional units separated</li>
                  <li>Form 4: All terminals separated</li>
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
            <Link to="../h-n-c-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section1-2">
              Next: Protection Coordination
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section1_1;
