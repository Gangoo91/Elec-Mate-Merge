import {
  ArrowLeft,
  Handshake,
  CheckCircle,
  Shield,
  FileText,
  Heart,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'relationship-stages',
    question: 'What are the four stages of the mentoring relationship lifecycle?',
    options: [
      'Planning, Delivery, Assessment, Completion',
      'Forming, Establishing, Developing, Closing',
      'Introduction, Growth, Maturity, Decline',
      'Goal, Reality, Options, Will',
    ],
    correctIndex: 1,
    explanation:
      'The mentoring relationship lifecycle has four stages: Forming (getting to know each other and agreeing expectations), Establishing (building rapport and trust), Developing (the main working phase where growth occurs), and Closing (winding down, celebrating achievement, and planning the future).',
  },
  {
    id: 'psychological-safety',
    question: 'What does psychological safety mean in a mentoring context?',
    options: [
      'Ensuring the mentee has access to mental health support',
      'The mentee feels safe to admit mistakes, ask questions, and say "I don\u2019t know" without fear of punishment or ridicule',
      'The mentor is trained in first aid for mental health',
      'Keeping all conversations strictly about technical topics',
    ],
    correctIndex: 1,
    explanation:
      'Psychological safety (Amy Edmondson, 1999) means that the mentee feels safe to take interpersonal risks \u2014 admitting errors, asking for help, and saying "I don\u2019t understand" \u2014 without fear of being judged, punished, or ridiculed. This is essential for learning and development.',
  },
  {
    id: 'must-report',
    question:
      'Which of the following MUST be reported even if the mentee asks you to keep it confidential?',
    options: [
      'The mentee is struggling with a wiring technique',
      'The mentee is thinking about leaving the trade',
      'The mentee has witnessed unsafe live working that puts people at risk',
      'The mentee is worried about an upcoming assessment',
    ],
    correctIndex: 2,
    explanation:
      'While most mentoring conversations are confidential, there are clear boundaries. Anything that involves safety risk, safeguarding concerns, or illegal activity must be reported through the appropriate channels. Unsafe live working is a serious safety concern that must be escalated, regardless of the mentee\u2019s request for confidentiality.',
  },
];

