import { ArrowLeft, ArrowRight, Clock, CheckCircle, AlertTriangle, Monitor, BookOpen, Timer, Target, FileText, Eye, Search, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        "Flag it and move on — come back later if time allows",
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 6</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="../section2">
                <span className="hidden xs:inline">Module 6 Section 2</span>
                <span className="xs:hidden">Section 2</span>
                <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <Clock className="w-4 h-4" />
            Module 6 – Section 1
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Format and Structure of the Online Test
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            The AM2 online knowledge test is a computer-based, multiple-choice exam. It assesses your knowledge of electrical regulations, science, and safety, alongside your ability to apply theory to real-world situations. The test lasts 90 minutes and contains 30 questions.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Understanding the test format is essential for managing your time and answering confidently. Many candidates fail this section not because they don't know the content, but because they mismanage their time or misunderstand the question style.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Time Management is Everything
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Many candidates fail the knowledge test not due to lack of knowledge, but poor time management. Getting stuck on difficult questions and leaving others blank is a guaranteed route to failure.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  You must attempt every question. There's no penalty for guessing, but blank answers guarantee lost marks.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              By the end of this section, you will be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Describe the format of the online AM2 knowledge test, including timing and number of questions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Explain the types of questions asked (multiple-choice, scenario-based, regulation references)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Recognise how marks are awarded and what score is needed to pass
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Apply strategies for working through the test efficiently
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Approach the assessment with confidence, knowing exactly what to expect
              </li>
            </ul>
          </div>
        </Card>

        {/* Basic Structure and Understanding */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              1. Understanding the Test Structure
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                The AM2 knowledge test is delivered in a controlled environment at approved assessment centres across the UK. Understanding exactly what to expect will help you feel more confident and perform better on the day.
              </p>
              
              <p>
                <strong>Test Environment and Logistics:</strong> You'll be seated at a computer workstation in a quiet examination room. The test is supervised by qualified invigilators who will ensure fair conditions throughout. Before beginning, you'll receive a brief demonstration of the test software and navigation features.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Key Test Parameters:</h3>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Duration:</strong> Exactly 90 minutes from when you start the test</li>
                <li>• <strong>Question Count:</strong> 30 questions</li>
                <li>• <strong>Question Format:</strong> Multiple-choice with 4 possible answers per question</li>
                <li>• <strong>Pass Mark:</strong> 60% (18 correct answers out of 30)</li>
                <li>• <strong>Marking:</strong> One mark per correct answer, no penalty for wrong answers</li>
                <li>• <strong>Results:</strong> Available immediately upon completion</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Time Management Breakdown:</h3>
              <p>
                With 90 minutes for 30 questions, you have exactly 3 minutes per question. However, this doesn't mean you should spend exactly this time on each question. The most effective approach is:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Quick wins:</strong> Answer straightforward questions immediately (30-60 seconds)</li>
                <li>• <strong>Standard questions:</strong> Take 2-3 minutes for typical questions</li>
                <li>• <strong>Complex scenarios:</strong> Allow up to 4-5 minutes for challenging questions</li>
                <li>• <strong>Review time:</strong> Reserve 10-15 minutes at the end for flagged questions</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Important Test Rules:</h3>
              <ul className="space-y-2 ml-4">
                <li>• No mobile phones, calculators, or reference materials allowed</li>
                <li>• You cannot pause the test once started</li>
                <li>• All questions must be attempted - blank answers receive zero marks</li>
                <li>• You can change answers until you submit the test</li>
                <li>• The test auto-submits when time expires</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Types of Questions */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              2. Question Types and Content Areas
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                The AM2 knowledge test covers five main types of questions, each designed to assess different aspects of your electrical knowledge and competence. Understanding these question types will help you recognise what each question is asking for and respond appropriately.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Straight Knowledge Questions (25-30% of test)</h3>
              <p>
                These questions test your direct recall of facts, figures, and regulations from BS 7671 and related standards. They require precise knowledge of specific requirements and are often the quickest to answer if you know the information.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Example topics:</strong> IP ratings, cable current ratings, diversity factors, protective device characteristics</li>
                <li>• <strong>Strategy:</strong> These should be quick wins - if you know it, answer immediately. If not, flag and move on</li>
                <li>• <strong>Sample question:</strong> "What is the minimum IP rating required for electrical equipment in Zone 1 of a bathroom?"</li>
                <li>• <strong>Key tip:</strong> Look for absolute values and specific requirements rather than general principles</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Applied Scenario Questions (35-40% of test)</h3>
              <p>
                These questions present real-world electrical situations and ask you to apply your knowledge to solve problems or make decisions. They often involve fault finding, testing procedures, or determining appropriate remedial actions.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Common scenarios:</strong> Test results interpretation, fault symptoms, remedial actions, compliance issues</li>
                <li>• <strong>Strategy:</strong> Read the scenario carefully, identify what's happening, then consider what regulations or procedures apply</li>
                <li>• <strong>Sample question:</strong> "An RCD keeps tripping when a particular circuit is energised. What is the most likely cause and appropriate action?"</li>
                <li>• <strong>Key tip:</strong> These questions test understanding, not just memorisation. Think about cause and effect</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Regulation Reference Questions (15-20% of test)</h3>
              <p>
                These questions require you to know which specific regulations apply in given situations. They test your familiarity with BS 7671 structure and specific regulation numbers.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Example areas:</strong> Regulation numbers for specific requirements, table references, appendix content</li>
                <li>• <strong>Strategy:</strong> Learn key regulation numbers and their purposes rather than trying to memorise everything</li>
                <li>• <strong>Sample question:</strong> "Which regulation covers the requirements for earthing arrangements in TT systems?"</li>
                <li>• <strong>Key tip:</strong> Focus on commonly referenced regulations and those covered in your course materials</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Calculation and Science Questions (20-25% of test)</h3>
              <p>
                These questions test your understanding of electrical principles and ability to perform basic calculations. They may involve Ohm's law, power calculations, current ratings, or fault current calculations.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Common topics:</strong> Ohm's law applications, power calculations, voltage drop, fault current, cable sizing</li>
                <li>• <strong>Strategy:</strong> Show your working mentally and double-check calculations</li>
                <li>• <strong>Sample question:</strong> "A 3kW load operates at 230V. What is the load current?"</li>
                <li>• <strong>Key tip:</strong> Brush up on basic electrical formulas and unit conversions</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Health and Safety Questions (10-15% of test)</h3>
              <p>
                These questions cover safe working practices, risk assessment, PPE requirements, and legal obligations under health and safety legislation.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Key areas:</strong> CDM regulations, risk assessment, safe isolation, PPE, working at height</li>
                <li>• <strong>Strategy:</strong> Think about best practice and legal requirements</li>
                <li>• <strong>Sample question:</strong> "What is the minimum requirement before working on electrical equipment?"</li>
                <li>• <strong>Key tip:</strong> Safety is always the priority - choose the safest option when in doubt</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Assessor Expectations */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              4. Assessor Expectations
            </h2>
            
            <p className="text-sm text-muted-foreground mb-4">
              Assessors don't just want correct answers — they want to see that you:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-elec-yellow/5 dark:bg-elec-yellow/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Understand how to approach scenario-based questions, not just memorise facts
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-800 dark:text-green-200">
                  Use regulation knowledge to choose the correct answer
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Manage your time and attempt every question (no blanks)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              5. Test-Taking Strategies and Practical Guidance
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Success in the AM2 knowledge test depends not just on what you know, but how effectively you apply your knowledge under time pressure. These proven strategies will help you maximise your performance.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Before You Begin:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Arrive early:</strong> Get to the test centre 15-20 minutes before your appointment to avoid stress</li>
              <li>• <strong>Listen to the briefing:</strong> Pay attention to any last-minute instructions or system updates</li>
              <li>• <strong>Familiarise with interface:</strong> Take the practice questions seriously to understand the navigation</li>
              <li>• <strong>Check your screen:</strong> Ensure text is clear and readable before starting</li>
              <li>• <strong>Mental preparation:</strong> Take a deep breath and remind yourself you've prepared thoroughly</li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Reading and Understanding Questions:</h3>
            <p>
              Many candidates lose marks not because they don't know the answer, but because they misread or misinterpret the question. Developing careful reading habits is crucial.
            </p>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Read the entire question:</strong> Don't assume you know what it's asking after reading the first few words</li>
              <li>• <strong>Identify key words:</strong> Look for words like "minimum", "maximum", "not", "except", "best", "most appropriate"</li>
              <li>• <strong>Understand the context:</strong> Is this about installation, testing, maintenance, or safety?</li>
              <li>• <strong>Check for negatives:</strong> Questions asking what "should NOT" be done catch many candidates</li>
              <li>• <strong>Re-read if unsure:</strong> A few extra seconds reading can prevent costly mistakes</li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Elimination Strategy:</h3>
            <p>
              Even when you're not completely certain of the correct answer, you can often eliminate obviously wrong options to improve your odds significantly.
            </p>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Look for extreme values:</strong> Answers that seem unusually high or low are often incorrect</li>
              <li>• <strong>Eliminate unsafe options:</strong> Any answer that would create a safety hazard is likely wrong</li>
              <li>• <strong>Consider practical reality:</strong> Answers that would be impractical or impossible to implement are usually incorrect</li>
              <li>• <strong>Apply logic:</strong> Does the answer make sense in the context of the question?</li>
              <li>• <strong>Use your experience:</strong> What would you actually do in this situation on site?</li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Time Management Techniques:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Quick scan first:</strong> Quickly scan all questions to identify easy ones you can answer immediately</li>
              <li>• <strong>Set time checkpoints:</strong> Aim to complete 50% of questions in 40 minutes, 75% in 60 minutes</li>
              <li>• <strong>Don't get stuck:</strong> If you're spending more than 4-5 minutes on a question, flag it and move on</li>
              <li>• <strong>Use the flag system:</strong> Flag questions you want to revisit, not just ones you can't answer</li>
              <li>• <strong>Save time for review:</strong> Try to finish with 10-15 minutes remaining for flagged questions</li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Dealing with Uncertainty:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Make educated guesses:</strong> There's no penalty for wrong answers, so never leave questions blank</li>
              <li>• <strong>Trust your instincts:</strong> Your first instinct is often correct, especially if you've prepared well</li>
              <li>• <strong>Use process of elimination:</strong> Even eliminating one wrong answer improves your chances by 33%</li>
              <li>• <strong>Consider question patterns:</strong> If three answers seem similar and one different, the different one might be correct</li>
              <li>• <strong>Apply workplace logic:</strong> What would be the most sensible approach in a real electrical installation?</li>
            </ul>

            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Final Review Strategy:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Review flagged questions:</strong> Focus on questions you flagged rather than changing answered questions</li>
              <li>• <strong>Check for blanks:</strong> Quickly scan to ensure every question has an answer</li>
              <li>• <strong>Don't overthink:</strong> Avoid changing answers unless you're confident you made an error</li>
              <li>• <strong>Use remaining time wisely:</strong> Better to carefully consider a few flagged questions than rush through many</li>
              <li>• <strong>Stay calm:</strong> Maintain confidence in your preparation and knowledge</li>
            </ul>
            </div>
          </CardContent>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Real-world Examples */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Real-world Examples
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-l-red-500 p-4 rounded-r-lg">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Example 1: Poor Time Management</h4>
                <p className="text-sm text-red-700 dark:text-elec-yellow">
                  Candidate spent 15 minutes stuck on one science question, ran out of time, and left 5 unanswered. <strong>Failed.</strong>
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Example 2: Smart Strategy</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Candidate flagged 3 questions, completed the rest, then came back with fresh focus and answered correctly. <strong>Passed.</strong>
                </p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">⚠️ Example 3: Rushing Error</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Candidate misread a question on Zs values and picked the maximum permitted value instead of actual measured. Lost marks through rushing.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-card border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-elec-yellow/50 pl-4">
                <h4 className="font-medium text-foreground mb-1">Q1: How many questions are in the knowledge test?</h4>
                <p className="text-sm text-muted-foreground">A: 30 questions.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-4">
                <h4 className="font-medium text-foreground mb-1">Q2: How long do I have?</h4>
                <p className="text-sm text-muted-foreground">A: 90 minutes.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-4">
                <h4 className="font-medium text-foreground mb-1">Q3: What's the pass mark?</h4>
                <p className="text-sm text-muted-foreground">A: 60% (18 correct answers out of 30).</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-4">
                <h4 className="font-medium text-foreground mb-1">Q4: Can I skip and return to questions?</h4>
                <p className="text-sm text-muted-foreground">A: Yes — flag them in the system.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-4">
                <h4 className="font-medium text-foreground mb-1">Q5: Are questions only on regs?</h4>
                <p className="text-sm text-muted-foreground">A: No — they cover regs, science, and safety.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-elec-yellow/5 to-elec-yellow/10 border-elec-yellow/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Summary
            </h2>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              The AM2 online knowledge test is a 90-minute, multiple-choice exam with 30 questions covering regs, science, and safety. Success depends not only on knowledge but also on managing your time and answering every question. Assessors expect candidates to work methodically, avoid rushing, and use strategies like flagging tricky questions.
            </p>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              10-Question Quiz
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Test your understanding of the online test format and structure:
            </p>
            <Quiz questions={quizQuestions} />
          </div>
        </Card>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
          <Button className="flex-1 bg-elec-yellow hover:bg-elec-yellow/80 text-black" asChild>
            <Link to="../section2">
              Module 6 Section 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module6Section1;