import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "What to Expect on EPA Day - MOET Module 7 Section 5.4";
const DESCRIPTION = "A comprehensive guide to what happens on EPA day for the MOET ST1426 standard: practical observation, professional discussion, what to bring, how to conduct yourself, dealing with unexpected situations and understanding the grading process.";

const quickCheckQuestions = [
  {
    id: "epa-components",
    question: "What are the main EPA assessment components for the MOET ST1426 standard?",
    options: [
      "Only a written exam",
      "A practical observation where you demonstrate maintenance skills under assessor observation, and a professional discussion where you discuss your portfolio evidence and demonstrate knowledge and understanding in depth",
      "Only a portfolio submission",
      "Only an interview"
    ],
    correctIndex: 1,
    explanation: "The MOET EPA typically consists of two main components: the practical observation (where the assessor watches you perform real or simulated maintenance tasks, assessing your skills, safety practices and working methods) and the professional discussion (where the assessor uses your portfolio to explore your knowledge, understanding and professional behaviours through structured questioning)."
  },
  {
    id: "epa-practical",
    question: "During the practical observation, the assessor is primarily looking for:",
    options: [
      "How fast you can complete the task",
      "Safe working practices, systematic fault diagnosis, competent use of tools and test equipment, quality workmanship, effective communication, and professional conduct throughout the task",
      "Whether you can work without any reference materials",
      "Only whether the task is completed correctly"
    ],
    correctIndex: 1,
    explanation: "The practical observation assesses how you work, not just the end result. The assessor notes: your safe isolation and safety practices, your systematic approach to diagnosis, your competent use of tools and equipment, the quality of your workmanship, how you communicate with others, and your overall professional conduct. Working safely and methodically matters more than speed."
  },
  {
    id: "epa-discussion",
    question: "During the professional discussion, you should:",
    options: [
      "Give one-word answers to get through it quickly",
      "Provide detailed, specific answers drawing on real workplace examples from your portfolio, explain the reasoning behind your decisions, demonstrate your understanding of underpinning knowledge, and be honest about areas you are still developing",
      "Only repeat what is written in your portfolio",
      "Argue with the assessor if you disagree"
    ],
    correctIndex: 1,
    explanation: "The professional discussion is your opportunity to demonstrate depth of understanding. Use specific examples from your portfolio (the assessor has reviewed it), explain why you made certain decisions (not just what you did), demonstrate that you understand the theory behind your practice, and show professional maturity by being honest about your development areas."
  },
  {
    id: "epa-grading",
    question: "EPA grading is determined by:",
    options: [
      "The assessor's personal opinion of you",
      "Specific, predetermined grading criteria defined in the assessment plan — each component is assessed against descriptors for pass and distinction grades based on the KSBs demonstrated, and component grades combine according to defined rules for the overall result",
      "How quickly you complete each component",
      "Only the practical observation result"
    ],
    correctIndex: 1,
    explanation: "EPA grading is objective and criteria-referenced. The assessment plan defines specific descriptors for pass and distinction grades for each component. The assessor judges your performance against these published criteria, not personal opinion. Both components contribute to the overall grade, and the assessment plan specifies exactly how component grades combine (e.g., both must be passed, distinction requires specific criteria across both)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "On EPA day, you should arrive:",
    options: [
      "Just on time",
      "Early — with enough time to settle in, check your equipment and materials, review your portfolio briefly, and compose yourself before the assessment begins",
      "Late — to show you are relaxed",
      "It does not matter when you arrive"
    ],
    correctAnswer: 1,
    explanation: "Arriving early gives you time to: find the location and settle in, check any tools or equipment you need, do a final brief review of your portfolio, use the bathroom, calm any nerves, and start the assessment in a composed, professional manner. Being rushed from late arrival adds unnecessary stress and may affect your first impression."
  },
  {
    id: 2,
    question: "For the practical observation, you should bring:",
    options: [
      "Nothing — everything will be provided",
      "Your personal tools and test equipment (if required), appropriate PPE, any reference materials permitted by the EPAO, identification, and your portfolio for reference during the day",
      "Only your portfolio",
      "Everything you own"
    ],
    correctAnswer: 1,
    explanation: "Check with your training provider what is provided and what you need to bring. Typically you need: personal PPE (safety boots, overalls, safety glasses), your own tools and test equipment (if specified), identification, and your portfolio. Some EPAOs provide all equipment; others expect you to bring your own. Clarify in advance to avoid surprises."
  },
  {
    id: 3,
    question: "If you make a mistake during the practical observation, you should:",
    options: [
      "Try to hide it from the assessor",
      "Acknowledge the error, take appropriate corrective action, and continue professionally — the assessor values how you handle mistakes more than whether you make them",
      "Stop and refuse to continue",
      "Pretend nothing happened"
    ],
    correctAnswer: 1,
    explanation: "Everyone can make mistakes under assessment pressure. What matters is how you handle it: recognise the error, explain what went wrong, take corrective action, and continue professionally. This demonstrates self-awareness, problem-solving and professional resilience — all positive assessment criteria. Trying to hide a mistake is far worse than handling one well."
  },
  {
    id: 4,
    question: "The assessor during the practical observation will:",
    options: [
      "Try to distract you and make you fail",
      "Observe your work professionally, ask clarifying questions about your approach and reasoning, note your methods and safety practices, and maintain a supportive but neutral assessment environment",
      "Help you complete the task",
      "Only watch the final result"
    ],
    correctAnswer: 1,
    explanation: "The assessor is a trained, impartial observer. They will watch your work, make notes, and ask questions about your approach ('Why did you choose to test that first?' 'What reading are you expecting?'). These questions are not meant to trick you — they help the assessor understand your reasoning and confirm your competence. The assessor wants you to succeed."
  },
  {
    id: 5,
    question: "Safe isolation during the practical observation should be:",
    options: [
      "Skipped to save time",
      "Performed fully and correctly every time, following your standard procedure — safe isolation is always assessed and errors in this area are treated very seriously by assessors",
      "Only done if the assessor asks",
      "Abbreviated because it is just an assessment"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation is non-negotiable in the EPA. The assessor will specifically observe your isolation procedure: correct identification of the circuit, use of a lock-off device, proving dead with a calibrated voltage detector (tested before and after on a proving unit). Shortcuts or errors in safe isolation are among the most serious issues an assessor can identify."
  },
  {
    id: 6,
    question: "During the professional discussion, if you do not understand a question:",
    options: [
      "Guess at what the assessor means",
      "Ask the assessor to rephrase or clarify the question — this is completely acceptable and demonstrates professional communication rather than guessing and giving an irrelevant answer",
      "Stay silent",
      "Change the subject"
    ],
    correctAnswer: 1,
    explanation: "Asking for clarification is professional and expected. Say something like: 'Could you rephrase that question?' or 'Are you asking about X or Y?' The assessor would rather you understood the question and gave a relevant answer than guessed and went off on a tangent. This is not a sign of weakness — it is effective communication."
  },
  {
    id: 7,
    question: "The professional discussion typically lasts:",
    options: [
      "10 minutes",
      "The duration specified in the assessment plan — typically 45-60 minutes, during which the assessor will explore your portfolio evidence, probe your understanding, and assess your professional behaviours",
      "3 hours",
      "There is no time limit"
    ],
    correctAnswer: 1,
    explanation: "The assessment plan specifies the duration, typically 45-60 minutes for the MOET standard. The assessor plans their questions to cover the required KSBs within this time. The discussion is structured but conversational — the assessor uses your portfolio as a starting point and follows up with probing questions based on your responses."
  },
  {
    id: 8,
    question: "Grading in the EPA is based on:",
    options: [
      "The assessor's personal opinion",
      "Specific grading criteria defined in the assessment plan — each component is assessed against descriptors for pass and distinction grades, based on the KSBs demonstrated during the assessment",
      "How much the assessor likes you",
      "Only the practical observation result"
    ],
    correctAnswer: 1,
    explanation: "EPA grading uses predetermined criteria from the assessment plan. For each component, there are specific descriptors for pass and distinction grades. The assessor judges your performance against these criteria, not personal opinion. Both components contribute to the overall grade, and specific rules define how component grades combine for the final result."
  },
  {
    id: 9,
    question: "If the practical observation involves equipment you have not used before:",
    options: [
      "Refuse to do the assessment",
      "Take time to familiarise yourself with the equipment, ask the assessor for clarification about its operation if needed, and apply your transferable skills and knowledge systematically — the assessor assesses your approach and reasoning, not just equipment-specific knowledge",
      "Pretend you know the equipment perfectly",
      "Panic and rush through the task"
    ],
    correctAnswer: 1,
    explanation: "You may encounter unfamiliar equipment. This is not a test of specific product knowledge — it is a test of your ability to apply general principles to any equipment. Take time to read labels, check documentation, identify components logically, and apply your systematic approach. Asking sensible questions about the equipment is professional, not a weakness."
  },
  {
    id: 10,
    question: "After the EPA is completed, you should:",
    options: [
      "Immediately ask for your result",
      "Thank the assessor for their time, reflect on how the assessment went (what went well, what could be improved), and wait for the formal result through the proper channels — results typically take a few weeks to be confirmed",
      "Celebrate regardless of how it went",
      "Contact the EPAO to argue about questions"
    ],
    correctAnswer: 1,
    explanation: "After the EPA: thank the assessor (professional courtesy), reflect privately on your performance (useful for learning regardless of outcome), and wait for the formal result. Results go through quality assurance processes and are typically confirmed within a few weeks. Your training provider will receive the result and communicate it to you."
  },
  {
    id: 11,
    question: "If you do not pass the EPA on the first attempt:",
    options: [
      "Your apprenticeship is cancelled",
      "You are entitled to a retake — the assessment plan specifies the process and timeframe for retakes, and your training provider will support you in addressing the areas that need improvement before you reattempt",
      "You can never try again",
      "You must start the entire apprenticeship again"
    ],
    correctAnswer: 1,
    explanation: "Failing the EPA is not the end. You are entitled to retake the failed component(s) — the assessment plan specifies the retake window and process. Your training provider will help you understand what areas need improvement and support your preparation for the retake. Many successful technicians did not pass every assessment on the first attempt."
  },
  {
    id: 12,
    question: "Throughout the EPA day, the most important thing to demonstrate is:",
    options: [
      "Speed — completing everything as fast as possible",
      "Consistent professional competence — safe working practices, systematic approaches, clear communication, sound technical knowledge, and the ability to explain your reasoning and reflect on your work",
      "That you know more than the assessor",
      "That you can work without supervision"
    ],
    correctAnswer: 1,
    explanation: "The EPA assesses your overall professional competence. This includes safety (always paramount), systematic working methods, technical knowledge, communication skills, and reflective practice. The assessor is looking for a well-rounded professional who works safely, thinks clearly, and can explain what they are doing and why. Consistency across the day matters more than any single brilliant moment."
  }
];

const faqs = [
  {
    question: "What should I wear on EPA day?",
    answer: "For the practical observation: appropriate workwear and full PPE (safety boots, overalls or work trousers, safety glasses, gloves as appropriate). For the professional discussion: clean, smart-casual or work clothing is appropriate — you do not need a suit, but present yourself professionally. If both components are on the same day, workwear with PPE for the practical and clean workwear for the discussion is fine."
  },
  {
    question: "Can I bring notes or reference materials to the EPA?",
    answer: "Check your EPAO's specification. For the practical observation, you may be allowed reference materials (e.g., GN3, manufacturer documentation). For the professional discussion, you will have your portfolio. Some EPAOs allow brief prompt notes; others do not. Clarify in advance so there are no surprises on the day."
  },
  {
    question: "What if the EPA is held at an unfamiliar location?",
    answer: "If possible, visit the location in advance so you know where to go, where to park, and how long the journey takes. If a visit is not possible, research the location online and plan your route. Arrive extra early to account for finding the venue. Knowing the practical details reduces one source of anxiety on the day."
  },
  {
    question: "How long does the whole EPA day take?",
    answer: "This depends on the components scheduled. The practical observation typically takes 3-5 hours (including preparation and clear-up), and the professional discussion takes 45-60 minutes. If both are on the same day, expect to be there for most of the day. Some EPAOs schedule components on different days — check with your training provider."
  },
  {
    question: "What happens if I am ill on EPA day?",
    answer: "Contact your training provider and the EPAO immediately. If you are genuinely unwell, the assessment will be rescheduled. Do not attend if you are too ill to perform to your best — it is better to rearrange than to underperform due to illness. Most EPAOs have clear policies for absence and rescheduling."
  }
];

const MOETModule7Section5_4 = () => {
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
            <span>Module 7.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What to Expect on EPA Day
          </h1>
          <p className="text-white/80">
            A comprehensive guide to the assessment day: components, conduct, and practical preparation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Practical:</strong> Demonstrate maintenance skills under observation</li>
              <li className="pl-1"><strong>Discussion:</strong> Explore portfolio evidence through questioning</li>
              <li className="pl-1"><strong>Safety:</strong> Safe isolation and safe working are always assessed</li>
              <li className="pl-1"><strong>Conduct:</strong> Professional behaviour throughout the day</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Independent:</strong> Assessed by an EPAO assessor, not your trainer</li>
              <li className="pl-1"><strong>Graded:</strong> Pass, distinction or fail against specific criteria</li>
              <li className="pl-1"><strong>Supportive:</strong> The assessor wants you to succeed</li>
              <li className="pl-1"><strong>ST1426:</strong> Assesses the full range of KSBs in the standard</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the format and expectations of each EPA component",
              "Know what to bring and how to prepare practically for the assessment day",
              "Conduct yourself professionally throughout the assessment",
              "Handle unexpected situations during the practical observation confidently",
              "Maximise your performance in the professional discussion",
              "Understand the grading process and what happens after the assessment"
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
            The Practical Observation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The practical observation is where you demonstrate your maintenance skills in action.
              The assessor watches you perform real or realistic maintenance tasks, noting your
              methods, safety practices, workmanship quality, and professional conduct. This component
              shows what you can actually do, not just what you know in theory.
            </p>

            <p>
              The observation typically takes 3-5 hours and may involve a combination of planned
              maintenance, fault diagnosis, and component replacement activities. The assessor will
              have a structured observation plan covering specific KSBs, but the assessment feels
              like a normal day of maintenance work — because that is exactly what it is meant to
              replicate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Expect During the Practical Observation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Task briefing:</strong> You will be given a task or scenario — read it carefully, ask any clarifying questions, and plan your approach before starting</li>
                <li className="pl-1"><strong>Working under observation:</strong> The assessor watches and makes notes. Work as you normally would — methodically, safely, professionally</li>
                <li className="pl-1"><strong>Assessor questions:</strong> The assessor may ask questions during the task: "Why are you doing that?" "What reading do you expect?" These help them assess your understanding</li>
                <li className="pl-1"><strong>Safe isolation:</strong> This will always be assessed. Follow your standard procedure fully and correctly</li>
                <li className="pl-1"><strong>Documentation:</strong> You may be asked to complete paperwork as part of the task — treat it as you would in the workplace</li>
                <li className="pl-1"><strong>Clear-up:</strong> Leave the work area safe and tidy — this is noted by the assessor</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Talk Through Your Thinking</p>
              <p className="text-sm text-white">
                If you are comfortable doing so, explain your reasoning as you work: "I am going to
                test insulation resistance between phases and phase-to-earth because the symptoms
                suggest a winding fault." This helps the assessor understand your diagnostic process
                and demonstrates deeper knowledge. However, only do this if it feels natural —
                forced narration can be distracting.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safe Isolation Is Non-Negotiable</p>
              <p className="text-sm text-white">
                Every time you need to work on or near live equipment, you must follow your full safe
                isolation procedure: identify the correct circuit, isolate using the correct device,
                lock off, prove your voltage detector on a known supply, test for dead, prove your
                detector again. This sequence must be followed every time — shortcuts in safe
                isolation are the single most serious error you can make during the EPA.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Work as you normally would at your best — safely, methodically,
              professionally. The assessor is not looking for perfection; they are looking for
              competent, safe, professional practice. If you make a mistake, handle it professionally
              and continue.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Professional Discussion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The professional discussion is a structured conversation between you and the assessor,
              using your portfolio as the basis for questions. The assessor has reviewed your
              portfolio beforehand and will ask questions that probe your understanding, explore your
              reasoning, and assess your professional development.
            </p>

            <p>
              The discussion typically lasts 45-60 minutes and is conducted in a quiet, comfortable
              environment. It is not an interrogation — it is a professional conversation where you
              have the opportunity to demonstrate the depth of your knowledge and understanding. The
              assessor uses your portfolio as a starting point but will follow up with probing
              questions based on your answers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Discussion Question Styles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Describe:</strong> "Tell me about this activity in your portfolio" — explain what you did, in detail, in your own words</li>
                <li className="pl-1"><strong>Explain:</strong> "Why did you choose that approach?" — demonstrate your reasoning and underpinning knowledge</li>
                <li className="pl-1"><strong>Analyse:</strong> "What would you do differently next time?" — show reflective practice and learning</li>
                <li className="pl-1"><strong>Transfer:</strong> "How would you apply this to a different situation?" — demonstrate that your knowledge is transferable</li>
                <li className="pl-1"><strong>Evaluate:</strong> "What are the advantages and disadvantages of that method?" — show depth of understanding</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tips for the Professional Discussion</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use specific examples from your workplace experience, not generic textbook answers</li>
                <li className="pl-1">Refer to your portfolio evidence: "As shown in my work log WL-04, when I diagnosed the motor fault..."</li>
                <li className="pl-1">Explain your reasoning, not just your actions: "I chose to test insulation resistance first because..."</li>
                <li className="pl-1">Be honest if you are unsure: "I have not encountered that specific situation, but based on my understanding I would..."</li>
                <li className="pl-1">Show awareness of safety throughout your answers, even when the question is not specifically about safety</li>
                <li className="pl-1">Take a moment to think before answering — a considered response is better than a rushed one</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The professional discussion is a conversation, not an interrogation.
              The assessor wants to hear about your experience, your reasoning, and your development.
              Speak naturally, use real examples, and let your genuine knowledge and experience show
              through.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Practical Preparation for the Day
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Practical preparation for EPA day reduces stress and ensures you can focus on
              demonstrating your competence rather than worrying about logistics. Prepare everything
              the day before, plan your journey, and give yourself plenty of time.
            </p>

            <p>
              The morning of the EPA should feel like any other working day, with the same routine
              and the same level of preparation. If you have packed your bag the night before and
              know your route, you remove the variables that could create stress. Arrive early enough
              to settle in, check your equipment, and take a few minutes to compose yourself.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Day-Before Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Portfolio:</strong> Final check — all evidence present, well-organised, you can find anything quickly</li>
                <li className="pl-1"><strong>PPE:</strong> Clean, in good condition — safety boots, overalls, safety glasses, gloves</li>
                <li className="pl-1"><strong>Tools:</strong> If required — checked, clean, in good working order</li>
                <li className="pl-1"><strong>Test equipment:</strong> Batteries charged, calibration current, leads checked for damage</li>
                <li className="pl-1"><strong>Identification:</strong> Photo ID as required by the EPAO</li>
                <li className="pl-1"><strong>Route planned:</strong> Know where you are going, how long it takes, where to park</li>
                <li className="pl-1"><strong>Alarm set:</strong> Early enough to follow your normal morning routine without rushing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">On the Morning</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Normal routine:</strong> Eat your normal breakfast, follow your normal morning routine — familiarity reduces anxiety</li>
                <li className="pl-1"><strong>Travel calmly:</strong> Leave with plenty of time so you do not feel rushed — account for traffic or delays</li>
                <li className="pl-1"><strong>Arrive early:</strong> Give yourself at least 20-30 minutes to find the location, settle in, and compose yourself</li>
                <li className="pl-1"><strong>Equipment check:</strong> Verify your tools and test equipment are working before the assessment begins</li>
                <li className="pl-1"><strong>Brief portfolio review:</strong> A quick glance through your portfolio to refresh your memory on the key evidence</li>
                <li className="pl-1"><strong>Breathing exercise:</strong> If you feel nervous, a few slow, deep breaths will help you settle</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Preparation removes variables. The fewer things you have to
              worry about on the day, the more mental energy you can devote to the actual assessment.
              Prepare everything the evening before and get a good night's sleep.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handling the Unexpected
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              No matter how well you prepare, the EPA may present situations you did not anticipate.
              Unfamiliar equipment, an unexpected question, a mistake during the practical — these
              are not disasters. How you handle unexpected situations tells the assessor as much about
              your competence as how you handle the expected ones.
            </p>

            <p>
              The assessment plan is designed to test your ability to apply your knowledge and skills
              to real situations — and real situations are not always predictable. An assessor who
              sees you encounter something unfamiliar and respond calmly, systematically, and
              professionally is seeing exactly the kind of competence the EPA is designed to measure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Unexpected Situations and How to Handle Them</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Situation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How to Respond</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Unfamiliar equipment</td>
                      <td className="border border-white/10 px-3 py-2">Take time to read labels and documentation; apply general principles; ask the assessor if clarification is needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">You make a mistake</td>
                      <td className="border border-white/10 px-3 py-2">Acknowledge it, explain what went wrong, take corrective action, and continue professionally</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">You do not understand a question</td>
                      <td className="border border-white/10 px-3 py-2">Ask the assessor to rephrase or clarify — this is professional, not a weakness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">You blank on a topic</td>
                      <td className="border border-white/10 px-3 py-2">Take a breath, relate it to a practical experience, be honest about the limits of your knowledge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Unexpected test result</td>
                      <td className="border border-white/10 px-3 py-2">Explain what you expected, why the result differs, and what your next diagnostic step would be</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">You feel overwhelmed by nerves</td>
                      <td className="border border-white/10 px-3 py-2">Pause, take a slow breath, refocus on the immediate task — the assessor will be patient</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Mistakes Are Not Fatal</p>
              <p className="text-sm text-white">
                The assessor does not expect perfection. They expect professional competence — and
                part of professional competence is handling problems when they arise. A mistake that
                you recognise, address, and learn from demonstrates better professional judgement
                than attempting to hide it. Be honest, be methodical, and keep going.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The unexpected is where genuine competence shows. Anyone can
              follow a familiar procedure on familiar equipment. A competent professional can apply
              their knowledge and skills to novel situations, handle surprises calmly, and recover
              from mistakes professionally. This is exactly what the assessor is looking for.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            After the Assessment: Grading and Next Steps
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once the EPA is complete, the assessor submits their assessment records to the EPAO
              for quality assurance and grading. Results are typically confirmed within a few weeks
              and communicated through your training provider. You will not receive your result on
              the day — the quality assurance process ensures all grades are fair and consistent.
            </p>

            <p>
              Regardless of how you feel the assessment went, try to reflect constructively. What
              went well? What would you do differently? This reflection is valuable professional
              practice and will serve you well whether you pass, achieve a distinction, or need to
              retake a component.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Understanding the Grading Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Component grades:</strong> Each EPA component is graded against specific criteria (typically pass or distinction)</li>
                <li className="pl-1"><strong>Overall grade:</strong> Component grades are combined according to rules in the assessment plan to determine the final grade</li>
                <li className="pl-1"><strong>Quality assurance:</strong> The EPAO's internal quality assurance process verifies the assessor's judgements before results are confirmed</li>
                <li className="pl-1"><strong>Results communication:</strong> Your training provider receives the confirmed results and communicates them to you and your employer</li>
                <li className="pl-1"><strong>Certificate:</strong> A successful result leads to the apprenticeship certificate being issued by the ESFA</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Happens Next</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pass:</strong> Congratulations — you are now a qualified engineering maintenance technician. Consider EngTech registration and your career development plan</li>
                <li className="pl-1"><strong>Distinction:</strong> Exceptional achievement — this demonstrates competence above the standard expected and is highly valued by employers</li>
                <li className="pl-1"><strong>Retake:</strong> If a component is not passed, you are entitled to one retake within the timeframe specified. Your training provider will support your preparation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Career Progression After EPA</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EngTech registration:</strong> Achieving your apprenticeship can support your application for Engineering Technician status with a professional body</li>
                <li className="pl-1"><strong>Further qualifications:</strong> Many technicians progress to HNC, HND or degree-level qualifications in engineering</li>
                <li className="pl-1"><strong>Specialisation:</strong> You may choose to specialise in a specific area such as automation, control systems, or electrical maintenance</li>
                <li className="pl-1"><strong>Supervision and management:</strong> With experience, progression to supervisory or management roles is a natural career path</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Completing the EPA marks the end of your apprenticeship and
              the beginning of your career as a qualified engineering maintenance technician. Everything
              you have learned — from Module 1 through to this final preparation — has built your
              competence and confidence. The EPA is simply the final verification that you are ready
              to work independently as a professional. You have earned this.
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
              <li className="pl-1">The EPA consists of a practical observation (3-5 hours) and professional discussion (45-60 minutes)</li>
              <li className="pl-1">Arrive early with all equipment, PPE, portfolio and identification prepared the night before</li>
              <li className="pl-1">Safe isolation must be performed fully and correctly every time — no shortcuts</li>
              <li className="pl-1">Work methodically and safely — the assessor values your approach, not just the end result</li>
              <li className="pl-1">Use specific workplace examples in the professional discussion, not generic textbook answers</li>
              <li className="pl-1">Ask for clarification if you do not understand a question — this is professional, not weak</li>
              <li className="pl-1">Results are confirmed within a few weeks after quality assurance by the EPAO</li>
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
            title="Test Your Knowledge — EPA Day Preparation"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Final Revision
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7">
              Back to Module 7 Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section5_4;
