import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Flame, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "maslow-baseline",
    question: "According to Maslow's Hierarchy of Needs applied to tradespeople, which needs must be met FIRST before higher-level motivation can work?",
    options: [
      "Recognition and achievement — people need to feel valued above all else",
      "Social belonging — being part of a crew is the most important thing",
      "Physiological and safety needs — decent welfare, fair pay, safe working conditions",
      "Self-actualisation — people need a sense of purpose in their work"
    ],
    correctIndex: 2,
    explanation: "Maslow's hierarchy states that lower-level needs must be met before higher-level needs can motivate. For tradespeople, this means decent welfare facilities, fair pay, and safe working conditions (Levels 1-2) are the BASELINE. Trying to motivate with recognition or purpose when someone is worried about paying their mortgage or working in unsafe conditions will not work. Fix the basics first."
  },
  {
    id: "herzberg-factors",
    question: "According to Herzberg's Two-Factor Theory, fair pay and decent working conditions are:",
    options: [
      "Motivators — they create genuine job satisfaction and drive performance",
      "Hygiene factors — they prevent dissatisfaction but do not create motivation",
      "Self-actualisation needs — they help people reach their full potential",
      "Theory Y assumptions — they reflect a belief that workers are self-motivated"
    ],
    correctIndex: 1,
    explanation: "Herzberg distinguishes between hygiene factors (which prevent dissatisfaction) and motivators (which create genuine satisfaction). Pay, conditions, job security, and supervision quality are hygiene factors — fixing them brings people to 'not unhappy' but does not actively motivate. True motivation comes from achievement, recognition, meaningful work, responsibility, and growth opportunities."
  },
  {
    id: "pink-drive",
    question: "Dan Pink's research in 'Drive' found that for complex, non-routine tasks, traditional carrots and sticks (rewards and punishments):",
    options: [
      "Are the most effective motivators available to managers",
      "Work well for short periods but lose effectiveness over time",
      "Can actually DAMAGE performance and reduce creativity",
      "Have no measurable effect on worker output or quality"
    ],
    correctIndex: 2,
    explanation: "Pink's research shows that for anything beyond simple, mechanical tasks, traditional carrots and sticks can actually DAMAGE performance. External rewards narrow focus, reduce creativity, diminish intrinsic motivation, and encourage shortcuts. Instead, complex work (which describes most electrical work) is best motivated by autonomy, mastery, and purpose — the three intrinsic motivators."
  }
];

