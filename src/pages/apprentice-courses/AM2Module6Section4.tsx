import { BookOpen, CheckCircle, AlertTriangle, Eye, Brain, Target, Lightbulb, Calculator, FileText, Search } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module6Section4 = () => {
  useSEO(
    "Exam Techniques and Mindset | AM2 Module 6 Section 4",
    "Proven exam techniques, mindset strategies, and common mistake avoidance for AM2 online knowledge test success"
  );

  const learningOutcomes = [
    "Apply proven exam techniques to maximise your score",
    "Recognise and avoid the common mistakes candidates make under pressure",
    "Use elimination and educated guessing effectively",
    "Stay calm and focused, even when faced with difficult questions",
    "Approach the test with confidence, not anxiety"
  ];

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
        "Minimum is 0.5 MO, recommended is 1 MO",
        "Minimum is 1 MO (legal pass), recommended is best practice target",
        "Recommended is always half the minimum"
      ],
      correctIndex: 2,
      explanation: "Minimum is the legal pass mark (1 MO), recommended is the best practice target for good installations."
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
      explanation: "280 ms - candidates often lose marks by miswriting units. 0.28 s = 280 ms (multiply by 1000)."
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
      explanation: "280 ms is correct. To convert seconds to milliseconds, multiply by 1000: 0.28 x 1000 = 280 ms."
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
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={["AM2", "Module 6", "Section 4"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Brain}
        title="Exam Techniques and Mindset"
        description="The AM2 online knowledge test is as much about exam discipline and mindset as it is about knowledge. Many candidates know the material but lose marks because they misread questions, panic under pressure, or second-guess themselves. This section teaches you how to approach questions with the right techniques, avoid common pitfalls, and maintain a confident, professional mindset."
        badge="Module 6 • Section 4"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="CRITICAL: Exam Technique is Everything">
        <p className="text-ios-callout text-white/80 mb-2">
          Many candidates fail the AM2 knowledge test not due to lack of knowledge, but poor exam technique. Misreading questions, panicking under pressure, and second-guessing yourself are guaranteed routes to failure.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Master these techniques and your mindset. Knowledge + exam discipline = pass.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <AM2LearningOutcomes outcomes={learningOutcomes} />
      </AM2ContentCard>

      {/* Reading Questions Properly */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          1. Reading the Question Properly
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p className="text-white/80">
            Many fails come from misreading. Always:
          </p>

          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Look for keywords:</strong> "minimum", "maximum", "must", "should"</li>
            <li>- <strong className="text-white">Underline or note</strong> what is actually being asked</li>
            <li>- <strong className="text-white">Don't answer what you think is asked</strong> - answer what is written</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Detailed Reading Strategies:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Key Words to Watch For:</h4>
              <ul className="space-y-1 text-xs sm:text-sm text-white/80">
                <li>- <strong className="text-white">"Minimum"</strong> vs <strong className="text-white">"Maximum"</strong> (most common trap)</li>
                <li>- <strong className="text-white">"Must"</strong> vs <strong className="text-white">"Should"</strong> (legal vs recommended)</li>
                <li>- <strong className="text-white">"NOT"</strong> or <strong className="text-white">"EXCEPT"</strong> (reverse logic)</li>
                <li>- <strong className="text-white">"All"</strong> vs <strong className="text-white">"Some"</strong> (absolute vs partial)</li>
                <li>- <strong className="text-white">"Always"</strong> vs <strong className="text-white">"Usually"</strong> (frequency)</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Active Reading Technique:</h4>
              <ul className="space-y-1 text-xs sm:text-sm text-white/80">
                <li>- Read question twice before looking at options</li>
                <li>- Circle or highlight key words</li>
                <li>- Rephrase question in your own words</li>
                <li>- Check if you need to calculate or just recall</li>
                <li>- Look for context clues about what's being tested</li>
              </ul>
            </div>
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

      {/* Using Elimination */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Search className="h-5 w-5" />
          2. Using Elimination to Your Advantage
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Cross out the obviously wrong answers first</strong></li>
            <li>- <strong className="text-white">Narrowing 4 options to 2</strong> gives you a 50/50 chance even if unsure</li>
            <li>- <strong className="text-white">Elimination also reduces panic</strong> and clears your head</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Advanced Elimination Strategies:</h3>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">Step 1: Obvious Wrong</h4>
              <p className="text-xs text-white/80">Cross out answers that are clearly impossible or irrelevant to the question context.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">Step 2: Context Check</h4>
              <p className="text-xs text-white/80">Eliminate answers that don't fit the scenario (e.g., domestic vs industrial).</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">Step 3: Best Fit</h4>
              <p className="text-xs text-white/80">Choose the most complete and accurate answer from remaining options.</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-950/20 rounded-lg border border-amber-800/30">
            <h4 className="font-semibold text-amber-200 mb-2">Elimination Example:</h4>
            <p className="text-xs sm:text-sm text-amber-300 mb-2">
              <strong>Question:</strong> "What is the maximum Zs value for a 32A Type B MCB?"
            </p>
            <div className="space-y-1 text-xs text-amber-300">
              <p>X <del>10.5O</del> - Way too high (obviously wrong)</p>
              <p>X <del>7.28O</del> - This is for 6A, not 32A (context wrong)</p>
              <p>X <del>2.73O</del> - This is for 16A, close but wrong (context check)</p>
              <p className="text-green-400">Correct: <strong>1.37O</strong> - Correct for 32A Type B (best fit)</p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Avoiding Common Traps */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          3. Avoiding Common Traps
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Mixing units:</strong> confusing kW and W, or ms and s</li>
            <li>- <strong className="text-white">Maths errors:</strong> not rounding properly, forgetting Ohm's law basics</li>
            <li>- <strong className="text-white">Overcomplicating:</strong> many questions only need a simple calculation</li>
            <li>- <strong className="text-white">Changing answers unnecessarily:</strong> trust your first instinct unless you're sure it's wrong</li>
          </ul>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Staying Calm Under Pressure */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Target className="h-5 w-5" />
          4. Staying Calm Under Pressure
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">If you hit a hard question,</strong> breathe and move on</li>
            <li>- <strong className="text-white">Break the test mentally</strong> into smaller chunks (10 questions at a time)</li>
            <li>- <strong className="text-white">Don't let one question shake your confidence</strong> - the pass mark allows for errors</li>
            <li>- <strong className="text-white">Remind yourself:</strong> you only need around 60-65% to pass, not 100%</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Pressure Management in Detail:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-3">When You Feel Overwhelmed:</h4>
              <ul className="space-y-2 ml-4 text-white/80">
                <li>- <strong className="text-white">Take 3 deep breaths</strong> - reset your nervous system</li>
                <li>- <strong className="text-white">Remind yourself:</strong> "I know this material"</li>
                <li>- <strong className="text-white">Focus on the current question only</strong> - not the whole test</li>
                <li>- <strong className="text-white">Use the 'chunk' method:</strong> think "10 questions done, 3 to go"</li>
                <li>- <strong className="text-white">Positive self-talk:</strong> "I can work this out"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Physical Stress Response:</h4>
              <ul className="space-y-2 ml-4 text-white/80">
                <li>- <strong className="text-white">Tight shoulders?</strong> Roll them back 3 times</li>
                <li>- <strong className="text-white">Racing heart?</strong> Slow, controlled breathing</li>
                <li>- <strong className="text-white">Sweaty palms?</strong> Wipe them, reset posture</li>
                <li>- <strong className="text-white">Mind blank?</strong> Skip question, come back fresh</li>
                <li>- <strong className="text-white">Time anxiety?</strong> Check clock every 15 mins only</li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Strategic Answering */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          5. Strategic Answering
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Always answer every question</strong> - no penalties for wrong answers</li>
            <li>- <strong className="text-white">If unsure,</strong> eliminate, guess, and move on</li>
            <li>- <strong className="text-white">Use flagging</strong> to return later</li>
            <li>- <strong className="text-white">Manage energy:</strong> avoid spending too long on maths-heavy questions early</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Strategic Answering - The FAST Method:</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">F - Flag</h4>
              <p className="text-xs text-white/80">Mark difficult questions for later review instead of getting stuck.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">A - Answer</h4>
              <p className="text-xs text-white/80">Give your best guess using elimination - never leave blank.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">S - Skip</h4>
              <p className="text-xs text-white/80">Move on quickly to maintain momentum and confidence.</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-sm">T - Time</h4>
              <p className="text-xs text-white/80">Return with remaining time for fresh perspective.</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-950/20 rounded-lg border border-green-800/30">
            <h4 className="font-semibold text-green-200 mb-2">Energy Management:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-green-300">
              <div>
                <p className="font-medium mb-1">First Pass (60 minutes):</p>
                <ul className="space-y-1 ml-4">
                  <li>- Answer all easy questions quickly</li>
                  <li>- Flag complex calculations</li>
                  <li>- Build confidence and momentum</li>
                  <li>- Aim for 25-30 questions complete</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Second Pass (20 minutes):</p>
                <ul className="space-y-1 ml-4">
                  <li>- Focus on flagged questions</li>
                  <li>- Use elimination techniques</li>
                  <li>- Apply fresh perspective</li>
                  <li>- Final check of risky answers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Practical Guidance
        </h2>

        <ul className="space-y-2 text-sm text-white/80">
          <li>- <strong className="text-white">Practice active reading.</strong> Say the question to yourself in your own words</li>
          <li>- <strong className="text-white">Check units twice</strong> before clicking</li>
          <li>- <strong className="text-white">Answer with confidence.</strong> Don't waste time doubting yourself after every click</li>
          <li>- <strong className="text-white">Treat the test like a job task</strong> - you're proving you can work accurately under pressure</li>
          <li>- <strong className="text-white">Walk in positive.</strong> Anxiety costs marks - calm confidence wins them</li>
        </ul>
      </AM2ContentCard>

      {/* Real-World Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Real-World Examples
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-red-950/20 rounded-lg border border-red-800/30">
            <p className="text-white/80"><strong className="text-red-200">Example 1:</strong> Candidate misread "maximum" as "minimum" in a regs question. Gave opposite answer - lost easy marks.</p>
          </div>

          <div className="p-4 bg-green-950/20 rounded-lg border border-green-800/30">
            <p className="text-white/80"><strong className="text-green-200">Example 2:</strong> Candidate flagged 4 questions, came back fresh, and answered 3 correctly - passed comfortably.</p>
          </div>

          <div className="p-4 bg-red-950/20 rounded-lg border border-red-800/30">
            <p className="text-white/80"><strong className="text-red-200">Example 3:</strong> Candidate panicked, rushed, and changed 6 answers - original choices were correct.</p>
          </div>

          <div className="p-4 bg-amber-950/20 rounded-lg border border-amber-800/30">
            <p className="text-white/80"><strong className="text-amber-200">Example 4:</strong> In real work, an electrician confused kW with W when calculating load. Same error in AM2 = wrong answer.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-sm sm:text-base">
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <p className="font-semibold text-white mb-1">Q1: Should I always change my first answer if I feel unsure?</p>
            <p className="text-white/80">A: No - research shows your first instinct is usually right. Change only if you see clear evidence.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <p className="font-semibold text-white mb-1">Q2: How do I handle a maths-heavy question under time pressure?</p>
            <p className="text-white/80">A: Flag it, move on, return later.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <p className="font-semibold text-white mb-1">Q3: What's the biggest trap in AM2 questions?</p>
            <p className="text-white/80">A: Misreading key words like "minimum/maximum" or mixing up units.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <p className="font-semibold text-white mb-1">Q4: How many questions can I afford to get wrong and still pass?</p>
            <p className="text-white/80">A: Around 12-14 wrong (if 40 questions total), depending on pass mark.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <p className="font-semibold text-white mb-1">Q5: How can I calm nerves before starting?</p>
            <p className="text-white/80">A: Take deep breaths, remind yourself you've practised, and treat it like a normal work task.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Summary
        </h2>

        <div className="text-sm text-white/80 space-y-3">
          <p>Good exam technique and mindset can add 10-15% to your score. To succeed:</p>
          <ul className="space-y-1 ml-4">
            <li>- Read carefully, watch for key words</li>
            <li>- Use elimination and flagging</li>
            <li>- Avoid common traps with units and maths</li>
            <li>- Stay calm - you don't need perfection, just steady accuracy</li>
            <li>- Approach with confidence: knowledge + mindset = pass</li>
          </ul>
        </div>
      </AM2ContentCard>

      {/* Quiz */}
      <Quiz questions={quizQuestions} title="Test Your Understanding" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section3"
        prevLabel="Time Management"
        nextHref=".."
        nextLabel="Module 6 Overview"
        currentSection={4}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module6Section4;
