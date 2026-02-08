import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Exam Techniques and Strategies - MOET Module 7 Section 1.5";
const DESCRIPTION = "Comprehensive exam techniques covering reading all options, first instinct, process of elimination, managing anxiety, physical preparation and on-the-day routine for the EPA knowledge test.";

const quickCheckQuestions = [
  {
    id: "read-all-options",
    question: "Why is it important to read ALL options before selecting your answer?",
    options: [
      "It wastes time deliberately",
      "The first option might seem correct but a later option may be more complete or accurate",
      "The exam software requires you to view all options",
      "It is only necessary for difficult questions"
    ],
    correctIndex: 1,
    explanation: "Reading all options is essential because 'best answer' questions may have a partially correct early option alongside a more complete or accurate later option. Selecting the first plausible answer without reading all options is one of the most common causes of lost marks."
  },
  {
    id: "physical-preparation",
    question: "Which of the following is the MOST important physical preparation for exam day?",
    options: [
      "Wearing smart clothes to make a good impression",
      "Getting adequate sleep the night before and eating a proper breakfast",
      "Arriving exactly on time, not early",
      "Drinking several cups of coffee to stay alert"
    ],
    correctIndex: 1,
    explanation: "Cognitive performance is significantly affected by sleep quality and nutrition. A full night's sleep and a proper breakfast ensure your brain has the energy and rest needed for sustained concentration. Caffeine in excess can increase anxiety and reduce focus."
  },
  {
    id: "first-instinct",
    question: "Research on the 'first instinct fallacy' shows that:",
    options: [
      "Your first answer is always correct",
      "You should never change your answer",
      "Carefully considered changes are more often correct than the original answer",
      "Changing answers always reduces your score"
    ],
    correctIndex: 2,
    explanation: "The belief that your first instinct is always right is a well-documented cognitive bias. Research shows that when candidates change answers based on careful reconsideration (not anxiety), the change is more likely to be from wrong to right than right to wrong."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Before looking at the answer options, you should:",
    options: [
      "Try to predict the correct answer based on the stem alone",
      "Read the options first to see what topics are covered",
      "Skip the stem and scan for familiar words in the options",
      "Close your eyes and guess"
    ],
    correctAnswer: 0,
    explanation: "Predicting the answer before looking at options reduces the influence of plausible distractors. If your predicted answer matches an option, you can select it with high confidence. This technique is called 'cover the options' and is used by top-performing candidates."
  },
  {
    id: 2,
    question: "The process of elimination is most useful when:",
    options: [
      "You know the correct answer immediately",
      "You are uncertain and need to narrow down the options systematically",
      "All options look equally wrong",
      "You have unlimited time"
    ],
    correctAnswer: 1,
    explanation: "Elimination is most powerful when you are uncertain. By removing options you know are wrong, you reduce the field and increase your probability of selecting correctly. Even eliminating one of four options raises your chance from 25% to 33%."
  },
  {
    id: 3,
    question: "On the morning of the EPA knowledge test, you should:",
    options: [
      "Cram as much new material as possible",
      "Skip breakfast to arrive early",
      "Eat well, do light revision of key facts only, and arrive with time to settle",
      "Stay up late the night before finishing revision"
    ],
    correctAnswer: 2,
    explanation: "The morning of the exam is not the time for new learning. Eat a proper meal, glance at key revision notes for confidence, and arrive early enough to settle without rushing. Your preparation over previous weeks is what will carry you through."
  },
  {
    id: 4,
    question: "If you experience a 'mind blank' during the exam, the recommended approach is to:",
    options: [
      "Panic and leave the exam",
      "Stare at the question until the answer comes",
      "Move to the next question, and return later — a change of focus often triggers recall",
      "Close the test and request a resit"
    ],
    correctAnswer: 2,
    explanation: "Mind blanks are temporary and common under exam stress. Moving to a different question changes your cognitive focus and often triggers the recall you need for the earlier question. The two-pass strategy naturally accommodates this."
  },
  {
    id: 5,
    question: "Absolute words like 'always' and 'never' in answer options are often indicators of:",
    options: [
      "The correct answer",
      "A distractor, because most rules in electrical maintenance have exceptions",
      "The most complete answer",
      "A question that should be skipped"
    ],
    correctAnswer: 1,
    explanation: "In electrical maintenance, very few rules are absolute. Statements containing 'always' or 'never' are frequently distractors because exceptions almost always exist. Options with qualifiers like 'usually', 'in most cases', or 'generally' are more often correct."
  },
  {
    id: 6,
    question: "How much sleep is recommended the night before the EPA?",
    options: [
      "4-5 hours to allow time for late revision",
      "7-9 hours of quality sleep",
      "As much as possible — 12 hours or more",
      "Sleep does not affect exam performance"
    ],
    correctAnswer: 1,
    explanation: "Research consistently shows that 7-9 hours of sleep is optimal for cognitive performance. Sleep consolidates learning and restores working memory capacity. Both too little and excessive sleep can impair performance."
  },
  {
    id: 7,
    question: "When two options appear very similar, it usually means:",
    options: [
      "Neither is correct",
      "Both are correct",
      "The correct answer is likely one of these two — the difference between them is the key detail",
      "You should choose a different option entirely"
    ],
    correctAnswer: 2,
    explanation: "When two options are very similar, the exam writer is testing whether you can distinguish between related concepts. Focus carefully on the specific difference between the two similar options — this difference is usually the key to selecting correctly."
  },
  {
    id: 8,
    question: "What items should you bring to the EPA knowledge test?",
    options: [
      "Your phone, notes, and a calculator",
      "Photo ID, a pen (if paper-based), permitted calculator, and water",
      "Only your phone for identification",
      "Nothing — everything is provided"
    ],
    correctAnswer: 1,
    explanation: "Check with your EPAO for specific requirements, but typically you need: photo ID (driving licence or passport), a pen if the test is paper-based, a permitted calculator if allowed, and water. Phones and notes are not permitted in the test room."
  },
  {
    id: 9,
    question: "The recommended breathing technique for managing exam anxiety is:",
    options: [
      "Breathe as fast as possible to increase oxygen",
      "Hold your breath for as long as possible",
      "Slow, controlled breathing — inhale for 4 seconds, hold for 4, exhale for 6",
      "Breathing techniques have no effect on anxiety"
    ],
    correctAnswer: 2,
    explanation: "Slow, controlled breathing activates the parasympathetic nervous system, which counteracts the fight-or-flight response. The 4-4-6 pattern (inhale 4, hold 4, exhale 6) is particularly effective because the extended exhale promotes calm."
  },
  {
    id: 10,
    question: "If you finish the exam with 10 minutes remaining, you should:",
    options: [
      "Submit immediately to avoid changing correct answers",
      "Use the time to review all answers, checking for misread questions and unanswered items",
      "Start writing notes for the next EPA component",
      "Close your eyes and wait"
    ],
    correctAnswer: 1,
    explanation: "Extra time is valuable. Review all answers checking for: unanswered questions, misread stems (especially negative questions), and flagged items. Only change answers where you have a clear reason. This review time often catches 1-3 errors."
  },
  {
    id: 11,
    question: "On-the-day routine should include arriving at the test centre:",
    options: [
      "Exactly on time",
      "15-20 minutes early to allow time to settle and reduce rushing anxiety",
      "1 hour early to cram in the car park",
      "Late, to reduce waiting time anxiety"
    ],
    correctAnswer: 1,
    explanation: "Arriving 15-20 minutes early gives you time to find the room, complete any registration, use the facilities, and settle without rushing. Arriving too early can increase anxiety from waiting; arriving late creates panic. 15-20 minutes is the ideal balance."
  },
  {
    id: 12,
    question: "After completing the EPA knowledge test, you should:",
    options: [
      "Immediately discuss every question with other candidates",
      "Take a break, avoid analysing individual questions, and focus on preparing for the next EPA component",
      "Start studying for a resit immediately",
      "Contact the EPAO to challenge questions you found difficult"
    ],
    correctAnswer: 1,
    explanation: "Post-exam analysis with other candidates typically increases anxiety rather than helping. You cannot change your answers, and different memories of questions cause confusion. Instead, take a break and redirect your energy toward the remaining EPA components."
  }
];

