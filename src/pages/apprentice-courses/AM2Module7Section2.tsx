import { Brain, CheckCircle, AlertTriangle, Target, Timer, Lightbulb, Heart, Shield, BookOpen, Users, Wrench } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
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

  const learningOutcomes = [
    "Explain how nerves can affect performance in AM2 and identify the risks if they are not managed",
    "Use practical strategies before and during the exam to control stress and stay focused",
    "Apply breathing, pacing, and positive routines to reduce anxiety and prevent panic",
    "Show professionalism under exam pressure by working safely and methodically",
    "Build confidence that nerves will not stop you demonstrating your competence"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module7"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 7", href: "/study-centre/apprentice/am2/module7" },
        { label: "Section 2" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Brain}
        title="Coping with Nerves and Pressure"
        description="Every candidate feels nervous walking into AM2 - it's the industry's benchmark test and there's pressure to pass first time. NET assessors know this and expect you to feel under stress. What they are measuring is not whether you look calm, but whether you can still work safely, methodically, and professionally under pressure."
        badge="Module 7 - Section 2"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Managing Nerves is Essential for AM2 Success"
        message="If nerves make you rush, skip safety procedures, or forget critical steps, marks are lost instantly. Safety-critical errors due to panic result in automatic failure. Assessors expect you to work safely and methodically under pressure - this is a core competency being tested in AM2."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Why Nerves Matter */}
      <AM2ContentCard
        title="1. Why Nerves Matter in AM2"
        icon={AlertTriangle}
        accent
      >
        <p className="text-ios-callout text-white/80 mb-4">
          Nerves create physical and mental reactions that can directly affect your performance:
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-red-400 mb-3">Physical Effects:</h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Shaking hands make terminations sloppy or unsafe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Sweating can affect grip on tools and instruments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Increased heart rate affects fine motor control</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-orange-400 mb-3">Mental Effects:</h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>Brain fog causes forgotten steps in safe isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>Memory lapses in GN3 test sequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>Negative self-talk leads to loss of focus</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-yellow-400 mb-3">Behavioural Consequences:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Rushing increases errors like bare copper, missing CPC sleeving, or wrong paperwork entries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Skipping safety steps due to time pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>Poor decision making under stress</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-ios-headline text-green-400 mb-2">Key Point:</h4>
                <p className="text-ios-callout text-white/70">
                  NET's marking system rewards steady, professional behaviour. Being slightly slow but safe still earns marks; rushing and unsafe = instant fail.
                </p>
              </div>
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

      {/* Strategies to Reduce Nerves Before Exam */}
      <AM2ContentCard
        title="2. Strategies to Reduce Nerves Before the Exam"
        icon={Timer}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          The way you prepare in the days leading up to AM2 will directly influence your stress level on the day.
        </p>

        <div className="space-y-6">
          {/* Strategy 1 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">Preparation Builds Confidence</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Practise safe isolation daily and run through testing procedures until they feel automatic. The more natural the task feels, the less nerves will interfere.
              </p>
              <div className="bg-white/5 border border-blue-500/30 rounded-xl p-3">
                <strong className="text-blue-400 text-ios-callout">Daily Practice Routine:</strong>
                <ul className="text-ios-callout text-white/70 mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Safe isolation sequence every morning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>GN3 testing procedures until automatic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Termination techniques with proper tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Paperwork completion under time pressure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 2 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">Sleep and Rest</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Avoid last-minute all-night revision. A tired candidate makes more mistakes than a calm, rested one.
              </p>
              <div className="bg-white/5 border border-green-500/30 rounded-xl p-3">
                <strong className="text-green-400 text-ios-callout">Sleep Strategy:</strong>
                <ul className="text-ios-callout text-white/70 mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>7-8 hours sleep for 3 nights before AM2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>No cramming after 8pm the night before</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Light revision only on exam morning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 3 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">Fuel Your Body</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Eat a balanced meal before the exam. High sugar or energy drinks can cause shakes and crashes mid-assessment.
              </p>
              <div className="bg-white/5 border border-purple-500/30 rounded-xl p-3">
                <strong className="text-purple-400 text-ios-callout">Nutrition Plan:</strong>
                <ul className="text-ios-callout text-white/70 mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Complex carbohydrates for sustained energy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Avoid caffeine overdose or energy drinks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Bring healthy snacks for breaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Stay hydrated but not over-hydrated</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 4 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">Plan Your Arrival</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Get to the centre early so you're not rushing, which adds unnecessary stress.
              </p>
              <div className="bg-white/5 border border-orange-500/30 rounded-xl p-3">
                <strong className="text-orange-400 text-ios-callout">Arrival Strategy:</strong>
                <ul className="text-ios-callout text-white/70 mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Arrive 30 minutes early minimum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Plan route and check travel times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Have backup transport arrangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Use extra time to settle and focus</span>
                  </li>
                </ul>
              </div>
            </div>
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

      {/* Techniques During Exam */}
      <AM2ContentCard
        title="3. Techniques During the Exam"
        icon={Heart}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          When nerves hit during AM2, you need quick techniques to keep control.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <h4 className="text-ios-headline text-blue-400">Controlled Breathing</h4>
            </div>
            <p className="text-ios-callout text-white/70 mb-3">
              If panic rises, step back for 10 seconds, inhale slowly through your nose, exhale slowly through your mouth. This resets your focus.
            </p>
            <div className="text-ios-footnote text-blue-400 font-medium">
              4-7-8 Technique: Inhale for 4, hold for 7, exhale for 8
            </div>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-green-400" />
              <h4 className="text-ios-headline text-green-400">Break Tasks into Chunks</h4>
            </div>
            <p className="text-ios-callout text-white/70 mb-3">
              Instead of thinking about an 8.5-hour install, focus on the next step: mark out, containment, wiring, terminations.
            </p>
            <div className="text-ios-footnote text-green-400 font-medium">
              One section at a time reduces overwhelm
            </div>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <h4 className="text-ios-headline text-purple-400">Positive Self-Talk</h4>
            </div>
            <p className="text-ios-callout text-white/70 mb-3">
              Replace "I'm messing this up" with "I know the process, I've trained for this." Simple but stops panic spirals.
            </p>
            <div className="text-ios-footnote text-purple-400 font-medium">
              "I can do this safely and methodically"
            </div>
          </div>

          <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-orange-400" />
              <h4 className="text-ios-headline text-orange-400">Ignore Others</h4>
            </div>
            <p className="text-ios-callout text-white/70 mb-3">
              Don't compare your speed with other candidates. The assessor only marks your work, not relative performance.
            </p>
            <div className="text-ios-footnote text-orange-400 font-medium">
              Focus on your own professional standard
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Assessor Expectations */}
      <AM2ContentCard
        title="4. Assessor Expectations"
        icon={Users}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          NET assessors don't mark nerves - they mark your work. They expect you to:
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-green-400 mb-3">Professional Behaviour:</h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Work steadily and safely, even if you look anxious</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Maintain calm, methodical approach under pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Show competence through actions, not appearance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-blue-400 mb-3">Safety Compliance:</h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Keep to procedure (safe isolation, GN3 sequence) without skipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Never compromise safety due to time pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Complete all safety-critical steps in correct order</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-purple-400 mb-3">Time Management:</h4>
            <p className="text-ios-callout text-white/70">
              Complete sections within the set time without rushing. Quality and safety take priority over speed.
            </p>
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

      {/* Practical Guidance */}
      <AM2ContentCard
        title="5. Practical Guidance"
        icon={Wrench}
      >
        <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4 mb-6">
          <h4 className="text-ios-headline text-blue-400 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Think of AM2 Like a Real Job Handover
          </h4>
          <p className="text-ios-callout text-white/70">
            On-site, you may feel pressure from deadlines or customers, but you wouldn't skip earthing or rush unsafe terminations to finish quicker. Treat AM2 the same way - safe, steady, professional.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-ios-headline text-white/90">Practical things you can do:</h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <h5 className="text-ios-headline text-white/90">Mental Checklists</h5>
                  <p className="text-ios-footnote text-white/70">Make checklists in your head: safe isolation steps, test order. Stick to them regardless of nerves.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <h5 className="text-ios-headline text-white/90">If You Get Stuck</h5>
                  <p className="text-ios-footnote text-white/70">Don't freeze. Move on, complete another part, and come back later.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <h5 className="text-ios-headline text-white/90">Record Results</h5>
                  <p className="text-ios-footnote text-white/70">Write down test results as you go so you don't forget under pressure.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                <div>
                  <h5 className="text-ios-headline text-white/90">Stay Hydrated</h5>
                  <p className="text-ios-footnote text-white/70">Dehydration increases stress. Keep water with you throughout the assessment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-World Examples */}
      <AM2ContentCard
        title="6. Real-World Examples"
        icon={BookOpen}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Failure Examples */}
          <div className="space-y-4">
            <h4 className="text-ios-headline text-red-400">Failure Examples:</h4>

            <div className="bg-white/5 border border-red-500/30 rounded-xl p-3">
              <h5 className="text-ios-headline text-red-400 mb-2">Example 1:</h5>
              <p className="text-ios-footnote text-white/70">
                Candidate skipped re-proving tester in safe isolation due to nerves - instant fail.
              </p>
            </div>

            <div className="bg-white/5 border border-red-500/30 rounded-xl p-3">
              <h5 className="text-ios-headline text-red-400 mb-2">Example 2:</h5>
              <p className="text-ios-footnote text-white/70">
                Candidate felt behind on time in the install section, rushed SWA glanding, armour not earthed - marks lost.
              </p>
            </div>
          </div>

          {/* Success Examples */}
          <div className="space-y-4">
            <h4 className="text-ios-headline text-green-400">Success Examples:</h4>

            <div className="bg-white/5 border border-green-500/30 rounded-xl p-3">
              <h5 className="text-ios-headline text-green-400 mb-2">Example 3:</h5>
              <p className="text-ios-footnote text-white/70">
                Candidate paused for breathing, slowed pace, completed all sections safely - passed comfortably.
              </p>
            </div>

            <div className="bg-white/5 border border-green-500/30 rounded-xl p-3">
              <h5 className="text-ios-headline text-green-400 mb-2">Example 4:</h5>
              <p className="text-ios-footnote text-white/70">
                On-site, an electrician under deadline pressure maintained safety standards despite client pressure. Same approach in AM2 = success.
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQ Section */}
      <AM2ContentCard
        title="7. Frequently Asked Questions"
        icon={BookOpen}
      >
        <div className="space-y-4">
          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="text-ios-headline text-white/90 mb-1">Q1: Will assessors fail me just for looking nervous?</h5>
            <p className="text-ios-footnote text-white/70">No - they only fail you if nerves cause unsafe or incomplete work.</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h5 className="text-ios-headline text-white/90 mb-1">Q2: What if I forget steps in testing because of panic?</h5>
            <p className="text-ios-footnote text-white/70">Pause, breathe, reset. Assessors prefer slow but correct over rushed and wrong.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h5 className="text-ios-headline text-white/90 mb-1">Q3: Should I copy other candidates' pace?</h5>
            <p className="text-ios-footnote text-white/70">No - focus only on your own work. Comparing speeds adds unnecessary stress.</p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h5 className="text-ios-headline text-white/90 mb-1">Q4: Is feeling anxious normal?</h5>
            <p className="text-ios-footnote text-white/70">Yes - every candidate feels it. The difference is how you manage it.</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h5 className="text-ios-headline text-white/90 mb-1">Q5: What's the best way to reduce nerves overall?</h5>
            <p className="text-ios-footnote text-white/70">Consistent practice until procedures become automatic - especially safe isolation and GN3 testing.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard
        title="8. Summary"
        icon={CheckCircle}
      >
        <p className="text-ios-callout text-white/80 mb-4">
          Nerves are normal in AM2, but you must control them. NET wants to see that you can:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-ios-callout text-white/80">Stay safe and methodical under pressure</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-ios-callout text-white/80">Use breathing, chunking, and positive self-talk to reset focus</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-ios-callout text-white/80">Avoid rushing or skipping steps due to panic</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-ios-callout text-white/80">Treat the exam like a professional job handover</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-ios-callout text-white/80">Remember: Safe and steady will pass; rushed and unsafe will fail</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-ios-headline text-elec-yellow mb-2">Key Takeaway:</h4>
              <p className="text-ios-callout text-white/80">
                NET assessors understand that you will feel nervous. What they're testing is your ability to work safely and professionally despite those nerves - just like you would on a real job site under pressure.
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="Test Your Knowledge: Coping with Nerves and Pressure"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section1"
        previousLabel="Knowledge Test Practice"
        nextHref="../section3"
        nextLabel="Safety-first Approach"
        currentSection={2}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module7Section2;