const faqs = [
  {
    question: 'How do I build trust with a mentee who is reluctant to open up?',
    answer:
      'Start with low-stakes conversations \u2014 ask about their interests, their background, what they enjoy about the trade. Share something about your own journey, including your own early mistakes. Demonstrate consistency: if you say you will do something, do it. Be reliable, be on time, and follow through. Trust is built in small increments over time, not in a single conversation. Some people take longer to open up than others \u2014 be patient and do not force it.',
  },
  {
    question: 'What should a mentoring agreement include?',
    answer:
      'A good mentoring agreement covers: how often you will meet (weekly, fortnightly, monthly), where you will meet, what the mentee wants to achieve (goals), how you will communicate between meetings, confidentiality boundaries (what stays private, what must be reported), and a review date to check how the relationship is working. It does not need to be a formal document \u2014 it can be a conversation that you both summarise and agree on.',
  },
  {
    question: 'What do I do if my mentee discloses something that I am not equipped to handle?',
    answer:
      'Listen, acknowledge what they have said, and be honest that this is beyond your expertise. Say something like: "I\u2019m glad you felt able to tell me. This is important, and I want to make sure you get the right support. Let me help you find the right person to talk to." For mental health concerns, signpost them to their GP, the employer\u2019s EAP (Employee Assistance Programme), or a relevant charity. For safeguarding or safety concerns, report through the appropriate channel. You do not need to be an expert in everything \u2014 knowing your limits is a strength.',
  },
  {
    question: 'How do I end a mentoring relationship when the time is right?',
    answer:
      'Ending well is as important as starting well. Review what has been achieved against the original goals. Celebrate progress and growth. Discuss what the mentee will do next and how they will continue their development. If the mentee has progressed to the point where they no longer need your guidance, that is a success, not a failure. Leave the door open for future contact. Some mentoring relationships evolve into peer relationships over time, which is a positive outcome.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the first stage of the mentoring relationship lifecycle?',
    options: ['Developing', 'Establishing', 'Forming', 'Closing'],
    correctAnswer: 2,
    explanation:
      'The first stage is Forming \u2014 where the mentor and mentee get to know each other, discuss expectations, agree ground rules, and begin building rapport. This stage sets the foundation for everything that follows.',
  },
  {
    id: 2,
    question: 'Who coined the term "psychological safety" in the context of teams and learning?',
    options: ['Sir John Whitmore', 'Amy Edmondson', 'David Kolb', 'Abraham Maslow'],
    correctAnswer: 1,
    explanation:
      'Amy Edmondson, a professor at Harvard Business School, published her foundational research on psychological safety in 1999. She defined it as a shared belief that the team is safe for interpersonal risk-taking, including admitting mistakes and asking for help.',
  },
  {
    id: 3,
    question: 'Which of the following is an example of role modelling as a mentor?',
    options: [
      'Telling the apprentice that safe isolation is important',
      'Always performing safe isolation yourself, even for quick jobs, so the apprentice sees it as standard practice',
      'Giving the apprentice a copy of GN3',
      'Asking the apprentice to write a procedure for safe isolation',
    ],
    correctAnswer: 1,
    explanation:
      'Role modelling means demonstrating the behaviour you want to see. "Do as I do" is more powerful than "do as I say." If a mentor always performs safe isolation \u2014 even for a quick job that would take five seconds without it \u2014 the apprentice learns that it is non-negotiable, not optional.',
  },
  {
    id: 4,
    question: 'What should you do if a mentee tells you they have witnessed unsafe live working?',
    options: [
      'Keep it confidential as they requested',
      'Tell the mentee to report it themselves and take no further action',
      'Report it through the appropriate safety channel \u2014 this overrides confidentiality',
      'Discuss it at the next team meeting without naming the mentee',
    ],
    correctAnswer: 2,
    explanation:
      'Safety concerns always override confidentiality. Unsafe live working puts lives at risk and must be reported through the appropriate channel (site manager, safety officer, or directly via the company\u2019s reporting system). Explain to the mentee why you are reporting it and support them through the process.',
  },
  {
    id: 5,
    question: 'Why is a mentoring agreement important?',
    options: [
      'It is a legal requirement under the Health and Safety at Work Act',
      'It sets clear expectations, boundaries, and goals so both parties know what to expect',
      'It protects the mentor from liability if the mentee fails an assessment',
      'It is required for ILM Level 2 accreditation only',
    ],
    correctAnswer: 1,
    explanation:
      'A mentoring agreement sets clear expectations for both parties \u2014 frequency of meetings, goals, confidentiality boundaries, and how the relationship will be reviewed. This clarity prevents misunderstandings and ensures both mentor and mentee are committed to the process.',
  },
  {
    id: 6,
    question: 'In the "Forming" stage of the mentoring relationship, the priority is to:',
    options: [
      'Start coaching immediately on technical skills',
      'Assess the mentee\u2019s weaknesses and create a remediation plan',
      'Get to know each other, agree expectations, and begin building rapport',
      'Set formal SMART goals and agree a contract',
    ],
    correctAnswer: 2,
    explanation:
      'The Forming stage is about building the foundation. Getting to know each other, understanding the mentee\u2019s aspirations, agreeing how you will work together, and beginning to build trust. Rushing into technical coaching before rapport is established often leads to a weaker relationship.',
  },
  {
    id: 7,
    question:
      'Which of the following BEST demonstrates psychological safety in a mentoring relationship?',
    options: [
      'The mentor never gives negative feedback to avoid upsetting the mentee',
      'The mentee feels comfortable saying "I made a mistake on that circuit and I need help"',
      'The mentor and mentee avoid discussing difficult topics',
      'The mentee always agrees with the mentor to avoid conflict',
    ],
    correctAnswer: 1,
    explanation:
      'Psychological safety means the mentee can admit mistakes, ask for help, and say "I don\u2019t know" without fear of judgement. It does not mean avoiding difficult conversations or withholding constructive feedback \u2014 it means creating an environment where honesty is safe and valued.',
  },
  {
    id: 8,
    question: 'What does "do as I do is more powerful than do as I say" mean for mentors?',
    options: [
      'Mentors should demonstrate through their own behaviour the standards they expect from mentees',
      'Mentors should never give verbal instruction',
      'Actions are the only form of communication that matters',
      'Mentors should copy what their mentees do',
    ],
    correctAnswer: 0,
    explanation:
      'Role modelling is one of the most powerful mentoring tools. If a mentor tells an apprentice to always wear PPE but then walks onto site without their hard hat, the apprentice learns that the rules are optional. Behaviour speaks louder than words. A mentor who consistently demonstrates good practice teaches more by example than by instruction alone.',
  },
];

