import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, AlertTriangle, Clock, Timer, Brain, Target, Lightbulb, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module6Section3 = () => {
  useSEO(
    "Time Management Strategies | AM2 Module 6 Section 3",
    "Master time management techniques for the AM2 online knowledge test with effective pacing and exam strategies"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "time-per-question",
      question: "If you have 40 questions in 90 minutes, how much time per question should you aim for?",
      options: [
        "1 minute per question",
        "About 2 minutes per question",
        "3 minutes per question",
        "4 minutes per question"
      ],
      correctIndex: 1,
      explanation: "About 2 minutes per question - with 40 questions in 90 minutes, you get 2.25 minutes each, so aim for 2 minutes to have review time."
    },
    {
      id: "best-strategy",
      question: "What's better if you're unsure — leaving blank or making your best choice?",
      options: [
        "Leave it blank",
        "Make your best choice",
        "Skip it completely",
        "Spend 10 minutes thinking"
      ],
      correctIndex: 1,
      explanation: "Make your best choice — no penalty for guessing, but blank answers guarantee lost marks."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "How many minutes are available for the online knowledge test?",
      options: ["60 minutes", "75 minutes", "90 minutes", "120 minutes"],
      correctAnswer: 2,
      explanation: "The AM2 online knowledge test is 90 minutes long."
    },
    {
      id: 2,
      question: "Roughly how much time per question if there are 40 questions?",
      options: ["1 minute", "2 minutes", "3 minutes", "4 minutes"],
      correctAnswer: 1,
      explanation: "With 40 questions in 90 minutes, you get about 2.25 minutes per question - aim for 2 minutes each."
    },
    {
      id: 3,
      question: "Why should you flag tricky questions instead of staying stuck?",
      options: ["To avoid them completely", "To save time and maintain momentum", "Because they're worth fewer marks", "To confuse other candidates"],
      correctAnswer: 1,
      explanation: "Flagging saves time and maintains momentum - you can return with a fresh perspective later."
    },
    {
      id: 4,
      question: "What's the best strategy if you're unsure of an answer?",
      options: ["Leave it blank", "Eliminate wrong options and guess", "Skip the question", "Spend 10 minutes thinking"],
      correctAnswer: 1,
      explanation: "Eliminate wrong options and make your best guess - no penalty for wrong answers but blanks guarantee lost marks."
    },
    {
      id: 5,
      question: "True or false: There is negative marking for wrong answers.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - there's no negative marking, so always answer every question even if you're guessing."
    },
    {
      id: 6,
      question: "How many questions should you aim to complete in the first 30 minutes?",
      options: ["8-10 questions", "10-12 questions", "15-20 questions", "All 40 questions"],
      correctAnswer: 1,
      explanation: "Around 10-12 questions in the first 30 minutes gives you a good pace with time for review."
    },
    {
      id: 7,
      question: "What's the danger of rushing through the test?",
      options: ["You finish too early", "Misreading questions and careless errors", "The examiner gets suspicious", "Nothing - speed is always good"],
      correctAnswer: 1,
      explanation: "Rushing leads to misreading questions and careless errors - steady, controlled pace is better."
    },
    {
      id: 8,
      question: "Why should you check flagged questions first in review time?",
      options: ["They're worth more marks", "You've already attempted them", "Fresh perspective on difficult ones", "To change all your answers"],
      correctAnswer: 2,
      explanation: "Fresh perspective helps - coming back to flagged questions later often leads to correct answers."
    },
    {
      id: 9,
      question: "How can you stop yourself panicking about the clock?",
      options: ["Hide the clock completely", "Check time every minute", "Check every 10-15 minutes only", "Ask the examiner for time"],
      correctAnswer: 2,
      explanation: "Check time every 10-15 minutes only - constant clock-watching increases anxiety and wastes time."
    },
    {
      id: 10,
      question: "What's the golden rule for time management in AM2?",
      options: ["Speed above accuracy", "Answer every question", "Spend equal time on each", "Focus on calculations only"],
      correctAnswer: 1,
      explanation: "Answer every question - time management ensures you attempt all questions for maximum possible marks."
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
              <Link to="../section4">
                <span className="hidden xs:inline">Module 6 Section 4</span>
                <span className="xs:hidden">Section 4</span>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            Module 6 – Section 3
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Time Management Strategies
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            The AM2 online knowledge test is 90 minutes long with around 30–40 questions. That gives you roughly 2–3 minutes per question. Candidates often fail not because they lack knowledge, but because they mismanage time — either spending too long on one tricky question or rushing and making careless mistakes.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Time management ensures you attempt every question, work steadily, and stay calm under pressure.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Time Management is Everything
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 mb-3 leading-relaxed">
                  Many candidates fail the knowledge test not due to lack of knowledge, but poor time management. Getting stuck on difficult questions and leaving others blank is a guaranteed route to failure.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 font-medium leading-relaxed">
                  You must attempt every question. There's no penalty for guessing, but blank answers guarantee lost marks.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Learning Outcomes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              By the end of this section, you will be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Plan how to use the 90 minutes effectively
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Apply strategies for handling tricky or time-consuming questions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Keep track of progress without panicking
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Ensure every question is attempted, with nothing left blank
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Demonstrate exam discipline under assessment conditions
              </li>
            </ul>
          </div>
        </Card>

        {/* How to Pace Yourself */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              1. How to Pace Yourself
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>30 questions = 3 minutes each</strong></li>
                <li>• <strong>40 questions = 2 minutes each</strong></li>
                <li>• <strong>Aim to finish with 10 minutes spare for review</strong></li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mt-6 mb-3">Detailed Pacing Strategy:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Time Allocation Breakdown:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>First 30 minutes:</strong> 10-12 easy questions</li>
                    <li>• <strong>Next 30 minutes:</strong> 10-12 medium questions</li>
                    <li>• <strong>Next 20 minutes:</strong> Remaining questions</li>
                    <li>• <strong>Final 10 minutes:</strong> Review flagged questions</li>
                  </ul>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Pace Indicators:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>On track:</strong> 1/3 complete at 30 minutes</li>
                    <li>• <strong>Good pace:</strong> 2/3 complete at 60 minutes</li>
                    <li>• <strong>Warning:</strong> Less than 1/4 at 30 minutes</li>
                    <li>• <strong>Crisis:</strong> Less than 1/2 at 60 minutes</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Time Management Golden Rules:</h4>
                <ul className="space-y-1 text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">
                  <li>• <strong>Never spend more than 5 minutes on any single question</strong></li>
                  <li>• <strong>Check the clock every 10 questions, not every question</strong></li>
                  <li>• <strong>If behind schedule, flag more aggressively</strong></li>
                  <li>• <strong>Speed comes from confidence, not panic</strong></li>
                </ul>
              </div>
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

        {/* Strategies for Tricky Questions */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              2. Strategies for Tricky Questions
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>Flag and return later.</strong> Don't waste 10 minutes stuck</li>
                <li>• <strong>Eliminate wrong answers.</strong> Narrow to 2 options before guessing</li>
                <li>• <strong>Don't overthink.</strong> Usually the most straightforward answer is correct</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mt-6 mb-3">Advanced Question Handling:</h3>
              <div className="space-y-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">The FLAGGING System:</h4>
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground mb-1">🔴 RED FLAG</p>
                      <p>Complex calculations requiring 5+ minutes</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">🟡 YELLOW FLAG</p>
                      <p>Uncertain between 2 options</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">🟢 GREEN FLAG</p>
                      <p>Quick review needed but manageable</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Question Types & Time Allocation:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>Regulation recall (30 seconds):</strong> "Maximum Zs for 32A Type B MCB?"</li>
                    <li>• <strong>Simple calculation (1-2 minutes):</strong> "Current drawn by 3kW heater at 230V?"</li>
                    <li>• <strong>Application questions (2-3 minutes):</strong> "RCD requirements in bathroom zones"</li>
                    <li>• <strong>Complex scenarios (3-5 minutes):</strong> Multi-step calculations or interpretations</li>
                  </ul>
                </div>

                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Emergency Time Recovery:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>If 15+ minutes behind:</strong> Flag ALL calculations, focus on recall questions</li>
                    <li>• <strong>If 10 minutes behind:</strong> Speed up elimination, guess more confidently</li>
                    <li>• <strong>If 5 minutes behind:</strong> Reduce checking, trust first instincts</li>
                    <li>• <strong>Last 15 minutes:</strong> Ensure every question has an answer</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staying Calm Under Pressure */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              3. Staying Calm Under Pressure
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>Breathe and re-focus</strong> if you feel rushed</li>
                <li>• <strong>Don't look at the clock constantly</strong> — check time every 10–15 minutes instead</li>
                <li>• <strong>Think of it as 3 small 30-minute tests</strong> rather than one long one</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mt-6 mb-3">Stress Management Techniques:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Physical Calm Techniques:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>4-7-8 Breathing:</strong> Inhale 4, hold 7, exhale 8 counts</li>
                    <li>• <strong>Shoulder roll:</strong> Release tension every 15 minutes</li>
                    <li>• <strong>Posture reset:</strong> Sit back, straighten spine</li>
                    <li>• <strong>Hand shake:</strong> If sweaty palms, quick shake and wipe</li>
                  </ul>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Mental Calm Strategies:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>Positive self-talk:</strong> "I know this material"</li>
                    <li>• <strong>Progress focus:</strong> "10 down, only 5 more to go"</li>
                    <li>• <strong>Reset mantras:</strong> "One question at a time"</li>
                    <li>• <strong>Confidence anchors:</strong> Remember recent successes</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">The "Chunk" Method Explained:</h4>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-700 dark:text-emerald-400">
                  <div>
                    <p className="font-medium mb-1">Chunk 1 (Questions 1-13):</p>
                    <p>"First third done - building momentum"</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Chunk 2 (Questions 14-26):</p>
                    <p>"Over halfway - in the zone now"</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Chunk 3 (Questions 27-40):</p>
                    <p>"Final stretch - nearly there"</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">When You Feel Panic Setting In:</h4>
                <ol className="space-y-1 text-xs sm:text-sm text-green-700 dark:text-green-300">
                  <li><strong>1. STOP</strong> - Don't continue in panic mode</li>
                  <li><strong>2. BREATHE</strong> - Take 3 controlled breaths</li>
                  <li><strong>3. ASSESS</strong> - Where am I? How many left?</li>
                  <li><strong>4. ADJUST</strong> - Flag more aggressively if needed</li>
                  <li><strong>5. CONTINUE</strong> - One question at a time</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessor Expectations */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              4. Assessor Expectations
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Assessors don't see your screen, but they know what good exam technique looks like. They expect you to:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Attempt every question</strong> (no blanks)</li>
                <li>• <strong>Work methodically</strong> through the paper</li>
                <li>• <strong>Manage time</strong> without panicking or skipping whole sections</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-emerald-400 mt-6 mb-3">What Assessors Look For:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">✅ Good Exam Discipline:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• Consistent pacing throughout the test</li>
                    <li>• Every question attempted (no blanks)</li>
                    <li>• Logical sequence of answering</li>
                    <li>• Appropriate time spent on difficult questions</li>
                    <li>• Evidence of review and checking</li>
                  </ul>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">❌ Poor Time Management:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• Large gaps of unanswered questions</li>
                    <li>• Erratic timing patterns</li>
                    <li>• Rush of answers in final minutes</li>
                    <li>• No evidence of strategic planning</li>
                    <li>• Panic-driven answer changes</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Professional Standards Expected:</h4>
                <div className="text-xs sm:text-sm text-purple-700 dark:text-emerald-400 space-y-2">
                  <p>Assessors expect the same professionalism you'd show on a job site:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Systematic approach:</strong> Like conducting a proper inspection</li>
                    <li>• <strong>Risk management:</strong> Identifying and handling difficult areas</li>
                    <li>• <strong>Quality control:</strong> Checking your work before submitting</li>
                    <li>• <strong>Time efficiency:</strong> Getting the job done within deadlines</li>
                  </ul>
                </div>
              </div>
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

        {/* Practical Guidance */}
        <Card className="bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-700 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">
                  Practical Guidance
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                  <li>• <strong>Do a first pass quickly.</strong> Answer all the ones you know</li>
                  <li>• <strong>Second pass for flagged questions.</strong> Spend more time on tricky ones later</li>
                  <li>• <strong>Keep moving.</strong> Time lost early cannot be recovered</li>
                  <li>• <strong>Use spare minutes wisely.</strong> Double-check flagged answers first, not the whole paper</li>
                  <li>• <strong>Stay neat.</strong> Rushed answers often lead to clicking the wrong option</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                  <p><strong>Example 1:</strong> Candidate spent 20 minutes on one science calculation, left 6 questions unanswered → failed by 2 marks.</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                  <p><strong>Example 2:</strong> Candidate flagged 5 tricky questions, finished the rest, came back fresh and got 4 right → passed.</p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                  <p><strong>Example 3:</strong> Candidate rushed and misread "minimum" for "maximum" in a regs question → lost easy marks.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-foreground mb-1">Q1: Should I guess if I don't know the answer?</p>
                <p className="text-muted-foreground">A: Yes — there's no negative marking.</p>
              </div>
              
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-foreground mb-1">Q2: How many questions should I aim to finish in the first 30 minutes?</p>
                <p className="text-muted-foreground">A: Around 10–12.</p>
              </div>
              
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-foreground mb-1">Q3: What happens if I run out of time?</p>
                <p className="text-muted-foreground">A: Any unanswered questions are marked wrong.</p>
              </div>
              
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-foreground mb-1">Q4: Can I change answers once selected?</p>
                <p className="text-muted-foreground">A: Yes — until you submit at the end.</p>
              </div>
              
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="font-semibold text-foreground mb-1">Q5: Should I spend equal time on every question?</p>
                <p className="text-muted-foreground">A: No — answer easy ones quickly, spend more time on hard ones later.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">
                  Summary
                </h3>
                <div className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-2">
                  <p>Time management in the AM2 knowledge test is about control and pacing.</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Allocate 2–3 minutes per question</li>
                    <li>• Answer all easy ones first, flag tricky ones</li>
                    <li>• Use elimination and best judgement rather than leaving blanks</li>
                    <li>• Stay calm and review flagged questions at the end</li>
                  </ul>
                  <p className="font-medium">If you manage your time well, you give yourself the best chance of turning knowledge into marks.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
              Test Your Understanding
            </h2>
            <Quiz questions={quizQuestions} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Core Topics
            </Link>
          </Button>
          
          <Button asChild className="w-full sm:w-auto">
            <Link to="../section4">
              Next: Exam Techniques
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module6Section3;