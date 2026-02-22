import { ArrowLeft, MessageSquare, CheckCircle, ClipboardList, Eye, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'pendleton-first-step',
    question: 'In Pendleton\u2019s Rules, who speaks first about what went well?',
    options: [
      'The observer (mentor)',
      'The learner',
      'A neutral third party',
      'It does not matter who goes first',
    ],
    correctIndex: 1,
    explanation:
      'In Pendleton\u2019s Rules, the learner always reflects first \u2014 both on what went well and on what could be improved. This ensures the learner is actively involved in their own assessment rather than passively receiving judgement. The observer then adds their own observations.',
  },
  {
    id: 'sbi-model',
    question: 'What does "SBI" stand for in the SBI feedback model?',
    options: [
      'Summary, Benefit, Instruction',
      'Situation, Behaviour, Impact',
      'Specific, Brief, Immediate',
      'Standard, Baseline, Improvement',
    ],
    correctIndex: 1,
    explanation:
      'SBI stands for Situation (when and where), Behaviour (what you observed), and Impact (what effect it had). This structure keeps feedback factual and non-judgemental, focusing on observable actions rather than personality.',
  },
  {
    id: 'johari-blind-spot',
    question: 'In the Johari Window, what is a "blind spot"?',
    options: [
      'Something known to the person but hidden from others',
      'Something unknown to both the person and others',
      'Something known to others but not known to the person themselves',
      'Something known to both the person and others',
    ],
    correctIndex: 2,
    explanation:
      'A blind spot is something that others can see about you but you cannot see yourself. For example, an apprentice who consistently rushes through testing may not realise they are doing it until a mentor points it out. Feedback helps to reduce blind spots by expanding the Open area of the Johari Window.',
  },
];

