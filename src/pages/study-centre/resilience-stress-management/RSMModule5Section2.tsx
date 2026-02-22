import {
  ArrowLeft,
  CheckCircle,
  Power,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Smartphone,
  Brain,
  Moon,
  Footprints,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'rsm-5-2-qc1',
    question: 'What is the primary purpose of a transition ritual at the end of the working day?',
    options: [
      'To waste time before driving home',
      'To signal to the brain that work mode is ending and recovery mode is beginning',
      'To impress colleagues with your self-care routine',
      'To avoid having to talk to family members when you arrive home',
    ],
    correctIndex: 1,
    explanation:
      'A transition ritual serves as a psychological boundary marker. It signals to the brain that the demands of the working day are over and the recovery period has begun. This is important because the brain does not automatically switch off work-related vigilance — it needs a deliberate cue. The ritual can be as simple as changing clothes, listening to music on the drive home, or taking a short walk before entering the house.',
  },
  {
    id: 'rsm-5-2-qc2',
    question:
      'What is rumination, and why is it particularly problematic for construction workers?',
    options: [
      'Rumination is a form of productive problem-solving that helps resolve workplace issues',
      'Rumination is repetitive, uncontrollable negative thinking about work problems that prevents recovery and increases stress',
      'Rumination only affects office workers who sit in front of screens all day',
      'Rumination is the same as planning the next day and is a healthy habit',
    ],
    correctIndex: 1,
    explanation:
      'Rumination is repetitive, uncontrollable negative thinking — going over the same work problems, worries, or conflicts again and again without reaching a resolution. It is particularly problematic for construction workers because the safety-critical nature of the work creates genuine anxiety ("Did I tighten that earth connection properly?"), and the physical demands mean that mental rest in the evenings is essential for the body to recover as well as the mind.',
  },
  {
    id: 'rsm-5-2-qc3',
    question:
      'Which technique involves writing down work worries at a designated time to prevent them intruding throughout the evening?',
    options: [
      'The 5-4-3-2-1 grounding technique',
      'The mental commute',
      'Scheduled worry time',
      'Digital detox',
    ],
    correctIndex: 2,
    explanation:
      'Scheduled worry time is a cognitive-behavioural technique where you designate a specific 15- to 20-minute window (not close to bedtime) to write down all your work worries and concerns. By giving yourself permission to worry at a set time, you reduce the need for your brain to raise those worries at random moments throughout the evening. Outside the designated worry window, you have a legitimate reason to postpone the thought: "I will deal with that during my worry time."',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I am self-employed and my clients expect me to reply to messages in the evening. What do I do?',
    answer:
      'This is one of the most common concerns for self-employed electricians, but the reality is that most clients do not actually need an immediate reply — they just send the message when they think of it. Setting up an auto-reply on your work phone or WhatsApp Business that says "Thanks for your message. I reply to all enquiries between 8am and 6pm Monday to Friday" manages expectations without losing business. Most clients respect professionals who have clear boundaries, and those who genuinely insist on evening availability are often the kind of difficult clients you are better off without. You can also batch your admin: check messages once at the end of the working day, reply to anything urgent, and save the rest for the morning.',
  },
  {
    question:
      'I share a van with my work tools — how do I create a boundary between work and home when the van is on the driveway?',
    answer:
      'The van-on-the-driveway problem is real because it creates a constant visual reminder of work. Some practical solutions: park the van around the corner or in a different spot if possible so you do not see it from the house. Create a ritual of locking the van and walking away as a deliberate end-of-work signal. Do not go back to the van in the evening to fetch tools or materials — whatever it is, it can wait until morning. If the van is your commute, create the transition ritual during the last few minutes of the drive: turn off the work playlist, put on music you enjoy, and take three deep breaths before walking through the front door.',
  },
  {
    question:
      'My partner says I am grumpy every evening after work. How do I stop bringing work stress home?',
    answer:
      'This is extremely common in construction, and it is usually a sign that you are not completing the transition from work mode to home mode. The key is building a buffer between site and family. Even 10 minutes of deliberate transition can make a significant difference. Try this: when you get home, do not walk straight into the kitchen or living room. Sit in the van for 5 minutes and listen to a podcast or music. Change your clothes. Take a 10-minute walk around the block. Have a shower. During this buffer, consciously review the day, acknowledge any frustrations, and then deliberately let them go. The goal is not to suppress your feelings — it is to process them before you interact with your family, so they get the best version of you rather than the exhausted, irritable version.',
  },
  {
    question: 'I keep waking up at 3am thinking about work. How do I stop this?',
    answer:
      'The 3am wake-up is one of the most common symptoms of unprocessed work stress. Your brain is using the quiet hours of the night to process worries it did not have time to address during the day. Several strategies can help. First, use the "close the loop" technique before bed: write tomorrow\'s to-do list and any unresolved concerns on paper, which tells your brain it is safe to stop holding onto them. Second, avoid screens for at least 30 minutes before bed, as blue light suppresses melatonin production. Third, if you do wake at 3am, do not lie in bed trying to force yourself back to sleep — get up, make a warm drink, write down whatever is on your mind, and return to bed when you feel sleepy. If this pattern persists for more than two weeks despite these strategies, speak to your GP — persistent sleep disruption can be a sign of clinical anxiety that may benefit from professional support.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What is a transition ritual?',
    options: [
      'A religious practice performed before starting work',
      'A deliberate routine that signals to the brain the shift from work mode to recovery mode',
      'A formal handover procedure between shifts on a construction site',
      'A stretching routine performed exclusively at the gym',
    ],
    correctAnswer: 1,
    explanation:
      'A transition ritual is a deliberate, consistent routine performed at the end of the working day that signals to the brain that work is over and recovery has begun. Examples include changing clothes, taking a shower, going for a short walk, or listening to specific music on the commute home. The ritual creates a psychological boundary between work and personal life.',
  },
  {
    id: 2,
    question:
      'Which of the following is the BEST example of a digital detox strategy for an electrician?',
    options: [
      'Deleting all social media accounts permanently',
      'Never owning a mobile phone',
      'Putting the work phone in a drawer after 7pm and turning off work email notifications',
      'Only using the phone for emergency calls at all times',
    ],
    correctAnswer: 2,
    explanation:
      'A practical digital detox does not mean abandoning technology entirely — it means creating boundaries around work-related technology during recovery time. Putting the work phone in a drawer after a set time and turning off work email notifications prevents the constant low-level alertness that comes from being always available, while still allowing personal use of the phone for social connection and entertainment.',
  },
  {
    id: 3,
    question: 'What is rumination?',
    options: [
      'Productive problem-solving that resolves workplace issues',
      'A relaxation technique used before bed',
      'Repetitive, uncontrollable negative thinking about problems without reaching a resolution',
      'A type of meditation practised in construction welfare cabins',
    ],
    correctAnswer: 2,
    explanation:
      'Rumination is the repetitive, often uncontrollable cycle of negative thinking about problems, worries, or conflicts. Unlike productive problem-solving (which leads to a resolution and then stops), rumination goes around in circles without ever reaching a conclusion. It keeps the brain in a state of alertness and prevents genuine recovery, making it one of the biggest obstacles to switching off after work.',
  },
  {
    id: 4,
    question: 'How does the "scheduled worry time" technique work?',
    options: [
      'You worry about everything constantly so there is nothing left to worry about at night',
      'You designate a 15- to 20-minute window to write down all work worries, and postpone worry outside that window',
      'You schedule a meeting with your manager to discuss all your concerns',
      'You set an alarm to remind you to stop worrying at a specific time',
    ],
    correctAnswer: 1,
    explanation:
      'Scheduled worry time is a cognitive-behavioural technique. You choose a specific 15- to 20-minute window (not close to bedtime) and during that time, you write down every work worry, concern, or unresolved issue. Outside that window, when a worry intrudes, you acknowledge it and say "I will deal with that during my worry time." This gives the brain permission to release the thought, because it trusts that the concern will be addressed at the designated time.',
  },
  {
    id: 5,
    question: 'What is the "5-4-3-2-1 grounding technique" used for?',
    options: [
      'Counting electrical circuits on a distribution board',
      'Breaking the rumination cycle by anchoring attention in the present moment through the five senses',
      'A method for prioritising the five most important tasks for tomorrow',
      'A breathing exercise involving 5 seconds in and 4 seconds out',
    ],
    correctAnswer: 1,
    explanation:
      'The 5-4-3-2-1 grounding technique breaks the rumination cycle by forcing the brain to engage with present-moment sensory experience rather than abstract worrying. You identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This overwhelms the ruminating mind with concrete sensory data and pulls attention back to the here and now.',
  },
  {
    id: 6,
    question: 'What is the "mental commute" and who benefits from it?',
    options: [
      'A virtual reality simulation of driving to work, used by office workers',
      'A deliberate end-of-day ritual for people who work from home or whose van is their office, replacing the natural transition a physical commute would provide',
      'A mindfulness app designed exclusively for construction workers',
      'The time spent thinking about work while physically commuting',
    ],
    correctAnswer: 1,
    explanation:
      'The "mental commute" is a concept for anyone who lacks a natural physical transition between work and home — including self-employed electricians whose van is their office, or those who do admin from a home office. It involves creating a deliberate end-of-day ritual (e.g., a 10-minute walk, closing the laptop and leaving the room, changing clothes) that replaces the psychological transition a physical commute would naturally provide.',
  },
  {
    id: 7,
    question: 'Why is changing out of work clothes an effective transition ritual?',
    options: [
      'Because work clothes are uncomfortable and sweaty',
      'Because the physical act of changing clothes creates a tangible sensory signal that the working day is over, helping the brain shift to recovery mode',
      'Because it impresses your partner when you look clean',
      'Because hi-vis clothing is illegal to wear off-site',
    ],
    correctAnswer: 1,
    explanation:
      'Changing out of work clothes works as a transition ritual because it engages multiple senses — the physical sensation of removing dirty or dusty clothes, the feeling of fresh clothing on the skin, and the visual change in appearance. These sensory cues create a tangible boundary marker that the brain can use to shift from work mode to recovery mode. It is one of the simplest and most effective transition rituals available.',
  },
  {
    id: 8,
    question:
      'Which of the following is NOT a recommended strategy for breaking the rumination cycle?',
    options: [
      'Writing down your worries to externalise them',
      'Using the 5-4-3-2-1 grounding technique',
      'Lying in bed replaying the conversation with the difficult client over and over until you feel better',
      'Scheduling a designated worry time window',
    ],
    correctAnswer: 2,
    explanation:
      'Lying in bed replaying a difficult conversation is the definition of rumination — it is the problem, not the solution. Rumination feels productive because your brain is working hard, but it never reaches a resolution and actually intensifies the emotional distress. The recommended strategies (writing worries down, grounding techniques, scheduled worry time) all work by breaking the cycle and redirecting attention away from the repetitive loop.',
  },
];

