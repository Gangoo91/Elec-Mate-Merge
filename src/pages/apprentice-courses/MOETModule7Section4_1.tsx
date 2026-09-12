/**
 * MOET · Module 7 · Section 4 · Subsection 1 — Teamwork and Collaboration
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs: this page covers general professional behaviours (teamwork,
 * collaboration, conflict handling). None of the ST1426 statements verified
 * elsewhere in this conversion (Modules 1-4) describe team-working
 * specifically, and the published KSB numbering has not been verified against
 * a primary source, so no KSB quote is included here rather than inventing
 * one. Flagged in the conversion report.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original; structure, shell and reading measure rebuilt.
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Teamwork and Collaboration - MOET Module 7 Section 4.1';
const DESCRIPTION =
  'Working effectively in maintenance teams, collaborative problem-solving, understanding team roles and responsibilities, and demonstrating teamwork behaviours for EPA assessment under the ST1426 standard.';

const quickCheckQuestions = [
  {
    id: 'team-role-clarity',
    question: 'Why is role clarity important within an electrical maintenance team?',
    options: [
      'It ensures every team member knows their responsibilities, reducing duplication and preventing safety gaps',
      'It allows the most senior technician to take all decisions, removing the need for the rest of the team to communicate',
      'It means each member can work in complete isolation, so no time is lost coordinating or briefing one another',
      'It guarantees the job is finished faster by encouraging everyone to attempt the same critical task at once',
    ],
    correctIndex: 0,
    explanation:
      'Role clarity ensures that every team member understands their specific responsibilities within a task. In electrical maintenance, unclear roles can lead to safety-critical tasks being missed or duplicated. For example, if two technicians both assume the other has carried out safe isolation, neither may actually do it — with potentially fatal consequences.',
  },
  {
    id: 'toolbox-talk-purpose',
    question: 'What is the primary purpose of a toolbox talk before a maintenance task?',
    options: [
      "To formally record each technician's working hours and allocate the labour cost to the correct job number",
      'To brief the team on the task scope, hazards, roles and safety measures',
      'To allow the supervisor to issue verbal warnings to underperforming members in front of the group',
      'To complete the permit-to-work paperwork so that no further isolation checks are needed on site',
    ],
    correctIndex: 1,
    explanation:
      'A toolbox talk is a short, focused briefing that ensures every team member understands the task scope, specific hazards, individual roles, safety measures and emergency procedures before work begins. It is a key collaborative safety practice and a behaviour assessed in the EPA.',
  },
  {
    id: 'conflict-resolution',
    question:
      'A colleague disagrees with your approach to a fault-finding task. What is the most professional response?',
    options: [
      'Insist on your own method and proceed, since the person who spotted the fault first should always decide',
      'Stop speaking to the colleague and report them to the supervisor for being difficult to work with',
      'Listen to their reasoning, discuss the options and agree the safest and most effective approach together',
      'Carry on with both methods at the same time and see which one finds the fault quickest',
    ],
    correctIndex: 2,
    explanation:
      'Professional teamwork requires the ability to listen, discuss and negotiate. Disagreements about approach are normal in maintenance work. The correct response is to hear your colleague out, evaluate both approaches against safety and effectiveness criteria, and reach agreement. If agreement cannot be reached, escalation to a supervisor is appropriate — but only after genuine discussion.',
  },
  {
    id: 'cross-functional-teams',
    question:
      'When working in a cross-functional maintenance team, why is it important to understand other disciplines?',
    options: [
      'So that you can take over the mechanical and instrumentation tasks yourself and avoid relying on other trades',
      'Because cross-functional teams remove the need for any safe isolation, as each trade trusts the others completely',
      'To coordinate work safely, understand interfaces between systems and communicate effectively across disciplines',
      'So you can identify which trade to blame if a fault recurs after the maintenance window closes',
    ],
    correctIndex: 2,
    explanation:
      'Cross-functional understanding enables safe coordination. An electrical technician working alongside mechanical, instrumentation or HVAC engineers needs to understand how their systems interact. For example, isolating an electrical supply affects the mechanical equipment it powers — both teams must coordinate to ensure safety.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Belbin's team role theory suggests that effective teams need:",
    options: [
      'Every member to adopt the same dominant role so that the team speaks with a single voice',
      'A balance of different roles including thinkers, doers and people-focused contributors',
      'As many people as possible, since larger teams always outperform smaller ones',
      'Only highly experienced specialists, with no place for generalists or coordinators',
    ],
    correctAnswer: 1,
    explanation:
      'Belbin identified nine team roles grouped into action-oriented, people-oriented and thought-oriented categories. Effective teams have a balance of these roles, ensuring tasks are completed, relationships maintained and ideas generated. In maintenance teams, this balance helps cover planning, execution and quality assurance.',
  },
  {
    id: 2,
    question: 'During a planned maintenance shutdown, the most important teamwork behaviour is:',
    options: [
      'Completing your own tasks and leaving site immediately',
      'Working as quickly as possible without consulting others',
      'Clear, timely communication of progress, delays and safety issues to all team members',
      'Avoiding contact with other trades to prevent confusion',
    ],
    correctAnswer: 2,
    explanation:
      'During shutdowns, multiple trades work simultaneously on interconnected systems. Clear, timely communication prevents dangerous conflicts (e.g., one team energising a system another team is working on), ensures the schedule is maintained, and allows rapid response to unexpected issues.',
  },
  {
    id: 3,
    question: 'What is the primary benefit of collaborative problem-solving in fault diagnosis?',
    options: [
      'It removes the need to follow a structured diagnostic process, as the group can simply guess the cause together',
      'It spreads the blame if the diagnosis turns out to be wrong, protecting individual technicians',
      'It always reaches a conclusion more cheaply, because more people working means fewer labour hours overall',
      'It combines different knowledge, experience and perspectives to reach a more accurate diagnosis faster',
    ],
    correctAnswer: 3,
    explanation:
      'Collaborative fault diagnosis draws on the combined knowledge, experience and perspectives of multiple technicians. One person may have encountered a similar fault before, another may have specialist knowledge of the system. This collective approach leads to faster, more accurate diagnosis and helps develop less experienced team members.',
  },
  {
    id: 4,
    question:
      'A new apprentice joins your maintenance team. The best approach to supporting them is:',
    options: [
      'Mentor them actively — explain tasks, demonstrate techniques, allow supervised practice and provide constructive feedback',
      'Leave them to learn by trial and error so they develop independence as quickly as possible',
      'Give them only menial tasks away from the team until they have completed their qualification',
      'Let them carry out live testing unsupervised so they gain confidence working under pressure',
    ],
    correctAnswer: 0,
    explanation:
      "Active mentoring is a key teamwork behaviour expected under ST1426. It involves explaining, demonstrating, supervising practice and giving feedback. This develops the apprentice's competence safely and efficiently, builds team capability, and demonstrates the professional behaviours assessed in the EPA.",
  },
  {
    id: 5,
    question: "In the Tuckman model of team development, the 'storming' stage is characterised by:",
    options: [
      'Polite, cautious behaviour as members get to know one another and roles remain unclear',
      'Conflict, disagreement and jostling for position as team members establish working relationships',
      'Settled, productive working patterns with roles accepted and mutual respect established',
      'The team disbanding once the project or shutdown has been completed',
    ],
    correctAnswer: 1,
    explanation:
      "Tuckman's storming stage involves natural conflict as team members push boundaries, challenge each other's approaches and compete for influence. This is a normal and necessary stage — if handled well, it leads to stronger working relationships and clearer team norms. Understanding this helps you navigate team tensions professionally.",
  },
  {
    id: 6,
    question: 'When delegating tasks within a maintenance team, the team leader should ensure:',
    options: [
      'The most difficult tasks are always given to the newest members to accelerate their learning',
      "Tasks are shared out equally by headcount, regardless of each person's skills or experience",
      'Tasks are matched to individual competence, clearly communicated and monitored for progress',
      'Once a task is handed over, the leader steps back entirely and does not check on progress',
    ],
    correctAnswer: 2,
    explanation:
      "Effective delegation matches tasks to competence, communicates expectations clearly (scope, standards, timescale), provides necessary resources and monitors progress. In maintenance, this is safety-critical — assigning a task beyond someone's competence creates risk. It also develops team members by giving them appropriately challenging work.",
  },
  {
    id: 7,
    question:
      'Which of the following is an example of positive team behaviour during a complex maintenance task?',
    options: [
      'Keeping a useful fault-finding shortcut to yourself so you remain the only one who can fix that machine',
      'Focusing solely on your own allocated task and ignoring how the wider job is progressing',
      'Waiting to be asked before helping, even when you can see a colleague is struggling',
      'Offering to help colleagues, sharing knowledge and maintaining awareness of the overall task progress',
    ],
    correctAnswer: 3,
    explanation:
      'Positive team behaviour includes helping colleagues, sharing knowledge freely, maintaining awareness of overall progress and contributing beyond your immediate task. These behaviours build team capability, improve safety and efficiency, and are specifically assessed in the EPA professional behaviours component.',
  },
  {
    id: 8,
    question:
      'When handing over a maintenance task to the next shift, the most important action is:',
    options: [
      'Providing a thorough verbal and written handover covering work completed, outstanding items, safety status and any issues encountered',
      'Leaving a brief note on the job card and heading home, trusting the next shift to work the rest out',
      'Telling only the incoming shift supervisor verbally, so the information stays between the two of you',
      'Completing all outstanding work yourself before leaving, even if it means overrunning the isolation window',
    ],
    correctAnswer: 0,
    explanation:
      'Shift handovers are a critical teamwork practice in maintenance. A thorough handover (verbal and written) ensures continuity, prevents duplication and — most importantly — communicates safety-critical information such as isolation status, outstanding hazards and incomplete work. Poor handovers have been identified as a factor in numerous industrial incidents.',
  },
  {
    id: 9,
    question: 'Which behaviour demonstrates respect for diversity within a maintenance team?',
    options: [
      'Expecting every colleague to communicate in exactly the same way you do, regardless of their background',
      'Valuing different perspectives, adapting communication styles and ensuring all team members can contribute effectively',
      'Letting only the most confident voices set the approach, since quieter members rarely have useful input',
      'Assuming that experienced technicians always have nothing to learn from newer or differently trained colleagues',
    ],
    correctAnswer: 1,
    explanation:
      'Respecting diversity means recognising that team members bring different perspectives, experiences and strengths. It involves adapting your communication style to be effective with different people, actively including all team members in discussions, and valuing contributions from diverse viewpoints. This is both a professional standard and an EPA behaviour.',
  },
  {
    id: 10,
    question: 'Under ST1426, which teamwork behaviour is specifically assessed in the EPA?',
    options: [
      'The ability to complete every task entirely alone without needing input from anyone else',
      'A detailed theoretical knowledge of organisational psychology models such as Belbin and Tuckman',
      'Working effectively with others, contributing to team objectives and supporting colleagues',
      'The number of overtime hours volunteered during planned shutdowns over the apprenticeship',
    ],
    correctAnswer: 2,
    explanation:
      'ST1426 specifically assesses the ability to work effectively with others, contribute to team objectives and support colleagues. The EPA assessor looks for evidence of collaboration, communication, respect for others and a positive contribution to team performance. This is demonstrated through your portfolio evidence and professional discussion.',
  },
  {
    id: 11,
    question:
      'When a maintenance team encounters an unexpected problem during a task, the first collective action should be:',
    options: [
      'Each person tries their own solution independently',
      'Immediately call an external specialist without team discussion',
      'Continue working and hope the problem resolves itself',
      'Stop work, assess the situation together, share information and agree a safe way forward',
    ],
    correctAnswer: 3,
    explanation:
      "When unexpected problems arise, the team should stop, assess collectively, share relevant information and experience, and agree a safe approach before proceeding. This collaborative response draws on the team's combined knowledge, ensures safety is maintained and models the professional behaviours expected under ST1426.",
  },
  {
    id: 12,
    question:
      'Why is giving constructive feedback to colleagues considered a valuable teamwork skill?',
    options: [
      'It helps colleagues improve their performance, builds trust and strengthens team capability',
      'It establishes who is at fault so that responsibility for any defect can be recorded formally',
      'It allows you to point out weaknesses publicly, which motivates the whole team to work harder',
      'It removes the need for any further training, since feedback alone is enough to correct unsafe practice',
    ],
    correctAnswer: 0,
    explanation:
      'Constructive feedback — given respectfully, specifically and in a timely manner — helps colleagues develop their skills, corrects unsafe practices and builds mutual trust. In maintenance teams, the ability to give and receive feedback is essential for safety and continuous improvement. It is a key professional behaviour assessed in the EPA.',
  },
];

const faqs = [
  {
    question: 'How is teamwork assessed in the ST1426 EPA?',
    answer:
      'Teamwork is assessed primarily through the professional discussion and portfolio evidence. The assessor will ask you to provide examples of working effectively in teams, supporting colleagues, resolving disagreements and contributing to team objectives. Your portfolio should include evidence such as witness testimonies from supervisors and colleagues, records of team projects, and examples of collaborative problem-solving.',
  },
  {
    question: 'What if I mostly work alone as a maintenance technician?',
    answer:
      'Even lone workers participate in teams. You coordinate with other trades during shutdowns, hand over to shift colleagues, report to supervisors, brief contractors, and communicate with production teams. You also participate in team meetings, toolbox talks and safety briefings. All of these are teamwork activities that provide evidence for your EPA.',
  },
  {
    question: 'How do I handle a situation where a team member is not pulling their weight?',
    answer:
      'Address it professionally: first, speak to the individual privately and constructively — they may be struggling with personal issues, lack of training or unclear expectations. If the behaviour continues, raise it with your supervisor. Document your concerns factually. Never ignore it, as it affects team safety and performance. Handling this well demonstrates mature professional behaviour for your EPA.',
  },
  {
    question: 'What is a Belbin team role and do I need to know mine for the EPA?',
    answer:
      'Belbin identified nine team roles that describe how people contribute to teams. While you do not need to name your specific Belbin role in the EPA, understanding the concept demonstrates professional awareness. Knowing that teams work best with a mix of roles (implementers, coordinators, specialists, etc.) shows you understand team dynamics — a valuable behaviour to discuss in your professional interview.',
  },
  {
    question: 'How can I improve my teamwork skills before the EPA?',
    answer:
      'Actively volunteer for team tasks, offer to help colleagues, participate in toolbox talks, share your knowledge, ask for and act on feedback, and reflect on team interactions. Keep a reflective log of teamwork situations — what went well, what you would do differently. This practice provides both skill development and portfolio evidence.',
  },
  {
    question: 'Is teamwork only about getting along with people?',
    answer:
      'No. Professional teamwork includes: clear communication, reliable task completion, willingness to challenge unsafe practices, constructive feedback, active listening, knowledge sharing, supporting less experienced colleagues and contributing to team planning. It is about effective collaboration towards shared objectives, not just being pleasant.',
  },
];

const MOETModule7Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.4 · Subsection 1"
        title="Teamwork and Collaboration"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Working effectively in maintenance teams and demonstrating collaborative professional
            behaviours.
          </p>

          <TLDR
            points={[
              'Team roles: Belbin model — thinkers, doers, people-focused.',
              'Development: Tuckman — forming, storming, norming, performing.',
              'Key skills: Communication, delegation, conflict resolution.',
              'EPA focus: Portfolio evidence and professional discussion.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the importance of effective teamwork in electrical maintenance environments',
              "Describe Belbin's team role theory and Tuckman's stages of team development",
              'Demonstrate collaborative problem-solving and fault diagnosis techniques',
              'Apply professional communication skills within multi-disciplinary teams',
              'Handle conflict, provide constructive feedback and support less experienced colleagues',
              'Gather and present portfolio evidence of teamwork for EPA assessment',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shutdowns:</strong> multi-trade coordination and communication.
              </li>
              <li>
                <strong>Shift handovers:</strong> safety-critical information transfer.
              </li>
              <li>
                <strong>Cross-functional:</strong> electrical, mechanical, instrumentation teams.
              </li>
              <li>
                <strong>ST1426:</strong> behaviours component — working with others.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Why teamwork matters in electrical maintenance</ContentEyebrow>

          <ConceptBlock title="Even lone workers operate inside a wider team">
            <p>
              Electrical maintenance is rarely a solo activity. Even when a single technician is
              despatched to a fault call, they operate within a wider team: coordinating with
              production to arrange a safe window for work, liaising with stores for parts,
              reporting to supervisors, and handing over to the next shift. On larger planned
              maintenance tasks and shutdowns, multiple technicians from several disciplines work
              side by side on interconnected systems where poor coordination can have fatal
              consequences.
            </p>
            <p>
              The ST1426 Maintenance and Operations Engineering Technician standard explicitly
              requires apprentices to demonstrate that they can work effectively with others. This
              is not a soft optional extra — it is a core assessed behaviour. The EPA assessor will
              look for concrete evidence that you communicate clearly, support colleagues,
              contribute to team objectives and handle interpersonal challenges professionally.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why teams outperform individuals">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combined knowledge:</strong> multiple technicians bring different
                experiences, training and specialist knowledge to complex fault diagnosis.
              </li>
              <li>
                <strong>Safety assurance:</strong> a second pair of eyes catches errors —
                particularly important for safe isolation, proving dead and permit to work
                procedures.
              </li>
              <li>
                <strong>Efficiency:</strong> well-coordinated teams complete shutdown tasks faster,
                reducing costly downtime for the business.
              </li>
              <li>
                <strong>Resilience:</strong> teams can adapt to unexpected problems by
                redistributing tasks and drawing on the breadth of their collective capability.
              </li>
              <li>
                <strong>Development:</strong> less experienced technicians learn from more
                experienced colleagues through day-to-day collaboration.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="When teamwork fails"
            whatHappens={
              <>
                HSE investigations into maintenance-related incidents frequently identify teamwork
                failures as contributing factors: poor handovers between shifts, unclear role
                assignments during shutdowns, failure to communicate changes in isolation status,
                and breakdowns in coordination between electrical and mechanical teams. In one
                reported case, a technician was electrocuted because a colleague on a different
                shift re-energised a circuit without checking the permit to work log — a
                catastrophic handover failure.
              </>
            }
            doInstead={
              <>
                Treat teamwork in maintenance as a safety-critical skill. The ability to
                communicate, coordinate and collaborate directly affects whether people go home safe
                at the end of each shift.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Understanding team roles and dynamics</ContentEyebrow>

          <ConceptBlock title="How people interact shapes team performance">
            <p>
              Effective teams are not simply groups of competent individuals. Research into team
              performance — most notably by Meredith Belbin and Bruce Tuckman — shows that how
              people interact, what roles they naturally adopt, and how the team develops over time
              all have a significant impact on performance. Understanding these dynamics helps you
              contribute more effectively and navigate the inevitable challenges of working with
              others.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Belbin's team roles">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Category</th>
                    <th className="py-2 pr-4 font-medium text-white">Role</th>
                    <th className="py-2 font-medium text-white">Maintenance example</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Action-oriented</td>
                    <td className="py-2 pr-4 align-top">Shaper</td>
                    <td className="py-2">Drives the team forward during a tight shutdown window</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Action-oriented</td>
                    <td className="py-2 pr-4 align-top">Implementer</td>
                    <td className="py-2">
                      Turns the maintenance plan into practical, step-by-step actions
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Action-oriented</td>
                    <td className="py-2 pr-4 align-top">Completer-Finisher</td>
                    <td className="py-2">
                      Checks all connections, labels and documentation before handback
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">People-oriented</td>
                    <td className="py-2 pr-4 align-top">Coordinator</td>
                    <td className="py-2">
                      Organises the team, delegates tasks to match competence
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">People-oriented</td>
                    <td className="py-2 pr-4 align-top">Teamworker</td>
                    <td className="py-2">
                      Supports colleagues, resolves friction, maintains morale
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">People-oriented</td>
                    <td className="py-2 pr-4 align-top">Resource Investigator</td>
                    <td className="py-2">
                      Sources hard-to-find spare parts, liaises with suppliers
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Thought-oriented</td>
                    <td className="py-2 pr-4 align-top">Plant</td>
                    <td className="py-2">Generates creative solutions to unusual faults</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Thought-oriented</td>
                    <td className="py-2 pr-4 align-top">Monitor-Evaluator</td>
                    <td className="py-2">
                      Critically assesses proposed repair methods before committing
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Thought-oriented</td>
                    <td className="py-2 pr-4 align-top">Specialist</td>
                    <td className="py-2">
                      Provides deep expertise in a specific area (e.g., PLC programming)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Tuckman's stages of team development"
            onSite="Knowing that conflict (storming) is a normal stage of team development helps you respond professionally rather than taking disagreements personally. The most effective teams work through conflict to reach stronger working relationships."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Forming:</strong> team members are polite, cautious and uncertain. Roles are
                unclear. In maintenance, this is typical when a new team is assembled for a project
                or a new starter joins.
              </li>
              <li>
                <strong>Storming:</strong> conflict emerges as individuals push boundaries,
                challenge each other and compete for influence. This is normal and necessary — it
                establishes working norms.
              </li>
              <li>
                <strong>Norming:</strong> the team settles into productive working patterns. Roles
                are accepted, communication improves and mutual respect develops.
              </li>
              <li>
                <strong>Performing:</strong> the team works at peak efficiency with minimal
                friction. Members support each other, adapt flexibly and focus on shared objectives.
              </li>
              <li>
                <strong>Adjourning:</strong> the team disbands after completing the task. In
                maintenance, this happens at the end of a shutdown or project.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Collaborative problem-solving in maintenance</ContentEyebrow>

          <ConceptBlock title="Pooling knowledge improves the quality of the solution">
            <p>
              Some of the most challenging aspects of electrical maintenance — complex fault
              diagnosis, system modifications, and emergency response — benefit enormously from
              collaborative problem-solving. When individuals pool their knowledge, experience and
              perspectives, the quality of solutions improves significantly. This is particularly
              true in modern maintenance environments where systems integrate electrical,
              mechanical, pneumatic and control elements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Collaborative fault diagnosis process">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gather information collectively:</strong> each team member shares what they
                know — symptoms observed, recent work carried out, production conditions at the time
                of failure.
              </li>
              <li>
                <strong>Brainstorm possible causes:</strong> encourage all ideas without premature
                dismissal. A less experienced technician may spot something a more experienced one
                overlooks.
              </li>
              <li>
                <strong>Evaluate and prioritise:</strong> as a team, assess the likelihood of each
                cause and agree the most logical testing sequence.
              </li>
              <li>
                <strong>Divide and test:</strong> allocate testing tasks based on individual
                competence and available equipment. Maintain communication throughout.
              </li>
              <li>
                <strong>Share findings and converge:</strong> bring results together, eliminate
                causes, and narrow down to the root cause.
              </li>
              <li>
                <strong>Agree the repair:</strong> collectively agree the repair approach,
                considering safety, quality and time constraints.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Cross-functional collaboration">
            <p>
              Modern maintenance increasingly requires cross-functional teams. An electrical
              technician may need to work with mechanical fitters, instrumentation engineers, HVAC
              specialists and production operators to diagnose and resolve complex system faults.
              Understanding the basics of adjacent disciplines — how a motor drives a pump, how a
              sensor feeds a PLC, how process conditions affect electrical components — makes you a
              far more effective team member.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Knowledge sharing">
            <p>
              Effective teams actively share knowledge. When you discover a useful fault-finding
              technique, an efficient wiring method, or a better way to interpret a technical
              drawing, share it with colleagues. This builds collective capability and creates a
              culture of continuous improvement. Hoarding knowledge may feel like it protects your
              position, but it weakens the team and is the opposite of the professional behaviour
              expected under ST1426.
            </p>
          </ConceptBlock>

          <Scenario
            title="Collaborative shutdown success"
            situation={
              <p>
                A manufacturing facility scheduled a 48-hour electrical shutdown to replace ageing
                switchgear. The maintenance team comprised six electrical technicians, two
                mechanical fitters, an instrumentation engineer and a project coordinator.
              </p>
            }
            whatToDo={
              <>
                <p>
                  Before the shutdown, the team held three planning meetings to agree the sequence
                  of work, assign roles, identify interfaces between tasks, and establish
                  communication protocols. During the shutdown, 15-minute progress huddles were held
                  every four hours.
                </p>
                <p>
                  When an unexpected problem arose — a cable route was obstructed by a newly
                  installed mechanical duct — the team quickly re-planned, with the mechanical
                  fitters modifying the duct run while the electricians worked on an alternative
                  section.
                </p>
              </>
            }
            whyItMatters={
              <>
                The shutdown was completed on time, with no safety incidents, because of effective
                teamwork and communication. Collaborative problem-solving is not about having
                meetings for the sake of it — it is about drawing on collective capability to solve
                problems safely and efficiently. The best maintenance teams collaborate naturally —
                sharing information, helping each other, and maintaining awareness of the bigger
                picture.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Conflict resolution and constructive feedback</ContentEyebrow>

          <ConceptBlock title="Handling disagreement professionally">
            <p>
              Conflict is inevitable in any team, and maintenance teams are no exception.
              Disagreements about the best approach to a repair, frustration during high-pressure
              shutdown work, personality clashes on night shifts — these are all normal. What
              distinguishes a professional technician is the ability to handle conflict
              constructively, resolve disagreements without damaging working relationships, and give
              feedback that helps colleagues improve.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conflict resolution steps">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Acknowledge the disagreement:</strong> do not ignore it or hope it goes
                away. Recognise that there is a difference of opinion.
              </li>
              <li>
                <strong>Listen actively:</strong> hear your colleague&apos;s perspective fully
                before responding. Do not interrupt or dismiss their view.
              </li>
              <li>
                <strong>Focus on the issue, not the person:</strong> discuss the technical merits of
                each approach rather than criticising the individual.
              </li>
              <li>
                <strong>Seek common ground:</strong> identify areas of agreement and build from
                there.
              </li>
              <li>
                <strong>Compromise or defer:</strong> if agreement cannot be reached, propose a
                compromise. If the matter is safety-critical, escalate to a supervisor.
              </li>
              <li>
                <strong>Move forward positively:</strong> once resolved, do not hold grudges.
                Maintain a professional working relationship.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Giving constructive feedback">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Be specific:</strong> &quot;The cable termination in DB3 was loose&quot;
                rather than &quot;Your work is sloppy&quot;.
              </li>
              <li>
                <strong>Be timely:</strong> give feedback as soon as practical after the event, not
                weeks later.
              </li>
              <li>
                <strong>Be private:</strong> give corrective feedback one-to-one, not in front of
                others.
              </li>
              <li>
                <strong>Be balanced:</strong> acknowledge what was done well alongside what needs
                improvement.
              </li>
              <li>
                <strong>Focus on behaviour, not personality:</strong> &quot;The circuit labels need
                to be more legible&quot; not &quot;You are careless&quot;.
              </li>
              <li>
                <strong>Offer help:</strong> &quot;Would you like me to show you the technique I use
                for cable dressing?&quot; rather than just pointing out the problem.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Receiving feedback professionally"
            onSite="The professional behaviours component of the EPA specifically assesses your ability to work constructively with others, which includes handling disagreements professionally, giving and receiving feedback, and maintaining positive working relationships even under pressure."
          >
            <p>
              How you receive feedback is equally important. Listen without becoming defensive, ask
              clarifying questions if needed, thank the person for their input and take action on
              valid points. Even if you disagree, consider the feedback carefully before dismissing
              it. The ability to receive feedback gracefully is a mark of professional maturity and
              is noticed by EPA assessors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Building your teamwork evidence for EPA</ContentEyebrow>

          <ConceptBlock title="Gathering evidence in real time">
            <p>
              Gathering strong evidence of teamwork is essential for your EPA portfolio and
              professional discussion. The assessor will expect you to provide specific, detailed
              examples — not vague generalities. Start collecting evidence now, as the best examples
              come from real workplace situations that you record at the time, rather than trying to
              remember months later.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Types of teamwork evidence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Witness testimonies:</strong> written statements from supervisors,
                colleagues and mentors describing your teamwork contributions.
              </li>
              <li>
                <strong>Reflective accounts:</strong> your own written reflections on team
                situations — what happened, your contribution, what you learned.
              </li>
              <li>
                <strong>Toolbox talk records:</strong> evidence of participation in and, ideally,
                delivery of toolbox talks.
              </li>
              <li>
                <strong>Shutdown/project records:</strong> documentation from team maintenance
                activities showing your role and contribution.
              </li>
              <li>
                <strong>Meeting minutes:</strong> records of team meetings where you contributed
                ideas or took action items.
              </li>
              <li>
                <strong>Mentoring evidence:</strong> records of supporting apprentices or less
                experienced colleagues.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="STAR technique for professional discussion">
            <p>
              When discussing teamwork examples in your EPA professional discussion, use the STAR
              technique to structure clear, compelling answers:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Situation:</strong> set the scene — what was the task, who was in the team,
                what were the conditions?
              </li>
              <li>
                <strong>Task:</strong> what was your specific role and responsibility within the
                team?
              </li>
              <li>
                <strong>Action:</strong> what did you actually do? How did you communicate,
                collaborate, solve problems?
              </li>
              <li>
                <strong>Result:</strong> what was the outcome? What did the team achieve? What did
                you learn?
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Strong evidence vs weak evidence"
            onSite="Start a teamwork evidence log now. After any significant team activity, spend five minutes noting the situation, your role, what you did, and the outcome. This habit provides a rich bank of evidence for your EPA and demonstrates the reflective practice that assessors value highly."
          >
            <p>
              <strong>Strong evidence example:</strong> &quot;During a weekend shutdown, I worked as
              part of a four-person team replacing distribution boards in Block C. My role was to
              terminate the outgoing circuits while my colleague handled the incoming supply. We
              held a toolbox talk at the start, agreed isolation responsibilities, and maintained
              radio contact throughout. When we discovered an unexpected three-phase supply that was
              not on the drawings, I immediately communicated this to the team lead, and we revised
              the isolation plan together before proceeding safely.&quot;
            </p>
            <p>
              <strong>Weak evidence example:</strong> &quot;I work well in teams and get along with
              everyone.&quot; This is far too vague — it provides no specific evidence, no context,
              no detail of your contribution and no demonstration of the behaviours the assessor is
              looking for. Always provide concrete examples with enough detail to show what you
              actually did.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Teamwork in maintenance is a safety-critical skill — communication and coordination affect whether people go home safe.',
              'Belbin: effective teams balance action-oriented, people-oriented and thought-oriented roles.',
              'Tuckman: forming, storming, norming, performing, adjourning — storming is normal, not a failure.',
              'Collaborative fault diagnosis draws on collective knowledge to reach a faster, more accurate diagnosis.',
              'Resolve conflict by focusing on the issue, not the person, and escalate genuine safety disagreements.',
              'Give feedback that is specific, timely, private and balanced; receive feedback without becoming defensive.',
              'Use the STAR technique (Situation, Task, Action, Result) to structure EPA evidence of teamwork.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Teamwork and Collaboration"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section overview
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section4-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Communication and Reporting Skills
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section4_1;
