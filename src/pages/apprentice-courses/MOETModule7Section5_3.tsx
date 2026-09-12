/**
 * MOET · Module 7 · Section 5 · Subsection 3 — Final Revision and Confidence Building
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs: this page describes exam/assessment preparation technique and mental
 * readiness for the EPA — study skills, not a knowledge, skill or behaviour
 * drawn from the standard's content. No KSB quote applies and none is
 * included.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Final Revision and Confidence Building - MOET Module 7 Section 5.3';
const DESCRIPTION =
  'Effective final revision strategies and confidence-building techniques for the EPA: structured revision planning, mock assessments, managing anxiety, portfolio review and mental preparation for assessment day under ST1426.';

const quickCheckQuestions = [
  {
    id: 'revision-strategy',
    question: 'What is the most effective approach to final revision before the EPA?',
    options: [
      'Reading every textbook from cover to cover to ensure no topic is missed',
      'Concentrating only on the areas you already feel most confident about',
      'Focused revision targeting the areas most likely to be assessed, using your portfolio as a guide',
      'Leaving all preparation until the final two days to keep the material fresh',
    ],
    correctIndex: 2,
    explanation:
      'Final revision should be focused, not comprehensive. You have been learning throughout your apprenticeship — the final revision period is about consolidating, refreshing and building confidence, not learning new material. Use your portfolio as your revision guide: review each piece of evidence, practise explaining it, and refresh the technical knowledge that underpins it.',
  },
  {
    id: 'revision-mock',
    question: 'Why are mock assessments valuable for EPA preparation?',
    options: [
      'They guarantee a pass in the real assessment if you score well in the mock',
      'They simulate real assessment conditions, helping you find weaknesses and build confidence through familiarity',
      'They replace the need for any further revision once completed successfully',
      'They are marked by the same assessor who will conduct your real EPA',
    ],
    correctIndex: 1,
    explanation:
      'Mock assessments are one of the most effective preparation tools. They help you: experience the format (reducing surprise on the day), identify areas where you struggle to explain your evidence (giving time to practise), build confidence through successful practice, and develop strategies for managing assessment anxiety.',
  },
  {
    id: 'revision-anxiety',
    question: 'Assessment anxiety before the EPA is:',
    options: [
      'A sign that you are not ready and should request that your EPA be postponed',
      'A normal response that most people experience — the key is managing it, not eliminating it',
      'Something that can only be removed by taking medication before the assessment',
      'A problem that affects only apprentices who have not prepared thoroughly',
    ],
    correctIndex: 1,
    explanation:
      'Assessment anxiety is normal and almost universal. Even experienced professionals feel nervous before important assessments. The key is management, not elimination: thorough preparation reduces uncertainty, familiar routines provide comfort, positive self-talk counters negative thoughts, and understanding that moderate anxiety actually sharpens focus can help reframe the experience.',
  },
  {
    id: 'revision-confidence',
    question: 'Genuine confidence for the EPA is built on:',
    options: [
      'Telling yourself repeatedly that you will pass, regardless of how prepared you are',
      'Comparing yourself favourably to other apprentices who seem less prepared',
      'Avoiding thinking about the assessment until the day itself arrives',
      'Three pillars: thorough preparation, positive evidence such as sign-off and a strong portfolio, and practice',
    ],
    correctIndex: 3,
    explanation:
      'Real confidence is not bravado — it is grounded in evidence. Your preparation has been thorough and structured. Your employer and training provider have signed off your readiness. You have qualifications, a portfolio full of evidence, and successful mock assessments behind you. These are facts, not feelings. Confidence built on evidence is resilient under pressure.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Effective final revision for the EPA should be:',
    options: [
      'Intensive cramming concentrated into the final two or three days',
      'Structured and focused — planned over several weeks and targeting your weaker areas',
      'Limited to re-reading your portfolio without any practical or discussion practice',
      'Focused entirely on the topics you already understand best',
    ],
    correctAnswer: 1,
    explanation:
      'A structured revision plan spread over 3-4 weeks is far more effective than last-minute cramming. Identify your weaker areas (through self-assessment and mock results), create a schedule that covers all EPA components, and mix knowledge revision with practical skills practice and discussion rehearsal.',
  },
  {
    id: 2,
    question: 'When revising for the professional discussion, the best approach is:',
    options: [
      'Writing out a word-for-word script and memorising it to recite on the day',
      'Memorising the assessment criteria so you can quote them back to the assessor',
      'Knowing your portfolio thoroughly, practising explaining each piece, and rehearsing with a mentor',
      'Preparing answers only for the topics you find most interesting',
    ],
    correctAnswer: 2,
    explanation:
      "The professional discussion is not a scripted presentation — it is a structured conversation. Prepare by knowing your portfolio inside out, practising explaining your evidence naturally (not from a script), anticipating probing questions ('Why did you choose that approach? What would you do differently?'), and rehearsing with someone who can provide constructive feedback.",
  },
  {
    id: 3,
    question: 'A revision plan for the EPA should include:',
    options: [
      'Knowledge revision only, since the practical and discussion cannot be prepared for',
      'A single intensive session covering everything the night before the assessment',
      'Whatever topics happen to come up during your normal working week',
      'Time for knowledge revision, practical practice, portfolio review, mocks and rest — balanced across all components',
    ],
    correctAnswer: 3,
    explanation:
      'A balanced revision plan covers all EPA components: knowledge (reviewing technical content), practical skills (refreshing safe isolation, testing, fault diagnosis), professional discussion (reviewing portfolio, practising explanations), and self-care (adequate rest, managing stress). Overloading any one area at the expense of others is counterproductive.',
  },
  {
    id: 4,
    question: 'Mock professional discussions help you to:',
    options: [
      'Practise articulating your experience, find gaps in explaining your evidence, and build confidence',
      'Memorise a fixed set of answers that the real assessor is certain to ask',
      'Avoid having to review your portfolio in detail before the real discussion',
      'Reduce the length of the real professional discussion on the day',
    ],
    correctAnswer: 0,
    explanation:
      'Mock discussions are invaluable because: you practise putting your knowledge and experience into words (harder than it sounds), you discover which evidence you struggle to explain clearly (giving time to prepare), you experience the probing style of assessment questions, and successful practice builds genuine confidence.',
  },
  {
    id: 5,
    question: 'When refreshing practical skills before the EPA, you should focus on:',
    options: [
      'Only the most advanced or unusual tasks you rarely carry out at work',
      'The core competences most likely to be assessed: safe isolation, fault diagnosis, testing and documentation',
      'Theory revision alone, as practical skills cannot be improved with practice',
      'Whichever tasks the assessor decides to set on the day, which cannot be anticipated',
    ],
    correctAnswer: 1,
    explanation:
      'Focus practical revision on the fundamentals: safe isolation (this will definitely be assessed), systematic fault diagnosis (the core skill), proper use of test equipment (insulation resistance, earth fault loop, RCD testing), component replacement techniques, and documentation. These are the skills the assessor will observe most closely.',
  },
  {
    id: 6,
    question: 'To manage assessment anxiety effectively, you should:',
    options: [
      'Stay awake the night before to fit in as much last-minute revision as possible',
      'Avoid all preparation so that the assessment feels less significant',
      'Prepare thoroughly, practise relaxation techniques, keep normal routines, and trust that you are ready',
      'Drink extra caffeine on the morning of the assessment to stay sharp',
    ],
    correctAnswer: 2,
    explanation:
      'Anxiety management combines preparation and mental strategies: thorough preparation reduces the fear of the unknown, relaxation techniques (breathing exercises, progressive muscle relaxation) calm physical symptoms, normal routines provide stability, positive visualisation builds confidence, and remembering that gateway sign-off means others believe you are ready provides reassurance.',
  },
  {
    id: 7,
    question: "A 'knowledge refresh' before the EPA should prioritise:",
    options: [
      'Obscure topics that are unlikely to appear but might catch you out',
      'Memorising regulation numbers without understanding their purpose',
      'Only the subjects covered in the most recent week of your training',
      'Key technical areas: safety legislation, relevant regulations, electrical principles and maintenance procedures',
    ],
    correctAnswer: 3,
    explanation:
      'Focus knowledge revision on: safety (always assessed), relevant regulations (BS 7671, EAWR, HASAWA), fundamental principles (how and why things work), maintenance techniques (the methods you use), and the technical knowledge behind your portfolio evidence (the assessor will probe this during discussion). Depth on these topics matters more than breadth on everything.',
  },
  {
    id: 8,
    question: 'Feedback from mock assessments should be:',
    options: [
      'Reviewed carefully, used to identify areas for improvement, and addressed through targeted practice',
      'Ignored if it is critical, since mocks do not count towards the final result',
      'Treated as the final verdict on whether you will pass or fail the EPA',
      'Set aside until after the real assessment so it does not undermine your confidence',
    ],
    correctAnswer: 0,
    explanation:
      'Mock assessment feedback is a gift — it shows you exactly where to focus your remaining preparation time. Review the feedback objectively: what went well (maintain it), what needs improvement (practise it), and what was missing (add it to your preparation). The purpose of mock assessment is to find weaknesses while there is still time to address them.',
  },
  {
    id: 9,
    question: 'In the final days before the EPA, you should:',
    options: [
      'Attempt to learn several entirely new topics you have not covered before',
      'Maintain a balanced routine — light review, brief practice, adequate sleep and relaxing activities',
      'Revise intensively through the night to make the most of the remaining time',
      'Stop all preparation completely and avoid thinking about the assessment',
    ],
    correctAnswer: 1,
    explanation:
      'The final days should be about consolidation and confidence, not intensive cramming. Light review of key topics, brief hands-on practice to keep skills fresh, and ensuring you are well-rested and mentally prepared are more effective than exhausting yourself. Your learning has happened over months — a few extra hours of cramming will not transform your competence.',
  },
  {
    id: 10,
    question: 'Positive self-talk before the EPA means:',
    options: [
      'Convincing yourself you will pass effortlessly without any preparation',
      'Ignoring any weaknesses and pretending you are fully expert in every area',
      'Replacing negative thoughts with realistic positive ones grounded in your preparation and sign-off',
      'Telling others you are certain to fail so expectations are kept low',
    ],
    correctAnswer: 2,
    explanation:
      "Positive self-talk is not about false confidence — it is about realistic reassurance. Replace catastrophic thinking ('I will freeze and forget everything') with evidence-based positivity ('I have completed the apprenticeship, been signed off by my employer and provider, prepared thoroughly, and know my evidence well'). These are facts, not delusions.",
  },
  {
    id: 11,
    question: 'If you identify a significant knowledge gap during final revision, you should:',
    options: [
      'Ignore it and hope the topic does not come up during the assessment',
      'Withdraw from the EPA and restart your apprenticeship from the beginning',
      'Plan to bluff your way through if the topic is raised in the discussion',
      'Focus targeted revision on that area, seek help from your provider or mentor, and be honest if asked about it',
    ],
    correctAnswer: 3,
    explanation:
      "A significant gap found during revision is stressful but addressable: focus your remaining revision time on that area, ask your training provider for a quick tutorial or resource, practise explaining the topic, and prepare an honest response if it comes up ('This is an area I have been developing in — here is what I understand and here is what I have been working on'). Honesty is more effective than bluffing.",
  },
  {
    id: 12,
    question: 'The most reliable source of confidence before the EPA is:',
    options: [
      'Thorough preparation, successful mocks, gateway sign-off, completed qualifications and a strong portfolio',
      'Reassurance from friends and family who are not involved in the assessment',
      'A general feeling of optimism on the morning of the assessment',
      'Believing that the assessor will go easy on you because you are nervous',
    ],
    correctAnswer: 0,
    explanation:
      'Confidence built on evidence is durable under pressure. Your preparation has been structured and thorough. Your mock assessments have shown you can perform under assessment conditions. Your employer and training provider have both confirmed your readiness. Your qualifications prove your academic ability. Your portfolio documents your workplace competence. These are facts. Trust them.',
  },
];

const faqs = [
  {
    question: 'How much time should I spend on final revision?',
    answer:
      'A structured revision plan over 3-4 weeks is ideal, dedicating 1-2 hours per day alongside your normal work. The final week should be lighter — consolidating rather than cramming. The total time depends on your starting confidence level, but remember: you have been learning for the entire apprenticeship. Final revision is about refreshing and consolidating, not learning from scratch.',
  },
  {
    question: 'Should I take time off work to revise for the EPA?',
    answer:
      'Some employers grant study leave before the EPA — ask your employer and training provider. Even a few days of focused preparation can be beneficial. However, continuing to work during the revision period is also valuable — it keeps your practical skills sharp and provides fresh examples for the professional discussion. A balance of both is ideal.',
  },
  {
    question: 'What if I blank on a question during the professional discussion?',
    answer:
      "This is common and not fatal. The assessor understands that nerves can affect recall. Take a breath, ask for the question to be repeated if needed, and try to relate it to a specific workplace experience. If you genuinely do not know the answer, be honest: 'I am not confident about that specific area, but based on my experience I would approach it by...' Trying to bluff is worse than honest uncertainty.",
  },
  {
    question: 'How can I practise the practical observation beforehand?',
    answer:
      'Ask your employer to arrange practice time with the type of equipment likely to be used in the observation. Practise your safe isolation procedure until it is second nature. Work through fault diagnosis scenarios systematically. If possible, have a colleague or supervisor observe you and provide feedback. Many training providers also offer practical mock assessments.',
  },
  {
    question: 'Is it normal to feel underprepared even after months of preparation?',
    answer:
      "Yes — this is extremely common and is known as 'imposter syndrome.' Most apprentices feel they should know more or be more prepared, even when they are well above the required standard. Trust the evidence: you have been signed off by both your employer and training provider, you have completed all the required qualifications, and you have a portfolio full of evidence of your competence. You are more ready than you think.",
  },
];

const MOETModule7Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.5 · Subsection 3"
        title="Final Revision and Confidence Building"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Structured preparation strategies and mental readiness techniques for EPA success.
          </p>

          <TLDR
            points={[
              'Plan: Structured revision over 3-4 weeks, not cramming.',
              'Focus: Target weak areas and high-probability topics.',
              'Practise: Mock discussions, practical run-throughs.',
              'Confidence: Trust your preparation and sign-off.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Create a structured revision plan covering all EPA components',
              'Use mock assessments effectively to identify and address weaknesses',
              'Manage assessment anxiety through preparation and mental strategies',
              'Review your portfolio to ensure you can discuss every piece of evidence confidently',
              'Refresh core practical skills for the observation component',
              'Build genuine confidence based on your preparation and competence',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="EPA assessment context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>All components:</strong> revise for observation, discussion and knowledge.
              </li>
              <li>
                <strong>Portfolio mastery:</strong> know every piece of evidence inside out.
              </li>
              <li>
                <strong>Practical:</strong> safe isolation and testing must be automatic.
              </li>
              <li>
                <strong>ST1426:</strong> focus on the KSBs most likely to be assessed.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Creating your revision plan</ContentEyebrow>

          <ConceptBlock title="Consolidating, not re-learning">
            <p>
              Effective revision is planned, structured and balanced. It covers all EPA components,
              prioritises your weaker areas, and includes both knowledge review and practical skills
              practice. Starting 3-4 weeks before the EPA gives you enough time without creating
              exhausting intensity.
            </p>
            <p>
              The biggest mistake apprentices make is treating revision as re-learning. You have
              spent months — often years — developing your knowledge, skills and behaviours. Final
              revision is about consolidating what you already know, refreshing areas that have
              become rusty, and building familiarity with the assessment format. It is not the time
              to learn entirely new material.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sample 4-week revision plan">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Week</th>
                    <th className="py-2 pr-4 font-medium text-white">Focus</th>
                    <th className="py-2 font-medium text-white">Activities</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Week 1</td>
                    <td className="py-2 pr-4 align-top">Self-assessment and planning</td>
                    <td className="py-2">
                      Review portfolio, identify weak areas, create detailed plan
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Week 2</td>
                    <td className="py-2 pr-4 align-top">Knowledge and practical focus</td>
                    <td className="py-2">
                      Technical revision, practical skills practice, first mock
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Week 3</td>
                    <td className="py-2 pr-4 align-top">Discussion and weak areas</td>
                    <td className="py-2">Mock discussion, address feedback, target weak areas</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Week 4</td>
                    <td className="py-2 pr-4 align-top">Consolidation and confidence</td>
                    <td className="py-2">
                      Light review, final portfolio check, rest and mental prep
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Revision plan principles"
            onSite="The revision plan is a guide, not a rigid schedule. If a mock assessment reveals a weakness, adjust the plan to spend more time on that area. Flexibility within structure is the key to effective preparation."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Start with self-assessment:</strong> before you can revise effectively, you
                need to know where your gaps are — review the KSBs, rate your confidence on each,
                and prioritise accordingly.
              </li>
              <li>
                <strong>Cover all components:</strong> do not just revise knowledge — include
                practical skills, portfolio review, and discussion practice in your plan.
              </li>
              <li>
                <strong>Prioritise weakness:</strong> spend more time on areas where you are less
                confident, not on topics you already know well.
              </li>
              <li>
                <strong>Build in rest:</strong> burnout before the EPA is counterproductive —
                include rest days and light sessions to maintain your energy.
              </li>
              <li>
                <strong>Track progress:</strong> note what you have covered, what improved after
                practice, and what still needs attention.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Avoid the cramming trap"
            whatHappens={
              <>
                Research consistently shows that massed practice (cramming everything into the final
                days) creates the illusion of familiarity without genuine understanding. You may
                recognise terms when you see them but struggle to explain them under pressure.
              </>
            }
            doInstead={
              <>
                Use distributed practice — spread your revision over weeks rather than massing it
                into the final days. Start early and revise regularly — your future self will thank
                you.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Mock assessments and practice</ContentEyebrow>

          <ConceptBlock title="The closest you can get to the real EPA">
            <p>
              Mock assessments are the closest you can get to the real EPA without the pressure.
              They help you experience the format, identify weak spots, and build familiarity with
              the process. Most training providers offer mock assessments — take every opportunity
              to participate.
            </p>
            <p>
              The value of mocks extends beyond simple practice. They expose you to the type of
              probing questions an assessor asks, help you manage your time during practical tasks,
              and — crucially — they prove to you that you can perform under assessment conditions.
              A successful mock is powerful evidence that you are ready.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Making the most of mock assessments"
            onSite="The purpose of mock assessment is to make the real thing feel familiar. The more you practise the format, the less nervous you will be on the day. Familiarity breeds confidence."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Treat them seriously:</strong> approach mock assessments as if they were the
                real thing — this develops good habits and realistic practice.
              </li>
              <li>
                <strong>Request feedback:</strong> ask for specific, constructive feedback — not
                just &quot;that was good&quot; but &quot;here is what you could improve&quot;.
              </li>
              <li>
                <strong>Act on feedback:</strong> identify the specific improvements suggested and
                practise them before the real assessment.
              </li>
              <li>
                <strong>Mock with different people:</strong> if possible, practise with different
                questioners — each will probe different areas and challenge you in different ways.
              </li>
              <li>
                <strong>Record yourself:</strong> if comfortable, record a mock discussion and
                review it — you will notice habits you were not aware of.
              </li>
              <li>
                <strong>Simulate real conditions:</strong> use the same time limits, the same type
                of environment, and the same rules as the real assessment.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Types of mock practice">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Mock type</th>
                    <th className="py-2 pr-4 font-medium text-white">What it develops</th>
                    <th className="py-2 font-medium text-white">How to arrange</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Mock practical observation</td>
                    <td className="py-2 pr-4 align-top">
                      Working method, safety habits, time management
                    </td>
                    <td className="py-2">Training provider or workplace supervisor</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Mock professional discussion</td>
                    <td className="py-2 pr-4 align-top">
                      Articulation, portfolio knowledge, handling questions
                    </td>
                    <td className="py-2">Training provider, mentor or colleague</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">Self-directed portfolio review</td>
                    <td className="py-2 pr-4 align-top">
                      Evidence familiarity, explanation fluency
                    </td>
                    <td className="py-2">Individual — talk through each piece aloud</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Peer practice</td>
                    <td className="py-2 pr-4 align-top">
                      Confidence, varied questioning, mutual support
                    </td>
                    <td className="py-2">Fellow apprentices preparing for EPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Managing assessment anxiety</ContentEyebrow>

          <ConceptBlock title="Manage it, do not try to eliminate it">
            <p>
              Assessment anxiety is a normal human response to being evaluated. Almost everyone
              experiences it to some degree. The goal is not to eliminate it but to manage it so
              that it helps rather than hinders your performance. Moderate anxiety actually improves
              focus and performance — it is excessive anxiety that causes problems.
            </p>
            <p>
              Understanding why you feel anxious is the first step. Anxiety is your brain preparing
              you for something important — it raises your alertness and sharpens your focus. The
              problems arise when anxiety becomes overwhelming: racing thoughts, physical tension,
              difficulty concentrating. The techniques below help you keep anxiety at a productive
              level rather than letting it spiral.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Practical anxiety management techniques"
            onSite="Anxiety is energy. Well-managed, it sharpens your focus and keeps you alert. Poorly managed, it overwhelms your thinking. The difference is preparation, perspective and simple breathing techniques."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preparation:</strong> the single most effective anxiety reducer — knowing
                you have prepared thoroughly provides genuine confidence.
              </li>
              <li>
                <strong>Breathing:</strong> slow, deep breathing (4 seconds in, hold for 4, out for
                6) calms your nervous system quickly.
              </li>
              <li>
                <strong>Routine:</strong> maintain your normal routine before the assessment —
                normal breakfast, normal journey, normal clothing (plus PPE).
              </li>
              <li>
                <strong>Positive reframing:</strong> reframe anxiety as excitement — &quot;I am
                nervous&quot; becomes &quot;I am ready and this matters to me&quot;.
              </li>
              <li>
                <strong>Perspective:</strong> the EPA is important but it is not life or death. If
                you do not succeed the first time, you can retake. This perspective reduces
                catastrophic thinking.
              </li>
              <li>
                <strong>Physical preparation:</strong> adequate sleep, healthy food, moderate
                exercise, and limited caffeine in the days before the assessment.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Recognising and countering negative thoughts">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Negative thought</th>
                    <th className="py-2 font-medium text-white">Evidence-based counter</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">&quot;I am going to fail&quot;</td>
                    <td className="py-2">
                      &quot;I have been signed off by my employer and provider — they believe I am
                      ready&quot;
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">&quot;I do not know enough&quot;</td>
                    <td className="py-2">
                      &quot;I passed the Level 3 Diploma and have a portfolio full of evidence&quot;
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">
                      &quot;I will freeze under pressure&quot;
                    </td>
                    <td className="py-2">
                      &quot;I performed well in mock assessments under similar conditions&quot;
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 align-top">
                      &quot;Everyone else is more prepared&quot;
                    </td>
                    <td className="py-2">
                      &quot;I have prepared thoroughly and can only control my own readiness&quot;
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">&quot;One mistake and it is over&quot;</td>
                    <td className="py-2">
                      &quot;Assessors look at overall competence, not perfection — mistakes
                      happen&quot;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Building genuine confidence</ContentEyebrow>

          <ConceptBlock title="Confidence built on real achievement">
            <p>
              Genuine confidence for the EPA comes from three sources: thorough preparation (you
              know your material), positive evidence (you have been signed off, completed
              qualifications, and built a strong portfolio), and practice (you have rehearsed and
              received positive feedback). This is not false confidence — it is confidence built on
              real achievement.
            </p>
            <p>
              Many apprentices experience what psychologists call &quot;imposter syndrome&quot; —
              the feeling that you are not really competent, that you have just been lucky, and that
              the EPA will expose your inadequacy. This is almost always unfounded. The evidence
              tells a different story: you have completed a demanding programme, passed rigorous
              qualifications, and been assessed as ready by two independent parties.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Confidence-building evidence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gateway sign-off:</strong> both your employer and training provider have
                confirmed you are ready — they know you better than you think.
              </li>
              <li>
                <strong>Qualifications:</strong> you have passed the Level 3 Diploma and Level 2
                English and maths — evidence of your ability.
              </li>
              <li>
                <strong>Portfolio:</strong> you have a portfolio full of evidence of real workplace
                competence — this is genuine proof of your skills.
              </li>
              <li>
                <strong>Mock assessments:</strong> successful mock performance demonstrates you can
                perform under assessment conditions.
              </li>
              <li>
                <strong>Workplace experience:</strong> you have been doing this work for months or
                years — the EPA is not asking you to do anything new.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Imposter syndrome is normal"
            onSite="Remember — the EPA is assessing competences you have already developed. The practical observation asks you to do tasks you do at work regularly. The professional discussion asks you to talk about experiences you have already had. The assessor is there to verify what you already know and can do, not to catch you out. You are more ready than you think."
          >
            <p>
              Research shows that imposter syndrome is more common among competent people than
              incompetent ones. The fact that you worry about being good enough often means you are
              setting high standards for yourself — which is exactly the attitude that has brought
              you this far. If you were not good enough, you would not have been signed off. Trust
              the process and trust the evidence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>The final days: consolidation, not cramming</ContentEyebrow>

          <ConceptBlock title="A taper, not an acceleration">
            <p>
              The final 3-5 days before the EPA should feel like a taper, not an acceleration. Think
              of it like an athlete preparing for a competition: the heavy training has already been
              done, and the final days are about staying sharp, resting well, and arriving at the
              assessment in the best possible physical and mental condition.
            </p>
            <p>
              This is where many apprentices make their biggest mistake. Driven by anxiety, they try
              to cram everything into the final days, exhaust themselves, and arrive at the EPA
              tired, stressed and less capable than if they had simply rested. Your competence was
              built over months of learning and practice — a few extra hours of cramming will not
              meaningfully change your knowledge, but poor sleep and high stress will meaningfully
              damage your performance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Final days checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Light review:</strong> brief, focused review of key topics — skim your
                notes, not re-read textbooks.
              </li>
              <li>
                <strong>Portfolio final check:</strong> ensure everything is in order and you know
                where each piece of evidence is.
              </li>
              <li>
                <strong>Brief practical practice:</strong> a short hands-on session to keep your
                skills fresh, not an intensive workshop.
              </li>
              <li>
                <strong>Prepare logistics:</strong> pack your bag, check your tools, plan your
                route, set your alarm.
              </li>
              <li>
                <strong>Rest well:</strong> prioritise sleep — a well-rested brain performs
                dramatically better than a tired one.
              </li>
              <li>
                <strong>Normal routine:</strong> eat normally, maintain your regular schedule, do
                activities that relax you.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The night before"
            onSite="The night before the EPA is not the time for a breakthrough revision session. Everything you need to know, you already know. Prepare your equipment, relax, sleep well, and arrive at the assessment fresh and focused. You have done the work — now trust it."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Prepare everything you need: portfolio, PPE, tools, test equipment, identification.
              </li>
              <li>Set two alarms with enough time for your normal morning routine.</li>
              <li>Do something you enjoy in the evening — a film, a meal, time with family.</li>
              <li>
                Avoid intensive last-minute revision — it creates anxiety without adding knowledge.
              </li>
              <li>
                Go to bed at your normal time — disrupting your sleep pattern adds unnecessary
                stress.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=L9mRkaaRmwM"

            title="Getting Over Anxiety"

            channel="Craig Wiltshire"

            duration="4:10"

            topic="Nerves before an assessment, talked about honestly"

            caption="On this page because assessment anxiety is common and rarely discussed. Two people talking about it plainly is more use than being told to stay calm."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Start structured revision 3-4 weeks before the EPA, not the night before.',
              'Use your portfolio as your primary revision guide — know every piece of evidence.',
              'Prioritise weak areas over topics you already know well.',
              'Complete at least one mock professional discussion and one mock practical.',
              'Manage anxiety through preparation, breathing techniques and positive self-talk.',
              'Build confidence on evidence: sign-off, qualifications, portfolio, mock results.',
              'The final days should be light consolidation and rest, not intensive cramming.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Revision and Confidence" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section5-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Gateway Requirements
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section5-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">EPA Day</div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section5_3;