const faqs = [
  {
    question: "My team just wants more money. Doesn't that disprove these motivation theories?",
    answer: "Not at all — it actually confirms them. If your team is focused on money, it likely means their hygiene factors (Herzberg) or basic needs (Maslow) are not being met. When pay is perceived as unfair or insufficient, it becomes the dominant concern and blocks everything else. Once pay is fair and competitive (it does not need to be the highest), it fades as a daily motivator and the higher-level factors (recognition, meaningful work, autonomy) become more important. The key word in Herzberg's theory is 'fair' — pay does not need to be exceptional to stop being a problem, but if people feel underpaid relative to their contribution, nothing else will work."
  },
  {
    question: "Is Theory X ever appropriate? Sometimes I need to be directive.",
    answer: "Being directive and being Theory X are not the same thing. You can give clear, firm direction (which is sometimes essential — safety emergencies, tight deadlines, regulatory compliance) while still fundamentally believing that your team members are capable, motivated professionals. Theory X is about your underlying BELIEF about human nature — do you believe people are inherently lazy and need controlling, or do you believe they want to do good work? A Theory Y leader can still be decisive and directive when the situation requires it. The difference is that they default to trust and autonomy, and use directive leadership as a tool for specific situations, not as their entire approach."
  },
  {
    question: "How do I motivate someone who genuinely doesn't care about the work?",
    answer: "First, try to understand WHY they do not care. Have they been treated poorly by previous supervisors? Are they dealing with personal problems? Do they feel their skills are not valued? Are they in the wrong role? Often what looks like apathy has a cause. Have an honest, private conversation. If there is a genuine issue you can help with, address it. If they have been doing the same repetitive work for years, can you give them something more challenging? If they feel invisible, can you recognise their contribution? Sometimes the answer is that the person is genuinely in the wrong job, and the kindest thing is an honest conversation about their future. You cannot force intrinsic motivation, but you can create conditions where it is likely to develop."
  },
  {
    question: "These theories seem academic. Do they actually work on a building site?",
    answer: "Every one of these theories has been validated extensively in real-world settings, including construction. Think about the best supervisor you ever worked for — the one whose team would do anything for them. Chances are they intuitively applied these principles: they treated people with respect (Theory Y), they ensured basic conditions were decent (Herzberg hygiene), they gave experienced people autonomy (Pink), they recognised good work (Maslow esteem), and they connected the work to something meaningful (Pink purpose). The theories are not telling you anything revolutionary — they are explaining WHY the things good leaders naturally do actually work. Having the framework helps you do it deliberately rather than accidentally."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Maslow's Hierarchy of Needs has five levels. The correct order from bottom to top is:",
    options: [
      "Safety, Physiological, Belonging, Esteem, Self-Actualisation",
      "Physiological, Safety, Belonging, Esteem, Self-Actualisation",
      "Physiological, Belonging, Safety, Self-Actualisation, Esteem",
      "Esteem, Safety, Physiological, Belonging, Self-Actualisation"
    ],
    correctAnswer: 1,
    explanation: "The correct order from bottom to top is: Physiological (food, water, shelter), Safety (physical safety, job security), Love/Belonging (social connection, team identity), Esteem (recognition, achievement), Self-Actualisation (reaching full potential). Lower levels must generally be satisfied before higher levels can motivate."
  },
  {
    id: 2,
    question: "According to Herzberg, which of the following is a MOTIVATOR (creates genuine satisfaction), not a hygiene factor?",
    options: [
      "Fair pay and regular overtime opportunities",
      "Clean, well-maintained welfare facilities on site",
      "Achievement and recognition for quality workmanship",
      "Job security and a permanent contract"
    ],
    correctAnswer: 2,
    explanation: "Achievement and recognition are motivators in Herzberg's model — they create genuine job satisfaction and drive performance. Pay, welfare facilities, and job security are hygiene factors — important for preventing dissatisfaction, but they do not create active motivation. The distinction is critical for leaders."
  },
  {
    id: 3,
    question: "McGregor's Theory X assumes that workers are:",
    options: [
      "Self-motivated professionals who seek responsibility and take pride in their work",
      "Inherently lazy, need controlling, and are primarily motivated by fear of consequences",
      "Most productive when given autonomy, mastery opportunities, and a sense of purpose",
      "Best motivated through a combination of financial incentives and social recognition"
    ],
    correctAnswer: 1,
    explanation: "Theory X assumes workers are inherently lazy, avoid responsibility, dislike work, and must be coerced or controlled to produce results. McGregor argued this becomes a self-fulfilling prophecy — if you treat people as lazy and untrustworthy, they will behave that way. Theory Y assumes the opposite and generally produces better outcomes."
  },
  {
    id: 4,
    question: "Dan Pink identifies three intrinsic motivators in his book 'Drive'. They are:",
    options: [
      "Money, Status, and Power",
      "Autonomy, Mastery, and Purpose",
      "Safety, Belonging, and Esteem",
      "Achievement, Recognition, and Responsibility"
    ],
    correctAnswer: 1,
    explanation: "Pink's three intrinsic motivators are Autonomy (control over your own work), Mastery (the desire to get better at something that matters), and Purpose (connection to something larger than yourself). These are particularly relevant to skilled trades like electrical work, where craftspeople value being trusted, becoming more expert, and doing work that matters."
  },
  {
    id: 5,
    question: "A supervisor notices that site welfare facilities are poor — dirty toilets, no hot water, and an inadequate drying room. According to Maslow and Herzberg, fixing this will:",
    options: [
      "Dramatically increase team motivation and productivity",
      "Have no effect because welfare is not related to motivation",
      "Prevent dissatisfaction and meet basic needs, but will not actively motivate",
      "Only matter to Theory X workers who focus on conditions rather than the work"
    ],
    correctAnswer: 2,
    explanation: "Decent welfare meets basic physiological/safety needs (Maslow Levels 1-2) and addresses hygiene factors (Herzberg). Fixing poor welfare will prevent dissatisfaction and remove a significant source of resentment, but it will not, on its own, create active motivation. That requires the motivators: achievement, recognition, meaningful work, and growth. However, you MUST fix the basics before the motivators can work."
  },
  {
    id: 6,
    question: "McGregor argued that Theory X management creates:",
    options: [
      "High-performing teams through clear accountability",
      "A self-fulfilling prophecy where workers behave exactly as expected",
      "Better safety outcomes through tighter supervision",
      "Short-term results that are sustainable over the long term"
    ],
    correctAnswer: 1,
    explanation: "McGregor's key insight is that Theory X becomes a self-fulfilling prophecy. If you treat workers as lazy and untrustworthy (constant surveillance, no autonomy, punishment-focused), they respond by doing the minimum, hiding problems, and disengaging. The manager then sees this as confirmation that workers are indeed lazy — not realising their management approach caused the very behaviour they expected."
  },
  {
    id: 7,
    question: "For an electrician, 'Mastery' (Dan Pink) would most closely relate to:",
    options: [
      "Getting a pay rise after completing a qualification",
      "Being given the day off as a reward for good work",
      "Deepening expertise in complex areas like the 18th Edition, inspection, or fire alarm systems",
      "Being promoted to a supervisory role as quickly as possible"
    ],
    correctAnswer: 2,
    explanation: "Mastery is the intrinsic desire to get better at something that matters. For an electrician, this means deepening expertise in complex technical areas — understanding the 18th Edition at a deeper level, mastering inspection and testing, specialising in fire alarm systems, or developing diagnostic skills. The satisfaction comes from the learning itself, not from external rewards."
  },
  {
    id: 8,
    question: "Which motivation approach would work BEST for an experienced electrician who has become disengaged and is doing the bare minimum?",
    options: [
      "Threaten disciplinary action if performance does not improve (Theory X)",
      "Increase their pay and improve their working conditions (Hygiene factors)",
      "Give them more detailed instructions and closer supervision (Direct)",
      "Give them ownership of a meaningful project and autonomy over how they deliver it (Autonomy + Purpose)"
    ],
    correctAnswer: 3,
    explanation: "An experienced but disengaged electrician likely has their hygiene factors met and does not lack skill. They lack motivation. Threats (Theory X) will make it worse. More instruction is insulting to their experience. The most effective approach combines autonomy (trust them with how) and purpose (give them something meaningful). This could be ownership of a section, mentoring apprentices, or leading on a technically challenging aspect of the project."
  }
];

