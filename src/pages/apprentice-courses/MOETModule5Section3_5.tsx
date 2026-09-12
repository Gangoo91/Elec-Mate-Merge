/**
 * MOET · Module 5 · Section 3 · Subsection 5 — Functional Safety Principles
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. This page is safety-focused (functional safety), so the
 * statements below are taken verbatim from the brief's Module 1 health-and-
 * safety list rather than the electrical-theory lists used elsewhere in
 * Module 5.
 *   Knowledge  · "Safe systems of work."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. This is the
 * last subsection of Section 5.3 (and of Module 5's conversion batch), so
 * the "next" action returns to the section overview, matching the original.
 *
 * 🔴 DATA INTEGRITY FLAG — NOT FIXED, preserved byte-identical per the brief:
 * quickCheckQuestions[3] ("systematic-vs-random") has three of its four
 * options drawn from unrelated questions elsewhere in the course — a working
 *-at-height permit line, an eye-irrigation first-aid line, and a greenhouse-
 * gas-emissions definition — none of which relate to systematic vs random
 * failure. Only option index 1 (marked correct) is topically relevant. This
 * is a pre-existing data-corruption defect in the original file (most likely
 * an option-shuffling script that pulled from the wrong question pool), not
 * a BS 7671/GS38-type factual error covered by the brief's verified
 * corrections, so it has been left exactly as it was rather than silently
 * rewritten. The equivalent quiz question (id 6, further down this same
 * file) has the correct, on-topic option set. Recommend this quickCheck be
 * fixed or replaced by a content owner — not by a structural-conversion
 * pass.
 *
 * Accuracy note: IEC 61508, ISO 13849-1/-2, IEC 62061, IEC 61511, IEC 61513,
 * BS EN ISO 12100, the Machinery Directive 2006/42/EC (retained as the
 * Supply of Machinery (Safety) Regulations 2008), ALARP and the Technical
 * File / 10-year retention requirement are standard, uncontested functional-
 * safety and machinery-law references and are kept exactly as written. No
 * GS38, thermography, test-interval or C&G-qualification claims appear on
 * this page.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Functional Safety Principles - MOET Module 5 Section 3.5';
const DESCRIPTION =
  'Core principles of functional safety including safety lifecycle, safety integrity, ALARP, IEC 61508 framework, Machinery Directive compliance and Technical File requirements. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'func-safety-def',
    question: 'What is functional safety?',
    options: [
      'The safety provided by passive measures such as fixed guards, barriers and enclosures',
      'The electrical safety of a machine in terms of insulation, earthing and shock protection',
      'The part of overall safety that depends on a system operating correctly in response to its inputs',
      'The safe condition achieved by isolating and locking off a machine before maintenance',
    ],
    correctIndex: 2,
    explanation:
      'Functional safety is the part of overall safety that depends on the correct functioning of safety-related electrical, electronic and programmable electronic systems. If the safety system fails to operate when needed, the safety function is lost.',
  },
  {
    id: 'safety-lifecycle',
    question: 'What is the safety lifecycle?',
    options: [
      'The rated service life of a safety component before it must be replaced',
      'The interval between successive proof tests of a safety function',
      'A structured series of phases from concept through decommissioning for managing functional safety',
      'The period during which a Declaration of Conformity remains valid',
    ],
    correctIndex: 2,
    explanation:
      'The safety lifecycle is a structured framework of activities from initial concept through design, implementation, validation, operation, maintenance and decommissioning. It ensures safety is considered at every stage.',
  },
  {
    id: 'alarp',
    question: 'What does ALARP stand for?',
    options: [
      'Annual Lifecycle Assessment Review Process',
      'As Low As Reasonably Practicable',
      'Automated Level Assessment of Risk Points',
      'Always Lower All Risk Parameters',
    ],
    correctIndex: 1,
    explanation:
      'ALARP means risk should be reduced to a level that is As Low As Reasonably Practicable, balancing the cost and effort of risk reduction against the benefit gained. Further reduction is not required if it would be grossly disproportionate to the benefit.',
  },
  {
    id: 'systematic-vs-random',
    question: 'What is the difference between a systematic failure and a random hardware failure?',
    options: [
      'Systematic failures occur during commissioning; random failures occur only in service',
      'Systematic failures are caused by design or process errors; random hardware failures are caused by component degradation',
      'Systematic failures affect the whole plant; random failures affect a single machine',
      'Systematic failures are recorded in the CMMS; random failures are reported verbally',
    ],
    correctIndex: 1,
    explanation:
      'Systematic failures result from errors in design, specification or procedures and are addressed by process quality measures. Random hardware failures result from physical degradation of components and are quantified probabilistically using MTTFd and PFHd.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which EU directive requires machinery placed on the market to be safe?',
    options: [
      'ATEX Directive 2014/34/EU',
      'Machinery Directive 2006/42/EC',
      'Low Voltage Directive 2014/35/EU',
      'EMC Directive 2014/30/EU',
    ],
    correctAnswer: 1,
    explanation:
      'The Machinery Directive 2006/42/EC sets essential health and safety requirements for machinery placed on the EU/UK market. It is retained in UK law as the Supply of Machinery (Safety) Regulations 2008.',
  },
  {
    id: 2,
    question: 'What is the purpose of a risk assessment in functional safety?',
    options: [
      'To record the maintenance history of each safety component over its life',
      'To confirm that the machine has been correctly isolated before work begins',
      'To identify hazards, estimate risk and determine the required risk reduction measures',
      'To calculate the electrical load and protective device ratings for the machine',
    ],
    correctAnswer: 2,
    explanation:
      'Risk assessment systematically identifies hazards, estimates the associated risks (severity and likelihood), and determines what risk reduction measures are needed to achieve an acceptable (ALARP) level.',
  },
  {
    id: 3,
    question: 'What are the three steps of risk reduction according to ISO 12100?',
    options: [
      'Identify hazards, isolate the machine, issue a permit to work',
      'Risk assessment, method statement, toolbox talk',
      'Elimination, substitution, personal protective equipment',
      'Inherently safe design, safeguarding, information for use',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 12100 specifies the three-step method: (1) inherently safe design measures, (2) safeguarding and complementary protective measures, (3) information for use (warnings, instructions, training).',
  },
  {
    id: 4,
    question: 'What is a Safety Requirement Specification (SRS)?',
    options: [
      'A document defining the safety functions, their required performance and the conditions under which they must operate',
      'A record of every proof test carried out on the safety system during its life',
      'The list of harmonised standards applied during the conformity assessment',
      'The manufacturer’s signed declaration that the machine meets the essential requirements',
    ],
    correctAnswer: 0,
    explanation:
      'The SRS defines each safety function including its required PL or SIL, response time, behaviour under fault conditions, the safety devices involved and the conditions under which it must operate. It is the basis for design and validation.',
  },
  {
    id: 5,
    question: 'What is proof testing in the context of functional safety?',
    options: [
      'The factory test carried out on a safety component before it leaves the manufacturer',
      'Periodic testing to detect dangerous hidden failures that are not revealed by automatic diagnostics',
      'The continuous self-monitoring performed automatically by the safety controller',
      'The one-off validation test carried out when the safety system is first commissioned',
    ],
    correctAnswer: 1,
    explanation:
      "Proof testing (periodic testing) reveals dangerous failures that accumulate over time and are not detected by the system's own automatic diagnostics. The proof test interval directly affects PFH calculations.",
  },
  {
    id: 6,
    question: 'What is the difference between a systematic failure and a random hardware failure?',
    options: [
      'Systematic failures occur during operation; random failures only occur during testing',
      'Systematic failures affect software; random failures only affect mechanical parts',
      'Systematic failures are caused by design or process errors; random hardware failures are caused by component degradation',
      'Systematic failures are predictable in advance; random failures cannot be reduced by any means',
    ],
    correctAnswer: 2,
    explanation:
      'Systematic failures result from errors in design, specification or procedures (addressed by process quality). Random hardware failures result from physical degradation and are quantified probabilistically (MTTFd, PFHd).',
  },
  {
    id: 7,
    question: 'What does the UKCA/CE marking on machinery indicate regarding safety?',
    options: [
      'That an independent test house has certified the machine as safe to use',
      'That the machine has passed its most recent periodic proof test',
      'That the Health and Safety Executive has approved the machine for sale',
      'The manufacturer declares conformity with applicable directives including essential health and safety requirements',
    ],
    correctAnswer: 3,
    explanation:
      "CE/UKCA marking is the manufacturer's declaration that the machinery conforms to all applicable directives. It is based on the manufacturer's own conformity assessment, which for most machinery does not require third-party involvement.",
  },
  {
    id: 8,
    question: 'What is a Technical File in the context of the Machinery Directive?',
    options: [
      'Documentation demonstrating how the machine meets the essential requirements, including risk assessment, calculations and test reports',
      'The operating and maintenance manual supplied to the end user with the machine',
      'The signed Declaration of Conformity that accompanies the machine on sale',
      'The schedule of proof tests and inspections to be carried out during service',
    ],
    correctAnswer: 0,
    explanation:
      'The Technical File contains all documentation proving the machine meets essential requirements: risk assessment, design documentation, safety calculations (SISTEMA reports), test records, standards applied, operating instructions and the Declaration of Conformity.',
  },
  {
    id: 9,
    question: 'What role does IEC 61508 play in functional safety?',
    options: [
      'It is the machinery-specific standard that defines Performance Levels a to e',
      'It is the overarching functional safety standard for E/E/PE systems, from which sector-specific standards are derived',
      'It is the legal directive requiring machinery on the market to be safe',
      'It is the risk assessment methodology standard setting out three-step risk reduction',
    ],
    correctAnswer: 1,
    explanation:
      'IEC 61508 is the umbrella functional safety standard for electrical/electronic/programmable electronic systems. Sector-specific standards like ISO 13849 (machinery), IEC 61511 (process industry) and IEC 61513 (nuclear) are derived from it.',
  },
  {
    id: 10,
    question: "What is meant by 'safety integrity'?",
    options: [
      'The mechanical strength and durability of a machine’s guards and enclosures',
      'The completeness of the documentation held in the machine’s Technical File',
      'The probability of a safety-related system satisfactorily performing the required safety function under all stated conditions within a stated period of time',
      'The degree to which a machine complies with the essential health and safety requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Safety integrity is the probability that the safety system will perform its intended safety function satisfactorily when required, under all foreseeable conditions and within the specified time. It is quantified as PFHd or PFD.',
  },
  {
    id: 11,
    question: 'Under the Machinery Directive, for how long must the Technical File be retained?',
    options: [
      'At least 3 years after the machine is first placed on the market',
      'At least 5 years after the machine is sold to the end user',
      'For the entire operational life of the machine plus 2 years',
      'At least 10 years after the last machine in the series is manufactured',
    ],
    correctAnswer: 3,
    explanation:
      'The Machinery Directive requires the Technical File to be retained for at least 10 years after the date of manufacture of the last unit in the series. It must be available for inspection by market surveillance authorities.',
  },
  {
    id: 12,
    question: "What does 'harmonised standard' mean in the context of the Machinery Directive?",
    options: [
      'A standard whose reference is published in the Official Journal of the EU, providing a presumption of conformity with the essential requirements it covers',
      'A standard that is legally mandatory and must be applied to every machine without exception',
      'A standard agreed jointly by the manufacturer and the end user for a specific machine',
      'A standard that has been adopted identically by every country in the world',
    ],
    correctAnswer: 0,
    explanation:
      'A harmonised standard has been adopted by CEN/CENELEC and its reference published in the Official Journal. Compliance with a harmonised standard gives a presumption of conformity with the specific essential requirements it covers, simplifying the conformity assessment.',
  },
];

const faqs = [
  {
    question: 'Who is responsible for functional safety on a machine?',
    answer:
      'The machine manufacturer (or the person who places the machine on the market) has primary responsibility under the Machinery Directive. They must perform the risk assessment, design appropriate safety measures, validate the safety system, compile the Technical File and issue the Declaration of Conformity. Users have responsibilities for correct installation, maintenance and periodic testing.',
  },
  {
    question: 'How often should proof tests be performed?',
    answer:
      'The proof test interval is determined during the safety system design and documented in the maintenance instructions. It depends on the required SIL/PL, the diagnostic coverage of automatic tests and the assumed useful life of components. Typical intervals range from monthly to annually. The interval directly affects the probability of failure calculations.',
  },
  {
    question: 'What happens if a machine does not meet the Machinery Directive?',
    answer:
      "A machine that does not comply with the Machinery Directive's essential health and safety requirements cannot legally be placed on the market or put into service in the UK/EU. Market surveillance authorities can require the machine to be withdrawn, recalled or modified. Serious non-compliance can result in prosecution of the manufacturer.",
  },
  {
    question: 'Is functional safety only about electrical systems?',
    answer:
      'No. While IEC 61508 focuses on E/E/PE (electrical/electronic/programmable electronic) systems, ISO 13849-1 covers all technologies including mechanical, hydraulic and pneumatic safety-related parts. Functional safety principles (lifecycle approach, risk assessment, validation) apply regardless of the technology used.',
  },
  {
    question: 'What is the difference between verification and validation in functional safety?',
    answer:
      "Verification checks that the safety system has been designed and built correctly according to the specification (are we building it right?). Validation checks that the safety system meets the user's actual requirements and performs correctly in the real application (are we building the right thing?). Both are required by ISO 13849-2.",
  },
];

const MOETModule5Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.3 · Subsection 5"
        title="Functional Safety Principles"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Safety lifecycle, IEC 61508 framework, ALARP, Machinery Directive compliance and
            Technical File requirements — the legal and technical scaffolding every other page in
            this section sits inside.
          </p>

          <TLDR
            points={[
              'Functional safety: Depends on systems operating correctly in response to inputs.',
              'Safety lifecycle: Concept, risk analysis, SRS, design, validation, operation, decommissioning.',
              'ALARP: Risk reduced to As Low As Reasonably Practicable.',
              'IEC 61508: Parent standard for all sector-specific safety standards.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define functional safety and explain how it relates to overall machine safety',
              'Describe the safety lifecycle approach from concept to decommissioning',
              'Explain the three-step risk reduction method of ISO 12100',
              'Outline the relationship between IEC 61508 and sector-specific standards',
              'Describe Machinery Directive requirements including Technical File and Declaration of Conformity',
              'Explain proof testing, the ALARP principle and systematic versus random failures',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Proof testing:</strong> Periodic tests to reveal hidden dangerous failures.
              </li>
              <li>
                <strong>Technical File:</strong> Must contain risk assessment, PL calculations and
                test records.
              </li>
              <li>
                <strong>Compliance:</strong> Machinery Directive, CE/UKCA marking, Declaration of
                Conformity.
              </li>
              <li>
                <strong>ST1426:</strong> Understand safety standards and compliance framework.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>What is functional safety?</ContentEyebrow>

          <ConceptBlock title="Safety that depends on a system working correctly, not just being present">
            <p>
              Functional safety is the part of overall safety that depends on active systems
              operating correctly in response to their inputs. Unlike passive safety measures
              (guards, barriers, enclosures), functional safety relies on the correct functioning of
              safety-related electrical, electronic and programmable electronic (E/E/PE) control
              systems. If the safety system fails to operate when needed, or operates incorrectly,
              the safety function is lost.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Functional safety in practice">
            <p>Consider an emergency stop circuit — it is a functional safety system because:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Input:</strong> It must detect the E-stop activation (sensing element).
              </li>
              <li>
                <strong>Processing:</strong> The safety relay must process the input correctly
                (logic element).
              </li>
              <li>
                <strong>Output:</strong> Power must be removed from hazardous actuators (final
                element).
              </li>
              <li>
                All three elements must work correctly for the safety function to be performed.
              </li>
              <li>
                The reliability of this chain is what functional safety standards quantify and
                verify.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The ALARP principle">
            <p>
              ALARP (As Low As Reasonably Practicable) is the fundamental risk acceptance principle:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Intolerable region:</strong> Risk is so high it cannot be justified — must
                be reduced regardless of cost.
              </li>
              <li>
                <strong>ALARP region:</strong> Risk is tolerable only if further reduction is
                grossly disproportionate to the benefit.
              </li>
              <li>
                <strong>Broadly acceptable region:</strong> Risk is negligible — no further action
                needed.
              </li>
              <li>
                The burden of proof is on the duty holder to demonstrate that risk has been reduced
                to ALARP.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Functional safety is not about eliminating all risk — that
              is impossible. It is about reducing risk to an acceptable level through reliable
              safety systems that are designed, validated, maintained and tested throughout their
              lifecycle.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The safety lifecycle</ContentEyebrow>

          <ConceptBlock title="A framework covering every phase, not just initial design">
            <p>
              IEC 61508 introduces the safety lifecycle — a structured framework that covers all
              phases from initial concept through to decommissioning. This systematic approach
              ensures that safety is considered at every stage, not just during initial design.
              Missing any phase can leave gaps that compromise safety.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safety lifecycle phases">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Concept and scope:</strong> Define the equipment under control, operating
                environment and safety system boundary.
              </li>
              <li>
                <strong>Hazard and risk analysis:</strong> Identify all hazards, assess risk
                (severity x likelihood), determine tolerable risk level.
              </li>
              <li>
                <strong>Safety Requirements Specification (SRS):</strong> Define each safety
                function, its required SIL/PL, response time and fault behaviour.
              </li>
              <li>
                <strong>Design and development:</strong> Design the safety system to meet the SRS —
                select architectures, components and technologies.
              </li>
              <li>
                <strong>Integration and validation:</strong> Integrate with the machine, perform
                functional tests, fault simulation and validation.
              </li>
              <li>
                <strong>Operation and maintenance:</strong> Operate with defined proof test
                intervals, maintenance schedules and management-of-change procedures.
              </li>
              <li>
                <strong>Modification:</strong> Any change must go through a formal
                management-of-change process, with re-assessment and re-validation.
              </li>
              <li>
                <strong>Decommissioning:</strong> Safely decommission ensuring no residual hazards
                remain.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Maintenance relevance">
            <p>
              As a maintenance technician, you operate within the &quot;operation and
              maintenance&quot; phase of the safety lifecycle. Your activities — proof testing,
              fault diagnosis, component replacement, documentation — are all part of maintaining
              the safety integrity that was designed in. Failure to follow the maintenance
              procedures undermines the entire lifecycle.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Standards framework</ContentEyebrow>

          <ConceptBlock title="One parent standard, several sector-specific children">
            <p>
              Functional safety standards form a hierarchy. IEC 61508 is the parent standard, and
              sector-specific standards are derived from it. Understanding this hierarchy helps when
              reading safety documentation and understanding why specific standards are referenced.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Standards hierarchy">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Standard</th>
                    <th className="py-2 pr-4 font-medium text-white">Scope</th>
                    <th className="py-2 font-medium text-white">Measure</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IEC 61508</td>
                    <td className="py-2 pr-4">Parent — all E/E/PE safety systems</td>
                    <td className="py-2">SIL 1-4</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">ISO 13849-1</td>
                    <td className="py-2 pr-4">Machinery — all technologies</td>
                    <td className="py-2">PL a-e</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IEC 62061</td>
                    <td className="py-2 pr-4">Machinery — E/E/PE only</td>
                    <td className="py-2">SIL 1-3</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IEC 61511</td>
                    <td className="py-2 pr-4">Process industry (chemical, oil and gas)</td>
                    <td className="py-2">SIL 1-4</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">IEC 61513</td>
                    <td className="py-2 pr-4">Nuclear power</td>
                    <td className="py-2">SIL 1-4</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">BS EN ISO 12100</td>
                    <td className="py-2 pr-4">Risk assessment methodology</td>
                    <td className="py-2">Three-step risk reduction</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="ISO 12100 three-step risk reduction">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Inherently safe design:</strong> Eliminate hazards through the
                design itself (reduce forces, speeds, energies; use inherently safe materials).
              </li>
              <li>
                <strong>Step 2 — Safeguarding:</strong> Apply guards, interlocks, safety devices and
                complementary protective measures for hazards that cannot be eliminated.
              </li>
              <li>
                <strong>Step 3 — Information for use:</strong> Provide warnings, labels, operating
                instructions and training for residual risks.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> The three steps must be applied in order. Information
              (Step 3) cannot substitute for guarding (Step 2), and guarding cannot substitute for
              inherently safe design (Step 1). Each step only addresses the residual risk remaining
              after the previous step.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Machinery Directive and compliance</ContentEyebrow>

          <ConceptBlock title="The legal framework requiring machinery to be safe">
            <p>
              The Machinery Directive 2006/42/EC (retained in UK law as the Supply of Machinery
              (Safety) Regulations 2008) is the legal framework that requires all machinery placed
              on the market to be safe. It sets Essential Health and Safety Requirements (EHSRs)
              that manufacturers must meet.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Manufacturer's obligations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk assessment:</strong> Perform a thorough risk assessment specific to the
                machine.
              </li>
              <li>
                <strong>Design to EHSRs:</strong> Design the machine to meet all applicable
                essential requirements.
              </li>
              <li>
                <strong>Technical File:</strong> Compile comprehensive documentation proving
                compliance.
              </li>
              <li>
                <strong>Declaration of Conformity:</strong> Issue a signed declaration listing the
                applicable directives and standards.
              </li>
              <li>
                <strong>CE/UKCA marking:</strong> Affix the appropriate conformity marking.
              </li>
              <li>
                <strong>Instructions:</strong> Provide operating instructions in the language of the
                user country.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Technical File contents">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>General description and drawings of the machine.</li>
              <li>Full risk assessment documentation.</li>
              <li>List of essential requirements and how each is addressed.</li>
              <li>Standards applied (and any deviations with justification).</li>
              <li>Design calculations for safety-related systems (SISTEMA reports).</li>
              <li>Test reports and validation records.</li>
              <li>Operating instructions.</li>
              <li>Declaration of Conformity.</li>
            </ul>
            <p>
              The Technical File must be retained for at least 10 years after the last machine in
              the series is manufactured and must be available for inspection by market surveillance
              authorities.
            </p>
            <p>
              <strong>Harmonised standards:</strong> Standards like ISO 13849-1, IEC 62061 and BS EN
              60204-1, when their references are published in the Official Journal, give a
              presumption of conformity with the specific EHSRs they cover. This does not replace
              the need for a machine-specific risk assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Proof testing, failure types and maintenance role</ContentEyebrow>

          <ConceptBlock title="Two kinds of failure, addressed by different measures">
            <p>
              Understanding the types of failures and the role of proof testing is essential for
              maintenance technicians who are responsible for maintaining safety integrity
              throughout the operational life of the machine.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Systematic failures">
            <p>Caused by errors in design, specification, procedures or human factors:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Incorrect safety relay wiring.</li>
              <li>Wrong component specification.</li>
              <li>Software bugs in safety controllers.</li>
              <li>Inadequate installation procedures.</li>
              <li>Addressed by: quality processes, reviews, testing, competence.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Random hardware failures">
            <p>Caused by physical degradation of components over time:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Contact wear in safety relays.</li>
              <li>Insulation breakdown.</li>
              <li>Component drift due to temperature cycling.</li>
              <li>Mechanical fatigue in switching devices.</li>
              <li>Addressed by: redundancy, diagnostics, proof testing, MTTFd data.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Proof testing">
            <p>
              Proof testing (periodic testing, function testing) is the systematic testing of safety
              functions to reveal dangerous hidden failures that accumulate over time and are not
              detected by the system&apos;s own automatic diagnostics.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Interval:</strong> Determined during safety system design — typically
                monthly to annually depending on PL/SIL.
              </li>
              <li>
                <strong>Scope:</strong> Must test the complete safety function from input through
                logic to output.
              </li>
              <li>
                <strong>Fault conditions:</strong> Where safe to do so, simulate fault conditions
                (e.g. disconnecting feedback loop).
              </li>
              <li>
                <strong>Documentation:</strong> Record all results with date, tester, device serial
                numbers and findings.
              </li>
              <li>
                <strong>Impact on PFH:</strong> The proof test interval directly affects the PFH
                calculation — missing tests degrades safety integrity.
              </li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians must understand the importance of proof testing,
              perform tests according to documented procedures, and recognise that skipping or
              delaying proof tests reduces the safety integrity of the system. Always document your
              tests and report any faults through the correct channels.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Functional safety depends on a system (sensing, logic, final element) working correctly on demand — it is not the same as passive measures like guards and barriers.',
              'ALARP has three regions: intolerable (must reduce regardless of cost), ALARP (tolerable only if further reduction is grossly disproportionate), and broadly acceptable (negligible, no action needed).',
              'The safety lifecycle runs from concept and risk analysis through the SRS, design, validation, operation and maintenance, modification and decommissioning — maintenance sits inside "operation and maintenance".',
              "ISO 12100's three steps (inherently safe design, safeguarding, information for use) must be applied in that order — later steps only cover what earlier steps left as residual risk.",
              'IEC 61508 is the parent E/E/PE functional-safety standard; ISO 13849-1 (PL a-e, all technologies), IEC 62061 (SIL 1-3, E/E/PE only), IEC 61511 (process) and IEC 61513 (nuclear) are sector-specific children of it.',
              'The Machinery Directive 2006/42/EC (UK: Supply of Machinery (Safety) Regulations 2008) requires a risk assessment, a Technical File, a Declaration of Conformity and CE/UKCA marking — the Technical File must be kept 10 years after the last unit is made.',
              'Systematic failures come from design/process/human error and are addressed by quality processes; random hardware failures come from physical degradation and are addressed by redundancy, diagnostics and proof testing.',
              'Proof testing reveals dangerous hidden failures the automatic diagnostics miss — its interval directly affects the PFH calculation, so skipping or delaying it genuinely degrades safety integrity.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Category and Performance Levels
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Back to overview <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Section 5.3 overview
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section3_5;
