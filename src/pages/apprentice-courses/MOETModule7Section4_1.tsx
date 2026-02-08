import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Teamwork and Collaboration - MOET Module 7 Section 4.1";
const DESCRIPTION = "Working effectively in maintenance teams, collaborative problem-solving, understanding team roles and responsibilities, and demonstrating teamwork behaviours for EPA assessment under the ST1426 standard.";

const quickCheckQuestions = [
  {
    id: "team-role-clarity",
    question: "Why is role clarity important within an electrical maintenance team?",
    options: [
      "It allows team members to avoid tasks they dislike",
      "It ensures every team member knows their responsibilities, reducing duplication and preventing safety gaps",
      "It means only one person needs to understand the full task",
      "It eliminates the need for communication between team members"
    ],
    correctIndex: 1,
    explanation: "Role clarity ensures that every team member understands their specific responsibilities within a task. In electrical maintenance, unclear roles can lead to safety-critical tasks being missed or duplicated. For example, if two technicians both assume the other has carried out safe isolation, neither may actually do it — with potentially fatal consequences."
  },
  {
    id: "toolbox-talk-purpose",
    question: "What is the primary purpose of a toolbox talk before a maintenance task?",
    options: [
      "To check that everyone has the correct tools",
      "To brief the team on the task scope, hazards, roles and safety measures",
      "To assign overtime payments for the job",
      "To complete the paperwork required by management"
    ],
    correctIndex: 1,
    explanation: "A toolbox talk is a short, focused briefing that ensures every team member understands the task scope, specific hazards, individual roles, safety measures and emergency procedures before work begins. It is a key collaborative safety practice and a behaviour assessed in the EPA."
  },
  {
    id: "conflict-resolution",
    question: "A colleague disagrees with your approach to a fault-finding task. What is the most professional response?",
    options: [
      "Ignore their opinion and proceed with your method",
      "Escalate immediately to management without discussion",
      "Listen to their reasoning, discuss the options and agree the safest and most effective approach together",
      "Let them do it their way to avoid confrontation"
    ],
    correctIndex: 2,
    explanation: "Professional teamwork requires the ability to listen, discuss and negotiate. Disagreements about approach are normal in maintenance work. The correct response is to hear your colleague out, evaluate both approaches against safety and effectiveness criteria, and reach agreement. If agreement cannot be reached, escalation to a supervisor is appropriate — but only after genuine discussion."
  },
  {
    id: "cross-functional-teams",
    question: "When working in a cross-functional maintenance team, why is it important to understand other disciplines?",
    options: [
      "So you can do their jobs for them",
      "To impress management during appraisals",
      "To coordinate work safely, understand interfaces between systems and communicate effectively across disciplines",
      "It is not important — each discipline should work independently"
    ],
    correctIndex: 2,
    explanation: "Cross-functional understanding enables safe coordination. An electrical technician working alongside mechanical, instrumentation or HVAC engineers needs to understand how their systems interact. For example, isolating an electrical supply affects the mechanical equipment it powers — both teams must coordinate to ensure safety."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Belbin's team role theory suggests that effective teams need:",
    options: [
      "All members to have identical skills and approaches",
      "A balance of different roles including thinkers, doers and people-focused contributors",
      "At least ten members to cover all necessary roles",
      "One dominant leader with compliant followers"
    ],
    correctAnswer: 1,
    explanation: "Belbin identified nine team roles grouped into action-oriented, people-oriented and thought-oriented categories. Effective teams have a balance of these roles, ensuring tasks are completed, relationships maintained and ideas generated. In maintenance teams, this balance helps cover planning, execution and quality assurance."
  },
  {
    id: 2,
    question: "During a planned maintenance shutdown, the most important teamwork behaviour is:",
    options: [
      "Working as quickly as possible without consulting others",
      "Clear, timely communication of progress, delays and safety issues to all team members",
      "Completing your own tasks and leaving site immediately",
      "Avoiding contact with other trades to prevent confusion"
    ],
    correctAnswer: 1,
    explanation: "During shutdowns, multiple trades work simultaneously on interconnected systems. Clear, timely communication prevents dangerous conflicts (e.g., one team energising a system another team is working on), ensures the schedule is maintained, and allows rapid response to unexpected issues."
  },
  {
    id: 3,
    question: "What is the primary benefit of collaborative problem-solving in fault diagnosis?",
    options: [
      "It spreads the blame if the diagnosis is wrong",
      "It combines different knowledge, experience and perspectives to reach a more accurate diagnosis faster",
      "It means less experienced technicians do not need to learn",
      "It reduces the amount of testing required"
    ],
    correctAnswer: 1,
    explanation: "Collaborative fault diagnosis draws on the combined knowledge, experience and perspectives of multiple technicians. One person may have encountered a similar fault before, another may have specialist knowledge of the system. This collective approach leads to faster, more accurate diagnosis and helps develop less experienced team members."
  },
  {
    id: 4,
    question: "A new apprentice joins your maintenance team. The best approach to supporting them is:",
    options: [
      "Leave them to figure things out on their own",
      "Give them only simple tasks that do not require supervision",
      "Mentor them actively — explain tasks, demonstrate techniques, allow supervised practice and provide constructive feedback",
      "Tell them to read the manuals and ask questions only if stuck"
    ],
    correctAnswer: 2,
    explanation: "Active mentoring is a key teamwork behaviour expected under ST1426. It involves explaining, demonstrating, supervising practice and giving feedback. This develops the apprentice's competence safely and efficiently, builds team capability, and demonstrates the professional behaviours assessed in the EPA."
  },
  {
    id: 5,
    question: "In the Tuckman model of team development, the 'storming' stage is characterised by:",
    options: [
      "The team working at peak efficiency",
      "Conflict, disagreement and jostling for position as team members establish working relationships",
      "The team breaking up and members leaving",
      "Complete agreement on all decisions"
    ],
    correctAnswer: 1,
    explanation: "Tuckman's storming stage involves natural conflict as team members push boundaries, challenge each other's approaches and compete for influence. This is a normal and necessary stage — if handled well, it leads to stronger working relationships and clearer team norms. Understanding this helps you navigate team tensions professionally."
  },
  {
    id: 6,
    question: "When delegating tasks within a maintenance team, the team leader should ensure:",
    options: [
      "Tasks are given to whoever is closest, regardless of competence",
      "Only the most experienced person does any work",
      "Tasks are matched to individual competence, clearly communicated and monitored for progress",
      "Everyone does the same task simultaneously for speed"
    ],
    correctAnswer: 2,
    explanation: "Effective delegation matches tasks to competence, communicates expectations clearly (scope, standards, timescale), provides necessary resources and monitors progress. In maintenance, this is safety-critical — assigning a task beyond someone's competence creates risk. It also develops team members by giving them appropriately challenging work."
  },
  {
    id: 7,
    question: "Which of the following is an example of positive team behaviour during a complex maintenance task?",
    options: [
      "Completing your section and leaving without checking if colleagues need help",
      "Keeping your specialist knowledge to yourself to maintain your value",
      "Offering to help colleagues, sharing knowledge and maintaining awareness of the overall task progress",
      "Working through breaks to finish ahead of schedule"
    ],
    correctAnswer: 2,
    explanation: "Positive team behaviour includes helping colleagues, sharing knowledge freely, maintaining awareness of overall progress and contributing beyond your immediate task. These behaviours build team capability, improve safety and efficiency, and are specifically assessed in the EPA professional behaviours component."
  },
  {
    id: 8,
    question: "When handing over a maintenance task to the next shift, the most important action is:",
    options: [
      "Leaving a brief note on the workbench",
      "Providing a thorough verbal and written handover covering work completed, outstanding items, safety status and any issues encountered",
      "Sending an email after you have left site",
      "Assuming the next shift will check everything themselves"
    ],
    correctAnswer: 1,
    explanation: "Shift handovers are a critical teamwork practice in maintenance. A thorough handover (verbal and written) ensures continuity, prevents duplication and — most importantly — communicates safety-critical information such as isolation status, outstanding hazards and incomplete work. Poor handovers have been identified as a factor in numerous industrial incidents."
  },
  {
    id: 9,
    question: "Which behaviour demonstrates respect for diversity within a maintenance team?",
    options: [
      "Treating everyone identically regardless of their needs",
      "Valuing different perspectives, adapting communication styles and ensuring all team members can contribute effectively",
      "Only working with people who share your background",
      "Avoiding discussion of any differences"
    ],
    correctAnswer: 1,
    explanation: "Respecting diversity means recognising that team members bring different perspectives, experiences and strengths. It involves adapting your communication style to be effective with different people, actively including all team members in discussions, and valuing contributions from diverse viewpoints. This is both a professional standard and an EPA behaviour."
  },
  {
    id: 10,
    question: "Under ST1426, which teamwork behaviour is specifically assessed in the EPA?",
    options: [
      "The ability to work completely independently without any team interaction",
      "Working effectively with others, contributing to team objectives and supporting colleagues",
      "Completing tasks faster than all other team members",
      "Avoiding all disagreement with colleagues"
    ],
    correctAnswer: 1,
    explanation: "ST1426 specifically assesses the ability to work effectively with others, contribute to team objectives and support colleagues. The EPA assessor looks for evidence of collaboration, communication, respect for others and a positive contribution to team performance. This is demonstrated through your portfolio evidence and professional discussion."
  },
  {
    id: 11,
    question: "When a maintenance team encounters an unexpected problem during a task, the first collective action should be:",
    options: [
      "Each person tries their own solution independently",
      "Stop work, assess the situation together, share information and agree a safe way forward",
      "Continue working and hope the problem resolves itself",
      "Immediately call an external specialist without team discussion"
    ],
    correctAnswer: 1,
    explanation: "When unexpected problems arise, the team should stop, assess collectively, share relevant information and experience, and agree a safe approach before proceeding. This collaborative response draws on the team's combined knowledge, ensures safety is maintained and models the professional behaviours expected under ST1426."
  },
  {
    id: 12,
    question: "Why is giving constructive feedback to colleagues considered a valuable teamwork skill?",
    options: [
      "It demonstrates superiority over colleagues",
      "It helps colleagues improve their performance, builds trust and strengthens team capability",
      "It is only necessary during formal appraisals",
      "It replaces the need for formal training"
    ],
    correctAnswer: 1,
    explanation: "Constructive feedback — given respectfully, specifically and in a timely manner — helps colleagues develop their skills, corrects unsafe practices and builds mutual trust. In maintenance teams, the ability to give and receive feedback is essential for safety and continuous improvement. It is a key professional behaviour assessed in the EPA."
  }
];

