import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, MessageSquare, ClipboardList, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "tb-frequency",
    question: "According to CITB/SSSTS guidance, how long should a well-structured toolbox talk typically last?",
    options: [
      "5 minutes maximum to avoid taking workers away from the job",
      "10-15 minutes with focused content, discussion, and clear action items",
      "30-45 minutes to cover all possible hazards in detail",
      "As long as it takes — there is no recommended timeframe"
    ],
    correctIndex: 1,
    explanation: "CITB/SSSTS guidance recommends toolbox talks last 10-15 minutes. This is long enough to deliver focused content and allow discussion, but short enough to maintain attention. Going over 15 minutes risks losing the audience, while under 10 minutes rarely allows meaningful engagement."
  },
  {
    id: "tb-engagement",
    question: "Which of the following is the MOST effective technique for keeping a toolbox talk audience engaged?",
    options: [
      "Reading directly from a printed handout to ensure accuracy",
      "Using real examples and asking the team 'what would you do?' questions",
      "Keeping the talk as short as possible and skipping discussion",
      "Only covering topics that have never been discussed before"
    ],
    correctIndex: 1,
    explanation: "Interactive techniques — real examples, 'what would you do?' scenarios, and direct questions — are the most effective ways to engage construction workers who may have attended hundreds of toolbox talks. Reading from a sheet breeds cynicism and passive disengagement."
  },
  {
    id: "tb-records",
    question: "Under CDM 2015, why is it a legal requirement to keep records of toolbox talks?",
    options: [
      "Only to satisfy insurance companies during annual audits",
      "To provide evidence of information, instruction, and training as required by the regulations",
      "To track individual worker attendance for payroll purposes",
      "Records are recommended but not legally required"
    ],
    correctIndex: 1,
    explanation: "CDM 2015 requires duty holders to provide information, instruction, and training to workers. Toolbox talk records provide documented evidence that this duty has been fulfilled. In the event of an incident or HSE investigation, these records demonstrate compliance with legal obligations."
  }
];

