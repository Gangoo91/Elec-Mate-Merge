/**
 * MOET · Module 4 · Section 6.5 · Subsection 5 — Recording and Reporting RCA Outcomes
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
 *   Knowledge  · "Documentation requirements: documentation control,
 *                 auditable records."
 *   Skills     · "Record information."
 *              · "Produce or update documents. For example, handover notes
 *                 and reports."
 *   Behaviour  · "Continuous improvement (CI) systems and techniques."
 *
 * This is the last subsection of Section 6 — "next" moves into Section 7
 * (Reliability-centred maintenance), correcting the original page's
 * next-button target, which pointed back to the section overview instead of
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Recording and Reporting RCA Outcomes - MOET Module 4 Section 6.5';
const DESCRIPTION =
  'Documenting root cause analysis outcomes, writing effective RCA reports, communicating findings to stakeholders, tracking corrective actions and using RCA data for continuous improvement in electrical maintenance.';

const quickCheckQuestions = [
  {
    id: 'rca-report-audience',
    question: 'An RCA report should be written for:',
    options: [
      'The maintenance technician who carried out the investigation, and no one else',
      'The equipment manufacturer alone, so that they can process a warranty claim',
      'The site auditor alone, purely as a record for compliance purposes',
      'Several audiences at once — management, technicians, auditors and the CMMS',
    ],
    correctIndex: 3,
    explanation:
      'An effective RCA report serves multiple audiences simultaneously. Management needs the summary, cost impact and recommendations. Technicians need the technical details and diagnostic steps. Auditors need evidence of systematic investigation. The CMMS needs structured data for trend analysis. Writing with all these audiences in mind ensures the report delivers maximum value.',
  },
  {
    id: 'rca-report-structure',
    question: 'The most important section of an RCA report for driving improvement is:',
    options: [
      'The executive summary, because managers tend to read only the first page',
      'The problem description, because it records exactly which equipment failed',
      'The recommendations and actions section, which turns findings into preventive actions',
      'The appendices, because they hold all of the detailed test and instrument data',
    ],
    correctIndex: 2,
    explanation:
      "While every section of the report is important, the recommendations and actions section is where the investigation's value is realised. This section translates the root cause findings into specific, actionable, measurable and time-bound corrective and preventive actions. Without clear recommendations, the investigation is an academic exercise that does not improve reliability.",
  },
  {
    id: 'rca-data-trends',
    question: 'Analysing RCA data across multiple investigations can reveal:',
    options: [
      'The exact root cause of any single future failure, predicted in advance',
      'Which individual technician is personally responsible for the most faults',
      'The precise replacement cost of every component installed across the site',
      'Common patterns and systemic weaknesses invisible in single investigations',
    ],
    correctIndex: 3,
    explanation:
      'Aggregate analysis of RCA data reveals patterns invisible in individual reports. If 40% of motor failures share the root cause of inadequate lubrication, this indicates a systemic PM strategy issue, not a series of individual failures. Identifying these patterns enables targeted, high-impact improvements that address the most significant causes of unreliability.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'An RCA report should be completed:',
    options: [
      'Only for failures that result in a serious personal injury on site',
      'For every significant fault, with detail proportionate to its severity and complexity',
      'Only when the equipment manufacturer specifically requests one',
      'For every fault, however trivial, all to the same level of detail',
    ],
    correctAnswer: 1,
    explanation:
      "RCA reports should be completed for all significant faults — those involving safety implications, significant downtime, high repair costs, or recurring patterns. The level of detail should be proportionate: a simple recurring fault may need a brief 5 Whys analysis, while a major failure may warrant a full fishbone investigation with detailed documentation. The threshold for formal RCA should be defined in the organisation's maintenance procedures.",
  },
  {
    id: 2,
    question: 'The executive summary of an RCA report should include:',
    options: [
      'The full set of raw test readings and instrument calibration records',
      'A step-by-step description of every diagnostic test that was performed',
      'A concise one-page overview of the problem, root cause, findings and actions',
      'A list of all personnel who attended the site while the fault was present',
    ],
    correctAnswer: 2,
    explanation:
      'The executive summary enables busy managers and decision-makers to quickly understand the key findings without reading the full report. It should state what happened, why it happened (root cause), what the impact was, and what actions are recommended. One page is typically sufficient. The detailed technical analysis follows in the body of the report for those who need it.',
  },
  {
    id: 3,
    question: 'When presenting RCA findings to management, you should focus on:',
    options: [
      'The detailed waveform captures and the instrument settings that were used',
      'A full word-for-word transcript of the 5 Whys discussion with the team',
      'Which individual was at fault and what disciplinary action they should face',
      'Business impact, the root cause in clear terms, and costed recommended actions',
    ],
    correctAnswer: 3,
    explanation:
      'Management decisions are driven by business impact. Present the findings in terms of safety risk, downtime hours, production loss and repair costs. Explain the root cause in clear, non-technical language where possible. Present recommendations with estimated costs and expected benefits (reduced failure rate, avoided downtime, risk reduction). This approach helps management understand the value of investing in preventive actions.',
  },
  {
    id: 4,
    question: 'RCA findings should be shared with the wider maintenance team because:',
    options: [
      'It builds collective knowledge, helping others diagnose similar faults faster',
      'It allows the cost of the investigation to be charged back to the team',
      'It satisfies a legal requirement to publish every single fault report',
      'It removes the need for the maintenance team to attend any future training',
    ],
    correctAnswer: 0,
    explanation:
      'Knowledge sharing is one of the most valuable outcomes of RCA. When findings are shared — through team briefings, toolbox talks, CMMS notes or a lessons learned database — the entire team benefits. A technician who has read about a similar failure on another site can diagnose the same fault in minutes rather than hours. This collective knowledge is a competitive advantage for the maintenance organisation.',
  },
  {
    id: 5,
    question: 'A lessons learned database is valuable because it:',
    options: [
      'It replaces the need to carry out any future fault investigations at all',
      'It is a searchable repository of past diagnoses, solutions and preventive measures',
      'It records which technician closed each work order the fastest',
      'It stores the spare parts inventory together with the reorder levels',
    ],
    correctAnswer: 1,
    explanation:
      'A lessons learned database captures the practical knowledge from fault investigations in a searchable format. When a technician encounters a fault on a particular type of equipment, they can search the database for previous investigations on similar equipment. This dramatically reduces diagnostic time and ensures that proven solutions are applied consistently.',
  },
  {
    id: 6,
    question: 'Action tracking following an RCA should include:',
    options: [
      'Only the action description and an approximate target completion date',
      'The names of everyone who attended the investigation review meeting',
      'Action, owner, deadline, status, completion evidence and effectiveness check',
      'The total cost of the failure and the related insurance claim reference',
    ],
    correctAnswer: 2,
    explanation:
      "Effective action tracking requires full visibility of each action's lifecycle: what needs to be done, who is responsible, when it is due, what progress has been made, evidence that it was completed correctly, and verification that it achieved the intended result. Without this level of tracking, actions are easily forgotten, delayed or ineffectively implemented.",
  },
  {
    id: 7,
    question:
      'When documenting an RCA that identifies human error as a contributing factor, you should:',
    options: [
      'Name the individual responsible and record a formal written warning',
      'Omit the human factor from the report entirely to avoid embarrassment',
      'Recommend that the individual be retrained as the sole corrective action',
      'Focus on systemic factors — procedures, training, ergonomics — not individual blame',
    ],
    correctAnswer: 3,
    explanation:
      'A blame-focused RCA culture discourages honest reporting and prevents learning. Effective RCA examines why the error was possible: Was the procedure clear? Was training adequate? Was the task designed to minimise error? Was there time pressure? Were there distractions? Addressing these systemic factors prevents the error from recurring, regardless of which individual performs the task.',
  },
  {
    id: 8,
    question: 'Key performance indicators (KPIs) derived from RCA data include:',
    options: [
      'RCAs completed, on-time actions, repeat-failure rate, MTBF gain and prevention cost',
      'The number of staff employed and the overall size of the maintenance budget',
      'The age of each item of plant together with its original purchase price',
      'The total length of cable installed across the whole of the site',
    ],
    correctAnswer: 0,
    explanation:
      'RCA KPIs measure both the process (are investigations being conducted and actions completed?) and the outcomes (are failures reducing, is MTBF improving, is the investment in prevention generating returns?). Tracking these KPIs demonstrates the value of the RCA programme and identifies areas where the process itself can be improved.',
  },
  {
    id: 9,
    question: 'Photographic evidence in an RCA report should:',
    options: [
      'Be stored in a separate folder with no cross-reference in the report',
      'Be captioned with what they show plus date and asset, and placed in context',
      'Be limited to one general photograph of the whole of the installation',
      'Be edited to remove anything that could imply fault or apportion blame',
    ],
    correctAnswer: 1,
    explanation:
      "Photographs are valuable evidence but only if properly labelled and contextualised. Each image should have a caption explaining what it shows and why it is relevant to the investigation. Images should be placed near the related text in the report. Including 'before' and 'after' photographs demonstrates the condition found and the corrective action taken. Unlabelled photographs in a separate folder add little value.",
  },
  {
    id: 10,
    question: 'An RCA report should be reviewed and approved by:',
    options: [
      'The technician who wrote it, with no further independent review needed',
      'Any available member of staff, regardless of their relevant experience',
      'A qualified person who verifies the findings, recommendations and standards',
      'The equipment supplier, before the report is shared internally at all',
    ],
    correctAnswer: 2,
    explanation:
      "Peer review or supervisory review improves report quality. A reviewer can identify gaps in the investigation, challenge assumptions, verify that recommendations are practical and proportionate, and ensure the report meets the organisation's documentation standards. This review process is particularly important for reports that will inform significant capital expenditure or procedure changes.",
  },
  {
    id: 11,
    question: 'The legal significance of RCA reports in the UK includes:',
    options: [
      'They are legally privileged and can never be disclosed to any third party',
      'They are required by BS 7671 for every single electrical installation',
      'They transfer all liability for the failure across to the equipment manufacturer',
      'They evidence due diligence and may be disclosed in investigations or claims',
    ],
    correctAnswer: 3,
    explanation:
      'RCA reports are not privileged documents and may be disclosed in legal proceedings, HSE investigations or insurance claims. This means they must be factual, accurate and professional. They demonstrate that the organisation takes maintenance seriously and investigates failures systematically. Conversely, the absence of RCA records following a significant failure would be difficult to defend in any investigation.',
  },
  {
    id: 12,
    question: 'Continuous improvement through RCA requires:',
    options: [
      'An ongoing cycle of investigating, acting, verifying and sharing across failures',
      'A single comprehensive investigation carried out just once each year',
      'Investigating only those failures that cause the very longest downtime',
      'Producing as many RCA reports as possible regardless of their outcome',
    ],
    correctAnswer: 0,
    explanation:
      'Continuous improvement is not a one-off activity — it is an ongoing cycle of investigation, action, verification and learning. Each RCA contributes to a growing body of knowledge that progressively improves equipment reliability. The organisations that achieve the highest levels of reliability are those that maintain this discipline over years, using their accumulated RCA data to drive strategic maintenance decisions.',
  },
];

const faqs = [
  {
    question: 'How long should an RCA report be?',
    answer:
      'The length should be proportionate to the complexity of the investigation. A simple fault with a clear root cause may need only one or two pages. A complex investigation involving multiple contributing factors, extensive testing and significant recommendations may require 10-15 pages. The key is completeness and clarity, not length. Every page should add value. Use appendices for detailed test data, photographs and supporting documentation rather than putting everything in the main body.',
  },
  {
    question: 'What format should I use for an RCA report?',
    answer:
      "Follow your organisation's standard format if one exists. If not, a recommended structure is: executive summary (one page), problem description, investigation methodology, findings (test results, observations, evidence), root cause analysis (5 Whys, fishbone, or other technique), corrective and preventive actions, lessons learned, and appendices. Use clear headings, numbered sections and bullet points for readability. Include the fishbone diagram or 5 Whys chain as a visual summary.",
  },
  {
    question: 'Who should receive a copy of the RCA report?',
    answer:
      'Distribution depends on the significance of the findings and the actions required. At minimum: the maintenance manager (for action approval), the CMMS (as a permanent record), and the maintenance team (for knowledge sharing). For significant findings: the operations manager, the site safety adviser, the engineering department (if design changes are recommended), and the asset owner. The distribution list should be recorded in the report.',
  },
  {
    question:
      'How do I present RCA findings if the root cause is an organisational or management issue?',
    answer:
      "Present the findings factually and constructively. Focus on the system, not individuals: 'The preventive maintenance schedule for this equipment class has not been reviewed since 2018 and does not reflect current operating conditions' is factual and actionable. Avoid emotive language or accusations. Frame recommendations as opportunities for improvement. If you are uncomfortable raising the finding directly, discuss it with your supervisor or mentor for guidance on how to escalate appropriately.",
  },
  {
    question: 'Should RCA reports be included in the CMMS?',
    answer:
      'Yes. The RCA report should be attached to or referenced from the relevant CMMS work order. This links the investigation to the specific asset and fault record, making it searchable and accessible to future technicians. Key findings, the root cause and the corrective actions should also be entered as structured data in the CMMS fault coding system to support aggregate analysis. The full report provides the detail; the CMMS codes provide the data.',
  },
];

const MOETModule4Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.6 · Subsection 5"
        title="Recording and Reporting RCA Outcomes"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Documenting and communicating root cause analysis findings for continuous improvement.
          </p>

          <TLDR
            points={[
              'RCA report: Executive summary, findings, root cause, actions, lessons',
              'Multiple audiences: Management, technicians, auditors, CMMS',
              'Action tracking: Owner, deadline, status, verification',
              'Knowledge sharing: Lessons learned benefit the entire team',
            ]}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Professional writing:</strong> Factual, evidence-based, no blame
              </li>
              <li>
                <strong>Aggregate analysis:</strong> Patterns across multiple RCAs drive strategy
              </li>
              <li>
                <strong>Legal significance:</strong> Reports may be disclosed in investigations
              </li>
              <li>
                <strong>ST1426:</strong> Communication and reporting assessed at EPA
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Structure an RCA report with executive summary, findings, root cause and recommendations',
              'Write clear, factual findings that avoid blame and focus on systemic causes',
              'Present RCA outcomes to different audiences using appropriate language and focus',
              'Track corrective and preventive actions through to verified completion',
              'Use aggregate RCA data to identify patterns and drive maintenance strategy improvement',
              'Understand the legal and regulatory significance of RCA documentation',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Structuring the RCA report</ContentEyebrow>

          <ConceptBlock
            title="Structuring the RCA Report"
            onSite="Writing principle: Be factual, not emotional. Be specific, not vague. Be constructive, not accusatory. The report should read as an objective technical document that any competent person could understand and act upon."
          >
            <p>
              The RCA report is the formal output of the root cause investigation. It transforms the
              analytical work of the 5 Whys, fishbone diagram or other technique into a documented
              record that informs decisions, drives actions and preserves knowledge. A
              well-structured report is easy to read, clearly presents the evidence and findings,
              and makes actionable recommendations that are specific, measurable and time-bound.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Executive summary">
            <p>
              One page maximum. States the problem, the root cause, the impact (safety, downtime,
              cost) and the key recommendations. Written for decision-makers who may not read the
              full report.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Problem description">
            <p>
              Detailed description of the fault: what equipment, when, what symptoms, what impact.
              Include the timeline of events from first occurrence to the start of investigation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Investigation methodology and findings">
            <p>
              The diagnostic steps taken, test results, observations, maintenance history reviewed
              and evidence collected. Include the 5 Whys chain, fishbone diagram or other analysis
              tool used. Present all evidence — including normal findings that helped eliminate
              possible causes.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Root cause statement">
            <p>
              A clear, concise statement of the confirmed root cause, supported by the evidence
              presented. Distinguish between the immediate cause (what failed), the root cause (why
              it failed) and any contributing factors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Recommendations and actions">
            <p>
              Specific corrective and preventive actions with responsible persons, deadlines and
              expected outcomes. Each action should be clearly linked to the root cause findings.
              Include cost estimates and resource requirements where relevant.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Communicating findings to stakeholders</ContentEyebrow>

          <ConceptBlock
            title="Communicating Findings to Stakeholders"
            onSite='Key point: The ability to communicate technical findings clearly to non-technical stakeholders is a valuable professional skill. Practice translating technical language into business language: instead of "the IR reading dropped below 1 megohm", say "the insulation had degraded to a level that could cause equipment failure and presents a safety risk".'
          >
            <p>
              Different stakeholders need different information from the RCA. The maintenance team
              needs technical detail. Management needs business impact and cost-benefit analysis of
              recommendations. Safety advisers need risk assessment. The CMMS needs structured,
              coded data. Effective communication means tailoring the message to the audience while
              maintaining the accuracy and integrity of the findings.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Communicating to Different Audiences"
            headers={['Audience', 'Focus', 'Format']}
            rows={[
              [
                'Senior management',
                'Business impact, cost, risk, recommendations',
                'Executive summary, presentation',
              ],
              [
                'Maintenance team',
                'Technical findings, diagnostic approach, lessons',
                'Full report, toolbox talk',
              ],
              [
                'Operations',
                'What happened, what changed, any limitations',
                'Briefing, handover note',
              ],
              [
                'Safety adviser',
                'Risk assessment, safety implications',
                'Full report with risk context',
              ],
              [
                'Auditors',
                'Compliance evidence, systematic process',
                'Full report with action tracking',
              ],
            ]}
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Action tracking and verification</ContentEyebrow>

          <ConceptBlock
            title="Action Tracking and Verification"
            onSite="Practical tip: Review open RCA actions at every maintenance team meeting. A visible action tracker (physical board or CMMS dashboard) keeps actions in focus and creates peer accountability. Celebrate completed actions to reinforce the value of the process."
          >
            <p>
              The RCA report is only as valuable as the actions it generates. Without a robust
              tracking system, recommendations are forgotten, deadlines pass without action, and the
              same faults recur. Action tracking bridges the gap between investigation and
              improvement, ensuring that every recommendation is followed through to verified
              completion.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Action tracking elements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Action description:</strong> Specific, clear and unambiguous — what exactly
                needs to be done
              </li>
              <li>
                <strong>Responsible person:</strong> Named individual (not a department or team) who
                owns the action
              </li>
              <li>
                <strong>Deadline:</strong> Realistic but firm completion date based on risk priority
              </li>
              <li>
                <strong>Status:</strong> Open, in progress, completed, overdue — updated regularly
              </li>
              <li>
                <strong>Completion evidence:</strong> What evidence confirms the action was done
                correctly
              </li>
              <li>
                <strong>Effectiveness verification:</strong> Has the action achieved its intended
                result
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Untracked, unowned actions"
            whatHappens={
              <p>
                The most common failures in action tracking are: actions assigned to departments
                rather than named individuals (no one takes ownership), unrealistic deadlines that
                are immediately abandoned, no regular review of open actions (out of sight, out of
                mind), completion based on self-declaration without evidence, and no verification of
                effectiveness (assuming it worked).
              </p>
            }
            doInstead={
              <p>
                Address these failure modes by insisting on named owners, realistic deadlines,
                regular review meetings, documented evidence of completion, and post-implementation
                monitoring.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Aggregate analysis and continuous improvement</ContentEyebrow>

          <ConceptBlock title="Aggregate Analysis and Continuous Improvement">
            <p>
              Individual RCA reports are valuable. Aggregate analysis of multiple RCA reports is
              transformative. By looking across all investigations over a period, patterns emerge
              that reveal the true drivers of unreliability in your installation. These patterns
              inform strategic decisions about maintenance approach, capital investment, training
              priorities and design improvements that deliver the greatest return on investment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What aggregate analysis reveals">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Most common root cause categories</li>
              <li>Equipment types with highest failure rates</li>
              <li>Environmental factors most frequently involved</li>
              <li>Effectiveness of PM programmes</li>
              <li>Training and competence gaps</li>
              <li>Cost of failure vs cost of prevention</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="RCA programme KPIs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Number of RCAs completed vs qualifying events</li>
              <li>Average time from event to RCA completion</li>
              <li>Percentage of actions completed on time</li>
              <li>Repeat failure rate (same root cause)</li>
              <li>MTBF improvement trend</li>
              <li>Maintenance cost per unit of output</li>
            </ul>
            <p className="italic">
              <strong className="not-italic">Note:</strong> The ultimate measure of an RCA
              programme&apos;s success is not the number of reports produced but the reduction in
              failure rate and maintenance cost over time. If the same root causes keep appearing in
              your RCA reports, the programme is identifying problems but the organisation is not
              addressing them. The data is there — it needs to be acted upon.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'RCA report structure: executive summary (one page); problem description and timeline; investigation method and findings; root cause statement with evidence; recommendations and actions; lessons learned and appendices.',
              'Action tracking essentials: named owner (not a department); realistic deadline (risk-based priority); regular status review; evidence of completion; effectiveness verification.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section6-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Corrective vs Preventive Actions
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section7-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Principles of Reliability-Centred Maintenance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section6_5;
