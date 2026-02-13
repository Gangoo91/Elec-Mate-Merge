import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Users, Lightbulb, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "styles-goleman-coaching",
    question: "In Daniel Goleman's framework, which leadership style is characterised by the phrase 'Try this' and focuses on long-term development of team members?",
    options: [
      "Authoritative/Visionary",
      "Affiliative",
      "Coaching",
      "Democratic"
    ],
    correctIndex: 2,
    explanation: "The Coaching style ('Try this') focuses on developing people for the future. The leader acts as a mentor, helping team members identify their strengths and weaknesses and linking their personal development to their work goals. On a construction site, this looks like a supervisor spending time teaching an apprentice a new skill, even when it would be quicker to do it themselves."
  },
  {
    id: "styles-situational",
    question: "According to Hersey and Blanchard's Situational Leadership model, which style should you use with a team member who has high competence and high commitment?",
    options: [
      "S1 — Telling (high direction, low support)",
      "S2 — Selling (high direction, high support)",
      "S3 — Participating (low direction, high support)",
      "S4 — Delegating (low direction, low support)"
    ],
    correctIndex: 3,
    explanation: "S4 Delegating is appropriate when the follower has both high competence and high commitment — they know what they are doing and are motivated to do it well. In this situation, the leader steps back and gives them autonomy, trusting them to deliver without close supervision. On site, this would be an experienced, trusted electrician who can be given a complex task and left to get on with it."
  },
  {
    id: "styles-adaptation",
    question: "A safety near-miss has just occurred on site and workers are shaken. Which leadership style is MOST appropriate in this immediate moment?",
    options: [
      "Democratic — ask the team what they think should happen next",
      "Laissez-faire — let the team process the incident in their own way",
      "Commanding/Coercive — take immediate control, give clear directives, ensure safety",
      "Coaching — use the incident as a learning opportunity for professional development"
    ],
    correctIndex: 2,
    explanation: "In a safety-critical situation immediately after a near-miss, the Commanding/Coercive style is most appropriate. The team needs clear, decisive leadership: stop work, secure the area, check everyone is safe, and give clear instructions. There is no time for discussion or delegation. Once the immediate situation is stabilised, you can then shift to other styles — democratic (investigating what happened), coaching (developing safer practices), or affiliative (supporting the team emotionally)."
  }
];

