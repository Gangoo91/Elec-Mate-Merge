/**
 * Module 6 · Section 5 · Subsection 4 — ISO 50001 Energy Management Systems
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Plan-Do-Check-Act methodology, certification requirements, and continual improvement for energy performance
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'ISO 50001 Energy Management Systems - HNC Module 6 Section 5.4';
const DESCRIPTION =
  'Master ISO 50001 energy management systems: Plan-Do-Check-Act cycle, energy policy development, energy planning, implementation and operation, checking and management review, certification requirements, and continual improvement strategies.';

const quickCheckQuestions = [
  {
    id: 'iso50001-definition',
    question: 'What is the primary purpose of ISO 50001?',
    options: [
      'To provide a framework for establishing, implementing, and improving energy management systems',
      'The client must fulfil the duties of any duty holder they fail to appoint',
      'To prevent damage and ensure safety during excavation and drilling',
      'Temperature decreases but moisture content remains constant (moving left horizontally on psychrometric chart)',
    ],
    correctIndex: 0,
    explanation:
      'ISO 50001 provides organisations with a systematic framework for establishing, implementing, maintaining, and improving an energy management system (EnMS), enabling continual improvement in energy performance.',
  },
  {
    id: 'pdca-cycle',
    question: 'What does the Plan-Do-Check-Act cycle represent in ISO 50001?',
    options: [
      'State Pension + private pension + other savings',
      'They must be isolated, locked out, tagged out, and proved dead',
      'A continual improvement methodology for energy management',
      'That the tower is vertical (plumb) and not leaning to any side',
    ],
    correctIndex: 2,
    explanation:
      'The PDCA cycle is a continual improvement methodology that underpins ISO 50001. It ensures organisations systematically plan improvements, implement them, check results, and act on findings to drive ongoing energy performance enhancement.',
  },
  {
    id: 'energy-baseline',
    question: 'What is an energy baseline in ISO 50001?',
    options: [
      'Incorrect connection of line and neutral conductors',
      'Profit, costs, and financial health of their work',
      'Adaptive scheduling based on occupancy and weather',
      'A quantitative reference for comparing energy performance over time',
    ],
    correctIndex: 3,
    explanation:
      'An energy baseline is a quantitative reference point that provides the basis for comparison of energy performance. It is established using data from a specified period and is used to measure improvements against.',
  },
  {
    id: 'certification-requirement',
    question: 'Which body typically certifies organisations to ISO 50001?',
    options: [
      'Confusing \\\\\\\\\\\\\\\'maximum\\\\\\\\\\\\\\\' vs \\\\\\\\\\\\\\\'minimum\\\\\\\\\\\\\\\'',
      'Withdraw it from service immediately',
      'When there is more than one contractor on site',
      'UKAS-accredited certification bodies',
    ],
    correctIndex: 3,
    explanation:
      'ISO 50001 certification is performed by independent certification bodies accredited by national accreditation bodies such as UKAS (United Kingdom Accreditation Service) in the UK.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which clause of ISO 50001 addresses 'Context of the organisation'?",
    options: [
      'Clause 5',
      'Clause 4',
      'Clause 6',
      'Clause 7',
    ],
    correctAnswer: 1,
    explanation:
      "Clause 4 'Context of the organisation' requires the organisation to determine external and internal issues relevant to its purpose and that affect its ability to achieve intended outcomes of the EnMS.",
  },
  {
    id: 2,
    question: 'What is an Energy Performance Indicator (EnPI)?',
    options: [
      'Automatic exemption from all energy regulations',
      'Commitment to continual improvement in energy performance',
      'A quantitative value or measure of energy performance',
      'Monitoring, measuring, analysing, and evaluating energy performance',
    ],
    correctAnswer: 2,
    explanation:
      'An EnPI is a quantitative value or measure of energy performance defined by the organisation. EnPIs are used to demonstrate energy performance improvement and may be expressed as simple metrics, ratios, or complex models.',
  },
  {
    id: 3,
    question: "In the PDCA cycle, what occurs during the 'Check' phase?",
    options: [
      'Information required to be controlled and maintained by the organisation',
      'To review the EnMS for continuing suitability, adequacy, and effectiveness',
      'Commitment to continual improvement in energy performance',
      'Monitoring, measuring, analysing, and evaluating energy performance',
    ],
    correctAnswer: 3,
    explanation:
      "The 'Check' phase involves monitoring, measuring, analysing, and evaluating energy performance and the EnMS against energy policy, objectives, and targets, and reporting the results.",
  },
  {
    id: 4,
    question: 'What is a Significant Energy Use (SEU)?',
    options: [
      'Energy use accounting for substantial energy consumption and/or offering considerable potential for improvement',
      'The machine must be taken out of service immediately; the defect must be rectified and the machine re-examined before it can return to use',
      'Slower skill development, repeated errors and disengagement — feedback is what turns experience into competence',
      'A balance between the risk and the sacrifice (money, time, trouble) needed to avert it',
    ],
    correctAnswer: 0,
    explanation:
      'SEUs are energy uses that account for substantial energy consumption and/or offer considerable potential for energy performance improvement. Organisations must identify and prioritise SEUs for management attention.',
  },
  {
    id: 5,
    question: 'How often must ISO 50001 certified organisations undergo surveillance audits?',
    options: [
      'Quarterly',
      'Annually (typically)',
      'Every three years only',
      'Monthly',
    ],
    correctAnswer: 1,
    explanation:
      'Certified organisations typically undergo annual surveillance audits between full recertification audits. The certification cycle is usually three years, with surveillance audits in years one and two.',
  },
  {
    id: 6,
    question: 'Which role has ultimate accountability for the EnMS in ISO 50001?',
    options: [
      'Energy Manager',
      'Facilities Manager',
      'Top Management',
      'External Auditor',
    ],
    correctAnswer: 2,
    explanation:
      'ISO 50001 requires top management to demonstrate leadership and commitment to the EnMS. They have ultimate accountability for energy performance and must ensure the EnMS achieves its intended outcomes.',
  },
  {
    id: 7,
    question: 'What must be included in an energy policy under ISO 50001?',
    options: [
      'Information required to be controlled and maintained by the organisation',
      'To review the EnMS for continuing suitability, adequacy, and effectiveness',
      'A quantitative value or measure of energy performance',
      'Commitment to continual improvement in energy performance',
    ],
    correctAnswer: 3,
    explanation:
      'The energy policy must include commitments to continual improvement in energy performance, ensuring availability of information and resources, and compliance with applicable legal and other requirements.',
  },
  {
    id: 8,
    question: 'What is the relationship between ISO 50001 and ISO 14001?',
    options: [
      'ISO 50001 focuses on energy while ISO 14001 covers broader environmental management, but they share common structure',
      'A sequential terminal strip designator (e.g., X1, X2) followed by individual terminal numbers',
      'Have a private, supportive conversation to ask if everything is okay, without making assumptions',
      'The supply source impedance, the line conductor, the CPC, the installation earth electrode, and the general mass of earth back to the source earth',
    ],
    correctAnswer: 0,
    explanation:
      'Both standards use the High-Level Structure (HLS) and can be integrated. ISO 50001 specifically addresses energy management while ISO 14001 covers broader environmental aspects. Many organisations implement both together.',
  },
  {
    id: 9,
    question: 'During energy planning, what must be determined regarding legal requirements?',
    options: [
      'To review the EnMS for continuing suitability, adequacy, and effectiveness',
      'Legal and other requirements applicable to energy uses and consumption',
      'Monitoring, measuring, analysing, and evaluating energy performance',
      'Information required to be controlled and maintained by the organisation',
    ],
    correctAnswer: 1,
    explanation:
      'Energy planning requires determination of legal requirements and other requirements related to energy uses, energy consumption, and energy efficiency that the organisation must comply with.',
  },
  {
    id: 10,
    question: 'What is documented information in ISO 50001 terminology?',
    options: [
      'A quantitative value or measure of energy performance',
      'Legal and other requirements applicable to energy uses and consumption',
      'Information required to be controlled and maintained by the organisation',
      'To review the EnMS for continuing suitability, adequacy, and effectiveness',
    ],
    correctAnswer: 2,
    explanation:
      "Documented information includes information required to be controlled and maintained, and the medium containing it. This replaces the previous terms 'documents' and 'records' used in earlier management system standards.",
  },
  {
    id: 11,
    question: 'What is the purpose of management review in ISO 50001?',
    options: [
      'Monitoring, measuring, analysing, and evaluating energy performance',
      'Information required to be controlled and maintained by the organisation',
      'A quantitative value or measure of energy performance',
      'To review the EnMS for continuing suitability, adequacy, and effectiveness',
    ],
    correctAnswer: 3,
    explanation:
      'Management review ensures top management reviews the EnMS at planned intervals to ensure its continuing suitability, adequacy, and effectiveness, and alignment with strategic direction.',
  },
  {
    id: 12,
    question: 'Which of the following is NOT a benefit of ISO 50001 certification?',
    options: [
      'Automatic exemption from all energy regulations',
      'Thoughts, feelings, and behaviours',
      'Guardrails, mid-rails and toeboards',
      'To monitor and manage energy consumption by end use',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 50001 certification does not provide automatic exemption from energy regulations. However, it does provide benefits including reduced energy costs, improved reputation, and a systematic approach to managing energy.',
  },
];

const faqs = [
  {
    question: 'How long does ISO 50001 certification take to achieve?',
    answer:
      'Typical implementation takes 6-18 months depending on organisation size, complexity, and existing management systems. The process includes gap analysis, system development, implementation, internal audits, and certification audit. Organisations with existing ISO 14001 or ISO 9001 systems often achieve certification more quickly due to familiar processes and shared structure.',
  },
  {
    question: 'What is the difference between ISO 50001:2011 and ISO 50001:2018?',
    answer:
      "ISO 50001:2018 adopts the High-Level Structure (HLS) common to other ISO management system standards, making integration easier. Key changes include enhanced top management requirements, new concepts like 'context of the organisation' and 'risks and opportunities', clearer requirements for EnPIs and energy baselines, and strengthened requirements for collecting and analysing energy data.",
  },
  {
    question: 'Can small organisations implement ISO 50001?',
    answer:
      "Yes, ISO 50001 is scalable and applicable to organisations of all sizes and types. Small organisations can implement a simpler EnMS proportionate to their energy consumption and resources. The standard's flexibility allows organisations to determine the scope and complexity appropriate to their operations while still achieving certification.",
  },
  {
    question: 'How does ISO 50001 relate to ESOS in the UK?',
    answer:
      'The Energy Savings Opportunity Scheme (ESOS) requires large enterprises to conduct energy audits every four years. Organisations with ISO 50001 certification covering at least 90% of their energy consumption can use this to demonstrate ESOS compliance. This provides a significant incentive for larger UK organisations to pursue ISO 50001 certification.',
  },
  {
    question: 'What resources are needed to maintain ISO 50001 certification?',
    answer:
      'Maintaining certification requires ongoing commitment including: designated energy management personnel (may be part-time for smaller organisations), annual surveillance audits by the certification body, internal audits, management reviews, continuous monitoring of energy performance, and resources for improvement projects. The investment typically delivers positive return through energy savings.',
  },
];

const HNCModule6Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 4"
            title="ISO 50001 Energy Management Systems"
            description="Plan-Do-Check-Act methodology, certification requirements, and continual improvement for energy performance"
            tone="purple"
          />

          <TLDR
            points={[
              "ISO 50001 specifies requirements for an Energy Management System (EnMS) — a Plan-Do-Check-Act framework for systematic, continual improvement of energy performance.",
              "Certification is voluntary but valuable — exempts large UK organisations from ESOS compliance, demonstrates governance to investors and customers, and embeds energy reduction into management routines.",
              "Core elements: energy policy, energy planning (review, baseline, EnPIs, objectives), implementation, performance monitoring, internal audit, management review — all driven from the top through documented procedures.",
            ]}
          />

          <RegsCallout
            source="ISO 50001:2018 Energy Management Systems — Requirements with Guidance for Use"
            clause="The organisation shall establish, implement, maintain and continually improve an EnMS, including the processes needed and their interactions, in accordance with the requirements of this International Standard. The organisation shall determine the scope and boundaries of its EnMS, conduct an energy review, identify Significant Energy Uses (SEUs) and the variables affecting them, establish a baseline (EnB) and EnPIs, set objectives and energy targets, develop action plans, and ensure that energy performance and the EnMS are continually improved."
            meaning={
              <>
                ISO 50001 is structured around High-Level Structure (HLS) shared with ISO 14001 and ISO 9001 — easy integration with existing management systems. SEU identification is the key technical step: the EnMS focus and resource is concentrated on the few processes / systems that drive most consumption.
              </>
            }
            cite="Source: ISO 50001:2018 — iso.org"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the structure and requirements of ISO 50001:2018",
              "Apply the Plan-Do-Check-Act cycle to energy management",
              "Develop energy policies and establish energy objectives",
              "Identify and manage significant energy uses (SEUs)",
              "Establish energy baselines and performance indicators",
              "Navigate the certification process and maintain compliance",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="ISO 50001 Structure and Fundamentals">
            <p>ISO 50001 is the international standard for energy management systems (EnMS), providing organisations with a systematic framework to manage energy use, improve efficiency, and reduce costs. First published in 2011 and revised in 2018, it adopts the High-Level Structure common to all ISO management system standards.</p>
            <p><strong>ISO 50001:2018 Clause Structure:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Clause 4:</strong> Context of the organisation - understanding internal and external issues</li>
              <li><strong>Clause 5:</strong> Leadership - top management commitment and energy policy</li>
              <li><strong>Clause 6:</strong> Planning - energy review, EnPIs, baselines, objectives</li>
              <li><strong>Clause 7:</strong> Support - resources, competence, awareness, communication</li>
              <li><strong>Clause 8:</strong> Operation - operational planning and control, design, procurement</li>
              <li><strong>Clause 9:</strong> Performance evaluation - monitoring, internal audit, management review</li>
              <li><strong>Clause 10:</strong> Improvement - nonconformity, corrective action, continual improvement</li>
            </ul>
            <p><strong>Key ISO 50001 Concepts</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy Management System (EnMS):</strong> Set of interrelated elements to establish energy policy and objectives — Documented system covering all energy uses</li>
              <li><strong>Significant Energy Use (SEU):</strong> Energy use accounting for substantial consumption or improvement potential — HVAC systems, compressed air, lighting</li>
              <li><strong>Energy Baseline (EnB):</strong> Quantitative reference for comparing energy performance — 2023 calendar year consumption data</li>
              <li><strong>Energy Performance Indicator (EnPI):</strong> Quantitative value or measure of energy performance — kWh/m², kWh/unit produced</li>
              <li><strong>Energy Review:</strong> Analysis of energy efficiency, use, and consumption — Annual analysis of all energy sources</li>
            </ul>
            <p><strong>Design principle:</strong> ISO 50001 is performance-based, not prescriptive - organisations choose how to achieve energy performance improvement within the framework.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Plan-Do-Check-Act Cycle">
            <p>The PDCA cycle is the fundamental methodology underpinning ISO 50001. This iterative process drives continual improvement in energy performance by systematically planning, implementing, monitoring, and improving energy management activities.</p>
            <p><strong>Plan Phase</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conduct energy review</li>
              <li>Establish energy baseline</li>
              <li>Identify SEUs</li>
              <li>Establish EnPIs</li>
              <li>Set objectives and targets</li>
              <li>Develop action plans</li>
            </ul>
            <p><strong>Do Phase</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Implement action plans</li>
              <li>Provide necessary resources</li>
              <li>Ensure competence and awareness</li>
              <li>Establish operational controls</li>
              <li>Execute improvement projects</li>
              <li>Communicate internally and externally</li>
            </ul>
            <p><strong>Check Phase</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Monitor energy performance</li>
              <li>Measure against EnPIs</li>
              <li>Compare to baseline</li>
              <li>Evaluate compliance</li>
              <li>Conduct internal audits</li>
              <li>Analyse nonconformities</li>
            </ul>
            <p><strong>Act Phase</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Take corrective actions</li>
              <li>Management review</li>
              <li>Update baseline if needed</li>
              <li>Revise objectives and targets</li>
              <li>Implement improvements</li>
              <li>Share lessons learned</li>
            </ul>
            <p><strong>PDCA in Building Services Context</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Plan:</strong> Energy review — Analyse HVAC, lighting, and plant energy use from BMS data</li>
              <li><strong>Do:</strong> Implementation — Install VSD on AHU fans, optimise BMS schedules</li>
              <li><strong>Check:</strong> Monitoring — Compare kWh/m² pre and post intervention via submetering</li>
              <li><strong>Act:</strong> Improvement — Extend VSDs to other plant, update O&M procedures</li>
            </ul>
            <p><strong>Implementation tip:</strong> The PDCA cycle operates continuously - completion of one cycle immediately begins the next, driving ongoing improvement.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Energy Planning and Implementation">
            <p>Energy planning is the core of ISO 50001, requiring organisations to analyse their energy use, identify opportunities for improvement, and establish systems for managing energy performance. Effective implementation requires leadership commitment, adequate resources, and clear operational controls.</p>
            <p><strong>Energy Policy Requirements</strong></p>
            <p>The energy policy must:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Be appropriate to the nature and scale of energy use</li>
              <li>Include commitment to continual improvement in energy performance</li>
              <li>Include commitment to ensuring information and resources for objectives</li>
              <li>Include commitment to comply with legal and other requirements</li>
              <li>Support procurement of energy-efficient products and services</li>
              <li>Be documented and communicated within the organisation</li>
              <li>Be available to interested parties as appropriate</li>
            </ul>
            <p><strong>Energy Review Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Analyse energy use:</strong> Identify current energy sources (electricity, gas, oil, renewables)</li>
              <li><strong>Evaluate consumption:</strong> Determine past and present energy consumption patterns</li>
              <li><strong>Identify SEUs:</strong> Determine facilities, equipment, systems, and processes with significant energy use</li>
              <li><strong>Identify opportunities:</strong> Estimate future energy use and opportunities for improvement</li>
              <li><strong>Determine variables:</strong> Identify relevant variables affecting SEUs (weather, occupancy, production)</li>
            </ul>
            <p><strong>Establishing Baselines and EnPIs</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy Baseline:</strong> Established using data from suitable period, normalised for variables — 2023 consumption adjusted for degree days and occupancy</li>
              <li><strong>EnPI Selection:</strong> Must demonstrate energy performance improvement — kWh/m²/year, kWh/degree day, kWh/occupant</li>
              <li><strong>Data Collection:</strong> Measurement plan with accuracy requirements — Monthly submetering of major plant, BMS trending</li>
              <li><strong>Baseline Revision:</strong> Required when significant changes occur — Building extension, major plant replacement</li>
            </ul>
            <p><strong>Operational Control Areas</strong></p>
            <p><strong>Design</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New facilities</li>
              <li>Renovations</li>
              <li>Equipment upgrades</li>
              <li>Process changes</li>
            </ul>
            <p><strong>Procurement</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy supply</li>
              <li>Equipment purchase</li>
              <li>Service contracts</li>
              <li>Life cycle costing</li>
            </ul>
            <p><strong>Operation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operating procedures</li>
              <li>Maintenance schedules</li>
              <li>BMS setpoints</li>
              <li>Staff behaviour</li>
            </ul>
            <p><strong>Planning tip:</strong> Use submetering data to accurately identify SEUs - often 20% of equipment accounts for 80% of energy consumption.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Certification and Continual Improvement">
            <p>ISO 50001 certification demonstrates to stakeholders that an organisation has implemented an effective energy management system. The certification process involves assessment by an independent, accredited certification body and requires ongoing commitment to maintain certification.</p>
            <p><strong>Certification Process Steps</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Gap Analysis:</strong> Assess current state against ISO 50001 requirements — 1-2 weeks</li>
              <li><strong>2. System Development:</strong> Develop policies, procedures, and documentation — 2-4 months</li>
              <li><strong>3. Implementation:</strong> Operate the EnMS, collect data, train staff — 3-6 months</li>
              <li><strong>4. Internal Audit:</strong> Verify conformance, identify nonconformities — 1-2 weeks</li>
              <li><strong>5. Management Review:</strong> Top management evaluation of EnMS effectiveness — 1 day</li>
              <li><strong>6. Stage 1 Audit:</strong> Documentation review by certification body — 1-2 days</li>
              <li><strong>7. Stage 2 Audit:</strong> On-site assessment of implementation — 2-5 days</li>
              <li><strong>8. Certification:</strong> Certificate issued (valid 3 years) — 2-4 weeks</li>
            </ul>
            <p><strong>Ongoing Certification Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Annual surveillance audits:</strong> Verify continued compliance (years 1 and 2)</li>
              <li><strong>Recertification audit:</strong> Full reassessment every three years</li>
              <li><strong>Internal audits:</strong> Regular internal verification of EnMS effectiveness</li>
              <li><strong>Management reviews:</strong> Periodic top management evaluation</li>
              <li><strong>Continual improvement:</strong> Demonstrated energy performance improvement</li>
            </ul>
            <p><strong>Benefits of ISO 50001 Certification</strong></p>
            <p>Operational Benefits</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reduced energy costs (typically 10-30%)</li>
              <li>Improved energy efficiency</li>
              <li>Better operational control</li>
              <li>Enhanced maintenance practices</li>
            </ul>
            <p>Strategic Benefits</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Improved corporate reputation</li>
              <li>ESOS compliance route</li>
              <li>Reduced carbon emissions</li>
              <li>Competitive advantage</li>
            </ul>
            <p><strong>Integration with Other Management Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ISO 14001:</strong> Environmental management — Shared policy, objectives, audits, management review</li>
              <li><strong>ISO 9001:</strong> Quality management — Documentation control, competence, internal audit</li>
              <li><strong>ISO 45001:</strong> Health and safety — Leadership, resources, operational control</li>
              <li><strong>ISO 55001:</strong> Asset management — Asset lifecycle, maintenance, performance</li>
            </ul>
            <p><strong>Continual improvement:</strong> ISO 50001 requires demonstration of energy performance improvement - not just maintaining a system but actively improving energy efficiency over time.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Establishing Energy Baseline for Commercial Building</strong>
            </p>
            <p><strong>Scenario:</strong> Establish an energy baseline for a 10,000m² office building.</p>
            <p>Data Collection Period: January 2023 - December 2023</p>
            <p>Annual Energy Consumption:</p>
            <p>Electricity: 850,000 kWh</p>
            <p>Gas: 420,000 kWh</p>
            <p>Total: 1,270,000 kWh</p>
            <p>Relevant Variables:</p>
            <p>Heating Degree Days (HDD): 2,150</p>
            <p>Cooling Degree Days (CDD): 180</p>
            <p>Average Occupancy: 85%</p>
            <p>Energy Baseline EnPIs:</p>
            <p>Total: 127 kWh/m²/year</p>
            <p>Electricity: 85 kWh/m²/year</p>
            <p>Gas: 42 kWh/m²/year</p>
            <p>Weather-normalised: 0.59 kWh/DD/m²</p>
            <p>
              <strong>Example 2: Identifying Significant Energy Uses</strong>
            </p>
            <p><strong>Scenario:</strong> Identify SEUs for a hospital building using Pareto analysis.</p>
            <p>Energy Use Analysis (Annual kWh):</p>
            <p>System | Consumption | % of Total | Cumulative</p>
            <p>--------|------------|------------|------------</p>
            <p>HVAC Systems | 2,400,000 | 48% | 48%</p>
            <p>Medical Equipment | 850,000 | 17% | 65%</p>
            <p>Lighting | 650,000 | 13% | 78%</p>
            <p>Hot Water | 400,000 | 8% | 86%</p>
            <p>Catering | 350,000 | 7% | 93%</p>
            <p>IT/Data Centre | 200,000 | 4% | 97%</p>
            <p>Other | 150,000 | 3% | 100%</p>
            <p>SEUs identified (above 10%): HVAC, Medical Equipment, Lighting</p>
            <p>These three represent 78% of total consumption</p>
            <p>
              <strong>Example 3: PDCA Improvement Cycle - Lighting Upgrade</strong>
            </p>
            <p><strong>Scenario:</strong> Apply PDCA to lighting efficiency improvement project.</p>
            <p>PLAN:</p>
            <p>Current: 650,000 kWh/year at 12 W/m² installed load</p>
            <p>Target: 30% reduction through LED upgrade</p>
            <p>EnPI: kWh/m²/year for lighting</p>
            <p>Investment: £180,000 | Payback: 3.2 years</p>
            <p>DO:</p>
            <p>Replace all fluorescent with LED (5 W/m²)</p>
            <p>Install presence detection in WCs, stores</p>
            <p>Implement daylight dimming in perimeter zones</p>
            <p>Train FM team on control system</p>
            <p>CHECK:</p>
            <p>Post-installation consumption: 420,000 kWh/year</p>
            <p>Reduction achieved: 35% (exceeds 30% target)</p>
            <p>EnPI improved: 65 to 42 kWh/m²/year</p>
            <p>ACT:</p>
            <p>Update baseline for lighting SEU</p>
            <p>Document best practice for future projects</p>
            <p>Plan Phase 2: Car park lighting upgrade</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>ISO 50001 Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Secure top management commitment and appoint energy management representative</li>
              <li>Define EnMS scope and boundaries (sites, facilities, processes)</li>
              <li>Conduct comprehensive energy review to identify all energy sources and SEUs</li>
              <li>Establish energy baseline using minimum 12 months of data</li>
              <li>Develop EnPIs appropriate to the organisation's activities</li>
              <li>Set measurable energy objectives and targets with action plans</li>
              <li>Implement operational controls for SEUs and document procedures</li>
              <li>Establish monitoring and measurement plan with regular data collection</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Certification cycle: <strong>3 years</strong> with annual surveillance</li>
              <li>Baseline period: <strong>Minimum 12 months</strong> of data</li>
              <li>Typical savings: <strong>10-30%</strong> energy cost reduction</li>
              <li>ESOS coverage: <strong>90%</strong> of total energy for compliance route</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Lack of top management engagement</strong> - EnMS requires visible leadership commitment</li>
                <li><strong>Poor data quality</strong> - Unreliable energy data undermines the entire system</li>
                <li><strong>EnPIs not normalised</strong> - Weather, occupancy, and production affect consumption</li>
                <li><strong>Treating certification as the goal</strong> - Focus should be on actual energy improvement</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="ISO 50001 certification halted at internal audit"
            situation={
              <>
                A facilities-management company is pursuing ISO 50001 certification across its corporate estate. Two months before the certification audit, the internal audit identifies multiple non-conformances: SEUs identified but no EnPIs assigned to half of them, action plans without owners, management review held but no record of input/output. The certification audit is at risk.
              </>
            }
            whatToDo={
              <>
                Defer the certification audit by 8 weeks. Address each non-conformance: (1) assign EnPIs to every SEU with baselines; (2) re-issue every action plan with owner, deadline and success criteria; (3) re-run the management review with structured agenda per ISO 50001 clause 9.3 and minute formally. Use the internal audit findings as the agenda. Re-audit internally and confirm closure before re-engaging the external auditor.
              </>
            }
            whyItMatters={
              <>
                ISO 50001 certification is structurally similar to ISO 9001 / 14001 — but the subject matter is technical (energy data, technical baselines, engineering action plans). Many organisations underestimate the technical depth required and fail at the documentation maturity test. Internal audit is your safety net.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Plan-Do-Check-Act framework with High-Level Structure shared with ISO 14001 / 9001.",
              "Significant Energy Uses (SEUs) drive focus and resource — typically <20% of equipment, >80% of energy use.",
              "EnPIs (Energy Performance Indicators) tied to baselines (EnBs) for every SEU.",
              "Top management commitment + documented energy policy.",
              "Action plans with owner, deadline, success criteria.",
              "Internal audit + management review = the assurance loop.",
              "ISO 50001 certification exempts the organisation from ESOS audit obligation.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Monitoring and targeting
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building performance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section5_4;
