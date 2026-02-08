import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Functional Safety Principles - MOET Module 5 Section 3.5";
const DESCRIPTION = "Core principles of functional safety including safety lifecycle, safety integrity, ALARP, IEC 61508 framework, Machinery Directive compliance and Technical File requirements. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "func-safety-def",
    question: "What is functional safety?",
    options: [
      "Safety achieved by mechanical guards only",
      "The part of overall safety that depends on a system operating correctly in response to its inputs",
      "Safety achieved by training alone",
      "The absence of all risk"
    ],
    correctIndex: 1,
    explanation: "Functional safety is the part of overall safety that depends on the correct functioning of safety-related electrical, electronic and programmable electronic systems. If the safety system fails to operate when needed, the safety function is lost."
  },
  {
    id: "safety-lifecycle",
    question: "What is the safety lifecycle?",
    options: [
      "The lifespan of a safety component",
      "A structured series of phases from concept through decommissioning for managing functional safety",
      "The warranty period of safety equipment",
      "The time between proof tests"
    ],
    correctIndex: 1,
    explanation: "The safety lifecycle is a structured framework of activities from initial concept through design, implementation, validation, operation, maintenance and decommissioning. It ensures safety is considered at every stage."
  },
  {
    id: "alarp",
    question: "What does ALARP stand for?",
    options: [
      "Always Lower All Risk Parameters",
      "As Low As Reasonably Practicable",
      "Automated Level Assessment of Risk Points",
      "Annual Lifecycle Assessment Review Process"
    ],
    correctIndex: 1,
    explanation: "ALARP means risk should be reduced to a level that is As Low As Reasonably Practicable, balancing the cost and effort of risk reduction against the benefit gained. Further reduction is not required if it would be grossly disproportionate to the benefit."
  },
  {
    id: "systematic-vs-random",
    question: "What is the difference between a systematic failure and a random hardware failure?",
    options: [
      "There is no difference",
      "Systematic failures are caused by design or process errors; random hardware failures are caused by component degradation",
      "Systematic failures only occur in software",
      "Random failures are always more dangerous"
    ],
    correctIndex: 1,
    explanation: "Systematic failures result from errors in design, specification or procedures and are addressed by process quality measures. Random hardware failures result from physical degradation of components and are quantified probabilistically using MTTFd and PFHd."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which EU directive requires machinery placed on the market to be safe?",
    options: [
      "ATEX Directive 2014/34/EU",
      "Machinery Directive 2006/42/EC",
      "Low Voltage Directive 2014/35/EU",
      "EMC Directive 2014/30/EU"
    ],
    correctAnswer: 1,
    explanation: "The Machinery Directive 2006/42/EC sets essential health and safety requirements for machinery placed on the EU/UK market. It is retained in UK law as the Supply of Machinery (Safety) Regulations 2008."
  },
  {
    id: 2,
    question: "What is the purpose of a risk assessment in functional safety?",
    options: [
      "To calculate the machine production rate",
      "To identify hazards, estimate risk and determine the required risk reduction measures",
      "To determine the warranty period",
      "To select the cheapest components"
    ],
    correctAnswer: 1,
    explanation: "Risk assessment systematically identifies hazards, estimates the associated risks (severity and likelihood), and determines what risk reduction measures are needed to achieve an acceptable (ALARP) level."
  },
  {
    id: 3,
    question: "What are the three steps of risk reduction according to ISO 12100?",
    options: [
      "Design, test, document",
      "Inherently safe design, safeguarding, information for use",
      "Identify, assess, control",
      "Plan, do, check"
    ],
    correctAnswer: 1,
    explanation: "ISO 12100 specifies the three-step method: (1) inherently safe design measures, (2) safeguarding and complementary protective measures, (3) information for use (warnings, instructions, training)."
  },
  {
    id: 4,
    question: "What is a Safety Requirement Specification (SRS)?",
    options: [
      "A list of approved safety component suppliers",
      "A document defining the safety functions, their required performance and the conditions under which they must operate",
      "The user manual for a safety relay",
      "A maintenance schedule for safety devices"
    ],
    correctAnswer: 1,
    explanation: "The SRS defines each safety function including its required PL or SIL, response time, behaviour under fault conditions, the safety devices involved and the conditions under which it must operate. It is the basis for design and validation."
  },
  {
    id: 5,
    question: "What is proof testing in the context of functional safety?",
    options: [
      "Testing that the machine produces the correct product",
      "Periodic testing to detect dangerous hidden failures that are not revealed by automatic diagnostics",
      "A test performed only during initial commissioning",
      "Testing the operator's knowledge"
    ],
    correctAnswer: 1,
    explanation: "Proof testing (periodic testing) reveals dangerous failures that accumulate over time and are not detected by the system's own automatic diagnostics. The proof test interval directly affects PFH calculations."
  },
  {
    id: 6,
    question: "What is the difference between a systematic failure and a random hardware failure?",
    options: [
      "There is no difference",
      "Systematic failures are caused by design or process errors; random hardware failures are caused by component degradation",
      "Systematic failures only occur in software",
      "Random failures are more dangerous"
    ],
    correctAnswer: 1,
    explanation: "Systematic failures result from errors in design, specification or procedures (addressed by process quality). Random hardware failures result from physical degradation and are quantified probabilistically (MTTFd, PFHd)."
  },
  {
    id: 7,
    question: "What does the UKCA/CE marking on machinery indicate regarding safety?",
    options: [
      "The machine has been tested by the government",
      "The manufacturer declares conformity with applicable directives including essential health and safety requirements",
      "The machine is guaranteed to be risk-free",
      "The machine has passed a third-party inspection"
    ],
    correctAnswer: 1,
    explanation: "CE/UKCA marking is the manufacturer's declaration that the machinery conforms to all applicable directives. It is based on the manufacturer's own conformity assessment, which for most machinery does not require third-party involvement."
  },
  {
    id: 8,
    question: "What is a Technical File in the context of the Machinery Directive?",
    options: [
      "The machine's user manual",
      "Documentation demonstrating how the machine meets the essential requirements, including risk assessment, calculations and test reports",
      "A file containing the machine's technical specifications only",
      "The operator training records"
    ],
    correctAnswer: 1,
    explanation: "The Technical File contains all documentation proving the machine meets essential requirements: risk assessment, design documentation, safety calculations (SISTEMA reports), test records, standards applied, operating instructions and the Declaration of Conformity."
  },
  {
    id: 9,
    question: "What role does IEC 61508 play in functional safety?",
    options: [
      "It is specific to machine safety only",
      "It is the overarching functional safety standard for E/E/PE systems, from which sector-specific standards are derived",
      "It only applies to the nuclear industry",
      "It has been withdrawn and replaced"
    ],
    correctAnswer: 1,
    explanation: "IEC 61508 is the umbrella functional safety standard for electrical/electronic/programmable electronic systems. Sector-specific standards like ISO 13849 (machinery), IEC 61511 (process industry) and IEC 61513 (nuclear) are derived from it."
  },
  {
    id: 10,
    question: "What is meant by 'safety integrity'?",
    options: [
      "The physical strength of safety guards",
      "The probability of a safety-related system satisfactorily performing the required safety function under all stated conditions within a stated period of time",
      "The honesty of the safety officer",
      "The number of safety devices installed"
    ],
    correctAnswer: 1,
    explanation: "Safety integrity is the probability that the safety system will perform its intended safety function satisfactorily when required, under all foreseeable conditions and within the specified time. It is quantified as PFHd or PFD."
  },
  {
    id: 11,
    question: "Under the Machinery Directive, for how long must the Technical File be retained?",
    options: [
      "5 years",
      "At least 10 years after the last machine in the series is manufactured",
      "Until the machine is scrapped",
      "3 years after purchase"
    ],
    correctAnswer: 1,
    explanation: "The Machinery Directive requires the Technical File to be retained for at least 10 years after the date of manufacture of the last unit in the series. It must be available for inspection by market surveillance authorities."
  },
  {
    id: 12,
    question: "What does 'harmonised standard' mean in the context of the Machinery Directive?",
    options: [
      "A standard that all EU countries have agreed to use",
      "A standard whose reference is published in the Official Journal of the EU, providing a presumption of conformity with the essential requirements it covers",
      "A standard that is mandatory for all machines",
      "A standard written in all EU languages"
    ],
    correctAnswer: 1,
    explanation: "A harmonised standard has been adopted by CEN/CENELEC and its reference published in the Official Journal. Compliance with a harmonised standard gives a presumption of conformity with the specific essential requirements it covers, simplifying the conformity assessment."
  }
];

