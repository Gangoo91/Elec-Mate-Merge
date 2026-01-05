import { ArrowLeft, ArrowRight, Brain, CheckCircle, AlertTriangle, Target, Timer, Lightbulb, Heart, Shield, BookOpen, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module7Section2 = () => {
  useSEO(
    "Coping with Nerves and Pressure | AM2 Module 7 Section 2",
    "Master strategies for managing nerves and pressure during the AM2 electrical assessment"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "nerve-effects",
      question: "What happens if you miss out the re-prove step in safe isolation because of nerves?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Automatic failure",
        "No consequence"
      ],
      correctIndex: 2,
      explanation: "Missing the re-prove step in safe isolation is a safety-critical error that results in automatic AM2 failure."
    },
    {
      id: "daily-practice",
      question: "Why is practising safe isolation every day before AM2 a good strategy?",
      options: [
        "To memorise the steps",
        "To make the process automatic so nerves are less likely to cause mistakes",
        "To impress the assessor",
        "It's not necessary"
      ],
      correctIndex: 1,
      explanation: "Daily practice makes safe isolation automatic, reducing the likelihood that nerves will cause you to miss critical steps."
    },
    {
      id: "assessor-marking",
      question: "True or false: Assessors fail candidates just for looking nervous.",
      options: [
        "True - they mark on appearance",
        "False - they only mark the work quality and safety",
        "True - confidence is marked",
        "False - but nerves always affect marks"
      ],
      correctIndex: 1,
      explanation: "Assessors only mark your work quality and safety compliance, not your emotional state or appearance."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Why do nerves cause mistakes in AM2?",
      options: [
        "They make you think too much",
        "They cause physical reactions like shaking and brain fog that affect performance",
        "They make the exam harder",
        "They distract other candidates"
      ],
      correctAnswer: 1,
      explanation: "Nerves create physical and mental reactions like shaking hands, brain fog, and rushing, which directly affect your ability to work safely and methodically."
    },
    {
      id: 2,
      question: "What happens if you skip a safe isolation step due to nerves?",
      options: [
        "You lose a few marks",
        "You get a warning",
        "It's an automatic fail",
        "Nothing happens"
      ],
      correctAnswer: 2,
      explanation: "Safety-critical tasks like safe isolation cannot be skipped - missing the re-prove step results in automatic failure."
    },
    {
      id: 3,
      question: "How can daily practice reduce nerves?",
      options: [
        "It makes you faster",
        "It makes procedures feel automatic and natural",
        "It impresses the assessor",
        "It guarantees a pass"
      ],
      correctAnswer: 1,
      explanation: "Daily practice makes procedures automatic, so nerves are less likely to cause you to forget or skip important steps."
    },
    {
      id: 4,
      question: "Why should you avoid high-sugar energy drinks before AM2?",
      options: [
        "They're not allowed in the exam",
        "They cause shakes and crashes mid-assessment",
        "They make you too energetic",
        "They're expensive"
      ],
      correctAnswer: 1,
      explanation: "High sugar or energy drinks can cause physical shakes and energy crashes during the assessment, making it harder to work steadily."
    },
    {
      id: 5,
      question: "What technique can you use if you feel panic rising?",
      options: [
        "Work faster to catch up",
        "Step back for 10 seconds and use controlled breathing",
        "Ask the assessor for help",
        "Copy what other candidates are doing"
      ],
      correctAnswer: 1,
      explanation: "Controlled breathing - step back, inhale slowly through your nose, exhale through your mouth - helps reset your focus when panic rises."
    },
    {
      id: 6,
      question: "Why should you break the exam into smaller tasks?",
      options: [
        "To work faster",
        "To reduce overwhelm and focus on the next step",
        "To impress the assessor",
        "To copy other candidates"
      ],
      correctAnswer: 1,
      explanation: "Breaking the 8.5-hour install into chunks (mark out, containment, wiring, terminations) reduces overwhelm and helps maintain focus."
    },
    {
      id: 7,
      question: "True or false: Assessors fail candidates just for looking nervous.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False - assessors don't mark nerves, they mark your work. They only fail you if nerves cause unsafe or incomplete work."
    },
    {
      id: 8,
      question: "What's the danger of watching other candidates during AM2?",
      options: [
        "You might copy their mistakes",
        "It distracts you from your own work and adds unnecessary pressure",
        "It's not allowed",
        "It slows you down"
      ],
      correctAnswer: 1,
      explanation: "Comparing your speed with other candidates adds unnecessary stress. The assessor only marks your work, not how quickly you're moving compared to others."
    },
    {
      id: 9,
      question: "Give an example of positive self-talk you could use:",
      options: [
        "I'm failing this",
        "Everyone else is faster than me",
        "I know the process, I've trained for this",
        "This is too hard"
      ],
      correctAnswer: 2,
      explanation: "Positive self-talk like 'I know the process, I've trained for this' helps stop panic spirals and maintains confidence."
    },
    {
      id: 10,
      question: "Which is safer: being slow but safe, or rushing and unsafe?",
      options: [
        "Rushing and unsafe",
        "Slow but safe",
        "Both are the same",
        "It depends on the task"
      ],
      correctAnswer: 1,
      explanation: "Being slightly slow but safe still earns marks. Rushing and being unsafe leads to instant failure. NET's marking system rewards steady, professional behaviour."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Module 7</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-2 sm:p-0 text-sm sm:text-base" asChild>
              <Link to="../section3">
                <span className="hidden xs:inline">Module 7 Section 3</span>
                <span className="xs:hidden">Section 3</span>
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
            <Brain className="w-4 h-4" />
            Module 7 – Section 2
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Coping with Nerves and Pressure
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Every candidate feels nervous walking into AM2 — it's the industry's benchmark test and there's pressure to pass first time. NET assessors know this and expect you to feel under stress. What they are measuring is not whether you look calm, but whether you can still work safely, methodically, and professionally under pressure.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Managing Nerves is Essential for AM2 Success
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 mb-3 leading-relaxed">
                  If nerves make you rush, skip safety procedures, or forget critical steps, marks are lost instantly. Safety-critical errors due to panic result in automatic failure.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 font-medium leading-relaxed">
                  Assessors expect you to work safely and methodically under pressure - this is a core competency being tested in AM2.
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
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Explain how nerves can affect performance in AM2 and identify the risks if they are not managed
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Use practical strategies before and during the exam to control stress and stay focused
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Apply breathing, pacing, and positive routines to reduce anxiety and prevent panic
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Show professionalism under exam pressure by working safely and methodically
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                Build confidence that nerves will not stop you demonstrating your competence
              </li>
            </ul>
          </div>
        </Card>

        {/* Why Nerves Matter */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              1. Why Nerves Matter in AM2
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Nerves create physical and mental reactions that can directly affect your performance:
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2 sm:mb-3 text-sm sm:text-base">Physical Effects:</h4>
                  <ul className="text-xs sm:text-sm text-red-700 dark:text-emerald-400 space-y-1">
                    <li>• Shaking hands make terminations sloppy or unsafe</li>
                    <li>• Sweating can affect grip on tools and instruments</li>
                    <li>• Increased heart rate affects fine motor control</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2 sm:mb-3 text-sm sm:text-base">Mental Effects:</h4>
                  <ul className="text-xs sm:text-sm text-orange-700 dark:text-emerald-400 space-y-1">
                    <li>• Brain fog causes forgotten steps in safe isolation</li>
                    <li>• Memory lapses in GN3 test sequences</li>
                    <li>• Negative self-talk leads to loss of focus</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 text-sm sm:text-base">Behavioural Consequences:</h4>
                <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Rushing increases errors like bare copper, missing CPC sleeving, or wrong paperwork entries</li>
                  <li>• Skipping safety steps due to time pressure</li>
                  <li>• Poor decision making under stress</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Key Point:</h4>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                    NET's marking system rewards steady, professional behaviour. Being slightly slow but safe still earns marks; rushing and unsafe = instant fail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Strategies to Reduce Nerves Before Exam */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5" />
              2. Strategies to Reduce Nerves Before the Exam
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              The way you prepare in the days leading up to AM2 will directly influence your stress level on the day.
            </p>

            <div className="space-y-6">
              {/* Strategy 1 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">Preparation Builds Confidence</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Practise safe isolation daily and run through testing procedures until they feel automatic. The more natural the task feels, the less nerves will interfere.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded p-3 text-xs sm:text-sm">
                    <strong className="text-blue-800 dark:text-blue-200">Daily Practice Routine:</strong>
                    <ul className="text-blue-700 dark:text-emerald-400 mt-1 space-y-1">
                      <li>• Safe isolation sequence every morning</li>
                      <li>• GN3 testing procedures until automatic</li>
                      <li>• Termination techniques with proper tools</li>
                      <li>• Paperwork completion under time pressure</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Strategy 2 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">Sleep and Rest</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Avoid last-minute all-night revision. A tired candidate makes more mistakes than a calm, rested one.
                  </p>
                  <div className="bg-green-50 dark:bg-green-950/20 rounded p-3 text-xs sm:text-sm">
                    <strong className="text-green-800 dark:text-green-200">Sleep Strategy:</strong>
                    <ul className="text-green-700 dark:text-green-300 mt-1 space-y-1">
                      <li>• 7-8 hours sleep for 3 nights before AM2</li>
                      <li>• No cramming after 8pm the night before</li>
                      <li>• Light revision only on exam morning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Strategy 3 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">Fuel Your Body</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Eat a balanced meal before the exam. High sugar or energy drinks can cause shakes and crashes mid-assessment.
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded p-3 text-xs sm:text-sm">
                    <strong className="text-purple-800 dark:text-purple-200">Nutrition Plan:</strong>
                    <ul className="text-purple-700 dark:text-emerald-400 mt-1 space-y-1">
                      <li>• Complex carbohydrates for sustained energy</li>
                      <li>• Avoid caffeine overdose or energy drinks</li>
                      <li>• Bring healthy snacks for breaks</li>
                      <li>• Stay hydrated but not over-hydrated</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Strategy 4 */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-2">Plan Your Arrival</h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Get to the centre early so you're not rushing, which adds unnecessary stress.
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded p-3 text-xs sm:text-sm">
                    <strong className="text-orange-800 dark:text-orange-200">Arrival Strategy:</strong>
                    <ul className="text-orange-700 dark:text-emerald-400 mt-1 space-y-1">
                      <li>• Arrive 30 minutes early minimum</li>
                      <li>• Plan route and check travel times</li>
                      <li>• Have backup transport arrangements</li>
                      <li>• Use extra time to settle and focus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Techniques During Exam */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              3. Techniques During the Exam
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              When nerves hit during AM2, you need quick techniques to keep control.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-emerald-400 dark:text-emerald-400" />
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 text-sm sm:text-base">Controlled Breathing</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-emerald-400 mb-3">
                    If panic rises, step back for 10 seconds, inhale slowly through your nose, exhale slowly through your mouth. This resets your focus.
                  </p>
                  <div className="text-xs text-emerald-400 dark:text-emerald-400 font-medium">
                    4-7-8 Technique: Inhale for 4, hold for 7, exhale for 8
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">Break Tasks into Chunks</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-3">
                    Instead of thinking about an 8.5-hour install, focus on the next step: mark out, containment, wiring, terminations.
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                    One section at a time reduces overwhelm
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-600 dark:text-emerald-400" />
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 text-sm sm:text-base">Positive Self-Talk</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-emerald-400 mb-3">
                    Replace "I'm messing this up" with "I know the process, I've trained for this." Simple but stops panic spirals.
                  </p>
                  <div className="text-xs text-purple-600 dark:text-emerald-400 font-medium">
                    "I can do this safely and methodically"
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-orange-600 dark:text-emerald-400" />
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 text-sm sm:text-base">Ignore Others</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-emerald-400 mb-3">
                    Don't compare your speed with other candidates. The assessor only marks your work, not relative performance.
                  </p>
                  <div className="text-xs text-orange-600 dark:text-emerald-400 font-medium">
                    Focus on your own professional standard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Expectations */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              4. Assessor Expectations
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              NET assessors don't mark nerves — they mark your work. They expect you to:
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base">Professional Behaviour:</h4>
                  <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Work steadily and safely, even if you look anxious</li>
                    <li>• Maintain calm, methodical approach under pressure</li>
                    <li>• Show competence through actions, not appearance</li>
                  </ul>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 text-sm sm:text-base">Safety Compliance:</h4>
                  <ul className="text-xs sm:text-sm text-blue-700 dark:text-emerald-400 space-y-1">
                    <li>• Keep to procedure (safe isolation, GN3 sequence) without skipping</li>
                    <li>• Never compromise safety due to time pressure</li>
                    <li>• Complete all safety-critical steps in correct order</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 text-sm sm:text-base">Time Management:</h4>
                <p className="text-xs sm:text-sm text-purple-700 dark:text-emerald-400">
                  Complete sections within the set time without rushing. Quality and safety take priority over speed.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck 
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Practical Guidance */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Practical Guidance
            </h2>
            
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Think of AM2 Like a Real Job Handover
              </h4>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-emerald-400">
                On-site, you may feel pressure from deadlines or customers, but you wouldn't skip earthing or rush unsafe terminations to finish quicker. Treat AM2 the same way — safe, steady, professional.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground text-sm sm:text-base">Practical things you can do:</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <div>
                      <h5 className="font-medium text-foreground text-xs sm:text-sm">Mental Checklists</h5>
                      <p className="text-xs text-muted-foreground">Make checklists in your head: safe isolation steps, test order. Stick to them regardless of nerves.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <div>
                      <h5 className="font-medium text-foreground text-xs sm:text-sm">If You Get Stuck</h5>
                      <p className="text-xs text-muted-foreground">Don't freeze. Move on, complete another part, and come back later.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <div>
                      <h5 className="font-medium text-foreground text-xs sm:text-sm">Record Results</h5>
                      <p className="text-xs text-muted-foreground">Write down test results as you go so you don't forget under pressure.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 text-black rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <div>
                      <h5 className="font-medium text-foreground text-xs sm:text-sm">Stay Hydrated</h5>
                      <p className="text-xs text-muted-foreground">Dehydration increases stress. Keep water with you throughout the assessment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Failure Examples */}
                <div className="space-y-4">
                  <h4 className="font-medium text-red-600 dark:text-emerald-400 text-sm sm:text-base">❌ Failure Examples:</h4>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3">
                    <h5 className="font-medium text-red-800 dark:text-red-200 text-xs sm:text-sm mb-2">Example 1:</h5>
                    <p className="text-xs text-red-700 dark:text-emerald-400">
                      Candidate skipped re-proving tester in safe isolation due to nerves → instant fail.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3">
                    <h5 className="font-medium text-red-800 dark:text-red-200 text-xs sm:text-sm mb-2">Example 2:</h5>
                    <p className="text-xs text-red-700 dark:text-emerald-400">
                      Candidate felt behind on time in the install section, rushed SWA glanding, armour not earthed → marks lost.
                    </p>
                  </div>
                </div>
                
                {/* Success Examples */}
                <div className="space-y-4">
                  <h4 className="font-medium text-green-600 dark:text-green-400 text-sm sm:text-base">✅ Success Examples:</h4>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3">
                    <h5 className="font-medium text-green-800 dark:text-green-200 text-xs sm:text-sm mb-2">Example 3:</h5>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Candidate paused for breathing, slowed pace, completed all sections safely → passed comfortably.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3">
                    <h5 className="font-medium text-green-800 dark:text-green-200 text-xs sm:text-sm mb-2">Example 4:</h5>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      On-site, an electrician under deadline pressure maintained safety standards despite client pressure. Same approach in AM2 = success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h5 className="font-medium text-foreground text-xs sm:text-sm mb-1">Q1: Will assessors fail me just for looking nervous?</h5>
                <p className="text-xs text-muted-foreground">No — they only fail you if nerves cause unsafe or incomplete work.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-medium text-foreground text-xs sm:text-sm mb-1">Q2: What if I forget steps in testing because of panic?</h5>
                <p className="text-xs text-muted-foreground">Pause, breathe, reset. Assessors prefer slow but correct over rushed and wrong.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-medium text-foreground text-xs sm:text-sm mb-1">Q3: Should I copy other candidates' pace?</h5>
                <p className="text-xs text-muted-foreground">No — focus only on your own work. Comparing speeds adds unnecessary stress.</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h5 className="font-medium text-foreground text-xs sm:text-sm mb-1">Q4: Is feeling anxious normal?</h5>
                <p className="text-xs text-muted-foreground">Yes — every candidate feels it. The difference is how you manage it.</p>
              </div>
              
              <div className="border-l-4 border-l-red-500 pl-4">
                <h5 className="font-medium text-foreground text-xs sm:text-sm mb-1">Q5: What's the best way to reduce nerves overall?</h5>
                <p className="text-xs text-muted-foreground">Consistent practice until procedures become automatic — especially safe isolation and GN3 testing.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="bg-card border-emerald-500/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Summary
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Nerves are normal in AM2, but you must control them. NET wants to see that you can:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-xs sm:text-sm text-foreground">Stay safe and methodical under pressure</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-xs sm:text-sm text-foreground">Use breathing, chunking, and positive self-talk to reset focus</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-xs sm:text-sm text-foreground">Avoid rushing or skipping steps due to panic</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-xs sm:text-sm text-foreground">Treat the exam like a professional job handover</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-xs sm:text-sm text-foreground">Remember: Safe and steady will pass; rushed and unsafe will fail</span>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-emerald-400 mb-2">Key Takeaway:</h4>
                  <p className="text-xs sm:text-xs sm:text-sm text-foreground">
                    NET assessors understand that you will feel nervous. What they're testing is your ability to work safely and professionally despite those nerves — just like you would on a real job site under pressure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Quiz 
          questions={quizQuestions}
          title="Test Your Knowledge: Coping with Nerves and Pressure"
        />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1
            </Link>
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Module 7 • Section 2 of 4
            </p>
          </div>
          
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../section3">
              Next: Section 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module7Section2;