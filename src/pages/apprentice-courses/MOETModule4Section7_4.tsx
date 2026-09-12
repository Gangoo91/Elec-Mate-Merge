/**
 * MOET · Module 4 · Section 7.4 · Subsection 4 — Industry Best Practices in RCM
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
 *   Behaviour  · "Continuous improvement (CI) systems and techniques."
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *
 * This is the last subsection of Module 4 — "next" moves into Module 5
 * (Control, automation and instrumentation), correcting the original page's
 * next-button target, which pointed back to the Module 4 overview instead of
 * continuing the course chain.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Industry Best Practices in RCM - MOET Module 4 Section 7.4';
const DESCRIPTION =
  'Industry best practices in reliability-centred maintenance for electrical systems, including standards compliance (SAE JA1011, BS EN 13306, PAS 55/ISO 55000), CMMS integration, continuous improvement, and building a reliability culture within maintenance teams aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'rcm-standard',
    question:
      'The international standard that defines the minimum requirements for a genuine RCM process is:',
    options: [
      'BS EN 13306 — Maintenance Terminology',
      'SAE JA1011 — Evaluation Criteria for RCM Processes',
      'ISO 55000 — Asset Management Overview and Principles',
      'BS EN 15341 — Maintenance Key Performance Indicators',
    ],
    correctIndex: 1,
    explanation:
      'SAE JA1011 was published by SAE International (formerly the Society of Automotive Engineers) to define the minimum criteria that any process must meet to be called RCM. It requires that the process addresses all seven RCM questions in sequence, uses a structured decision logic for selecting maintenance tasks, and results in documented, auditable maintenance strategies. Any process that claims to be RCM but does not comply with JA1011 is not genuine RCM. The companion standard JA1012 provides detailed guidance on how to apply JA1011.',
  },
  {
    id: 'cmms-role',
    question:
      'In RCM best practice, a Computerised Maintenance Management System (CMMS) is essential because it:',
    options: [
      'Provides the data backbone to schedule PMs, record failures, track trends and report KPIs',
      'Removes the need for technicians to record any failure information by hand at all',
      'Automatically performs the maintenance tasks itself without any human intervention',
      'Replaces the requirement to carry out root cause analysis on significant failures',
    ],
    correctIndex: 0,
    explanation:
      'The CMMS is the backbone of an RCM-based maintenance programme. It manages work orders (both planned and reactive), schedules PM tasks and generates alerts when tasks are due, records failure codes and causes for every breakdown (enabling trend analysis), stores condition monitoring data and flags deterioration trends, manages spare parts inventory aligned to criticality, and generates KPIs (PM compliance, MTBF, MTTR, planned ratio) that measure maintenance effectiveness. Without a well-configured CMMS, it is virtually impossible to implement and sustain an effective RCM programme.',
  },
  {
    id: 'continuous-improvement',
    question: 'Continuous improvement in maintenance best practice means:',
    options: [
      'Keeping the maintenance programme completely fixed once it has been established',
      'Increasing the frequency of every preventive task across every asset on the site',
      'Replacing planned maintenance entirely with reactive repairs to cut the cost',
      'Analysing failures and adjusting strategies so each breakdown drives an improvement',
    ],
    correctIndex: 3,
    explanation:
      "Continuous improvement is a fundamental principle of RCM best practice. It involves: analysing every significant failure to identify the root cause and prevent recurrence (RCA), reviewing PM effectiveness by comparing actual failure rates with predictions, adjusting PM intervals and techniques based on condition monitoring data and failure history, benchmarking maintenance KPIs against industry standards and tracking trends, sharing lessons learned across the organisation, and embedding a culture where the maintenance programme is never considered 'finished' but is always being refined.",
  },
  {
    id: 'reliability-culture',
    question: "A 'reliability culture' in a maintenance organisation is characterised by:",
    options: [
      "A shared mindset where reliability is everyone's job, data drives decisions and blame is avoided",
      'A structure where only the senior reliability engineer is responsible for equipment performance and all decisions',
      'An approach where maintenance is minimised to reduce cost and breakdowns are accepted as unavoidable',
      'A system where failures are investigated mainly to identify which individual was at fault',
    ],
    correctIndex: 0,
    explanation:
      'A reliability culture goes beyond having good maintenance procedures — it is an organisational mindset. Key characteristics include: leadership commitment (management actively supports and resources maintenance improvement), data-driven decisions (maintenance strategy is based on evidence, not opinion or tradition), blame-free investigation (failures are investigated to find systemic causes, not to punish individuals), shared responsibility (operators, maintainers and engineers all contribute to equipment reliability), and continuous learning (every failure, every PM visit and every condition monitoring result is an opportunity to improve).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'SAE JA1011 requires that an RCM process must:',
    options: [
      'Apply the same generic maintenance plan to every asset regardless of its function',
      'Answer all seven questions in sequence, use structured decision logic and document the result',
      'Focus exclusively on reactive maintenance and run-to-failure strategies throughout',
      'Be carried out only by an external consultant rather than by the in-house team',
    ],
    correctAnswer: 1,
    explanation:
      'SAE JA1011 sets clear requirements: the process must define functions and performance standards (Question 1), identify functional failures (Q2), identify failure modes (Q3), describe failure effects (Q4), classify failure consequences (Q5), select proactive tasks using a structured decision logic (Q6), and define default actions when no proactive task is feasible (Q7). The process must be applied to each asset in its operating context, not generically. The output must be documented, traceable and auditable. This ensures rigour and consistency in the maintenance programme.',
  },
  {
    id: 2,
    question: 'BS EN 13306 (Maintenance Terminology) is important because it:',
    options: [
      'Sets the legal limits for how long maintenance records must be retained on file',
      'Specifies the mandatory test intervals for all electrical protective devices',
      'Gives standard definitions for maintenance terms, so communication stays consistent',
      'Defines the criticality rating that must be assigned to every single asset',
    ],
    correctAnswer: 2,
    explanation:
      "BS EN 13306 defines standard maintenance terminology used across Europe and internationally. Consistent definitions are essential: when everyone uses the same meaning for 'corrective maintenance', 'condition-based maintenance', 'preventive maintenance', 'failure mode', 'functional failure', etc., communication is clear, training is consistent, and benchmarking between organisations is meaningful. Using non-standard or ambiguous terminology leads to confusion, especially when discussing maintenance strategies with different departments, contractors or regulatory bodies.",
  },
  {
    id: 3,
    question: 'ISO 55000 (Asset Management) relates to RCM because it:',
    options: [
      'Replaces RCM as a more detailed method for selecting individual maintenance tasks',
      'Specifies the standard failure codes that must be used when recording breakdowns',
      'Defines the wiring regulations that all maintenance work must comply with on site',
      'Gives the lifecycle asset-management framework that RCM sits within',
    ],
    correctAnswer: 3,
    explanation:
      'ISO 55000 (which replaced PAS 55) provides the international standard for asset management — the systematic and coordinated activities through which an organisation optimally manages its physical assets and their associated performance, risks and expenditures over their lifecycle. RCM is a key tool within the asset management framework: ISO 55000 defines what the organisation wants to achieve (optimal asset performance at acceptable risk and cost), and RCM provides the methodology for determining how to maintain each asset to achieve those objectives.',
  },
  {
    id: 4,
    question: 'A well-configured CMMS should enable the maintenance team to:',
    options: [
      'Schedule PMs, record failure data, manage spares, and generate KPIs for improvement',
      'Eliminate the need for any preventive maintenance by predicting every single failure',
      'Carry out repairs automatically on the plant without any technician attendance at all',
      'Replace the whole asset register with a single rolling list of recent breakdowns',
    ],
    correctAnswer: 0,
    explanation:
      "A CMMS is only as good as the data it contains and the way it is used. Best practice CMMS configuration includes: a complete asset register linked to criticality ratings, PM schedules aligned to criticality and RCM outcomes, standardised failure codes that enable meaningful analysis (not just 'other' or 'general fault'), condition monitoring integration or data recording, spare parts management linked to asset criticality, automated KPI reporting (PM compliance, MTBF, MTTR, planned ratio), and mobile access for technicians to record findings in real time.",
  },
  {
    id: 5,
    question: 'The most common reason that CMMS failure data is of poor quality is:',
    options: [
      'The CMMS software is inherently incapable of storing any failure information',
      'Poor training, or codes too vague or complex to record meaningful information quickly',
      'There are simply too few failures occurring to provide any meaningful data at all',
      'The data is deliberately falsified by management to improve the headline KPIs',
    ],
    correctAnswer: 1,
    explanation:
      "CMMS data quality is primarily a people and process issue, not a software issue. Common causes of poor data include: technicians not understanding why accurate recording matters (lack of training on the purpose of failure data), failure code structures that are too vague ('electrical fault'), too complex (200+ codes), or not aligned to actual failure modes, time pressure discouraging detailed recording, and no feedback loop showing technicians how their data is used to improve maintenance. Best practice involves simple, meaningful failure codes, training on data importance, and regular feedback to technicians on how their data drives improvements.",
  },
  {
    id: 6,
    question: 'Benchmarking maintenance performance involves:',
    options: [
      'Recording only the failures that occur on the very most critical assets on the site',
      "Setting all maintenance intervals purely from the manufacturer's recommendations",
      'Comparing maintenance KPIs against industry standards, peers and your own trends',
      'Replacing all the KPIs with a single overall cost figure for the whole department',
    ],
    correctAnswer: 2,
    explanation:
      "Benchmarking provides context for maintenance KPIs — a 75% planned ratio only becomes meaningful when compared to the industry best practice of 80%+ and the organisation's own historical performance. Benchmarking sources include: industry associations (BSRIA, BIFM, Reliabilityweb), professional bodies (IET, IMechE), published standards, and internal historical data. Effective benchmarking identifies specific gaps between current performance and best practice, and drives targeted improvement actions. It should cover both efficiency metrics (cost, resource utilisation) and effectiveness metrics (reliability, availability, failure rates).",
  },
  {
    id: 7,
    question: 'A maintenance improvement programme should be driven by:',
    options: [
      'The personal preferences of the longest-serving technician currently on the team',
      'Whichever assets happen to fail most visibly in front of senior management',
      'A fixed annual budget cut applied equally across all maintenance activities',
      'Data analysis — Pareto and RCA on the top failure modes, with measurable actions',
    ],
    correctAnswer: 3,
    explanation:
      'Data-driven improvement is a core best practice. The process typically follows: (1) Pareto analysis of CMMS failure data to identify the top 20% of failure modes that cause 80% of the impact (downtime, cost, safety incidents); (2) Root cause analysis of the top failure modes to understand the underlying causes; (3) Targeted improvement actions (revised PM tasks, design modifications, training, procedure changes); (4) Implementation with clear ownership and timescales; (5) Measurement of outcomes to verify the improvement was effective. This structured approach ensures improvement effort is focused where it will deliver the greatest benefit.',
  },
  {
    id: 8,
    question: "The 'Plan-Do-Check-Act' (PDCA) cycle applies to maintenance improvement by:",
    options: [
      'Plan the action, Do (implement it), Check the results, Act to standardise — then repeat',
      'Implementing improvements without ever measuring whether they actually worked',
      'Planning improvements carefully but never putting any of them into actual practice',
      'Acting on every idea immediately without any prior analysis or planning at all',
    ],
    correctAnswer: 0,
    explanation:
      'The PDCA cycle (also known as the Deming cycle) provides a structured framework for continuous improvement. In maintenance: Plan — analyse failure data, identify the most impactful failure modes, and develop specific improvement actions (revised PM, design change, training). Do — implement the actions. Check — measure the results over a defined period (has MTBF improved? Have failures of this type reduced? Has the KPI improved?). Act — if successful, standardise the improvement and extend it to similar assets; if not successful, analyse why and try a different approach. The cycle then repeats, driving progressive improvement.',
  },
  {
    id: 9,
    question: 'Operator-driven reliability (ODR) is a best practice where:',
    options: [
      'Operators are kept entirely separate from any equipment care responsibilities at all',
      'Operators do basic care tasks and report early deterioration, supporting the maintainers',
      'The maintenance team carries out all of the production tasks as well as the repairs',
      'Reliability decisions are made solely by external consultants without any site input',
    ],
    correctAnswer: 1,
    explanation:
      "Operator-driven reliability (also known as autonomous maintenance in TPM — Total Productive Maintenance) recognises that operators are the people most familiar with their equipment's normal behaviour. They are best placed to detect early abnormalities: unusual noise, vibration, smell, temperature, leaks, or performance changes. Best practice trains operators to: perform basic care tasks (cleaning, inspection, lubrication), recognise early warning signs of common failure modes, report deterioration accurately using standardised forms, and take ownership of equipment condition in their area. This early detection capability significantly extends the P-F interval for many failure modes.",
  },
  {
    id: 10,
    question: 'Root cause analysis (RCA) should be performed for:',
    options: [
      'Only the failures that result in the highest repair cost, regardless of consequence',
      'Every minor fault on every non-critical asset to ensure completely full coverage',
      'Critical-asset failures, repeats, safety/environmental events and gap-revealing faults',
      'No failures at all, since the cause is usually obvious and analysis just wastes time',
    ],
    correctAnswer: 2,
    explanation:
      'The trigger for RCA should be based on consequences and learning potential, not on cost alone. Best practice requires RCA for: every unplanned failure on Critical (A) assets (regardless of repair cost), any failure with actual or potential safety consequences, any failure with environmental consequences, repeated failures on any asset (indicating a systemic issue), and any failure that the maintenance team believes reveals a gap in the current programme. The purpose is not to assign blame but to identify systemic causes and implement actions that prevent recurrence. The learning from RCA should be shared across the organisation.',
  },
  {
    id: 11,
    question: 'Training and competence development is a best practice element because:',
    options: [
      'It is a regulatory box-ticking exercise with no real effect on equipment reliability',
      'It allows the organisation to reduce the overall size of its maintenance team',
      'It is only relevant to apprentices and not at all to experienced technicians',
      'Effectiveness depends on competence — technicians need both technical and analytical skills',
    ],
    correctAnswer: 3,
    explanation:
      'People are the most important element of any maintenance programme. The best CMMS, the most detailed FMEA, and the most comprehensive PM schedule will deliver poor results if the technicians performing the work lack the competence to execute it effectively. Best practice training covers: technical skills (fault diagnosis, condition monitoring techniques, repair and installation standards), analytical skills (RCA methodology, FMEA participation, data interpretation), system skills (CMMS use, work order management, documentation), and soft skills (communication, teamwork, problem-solving). ST1426 recognises this by embedding continuous professional development in the apprenticeship standard.',
  },
  {
    id: 12,
    question:
      'In the context of ST1426 and the End Point Assessment, demonstrating knowledge of RCM best practices shows the assessor that you can:',
    options: [
      'Grasp the strategy, apply RCA/FMEA/criticality, and explain how effectiveness is measured',
      'Recite the numbers of every relevant standard from memory without explaining their purpose',
      'Carry out maintenance tasks quickly without recording any of the findings afterwards',
      'Follow instructions exactly as given without ever questioning whether they are effective',
    ],
    correctAnswer: 0,
    explanation:
      "The ST1426 End Point Assessment values technicians who understand the 'why' behind maintenance practices, not just the 'how'. Demonstrating knowledge of RCM best practices in the professional discussion shows: strategic understanding (you know why different assets have different maintenance strategies), analytical capability (you can participate in FMEA, RCA and criticality analysis), data literacy (you understand maintenance KPIs and how your work affects them), continuous improvement mindset (you actively look for ways to improve reliability), and professional awareness (you know the relevant standards and how they apply to your work). This is what distinguishes a competent technician from someone who simply follows instructions.",
  },
];

const faqs = [
  {
    question: 'Do I need to know all these standards and frameworks for the ST1426 EPA?',
    answer:
      'You do not need to know every detail of every standard. What the EPA assessors look for is an understanding of the principles: why RCM is important (function-focused, consequence-driven maintenance), how criticality affects maintenance strategy (not all equipment is treated equally), why data matters (CMMS records drive improvement), and how continuous improvement works (learn from failures, adjust the programme). Being able to describe how you have applied these principles in your workplace — even at a basic level — is more valuable than memorising standard numbers.',
  },
  {
    question:
      'How does RCM best practice apply if my employer uses a very basic maintenance system?',
    answer:
      "You can apply RCM principles regardless of the sophistication of your employer's systems. Even without a formal CMMS, you can: think about criticality when prioritising your work (focus on the most important equipment first), provide accurate feedback on equipment condition during PM visits, ask 'why' when failures occur (basic root cause thinking), and suggest improvements based on what you observe. If your employer uses a paper-based system, you can still record meaningful failure information. The principles of RCM — function focus, consequence-driven strategy, evidence-based decisions — apply at any level of organisational maturity.",
  },
  {
    question: 'What is the difference between RCM and TPM?',
    answer:
      'RCM (Reliability-Centred Maintenance) is a process for deciding what maintenance to do — it analyses functions, failure modes, consequences and tasks. TPM (Total Productive Maintenance) is a broader philosophy for involving the whole organisation in equipment care — it includes autonomous maintenance by operators, focused improvement activities, planned maintenance, quality maintenance, and education/training. They are complementary: RCM provides the analytical rigour for determining maintenance tasks, while TPM provides the organisational framework for executing them. Many best-practice organisations use elements of both.',
  },
  {
    question: 'How can I contribute to continuous improvement as an apprentice?',
    answer:
      'As an apprentice, you can contribute in several ways: record accurate, detailed information on work orders (what you found, what you did, what parts you used), report any unexpected findings during PM visits to your supervisor, ask questions when you see maintenance practices that seem ineffective or inefficient, participate in team discussions about failure causes and improvements, take photographs of unusual conditions for the maintenance record, and suggest improvements based on your observations. Your fresh perspective is valuable — sometimes people who have been doing something for years stop questioning whether it is the best approach.',
  },
  {
    question: 'Is RCM only for large organisations with big maintenance teams?',
    answer:
      'No. While a full classical RCM analysis requires significant effort and is most commonly applied by larger organisations, the principles can be applied at any scale. A sole trader electrician can apply RCM thinking by considering the criticality of different circuits when prioritising work, a small maintenance team can use simplified FMEA to identify the most important failure modes, and any organisation can use basic Pareto analysis of failure data to focus improvement effort. The key principle — applying the right maintenance strategy to each asset based on the consequences of its failure — is universally applicable.',
  },
];

const MOETModule4Section7_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.7 · Subsection 4"
        title="Industry Best Practices in RCM"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section7"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Standards, systems and culture that underpin world-class maintenance.
          </p>

          <TLDR
            points={[
              'Standards: SAE JA1011 defines genuine RCM; ISO 55000 provides the asset management framework',
              'CMMS: Essential data infrastructure for scheduling, recording and analysing maintenance',
              'Data-driven: Pareto analysis, RCA and KPIs drive targeted improvements',
              "Culture: Reliability is everyone's responsibility, not just the maintenance team's",
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Data quality:</strong> Accurate work order recording enables meaningful
                analysis
              </li>
              <li>
                <strong>Improvement:</strong> Every failure is a learning opportunity — contribute
                to RCA
              </li>
              <li>
                <strong>Competence:</strong> Ongoing skills development is a best practice
                requirement
              </li>
              <li>
                <strong>ST1426 EPA:</strong> Demonstrates strategic understanding of maintenance
                management
              </li>
            </ul>
          </ConceptBlock>

          <Prerequisites
            items={[
              {
                term: 'Reliability-centred maintenance',

                gist: 'Deciding what maintenance is worth doing from what an asset must do, how it can fail, and what each failure would cost.',

                where: '4.7.1',
              },

              {
                term: 'Criticality analysis',

                gist: 'Ranking assets by the consequence of their failure, so maintenance effort goes where it actually matters.',

                where: '4.7.3',
              },

              {
                term: 'Identifying underlying failures',

                gist: 'Working back from what broke to why it broke, rather than stopping at the component that failed.',

                where: '4.6.1',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the key standards that define RCM best practice (SAE JA1011, ISO 55000, BS EN 13306)',
              'Explain the role of CMMS in supporting an effective RCM programme',
              'Describe how data analysis drives continuous improvement in maintenance',
              'Apply the PDCA cycle to maintenance improvement activities',
              'Explain the characteristics of a reliability culture in a maintenance organisation',
              'Contribute to continuous improvement through accurate data recording and RCA participation',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Standards and frameworks</ContentEyebrow>

          <ConceptBlock
            title="Standards and Frameworks"
            onSite="Key point: You do not need to memorise these standard numbers, but you should understand the principles they represent. SAE JA1011 = rigorous RCM process. ISO 55000 = lifecycle asset management. BS EN 13306 = common language. BS EN 15341 = measuring performance. Together they form the professional framework within which modern maintenance operates."
          >
            <p>
              World-class maintenance organisations do not invent their own approaches from scratch
              — they build on established international standards and frameworks that represent
              decades of accumulated knowledge and best practice. Understanding these standards
              provides the maintenance technician with a professional foundation and a common
              language for discussing maintenance strategy.
            </p>
          </ConceptBlock>

          <ConceptBlock title="SAE JA1011 / JA1012 — RCM process standard">
            <p>
              Defines the minimum requirements for a genuine RCM process. JA1011 sets the criteria;
              JA1012 provides the implementation guide. Key requirements: all seven questions
              addressed in sequence, structured decision logic for task selection, and documented
              outcomes. Any process that does not meet these criteria should not be called RCM. This
              standard ensures rigour and consistency and prevents the dilution of RCM into
              superficial exercises.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ISO 55000 / 55001 / 55002 — asset management">
            <p>
              The international framework for managing physical assets over their entire lifecycle.
              ISO 55001 specifies the requirements for an asset management system; ISO 55002
              provides implementation guidance. RCM fits within this framework as the methodology
              for determining maintenance requirements. ISO 55000 also covers asset lifecycle
              decisions (acquisition, operation, maintenance, modification and disposal), risk
              management, and the alignment of asset management with organisational objectives.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS EN 13306 — maintenance terminology">
            <p>
              Provides standardised definitions for maintenance terms: corrective maintenance,
              preventive maintenance, condition-based maintenance, predictive maintenance,
              predetermined maintenance, failure mode, functional failure, and many more. Using
              standard terminology ensures clear communication within the organisation, with
              contractors, and with regulatory bodies. It eliminates ambiguity and supports
              effective benchmarking.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS EN 15341 — maintenance key performance indicators">
            <p>
              Defines a set of standardised maintenance KPIs covering three categories: economic
              (maintenance cost efficiency), technical (equipment reliability and availability), and
              organisational (work management effectiveness). Using standardised KPIs enables
              meaningful benchmarking against industry peers and consistent internal tracking over
              time.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>CMMS and data-driven maintenance</ContentEyebrow>

          <ConceptBlock title="CMMS and Data-Driven Maintenance">
            <p>
              The Computerised Maintenance Management System (CMMS) is the data backbone of modern
              maintenance. Without it, maintenance decisions are based on memory, habit and best
              guesses. With a well-configured and well-used CMMS, maintenance decisions can be based
              on evidence: actual failure data, condition monitoring trends, PM compliance records
              and cost analysis. The CMMS transforms maintenance from an art based on individual
              experience into a discipline driven by organisational knowledge.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="CMMS Best Practice Configuration"
            headers={['CMMS Element', 'Best Practice Requirement']}
            rows={[
              [
                'Asset register',
                'Complete, with unique tag numbers, criticality ratings, and parent-child relationships',
              ],
              [
                'Failure codes',
                'Simple, meaningful, aligned to actual failure modes — maximum 15-20 codes per equipment type',
              ],
              [
                'PM schedules',
                'Linked to criticality, with clear task descriptions and expected findings',
              ],
              [
                'Work order workflow',
                'Planned, assigned, in progress, completed, closed — with mandatory fields for failure cause and actions',
              ],
              [
                'Spare parts',
                'Linked to assets, with stock levels aligned to criticality (critical spares held, non-critical sourced)',
              ],
              [
                'KPI dashboards',
                'Automated reporting of PM compliance, MTBF, MTTR, planned ratio, availability',
              ],
            ]}
          />

          <ConceptBlock
            title="The technician's role in data quality"
            onSite='Key point: "Garbage in, garbage out" applies absolutely to CMMS data. If failure codes are wrong, notes are empty, and times are guessed, the system cannot provide meaningful analysis. If the data is accurate and detailed, the system becomes a powerful tool for continuous improvement. Every work order you complete is a contribution to the organisation&apos;s maintenance knowledge.'
          >
            <p>
              As a maintenance technician, you are the primary data generator. The quality of every
              maintenance decision depends on the quality of the data you record:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Accurate failure codes:</strong> Select the code that best describes what
                actually failed and why — do not default to &quot;other&quot;
              </li>
              <li>
                <strong>Detailed notes:</strong> Describe what you found, what you did, and what
                condition the equipment was in — &quot;replaced motor&quot; tells us nothing;
                &quot;motor bearing DE failed, excessive vibration noted 3 months ago during PM,
                bearing replaced and aligned to 0.05mm&quot; tells us everything
              </li>
              <li>
                <strong>Time recording:</strong> Accurate time data enables MTTR calculation and
                work planning
              </li>
              <li>
                <strong>Parts recording:</strong> Record which parts were used — this supports spare
                parts planning
              </li>
              <li>
                <strong>PM feedback:</strong> Record what you found during each PM visit, not just
                &quot;completed&quot;
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Continuous improvement in maintenance</ContentEyebrow>

          <ConceptBlock
            title="Continuous Improvement in Maintenance"
            onSite="Key point: Continuous improvement is not about making massive changes — it is about making many small, evidence-based improvements over time. Each improvement may seem modest, but the cumulative effect over months and years is transformational. The organisations that achieve world-class maintenance performance do so through sustained, disciplined application of the improvement cycle, not through one-off projects."
          >
            <p>
              A maintenance programme that never changes is a maintenance programme that is falling
              behind. Equipment ages, operating conditions change, new failure modes emerge, and the
              organisation&apos;s understanding of its assets deepens with experience. Continuous
              improvement is the process of using this evolving knowledge to progressively refine
              the maintenance programme, driving better reliability at lower cost over time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The PDCA improvement cycle applied to maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan.</strong> Analyse CMMS data (Pareto of failures, trend analysis).
                Identify the top failure modes by impact. Perform RCA on significant failures.
                Develop specific improvement actions.
              </li>
              <li>
                <strong>Do.</strong> Implement the improvement: revised PM task, new condition
                monitoring route, design modification, operator training, or procedure change.
                Document the change.
              </li>
              <li>
                <strong>Check.</strong> Measure the results over a defined period: has the failure
                rate reduced? Has MTBF improved? Has the KPI moved in the right direction? Did the
                improvement achieve its objective?
              </li>
              <li>
                <strong>Act.</strong> If successful, standardise the improvement and extend to
                similar assets. If not, analyse why and try a different approach. Update the FMEA
                and maintenance plan. Start the next cycle.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pareto analysis for maintenance improvement">
            <p>
              The Pareto principle (80/20 rule) applies powerfully to maintenance: typically 20% of
              failure modes cause 80% of the downtime, cost and safety incidents. Identifying and
              targeting this top 20% delivers the greatest improvement for the least effort.
            </p>
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Extract failure data from the CMMS for a defined period (typically 12 months)</li>
              <li>Rank failure modes by impact (downtime hours, cost, or number of occurrences)</li>
              <li>Identify the top 5-10 failure modes that account for the majority of impact</li>
              <li>Perform root cause analysis on each of the top failure modes</li>
              <li>Develop and implement targeted improvement actions for each</li>
              <li>Measure the results and repeat the analysis</li>
            </ol>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Building a reliability culture</ContentEyebrow>

          <ConceptBlock title="Building a Reliability Culture">
            <p>
              The most sophisticated RCM process, the best CMMS, and the most comprehensive
              maintenance programme will deliver only a fraction of their potential if the
              organisational culture does not support them. A reliability culture is one where
              everyone — from the board of directors to the newest apprentice — understands that
              equipment reliability is not just the maintenance team&apos;s problem but a shared
              organisational responsibility.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Characteristics of a reliability culture">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Leadership commitment:</strong> Management actively supports maintenance
                improvement, provides resources, and visibly prioritises reliability in
                decision-making
              </li>
              <li>
                <strong>Data-driven decisions:</strong> Maintenance strategy is based on evidence
                (failure data, condition monitoring, risk analysis), not tradition, opinion or
                budget convenience
              </li>
              <li>
                <strong>Blame-free investigation:</strong> Failures are investigated to find
                systemic causes (training gaps, procedure weaknesses, design issues), not to punish
                individuals
              </li>
              <li>
                <strong>Shared responsibility:</strong> Operators care for their equipment,
                maintainers investigate root causes, engineers support design improvements, and
                management provides resources
              </li>
              <li>
                <strong>Continuous learning:</strong> Every failure, every PM visit and every
                condition monitoring result is an opportunity to improve. Knowledge is shared, not
                hoarded
              </li>
              <li>
                <strong>Competence investment:</strong> The organisation invests in training and
                development because it recognises that people are the most important element of the
                maintenance system
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What the technician can influence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Record accurate, detailed work order data</li>
              <li>Report equipment conditions honestly (good and bad)</li>
              <li>Participate in RCA and FMEA when invited</li>
              <li>Suggest improvements based on practical experience</li>
              <li>Share knowledge with colleagues and apprentices</li>
              <li>Take pride in the reliability of &apos;your&apos; equipment</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Signs of a weak reliability culture">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Maintenance is seen as a cost to be minimised, not an investment</li>
              <li>Breakdowns are accepted as inevitable rather than investigated</li>
              <li>PM tasks are skipped when production is busy</li>
              <li>CMMS data is incomplete or inaccurate</li>
              <li>Operators do not report early warning signs</li>
              <li>Training is seen as a cost, not an investment</li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Final thought:</strong> Module 4 has taken you from the
              fundamentals of maintenance techniques, through fault diagnosis and condition
              monitoring, to root cause analysis and reliability-centred maintenance. These are not
              isolated topics — they form an integrated system. Good condition monitoring detects
              failures early. Good fault diagnosis identifies what went wrong. Good RCA identifies
              why it went wrong. Good RCM ensures the right strategy is applied to prevent
              recurrence. And a reliability culture ensures all of this actually happens
              consistently, every day. As a maintenance technician, you are at the heart of this
              system.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Key standards: SAE JA1011 — RCM process requirements; SAE JA1012 — RCM implementation guide; ISO 55000/55001 — asset management framework; BS EN 13306 — maintenance terminology; BS EN 15341 — maintenance KPIs; BS 7671 — IET Wiring Regulations.',
              "Best practice principles: function-focused, consequence-driven maintenance; CMMS with accurate, meaningful data; Pareto analysis to focus improvement effort; PDCA cycle for structured improvement; RCA for every significant failure; reliability culture — everyone's responsibility.",
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <ConceptBlock title="Module 4 complete">
            <p>
              You have completed all sections of Module 4: Maintenance Techniques and Fault
              Diagnosis. This module has covered planned and reactive maintenance strategies,
              condition monitoring and predictive techniques, systematic fault diagnosis, root cause
              analysis, and reliability-centred maintenance. These topics form the foundation of
              professional electrical maintenance practice aligned to ST1426.
            </p>
          </ConceptBlock>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Criticality Analysis of Equipment
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next module <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Module 5 · Control, automation and instrumentation
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section7_4;
