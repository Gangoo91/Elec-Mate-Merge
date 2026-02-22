import { ArrowLeft, Focus, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question: 'According to Cal Newport, what is the defining characteristic of deep work?',
    options: [
      'Working for long hours without any breaks',
      'Distraction-free concentration that pushes cognitive abilities to their limit',
      'Completing as many tasks as possible in a single day',
      'Working on multiple projects simultaneously to maximise output',
    ],
    correctAnswer: 1,
    explanation:
      'Newport defines deep work as professional activities performed in a state of distraction-free concentration that push your cognitive abilities to their limit. It is about the quality and depth of focus, not the quantity of hours worked.',
  },
  {
    id: 2,
    question: 'What does Sophie Leroy\'s research on "attention residue" demonstrate?',
    options: [
      'That multitasking improves overall productivity by up to 40%',
      'That switching tasks leaves residual attention on the previous task, reducing performance',
      'That taking frequent breaks eliminates all residual cognitive load',
      'That attention can only be sustained for a maximum of 10 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'Leroy\'s 2009 research showed that when you switch from Task A to Task B, part of your attention remains stuck on Task A &mdash; what she calls "attention residue." This residue reduces your cognitive performance on the new task, which is why frequent switching is so costly.',
  },
  {
    id: 3,
    question:
      "According to Gloria Mark's research at UC Irvine, how long does it take on average to fully refocus after an interruption?",
    options: ['5 minutes', '10 minutes', '23 minutes and 15 seconds', '45 minutes'],
    correctAnswer: 2,
    explanation:
      "Gloria Mark's research found that it takes an average of 23 minutes and 15 seconds to fully return to the original task after an interruption. Even brief interruptions carry a significant refocusing cost.",
  },
  {
    id: 4,
    question: 'Which of the following is an example of shallow work?',
    options: [
      'Completing a complex EICR report requiring sustained analysis',
      'Designing a three-phase distribution board layout',
      'Replying to routine WhatsApp messages about job scheduling',
      'Performing insulation resistance testing across 40 circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Shallow work is logistically necessary but not cognitively demanding. Replying to routine messages, scheduling, and basic admin are shallow tasks. Complex testing, design work, and report writing all require deep concentration.',
  },
  {
    id: 5,
    question: 'What is the concept of "flow state" as described by Mihaly Csikszentmihalyi?',
    options: [
      'A state of complete mental exhaustion after prolonged work',
      'A state of optimal experience where a person is fully immersed and energised by an activity',
      'A technique for scheduling tasks in chronological order',
      'A method for delegating low-priority tasks to others',
    ],
    correctAnswer: 1,
    explanation:
      "Csikszentmihalyi described flow as a state of complete immersion in an activity, where the challenge level matches the person's skill level. In flow, people experience heightened focus, lose track of time, and produce their best work.",
  },
  {
    id: 6,
    question:
      'Why is turning your phone to silent during testing particularly important for electricians?',
    options: [
      'Because phone signals interfere with test instrument readings',
      'Because an interruption during a test sequence can mean restarting the entire process and wasting significant time',
      'Because it is a legal requirement under BS 7671',
      'Because clients will complain if they hear your phone ring',
    ],
    correctAnswer: 1,
    explanation:
      'When performing sequential testing such as insulation resistance across multiple circuits, an interruption can cause you to lose your place, requiring you to restart the sequence. The refocusing cost is compounded by the practical cost of re-doing physical work.',
  },
  {
    id: 7,
    question:
      'What is the most effective strategy for creating deep work conditions on a construction site?',
    options: [
      'Working in complete isolation with no communication for the entire day',
      'Scheduling predetermined call-back windows and blocking focused time for complex tasks',
      'Answering every call immediately to keep clients happy',
      'Only performing deep work tasks at home after hours',
    ],
    correctAnswer: 1,
    explanation:
      'The most practical approach is to schedule specific windows for returning calls and messages, while blocking uninterrupted time for complex tasks. This balances responsiveness with the need for sustained focus, rather than being either completely unavailable or constantly interrupted.',
  },
  {
    id: 8,
    question: 'What is the primary difference between deep work and shallow work?',
    options: [
      'Deep work takes longer; shallow work is quick',
      'Deep work requires distraction-free cognitive effort; shallow work is logistically necessary but not mentally demanding',
      'Deep work is more important; shallow work is unnecessary',
      'Deep work can only be done in the morning; shallow work is for afternoons',
    ],
    correctAnswer: 1,
    explanation:
      'The distinction is about cognitive demand, not time or importance. Deep work requires sustained, distraction-free concentration on cognitively challenging tasks. Shallow work is necessary (emails, scheduling, basic admin) but does not push your mental capabilities. Both are needed, but they should be separated rather than mixed.',
  },
];

export default function TMOModule3Section1() {
  useSEO({
    title:
      'Deep Work & Eliminating Distractions | Module 3 Section 1 | Time Management & Organisation',
    description:
      "Cal Newport's Deep Work principles, attention residue, flow state, and creating focused conditions for electricians and tradespeople.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <Focus className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 3</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 1</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Deep Work &amp; Eliminating Distractions
            </h1>
            <p className="text-white text-sm sm:text-base">
              How to achieve sustained, distraction-free concentration &mdash; and why it matters
              more than ever for tradespeople
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                Deep work is the ability to focus without distraction on cognitively demanding
                tasks. Cal Newport argues it is becoming both rarer and more valuable. For
                electricians, deep work means better testing accuracy, fewer errors in complex
                wiring, and faster completion of demanding tasks like EICR reports.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                The modern tradesperson faces constant interruptions &mdash; phone calls, WhatsApp
                messages, supplier queries, and client questions. Research shows each interruption
                costs over 23 minutes of refocusing time. Mastering deep work lets you complete in 2
                hours what might otherwise take 4.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Define deep work and distinguish it from shallow work using Cal Newport's framework",
                'Explain how attention residue reduces cognitive performance when switching tasks',
                "Apply Gloria Mark's research on interruption recovery to your own working patterns",
                'Identify which trade tasks require deep work versus shallow work conditions',
                'Create practical strategies for blocking focused time on construction sites',
                "Understand Csikszentmihalyi's flow state and how to achieve it during complex electrical work",
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: What Is Deep Work? */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">1. What Is Deep Work?</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                In his 2016 book <em>Deep Work: Rules for Focused Success in a Distracted World</em>
                , computer science professor Cal Newport defines deep work as &ldquo;professional
                activities performed in a state of distraction-free concentration that push your
                cognitive abilities to their limit.&rdquo; These efforts create new value, improve
                your skill, and are hard to replicate. Newport argues that in an economy
                increasingly dominated by distraction, the ability to perform deep work is becoming
                simultaneously rarer and more valuable &mdash; making it a superpower for those who
                cultivate it.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The opposite of deep work is what Newport calls &ldquo;shallow work&rdquo; &mdash;
                non-cognitively demanding, logistical tasks that are often performed while
                distracted. These include responding to emails, scheduling, filing paperwork, and
                answering routine phone calls. Shallow work is necessary for running a business, but
                it does not produce the high-quality output that distinguishes excellent work from
                average work. The key insight is not that shallow work is bad, but that mixing it
                with deep work destroys the quality of both.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For electricians and tradespeople, the distinction is highly practical. Completing
                an EICR that requires analysing test results across 40 circuits is deep work.
                Replying to a text message about tomorrow&rsquo;s start time is shallow work. The
                problem arises when you try to do both at the same time &mdash; answering messages
                while testing, or taking calls while completing certification paperwork. The quality
                of your deep work suffers, and paradoxically, your shallow work does not benefit
                from the interruption either.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Newport&rsquo;s Deep Work Hypothesis
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              &ldquo;The ability to perform deep work is becoming increasingly rare at exactly the
              same time it is becoming increasingly valuable in our economy. As a consequence, the
              few who cultivate this skill, and then make it the core of their working life, will
              thrive.&rdquo;
            </p>
            <p className="text-white text-sm leading-relaxed">
              This applies directly to tradespeople: the electrician who can complete a complex
              consumer unit change without errors in 3 hours of focused work will always outperform
              one who takes 5 hours because of constant interruptions &mdash; even though the second
              electrician may appear &ldquo;busier.&rdquo;
            </p>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-3-1-deep-vs-shallow"
            question="An electrician is completing IR testing on a 12-way board while simultaneously replying to WhatsApp messages between circuits. Which type of work is being compromised?"
            options={[
              'Only the shallow work (messages) is being compromised',
              'Only the deep work (testing) is being compromised',
              'Both the deep work and the shallow work are being compromised',
              'Neither is compromised because they use different cognitive systems',
            ]}
            correctIndex={2}
            explanation="When deep and shallow work are mixed, both suffer. The testing loses accuracy because attention is split, and the messages are likely to contain errors or incomplete responses because you are trying to maintain your place in the test sequence."
          />

          {/* Section 2: Attention Residue */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. Attention Residue &amp; the True Cost of Switching
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                In 2009, business professor Sophie Leroy published research that fundamentally
                changed our understanding of task-switching. She discovered what she called
                &ldquo;attention residue&rdquo; &mdash; the phenomenon where, after switching from
                Task A to Task B, a portion of your cognitive attention remains fixated on Task A.
                Your mind does not cleanly transition between tasks like flipping a switch. Instead,
                residual thoughts about the previous task linger, reducing your ability to perform
                at full capacity on the new task.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Leroy&rsquo;s experiments showed that people who had to switch tasks before
                completing the first one performed significantly worse on the second task compared
                to those who were allowed to finish first. The residue was particularly strong when
                the previous task was left incomplete or when there was uncertainty about its
                outcome. This means that checking your phone mid-task is not just a brief pause
                &mdash; it is an injection of cognitive residue that degrades your performance for
                an extended period afterwards.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For tradespeople, this has direct financial implications. If you are performing
                sequential testing on a distribution board and you stop to answer a call, you do not
                simply lose the 2 minutes of the call. You lose additional time re-establishing
                where you were in the sequence, double-checking results, and rebuilding your mental
                model of the installation. The true cost of that interruption might be 15&ndash;25
                minutes, not 2.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Gloria Mark&rsquo;s Interruption Research
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Professor Gloria Mark at the University of California, Irvine, conducted extensive
              studies on workplace interruptions. Her research found that it takes an average of{' '}
              <strong className="text-white">23 minutes and 15 seconds</strong> to fully return to
              the original task after an interruption. Furthermore, interrupted work is often
              completed faster than uninterrupted work &mdash; but at the cost of higher stress,
              greater frustration, more time pressure, and increased error rates. Speed without
              accuracy is particularly dangerous in electrical work, where errors can have serious
              safety consequences.
            </p>
          </div>

          {/* Section 3: Deep Work for Tradespeople */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">3. Deep Work for Tradespeople</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                While Newport&rsquo;s original work focused on knowledge workers &mdash;
                programmers, writers, and academics &mdash; the principles apply powerfully to
                skilled tradespeople. Electrical work frequently demands sustained concentration:
                designing circuit layouts, performing complex testing sequences, completing
                certification paperwork, troubleshooting intermittent faults, and programming
                building management systems. Each of these tasks benefits enormously from
                uninterrupted focus.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Consider the difference between installing a simple socket outlet (relatively
                shallow work that can tolerate brief interruptions) and performing an EICR on a
                30-year-old commercial installation with multiple distribution boards. The EICR
                requires sustained analysis &mdash; comparing test results against maximum
                permissible values, identifying patterns in deterioration, cross-referencing
                findings against current regulations, and making professional judgements about
                coding (C1, C2, C3, FI). This is deep work, and attempting it while fielding phone
                calls will inevitably lead to errors, omissions, or the need to re-do sections.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Similarly, troubleshooting an intermittent earth fault requires building and
                maintaining a mental model of the installation. Each test result provides a clue,
                and these clues must be held in working memory simultaneously to identify the
                pattern. A phone call in the middle of this process does not just interrupt your
                work &mdash; it collapses the entire mental model, forcing you to rebuild it from
                scratch. Experienced electricians instinctively know this, which is why the best
                fault-finders often describe needing to &ldquo;get in the zone&rdquo; before they
                can work effectively.
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-3-1-attention-residue"
            question="Why does answering a 2-minute phone call during sequential IR testing actually cost far more than 2 minutes?"
            options={[
              'Because the phone call itself always lasts longer than expected',
              'Because attention residue means part of your focus remains on the call, and you must re-establish your position in the test sequence',
              'Because you must restart the entire test from the beginning each time',
              'Because test instruments need to recalibrate after each pause',
            ]}
            correctIndex={1}
            explanation="Attention residue from the phone call lingers even after you hang up, and you also need to re-establish where you were in the physical testing sequence. The true cost is typically 15-25 minutes, not the 2 minutes of the call itself."
          />

          {/* Section 4: Flow State */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Flow State &amp; Peak Performance
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Psychologist Mihaly Csikszentmihalyi spent decades researching what he called
                &ldquo;flow&rdquo; &mdash; a state of optimal experience where a person is fully
                immersed in an activity, feeling energised, focused, and fully involved in the
                process. In his landmark 1990 book{' '}
                <em>Flow: The Psychology of Optimal Experience</em>, he described flow as occurring
                when the challenge level of a task precisely matches the person&rsquo;s skill level.
                Too easy, and you become bored; too difficult, and you become anxious. In the sweet
                spot, you enter flow.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Flow shares many characteristics with deep work: both require sustained,
                uninterrupted concentration. People in flow lose track of time, feel a sense of
                control over their work, and experience intrinsic satisfaction regardless of
                external rewards. Critically, flow cannot coexist with distraction. A single
                interruption can shatter a flow state that took 15&ndash;20 minutes to establish,
                and there is no guarantee you will re-enter it once broken.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Many skilled electricians experience flow without knowing the term for it. It
                happens during a complex first fix when the routing and cable management come
                together perfectly, or during fault-finding when each test result clicks into place
                like pieces of a puzzle. The experienced spark who says &ldquo;I was really in the
                zone today&rdquo; is describing flow. Understanding this concept helps you recognise
                its value and protect the conditions that enable it, rather than allowing constant
                interruptions to prevent it from ever occurring.
              </p>
            </div>
          </div>

          {/* Section 5: Creating Deep Work Conditions */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                5. Creating Deep Work Conditions on Site
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Unlike office workers who can close a door, tradespeople face unique challenges in
                creating deep work conditions. You are often on active construction sites with
                noise, other trades working around you, and clients who may be present. However,
                there are practical strategies that work within these constraints. The goal is not
                to become unreachable, but to create structured windows of focused time balanced
                with planned communication windows.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The first strategy is <strong className="text-white">phone management</strong>. Put
                your phone on silent &mdash; not vibrate, silent &mdash; during deep work sessions.
                Set a specific call-back window (for example, 10:00&ndash;10:15 and
                14:00&ndash;14:15) and let regular contacts know these are the times you return
                calls. Most calls are not genuinely urgent; they just feel urgent because of the
                immediate ringtone. A missed call at 9:30 that you return at 10:00 rarely causes any
                problem, but answering it at 9:30 during testing can cost you 25 minutes of
                productive work.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The second strategy is <strong className="text-white">task scheduling</strong>.
                Identify which tasks on your day&rsquo;s schedule require deep work and which are
                shallow. Schedule the deep work tasks for your best focus periods (typically morning
                for most people) and batch shallow tasks together. For example, schedule all your
                testing for the morning when your focus is sharpest, then batch all your calls,
                messages, and admin into the early afternoon. This approach gives you 3&ndash;4
                hours of uninterrupted deep work daily without sacrificing responsiveness.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              Deep Work Scheduling for Electricians
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">07:00&ndash;07:30:</strong> Arrive, plan, review
                (shallow)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">07:30&ndash;10:00:</strong> Deep work block &mdash;
                testing, complex wiring, fault-finding (phone silent)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">10:00&ndash;10:30:</strong> Break + return
                calls/messages (shallow)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">10:30&ndash;12:30:</strong> Deep work block &mdash;
                continue complex tasks (phone silent)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">12:30&ndash;13:00:</strong> Lunch + messages
                (shallow)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">13:00&ndash;14:30:</strong> Installation work,
                routine tasks (moderate focus)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">14:30&ndash;15:00:</strong> Return calls, admin,
                quotes (shallow batch)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">15:00&ndash;16:30:</strong> Finish up, tidy, prep for
                tomorrow (shallow)
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-3-1-scheduling"
            question="An electrician has a complex consumer unit change to complete and 6 quotes to send. Using deep work principles, how should they schedule their day?"
            options={[
              'Alternate between the CU change and quotes throughout the day to avoid boredom',
              'Complete all 6 quotes first thing, then start the CU change after lunch',
              'Schedule the CU change for the morning focus block and batch all quotes into the afternoon',
              'Work on whatever feels most urgent at any given moment',
            ]}
            correctIndex={2}
            explanation="The CU change is deep work requiring sustained concentration, so it should be scheduled during peak focus hours (morning). Quotes are relatively shallow tasks that can be batched together in the afternoon. This maximises the quality of both types of work."
          />

          {/* Section 6: Practical Implementation */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">6. Overcoming Common Objections</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The most common objection to deep work for tradespeople is: &ldquo;I can&rsquo;t not
                answer my phone &mdash; what if it&rsquo;s an emergency?&rdquo; This objection
                conflates urgency with importance. In practice, genuine emergencies (where a
                30-minute delay would cause harm) are extremely rare. Most calls labelled
                &ldquo;urgent&rdquo; are simply requests that the caller would prefer answered
                immediately. A client asking what time you will arrive tomorrow is not an emergency.
                A supplier confirming a delivery slot is not an emergency. These can all wait 90
                minutes until your next call-back window.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Another common objection is: &ldquo;My clients expect immediate responses.&rdquo;
                This is often a self-created expectation. If you have always answered every call
                instantly, your clients naturally expect that. However, most professionals &mdash;
                doctors, lawyers, accountants &mdash; operate with call-back systems, and their
                clients accept it without complaint. By setting clear expectations (&ldquo;I&rsquo;m
                on site until 10, but I&rsquo;ll call you back at 10:15&rdquo;), you train clients
                to respect your focused time while still providing excellent service.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                A third objection is: &ldquo;I work on noisy sites &mdash; I can&rsquo;t achieve
                deep focus.&rdquo; While ambient noise is a factor, research shows that it is{' '}
                <em>interruptive</em> noise (someone speaking to you, your phone ringing) rather
                than background noise that truly disrupts deep work. Many people actually focus well
                with consistent background noise. The key is eliminating interruptions that demand a
                response, not eliminating all sound. Noise-cancelling earbuds playing white noise
                can also help in particularly loud environments.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              The Financial Case for Deep Work
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Consider an electrician charging &pound;45/hour who loses just 1 hour per day to
              interruption-related refocusing. Over a 48-week working year, that is 240 hours of
              lost productivity &mdash; equivalent to{' '}
              <strong className="text-white">&pound;10,800 in lost billable time</strong>. Even
              recovering half of that through better focus management represents &pound;5,400 per
              year. Deep work is not just an abstract productivity concept; it is a direct financial
              lever.
            </p>
          </div>

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Deep work is distraction-free concentration on cognitively demanding tasks; shallow work is logistically necessary but not mentally challenging',
                'Attention residue (Leroy 2009) means switching tasks leaves part of your focus stuck on the previous task, degrading performance on both',
                "Gloria Mark's research shows the average refocusing time after interruption is 23 minutes and 15 seconds",
                'Flow state (Csikszentmihalyi 1990) occurs when challenge matches skill, and is destroyed by interruption',
                'Practical strategies include phone-silent blocks, predetermined call-back windows, and scheduling deep work during peak focus periods',
                'The financial cost of interruption-based productivity loss can exceed \u00a310,000 per year for a typical electrician',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How long should a deep work session last?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Newport suggests that most people can sustain 1&ndash;4 hours of deep work per
                  day, depending on training. Start with 90-minute blocks and build from there. For
                  tradespeople, 2&ndash;3 hour morning blocks tend to work well, as they align with
                  typical site schedules and natural energy patterns.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if my employer requires me to answer the phone immediately?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  If you are employed rather than self-employed, discuss the concept with your
                  supervisor. Explain that you would like to try phone-silent blocks during testing
                  to improve accuracy. Most employers will support this once they understand the
                  quality benefits. You can also propose a trial period to demonstrate the results.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Is all electrical work deep work?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  No. Routine tasks like running cable, fitting accessories, and basic installation
                  work are closer to shallow work &mdash; they require skill and attention but not
                  sustained, intense cognitive effort. Deep work tasks include complex
                  fault-finding, EICR completion, design work, testing sequences, and certification
                  paperwork. The goal is to identify which tasks need deep focus and protect those
                  windows.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I train myself to do more deep work?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. Newport describes deep work as a skill that can be developed through
                  practice. Start with shorter focused sessions and gradually extend them. The key
                  is consistency &mdash; regular daily practice builds your capacity for sustained
                  concentration over time. Most people see significant improvement within 2&ndash;3
                  weeks of deliberate practice.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            questions={quizQuestions}
            title="Section 1 Quiz: Deep Work & Eliminating Distractions"
          />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 3
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-3-section-2">
                Next: The Pomodoro Technique &amp; Time-Boxing
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
