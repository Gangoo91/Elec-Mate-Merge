/**
 * Module 1 · Section 2 · Subsection 2 — Risk Assessment Process
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The HSE five-step risk assessment, likelihood-severity matrices and ALARP. Engineer-in-training
 *   perspective: producing a defendable RA that the principal contractor and HSE will accept,
 *   not a tick-box exercise.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Risk Assessment Process - HNC Module 1 Section 2.2';
const DESCRIPTION =
  'Master the HSE five steps to risk assessment, likelihood and severity scales, risk matrices, and recording requirements for building services electrical installations.';

const quickCheckQuestions = [
  {
    id: 'hse-steps',
    question: 'How many steps are there in the HSE risk assessment process?',
    options: [
      '4 steps',
      '5 steps',
      '6 steps',
      '3 steps',
    ],
    correctIndex: 1,
    explanation:
      'The HSE five steps to risk assessment are: (1) Identify hazards, (2) Decide who might be harmed, (3) Evaluate risks and decide on precautions, (4) Record significant findings, (5) Review and update.',
  },
  {
    id: 'risk-calculation',
    question: 'How is risk typically calculated in a risk matrix?',
    options: [
      'Severity ÷ Likelihood',
      'Likelihood - Severity',
      'Likelihood × Severity',
      'Likelihood + Severity',
    ],
    correctIndex: 2,
    explanation:
      'Risk = Likelihood × Severity. This multiplication gives a risk score that helps prioritise which hazards need immediate attention and which control measures are most appropriate.',
  },
  {
    id: 'review-frequency',
    question: 'When must a risk assessment be reviewed?',
    options: [
      'Equipment remains live when switched \\\\\\\'off\\\\\\\'',
      'Open plan offices over 60m² and sports halls',
      'When circumstances change or at regular intervals',
      'Limited access for tools and reduced working space',
    ],
    correctIndex: 2,
    explanation:
      'Risk assessments must be reviewed when circumstances change significantly (new equipment, processes, or personnel), after incidents, and at regular intervals to ensure they remain valid.',
  },
  {
    id: 'five-employees',
    question:
      'Risk assessments must be recorded in writing when an employer has how many employees?',
    options: [
      '10 or more',
      '5 or more',
      'Any number',
      '3 or more',
    ],
    correctIndex: 1,
    explanation:
      'Under the Management of Health and Safety at Work Regulations 1999, employers with 5 or more employees must record the significant findings of their risk assessments in writing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the first step in the HSE five steps to risk assessment?',
    options: [
      'Decide who might be harmed',
      'Identify the hazards',
      'Record your findings',
      'Evaluate the risks',
    ],
    correctAnswer: 1,
    explanation:
      'Step 1 is to identify the hazards. You must systematically examine the workplace, tasks, and activities to identify anything that could cause harm before you can assess who is at risk.',
  },
  {
    id: 2,
    question: "On a 5×5 risk matrix, what risk score range is typically classified as 'High Risk'?",
    options: [
      '17-25',
      '1-4',
      '10-16',
      '5-9',
    ],
    correctAnswer: 2,
    explanation:
      "On a 5×5 matrix (scores 1-25), high risk is typically 10-16. Scores of 17-25 are usually 'Very High' or 'Intolerable', while 5-9 is 'Medium' and 1-4 is 'Low'.",
  },
  {
    id: 3,
    question:
      'Which group of people must be specifically considered when identifying who might be harmed?',
    options: [
      'A crane, chain block, or hydraulic gantry rated for the transformer\\\\\\\\\\\\\\\'s weight',
      'A persistent fault still exists on the circuit',
      'At least 10 years after the last machine in the series is manufactured',
      'Employees, contractors, visitors, and members of the public',
    ],
    correctAnswer: 3,
    explanation:
      'Step 2 requires considering everyone who might be affected, including employees, contractors, cleaners, visitors, maintenance staff, delivery drivers, and members of the public who may be nearby.',
  },
  {
    id: 4,
    question: "What does 'ALARP' mean in risk assessment terminology?",
    options: [
      'As Low As Reasonably Practicable',
      'Always Lower All Risk Priorities',
      'Assess Likelihood And Risk Potential',
      'Apply Legal And Regulatory Procedures',
    ],
    correctAnswer: 0,
    explanation:
      "ALARP means 'As Low As Reasonably Practicable'. Risks should be reduced to this level, balancing the cost and effort of further reduction against the benefits gained.",
  },
  {
    id: 5,
    question:
      'In a 3×3 risk matrix with severity levels Low (1), Medium (2), and High (3), what is the risk score for a hazard with Medium likelihood and High severity?',
    options: [
      '5',
      '6',
      '9',
      '3',
    ],
    correctAnswer: 1,
    explanation:
      "Risk = Likelihood × Severity. Medium likelihood (2) × High severity (3) = 6. This would typically be classified as a 'High' risk requiring control measures.",
  },
  {
    id: 6,
    question: 'What must be included when recording significant findings?',
    options: [
      'By showing how BMS improves compliance and efficiency',
      'Unique circuit references, load descriptions, and protective device coordination',
      'Hazards, people at risk, existing controls, and further actions needed',
      'All metered energy including electricity, gas, oil, and district heating',
    ],
    correctAnswer: 2,
    explanation:
      'Significant findings must include: the hazards identified, groups of people who might be harmed, existing control measures, risk ratings, and any further actions required to reduce risk.',
  },
  {
    id: 7,
    question:
      'When working on live LV electrical equipment, what severity rating would electric shock typically receive on a 5-point scale?',
    options: [
      '1 - Negligible',
      '2 - Minor',
      '4 - Major',
      '5 - Catastrophic',
    ],
    correctAnswer: 3,
    explanation:
      'Electric shock from LV equipment (230V/400V) can cause fatality, so it typically receives a severity rating of 5 (Catastrophic) or 4 (Major) depending on the specific circumstances and voltage levels.',
  },
  {
    id: 8,
    question: 'Which of the following would trigger an immediate review of a risk assessment?',
    options: [
      'A near-miss incident',
      'Good weather conditions',
      "A colleague's birthday",
      'Normal daily operations',
    ],
    correctAnswer: 0,
    explanation:
      'Near-miss incidents indicate that controls may be inadequate and the risk assessment should be reviewed immediately. Other triggers include accidents, new equipment, process changes, or new information about hazards.',
  },
  {
    id: 9,
    question:
      'For a cable installation project in a busy office, which hazard would typically have the HIGHEST likelihood rating?',
    options: [
      'By paying Class 2 voluntary contributions',
      'Manual handling injuries from cable drums',
      'If they employ 5 or more people',
      'PIR (Passive Infrared) sensor',
    ],
    correctAnswer: 1,
    explanation:
      'Manual handling injuries from cable drums would have the highest likelihood as this activity occurs frequently during cable installation. Electric shock is less likely if safe isolation is followed, and explosion/collapse are very unlikely in a standard office.',
  },
  {
    id: 10,
    question: 'What is the hierarchy of control measures in order of effectiveness?',
    options: [
      'PPE, Engineering controls, Elimination, Substitution',
      'Substitution, Elimination, PPE, Engineering controls',
      'Elimination, Substitution, Engineering controls, Administrative controls, PPE',
      'Administrative controls, PPE, Engineering controls, Elimination',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy of control (most to least effective): Elimination, Substitution, Engineering controls, Administrative controls, PPE. Always consider higher-level controls before relying on PPE as a last resort.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a hazard and a risk?',
    answer:
      'A hazard is something with the potential to cause harm (e.g., exposed live conductors, working at height). A risk is the likelihood that harm will actually occur combined with how severe that harm could be. Risk assessment evaluates both elements to prioritise control measures.',
  },
  {
    question: 'Do I need a separate risk assessment for every job?',
    answer:
      'Not necessarily. Generic risk assessments can cover routine activities with similar hazards. However, site-specific assessments are needed when conditions vary significantly, such as confined spaces, occupied premises, or unusual electrical systems. Many contractors use a combination of generic assessments plus site-specific additions.',
  },
  {
    question: 'Who is legally responsible for conducting risk assessments?',
    answer:
      'The employer has legal responsibility under the Management of Health and Safety at Work Regulations 1999. However, competent persons should actually conduct the assessments. For building services, this typically means someone with electrical knowledge, site experience, and risk assessment training.',
  },
  {
    question: 'How detailed should a risk assessment be?',
    answer:
      'Proportionate to the level of risk. High-risk activities (live working, confined spaces) require detailed, task-specific assessments. Lower-risk routine work may use simpler generic assessments. The key is that significant risks are identified and adequate controls documented - avoid both over-complication and dangerous oversimplification.',
  },
  {
    question: "What is a 'suitable and sufficient' risk assessment?",
    answer:
      "This legal term means the assessment must identify all significant hazards, consider who might be harmed, evaluate the risks properly, and implement appropriate controls. It doesn't need to address every trivial risk, but must cover anything that could cause real harm. The level of detail should match the complexity and severity of the risks involved.",
  },
  {
    question: 'Can risk assessments be done electronically?',
    answer:
      'Yes, electronic risk assessments are fully acceptable and increasingly common. Digital systems offer advantages including easier updating, version control, accessibility on site via mobile devices, and automatic review reminders. The legal requirement is that findings are recorded - the format is not specified.',
  },
];

const HNCModule1Section2_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1.2.2"
            title="Risk Assessment Process"
            description="Systematic evaluation of workplace hazards using the HSE five-step approach for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will produce risk assessments that satisfy MHSWR Reg 3 — &ldquo;suitable and sufficient&rdquo; — and survive HSE scrutiny after an incident.',
              'You apply the HSE five-step process consistently — identify hazards, identify who could be harmed, evaluate risk, record significant findings, review.',
              'You can use a 3×3 or 5×5 matrix and explain ALARP versus the Tolerability of Risk model — including when residual risk crosses the broadly acceptable line.',
              'You write residual-risk content that the supervisor and operative can act on, not legalistic prose nobody reads.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 3(6)"
            clause="An employer or self-employed person shall review the assessment required by paragraph (1) or (2) if—(a) there is reason to suspect that it is no longer valid; or (b) there has been a significant change in the matters to which it relates; and where as a result of any such review changes to an assessment are required, the employer or self-employed person concerned shall make them."
            meaning={
              <>
                A risk assessment that has not been reviewed after a change is presumed
                inadequate. As an HNC supervisor you trigger reviews on equipment change,
                personnel change, layout change, near-miss and incident.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Reg 3(6) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Apply the HSE five steps to risk assessment systematically",
              "Use likelihood and severity scales to calculate risk scores",
              "Interpret 3×3 and 5×5 risk matrices correctly",
              "Record significant findings to meet legal requirements",
              "Identify triggers for risk assessment review and updates",
              "Apply risk assessment principles to building services scenarios",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>HSE Five Steps to Risk Assessment</ContentEyebrow>

          <ConceptBlock title="HSE Five Steps to Risk Assessment">
            <p>
            The Health and Safety Executive (HSE) provides a straightforward five-step process for
            conducting risk assessments. This systematic approach ensures all significant hazards
            are identified and properly controlled in building services installations.
            </p>

            <div className="my-6 space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-elec-yellow">
            <p className="text-sm font-medium text-elec-yellow mb-2">
            Step 1: Identify the Hazards
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Walk around the workplace and observe activities</li>
            <li>Consult employees who perform the tasks daily</li>
            <li>Review manufacturer instructions and data sheets</li>
            <li>Check accident and ill-health records</li>
            <li>Consider non-routine operations and maintenance</li>
            </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-blue-400">
            <p className="text-sm font-medium text-blue-400 mb-2">
            Step 2: Decide Who Might Be Harmed and How
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Workers directly involved in the task</li>
            <li>Other workers nearby (cleaners, maintenance)</li>
            <li>Contractors and visitors on site</li>
            <li>Members of the public</li>
            <li>
            Vulnerable groups: young workers, pregnant women, disabled persons
            </li>
            </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-green-400">
            <p className="text-sm font-medium text-green-400 mb-2">
            Step 3: Evaluate Risks and Decide on Precautions
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Consider existing control measures already in place</li>
            <li>Calculate risk score (likelihood × severity)</li>
            <li>
            Compare against industry standards and legal requirements
            </li>
            <li>
            Apply hierarchy of control: eliminate, substitute, engineer, admin, PPE
            </li>
            <li>Reduce risks to ALARP (As Low As Reasonably Practicable)</li>
            </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-purple-400">
            <p className="text-sm font-medium text-purple-400 mb-2">
            Step 4: Record Your Significant Findings
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Document hazards and who is at risk</li>
            <li>List existing and additional control measures</li>
            <li>Assign responsibilities and target dates for actions</li>
            <li>Legal requirement if you have 5 or more employees</li>
            <li>Good practice regardless of size</li>
            </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border-l-4 border-orange-400">
            <p className="text-sm font-medium text-orange-400 mb-2">
            Step 5: Review and Update
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Set a review date (typically annually for low-risk activities)
            </li>
            <li>Review immediately after accidents or near-misses</li>
            <li>Update when work processes or equipment change</li>
            <li>Consider new information about hazards</li>
            <li>Verify control measures remain effective</li>
            </ul>
            </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> Risk assessment is an ongoing process, not a one-time
            paperwork exercise. It should be 'suitable and sufficient' - proportionate to the
            level of risk.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Likelihood and Severity Scales</ContentEyebrow>

          <ConceptBlock title="Likelihood and Severity Scales">
            <p>
            Risk assessment requires quantifying both how likely harm is to occur and how severe
            the consequences would be. Standard scales allow consistent evaluation across
            different hazards and enable prioritisation of control measures.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            5-Point Likelihood Scale
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1</strong> — Rating: Rare. Description: Unlikely to ever occur</li>
            <li><strong>2</strong> — Rating: Unlikely. Description: Could occur but not expected</li>
            <li><strong>3</strong> — Rating: Possible. Description: Might occur occasionally</li>
            <li><strong>4</strong> — Rating: Likely. Description: Probably will occur</li>
            <li><strong>5</strong> — Rating: Almost Certain. Description: Expected to occur frequently</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">5-Point Severity Scale</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1</strong> — Rating: Negligible. Description: Minor injury, no lost time</li>
            <li><strong>2</strong> — Rating: Minor. Description: First aid injury, short absence</li>
            <li><strong>3</strong> — Rating: Moderate. Description: Medical treatment, extended absence</li>
            <li><strong>4</strong> — Rating: Major. Description: Serious injury, long-term disability</li>
            <li><strong>5</strong> — Rating: Catastrophic. Description: Fatality or multiple serious injuries</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Factors Affecting Likelihood
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Frequency of exposure to hazard</li>
            <li>Duration of exposure</li>
            <li>Existing control measures</li>
            <li>Competence of workers</li>
            <li>Condition of equipment</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Factors Affecting Severity
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Nature of the hazard (voltage, height, weight)</li>
            <li>Number of people potentially affected</li>
            <li>Vulnerability of those at risk</li>
            <li>PPE and emergency response available</li>
            <li>Environmental conditions</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> Always consider severity 'with existing controls in
            place' but likelihood 'if controls fail or are absent' to identify residual risk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Risk Matrices (3×3 and 5×5)</ContentEyebrow>

          <ConceptBlock title="Risk Matrices (3×3 and 5×5)">
            <p>
            Risk matrices provide a visual tool for combining likelihood and severity scores to
            determine overall risk levels. The resulting risk score guides the priority and type
            of control measures required.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-3">
            3×3 Risk Matrix (Simple)
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>High Likelihood (3)</strong> — Low Severity (1): 3 - Medium. Medium Severity (2): 6 - High. High Severity (3): 9 - Very High</li>
            <li><strong>Medium Likelihood (2)</strong> — Low Severity (1): 2 - Low. Medium Severity (2): 4 - Medium. High Severity (3): 6 - High</li>
            <li><strong>Low Likelihood (1)</strong> — Low Severity (1): 1 - Low. Medium Severity (2): 2 - Low. High Severity (3): 3 - Medium</li>
            </ul>
            
            <p className="text-xs text-white mt-2">
            3×3 matrix: scores 1-2 = Low, 3-4 = Medium, 6 = High, 9 = Very High
            </p>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-3">
            5×5 Risk Matrix (Detailed)
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Almost Certain (5)</strong> — Negligible (1): 5. Minor (2): 10. Moderate (3): 15. Major (4): 20. Catastrophic (5): 25</li>
            <li><strong>Likely (4)</strong> — Negligible (1): 4. Minor (2): 8. Moderate (3): 12. Major (4): 16. Catastrophic (5): 20</li>
            <li><strong>Possible (3)</strong> — Negligible (1): 3. Minor (2): 6. Moderate (3): 9. Major (4): 12. Catastrophic (5): 15</li>
            <li><strong>Unlikely (2)</strong> — Negligible (1): 2. Minor (2): 4. Moderate (3): 6. Major (4): 8. Catastrophic (5): 10</li>
            <li><strong>Rare (1)</strong> — Negligible (1): 1. Minor (2): 2. Moderate (3): 3. Major (4): 4. Catastrophic (5): 5</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Risk Level Actions (5×5 Matrix)
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1-4</strong> — Level: Low. Required Action: Monitor and maintain existing controls</li>
            <li><strong>5-9</strong> — Level: Medium. Required Action: Additional controls required; implement reasonably practicable measures</li>
            <li><strong>10-16</strong> — Level: High. Required Action: Urgent action required; work should not proceed until risk reduced</li>
            <li><strong>17-25</strong> — Level: Very High. Required Action: Intolerable; stop work immediately; eliminate hazard or find alternative method</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Practical tip:</strong> 5×5 matrices offer finer granularity for complex
            operations. 3×3 matrices are simpler and often sufficient for routine work with clear
            hazards.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Recording Significant Findings and Review Requirements</ContentEyebrow>

          <ConceptBlock title="Recording Significant Findings and Review Requirements">
            <p>
            The Management of Health and Safety at Work Regulations 1999 require employers with
            five or more employees to record the significant findings of their risk assessments.
            Good record-keeping is also essential evidence of due diligence.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Record</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Activity/task:</strong> Clear description of the work being assessed
            </li>
            <li>
            <strong>Hazards identified:</strong> All significant hazards that could cause harm
            </li>
            <li>
            <strong>Who is at risk:</strong> Specific groups including vulnerable persons
            </li>
            <li>
            <strong>Existing controls:</strong> Measures already in place
            </li>
            <li>
            <strong>Risk rating:</strong> Likelihood, severity, and overall score
            </li>
            <li>
            <strong>Additional controls:</strong> Further measures to reduce risk
            </li>
            <li>
            <strong>Action owner:</strong> Person responsible for implementing controls
            </li>
            <li>
            <strong>Target date:</strong> When actions will be completed
            </li>
            <li>
            <strong>Review date:</strong> When assessment will be reviewed
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-3">
            Example: Cable Installation Risk Assessment Extract
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electric shock (isolation failure)</strong> — Who at Risk: Electricians. L: 2. S: 5. R: 10. Controls: Safe isolation, GS38 probes, lock-off</li>
            <li><strong>Manual handling (cable drums)</strong> — Who at Risk: All workers. L: 4. S: 3. R: 12. Controls: Mechanical aids, team lifts, training</li>
            <li><strong>Work at height (cable trays)</strong> — Who at Risk: Electricians. L: 3. S: 4. R: 12. Controls: MEWP, scaffolding, harness systems</li>
            <li><strong>Trips (trailing cables)</strong> — Who at Risk: All building users. L: 3. S: 2. R: 6. Controls: Cable covers, barriers, signage</li>
            </ul>
            
            <p className="text-xs text-white mt-2">
            L = Likelihood, S = Severity, R = Risk Score (L×S)
            </p>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Triggers for Review</p>
            
            
            <p className="text-xs font-medium text-red-400 mb-2">Immediate Review Required</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Accident or near-miss incident</li>
            <li>Significant change in process</li>
            <li>New equipment introduced</li>
            <li>New hazard information available</li>
            <li>Regulatory changes</li>
            </ul>
            
            
            <p className="text-xs font-medium text-green-400 mb-2">Periodic Review</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>At least annually for most activities</li>
            <li>More frequently for high-risk work</li>
            <li>Before contract renewals</li>
            <li>Following staff changes</li>
            <li>As part of safety audits</li>
            </ul>
            
            
            

            <p className="text-sm text-white italic">
            <strong>Legal note:</strong> Risk assessments must be readily accessible to those who
            need them - workers, safety representatives, and enforcement officers.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services Risk Assessment Examples">
            <p><strong>Example 1: Consumer Unit Replacement</strong></p>
            <p className="text-sm text-white mb-3">
            <strong>Task:</strong> Replace existing consumer unit in occupied domestic property
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white space-y-2">
            <p>
            <strong>Key Hazards Identified:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Electric shock during isolation verification (L:2, S:5, R:10 - High)</li>
            <li>Arc flash if live working required (L:2, S:4, R:8 - Medium)</li>
            <li>Manual handling of unit and cables (L:3, S:2, R:6 - Medium)</li>
            <li>Dust inhalation from drilling (L:4, S:2, R:8 - Medium)</li>
            </ul>
            <p className="mt-3">
            <strong>Control Measures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Safe isolation procedure with GS38 compliant test equipment</li>
            <li>Lock-off devices and warning labels</li>
            <li>RPE for drilling operations</li>
            <li>Inform occupants of isolation periods</li>
            </ul>
            </div>
            

            
            <p><strong>Example 2: Commercial Lighting Installation</strong></p>
            <p className="text-sm text-white mb-3">
            <strong>Task:</strong> Install new LED lighting system in occupied office building
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white space-y-2">
            <p>
            <strong>Key Hazards Identified:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Falls from height using access equipment (L:3, S:4, R:12 - High)</li>
            <li>Electric shock from existing circuits (L:2, S:5, R:10 - High)</li>
            <li>Dropped objects onto office workers (L:3, S:3, R:9 - Medium)</li>
            <li>Eye strain from temporary lighting (L:4, S:1, R:4 - Low)</li>
            </ul>
            <p className="mt-3">
            <strong>Control Measures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>MEWP or scaffolding for sustained work at height</li>
            <li>Exclusion zones below work areas</li>
            <li>Out-of-hours working where possible</li>
            <li>Phased isolation to maintain emergency lighting</li>
            </ul>
            </div>
            

            
            <p><strong>Example 3: Distribution Board Testing</strong></p>
            <p className="text-sm text-white mb-3">
            <strong>Task:</strong> Periodic inspection and testing of three-phase distribution
            board
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white space-y-2">
            <p>
            <strong>Key Hazards Identified:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Contact with 400V live parts (L:2, S:5, R:10 - High)</li>
            <li>Arc flash during panel removal (L:2, S:5, R:10 - High)</li>
            <li>Disruption to critical circuits (L:3, S:3, R:9 - Medium)</li>
            <li>Working in cramped switch room (L:3, S:2, R:6 - Medium)</li>
            </ul>
            <p className="mt-3">
            <strong>Control Measures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Partial isolation where full isolation not possible</li>
            <li>Arc-rated PPE (face shield, gloves, FR clothing)</li>
            <li>Barrier and insulating matting</li>
            <li>Coordination with building management</li>
            </ul>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Risk Assessment Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Have all significant hazards been identified?</li>
            <li>Have all people who might be affected been considered?</li>
            <li>Are existing controls documented and effective?</li>
            <li>Has the risk been reduced to ALARP?</li>
            <li>Are responsibilities and timescales assigned?</li>
            <li>Is a review date set and communicated?</li>
            </ul>
            </div>

            <div>
            <p><strong>Hierarchy of Control (ERICPD)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Eliminate:</strong> Remove the hazard entirely (e.g., design out work at
            height)
            </li>
            <li>
            <strong>Reduce:</strong> Substitute with less hazardous alternative
            </li>
            <li>
            <strong>Isolate:</strong> Engineering controls to separate people from hazard
            </li>
            <li>
            <strong>Control:</strong> Safe systems of work, procedures
            </li>
            <li>
            <strong>PPE:</strong> Personal protective equipment as last resort
            </li>
            <li>
            <strong>Discipline:</strong> Training, supervision, enforcement
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Generic only:</strong> Using generic assessments without site-specific
            additions
            </li>
            <li>
            <strong>Never reviewed:</strong> Treating risk assessment as one-time paperwork
            </li>
            <li>
            <strong>PPE first:</strong> Jumping straight to PPE without considering higher
            controls
            </li>
            <li>
            <strong>Missing groups:</strong> Forgetting contractors, visitors, or public
            </li>
            <li>
            <strong>No actions:</strong> Identifying risks but not implementing controls
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Risk-assessing a temporary mains supply for a marquee event"
            situation={
              <>
                Your firm is providing temporary supply for a 5-day outdoor event. 100 m runs
                of armoured cable from a rented genset to a single marquee distribution unit.
                Public access throughout, heavy footfall, possible rain.
              </>
            }
            whatToDo={
              <>
                Apply the five steps. Identify hazards (electric shock, trip, fire, public
                contact, weather). Identify who could be harmed (event staff, public, performers,
                you). Evaluate using a 5×5 matrix — likelihood (5 — public touch), severity (5 —
                fatal). Record significant findings — TT supply with 30 mA RCD, BS 7671 Section
                711 compliance, IP44 distribution, ramped cable protectors, perimeter fencing,
                daily insulation testing, signage. Review on day 3 after weather forecast change.
              </>
            }
            whyItMatters={
              <>
                Section 711 (events) and Section 740 (mobile units) of BS 7671 set the technical
                framework, but the risk assessment is what makes the design defendable in court.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'HSE five-step risk assessment: identify hazards, identify who, evaluate risk, record significant findings, review.',
              'MHSWR Reg 3 requires &ldquo;suitable and sufficient&rdquo; — the depth scales with the complexity of the work.',
              'Likelihood × severity matrix is a tool, not the answer — your judgement on residual risk is what counts.',
              'ALARP (As Low As Reasonably Practicable) is the UK regulator&rsquo;s preferred test — risk reduced until further reduction would be grossly disproportionate.',
              'Tolerability of Risk: intolerable region (must be reduced regardless of cost), tolerable region (apply ALARP), broadly acceptable region (no further action normally needed).',
              'Record significant findings only — burying important controls in a 30-page document defeats the purpose.',
              'Review triggers: change of equipment, personnel, location, substance, procedure or after any near-miss or incident.',
              'Generic risk assessments are a starting point — the duty is on the employer to make them site-specific.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Control Measures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section2_2;
