/**
 * Level 3 Module 8 Section 4.1 - Score Analysis
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Detailed analysis of mock exam scores and performance metrics
 */

import { ArrowLeft, Zap, CheckCircle, TrendingUp, BarChart3, Target, AlertTriangle, Calculator, Trophy, XCircle, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Score Analysis - Level 3 Module 8 Section 4.1";
const DESCRIPTION = "Learn to analyse your mock exam scores effectively. Understand what your results mean, identify patterns, and use score data to guide targeted revision.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "You scored 68% on a mock exam. According to typical pass criteria, where does this place you?",
    options: [
      "Failed - need significant improvement",
      "Borderline - close to pass but at risk",
      "Safe pass - comfortable margin above minimum",
      "Distinction level performance"
    ],
    correctIndex: 1,
    explanation: "With typical pass marks around 65%, a 68% score is borderline - technically passing but only 3% above the threshold. This provides little safety margin for exam day variation. Aim for 75%+ to ensure a comfortable pass."
  },
  {
    id: "check-2",
    question: "What does it mean if you consistently score well on knowledge questions but poorly on calculation questions?",
    options: [
      "You're naturally good at theory",
      "The calculations are unfairly difficult",
      "You need targeted practice on calculation techniques and formulas",
      "You should focus only on your strengths"
    ],
    correctIndex: 2,
    explanation: "Consistent patterns reveal specific areas needing work. Strong knowledge scores show good understanding; weak calculation scores indicate need for formula practice, method revision, or more worked examples. Address weaknesses specifically."
  },
  {
    id: "check-3",
    question: "You scored 85% but got 3 questions about RCD testing wrong. What should your priority be?",
    options: [
      "Celebrate the high score and move on",
      "Review RCD testing specifically despite the overall high score",
      "Focus on other weak areas first",
      "The high score means you know everything"
    ],
    correctIndex: 1,
    explanation: "Even with high overall scores, consistently missing the same topic reveals a knowledge gap. RCD testing questions on the real exam won't be the same ones - you need to understand the topic properly. A high score overall doesn't mean every topic is secure."
  },
  {
    id: "check-4",
    question: "What is the most useful way to track mock exam progress over time?",
    options: [
      "Only remember your best score",
      "Track overall percentage and topic-by-topic breakdown for each attempt",
      "Focus only on whether you passed or failed",
      "Compare yourself to other candidates"
    ],
    correctIndex: 1,
    explanation: "Tracking both overall scores and topic breakdowns reveals trends: improving areas, persistent weaknesses, and whether your study is effective. This data guides future revision. Single scores or pass/fail alone doesn't show the full picture."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is typically considered a 'safe' mock exam score to aim for before the real exam?",
    options: [
      "Just above the pass mark (e.g., 66% if pass is 65%)",
      "At least 10% above the pass mark (e.g., 75%+ if pass is 65%)",
      "100% is the only safe score",
      "Pass mark is sufficient if achieved once"
    ],
    correctAnswer: 1,
    explanation: "Aim for 10%+ above pass mark to account for exam day variation, nerves, unfamiliar questions, and the fact mock exams may not perfectly match real exam difficulty. A 75%+ score typically indicates solid preparation."
  },
  {
    id: 2,
    question: "What does 'question difficulty analysis' reveal about your performance?",
    options: [
      "How hard the exam board tried to fail you",
      "Whether you're getting easy questions right and struggling with complex ones, or vice versa",
      "The difficulty of your revision material",
      "Your overall intelligence level"
    ],
    correctAnswer: 1,
    explanation: "Analysing by question difficulty reveals if your fundamentals are strong (easy questions correct) and if you can handle complexity (hard questions correct). Getting easy ones wrong but hard ones right might indicate carelessness; opposite pattern suggests knowledge gaps in advanced topics."
  },
  {
    id: 3,
    question: "You've taken three mock exams and scored 55%, 62%, 68%. What does this trend suggest?",
    options: [
      "Random variation with no meaning",
      "Consistent improvement - your revision is working",
      "You're getting worse at exams",
      "The mocks are getting easier"
    ],
    correctAnswer: 1,
    explanation: "A clear upward trend (55% to 68%) indicates effective revision. You're learning from mistakes and building knowledge. Continue your approach while targeting remaining weak areas. This is positive progress."
  },
  {
    id: 4,
    question: "What should you do if your scores plateau (e.g., 70%, 71%, 69% across three mocks)?",
    options: [
      "Keep doing the same thing - you'll eventually improve",
      "Give up - this is your maximum ability",
      "Change your revision approach - you've hit a ceiling with current methods",
      "Take more mock exams until you improve"
    ],
    correctAnswer: 2,
    explanation: "Plateaued scores suggest your current approach has taken you as far as it can. You need different strategies: deeper learning (not just memorising), addressing persistent weak topics specifically, or trying different revision methods (active vs passive)."
  },
  {
    id: 5,
    question: "Why is it important to analyse scores by topic, not just overall percentage?",
    options: [
      "It's not important - overall score is what matters",
      "To identify specific knowledge gaps that overall score might hide",
      "To impress instructors with detailed analysis",
      "Topic analysis is only for advanced students"
    ],
    correctAnswer: 1,
    explanation: "Overall scores can hide significant weaknesses. You might score 75% overall but only 40% on earthing - a critical safety topic. Topic analysis reveals these hidden gaps so you can address them specifically rather than general revision."
  },
  {
    id: 6,
    question: "What is the value of reviewing questions you got RIGHT?",
    options: [
      "No value - focus only on wrong answers",
      "Confirms understanding and may reveal lucky guesses that need reinforcement",
      "Only useful for boosting confidence",
      "Right answers should never be reviewed"
    ],
    correctAnswer: 1,
    explanation: "Reviewing correct answers confirms understanding and catches lucky guesses. If you got a question right but aren't sure why, you might miss a similar question phrased differently. Confirming correct answers reinforces learning."
  },
  {
    id: 7,
    question: "What does it indicate if your score decreases significantly from one mock to the next?",
    options: [
      "The second mock was harder",
      "Possible factors: fatigue, stress, content gaps exposed, or random variation",
      "You forgot everything you learned",
      "Mock exams are unreliable"
    ],
    correctAnswer: 1,
    explanation: "Score drops can result from multiple factors: the second mock may have covered topics you're weaker in, you may have been tired or stressed, or it may be random variation. Analyse the specific questions missed to understand the cause."
  },
  {
    id: 8,
    question: "How should you interpret a mock exam score of exactly 65% (pass mark)?",
    options: [
      "Perfect - you know exactly enough to pass",
      "Very risky - real exam could go either way with zero safety margin",
      "You should celebrate passing",
      "Mock exam scores always match real exam performance"
    ],
    correctAnswer: 1,
    explanation: "Scoring exactly at pass mark is risky. Real exam conditions (stress, unfamiliar venue, different questions) can easily cause performance variation. A borderline mock score could translate to either pass or fail on the actual exam. Build more margin."
  },
  {
    id: 9,
    question: "What is 'error pattern analysis' in score review?",
    options: [
      "Counting how many errors you made",
      "Identifying recurring types of mistakes (e.g., always misreading questions, calculation errors)",
      "Analysing the exam paper for printing errors",
      "A statistical method only examiners use"
    ],
    correctAnswer: 1,
    explanation: "Error pattern analysis identifies recurring mistake types: misreading questions, calculation errors, time pressure mistakes, specific topic gaps. Identifying patterns allows targeted correction - it's more effective than just 'study more'."
  },
  {
    id: 10,
    question: "Why might you score lower on a mock exam that's more realistic (timed, exam conditions)?",
    options: [
      "Realistic conditions are unfair",
      "Time pressure and exam conditions reveal true performance under stress",
      "You should always practice without time limits",
      "Mock exams under exam conditions are inaccurate"
    ],
    correctAnswer: 1,
    explanation: "Untimed practice allows unlimited thinking time that won't exist in real exams. Timed mock exams under exam conditions reveal your true likely performance. Lower scores here are valuable data - they show what you need to work on for real exam conditions."
  },
  {
    id: 11,
    question: "What action should follow identifying a consistently weak topic across multiple mocks?",
    options: [
      "Hope it doesn't appear in the real exam",
      "Focus revision specifically on that topic using varied resources",
      "Accept you'll never understand it",
      "Avoid that topic in revision - focus on strengths"
    ],
    correctAnswer: 1,
    explanation: "Consistently weak topics need targeted attention. Use different resources (textbooks, videos, practice questions, discussion) to attack from multiple angles. Don't hope it won't appear - exams often feature questions on fundamental topics."
  },
  {
    id: 12,
    question: "How should you use score analysis findings to adjust your revision plan?",
    options: [
      "Ignore them and continue with original plan",
      "Allocate more time to weak areas while maintaining strong areas",
      "Only study weak areas from now on",
      "Score analysis shouldn't change your plan"
    ],
    correctAnswer: 1,
    explanation: "Score analysis should actively guide revision: allocate more time to weak areas, but don't neglect strong areas (they need maintenance). Update your plan based on data. This evidence-based approach is more effective than generic study."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How many mock exams should I take before the real exam?",
    answer: "Aim for at least 3-5 full mock exams under timed conditions, plus additional topic-specific practice. Space them out to allow for learning between attempts. The last mock should be 3-5 days before the real exam, leaving time to address any final weak areas."
  },
  {
    question: "My mock scores vary a lot - is that normal?",
    answer: "Some variation is normal (5-10%) due to topic coverage, question difficulty, and your state on the day. Large variation (15%+) may indicate inconsistent knowledge - you know some areas well but have gaps. Focus on building consistent competence across all topics."
  },
  {
    question: "Should I be concerned if mock exams are easier than I expected?",
    answer: "Yes - mock exams that seem easy may not adequately prepare you. Ensure you're using realistic mock exams from reputable sources that match exam format and difficulty. If mocks are too easy, you may be overconfident about your readiness."
  },
  {
    question: "How do I know if my mock exam scores accurately predict real exam performance?",
    answer: "Mock exams best predict real performance when they: match the real exam format, cover similar content, are completed under timed conditions, and come from reputable sources. Self-marked open-book practice is less predictive than supervised timed mocks."
  },
  {
    question: "I keep getting the same topic wrong - why can't I improve?",
    answer: "Persistent errors in one topic usually mean your foundational understanding is flawed, not just facts missing. Go back to basics: read explanatory material, watch videos, work through examples step-by-step. Understand WHY before memorising WHAT."
  },
  {
    question: "Is it better to have high scores on a few mocks or consistent scores on many?",
    answer: "Consistency across many mocks is more valuable. A single high score might be luck; consistent 75%+ across 5+ mocks shows reliable competence. Take enough mocks to establish a pattern - then you know your true performance level."
  }
];

