/**
 * MOET · Module 5 · Section 3 · Subsection 4 — Category and Performance Levels (ISO 13849)
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. This page is safety-focused (ISO 13849 verification), so the
 * statements below are taken verbatim from the brief's Module 1 health-and-
 * safety list rather than the electrical-theory lists used elsewhere in
 * Module 5.
 *   Knowledge  · "Safe systems of work."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Accuracy note: ISO 13849-1/-2 (Categories B/1/2/3/4, Performance Levels,
 * PFHd, MTTFd, DCavg, CCF, SISTEMA) and IEC 62061 (SIL) citations are
 * standard, uncontested functional-safety references and are kept exactly as
 * written. No GS38, thermography, test-interval or C&G-qualification claims
 * appear on this page.
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

const TITLE = 'Category and Performance Levels (ISO 13849) - MOET Module 5 Section 3.4';
const DESCRIPTION =
  'Understanding ISO 13849-1 categories, Performance Levels, MTTFd, DCavg, CCF and the SISTEMA verification tool for safety-related control systems. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'pl-count',
    question: 'How many Performance Levels does ISO 13849-1 define?',
    options: [
      '6 (Cat B to Cat 4 plus two extras)',
      '4 (SIL 1 to SIL 4)',
      '3 (PL a to PL c)',
      '5 (PL a to PL e)',
    ],
    correctIndex: 3,
    explanation:
      'ISO 13849-1 defines five Performance Levels: PL a (lowest reliability) to PL e (highest reliability), each corresponding to a range of probability of dangerous failure per hour (PFHd).',
  },
  {
    id: 'cat3-vs-cat1',
    question: 'What does Category 3 require that Category 1 does not?',
    options: [
      'Redundancy so a single fault does not cause loss of the safety function',
      'The use of well-tried components in the safety circuit',
      'The application of basic safety principles to the design',
      'A higher mean time to dangerous failure for each component',
    ],
    correctIndex: 0,
    explanation:
      'Category 3 introduces redundancy (typically dual-channel architecture) so that a single fault is tolerated without loss of the safety function. Category 1 relies on well-tried components but has no redundancy.',
  },
  {
    id: 'pfhd',
    question: 'What parameter represents the probability of dangerous failure per hour?',
    options: ['MTTFd', 'CCF', 'DCavg', 'PFHd'],
    correctIndex: 3,
    explanation:
      'PFHd (Probability of dangerous Failure per Hour) is the quantitative measure used to determine the achieved Performance Level. Lower PFHd values indicate higher safety integrity.',
  },
  {
    id: 'pl-vs-plr',
    question:
      'If the required Performance Level (PLr) is d and the achieved PL is c, is this acceptable?',
    options: [
      'No — the achieved PL must be greater than or equal to the required PLr',
      'Yes — PL c is acceptable provided the architecture is Category 3 or higher',
      'Yes — any achieved PL is acceptable once a risk assessment has been done',
      'No — the achieved PL must always be exactly equal to the required PLr',
    ],
    correctIndex: 0,
    explanation:
      'The achieved PL must meet or exceed the required PLr. PL c is less than PLr d, so the safety system does not meet the requirement. The system must be redesigned to achieve at least PL d.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which standard provides the framework for Performance Levels of safety-related control systems?',
    options: ['IEC 61131-3', 'ISO 13849-1', 'BS 7671', 'IEC 60204-1'],
    correctAnswer: 1,
    explanation:
      "ISO 13849-1 'Safety-related parts of control systems' defines categories, Performance Levels, and the validation process for safety-related control systems of machinery.",
  },
  {
    id: 2,
    question: 'What is the required Performance Level (PLr) determined by?',
    options: [
      'The number of redundant channels used in the safety circuit architecture',
      'The MTTFd rating of the least reliable component in the system',
      'A risk assessment considering severity, frequency and possibility of avoidance',
      'The diagnostic coverage achieved by the automatic test functions',
    ],
    correctAnswer: 2,
    explanation:
      'PLr is determined by risk assessment using three parameters: severity of injury (S1/S2), frequency/duration of exposure (F1/F2), and possibility of avoiding the hazard (P1/P2).',
  },
  {
    id: 3,
    question: 'What does MTTFd stand for?',
    options: [
      'Minimum Testing Time for devices',
      'Maximum Time To Fix defects',
      'Machine Tolerance Threshold for design',
      'Mean Time To dangerous Failure',
    ],
    correctAnswer: 3,
    explanation:
      'MTTFd is the Mean Time To dangerous Failure — the average time before a component experiences a dangerous failure mode. It is classified as low (3-10 years), medium (10-30 years) or high (30-100 years).',
  },
  {
    id: 4,
    question: 'What is Diagnostic Coverage (DCavg)?',
    options: [
      'The proportion of dangerous failures that are detected by automatic testing',
      'The average time before a component suffers a dangerous failure mode',
      'The proportion of channels that are physically separated from one another',
      'The total number of safety functions performed by the control system',
    ],
    correctAnswer: 0,
    explanation:
      'DCavg is the average Diagnostic Coverage — the percentage of dangerous failures detected by automatic diagnostic functions such as pulse testing, feedback monitoring and cross-channel checking.',
  },
  {
    id: 5,
    question: 'A Category B system has what fundamental requirement?',
    options: [
      'Dual-channel redundancy so that a single fault is always tolerated',
      'Safety function performed using basic safety principles only — no specific fault resistance',
      'Periodic automatic testing to detect dangerous faults between demands',
      'Tolerance to an accumulation of faults without loss of the safety function',
    ],
    correctAnswer: 1,
    explanation:
      'Category B is the baseline — it requires basic safety principles to be applied but does not require resistance to faults. A single fault can cause loss of the safety function.',
  },
  {
    id: 6,
    question: 'What is Common Cause Failure (CCF)?',
    options: [
      'A failure that affects only one channel of a redundant safety system',
      'A failure that is always detected and reported by the diagnostic functions',
      'A single event that causes failure of multiple channels simultaneously',
      'A failure that occurs gradually as a component reaches the end of its life',
    ],
    correctAnswer: 2,
    explanation:
      'CCF is a failure caused by a single event that affects both channels of a redundant system simultaneously (e.g., a power surge, extreme temperature, systematic design error, or contamination).',
  },
  {
    id: 7,
    question: 'How are measures against CCF scored in ISO 13849-1?',
    options: [
      'A pass or fail judgement made by the design engineer alone',
      'A percentage of the total PFHd calculated for the system',
      'A star rating from one to five awarded by the certifying body',
      'Points system totalling a minimum of 65 out of 100',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 13849-1 Annex F provides a scoring system for CCF measures. Categories include physical separation, diversity, environmental protection, competence and training. A minimum score of 65 out of 100 is required.',
  },
  {
    id: 8,
    question: 'What is the relationship between Category and Performance Level?',
    options: [
      'Category defines the architecture; PL is the achieved reliability calculated from category, MTTFd, DCavg and CCF',
      'Category and PL are interchangeable terms describing exactly the same property',
      'PL defines the architecture; Category is then looked up directly from the PL value',
      'Category sets the proof-test interval; PL has no connection to the architecture',
    ],
    correctAnswer: 0,
    explanation:
      'Category defines the structural architecture (redundancy, diagnostics). The achieved PL is then calculated considering the category plus the reliability parameters MTTFd, DCavg and CCF.',
  },
  {
    id: 9,
    question:
      'Which tool does ISO 13849-1 provide for determining the achieved PL from quantitative parameters?',
    options: [
      'The risk graph using the severity, frequency and avoidance parameters',
      'Bar charts in the annexes (simplified approach) or calculation per the detailed method',
      'A scoring table awarding points for measures against common cause failure',
      'A fault tree drawn from the machine circuit diagram by the design engineer',
    ],
    correctAnswer: 1,
    explanation:
      'The standard provides simplified tables and bar charts in the annexes where the category, MTTFd range and DCavg range are used to look up the achieved PL. The detailed method uses the full PFHd calculation.',
  },
  {
    id: 10,
    question: 'What must be true for the safety system to be acceptable?',
    options: [
      'The achieved PL must be exactly equal to the required PLr, never higher',
      'The achieved PL must be lower than the required PLr to avoid over-engineering',
      'The achieved PL must be greater than or equal to the required PLr',
      'The category must always be 4 regardless of the required PLr',
    ],
    correctAnswer: 2,
    explanation:
      'The achieved Performance Level must meet or exceed the required Performance Level determined by the risk assessment. Exceeding the PLr is acceptable; falling short is not.',
  },
  {
    id: 11,
    question: 'In Category 4, what happens when faults accumulate?',
    options: [
      'The first fault is tolerated, but a second accumulated fault causes loss of the safety function',
      'The safety function is lost as soon as any single fault occurs in either channel',
      'Faults are ignored entirely because Category 4 relies only on well-tried components',
      'The safety function is always performed — an accumulation of faults does not cause loss of the safety function',
    ],
    correctAnswer: 3,
    explanation:
      'Category 4 is the most stringent — even an accumulation of undetected faults does not cause loss of the safety function. This requires both high diagnostic coverage and resistance to common cause failures.',
  },
  {
    id: 12,
    question: 'What is SISTEMA and what is it used for?',
    options: [
      'A free software tool from the German IFA for calculating the achieved PL per ISO 13849-1',
      'A label printer used to mark safety components with their PL rating on site',
      'A handheld instrument for measuring the response time of a safety circuit',
      'A mandatory annual inspection scheme administered by the HSE for machinery',
    ],
    correctAnswer: 0,
    explanation:
      'SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications) is a free tool from the German IFA. It guides the user through defining subsystems, entering component data and calculating the achieved PL.',
  },
];

const faqs = [
  {
    question: 'What is the difference between ISO 13849-1 and IEC 62061?',
    answer:
      'Both standards address safety-related control systems for machinery. ISO 13849-1 uses Performance Levels (PL a-e) and covers all technologies (mechanical, hydraulic, pneumatic, electrical). IEC 62061 uses Safety Integrity Levels (SIL 1-3) and is limited to electrical/electronic/programmable electronic systems. Both are harmonised under the Machinery Directive and either can be used.',
  },
  {
    question: 'How do I determine the required Performance Level?',
    answer:
      'Use the risk graph in ISO 13849-1 Clause 4. Assess three parameters: S (severity of injury — S1 slight/reversible or S2 serious/irreversible), F (frequency/duration of exposure — F1 seldom/short or F2 frequent/long), and P (possibility of avoiding the hazard — P1 possible or P2 scarcely possible). The combination gives PLr from a to e.',
  },
  {
    question: 'Can I achieve PL e with a Category 3 architecture?',
    answer:
      'In theory, Category 3 can achieve up to PL e if MTTFd is high and DCavg is high. However, in practice, Category 4 architecture is typically needed to reliably achieve PL e because Category 4 additionally requires tolerance to fault accumulation, which is difficult to demonstrate with Category 3 alone.',
  },
  {
    question: 'What software tools are available for ISO 13849 calculations?',
    answer:
      'The most widely used tool is SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications), provided free by the German IFA (Institut fuer Arbeitsschutz). It guides the user through the PL calculation process, manages component libraries and generates verification reports. Some safety device manufacturers also provide SISTEMA libraries for their products.',
  },
  {
    question: 'What is the difference between Category 2 and Category 3?',
    answer:
      'Category 2 uses periodic automatic testing to detect faults — between tests, a fault may exist undetected. Category 3 uses redundancy (dual channels) so that a single fault does not cause loss of the safety function regardless of when testing occurs. Category 3 provides continuous protection through redundancy.',
  },
];

const MOETModule5Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.3 · Subsection 4"
        title="Category and Performance Levels"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            ISO 13849-1 categories, Performance Levels, key parameters and the SISTEMA verification
            tool — the numbers behind whether a safety circuit is good enough.
          </p>

          <TLDR
            points={[
              'Categories: B (baseline), 1 (well-tried), 2 (tested), 3 (redundant), 4 (accumulation tolerant).',
              'Performance Levels: PL a (lowest) to PL e (highest reliability).',
              'Key parameters: MTTFd, DCavg, CCF determine achieved PL.',
              'Requirement: Achieved PL must meet or exceed PLr from risk assessment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the five designated architectures (Categories B, 1, 2, 3, 4) and their fault tolerance',
              'Define Performance Levels PL a through PL e and their PFHd ranges',
              'Use the risk graph to determine the Required Performance Level (PLr)',
              'Describe the parameters MTTFd, DCavg and CCF and their role in PL calculation',
              'Outline the verification and validation process for safety control systems',
              'Compare ISO 13849-1 (Performance Levels) with IEC 62061 (Safety Integrity Levels)',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Replacement:</strong> Components must match or exceed original PL/SIL
                rating.
              </li>
              <li>
                <strong>Proof testing:</strong> Interval determined by PL calculation and validation
                plan.
              </li>
              <li>
                <strong>Documentation:</strong> Technical File must contain PL calculations and test
                records.
              </li>
              <li>
                <strong>ST1426:</strong> Understand safety system integrity requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Designated architectures (Categories)</ContentEyebrow>

          <ConceptBlock title="Category defines the structure; PL is the achieved reliability">
            <p>
              ISO 13849-1 defines five designated architectures, called Categories, that describe
              the structural requirements for safety-related control system parts. Each category
              specifies the level of fault resistance, redundancy and diagnostic capability
              required. The category is the starting point — it defines the structure, while the
              reliability parameters determine the achieved Performance Level.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Category summary">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Category</th>
                    <th className="py-2 pr-4 font-medium text-white">Key requirement</th>
                    <th className="py-2 font-medium text-white">Fault behaviour</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">B</td>
                    <td className="py-2 pr-4">Basic safety principles</td>
                    <td className="py-2">Single fault can cause loss of safety function</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2 pr-4">Well-tried components and principles</td>
                    <td className="py-2">Single fault can cause loss, but less likely</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">2</td>
                    <td className="py-2 pr-4">Periodic automatic testing</td>
                    <td className="py-2">Fault detected by test; may exist between tests</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">3</td>
                    <td className="py-2 pr-4">Redundancy (dual-channel)</td>
                    <td className="py-2">Single fault tolerated; detected at/before next demand</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">4</td>
                    <td className="py-2 pr-4">Redundancy + accumulation tolerance</td>
                    <td className="py-2">Even accumulated faults do not cause loss</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Practical examples">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category B/1:</strong> A simple guard interlock on a low-risk machine using
                a positive-opening switch (well-tried component).
              </li>
              <li>
                <strong>Category 2:</strong> A light curtain with periodic self-test — the
                controller checks the sensor function at start-up and periodically during operation.
              </li>
              <li>
                <strong>Category 3:</strong> A dual-channel E-stop circuit monitored by a safety
                relay — the most common architecture for E-stops and guard interlocks.
              </li>
              <li>
                <strong>Category 4:</strong> A press safety system using redundant light curtains,
                redundant safety controllers and comprehensive diagnostics — highest integrity.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Performance Levels and PFHd</ContentEyebrow>

          <ConceptBlock title="Five levels, each a range of dangerous-failure probability">
            <p>
              Performance Level (PL) is the discrete level used to specify the ability of
              safety-related control system parts to perform a safety function under foreseeable
              conditions. The five levels are defined by ranges of PFHd (Probability of dangerous
              Failure per Hour).
            </p>
          </ConceptBlock>

          <ConceptBlock title="PL and PFHd range">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">PL</th>
                    <th className="py-2 pr-4 font-medium text-white">PFHd range (per hour)</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PL a</td>
                    <td className="py-2 pr-4">10^-5 to less than 10^-4</td>
                    <td className="py-2">Low-risk auxiliary functions</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PL b</td>
                    <td className="py-2 pr-4">3 x 10^-6 to less than 10^-5</td>
                    <td className="py-2">Simple guard interlocks</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PL c</td>
                    <td className="py-2 pr-4">10^-6 to less than 3 x 10^-6</td>
                    <td className="py-2">Standard machine safety functions</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PL d</td>
                    <td className="py-2 pr-4">10^-7 to less than 10^-6</td>
                    <td className="py-2">E-stops, interlocks on higher-risk machines</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">PL e</td>
                    <td className="py-2 pr-4">10^-8 to less than 10^-7</td>
                    <td className="py-2">Press safety systems, robotic cell entry</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Risk graph for determining PLr">
            <p>
              The Required Performance Level (PLr) is determined by a risk assessment using three
              parameters:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>S (Severity):</strong> S1 = slight/reversible injury, S2 =
                serious/irreversible injury or death.
              </li>
              <li>
                <strong>F (Frequency/Duration):</strong> F1 = seldom/short exposure, F2 =
                frequent/long exposure.
              </li>
              <li>
                <strong>P (Possibility of avoidance):</strong> P1 = possible under certain
                conditions, P2 = scarcely possible.
              </li>
            </ul>
            <p>
              Example: A guard interlock on a CNC lathe — S2 (amputation risk), F2 (frequent access
              for loading), P2 (scarcely possible to avoid) gives PLr = e.
            </p>
            <p>
              <strong>Key point:</strong> The achieved PL must meet or exceed the PLr. If the
              calculation shows PL c but PLr is d, the safety system must be redesigned — typically
              by increasing the category (adding redundancy), improving component MTTFd, or
              increasing diagnostic coverage.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Key parameters: MTTFd, DCavg and CCF</ContentEyebrow>

          <ConceptBlock title="Three quantitative parameters, one architecture">
            <p>
              Three quantitative parameters, combined with the category architecture, determine the
              achieved Performance Level. Understanding these parameters is essential for
              interpreting safety system documentation and understanding why specific components and
              architectures are used.
            </p>
          </ConceptBlock>

          <ConceptBlock title="MTTFd — Mean Time To dangerous Failure">
            <p>
              The average time before a component experiences a dangerous failure mode. Classified
              into three ranges:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Low:</strong> 3 to 10 years.
              </li>
              <li>
                <strong>Medium:</strong> 10 to 30 years.
              </li>
              <li>
                <strong>High:</strong> 30 to 100 years.
              </li>
            </ul>
            <p>
              Values are obtained from manufacturer data, reliability databases (SN 29500, FMEDA
              reports) or field experience. The channel MTTFd is calculated from individual
              component values using the parts count method.
            </p>
          </ConceptBlock>

          <ConceptBlock title="DCavg — Average Diagnostic Coverage">
            <p>The percentage of dangerous failures detected by automatic diagnostic functions:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>None:</strong> DC less than 60%.
              </li>
              <li>
                <strong>Low:</strong> 60% to less than 90%.
              </li>
              <li>
                <strong>Medium:</strong> 90% to less than 99%.
              </li>
              <li>
                <strong>High:</strong> 99% or greater.
              </li>
            </ul>
            <p>
              Examples: Safety relay pulse testing on inputs (medium DC), feedback loop monitoring
              of contactors (high DC), plausibility checking between redundant sensors (high DC).
            </p>
          </ConceptBlock>

          <ConceptBlock title="CCF — Common Cause Failure">
            <p>
              Measures resistance to faults that could affect both channels simultaneously. ISO
              13849-1 Annex F scores measures including:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Physical separation of signal paths.</li>
              <li>Diversity of components (different manufacturers/technologies).</li>
              <li>Environmental protection (overvoltage, EMI, temperature).</li>
              <li>Well-designed processes (competence, training, management of change).</li>
            </ul>
            <p>A minimum score of 65 out of 100 is required for Categories 2, 3 and 4.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Verification, validation and SISTEMA</ContentEyebrow>

          <ConceptBlock title="Confirming the system does what it is meant to under fault conditions">
            <p>
              ISO 13849-2 specifies validation requirements for safety-related control systems.
              Validation confirms that the safety system meets its specification and achieves the
              required PL under all foreseeable conditions, including fault conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SISTEMA software tool">
            <p>
              SISTEMA (Safety Integrity Software Tool for the Evaluation of Machine Applications)
              from the German IFA is the industry-standard tool for ISO 13849-1 calculations:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Free to download from the IFA website.</li>
              <li>Guides the user through defining subsystems and entering component data.</li>
              <li>Manages component libraries from major safety device manufacturers.</li>
              <li>Calculates the achieved PL and generates verification reports.</li>
              <li>Highlights where the achieved PL does not meet the PLr.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Validation process">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Analysis:</strong> Review circuit diagrams, component specifications,
                failure mode analysis.
              </li>
              <li>
                <strong>Testing:</strong> Functional tests under normal and fault conditions,
                environmental tests.
              </li>
              <li>
                <strong>Fault simulation:</strong> Introduce simulated faults and verify the system
                responds correctly.
              </li>
              <li>
                <strong>Documentation:</strong> Risk assessment, SISTEMA reports, test records,
                fault simulation results.
              </li>
            </ul>
            <p>
              <strong>Maintenance note:</strong> As a maintenance technician, you will not typically
              perform PL calculations, but you must understand the documentation and ensure that any
              component replacement maintains the original PL. Replacing a PL d safety relay with a
              PL c device would reduce the safety integrity and require re-validation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>ISO 13849 vs IEC 62061</ContentEyebrow>

          <ConceptBlock title="Two harmonised standards, different measures">
            <p>
              Two standards are available for designing safety-related control systems for
              machinery. Understanding the differences helps when working with safety documentation
              and communicating with design engineers.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Feature</th>
                    <th className="py-2 pr-4 font-medium text-white">ISO 13849-1</th>
                    <th className="py-2 font-medium text-white">IEC 62061</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Measure</td>
                    <td className="py-2 pr-4">Performance Level (PL a-e)</td>
                    <td className="py-2">Safety Integrity Level (SIL 1-3)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Technologies</td>
                    <td className="py-2 pr-4">
                      All (mechanical, hydraulic, pneumatic, electrical)
                    </td>
                    <td className="py-2">E/E/PE only</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Architecture</td>
                    <td className="py-2 pr-4">Categories B, 1, 2, 3, 4</td>
                    <td className="py-2">Subsystem architecture A, B, C, D</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Calculation</td>
                    <td className="py-2 pr-4">Simplified (tables) or detailed</td>
                    <td className="py-2">Detailed PFHd calculation</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Tool</td>
                    <td className="py-2 pr-4">SISTEMA</td>
                    <td className="py-2">Manufacturer-specific or spreadsheet</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="italic">
              Both standards are harmonised under the Machinery Directive and provide a presumption
              of conformity. ISO 13849-1 is more widely used in the UK for general machinery
              applications, particularly where non-electrical technologies are involved. IEC 62061
              is preferred for complex programmable electronic safety systems.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Categories B/1/2/3/4 describe the architecture (fault resistance and diagnostics); the achieved Performance Level is then calculated from category plus MTTFd, DCavg and CCF.',
              'PL a is the lowest reliability and PL e the highest, each defined by a PFHd (probability of dangerous failure per hour) range — the achieved PL must meet or exceed the required PLr from the risk assessment.',
              'PLr comes from a risk graph using severity (S1/S2), frequency/duration (F1/F2) and possibility of avoidance (P1/P2) — never assumed, always assessed.',
              'MTTFd is classified low/medium/high (3-10 / 10-30 / 30-100 years); DCavg is none/low/medium/high (<60% / 60-90% / 90-99% / ≥99%); CCF is scored against a 100-point checklist with a minimum of 65 required for Categories 2-4.',
              'Category 3 tolerates a single fault via redundancy; Category 4 additionally tolerates an accumulation of faults — the most stringent architecture.',
              'SISTEMA (free, from the German IFA) is the industry-standard tool for calculating achieved PL and generating verification reports.',
              'A replacement component must maintain or exceed the original PL/SIL rating — swapping in a lower-rated device reduces safety integrity and requires re-validation.',
              'ISO 13849-1 (Performance Levels, all technologies) and IEC 62061 (SIL, electrical/electronic/programmable only) are both harmonised under the Machinery Directive — either can be used.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Safety Relays and Controllers
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Functional Safety Principles
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section3_4;
