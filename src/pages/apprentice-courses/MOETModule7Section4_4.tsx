/**
 * MOET · Module 7 · Section 4 · Subsection 4 — Initiative and Problem-Solving
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. These statements are reused from the ST1426 list already
 * verified for Module 4 (they describe general problem-solving competence,
 * not a single module), matched here by topic to this page's content:
 *   Knowledge  · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *              · "Continuous improvement (CI) systems and techniques."
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

const TITLE = 'Initiative and Problem-Solving - MOET Module 7 Section 4.4';
const DESCRIPTION =
  'Developing initiative and structured problem-solving skills for the engineering workplace and EPA: identifying problems, proposing solutions, taking appropriate action and demonstrating professional resourcefulness under ST1426.';

const quickCheckQuestions = [
  {
    id: 'initiative-meaning',
    question: "What does 'showing initiative' mean in the context of engineering maintenance?",
    options: [
      'Waiting to be told exactly what to do before taking any action at all',
      'Spotting problems or improvements proactively and acting within your authority',
      'Attempting any repair yourself, regardless of whether it is within your competence',
      'Always deferring every decision to a supervisor to avoid making a mistake',
    ],
    correctIndex: 1,
    explanation:
      "Initiative means being proactive rather than reactive. It is about noticing things that need attention (potential faults, safety hazards, efficiency improvements) and taking appropriate action. Crucially, 'appropriate action' means working within your authority — reporting to a supervisor when the issue is beyond your competence, not attempting work you are not qualified for.",
  },
  {
    id: 'problem-approach',
    question: 'When faced with an unfamiliar fault on a piece of equipment, the best approach is:',
    options: [
      'Replace components one at a time by trial and error until it works',
      'Guess the most likely cause and act on it without gathering information',
      'Leave the fault for a more experienced colleague without investigating',
      'Gather the symptoms, check the documentation, form and test a hypothesis, and escalate if needed',
    ],
    correctIndex: 3,
    explanation:
      'Structured problem-solving is a core engineering skill. Even when facing an unfamiliar fault, applying a systematic approach — information gathering, documentation review, hypothesis formation, methodical testing — is far more effective than trial and error. Knowing when to escalate is also a sign of professional maturity, not weakness.',
  },
  {
    id: 'problem-escalate',
    question:
      'When should you escalate a problem to your supervisor rather than attempting to solve it yourself?',
    options: [
      'When it is beyond your competence, carries safety risks, or needs specialist knowledge',
      'Only after you have already attempted the repair and made the fault worse',
      'Never — an apprentice should always solve every problem independently',
      'Only when the supervisor specifically asks you to report your progress',
    ],
    correctIndex: 0,
    explanation:
      'Knowing when to escalate is a professional skill, not a sign of weakness. You should escalate when: the work is beyond your competence level, there are safety implications you cannot manage, specialist knowledge or equipment is needed, or the consequences of getting it wrong are significant. The assessor values appropriate escalation as evidence of professional judgement.',
  },
  {
    id: 'problem-rootcause',
    question:
      'What is the main advantage of root cause analysis over simply fixing the immediate symptom?',
    options: [
      'It is always faster than simply replacing the failed component',
      'It removes the need to verify that the repair was successful',
      'It addresses the underlying cause to prevent recurrence, not just the immediate effect',
      'It allows the technician to skip documenting the fault entirely',
    ],
    correctIndex: 2,
    explanation:
      "Symptom treatment fixes today's problem but leaves the underlying cause in place. Root cause analysis asks 'why did this happen?' and addresses the fundamental issue. For example, replacing a tripped breaker fixes the immediate fault, but investigating why it tripped (loose connection causing overheating) prevents recurrence. The EPA assessor values evidence that you think beyond the immediate fix.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Showing initiative in the workplace might include:',
    options: [
      'Waiting for written instructions before reporting any fault you observe',
      'Reporting a recurring fault with a suggested fix, or acting promptly on a safety hazard',
      'Carrying out repairs on systems you have not yet been trained to work on',
      'Ignoring minor issues until they develop into a full breakdown',
    ],
    correctAnswer: 1,
    explanation:
      'Initiative is demonstrated through proactive actions: spotting problems before they escalate, suggesting improvements based on your observations, reporting hazards without being asked, volunteering for tasks that will develop your skills, and contributing ideas during team discussions. These are all behaviours the EPA assessor looks for.',
  },
  {
    id: 2,
    question:
      'A structured problem-solving approach for maintenance fault diagnosis typically follows:',
    options: [
      'Replace the most accessible component first, then work outwards by trial and error',
      'Wait for the fault to recur so more symptoms can be observed before acting',
      'Define the problem, gather information, test each likely cause, fix, verify, and document',
      'Energise the equipment repeatedly until the fault clears on its own',
    ],
    correctAnswer: 2,
    explanation:
      'Structured problem-solving follows a logical sequence: understand the problem (what are the symptoms? when did they start?), gather information (documentation, operating history), identify possible causes (most likely first), test systematically (one variable at a time), fix and verify, then document. This approach is more efficient and reliable than random troubleshooting.',
  },
  {
    id: 3,
    question: 'Root cause analysis differs from symptom treatment in that:',
    options: [
      'Root cause analysis is always quicker because it skips the diagnostic stage',
      'Root cause analysis only applies to mechanical faults, not electrical ones',
      'Root cause analysis avoids the need to repair the immediate fault at all',
      'It addresses the underlying cause to prevent recurrence, not just the immediate effect',
    ],
    correctAnswer: 3,
    explanation:
      "Symptom treatment fixes the immediate issue (e.g., resetting a tripped breaker) but does not prevent recurrence. Root cause analysis asks 'why did this happen?' and addresses the underlying cause (e.g., the breaker tripped because of a loose connection causing overheating). The EPA assessor values evidence of root cause thinking.",
  },
  {
    id: 4,
    question: 'When you identify a potential improvement to a maintenance procedure, you should:',
    options: [
      "Document the suggestion and raise it through your organisation's improvement process",
      'Implement the change yourself immediately without telling anyone',
      'Keep the idea to yourself in case it turns out to be wrong',
      'Wait until your end-point assessment to mention it for the first time',
    ],
    correctAnswer: 0,
    explanation:
      'Suggesting improvements demonstrates initiative and continuous improvement — both key EPA behaviours. However, changes to procedures must go through proper channels for safety and quality reasons. Document your observation, explain the benefit, and discuss it with your supervisor. If implemented, this becomes excellent portfolio evidence.',
  },
  {
    id: 5,
    question: 'Creative problem-solving in maintenance might involve:',
    options: [
      'Bypassing a safety interlock to keep production running during a fault',
      'Devising a safe temporary workaround while a permanent fix is sourced',
      'Ignoring the manufacturer documentation in favour of personal preference',
      'Using whatever part is nearest to hand regardless of its specification',
    ],
    correctAnswer: 1,
    explanation:
      'Engineering maintenance often requires creative thinking: finding temporary but safe solutions to keep production running, adapting standard procedures for unusual situations, or using available resources when ideal tools or parts are not immediately available. The key is that any creative solution must still be safe and within your competence.',
  },
  {
    id: 6,
    question: 'When documenting a problem you solved for your portfolio, you should describe:',
    options: [
      'Only the final outcome, since the assessor is not interested in your method',
      'Just the time it took you, so the assessor can judge your speed',
      'The problem, your diagnostic approach, the options considered, the fix, and the outcome',
      'A brief note that the equipment is now working, with no further detail',
    ],
    correctAnswer: 2,
    explanation:
      'Documenting the complete problem-solving journey is much more valuable than just recording the outcome. The assessor wants to see your thinking process: how you identified the problem, what diagnostic steps you took, what options you considered (and why you rejected some), how you implemented the solution, and what you learned.',
  },
  {
    id: 7,
    question: 'If your first attempt at solving a problem does not work, you should:',
    options: [
      'Repeat exactly the same action several more times in case it eventually works',
      'Abandon the systematic method and start swapping components to see what helps',
      'Assume the equipment is beyond repair and recommend replacement',
      'Reassess the diagnosis, adjust your hypothesis, and try a different approach',
    ],
    correctAnswer: 3,
    explanation:
      'A failed attempt is not wasted — it provides information. If your first hypothesis was wrong, ask what the failed test tells you: which causes can you now eliminate? What new possibilities does it suggest? Adjust your approach systematically. However, if you are repeatedly unsuccessful or the situation is becoming risky, seeking help is the professional response.',
  },
  {
    id: 8,
    question: 'Taking initiative as an apprentice means:',
    options: [
      'Being proactive within your authority and recognising when to seek guidance',
      'Taking on any task, including work beyond your training, to prove yourself',
      'Making changes to safety-critical systems without seeking approval first',
      'Avoiding questions so that you appear to already know everything',
    ],
    correctAnswer: 0,
    explanation:
      'Initiative as an apprentice is about being engaged and proactive within appropriate boundaries. Ask questions to deepen understanding, volunteer for tasks that develop your skills, suggest improvements when you see opportunities, and take action on issues within your competence. Recognise that your authority level increases as your competence grows.',
  },
  {
    id: 9,
    question: "The '5 Whys' technique for root cause analysis involves:",
    options: [
      'Asking five different colleagues for their opinion on the likely cause',
      "Repeatedly asking 'why?' to drill down from the symptom to the underlying cause",
      'Testing five possible components in turn until the faulty one is found',
      'Listing the five most expensive parts and replacing them in order',
    ],
    correctAnswer: 1,
    explanation:
      "The '5 Whys' technique is a simple but effective root cause tool. Example: Motor tripped (why?) — overload (why?) — drawing excessive current (why?) — bearing seized (why?) — lack of lubrication (why?) — no planned maintenance schedule for that bearing. The root cause is the missing maintenance schedule, not the tripped motor.",
  },
  {
    id: 10,
    question: 'During the EPA, initiative and problem-solving are assessed through:',
    options: [
      'A single written multiple-choice examination at the end of the programme',
      'An interview with your employer rather than an independent assessor',
      'Portfolio evidence of problems you solved, explored in the professional discussion and observation',
      'A peer review carried out by other apprentices on the same course',
    ],
    correctAnswer: 2,
    explanation:
      'Initiative and problem-solving are assessed across all EPA components: your portfolio should contain evidence of diagnostic work and improvement suggestions, the practical observation tests your ability to work methodically and solve problems in real time, and the professional discussion explores your problem-solving approach in depth.',
  },
  {
    id: 11,
    question:
      'When working as part of a team to solve a complex problem, showing initiative means:',
    options: [
      'Taking over the whole task yourself so the team does not slow you down',
      'Staying silent so as not to challenge more experienced colleagues',
      'Waiting to be assigned a specific task before contributing anything',
      'Contributing ideas, sharing knowledge, and volunteering for tasks within your competence',
    ],
    correctAnswer: 3,
    explanation:
      'Team problem-solving requires collaborative initiative: contributing your perspective (you may notice something others miss), sharing relevant knowledge from your training or experience, asking questions that help clarify the problem, and taking on tasks that play to your strengths. Good teamwork and individual initiative are not opposites — they reinforce each other.',
  },
  {
    id: 12,
    question: 'A fishbone (Ishikawa) diagram is used in problem-solving to:',
    options: [
      'Organise potential causes into categories so all contributing factors are considered',
      'Calculate the probable cost of repairing each component that has failed',
      'Schedule the sequence of planned maintenance tasks across the year',
      'Record the step-by-step repair instructions for a confirmed fault',
    ],
    correctAnswer: 0,
    explanation:
      'The fishbone diagram is a structured brainstorming tool. By categorising potential causes, it ensures you consider all possible contributing factors rather than fixating on the first theory. Categories like people, methods, machines, materials, environment and measurement provide a framework for systematic investigation. It is a valuable tool to reference in your EPA portfolio.',
  },
];

const faqs = [
  {
    question: 'What if I show initiative and make a mistake?',
    answer:
      'Mistakes made in good faith while showing appropriate initiative are learning opportunities, not failures. The key is that you acted within your competence level and authority. If you make a mistake, own it, learn from it, and document what you learned. A reflective account describing a mistake and what you learned from it is actually excellent EPA evidence — it demonstrates self-awareness and professional growth.',
  },
  {
    question: 'How do I balance showing initiative with respecting my position as an apprentice?',
    answer:
      'Initiative does not mean overstepping your authority. As an apprentice, showing initiative might mean: reporting hazards proactively, suggesting improvements to your supervisor, volunteering for learning opportunities, asking thoughtful questions, and completing tasks to a higher standard than expected. Always check with your supervisor before taking action on anything beyond your normal responsibilities.',
  },
  {
    question: 'Can I include examples of initiative from college or training, not just workplace?',
    answer:
      'Workplace examples are strongest for the EPA, but college examples can supplement them. For instance, taking the lead on a group project, researching a topic beyond the curriculum, or helping fellow students with technical problems all demonstrate initiative. Include them in your portfolio but ensure the majority of your evidence comes from real workplace situations.',
  },
  {
    question: "What counts as 'problem-solving' for the EPA if I mostly do routine maintenance?",
    answer:
      'Even routine maintenance involves problem-solving: diagnosing why a component has worn prematurely, deciding the best sequence for a multi-task shutdown, adapting your approach when you find unexpected conditions, or identifying a more efficient way to complete a regular task. Frame these everyday decisions as the problem-solving evidence they are.',
  },
  {
    question: 'How do I demonstrate initiative in my portfolio?',
    answer:
      "Include specific examples: 'I noticed the conveyor belt was showing early signs of misalignment and reported it before it caused a breakdown', 'I suggested relocating the isolation point to improve access and reduce shutdown time', 'I researched the fault code in the manufacturer's manual before calling for assistance'. Each example should describe the situation, what you noticed, what action you took, and the outcome.",
  },
];

const MOETModule7Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.4 · Subsection 4"
        title="Initiative and Problem-Solving"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Developing proactive thinking and structured diagnostic approaches for professional
            engineering practice.
          </p>

          <TLDR
            points={[
              'Initiative: Proactive action within your authority level.',
              'Problem-solving: Structured, systematic diagnostic approach.',
              'Root cause: Address underlying causes, not just symptoms.',
              'Escalation: Know when to seek help — a professional skill.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply structured problem-solving techniques to engineering maintenance faults',
              'Demonstrate initiative appropriately within your level of authority and competence',
              'Conduct root cause analysis using techniques such as the 5 Whys',
              'Know when to escalate problems and how to do so professionally',
              'Document problem-solving activities as effective portfolio evidence',
              'Balance proactive action with appropriate consultation and teamwork',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>All components:</strong> assessed in observation, discussion and portfolio.
              </li>
              <li>
                <strong>Practical:</strong> how you approach unfamiliar problems.
              </li>
              <li>
                <strong>Discussion:</strong> describe your diagnostic reasoning.
              </li>
              <li>
                <strong>ST1426:</strong> core behaviour requirement for all grades.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding initiative in engineering</ContentEyebrow>

          <ConceptBlock title="A spectrum between passive and reckless">
            <p>
              Initiative in engineering maintenance is about being proactive — noticing what needs
              attention and taking appropriate action without being asked. It is one of the most
              valued professional behaviours because it distinguishes technicians who add value from
              those who simply follow instructions.
            </p>
            <p>
              The spectrum of initiative ranges from passive (only doing what you are told) to
              reckless (acting beyond your competence without consulting anyone). The professional
              sweet spot is in between: proactive, thoughtful action within your authority, with
              good judgement about when to act independently and when to consult.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Examples of initiative in the workplace"
            onSite="Initiative is a spectrum: at one end is 'only does what they are told,' at the other is 'acts without thinking.' The professional sweet spot is in between — proactive, thoughtful action within your authority, with good judgement about when to act and when to consult."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard identification:</strong> noticing and reporting a safety hazard
                before it causes an incident.
              </li>
              <li>
                <strong>Preventive action:</strong> identifying early warning signs of equipment
                failure and reporting them.
              </li>
              <li>
                <strong>Process improvement:</strong> suggesting a more efficient way to complete a
                maintenance task.
              </li>
              <li>
                <strong>Self-development:</strong> researching a technical topic to prepare for
                upcoming work.
              </li>
              <li>
                <strong>Team support:</strong> volunteering to help colleagues when you have
                capacity.
              </li>
              <li>
                <strong>Documentation:</strong> updating maintenance records without being
                specifically asked.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Initiative has boundaries"
            whatHappens={
              <>
                Initiative does not mean acting beyond your authority or competence. Attempting to
                fix a high-voltage issue alone as an apprentice, or implementing a change to a
                safety-critical system without approval, is not initiative — it is recklessness.
              </>
            }
            doInstead={
              <>
                As an apprentice, take initiative within your level — report hazards rather than
                attempting to fix high-voltage issues alone, suggest improvements rather than
                implementing changes to safety-critical systems without approval. The assessor
                values appropriate initiative — acting professionally within your boundaries while
                being proactive within them.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Structured problem-solving</ContentEyebrow>

          <ConceptBlock title="A framework for approaching any problem logically">
            <p>
              Engineering maintenance is fundamentally about solving problems — diagnosing faults,
              finding root causes, and implementing solutions. A structured approach is consistently
              more effective than trial and error, especially under pressure when clear thinking
              matters most.
            </p>
            <p>
              The structured approach works even when you have never seen the fault before. The
              process gives you a framework for approaching any problem logically, rather than
              relying solely on past experience. This is particularly important during the EPA
              practical observation, where you may face an unfamiliar scenario.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The diagnostic problem-solving cycle">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Define the problem:</strong> what exactly is wrong? What are the
                symptoms? When did it start? What changed?
              </li>
              <li>
                <strong>2. Gather information:</strong> check documentation, operating history,
                error codes, speak to operators.
              </li>
              <li>
                <strong>3. Identify possible causes:</strong> list potential causes, starting with
                the most likely based on symptoms and experience.
              </li>
              <li>
                <strong>4. Test systematically:</strong> check one thing at a time, starting with
                the most likely cause. Record each test and result.
              </li>
              <li>
                <strong>5. Implement the solution:</strong> fix the identified cause using
                appropriate methods and materials.
              </li>
              <li>
                <strong>6. Verify the fix:</strong> test thoroughly to confirm the problem is
                resolved and no new issues are introduced.
              </li>
              <li>
                <strong>7. Document:</strong> record the fault, diagnosis, solution and any
                recommendations for preventing recurrence.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Systematic fault diagnosis"
            situation={
              <p>
                A three-phase motor on a conveyor system trips intermittently on overload. The motor
                trips on overload relay 2-3 times per shift, with no pattern to the timing.
              </p>
            }
            whatToDo={
              <>
                <p>
                  <strong>Gather:</strong> check maintenance history (no recent work), operator
                  reports (belt seems to slow before trip), motor nameplate data.
                </p>
                <p>
                  <strong>Possible causes:</strong> overloaded belt, bearing failure, supply voltage
                  issue, incorrect overload setting, loose connections.
                </p>
                <p>
                  <strong>Test:</strong> check current draw (slightly above rated), check bearing
                  temperature (elevated on drive end), check connections (all tight), check overload
                  setting (correct).
                </p>
                <p>
                  <strong>Implement:</strong> replace drive-end bearing.
                </p>
                <p>
                  <strong>Verify:</strong> run motor on load — current draw now normal, no
                  overheating, no trips after 4 hours.
                </p>
                <p>
                  <strong>Document:</strong> record in CMMS, recommend adding bearing checks to PM
                  schedule.
                </p>
              </>
            }
            whyItMatters={
              <>
                The structured approach works even when you have never seen the fault before. The
                process gives you a framework for approaching any problem logically, rather than
                relying solely on past experience.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Root cause analysis</ContentEyebrow>

          <ConceptBlock title="What separates reactive from proactive maintenance">
            <p>
              Root cause analysis goes beyond fixing the immediate symptom to understand why the
              problem occurred in the first place. This is what separates reactive maintenance
              (fixing things when they break) from proactive maintenance (preventing breakdowns by
              addressing underlying causes).
            </p>
            <p>
              Several tools exist for root cause analysis. The simplest and most commonly used in
              maintenance is the &apos;5 Whys&apos; technique, but other methods such as fishbone
              diagrams and fault tree analysis are also valuable for more complex problems.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The 5 Whys technique — worked example"
            onSite="Root cause analysis prevents recurrence. Replacing the bearing fixes today's problem; adding the motor to the PM schedule prevents the same failure happening again. The assessor values evidence that you think beyond the immediate fix."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Step</th>
                    <th className="py-2 pr-4 font-medium text-white">Question</th>
                    <th className="py-2 font-medium text-white">Answer</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Problem</td>
                    <td className="py-2 pr-4 align-top">What happened?</td>
                    <td className="py-2">Conveyor motor tripped on overload</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Why 1</td>
                    <td className="py-2 pr-4 align-top">Why did it trip?</td>
                    <td className="py-2">Motor was drawing excessive current</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Why 2</td>
                    <td className="py-2 pr-4 align-top">Why excessive current?</td>
                    <td className="py-2">Drive-end bearing had seized</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Why 3</td>
                    <td className="py-2 pr-4 align-top">Why did the bearing seize?</td>
                    <td className="py-2">No lubrication — grease had dried out</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Why 4</td>
                    <td className="py-2 pr-4 align-top">Why was there no lubrication?</td>
                    <td className="py-2">Motor was not on the planned maintenance schedule</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Why 5</td>
                    <td className="py-2 pr-4 align-top">Why was it not on the PM schedule?</td>
                    <td className="py-2">Installed during a modification and never added</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Root cause: missing planned maintenance schedule entry. Fix: add the motor to the PM
              schedule and audit for other equipment missing from the schedule.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Professional escalation and knowing your limits</ContentEyebrow>

          <ConceptBlock title="A critical safety behaviour, not a weakness">
            <p>
              Professional engineers know the boundaries of their competence and escalate
              appropriately. This is not a weakness — it is a critical safety behaviour and a sign
              of professional maturity. The EPA assessor values evidence of appropriate escalation
              just as much as evidence of independent problem-solving.
            </p>
            <p>
              Escalation is particularly important in electrical maintenance, where incorrect
              diagnosis or repair can create serious safety hazards. Working beyond your competence
              is not initiative — it is recklessness. Knowing when to say &quot;this is beyond my
              current ability and I need to involve someone more experienced&quot; demonstrates
              exactly the professional judgement the assessor is looking for.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When to escalate">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Beyond competence:</strong> the fault involves systems or technologies you
                are not trained on.
              </li>
              <li>
                <strong>Safety implications:</strong> the situation involves risks that require a
                more experienced person to manage.
              </li>
              <li>
                <strong>Specialist requirement:</strong> the repair needs specialist equipment,
                knowledge or authorisation.
              </li>
              <li>
                <strong>High consequences:</strong> getting the diagnosis or repair wrong could
                cause significant damage, injury or cost.
              </li>
              <li>
                <strong>Repeated failure:</strong> your systematic approach has not resolved the
                issue after reasonable attempts.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="How to escalate professionally"
            onSite="Professional escalation is not 'I cannot do this — you deal with it.' It is 'I have investigated this systematically, here is what I have found, here is why I believe specialist input is needed, and here is how I can help.' That is a professional communication, not an admission of failure."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Describe what you have already tried and the results.</li>
              <li>Explain why you believe escalation is appropriate.</li>
              <li>Provide all relevant information: symptoms, test results, documentation.</li>
              <li>Suggest what you think the problem might be (your best hypothesis).</li>
              <li>Ask how you can assist or learn from the escalated resolution.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Evidencing initiative and problem-solving in the EPA</ContentEyebrow>

          <ConceptBlock title="Tell the complete story, not just the outcome">
            <p>
              Initiative and problem-solving are assessed across all three EPA components. During
              the practical observation, the assessor watches how you approach problems in real
              time. In your portfolio, they look for evidence of diagnostic work, improvements
              suggested, and appropriate escalation. In the professional discussion, they explore
              your reasoning and decision-making in depth.
            </p>
            <p>
              The strongest portfolio evidence tells a complete story: the situation, your thinking
              process, the actions you took, the outcome, and what you learned. A single detailed
              account of a well-handled problem is worth more than a dozen brief mentions of tasks
              completed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building strong portfolio evidence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Describe the situation:</strong> what was the problem? What were the
                symptoms? What was the impact?
              </li>
              <li>
                <strong>Explain your approach:</strong> how did you investigate? What information
                did you gather? What hypotheses did you form?
              </li>
              <li>
                <strong>Detail your actions:</strong> what did you test? What did you try? Why did
                you choose that approach?
              </li>
              <li>
                <strong>Record the outcome:</strong> was the problem solved? What was the root
                cause? Were there follow-up actions?
              </li>
              <li>
                <strong>Reflect on learning:</strong> what did you learn? What would you do
                differently? How has this improved your skills?
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Portfolio example format"
            situation={
              <p>
                During a routine inspection, an apprentice noticed unusual vibration on the extract
                fan motor — initiative, identifying a problem proactively.
              </p>
            }
            whatToDo={
              <p>
                Check the bearing temperature (elevated) and current draw (slightly above rated),
                consult the maintenance history (no recent bearing replacement), and report the
                findings to the supervisor with a recommendation to schedule a bearing replacement
                before failure — structured problem-solving and appropriate communication.
              </p>
            }
            whyItMatters={
              <>
                The replacement was scheduled and completed during the next planned shutdown,
                preventing an unplanned breakdown — a positive outcome. The lesson: use all
                available diagnostic indicators together, not just relying on one measurement.
                Initiative and problem-solving are assessed across all three EPA components. The
                assessor is looking for evidence of genuine professional thinking — not just
                following procedures, but understanding why you do what you do and being proactive
                about identifying and addressing issues.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Initiative means proactive action within your authority — not reckless behaviour.',
              'Follow the diagnostic cycle: define, gather, hypothesise, test, fix, verify, document.',
              'Use the 5 Whys or fishbone diagram to find root causes, not just symptoms.',
              'Escalate professionally when problems exceed your competence or involve safety risks.',
              'A failed test is not a failed attempt — it gives you information to refine your diagnosis.',
              'Document the complete problem-solving journey for your portfolio, not just the outcome.',
              'Creative solutions are valued but must always remain safe and within competence.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Initiative and Problem-Solving"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section4-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Time Management
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section4-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Professional Conduct
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section4_4;
