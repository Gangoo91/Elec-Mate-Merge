import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, GraduationCap, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "lead-apprentice-kolb",
    question: "In Kolb's Learning Cycle, what are the four stages of learning?",
    options: [
      "Read, Write, Test, Pass",
      "Concrete Experience, Reflective Observation, Abstract Conceptualisation, Active Experimentation",
      "Watching, Listening, Reading, Doing",
      "Planning, Doing, Checking, Acting"
    ],
    correctIndex: 1,
    explanation: "Kolb's Learning Cycle has four stages: (1) Concrete Experience — doing the task, (2) Reflective Observation — thinking about what happened, (3) Abstract Conceptualisation — understanding the theory, and (4) Active Experimentation — trying a new approach. Effective mentors guide apprentices through all four stages rather than focusing on just one."
  },
  {
    id: "lead-apprentice-7020",
    question: "According to the 70-20-10 model, where does the majority of workplace learning happen?",
    options: [
      "In the classroom (formal training courses)",
      "From reading textbooks and online resources",
      "On the job through hands-on experience (70%)",
      "Through annual appraisals and performance reviews"
    ],
    correctIndex: 2,
    explanation: "The 70-20-10 model shows that 70% of learning happens on the job through hands-on experience, 20% from others (mentoring, feedback, observation), and only 10% from formal training (courses, qualifications). This means the supervisor and mentor have a far greater impact on an apprentice's development than their college."
  },
  {
    id: "lead-apprentice-retention",
    question: "Research shows that the NUMBER ONE reason apprentices leave the electrical trade is:",
    options: [
      "The pay is too low compared to other careers",
      "The college work is too difficult to complete",
      "A poor relationship with their supervisor or mentor",
      "They do not enjoy working outdoors in bad weather"
    ],
    correctIndex: 2,
    explanation: "Research consistently shows that the number one reason apprentices leave the trade is a poor relationship with their supervisor or mentor. The supervisor has more influence on apprentice retention than the college, the employer, or the pay. Being a supportive, patient, and encouraging mentor is one of the most impactful things a supervisor can do."
  }
];

