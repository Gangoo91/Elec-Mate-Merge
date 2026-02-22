import { ArrowLeft, Target, CheckCircle, BookOpen, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'grow-reality',
    question: 'In the GROW model, what is the purpose of the "Reality" stage?',
    options: [
      'To set a SMART goal for the mentee',
      'To explore where the learner is now, including current skills and obstacles',
      'To brainstorm all possible options without judgement',
      'To agree a specific commitment and timeline for action',
    ],
    correctIndex: 1,
    explanation:
      'The Reality stage explores the learner\u2019s current situation \u2014 their skill level, what is going well, what obstacles exist, and what has already been tried. This honest assessment grounds the conversation before moving to Options.',
  },
  {
    id: 'coaching-vs-mentoring',
    question: 'What is the key difference between coaching and mentoring?',
    options: [
      'Coaching is directive; mentoring is non-directive',
      'Coaching focuses on a specific skill or goal and is shorter-term; mentoring is a longer-term, holistic relationship',
      'Coaching requires a formal qualification; mentoring does not',
      'Coaching is only used for underperformance; mentoring is for high performers',
    ],
    correctIndex: 1,
    explanation:
      'Coaching tends to be shorter-term and focused on a specific skill, goal, or performance area. It is primarily non-directive, using questions to help the learner find their own answers. Mentoring is a longer-term, holistic relationship where the mentor shares their own experience and wisdom.',
  },
  {
    id: 'safety-critical-directing',
    question: 'When should a mentor use directive instruction rather than coaching?',
    options: [
      'When the mentee is a slow learner',
      'When the mentor is in a hurry',
      'When there is a safety-critical situation or immediate risk of harm',
      'When the mentee has more than two years of experience',
    ],
    correctIndex: 2,
    explanation:
      'Safety-critical situations always require directive instruction. If someone is about to do something dangerous, you tell them to stop \u2014 you do not ask a coaching question. Coaching is for development situations where there is time and space to explore.',
  },
];

