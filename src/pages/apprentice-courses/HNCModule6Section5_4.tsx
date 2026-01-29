import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "ISO 50001 Energy Management Systems - HNC Module 6 Section 5.4";
const DESCRIPTION = "Master ISO 50001 energy management systems: Plan-Do-Check-Act cycle, energy policy development, energy planning, implementation and operation, checking and management review, certification requirements, and continual improvement strategies.";

const quickCheckQuestions = [
  {
    id: "iso50001-definition",
    question: "What is the primary purpose of ISO 50001?",
    options: ["To reduce carbon emissions only", "To provide a framework for establishing, implementing, and improving energy management systems", "To certify electrical installations", "To replace building regulations"],
    correctIndex: 1,
    explanation: "ISO 50001 provides organisations with a systematic framework for establishing, implementing, maintaining, and improving an energy management system (EnMS), enabling continual improvement in energy performance."
  },
  {
    id: "pdca-cycle",
    question: "What does the Plan-Do-Check-Act cycle represent in ISO 50001?",
    options: ["A one-time implementation process", "A continual improvement methodology for energy management", "A legal compliance checklist", "An annual audit requirement"],
    correctIndex: 1,
    explanation: "The PDCA cycle is a continual improvement methodology that underpins ISO 50001. It ensures organisations systematically plan improvements, implement them, check results, and act on findings to drive ongoing energy performance enhancement."
  },
  {
    id: "energy-baseline",
    question: "What is an energy baseline in ISO 50001?",
    options: ["The minimum energy consumption allowed", "A quantitative reference for comparing energy performance over time", "The target energy consumption level", "The national average energy usage"],
    correctIndex: 1,
    explanation: "An energy baseline is a quantitative reference point that provides the basis for comparison of energy performance. It is established using data from a specified period and is used to measure improvements against."
  },
  {
    id: "certification-requirement",
    question: "Which body typically certifies organisations to ISO 50001?",
    options: ["The local authority", "UKAS-accredited certification bodies", "The Health and Safety Executive", "Energy suppliers"],
    correctIndex: 1,
    explanation: "ISO 50001 certification is performed by independent certification bodies accredited by national accreditation bodies such as UKAS (United Kingdom Accreditation Service) in the UK."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which clause of ISO 50001 addresses 'Context of the organisation'?",
    options: [
      "Clause 4",
      "Clause 5",
      "Clause 6",
      "Clause 7"
    ],
    correctAnswer: 0,
    explanation: "Clause 4 'Context of the organisation' requires the organisation to determine external and internal issues relevant to its purpose and that affect its ability to achieve intended outcomes of the EnMS."
  },
  {
    id: 2,
    question: "What is an Energy Performance Indicator (EnPI)?",
    options: ["A meter reading", "A quantitative value or measure of energy performance", "An energy bill", "A certification mark"],
    correctAnswer: 1,
    explanation: "An EnPI is a quantitative value or measure of energy performance defined by the organisation. EnPIs are used to demonstrate energy performance improvement and may be expressed as simple metrics, ratios, or complex models."
  },
  {
    id: 3,
    question: "In the PDCA cycle, what occurs during the 'Check' phase?",
    options: [
      "Setting energy objectives",
      "Implementing energy saving measures",
      "Monitoring, measuring, analysing, and evaluating energy performance",
      "Taking corrective actions"
    ],
    correctAnswer: 2,
    explanation: "The 'Check' phase involves monitoring, measuring, analysing, and evaluating energy performance and the EnMS against energy policy, objectives, and targets, and reporting the results."
  },
  {
    id: 4,
    question: "What is a Significant Energy Use (SEU)?",
    options: [
      "Any energy use over 1000 kWh",
      "Energy use accounting for substantial energy consumption and/or offering considerable potential for improvement",
      "Only electricity consumption",
      "Energy used during peak hours"
    ],
    correctAnswer: 1,
    explanation: "SEUs are energy uses that account for substantial energy consumption and/or offer considerable potential for energy performance improvement. Organisations must identify and prioritise SEUs for management attention."
  },
  {
    id: 5,
    question: "How often must ISO 50001 certified organisations undergo surveillance audits?",
    options: [
      "Monthly",
      "Quarterly",
      "Annually (typically)",
      "Every three years only"
    ],
    correctAnswer: 2,
    explanation: "Certified organisations typically undergo annual surveillance audits between full recertification audits. The certification cycle is usually three years, with surveillance audits in years one and two."
  },
  {
    id: 6,
    question: "Which role has ultimate accountability for the EnMS in ISO 50001?",
    options: [
      "Energy Manager",
      "Facilities Manager",
      "Top Management",
      "External Auditor"
    ],
    correctAnswer: 2,
    explanation: "ISO 50001 requires top management to demonstrate leadership and commitment to the EnMS. They have ultimate accountability for energy performance and must ensure the EnMS achieves its intended outcomes."
  },
  {
    id: 7,
    question: "What must be included in an energy policy under ISO 50001?",
    options: [
      "Only cost reduction targets",
      "Commitment to continual improvement in energy performance",
      "Staff holiday entitlements",
      "Building structural specifications"
    ],
    correctAnswer: 1,
    explanation: "The energy policy must include commitments to continual improvement in energy performance, ensuring availability of information and resources, and compliance with applicable legal and other requirements."
  },
  {
    id: 8,
    question: "What is the relationship between ISO 50001 and ISO 14001?",
    options: [
      "They are identical standards",
      "They are incompatible",
      "ISO 50001 focuses on energy while ISO 14001 covers broader environmental management, but they share common structure",
      "ISO 50001 replaces ISO 14001"
    ],
    correctAnswer: 2,
    explanation: "Both standards use the High-Level Structure (HLS) and can be integrated. ISO 50001 specifically addresses energy management while ISO 14001 covers broader environmental aspects. Many organisations implement both together."
  },
  {
    id: 9,
    question: "During energy planning, what must be determined regarding legal requirements?",
    options: [
      "Only building regulations",
      "Legal and other requirements applicable to energy uses and consumption",
      "Employment law only",
      "International trade agreements"
    ],
    correctAnswer: 1,
    explanation: "Energy planning requires determination of legal requirements and other requirements related to energy uses, energy consumption, and energy efficiency that the organisation must comply with."
  },
  {
    id: 10,
    question: "What is documented information in ISO 50001 terminology?",
    options: [
      "Only paper documents",
      "Information required to be controlled and maintained by the organisation",
      "Email correspondence only",
      "Verbal instructions"
    ],
    correctAnswer: 1,
    explanation: "Documented information includes information required to be controlled and maintained, and the medium containing it. This replaces the previous terms 'documents' and 'records' used in earlier management system standards."
  },
  {
    id: 11,
    question: "What is the purpose of management review in ISO 50001?",
    options: [
      "To discipline staff",
      "To review the EnMS for continuing suitability, adequacy, and effectiveness",
      "To approve supplier invoices",
      "To design new buildings"
    ],
    correctAnswer: 1,
    explanation: "Management review ensures top management reviews the EnMS at planned intervals to ensure its continuing suitability, adequacy, and effectiveness, and alignment with strategic direction."
  },
  {
    id: 12,
    question: "Which of the following is NOT a benefit of ISO 50001 certification?",
    options: [
      "Reduced energy costs",
      "Improved corporate reputation",
      "Automatic exemption from all energy regulations",
      "Systematic approach to energy management"
    ],
    correctAnswer: 2,
    explanation: "ISO 50001 certification does not provide automatic exemption from energy regulations. However, it does provide benefits including reduced energy costs, improved reputation, and a systematic approach to managing energy."
  }
];

