import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Final Revision and Confidence Building - MOET Module 7 Section 5.3";
const DESCRIPTION = "Effective final revision strategies and confidence-building techniques for the EPA: structured revision planning, mock assessments, managing anxiety, portfolio review and mental preparation for assessment day under ST1426.";

const quickCheckQuestions = [
  {
    id: "revision-strategy",
    question: "What is the most effective approach to final revision before the EPA?",
    options: [
      "Trying to learn everything from scratch in the final week",
      "Focused revision targeting the areas most likely to be assessed, using your portfolio as a guide — reviewing your evidence, practising discussion answers, and refreshing practical skills through hands-on practice",
      "Not revising at all — you either know it or you do not",
      "Only reading the textbook cover to cover"
    ],
    correctIndex: 1,
    explanation: "Final revision should be focused, not comprehensive. You have been learning throughout your apprenticeship — the final revision period is about consolidating, refreshing and building confidence, not learning new material. Use your portfolio as your revision guide: review each piece of evidence, practise explaining it, and refresh the technical knowledge that underpins it."
  },
  {
    id: "revision-mock",
    question: "Why are mock assessments valuable for EPA preparation?",
    options: [
      "They are not useful — they just cause stress",
      "They simulate the real assessment conditions, helping you identify areas of weakness, practise under time pressure, experience the format and type of questions, and build confidence through familiarity",
      "They are only useful for the knowledge test",
      "Mock assessments are the same as the real EPA"
    ],
    correctIndex: 1,
    explanation: "Mock assessments are one of the most effective preparation tools. They help you: experience the format (reducing surprise on the day), identify areas where you struggle to explain your evidence (giving time to practise), build confidence through successful practice, and develop strategies for managing assessment anxiety."
  },
  {
    id: "revision-anxiety",
    question: "Assessment anxiety before the EPA is:",
    options: [
      "A sign that you are not ready",
      "A normal response to an important assessment that most people experience — the key is managing it through preparation, familiar routines, positive self-talk, and understanding that some nervousness actually improves performance",
      "Something that should be ignored",
      "Only experienced by poorly prepared candidates"
    ],
    correctIndex: 1,
    explanation: "Assessment anxiety is normal and almost universal. Even experienced professionals feel nervous before important assessments. The key is management, not elimination: thorough preparation reduces uncertainty, familiar routines provide comfort, positive self-talk counters negative thoughts, and understanding that moderate anxiety actually sharpens focus can help reframe the experience."
  },
  {
    id: "revision-confidence",
    question: "Genuine confidence for the EPA is built on:",
    options: [
      "Ignoring your weaknesses and hoping for the best",
      "Three pillars: thorough preparation (you have revised effectively), positive evidence (gateway sign-off, completed qualifications, strong portfolio), and practice (successful mock assessments and rehearsals that prove you can perform under assessment conditions)",
      "Just telling yourself you will pass",
      "Only being confident about the practical observation"
    ],
    correctIndex: 1,
    explanation: "Real confidence is not bravado — it is grounded in evidence. Your preparation has been thorough and structured. Your employer and training provider have signed off your readiness. You have qualifications, a portfolio full of evidence, and successful mock assessments behind you. These are facts, not feelings. Confidence built on evidence is resilient under pressure."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Effective final revision for the EPA should be:",
    options: [
      "Cramming everything in the last 48 hours",
      "Structured and focused — planned over several weeks, targeting specific areas based on your self-assessment, and including both knowledge review and practical skills practice",
      "Reading the entire textbook once more",
      "Only practising the practical observation"
    ],
    correctAnswer: 1,
    explanation: "A structured revision plan spread over 3-4 weeks is far more effective than last-minute cramming. Identify your weaker areas (through self-assessment and mock results), create a schedule that covers all EPA components, and mix knowledge revision with practical skills practice and discussion rehearsal."
  },
  {
    id: 2,
    question: "When revising for the professional discussion, the best approach is:",
    options: [
      "Memorising scripted answers",
      "Reviewing your portfolio evidence thoroughly, practising explaining each piece in your own words, preparing examples for likely questions, and rehearsing with a colleague, mentor or training provider",
      "Not preparing — it is just a conversation",
      "Only focusing on the strongest evidence"
    ],
    correctAnswer: 1,
    explanation: "The professional discussion is not a scripted presentation — it is a structured conversation. Prepare by knowing your portfolio inside out, practising explaining your evidence naturally (not from a script), anticipating probing questions ('Why did you choose that approach? What would you do differently?'), and rehearsing with someone who can provide constructive feedback."
  },
  {
    id: 3,
    question: "A revision plan for the EPA should include:",
    options: [
      "Only knowledge revision",
      "Time for knowledge revision, practical skills practice, portfolio review, mock discussions, reflection on feedback, and rest — balanced across all EPA components",
      "Only the areas you find easiest",
      "Revision every waking hour in the final week"
    ],
    correctAnswer: 1,
    explanation: "A balanced revision plan covers all EPA components: knowledge (reviewing technical content), practical skills (refreshing safe isolation, testing, fault diagnosis), professional discussion (reviewing portfolio, practising explanations), and self-care (adequate rest, managing stress). Overloading any one area at the expense of others is counterproductive."
  },
  {
    id: 4,
    question: "Mock professional discussions help you to:",
    options: [
      "Memorise the right answers",
      "Practise articulating your experience clearly, identify gaps in your ability to explain your evidence, experience the questioning style, and build confidence in discussing your competence",
      "Predict the exact questions that will be asked",
      "Replace the need for portfolio evidence"
    ],
    correctAnswer: 1,
    explanation: "Mock discussions are invaluable because: you practise putting your knowledge and experience into words (harder than it sounds), you discover which evidence you struggle to explain clearly (giving time to prepare), you experience the probing style of assessment questions, and successful practice builds genuine confidence."
  },
  {
    id: 5,
    question: "When refreshing practical skills before the EPA, you should focus on:",
    options: [
      "Only tasks you have never done before",
      "The core practical competences most likely to be assessed: safe isolation procedures, systematic fault diagnosis, use of test equipment, component replacement techniques, and proper documentation",
      "Speed above all else",
      "Only the skills listed in your portfolio"
    ],
    correctAnswer: 1,
    explanation: "Focus practical revision on the fundamentals: safe isolation (this will definitely be assessed), systematic fault diagnosis (the core skill), proper use of test equipment (insulation resistance, earth fault loop, RCD testing), component replacement techniques, and documentation. These are the skills the assessor will observe most closely."
  },
  {
    id: 6,
    question: "To manage assessment anxiety effectively, you should:",
    options: [
      "Avoid thinking about the EPA until the day",
      "Prepare thoroughly (reduces uncertainty), practise relaxation techniques, maintain normal routines before the assessment, visualise successful outcomes, and remind yourself that you have been signed off because you are ready",
      "Have a large caffeinated drink before the assessment",
      "Assume you will fail to reduce pressure"
    ],
    correctAnswer: 1,
    explanation: "Anxiety management combines preparation and mental strategies: thorough preparation reduces the fear of the unknown, relaxation techniques (breathing exercises, progressive muscle relaxation) calm physical symptoms, normal routines provide stability, positive visualisation builds confidence, and remembering that gateway sign-off means others believe you are ready provides reassurance."
  },
  {
    id: 7,
    question: "A 'knowledge refresh' before the EPA should prioritise:",
    options: [
      "Memorising every fact from the entire apprenticeship",
      "Key technical areas that underpin the assessment: safety legislation, relevant regulations, fundamental electrical principles, maintenance procedures, and the specific technical knowledge related to your workplace activities and portfolio evidence",
      "Only topics you have never studied before",
      "Generic information not specific to your standard"
    ],
    correctAnswer: 1,
    explanation: "Focus knowledge revision on: safety (always assessed), relevant regulations (BS 7671, EAWR, HASAWA), fundamental principles (how and why things work), maintenance techniques (the methods you use), and the technical knowledge behind your portfolio evidence (the assessor will probe this during discussion). Depth on these topics matters more than breadth on everything."
  },
  {
    id: 8,
    question: "Feedback from mock assessments should be:",
    options: [
      "Ignored — it is just practice",
      "Reviewed carefully, used to identify specific areas for improvement, incorporated into your revision plan, and addressed through targeted practice before the real assessment",
      "Taken personally",
      "Only considered if it is positive"
    ],
    correctAnswer: 1,
    explanation: "Mock assessment feedback is a gift — it shows you exactly where to focus your remaining preparation time. Review the feedback objectively: what went well (maintain it), what needs improvement (practise it), and what was missing (add it to your preparation). The purpose of mock assessment is to find weaknesses while there is still time to address them."
  },
  {
    id: 9,
    question: "In the final days before the EPA, you should:",
    options: [
      "Cram intensively for 12+ hours per day",
      "Maintain a balanced routine — light review of key topics, brief practical practice, adequate sleep, healthy eating, and activities that help you relax and maintain perspective",
      "Do nothing at all",
      "Completely rewrite your portfolio"
    ],
    correctAnswer: 1,
    explanation: "The final days should be about consolidation and confidence, not intensive cramming. Light review of key topics, brief hands-on practice to keep skills fresh, and ensuring you are well-rested and mentally prepared are more effective than exhausting yourself. Your learning has happened over months — a few extra hours of cramming will not transform your competence."
  },
  {
    id: 10,
    question: "Positive self-talk before the EPA means:",
    options: [
      "Telling yourself you are the best",
      "Replacing negative thoughts ('I am going to fail') with realistic positive ones ('I have been signed off because I am ready, I have prepared well, and I know my portfolio inside out')",
      "Pretending you are not nervous",
      "Talking to yourself out loud"
    ],
    correctAnswer: 1,
    explanation: "Positive self-talk is not about false confidence — it is about realistic reassurance. Replace catastrophic thinking ('I will freeze and forget everything') with evidence-based positivity ('I have completed the apprenticeship, been signed off by my employer and provider, prepared thoroughly, and know my evidence well'). These are facts, not delusions."
  },
  {
    id: 11,
    question: "If you identify a significant knowledge gap during final revision, you should:",
    options: [
      "Panic and try to learn everything overnight",
      "Focus targeted revision on that specific area, seek help from your training provider or mentor, practise explaining the topic in your own words, and prepare to be honest in the discussion if asked about an area you find challenging",
      "Ignore it and hope it does not come up",
      "Cancel the EPA"
    ],
    correctAnswer: 1,
    explanation: "A significant gap found during revision is stressful but addressable: focus your remaining revision time on that area, ask your training provider for a quick tutorial or resource, practise explaining the topic, and prepare an honest response if it comes up ('This is an area I have been developing in — here is what I understand and here is what I have been working on'). Honesty is more effective than bluffing."
  },
  {
    id: 12,
    question: "The most reliable source of confidence before the EPA is:",
    options: [
      "Hoping that easy questions come up",
      "The combination of thorough preparation, successful mock assessments, gateway sign-off from your employer and training provider, completed qualifications, and a well-organised portfolio — these are evidence of your competence, not just feelings of readiness",
      "Comparing yourself to other apprentices",
      "Avoiding thinking about the assessment altogether"
    ],
    correctAnswer: 1,
    explanation: "Confidence built on evidence is durable under pressure. Your preparation has been structured and thorough. Your mock assessments have shown you can perform under assessment conditions. Your employer and training provider have both confirmed your readiness. Your qualifications prove your academic ability. Your portfolio documents your workplace competence. These are facts. Trust them."
  }
];