const faqs = [
  {
    question: "Is there one 'best' leadership style?",
    answer: "No. This is one of the most important findings from leadership research. There is no single best style that works in every situation. The most effective leaders are those who can adapt their style to match the demands of the situation, the needs of their team, and the nature of the task. On a construction site, you might use four or five different styles in a single day. The key skill is situational awareness — reading the room, understanding what the moment requires, and adjusting your approach accordingly."
  },
  {
    question: "What if my natural style does not match what my team needs?",
    answer: "This is very common, and recognising it is the first step. If your natural style is pacesetting (high standards, lead by example) but your team is made up of new apprentices who need coaching and support, you will need to consciously adapt. This does not mean abandoning your natural style entirely — it means expanding your range. Think of leadership styles like tools in a toolbox. Your natural style is the tool you reach for first, but sometimes the job requires a different tool. The good news is that every style can be learned with practice."
  },
  {
    question: "How do I know which style to use in a given situation?",
    answer: "Consider three factors: (1) The urgency — is this a crisis requiring immediate action (commanding) or a non-urgent decision that benefits from input (democratic)? (2) The people — what is their competence and confidence level? New starters need more direction; experienced professionals need more autonomy. (3) The outcome needed — do you need compliance (commanding), creativity (democratic), team cohesion (affiliative), or long-term development (coaching)? With practice, reading these signals becomes instinctive."
  },
  {
    question: "What happens if I default to one style all the time?",
    answer: "Defaulting to a single style is one of the most common leadership mistakes. If you always use the commanding style, your team will become dependent, resentful, and disengaged — they will stop thinking for themselves and just wait for instructions. If you always use the democratic style, decisions will take too long and the team will feel leaderless during crises. If you always use laissez-faire, standards will slip and less experienced team members will feel abandoned. The goal is range and flexibility — being able to shift styles depending on what the situation demands."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Daniel Goleman identified six leadership styles based on research into emotional intelligence. Which of the following is NOT one of Goleman's six styles?",
    options: [
      "Coaching",
      "Transformational",
      "Affiliative",
      "Pacesetting"
    ],
    correctAnswer: 1,
    explanation: "Goleman's six styles are: Coercive/Commanding, Authoritative/Visionary, Affiliative, Democratic, Pacesetting, and Coaching. 'Transformational' is a leadership style from a different framework (Burns/Bass) and is not one of Goleman's six. This is a common point of confusion in leadership studies."
  },
  {
    id: 2,
    question: "The Commanding/Coercive leadership style ('Do what I tell you') is most appropriate when:",
    options: [
      "You want to build long-term team relationships and loyalty",
      "A crisis or safety emergency requires immediate, decisive action",
      "The team is experienced and needs creative freedom to solve problems",
      "You are trying to develop an apprentice's skills over time"
    ],
    correctAnswer: 1,
    explanation: "The Commanding/Coercive style is most appropriate in genuine emergencies, safety-critical situations, or when dealing with serious underperformance that poses a risk. It provides clear, direct control. However, if used as the default style, it destroys morale, stifles initiative, and drives good people away. It should be reserved for situations where immediate compliance is essential."
  },
  {
    id: 3,
    question: "Goleman's research found that the Authoritative/Visionary style ('Come with me') has the most consistently positive impact on team climate. Why?",
    options: [
      "Because it removes all decision-making from the team, reducing their stress",
      "Because it gives the team a clear sense of purpose and direction while allowing freedom in how they achieve it",
      "Because it focuses exclusively on building personal relationships",
      "Because it sets extremely high performance standards that push the team to excel"
    ],
    correctAnswer: 1,
    explanation: "The Authoritative/Visionary style works because it provides clarity of direction ('this is where we are going and why') while giving people the freedom to determine how they get there. People know the destination but can choose their own route. This creates a sense of purpose, autonomy, and engagement. On site, this looks like a supervisor who explains the week's goals clearly, shows why the work matters, and then trusts the team to figure out the best way to deliver."
  },
  {
    id: 4,
    question: "In Hersey and Blanchard's Situational Leadership model, an apprentice in their first week on site (low competence, high enthusiasm) would typically need which style?",
    options: [
      "S1 — Telling: high direction, low support",
      "S2 — Selling: high direction, high support",
      "S3 — Participating: low direction, high support",
      "S4 — Delegating: low direction, low support"
    ],
    correctAnswer: 0,
    explanation: "A brand-new apprentice typically has low competence (they do not yet know the skills) but high commitment (they are keen and enthusiastic). The S1 Telling style provides the high direction they need — clear, step-by-step instructions on what to do and how to do it. As their competence grows, the leader should progressively move through S2, S3, and eventually S4, giving more autonomy as the apprentice becomes more capable."
  },
  {
    id: 5,
    question: "An experienced electrician who has been on your team for years is having a difficult personal week and their motivation is low, but their skills remain strong. According to Situational Leadership, which style is most appropriate?",
    options: [
      "S1 — Telling: give them step-by-step instructions",
      "S2 — Selling: explain and persuade them in detail",
      "S3 — Participating: provide support and encouragement, involve them in decisions",
      "S4 — Delegating: leave them alone to get on with it"
    ],
    correctAnswer: 2,
    explanation: "This scenario describes high competence but variable/low commitment — the person knows their job but is not in the right headspace. The S3 Participating style provides high support (encouragement, listening, involvement in decisions) with low direction (they do not need you to tell them HOW to do their job). The focus is on re-engaging their motivation, not on providing technical instruction."
  },
  {
    id: 6,
    question: "The Autocratic leadership style is most appropriate in which construction scenario?",
    options: [
      "Planning next month's programme with your experienced team leads",
      "A structural collapse alarm has sounded and the site needs immediate evacuation",
      "Deciding the team social event for the end of the project",
      "An experienced team working on a routine cable installation"
    ],
    correctAnswer: 1,
    explanation: "The Autocratic style — where the leader makes decisions unilaterally and issues commands without consultation — is most appropriate in emergencies where immediate, decisive action is needed and there is no time for discussion. A structural collapse alarm requires instant, clear direction: 'Everyone stop work. Drop tools. Proceed to assembly point now.' This is not the time for democratic discussion."
  },
  {
    id: 7,
    question: "A site supervisor uses only the Pacesetting style ('Do as I do, now') with their team. What is the MOST likely long-term consequence?",
    options: [
      "The team becomes highly motivated and self-directed",
      "Team members become overwhelmed, burned out, and disengaged because they can never meet the leader's relentless standards",
      "The team develops strong problem-solving skills through democratic input",
      "New team members develop rapidly because of the hands-on coaching"
    ],
    correctAnswer: 1,
    explanation: "The Pacesetting style sets extremely high standards and expects everyone to match the leader's pace and quality immediately. While this can be effective short-term with a highly competent, motivated team, long-term overuse leads to burnout, anxiety, and disengagement. Team members feel they can never be good enough, stop taking risks, and lose initiative. Goleman's research found that Pacesetting, when overused, has a negative impact on team climate."
  },
  {
    id: 8,
    question: "The key insight about leadership styles on a construction site is that:",
    options: [
      "The commanding style should always be used because construction is a high-risk environment",
      "The democratic style should always be used because it leads to the best team morale",
      "Flexibility is the most important skill — the best leaders adapt their style to match the situation",
      "Leaders should pick one style early in their career and stick with it consistently"
    ],
    correctAnswer: 2,
    explanation: "The single most important insight about leadership styles is that flexibility is the superpower. No single style works in every situation. The best construction leaders can read the situation — the urgency, the people, the task — and adapt their approach accordingly. They might be commanding during a safety incident, coaching during an apprentice's development session, democratic during a planning meeting, and affiliative when team morale needs a boost, all in the same day."
  }
];