const faqs = [
  {
    question: "How long does ISO 50001 certification take to achieve?",
    answer: "Typical implementation takes 6-18 months depending on organisation size, complexity, and existing management systems. The process includes gap analysis, system development, implementation, internal audits, and certification audit. Organisations with existing ISO 14001 or ISO 9001 systems often achieve certification more quickly due to familiar processes and shared structure."
  },
  {
    question: "What is the difference between ISO 50001:2011 and ISO 50001:2018?",
    answer: "ISO 50001:2018 adopts the High-Level Structure (HLS) common to other ISO management system standards, making integration easier. Key changes include enhanced top management requirements, new concepts like 'context of the organisation' and 'risks and opportunities', clearer requirements for EnPIs and energy baselines, and strengthened requirements for collecting and analysing energy data."
  },
  {
    question: "Can small organisations implement ISO 50001?",
    answer: "Yes, ISO 50001 is scalable and applicable to organisations of all sizes and types. Small organisations can implement a simpler EnMS proportionate to their energy consumption and resources. The standard's flexibility allows organisations to determine the scope and complexity appropriate to their operations while still achieving certification."
  },
  {
    question: "How does ISO 50001 relate to ESOS in the UK?",
    answer: "The Energy Savings Opportunity Scheme (ESOS) requires large enterprises to conduct energy audits every four years. Organisations with ISO 50001 certification covering at least 90% of their energy consumption can use this to demonstrate ESOS compliance. This provides a significant incentive for larger UK organisations to pursue ISO 50001 certification."
  },
  {
    question: "What resources are needed to maintain ISO 50001 certification?",
    answer: "Maintaining certification requires ongoing commitment including: designated energy management personnel (may be part-time for smaller organisations), annual surveillance audits by the certification body, internal audits, management reviews, continuous monitoring of energy performance, and resources for improvement projects. The investment typically delivers positive return through energy savings."
  }
];