const faqs = [
  {
    question: 'Can I use the GROW model if I have not had formal coaching training?',
    answer:
      'Yes. The GROW model is designed to be simple enough for anyone to use in everyday conversations. You do not need a formal coaching qualification to ask "What do you want to achieve?", "Where are you now?", "What are your options?", and "What will you do next?". However, formal training (such as ILM Level 2 or 3) will help you develop your skills further and give you a recognised qualification.',
  },
  {
    question: 'How long should a GROW coaching conversation take?',
    answer:
      'A GROW conversation can be as short as 5 minutes for a quick on-site check-in, or as long as 30\u201345 minutes for a more in-depth development discussion. The model is flexible \u2014 you do not have to spend equal time on each stage. In construction, many effective coaching conversations happen informally during the working day, perhaps during a tea break or while reviewing completed work.',
  },
  {
    question: 'Is it possible to be both a mentor and a coach to the same person?',
    answer:
      'Absolutely. In practice, most workplace mentors naturally move between mentoring, coaching, teaching, and instructing depending on the situation. You might coach an apprentice through a wiring problem using questions, then switch to directive instruction when you see them about to make a safety error. The key is knowing which approach fits the moment.',
  },
  {
    question: 'What ILM qualifications are available for coaching and mentoring?',
    answer:
      'The Institute of Leadership and Management (ILM) offers the Level 2 Award in Coaching and Mentoring (introductory, suitable for team leaders and mentors) and the Level 3 Certificate in Coaching and Mentoring (more advanced, suitable for supervisors and managers). Both qualifications are widely recognised across the UK construction industry and can support career progression into supervisory and management roles.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the "G" in the GROW model stand for?',
    options: ['Guidance', 'Goal', 'Growth', 'Group'],
    correctAnswer: 1,
    explanation:
      'G stands for Goal. The first stage of the GROW model involves establishing what the learner wants to achieve. Goals should be SMART \u2014 Specific, Measurable, Achievable, Relevant, and Time-bound.',
  },
  {
    id: 2,
    question: 'Who is credited with developing the GROW model in the 1980s?',
    options: [
      'Abraham Maslow',
      'David Kolb',
      'Sir John Whitmore, Graham Alexander, and Alan Fine',
      'Bruce Tuckman',
    ],
    correctAnswer: 2,
    explanation:
      'The GROW model was developed by Sir John Whitmore, Graham Alexander, and Alan Fine in the 1980s. Whitmore popularised it in his influential 1992 book "Coaching for Performance".',
  },
  {
    id: 3,
    question:
      'Which approach is MOST appropriate when an apprentice is about to make a dead circuit live without testing it first?',
    options: [
      'Use the GROW model to coach them through the situation',
      'Ask Socratic questions to help them discover the error themselves',
      'Give immediate directive instruction to stop what they are doing',
      'Wait until after the task is complete, then discuss it in a mentoring session',
    ],
    correctAnswer: 2,
    explanation:
      'Safety-critical situations always require directive instruction. You tell the person to stop immediately. Coaching is for development situations where there is no immediate risk of harm.',
  },
  {
    id: 4,
    question: 'In the GROW model, what happens during the "Options" stage?',
    options: [
      'The learner sets a SMART goal',
      'The mentor tells the learner exactly what to do',
      'The learner and mentor brainstorm possible actions without judgement',
      'The learner commits to a specific action plan',
    ],
    correctAnswer: 2,
    explanation:
      'The Options stage is about generating possibilities. The mentor encourages the learner to brainstorm as many options as they can without judging or filtering them. "What could you do?" and "What else?" are key questions at this stage.',
  },
  {
    id: 5,
    question: 'Which statement BEST describes mentoring as distinct from coaching?',
    options: [
      'Mentoring is always formal and scheduled; coaching is always informal',
      'Mentoring is a longer-term, holistic relationship where the mentor shares their experience',
      'Mentoring focuses only on technical skills; coaching covers personal development',
      'Mentoring is only for apprentices; coaching is for qualified electricians',
    ],
    correctAnswer: 1,
    explanation:
      'Mentoring is characterised by a longer-term, holistic relationship where the mentor draws on their own experience to guide the mentee\u2019s overall development. Coaching is typically shorter-term, focused on a specific skill or goal, and more non-directive.',
  },
  {
    id: 6,
    question: 'What does the "W" in GROW stand for?',
    options: ['Work', 'Will / Way Forward', 'Wisdom', 'Workplace'],
    correctAnswer: 1,
    explanation:
      'W stands for Will or Way Forward. This is the commitment stage where the learner decides exactly what they will do, by when, and what support they need. It turns discussion into action.',
  },
  {
    id: 7,
    question: 'Which Situational Leadership style corresponds to safety-critical instruction?',
    options: [
      'S1 \u2014 Directing (high task, low relationship)',
      'S2 \u2014 Coaching (high task, high relationship)',
      'S3 \u2014 Supporting (low task, high relationship)',
      'S4 \u2014 Delegating (low task, low relationship)',
    ],
    correctAnswer: 0,
    explanation:
      'S1 Directing is high task, low relationship \u2014 the leader gives clear, specific instructions. This is the appropriate style for safety-critical situations where there is no time for discussion and the learner must be told exactly what to do or stop doing.',
  },
  {
    id: 8,
    question: 'At which ILM level is the introductory Award in Coaching and Mentoring offered?',
    options: ['Level 1', 'Level 2', 'Level 4', 'Level 5'],
    correctAnswer: 1,
    explanation:
      'The ILM Level 2 Award in Coaching and Mentoring is the introductory qualification, suitable for team leaders, mentors, and those new to a coaching role. The Level 3 Certificate is the next step up for those wanting a more advanced qualification.',
  },
];

