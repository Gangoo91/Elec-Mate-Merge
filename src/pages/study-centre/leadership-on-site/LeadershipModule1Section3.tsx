import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Eye, Users, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "self-awareness-johari",
    question: "In the Johari Window, information that is known to others but NOT known to yourself is in which quadrant?",
    options: [
      "Open / Arena",
      "Blind Spot",
      "Hidden / Facade",
      "Unknown"
    ],
    correctIndex: 1,
    explanation: "The Blind Spot quadrant contains information that others can see about you but you cannot see in yourself. For example, your team might notice that you become short-tempered when you are under pressure, but you are not aware of this pattern. The goal is to reduce this quadrant by actively seeking honest feedback from trusted colleagues."
  },
  {
    id: "self-awareness-belbin",
    question: "In Belbin's Team Roles framework, which category does the 'Coordinator' role belong to?",
    options: [
      "Action-Oriented",
      "People-Oriented",
      "Thinking-Oriented",
      "Technical-Oriented"
    ],
    correctIndex: 1,
    explanation: "The Coordinator is a People-Oriented role. Coordinators are confident, good chairpeople who clarify goals, delegate effectively, and ensure that the team's talent is being used to best effect. The three People-Oriented roles are Coordinator, Teamworker, and Resource Investigator. On a construction site, a Coordinator might naturally take charge of planning meetings, ensuring everyone has their say and tasks are allocated to the right people."
  },
  {
    id: "self-awareness-strengths",
    question: "Gallup's research found that people who use their strengths every day at work are how much more likely to be engaged?",
    options: [
      "2 times more likely",
      "4 times more likely",
      "6 times more likely",
      "10 times more likely"
    ],
    correctIndex: 2,
    explanation: "Gallup's global research found that people who use their strengths every day are 6 times more likely to be engaged at work. This is one of the strongest findings in workplace psychology. It does not mean ignoring weaknesses — it means understanding where you naturally excel and building your work life around those strengths as much as possible, while creating systems and support structures to manage areas of weakness."
  }
];