const HNCModule6Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5">
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
            <span>Module 6.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            ISO 50001 Energy Management Systems
          </h1>
          <p className="text-white/80">
            Plan-Do-Check-Act methodology, certification requirements, and continual improvement for energy performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ISO 50001:</strong> International standard for energy management systems</li>
              <li className="pl-1"><strong>PDCA cycle:</strong> Plan-Do-Check-Act for continual improvement</li>
              <li className="pl-1"><strong>EnPI:</strong> Energy Performance Indicators measure success</li>
              <li className="pl-1"><strong>Certification:</strong> Third-party verification by accredited bodies</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC systems:</strong> Major significant energy uses</li>
              <li className="pl-1"><strong>Lighting:</strong> Key area for energy improvement</li>
              <li className="pl-1"><strong>BMS integration:</strong> Critical for monitoring and control</li>
              <li className="pl-1"><strong>Submetering:</strong> Essential for energy performance tracking</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the structure and requirements of ISO 50001:2018",
              "Apply the Plan-Do-Check-Act cycle to energy management",
              "Develop energy policies and establish energy objectives",
              "Identify and manage significant energy uses (SEUs)",
              "Establish energy baselines and performance indicators",
              "Navigate the certification process and maintain compliance"
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

        {/* Section 1: ISO 50001 Structure and Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ISO 50001 Structure and Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 50001 is the international standard for energy management systems (EnMS), providing organisations
              with a systematic framework to manage energy use, improve efficiency, and reduce costs. First published
              in 2011 and revised in 2018, it adopts the High-Level Structure common to all ISO management system
              standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ISO 50001:2018 Clause Structure:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Clause 4:</strong> Context of the organisation - understanding internal and external issues</li>
                <li className="pl-1"><strong>Clause 5:</strong> Leadership - top management commitment and energy policy</li>
                <li className="pl-1"><strong>Clause 6:</strong> Planning - energy review, EnPIs, baselines, objectives</li>
                <li className="pl-1"><strong>Clause 7:</strong> Support - resources, competence, awareness, communication</li>
                <li className="pl-1"><strong>Clause 8:</strong> Operation - operational planning and control, design, procurement</li>
                <li className="pl-1"><strong>Clause 9:</strong> Performance evaluation - monitoring, internal audit, management review</li>
                <li className="pl-1"><strong>Clause 10:</strong> Improvement - nonconformity, corrective action, continual improvement</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key ISO 50001 Concepts</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Term</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Definition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy Management System (EnMS)</td>
                      <td className="border border-white/10 px-3 py-2">Set of interrelated elements to establish energy policy and objectives</td>
                      <td className="border border-white/10 px-3 py-2">Documented system covering all energy uses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Significant Energy Use (SEU)</td>
                      <td className="border border-white/10 px-3 py-2">Energy use accounting for substantial consumption or improvement potential</td>
                      <td className="border border-white/10 px-3 py-2">HVAC systems, compressed air, lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy Baseline (EnB)</td>
                      <td className="border border-white/10 px-3 py-2">Quantitative reference for comparing energy performance</td>
                      <td className="border border-white/10 px-3 py-2">2023 calendar year consumption data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy Performance Indicator (EnPI)</td>
                      <td className="border border-white/10 px-3 py-2">Quantitative value or measure of energy performance</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m², kWh/unit produced</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy Review</td>
                      <td className="border border-white/10 px-3 py-2">Analysis of energy efficiency, use, and consumption</td>
                      <td className="border border-white/10 px-3 py-2">Annual analysis of all energy sources</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> ISO 50001 is performance-based, not prescriptive - organisations choose how to achieve energy performance improvement within the framework.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Plan-Do-Check-Act Cycle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Plan-Do-Check-Act Cycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The PDCA cycle is the fundamental methodology underpinning ISO 50001. This iterative process
              drives continual improvement in energy performance by systematically planning, implementing,
              monitoring, and improving energy management activities.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Plan Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Conduct energy review</li>
                  <li className="pl-1">Establish energy baseline</li>
                  <li className="pl-1">Identify SEUs</li>
                  <li className="pl-1">Establish EnPIs</li>
                  <li className="pl-1">Set objectives and targets</li>
                  <li className="pl-1">Develop action plans</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Do Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Implement action plans</li>
                  <li className="pl-1">Provide necessary resources</li>
                  <li className="pl-1">Ensure competence and awareness</li>
                  <li className="pl-1">Establish operational controls</li>
                  <li className="pl-1">Execute improvement projects</li>
                  <li className="pl-1">Communicate internally and externally</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Check Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Monitor energy performance</li>
                  <li className="pl-1">Measure against EnPIs</li>
                  <li className="pl-1">Compare to baseline</li>
                  <li className="pl-1">Evaluate compliance</li>
                  <li className="pl-1">Conduct internal audits</li>
                  <li className="pl-1">Analyse nonconformities</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Act Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Take corrective actions</li>
                  <li className="pl-1">Management review</li>
                  <li className="pl-1">Update baseline if needed</li>
                  <li className="pl-1">Revise objectives and targets</li>
                  <li className="pl-1">Implement improvements</li>
                  <li className="pl-1">Share lessons learned</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PDCA in Building Services Context</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plan</td>
                      <td className="border border-white/10 px-3 py-2">Energy review</td>
                      <td className="border border-white/10 px-3 py-2">Analyse HVAC, lighting, and plant energy use from BMS data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Do</td>
                      <td className="border border-white/10 px-3 py-2">Implementation</td>
                      <td className="border border-white/10 px-3 py-2">Install VSD on AHU fans, optimise BMS schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Check</td>
                      <td className="border border-white/10 px-3 py-2">Monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Compare kWh/m² pre and post intervention via submetering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Act</td>
                      <td className="border border-white/10 px-3 py-2">Improvement</td>
                      <td className="border border-white/10 px-3 py-2">Extend VSDs to other plant, update O&M procedures</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Implementation tip:</strong> The PDCA cycle operates continuously - completion of one cycle immediately begins the next, driving ongoing improvement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Energy Planning and Implementation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Energy Planning and Implementation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy planning is the core of ISO 50001, requiring organisations to analyse their energy use,
              identify opportunities for improvement, and establish systems for managing energy performance.
              Effective implementation requires leadership commitment, adequate resources, and clear
              operational controls.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Energy Policy Requirements</p>
              <div className="text-sm space-y-1.5 text-white">
                <p>The energy policy must:</p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Be appropriate to the nature and scale of energy use</li>
                  <li>Include commitment to continual improvement in energy performance</li>
                  <li>Include commitment to ensuring information and resources for objectives</li>
                  <li>Include commitment to comply with legal and other requirements</li>
                  <li>Support procurement of energy-efficient products and services</li>
                  <li>Be documented and communicated within the organisation</li>
                  <li>Be available to interested parties as appropriate</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Review Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Analyse energy use:</strong> Identify current energy sources (electricity, gas, oil, renewables)</li>
                <li className="pl-1"><strong>Evaluate consumption:</strong> Determine past and present energy consumption patterns</li>
                <li className="pl-1"><strong>Identify SEUs:</strong> Determine facilities, equipment, systems, and processes with significant energy use</li>
                <li className="pl-1"><strong>Identify opportunities:</strong> Estimate future energy use and opportunities for improvement</li>
                <li className="pl-1"><strong>Determine variables:</strong> Identify relevant variables affecting SEUs (weather, occupancy, production)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Establishing Baselines and EnPIs</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Element</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy Baseline</td>
                      <td className="border border-white/10 px-3 py-2">Established using data from suitable period, normalised for variables</td>
                      <td className="border border-white/10 px-3 py-2">2023 consumption adjusted for degree days and occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EnPI Selection</td>
                      <td className="border border-white/10 px-3 py-2">Must demonstrate energy performance improvement</td>
                      <td className="border border-white/10 px-3 py-2">kWh/m²/year, kWh/degree day, kWh/occupant</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data Collection</td>
                      <td className="border border-white/10 px-3 py-2">Measurement plan with accuracy requirements</td>
                      <td className="border border-white/10 px-3 py-2">Monthly submetering of major plant, BMS trending</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Baseline Revision</td>
                      <td className="border border-white/10 px-3 py-2">Required when significant changes occur</td>
                      <td className="border border-white/10 px-3 py-2">Building extension, major plant replacement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Control Areas</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Design</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>New facilities</li>
                    <li>Renovations</li>
                    <li>Equipment upgrades</li>
                    <li>Process changes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Procurement</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Energy supply</li>
                    <li>Equipment purchase</li>
                    <li>Service contracts</li>
                    <li>Life cycle costing</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Operation</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Operating procedures</li>
                    <li>Maintenance schedules</li>
                    <li>BMS setpoints</li>
                    <li>Staff behaviour</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Planning tip:</strong> Use submetering data to accurately identify SEUs - often 20% of equipment accounts for 80% of energy consumption.
            </p>
          </div>
        </section>

        {/* Section 4: Certification and Continual Improvement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Certification and Continual Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ISO 50001 certification demonstrates to stakeholders that an organisation has implemented
              an effective energy management system. The certification process involves assessment by
              an independent, accredited certification body and requires ongoing commitment to
              maintain certification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certification Process Steps</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Gap Analysis</td>
                      <td className="border border-white/10 px-3 py-2">Assess current state against ISO 50001 requirements</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. System Development</td>
                      <td className="border border-white/10 px-3 py-2">Develop policies, procedures, and documentation</td>
                      <td className="border border-white/10 px-3 py-2">2-4 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Implementation</td>
                      <td className="border border-white/10 px-3 py-2">Operate the EnMS, collect data, train staff</td>
                      <td className="border border-white/10 px-3 py-2">3-6 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Internal Audit</td>
                      <td className="border border-white/10 px-3 py-2">Verify conformance, identify nonconformities</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Management Review</td>
                      <td className="border border-white/10 px-3 py-2">Top management evaluation of EnMS effectiveness</td>
                      <td className="border border-white/10 px-3 py-2">1 day</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6. Stage 1 Audit</td>
                      <td className="border border-white/10 px-3 py-2">Documentation review by certification body</td>
                      <td className="border border-white/10 px-3 py-2">1-2 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7. Stage 2 Audit</td>
                      <td className="border border-white/10 px-3 py-2">On-site assessment of implementation</td>
                      <td className="border border-white/10 px-3 py-2">2-5 days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8. Certification</td>
                      <td className="border border-white/10 px-3 py-2">Certificate issued (valid 3 years)</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ongoing Certification Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Annual surveillance audits:</strong> Verify continued compliance (years 1 and 2)</li>
                <li className="pl-1"><strong>Recertification audit:</strong> Full reassessment every three years</li>
                <li className="pl-1"><strong>Internal audits:</strong> Regular internal verification of EnMS effectiveness</li>
                <li className="pl-1"><strong>Management reviews:</strong> Periodic top management evaluation</li>
                <li className="pl-1"><strong>Continual improvement:</strong> Demonstrated energy performance improvement</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Benefits of ISO 50001 Certification</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Operational Benefits</p>
                  <ul className="space-y-1 list-disc list-outside ml-4">
                    <li>Reduced energy costs (typically 10-30%)</li>
                    <li>Improved energy efficiency</li>
                    <li>Better operational control</li>
                    <li>Enhanced maintenance practices</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Strategic Benefits</p>
                  <ul className="space-y-1 list-disc list-outside ml-4">
                    <li>Improved corporate reputation</li>
                    <li>ESOS compliance route</li>
                    <li>Reduced carbon emissions</li>
                    <li>Competitive advantage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Integration with Other Management Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Integration Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ISO 14001</td>
                      <td className="border border-white/10 px-3 py-2">Environmental management</td>
                      <td className="border border-white/10 px-3 py-2">Shared policy, objectives, audits, management review</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ISO 9001</td>
                      <td className="border border-white/10 px-3 py-2">Quality management</td>
                      <td className="border border-white/10 px-3 py-2">Documentation control, competence, internal audit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ISO 45001</td>
                      <td className="border border-white/10 px-3 py-2">Health and safety</td>
                      <td className="border border-white/10 px-3 py-2">Leadership, resources, operational control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ISO 55001</td>
                      <td className="border border-white/10 px-3 py-2">Asset management</td>
                      <td className="border border-white/10 px-3 py-2">Asset lifecycle, maintenance, performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Continual improvement:</strong> ISO 50001 requires demonstration of energy performance improvement - not just maintaining a system but actively improving energy efficiency over time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Establishing Energy Baseline for Commercial Building</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Establish an energy baseline for a 10,000m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Data Collection Period: January 2023 - December 2023</p>
                <p className="mt-2">Annual Energy Consumption:</p>
                <p className="ml-4">Electricity: 850,000 kWh</p>
                <p className="ml-4">Gas: 420,000 kWh</p>
                <p className="ml-4">Total: 1,270,000 kWh</p>
                <p className="mt-2">Relevant Variables:</p>
                <p className="ml-4">Heating Degree Days (HDD): 2,150</p>
                <p className="ml-4">Cooling Degree Days (CDD): 180</p>
                <p className="ml-4">Average Occupancy: 85%</p>
                <p className="mt-2">Energy Baseline EnPIs:</p>
                <p className="ml-4 text-green-400">Total: 127 kWh/m²/year</p>
                <p className="ml-4 text-green-400">Electricity: 85 kWh/m²/year</p>
                <p className="ml-4 text-green-400">Gas: 42 kWh/m²/year</p>
                <p className="ml-4 text-green-400">Weather-normalised: 0.59 kWh/DD/m²</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Identifying Significant Energy Uses</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Identify SEUs for a hospital building using Pareto analysis.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Energy Use Analysis (Annual kWh):</p>
                <p className="mt-2">System | Consumption | % of Total | Cumulative</p>
                <p>--------|------------|------------|------------</p>
                <p>HVAC Systems | 2,400,000 | 48% | 48%</p>
                <p>Medical Equipment | 850,000 | 17% | 65%</p>
                <p>Lighting | 650,000 | 13% | 78%</p>
                <p>Hot Water | 400,000 | 8% | 86%</p>
                <p>Catering | 350,000 | 7% | 93%</p>
                <p>IT/Data Centre | 200,000 | 4% | 97%</p>
                <p>Other | 150,000 | 3% | 100%</p>
                <p className="mt-2 text-green-400">SEUs identified (above 10%): HVAC, Medical Equipment, Lighting</p>
                <p className="text-green-400">These three represent 78% of total consumption</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: PDCA Improvement Cycle - Lighting Upgrade</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Apply PDCA to lighting efficiency improvement project.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow">PLAN:</p>
                <p className="ml-4">Current: 650,000 kWh/year at 12 W/m² installed load</p>
                <p className="ml-4">Target: 30% reduction through LED upgrade</p>
                <p className="ml-4">EnPI: kWh/m²/year for lighting</p>
                <p className="ml-4">Investment: £180,000 | Payback: 3.2 years</p>
                <p className="mt-2 text-elec-yellow">DO:</p>
                <p className="ml-4">Replace all fluorescent with LED (5 W/m²)</p>
                <p className="ml-4">Install presence detection in WCs, stores</p>
                <p className="ml-4">Implement daylight dimming in perimeter zones</p>
                <p className="ml-4">Train FM team on control system</p>
                <p className="mt-2 text-elec-yellow">CHECK:</p>
                <p className="ml-4">Post-installation consumption: 420,000 kWh/year</p>
                <p className="ml-4">Reduction achieved: 35% (exceeds 30% target)</p>
                <p className="ml-4">EnPI improved: 65 to 42 kWh/m²/year</p>
                <p className="mt-2 text-elec-yellow">ACT:</p>
                <p className="ml-4">Update baseline for lighting SEU</p>
                <p className="ml-4">Document best practice for future projects</p>
                <p className="ml-4">Plan Phase 2: Car park lighting upgrade</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 50001 Implementation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Secure top management commitment and appoint energy management representative</li>
                <li className="pl-1">Define EnMS scope and boundaries (sites, facilities, processes)</li>
                <li className="pl-1">Conduct comprehensive energy review to identify all energy sources and SEUs</li>
                <li className="pl-1">Establish energy baseline using minimum 12 months of data</li>
                <li className="pl-1">Develop EnPIs appropriate to the organisation's activities</li>
                <li className="pl-1">Set measurable energy objectives and targets with action plans</li>
                <li className="pl-1">Implement operational controls for SEUs and document procedures</li>
                <li className="pl-1">Establish monitoring and measurement plan with regular data collection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Certification cycle: <strong>3 years</strong> with annual surveillance</li>
                <li className="pl-1">Baseline period: <strong>Minimum 12 months</strong> of data</li>
                <li className="pl-1">Typical savings: <strong>10-30%</strong> energy cost reduction</li>
                <li className="pl-1">ESOS coverage: <strong>90%</strong> of total energy for compliance route</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lack of top management engagement</strong> - EnMS requires visible leadership commitment</li>
                <li className="pl-1"><strong>Poor data quality</strong> - Unreliable energy data undermines the entire system</li>
                <li className="pl-1"><strong>EnPIs not normalised</strong> - Weather, occupancy, and production affect consumption</li>
                <li className="pl-1"><strong>Treating certification as the goal</strong> - Focus should be on actual energy improvement</li>
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
                <p className="font-medium text-white mb-1">PDCA Cycle</p>
                <ul className="space-y-0.5">
                  <li>Plan - Energy review, baseline, objectives</li>
                  <li>Do - Implement controls and actions</li>
                  <li>Check - Monitor, measure, audit</li>
                  <li>Act - Correct and improve</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ISO 50001 Key Clauses</p>
                <ul className="space-y-0.5">
                  <li>Clause 4 - Context of organisation</li>
                  <li>Clause 5 - Leadership</li>
                  <li>Clause 6 - Planning (energy review)</li>
                  <li>Clauses 7-10 - Support, Operation, Check, Improve</li>
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
            <Link to="../h-n-c-module6-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section5-5">
              Next: Energy Auditing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section5_4;