const faqs = [
  {
    question: 'What is wrong with the "feedback sandwich" (positive-negative-positive)?',
    answer:
      'The feedback sandwich (also called the compliment sandwich) involves wrapping negative feedback between two positive comments. The problem is that people quickly learn to expect the pattern. They discount the opening praise as insincere, brace themselves for the criticism, and then dismiss the closing positive as padding. The result is that neither the positive nor the constructive feedback lands effectively. Experienced learners find it patronising. It is better to separate positive feedback (given publicly and frequently) from constructive feedback (given privately, specifically, and with a clear path forward).',
  },
  {
    question: 'Should I always give feedback immediately after observing something?',
    answer:
      'For praise, yes \u2014 the closer to the event, the better. Immediate positive reinforcement is powerful. For constructive feedback, it depends. If there is a safety issue, address it immediately and directly. For developmental feedback, wait until you can speak privately, calmly, and with specific examples. Avoid giving constructive feedback when you or the learner are stressed, angry, or in front of others. A good rule is: praise immediately and publicly, correct promptly but privately.',
  },
  {
    question: 'How do I give feedback to someone who becomes defensive?',
    answer:
      'Start by establishing that the purpose is development, not criticism. Use the SBI model to keep the feedback factual \u2014 describe what you observed, not what you think about the person. Ask for their perspective: "How did you feel that went?" Often, the learner already knows what went wrong and just needs space to say it. If they remain defensive, acknowledge their feelings ("I can see this is frustrating") and refocus on the specific behaviour and its impact, not the person.',
  },
  {
    question: 'How often should I give feedback as a mentor?',
    answer:
      'More often than you think. Research consistently shows that regular, informal feedback is more effective than infrequent, formal reviews. Aim to give at least one piece of specific positive feedback every day you work with your mentee. Constructive feedback should be given as needed, but always specifically and privately. The more normal and routine feedback becomes, the less stressful it feels for both parties.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the correct sequence in Pendleton\u2019s Rules?',
    options: [
      'Observer identifies positives \u2192 observer identifies improvements \u2192 action plan',
      'Learner reflects on positives \u2192 observer adds positives \u2192 learner identifies improvements \u2192 observer suggests improvements \u2192 action plan',
      'Observer tells learner what went wrong \u2192 learner agrees \u2192 action plan',
      'Learner writes a self-assessment \u2192 observer grades it \u2192 discussion',
    ],
    correctAnswer: 1,
    explanation:
      'Pendleton\u2019s Rules follow a structured sequence: the learner reflects on what went well first, then the observer adds their positives. Next, the learner identifies what could be improved, and the observer adds their suggestions. Finally, they agree an action plan together.',
  },
  {
    id: 2,
    question: 'In the SBI model, what does "Situation" refer to?',
    options: [
      'The overall context of the mentoring relationship',
      'The specific time, place, and circumstances when the behaviour occurred',
      'The learner\u2019s general attitude towards their work',
      'The standard of work expected on the project',
    ],
    correctAnswer: 1,
    explanation:
      'In SBI, the Situation describes when and where the behaviour occurred \u2014 it grounds the feedback in a specific, observable event. For example: "When you were terminating the board this morning..." This prevents feedback from feeling vague or general.',
  },
  {
    id: 3,
    question: 'Who developed the Johari Window model?',
    options: [
      'Sir John Whitmore',
      'Stephen Covey',
      'Joseph Luft and Harrington Ingham',
      'David Kolb',
    ],
    correctAnswer: 2,
    explanation:
      'The Johari Window was created by psychologists Joseph Luft and Harrington Ingham in 1955. The name "Johari" is a combination of their first names: Jo(seph) and Hari(ngton).',
  },
  {
    id: 4,
    question: 'Which Johari Window quadrant is reduced by giving and receiving feedback?',
    options: ['Open area', 'Blind spot', 'Hidden area', 'Unknown area'],
    correctAnswer: 1,
    explanation:
      'Feedback from others reduces the Blind Spot \u2014 the area that others can see but you cannot see yourself. As the blind spot shrinks, the Open area (known to self and others) expands, leading to better self-awareness and more effective working relationships.',
  },
  {
    id: 5,
    question: 'When giving constructive feedback on a construction site, you should:',
    options: [
      'Give it publicly so everyone can learn from the mistake',
      'Wait until the annual performance review',
      'Give it privately, promptly, and with specific examples',
      'Start with a compliment, give the criticism, then end with another compliment',
    ],
    correctAnswer: 2,
    explanation:
      'Constructive feedback should be given privately (to preserve dignity), promptly (while the event is fresh), and with specific examples (so the learner knows exactly what to change). Public criticism damages trust and the mentoring relationship.',
  },
  {
    id: 6,
    question: 'What is the problem with vague feedback like "Good job today"?',
    options: [
      'It is too positive',
      'The learner does not know specifically what they did well, so they cannot replicate it',
      'It takes too long to say',
      'Vague feedback is actually the most effective type',
    ],
    correctAnswer: 1,
    explanation:
      'Vague feedback, whether positive or negative, is ineffective because the learner does not know what specifically they did well (or poorly). Compare "Good job today" with "The way you stripped back and terminated those tails in the consumer unit was really neat and efficient \u2014 well done." The second version tells the learner exactly what to keep doing.',
  },
  {
    id: 7,
    question:
      'According to the principle "praise in public, correct in private", when should you give positive feedback?',
    options: [
      'Only during formal reviews',
      'Only when the learner asks for it',
      'Publicly and as close to the event as possible',
      'Privately, after the working day has finished',
    ],
    correctAnswer: 2,
    explanation:
      'Positive feedback should be given publicly (in front of colleagues when appropriate) and as close to the event as possible. Public recognition reinforces the desired behaviour, builds the learner\u2019s confidence, and shows others what good practice looks like.',
  },
  {
    id: 8,
    question: 'Why is the feedback sandwich considered problematic by many mentoring experts?',
    options: [
      'Because it takes too long',
      'Because people learn to expect the pattern and discount both the positive and constructive elements',
      'Because it does not include enough positive feedback',
      'Because it was designed for children, not adults',
    ],
    correctAnswer: 1,
    explanation:
      'The feedback sandwich (positive-negative-positive) becomes predictable. Learners learn to ignore the opening praise ("here comes the but..."), brace for the criticism, and then dismiss the closing compliment. This undermines both the positive recognition and the constructive feedback.',
  },
];