const faqs = [
  {
    question: "How much independence should I give an apprentice?",
    answer: "This depends entirely on the apprentice's stage of development and demonstrated competence. In their first year, they should be closely supervised with clear instructions and regular check-ins. As they gain skill and confidence, gradually increase independence — let them plan small tasks, make decisions (with a safety net), and work with less direct oversight. The key is progressive autonomy: challenge them enough to grow, but not so much that they fail dangerously. Always consider the safety implications — some tasks (working live, working at height, complex terminations) require competent supervision regardless of the apprentice's stage. Use the situational leadership model from Module 2: direct early on, coach as they develop, support as they gain confidence, and delegate when they are competent."
  },
  {
    question: "What should I do if an apprentice keeps making the same mistake?",
    answer: "First, consider whether you are teaching effectively. Are you explaining the 'why' as well as the 'how'? Are you using a method that suits their learning style? Some people learn by watching, some by doing, some by reading. Try a different approach. Second, check whether the mistake is skill-based (they do not know how), rule-based (they know but forget), or motivational (they know but do not care). Each requires a different response. Third, break the task into smaller steps and check understanding at each stage. Fourth, be patient — some skills take time and repetition to master. Finally, if the issue persists despite multiple approaches, have an honest conversation about what support they need. Never resort to humiliation or shouting — this destroys confidence and the learning relationship."
  },
  {
    question: "How do I balance mentoring with getting the job done?",
    answer: "This is one of the biggest challenges for supervising electricians. The reality is that mentoring IS part of the job — developing competent electricians is a core business need, not a distraction from 'real work.' Some practical strategies: build teaching moments into the daily work rather than treating them as separate activities. While pulling cables, explain why you chose that route. While terminating, explain the regulation. Pair apprentices with experienced electricians for specific tasks. Use travel time and quiet moments for discussion. Accept that an apprentice working alongside you will slow you down initially — but within months, they become an extra pair of hands that speeds you up. The investment pays for itself."
  },
  {
    question: "What qualifications and milestones should an electrical apprentice be working towards?",
    answer: "A typical electrical apprentice in the UK works towards: the NVQ Level 3 in Electrotechnical Services (the practical competence qualification), the EAL or City & Guilds diploma (the knowledge qualification), the AM2 assessment (the end-point assessment proving competence to JIB standards), the BS 7671 18th Edition qualification (Wiring Regulations), and a CSCS/ECS card. Beyond formal qualifications, set development goals around: technical skills (installing a consumer unit independently, completing test and inspection), professional skills (leading a toolbox talk, writing a risk assessment), and personal skills (time management, communication, working with other trades). Review progress monthly at minimum."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The UK construction industry faces a skills shortage in electrical installation because:",
    options: [
      "Electricity is being phased out in favour of renewable alternatives",
      "Thousands of electricians will retire in the next decade and recruitment is not keeping pace",
      "Apprenticeships have been banned by the government",
      "There are too many qualified electricians and not enough work"
    ],
    correctAnswer: 1,
    explanation: "JIB and CITB data shows thousands of electricians will retire in the next decade while recruitment is not keeping pace. This makes developing apprentices critically important for the future of the industry. Every apprentice a supervisor develops is an investment in the industry's future capacity."
  },
  {
    id: 2,
    question: "Kolb's Learning Cycle suggests that effective learning involves:",
    options: [
      "Only reading textbooks and passing written exams",
      "Cycling through experience, reflection, understanding theory, and experimentation",
      "Watching YouTube videos about electrical installation",
      "Attending a one-day training course and receiving a certificate"
    ],
    correctAnswer: 1,
    explanation: "Kolb's Learning Cycle involves four stages: Concrete Experience (doing), Reflective Observation (thinking about what happened), Abstract Conceptualisation (understanding the theory), and Active Experimentation (trying a new approach). Effective mentors guide apprentices through all four stages to embed deep learning."
  },
  {
    id: 3,
    question: "The 70-20-10 model tells us that the largest proportion of workplace learning comes from:",
    options: [
      "Formal training courses and qualifications (10%)",
      "Learning from others through mentoring and feedback (20%)",
      "On-the-job experience through hands-on work (70%)",
      "Self-directed study using books and online resources"
    ],
    correctAnswer: 2,
    explanation: "The 70-20-10 model shows that 70% of learning happens on the job through hands-on experience. This means that the quality of on-site mentoring and supervision has a far greater impact on an apprentice's development than their college training (which falls within the 10% formal training category)."
  },
  {
    id: 4,
    question: "Mentoring is different from teaching because mentoring involves:",
    options: [
      "Standing at a whiteboard and lecturing for an hour",
      "Guiding, supporting, and helping someone find their own answers rather than always giving them yours",
      "Only covering technical topics from the NVQ syllabus",
      "Writing formal reports about the apprentice's performance"
    ],
    correctAnswer: 1,
    explanation: "Mentoring is about guiding, supporting, and developing — helping someone find their own answers rather than always providing yours. Key mentoring skills include patience, active listening, asking good questions, sharing experience (not lecturing), setting appropriate challenges, and providing psychological safety to make mistakes."
  },
  {
    id: 5,
    question: "The GROW model (from Module 2) can be used in mentoring conversations. GROW stands for:",
    options: [
      "Get Ready, Observe, Work, Learn",
      "Goal, Reality, Options, Will (or Way Forward)",
      "Grade, Review, Observe, Write",
      "Guidance, Reflection, Outcome, Willingness"
    ],
    correctAnswer: 1,
    explanation: "GROW stands for Goal (what do you want to achieve?), Reality (where are you now?), Options (what could you do?), and Will/Way Forward (what will you do?). It provides a structured framework for mentoring conversations that helps the apprentice develop their own thinking and problem-solving skills."
  },
  {
    id: 6,
    question: "SMART development goals should be:",
    options: [
      "Secret, Measured, Attractive, Radical, Temporary",
      "Simple, Modern, Achievable, Rapid, Technological",
      "Specific, Measurable, Achievable, Relevant, Time-bound",
      "Strict, Mandatory, Assessed, Required, Tested"
    ],
    correctAnswer: 2,
    explanation: "SMART goals are Specific (clearly defined), Measurable (you can track progress), Achievable (challenging but realistic), Relevant (connected to the apprentice's development needs), and Time-bound (with a clear deadline). Setting SMART goals helps apprentices understand exactly what they are working towards and when."
  },
  {
    id: 7,
    question: "Research shows the number one reason apprentices leave the electrical trade is:",
    options: [
      "Insufficient pay during the apprenticeship period",
      "The difficulty of the college exams and coursework",
      "A poor relationship with their supervisor or mentor",
      "Lack of access to modern tools and equipment"
    ],
    correctAnswer: 2,
    explanation: "Research consistently identifies a poor relationship with the supervisor/mentor as the number one reason apprentices leave the trade. The supervisor has more influence on retention than the college, the employer, or the pay. Being supportive, patient, and encouraging is one of the most impactful things a supervisor can do for the industry."
  },
  {
    id: 8,
    question: "When setting development goals for an apprentice, goals should cover:",
    options: [
      "Only the technical skills needed to pass the NVQ",
      "Only health and safety topics as required by law",
      "Technical skills, professional skills, personal skills, and qualifications",
      "Only the topics covered in their college course"
    ],
    correctAnswer: 2,
    explanation: "Development goals should cover four areas: technical skills (install a consumer unit independently), professional skills (lead a toolbox talk, communicate with clients), personal skills (manage time effectively, work as part of a team), and qualifications (AM2, 18th Edition). A well-rounded development plan produces a well-rounded electrician."
  }
];