const faqs = [
  {
    question: "How is teamwork assessed in the ST1426 EPA?",
    answer: "Teamwork is assessed primarily through the professional discussion and portfolio evidence. The assessor will ask you to provide examples of working effectively in teams, supporting colleagues, resolving disagreements and contributing to team objectives. Your portfolio should include evidence such as witness testimonies from supervisors and colleagues, records of team projects, and examples of collaborative problem-solving."
  },
  {
    question: "What if I mostly work alone as a maintenance technician?",
    answer: "Even lone workers participate in teams. You coordinate with other trades during shutdowns, hand over to shift colleagues, report to supervisors, brief contractors, and communicate with production teams. You also participate in team meetings, toolbox talks and safety briefings. All of these are teamwork activities that provide evidence for your EPA."
  },
  {
    question: "How do I handle a situation where a team member is not pulling their weight?",
    answer: "Address it professionally: first, speak to the individual privately and constructively — they may be struggling with personal issues, lack of training or unclear expectations. If the behaviour continues, raise it with your supervisor. Document your concerns factually. Never ignore it, as it affects team safety and performance. Handling this well demonstrates mature professional behaviour for your EPA."
  },
  {
    question: "What is a Belbin team role and do I need to know mine for the EPA?",
    answer: "Belbin identified nine team roles that describe how people contribute to teams. While you do not need to name your specific Belbin role in the EPA, understanding the concept demonstrates professional awareness. Knowing that teams work best with a mix of roles (implementers, coordinators, specialists, etc.) shows you understand team dynamics — a valuable behaviour to discuss in your professional interview."
  },
  {
    question: "How can I improve my teamwork skills before the EPA?",
    answer: "Actively volunteer for team tasks, offer to help colleagues, participate in toolbox talks, share your knowledge, ask for and act on feedback, and reflect on team interactions. Keep a reflective log of teamwork situations — what went well, what you would do differently. This practice provides both skill development and portfolio evidence."
  },
  {
    question: "Is teamwork only about getting along with people?",
    answer: "No. Professional teamwork includes: clear communication, reliable task completion, willingness to challenge unsafe practices, constructive feedback, active listening, knowledge sharing, supporting less experienced colleagues and contributing to team planning. It is about effective collaboration towards shared objectives, not just being pleasant."
  }
];