export default function MDModule2Section4() {
  useSEO({
    title: 'Building Trust & the Mentoring Relationship | Mentoring Module 2.4',
    description:
      'The mentoring relationship lifecycle, psychological safety, confidentiality and safeguarding boundaries, mentoring agreements, and the power of role modelling in construction mentoring.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
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
          <Handshake className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Building Trust &amp; the Mentoring Relationship
          </h1>
          <p className="text-white max-w-xl mx-auto">
            The foundation of all effective mentoring &mdash; building trust, creating psychological
            safety, maintaining confidentiality, and leading by example
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
                    <strong>Lifecycle:</strong> Forming, Establishing, Developing, Closing &mdash;
                    every mentoring relationship has natural stages.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Psychological safety:</strong> The mentee must feel safe to admit
                    mistakes and ask for help without fear of ridicule.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Role modelling:</strong> &ldquo;Do as I do&rdquo; is more powerful than
                    &ldquo;do as I say&rdquo;.
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
                    <strong>Confidentiality:</strong> Most conversations stay private, but safety
                    concerns and safeguarding issues must always be reported.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Mentoring agreement:</strong> Agree expectations, frequency, goals, and
                    review dates at the start.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Lead by example:</strong> A mentor who always isolates, even for quick
                    jobs, teaches more than any textbook.
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
                Describe the four stages of the mentoring relationship lifecycle and what happens at
                each stage
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain psychological safety (Edmondson, 1999) and why it is essential for effective
                mentoring
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Distinguish between what stays confidential in a mentoring relationship and what
                must be reported
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Draft a simple mentoring agreement covering expectations, goals, frequency, and
                review dates
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Demonstrate understanding of role modelling and its impact on apprentice behaviour
                and standards
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Recognise safeguarding responsibilities and know when and how to escalate concerns
                appropriately
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: The Mentoring Relationship Lifecycle */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">01</span>
              The Mentoring Relationship Lifecycle
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Like any relationship, a mentoring partnership goes through natural stages. Being
                aware of these stages helps you manage the relationship effectively and avoid common
                pitfalls. Each stage has its own focus and challenges.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-rose-400 text-center text-sm uppercase tracking-wider">
                  Four Stages of the Mentoring Relationship
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Forming</h4>
                        <p className="text-white text-sm">
                          Getting to know each other. Learning about the mentee&rsquo;s background,
                          aspirations, and current skill level. Agreeing how you will work together,
                          how often you will meet, and what the mentee wants to achieve. Setting
                          ground rules for confidentiality and communication. This stage is about
                          <strong> building the foundation</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Establishing</h4>
                        <p className="text-white text-sm">
                          Building rapport and deepening trust. The mentee begins to feel more
                          comfortable and starts opening up about challenges and areas where they
                          need help. The mentor demonstrates reliability by following through on
                          commitments. This stage is about{' '}
                          <strong>earning the right to challenge</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Developing</h4>
                        <p className="text-white text-sm">
                          The main working phase. The relationship is established and both parties
                          are comfortable. The mentor can now challenge, give honest feedback, and
                          push the mentee outside their comfort zone. Real growth happens here. The
                          mentee takes on more responsibility and begins to develop independence.
                          This stage is about <strong>doing the work</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-lg">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-rose-300 font-medium mb-1">Closing</h4>
                        <p className="text-white text-sm">
                          The mentee has achieved their goals or the natural endpoint of the
                          relationship has been reached (end of apprenticeship, change of site,
                          promotion). Review achievements, celebrate progress, plan for continued
                          development, and close the formal relationship. Leave the door open for
                          future contact. This stage is about{' '}
                          <strong>ending well and letting go</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">Common Pitfalls</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Skipping the Forming stage:</strong> Jumping straight into technical
                      coaching without building rapport leads to a superficial relationship where
                      the mentee does not feel safe enough to be honest about their struggles.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Never reaching the Closing stage:</strong> Some mentoring
                      relationships drift on without purpose. If the mentee has outgrown the
                      relationship, recognise it and close properly. A well-ended mentoring
                      relationship is a success.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Creating dependency:</strong> The goal of mentoring is to develop
                      independence, not to create someone who cannot function without your guidance.
                      As the relationship develops, gradually step back and let the mentee lead.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Psychological Safety */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">02</span>
              Psychological Safety (Edmondson, 1999)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Amy Edmondson</strong>, a professor at Harvard Business School, published
                her foundational research on psychological safety in 1999. She defined it as{' '}
                <em>
                  &ldquo;a shared belief held by members of a team that the team is safe for
                  interpersonal risk-taking&rdquo;
                </em>
                . In a mentoring context, this means the mentee must feel safe to:
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Definition</h3>
                <p className="text-white text-sm">
                  <strong>Psychological safety</strong> is the belief that you will not be punished,
                  ridiculed, or humiliated for speaking up, admitting mistakes, asking questions, or
                  offering ideas. In a mentoring relationship, the mentee must feel that honesty is
                  safe and valued, not penalised.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Heart className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What Psychological Safety Looks Like in Practice
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The mentee admits &ldquo;I wired that wrong and I need to go back and fix
                      it&rdquo; without hesitation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The mentee asks &ldquo;Can you explain that again? I didn&rsquo;t
                      understand&rdquo; without embarrassment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The mentee raises a concern about site safety without fear of being seen as a
                      troublemaker
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      The mentee says &ldquo;I don&rsquo;t know how to do this&rdquo; rather than
                      guessing and getting it wrong
                    </span>
                  </li>
                </ul>
              </div>

              {/* Construction Example */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Example: Trust Enables Honesty
                </h3>
                <p className="text-white text-sm mb-3">
                  An apprentice is wiring a consumer unit and realises they have connected the wrong
                  circuit to the wrong MCB. In a psychologically unsafe environment, they might try
                  to hide the mistake, rewire it quickly, and hope nobody notices. The problem is
                  that rushed corrections create new errors.
                </p>
                <p className="text-white text-sm mb-3">
                  In a psychologically safe environment, the apprentice goes straight to their
                  mentor: &ldquo;I&rsquo;ve connected circuit 3 to the wrong breaker. I know how to
                  fix it, but can you check my work when I&rsquo;m done?&rdquo;
                </p>
                <p className="text-white text-sm">
                  The mentor responds: &ldquo;Good spot, and well done for catching it before we
                  tested. Show me what you&rsquo;re going to do and I&rsquo;ll keep an eye.&rdquo;
                  This response reinforces that admitting mistakes is the right thing to do and that
                  the mentor is there to help, not to punish.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  How Mentors Build Psychological Safety
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Share your own mistakes:</strong> &ldquo;When I was an apprentice, I
                      once connected an entire lighting circuit to the wrong floor. Took me half a
                      day to fix it.&rdquo; This normalises error as part of learning.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Respond to mistakes with curiosity, not anger:</strong> &ldquo;What
                      happened there? Let&rsquo;s work out where it went wrong&rdquo; rather than
                      &ldquo;How did you mess that up?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Thank people for admitting errors:</strong> &ldquo;I&rsquo;m glad you
                      told me. That takes guts.&rdquo; This reinforces the behaviour you want to
                      see.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>Never ridicule in front of others:</strong> Public humiliation
                      destroys psychological safety faster than almost anything else. One incident
                      can undo months of trust-building.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Confidentiality, Boundaries & Safeguarding */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">03</span>
              Confidentiality, Boundaries &amp; Safeguarding
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Confidentiality is one of the cornerstones of an effective mentoring relationship.
                The mentee must trust that what they share stays private. However, there are clear
                and non-negotiable boundaries to confidentiality. As a mentor, you need to be
                transparent about these boundaries from the very beginning of the relationship.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What Stays Private vs What Must Be Reported
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-300 font-medium text-sm mb-2">Stays Confidential</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Personal development goals and aspirations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Technical struggles and areas of weakness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Personal concerns about confidence or career direction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Workplace frustrations and relationship difficulties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Assessment anxieties and exam preparation concerns</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-300 font-medium text-sm mb-2">Must Be Reported</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Safety concerns that put people at risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Unsafe working practices (e.g. unsafe live working)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Safeguarding concerns (abuse, exploitation, self-harm)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Illegal activity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Anything that could result in serious harm to the mentee or others
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Construction Example */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Example: Reporting Unsafe Live Working
                </h3>
                <p className="text-white text-sm mb-3">
                  During a mentoring conversation, your mentee tells you: &ldquo;I saw one of the
                  other lads working live on a distribution board yesterday. He said it was just a
                  quick swap and it wasn&rsquo;t worth isolating. Please don&rsquo;t say anything
                  &mdash; I don&rsquo;t want to be a grass.&rdquo;
                </p>
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 font-medium text-sm">This must be reported.</p>
                  </div>
                  <p className="text-white text-sm">
                    Unsafe live working puts lives at risk. This overrides confidentiality. Explain
                    to your mentee: &ldquo;I understand you don&rsquo;t want to cause trouble, but
                    what you&rsquo;ve described is dangerous. If something went wrong, that person
                    could be killed. I have a responsibility to report this, and so do you.
                    I&rsquo;ll support you through the process, but we cannot stay quiet about
                    something that could kill someone.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Principle</h3>
                <p className="text-white text-sm">
                  Set out confidentiality boundaries at the very start of the mentoring relationship
                  &mdash; before any disclosures are made. This way, the mentee knows in advance
                  what you can and cannot keep private. It prevents difficult surprises later and
                  actually builds trust, because the mentee knows exactly where they stand.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: The Mentoring Agreement */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">04</span>
              The Mentoring Agreement &amp; Role Modelling
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A mentoring agreement does not need to be a formal legal document. It is a shared
                understanding between mentor and mentee about how the relationship will work. Having
                this conversation at the start prevents misunderstandings and ensures both parties
                are committed.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400">
                  <FileText className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What a Mentoring Agreement Should Cover
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium text-sm mb-1">Expectations</h4>
                    <p className="text-white text-sm">
                      What does the mentee expect from the mentor? What does the mentor expect from
                      the mentee? For example: the mentee commits to being open and honest; the
                      mentor commits to being available, supportive, and constructive.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium text-sm mb-1">Frequency</h4>
                    <p className="text-white text-sm">
                      How often will you meet formally? Weekly? Fortnightly? Monthly? Where will you
                      meet? Will there be informal check-ins between formal meetings? How will you
                      communicate between sessions (text, phone, in person)?
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium text-sm mb-1">Goals</h4>
                    <p className="text-white text-sm">
                      What does the mentee want to achieve? Short-term goals (pass AM2, complete
                      first fix independently) and longer-term goals (gain JIB Gold Card, move into
                      commissioning). Goals can evolve over time but having a starting point gives
                      direction.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium text-sm mb-1">Confidentiality</h4>
                    <p className="text-white text-sm">
                      Agree what stays private and what must be reported (safety, safeguarding,
                      illegal activity). Be explicit about this at the start so there are no
                      surprises.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium text-sm mb-1">Review Dates</h4>
                    <p className="text-white text-sm">
                      When will you review how the relationship is working? Every 8&ndash;12 weeks
                      is a good rhythm. At the review, both parties can discuss what is working
                      well, what could be improved, and whether the goals need updating.
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Modelling */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Role Modelling: &ldquo;Do As I Do&rdquo; Is More Powerful Than &ldquo;Do As I
                  Say&rdquo;
                </h3>
                <p className="text-white text-sm mb-3">
                  Research consistently shows that apprentices learn more from what their mentor
                  <em> does</em> than from what their mentor <em>says</em>. If there is a gap
                  between words and actions, the apprentice will follow the actions every time.
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>If you tell your apprentice to always wear PPE</strong> but then walk
                      onto site without your hard hat, the apprentice learns that PPE is optional.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>If you tell your apprentice to always isolate</strong> but then do a
                      &ldquo;quick swap&rdquo; on a live circuit, the apprentice learns that safe
                      isolation is only for when someone is watching.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>If you tell your apprentice to take pride in their work</strong> but
                      then rush through terminations and leave messy cable runs, the apprentice
                      learns that quality does not really matter.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Construction Example */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Example: The Mentor Who Always Isolates
                </h3>
                <p className="text-white text-sm mb-3">
                  A mentor is replacing a socket outlet. The circuit is off at the board. It would
                  take 30 seconds to swap the socket without formally isolating. But the mentor goes
                  through the full safe isolation procedure: locks off with their own lock and tag,
                  proves dead at the point of work with a voltage indicator that has been proved
                  before and after.
                </p>
                <p className="text-white text-sm mb-3">
                  The apprentice watches and thinks: &ldquo;He does this every time, even for
                  something that quick. There must be a reason.&rdquo;
                </p>
                <p className="text-white text-sm">
                  The mentor explains: &ldquo;I know it seems like overkill for a socket swap. But
                  I&rsquo;ve been in this trade 20 years and I&rsquo;ve seen three people get a
                  shock from circuits they thought were off. The procedure is the same whether it
                  takes 30 seconds or 30 minutes. I do it every time because I want to go home to my
                  family every night.&rdquo;
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Remember</h3>
                <p className="text-white text-sm">
                  Your apprentice is watching you all the time &mdash; not just during formal
                  training sessions. How you behave when you think nobody is looking teaches more
                  than any lesson plan. Be the electrician you want your apprentice to become.
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
          <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />
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
            <Link to="../md-module-3">
              Next: Module 3 &mdash; Supporting Apprentices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