export default function RSMModule5Section2() {
  useSEO({
    title: 'Switching Off After Work | RSM Module 5.2',
    description:
      'Transition rituals, digital detox, breaking the rumination cycle, the mental commute, and practical strategies for switching off after work in construction.',
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Power className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Switching Off After Work
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The transition from high-alert work mode to genuine recovery — and why it does not
            happen automatically
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Transition problem:</strong> The brain does not automatically switch off
                work mode
              </li>
              <li>
                <strong>Transition rituals:</strong> Deliberate routines that signal the end of the
                working day
              </li>
              <li>
                <strong>Digital detox:</strong> Setting boundaries around work technology in
                recovery time
              </li>
              <li>
                <strong>Rumination:</strong> Breaking the cycle of repetitive negative thinking
                about work
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Relationships:</strong> Bringing work stress home damages the people closest
                to you
              </li>
              <li>
                <strong>Sleep:</strong> Failure to switch off is the number one cause of poor sleep
                quality
              </li>
              <li>
                <strong>Recovery:</strong> Being physically present but mentally at work is not
                recovery at all
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why the brain does not automatically transition from work mode to recovery mode',
              'Design a personal transition ritual that works for your commute and circumstances',
              'Implement a practical digital detox strategy for evenings and weekends',
              'Identify rumination and apply techniques to break the repetitive thinking cycle',
              'Describe the concept of the "mental commute" for home-based or van-based workers',
              'Create specific end-of-day routines that close the mental loop on the working day',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Transition Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Transition Problem
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction work keeps your brain in a state of heightened alertness for the entire
                working day. You are constantly scanning for hazards, making safety-critical
                decisions, working with dangerous voltages, coordinating with other trades, and
                managing the pressure of deadlines and client expectations. Your nervous system is
                running in what psychologists call <strong>sympathetic activation</strong> &mdash;
                the fight-or-flight state that keeps you sharp, reactive, and focused.
              </p>

              <p>
                The problem is that this state does not switch off when you leave site. Your brain
                does not have an automatic &ldquo;work mode off&rdquo; button. When you climb into
                the van at the end of the day, your nervous system is still running at work speed.
                Your mind is still processing the unfinished cable run, the argument with the site
                manager, the quote you need to send, the inspection next week. You are physically
                leaving work, but mentally you are still there.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Neuroscience Behind the Problem
                  </p>
                </div>
                <p className="text-sm text-white">
                  During the working day, your brain produces elevated levels of cortisol and
                  adrenaline &mdash; the stress hormones that keep you alert and responsive. When
                  you stop working, these hormones do not instantly disappear. Cortisol has a
                  half-life of approximately 60 to 90 minutes, meaning it takes at least that long
                  for levels to reduce by half. If you go straight from site to a stressful commute,
                  then straight into family demands without any transition, cortisol levels may
                  never return to baseline before bed &mdash; which is why so many construction
                  workers report lying awake at night with their mind racing about work.
                </p>
              </div>

              <p>
                This is the <strong>transition problem</strong>: the gap between physically leaving
                work and psychologically leaving work. For many electricians, this gap lasts all
                evening &mdash; they are present at home in body but absent in mind. Their partner
                sees a grumpy, distracted person who snaps at the kids and stares at the television
                without really watching it. The electrician sees themselves as relaxing, but their
                brain is still at work, still processing, still alert. Genuine recovery is not
                happening.
              </p>

              <p>
                Closing this gap requires <strong>deliberate effort</strong>. It will not happen on
                its own. You need a set of strategies that signal to your brain: work is over, it is
                safe to stand down, recovery can begin. These strategies are called transition
                rituals.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Transition Rituals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Transition Rituals
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A transition ritual is a deliberate, consistent routine performed at the end of the
                working day that creates a psychological boundary between work and home life. The
                ritual does not need to be complicated or time-consuming &mdash; it just needs to be
                consistent and sensory enough to register with the brain as a genuine shift.
              </p>

              <p>
                The reason rituals work is that the brain is a pattern-recognition machine. When you
                perform the same sequence of actions at the end of every working day, the brain
                learns to associate those actions with the transition to recovery. Over time, the
                ritual itself becomes the trigger for the parasympathetic nervous system to activate
                &mdash; the &ldquo;rest and digest&rdquo; state that is the opposite of
                fight-or-flight.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Footprints className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Effective Transition Rituals for Electricians
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change your clothes:</strong> Removing your
                      work clothes &mdash; the dusty trousers, the hi-vis, the steel-toe boots
                      &mdash; and changing into something comfortable is one of the most powerful
                      transition signals available. The physical sensation of fresh clothing on
                      clean skin tells the brain that the working environment has changed. Many
                      sparkies do this in the van before driving home, or immediately upon arriving
                      home before interacting with family.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Take a shower:</strong> Water is one of the
                      most effective sensory reset tools. A shower washes away the physical residue
                      of work (dust, sweat, the smell of PVC) and provides a few minutes of private,
                      quiet time. Many electricians report that the shower is where they mentally
                      &ldquo;put the day down&rdquo; &mdash; they let the water rinse away the
                      stress along with the grime.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Short walk before entering the house:</strong>{' '}
                      A 10-minute walk around the block before going through the front door provides
                      a physical buffer between site and home. The rhythm of walking, the fresh air,
                      and the change of scenery all help the brain transition. This is particularly
                      effective for electricians who commute by van and go straight from a stressful
                      drive to the front door.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Music on the commute:</strong> Switching from
                      talk radio or work-related podcasts to music you enjoy creates an auditory
                      transition. Music activates different brain regions than work-related
                      cognitive processing, and familiar, enjoyable music triggers dopamine release
                      &mdash; the reward neurotransmitter that counteracts cortisol. Create a
                      specific &ldquo;drive home&rdquo; playlist that becomes your transition
                      soundtrack.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Write tomorrow&rsquo;s to-do list:</strong>{' '}
                      Before you leave site or before you switch off the work phone, spend 3 minutes
                      writing down the tasks for tomorrow. This &ldquo;closes the loop&rdquo;
                      &mdash; it tells your brain that the unfinished business has been captured and
                      will be dealt with tomorrow, so there is no need to keep holding onto it all
                      evening. This single technique is remarkably effective at reducing evening
                      rumination.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> An experienced
                  sparky developed this transition routine: at 4:45, he writes tomorrow&rsquo;s
                  to-do list on a notepad in the van. At 5:00, he changes out of his work clothes in
                  the van (keeps a fresh t-shirt and joggers in a bag). He puts the work phone in
                  the glovebox, puts on his &ldquo;drive home&rdquo; playlist, and drives home.
                  Before walking through the front door, he takes three slow breaths. The whole
                  routine takes 15 minutes and has transformed his evenings. His wife says he is
                  &ldquo;a different person&rdquo; since he started doing it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Digital Detox */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Digital Detox: Boundaries Around Work Technology
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The smartphone has created a problem that previous generations of electricians never
                faced: work can now follow you everywhere. A client WhatsApp at 9pm. A notification
                from the project management app at 7am on Sunday. An email from the architect while
                you are having dinner. Each notification creates a micro-spike of cortisol &mdash; a
                small jolt of alertness that pulls your brain back into work mode, even if you do
                not open the message.
              </p>

              <p>
                Research by the Chartered Institute of Personnel and Development (CIPD) found that
                workers who check work messages outside working hours report significantly higher
                levels of stress, poorer sleep quality, and lower satisfaction with their home life
                than those who maintain a clear boundary. The mere <strong>possibility</strong> of a
                work message is enough to keep the brain in a state of low-level vigilance &mdash;
                even if no message actually arrives.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Digital Detox Strategies
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Work phone in the drawer:</strong> If you have
                      a separate work phone, put it in a drawer when you get home and do not take it
                      out until morning. If you use one phone for work and personal use, switch your
                      work profile off or turn off all work app notifications after your cut-off
                      time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Turn off email notifications:</strong> Check
                      emails at set times during the working day rather than allowing constant push
                      notifications. After hours, email should be completely invisible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">WhatsApp Business auto-reply:</strong> Set up
                      an automated message for out-of-hours enquiries: &ldquo;Thanks for your
                      message. I respond to all enquiries between 8am and 6pm, Monday to Friday. I
                      will get back to you at the earliest opportunity.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">No job enquiries after hours:</strong> Browsing
                      Facebook marketplace for jobs, checking trade forums for leads, or scrolling
                      through Instagram for project ideas might feel like relaxation, but if it is
                      work-related, it keeps your brain in work mode. Save it for working hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Screen-free wind-down:</strong> For the last 30
                      to 60 minutes before bed, avoid all screens. Blue light from phones, tablets,
                      and laptops suppresses melatonin production, making it harder to fall asleep.
                      Read a book, listen to a podcast, or simply sit with a cup of tea.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The fear that drives most electricians to stay digitally connected is the fear of
                missing out on work or appearing unprofessional. But the evidence tells a different
                story: clients respect professionals who have clear boundaries. An electrician who
                replies to a message at 6am the next morning with a clear, considered response is
                more impressive than one who fires back a hasty reply at 10pm. Setting boundaries
                does not lose you business &mdash; it protects your most valuable asset: your
                ability to perform at a high level consistently.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Rumination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Rumination: When You Cannot Stop Thinking About Work
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Rumination is the most insidious enemy of switching off. It is the repetitive,
                uncontrollable cycle of negative thinking that goes around and around without ever
                reaching a resolution. You replay the argument with the site manager. You worry
                about the inspection on Thursday. You second-guess the cable size you chose. You
                rehearse what you should have said to the difficult client. The same thoughts cycle
                through your mind again and again, generating more anxiety each time they pass.
              </p>

              <p>
                Rumination <strong>feels</strong> productive because your brain is working hard. It
                feels like you are trying to solve a problem. But rumination is not problem-solving.
                Problem-solving has a structure &mdash; identify the issue, consider options, choose
                a course of action, move on. Rumination lacks that structure. It is a loop without
                an exit, and the longer it continues, the worse you feel.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Why Construction Workers Are Particularly Vulnerable to Rumination
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Safety-critical work:</strong> When your work
                      involves lethal voltages and fire risks, the stakes of making a mistake are
                      genuinely high. This creates legitimate anxiety that fuels rumination:
                      &ldquo;Did I tighten that earth properly? Did I label the isolator
                      correctly?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Financial pressure:</strong> Self-employed
                      sparkies worry about cash flow, late payments, and whether there will be
                      enough work next month. These open-ended financial worries are perfect fuel
                      for rumination because they have no immediate, clear resolution.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Conflict on site:</strong> Disputes with other
                      trades, difficult clients, or unreasonable site managers generate strong
                      emotions that the brain wants to process. But instead of processing and moving
                      on, rumination replays the conflict repeatedly without resolution.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Perfectionism:</strong> Good electricians take
                      pride in their work. But pride can tip into perfectionism, where any small
                      imperfection &mdash; a cable tie slightly out of line, a label not perfectly
                      straight &mdash; triggers disproportionate worry and self-criticism.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Techniques to Break the Rumination Cycle
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">1. Scheduled Worry Time</p>
                    <p className="text-sm text-white/80">
                      Designate a 15- to 20-minute window (not close to bedtime) as your
                      &ldquo;worry time.&rdquo; During this window, write down every work worry,
                      concern, or unresolved issue on paper. Outside this window, when a worry
                      intrudes, acknowledge it and say: &ldquo;I will deal with that during my worry
                      time.&rdquo; This gives the brain permission to release the thought because it
                      trusts the concern will be addressed at the designated time.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">2. Writing It Down</p>
                    <p className="text-sm text-white/80">
                      Externalising worries onto paper is one of the most effective anti-rumination
                      strategies. When a thought is in your head, it feels urgent and overwhelming.
                      When it is written on paper, it becomes a concrete, manageable item on a list.
                      Keep a notepad by the sofa or beside the bed. When a work thought intrudes,
                      write it down and move on. You have not lost the thought &mdash; you have
                      stored it somewhere safe so your brain can let go of it.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      3. The 5-4-3-2-1 Grounding Technique
                    </p>
                    <p className="text-sm text-white/80">
                      When rumination has you in its grip, use this sensory grounding exercise to
                      pull your attention back to the present moment. Identify: 5 things you can
                      see, 4 things you can touch, 3 things you can hear, 2 things you can smell,
                      and 1 thing you can taste. This overwhelms the ruminating mind with concrete
                      sensory data, breaking the abstract worry loop and anchoring you in the here
                      and now.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">4. Engaging Activity</p>
                    <p className="text-sm text-white/80">
                      Activities that require enough concentration to fully absorb your attention
                      are powerful anti-rumination tools. Exercise, cooking, playing an instrument,
                      gaming, woodworking, fishing &mdash; anything that demands your focus pulls
                      the brain out of the worry loop and into the present task. Passive activities
                      like watching television are less effective because the brain can ruminate at
                      the same time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Mental Commute */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The &ldquo;Mental Commute&rdquo;
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For electricians who have a physical commute &mdash; driving from site to home
                &mdash; the journey itself can serve as a natural transition period (provided you
                use it well, with music or a non-work podcast, rather than making work calls). But
                many self-employed electricians effectively work from their van: they drive from job
                to job, answer calls between appointments, do paperwork in the van during quiet
                moments, and the van is parked on the driveway every evening. There is no physical
                separation between work and home.
              </p>

              <p>
                Others do administrative work from a home office &mdash; quoting, invoicing, and
                answering emails from the spare bedroom or the kitchen table. For these workers,
                there is no commute at all, and the boundary between work and home is nonexistent.
              </p>

              <p>
                The <strong>mental commute</strong> is the solution. It is a deliberate, artificial
                transition that you create to replace the natural boundary a physical commute would
                provide. The principle is the same as a transition ritual, but it is specifically
                designed for situations where work and home occupy the same physical space.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Creating Your Mental Commute</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">10-minute walk:</strong> Before entering the
                      house (even if your van is on the driveway), take a 10-minute walk around the
                      block. This creates a physical boundary between work and home. The walk itself
                      lowers cortisol, and arriving at the front door after a walk feels
                      psychologically different from arriving straight from the van.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Close the home office:</strong> If you do admin
                      from home, create a clear end-of-work routine. Close the laptop, tidy the
                      desk, leave the room, and close the door. Do not go back in. The physical act
                      of leaving the workspace and closing the door is a powerful signal to the
                      brain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Deliberate end-of-day review:</strong> Spend 5
                      minutes writing down what you accomplished today, what needs to happen
                      tomorrow, and any unresolved concerns. Read it back to yourself, then close
                      the notebook. This &ldquo;closing the loop&rdquo; ritual tells the brain it is
                      safe to release the day&rsquo;s mental load.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Change environment:</strong> If the van is
                      parked in sight of the house, sit in a different room from where you can see
                      it. If the home office is in the spare bedroom, stay out of that room for the
                      rest of the evening. Create as much physical separation as your space allows.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> A self-employed
                  electrician who does all his quoting and invoicing from a desk in the spare
                  bedroom created this mental commute: at 6pm, he saves his work, closes the laptop,
                  pushes in the chair, and leaves the room. He changes into comfortable clothes,
                  makes a cup of tea, and sits in the garden for 10 minutes (or the living room in
                  winter) before engaging with his family. The rule is absolute: the spare bedroom
                  door stays closed after 6pm, and the laptop does not come out until morning.
                  Within two weeks, he noticed he was sleeping better and his partner commented that
                  he seemed &ldquo;more present&rdquo; in the evenings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Switching off after work is not something that happens naturally. It is a skill that
                must be learned, practised, and maintained &mdash; just like any other professional
                skill. The construction workers who are happiest, healthiest, and most successful
                over the long term are not the ones who work the most hours. They are the ones who
                have learned to recover the most effectively.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The brain does not automatically switch off</strong> work mode. You
                      need deliberate transition rituals to signal the shift from work to recovery.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Transition rituals</strong> (changing clothes, walking, music, writing
                      tomorrow&rsquo;s list) create a psychological boundary between work and home.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Digital detox</strong> means setting clear boundaries around work
                      technology during recovery time &mdash; work phone in the drawer,
                      notifications off, auto-reply set.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Rumination</strong> is the biggest obstacle to switching off. Break
                      the cycle with scheduled worry time, writing it down, and the 5-4-3-2-1
                      grounding technique.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>mental commute</strong> replaces the natural transition for
                      workers whose home and work share the same physical space.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore what happens when recovery fails over a
                prolonged period &mdash; burnout. Understanding how to recognise the early warning
                signs of burnout, distinguish it from ordinary stress, and take action before it
                becomes a crisis is one of the most important resilience skills you can develop.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-5-section-3">
              Next: Recognising &amp; Managing Burnout
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