const faqs = [
  {
    question: "What if I ask for feedback and hear things I do not want to hear?",
    answer: "This is exactly the point — and it is completely normal to find it uncomfortable. The most valuable feedback is often the hardest to hear because it reveals things you were not aware of. The key is to listen without becoming defensive. Thank the person for their honesty. Do not argue or justify — just absorb it. Then reflect on it privately. Not all feedback will be accurate, but patterns across multiple sources are almost always worth paying attention to. The discomfort you feel is the discomfort of growth."
  },
  {
    question: "How do I find my Belbin Team Roles without doing the official assessment?",
    answer: "While the official Belbin assessment is the most reliable method, you can get a good sense of your preferred roles through self-reflection. Think about what you naturally gravitate towards in team settings. Do you generate ideas (Plant)? Do you organise and coordinate (Coordinator)? Do you focus on detail and finishing tasks (Completer Finisher)? Do you network and find resources (Resource Investigator)? Ask trusted colleagues which roles they see you playing most naturally. Most people have 2-3 preferred roles and 2-3 roles they tend to avoid."
  },
  {
    question: "Is self-awareness something you either have or you do not?",
    answer: "No. Self-awareness is a skill that can be developed through deliberate practice. Research by organisational psychologist Tasha Eurich found that while 95% of people believe they are self-aware, only about 10-15% actually are by objective measures. The gap between perceived self-awareness and actual self-awareness is enormous. The good news is that specific practices — seeking feedback, reflecting regularly, journaling, and working with a mentor — have been shown to significantly improve self-awareness over time."
  },
  {
    question: "How does self-awareness make you a better leader on a construction site?",
    answer: "Self-awareness is the foundation that everything else is built on. If you know your natural leadership style, you can adapt it. If you know your blind spots, you can guard against them. If you know your strengths, you can leverage them. If you know your triggers (the things that make you react badly), you can manage them. On a construction site, where pressure is high and decisions have real consequences, self-aware leaders make better choices, build stronger relationships, handle conflict more effectively, and create healthier team cultures."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Johari Window was created by:",
    options: [
      "Daniel Goleman and Richard Boyatzis",
      "Joseph Luft and Harrington Ingham",
      "Paul Hersey and Ken Blanchard",
      "Meredith Belbin and Raymond Cattell"
    ],
    correctAnswer: 1,
    explanation: "The Johari Window was created by American psychologists Joseph Luft and Harrington Ingham in 1955. The name 'Johari' is a combination of their first names: Jo(seph) and Hari(ngton). It was developed as a tool for understanding interpersonal relationships and improving self-awareness in group settings."
  },
  {
    id: 2,
    question: "In the Johari Window, the 'Open/Arena' quadrant represents information that is:",
    options: [
      "Known to self but hidden from others",
      "Unknown to both self and others",
      "Known to others but not to self",
      "Known to both self and others"
    ],
    correctAnswer: 3,
    explanation: "The Open/Arena quadrant contains information that is known to you AND known to others. This includes things like your visible skills, your known behaviours, and your publicly shared experiences. Effective leadership aims to expand this quadrant — the larger it is, the better the communication, trust, and working relationships within the team."
  },
  {
    id: 3,
    question: "To reduce the 'Blind Spot' quadrant in the Johari Window, a leader should:",
    options: [
      "Share more personal information with the team",
      "Actively seek honest feedback from trusted colleagues",
      "Spend more time working alone to reflect on their behaviour",
      "Avoid situations that might reveal weaknesses"
    ],
    correctAnswer: 1,
    explanation: "The Blind Spot contains things others see about you that you cannot see yourself. The ONLY way to reduce this quadrant is by seeking feedback from others — asking trusted colleagues, requesting 360-degree feedback, and creating a culture where people feel safe to give you honest input. Sharing personal information (disclosure) reduces the Hidden quadrant, not the Blind Spot."
  },
  {
    id: 4,
    question: "In Belbin's Team Roles, how many roles are there and how are they categorised?",
    options: [
      "6 roles in 2 categories",
      "8 roles in 4 categories",
      "9 roles in 3 categories",
      "12 roles in 4 categories"
    ],
    correctAnswer: 2,
    explanation: "Belbin identified 9 team roles in 3 categories: Action-Oriented (Shaper, Implementer, Completer Finisher), People-Oriented (Coordinator, Teamworker, Resource Investigator), and Thinking-Oriented (Plant, Monitor Evaluator, Specialist). Each role brings specific strengths to a team, and the most effective teams have a balance of all three categories."
  },
  {
    id: 5,
    question: "Which Belbin role is described as someone who generates creative ideas and solves difficult problems in unconventional ways?",
    options: [
      "Coordinator",
      "Implementer",
      "Plant",
      "Resource Investigator"
    ],
    correctAnswer: 2,
    explanation: "The Plant is the creative, innovative thinker who generates original ideas and finds novel solutions to difficult problems. They are called 'Plant' because Belbin found that 'planting' one in a struggling team could transform its performance. On a construction site, a Plant might be the person who comes up with a creative workaround when a standard approach will not work due to site constraints."
  },
  {
    id: 6,
    question: "A common blind spot for new leaders on a construction site is:",
    options: [
      "Being too technically skilled at their trade",
      "Not realising that their mood and behaviour affect the whole team's atmosphere",
      "Having too much experience in the construction industry",
      "Being too well-liked by their colleagues"
    ],
    correctAnswer: 1,
    explanation: "One of the most common blind spots for new leaders is underestimating the impact of their own mood and behaviour on the team. When a supervisor arrives on site stressed and irritable, it can set a negative tone for the entire day. When they arrive positive and energised, it lifts everyone. This 'emotional contagion' effect is well-documented in leadership research but is often invisible to the leader themselves."
  },
  {
    id: 7,
    question: "Strengths-based leadership suggests that the most effective approach is to:",
    options: [
      "Focus exclusively on fixing your weaknesses until they become strengths",
      "Ignore all weaknesses and only do work you are naturally good at",
      "Understand and leverage your natural strengths while creating systems to manage weaknesses",
      "Copy the leadership style of the most successful leader you know"
    ],
    correctAnswer: 2,
    explanation: "Strengths-based leadership is about understanding where you naturally excel and organising your work to leverage those strengths, while also being honest about your weaknesses and creating systems, habits, or support structures to manage them. It does NOT mean ignoring weaknesses — that would be dangerous. It means being strategic: invest most of your development energy in building strengths, and find practical workarounds for weaknesses."
  },
  {
    id: 8,
    question: "Research by Tasha Eurich found that while 95% of people believe they are self-aware, the actual percentage who meet objective criteria for self-awareness is approximately:",
    options: [
      "50-60%",
      "30-40%",
      "10-15%",
      "75-80%"
    ],
    correctAnswer: 2,
    explanation: "Eurich's research found that only 10-15% of people actually meet objective criteria for self-awareness, despite 95% believing they are self-aware. This enormous gap — known as the 'self-awareness gap' — demonstrates why deliberate effort is needed to develop genuine self-awareness. Simply believing you are self-aware is not enough; it requires active feedback-seeking, reflection, and honest self-examination."
  }
];