const MOETModule7Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4">
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
            <span>Module 7.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Teamwork and Collaboration
          </h1>
          <p className="text-white/80">
            Working effectively in maintenance teams and demonstrating collaborative professional behaviours
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Team roles:</strong> Belbin model — thinkers, doers, people-focused</li>
              <li className="pl-1"><strong>Development:</strong> Tuckman — forming, storming, norming, performing</li>
              <li className="pl-1"><strong>Key skills:</strong> Communication, delegation, conflict resolution</li>
              <li className="pl-1"><strong>EPA focus:</strong> Portfolio evidence and professional discussion</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Shutdowns:</strong> Multi-trade coordination and communication</li>
              <li className="pl-1"><strong>Shift handovers:</strong> Safety-critical information transfer</li>
              <li className="pl-1"><strong>Cross-functional:</strong> Electrical, mechanical, instrumentation teams</li>
              <li className="pl-1"><strong>ST1426:</strong> Behaviours component — working with others</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the importance of effective teamwork in electrical maintenance environments",
              "Describe Belbin's team role theory and Tuckman's stages of team development",
              "Demonstrate collaborative problem-solving and fault diagnosis techniques",
              "Apply professional communication skills within multi-disciplinary teams",
              "Handle conflict, provide constructive feedback and support less experienced colleagues",
              "Gather and present portfolio evidence of teamwork for EPA assessment"
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
            Why Teamwork Matters in Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance is rarely a solo activity. Even when a single technician is despatched to a
              fault call, they operate within a wider team: coordinating with production to arrange a safe window
              for work, liaising with stores for parts, reporting to supervisors, and handing over to the next shift.
              On larger planned maintenance tasks and shutdowns, multiple technicians from several disciplines work
              side by side on interconnected systems where poor coordination can have fatal consequences.
            </p>
            <p>
              The ST1426 Maintenance and Operations Engineering Technician standard explicitly requires apprentices
              to demonstrate that they can work effectively with others. This is not a soft optional extra — it is a
              core assessed behaviour. The EPA assessor will look for concrete evidence that you communicate clearly,
              support colleagues, contribute to team objectives and handle interpersonal challenges professionally.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Teams Outperform Individuals</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Combined knowledge:</strong> Multiple technicians bring different experiences, training and specialist knowledge to complex fault diagnosis</li>
                <li className="pl-1"><strong>Safety assurance:</strong> A second pair of eyes catches errors — particularly important for safe isolation, proving dead and permit to work procedures</li>
                <li className="pl-1"><strong>Efficiency:</strong> Well-coordinated teams complete shutdown tasks faster, reducing costly downtime for the business</li>
                <li className="pl-1"><strong>Resilience:</strong> Teams can adapt to unexpected problems by redistributing tasks and drawing on the breadth of their collective capability</li>
                <li className="pl-1"><strong>Development:</strong> Less experienced technicians learn from more experienced colleagues through day-to-day collaboration</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">When Teamwork Fails</p>
              <p className="text-sm text-white">
                HSE investigations into maintenance-related incidents frequently identify teamwork failures as contributing
                factors: poor handovers between shifts, unclear role assignments during shutdowns, failure to communicate
                changes in isolation status, and breakdowns in coordination between electrical and mechanical teams.
                In one reported case, a technician was electrocuted because a colleague on a different shift re-energised
                a circuit without checking the permit to work log — a catastrophic handover failure.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Teamwork in maintenance is a safety-critical skill. The ability to communicate,
              coordinate and collaborate directly affects whether people go home safe at the end of each shift.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Team Roles and Dynamics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective teams are not simply groups of competent individuals. Research into team performance — most
              notably by Meredith Belbin and Bruce Tuckman — shows that how people interact, what roles they naturally
              adopt, and how the team develops over time all have a significant impact on performance. Understanding
              these dynamics helps you contribute more effectively and navigate the inevitable challenges of working
              with others.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Belbin's Team Roles</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Role</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maintenance Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2" rowSpan={3}>Action-oriented</td>
                      <td className="border border-white/10 px-3 py-2">Shaper</td>
                      <td className="border border-white/10 px-3 py-2">Drives the team forward during a tight shutdown window</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Implementer</td>
                      <td className="border border-white/10 px-3 py-2">Turns the maintenance plan into practical, step-by-step actions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Completer-Finisher</td>
                      <td className="border border-white/10 px-3 py-2">Checks all connections, labels and documentation before handback</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2" rowSpan={3}>People-oriented</td>
                      <td className="border border-white/10 px-3 py-2">Coordinator</td>
                      <td className="border border-white/10 px-3 py-2">Organises the team, delegates tasks to match competence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Teamworker</td>
                      <td className="border border-white/10 px-3 py-2">Supports colleagues, resolves friction, maintains morale</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resource Investigator</td>
                      <td className="border border-white/10 px-3 py-2">Sources hard-to-find spare parts, liaises with suppliers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2" rowSpan={3}>Thought-oriented</td>
                      <td className="border border-white/10 px-3 py-2">Plant</td>
                      <td className="border border-white/10 px-3 py-2">Generates creative solutions to unusual faults</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monitor-Evaluator</td>
                      <td className="border border-white/10 px-3 py-2">Critically assesses proposed repair methods before committing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Specialist</td>
                      <td className="border border-white/10 px-3 py-2">Provides deep expertise in a specific area (e.g., PLC programming)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tuckman's Stages of Team Development</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forming:</strong> Team members are polite, cautious and uncertain. Roles are unclear. In maintenance, this is typical when a new team is assembled for a project or a new starter joins</li>
                <li className="pl-1"><strong>Storming:</strong> Conflict emerges as individuals push boundaries, challenge each other and compete for influence. This is normal and necessary — it establishes working norms</li>
                <li className="pl-1"><strong>Norming:</strong> The team settles into productive working patterns. Roles are accepted, communication improves and mutual respect develops</li>
                <li className="pl-1"><strong>Performing:</strong> The team works at peak efficiency with minimal friction. Members support each other, adapt flexibly and focus on shared objectives</li>
                <li className="pl-1"><strong>Adjourning:</strong> The team disbands after completing the task. In maintenance, this happens at the end of a shutdown or project</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Knowing that conflict (storming) is a normal stage of team development helps
              you respond professionally rather than taking disagreements personally. The most effective teams work
              through conflict to reach stronger working relationships.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Collaborative Problem-Solving in Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Some of the most challenging aspects of electrical maintenance — complex fault diagnosis, system
              modifications, and emergency response — benefit enormously from collaborative problem-solving. When
              individuals pool their knowledge, experience and perspectives, the quality of solutions improves
              significantly. This is particularly true in modern maintenance environments where systems integrate
              electrical, mechanical, pneumatic and control elements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Collaborative Fault Diagnosis Process</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Gather information collectively:</strong> Each team member shares what they know — symptoms observed, recent work carried out, production conditions at the time of failure</li>
                <li className="pl-1"><strong>Brainstorm possible causes:</strong> Encourage all ideas without premature dismissal. A less experienced technician may spot something a more experienced one overlooks</li>
                <li className="pl-1"><strong>Evaluate and prioritise:</strong> As a team, assess the likelihood of each cause and agree the most logical testing sequence</li>
                <li className="pl-1"><strong>Divide and test:</strong> Allocate testing tasks based on individual competence and available equipment. Maintain communication throughout</li>
                <li className="pl-1"><strong>Share findings and converge:</strong> Bring results together, eliminate causes, and narrow down to the root cause</li>
                <li className="pl-1"><strong>Agree the repair:</strong> Collectively agree the repair approach, considering safety, quality and time constraints</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cross-Functional Collaboration</h3>
                <p className="text-sm text-white">
                  Modern maintenance increasingly requires cross-functional teams. An electrical technician
                  may need to work with mechanical fitters, instrumentation engineers, HVAC specialists and
                  production operators to diagnose and resolve complex system faults. Understanding the basics
                  of adjacent disciplines — how a motor drives a pump, how a sensor feeds a PLC, how process
                  conditions affect electrical components — makes you a far more effective team member.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Knowledge Sharing</h3>
                <p className="text-sm text-white">
                  Effective teams actively share knowledge. When you discover a useful fault-finding technique,
                  an efficient wiring method, or a better way to interpret a technical drawing, share it with
                  colleagues. This builds collective capability and creates a culture of continuous improvement.
                  Hoarding knowledge may feel like it protects your position, but it weakens the team and is the
                  opposite of the professional behaviour expected under ST1426.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Case Study: Collaborative Shutdown Success</h3>
              <p className="text-sm text-white">
                A manufacturing facility scheduled a 48-hour electrical shutdown to replace ageing switchgear. The
                maintenance team comprised six electrical technicians, two mechanical fitters, an instrumentation
                engineer and a project coordinator. Before the shutdown, the team held three planning meetings to
                agree the sequence of work, assign roles, identify interfaces between tasks, and establish communication
                protocols. During the shutdown, 15-minute progress huddles were held every four hours. When an
                unexpected problem arose — a cable route was obstructed by a newly installed mechanical duct — the
                team quickly re-planned, with the mechanical fitters modifying the duct run while the electricians
                worked on an alternative section. The shutdown was completed on time, with no safety incidents,
                because of effective teamwork and communication.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Collaborative problem-solving is not about having meetings for the sake of it.
              It is about drawing on collective capability to solve problems safely and efficiently. The best
              maintenance teams collaborate naturally — sharing information, helping each other, and maintaining
              awareness of the bigger picture.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Conflict Resolution and Constructive Feedback
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conflict is inevitable in any team, and maintenance teams are no exception. Disagreements about
              the best approach to a repair, frustration during high-pressure shutdown work, personality clashes
              on night shifts — these are all normal. What distinguishes a professional technician is the ability
              to handle conflict constructively, resolve disagreements without damaging working relationships,
              and give feedback that helps colleagues improve.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conflict Resolution Steps</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Acknowledge the disagreement:</strong> Do not ignore it or hope it goes away. Recognise that there is a difference of opinion</li>
                <li className="pl-1"><strong>Listen actively:</strong> Hear your colleague's perspective fully before responding. Do not interrupt or dismiss their view</li>
                <li className="pl-1"><strong>Focus on the issue, not the person:</strong> Discuss the technical merits of each approach rather than criticising the individual</li>
                <li className="pl-1"><strong>Seek common ground:</strong> Identify areas of agreement and build from there</li>
                <li className="pl-1"><strong>Compromise or defer:</strong> If agreement cannot be reached, propose a compromise. If the matter is safety-critical, escalate to a supervisor</li>
                <li className="pl-1"><strong>Move forward positively:</strong> Once resolved, do not hold grudges. Maintain a professional working relationship</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Giving Constructive Feedback</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Be specific:</strong> "The cable termination in DB3 was loose" rather than "Your work is sloppy"</li>
                <li className="pl-1"><strong>Be timely:</strong> Give feedback as soon as practical after the event, not weeks later</li>
                <li className="pl-1"><strong>Be private:</strong> Give corrective feedback one-to-one, not in front of others</li>
                <li className="pl-1"><strong>Be balanced:</strong> Acknowledge what was done well alongside what needs improvement</li>
                <li className="pl-1"><strong>Focus on behaviour, not personality:</strong> "The circuit labels need to be more legible" not "You are careless"</li>
                <li className="pl-1"><strong>Offer help:</strong> "Would you like me to show you the technique I use for cable dressing?" rather than just pointing out the problem</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Receiving Feedback Professionally</p>
              <p className="text-sm text-white">
                How you receive feedback is equally important. Listen without becoming defensive, ask clarifying
                questions if needed, thank the person for their input and take action on valid points. Even if you
                disagree, consider the feedback carefully before dismissing it. The ability to receive feedback
                gracefully is a mark of professional maturity and is noticed by EPA assessors.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The professional behaviours component of the EPA specifically assesses
              your ability to work constructively with others, which includes handling disagreements professionally,
              giving and receiving feedback, and maintaining positive working relationships even under pressure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Building Your Teamwork Evidence for EPA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Gathering strong evidence of teamwork is essential for your EPA portfolio and professional discussion.
              The assessor will expect you to provide specific, detailed examples — not vague generalities. Start
              collecting evidence now, as the best examples come from real workplace situations that you record
              at the time, rather than trying to remember months later.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Teamwork Evidence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Witness testimonies:</strong> Written statements from supervisors, colleagues and mentors describing your teamwork contributions</li>
                <li className="pl-1"><strong>Reflective accounts:</strong> Your own written reflections on team situations — what happened, your contribution, what you learned</li>
                <li className="pl-1"><strong>Toolbox talk records:</strong> Evidence of participation in and, ideally, delivery of toolbox talks</li>
                <li className="pl-1"><strong>Shutdown/project records:</strong> Documentation from team maintenance activities showing your role and contribution</li>
                <li className="pl-1"><strong>Meeting minutes:</strong> Records of team meetings where you contributed ideas or took action items</li>
                <li className="pl-1"><strong>Mentoring evidence:</strong> Records of supporting apprentices or less experienced colleagues</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">STAR Technique for Professional Discussion</h3>
              <p className="text-sm text-white mb-3">
                When discussing teamwork examples in your EPA professional discussion, use the STAR technique
                to structure clear, compelling answers:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Situation:</strong> Set the scene — what was the task, who was in the team, what were the conditions?</li>
                <li className="pl-1"><strong>Task:</strong> What was your specific role and responsibility within the team?</li>
                <li className="pl-1"><strong>Action:</strong> What did you actually do? How did you communicate, collaborate, solve problems?</li>
                <li className="pl-1"><strong>Result:</strong> What was the outcome? What did the team achieve? What did you learn?</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Strong Evidence Example</h3>
                <p className="text-sm text-white">
                  "During a weekend shutdown, I worked as part of a four-person team replacing distribution boards
                  in Block C. My role was to terminate the outgoing circuits while my colleague handled the incoming
                  supply. We held a toolbox talk at the start, agreed isolation responsibilities, and maintained
                  radio contact throughout. When we discovered an unexpected three-phase supply that was not on the
                  drawings, I immediately communicated this to the team lead, and we revised the isolation plan
                  together before proceeding safely."
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Weak Evidence Example</h3>
                <p className="text-sm text-white">
                  "I work well in teams and get along with everyone." This is far too vague — it provides no
                  specific evidence, no context, no detail of your contribution and no demonstration of the
                  behaviours the assessor is looking for. Always provide concrete examples with enough detail
                  to show what you actually did.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Start a teamwork evidence log now. After any significant team activity,
              spend five minutes noting the situation, your role, what you did, and the outcome. This habit
              provides a rich bank of evidence for your EPA and demonstrates the reflective practice that
              assessors value highly.
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
            title="Test Your Knowledge — Teamwork and Collaboration"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-2">
              Next: Communication and Reporting Skills
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section4_1;