const faqs = [
  {
    question: "What if I have a diagnosed learning difficulty such as dyslexia?",
    answer: "If you have a diagnosed learning difficulty, you may be entitled to reasonable adjustments such as extra time (typically 25%), a reader, or a separate room. Discuss this with your training provider well before the EPA date — adjustments must be agreed with the EPAO in advance and usually require supporting evidence from an educational psychologist or specialist assessor."
  },
  {
    question: "Can I take breaks during the knowledge test?",
    answer: "Typically, no breaks are permitted during the 60-minute knowledge test. If you have a medical condition that requires breaks, this must be arranged as a reasonable adjustment with the EPAO before the test date. Otherwise, use the facilities before the test begins."
  },
  {
    question: "Is it true that longer answer options are more likely to be correct?",
    answer: "This is a common exam myth. While some poorly written questions may have longer correct answers (because the correct answer needs more qualifying detail), well-written EPA questions do not follow this pattern. Do not use answer length as a strategy — base your selection on content and reasoning."
  },
  {
    question: "What happens if I feel unwell on the day of the EPA?",
    answer: "If you are genuinely unwell on the day, contact your training provider and the EPAO as soon as possible. You may be able to defer to a later date without penalty, provided you have supporting evidence (e.g., a medical note). Do not attempt the test while significantly unwell, as your performance will be impaired and a resit may be harder to arrange than a deferral."
  },
  {
    question: "How long after the test do I receive my results?",
    answer: "Results timelines vary by EPAO. Some provide results on the day (for computer-based tests with automatic marking). Others take 2-4 weeks for moderation and quality assurance. Your training provider will advise you on the expected timeline. The knowledge test result is combined with the practical observation and portfolio interview to determine your overall EPA grade."
  }
];