const faqs = [
  {
    question: "Who is responsible for functional safety on a machine?",
    answer: "The machine manufacturer (or the person who places the machine on the market) has primary responsibility under the Machinery Directive. They must perform the risk assessment, design appropriate safety measures, validate the safety system, compile the Technical File and issue the Declaration of Conformity. Users have responsibilities for correct installation, maintenance and periodic testing."
  },
  {
    question: "How often should proof tests be performed?",
    answer: "The proof test interval is determined during the safety system design and documented in the maintenance instructions. It depends on the required SIL/PL, the diagnostic coverage of automatic tests and the assumed useful life of components. Typical intervals range from monthly to annually. The interval directly affects the probability of failure calculations."
  },
  {
    question: "What happens if a machine does not meet the Machinery Directive?",
    answer: "A machine that does not comply with the Machinery Directive's essential health and safety requirements cannot legally be placed on the market or put into service in the UK/EU. Market surveillance authorities can require the machine to be withdrawn, recalled or modified. Serious non-compliance can result in prosecution of the manufacturer."
  },
  {
    question: "Is functional safety only about electrical systems?",
    answer: "No. While IEC 61508 focuses on E/E/PE (electrical/electronic/programmable electronic) systems, ISO 13849-1 covers all technologies including mechanical, hydraulic and pneumatic safety-related parts. Functional safety principles (lifecycle approach, risk assessment, validation) apply regardless of the technology used."
  },
  {
    question: "What is the difference between verification and validation in functional safety?",
    answer: "Verification checks that the safety system has been designed and built correctly according to the specification (are we building it right?). Validation checks that the safety system meets the user's actual requirements and performs correctly in the real application (are we building the right thing?). Both are required by ISO 13849-2."
  }
];

