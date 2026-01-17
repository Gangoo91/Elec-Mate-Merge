import { Clock, CheckCircle, Monitor, FileText, Eye, Lightbulb, Target, BookOpen } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module6Section1 = () => {
  useSEO(
    "Format and Structure of the Online Test | AM2 Module 6 Section 1",
    "Understanding the AM2 online knowledge test format, timing, question types and strategies for success"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "test-duration",
      question: "How long is allocated for the AM2 knowledge test?",
      options: [
        "60 minutes",
        "75 minutes",
        "90 minutes",
        "120 minutes"
      ],
      correctIndex: 2,
      explanation: "The AM2 online knowledge test has a duration of 90 minutes for 30 questions."
    },
    {
      id: "unsure-strategy",
      question: "What should you do if you're unsure of a question?",
      options: [
        "Guess randomly and move on",
        "Spend extra time working it out",
        "Flag it and move on - come back later if time allows",
        "Leave it blank"
      ],
      correctIndex: 2,
      explanation: "Flag uncertain questions and return to them later. This prevents getting stuck and running out of time."
    },
    {
      id: "question-navigation",
      question: "True or false: You can't go back once you've answered a question.",
      options: [
        "True - you must answer in order",
        "False - you can move backwards and forwards through the paper",
        "True - only forward navigation is allowed",
        "False - but only within the same section"
      ],
      correctIndex: 1,
      explanation: "You can navigate forwards and backwards through the test and flag questions to return to them later."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "How long does the AM2 online knowledge test last?",
      options: ["60 minutes", "75 minutes", "90 minutes", "120 minutes"],
      correctAnswer: 2,
      explanation: "The AM2 online knowledge test has a duration of 90 minutes to complete 30 questions."
    },
    {
      id: 2,
      question: "How many questions are typically in the test?",
      options: ["20-25", "30-40", "45-50", "50-60"],
      correctAnswer: 1,
      explanation: "The test contains 30 multiple-choice questions covering regulations, science, and safety."
    },
    {
      id: 3,
      question: "What is the approximate pass mark?",
      options: ["50-55%", "60-65%", "70-75%", "80-85%"],
      correctAnswer: 1,
      explanation: "The pass mark is 60%, requiring 18 correct answers out of 30 questions."
    },
    {
      id: 4,
      question: "What types of questions are included?",
      options: [
        "Only regulation references",
        "Only science and calculations",
        "Regulations, science, safety, and scenario-based questions",
        "Only health and safety"
      ],
      correctAnswer: 2,
      explanation: "The test includes straight knowledge, applied scenarios, regulation references, science principles, and health & safety."
    },
    {
      id: 5,
      question: "What's the best strategy if you don't know an answer straight away?",
      options: [
        "Guess randomly",
        "Spend 10 minutes working it out",
        "Flag it and move on to return later",
        "Leave it blank"
      ],
      correctAnswer: 2,
      explanation: "Flag uncertain questions and continue. Return to them if time allows. This prevents getting stuck and ensures you attempt all questions."
    },
    {
      id: 6,
      question: "How much time should you spend per question on average?",
      options: ["1-2 minutes", "2-3 minutes", "4-5 minutes", "5-10 minutes"],
      correctAnswer: 1,
      explanation: "With 90 minutes for 30 questions, 3 minutes per question allows time for review and flagged questions."
    },
    {
      id: 7,
      question: "Why do many candidates fail this section even if they know the material?",
      options: [
        "Questions are too difficult",
        "Time mismanagement and not attempting all questions",
        "Equipment failure",
        "Assessor bias"
      ],
      correctAnswer: 1,
      explanation: "Poor time management, getting stuck on difficult questions, and leaving questions blank are common reasons for failure despite good knowledge."
    },
    {
      id: 8,
      question: "What's the advantage of eliminating wrong options first?",
      options: [
        "It saves time",
        "It narrows down choices and improves accuracy",
        "It impresses the assessor",
        "It's required by the system"
      ],
      correctAnswer: 1,
      explanation: "Eliminating obviously wrong answers narrows your choices and significantly improves your chances of selecting the correct answer."
    },
    {
      id: 9,
      question: "What's the golden rule about leaving questions blank?",
      options: [
        "Leave difficult questions blank",
        "Only answer questions you're 100% sure about",
        "Answer every question - there's no penalty for guessing",
        "Leave 2-3 questions blank for time management"
      ],
      correctAnswer: 2,
      explanation: "Never leave questions blank. There's no penalty for incorrect answers, so always make an educated guess rather than leaving blanks."
    },
    {
      id: 10,
      question: "What format is the AM2 online knowledge test?",
      options: [
        "Written essay questions",
        "Multiple-choice with one correct answer",
        "True/false questions only",
        "Mixed format with essays and multiple choice"
      ],
      correctAnswer: 1,
      explanation: "The test is entirely multiple-choice format, with one correct answer (or sometimes 'best' answer) for each question."
    }
  ];

  const learningOutcomes = [
    "Describe the format of the online AM2 knowledge test, including timing and number of questions",
    "Explain the types of questions asked (multiple-choice, scenario-based, regulation references)",
    "Recognise how marks are awarded and what score is needed to pass",
    "Apply strategies for working through the test efficiently",
    "Approach the assessment with confidence, knowing exactly what to expect"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module6"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 6", href: "/study-centre/apprentice/am2/module6" },
        { label: "Section 1" }
      ]}
    >
      <AM2HeroSection
        icon={Clock}
        title="Format and Structure of the Online Test"
        description="The AM2 online knowledge test is a computer-based, multiple-choice exam. It assesses your knowledge of electrical regulations, science, and safety, alongside your ability to apply theory to real-world situations. The test lasts 90 minutes and contains 30 questions."
        badge="Module 6 - Section 1"
      />

      <div className="space-y-6">
        {/* Introduction */}
        <AM2ContentCard>
          <p className="text-ios-body text-white/80 leading-relaxed">
            Understanding the test format is essential for managing your time and answering confidently. Many candidates fail this section not because they don't know the content, but because they mismanage their time or misunderstand the question style.
          </p>
        </AM2ContentCard>

        {/* Critical Warning */}
        <AM2CriticalWarning title="CRITICAL: Time Management is Everything">
          <p className="text-ios-callout text-white/80 mb-3 leading-relaxed">
            Many candidates fail the knowledge test not due to lack of knowledge, but poor time management. Getting stuck on difficult questions and leaving others blank is a guaranteed route to failure.
          </p>
          <p className="text-ios-callout text-white/80 font-medium leading-relaxed">
            You must attempt every question. There's no penalty for guessing, but blank answers guarantee lost marks.
          </p>
        </AM2CriticalWarning>

        {/* Learning Outcomes */}
        <AM2LearningOutcomes outcomes={learningOutcomes} />

        {/* Test Structure */}
        <AM2ContentCard
          title="1. Understanding the Test Structure"
          icon={Monitor}
        >
          <div className="space-y-4">
            <p className="text-ios-body text-white/80 leading-relaxed">
              The AM2 knowledge test is delivered in a controlled environment at approved assessment centres across the UK. Understanding exactly what to expect will help you feel more confident and perform better on the day.
            </p>

            <p className="text-ios-callout text-white/80 leading-relaxed">
              <strong className="text-white">Test Environment and Logistics:</strong> You'll be seated at a computer workstation in a quiet examination room. The test is supervised by qualified invigilators who will ensure fair conditions throughout. Before beginning, you'll receive a brief demonstration of the test software and navigation features.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Key Test Parameters:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Duration:</strong> Exactly 90 minutes from when you start the test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Question Count:</strong> 30 questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Question Format:</strong> Multiple-choice with 4 possible answers per question</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Pass Mark:</strong> 60% (18 correct answers out of 30)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Marking:</strong> One mark per correct answer, no penalty for wrong answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80"><strong className="text-white">Results:</strong> Available immediately upon completion</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Time Management Breakdown:</h4>
              <p className="text-ios-callout text-white/80 mb-3 leading-relaxed">
                With 90 minutes for 30 questions, you have exactly 3 minutes per question. However, this doesn't mean you should spend exactly this time on each question. The most effective approach is:
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Quick wins:</strong> Answer straightforward questions immediately (30-60 seconds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Standard questions:</strong> Take 2-3 minutes for typical questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Complex scenarios:</strong> Allow up to 4-5 minutes for challenging questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Review time:</strong> Reserve 10-15 minutes at the end for flagged questions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Important Test Rules:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">No mobile phones, calculators, or reference materials allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">You cannot pause the test once started</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">All questions must be attempted - blank answers receive zero marks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">You can change answers until you submit the test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">The test auto-submits when time expires</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Question Types */}
        <AM2ContentCard
          title="2. Question Types and Content Areas"
          icon={FileText}
          accent
        >
          <div className="space-y-4">
            <p className="text-ios-body text-white/80 leading-relaxed">
              The AM2 knowledge test covers five main types of questions, each designed to assess different aspects of your electrical knowledge and competence.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Straight Knowledge Questions (25-30% of test)</h4>
              <p className="text-ios-callout text-white/80 mb-2 leading-relaxed">
                These questions test your direct recall of facts, figures, and regulations from BS 7671 and related standards.
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Example topics:</strong> IP ratings, cable current ratings, diversity factors, protective device characteristics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Strategy:</strong> These should be quick wins - if you know it, answer immediately. If not, flag and move on</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Applied Scenario Questions (35-40% of test)</h4>
              <p className="text-ios-callout text-white/80 mb-2 leading-relaxed">
                These questions present real-world electrical situations and ask you to apply your knowledge to solve problems or make decisions.
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Common scenarios:</strong> Test results interpretation, fault symptoms, remedial actions, compliance issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Strategy:</strong> Read the scenario carefully, identify what's happening, then consider what regulations or procedures apply</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Regulation Reference Questions (15-20% of test)</h4>
              <p className="text-ios-callout text-white/80 mb-2 leading-relaxed">
                These questions require you to know which specific regulations apply in given situations.
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Example areas:</strong> Regulation numbers for specific requirements, table references, appendix content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Strategy:</strong> Learn key regulation numbers and their purposes rather than trying to memorise everything</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Calculation and Science Questions (20-25% of test)</h4>
              <p className="text-ios-callout text-white/80 mb-2 leading-relaxed">
                These questions test your understanding of electrical principles and ability to perform basic calculations.
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Common topics:</strong> Ohm's law applications, power calculations, voltage drop, fault current, cable sizing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Strategy:</strong> Show your working mentally and double-check calculations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Health and Safety Questions (10-15% of test)</h4>
              <p className="text-ios-callout text-white/80 mb-2 leading-relaxed">
                These questions cover safe working practices, risk assessment, PPE requirements, and legal obligations.
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Key areas:</strong> CDM regulations, risk assessment, safe isolation, PPE, working at height</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Strategy:</strong> Think about best practice and legal requirements - safety is always the priority</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Assessor Expectations */}
        <AM2ContentCard
          title="3. Assessor Expectations"
          icon={Target}
        >
          <p className="text-ios-callout text-white/80 mb-4 leading-relaxed">
            Assessors don't just want correct answers - they want to see that you:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/80">
                Understand how to approach scenario-based questions, not just memorise facts
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/80">
                Use regulation knowledge to choose the correct answer
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/80">
                Manage your time and attempt every question (no blanks)
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Test-Taking Strategies */}
        <AM2ContentCard
          title="4. Test-Taking Strategies and Practical Guidance"
          icon={Lightbulb}
        >
          <div className="space-y-4">
            <p className="text-ios-body text-white/80 leading-relaxed">
              Success in the AM2 knowledge test depends not just on what you know, but how effectively you apply your knowledge under time pressure.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Before You Begin:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Arrive early:</strong> Get to the test centre 15-20 minutes before your appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Listen to the briefing:</strong> Pay attention to any last-minute instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Familiarise with interface:</strong> Take the practice questions seriously</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Mental preparation:</strong> Take a deep breath and remind yourself you've prepared thoroughly</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Reading and Understanding Questions:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Read the entire question:</strong> Don't assume after reading the first few words</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Identify key words:</strong> Look for "minimum", "maximum", "not", "except", "best"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Check for negatives:</strong> Questions asking what "should NOT" be done catch many candidates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Elimination Strategy:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Look for extreme values:</strong> Unusually high or low answers are often incorrect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Eliminate unsafe options:</strong> Any answer that would create a safety hazard is likely wrong</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Use your experience:</strong> What would you actually do in this situation on site?</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-3">Time Management Techniques:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Quick scan first:</strong> Identify easy questions you can answer immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Set time checkpoints:</strong> 50% in 40 minutes, 75% in 60 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Don't get stuck:</strong> If more than 4-5 minutes on a question, flag it and move on</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70"><strong className="text-white/90">Save time for review:</strong> Finish with 10-15 minutes for flagged questions</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Real-world Examples */}
        <AM2ContentCard
          title="5. Real-World Examples"
          icon={Eye}
        >
          <div className="space-y-4">
            <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-red-200 mb-2">Example 1: Poor Time Management</h4>
              <p className="text-ios-callout text-white/80">
                Candidate spent 15 minutes stuck on one science question, ran out of time, and left 5 unanswered. <strong className="text-white">Failed.</strong>
              </p>
            </div>

            <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-green-200 mb-2">Example 2: Smart Strategy</h4>
              <p className="text-ios-callout text-white/80">
                Candidate flagged 3 questions, completed the rest, then came back with fresh focus and answered correctly. <strong className="text-white">Passed.</strong>
              </p>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/30 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-amber-200 mb-2">Example 3: Rushing Error</h4>
              <p className="text-ios-callout text-white/80">
                Candidate misread a question on Zs values and picked the maximum permitted value instead of actual measured. Lost marks through rushing.
              </p>
            </div>
          </div>
        </AM2ContentCard>

        {/* FAQs */}
        <AM2ContentCard
          title="6. Frequently Asked Questions"
          icon={FileText}
        >
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">Q1: How many questions are in the knowledge test?</h4>
              <p className="text-ios-callout text-white/80">A: 30 questions.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">Q2: How long do I have?</h4>
              <p className="text-ios-callout text-white/80">A: 90 minutes.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">Q3: What's the pass mark?</h4>
              <p className="text-ios-callout text-white/80">A: 60% (18 correct answers out of 30).</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">Q4: Can I skip and return to questions?</h4>
              <p className="text-ios-callout text-white/80">A: Yes - flag them in the system.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">Q5: Are questions only on regs?</h4>
              <p className="text-ios-callout text-white/80">A: No - they cover regs, science, and safety.</p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Summary */}
        <AM2ContentCard
          title="Summary"
          icon={BookOpen}
          accent
        >
          <p className="text-ios-body text-white/80 leading-relaxed">
            The AM2 online knowledge test is a 90-minute, multiple-choice exam with 30 questions covering regs, science, and safety. Success depends not only on knowledge but also on managing your time and answering every question. Assessors expect candidates to work methodically, avoid rushing, and use strategies like flagging tricky questions.
          </p>
        </AM2ContentCard>

        {/* Quiz Section */}
        <div className="border-t border-white/10 pt-8">
          <Quiz
            title="Test Your Knowledge: Online Test Format"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <AM2NavigationFooter
          previousHref="/study-centre/apprentice/am2/module6"
          previousLabel="Module 6 Overview"
          nextHref="../section2"
          nextLabel="Core Topics"
          currentSection={1}
          totalSections={4}
        />
      </div>
    </AM2SectionLayout>
  );
};

export default AM2Module6Section1;