export default function LeadershipModule1Section2() {
  useSEO({
    title: "Leadership Styles — Finding Your Approach | Leadership Module 1.2",
    description: "Explore Daniel Goleman's six leadership styles, Hersey and Blanchard's Situational Leadership, and how to adapt your style on a construction site.",
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
            <Link to="../leadership-module-1-section-1">
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
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Leadership Styles &mdash; Finding Your Approach
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding different styles, when to use each, and why the ability to adapt is the most valuable leadership skill on site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Goleman:</strong> 6 styles based on emotional intelligence research</li>
              <li><strong>Hersey &amp; Blanchard:</strong> Match style to follower readiness</li>
              <li><strong>Classic three:</strong> Autocratic, Democratic, Laissez-faire</li>
              <li><strong>Key insight:</strong> Flexibility is the superpower</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On a Construction Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Emergency:</strong> Commanding &mdash; clear, decisive action</li>
              <li><strong>Planning:</strong> Democratic &mdash; harness team expertise</li>
              <li><strong>Apprentice:</strong> Coaching &mdash; develop skills over time</li>
              <li><strong>Low morale:</strong> Affiliative &mdash; people come first</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe Daniel Goleman's six leadership styles and when to use each",
              "Explain Hersey and Blanchard's Situational Leadership model",
              "Distinguish between autocratic, democratic, and laissez-faire approaches",
              "Match leadership styles to real construction site scenarios",
              "Recognise the dangers of defaulting to a single leadership style",
              "Develop the ability to adapt your style depending on the situation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Style Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Style Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your leadership style is not just an abstract concept &mdash; it directly affects
                everything about your team&rsquo;s performance. Research by Daniel Goleman, published
                in the <em>Harvard Business Review</em>, found that leadership style accounts for up to
                <strong> 30% of a team&rsquo;s measurable performance</strong>. That is an enormous impact
                from a single variable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">What Your Style Affects</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Team morale</strong> &mdash; how people feel about coming to work each day</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Productivity</strong> &mdash; how much quality work gets done</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Safety culture</strong> &mdash; whether people report concerns or stay silent</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Staff retention</strong> &mdash; whether good people stay or leave</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Innovation</strong> &mdash; whether people suggest better ways of working</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Quality</strong> &mdash; whether people take pride in their workmanship</span>
                  </div>
                </div>
              </div>

              <p>
                The most important finding from decades of leadership research is this: <strong>there is
                no single &ldquo;best&rdquo; style</strong>. The best leaders are those who can read the
                situation and adapt. They have a range of styles available and know when to deploy each one.
                This is the skill this section will help you develop.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Daniel Goleman's Six Leadership Styles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Daniel Goleman&rsquo;s Six Leadership Styles
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daniel Goleman&rsquo;s research, based on a study of over 3,000 managers, identified six
                distinct leadership styles. Each is rooted in different components of emotional intelligence
                and has a measurable impact on team climate &mdash; either positive or negative.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-red-400 font-semibold text-sm mb-1">1. Coercive / Commanding</p>
                  <p className="text-white text-xs font-medium mb-2">&ldquo;Do what I tell you&rdquo;</p>
                  <p className="text-sm text-white/80 mb-2">Demands immediate compliance. The leader makes all decisions and expects unquestioning obedience.</p>
                  <p className="text-xs text-white/80"><strong className="text-white">On site:</strong> Use during emergencies &mdash; fire alarm, structural concern, live electrical danger. Gives clear commands that save lives.</p>
                  <p className="text-xs text-white/80 mt-1"><strong className="text-white">Backfires when:</strong> Used as default. Destroys morale, kills initiative, drives good people away. People stop thinking for themselves.</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-blue-400 font-semibold text-sm mb-1">2. Authoritative / Visionary</p>
                  <p className="text-white text-xs font-medium mb-2">&ldquo;Come with me&rdquo;</p>
                  <p className="text-sm text-white/80 mb-2">Mobilises people towards a shared vision. Provides clear direction while giving freedom in how to achieve it.</p>
                  <p className="text-xs text-white/80"><strong className="text-white">On site:</strong> Monday morning briefings &mdash; explaining the week&rsquo;s goals, why the project matters, what success looks like.</p>
                  <p className="text-xs text-white/80 mt-1"><strong className="text-white">Backfires when:</strong> Used with a more experienced team who know more than you &mdash; can feel patronising or out of touch.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-green-400 font-semibold text-sm mb-1">3. Affiliative</p>
                  <p className="text-white text-xs font-medium mb-2">&ldquo;People come first&rdquo;</p>
                  <p className="text-sm text-white/80 mb-2">Creates emotional bonds and harmony. Prioritises people&rsquo;s feelings, relationships, and well-being over tasks.</p>
                  <p className="text-xs text-white/80"><strong className="text-white">On site:</strong> After a difficult week, a near-miss, or personal issues in the team. Friday afternoon when morale is low.</p>
                  <p className="text-xs text-white/80 mt-1"><strong className="text-white">Backfires when:</strong> Poor performance goes unchallenged because the leader avoids conflict to preserve harmony.</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <p className="text-amber-400 font-semibold text-sm mb-1">4. Democratic</p>
                  <p className="text-white text-xs font-medium mb-2">&ldquo;What do you think?&rdquo;</p>
                  <p className="text-sm text-white/80 mb-2">Builds consensus through participation. Seeks input from the team before making decisions.</p>
                  <p className="text-xs text-white/80"><strong className="text-white">On site:</strong> Planning complex installations, solving technical problems, deciding the best approach to a challenging task.</p>
                  <p className="text-xs text-white/80 mt-1"><strong className="text-white">Backfires when:</strong> Used in crises where quick decisions are needed, or when the team lacks the expertise to contribute meaningfully.</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-purple-400 font-semibold text-sm mb-1">5. Pacesetting</p>
                  <p className="text-white text-xs font-medium mb-2">&ldquo;Do as I do, now&rdquo;</p>
                  <p className="text-sm text-white/80 mb-2">Sets extremely high performance standards. Leads by example and expects others to match the pace immediately.</p>
                  <p className="text-xs text-white/80"><strong className="text-white">On site:</strong> Short-term push to hit a critical deadline with a highly competent team. Demonstrating quality standards by example.</p>
                  <p className="text-xs text-white/80 mt-1"><strong className="text-white">Backfires when:</strong> Sustained long-term. Team burns out, feels inadequate, stops taking initiative for fear of not meeting the standard.</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">6. Coaching</p>
                  <p className="text-white text-xs font-medium mb-2">&ldquo;Try this&rdquo;</p>
                  <p className="text-sm text-white/80 mb-2">Develops people for the future. Focuses on personal development, helping people identify strengths and areas for growth.</p>
                  <p className="text-xs text-white/80"><strong className="text-white">On site:</strong> Apprentice struggling with cable calculations &mdash; spending time working through it with them rather than just giving the answer.</p>
                  <p className="text-xs text-white/80 mt-1"><strong className="text-white">Backfires when:</strong> Used with people who are resistant to learning or in situations where there is no time for development.</p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Goleman&rsquo;s Key Finding</p>
                </div>
                <p className="text-sm text-white/80">
                  Goleman found that the <strong className="text-white">Authoritative/Visionary</strong> style has the
                  most consistently positive impact on team climate. However, the leaders with the best
                  results were those who used <strong className="text-white">four or more styles regularly</strong>,
                  switching fluidly between them depending on the situation. Two styles &mdash; Coercive and
                  Pacesetting &mdash; had a negative impact on climate when overused, but were valuable
                  in specific situations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Situational Leadership (Hersey & Blanchard) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Situational Leadership (Hersey &amp; Blanchard)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Paul Hersey and Ken Blanchard developed Situational Leadership Theory, which provides
                a practical framework for matching your leadership style to the <strong>readiness level</strong> of
                the person you are leading. Readiness is determined by two factors: <strong>competence</strong> (ability
                and skill) and <strong>commitment</strong> (motivation and confidence).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Four Styles Mapped to Follower Readiness</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">S1 &mdash; Telling</p>
                    <p className="text-xs text-white font-medium mb-1">High Direction, Low Support</p>
                    <p className="text-white/80 text-xs mb-2">For: Low competence, high commitment</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> A brand-new apprentice on their first day. They are keen and enthusiastic but have no idea what to do. Give clear, step-by-step instructions. &ldquo;First, we&rsquo;ll do this. Then this. Watch me, then try it.&rdquo;</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">S2 &mdash; Selling</p>
                    <p className="text-xs text-white font-medium mb-1">High Direction, High Support</p>
                    <p className="text-white/80 text-xs mb-2">For: Some competence, low commitment</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> An apprentice six months in. They have some skills but are losing confidence after making mistakes. Give direction AND explanation &mdash; help them understand WHY, not just what. Build their confidence while guiding their learning.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">S3 &mdash; Participating</p>
                    <p className="text-xs text-white font-medium mb-1">Low Direction, High Support</p>
                    <p className="text-white/80 text-xs mb-2">For: High competence, variable commitment</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> An experienced electrician having a bad week &mdash; personal problems, fatigue, frustration. They know how to do the job but need support and encouragement. Listen, involve them in decisions, show you value them.</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">S4 &mdash; Delegating</p>
                    <p className="text-xs text-white font-medium mb-1">Low Direction, Low Support</p>
                    <p className="text-white/80 text-xs mb-2">For: High competence, high commitment</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> Your most experienced, trusted electrician. They are skilled, motivated, and reliable. Give them the task, agree the outcome, and get out of their way. Micromanaging this person would be demotivating and insulting.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Critical Insight</p>
                </div>
                <p className="text-sm text-white/80">
                  The same person may need <strong className="text-white">different styles for different tasks</strong>.
                  An experienced electrician (S4 for cable installation) might be an absolute beginner
                  when it comes to completing test certificates on a new digital system (S1 for that task).
                  Readiness is task-specific, not person-specific. Never assume someone who is competent
                  in one area will be competent in all areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Autocratic, Democratic, and Laissez-Faire */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Autocratic, Democratic, and Laissez-Faire
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The classic three-style model, originating from Kurt Lewin&rsquo;s research in the 1930s,
                remains one of the most widely understood frameworks. While simpler than Goleman&rsquo;s
                or Hersey &amp; Blanchard&rsquo;s models, it captures the fundamental spectrum of leadership
                from total control to total freedom.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-red-400" />
                      <p className="text-white font-medium">Autocratic (Authoritarian)</p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">The leader makes all decisions unilaterally. No consultation, no input from the team.</p>
                    <p className="text-sm text-white/80 mb-1"><strong className="text-white">Works on site when:</strong> Safety emergencies requiring immediate action. Non-negotiable regulatory compliance. Situations where speed is critical and there is no time for discussion.</p>
                    <p className="text-sm text-white/80"><strong className="text-white">Danger:</strong> If used as default, creates a culture of dependence, resentment, and suppressed initiative. People stop reporting problems because they have learned their input is not valued.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-blue-400" />
                      <p className="text-white font-medium">Democratic (Participative)</p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">The leader seeks input, encourages participation, and makes decisions based on group consensus or majority.</p>
                    <p className="text-sm text-white/80 mb-1"><strong className="text-white">Works on site when:</strong> Planning complex installations. Solving technical problems. Deciding the approach to a challenging task. Team meetings about working methods and improvements.</p>
                    <p className="text-sm text-white/80"><strong className="text-white">Danger:</strong> Decision-making can be slow. In crises, seeking consensus wastes critical time. Not effective when the team lacks expertise to contribute meaningfully to the decision.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-400" />
                      <p className="text-white font-medium">Laissez-Faire (Hands-Off)</p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">The leader provides minimal direction or supervision. The team is left to make their own decisions and manage their own work.</p>
                    <p className="text-sm text-white/80 mb-1"><strong className="text-white">Works on site when:</strong> Highly skilled, experienced, self-motivated teams working on tasks they know well. Trusted individuals who perform best with autonomy.</p>
                    <p className="text-sm text-white/80"><strong className="text-white">Danger:</strong> Standards can slip without oversight. Less experienced team members feel abandoned. If used as a default, it often masks a lack of leadership rather than a deliberate choice to empower.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Adapting Your Style on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Adapting Your Style on Site
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The real skill is not knowing the frameworks &mdash; it is being able to read a situation
                in real time and adapt your approach. Here are five real construction scenarios and the
                styles they demand:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Monday Morning Toolbox Talk</p>
                  <p className="text-sm text-white/80"><strong className="text-white">Style: Authoritative/Visionary.</strong> Set the tone for the week. Explain the goals, paint the picture of what success looks like, connect the day&rsquo;s tasks to the bigger project. Give people a sense of purpose and direction. &ldquo;This week, we&rsquo;re finishing the second-fix on floors 3 and 4. By Friday, every circuit on those floors will be live-tested and signed off. Here&rsquo;s how we get there&hellip;&rdquo;</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-rose-400 font-semibold text-sm mb-1">Apprentice Struggling with Cable Calculations</p>
                  <p className="text-sm text-white/80"><strong className="text-white">Style: Coaching.</strong> Do not just give them the answer. Sit down with them, work through the process, help them understand the logic. Ask questions that guide their thinking. &ldquo;What&rsquo;s the first thing we need to know? Good. Now, where do we find that in the regs? That&rsquo;s it. Now apply that to this circuit&hellip;&rdquo;</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                  <p className="text-red-400 font-semibold text-sm mb-1">Safety Near-Miss Just Happened</p>
                  <p className="text-sm text-white/80"><strong className="text-white">Style: Commanding.</strong> Immediate control. Stop work, secure the area, check everyone is safe. Clear, direct instructions. No ambiguity. &ldquo;Everyone stop. Tools down. Move away from that area. Nobody goes back until I say so.&rdquo; Once the area is safe, shift to affiliative (check on the team emotionally) and then democratic (investigate what went wrong together).</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                  <p className="text-amber-400 font-semibold text-sm mb-1">Experienced Team Planning a Complex Installation</p>
                  <p className="text-sm text-white/80"><strong className="text-white">Style: Democratic.</strong> Your experienced team knows more about the technical details than you might. Harness their expertise. &ldquo;We&rsquo;ve got a complex containment route through three fire barriers with limited access. What&rsquo;s the best approach? Dave, you did something similar on the hospital job &mdash; what worked?&rdquo;</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                  <p className="text-green-400 font-semibold text-sm mb-1">Friday Afternoon &mdash; Team Morale Is Low</p>
                  <p className="text-sm text-white/80"><strong className="text-white">Style: Affiliative.</strong> It has been a tough week. The team is tired. People are frustrated. This is not the time for pushing harder or setting new targets. Acknowledge the effort. Recognise specific contributions. Show you care about the people, not just the work. &ldquo;I know this week&rsquo;s been hard. I want you all to know I see the effort you&rsquo;ve put in. Let&rsquo;s finish strong today and have a good weekend.&rdquo;</p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Superpower:</strong> Notice that in a single week,
                  an effective site supervisor might use five different styles. The ability to read the
                  situation and adapt is the single most valuable leadership skill you can develop. It is
                  not about being a chameleon or being inauthentic &mdash; it is about having the range
                  to give people what they need, when they need it.
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
                This section has introduced the major leadership style frameworks and shown how they
                apply to real construction situations. The key points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Goleman&rsquo;s six styles:</strong> Commanding, Authoritative, Affiliative, Democratic, Pacesetting, Coaching &mdash; each has a place, none should be used exclusively.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Situational Leadership:</strong> Match your style to the person&rsquo;s readiness &mdash; their competence and commitment for the specific task at hand.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Classic three:</strong> Autocratic for emergencies, Democratic for planning, Laissez-faire for trusted experts &mdash; but never default to one.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Flexibility is key:</strong> The best leaders use four or more styles regularly, switching based on situation, people, and task.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Overuse is dangerous:</strong> Any style, used exclusively, has negative consequences. Commanding kills initiative; Democratic slows crises; Pacesetting burns people out.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Every style is learnable:</strong> Even if it feels unnatural now, you can develop range through awareness, practice, and feedback.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will explore self-awareness
                  &mdash; the Johari Window, Belbin Team Roles, recognising your blind spots, and building
                  on your strengths. Self-awareness is the foundation of all effective leadership.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../leadership-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-1-section-3">
              Next: Self-Awareness
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
