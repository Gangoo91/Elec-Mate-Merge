import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying Knowledge Gaps - MOET Module 7 Section 1.4";
const DESCRIPTION = "Self-assessment techniques for identifying knowledge gaps, tracking scores by topic, focused revision strategies and creating effective study plans for EPA preparation.";

const quickCheckQuestions = [
  {
    id: "self-assessment",
    question: "What is the most reliable method for identifying knowledge gaps before the EPA?",
    options: [
      "Asking a friend what they think you need to study",
      "Analysing your scores by topic across multiple practice tests to find consistent weak areas",
      "Reading every module once more from start to finish",
      "Guessing which topics are most likely to appear"
    ],
    correctIndex: 1,
    explanation: "Systematic analysis of practice test results by topic area is the most reliable gap identification method. It uses objective data from your own performance to pinpoint exactly where your knowledge is weakest, allowing targeted and efficient revision."
  },
  {
    id: "study-plan",
    question: "A good study plan should prioritise:",
    options: [
      "Topics you already know well, to boost confidence",
      "Only the most recent module you studied",
      "Weak areas identified through practice test analysis, while maintaining revision of strong areas",
      "Whatever is easiest to study"
    ],
    correctIndex: 2,
    explanation: "An effective study plan allocates the most time to your weakest areas while still including periodic review of strong areas to maintain knowledge. This targeted approach gives you the greatest improvement for the time invested."
  },
  {
    id: "knowledge-rating",
    question: "When self-assessing your knowledge using a confidence rating system, what does a rating of 'amber' typically indicate?",
    options: [
      "You have no knowledge of the topic at all",
      "You have some understanding but are not confident you could answer exam questions reliably",
      "You are completely confident in the topic",
      "The topic is not relevant to the EPA"
    ],
    correctIndex: 1,
    explanation: "An amber rating in a traffic-light self-assessment indicates partial knowledge — you understand some aspects but have gaps or uncertainty that could lead to wrong answers under exam conditions. Amber topics need focused revision to move them to green."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The first step in identifying knowledge gaps is to:",
    options: [
      "Start studying the hardest topic immediately",
      "Complete a diagnostic assessment covering all module areas to establish a baseline",
      "Ask your employer which topics to study",
      "Read the EPA specification without testing yourself"
    ],
    correctAnswer: 1,
    explanation: "A diagnostic assessment across all topics provides an objective baseline of your current knowledge. This data-driven approach ensures you identify all gaps, not just the ones you are aware of. Without a baseline, you are guessing at your weaknesses."
  },
  {
    id: 2,
    question: "A traffic-light self-assessment system uses which categories?",
    options: [
      "Easy, medium, hard",
      "Green (confident), amber (partial), red (significant gap)",
      "Pass, merit, distinction",
      "Level 1, Level 2, Level 3"
    ],
    correctAnswer: 1,
    explanation: "The traffic-light system provides a quick visual assessment: green means confident and consistent, amber means partial understanding with some gaps, and red means significant gap requiring substantial study. It helps prioritise revision time efficiently."
  },
  {
    id: 3,
    question: "When tracking scores by topic, you should record data from:",
    options: [
      "Only your best test result",
      "Multiple tests over time to identify consistent patterns",
      "Only the most recent test",
      "Only tests where you scored above 70%"
    ],
    correctAnswer: 1,
    explanation: "Multiple data points show consistent patterns. A single bad score on a topic might be a one-off, but consistently low scores confirm a genuine gap. Tracking over time also shows whether your targeted revision is working."
  },
  {
    id: 4,
    question: "Which approach to revision is most effective for addressing identified knowledge gaps?",
    options: [
      "Re-reading the entire course from Module 1 to Module 6",
      "Focused study of the specific topics identified as weak, combined with practice questions on those topics",
      "Watching videos on unrelated topics to relax",
      "Only practising questions without studying the underlying material"
    ],
    correctAnswer: 1,
    explanation: "Focused study on identified weak topics, followed by practice questions to test your improved understanding, is the most efficient approach. Re-reading everything wastes time on topics you already know, and practice without study does not fill the knowledge gap."
  },
  {
    id: 5,
    question: "A knowledge gap in 'safe isolation procedures' would indicate you need to revise content from which MOET module?",
    options: [
      "Module 2 — Electrical Science",
      "Module 1 — Health and Safety",
      "Module 5 — Maintenance Strategies",
      "Module 6 — Technical Documentation"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation procedures are covered in Module 1 (Health and Safety), specifically in the sections on safe working practices, GS38 compliance, and the Electricity at Work Regulations. Cross-referencing gaps to specific module sections ensures efficient targeted revision."
  },
  {
    id: 6,
    question: "What is the recommended balance of revision time between weak and strong topic areas?",
    options: [
      "100% on weak areas, ignore strong areas completely",
      "Approximately 70% on weak areas, 30% on maintaining strong areas",
      "Equal time on all areas regardless of performance",
      "100% on strong areas to maximise confidence"
    ],
    correctAnswer: 1,
    explanation: "Allocating roughly 70% of revision time to weak areas maximises improvement while the remaining 30% ensures strong areas do not deteriorate through neglect. This balance gives the best return on your study investment."
  },
  {
    id: 7,
    question: "A study plan should include which of the following elements?",
    options: [
      "Only the list of topics to study",
      "Topics, time allocation, resources, practice test dates, and progress review points",
      "Only the EPA date",
      "A list of questions you expect to appear in the exam"
    ],
    correctAnswer: 1,
    explanation: "An effective study plan includes what to study (topics), when to study (schedule with time allocations), how to study (resources and methods), when to test (practice test schedule), and when to review progress (checkpoints to adjust the plan)."
  },
  {
    id: 8,
    question: "If your practice test analysis shows you consistently score well on health and safety but poorly on electrical science, you should:",
    options: [
      "Stop studying health and safety entirely",
      "Increase the proportion of study time allocated to electrical science while maintaining periodic H&S review",
      "Only study electrical science for the rest of your preparation",
      "Focus more on health and safety since you are already doing well"
    ],
    correctAnswer: 1,
    explanation: "Increase focus on electrical science to address the gap, but maintain periodic health and safety review to keep that knowledge fresh. Completely abandoning a strong area risks it becoming a weak area by exam day."
  },
  {
    id: 9,
    question: "The MOET course modules can be used for targeted review by:",
    options: [
      "Re-reading every page of every module",
      "Identifying the specific sections that correspond to your weak topics and studying those sections in depth",
      "Only reading the module summaries",
      "Skipping the modules and using external resources only"
    ],
    correctAnswer: 1,
    explanation: "The MOET modules are structured by topic area, making them ideal for targeted revision. When your practice test analysis identifies a weak topic, go directly to the relevant module section and study it thoroughly, then test yourself on that topic."
  },
  {
    id: 10,
    question: "How often should you reassess your knowledge gaps during EPA preparation?",
    options: [
      "Once at the beginning and never again",
      "After every practice test, with a formal review every 2-3 weeks",
      "Only on the day before the EPA",
      "Reassessment is not necessary if you follow a study plan"
    ],
    correctAnswer: 1,
    explanation: "Regular reassessment ensures your study plan remains targeted and effective. After each practice test, note any changes in performance by topic. Every 2-3 weeks, formally review your progress and adjust your study plan to reflect current strengths and weaknesses."
  }
];

const faqs = [
  {
    question: "What if I have gaps in almost every topic?",
    answer: "This is common early in your preparation and should not be discouraging. Start with a diagnostic test to identify the most critical gaps, then prioritise the topics with the highest EPA weighting (typically health and safety, and installations/maintenance). Work through one topic at a time, study the content, practise questions, and move to the next. Consistent daily study will close gaps faster than you expect."
  },
  {
    question: "How do I create a study plan when I have limited time?",
    answer: "With limited time, ruthless prioritisation is essential. Focus on the topics with the highest EPA weighting where you score lowest — these give the biggest score improvement for the time invested. Use the 70/30 split: 70% on weak high-weighting topics, 30% on everything else. Even 30 minutes of focused daily study is more effective than occasional long sessions."
  },
  {
    question: "Should I study alone or with other apprentices?",
    answer: "Both approaches have value. Individual study allows you to focus on your specific gaps. Group study helps with motivation, allows you to learn from peers' explanations, and practising teaching topics to others deepens your own understanding. A combination — individual study for gap-filling, group sessions for discussion and mutual testing — is ideal."
  },
  {
    question: "What resources should I use besides the MOET modules?",
    answer: "The MOET modules should be your primary resource as they are aligned with ST1426. Supplement with: BS 7671 (the actual standard — get comfortable navigating it), IET Guidance Notes, HSE publications (HSG85, GS38), manufacturer technical data, and your own workplace experience. Always cross-reference supplementary resources back to the MOET content to ensure alignment."
  },
  {
    question: "How do I know when a knowledge gap has been closed?",
    answer: "A gap is considered closed when you can: (1) consistently answer practice questions on that topic correctly, (2) explain the concepts in your own words, (3) apply the knowledge to scenario-based questions, and (4) answer questions on the topic under timed conditions. One correct answer is not enough — you need consistent correct performance across multiple questions and practice sessions."
  }
];

const MOETModule7Section1_4 = () => {
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
            <span>Module 7.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Identifying Knowledge Gaps
          </h1>
          <p className="text-white/80">
            Systematic self-assessment and targeted revision planning for efficient EPA preparation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Diagnose:</strong> Use practice tests to identify weak topics</li>
              <li className="pl-1"><strong>Rate:</strong> Traffic-light system — green, amber, red</li>
              <li className="pl-1"><strong>Plan:</strong> 70% weak areas, 30% maintaining strong areas</li>
              <li className="pl-1"><strong>Review:</strong> Reassess every 2-3 weeks and adjust</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>High weighting:</strong> H&S and installations — prioritise gaps here</li>
              <li className="pl-1"><strong>Cross-reference:</strong> Map gaps to specific MOET module sections</li>
              <li className="pl-1"><strong>Workplace:</strong> Use job experience to reinforce study</li>
              <li className="pl-1"><strong>ST1426:</strong> Gaps map directly to KSB requirements</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply self-assessment techniques to identify your specific knowledge gaps",
              "Use practice test data to track scores by topic area over time",
              "Create a traffic-light confidence rating for each module area",
              "Develop focused revision plans that prioritise weak areas efficiently",
              "Map knowledge gaps to specific MOET module sections for targeted study",
              "Establish regular reassessment checkpoints to measure progress"
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
            Self-Assessment Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective EPA preparation starts with honest self-assessment. You need to know where you stand before you
              can plan where to go. Self-assessment is not about judging yourself harshly — it is about gathering the
              data you need to study efficiently. Without it, you risk spending hours on topics you already know while
              neglecting areas that need attention.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Assessment Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Diagnostic test:</strong> Complete a practice test covering all modules without preparation — this reveals your true baseline</li>
                <li className="pl-1"><strong>Topic checklist review:</strong> Go through the ST1426 standard topic by topic and honestly rate your confidence</li>
                <li className="pl-1"><strong>Teaching test:</strong> Try to explain key concepts from each module to someone else — gaps become obvious</li>
                <li className="pl-1"><strong>Flashcard sort:</strong> Create flashcards for key concepts and sort them into "know well", "unsure", and "don't know"</li>
                <li className="pl-1"><strong>Workplace reflection:</strong> Consider which tasks at work you feel confident with and which you still find challenging</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Traffic-Light Confidence Rating</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400 font-medium">Green</td>
                      <td className="border border-white/10 px-3 py-2">Confident — consistently score 80%+ on this topic</td>
                      <td className="border border-white/10 px-3 py-2">Periodic review to maintain knowledge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400 font-medium">Amber</td>
                      <td className="border border-white/10 px-3 py-2">Partial — some understanding but inconsistent 50-80%</td>
                      <td className="border border-white/10 px-3 py-2">Focused study on specific sub-topics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">Red</td>
                      <td className="border border-white/10 px-3 py-2">Significant gap — scoring below 50%</td>
                      <td className="border border-white/10 px-3 py-2">In-depth study from module content + practice</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Honesty is essential. Overrating your knowledge wastes time and leads to
              surprises in the real exam. Underrating is less harmful but may cause unnecessary anxiety. Let the
              data from practice tests guide your ratings objectively.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Tracking Scores by Topic
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Raw test scores are useful but limited. A score of 65% tells you that you passed the practice test
              but nothing about which topics need attention. Breaking your score down by topic transforms a single
              number into an actionable revision map. This is the most powerful diagnostic tool in your preparation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Topic Tracking Template</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Topic Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test 1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test 2</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test 3</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health &amp; Safety</td>
                      <td className="border border-white/10 px-3 py-2">7/8</td>
                      <td className="border border-white/10 px-3 py-2">8/10</td>
                      <td className="border border-white/10 px-3 py-2">9/10</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Improving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical Science</td>
                      <td className="border border-white/10 px-3 py-2">4/7</td>
                      <td className="border border-white/10 px-3 py-2">3/6</td>
                      <td className="border border-white/10 px-3 py-2">5/8</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Fluctuating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor Control</td>
                      <td className="border border-white/10 px-3 py-2">2/6</td>
                      <td className="border border-white/10 px-3 py-2">2/5</td>
                      <td className="border border-white/10 px-3 py-2">3/6</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Needs attention</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Three or more data points per topic are needed to identify reliable patterns.
              One low score might be a bad day; consistent low scores indicate a genuine gap.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Creating Effective Study Plans
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A study plan turns diagnostic information into action. Without a plan, good intentions often lead to
              unfocused studying — reading a bit of everything without making meaningful progress on your weakest areas.
              A structured plan ensures every hour of study time counts.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Study Plan Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EPA date:</strong> Work backwards from your target EPA date to set deadlines</li>
                <li className="pl-1"><strong>Priority topics:</strong> List your red and amber topics in order of EPA weighting</li>
                <li className="pl-1"><strong>Weekly schedule:</strong> Allocate specific days/times for specific topics</li>
                <li className="pl-1"><strong>Resources:</strong> Identify which MOET module sections and supporting materials you will use</li>
                <li className="pl-1"><strong>Practice test schedule:</strong> Plan one mock test per week in the final month</li>
                <li className="pl-1"><strong>Review checkpoints:</strong> Schedule fortnightly reviews to assess progress and adjust</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sample 4-Week Study Plan Structure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Week 1:</strong> Focus on highest-priority red topic; diagnostic test at end of week</li>
                <li className="pl-1"><strong>Week 2:</strong> Focus on second red topic + review week 1 topic; practice questions on both</li>
                <li className="pl-1"><strong>Week 3:</strong> Address amber topics; full mock test; review and adjust plan</li>
                <li className="pl-1"><strong>Week 4:</strong> Mixed revision all topics; final mock test; light review of key facts</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> A study plan is a living document. Review it regularly and adjust based on
              your progress. If a topic moves from red to green faster than expected, reallocate that time to another
              weak area.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Using MOET Modules for Targeted Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The MOET course modules are structured to align with the ST1426 apprenticeship standard, making them
              the ideal resource for targeted gap-filling. When your practice test analysis identifies a weak area,
              you can go directly to the relevant module section and study the content in depth.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gap-to-Module Mapping</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Knowledge Gap</th>
                      <th className="border border-white/10 px-3 py-2 text-left">MOET Module</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Sections</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safe isolation, PTW, LOTO</td>
                      <td className="border border-white/10 px-3 py-2">Module 1</td>
                      <td className="border border-white/10 px-3 py-2">Sections 1.1-1.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ohm's law, power, AC theory</td>
                      <td className="border border-white/10 px-3 py-2">Module 2</td>
                      <td className="border border-white/10 px-3 py-2">Sections 2.1-2.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 7671, testing, fault finding</td>
                      <td className="border border-white/10 px-3 py-2">Module 3</td>
                      <td className="border border-white/10 px-3 py-2">Sections 3.1-3.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor starters, VSD, PLC</td>
                      <td className="border border-white/10 px-3 py-2">Module 4</td>
                      <td className="border border-white/10 px-3 py-2">Sections 4.1-4.7</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PPM, CBM, CMMS, KPIs</td>
                      <td className="border border-white/10 px-3 py-2">Module 5</td>
                      <td className="border border-white/10 px-3 py-2">Sections 5.1-5.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Drawings, schematics, data</td>
                      <td className="border border-white/10 px-3 py-2">Module 6</td>
                      <td className="border border-white/10 px-3 py-2">Sections 6.1-6.4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Targeted Review Process</h3>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Identify the gap:</strong> Use practice test data to pinpoint the specific topic</li>
                <li className="pl-1"><strong>Locate the content:</strong> Find the relevant MOET module section</li>
                <li className="pl-1"><strong>Study actively:</strong> Read, take notes, and connect to your workplace experience</li>
                <li className="pl-1"><strong>Test yourself:</strong> Use the section's InlineCheck questions and end-of-section quiz</li>
                <li className="pl-1"><strong>Practice questions:</strong> Attempt practice questions specifically on that topic</li>
                <li className="pl-1"><strong>Verify closure:</strong> If you consistently answer correctly, move on to the next gap</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The ability to identify your own development needs and take action to address
              them is itself a professional behaviour assessed in the EPA. Your study plan demonstrates initiative and
              commitment to continuous improvement.
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
          <Quiz title="Test Your Knowledge — Identifying Knowledge Gaps" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Feedback and Explanations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-5">
              Next: Exam Techniques and Strategies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section1_4;