export default function MDModule2Section3() {
  useSEO({
    title: 'Giving Effective Feedback | Mentoring Module 2.3',
    description:
      'Pendleton\u2019s Rules, the SBI feedback model, the Johari Window, timing feedback, praise in public and correct in private, and why the feedback sandwich is problematic.',
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
          <MessageSquare className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Giving Effective Feedback
          </h1>
          <p className="text-white max-w-xl mx-auto">
            Structured approaches to feedback that develop learners, build confidence, and improve
            performance &mdash; not just on assessments, but every day on site
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
                    <strong>Pendleton&rsquo;s Rules:</strong> Learner reflects first, then observer
                    adds &mdash; positives first, then improvements, then action plan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>SBI Model:</strong> Situation, Behaviour, Impact &mdash; factual,
                    non-judgemental, specific.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Johari Window:</strong> Feedback reduces blind spots and expands
                    self-awareness.
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
                    <strong>Praise in public, correct in private</strong> &mdash; always protect
                    dignity when giving constructive feedback.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Be specific:</strong> &ldquo;Your terminations in the consumer unit were
                    neat&rdquo; beats &ldquo;good job&rdquo; every time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                  <span>
                    <strong>Avoid the feedback sandwich</strong> &mdash; it is predictable and
                    undermines both praise and constructive points.
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
                Apply Pendleton&rsquo;s Rules to structure a feedback conversation after observing a
                task
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Use the SBI (Situation, Behaviour, Impact) model to deliver specific,
                non-judgemental feedback
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain the four quadrants of the Johari Window and how feedback expands
                self-awareness
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply the principle of &ldquo;praise in public, correct in private&rdquo;
                consistently on site
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain why the feedback sandwich is problematic and describe more effective
                alternatives
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Give specific, timely feedback that helps learners understand exactly what to repeat
                or change
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Pendleton's Rules */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">01</span>
              Pendleton&rsquo;s Rules
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Pendleton&rsquo;s Rules (developed by David Pendleton in the 1980s, originally for
                medical education) provide a structured framework for giving feedback after
                observing someone perform a task. The key principle is that the{' '}
                <strong>learner reflects first</strong> &mdash; they assess their own performance
                before the observer adds their perspective. This makes the learner an active
                participant in the feedback process, not a passive recipient.
              </p>

              {/* Rose Framework Box */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-rose-400 text-center text-sm uppercase tracking-wider">
                  Pendleton&rsquo;s Rules &mdash; The Five Steps
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">
                          Learner Reflects on Positives
                        </p>
                        <p className="text-white text-sm">
                          The learner says what they think went well. &ldquo;I think I got the cable
                          routing right and my terminations were neat.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">Observer Adds Positives</p>
                        <p className="text-white text-sm">
                          The observer confirms and adds their own observations of what went well.
                          &ldquo;Agreed, and your safe isolation procedure was spot on.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">
                          Learner Identifies Improvements
                        </p>
                        <p className="text-white text-sm">
                          The learner reflects on what could be improved. &ldquo;I think I took too
                          long on the testing and I wasn&rsquo;t sure about the Zs reading.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">
                          Observer Suggests Improvements
                        </p>
                        <p className="text-white text-sm">
                          The observer adds their suggestions. &ldquo;I&rsquo;d also suggest you lay
                          out your test instruments before you start, so you&rsquo;re not hunting
                          for leads mid-test.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-rose-300 font-bold text-sm">5</span>
                      </div>
                      <div>
                        <p className="text-rose-300 font-medium text-sm">Agree an Action Plan</p>
                        <p className="text-white text-sm">
                          Together, they agree specific actions. &ldquo;Let&rsquo;s practise the
                          test sequence three times this week. I&rsquo;ll observe and we&rsquo;ll
                          time it.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Construction Example */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <ClipboardList className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Construction Example: Pendleton After Safe Isolation Observation
                </h3>
                <p className="text-white text-sm mb-3">
                  A mentor has observed their apprentice perform a safe isolation procedure on a
                  distribution board. Here is how they structure the feedback using
                  Pendleton&rsquo;s Rules:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Right, talk me through what you think went
                      well with that isolation.&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I identified the correct circuit, locked
                      off with my own lock and tag, and proved dead at the point of work with my
                      voltage indicator.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Spot on. I&rsquo;d also add that you proved
                      your voltage indicator before and after, which a lot of people forget. Really
                      good habit.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Now, is there anything you&rsquo;d do
                      differently?&rdquo;
                    </p>
                    <p className="text-white mt-1">
                      <strong>Apprentice:</strong> &ldquo;I forgot to tell the other lads I was
                      isolating. I should have warned them before I switched off.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;Good that you spotted that. The other thing I
                      noticed is that you didn&rsquo;t check for stored energy &mdash; capacitors in
                      the VFD on circuit 14. Worth adding to your routine.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Mentor:</strong> &ldquo;So next time, two things: warn the team before
                      isolating, and check for stored energy. Shall we practise that tomorrow on
                      board three?&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The SBI Model */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">02</span>
              The SBI Model
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The SBI (Situation, Behaviour, Impact) model, developed by the Center for Creative
                Leadership, provides a simple structure for delivering feedback that is factual,
                specific, and non-judgemental. It focuses on what you <em>observed</em>, not what
                you <em>think</em> about the person. This makes it easier to deliver and easier to
                receive.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400 text-center text-sm uppercase tracking-wider">
                  The SBI Framework
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">S &mdash; Situation</h4>
                    <p className="text-white text-sm">
                      Describe when and where the behaviour occurred. Be specific. &ldquo;When you
                      were terminating the consumer unit board this morning...&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">B &mdash; Behaviour</h4>
                    <p className="text-white text-sm">
                      Describe the specific, observable behaviour. Not your interpretation, not your
                      opinion &mdash; what you actually saw or heard. &ldquo;...I noticed that two
                      of the neutral connections were not fully tightened.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-semibold mb-1">I &mdash; Impact</h4>
                    <p className="text-white text-sm">
                      Explain the effect or consequence of the behaviour. &ldquo;...If those had
                      been energised, the loose connections could have overheated, arced, and
                      potentially caused a fire. A loose neutral is one of the most common causes of
                      consumer unit fires.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Construction Example */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Example: SBI for Loose Terminal Connections
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Situation:</strong> &ldquo;When you were terminating the consumer unit
                      board this morning on flat 4...&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Behaviour:</strong> &ldquo;...I checked your connections and found
                      that the neutral bar terminal on circuits 3 and 7 were finger-tight only. I
                      could pull the conductors out with a gentle tug.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-white">
                      <strong>Impact:</strong> &ldquo;...A loose neutral connection under load
                      generates heat. Over time, this can cause the terminal to arc, the insulation
                      to degrade, and potentially start a fire inside the consumer unit. It is one
                      of the most common C2 (Potentially Dangerous) observations on EICRs.&rdquo;
                    </p>
                  </div>
                </div>
                <p className="text-white text-sm mt-3">
                  Notice that the feedback is entirely factual. It describes what was observed and
                  what the consequences could be. It does not say &ldquo;you were careless&rdquo; or
                  &ldquo;you didn&rsquo;t try hard enough&rdquo; &mdash; it focuses on the
                  behaviour, not the person.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Principle</h3>
                <p className="text-white text-sm">
                  SBI works for positive feedback too. &ldquo;When you were running the containment
                  today (Situation), you measured and cut every piece before fixing any of them
                  (Behaviour), which meant the whole run looked professional and you didn&rsquo;t
                  waste a single length of trunking (Impact).&rdquo; Specific positive feedback is
                  far more powerful than a generic &ldquo;nice one&rdquo;.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: The Johari Window */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">03</span>
              The Johari Window
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Johari Window was created by psychologists <strong>Joseph Luft</strong> and{' '}
                <strong>Harrington Ingham</strong> in 1955 (the name &ldquo;Johari&rdquo; combines
                their first names: Jo + Hari). It is a simple but powerful model for understanding
                self-awareness and the role of feedback in personal and professional development.
              </p>

              {/* Johari Window Diagram */}
              <div className="bg-white/5 border border-rose-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  <Eye className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The Johari Window
                </h3>
                <div className="max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-0.5 text-center text-sm mb-2">
                    <div className="text-white text-xs font-medium pb-1">Known to Self</div>
                    <div className="text-white text-xs font-medium pb-1">Not Known to Self</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-500/15 border border-green-500/30 p-3 rounded-lg">
                      <p className="text-green-300 font-semibold text-sm mb-1">Open Area</p>
                      <p className="text-white text-xs">
                        Known to self and known to others. Your public skills, knowledge, and
                        behaviours.
                      </p>
                    </div>
                    <div className="bg-blue-500/15 border border-blue-500/30 p-3 rounded-lg">
                      <p className="text-blue-300 font-semibold text-sm mb-1">Blind Spot</p>
                      <p className="text-white text-xs">
                        Known to others but not known to self. Things others see about you that you
                        cannot see yourself.
                      </p>
                    </div>
                    <div className="bg-yellow-500/15 border border-yellow-500/30 p-3 rounded-lg">
                      <p className="text-yellow-300 font-semibold text-sm mb-1">Hidden Area</p>
                      <p className="text-white text-xs">
                        Known to self but not known to others. Things you keep private &mdash;
                        fears, insecurities, mistakes.
                      </p>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-3 rounded-lg">
                      <p className="text-white font-semibold text-sm mb-1">Unknown Area</p>
                      <p className="text-white text-xs">
                        Not known to self or others. Undiscovered talents, unconscious behaviours,
                        future potential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">How Feedback Changes the Window</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Feedback from others</strong> reduces the <strong>Blind Spot</strong>.
                      When a mentor tells an apprentice that they rush through testing, the
                      apprentice becomes aware of a behaviour they could not see themselves. The
                      Blind Spot shrinks and the Open Area grows.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Self-disclosure</strong> reduces the <strong>Hidden Area</strong>.
                      When a learner trusts their mentor enough to admit &ldquo;I actually
                      don&rsquo;t understand Zs testing&rdquo;, the hidden area shrinks and the
                      mentor can help.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>The goal</strong> is to <strong>expand the Open Area</strong> as much
                      as possible. This requires both giving feedback (to reduce blind spots) and
                      creating a safe environment where learners feel comfortable sharing what they
                      do not know (to reduce the hidden area).
                    </div>
                  </li>
                </ul>
              </div>

              {/* Construction Example */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Construction Example: An Apprentice&rsquo;s Blind Spot
                </h3>
                <p className="text-white text-sm mb-3">
                  An apprentice consistently rushes through their testing procedure, taking readings
                  quickly and recording them without properly checking the values. They do not
                  realise they are doing this &mdash; in their mind, they are being efficient. But
                  their mentor notices that the test results are occasionally inconsistent and that
                  the apprentice is not pausing to interpret what the readings mean.
                </p>
                <p className="text-white text-sm">
                  This is a <strong>blind spot</strong> &mdash; the apprentice cannot see it, but
                  the mentor can. By giving specific, constructive feedback (&ldquo;I noticed
                  you&rsquo;re recording the Zs readings very quickly. Can you talk me through what
                  those numbers actually tell you?&rdquo;), the mentor helps the apprentice become
                  aware of the issue and can then coach them towards more thorough testing habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Practical Feedback Guidelines */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-rose-400 text-sm font-normal">04</span>
              Practical Feedback Guidelines
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Structured models like Pendleton and SBI are excellent frameworks, but effective
                feedback also depends on practical considerations &mdash; when to give it, where to
                give it, and how to make it land.
              </p>

              {/* Praise in Public, Correct in Private */}
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-rose-400">
                  <ThumbsUp className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Praise in Public, Correct in Private
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-300 font-medium text-sm mb-2">Positive Feedback</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          Give it publicly &mdash; in front of colleagues when appropriate
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Give it immediately &mdash; as close to the event as possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Be specific about what was done well</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Give it frequently &mdash; at least once a day</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-2">Constructive Feedback</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Give it privately &mdash; never in front of other workers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          Give it promptly &mdash; but wait until you can be calm and specific
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Focus on the behaviour, not the person</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>Always end with a clear path forward</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* The Feedback Sandwich Myth */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  The Feedback Sandwich &mdash; Why It Does Not Work
                </h3>
                <p className="text-white text-sm mb-3">
                  The feedback sandwich (also called the compliment sandwich) structures feedback
                  as: positive comment, then negative comment, then positive comment. It was widely
                  taught in the 1990s and 2000s but is now considered problematic by most mentoring
                  experts. Here is why:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>People learn the pattern:</strong> After a few times, the learner
                      hears the opening praise and immediately thinks &ldquo;here comes the
                      but...&rdquo;. The praise feels insincere.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>The constructive feedback gets buried:</strong> Surrounded by
                      positives, the developmental point can be lost or minimised.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>It can feel patronising:</strong> Experienced learners recognise the
                      technique and feel they are being managed rather than respected.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                    <span>
                      <strong>It undermines genuine praise:</strong> Every time you give real,
                      heartfelt praise, the learner wonders if criticism is coming next.
                    </span>
                  </li>
                </ul>
                <p className="text-white text-sm mt-3">
                  <strong>Better alternative:</strong> Separate your positive feedback from your
                  constructive feedback. Give praise immediately and publicly when you see good
                  work. Give constructive feedback privately and specifically when there is
                  something to improve. Each type of feedback stands on its own merit.
                </p>
              </div>

              {/* Specific vs Vague */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Specific vs Vague Feedback</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-300 font-medium text-sm mb-2">Vague (ineffective)</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li>&ldquo;Good job today.&rdquo;</li>
                      <li>&ldquo;That wasn&rsquo;t great.&rdquo;</li>
                      <li>&ldquo;You need to try harder.&rdquo;</li>
                      <li>&ldquo;Your work needs improvement.&rdquo;</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-300 font-medium text-sm mb-2">Specific (effective)</p>
                    <ul className="text-white text-sm space-y-1.5">
                      <li>
                        &ldquo;Your terminations in the CU were really neat and secure.&rdquo;
                      </li>
                      <li>
                        &ldquo;The cable route on circuit 6 has a tight bend that could damage the
                        insulation.&rdquo;
                      </li>
                      <li>
                        &ldquo;Your continuity test on the ring was methodical and your results
                        match what I&rsquo;d expect.&rdquo;
                      </li>
                      <li>
                        &ldquo;The earth bonding on the gas pipe was at the wrong connection
                        point.&rdquo;
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Remember</h3>
                <p className="text-white text-sm">
                  Feedback is a skill that improves with practice. The more you give it, the more
                  natural it feels. Start by giving one specific piece of positive feedback every
                  day to someone you work with. Once that becomes a habit, you will find that
                  constructive feedback becomes easier too &mdash; because the learner already
                  trusts that your feedback comes from a genuine desire to help them improve.
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
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />
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
            <Link to="../md-module-2-section-4">
              Next: Building Trust &amp; the Mentoring Relationship
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
