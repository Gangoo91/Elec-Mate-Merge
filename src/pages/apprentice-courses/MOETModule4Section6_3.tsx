/**
 * MOET · Module 4 · Section 6.3 · Subsection 3 — Fishbone (Ishikawa) Diagrams
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not
 * invent codes here.
 *   Knowledge  · "Electrical. Common electrical plant, equipment, and
 *                 systems failure modes."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *   Behaviour  · "Continuous improvement (CI) systems and techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The
 * monospace fish-skeleton diagram is the original page's own ASCII
 * rendering, kept as-is — no diagram component exists for this topic, and
 * this page would clearly benefit from a real fishbone/Ishikawa diagram
 * component (see the conversion report).
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fishbone (Ishikawa) Diagrams - MOET Module 4 Section 6.3';
const DESCRIPTION =
  'Using fishbone (Ishikawa) cause-and-effect diagrams for structured root cause analysis in electrical maintenance, including the 6M categories, construction method, team-based analysis and practical applications for ST1426 technicians.';

const quickCheckQuestions = [
  {
    id: 'fishbone-purpose',
    question: 'The primary purpose of a fishbone (Ishikawa) diagram in root cause analysis is to:',
    options: [
      'Visually organise and categorise all potential causes so none is overlooked',
      'Calculate the probability that each component will fail within a given period',
      'Record the sequence of repair steps taken to rectify a confirmed fault',
      'Rank faults by the cost of repair so the most expensive is fixed first',
    ],
    correctIndex: 0,
    explanation:
      "A fishbone diagram provides a structured visual framework that organises potential causes into categories. By systematically working through each category, the investigation team ensures that all possible cause areas are considered, reducing the risk of overlooking the actual root cause. The diagram becomes a visual record of the team's thinking process.",
  },
  {
    id: '6m-categories',
    question:
      "The standard '6M' categories used in a fishbone diagram for manufacturing and maintenance are:",
    options: [
      'Manpower, Money, Materials, Machinery, Marketing, Management',
      'Man, Machine, Method, Material, Measurement, Mother Nature',
      'Method, Measurement, Maintenance, Monitoring, Mitigation, Mapping',
      'Mechanical, Magnetic, Material, Measurement, Method, Motion',
    ],
    correctIndex: 1,
    explanation:
      'The 6M categories provide a comprehensive framework: Man (human factors such as skills, training, fatigue), Machine (equipment condition, design, age), Method (procedures, work instructions, maintenance strategy), Material (component quality, specification, storage), Measurement (instrumentation, calibration, data accuracy), and Mother Nature (environmental factors such as temperature, humidity, contamination). These categories ensure all potential cause areas are explored.',
  },
  {
    id: 'fishbone-team',
    question: 'A fishbone diagram analysis is most effective when conducted:',
    options: [
      'By the most senior engineer working alone to avoid disagreement and keep the analysis quick',
      'Only after the equipment has been fully dismantled and laid out for detailed inspection',
      'By an external consultant with no prior knowledge of the specific plant or its history',
      'By a small team combining operators, technicians, engineers and supervisors',
    ],
    correctIndex: 3,
    explanation:
      'Team-based analysis brings diverse perspectives: the operator knows how the equipment behaves in normal and abnormal conditions, the technician knows the maintenance history and common failure modes, the engineer understands the design intent and specifications, and the supervisor has an overview of procedural and organisational factors. This combined knowledge produces a more thorough analysis than any individual could achieve alone.',
  },
  {
    id: 'fishbone-next-step',
    question:
      'After completing a fishbone diagram with all potential causes identified, the next step is to:',
    options: [
      'Immediately replace every component listed anywhere on the diagram as a potential cause',
      'Treat the most likely-looking branch as the confirmed root cause without any testing',
      'Systematically evaluate each potential cause against the available evidence',
      'Archive the diagram and close the investigation as soon as it has been drawn up',
    ],
    correctIndex: 2,
    explanation:
      'The fishbone diagram identifies potential causes — it does not confirm which one is the actual root cause. The next step is to evaluate each potential cause against the available evidence: test results, inspection findings, maintenance records, operating data and witness statements. Causes that are contradicted by evidence are eliminated, and those supported by evidence are investigated further until the root cause is confirmed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The fishbone diagram was developed by:',
    options: [
      'W. Edwards Deming in the 1980s as part of total quality management',
      'Kaoru Ishikawa in the 1960s as part of quality management in Japanese manufacturing',
      'Henry Ford in the 1920s for assembly line efficiency',
      'Taiichi Ohno in the 1950s as part of the Toyota Production System',
    ],
    correctAnswer: 1,
    explanation:
      'Professor Kaoru Ishikawa developed the cause-and-effect diagram at the University of Tokyo in the 1960s. It was originally used for quality improvement in manufacturing but has since been adopted across all industries for root cause analysis. It is also known as the Ishikawa diagram or, due to its shape, the fishbone diagram.',
  },
  {
    id: 2,
    question: "In a fishbone diagram, the 'effect' (problem being investigated) is placed at:",
    options: [
      'On the first category branch nearest the head of the fish',
      'On a separate sheet alongside the main diagram',
      'The head of the fish — at the right-hand end of the central spine',
      'At the left-hand end of the central spine where the bones begin',
    ],
    correctAnswer: 2,
    explanation:
      'The effect (the problem or fault being investigated) is written at the head of the fish, at the right-hand end of the central horizontal line (the spine). The main category branches extend from the spine like ribs, and individual potential causes are written as sub-branches off each category branch. The diagram reads from left to right, with causes leading to the effect.',
  },
  {
    id: 3,
    question:
      "Under the 'Man' (People) category of a fishbone diagram for a motor failure, potential causes might include:",
    options: [
      'High ambient temperature, dust ingress, vibration and corrosive atmosphere at the motor location',
      'Component wear, inadequate cooling capacity, undersized drive rating, or a manufacturing defect',
      'Use of a counterfeit bearing, wrong grease specification, or a part degraded in storage',
      'Inadequate training, lubrication procedure not followed, or incorrect installation torque',
    ],
    correctAnswer: 3,
    explanation:
      'The Man (People) category covers all human factors that could contribute to the fault: inadequate training or competence, failure to follow procedures, errors during maintenance or operation, fatigue, communication failures, and inadequate supervision. It is important to explore these factors without assigning blame — the goal is to identify systemic issues (training gaps, unclear procedures) rather than individual failings.',
  },
  {
    id: 4,
    question:
      "Under the 'Machine' (Equipment) category, potential causes for a VSD failure might include:",
    options: [
      'Component wear, inadequate cooling, undersized rating, or a previous non-genuine repair',
      'Inadequate training on the drive, failure to follow the commissioning procedure, or operator error during set-up',
      'An uncalibrated test meter giving misleading readings during the last inspection',
      'A dusty, hot or humid plant room causing the drive to overheat over time',
    ],
    correctAnswer: 0,
    explanation:
      'The Machine category covers all equipment-related factors: design limitations, component wear or degradation, inadequate specification or rating, manufacturing defects, previous repairs or modifications, condition of associated components (cooling fans, filters), and the interaction between the equipment and its connected systems.',
  },
  {
    id: 5,
    question: "Under the 'Method' (Process) category, potential causes might include:",
    options: [
      'Worn bearings, an undersized drive, or an age-related component failure',
      'Outdated procedures, inadequate PM frequency, or lock-out/tag-out not followed',
      'A counterfeit replacement part or a component degraded in storage before use',
      'An uncalibrated insulation tester producing inaccurate test results',
    ],
    correctAnswer: 1,
    explanation:
      'The Method category examines how work is done: are maintenance procedures correct and up to date? Is the preventive maintenance frequency appropriate? Are work instructions clear and accessible? Are operating parameters within specification? Were safe working procedures followed? Method-related root causes are among the most common and most preventable — improving procedures prevents recurrence.',
  },
  {
    id: 6,
    question: "The 'Material' category in a fishbone diagram for electrical maintenance covers:",
    options: [
      'Operator fatigue, inadequate training, and failure to follow procedures',
      'Outdated maintenance procedures and an inadequate PM frequency',
      'Component quality, part specification, storage conditions, and counterfeit parts',
      'Instrument calibration, test method selection, and interpretation of results',
    ],
    correctAnswer: 2,
    explanation:
      'Material factors include the quality and specification of replacement components, whether the correct part was used, storage conditions that may have degraded the part before use, the possibility of counterfeit or substandard components, lubricant quality and suitability, and material degradation due to age, temperature or chemical exposure. Using the wrong specification of fuse, contactor or cable is a material-related root cause.',
  },
  {
    id: 7,
    question: "The 'Measurement' category examines:",
    options: [
      'Whether the correct replacement part was specified and stored properly',
      'Whether the work procedure and PM frequency were appropriate',
      'Whether environmental conditions such as temperature and humidity were within limits',
      'Whether instruments were calibrated, the right test method used, and results read correctly',
    ],
    correctAnswer: 3,
    explanation:
      'Measurement factors include instrument calibration (was the insulation tester calibrated?), correct test method (was the right test voltage applied?), data interpretation (were the results correctly compared to acceptable limits?), sensor accuracy (was the temperature sensor reading correctly?), and monitoring system reliability (was the condition monitoring data being collected and analysed?).',
  },
  {
    id: 8,
    question: "The 'Mother Nature' (Environment) category covers:",
    options: [
      'Temperature, humidity, dust, vibration, chemical exposure and EMC interference',
      'Operator competence, training gaps, and errors made during maintenance',
      'The specification and quality of the replacement components fitted',
      'Whether instruments were calibrated and test results interpreted correctly',
    ],
    correctAnswer: 0,
    explanation:
      "Environmental factors include ambient temperature (too high or too low), humidity and moisture (condensation, water ingress), dust and contamination, vibration from nearby equipment, chemical exposure (corrosive atmospheres), electromagnetic interference (from VSDs, welding, radio transmitters), altitude, and any other aspect of the operating environment that differs from the equipment's designed operating conditions.",
  },
  {
    id: 9,
    question: 'A key advantage of the fishbone diagram over the 5 Whys technique is:',
    options: [
      'It always identifies a single definitive root cause without needing any evidence',
      'It gives a visual overview of all cause categories, so a whole area is less likely to be missed',
      'It can only ever be applied by a single experienced engineer working entirely alone',
      'It removes the need to evaluate any of the potential causes against the evidence',
    ],
    correctAnswer: 1,
    explanation:
      'The 5 Whys technique follows a single linear chain of causation and can miss parallel causes or contributing factors. The fishbone diagram provides a comprehensive visual framework that systematically explores all cause categories. This breadth of analysis is particularly valuable for complex faults where multiple factors may contribute. However, the techniques are complementary — the 5 Whys can be used to drill deeper into specific branches of the fishbone diagram.',
  },
  {
    id: 10,
    question: 'When brainstorming potential causes on a fishbone diagram, you should:',
    options: [
      'Record only the causes that the most senior person in the room considers likely',
      'Dismiss any cause that seems improbable before it is even written on the diagram',
      'List every possible cause first, then evaluate each one against the evidence',
      'Limit the diagram to a single category so the analysis stays tightly focused',
    ],
    correctAnswer: 2,
    explanation:
      'The brainstorming phase should be open and non-judgemental — all potential causes are listed without evaluation. Dismissing ideas too early risks missing the actual root cause. Once the brainstorming is complete, each potential cause is then systematically evaluated against the available evidence. This two-phase approach (divergent thinking followed by convergent evaluation) is fundamental to effective root cause analysis.',
  },
  {
    id: 11,
    question:
      'After identifying the root cause using a fishbone diagram, the investigation should:',
    options: [
      'Discard the diagram now that the root cause has finally been found',
      'Replace the failed component and then consider the whole matter closed',
      'Move straight on to the next breakdown without recording any of the findings',
      'Document the analysis and assign corrective and preventive actions with owners',
    ],
    correctAnswer: 3,
    explanation:
      'Identifying the root cause is not the end of the process — it is the starting point for corrective action. The investigation should document the complete analysis (the fishbone diagram itself becomes part of the record), identify specific corrective actions to fix the immediate problem and preventive actions to prevent recurrence, assign clear responsibilities and timescales, and include a verification step to confirm the actions are effective.',
  },
  {
    id: 12,
    question:
      "In the context of ST1426, fishbone diagram analysis demonstrates the apprentice's ability to:",
    options: [
      'Apply structured analytical thinking and teamwork to identify systemic root causes',
      'Work entirely independently, never consulting colleagues or supervisors on a fault',
      'Memorise the manufacturer fault codes for every single piece of plant on the site',
      'Complete repairs as fast as possible regardless of the underlying cause of failure',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 values structured, systematic approaches to problem-solving. The fishbone diagram demonstrates analytical thinking (breaking a complex problem into manageable categories), teamwork (collaborative investigation), communication (presenting analysis to stakeholders), and continuous improvement (identifying systemic actions that prevent recurrence). These are core knowledge, skills and behaviours assessed in the End Point Assessment.',
  },
];

const faqs = [
  {
    question: 'When should I use a fishbone diagram instead of the 5 Whys?',
    answer:
      'Use the 5 Whys for simpler faults where the cause-and-effect chain is likely to be linear and straightforward. Use a fishbone diagram for more complex faults where multiple factors may be involved, where the cause is not immediately obvious, or where a team-based investigation will benefit from the structured visual framework. In practice, the two techniques work well together: use the fishbone to map out all potential cause areas, then use the 5 Whys to drill deeper into the most promising branches.',
  },
  {
    question: 'Do I need to use all six categories every time?',
    answer:
      'Not necessarily, but you should consider all six categories before deciding to exclude any. The value of the 6M framework is that it prompts you to think about cause areas you might otherwise overlook. Even if you conclude that a particular category is not relevant to this specific fault, the act of considering it demonstrates thorough analysis. For electrical maintenance, all six categories are almost always relevant to some degree.',
  },
  {
    question: 'How do I facilitate a fishbone diagram session with a team?',
    answer:
      'Start by clearly defining the problem (effect) and writing it at the head of the fish. Draw the main category branches. Then work through each category systematically, asking the team to suggest potential causes. Write every suggestion on the diagram without judgement. Once brainstorming is complete, review each potential cause and mark those supported by evidence. Prioritise the most probable causes for further investigation. Keep the session focused (60-90 minutes maximum) and ensure everyone contributes.',
  },
  {
    question: 'Can I use a fishbone diagram on my own or does it require a team?',
    answer:
      'You can absolutely use a fishbone diagram on your own — it provides a useful personal thinking framework for systematic analysis. However, team-based analysis is generally more effective because different people bring different knowledge and perspectives. If working alone, try to consider each category from different viewpoints: What would the operator say? What would the designer think? What does the maintenance history suggest? This helps compensate for the limitations of individual perspective.',
  },
  {
    question: 'How does the fishbone diagram relate to the ST1426 End Point Assessment?',
    answer:
      'The EPA does not specifically require you to draw a fishbone diagram, but it does assess your ability to apply structured analytical approaches to fault investigation and identify root causes. Being able to describe and apply the fishbone technique demonstrates a level of analytical competence that assessors value. In the professional discussion, explaining how you used a fishbone diagram to investigate a complex fault would be strong evidence of systematic thinking.',
  },
];

const MOETModule4Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.6 · Subsection 3"
        title="Fishbone (Ishikawa) Diagrams"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Structured cause-and-effect analysis for complex fault investigations.
          </p>

          <TLDR
            points={[
              'Visual tool: Organises all potential causes into structured categories',
              '6M framework: Man, Machine, Method, Material, Measurement, Mother Nature',
              'Team-based: Multiple perspectives improve analysis quality',
              'Evidence-driven: Potential causes are then evaluated against data',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complex faults:</strong> Use when multiple factors may contribute
              </li>
              <li>
                <strong>Complements 5 Whys:</strong> Broader scope, then drill deeper into branches
              </li>
              <li>
                <strong>Documentation:</strong> The diagram itself becomes part of the RCA record
              </li>
              <li>
                <strong>ST1426:</strong> Demonstrates structured analytical thinking at EPA
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Construct a fishbone (Ishikawa) diagram for a fault investigation',
              'Apply the 6M categories systematically to identify all potential causes',
              'Facilitate a team-based root cause analysis session using the fishbone framework',
              'Evaluate potential causes against evidence to identify the most probable root cause',
              'Integrate the fishbone technique with other RCA methods such as the 5 Whys',
              'Document fishbone analysis outcomes as part of the maintenance record',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Introduction to the fishbone diagram</ContentEyebrow>

          <ConceptBlock
            title="Introduction to the Fishbone Diagram"
            onSite="Key point: The fishbone diagram is a thinking tool, not a drawing exercise. Its value lies in the systematic exploration of potential causes, not in the neatness of the diagram. Focus on the quality of the analysis, not the aesthetics."
          >
            <p>
              The fishbone diagram — also known as the Ishikawa diagram or cause-and-effect diagram
              — is one of the most widely used tools in root cause analysis. Developed by Professor
              Kaoru Ishikawa at the University of Tokyo in the 1960s, it was originally created for
              quality improvement in Japanese manufacturing but has since become a standard
              analytical tool across all industries, including electrical maintenance.
            </p>
            <p>
              The diagram takes its name from its visual resemblance to a fish skeleton. The problem
              (effect) being investigated is written at the head of the fish, and potential causes
              are organised along branches (bones) extending from a central spine. Each main branch
              represents a category of potential causes, and individual causes are listed as
              sub-branches. This visual structure makes it easy to see the full scope of the
              investigation at a glance and ensures that no major cause category is overlooked.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When to use a fishbone diagram">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Complex faults:</strong> When the cause is not immediately obvious and
                multiple factors may be involved
              </li>
              <li>
                <strong>Recurring faults:</strong> When the same or similar faults keep occurring
                despite previous repairs
              </li>
              <li>
                <strong>Significant failures:</strong> When the consequences (safety, cost,
                downtime) justify a thorough investigation
              </li>
              <li>
                <strong>Team investigations:</strong> When multiple people with different knowledge
                and perspectives are available to contribute
              </li>
              <li>
                <strong>Learning opportunities:</strong> When the investigation will generate
                knowledge that benefits the wider organisation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Structure of the fishbone diagram">
            <div className="space-y-2 rounded bg-white/5 p-3 font-mono text-sm text-white">
              <p>Man ------- Machine ------- Method</p>
              <p>
                &nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
              </p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;========================== [EFFECT]</p>
              <p>
                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/
              </p>
              <p>Material -- Measurement -- Mother Nature</p>
            </div>
            <p className="text-[13px]">
              The central spine leads to the effect (problem). Six main branches represent the cause
              categories, with individual causes listed on sub-branches.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The 6M categories explained</ContentEyebrow>

          <ConceptBlock title="The 6M Categories Explained">
            <p>
              The standard framework for a fishbone diagram in manufacturing and maintenance uses
              six categories, known as the 6Ms. Each category represents a distinct area of
              potential causes. Working systematically through all six ensures comprehensive
              coverage of the possible cause space. While not every category will be relevant to
              every fault, considering each one prevents the investigation from becoming too narrow.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="The 6M Categories for Electrical Maintenance"
            headers={['Category', 'Focus Area', 'Example Causes in Electrical Maintenance']}
            rows={[
              [
                'Man (People)',
                'Human factors',
                'Inadequate training, procedure not followed, fatigue, communication failure',
              ],
              [
                'Machine (Equipment)',
                'Equipment condition',
                'Component wear, design weakness, undersized, age-related degradation',
              ],
              [
                'Method (Process)',
                'Procedures and strategy',
                'Incorrect PM frequency, outdated procedure, no work instruction',
              ],
              [
                'Material',
                'Component quality',
                'Wrong specification, counterfeit part, degraded in storage, incorrect lubricant',
              ],
              [
                'Measurement',
                'Data and instruments',
                'Uncalibrated tester, wrong test method, misinterpreted results',
              ],
              [
                'Mother Nature',
                'Environment',
                'High temperature, moisture, dust, vibration, EMC interference',
              ],
            ]}
          />

          <ConceptBlock
            title="Practical example: motor bearing failure"
            onSite="Key point: Do not stop at the first plausible cause you find. Work through all six categories before evaluating. Multiple contributing factors often combine to cause a failure — the fishbone diagram helps you identify all of them."
          >
            <p>
              A motor bearing failed after only 18 months of service (expected life 5 years).
              Applying the 6M categories:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Man:</strong> Was the bearing installed correctly? Was the correct grease
                applied? Was the motor shaft aligned properly?
              </li>
              <li>
                <strong>Machine:</strong> Is the motor oversized or undersized? Is there excessive
                shaft load from belt tension?
              </li>
              <li>
                <strong>Method:</strong> Is the PM lubrication schedule adequate? Was the
                installation procedure followed?
              </li>
              <li>
                <strong>Material:</strong> Was the correct bearing specification used? Was the
                grease compatible with the existing lubricant?
              </li>
              <li>
                <strong>Measurement:</strong> Was shaft alignment measured and verified? Were
                vibration readings taken after installation?
              </li>
              <li>
                <strong>Mother Nature:</strong> Is the motor in a dusty, hot or wet environment? Is
                there excessive vibration from nearby equipment?
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Constructing and facilitating a fishbone analysis</ContentEyebrow>

          <ConceptBlock
            title="Constructing and Facilitating a Fishbone Analysis"
            onSite='Facilitation tip: As the facilitator, your role is to keep the team focused, ensure all categories are explored, and prevent the discussion from being dominated by any single individual. Ask open questions: "What else could have contributed?" "Have we considered the environmental factors?" "What does the maintenance history tell us?"'
          >
            <p>
              Constructing a fishbone diagram follows a structured process that can be carried out
              individually or as a facilitated team session. For significant faults, a team session
              is strongly recommended because the combined knowledge and perspectives of operators,
              technicians, engineers and supervisors produce a more thorough analysis.
            </p>
            <ol className="list-decimal space-y-3 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Define the problem.</strong> Write a clear, specific problem statement at
                the head of the fish. &quot;Motor tripped on overload at 14:30 on 15 March — third
                occurrence in six months&quot; is far better than &quot;motor problem&quot;. The
                specificity focuses the analysis and helps the team concentrate on the actual issue
                rather than generalities.
              </li>
              <li>
                <strong>Draw the framework.</strong> Draw the central spine and the six main
                category branches. Use a whiteboard, flip chart or large sheet of paper so the whole
                team can see and contribute. Label each branch with one of the 6M categories. Leave
                enough space on each branch for multiple sub-branches.
              </li>
              <li>
                <strong>Brainstorm potential causes.</strong> Work through each category
                systematically. Ask the team: &quot;What factors under this category could have
                contributed to this problem?&quot; Record every suggestion as a sub-branch without
                judging or evaluating at this stage. Encourage all participants to contribute —
                often the most valuable insights come from operators who work with the equipment
                daily.
              </li>
              <li>
                <strong>Drill deeper.</strong> For each potential cause, ask &quot;why?&quot; to
                explore deeper sub-causes. This is where the fishbone technique integrates with the
                5 Whys — use the fishbone for breadth (all categories) and the 5 Whys for depth
                (drilling into specific branches). Add sub-sub-branches as needed.
              </li>
              <li>
                <strong>Evaluate against evidence.</strong> Once brainstorming is complete, evaluate
                each potential cause against the available evidence: test results, maintenance
                records, operating data, visual inspection findings and witness accounts. Mark
                causes as confirmed, possible, or eliminated. Focus investigation on the confirmed
                and possible causes until the root cause (or causes) is identified.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>From fishbone analysis to corrective actions</ContentEyebrow>

          <ConceptBlock title="From Fishbone Analysis to Corrective Actions">
            <p>
              The fishbone diagram identifies potential causes — it does not, on its own, confirm
              the root cause or define the corrective actions. The diagram is a diagnostic tool that
              must be followed by evidence-based evaluation, root cause confirmation and action
              planning. The transition from analysis to action is where the value of the fishbone
              investigation is realised.
            </p>
          </ConceptBlock>

          <ConceptBlock title="From analysis to action">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Confirm the root cause:</strong> Verify the most probable cause(s) with
                specific tests, measurements or inspections. Do not assume — prove
              </li>
              <li>
                <strong>Immediate corrective action:</strong> Fix the immediate problem (replace the
                failed component, repair the damage)
              </li>
              <li>
                <strong>Preventive action:</strong> Address the root cause to prevent recurrence
                (change the procedure, improve the PM schedule, modify the design)
              </li>
              <li>
                <strong>Systemic review:</strong> Check whether the root cause could affect other
                similar equipment — if one motor failed due to inadequate PM, are other motors on
                the same schedule at risk?
              </li>
              <li>
                <strong>Verify effectiveness:</strong> After implementing corrective actions,
                monitor the equipment to confirm the fault does not recur
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Documenting the fishbone analysis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Photograph or scan the completed diagram</li>
              <li>Record the team members who participated</li>
              <li>List the confirmed, possible and eliminated causes</li>
              <li>State the verified root cause(s)</li>
              <li>Attach to the CMMS work order record</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common pitfalls to avoid">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Stopping at the first plausible cause</li>
              <li>Letting one person dominate the discussion</li>
              <li>
                Treating the diagram as the answer (it identifies possibilities, not certainties)
              </li>
              <li>Focusing on blame rather than systemic causes</li>
              <li>Not following through with corrective actions</li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Note:</strong> The fishbone diagram is one tool in the
              root cause analysis toolkit. For maximum effectiveness, combine it with the 5 Whys
              (for drilling deeper into specific branches), Pareto analysis (for prioritising the
              most significant causes from historical data), and fault tree analysis (for
              safety-critical investigations). The choice of technique depends on the complexity and
              significance of the fault.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fishbone construction steps: define the problem (effect) clearly; draw spine and 6M category branches; brainstorm potential causes per category; drill deeper with sub-branches (5 Whys); evaluate each cause against evidence; confirm root cause and plan actions.',
              'The 6M categories: Man (human factors, training, competence); Machine (equipment condition, design, age); Method (procedures, PM strategy, instructions); Material (parts quality, specification, storage); Measurement (instruments, calibration, data); Mother Nature (temperature, moisture, EMC).',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  The 5 Whys Technique
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Corrective vs Preventive Actions
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section6_3;
