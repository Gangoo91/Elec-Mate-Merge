import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Initiative and Problem-Solving - MOET Module 7 Section 4.4";
const DESCRIPTION = "Developing initiative and structured problem-solving skills for the engineering workplace and EPA: identifying problems, proposing solutions, taking appropriate action and demonstrating professional resourcefulness under ST1426.";

const quickCheckQuestions = [
  {
    id: "initiative-meaning",
    question: "What does 'showing initiative' mean in the context of engineering maintenance?",
    options: [
      "Doing whatever you want without asking",
      "Identifying potential problems or improvements proactively and taking appropriate action — such as reporting hazards, suggesting efficiency improvements, or addressing issues before they become critical — while working within your level of authority",
      "Only doing what you are specifically told to do",
      "Working faster than everyone else"
    ],
    correctIndex: 1,
    explanation: "Initiative means being proactive rather than reactive. It is about noticing things that need attention (potential faults, safety hazards, efficiency improvements) and taking appropriate action. Crucially, 'appropriate action' means working within your authority — reporting to a supervisor when the issue is beyond your competence, not attempting work you are not qualified for."
  },
  {
    id: "problem-approach",
    question: "When faced with an unfamiliar fault on a piece of equipment, the best approach is:",
    options: [
      "Keep trying random things until something works",
      "Apply a structured diagnostic approach: gather information about the symptoms, consult technical documentation, form a hypothesis, test it methodically, and escalate if the fault is beyond your competence",
      "Immediately call the manufacturer",
      "Tell your supervisor you cannot fix it and move on"
    ],
    correctIndex: 1,
    explanation: "Structured problem-solving is a core engineering skill. Even when facing an unfamiliar fault, applying a systematic approach — information gathering, documentation review, hypothesis formation, methodical testing — is far more effective than trial and error. Knowing when to escalate is also a sign of professional maturity, not weakness."
  },
  {
    id: "problem-escalate",
    question: "When should you escalate a problem to your supervisor rather than attempting to solve it yourself?",
    options: [
      "Never — always try to solve it yourself",
      "When the problem is beyond your current competence, involves safety risks you are not authorised to manage, requires specialist equipment or knowledge you do not have, or could have significant consequences if handled incorrectly",
      "Only when your supervisor asks",
      "Always — never try to solve problems independently"
    ],
    correctIndex: 1,
    explanation: "Knowing when to escalate is a professional skill, not a sign of weakness. You should escalate when: the work is beyond your competence level, there are safety implications you cannot manage, specialist knowledge or equipment is needed, or the consequences of getting it wrong are significant. The assessor values appropriate escalation as evidence of professional judgement."
  },
  {
    id: "problem-rootcause",
    question: "What is the main advantage of root cause analysis over simply fixing the immediate symptom?",
    options: [
      "Root cause analysis is faster",
      "Root cause analysis identifies and addresses the underlying reason for a problem, preventing it from recurring — whereas symptom treatment only fixes the immediate effect and the same fault is likely to happen again",
      "There is no advantage — just fix the symptom",
      "Root cause analysis is only for senior engineers"
    ],
    correctIndex: 1,
    explanation: "Symptom treatment fixes today's problem but leaves the underlying cause in place. Root cause analysis asks 'why did this happen?' and addresses the fundamental issue. For example, replacing a tripped breaker fixes the immediate fault, but investigating why it tripped (loose connection causing overheating) prevents recurrence. The EPA assessor values evidence that you think beyond the immediate fix."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Showing initiative in the workplace might include:",
    options: [
      "Ignoring problems that are not your responsibility",
      "Identifying a recurring fault pattern and reporting it to your supervisor with a suggestion for a permanent solution, or noticing a safety hazard and taking immediate appropriate action",
      "Only doing tasks that are on your job description",
      "Working overtime without being asked"
    ],
    correctAnswer: 1,
    explanation: "Initiative is demonstrated through proactive actions: spotting problems before they escalate, suggesting improvements based on your observations, reporting hazards without being asked, volunteering for tasks that will develop your skills, and contributing ideas during team discussions. These are all behaviours the EPA assessor looks for."
  },
  {
    id: 2,
    question: "A structured problem-solving approach for maintenance fault diagnosis typically follows:",
    options: [
      "No particular order",
      "Define the problem, gather information, identify possible causes, test each hypothesis systematically, implement the solution, verify the fix, and document the process",
      "Fix it and move on",
      "Call the manufacturer immediately"
    ],
    correctAnswer: 1,
    explanation: "Structured problem-solving follows a logical sequence: understand the problem (what are the symptoms? when did they start?), gather information (documentation, operating history), identify possible causes (most likely first), test systematically (one variable at a time), fix and verify, then document. This approach is more efficient and reliable than random troubleshooting."
  },
  {
    id: 3,
    question: "Root cause analysis differs from symptom treatment in that:",
    options: [
      "They are the same thing",
      "Root cause analysis identifies and addresses the underlying reason for a problem, preventing recurrence, while symptom treatment only addresses the immediate effect without preventing it from happening again",
      "Root cause analysis takes too long",
      "Symptom treatment is always better"
    ],
    correctAnswer: 1,
    explanation: "Symptom treatment fixes the immediate issue (e.g., resetting a tripped breaker) but does not prevent recurrence. Root cause analysis asks 'why did this happen?' and addresses the underlying cause (e.g., the breaker tripped because of a loose connection causing overheating). The EPA assessor values evidence of root cause thinking."
  },
  {
    id: 4,
    question: "When you identify a potential improvement to a maintenance procedure, you should:",
    options: [
      "Implement it immediately without telling anyone",
      "Document your observation and suggestion, discuss it with your supervisor or team, and follow your organisation's process for suggesting improvements",
      "Ignore it — procedures exist for a reason",
      "Only mention it if specifically asked"
    ],
    correctAnswer: 1,
    explanation: "Suggesting improvements demonstrates initiative and continuous improvement — both key EPA behaviours. However, changes to procedures must go through proper channels for safety and quality reasons. Document your observation, explain the benefit, and discuss it with your supervisor. If implemented, this becomes excellent portfolio evidence."
  },
  {
    id: 5,
    question: "Creative problem-solving in maintenance might involve:",
    options: [
      "Ignoring the problem",
      "Developing a temporary workaround to keep equipment running safely while a permanent solution is sourced, or adapting a standard approach to suit unusual site conditions",
      "Only using methods you have been specifically trained on",
      "Waiting for someone else to solve it"
    ],
    correctAnswer: 1,
    explanation: "Engineering maintenance often requires creative thinking: finding temporary but safe solutions to keep production running, adapting standard procedures for unusual situations, or using available resources when ideal tools or parts are not immediately available. The key is that any creative solution must still be safe and within your competence."
  },
  {
    id: 6,
    question: "When documenting a problem you solved for your portfolio, you should describe:",
    options: [
      "Only the solution",
      "The problem and its impact, your diagnostic approach, the options you considered, why you chose the solution you did, how you implemented it, and the outcome — including any follow-up actions",
      "Only that you fixed it",
      "Nothing — problem-solving does not need documenting"
    ],
    correctAnswer: 1,
    explanation: "Documenting the complete problem-solving journey is much more valuable than just recording the outcome. The assessor wants to see your thinking process: how you identified the problem, what diagnostic steps you took, what options you considered (and why you rejected some), how you implemented the solution, and what you learned."
  },
  {
    id: 7,
    question: "If your first attempt at solving a problem does not work, you should:",
    options: [
      "Give up and escalate immediately",
      "Reassess your diagnosis, consider what the failed attempt tells you about the problem, adjust your hypothesis, and try a different approach systematically — while knowing when to seek help",
      "Keep trying the same thing repeatedly",
      "Blame the equipment"
    ],
    correctAnswer: 1,
    explanation: "A failed attempt is not wasted — it provides information. If your first hypothesis was wrong, ask what the failed test tells you: which causes can you now eliminate? What new possibilities does it suggest? Adjust your approach systematically. However, if you are repeatedly unsuccessful or the situation is becoming risky, seeking help is the professional response."
  },
  {
    id: 8,
    question: "Taking initiative as an apprentice means:",
    options: [
      "Acting independently on everything",
      "Being proactive within your level of authority — asking questions, volunteering for learning opportunities, suggesting improvements, and taking appropriate action when you identify issues — while recognising when to seek guidance",
      "Waiting to be told what to do at all times",
      "Only showing initiative during the EPA"
    ],
    correctAnswer: 1,
    explanation: "Initiative as an apprentice is about being engaged and proactive within appropriate boundaries. Ask questions to deepen understanding, volunteer for tasks that develop your skills, suggest improvements when you see opportunities, and take action on issues within your competence. Recognise that your authority level increases as your competence grows."
  },
  {
    id: 9,
    question: "The '5 Whys' technique for root cause analysis involves:",
    options: [
      "Asking five different people their opinion",
      "Repeatedly asking 'why?' to drill down from the surface symptom to the underlying root cause — typically asking five times uncovers the true cause that needs addressing",
      "Waiting five minutes before starting work",
      "Checking five different components"
    ],
    correctAnswer: 1,
    explanation: "The '5 Whys' technique is a simple but effective root cause tool. Example: Motor tripped (why?) — overload (why?) — drawing excessive current (why?) — bearing seized (why?) — lack of lubrication (why?) — no planned maintenance schedule for that bearing. The root cause is the missing maintenance schedule, not the tripped motor."
  },
  {
    id: 10,
    question: "During the EPA, initiative and problem-solving are assessed through:",
    options: [
      "A written problem-solving test",
      "Evidence in your portfolio of problems you identified and solved, your diagnostic approach, improvements you suggested, and proactive actions you took — discussed in detail during the professional discussion and demonstrated during the practical observation",
      "They are not assessed",
      "A group exercise"
    ],
    correctAnswer: 1,
    explanation: "Initiative and problem-solving are assessed across all EPA components: your portfolio should contain evidence of diagnostic work and improvement suggestions, the practical observation tests your ability to work methodically and solve problems in real time, and the professional discussion explores your problem-solving approach in depth."
  },
  {
    id: 11,
    question: "When working as part of a team to solve a complex problem, showing initiative means:",
    options: [
      "Taking over and doing everything yourself",
      "Contributing ideas, sharing relevant knowledge, asking constructive questions, volunteering for tasks within your competence, and supporting the team's collective problem-solving effort",
      "Staying quiet and letting others solve it",
      "Only working on the parts you are comfortable with"
    ],
    correctAnswer: 1,
    explanation: "Team problem-solving requires collaborative initiative: contributing your perspective (you may notice something others miss), sharing relevant knowledge from your training or experience, asking questions that help clarify the problem, and taking on tasks that play to your strengths. Good teamwork and individual initiative are not opposites — they reinforce each other."
  },
  {
    id: 12,
    question: "A fishbone (Ishikawa) diagram is used in problem-solving to:",
    options: [
      "Draw pictures of fish",
      "Visually organise potential causes of a problem into categories (such as people, methods, machines, materials, environment and measurement), helping ensure all possible contributing factors are considered systematically",
      "Track the time taken to solve problems",
      "Document the final solution only"
    ],
    correctAnswer: 1,
    explanation: "The fishbone diagram is a structured brainstorming tool. By categorising potential causes, it ensures you consider all possible contributing factors rather than fixating on the first theory. Categories like people, methods, machines, materials, environment and measurement provide a framework for systematic investigation. It is a valuable tool to reference in your EPA portfolio."
  }
];