const MOETModule5Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3">
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
            <span>Module 5.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional Safety Principles
          </h1>
          <p className="text-white/80">
            Safety lifecycle, IEC 61508 framework, ALARP, Machinery Directive compliance and Technical File requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Functional safety:</strong> Depends on systems operating correctly in response to inputs</li>
              <li className="pl-1"><strong>Safety lifecycle:</strong> Concept, risk analysis, SRS, design, validation, operation, decommissioning</li>
              <li className="pl-1"><strong>ALARP:</strong> Risk reduced to As Low As Reasonably Practicable</li>
              <li className="pl-1"><strong>IEC 61508:</strong> Parent standard for all sector-specific safety standards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Proof testing:</strong> Periodic tests to reveal hidden dangerous failures</li>
              <li className="pl-1"><strong>Technical File:</strong> Must contain risk assessment, PL calculations and test records</li>
              <li className="pl-1"><strong>Compliance:</strong> Machinery Directive, CE/UKCA marking, Declaration of Conformity</li>
              <li className="pl-1"><strong>ST1426:</strong> Understand safety standards and compliance framework</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define functional safety and explain how it relates to overall machine safety",
              "Describe the safety lifecycle approach from concept to decommissioning",
              "Explain the three-step risk reduction method of ISO 12100",
              "Outline the relationship between IEC 61508 and sector-specific standards",
              "Describe Machinery Directive requirements including Technical File and Declaration of Conformity",
              "Explain proof testing, the ALARP principle and systematic versus random failures"
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
            What is Functional Safety?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional safety is the part of overall safety that depends on active systems operating correctly in response to their inputs. Unlike passive safety measures (guards, barriers, enclosures), functional safety relies on the correct functioning of safety-related electrical, electronic and programmable electronic (E/E/PE) control systems. If the safety system fails to operate when needed, or operates incorrectly, the safety function is lost.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Safety in Practice</p>
              <p className="text-sm text-white mb-3">
                Consider an emergency stop circuit — it is a functional safety system because:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Input:</strong> It must detect the E-stop activation (sensing element)</li>
                <li className="pl-1"><strong>Processing:</strong> The safety relay must process the input correctly (logic element)</li>
                <li className="pl-1"><strong>Output:</strong> Power must be removed from hazardous actuators (final element)</li>
                <li className="pl-1">All three elements must work correctly for the safety function to be performed</li>
                <li className="pl-1">The reliability of this chain is what functional safety standards quantify and verify</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The ALARP Principle</p>
              <p className="text-sm text-white mb-3">
                ALARP (As Low As Reasonably Practicable) is the fundamental risk acceptance principle:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Intolerable region:</strong> Risk is so high it cannot be justified — must be reduced regardless of cost</li>
                <li className="pl-1"><strong>ALARP region:</strong> Risk is tolerable only if further reduction is grossly disproportionate to the benefit</li>
                <li className="pl-1"><strong>Broadly acceptable region:</strong> Risk is negligible — no further action needed</li>
                <li className="pl-1">The burden of proof is on the duty holder to demonstrate that risk has been reduced to ALARP</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Functional safety is not about eliminating all risk — that is impossible. It is about reducing risk to an acceptable level through reliable safety systems that are designed, validated, maintained and tested throughout their lifecycle.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Safety Lifecycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC 61508 introduces the safety lifecycle — a structured framework that covers all phases from initial concept through to decommissioning. This systematic approach ensures that safety is considered at every stage, not just during initial design. Missing any phase can leave gaps that compromise safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Lifecycle Phases</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Concept and scope:</strong> Define the equipment under control, operating environment and safety system boundary</li>
                <li className="pl-1"><strong>Hazard and risk analysis:</strong> Identify all hazards, assess risk (severity x likelihood), determine tolerable risk level</li>
                <li className="pl-1"><strong>Safety Requirements Specification (SRS):</strong> Define each safety function, its required SIL/PL, response time and fault behaviour</li>
                <li className="pl-1"><strong>Design and development:</strong> Design the safety system to meet the SRS — select architectures, components and technologies</li>
                <li className="pl-1"><strong>Integration and validation:</strong> Integrate with the machine, perform functional tests, fault simulation and validation</li>
                <li className="pl-1"><strong>Operation and maintenance:</strong> Operate with defined proof test intervals, maintenance schedules and management-of-change procedures</li>
                <li className="pl-1"><strong>Modification:</strong> Any change must go through a formal management-of-change process, with re-assessment and re-validation</li>
                <li className="pl-1"><strong>Decommissioning:</strong> Safely decommission ensuring no residual hazards remain</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance Relevance</p>
              <p className="text-sm text-white">
                As a maintenance technician, you operate within the "operation and maintenance" phase of the safety lifecycle. Your activities — proof testing, fault diagnosis, component replacement, documentation — are all part of maintaining the safety integrity that was designed in. Failure to follow the maintenance procedures undermines the entire lifecycle.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Standards Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional safety standards form a hierarchy. IEC 61508 is the parent standard, and sector-specific standards are derived from it. Understanding this hierarchy helps when reading safety documentation and understanding why specific standards are referenced.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standards Hierarchy</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">IEC 61508</td><td className="border border-white/10 px-3 py-2">Parent — all E/E/PE safety systems</td><td className="border border-white/10 px-3 py-2">SIL 1-4</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">ISO 13849-1</td><td className="border border-white/10 px-3 py-2">Machinery — all technologies</td><td className="border border-white/10 px-3 py-2">PL a-e</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">IEC 62061</td><td className="border border-white/10 px-3 py-2">Machinery — E/E/PE only</td><td className="border border-white/10 px-3 py-2">SIL 1-3</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">IEC 61511</td><td className="border border-white/10 px-3 py-2">Process industry (chemical, oil and gas)</td><td className="border border-white/10 px-3 py-2">SIL 1-4</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">IEC 61513</td><td className="border border-white/10 px-3 py-2">Nuclear power</td><td className="border border-white/10 px-3 py-2">SIL 1-4</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">BS EN ISO 12100</td><td className="border border-white/10 px-3 py-2">Risk assessment methodology</td><td className="border border-white/10 px-3 py-2">Three-step risk reduction</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 12100 Three-Step Risk Reduction</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1 — Inherently safe design:</strong> Eliminate hazards through the design itself (reduce forces, speeds, energies; use inherently safe materials)</li>
                <li className="pl-1"><strong>Step 2 — Safeguarding:</strong> Apply guards, interlocks, safety devices and complementary protective measures for hazards that cannot be eliminated</li>
                <li className="pl-1"><strong>Step 3 — Information for use:</strong> Provide warnings, labels, operating instructions and training for residual risks</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The three steps must be applied in order. Information (Step 3) cannot substitute for guarding (Step 2), and guarding cannot substitute for inherently safe design (Step 1). Each step only addresses the residual risk remaining after the previous step.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Machinery Directive and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Machinery Directive 2006/42/EC (retained in UK law as the Supply of Machinery (Safety) Regulations 2008) is the legal framework that requires all machinery placed on the market to be safe. It sets Essential Health and Safety Requirements (EHSRs) that manufacturers must meet.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Manufacturer's Obligations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Risk assessment:</strong> Perform a thorough risk assessment specific to the machine</li>
                <li className="pl-1"><strong>Design to EHSRs:</strong> Design the machine to meet all applicable essential requirements</li>
                <li className="pl-1"><strong>Technical File:</strong> Compile comprehensive documentation proving compliance</li>
                <li className="pl-1"><strong>Declaration of Conformity:</strong> Issue a signed declaration listing the applicable directives and standards</li>
                <li className="pl-1"><strong>CE/UKCA marking:</strong> Affix the appropriate conformity marking</li>
                <li className="pl-1"><strong>Instructions:</strong> Provide operating instructions in the language of the user country</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical File Contents</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">General description and drawings of the machine</li>
                <li className="pl-1">Full risk assessment documentation</li>
                <li className="pl-1">List of essential requirements and how each is addressed</li>
                <li className="pl-1">Standards applied (and any deviations with justification)</li>
                <li className="pl-1">Design calculations for safety-related systems (SISTEMA reports)</li>
                <li className="pl-1">Test reports and validation records</li>
                <li className="pl-1">Operating instructions</li>
                <li className="pl-1">Declaration of Conformity</li>
              </ul>
              <p className="text-sm text-white mt-3">
                The Technical File must be retained for at least 10 years after the last machine in the series is manufactured and must be available for inspection by market surveillance authorities.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Harmonised standards:</strong> Standards like ISO 13849-1, IEC 62061 and BS EN 60204-1, when their references are published in the Official Journal, give a presumption of conformity with the specific EHSRs they cover. This does not replace the need for a machine-specific risk assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Proof Testing, Failure Types and Maintenance Role
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the types of failures and the role of proof testing is essential for maintenance technicians who are responsible for maintaining safety integrity throughout the operational life of the machine.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Failures</h3>
                <p className="text-sm text-white mb-2">
                  Caused by errors in design, specification, procedures or human factors:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Incorrect safety relay wiring</li>
                  <li className="pl-1">Wrong component specification</li>
                  <li className="pl-1">Software bugs in safety controllers</li>
                  <li className="pl-1">Inadequate installation procedures</li>
                  <li className="pl-1">Addressed by: quality processes, reviews, testing, competence</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Random Hardware Failures</h3>
                <p className="text-sm text-white mb-2">
                  Caused by physical degradation of components over time:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Contact wear in safety relays</li>
                  <li className="pl-1">Insulation breakdown</li>
                  <li className="pl-1">Component drift due to temperature cycling</li>
                  <li className="pl-1">Mechanical fatigue in switching devices</li>
                  <li className="pl-1">Addressed by: redundancy, diagnostics, proof testing, MTTFd data</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proof Testing</p>
              <p className="text-sm text-white mb-3">
                Proof testing (periodic testing, function testing) is the systematic testing of safety functions to reveal dangerous hidden failures that accumulate over time and are not detected by the system's own automatic diagnostics.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Interval:</strong> Determined during safety system design — typically monthly to annually depending on PL/SIL</li>
                <li className="pl-1"><strong>Scope:</strong> Must test the complete safety function from input through logic to output</li>
                <li className="pl-1"><strong>Fault conditions:</strong> Where safe to do so, simulate fault conditions (e.g., disconnecting feedback loop)</li>
                <li className="pl-1"><strong>Documentation:</strong> Record all results with date, tester, device serial numbers and findings</li>
                <li className="pl-1"><strong>Impact on PFH:</strong> The proof test interval directly affects the PFH calculation — missing tests degrades safety integrity</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians must understand the importance of proof testing, perform tests according to documented procedures, and recognise that skipping or delaying proof tests reduces the safety integrity of the system. Always document your tests and report any faults through the correct channels.
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Category and Performance Levels
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section3">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section3_5;