const faqs = [
  {
    question: "How much time should I spend on final revision?",
    answer: "A structured revision plan over 3-4 weeks is ideal, dedicating 1-2 hours per day alongside your normal work. The final week should be lighter — consolidating rather than cramming. The total time depends on your starting confidence level, but remember: you have been learning for the entire apprenticeship. Final revision is about refreshing and consolidating, not learning from scratch."
  },
  {
    question: "Should I take time off work to revise for the EPA?",
    answer: "Some employers grant study leave before the EPA — ask your employer and training provider. Even a few days of focused preparation can be beneficial. However, continuing to work during the revision period is also valuable — it keeps your practical skills sharp and provides fresh examples for the professional discussion. A balance of both is ideal."
  },
  {
    question: "What if I blank on a question during the professional discussion?",
    answer: "This is common and not fatal. The assessor understands that nerves can affect recall. Take a breath, ask for the question to be repeated if needed, and try to relate it to a specific workplace experience. If you genuinely do not know the answer, be honest: 'I am not confident about that specific area, but based on my experience I would approach it by...' Trying to bluff is worse than honest uncertainty."
  },
  {
    question: "How can I practise the practical observation beforehand?",
    answer: "Ask your employer to arrange practice time with the type of equipment likely to be used in the observation. Practise your safe isolation procedure until it is second nature. Work through fault diagnosis scenarios systematically. If possible, have a colleague or supervisor observe you and provide feedback. Many training providers also offer practical mock assessments."
  },
  {
    question: "Is it normal to feel underprepared even after months of preparation?",
    answer: "Yes — this is extremely common and is known as 'imposter syndrome.' Most apprentices feel they should know more or be more prepared, even when they are well above the required standard. Trust the evidence: you have been signed off by both your employer and training provider, you have completed all the required qualifications, and you have a portfolio full of evidence of your competence. You are more ready than you think."
  }
];