const faqs = [
  {
    question: "What if I show initiative and make a mistake?",
    answer: "Mistakes made in good faith while showing appropriate initiative are learning opportunities, not failures. The key is that you acted within your competence level and authority. If you make a mistake, own it, learn from it, and document what you learned. A reflective account describing a mistake and what you learned from it is actually excellent EPA evidence — it demonstrates self-awareness and professional growth."
  },
  {
    question: "How do I balance showing initiative with respecting my position as an apprentice?",
    answer: "Initiative does not mean overstepping your authority. As an apprentice, showing initiative might mean: reporting hazards proactively, suggesting improvements to your supervisor, volunteering for learning opportunities, asking thoughtful questions, and completing tasks to a higher standard than expected. Always check with your supervisor before taking action on anything beyond your normal responsibilities."
  },
  {
    question: "Can I include examples of initiative from college or training, not just workplace?",
    answer: "Workplace examples are strongest for the EPA, but college examples can supplement them. For instance, taking the lead on a group project, researching a topic beyond the curriculum, or helping fellow students with technical problems all demonstrate initiative. Include them in your portfolio but ensure the majority of your evidence comes from real workplace situations."
  },
  {
    question: "What counts as 'problem-solving' for the EPA if I mostly do routine maintenance?",
    answer: "Even routine maintenance involves problem-solving: diagnosing why a component has worn prematurely, deciding the best sequence for a multi-task shutdown, adapting your approach when you find unexpected conditions, or identifying a more efficient way to complete a regular task. Frame these everyday decisions as the problem-solving evidence they are."
  },
  {
    question: "How do I demonstrate initiative in my portfolio?",
    answer: "Include specific examples: 'I noticed the conveyor belt was showing early signs of misalignment and reported it before it caused a breakdown', 'I suggested relocating the isolation point to improve access and reduce shutdown time', 'I researched the fault code in the manufacturer's manual before calling for assistance'. Each example should describe the situation, what you noticed, what action you took, and the outcome."
  }
];