const faqs = [
  {
    question: "How often should toolbox talks be held on site?",
    answer: "Best practice is weekly, though frequency depends on the nature and risk level of the work. High-risk activities may require daily briefings. At minimum, a toolbox talk should be held whenever there is a change in work activity, a new hazard is introduced, or following a near-miss or incident. CITB recommends at least one toolbox talk per week on active construction sites. Regularity builds the habit — if workers know there's a talk every Monday morning, it becomes part of the site culture rather than an interruption."
  },
  {
    question: "What should I do if nobody engages or asks questions during my toolbox talk?",
    answer: "Silent audiences are common, especially when workers feel toolbox talks are a tick-box exercise. To break the silence: ask specific people by name ('Dave, what's your experience with this?'), use a show of hands ('Who's seen this type of near-miss before?'), present a scenario and ask the group to solve it, or have team members present on a topic they know well. Avoid asking 'Any questions?' at the end — it almost always gets silence. Instead, ask directed questions throughout the talk. Over time, if you genuinely listen and act on input, people will start engaging."
  },
  {
    question: "Can I use the same toolbox talk topics that other sites or companies use?",
    answer: "Generic toolbox talk resources (from CITB, trade associations, or safety suppliers) are a useful starting point, but the most effective talks are tailored to your specific site, your current work activities, and your team's experience. A generic talk about working at height is far less impactful than one that references the specific scaffold on your site, the fall hazard at the stairwell opening on level 3, and the near-miss that happened last Tuesday. Use templates as a framework, then make the content specific and relevant to today's work."
  },
  {
    question: "Who is responsible for delivering toolbox talks — the site manager or the supervisor?",
    answer: "In practice, toolbox talks are most commonly delivered by the site supervisor or foreman — the person closest to the day-to-day work. However, anyone competent can deliver a toolbox talk. Rotating presenters among experienced team members increases engagement and develops the team. Specialist topics (e.g. asbestos awareness, temporary electrics) may require input from a competent person with specific knowledge. The principal contractor has overall responsibility for ensuring toolbox talks happen, but the actual delivery is typically delegated to supervisory level."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a toolbox talk on a construction site?",
    options: [
      "To satisfy paperwork requirements for the principal contractor",
      "To brief, educate, engage workers and build team cohesion around safety and work issues",
      "To give supervisors an opportunity to discipline poor performers",
      "To replace formal training courses required by legislation"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are the most regular leadership communication touchpoint on site. Their primary purpose is to brief, educate, and engage workers while building team cohesion. They are not a substitute for formal training, nor should they be used for disciplinary purposes."
  },
  {
    id: 2,
    question: "When planning a toolbox talk, what is the recommended maximum number of key points to cover?",
    options: [
      "1 key point only",
      "3 key points maximum",
      "5 key points for thoroughness",
      "As many as the topic requires"
    ],
    correctAnswer: 1,
    explanation: "Best practice is to limit a toolbox talk to a maximum of 3 key points. This ensures the message is focused and memorable. Covering too many points dilutes the impact and makes it harder for workers to retain the information. If the topic requires more, split it across multiple talks."
  },
  {
    id: 3,
    question: "Which of the following is the LEAST effective delivery technique for a toolbox talk?",
    options: [
      "Using real examples from your own experience on site",
      "Making eye contact and using workers' names during the talk",
      "Reading word-for-word from a printed sheet without looking up",
      "Asking questions and encouraging discussion throughout"
    ],
    correctAnswer: 2,
    explanation: "Reading word-for-word from a printed sheet is the least effective delivery technique. It creates a monotone, disengaged presentation that workers quickly tune out. Effective delivery involves eye contact, use of names, real examples, and interactive questioning — all of which require the presenter to know the material rather than read it verbatim."
  },
  {
    id: 4,
    question: "A toolbox talk should ideally last:",
    options: [
      "Under 5 minutes to minimise disruption to work",
      "10-15 minutes with focused content and discussion",
      "30-45 minutes to ensure comprehensive coverage",
      "At least 1 hour to allow full participation"
    ],
    correctAnswer: 1,
    explanation: "The recommended duration for a toolbox talk is 10-15 minutes. This provides sufficient time for an opening hook, delivery of key points (maximum 3), discussion, and agreed action items without losing the audience's attention."
  },
  {
    id: 5,
    question: "Which strategy is most effective for engaging construction workers who have attended hundreds of toolbox talks?",
    options: [
      "Making talks mandatory with penalties for non-attendance",
      "Varying the format, involving team members as presenters, and using interactive scenarios",
      "Keeping every talk under 5 minutes so nobody gets bored",
      "Only covering topics that have never been discussed before on any site"
    ],
    correctAnswer: 1,
    explanation: "Varying the format, involving team members as presenters, and using interactive techniques (scenarios, 'what would you do?' questions, demonstrations) keeps toolbox talks fresh and engaging. Experienced workers disengage when every talk follows the same monotonous pattern."
  },
  {
    id: 6,
    question: "Under CDM 2015, what must be recorded when delivering a toolbox talk?",
    options: [
      "Only the topic title and date — nothing else is required",
      "Date, topic, key points covered, attendee signatures, and any actions raised",
      "Just a photograph of the group to prove attendance",
      "A video recording of the entire presentation"
    ],
    correctAnswer: 1,
    explanation: "CDM 2015 requires evidence of information, instruction, and training. Best practice is to record the date, topic, key points covered, attendee names and signatures, and any actions raised. This creates a comprehensive record that demonstrates compliance in the event of an HSE investigation."
  },
  {
    id: 7,
    question: "What is the most appropriate timing for a toolbox talk?",
    options: [
      "Friday afternoon when the week's work is finishing up",
      "At the start of the working day or shift, before work begins",
      "During lunch break so it doesn't take time away from productive work",
      "At the end of the day so workers can reflect on the week"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are most effective at the start of the working day or shift, before work begins. Workers are fresh, alert, and the information is immediately relevant to the day's activities. Friday afternoons and end-of-day talks suffer from reduced attention, while lunch breaks should be protected rest time."
  },
  {
    id: 8,
    question: "Which of the following best describes the relationship between toolbox talks and formal training?",
    options: [
      "Toolbox talks replace the need for formal training courses",
      "Toolbox talks complement formal training by reinforcing key messages and addressing site-specific issues",
      "Formal training replaces the need for toolbox talks",
      "There is no relationship between toolbox talks and formal training"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks complement formal training — they do not replace it. Formal training provides comprehensive knowledge and qualifications, while toolbox talks reinforce key messages, address site-specific issues, and keep safety awareness current. Both are required under CDM 2015."
  }
];

export default function LeadershipModule3Section1() {
  useSEO({
    title: "Running Toolbox Talks and Site Briefings | Leadership Module 3.1",
    description: "How to plan, deliver, and record effective toolbox talks and site briefings that engage your team and meet CDM 2015 requirements.",
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
            <Link to="../leadership-module-3">
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Running Toolbox Talks and Site Briefings
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to plan, deliver, and record effective toolbox talks that engage your team, prevent accidents, and satisfy CDM 2015 requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Purpose:</strong> Brief, educate, engage, and build team cohesion</li>
              <li><strong>Duration:</strong> 10&ndash;15 minutes, maximum 3 key points</li>
              <li><strong>Legal basis:</strong> CDM 2015 &amp; CITB/SSSTS requirements</li>
              <li><strong>Key fact:</strong> A good toolbox talk can prevent accidents</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Site Leaders</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Planning:</strong> Relevant topic, structured delivery, real examples</li>
              <li><strong>Engagement:</strong> Interactive techniques beat reading from a sheet</li>
              <li><strong>Recording:</strong> Date, topic, attendees, actions &mdash; legally required</li>
              <li><strong>Follow-up:</strong> Track actions, identify training needs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why toolbox talks are the most important regular leadership communication on site",
              "Plan a structured toolbox talk with an opening hook, key points, discussion, and actions",
              "Apply delivery techniques that maintain attention and convey authority",
              "Use interactive methods to engage experienced workers who have attended hundreds of talks",
              "Maintain compliant records of toolbox talks as required by CDM 2015",
              "Follow up on actions raised and identify training needs from toolbox talk discussions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Toolbox Talks Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Toolbox Talks Matter
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The toolbox talk is the <strong>most regular leadership communication touchpoint</strong> on
                any construction site. It is your chance &mdash; often the only structured chance in a busy
                working day &mdash; to brief your team, educate them on hazards, engage them in safety
                thinking, and build the cohesion that turns a group of individuals into a functioning team.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">Why They Are Non-Negotiable</p>
                <p className="text-base text-white leading-relaxed">
                  CITB and SSSTS require regular toolbox talks as part of competent site supervision. CDM
                  2015 places a legal duty on duty holders to provide <strong>information, instruction,
                  and training</strong> to workers. Toolbox talks are the primary mechanism for delivering
                  ongoing instruction on site. They are not optional &mdash; they are a legal obligation.
                </p>
              </div>

              <p>
                A good toolbox talk can <strong>prevent accidents</strong>. When a supervisor takes ten
                minutes to brief the team on the specific hazards of that day&rsquo;s work &mdash; the
                overhead power line near the excavation, the fragile roof on the adjacent building, the
                change to the traffic management plan &mdash; workers are forewarned and forearmed. They
                know what to watch for, what to avoid, and what to do if something goes wrong.
              </p>

              <p>
                A bad toolbox talk, by contrast, <strong>wastes everyone&rsquo;s time and breeds
                cynicism</strong>. When a supervisor reads monotonously from a generic sheet, covers topics
                that bear no relation to the actual work, and asks &ldquo;Any questions?&rdquo; into
                dead silence before sending everyone back to work, the message received is clear: this is
                a tick-box exercise. Nobody is listening. Nobody cares. And the next time there is a real
                hazard to communicate, the team will have already learned to tune out.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Leadership Opportunity</p>
                </div>
                <p className="text-sm text-white/80">
                  Beyond safety compliance, toolbox talks are a <strong className="text-white">leadership
                  opportunity</strong>. They give you a regular platform to set expectations, recognise
                  good work, address concerns, communicate changes, and demonstrate that you take your
                  team&rsquo;s safety seriously. Workers judge their supervisors partly on how they run
                  these talks. A well-prepared, engaging toolbox talk builds respect and credibility.
                  A lazy one destroys it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Planning Your Toolbox Talk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Planning Your Toolbox Talk
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The difference between a good toolbox talk and a forgettable one is almost always
                <strong> preparation</strong>. You do not need to spend hours planning, but you do need
                to think about what you are going to say before you say it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Choosing Your Topic</p>
                <p className="text-sm text-white/80 mb-3">
                  The most effective toolbox talks cover topics that are <strong className="text-white">
                  relevant and timely</strong>. Ask yourself:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Recent near-miss?</strong> &mdash; A near-miss last week is the most compelling topic imaginable. It happened here, to us, and could have been worse.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Upcoming hazard?</strong> &mdash; If a new phase of work starts tomorrow with different risks, brief the team today.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Seasonal issue?</strong> &mdash; Winter brings ice, dark mornings, and cold-related risks. Summer brings heat stress and UV exposure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">New regulation?</strong> &mdash; Changes to standards, site rules, or industry guidance need communicating to the team.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Talk Structure</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p><strong className="text-white">1. Opening hook</strong> &mdash; a real-world example, a statistic, or a question that grabs attention in the first 30 seconds.</p>
                  <p><strong className="text-white">2. Key points (max 3)</strong> &mdash; the core message. What do you need people to know and do? Keep it focused.</p>
                  <p><strong className="text-white">3. Discussion</strong> &mdash; open the floor. Ask questions. Get input. This is where engagement happens.</p>
                  <p><strong className="text-white">4. Action items</strong> &mdash; clear, specific actions. Who does what, by when? This turns talk into results.</p>
                </div>
              </div>

              <p>
                Keep to <strong>10&ndash;15 minutes</strong>. Use props, photos, or physical examples where
                possible &mdash; showing the damaged cable is more powerful than describing it.
                <strong> Do not just read from a sheet</strong>. Prepare your key points, but
                do not script every word. If you are reading, you are not making eye contact, and
                if you are not making eye contact, you have already lost them.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Delivery Techniques That Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Delivery Techniques That Work
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You can have the best content in the world, but if the delivery is poor, the
                message will not land. Delivery is not about being a polished public speaker
                &mdash; it is about being clear, confident, and connected to your audience.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Physical Presence</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Stand where everyone can see and hear you</strong> &mdash; not behind a pillar, not with your back to the sun, not next to noisy machinery. Position yourself so the whole group can make eye contact with you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Make eye contact</strong> &mdash; scan the group. Look at individuals, not at the floor or your notes. Eye contact signals confidence and creates connection.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Use names</strong> &mdash; &ldquo;What do you think, Steve?&rdquo; is more engaging than &ldquo;Does anyone have a view?&rdquo;. Using names shows you know your team and value their input.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Voice and Pace</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Speak clearly</strong> &mdash; project your voice. On a construction site with background noise, mumbling means nobody hears you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Vary your pace</strong> &mdash; slow down for important points. Pause after key statements to let them land. A monotone delivery sends people to sleep.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Use real examples</strong> &mdash; stories from your own experience are more compelling than abstract facts. &ldquo;I once saw a lad drop a cable drum on his foot because...&rdquo; beats any textbook.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Read the Room</p>
                </div>
                <p className="text-sm text-white/80">
                  If people are losing focus &mdash; checking phones, looking away, fidgeting &mdash;
                  change approach. Ask a question, bring in a prop, move to a different point.
                  <strong className="text-white"> Do not just plough on regardless.</strong> The ability
                  to read your audience and adjust is what separates a good communicator from someone
                  who merely talks at people.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Engaging Your Audience */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Engaging Your Audience
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This is the biggest challenge. Construction workers have heard <strong>hundreds of toolbox
                talks</strong> over the course of their careers. Many have learned to stand quietly,
                nod in the right places, and switch off mentally while appearing to listen. Breaking
                through that barrier requires deliberate effort and creative approaches.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Interactive Techniques</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Show of Hands</p>
                    <p>&ldquo;Who has ever had a near-miss with manual handling?&rdquo; &mdash; gets
                      physical involvement. People who raise a hand are now mentally engaged.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Case Studies</p>
                    <p>Present a real scenario: &ldquo;A spark on another site did X. What went wrong?
                      What should he have done?&rdquo; &mdash; gets people thinking critically.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">&ldquo;What Would You Do?&rdquo;</p>
                    <p>Describe a situation and ask the team how they would handle it. No right or wrong
                      answer &mdash; just discussion. This reveals knowledge gaps and builds confidence.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Demonstrations</p>
                    <p>Get someone to demonstrate the correct technique, or show a piece of damaged
                      equipment. Physical props make abstract concepts tangible and memorable.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Vary the format</strong> from week to week. If every talk follows the same
                pattern, the brain learns to predict it and switches off. Alternate between
                presentation-style talks, team discussions, practical demonstrations, quiz-based
                sessions, and team-member-led talks.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Most Powerful Technique</p>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Get your team members to present.</strong> When an
                  experienced electrician delivers a five-minute talk on something they know well &mdash;
                  cable containment selection, isolation procedures, first-fix coordination &mdash; the
                  rest of the team listens differently. Peer-to-peer communication is often more credible
                  than top-down instruction. It also develops the presenter&rsquo;s leadership skills
                  and demonstrates trust.
                </p>
              </div>

              <p>
                Above all, make the talk <strong>relevant to today&rsquo;s work</strong>. A generic
                talk about slips, trips, and falls is far less impactful than &ldquo;Right, we&rsquo;ve
                got wet conditions on the second floor today because the roof isn&rsquo;t on yet. Here&rsquo;s
                what I need everyone to watch out for.&rdquo; Relevance creates urgency. Urgency creates attention.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Recording and Follow-Up */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Recording and Follow-Up
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is a <strong>legal requirement</strong> to keep records of toolbox talks. Under
                CDM 2015, duty holders must be able to demonstrate that workers have received
                information, instruction, and training appropriate to the work they are carrying out.
                Toolbox talk records are a primary piece of evidence for this.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What to Record</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Date and time</strong> of the toolbox talk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Topic covered</strong> and a brief summary of the key points discussed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Attendee names and signatures</strong> &mdash; confirms who received the information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Any actions raised</strong> &mdash; issues flagged, questions asked, follow-up items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Name of the presenter</strong> delivering the talk</span>
                  </li>
                </ul>
              </div>

              <p>
                Use the toolbox talk record to <strong>identify training needs</strong>. If a
                discussion reveals that several team members are unsure about isolation procedures,
                that is a training need that should be escalated. If someone raises a hazard you
                were not aware of, that is intelligence you need to act on.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Follow Up on Actions</p>
                </div>
                <p className="text-sm text-white/80">
                  The fastest way to destroy credibility is to raise actions in a toolbox talk and
                  then never follow up. <strong className="text-white">If you say you will sort it,
                  sort it.</strong> Report back at the next talk: &ldquo;Last week Steve raised the
                  issue with the scaffold access. I spoke to the scaffolder and it&rsquo;s been fixed.&rdquo;
                  This shows your team that their input matters and that toolbox talks lead to real change.
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
                Toolbox talks are the backbone of site communication and one of the most visible
                demonstrations of your leadership. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Purpose:</strong> Toolbox talks brief, educate, engage, and build team cohesion &mdash; they are the most regular leadership touchpoint on site</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Planning:</strong> Choose a relevant, timely topic. Structure with hook, key points (max 3), discussion, and actions. Keep to 10&ndash;15 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Delivery:</strong> Eye contact, use names, speak clearly, vary pace, use real examples. Never just read from a sheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Engagement:</strong> Vary format, use interactive techniques, involve team members as presenters, make it relevant to today&rsquo;s work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Records:</strong> Date, topic, key points, attendees, actions &mdash; legally required under CDM 2015</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Follow-up:</strong> Always follow up on actions raised. Report back at the next talk. This builds trust and credibility</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Toolbox Talk Checklist</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Topic is relevant to current or upcoming work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Key points limited to 3 maximum</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Opening hook prepared to grab attention</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Discussion questions planned</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Props or visual aids ready if needed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Record sheet prepared for signatures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Duration planned for 10&ndash;15 minutes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Previous action items reviewed for follow-up</span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Next:</strong> In Section 2, we move from
                  talking to listening. Active listening and asking the right questions are
                  fundamental leadership skills that determine whether your team truly communicates
                  or just exchanges words.
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
          title="Section 1 Knowledge Check"
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
            <Link to="../leadership-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-3-section-2">
              Next: Active Listening
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}