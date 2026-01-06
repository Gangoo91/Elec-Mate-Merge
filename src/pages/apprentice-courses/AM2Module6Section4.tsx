import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, AlertTriangle, Eye, Brain, Target, Lightbulb, Calculator, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module6Section4 = () => {
  useSEO(
    "Exam Techniques and Mindset | AM2 Module 6 Section 4",
    "Proven exam techniques, mindset strategies, and common mistake avoidance for AM2 online knowledge test success"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "reading-questions",
      question: "What's the difference between 'minimum IR value' and 'recommended IR value'?",
      options: [
        "They are the same value",
        "Minimum is 0.5 MΩ, recommended is 1 MΩ",
        "Minimum is 1 MΩ (legal pass), recommended is best practice target",
        "Recommended is always half the minimum"
      ],
      correctIndex: 2,
      explanation: "Minimum is the legal pass mark (1 MΩ), recommended is the best practice target for good installations."
    },
    {
      id: "units-conversion",
      question: "If an RCD trips in 0.28 s, should this be written as 280 ms or 0.28 ms?",
      options: [
        "280 ms",
        "0.28 ms",
        "Both are correct",
        "Neither - use seconds only"
      ],
      correctIndex: 0,
      explanation: "280 ms — candidates often lose marks by miswriting units. 0.28 s = 280 ms (multiply by 1000)."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the biggest cause of lost marks in the knowledge test?",
      options: ["Lack of knowledge", "Misreading questions", "Time pressure", "Calculator errors"],
      correctAnswer: 1,
      explanation: "Misreading questions is the biggest cause - many fails come from not reading keywords like 'minimum/maximum' properly."
    },
    {
      id: 2,
      question: "Why should you underline or note keywords in a question?",
      options: ["It looks professional", "To prevent misreading what's actually asked", "It saves time", "The examiner expects it"],
      correctAnswer: 1,
      explanation: "Underlining keywords prevents misreading - many candidates answer what they think is asked rather than what's written."
    },
    {
      id: 3,
      question: "What technique narrows your options if unsure?",
      options: ["Guessing randomly", "Process of elimination", "Asking for help", "Skipping the question"],
      correctAnswer: 1,
      explanation: "Process of elimination - crossing out obviously wrong answers gives you better odds and reduces panic."
    },
    {
      id: 4,
      question: "Which is correct: 0.28 s = 280 ms or 0.28 ms?",
      options: ["280 ms", "0.28 ms", "Both are correct", "Neither"],
      correctAnswer: 0,
      explanation: "280 ms is correct. To convert seconds to milliseconds, multiply by 1000: 0.28 × 1000 = 280 ms."
    },
    {
      id: 5,
      question: "True or false: You should always change your first answer.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - research shows your first instinct is usually right. Only change if you see clear evidence."
    },
    {
      id: 6,
      question: "What's the best strategy if faced with a difficult maths problem?",
      options: ["Spend 10 minutes working it out", "Flag it and return later", "Give up and move on", "Guess immediately"],
      correctAnswer: 1,
      explanation: "Flag it and return later - don't waste time early. Come back fresh with remaining time."
    },
    {
      id: 7,
      question: "How many questions out of 40 can you afford to miss and still pass?",
      options: ["5-8 questions", "10-12 questions", "12-14 questions", "15-20 questions"],
      correctAnswer: 2,
      explanation: "Around 12-14 wrong questions (if 40 total), depending on pass mark - you need roughly 60-65% to pass."
    },
    {
      id: 8,
      question: "Give one example of a common unit mix-up.",
      options: ["Volts and amps", "kW and W", "Ohms and siemens", "Hz and kHz"],
      correctAnswer: 1,
      explanation: "kW and W is a common mix-up - forgetting to convert kilowatts to watts in power calculations costs marks."
    },
    {
      id: 9,
      question: "What's the benefit of breaking the test into 'chunks' of 10?",
      options: ["It's required by exam rules", "Makes time management easier", "Reduces mental pressure", "Both B and C"],
      correctAnswer: 3,
      explanation: "Both - breaking into chunks makes time management easier and reduces the mental pressure of a 'big' 90-minute test."
    },
    {
      id: 10,
      question: "What mindset should you have walking into the test?",
      options: ["Nervous but hopeful", "Calm and confident", "Anxious but prepared", "Worried about time"],
      correctAnswer: 1,
      explanation: "Calm and confident - anxiety costs marks. You're proving you can work accurately under pressure, just like on site."
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            Module 6 – Section 4
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Exam Techniques and Mindset
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            The AM2 online knowledge test is as much about exam discipline and mindset as it is about knowledge. Many candidates know the material but lose marks because they misread questions, panic under pressure, or second-guess themselves. This section teaches you how to approach questions with the right techniques, avoid common pitfalls, and maintain a confident, professional mindset.
          </p>
        </div>

        {/* Critical Warning */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  CRITICAL: Exam Technique is Everything
                </h3>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow mb-3 leading-relaxed">
                  Many candidates fail the AM2 knowledge test not due to lack of knowledge, but poor exam technique. Misreading questions, panicking under pressure, and second-guessing yourself are guaranteed routes to failure.
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-elec-yellow font-medium leading-relaxed">
                  Master these techniques and your mindset. Knowledge + exam discipline = pass.
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
                Apply proven exam techniques to maximise your score
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Recognise and avoid the common mistakes candidates make under pressure
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use elimination and educated guessing effectively
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Stay calm and focused, even when faced with difficult questions
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Approach the test with confidence, not anxiety
              </li>
            </ul>
          </div>
        </Card>

        {/* Reading Questions Properly */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              1. Reading the Question Properly
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Many fails come from misreading. Always:
              </p>

              <ul className="space-y-2 ml-4">
                <li>• <strong>Look for keywords:</strong> "minimum", "maximum", "must", "should"</li>
                <li>• <strong>Underline or note</strong> what is actually being asked</li>
                <li>• <strong>Don't answer what you think is asked</strong> — answer what is written</li>
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

        {/* Using Elimination */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              2. Using Elimination to Your Advantage
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>Cross out the obviously wrong answers first</strong></li>
                <li>• <strong>Narrowing 4 options to 2</strong> gives you a 50/50 chance even if unsure</li>
                <li>• <strong>Elimination also reduces panic</strong> and clears your head</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Avoiding Common Traps */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              3. Avoiding Common Traps
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>Mixing units:</strong> confusing kW and W, or ms and s</li>
                <li>• <strong>Maths errors:</strong> not rounding properly, forgetting Ohm's law basics</li>
                <li>• <strong>Overcomplicating:</strong> many questions only need a simple calculation</li>
                <li>• <strong>Changing answers unnecessarily:</strong> trust your first instinct unless you're sure it's wrong</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Content: Reading Questions Properly - Expanded */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Detailed Reading Strategies:</h3>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Key Words to Watch For:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• <strong>"Minimum"</strong> vs <strong>"Maximum"</strong> (most common trap)</li>
                    <li>• <strong>"Must"</strong> vs <strong>"Should"</strong> (legal vs recommended)</li>
                    <li>• <strong>"NOT"</strong> or <strong>"EXCEPT"</strong> (reverse logic)</li>
                    <li>• <strong>"All"</strong> vs <strong>"Some"</strong> (absolute vs partial)</li>
                    <li>• <strong>"Always"</strong> vs <strong>"Usually"</strong> (frequency)</li>
                  </ul>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Active Reading Technique:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li>• Read question twice before looking at options</li>
                    <li>• Circle or highlight key words</li>
                    <li>• Rephrase question in your own words</li>
                    <li>• Check if you need to calculate or just recall</li>
                    <li>• Look for context clues about what's being tested</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Elimination Techniques */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-0 mb-3">Advanced Elimination Strategies:</h3>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Step 1: Obvious Wrong</h4>
                  <p className="text-xs text-muted-foreground">Cross out answers that are clearly impossible or irrelevant to the question context.</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Step 2: Context Check</h4>
                  <p className="text-xs text-muted-foreground">Eliminate answers that don't fit the scenario (e.g., domestic vs industrial).</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Step 3: Best Fit</h4>
                  <p className="text-xs text-muted-foreground">Choose the most complete and accurate answer from remaining options.</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Elimination Example:</h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                  <strong>Question:</strong> "What is the maximum Zs value for a 32A Type B MCB?"
                </p>
                <div className="space-y-1 text-xs text-yellow-700 dark:text-yellow-300">
                  <p>❌ <del>10.5Ω</del> - Way too high (obviously wrong)</p>
                  <p>❌ <del>1.44Ω</del> - This is for 6A, not 32A (context wrong)</p>
                  <p>❌ <del>0.72Ω</del> - This is for 16A, close but wrong (context check)</p>
                  <p>✅ <strong>0.48Ω</strong> - Correct for 32A Type B (best fit)</p>
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

        {/* Staying Calm Under Pressure */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              4. Staying Calm Under Pressure
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>If you hit a hard question,</strong> breathe and move on</li>
                <li>• <strong>Break the test mentally</strong> into smaller chunks (10 questions at a time)</li>
                <li>• <strong>Don't let one question shake your confidence</strong> — the pass mark allows for errors</li>
                <li>• <strong>Remind yourself:</strong> you only need around 60–65% to pass, not 100%</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Answering */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              5. Strategic Answering
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <ul className="space-y-2 ml-4">
                <li>• <strong>Always answer every question</strong> — no penalties for wrong answers</li>
                <li>• <strong>If unsure,</strong> eliminate, guess, and move on</li>
                <li>• <strong>Use flagging</strong> to return later</li>
                <li>• <strong>Manage energy:</strong> avoid spending too long on maths-heavy questions early</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pressure Management Techniques */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-0 mb-3">Pressure Management in Detail:</h3>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">When You Feel Overwhelmed:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Take 3 deep breaths</strong> - reset your nervous system</li>
                    <li>• <strong>Remind yourself:</strong> "I know this material"</li>
                    <li>• <strong>Focus on the current question only</strong> - not the whole test</li>
                    <li>• <strong>Use the 'chunk' method:</strong> think "10 questions done, 3 to go"</li>
                    <li>• <strong>Positive self-talk:</strong> "I can work this out"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Physical Stress Response:</h4>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Tight shoulders?</strong> Roll them back 3 times</li>
                    <li>• <strong>Racing heart?</strong> Slow, controlled breathing</li>
                    <li>• <strong>Sweaty palms?</strong> Wipe them, reset posture</li>
                    <li>• <strong>Mind blank?</strong> Skip question, come back fresh</li>
                    <li>• <strong>Time anxiety?</strong> Check clock every 15 mins only</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Answering Expanded */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-0 mb-3">Strategic Answering - The FAST Method:</h3>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">F - Flag</h4>
                  <p className="text-xs text-muted-foreground">Mark difficult questions for later review instead of getting stuck.</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">A - Answer</h4>
                  <p className="text-xs text-muted-foreground">Give your best guess using elimination - never leave blank.</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">S - Skip</h4>
                  <p className="text-xs text-muted-foreground">Move on quickly to maintain momentum and confidence.</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">T - Time</h4>
                  <p className="text-xs text-muted-foreground">Return with remaining time for fresh perspective.</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Energy Management:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-green-700 dark:text-green-300">
                  <div>
                    <p className="font-medium mb-1">First Pass (60 minutes):</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Answer all easy questions quickly</li>
                      <li>• Flag complex calculations</li>
                      <li>• Build confidence and momentum</li>
                      <li>• Aim for 25-30 questions complete</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Second Pass (20 minutes):</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Focus on flagged questions</li>
                      <li>• Use elimination techniques</li>
                      <li>• Apply fresh perspective</li>
                      <li>• Final check of risky answers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Practical Guidance */}
        <Card className="bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700/50 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-700 dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">
                  Practical Guidance
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                  <li>• <strong>Practice active reading.</strong> Say the question to yourself in your own words</li>
                  <li>• <strong>Check units twice</strong> before clicking</li>
                  <li>• <strong>Answer with confidence.</strong> Don't waste time doubting yourself after every click</li>
                  <li>• <strong>Treat the test like a job task</strong> — you're proving you can work accurately under pressure</li>
                  <li>• <strong>Walk in positive.</strong> Anxiety costs marks — calm confidence wins them</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Real-World Examples
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                  <p><strong>Example 1:</strong> Candidate misread "maximum" as "minimum" in a regs question. Gave opposite answer → lost easy marks.</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30">
                  <p><strong>Example 2:</strong> Candidate flagged 4 questions, came back fresh, and answered 3 correctly → passed comfortably.</p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30">
                  <p><strong>Example 3:</strong> Candidate panicked, rushed, and changed 6 answers — original choices were correct.</p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                  <p><strong>Example 4:</strong> In real work, an electrician confused kW with W when calculating load. Same error in AM2 = wrong answer.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 text-sm sm:text-base">
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-semibold text-foreground mb-1">Q1: Should I always change my first answer if I feel unsure?</p>
                <p className="text-muted-foreground">A: No — research shows your first instinct is usually right. Change only if you see clear evidence.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-semibold text-foreground mb-1">Q2: How do I handle a maths-heavy question under time pressure?</p>
                <p className="text-muted-foreground">A: Flag it, move on, return later.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-semibold text-foreground mb-1">Q3: What's the biggest trap in AM2 questions?</p>
                <p className="text-muted-foreground">A: Misreading key words like "minimum/maximum" or mixing up units.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-semibold text-foreground mb-1">Q4: How many questions can I afford to get wrong and still pass?</p>
                <p className="text-muted-foreground">A: Around 12–14 wrong (if 40 questions total), depending on pass mark.</p>
              </div>
              
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="font-semibold text-foreground mb-1">Q5: How can I calm nerves before starting?</p>
                <p className="text-muted-foreground">A: Take deep breaths, remind yourself you've practised, and treat it like a normal work task.</p>
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
                  <p>Good exam technique and mindset can add 10–15% to your score. To succeed:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Read carefully, watch for key words</li>
                    <li>• Use elimination and flagging</li>
                    <li>• Avoid common traps with units and maths</li>
                    <li>• Stay calm — you don't need perfection, just steady accuracy</li>
                    <li>• Approach with confidence: knowledge + mindset = pass</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow mb-4">
              Test Your Understanding
            </h2>
            <Quiz questions={quizQuestions} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Time Management
            </Link>
          </Button>
          
          <Button asChild className="w-full sm:w-auto">
            <Link to="..">
              Back to Module 6 Overview
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module6Section4;