const MOETModule7Section4_4 = () => {
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
            <span>Module 7.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Initiative and Problem-Solving
          </h1>
          <p className="text-white/80">
            Developing proactive thinking and structured diagnostic approaches for professional engineering practice
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Initiative:</strong> Proactive action within your authority level</li>
              <li className="pl-1"><strong>Problem-solving:</strong> Structured, systematic diagnostic approach</li>
              <li className="pl-1"><strong>Root cause:</strong> Address underlying causes, not just symptoms</li>
              <li className="pl-1"><strong>Escalation:</strong> Know when to seek help — a professional skill</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>All components:</strong> Assessed in observation, discussion and portfolio</li>
              <li className="pl-1"><strong>Practical:</strong> How you approach unfamiliar problems</li>
              <li className="pl-1"><strong>Discussion:</strong> Describe your diagnostic reasoning</li>
              <li className="pl-1"><strong>ST1426:</strong> Core behaviour requirement for all grades</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply structured problem-solving techniques to engineering maintenance faults",
              "Demonstrate initiative appropriately within your level of authority and competence",
              "Conduct root cause analysis using techniques such as the 5 Whys",
              "Know when to escalate problems and how to do so professionally",
              "Document problem-solving activities as effective portfolio evidence",
              "Balance proactive action with appropriate consultation and teamwork"
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
            Understanding Initiative in Engineering
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Initiative in engineering maintenance is about being proactive — noticing what needs attention and
              taking appropriate action without being asked. It is one of the most valued professional behaviours
              because it distinguishes technicians who add value from those who simply follow instructions.
            </p>

            <p>
              The spectrum of initiative ranges from passive (only doing what you are told) to reckless (acting
              beyond your competence without consulting anyone). The professional sweet spot is in between:
              proactive, thoughtful action within your authority, with good judgement about when to act
              independently and when to consult.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Examples of Initiative in the Workplace</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hazard identification:</strong> Noticing and reporting a safety hazard before it causes an incident</li>
                <li className="pl-1"><strong>Preventive action:</strong> Identifying early warning signs of equipment failure and reporting them</li>
                <li className="pl-1"><strong>Process improvement:</strong> Suggesting a more efficient way to complete a maintenance task</li>
                <li className="pl-1"><strong>Self-development:</strong> Researching a technical topic to prepare for upcoming work</li>
                <li className="pl-1"><strong>Team support:</strong> Volunteering to help colleagues when you have capacity</li>
                <li className="pl-1"><strong>Documentation:</strong> Updating maintenance records without being specifically asked</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Initiative Has Boundaries</p>
              <p className="text-sm text-white">
                Initiative does not mean acting beyond your authority or competence. As an apprentice, you should
                take initiative within your level — report hazards rather than attempting to fix high-voltage
                issues alone, suggest improvements rather than implementing changes to safety-critical systems
                without approval. The assessor values appropriate initiative — acting professionally within your
                boundaries while being proactive within them.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Initiative is a spectrum: at one end is "only does what they are told,"
              at the other is "acts without thinking." The professional sweet spot is in between — proactive,
              thoughtful action within your authority, with good judgement about when to act and when to consult.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Structured Problem-Solving
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Engineering maintenance is fundamentally about solving problems — diagnosing faults, finding
              root causes, and implementing solutions. A structured approach is consistently more effective
              than trial and error, especially under pressure when clear thinking matters most.
            </p>

            <p>
              The structured approach works even when you have never seen the fault before. The process gives
              you a framework for approaching any problem logically, rather than relying solely on past
              experience. This is particularly important during the EPA practical observation, where you may
              face an unfamiliar scenario.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Diagnostic Problem-Solving Cycle</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Define the problem:</strong> What exactly is wrong? What are the symptoms? When did it start? What changed?</li>
                <li className="pl-1"><strong>2. Gather information:</strong> Check documentation, operating history, error codes, speak to operators</li>
                <li className="pl-1"><strong>3. Identify possible causes:</strong> List potential causes, starting with the most likely based on symptoms and experience</li>
                <li className="pl-1"><strong>4. Test systematically:</strong> Check one thing at a time, starting with the most likely cause. Record each test and result</li>
                <li className="pl-1"><strong>5. Implement the solution:</strong> Fix the identified cause using appropriate methods and materials</li>
                <li className="pl-1"><strong>6. Verify the fix:</strong> Test thoroughly to confirm the problem is resolved and no new issues are introduced</li>
                <li className="pl-1"><strong>7. Document:</strong> Record the fault, diagnosis, solution and any recommendations for preventing recurrence</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: Systematic Fault Diagnosis</h3>
              <p className="text-sm text-white mb-3">
                <strong>Scenario:</strong> A three-phase motor on a conveyor system trips intermittently on overload.
              </p>
              <ul className="text-sm text-white space-y-2 list-none">
                <li><strong>Step 1 — Define:</strong> Motor trips on overload relay 2-3 times per shift. No pattern to timing.</li>
                <li><strong>Step 2 — Gather:</strong> Check maintenance history (no recent work), operator reports (belt seems to slow before trip), motor nameplate data.</li>
                <li><strong>Step 3 — Possible causes:</strong> Overloaded belt, bearing failure, supply voltage issue, incorrect overload setting, loose connections.</li>
                <li><strong>Step 4 — Test:</strong> Check current draw (slightly above rated), check bearing temperature (elevated on drive end), check connections (all tight), check overload setting (correct).</li>
                <li><strong>Step 5 — Implement:</strong> Replace drive-end bearing.</li>
                <li><strong>Step 6 — Verify:</strong> Run motor on load — current draw now normal, no overheating, no trips after 4 hours.</li>
                <li><strong>Step 7 — Document:</strong> Record in CMMS, recommend adding bearing checks to PM schedule.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The structured approach works even when you have never seen the fault
              before. The process gives you a framework for approaching any problem logically, rather than
              relying solely on past experience.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Root Cause Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Root cause analysis goes beyond fixing the immediate symptom to understand why the problem
              occurred in the first place. This is what separates reactive maintenance (fixing things when
              they break) from proactive maintenance (preventing breakdowns by addressing underlying causes).
            </p>

            <p>
              Several tools exist for root cause analysis. The simplest and most commonly used in
              maintenance is the '5 Whys' technique, but other methods such as fishbone diagrams and
              fault tree analysis are also valuable for more complex problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 5 Whys Technique — Worked Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Question</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Problem</td>
                      <td className="border border-white/10 px-3 py-2">What happened?</td>
                      <td className="border border-white/10 px-3 py-2">Conveyor motor tripped on overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Why 1</td>
                      <td className="border border-white/10 px-3 py-2">Why did it trip?</td>
                      <td className="border border-white/10 px-3 py-2">Motor was drawing excessive current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Why 2</td>
                      <td className="border border-white/10 px-3 py-2">Why excessive current?</td>
                      <td className="border border-white/10 px-3 py-2">Drive-end bearing had seized</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Why 3</td>
                      <td className="border border-white/10 px-3 py-2">Why did the bearing seize?</td>
                      <td className="border border-white/10 px-3 py-2">No lubrication — grease had dried out</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Why 4</td>
                      <td className="border border-white/10 px-3 py-2">Why was there no lubrication?</td>
                      <td className="border border-white/10 px-3 py-2">Motor was not on the planned maintenance schedule</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Why 5</td>
                      <td className="border border-white/10 px-3 py-2">Why was it not on the PM schedule?</td>
                      <td className="border border-white/10 px-3 py-2">Installed during a modification and never added</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-white/70 mt-2">
                Root cause: Missing planned maintenance schedule entry. Fix: Add the motor to the PM schedule
                and audit for other equipment missing from the schedule.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Root cause analysis prevents recurrence. Replacing the bearing fixes
              today's problem; adding the motor to the PM schedule prevents the same failure happening again.
              The assessor values evidence that you think beyond the immediate fix.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Professional Escalation and Knowing Your Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional engineers know the boundaries of their competence and escalate appropriately.
              This is not a weakness — it is a critical safety behaviour and a sign of professional maturity.
              The EPA assessor values evidence of appropriate escalation just as much as evidence of
              independent problem-solving.
            </p>

            <p>
              Escalation is particularly important in electrical maintenance, where incorrect diagnosis or
              repair can create serious safety hazards. Working beyond your competence is not initiative —
              it is recklessness. Knowing when to say "this is beyond my current ability and I need to
              involve someone more experienced" demonstrates exactly the professional judgement the
              assessor is looking for.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Escalate</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Beyond competence:</strong> The fault involves systems or technologies you are not trained on</li>
                <li className="pl-1"><strong>Safety implications:</strong> The situation involves risks that require a more experienced person to manage</li>
                <li className="pl-1"><strong>Specialist requirement:</strong> The repair needs specialist equipment, knowledge or authorisation</li>
                <li className="pl-1"><strong>High consequences:</strong> Getting the diagnosis or repair wrong could cause significant damage, injury or cost</li>
                <li className="pl-1"><strong>Repeated failure:</strong> Your systematic approach has not resolved the issue after reasonable attempts</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How to Escalate Professionally</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Describe what you have already tried and the results</li>
                <li className="pl-1">Explain why you believe escalation is appropriate</li>
                <li className="pl-1">Provide all relevant information: symptoms, test results, documentation</li>
                <li className="pl-1">Suggest what you think the problem might be (your best hypothesis)</li>
                <li className="pl-1">Ask how you can assist or learn from the escalated resolution</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Professional escalation is not "I cannot do this — you deal with it."
              It is "I have investigated this systematically, here is what I have found, here is why I believe
              specialist input is needed, and here is how I can help." That is a professional communication,
              not an admission of failure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Evidencing Initiative and Problem-Solving in the EPA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Initiative and problem-solving are assessed across all three EPA components. During the
              practical observation, the assessor watches how you approach problems in real time. In your
              portfolio, they look for evidence of diagnostic work, improvements suggested, and appropriate
              escalation. In the professional discussion, they explore your reasoning and decision-making
              in depth.
            </p>

            <p>
              The strongest portfolio evidence tells a complete story: the situation, your thinking process,
              the actions you took, the outcome, and what you learned. A single detailed account of a
              well-handled problem is worth more than a dozen brief mentions of tasks completed.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Strong Portfolio Evidence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Describe the situation:</strong> What was the problem? What were the symptoms? What was the impact?</li>
                <li className="pl-1"><strong>Explain your approach:</strong> How did you investigate? What information did you gather? What hypotheses did you form?</li>
                <li className="pl-1"><strong>Detail your actions:</strong> What did you test? What did you try? Why did you choose that approach?</li>
                <li className="pl-1"><strong>Record the outcome:</strong> Was the problem solved? What was the root cause? Were there follow-up actions?</li>
                <li className="pl-1"><strong>Reflect on learning:</strong> What did you learn? What would you do differently? How has this improved your skills?</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Portfolio Example Format</p>
              <p className="text-sm text-white">
                "During a routine inspection, I noticed unusual vibration on the extract fan motor (initiative —
                identifying a problem proactively). I checked the bearing temperature (elevated) and current
                draw (slightly above rated), consulted the maintenance history (no recent bearing replacement),
                and reported my findings to my supervisor with a recommendation to schedule a bearing
                replacement before failure (structured problem-solving and appropriate communication). The
                replacement was scheduled and completed during the next planned shutdown, preventing an
                unplanned breakdown (positive outcome). I learned the value of using all available
                diagnostic indicators together, not just relying on one measurement (reflection)."
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Initiative and problem-solving are assessed across all three EPA
              components. The assessor is looking for evidence of genuine professional thinking — not just
              following procedures, but understanding why you do what you do and being proactive about
              identifying and addressing issues.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">Initiative means proactive action within your authority — not reckless behaviour</li>
              <li className="pl-1">Follow the diagnostic cycle: define, gather, hypothesise, test, fix, verify, document</li>
              <li className="pl-1">Use the 5 Whys or fishbone diagram to find root causes, not just symptoms</li>
              <li className="pl-1">Escalate professionally when problems exceed your competence or involve safety risks</li>
              <li className="pl-1">A failed test is not a failed attempt — it gives you information to refine your diagnosis</li>
              <li className="pl-1">Document the complete problem-solving journey for your portfolio, not just the outcome</li>
              <li className="pl-1">Creative solutions are valued but must always remain safe and within competence</li>
            </ul>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Initiative and Problem-Solving"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Time Management
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-5">
              Next: Professional Conduct
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section4_4;