// ============================================
// SCORE BANDS DATA
// ============================================
const scoreBands = [
  {
    band: "Below 50%",
    colour: "red",
    interpretation: "Significant gaps - need substantial revision",
    action: "Return to foundational learning. Use structured resources, not just practice questions.",
    risk: "High risk of failing real exam"
  },
  {
    band: "50-64%",
    colour: "orange",
    interpretation: "Below pass mark - improving but not exam-ready",
    action: "Identify and target specific weak topics. Increase practice intensity.",
    risk: "Would fail - need more preparation"
  },
  {
    band: "65-74%",
    colour: "yellow",
    interpretation: "Passing but borderline - limited safety margin",
    action: "Build margin above pass mark. Address remaining weak areas.",
    risk: "At risk - could pass or fail depending on exam"
  },
  {
    band: "75-84%",
    colour: "green",
    interpretation: "Comfortable pass - solid preparation",
    action: "Maintain momentum. Fine-tune remaining weak spots.",
    risk: "Low risk - likely to pass"
  },
  {
    band: "85%+",
    colour: "blue",
    interpretation: "Strong performance - well prepared",
    action: "Maintain current level. Consider helping others or deeper study.",
    risk: "Very low risk - confident pass expected"
  }
];

// ============================================
// ANALYSIS METRICS DATA
// ============================================
const analysisMetrics = [
  {
    metric: "Overall Percentage",
    description: "Total marks achieved as percentage of maximum",
    useFor: "General readiness assessment, pass/fail prediction"
  },
  {
    metric: "Topic Breakdown",
    description: "Percentage score for each topic/chapter",
    useFor: "Identifying specific knowledge gaps"
  },
  {
    metric: "Question Type Performance",
    description: "Scores by question type (multiple choice, calculation, scenario)",
    useFor: "Identifying skill gaps (recall vs application)"
  },
  {
    metric: "Trend Over Time",
    description: "How scores change across multiple attempts",
    useFor: "Measuring revision effectiveness"
  },
  {
    metric: "Error Pattern",
    description: "Types of mistakes (careless, knowledge gap, time pressure)",
    useFor: "Targeting specific improvement strategies"
  },
  {
    metric: "Time Analysis",
    description: "Time spent per question vs performance",
    useFor: "Improving exam technique and pacing"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Score Analysis
          </h1>
          <p className="text-white/80">
            Understanding your mock exam results for targeted improvement
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Target:</strong> 75%+ for comfortable pass (65% minimum)</li>
              <li><strong>Analyse:</strong> By topic and question type, not just overall</li>
              <li><strong>Track:</strong> Scores over time to measure progress</li>
              <li><strong>Act:</strong> Use analysis to guide targeted revision</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Consistent topic weaknesses across mocks</li>
              <li><strong>Use:</strong> Topic breakdown to find specific gaps</li>
              <li><strong>Apply:</strong> Direct more revision time to weak areas</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret mock exam scores in context of pass requirements",
              "Analyse performance by topic and question type",
              "Identify meaningful patterns in your results",
              "Track progress over time to measure revision effectiveness",
              "Use score data to guide targeted revision",
              "Avoid common interpretation mistakes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Score Bands
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Raw scores only tell part of the story. Understanding what different score levels mean - in terms of exam readiness and required action - helps you interpret your results meaningfully. Don't just celebrate passing or despair at failing; understand what your score indicates about your preparation.
            </p>

            <div className="space-y-3 my-6">
              {scoreBands.map((band, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  band.colour === 'red' ? 'bg-red-500/10 border-red-500/20' :
                  band.colour === 'orange' ? 'bg-orange-500/10 border-orange-500/20' :
                  band.colour === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20' :
                  band.colour === 'green' ? 'bg-green-500/10 border-green-500/20' :
                  'bg-blue-500/10 border-blue-500/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className={`h-4 w-4 ${
                      band.colour === 'red' ? 'text-red-400' :
                      band.colour === 'orange' ? 'text-orange-400' :
                      band.colour === 'yellow' ? 'text-yellow-400' :
                      band.colour === 'green' ? 'text-green-400' :
                      'text-blue-400'
                    }`} />
                    <span className="font-medium text-white">{band.band}</span>
                  </div>
                  <p className="text-xs text-white/80 mb-2">{band.interpretation}</p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <span className="text-elec-yellow">Action: <span className="text-white/70">{band.action}</span></span>
                    <span className={`${
                      band.colour === 'red' ? 'text-red-400' :
                      band.colour === 'orange' ? 'text-orange-400' :
                      band.colour === 'yellow' ? 'text-yellow-400' :
                      band.colour === 'green' ? 'text-green-400' :
                      'text-blue-400'
                    }`}>Risk: <span className="text-white/70">{band.risk}</span></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 75% Rule</p>
              <p className="text-xs text-white/90">
                If the pass mark is 65%, aim for 75% on mock exams. This provides a 10% safety margin to account for: exam day nerves, unfamiliar question formats, topics covered differently than in mocks, and natural performance variation. A borderline mock score often translates to borderline or failing real exam results.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important Context:</strong> These bands assume mock exams of similar difficulty to the real exam. Easier mock exams may inflate your apparent readiness. Use official or quality third-party mock exams for accurate assessment.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Topic-Level Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overall scores can hide significant topic-level weaknesses. Breaking down your performance by topic reveals specific areas needing attention. A candidate scoring 72% overall might score 90% on some topics but only 45% on others - the overall score hides a serious gap.
            </p>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-3">Example Topic Breakdown Analysis:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">Health & Safety</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-green-400 w-10 text-right">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">Electrical Science</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <span className="text-green-400 w-10 text-right">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">Wiring Systems</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                    <span className="text-yellow-400 w-10 text-right">68%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">Earthing & Bonding</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: '52%'}}></div>
                    </div>
                    <span className="text-red-400 w-10 text-right">52%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">Testing & Inspection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <span className="text-yellow-400 w-10 text-right">70%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Overall: 71% - but Earthing & Bonding needs urgent attention</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Strong Areas (75%+)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Maintain through periodic review</li>
                  <li>Don't completely neglect (skill decay)</li>
                  <li>Consider using these as confidence builders</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Weak Areas (Below 65%)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Allocate significantly more revision time</li>
                  <li>Use varied resources (videos, books, practice)</li>
                  <li>Consider foundational re-learning</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Create a Topic Tracker:</strong> After each mock exam, record your score for each topic. Over multiple mocks, patterns emerge. Consistently weak topics need fundamental re-learning; occasional weakness may just need review.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Analysing Performance Trends
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Single mock exam scores have limited meaning - they could reflect your true ability, an easy/hard paper, or your state on that day. Tracking scores over multiple attempts reveals meaningful trends: is your revision working? Are you improving? Have you plateaued?
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-elec-yellow/80">Metric</th>
                    <th className="text-left py-2 text-elec-yellow/80">What It Shows</th>
                    <th className="text-left py-2 text-elec-yellow/80">Use For</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisMetrics.map((item, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-2 text-white">{item.metric}</td>
                      <td className="py-2 text-white/80 text-xs">{item.description}</td>
                      <td className="py-2 text-white/70 text-xs">{item.useFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <p className="text-sm font-medium text-white">Improving</p>
                </div>
                <p className="text-xs text-white/70">Scores increasing over time (e.g., 58% to 67% to 74%). Your revision is working - continue and refine.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-yellow-400" />
                  <p className="text-sm font-medium text-white">Plateaued</p>
                </div>
                <p className="text-xs text-white/70">Scores stable (e.g., 69%, 70%, 68%). Current methods have reached their limit - try new approaches.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
                  <p className="text-sm font-medium text-white">Declining</p>
                </div>
                <p className="text-xs text-white/70">Scores decreasing (e.g., 72% to 65% to 60%). Investigate cause - burnout, forgotten topics, or harder content.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 my-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-400 mb-1">Breaking Through Plateaus</p>
                  <p className="text-xs text-white/90">
                    If scores plateau despite continued revision, your learning approach needs to change: try different resources, switch from passive reading to active recall, get help from an instructor, or approach topics from new angles. More of the same won't produce different results.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Minimum Data Points:</strong> You need at least 3 mock exam scores to identify a meaningful trend. One high or low score could be anomaly. Consistent patterns across multiple attempts are significant.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            From Analysis to Action
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Score analysis is only valuable if it informs action. Converting insights into specific revision changes is the critical step. Vague intentions ('study more') are less effective than specific plans ('spend 30 minutes daily on earthing calculations').
            </p>

            <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Analysis-to-Action Framework:</p>
              <ol className="text-xs text-white/90 space-y-2">
                <li><strong>1. Identify:</strong> Which topics consistently score below target? Which error types recur?</li>
                <li><strong>2. Prioritise:</strong> Rank weak areas by importance (weight in exam, severity of gap).</li>
                <li><strong>3. Allocate:</strong> Assign specific time blocks to priority weak areas.</li>
                <li><strong>4. Select:</strong> Choose appropriate resources for each weak area.</li>
                <li><strong>5. Implement:</strong> Follow the plan consistently for 1-2 weeks.</li>
                <li><strong>6. Retest:</strong> Take another mock to measure improvement.</li>
                <li><strong>7. Iterate:</strong> Adjust plan based on new results.</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Vague (Ineffective)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>"Study harder"</li>
                  <li>"Revise more"</li>
                  <li>"Focus on weak areas"</li>
                  <li>"Do better next time"</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Specific (Effective)</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>"30 mins daily on earthing systems"</li>
                  <li>"Complete 20 calculation questions this week"</li>
                  <li>"Watch earthing tutorial videos"</li>
                  <li>"Retest earthing topic in 5 days"</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sample Improvement Plan:</p>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-xs text-white/80 mb-2"><strong>Finding:</strong> Earthing & Bonding scores at 52% across 3 mocks</p>
                <ul className="text-xs text-white/70 space-y-1">
                  <li><strong>Root Cause:</strong> Confusion between TN-S and TN-C-S systems</li>
                  <li><strong>Action 1:</strong> Re-read textbook chapter on earthing systems (Day 1-2)</li>
                  <li><strong>Action 2:</strong> Watch video tutorial on earthing arrangements (Day 3)</li>
                  <li><strong>Action 3:</strong> Complete 30 earthing-specific practice questions (Day 4-6)</li>
                  <li><strong>Action 4:</strong> Create comparison diagram of earthing systems (Day 7)</li>
                  <li><strong>Retest:</strong> Topic test on Day 8, full mock on Day 10</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Review and Adjust:</strong> Your improvement plan should evolve. After each mock, review what worked and what didn't. Double down on effective strategies; change ineffective ones. Continuous adjustment based on data produces results.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Your Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create a spreadsheet or notebook for tracking all mock results</li>
                <li>Record: date, overall score, topic breakdown, time taken, error types</li>
                <li>Note specific questions you got wrong and why</li>
                <li>Track trends across multiple attempts visually (charts help)</li>
                <li>Include action items identified from each analysis</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Error Categories to Track</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Knowledge gap:</strong> Didn't know the content - needs study</li>
                <li><strong>Careless error:</strong> Knew but made silly mistake - needs care</li>
                <li><strong>Time pressure:</strong> Ran out of time - needs pacing practice</li>
                <li><strong>Misread question:</strong> Answered wrong question - needs reading technique</li>
                <li><strong>Calculation error:</strong> Method correct, arithmetic wrong - needs checking</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Analysis Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Only looking at overall score, ignoring topic breakdown</li>
                <li>Not tracking results over time (no trend analysis)</li>
                <li>Analysing results but not changing revision approach</li>
                <li>Over-reacting to single mock results (could be anomaly)</li>
                <li>Ignoring right answers (might be lucky guesses)</li>
              </ul>
            </div>
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

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Score Analysis</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Score Targets</p>
                <ul className="space-y-0.5">
                  <li>Below 65% = Not exam-ready</li>
                  <li>65-74% = Borderline - risky</li>
                  <li>75%+ = Comfortable pass target</li>
                  <li>85%+ = Strong, well-prepared</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Analysis Actions</p>
                <ul className="space-y-0.5">
                  <li>Track by topic, not just overall</li>
                  <li>Identify recurring weaknesses</li>
                  <li>Create specific action plans</li>
                  <li>Retest after targeted revision</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Stress Management
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section4-2">
              Next: Weak Areas Identification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section4_1;