export default function LeadershipModule2Section3() {
  useSEO({
    title: "Motivating Your Team | Leadership Module 2.3",
    description: "Maslow's Hierarchy of Needs, Herzberg's Two-Factor Theory, McGregor's Theory X and Y, and Dan Pink's Drive applied to motivating electricians on construction sites.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Motivating Your Team
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Four evidence-based motivation theories and how to apply them to leading electricians and tradespeople on construction sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Maslow:</strong> Meet basic needs first &mdash; fair pay, safety, welfare</li>
              <li><strong>Herzberg:</strong> Hygiene prevents complaints; motivators drive engagement</li>
              <li><strong>McGregor:</strong> Theory X (control) vs Theory Y (trust) &mdash; Y wins</li>
              <li><strong>Pink:</strong> Autonomy + Mastery + Purpose = intrinsic motivation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Fix basics first:</strong> Welfare, pay, safety are non-negotiable baseline</li>
              <li><strong>Then motivate:</strong> Recognition, ownership, growth, meaningful work</li>
              <li><strong>Trust your team:</strong> Theory Y approach outperforms Theory X every time</li>
              <li><strong>Electricians fit perfectly:</strong> Complex trade = autonomy, mastery, purpose</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why understanding motivation is a core leadership skill on site",
              "Apply Maslow's Hierarchy of Needs to the working lives of tradespeople",
              "Distinguish between Herzberg's hygiene factors and true motivators",
              "Compare Theory X and Theory Y management and their effects on teams",
              "Describe Dan Pink's three intrinsic motivators and apply them to electricians",
              "Develop practical motivation strategies combining insights from all four theories"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Motivation Matters on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Motivation Matters on Site
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Motivated teams work faster, safer, and produce higher quality work. Demotivated teams
                deliver the opposite: <strong>high turnover</strong> (people leave), <strong>poor
                quality</strong> (people stop caring about standards), <strong>safety incidents</strong>
                (people take shortcuts or stop paying attention), and <strong>low morale</strong> (which
                spreads like a virus through a workforce).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Business Case for Motivation</p>
                <p className="text-base text-white leading-relaxed">
                  Understanding what drives people is not a &ldquo;nice to have&rdquo; &mdash; it is a
                  <strong> core leadership skill</strong> with direct commercial impact. Research by Gallup
                  consistently shows that engaged teams are 21% more productive and experience 59% less
                  turnover. In construction, where skilled labour is scarce and training is expensive, keeping
                  your best people motivated and retained is a competitive advantage.
                </p>
              </div>

              <p>
                Most new supervisors inherit a mix of people: some highly motivated, some coasting, some
                actively disengaged. Your approach to each person needs to be different because the
                <strong> reasons</strong> behind their motivation (or lack of it) are different. The four
                theories in this section give you a framework for understanding why people behave the way
                they do and what you can do about it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Signs of a Motivated vs Demotivated Team</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Motivated Team</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>People arrive early and stay until the job is done</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Problems are raised early and solved collaboratively</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Quality is consistently high without constant checking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>People help each other without being asked</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Demotivated Team</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Clock-watching, arriving late, leaving at the earliest opportunity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Problems are hidden or ignored until they become crises</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Snagging lists are long and recurring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>High absence rates and constant complaints</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Maslow's Hierarchy of Needs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Maslow&rsquo;s Hierarchy of Needs
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Abraham Maslow&rsquo;s Hierarchy of Needs (1943) is one of the most recognised motivation
                theories in the world. It proposes that human needs are arranged in a <strong>five-level
                pyramid</strong>, and that lower-level needs must generally be satisfied before higher-level
                needs can become motivating.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Maslow&rsquo;s Five Levels &mdash; Applied to Tradespeople</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">Level 5: Self-Actualisation</p>
                    <p className="text-white/80 text-xs">Reaching full potential, becoming the best version of yourself.</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Mastering the trade at the highest level, mentoring the next generation, being recognised as a true expert, contributing to industry standards.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">Level 4: Esteem</p>
                    <p className="text-white/80 text-xs">Recognition, respect, achievement, confidence.</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Recognition for quality workmanship, gaining qualifications (18th Edition, inspection), being trusted with complex work, earning the respect of peers.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">Level 3: Love / Belonging</p>
                    <p className="text-white/80 text-xs">Social connection, friendship, being part of a group.</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Being part of a crew, team identity and camaraderie, feeling included and valued by colleagues, social bonds formed on site.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">Level 2: Safety</p>
                    <p className="text-white/80 text-xs">Physical safety, job security, financial security.</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Safe working conditions, adequate PPE, proper risk assessments, job security, knowing you will be paid on time.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">Level 1: Physiological</p>
                    <p className="text-white/80 text-xs">Basic survival needs — food, water, shelter, warmth.</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Decent welfare facilities (clean toilets, hot water, drying room, canteen), fair pay that covers living costs, reasonable working hours.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Insight</p>
                </div>
                <p className="text-sm text-white/80">
                  Do not try to motivate with recognition (Level 4) if someone is worried about paying their
                  mortgage (Level 1-2). Do not try to create team spirit (Level 3) if people feel unsafe on
                  site (Level 2). <strong className="text-white">Fix the lower levels first</strong> &mdash;
                  they are the foundation. Levels 1 and 2 are the non-negotiable baseline for any construction
                  site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Practical Audit: Are Your Basics Met?</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Welfare facilities</strong> &mdash; are toilets clean? Is there hot water? Is the drying room adequate? Is there a proper canteen or at least a clean space to eat?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Pay and conditions</strong> &mdash; are people paid fairly for their skill level? Are rates competitive? Is overtime paid correctly and on time?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Safety</strong> &mdash; are risk assessments genuine or tick-box? Is PPE provided and adequate? Do people feel safe raising concerns?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Job security</strong> &mdash; do people know if they have work next month? Is there clarity about the project timeline and their role in it?</span>
                  </li>
                </ul>
                <p className="text-xs text-white/80 mt-3">If any of these are poor, fix them before attempting higher-level motivation strategies. You are building on sand otherwise.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Herzberg's Two-Factor Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Herzberg&rsquo;s Two-Factor Theory
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Frederick Herzberg&rsquo;s Two-Factor Theory (1959) makes a powerful distinction between
                two types of workplace factors. <strong>Hygiene factors</strong> prevent dissatisfaction
                but do not create motivation. <strong>Motivators</strong> create genuine satisfaction and
                drive engagement. Understanding this distinction changes how you lead.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-amber-400 font-semibold text-sm mb-2">Hygiene Factors (Prevent Dissatisfaction)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Pay</strong> &mdash; fair, competitive rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Working conditions</strong> &mdash; decent welfare, safe site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Job security</strong> &mdash; knowing the work is ongoing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Supervision quality</strong> &mdash; competent, fair management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span><strong>Company policies</strong> &mdash; reasonable rules and procedures</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">Motivators (Create Genuine Motivation)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Achievement</strong> &mdash; completing quality work, solving problems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Recognition</strong> &mdash; being acknowledged for good work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Meaningful work</strong> &mdash; tasks that matter and challenge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Responsibility</strong> &mdash; ownership and accountability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Growth</strong> &mdash; learning, qualifications, development</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-2">The Critical Distinction</p>
                <p className="text-sm text-white/80">
                  Fixing hygiene factors brings people from &ldquo;unhappy&rdquo; to &ldquo;not unhappy&rdquo;
                  &mdash; but does <strong className="text-white">not</strong> make them actively motivated.
                  Fair pay and decent welfare stops people leaving, but it does not make them give their best.
                  To genuinely motivate, you need the motivators: give people ownership of a section,
                  recognise quality workmanship publicly, support 18th Edition updates, and create
                  opportunities for growth.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Applied to Electricians on Site</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">Hygiene (Fix These First)</p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>Fair day rate that reflects qualifications</li>
                      <li>Clean welfare, hot water, proper drying room</li>
                      <li>Correct PPE provided, not bought by the worker</li>
                      <li>Overtime paid correctly and on time</li>
                      <li>Clear programme so people know the plan</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-xs mb-1">Motivators (Drive Engagement)</p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>Ownership of a section or floor</li>
                      <li>Public recognition for quality work</li>
                      <li>Support for 18th Edition and C&amp;G updates</li>
                      <li>Involvement in problem-solving decisions</li>
                      <li>Mentoring apprentices (developing others)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: McGregor's Theory X and Theory Y */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            McGregor&rsquo;s Theory X and Theory Y
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Douglas McGregor (1960) proposed that managers hold one of two fundamental beliefs about
                human nature, and these beliefs shape their entire management approach &mdash; often without
                them realising it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Theory X</p>
                    <p className="text-white/80 text-xs mb-2">&ldquo;Workers are inherently lazy and must be controlled.&rdquo;</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>People dislike work and will avoid it if they can</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>People must be coerced, controlled, or threatened</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>People prefer to be directed, avoid responsibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Motivation is primarily through fear and punishment</span>
                      </li>
                    </ul>
                    <p className="text-white text-xs mt-2"><strong>On site:</strong> Tight supervision, clock-watching, constant checking, punitive approach, no trust.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Theory Y</p>
                    <p className="text-white/80 text-xs mb-2">&ldquo;Workers are self-motivated and seek responsibility.&rdquo;</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Work is as natural as play &mdash; people want to contribute</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>People will self-direct towards objectives they are committed to</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>People seek responsibility and want to grow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Creativity and problem-solving are widely distributed</span>
                      </li>
                    </ul>
                    <p className="text-white text-xs mt-2"><strong>On site:</strong> Trust, autonomy, development, coaching, recognition, shared goals.</p>
                  </div>
                </div>
              </div>

              <p>
                Most traditional construction site management leans heavily towards Theory X &mdash; tight
                supervision, clock-watching, signing in and out, constant checking. McGregor&rsquo;s
                crucial insight is that this approach creates a <strong>self-fulfilling prophecy</strong>.
                If you treat people as lazy and untrustworthy, they respond by doing the minimum, hiding
                problems, and disengaging &mdash; which the manager then sees as proof that workers are
                indeed lazy.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Self-Fulfilling Prophecy</p>
                </div>
                <p className="text-sm text-white/80">
                  Theory Y leaders who trust and develop their teams consistently get more from them.
                  When people are treated as capable professionals who want to do good work, they tend to
                  <strong className="text-white"> rise to that expectation</strong>. This does not mean being
                  naive or ignoring poor performance. It means starting from a position of trust and only
                  increasing control when specific evidence warrants it, rather than starting from a position
                  of suspicion.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Theory X vs Theory Y in Practice</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-xs mb-1">Theory X Site</p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>Everyone signs in and out with exact times recorded</li>
                      <li>Supervisor checks work every hour and criticises publicly</li>
                      <li>No input sought from workers on methods or programme</li>
                      <li>Mistakes are met with threats rather than coaching</li>
                      <li>Overtime is used as reward; taking it away is punishment</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-xs mb-1">Theory Y Site</p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>People are trusted to manage their own time and output</li>
                      <li>Quality is checked collaboratively; problems are coaching opportunities</li>
                      <li>Workers are involved in planning and problem-solving</li>
                      <li>Mistakes are explored to find root causes and prevent recurrence</li>
                      <li>Development opportunities are offered proactively</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Dan Pink's Drive: Autonomy, Mastery, Purpose */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Dan Pink&rsquo;s Drive: Autonomy, Mastery, Purpose
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daniel Pink&rsquo;s research, published in <em>Drive</em> (2009), synthesised decades
                of behavioural science to reach a surprising conclusion: for anything beyond simple,
                mechanical tasks, <strong>traditional carrots and sticks do not work</strong> &mdash;
                they can actually <strong>damage</strong> performance. External rewards narrow focus,
                reduce creativity, diminish intrinsic motivation, and encourage shortcuts.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Intrinsic Motivators</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">Autonomy &mdash; Control Over Your Work</p>
                    <p className="text-white/80 text-xs">The desire to direct your own life and work. People are most engaged when they have control over their task (what they do), their time (when they do it), their technique (how they do it), and their team (who they do it with).</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Being trusted to plan their own work sequence, choose their methods, and manage their time. Electricians value autonomy highly &mdash; being told exactly how to wire something they have done a thousand times is deeply demotivating.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">Mastery &mdash; Getting Better at Something That Matters</p>
                    <p className="text-white/80 text-xs">The urge to improve at something that is important to you. Mastery is a mindset (believing you can improve), it requires effort (deliberate practice), and it is an asymptote (you can approach it but never fully reach it).</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> The electrical trade has deep complexity &mdash; the 18th Edition, inspection and testing, fire alarm systems, emergency lighting, solar PV, EV charging. There is always more to learn and master. Supporting CPD, qualifications, and specialist training feeds mastery.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">Purpose &mdash; Connection to Something Larger</p>
                    <p className="text-white/80 text-xs">The yearning to do what we do in the service of something larger than ourselves. When people understand WHY their work matters, they bring more energy and commitment to it.</p>
                    <p className="text-white text-xs mt-1"><strong>For electricians:</strong> Electrical work directly affects safety &mdash; a properly installed circuit protects lives. A completed hospital, school, or home serves the community. Connecting daily work to this larger purpose is powerful.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why This Theory Fits Electricians Perfectly</p>
                <p className="text-sm text-white/80">
                  Electrical work is complex, non-routine, and skilled &mdash; exactly the type of work where
                  Pink&rsquo;s research shows intrinsic motivation outperforms carrots and sticks. Electricians
                  who are given <strong className="text-white">autonomy</strong> (trusted to manage their own
                  work), supported in <strong className="text-white">mastery</strong> (continuous learning and
                  development), and connected to <strong className="text-white">purpose</strong> (understanding
                  the impact of their work) will consistently outperform those who are simply offered bonuses
                  or threatened with consequences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has covered four major motivation theories and their practical application to
                leading electricians and tradespeople on site. Each theory offers a different lens on the
                same fundamental question: what makes people want to do their best work?
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Theory Comparison</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Maslow:</strong> Meet basic needs (pay, safety, welfare) before trying to motivate with higher-level factors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Herzberg:</strong> Hygiene factors prevent complaints; motivators (achievement, recognition, growth) drive real engagement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>McGregor:</strong> Trust your team (Theory Y) &mdash; it outperforms controlling them (Theory X) and avoids the self-fulfilling prophecy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Pink:</strong> For complex skilled work, Autonomy + Mastery + Purpose beats carrots and sticks every time</span>
                  </div>
                </div>
              </div>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Practical action 1:</strong> Audit the basics &mdash; are welfare, pay, and safety up to standard? Fix these first.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Practical action 2:</strong> Recognise good work publicly and specifically &mdash; not vague praise but specific acknowledgement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Practical action 3:</strong> Give experienced people autonomy and ownership &mdash; trust them with the how</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Practical action 4:</strong> Support development &mdash; qualifications, courses, new experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Practical action 5:</strong> Connect the daily work to its purpose &mdash; who benefits from what we are building?</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 4, we will examine
                  <strong> Giving Feedback That Sticks</strong> &mdash; the SBI feedback model, the GROW
                  coaching model, why the feedback sandwich does not work, and Marshall Goldsmith&rsquo;s
                  feedforward approach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-2-section-4">
              Next: Giving Feedback
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