export default function LeadershipModule1Section3() {
  useSEO({
    title: "Self-Awareness and Knowing Your Strengths | Leadership Module 1.3",
    description: "Explore the Johari Window, Belbin Team Roles, recognising your blind spots, and building a strengths-based approach to leadership on site.",
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
            <Link to="../leadership-module-1-section-2">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Self-Awareness and Knowing Your Strengths
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Why understanding yourself is the foundation of effective leadership, and practical tools for uncovering your strengths, blind spots, and team roles
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Johari Window:</strong> 4 quadrants revealing what you and others know</li>
              <li><strong>Belbin Roles:</strong> 9 team roles across 3 categories</li>
              <li><strong>Blind spots:</strong> What others see that you cannot</li>
              <li><strong>Strengths-based:</strong> Build on what you do well</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Foundation:</strong> Self-awareness underpins all other leadership skills</li>
              <li><strong>Engagement:</strong> Using strengths daily = 6x more engagement</li>
              <li><strong>Reality check:</strong> Only 10&ndash;15% of people are truly self-aware</li>
              <li><strong>Learnable:</strong> Self-awareness develops with deliberate practice</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why self-awareness is the foundation of effective leadership",
              "Describe the four quadrants of the Johari Window and how to use them",
              "Identify all nine Belbin Team Roles and their three categories",
              "Recognise common blind spots for new leaders on a construction site",
              "Apply a strengths-based approach to your own leadership development",
              "Create practical strategies for uncovering and addressing blind spots"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Self-Awareness Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Self-Awareness Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You cannot lead others effectively if you do not understand yourself. This is not a
                platitude &mdash; it is backed by decades of leadership research. <strong>Daniel Goleman</strong>,
                whose work on emotional intelligence transformed our understanding of leadership, identified
                self-awareness as the <strong>foundational competency</strong> upon which all other leadership
                capabilities are built.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Goleman on Self-Awareness</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;If you do not have self-awareness, if you are not able to manage your
                  distressing emotions, if you can&rsquo;t have empathy and have effective relationships,
                  then no matter how smart you are, you are not going to get very far.&rdquo;</strong>
                </p>
              </div>

              <p>
                Self-awareness means understanding your own emotions, strengths, weaknesses, values,
                drivers, and impact on others. It has two components:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-rose-400 font-semibold text-sm mb-2">Internal Self-Awareness</p>
                    <p className="text-sm text-white/80">How clearly you see your own values, passions, aspirations, fit with your environment, reactions, and impact on others. This is about knowing yourself &mdash; your patterns, your triggers, your tendencies.</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm mb-2">External Self-Awareness</p>
                    <p className="text-sm text-white/80">Understanding how others see you. This is about knowing how your behaviour, communication style, and decisions are perceived by the people around you. It is the bridge between how you see yourself and how the world sees you.</p>
                  </div>
                </div>
              </div>

              <p>
                Research by organisational psychologist <strong>Tasha Eurich</strong> found that while
                95% of people believe they are self-aware, only about <strong>10&ndash;15%</strong> actually
                meet objective criteria. This enormous gap &mdash; the &ldquo;self-awareness gap&rdquo;
                &mdash; means that most leaders are operating with significant blind spots they do not
                even know they have. The following tools will help you close that gap.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Johari Window */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Johari Window
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Johari Window is one of the most widely used tools for developing self-awareness. Created
                by American psychologists <strong>Joseph Luft</strong> and <strong>Harrington Ingham</strong> in
                1955, it provides a simple four-quadrant model for understanding the relationship between what
                you know about yourself and what others know about you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Four Quadrants</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold mb-1">1. Open / Arena</p>
                    <p className="text-xs text-white font-medium mb-1">Known to Self AND Known to Others</p>
                    <p className="text-white/80 text-xs mb-2">This is your public self &mdash; the things that both you and your colleagues are aware of. Your visible skills, known behaviours, and shared experiences.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> Everyone knows you are a strong cable installer. You know it too. You are openly confident with technical questions. The team knows your working style.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">2. Blind Spot</p>
                    <p className="text-xs text-white font-medium mb-1">Known to Others but NOT Known to Self</p>
                    <p className="text-white/80 text-xs mb-2">Things others can see about you but you cannot see in yourself. Habits, mannerisms, impact on others that you are oblivious to.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> Your team notices you always interrupt people mid-sentence. You do not realise you do it. They notice your mood drops every Monday morning. You think you hide it well.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold mb-1">3. Hidden / Fa&ccedil;ade</p>
                    <p className="text-xs text-white font-medium mb-1">Known to Self but NOT Known to Others</p>
                    <p className="text-white/80 text-xs mb-2">Things you know about yourself but keep hidden from others. Private feelings, fears, insecurities, past experiences that shape your behaviour.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> You feel out of your depth as a new supervisor but put on a brave face. You lack confidence with certain technical tasks but avoid admitting it.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">4. Unknown</p>
                    <p className="text-xs text-white font-medium mb-1">NOT Known to Self AND NOT Known to Others</p>
                    <p className="text-white/80 text-xs mb-2">Undiscovered abilities, unconscious biases, untapped potential, and deep-seated fears that neither you nor others are aware of.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> You might have a natural talent for mentoring that has never been tested. You might have unconscious biases you are not aware of. New challenges reveal unknown qualities.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Goal: Expand Your Open Area</p>
                </div>
                <p className="text-sm text-white/80">
                  The aim is to make the Open/Arena quadrant as large as possible. You do this through two
                  practices: <strong className="text-white">seeking feedback</strong> (which reduces your Blind Spot
                  &mdash; others tell you what they see) and <strong className="text-white">appropriate
                  self-disclosure</strong> (which reduces your Hidden area &mdash; you share relevant information
                  with your team). The larger the Open area, the stronger the trust, communication, and
                  effectiveness of your leadership.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Belbin Team Roles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Belbin Team Roles
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dr Meredith Belbin&rsquo;s research at Henley Management College identified <strong>nine
                distinct team roles</strong> that people naturally adopt in team settings. Understanding
                your preferred roles helps you play to your strengths and recognise what you bring to
                a team &mdash; and what gaps might exist.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Action-Oriented Roles</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">Shaper</p>
                    <p className="text-white/80 text-xs mb-1">Challenging, dynamic, thrives on pressure. Pushes the team to overcome obstacles.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The supervisor who drives the team through a tight deadline with energy and determination.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">Implementer</p>
                    <p className="text-white/80 text-xs mb-1">Disciplined, reliable, efficient. Turns ideas into practical action plans.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The electrician who takes the plan and systematically works through it, step by step, on time and to standard.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold mb-1">Completer Finisher</p>
                    <p className="text-white/80 text-xs mb-1">Painstaking, conscientious, anxious. Searches out errors, polishes and perfects.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The person who checks every termination, labels every circuit, and ensures the finished installation is immaculate.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">People-Oriented Roles</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">Coordinator</p>
                    <p className="text-white/80 text-xs mb-1">Mature, confident, trusting. Clarifies goals, delegates well, promotes decision-making.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The natural chairperson who runs effective meetings and ensures the right people are on the right tasks.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">Teamworker</p>
                    <p className="text-white/80 text-xs mb-1">Cooperative, mild, diplomatic. Listens, averts friction, builds relationships.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The person who smooths tensions between team members, includes everyone, and keeps the peace during stressful periods.</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">Resource Investigator</p>
                    <p className="text-white/80 text-xs mb-1">Outgoing, enthusiastic, communicative. Explores opportunities, develops contacts.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The person who knows everyone, can find materials at short notice, and always knows who to call to solve a problem.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Thinking-Oriented Roles</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">Plant</p>
                    <p className="text-white/80 text-xs mb-1">Creative, imaginative, free-thinking. Generates ideas, solves difficult problems.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The electrician who comes up with a creative workaround when the standard containment route will not work due to site constraints.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">Monitor Evaluator</p>
                    <p className="text-white/80 text-xs mb-1">Sober, strategic, discerning. Sees all options, judges accurately.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The person who calmly analyses the proposed approach, identifies the risks everyone else has missed, and suggests a better alternative.</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-purple-400 font-semibold mb-1">Specialist</p>
                    <p className="text-white/80 text-xs mb-1">Single-minded, self-starting, dedicated. Provides deep knowledge in a narrow field.</p>
                    <p className="text-white/80 text-xs"><strong className="text-white">On site:</strong> The expert in fire alarm systems, or data cabling, or renewable energy installations. The person everyone goes to for deep technical knowledge.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key insight:</strong> No single role is better than the others.
                  Belbin&rsquo;s research found that <strong>balanced teams outperform unbalanced ones</strong>,
                  even when the unbalanced team had higher individual ability. A team of all Plants will generate
                  brilliant ideas but never finish anything. A team of all Implementers will execute efficiently
                  but lack creativity. Understanding your own preferred roles helps you see what you bring to
                  the team &mdash; and what roles you might need to recruit or develop in others.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Recognising Your Blind Spots */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Recognising Your Blind Spots
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every leader has blind spots &mdash; aspects of their behaviour, impact, and assumptions that
                they cannot see. For new leaders on a construction site, certain blind spots are particularly
                common and particularly damaging if left unaddressed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Blind Spots for New Leaders on Site</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Thinking you are approachable when you are not</strong> &mdash; you believe your door is always open, but your body language, tone, or busyness sends a signal that says &ldquo;do not disturb.&rdquo; The result: problems are hidden from you until they become crises.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Not realising your mood affects the whole team</strong> &mdash; you arrive stressed or frustrated and do not notice that the entire team&rsquo;s energy drops. The leader&rsquo;s emotional state is contagious. If you bring negativity, the team absorbs it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Overestimating your own contribution</strong> &mdash; taking credit (consciously or unconsciously) for the team&rsquo;s achievements while attributing failures to external factors. This erodes trust faster than almost anything else.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Underestimating the impact of favouritism</strong> &mdash; giving more interesting work, more flexibility, or more attention to certain team members without realising how obvious this is to everyone else. Even perceived favouritism is destructive.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Believing that being busy means being effective</strong> &mdash; filling every moment with activity but not stepping back to assess whether you are working on the right things. Activity is not the same as productivity.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Uncover Your Blind Spots</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">360-degree feedback</strong> &mdash; formal feedback from your manager, your peers, and your team members. This is the gold standard for uncovering blind spots because it captures multiple perspectives.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Ask trusted colleagues directly</strong> &mdash; find someone you trust and ask: &ldquo;What is one thing I could do differently to be a more effective leader?&rdquo; Then listen without defending.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Reflect after difficult situations</strong> &mdash; after a conflict, a mistake, or a challenging interaction, deliberately review your own behaviour. What did you do well? What would you do differently? What were you feeling at the time?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Watch for repeated patterns</strong> &mdash; if the same type of conflict keeps happening, or the same feedback keeps appearing, or the same type of person keeps struggling under your leadership, that is a signal pointing to a blind spot.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Discomfort Is the Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Confronting blind spots is uncomfortable. Your instinct will be to dismiss feedback, rationalise
                  your behaviour, or avoid the conversation altogether. This is normal &mdash; but it is also
                  exactly the reaction that keeps blind spots hidden. <strong className="text-white">The discomfort
                  you feel when receiving challenging feedback is the discomfort of growth.</strong> Lean into it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Strengths-Based Leadership */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Strengths-Based Leadership
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Traditional development approaches focus heavily on fixing weaknesses. Strengths-based
                leadership takes a different view: <strong>invest most of your energy in building on what
                you already do well</strong>, while creating practical systems to manage your weaknesses.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Gallup&rsquo;s Research on Strengths</p>
                <p className="text-sm text-white/80">
                  Global research by Gallup involving over two million people found that people who use their
                  strengths every day are <strong className="text-white">6 times more likely to be engaged</strong> at
                  work. Teams that focus on strengths every day have <strong className="text-white">12.5% greater
                  productivity</strong>. Employees who feel their strengths are valued are
                  <strong className="text-white"> 15% less likely to leave</strong> their organisation.
                </p>
              </div>

              <p>
                This does not mean ignoring weaknesses &mdash; that would be irresponsible. It means
                being <strong>strategic</strong> about how you allocate your development energy. If you
                are naturally excellent at technical problem-solving but weak at giving praise and
                recognition, the strengths-based approach would suggest:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Leverage the strength:</strong> Put yourself in situations where your technical problem-solving is needed. Volunteer for complex challenges. Mentor others in technical skills. Build your reputation around this strength.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Create systems for the weakness:</strong> Do not just try to force yourself to give more praise (that will feel inauthentic and fade within a week). Instead, build a system: set a weekly reminder to recognise one team member. Write brief thank-you notes at the end of each week. Schedule a five-minute slot in every toolbox talk for recognition. Make it structural, not reliant on willpower.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Partner with complementary people:</strong> If you know your weakness is around people skills, find a team member or colleague who excels in that area and lean on them. Great leaders do not try to do everything themselves &mdash; they build teams that compensate for their gaps.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The bottom line:</strong> You will never be equally strong
                  in all areas, and that is perfectly fine. What matters is that you <strong>know your strengths,
                  use them intentionally, and have honest strategies for managing your weaknesses</strong>. That
                  is mature, effective leadership.
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
                This section has provided you with practical frameworks for developing self-awareness
                &mdash; the foundation upon which all other leadership skills are built. The key
                points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Self-awareness is foundational:</strong> Goleman identified it as the basis of emotional intelligence. You cannot lead effectively without understanding yourself.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">The Johari Window:</strong> Four quadrants (Open, Blind Spot, Hidden, Unknown) &mdash; expand the Open area through feedback and appropriate self-disclosure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Belbin Team Roles:</strong> Nine roles in three categories &mdash; know your preferred roles and understand how balanced teams outperform unbalanced ones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Blind spots are universal:</strong> Every leader has them. Common ones include mood contagion, perceived favouritism, and overestimating approachability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Strengths-based approach:</strong> Build on what you do well, create systems for weaknesses. People who use their strengths daily are 6x more engaged.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Self-awareness is learnable:</strong> Through feedback, reflection, and deliberate practice, anyone can close the self-awareness gap.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will tackle one of the
                  most challenging transitions in any career &mdash; the Mate-to-Manager transition. Moving
                  from being one of the team to leading the team is uniquely difficult in construction, and
                  we will cover the seven core challenges, boundary setting, earning respect, and building
                  your support network.
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
            <Link to="../leadership-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-1-section-4">
              Next: The Mate-to-Manager Transition
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