const MOETModule7Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Exam Techniques and Strategies
          </h1>
          <p className="text-white/80">
            Proven techniques for maximising your score on the EPA knowledge test
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Read all options:</strong> Never select the first plausible answer</li>
              <li className="pl-1"><strong>Eliminate:</strong> Remove wrong options to improve odds</li>
              <li className="pl-1"><strong>Absolutes:</strong> 'Always/never' options are often distractors</li>
              <li className="pl-1"><strong>Prepare:</strong> Sleep, eat, arrive early, breathe slowly</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safety first:</strong> When unsure, the safety answer is often correct</li>
              <li className="pl-1"><strong>Regulations:</strong> Know BS 7671, EAWR, GS38 key points</li>
              <li className="pl-1"><strong>Practical link:</strong> Relate questions to your workplace experience</li>
              <li className="pl-1"><strong>ST1426:</strong> Knowledge test contributes to overall EPA grade</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the technique of reading all options before selecting an answer",
              "Understand the first instinct fallacy and when to change answers",
              "Use the process of elimination to improve accuracy on uncertain questions",
              "Manage exam anxiety through breathing techniques and positive self-talk",
              "Prepare physically for the exam with proper sleep, nutrition and routine",
              "Execute an effective on-the-day routine from arrival to submission"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Reading All Options and the Cover Technique
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              One of the most common mistakes in MCQ tests is selecting the first option that looks correct without
              reading all alternatives. This is particularly dangerous with "best answer" questions, where multiple
              options may be partially correct but one is more complete or more accurate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Cover Technique</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Read the stem:</strong> Fully understand what is being asked</li>
                <li className="pl-1"><strong>Cover the options:</strong> Mentally or physically cover the answer choices</li>
                <li className="pl-1"><strong>Predict your answer:</strong> Think about what the correct answer should be</li>
                <li className="pl-1"><strong>Uncover and read all options:</strong> Compare each option against your prediction</li>
                <li className="pl-1"><strong>Select the best match:</strong> Choose the option closest to your predicted answer</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Watch Out For</p>
              <p className="text-sm text-white">
                Option A may be true but incomplete. Option C may include the same information as A plus additional
                correct detail. If you selected A without reading C, you would miss the better answer. This is
                particularly common in questions about safety procedures, where one option describes part of the
                process and another describes the complete process.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always read every option. The 10 seconds it takes to read all four options
              can prevent the loss of marks that took weeks of study to earn.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            First Instinct and Changing Answers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The "first instinct fallacy" is one of the most persistent myths in exam taking. Many candidates believe
              their first answer is always correct and are reluctant to change answers. Research contradicts this —
              studies show that carefully considered changes are more often from wrong to right than the reverse.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Change an Answer</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Change:</strong> You misread the question and now realise what it actually asks</li>
                <li className="pl-1"><strong>Change:</strong> You recalled a specific fact or principle that makes a different option clearly correct</li>
                <li className="pl-1"><strong>Change:</strong> Another question triggered knowledge relevant to this one</li>
                <li className="pl-1"><strong>Do not change:</strong> You are simply anxious about your selection</li>
                <li className="pl-1"><strong>Do not change:</strong> You cannot articulate a specific reason for the change</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Rule of Reason</h3>
              <p className="text-sm text-white">
                Only change an answer if you can state a specific reason. "I now remember that Regulation 411.3.3
                requires 0.2 seconds for TT systems, not 0.4 seconds" is a valid reason. "I just feel like option
                C might be better" is not. This simple rule prevents anxiety-driven changes while allowing
                knowledge-driven corrections.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Trust your reasoning, not your anxiety. If you have a clear reason to change,
              change with confidence. If you do not, keep your original answer.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Managing Anxiety and Building Confidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Exam anxiety is a physiological response — your body's fight-or-flight system activating in response
              to perceived threat. While you cannot eliminate this response entirely, you can manage it effectively
              using techniques that have been proven to work under pressure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 4-4-6 Breathing Technique</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Inhale slowly</strong> through your nose for 4 seconds</li>
                <li className="pl-1"><strong>Hold</strong> for 4 seconds</li>
                <li className="pl-1"><strong>Exhale slowly</strong> through your mouth for 6 seconds</li>
                <li className="pl-1"><strong>Repeat</strong> 3-4 times until you feel calmer</li>
              </ol>
              <p className="text-sm text-white/70 mt-2">
                The extended exhale activates the parasympathetic nervous system, counteracting the stress response.
                Practise this technique before mock tests so it becomes automatic under pressure.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cognitive Reframing</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Replace "I'm going to fail" with "I've prepared well"</li>
                  <li className="pl-1">Replace "I don't know anything" with "I know many topics well"</li>
                  <li className="pl-1">Replace "This is impossible" with "I'll take it one question at a time"</li>
                  <li className="pl-1">Replace "Everyone else knows more" with "I'm ready for this"</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Techniques</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Progressive muscle relaxation — tense and release shoulder muscles</li>
                  <li className="pl-1">Ground yourself — feel your feet on the floor, hands on the desk</li>
                  <li className="pl-1">Unclench your jaw and relax your face</li>
                  <li className="pl-1">Sit upright — posture affects confidence and breathing</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Some nervousness is normal and even helpful — it sharpens your focus. The goal
              is not to eliminate all anxiety but to keep it at a manageable level where it helps rather than hinders.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Physical Preparation and On-the-Day Routine
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Your brain is a physical organ that requires proper fuel, rest and conditions to perform at its best.
              Physical preparation for the exam is not an afterthought — it is as important as your knowledge revision.
              Candidates who are well-rested and properly nourished consistently outperform those who crammed all night
              on an empty stomach.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Week Before</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Establish sleep routine:</strong> Go to bed and wake at consistent times</li>
                <li className="pl-1"><strong>Light revision only:</strong> Review key facts, do not learn new material</li>
                <li className="pl-1"><strong>Prepare materials:</strong> Check ID, gather permitted items, plan your route</li>
                <li className="pl-1"><strong>Physical activity:</strong> Moderate exercise reduces anxiety and improves sleep</li>
                <li className="pl-1"><strong>Reduce caffeine:</strong> Avoid excessive coffee/energy drinks that disrupt sleep</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">On-the-Day Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Morning:</strong> Wake with plenty of time — no rushing</li>
                <li className="pl-1"><strong>Breakfast:</strong> Protein and complex carbohydrates — eggs, porridge, toast</li>
                <li className="pl-1"><strong>Hydrate:</strong> Drink water — dehydration impairs concentration</li>
                <li className="pl-1"><strong>Bring:</strong> Photo ID, pen, permitted calculator, water, light snack</li>
                <li className="pl-1"><strong>Arrive:</strong> 15-20 minutes early — use facilities, settle, breathe</li>
                <li className="pl-1"><strong>Avoid:</strong> Do not discuss the exam with other candidates beforehand</li>
                <li className="pl-1"><strong>Final check:</strong> Phone off, notes away, timer visible (if provided)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Night Before</p>
              <p className="text-sm text-white">
                Do not cram. Your brain needs sleep to consolidate the knowledge you have already learned. A brief
                glance at your revision summary (30 minutes maximum) followed by relaxation and early bed is the
                optimal approach. Cramming until midnight will leave you tired, anxious and less able to recall
                information under pressure.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Treat the exam like a work task that requires you to be at your best.
              A well-rested, well-fed, prepared candidate will always outperform a tired, hungry, flustered one —
              even if the flustered one spent more hours studying.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Exam Techniques" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Identifying Knowledge Gaps
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1">
              Back to Section Hub
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section1_5;