export default function LeadershipModule5Section4() {
  useSEO({
    title: "Supporting Apprentices and New Starters | Leadership Module 5.4",
    description: "How to develop the next generation of electricians — learning theory, effective mentoring, SMART goals, and the supervisor's impact on apprentice retention.",
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
            <Link to="../leadership-module-5-section-3">
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
            <GraduationCap className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Supporting Apprentices and New Starters
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Why developing the next generation matters, how people learn, mentoring effectively, setting development goals, and the enormous impact you have on retention
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Skills shortage:</strong> Thousands of electricians retiring; recruitment lagging</li>
              <li><strong>70-20-10:</strong> 70% of learning happens on the job, not in college</li>
              <li><strong>Mentoring:</strong> Guide, support, develop &mdash; not lecture</li>
              <li><strong>Retention:</strong> Poor supervision is the #1 reason apprentices leave</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Frameworks</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Kolb&rsquo;s Cycle:</strong> Experience &rarr; Reflect &rarr; Conceptualise &rarr; Experiment</li>
              <li><strong>GROW model:</strong> Goal, Reality, Options, Will</li>
              <li><strong>SMART goals:</strong> Specific, Measurable, Achievable, Relevant, Time-bound</li>
              <li><strong>Be the supervisor:</strong> You wished you had had</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why developing apprentices is critical for the UK electrical industry",
              "Describe Kolb's Learning Cycle and the 70-20-10 model of workplace learning",
              "Apply effective mentoring techniques using the GROW model",
              "Set SMART development goals that go beyond passing the NVQ",
              "Understand the supervisor's disproportionate impact on apprentice retention",
              "Create a supportive learning environment with psychological safety"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Developing the Next Generation Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Developing the Next Generation Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The UK construction industry faces a <strong>massive skills shortage</strong>. JIB and
                CITB data consistently shows that thousands of electricians will retire in the next decade,
                and recruitment is not keeping pace. The demand for electrical skills is actually
                <strong> increasing</strong> &mdash; driven by the green energy transition, electric vehicle
                charging infrastructure, smart buildings, and the electrification of heating systems.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">The Industry Challenge</p>
                <p className="text-base text-white leading-relaxed">
                  Every apprentice you develop today is an <strong>investment in the industry&rsquo;s
                  future</strong>. As a leader, developing people is one of the most important things you
                  will ever do. The electrician you mentor today may supervise their own team in five years.
                  They may run their own company in ten. The standards, values, and skills you instil now
                  will ripple through the industry for decades.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Why It Matters to You Personally</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Productivity:</strong> A well-trained apprentice becomes a valuable team member who increases your team&rsquo;s output within months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Reputation:</strong> Being known as someone who develops good electricians enhances your professional reputation and career prospects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Satisfaction:</strong> Watching someone you mentored grow into a competent, confident electrician is one of the most rewarding experiences in the trade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Legacy:</strong> Your skills, knowledge, and standards live on through the people you develop. This is how craftsmanship is passed down through generations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Numbers Are Stark</p>
                </div>
                <p className="text-sm text-white/80">
                  CITB research estimates the UK construction industry needs to recruit approximately
                  225,000 new workers by 2027 just to meet demand. The electrification of transport,
                  heating, and energy systems means demand for qualified electricians is growing faster
                  than almost any other trade. Without effective apprentice development, the industry
                  simply cannot deliver the projects the country needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: How People Learn */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            How People Learn
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not everyone learns the same way. Understanding <strong>how</strong> people learn makes
                you a far more effective mentor and supervisor. Two key frameworks help explain workplace
                learning: <strong>Kolb&rsquo;s Learning Cycle</strong> and the <strong>70-20-10 model</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Kolb&rsquo;s Learning Cycle</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">1</p>
                    <p className="text-white font-medium text-xs mt-1">Concrete Experience</p>
                    <p className="text-white/80 text-xs mt-1">Doing the task &mdash; hands-on practical work</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">2</p>
                    <p className="text-white font-medium text-xs mt-1">Reflective Observation</p>
                    <p className="text-white/80 text-xs mt-1">Thinking about what happened and why</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">3</p>
                    <p className="text-white font-medium text-xs mt-1">Abstract Conceptualisation</p>
                    <p className="text-white/80 text-xs mt-1">Understanding the theory behind the practice</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">4</p>
                    <p className="text-white font-medium text-xs mt-1">Active Experimentation</p>
                    <p className="text-white/80 text-xs mt-1">Trying a new or improved approach</p>
                  </div>
                </div>
              </div>

              <p>
                Some people learn best by watching (reflective observers), some by doing (active
                experimenters), some by reading and understanding the theory (abstract conceptualisers).
                Good mentors adapt their approach to the individual. If an apprentice is struggling with
                a concept, try explaining it differently &mdash; show them rather than telling them, or
                let them try it rather than just watching.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Applying Kolb in Practice</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 1 &mdash; Let them do it:</strong> Give the apprentice a task appropriate to their level. Let them attempt it (with appropriate supervision for safety).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 2 &mdash; Help them reflect:</strong> Ask &ldquo;How did that go? What was difficult? What went well?&rdquo; Do not just tell them what they did wrong.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 3 &mdash; Explain the theory:</strong> Now connect the practice to the theory. &ldquo;The reason we do it this way is because BS 7671 requires...&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Step 4 &mdash; Let them try again:</strong> Armed with new understanding, let them try the task again. This time, they will approach it with more knowledge and confidence.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The 70-20-10 Model</p>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm mt-3">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">70%</p>
                    <p className="text-white text-xs font-medium mt-1">On the Job</p>
                    <p className="text-white/80 text-xs mt-1">Hands-on experience, doing real work</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">20%</p>
                    <p className="text-white text-xs font-medium mt-1">From Others</p>
                    <p className="text-white/80 text-xs mt-1">Mentoring, feedback, observation</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-rose-400">10%</p>
                    <p className="text-white text-xs font-medium mt-1">Formal Training</p>
                    <p className="text-white/80 text-xs mt-1">College, courses, qualifications</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mt-3">
                  This means <strong className="text-white">you</strong> &mdash; the supervisor on site
                  &mdash; have a far greater impact on the apprentice&rsquo;s development than their college.
                  Ninety per cent of their learning happens outside the classroom, through the work you
                  assign them and the mentoring you provide.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Mentoring Effectively */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Mentoring Effectively
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mentoring is <strong>not</strong> the same as teaching. Teaching is transferring knowledge.
                Mentoring is guiding, supporting, and developing &mdash; helping someone find their own
                answers rather than always giving them yours. The best mentors ask more questions than
                they give answers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Mentoring Skills</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Patience</strong> &mdash; everyone was a beginner once, including you. Allow time for learning and accept that mistakes are part of the process.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Active listening</strong> &mdash; listen to understand, not just to respond. Pay attention to what the apprentice is really telling you about their struggles and needs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Asking good questions</strong> &mdash; instead of &ldquo;Do it this way,&rdquo; try &ldquo;Why do you think we do it this way?&rdquo; or &ldquo;What would happen if we did it differently?&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Sharing experience</strong> &mdash; tell stories from your own career, including mistakes you made. This is mentoring, not lecturing. It builds trust and shows you are human.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Setting appropriate challenges</strong> &mdash; stretch them just beyond their comfort zone. Too easy and they get bored; too hard and they lose confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Psychological safety</strong> &mdash; create an environment where mistakes are learning opportunities, not reasons for humiliation. An apprentice who is afraid to ask questions stops learning.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Using the GROW Model for Mentoring</p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  The GROW model (from Module 2) works brilliantly for structured mentoring conversations:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-rose-400">G</p>
                    <p className="text-white text-xs font-medium">Goal</p>
                    <p className="text-white/80 text-xs">What do you want to achieve?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-rose-400">R</p>
                    <p className="text-white text-xs font-medium">Reality</p>
                    <p className="text-white/80 text-xs">Where are you now?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-rose-400">O</p>
                    <p className="text-white text-xs font-medium">Options</p>
                    <p className="text-white/80 text-xs">What could you do?</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-rose-400">W</p>
                    <p className="text-white text-xs font-medium">Will</p>
                    <p className="text-white/80 text-xs">What will you do?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Setting Development Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Setting Development Goals
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Work with your apprentice to set <strong>SMART development goals</strong> that go beyond
                simply &ldquo;finish the NVQ.&rdquo; A well-rounded development plan produces a
                well-rounded electrician who is ready for the demands of the modern industry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Four Areas of Development</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Technical Skills</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Install a consumer unit independently</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Complete a full test and inspection schedule</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Diagnose and repair a common fault independently</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Professional Skills</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Lead a toolbox talk for the team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Communicate professionally with clients</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Write a clear, accurate risk assessment</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Personal Skills</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Manage time effectively across multiple tasks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Work effectively as part of a team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Take initiative and solve problems proactively</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 text-xs font-semibold mb-1">Qualifications</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>AM2 end-point assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>BS 7671 18th Edition qualification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>ECS/CSCS card at the appropriate level</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Review progress <strong>regularly</strong> &mdash; monthly at minimum. Do not wait for the
                formal college review. Have informal check-in conversations: &ldquo;How are you getting on
                with X?&rdquo; &ldquo;What have you found challenging this week?&rdquo; &ldquo;What do you
                want to learn next?&rdquo; And <strong>celebrate achievements</strong>. When an apprentice
                completes a challenging task independently for the first time, acknowledge it. Recognition
                is a powerful motivator.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">SMART Goals Example</p>
                </div>
                <p className="text-sm text-white/80">
                  Instead of: &ldquo;Get better at testing.&rdquo; Use: &ldquo;By the end of March,
                  independently complete a full EICR test schedule for a single-phase domestic consumer
                  unit, including insulation resistance, earth fault loop impedance, RCD tests, and
                  ring final circuit continuity, achieving accurate results within 10% of the expected
                  values.&rdquo; This is <strong className="text-white">Specific</strong> (defines the
                  exact task), <strong className="text-white">Measurable</strong> (accurate results),
                  <strong className="text-white"> Achievable</strong> (appropriate to their stage),
                  <strong className="text-white"> Relevant</strong> (core electrical skill), and
                  <strong className="text-white"> Time-bound</strong> (by end of March).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: The Supervisor's Impact on Apprentice Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Supervisor&rsquo;s Impact on Apprentice Retention
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Research consistently shows that the <strong>number one reason apprentices leave the
                trade</strong> is a poor relationship with their supervisor or mentor. Not the pay. Not
                the college work. Not the weather. <strong>You.</strong>
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Your Influence Is Disproportionate</p>
                </div>
                <p className="text-sm text-white/80">
                  You have more influence on whether an apprentice stays or goes than anyone else &mdash;
                  more than their college, more than their employer, more than their pay. A supportive,
                  patient, encouraging supervisor can sustain an apprentice through the toughest times. A
                  dismissive, impatient, or hostile supervisor can drive even the most talented apprentice
                  out of the industry forever.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Drives Apprentices Away</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Being treated as cheap labour</strong> &mdash; only given labouring tasks, never taught, never developed. The apprentice feels used rather than valued.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Public humiliation for mistakes</strong> &mdash; being shouted at, mocked, or belittled in front of others. This destroys confidence and creates fear.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Lack of interest or engagement</strong> &mdash; a supervisor who does not take time to explain, answer questions, or show interest in the apprentice&rsquo;s development.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Bullying and hostile environments</strong> &mdash; &ldquo;banter&rdquo; that crosses the line into harassment, exclusion, or intimidation. This is unacceptable regardless of &ldquo;how things used to be.&rdquo;</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Be the Supervisor You Wished You Had Had</p>
                </div>
                <p className="text-sm text-white/80">
                  Think back to your own apprenticeship. If you had a great mentor, pass on that gift.
                  If you had a terrible one, make sure nobody under your supervision has the same experience.
                  Every apprentice who leaves the trade because of poor supervision is a failure of
                  leadership &mdash; and a loss the industry cannot afford.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Makes Apprentices Stay</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Being given real work</strong> &mdash; not just sweeping up and making tea. Apprentices who do meaningful electrical work feel valued and engaged.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Having a patient mentor</strong> &mdash; someone who explains things clearly, answers questions without irritation, and remembers what it was like to be new.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Feeling part of the team</strong> &mdash; included in conversations, invited to social events, treated as a colleague rather than a burden.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Seeing a clear path forward</strong> &mdash; understanding what they are working towards, with regular progress reviews and achievable milestones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong className="text-white">Being respected as a person</strong> &mdash; no bullying, no humiliation, no &ldquo;that&rsquo;s how I was treated so that&rsquo;s how you get treated&rdquo; mentality.</span>
                  </li>
                </ul>
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
                Supporting apprentices and new starters is not a side task &mdash; it is one of the most
                important things you will do as a supervisor and leader. The key points from this section
                are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Skills shortage:</strong> The UK electrical industry faces a critical shortage. Every apprentice you develop is an investment in the future of the trade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">How people learn:</strong> Kolb&rsquo;s Learning Cycle shows learning happens through experience, reflection, theory, and experimentation. The 70-20-10 model shows 90% of learning happens outside the classroom.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Mentor, do not lecture:</strong> Guide, support, and ask questions. Use the GROW model. Create psychological safety. Share your experience, including your mistakes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Set SMART goals:</strong> Cover technical, professional, personal, and qualification goals. Review monthly. Celebrate achievements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">You determine retention:</strong> A poor supervisor relationship is the number one reason apprentices leave. Your influence is greater than college, employer, or pay.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Be the supervisor you wished you had had:</strong> Patient, encouraging, supportive, and invested in your apprentice&rsquo;s success.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Congratulations</strong> &mdash; you have completed
                  Module 5 of the Leadership on Site course. You now have a comprehensive understanding of
                  planning and organising work, managing subcontractors, health and safety leadership, and
                  developing apprentices. These are the practical skills that define effective site
                  supervision. When you are ready, proceed to Module 6 for the <strong>Mock Exam</strong>
                  &mdash; your chance to test your knowledge across all five modules.
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
          title="Section 4 Knowledge Check"
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
            <Link to="../leadership-module-5-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../leadership-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