export default function MDModule2Section1() {
  useSEO({
    title: 'The GROW Model & Coaching Conversations | Mentoring Module 2.1',
    description:
      'Learn the GROW coaching model, the differences between mentoring, coaching, teaching, and instructing, when to coach and when to direct, and ILM coaching competencies.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <Target className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The GROW Model &amp; Coaching Conversations
          </h1>
          <p className="text-white max-w-xl mx-auto">
            A structured framework for coaching conversations, the differences between mentoring
            approaches, and when to coach versus when to direct on site
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-400 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>GROW:</strong> Goal, Reality, Options, Will/Way Forward &mdash; four
                    stages of a structured coaching conversation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Coach vs Direct:</strong> Use coaching for development; use directive
                    instruction for safety-critical situations.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Four approaches:</strong> Mentoring, coaching, teaching, and instructing
                    &mdash; know when each is appropriate.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Quick GROW:</strong> A five-minute coaching conversation during a tea
                    break can shift an apprentice&rsquo;s approach for the rest of the day.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Safety first:</strong> If someone is about to do something dangerous,
                    you tell them to stop. You do not ask a coaching question.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>ILM qualifications:</strong> Level 2 and Level 3 awards in Coaching and
                    Mentoring support career progression.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain the four stages of the GROW model and apply each stage in a coaching
                conversation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Distinguish between mentoring, coaching, teaching, and instructing and describe when
                each approach is most appropriate
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Recognise when to use coaching and when to use directive instruction, particularly
                in safety-critical situations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Conduct a structured GROW conversation with an apprentice or colleague on a
                construction site
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Link Situational Leadership styles to coaching and directing approaches in workplace
                mentoring
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe the ILM Level 2 and Level 3 coaching competencies and how they support
                career progression
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: The GROW Model */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">01</span>
              The GROW Model (Whitmore, 1980s)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The GROW model is one of the most widely used coaching frameworks in the world. It
                was developed in the 1980s by <strong>Sir John Whitmore</strong>,{' '}
                <strong>Graham Alexander</strong>, and <strong>Alan Fine</strong>. Whitmore
                popularised the model in his landmark 1992 book <em>Coaching for Performance</em>,
                which remains one of the most influential texts on coaching in the workplace.
              </p>
              <p>
                GROW provides a simple, memorable structure for any coaching conversation &mdash;
                from a five-minute chat on site to a formal development review. The four stages
                guide the conversation from identifying what the learner wants to achieve, through
                understanding their current situation, exploring options, and finally committing to
                specific action.
              </p>

              {/* Rose Framework Box: GROW Stages */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-rose-400 text-center text-sm uppercase tracking-wider">
                  The GROW Model
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">G</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Goal</h4>
                        <p className="text-white text-sm">
                          <strong>What do you want to achieve?</strong> Establish a clear, specific
                          goal for the conversation and for the learner&rsquo;s development. Goals
                          should be SMART &mdash; Specific, Measurable, Achievable, Relevant, and
                          Time-bound. Example: &ldquo;I want to be able to complete a safe isolation
                          procedure independently by the end of next week.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">R</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Reality</h4>
                        <p className="text-white text-sm">
                          <strong>What is happening now?</strong> Explore the learner&rsquo;s
                          current situation honestly. What is their current skill level? What have
                          they tried? What obstacles are they facing? What is going well? This stage
                          grounds the conversation in facts rather than assumptions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">O</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Options</h4>
                        <p className="text-white text-sm">
                          <strong>What could you do?</strong> Brainstorm possible actions without
                          judgement. Encourage creative thinking. &ldquo;What else?&rdquo; is the
                          most powerful question at this stage. The mentor resists the urge to jump
                          in with their own solution &mdash; the goal is for the learner to generate
                          their own ideas.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">W</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Will / Way Forward</h4>
                        <p className="text-white text-sm">
                          <strong>What will you do?</strong> The learner commits to a specific
                          action. What exactly will they do? When will they do it? What support do
                          they need? How will they know they have succeeded? This stage turns
                          discussion into concrete commitment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Construction Example: AM2 GROW Conversation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <BookOpen className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Worked Example: AM2 Preparation GROW Conversation
                </h3>
                <p className="text-white text-sm mb-3">
                  A mentor sits down with their apprentice who is preparing for the AM2 assessment.
                  Here is how the conversation might flow through the four GROW stages:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium mb-1">Goal</p>
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;So, your AM2 is in six weeks. What would you
                      like to focus on today?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I want to get my ring final circuit
                      installation time down. I keep running over.&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Mentor:</strong> &ldquo;Good. Can we make that more specific? What
                      time are you aiming for?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I want to complete the ring final circuit
                      within 90 minutes, tested and documented.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium mb-1">Reality</p>
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Where are you at the moment? How long is it
                      taking you?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;About two hours. I keep having to go back
                      and re-strip cables because my measurements are off.&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Mentor:</strong> &ldquo;What else is slowing you down?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I\u2019m spending too long on the testing.
                      I second-guess my continuity readings.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium mb-1">Options</p>
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;What could you do to improve your cable
                      preparation?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I could measure and cut all the cables
                      before I start installing. Or I could use a template.&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Mentor:</strong> &ldquo;Good ideas. What else?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I could practise the continuity test
                      sequence separately so I don\u2019t have to think about the steps during the
                      assessment.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <p className="text-rose-300 font-medium mb-1">Will / Way Forward</p>
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Which of those options will you commit to this
                      week?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I\u2019ll pre-cut all cables using a
                      template on Monday, and practise the continuity test sequence three times on
                      Wednesday. Then I\u2019ll do a full timed run on Friday.&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Mentor:</strong> &ldquo;Brilliant. I\u2019ll observe your Friday run
                      and we\u2019ll review how it went.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Notice how the mentor asks questions throughout rather than telling the apprentice
                what to do. The apprentice generates their own solutions and commits to specific
                actions. This is the essence of coaching &mdash; helping people find their own
                answers.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Mentoring, Coaching, Teaching, Instructing */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">02</span>
              Mentoring, Coaching, Teaching, and Instructing &mdash; What&rsquo;s the Difference?
            </h2>
            <div className="space-y-4 text-white">
              <p>
                These four approaches are often confused, but each has a distinct purpose. An
                effective mentor needs to understand all four and know when to switch between them.
                In the construction industry, you will use all four approaches on a regular basis,
                sometimes within the same conversation.
              </p>

              {/* Comparison Grid */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <h3 className="text-rose-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Four Approaches Compared
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-2">Mentoring</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Duration:</strong> Long-term relationship (months to years)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Focus:</strong> Holistic development, career, confidence
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Approach:</strong> Relationship-based, mentor shares experience
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Example:</strong> &ldquo;When I was preparing for my AM2, I found
                          that...&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-2">Coaching</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Duration:</strong> Shorter-term, specific to a goal or skill
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Focus:</strong> Performance improvement on a specific area
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Approach:</strong> Non-directive, questions over answers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Example:</strong> &ldquo;What do you think went wrong with that
                          circuit test?&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-2">Teaching</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Duration:</strong> Structured sessions or programmes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Focus:</strong> Knowledge transfer, theory, understanding
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Approach:</strong> Structured curriculum, formal delivery
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Example:</strong> &ldquo;The reason we use RCDs is
                          because...&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-2">Instructing</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Duration:</strong> Immediate, task-specific
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Focus:</strong> Step-by-step procedure, safety-critical tasks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Approach:</strong> Directive, tell-and-show, no ambiguity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          <strong>Example:</strong> &ldquo;Stop. Lock off, prove dead, then
                          proceed.&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  When to Use Each Approach
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Safety-critical tasks</strong> (safe isolation, live working, working
                      at height) &mdash; use <strong>instructing</strong>. There is no room for
                      ambiguity or exploration when someone&rsquo;s life is at risk.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>New knowledge or theory</strong> (regulations, circuit design
                      principles, cable calculations) &mdash; use <strong>teaching</strong>. The
                      learner does not yet have the knowledge to discover the answer themselves.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Specific skill improvement</strong> (faster terminations, better test
                      results, improved time management) &mdash; use <strong>coaching</strong>. The
                      learner has some existing knowledge and needs to develop it further.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Career development and overall growth</strong> (preparing for
                      qualifications, building confidence, navigating workplace challenges) &mdash;
                      use <strong>mentoring</strong>. The relationship and shared experience are the
                      primary tools.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: When to Coach and When to Direct */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">03</span>
              When to Coach and When to Direct
            </h2>
            <div className="space-y-4 text-white">
              <p>
                One of the most important skills a mentor can develop is knowing when to switch from
                coaching to directive instruction. Getting this wrong can be uncomfortable at best
                and dangerous at worst. The guiding principle is simple: if there is an immediate
                risk of harm, you direct. If there is time and space for development, you coach.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Principle</h3>
                <p className="text-white text-sm">
                  <strong>
                    If someone is about to do something dangerous, you tell them to stop. You do not
                    ask a coaching question.
                  </strong>{' '}
                  There is a time for open questions and reflection, and there is a time for clear,
                  direct instruction. Safety-critical situations always require the latter.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Example: When NOT to Coach
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white">
                    You are supervising an apprentice who is about to make a circuit live after
                    completing some wiring work. You notice they have not tested for dead before
                    energising.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-300 font-medium mb-1">Wrong approach (coaching):</p>
                    <p className="text-white">
                      &ldquo;What do you think you should do before you switch that on?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      This wastes precious seconds. The apprentice might give the wrong answer. The
                      circuit might already be energised.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-300 font-medium mb-1">Right approach (directing):</p>
                    <p className="text-white">
                      &ldquo;Stop. Do not switch that on. You have not proved dead. Lock off, test
                      with your voltage indicator, prove dead, then we can talk about what happens
                      next.&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      After the immediate danger has passed, you can use coaching to help the
                      apprentice understand why safe isolation is non-negotiable and how to build it
                      into their routine.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Situational Leadership and the Coaching Spectrum
                </h3>
                <p className="text-white text-sm mb-3">
                  Hersey and Blanchard&rsquo;s Situational Leadership model maps closely to the
                  coaching-directing spectrum. The appropriate leadership style depends on the
                  learner&rsquo;s readiness level:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>S1 Directing</strong> (high task, low relationship) &mdash; for
                      safety-critical situations and complete beginners who need clear, step-by-step
                      instruction. No ambiguity.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>S2 Coaching</strong> (high task, high relationship) &mdash; for
                      developing learners who have some skill but need guidance and encouragement.
                      Explain the &ldquo;why&rdquo; as well as the &ldquo;what&rdquo;.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>S3 Supporting</strong> (low task, high relationship) &mdash; for
                      capable learners who know what to do but may lack confidence. Use open
                      questions and encouragement.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>S4 Delegating</strong> (low task, low relationship) &mdash; for
                      competent, confident individuals who can be trusted to work independently.
                      Monitor outcomes, not processes.
                    </div>
                  </li>
                </ul>
              </div>

              <p>
                The key insight is that a mentor should not use a single style for every situation.
                You might use S1 Directing when an apprentice is working near live parts, S2
                Coaching when they are learning a new termination technique, S3 Supporting when they
                are completing work they have done before but feel uncertain about, and S4
                Delegating when they are confidently working on tasks within their competence.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: ILM Coaching Competencies */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">04</span>
              ILM Level 2/3 Coaching Competency Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Institute of Leadership and Management (ILM) offers nationally recognised
                qualifications in coaching and mentoring. These qualifications demonstrate your
                competence as a mentor and can support career progression into supervisory and
                management roles within the electrical industry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Award className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  ILM Level 2 Award in Coaching and Mentoring
                </h3>
                <p className="text-white text-sm mb-3">
                  This is the introductory qualification, suitable for team leaders, workplace
                  mentors, and anyone new to a formal coaching role. It covers:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Understanding the role of the coach and mentor in the workplace</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Establishing rapport and building trust with learners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Using coaching models (including GROW) in structured conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Active listening and questioning skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Reviewing progress and setting development goals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Award className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  ILM Level 3 Certificate in Coaching and Mentoring
                </h3>
                <p className="text-white text-sm mb-3">
                  This is a more advanced qualification, suitable for supervisors, managers, and
                  experienced mentors who want to deepen their skills. It builds on Level 2 and
                  adds:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Understanding organisational context for coaching and mentoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Planning and delivering coaching and mentoring sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Managing the coaching relationship over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>Reflecting on and improving your own coaching practice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      Understanding the ethical and professional responsibilities of a coach/mentor
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">
                  How Mentoring Competence Supports Career Progression
                </h3>
                <p className="text-white text-sm mb-3">
                  In the electrical industry, the ability to develop others is increasingly
                  recognised as a core competency for career progression. Demonstrating coaching and
                  mentoring skills can support your move into:
                </p>
                <ul className="text-white text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Site supervisor</strong> roles, where developing apprentices and
                      trainees is part of the job description
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Contracts manager</strong> positions, where leading and developing
                      teams is essential
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Training assessor</strong> roles with training providers or colleges
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Internal quality assurance</strong> (IQA) roles for apprenticeship
                      programmes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Remember</h3>
                <p className="text-white text-sm">
                  You do not need a formal qualification to be an effective mentor. Many of the best
                  mentors in the construction industry have developed their skills through
                  experience and practice. However, if you want to formalise your skills and gain a
                  recognised credential, the ILM Level 2 Award is an excellent starting point that
                  can be completed alongside your day job.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-2-section-2">
              Next: Questioning Techniques &amp; Active Listening
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