const MOETModule7Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5">
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
            <span>Module 7.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Final Revision and Confidence Building
          </h1>
          <p className="text-white/80">
            Structured preparation strategies and mental readiness techniques for EPA success
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Plan:</strong> Structured revision over 3-4 weeks, not cramming</li>
              <li className="pl-1"><strong>Focus:</strong> Target weak areas and high-probability topics</li>
              <li className="pl-1"><strong>Practise:</strong> Mock discussions, practical run-throughs</li>
              <li className="pl-1"><strong>Confidence:</strong> Trust your preparation and sign-off</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>All components:</strong> Revise for observation, discussion and knowledge</li>
              <li className="pl-1"><strong>Portfolio mastery:</strong> Know every piece of evidence inside out</li>
              <li className="pl-1"><strong>Practical:</strong> Safe isolation and testing must be automatic</li>
              <li className="pl-1"><strong>ST1426:</strong> Focus on the KSBs most likely to be assessed</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Create a structured revision plan covering all EPA components",
              "Use mock assessments effectively to identify and address weaknesses",
              "Manage assessment anxiety through preparation and mental strategies",
              "Review your portfolio to ensure you can discuss every piece of evidence confidently",
              "Refresh core practical skills for the observation component",
              "Build genuine confidence based on your preparation and competence"
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
            Creating Your Revision Plan
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective revision is planned, structured and balanced. It covers all EPA components,
              prioritises your weaker areas, and includes both knowledge review and practical skills
              practice. Starting 3-4 weeks before the EPA gives you enough time without creating
              exhausting intensity.
            </p>

            <p>
              The biggest mistake apprentices make is treating revision as re-learning. You have spent
              months — often years — developing your knowledge, skills and behaviours. Final revision
              is about consolidating what you already know, refreshing areas that have become rusty,
              and building familiarity with the assessment format. It is not the time to learn
              entirely new material.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sample 4-Week Revision Plan</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Week</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Focus</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 1</td>
                      <td className="border border-white/10 px-3 py-2">Self-assessment and planning</td>
                      <td className="border border-white/10 px-3 py-2">Review portfolio, identify weak areas, create detailed plan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 2</td>
                      <td className="border border-white/10 px-3 py-2">Knowledge and practical focus</td>
                      <td className="border border-white/10 px-3 py-2">Technical revision, practical skills practice, first mock</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 3</td>
                      <td className="border border-white/10 px-3 py-2">Discussion and weak areas</td>
                      <td className="border border-white/10 px-3 py-2">Mock discussion, address feedback, target weak areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Week 4</td>
                      <td className="border border-white/10 px-3 py-2">Consolidation and confidence</td>
                      <td className="border border-white/10 px-3 py-2">Light review, final portfolio check, rest and mental prep</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Revision Plan Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Start with self-assessment:</strong> Before you can revise effectively, you need to know where your gaps are — review the KSBs, rate your confidence on each, and prioritise accordingly</li>
                <li className="pl-1"><strong>Cover all components:</strong> Do not just revise knowledge — include practical skills, portfolio review, and discussion practice in your plan</li>
                <li className="pl-1"><strong>Prioritise weakness:</strong> Spend more time on areas where you are less confident, not on topics you already know well</li>
                <li className="pl-1"><strong>Build in rest:</strong> Burnout before the EPA is counterproductive — include rest days and light sessions to maintain your energy</li>
                <li className="pl-1"><strong>Track progress:</strong> Note what you have covered, what improved after practice, and what still needs attention</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Avoid the Cramming Trap</p>
              <p className="text-sm text-white">
                Research consistently shows that distributed practice (spreading revision over weeks)
                is far more effective than massed practice (cramming everything into the final days).
                Cramming creates the illusion of familiarity without genuine understanding. You may
                recognise terms when you see them but struggle to explain them under pressure. Start
                early and revise regularly — your future self will thank you.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The revision plan is a guide, not a rigid schedule. If a mock
              assessment reveals a weakness, adjust the plan to spend more time on that area. Flexibility
              within structure is the key to effective preparation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mock Assessments and Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mock assessments are the closest you can get to the real EPA without the pressure. They
              help you experience the format, identify weak spots, and build familiarity with the
              process. Most training providers offer mock assessments — take every opportunity to
              participate.
            </p>

            <p>
              The value of mocks extends beyond simple practice. They expose you to the type of
              probing questions an assessor asks, help you manage your time during practical tasks,
              and — crucially — they prove to you that you can perform under assessment conditions.
              A successful mock is powerful evidence that you are ready.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Making the Most of Mock Assessments</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Treat them seriously:</strong> Approach mock assessments as if they were the real thing — this develops good habits and realistic practice</li>
                <li className="pl-1"><strong>Request feedback:</strong> Ask for specific, constructive feedback — not just "that was good" but "here is what you could improve"</li>
                <li className="pl-1"><strong>Act on feedback:</strong> Identify the specific improvements suggested and practise them before the real assessment</li>
                <li className="pl-1"><strong>Mock with different people:</strong> If possible, practise with different questioners — each will probe different areas and challenge you in different ways</li>
                <li className="pl-1"><strong>Record yourself:</strong> If comfortable, record a mock discussion and review it — you will notice habits you were not aware of</li>
                <li className="pl-1"><strong>Simulate real conditions:</strong> Use the same time limits, the same type of environment, and the same rules as the real assessment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Mock Practice</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mock Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Develops</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How to Arrange</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mock practical observation</td>
                      <td className="border border-white/10 px-3 py-2">Working method, safety habits, time management</td>
                      <td className="border border-white/10 px-3 py-2">Training provider or workplace supervisor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mock professional discussion</td>
                      <td className="border border-white/10 px-3 py-2">Articulation, portfolio knowledge, handling questions</td>
                      <td className="border border-white/10 px-3 py-2">Training provider, mentor or colleague</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Self-directed portfolio review</td>
                      <td className="border border-white/10 px-3 py-2">Evidence familiarity, explanation fluency</td>
                      <td className="border border-white/10 px-3 py-2">Individual — talk through each piece aloud</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Peer practice</td>
                      <td className="border border-white/10 px-3 py-2">Confidence, varied questioning, mutual support</td>
                      <td className="border border-white/10 px-3 py-2">Fellow apprentices preparing for EPA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The purpose of mock assessment is to make the real thing feel
              familiar. The more you practise the format, the less nervous you will be on the day.
              Familiarity breeds confidence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Managing Assessment Anxiety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Assessment anxiety is a normal human response to being evaluated. Almost everyone
              experiences it to some degree. The goal is not to eliminate it but to manage it so that
              it helps rather than hinders your performance. Moderate anxiety actually improves focus
              and performance — it is excessive anxiety that causes problems.
            </p>

            <p>
              Understanding why you feel anxious is the first step. Anxiety is your brain preparing
              you for something important — it raises your alertness and sharpens your focus. The
              problems arise when anxiety becomes overwhelming: racing thoughts, physical tension,
              difficulty concentrating. The techniques below help you keep anxiety at a productive
              level rather than letting it spiral.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Anxiety Management Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Preparation:</strong> The single most effective anxiety reducer — knowing you have prepared thoroughly provides genuine confidence</li>
                <li className="pl-1"><strong>Breathing:</strong> Slow, deep breathing (4 seconds in, hold for 4, out for 6) calms your nervous system quickly</li>
                <li className="pl-1"><strong>Routine:</strong> Maintain your normal routine before the assessment — normal breakfast, normal journey, normal clothing (plus PPE)</li>
                <li className="pl-1"><strong>Positive reframing:</strong> Reframe anxiety as excitement — "I am nervous" becomes "I am ready and this matters to me"</li>
                <li className="pl-1"><strong>Perspective:</strong> The EPA is important but it is not life or death. If you do not succeed the first time, you can retake. This perspective reduces catastrophic thinking</li>
                <li className="pl-1"><strong>Physical preparation:</strong> Adequate sleep, healthy food, moderate exercise, and limited caffeine in the days before the assessment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recognising and Countering Negative Thoughts</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Negative Thought</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Evidence-Based Counter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">"I am going to fail"</td>
                      <td className="border border-white/10 px-3 py-2">"I have been signed off by my employer and provider — they believe I am ready"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">"I do not know enough"</td>
                      <td className="border border-white/10 px-3 py-2">"I passed the Level 3 Diploma and have a portfolio full of evidence"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">"I will freeze under pressure"</td>
                      <td className="border border-white/10 px-3 py-2">"I performed well in mock assessments under similar conditions"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">"Everyone else is more prepared"</td>
                      <td className="border border-white/10 px-3 py-2">"I have prepared thoroughly and can only control my own readiness"</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">"One mistake and it is over"</td>
                      <td className="border border-white/10 px-3 py-2">"Assessors look at overall competence, not perfection — mistakes happen"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Anxiety is energy. Well-managed, it sharpens your focus and keeps
              you alert. Poorly managed, it overwhelms your thinking. The difference is preparation,
              perspective and simple breathing techniques.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Genuine Confidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Genuine confidence for the EPA comes from three sources: thorough preparation (you know
              your material), positive evidence (you have been signed off, completed qualifications,
              and built a strong portfolio), and practice (you have rehearsed and received positive
              feedback). This is not false confidence — it is confidence built on real achievement.
            </p>

            <p>
              Many apprentices experience what psychologists call "imposter syndrome" — the feeling
              that you are not really competent, that you have just been lucky, and that the EPA will
              expose your inadequacy. This is almost always unfounded. The evidence tells a different
              story: you have completed a demanding programme, passed rigorous qualifications, and
              been assessed as ready by two independent parties.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Confidence-Building Evidence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Gateway sign-off:</strong> Both your employer and training provider have confirmed you are ready — they know you better than you think</li>
                <li className="pl-1"><strong>Qualifications:</strong> You have passed the Level 3 Diploma and Level 2 English and maths — evidence of your ability</li>
                <li className="pl-1"><strong>Portfolio:</strong> You have a portfolio full of evidence of real workplace competence — this is genuine proof of your skills</li>
                <li className="pl-1"><strong>Mock assessments:</strong> Successful mock performance demonstrates you can perform under assessment conditions</li>
                <li className="pl-1"><strong>Workplace experience:</strong> You have been doing this work for months or years — the EPA is not asking you to do anything new</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Imposter Syndrome Is Normal</p>
              <p className="text-sm text-white">
                Research shows that imposter syndrome is more common among competent people than
                incompetent ones. The fact that you worry about being good enough often means you
                are setting high standards for yourself — which is exactly the attitude that has
                brought you this far. If you were not good enough, you would not have been signed
                off. Trust the process and trust the evidence.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Remember — the EPA is assessing competences you have
              already developed. The practical observation asks you to do tasks you do at work
              regularly. The professional discussion asks you to talk about experiences you have
              already had. The assessor is there to verify what you already know and can do, not to
              catch you out. You are more ready than you think.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Final Days: Consolidation, Not Cramming
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final 3-5 days before the EPA should feel like a taper, not an acceleration. Think
              of it like an athlete preparing for a competition: the heavy training has already been
              done, and the final days are about staying sharp, resting well, and arriving at the
              assessment in the best possible physical and mental condition.
            </p>

            <p>
              This is where many apprentices make their biggest mistake. Driven by anxiety, they try
              to cram everything into the final days, exhaust themselves, and arrive at the EPA tired,
              stressed and less capable than if they had simply rested. Your competence was built over
              months of learning and practice — a few extra hours of cramming will not meaningfully
              change your knowledge, but poor sleep and high stress will meaningfully damage your
              performance.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Days Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Light review:</strong> Brief, focused review of key topics — skim your notes, not re-read textbooks</li>
                <li className="pl-1"><strong>Portfolio final check:</strong> Ensure everything is in order and you know where each piece of evidence is</li>
                <li className="pl-1"><strong>Brief practical practice:</strong> A short hands-on session to keep your skills fresh, not an intensive workshop</li>
                <li className="pl-1"><strong>Prepare logistics:</strong> Pack your bag, check your tools, plan your route, set your alarm</li>
                <li className="pl-1"><strong>Rest well:</strong> Prioritise sleep — a well-rested brain performs dramatically better than a tired one</li>
                <li className="pl-1"><strong>Normal routine:</strong> Eat normally, maintain your regular schedule, do activities that relax you</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Night Before</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Prepare everything you need: portfolio, PPE, tools, test equipment, identification</li>
                <li className="pl-1">Set two alarms with enough time for your normal morning routine</li>
                <li className="pl-1">Do something you enjoy in the evening — a film, a meal, time with family</li>
                <li className="pl-1">Avoid intensive last-minute revision — it creates anxiety without adding knowledge</li>
                <li className="pl-1">Go to bed at your normal time — disrupting your sleep pattern adds unnecessary stress</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The night before the EPA is not the time for a breakthrough
              revision session. Everything you need to know, you already know. Prepare your
              equipment, relax, sleep well, and arrive at the assessment fresh and focused. You have
              done the work — now trust it.
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
              <li className="pl-1">Start structured revision 3-4 weeks before the EPA, not the night before</li>
              <li className="pl-1">Use your portfolio as your primary revision guide — know every piece of evidence</li>
              <li className="pl-1">Prioritise weak areas over topics you already know well</li>
              <li className="pl-1">Complete at least one mock professional discussion and one mock practical</li>
              <li className="pl-1">Manage anxiety through preparation, breathing techniques and positive self-talk</li>
              <li className="pl-1">Build confidence on evidence: sign-off, qualifications, portfolio, mock results</li>
              <li className="pl-1">The final days should be light consolidation and rest, not intensive cramming</li>
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
            title="Test Your Knowledge — Revision and Confidence"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Gateway Requirements
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5-4">
              Next: EPA Day
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section5_3;
